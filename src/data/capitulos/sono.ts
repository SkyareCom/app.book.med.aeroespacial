// Missão 2 (Sistemas) · Voo 8 — Sono, relógio biológico e fadiga (o número do voo é definido em secoes.ts).
// Escrito no modelo de Sistemas (docs/modelo-sistemas.md) em 02/11/2026, a pedido do autor: jet lag com prevenção e
// tratamento, efeito da direção do voo, regulação hormonal, dicas para reduzir os efeitos e detalhe nos demais itens.
// Os tópicos da lista antiga (fisiologia do sono, relógio biológico, jet lag, higiene do sono, fisiologia da fadiga,
// FRMS, limites de jornada, voos de longa duração, contramedidas) foram reunidos em 7 tópicos.
//
// REGISTRO DE REVISÃO (02/11/2026) — fontes:
// - ICAO, Doc 8984, 3ª ed. (PDF enviado pelo autor), Part III, Cap. 17, Fatigue and flight operations: 17.2.2 (definição
//   de fadiga do Anexo 6); 17.2.3 (fadiga transitória e cumulativa); 17.2.4 (Anexo 6, 4.10.1: limites de jornada e FRMS);
//   17.2.7 (fatores); 17.2.8 (tripulação aumentada; voos de até 20 h com tripulação completa de revezamento); 17.3.1
//   (higiene do sono); 17.3.2 (álcool: 1 dose sem efeito demonstrado, 2 atrasam o REM, 3 ou mais antecipam o despertar);
//   17.3.3 (pernoites curtos, < 3 dias: ficar no horário de casa); 17.3.4 (pernoite longo: luz solar suprime a melatonina
//   da glândula pineal e sincroniza o relógio; horário da luz exige orientação); 17.3.5 (cochilo diurno de no máximo 2 a
//   3 h); 17.3.6 (queda pós-almoço no horário de casa nos 2 primeiros dias); 17.3.7 (acordado de madrugada: levantar e
//   ler até ter sono); 17.4.1–17.4.9 (hipnóticos: idealmente não; 14% de pilotos regionais em 2010 e 19% de uma grande
//   empresa em 2004; não comprar sem receita no exterior; limite de 3 ou 4 doses por semana; zaleplona curta, temazepam
//   para manter o sono; zolpidem com 12 h até a apresentação segundo a AsMA; teste em solo); 17.5 (melatonina: eficácia
//   como hipnótico não provada; pode sincronizar o relógio; qualidade e dose incertas fora da farmácia; hora errada piora;
//   em geral não recomendada para tripulantes); 17.6 (apneia: Epworth ≥ 10 ou história sugestiva, inapto temporário;
//   pescoço > 43 cm; IMC > 30; ~3% dos pilotos de meia-idade; CPAP; outras causas de sonolência: narcolepsia,
//   movimentos periódicos das pernas, hipersonia idiopática); Apêndice 2 (perguntas frequentes: 01–05 h piores; queda
//   da tarde; 2 ou 3 dias fora: relógio ainda em casa; não se treina dormir menos; escuro, tampões, 21 °C, sem exercício
//   vigoroso 2 h antes, cafeína some em 4–6 h, álcool, ritual, refeição > 20% da energia 1–2 h antes; cochilo de 10 min
//   já ajuda, > 45 min traz inércia de 20 min ou mais; descanso controlado na cabine conforme o Estado; comprimido para
//   dormir no máximo 3–4 vezes por semana, alguns países proíbem nas 24 h antes do voo; melatonina; cafeína e tolerância;
//   apneia; "durma").
// - ICAO, Doc 9966, FRMS Manual (2011), Cap. 2: WOCL perto do mínimo da temperatura central, em geral 03–05 h; alarme
//   interno ~6 h depois; zona de manutenção da vigília antes de deitar; janela do cochilo 15–17 h; impulso para o REM
//   mais forte poucas horas antes de acordar; jet lag e dessincronização interna; ciclos NREM/REM de ~90 min; o sono não
//   é moeda de troca; restrição acumula e o julgamento da própria falha piora; recuperação exige 2 noites seguidas sem
//   restrição; folga de 48 h começando às 02 h dá uma noite de sono, 40 h começando às 21 h dá duas; descanso controlado
//   na cabine limitado a 40 min; não usar como ferramenta de escala.
// - CANSO/ICAO/IFATCA, Fatigue Management Guide for Air Traffic Service Providers, 1ª ed., 2016 (skybrary.aero): adulto
//   jovem ~55% NREM 1–2, 20% sono profundo, 25% REM; 7 a 9 h de necessidade; álcool ~1 dose por hora; inércia: 10–15 min
//   antes de tarefa de segurança; WOCL 02–06 h; FRMS com 4 componentes (política e documentação, gerenciamento do risco,
//   garantia da segurança, promoção).
// - FAA, AC 120-100, Basics of Aviation Fatigue (07/06/2010): ~8 h de sono por dia; perda de 2 h por dia já prejudica;
//   4 dias com 5 h equivalem a 40 h sem dormir; 1 h a menos por semana afeta o tempo de reação; recuperar a dívida pede
//   dias com 9 h ou mais; desempenho estável nas primeiras 16 h acordado, deteriora após 18–20 h; partida noturna após
//   13,5 h acordado com reação mais lenta que após 3,5 h; microssono 9 vezes mais provável à noite; 80% de 1.424
//   tripulantes regionais e 71% de 1.488 executivos já cochilaram em voo; WOCL 03–05 h e secundária 15–17 h; erros
//   sobem 14–16 h e muito mais 02–04 h; período livre de 24 a 28 h sem pistas; luz é o principal sincronizador; oeste
//   adapta mais rápido que leste; < 3 dias não dá para adaptar; cochilo de 25–30 min; inércia de minutos a horas; beliche
//   ~6 h, raramente > 5 h de sono, 5 h de oportunidade dão ~3 h de sono, 2 períodos de 3–5 h melhores que um de 8 h;
//   cafeína age em 15–30 min e dura até 5 h; acidentes desproporcionais em jornadas > 13 h (NTSB); autoavaliação falha.
// - CDC, Yellow Book, Jet Lag Disorder (publicado em 21/07/2026): critérios (≥ 2 fusos, sintomas em 1–2 dias); 68% dos
//   viajantes de negócios; avançar (leste) e atrasar (oeste); ritmo intrínseco pouco maior que 24 h; adaptação de 1,5 h/dia
//   para oeste e 1 h/dia para leste; melatonina por ~12 h à noite, sobe ~2 h antes de deitar, pico às 3–4 h; luz depois
//   do nadir avança, à noite atrasa; deslocar o sono 1 h por dia por 2–3 dias antes; leste: luz cedo, evitar à noite;
//   oeste: evitar luz cedo; < 2 dias: ficar no horário de casa; melatonina 0,5–1 mg, > 5 mg não, ~90 min antes de deitar
//   avança, de manhã atrasa, entre 0 e 5 h do relógio interno não funciona; cafeína com meia-vida de ~5 h, 200 mg a cada
//   4 h de dia, parar 6 h antes de deitar; modafinila ~12 h; zolpidem e eszopiclona; evitar anti-histamínicos e
//   benzodiazepínicos de ação longa; cochilos de 20–30 min; hidratação; álcool fragmenta o sono; refeições no horário do
//   destino.
// - CDC, Yellow Book, High-Altitude Travel (registro em src/data/adaptacao.ts): respiração periódica no sono acima de
//   ~2.700 m; o sono melhora com a aclimatação.
// - Leproult R, Van Cauter E. Role of sleep and sleep loss in hormonal release and metabolism. Endocr Dev 2010;17:11-21
//   (CDC stacks): GH no início do sono, no sono profundo, mínimo sem dormir; cortisol com pico no início da manhã, baixo
//   no fim da tarde e início da noite, subida brusca no fim da noite, controle circadiano; leptina −18%, grelina +28%,
//   fome +24% e apetite por carboidratos +32% após 2 noites de 4 h; tolerância à glicose −43% e sensibilidade à
//   insulina −24% após 5 noites de 4 h; obesidade com sono < 6 h.
// - NIH/NIGMS, Circadian Rhythms (revisado em 09/2023): núcleo supraquiasmático, luz pelos olhos, melatonina; ritmos de
//   sono, hormônios, apetite, digestão e temperatura; relógios em quase todos os tecidos; genes do relógio (Nobel de 2017);
//   desregulação ligada a obesidade, diabetes, transtornos do humor, coração e pressão.
// - FAA, Guia do AME, Pharmaceuticals, Sleep aids (07/05/2025): espera de 5 meias-vidas; zolpidem 24 h (sublingual e
//   para o meio da noite 36 h; spray 48 h); eszopiclona 30 h; temazepam 72 h; ramelteona 24 h; zaleplona 12 h; uso
//   diário não permitido; condição crônica do sono desqualifica (14 CFR 67.113(c)).
// - FAA, 14 CFR 117.5 (aptidão para a jornada: o tripulante que se declara fatigado não é escalado nem aceita; a empresa o
//   retira do serviço). 14 CFR 117.25 (Cornell LII): 30 h livres a cada 168 h; aclimatado após 36 h no novo fuso; > 60° de longitude e
//   > 168 h fora: 56 h com 3 noites fisiológicas; 10 h de repouso com 8 h de oportunidade de sono ininterrupta;
//   tripulante avisa se o repouso não der as 8 h. 14 CFR 61.53: não atuar com deficiência médica.
// - Brasil, Lei 13.475/2017 (Lei do Aeronauta, texto atualizado na Câmara): art. 19 (limites alteráveis pelo
//   gerenciamento de risco de fadiga da autoridade); art. 31 (horas de voo por jornada: simples 8, composta 11, revezamento
//   14); art. 33 (jato 80 h/mês e 800 h/ano); art. 36 (jornada: 9, 12 e 16 h); art. 42 (no máximo 2 madrugadas seguidas
//   e 4 em 168 h; madrugada de 0 a 6 h no fuso da base); art. 48 (repouso de 12 h após jornada de até 12 h, 16 h após
//   12–15 h, 24 h após mais de 15 h); art. 49 (3 ou mais fusos num sentido: 2 h a mais de repouso por fuso, na base);
//   art. 51 (ao menos 10 folgas por mês, 2 em sábado e domingo seguidos).
// - ANAC, RBAC 67 (registro em src/lib/cma.ts): remédio para dormir e calmante a critério (67.71(c)); 67.15(c).
// Sem fonte: [confirmar na referência]. Prazos não estimados.

