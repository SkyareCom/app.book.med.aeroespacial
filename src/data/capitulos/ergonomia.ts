// Missão 3 · Voo 6 — Ergonomia e cabine de comando. Ramo editorial voo/M3V6; fotos e vídeo entram depois da produção.
// Os 5 itens previstos (antropometria, integração humano-sistema, cabine de comando, equipamentos de voo e
// comunicação) viraram 5 tópicos. Mesmo padrão do M3V1 ao M3V5 e do M3V15.
// REGISTRO DE REVISÃO · 17/11/2026. Fontes primárias conferidas:
// 14 CFR 25.777(c): controles com movimento completo para tripulantes de 5 ft 2 in a 6 ft 3 in, sentados e com cintos.
// Airbus, Safety First, "Are you properly seated?": indicador de referência do olho (esferas vermelha e branca);
//   sentado baixo, o painel superior esconde o segmento visual; alto, esconde a parte de cima do PFD e do ND; pedais
//   com curso completo; braço apoiado e punho reto; em voos longos o piloto escorrega no assento.
// US Air Force, conforme Defense News (15/05/2017): restrição do F-35A a pilotos abaixo de 136 lb desde 2015; risco de
//   lesão de cabeça e pescoço; seletor de peso, painel de apoio da cabeça e capacete de 5,1 para 4,6 lb; faixa de 102 a
//   245 lb liberada em 15/05/2017.
// Integração humano-sistema: sete domínios do DoD (DoDI 5000.02, 2008): engenharia de fatores humanos, efetivo,
//   pessoal, treinamento, segurança e saúde ocupacional, habitabilidade e sobrevivência.
// 14 CFR 25.1302 (FAA, 2013; CS 25.1302 da EASA desde 2007): controles e informação claros e sem ambiguidade,
//   acessíveis conforme a urgência, comportamento previsível que permite intervir, meios de gerenciar erros.
// 14 CFR 25.1322: alerta (warning) vermelho, consciência e resposta imediatas; cautela (caution) âmbar ou amarelo,
//   consciência imediata e resposta depois; aviso (advisory) de qualquer cor exceto vermelho e verde.
// 14 CFR 121.542 (1981), conforme SKYbrary: cabine estéril no táxi, decolagem, pouso e abaixo de 10.000 ft, exceto em
//   cruzeiro; sem conversa não essencial, refeições ou leitura alheia ao voo.
// 14 CFR 25.1447(c)(2): máscara de colocação rápida com uma mão, em até 5 segundos, sem tirar os óculos, permitindo
//   comunicação (aviões certificados acima de 25.000 ft).
// FAA, Pilot Safety Brochure "Sunglasses for Pilots": bloquear 70% a 85% da luz visível; cinza neutro; polarizadas e
//   fotocromáticas não recomendadas; 99% a 100% de UV; armação que não atrapalhe fone nem equipamento de respiração.
// Tenerife, 27/03/1977 (SKYbrary): 583 mortos; KLM 248, Pan Am 335 de 396; "we are now at take-off"; "OK" da torre;
//   transmissão encoberta; neblina de cerca de 300 m; recomendações de linguagem padrão e de evitar "take-off" fora da
//   autorização.
// Avianca 52, 25/01/1990 (NTSB AAR-91/04, conforme Code7700): 73 de 158 mortos; "priority", sem "emergency";
//   falta de terminologia padrão para combustível mínimo e de emergência.
// ICAO Anexo 1, 1.2.9 e Apêndice 1: desde 5/03/2008, pilotos, controladores e operadores de estação; nível 4 mínimo;
//   seis habilidades; reavaliação recomendada a cada 3 anos (nível 4) e 6 anos (nível 5); nível 6 sem reavaliação.
// Dicas sem número próprio (regular o assento antes de cada voo, conferir compatibilidade dos equipamentos, ler de
//   volta as autorizações) são aplicação das fontes acima e dos voos citados.
import type { Capitulo } from '../tipos';

