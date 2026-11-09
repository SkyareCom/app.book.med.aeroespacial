// M2V11 · Formulário de liberação para passageiro, tripulante e médico.
// FONTES: ANAC RBAC 67 EMD05 67.87/67.127; FAA AME Guide Item 48;
// CDC Yellow Book 2026: Air Travel, Chronic Illness, HIV e Immunocompromised Travelers.
// NÃO substitui decisão clínica, autorização de transporte ou CMA.
import type { PerguntaLiberacao } from '../tipos';

export const liberacaoSangue: PerguntaLiberacao[] = [
  {
    id: "m2v11-sintomas",
    pergunta: "Há falta de ar nova, desmaio, sangramento importante, dor torácica ou febre com prostração?",
    ajuda: "Considere o quadro atual, não apenas o diagnóstico anterior.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.1"
        },
        tripulante: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.1"
        }
      },
      {
        rotulo: "Sim",
        passageiro: {
          nivel: "nao-voar",
          leigo: "Não embarque com esses sinais; procure atendimento.",
          medico: "Investigar hemorragia, hipóxia, tromboembolismo ou infecção grave antes do deslocamento.",
          topico: "11.1"
        },
        tripulante: {
          nivel: "nao-voar",
          leigo: "Não assuma a função; procure atendimento e informe o examinador.",
          medico: "Risco de incapacitação; suspensão da atividade e avaliação conforme RBAC 67.",
          topico: "11.1"
        }
      }
    ]
  },
  {
    id: "m2v11-anemia",
    pergunta: "Qual é a situação da anemia ou da doença falciforme?",
    ajuda: "Hb inferior a 8,5 g/dL é referência do CDC para passageiros, com exceções clínicas; não é limite de CMA.",
    opcoes: [
      {
        rotulo: "Não tenho anemia ou estou estável após avaliação",
        passageiro: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.2"
        },
        tripulante: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.2"
        }
      },
      {
        rotulo: "Anemia com sintomas, sangramento recente ou Hb abaixo de 8,5 g/dL",
        passageiro: {
          nivel: "avaliar",
          leigo: "Procure avaliação; a orientação do CDC é adiar na maioria dos casos de Hb abaixo de 8,5 g/dL.",
          medico: "Checar estabilidade, causa, sangramento, oxigenação e eventual necessidade de suporte; não aplicar limiar do CDC como certificado de piloto.",
          topico: "11.2"
        },
        tripulante: {
          nivel: "nao-voar",
          leigo: "Não opere até investigação e decisão do examinador.",
          medico: "RBAC 67.87/67.127: doença hematológica exige investigação e avaliação de segurança.",
          topico: "11.2"
        }
      },
      {
        rotulo: "Crise falciforme nos últimos nove dias",
        passageiro: {
          nivel: "avaliar",
          leigo: "O CDC recomenda adiar viagem após crise recente; converse com seu médico.",
          medico: "Reavaliar resolução da crise e complicações pulmonar/esplênica; orientação CDC para passageiro.",
          topico: "11.2"
        },
        tripulante: {
          nivel: "nao-voar",
          leigo: "Não exerça função durante recuperação sem avaliação aeromédica.",
          medico: "Crise recente impede segurança; necessidade de decisão individual da autoridade.",
          topico: "11.2"
        }
      }
    ]
  },
  {
    id: "m2v11-anticoag",
    pergunta: "Você usa anticoagulante ou teve sangramento/trombose recentemente?",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.2"
        },
        tripulante: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.2"
        }
      },
      {
        rotulo: "Anticoagulação estável e sem complicações",
        passageiro: {
          nivel: "cuidados",
          leigo: "Mantenha a prescrição e discuta riscos em voos longos.",
          medico: "Avaliar anticoagulação, hemorragia, indicação e mobilidade; não interromper tratamento para viagem.",
          topico: "11.2"
        },
        tripulante: {
          nivel: "avaliar",
          leigo: "Informe ao examinador; não presuma aptidão pelo controle do tratamento.",
          medico: "RBAC 67.87(c)/67.127(c) prevê inaptidão para anticoagulação oral cumarínica; outros tratamentos requerem avaliação específica.",
          topico: "11.2"
        }
      },
      {
        rotulo: "Anticoagulante cumarínico (ex.: varfarina)",
        passageiro: {
          nivel: "cuidados",
          leigo: "Não suspenda; confirme estabilidade e orientação do médico.",
          medico: "Avaliar sangramento, indicação e monitorização; regra brasileira de CMA não é aplicada ao passageiro.",
          topico: "11.2"
        },
        tripulante: {
          nivel: "nao-voar",
          leigo: "Não assuma a função sem regularização da situação aeromédica.",
          medico: "RBAC 67.87(c)/67.127(c): candidato em anticoagulação oral cumarínica deve ser julgado não apto.",
          topico: "11.2"
        }
      },
      {
        rotulo: "Sangramento ativo, trombose ou embolia recente",
        passageiro: {
          nivel: "nao-voar",
          leigo: "Adie o voo; procure avaliação da complicação.",
          medico: "Investigar e estabilizar tromboembolismo, hemorragia e necessidade de cuidado antes de transporte.",
          topico: "11.2"
        },
        tripulante: {
          nivel: "nao-voar",
          leigo: "Não opere; encaminhamento médico e aeromédico.",
          medico: "Risco de evento súbito e incapacitação; ausência de aptidão operacional.",
          topico: "11.2"
        }
      }
    ]
  },
  {
    id: "m2v11-oncologia",
    pergunta: "Como está a situação oncológica e o tratamento?",
    opcoes: [
      {
        rotulo: "Sem câncer ativo ou em acompanhamento, clinicamente estável",
        passageiro: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.3"
        },
        tripulante: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.3"
        }
      },
      {
        rotulo: "Em tratamento ativo, sem complicações, com acompanhamento",
        passageiro: {
          nivel: "avaliar",
          leigo: "Planeje a viagem com o oncologista e avalie acesso a cuidados.",
          medico: "Verificar hemograma, imunidade, suporte, toxicidade, trombose e destino.",
          topico: "11.3"
        },
        tripulante: {
          nivel: "nao-voar",
          leigo: "Não opere durante tratamento potencialmente incapacitante sem avaliação formal.",
          medico: "Avaliar efeitos da terapia, neoplasia, funções e certificação pela autoridade.",
          topico: "11.3"
        }
      },
      {
        rotulo: "Febre em quimioterapia, sangramento ou falta de ar",
        passageiro: {
          nivel: "nao-voar",
          leigo: "Não embarque; atendimento clínico urgente.",
          medico: "Suspeitar de neutropenia febril, hemorragia e tromboembolismo.",
          topico: "11.3"
        },
        tripulante: {
          nivel: "nao-voar",
          leigo: "Não exerça função; procure atendimento.",
          medico: "Risco de infecção grave e incapacidade súbita.",
          topico: "11.3"
        }
      }
    ]
  },
  {
    id: "m2v11-infeccao",
    pergunta: "Há infecção transmissível aguda ou sintomas importantes hoje?",
    opcoes: [
      {
        rotulo: "Não, estou recuperado",
        passageiro: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.4"
        },
        tripulante: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.4"
        }
      },
      {
        rotulo: "Doença leve em avaliação, sem sinais de gravidade",
        passageiro: {
          nivel: "avaliar",
          leigo: "Confirme as orientações de isolamento e risco de transmissão antes de viajar.",
          medico: "Determinar agente, contagiosidade e condição clínica individual; não há prazo único.",
          topico: "11.4"
        },
        tripulante: {
          nivel: "avaliar",
          leigo: "Consulte saúde ocupacional e examinador quando indicado.",
          medico: "Avaliar risco infeccioso, desempenho e protocolo operacional.",
          topico: "11.4"
        }
      },
      {
        rotulo: "Infecção contagiosa ativa com febre ou dispneia",
        passageiro: {
          nivel: "nao-voar",
          leigo: "Adie; procure avaliação e siga orientação sanitária.",
          medico: "Instabilidade clínica e potencial transmissão em viagem.",
          topico: "11.4"
        },
        tripulante: {
          nivel: "nao-voar",
          leigo: "Não exerça função durante o quadro.",
          medico: "Risco de incapacitação e exposição de outros; afastar conforme protocolos.",
          topico: "11.4"
        }
      }
    ]
  },
  {
    id: "m2v11-hiv",
    pergunta: "Se vive com HIV, qual é a situação de controle e tratamento?",
    ajuda: "O HIV não se transmite pelo ar da cabine. A avaliação clínica deve respeitar a privacidade.",
    opcoes: [
      {
        rotulo: "Não se aplica",
        passageiro: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.5"
        },
        tripulante: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.5"
        }
      },
      {
        rotulo: "HIV controlado, tratamento regular e sem sintomas",
        passageiro: {
          nivel: "cuidados",
          leigo: "Em geral pode viajar; mantenha os remédios e o acompanhamento.",
          medico: "Planejar doses, imunizações e cuidados no destino sem discriminação.",
          topico: "11.5"
        },
        tripulante: {
          nivel: "avaliar",
          leigo: "Solicite avaliação aeromédica confidencial.",
          medico: "FAA exige decisão central para histórico de HIV; em outras jurisdições aplicar a norma competente e avaliação individual.",
          topico: "11.5"
        }
      },
      {
        rotulo: "Imunossupressão importante ou infecção oportunista ativa",
        passageiro: {
          nivel: "avaliar",
          leigo: "Considere adiar e estabilizar o tratamento com seu médico.",
          medico: "CDC: risco infeccioso aumentado; preferir recuperação imunológica quando possível.",
          topico: "11.5"
        },
        tripulante: {
          nivel: "nao-voar",
          leigo: "Não exerça função enquanto clinicamente instável.",
          medico: "Avaliação de capacidade funcional, infecção ativa e segurança operacional.",
          topico: "11.5"
        }
      }
    ]
  },
  {
    id: "m2v11-vacinas",
    pergunta: "Há vacina exigida pelo destino, imunossupressão ou reação importante após imunização?",
    opcoes: [
      {
        rotulo: "Vacinação avaliada e sem reação relevante",
        passageiro: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.6"
        },
        tripulante: {
          nivel: "liberado",
          leigo: "",
          medico: "",
          topico: "11.6"
        }
      },
      {
        rotulo: "Imunossupressão e previsão de vacina viva",
        passageiro: {
          nivel: "avaliar",
          leigo: "Consulte especialista sobre contraindicações antes da vacina e viagem.",
          medico: "CDC Yellow Book: vacina viva pode ser contraindicada em imunossupressão grave; verificar destino e alternativas.",
          topico: "11.6"
        },
        tripulante: {
          nivel: "avaliar",
          leigo: "Informe o serviço de saúde ocupacional e acompanhe possíveis reações.",
          medico: "Avaliar estado imune, exigência sanitária e capacidade funcional.",
          topico: "11.6"
        }
      },
      {
        rotulo: "Febre alta, reação sistêmica ou impedimento sanitário",
        passageiro: {
          nivel: "avaliar",
          leigo: "Avalie a reação e as regras do destino antes de viajar.",
          medico: "Descartar doença concomitante; planejar certificado ou ajuste de rota quando pertinente.",
          topico: "11.6"
        },
        tripulante: {
          nivel: "nao-voar",
          leigo: "Não exerça função com sintomas incapacitantes.",
          medico: "Aptidão requer recuperação e avaliação pertinente.",
          topico: "11.6"
        }
      }
    ]
  }
];
