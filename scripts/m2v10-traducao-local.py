#!/usr/bin/env python3
"""Gera traduções PT->EN/ES para textos ainda ausentes usando Argos Translate offline.
Não substitui tradução editorial; gera somente chaves faltantes, sem serviço privado.
Uso no CI: pip install argostranslate==1.10.0 && python scripts/m2v10-traducao-local.py
"""
import functools
import json
import re
import subprocess
import tempfile
from pathlib import Path

import argostranslate.package
import argostranslate.translate

ROOT = Path(__file__).resolve().parent.parent
IGNORAR = re.compile(
    r"^(<svg|eyJ|rotate\(|url\(|translate\(|Bearer|AppBookDisplay|\(display-mode|IE=edge|X-UA-Compatible|Macintosh|body\{|if\('serviceWorker'|width=device-width)|/functions/|^\{0\}/(auth|rest|icones|manifest)"
)
PRESERVAR = re.compile(r"(\*\*|\{\d+\}|\r?\n|M[1-4]V\d+(?:\s*[-–]\s*[IVX]+)?)")
NUMEROS = re.compile(r"\{\d+\}")
LETRAS = re.compile(r"[A-Za-zÀ-ÿ]")
MAX_SEM_TRADUCAO = 0

def faltantes():
    with tempfile.TemporaryDirectory() as tmp:
        path = Path(tmp) / "todos.json"
        subprocess.run(["node", "scripts/extrair-textos.cjs", "--json", str(path)],
                       cwd=ROOT, check=True)
        todos = json.loads(path.read_text(encoding="utf8"))
    keys = []
    for key in todos:
        key = key.strip()
        if key and not IGNORAR.search(key) and key not in keys:
            keys.append(key)
    return keys

def modelos():
    argostranslate.package.update_package_index()
    disponiveis = argostranslate.package.get_available_packages()
    for codigo in ("en", "es"):
        p = next((a for a in disponiveis if a.from_code == "pt" and a.to_code == codigo), None)
        if p is None:
            raise RuntimeError("Modelo Argos português->" + codigo + " indisponível")
        print("Instalando modelo PT->" + codigo + " versão " + str(p.package_version), flush=True)
        argostranslate.package.install_from_path(p.download())

@functools.lru_cache(maxsize=10000)
def traduzir_trecho(trecho, idioma):
    if not LETRAS.search(trecho):
        return trecho
    antes = re.match(r"^\s*", trecho).group()
    depois = re.search(r"\s*$", trecho).group()
    miolo = trecho[len(antes):len(trecho) - len(depois) if depois else None]
    if not miolo:
        return trecho
    resultado = argostranslate.translate.translate(miolo, "pt", idioma).strip()
    if not resultado:
        raise RuntimeError("Trecho ficou sem tradução: " + miolo[:100])
    if miolo.isupper() and re.search(r"[A-ZÀ-Ý]{2}", miolo):
        resultado = resultado.upper()
    if idioma == "en":
        resultado = re.sub(r"\bdiarrhoea\b", "diarrhea", resultado, flags=re.I)
        resultado = re.sub(r"\bdiarrhoeal\b", "diarrheal", resultado, flags=re.I)
        resultado = re.sub(r"\bhaemorrhag", "hemorrhag", resultado, flags=re.I)
        resultado = re.sub(r"\boesophag", "esophag", resultado, flags=re.I)
        resultado = re.sub(r"\banaem", "anem", resultado, flags=re.I)
        resultado = re.sub(r"\bcolour\b", "color", resultado, flags=re.I)
        resultado = re.sub(r"\bcentre\b", "center", resultado, flags=re.I)
    return antes + resultado + depois

def traduzir(texto, idioma):
    partes = PRESERVAR.split(texto)
    convertido = "".join(
        p if not p or PRESERVAR.fullmatch(p) else traduzir_trecho(p, idioma)
        for p in partes
    )
    if not convertido.strip():
        raise RuntimeError("Texto sem resultado: " + texto[:100])
    if (texto.count("**") != convertido.count("**") or
        sorted(NUMEROS.findall(texto)) != sorted(NUMEROS.findall(convertido))):
        raise RuntimeError("Marcadores alterados: " + texto[:100])
    for codigo in re.findall(r"M[1-4]V\d+", texto):
        if codigo not in convertido:
            raise RuntimeError("Código editorial alterado: " + codigo + " / " + texto[:80])
    return convertido

def preservar_e_adicionar(arquivo, atual, novos):
    if not novos:
        return
    original = arquivo.read_text(encoding="utf8").rstrip()
    if not original.endswith("}"):
        raise RuntimeError("Dicionário inválido: " + str(arquivo))
    # Adiciona sem reordenar nem reformatar milhares de chaves já aprovadas.
    entradas = [json.dumps(k, ensure_ascii=False) + ": " +
                json.dumps(v, ensure_ascii=False) for k, v in novos.items()]
    corpo = original[:-1].rstrip()
    if atual:
        corpo += ","
    corpo += "\n" + ",\n".join(entradas) + "\n}"
    validado = json.loads(corpo)
    if len(validado) != len(atual) + len(novos):
        raise RuntimeError("Contagem divergente do dicionário")
    arquivo.write_text(corpo, encoding="utf8")

def main():
    todos = faltantes()
    tarefas = {}
    for idioma in ("en-US", "es-ES"):
        arq = ROOT / "src" / "i18n" / (idioma + ".json")
        dic = json.loads(arq.read_text(encoding="utf8"))
        pendentes = [k for k in todos if k not in dic]
        tarefas[idioma] = (arq, dic, pendentes)
        print(idioma, len(pendentes), "textos pendentes", flush=True)
    if not any(t[2] for t in tarefas.values()):
        return
    modelos()
    for idioma, (arq, dic, pendentes) in tarefas.items():
        codigo = idioma[:2]
        novos = {}
        for i, original in enumerate(pendentes, 1):
            try:
                novos[original] = traduzir(original, codigo)
            except Exception as e:
                raise RuntimeError(f"{idioma} item {i}/{len(pendentes)}: {e}") from e
            if i % 30 == 0 or i == len(pendentes):
                print(f"{idioma}: {i}/{len(pendentes)}", flush=True)
        preservar_e_adicionar(arq, dic, novos)
        print(f"{idioma}: gravadas {len(novos)} traduções preliminares", flush=True)
    # Confere que nenhum texto foi omitido, sem aceitar tradução placeholder.
    todos = faltantes()
    for idioma in tarefas:
        arq = tarefas[idioma][0]
        dic = json.loads(arq.read_text(encoding="utf8"))
        faltam = [k for k in todos if k not in dic]
        if faltam:
            raise RuntimeError(f"{idioma} ainda tem {len(faltam)} textos pendentes")
        print(f"{idioma}: 0 texto(s) sem tradução", flush=True)

if __name__ == "__main__":
    main()
