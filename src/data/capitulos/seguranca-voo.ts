// Missão 3 · Voo 5 — Segurança de voo. Ramo editorial voo/M3V5; fotos e vídeo entram depois da produção.
// Os 5 itens previstos (SMS, cultura justa, dados de voo, CENIPA e incapacitação em voo) viraram 5 tópicos. Mesmo
// padrão do M3V1 a M3V4 e do M3V15.
// REGISTRO DE REVISÃO · 17/11/2026. Fontes primárias conferidas:
// ICAO, Anexo 19 (1ª ed. 2013; 2ª ed. 2016): programa de segurança do Estado e SMS dos provedores. ICAO, Safety
//   Management Implementation (iKit), cap. 9: quatro componentes e doze elementos, válidos para qualquer porte.
// ICAO, Doc 9859, 4ª ed., conforme "Safety Risk Management Methodologies: Use of the Risk Matrix", v3.4 (nov/2023):
//   probabilidade 1 a 5 e severidade A a E; intolerável 5A 5B 5C 4A 4B 3A; tolerável 5D 5E 4C 4D 4E 3B 3C 3D 2A 2B
//   2C 1A; aceitável 3E 2D 2E 1B 1C 1D 1E.
// ANAC, PSOE-ANAC (Resolução 352/2015) dentro do programa do Estado brasileiro; programa próprio do Comando da Aeronáutica.
// Regulamento (UE) 376/2014: art. 2(12) cultura justa; art. 4(7) relato em 72 horas; art. 13 análise; art. 16(6) e
//   16(10) proteção e exceções (conduta dolosa; desprezo manifesto, severo e sério por risco óbvio).
// Reason J, Managing the Risks of Organizational Accidents (1997): cinco componentes da cultura de segurança e árvore
//   de decisão de culpabilidade com teste de substituição.
// Sindicato Nacional dos Aeronautas, Guia do RELPREV (2022), com base no MCA 3-3: relato voluntário, não punitivo,
//   confidencial, pode ser anônimo; Elo SIPAER; validação, desidentificação, avaliação, ação e retorno.
// UK CAA, CAP 739, Flight Data Monitoring: definição; padrão ICAO para mais de 27 t desde 1/1/2005, recomendação acima
//   de 20 t e helicópteros acima de 7 t ou 9 assentos com gravador; eventos (rotação, estol, GPWS, flapes, aproximação
//   rápida, alto ou baixo na rampa, pouso duro, aproximação não estabilizada, razão de descida alta); cultura não
//   punitiva; desidentificação; representante dos tripulantes; retreino discreto. ICAO APAC, guia FDAP: parte do SMS,
//   salvaguardas do Anexo 19, Apêndice 3, e política de não uso em processos disciplinares, civis, administrativos ou penais.
// SIPAER e CENIPA: aula "Filosofia SIPAER" (UNESP) e Decretos 69.565/1971 e 87.249/1982: serviço em 1951; sistema e
//   CENIPA em 19/11/1971; comitê nacional de prevenção em 1982; sete princípios; fatores humano (fisiológico e
//   psicológico), material e operacional.
// Números do CENIPA divulgados pela imprensa: 175 acidentes em 2024, maior número em dez anos (O Povo, 06/10/2025;
//   Jovem Pan); 470 de 789 mortes na aviação particular desde 2015 (IstoÉ). Voo 2283 (Vinhedo, 09/08/2024, 62 mortos):
//   relatório final apresentado em 23/07/2026, fatores conforme o Metrópoles (24/07/2026).
// DeJohn CA et al., FAA DOT/FAA/AM-04/16 (2004), In-flight medical incapacitation and impairment of U.S. airline pilots:
//   1993 to 1998: 39 incapacitações, 11 limitações, 47 aeronaves, 0,058 por 100.000 horas, probabilidade de acidente
//   0,04, dois acidentes não fatais, idade média 47; causas conforme Flight Safety Foundation (ASW, out/2007).
// Transport Canada, TP 11629, Pilot Incapacitation: sutil e óbvia; regra das duas chamadas; CHASE; aeródromo adequado
//   mais próximo; causas comuns.
// Dicas sem número próprio (relatar cedo, combinar chamadas, cruzar eventos com escalas) são aplicação das fontes acima
//   e dos voos citados.
import type { Capitulo } from '../tipos';

