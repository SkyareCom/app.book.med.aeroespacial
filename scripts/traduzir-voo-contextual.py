#!/usr/bin/env python3
"""Traduz SOMENTE novas chaves editoriais do M2V11, preservando o voo congelado.
O material é conteúdo didático público, sem dados de pacientes e sem chaves externas.
A saída automática ainda precisa de amostras auditadas antes da aprovação editorial.
"""
from __future__ import annotations
import json, os, re, subprocess, tempfile, time, urllib.parse, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ENDPOINT = "https://translate.googleapis.com/translate_a/t?client=dict-chrome-ex"
IGNORAR = re.compile(r"^(?:<svg|eyJ|rotate\(|url\(|translate\(|Bearer|AppBookDisplay|\(display-mode|IE=edge|X-UA-Compatible|Macintosh|body\{|if\('serviceWorker'|width=device-width|/functions/|\{0\}/(?:auth|rest|icones|manifest))")
EXTRA_COISAS = ("<svg", "data:image/", "http://localhost")
MAX_URL=5000
MAX_ITENS=17

def extrair():
    tmp = tempfile.NamedTemporaryFile(suffix=".json",delete=False)
    tmp.close()
    try:
        subprocess.run(["node","scripts/extrair-textos.cjs","--json",tmp.name],
                       check=True,cwd=ROOT)
        all_text = json.loads(Path(tmp.name).read_text("utf8"))
    finally:
        os.unlink(tmp.name)
    return list(dict.fromkeys(
        k.strip() for k in all_text
        if k.strip() and not IGNORAR.match(k.strip()) and
        not k.strip().startswith(EXTRA_COISAS)
    ))

def lotes(textos):
    batch=[]
    for v in textos:
        trial=batch+[v]
        data=urllib.parse.urlencode([("sl","pt"),("tl","es")]+[("q",a) for a in trial])
        if batch and (len(trial)>MAX_ITENS or len(data)>MAX_URL):
            yield batch
            batch=[v]
        else: batch=trial
    if batch: yield batch

def traduzir(qs, idioma):
    params=urllib.parse.urlencode([("sl","pt"),("tl",idioma)]+[("q",q) for q in qs])
    url=ENDPOINT+"&"+params
    error="unavailable"
    for tentativa in range(4):
        try:
            req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0","Accept":"application/json"})
            with urllib.request.urlopen(req,timeout=25) as response:
                values=json.loads(response.read(250000))
            if (isinstance(values,list) and len(values)==len(qs)
                and all(isinstance(v,str) and v.strip() for v in values)):
                return values
            error=f"resposta inválida {str(values)[:90]}"
        except (ValueError,urllib.error.HTTPError,urllib.error.URLError,TimeoutError) as e:
            error=str(e)[:130]
        sleep=[3,8,18,24][tentativa]
        print(f"{idioma} tentativa {tentativa+1}: {error}; pausa {sleep}s",flush=True)
        time.sleep(sleep)
    if len(qs)>1:
        mid=len(qs)//2
        return traduzir(qs[:mid],idioma)+traduzir(qs[mid:],idioma)
    raise RuntimeError(f"{idioma} frase individual não traduzida: {qs[0][:65]} ({error})")

def preservar(src,dst,idioma):
    # Evita converter e perder destaque em negrito ou variáveis numéricas.
    if src.count("**") != dst.count("**"):
        src_html=src.split("**")
        marked=src_html[0]
        for i,fragmento in enumerate(src_html[1:]):
            marked+=("<b>" if i%2==0 else "</b>")+fragmento
        tr_html=traduzir([marked],idioma)[0]
        dst=re.sub(r"</?b>", "**", tr_html, flags=re.I)
    if src.count("**") != dst.count("**"):
        raise RuntimeError("Negritos perdidos: "+src[:95])
    if len(dst.strip())<len(src.strip())*.3:
        raise RuntimeError("Tradução incompleta: "+src[:95])
    for cod in set(re.findall(r"M[1-4]V\d+",src)):
        if cod not in dst:
            raise RuntimeError("Referência de voo alterada: "+src[:95])
    for variavel in set(re.findall(r"\{\d+\}",src)):
        if dst.count(variavel) != src.count(variavel):
            raise RuntimeError("Marcador variável perdido: "+src[:95])
    return dst.strip()

def fazer(idioma,keys):
    path=ROOT/"src"/"i18n"/(idioma+".json")
    d=json.loads(path.read_text("utf8"))
    missing=[k for k in keys if k not in d]
    print(f"{idioma}: {len(missing)} chaves editoriais novas",flush=True)
    if not missing:return {"idioma":idioma,"chaves":0}
    chunks=list(lotes(missing))
    out=[]
    for i,part in enumerate(chunks,1):
        out+=traduzir(part,idioma[:2])
        print(f"{idioma} · {i}/{len(chunks)} lotes · {len(out)}/{len(missing)} trechos",flush=True)
        time.sleep(.75)
    if len(out)!=len(missing):
        raise RuntimeError("Tamanho divergente")
    for k,traducao in zip(missing,out):
        d[k]=preservar(k,traducao,idioma[:2])
    # Não reescrever uma chave anterior: proteção editorial do M2V10 é executada após.
    path.write_text("{\n"+",\n".join(json.dumps(k,ensure_ascii=False)+":"+json.dumps(v,ensure_ascii=False) for k,v in d.items())+"\n}",encoding="utf8")
    return {"idioma":idioma,"chaves":len(missing),"amostra":[{"pt":k[:120],"traducao":d[k][:170]} for k in missing[:15]]}

def main():
    keys=extrair()
    print(f"Strings extraídas para revisão: {len(keys)}",flush=True)
    report=[]
    for lang in ["en-US","es-ES"]:
        report.append(fazer(lang,keys))
    dest=ROOT/"docs"/"m2v11-auditoria-traducao.json"
    dest.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("Tradução contextual do M2V11 gerada; revisão médica obrigatória.",flush=True)

if __name__=="__main__": main()