import { liberacaoSono } from '../liberacao/sono';
import type { Capitulo } from '../tipos';

const foto = (arquivo: number, legenda: string) => ({ imagem: arquivo, legenda });

export const sono: Capitulo = {
  numero: 8,
  titulo: 'Sono, relógio biológico e fadiga',
  tempoLeituraMin: 45,
  topicos: [
    {
      id: '8.1',
      titulo: 'O sono e o relógio biológico',
      pergunta: 'O que acontece com o sono quando a vida é no ar?',
      conteudo: {
        texto: [
          "Dormir não é desligar. A noite é feita de **ciclos de cerca de 90 minutos** que alternam o **sono não REM**, mais leve nos estágios 1 e 2 e **profundo** no estágio 3, e o **sono REM**, o dos sonhos. No adulto jovem, cerca de **55%** da noite é sono leve, **20%** é sono profundo e **25%** é REM. O sono profundo domina o começo da noite; o REM cresce perto do amanhecer. A maioria dos adultos precisa de **7 a 9 horas**, e a FAA usa **8 horas** como referência.",
          "Dois motores decidem quando temos sono. O primeiro é a **pressão do sono**, que cresce a cada hora acordado e só baixa dormindo. O segundo é o **relógio biológico**, comandado pelo **núcleo supraquiasmático**, um grupo de neurônios do cérebro que recebe a **luz** pelos olhos e acerta o ritmo de quase todos os órgãos. Sem pistas do ambiente, o relógio corre em **24 a 28 horas**; a luz o mantém ajustado ao dia.",
          "O relógio cria horários fortes. A **janela de baixa circadiana**, entre cerca de **2 e 6 horas**, coincide com a **temperatura mais baixa** do corpo e é o pior momento para trabalhar: os erros sobem muito **entre 2 e 4 horas**. Há uma segunda queda **à tarde, perto de 15 a 17 horas**. Nas horas antes de deitar, ao contrário, o relógio segura a vigília, e deitar cedo rende pouco sono.",
          "A vida no ar desafia os dois motores ao mesmo tempo. Os **fusos horários** deslocam o dia lá fora, a **madrugada** obriga a trabalhar quando o relógio pede sono, as **jornadas longas** aumentam a pressão do sono e o **beliche** a bordo tem ruído e movimento. Em altitude de montanha, acima de cerca de **2.700 m**, a respiração fica **periódica** durante o sono até a aclimatação (Veja M2V1).",
          "O resultado tem nome: **fadiga**. Para a ICAO, é a capacidade física ou mental reduzida pela **perda de sono**, pela **vigília prolongada**, pela **fase do relógio** ou pela **carga de trabalho**, a ponto de prejudicar a atenção e a operação segura. Ela pode ser **transitória**, resolvida por um bom sono, ou **cumulativa**, quando a recuperação não se completa dia após dia.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, midia: 'animacao-relogio' },
          { paragrafo: 2, figura: foto(require('@/assets/images/topicos/m2v8-1-amanhecer.jpg'), 'A luz da manhã chega ao relógio biológico pelos olhos e acerta o ritmo do corpo para o dia que começa.') },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'O que muda em voo',
              colunas: ['Fator do voo', 'O que acontece no sono e no relógio', 'Quem é mais vulnerável'],
              linhas: [
                ['Fusos horários', 'O dia lá fora muda de lugar e o relógio leva dias para acompanhar', 'Quem cruza 2 ou mais fusos (Veja M2V8 - III)'],
                ['Madrugada', 'Trabalho na janela de baixa circadiana, entre 2 e 6 h', 'Tripulação de voos noturnos (Veja M2V8 - V)'],
                ['Jornada longa', 'A pressão do sono cresce; o desempenho cai depois de 16 a 20 h acordado', 'Quem começou a jornada já cansado (Veja M2V8 - V)'],
                ['Beliche e cabine', 'Ruído, luz e movimento deixam o sono mais curto e leve', 'Tripulação de revezamento (Veja M2V8 - VI)'],
                ['Altitude de montanha', 'Respiração periódica no sono acima de cerca de 2.700 m', 'Quem dorme alto sem aclimatação (Veja M2V1)'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v8-1-beliche.jpg'), 'No beliche de descanso a bordo, o sono costuma ser mais curto e leve que em casa.') },
          { paragrafo: 5, video: { fonte: require('@/assets/videos/m2v8-noite.mp4'), legenda: 'Do anoitecer ao amanhecer: o relógio biológico acompanha a luz e prepara o corpo para dormir e para acordar.' } },
        ],
      },
    },
    {
      id: '8.2',
      titulo: 'Hormônios do sono e do relógio',
      pergunta: 'Que hormônios o sono e o relógio comandam?',
      conteudo: {
        texto: [
          "O relógio biológico é também um **relógio hormonal**. A **melatonina**, produzida pela **glândula pineal** no escuro, sobe cerca de **2 horas antes da hora de deitar**, fica alta por cerca de **12 horas** e tem o **pico por volta das 3 a 4 horas**. A **luz** do dia a suprime; por isso a luz é o principal sincronizador do relógio, e a melatonina sinaliza ao corpo que é noite.",
          "O **cortisol**, o hormônio do despertar e do estresse, faz o caminho oposto: tem o **pico no início da manhã**, cai ao longo do dia, fica **baixo no fim da tarde e no começo da noite** e volta a subir de forma brusca **no fim da madrugada**, preparando o despertar. Esse ritmo é comandado sobretudo pelo relógio, e não pelo sono: quem passa a noite acordado ainda tem o cortisol subindo de manhã.",
          "Outros hormônios dependem do **próprio sono**. O **hormônio do crescimento** tem seu pulso mais forte logo depois de adormecer, no **sono profundo**, e quase desaparece quando se passa a noite acordado. A **temperatura do corpo** acompanha o relógio e chega ao **mínimo no início da manhã**, o horário de maior sono.",
          "A falta de sono mexe no **apetite** e no **açúcar do sangue**. Depois de **2 noites de 4 horas**, a **leptina**, que dá saciedade, caiu cerca de **18%**, a **grelina**, que dá fome, subiu cerca de **28%**, a fome aumentou **24%** e a vontade de carboidratos, **32%**. Depois de **5 noites de 4 horas**, a tolerância à glicose caiu cerca de **43%** e a sensibilidade à insulina, **24%**.",
          "Repetida por anos, a desregulação do relógio está ligada a **obesidade**, **diabetes**, **transtornos do humor** e problemas do **coração** e da **pressão** (Veja M2V2 e M2V9). Para quem voa, o recado prático é que **comer, dormir e se expor à luz em horários coerentes** ajuda o relógio, e que a fome de madrugada é, em parte, hormonal.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v8-2-luz.jpg'), 'A luz do sol pela manhã suprime a melatonina e diz ao relógio que o dia começou.') },
          { paragrafo: 2, midia: 'relogio-hormonal' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Os hormônios do sono e do relógio',
              colunas: ['Hormônio', 'Quando sobe', 'O que muda com o voo'],
              linhas: [
                ['Melatonina', 'À noite, no escuro; pico perto de 3 a 4 h', 'A luz na hora errada a suprime e atrasa ou adianta o relógio'],
                ['Cortisol', 'No início da manhã; sobe no fim da madrugada', 'Segue o relógio de casa até ele se ajustar ao novo fuso'],
                ['Hormônio do crescimento', 'Logo depois de adormecer, no sono profundo', 'Quase some na noite sem sono'],
                ['Leptina (saciedade)', 'Durante o sono', 'Cai cerca de 18% com 2 noites de 4 h'],
                ['Grelina (fome)', 'Durante o sono', 'Sobe cerca de 28% com 2 noites de 4 h'],
                ['Insulina e glicose', 'A tolerância à glicose é menor no meio da noite', 'Sensibilidade à insulina cai cerca de 24% com 5 noites de 4 h'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v8-2-refeicao.jpg'), 'Refeição de madrugada no hotel: a falta de sono aumenta a fome, em parte pela grelina mais alta.') },
        ],
      },
    },
    {
      id: '8.3',
      titulo: 'Jet lag e a direção do voo',
      pergunta: 'Por que voar para o leste cansa mais do que voar para o oeste?',
      conteudo: {
        texto: [
          "O **jet lag** é o descompasso entre o **relógio biológico** e o **horário do lugar** depois de cruzar fusos rapidamente. Ele começa a contar a partir de **2 fusos** e traz, em **1 a 2 dias**, **insônia** ou **sono durante o dia**, cansaço, dificuldade de concentração, mal-estar e problemas do **estômago e do intestino**. Numa pesquisa, **68%** dos viajantes a negócios tinham esses sintomas com frequência.",
          "A **direção** muda tudo. Voando para o **leste**, o relógio da parede corre para a frente, e o corpo precisa **adiantar** o seu: dormir e acordar mais cedo. Voando para o **oeste**, o corpo precisa **atrasar** o relógio: dormir e acordar mais tarde. Como o relógio interno tem um ciclo natural **um pouco maior que 24 horas**, **atrasar é mais fácil que adiantar**.",
          "Na prática, o corpo se ajusta em média **1,5 hora por dia** depois de voar para o **oeste** e só **1 hora por dia** depois de voar para o **leste**. Seis fusos para o leste podem pedir perto de uma semana; seis para o oeste, cerca de quatro dias. Além disso, cada órgão se ajusta num ritmo diferente: por alguns dias, sono, temperatura, hormônios e digestão ficam **dessincronizados entre si**.",
          "Voar no sentido **norte–sul**, sem mudar de fuso, não causa jet lag, mas o **voo noturno** e a **noite mal dormida** causam cansaço parecido (Veja M2V8 - V). Viagens **curtas**, de menos de 2 a 3 dias, não dão tempo para o relógio se ajustar; nesses casos, o melhor é **manter o horário de casa**.",
          "O jet lag pesa mais em quem já vem com **sono atrasado**, em quem viaja com **frequência** e em quem tem doenças que dependem de remédios em horário fixo, como o **diabetes** (Veja M2V9) e a **anticoagulação** (Veja M2V11). Para o tripulante, a preocupação principal é a **fadiga** que ele traz para a próxima jornada.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v8-3-insonia.jpg'), 'Três da manhã no hotel, completamente acordado: o relógio do corpo ainda está no fuso de casa.') },
          { paragrafo: 2, midia: 'direcao-jet-lag' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Leste ou oeste',
              colunas: ['', 'Voando para o leste', 'Voando para o oeste'],
              linhas: [
                ['O relógio da parede', 'Corre para a frente', 'Volta para trás'],
                ['O corpo precisa', 'Adiantar o relógio: dormir mais cedo', 'Atrasar o relógio: dormir mais tarde'],
                ['Ajuste médio', 'Cerca de 1 hora por dia', 'Cerca de 1,5 hora por dia'],
                ['Problema típico', 'Não conseguir dormir à noite e acordar tarde', 'Sono no fim da tarde e acordar de madrugada'],
                ['Luz que ajuda', 'Pela manhã', 'No fim da tarde e à noite'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v8-3-relogios.jpg'), 'Os relógios do aeroporto mostram a distância entre o fuso de casa e o do destino.') },
        ],
      },
    },
    {
      id: '8.4',
      titulo: 'Prevenir e tratar o jet lag',
      pergunta: 'Como chegar ao destino com o relógio do corpo em dia?',
      conteudo: {
        texto: [
          "A preparação começa **antes do voo**. Nos **2 a 3 dias** anteriores, desloque o sono **1 hora por dia** na direção do destino: mais cedo para o **leste**, mais tarde para o **oeste**. Escolha, quando der, um voo que chegue numa hora boa para receber a **luz certa** no destino.",
          "A **luz** é o tratamento mais forte. A luz forte **depois do ponto mais baixo do relógio**, cerca de 2 a 4 horas antes da hora habitual de acordar, **adianta** o relógio; a luz **à noite** o **atrasa**. Indo para o **leste**, procure **luz pela manhã** e evite a luz à noite, com óculos escuros e cortinas fechadas. Indo para o **oeste**, evite a luz forte de manhã cedo e aproveite a do fim do dia. No destino, saia e pegue **luz do dia no horário local**.",
          "A **melatonina** ajuda quando tomada na **hora certa**. Doses de **0,5 a 1 mg** costumam bastar; mais de **5 mg** não é recomendado, porque o excesso continua agindo na hora errada. Tomada cerca de **90 minutos antes de deitar** no horário do destino, ela **adianta** o relógio e ajuda quem voou para o **leste**; tomada de manhã, **atrasa** e ajuda quem voou para o **oeste**. Entre meia-noite e 5 horas do relógio interno, ela **não faz efeito**, e na hora errada **piora** o descompasso. Fora das farmácias, a dose real pode não ser a do rótulo.",
          "No dia a dia do destino, **cochilos de 20 a 30 minutos** ajudam a ficar acordado sem atrapalhar a noite; cochilos longos atrapalham. A **cafeína** age por cerca de **5 horas**: até **200 mg** a cada 4 horas de dia, parando **6 horas antes de deitar**, e nunca de manhã cedo quando o ajuste é para o oeste. Faça as **refeições no horário do destino**, mantenha-se **hidratado** e evite **álcool**, que faz dormir mais rápido mas **fragmenta** o sono.",
          "Remédios para dormir, como o **zolpidem** e a **eszopiclona**, podem ajudar o passageiro por poucas noites, com orientação médica. **Anti-histamínicos** e **calmantes de ação longa** pioram a atenção e o equilíbrio e devem ser evitados, inclusive a bordo. O **tripulante** segue regras próprias: em pernoites curtos, **fica no horário de casa**; a ICAO **não recomenda** a melatonina para tripulantes em geral; e a Lei do Aeronauta dá **2 horas a mais de repouso por fuso** quando a viagem cruza **3 ou mais fusos** num mesmo sentido.",
          "**Não dirija nem tome decisões importantes** no primeiro dia depois de cruzar muitos fusos se estiver sonolento. Procure o médico se a insônia durar mais que a adaptação esperada ou se usar remédios em horário fixo, como **insulina** e **anticoagulante**, para ajustar as doses ao novo fuso (Veja M2V9 e M2V11).",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v8-4-mascara.jpg'), 'Máscara de olhos e tampões a bordo: escuro e silêncio no horário de dormir do destino.') },
          { paragrafo: 2, midia: 'plano-jet-lag' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Remédios e voo · jet lag e sono',
              colunas: ['Remédio', 'Efeito que importa', 'Tripulante'],
              linhas: [
                ['Melatonina (0,5 a 1 mg)', 'Adianta ou atrasa o relógio conforme a hora', 'ICAO: em geral não recomendada; só de qualidade farmacêutica, com teste em solo'],
                ['Cafeína', 'Mantém acordado por até 5 horas', 'Usar só quando precisar; tolerância reduz o efeito'],
                ['Zaleplona', 'Ajuda a adormecer; ação curta', 'FAA: 12 h depois da última dose'],
                ['Zolpidem', 'Ajuda a adormecer', 'FAA: 24 h (36 a 48 h em outras formas)'],
                ['Eszopiclona', 'Ajuda a adormecer e manter o sono', 'FAA: 30 h'],
                ['Temazepam', 'Mantém o sono', 'FAA: 72 h'],
                ['Anti-histamínico que dá sono', 'Sonolência no dia seguinte', 'Evitar'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v8-4-caminhada.jpg'), 'Caminhar ao sol na manhã seguinte à chegada ajuda o relógio a se ajustar ao novo fuso.') },
        ],
      },
    },
    {
      id: '8.5',
      titulo: 'Fadiga',
      pergunta: 'Como saber se o cansaço já ameaça o voo?',
      conteudo: {
        texto: [
          "A fadiga depende de três coisas: há **quanto tempo** a pessoa está acordada, há **quanto tempo** está trabalhando e **que hora** o relógio do corpo marca. O desempenho fica estável nas primeiras **16 horas** acordado; depois disso a reação fica mais lenta, e entre **18 e 20 horas** a queda é clara. Pilotos que partiram à noite depois de **13,5 horas** acordados reagiram mais devagar do que os que partiram de manhã, com **3,5 horas** acordados.",
          "O sono perdido **se acumula**. Perder **2 horas** numa noite já reduz a atenção no dia seguinte. **Quatro noites de 5 horas** produzem uma queda de desempenho tão grande quanto **40 horas sem dormir**. E não se recupera hora por hora: são precisas pelo menos **2 noites seguidas** de sono livre para o sono voltar ao normal, e às vezes dias com **9 horas ou mais**.",
          "O pior é que **a pessoa cansada não percebe** o quanto está cansada: depois de alguns dias de pouco sono, o julgamento da própria falha piora. Surgem os **microssonos**, segundos de sono sem aviso, **9 vezes mais prováveis** nos voos noturnos. Numa pesquisa, **80%** de 1.424 tripulantes regionais disseram já ter cochilado em voo. A investigação de acidentes nos EUA encontrou taxas desproporcionais em jornadas de **mais de 13 horas**.",
          "Para o **passageiro**, a fadiga pesa ao **dirigir** depois de um voo longo ou noturno e se soma ao jet lag. Para o **tripulante**, ela é um risco operacional: as normas proíbem aceitar o serviço quem se sabe cansado a ponto de prejudicar a segurança, e o repouso deve dar a **oportunidade de dormir** antes da jornada (Veja M2V8 - VI).",
          "Voar fatigado aumenta **erros**, **esquecimentos** e **lapsos de atenção** justamente nos momentos de maior carga, como a aproximação. Para o tripulante, apresentar-se sem condições descumpre a regra de não atuar com deficiência que impeça cumprir os requisitos, além das normas da empresa. Os sinais de alerta são **bocejos**, **pálpebras pesadas**, **cabeça caindo**, **releituras** e **falhas de comunicação**.",
          "**Não aceite o serviço** se dormiu bem menos que o habitual, se estará acordado há mais de **16 horas** na hora de pousar ou se já cochilou sem querer. Avise a escala ou o comandante. Nos EUA, a regra é explícita: o tripulante que se declara **fatigado** não pode ser escalado nem aceitar o voo, e a empresa deve retirá-lo do serviço.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v8-5-cabine.jpg'), 'Madrugada na cabine de comando: a janela de baixa circadiana é o horário de maior risco de erro.') },
          { paragrafo: 2, midia: 'medidor-fadiga' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · fadiga',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Dormiu o habitual (7 a 9 h)', 'Sem restrição', 'Apto quanto ao sono'],
                ['Dormiu 2 horas ou mais a menos que o habitual', 'Evitar dirigir na chegada', 'Avaliar a própria condição e avisar se estiver cansado'],
                ['Acordado há mais de 16 h no pouso', 'Evitar dirigir na chegada', 'Risco alto: não aceitar o serviço sem descanso'],
                ['Já cochilou sem querer', 'Não dirigir', 'Não voar; investigar distúrbio do sono'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v8-5-bocejo.jpg'), 'Bocejos, pálpebras pesadas e releituras: os sinais aparecem antes de a pessoa admitir o cansaço.') },
        ],
      },
    },
    {
      id: '8.6',
      titulo: 'Limites de jornada, FRMS e voos longos',
      pergunta: 'Quanto um tripulante pode voar e quanto precisa descansar?',
      conteudo: {
        texto: [
          "A ICAO exige que cada país tenha **limites de tempo de voo, de jornada e de repouso**, e permite que a empresa gerencie a fadiga com um **FRMS**, o sistema de gerenciamento do risco de fadiga, baseado em dados e em ciência. O FRMS tem **quatro componentes**: política e documentação, gerenciamento do risco, garantia da segurança e promoção, com treinamento e comunicação.",
          "No Brasil, a **Lei do Aeronauta** fixa os limites para o transporte aéreo regular. Por jornada, são **8 horas de voo** na tripulação simples, **11** na composta e **14** na de revezamento, com jornada de **9, 12 e 16 horas**. No jato, o limite é de **80 horas de voo por mês** e **800 por ano**. São permitidas no máximo **2 madrugadas seguidas** e **4 em 168 horas**, contando a madrugada de **0 a 6 horas** no fuso da base. A lei também deixa a autoridade alterar os limites por meio do **gerenciamento de risco de fadiga**.",
          "O **repouso** cresce com a jornada: **12 horas** depois de até 12 horas de jornada, **16 horas** depois de 12 a 15 horas e **24 horas** depois de mais de 15. Quem cruza **3 ou mais fusos** num sentido ganha **2 horas a mais por fuso**, na base, e o mês deve ter ao menos **10 folgas**. Nos EUA, a FAA exige **10 horas** de repouso com **8 horas seguidas de oportunidade de sono**, **30 horas livres** a cada semana e, depois de cruzar mais de **60° de longitude** e passar mais de uma semana fora, **56 horas** com **3 noites** de sono.",
          "Nos **voos de longa duração**, com até **20 horas**, a tripulação é **aumentada** e se reveza no **beliche** ou em poltronas de descanso. O sono a bordo é curto: **5 horas** de oportunidade costumam render cerca de **3 horas** de sono, e **2 períodos de 3 a 5 horas** funcionam melhor que um de 8. Onde a autoridade permite, o **descanso controlado** na cabine de comando é limitado a cerca de **40 minutos**, para evitar a inércia do sono, e não serve para planejar a escala.",
          "A regra só protege se o repouso for **usado para dormir**. Uma folga de **48 horas** que começa às **2 horas da manhã** dá à maioria das pessoas **uma só noite** de sono; uma de **40 horas** que começa às **21 horas** dá **duas**. Por isso o tripulante planeja o sono antes da jornada e avisa quando o repouso não deu a oportunidade de dormir.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v8-6-escala.jpg'), 'Planejar a escala com os limites de jornada e de repouso é a primeira barreira contra a fadiga.') },
          { paragrafo: 2, midia: 'repouso-aeronauta' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Limites de jornada e repouso',
              colunas: ['Item', 'Brasil (Lei do Aeronauta)', 'EUA (FAA)'],
              linhas: [
                ['Horas de voo por jornada', '8 (simples), 11 (composta), 14 (revezamento)', 'Conforme a hora de início e a tripulação'],
                ['Repouso mínimo', '12, 16 ou 24 h conforme a jornada', '10 h, com 8 h seguidas para dormir'],
                ['Fusos horários', '+2 h de repouso por fuso, a partir de 3 fusos', '56 h e 3 noites depois de > 60° de longitude e > 1 semana fora'],
                ['Descanso semanal', 'Ao menos 10 folgas por mês', '30 h livres a cada 168 h'],
                ['Madrugadas', 'No máximo 2 seguidas e 4 em 168 h', 'Limites menores para jornadas na madrugada'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v8-6-revezamento.jpg'), 'Troca de turno no voo de longa duração: um piloto descansa enquanto o outro assume.') },
        ],
      },
    },
    {
      id: '8.7',
      titulo: 'Contramedidas, remédios e distúrbios do sono',
      pergunta: 'O que funciona de verdade para dormir e ficar alerta?',
      conteudo: {
        texto: [
          "A única cura para a fadiga é **dormir**, e o sono começa antes de deitar. Durma quando o relógio ajuda: proteja a **madrugada** do horário de casa, quando o sono vem mais fácil, e prefira cochilar na **janela da tarde**, perto de **15 a 17 horas**. Bloqueie a **luz** com cortina ou máscara, use **tampões** ou ruído branco, deixe o quarto perto de **21 °C**, evite **exercício vigoroso** nas 2 horas antes e **refeição pesada** 1 a 2 horas antes, e siga um **ritual** de dormir também fora de casa.",
          "O **álcool** engana: faz adormecer mais rápido, mas **2 doses** atrasam o REM e **3 ou mais** fazem acordar cedo. A **cafeína** leva de **15 a 30 minutos** para agir e dura até **5 horas**; quem a usa todo dia perde parte do efeito. O **cochilo** é a contramedida mais forte: **10 minutos** já melhoram a atenção, mas cochilos de mais de **45 minutos** trazem a **inércia do sono**, uma lentidão de **20 minutos ou mais** ao acordar; dê ao menos **10 a 15 minutos** antes de uma tarefa de segurança.",
          "Acordou de madrugada no pernoite e não volta a dormir? Levante-se, leia por cerca de uma hora ou até ter sono e tente de novo; se em meia hora continuar acordado, repita. Durante o dia no destino, limite o cochilo a **2 ou 3 horas** para preservar a noite.",
          "**Remédio para dormir** é exceção, não rotina. A ICAO aceita poucas noites, no máximo **3 ou 4 doses por semana**, sempre com orientação de um médico que conheça a aviação e depois de um **teste em solo**. Nunca compre remédio para dormir sem receita no exterior: dose e qualidade são incertas. Na FAA, a espera depois da última dose vai de **12 horas** (zaleplona) a **72 horas** (temazepam), e o **uso diário não é permitido**. No Brasil, o uso contínuo de remédio para dormir fica **a critério do médico examinador**.",
          "Sonolência que não melhora com sono pede investigação. A **apneia do sono** é a causa mais comum (Veja M2V1 - VII): a ICAO considera **inapto temporário** o tripulante com escala de sonolência de **Epworth de 10 ou mais** ou história sugestiva, e manda investigar quem tem pescoço com mais de **43 cm** ou IMC acima de **30** e ronca. Outras causas são a **narcolepsia**, a **hipersonia idiopática**, os **movimentos periódicos das pernas**, a **depressão** e a **dor**. Para a FAA, a condição crônica que atrapalha o sono **desqualifica** até ser tratada.",
          "**Não use** remédio para dormir pela primeira vez antes de um voo, não misture com **álcool** e não use cafeína para substituir o sono. O médico pergunta pelo **ronco**, pelos **cochilos involuntários** e pelos remédios, aplica a **escala de Epworth** e, se preciso, pede o **estudo do sono**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v8-7-quarto.jpg'), 'Quarto de hotel escuro, fresco e silencioso: a higiene do sono vale também longe de casa.') },
          { paragrafo: 2, midia: 'cochilo-cafeina' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · remédios e distúrbios do sono',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Remédio para dormir ocasional', 'Pode usar, sem álcool; evitar no voo os de ação longa', 'FAA: esperar de 12 a 72 h conforme o remédio; ICAO: até 3 ou 4 doses por semana'],
                ['Remédio para dormir todo dia', 'Avaliar com o médico', 'FAA: não permitido; ANAC: a critério do examinador'],
                ['Melatonina', 'Dose baixa, na hora certa', 'ICAO: em geral não recomendada'],
                ['Ronco e sonolência durante o dia', 'Avaliar antes de viagem longa', 'ICAO: Epworth de 10 ou mais, inapto temporário até o estudo do sono'],
                ['Apneia tratada com CPAP', 'Pode voar com o CPAP (Veja M2V1 - VII)', 'Volta a voar com o tratamento eficaz'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v8-7-estudo.jpg'), 'O estudo do sono registra a respiração, o oxigênio e as fases do sono durante a noite.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Cérebro e atenção', 'Reação lenta, lapsos e microssonos depois de 16 a 20 h acordado ou com sono acumulado', 'Dormir antes da jornada; cochilo estratégico; recusar o voo fatigado'],
                ['Relógio biológico', 'Descompasso com o horário local por dias depois de cruzar fusos', 'Luz na hora certa; manter o horário de casa em viagens curtas'],
                ['Hormônios', 'Melatonina e cortisol fora de hora; menos hormônio do crescimento sem sono', 'Horários coerentes de luz, sono e refeições'],
                ['Apetite e metabolismo', 'Mais grelina, menos leptina e pior uso da glicose com noites curtas', 'Proteger o sono; refeições no horário do destino'],
                ['Estômago e intestino', 'Mal-estar e alteração do intestino no jet lag', 'Hidratação; refeições leves no horário do destino'],
                ['Humor', 'Irritação e queda do humor com o sono curto e a desregulação do relógio', 'Folgas reais; procurar ajuda se persistir (Veja M2V7)'],
                ['Respiração no sono', 'Apneia e respiração periódica em altitude fragmentam o sono', 'CPAP; avaliação do ronco e da sonolência'],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      pergunta: 'Quanto dura, em média, um ciclo de sono não REM e REM?',
      opcoes: ['10 minutos', 'Cerca de 90 minutos', '4 horas', 'A noite inteira'],
      correta: 1,
      explicacao: 'O sono não REM e o REM se alternam em ciclos de cerca de 90 minutos ao longo da noite.',
      topico: '8.1',
    },
    {
      pergunta: 'Em que horário fica a janela de baixa circadiana, de maior risco de erro?',
      opcoes: ['Entre 8 e 10 horas', 'Entre 12 e 14 horas', 'Entre cerca de 2 e 6 horas', 'Entre 18 e 20 horas'],
      correta: 2,
      explicacao: 'A janela de baixa circadiana fica entre cerca de 2 e 6 horas e coincide com a temperatura mais baixa do corpo.',
      topico: '8.1',
    },
    {
      pergunta: 'Quando a melatonina tem o pico, num horário habitual de sono?',
      opcoes: ['Ao meio-dia', 'Por volta das 3 a 4 horas', 'Logo ao acordar', 'No fim da tarde'],
      correta: 1,
      explicacao: 'A melatonina sobe cerca de 2 horas antes de deitar, fica alta por cerca de 12 horas e tem o pico perto das 3 a 4 horas.',
      topico: '8.2',
    },
    {
      pergunta: 'O que acontece com a grelina, o hormônio da fome, depois de 2 noites de 4 horas de sono?',
      opcoes: ['Cai cerca de 28%', 'Não muda', 'Sobe cerca de 28%', 'Some'],
      correta: 2,
      explicacao: 'A grelina subiu cerca de 28% e a leptina caiu cerca de 18%, com 24% mais fome.',
      topico: '8.2',
    },
    {
      pergunta: 'Por que voar para o leste costuma dar mais jet lag?',
      opcoes: ['Porque os voos são mais longos', 'Porque o corpo precisa adiantar o relógio, o que é mais difícil', 'Por causa da altitude', 'Porque a cabine é mais seca'],
      correta: 1,
      explicacao: 'O relógio interno tem ciclo um pouco maior que 24 horas; atrasar é mais fácil que adiantar. O ajuste é de cerca de 1 h por dia para o leste e 1,5 h para o oeste.',
      topico: '8.3',
    },
    {
      pergunta: 'Indo para o leste, quando a luz forte ajuda a ajustar o relógio?',
      opcoes: ['À noite', 'Pela manhã', 'De madrugada', 'Não faz diferença'],
      correta: 1,
      explicacao: 'Para o leste, o corpo precisa adiantar o relógio: luz pela manhã e menos luz à noite.',
      topico: '8.4',
    },
    {
      pergunta: 'Qual dose de melatonina costuma bastar para ajustar o relógio?',
      opcoes: ['0,5 a 1 mg', '10 mg', '20 mg', 'Quanto mais, melhor'],
      correta: 0,
      explicacao: 'Doses de 0,5 a 1 mg costumam bastar; acima de 5 mg não é recomendado, porque o excesso age na hora errada.',
      topico: '8.4',
    },
    {
      pergunta: 'Quatro noites seguidas de 5 horas de sono equivalem, no desempenho, a quanto tempo sem dormir?',
      opcoes: ['4 horas', '12 horas', '40 horas', 'Nenhum efeito'],
      correta: 2,
      explicacao: 'Para a FAA, quatro noites de 5 horas podem prejudicar tanto quanto 40 horas sem dormir.',
      topico: '8.5',
    },
    {
      pergunta: 'Pela Lei do Aeronauta, qual é o repouso mínimo depois de uma jornada de até 12 horas?',
      opcoes: ['8 horas', '10 horas', '12 horas', '24 horas'],
      correta: 2,
      explicacao: 'São 12 horas depois de até 12 horas de jornada, 16 depois de 12 a 15 horas e 24 depois de mais de 15.',
      topico: '8.6',
    },
    {
      pergunta: 'Por que o cochilo deve durar menos de cerca de 45 minutos?',
      opcoes: ['Para não perder o voo', 'Para evitar a inércia do sono ao acordar', 'Porque a cafeína para de agir', 'Por causa da melatonina'],
      correta: 1,
      explicacao: 'Cochilos longos trazem a inércia do sono, uma lentidão de 20 minutos ou mais ao acordar.',
      topico: '8.7',
    },
  ],
  liberacao: liberacaoSono,
};
