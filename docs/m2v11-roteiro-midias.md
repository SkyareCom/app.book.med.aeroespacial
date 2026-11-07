# M2V11 — Produção audiovisual sequencial

**Status:** capítulo, tabelas, teste, formulário e interativos implementados no ramo `voo/M2V11`. Fotos e vídeo não são simulados no app e não serão referenciados até receber os arquivos finais.

**Ordem obrigatória:** enviar UM prompt de fotografia por vez, conferir a foto recebida, inserir o JPEG final no projeto e só então enviar o próximo prompt. Quando as doze fotos estiverem concluídas, solicitar um vídeo sem áudio. Revisão editorial clínica e EN/ES devem ser concluídas antes da primeira mídia. Nenhum merge antecipado.

**Padrão:** fotorealismo editorial de medicina aeroespacial, personagens fictícios, enquadramento horizontal 16:9, 1600 × 900 px preferido, mínimo 1280 px, ambiente verossímil e diferenciável, sem textos, logotipos, marcas, identificações pessoais, distorções anatômicas ou imagens de exames com achados falsos. Respeitar diversidade natural de cenários e pessoas; evitar repetição de personagens, posição e consultórios. Nada de sangue exposto, dramatização inadequada, confusão entre laboratórios e ambientes aeronáuticos. Não implicar que um exame isolado autoriza a voar.

| Ordem | Arquivo JPG | Tópico | Após parágrafo | Direção de arte |
|---:|---|---|---:|---|
| 1 | `m2v11-1-sangue-altitude.jpg` | 11.1 Sangue em altitude | 2 | Cientista diante de amostra de sangue lacrada em laboratório, avião comercial ao fundo; ligação sangue e oxigênio |
| 2 | `m2v11-1-planejamento-voo.jpg` | 11.1 Sangue em altitude | 4 | Médico aeroespacial analisando capacidade funcional e histórico com passageiro em centro médico próximo ao aeroporto |
| 3 | `m2v11-2-hemograma.jpg` | 11.2 Anemia e anticoagulação | 2 | Exame pré-viagem, médica interpretando hemograma desfocado com paciente, sem valores legíveis |
| 4 | `m2v11-2-anticoagulacao.jpg` | 11.2 Anemia e anticoagulação | 4 | Consulta farmacológica segura sobre continuidade da anticoagulação, medicamentos sem rótulos |
| 5 | `m2v11-3-oncologia.jpg` | 11.3 Câncer e quimioterapia | 2 | Consulta oncológica pré-viagem, paciente clinicamente estável e médico, sem estigmas visuais |
| 6 | `m2v11-3-acompanhamento.jpg` | 11.3 Câncer e quimioterapia | 4 | Seguimento multidisciplinar, discussão de itinerário e plano de cuidados em ambiente diferente |
| 7 | `m2v11-4-prevencao.jpg` | 11.4 Infecções transmissíveis | 2 | Viajantes em cabine comercial com ventilação realista; nenhuma sugestão de contágio pelo toque casual |
| 8 | `m2v11-4-avaliacao.jpg` | 11.4 Infecções transmissíveis | 4 | Médico avaliando sintomas respiratórios em clínica, abordagem profissional não alarmista |
| 9 | `m2v11-5-infectologia.jpg` | 11.5 HIV e viagem | 2 | Consulta confidencial entre infectologista e passageiro, dignidade e ausência de estigmatização |
| 10 | `m2v11-5-medicamentos.jpg` | 11.5 HIV e viagem | 4 | Preparação discreta de medicamentos prescritos para jornada internacional, sem rótulos legíveis |
| 11 | `m2v11-6-vacinacao.jpg` | 11.6 Vacinas | 2 | Profissional de saúde aplicando vacina com técnica plausível em clínica de viagem, sem produtos identificáveis |
| 12 | `m2v11-6-carteira.jpg` | 11.6 Vacinas | 4 | Consulta de medicina de viagem com carteira de vacinação sem inscrições legíveis e mapa sem palavras |
 
**Vídeo (depois das 12 fotos):** `m2v11-sangue-voo.mp4`. Cerca de 7–8 segundos, H.264, 1280 × 720 ou 1920 × 1080, sem áudio, loop contínuo. Laboratório com equipamento médico realista e técnico observando amostra lacrada; corte suave para cabine em altitude, sem alegações quantitativas ou exposição de pacientes reais. Confirmar duração e codec antes da integração.

**Integração prevista:** `assets/images/topicos/` e `assets/videos/`; cada recurso após o parágrafo registrado acima no arquivo `src/data/capitulos/sangue-imunidade.ts`. Preservar sequência de recursos do mesmo tópico (interativo/infográfico/tabela). Nunca adicionar `require()` para arquivo ainda ausente. Após a última mídia executar `npm run typecheck`, `npm test`, congelamentos, tradução zero pendências, `npx tsx --require ./scripts/stub-assets.cjs scripts/validar-voo.mjs M2V11 publicar`, auditoria de mídias, `npm run export:web`, `npm run check:publicacao` e checagem visual 320/360/390 px.

**Sem publicação antecipada:** a PR #6 é rascunho, só fica pronta após revisão clínica e mídias. O capítulo M2V10 continua congelado.
