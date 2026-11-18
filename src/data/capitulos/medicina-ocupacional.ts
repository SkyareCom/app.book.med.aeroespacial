// Missão 3 · Voo 7 — Medicina ocupacional. Ramo editorial voo/M3V7; fotos e vídeo entram depois da produção.
// Os 5 itens previstos (riscos por função, PCMSO e PGR, insalubridade e periculosidade, RBAC 120 e retorno ao voo)
// viraram 5 tópicos. Mesmo padrão do M3V1 ao M3V6 e do M3V15.
// REGISTRO DE REVISÃO · 18/11/2026. Fontes primárias conferidas:
// NTSB, Preventing Turbulence-Related Injuries in Air Carrier Operations (2021), conforme Associated Press: 2009 a
//   2018, 111 acidentes por turbulência com ao menos um ferido grave; comissários 78,9% dos feridos graves.
// UNSCEAR e ICRP 132, conforme o registro do M1V5: tripulantes como 4º grupo de trabalhadores mais expostos à radiação.
// NR-7 (Portaria SEPRT 6.734/2020, alterada pela Portaria MTP 567/2022), conforme Guia Trabalhista: exames admissional,
//   periódico, de retorno (afastamento de 30 dias ou mais por doença ou acidente), de mudança de risco e demissional;
//   periódico anual para expostos e a cada 2 anos para os demais; demissional dispensado se o último exame tiver menos
//   de 135 dias (graus 1 e 2) ou 90 dias (graus 3 e 4); ASO apto ou inapto; PCMSO baseado no PGR e proibido para seleção;
//   relatório analítico anual; prontuário guardado por 20 anos.
// NR-1: gerenciamento de riscos ocupacionais e PGR (inventário de riscos e plano de ação).
// CLT, arts. 192 (insalubridade de 40%, 20% ou 10% do salário mínimo) e 193 (periculosidade de 30% do salário; opção
//   entre os adicionais). NR-15, Anexo 1: ruído de 85 dB(A) em 8 horas (Veja M1V6). NR-16, Anexo 2, conforme Guia
//   Trabalhista: postos de reabastecimento de aeronaves; área de risco do abastecimento: toda a área de operação.
// TST, Súmula 447 (11/12/2013): tripulantes e demais empregados que permanecem a bordo durante o abastecimento não têm
//   direito ao adicional de periculosidade. MTE, Análise de Impacto Regulatório do Anexo 2 da NR-16 (2026), conforme
//   CNI: recomendação de manter o texto atual.
// ICAO, Anexo 6, Parte I, 4.3.7: abastecimento com passageiros a bordo exige pessoal pronto para iniciar evacuação e
//   comunicação bidirecional entre a equipe de solo e a tripulação.
// RBAC 120 (texto da Emenda 02 publicado pelo SNA; números das taxas conferidos com o registro do M3V2, Emenda 04):
//   atividades de risco (120.1(b)), PPSP com subprogramas de educação, testes e resposta (120.301), representante e
//   supervisores treinados (120.309 e 120.311), tipos de teste (120.339), taxas aleatórias de 50%, 28% ou 250 testes e 7%
//   ou 560 testes, prazos pós-acidente de 8 horas para álcool e 32 horas para outras substâncias, confirmação e médico
//   revisor, avaliação por especialista (120.351), teste de retorno e ao menos 6 testes de acompanhamento nos primeiros
//   12 meses, por até 60 meses; contratados com mais de um mês incluídos.
// RBAC 67.15, conforme o registro do M3V1: diminuição da aptidão obriga a informar a ANAC ou o examinador e a deixar de voar.
// Lei 8.213/1991, art. 60: os primeiros 15 dias de afastamento ficam a cargo da empresa; depois, benefício do INSS.
// 14 CFR 61.57: 3 decolagens e 3 pousos nos 90 dias anteriores para levar passageiros.
// Dicas sem número próprio (levar o ASO e o CMA em dia, proteger a audição na rampa, combinar a volta gradual) são
//   aplicação das fontes acima e dos voos citados.
import type { Capitulo } from '../tipos';

