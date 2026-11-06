# PAPOS DE ALTITUDE — PRODUÇÃO EDITORIAL CONTÍNUA

**Versão operacional:** 06/11/2026. Este fluxo complementa, sem substituir, `AGENTS.md`, `docs/estrutura-completa.md`, `docs/modelo-sistemas.md`, `docs/padrao-midias.md` e `docs/publicacao.md`.

**Princípio:** nenhum voo é liberado sem conteúdo científico, traduções EN-US/ES-ES, avaliação editorial, testes e mídias reais aprovados. **O material escrito e técnico deve ficar integralmente pronto ANTES de solicitar a primeira imagem.** Assim, a única entrega pendente na etapa visual será a sequência de fotografias e o vídeo; recebida a última mídia, o CI pode publicar sem iniciar outro ciclo de redação.

## 1. Preparação e pesquisa — sem pendências técnicas

- Consultar os modelos existentes, sobretudo o último voo publicado da missão. Reutilizar exatamente a estrutura visual, navegação, fontes, cores, espaçamentos, componentes, tabelas, interativos e rodapé. Não criar outro layout, módulos avulsos, pop-ups, placeholders ou componentes que contradigam o padrão.
- Registrar no comentário inicial do voo o **REGISTRO DE REVISÃO** com fontes primárias, datas/edições verificadas, limites, prazos e divergências. Não transformar orientações estrangeiras em regras brasileiras. Não inventar números, períodos nem liberações médicas. Sem confirmação: retirar o número da versão publicável e registrar a questão para a revisão.
- Para assuntos aeromédicos, priorizar **ANAC/RBAC 67 vigente, ICAO/Doc 8984, FAA/AME Guide, EASA/Part-MED**, referências clínicas primárias e manuais pertinentes ao passageiro. Distinguir passageiro, tripulante e examinador.
- Concentrar a redação no corpo humano: mecanismo → consequências fisiológicas → sintomas/gravidade → vulneráveis e causa da vulnerabilidade → aptidão/voo → prevenção/conduta. Destacar nuances relevantes em **negrito no texto**, sem dividir a prosa em blocos artificiais.
- Preservar integralmente a missão Conceitos e todos os outros voos congelados; não alterar seus hashes, imagens, testes ou posições.

## 2. Entrega textual completa — antes das mídias

**Para cada tópico da Missão Sistemas:**
1. Redigir **prosa única e progressiva**, com seis partes lógicas (sem subtítulos internos): definição e mecanismo em altitude; agravamento no voo; liberação distinta para passageiro e tripulante; consequências de voar sem liberação; prevenção e remédios; decisão e sinais de impedimento. Não repetir as mesmas informações.
2. Incluir no final do texto a orientação em linha **Como prevenir e amenizar.**, destacada em negrito, com ações concretas antes e durante o voo, e uma **tabela prática** com o mesmo tema.
3. Tópico de abertura: contemplar fatores do voo pertinentes e tabela **O que muda em altitude**. Nos tópicos de condições: **Liberação para voo** e **Remédios e voo**, com normas e prazos específicos realmente conferidos.
4. Cada tópico recebe **um interativo funcional** e locais de mídia associados aos parágrafos (não adicionar `require()` de foto ou vídeo ausente).
5. Final do voo: **Sistemas do corpo mais atingidos**, explicando efeito **e mecanismo**, além de teste do conhecimento com **mínimo de dez questões válidas** e explicação.
6. Missão Sistemas: acrescentar perguntas no **formulário único de liberação**, com opções e explicação separadas para passageiro, tripulante e médico, sem veredito que substitua avaliação real.
7. Cadastrar tudo nas fontes existentes: `src/data/secoes.ts`, `src/data/tipos.ts` (quando preciso), `src/components/midia/index.tsx`, `src/data/referencias.ts`, laboratório, notificações e fichas da loja, sem duplicar itens.

## 3. Tradução obrigatória — antes das mídias

- O original é **PT-BR**; produzir versões integrais em **EN-US** e **ES-ES** de todos os novos parágrafos, títulos, legendas, tabelas, controles, questões, explicações, formulários e textos de interativos.
- Manter **todos os códigos MxVy**, números, unidades e marcadores `**negrito**`, `{0}` etc.; seguir terminologia médica e aeronáutica consagrada, sem tradução palavra a palavra.
- A geração pode usar o serviço configurado no projeto (`node scripts/traduzir.cjs --traduzir`) ou um gerador alternativo, **sempre seguido de revisão clínica e terminológica**. Tradução automática isolada, mesmo com zero chaves faltantes, não constitui aprovação editorial.
- Executar `node scripts/traduzir.cjs` após cada atualização. **Condição de avanço: `en-US: 0` e `es-ES: 0` textos pendentes.** Conferir amostras dos seis parágrafos e das explicações nos três idiomas; corrigir falsos cognatos clínicos.

