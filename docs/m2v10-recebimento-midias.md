# M2V10 · Mídias integradas e rastreabilidade

Registro atualizado em 6/11/2026. Todas as **12 fotografias e 1 vídeo** foram transferidos, validados e integrados ao código em `m2v10-digestivo`. A automação de importação verificou os hashes SHA-256, descompactou os binários, vinculou os recursos em `src/data/capitulos/digestivo.ts` e passou TypeScript, congelamento, auditoria de mídias e exportação web.

## Mapeamento definitivo

| Tópico | Fotografias incorporadas |
| --- | --- |
| 10.1 · Digestivo em altitude | `m2v10-1-cabine.jpg`, `m2v10-1-corredor.jpg` |
| 10.2 · Refluxo, gastrite, úlcera | `m2v10-2-refeicao.jpg`, `m2v10-2-consulta.jpg` |
| 10.3 · Intestino | `m2v10-3-hidratacao.jpg`, `m2v10-3-acompanhamento.jpg` |
| 10.4 · Fígado | `m2v10-4-avaliacao.jpg`, `m2v10-4-tratamento.jpg` |
| 10.5 · Vesícula e pâncreas | `m2v10-5-vesicula.jpg`, `m2v10-5-pancreas.jpg` |
| 10.6 · Cirurgia abdominal | `m2v10-6-recuperacao.jpg`, `m2v10-6-reabilitacao.jpg` |

**Vídeo:** `assets/videos/m2v10-gas-cabine.mp4` (8 s, 1280×720, H.264, silencioso), tópico 10.1.

**Fotografias:** `assets/images/topicos/` (1600×893, JPEG).

## Traduções e conteúdo

A tradução automática preliminar de 444 chaves novas por idioma foi revista com tradução contextual, preservando marcadores e códigos de voo. O resultado verificou **zero traduções faltantes em en-US e es-ES**. Ver `docs/m2v10-revisao-traducoes.json`. As fontes regulatórias distinguem referências britânicas de requisitos brasileiros; a aptidão sempre exige avaliação individual, nunca é conferida somente pela contagem de dias.

## Publicação

A integração dos binários está concluída. Para disponibilizar o voo na URL pública é necessário incorporar a PR ao ramo `main` e acompanhar o workflow `Publicar PAPOS DE ALTITUDE no GitHub Pages`. A versão estática do M2V10 foi inicialmente testada no endereço isolado `/m2v10/capitulo/sistemas/10.html` e o fluxo de produção fará o deploy na rota definitiva `/capitulo/sistemas/10.html`.

O pacote de trabalho de origem foi removido do repositório após a importação; os arquivos finais estão nos diretórios `assets/`.
