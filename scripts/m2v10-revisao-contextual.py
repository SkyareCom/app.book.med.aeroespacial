#!/usr/bin/env python3
"""Revisa traduções preliminares do M2V10 em lotes contextuais.
Usa apenas textos editoriais públicos e um endpoint externo para geração de rascunhos;
nenhuma chave, conta, dado de paciente ou texto secreto é enviado.
A qualidade médica ainda exige verificação editorial antes da publicação.
"""
import json
import re
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
API = "https://translate.googleapis.com/translate_a/t?client=dict-chrome-ex"
SOURCE_COMMIT_TAG = "chore(m2v10): completar dicionários PT EN ES por tradução local"
CHUNK_URL_MAX = 6000
CHUNK_SIZE_MAX = 22

def gerar_lotes(frases):
    atual = []
    for frase in frases:
        proximo = atual + [frase]
        tamanho = len(urllib.parse.urlencode([('sl','pt'),('tl','es')] + [('q',p) for p in proximo]))
        if atual and (len(proximo) > CHUNK_SIZE_MAX or tamanho > CHUNK_URL_MAX):
            yield atual
            atual = [frase]
        else:
            atual = proximo
    if atual:
        yield atual

def requisitar(frases, idioma):
    dados = urllib.parse.urlencode([('sl','pt'),('tl',idioma)] + [('q',s) for s in frases])
    url = API + "&" + dados
    erro = None
    for n in range(4):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/json",
            })
            with urllib.request.urlopen(req, timeout=25) as r:
                corpo = r.read(250000)
            resultado = json.loads(corpo)
            if isinstance(resultado, list) and len(resultado) == len(frases) and all(isinstance(t, str) for t in resultado):
                return resultado
            erro = "Resposta inválida: tamanho ou tipos incompatíveis"
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, ValueError) as e:
            erro = str(e)
        pausa = [4, 12, 28, 45][n]
        print(f"{idioma}: tentativa {n+1} falhou ({erro}); pausa {pausa}s", flush=True)
        time.sleep(pausa)
    if len(frases) > 1:
        meio = len(frases) // 2
        return requisitar(frases[:meio], idioma) + requisitar(frases[meio:], idioma)
    raise RuntimeError(f"Não foi possível traduzir item único para {idioma}: {erro}")

def traduzir_marcas(frase, traducao, idioma):
    if frase.count("**") != traducao.count("**"):
        if frase.count("**") % 2:
            return None
        partes = frase.split("**")
        texto_html = partes[0]
        for i, parte in enumerate(partes[1:]):
            texto_html += "<b>" if i % 2 == 0 else "</b>"
            texto_html += parte
        # Tradução contextual com marcação HTML, a ser convertida após o retorno.
        traducao_html = requisitar([texto_html], idioma)[0]
        traducao = re.sub(r"</?b>", "**", traducao_html, flags=re.I)
    if frase.count("**") != traducao.count("**"):
        return None
    for variavel in set(re.findall(r"\{\d+\}", frase)):
        if frase.count(variavel) != traducao.count(variavel):
            return None
    for codigo in set(re.findall(r"M[1-4]V\d+", frase)):
        if codigo not in traducao:
            return None
    if not traducao.strip() or len(traducao) < len(frase) * 0.4:
        return None
    # O serviço pode capitalizar após ponto e vírgula indevidamente.
    traducao = re.sub(r"; ([A-ZÁÉÍÓÚÀÈÌÒÙ])(?=[a-záéíóúàèìòù])", lambda m: "; " + m[1].lower(), traducao)
    return traducao

def localizar_chaves_originais(caminho):
    registro = subprocess.run(
        ["git","log","--format=%H","--grep="+SOURCE_COMMIT_TAG,"-n","1"],
        cwd=ROOT, capture_output=True, check=True, text=True
    ).stdout.strip()
    if not registro:
        raise RuntimeError("Commit de tradução preliminar não encontrado")
    arquivo = str(caminho.relative_to(ROOT)).replace("\\", "/")
    antigo = subprocess.run(
        ["git","show",registro+"^:"+arquivo],
        cwd=ROOT, capture_output=True, check=True, text=True
    ).stdout
    antes = json.loads(antigo)
    atual = json.loads(caminho.read_text(encoding="utf8"))
    chaves = [k for k in atual if k not in antes]
    if not chaves:
        raise RuntimeError(f"Nenhuma tradução preliminar para {arquivo}")
    print(f"{arquivo}: {len(chaves)} entradas para revisão", flush=True)
    return atual, chaves

def executar(idioma):
    caminho = ROOT / "src" / "i18n" / (idioma + ".json")
    atual, chaves = localizar_chaves_originais(caminho)
    codigo = idioma[:2]
    unidades = []
    tabela = {}
    for chave in chaves:
        # Manter os seis parágrafos editorialmente separados e traduzidos com contexto.
        blocos = chave.split("\n\n")
        tabela[chave] = (len(unidades),len(blocos))
        unidades.extend(blocos)
    resultados = []
    for i, lote in enumerate(gerar_lotes(unidades),1):
        resultados += requisitar(lote, codigo)
        print(f"{idioma}: lote {i}, {len(resultados)}/{len(unidades)} trechos", flush=True)
        time.sleep(1.4)
    melhoradas = {}
    pendencias = []
    for k in chaves:
        pos, tamanho = tabela[k]
        blocos = []
        for src, dest in zip(k.split("\n\n"), resultados[pos:pos+tamanho]):
            novo = traduzir_marcas(src, dest, codigo)
            if novo is None:
                pendencias.append(k[:95])
                break
            blocos.append(novo)
        else:
            melhoradas[k] = "\n\n".join(blocos)
    capitulos = (
        "O **estômago** recebe", "No **refluxo gastroesofágico**",
        "A **diarreia** elimina", "O **fígado** produz",
        "A **vesícula biliar** guarda", "Depois de **cirurgia abdominal**"
    )
    criticas = [k[:85] for k in chaves if k.startswith(capitulos) and k not in melhoradas]
    if criticas:
        raise RuntimeError(f"Textos clínicos centrais sem tradução contextual em {idioma}: {criticas}")
    if len(melhoradas) < len(chaves) * 0.93:
        raise RuntimeError(f"Qualidade insuficiente {idioma}: {len(melhoradas)}/{len(chaves)}; pendências: {pendencias[:8]}")
    atual.update(melhoradas)
    linhas = [
        json.dumps(k,ensure_ascii=False) + ":" + json.dumps(v,ensure_ascii=False)
        for k,v in atual.items()
    ]
    corpo = "{\n" + ",\n".join(linhas) + "\n}"
    if len(json.loads(corpo)) != len(atual):
        raise RuntimeError("Serialização inválida")
    caminho.write_text(corpo,encoding="utf8")
    print(f"{idioma}: {len(melhoradas)} traduções contextuais revistas de {len(chaves)}; {len(pendencias)} mantidas preliminares",flush=True)
    return {"idioma":idioma,"alteradas":len(melhoradas),"total":len(chaves),"pendentes_revisao":pendencias}

def main():
    relatorio = [executar(lang) for lang in ["en-US","es-ES"]]
    path = ROOT / "docs" / "m2v10-revisao-traducoes.json"
    path.write_text(json.dumps(relatorio,ensure_ascii=False,indent=2)+"\n",encoding="utf8")

if __name__ == "__main__":
    main()
