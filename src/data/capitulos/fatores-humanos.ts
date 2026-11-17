// Missão 3 · Voo 4 — Fatores humanos e CRM. Ramo editorial voo/M3V4; fotos e vídeo entram depois da produção.
// Mesmo padrão do M3V1 a M3V3: prosa progressiva, "Como prevenir e amenizar" com tabela, interativo por tópico,
// animação em src/components/midia/animacoes-aviacao.tsx abaixo do marcador "FIM DO CONGELAMENTO M3V3", tabela final e
// teste. Leitores: tripulante, médico examinador e passageiro.
// REGISTRO DE REVISÃO · 17/11/2026. Fontes primárias conferidas:
// ICAO, Doc 9683, Human Factors Training Manual, 1ª ed. (1998), emenda 2 (2005): 1.2.1 ("some three out of four
//   accidents" por desempenho humano abaixo do ideal, chamado de erro humano); 1.2.8 a 1.2.10 (SHEL de Edwards, 1972,
//   diagrama de Hawkins, 1975; liveware no centro, o componente mais crítico e mais flexível); 1.4.2 (interfaces L-H,
//   L-S, L-E e L-L, com exemplos); 1.3.10 e 1.3.11 (fadiga, com hipóxia e ruído como fatores; ritmo circadiano).
// Reason J., Human Error (1990): modelo do queijo suíço, falhas latentes e ativas, conforme descrito no relatório
//   DOT/FAA/AM-05/24. Wiegmann DA, Faaborg T, Boquet A, Detwiler C, Holcomb K, Shappell SA, FAA DOT/FAA/AM-05/24
//   (dezembro de 2005): HFACS em 4 níveis (atos inseguros, precondições, supervisão insegura, influências
//   organizacionais) e subcategorias; 14.436 acidentes da aviação geral nos EUA (1990–2000): erro de habilidade 79,2%,
//   decisão 29,7%, violação 13,7%, percepção 5,7%; violação em acidentes fatais com odds ratio 4,547.
// Endsley MR, Rodgers MD, FAA DOT/FAA/AM-97/13 (1997): definição de consciência situacional em 3 níveis (percepção,
//   compreensão, projeção; Endsley 1988); acidentes de grandes empresas aéreas com erro do piloto (Endsley 1995a): 88%
//   com problema de consciência situacional; 72% nível 1, 22% nível 2, 6% nível 3; incidentes de controladores (Jones e
//   Endsley 1996): falha em monitorar 51,5% dos erros de nível 1, distração em 53% desses; carga de trabalho alta 17,6%;
//   esquecimento 18,2%.
// Helmreich RL, Merritt AC, Wilhelm JA, Int J Aviat Psychol 1999;9(1):19-32 (FAA, crmhistory.pdf): workshop da NASA de
//   1979 ("Resource Management on the Flightdeck"); erro humano na maioria dos acidentes como falha de comunicação,
//   decisão e liderança; cinco gerações (1981, 1986, início dos anos 1990, a partir de 1990/AQP, gerenciamento de erros
//   com três linhas: evitar, capturar e atenuar).
// NTSB, United 173 (DC-8-61, 28/12/1978, Portland, Oregon; 10 mortos): causa provável e fator contribuinte.
// ICAO, Doc 9803 (LOSA) e apresentação de J. Klinect na ICAO (ASPA, 2008): definições de ameaça, erro e estado
//   indesejado; ameaças de ATC e de tempo em 61% dos voos, do avião em 52%; erros de chamadas (32%), checklist (20%) e
//   automação (18%) entre os mais frequentes; erro de pilotagem manual mal gerenciado em 77% (41 de 53).
// ANAC, IS nº 00-010, Revisão B (06/03/2025; Portaria 16.471/SPO): CRM para operadores RBAC 90, 121, 135 e Subparte K
//   do RBAC 91; conceitos iniciais 16 h-aula (até 8 a distância), prática 4 h seguidas em até 6 meses (LOFT + 2 h),
//   periódico 8 h-aula/ano ou 16 h a cada 2 anos, currículo completo em até 3 anos; equipe central: pilotos, comissários,
//   despachantes, mecânicos de voo e manutenção de linha; currículo com consciência situacional, decisão, automação,
//   estresse, fadiga e álcool e drogas; TEM como modelo central.
// PARC/CAST Flight Deck Automation Working Group, Operational Use of Flight Path Management Systems (FAA, 2013): 26
//   acidentes, 20 incidentes graves, 734 relatos ASRS (2001–2007), LOSA de 9.155 voos; achados 2 e 4 (vulnerabilidades no
//   voo manual e no gerenciamento de energia; confiança excessiva e relutância em intervir; confusão de modos);
//   recomendações 1, 2, 13 e 14.
// BEA, Relatório Final AF 447 (A330-203 F-GZCP, 01/06/2009, Rio de Janeiro–Paris; 228 a bordo, 228 mortos; julho de 2012):
//   obstrução dos pitots por cristais de gelo, desligamento do piloto automático, estol não identificado; susto e
//   incompreensão; falta de treino de pilotagem manual em grande altitude.
// NTSB, Asiana 214 (Boeing 777, 06/07/2013, San Francisco; 3 mortos), conforme a Aviation Week: descida mal gerenciada,
//   desativação não intencional do controle automático de velocidade, monitoramento inadequado, arremetida tardia;
//   complexidade do autothrottle e do piloto automático como fator contribuinte.
// ICAO, Doc 10011 (2014): susto e medo reduzem a capacidade mental (registro do M3V3).
// Dicas sem número próprio (conferir o próprio estado antes do voo, briefing de ameaças, falar de forma direta, descer um
//   nível de automação, varredura em ciclos) são aplicação das fontes acima e dos voos citados.
import type { Capitulo } from '../tipos';