export const medicinaOcupacional: Capitulo = {
  numero: 7,
  titulo: 'Medicina ocupacional',
  tempoLeituraMin: 14,
  topicos: [
    {
      id: '7.1',
      titulo: "Riscos por função",
      pergunta: "Que riscos à saúde cada profissional da aviação enfrenta no trabalho, do piloto ao agente de rampa, e por que eles não são os mesmos?",
      conteudo: {
        texto: [
          "A **medicina ocupacional** olha para o trabalho como causa de doença. Na aviação, ela convive com a medicina aeroespacial, mas faz outra pergunta: a aeromédica pergunta se a pessoa pode voar com segurança; a ocupacional pergunta o que o trabalho está fazendo com a saúde dela. Um mesmo aeroporto reúne **pilotos**, **comissários**, **mecânicos**, **agentes de rampa**, **abastecedores** e **controladores**, cada um com riscos próprios.",
          "Os **tripulantes** dividem riscos do voo: **fadiga** e ritmo biológico desregulado pelas escalas e fusos, **ruído** da cabine, ar seco, **radiação cósmica** e horas sentado (Veja M2V8, M1V6 e M1V1 - IV). A radiação os coloca entre os **trabalhadores mais expostos** do mundo, e a gestação pede cuidado redobrado (Veja M1V5 - I e M1V5 - III).",
          "Os **comissários** acrescentam o esforço físico: empurrar carrinhos pesados em corredor inclinado, guardar bagagem acima da cabeça e trabalhar em pé durante a **turbulência**. Nos Estados Unidos, de **2009 a 2018**, a turbulência causou **111 acidentes** com feridos graves em grandes aviões, e os comissários foram **78,9%** desses feridos graves, porque estão de pé quando o avião balança.",
          "No solo, o risco muda de cara. **Mecânicos** lidam com ruído de motor, combustível, fluidos hidráulicos, solventes, trabalho em altura e posturas forçadas dentro de compartimentos apertados. **Agentes de rampa** carregam malas em porões baixos, sob sol, chuva e frio, perto de motores ligados e de veículos em movimento. **Abastecedores** trabalham com inflamáveis. **Controladores** enfrentam turnos noturnos, atenção constante e estresse, sem o movimento do voo (Veja M2V8 - V).",
          "O **ruído** é o risco que atravessa quase todas as funções em terra: na rampa e no hangar, perto de motores e equipamentos, ele passa com facilidade do limite seguro, e a perda auditiva é lenta, silenciosa e permanente (Veja M1V6 - II e M1V6 - III). O mesmo vale para a **coluna**: carga manual repetida e posturas forçadas são a origem mais comum das dores que afastam do trabalho (Veja M2V12 - II).",
          "Para o **passageiro**, os riscos ocupacionais explicam por que o comissário pede que todos fiquem sentados com o cinto na turbulência: é a segurança dele também. Para o **trabalhador**, conhecer o risco da própria função é o primeiro passo para usar a proteção certa. Para o **médico do trabalho**, cada função tem uma lista própria de exames e de sinais a procurar.",
          "**Como prevenir e amenizar.** Use protetor auricular sempre que estiver perto de motores e equipamentos ligados. Na cabine, sente-se e prenda o cinto assim que o aviso de turbulência for dado, inclusive a tripulação. Peça ajuda e use equipamentos para cargas pesadas, dobrando os joelhos em vez das costas. Mantenha os exames ocupacionais em dia e conte ao médico do trabalho o que sente, mesmo que pareça pequeno.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v7-1-rampa.jpg'), legenda: "Na rampa, ruído, calor, carga e veículos fazem parte do trabalho de todo dia." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Riscos por função",
              colunas: ["Função", "Riscos principais", "Onde estudar"],
              linhas: [
                ["Piloto", "Fadiga, fuso, radiação, ruído e sedentarismo", "M2V8, M1V5 e M1V6"],
                ["Comissário", "Turbulência, carga, postura em pé, radiação e gestação", "M1V5 - III e M2V13 - II"],
                ["Mecânico", "Ruído, combustível, fluidos, altura e posturas forçadas", "M1V6 e M2V12"],
                ["Agente de rampa", "Carga manual, calor, frio, ruído e veículos", "M1V4 e M2V12 - II"],
                ["Abastecedor", "Inflamáveis e vapores de combustível", "M3V7 - III"],
                ["Controlador", "Turno noturno, atenção constante e estresse", "M2V8 - V e M2V7"],
              ],
            },
          },
          { paragrafo: 3, midia: 'riscos-funcao' },
          { paragrafo: 4, video: { fonte: require('@/assets/videos/m3v7-voo.mp4'), legenda: "Na rampa, o protetor auricular e o colete fazem parte do uniforme perto dos motores." } },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v7-1-comissaria.jpg'), legenda: "Empurrar carrinhos e trabalhar em pé na turbulência fazem do comissário o tripulante que mais se fere." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · riscos por função",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Trabalhador em terra", "Protetor auricular perto de motores e equipamentos para cargas pesadas"],
                ["Tripulante", "Sentar e prender o cinto no aviso de turbulência"],
                ["Médico do trabalho", "Exames e perguntas específicos para cada função"],
                ["Passageiro", "Ficar sentado com o cinto quando o aviso acender"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '7.2',
      titulo: "PCMSO e PGR",
      pergunta: "Que programas a empresa brasileira precisa ter para cuidar da saúde de quem trabalha, que exames eles exigem e qual a diferença entre o ASO e o certificado médico de voo?",
      conteudo: {
        texto: [
          "No Brasil, a saúde no trabalho começa por dois programas. O **PGR**, programa de gerenciamento de riscos da **NR-1**, faz o **inventário** dos perigos de cada função e o plano de ação para controlá-los. O **PCMSO**, programa de controle médico de saúde ocupacional da **NR-7**, é a parte médica: ele se baseia nos riscos que o PGR identificou e define quais exames cada trabalhador faz e quando. A lógica é a mesma do SMS: primeiro conhecer o perigo, depois controlá-lo (Veja M3V5 - I).",
          "A NR-7 prevê cinco exames: **admissional**, antes de começar; **periódico**, todo ano para quem está exposto aos riscos do PGR ou tem doença crônica que aumenta a vulnerabilidade, e a cada dois anos para os demais; **de retorno ao trabalho**, depois de afastamento de **30 dias ou mais** por doença ou acidente; **de mudança de risco**, antes de trocar de função ou de exposição; e **demissional**, até 10 dias depois do fim do contrato, dispensado se o último exame for recente.",
          "Cada exame termina num **ASO**, o atestado de saúde ocupacional, que diz se a pessoa está **apta** ou **inapta** para a função e lista os riscos e os exames feitos. O médico responsável faz um **relatório analítico** anual, com os exames, os resultados alterados, as doenças ocupacionais e as comunicações de acidente, e o discute com a comissão de prevenção de acidentes. O prontuário fica guardado por pelo menos **20 anos**, e o PCMSO não pode ser usado para **selecionar** pessoas.",
          "O tripulante tem **dois exames** que não se substituem. O **CMA**, emitido segundo o RBAC 67, diz se ele pode exercer os privilégios da licença com segurança para o voo (Veja M3V1 - I). O **ASO**, emitido segundo a NR-7, diz se o trabalho não está prejudicando a sua saúde e se ele está apto para a função. Um piloto pode ter CMA válido e precisar de acompanhamento no PCMSO por causa do ruído, ou estar apto no ASO e com o CMA vencido, sem poder voar.",
          "O PCMSO de uma empresa aérea olha para os riscos da aviação: **audiometria** para quem trabalha no ruído, avaliação da **coluna** para quem carrega peso, atenção à **fadiga** e ao **sono** de quem faz escalas noturnas e acompanhamento da **gestação** das tripulantes (Veja M1V6 - III, M2V8 - V e M2V13 - II). O relatório analítico mostra tendências: muitas perdas auditivas num setor indicam que a proteção está falhando ali, e não em cada pessoa.",
          "Para o **passageiro**, esses programas são invisíveis, mas garantem que quem cuida do avião e da cabine esteja acompanhado de perto. Para o **trabalhador**, o ASO é um direito: a empresa paga os exames e entrega uma cópia. Para o **médico do trabalho**, o PCMSO é uma ferramenta de prevenção coletiva, e não só uma sequência de exames individuais.",
          "**Como prevenir e amenizar.** Guarde as cópias do ASO e do CMA e acompanhe as datas dos dois. Antes de mudar de função ou de exposição, peça o exame de mudança de risco. Depois de 30 dias ou mais afastado, faça o exame de retorno antes de voltar. Na empresa, use o relatório analítico para achar os setores onde o risco escapa do controle e leve essa informação ao PGR.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v7-2-exame.jpg'), legenda: "O PCMSO define os exames de cada função a partir dos riscos que o PGR identificou." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Os exames da NR-7",
              colunas: ["Exame", "Quando", "Observação"],
              linhas: [
                ["Admissional", "Antes de começar a trabalhar", "Base para comparar os exames seguintes"],
                ["Periódico", "Todo ano para expostos aos riscos; a cada 2 anos para os demais", "Pode ser mais frequente a critério do médico"],
                ["Retorno ao trabalho", "Depois de 30 dias ou mais de afastamento por doença ou acidente", "Antes de reassumir a função"],
                ["Mudança de risco", "Antes de trocar de função ou de exposição", "Os exames seguem o novo risco"],
                ["Demissional", "Até 10 dias depois do fim do contrato", "Dispensado se o último exame tiver menos de 135 ou 90 dias, conforme o grau de risco"],
              ],
            },
          },
          { paragrafo: 3, midia: 'exames-pcmso' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "ASO e CMA",
              colunas: ["Item", "ASO (NR-7)", "CMA (RBAC 67)"],
              linhas: [
                ["Pergunta", "O trabalho está prejudicando a saúde? Está apto para a função?", "Pode exercer a licença com segurança para o voo?"],
                ["Quem emite", "Médico do trabalho ou examinador do PCMSO", "Médico examinador credenciado ou a ANAC"],
                ["Quem precisa", "Todo empregado", "Quem exerce licença aeronáutica"],
                ["Substitui o outro?", "Não", "Não"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v7-2-avaliacao.jpg'), legenda: "O inventário de riscos do PGR começa no local de trabalho, e não na sala do médico." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · PCMSO e PGR",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Trabalhador", "Guardar ASO e CMA e acompanhar as datas dos dois"],
                ["Empresa", "Manter o PGR atualizado e pagar os exames"],
                ["Médico do trabalho", "Usar o relatório analítico para achar setores de risco"],
                ["Comissão de prevenção", "Discutir o relatório e cobrar as ações"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '7.3',
      titulo: "Insalubridade e periculosidade",
      pergunta: "Quando o trabalho na aviação dá direito aos adicionais de insalubridade ou de periculosidade, quanto eles valem e por que o tripulante a bordo no abastecimento não recebe?",
      conteudo: {
        texto: [
          "A lei brasileira separa dois tipos de risco. A **insalubridade** é a exposição a agentes que adoecem aos poucos, acima dos limites de tolerância, como **ruído**, calor, frio, vibração e produtos químicos; ela está na **NR-15**. A **periculosidade** é o risco de um evento súbito e grave, como **explosão** ou incêndio com **inflamáveis**, eletricidade e explosivos; ela está na **NR-16**. Uma adoece devagar; a outra pode matar de uma vez.",
          "Os adicionais têm valores fixos na lei. A insalubridade paga **40%**, **20%** ou **10%** do **salário mínimo**, conforme o grau máximo, médio ou mínimo. A periculosidade paga **30%** do **salário**. Os dois **não se somam**: quem tem direito aos dois escolhe um. O adicional compensa o risco, mas não o elimina; a obrigação principal da empresa continua sendo **reduzir a exposição**.",
          "Na aviação, o **ruído** é o agente de insalubridade mais comum: a NR-15 fixa **85 dB(A)** para 8 horas, e quanto mais alto o som, menor o tempo permitido (Veja M1V6 - III). Na rampa e no hangar, perto de motores e equipamentos, esse limite é ultrapassado com facilidade. A **vibração** de corpo inteiro acima do limite também caracteriza insalubridade, e o protetor auricular certo e bem usado pode tirar o trabalhador da faixa de risco (Veja M1V6 - IV).",
          "O **abastecimento** é o caso clássico de periculosidade. A NR-16 inclui os postos de reabastecimento de aeronaves e considera **toda a área de operação** do abastecimento como área de risco, de modo que o adicional cabe a quem trabalha nela. Em **2026**, uma análise do Ministério do Trabalho sobre esse anexo recomendou **manter** o texto, porque o risco de um acidente com combustível continua alto.",
          "Para os tripulantes, a regra é outra. Desde **2013**, a **Súmula 447** do Tribunal Superior do Trabalho diz que os tripulantes e demais empregados de serviços auxiliares que **permanecem a bordo** durante o abastecimento **não têm direito** ao adicional de periculosidade. A ideia é que estar dentro do avião não é operar na área de abastecimento. Isso não muda o cuidado: com passageiros a bordo, a OACI pede pessoal pronto para iniciar uma evacuação e comunicação entre a equipe de solo e a tripulação.",
          "Para o **passageiro**, essas regras aparecem quando o avião é abastecido com pessoas a bordo: a tripulação fica pronta para iniciar uma evacuação, se for preciso. Para o **trabalhador**, o direito ao adicional depende de **perícia** no local, que mede a exposição real (Veja M3V15 - VI). Para o **médico do trabalho**, o adicional nunca substitui a proteção: o objetivo é que ninguém precise dele.",
          "**Como prevenir e amenizar.** Use o protetor auricular certo, bem colocado, durante toda a exposição ao ruído, e faça as audiometrias do PCMSO. Na área de abastecimento, siga os procedimentos, mantenha fontes de ignição longe e use o equipamento de proteção. Quando houver dúvida sobre o direito ao adicional, peça a perícia técnica no local. Na empresa, priorize reduzir o ruído e a exposição na fonte, antes de pagar por ela.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v7-3-abastecimento.jpg'), legenda: "Na área de abastecimento, o risco é súbito e grave: é o caso clássico de periculosidade." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Insalubridade e periculosidade",
              colunas: ["Item", "Insalubridade (NR-15)", "Periculosidade (NR-16)"],
              linhas: [
                ["Tipo de risco", "Agente que adoece aos poucos acima do limite", "Evento súbito e grave"],
                ["Exemplos na aviação", "Ruído, vibração, calor, frio e químicos", "Abastecimento e inflamáveis"],
                ["Valor", "40%, 20% ou 10% do salário mínimo", "30% do salário"],
                ["Somam?", "Não; o trabalhador escolhe um", "Não; o trabalhador escolhe um"],
              ],
            },
          },
          { paragrafo: 3, midia: 'adicionais-aviacao' },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Quem tem direito · exemplos",
              colunas: ["Situação", "Regra"],
              linhas: [
                ["Abastecedor na área de operação", "Periculosidade: toda a área de operação é de risco"],
                ["Tripulante a bordo durante o abastecimento", "Sem adicional de periculosidade (Súmula 447)"],
                ["Agente de rampa acima de 85 dB(A) sem proteção eficaz", "Insalubridade, conforme a perícia"],
                ["Mecânico com ruído e combustível", "Depende da perícia; se couberem os dois, escolhe um"],
              ],
            },
          },
          { paragrafo: 6, figura: { imagem: require('@/assets/images/topicos/m3v7-3-mecanico.jpg'), legenda: "Perto de motores ligados, o protetor auricular certo pode tirar o trabalhador da faixa de risco." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · insalubridade e periculosidade",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Trabalhador", "Protetor auricular bem colocado e audiometrias em dia"],
                ["Abastecedor", "Seguir procedimentos e afastar fontes de ignição"],
                ["Empresa", "Reduzir ruído e exposição na fonte antes de pagar por eles"],
                ["Passageiro", "Seguir as instruções durante o abastecimento com pessoas a bordo"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '7.4',
      titulo: "RBAC 120: álcool e drogas no trabalho",
      pergunta: "Quem precisa entrar no programa brasileiro contra o uso de álcool e drogas na aviação, como ele funciona e o que acontece depois de um teste positivo?",
      conteudo: {
        texto: [
          "O **RBAC 120** obriga empresas aéreas, operadores de serviços aéreos especializados, oficinas de manutenção e aeroportos a manter um programa de prevenção do uso indevido de **substâncias psicoativas**. Ele vale para quem faz **atividade de risco à segurança operacional**: tripulantes, mecânicos, abastecedores, agentes de segurança, bombeiros, quem calcula carga e combustível e quem trabalha na área operacional. Prestadores contratados por mais de um mês também entram.",
          "O programa tem três partes: **educação**, para que todos conheçam os efeitos e as regras; **testes toxicológicos**, para detectar o uso; e **resposta** aos eventos, para tirar a pessoa da atividade e encaminhá-la ao tratamento. A empresa nomeia um **representante** do programa e pode treinar **supervisores** para reconhecer sinais e encaminhar ao teste por suspeita. O detalhe das substâncias e do médico revisor está no voo de farmacologia (Veja M3V2 - IV).",
          "Os testes acontecem em seis momentos: **antes** de começar na atividade, de forma **aleatória**, **depois de acidente**, por **suspeita justificada**, no **retorno** e no **acompanhamento**. Uma empresa com até **500** pessoas nessas atividades testa ao acaso pelo menos **50%** delas por ano; empresas maiores seguem taxas menores, mas com um número mínimo de testes. Depois de um acidente, o teste de álcool precisa ser feito em até **8 horas** e o de outras substâncias em até **32 horas**.",
          "Um resultado positivo confirmado, ou a **recusa** do teste, é um **evento impeditivo**: a pessoa sai da atividade de risco no mesmo momento. Ela passa por uma **avaliação completa** com um especialista em dependência, que pode indicar orientação, aconselhamento, psicoterapia, remédio ou tratamento ambulatorial ou internado, e a empresa precisa permitir que ela siga essa indicação. A dependência é tratada como **doença**, não só como falta (Veja M2V7 - IV).",
          "A volta é controlada. Quando o especialista confirma que a pessoa cumpriu a indicação, ela faz um **teste de retorno**, que precisa ser negativo. Depois vêm os **testes de acompanhamento**, sem aviso prévio: pelo menos **6** nos primeiros **12 meses**, e o acompanhamento pode durar até **60 meses**. Quem tem licença também precisa estar apto no exame médico de voo, e a cultura justa pesa a favor de quem pede ajuda antes do teste (Veja M3V5 - II).",
          "Para o **passageiro**, o programa é uma garantia de que quem cuida do avião é testado ao acaso, e não só quando algo dá errado. Para o **trabalhador**, o caminho mais seguro é procurar ajuda **antes** do teste, pelo programa de apoio ou pelo médico (Veja M2V7 - VI). Para o **médico do trabalho** e o examinador, o programa é uma rede de proteção, e o tratamento bem-feito é o que devolve a pessoa ao trabalho.",
          "**Como prevenir e amenizar.** Conheça o programa da sua empresa e o nome do representante. Não trabalhe depois de beber nem sob efeito de qualquer substância, e guarde a receita dos remédios em uso para mostrar ao médico revisor. Se o uso estiver fora de controle, procure ajuda antes de um teste. Na empresa, treine supervisores, mantenha o sigilo dos resultados e apoie o tratamento indicado pelo especialista.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v7-4-teste.jpg'), legenda: "O teste aleatório alcança quem faz atividade de risco, e não só quem se envolveu num acidente." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "O programa do RBAC 120",
              colunas: ["Item", "Regra"],
              linhas: [
                ["Quem precisa ter", "Empresas aéreas, serviços aéreos especializados, oficinas e aeroportos"],
                ["Quem é testado", "Quem faz atividade de risco à segurança operacional, inclusive contratados por mais de um mês"],
                ["Partes", "Educação, testes toxicológicos e resposta aos eventos"],
                ["Pessoas-chave", "Representante, supervisores treinados, médico revisor e especialista"],
              ],
            },
          },
          { paragrafo: 3, midia: 'testes-rbac120' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Do teste positivo à volta ao trabalho",
              colunas: ["Etapa", "O que acontece"],
              linhas: [
                ["Positivo confirmado ou recusa", "Afastamento imediato da atividade de risco"],
                ["Avaliação pelo especialista", "Indicação de orientação, terapia, remédio ou tratamento"],
                ["Teste de retorno", "Só depois de cumprida a indicação; precisa ser negativo"],
                ["Acompanhamento", "Ao menos 6 testes sem aviso em 12 meses, por até 60 meses"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v7-4-conversa.jpg'), legenda: "Pedir ajuda antes do teste é o caminho mais seguro para voltar ao trabalho." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · RBAC 120",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Trabalhador", "Não trabalhar sob efeito de substância e pedir ajuda antes do teste"],
                ["Supervisor", "Reconhecer sinais e encaminhar ao teste por suspeita"],
                ["Empresa", "Manter sigilo e apoiar o tratamento indicado"],
                ["Médico", "Tratar a dependência como doença e acompanhar a volta"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '7.5',
      titulo: "Retorno ao voo",
      pergunta: "Depois de uma doença, uma cirurgia ou um acidente, que passos o tripulante percorre até voltar a voar com segurança?",
      conteudo: {
        texto: [
          "Voltar a voar depende de duas autorizações que não se confundem. A da **aviação**, pelo RBAC 67: quem percebe uma **diminuição da aptidão** precisa deixar de exercer a licença e informar a ANAC ou o médico examinador, e só volta quando a aptidão for recuperada (Veja M3V1 - I). A do **trabalho**, pela NR-7: depois de **30 dias ou mais** afastado por doença ou acidente, o empregado faz o **exame de retorno** antes de reassumir a função (Veja M3V7 - II).",
          "No caminho há também o lado previdenciário. Os **primeiros 15 dias** de afastamento ficam a cargo da empresa; a partir daí, o benefício é pago pelo **INSS**, depois da perícia. Quando o afastamento vem de um acidente ou de uma doença ligada ao trabalho, a empresa emite a **CAT**, e o nexo com o trabalho pode ser discutido em perícia (Veja M3V15 - VI).",
          "A animação mostra a ordem. O que decide a volta não é o fim do atestado, mas a **aptidão**: o corpo precisa ter recuperado o que o voo exige, e o remédio em uso precisa ser compatível com a cabine (Veja M3V2 - III). Depois de uma cirurgia, por exemplo, a dor, o curativo e o remédio para dor podem atrasar a volta mais do que a cicatriz (Veja M2V12 - III e M2V12 - V).",
          "A volta pode ser **gradual**. A própria NR-7 prevê que o médico avalie se o retorno deve ser progressivo, e na aviação isso pode significar treino no **simulador**, voos com um instrutor ou etapas mais curtas antes da escala completa. Há também a **experiência recente**: nos Estados Unidos, o piloto precisa de **3 decolagens e 3 pousos** nos 90 dias anteriores para levar passageiros, e muitos afastamentos passam desse prazo.",
          "Alguns retornos pedem mais cuidado. Depois de um problema de **saúde mental** ou de **dependência**, a volta costuma ser acompanhada por programa de apoio, por pares e por testes de acompanhamento (Veja M2V7 - VI e M3V7 - IV). Depois de um evento do **coração**, de um **desmaio** ou de uma **convulsão**, a decisão costuma passar pela autoridade aeromédica, com exames específicos (Veja M2V2 - III e M2V6 - II). Depois da **gestação**, o retorno considera o pós-parto e a amamentação (Veja M2V13 - III).",
          "Para o **passageiro**, esse caminho garante que o piloto que volta de licença médica voltou inteiro. Para o **tripulante**, a melhor estratégia é conversar cedo com o médico examinador e com o médico do trabalho, levando os laudos, em vez de esperar o fim do atestado. Para os **médicos**, o examinador e o médico do trabalho precisam conversar, porque cada um vê uma parte da mesma pessoa.",
          "**Como prevenir e amenizar.** Quando a aptidão diminuir, pare de voar e avise o examinador; não espere o próximo exame. Guarde laudos, exames e receitas do tratamento. Depois de 30 dias ou mais afastado, faça o exame de retorno da NR-7 e confirme que o CMA está válido. Combine com a empresa uma volta gradual, com simulador ou voo de readaptação, quando o afastamento for longo.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v7-5-retorno.jpg'), legenda: "O que decide a volta é a aptidão, e não apenas o fim do atestado." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Duas autorizações para voltar",
              colunas: ["Item", "Aviação (RBAC 67)", "Trabalho (NR-7)"],
              linhas: [
                ["Quando se aplica", "Sempre que a aptidão diminuir", "Afastamento de 30 dias ou mais por doença ou acidente"],
                ["O que exige", "Parar de voar e informar a ANAC ou o examinador", "Exame de retorno antes de reassumir a função"],
                ["Documento", "CMA válido", "ASO de retorno"],
              ],
            },
          },
          { paragrafo: 3, midia: 'animacao-retorno' },
          { paragrafo: 4, midia: 'retorno-situacoes' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v7-5-simulador.jpg'), legenda: "Depois de um afastamento longo, o simulador ajuda a recuperar a habilidade antes da escala completa." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · retorno ao voo",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Tripulante", "Parar de voar quando a aptidão diminuir e guardar laudos e receitas"],
                ["Empresa", "Oferecer volta gradual com simulador ou voo de readaptação"],
                ["Médico do trabalho", "Fazer o exame de retorno e conversar com o examinador"],
                ["Médico examinador", "Avaliar se o corpo e o remédio são compatíveis com o voo"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "O que acontece", "Proteção e prevenção"],
              linhas: [
                ["Ouvidos e audição", "Perda auditiva lenta e permanente na rampa e no hangar", "Protetor bem colocado e audiometria no PCMSO (Veja M1V6 e M2V3)"],
                ["Coluna, ossos e músculos", "Dor por carga manual, postura forçada e lesão na turbulência", "Equipamentos de carga, cinto na turbulência e retorno gradual (Veja M2V12)"],
                ["Sono e relógio biológico", "Fadiga de escalas noturnas e de turnos", "Escalas avaliadas e acompanhamento no PCMSO (Veja M2V8)"],
                ["Mente", "Estresse, uso de álcool e drogas e medo de perder a licença", "Programa do RBAC 120, apoio por pares e tratamento (Veja M2V7)"],
                ["Pele, pulmões e sangue", "Contato com combustível, solventes e fluidos", "Luvas, ventilação e exames do PCMSO conforme o PGR"],
                ["Radiação", "Dose cósmica acumulada pelos tripulantes", "Controle da dose e cuidado na gestação (Veja M1V5)"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '7.1',
      pergunta: "No estudo do NTSB de 2009 a 2018, que grupo somou cerca de 79% dos feridos graves por turbulência?",
      opcoes: [
        "Pilotos",
        "Comissários",
        "Passageiros sentados com cinto",
        "Mecânicos",
      ],
      correta: 1,
      explicacao: "Os comissários estão de pé quando o avião balança; sentar e prender o cinto no aviso protege toda a cabine.",
    },
    {
      topico: '7.1',
      pergunta: "Qual risco atravessa quase todas as funções em terra na aviação?",
      opcoes: [
        "Radiação cósmica",
        "Hipóxia",
        "Ruído",
        "Jet lag",
      ],
      correta: 2,
      explicacao: "Perto de motores e equipamentos, o ruído passa com facilidade do limite, e a perda auditiva é lenta e permanente.",
    },
    {
      topico: '7.2',
      pergunta: "Pela NR-7, depois de quanto tempo de afastamento por doença ou acidente é obrigatório o exame de retorno?",
      opcoes: [
        "7 dias",
        "15 dias",
        "30 dias ou mais",
        "1 ano",
      ],
      correta: 2,
      explicacao: "O exame é feito antes de reassumir a função, e o médico avalia se a volta deve ser gradual.",
    },
    {
      topico: '7.2',
      pergunta: "O ASO da NR-7 substitui o CMA do tripulante?",
      opcoes: [
        "Sim, sempre",
        "Não; um avalia a saúde no trabalho e o outro a aptidão para voar",
        "Só para comissários",
        "Só depois dos 40 anos",
      ],
      correta: 1,
      explicacao: "O CMA segue o RBAC 67; o ASO segue a NR-7. O tripulante precisa dos dois em dia.",
    },
    {
      topico: '7.3',
      pergunta: "Quanto vale o adicional de periculosidade?",
      opcoes: [
        "10% do salário mínimo",
        "20% do salário mínimo",
        "30% do salário",
        "100% do salário",
      ],
      correta: 2,
      explicacao: "A insalubridade paga 40%, 20% ou 10% do salário mínimo; os dois adicionais não se somam.",
    },
    {
      topico: '7.3',
      pergunta: "Pela Súmula 447 do TST, o tripulante que fica a bordo durante o abastecimento tem direito ao adicional de periculosidade?",
      opcoes: [
        "Sim, sempre",
        "Não",
        "Só em voos internacionais",
        "Só se for o comandante",
      ],
      correta: 1,
      explicacao: "Quem opera na área de abastecimento tem direito; estar dentro do avião não é operar nessa área.",
    },
    {
      topico: '7.4',
      pergunta: "Pelo RBAC 120, o que acontece com quem se recusa a fazer o teste toxicológico?",
      opcoes: [
        "Nada",
        "É tratado como evento impeditivo e afastado da atividade de risco",
        "Paga uma multa e continua",
        "Faz o teste no ano seguinte",
      ],
      correta: 1,
      explicacao: "A recusa equivale a um positivo confirmado: afastamento, avaliação por especialista e teste de retorno negativo.",
    },
    {
      topico: '7.4',
      pergunta: "Depois da volta ao trabalho, quantos testes de acompanhamento sem aviso o RBAC 120 exige nos primeiros 12 meses, no mínimo?",
      opcoes: [
        "1",
        "3",
        "6",
        "12",
      ],
      correta: 2,
      explicacao: "O acompanhamento pode durar até 60 meses, e quem está nele sai do sorteio dos testes aleatórios.",
    },
    {
      topico: '7.5',
      pergunta: "Pelo RBAC 67, o que o tripulante deve fazer quando percebe que a aptidão diminuiu?",
      opcoes: [
        "Esperar o próximo exame",
        "Deixar de voar e informar a ANAC ou o examinador",
        "Voar só à noite",
        "Tomar um remédio e seguir",
      ],
      correta: 1,
      explicacao: "Só volta quando a aptidão for recuperada; o fim do atestado não basta.",
    },
    {
      topico: '7.5',
      pergunta: "Quem paga os primeiros 15 dias de afastamento do empregado por doença?",
      opcoes: [
        "O INSS",
        "A empresa",
        "O próprio trabalhador",
        "A ANAC",
      ],
      correta: 1,
      explicacao: "A partir do 16º dia, o benefício passa a ser pago pelo INSS, depois da perícia.",
    },
  ],
};
