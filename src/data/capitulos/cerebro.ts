// Missão 2 (Sistemas) · Voo 6 — Cérebro e sistema nervoso (o número do voo é definido em secoes.ts).
// Escrito no modelo de Sistemas (docs/modelo-sistemas.md), com o detalhamento prático do padrão do jet lag, em
// 04/11/2026, a pedido do autor ("Vamos seguir para o próximo voo"). A lista antiga (epilepsia, síncope, cefaleia, AVC,
// trauma craniano, doenças neurodegenerativas) ganhou o tópico de abertura e virou 7 tópicos. A síncope de origem
// cardíaca está no M2V2 - IV; aqui entra a síncope reflexa (vasovagal), com remissão.
//
// REGISTRO DE REVISÃO (04/11/2026) — fontes:
// - ICAO, Doc 8984, 3ª ed. (PDF enviado pelo autor), Part III, Cap. 10 (Neurological disorders):
//   10.1.2 (Anexo 1, 6.3.2.3 e 6.3.2.4: sem doença do sistema nervoso que interfira, sem epilepsia, sem perturbação da
//   consciência sem explicação satisfatória; sem traumatismo craniano com efeitos que interfiram); 10.1.4–10.1.5 (a
//   história é o principal; até 40% dos epilépticos têm EEG normal); 10.1.6 e 10.2.1 (risco de incapacitação acima de
//   1% ao ano é inaceitável; multitripulação reduz o risco). Enxaqueca 10.2.2–10.2.8 (17% das mulheres, 10% dos homens;
//   sem aura, com aura e equivalente; gatilhos: queijo, chocolate, privação de sono, sol, estresse, álcool, vinho tinto;
//   aura que tira metade do campo visual é inaceitável; início em minutos inaceitável; 1 ou 2 crises por ano pode não
//   desqualificar, várias por mês impedem; betabloqueadores e bloqueadores de cálcio aceitáveis; antidepressivos,
//   anticonvulsivantes e narcóticos não; observação de 6 a 12 meses). Cefaleia em salvas 10.2.9–10.2.11 (dor de 30 a 45
//   min; desqualifica; considerar depois que a salva acaba e o tratamento para). Cefaleia crônica diária 10.2.12–10.2.15
//   (observação de 3 a 6 meses sem remédio proibido). Amnésia global transitória 10.2.16–10.2.21 (até 24 h, média de 4 a
//   6 h; recorrência de 3% ao ano; 1 ano ou mais sem sintomas). Síncope 10.2.22–10.2.26 (3% da população; em pé; pródromo
//   de 2 a 5 min; dura 10 a 15 s; abalos em 10%; desqualifica até achar a causa; observação de 3 meses com 1 ou 2
//   episódios benignos explicados, 6 a 12 meses com episódios repetidos). Convulsão 10.2.27–10.2.39 (epilepsia: duas ou
//   mais crises não provocadas; crise sintomática aguda, como hipoglicemia, hipóxia, sódio baixo, não indica epilepsia;
//   60% sem causa conhecida; fase tônica de 15 a 20 s, crise de 1 a 2 min, confusão depois; epilepsia desqualifica,
//   recorrência acima de 1% ao ano impede; crise única: risco de cerca de 30% em 4 anos sem fatores de risco; 4 anos sem
//   crise e sem remédio). AVC 10.3.1–10.3.16 (85% isquêmicos; AIT: cerca de 30% de AVC em 5 anos; depois do primeiro
//   ano, recorrência de cerca de 4% ao ano; desqualifica; forame oval fechado, dissecção e lacunar: 1 ano; aterotrombótico:
//   2 anos; hemorrágico: 1 a 2 anos; subaracnoide com aneurisma isolado: 1 ano). Trauma 10.4.1–10.4.14 (amnésia
//   pós-traumática: até 1 h leve, 1 a 24 h moderado, 1 a 7 dias grave, mais de 7 dias muito grave; epilepsia
//   pós-traumática: até 40% nos penetrantes, 5% nos fechados; 50% das primeiras crises em 6 meses, 75% no primeiro ano,
//   90% em 2 anos; síndrome pós-concussão: 3 a 6 meses sem sintomas; déficit focal: 6 meses a 2 anos; sequela cognitiva:
//   1 a 5 anos; hematoma epidural simples: 1 a 2 anos; subdural e intraparenquimatoso: 2 anos; lesão axonal difusa: 1 a
//   2 anos; casos graves: até 5 anos). Tumores 10.5.1–10.5.7 (benigno retirado: 1 ano de observação; maligno: impedimento
//   permanente, raras exceções depois de cerca de 10 anos). Doenças progressivas 10.6.2–10.6.13 (tremor essencial: 5 a
//   6% da população, não desqualifica sem prejuízo funcional, propranolol com 3 meses de observação; Parkinson: o
//   diagnóstico não desqualifica por si, levodopa pode ser aceita, agonistas dopaminérgicos não; esclerose múltipla:
//   desqualifica; depois de estabilidade, 3 meses nos casos leves e 6 a 12 meses nos mais significativos;
//   imunomoduladores não impedem). Part I, Cap. 3, Tabela I-3-1 (questionários com mais de 3.000 pilotos de linha:
//   desmaio 7% e cefaleia 6% das incapacitações em voo relatadas).
// - ANAC, RBAC 67, Emenda 05: 67.77 (1ª classe; 67.117 e 67.197 com o mesmo conteúdo para as outras classes): não pode
//   ter hemiplegia, doença vascular autoimune do SNC, doença do sistema nervoso que interfira, epilepsia, EEG com
//   grafoelementos epileptiformes ou lentificações (estas aceitas com ressonância sem lesão significativa), perda de
//   consciência recorrente sem explicação, infarto cerebral ou cerebelar, insuficiência vascular cerebral, aneurisma,
//   hemorragia meníngea ou intracerebral, enxaqueca com fenômenos oculares e neurológicos focais transitórios, neoplasia
//   cerebral, perda de controle do sistema nervoso recorrente sem explicação (episódio único: examinador julga com a
//   ANAC), transtornos de equilíbrio, sensibilidade, força ou coordenação, cirurgia cerebral ou trauma craniano com
//   sequelas; EEG no exame inicial (67.77(b)).
// - FAA, Guide for Aviation Medical Examiners: Item 46 (condições neurológicas inicialmente desqualificantes; a maioria
//   é negada ou adiada para a FAA). Seizure (crise febril simples até 5 anos, única, sem remédio: o AME emite; crise
//   única com causa corrigida: adiar, 1 ano; crise única sem causa: adiar, 4 anos com os 2 últimos sem anticonvulsivante;
//   duas ou mais: epilepsia). Epilepsy (10 anos sem crise, os 3 últimos sem remédio; adiar para autorização especial).
//   Headache/Migraine (tensional com menos de 2 dias de dor por mês e analgésico comum: emite; enxaqueca: CACI;
//   enxaqueca complicada, retiniana e pós-traumática: adiar). Migraine Medication (atualizado em 26/08/2026): triptanos
//   24 h depois da dose (almotriptano, naratriptano, rizatriptano, sumatriptano, zolmitriptano), eletriptano e
//   frovatriptano 48 h; gepantos (rimegepanto, ubrogepanto, zavegepanto) 24 h; di-hidroergotamina 48 h;
//   metoclopramida 36 h; ondansetrona 24 h; prometazina 96 h; só uso ocasional; preventivos aceitos com 7 dias de teste em
//   solo (metoprolol, propranolol, verapamil, nifedipino, lisinopril, BRA, anticorpos anti-CGRP e atogepanto);
//   inaceitáveis: tricíclicos, gabapentina, lacosamida, lamotrigina, pregabalina, topiramato, valproato, butalbital,
//   opioides. Stroke-CVA-TIA (atualizado em 26/04/2023): adiar; AVC cortical ou AIT, 2 anos; AVC subcortical, 1 ano.
//   Head Injury: concussão leve (perda de consciência ou amnésia de menos de 1 h): 6 meses; moderado (1 a 24 h, fratura
//   sem afundamento, crise depois de 24 h): 12 meses; grave (sangue no cérebro, contusão, hematoma, lesão axonal difusa,
//   mais de 24 h, fratura com afundamento, penetrante): 5 anos; sempre adiar para a FAA.
// - UK Civil Aviation Authority, guidance for health professionals, Neurology: esperar pelo menos 24 h depois de uma
//   convulsão e levar o remédio de emergência; epilepsia não controlada ou crise nova precisa de liberação médica; esperar
//   pelo menos 2 semanas depois de AVC e 2 dias depois de AIT; cirurgia do cérebro: esperar a liberação do neurocirurgião,
//   para o gás preso ser absorvido; seguir o horário dos remédios (epilepsia, Parkinson); Alzheimer: acompanhante.
// - IATA, Medical Manual, nos critérios adotados pela Link Airways (Medical Clearance Guidelines, que declaram seguir o
//   manual): convulsão tônico-clônica nas últimas 24 h não aceita; AVC até o 4º dia não aceito, do 5º ao 14º com quadro
//   estável e acompanhante de enfermagem, oxigênio nas 2 primeiras semanas; AIT só depois de 2 dias e investigado;
//   cirurgia do crânio até o 9º dia não aceita, a partir do 10º com o crânio sem ar.
// - Aerospace Medical Association, Medical Guidelines for Airline Travel, Neurology (2014): hipóxia relativa da cabine
//   pode precipitar enxaqueca; gás intracraniano expande; convulsões frequentes não controladas: não viajar; não
//   recomendado depois de crise no último mês; privação de sono, sono interrompido e ritmo circadiano baixam o limiar;
//   anticonvulsivantes não costumam estar no kit de bordo; AIT frequentes ou em crescendo: não voar; AVC: 2 a 4 semanas
//   de observação; sem trombólise a bordo; cirurgia intracraniana: 10 a 14 dias, com avaliação de ar; enxaqueca
//   controlada não é problema; gatilhos: privação de sono, refeição pulada, fuso, ruído; síncope: separar vasovagal de
//   arritmia; demência: acompanhante; déficit motor: cadeira de rodas e embarque antecipado; urgência urinária: assento
//   perto do banheiro.
// - Peterson et al., New England Journal of Medicine, 2013 (via Advisory Board, 31/05/2013): 11.920 emergências em voo
//   de 2008 a 2010, uma a cada 604 voos; síncope ou pré-síncope 37,4%, convulsão 5,8%; AVC raro, mas com mais desvios e
//   internações.
// - Massachusetts Department of Public Health, Stroke signs and symptoms (F.A.S.T.): rosto caído de um lado, braço que
//   cai, fala difícil, tempo; fraqueza súbita, confusão, visão, equilíbrio, dor de cabeça súbita e forte.
// - Valores já usados no app: gás preso expande cerca de 38% a 8.000 ft (M2V1); saturação perto de 93% a 8.000 ft (M2V2).
// Condutas práticas sem número próprio (beber água, levantar devagar, sentar ou deitar no pródromo, remédio na bagagem de
// mão, avisar a tripulação, pedir assento no corredor) são aplicações das fontes acima. Sem fonte: [confirmar na
// referência].

