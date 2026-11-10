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
// Revisão (03/11/2026), a pedido do autor: mapa com o avião indo para o leste e para o oeste (tópico III) e tabela de
//   medidas para prevenir e amenizar o jet lag (tópico IV), com as mesmas fontes (CDC Yellow Book; Doc 8984 17.3.3 e 17.5).
//   Mapa: contorno Natural Earth (domínio público). Rotas definidas pelo autor: Brasília (UTC−3) → Auckland (UTC+12, ou
//   +13 no horário de verão da Nova Zelândia) para o leste: 15 a 16 fusos; Tóquio (UTC+9) → São Paulo (UTC−3) para o
//   oeste: 12 fusos.
// Revisão (03/11/2026), a pedido do autor: dicas de refeições, de esticar o dia ou dormir e outras (tópico IV). Fontes:
//   CDC Yellow Book (atividades e refeições no horário do destino; ficar acordado no dia local aumenta a pressão do
//   sono; oeste: ficar acordado até a hora de deitar; cochilos de 20–30 min; menos álcool e cafeína para dormir a bordo,
//   máscara e tampões; exercício aumenta o alerta; hidratação, álcool e cafeína desidratam; cafeína cedo para o leste e
//   não cedo para o oeste; viagem < 2 dias no horário de casa). ICAO Doc 8984 17.3.1 (ritual; evitar refeição grande
//   poucas horas antes), 17.3.3 (pernoite curto: horário de casa ou sono planejado para logo antes da saída), 17.3.5
//   (sono no dia local: no máximo 2–3 h), 17.3.6 (queda pós-almoço no horário de casa nos 2 primeiros dias), 17.3.8
//   (respostas individuais; ansiedade e preocupações), Apêndice 2 (exercício vigoroso não nas 2 h antes; comer antes do
//   sono diurno e não > 20% da energia 1–2 h antes do sono principal; dormir de dia antes de trabalhar a noite toda).
//   Nenhuma das fontes recomenda dieta específica contra o jet lag.
// Revisão de consistência (03/11/2026), a pedido do autor: viagem curta = menos de 2 dias para o passageiro (CDC) e
//   pernoite de menos de 3 dias para o tripulante (ICAO 17.3.3); cochilo de 20–30 min no dia local (CDC) e teto de 2–3 h
//   só para o sono diurno inevitável (ICAO 17.3.5); horas de sono de casa (01–05 h e meio da tarde, ICAO Apêndice 2) só
//   para quem fica no horário de casa; melatonina para o oeste "quando o relógio do corpo marca manhã" (CDC), sem a
//   frase "em geral dispensável", que não tinha fonte; a hora da luz e da melatonina depende do número de fusos (CDC) e
//   pede orientação (ICAO 17.3.4); cafeína cedo de manhã só para o leste (CDC); plano interativo desloca o sono no máximo
//   pelo número de fusos. Refeições por direção: as fontes (CDC; ICAO) mandam comer no horário do destino nas duas
//   direções; a diferença entre leste (refeições locais mais cedo, café com a luz da manhã, jantar cedo e leve) e oeste
//   (refeições locais mais tarde, jantar segurado até a hora local) é a aplicação dessa regra com a luz (CDC) e o limite
//   de refeição antes do sono (ICAO Apêndice 2); nenhuma fonte dá um horário de refeição próprio para cada direção.
// Detalhamento (03/11/2026), a pedido do autor, no padrão do jet lag: tópicos I (necessidade de sono individual, não
//   se treina dormir menos, idade; tabela do dia do relógio: Doc 8984 17.2.7 e Apêndice 2; Doc 9966; FAA AC 120-100), II
//   (proteção dos hormônios: Leproult e Van Cauter; NIGMS; CDC), V (fatores da fadiga: Doc 8984 17.2.7 e Apêndice 2;
//   prevenção: Apêndice 2 (dormir de dia antes da noite toda; cochilo de 10 min), FAA AC 120-100 (cochilo de 25–30 min;
//   cafeína 15–30 min a 5 h; pausas de 5 min), Doc 9966 (recuperação em 2 noites; inércia 10–15 min); coerência da
//   tabela e do formulário para > 16 h acordado), VI (aproveitar o repouso: 14 CFR 117.25; FAA AC 120-100; Doc 9966) e
//   VII (higiene do sono: Doc 8984 Apêndice 2, despertador, desacelerar, tabaco, 21 °C; cochilo ideal 20–30 min do CDC).
//   "Levantar e conversar" e "refeições leves de madrugada" são aplicações das fontes (monotonia, FAA; tolerância à
//   glicose menor à noite, Leproult e Van Cauter), sem número próprio.
// Mídia (03/11/2026): fotos e vídeos gerados por IA enviados pelo autor; pessoas fictícias. O relógio digital da foto
// do amanhecer foi desfocado; os vídeos foram cortados para tirar as cenas com relógio digital e embalagens com marca.
// Sem fonte: [confirmar na referência]. Prazos não estimados.
// Doenças, tratamentos e tipo de voo (10/11/2026), a pedido do autor ("As doenças devem aparecer no texto e nao em
//   tabelas isoladas / Todas com seus tratamentos indocados e influenciados pelos voos / Entrararem ma liberacao para voos
//   / Prognostico relacionado ao voo / Periodo indicado de adiamento ou tepouso etc / Tratamentos cirurgicos ou invasivos
//   destacados ou enfatizados" e "Tratamentos exectantes e nao invasivos também devem entrar"). Fontes novas: AASM,
//   diretriz de tratamento combinado da insônia crônica (J Clin Sleep Med, 13/04/2026; nota da AASM de 22/04/2026): a
//   terapia cognitivo-comportamental para insônia sozinha é o tratamento de primeira escolha mais eficaz; combinação com
//   remédio sugerida em vez de remédio sozinho. FAA, AME Guide: Narcolepsy/Hypersomnia ("This condition is incompatible
//   with aviation safety", tratada ou não; adiar e enviar à FAA); Restless Leg (adiar; remédio, dose e efeitos; nota
//   clínica, hemograma e ferritina de até 90 dias; polissonografia se feita; possível autorização especial); OSA
//   (certificação "once effective treatment is shown"). CPAP a bordo: registro de hipoxia.ts (M2V1 - VII). Recuperação
//   em 2 noites (Doc 9966), aclimatação em 36 h (14 CFR 117.25), 2 h por fuso (Lei 13.475/2017, art. 49), esperas da
//   FAA (Guia do AME, Sleep aids) e beliche (FAA AC 120-100): fontes acima. Aparelho intraoral e cirurgia das vias aéreas
//   como opções da apneia: conhecimento médico geral, sem prazo próprio; prazo de viagem após a cirurgia: [confirmar na
//   referência]. Comparador "tipo de voo": aplicações das fontes acima (fusos só nas rotas longas, um só piloto, hipóxia
//   acima de 10.000 ft, Veja M2V1).

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
          "**Doenças, tratamentos e tipo de voo.** As doenças do sono que mais pesam no voo são a **insônia**, a **apneia do sono**, a **narcolepsia** e a **hipersonia**, os **movimentos periódicos das pernas** e o **jet lag**. O tratamento vai do **expectante**, porque a insônia de uma viagem e o jet lag costumam passar em dias, ao **não invasivo**, que resolve a maioria: a **terapia cognitivo-comportamental para insônia**, a primeira escolha, a **luz** na hora certa, o **CPAP** na apneia e os remédios. O tratamento **invasivo** é exceção: a **cirurgia** das vias aéreas, em casos selecionados de apneia. No jato **pressurizado** de longa distância, pesam os fusos, a madrugada e o beliche; no avião **não pressurizado**, a hipóxia acima de 10.000 ft soma-se ao sono; no **helicóptero**, muitas vezes com um só piloto, não há quem assuma o comando se o sono vencer.",
          "**Como prevenir e amenizar.** Como usar o relógio a seu favor: a necessidade de sono varia de pessoa para pessoa, mas ninguém se treina para dormir menos: perder algumas horas por noite já prejudica o desempenho depois de **2 ou 3 dias**. Com a **idade**, a qualidade do sono piora, e o mesmo horário passa a render um sono mais leve. O dia do relógio tem horas fortes e fracas: o pior desempenho fica entre **1 e 5 horas**, a segunda queda vem no **meio da tarde**, e nas horas antes de deitar o relógio segura a vigília. Planeje o sono, o trabalho e as tarefas difíceis com esse mapa na cabeça.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 6, midia: 'tipo-voo-sono' },
          { paragrafo: 1, midia: 'animacao-relogio' },
          { paragrafo: 2, figura: foto(require('@/assets/images/topicos/m2v8-1-amanhecer.jpg'), 'A luz da manhã chega ao relógio biológico pelos olhos e acerta o ritmo do corpo para o dia que começa.') },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'O que muda em altitude · sono e relógio',
              colunas: ['Fator do voo', 'O que acontece no sono e no relógio', 'Quem é mais vulnerável'],
              linhas: [
                ['Fusos horários', 'O dia lá fora muda de lugar e o relógio leva dias para acompanhar', 'Quem cruza 2 ou mais fusos: o relógio do cérebro se ajusta devagar à luz nova; até lá, hormônios do sono e do despertar, temperatura e digestão seguem o horário de casa (Veja M2V8 - III)'],
                ['Madrugada', 'Trabalho na janela de baixa circadiana, entre 2 e 6 h', 'Tripulação de voos noturnos: entre 2 e 6 h a melatonina está alta e a temperatura do corpo no mínimo; o cérebro está programado para dormir, e a atenção cai (Veja M2V8 - V)'],
                ['Jornada longa', 'A pressão do sono cresce; o desempenho cai depois de 16 a 20 h acordado', 'Quem começou a jornada já cansado: a adenosina, que se acumula enquanto se está acordado, só é zerada pelo sono; quem dormiu pouco começa com dívida e chega antes ao limite (Veja M2V8 - V)'],
                ['Beliche e cabine', 'Ruído, luz e movimento deixam o sono mais curto e leve', 'Tripulação de revezamento: dorme fora do horário biológico, num ambiente que interrompe o sono, e perde sono profundo e REM, as fases que recuperam o cérebro (Veja M2V8 - VI)'],
                ['Altitude de montanha', 'Respiração periódica no sono acima de cerca de 2.700 m', 'Quem dorme alto sem aclimatação: o oxigênio baixo faz respirar mais, o gás carbônico cai, e a respiração para e volta em ciclos, fragmentando o sono (Veja M2V1)'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v8-1-beliche.jpg'), 'No beliche de descanso a bordo, o sono costuma ser mais curto e leve que em casa.') },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Como prevenir e amenizar · o dia do relógio biológico',
              colunas: ['Hora do relógio do corpo', 'O que o corpo faz', 'O que fazer'],
              linhas: [
                ['Fim da noite (cerca de 1 a 5 h)', 'Maior sono, temperatura mais baixa, melatonina no pico; erros sobem muito entre 2 e 4 h', 'Proteger o sono; em serviço, redobrar a atenção e as verificações'],
                ['Início da manhã', 'Cortisol no pico; a luz adianta o relógio', 'Luz do dia logo cedo quando quiser adiantar o relógio'],
                ['Meio da tarde (cerca de 15 a 17 h)', 'Segunda queda do alerta, com ou sem almoço', 'Melhor hora para um cochilo curto'],
                ['Horas antes de deitar', 'O relógio segura a vigília', 'Deitar mais cedo que o habitual rende pouco sono'],
                ['Cerca de 2 h antes de deitar', 'A melatonina começa a subir', 'Pouca luz forte'],
              ],
            },
          },
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
          "**Tratamentos, prognóstico e tipo de voo.** O relógio hormonal desregulado não é uma doença à parte: ele piora o **apetite**, o **açúcar do sangue** e o **humor**, e soma-se ao **diabetes** e à **obesidade** (Veja M2V9). A conduta é **expectante** depois de uma viagem isolada, porque o sono em dia recoloca os hormônios no lugar; a recuperação pede ao menos **2 noites seguidas** sem restrição. O tratamento **não invasivo** é a **luz** na hora certa, a **melatonina** em dose baixa, quando indicada, e o horário das refeições; quem tem diabetes ajusta com o médico os remédios ao fuso. Não há tratamento invasivo. Quem voa longas rotas **pressurizadas**, cruzando fusos e madrugadas, desloca o relógio hormonal com mais frequência; no avião leve **não pressurizado** e no **helicóptero**, que raramente cruzam fusos, o que desloca o relógio é a escala de madrugada.",
          "**Como prevenir e amenizar.** Como proteger os hormônios: a **luz** é o comando da melatonina: luz forte pela manhã e pouca luz forte nas horas antes de deitar. O **hormônio do crescimento** depende do sono profundo do **começo da noite**, por isso as primeiras horas de sono são as que mais valem. A fome que aparece depois de noites curtas é, em parte, **grelina alta e leptina baixa**: saber disso ajuda a não confundir sono com fome. Como a tolerância à glicose é menor **de madrugada**, quem trabalha à noite se dá melhor com refeições leves nessas horas e com a refeição principal no horário de dia. Nenhum suplemento substitui o sono: em poucas noites curtas, o metabolismo já muda.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · hormônios e relógio",
              colunas: ["Remédio", "Efeito que importa", "Tripulante"],
              linhas: [
                ["Melatonina (0,5 a 1 mg)", "Adianta ou atrasa o relógio conforme a hora", "ICAO: em geral não recomendada"],
                ["Cafeína", "Atrasa o sono se tomada tarde", "Parar 6 h antes de deitar"],
                ["Insulina e remédios do diabetes", "O horário muda com o fuso", "Ajustar com o médico (Veja M2V9)"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Liberação para voo · hormônios e relógio",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Sono curto há vários dias", "Evitar dirigir depois do voo", "Recuperar com 2 noites seguidas de sono sem restrição"],
                ["Diabetes com remédio em horário fixo", "Ajustar as doses ao fuso com o médico (Veja M2V9)", "Ajustar com o examinador (Veja M2V9)"],
                ["Melatonina para acertar o relógio", "Dose baixa, na hora certa", "ICAO: em geral não recomendada"],
              ],
            },
          },
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
          { paragrafo: 5, video: { fonte: require('@/assets/videos/m2v8-refeicao.mp4'), legenda: 'Fome fora de hora: com o relógio desajustado e pouco sono, o corpo pede comida no meio da noite.' } },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Como prevenir e amenizar · hormônios do sono',
              colunas: ['Hormônio', 'O que desregula', 'Como proteger'],
              linhas: [
                ['Melatonina', 'Luz forte à noite; luz na hora errada depois de cruzar fusos', 'Luz pela manhã e pouca luz forte antes de deitar'],
                ['Cortisol', 'Fusos e madrugadas: o pico continua no horário de casa por dias', 'Luz e rotina no horário em que vai viver; paciência nos primeiros dias'],
                ['Hormônio do crescimento', 'Noite sem sono ou sono profundo cortado', 'Proteger as primeiras horas de sono'],
                ['Leptina e grelina', 'Noites curtas: mais fome e mais vontade de doces e massas', 'Dormir o suficiente; reconhecer a fome do cansaço'],
                ['Insulina e glicose', 'Noites curtas e refeições grandes de madrugada', 'Refeições leves de madrugada; a principal no horário de dia'],
              ],
            },
          },
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
          "Voar no sentido **norte–sul**, sem mudar de fuso, não causa jet lag, mas o **voo noturno** e a **noite mal dormida** causam cansaço parecido (Veja M2V8 - V). Viagens **curtas** não dão tempo para o relógio se ajustar: nelas, o melhor é **manter o horário de casa**. Para o passageiro, curta é a viagem de **menos de 2 dias**; para o tripulante, o pernoite de **menos de 3 dias**.",
          "O jet lag pesa mais em quem já vem com **sono atrasado**, em quem viaja com **frequência** e em quem tem doenças que dependem de remédios em horário fixo, como o **diabetes** (Veja M2V9) e a **anticoagulação** (Veja M2V11). Para o tripulante, a preocupação principal é a **fadiga** que ele traz para a próxima jornada.",
          "**Tratamento, prognóstico e tipo de voo.** O jet lag tem conduta **expectante** quando a viagem é curta: fica-se no horário de casa e o corpo nem chega a se deslocar. Nas viagens longas, o tratamento é **não invasivo**: **luz** na hora certa, **melatonina** em dose baixa, cochilos curtos e, por poucas noites, **remédio para dormir** com orientação médica. Não há tratamento invasivo. O prognóstico é bom: o relógio se ajusta cerca de **1 hora por dia** depois de voar para o leste e **1,5 hora por dia** para o oeste. Quem tem remédio em horário fixo ajusta as doses com o médico. O jet lag é um problema do jato **pressurizado** de longa distância; o avião leve **não pressurizado** e o **helicóptero** raramente cruzam fusos, e neles o cansaço vem da madrugada e da jornada (Veja M2V8 - V).",
          "**Como prevenir e amenizar.** Antes de uma viagem longa, decida se vai se adaptar ou ficar no horário de casa: menos de 2 dias, fique no de casa. Indo para o **leste**, adiante o sono e procure luz pela manhã; indo para o **oeste**, atrase o sono e aproveite a luz do fim do dia. Não dirija sonolento no primeiro dia. O plano completo está no tópico seguinte (Veja M2V8 - IV).",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · jet lag e direção",
              colunas: ["Decisão", "O que fazer"],
              linhas: [
                ["Viagem de menos de 2 dias", "Ficar no horário de casa"],
                ["Viagem longa para o leste", "Adiantar o sono antes; luz pela manhã no destino"],
                ["Viagem longa para o oeste", "Atrasar o sono antes; luz no fim do dia no destino"],
                ["Primeiro dia", "Não dirigir sonolento"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · direção do voo",
              colunas: ["Remédio", "Voando para o leste", "Voando para o oeste"],
              linhas: [
                ["Melatonina", "Cerca de 90 minutos antes de deitar no destino", "Quando o relógio do corpo marca manhã"],
                ["Cafeína", "Pode ser tomada cedo de manhã", "Não cedo de manhã"],
                ["Remédio para dormir", "Poucas noites, com orientação médica", "Poucas noites, com orientação médica"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Liberação para voo · jet lag",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Viagem curta, de menos de 2 dias", "Manter o horário de casa", "Pernoite de menos de 3 dias: horário de casa"],
                ["Muitos fusos, primeiro dia", "Não dirigir nem decidir coisas importantes se sonolento", "Brasil: 2 h a mais de repouso por fuso a partir de 3 fusos"],
                ["Remédio em horário fixo (insulina, anticoagulante)", "Ajustar ao fuso com o médico", "Ajustar com o examinador"],
                ["Adaptação ao novo fuso", "Cerca de 1 h por dia para o leste e 1,5 h para o oeste", "FAA: aclimatado após 36 h no novo fuso"],
              ],
            },
          },
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v8-3-insonia.jpg'), 'Três da manhã no hotel, completamente acordado: o relógio do corpo ainda está no fuso de casa.') },
          { paragrafo: 2, midia: 'animacao-mapa-jet-lag' },
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
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v8-3-relogios.jpg'), 'Os relógios do aeroporto marcam a hora local; o relógio do corpo continua no fuso de casa.') },
          { paragrafo: 5, video: { fonte: require('@/assets/videos/m2v8-insonia.mp4'), legenda: 'Madrugada no hotel depois de cruzar fusos: o corpo cansado, mas o relógio interno ainda marca o dia.' } },
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
          "A **luz** é o tratamento mais forte. A luz forte **depois do ponto mais baixo do relógio**, cerca de 2 a 4 horas antes da hora habitual de acordar, **adianta** o relógio; a luz **à noite** o **atrasa**. Indo para o **leste**, procure **luz pela manhã** e evite a luz à noite, com óculos escuros e cortinas fechadas. Indo para o **oeste**, evite a luz forte de manhã cedo e aproveite a do fim do dia. No destino, saia e pegue **luz do dia no horário local**. A hora ideal da luz depende também do **número de fusos**: quando são muitos, a manhã do destino pode cair antes do ponto mais baixo do relógio do corpo, e vale usar uma calculadora de jet lag ou pedir orientação.",
          "A **melatonina** ajuda quando tomada na **hora certa**. Doses de **0,5 a 1 mg** costumam bastar; mais de **5 mg** não é recomendado, porque o excesso continua agindo na hora errada. Tomada cerca de **90 minutos antes de deitar** no horário do destino, ela **adianta** o relógio e ajuda quem voou para o **leste**; tomada quando o relógio do corpo marca **manhã**, **atrasa** e ajuda quem voou para o **oeste**. Quando a melatonina do próprio corpo já está alta, à noite do relógio interno, ela **não faz efeito**, e na hora errada **piora** o descompasso. Fora das farmácias, a dose real pode não ser a do rótulo.",
          "No dia a dia do destino, **cochilos de 20 a 30 minutos** ajudam a ficar acordado sem atrapalhar a noite; cochilos longos atrapalham. A **cafeína** age por cerca de **5 horas**: até **200 mg** a cada 4 horas de dia, parando **6 horas antes de deitar**. Indo para o **leste**, ela pode ser tomada cedo de manhã; indo para o **oeste**, não.",
          "As **refeições** também acertam o relógio. Nas duas direções, a regra é comer no **horário do destino** desde o primeiro dia; o que muda é como isso pesa no corpo. Indo para o **leste**, as refeições locais chegam **mais cedo** do que o corpo espera: tome o **café da manhã no horário local**, junto com a luz da manhã, e faça um **jantar cedo e leve** para conseguir deitar no horário local. Indo para o **oeste**, elas chegam **mais tarde**: **segure o jantar** até o horário local e, se a fome apertar antes, faça um lanche leve. A bordo, coma nos horários de refeição do destino e durma quando for noite lá. Na viagem curta, de menos de 2 dias, mantenha os horários de casa. Em qualquer direção, evite **refeição pesada**, acima de cerca de **20% da energia do dia**, nas **1 a 2 horas** antes do sono principal, mas não vá dormir com fome: quem dorme de dia deve comer algo antes para não acordar faminto. As fontes oficiais não recomendam uma dieta especial contra o jet lag; o que conta é o **horário** de comer.",
          "**Esticar o dia ou dormir?** Ficar acordado durante o **dia local** aumenta a pressão do sono e ajuda a dormir na noite do destino. Indo para o **oeste**, segure o sono até a **hora local de deitar**. Durante o dia local, prefira **cochilos de 20 a 30 minutos**: cochilos longos atrapalham a noite, e passando de **45 minutos** vem a inércia do sono. Se não conseguir evitar um sono maior, a ICAO orienta parar em **2 ou 3 horas**. Quem **não vai se adaptar** e fica no horário de casa faz o contrário: dorme nas horas de sono de casa, da **1 às 5 horas** e no **meio da tarde**. Antes de uma noite inteira de voo ou de trabalho, **durma durante o dia**. A bordo, dorme melhor quem toma **menos álcool e cafeína** e usa **máscara e tampões**.",
          "**Como prevenir e amenizar.** Outras dicas: o **exercício** aumenta o alerta: de preferência ao ar livre e de dia, somando a luz, mas sem esforço vigoroso nas **2 horas antes de dormir**. Beba **água** no voo e no destino: a desidratação piora os sintomas, e o **álcool** e a **cafeína** desidratam; o álcool também faz dormir mais rápido, mas **fragmenta** o sono. Leve o seu **ritual de dormir** para fora de casa. Cada pessoa reage de um jeito: teste as estratégias, fique com as que funcionam para você e lembre que **ansiedade** e **preocupações** pioram o sono longe de casa. O plano interativo acima ajuda a montar o seu horário.",
          "Remédios para dormir, como o **zolpidem** e a **eszopiclona**, podem ajudar o passageiro por poucas noites, com orientação médica. **Anti-histamínicos** e **calmantes de ação longa** pioram a atenção e o equilíbrio e devem ser evitados, inclusive a bordo. O **tripulante** segue regras próprias: em pernoites de **menos de 3 dias**, **fica no horário de casa**; a ICAO **não recomenda** a melatonina para tripulantes em geral; e a Lei do Aeronauta dá **2 horas a mais de repouso por fuso** quando a viagem cruza **3 ou mais fusos** num mesmo sentido.",
          "**Não dirija nem tome decisões importantes** no primeiro dia depois de cruzar muitos fusos se estiver sonolento. Procure o médico se a insônia durar mais que a adaptação esperada ou se usar remédios em horário fixo, como **insulina** e **anticoagulante**, para ajustar as doses ao novo fuso (Veja M2V9 e M2V11).",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 9,
            tabela: {
              titulo: "Liberação para voo · jet lag ao chegar",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Remédio para dormir nas primeiras noites", "Poucas noites, com orientação médica", "FAA: 12 a 72 h antes de voar, conforme o remédio"],
                ["Melatonina", "Dose baixa, na hora certa", "ICAO: em geral não recomendada"],
                ["Sonolento no primeiro dia", "Não dirigir nem decidir coisas importantes", "Não aceitar o serviço; avisar a escala"],
              ],
            },
          },
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
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Como prevenir e amenizar o jet lag',
              colunas: ['Medida', 'Voando para o leste', 'Voando para o oeste'],
              linhas: [
                ['Antes de viajar (2 a 3 dias)', 'Deitar e acordar 1 hora mais cedo por dia', 'Deitar e acordar 1 hora mais tarde por dia'],
                ['Horário do voo', 'Chegar numa hora que permita pegar luz pela manhã', 'Chegar numa hora que permita pegar luz no fim do dia'],
                ['Luz no destino', 'Procurar luz forte pela manhã; evitar luz à noite', 'Aproveitar a luz do fim da tarde; evitar luz forte de manhã cedo'],
                ['Muitos fusos', 'A hora ideal da luz muda: usar calculadora de jet lag ou pedir orientação', 'A hora ideal da luz muda: usar calculadora de jet lag ou pedir orientação'],
                ['Escuro no destino', 'Óculos escuros e cortinas fechadas à noite', 'Óculos escuros ao sair de manhã cedo'],
                ['Melatonina (passageiro)', '0,5 a 1 mg cerca de 90 minutos antes de deitar no horário do destino', '0,5 a 1 mg quando o relógio do corpo marca manhã; a hora depende dos fusos'],
                ['Primeira noite', 'Deitar no horário local, com quarto escuro e fresco', 'Ficar acordado até a hora local de dormir'],
                ['Cafeína', 'Até 200 mg a cada 4 horas de dia, inclusive cedo de manhã; parar 6 horas antes de deitar', 'Até 200 mg a cada 4 horas de dia, sem tomar de manhã cedo; parar 6 horas antes de deitar'],
                ['Cochilos', '20 a 30 minutos, durante o dia local', '20 a 30 minutos, durante o dia local'],
                ['Refeições', 'No horário do destino: café da manhã local com a luz da manhã; jantar cedo e leve', 'No horário do destino: segurar o jantar até a hora local; lanche leve se a fome apertar antes'],
                ['Água e álcool', 'Beber água; evitar álcool', 'Beber água; evitar álcool'],
                ['Viagem de menos de 2 dias', 'Manter o horário de casa', 'Manter o horário de casa'],
                ['Tripulante', 'Pernoite de menos de 3 dias no horário de casa; melatonina em geral não recomendada', 'Pernoite de menos de 3 dias no horário de casa; melatonina em geral não recomendada'],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Comer, dormir e ficar acordado na adaptação',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['A bordo', 'Comer nos horários de refeição do destino e dormir quando for noite lá; pouco álcool e cafeína; máscara e tampões'],
                ['Refeições indo para o leste', 'Horário local desde o primeiro dia: café da manhã com a luz da manhã; jantar cedo e leve'],
                ['Refeições indo para o oeste', 'Horário local desde o primeiro dia: segurar o jantar até a hora local; lanche leve se a fome apertar antes'],
                ['Viagem de menos de 2 dias', 'Refeições e sono no horário de casa'],
                ['Antes do sono principal', 'Sem refeição pesada nas 1 a 2 horas antes; não deitar com fome'],
                ['Primeiro dia no destino', 'Ficar acordado durante o dia local para ter sono à noite'],
                ['Voando para o oeste', 'Segurar o sono até a hora local de deitar'],
                ['Cochilo para a atenção', '20 a 30 minutos durante o dia local; acima de 45 minutos vem a inércia do sono'],
                ['Sono de dia que não dá para evitar', 'Parar em 2 ou 3 horas para preservar a noite'],
                ['Quem fica no horário de casa', 'Dormir nas horas de sono de casa: da 1 às 5 horas e no meio da tarde'],
                ['Antes de uma noite de voo', 'Dormir durante o dia'],
                ['Acordou de madrugada', 'Levantar, ler até ter sono e voltar para a cama (Veja M2V8 - VII)'],
                ['Exercício', 'De dia e ao ar livre; nada vigoroso nas 2 horas antes de dormir'],
                ['Água', 'Beber no voo e no destino; álcool e cafeína desidratam'],
                ['Tripulante em pernoite de menos de 3 dias', 'Ficar no horário de casa ou planejar o sono para dormir logo antes de sair para o voo'],
              ],
            },
          },
          { paragrafo: 8, figura: foto(require('@/assets/images/topicos/m2v8-4-caminhada.jpg'), 'Caminhar ao sol na manhã seguinte à chegada ajuda o relógio a se ajustar ao novo fuso.') },
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
          "**O que aumenta a fadiga.** Além do sono e da hora do dia, pesam a **idade**, a **saúde**, o **tipo de tarefa** (monótona ou exigente, física ou mental), o **tempo na tarefa**, a **carga de trabalho**, o **ambiente** (calor, frio, ruído) e os **remédios**. Na cabine contam ainda o **número e a composição da tripulação**, a **aclimatação ao fuso**, a **jornada anterior**, a **oportunidade de descanso** antes e durante o voo e a **recuperação** depois dele. Um fator muitas vezes esquecido: chegar à jornada **já com sono atrasado**.",
          "**Como prevenir e amenizar.** O sono é a única cura, e ele começa **antes da jornada**: antes de trabalhar a noite inteira, **durma durante o dia**. Um **cochilo de 25 a 30 minutos** antes de sair ajuda; mesmo **10 minutos** já melhoram a atenção. Em serviço, a **cafeína** age em **15 a 30 minutos** e dura até **5 horas**; use-a quando precisar, não por hábito. **Pausas de 5 minutos**, levantar e conversar quebram a monotonia, e o **descanso controlado** na cabine só vale onde a autoridade e a empresa permitem. Na madrugada, entre **2 e 4 horas**, redobre as verificações. Depois da jornada, recupere: são pelo menos **2 noites** de sono livre.",
          "**Não aceite o serviço** se dormiu bem menos que o habitual ou se já cochilou sem querer: avise a escala ou o comandante. Se estará acordado há mais de **16 horas** na hora de pousar, descanse ou cochile antes e fale com a escala. Nos EUA, a regra é explícita: o tripulante que se declara **fatigado** não pode ser escalado nem aceitar o voo, e a empresa deve retirá-lo do serviço.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 8,
            tabela: {
              titulo: "Remédios e voo · fadiga",
              colunas: ["Remédio", "Efeito que importa", "Tripulante"],
              linhas: [
                ["Cafeína", "Age em 15 a 30 minutos e dura até 5 horas", "Usar só quando precisar; o uso diário reduz o efeito"],
                ["Remédio para dormir no pernoite", "Pode deixar sono residual", "FAA: 12 a 72 h antes de voar"],
                ["Anti-histamínico que dá sono", "Sonolência no dia seguinte", "Evitar"],
              ],
            },
          },
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
                ['Acordado há mais de 16 h no pouso', 'Evitar dirigir na chegada', 'Risco alto: descansar ou cochilar antes e falar com a escala'],
                ['Já cochilou sem querer', 'Não dirigir', 'Não voar; investigar distúrbio do sono'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v8-5-bocejo.jpg'), 'Bocejos, pálpebras pesadas e releituras: os sinais aparecem antes de a pessoa admitir o cansaço.') },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Como prevenir e amenizar a fadiga',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Dias antes da jornada', 'Dormir o habitual; não chegar com sono atrasado'],
                ['Antes de trabalhar a noite', 'Dormir durante o dia, de preferência no meio da tarde'],
                ['Antes de sair para o voo', 'Cochilo de 25 a 30 minutos; acordar ao menos 10 a 15 minutos antes de tarefas de segurança'],
                ['Durante a jornada', 'Cafeína quando precisar; pausas de 5 minutos; levantar e conversar'],
                ['Madrugada (2 a 4 h)', 'Redobrar verificações e comunicação; hora de mais erros'],
                ['Voo longo', 'Usar o descanso a bordo para dormir; descanso controlado só onde permitido'],
                ['Sinais de alerta', 'Bocejos, pálpebras pesadas, cabeça caindo, releituras: avisar o colega'],
                ['Depois da jornada', 'Recuperar com pelo menos 2 noites de sono livre'],
                ['Passageiro depois de voo longo ou noturno', 'Não dirigir sonolento; descansar antes ou usar transporte'],
              ],
            },
          },
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
          "**Como prevenir e amenizar.** Como aproveitar o repouso: no pernoite, a prioridade é a **oportunidade de dormir**: quarto escuro, silencioso e fresco, despertador confiável e o sono marcado para as horas em que o relógio ajuda. Nos EUA, o tripulante que não conseguir as **8 horas** seguidas de oportunidade de sono deve **avisar a empresa**. A bordo, deite-se mesmo sem sono: o beliche raramente rende mais de **5 horas** de sono, e dois períodos de **3 a 5 horas** funcionam melhor que um de 8. Ao acordar do beliche ou do descanso controlado, dê **10 a 15 minutos** para a inércia passar antes de assumir. Depois de sequências de madrugadas ou de jornadas longas, a recuperação pede **2 noites** seguidas de sono livre.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 5,
            tabela: {
              titulo: "Remédios e voo · repouso e beliche",
              colunas: ["Remédio", "Efeito que importa", "Tripulante"],
              linhas: [
                ["Remédio para dormir no pernoite", "Ajuda, mas pode deixar sono residual", "ICAO: até 3 ou 4 doses por semana; FAA: 12 a 72 h antes"],
                ["Remédio para dormir no beliche", "Sono em pleno serviço", "Incompatível com as esperas da FAA"],
                ["Cafeína", "Age em 15 a 30 minutos e dura até 5 horas", "Evitar nas horas antes do repouso"],
              ],
            },
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Liberação para voo · jornada e repouso",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Repouso sem 8 h de oportunidade de sono", "Não se aplica", "FAA: avisar a empresa"],
                ["Sente-se fatigado antes da jornada", "Não se aplica", "FAA: declarar-se fatigado; não é escalado"],
                ["3 ou mais fusos num sentido", "Não se aplica", "Brasil: 2 h a mais de repouso por fuso, na base"],
                ["Voo longo com tripulação aumentada", "Dormir no horário do destino", "Beliche: 2 períodos de 3 a 5 h rendem mais que um de 8 h"],
              ],
            },
          },
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
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · repouso',
              colunas: ['Situação', 'O que fazer'],
              linhas: [
                ['Pernoite', 'Quarto escuro, silencioso e perto de 21 °C; despertador confiável'],
                ['Repouso sem 8 h seguidas para dormir', 'Avisar a empresa (exigência da FAA)'],
                ['Folga', 'Contar as noites de sono, não só as horas: 40 h que começam às 21 h valem mais que 48 h às 2 h'],
                ['Beliche no voo longo', 'Deitar mesmo sem sono; dois períodos de 3 a 5 h rendem mais que um de 8'],
                ['Descanso controlado na cabine', 'Só onde permitido; até cerca de 40 minutos; não serve para planejar a escala'],
                ['Ao acordar', 'Esperar 10 a 15 minutos antes de assumir tarefas de segurança'],
                ['Depois de madrugadas ou jornadas longas', 'Recuperar com 2 noites seguidas de sono livre'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '8.7',
      titulo: 'Contramedidas, remédios e distúrbios do sono',
      pergunta: 'O que funciona de verdade para dormir e ficar alerta?',
      conteudo: {
        texto: [
          "A única cura para a fadiga é **dormir**, e o sono começa antes de deitar. Durma quando o relógio ajuda: proteja a **madrugada** do relógio do corpo, quando o sono vem mais fácil, e prefira cochilar no **meio da tarde** do relógio do corpo, perto de **15 a 17 horas**. Bloqueie a **luz** com cortina ou máscara, use **tampões** ou ruído branco, deixe o quarto perto de **21 °C**, evite **exercício vigoroso** nas 2 horas antes e **refeição pesada** 1 a 2 horas antes, e siga um **ritual** de dormir também fora de casa. Use um **despertador confiável**, para não dormir com medo de perder a hora, e reserve um tempo para **desacelerar** depois de tarefas tensas. Cafeína, **tabaco** e comida ficam longe das horas antes de deitar.",
          "O **álcool** engana: faz adormecer mais rápido, mas **2 doses** atrasam o REM e **3 ou mais** fazem acordar cedo. A **cafeína** leva de **15 a 30 minutos** para agir e dura até **5 horas**; quem a usa todo dia perde parte do efeito. O **cochilo** é a contramedida mais forte: **10 minutos** já melhoram a atenção, e o ideal fica entre **20 e 30 minutos**; cochilos de mais de **45 minutos** trazem a **inércia do sono**, uma lentidão de **20 minutos ou mais** ao acordar; dê ao menos **10 a 15 minutos** antes de uma tarefa de segurança.",
          "Acordou de madrugada no pernoite e não volta a dormir? Levante-se, leia por cerca de uma hora ou até ter sono e tente de novo; se em meia hora continuar acordado, repita. Durante o dia no destino, prefira cochilos curtos; se não conseguir evitar dormir mais, pare em **2 ou 3 horas** para preservar a noite.",
          "**Remédio para dormir** é exceção, não rotina. A ICAO aceita poucas noites, no máximo **3 ou 4 doses por semana**, sempre com orientação de um médico que conheça a aviação e depois de um **teste em solo**. Nunca compre remédio para dormir sem receita no exterior: dose e qualidade são incertas. Na FAA, a espera depois da última dose vai de **12 horas** (zaleplona) a **72 horas** (temazepam), e o **uso diário não é permitido**. No Brasil, o uso contínuo de remédio para dormir fica **a critério do médico examinador**.",
          "Sonolência que não melhora com sono pede investigação. A **apneia do sono** é a causa mais comum (Veja M2V1 - VII): a ICAO considera **inapto temporário** o tripulante com escala de sonolência de **Epworth de 10 ou mais** ou história sugestiva, e manda investigar quem tem pescoço com mais de **43 cm** ou IMC acima de **30** e ronca. Outras causas são a **narcolepsia**, a **hipersonia idiopática**, os **movimentos periódicos das pernas**, a **depressão** e a **dor**. Para a FAA, a condição crônica que atrapalha o sono **desqualifica** até ser tratada.",
          "**Tratamentos, prognóstico e tipo de voo.** Na **insônia** de viagem, a conduta é **expectante** e de higiene do sono. Na insônia crônica, o tratamento **não invasivo** de primeira escolha é a **terapia cognitivo-comportamental para insônia**; o remédio entra por pouco tempo, às vezes junto com ela. Na **apneia**, o **CPAP** é o tratamento padrão, com perda de peso e, para alguns, aparelho na boca; a **cirurgia** das vias aéreas é o tratamento **invasivo**, para casos selecionados, e o tripulante só volta a voar quando o tratamento se mostra **eficaz**. Para a FAA, a **narcolepsia** e a **hipersonia** são incompatíveis com o voo do tripulante, tratadas ou não; os **movimentos das pernas** são avaliados caso a caso, com os remédios e a ferritina. O passageiro com apneia leva o **CPAP** e o usa no voo noturno **pressurizado** (Veja M2V1 - VII); no avião **não pressurizado**, a hipóxia acima de 10.000 ft soma-se às pausas; no **helicóptero** de um só piloto, a sonolência não tratada não tem quem a cubra.",
          "**Como prevenir e amenizar.** Não use remédio para dormir pela primeira vez antes de um voo, não misture com **álcool** e não use cafeína para substituir o sono. O médico pergunta pelo **ronco**, pelos **cochilos involuntários** e pelos remédios, aplica a **escala de Epworth** e, se preciso, pede o **estudo do sono**.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · distúrbios do sono",
              colunas: ["Tratamento", "Efeito que importa", "Tripulante"],
              linhas: [
                ["Terapia cognitivo-comportamental para insônia", "Primeira escolha, sem remédio", "Sem restrição própria"],
                ["Remédio para dormir", "Ajuda por poucas noites", "FAA: 12 a 72 h antes; uso diário não permitido"],
                ["CPAP", "Trata a apneia", "Volta a voar com o tratamento eficaz"],
                ["Cirurgia da apneia", "Para casos selecionados", "Volta quando o tratamento se mostra eficaz"],
                ["Remédios para narcolepsia", "Controlam a sonolência", "FAA: condição incompatível com o voo"],
                ["Remédios para pernas inquietas", "Alguns dão sono", "FAA: caso a caso, com ferritina"],
              ],
            },
          },
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v8-7-quarto.jpg'), 'Quarto de hotel escuro, fresco e silencioso: a higiene do sono vale também longe de casa.') },
          { paragrafo: 2, midia: 'cochilo-cafeina' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Como prevenir e amenizar · higiene do sono',
              colunas: ['Item', 'O que fazer'],
              linhas: [
                ['Horário', 'Dormir nas horas de sono do relógio do corpo; de dia, no meio da tarde'],
                ['Luz', 'Cortina blackout ou máscara de olhos'],
                ['Ruído', 'Tampões, com ou sem ruído branco de fundo'],
                ['Temperatura', 'Perto de 21 °C'],
                ['Ansiedade', 'Despertador confiável; sem pressa; desacelerar antes de deitar'],
                ['Exercício', 'Ajuda o sono, mas nada vigoroso nas 2 horas antes'],
                ['Cafeína, tabaco e comida', 'Longe das horas antes de deitar; a cafeína leva 4 a 6 horas para sair'],
                ['Álcool', 'Mais de uma dose já piora o sono'],
                ['Ritual', 'Repetir fora de casa a rotina de antes de dormir'],
                ['Refeição', 'Comer antes do sono de dia; nada acima de 20% da energia do dia 1 a 2 horas antes do sono principal'],
              ],
            },
          },
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
            paragrafo: 7,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Cérebro e atenção', 'Reação lenta, lapsos e microssonos depois de 16 a 20 h acordado ou com sono acumulado; a adenosina se acumula no cérebro enquanto se está acordado, e só o sono a zera', 'Dormir antes da jornada; cochilo estratégico; recusar o voo fatigado'],
                ['Relógio biológico', 'Descompasso com o horário local por dias depois de cruzar fusos: o relógio do cérebro se ajusta devagar à luz do novo lugar', 'Luz na hora certa; manter o horário de casa em viagens curtas'],
                ['Hormônios', 'Melatonina e cortisol fora de hora; menos hormônio do crescimento sem sono: eles seguem o relógio biológico e o sono profundo, que o fuso e a jornada deslocam', 'Horários coerentes de luz, sono e refeições'],
                ['Apetite e metabolismo', 'Mais grelina, menos leptina e pior uso da glicose com noites curtas: sem sono, o hormônio da fome sobe, o da saciedade cai e as células respondem pior à insulina', 'Proteger o sono; refeições no horário do destino'],
                ['Estômago e intestino', 'Mal-estar e alteração do intestino no jet lag: o intestino tem relógio próprio e segue o horário de casa', 'Hidratação; refeições leves no horário do destino'],
                ['Humor', 'Irritação e queda do humor com o sono curto e a desregulação do relógio, porque o sono regula as emoções', 'Folgas reais; procurar ajuda se persistir (Veja M2V7)'],
                ['Respiração no sono', 'Apneia e respiração periódica em altitude fragmentam o sono: cada pausa baixa o oxigênio e faz o cérebro despertar para respirar', 'CPAP; avaliação do ronco e da sonolência'],
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
