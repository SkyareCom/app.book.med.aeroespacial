// Missão 2 (Sistemas) · Voo 7 — Saúde mental e comportamento (o número do voo é definido em secoes.ts).
// Escrito no modelo de Sistemas (docs/modelo-sistemas.md), com o detalhamento prático do padrão do jet lag, em
// 04/11/2026, a pedido do autor ("Siga para o próximo voo"). A lista antiga (depressão e ansiedade, humor e
// personalidade, álcool e drogas, avaliação psicológica, apoio por pares) ganhou o tópico de abertura e virou 6 tópicos.
// A insônia e os remédios para dormir já estão no M2V8; aqui entram resumidos, com remissão.
//
// REGISTRO DE REVISÃO (04/11/2026) — fontes:
// - ICAO, Doc 8984, 3ª ed. (PDF enviado pelo autor), Part III, Cap. 9 (Mental health): 9.1.3 (Anexo 1, 6.3.2.2 e
//   6.3.2.2.1: sem transtornos mentais que impeçam o exercício seguro; depressão tratada com antidepressivo: inapto, salvo
//   avaliação individual); 9.1.5 (perceber a posição, avaliar e decidir, ter capacidade física e vontade de agir); 9.3.1
//   (testes psicológicos raramente úteis como triagem; testes de personalidade sozinhos não preveem transtorno); 9.5.1–9.5.7
//   (depressão: humor baixo, pouca energia, concentração e memória piores, decisão difícil; o suicídio pode chegar a 20%
//   por episódio; incapacitação sutil; cerca de 50% de chance de novo episódio; recaída mais provável nos 2 primeiros anos;
//   mania: impedimento de longo prazo; hipomania: inapto); 9.6.1–9.6.4 (esquizofrenia e delírio: impedem; transtorno
//   psicótico breve: menos de 1 mês, estável por 1 ano sem antipsicótico pode ser certificado); 9.7.2–9.7.3 (transtorno com
//   ansiedade: impede até 6 meses sem sintomas e sem psicotrópico; reação a estresse: inapto temporário; perguntar sobre
//   álcool); 9.8.1–9.8.4 (transtorno de personalidade e de controle de impulsos: raramente compatíveis); 9.10.9 (sedativos
//   de curta ação para insônia ocasional: 8 a 12 h antes de tarefa de aviação); 9.11.3 (o tripulante nem sempre conta que
//   toma remédio); 9.12.3, 9.12.7, 9.12.9–9.12.10 (álcool, maconha, opioides, anfetaminas, sedativos e alucinógenos são as
//   substâncias mais usadas; proibir antes do voo, tradicionalmente 12 h, ou mais conforme a intoxicação; cerca de 7% da
//   população ocidental com dependência ou abuso de álcool); 9.12.11 (mais de uma infração por dirigir alcoolizado sugere
//   dependência); 9.12.15–9.12.18 (sobriedade tradicional de 3 anos; programas com pares, empresa, médico e autoridade
//   devolvem pilotos ao voo em 3 a 4 meses, com acompanhamento de ao menos 2 anos; rompe a "conspiração do silêncio");
//   Apêndice 2 (antidepressivos ISRS: dose estável há pelo menos 4 semanas, efeitos mínimos, sem outro psicotrópico, sem
//   ideação suicida, sem psicose, sono normal; restrição a voo com copiloto; parar de voar se a dose mudar; ao retirar o
//   remédio, parar durante a retirada e mais 2 semanas; proibição absoluta faz o aviador esconder a doença).
// - ANAC, RBAC 67, Emenda 05, 67.75 (1ª classe; 67.115, 67.195 e 67.235 equivalentes): os mesmos transtornos do Anexo 1;
//   (c) depressão com antidepressivo: inapto, salvo parecer do psiquiatra; (e)–(f) atestado psicológico com parecer
//   sobre personalidade, atenção, memória e raciocínio; (g) parecer psiquiátrico no exame inicial, pós-acidente,
//   pós-incidente grave ou a pedido; (h) avaliação psicológica no inicial, pós-acidente, pós-incidente grave e a cada 5
//   anos. RBAC 120, Emenda 02 (texto do SNA): PPSP; exames prévio, aleatório, pós-acidente, por suspeita justificada,
//   de retorno e de acompanhamento; resultado positivo ou recusa é evento impeditivo; avaliação por especialista; ao
//   menos 6 exames de acompanhamento nos 12 meses depois do retorno. Valor de corte: [confirmar na referência] (definido
//   no programa, não no texto da emenda consultada).
// - FAA: 14 CFR 91.17(a) (não atuar como tripulante até 8 h depois de bebida alcoólica, sob influência, sob droga que
//   afete as faculdades, ou com 0,04 g/dL ou mais). Antidepressant Protocol (AIN Online, 07/05/2024): fluoxetina,
//   sertralina, escitalopram, citalopram (desde 2010), bupropiona (maio de 2023), desvenlafaxina, duloxetina e venlafaxina
//   (abril de 2024); um só remédio; 6 meses estável na mesma dose, sem efeito colateral significativo; autorização
//   especial caso a caso. HIMS (AOPA Pilot Protection Services, 2020): criado no início dos anos 1970 por ALPA e FAA;
//   avaliação costuma vir de segunda infração por dirigir alcoolizado, ou da primeira com 0,15 ou mais, ou recusa;
//   tratamento interno de ao menos 28 dias; abstinência total; testes aleatórios, acompanhamento semanal, avaliações
//   anuais; monitoramento típico de 5 a 7 anos. FAA Safety Briefing, Fit to Fly (2023): checklist IMSAFE (doença,
//   remédio, estresse, álcool nas últimas 24 h, fadiga, alimentação e emoção); não levar os problemas para o voo; ser
//   honesto com o examinador.
// - EASA, Regulamento (UE) 2018/1042 (Halldale, 04/02/2021): testes de álcool, programa de apoio por pares não punitivo
//   e confidencial, avaliação psicológica e prevenção de comportamento de risco; obrigatório desde 14/02/2021; nasceu da
//   força-tarefa que se seguiu ao relatório do BEA sobre o voo 9525 da Germanwings (2015).
// - Wu et al., Environmental Health, 14/12/2016 (EurekAlert): questionário anônimo, 1.848 pilotos; 12,6% com provável
//   depressão; 4,1% com pensamentos suicidas nas duas semanas anteriores; mais depressão com remédio para dormir e com
//   assédio.
// - UK Civil Aviation Authority, guidance for health professionals, Psychiatric conditions: condição estável e remédio
//   tomado regularmente; comportamento imprevisível, agressivo, desorganizado ou perturbador contraindica o voo; psicose
//   bem controlada pode precisar de acompanhante (pessoa confiável ou profissional); liberação por telefone ou MEDIF.
// - Aerospace Medical Association, Medical Guidelines for Airline Travel (2003), psiquiatria: claustrofobia e medo de voar;
//   ansiedade pode virar hiperventilação; ansiolítico só se já usado antes sem problema; nunca prescrever remédio para o
//   voo que a pessoa não tenha usado antes; terapia cognitivo-comportamental funciona para muitos; desintoxicar antes de
//   viajar quem tem abuso de álcool ou drogas; psicose estável com acompanhante; avisar a companhia se viajar sozinho.
// - BEA, relatório final do voo 9525 da Germanwings (março de 2016): o copiloto derrubou o avião de propósito em
//   24/03/2015, com 150 mortos; tinha transtorno mental não declarado à autoridade. [confirmar na referência]
// - CONASS (Conselho Nacional de Secretários de Saúde): CVV, ligação gratuita pelo 188, 24 horas.
// - Surto psicótico em voo (acrescentado em 04/11/2026, a pedido do autor: "Inserir abordagem a surtos psicóticos em
//   voo"): Joshi KG, In-flight psychiatric emergencies: what you should know, Current Psychiatry 2019;18(12), com base em
//   Martin-Gill, Doyle e Yealy, JAMA 2018;320(24):2580-90: sintomas psiquiátricos e intoxicação ou abstinência, cada um,
//   até 3% das emergências em voo; o voluntário diz a formação à tripulação e não atua sob álcool, droga ou remédio que
//   afete o julgamento; criar vínculo, perguntar história, substâncias (tipo, quantidade, horário), psicotrópicos, dose,
//   última dose e se estão a bordo; desescalada verbal primeiro; vigiar sinais vitais, estado mental, intoxicação ou
//   abstinência e respiração; hidratação e oxigênio se preciso; se falhar, benzodiazepínico ou antipsicótico, se houver;
//   o kit exigido pela FAA (AC 121-33B) não precisa ter antipsicótico, naloxona nem benzodiazepínico; se agressivo,
//   protocolo de segurança da empresa, que pode incluir contenção ou pouso alternado; "a segurança tem prioridade sobre o
//   tratamento"; o comandante decide o pouso alternado com o despacho; dificuldade respiratória: apoio médico em solo.
//   AsMA, Medical Emergencies: Managing In-flight Medical Events (revisão de julho de 2016), kit médico recomendado:
//   antipsicótico (ex.: haloperidol) e sedativo anticonvulsivante injetável ou intranasal.
//   Convenção de Tóquio (1963), art. 6: o comandante pode impor medidas razoáveis, inclusive contenção, para proteger a
//   aeronave e as pessoas, manter a ordem ou entregar a pessoa às autoridades; pode pedir ajuda a tripulantes e
//   passageiros; qualquer tripulante ou passageiro pode agir sem autorização se for imediatamente necessário; art. 10:
//   quem age conforme a Convenção não responde pelo tratamento dado à pessoa contida.
//   Código Brasileiro de Aeronáutica (Lei 7.565/1986), art. 168: o comandante pode desembarcar quem comprometa a boa
//   ordem, a disciplina ou a segurança (texto literal: [confirmar na referência]).
// Condutas práticas sem número próprio (respirar devagar, avisar a tripulação, pedir água em vez de bebida, conversar com
// um colega) são aplicações das fontes acima. Sem fonte: [confirmar na referência].
// - Doenças, tratamentos e tipo de voo (acrescentado em 10/11/2026, a pedido do autor: "As doenças devem aparecer no
//   texto e nao em tabelas isoladas / Todas com seus tratamentos indocados e influenciados pelos voos / Entrararem ma
//   liberacao para voos / Prognostico relacionado ao voo / Periodo indicado de adiamento ou tepouso etc / Tratamentos
//   cirurgicos ou invasivos destacados ou enfatizados" e "Tratamentos exectantes e nao invasivos também devem entrar"):
//   FAA, Guide for Aviation Medical Examiners, Item 47, Antidepressants (consultado em 10/11/2026): sem sintomas ou
//   história de psicose, ideação suicida, eletroconvulsoterapia, ISRS combinados ou outros psicotrópicos; ao parar o
//   remédio, ao menos 60 dias sem ele, com relatório favorável. A página cita estabilidade clínica de 3 meses contínuos;
//   o texto mantém os 6 meses do protocolo noticiado em 2024 [confirmar na referência]. AvWeb, 28/05/2026: a FAA
//   acrescentou ao AME Guide orientações sobre psicoterapia ("Counseling or therapy is encouraged when medically
//   appropriate"). Psychiatric Times, Travel and serious mental illness: desidratação e calor podem levar à intoxicação
//   pelo remédio; exames de lítio e clozapina no destino; antipsicótico de depósito com data ajustada à viagem; fuso e
//   horário dos remédios; só a psicose aguda com perigo para si ou outros impede a viagem. Elmenhorst et al., Thorax,
//   03/05/2024 (WebMD, 17/06/2024): 48 adultos; após álcool moderado, sono em câmara com pressão de cabine: saturação
//   abaixo de 90% em 201 de 240 minutos e frequência cardíaca mediana de 88 bpm. Comparador "tipo de voo": hipóxia acima
//   de 10.000 ft (Veja M2V1), restrição a voo com copiloto (ICAO, Apêndice 2) e um só piloto no helicóptero são
//   aplicações das fontes acima; prazo de viagem do passageiro após eletroconvulsoterapia: [confirmar na referência].

