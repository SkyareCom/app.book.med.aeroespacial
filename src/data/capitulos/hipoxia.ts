// Missão 2 (Sistemas) · Voo 1 — Pulmões, oxigênio e hipóxia (o número do voo é definido em secoes.ts).
// 02/11/2026: título trocado de "Respiração e hipóxia" para "Pulmões, oxigênio e hipóxia", com autorização do autor
//   (padrão dos títulos da missão Sistemas); conteúdo intacto; hash refeito.
// Conteúdo reorganizado em narrativa técnica contínua, com conceitos encadeados e destaques.
// Valores de tempo de consciência útil: FAA Advisory Circular 61-107 (tabela de TUC).
// Padrão de mídias (27/10/2026): recursos posicionados por parágrafo; tabelas-resumo montadas a partir do próprio texto;
// animações esquemáticas (cascata do oxigênio, hiperventilação). Fotos e vídeo do autor (pessoas fictícias): topicos/m2v1-*.jpg; m2v1-5-oxigenio é quadro do vídeo enviado em 28/10/2026.
// REVISÃO 30/10/2026 (foco no organismo, pedido do autor): tabela "Sistemas do corpo mais atingidos" montada só com
//   dados já registrados neste voo.

// ADAPTAÇÃO AO MODELO DE SISTEMAS (02/11/2026, autorizada pelo autor; docs/modelo-sistemas.md): tabela "O que muda em
//   altitude" no tópico I; tópicos VI a IX escritos (asma e DPOC, apneia do sono, pneumotórax, simulação de altitude);
//   tabela de sistemas do corpo movida para o fim do voo; perguntas do formulário de liberação em
//   src/data/liberacao/respiratorio.ts. Fontes:
// - British Thoracic Society, Clinical Statement on air travel for passengers with respiratory disease (Coker RK et al.,
//   Thorax 2022;77(4):329-50; doi 10.1136/thoraxjnl-2021-218110): cabine até 2.438 m (8.000 ft), SaO2 > 90% no saudável;
//   gás em espaço fechado expande cerca de 38% a 2.438 m; teste de hipóxia com 15% de O2; PaO2 ≥ 6,6 kPa (50 mmHg) ou
//   SpO2 ≥ 85% sem O2, abaixo disso O2 recomendado, titulado para ≥ 85%; SpO2 em repouso > 95% em geral sem O2; DPOC
//   com SpO2 ≤ 95%, MRC ≥ 3 ou dessaturação < 84% na caminhada: considerar o teste; doença intersticial com SpO2 < 95% no
//   esforço; CVF < 1 L; fluxos de 2 L/min, + 2 L/min para quem usa O2 domiciliar; concentradores raramente > 3 L/min
//   contínuos; pneumonia com SpO2 < 94%: adiar 7 dias; TVP ou TEP recentes: 2 semanas; pneumotórax: 7 dias após
//   resolução completa no raio X; fechado e não tratado em geral impede; toracotomia com pleurodese sem restrição extra;
//   VATS com recorrência cerca de 4 vezes maior; cirurgia torácica: 4 semanas após retirar o dreno (2 se essencial);
//   biópsia percutânea, procedimento pleural e broncoscopia com biópsia: 1 semana (da resolução, se houve pneumotórax);
//   asma e DPOC: remédios e espaçador na bagagem de mão, alívio à mão, caneta de adrenalina acessível, asma grave com
//   corticoide oral de emergência combinado com o especialista; DPOC: prudente evitar voar 6 semanas após exacerbação
//   (poucos dados); só voar estável e com alívio no uso habitual; apneia: CPAP na bagagem de mão com carta, aprovação
//   da companhia, voos diurnos, CPAP a bordo em voo noturno, sem álcool e sedativos 12 h antes e durante, baterias para
//   1,5 vez a duração da viagem.
// - FAA, Guide for Aviation Medical Examiners: Pleura and Pleural Cavity (pneumotórax traumático: emitir 3 meses após a
//   resolução; espontâneo: decisão da FAA, resolução no raio X e sem bolhas; repetido: só após cirurgia, em geral 3 meses
//   depois); Asthma (CACI Asthma Worksheet: sintomas ≤ 2 dias/semana; ≤ 2 consultas por exacerbação e ≤ 2 cursos de
//   corticoide oral por ano; sem internação no último ano; VEF1 e CVF ≥ 80% antes do broncodilatador; aceitos LABA,
//   corticoide inalado, montelucaste e SABA; anticorpos monoclonais não aceitos no CACI); COPD (disposition table: sempre
//   adiar para a FAA; autorização especial com SpO2 ≥ 96% em repouso, VEF1 pós-BD ≥ 61%, caminhada de 6 min com queda de
//   1–3% e ≥ 400 m, até 3 remédios, sem corticoide oral diário); Obstructive Sleep Apnea (desqualificante até tratamento
//   eficaz; > 90% com IMC ≥ 40 têm AOS que exige tratamento; até 30% com AOS têm IMC < 30; fatores de risco; alto risco:
//   90 dias para responder; sintomas com risco imediato: adiar); 14 CFR 61.53 (proibição de atuar com deficiência médica).
// - ANAC, RBAC 67, 67.81(a)(1)–(7) (registro em src/lib/cma.ts): asma, doença crônica, doença ativa, pneumotórax não
//   resolvido, doença bolhosa; 67.85(a) corticoide; 67.15(c) diminuição da aptidão e 67.71(c) condição não prevista
//   (numeração conferida na Emenda 05 em 02/11/2026: mesma das alíneas citadas). Apneia do sono: o texto da Emenda 05
//   (Subparte C) não cita apneia nem sono; entra por 67.71(c). Exigências para a 2ª classe [confirmar na referência]:
//   o texto consultado da Subparte D termina em 67.117.
// Descongelado e recongelado em 02/11/2026 (pedido do autor, "Resolva tudo"): só a confirmação da apneia no RBAC 67.
// - CAA da Nova Zelândia, Medical Manual, Part 3, Spontaneous (Primary) Pneumothorax: sem cirurgia, relevante se < 5 anos
//   (Classe 1) ou < 3 anos (Classe 2); recorrência sem cirurgia dificilmente certificada.
// - FAA, Guia do AME, Pharmaceuticals/sleep aids (registro em src/lib/cma-internacional.ts): uso diário de indutor do
//   sono não permitido.
// - MEDIF: formulário médico das companhias aéreas (ex.: SWISS, lx_medif-form_en.pdf).
// 02/11/2026: 8 fotos dos tópicos VI a IX (topicos/m2v1-6..9-*.jpg, pessoas fictícias), no padrão do app (1.600 × 893 px);
//   borrados o número da poltrona e o rótulo do batom (bombinha), os painéis e a dragona (sonolência) e a marca do
//   monitor (teste). Voo congelado de novo.
// 02/11/2026: raio X do pneumotórax trocado com autorização do autor (imagem nova com linha pleural e faixa sem
//   desenho pulmonar); legenda passa a nomear o achado; hash refeito.
// Descongelado em 03/11/2026 com autorização do autor ("Detalhar todo tópico de todos os sistemas como foi feito em jet
//   lag"): tópicos I a V ganharam parágrafo "Como..." e tabela prática; VI a IX, tabela de checklist com os dados já
//   registrados. Fontes novas: ICAO Doc 8984 Part II Cap. 1, 1.2.12–1.2.13 e Tabela II-1-2 (saturação a 8.000, 10.000,
//   12.000, 14.000, 15.000, 20.000 e 25.000 ft; tripulante usa oxigênio acima de 10.000 ft de cabine; TCU de 10 min a
//   20.000 ft, ≤ 2,5 min a 25.000 ft e ~30 s a 30.000 ft; quatro tipos, histotóxica relevante na sobrevivência a
//   acidentes); FAA AIM 8-1-2 (faraim.org): oxigênio recomendado acima de 10.000 ft de dia e de 5.000 ft à noite;
//   tripulação com oxigênio após 30 min entre 12.500 e 14.000 ft e sempre acima de 14.000 ft; todos acima de 15.000 ft
//   (14 CFR 91.211); treinamento em câmara recomendado. Oxigênio e pouso na suspeita de monóxido, e respiração lenta
//   consciente após excluir a hipóxia, são condutas práticas sem número próprio. Voo congelado de novo.

// 10/11/2026 · Doenças, tratamentos e tipo de voo, a pedido do autor ("As doenças devem aparecer no texto e nao em
//   tabelas isoladas / Todas com seus tratamentos indocados e influenciados pelos voos / Entrararem ma liberacao para voos
//   / Prognostico relacionado ao voo / Periodo indicado de adiamento ou tepouso etc / Tratamentos cirurgicos ou invasivos
//   destacados ou enfatizados" e "Tratamentos exectantes e nao invasivos também devem entrar"), com autorização para
//   alterar o voo congelado ("Autorizo todos", 10/11/2026): um parágrafo de tratamentos (expectante, não invasivo e
//   invasivo), prognóstico e tipo de voo nos tópicos II, VI, VII e VIII; comparador "tipo de voo"; tabela de tratamentos
//   da apneia; opção de apneia operada na liberação. Prazos: BTS 2022 (acima); FAA OSA ("once effective treatment is
//   shown"); UK CAA, Obesity information sheet (cirurgia bariátrica, até 3 meses) e Surgical conditions (10 dias após
//   cirurgia abdominal). Expansão de 50% a 10.000 ft: lei de Boyle com gás saturado a 37 °C, (760 − 47)/(523 − 47).
//   Linhas de tratamento (redução de volume pulmonar por cirurgia ou válvula, transplante, aparelho intraoral, cirurgia
//   das vias aéreas, estimulador do hipoglosso, aspiração e dreno, pleurodese, câmara hiperbárica no monóxido, dreno
//   antes do transporte aeromédico, monóxido pelo aquecimento por escapamento no avião leve): conhecimento médico e
//   aeronáutico geral, sem número próprio. Remissão do sono corrigida de "M3V2" para "M2V8 - VII".
import type { Capitulo } from '../tipos';
import { liberacaoRespiratorio } from '../liberacao/respiratorio';