export const ergonomia: Capitulo = {
  numero: 6,
  titulo: 'Ergonomia e cabine de comando',
  tempoLeituraMin: 14,
  topicos: [
    {
      id: '6.1',
      titulo: "Antropometria: o corpo que cabe na cabine",
      pergunta: "Para que tamanhos de corpo a cabine é desenhada, por que a altura do assento muda o que o piloto vê e o que acontece com quem fica fora da faixa?",
      conteudo: {
        texto: [
          "**Antropometria** é a medida do corpo: altura, alcance dos braços, comprimento das pernas, altura dos olhos quando sentado. A cabine é desenhada para uma **faixa** de corpos, e não para uma pessoa média. Nos aviões de transporte certificados nos Estados Unidos, cada comando precisa ter **movimento completo** para tripulantes de cerca de **1,57 m** a **1,91 m** (5 pés e 2 polegadas a 6 pés e 3 polegadas), sentados e com os cintos afivelados.",
          "A peça-chave é o **ponto de referência do olho**. Cada piloto regula o assento até que os olhos fiquem na posição de projeto; num modelo de avião, isso se confere alinhando duas pequenas esferas, uma **vermelha** e uma **branca**, no centro do para-brisa. Sentado **baixo demais**, o painel superior esconde parte da pista na aproximação; **alto demais**, esconde a parte de cima das telas. Os **pedais** são regulados para o curso completo e a frenagem total.",
          "A animação mostra o efeito: com o olho mais baixo, a borda do painel corta a visão para baixo e o **segmento visual**, o trecho de pista e de luzes que se vê à frente, fica mais curto. Com neblina, isso pode ser a diferença entre ver as luzes e ter de arremeter. Em voos longos, o cansaço faz o piloto **escorregar** no assento; por isso a posição se confere de novo antes da aproximação (Veja M2V8 - V).",
          "O corpo muda, e a cabine nem sempre acompanha. A **gestação** altera o alcance e o espaço do cinto, a **obesidade** pode impedir o curso completo do manche e dos pedais, a **dor nas costas** piora em assento mal regulado e uma **amputação** ou limitação de articulação pede avaliação prática no avião ou no simulador (Veja M2V13 - II, M2V9 - V, M2V12 - II e M2V12 - IV). A pergunta do exame é sempre a mesma: o corpo alcança e move cada comando, inclusive numa emergência?",
          "Na aviação militar, a faixa também vale para o **assento ejetável**. Em **2015**, a Força Aérea dos Estados Unidos impediu pilotos com menos de **62 kg** de voar o F-35A, porque os testes mostraram risco inaceitável de lesão de **cabeça e pescoço** na ejeção. Em **2017**, com um seletor de peso no assento, um apoio para a cabeça e um capacete mais leve, de **2,3** para **2,1 kg**, a faixa passou a ir de **46** a **111 kg** (Veja M1V8 - III e M1V8 - IV).",
          "Para o **passageiro**, a antropometria aparece no assento, no cinto e no espaço para as pernas, que pesam no conforto e na trombose em voos longos. Para o **tripulante**, regular o assento é parte do preparo do voo, como o checklist. Para o **médico examinador**, altura, peso e mobilidade não são números soltos: importam quando o corpo deixa de alcançar ou de mover um comando.",
          "**Como prevenir e amenizar.** Regule o assento pela referência do olho antes de cada voo, ajuste os pedais para o curso completo e confira de novo antes da aproximação. Apoie o braço com o punho reto, o que reduz comandos sem querer na turbulência. Quando o corpo mudar, por gestação, cirurgia, ganho de peso ou lesão, teste o alcance de todos os comandos e procure o médico examinador antes de voltar a voar.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v6-1-assento.jpg'), legenda: "Cada piloto regula o assento até os olhos ficarem na posição de projeto da cabine." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Assento fora da posição",
              colunas: ["Posição", "O que acontece", "Risco no voo"],
              linhas: [
                ["Baixo demais", "O painel superior esconde parte da pista e da área à frente", "Segmento visual curto na neblina e percepção errada da trajetória"],
                ["Alto demais", "O painel esconde a parte de cima das telas", "Pedais sem curso completo e trajetória mal percebida"],
                ["Longe dos pedais", "Leme e freio sem deflexão total", "Falha de motor ou vento cruzado mal controlados"],
                ["Escorregado no voo longo", "O olho desce sem que o piloto perceba", "Aproximação com a visão reduzida"],
              ],
            },
          },
          { paragrafo: 3, midia: 'animacao-segmento-visual' },
          { paragrafo: 4, midia: 'ajuste-cabine' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Quando o corpo muda",
              colunas: ["Situação", "O que pode falhar na cabine", "O que avaliar"],
              linhas: [
                ["Gestação", "Cinto e alcance do manche", "Espaço, conforto e fase da gestação (Veja M2V13 - II)"],
                ["Obesidade", "Curso do manche e dos pedais", "Teste de alcance e saída de emergência (Veja M2V9 - V)"],
                ["Dor nas costas", "Postura ruim e distração", "Ajuste do assento e apoio lombar (Veja M2V12 - II)"],
                ["Amputação ou limitação", "Alcance e força num comando", "Teste prático no avião ou no simulador (Veja M2V12 - IV)"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v6-1-pedais.jpg'), legenda: "Pedais regulados para o curso completo e a frenagem total." } },
          { paragrafo: 6, video: { fonte: require('@/assets/videos/m3v6-voo.mp4'), legenda: "Antes do voo, o piloto regula a altura do assento e os pedais e só então coloca o fone." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · antropometria",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Piloto", "Regular assento e pedais antes de cada voo e conferir antes da aproximação"],
                ["Tripulante com corpo em mudança", "Testar o alcance de todos os comandos e procurar o examinador"],
                ["Médico", "Perguntar se o corpo alcança e move cada comando, inclusive na emergência"],
                ["Passageiro", "Ajustar o cinto baixo e firme e mover as pernas em voo longo"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '6.2',
      titulo: "Integração humano-sistema",
      pergunta: "O que significa desenhar um avião em volta da pessoa, que regras a certificação impõe e como o projeto lida com os limites do corpo?",
      conteudo: {
        texto: [
          "A **integração humano-sistema** dá à pessoa o mesmo peso que ao *hardware* e ao *software* durante toda a vida de um sistema. Nas Forças Armadas dos Estados Unidos, ela reúne **sete domínios**: engenharia de fatores humanos, efetivo, pessoal, treinamento, segurança e saúde ocupacional, habitabilidade e sobrevivência. A ideia é simples: um avião que só funciona com o piloto ideal, descansado e sem erro, não funciona.",
          "Na aviação civil, a regra virou requisito de certificação: na Europa desde **2007** e nos Estados Unidos desde **2013**, os equipamentos da cabine de aviões de transporte precisam ter comandos e informações **claros e sem ambiguidade**, **acessíveis** de acordo com a urgência da tarefa, comportamento **previsível** que permita ao piloto **intervir**, e meios para a tripulação **gerenciar os próprios erros**. O fabricante precisa demonstrar isso com pilotos reais, no simulador e em voo.",
          "Projetar em volta da pessoa é projetar para os **limites do corpo**. O alerta em cor precisa vir junto com texto, forma ou som, porque nem todo olho distingue o vermelho do âmbar da mesma forma (Veja M2V4 - V). As letras precisam ser lidas por olhos de **50 anos**, que focam pior de perto (Veja M2V15 - II). O alerta sonoro precisa atravessar o ruído e a perda auditiva (Veja M2V3 - IV). E tudo precisa funcionar com um piloto **cansado**, de madrugada.",
          "O erro é tratado como algo a esperar, e não a proibir. **Interruptores protegidos** por tampas evitam o toque acidental, ações críticas pedem **confirmação**, e a tela mostra o que o sistema vai fazer antes de fazer. A **confusão de modo**, quando o piloto acha que a automação está fazendo uma coisa e ela faz outra, é o exemplo clássico de falha de integração (Veja M3V4 - IV).",
          "A **carga de trabalho** é a medida que une tudo. Carga baixa demais leva ao tédio e à desatenção; alta demais, à sobrecarga e ao erro. O bom projeto mantém a carga **administrável** também na emergência, quando um motor falha, um alarme toca e o controle pede uma mudança ao mesmo tempo. Na aviação militar, o mesmo raciocínio pesa sobre o **capacete com visor**, que mostra informação diante dos olhos, mas acrescenta peso ao pescoço (Veja M1V8 - IV).",
          "Para o **passageiro**, a integração humano-sistema está nos cartões de segurança, nas saídas iluminadas e nos cintos que abrem com um gesto. Para o **tripulante**, ela aparece quando um botão está onde a mão espera e quando a tela avisa antes de surpreender; quando não está, o relato é o caminho para mudar o projeto (Veja M3V5 - II). Para o **médico examinador**, ela explica por que visão de cores, visão de perto e audição continuam sendo testadas.",
          "**Como prevenir e amenizar.** Conheça a lógica do seu avião: o que cada modo faz, como cada alerta soa e onde fica cada comando, para não depender da memória do momento. Relate telas confusas, botões mal posicionados e alertas que enganam. Use os óculos de perto quando precisar e trate a perda auditiva cedo. Na empresa, envolva pilotos reais na escolha e na avaliação de equipamentos novos.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v6-2-projeto.jpg'), legenda: "A integração humano-sistema testa o projeto com pessoas reais antes de o avião voar." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Os sete domínios da integração humano-sistema",
              colunas: ["Domínio", "Pergunta que responde"],
              linhas: [
                ["Engenharia de fatores humanos", "A pessoa consegue ver, alcançar e entender?"],
                ["Efetivo", "Quantas pessoas o sistema exige?"],
                ["Pessoal", "Que capacidades essas pessoas precisam ter?"],
                ["Treinamento", "Como elas aprendem e mantêm a habilidade?"],
                ["Segurança e saúde ocupacional", "O sistema fere quem opera ou mantém?"],
                ["Habitabilidade", "Dá para trabalhar e descansar nele por horas?"],
                ["Sobrevivência", "A pessoa sobrevive se algo der errado?"],
              ],
            },
          },
          { paragrafo: 3, midia: 'principios-cabine' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Limites do corpo e soluções de projeto",
              colunas: ["Limite", "Solução de projeto", "Onde estudar"],
              linhas: [
                ["Visão de cores", "Alerta com cor, texto, forma e som", "M2V4 - V"],
                ["Visão de perto depois dos 40", "Letras grandes e contraste alto", "M2V15 - II"],
                ["Audição", "Alerta sonoro distinto do ruído e repetido na tela", "M2V3 - IV"],
                ["Fadiga", "Confirmação de ações críticas e tarefas simples", "M2V8 - V"],
                ["Pescoço e coluna", "Capacetes mais leves e assentos ajustáveis", "M1V8 - IV e M2V12 - II"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v6-2-avaliacao.jpg'), legenda: "Pilotos avaliam no simulador se a tela é clara mesmo sob carga de trabalho alta." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · integração humano-sistema",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Piloto", "Conhecer modos, alertas e comandos e relatar o que confunde"],
                ["Empresa", "Envolver pilotos reais na escolha de equipamentos"],
                ["Médico", "Testar visão de cores, de perto e audição e orientar correção"],
                ["Passageiro", "Ler o cartão de segurança e localizar as saídas"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '6.3',
      titulo: "Cabine de comando: alertas, silêncio e ambiente",
      pergunta: "Como a cabine avisa o piloto do que importa, por que há fases de voo em que só se fala do voo e o que o ambiente da cabine faz com o corpo?",
      conteudo: {
        texto: [
          "A cabine de comando trocou dezenas de relógios por poucas **telas**, e a tripulação técnica dos aviões de transporte passou a ser de **dois pilotos**. Com isso, cada informação disputa espaço e atenção. Muitas cabines seguem a filosofia da **cabine escura**: quando tudo está normal, os botões ficam apagados, e uma luz acesa já é um sinal de que algo pede atenção. O olho procura a diferença, e não a regra.",
          "Os alertas têm **hierarquia**. O **alerta de perigo** (*warning*) é **vermelho** e exige consciência e resposta **imediatas**. A **cautela** (*caution*) é **âmbar** ou amarela: exige consciência imediata, mas a resposta pode vir depois. O **aviso** (*advisory*) pede só consciência e pode ter qualquer cor, menos vermelho e verde. O vermelho e o âmbar ficam reservados para alertas, para que o olho não se acostume a vê-los à toa.",
          "O alerta só funciona se for percebido e levado a sério. Alertas que tocam demais criam **acostumação**, e o piloto passa a ignorá-los; um alerta classificado abaixo do que pedia a situação pode ser subestimado, como apontou a investigação do acidente de Vinhedo (Veja M3V5 - IV). Com **fadiga**, hipóxia ou sobrecarga, o mesmo alerta demora mais a ser notado (Veja M2V1 - IV e M2V8 - V).",
          "Desde **1981**, as empresas aéreas dos Estados Unidos seguem a regra da **cabine estéril**: no táxi, na decolagem, no pouso e em todo voo abaixo de **10.000 pés**, exceto em cruzeiro, a tripulação não faz conversa que não seja do voo, não come e não lê o que não for necessário. A regra nasceu de acidentes em que a distração tirou a atenção da tripulação na fase crítica; na Europa, há regra parecida para a decolagem, a subida inicial, a aproximação final e o pouso.",
          "A cabine também é um **ambiente de trabalho** com ruído, ar seco, luz do sol direta, frio ou calor e horas sentado. O ruído cansa e exige fone com volume controlado; o sol forte pede óculos certos; a luz da cabine à noite precisa ser baixa o bastante para preservar a visão noturna; a hidratação e o movimento das pernas pesam nos voos longos (Veja M1V6 - III, M2V4 - VI, M2V4 - III e M1V1 - IV).",
          "Para o **passageiro**, a cabine estéril explica por que os comissários não chamam os pilotos durante a decolagem e o pouso, salvo por segurança. Para o **tripulante**, ela é uma ferramenta: proteger a atenção nas fases críticas é tão importante quanto seguir o checklist. Para o **médico examinador**, entender a cabine ajuda a julgar se um problema de visão, audição ou atenção pesa no voo real.",
          "**Como prevenir e amenizar.** Respeite a cabine estéril e combine no briefing o que pode interromper as fases críticas. Trate cada alerta vermelho como imediato, mesmo que já tenha tocado antes, e relate os alertas que tocam à toa. Regule a luz da cabine para a noite, beba água e mexa as pernas nos voos longos. Os comissários chamam a cabine nas fases críticas só por segurança, com frases curtas e claras.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v6-3-cabine.jpg'), legenda: "Na cabine escura, uma luz acesa já é um sinal: o olho procura a diferença." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Hierarquia dos alertas · aviões de transporte",
              colunas: ["Nível", "Cor", "O que exige"],
              linhas: [
                ["Alerta de perigo (warning)", "Vermelho", "Consciência e resposta imediatas"],
                ["Cautela (caution)", "Âmbar ou amarelo", "Consciência imediata; resposta depois"],
                ["Aviso (advisory)", "Qualquer cor, menos vermelho e verde", "Consciência; resposta se necessária"],
              ],
            },
          },
          { paragrafo: 3, midia: 'alertas-cabine' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Cabine estéril",
              colunas: ["Item", "Regra"],
              linhas: [
                ["Quando vale", "Táxi, decolagem, pouso e todo voo abaixo de 10.000 pés, exceto cruzeiro"],
                ["O que não se faz", "Conversa alheia ao voo, refeições e leitura desnecessária"],
                ["Quem pode interromper", "Comissários e controle, por segurança"],
                ["Desde quando", "1981, nas empresas aéreas dos Estados Unidos"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v6-3-alerta.jpg'), legenda: "Diante de um alerta âmbar, o piloto aponta, lê em voz alta e abre o procedimento." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · cabine",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Piloto", "Respeitar a cabine estéril e tratar cada alerta vermelho como imediato"],
                ["Comissário", "Chamar a cabine nas fases críticas só por segurança"],
                ["Empresa", "Investigar alertas que tocam à toa"],
                ["Passageiro", "Aceitar que a cabine não atende chamados nas fases críticas"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '6.4',
      titulo: "Equipamentos de voo",
      pergunta: "O que o piloto veste e usa no voo, que requisitos cada equipamento precisa cumprir e por que eles precisam funcionar juntos?",
      conteudo: {
        texto: [
          "O equipamento de voo é uma extensão do corpo: devolve o oxigênio que falta, protege o ouvido, filtra a luz, segura a cabeça e mantém o sangue no cérebro. Cada peça resolve um limite do corpo, mas também cria um novo, de peso, de encaixe ou de visão. Por isso o equipamento é escolhido como **conjunto**: os óculos não podem atrapalhar o fone nem a máscara, e a máscara precisa ser vestida **sem tirar os óculos**.",
          "A peça mais urgente é a **máscara de oxigênio** de colocação rápida. Nos aviões certificados para voar acima de **25.000 pés**, cada piloto precisa ter uma máscara ao lado do assento que possa ser posta no rosto **com uma mão**, em até **5 segundos**, sem tirar os óculos e permitindo falar pelo rádio. Esses segundos contam porque, depois de uma descompressão, o tempo de consciência útil pode ser curto (Veja M1V2 - III e M2V1 - III).",
          "O **fone** faz dois trabalhos: leva a voz do rádio e protege o ouvido do ruído. O risco é aumentar o volume até que a soma de ruído e rádio passe do limite seguro; fones com **cancelamento ativo de ruído** permitem ouvir bem com volume mais baixo (Veja M1V6 - III). Um fone que aperta demais vira dor de cabeça em voo longo, e um que não veda deixa o ruído entrar.",
          "Os **óculos de sol** também seguem regra. A FAA recomenda lentes que bloqueiem de **70% a 85%** da luz visível, em **cinza neutro**, que distorce menos as cores, e com proteção de **99% a 100%** contra ultravioleta. Lentes **polarizadas** não são recomendadas, porque podem apagar telas com filtro e realçar as estrias do para-brisa; as **fotocromáticas** podem não escurecer dentro da cabine e ficar escuras demais à noite (Veja M2V4 - VI).",
          "Na aviação militar, o conjunto é maior: **capacete** com visor, **máscara**, **traje anti-G**, colete salva-vidas e equipamento de sobrevivência. Cada grama no capacete pesa no pescoço sob forças G e na ejeção, e foi por isso que o capacete do F-35 perdeu cerca de **200 gramas** para liberar pilotos mais leves (Veja M1V8 - IV, M1V7 - III e M1V4 - III). O traje anti-G só protege bem com a **manobra** certa e o ajuste certo.",
          "Para o **passageiro**, o equipamento que importa é o que cai do teto e o que fica sob o assento: a máscara e o colete, que só funcionam se forem vestidos do jeito que o comissário mostrou. Para o **tripulante**, conferir a máscara, o fone e os óculos faz parte da preparação do voo. Para o **médico examinador**, óculos de grau, lentes de contato e aparelhos auditivos precisam ser compatíveis com a máscara e o fone.",
          "**Como prevenir e amenizar.** Antes do voo, confira a máscara de oxigênio, teste o fone e deixe os óculos de reserva à mão. Escolha óculos de sol cinza, não polarizados, com armação fina que não levante a vedação do fone nem da máscara. Mantenha o volume do rádio baixo e prefira fone com cancelamento de ruído. Na aviação militar, ajuste capacete e traje antes de cada missão e treine com o conjunto completo.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v6-4-equipamentos.jpg'), legenda: "Máscara, fone e óculos são escolhidos como conjunto: um não pode atrapalhar o outro." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Equipamentos e requisitos",
              colunas: ["Equipamento", "Requisito", "Limite do corpo que resolve"],
              linhas: [
                ["Máscara de colocação rápida", "Uma mão, até 5 segundos, sem tirar os óculos e com comunicação", "Hipóxia depois da descompressão (Veja M2V1 - III)"],
                ["Fone", "Voz clara com volume baixo", "Perda auditiva pelo ruído (Veja M1V6 - III)"],
                ["Óculos de sol", "Cinza neutro, 70% a 85% de bloqueio, não polarizados", "Ofuscamento e radiação ultravioleta (Veja M2V4 - VI)"],
                ["Capacete", "Proteção com o menor peso possível", "Lesão de cabeça e pescoço (Veja M1V8 - IV)"],
                ["Traje anti-G", "Ajuste certo e manobra treinada", "Perda de consciência por G (Veja M1V7 - III)"],
              ],
            },
          },
          { paragrafo: 3, midia: 'compatibilidade-equipamentos' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Óculos de sol para pilotos · FAA",
              colunas: ["Característica", "Recomendação", "Por quê"],
              linhas: [
                ["Luz bloqueada", "70% a 85%", "Mais escuro atrapalha a leitura dos instrumentos"],
                ["Cor", "Cinza neutro", "Distorce menos as cores"],
                ["Polarização", "Não recomendada", "Apaga telas com filtro e realça estrias do para-brisa"],
                ["Fotocromática", "Não recomendada", "Pode não escurecer na cabine e ficar escura à noite"],
                ["Ultravioleta", "99% a 100% de proteção", "Mais radiação em altitude"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v6-4-capacete.jpg'), legenda: "Na aviação militar, cada grama do capacete pesa no pescoço sob forças G." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · equipamentos",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Piloto", "Conferir máscara e fone e manter óculos de reserva à mão"],
                ["Piloto militar", "Ajustar capacete e traje e treinar com o conjunto completo"],
                ["Médico", "Verificar se óculos, lentes e aparelhos auditivos combinam com máscara e fone"],
                ["Passageiro", "Vestir máscara e colete como o comissário mostrou"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '6.5',
      titulo: "Comunicação: palavras que salvam",
      pergunta: "Por que uma frase fora do padrão pode derrubar um avião, que proficiência em idioma o piloto precisa ter e o que o corpo faz com a comunicação?",
      conteudo: {
        texto: [
          "O maior acidente da história da aviação começou numa frase. Em **27 de março de 1977**, em **Tenerife**, com neblina e visibilidade de cerca de **300 m**, o copiloto de um Boeing 747 disse ao controle \"estamos agora em decolagem\" depois de receber só a autorização de rota. A torre respondeu \"OK\" e um pedido de espera que foi encoberto por outra transmissão. O avião colidiu com outro 747 na pista: **583** pessoas morreram.",
          "A investigação recomendou linguagem **padrão**, **concisa** e **sem ambiguidade**, e reservar a palavra decolagem para a autorização de decolagem. Treze anos depois, em **25 de janeiro de 1990**, o **voo 52 da Avianca** ficou sem combustível perto de Nova York e **73** das **158** pessoas a bordo morreram. A tripulação pediu **prioridade** e disse que o combustível acabava, mas não usou a palavra **emergência**, e o controle não tratou o caso como tal.",
          "Desde **5 de março de 2008**, a OACI exige que pilotos, controladores e operadores de estação aeronáutica tenham **proficiência linguística** no idioma usado na radiotelefonia. O mínimo é o **nível 4**, operacional, numa escala de seis níveis que avalia **pronúncia**, **estrutura**, **vocabulário**, **fluência**, **compreensão** e **interação**. A reavaliação recomendada é a cada **3 anos** no nível 4 e a cada **6 anos** no nível 5; o nível 6, especialista, dispensa novas provas.",
          "O corpo entra em cada mensagem. A **perda auditiva** faz o piloto ouvir o que espera, e não o que foi dito (Veja M2V3 - IV). A **hipóxia** deixa a fala arrastada e a compreensão lenta, às vezes antes de qualquer outro sinal (Veja M2V1 - IV). A **fadiga** e o **estresse** estreitam a atenção e fazem pular a confirmação (Veja M2V8 - V). A máscara de oxigênio abafa a voz. Por isso existem a **leitura de volta** das autorizações e as palavras **Mayday** e **Pan-Pan**, que não deixam dúvida.",
          "A comunicação também falha **dentro** da cabine. Em Tenerife, o engenheiro de voo perguntou se o outro avião já tinha saído da pista, e a resposta enfática do comandante encerrou a dúvida. O CRM ensina a **falar com clareza** quando algo parece errado e a **ouvir** quem fala, e a cabine estéril protege essas falas nas fases críticas (Veja M3V4 - III e M3V6 - III). Entre cabine e comissários, frases curtas e combinadas evitam o mal-entendido.",
          "Para o **passageiro**, a comunicação padrão está nos anúncios e nos comandos de evacuação, curtos e repetidos para serem entendidos sob medo e ruído. Para o **tripulante**, a fraseologia e o idioma são habilidades que se perdem sem uso e precisam de treino. Para o **médico examinador**, a audiometria e a avaliação da fala fazem parte da segurança da comunicação, e a queixa de \"não entender o rádio\" merece investigação.",
          "**Como prevenir e amenizar.** Use a fraseologia padrão, leia de volta toda autorização e pergunte de novo quando houver dúvida. Numa emergência, diga **Mayday** ou **Pan-Pan**; não deixe que o controle precise adivinhar. Fale quando algo parecer errado e escute quem fala. Mantenha o idioma em dia, proteja a audição e procure o médico se o rádio ficar difícil de entender.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v6-5-radio.jpg'), legenda: "No rádio, uma palavra fora do padrão pode mudar o destino de um voo." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Acidentes em que a comunicação pesou",
              colunas: ["Acidente", "O que foi dito", "Lição"],
              linhas: [
                ["Tenerife, 1977 · 583 mortos", "\"Estamos agora em decolagem\" e \"OK\" da torre", "Decolagem só na autorização de decolagem; linguagem padrão"],
                ["Avianca 52, 1990 · 73 mortos", "\"Prioridade\" sem a palavra emergência", "Declarar emergência com palavras padrão"],
              ],
            },
          },
          { paragrafo: 3, midia: 'fraseologia' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Proficiência linguística · OACI",
              colunas: ["Nível", "O que significa", "Reavaliação recomendada"],
              linhas: [
                ["Nível 4 · operacional", "Mínimo para a radiotelefonia", "A cada 3 anos"],
                ["Nível 5 · avançado", "Comunicação segura em situações inesperadas", "A cada 6 anos"],
                ["Nível 6 · especialista", "Nativos e falantes muito proficientes", "Sem nova prova"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v6-5-controlador.jpg'), legenda: "A leitura de volta fecha o ciclo: o controle confirma que o piloto entendeu o que foi dito." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · comunicação",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Piloto", "Fraseologia padrão, leitura de volta e Mayday ou Pan-Pan na emergência"],
                ["Tripulação", "Falar quando algo parecer errado e ouvir quem fala"],
                ["Médico", "Investigar a queixa de não entender o rádio e testar a audição"],
                ["Passageiro", "Seguir os comandos curtos da tripulação na evacuação"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "O que acontece", "Proteção e prevenção"],
              linhas: [
                ["Coluna e pescoço", "Dor com assento mal regulado e carga do capacete sob G e na ejeção", "Ajuste do assento, capacetes leves e faixa de peso respeitada (Veja M2V12 e M1V8)"],
                ["Olhos e visão", "Segmento visual curto, alerta de cor mal percebido e ofuscamento", "Referência do olho, alerta redundante e óculos cinza não polarizados (Veja M2V4)"],
                ["Ouvidos e audição", "Ruído, alerta sonoro perdido e mensagem mal entendida", "Fone com volume baixo, audiometria e leitura de volta (Veja M2V3 e M1V6)"],
                ["Pulmões e oxigênio", "Hipóxia que arrasta a fala e atrasa a máscara", "Máscara em até 5 segundos e treino dos sintomas (Veja M2V1)"],
                ["Cérebro e atenção", "Sobrecarga, confusão de modo e acostumação aos alertas", "Cabine estéril, projeto claro e descanso (Veja M3V4 e M2V8)"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '6.1',
      pergunta: "Nos aviões de transporte certificados nos Estados Unidos, para que faixa de altura os comandos precisam ter movimento completo?",
      opcoes: [
        "1,40 m a 1,70 m",
        "Cerca de 1,57 m a 1,91 m",
        "Qualquer altura",
        "Só 1,75 m",
      ],
      correta: 1,
      explicacao: "A regra fala em 5 pés e 2 polegadas a 6 pés e 3 polegadas, com o tripulante sentado e com os cintos afivelados.",
    },
    {
      topico: '6.1',
      pergunta: "O que acontece quando o piloto senta baixo demais?",
      opcoes: [
        "Vê melhor a pista",
        "O painel superior esconde parte da pista e o segmento visual encurta",
        "Os pedais ficam mais leves",
        "Nada muda",
      ],
      correta: 1,
      explicacao: "Com neblina, menos pista à vista pode significar arremeter. Por isso a posição se confere de novo antes da aproximação.",
    },
    {
      topico: '6.2',
      pergunta: "Por que um alerta em cor precisa vir com texto, forma ou som?",
      opcoes: [
        "Por estética",
        "Porque nem todo olho distingue as cores da mesma forma",
        "Porque as telas não mostram cores",
        "Por economia de energia",
      ],
      correta: 1,
      explicacao: "Projetar em volta da pessoa é projetar para os limites do corpo: cores, visão de perto, audição e fadiga.",
    },
    {
      topico: '6.2',
      pergunta: "O que a certificação exige do comportamento dos equipamentos da cabine?",
      opcoes: [
        "Que seja previsível e permita ao piloto intervir",
        "Que seja totalmente automático",
        "Que esconda os modos do piloto",
        "Que nunca mostre alertas",
      ],
      correta: 0,
      explicacao: "Comandos e informações claros, acessíveis conforme a urgência, comportamento previsível e meios de gerenciar erros.",
    },
    {
      topico: '6.3',
      pergunta: "Que cor indica um alerta de perigo, que exige resposta imediata?",
      opcoes: [
        "Verde",
        "Azul",
        "Vermelho",
        "Branco",
      ],
      correta: 2,
      explicacao: "A cautela é âmbar ou amarela, e o aviso pode ter qualquer cor, menos vermelho e verde.",
    },
    {
      topico: '6.3',
      pergunta: "Abaixo de que altitude vale a cabine estéril nas empresas aéreas dos Estados Unidos, exceto em cruzeiro?",
      opcoes: [
        "1.000 pés",
        "10.000 pés",
        "25.000 pés",
        "Em qualquer altitude",
      ],
      correta: 1,
      explicacao: "Também vale no táxi, na decolagem e no pouso: nada de conversa alheia ao voo, refeições ou leitura desnecessária.",
    },
    {
      topico: '6.4',
      pergunta: "Em quanto tempo o piloto precisa conseguir pôr a máscara de colocação rápida?",
      opcoes: [
        "5 segundos, com uma mão",
        "30 segundos",
        "1 minuto",
        "5 minutos",
      ],
      correta: 0,
      explicacao: "E sem tirar os óculos, permitindo falar pelo rádio, nos aviões certificados para voar acima de 25.000 pés.",
    },
    {
      topico: '6.4',
      pergunta: "Por que a FAA não recomenda óculos de sol polarizados para pilotos?",
      opcoes: [
        "Porque são caros",
        "Porque podem apagar telas com filtro e realçar as estrias do para-brisa",
        "Porque não protegem do ultravioleta",
        "Porque são proibidos por lei",
      ],
      correta: 1,
      explicacao: "A recomendação é lente cinza neutra que bloqueie de 70% a 85% da luz, com proteção quase total contra ultravioleta.",
    },
    {
      topico: '6.5',
      pergunta: "Qual é o nível mínimo de proficiência linguística da OACI para a radiotelefonia?",
      opcoes: [
        "Nível 2",
        "Nível 3",
        "Nível 4",
        "Nível 6",
      ],
      correta: 2,
      explicacao: "Exigido desde 5 de março de 2008, com reavaliação recomendada a cada 3 anos nesse nível.",
    },
    {
      topico: '6.5',
      pergunta: "Que lição o voo 52 da Avianca deixou para a comunicação?",
      opcoes: [
        "Pedir prioridade basta",
        "Declarar emergência com palavras padrão, como Mayday",
        "Falar o mínimo com o controle",
        "Usar o idioma do próprio país",
      ],
      correta: 1,
      explicacao: "A tripulação pediu prioridade e disse que o combustível acabava, mas não disse emergência, e 73 pessoas morreram.",
    },
  ],
};
