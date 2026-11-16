// Missão 3 · Voo 3 — Seleção e treinamento. Ramo editorial voo/M3V3; fotos e vídeo entram depois da produção.
// Mesmo padrão do M3V1 e do M3V2: prosa progressiva, "Como prevenir e amenizar" com tabela, interativo por tópico,
// animação em src/components/midia/animacoes-aviacao.tsx abaixo do marcador do M3V1, tabela final e teste. Leitores:
// candidato a piloto, tripulante, médico examinador e passageiro.
// REGISTRO DE REVISÃO · 16/11/2026. Fontes primárias conferidas:
// ICAO, Anexo 1, 14ª ed. (2022), Emenda 179: 2.2.2 e 2.2.3 (aluno: voo solo com autorização do instrutor e CMA de
//   Classe 2); 2.3.1.1, 2.3.1.4 e 2.3.3.1.1 (PPL: 17 anos, Classe 2, 40 h ou 35 h em curso aprovado); 2.4.1.1, 2.4.1.4,
//   2.4.3.1.1 e 2.4.3.2.2 (CPL: 18 anos, Classe 1, 200 h ou 150 h; UPRT em voo recomendado); 2.5.1.1, 2.5.1.3, 2.5.3.1 e
//   2.5.3.2 (MPL: 18 anos, Classe 1, curso aprovado de no mínimo 240 h de voo real e simulado; UPRT em voo exigido);
//   2.6.1.1, 2.6.1.4 e 2.6.3.1.1 (ATPL: 21 anos, Classe 1, 1.500 h); 2.3.1.2 i), 2.4.1.2 l) e 2.6.1.2.1 m) (desempenho
//   humano com princípios de TEM); 2.1.5.2 a) (habilitação de tipo em avião inclui UPRT); 1.2.5.2 (validade do CMA:
//   60 meses PPL; 12 meses CPL, MPL e ATPL); 6.1.2 (declaração do histórico pessoal, familiar e hereditário).
// ANAC, RBAC 61, Emenda 16 (15/08/2024; vigente com a Emenda 15 desde 02/01/2025): 61.53(a)(1) (licença de aluno a partir
//   de 16 anos, com termo), 61.61(a) (voo solo com 18 anos), 61.17(a)(1) (CMA válido), 61.73(a) (PP: 18 anos e ensino
//   médio), 61.81(a)(1)(i) (PP avião: 40 h, ou 35 h em curso aprovado), 61.93(a) (PC: 18 anos), 61.101(a)(1)(i) (PC
//   avião: 200 h, ou 150 h em curso aprovado), 61.113(a) e 61.121(a) (MPL: 18 anos; 240 h de voo real e simulado em
//   curso aprovado), 61.133(a) (PLA: 21 anos) e 61.141(a)(1)(i) (PLA avião: 1.500 h, com 100 h noturnas e 75 h por
//   instrumentos, até 30 em simulador). Emenda 13 conferida para 61.53, 61.61 e 61.73.
// ANAC, RBAC 67, Emenda 05 (registro do M3V1 e do M2V7): 1ª classe com EEG, ECG e esteira no inicial, avaliação
//   psicológica no inicial, depois de acidente ou incidente grave e a cada 5 anos, parecer psiquiátrico no inicial;
//   laudo com personalidade, atenção, memória e raciocínio; validade de 12 meses e 6 meses a partir dos 60 no transporte
//   aéreo público.
// Regulamento (UE) 2018/1042 (aplicável desde 14/02/2021): CAT.GEN.MPA.175(b)-(c) (avaliação psicológica antes do voo de
//   linha: atributos psicológicos e adequação ao ambiente de trabalho; reduzir a interferência negativa na segurança),
//   CAT.GEN.MPA.215 (programa de apoio proativo e não punitivo; confidencialidade como pré-condição), CAT.GEN.MPA.170
//   (substâncias psicoativas). UK CAA, CAP 1938 (abril de 2020): capacidades cognitivas, traços de personalidade,
//   competências operacionais e profissionais e competências sociais; mínimo de uma entrevista estruturada; testes,
//   simulador e centros de avaliação a critério do operador; até 24 meses antes do voo de linha; encaminhamento por meio
//   do AME ou do médico da empresa ao psicólogo clínico ou psiquiatra quando houver preocupação de saúde mental.
// FAA, AC 61-107B Change 1: 14 CFR 61.31(g) (avião pressurizado acima de 25.000 ft: treino em solo com fisiologia e treino
//   em voo); câmara opcional e "highly recommended for all pilots"; curso de fisiologia de 1 dia do CAMI (descompressão
//   rápida de 8.000 para 18.000 ft, hipóxia a 25.000 ft e desorientação espacial); Tabela de TUC (18.000 ft 20–30 min e
//   10–15 min após descompressão rápida; 22.000 ft 10 e 5–6 min; 25.000 ft 3–5 e 1,5–2,5 min; 28.000 ft 2,5–3 e 1–1,5
//   min; 30.000 ft 1–2 min e 30 s–1 min; 35.000 ft 30 s–1 min e 15–30 s; 40.000 ft 15–20 s e "nominal"); redução de 50%
//   entre 25.000 e 43.000 ft; Tabela 2-5 de sinais e sintomas; sintomas individuais com ordem e intensidade constantes ao
//   longo dos anos ("assinatura"). Coerente com o M2V1 - III.
// Flight Safety Foundation, Human Factors & Aviation Medicine, jan.–fev. de 2000: dados da FAA com 15.412 alunos de câmara
//   (1965–1992), 4 casos suspeitos de doença descompressiva e 1.285 outras reações, nenhuma grave; sem exigência de câmara
//   para o piloto civil. Self DA et al. (FAA CAMI), Aviat Space Environ Med 2011;82(2): hipóxia normobárica (PROTE) com
//   padrão de sintomas muito semelhante ao da câmara e menos fatores de risco.
// AAIASB (Grécia), relatório 11/2006, Helios 522 (14/08/2005, Boeing 737-300, 121 mortos): pressurização em MAN, alarme
//   de altitude de cabine possivelmente confundido com o de configuração de decolagem, incapacitação por hipóxia, voo no
//   piloto automático até a pane seca (resumo da Aviation Safety Network).
// FAA, folheto Desorientação Espacial (português): 5% a 10% dos acidentes da aviação geral, 90% fatais; cadeira de
//   Bárány, Vertigon, GYRO e VRSDD; confiar nos instrumentos.
// ICAO, Doc 10011, 1ª ed. (2014): definição de atitude anormal (>25° nariz acima, >10° abaixo, >45° de inclinação,
//   velocidade inadequada); LOC-I principal causa de mortes na aviação comercial de 2001 a 2011; susto (startle);
//   ilusões e consciência do G; UPRT acadêmico, em FSTD e em avião; aplicável desde 13/11/2014 (MPL exigido, CPL
//   recomendado); UPRT não é acrobacia.
// AFRL, ficha da centrífuga humana da USAFSAM (Wright-Patterson): treino inicial e de reciclagem de aviadores de caça,
//   cerca de 1.200 alunos por ano, até 9 G; Gripen, 9 G por 15 s na Suécia (registro do M1V7).
// OPITO, BOSIET com CA-EBS: escape de helicóptero após amerissagem, sistema de respiração de emergência de ar comprimido,
//   sobrevivência no mar e primeiros socorros; reciclagem FOET em até 4 anos.
// FAA, Final Rule 78 FR 42324 (15/07/2013; cumprimento a partir de 01/08/2013): SIC em operações Part 121 com ATP e
//   habilitação de tipo; ATP com 23 anos e 1.500 h; R-ATP a partir de 21 anos (militares, graduação ou tecnólogo em
//   aviação e quem tem 1.500 h); ATP CTP com 30 h acadêmicas e 10 h de simulador; comandante com 1.000 h em operações de
//   empresa aérea; SIC pode manter CMA de 2ª classe; resposta ao acidente do Colgan 3407 (12/02/2009) e à Lei de 2010
//   (Pub. L. 111-216).
// ICAO, Doc 9995, 1ª ed. (2013): EBT; fim do "tick box"; cenários para desenvolver competências; dados de voo, observação
//   em operação normal e relatos de segurança; equilíbrio entre treino e checagem.
// Dicas sem número próprio (fazer o exame de 1ª classe antes do curso, dormir antes dos testes, adiar a câmara com
//   resfriado, intervalo do mergulho, localizar a saída) são aplicação das fontes acima e dos voos citados.
import type { Capitulo } from '../tipos';