import { liberacaoMente } from '../liberacao/mente';
import type { Capitulo } from '../tipos';

const foto = (arquivo: number, legenda: string) => ({ imagem: arquivo, legenda });

export const mente: Capitulo = {
  numero: 7,
  titulo: 'Saúde mental e comportamento',
  tempoLeituraMin: 40,
  topicos: [
    {
      id: '7.1',
      titulo: 'A mente no voo',
      pergunta: 'Por que a cabeça conta tanto quanto o corpo?',
      conteudo: {
        texto: [
          "Pilotar exige três coisas da **mente**: saber onde se está no espaço, avaliar o voo e **decidir** um caminho seguro, e ter a capacidade e a **vontade** de executar a decisão. Qualquer coisa que pese sobre uma dessas três, por menor que seja, aparece justamente na **emergência**, quando tudo acontece depressa e longe do chão.",
          "O voo soma pressões que a mente sente: **sono curto** e fuso (Veja M2V8), jornada longa, cabine apertada, longe de casa, e a falta de oxigênio, que deixa o raciocínio mais lento antes de dar sintomas (Veja M2V1 - IV). Quem já está ansioso, triste ou bebendo para dormir chega ao voo com menos margem.",
          "Os transtornos mentais são **comuns** também entre pilotos. Num questionário anônimo com 1.848 pilotos de linha, **12,6%** tinham sinais de provável **depressão**, e **4,1%** contaram ter tido pensamentos de morte nas duas semanas anteriores. A depressão foi mais frequente entre quem usava remédio para dormir e entre quem tinha sofrido **assédio**.",
          "O maior risco, muitas vezes, é **esconder**. A ICAO reconhece que proibir de forma absoluta faz o aviador evitar o tratamento ou não declarar a doença, e que o tripulante nem sempre conta ao examinador o remédio que toma. Por isso as autoridades caminharam para regras que permitem **tratar e voltar**: antidepressivos aceitos com acompanhamento e programas de apoio por pares.",
          "Para o tripulante, a regra é a mesma em toda a missão: o que pesa é a chance de **incapacitação**, súbita ou sutil. A ANAC e a ICAO listam os transtornos mentais que impedem a licença quando atrapalham o exercício seguro; a decisão é sempre individual, com psiquiatra e psicólogo. Para o passageiro, o ponto central é estar **estável** e com o tratamento em dia.",
          "**Doenças, tratamentos e tipo de voo.** As doenças da mente que mais pesam no voo são a **depressão**, a **ansiedade** e o **medo de voar**, o **transtorno bipolar** e as **psicoses**, e o uso de **álcool** e outras substâncias. O tratamento vai do **expectante**, com acompanhamento nas reações leves ao estresse, ao **não invasivo**, que resolve a maioria dos casos: **psicoterapia**, como a terapia cognitivo-comportamental, e remédios. O tratamento **invasivo** é raro e fica para os casos graves: a **internação** e a **eletroconvulsoterapia**, feita sob anestesia. Tratada cedo, a doença costuma permitir a volta ao voo; escondida, piora e afasta por mais tempo. No avião **não pressurizado**, a hipóxia acima de 10.000 ft soma lentidão ao raciocínio; no **helicóptero**, muitas operações têm um só piloto, e a restrição a voar com copiloto, comum na liberação, não se cumpre.",
          "**Como prevenir e amenizar.** Antes de cada voo, passe pelo checklist **IMSAFE** da FAA: doença, remédio, estresse, álcool nas últimas 24 horas, fadiga, alimentação e emoção. Não leve os problemas para o cockpit: se a cabeça não está no voo, diga. Durma, coma e beba água. O passageiro ansioso planeja a viagem com calma, leva o tratamento em dia e avisa a tripulação se precisar de ajuda.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 6, midia: 'tipo-voo-mente' },
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v7-1-checklist.jpg'), 'Antes de conferir o avião, o piloto confere a si mesmo.') },
          { paragrafo: 2, midia: 'imsafe' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'O que muda em altitude',
              colunas: ['Fator do voo', 'O que acontece com a mente', 'Quem é mais vulnerável'],
              linhas: [
                ['Menos oxigênio', 'Raciocínio e decisão mais lentos, antes de qualquer sintoma', 'Quem já está cansado, ansioso ou sob remédio: planejar e decidir estão entre as primeiras funções do cérebro a falhar com pouco oxigênio; cansaço, ansiedade e sedativo já as reduzem, e a hipóxia soma'],
                ['Sono curto e fuso', 'Humor pior, mais irritação, mais erro', 'Quem tem depressão ou ansiedade: o sono ajuda a regular o humor; nessas doenças o sono e o relógio biológico já costumam estar alterados, e a privação deixa o controle das emoções mais frágil'],
                ['Jornada longa e longe de casa', 'Isolamento e estresse acumulado', 'Tripulante com problemas pessoais: o estresse prolongado mantém o cortisol e a adrenalina altos, piora o sono e consome a atenção que sobraria para o voo'],
                ['Álcool e remédio para dormir', 'Julgamento e reflexos piores no dia seguinte', 'Quem bebe ou usa sedativo para dormir: álcool e sedativo deprimem o cérebro e fragmentam o sono profundo; o efeito dura além do que se sente, e no dia seguinte atenção e reflexos seguem lentos'],
                ['Cabine fechada e lotada', 'Medo, claustrofobia, hiperventilação', 'Passageiro com medo de voar: o medo dispara a adrenalina, a respiração acelera e o gás carbônico do sangue cai; vêm formigamento, tontura e falta de ar, que aumentam o medo'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v7-1-hotel.jpg'), 'Pernoite longe de casa, fuso e sono curto pesam sobre o humor.') },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Como prevenir e amenizar · a mente no voo',
              colunas: ['Momento', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Antes", "Tratamento em dia; viagem planejada com calma: pressa e imprevisto pioram a ansiedade", "Checklist IMSAFE; sono em dia, porque estresse e cansaço tiram a atenção"],
                ["Remédios", "Só os que já usou antes, no horário: remédio novo pode reagir mal no voo", "Só os aceitos pela autoridade, porque muitos psicotrópicos dão sono ou lentidão"],
                ["Álcool", "Moderação; nada de beber para dormir: o álcool fragmenta o sono e soma-se aos remédios", "Nada nas horas antes do voo (FAA: 8 h; IMSAFE: 24 h), porque o efeito no julgamento dura mais que a sensação"],
                ["Durante", "Água, respiração calma, avisar a tripulação se precisar: a ajuda cedo evita que a crise cresça", "Dizer quando a cabeça não está no voo, porque a distração é incapacitação sutil"],
                ["Depois", "Procurar ajuda se o medo ou o humor pesarem: tratados, deixam de limitar as viagens", "Conversar com um colega ou com o programa de apoio, porque tratar cedo devolve ao voo mais rápido"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '7.2',
      titulo: 'Depressão e ansiedade',
      pergunta: 'O piloto que toma antidepressivo pode voar?',
      conteudo: {
        texto: [
          "A **depressão** traz humor baixo, pouca energia, concentração e memória piores, perda de interesse, pensamento lento, **dificuldade de decidir**, mudança de sono e apetite, culpa e autoestima baixa. Ela vai e volta: há dias bons no meio, e o tripulante pode parecer apto. Mas a lentidão e a indecisão continuam, e é isso que pesa numa emergência.",
          "É uma doença que **volta**: quem teve um episódio sério tem cerca de **50%** de chance de ter outro, e a recaída é mais provável nos **2 primeiros anos**. O risco mais grave é o **suicídio**. Muitos tentam aliviar a tristeza e a insônia com álcool ou remédio por conta própria, o que piora tudo. A **ansiedade** traz preocupação constante, tensão e atenção presa nos sintomas.",
          "Para o tripulante, a ANAC e a ICAO não aceitam, de início, depressão tratada com antidepressivo; o psiquiatra pode liberar depois de avaliar o caso. A ICAO orienta: com um **ISRS** aceito, dose **estável há pelo menos 4 semanas**, efeitos mínimos, sem pensamento suicida, sem psicose e com sono normal, a autoridade pode liberar, em geral com **copiloto**. Se a dose mudar, para de voar; ao retirar o remédio, fica em solo durante a retirada e mais **2 semanas**.",
          "A **FAA** aceita **8 antidepressivos**: fluoxetina, sertralina, citalopram e escitalopram, bupropiona, desvenlafaxina, duloxetina e venlafaxina, **um de cada vez**, depois de **6 meses** estável na mesma dose e sem efeito colateral importante, com autorização especial. Na **ansiedade**, a ICAO pede **6 meses** sem sintomas e sem remédio psicotrópico; a reação a um estresse forte, como luto ou separação, afasta por um tempo e é reavaliada depois.",
          "Voar deprimido ou em crise de ansiedade é voar com **incapacitação sutil**: mais lento, distraído, indeciso. Para o tripulante, esconder o diagnóstico ou o remédio do examinador é infração à norma e pode invalidar o certificado. Para o passageiro, a depressão e a ansiedade **estáveis** não impedem o voo; o **medo de voar** pode virar hiperventilação a bordo e tem tratamento: a terapia cognitivo-comportamental funciona para muitas pessoas.",
          "**Tratamentos, prognóstico e prazos.** Na depressão leve e na reação ao estresse, a conduta pode ser **expectante**, com acompanhamento. O tratamento **não invasivo** é a base: **psicoterapia**, que também trata o **medo de voar** e o pânico, e **antidepressivo**, de preferência um **ISRS**. O tratamento **invasivo**, a **eletroconvulsoterapia**, fica para a depressão grave ou resistente; para o tripulante, tê-la feito **exclui** a via do antidepressivo pelo examinador da FAA, e a decisão passa à autoridade. Os prazos do tripulante: mudar a dose tira do voo; ao parar o remédio, solo durante a retirada e mais **2 semanas** (ICAO), ou **60 dias** sem o remédio (FAA); a ansiedade pede **6 meses** sem sintomas e sem remédio. O passageiro em crise ou com pensamentos de morte **adia** a viagem e procura ajuda. A ICAO aceita o ISRS estável com restrição a voar com copiloto; no **helicóptero** de um só piloto e no avião leve **não pressurizado**, essa restrição muitas vezes não se cumpre.",
          "**Como prevenir e amenizar.** Procure tratamento cedo: quanto antes, mais rápido se volta. Tripulante, fale com o examinador antes de começar o remédio e siga o protocolo da autoridade. Passageiro com medo de voar: aprenda técnicas de respiração antes, sente-se no corredor se a cabine aperta e conte à tripulação. Ansiolítico só se você já usou antes, sem problema; nunca teste um remédio novo no voo. Se pensar em se machucar, peça ajuda agora: no Brasil, o **CVV** atende pelo **188**, de graça, 24 horas.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · depressão e ansiedade",
              colunas: ["Situação", "O que fazer"],
              linhas: [
                ["Tristeza ou ansiedade que não passa", "Procurar tratamento cedo; tripulante fala com o examinador antes do remédio"],
                ["Medo de voar", "Terapia cognitivo-comportamental; respirar devagar; avisar a tripulação"],
                ["Em uso de antidepressivo", "Tomar no horário, ajustado ao fuso; levar receita e relatório"],
                ["Mudança de dose ou retirada", "Tripulante fica em solo até estabilizar"],
                ["Pensamento de morte", "Não voar; CVV 188 ou ajuda médica imediata"],
              ],
            },
          },
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v7-2-consulta.jpg'), 'Tratar cedo e contar ao examinador é o caminho mais curto de volta ao voo.') },
          { paragrafo: 2, midia: 'animacao-antidepressivo' },
          { paragrafo: 3, midia: 'prazo-antidepressivo' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · depressão e ansiedade',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Depressão ou ansiedade estável, em tratamento", "Pode voar, com o remédio no horário: parar de repente traz abstinência e recaída", "Avaliação psiquiátrica; ANAC: inapto salvo parecer do psiquiatra, porque a depressão deixa lento e indeciso"],
                ["Antidepressivo aceito, dose estável", "Pode voar: o remédio estável não muda o risco do passageiro", "ICAO: 4 semanas estável, em geral com copiloto; FAA: 6 meses, um dos 8 remédios, para provar que não há efeito colateral nem recaída"],
                ["Mudou a dose ou está retirando o remédio", "Pode voar: avise o médico se a viagem coincidir com a troca", "Não voar até estabilizar (ICAO: retirada + 2 semanas), porque a troca traz efeitos e risco de recaída"],
                ["Ansiedade tratada, sem remédio", "Pode voar: sem crise, a ansiedade não muda o risco", "ICAO: 6 meses sem sintomas e sem psicotrópico, porque a crise pode voltar sob estresse"],
                ["Pensamento suicida", "Procure ajuda agora (CVV 188): a vida vem antes da viagem", "Não voar; ajuda imediata, porque o risco é para si e para todos a bordo"],
                ["Medo de voar", "Pode voar; terapia ajuda: o medo não é perigoso, e a crise de respiração se controla", "Não se aplica, porque quem pilota com medo incapacitante é avaliado como ansiedade"],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v7-2-medo.jpg'), 'O medo de voar pode virar hiperventilação; respirar devagar e avisar a tripulação ajudam.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Remédios e voo · depressão e ansiedade',
              colunas: ['Remédio ou classe', 'Efeito que importa no voo', 'Tripulante (FAA/ANAC)'],
              linhas: [
                ["Fluoxetina, sertralina, citalopram, escitalopram", "Efeitos no início do uso; abstinência se parar de repente", "FAA: aceitos com 6 meses estável; ANAC: parecer do psiquiatra, porque o início pode trazer sono, agitação e risco de recaída"],
                ["Bupropiona, desvenlafaxina, duloxetina, venlafaxina", "Idem", "FAA: aceitos com 6 meses estável, um só remédio, porque combinar aumenta os efeitos"],
                ["Outros antidepressivos (tricíclicos e outros)", "Mais efeitos colaterais que os ISRS", "Em geral não aceitos (ICAO), porque dão sono, tontura e arritmia"],
                ["Ansiolíticos e sedativos", "Sono e reflexos lentos", "Não aceitos para voar; passageiro só se já usou antes, porque dão sono e lentidão"],
                ["Combinação de psicotrópicos", "Somam efeitos", "Não aceita (FAA; ICAO), porque os efeitos se somam e a doença costuma ser mais grave"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '7.3',
      titulo: 'Bipolar, psicose e personalidade',
      pergunta: 'Por que alguns diagnósticos encerram a carreira de piloto?',
      conteudo: {
        texto: [
          "Na **mania**, a pessoa fica grandiosa, eufórica, com muita energia, **dorme pouco**, se distrai e julga mal; pode chegar a delírios, irritação e risco para si e para outros. A **hipomania** tem os mesmos sinais, mais fracos. No **transtorno bipolar**, mania e depressão se alternam. O problema para o voo é a **recaída imprevisível**, mesmo com estabilizador de humor.",
          "As **psicoses**, como a **esquizofrenia**, alteram o pensamento e a percepção: vozes, desconfiança, delírios, perda de interesse e concentração. Costumam começar na juventude, por volta dos 20 anos, depois de anos de sinais discretos. O **transtorno psicótico breve** tem os mesmos sintomas por menos de **um mês**, em geral depois de um estresse forte, e passa por completo.",
          "Os **transtornos de personalidade** são padrões rígidos e problemáticos de comportamento, presentes a vida adulta inteira, que costumam incomodar mais os outros que a própria pessoa. Os **transtornos de controle dos impulsos**, a incapacidade de frear um impulso mesmo vendo o prejuízo, são especialmente incompatíveis com uma função de segurança como a de piloto.",
          "Para o tripulante, a regra é dura e igual na ANAC e na ICAO. A **mania**, isolada ou no bipolar, leva a **impedimento de longo prazo**; a **hipomania** também torna inapto. **Esquizofrenia** e transtornos delirantes impedem a licença. O **transtorno psicótico breve** pode ser aceito depois de **1 ano** estável sem antipsicótico. Transtornos de personalidade, salvo raras exceções, não são compatíveis com o ambiente da aviação.",
          "Para o passageiro, o que decide é a **estabilidade**. Quem tem psicose bem controlada pode voar, às vezes com um **acompanhante** que garanta o remédio e ajude se houver problema; nos casos mais difíceis, um profissional de saúde. Comportamento **imprevisível, agressivo, desorganizado ou perturbador** contraindica o voo, e a companhia pode recusar o embarque. O médico e a companhia combinam a liberação pelo **MEDIF**.",
          "**Surto a bordo: como abordar.** Sintomas psiquiátricos respondem por até **3%** das emergências médicas em voo, e intoxicação ou abstinência por outro tanto. A **tripulação** conduz a situação e avisa o comandante; o profissional de saúde que se oferece diz a sua formação e não atua se bebeu ou tomou remédio que afete o julgamento. O primeiro passo é a **conversa**: criar vínculo, tentar acalmar e perguntar pelo diagnóstico, pelos remédios, pela última dose e se eles estão a bordo. Depois, procurar outra causa: **álcool e drogas**, intoxicação ou abstinência, sinais vitais e respiração, com água e oxigênio se preciso.",
          "Se a conversa não basta, o médico voluntário pode considerar um **benzodiazepínico** ou um **antipsicótico**, se houver no kit: o kit mínimo exigido pela FAA não precisa ter nenhum dos dois, e a AsMA recomenda incluir haloperidol e um sedativo injetável. Se o passageiro fica **agressivo**, a **segurança vem antes do tratamento**: a tripulação segue o protocolo da empresa, que pode incluir **contenção** ou **pouso alternado**. Pela Convenção de Tóquio, o comandante pode impor medidas razoáveis, inclusive contenção, e pedir ajuda a tripulantes e passageiros; pelo Código Brasileiro de Aeronáutica, pode desembarcar quem põe o voo em risco. Quem decide o pouso alternado é o comandante, com o despacho da empresa.",
          "**Tratamentos, prognóstico e tipo de voo.** O transtorno bipolar e as psicoses não têm conduta expectante: o tratamento **não invasivo** é contínuo, com **estabilizador do humor**, como o **lítio**, ou **antipsicótico**, e psicoterapia. O **invasivo** é a **internação** na crise e, nos casos graves, a **eletroconvulsoterapia**. Para o passageiro, o prognóstico no voo depende da **estabilidade**: quem está estável voa; quem está em crise, agitado ou com risco para si ou para outros **adia** até a alta e a liberação do psiquiatra. O lítio pede cuidado extra: a **desidratação** pode levar à **intoxicação** pelo remédio, então beba água e evite álcool no voo. Quem toma antipsicótico de depósito combina a data da injeção com a viagem. Para o tripulante, a psicose breve pode ser liberada depois de **1 ano** estável sem antipsicótico; a mania leva a impedimento de longo prazo. No avião leve **não pressurizado** e no **helicóptero**, não há tripulação de cabine para ajudar numa crise.",
          "**Como prevenir e amenizar.** Mantenha o remédio no horário, ajustado ao fuso com o médico, e leve o suficiente na bagagem de mão. Durma antes do voo e evite álcool. Viaje com quem conhece a sua rotina e avise a companhia se for sozinho. Se surgir agitação a bordo, peça ajuda à tripulação cedo, antes de a crise crescer.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 8,
            tabela: {
              titulo: "Remédios e voo · bipolar e psicose",
              colunas: ["Remédio ou tratamento", "Efeito que importa no voo", "Passageiro e tripulante"],
              linhas: [
                ["Lítio", "Desidratação pode levar à intoxicação", "Passageiro: beber água, evitar álcool, porque a desidratação pode intoxicar; tripulante: a doença de base impede"],
                ["Antipsicótico oral", "Sono e reflexos lentos em parte das pessoas", "Passageiro: dose no horário, porque o atraso traz recaída; tripulante: psicose breve só após 1 ano sem antipsicótico (ICAO)"],
                ["Antipsicótico de depósito", "Injeção em data marcada", "Passageiro: combinar a data com a viagem, para não atrasar a injeção e perder o controle"],
                ["Internação ou eletroconvulsoterapia", "Tratamento da crise grave", "Passageiro: voar só com alta e liberação, porque a crise recente pode voltar; tripulante: decisão da autoridade"],
              ],
            },
          },
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v7-3-acompanhante.jpg'), 'Com a doença estável, um acompanhante de confiança torna a viagem mais segura.') },
          { paragrafo: 2, midia: 'quadros-psiquiatricos' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · bipolar, psicose e personalidade',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Transtorno bipolar estável", "Pode voar, com o remédio no horário: sono curto e fuso podem disparar uma crise", "Inapto: impedimento de longo prazo (ICAO; ANAC), porque a mania tira o julgamento sem aviso"],
                ["Hipomania", "Avaliação antes de voar: pode virar mania no meio da viagem", "Inapto (ICAO), porque a euforia leva a decisões arriscadas"],
                ["Esquizofrenia ou delírio estável", "Pode voar, às vezes com acompanhante: ele garante o remédio e ajuda se houver crise", "Inapto (ICAO; ANAC), porque a percepção e o julgamento podem falhar"],
                ["Psicose breve, recuperada", "Pode voar: recuperada, a crise não muda o risco", "ICAO: 1 ano estável sem antipsicótico, para confirmar que não volta"],
                ["Comportamento imprevisível ou agressivo", "Não voar: põe em risco a própria pessoa, os passageiros e a tripulação", "Inapto, porque a segurança da cabine depende do autocontrole"],
                ["Transtorno de personalidade", "Conforme o comportamento: o que pesa é a segurança a bordo", "Em geral incompatível (ICAO), porque o padrão rígido atrapalha o trabalho em equipe e as decisões"],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v7-3-comissaria.jpg'), 'Pedir ajuda à tripulação cedo evita que a agitação cresça.') },
          { paragrafo: 6, midia: 'surto-bordo' },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Kit médico a bordo · remédios para agitação',
              colunas: ['Kit', 'Antipsicótico', 'Benzodiazepínico ou sedativo'],
              linhas: [
                ['Mínimo exigido pela FAA', 'Não obrigatório', 'Não obrigatório'],
                ['Recomendado pela AsMA', 'Sim (ex.: haloperidol)', 'Sedativo injetável ou intranasal'],
              ],
            },
          },
          {
            paragrafo: 9,
            tabela: {
              titulo: 'Como prevenir e amenizar · bipolar e psicose',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Antes', 'Remédio no horário, ajustado ao fuso; sono em dia'],
                ['Planejar', 'Acompanhante que conheça a rotina; MEDIF se a companhia pedir'],
                ['Bagagem de mão', 'Remédios e relatório médico'],
                ['A bordo', 'Sem álcool; avisar a tripulação cedo se vier agitação'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '7.4',
      titulo: 'Álcool e outras substâncias',
      pergunta: 'Quantas horas depois de beber o piloto pode voar?',
      conteudo: {
        texto: [
          "O **álcool** é a droga mais disponível do mundo, e muitos o usam contra a ansiedade ou para dormir, justamente os efeitos que pioram o julgamento e os reflexos. Nos países ocidentais, cerca de **7%** da população tem **dependência** ou abuso de álcool. Depois dele, as substâncias mais usadas são maconha, opioides, anfetaminas, sedativos e alucinógenos.",
          "A **dependência** é beber mais do que se quer, não conseguir parar apesar dos problemas, precisar de mais para o mesmo efeito e ter abstinência. Quem depende raramente conta a verdade sobre quanto bebe; quem tem **mais de uma infração** por dirigir alcoolizado é forte suspeito. Nos testes do RBAC 120, quem dá positivo ou se recusa fica impedido até passar por avaliação de especialista.",
          "A regra para o tripulante tem números. A **FAA** proíbe atuar até **8 horas** depois de qualquer bebida alcoólica, sob influência de álcool ou droga, ou com **0,04 g/dL** ou mais no sangue ou no ar expirado. A ICAO lembra que a tradição é **12 horas**, mas que uma intoxicação maior pede mais tempo; o checklist IMSAFE da FAA pergunta por álcool nas últimas **24 horas**. No Brasil, o **RBAC 120** obriga as empresas a ter um programa de prevenção, com exames prévios, **aleatórios**, depois de acidente e por suspeita.",
          "Dependência e abuso suspendem o certificado. A ICAO cita como tradição **3 anos** de sobriedade, mas programas com colegas, empresa, médico e autoridade devolvem pilotos ao voo em **3 a 4 meses**, com acompanhamento de pelo menos **2 anos**. Nos EUA, é o programa **HIMS**, criado nos anos 1970 por pilotos e FAA: tratamento interno de ao menos **28 dias**, abstinência total, testes aleatórios e monitoramento que costuma durar de **5 a 7 anos**.",
          "Voar sob efeito é voar com o julgamento comprometido, e é **infração** à norma. Para o passageiro, usar o álcool para dormir no voo não ajuda o sono, e o comportamento perturbador pode impedir o voo. Quem tem dependência deve se **desintoxicar antes** de viajar, para não ter abstinência em pleno voo. Remédio para dormir também conta: sedativos de curta ação pedem **8 a 12 horas** antes de qualquer tarefa de aviação (Veja M2V8).",
          "**Tratamentos, prognóstico e tipo de voo.** No uso eventual, a conduta é de hábito: respeitar os prazos e não beber antes de voar. Na **dependência**, o tratamento começa pela **desintoxicação**, que o passageiro deve fazer **antes** de viajar, porque a **abstinência** também causa emergências a bordo. Segue com tratamento **não invasivo**, com psicoterapia, grupos e **abstinência total**, e às vezes com **internação**, de ao menos **28 dias** no programa HIMS. O prognóstico é bom com acompanhamento: programas com colegas, empresa, médico e autoridade devolvem pilotos ao voo em **3 a 4 meses**, com acompanhamento de ao menos **2 anos**. Na cabine **pressurizada**, num estudo em câmara, quem dormiu depois de beber passou **201 de 240 minutos** com a saturação de oxigênio abaixo de **90%**. No avião **não pressurizado** acima de 10.000 ft, a hipóxia soma-se ao álcool no julgamento; no **helicóptero**, valem as mesmas **8 horas** e **0,04 g/dL**.",
          "**Como prevenir e amenizar.** Tripulante: nada de álcool nas horas antes do voo, contando com folga, e nunca beber para dormir no pernoite. Se a bebida virou problema, procure o programa da empresa ou o programa de apoio por pares: a volta ao voo existe, e o silêncio é o que mais custa. Passageiro: beba água, modere o álcool, e quem está em tratamento de dependência viaja com o tratamento em dia e, se preciso, com acompanhante.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · álcool e substâncias",
              colunas: ["Situação", "Efeito que importa no voo", "Passageiro e tripulante"],
              linhas: [
                ["Bebida antes de dormir no voo", "Saturação abaixo de 90% em boa parte do sono, na câmara", "Passageiro: evitar, porque o sono com álcool baixa o oxigênio na cabine; tripulante: proibido nas 8 h antes"],
                ["Abstinência de álcool", "Pode causar emergência a bordo", "Passageiro: desintoxicar antes de viajar, porque a abstinência causa tremor, agitação e convulsão a bordo"],
                ["Sedativos e opioides", "Somam efeito ao álcool", "Tripulante: não voar sob efeito, porque somam-se ao álcool e à hipóxia"],
                ["Tratamento da dependência", "Internação de ao menos 28 dias e abstinência total (HIMS)", "Tripulante: volta com testes e acompanhamento por anos, porque a recaída é o maior risco"],
              ],
            },
          },
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v7-4-agua.jpg'), 'No pernoite antes do voo, água no lugar da bebida.') },
          { paragrafo: 2, midia: 'alcool-voo' },
          { paragrafo: 3, figura: foto(require('@/assets/images/topicos/m2v7-4-teste.jpg'), 'O teste de álcool no ar expirado pode ser feito de surpresa, antes do voo.') },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · álcool e substâncias',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Bebeu nas últimas 8 horas", "Pode voar, com moderação: o álcool se soma à hipóxia e desidrata", "Não voar (FAA: 8 h; ICAO: tradição de 12 h), porque o julgamento e os reflexos ainda estão alterados"],
                ["Álcool no sangue de 0,04 g/dL ou mais", "Pode ser impedido de embarcar se alterado: o comportamento põe a cabine em risco", "Não voar (FAA), porque mesmo doses baixas pioram o desempenho"],
                ["Teste positivo ou recusa (RBAC 120)", "Não se aplica: o teste é do tripulante", "Impedido até avaliação por especialista, porque pode haver dependência"],
                ["Dependência em tratamento", "Viajar desintoxicado, com o tratamento em dia: a abstinência a bordo pode ser grave", "Inapto; volta só com programa e acompanhamento, porque a recaída escondida é o maior risco"],
                ["Uso de droga ilícita", "Não voar sob efeito: a droga altera o comportamento e soma-se à hipóxia", "Inapto (ANAC; ICAO), porque altera percepção, julgamento e reflexos"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Como prevenir e amenizar · álcool',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Véspera do voo', 'Nada de álcool nas horas antes da apresentação; contar com folga'],
                ['Pernoite', 'Não beber para dormir; higiene do sono (Veja M2V8)'],
                ['Se virou problema', 'Programa da empresa ou apoio por pares; a volta ao voo existe'],
                ['Passageiro', 'Água, álcool com moderação; desintoxicado antes de viajar'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '7.5',
      titulo: 'Avaliação psicológica',
      pergunta: 'O que o psicólogo avalia no exame do piloto?',
      conteudo: {
        texto: [
          "No Brasil, o exame médico do tripulante inclui um **atestado psicológico**. O laudo tem de trazer, no mínimo, um parecer sobre **personalidade**, **atenção**, **memória** e **raciocínio**; os testes podem ser feitos individualmente ou em grupo. O **psiquiatra** também dá parecer no exame inicial, depois de acidente ou incidente grave e quando a ANAC ou um profissional de saúde pedir.",
          "A **avaliação psicológica** acontece no exame inicial, depois de **acidente** ou **incidente aeronáutico grave**, a cada **5 anos** nas revalidações e a qualquer momento, se a ANAC ou um profissional de saúde pedir. Na Europa, desde **14 de fevereiro de 2021**, a regra da EASA exige também que as empresas façam avaliação psicológica dos seus pilotos.",
          "Os testes têm **limites**. A ICAO lembra que o teste psicológico raramente funciona como triagem: testes de personalidade sozinhos não preveem doença mental nem garantem a aptidão para a carreira. Eles ajudam nas mãos de um psiquiatra, junto com a entrevista, e os testes **neuropsicológicos** servem para medir o efeito de uma doença ou lesão e acompanhar a evolução.",
          "Por isso, a ferramenta mais importante é a **conversa honesta**. A história contada pelo próprio tripulante, pela família e pelos registros médicos pesa mais que qualquer teste. O examinador pergunta sobre humor, sono, álcool, remédios e estresse; a FAA pede que o piloto seja totalmente honesto sobre o histórico e os remédios.",
          "Omitir um diagnóstico ou um remédio no exame é **infração** e pode invalidar o certificado e o seguro, além de deixar o problema sem tratamento. O caminho inverso funciona melhor: declarar, tratar e cumprir o prazo da autoridade. Para o passageiro, não há avaliação psicológica; o que existe é o **MEDIF**, quando o médico e a companhia combinam a viagem.",
          "**Tratamentos e a avaliação.** Estar em tratamento não reprova ninguém por si só. A **psicoterapia**, tratamento **não invasivo**, é incentivada pela FAA quando indicada e conta a favor quando relatada. Os **remédios** precisam ser declarados: o antidepressivo segue o protocolo da autoridade, e o sedativo pede intervalo antes do voo. Os tratamentos **invasivos**, como a **eletroconvulsoterapia** e a **internação** psiquiátrica, pedem parecer do psiquiatra e decisão da autoridade antes da volta ao voo. O prognóstico da carreira é melhor para quem declara: o problema contado, com relatório do médico, vira acompanhamento; o escondido vira infração. A avaliação é a mesma para quem voa avião **pressurizado**, **não pressurizado** ou **helicóptero**; o que muda é a classe do certificado.",
          "**Como prevenir e amenizar.** Como se preparar: durma bem na véspera, vá descansado e sem álcool. Leve os relatórios do seu médico, se fizer tratamento. Responda com sinceridade: o examinador está ali para avaliar o risco no voo, não para julgar a vida. Se não entender uma pergunta, pergunte. Se o resultado pedir acompanhamento, ele costuma ser o caminho de volta, não o fim da carreira.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · avaliação psicológica",
              colunas: ["Remédio ou tratamento", "Na avaliação", "Prazo para voar"],
              linhas: [
                ["Antidepressivo ISRS", "Declarar; segue o protocolo da autoridade", "ICAO: dose estável há 4 semanas; FAA: 6 meses"],
                ["Sedativo de curta ação", "Declarar", "ICAO: 8 a 12 h antes de tarefa de aviação"],
                ["Parar um remédio", "Declarar a data", "ICAO: retirada e mais 2 semanas; FAA: 60 dias sem o remédio"],
                ["Psicoterapia", "Relatar; conta a favor", "Sem prazo próprio"],
                ["Eletroconvulsoterapia ou internação", "Declarar; parecer do psiquiatra", "Decisão da autoridade"],
              ],
            },
          },
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v7-5-teste.jpg'), 'Os testes avaliam personalidade, atenção, memória e raciocínio.') },
          { paragrafo: 2, midia: 'avaliacao-psicologica' },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v7-5-entrevista.jpg'), 'A conversa honesta com o examinador pesa mais que qualquer teste.') },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Liberação para voo · avaliação psicológica',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Exame inicial", "Não se aplica: a avaliação é do tripulante", "Atestado psicológico e parecer psiquiátrico (ANAC), porque a aptidão mental pesa tanto quanto a física"],
                ["Revalidação", "Não se aplica: a avaliação é do tripulante", "Avaliação psicológica a cada 5 anos (ANAC), porque a vida e a saúde mental mudam com o tempo"],
                ["Depois de acidente ou incidente grave", "Não se aplica: a avaliação é do tripulante", "Nova avaliação psicológica e psiquiátrica (ANAC), porque o trauma pode trazer estresse pós-traumático"],
                ["Em tratamento psiquiátrico", "MEDIF se a companhia pedir: ela precisa saber se há risco de crise a bordo", "Relatório do médico; parecer do psiquiatra, porque mostram a estabilidade e os remédios"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Como prevenir e amenizar · avaliação psicológica',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Véspera', 'Dormir bem; nada de álcool'],
                ['Levar', 'Relatórios do médico, se faz tratamento'],
                ['Na entrevista', 'Responder com sinceridade; perguntar se não entender'],
                ['Depois', 'Seguir o acompanhamento pedido'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '7.6',
      titulo: 'Apoio por pares e pedir ajuda',
      pergunta: 'Como ajudar um colega que não está bem?',
      conteudo: {
        texto: [
          "O **apoio por pares** é uma rede de colegas treinados para ouvir e encaminhar quem está passando por dificuldade: estresse, luto, separação, álcool, cansaço, ansiedade. Funciona porque é **confidencial** e **não punitivo**: não serve para identificar e demitir pilotos, e sim para que o problema seja tratado antes de virar risco.",
          "Na Europa, ele virou **obrigatório** para as empresas aéreas em **14 de fevereiro de 2021**, junto com testes de álcool e avaliação psicológica. A regra nasceu da força-tarefa que se seguiu ao acidente do voo **9525 da Germanwings**, em 2015, em que o copiloto, com doença mental não declarada, derrubou o avião de propósito.",
          "A ICAO conta que, quando os pilotos souberam que tratar a dependência de álcool **não encerrava a carreira**, acabou a \"conspiração do silêncio\": os colegas passaram a ajudar em vez de esconder. Os programas que juntam **colegas**, empresa, médico e autoridade devolvem pilotos ao voo com acompanhamento, e o mesmo princípio vale para a depressão e a ansiedade.",
          "Os sinais de que um colega não está bem: mudança de humor, isolamento, **irritação**, erros fora do comum, faltas, cheiro de álcool, falar em desistir de tudo. A abordagem é simples: em particular, dizer o que notou, ouvir sem julgar e oferecer o caminho, o programa de apoio, o médico, o examinador. Se o colega falar em morrer ou se machucar, não o deixe sozinho e busque ajuda na hora.",
          "Calar tem custo dos dois lados: o colega segue sem tratamento e o risco sobe para todos a bordo. Para o tripulante, voar sabendo que não está apto é infração à norma; para quem percebe, a obrigação é com a segurança, e o programa de apoio existe para fazer isso **sem destruir a carreira** de ninguém. Para o passageiro, a ajuda vem da tripulação: avisar cedo é sempre melhor.",
          "**Tratamento, retorno e tipo de voo.** O apoio por pares não substitui o tratamento: ele **encaminha**. Dali o colega segue para o que o caso pede: conduta **expectante**, com escuta e acompanhamento, nas crises da vida, como luto e separação; tratamento **não invasivo**, com psicoterapia e remédio, na depressão e na ansiedade; e, nos casos graves, **internação** ou programa para a dependência. O prognóstico é bom: quando os pilotos souberam que tratar não encerrava a carreira, os colegas passaram a ajudar em vez de esconder. A volta ao voo segue o **prazo** de cada doença e a decisão do examinador. Na aviação de linha **pressurizada** europeia, o programa de pares é obrigatório desde 2021; quem voa sozinho, no **helicóptero** ou no avião leve **não pressurizado**, não tem um colega ao lado para notar a mudança, e o autoexame do IMSAFE pesa ainda mais.",
          "**Como prevenir e amenizar.** Como pedir e oferecer ajuda: se você não está bem, fale com alguém de confiança, com o programa de apoio da empresa ou do sindicato, ou com o seu médico. Se um colega não está bem, pergunte, ouça e acompanhe até a ajuda. Se houver risco de suicídio, procure ajuda imediata: no Brasil, o **CVV** atende pelo **188**, de graça, 24 horas; em emergência, o **SAMU**, pelo 192.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Liberação para voo · retorno após tratamento",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Crise da vida, sem doença", "Pode voar: crise da vida não é doença", "Pode voar se apto no IMSAFE, porque estresse forte também tira a atenção"],
                ["Depressão ou ansiedade tratada", "Pode voar: tratada, a doença não muda o risco", "Prazo da doença e parecer do psiquiatra, para confirmar a estabilidade"],
                ["Dependência em programa", "Pode voar, sem álcool: a bebida a bordo ameaça a recuperação", "Retorno pelo programa (HIMS ou PPSP), porque testes e acompanhamento evitam a recaída escondida"],
                ["Crise com risco para si", "Não voar; ajuda imediata, porque a segurança da pessoa vem primeiro", "Não voar; ajuda imediata, porque o risco é para si e para todos a bordo"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · retorno após tratamento",
              colunas: ["Tratamento", "O que pesa no retorno"],
              linhas: [
                ["Psicoterapia", "Relatar ao examinador; não impede por si só"],
                ["Antidepressivo", "Dose estável e protocolo da autoridade"],
                ["Tratamento da dependência", "Abstinência, testes aleatórios e acompanhamento"],
              ],
            },
          },
          { paragrafo: 1, video: { fonte: require('@/assets/videos/m2v7-pares.mp4'), legenda: 'Uma conversa entre colegas, em particular, é muitas vezes o primeiro passo do tratamento.' } },
          { paragrafo: 2, figura: foto(require('@/assets/images/topicos/m2v7-6-pares.jpg'), 'O apoio por pares é confidencial e não punitivo.') },
          { paragrafo: 3, midia: 'apoio-colega' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Como prevenir e amenizar · apoio por pares',
              colunas: ['Situação', 'O que fazer'],
              linhas: [
                ['Você não está bem', 'Falar com alguém de confiança, o programa de apoio ou o médico'],
                ['Colega diferente do normal', 'Em particular: dizer o que notou e ouvir sem julgar'],
                ['Cheiro de álcool antes do voo', 'Falar com o colega e acionar o programa da empresa'],
                ['Fala em morrer ou se machucar', 'Não deixar sozinho; ajuda imediata (CVV 188, SAMU 192)'],
                ['Depois', 'Acompanhar até o tratamento começar'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v7-6-telefone.jpg'), 'Pedir ajuda cedo é sinal de responsabilidade, não de fraqueza.') },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Mente e decisão', 'Concentração, memória e decisão mais lentas: depressão, ansiedade e cansaço tiram a energia e a atenção que o cérebro dedica à tarefa', 'Tratamento cedo; checklist IMSAFE'],
                ['Sono', 'Insônia piora o humor; remédio para dormir pesa no dia seguinte: o sono regula as emoções, e o sedativo continua agindo no cérebro depois que a pessoa acorda', 'Higiene do sono; sedativo só com prazo (Veja M2V8)'],
                ['Fígado e cérebro', 'Álcool e drogas: julgamento, reflexos, dependência; deprimem ou alteram os neurônios, o fígado leva horas para eliminá-los, e o uso repetido muda o circuito de recompensa do cérebro', '8 h sem álcool (FAA); programa de apoio'],
                ['Respiração', 'Ansiedade e medo de voar podem virar hiperventilação: a adrenalina acelera a respiração, o gás carbônico do sangue cai, e vêm formigamento e tontura', 'Respiração lenta; terapia cognitivo-comportamental'],
                ['Comportamento', 'Agitação e impulsividade a bordo: cabine fechada, sono curto e remédio fora de hora desestabilizam quem já tem doença mental', 'Remédio no horário; acompanhante; avisar a tripulação'],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      pergunta: 'Num questionário anônimo com 1.848 pilotos de linha, quantos tinham sinais de provável depressão?',
      opcoes: ['Nenhum', 'Cerca de 12,6%', 'Mais da metade', 'Só os que tomavam remédio'],
      correta: 1,
      explicacao: '12,6% tinham provável depressão, e 4,1% contaram pensamentos de morte nas duas semanas anteriores.',
      topico: '7.1',
    },
    {
      pergunta: 'No checklist IMSAFE da FAA, o que o piloto pergunta sobre álcool?',
      opcoes: ['Se bebeu no último mês', 'Se bebeu nas últimas 24 horas', 'Se bebe socialmente', 'Nada'],
      correta: 1,
      explicacao: 'O IMSAFE pergunta por doença, remédio, estresse, álcool nas últimas 24 horas, fadiga, alimentação e emoção.',
      topico: '7.1',
    },
    {
      pergunta: 'Quem teve um episódio sério de depressão tem que chance de ter outro?',
      opcoes: ['Nenhuma', 'Cerca de 50%', '100%', '5%'],
      correta: 1,
      explicacao: 'A depressão volta: cerca de 50% de chance de novo episódio, mais provável nos 2 primeiros anos.',
      topico: '7.2',
    },
    {
      pergunta: 'Pela FAA, quanto tempo o piloto precisa estar estável no antidepressivo aceito antes da autorização especial?',
      opcoes: ['1 semana', '6 meses', '5 anos', 'Nunca pode'],
      correta: 1,
      explicacao: 'A FAA aceita 8 antidepressivos, um de cada vez, depois de 6 meses estável na mesma dose.',
      topico: '7.2',
    },
    {
      pergunta: 'Pela ICAO, o que o piloto com antidepressivo deve fazer quando a dose muda?',
      opcoes: ['Continuar voando', 'Parar de voar até estabilizar', 'Voar só à noite', 'Dobrar a dose'],
      correta: 1,
      explicacao: 'Se a dose muda, o piloto para de voar; ao retirar o remédio, fica em solo durante a retirada e mais 2 semanas.',
      topico: '7.2',
    },
    {
      pergunta: 'Para a ICAO, um episódio de mania leva a quê?',
      opcoes: ['Nada', 'Impedimento de longo prazo', 'Só 1 mês de afastamento', 'Voo só com copiloto'],
      correta: 1,
      explicacao: 'A mania recai de forma imprevisível, mesmo com estabilizador de humor, e leva a impedimento de longo prazo.',
      topico: '7.3',
    },
    {
      pergunta: 'Num surto psicótico a bordo, com o passageiro agressivo, o que vem primeiro?',
      opcoes: ['Dar um sedativo a qualquer custo', 'A segurança do voo e das pessoas a bordo', 'Esperar o pouso sem fazer nada', 'Deixar os passageiros resolverem sozinhos'],
      correta: 1,
      explicacao: 'Com agressão, a segurança vem antes do tratamento: a tripulação segue o protocolo da empresa, que pode incluir contenção ou pouso alternado.',
      topico: '7.3',
    },
    {
      pergunta: 'Pela FAA, quantas horas depois de beber o tripulante pode atuar?',
      opcoes: ['1 hora', '8 horas, e com menos de 0,04 g/dL', 'A qualquer hora', '72 horas'],
      correta: 1,
      explicacao: 'O 14 CFR 91.17 proíbe atuar até 8 horas depois de bebida alcoólica, sob influência ou com 0,04 g/dL ou mais.',
      topico: '7.4',
    },
    {
      pergunta: 'Com programas que juntam colegas, empresa, médico e autoridade, em quanto tempo pilotos tratados de dependência voltam a voar, segundo a ICAO?',
      opcoes: ['Nunca', '3 a 4 meses, com acompanhamento', '1 semana', '20 anos'],
      correta: 1,
      explicacao: 'Com o protocolo completo, pilotos voltam em 3 a 4 meses, com acompanhamento de pelo menos 2 anos.',
      topico: '7.4',
    },
    {
      pergunta: 'Pelo RBAC 67, com que frequência o tripulante faz avaliação psicológica na revalidação?',
      opcoes: ['Todo ano', 'A cada 5 anos', 'Nunca', 'Só no exame inicial'],
      correta: 1,
      explicacao: 'Avaliação psicológica no exame inicial, depois de acidente ou incidente grave e a cada 5 anos nas revalidações.',
      topico: '7.5',
    },
    {
      pergunta: 'O que torna um programa de apoio por pares eficaz?',
      opcoes: ['Ser punitivo', 'Ser confidencial e não punitivo', 'Ser obrigatório contar ao chefe', 'Servir para demitir'],
      correta: 1,
      explicacao: 'O apoio por pares é confidencial e não punitivo, para que o problema seja tratado antes de virar risco.',
      topico: '7.6',
    },
  ],
  liberacao: liberacaoMente,
};
