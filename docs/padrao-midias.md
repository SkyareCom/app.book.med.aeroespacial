# Padrão de mídias dos voos

Objetivo: ilustrar cada tema com formatos variados, posicionados para quebrar a leitura e não cansar.

## Civil ou militar: a imagem segue o contexto mais frequente do tema
- **Civil** (linha aérea, executiva, aviação geral, aeromédico civil, passageiros e tripulantes): pressurização,
  descompressão, umidade, radiação cósmica, certificação e exame médico (CMA), sistemas do corpo na avaliação do
  piloto (coração, cérebro, metabolismo...), toxicologia da cabine, saúde do passageiro, emergências a bordo, CRM.
- **Militar quando o tema é típico dele**: forças G e manobra anti-G, ejeção, trajes pressurizados e respiração com
  pressão positiva, câmara hipobárica e treinamento fisiológico, dor cervical do piloto de caça, aviação militar.
- **Ambos**: sobrevivência, ruído, desorientação, hipóxia; usar o que melhor ilustra o parágrafo.

### Vídeos (um por voo), mapeados pelo mesmo critério (29/10/2026)
- Prontos, todos civis e adequados: M1V1 curvatura da Terra (neutro), M1V2 máscaras na cabine de passageiros,
  M1V3 névoa num jato executivo, M1V4 frio. Pendente: M1V5 auroras vistas da cabine de comando (civil).
- Militar: M1V7 Forças G, M1V8 Impacto e ejeção, M3V12 Aviação militar.
- Ambos (escolher pela cena do texto): M1V6 Ruído e vibração, M2V5 Equilíbrio e orientação, M2V12 Ossos e músculos,
  M3V3 Seleção e treinamento.
- Civil: todos os demais voos das Missões 2 e 3.
- Missão 4: espacial.

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