export const selecao: Capitulo = {
  numero: 3,
  titulo: 'Seleção e treinamento',
  tempoLeituraMin: 13,
  topicos: [
    {
      id: '3.1',
      titulo: "Seleção: quem pode ser piloto",
      pergunta: "Que filtros o candidato atravessa antes de voar, e por que o corpo e a mente vêm antes da aptidão?",
      conteudo: {
        texto: [
          "Antes de aprender a voar, o candidato passa por três filtros: o **corpo**, a **mente** e a **aptidão**. O primeiro é o **certificado médico aeronáutico (CMA)**. Pela ICAO, o aluno só voa sozinho com **CMA de 2ª classe** válido, e as licenças comercial, de tripulação múltipla e de linha aérea pedem a **1ª classe** (Veja M3V1 - I). No Brasil, a licença de aluno pode sair aos **16 anos**, mas o **voo solo** só a partir dos **18**, sempre com CMA válido.",
          "O **exame médico inicial** é o mais completo da carreira, porque precisa achar o que pode tirar o piloto de ação décadas depois. Na 1ª classe da ANAC, ele inclui **eletroencefalograma**, **eletrocardiograma** e **teste de esforço**, exames dos olhos, dos ouvidos e da audição, exames de sangue e de urina, **avaliação psicológica** e parecer do **psiquiatra** (Veja M3V1 - II). Quem mira a aviação comercial deve fazer o exame de **1ª classe já no começo**: descobrir um impedimento depois de pagar o curso custa caro.",
          "A **mente** é o segundo filtro. No Brasil, a avaliação psicológica da 1ª classe acontece no exame inicial, depois de **acidente** ou **incidente grave** e a cada **5 anos**, e o laudo traz parecer sobre **personalidade**, **atenção**, **memória** e **raciocínio** (Veja M2V7 - V). Na Europa, desde **2021**, a empresa aérea também avalia o piloto **antes do início no voo de linha**: a regra pede que se identifiquem os atributos psicológicos e a adequação ao ambiente de trabalho, para reduzir a chance de interferência negativa na segurança.",
          "A autoridade britânica detalha o que essa avaliação olha: **capacidades cognitivas**, **traços de personalidade**, **competências operacionais e profissionais** e **competências sociais**, as mesmas do trabalho em equipe na cabine. O mínimo é uma **entrevista** bem estruturada; testes de aptidão e de personalidade e avaliação em **simulador** entram a critério da empresa, e a avaliação vale se feita até **24 meses** antes do voo de linha. Quando aparece um sinal de sofrimento mental, a empresa não decide sozinha: o caso segue, pelo médico examinador ou pelo médico da empresa, para o psicólogo clínico ou o psiquiatra.",
          "A seleção não é só uma porta que fecha. Quem tem uma condição que a **hipóxia**, o **fuso** e a **jornada longa** agravam vai enfrentá-los toda semana na carreira (Veja M2V1 e M2V8). E a mesma regra europeia que criou a avaliação criou o **programa de apoio**, que tem de ser **proativo**, **não punitivo** e **confidencial**, para ajudar o piloto a reconhecer, enfrentar e superar o problema antes que ele chegue à cabine (Veja M2V7 - VI).",
          "Para o **passageiro**, a seleção é invisível, mas está em cada voo: os dois pilotos passaram pelo exame inicial, renovam o CMA a cada **12 meses** ou menos e, na Europa, foram avaliados antes da linha. Para o **médico examinador**, o exame inicial é a hora da **declaração do histórico** pessoal, familiar e hereditário, que a ICAO exige do candidato; omitir uma informação nessa declaração pode custar o certificado (Veja M3V1 - IV).",
          "**Como prevenir e amenizar.** Antes de pagar o curso, faça o **exame de 1ª classe** se o objetivo é a aviação comercial, e leve laudos de doenças e cirurgias antigas. Declare tudo: o que se esconde no inicial vira problema maior depois. Durma bem antes dos testes, porque o sono curto derruba a atenção e a memória (Veja M2V8 - V). Quem já está na carreira usa o **programa de apoio** cedo, antes de a dificuldade virar afastamento.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 2,
            tabela: {
              titulo: "Seleção · os três filtros",
              colunas: ["Filtro", "O que avalia", "Por que importa no voo"],
              linhas: [
                ["Corpo: CMA", "Coração, cérebro, olhos, ouvidos, pulmões, metabolismo e remédios", "Uma falha súbita no comando pode virar acidente: o exame procura o risco antes que ele apareça"],
                ["Mente: avaliação psicológica", "Personalidade, atenção, memória, raciocínio e saúde mental", "Atenção e julgamento sustentam cada decisão, e a doença mental sem tratamento muda a decisão sem sinal externo"],
                ["Aptidão: testes e entrevista", "Capacidades cognitivas, personalidade e competências operacionais e sociais", "O trabalho a dois na cabine depende de comunicação e de decisão sob pressão"],
              ],
            },
          },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Avaliação psicológica · Brasil e Europa",
              colunas: ["Item", "ANAC (RBAC 67)", "Europa (EASA)"],
              linhas: [
                ["Quando", "Exame inicial, depois de acidente ou incidente grave e a cada 5 anos", "Antes do início no voo de linha, até 24 meses antes"],
                ["O que avalia", "Personalidade, atenção, memória e raciocínio", "Capacidades cognitivas, personalidade e competências operacionais e sociais"],
                ["Quem faz", "Psicólogo, com parecer do psiquiatra no exame inicial", "A empresa aérea; o mínimo é uma entrevista estruturada"],
              ],
            },
          },
          { paragrafo: 5, midia: 'caminho-selecao' },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · seleção",
              colunas: ["Momento", "Candidato", "Tripulante"],
              linhas: [
                ["Antes do curso", "Fazer o exame da classe que a carreira vai pedir: 1ª classe para a aviação comercial", "Manter o CMA em dia e saber a data de vencimento"],
                ["No exame", "Levar laudos de doenças, cirurgias e remédios e declarar o histórico pessoal e familiar", "Declarar toda mudança de saúde desde o último exame"],
                ["Antes dos testes", "Dormir bem: o sono curto derruba a atenção e a memória", "Chegar descansado à avaliação da empresa"],
                ["Diante de uma dificuldade", "Procurar a orientação do médico examinador antes de desistir", "Usar o programa de apoio cedo, antes de virar afastamento"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.2',
      titulo: "Treinamento fisiológico: hipóxia e altitude",
      pergunta: "Por que o piloto treina a falta de oxigênio no solo, e o que ele aprende sobre o próprio corpo?",
      conteudo: {
        texto: [
          "A hipóxia é traiçoeira porque o primeiro órgão a falhar é o que deveria percebê-la: o **cérebro**. O julgamento piora antes de qualquer alarme do corpo, e a pessoa muitas vezes se sente **bem**, até eufórica (Veja M2V1 - IV). Por isso o treinamento fisiológico não ensina só a teoria: ele deixa o piloto **sentir** a hipóxia com segurança, no solo, para reconhecê-la no voo.",
          "Cada pessoa tem a sua **assinatura da hipóxia**. A lista de sinais é longa: respiração rápida, lábios roxos, falta de coordenação, julgamento ruim, suor, tremor, formigamento, visão alterada, dor de cabeça, tontura e euforia. Mas a **ordem** e a **intensidade** dos próprios sintomas costumam se manter **as mesmas ao longo dos anos**. Quem conhece a própria assinatura reage ao primeiro sinal, sem esperar o desmaio.",
          "O treino clássico é a **câmara hipobárica**, que retira o ar e reproduz a pressão da altitude. No curso de um dia do instituto médico da FAA, a câmara mostra uma **descompressão rápida de 8.000 para 18.000 ft** e a **hipóxia a 25.000 ft**, além de treinar a desorientação espacial. Sem a máscara por alguns minutos, sob a vigilância de instrutores, cada aluno observa os próprios sintomas e o próprio desempenho.",
          "O tempo para agir é curto e encolhe com a altitude. O **tempo de consciência útil (TCU)** é de **20 a 30 minutos a 18.000 ft**, **3 a 5 minutos a 25.000 ft**, **1 a 2 minutos a 30.000 ft** e **15 a 20 segundos a 40.000 ft**; depois de uma **descompressão rápida** entre 25.000 e 43.000 ft, ele cai **pela metade** (Veja M2V1 - III). O treino ensina o gesto que ganha esse tempo: **máscara primeiro**, depois o resto (Veja M1V2 - III).",
          "A câmara tem riscos próprios: o ar preso no ouvido, nos seios da face e nos dentes se expande (Veja M2V3 - II), e a baixa pressão pode causar **doença descompressiva** (Veja M1V3 - II). Num levantamento da FAA com **15.412** alunos de câmara entre **1965 e 1992**, houve **4** casos suspeitos de doença descompressiva e **1.285** outras reações, nenhuma grave. Uma alternativa é respirar, **no solo**, uma mistura com **menos oxigênio**, até dentro de um simulador: num estudo do instituto da FAA, o padrão dos sintomas foi muito parecido com o da câmara, evitando parte dos riscos dela (Veja M2V1 - IX).",
          "A hipóxia já derrubou tripulações inteiras. Em **2005**, um Boeing 737 decolou com a pressurização em **manual**; o alarme de altitude de cabine pode ter sido confundido com outro aviso, os pilotos perderam a consciência por hipóxia, e o avião voou no piloto automático até acabar o combustível: morreram as **121** pessoas a bordo. Nos Estados Unidos, quem comanda avião pressurizado capaz de voar **acima de 25.000 ft** precisa de treino em solo que inclui **fisiologia** da altitude; a câmara não é obrigatória, mas a FAA a recomenda **fortemente** a todos os pilotos.",
          "**Como prevenir e amenizar.** Faça o treino de hipóxia e **anote a sua assinatura**: os primeiros sinais que você sentiu. Não entre na câmara com **resfriado**, **sinusite** ou dor de dente, e depois de **mergulhar** respeite o mesmo intervalo exigido antes de voar (Veja M1V3 - III). No voo, ao primeiro sinal da sua assinatura ou a qualquer alarme de altitude de cabine, **máscara primeiro** e, depois, o procedimento de descompressão, sem tentar entender o problema antes (Veja M1V3 - I).",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 2,
            tabela: {
              titulo: "Hipóxia · sinais e por que aparecem",
              colunas: ["Sinal", "O que acontece no corpo"],
              linhas: [
                ["Respiração rápida", "Os sensores das carótidas detectam o oxigênio baixo e aceleram a respiração"],
                ["Lábios e unhas roxos", "A hemoglobina sem oxigênio fica mais escura e azulada"],
                ["Julgamento ruim e euforia", "O córtex do cérebro, que consome muito oxigênio, falha primeiro, e a crítica some antes do mal-estar"],
                ["Visão alterada", "A retina gasta muito oxigênio: a visão noturna e a de cores pioram cedo"],
                ["Formigamento e tontura", "A respiração rápida baixa o gás carbônico do sangue e estreita os vasos do cérebro"],
              ],
            },
          },
          { paragrafo: 3, midia: 'animacao-camara' },
          { paragrafo: 4, midia: 'consciencia-util' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Tempo de consciência útil · antes e depois da descompressão rápida (FAA)",
              colunas: ["Altitude", "Tempo de consciência útil", "Depois de descompressão rápida"],
              linhas: [
                ["18.000 ft (5.500 m)", "20 a 30 min", "10 a 15 min"],
                ["22.000 ft (6.700 m)", "10 min", "5 a 6 min"],
                ["25.000 ft (7.600 m)", "3 a 5 min", "1,5 a 2,5 min"],
                ["28.000 ft (8.500 m)", "2,5 a 3 min", "1 a 1,5 min"],
                ["30.000 ft (9.100 m)", "1 a 2 min", "30 s a 1 min"],
                ["35.000 ft (10.700 m)", "30 s a 1 min", "15 a 30 s"],
                ["40.000 ft (12.200 m)", "15 a 20 s", "Quase nenhum"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · treino de hipóxia",
              colunas: ["Momento", "O que fazer"],
              linhas: [
                ["Antes da câmara", "Adiar com resfriado, sinusite ou dor de dente: o ar preso se expande"],
                ["Depois de mergulhar", "Respeitar o mesmo intervalo exigido antes de voar"],
                ["Durante o treino", "Observar e anotar os primeiros sinais: essa é a sua assinatura"],
                ["No voo", "Ao primeiro sinal ou alarme de cabine, máscara primeiro e procedimento de descompressão"],
                ["Depois do treino", "Dor nas juntas, falta de ar ou dor de ouvido pedem avaliação médica antes de voar"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.3',
      titulo: "Treinamento fisiológico: desorientação, forças G e sobrevivência",
      pergunta: "O que os simuladores do corpo ensinam sobre o labirinto, o susto, o G e a saída de uma aeronave na água?",
      conteudo: {
        texto: [
          "O labirinto engana sem avisar. Entre **5% e 10%** dos acidentes da aviação geral são atribuídos à **desorientação espacial**, e **90%** deles são fatais (Veja M2V5 - IV). O treino começa no solo: numa **cadeira giratória** ou num **simulador de desorientação**, o piloto sente a ilusão e aprende a **confiar nos instrumentos** e a ignorar os sinais contrários que o corpo manda (Veja M2V5 - V).",
          "A perda de controle em voo foi a **principal causa de mortes** na aviação comercial entre **2001 e 2011**. A resposta da ICAO, em **2014**, foi o **treinamento de prevenção e recuperação de atitudes anormais (UPRT)**: aulas teóricas, simulador e voo real em avião leve capaz de manobras. A ICAO chama de atitude anormal o nariz **mais de 25° acima** ou **mais de 10° abaixo** do horizonte, a inclinação das asas **acima de 45°** ou a velocidade inadequada. Desde **13 de novembro de 2014**, o UPRT em voo real é exigido na licença de tripulação múltipla e recomendado na comercial, e a habilitação de tipo em avião inclui o UPRT.",
          "O corpo é o centro do UPRT. Diante do inesperado vem o **susto**, uma reação involuntária, física e mental, e o medo pode reduzir muito a capacidade de pensar. O treino expõe o piloto ao susto com segurança, junto com as **ilusões** do labirinto e da visão e a consciência do **G**, para que a recuperação saia certa mesmo com o coração disparado. O UPRT não é acrobacia: o foco é **prevenir**, **reconhecer** e **recuperar**.",
          "Na aviação de caça, o treino vai além: a **centrífuga humana** reproduz o G sustentado e ensina a **manobra anti-G** e os próprios sinais de **G-LOC** (Veja M1V7 - II e III). A centrífuga da Força Aérea dos Estados Unidos treina cerca de **1.200** alunos por ano, até **9 G**; os pilotos brasileiros do **Gripen** precisaram aguentar **9 G por 15 segundos** no treino na Suécia (Veja M1V7 - IV).",
          "Sobreviver ao pouso forçado é só metade; a outra é **sair** da aeronave. Quando o helicóptero pousa no mar e vira, a saída pode ser de cabeça para baixo, no escuro e na água fria. Por isso o trabalhador offshore treina numa piscina, num simulador de cabine que afunda e vira, com o **sistema de respiração de emergência** de ar comprimido, e aprende também sobrevivência no mar e primeiros socorros; o treino é renovado em até **4 anos** (Veja M1V4 - III).",
          "Cada simulador cobra do corpo. A cadeira giratória e o simulador de desorientação dão **enjoo** (Veja M2V5 - VI); a centrífuga causa **petéquias** e dor no **pescoço** e pede exames antes (Veja M1V7 - IV); a piscina pede **ouvidos** e **seios da face** livres, porque a pressão muda poucos metros abaixo da água (Veja M2V3 - II). O treino é feito com o corpo em dia e supervisão médica, e o que dói depois dele pede avaliação antes do próximo voo.",
          "**Como prevenir e amenizar.** Faça a demonstração de ilusões no solo e mantenha o **voo por instrumentos** em dia. No simulador de desorientação, avise ao primeiro enjoo, e não use remédio que dá sono para voar depois (Veja M3V2 - II). Na centrífuga, vá com os exames em dia e o pescoço fortalecido. Antes da piscina, trate o resfriado e confira os ouvidos; depois do treino de escape, localize a **saída mais próxima** em cada voo.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 2,
            tabela: {
              titulo: "Atitude anormal · limites da ICAO",
              colunas: ["Parâmetro", "Limite", "Por que o corpo engana"],
              linhas: [
                ["Nariz para cima", "Mais de 25° acima do horizonte", "Na aceleração, o labirinto confunde empurrão com subida"],
                ["Nariz para baixo", "Mais de 10° abaixo do horizonte", "Na desaceleração, o labirinto confunde freada com descida"],
                ["Inclinação das asas", "Acima de 45°", "Numa curva longa e suave, o labirinto deixa de perceber o giro"],
                ["Velocidade", "Inadequada para a situação", "Com susto e carga de trabalho, a atenção se estreita e o instrumento passa sem ser visto"],
              ],
            },
          },
          { paragrafo: 3, midia: 'treino-corpo' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Treinamentos fisiológicos · o que cada um ensina",
              colunas: ["Treino", "O que reproduz", "O que o corpo aprende", "Quem precisa"],
              linhas: [
                ["Câmara hipobárica", "Baixa pressão e descompressão rápida", "Reconhecer a própria assinatura da hipóxia", "Recomendada pela FAA a todos os pilotos"],
                ["Mistura com menos oxigênio no solo", "Hipóxia sem mudar a pressão", "Reconhecer os sintomas, com parte dos riscos da câmara a menos", "Alternativa à câmara, inclusive dentro do simulador"],
                ["Cadeira giratória e simulador de desorientação", "Ilusões do labirinto", "Confiar nos instrumentos contra a sensação", "Todo piloto, sobretudo quem voa à noite ou por instrumentos"],
                ["UPRT", "Atitudes anormais e susto", "Recuperar o avião mesmo sob susto", "Exigido na licença de tripulação múltipla e na habilitação de tipo em avião"],
                ["Centrífuga humana", "G sustentado até 9 G", "Manobra anti-G e sinais de G-LOC", "Pilotos de caça"],
                ["Escape de helicóptero na água", "Cabine que afunda e vira", "Sair de cabeça para baixo com respiração de emergência", "Trabalhadores offshore, com renovação em até 4 anos"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · treinos do corpo",
              colunas: ["Treino", "Antes", "Depois"],
              linhas: [
                ["Desorientação espacial", "Combinar com o instrutor um sinal para o enjoo", "Manter o voo por instrumentos em dia e confiar neles"],
                ["UPRT", "Dormir bem e chegar sem remédio que dá sono", "Rever as recuperações até saírem automáticas"],
                ["Centrífuga", "Exames em dia e pescoço fortalecido", "Petéquias só pedem observação; dor no pescoço que não passa pede avaliação"],
                ["Escape na água", "Tratar o resfriado e conferir ouvidos e seios da face", "Em cada voo sobre a água, localizar a saída mais próxima"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.4',
      titulo: "Formação: licenças, horas e treinamento contínuo",
      pergunta: "Que idade, que certificado médico e quantas horas cada licença pede, e por que o treino não termina na licença?",
      conteudo: {
        texto: [
          "A carreira sobe em degraus. Pela ICAO, o **piloto privado** precisa de **17 anos**, CMA de **2ª classe** e **40 horas** de voo, ou **35** num curso aprovado; o **piloto comercial**, de **18 anos**, CMA de **1ª classe** e **200 horas**, ou **150** num curso aprovado; o **piloto de linha aérea**, de **21 anos**, 1ª classe e **1.500 horas**. A **licença de tripulação múltipla (MPL)**, com **18 anos** e 1ª classe, forma o copiloto direto para a cabine de dois pilotos, num curso de pelo menos **240 horas** de voo real e simulado.",
          "No Brasil, o RBAC 61 segue esses números com uma diferença: o **piloto privado** precisa de **18 anos** e ensino médio completo, e o **voo solo** do aluno também só a partir dos **18**. O comercial pede **200 horas**, ou **150** em curso aprovado; o de linha aérea, **21 anos** e **1.500 horas**, entre elas pelo menos **100 de voo noturno** e **75 de voo por instrumentos**; a MPL, **240 horas** em curso aprovado.",
          "O corpo faz parte do currículo. Em todas as licenças de avião, da privada à de linha aérea, a ICAO exige conhecimento de **desempenho humano**, as capacidades e os limites do corpo e da mente que afetam a segurança, junto com a **gestão de ameaças e erros**. É onde entram a hipóxia, a desorientação, a fadiga e os remédios (Veja M2V1, M2V5, M2V8 e M3V2).",
          "As horas viraram regra depois de um acidente. Em **2009**, o voo Colgan 3407 caiu perto de Buffalo, nos Estados Unidos, e o caso levou a uma lei de **2010**. Desde **agosto de 2013**, o copiloto de linha aérea americana precisa da licença de **linha aérea**: **23 anos** e **1.500 horas**, ou, com restrição, a partir dos **21**, para militares, formados em curso superior de aviação ou quem já tem as 1.500 horas. Antes da prova, ele faz um curso de **30 horas** de aula e **10 de simulador**, e o comandante precisa de **1.000 horas** em operação de empresa aérea.",
          "Depois da licença, o treino continua por toda a carreira. A **habilitação de tipo** em avião inclui o **UPRT** (Veja M3V3 - III), e o treinamento periódico vem mudando: o **treinamento baseado em evidências (EBT)**, publicado pela ICAO em **2013**, troca a lista de manobras repetidas por cenários que desenvolvem **competências**, escolhidos a partir dos dados de voo, das observações em operação normal e dos relatos de segurança.",
          "A cada degrau, o **CMA** acompanha. Pela ICAO, ele vale **60 meses** para o piloto privado e **12 meses** para o comercial, a MPL e a linha aérea; no Brasil, a 1ª classe vale **12 meses**, com redução para **6 meses** a partir dos **60** no transporte aéreo público (Veja M3V1 - I). Para o **passageiro**, isso quer dizer que os dois pilotos da linha aérea renovam o exame médico pelo menos uma vez por ano e voltam ao simulador ao longo de toda a carreira.",
          "**Como prevenir e amenizar.** Planeje a carreira pelo **degrau mais alto**: quem quer a linha aérea faz o exame de **1ª classe** antes de começar o curso de piloto privado. Durante a formação, trate o **sono** como parte do treino, porque o cérebro cansado aprende e decide pior, e não voe doente nem com remédio que dá sono (Veja M2V8 - V e M3V2). Registre as horas com cuidado: elas são a moeda de cada licença.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 2,
            tabela: {
              titulo: "Licenças de piloto de avião · ICAO e ANAC",
              colunas: ["Licença", "Idade mínima", "CMA", "Horas mínimas"],
              linhas: [
                ["Aluno piloto: voo solo", "ANAC: 18 anos", "2ª classe", "Sem mínimo: o instrutor autoriza o voo solo"],
                ["Piloto privado", "ICAO: 17 anos; ANAC: 18 anos", "2ª classe", "40 horas, ou 35 em curso aprovado"],
                ["Piloto comercial", "18 anos", "1ª classe", "200 horas, ou 150 em curso aprovado"],
                ["Tripulação múltipla (MPL)", "18 anos", "1ª classe", "240 horas de voo real e simulado em curso aprovado"],
                ["Piloto de linha aérea", "21 anos", "1ª classe", "1.500 horas"],
              ],
            },
          },
          { paragrafo: 3, midia: 'licenca-piloto' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Copiloto nos Estados Unidos · a regra de 2013",
              colunas: ["Requisito", "Regra"],
              linhas: [
                ["Licença do copiloto", "Linha aérea e habilitação de tipo do avião"],
                ["Idade e horas", "23 anos e 1.500 horas; com restrição, a partir dos 21"],
                ["Curso antes da prova", "30 horas de aula e 10 de simulador"],
                ["Comandante", "1.000 horas em operação de empresa aérea"],
                ["CMA do copiloto", "Pode ser de 2ª classe"],
              ],
            },
          },
          { paragrafo: 6, midia: 'animacao-carreira' },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · formação",
              colunas: ["Momento", "O que fazer"],
              linhas: [
                ["Antes de escolher o curso", "Fazer o exame da classe que o objetivo final vai exigir"],
                ["Durante a formação", "Dormir bem e não voar doente nem com remédio que dá sono"],
                ["A cada habilitação", "Treinar UPRT e emergências até a recuperação sair automática"],
                ["Ao longo da carreira", "Renovar o CMA no prazo e declarar toda mudança de saúde"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "O que acontece", "Proteção e prevenção"],
              linhas: [
                ["Cérebro e mente", "Julgamento e atenção caem na hipóxia, na fadiga e no susto; o córtex é o primeiro a sofrer com a falta de oxigênio e de sono", "Treino de hipóxia, sono protegido, UPRT e avaliação psicológica"],
                ["Labirinto", "Ilusões de giro e de inclinação; o labirinto não percebe a rotação constante e confunde aceleração com subida", "Demonstração em solo e voo por instrumentos"],
                ["Pulmões e sangue", "Hipóxia na câmara e no voo; com menos pressão, menos oxigênio passa para o sangue", "Máscara primeiro e conhecer a própria assinatura da hipóxia"],
                ["Ouvidos, seios da face e dentes", "Dor e barotrauma na câmara e na piscina; o ar preso se expande ou se comprime com a pressão", "Não treinar resfriado e conferir os ouvidos antes"],
                ["Coração e vasos", "Na centrífuga, o G puxa o sangue para as pernas; o cérebro fica sem fluxo e vem o G-LOC", "Manobra anti-G, exames em dia e treino supervisionado"],
                ["Coluna cervical", "Dor no pescoço com G alto; a cabeça com capacete pesa muitas vezes mais", "Fortalecer o pescoço e posicionar a cabeça antes do G"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '3.1',
      pergunta: "Pela ICAO, que CMA o aluno precisa ter para voar sozinho?",
      opcoes: [
        "Nenhum",
        "2ª classe",
        "1ª classe",
        "3ª classe",
      ],
      correta: 1,
      explicacao: "O aluno só voa solo com CMA de 2ª classe válido; a 1ª classe é exigida para as licenças comercial, de tripulação múltipla e de linha aérea.",
    },
    {
      topico: '3.1',
      pergunta: "No Brasil, quando se repete a avaliação psicológica da 1ª classe?",
      opcoes: [
        "Nunca: só no exame inicial",
        "Todo ano",
        "A cada 5 anos e depois de acidente ou incidente grave",
        "Só aos 60 anos",
      ],
      correta: 2,
      explicacao: "Pelo RBAC 67, ela acontece no exame inicial, a cada 5 anos e depois de acidente ou incidente aeronáutico grave.",
    },
    {
      topico: '3.1',
      pergunta: "Na Europa, quando a empresa aérea avalia psicologicamente o piloto?",
      opcoes: [
        "Só depois de um acidente",
        "Antes do início no voo de linha",
        "Só na aposentadoria",
        "Nunca: só a autoridade avalia",
      ],
      correta: 1,
      explicacao: "Desde 2021, a regra europeia exige a avaliação antes do voo de linha; a autoridade britânica aceita a feita até 24 meses antes.",
    },
    {
      topico: '3.2',
      pergunta: "O que é a assinatura da hipóxia?",
      opcoes: [
        "A marca do oxímetro usado no treino",
        "A ordem e a intensidade dos próprios sintomas, que costumam se manter ao longo dos anos",
        "O tempo até desmaiar",
        "O registro do treino na licença",
      ],
      correta: 1,
      explicacao: "Conhecer a própria assinatura permite reagir ao primeiro sinal, sem esperar o julgamento falhar.",
    },
    {
      topico: '3.2',
      pergunta: "Depois de uma descompressão rápida entre 25.000 e 43.000 ft, o que acontece com o tempo de consciência útil?",
      opcoes: [
        "Dobra",
        "Não muda",
        "Cai pela metade",
        "Aumenta com o susto",
      ],
      correta: 2,
      explicacao: "Pela FAA, a descompressão rápida corta o tempo de consciência útil pela metade; por isso o gesto é máscara primeiro.",
    },
    {
      topico: '3.2',
      pergunta: "Qual a vantagem do treino de hipóxia com uma mistura de menos oxigênio no solo?",
      opcoes: [
        "Mostra a expansão dos gases",
        "Evita parte dos riscos da câmara, como a doença descompressiva",
        "Dispensa o CMA",
        "Treina a manobra anti-G",
      ],
      correta: 1,
      explicacao: "Sem baixar a pressão, a mistura reproduz os sintomas da hipóxia com um padrão muito parecido com o da câmara.",
    },
    {
      topico: '3.3',
      pergunta: "Pela FAA, que parte dos acidentes da aviação geral é atribuída à desorientação espacial?",
      opcoes: [
        "Menos de 1%",
        "Entre 5% e 10%",
        "Cerca de 50%",
        "Mais de 90%",
      ],
      correta: 1,
      explicacao: "Entre 5% e 10% dos acidentes, e 90% deles são fatais; o treino ensina a confiar nos instrumentos.",
    },
    {
      topico: '3.3',
      pergunta: "Para a ICAO, qual destas situações é uma atitude anormal?",
      opcoes: [
        "Inclinação de 30°",
        "Nariz 15° acima do horizonte",
        "Inclinação acima de 45°",
        "Nariz 5° abaixo do horizonte",
      ],
      correta: 2,
      explicacao: "Atitude anormal é o nariz mais de 25° acima ou mais de 10° abaixo, a inclinação acima de 45° ou a velocidade inadequada.",
    },
    {
      topico: '3.3',
      pergunta: "Em até quanto tempo o trabalhador offshore renova o treino de escape de helicóptero na água?",
      opcoes: [
        "1 ano",
        "4 anos",
        "10 anos",
        "Não precisa renovar",
      ],
      correta: 1,
      explicacao: "O padrão da indústria pede o treino de reciclagem em até 4 anos, com escape, respiração de emergência e sobrevivência no mar.",
    },
    {
      topico: '3.4',
      pergunta: "Quantas horas de voo a ICAO exige para a licença de piloto de linha aérea de avião?",
      opcoes: [
        "200",
        "500",
        "1.500",
        "3.000",
      ],
      correta: 2,
      explicacao: "São 1.500 horas como piloto de avião, com 21 anos e CMA de 1ª classe; no Brasil, o RBAC 61 pede o mesmo total.",
    },
    {
      topico: '3.4',
      pergunta: "No Brasil, qual a idade mínima para a licença de piloto privado?",
      opcoes: [
        "16 anos",
        "17 anos",
        "18 anos",
        "21 anos",
      ],
      correta: 2,
      explicacao: "O RBAC 61 pede 18 anos e ensino médio completo; a ICAO aceita 17.",
    },
    {
      topico: '3.4',
      pergunta: "O que o treinamento baseado em evidências (EBT) muda no treinamento periódico?",
      opcoes: [
        "Elimina o simulador",
        "Troca a lista de manobras repetidas por cenários que desenvolvem competências, escolhidos pelos dados",
        "Exige mais 1.500 horas",
        "Dispensa o CMA",
      ],
      correta: 1,
      explicacao: "Publicado pela ICAO em 2013, o EBT escolhe os cenários a partir dos dados de voo, das observações em operação normal e dos relatos de segurança.",
    },
  ],
};
