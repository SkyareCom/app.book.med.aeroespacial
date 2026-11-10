// Formulário de liberação para voo seguro · bloco do cérebro e do sistema nervoso (M2V6).
// Fontes no registro de revisão de src/data/capitulos/cerebro.ts (ICAO Doc 8984 Part III Cap. 10; RBAC 67.77; FAA,
// Guide for AMEs: Seizure, Epilepsy, Headache/Migraine, Migraine Medication, Stroke-CVA-TIA, Head Injury; UK CAA,
// Neurology; IATA Medical Manual via Link Airways; AsMA, Neurology 2014). Sem fonte: [confirmar na referência].

import type { EfeitoLiberacao, PerguntaLiberacao } from '../tipos';

const ok = (topico?: string): EfeitoLiberacao => ({ nivel: 'liberado', leigo: '', medico: '', topico });
const e = (nivel: EfeitoLiberacao['nivel'], leigo: string, medico: string, topico: string): EfeitoLiberacao => ({ nivel, leigo, medico, topico });

export const liberacaoCerebro: PerguntaLiberacao[] = [
  {
    id: 'neuro-convulsao',
    pergunta: 'Já teve convulsão ou tem epilepsia?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Só crise febril simples na infância',
        passageiro: ok('6.2'),
        tripulante: ok('6.2'),
      },
      {
        rotulo: 'Sim, nas últimas 24 horas',
        passageiro: e('nao-voar', 'Não voe agora: espere pelo menos 24 horas e tenha o remédio de emergência à mão.', 'UK CAA: aguardar ao menos 24 h após crise; IATA: crise tônico-clônica nas últimas 24 h não aceita.', '6.2'),
        tripulante: e('nao-voar', 'Não voe. Procure avaliação médica e o examinador.', 'Crise convulsiva: inapto (RBAC 67.77(a)(4); ICAO 10.2.35 e 10.2.38).', '6.2'),
      },
      {
        rotulo: 'Sim, no último mês ou a epilepsia não está controlada',
        passageiro: e('avaliar', 'Precisa de liberação médica antes de voar.', 'UK CAA: epilepsia não controlada ou crise nova exige liberação; AsMA: viagem não recomendada após crise no último mês.', '6.2'),
        tripulante: e('nao-voar', 'Não voe. Fale com o examinador.', 'Epilepsia: inapto (RBAC 67.77(a)(4); ICAO 10.2.35).', '6.2'),
      },
      {
        rotulo: 'Sim, epilepsia controlada, sem crise há mais de 1 mês',
        passageiro: e('cuidados', 'Pode voar. Tome o remédio no horário, ajustado ao fuso, durma antes e leve o remédio na bagagem de mão.', 'AsMA: privação de sono e ritmo circadiano baixam o limiar; aderência estrita; anticonvulsivante raro no kit de bordo.', '6.2'),
        tripulante: e('nao-voar', 'Não pode voar como tripulante com epilepsia. Fale com o examinador sobre os prazos.', 'RBAC 67.77(a)(4): inapto. FAA: epilepsia, 10 anos sem crise e 3 sem remédio para autorização especial; ICAO 10.2.36.', '6.2'),
      },
      {
        rotulo: 'Sim, uma crise única, há mais de 24 horas',
        passageiro: e('cuidados', 'Pode voar depois da avaliação médica. Durma bem antes e evite álcool.', 'UK CAA: 24 h; crise nova requer liberação médica.', '6.2'),
        tripulante: e('avaliar', 'Não voe até a avaliação. O prazo costuma ser longo e depende da causa.', 'ICAO 10.2.39: 4 anos sem crise e sem remédio; FAA: causa corrigida, 1 ano; sem causa, 4 anos com os 2 últimos sem anticonvulsivante; sempre adiar para a FAA.', '6.2'),
      },
    ],
  },
  {
    id: 'neuro-desmaio',
    pergunta: 'Desmaiou ou perdeu a consciência no último ano?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, uma vez, com causa clara (calor, dor, ver sangue, ficar em pé)',
        passageiro: e('cuidados', 'Pode voar. Beba água, evite álcool, levante devagar e sente-se no primeiro aviso.', 'Síncope vasovagal situacional (ICAO 10.2.22–10.2.24).', '6.3'),
        tripulante: e('avaliar', 'Fale com o examinador antes de voar.', 'ICAO 10.2.26: 1 ou 2 episódios benignos explicados, cerca de 3 meses de observação; RBAC 67.77(a)(13): episódio único, examinador com a ANAC.', '6.3'),
      },
      {
        rotulo: 'Sim, mais de uma vez ou sem causa conhecida',
        passageiro: e('avaliar', 'Faça avaliação médica antes de voar, inclusive do coração.', 'AsMA: distinguir vasovagal de arritmia; ICAO 10.2.24.', '6.3'),
        tripulante: e('nao-voar', 'Não voe até descobrir a causa.', 'RBAC 67.77(a)(6) e (13); ICAO 10.2.25: inapto até identificar a causa; recorrente com tratamento, 6 a 12 meses.', '6.3'),
      },
      {
        rotulo: 'Sim, de repente, sem nenhum aviso',
        passageiro: e('avaliar', 'Procure avaliação do coração antes de voar.', 'Síncope súbita é quase sempre cardíaca (ICAO 10.2.22); ver bloco cardiovascular.', '6.3'),
        tripulante: e('nao-voar', 'Não voe até a avaliação cardiológica.', 'Síncope súbita, provável origem cardíaca (ICAO 10.2.22); RBAC 67.77(a)(6).', '6.3'),
      },
    ],
  },
  {
    id: 'neuro-enxaqueca',
    pergunta: 'Tem enxaqueca?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, rara e sem aura',
        passageiro: e('cuidados', 'Pode voar. Durma, coma, beba água e leve o remédio de crise na bagagem de mão.', 'AsMA: enxaqueca conhecida e controlada não é problema; gatilhos: sono, refeição pulada, fuso, ruído.', '6.4'),
        tripulante: e('cuidados', 'Pode voar fora da crise, com remédio aceito e o prazo cumprido depois da dose.', 'ICAO 10.2.6: 1 ou 2 crises por ano podem não desqualificar; FAA: CACI; triptanos 24 h (eletriptano, frovatriptano 48 h).', '6.4'),
      },
      {
        rotulo: 'Sim, com aura (luzes, perda de visão, formigamento)',
        passageiro: e('cuidados', 'Pode voar. Tome o remédio no início da crise.', 'AsMA, Neurology 2014.', '6.4'),
        tripulante: e('nao-voar', 'Fale com o examinador antes de voar.', 'RBAC 67.77(a)(11): enxaqueca com fenômenos oculares e neurológicos focais transitórios; ICAO 10.2.6: perda de metade do campo visual inaceitável; FAA: enxaqueca complicada ou retiniana, adiar.', '6.4'),
      },
      {
        rotulo: 'Sim, várias crises por mês',
        passageiro: e('cuidados', 'Pode voar, mas vale tratar antes. Se houver vômito e prostração, adie.', 'AsMA: exceção para crises frequentes, fortes, com vômito e prostração.', '6.4'),
        tripulante: e('nao-voar', 'Não voe até controlar as crises. A observação costuma ser de 6 a 12 meses.', 'ICAO 10.2.6 e 10.2.8: várias crises por mês impedem; observação de 6 a 12 meses.', '6.4'),
      },
    ],
  },
  {
    id: 'neuro-enxaqueca-remedio',
    pergunta: 'Usa remédio para enxaqueca?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Triptano ou gepanto, de vez em quando',
        passageiro: ok('6.4'),
        tripulante: e('cuidados', 'Pode voar só depois do prazo: 24 horas (eletriptano e frovatriptano, 48 horas).', 'FAA, Migraine Medication (26/08/2026): uso ocasional; triptanos e gepantos 24 h; eletriptano e frovatriptano 48 h.', '6.4'),
      },
      {
        rotulo: 'Preventivo: propranolol, metoprolol, verapamil ou anti-CGRP',
        passageiro: ok('6.4'),
        tripulante: e('cuidados', 'Aceito depois de 7 dias de teste em solo, sem efeitos colaterais.', 'FAA, Migraine Medication: preventivos aceitos com 7 dias de teste em solo; ICAO 10.2.6: betabloqueadores e bloqueadores de cálcio aceitáveis.', '6.4'),
      },
      {
        rotulo: 'Topiramato, valproato, amitriptilina, gabapentina, butalbital ou opioide',
        passageiro: e('cuidados', 'Pode voar. Alguns dão sono: não dirija depois do voo.', 'Efeitos sedativos dos preventivos e analgésicos citados.', '6.4'),
        tripulante: e('nao-voar', 'Esses remédios não são aceitos para tripulantes. Fale com o médico e o examinador.', 'FAA, Migraine Medication: inaceitáveis; ICAO 10.2.6: antidepressivos, anticonvulsivantes e narcóticos inaceitáveis.', '6.4'),
      },
    ],
  },
  {
    id: 'neuro-avc',
    pergunta: 'Teve AVC ou ataque isquêmico transitório (AIT)?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'AIT nos últimos 2 dias, ou ainda sem investigação',
        passageiro: e('nao-voar', 'Não voe. Espere ao menos 2 dias e faça a investigação.', 'IATA e UK CAA: AIT, ao menos 2 dias e investigado; AsMA: AITs em crescendo, não voar.', '6.5'),
        tripulante: e('nao-voar', 'Não voe. Fale com o examinador.', 'RBAC 67.77(a)(8); FAA: AIT, 2 anos, adiar; ICAO 10.3.6.', '6.5'),
      },
      {
        rotulo: 'AVC até o 4º dia',
        passageiro: e('nao-voar', 'Não voe agora.', 'IATA: AVC até o 4º dia não aceito; sem trombólise a bordo (AsMA).', '6.5'),
        tripulante: e('nao-voar', 'Não voe.', 'RBAC 67.77(a)(7): infarto cerebral ou cerebelar, inapto.', '6.5'),
      },
      {
        rotulo: 'AVC do 5º ao 14º dia, estável',
        passageiro: e('avaliar', 'Só com liberação médica, acompanhante de enfermagem e oxigênio a bordo. A CAA britânica aconselha esperar 2 semanas.', 'IATA: 5º ao 14º dia se estável, com acompanhante de enfermagem; oxigênio nas 2 primeiras semanas; UK CAA: 2 semanas; AsMA: 2 a 4 semanas.', '6.5'),
        tripulante: e('nao-voar', 'Não voe.', 'RBAC 67.77(a)(7); ICAO 10.3.6.', '6.5'),
      },
      {
        rotulo: 'AVC há mais de 2 semanas ou AIT investigado',
        passageiro: e('cuidados', 'Pode voar com o relatório médico. Peça cadeira de rodas se houver fraqueza e mantenha os remédios no horário.', 'UK CAA: 2 semanas após AVC, 2 dias após AIT; AsMA: avaliar déficit motor, fala e estado mental.', '6.5'),
        tripulante: e('nao-voar', 'Não voe até a reavaliação. Os prazos vão de 1 a 2 anos.', 'ICAO 10.3.7: 1 ano (forame oval fechado, dissecção, lacunar) a 2 anos (aterotrombótico); FAA: cortical ou AIT 2 anos, subcortical 1 ano; RBAC 67.77(a)(7)–(8).', '6.5'),
      },
      {
        rotulo: 'Aneurisma ou hemorragia no cérebro',
        passageiro: e('avaliar', 'Só com liberação do neurologista ou neurocirurgião.', 'Avaliação individual (AsMA; UK CAA).', '6.5'),
        tripulante: e('nao-voar', 'Não voe. Fale com o examinador.', 'RBAC 67.77(a)(9)–(10); ICAO 10.3.11 e 10.3.16: 1 a 2 anos depois de tratada a causa.', '6.5'),
      },
    ],
  },
  {
    id: 'neuro-trauma',
    pergunta: 'Teve trauma na cabeça ou cirurgia do cérebro?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Cirurgia do crânio há 9 dias ou menos',
        passageiro: e('nao-voar', 'Não voe agora: o ar que pode ter ficado no crânio se expande na subida.', 'IATA: cirurgia craniana até o 9º dia não aceita; AsMA: 10 a 14 dias com avaliação de ar intracraniano.', '6.6'),
        tripulante: e('nao-voar', 'Não voe.', 'RBAC 67.77(a)(15).', '6.6'),
      },
      {
        rotulo: 'Cirurgia do crânio há 10 dias ou mais',
        passageiro: e('avaliar', 'Só com a liberação escrita do neurocirurgião e o crânio sem ar.', 'IATA: a partir do 10º dia, crânio sem ar e bom estado geral; UK CAA: liberação do neurocirurgião.', '6.6'),
        tripulante: e('nao-voar', 'Não voe até a reavaliação.', 'RBAC 67.77(a)(15); ICAO 10.5.4: tumor benigno retirado, 1 ano.', '6.6'),
      },
      {
        rotulo: 'Concussão (desmaio ou falha de memória de menos de 1 hora)',
        passageiro: e('cuidados', 'Pode voar se estiver sem sintomas. Com dor de cabeça que piora, vômito ou confusão, procure atendimento antes.', 'ICAO 10.4.4–10.4.6.', '6.6'),
        tripulante: e('avaliar', 'Fale com o examinador antes de voar.', 'FAA, Head Injury: 6 meses, adiar; ICAO 10.4.12: 3 a 6 meses sem sintomas.', '6.6'),
      },
      {
        rotulo: 'Trauma moderado ou grave (mais de 1 hora, fratura, sangue no cérebro)',
        passageiro: e('avaliar', 'Só com liberação do neurologista.', 'ICAO 10.4.4.', '6.6'),
        tripulante: e('nao-voar', 'Não voe. O prazo vai de 1 a 5 anos.', 'FAA, Head Injury: moderado 12 meses; grave 5 anos; ICAO 10.4.12–10.4.14: 1 a 5 anos.', '6.6'),
      },
    ],
  },
  {
    id: 'neuro-progressiva',
    pergunta: 'Tem tremor, Parkinson, esclerose múltipla ou demência?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Tremor essencial',
        passageiro: ok('6.7'),
        tripulante: e('cuidados', 'Pode voar sem prejuízo da função. Com propranolol, espere 3 meses de observação.', 'ICAO 10.6.4–10.6.5.', '6.7'),
      },
      {
        rotulo: 'Parkinson',
        passageiro: e('cuidados', 'Pode voar. Mantenha os remédios no horário e peça assistência no embarque se precisar.', 'UK CAA: seguir o horário dos remédios; AsMA: assistência para rigidez e lentidão.', '6.7'),
        tripulante: e('avaliar', 'Fale com o examinador. Pode ser aceito no início, com levodopa e reavaliação periódica.', 'ICAO 10.6.7–10.6.8: diagnóstico não desqualifica por si; levodopa pode ser aceita; agonistas dopaminérgicos não.', '6.7'),
      },
      {
        rotulo: 'Esclerose múltipla',
        passageiro: e('cuidados', 'Pode voar. Leve o relatório do neurologista e peça assistência se tiver fraqueza ou urgência urinária.', 'AsMA: cadeira de rodas, embarque antecipado, assento perto do banheiro.', '6.7'),
        tripulante: e('avaliar', 'Fale com o examinador. Depois de um surto, espera-se a estabilidade.', 'ICAO 10.6.12–10.6.13: desqualifica de início; 3 meses (leve) a 6 a 12 meses de estabilidade; imunomoduladores não impedem.', '6.7'),
      },
      {
        rotulo: 'Demência ou perda de memória',
        passageiro: e('cuidados', 'Viaje com um acompanhante que conheça a rotina.', 'AsMA: ambiente estranho, rotina quebrada e confinamento podem agitar; UK CAA: acompanhante.', '6.7'),
        tripulante: e('nao-voar', 'Não voe. Fale com o examinador.', 'RBAC 67.77(a)(3): doença do sistema nervoso que interfira no exercício seguro.', '6.7'),
      },
    ],
  },
  {
    id: 'neuro-temperatura',
    pergunta: 'Teve insolação, exaustão pelo calor, hipotermia ou congelamento recentemente?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Exaustão pelo calor nas últimas 24 horas',
        passageiro: e('cuidados', 'Descanse, reidrate e evite o calor antes de embarcar.', 'Exaustão pelo calor (38,3 a 40,6 °C): repouso, resfriamento e reidratação (Flight Safety Foundation, 2001; registro de temperatura.ts).', ''),
        tripulante: e('nao-voar', 'Não voe até descansar e se reidratar por completo.', 'Estresse térmico reduz coordenação, atenção e decisão (Flight Safety Foundation, 2001).', ''),
      },
      {
        rotulo: 'Insolação, hipotermia grave ou congelamento',
        passageiro: e('avaliar', 'Voe só depois da alta e da liberação do médico.', 'Avaliar rins, cérebro e lesões de tecido; prazo conforme a recuperação [confirmar na referência].', ''),
        tripulante: e('nao-voar', 'Não voe até a recuperação e a avaliação médica.', 'Retorno após avaliação clínica e exames normais [confirmar na referência].', ''),
      },
    ],
  },
];
