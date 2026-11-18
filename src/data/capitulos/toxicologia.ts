// Missão 3 · Voo 8 — Toxicologia e higiene da aeronave. Ramo editorial voo/M3V8, com as 12 fotos e o vídeo do autor.
// Os 6 itens previstos viraram 6 tópicos, no mesmo padrão do M3V1 ao M3V7 e do M3V15.
// REGISTRO DE REVISÃO · 18/11/2026. Fontes conferidas:
// 8.1 Monóxido. EASA SIB 2020-01R1 (19/10/2021): fontes, faixas de COHb e sintomas, detector ativo, conduta do piloto.
//   NTSB, comunicado de 20/01/2022 e AIR-22-01: 31 acidentes (1982 a 2020), 23 fatais, 42 mortos, 4 feridos graves;
//   detector pedido em 2004 e de novo em 2022. FAA SAIB CE-10-19R1 e CE-10-33R1, DOT/FAA/AR-09/49: silencioso como
//   principal fonte. StatPearls NBK430740: afinidade de 200 a 250 vezes, desvio da curva, sequelas tardias em 23% a 47%
//   dos internados, CO como causa de morte em vítimas de fogo. Merck Manual: meia-vida de 4,5 h, 1,5 h e 20 min (3 atm)
//   e limite do oxímetro. WikEM (apoio): COHb de cerca de 1% em não fumantes e até 10% em fumantes; feto.
// 8.2 Fumaça. FAA Lessons Learned e NTSB/AAR-86/02: Air Canada 797, 2/6/1983, 23 de 41 passageiros, fogo súbito 60 a 90 s
//   após abrir as saídas. NTSB A-83-70 a 81: toalhas úmidas e roupas. FAA, Amdt. 121-193 (3/6/1987): proteção
//   respiratória. ICAO Cir 344-AN/202 (2015): escopo, risco de tripulante prejudicado, sem tratar de saúde ocupacional;
//   frase sobre o cheiro do óleo citada por CUPE. IFALPA 23HUPBL01: máscara mesmo sem sinal visível. CASA (Austrália),
//   Cabin Safety Bulletin 13, conforme fumeguide: mais de 1.000 ocorrências entre 2013 e 2017. COT (Reino Unido), 2007,
//   2013 e Statement 2024/03: padrão de doença e escassez de dados durante os eventos; tema sem consenso.
// 8.3 Ozônio. 14 CFR 25.832 e 121.578; CS 25.832. Bekö e colegas, PLoS One 2015. FAA, material ACER: cerca de 85% com
//   conversor, cabines acima de 50 ppb sem conversor, catalisador degradado. Weschler, comunicado da ACS: mais da metade
//   dos subprodutos vinda de pele, cabelo e roupas; efeito desconhecido. Bhangar: perturbações da tropopausa.
// 8.4 Combustíveis e fluidos. ATSDR, Toxicological Profile JP-5, JP-8 e Jet A (2017): vias, tempo de reação, pele em
//   animais, querosene ingerido e aspiração, audição, IARC grupo 3, OSHA sem limite, NIOSH 100 mg/m³ em 10 h.
//   Fichas de segurança Skydrol LD4 e Skydrol 5: irritação, sensibilização, olhos, lavagem de 15 min, categoria 2 de
//   carcinogenicidade na LD4. "Não provocar vômito" é aplicação do risco de aspiração descrito pela ATSDR.
//   PENDENTE, fora do texto por falta de fonte conferida: chumbo da gasolina de aviação e fluidos de degelo.
// 8.5 Desinsetização. OMS, Annex 1 (via ICAO CAPSCA, trecho) e WHO/PCS/95.51: métodos, permetrina e d-fenotrina a 2%,
//   35 g/100 m³, residual até 8 semanas fora das áreas de alimentos, porões. Bull OMS 2000;78(8): mosquitos vivos.
//   US DOT: exigências por país. ICAO, Anexo 9, 2.22 e 2.23, conforme FAL/12-WP/69 (2004): conferir a edição vigente.
//   Pang e colegas, Travel Med Infect Dis 2020; revisão PROSPERO CRD42024543998: 21 estudos, certeza baixa a muito baixa.
// 8.6 Água e alimentos. EPA, 40 CFR 141 Subparte X: tabela b-1, amostras, prazos de 24 e 72 horas, avisos, grupos de
//   risco. Anvisa, RDC 1.038/2026 (21/08/2026, DOU 25 e 26/08/2026): revoga a RDC 2/2003, vigência em 150 dias, adequação
//   em até 24 meses; água, reservatórios, veículos, pragas e alimentos. Eisenberg, Lancet 1975, e revisão da Napier
//   University: 197 doentes. Anchorage Daily News (2023): cozinheiro com lesões e refeições diferentes dos pilotos.
//   Eberhart-Phillips e colegas, Epidemiol Infect 1996: cólera, 1992, Lima a Los Angeles.
// Normas estrangeiras são citadas como tais e não viram regra brasileira. Dicas sem número próprio (saída mais próxima,
// ficar abaixado, avisar a tripulação, lavar as mãos, reposição de líquidos) são aplicação das fontes e dos voos citados.
import type { Capitulo } from '../tipos';