export const segurancaVoo: Capitulo = {
  numero: 5,
  titulo: 'Segurança de voo',
  tempoLeituraMin: 15,
  topicos: [
    {
      id: '5.1',
      titulo: "SMS: gerenciar o risco antes do acidente",
      pergunta: "O que é o sistema de gerenciamento da segurança operacional, como ele mede o risco e onde o corpo de quem voa entra nessa conta?",
      conteudo: {
        texto: [
          "Durante décadas, a segurança de voo aprendeu com os destroços: cada acidente investigado gerava uma regra nova. O **SMS** (*safety management system*, no Brasil **SGSO**, sistema de gerenciamento da segurança operacional) inverte a ordem e procura o perigo **antes** do acidente. Desde **2013**, o **Anexo 19** da ICAO pede que cada Estado tenha um **programa de segurança operacional** e que empresas aéreas, aeroportos, oficinas, escolas e controle de tráfego mantenham um SMS. No Brasil, a ANAC e o Comando da Aeronáutica têm programas próprios dentro do programa do Estado.",
          "O SMS tem **quatro componentes** e **doze elementos**, que valem para qualquer tamanho de empresa. A **política e os objetivos** começam pelo compromisso da direção e por quem responde pela segurança. O **gerenciamento do risco** identifica perigos e avalia e reduz riscos. A **garantia** mede o desempenho, controla as mudanças e melhora o sistema. A **promoção** cuida do treinamento e da comunicação. É o mesmo desenho do **FRMS**, que trata a fadiga como um risco a ser gerenciado com dados (Veja M2V8 - VI).",
          "O coração do SMS é separar **perigo** de **risco**. Perigo é a condição que pode causar dano: gelo na asa, uma pista curta, um piloto que dormiu pouco. Risco é a combinação da **probabilidade** de o dano acontecer com a sua **severidade**. No manual da ICAO, a probabilidade vai de **1**, extremamente improvável, a **5**, frequente, e a severidade vai de **E**, insignificante, a **A**, catastrófica. Cada risco cai numa região **intolerável**, **tolerável** com mitigação ou **aceitável**.",
          "O corpo de quem voa é um dos perigos que o SMS precisa enxergar. A **fadiga**, a **incapacitação súbita**, o **remédio** que dá sono, o **álcool** e o **sofrimento mental** escondido entram na lista de perigos como entram o vento de cauda e a falha de motor. A regra do **1%** da certificação médica é, na prática, uma conta de risco do mesmo tipo: probabilidade de o piloto falhar vezes a chance de essa falha virar acidente (Veja M3V1 - V, M3V2 e M2V7 - VI).",
          "A **garantia** é o que impede o SMS de virar papel. A empresa escolhe **indicadores de desempenho**, como relatos recebidos, aproximações não estabilizadas ou afastamentos por fadiga, e acompanha a tendência. Toda **mudança** relevante, uma rota nova de longa duração, outro tipo de avião, uma escala noturna, passa por avaliação de risco antes de começar. Quando um indicador piora, a direção precisa agir, e a decisão fica registrada.",
          "Para o **passageiro**, o SMS é invisível, mas está em cada decisão de atrasar um voo, trocar uma aeronave ou mudar uma escala. Para o **tripulante**, ele começa no relato: sem relatos, a empresa não vê os perigos. Para o **médico examinador** e o serviço médico da empresa, o SMS é o lugar onde o que se aprende no consultório, como a fadiga da escala ou o remédio mais usado, vira dado para prevenir (Veja M3V1 - IV).",
          "**Como prevenir e amenizar.** Trate o próprio corpo como parte do sistema: sono, remédios, álcool e doença são perigos que você conhece antes de qualquer outra pessoa. Relate as situações de risco, mesmo as que terminaram bem. Na empresa, avalie o risco de cada mudança de escala ou de rota antes de começar e acompanhe os indicadores. O médico leva ao SMS os padrões que vê nos exames, sem identificar ninguém.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v5-1-reuniao.jpg'), legenda: "O SMS procura o perigo antes que ele vire acidente." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Os quatro componentes do SMS · ICAO",
              colunas: ["Componente", "Elementos", "Onde o corpo entra"],
              linhas: [
                ["Política e objetivos", "Compromisso da direção, responsabilidades, pessoal-chave, plano de emergência e documentação", "Política de fadiga, álcool, remédios e apoio por pares"],
                ["Gerenciamento do risco", "Identificação de perigos; avaliação e redução dos riscos", "Fadiga, incapacitação e sofrimento mental entram como perigos"],
                ["Garantia", "Medição do desempenho, gestão da mudança e melhoria contínua", "Indicadores como afastamentos por fadiga e relatos médicos"],
                ["Promoção", "Treinamento, educação e comunicação", "Ensinar a reconhecer o próprio limite"],
              ],
            },
          },
          { paragrafo: 3, midia: 'matriz-risco' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Perigos do corpo no SMS",
              colunas: ["Perigo", "Risco no voo", "Mitigação típica"],
              linhas: [
                ["Fadiga", "Erro, lapso e microssono na fase crítica (Veja M2V8 - V)", "Limites de jornada, FRMS e descanso controlado"],
                ["Incapacitação súbita", "Perda de um piloto em voo", "Certificação médica, dois pilotos e treino de incapacitação"],
                ["Remédio e álcool", "Sonolência, reflexo lento e julgamento pior (Veja M3V2)", "Regras de afastamento e testes"],
                ["Sofrimento mental", "Atenção e decisão prejudicadas", "Apoio por pares e acesso a tratamento (Veja M2V7 - VI)"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v5-1-briefing.jpg'), legenda: "A avaliação de risco começa no briefing, antes de cada voo." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · SMS",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Tripulante", "Conferir sono, remédios, álcool e doença antes do voo e relatar riscos"],
                ["Empresa", "Avaliar o risco de cada mudança e acompanhar indicadores"],
                ["Médico", "Levar ao SMS os padrões dos exames, sem identificar ninguém"],
                ["Passageiro", "Aceitar atrasos e trocas como parte da segurança"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '5.2',
      titulo: "Cultura justa: relatar sem medo",
      pergunta: "Por que punir o erro honesto deixa a aviação menos segura, e onde fica a linha entre o erro e a conduta que não se tolera?",
      conteudo: {
        texto: [
          "Um SMS vive de relatos, e ninguém relata o que pode lhe custar o emprego. A **cultura justa** resolve esse impasse. Na definição da União Europeia, quem está na linha de frente **não é punido** por ações, omissões ou decisões compatíveis com a sua experiência e o seu treinamento, mas **negligência grave**, **violação deliberada** e **atos destrutivos** não são tolerados. Não é perdão para tudo: é uma linha clara, conhecida antes do erro.",
          "James **Reason**, o mesmo do queijo suíço, descreveu a cultura de segurança como a soma de cinco culturas: **informada**, de **relato**, **justa**, **flexível** e de **aprendizado** (Veja M3V4 - I). Para traçar a linha, ele propôs perguntas em ordem: havia intenção de causar dano? Havia álcool, droga ou doença? A regra foi violada de propósito? E o **teste de substituição**: outra pessoa com o mesmo treino, no mesmo lugar, faria o mesmo? Se sim, o problema está no sistema.",
          "A lei transforma a promessa em regra. Na Europa, as ocorrências obrigatórias são relatadas em até **72 horas**, e o Estado **não processa** infrações não premeditadas ou inadvertidas que só vieram à tona pelo relato; a proteção cai na **conduta dolosa** e no desprezo grave por um risco óbvio. No Brasil, o **RELPREV**, relato de prevenção do SIPAER, é **voluntário**, **não punitivo** e confidencial, e pode ser feito sem identificação (Veja M3V15 - I).",
          "A medicina testa a cultura justa todos os dias. O piloto que teme perder o certificado esconde a insônia, a tristeza, o remédio ou a dor no peito, e o que se esconde não é tratado. Programas de **apoio por pares** e regras claras de afastamento e retorno mostram que pedir ajuda não encerra a carreira (Veja M2V7 - VI). Na fadiga, a regra é a mesma: quem se declara **sem condições** de voar por cansaço está usando o sistema, não fugindo dele (Veja M2V8 - VI).",
          "A cultura justa não é só ausência de castigo; é **retorno**. O relato é validado, os dados que identificam a pessoa são retirados, o risco é avaliado, a área responsável age e quem relatou recebe a resposta, quando deixou contato. Se nada muda depois do relato, as pessoas param de relatar. Cada relato que volta como correção fecha um furo antes do acidente.",
          "Para o **passageiro**, a cultura justa significa que um erro visto a bordo vira lição para todos os voos, e não um segredo. Para o **tripulante**, significa poder dizer \"errei\" ou \"não estou bem\" sem medo, desde que não haja intenção nem descaso grave. Para o **médico examinador**, significa ser alguém a quem o piloto conta a verdade: a confiança no consultório é uma barreira de segurança.",
          "**Como prevenir e amenizar.** Relate erros, quase acidentes e situações de risco enquanto a memória está fresca. Declare quando não estiver em condições de voar, por cansaço, doença ou remédio. Na empresa, publique antes quais condutas não serão toleradas, responda a cada relato e use o teste de substituição antes de qualquer punição. O médico explica ao piloto o que acontece com cada informação e procura caminhos de tratamento que mantenham a pessoa no voo quando for seguro.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v5-2-relato.jpg'), legenda: "Ninguém relata o que pode lhe custar o emprego; a cultura justa muda essa conta." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "As perguntas de Reason, em ordem",
              colunas: ["Pergunta", "Se a resposta for sim", "Exemplo na aviação"],
              linhas: [
                ["Havia intenção de causar dano?", "Sabotagem ou ato destrutivo: não se tolera", "Desligar um sistema de propósito para prejudicar"],
                ["Havia álcool, droga ou doença?", "Separar abuso de substância de doença que precisa de tratamento", "Voar depois de beber ou com doença não declarada"],
                ["A regra foi violada de propósito?", "Ver se a regra era clara, possível e usada por todos", "Pular um item do checklist para ganhar tempo"],
                ["Outra pessoa faria o mesmo?", "Teste de substituição: o problema está no sistema", "Tela confusa que engana qualquer piloto"],
                ["Já aconteceu antes com a mesma pessoa?", "Treino ou acompanhamento, não castigo automático", "Erros repetidos na mesma manobra"],
              ],
            },
          },
          { paragrafo: 3, midia: 'arvore-culpa' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Proteção de quem relata",
              colunas: ["Item", "União Europeia (Reg. 376/2014)", "Brasil (SIPAER)"],
              linhas: [
                ["Prazo", "Ocorrências obrigatórias em até 72 horas", "RELPREV voluntário, sem prazo fixo"],
                ["Identidade", "Dados pessoais protegidos", "Pode ser anônimo; dados que identificam são retirados"],
                ["Punição", "Sem processo por infração inadvertida conhecida só pelo relato", "Não punitivo; análises do SIPAER não servem como prova"],
                ["Exceções", "Conduta dolosa e desprezo grave por risco óbvio", "Indício de crime é comunicado à polícia (Veja M3V15 - V)"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v5-2-conversa.jpg'), legenda: "Cultura justa é retorno: quem relatou fica sabendo o que mudou." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · cultura justa",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Tripulante", "Relatar cedo e declarar quando não estiver em condições"],
                ["Empresa", "Publicar a linha antes, responder aos relatos e usar o teste de substituição"],
                ["Médico", "Explicar o destino da informação e buscar tratamento compatível com o voo"],
                ["Passageiro", "Informar à tripulação o que viu de errado a bordo"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '5.3',
      titulo: "Dados de voo: o que o avião conta todos os dias",
      pergunta: "O que é o monitoramento de dados de voo, o que ele procura nos voos normais e como protege o piloto que aparece nos dados?",
      conteudo: {
        texto: [
          "O gravador de voo que se procura nos destroços registra também os voos que terminam bem. O **monitoramento de dados de voo** (**FDM**, ou FOQA) é o uso **sistemático** e **proativo** desses dados digitais, de voos de rotina, para melhorar a segurança. A ICAO tornou o programa **obrigatório** para aviões com mais de **27 toneladas** de peso máximo de decolagem a partir de **1º de janeiro de 2005**, e o recomenda acima de 20 toneladas e para helicópteros maiores que tenham gravador.",
          "O programa compara cada voo com limites definidos e marca os **eventos**: rotação rápida demais na decolagem, **alerta de estol**, alerta de proximidade do solo, velocidade acima do limite dos flapes, aproximação **rápida** ou **alta**, aproximação **não estabilizada**, razão de descida alta e **pouso duro**. Um evento isolado diz pouco; a **tendência**, num aeroporto, numa frota ou num horário, mostra onde o sistema está cedendo.",
          "Nada disso funciona sem confiança. O FDM opera numa cultura **não punitiva**: os dados são **desidentificados**, só um **representante dos tripulantes** pode, sob regras estritas, saber quem estava no voo para uma conversa confidencial, e um eventual retreino é discreto e não disciplinar. A política escrita deixa claro que os dados existem para a segurança, e não para processos disciplinares, civis ou penais (Veja M3V5 - II).",
          "O avião não grava o corpo, mas o corpo aparece nos dados. Eventos que se concentram no fim de jornadas longas, de madrugada ou depois de fusos cruzados apontam para a **fadiga**, e o FRMS usa justamente esse tipo de dado operacional junto com os relatos e as escalas (Veja M2V8 - VI). Correções de comando tardias ou exageradas podem ser sinal de **desorientação**, carga de trabalho alta ou cansaço, e não de falta de habilidade (Veja M2V5 - IV).",
          "Dados que ninguém analisa não protegem ninguém. O programa só cumpre o seu papel quando os eventos chegam ao **treinamento**, aos **procedimentos** e às **escalas**: um aeroporto com muitas aproximações altas ganha um briefing específico, uma frota com pousos duros revê a técnica, uma escala que concentra eventos é refeita. No Brasil, a investigação do acidente de Vinhedo, em 2024, apontou o uso insuficiente dos dados de voo entre os fatores organizacionais (Veja M3V5 - IV).",
          "Para o **passageiro**, os dados de voo são uma vigilância silenciosa sobre milhares de pousos que pareceram normais. Para o **tripulante**, aparecer num evento não é acusação: é a chance de entender o que aconteceu, numa conversa confidencial. Para o **médico examinador** e o serviço médico, os padrões de horário e de jornada ajudam a separar o problema de uma pessoa do problema de uma escala.",
          "**Como prevenir e amenizar.** Quando for chamado para conversar sobre um evento, conte também como estava o corpo: sono, fome, doença, remédio. Faça um relato junto, porque isso amplia a proteção. Na empresa, publique a política de proteção dos dados, cruze os eventos com as escalas e leve as tendências ao treinamento. O médico usa os padrões coletivos, sem nomes, para orientar a prevenção da fadiga.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v5-3-analista.jpg'), legenda: "O programa de dados de voo analisa voos normais para encontrar o risco antes do acidente." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Eventos típicos do monitoramento de dados de voo",
              colunas: ["Evento", "O que pode indicar", "Onde o corpo pode entrar"],
              linhas: [
                ["Aproximação não estabilizada", "Planejamento tardio da descida ou pressão para pousar", "Fadiga e carga de trabalho alta"],
                ["Pouso duro", "Técnica, vento ou pista", "Ilusão visual e cansaço no fim da jornada (Veja M2V5 - III)"],
                ["Alerta de estol", "Velocidade baixa, gelo ou configuração errada", "Atenção dividida e consciência situacional reduzida (Veja M3V4 - II)"],
                ["Alerta de proximidade do solo", "Trajetória baixa perto do terreno", "Desorientação e erro de percepção (Veja M2V5 - IV)"],
                ["Razão de descida alta", "Correção tardia de trajetória", "Lentidão por sono ou remédio (Veja M3V2)"],
              ],
            },
          },
          { paragrafo: 3, midia: 'eventos-fdm' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Dados de voo e gravadores de acidente",
              colunas: ["Item", "Monitoramento de dados de voo", "Gravadores na investigação"],
              linhas: [
                ["Quando se usa", "Em todos os voos de rotina", "Depois de acidente ou incidente grave"],
                ["Objetivo", "Achar tendências antes do acidente", "Reconstruir o que aconteceu (Veja M3V15 - I)"],
                ["Quem vê os nomes", "Só o representante dos tripulantes, sob regras", "A autoridade de investigação"],
                ["Proteção", "Desidentificação e política não punitiva", "Uso restrito à prevenção, salvo decisão judicial"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v5-3-conversa.jpg'), legenda: "Aparecer num evento é a chance de uma conversa confidencial, não uma acusação." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · dados de voo",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Tripulante", "Contar também sono, fome, doença e remédio na conversa sobre o evento"],
                ["Empresa", "Proteger os dados, cruzar eventos com escalas e levar tendências ao treino"],
                ["Médico", "Usar padrões coletivos, sem nomes, na prevenção da fadiga"],
                ["Passageiro", "Saber que voos normais também são analisados"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '5.4',
      titulo: "CENIPA e SIPAER: a prevenção no Brasil",
      pergunta: "Como nasceu o sistema brasileiro de prevenção de acidentes, em que princípios ele se apoia e o que os números mostram sobre onde está o risco?",
      conteudo: {
        texto: [
          "O Brasil investiga acidentes aéreos com objetivo de prevenção há mais de setenta anos. O **SIPAER** nasceu como serviço em **1951** e virou sistema em **1971**, quando o decreto de **19 de novembro** criou o **CENIPA**, o Centro de Investigação e Prevenção de Acidentes Aeronáuticos, em Brasília. Ligado à Força Aérea, ele coordena a prevenção na aviação **militar** e **civil**. Em **1982**, a reorganização do sistema criou o comitê nacional de prevenção, que reúne os órgãos e as empresas do setor.",
          "A **filosofia SIPAER** cabe em sete frases: todo acidente tem um **precedente**; o acidente resulta de uma **sequência de eventos**, nunca de uma causa isolada; a prevenção exige **mobilização geral**; ela serve para que se voe com segurança, e não para restringir o voo; os **chefes** são os principais responsáveis pelas medidas; a prevenção **não tem segredos** nem bandeiras; e **acusações e punições** agem contra a prevenção. É a cultura justa escrita décadas antes do nome (Veja M3V5 - II).",
          "O sistema funciona por **elos**. Cada empresa aérea, escola, oficina, aeroporto e unidade militar tem o seu **Elo SIPAER**, que recebe os **RELPREV**, avalia o risco, propõe medidas e devolve a resposta a quem relatou. As investigações terminam em **recomendações de segurança** dirigidas ao regulador, aos fabricantes, às empresas e às tripulações. A investigação é separada da polícia e da Justiça, e o que o SIPAER apura não serve para punir (Veja M3V15 - I e M3V15 - V).",
          "O SIPAER divide os fatores contribuintes em três áreas. O **fator humano** trata do lado biológico da pessoa, com aspectos **fisiológicos** e **psicológicos**: hipóxia, fadiga, doença, remédio, estresse e atenção. O **fator material** trata da aeronave, do projeto à fabricação e ao armazenamento. O **fator operacional** trata do desempenho no voo: instrução, manutenção, coordenação da tripulação, julgamento, planejamento e supervisão. É aqui que a medicina aeroespacial entra em cada investigação (Veja M3V4 - I).",
          "Os números mostram onde está o risco. Segundo dados do CENIPA, o Brasil teve **175 acidentes** em **2024**, o maior número em dez anos. Desde 2015, a **aviação particular** respondeu por quase **60%** das mortes, **470** de **789**. No mesmo ano de 2024, o acidente de **Vinhedo** matou **62** pessoas; o relatório final, apresentado em julho de **2026**, apontou gelo severo, alertas subestimados, falhas não registradas, cultura informal e dados de voo pouco usados.",
          "Para o **passageiro**, os relatórios finais do CENIPA são públicos e mostram o que mudou depois de cada acidente. Para o **tripulante** e o piloto particular, o RELPREV é a porta de entrada no sistema, e a aviação particular, onde há menos supervisão, é onde ele mais faz falta. Para o **médico**, os aspectos fisiológicos e psicológicos do fator humano pedem prontuários completos e exames bem documentados, porque podem ser requisitados pela investigação.",
          "**Como prevenir e amenizar.** Conheça o Elo SIPAER da sua empresa, escola ou aeroclube e use o RELPREV para qualquer situação de risco. Leia os relatórios finais e as recomendações do seu tipo de aviação. Na aviação particular, adote por conta própria o que a aviação comercial é obrigada a fazer: checklist, planejamento, limites pessoais e honestidade sobre o próprio corpo. O médico registra com clareza o que examinou e o que orientou.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v5-4-curso.jpg'), legenda: "O SIPAER coordena a prevenção na aviação militar e civil desde 1971." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Filosofia SIPAER",
              colunas: ["Princípio", "Na prática"],
              linhas: [
                ["Todo acidente tem um precedente", "Relatar o quase acidente de hoje"],
                ["Sequência de eventos, nunca causa isolada", "Procurar todos os fatores, do corpo à organização"],
                ["Mobilização geral", "Pilotos, mecânicos, médicos, controladores e passageiros"],
                ["Prevenir para voar, não para proibir", "Medidas que mantêm a operação segura"],
                ["Os chefes respondem pelas medidas", "A direção decide e registra"],
                ["Sem segredos nem bandeiras", "Compartilhar lições com outras empresas"],
                ["Acusações e punições prejudicam", "Proteger quem relata"],
              ],
            },
          },
          { paragrafo: 3, midia: 'fatores-sipaer' },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Números do CENIPA",
              colunas: ["Dado", "Número", "O que significa"],
              linhas: [
                ["Acidentes em 2024", "175", "Maior número em dez anos"],
                ["Mortes na aviação particular desde 2015", "470 de 789", "Quase 60% das mortes, com menos supervisão"],
                ["Acidente de Vinhedo, 2024", "62 mortos", "Fatores humanos, materiais e organizacionais somados"],
              ],
            },
          },
          { paragrafo: 6, figura: { imagem: require('@/assets/images/topicos/m3v5-4-hangar.jpg'), legenda: "O relatório final termina em recomendações que chegam ao hangar, à escala e ao treinamento." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · SIPAER",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Tripulante", "Conhecer o Elo SIPAER e usar o RELPREV"],
                ["Piloto particular", "Adotar checklist, planejamento e limites pessoais"],
                ["Médico", "Registrar com clareza exames e orientações"],
                ["Passageiro", "Consultar os relatórios finais, que são públicos"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '5.5',
      titulo: "Incapacitação em voo",
      pergunta: "Com que frequência um piloto fica incapacitado em pleno voo, por que a forma sutil é a mais perigosa e o que a tripulação faz quando isso acontece?",
      conteudo: {
        texto: [
          "**Incapacitação** é a perda da capacidade de cumprir qualquer tarefa a bordo; quando o piloto ainda faz parte do trabalho, mas pior, fala-se em **limitação**. A incapacitação **óbvia** é a que todos veem: perda de consciência, convulsão, dor forte, paralisia, às vezes com o corpo caído sobre os comandos. A **sutil** é a mais traiçoeira: o piloto continua sentado, de olhos abertos, mas perdeu o julgamento ou a habilidade, e o sinal pode aparecer só quando a carga de trabalho sobe.",
          "Um estudo da FAA com pilotos de empresas aéreas dos Estados Unidos, de **1993 a 1998**, contou **39 incapacitações** e **11 limitações** em **47** voos, uma taxa de **0,058** por **100 mil horas** de voo. A chance de um evento médico virar acidente foi de **0,04**: houve **dois acidentes**, sem mortes de passageiros. As causas mais comuns foram **perda de consciência**, problemas **gastrointestinais**, **neurológicos** e **cardíacos**; quatro pilotos morreram do coração. A idade média foi de **47 anos**.",
          "A forma sutil vem de dentro e de fora do corpo: **hipóxia**, **hipoglicemia**, **fadiga** extrema, **álcool**, remédios e fumaça ou gases tóxicos (Veja M2V1 - IV, M2V9 - II e M2V8 - V). Por isso existe a **regra das duas chamadas**: se o outro piloto não responde normalmente a **duas chamadas seguidas**, ou a **um alerta importante**, como estar abaixo da altitude de decisão, deve-se suspeitar de incapacitação e agir. A animação mostra essa regra num pouso.",
          "A resposta treinada cabe numa sequência que a autoridade canadense resume como **CHASE**: **controlar** o avião e manter altitude segura; pedir **ajuda**, declarando emergência e chamando a tripulação; **avaliar** o voo, o combustível e o melhor aeroporto; **prender** o colega, afastando o assento dele para trás; e **explicar** o plano ao controle e à tripulação. O destino passa a ser o **aeródromo adequado mais próximo**, e a cabine segue o mais perto possível do normal.",
          "Os **comissários** são a segunda linha. Eles prendem o piloto ao assento com os cintos de ombro, afastam o banco, oferecem **oxigênio**, fazem os primeiros socorros e, se houver, chamam um profissional de saúde entre os passageiros. O piloto que ficou sozinho não deve tentar cuidar do colega. A regra do **1%** da certificação conta justamente com esse segundo piloto: no voo com um só piloto, ninguém assume (Veja M3V1 - V).",
          "Para o **passageiro**, a lição é que dois pilotos treinados para a falha do outro tornam esse evento raro e quase sempre sem consequência. Para o **tripulante**, treinar a incapacitação no simulador e combinar as chamadas no briefing transforma o susto em procedimento. Para o **médico examinador**, cada causa da lista, do desmaio à hipoglicemia, é um item do exame que existe para tirar a surpresa da cabine (Veja M2V6 - III e M2V2 - III).",
          "**Como prevenir e amenizar.** Não voe com sintomas novos, de estômago, de cabeça ou do peito, e diga ao colega quando não estiver bem. Combine as chamadas no briefing e aplique a regra das duas chamadas sem constrangimento. Treine o CHASE e o papel dos comissários. O médico investiga desmaios, dor no peito e hipoglicemia antes de liberar o voo, e o piloto que tomou remédio novo espera o efeito ser conhecido (Veja M3V2 - III).",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v5-5-cabine.jpg'), legenda: "Na incapacitação sutil, o piloto continua sentado, mas deixa de responder como antes." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Incapacitação de pilotos de empresas aéreas · FAA, 1993 a 1998",
              colunas: ["Causa", "Incapacitações", "Observação"],
              linhas: [
                ["Perda de consciência", "9", "Desmaio e convulsão entram aqui (Veja M2V6 - III)"],
                ["Gastrointestinal", "6", "Cólica, vômito e diarreia (Veja M2V10 - III)"],
                ["Neurológica", "6", "AVC, enxaqueca e outras (Veja M2V6)"],
                ["Cardíaca", "5", "Quatro pilotos morreram (Veja M2V2 - III)"],
                ["Urológica", "3", "Cólica renal (Veja M2V14 - II)"],
              ],
            },
          },
          { paragrafo: 3, midia: 'animacao-duas-chamadas' },
          { paragrafo: 4, midia: 'incapacitacao-chase' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v5-5-comissaria.jpg'), legenda: "O comissário prende o piloto ao assento e oferece oxigênio enquanto o colega voa." } },
          { paragrafo: 6, video: { fonte: require('@/assets/videos/m3v5-voo.mp4'), legenda: "O copiloto percebe que o comandante não responde, assume os comandos e chama a tripulação." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · incapacitação",
              colunas: ["Quem", "O que fazer"],
              linhas: [
                ["Piloto", "Não voar com sintomas novos e aplicar a regra das duas chamadas"],
                ["Comissário", "Prender o piloto, afastar o assento, dar oxigênio e primeiros socorros"],
                ["Empresa", "Treinar incapacitação no simulador e o CHASE"],
                ["Médico", "Investigar desmaio, dor no peito e hipoglicemia antes de liberar"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "O que acontece", "Proteção e prevenção"],
              linhas: [
                ["Cérebro e sistema nervoso", "Desmaio, convulsão, AVC e desorientação tiram o piloto do comando", "Investigar o primeiro desmaio e treinar a desorientação (Veja M2V6 e M2V5)"],
                ["Coração e vasos", "Infarto e arritmia causam incapacitação óbvia em voo", "Controle dos fatores de risco e exame cardiológico (Veja M2V2)"],
                ["Sono e relógio biológico", "Fadiga gera lapsos, microssono e eventos nos dados de voo", "Escalas avaliadas no SMS e FRMS (Veja M2V8)"],
                ["Mente", "Sofrimento escondido por medo de punição", "Cultura justa e apoio por pares (Veja M2V7)"],
                ["Hormônios e metabolismo", "Hipoglicemia causa incapacitação sutil", "Refeições regulares e controle da glicose (Veja M2V9)"],
                ["Pulmões e oxigênio", "Hipóxia tira o julgamento sem aviso", "Oxigênio imediato e treino dos sintomas (Veja M2V1)"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '5.1',
      pergunta: "No SMS, o que define o risco?",
      opcoes: [
        "Só a severidade do pior resultado",
        "A probabilidade combinada com a severidade",
        "O número de voos por dia",
        "A opinião do comandante",
      ],
      correta: 1,
      explicacao: "Perigo é a condição que pode causar dano; risco é a probabilidade de o dano acontecer combinada com a sua severidade, e cai numa região intolerável, tolerável ou aceitável.",
    },
    {
      topico: '5.1',
      pergunta: "Quais são os quatro componentes do SMS da ICAO?",
      opcoes: [
        "Política e objetivos, gerenciamento do risco, garantia e promoção",
        "Pilotos, mecânicos, médicos e controladores",
        "Decolagem, cruzeiro, descida e pouso",
        "Multa, suspensão, cassação e prisão",
      ],
      correta: 0,
      explicacao: "O FRMS da fadiga usa o mesmo desenho de quatro componentes.",
    },
    {
      topico: '5.2',
      pergunta: "Na cultura justa, o que não é tolerado?",
      opcoes: [
        "Qualquer erro",
        "Relatar um quase acidente",
        "Negligência grave, violação deliberada e atos destrutivos",
        "Declarar-se cansado para voar",
      ],
      correta: 2,
      explicacao: "Ações, omissões e decisões compatíveis com a experiência e o treinamento não são punidas; a linha fica clara antes do erro.",
    },
    {
      topico: '5.2',
      pergunta: "O que pergunta o teste de substituição?",
      opcoes: [
        "Se o piloto pode ser trocado por outro na escala",
        "Se outra pessoa com o mesmo treino, no mesmo lugar, faria o mesmo",
        "Se o remédio pode ser trocado por outro",
        "Se o avião pode ser substituído",
      ],
      correta: 1,
      explicacao: "Se a resposta é sim, o problema está no sistema, e a correção vai para o procedimento, a tela ou o treinamento.",
    },
    {
      topico: '5.3',
      pergunta: "Desde 2005, a ICAO exige programa de dados de voo para aviões acima de qual peso máximo de decolagem?",
      opcoes: [
        "5,7 toneladas",
        "27 toneladas",
        "100 toneladas",
        "Nenhum, é sempre voluntário",
      ],
      correta: 1,
      explicacao: "Acima de 20 toneladas e em helicópteros maiores com gravador, o programa é recomendado.",
    },
    {
      topico: '5.3',
      pergunta: "Quem pode saber quais tripulantes estavam num voo com evento?",
      opcoes: [
        "Toda a diretoria",
        "Os passageiros",
        "Só o representante dos tripulantes, sob regras estritas",
        "A imprensa",
      ],
      correta: 2,
      explicacao: "Os dados são desidentificados, e a conversa com o tripulante é confidencial; o retreino, quando há, não é disciplinar.",
    },
    {
      topico: '5.4',
      pergunta: "Quando foi criado o CENIPA?",
      opcoes: [
        "1951",
        "1971",
        "1982",
        "2014",
      ],
      correta: 1,
      explicacao: "O SIPAER nasceu como serviço em 1951 e virou sistema em 1971, com o CENIPA; em 1982 foi reorganizado.",
    },
    {
      topico: '5.4',
      pergunta: "Segundo dados do CENIPA, qual segmento respondeu por quase 60% das mortes desde 2015?",
      opcoes: [
        "Aviação regular",
        "Táxi aéreo",
        "Aviação particular",
        "Aviação militar",
      ],
      correta: 2,
      explicacao: "Foram 470 de 789 mortes, num segmento com menos supervisão do que a aviação comercial.",
    },
    {
      topico: '5.5',
      pergunta: "O que diz a regra das duas chamadas?",
      opcoes: [
        "O piloto deve falar duas vezes com o controle antes de pousar",
        "Sem resposta normal a duas chamadas seguidas, ou a um alerta importante, suspeite de incapacitação",
        "Os comissários chamam a cabine duas vezes por voo",
        "O passageiro pode chamar a tripulação duas vezes",
      ],
      correta: 1,
      explicacao: "A incapacitação sutil não se anuncia: o piloto continua sentado, mas deixa de responder como deveria.",
    },
    {
      topico: '5.5',
      pergunta: "No estudo da FAA de 1993 a 1998, qual foi a chance de um evento médico do piloto virar acidente?",
      opcoes: [
        "0,04",
        "0,5",
        "1",
        "Nenhuma informação",
      ],
      correta: 0,
      explicacao: "Houve dois acidentes, sem mortes de passageiros: o segundo piloto treinado assume o voo.",
    },
  ],
};