// 11/11/2026 (pedido do autor "Finalize todos os blocos incompletos"; voo congelado autorizado com "Autorizo todos"):
//   orientações práticas renomeadas para "Como prevenir e amenizar", parágrafos novos em 3.1, 3.3 e 3.4, tabelas de
//   liberação e de remédios em 3.2 a 3.5, 3.8 e 3.9, tabela de prevenção em 3.1 e atividade "Hipóxia ou hiperventilação?".
//   Álcool: 14 CFR 91.17 (8 h e menos de 0,04%); máscara de colocação rápida acima do FL250: 14 CFR 121.333; antialérgico
//   e sedativos: FAA AME Guide, Pharmaceuticals (esperar 5 meias-vidas); ISRS: FAA SSRI Decision Path (4 remédios, 6
//   meses estável); monóxido de carbono do cigarro e oxímetro com dedos frios: FAA AM-400-09/3; resposta renal em dias de
//   altitude: Fundamentals of Aerospace Medicine; anticoagulante: RBAC 67 (Veja M2V11 - II).
export const hipoxia: Capitulo = {
  numero: 3,
  titulo: 'Pulmões, oxigênio e hipóxia',
  tempoLeituraMin: 45,
  topicos: [
    {
      id: '3.1',
      titulo: 'Transporte de oxigênio',
      pergunta: 'O que acontece com o oxigênio do ar até chegar ao cérebro?',
      conteudo: {
        texto: [
          "Respirar é só o começo. Para chegar ao cérebro, o oxigênio percorre quatro etapas: **ar, alvéolo, sangue e tecido**. Em altitude, o ar continua com cerca de 21% de oxigênio, mas sua **pressão parcial** cai (Veja M1V1 - II), e o empurrão que leva o gás para dentro do corpo enfraquece.",
          "Nos **alvéolos**, pequenos sacos no fim das vias aéreas, o oxigênio atravessa a **membrana alvéolo-capilar** e entra no sangue. Ali, a **hemoglobina** das hemácias o carrega até os tecidos, e a circulação precisa levá-lo até onde ele é usado.",
          "Ao nível do mar, a **pressão alveolar de oxigênio** fica perto de **100 mmHg**. A 8.000 ft (2.400 m), cai para **65 a 70 mmHg**, e a saturação de pessoas saudáveis costuma ficar entre **90% e 93%**, conforme a resposta da respiração.",
          "A **curva de dissociação da oxi-hemoglobina** explica o perigo: no início, a saturação resiste; depois de certo ponto, cada nova queda de pressão derruba a saturação cada vez mais rápido. Altitude, tempo de exposição, respiração e doenças mudam essa resposta. Descobrir em qual das quatro etapas o oxigênio falhou é o primeiro passo para corrigir.",
          "O corpo reage à queda. Em minutos, a **respiração** e o **coração** aceleram para levar mais oxigênio; em dias de altitude, o rim estimula a produção de mais **hemácias**. Na cabine, porém, o voo é curto demais para essa adaptação lenta: conta só a resposta imediata, que custa esforço e varia de pessoa para pessoa.",
          "**Como prevenir e amenizar.** Cada etapa tem a sua proteção. No **ar**, a pressurização ou o oxigênio suplementar; a FAA recomenda oxigênio acima de **10.000 ft de dia** e acima de **5.000 ft à noite**, e a ICAO lembra que, acima de **10.000 ft** de cabine, o tripulante deve usar oxigênio. No **alvéolo**, controlar a doença do pulmão antes de voar (Veja M2V1 - VI). No **sangue**, tratar a **anemia** e evitar o **monóxido de carbono** (Veja M2V1 - II). No **tecido**, cuidar da circulação. A saturação cai com a altitude de forma previsível: cerca de **93%** a 8.000 ft, **89%** a 10.000 ft e **80%** a 15.000 ft em quem não tem doença.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · caminho do oxigênio",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Cabine pressurizada, pessoa saudável", "Pode voar: a saturação cai para 90% a 93%, o que o corpo saudável tolera", "Pode voar, porque a cabine até 8.000 ft fica dentro da reserva"],
                ["Voo não pressurizado acima de 10.000 ft de dia ou 5.000 ft à noite", "Usar o oxigênio oferecido: a pressão do oxigênio no alvéolo já caiu", "Oxigênio conforme a FAA e a ICAO, porque a hipóxia tira o julgamento sem aviso"],
                ["Doença do pulmão, do coração ou anemia", "Avaliar com o médico e o teste de simulação: uma etapa do caminho já falha no solo (Veja M2V1 - IX)", "Avaliação do examinador, porque a etapa que falha soma à queda da cabine"],
              ],
            },
          },
          { paragrafo: 1, midia: 'animacao-cascata' },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-1-alveolos.jpg'), legenda: 'Nos alvéolos, cachos de pequenos sacos envolvidos por capilares, o oxigênio passa do ar para o sangue.' } },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m2v1-1-oximetro.jpg'), legenda: 'O oxímetro de dedo mostra a saturação: em cruzeiro, um pouco abaixo da do solo em pessoas saudáveis.' } },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'O que muda em altitude',
              colunas: ['Fator do voo', 'O que acontece no pulmão', 'Quem é mais vulnerável'],
              linhas: [
                ['Menos oxigênio', 'A 8.000 ft, a pressão alveolar de oxigênio cai para 65 a 70 mmHg; o saudável satura de 90% a 93%', 'DPOC, doença intersticial e fraqueza dos músculos da respiração: o sangue já sai do pulmão com pouco oxigênio, e a queda da cabine o leva para a parte íngreme da curva da hemoglobina, onde pouca perda de pressão derruba muito a saturação (Veja M2V1 - IX)'],
                ['Gás que expande', 'Ar preso numa cavidade fechada cresce cerca de 38% a 8.000 ft', 'Pneumotórax e bolhas no pulmão: o ar preso não tem saída para igualar a pressão; ao crescer, comprime o pulmão e pode romper a pleura (Veja M2V1 - VIII)'],
                ['Sono a bordo', 'As pausas da apneia somam-se à saturação mais baixa da cabine', 'Apneia do sono: a cada pausa o oxigênio do sangue cai; partindo da saturação mais baixa da cabine, as quedas ficam mais fundas (Veja M2V1 - VII)'],
                ['Doença aguda recente', 'Pneumonia, trombose e embolia deixam pouca reserva', 'Quem teve o episódio nas últimas semanas: parte do pulmão ainda troca mal o gás, com alvéolos inflamados ou vasos obstruídos, e o sangue passa por ali sem pegar oxigênio (Veja M2V1 - IX)'],
              ],
            },
          },
          { paragrafo: 4, midia: 'simulador-o2' },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'O oxigênio do sangue em cada altitude',
              colunas: ['Altitude', 'Saturação aproximada', 'O que acontece'],
              linhas: [
                ['8.000 ft (2.450 m)', '93%', 'Cabine pressurizada no limite; saudável sem sintomas'],
                ['10.000 ft (3.050 m)', '89%', 'Funções complexas pioram; tripulante usa oxigênio acima disso (ICAO)'],
                ['12.000 ft (3.650 m)', '87%', 'Memória curta e erros de omissão'],
                ['14.000 ft (4.250 m)', '83%', 'Todos têm a função mental prejudicada'],
                ['15.000 ft (4.550 m)', '80%', 'Todos prejudicados, alguns gravemente'],
                ['20.000 ft (6.100 m)', '65%', 'Perda da consciência útil em cerca de 10 minutos'],
                ['25.000 ft (7.600 m)', 'Abaixo de 60%', 'Consciência útil de 2,5 minutos ou menos'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.2',
      titulo: 'Tipos de hipóxia',
      pergunta: 'Falta de oxigênio é sempre por causa da altitude?',
      conteudo: {
        texto: [
          "**Hipóxia** é a falta de oxigênio nos tecidos, por oferta ou por uso insuficiente. A altitude é só uma das causas: a falha pode acontecer em qualquer etapa entre o ar e a célula. Por isso a medicina aeroespacial a divide em **quatro mecanismos**, que podem se somar.",
          "Na **hipóxia hipóxica**, falta pressão de oxigênio no pulmão: é a hipóxia clássica da altitude sem proteção. Na **hipóxia hipêmica**, o sangue perde a capacidade de carregar oxigênio, como na **anemia** ou na **intoxicação por monóxido de carbono**, que se liga fortemente à hemoglobina e ainda dificulta a entrega do oxigênio aos tecidos.",
          "Na **hipóxia estagnante**, o sangue não chega com o fluxo necessário, como nos distúrbios circulatórios ou nas acelerações que reduzem o sangue no cérebro (Veja M1V7). Na **hipóxia histotóxica**, o oxigênio chega, mas a célula não consegue usá-lo; o exemplo clássico é o **cianeto**.",
          "Os mecanismos se somam. Um piloto anêmico, ou exposto a monóxido de carbono, tem menos reserva para enfrentar a altitude. Em aviões a pistão, **vazamentos do escapamento** são um risco real, mesmo perto do solo.",
          "Reconhecer o mecanismo orienta a resposta. O oxigênio suplementar ajuda em muitas situações, mas **não substitui corrigir a causa**: pressurização falha, cabine contaminada, anemia, problema circulatório ou exposição tóxica.",
          "**Doenças, tratamentos e tipo de voo.** Cada tipo de hipóxia tem as suas doenças. A **hipóxica** vem da **asma**, da **DPOC**, da **apneia do sono**, do **pneumotórax** e da **pneumonia** (Veja M2V1 - VI a IX); a **hipêmica**, da **anemia** e da intoxicação por **monóxido de carbono** (Veja M2V11 - II); a **estagnante**, da **insuficiência cardíaca** (Veja M2V2). O tratamento vai do **expectante**, no pneumotórax pequeno sem sintomas, acompanhado com raio X, ao **não invasivo**, que é a maioria: **oxigênio**, bombinhas, **CPAP** e antibiótico. Os **invasivos** são o **dreno no tórax**, a **cirurgia** do pulmão e, na intoxicação grave por monóxido, a **câmara hiperbárica**. No avião **pressurizado**, a cabine chega a 8.000 ft; no **não pressurizado**, o oxigênio suplementar é obrigatório acima de certas altitudes (Veja M1V2), e o aquecimento da cabine pelo escapamento pode vazar monóxido; no **helicóptero**, que voa baixo, a hipóxia de altitude é rara, salvo na montanha.",
          "**Como prevenir e amenizar.** A **hipóxica** se previne com pressurização e oxigênio nas altitudes certas. A **hipêmica**, tratando a anemia antes de voar (Veja M2V11) e desconfiando do **monóxido de carbono** em aviões a pistão: dor de cabeça, tontura ou sonolência com o aquecimento ligado pedem oxigênio e pouso. A **estagnante** das acelerações se previne com a manobra e o traje anti-G (Veja M1V7). A **histotóxica** aparece sobretudo na fumaça de incêndio, em que o **cianeto** e o monóxido se somam: proteção respiratória e saída rápida (Veja M3V8).",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · tipos de hipóxia",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Ferro oral", "Repõe a hemoglobina em semanas; pode irritar o estômago", "Compatível, porque não dá sono; a volta depende da hemoglobina recuperada"],
                ["Oxigênio a 100%", "Acelera a saída do monóxido de carbono da hemoglobina", "Tratamento de emergência; volta ao voo só recuperado, porque os sintomas podem persistir"],
                ["Remédio que baixa a pressão", "Pode dar tontura ao levantar e somar à hipóxia", "Aceito se estável e sem efeitos colaterais, porque a tontura tira o desempenho"],
                ["Calmantes e remédios para dormir", "Deprimem a respiração e o julgamento", "FAA: Do Not Fly; esperar 5 meias-vidas, porque somam sono e lentidão à hipóxia"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Liberação para voo · tipos de hipóxia",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Anemia", "Avaliar antes: com pouca hemoglobina, a cabine derruba o oxigênio dos tecidos (Veja M2V11 - II)", "RBAC 67: avaliar a causa e o hemograma, porque a reserva para a hipóxia diminui"],
                ["Intoxicação recente por monóxido de carbono", "Não embarcar até tratar: o monóxido ainda ocupa a hemoglobina", "Não voar até recuperar e revisar o aquecedor, porque o monóxido soma à hipóxia de altitude"],
                ["Doença da circulação, como insuficiência cardíaca", "Avaliar com o cardiologista: o fluxo baixo soma à cabine (Veja M2V2)", "Avaliação do examinador, porque o fluxo baixo reduz a reserva"],
                ["Álcool nas horas antes do voo", "Evitar beber antes e durante o voo: o álcool piora o uso do oxigênio", "FAA: 8 h desde o último gole e menos de 0,04% no sangue, porque o álcool soma à hipóxia"],
              ],
            },
          },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-2-fumaca.jpg'), legenda: 'Fumaça na cabine: monóxido de carbono e outros tóxicos podem roubar o oxigênio do sangue e das células.' } },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Os quatro mecanismos da hipóxia',
              colunas: ['Tipo', 'Onde falha', 'Exemplos'],
              linhas: [
                ['Hipóxica', 'Pressão de oxigênio no pulmão', 'Altitude sem proteção'],
                ['Hipêmica', 'Transporte pelo sangue', 'Anemia, monóxido de carbono'],
                ['Estagnante', 'Fluxo de sangue', 'Distúrbios circulatórios, acelerações'],
                ['Histotóxica', 'Uso pela célula', 'Cianeto'],
              ],
            },
          },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v1-2-escapamento.jpg'), legenda: 'Inverno num monomotor: gás do escapamento entrando pela ventilação do aquecedor causa sonolência e dor de cabeça.' } },
          { paragrafo: 5, midia: 'classificar-hipoxia' },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Como prevenir e amenizar · tipos de hipóxia',
              colunas: ['Tipo', 'Exemplo', 'Como prevenir'],
              linhas: [
                ['Hipóxica', 'Altitude sem pressurização ou descompressão', 'Pressurização e oxigênio nas altitudes certas'],
                ['Hipêmica', 'Anemia; monóxido de carbono do escapamento', 'Tratar a anemia; na suspeita de monóxido, oxigênio e pouso'],
                ['Estagnante', 'Acelerações do voo de caça; problema circulatório', 'Manobra e traje anti-G (Veja M1V7)'],
                ['Histotóxica', 'Cianeto da fumaça de incêndio', 'Proteção respiratória e saída rápida'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.3',
      titulo: 'Tempo de consciência útil',
      pergunta: 'Quanto tempo uma pessoa continua lúcida sem oxigênio a 35.000 ft?',
      conteudo: {
        texto: [
          "O **tempo de consciência útil (TCU)** é o tempo que uma pessoa ainda tem, depois que o oxigênio cai, para perceber o problema e agir certo. **Não é o tempo até desmaiar**: o julgamento e a coordenação falham antes.",
          "Sem oxigênio, numa exposição súbita, o TCU encolhe com a altitude: cerca de **20 a 30 minutos a 18.000 ft**, **3 a 5 minutos a 25.000 ft**, **1 a 2 minutos a 30.000 ft**, **30 segundos a 1 minuto a 35.000 ft** e **15 a 20 segundos a 40.000 ft**. São estimativas, não prazos garantidos.",
          "Esforço físico, fadiga, doenças e diferenças individuais encurtam esse tempo. **Numa descompressão rápida, o TCU pode cair para cerca da metade.**",
          "Alguns fatores **encurtam o TCU antes mesmo da decolagem**. O **monóxido de carbono do cigarro** ocupa parte da hemoglobina, e o fumante começa o voo como se já estivesse mais alto. O **álcool** e os **remédios que dão sono** pioram o julgamento e somam à hipóxia, e o **frio** e o **esforço** aumentam o consumo de oxigênio.",
          "Por isso a regra é imediata: diante de perda de pressurização, **coloque e ajuste a própria máscara de oxigênio antes de qualquer outra tarefa**, depois siga os procedimentos da aeronave. Cada segundo de dúvida consome o tempo disponível.",
          "**Como prevenir e amenizar.** O TCU depende da fonte e da pessoa: para a ICAO, fica perto de **10 minutos a 20.000 ft**, **2,5 minutos ou menos a 25.000 ft** e cerca de **30 segundos a 30.000 ft**; por isso os números servem de alerta, não de prazo. O tempo se ganha antes do problema: conhecer a altitude do voo e o TCU correspondente, saber onde está a máscara e treinar o gesto. O treinamento em **câmara de altitude** mostra o próprio TCU com segurança. Para o tripulante de avião sem pressurização, a regra americana exige oxigênio depois de **30 minutos entre 12.500 e 14.000 ft**, o tempo todo **acima de 14.000 ft**, e para todos os ocupantes **acima de 15.000 ft**.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 5,
            tabela: {
              titulo: "Remédios e voo · tempo de consciência útil",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Calmantes e remédios para dormir", "Atrasam a reação e o julgamento", "FAA: Do Not Fly; esperar 5 meias-vidas, porque roubam segundos do tempo útil"],
                ["Antialérgico que dá sono (difenidramina)", "Dá sono e lentidão", "FAA: Do Not Fly; esperar 5 meias-vidas, porque o sono soma à hipóxia"],
                ["Remédio para enjoo", "Muitos dão sono", "Conferir com o examinador antes de voar, porque o sono encurta a reação"],
              ],
            },
          },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Liberação para voo · tempo de consciência útil",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Fumante", "Pode voar; não fumar antes: o monóxido reduz a reserva", "Pode voar; parar de fumar é a melhor proteção, porque o fumante começa o voo com menos tempo útil"],
                ["Cansaço, esforço ou doença no dia", "Avaliar oxigênio com o médico se a reserva for baixa: o tempo útil encolhe", "Corrigir antes do voo alto, porque cada fator encurta o TCU"],
                ["Voo acima do FL250", "Ouvir a demonstração e saber puxar a máscara: o tempo útil é curto", "Máscara de colocação rápida ao alcance, porque a 35.000 ft o TCU é de 30 s a 1 min"],
              ],
            },
          },
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v1-3-cronometro.jpg'), legenda: 'Quando o alarme acende, o relógio passa a correr contra o piloto: o tempo útil é medido em segundos ou minutos.' } },
          { paragrafo: 2, midia: 'grafico-tuc' },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m2v1-3-descompressao-cabine.jpg'), legenda: 'Descompressão rápida na cabine de comando: névoa, papéis voando e alarmes. O tempo útil cai pela metade, e a máscara vem antes de tudo.' } },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m2v1-3-mascara-primeiro.jpg'), legenda: 'Alarme de cabine: a máscara de colocação rápida vem antes de qualquer outra tarefa.' } },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · perda de pressurização',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Antes do voo', 'Conhecer a altitude do voo e o TCU dela; saber onde está a máscara'],
                ['Treinamento', 'Câmara de altitude para conhecer o próprio TCU com segurança'],
                ['Na perda de pressão', 'Máscara primeiro, ajustada; depois os procedimentos da aeronave'],
                ['Passageiro', 'Colocar a própria máscara antes de ajudar outra pessoa'],
                ['Avião sem pressurização (EUA)', 'Tripulante: oxigênio após 30 min entre 12.500 e 14.000 ft e sempre acima de 14.000 ft; todos acima de 15.000 ft'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.4',
      titulo: 'Sinais e sintomas',
      pergunta: 'Como perceber que está faltando oxigênio?',
      conteudo: {
        texto: [
          "A hipóxia é traiçoeira: **começa sem dor e sem falta de ar clara**. O julgamento, a atenção e a coordenação pioram enquanto a pessoa ainda se sente bem. Essa distância entre o que se sente e o que se consegue fazer é o maior risco a bordo.",
          "Os sintomas variam: **euforia, tontura, calor, formigamento e alterações da visão**. Quem está ao lado pode notar confusão, lentidão, respiração alterada ou lábios azulados, mas **a ausência de cianose não exclui hipóxia**.",
          "A **visão noturna** é das mais sensíveis e pode piorar já em altitudes moderadas. Depois sofrem a memória recente, o raciocínio e os movimentos finos. No treinamento em câmara, cada pessoa aprende a reconhecer o próprio conjunto de sintomas: a **assinatura individual de hipóxia**.",
          "Algumas pessoas têm menos aviso. Quem tem **doença do pulmão, do coração ou anemia** começa com menos reserva, e os sintomas chegam mais cedo; quem fez a câmara há muito tempo pode esquecer a própria assinatura. O **oxímetro de pulso** ajuda nos voos não pressurizados, mas **não substitui o oxigênio** nas altitudes exigidas: a leitura atrasa e pode errar com os dedos frios.",
          "A conduta é a mesma do tempo de consciência útil (Veja M2V1 - III): **ao suspeitar de hipóxia, restabelecer o oxigênio na hora**, sem esperar sinais tardios.",
          "**Como prevenir e amenizar.** Aprenda a sua **assinatura de hipóxia** no treinamento em câmara: ela tende a se repetir e é o alarme mais rápido. À noite, a visão é a primeira a sofrer, e a FAA recomenda oxigênio já **acima de 5.000 ft**. Em altitude, qualquer sintoma estranho, como dor de cabeça, tontura, calor no rosto, visão escurecida ou bocejos, pede **oxigênio primeiro** e só depois a investigação. Na cabine, combine com o colega observar o outro: lábios azulados podem faltar, mas a **confusão** e a **lentidão** aparecem.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 5,
            tabela: {
              titulo: "Remédios e voo · sinais de hipóxia",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Oxigênio suplementar", "Corrige a hipóxia da altitude em minutos", "Usar nas altitudes exigidas, porque é o que reverte a falta de pressão"],
                ["Remédios que dão sono", "Escondem e somam aos sintomas", "FAA: Do Not Fly; esperar 5 meias-vidas, porque atrasam o reconhecimento da hipóxia"],
                ["Remédio para pressão ou coração", "Tontura pode confundir com hipóxia", "Aceito se estável e sem efeitos colaterais, porque a tontura atrapalha o diagnóstico em voo"],
              ],
            },
          },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Liberação para voo · sinais de hipóxia",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Sintomas de hipóxia num voo anterior", "Avaliação médica antes do próximo voo: pode haver doença que reduz a reserva", "Relatar e investigar o sistema e a saúde, porque o episódio pode se repetir"],
                ["Doença com pouca reserva", "Avaliar com o médico e o teste de simulação: os sintomas chegam mais cedo (Veja M2V1 - IX)", "Avaliação do examinador, porque a hipóxia chega antes de ser percebida"],
                ["Lábios azulados ou confusão a bordo", "Avisar a tripulação na hora: é sinal tardio", "Oxigênio na hora e descida, porque o sinal já é tardio"],
              ],
            },
          },
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v1-4-euforia.jpg'), legenda: 'Na câmara, sem máscara, o aluno sorri e acha que está tudo bem enquanto a escrita desanda: a armadilha da hipóxia.' } },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-4-cianose.jpg'), legenda: 'Lábios e unhas azulados denunciam pouco oxigênio no sangue, mas a ausência deles não exclui a hipóxia.' } },
          { paragrafo: 3, midia: 'simulador-visao' },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · sinais de hipóxia',
              colunas: ['Situação', 'O que fazer'],
              linhas: [
                ['Treinamento', 'Conhecer a própria assinatura de hipóxia na câmara'],
                ['Voo noturno', 'Oxigênio recomendado acima de 5.000 ft (FAA)'],
                ['Sintoma estranho em altitude', 'Oxigênio primeiro; depois investigar'],
                ['Colega estranho', 'Confusão e lentidão contam mais que a cor dos lábios'],
                ['Depois do episódio', 'Registrar e conferir o sistema de oxigênio e a pressurização'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.5',
      titulo: 'Hiperventilação',
      pergunta: 'Respirar demais também pode fazer mal?',
      conteudo: {
        texto: [
          "**Hiperventilar** é respirar além do necessário e eliminar **gás carbônico** demais. Ansiedade, dor, estresse e a própria altitude podem provocá-lo. A tontura e o formigamento lembram a hipóxia, mas o mecanismo é outro.",
          "A queda do gás carbônico no sangue, a **hipocapnia**, contrai os vasos do cérebro e reduz o fluxo de sangue nele, além de causar **alcalose respiratória**. Nos casos intensos, o cálcio ionizado cai e surgem **formigamento em volta da boca e nas mãos, espasmos musculares** e mal-estar.",
          "No voo, **hipóxia e hiperventilação podem coexistir ou ser confundidas**. Tratar hipóxia como ansiedade atrasa uma intervenção vital. Por isso, sintoma inexplicado em altitude pede primeiro a checagem do oxigênio e da pressurização.",
          "A ordem é fixa: **oxigênio adequado primeiro, sistema verificado e altitude corrigida, se preciso**. Só depois de excluir a hipóxia vale orientar a respiração mais lenta. **Respirar em saco de papel não é seguro** diante dessa dúvida.",
          "**Doenças, tratamentos e tipo de voo.** A hiperventilação repetida costuma ter uma causa: **ansiedade**, **pânico** e **medo de voar** (Veja M2V7 - II), mas também **asma**, dor e febre. Na crise isolada, a conduta é **expectante** e de respiração: falar devagar, contar a respiração e, antes de tudo, conferir o oxigênio. O tratamento **não invasivo** da causa é a **terapia cognitivo-comportamental**, o treino respiratório e, quando indicado, o remédio, que tem regras para o tripulante (Veja M2V7 - II). Não há tratamento invasivo para a hiperventilação. O prognóstico é bom: tratada a ansiedade, as crises diminuem. No jato **pressurizado**, o passageiro ansioso tem tripulação para ajudar; no avião **não pressurizado**, acima de 10.000 ft, hipóxia e hiperventilação se confundem, e o oxigênio vem primeiro; no **helicóptero**, ruído, vibração e voo baixo somam estresse.",
          "**Como prevenir e amenizar.** O treinamento em câmara ensina a separar a hipóxia da hiperventilação e mostra como o próprio corpo responde. Em situações de estresse, como turbulência forte ou emergência, perceba a respiração acelerada cedo. Diante de sintomas em altitude, a sequência não muda: **oxigênio primeiro**, sistema e pressurização verificados, altitude corrigida. Excluída a hipóxia, **desacelere a respiração**, de forma consciente, até os sintomas passarem. Nunca use **saco de papel** em voo, porque ele pode piorar uma hipóxia não reconhecida.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 3, midia: 'classificar-hiperventilacao' },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Remédios e voo · hiperventilação",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Calmante benzodiazepínico", "Seda e atrasa a reação", "FAA: não aceito em uso contínuo; uso eventual pede 5 meias-vidas, porque seda e atrasa a reação"],
                ["Antidepressivo ISRS", "Trata a ansiedade e o pânico em semanas", "FAA: só os 4 do programa, estável há 6 meses, porque a doença e os efeitos precisam estar controlados (Veja M2V7)"],
                ["Bombinha de alívio da asma", "Abre os brônquios em minutos", "Aceita com a asma controlada, porque não dá sono (Veja M2V1 - VI)"],
              ],
            },
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Liberação para voo · hiperventilação",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Crise isolada por ansiedade", "Pode voar; respirar devagar e avisar a tripulação: a crise passa em minutos", "Pode voar se não se repetir, porque um episódio isolado não indica doença"],
                ["Crises repetidas, pânico ou medo de voar", "Tratar antes de viagens longas: o medo de voar tem tratamento (Veja M2V7 - II)", "Avaliação do examinador, porque a crise em voo tira o desempenho"],
                ["Asma como causa da respiração rápida", "Seguir a liberação da asma: a respiração rápida pode ser crise (Veja M2V1 - VI)", "Seguir as regras da asma, porque o tratamento é outro"],
              ],
            },
          },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-5-maos.jpg'), legenda: 'Mãos tensas e dedos em leve espasmo: o formigamento da hiperventilação lembra o da hipóxia.' } },
          { paragrafo: 2, midia: 'animacao-hiperventilacao' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Hipóxia ou hiperventilação?',
              colunas: ['', 'Hipóxia', 'Hiperventilação'],
              linhas: [
                ['Causa', 'Falta de oxigênio nos tecidos', 'Gás carbônico eliminado demais'],
                ['Sintomas em comum', 'Tontura e formigamento', 'Tontura e formigamento'],
                ['Sinais próprios', 'Julgamento e visão pioram sem alarde', 'Formigamento em volta da boca, espasmos'],
                ['Primeira conduta', 'Oxigênio adequado e checar o sistema', 'Só depois de excluir a hipóxia: respirar mais devagar'],
              ],
            },
          },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v1-5-oxigenio.jpg'), legenda: 'Na dúvida entre ansiedade e hipóxia, primeiro o oxigênio; só depois se orienta a respiração mais lenta.' } },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar a hiperventilação',
              colunas: ['Situação', 'O que fazer'],
              linhas: [
                ['Treinamento', 'Câmara de altitude para separar hipóxia de hiperventilação'],
                ['Estresse em voo', 'Perceber cedo a respiração acelerada'],
                ['Sintomas em altitude', 'Oxigênio primeiro, sistema verificado, altitude corrigida'],
                ['Hipóxia excluída', 'Respirar mais devagar, de forma consciente'],
                ['Saco de papel', 'Não usar em voo'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.6',
      titulo: 'Asma e DPOC',
      pergunta: 'Quem tem asma ou DPOC pode voar com segurança?',
      conteudo: {
        texto: [
          "Na **asma**, os brônquios inflamam e se fecham em crises, que vão e voltam. Na **DPOC**, que reúne a **bronquite crônica** e o **enfisema**, a passagem do ar fica limitada de forma permanente e o pulmão perde reserva. A cabine é pressurizada até no máximo **8.000 ft (2.438 m)**, altitude em que a pessoa saudável mantém a saturação **acima de 90%**. Quem já sai do solo com a saturação baixa começa o voo mais perto do trecho da curva em que **cada queda de pressão derruba mais a saturação** (Veja M2V1 - I).",
          "Na DPOC, o alerta vem dos números do solo. **Saturação em repouso de 95% ou menos**, falta de ar nos esforços do dia a dia (**escala MRC 3 ou mais**) ou queda **abaixo de 84%** numa caminhada indicam que a pessoa pode precisar de **oxigênio a bordo** e deve fazer o teste de simulação de altitude (Veja M2V1 - IX). No enfisema, o ar preso em **bolhas** se expande cerca de **38%** a 8.000 ft (Veja M1V1 - II). Na asma, o risco é a **crise longe do atendimento**, sem poder descer na hora.",
          "Para o **passageiro**, a regra é a estabilidade: voar só com a doença **estável** e com o uso da bombinha de alívio **no nível de sempre**. Depois de uma **piora da DPOC**, a British Thoracic Society considera prudente esperar **6 semanas**, embora os dados sejam poucos. Para o **tripulante**, as regras são mais duras. No RBAC 67, a **asma** está entre as condições que tornam o candidato **não apto** na 1ª classe, e a **doença pulmonar crônica** também, salvo investigação que mostre baixa chance de afetar o voo. A FAA emite o certificado para a asma **controlada**: sintomas em até **2 dias por semana**, no máximo **2 consultas** por crise e **2 cursos de corticoide oral** por ano, **nenhuma internação** no último ano e **VEF1 e CVF de 80% ou mais** do previsto antes do broncodilatador. Na DPOC, a decisão é sempre da FAA.",
          "Voar sem liberação cobra do corpo e da licença. Uma **crise em voo** soma o fechamento dos brônquios ao ar mais pobre da cabine, longe de um pronto-socorro. O tripulante responde também à autoridade: pela FAA, **não pode atuar como tripulante** quem sabe, ou deveria saber, de uma condição ou de um tratamento que o impede de cumprir os requisitos do certificado; pela ANAC, quem percebe uma **diminuição da aptidão** não deve exercer as prerrogativas da licença.",
          "**Como prevenir e amenizar.** Toda a medicação, inclusive o **espaçador**, vai na **bagagem de mão**, com a bombinha de alívio **à mão** durante o voo. Quem usa caneta de **adrenalina** a mantém acessível, e quem tem asma grave combina com o especialista levar **corticoide oral** para uma emergência. Para o tripulante, a FAA aceita **corticoide inalado**, **broncodilatador de longa ação**, **montelucaste** e o **salbutamol** de alívio; os **anticorpos monoclonais** ficam fora do caminho simplificado. No RBAC 67, o **corticoide oral contínuo** passa pelo julgamento do examinador.",
          "**Tratamentos, prognóstico e tipo de voo.** A asma e a DPOC não têm conduta expectante: o tratamento **não invasivo** é a base, com **bombinhas** de manutenção e de alívio, **parar de fumar**, **reabilitação pulmonar**, vacinas e, na DPOC avançada, **oxigênio**. Os tratamentos **invasivos** ficam para o enfisema grave: a **redução do volume do pulmão**, por cirurgia ou por **válvula** colocada na broncoscopia, e o **transplante de pulmão**; depois de cirurgia torácica, o passageiro espera **4 semanas** após a retirada do dreno (Veja M2V1 - VIII), e o tripulante depende da decisão da autoridade. O prognóstico no voo é bom quando a doença está estável. No jato **pressurizado**, quem precisa de oxigênio combina o concentrador portátil com a companhia; no avião **não pressurizado**, acima de 10.000 ft sem oxigênio, a saturação de quem tem DPOC cai mais depressa; no **helicóptero**, o voo é baixo, mas o ar frio e a poeira do rotor podem disparar uma crise de asma.",
          "**Não voe hoje** com crise em curso, com uso da bombinha acima do habitual ou, na DPOC, com piora nas últimas 6 semanas. **Converse com o médico antes de comprar a passagem** se a saturação em repouso for de 95% ou menos ou se a falta de ar aparecer em esforços pequenos. O médico confere a espirometria, a saturação, as crises do último ano e, se preciso, pede o teste de simulação de altitude.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 6, midia: 'tipo-voo-pulmao' },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-6-bombinha.jpg'), legenda: 'Bombinha com espaçador na bagagem de mão e ao alcance durante todo o voo.' } },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · asma e DPOC',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Asma controlada", "Pode voar, com a bombinha na bagagem de mão: a crise pode começar na cabine, e o alívio rápido reabre os brônquios", "ANAC: não apto na 1ª classe; FAA: emite se cumprir os critérios de controle, porque uma crise súbita no comando é incapacitação"],
                ["Asma em crise ou com alívio acima do habitual", "Não voar até estabilizar: com os brônquios fechados, o ar mais pobre da cabine baixa ainda mais o oxigênio", "Não voar: falta de ar e remédio em excesso tiram atenção e força no comando"],
                ["DPOC estável, saturação acima de 95%", "Pode voar: com saturação acima de 95%, a queda na cabine fica dentro da reserva", "FAA: decisão da FAA; ANAC: não apto, salvo investigação favorável, porque a doença avança e reduz a reserva para a hipóxia"],
                ["DPOC com saturação de 95% ou menos", "Teste de simulação de altitude e oxigênio, se indicado: quem parte de saturação baixa cai na parte íngreme da curva", "FAA: autorização especial exige 96% ou mais em repouso, para sobrar margem numa descompressão"],
                ["Piora da DPOC há menos de 6 semanas", "Evitar voar: depois da piora, o pulmão ainda está inflamado e pode piorar de novo longe do atendimento", "Não voar: o risco de nova piora e de hipóxia ainda é alto"],
              ],
            },
          },
          { paragrafo: 3, midia: 'controle-asma' },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Remédios e voo · asma e DPOC',
              colunas: ['Remédio', 'Para que serve', 'Tripulante'],
              linhas: [
                ["Salbutamol", "Alívio rápido da crise", "FAA: aceito, porque age em minutos e não dá sono"],
                ["Corticoide inalado", "Controle da inflamação dos brônquios", "FAA: aceito, porque controla a inflamação sem afetar a atenção"],
                ["Broncodilatador de longa ação", "Mantém os brônquios abertos", "FAA: aceito, porque mantém os brônquios abertos sem sedação"],
                ["Montelucaste", "Controle da asma", "FAA: aceito, porque controla a asma sem efeito no julgamento na maioria"],
                ["Corticoide oral", "Tratamento das crises", "FAA: até 2 cursos por ano; ANAC: uso contínuo a critério, porque crises que pedem corticoide mostram asma menos controlada"],
                ["Anticorpo monoclonal", "Asma grave", "FAA: fora do caminho simplificado, porque é reservado à asma grave, de maior risco de crise"],
              ],
            },
          },
          { paragrafo: 7, figura: { imagem: require('@/assets/images/topicos/m2v1-6-espirometria.jpg'), legenda: 'A espirometria mede o VEF1 e a CVF: para a FAA, 80% ou mais do previsto antes do broncodilatador.' } },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Como prevenir e amenizar · viagem com asma e DPOC',
              colunas: ['Item', 'O que fazer'],
              linhas: [
                ['Antes de comprar a passagem', 'Saturação em repouso de 95% ou menos ou falta de ar em esforços pequenos: falar com o médico'],
                ['Doença estável', 'Bombinha de alívio no uso de sempre; DPOC sem piora nas últimas 6 semanas'],
                ['Bagagem de mão', 'Todos os remédios e o espaçador; a bombinha de alívio à mão'],
                ['Asma grave', 'Corticoide oral de emergência combinado com o especialista; caneta de adrenalina acessível'],
                ['Oxigênio', 'Se o teste mostrar necessidade, combinado antes com a companhia (Veja M2V1 - IX)'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.7',
      titulo: 'Apneia do sono',
      pergunta: 'Por que a apneia do sono preocupa na poltrona e na cabine de comando?',
      conteudo: {
        texto: [
          "Na **apneia obstrutiva do sono**, a garganta se fecha várias vezes durante o sono, a respiração para e o oxigênio do sangue cai a cada pausa. O sono fica picado, e o dia seguinte traz **sonolência**, desatenção e erros. O peso conta muito: pela FAA, mais de **90%** de quem tem **IMC de 40 ou mais** tem apneia que exige tratamento, mas até **30%** de quem tem apneia tem **IMC abaixo de 30**. Queixo recuado, língua ou amígdalas grandes, **pressão difícil de controlar** com mais de dois remédios, **diabetes** e **fibrilação atrial** também aumentam o risco.",
          "No avião, dois problemas se somam. Dormir a bordo junta as **pausas da apneia** à **saturação já mais baixa da cabine** (Veja M2V1 - I); por isso o CPAP deve ser usado nos voos noturnos. No tripulante, a apneia sem tratamento é um problema de **fadiga** (Veja M2V8): a sonolência acompanha o piloto até a cabine de comando.",
          "O **passageiro** com apneia pode voar, desde que leve o tratamento: o **CPAP** vai na bagagem de mão, com carta do médico e **aprovação prévia da companhia** para o aparelho e as baterias. Para o **tripulante**, a FAA considera a apneia **desqualificante** até que se demonstre **tratamento eficaz**; quem trata recebe uma autorização especial com acompanhamento, e quem o examinador classifica como **alto risco** tem **90 dias** para enviar a avaliação do sono. Sintomas que ameaçam a segurança na hora fazem o examinador **adiar** o certificado. O RBAC 67 não traz item próprio para a apneia; ela entra pela regra das condições que afetam a segurança do voo, a critério do examinador.",
          "Voar com apneia sem tratamento é voar com **sono acumulado**, que derruba a atenção e os reflexos. O tripulante que sabe da condição e voa sem tratá-la descumpre a regra que proíbe atuar com condição médica que o impeça de cumprir os requisitos do certificado (FAA) ou com a aptidão diminuída (ANAC).",
          "**Como prevenir e amenizar.** Prefira **voos diurnos** e evite dormir neles; nos voos noturnos, **use o CPAP a bordo**, sempre o seu próprio aparelho. Fique sem **álcool e calmantes** por **12 horas** antes e durante a viagem, e leve **baterias para 1,5 vez** a duração da viagem. Para o tripulante, remédio para dormir tem regra própria: a FAA não permite o uso diário de indutores do sono (Veja M2V8 - VII).",
          "**Tratamentos, prognóstico e tipo de voo.** Na apneia leve, sem sonolência, a conduta pode começar por hábitos: **perder peso**, dormir de lado e evitar álcool e calmantes à noite. O tratamento **não invasivo** padrão é o **CPAP**; para alguns, o **aparelho na boca** que avança a mandíbula. Os tratamentos **invasivos** ficam para casos escolhidos: **cirurgia** das amígdalas, do palato ou dos ossos da face, o **estimulador do nervo da língua**, implantado, e a **cirurgia bariátrica** quando há obesidade (Veja M2V9 - V). Depois de qualquer um deles, o tripulante só volta com **tratamento eficaz comprovado**, em geral por um novo estudo do sono. O prognóstico é bom: tratada, a sonolência some e o risco de fadiga cai. No jato **pressurizado**, o CPAP vai a bordo nos voos noturnos; no avião leve **não pressurizado**, os voos são curtos e diurnos, mas a sonolência no comando soma-se à hipóxia acima de 10.000 ft; no **helicóptero** de um só piloto, não há quem assuma se o sono vencer.",
          "**Não voe como tripulante** com apneia diagnosticada e sem tratamento, nem com sonolência que já atrapalha o dia. O **passageiro** que ronca alto, acorda cansado e cochila sem querer deve procurar avaliação antes de uma viagem longa. O médico confere o diagnóstico, o **uso do CPAP registrado pelo aparelho** e a sonolência durante o dia.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · apneia do sono",
              colunas: ["Tratamento", "Tipo", "Tripulante"],
              linhas: [
                ["Perder peso, dormir de lado, sem álcool à noite", "Hábitos", "Volta só com a apneia tratada, porque hábitos sozinhos raramente tiram a sonolência"],
                ["CPAP", "Não invasivo", "Volta com tratamento eficaz e uso registrado pelo aparelho, porque só o uso noturno tira a sonolência do dia"],
                ["Aparelho na boca", "Não invasivo", "Volta com eficácia comprovada no estudo do sono, porque o aparelho na boca não funciona em todos"],
                ["Cirurgia das vias aéreas ou estimulador implantado", "Invasivo", "Volta com novo estudo do sono mostrando eficácia, porque a cirurgia pode não resolver as pausas"],
                ["Cirurgia bariátrica", "Invasivo", "Reino Unido: inapto por até 3 meses, pela recuperação e pelo risco de açúcar baixo e desnutrição (Veja M2V9 - V)"],
              ],
            },
          },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-7-cpap-aviao.jpg'), legenda: 'No voo noturno, o CPAP vai a bordo e é usado durante o sono, com baterias para toda a viagem.' } },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · apneia do sono',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Apneia tratada com CPAP", "Pode voar, com o CPAP na bagagem de mão: dormir a bordo sem ele soma as pausas à cabine mais pobre em oxigênio", "FAA: autorização especial com acompanhamento; ANAC: a critério do examinador, porque o tratamento só protege se usado todas as noites"],
                ["Apneia sem tratamento", "Voos diurnos, sem álcool nem calmantes: os dois aprofundam as pausas e a queda de oxigênio no sono", "FAA: desqualificante até tratamento eficaz, porque a sonolência sem tratamento é fadiga no comando"],
                ["Alto risco, sem diagnóstico", "Procurar avaliação antes de viagem longa: a apneia não diagnosticada pesa no sono a bordo e na direção depois do voo", "FAA: 90 dias para enviar a avaliação, porque o risco alto pede confirmar ou afastar a doença"],
              ],
            },
          },
          { paragrafo: 5, midia: 'baterias-cpap' },
          { paragrafo: 7, figura: { imagem: require('@/assets/images/topicos/m2v1-7-sonolencia.jpg'), legenda: 'Na cabine de comando, a apneia sem tratamento vira sono acumulado, desatenção e erros.' } },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Como prevenir e amenizar · viagem com CPAP',
              colunas: ['Item', 'O que fazer'],
              linhas: [
                ['Antes de viajar', 'Carta do médico e aprovação da companhia para o aparelho e as baterias'],
                ['Bagagem de mão', 'O próprio CPAP'],
                ['Baterias', 'Para 1,5 vez a duração da viagem'],
                ['Escolha do voo', 'Voos diurnos; no voo noturno, usar o CPAP a bordo'],
                ['Álcool e calmantes', 'Nada nas 12 horas antes e durante a viagem'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.8',
      titulo: 'Pneumotórax',
      pergunta: 'Quanto tempo esperar para voar depois de um pneumotórax?',
      conteudo: {
        texto: [
          "**Pneumotórax** é ar entre o pulmão e a parede do tórax. Esse ar não tem saída, e o pulmão murcha do lado afetado. Pode surgir **sozinho**, pela ruptura de pequenas **bolhas** na superfície do pulmão, depois de um **trauma** ou depois de procedimentos no tórax.",
          "Em altitude, o problema cresce. Pela **lei de Boyle** (Veja M1V1 - II), o gás preso numa cavidade fechada se expande cerca de **38%** a 8.000 ft, a altitude máxima de uma cabine. O ar do pneumotórax ocupa mais espaço, **comprime o pulmão** e pode piorar a **falta de ar** e a **dor** em pleno voo, longe de quem possa drenar o tórax.",
          "Para o **passageiro**, a British Thoracic Society é clara: **não voar até 7 dias depois da resolução completa no raio X**. Pneumotórax fechado e não tratado, em geral, impede o voo. Depois de **toracotomia com pleurodese cirúrgica**, a recorrência é tão baixa que não há restrição extra; na **videotoracoscopia**, a recorrência relatada é cerca de **4 vezes maior**. Depois de **cirurgia torácica**, a espera é de **4 semanas** após a retirada do dreno nas viagens não essenciais, ou **2 semanas** se a viagem for essencial. Depois de **biópsia de pulmão**, procedimento na pleura ou **broncoscopia com biópsia**, **1 semana**, contada da resolução se tiver havido pneumotórax.",
          "Para o **tripulante**, o prazo é mais longo. No RBAC 67, **pneumotórax não resolvido** torna o candidato **não apto**, e a doença bolhosa do pulmão fica a critério do examinador. Pela FAA, o pneumotórax **espontâneo** exige raio X com a resolução e a confirmação de que **não há bolhas** com risco de nova crise, e a decisão é da própria FAA; quem teve **mais de um episódio** só volta depois da cirurgia que corrige a causa, em geral **3 meses** depois dela. No **traumático**, a FAA emite o certificado **3 meses depois da resolução**. A autoridade da Nova Zelândia considera relevante, sem cirurgia, o episódio de menos de **5 anos** na Classe 1 e de menos de **3 anos** na Classe 2.",
          "**Como prevenir e amenizar.** Voar com pneumotórax não resolvido é levar para a cabine um **volume de ar que cresce** com a subida. Nenhum remédio impede essa expansão: a proteção é **cumprir o prazo** e ter o **raio X de controle** em mãos. Para o tripulante, voar nessas condições descumpre a proibição de atuar com condição que impede os requisitos do certificado.",
          "**Tratamentos, prognóstico e tipo de voo.** No pneumotórax pequeno e sem sintomas, a conduta pode ser **expectante**: repouso e **raio X de controle** até o ar ser absorvido, às vezes com **oxigênio**, que acelera a absorção. Os tratamentos **invasivos** vêm quando há falta de ar ou o pneumotórax é grande: **aspiração com agulha**, **dreno no tórax** e, na recorrência ou em quem voa por profissão, a **cirurgia**, por **videotoracoscopia** ou por toracotomia, com **pleurodese** para colar o pulmão à parede. Os prazos estão acima: 7 dias depois da resolução para o passageiro, meses e decisão da autoridade para o tripulante. O prognóstico depende da cirurgia: sem ela, a volta do pneumotórax é o risco que pesa. O ar preso cresce cerca de **38%** a 8.000 ft no jato **pressurizado** e cerca de **50%** a 10.000 ft no avião **não pressurizado**; no **helicóptero**, o voo baixo expande menos, e o transporte aeromédico de quem tem pneumotórax costuma pedir o **dreno antes da decolagem**.",
          "**Não voe** com dor no peito ou falta de ar súbita, com pneumotórax ainda visível no raio X ou antes do prazo depois de cirurgia, biópsia ou broncoscopia. O médico registra a **data da resolução no raio X**, o tipo de tratamento e se houve recorrência: é essa data que conta os dias.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · pneumotórax",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Oxigênio", "Acelera a absorção do ar do pneumotórax", "Só no tratamento; a volta depende do raio X, porque o oxigênio não impede a expansão em altitude"],
                ["Analgésico comum", "Alivia a dor sem dar sono", "Aceito, mas dor no peito afasta até a avaliação, porque pode ser novo pneumotórax"],
                ["Opioide depois da cirurgia", "Deprime a respiração e o julgamento", "FAA: Do Not Fly; esperar 5 meias-vidas, porque soma sono à falta de ar"],
              ],
            },
          },
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v1-8-raio-x.jpg'), legenda: 'No raio X, a linha branca fina é a borda do pulmão colapsado; por fora dela, a faixa escura sem desenho do pulmão é o ar do pneumotórax.' } },
          { paragrafo: 2, midia: 'grafico-boyle' },
          { paragrafo: 3, midia: 'prazo-voo-pulmao' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · pneumotórax',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Resolvido no raio X", "7 dias depois da resolução: o pulmão precisa colar de novo, e o ar que voltar a escapar cresce 38% na cabine", "FAA: espontâneo, decisão da FAA sem bolhas; traumático, 3 meses, porque as bolhas podem romper de novo em voo"],
                ["Não resolvido", "Não voar: o ar preso se expande na subida, comprime o pulmão e piora a falta de ar", "Não apto (RBAC 67): falta de ar e dor súbitas incapacitam no comando"],
                ["Mais de um episódio", "7 dias depois de cada resolução: quem repete tem mais chance de novo escape em voo", "FAA: só depois da cirurgia, em geral 3 meses, porque sem ela a recorrência é alta"],
                ["Cirurgia torácica", "4 semanas após retirar o dreno (2 se essencial): ar residual e cicatriz recente podem escapar com a expansão", "A critério do examinador, depois da recuperação da força e da respiração [confirmar na referência]"],
                ["Biópsia de pulmão ou broncoscopia com biópsia", "1 semana: a agulha ou a biópsia podem deixar um pequeno escape de ar que cresce na cabine", "Esperar o mesmo prazo e a causa da biópsia estar esclarecida [confirmar na referência]"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m2v1-8-consulta.jpg'), legenda: 'Com o raio X de controle normal e o prazo cumprido, o passageiro pode voltar a voar.' } },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Como prevenir e amenizar · depois de pneumotórax',
              colunas: ['Item', 'O que fazer'],
              linhas: [
                ['Raio X de controle', 'Em mãos, com a data da resolução completa'],
                ['Passageiro', 'Contar 7 dias a partir da resolução no raio X'],
                ['Depois de cirurgia do tórax', '4 semanas após a retirada do dreno, ou 2 se a viagem for essencial'],
                ['Depois de biópsia ou broncoscopia com biópsia', '1 semana, contada da resolução se houve pneumotórax'],
                ['Sintomas', 'Dor no peito ou falta de ar súbita: não voar e procurar atendimento'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.9',
      titulo: 'Simulação de altitude',
      pergunta: 'Como saber, no solo, se vou precisar de oxigênio no avião?',
      conteudo: {
        texto: [
          "O **teste de simulação de altitude**, ou teste de hipóxia, mostra no solo como o corpo vai reagir na cabine. A pessoa respira uma mistura com **15% de oxigênio**, que reproduz o ar inspirado a **8.000 ft (2.438 m)**, enquanto se medem a **saturação** e, às vezes, o oxigênio no sangue arterial.",
          "A maioria das pessoas não precisa dele: com saturação **acima de 95%** em repouso, em geral não há necessidade de oxigênio a bordo. O teste é pensado para quem tem **DPOC** com saturação em repouso de **95% ou menos**, falta de ar nos esforços do dia a dia ou queda **abaixo de 84%** na caminhada; para quem tem **doença intersticial** e satura **abaixo de 95%** no esforço; e para quem tem **fraqueza dos músculos da respiração** com **capacidade vital forçada abaixo de 1 litro**.",
          "O resultado decide o oxigênio. Com **PaO2 de 6,6 kPa (50 mmHg) ou mais**, ou **saturação de 85% ou mais**, o oxigênio a bordo **não é necessário**. Abaixo disso, ele é **recomendado**, ajustado para manter a saturação em pelo menos **85%** no adulto. Sem o teste, alguns casos já têm fluxo definido, em geral **2 litros por minuto**, e quem usa oxigênio em casa **soma 2 litros por minuto** ao fluxo de sempre. Concentradores portáteis raramente passam de **3 litros por minuto** contínuos.",
          "Algumas situações pedem só tempo. Com **pneumonia** e saturação no solo **abaixo de 94%**, a viagem não essencial espera **7 dias**. Depois de **trombose venosa profunda ou embolia pulmonar**, a espera é de **2 semanas**.",
          "**Como prevenir e amenizar.** Voar precisando de oxigênio sem tê-lo combinado é arriscar a **hipóxia** que a cabine provoca justamente em quem tem menos reserva (Veja M2V1 - IV). Oxigênio e aparelhos precisam de **aprovação prévia da companhia**, que costuma pedir o **formulário médico (MEDIF)** preenchido pelo médico. Para o tripulante, a lógica é outra: na DPOC, a FAA exige saturação em repouso de **96% ou mais** para a autorização especial.",
          "**Doenças, tratamentos e tipo de voo.** Quem mais precisa do teste e do oxigênio a bordo tem **DPOC**, **fibrose pulmonar**, **hipertensão pulmonar**, **fibrose cística** ou doença do coração com pouca reserva, ou acabou de ter **pneumonia**. A conduta é **expectante** quando a saturação em repouso passa de 95%; o tratamento **não invasivo** é o **oxigênio** no voo, com o fluxo definido pelo teste, além do tratamento da doença: antibiótico na pneumonia, remédios do pulmão e da circulação. O tratamento **invasivo** mais extremo é o **transplante de pulmão**, e depois dele a volta ao voo é decidida com a equipe do transplante. O prognóstico é bom quando o oxigênio é combinado antes. No jato **pressurizado**, o concentrador portátil aprovado vai na cabine; no avião **não pressurizado**, a cabine é a altitude real, e o oxigênio precisa estar disponível já em altitudes menores; no **helicóptero**, o transporte de quem depende de oxigênio é aeromédico.",
          "**Não embarque** sem o oxigênio combinado se o teste mostrou a necessidade. Na decisão, o médico usa a saturação em repouso, a resposta ao esforço, o resultado do teste e o **fluxo que manteve a saturação em 85%**; é esse número que vai para o MEDIF.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · oxigênio e doenças agudas",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Oxigênio a bordo ou concentrador portátil", "Mantém a saturação em pelo menos 85% no adulto", "Tripulante que precisa de oxigênio não exerce a função, porque a reserva já acabou"],
                ["Antibiótico para pneumonia", "Trata a infecção; a saturação volta aos poucos", "Voltar só recuperado, porque a pneumonia reduz a saturação"],
                ["Anticoagulante depois de trombose ou embolia", "Evita novo coágulo; aumenta o sangramento num trauma", "ANAC: cumarínico torna inapto, porque o sangramento num trauma é grave (Veja M2V11 - II)"],
              ],
            },
          },
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v1-9-teste.jpg'), legenda: 'No teste de hipóxia, a mistura com 15% de oxigênio reproduz a cabine a 8.000 ft enquanto o oxímetro mede a saturação.' } },
          { paragrafo: 3, midia: 'teste-hipoxia' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · oxigênio e doenças agudas',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Saturação em repouso acima de 95%", "Em geral, sem oxigênio a bordo: a saturação parte alta e fica acima de 90% na cabine", "Sem restrição por esse dado, porque a reserva de oxigênio é normal"],
                ["Teste com saturação de 85% ou mais", "Sem oxigênio a bordo: o teste mostrou que a cabine não derruba a saturação abaixo do seguro", "DPOC: a FAA exige 96% ou mais em repouso, para sobrar margem numa descompressão"],
                ["Teste com saturação abaixo de 85%", "Oxigênio a bordo, combinado com a companhia: sem ele, a saturação cai abaixo do seguro na cabine", "Decisão da autoridade, porque a hipóxia na própria cabine compromete o julgamento"],
                ["Pneumonia com saturação abaixo de 94%", "Esperar 7 dias: o pulmão inflamado troca menos gás, e a cabine baixa ainda mais o oxigênio", "Não apto enquanto ativa (RBAC 67): febre, falta de ar e oxigênio baixo tiram a capacidade de operar"],
                ["Trombose ou embolia recentes", "Esperar 2 semanas: o coágulo pode crescer ou soltar com a imobilidade, e o pulmão afetado tem menos reserva", "Esperar a estabilidade com o anticoagulante e a decisão da autoridade (Veja M2V2 - VII) [confirmar na referência]"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m2v1-9-concentrador.jpg'), legenda: 'Com o concentrador portátil aprovado pela companhia, o oxigênio segue com o passageiro durante o voo.' } },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Sistema nervoso central', 'Julgamento, atenção e coordenação falham antes de a pessoa notar; depois, memória, raciocínio e movimentos finos; o cérebro consome muito oxigênio e não tem estoque, e as funções mais complexas falham primeiro', 'Máscara antes de qualquer tarefa; conhecer a própria assinatura de hipóxia'],
                ['Visão', 'A visão noturna piora já em altitudes moderadas: os bastonetes da retina consomem muito oxigênio', 'Oxigênio à noite acima de 5.000 ft em voo não pressurizado'],
                ['Sangue', 'Anemia e monóxido de carbono reduzem o oxigênio transportado: com menos hemoglobina, ou com ela ocupada pelo monóxido, o sangue carrega menos oxigênio', 'Corrigir a causa; atenção a vazamentos do escapamento'],
                ['Circulação', 'Fluxo insuficiente, como nas acelerações, causa hipóxia estagnante: o sangue tem oxigênio, mas não chega ao tecido', 'Veja M1V7'],
                ['Respiratório', 'A hiperventilação baixa o gás carbônico e causa formigamento e espasmos: o sangue fica alcalino, sobra menos cálcio livre, e nervos e músculos ficam irritáveis', 'Oxigênio primeiro; só depois respirar mais devagar'],
                ['Pulmão e pleura', 'Ar preso no pneumotórax e nas bolhas cresce cerca de 38% a 8.000 ft: sem saída, o gás se expande com a pressão menor e comprime o pulmão', 'Cumprir o prazo depois da resolução no raio X'],
                ['Vias aéreas', 'Crise de asma ou piora da DPOC longe do atendimento: o pulmão doente tem menos reserva para o oxigênio baixo da cabine, e o ar seco irrita os brônquios', 'Voar com a doença estável e a bombinha na bagagem de mão'],
                ['Sono e atenção', 'A apneia sem tratamento traz sonolência e erros: as pausas fragmentam o sono e baixam o oxigênio à noite', 'CPAP; sem álcool nem calmantes 12 h antes do voo'],
                ['Pele e mucosas', 'Lábios azulados podem aparecer, mas sua falta não exclui hipóxia: a cor depende da quantidade de hemoglobina sem oxigênio e da luz, e muda pouco no início', 'Checar oxigênio e pressurização diante de qualquer sintoma'],
              ],
            },
          },
          {
            paragrafo: 2,
            tabela: {
              titulo: 'Como prevenir e amenizar · oxigênio a bordo',
              colunas: ['Passo', 'O que fazer'],
              linhas: [
                ['1. Avaliação', 'Saturação em repouso e, se indicado, teste de simulação de altitude'],
                ['2. Fluxo', 'Médico define o fluxo que mantém a saturação em 85% ou mais'],
                ['3. MEDIF', 'Formulário médico preenchido e enviado à companhia antes do voo'],
                ['4. Aparelho', 'Concentrador portátil aprovado pela companhia, com baterias suficientes'],
                ['5. Embarque', 'Sem o oxigênio combinado, não embarcar'],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      pergunta: 'Por que há menos oxigênio disponível em altitude?',
      opcoes: [
        'A porcentagem de oxigênio no ar diminui',
        'A pressão parcial de oxigênio diminui',
        'O nitrogênio ocupa o lugar do oxigênio',
        'A temperatura baixa destrói o oxigênio',
      ],
      correta: 1,
      explicacao: 'O ar continua com cerca de 21% de oxigênio; o que cai é a pressão, e com ela a pressão parcial de oxigênio.',
      topico: '3.1',
    },
    {
      pergunta: 'Intoxicação por monóxido de carbono causa qual tipo de hipóxia?',
      opcoes: ['Hipóxica', 'Hipêmica', 'Estagnante', 'Histotóxica'],
      correta: 1,
      explicacao: 'O monóxido de carbono ocupa a hemoglobina, e o sangue passa a carregar menos oxigênio: hipóxia hipêmica.',
      topico: '3.2',
    },
    {
      pergunta: 'Qual é o tempo de consciência útil aproximado a 35.000 ft?',
      opcoes: ['De 5 a 10 minutos', 'De 3 a 5 minutos', 'De 30 segundos a 1 minuto', 'Menos de 5 segundos'],
      correta: 2,
      explicacao: 'A 35.000 ft, o tempo de consciência útil é de cerca de 30 segundos a 1 minuto.',
      topico: '3.3',
    },
    {
      pergunta: 'O que acontece com o tempo de consciência útil em uma descompressão rápida?',
      opcoes: ['Aumenta', 'Não muda', 'Pode cair para cerca da metade', 'Passa a depender só da temperatura'],
      correta: 2,
      explicacao: 'Na descompressão rápida, o tempo de consciência útil pode ser reduzido a cerca da metade.',
      topico: '3.3',
    },
    {
      pergunta: 'Qual é o principal perigo da hipóxia para quem está voando?',
      opcoes: [
        'Causar dor intensa imediata',
        'Tirar a capacidade de perceber o próprio problema',
        'Provocar sempre desmaio súbito',
        'Afetar apenas a visão',
      ],
      correta: 1,
      explicacao: 'A hipóxia altera o julgamento antes dos sinais visíveis, e a pessoa pode não perceber que está em perigo.',
      topico: '3.4',
    },
    {
      pergunta: 'Em voo, um tripulante sente tontura e formigamento. Qual é a primeira conduta?',
      opcoes: [
        'Respirar dentro de um saco de papel',
        'Esperar os sintomas passarem',
        'Oxigênio a 100% e checar o sistema',
        'Aumentar a altitude para economizar combustível',
      ],
      correta: 2,
      explicacao: 'Como hipóxia e hiperventilação se confundem, trata-se primeiro como hipóxia: oxigênio a 100%.',
      topico: '3.5',
    },
    {
      pergunta: 'Depois de uma piora da DPOC, quanto tempo a British Thoracic Society considera prudente esperar para voar?',
      opcoes: ['24 horas', '1 semana', '6 semanas', '6 meses'],
      correta: 2,
      explicacao: 'Depois de uma exacerbação da DPOC, parece prudente evitar voar por 6 semanas, embora os dados sejam poucos.',
      topico: '3.6',
    },
    {
      pergunta: 'Num voo noturno, o que a pessoa com apneia do sono deve fazer?',
      opcoes: ['Tomar um calmante para dormir bem', 'Usar o próprio CPAP a bordo', 'Ficar acordada a viagem toda', 'Despachar o CPAP na mala'],
      correta: 1,
      explicacao: 'O CPAP vai na bagagem de mão e deve ser usado nos voos noturnos; álcool e calmantes ficam de fora por 12 horas.',
      topico: '3.7',
    },
    {
      pergunta: 'Para o passageiro, quando é possível voar depois de um pneumotórax?',
      opcoes: ['Logo que a dor passar', '7 dias depois da resolução completa no raio X', '24 horas depois de retirar o dreno', 'Só depois de 1 ano'],
      correta: 1,
      explicacao: 'A British Thoracic Society recomenda não voar até 7 dias depois da resolução completa no raio X.',
      topico: '3.8',
    },
    {
      pergunta: 'No teste de simulação de altitude, a partir de que saturação o oxigênio a bordo não é necessário?',
      opcoes: ['75%', '80%', '85%', '99%'],
      correta: 2,
      explicacao: 'Com saturação de 85% ou mais (ou PaO2 de 6,6 kPa ou mais) no teste, o oxigênio a bordo não é necessário.',
      topico: '3.9',
    },
  ],
  liberacao: liberacaoRespiratorio,
};
