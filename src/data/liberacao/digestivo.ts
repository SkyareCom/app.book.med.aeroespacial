// M2V10 · Liberação aeromédica e do passageiro (05/11/2026).
// Fontes (apenas registro): ANAC RBAC 67 Emenda 05 67.83 e 67.123; ICAO Doc 8984 Part III cap. 3;
// FAA AME Guide Item 38 e AASI Colitis; EASA / UK CAA MED.B.020; UK CAA Surgical conditions,
// UK CAA Abdominal surgery (pilotos); CDC Yellow Book 2026 Travelers' Diarrhea.
// A orientação de 10 dias para passageiros não substitui a liberação clínica individual e os prazos
// britânicos para pilotos não são prazos regulatórios brasileiros.
import type { EfeitoLiberacao, PerguntaLiberacao } from '../tipos';

export const liberacaoDigestivo: PerguntaLiberacao[] = [
  {
    "id": "digestivo-sinais",
    "pergunta": "Tem dor abdominal forte ou crescente, vômito com sangue, fezes pretas com fraqueza ou desmaio, ou distensão progressiva?",
    "ajuda": "Marque se qualquer um desses sinais está presente agora.",
    "opcoes": [
      {
        "rotulo": "Não",
        "passageiro": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        },
        "tripulante": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        }
      },
      {
        "rotulo": "Sim",
        "passageiro": {
          "nivel": "nao-voar",
          "leigo": "Não embarque. Esses sinais exigem atendimento de urgência.",
          "medico": "Investigar hemorragia, obstrução, perfuração ou abdome agudo antes de qualquer transporte aéreo.",
          "topico": "10.1"
        },
        "tripulante": {
          "nivel": "nao-voar",
          "leigo": "Não assuma a função; procure urgência e comunique o examinador.",
          "medico": "RBAC 67.83/67.123; ICAO Doc 8984 III-3.1: risco de incapacitação súbita.",
          "topico": "10.1"
        }
      }
    ]
  },
  {
    "id": "digestivo-ulcera",
    "pergunta": "Como está o refluxo, a gastrite ou a úlcera?",
    "opcoes": [
      {
        "rotulo": "Não tenho ou não sinto sintomas",
        "passageiro": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        },
        "tripulante": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        }
      },
      {
        "rotulo": "Azia ou gastrite leve e controlada",
        "passageiro": {
          "nivel": "cuidados",
          "leigo": "Pode viajar se continuar estável e sem sinais de alerta.",
          "medico": "Avaliar uso de medicamentos e ausência de sintomas incapacitantes.",
          "topico": "10.2"
        },
        "tripulante": {
          "nivel": "avaliar",
          "leigo": "Informe sintomas e tratamento ao examinador antes de concluir a aptidão.",
          "medico": "FAA Item 38; ANAC RBAC 67.83 e 67.123: controle e risco funcional.",
          "topico": "10.2"
        }
      },
      {
        "rotulo": "Úlcera ativa ou dor importante",
        "passageiro": {
          "nivel": "avaliar",
          "leigo": "Fale com o médico antes do voo e não embarque se houver dor intensa ou sangramento.",
          "medico": "Necessária avaliação da úlcera e exclusão de complicações.",
          "topico": "10.2"
        },
        "tripulante": {
          "nivel": "nao-voar",
          "leigo": "Não opere até tratamento, recuperação e avaliação aeromédica.",
          "medico": "ICAO Doc 8984 III-3.3; EASA MED.B.020: úlcera exige recuperação.",
          "topico": "10.2"
        }
      }
    ]
  },
  {
    "id": "digestivo-intestino",
    "pergunta": "Como estão as evacuações e a saúde intestinal?",
    "opcoes": [
      {
        "rotulo": "Sem sintomas",
        "passageiro": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        },
        "tripulante": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        }
      },
      {
        "rotulo": "Intestino irritável ou doença inflamatória estável",
        "passageiro": {
          "nivel": "cuidados",
          "leigo": "Pode viajar com plano de dieta, líquidos e acesso ao banheiro se não houver crise.",
          "medico": "Confirmar estabilidade e ausência de sinais inflamatórios graves.",
          "topico": "10.3"
        },
        "tripulante": {
          "nivel": "avaliar",
          "leigo": "Leve o relatório da doença e dos remédios ao examinador.",
          "medico": "FAA Colitis CACI/AASI; EASA 1ª classe: remissão estável sem esteroide sistêmico para controle.",
          "topico": "10.3"
        }
      },
      {
        "rotulo": "Diarreia importante, febre ou sangue nas fezes",
        "passageiro": {
          "nivel": "nao-voar",
          "leigo": "Não embarque; perdas de água, febre ou sangue exigem avaliação.",
          "medico": "Investigar infecção, desidratação e atividade inflamatória.",
          "topico": "10.3"
        },
        "tripulante": {
          "nivel": "nao-voar",
          "leigo": "Não assuma o voo; trate a crise e informe o examinador.",
          "medico": "FAA AASI Colitis: cessar funções durante exacerbação; RBAC 67 risco de incapacitação.",
          "topico": "10.3"
        }
      }
    ]
  },
  {
    "id": "digestivo-figado",
    "pergunta": "Tem doença do fígado com sintomas ou complicações?",
    "opcoes": [
      {
        "rotulo": "Não tenho doença hepática",
        "passageiro": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        },
        "tripulante": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        }
      },
      {
        "rotulo": "Doença do fígado estável, sem complicações",
        "passageiro": {
          "nivel": "cuidados",
          "leigo": "Pode viajar conforme avaliação do seu médico e sem mudar seus remédios.",
          "medico": "Revisar função hepática e evolução clínica.",
          "topico": "10.4"
        },
        "tripulante": {
          "nivel": "avaliar",
          "leigo": "Peça avaliação aeromédica e apresente relatório da função hepática.",
          "medico": "FAA Item 38 liver disease; EASA MED.B.020 exige avaliação satisfatória.",
          "topico": "10.4"
        }
      },
      {
        "rotulo": "Ascite piorando, confusão, sangramento ou hepatite aguda com mal-estar",
        "passageiro": {
          "nivel": "nao-voar",
          "leigo": "Não embarque: pode haver complicação grave ou perda de consciência.",
          "medico": "Investigar descompensação, encefalopatia e hemorragia.",
          "topico": "10.4"
        },
        "tripulante": {
          "nivel": "nao-voar",
          "leigo": "Não exerça função de voo; obtenha avaliação médica e aeromédica.",
          "medico": "RBAC 67.83/67.123, EASA MED.B.020: risco de incapacitação.",
          "topico": "10.4"
        }
      },
      {
        "rotulo": "Varizes no esôfago conhecidas",
        "passageiro": {
          "nivel": "avaliar",
          "leigo": "Avalie o risco de sangramento com o especialista antes de viajar.",
          "medico": "Verificar risco de hemorragia varicosa.",
          "topico": "10.4"
        },
        "tripulante": {
          "nivel": "nao-voar",
          "leigo": "Não opere até avaliação da autoridade aeronáutica.",
          "medico": "EASA/UK CAA MED.B.020: varizes esofágicas avaliadas como inaptidão.",
          "topico": "10.4"
        }
      }
    ]
  },
  {
    "id": "digestivo-vesicula",
    "pergunta": "Como estão a vesícula e o pâncreas?",
    "opcoes": [
      {
        "rotulo": "Não tenho doença biliar ou pancreática",
        "passageiro": { "nivel": "liberado", "leigo": "", "medico": "" },
        "tripulante": { "nivel": "liberado", "leigo": "", "medico": "" }
      },
      {
        "rotulo": "Tenho cálculo biliar sem sintomas",
        "passageiro": {
          "nivel": "cuidados",
          "leigo": "Converse com o médico sobre o cálculo antes de viajar.",
          "medico": "Confirmar ausência de sintomas, obstrução ou inflamação.",
          "topico": "10.5"
        },
        "tripulante": {
          "nivel": "avaliar",
          "leigo": "Se houver cálculo conhecido, informe ao examinador para avaliar o risco.",
          "medico": "FAA gallstones; EASA MED.B.020: decisão depende do quadro e da classe.",
          "topico": "10.5"
        }
      },
      {
        "rotulo": "Dor biliar ativa, pancreatite, febre ou icterícia com mal-estar",
        "passageiro": {
          "nivel": "nao-voar",
          "leigo": "Não viaje com crise ativa; procure avaliação.",
          "medico": "Investigar colecistite, obstrução ou pancreatite.",
          "topico": "10.5"
        },
        "tripulante": {
          "nivel": "nao-voar",
          "leigo": "Não assuma o voo antes de tratar e ser reavaliado.",
          "medico": "EASA MED.B.020: pancreatite ativa e litíase sintomática; RBAC 67.83/67.123.",
          "topico": "10.5"
        }
      }
    ]
  },
  {
    "id": "digestivo-cirurgia-abdominal",
    "pergunta": "Fez cirurgia abdominal recentemente?",
    "ajuda": "Esta pergunta se refere a cirurgia digestiva ou de seus anexos; não inclui colonoscopia isolada.",
    "opcoes": [
      {
        "rotulo": "Não fiz",
        "passageiro": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        },
        "tripulante": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        }
      },
      {
        "rotulo": "Fiz há menos de 10 dias",
        "passageiro": {
          "nivel": "nao-voar",
          "leigo": "Evite voar nos 10 dias após cirurgia abdominal e obtenha liberação do cirurgião.",
          "medico": "UK CAA passageiros: evitar viagem aérea por 10 dias; avaliar complicações e recuperação.",
          "topico": "10.6"
        },
        "tripulante": {
          "nivel": "nao-voar",
          "leigo": "Não assuma o voo; precisa de recuperação e avaliação aeromédica.",
          "medico": "RBAC 67.83/67.123; UK CAA pilotos: prazos dependem da cirurgia e são maiores.",
          "topico": "10.6"
        }
      },
      {
        "rotulo": "Fiz há 10 dias ou mais e estou recuperado",
        "passageiro": {
          "nivel": "avaliar",
          "leigo": "O prazo geral passou, mas peça confirmação do cirurgião: o tipo da operação pode exigir mais tempo.",
          "medico": "UK CAA: 10 dias é orientação geral ao passageiro, não autorização individual.",
          "topico": "10.6"
        },
        "tripulante": {
          "nivel": "avaliar",
          "leigo": "Só retorne após prazo correspondente à cirurgia e liberação aeromédica.",
          "medico": "UK CAA pilotos: laparoscopia diagnóstica 1 semana, maior 3–4 semanas, cirurgia maior 2–3 meses; avaliação.",
          "topico": "10.6"
        }
      },
      {
        "rotulo": "Fiz e ainda tenho dor, febre, vômitos ou sangramento",
        "passageiro": {
          "nivel": "nao-voar",
          "leigo": "Não embarque; pode haver complicação pós-operatória.",
          "medico": "Investigar infecção, sangramento, perfuração, obstrução ou deiscência.",
          "topico": "10.6"
        },
        "tripulante": {
          "nivel": "nao-voar",
          "leigo": "Não assuma função; avaliação cirúrgica e aeromédica.",
          "medico": "RBAC 67.83/67.123: sequelas cirúrgicas com risco de incapacitação.",
          "topico": "10.6"
        }
      }
    ]
  },
  {
    "id": "digestivo-colonoscopia",
    "pergunta": "Fez colonoscopia com gás introduzido no intestino?",
    "opcoes": [
      {
        "rotulo": "Não",
        "passageiro": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        },
        "tripulante": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        }
      },
      {
        "rotulo": "Sim, há menos de 24 horas",
        "passageiro": {
          "nivel": "nao-voar",
          "leigo": "Espere completar 24 horas e confirme que não houve complicações.",
          "medico": "UK CAA passageiros: colonoscopia com grande volume de gás, evitar voo por 24 h.",
          "topico": "10.6"
        },
        "tripulante": {
          "nivel": "avaliar",
          "leigo": "Informe o examinador; se houve biópsia ou polipectomia, o prazo britânico é maior.",
          "medico": "UK CAA pilotos: endoscopia baixa com biópsia/polipectomia, 48 h no mínimo.",
          "topico": "10.6"
        }
      },
      {
        "rotulo": "Sim, há 24 horas ou mais, sem complicação",
        "passageiro": {
          "nivel": "cuidados",
          "leigo": "Se estiver bem, sem dor ou sangramento, confirme as orientações do serviço.",
          "medico": "UK CAA passageiros: mínimo de 24 h com insuflação expressiva, sem complicações.",
          "topico": "10.6"
        },
        "tripulante": {
          "nivel": "avaliar",
          "leigo": "Confirme se houve biópsia/polipectomia e apresente a informação ao examinador.",
          "medico": "UK CAA pilotos: 48 h mínimas após biópsia/polipectomia.",
          "topico": "10.6"
        }
      }
    ]
  },
  {
    "id": "digestivo-laparoscopia",
    "pergunta": "Passou por laparoscopia?",
    "ajuda": "24 horas dizem respeito apenas ao gás residual no abdome, não à cicatrização de uma cirurgia maior.",
    "opcoes": [
      {
        "rotulo": "Não",
        "passageiro": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        },
        "tripulante": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        }
      },
      {
        "rotulo": "Faz menos de 24 horas",
        "passageiro": {
          "nivel": "nao-voar",
          "leigo": "Não embarque; o gás residual ainda pode expandir. Se houve cirurgia abdominal, aplica-se também a orientação dos 10 dias.",
          "medico": "UK CAA passageiros: cerca de 24 h para gás residual; cirurgia abdominal demanda pelo menos 10 dias e avaliação.",
          "topico": "10.6"
        },
        "tripulante": {
          "nivel": "nao-voar",
          "leigo": "Não opere; a recuperação e a decisão do examinador são obrigatórias.",
          "medico": "UK CAA pilotos: prazos maiores conforme procedimento.",
          "topico": "10.6"
        }
      },
      {
        "rotulo": "Já passaram 24 horas, fiz apenas exame diagnóstico",
        "passageiro": {
          "nivel": "avaliar",
          "leigo": "O gás residual costuma deixar de ser a principal preocupação; confirme recuperação e liberação.",
          "medico": "UK CAA passageiros: mínimo aproximado de 24 h pelo gás residual, com avaliação clínica.",
          "topico": "10.6"
        },
        "tripulante": {
          "nivel": "avaliar",
          "leigo": "Para laparoscopia diagnóstica, a referência britânica considera 1 semana, com recuperação e avaliação.",
          "medico": "UK CAA pilotos: 1 semana, sem liberação automática.",
          "topico": "10.6"
        }
      },
      {
        "rotulo": "Já passaram 24 horas, fiz cirurgia laparoscópica maior",
        "passageiro": {
          "nivel": "avaliar",
          "leigo": "24 horas não autorizam viajar depois de uma cirurgia maior; avalie cicatrização e a orientação de 10 dias.",
          "medico": "UK CAA passageiros: orientação geral de evitar 10 dias após cirurgia abdominal.",
          "topico": "10.6"
        },
        "tripulante": {
          "nivel": "avaliar",
          "leigo": "Na referência britânica, considerar 3 a 4 semanas após cirurgia laparoscópica maior, com avaliação.",
          "medico": "UK CAA pilotos: 3–4 semanas, recuperação completa.",
          "topico": "10.6"
        }
      }
    ]
  },
  {
    "id": "digestivo-endoscopia-piloto",
    "pergunta": "Se você é tripulante, fez endoscopia digestiva baixa com biópsia ou retirada de pólipo?",
    "ajuda": "Para passageiros, valem a avaliação e as recomendações do serviço; esta regra de 48 horas refere-se ao retorno do piloto.",
    "opcoes": [
      {
        "rotulo": "Não",
        "passageiro": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        },
        "tripulante": {
          "nivel": "liberado",
          "leigo": "",
          "medico": ""
        }
      },
      {
        "rotulo": "Sim, há menos de 48 horas",
        "passageiro": {
          "nivel": "avaliar",
          "leigo": "Consulte o médico que realizou o procedimento, especialmente se houver dor ou sangramento.",
          "medico": "Orientação clínica individual do procedimento.",
          "topico": "10.6"
        },
        "tripulante": {
          "nivel": "nao-voar",
          "leigo": "Não assuma o voo antes de 48 horas e informe o examinador.",
          "medico": "UK CAA pilotos: pelo menos 48 h depois de biópsia/polipectomia.",
          "topico": "10.6"
        }
      },
      {
        "rotulo": "Sim, há 48 horas ou mais, sem complicações",
        "passageiro": {
          "nivel": "cuidados",
          "leigo": "Confira a orientação após o procedimento e procure ajuda se houver sangramento.",
          "medico": "Avaliar a evolução pós-procedimento.",
          "topico": "10.6"
        },
        "tripulante": {
          "nivel": "avaliar",
          "leigo": "O prazo britânico passou, mas informe o examinador; não é liberação automática.",
          "medico": "UK CAA: pelo menos 48 h e informar AME.",
          "topico": "10.6"
        }
      }
    ]
  }
];