export const toxicologia: Capitulo = {
  numero: 8,
  titulo: 'Toxicologia e higiene da aeronave',
  tempoLeituraMin: 17,
  topicos: [
    {
      id: '8.1',
      titulo: "Monóxido de carbono",
      pergunta: "Como um gás sem cheiro entra na cabine, o que ele faz com o sangue e por que o piloto pode não perceber?",
      conteudo: {
        texto: [
          "O **monóxido de carbono (CO)** é um gás **sem cor, sem cheiro e sem gosto**, produzido pela queima incompleta do combustível. Os **motores a pistão** geram as maiores concentrações, que normalmente saem pelo escapamento. O perigo começa quando o gás encontra um caminho para a cabine: **vedação ruim**, trinca no escapamento que contamina o ar do **aquecimento** ou aquecedor a combustão com defeito. No inverno, com o aquecimento ligado, o risco aumenta.",
          "No sangue, o CO se liga à **hemoglobina** com afinidade **200 a 250 vezes** maior que a do oxigênio e forma a **carboxi-hemoglobina (COHb)**. O prejuízo é duplo: sobra menos hemoglobina para levar oxigênio, e a que sobra **solta menos oxigênio nos tecidos**. É uma **hipóxia hipêmica**: o pulmão funciona, mas o sangue não entrega (Veja M2V1 - II). O **cérebro** e o **coração**, que dependem muito de oxigênio, são os mais atingidos.",
          "Os sintomas acompanham a COHb. Abaixo de **10%**, em geral nada se nota. De **10% a 20%**, dor de cabeça leve. De **20% a 30%**, dor de cabeça, respiração mais rápida, tontura e sonolência. De **30% a 40%**, dor forte, **julgamento prejudicado** e visão turva. Acima de **50%**, perda de consciência e infarto. A armadilha é que os primeiros sinais lembram **cansaço, enjoo ou hipóxia de altitude**, e o julgamento pode falhar antes de surgir a desconfiança.",
          "O **oxímetro de pulso comum engana**: ele não distingue a COHb da hemoglobina com oxigênio e pode mostrar um número falsamente normal. A confirmação vem da **dosagem de COHb** no sangue ou da CO-oximetria. O ponto de partida também pesa: a COHb fica perto de **1%** em quem não fuma e pode chegar a **10%** em **fumantes**. Quem tem **anemia** ou doença do coração tem menos reserva, e na **gestação** o feto também é exposto (Veja M2V11 - II, M2V2 - III e M2V13 - II). A visão noturna piora cedo (Veja M2V4 - III).",
          "Nos Estados Unidos, o **NTSB** identificou **31 acidentes** atribuídos ao CO entre **1982 e 2020**: **23** fatais, com **42 mortos** e **4 feridos graves**. Em estudo feito para a FAA, o **silencioso do escapamento** foi a principal fonte. Em 2022, o NTSB pediu pela segunda vez que a FAA exigisse **detectores** em aviões leves com cabine fechada. A EASA recomenda **detector ativo**, com alarme sonoro ou visual. Depois de um acidente, a COHb também entra na investigação (Veja M3V15 - IV).",
          "Ao **suspeitar de CO**, a EASA orienta: **desligar o aquecimento**, aumentar ao máximo o **ar fresco**, abrir janelas se o manual permitir, usar **oxigênio suplementar** se houver e for seguro, avisar o controle e **pousar assim que possível**. Depois, buscar atendimento médico, mesmo com melhora. Respirando ar comum, a meia-vida do CO é de cerca de **4,5 horas**; com **oxigênio a 100%**, cerca de **1,5 hora**; em câmara hiperbárica a 3 atmosferas, cerca de **20 minutos**. Entre pacientes internados, **23% a 47%** têm sequelas neurológicas tardias.",
          "**Como prevenir e amenizar.** Inspecione **escapamento, silencioso e aquecimento** nos prazos do fabricante e não adie o reparo de uma trinca. Leve um **detector ativo** em condição de uso, com alarme que se ouça sob o fone. Trate dor de cabeça ou sono inesperados em voo como **possível CO**, sobretudo com o aquecimento ligado. Não volte a voar no mesmo avião antes de um **mecânico** achar e corrigir a causa.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v8-1-escapamento.jpg'), legenda: "Antes do voo, olhar o escapamento e o silencioso é parte da defesa contra o monóxido." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Por onde o CO entra",
              colunas: ["Caminho", "Como acontece", "O que conferir"],
              linhas: [
                ["Escapamento e silencioso", "Trinca libera gás perto da entrada de ar", "Inspeção nos prazos do fabricante"],
                ["Aquecimento da cabine", "O ar aquecido passa junto ao escapamento", "Teste do sistema antes do inverno"],
                ["Aquecedor a combustão", "Defeito lança gases no ar da cabine", "Manutenção conforme o manual"],
                ["Vedação da cabine", "Gás entra por frestas e passagens", "Portas, janelas e paredes de fogo"],
              ],
            },
          },
          { paragrafo: 3, midia: 'niveis-cohb' },
          { paragrafo: 4, midia: 'animacao-monoxido' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v8-1-detector.jpg'), legenda: "Um detector com alarme avisa o que o nariz não consegue perceber." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · monóxido de carbono",
              colunas: ["Quando", "O que fazer"],
              linhas: [
                ["Na manutenção", "Inspecionar escapamento, silencioso e aquecimento"],
                ["Antes do voo", "Conferir o detector e o alarme"],
                ["Com sintomas ou alarme", "Desligar o aquecimento, abrir o ar fresco, usar oxigênio se seguro"],
                ["Em seguida", "Avisar o controle e pousar assim que possível"],
                ["Depois do pouso", "Atendimento médico e inspeção antes do próximo voo"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '8.2',
      titulo: "Fumaça na cabine",
      pergunta: "O que separa a fumaça de um incêndio de um evento de vapores, o que esses gases fazem ao corpo e como agir a bordo?",
      conteudo: {
        texto: [
          "Nem todo cheiro estranho a bordo tem a mesma origem. A **fumaça de fogo** vem da queima de materiais. O **evento de vapores** (fume event) acontece quando **óleo de motor, óleo da unidade auxiliar (APU) ou fluido hidráulico** chega à cabine pelo **sistema de suprimento de ar**. Há ainda fontes internas e externas, como equipamentos da galley e gases do pátio. Identificar a origem orienta a resposta, mas a proteção de quem pilota **não espera a certeza**.",
          "A fumaça de incêndio ataca de várias formas. O **monóxido de carbono** é uma das principais causas de morte entre vítimas de fogo, e o **cianeto** pode estar presente ao mesmo tempo. Plásticos e espumas liberam gases muito tóxicos. As partículas e os irritantes inflamam **olhos e vias aéreas**, provocam tosse e falta de ar, e a fumaça **tira a visibilidade**. O resultado é hipóxia, confusão e dificuldade de achar a saída justamente quando cada segundo conta (Veja M2V1 - II).",
          "O caso que mudou as regras foi o voo **Air Canada 797**, em **2 de junho de 1983**. Um incêndio oculto começou perto do lavatório traseiro de um DC-9. O avião pousou em Cincinnati, mas **23 dos 41 passageiros** não conseguiram sair e sucumbiram à fumaça e aos gases tóxicos, antes ou depois do **fogo súbito** que veio **60 a 90 segundos** após a abertura das saídas. Alguns respiraram através de toalhas úmidas ou roupas. Em **1987**, a FAA ampliou a exigência de **equipamento de proteção respiratória** para a tripulação.",
          "No **evento de vapores**, a preocupação imediata é a **segurança do voo**: um tripulante prejudicado ou incapacitado compromete a operação (Veja M3V5 - V). A **Circular 344 da ICAO** orienta pilotos, comissários e mecânicos a reconhecer, responder e relatar. Ela alerta que o vapor de óleo **muitas vezes não cheira a óleo**. O olfato também cansa: deixar de sentir o cheiro não prova que ele passou. Na Austrália, foram mais de **1.000 ocorrências** de fogo, fumaça ou odor entre **2013 e 2017**.",
          "Os efeitos a longo prazo seguem em debate. Os óleos contêm **organofosforados**, como o fosfato de tricresila, e tripulantes relatam sintomas depois desses eventos. O **Comitê de Toxicologia do Reino Unido** observou que o padrão de doença relatado não coincide com o esperado pela exposição a esses compostos, e, em **2024**, ressaltou que ainda há **poucos dados** sobre as concentrações durante os eventos. Falta de medida não é prova de inocência nem de culpa: por isso os sintomas devem ser **registrados e avaliados**.",
          "A bordo, a sequência é **proteger, comunicar e decidir**. Os pilotos colocam a **máscara de oxigênio** logo que suspeitam, mesmo sem nada visível, e seguem a lista do fabricante (Veja M1V2 - III). A tripulação de cabine informa **onde, como e desde quando** o problema apareceu, sem esperar confirmação (Veja M3V4 - III). Com fogo ou fumaça persistente, a prioridade é **pousar**. Em terra, quem teve sintomas deve receber **avaliação médica**, e a ocorrência precisa ser relatada para que a manutenção procure a causa.",
          "**Como prevenir e amenizar.** O tripulante deve **treinar** o uso da máscara e do equipamento de proteção respiratória e conhecer os cheiros e sinais descritos pela empresa. O passageiro deve ouvir a tripulação, **localizar a saída mais próxima** antes da decolagem, deixar a bagagem e manter-se **abaixado** se houver fumaça. Depois de um evento, anote a hora, o local, o cheiro e os sintomas, e informe tudo ao médico.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v8-2-odor.jpg'), legenda: "Um cheiro diferente perto da saída de ar merece atenção e aviso imediato à cabine de comando." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Fogo e vapores não são a mesma coisa",
              colunas: ["Aspecto", "Fumaça de fogo", "Evento de vapores"],
              linhas: [
                ["Origem", "Queima de materiais", "Óleo ou fluido hidráulico no suprimento de ar"],
                ["Agressores", "Monóxido, cianeto, irritantes e partículas", "Mistura de vapores, com poucos dados medidos"],
                ["Risco imediato", "Hipóxia, perda de visão e fogo", "Tripulante prejudicado ou incapacitado"],
                ["Primeira proteção", "Máscara, combate ao fogo e pouso", "Máscara, lista do fabricante e relato"],
              ],
            },
          },
          { paragrafo: 3, midia: 'sinais-cabine' },
          { paragrafo: 4, video: { fonte: require('@/assets/videos/m3v8-voo.mp4'), legenda: "Na dúvida sobre o ar da cabine, a máscara vem antes da explicação." } },
          { paragrafo: 6, figura: { imagem: require('@/assets/images/topicos/m3v8-2-protecao.jpg'), legenda: "O equipamento de proteção respiratória permite agir onde a fumaça impediria respirar." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · fumaça e vapores",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Pilotos", "Máscara logo na suspeita e lista do fabricante"],
                ["Comissários", "Informar onde, como e desde quando"],
                ["Passageiros", "Conhecer a saída, deixar a bagagem e ficar abaixado"],
                ["Manutenção", "Procurar a origem antes do próximo voo"],
                ["Quem teve sintomas", "Anotar o ocorrido e procurar avaliação médica"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '8.3',
      titulo: "Ozônio",
      pergunta: "Por que o gás que protege a Terra lá no alto pode irritar olhos e pulmões dentro do avião?",
      conteudo: {
        texto: [
          "O **ozônio** é uma molécula com três átomos de oxigênio. Na alta atmosfera, ele filtra parte da radiação ultravioleta (Veja M1V1 - I). O avião de cruzeiro voa perto dessa região, e o ar externo pode ser rico em ozônio, sobretudo quando a **tropopausa** se desloca de forma passageira. Esse ar é comprimido e levado à cabine. O que protege a vida lá fora é, **dentro do corpo, um irritante**.",
          "O ozônio reage com a superfície úmida de **olhos, nariz, garganta e brônquios**. Ele é um irritante respiratório reconhecido, ligado a sintomas respiratórios e à **piora da asma** (Veja M2V1 - VI). Num estudo com passageiros de voos comerciais, publicado em **2015**, concentrações maiores se associaram de forma consistente a queixas nos **olhos** e nas **vias aéreas superiores**. O ar seco da cabine produz sensações parecidas, o que dificulta separar as causas (Veja M1V1 - IV).",
          "A norma americana de projeto, **14 CFR 25.832**, fixa dois limites na cabine, em equivalente ao nível do mar: **0,25 ppm a qualquer momento acima do FL 320** e **média de 0,1 ppm em qualquer intervalo de 3 horas acima do FL 270**. A regra de operação das empresas aéreas, **14 CFR 121.578**, repete os valores. Na Europa, o tema aparece na **CS 25.832**. Limite cumprido não significa ausência de ozônio: significa exposição mantida dentro da faixa aceita.",
          "A principal barreira é o **conversor catalítico de ozônio**, instalado no caminho do ar. Material de pesquisa divulgado pela FAA indica que a maioria dos aviões de **fuselagem larga** tem esse recurso, com remoção de cerca de **85%**. Ele é menos comum nos de **fuselagem estreita**, e medições em voos sem conversor mostraram cabines com frequência **acima de 50 ppb** (0,05 ppm). O catalisador **envelhece e pode ser contaminado**, por isso seu desempenho precisa ser acompanhado.",
          "A história não termina no ozônio. Na cabine, ele reage com **óleos da pele, cabelo, roupas** e superfícies e forma outros compostos, como **aldeídos**. Em cabine simulada, mais da metade desses subprodutos veio das reações com as próprias pessoas e suas roupas. Ainda não se sabe qual é o papel deles nos sintomas. Por isso, medir só o ozônio pode **não contar toda a exposição** de quem passa muitas horas a bordo.",
          "Quem sente mais? Pessoas com **asma** ou outra doença das vias aéreas têm menos margem, e os **tripulantes** repetem a exposição ao longo da carreira. Ardor nos olhos, tosse seca, irritação na garganta ou aperto no peito que **surgem no cruzeiro** e melhoram depois do voo merecem registro. Falta de ar importante ou chiado que não cede com o remédio habitual exige avisar a tripulação, que pode oferecer oxigênio e buscar **apoio médico** (Veja M2V1 - VI).",
          "**Como prevenir e amenizar.** Quem tem asma deve levar o **broncodilatador na bagagem de mão** e manter o tratamento em dia. Lubrificante ocular e boa hidratação aliviam o desconforto, embora não removam o gás. Para a empresa, a proteção está em **conversores em bom estado**, planejamento de rota e registro das queixas. Tripulantes com sintomas repetidos devem levá-los ao **médico do trabalho** (Veja M3V7 - II).",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v8-3-cruzeiro.jpg'), legenda: "No cruzeiro, o avião voa perto da região onde o ar é mais rico em ozônio." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "O ozônio no corpo",
              colunas: ["Onde", "O que se sente", "Quem presta mais atenção"],
              linhas: [
                ["Olhos", "Ardor e irritação", "Quem usa lentes de contato"],
                ["Nariz e garganta", "Secura e irritação", "Tripulantes em voos longos"],
                ["Brônquios", "Tosse, chiado e aperto no peito", "Pessoas com asma ou DPOC"],
              ],
            },
          },
          { paragrafo: 3, midia: 'ozonio-cabine' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v8-3-passageira.jpg'), legenda: "Olhos irritados no cruzeiro podem vir do ar seco, do ozônio ou da soma dos dois." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · ozônio",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Passageiro com asma", "Broncodilatador à mão e tratamento em dia"],
                ["Qualquer passageiro", "Avisar a tripulação se faltar ar"],
                ["Tripulante", "Registrar sintomas repetidos e procurar o médico do trabalho"],
                ["Empresa aérea", "Manter conversores e acompanhar as queixas"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '8.4',
      titulo: "Combustíveis e fluidos",
      pergunta: "Como querosene de aviação e fluidos hidráulicos entram no corpo de quem trabalha com eles e o que protege essas pessoas?",
      conteudo: {
        texto: [
          "Para a maioria dos passageiros, o contato com o **querosene de aviação** é improvável. O risco está em quem **produz, transporta, abastece ou mantém** aeronaves, e em quem fica perto delas na **partida a frio** dos motores. O combustível entra no corpo por três caminhos: os **vapores e névoas** inalados, o contato com a **pele** e, por acidente, a **boca**. O perfil toxicológico da ATSDR, de **2017**, reúne o que se sabe sobre Jet A, JP-5 e JP-8.",
          "Pelo ar, o alvo que mais preocupa é o **sistema nervoso**. Estudos com militares sugerem que o JP-8 pode alterar o **tempo de reação** e outros testes neurológicos, inclusive depois de exposições breves ao vapor. Nos Estados Unidos, a OSHA não fixou limite legal para combustíveis de aviação no ar do trabalho, e o NIOSH recomenda **100 mg/m³ para querosene**, em média numa jornada de **10 horas**. No Brasil, a avaliação entra no **PGR** e no **PCMSO** da empresa (Veja M3V7 - II).",
          "Na **pele**, o combustível remove a proteção natural. Estudos em animais mostram desde **vermelhidão e inchaço** até **dermatite e úlceras**, e a gravidade cresce com a concentração e com o tempo de contato. Há um círculo ruim: a pele lesada e o **contato prolongado aumentam a absorção**. Roupa ou luva encharcada mantém o produto encostado no corpo e transforma um respingo em exposição longa.",
          "A ingestão acidental de **querosene** causou tosse, falta de ar, dor abdominal, vômitos, sonolência, agitação e convulsões. O grande perigo está no **pulmão**: a pneumonite e a bronquite são atribuídas, em boa parte, à **aspiração** do líquido. Por isso, **não se deve provocar vômito** nem tentar aspirar combustível com a boca por uma mangueira. Quem engoliu ou aspirou precisa de **atendimento médico imediato**, mesmo sem sintomas no início.",
          "Há também um efeito menos lembrado: a **audição**. A ATSDR afirma que a exposição ao JP-8 pode ter efeitos auditivos, e estudos em animais mostram que **ruído e combustível juntos** pioram o dano. Na rampa e no hangar, os dois costumam aparecer no mesmo turno, o que reforça o protetor auricular e a audiometria (Veja M1V6 - III e M3V7 - V). Quanto ao câncer, a **IARC** classifica esses combustíveis no **grupo 3**: não classificáveis quanto à ação cancerígena em humanos.",
          "Os **fluidos hidráulicos** de muitos aviões civis são **ésteres de fosfato**, resistentes ao fogo. As fichas de segurança de produtos de uso comum apontam **irritação da pele**, possibilidade de **alergia cutânea** e olhos vermelhos, lacrimejantes e doloridos. Uma delas, com fosfato de tributila, traz ainda alerta de **suspeita de câncer**. Em contato com olhos ou pele, a orientação dessas fichas é **lavar com bastante água por pelo menos 15 minutos**, retirar a roupa contaminada e procurar atendimento se os sintomas surgirem.",
          "**Como prevenir e amenizar.** Use **luvas e óculos** indicados na ficha de segurança de cada produto e troque na hora a roupa molhada. Lave a pele com água e sabão, sem usar combustível ou solvente para limpar as mãos. Mantenha ventilação, afaste-se da névoa na partida a frio e proteja a **audição**. Conte ao **médico do trabalho** sobre lesões de pele, tontura ou mudança na atenção depois do turno (Veja M3V7 - V).",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v8-4-amostra.jpg'), legenda: "Quem coleta e confere combustível precisa proteger a pele e evitar respirar os vapores." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Três caminhos para dentro do corpo",
              colunas: ["Via", "Quando acontece", "Principal alvo"],
              linhas: [
                ["Respiração", "Abastecimento, manutenção e partida a frio", "Sistema nervoso e vias aéreas"],
                ["Pele", "Respingo, roupa molhada e luva inadequada", "Pele, com absorção maior se lesada"],
                ["Boca", "Acidente ou sucção por mangueira", "Pulmão, por aspiração"],
              ],
            },
          },
          { paragrafo: 4, midia: 'fluidos-bordo' },
          { paragrafo: 6, figura: { imagem: require('@/assets/images/topicos/m3v8-4-hidraulico.jpg'), legenda: "Luvas e óculos fazem parte do serviço em sistemas hidráulicos." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · combustíveis e fluidos",
              colunas: ["Situação", "O que fazer"],
              linhas: [
                ["Antes do serviço", "Ler a ficha de segurança e escolher luvas e óculos"],
                ["Respingo na pele", "Tirar a roupa molhada e lavar com água e sabão"],
                ["Fluido nos olhos", "Lavar com bastante água por 15 minutos ou mais"],
                ["Combustível engolido", "Não provocar vômito e buscar atendimento imediato"],
                ["Perto de motores", "Protetor auricular e distância da névoa"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '8.5',
      titulo: "Desinsetização",
      pergunta: "Por que alguns aviões recebem inseticida, como isso é feito e o que se sabe sobre os efeitos em quem está a bordo?",
      conteudo: {
        texto: [
          "A **desinsetização** elimina insetos dentro da aeronave para que ela não leve **vetores de doenças** de um país a outro. A preocupação é antiga: levantamentos em aeroportos internacionais encontraram **mosquitos vivos** em aviões vindos de regiões com **malária e arboviroses**. O mosquito que viaja escondido pode picar longe de onde a doença costuma existir (Veja M2V11 - IV).",
          "A **OMS** recomenda três métodos, que na prática viram quatro técnicas. No **blocks away**, a tripulação aplica aerossol com os passageiros a bordo, depois de fechadas as portas e antes da decolagem. No **pré-voo**, a cabine é tratada antes do embarque e recebe nova aplicação no **início da descida**. No **residual**, as superfícies internas são tratadas sem passageiros, e o efeito dura semanas.",
          "Os produtos recomendados são **piretroides sintéticos**. O aerossol de **d-fenotrina a 2%** é aplicado na dose de **35 g por 100 m³**. A **permetrina a 2%** é usada no pré-voo, no máximo **1 hora** antes do fechamento das portas, e no método residual, repetido em intervalos de até **8 semanas**, sem atingir as áreas de preparo de alimentos. Os **porões de carga** também entram no tratamento.",
          "A exigência **depende do destino** e muda com o tempo. Lista do Departamento de Transportes dos Estados Unidos mostrou países que pediam o spray com passageiros a bordo em todos os voos de chegada, outros que aceitavam o método residual e outros que só o exigiam em certas rotas. O **Anexo 9 da ICAO** pede que os Estados limitem o uso rotineiro de aerossol com pessoas a bordo e revejam periodicamente suas exigências. No Brasil, o controle de pragas em aeronaves integra a **RDC 1.038/2026 da Anvisa**.",
          "O corpo recebe o produto pela **respiração** e pela **pele**. Passageiros e tripulantes já relataram sintomas durante e depois das aplicações. Um estudo encontrou mais metabólitos de permetrina na urina de comissários que trabalhavam em aviões tratados pouco antes, o que mostra **exposição**, mas não prova doença. Uma revisão sistemática recente reuniu **21 estudos** e julgou a evidência **limitada e de baixa certeza**. A pergunta segue aberta, sobretudo para quem é exposto **repetidamente**.",
          "Quem tem **asma, alergia importante** ou sensibilidade a inseticidas deve saber do procedimento **antes de viajar**: a empresa aérea informa as exigências do destino, e o método residual evita o spray sobre as pessoas. Tosse, chiado, irritação nos olhos ou na pele durante a aplicação devem ser comunicados à tripulação. O tripulante que aplica o produto segue a **dose e o procedimento** aprovados e registra qualquer queixa (Veja M2V1 - VI e M3V7 - V).",
          "**Como prevenir e amenizar.** Antes de um voo internacional, confira com a empresa se haverá **spray na cabine**. Leve o **remédio de resgate** na bagagem de mão se tiver asma. Em áreas com mosquitos, a proteção pessoal continua valendo: repelente, roupas adequadas e **vacinas** indicadas para o destino (Veja M2V11 - VI). Para tripulantes, **treinamento** e registro das aplicações ajudam a medir a exposição ao longo da carreira.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v8-5-aerossol.jpg'), legenda: "Em alguns destinos, a cabine recebe inseticida em aerossol antes da decolagem." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Quem está a bordo em cada método",
              colunas: ["Método", "Quando", "Passageiros a bordo"],
              linhas: [
                ["Blocks away", "Portas fechadas, antes da decolagem", "Sim"],
                ["Pré-voo", "Antes do embarque", "Não"],
                ["Início da descida", "Complemento do pré-voo", "Sim"],
                ["Residual", "Em intervalos de até 8 semanas", "Não"],
              ],
            },
          },
          { paragrafo: 3, midia: 'metodos-desinsetizacao' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v8-5-residual.jpg'), legenda: "No método residual, as superfícies são tratadas com o avião vazio." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · desinsetização",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Passageiro", "Perguntar à empresa sobre as exigências do destino"],
                ["Pessoa com asma", "Remédio de resgate na bagagem de mão"],
                ["Quem tiver sintomas", "Avisar a tripulação e procurar avaliação"],
                ["Tripulante", "Seguir dose e procedimento e registrar queixas"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '8.6',
      titulo: "Água e alimentos",
      pergunta: "Como a água e a comida de bordo são controladas, o que acontece quando falham e por que os pilotos não devem comer a mesma refeição?",
      conteudo: {
        texto: [
          "A água do avião fica em **tanques**, abastecidos em aeroportos diferentes por caminhões e mangueiras. Cada elo pode contaminá-la. Nos Estados Unidos, a **Aircraft Drinking Water Rule** da EPA, de **2009**, trata o sistema de água do avião como um sistema público de água. No Brasil, a **RDC 1.038/2026 da Anvisa**, que substituirá a **RDC 2/2003** 150 dias depois de publicada, exige da empresa aérea a qualidade da água e a limpeza e desinfecção dos **reservatórios** e dos **veículos de abastecimento**.",
          "A regra americana liga **limpeza e coleta**: quanto menos o sistema é desinfetado, mais vezes a água é testada. Com desinfecção e lavagem **4 vezes por ano**, basta **1 coleta anual**; com **3 vezes**, 2 coletas; com **2 vezes**, 4 coletas; com **1 vez ou menos**, **12 coletas**. Cada coleta de rotina usa, em geral, **duas amostras de 100 mL**, uma do lavatório e outra da galley. Quando o fabricante indica a frequência, vale a indicação dele.",
          "O teste procura **coliformes totais**, indicadores de possível contaminação, e **Escherichia coli**, sinal de possível resíduo humano ou animal. Com coliforme positivo sem E. coli, a empresa tem até **72 horas** para desinfetar, ou restringir o acesso, ou faz novas amostras em até **24 horas**. Com **E. coli**, o acesso público deve ser restringido o quanto antes, em até **24 horas**. Avisos indicam que a água **não é potável**, e a empresa oferece alternativas, como água engarrafada e álcool em gel.",
          "No corpo, os germes da água e da comida atingem primeiro o **estômago e o intestino**: **diarreia, cólicas, náusea** e dor de cabeça. Bebês, crianças pequenas, alguns idosos e pessoas com **imunidade muito baixa** correm mais risco. No voo, perder líquido pesa mais, porque a cabine é seca e o acesso ao banheiro é limitado. Vômitos e diarreia intensos podem causar **desidratação** e tontura (Veja M2V10 - III e M2V11 - V).",
          "A cozinha de bordo prepara refeições em grande escala, e um erro alcança muita gente. Em **fevereiro de 1975**, num voo da Japan Air Lines que saiu de Anchorage rumo a Copenhague, **197 pessoas** adoeceram com presunto contaminado por **Staphylococcus aureus**. O alimento havia sido manipulado por um cozinheiro com **lesões na mão**. A toxina dessa bactéria pode resistir ao reaquecimento, por isso **higiene e temperatura** precisam funcionar antes de a refeição chegar ao avião.",
          "Em **fevereiro de 1992**, uma salada servida entre **Lima e Los Angeles** causou o maior surto de **cólera** já relatado em avião, mostrando que a comida de bordo também pode levar doenças entre continentes. Para a segurança do voo, a lição é outra: uma intoxicação alimentar pode **incapacitar os dois pilotos ao mesmo tempo** (Veja M3V5 - V). No caso de 1975, os pilotos não comeram o presunto. Hoje, muitas empresas determinam que eles recebam **refeições diferentes**.",
          "**Como prevenir e amenizar.** Respeite qualquer aviso de **água não potável** e, nesse caso, use água lacrada e álcool em gel. Lave ou higienize as mãos antes de comer. Pilotos devem comer **refeições diferentes** e avisar logo se surgirem náusea ou cólicas. Tripulante com diarreia, vômitos ou **lesão infectada nas mãos** não deve manipular alimentos. Reponha líquidos e procure atendimento se houver sangue nas fezes, febre alta ou sinais de desidratação.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v8-6-agua.jpg'), legenda: "O abastecimento de água passa por caminhão, mangueira e tanque: todos precisam estar limpos." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Limpar mais, coletar menos: a regra da EPA",
              colunas: ["Desinfecção e lavagem por ano", "Coletas de rotina por ano"],
              linhas: [
                ["4 vezes", "1"],
                ["3 vezes", "2"],
                ["2 vezes", "4"],
                ["1 vez ou menos", "12"],
              ],
            },
          },
          { paragrafo: 3, midia: 'agua-alimentos' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v8-6-cozinha.jpg'), legenda: "Na cozinha de bordo, higiene das mãos e controle da temperatura protegem centenas de refeições." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · água e alimentos",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Passageiro", "Respeitar avisos e higienizar as mãos antes de comer"],
                ["Pilotos", "Comer refeições diferentes e avisar sintomas cedo"],
                ["Comissários", "Não manipular alimentos com diarreia, vômitos ou lesão infectada"],
                ["Empresa aérea", "Limpar reservatórios, testar a água e auditar fornecedores"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "O que acontece", "Proteção e prevenção"],
              linhas: [
                ["Sangue e oxigênio", "O monóxido ocupa a hemoglobina e reduz a entrega de oxigênio", "Detector, inspeção do escapamento e oxigênio (Veja M2V1 - II)"],
                ["Cérebro e nervos", "Dor de cabeça, julgamento prejudicado e reação mais lenta", "Máscara na suspeita e afastamento da exposição (Veja M2V6 - I)"],
                ["Coração", "Falta de oxigênio pode provocar infarto", "Tratar o monóxido como emergência (Veja M2V2 - III)"],
                ["Pulmões e vias aéreas", "Fumaça, ozônio e aerossóis irritam; combustível aspirado inflama", "Conversores, máscara e remédio de resgate (Veja M2V1 - VI)"],
                ["Olhos e pele", "Irritação por ozônio, fluidos e combustível", "Óculos, luvas e lavagem imediata (Veja M3V7 - V)"],
                ["Ouvidos", "Combustível e ruído juntos podem piorar o dano", "Protetor auricular e audiometria (Veja M1V6 - III)"],
                ["Estômago e intestino", "Germes causam diarreia, vômitos e desidratação", "Água controlada, higiene e refeições diferentes (Veja M2V10 - III)"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '8.1',
      pergunta: "Por que o monóxido de carbono é tão perigoso na cabine de um avião leve?",
      opcoes: [
        "Tem cheiro forte que distrai o piloto",
        "Não tem cor, cheiro nem gosto e prejudica o julgamento",
        "Só afeta quem fuma",
        "Congela as vias aéreas",
      ],
      correta: 1,
      explicacao: "O gás passa despercebido e os primeiros sinais lembram cansaço ou enjoo; por isso o detector com alarme é tão útil.",
    },
    {
      topico: '8.1',
      pergunta: "O que o oxímetro de pulso comum pode mostrar numa intoxicação por monóxido?",
      opcoes: [
        "Um número falsamente normal",
        "Sempre zero",
        "A dosagem exata de COHb",
        "O nível de cianeto",
      ],
      correta: 0,
      explicacao: "O aparelho comum não diferencia a COHb da hemoglobina com oxigênio; a confirmação exige dosagem ou CO-oximetria.",
    },
    {
      topico: '8.2',
      pergunta: "No voo Air Canada 797, quantos dos 41 passageiros não conseguiram sair do avião?",
      opcoes: [
        "5",
        "12",
        "23",
        "41",
      ],
      correta: 2,
      explicacao: "Eles sucumbiram à fumaça e aos gases tóxicos, e o caso impulsionou mudanças na proteção respiratória e na segurança contra fogo.",
    },
    {
      topico: '8.2',
      pergunta: "Ao suspeitar de vapores no ar da cabine de comando, qual deve ser a primeira proteção dos pilotos?",
      opcoes: [
        "Esperar o cheiro ficar forte",
        "Abrir uma janela em cruzeiro",
        "Colocar a máscara de oxigênio",
        "Tomar analgésico",
      ],
      correta: 2,
      explicacao: "Os vapores podem prejudicar a tripulação mesmo sem sinal visível, e o olfato não é um medidor confiável.",
    },
    {
      topico: '8.3',
      pergunta: "Qual é o limite de ozônio do 14 CFR 25.832 a qualquer momento acima do FL 320?",
      opcoes: [
        "0,05 ppm",
        "0,1 ppm",
        "0,25 ppm",
        "1 ppm",
      ],
      correta: 2,
      explicacao: "Acima do FL 270, a norma também limita a média a 0,1 ppm em qualquer intervalo de 3 horas.",
    },
    {
      topico: '8.3',
      pergunta: "Qual equipamento é a principal barreira contra o ozônio no ar da cabine?",
      opcoes: [
        "Conversor catalítico",
        "Máscara dos passageiros",
        "Filtro de água",
        "Detector de monóxido",
      ],
      correta: 0,
      explicacao: "O conversor decompõe o ozônio no caminho do ar, mas perde eficiência com o tempo e precisa ser acompanhado.",
    },
    {
      topico: '8.4',
      pergunta: "Se alguém engolir querosene de aviação, o que não se deve fazer?",
      opcoes: [
        "Procurar atendimento",
        "Provocar vômito",
        "Informar o produto ao médico",
        "Levar a ficha de segurança",
      ],
      correta: 1,
      explicacao: "O vômito aumenta o risco de o líquido ir para o pulmão, onde a aspiração pode causar pneumonite.",
    },
    {
      topico: '8.4',
      pergunta: "Por que uma luva encharcada de combustível deve ser trocada logo?",
      opcoes: [
        "Porque prolonga o contato e aumenta a absorção",
        "Porque melhora a aderência",
        "Porque reduz o ruído",
        "Porque resfria o motor",
      ],
      correta: 0,
      explicacao: "Quanto maior o tempo de contato, maior o dano à pele e a absorção do produto.",
    },
    {
      topico: '8.5',
      pergunta: "Qual é o objetivo principal da desinsetização de aeronaves?",
      opcoes: [
        "Perfumar a cabine",
        "Evitar o transporte de vetores de doenças",
        "Reduzir o ozônio",
        "Purificar a água",
      ],
      correta: 1,
      explicacao: "Mosquitos vivos já foram encontrados em aviões vindos de áreas com malária e arboviroses.",
    },
    {
      topico: '8.5',
      pergunta: "Em qual método a cabine é tratada sem passageiros, com efeito por semanas?",
      opcoes: [
        "Blocks away",
        "Início da descida",
        "Residual",
        "Spray em voo de cruzeiro",
      ],
      correta: 2,
      explicacao: "O método residual usa permetrina nas superfícies internas, em intervalos de até 8 semanas.",
    },
    {
      topico: '8.6',
      pergunta: "Pela regra da EPA, em quanto tempo o acesso à água deve ser restringido após resultado positivo para E. coli?",
      opcoes: [
        "Até 24 horas",
        "Até 7 dias",
        "Até 30 dias",
        "Só na próxima manutenção",
      ],
      correta: 0,
      explicacao: "A restrição deve vir o quanto antes e permanecer até a desinfecção e novas amostras negativas.",
    },
    {
      topico: '8.6',
      pergunta: "Por que os pilotos costumam receber refeições diferentes?",
      opcoes: [
        "Por preferência de sabor",
        "Para evitar que uma intoxicação atinja os dois",
        "Para reduzir o peso",
        "Para economizar água",
      ],
      correta: 1,
      explicacao: "Se os dois adoecerem juntos, não sobra quem conduza o voo com segurança.",
    },
  ],
};
