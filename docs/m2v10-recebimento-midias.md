# M2V10 · Controle de recebimento das mídias — 05/11/2026

Foram recebidas nesta conversa **12 fotografias cinematográficas**. Conferidas visualmente: sem marcas, crachás, insígnias ou texto legível relevante. As imagens foram preparadas fora do repositório em JPEG 1600 × 893 px, qualidade 82, sem metadados.

## Correspondência aprovada para inserção

| Tópico | Nome do arquivo | Situação |
|---|---|---|
| 10.1 | `m2v10-1-cabine.jpg` | Recebida e tratada |
| 10.1 | `m2v10-1-corredor.jpg` | Recebida e tratada |
| 10.2 | `m2v10-2-refeicao.jpg` | Recebida e tratada |
| 10.2 | `m2v10-2-consulta.jpg` | Recebida e tratada |
| 10.3 | `m2v10-3-hidratacao.jpg` | Recebida e tratada |
| 10.3 | `m2v10-3-acompanhamento.jpg` | Recebida e tratada (182692.jpg) |
| 10.4 | `m2v10-4-avaliacao.jpg` | Recebida e tratada |
| 10.4 | `m2v10-4-tratamento.jpg` | Recebida e tratada |
| 10.5 | `m2v10-5-vesicula.jpg` | Recebida e tratada |
| 10.5 | `m2v10-5-pancreas.jpg` | Recebida e tratada |
| 10.6 | `m2v10-6-recuperacao.jpg` | Recebida e tratada |
| 10.6 | `m2v10-6-reabilitacao.jpg` | Recebida e tratada |

**Atenção:** os 12 arquivos binários tratados encontram-se no pacote de trabalho gerado no ChatGPT, mas **não estão enviados ao GitHub**. A ligação pelo campo `figura` / `require()` só deve ser introduzida depois da inclusão real desses binários em `assets/images/topicos/`; caso contrário a compilação quebrará.

## Vídeo recebido e tratado

- Arquivo recebido nesta conversa: `182690.mp4`.
- Visual: passageira fictícia na cabine, passando de leve desconforto abdominal à recuperação; sem letreiros, logotipos ou insígnias relevantes.
- Entrada: 1280 × 720, 24 fps, 10,0267 s, com áudio AAC.
- Saída tratada: `m2v10-gas-cabine.mp4`, **8,000 s, 1280 × 720, H.264, yuv420p, áudio removido, `+faststart`**.
- O binário final está no pacote de trabalho gerado nesta conversa. **Não está integrado ao GitHub**, pois a transferência de binários a partir do ambiente de processamento não está disponível aqui.

## Pacote completo

- **12 fotos** recebidas e tratadas, incluindo a última (`182692.jpg` → `m2v10-3-acompanhamento.jpg`, 1600 × 893, JPEG qualidade 82, sem metadados).
- **1 vídeo** recebido e tratado, `m2v10-gas-cabine.mp4`, 8 segundos, sem áudio.
- Pacote disponibilizado nesta conversa: `M2V10_midias_completas_12_fotos_1_video.zip`, com `assets/images/topicos`, `assets/videos`, `SHA256SUMS.txt` e instruções.

## Pendências de integração

- Transferir as 12 fotografias e o vídeo tratados para o ramo `m2v10-digestivo` no GitHub. Até isso acontecer, não inserir `require()` de arquivos ausentes.
- Inserir recursos `figura` e `video` nos tópicos, conferir alternância por parágrafo e rodar auditoria de mídias.
- Concluir traduções e testes de compilação, visualização e publicação.

Não mover o ramo para `main` nem publicar até a conclusão integral das verificações.

## Como incluir os binários sem quebrar o ramo

1. Na cópia de trabalho do ramo `m2v10-digestivo`, descompactar `M2V10_midias_completas_12_fotos_1_video.zip` na raiz do projeto, mantendo os caminhos `assets/images/topicos` e `assets/videos`.
2. Executar `node scripts/m2v10-integrar-midias.cjs`. O script verifica previamente todos os 13 arquivos; se faltar algum, não modifica o capítulo.
3. Rodar `npx tsc --noEmit`, `node scripts/check-m1v1-frozen.cjs`, `node scripts/traduzir.cjs`, `npm run -s auditar:midias`, `npm run export:web`, `npm run -s loja:ficha` e `npm run -s check:publicacao`; também conferir as telas a 320 e 390 px.
4. Apenas após correções, revisão médica e todos os testes passarem: commit do código e dos binários no ramo e revisão da PR, antes de qualquer merge.

## Instalação automática pelo GitHub — um único arquivo

O ramo contém a automação `.github/workflows/importar-midias-m2v10.yml`. Ela é acionada quando o autor adiciona **somente o ZIP** `M2V10_midias_completas_12_fotos_1_video.zip` à raiz do ramo `m2v10-digestivo` no GitHub.

No celular: abra o repositório → selecione o ramo `m2v10-digestivo` → `Add file` / `Upload files` → escolha o ZIP inteiro (sem descompactar) → `Commit changes` nesse ramo, **nunca em `main`**. A ação automatizada valida o manifesto SHA-256, extrai os 13 arquivos para `assets/`, executa o integrador, compila e exporta a versão web, registra as alterações no ramo e remove o ZIP original do GitHub.

A automação não mescla nem publica a `main`. Depois da importação ainda é obrigatório cumprir tradução completa (0 textos faltantes), auditoria e revisão clínica, seguido de avaliação dos três workflows de publicação.