## 4. Preparação de software e aprovação editorial

Executar, na branch `voo/M2V11` (ou equivalente):

```bash
npm ci
npm run typecheck
npm test
node scripts/check-m1v1-frozen.cjs
node scripts/traduzir.cjs
npx tsx --require ./scripts/stub-assets.cjs scripts/validar-voo.mjs M2V11 conteudo
npm run loja:ficha
```

- Testar as telas **320 px e 390 px**, navegação e interativos, inclusive PT/EN/ES. Conferir precisão médica, referências e coerência dos prazos entre capítulo, tabelas, teste e liberação.
- Abrir uma PR para `main`, revisar o conteúdo e as traduções **antes de solicitar as mídias**. Só após aprovação responsável aplicar o selo `editorial-aprovado` e marcar a PR **Ready for review**. O selo é um ato de revisão, não pode ser atribuído por tradução automática. Idealmente registrar a revisão na própria PR.
- O validador permite o modo **conteudo** sem fotos/vídeo, porém falha ao detectar qualquer outra lacuna editorial. A PR fica pronta aguardando apenas as mídias.

## 5. Produção visual — prompts UM POR VEZ

Apenas depois da etapa 4 concluída:

- Entregar **um único prompt de imagem por mensagem**. Receber a fotografia produzida, verificar se corresponde ao parágrafo, confirmar enquadramento e correção anatômica, e só então enviar o próximo prompt. Nunca enviar um conjunto de prompts de uma vez.
- Cada tópico: **duas fotografias cinematográficas diferentes**, personagens fictícios, 16:9 horizontal, mínimo de 1280 px, preferencialmente 1600 × 900 ou equivalente próximo. Sem textos, logotipos, badges, fardas ou equipamentos incoerentes, nomes, marcas ou watermarks. Ambientes civis para medicina do passageiro; militar só quando o assunto exigir. Fotos diferentes, sem cenas repetidas.
- Cada voo: **uma animação SVG interativa leve** no código (laço e pausa ao toque), gráficos/tabelas pertinentes e **um vídeo MP4 real** de aproximadamente oito segundos (H.264, 1280 × 720, 16:9, SEM áudio, loop); única exceção é M2V1 já autorizada pelo autor.
- Nomear fotos por voo, tópico e cena: `m2v11-1-sangue-altitude.jpg`, `m2v11-1-avaliacao.jpg`. Vídeo: `m2v11-voo.mp4`. São **exemplos de nomes**, definidos antes de cada prompt e registrados no código.
- Integrar as mídias reais no `assets/images/topicos/` e `assets/videos/`; colocar cada recurso logo após o parágrafo que ilustra, evitar duas mídias do mesmo tipo em sequência e **não deixar dois parágrafos consecutivos sem recurso**. Abertura deve trazer foto ou animação nos dois primeiros parágrafos.
- Fotografias e vídeo são verificados por dimensões, formato, hash, codec, duração e ausência de áudio; arquivos repetidos ou ausentes bloqueiam a publicação.

## 6. Publicação automática após a ÚLTIMA mídia

O GitHub Actions `.github/workflows/producao-voos.yml` é acionado a cada push para `voo/**` e `m2v10-digestivo`. Ele:

1. Reconhece o código do voo e verifica TypeScript, testes, capítulos congelados e **zero textos faltantes** em ambos os idiomas.
2. Executa o validador editorial `conteudo`. Se só faltam imagens ou vídeo, registra o estado e **não faz merge**.
3. Após as mídias chegarem, executa `publicar`: duas fotos por tópico, interativos, animação, tabelas, vídeo válido, distribuição por parágrafo; auditoria global de mídias, exportação HTML, checagem do catálogo e requisitos de publicação.
4. Se **todos** os testes passam e a PR está pronta, com o selo `editorial-aprovado`, faz merge por SHA exato na `main`. O workflow existente `publicar-papos-pages.yml` publica o HTML no endereço público. Se qualquer validação falhar, não faz merge nem publica.
5. Confirmar o resultado do GitHub Pages e abrir a rota pública. Publicação **automática**, não instantânea: depende da conclusão do CI e do deploy. Não presumir sucesso sem verificação.

**GitHub Pages:** https://skyarecom.github.io/app.book.med.aeroespacial/

**Importante:** o fluxo é para o PWA/HTML. Publicação de nova versão Android na Google Play depende separadamente de EAS, assinatura, loja e seus requisitos, conforme `docs/publicacao.md`. Não ligar cobrança por conta própria.

## 7. Próxima produção

Seguir a Missão Sistemas a partir do **M2V11 — Sangue, câncer e infecções**. Depois de texto, traduções, testes e revisão, enviar somente o prompt da **primeira fotografia**, aguardar sua entrega e prosseguir uma por vez. Não aproveitar imagens de outro voo por semelhança aparente. Não modificar capítulos congelados.
