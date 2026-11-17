// Missão 3 · Voo 15 — Investigação e perícia. Ramo editorial voo/M3V15; fotos e vídeo entram depois da produção.
// Adiantado na ordem da missão a pedido do autor (17/11/2026). Os 12 itens previstos (investigação, fatores humanos,
// biomecânica do impacto, recomendações, perícia judicial, necropsia, toxicologia forense, identificação de vítimas,
// sobreviventes, nexo causal, perícia trabalhista e laudo) estão agrupados em 6 tópicos. Mesmo padrão do M3V1 a M3V4.
// REGISTRO DE REVISÃO · 17/11/2026. Fontes primárias conferidas:
// ICAO, Anexo 13, 10ª ed. (julho de 2010): 3.1 (objetivo único de prevenção), 5.4 e 5.4.1 (independência; separada de
//   processos para apurar culpa ou responsabilidade), 5.9 (necropsia completa dos tripulantes mortos e, conforme o caso,
//   de passageiros e comissários, por patologista de preferência experiente em investigação), 5.9.1 (exame médico de
//   tripulação, passageiros e pessoal envolvido), 5.12 (não divulgação de registros), 6.5 (relatório final público em
//   até 12 meses se possível), 6.6 (declaração provisória a cada aniversário), 7.4 (relatório preliminar em 30 dias),
//   6.10 (resposta às recomendações em 90 dias). ICAO, apresentação de A. Desjardin (2020): 3.2 e 5.4.4.
// Lei 12.970/2014 (CBA, Lei 7.565/1986): 86-A (objetivo único de prevenção), 88-B (independência; quem participa não
//   atua nas outras investigações), 88-C (precedência no acesso e na custódia), 88-D (indício de crime: comunicar a
//   polícia), 88-E (cessão de peritos à polícia ou à Justiça, não os da mesma investigação), 88-G §1 (requisição com
//   prioridade de laudos, exames e necropsias), 88-H (relatório final com fatores contribuintes e recomendações), 88-I
//   §2 (análises e conclusões do SIPAER não servem como prova), 88-K (juiz decide após ouvir o SIPAER em 72 horas), 88-N
//   (destroços só com autorização, salvo para salvar vidas), 88-O (polícia isola e preserva o local), 88-P (acesso em
//   coordenação), 88-Q §3 (venda de destroços proibida até a liberação). STF, ADI 5.667 (PGR, 2017), julgada em
//   14/08/2024 por 9 x 1 (relator Nunes Marques), conforme a CNN Brasil.
// NTSB, SR-01-01 (2001), Survivability of Accidents Involving Part 121 U.S. Air Carrier Operations, 1983 Through 2000,
//   conforme a Flight Safety Digest de outubro de 2001: 568 acidentes; 53.487 ocupantes, 95,7% sobreviventes; 26 acidentes
//   graves, 2.739 ocupantes, 55,6%; 19 graves sobrevivíveis, 1.988 ocupantes, 76,6%; mortes por impacto 716 e por fogo
//   131; fatores de sobrevivência; mais de dois terços não leem o cartão de segurança; percepção pública abaixo de 95,7%.
// 14 CFR 25.803(c): mais de 44 passageiros, evacuação em até 90 segundos em emergência simulada (Apêndice J).
// M1V8 (registro próprio): 23 G no eixo da coluna e 46 G de frente para o mesmo risco; 680 kgf lombar, HIC 1.000, fêmur
//   1.020 kgf; exame após ejeção mesmo sem dor.
// INTERPOL, ficha DVI (FS-02, 2023): fases de local, post mortem, ante mortem e reconciliação; impressões digitais,
//   arcada dentária e DNA para identificação conclusiva; tatuagens, cicatrizes e implantes; identificação visual não é
//   precisa; Guia DVI desde 1984, revisado a cada cinco anos.
// Chaturvedi AK et al., FAA DOT/FAA/AM-15/13 (2015): 1.169 pilotos (2009–2013); mortes −37% e presença de etanol ou
//   drogas +239% em relação a 1989–1993; etanol estável; ilícitas e de receita em alta; NTSB: 5% com etanol, drogas e
//   doenças como causa ou fator; maioria aviação geral e pilotos privados.
// Canfield DV, Kupiec TC, Huffine EF, FAA DOT/FAA/AM-92/24 (1992): 975 vítimas (1989–1990); 79 (8%) acima de 0,04%;
//   27% produção pós-morte, 28% ingestão, 45% indeterminado; dois casos acima de 0,15% por produção pós-morte; outros
//   voláteis não indicam produção; origem pela distribuição em urina, humor vítreo, sangue e tecidos.
// Código de Processo Penal: 158 (corpo de delito indispensável; confissão não supre), 158-A (cadeia de custódia), 159
//   (perito oficial com curso superior), 162 (necropsia ao menos 6 horas após o óbito, salvo sinais evidentes).
// Lei 8.213/1991: 19, 20 I e II, 21 (trajeto), 21-A (nexo técnico epidemiológico, Decreto 3.048/1999), 22 caput e §2.
// Código de Processo Civil, 473: I a IV (objeto, análise técnica ou científica, método predominantemente aceito,
//   resposta conclusiva a todos os quesitos), §1 (linguagem simples e coerência lógica), §2 (vedado ultrapassar os
//   limites e emitir opinião pessoal).
// Dicas sem número próprio (guardar prontuários, colher várias amostras cedo, preservar vestígios, registrar decisões)
//   são aplicação das fontes acima e dos voos citados.
import type { Capitulo } from '../tipos';

