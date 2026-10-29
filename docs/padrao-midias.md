# Padrão de mídias dos voos

Objetivo: ilustrar cada tema com formatos variados, posicionados para quebrar a leitura e não cansar.

## Regras por tópico
- **Pelo menos 2 fotos** cinematográficas (geradas pelo autor, pessoas fictícias, sem texto, logos ou marcas).
- **Pelo menos 1 recurso interativo**: simulação, gráfico tocável ou animação.
- **No máximo 1 parágrafo seguido sem mídia.** Cada recurso entra logo depois do parágrafo que ele ilustra.
- **Abertura forte:** o 1º ou o 2º parágrafo já traz uma foto ou uma animação.
- **Alternância:** evitar dois recursos do mesmo tipo em sequência (foto, depois gráfico, depois tabela...).
- **Tabela no fim do raciocínio:** tabelas-resumo e passo a passo ficam depois do parágrafo que fecha o assunto.

## Regras por voo
- Ter todos os formatos: **foto, interativo, animação, tabela e vídeo**.
- **Animação** (o "GIF" do app): laço em SVG, leve, que pausa ao toque (src/components/midia/animacoes.tsx).
- **Vídeo**: MP4 curto (até ~8 s), sem som, em laço, em assets/videos, como recurso `video` (src/components/midia/video-laco.tsx).

## Exceções
- M2V1: vídeo substituído por foto (28/10/2026, decisão do autor; gerador de vídeo indisponível).

## Verificação
`npm run auditar:midias` lista, por tópico, fotos, interativos, tabelas e vídeos, o maior trecho de texto sem mídia
e os formatos que faltam em cada voo.
