// M2V14 · Formulário de liberação para passageiro, tripulante e médico · rins e vias urinárias.
// FONTES: ANAC RBAC 67 Emenda 05, 67.89 e 67.129; FAA AME Guide (Kidney Stones Disposition Table; CKD e AASI; Renal
// Transplant; Renal Cancer; Prostate e CACI Prostate Cancer; DNI/DNF 30/09/2026); AMAS (Prostatic Hypertrophy); UK CAA
// Genitourinary GM, AMC1/AMC2 MED.B.035, Medication for BPH e Bladder instability, Surgical conditions; CAA NZ MIS 021;
// Royal Berkshire NHS (ESWL); Kidney Care UK; Flight Safety Foundation (2001). Fontes no registro de capitulos/rins.ts.
// NÃO substitui decisão clínica, autorização de transporte ou CMA.
import type { PerguntaLiberacao } from '../tipos';

export const liberacaoRins: PerguntaLiberacao[] = [
  {
    id: 'm2v14-agua',
    pergunta: "Costuma beber pouca água no voo para não ir ao banheiro?",
    ajuda: "A sede só aparece quando já se perdeu perto de 1,5 litro.",
    opcoes: [
      {
        rotulo: "Não, bebo água em goles ao longo do voo",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '14.1' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '14.1' },
      },
      {
        rotulo: "Sim",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Beba água em goles antes da sede e use a urina clara como guia; vá ao banheiro quando o aviso permitir.",
          medico: "Desidratação no ar seco da cabine concentra a urina e favorece cálculo.",
          topico: '14.1',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Deixe uma garrafa à vista, que permita medir o que bebe, e não adie o banheiro.",
          medico: "Flight Safety Foundation: relutância em sair da cabine e desidratação ligadas a cálculo; beber antes da sede.",
          topico: '14.1',
        },
      },
    ],
  },
  {
    id: 'm2v14-calculo',
    pergunta: "Já teve pedra nos rins?",
    ajuda: "Conte também as pedras vistas por acaso num exame.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '14.2' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '14.2' },
      },
      {
        rotulo: "Sim, há 5 anos ou mais, sem sintomas nem tratamento",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar; beba água antes da sede.",
          medico: "Litíase antiga sem sintomas: orientar hidratação.",
          topico: '14.2',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Pode voar; informe o histórico no exame médico.",
          medico: "FAA Kidney Stones, categoria A: ISSUE, resumo no item 60.",
          topico: '14.2',
        },
      },
      {
        rotulo: "Sim, uma pedra eliminada há menos de 5 anos, imagem sem pedra retida",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar com água em dia e analgésico na bagagem de mão.",
          medico: "Episódio único resolvido: hidratação e analgesia de resgate.",
          topico: '14.2',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Pode voar; leve a imagem sem pedra ao examinador.",
          medico: "FAA, categoria B: ISSUE com imagem sem cálculo retido; UK CAA: apto após tratamento bem-sucedido.",
          topico: '14.2',
        },
      },
      {
        rotulo: "Sim, pedras retidas sem sintomas",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar com analgésico na bagagem de mão e o relatório do urologista.",
          medico: "Cálculo retido assintomático: risco de migração; analgesia e relatório.",
          topico: '14.2',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Leve o caso ao examinador antes de voar.",
          medico: "FAA, categoria C: CACI (Retained Kidney Stone Worksheet); UK CAA: cálculo residual do parênquima, OML na 1ª classe; RBAC 67.89(b).",
          topico: '14.2',
        },
      },
      {
        rotulo: "Sim, com complicação, 3 ou mais procedimentos em 5 anos ou remédio para prevenir",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Converse com o urologista antes da viagem e leve o plano para crise.",
          medico: "Litíase complicada ou recorrente: avaliação urológica.",
          topico: '14.2',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Não voe como tripulante até a decisão da autoridade.",
          medico: "FAA, categoria D: DEFER, nota do urologista de até 90 dias; RBAC 67.89(b): não apto salvo investigação e julgamento da ANAC.",
          topico: '14.2',
        },
      },
      {
        rotulo: "Estou com cólica agora ou fiz litotripsia há menos de 2 semanas",
        passageiro: {
          nivel: 'nao-voar',
          leigo: "Não voe agora; depois da litotripsia, evite viajar ao exterior por 2 semanas.",
          medico: "Cólica ativa ou fragmentos em migração (até cerca de 2 semanas após LECO).",
          topico: '14.2',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe e avise o examinador.",
          medico: "Cálculo urinário: inapto até investigação e tratamento (UK CAA AMC1 MED.B.035; RBAC 67.89(b)).",
          topico: '14.2',
        },
      },
    ],
  },
  {
    id: 'm2v14-rim',
    pergunta: "Tem doença renal crônica, faz diálise ou recebeu transplante de rim?",
    ajuda: "A TFG (eGFR) aparece no exame de creatinina.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '14.3' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '14.3' },
      },
      {
        rotulo: "Sim, TFG de 45 a 59, sem sintomas",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar com os remédios no horário.",
          medico: "DRC estágio inicial estável.",
          topico: '14.3',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Pode voar; leve os exames ao examinador.",
          medico: "FAA CKD, estágio A: ISSUE.",
          topico: '14.3',
        },
      },
      {
        rotulo: "Sim, TFG de 35 a 44",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar; confira a anemia com o nefrologista.",
          medico: "DRC moderada: avaliar hemoglobina e pressão antes do voo.",
          topico: '14.3',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Leve os exames ao examinador antes de voar.",
          medico: "FAA CKD, estágio B: CACI; rim único não usa CACI e vai à decisão da FAA.",
          topico: '14.3',
        },
      },
      {
        rotulo: "Sim, TFG de 34 ou menos, sintomas ou muita proteína na urina",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Converse com o nefrologista antes da viagem.",
          medico: "DRC avançada: anemia, líquido e pressão; considerar MEDIF.",
          topico: '14.3',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe como tripulante até a decisão da autoridade.",
          medico: "FAA CKD, estágio C: DEFER; exames de até 90 dias; UK CAA: depuração < 20 mL/min inaceitável.",
          topico: '14.3',
        },
      },
      {
        rotulo: "Faço diálise",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Voe nos dias sem sessão, com a diálise do destino reservada; não perca uma sessão para viajar.",
          medico: "Diálise: planejamento com a unidade (cerca de 3 meses em viagens internacionais); MEDIF conforme a companhia.",
          topico: '14.3',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe como tripulante sem a decisão da autoridade.",
          medico: "FAA: doença renal terminal, DEFER; UK CAA: diálise, inapto; RBAC 67.89(a): insuficiência renal, não apto.",
          topico: '14.3',
        },
      },
      {
        rotulo: "Recebi transplante de rim",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar com o aval da equipe de transplante e o imunossupressor no horário combinado.",
          medico: "Transplantado: medicação na bagagem de mão, folga de horário combinada e proteção contra infecção.",
          topico: '14.3',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Leve o caso ao examinador; a volta depende da autoridade.",
          medico: "FAA: após 6 meses, DEFER; UK CAA: a partir de 12 meses, OML na 1ª classe, corticoide < 10 mg/dia; RBAC 67.89(d): apto em consulta à ANAC.",
          topico: '14.3',
        },
      },
    ],
  },
  {
    id: 'm2v14-prostata',
    pergunta: "Usa remédio para próstata ou bexiga hiperativa?",
    ajuda: "Inclua remédio começado ou com dose mudada recentemente.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '14.4' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '14.4' },
      },
      {
        rotulo: "Alfabloqueador (tansulosina, alfuzosina)",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Levante devagar: o remédio pode baixar a pressão em pé.",
          medico: "Alfabloqueador: hipotensão postural.",
          topico: '14.4',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Fique no solo pelo prazo da autoridade depois de começar ou aumentar a dose.",
          medico: "UK CAA: no solo ≥ 2 semanas após início ou aumento, 3 medidas de PA deitado e em pé; FAA: após dose final estável sem efeitos.",
          topico: '14.4',
        },
      },
      {
        rotulo: "Finasterida ou dutasterida",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '14.4' },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Espere 48 horas sem efeitos depois da primeira dose.",
          medico: "UK CAA: 48 h após a 1ª dose; FAA: cerca de 2 dias sem efeitos.",
          topico: '14.4',
        },
      },
      {
        rotulo: "Remédio para bexiga hiperativa (oxibutinina, tolterodina, solifenacina, mirabegrona)",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar; boca seca e sono são efeitos possíveis.",
          medico: "Antimuscarínico: efeitos anticolinérgicos.",
          topico: '14.4',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe até o examinador decidir: alguns desses remédios não são aceitos.",
          medico: "FAA DNI: oxibutinina, tolterodina, solifenacina; UK CAA: 4 semanas no solo e OML na 1ª classe até 4 meses.",
          topico: '14.4',
        },
      },
    ],
  },
  {
    id: 'm2v14-infeccao',
    pergunta: "Tem infecção urinária ou dificuldade para urinar agora?",
    ajuda: "Febre, calafrio ou dor nas costas mudam a resposta.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '14.4' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '14.4' },
      },
      {
        rotulo: "Cistite sem febre, com antibiótico começado",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Em geral pode voar; beba água e vá ao banheiro quando precisar.",
          medico: "Cistite não complicada em tratamento.",
          topico: '14.4',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Volte a voar sem sintomas e sem efeitos do remédio.",
          medico: "Doença aguda: retorno após resolução; RBAC 67.89(a).",
          topico: '14.4',
        },
      },
      {
        rotulo: "Febre, calafrio ou dor nas costas",
        passageiro: {
          nivel: 'nao-voar',
          leigo: "Não voe até o médico avaliar.",
          medico: "Suspeita de pielonefrite: tratar antes de voar.",
          topico: '14.4',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe até o médico avaliar.",
          medico: "Pielonefrite: doença febril aguda, não apto até a resolução.",
          topico: '14.4',
        },
      },
      {
        rotulo: "Não consigo urinar ou estou de sonda",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Sem conseguir urinar, procure atendimento; com sonda, leve bolsas extras e esvazie a bolsa antes de embarcar.",
          medico: "Retenção urinária: sondagem e investigação antes do voo.",
          topico: '14.4',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe até a causa ser tratada.",
          medico: "RBAC 67.89(b): obstrução das vias urinárias, não apto salvo investigação e julgamento da ANAC.",
          topico: '14.4',
        },
      },
    ],
  },
  {
    id: 'm2v14-cirurgia',
    pergunta: "Fez cirurgia urológica ou tratamento de câncer do rim, da bexiga ou da próstata?",
    ajuda: "Inclui doação de rim, nefrectomia, RTU e prostatectomia.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '14.5' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '14.5' },
      },
      {
        rotulo: "Cirurgia por vídeo nas últimas 24 horas ou aberta nos últimos 10 dias",
        passageiro: {
          nivel: 'nao-voar',
          leigo: "Espere o prazo e a liberação do cirurgião.",
          medico: "UK CAA: evitar voo ~24 h após laparoscopia e 10 dias após cirurgia abdominal.",
          topico: '14.5',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe até a recuperação completa.",
          medico: "UK CAA AMC1 MED.B.035(d)(1): inapto até recuperação completa.",
          topico: '14.5',
        },
      },
      {
        rotulo: "Câncer tratado há menos de 5 anos, sem metástase",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar estável; confira a anemia com o oncologista.",
          medico: "Neoplasia urológica tratada: avaliar anemia e infecção.",
          topico: '14.5',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Leve os laudos ao examinador.",
          medico: "FAA: CACI rim e próstata; PSA ≤ 20 sem prostatectomia ou ≤ 0,2 após, de até 6 meses.",
          topico: '14.5',
        },
      },
      {
        rotulo: "Câncer com metástase, recidiva ou em tratamento ativo",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Converse com o oncologista antes da viagem.",
          medico: "Doença avançada: anemia, dor e infecção; considerar MEDIF.",
          topico: '14.5',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe como tripulante até a decisão da autoridade.",
          medico: "FAA: metástase ou recidiva, DEFER; tratamento ativo concluído antes da certificação.",
          topico: '14.5',
        },
      },
    ],
  },
  {
    id: 'm2v14-sangue',
    pergunta: "Viu sangue na urina recentemente?",
    ajuda: "Urina rosada, vermelha ou cor de chá.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '14.5' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '14.5' },
      },
      {
        rotulo: "Sim, com causa já explicada pelo médico",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar seguindo o plano do médico.",
          medico: "Hematúria esclarecida: conduta conforme a causa.",
          topico: '14.5',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Informe o examinador no próximo exame.",
          medico: "Hematúria investigada: relato no exame.",
          topico: '14.5',
        },
      },
      {
        rotulo: "Sim, sem explicação",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Procure o médico antes da viagem.",
          medico: "Hematúria visível: investigar (pedra, infecção, tumor).",
          topico: '14.5',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Investigue antes do próximo voo.",
          medico: "UK CAA GM: qualquer episódio de hematúria visível é significativo; AMC1 MED.B.035(a): investigar urinálise alterada.",
          topico: '14.5',
        },
      },
    ],
  },
];
