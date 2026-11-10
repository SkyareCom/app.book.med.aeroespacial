// Formulário de liberação para voo seguro · bloco do coração e vasos (M2V2 · Coração e vasos sanguíneos).
// Cada resposta tem um efeito para o passageiro e outro para o tripulante, com texto leigo e texto para o médico.
// Fontes no registro de revisão de src/data/capitulos/coracao.ts (UK CAA; CDC Yellow Book com IATA 2020 e BTS 2022;
// ANAC, RBAC 67.79, 67.87(c), 67.119(b)(2) e 67.15(c); FAA, Guia do AME; ICAO, Doc 8984; Canadian Cardiovascular
// Society, Flying: Cardiovascular Conditions, ccs.ca, consultado em 10/11/2026). Sem fonte: [confirmar na
// referência].

import type { EfeitoLiberacao, PerguntaLiberacao } from '../tipos';

const ok = (topico?: string): EfeitoLiberacao => ({ nivel: 'liberado', leigo: '', medico: '', topico });
const e = (nivel: EfeitoLiberacao['nivel'], leigo: string, medico: string, topico: string): EfeitoLiberacao => ({ nivel, leigo, medico, topico });

export const liberacaoCardiovascular: PerguntaLiberacao[] = [
  {
    id: 'card-pressao',
    pergunta: 'Tem pressão alta?',
    ajuda: 'Controlada: medidas abaixo de 140/90 mmHg em dias diferentes, com ou sem remédio.',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, controlada com o mesmo remédio há mais de 1 semana',
        passageiro: e('cuidados', 'Pode voar. Leve os remédios na bagagem de mão e mantenha o intervalo entre as doses.', 'Hipertensão tratada e controlada não contraindica (UK CAA); medicação na bagagem de mão.', '2.2'),
        tripulante: e('cuidados', 'Pode voar se a pressão estiver controlada e o remédio for aceito pela autoridade.', 'RBAC 67.79(a)(8): apto a critério com anti-hipertensivo. FAA: até 155/95 no exame; aceitos BRA, IECA, BCC, betabloqueador, diurético, alfabloqueador; não aceitos os de ação central. ICAO: alfabloqueador não permitido.', '2.2'),
      },
      {
        rotulo: 'Sim, comecei ou mudei a dose do remédio nesta semana',
        passageiro: e('cuidados', 'Pode voar se estiver se sentindo bem; levante-se devagar da poltrona.', 'Início ou ajuste recente: observar hipotensão postural; sem impedimento para o passageiro (UK CAA).', '2.2'),
        tripulante: e('nao-voar', 'Não voe como tripulante nos primeiros dias do remédio novo ou da dose nova.', 'FAA: 7 dias sem voar ao iniciar anti-hipertensivo. ICAO (Doc 8984, 1.3.3): inapto temporário até controle estável sem efeitos colaterais.', '2.2'),
      },
      {
        rotulo: 'Sim, e a pressão continua alta mesmo com remédio',
        passageiro: e('nao-voar', 'Controle a pressão antes de viajar.', 'Hipertensão não controlada: contraindicação (UK CAA).', '2.2'),
        tripulante: e('nao-voar', 'Não voe: procure o médico examinador.', 'RBAC 67.79(a)(8): PA mantida > 140 × 90, não apto; ICAO: > 160/95 consistente desqualifica todas as classes; 67.15(c) e 14 CFR 61.53.', '2.2'),
      },
    ],
  },
  {
    id: 'card-coronaria',
    pergunta: 'Teve angina, infarto, stent ou ponte de safena?',
    ajuda: 'Angina instável: dor no peito nova, mais forte ou que aparece em repouso.',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Angina estável, sempre no mesmo esforço',
        passageiro: e('cuidados', 'Pode voar com os remédios à mão. Se a dor aparece em esforços pequenos, combine oxigênio com a companhia.', 'Angina estável sem contraindicação; CCS III–IV: oxigênio a bordo (UK CAA).', '2.3'),
        tripulante: e('avaliar', 'Leve o caso ao médico examinador antes de voar.', 'RBAC 67.79(a)(1): angina, não apto. FAA: doença coronariana com decisão da FAA. ICAO: retorno exige não precisar de antianginoso.', '2.3'),
      },
      {
        rotulo: 'Dor no peito nova, mais forte ou em repouso',
        passageiro: e('nao-voar', 'Não voe. Procure atendimento médico agora.', 'Angina instável: contraindicação (UK CAA).', '2.3'),
        tripulante: e('nao-voar', 'Não voe. Procure atendimento médico agora.', 'Angina instável: afastamento imediato; 67.15(c); 14 CFR 61.53.', '2.3'),
      },
      {
        rotulo: 'Infarto, stent ou ponte há menos de 2 semanas',
        passageiro: e('nao-voar', 'Ainda não. Os prazos vão de 3 dias (stent sem complicação) a 14 dias (ponte de safena).', 'UK CAA: infarto sem complicação 7–10 dias (< 7 contraindica); com complicação, contraindicado nas primeiras 4–6 semanas; ICP sem complicação 3 dias, avaliação individual; CRM 10–14 dias (< 10 contraindica).', '2.3'),
        tripulante: e('nao-voar', 'Não voe como tripulante: os prazos são de meses.', 'RBAC 67.79(b): IAM ≥ 1 ano; revascularização ou ICP sem IAM ≥ 180 dias; 2ª classe, não piloto: IAM ≥ 6 meses (67.119(b)(2)). FAA: IAM e stent 3 meses, CRM 6 meses (1ª e 2ª classes). ICAO: ≥ 6 meses, restrito.', '2.3'),
      },
      {
        rotulo: 'Infarto, stent ou ponte há mais tempo, sem sintomas',
        passageiro: e('cuidados', 'Pode voar com os remédios na bagagem de mão. Não pare o antiagregante por conta própria.', 'Evento antigo, estável e assintomático: sem contraindicação (UK CAA); antiagregante mantido.', '2.3'),
        tripulante: e('avaliar', 'Só volte a voar com a liberação do médico examinador.', 'RBAC 67.79(b)–(c): após o prazo, exames (Holter, cintilografia, eco, lipidograma ou cateterismo); apto com restrição, validade ≤ 6 meses. FAA: autorização especial com cintilografia pós-evento. ICAO: FEVE > 50%, Bruce IV sem isquemia, Classe 1 restrita.', '2.3'),
      },
    ],
  },
  {
    id: 'card-ritmo',
    pergunta: 'Tem arritmia, como a fibrilação atrial?',
    ajuda: 'Controlada: sem palpitação, tontura ou desmaio, com o tratamento atual.',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, controlada',
        passageiro: e('cuidados', 'Pode voar com os remédios na bagagem de mão.', 'Arritmia controlada: sem contraindicação (UK CAA).', '2.4'),
        tripulante: e('avaliar', 'Leve o caso ao médico examinador.', 'RBAC 67.79(a)(7) e (g): não apto, salvo investigação favorável. FAA: FA com decisão da FAA (Holter ≥ 24 h, TSH, polissonografia, eco, teste de esforço). ICAO: ritmo sinusal, AE < 4,5 cm, 3 Holter em 2–3 meses, restrição.', '2.4'),
      },
      {
        rotulo: 'Sim, com palpitação, tontura ou desmaio recentes',
        passageiro: e('nao-voar', 'Não voe até o médico controlar o ritmo.', 'Arritmia não controlada: contraindicação (UK CAA).', '2.4'),
        tripulante: e('nao-voar', 'Não voe. Procure o médico.', 'Arritmia sintomática: afastamento; 67.15(c); 14 CFR 61.53.', '2.4'),
      },
      {
        rotulo: 'Fiz ablação ou cardioversão no último mês',
        passageiro: e('avaliar', 'Pergunte ao seu cardiologista se o ritmo já está estável para viajar.', 'Após ablação ou cardioversão: liberar quando estável [confirmar na referência o prazo do passageiro].', '2.4'),
        tripulante: e('nao-voar', 'Não voe como tripulante ainda.', 'FAA: ablação 3 meses; cardioversão 1 mês. RBAC 67.79(a)(12): ablação de via anômala ≥ 3 meses com reestudo normal. ICAO: flutter ablado, 3 meses, restrito.', '2.4'),
      },
    ],
  },
  {
    id: 'card-aparelho',
    pergunta: 'Tem marca-passo ou desfibrilador implantado?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Marca-passo',
        passageiro: e('cuidados', 'Pode voar quando estiver estável. Leve o cartão do aparelho e avise no controle de segurança.', 'Marca-passo: voar quando estável; interferência improvável na configuração bipolar (UK CAA).', '2.4'),
        tripulante: e('avaliar', 'Só volte a voar com a decisão da autoridade.', 'RBAC 67.79(a)(3): não apto. FAA: 2 meses após o implante, decisão da FAA; troca de bateria 14 dias. ICAO: sem dependência, Classe 1 restrita ou Classe 2.', '2.4'),
      },
      {
        rotulo: 'Desfibrilador (CDI)',
        passageiro: e('cuidados', 'Pode voar quando estiver estável. Leve o cartão do aparelho e avise no controle de segurança.', 'CDI: voar quando estável (UK CAA).', '2.4'),
        tripulante: e('nao-voar', 'O desfibrilador ativo impede o voo como tripulante.', 'FAA: CDI ativo desqualifica todas as classes. ICAO (Doc 8984, 1.9.1): desfibrilador implantável impede. RBAC 67.79(a)(3).', '2.4'),
      },
    ],
  },
  {
    id: 'card-procedimento',
    pergunta: 'Fez procedimento invasivo ou cirurgia no coração recentemente?',
    ajuda: 'Os prazos do passageiro variam entre as fontes (CAA britânica e sociedade canadense de cardiologia); o médico decide.',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Angioplastia com stent nos últimos 3 dias',
        passageiro: e('avaliar', 'Confirme com o cardiologista; sem complicação, em geral se viaja em 1 a 3 dias.', 'Stent sem complicação: 3 dias (UK CAA) ou 1 dia (CCS, NYHA I–II); após infarto, valem os prazos do infarto.', '2.3'),
        tripulante: e('nao-voar', 'Não voe; há prazo longo e decisão da autoridade.', 'FAA: 3 meses e autorização especial. RBAC 67.79: ao menos 180 dias, apto com restrição.', '2.3'),
      },
      {
        rotulo: 'Ablação, cardioversão ou implante de marca-passo ou desfibrilador nos últimos dias',
        passageiro: e('avaliar', 'Em geral se viaja em 1 a 2 dias se tudo correu bem; confirme com o médico.', 'CCS: 1 dia após procedimento de arritmia supraventricular, 2 dias após ventricular; implante: 1 dia sem pneumotórax e aparelho programado. Atenção à trombose na 1ª semana.', '2.4'),
        tripulante: e('nao-voar', 'Não voe até o prazo e a decisão da autoridade.', 'FAA: ablação 3 meses; cardioversão 1 mês; marca-passo 2 meses; CDI ativo desqualifica.', '2.4'),
      },
      {
        rotulo: 'Cirurgia aberta do tórax (ponte de safena ou troca de válvula) nas últimas 2 semanas',
        passageiro: e('nao-voar', 'Espere o prazo da cirurgia antes de voar.', 'UK CAA: 10 a 14 dias pelo ar no tórax. CCS: 4 dias (voo < 2 h) ou 7 dias (≥ 2 h) com Hb ≥ 90 g/L; abaixo disso, oxigênio.', '2.3'),
        tripulante: e('nao-voar', 'Não voe; prazo de meses e decisão da autoridade.', 'FAA: ponte 6 meses; válvula, decisão da FAA. ICAO: bioprótese ou plastia mitral após 6 meses, restrito. RBAC 67.79(a)(3) e (a)(11).', '2.5'),
      },
      {
        rotulo: 'Choque do desfibrilador com desmaio no último mês',
        passageiro: e('nao-voar', 'Adie a viagem e procure o cardiologista.', 'CCS: 1 mês após intervenção do aparelho com pré-síncope grave ou síncope.', '2.4'),
        tripulante: e('nao-voar', 'O desfibrilador ativo impede o voo como tripulante.', 'FAA e ICAO: CDI impede.', '2.4'),
      },
    ],
  },
  {
    id: 'card-valvula',
    pergunta: 'Tem doença de válvula, prótese de válvula ou cardiopatia de nascença?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, sem sintomas',
        passageiro: e('cuidados', 'Pode voar com a doença estável.', 'Valvopatia assintomática: sem contraindicação (UK CAA).', '2.5'),
        tripulante: e('avaliar', 'Leve o caso ao médico examinador.', 'RBAC 67.79(a)(4), (5), (11), (13): sopro significativo, valvopatia, prótese e congênita sem cura, não apto; prolapso mitral aceito com critérios. FAA: decisão da FAA. ICAO: válvula mecânica impede; bioprótese ou plastia mitral após 6 meses, restrito.', '2.5'),
      },
      {
        rotulo: 'Sim, com falta de ar, desmaio ou dor no peito',
        passageiro: e('avaliar', 'Converse com o cardiologista antes de viajar; grave com sintomas impede o voo.', 'Valvopatia sintomática: contraindicação relativa (função, sintomas, VE, hipertensão pulmonar); grave sintomática contraindica (UK CAA).', '2.5'),
        tripulante: e('nao-voar', 'Não voe. Procure o médico.', 'Valvopatia sintomática: não apto (RBAC 67.79(a)(5)).', '2.5'),
      },
      {
        rotulo: 'Cardiopatia cianótica ou hipertensão pulmonar',
        passageiro: e('avaliar', 'Você vai precisar de oxigênio a bordo, combinado com a companhia.', 'Cianótica e hipertensão pulmonar primária: oxigênio à altitude de cabine (UK CAA); MEDIF com o fluxo.', '2.5'),
        tripulante: e('nao-voar', 'Essa condição impede o voo como tripulante.', 'ICAO (Doc 8984, 1.17.6): hipertensão pulmonar impede todas as classes. RBAC 67.79(a)(4).', '2.5'),
      },
    ],
  },
  {
    id: 'card-ic',
    pergunta: 'Tem insuficiência cardíaca, miocardiopatia ou teve pericardite?',
    ajuda: 'Classe III da NYHA: cansaço em esforços menores que os do dia a dia. Classe IV: cansaço em repouso.',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, estável, classe I ou II',
        passageiro: e('cuidados', 'Pode voar com os remédios na bagagem de mão.', 'IC estável NYHA I–II: sem contraindicação (UK CAA).', '2.6'),
        tripulante: e('avaliar', 'Leve o caso ao médico examinador.', 'RBAC 67.79(a)(2) e (6): miocardiopatia e pericardite, não apto; demais a critério. ICAO: pericardite, 3–6 meses, restrito, recorrência impede.', '2.6'),
      },
      {
        rotulo: 'Sim, classe III ou IV',
        passageiro: e('avaliar', 'Você vai precisar de oxigênio a bordo, combinado com a companhia pelo MEDIF.', 'NYHA III–IV ou PaO2 < 70 mmHg: oxigênio à altitude de cabine (UK CAA).', '2.6'),
        tripulante: e('nao-voar', 'Essa condição impede o voo como tripulante.', 'Insuficiência cardíaca com limitação funcional: não apto (RBAC 67.79(a)(2)).', '2.6'),
      },
      {
        rotulo: 'Piorou nos últimos dias (falta de ar, inchaço, ganho de peso)',
        passageiro: e('nao-voar', 'Não voe. Procure o médico.', 'IC descompensada: contraindicação (UK CAA).', '2.6'),
        tripulante: e('nao-voar', 'Não voe. Procure o médico.', 'Descompensação: afastamento; 67.15(c); 14 CFR 61.53.', '2.6'),
      },
    ],
  },
  {
    id: 'card-tev',
    pergunta: 'Teve trombose na perna ou embolia pulmonar?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, há menos de 2 semanas',
        passageiro: e('avaliar', 'Converse com o médico: a viagem depende do anticoagulante estável e, na embolia, do oxigênio normal.', 'IATA 2020: TVP, voar assintomático e estável no anticoagulante; TEP, ≥ 5 dias com anticoagulação estável e PaO2 normal em ar ambiente. BTS 2022: 2 semanas após o diagnóstico.', '2.7'),
        tripulante: e('nao-voar', 'Não voe como tripulante.', 'ICAO: varfarina por 3–6 meses na TVP, certificação 1 semana após parar; TEP, 6 meses sem certificação. FAA: decisão da FAA (1ª e 2ª classes). RBAC 67.87(c): anticoagulante cumarínico, não apto.', '2.7'),
      },
      {
        rotulo: 'Sim, há mais tempo, ainda com anticoagulante',
        passageiro: e('cuidados', 'Pode voar. Mantenha o anticoagulante no horário, caminhe e exercite a panturrilha.', 'Anticoagulação estável: sem contraindicação; medidas gerais (CDC).', '2.7'),
        tripulante: e('avaliar', 'Leve o caso ao médico examinador.', 'RBAC 67.87(c): cumarínico, não apto. FAA: autorização especial; varfarina com INR ao menos mensal nos 6 meses anteriores; anticoagulante direto com declaração do médico.', '2.7'),
      },
      {
        rotulo: 'Sim, episódio único, resolvido e sem anticoagulante',
        passageiro: e('cuidados', 'Pode voar. Nos voos longos, use meia de compressão se o médico indicar.', 'Trombose prévia é fator de risco: meia de 15–30 mmHg; HBPM a critério (CDC).', '2.7'),
        tripulante: e('avaliar', 'Leve o histórico ao médico examinador.', 'FAA 3ª classe: emitir se episódio único resolvido, sem anticoagulante e avaliação negativa; 1ª e 2ª, decisão da FAA.', '2.7'),
      },
    ],
  },
];