export const investigacao: Capitulo = {
  numero: 15,
  titulo: 'Investigação e perícia',
  tempoLeituraMin: 15,
  topicos: [
    {
      id: '15.1',
      titulo: "Investigação: prevenir, não culpar",
      pergunta: "Para que serve a investigação de um acidente aéreo, quem a faz e por que ela não aponta culpados?",
      conteudo: {
        texto: [
          "Pela ICAO, o **único objetivo** da investigação de um acidente ou incidente aeronáutico é **prevenir** outros. Ela é feita por uma autoridade **independente** e fica **separada** de qualquer processo judicial ou administrativo que busque culpa ou responsabilidade. No Brasil, o Código Brasileiro de Aeronáutica repete a regra: a investigação do **SIPAER**, sistema coordenado pelo **CENIPA**, tem por objetivo único a prevenção de novos acidentes.",
          "A investigação tem prazos. O **relatório preliminar** sai em até **30 dias**; o **relatório final**, público, deve sair em até **12 meses** quando possível, e, se demorar mais, a cada aniversário do acidente sai uma **declaração provisória**. O relatório final aponta os **fatores contribuintes** e faz **recomendações de segurança**; quem as recebe tem **90 dias** para responder o que fará com elas.",
          "A medicina tem lugar na investigação. A ICAO pede **necropsia completa** dos tripulantes mortos e, conforme o caso, de passageiros e comissários, por um patologista de preferência experiente em acidentes, além de exame médico dos sobreviventes. O investigador olha para o corpo com as ferramentas dos **fatores humanos**: doença que tira de ação, hipóxia, fadiga, remédio, álcool e desorientação entram no nível das precondições (Veja M3V4 - I e M3V1 - V).",
          "A proteção das fontes sustenta tudo. As **gravações da cabine**, os depoimentos e os relatos voluntários não podem ser usados para outro fim que não a investigação. No Brasil, as análises e conclusões do SIPAER **não servem como prova** em processos; só um **juiz** pode liberar o uso, depois de ouvir a autoridade do SIPAER em **72 horas**. Em **14 de agosto de 2024**, o Supremo Tribunal Federal manteve essas regras por **9 votos a 1**.",
          "A lógica é a mesma do programa de apoio e do relato de erros: quem teme punição esconde o que viu, e o que se esconde volta como acidente (Veja M2V7 - VI e M3V4 - I). Por isso a investigação de segurança fala em **fatores contribuintes**, nunca em culpados. A culpa, quando existe, é assunto de outra investigação, a da polícia e da Justiça (Veja M3V15 - V).",
          "Para o **passageiro** e a família, o relatório final é público e explica o que aconteceu e o que vai mudar. Para o **tripulante**, notificar incidentes e quase acidentes é a forma de entrar nessa prevenção antes da tragédia (Veja M2V4 - VI). Para o **médico examinador**, o prontuário do exame e os laudos pedidos ficam à disposição da investigação, que pode requisitá-los com prioridade.",
          "**Como prevenir e amenizar.** Notifique incidentes e situações de risco, mesmo sem dano. Diante de um acidente, só mexa nos destroços para **salvar vidas** ou evitar novo perigo, e anote o que viu enquanto a memória está fresca. O médico que atende vítimas ou examina tripulantes mantém o prontuário completo e legível e preserva amostras quando houver morte, porque elas podem ser a única resposta sobre o que aconteceu com o corpo.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 2,
            tabela: {
              titulo: "Investigação de acidente · ICAO e Brasil",
              colunas: ["Item", "ICAO (Anexo 13)", "Brasil (CBA)"],
              linhas: [
                ["Objetivo", "Único: prevenir acidentes e incidentes", "Único: prevenir novos acidentes e incidentes"],
                ["Independência", "Autoridade independente, separada dos processos de culpa", "Independente das outras investigações; quem participa não atua nelas"],
                ["Prazos", "Preliminar em 30 dias; final em 12 meses quando possível; resposta às recomendações em 90 dias", "Relatório final com fatores contribuintes e recomendações"],
                ["Proteção das fontes", "Gravações e depoimentos só para a investigação", "Não servem como prova, salvo decisão do juiz após ouvir o SIPAER"],
                ["Corpo", "Necropsia completa dos tripulantes mortos e exame médico dos sobreviventes", "O SIPAER pode requisitar laudos e necropsias com prioridade"],
              ],
            },
          },
          { paragrafo: 3, midia: 'etapas-investigacao' },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · investigação",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Tripulante", "Notificar incidentes e situações de risco, mesmo sem dano"],
                ["Testemunha", "Mexer nos destroços só para salvar vidas e anotar o que viu"],
                ["Médico", "Prontuário completo e legível; preservar amostras quando houver morte"],
                ["Família", "Acompanhar o relatório final, que é público"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '15.2',
      titulo: "Biomecânica do impacto e sobreviventes",
      pergunta: "Quantos sobrevivem a um acidente aéreo, o que mata nos acidentes graves e o que o corpo conta ao investigador?",
      conteudo: {
        texto: [
          "A maioria sobrevive. O NTSB estudou os acidentes das empresas aéreas americanas de **1983 a 2000**: em **568** acidentes, com **53.487** ocupantes, **95,7%** sobreviveram. Mesmo nos **acidentes graves**, com fogo, morte ou lesão grave e avião muito danificado ou destruído, **55,6%** saíram vivos, e nos graves considerados sobrevivíveis, **76,6%**.",
          "Nos acidentes graves, o **impacto** matou quase **cinco vezes** mais que o **fogo**: **716** mortes contra **131**. Por isso a investigação olha para a estrutura que protege o corpo: a **integridade da fuselagem**, os **cintos**, o projeto dos **assentos**, os materiais que retardam o fogo, as **saídas** e a **evacuação**. Cada um desses itens é uma camada entre a energia do impacto e os órgãos.",
          "O corpo funciona como um registro do acidente. A **coluna** tolera bem menos no eixo vertical que de frente: cerca de **23 G** contra **46 G** para o mesmo risco (Veja M1V8 - I). Por isso a **fratura por compressão das vértebras** sugere uma batida forte de cima para baixo; a marca do **cinto sobre a pelve** mostra que o ocupante estava preso; as lesões de **cabeça** indicam onde ela bateu. Os limites do teste dos assentos, como **680 kg-força** na coluna lombar e **HIC de 1.000** para a cabeça, são limites do corpo (Veja M1V8 - II).",
          "Depois do impacto, o tempo conta. Pela norma americana de certificação, um avião com mais de **44** passageiros precisa provar que todos os ocupantes saem em até **90 segundos** numa emergência simulada. Fumaça, fogo, assentos soltos e saídas bloqueadas consomem esses segundos, e quem sabe onde fica a saída ganha tempo.",
          "O sobrevivente também é parte da investigação. O exame médico mostra lesões que explicam a dinâmica do acidente, e o relato dele, protegido como fonte, ajuda a reconstruir os segundos finais. Depois de uma ejeção, o tripulante é examinado mesmo **sem dor**, com ressonância da coluna, e a mesma prudência vale para outros impactos fortes (Veja M1V8 - III).",
          "Para o **passageiro**, o estudo deixou um alerta: mais de **dois terços** nunca olham o cartão de segurança, e a percepção do público sobre a sobrevivência é bem menor que os **95,7%** reais. Acreditar que dá para sobreviver é o que faz a pessoa prestar atenção à demonstração, contar as fileiras e sair rápido.",
          "**Como prevenir e amenizar.** Use o cinto **baixo e firme sobre a pelve** sempre que estiver sentado, leia o cartão de segurança e conte as fileiras até as duas saídas mais próximas. Na emergência, adote a posição de impacto recomendada (Veja M1V8 - II), deixe a bagagem e saia. Depois, procure avaliação médica mesmo sem dor, e o tripulante só volta ao voo depois de liberado.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 1,
            tabela: {
              titulo: "Sobrevivência nos acidentes de empresas aéreas · NTSB, 1983 a 2000",
              colunas: ["Grupo", "Ocupantes", "Sobreviveram"],
              linhas: [
                ["Todos os acidentes (568)", "53.487", "95,7%"],
                ["Acidentes graves (26)", "2.739", "55,6%"],
                ["Graves considerados sobrevivíveis (19)", "1.988", "76,6%"],
              ],
            },
          },
          { paragrafo: 2, midia: 'sobrevivencia-fatores' },
          {
            paragrafo: 3,
            tabela: {
              titulo: "O que o corpo mostra ao investigador",
              colunas: ["Achado", "O que indica"],
              linhas: [
                ["Fratura por compressão das vértebras", "Carga forte no eixo da coluna, de cima para baixo, onde a tolerância é menor"],
                ["Marca do cinto sobre a pelve", "O ocupante estava preso, e a carga passou pelo osso que aguenta"],
                ["Lesão de cabeça", "Havia espaço para a cabeça bater; a posição de impacto e o assento contam"],
                ["Fraturas de braços e pernas", "Membros soltos se agitam no impacto e batem na estrutura"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · sobreviver ao impacto",
              colunas: ["Momento", "O que fazer"],
              linhas: [
                ["Sentado", "Cinto baixo e firme sobre a pelve"],
                ["Antes da decolagem", "Ler o cartão e contar as fileiras até as duas saídas mais próximas"],
                ["Na emergência", "Posição de impacto recomendada, deixar a bagagem e sair"],
                ["Depois", "Avaliação médica mesmo sem dor; tripulante só volta ao voo liberado"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '15.3',
      titulo: "Necropsia e identificação de vítimas",
      pergunta: "O que a necropsia procura no piloto e como se identificam as vítimas de um acidente aéreo?",
      conteudo: {
        texto: [
          "A ICAO pede **necropsia completa** dos tripulantes mortos num acidente e, conforme as circunstâncias, dos passageiros e comissários, feita por um **patologista**, de preferência experiente em investigação de acidentes. No Brasil, a autoridade do SIPAER pode requisitar com prioridade laudos, exames e necropsias, e a lei penal manda fazer a necropsia pelo menos **6 horas** depois da morte, salvo quando os sinais de morte são evidentes.",
          "No piloto, a necropsia responde a uma pergunta central: ele estava apto quando o avião caiu? O patologista procura **doença prévia** capaz de tirar de ação, como a das coronárias (Veja M2V2 - III e M3V1 - V), colhe amostras para a **toxicologia** (Veja M3V15 - IV) e descreve as **lesões**, que ajudam a reconstruir o impacto (Veja M3V15 - II). Uma doença achada na necropsia pode explicar o que nenhum gravador registrou.",
          "Identificar as vítimas é um trabalho à parte, com padrão internacional. O guia de **identificação de vítimas de desastres (DVI)** da INTERPOL, criado em **1984** e revisado a cada cinco anos, divide o trabalho em quatro fases: o exame do **local**, os dados **post mortem**, colhidos nos corpos, os dados **ante mortem**, reunidos com as famílias e os registros médicos e odontológicos, e a **reconciliação**, que compara os dois.",
          "Para uma identificação **conclusiva**, costumam ser necessárias as **impressões digitais**, a **arcada dentária** ou o **DNA**. Tatuagens, cicatrizes e **implantes cirúrgicos** podem ser únicos e ajudam. O **reconhecimento visual** não é considerado preciso: num desastre, o corpo pode estar alterado e a emoção engana quem olha.",
          "Aqui o registro médico vira identidade. O prontuário do dentista, a radiografia antiga, a descrição de uma cirurgia com prótese e o exame do médico examinador entram nos dados **ante mortem**. Quanto mais completo e legível o registro, mais rápido a família recebe uma resposta certa.",
          "Para a **família**, a espera é dolorosa, mas existe para evitar o pior erro: entregar o corpo errado. O pedido de amostras de DNA de parentes, de escova de dentes ou de exames antigos faz parte da fase ante mortem. Para o **médico**, colaborar com a equipe de identificação é entregar registros completos, com sigilo e dentro da lei.",
          "**Como prevenir e amenizar.** Mantenha em dia o tratamento e o prontuário do **dentista** e guarde exames de imagem e descrições de cirurgias, sobretudo com prótese ou implante. O médico examinador registra com clareza cicatrizes, tatuagens e próteses no exame. Diante de um desastre, a família procura a equipe oficial de identificação e aguarda a confirmação por digital, arcada ou DNA, sem se apoiar só no reconhecimento visual.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 2,
            tabela: {
              titulo: "O que a necropsia procura no piloto",
              colunas: ["Achado", "O que indica"],
              linhas: [
                ["Doença prévia, como a das coronárias", "Possível incapacitação antes do impacto"],
                ["Álcool, remédios ou drogas nas amostras", "Precondição que pode ter pesado na decisão ou no reflexo"],
                ["Padrão das lesões", "Direção e intensidade do impacto, e se havia proteção"],
              ],
            },
          },
          { paragrafo: 3, midia: 'dvi-fases' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Identificação de vítimas · o que vale como prova (INTERPOL)",
              colunas: ["Identificador", "Por que serve"],
              linhas: [
                ["Impressões digitais", "Desenho único de cada pessoa, comparado com registros"],
                ["Arcada dentária", "Dentes e tratamentos dentários comparados com o prontuário e as radiografias do dentista"],
                ["DNA", "Comparado com o de parentes ou de objetos pessoais"],
                ["Tatuagens, cicatrizes e implantes", "Podem ser únicos e ajudam a confirmar"],
                ["Reconhecimento visual", "Não é considerado preciso: o corpo pode estar alterado e a emoção engana"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · necropsia e identificação",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Tripulante e passageiro", "Manter em dia o prontuário do dentista e guardar exames e descrições de cirurgia"],
                ["Médico examinador", "Registrar com clareza cicatrizes, tatuagens e próteses"],
                ["Família", "Procurar a equipe oficial e aguardar a confirmação por digital, arcada ou DNA"],
                ["Patologista", "Necropsia completa do tripulante e amostras para toxicologia"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '15.4',
      titulo: "Toxicologia forense",
      pergunta: "O que a toxicologia encontra nos pilotos mortos em acidentes, e por que o álcool depois da morte engana?",
      conteudo: {
        texto: [
          "Nos Estados Unidos, o laboratório do instituto médico da FAA analisa as amostras dos pilotos mortos em acidentes da aviação civil em busca de **álcool** e **drogas**. De **2009 a 2013**, foram **1.169** pilotos. Comparado com **1989 a 1993**, o número de pilotos mortos caiu **37%**, mas a presença de álcool ou drogas nas amostras subiu **239%**: o álcool ficou estável, e cresceram os remédios com receita e as drogas ilícitas.",
          "Os remédios encontrados eram, em geral, os mesmos que a população usa. A maioria dos acidentes foi na **aviação geral**, com pilotos privados. Para o NTSB, o álcool ou as drogas, junto com doenças de base, foram causa ou fator contribuinte em **5%** dos acidentes desse período (Veja M3V2 - I).",
          "O álcool tem uma armadilha: o corpo pode **produzi-lo depois da morte**, pela ação de bactérias e fungos nos tecidos. Num estudo do mesmo laboratório com **975** vítimas de **1989 e 1990**, **79** (8%) tinham álcool acima do limite de **0,04%** da FAA. Desses, **27%** vinham da produção depois da morte, **28%** da ingestão e **45%** não puderam ser atribuídos a nenhuma das duas; em dois casos, a produção depois da morte passou de **0,15%**.",
          "Como separar um do outro? Pela **distribuição** do álcool entre o **sangue**, a **urina**, o **humor vítreo** do olho e os **tecidos**: o álcool bebido em vida se espalha de forma coerente entre eles, e o produzido depois da morte nem sempre. O mesmo estudo mostrou que outros voláteis, como o acetaldeído e a acetona, **não bastam** para dizer que houve produção depois da morte. Por isso o laboratório pede **várias amostras**, e não só sangue.",
          "Achar uma substância não é o mesmo que provar que ela pesou no acidente. O laudo junta a **concentração**, o tempo provável da última dose, a doença que levou ao remédio e o que o voo exigia naquele momento. Um antialérgico que dá sono, por exemplo, pesa mais à noite, com fadiga e na altitude (Veja M3V2 - IV).",
          "No vivo, o exame toxicológico é preventivo e segue o programa de substâncias psicoativas da ANAC (Veja M3V2 - IV). Na morte, ele vira prova, e cada amostra precisa de **cadeia de custódia**: o registro de quem colheu, guardou e analisou, do começo ao fim, para que o resultado valha na investigação e no processo.",
          "**Como prevenir e amenizar.** Para o tripulante, a prevenção é a mesma do voo vivo: respeitar os prazos de cada remédio e do álcool e declarar ao examinador o que usa (Veja M3V2 - III). Para quem colhe as amostras, colher **cedo**, colher **várias** (sangue, urina, humor vítreo e tecidos), refrigerar e registrar a cadeia de custódia. Para quem interpreta, nunca concluir só por um número no sangue.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 2,
            tabela: {
              titulo: "Pilotos mortos em acidentes · FAA, 2009 a 2013",
              colunas: ["Achado", "Resultado"],
              linhas: [
                ["Pilotos analisados", "1.169"],
                ["Pilotos mortos, comparado com 1989 a 1993", "37% a menos"],
                ["Presença de álcool ou drogas", "239% a mais; álcool estável, remédios e drogas ilícitas em alta"],
                ["Causa ou fator contribuinte (NTSB)", "5% dos acidentes, com álcool, drogas e doenças de base"],
              ],
            },
          },
          { paragrafo: 3, midia: 'alcool-pos-morte' },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Álcool depois da morte · 79 casos acima de 0,04% (FAA, 1989 e 1990)",
              colunas: ["Origem", "Casos", "Parte"],
              linhas: [
                ["Produzido depois da morte", "21", "27%"],
                ["Bebido em vida", "22", "28%"],
                ["Indeterminado", "36", "45%"],
              ],
            },
          },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Amostras e o que mostram",
              colunas: ["Amostra", "Uso na interpretação"],
              linhas: [
                ["Sangue", "Concentração principal, comparada com as outras amostras"],
                ["Urina e humor vítreo", "A distribuição do álcool entre elas ajuda a separar a ingestão da produção depois da morte"],
                ["Tecidos", "Completam a comparação, sobretudo quando falta sangue"],
                ["Outros voláteis", "Sozinhos, não provam produção depois da morte"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · toxicologia",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Tripulante", "Respeitar os prazos de remédios e álcool e declarar ao examinador o que usa"],
                ["Quem colhe", "Colher cedo e várias amostras, refrigerar e registrar a cadeia de custódia"],
                ["Quem interpreta", "Juntar concentração, tempo da dose, doença e o que o voo exigia"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '15.5',
      titulo: "Perícia judicial e nexo causal",
      pergunta: "Como a investigação de segurança e a perícia da polícia convivem no mesmo acidente, e o que é o nexo causal?",
      conteudo: {
        texto: [
          "Um acidente com mortos abre, no Brasil, **duas investigações** independentes: a do **SIPAER**, que busca prevenir, e a da **polícia** e da **Justiça**, que apura crime, culpa e responsabilidade. Quem participa da investigação do SIPAER não pode atuar na outra. O SIPAER tem **precedência** no acesso e na guarda dos destroços e do que interessa à investigação, e, se aparecer indício de crime, comunica a polícia.",
          "A polícia **isola e preserva** o local até a liberação, e o acesso aos destroços é feito em coordenação com o SIPAER; a venda de destroços e peças fica proibida até a liberação. Se a polícia ou a Justiça não tiverem como examinar uma aeronave civil, o SIPAER pode ceder **peritos**, desde que não sejam os que trabalham na mesma investigação de segurança.",
          "A perícia criminal segue o Código de Processo Penal. Quando o fato deixa **vestígios**, o **exame de corpo de delito** é indispensável, e a confissão não o substitui. Ele é feito por **perito oficial** com curso superior, e cada vestígio precisa de **cadeia de custódia**, a história documentada do que foi colhido, de onde veio e por quem passou.",
          "E o relatório do SIPAER? As análises e conclusões dele **não servem como prova** em processo judicial ou administrativo. O juiz pode autorizar o uso depois de ouvir a autoridade do SIPAER, que tem **72 horas** para se manifestar. Em **2024**, o Supremo Tribunal Federal confirmou essas regras e a existência de duas investigações, uma para prevenir e outra para responsabilizar.",
          "No processo, a pergunta muda. O SIPAER fala de **fatores contribuintes**; a Justiça precisa de **nexo causal**, a ligação entre uma conduta ou condição e o dano. Para o perito médico, isso vira perguntas concretas: a doença do piloto existia antes do voo? Ela podia tirar alguém de ação? O remédio ou o álcool estavam em concentração capaz de prejudicar? O certificado médico estava válido e a declaração do histórico foi verdadeira (Veja M3V1 - IV)?",
          "Para o **médico examinador**, o prontuário do exame aeromédico é peça da perícia: o que foi examinado, declarado e liberado mostra se o certificado estava correto. Para o **tripulante**, os documentos do voo, o certificado médico e o diário de bordo também contam a história. Para a **família**, a perícia e o processo são o caminho da responsabilidade; o relatório do SIPAER é o caminho da prevenção.",
          "**Como prevenir e amenizar.** O médico examinador registra tudo com clareza: exames, declarações, pareceres e o motivo de cada decisão. O tripulante mantém o certificado médico, a declaração de saúde e o diário de bordo corretos e verdadeiros. Quem chega primeiro ao local preserva os vestígios, salvo para salvar vidas, e o perito documenta cada passo da cadeia de custódia.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, midia: 'animacao-duas-investigacoes' },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Duas investigações, dois objetivos",
              colunas: ["Item", "SIPAER (CENIPA)", "Polícia e Justiça"],
              linhas: [
                ["Objetivo", "Prevenir novos acidentes", "Apurar crime, culpa e responsabilidade"],
                ["Resultado", "Relatório final com fatores contribuintes e recomendações", "Laudo pericial, inquérito e processo"],
                ["Destroços", "Precedência no acesso e na guarda", "Isola o local; acesso em coordenação com o SIPAER"],
                ["Uso como prova", "Não serve, salvo decisão do juiz após ouvir o SIPAER em 72 horas", "Exame de corpo de delito indispensável quando há vestígios"],
                ["Pessoas", "Quem participa não atua na outra investigação", "Perito oficial; pode receber peritos cedidos pelo SIPAER"],
              ],
            },
          },
          { paragrafo: 3, midia: 'duas-investigacoes' },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Nexo causal · perguntas do perito médico",
              colunas: ["Pergunta", "Onde buscar a resposta"],
              linhas: [
                ["A doença existia antes do voo?", "Necropsia, prontuários e exames anteriores"],
                ["Ela podia tirar alguém de ação?", "Natureza e gravidade da doença; risco de incapacitação súbita"],
                ["Remédio ou álcool prejudicavam?", "Toxicologia, concentração, tempo da dose e cadeia de custódia"],
                ["O certificado médico estava correto?", "Prontuário do exame aeromédico e declaração do histórico"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · perícia",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Médico examinador", "Registrar exames, declarações, pareceres e o motivo de cada decisão"],
                ["Tripulante", "Manter certificado médico, declaração de saúde e diário de bordo corretos e verdadeiros"],
                ["Primeiro a chegar", "Preservar os vestígios, salvo para salvar vidas"],
                ["Perito", "Documentar cada passo da cadeia de custódia"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '15.6',
      titulo: "Perícia trabalhista e laudo",
      pergunta: "Quando o acidente ou a doença do aeronauta é do trabalho, e o que um laudo pericial precisa conter?",
      conteudo: {
        texto: [
          "Para a Previdência brasileira, **acidente do trabalho** é o que acontece no exercício do trabalho a serviço da empresa e causa lesão ou perturbação funcional que leva à morte ou à perda ou redução, permanente ou temporária, da capacidade para o trabalho. Para o aeronauta, o acidente em voo a serviço é acidente do trabalho, e o do **trajeto** de casa para o trabalho e de volta também é equiparado a ele.",
          "A lei também chama de acidente do trabalho as **doenças ocupacionais**: a **doença profissional**, produzida pelo trabalho próprio de uma atividade, e a **doença do trabalho**, adquirida pelas condições especiais em que o trabalho é feito. No voo, o corpo fica exposto a ruído, radiação cósmica, vibração, fuso e jornadas longas, que podem pesar na audição, na coluna e no sono (Veja M1V5, M1V6 e M2V8).",
          "O acidente precisa ser comunicado. A empresa emite a **comunicação de acidente do trabalho (CAT)** até o **primeiro dia útil** seguinte e, em caso de **morte**, de imediato. Se a empresa não comunicar, podem fazê-lo o próprio acidentado, os dependentes, o sindicato, o **médico** que atendeu ou qualquer autoridade pública.",
          "Na perícia trabalhista, o centro é o **nexo**: a ligação entre o trabalho e a doença ou a lesão. A Previdência pode presumir esse nexo quando a doença, pela classificação internacional de doenças, aparece ligada à atividade da empresa numa lista oficial, o **nexo técnico epidemiológico**. Fora dela, o perito precisa mostrar a ligação com a história, as exposições e os exames: audiometrias, exames periódicos e o certificado médico aeronáutico ao longo dos anos.",
          "Seja criminal, cível ou trabalhista, tudo termina num **laudo**. O Código de Processo Civil diz o que ele precisa ter: a **exposição do objeto** da perícia, a **análise técnica ou científica**, a indicação do **método**, mostrando que é aceito pelos especialistas da área, e a **resposta conclusiva a todos os quesitos**. O laudo usa **linguagem simples**, com coerência lógica, e o perito não pode ir além do exame técnico nem dar opinião pessoal.",
          "Na aviação, um bom laudo médico une o que este app explica: a fisiologia do voo, a doença, o remédio, a norma do certificado e o que a investigação encontrou (Veja M3V1, M3V2 e M3V15 - I). Para o **tripulante**, guardar exames, audiometrias e certificados é guardar a própria história; para o **médico**, escrever claro hoje é responder bem a um quesito daqui a anos.",
          "**Como prevenir e amenizar.** O tripulante guarda os exames periódicos, as audiometrias, os certificados médicos e o registro das jornadas, e comunica qualquer acidente ou sintoma ligado ao voo. A empresa emite a CAT no prazo. O médico que atende registra a história de exposição e, se a empresa não comunicar, pode emitir a CAT. O perito responde a todos os quesitos, com método e linguagem simples.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 2,
            tabela: {
              titulo: "Acidente do trabalho · Lei 8.213",
              colunas: ["Artigo", "O que diz"],
              linhas: [
                ["Art. 19", "Acidente no trabalho a serviço da empresa, com lesão ou perturbação que leva à morte ou reduz a capacidade"],
                ["Art. 20", "Doença profissional e doença do trabalho também são acidente do trabalho"],
                ["Art. 21", "O acidente de trajeto entre casa e trabalho é equiparado"],
                ["Art. 21-A", "Nexo presumido quando a doença está ligada à atividade da empresa na lista oficial"],
                ["Art. 22", "CAT até o primeiro dia útil; na morte, de imediato; outros podem comunicar se a empresa não o fizer"],
              ],
            },
          },
          { paragrafo: 3, midia: 'laudo-partes' },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Laudo pericial · o que não pode faltar (CPC, art. 473)",
              colunas: ["Parte", "O que contém"],
              linhas: [
                ["Objeto", "O que foi examinado e por quê"],
                ["Análise", "O exame técnico ou científico feito pelo perito"],
                ["Método", "Como foi feito, mostrando que é aceito pelos especialistas"],
                ["Quesitos", "Resposta conclusiva a todos eles"],
                ["Linguagem", "Simples e coerente, sem ir além do exame técnico nem opinião pessoal"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · perícia trabalhista",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Tripulante", "Guardar exames, audiometrias, certificados e registro de jornadas; comunicar acidentes e sintomas"],
                ["Empresa", "Emitir a CAT até o primeiro dia útil; na morte, de imediato"],
                ["Médico", "Registrar a história de exposição e emitir a CAT se a empresa não o fizer"],
                ["Perito", "Responder a todos os quesitos, com método e linguagem simples"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "O que acontece", "Proteção e prevenção"],
              linhas: [
                ["Coluna", "Fratura por compressão no impacto vertical; as vértebras recebem a carga uma sobre a outra e toleram menos nesse eixo", "Assentos que absorvem energia, cinto bem ajustado e avaliação mesmo sem dor"],
                ["Cabeça e cérebro", "Trauma quando há espaço para a cabeça bater; o cérebro continua em movimento quando o corpo para", "Posição de impacto, limite de HIC nos assentos e capacete onde se usa"],
                ["Vias aéreas e pulmões", "Fumaça e fogo depois do impacto; o tempo para sair é curto", "Saber onde fica a saída, deixar a bagagem e evacuar em até 90 segundos"],
                ["Coração", "Doença prévia pode tirar o piloto de ação antes do impacto; a necropsia a procura", "Exame aeromédico em dia e declaração verdadeira do histórico"],
                ["Sangue e metabolismo", "Álcool, remédios e drogas aparecem na toxicologia; o álcool também pode surgir depois da morte", "Respeitar os prazos e colher várias amostras com cadeia de custódia"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '15.1',
      pergunta: "Pela ICAO, qual é o único objetivo da investigação de um acidente aeronáutico?",
      opcoes: [
        "Apontar o culpado",
        "Prevenir novos acidentes e incidentes",
        "Calcular a indenização",
        "Punir a empresa",
      ],
      correta: 1,
      explicacao: "A investigação é independente e separada de qualquer processo que busque culpa ou responsabilidade; no Brasil, o CBA repete a regra.",
    },
    {
      topico: '15.1',
      pergunta: "Em quanto tempo a ICAO espera o relatório final, quando possível?",
      opcoes: [
        "30 dias",
        "90 dias",
        "12 meses",
        "10 anos",
      ],
      correta: 2,
      explicacao: "O preliminar sai em 30 dias, o final em até 12 meses quando possível, e quem recebe recomendações responde em 90 dias.",
    },
    {
      topico: '15.2',
      pergunta: "Nos acidentes das empresas aéreas americanas de 1983 a 2000, quantos ocupantes sobreviveram?",
      opcoes: [
        "Cerca de 10%",
        "Cerca de 50%",
        "95,7%",
        "Nenhum",
      ],
      correta: 2,
      explicacao: "Dos 53.487 ocupantes, 95,7% sobreviveram; mesmo nos acidentes graves, 55,6% saíram vivos.",
    },
    {
      topico: '15.2',
      pergunta: "Nos acidentes graves do estudo do NTSB, o que matou mais?",
      opcoes: [
        "O fogo",
        "O impacto",
        "A hipóxia",
        "O frio",
      ],
      correta: 1,
      explicacao: "Foram 716 mortes por impacto e 131 pelo fogo: quase cinco vezes mais. Por isso a investigação olha estrutura, cintos e assentos.",
    },
    {
      topico: '15.3',
      pergunta: "Pela INTERPOL, o que costuma ser necessário para uma identificação conclusiva?",
      opcoes: [
        "Reconhecimento visual pela família",
        "Impressões digitais, arcada dentária ou DNA",
        "Documento encontrado no bolso",
        "A lista de passageiros",
      ],
      correta: 1,
      explicacao: "O reconhecimento visual não é considerado preciso; tatuagens, cicatrizes e implantes ajudam a confirmar.",
    },
    {
      topico: '15.3',
      pergunta: "Quais são as fases da identificação de vítimas de desastres?",
      opcoes: [
        "Local, post mortem, ante mortem e reconciliação",
        "Velório, enterro e luto",
        "Busca, resgate e transporte",
        "Notícia, entrevista e relatório",
      ],
      correta: 0,
      explicacao: "Os dados colhidos nos corpos são comparados com os registros reunidos com as famílias, médicos e dentistas.",
    },
    {
      topico: '15.4',
      pergunta: "Por que o álcool no sangue de uma vítima pode enganar?",
      opcoes: [
        "Porque evapora no avião",
        "Porque pode ser produzido no corpo depois da morte",
        "Porque o exame não detecta álcool",
        "Porque todo piloto tem álcool no sangue",
      ],
      correta: 1,
      explicacao: "Num estudo da FAA, 27% dos casos acima do limite vinham da produção depois da morte; por isso se comparam sangue, urina, humor vítreo e tecidos.",
    },
    {
      topico: '15.4',
      pergunta: "O que mudou na toxicologia dos pilotos mortos de 2009 a 2013, comparado com 1989 a 1993?",
      opcoes: [
        "Nada",
        "A presença de álcool ou drogas subiu 239%, com remédios e drogas ilícitas em alta",
        "O álcool desapareceu",
        "Os exames deixaram de ser feitos",
      ],
      correta: 1,
      explicacao: "O número de pilotos mortos caiu 37%, mas os remédios com receita e as drogas ilícitas apareceram mais; o álcool ficou estável.",
    },
    {
      topico: '15.5',
      pergunta: "No Brasil, o relatório do SIPAER pode ser usado como prova num processo?",
      opcoes: [
        "Sempre, sem restrição",
        "Nunca, em nenhuma hipótese",
        "Só se o juiz autorizar, depois de ouvir a autoridade do SIPAER",
        "Só se a empresa pedir",
      ],
      correta: 2,
      explicacao: "A autoridade do SIPAER tem 72 horas para se manifestar; o Supremo Tribunal Federal manteve essas regras em 2024.",
    },
    {
      topico: '15.5',
      pergunta: "Pelo Código de Processo Penal, quando o fato deixa vestígios, o que é indispensável?",
      opcoes: [
        "A confissão",
        "O exame de corpo de delito",
        "O relatório do SIPAER",
        "Uma testemunha",
      ],
      correta: 1,
      explicacao: "A confissão não substitui o exame, feito por perito oficial, e cada vestígio precisa de cadeia de custódia.",
    },
    {
      topico: '15.6',
      pergunta: "Até quando a empresa deve emitir a CAT depois de um acidente do trabalho sem morte?",
      opcoes: [
        "Até o primeiro dia útil seguinte",
        "Em 30 dias",
        "Em 1 ano",
        "Não precisa emitir",
      ],
      correta: 0,
      explicacao: "Na morte, a comunicação é imediata; se a empresa não comunicar, podem fazê-lo o acidentado, os dependentes, o sindicato, o médico ou uma autoridade.",
    },
    {
      topico: '15.6',
      pergunta: "Pelo Código de Processo Civil, o que o laudo pericial precisa conter?",
      opcoes: [
        "Só a conclusão",
        "A opinião pessoal do perito",
        "Objeto, análise, método aceito e resposta conclusiva a todos os quesitos",
        "Apenas fotografias",
      ],
      correta: 2,
      explicacao: "O laudo usa linguagem simples e coerente e não vai além do exame técnico.",
    },
  ],
};