import { liberacaoCerebro } from '../liberacao/cerebro';
import type { Capitulo } from '../tipos';

const foto = (arquivo: number, legenda: string) => ({ imagem: arquivo, legenda });

export const cerebro: Capitulo = {
  numero: 6,
  titulo: 'Cérebro e sistema nervoso',
  tempoLeituraMin: 45,
  topicos: [
    {
      id: '6.1',
      titulo: 'O cérebro em altitude',
      pergunta: 'Por que o cérebro é o primeiro a sentir a cabine?',
      conteudo: {
        texto: [
          "O **cérebro** não guarda reserva de oxigênio: depende do sangue a cada segundo. Por isso é o primeiro órgão a sentir a **cabine**. A **8.000 ft**, a saturação de quem está em repouso cai para perto de **93%** (Veja M2V2 - I); a pessoa saudável nem percebe, mas a falta de oxigênio deixa o raciocínio mais lento muito antes de dar sintomas (Veja M2V1 - IV).",
          "O voo mexe também com os **gatilhos** das doenças do cérebro. A hipóxia relativa da cabine pode disparar **enxaqueca** em algumas pessoas; **privação de sono**, sono interrompido e **fuso horário** baixam o limiar da **convulsão**; refeição pulada e ruído pioram a dor de cabeça; ficar muito tempo **em pé**, com calor e pouca água, favorece o **desmaio**.",
          "Pela **lei de Boyle** (Veja M1V1 - II), o gás preso numa cavidade fechada se expande cerca de **38%** a 8.000 ft. Dentro do **crânio** não costuma haver ar, mas depois de uma **cirurgia** ou de um **trauma** pode ficar uma bolha. Ela cresce na subida e aperta o cérebro, que não tem para onde ir: é por isso que existe prazo para voar depois de operar a cabeça.",
          "As doenças do cérebro raramente pioram por causa do voo; o problema é que podem **incapacitar de repente**. Em questionários com mais de 3.000 pilotos de linha, **desmaio** foi **7%** e **dor de cabeça 6%** das incapacitações em voo relatadas. Entre passageiros, numa série de quase 12 mil emergências, **síncope ou pré-síncope** foram **37,4%** e **convulsão 5,8%**; o **AVC** foi raro, mas levou mais a desvio e internação.",
          "Para o tripulante, a norma pergunta uma coisa só: qual o risco de **perder a consciência ou a capacidade** em voo. A ICAO considera inaceitável um risco acima de **1% ao ano** e lembra que, com dois pilotos, o outro assume. A ANAC, a FAA e a ICAO tratam epilepsia, AVC, perda de consciência sem causa e trauma com sequela como **impedimento**, com prazos para reavaliar.",
          "**Como proteger o cérebro no voo.** Antes, **durma bem**, coma e beba água; leve os remédios na **bagagem de mão**, com o horário ajustado ao fuso (Veja M2V8). Durante, beba água, evite **álcool**, levante devagar e não fique muito tempo em pé no corredor. Se vier tontura, aura, fraqueza de um lado ou confusão, **sente-se e avise a tripulação** na hora. O tripulante não voa com sono atrasado nem com remédio que dê sono.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v6-1-piloto.jpg'), 'O raciocínio fica mais lento com pouco oxigênio muito antes de qualquer sintoma.') },
          { paragrafo: 2, midia: 'gatilhos-cerebro' },
          { paragrafo: 3, midia: 'animacao-ar-cranio' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'O que muda em altitude',
              colunas: ['Fator do voo', 'O que acontece no cérebro', 'Quem é mais vulnerável'],
              linhas: [
                ['Menos oxigênio', 'Raciocínio mais lento; pode disparar enxaqueca', 'Quem tem enxaqueca, doença pulmonar ou cardíaca: o cérebro consome muito oxigênio e não o guarda; com pulmão ou coração doente o sangue chega mais pobre, e a falta de oxigênio é gatilho de enxaqueca'],
                ['Gás que expande', 'Bolha de ar no crânio cresce cerca de 38% a 8.000 ft', 'Quem operou a cabeça ou teve trauma recente: o ar que entrou no crânio fica preso numa caixa rígida; ao crescer, comprime o cérebro'],
                ['Sono curto e fuso', 'Limiar de convulsão mais baixo; mais crises de enxaqueca', 'Quem tem epilepsia ou enxaqueca: a privação de sono deixa os neurônios mais excitáveis e baixa o limiar de crise; mudar o horário do remédio muda o nível dele no sangue'],
                ['Calor, pouca água, ficar em pé', 'Pressão cai e o cérebro recebe menos sangue: desmaio', 'Quem já desmaiou, idosos, quem usa remédio de pressão: o sangue se acumula nas pernas; o reflexo que contrai os vasos e acelera o coração é mais lento no idoso e freado pelo remédio, e a desidratação reduz o volume de sangue'],
                ['Refeição pulada e ruído', 'Dor de cabeça e enxaqueca', 'Quem tem enxaqueca: o cérebro com enxaqueca reage mais a mudanças; o jejum baixa o açúcar e o estímulo sensorial forte excita os neurônios, dois gatilhos conhecidos'],
                ['Atendimento limitado a bordo', 'Sem trombólise para AVC; anticonvulsivante raro no kit', 'AVC recente, epilepsia não controlada: o cérebro lesado tem menos reserva para a falta de oxigênio e a crise pode se repetir; a bordo não há como tratar a tempo'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v6-1-noite.jpg'), 'Voo noturno e fuso cortam o sono, um gatilho conhecido de convulsão e enxaqueca.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · o cérebro em voo',
              colunas: ['Momento', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Antes', 'Dormir bem, comer, beber água; remédios na bagagem de mão', 'Sono em dia; nenhum remédio que dê sono'],
                ['Horário dos remédios', 'Manter os intervalos, ajustando ao fuso', 'Só remédios aceitos pela autoridade'],
                ['Durante', 'Água, sem álcool, levantar devagar', 'Água, refeição na hora, descanso programado'],
                ['Sinal de alerta', 'Sentar e avisar a tripulação', 'Passar os comandos e avisar o controle'],
                ['Depois de cirurgia ou trauma na cabeça', 'Só voar com a liberação do médico', 'Avaliação antes de voltar'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '6.2',
      titulo: 'Epilepsia e convulsão',
      pergunta: 'Quem já teve uma convulsão pode voar?',
      conteudo: {
        texto: [
          "Uma **convulsão** é uma descarga elétrica anormal e excessiva dos neurônios do córtex. **Epilepsia** é a tendência a ter crises **repetidas e sem causa aparente**: são precisas pelo menos **duas** para o diagnóstico. Nem toda crise é epilepsia: a convulsão **provocada** por hipoglicemia, hipóxia, sódio baixo ou infecção aguda não indica que vai voltar. Em **60%** das crises, a causa não é encontrada.",
          "Na crise **tônico-clônica**, o corpo enrijece por **15 a 20 segundos** e depois se sacode; tudo costuma acabar em **1 a 2 minutos**, com confusão, sono e dor no corpo depois. Na crise **focal complexa**, a pessoa fica alheia por um ou dois minutos, com movimentos repetidos. A crise **focal** sugere uma lesão no cérebro, que precisa ser procurada. O **EEG** é normal em até **40%** das pessoas com epilepsia, por isso a **história** pesa mais que o exame.",
          "No voo, o risco é a crise chegar com **privação de sono**, sono interrompido ou **fuso**, que baixam o limiar. A bordo, o kit médico raramente tem anticonvulsivante, e uma crise longa pode obrigar a **desviar**. Para o passageiro, a CAA britânica pede esperar pelo menos **24 horas** depois de uma convulsão; quem tem epilepsia **não controlada** ou uma crise **nova** precisa de liberação médica, e a AsMA não recomenda voar depois de crise no **último mês**.",
          "Para o tripulante, a regra é rígida. A **ANAC** não aceita epilepsia nem EEG com **grafoelementos epileptiformes**, e o EEG faz parte do exame inicial. A **ICAO** trata epilepsia como impedimento quase sempre permanente e, depois de uma **crise única**, só considera voltar após **4 anos** sem crise e sem remédio: sem fatores de risco, a chance de voltar a ter crise é de cerca de **30%** nesse período, e depois disso se aproxima da população geral. A **FAA** emite só para a **crise febril simples** até os 5 anos; crise única sem causa espera **4 anos**, os últimos 2 sem remédio; epilepsia, **10 anos** sem crise, os últimos **3** sem remédio, e a decisão é da própria FAA.",
          "Voar sem liberação é arriscado dos dois lados. A crise no cockpit é **incapacitação súbita**; para o tripulante, omitir a crise no exame médico é infração à norma e pode invalidar o certificado e o seguro. Para o passageiro, uma crise a bordo pode significar desvio e atendimento sem estrutura; a companhia pode exigir o formulário médico (**MEDIF**) de quem teve crise recente.",
          "**Como prevenir e amenizar.** Tome o anticonvulsivante **no horário**, ajustando ao fuso com o médico, e leve o suficiente para a viagem toda, mais o remédio de emergência, na **bagagem de mão**. Durma antes do voo e evite álcool. Viaje com alguém que saiba o que fazer e avise a tripulação de que tem epilepsia. Os anticonvulsivantes são **incompatíveis** com a função de tripulante: quem precisa deles não voa como piloto até cumprir o prazo da autoridade.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v6-2-neurologista.jpg'), 'A história do que aconteceu, contada por quem viu, pesa mais que o EEG.') },
          { paragrafo: 2, midia: 'prazo-convulsao' },
          { paragrafo: 3, figura: foto(require('@/assets/images/topicos/m2v6-2-remedio.jpg'), 'O anticonvulsivante viaja na bagagem de mão, com o horário ajustado ao fuso.') },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · convulsão e epilepsia',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Convulsão nas últimas 24 horas', 'Não voar (CAA, IATA)', 'Não voar; avaliação'],
                ['Crise no último mês ou epilepsia não controlada', 'Liberação médica; a AsMA não recomenda voar', 'Inapto'],
                ['Epilepsia controlada', 'Pode voar, com o remédio no horário', 'Inapto (ANAC, ICAO); FAA: 10 anos sem crise, 3 sem remédio'],
                ['Crise única sem causa', 'Pode voar depois de 24 h e da avaliação', 'ICAO e FAA: 4 anos sem crise (FAA: os 2 últimos sem remédio)'],
                ['Crise provocada, causa corrigida', 'Pode voar', 'FAA: 1 ano, decisão da FAA'],
                ['Crise febril simples na infância', 'Pode voar', 'Não impede (FAA: o examinador emite)'],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Remédios e voo · convulsão',
              colunas: ['Remédio ou classe', 'Efeito que importa no voo', 'Tripulante (FAA/ANAC)'],
              linhas: [
                ['Anticonvulsivantes (lamotrigina, valproato, topiramato, lacosamida, gabapentina, pregabalina)', 'Sono, lentidão; atraso de dose facilita a crise', 'Incompatíveis com o voo (FAA; ICAO)'],
                ['Remédio de emergência da crise', 'Sono forte depois', 'Não se aplica: quem precisa não voa como tripulante'],
                ['Horário com fuso', 'Dose atrasada baixa a proteção', 'Planejar com o neurologista'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '6.3',
      titulo: 'Desmaio e perda de consciência',
      pergunta: 'Desmaiar a bordo é sinal de doença grave?',
      conteudo: {
        texto: [
          "A **síncope** é a perda rápida da consciência e do tônus por falta de sangue no cérebro inteiro, com recuperação sozinha. Acontece com **3%** da população. A mais comum é a **vasovagal** (reflexa): a pressão cai, às vezes com o coração lento, e a pessoa amolece e escorrega. A síncope **súbita**, sem aviso, quase sempre vem do **coração** (Veja M2V2 - IV).",
          "A vasovagal tem **aviso**: um pródromo de **2 a 5 minutos** com visão escurecendo ou amarelada, enjoo, bocejo, suor e palidez. O desmaio dura **10 a 15 segundos**, com pouca confusão. Em **10%** das vezes há abalos musculares ou perda de urina, o que **não** é convulsão. Acontece quase sempre **em pé**, raramente sentado e quase nunca deitado; medo, dor, ver sangue, calor e tempo em pé são os gatilhos.",
          "No avião, síncope e pré-síncope são a **emergência mais comum**: **37,4%** dos casos numa série de quase 12 mil emergências em voo. Pesam a **desidratação** do ar seco, o **álcool**, o jejum, a espera em pé na fila do banheiro e o levantar rápido depois de horas sentado. A **hipóxia leve** da cabine soma-se aos outros fatores (Veja M2V1).",
          "Para o tripulante, a ICAO trata a síncope como impedimento **até achar a causa**. Com um ou dois episódios **benignos e explicados**, pode bastar **3 meses** de observação; episódios **repetidos** que exigem tratamento pedem **6 a 12 meses**. A ANAC não aceita perda de consciência **recorrente sem explicação**; num episódio **único**, o examinador decide junto com a ANAC. A FAA adia para a própria FAA a perda de consciência sem explicação.",
          "Desmaiar no comando é **incapacitação total**, mesmo que dure segundos. Para o passageiro, o desmaio benigno não impede o voo, mas desmaios **repetidos**, sem causa ou com o coração envolvido precisam de avaliação antes; a AsMA lembra que separar o vasovagal da **arritmia** é o que decide.",
          "**Como prevenir e amenizar o desmaio.** Antes, coma algo e beba água; evite álcool na véspera e a bordo. Durante, mexa as pernas sentado, beba água e **levante devagar**, em dois tempos. No primeiro sinal do pródromo, **sente-se ou deite-se** com as pernas para cima e avise a tripulação; não tente chegar ao banheiro. Quem já desmaiou deve pedir **assento no corredor** e contar ao médico antes da viagem.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v6-3-corredor.jpg'), 'A espera em pé no corredor, depois de horas sentado, é um momento típico de desmaio.') },
          { paragrafo: 2, midia: 'desmaio-convulsao' },
          { paragrafo: 3, video: { fonte: require('@/assets/videos/m2v6-desmaio.mp4'), legenda: 'Desmaio e pré-desmaio são a emergência médica mais comum a bordo.' } },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · desmaio',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Desmaio vasovagal isolado, com gatilho claro', 'Pode voar', 'ICAO: cerca de 3 meses de observação'],
                ['Desmaios repetidos que exigem tratamento', 'Avaliação antes de voar', 'ICAO: 6 a 12 meses de observação'],
                ['Perda de consciência sem explicação', 'Avaliação antes de voar', 'Inapto até achar a causa (ANAC, ICAO); FAA decide'],
                ['Desmaio súbito, sem aviso, ou com o coração envolvido', 'Avaliação cardiológica (Veja M2V2 - IV)', 'Inapto até avaliação cardiológica'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v6-3-agua.jpg'), 'Água, levantar devagar e sentar no primeiro aviso evitam a maior parte dos desmaios.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · desmaio',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Antes', 'Comer, beber água, evitar álcool'],
                ['Sentado', 'Mexer as pernas e beber água'],
                ['Ao levantar', 'Levantar devagar, em dois tempos'],
                ['Pródromo (visão escura, suor, enjoo)', 'Sentar ou deitar com as pernas para cima e avisar a tripulação'],
                ['Depois', 'Contar ao médico; quem desmaia de novo precisa de avaliação'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '6.4',
      titulo: 'Enxaqueca e dor de cabeça',
      pergunta: 'Que remédio para enxaqueca deixa o piloto voar?',
      conteudo: {
        texto: [
          "A **enxaqueca** é comum: atinge cerca de **17%** das mulheres e **10%** dos homens. Na forma **sem aura**, a dor costuma ser latejante, de um lado, com luz e barulho incomodando, enjoo e vômito, e dura horas ou dias. Na forma **com aura**, minutos antes da dor surgem luzes piscando, zigue-zagues, perda de parte da visão, formigamento ou dificuldade de falar. Há ainda a aura **sem dor** depois.",
          "No voo, a enxaqueca tem vários **gatilhos** juntos: a hipóxia relativa da cabine, o **sono curto**, a **refeição pulada**, o fuso, o **ruído**, o sol forte, o estresse e o **álcool**, em especial o vinho tinto. A ICAO cita também queijo e chocolate. Para o passageiro, a enxaqueca conhecida, rara ou controlada **não é problema**; a exceção é a crise forte e frequente, com vômito e prostração.",
          "Para o tripulante, o que importa é a **aura** e a **velocidade** da crise. Um pequeno brilho na periferia da visão pode não atrapalhar; perder **metade do campo visual** é inaceitável. A crise que se instala em **minutos** também é. A ANAC não aceita enxaqueca com **fenômenos oculares e neurológicos focais transitórios**. A ICAO aceita **1 ou 2 crises por ano**, mas **várias por mês** impedem, com observação de **6 a 12 meses** depois do controle. A **cefaleia em salvas**, dor muito forte em volta do olho por **30 a 45 minutos**, impede enquanto durar a salva.",
          "A **FAA** emite para a dor de cabeça tensional com menos de **2 dias de dor por mês** e analgésico comum; a enxaqueca segue uma lista de verificação do examinador; a enxaqueca **complicada**, a **retiniana** e a dor depois de trauma vão para a decisão da FAA. Os remédios também contam: os de **crise** só servem para uso **ocasional**, com prazo antes de voar, e vários preventivos são **proibidos**.",
          "Voar em crise é voar com dor, enjoo e, às vezes, sem parte da visão: é **incapacitação parcial**. Para o tripulante, usar um remédio proibido ou voar dentro do prazo do remédio é infração à norma. Uma dor de cabeça **súbita e muito forte**, sem causa conhecida, ou com fraqueza, confusão ou perda de visão, **não** é enxaqueca até prova em contrário: é sinal de alerta de AVC (Veja M2V6 - V).",
          "**Como prevenir e amenizar a enxaqueca no voo.** Antes, durma, coma e beba água; evite os seus gatilhos conhecidos e o vinho tinto. Leve o remédio de crise na **bagagem de mão** e tome no **início** da dor. A bordo, use tampão de ouvido ou fone contra o ruído, óculos escuros ou máscara de olhos e não pule refeições. O tripulante só usa os remédios aceitos e respeita o prazo depois da dose.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v6-4-luz.jpg'), 'Luz forte, ruído e sono curto somam gatilhos de enxaqueca na mesma viagem.') },
          { paragrafo: 2, midia: 'remedios-enxaqueca' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · enxaqueca e dor de cabeça',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Enxaqueca rara ou controlada', 'Pode voar, com o remédio de crise à mão', 'ICAO: 1 ou 2 crises por ano podem ser aceitas; FAA: lista do examinador'],
                ['Enxaqueca com aura visual ou neurológica', 'Pode voar', 'Inapto (ANAC); ICAO e FAA avaliam a aura'],
                ['Várias crises por mês', 'Pode voar; trate antes', 'Inapto até o controle; observação de 6 a 12 meses (ICAO)'],
                ['Cefaleia em salvas', 'Pode voar fora da salva', 'Inapto durante a salva (ICAO)'],
                ['Em crise agora', 'Melhor adiar se houver vômito e prostração', 'Não voar'],
                ['Dor súbita e muito forte, sem causa conhecida', 'Emergência: atendimento médico', 'Emergência: atendimento médico'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v6-4-mascara.jpg'), 'Máscara de olhos, protetor de ouvido e água ajudam a segurar a crise a bordo.') },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Remédios e voo · enxaqueca',
              colunas: ['Remédio ou classe', 'Efeito que importa no voo', 'Tripulante (FAA)'],
              linhas: [
                ['Sumatriptano, rizatriptano, zolmitriptano, naratriptano, almotriptano', 'Alívio da crise; tontura e sono em alguns', 'Uso ocasional; 24 h depois da dose'],
                ['Eletriptano, frovatriptano', 'Duram mais no corpo', 'Uso ocasional; 48 h'],
                ['Rimegepanto, ubrogepanto', 'Alívio da crise', 'Uso ocasional; 24 h'],
                ['Ondansetrona · metoclopramida · prometazina', 'Contra o enjoo; a prometazina dá muito sono', '24 h · 36 h · 96 h'],
                ['Propranolol, metoprolol, verapamil, anticorpos anti-CGRP', 'Prevenção', 'Aceitos depois de 7 dias de teste em solo'],
                ['Topiramato, valproato, tricíclicos, gabapentina, butalbital, opioides', 'Sono, lentidão, dependência', 'Proibidos'],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · enxaqueca',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Véspera', 'Dormir bem; evitar álcool e os seus gatilhos'],
                ['Antes de embarcar', 'Comer e beber água; remédio de crise na bagagem de mão'],
                ['A bordo', 'Protetor de ouvido, óculos escuros ou máscara, refeição na hora'],
                ['Início da dor', 'Tomar o remédio de crise logo'],
                ['Tripulante', 'Só remédio aceito e com o prazo cumprido; em crise, não voar'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '6.5',
      titulo: 'AVC e ataque isquêmico transitório',
      pergunta: 'Quantos dias depois de um AVC dá para voar?',
      conteudo: {
        texto: [
          "O **AVC** é a falta de sangue numa parte do cérebro. Em **85%** dos casos é **isquêmico**, um vaso entupido; o resto é **hemorrágico**, um vaso rompido. O **ataque isquêmico transitório** (AIT) dá os mesmos sinais, mas passa sozinho: é um aviso, porque cerca de **30%** de quem tem um AIT terá um AVC em 5 anos. Pressão alta, colesterol, diabetes, cigarro, fibrilação atrial e doença das carótidas são os fatores de risco.",
          "Os sinais chegam **de repente**: **rosto caído** de um lado, **braço que cai** quando a pessoa levanta os dois, **fala enrolada** ou sem sentido, perda de visão, desequilíbrio, confusão ou dor de cabeça súbita e forte. Cada minuto conta, e **a bordo não há trombólise**, o remédio que desentope o vaso. No avião, o AVC é raro, mas é das emergências que mais levam a **desvio** e internação.",
          "Para o passageiro, o prazo depende da gravidade. Pelos critérios da **IATA**, o AVC não é aceito até o **4º dia**; do **5º ao 14º**, só com quadro estável e acompanhante de enfermagem, e com **oxigênio** nas duas primeiras semanas. A **CAA** britânica aconselha esperar **2 semanas**, e a AsMA fala em **2 a 4 semanas** de observação. Depois de um **AIT**, a IATA e a CAA pedem pelo menos **2 dias** e a investigação feita; **AITs repetidos** ou em crescendo impedem o voo.",
          "Para o tripulante, a **ANAC** não aceita infarto cerebral ou cerebelar, insuficiência vascular cerebral, **aneurisma** nem **hemorragia** meníngea ou cerebral. A **ICAO** considera voltar só com a causa tratada e o risco de repetir abaixo de **1% ao ano**: depois do primeiro ano, a recorrência média é de cerca de **4% ao ano**. A observação vai de **1 ano** (forame oval fechado, dissecção, AVC lacunar) a **2 anos** (AVC por aterosclerose); no hemorrágico, **1 a 2 anos**. A **FAA** pede **2 anos** depois de AVC cortical ou AIT e **1 ano** no subcortical, sempre com decisão da própria FAA.",
          "Voar cedo demais expõe a um **novo AVC** longe de um hospital, sem o tratamento que salva cérebro; por isso a IATA pede **oxigênio** a bordo nas duas primeiras semanas. Para o tripulante, voar sem a liberação é infração à norma; para o passageiro, a companhia pode exigir o **MEDIF** e recusar o embarque, e o seguro-viagem pode não cobrir.",
          "**Como prevenir e amenizar.** Respeite o prazo e leve o relatório médico. Peça **oxigênio** à companhia com antecedência se o AVC tiver menos de 2 semanas, **cadeira de rodas** e embarque antecipado se houver fraqueza, e viaje com acompanhante. Tome os remédios no horário, inclusive o anticoagulante (Veja M2V2 - VII), beba água e mexa as pernas. Se aparecer um sinal novo a bordo, **avise a tripulação na hora**: o piloto pode desviar para um hospital.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v6-5-comissaria.jpg'), 'Rosto caído, braço fraco e fala enrolada: a tripulação precisa saber na hora.') },
          { paragrafo: 2, midia: 'prazo-avc' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · AVC e AIT',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['AVC até o 4º dia', 'Não voar (IATA)', 'Inapto'],
                ['AVC do 5º ao 14º dia, estável', 'Só com acompanhante de enfermagem e oxigênio (IATA); a CAA aconselha 2 semanas', 'Inapto'],
                ['AVC há mais de 2 semanas, estável', 'Pode voar com o relatório médico; ajuda se houver fraqueza', 'ICAO: 1 a 2 anos conforme a causa; FAA: 1 a 2 anos'],
                ['AIT nos últimos 2 dias ou sem investigação', 'Não voar (IATA, CAA)', 'Inapto'],
                ['AITs repetidos ou em crescendo', 'Não voar (AsMA)', 'Inapto'],
                ['Aneurisma ou hemorragia cerebral', 'Conforme o neurologista', 'Inapto (ANAC); ICAO: 1 a 2 anos depois do tratamento'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v6-5-oxigenio.jpg'), 'Nas duas primeiras semanas depois do AVC, o passageiro voa com oxigênio e acompanhante.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · depois de AVC ou AIT',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Planejar', 'Respeitar o prazo; relatório médico; MEDIF se a companhia pedir'],
                ['Reservar', 'Oxigênio se for antes de 2 semanas; cadeira de rodas e embarque antecipado'],
                ['A bordo', 'Remédios no horário, água, mexer as pernas, acompanhante por perto'],
                ['Sinal novo', 'Avisar a tripulação imediatamente: rosto, braço, fala'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '6.6',
      titulo: 'Trauma craniano e cirurgia do cérebro',
      pergunta: 'Por que esperar para voar depois de operar a cabeça?',
      conteudo: {
        texto: [
          "Nem toda pancada na cabeça machuca o **cérebro**. Fala-se em **trauma cranioencefálico** quando há perda ou alteração da consciência, sinal neurológico ou lesão na imagem. A gravidade se mede pela **amnésia pós-traumática**, o tempo até a memória voltar a funcionar sem falhas: até **1 hora** é leve, de **1 a 24 horas** moderado, de **1 a 7 dias** grave e mais que isso muito grave.",
          "As sequelas são a **síndrome pós-concussão** (dor de cabeça, insônia, irritação, tontura, falta de concentração), que costuma passar em semanas ou meses; o **déficit focal**, que se recupera quase todo em 6 meses e mais devagar até 2 ou 3 anos; a **sequela cognitiva**; e a **epilepsia pós-traumática**. O risco de epilepsia chega a **40%** no trauma penetrante e é de **5%** no fechado; das pessoas que vão ter a crise, **50%** têm a primeira em 6 meses, **75%** no primeiro ano e **90%** em 2 anos.",
          "Depois de uma **cirurgia do crânio** ou de um trauma com fratura, pode ficar **ar dentro da cabeça**. Na subida, ele se expande cerca de **38%** a 8.000 ft e comprime o cérebro. Por isso, pelos critérios da **IATA**, o passageiro não voa até o **9º dia** depois de cirurgia do crânio e, a partir do **10º**, só com o crânio **sem ar** na imagem; a AsMA fala em **10 a 14 dias** de observação, e a CAA pede a liberação do neurocirurgião.",
          "Para o tripulante, a **ANAC** não aceita cirurgia cerebral ou trauma com **sequela** que afete a função. A **FAA** adia sempre para a própria FAA: concussão leve, **6 meses**; trauma moderado, **12 meses**; trauma grave, com sangue no cérebro ou amnésia de mais de 24 horas, **5 anos**. A **ICAO** observa de **3 a 6 meses** na síndrome pós-concussão, **1 a 2 anos** no hematoma epidural simples, **2 anos** no subdural e no hematoma dentro do cérebro, e até **5 anos** nos casos graves. **Tumor** benigno retirado pede **1 ano**; o maligno costuma impedir para sempre.",
          "Voar com ar no crânio pode causar **dor de cabeça forte**, piora neurológica e convulsão em pleno voo. Voltar ao cockpit antes do prazo expõe à **crise pós-traumática**, que é mais provável justamente no primeiro ano. Para o tripulante, depois de acidente com colisão ou parada brusca, a ANAC pode exigir laudo de **neurologista** no novo exame.",
          "**Como prevenir e amenizar.** Use **capacete** e cinto, inclusive no avião. Depois de qualquer pancada com desmaio, vômito, confusão ou dor de cabeça que piora, procure atendimento antes de viajar. Depois de cirurgia do crânio, só embarque com a **liberação escrita** do neurocirurgião e, de preferência, com imagem mostrando que não há ar. O tripulante conta ao examinador qualquer trauma com perda de consciência, por menor que pareça.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v6-6-neurocirurgiao.jpg'), 'A imagem mostra se ainda há ar dentro do crânio antes de liberar o voo.') },
          { paragrafo: 2, midia: 'gravidade-tce' },
          { paragrafo: 3, figura: foto(require('@/assets/images/topicos/m2v6-6-ressonancia.jpg'), 'Depois de trauma ou cirurgia, a ressonância ajuda a medir o risco de crise.') },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · trauma e cirurgia do cérebro',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Pancada sem perda de consciência, sem sintomas', 'Pode voar', 'Contar ao examinador'],
                ['Concussão (até 1 h de amnésia)', 'Avaliação antes de voar se houver sintomas', 'FAA: 6 meses; ICAO: 3 a 6 meses sem sintomas'],
                ['Trauma moderado (1 a 24 h) ou fratura sem afundamento', 'Conforme o neurologista', 'FAA: 12 meses'],
                ['Trauma grave, sangue no cérebro', 'Conforme o neurologista', 'FAA: 5 anos; ICAO: 2 anos ou mais'],
                ['Cirurgia do crânio até o 9º dia', 'Não voar (IATA)', 'Inapto'],
                ['Cirurgia do crânio, 10º dia ou mais', 'Só com o crânio sem ar e liberação do neurocirurgião', 'Inapto até a reavaliação (ANAC); tumor benigno: 1 ano (ICAO)'],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · trauma e cirurgia',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Prevenir', 'Capacete, cinto, cuidado com quedas'],
                ['Depois da pancada', 'Desmaio, vômito, confusão ou dor que piora: atendimento antes de viajar'],
                ['Depois da cirurgia', 'Liberação escrita do neurocirurgião; imagem sem ar'],
                ['Tripulante', 'Relatar todo trauma com perda de consciência; cumprir o prazo'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '6.7',
      titulo: 'Doenças degenerativas e do movimento',
      pergunta: 'Quem tem Parkinson ou esclerose múltipla pode voar?',
      conteudo: {
        texto: [
          "Algumas doenças do sistema nervoso passam anos sem afetar o voo; outras **progridem devagar** e podem ser acompanhadas até o ponto em que passam a pesar. O **tremor essencial** é o distúrbio do movimento mais comum, com **5% a 6%** da população: treme a mão ao segurar ou fazer força, piora muito devagar e costuma ser mais incômodo que incapacitante.",
          "No **Parkinson**, os sinais são tremor em repouso, **rigidez** e **lentidão** dos movimentos, com progressão lenta em uns e rápida em outros. Na **esclerose múltipla**, o sistema imune ataca a mielina do cérebro e da medula, em geral entre os **20 e 40 anos**, com surtos e melhoras: formigamento, fraqueza, alteração da visão, fala ou bexiga. Na **demência**, o problema é a memória e o julgamento; na **amnésia global transitória**, a pessoa perde a memória recente por até **24 horas** e depois volta ao normal.",
          "Para o tripulante, a regra é **estabilidade e função**. Pela ICAO, o tremor essencial não impede sem prejuízo, e o propranolol pede **3 meses** de observação. O **Parkinson** em si não impede: a **levodopa** pode ser aceita, os agonistas dopaminérgicos não, e a reavaliação é periódica. A **esclerose múltipla** impede de início; depois de um surto e de estabilidade, observam-se **3 meses** nos casos leves e **6 a 12 meses** nos mais significativos, e os imunomoduladores não impedem. A amnésia global transitória pede **1 ano** ou mais sem novo episódio. A ANAC não aceita doença que tire **equilíbrio, sensibilidade, força ou coordenação**.",
          "Para o passageiro, voar costuma ser possível; o que muda é a **ajuda**. Quem tem fraqueza, rigidez, desequilíbrio ou lentidão precisa de **cadeira de rodas**, embarque antecipado e assento acessível; quem tem urgência urinária, assento perto do **banheiro**. Na demência, o ambiente estranho, a rotina quebrada, o sono curto e o confinamento podem trazer **agitação**: o acompanhante é recomendado.",
          "A viagem mexe com a rotina, e é aí que os sintomas pesam: na demência, sono curto e confinamento agitam; no Parkinson e na epilepsia, a CAA britânica pede seguir o **horário dos remédios** à risca nas viagens longas; e os sintomas que mais comprometem o voo do tripulante são **vertigem** e **visão dupla**, que a ICAO cita na esclerose múltipla. Para o tripulante, esconder um diagnóstico progressivo do examinador é infração à norma; para o passageiro, viajar sem pedir ajuda aumenta o risco de **queda** no embarque e no corredor.",
          "**Como prevenir e amenizar.** Peça **assistência** ao comprar a passagem: cadeira de rodas, embarque antecipado e assento perto do banheiro, se precisar. Leve os remédios na bagagem de mão e mantenha o **horário**, sobretudo no Parkinson, ajustando ao fuso com o médico. Na esclerose múltipla, leve o relatório do neurologista com os remédios em uso. Na demência, viaje com um **acompanhante** que conheça a rotina. O tripulante faz o acompanhamento periódico que a autoridade pedir.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v6-7-tremor.jpg'), 'O tremor essencial costuma ser mais incômodo que incapacitante.') },
          { paragrafo: 2, midia: 'doencas-progressivas' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · doenças degenerativas e do movimento',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Tremor essencial sem prejuízo', 'Pode voar', 'Não impede (ICAO); com propranolol, 3 meses'],
                ['Parkinson inicial', 'Pode voar, com os remédios no horário', 'Pode ser aceito com levodopa e reavaliação (ICAO)'],
                ['Esclerose múltipla estável', 'Pode voar', 'ICAO: 3 meses (leve) a 6 a 12 meses depois do surto'],
                ['Esclerose múltipla em surto', 'Conforme o neurologista', 'Inapto'],
                ['Amnésia global transitória', 'Pode voar depois da avaliação', 'ICAO: 1 ano ou mais sem episódio'],
                ['Demência', 'Com acompanhante', 'Inapto (ANAC: doença que interfere na função)'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v6-7-cadeira.jpg'), 'Cadeira de rodas e embarque antecipado evitam quedas de quem tem lentidão ou desequilíbrio.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · doenças degenerativas',
              colunas: ['Condição', 'O que fazer'],
              linhas: [
                ['Parkinson', 'Remédio no horário, ajustado ao fuso; assistência no embarque'],
                ['Esclerose múltipla', 'Relatório do neurologista; remédios à mão'],
                ['Demência', 'Acompanhante que conheça a rotina; manter o sono'],
                ['Fraqueza ou desequilíbrio', 'Cadeira de rodas, embarque antecipado, assento acessível'],
                ['Urgência urinária', 'Assento perto do banheiro; material de reserva'],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Cérebro', 'Raciocínio lento com pouco oxigênio; convulsão, desmaio, AVC', 'Sono, água, remédios no horário, prazos de liberação'],
                ['Crânio', 'Ar preso depois de cirurgia ou trauma se expande na subida', 'Esperar a absorção do ar; liberação do neurocirurgião'],
                ['Vasos do cérebro', 'AVC e AIT: novo evento longe do hospital', 'Prazo de 2 dias (AIT) a 2 semanas (AVC); oxigênio'],
                ['Olhos', 'Aura da enxaqueca tira parte da visão', 'Remédio de crise aceito; não voar em crise'],
                ['Músculos e equilíbrio', 'Fraqueza, rigidez, quedas', 'Cadeira de rodas, embarque antecipado'],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      pergunta: 'Que risco anual de incapacitação a ICAO considera o máximo aceitável para o tripulante?',
      opcoes: ['10%', '1%', '0,01%', 'Nenhum risco'],
      correta: 1,
      explicacao: 'A ICAO considera inaceitável um risco de incapacitação súbita acima de 1% ao ano.',
      topico: '6.1',
    },
    {
      pergunta: 'Quanto se expande uma bolha de ar presa no crânio a 8.000 ft?',
      opcoes: ['Nada', 'Cerca de 38%', 'Cerca de 300%', 'Ela encolhe'],
      correta: 1,
      explicacao: 'Pela lei de Boyle, o gás preso se expande cerca de 38% a 8.000 ft; por isso há prazo depois de cirurgia do crânio.',
      topico: '6.1',
    },
    {
      pergunta: 'Quanto tempo o passageiro deve esperar para voar depois de uma convulsão, segundo a CAA britânica?',
      opcoes: ['Nada', 'Pelo menos 24 horas', '6 meses', '10 anos'],
      correta: 1,
      explicacao: 'A CAA pede pelo menos 24 horas e o remédio de emergência à mão; epilepsia não controlada exige liberação médica.',
      topico: '6.2',
    },
    {
      pergunta: 'Depois de uma crise única sem causa, quanto tempo a ICAO pede antes de considerar a volta do tripulante?',
      opcoes: ['1 semana', '4 anos sem crise e sem remédio', '6 meses', 'Nunca pode voltar'],
      correta: 1,
      explicacao: 'Com exames normais e sem fatores de risco, depois de 4 anos sem crise e sem remédio o risco se aproxima do da população.',
      topico: '6.2',
    },
    {
      pergunta: 'Qual é a emergência médica mais comum a bordo?',
      opcoes: ['AVC', 'Desmaio ou pré-desmaio', 'Convulsão', 'Infarto'],
      correta: 1,
      explicacao: 'Síncope e pré-síncope foram 37,4% das emergências em voo numa série de quase 12 mil casos.',
      topico: '6.3',
    },
    {
      pergunta: 'No primeiro sinal de desmaio (visão escura, suor, enjoo), o que fazer?',
      opcoes: ['Ir até o banheiro', 'Sentar ou deitar com as pernas para cima e avisar a tripulação', 'Ficar em pé no corredor', 'Tomar um café'],
      correta: 1,
      explicacao: 'O desmaio vasovagal quase nunca acontece deitado: sentar ou deitar no pródromo evita a queda.',
      topico: '6.3',
    },
    {
      pergunta: 'Pela FAA, quanto tempo o piloto espera para voar depois de tomar sumatriptano?',
      opcoes: ['Pode voar logo', '24 horas', '7 dias', 'É proibido sempre'],
      correta: 1,
      explicacao: 'Os triptanos de uso ocasional pedem 24 horas depois da dose; eletriptano e frovatriptano, 48 horas.',
      topico: '6.4',
    },
    {
      pergunta: 'Pelos critérios da IATA, a partir de que dia depois do AVC o passageiro pode voar com acompanhante de enfermagem e oxigênio?',
      opcoes: ['1º dia', '5º dia, se estável', '1 ano', 'Nunca'],
      correta: 1,
      explicacao: 'Até o 4º dia não é aceito; do 5º ao 14º, só estável, com acompanhante de enfermagem e oxigênio.',
      topico: '6.5',
    },
    {
      pergunta: 'Depois de cirurgia do crânio, quando o passageiro pode voar pelos critérios da IATA?',
      opcoes: ['No dia seguinte', 'A partir do 10º dia, com o crânio sem ar', 'Só depois de 1 ano', 'Nunca mais'],
      correta: 1,
      explicacao: 'Até o 9º dia não é aceito; a partir do 10º, só com o crânio sem ar e em bom estado geral.',
      topico: '6.6',
    },
    {
      pergunta: 'Para a ICAO, o diagnóstico de Parkinson por si só impede o tripulante de voar?',
      opcoes: ['Sim, sempre', 'Não; a levodopa pode ser aceita, com reavaliação periódica', 'Só se tiver mais de 40 anos', 'Só na 2ª classe'],
      correta: 1,
      explicacao: 'O diagnóstico não desqualifica por si; agonistas dopaminérgicos não são aceitos, e a progressão é acompanhada.',
      topico: '6.7',
    },
  ],
  liberacao: liberacaoCerebro,
};