export const fatoresHumanos: Capitulo = {
  numero: 4,
  titulo: 'Fatores humanos e CRM',
  tempoLeituraMin: 11,
  topicos: [
    {
      id: '4.1',
      titulo: "Modelos do erro: SHELL, Reason e HFACS",
      pergunta: "Por que o erro humano é o começo da investigação, e não o fim, e onde o corpo entra nessa história?",
      conteudo: {
        texto: [
          "Na aviação, cerca de **três em cada quatro acidentes** resultam de desempenho humano abaixo do ideal, o que costuma ser chamado de **erro humano**. A medicina aeroespacial olha para esse erro como um sintoma, não como a causa final: o que levou a pessoa a errar? Para responder, a ICAO usa o modelo **SHELL**, criado por Edwards em **1972** e desenhado por Hawkins em **1975**.",
          "No centro do SHELL está a **pessoa** (**L**, de *liveware*), o componente mais crítico e mais flexível. À volta dela ficam os **procedimentos** e as cartas (**S**), a **máquina** (**H**), o **ambiente** (**E**) e as **outras pessoas** (outro **L**). O erro nasce quando uma dessas bordas não se encaixa: um comando mal posicionado, um manual confuso, o ruído e o frio da cabine, a comunicação ruim entre dois pilotos.",
          "O próprio corpo entra no **L** do centro. O manual de fatores humanos da ICAO trata a **fadiga**, a **hipóxia**, o **ruído** e o **ritmo circadiano** como parte do bem-estar de quem voa: um corpo cansado, com menos oxigênio ou fora do horário encaixa pior em todas as bordas (Veja M2V1 - IV e M2V8 - V).",
          "James **Reason** explicou por que o acidente quase nunca tem uma causa só. No modelo do **queijo suíço**, cada camada de defesa tem furos: decisões da organização, supervisão, condições do momento e o ato de quem está no comando. O acidente acontece quando os furos se alinham. As **falhas latentes** ficam escondidas nas camadas de cima por anos; a **falha ativa** é a última, na cabine.",
          "O **HFACS** transformou o queijo suíço numa ferramenta de investigação, com quatro níveis: **atos inseguros** (erros de habilidade, de decisão e de percepção, e violações), **precondições** (entre elas, estados mentais e **fisiológicos** adversos e limitações físicas e mentais), **supervisão insegura** e **influências organizacionais**. Numa análise de **14.436** acidentes da aviação geral nos Estados Unidos, de **1990 a 2000**, o erro de habilidade apareceu em **79%** deles, o de decisão em **30%**, a violação em **14%** e o de percepção em **6%**; a violação foi cerca de **4,5 vezes** mais provável nos acidentes fatais.",
          "Para o **médico examinador**, o HFACS mostra onde a medicina entra: no nível das **precondições**. Hipóxia, fadiga, remédio que dá sono, álcool, doença sem tratamento e desorientação são **estados fisiológicos adversos** que abrem furos no queijo antes de qualquer erro (Veja M3V2, M2V7 - IV e M2V5 - IV). Para o **passageiro**, a lição é que a segurança vem de muitas camadas, e não de uma pessoa perfeita.",
          "**Como prevenir e amenizar.** Antes de cada voo, o tripulante confere o próprio **L**: sono, alimentação, remédios, álcool, doença e estresse. Relate os erros e as situações de risco, porque é assim que a empresa fecha os furos latentes. Quando algo não se encaixa, um procedimento confuso, um comando mal posicionado, um colega que não escuta, registre e proponha a mudança, em vez de contornar em silêncio.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v4-1-investigacao.jpg'), legenda: "O erro humano é o começo da investigação: a pergunta é o que levou a pessoa a errar." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "SHELL · as bordas e o que pode falhar",
              colunas: ["Borda", "Exemplo de falha", "O que o corpo sente"],
              linhas: [
                ["Pessoa e máquina (L-H)", "Comando mal posicionado ou sem codificação", "Mais movimentos e mais tempo para achar o comando, sobretudo com luva, frio ou vibração"],
                ["Pessoa e procedimento (L-S)", "Manual ou carta confusa e poluída", "Mais carga de memória e de atenção; com fadiga, a leitura falha antes"],
                ["Pessoa e ambiente (L-E)", "Ruído, calor, frio, pouca luz e baixa pressão", "O corpo gasta energia para se adaptar, e sobra menos atenção para o voo"],
                ["Pessoa e pessoa (L-L)", "Comunicação ruim, hierarquia rígida e briefing incompleto", "O estresse e o medo reduzem a capacidade de pensar e de ouvir o outro"],
              ],
            },
          },
          { paragrafo: 4, midia: 'animacao-queijo' },
          {
            paragrafo: 5,
            tabela: {
              titulo: "HFACS · os quatro níveis",
              colunas: ["Nível", "O que inclui", "Onde o corpo entra"],
              linhas: [
                ["Atos inseguros", "Erros de habilidade, de decisão e de percepção; violações de rotina e excepcionais", "O erro de percepção nasce muitas vezes de ilusão do labirinto ou da visão"],
                ["Precondições", "Estados mentais e fisiológicos adversos, limitações físicas e mentais, CRM, prontidão pessoal e ambiente", "Hipóxia, fadiga, remédio, álcool e doença entram aqui"],
                ["Supervisão insegura", "Supervisão inadequada, operação mal planejada, problema não corrigido e violação da supervisão", "Uma escala que não respeita o descanso cria a fadiga do nível abaixo"],
                ["Influências organizacionais", "Gestão de recursos, clima e processos da organização", "Pressão por pontualidade e falta de programa de apoio pesam no corpo e na mente"],
              ],
            },
          },
          { paragrafo: 5, midia: 'hfacs-niveis' },
          { paragrafo: 6, figura: { imagem: require('@/assets/images/topicos/m3v4-1-relato.jpg'), legenda: "Relatar o erro é o que permite à empresa fechar os furos latentes." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · modelos do erro",
              colunas: ["Momento", "O que fazer"],
              linhas: [
                ["Antes do voo", "Conferir sono, alimentação, remédios, álcool, doença e estresse"],
                ["No voo", "Dizer em voz alta quando algo não se encaixa: comando, carta, ambiente ou colega"],
                ["Depois do voo", "Relatar erros e situações de risco"],
                ["Na empresa", "Usar os relatos para fechar os furos latentes: escala, procedimento e treino"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '4.2',
      titulo: "Consciência situacional",
      pergunta: "O que é saber o que está acontecendo à volta do avião, e o que o corpo faz com essa consciência?",
      conteudo: {
        texto: [
          "**Consciência situacional** é saber o que está acontecendo à volta do avião e o que vai acontecer em seguida. Mica Endsley a dividiu em três níveis: **perceber** os elementos do ambiente, **compreender** o que eles significam e **projetar** o que vão fazer no futuro próximo. Perder um nível é voar com um mapa errado na cabeça.",
          "Ela está no centro dos acidentes. Numa análise dos acidentes de grandes empresas aéreas atribuídos a erro do piloto, **88%** envolveram um problema de consciência situacional. Desses, **72%** foram falhas de **percepção**, **22%** de **compreensão** e **6%** de **projeção**: na maioria das vezes, a informação estava lá, mas não foi vista.",
          "Por que não se vê o que está à frente? Num estudo de incidentes com controladores de tráfego aéreo, metade das falhas de percepção (**51,5%**) foi **não monitorar** os dados, e em mais da metade desses casos a causa foi a **distração** com outra tarefa; a **carga de trabalho alta** e o **esquecimento** de uma informação já vista também pesaram. Na cabine, os mesmos mecanismos valem para os pilotos.",
          "O corpo decide quanto da situação cabe na cabeça. A **hipóxia** tira a crítica antes do mal-estar (Veja M2V1 - IV), a **fadiga** e o voo de madrugada reduzem a atenção e a memória (Veja M2V8 - V), o **álcool** e os remédios que dão sono deixam o cérebro mais lento (Veja M3V2 - I), e o **susto** reduz a capacidade de pensar (Veja M3V3 - III). A **desorientação espacial** é uma perda de consciência situacional em que o próprio labirinto mente (Veja M2V5 - IV).",
          "A consciência situacional é **da tripulação**, não só de cada piloto. Um voa e o outro **monitora**; os **briefings** antecipam o que vem; as **chamadas padronizadas** confirmam em voz alta o que cada um viu. Quando o que um vê não bate com o que o outro diz, isso é um sinal de alerta: a tripulação para, confere e só depois continua.",
          "Para o **passageiro**, a consciência situacional também protege: ouvir a demonstração de segurança, contar as fileiras até a saída e saber onde está o colete é projetar o futuro antes que ele chegue (Veja M1V4 - III). Para o **médico examinador**, queixas de esquecimento, de atenção que falha ou de sono que não descansa são sinais de que a consciência situacional pode estar em risco e pedem investigação antes do próximo voo.",
          "**Como prevenir e amenizar.** Planeje o voo e faça o **briefing** pensando no que pode dar errado. Varra os instrumentos e o lado de fora em ciclos, sem fixar num ponto só (Veja M2V4 - IV). Nas fases críticas, corte a conversa que não é do voo. Se perceber que está **atrás do avião**, diminua a carga: reduza a velocidade, suba, use a automação certa ou peça tempo ao controle. E proteja o cérebro: sono, oxigênio, nada de álcool nem remédio que dá sono antes de voar.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v4-2-cabine.jpg'), legenda: "Perceber, compreender e projetar: perder um nível é voar com um mapa errado na cabeça." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Consciência situacional · os três níveis",
              colunas: ["Nível", "O que é", "Falhas nos acidentes", "Exemplo"],
              linhas: [
                ["1 · Perceber", "Ver e ouvir os dados: instrumentos, rádio e o lado de fora", "72%", "Não ver o combustível baixando"],
                ["2 · Compreender", "Entender o que os dados significam juntos", "22%", "Ver a velocidade cair e não entender o que ela anuncia"],
                ["3 · Projetar", "Prever o que vai acontecer em seguida", "6%", "Não prever que a trovoada vai fechar o aeroporto"],
              ],
            },
          },
          { paragrafo: 3, midia: 'corpo-consciencia' },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Por que a percepção falha · estudo com controladores",
              colunas: ["Causa", "O que acontece"],
              linhas: [
                ["Não monitorar", "Metade das falhas de percepção: o dado estava lá e não foi visto"],
                ["Distração", "Outra tarefa puxa a atenção na hora errada"],
                ["Carga de trabalho alta", "Tarefas demais para o tempo disponível"],
                ["Esquecimento", "A informação foi vista, mas se perdeu antes de ser usada"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v4-2-varredura.jpg'), legenda: "A consciência situacional é da tripulação: um voa e o outro monitora." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · consciência situacional",
              colunas: ["Momento", "O que fazer"],
              linhas: [
                ["Antes do voo", "Planejar e fazer o briefing pensando no que pode dar errado"],
                ["Em cruzeiro", "Varrer instrumentos e o lado de fora em ciclos, sem fixar num ponto"],
                ["Nas fases críticas", "Cortar a conversa que não é do voo e confirmar em voz alta"],
                ["Atrás do avião", "Diminuir a carga: reduzir a velocidade, subir, usar a automação certa ou pedir tempo"],
                ["Sempre", "Proteger o cérebro: sono, oxigênio, nada de álcool nem remédio que dá sono"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '4.3',
      titulo: "CRM e gerenciamento de ameaças e erros",
      pergunta: "Como a tripulação usa todos os recursos da cabine, e por que o corpo também é uma ameaça a gerenciar?",
      conteudo: {
        texto: [
          "Em **28 de dezembro de 1978**, um DC-8 da United caiu perto de Portland, nos Estados Unidos, **sem combustível**, enquanto a tripulação cuidava de uma pane no trem de pouso: morreram **10** pessoas. O NTSB concluiu que o comandante não monitorou o combustível nem respondeu aos avisos dos colegas, e que os outros dois tripulantes não entenderam a gravidade ou não conseguiram transmiti-la. O avião funcionava; quem falhou foi a **equipe**.",
          "No ano seguinte, em **1979**, um workshop da **NASA** deu nome ao treinamento que ensina a usar todos os recursos da cabine: o **CRM**, gerenciamento de recursos de cabine, que depois virou de **tripulação**. A pesquisa da NASA mostrava que o erro humano na maioria dos acidentes era falha de **comunicação**, de **decisão** e de **liderança**. O CRM passou por cinco gerações: dos estilos de gestão, no começo dos anos 1980, ao trabalho em equipe, à automação e à integração com o treino técnico.",
          "A quinta geração trata o CRM como **gerenciamento de erros**, com três linhas de defesa: **evitar** o erro, **capturá-lo** antes que tenha consequência e **atenuar** o que não deu para evitar. Daí nasceu o **TEM**, gerenciamento de ameaças e erros. **Ameaça** é o que vem de fora e exige atenção, como o tempo, o controle de tráfego ou uma pane; **erro** é a ação ou omissão da tripulação que desvia do esperado; **estado indesejado** é o avião numa situação que reduz a margem de segurança por causa de um erro.",
          "A ICAO mede isso com a **auditoria de segurança em operação normal (LOSA)**: observadores treinados voam na cabine e registram ameaças e erros sem punir ninguém. Numa análise apresentada à ICAO, o controle de tráfego e o mau tempo apareceram como ameaças em **61%** dos voos, e problemas do avião em **52%**. Os erros mais comuns foram de **chamadas padronizadas**, de **checklist** e de **automação**; o erro de pilotagem manual foi o mais mal gerenciado, em **77%** das vezes.",
          "No Brasil, a ANAC exige o treinamento de CRM das empresas aéreas, do táxi aéreo e de outros operadores: pelo menos **16 horas-aula** de conceitos iniciais, uma fase prática de **4 horas** em até **6 meses** e o periódico de **8 horas-aula por ano** ou **16 a cada dois anos**. Participam pilotos, comissários, despachantes, mecânicos de voo e a manutenção de linha, e o programa inclui **estresse**, **fadiga** e os efeitos do **álcool** e das drogas.",
          "O corpo pesa no CRM. A **fadiga** deixa a atenção e a memória mais lentas (Veja M2V8 - V), o **medo** reduz a capacidade de pensar, e o **susto** enfraqueceu a divisão de tarefas no Air France 447 (Veja M3V4 - IV). Por isso o CRM põe fadiga e estresse no currículo: reconhecer em si e no colega os sinais de que o corpo está no limite e dizer isso em voz alta faz parte do gerenciamento de ameaças.",
          "**Como prevenir e amenizar.** Faça o **briefing** com as ameaças do dia: tempo, aeroporto, cansaço e pane conhecida. Use as **chamadas padronizadas** e o checklist em voz alta. Se algo preocupa, fale de forma clara e direta, dizendo o que viu, o que preocupa e o que propõe; quem está no comando escuta e decide. Depois do voo, um **debriefing** curto transforma o erro de hoje na defesa de amanhã.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v4-3-tripulacao.jpg'), legenda: "O avião funcionava; quem falhou foi a equipe. O CRM nasceu dessa lição." } },
          { paragrafo: 2, video: { fonte: require('@/assets/videos/m3v4-voo.mp4'), legenda: "Dizer o que viu, o que preocupa e o que propõe: quem comanda escuta e decide." } },
          {
            paragrafo: 3,
            tabela: {
              titulo: "TEM · ameaça, erro e estado indesejado",
              colunas: ["Conceito", "O que é", "Exemplo"],
              linhas: [
                ["Ameaça", "Evento de fora que exige atenção da tripulação", "Trovoada, mudança de pista pelo controle, pane"],
                ["Erro", "Ação ou omissão da tripulação que desvia do esperado", "Item do checklist esquecido, chamada errada, modo errado"],
                ["Estado indesejado", "Situação do avião que reduz a margem por causa de um erro", "Velocidade fora do previsto, aproximação instável"],
              ],
            },
          },
          { paragrafo: 4, midia: 'tem-classifica' },
          {
            paragrafo: 5,
            tabela: {
              titulo: "CRM no Brasil · fases do treinamento (ANAC, IS 00-010)",
              colunas: ["Fase", "Mínimo", "Observação"],
              linhas: [
                ["Conceitos iniciais", "16 horas-aula", "Até 8 a distância, a critério do operador"],
                ["Prática", "4 horas seguidas, em até 6 meses", "Com LOFT, mais 2 horas de briefing e debriefing"],
                ["Periódico", "8 horas-aula por ano ou 16 a cada dois anos", "Todo o currículo coberto em até 3 anos"],
              ],
            },
          },
          { paragrafo: 6, figura: { imagem: require('@/assets/images/topicos/m3v4-3-debriefing.jpg'), legenda: "O debriefing curto transforma o erro de hoje na defesa de amanhã." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · CRM e TEM",
              colunas: ["Momento", "O que fazer"],
              linhas: [
                ["Briefing", "Listar as ameaças do dia: tempo, aeroporto, cansaço e pane conhecida"],
                ["Durante o voo", "Chamadas padronizadas e checklist em voz alta"],
                ["Quando algo preocupa", "Dizer o que viu, o que preocupa e o que propõe; quem comanda escuta e decide"],
                ["Corpo no limite", "Dizer em voz alta: cansaço, mal-estar e susto também são ameaças"],
                ["Debriefing", "Rever o voo em poucos minutos e transformar o erro em defesa"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '4.4',
      titulo: "Automação",
      pergunta: "O que muda no corpo e na cabeça do piloto quando a máquina voa, e o que fazer quando ela devolve o avião?",
      conteudo: {
        texto: [
          "A automação deixou o voo mais preciso e tirou carga do piloto, mas mudou o trabalho do corpo: menos mãos no manche, mais olhos nas telas. Em **2013**, um grupo de trabalho da FAA e da indústria estudou **26** acidentes, **20** incidentes graves, **734** relatos de incidentes e observações de **9.155** voos para entender o que dá errado quando homem e máquina dividem a cabine.",
          "As conclusões: os pilotos às vezes **confiam demais** na automação e **hesitam em intervir**; há falhas de conhecimento e de habilidade no **voo manual**, inclusive no **gerenciamento de energia** do avião; e a **confusão de modos**, quando o piloto acha que o sistema está fazendo uma coisa e ele faz outra, continua acontecendo. As recomendações foram treinar e praticar o **voo manual** e, a longo prazo, **reduzir o número e a complexidade dos modos**.",
          "Em **1º de junho de 2009**, o Air France 447, do **Rio de Janeiro** a Paris, mostrou o custo. Cristais de gelo bloquearam os tubos de **pitot**, as velocidades ficaram inconsistentes e o piloto automático se desligou. Os comandos da tripulação desestabilizaram a trajetória, o avião entrou em **estol** e ninguém o identificou: morreram as **228** pessoas a bordo. O relatório francês apontou o **susto**, a incompreensão da situação e a falta de treino de **pilotagem manual em grande altitude**.",
          "Em **6 de julho de 2013**, o Boeing 777 da Asiana bateu antes da pista em San Francisco, e **3** pessoas morreram. O NTSB apontou a descida mal gerenciada na aproximação visual, o desligamento sem querer do **controle automático de velocidade**, a falta de **monitoramento** da velocidade e a arremetida tardia, e citou a **complexidade** dos sistemas de piloto automático como fator contribuinte.",
          "O corpo explica parte do problema. Quando o piloto só observa a máquina, a atenção precisa se manter sem ação, e a **fadiga** e a madrugada a enfraquecem (Veja M2V8 - V). Quando a automação devolve o avião de repente, vem o **susto**, e as mãos sem prática demoram a responder (Veja M3V3 - III). Por isso o treino volta ao **voo manual** e ao simulador com panes inesperadas.",
          "Para o **passageiro**, a automação é aliada quando o piloto sabe quando usá-la e quando assumir. Para o **médico examinador**, a pergunta não é se o piloto usa a tela, mas se ele tem **visão**, **atenção** e **reação** para assumir o avião em segundos quando a máquina devolve o controle (Veja M3V1 - II).",
          "**Como prevenir e amenizar.** Saiba sempre em que **modo** o avião está e anuncie cada mudança em voz alta. Quando a automação faz algo que você não entende, **desça um nível**: do piloto automático ao diretor de voo, do diretor de voo ao voo manual. Pratique o voo manual quando a empresa permitir e as condições forem boas, e treine panes de automação no simulador. Em voo longo, divida a vigilância com o colega e use os descansos previstos (Veja M2V8 - VI).",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v4-4-telas.jpg'), legenda: "Menos mãos no manche, mais olhos nas telas: a automação mudou o trabalho do corpo." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Automação · o que o grupo da FAA encontrou (2013)",
              colunas: ["Achado", "O que significa no voo"],
              linhas: [
                ["Confiança demais", "O piloto hesita em intervir quando a máquina erra"],
                ["Voo manual enfraquecido", "Mãos e decisões mais lentas quando a automação devolve o avião"],
                ["Gerenciamento de energia", "Velocidade e altitude fora do previsto na aproximação"],
                ["Confusão de modos", "O piloto acha que o sistema faz uma coisa e ele faz outra"],
              ],
            },
          },
          { paragrafo: 3, midia: 'nivel-automacao' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Dois acidentes, a mesma lição",
              colunas: ["Voo", "O que aconteceu", "Lição para o corpo e o treino"],
              linhas: [
                ["Air France 447, 2009", "Pitot bloqueado, piloto automático desligado e estol não identificado; 228 mortos", "O susto desfaz a divisão de tarefas; treinar o voo manual em grande altitude"],
                ["Asiana 214, 2013", "Controle automático de velocidade desligado sem querer, velocidade sem monitoramento e arremetida tardia; 3 mortos", "Conferir o modo e monitorar a velocidade; arremeter cedo"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v4-4-manual.jpg'), legenda: "Quando a máquina devolve o avião, as mãos precisam saber o que fazer: o treino volta ao voo manual." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · automação",
              colunas: ["Momento", "O que fazer"],
              linhas: [
                ["Sempre", "Saber em que modo o avião está e anunciar cada mudança"],
                ["Quando a automação surpreende", "Descer um nível: piloto automático, diretor de voo, voo manual"],
                ["Em boas condições", "Praticar o voo manual quando a empresa permitir"],
                ["No simulador", "Treinar panes de automação e recuperações inesperadas"],
                ["Voo longo", "Dividir a vigilância e usar os descansos previstos"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "O que acontece", "Proteção e prevenção"],
              linhas: [
                ["Cérebro e atenção", "Percepção, compreensão e projeção falham com hipóxia, fadiga, álcool e remédios; o córtex é o primeiro a sofrer", "Sono protegido, oxigênio, nada de álcool nem remédio que dá sono, e monitoramento cruzado"],
                ["Mente e emoção", "Medo e susto reduzem a capacidade de pensar e desfazem a divisão de tarefas; o corpo reage antes da razão", "Briefing das ameaças, UPRT e programa de apoio"],
                ["Labirinto e visão", "Ilusões e fixação num só instrumento levam à perda de consciência situacional; o labirinto engana sem avisar", "Varredura em ciclos e confiança nos instrumentos"],
                ["Relógio biológico", "Na madrugada e com fuso, atenção e memória caem; o relógio interno pede sono", "Escala que respeita o descanso e uso dos descansos no voo longo"],
                ["Mãos e reflexos", "Sem prática, o voo manual fica lento quando a automação devolve o avião; a habilidade se perde com o desuso", "Prática de voo manual e treino de panes no simulador"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '4.1',
      pergunta: "Para a ICAO, que parte dos acidentes resulta de desempenho humano abaixo do ideal?",
      opcoes: [
        "Cerca de 1 em 10",
        "Cerca de 1 em 4",
        "Cerca de 3 em 4",
        "Todos",
      ],
      correta: 2,
      explicacao: "Cerca de três em cada quatro acidentes resultam de desempenho humano abaixo do ideal, o que se costuma chamar de erro humano.",
    },
    {
      topico: '4.1',
      pergunta: "No modelo SHELL, o que fica no centro?",
      opcoes: [
        "A máquina",
        "O procedimento",
        "A pessoa",
        "O ambiente",
      ],
      correta: 2,
      explicacao: "A pessoa é o componente mais crítico e mais flexível; o erro nasce quando uma das bordas à volta dela não se encaixa.",
    },
    {
      topico: '4.1',
      pergunta: "No HFACS, em que nível entram a hipóxia, a fadiga e o remédio que dá sono?",
      opcoes: [
        "Atos inseguros",
        "Precondições",
        "Supervisão insegura",
        "Influências organizacionais",
      ],
      correta: 1,
      explicacao: "São estados fisiológicos adversos, que abrem furos no queijo antes de qualquer erro: é ali que a medicina entra.",
    },
    {
      topico: '4.2',
      pergunta: "Quais são os três níveis de consciência situacional?",
      opcoes: [
        "Ver, ouvir e falar",
        "Perceber, compreender e projetar",
        "Planejar, voar e pousar",
        "Ler, conferir e assinar",
      ],
      correta: 1,
      explicacao: "Perceber os elementos, compreender o que significam e projetar o que vão fazer: perder um nível é voar com um mapa errado.",
    },
    {
      topico: '4.2',
      pergunta: "Nos acidentes de grandes empresas aéreas com problema de consciência situacional, que nível falhou mais?",
      opcoes: [
        "Percepção",
        "Compreensão",
        "Projeção",
        "Nenhum: foram falhas mecânicas",
      ],
      correta: 0,
      explicacao: "Foram 72% de falhas de percepção, 22% de compreensão e 6% de projeção: na maioria das vezes, a informação estava lá e não foi vista.",
    },
    {
      topico: '4.2',
      pergunta: "O que fazer ao perceber que está atrás do avião?",
      opcoes: [
        "Acelerar para chegar logo",
        "Desligar todos os sistemas",
        "Diminuir a carga: reduzir a velocidade, subir, usar a automação certa ou pedir tempo",
        "Esperar passar",
      ],
      correta: 2,
      explicacao: "Ganhar tempo devolve a consciência situacional: com menos tarefas, a percepção e a compreensão voltam.",
    },
    {
      topico: '4.3',
      pergunta: "Que acidente de 1978 ajudou a criar o CRM?",
      opcoes: [
        "Um DC-8 que caiu sem combustível perto de Portland",
        "Uma colisão no ar sobre o Atlântico",
        "Uma pane de motor na decolagem",
        "Uma descompressão em cruzeiro",
      ],
      correta: 0,
      explicacao: "O avião funcionava: o comandante não monitorou o combustível, e os colegas não conseguiram transmitir a gravidade. Morreram 10 pessoas.",
    },
    {
      topico: '4.3',
      pergunta: "No TEM, o que é uma ameaça?",
      opcoes: [
        "Um erro da tripulação",
        "Um evento de fora que exige atenção da tripulação",
        "Uma punição da empresa",
        "O avião numa situação de margem reduzida",
      ],
      correta: 1,
      explicacao: "Tempo, controle de tráfego e panes são ameaças; o erro vem da tripulação, e o estado indesejado é a consequência do erro.",
    },
    {
      topico: '4.3',
      pergunta: "No Brasil, qual o mínimo do treinamento periódico de CRM?",
      opcoes: [
        "Nenhum: só o inicial",
        "1 hora a cada 5 anos",
        "8 horas-aula por ano ou 16 a cada dois anos",
        "40 horas por mês",
      ],
      correta: 2,
      explicacao: "A IS 00-010 da ANAC pede 16 horas-aula iniciais, 4 horas práticas em até 6 meses e o periódico de 8 horas por ano ou 16 a cada dois anos.",
    },
    {
      topico: '4.4',
      pergunta: "O que o grupo de trabalho da FAA encontrou em 2013?",
      opcoes: [
        "A automação eliminou o erro humano",
        "Os pilotos às vezes confiam demais na automação e hesitam em intervir",
        "O voo manual deve ser proibido",
        "Os modos devem aumentar",
      ],
      correta: 1,
      explicacao: "O grupo recomendou treinar o voo manual e, a longo prazo, reduzir o número e a complexidade dos modos.",
    },
    {
      topico: '4.4',
      pergunta: "O que começou a sequência do acidente do Air France 447?",
      opcoes: [
        "Uma pane dos dois motores",
        "Cristais de gelo que bloquearam os tubos de pitot",
        "Falta de combustível",
        "Uma colisão com aves",
      ],
      correta: 1,
      explicacao: "Com as velocidades inconsistentes, o piloto automático se desligou; o susto e a falta de treino de voo manual em grande altitude fizeram o resto.",
    },
    {
      topico: '4.4',
      pergunta: "Quando a automação faz algo que você não entende, o que fazer?",
      opcoes: [
        "Esperar que ela se corrija",
        "Descer um nível de automação",
        "Ligar mais modos",
        "Chamar a manutenção pelo rádio",
      ],
      correta: 1,
      explicacao: "Do piloto automático ao diretor de voo, do diretor de voo ao voo manual: voar o avião vem antes de entender a máquina.",
    },
  ],
};
