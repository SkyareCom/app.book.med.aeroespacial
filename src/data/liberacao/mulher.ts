// M2V13 · Formulário de liberação para passageira, tripulante e médico.
// FONTES: ANAC RBAC 67 Emenda 05, 67.13(l), 67.93, 67.133, 67.213 e 67.85(a)(4); ICAO Anexo 1, 6.3.2.21 e 6.3.2.21.1;
// EASA MED.B.045 e AMC; UK CAA Obstetrics and Gynaecology GM e Medication Guidance (v20, 26/01/2026); FAA AME Guide
// (Pregnancy; Contraceptives and HRT, 22/01/2025); IATA Medical Manual (aborto espontâneo, 24 h); CDC Yellow Book
// (Pregnant Travelers; trombose em voos de mais de 4 h); CHEST 2012 (prevenção de trombose em viajantes).
// NÃO substitui decisão clínica, autorização de transporte ou CMA.
import type { PerguntaLiberacao } from '../tipos';

export const liberacaoMulher: PerguntaLiberacao[] = [
  {
    id: 'm2v13-gestacao',
    pergunta: "Você está grávida?",
    ajuda: "Conte as semanas na data da volta, não só na ida.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '13.2' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '13.2' },
      },
      {
        rotulo: "Sim, sem complicação, até 28 semanas",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar: corredor, cinto abaixo da barriga, água e pernas em movimento.",
          medico: "Gestação de baixo risco: orientar prevenção de trombose e cinto; conferir a idade gestacional na volta.",
          topico: '13.2',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "No Brasil, a tripulante grávida de 1ª ou 2ª classe não voa: informe o examinador ou a ANAC.",
          medico: "RBAC 67.93 e 67.133: não apta desde a constatação; 67.13(l). EASA: até a 26ª semana, 1ª classe com OML; FAA: gravidez normal não desqualifica.",
          topico: '13.2',
        },
      },
      {
        rotulo: "Sim, sem complicação, de 28 a 36 semanas (32 se gêmeos)",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Peça ao obstetra o atestado que a companhia exige e confira a semana na volta.",
          medico: "Atestado com data provável do parto e gestação sem complicação; descartar risco de parto prematuro.",
          topico: '13.2',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe na função.",
          medico: "Acima do limite de 26 semanas da EASA e da ICAO; no Brasil, não apta desde a confirmação.",
          topico: '13.2',
        },
      },
      {
        rotulo: "Sim, depois de 36 semanas (32 se gêmeos) ou com sangramento, contrações ou pré-eclâmpsia",
        passageiro: {
          nivel: 'nao-voar',
          leigo: "Não voe: o parto ou a complicação podem acontecer a bordo, longe de ajuda.",
          medico: "Contraindicação: trabalho de parto, sangramento, descolamento, pré-eclâmpsia ou fora do limite da companhia.",
          topico: '13.2',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe.",
          medico: "Gestação fora do baixo risco ou do intervalo aceito por qualquer autoridade.",
          topico: '13.2',
        },
      },
    ],
  },
  {
    id: 'm2v13-pos-parto',
    pergunta: "Teve parto, aborto ou cirurgia ginecológica nas últimas semanas?",
    ajuda: "Inclui cesárea, curetagem e laparoscopia.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '13.3' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '13.3' },
      },
      {
        rotulo: "Sim, recuperada, sem sangramento e sem dor",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar com as pernas em movimento e água: o sangue ainda coagula mais nas primeiras semanas.",
          medico: "Puerpério ou pós-operatório sem complicação: prevenção de trombose; aborto espontâneo: IATA, estável há 24 h.",
          topico: '13.3',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Faça o exame de revalidação antes de voltar à escala.",
          medico: "RBAC 67.133(c): novo exame de revalidação depois da licença pós-parto ou do fim da gravidez; EASA: depois da recuperação; cirurgia: prazos mínimos da CAA britânica.",
          topico: '13.3',
        },
      },
      {
        rotulo: "Sim, ainda com sangramento, febre ou dor",
        passageiro: {
          nivel: 'nao-voar',
          leigo: "Não voe: procure o médico antes.",
          medico: "Afastar hemorragia, infecção e trombose antes do voo.",
          topico: '13.3',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe.",
          medico: "Recuperação incompleta: inapta até o relatório médico e a revalidação.",
          topico: '13.3',
        },
      },
    ],
  },
  {
    id: 'm2v13-ciclo',
    pergunta: "Como está o ciclo menstrual hoje?",
    ajuda: "Sangramento intenso é o que encharca um absorvente em uma hora.",
    opcoes: [
      {
        rotulo: "Normal, ou cólica que passa com o remédio de costume",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '13.4' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '13.4' },
      },
      {
        rotulo: "Sangramento intenso ou cólica que não cede",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Procure o médico e confira a hemoglobina antes de viajar.",
          medico: "Investigar anemia e causa do sangramento; a anemia soma tontura à cabine.",
          topico: '13.4',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não assuma a função enquanto a dor ou o sangramento não cederem.",
          medico: "CAA britânica: sangramento intenso em investigação especializada, inapta até relatório e hemoglobina normal.",
          topico: '13.4',
        },
      },
      {
        rotulo: "Endometriose diagnosticada há pouco",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar com a dor controlada; leve o remédio na bagagem de mão.",
          medico: "O voo não agrava a doença; orientar analgesia que não dê sono.",
          topico: '13.4',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Leve o relatório do ginecologista ao examinador.",
          medico: "CAA britânica: primeiro diagnóstico, inapta até ficar sem sintomas com o mínimo de analgésico.",
          topico: '13.4',
        },
      },
    ],
  },
  {
    id: 'm2v13-hormonio',
    pergunta: "Usa pílula combinada, adesivo, anel ou terapia hormonal por via oral?",
    ajuda: "São os que têm estrogênio e aumentam a coagulação.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '13.4' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '13.4' },
      },
      {
        rotulo: "Sim, e o voo tem mais de 4 horas",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar: caminhe, mexa as panturrilhas, beba água e use meias se tiver outro fator de risco.",
          medico: "Estrogênio soma risco de trombose ao voo longo; meias de compressão abaixo do joelho se houver outro fator.",
          topico: '13.4',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Pode voar; mexa as pernas nas pausas e informe o remédio ao examinador.",
          medico: "FAA: contraceptivos e terapia hormonal não desqualificam sem efeito colateral; ANAC: avaliação do examinador.",
          topico: '13.4',
        },
      },
      {
        rotulo: "Sim, e já tive trombose ou tenho dor e inchaço numa perna",
        passageiro: {
          nivel: 'nao-voar',
          leigo: "Não voe antes de ser examinada.",
          medico: "Suspeita de trombose: investigar antes do voo; trombose prévia com estrogênio pede revisão do método.",
          topico: '13.4',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe; procure o médico.",
          medico: "Suspeita de trombose: inapta até o diagnóstico (Veja M2V2 - VII).",
          topico: '13.4',
        },
      },
    ],
  },
  {
    id: 'm2v13-menopausa',
    pergunta: "Os sintomas da menopausa atrapalham o sono ou a atenção?",
    ajuda: "Pense nas últimas duas semanas.",
    opcoes: [
      {
        rotulo: "Não, ou sem menopausa",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '13.5' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '13.5' },
      },
      {
        rotulo: "Sim, mas com tratamento estável e sem efeito colateral",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '13.5' },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Pode voar; mantenha o examinador informado do tratamento.",
          medico: "FAA: terapia hormonal não desqualifica sem efeito colateral; RBAC 67: efeitos de hormônios de substituição a critério do examinador.",
          topico: '13.5',
        },
      },
      {
        rotulo: "Sim, com sonolência durante o dia ou remédio novo que dá sono",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar; evite dirigir cansada e converse com o médico sobre o sono.",
          medico: "Tratar a insônia e revisar remédios sedativos.",
          topico: '13.5',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não assuma a função até tratar o sono e conferir o remédio com o examinador.",
          medico: "Fadiga e sedação: inapta temporariamente; CAA britânica admite afastamento temporário durante o ajuste.",
          topico: '13.5',
        },
      },
    ],
  },
  {
    id: 'm2v13-fase',
    pergunta: "Começou um remédio hormonal novo ou mudou de fase, como gestação, pós-parto ou menopausa?",
    ajuda: "Cada fase pede um cuidado diferente no voo.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '13.1' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '13.1' },
      },
      {
        rotulo: "Sim",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Confira o que a fase pede: a semana da gestação na volta, o horário da pílula no fuso de destino; no voo longo, água, corredor e pernas em movimento.",
          medico: "Mudança de fase ou hormônio novo: revisar trombose, horário da medicação e idade gestacional.",
          topico: '13.1',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Informe o examinador: a gravidez e o remédio hormonal novo mudam a decisão sobre o certificado.",
          medico: "Gravidez ou hormônio novo: comunicar ao examinador antes de voar.",
          topico: '13.1',
        },
      },
    ],
  },
];
