// Missão 2 · Voo 11 — Sangue, câncer e infecções. Ramo editorial, mídias finais pendentes.
// 09/11/2026: padronizado (pedido do autor "Revise, padronize, corrija os erros"): texto em lista de parágrafos, células
// sem ponto final, títulos de tabela com o tema curto, colunas no padrão e remissões com o ponto fora dos parênteses.
// REGISTRO DE REVISÃO · 06/11/2026. Normas e fontes primárias conferidas:
// ANAC RBAC 67 Emenda 05, 67.87 e 67.127 (hematologia e anticoagulação cumarínica).
// https://www.anac.gov.br/assuntos/legislacao/legislacao-1/rbha-e-rbac/rbac/rbac-67/@@display-file/arquivo_norma/RBAC67EMD05.pdf
// ANAC: Emenda 05 vigente na listagem oficial consultada em 06/11/2026.
// FAA AME Guide, atualização 28/10/2026; Item 48 Blood, Neoplasms and HIV.
// https://www.faa.gov/ame_guide/app_process/exam_tech/item48/amd/blood
// https://www.faa.gov/ame_guide/app_process/exam_tech/item48/amd/hiv
// https://www.faa.gov/ame_guide/app_process/exam_tech/item48/amd/neoplasms
// EASA Part-MED MED.B.030 Hematology, anemia e leucemia, regras europeias NÃO substituem RBAC 67.
// https://www.easa.europa.eu/en/node/134314?page=54
// CDC Yellow Book 2026: Air Travel; Travelers with Chronic Illnesses (anemia <8,5 g/dL;
// crise falciforme prévia em 9 dias); Immunocompromised Travelers; Travelers with HIV.
// https://www.cdc.gov/yellow-book/hcp/travel-air-sea/air-travel.html
// https://www.cdc.gov/yellow-book/hcp/travelers-with-additional-considerations/travelers-with-chronic-illnesses.html
// https://www.cdc.gov/yellow-book/hcp/travelers-with-additional-considerations/immunocompromised-travelers.html
// https://www.cdc.gov/yellow-book/hcp/travelers-with-additional-considerations/travelers-with-hiv.html
// Padrão: docs/modelo-sistemas.md; prosa progressiva sem cabeçalhos artificiais.
// Números citados do CDC referem-se ao passageiro, não a critério de CMA.
// Fotos e vídeo serão acrescentados após produção unitária, sem placeholders.
import type { Capitulo } from '../tipos';
import { liberacaoSangue } from '../liberacao/sangue-imunidade';

export const sangueImunidade: Capitulo = {
  ...{
  numero: 11,
  titulo: "Sangue, câncer e infecções",
  tempoLeituraMin: 29,
  topicos: [
    {
      id: "11.1",
      titulo: "Sangue e defesa do organismo na altitude",
      pergunta: "Como a cabine altera o trabalho do sangue e a resposta às infecções?",
      conteudo: {
        texto: [
          "O **sangue** leva oxigênio, distribui nutrientes, transporta células de defesa e participa da coagulação. As **hemácias**, por meio da hemoglobina, carregam grande parte do oxigênio; os leucócitos reconhecem agentes infecciosos e as plaquetas ajudam a conter sangramentos. Esses mecanismos dependem do coração, dos pulmões, da medula óssea e da integridade dos vasos. Conhecer essa cadeia evita confundir pressão baixa de oxigênio com falta de hemoglobina.",
          "Em cabine comercial pressurizada, a pressão parcial de oxigênio costuma ser menor que ao nível do mar, embora a fração de oxigênio do ar permaneça praticamente a mesma. A pessoa saudável compensa essa redução. Na **anemia**, há menos capacidade de transporte; na doença falciforme, a oxigenação reduzida pode contribuir para complicações; na insuficiência cardiopulmonar associada, a reserva diminui ainda mais. A pressão da cabine não causa, por si só, câncer ou HIV (Veja M1V1 - II e M2V1).",
          "**Para o passageiro**, estabilidade clínica, saturação, hemograma e limitações funcionais orientam a avaliação individual; receber alta ou ter diagnóstico controlado não equivale necessariamente a estar apto para viagem longa. **Para o tripulante**, além de tolerar a cabine, é necessário manter atenção, resistência e segurança operacional. A ANAC considera anemia, doenças hematológicas, coagulação e risco de incapacitação nas regras do certificado médico, com distinção entre classes.",
          "Uma alteração hematológica importante pode provocar **cansaço intenso, palpitações, tontura, falta de ar ou desmaio**. Sangramento, trombose ou infecção aguda podem surgir ou se agravar longe do atendimento. O voo prolongado também favorece estase venosa pela imobilidade, em especial após cirurgia, em atividade neoplásica e com trombose prévia. Essa vulnerabilidade decorre do estado de coagulação e do fluxo sanguíneo, não do simples fato de estar dentro de um avião (Veja M2V2).",
          "Exames úteis incluem hemograma, plaquetas e estudos de coagulação quando indicados, sempre interpretados com sintomas, tratamento e evolução. **Anticoagulantes** reduzem eventos trombóticos em situações específicas, mas exigem avaliação do risco hemorrágico e das interações; jamais devem ser interrompidos apenas para viajar. A quimioterapia, a imunossupressão e alguns antivirais também exigem atenção a efeitos adversos e à continuidade do esquema prescrito.",
          "**Como prevenir e amenizar.** Planeje a viagem quando a condição estiver estável; leve relatório clínico, lista de medicamentos e reserva para atrasos. Em voos prolongados, movimente pernas e caminhe quando for seguro, respeitando restrições médicas. Evite embarcar com sangramento, desmaios, febre importante ou dispneia não investigada. O médico deve registrar a capacidade funcional, a possibilidade de assistência e, quando necessário, a solicitação de suporte à companhia aérea.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m2v11-1-sangue-altitude.jpg'), legenda: "A hemoglobina leva o oxigênio; com menos dela, sobra menos margem na cabine." } },
          { paragrafo: 4, video: { fonte: require('@/assets/videos/m2v11-sangue-voo.mp4'), legenda: "Do laboratório à cabine: o exame mostra a reserva que o voo vai exigir." } },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m2v11-1-planejamento-voo.jpg'), legenda: "Planejar a viagem com o médico considera a doença, o tratamento e o destino." } },
          {
            paragrafo: 1,
            midia: "sangue-cabine"
          },
          {
            paragrafo: 1,
            midia: "animacao-hemoglobina"
          },
          {
            paragrafo: 2,
            tabela: {
              titulo: "O que muda em altitude",
              colunas: [
                "Fator do voo",
                "O que acontece no sangue e na defesa",
                "Quem é mais vulnerável"
              ],
              linhas: [
                [
                  "Menor pressão parcial de oxigênio",
                  "A hemoglobina disponível recebe menos oxigênio, reduzindo a margem de segurança em anemia ou doença cardiopulmonar",
                  "Anemia importante: menor massa de hemoglobina para transportar O₂; doença falciforme: desoxigenação pode favorecer crise"
                ],
                [
                  "Imobilidade prolongada",
                  "Contração muscular menor reduz o retorno venoso, favorecendo estase",
                  "Câncer ativo, trombose anterior ou cirurgia recente: maior tendência trombótica somada à estase"
                ],
                [
                  "Ar seco e menor ingestão",
                  "Pode contribuir para perdas de água e desconforto; a hidratação insuficiente dificulta o equilíbrio circulatório",
                  "Pessoas com febre, diarreia ou vômitos: perdas adicionais de água comprometem o volume sanguíneo"
                ],
                [
                  "Convivência próxima",
                  "Exposição a pessoas sintomáticas pode transmitir infecções respiratórias",
                  "Imunossupressão: defesa reduzida pelo tratamento ou pela doença de base"
                ]
              ]
            }
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · sangue e defesa",
              colunas: [
                "Momento ou situação",
                "O que fazer"
              ],
              linhas: [
                [
                  "Antes da passagem",
                  "Verificar estabilidade, hemograma e medicamentos conforme indicação; planejar atendimento no destino"
                ],
                [
                  "Antes de embarcar",
                  "Adiamento e avaliação diante de dispneia nova, sangramento, febre ou fraqueza incapacitante"
                ],
                [
                  "Durante o voo",
                  "Hidratação conforme orientação, movimentos regulares e medicamentos na bagagem de mão"
                ],
                [
                  "Tripulante",
                  "Comunicar mudança clínica ao examinador e não exercer função quando houver risco de incapacitação"
                ]
              ]
            }
          }
        ]
      }
    },
    {
      id: "11.2",
      titulo: "Anemia, hemoglobinopatias e anticoagulação",
      pergunta: "Quando a hemoglobina, o sangramento ou o risco de trombose impedem o voo?",
      conteudo: {
        texto: [
          "A **anemia** é uma redução da capacidade de transporte de oxigênio, frequentemente relacionada a hemoglobina baixa por perda de sangue, deficiência de ferro, inflamação, doença renal ou alteração medular. Fraqueza, palidez, taquicardia e falta de ar refletem o esforço para levar oxigênio aos tecidos. O número no hemograma precisa ser lido junto da velocidade de instalação e da resposta do organismo: uma perda aguda não se comporta como uma anemia crônica estável.",
          "Na cabine, a **menor pressão parcial de oxigênio** soma-se à redução do conteúdo de oxigênio do sangue. O CDC orienta, para passageiros, adiar a viagem com hemoglobina **abaixo de 8,5 g/dL**, salvo situações crônicas estáveis avaliadas individualmente; sangramento agudo não controlado exige adiamento. A **doença falciforme** pode complicar-se com dor vaso-oclusiva e problemas pulmonares, enquanto o simples traço falciforme não tem o mesmo significado clínico.",
          "**O passageiro** precisa de controle da causa da anemia, avaliação de sintomas e do eventual suporte de oxigênio. Pessoas com crise falciforme recente devem ser avaliadas antes do deslocamento; o CDC considera prudente adiar viagens quando houve crise nos **nove dias anteriores**. **O tripulante** segue requisitos próprios: no Brasil, o RBAC 67, itens 67.87 e 67.127, condiciona aptidão hematológica à avaliação e determina inaptidão diante de hipercoagulabilidade, distúrbio hemorrágico ou anticoagulação oral cumarínica.",
          "Quem voa com anemia sintomática pode apresentar **dispneia, pré-síncope e incapacidade funcional**. Uma hemorragia ativa pode descompensar rapidamente; uma trombose venosa pode embolizar para o pulmão, produzindo dor torácica e queda da oxigenação. A presença de plaquetas muito baixas, sangramentos espontâneos ou um evento trombótico recente muda a decisão. Critérios para passageiros, pilotos brasileiros e pilotos de outras jurisdições **não devem ser tratados como intercambiáveis**.",
          "**Anticoagulantes** como antagonistas da vitamina K, heparinas e anticoagulantes orais diretos são prescritos para prevenir ou tratar trombose em indicações distintas. A suspensão indevida pode precipitar evento tromboembólico; o uso sem acompanhamento favorece hemorragia. Para anticoagulação cumarínica, a regra brasileira citada determina inaptidão do candidato nas classes correspondentes; orientações estrangeiras podem adotar avaliações diferentes. Não extrapole permissões de outro país para o CMA brasileiro.",
          "**Como prevenir e amenizar.** Trate a causa da anemia e confirme estabilidade antes da viagem. Leve exames relevantes, informações sobre crises anteriores, contato médico e prescrição. Informe qualquer sangramento, dor torácica, dispneia ou edema assimétrico de perna. Em viagens longas, organize movimento e medidas preventivas individualizadas; **não ajuste anticoagulante por conta própria**. O médico deve documentar risco de sangramento, trombose, capacidade funcional e necessidade de suporte.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v11-2-hemograma.jpg'), legenda: "O hemograma recente mostra se a anemia permite voar com segurança." } },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v11-2-anticoagulacao.jpg'), legenda: "O anticoagulante segue no horário, ajustado ao fuso com o médico." } },
          {
            paragrafo: 1,
            midia: "anemia-voo"
          },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Liberação para voo · anemia e anticoagulação",
              colunas: [
                "Situação",
                "Passageiro",
                "Tripulante"
              ],
              linhas: [
                [
                  "Anemia crônica compensada, sem sintomas incapacitantes",
                  "Pode viajar após avaliação clínica e planejamento apropriado",
                  "RBAC 67.87/67.127: análise da causa, hemograma e risco funcional; não há liberação automática"
                ],
                [
                  "Hemoglobina abaixo de 8,5 g/dL",
                  "CDC: geralmente adiar, exceto crônica estável avaliada individualmente",
                  "Esse valor é recomendação para passageiro, não parâmetro de certificação de piloto"
                ],
                [
                  "Sangramento agudo ou anemia sintomática intensa",
                  "Não embarcar; estabilização e atendimento médico",
                  "Não exercer função até investigação e regularização da aptidão"
                ],
                [
                  "Anticoagulação oral cumarínica",
                  "Não suspender por conta própria; avaliar indicação, estabilidade e riscos",
                  "RBAC 67.87(c)/67.127(c): o candidato é julgado não apto sob essa condição"
                ]
              ]
            }
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Remédios e voo · anemia e anticoagulação",
              colunas: [
                "Remédio ou classe",
                "Efeito que importa no voo",
                "Tripulante (FAA/ANAC)"
              ],
              linhas: [
                [
                  "Ferro, B12 e folato",
                  "Reposição conforme diagnóstico; o efeito depende da causa da anemia",
                  "Registrar doença, resposta e efeitos adversos; reposição não prova aptidão imediata"
                ],
                [
                  "Anticoagulante cumarínico",
                  "Exige monitorização e atenção a interações e hemorragia",
                  "RBAC 67: condição de inaptidão para candidato nas classes referidas"
                ],
                [
                  "Anticoagulante oral direto ou heparina",
                  "Risco de sangramento e de trombose se interrompido; requer indicação e seguimento",
                  "Avaliação individual da doença e do fármaco; não presumir autorização"
                ],
                [
                  "Analgésicos e anti-inflamatórios",
                  "Alguns aumentam o risco hemorrágico quando combinados a anticoagulantes",
                  "Conferir interações e efeitos na vigilância e no desempenho"
                ]
              ]
            }
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · anemia e anticoagulação",
              colunas: [
                "Momento ou situação",
                "O que fazer"
              ],
              linhas: [
                [
                  "Anemia estável",
                  "Planejar hemograma e avaliação do motivo, não apenas observar a cor da pele"
                ],
                [
                  "Sangramento ou falta de ar recente",
                  "Adiar deslocamento e procurar avaliação urgente conforme gravidade"
                ],
                [
                  "Crise falciforme recente",
                  "Avaliar recuperação clínica e complicações antes de embarcar"
                ],
                [
                  "Anticoagulação",
                  "Manter prescrição, levar lista de remédios e não suspender para obter autorização de voo"
                ]
              ]
            }
          }
        ]
      }
    },
    {
      id: "11.3",
      titulo: "Câncer, quimioterapia e viagem aérea",
      pergunta: "Quando o tratamento oncológico exige adiar a viagem ou a operação?",
      conteudo: {
        texto: [
          "**Câncer** reúne doenças de crescimento celular desregulado, com consequências muito distintas conforme órgão, estágio e tratamento. Um paciente em seguimento após tratamento curativo não apresenta o mesmo risco de alguém com neoplasia ativa e complicações. O voo não transforma uma lesão estável em metástase; as preocupações reais incluem anemia, dor, perda funcional, infecção, sangramento, trombose, alterações pulmonares e efeitos de cirurgia ou quimioterapia.",
          "Na cabine, a redução do oxigênio disponível pode acentuar sintomas de **anemia ou comprometimento pulmonar**. O câncer ativo e certos tratamentos podem aumentar a tendência trombótica, enquanto trombocitopenia favorece sangramento. A imobilidade e a desidratação potencializam vulnerabilidades já existentes. Se o tumor obstrui vias aéreas, compromete a respiração ou afeta o sistema nervoso, é a **reserva funcional** — e não o diagnóstico isolado — que determina o risco imediato (Veja M2V1 e M2V2).",
          "**Para o passageiro**, a decisão considera hemograma, infecção, atividade da doença, tratamento recente, necessidade de suporte e acesso a atendimento no destino. O CDC recomenda adiar viagem diante de sangramento importante ou imunossupressão, anemia ou trombocitopenia graves. **Para o tripulante**, doença ativa, terapias incapacitantes e possíveis efeitos cognitivos precisam de investigação e avaliação aeromédica; as normas da autoridade competente e o tipo de neoplasia determinam o caminho de certificação.",
          "Viajar sem avaliação durante **neutropenia febril**, sangramento, vômitos persistentes ou dor incapacitante pode resultar em emergência a bordo e atraso no tratamento. Febre em paciente sob quimioterapia exige avaliação médica rápida: pode ser o único sinal de infecção grave. Uma trombose ou embolia pulmonar pode causar falta de ar súbita, e intervenções cirúrgicas recentes exigem consideração especial. Alta hospitalar, ausência de dor e aparência saudável não substituem a análise do risco.",
          "**Quimioterápicos, terapias-alvo, imunoterapia, corticoides e medicamentos de suporte** têm perfis diferentes de toxicidade e interação. Náusea, fadiga, neuropatia, diarreia e sonolência podem reduzir a segurança de deslocamento ou de operação. A vacinação durante imunossupressão exige avaliação específica, e vacinas vivas podem ser contraindicadas. Nunca reorganize ciclos de quimioterapia, suspenda anticoagulação profilática nem inicie medicamento preventivo sem concordância do oncologista.",
          "**Como prevenir e amenizar.** Planeje a viagem com o oncologista e leve relatório, hemograma recente quando indicado e informações sobre complicações e medicações. Avalie risco de trombose e suporte antes de voos prolongados; mantenha máscara e higiene quando houver indicação de proteção contra infecções. Adie na presença de febre, sangramento, dispneia nova ou incapacidade para se alimentar e hidratar. O profissional deve verificar também assistência no destino, seguros e eventual necessidade de MEDIF.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v11-3-oncologia.jpg'), legenda: "Com o tratamento estável, a viagem é decidida junto com o oncologista." } },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v11-3-acompanhamento.jpg'), legenda: "A equipe planeja o roteiro e o apoio médico no destino." } },
          {
            paragrafo: 1,
            midia: "cancer-voo"
          },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Liberação para voo · câncer e quimioterapia",
              colunas: [
                "Situação",
                "Passageiro",
                "Tripulante"
              ],
              linhas: [
                [
                  "Tratamento concluído e paciente clinicamente estável",
                  "Considerar viagem conforme capacidade funcional e avaliações de seguimento",
                  "Certificação depende de neoplasia, tratamento, sequelas e norma aplicável; sem automaticidade"
                ],
                [
                  "Quimioterapia com imunossupressão importante",
                  "Reavaliar; o CDC recomenda adiar se comprometimento grave",
                  "Afastar-se da função quando tratamento ou doença afetar segurança"
                ],
                [
                  "Febre durante quimioterapia ou sangramento relevante",
                  "Não embarcar; avaliação urgente",
                  "Não operar; avaliação médica e aeromédica antes de retorno"
                ],
                [
                  "Câncer com trombose ou dispneia recente",
                  "Investigar e estabilizar antes de viagem",
                  "Avaliar doença, anticoagulante e risco de incapacitação"
                ]
              ]
            }
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Remédios e voo · câncer e quimioterapia",
              colunas: [
                "Remédio ou classe",
                "Efeito que importa no voo",
                "Tripulante (FAA/ANAC)"
              ],
              linhas: [
                [
                  "Quimioterapia citotóxica",
                  "Pode produzir anemia, neutropenia, náusea e neuropatia",
                  "Necessária avaliação de efeitos e da função; nunca presumir aptidão em tratamento ativo"
                ],
                [
                  "Imunoterapia e terapia-alvo",
                  "Efeitos são específicos; podem incluir inflamação de órgãos ou fadiga",
                  "Analisar eventos adversos e estabilidade com especialista e examinador"
                ],
                [
                  "Antieméticos e analgésicos",
                  "Alguns causam sonolência e afetam atenção ou reflexos",
                  "Avaliar restrições operacionais e efeitos residuais"
                ],
                [
                  "Corticoides e profilaxias",
                  "Podem alterar imunidade, glicemia e interações medicamentosas",
                  "Exige avaliação do regime e doença de base"
                ]
              ]
            }
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · câncer e quimioterapia",
              colunas: [
                "Momento ou situação",
                "O que fazer"
              ],
              linhas: [
                [
                  "Planejamento",
                  "Agendar viagem conforme avaliação oncológica e exames, sem comprometer tratamento"
                ],
                [
                  "Durante imunossupressão",
                  "Reduzir exposição a pessoas doentes; adiar se houver febre ou infecção ativa"
                ],
                [
                  "Risco de trombose",
                  "Discutir prevenção individual; manter terapia prescrita"
                ],
                [
                  "Viagem internacional",
                  "Levar documentos, contato do serviço de saúde e informação sobre cobertura assistencial"
                ]
              ]
            }
          }
        ]
      }
    },
    {
      id: "11.4",
      titulo: "Infecções transmissíveis e voo seguro",
      pergunta: "Quando uma infecção coloca o viajante e os outros passageiros em risco?",
      conteudo: {
        texto: [
          "**Doenças transmissíveis** podem alcançar outras pessoas por partículas respiratórias, contato, sangue, alimentos ou vetores, conforme o agente. A simples presença de uma infecção não implica contagiosidade pelo ar. No transporte aéreo, a convivência próxima e o tempo de exposição importam, mas o risco depende da via de transmissão, da fase da doença e das medidas de controle. Separar essas situações protege passageiros sem estigmatizar quem vive com uma condição crônica.",
          "A cabine tem ventilação e sistemas de filtragem que ajudam a diluir partículas, porém **não eliminam todas as exposições**, principalmente quando alguém sintomático está próximo. Febre, tosse intensa, dispneia e desidratação também comprometem a própria saúde em viagem. Pessoas com imunossupressão, doença pulmonar ou idade avançada podem sofrer evolução mais grave porque têm menor reserva ou defesa. Medidas contra contaminação respiratória não substituem precauções para doenças de transmissão por sangue, alimentos ou vetores.",
          "**O passageiro** com doença aguda transmissível deve consultar recomendações sanitárias e adiar a viagem quando houver risco relevante de transmissão ou incapacidade clínica. Não existe um prazo único aplicável a influenza, COVID-19, tuberculose, meningite ou outras infecções. **O tripulante** não deve exercer atividade com febre incapacitante, sintomas que afetem atenção ou doença que comprometa desempenho; retorno exige estabilidade e cumprimento das regras sanitárias e aeromédicas aplicáveis.",
          "Voar com **falta de ar, hipoxemia, prostração intensa ou febre persistente** pode agravar a condição e dificultar atendimento oportuno. Pessoas contagiosas podem gerar transmissão a bordo ou no destino, mesmo sem contato prolongado com todos os ocupantes. Tuberculose pulmonar infecciosa, infecção respiratória grave ou suspeita de doença de notificação exigem coordenação com serviços de saúde; o viajante não deve usar a ausência de sintomas de outras pessoas como prova de segurança.",
          "**Antibióticos, antivirais e antitérmicos** tratam indicações específicas; nenhum medicamento é autorização automática para embarcar. O efeito da infecção, a interação entre fármacos e as reações adversas precisam ser avaliados, especialmente para quem opera aeronaves. Máscaras adequadas, higiene das mãos, etiqueta respiratória e ventilação são medidas complementares quando indicadas. A prescrição não deve ser iniciada ou interrompida para simplesmente esconder febre e superar uma triagem.",
          "**Como prevenir e amenizar.** Antes do voo, verifique sintomas, orientações locais e recomendações de saúde pública para o destino. Adie se estiver contagioso conforme a doença, com dispneia ou clinicamente instável. Se surgirem sintomas durante a viagem, avise a tripulação e siga os procedimentos de segurança. Após o pouso, procure avaliação quando houver sinais de gravidade. Planejamento, vacinação adequada e respeito à privacidade reduzem riscos sem discriminação.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v11-4-prevencao.jpg'), legenda: "Ventilação e máscara reduzem o risco; quem está com febre deve adiar o voo." } },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v11-4-avaliacao.jpg'), legenda: "Febre ou sintomas respiratórios pedem avaliação antes do embarque." } },
          {
            paragrafo: 1,
            midia: "infeccao-voo"
          },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Liberação para voo · infecções",
              colunas: [
                "Situação",
                "Passageiro",
                "Tripulante"
              ],
              linhas: [
                [
                  "Infecção resolvida, pessoa recuperada",
                  "Considerar viagem conforme recuperação e regras específicas do agente",
                  "Retorno à função exige capacidade plena e avaliação quando indicada"
                ],
                [
                  "Infecção respiratória contagiosa ativa",
                  "Adiar conforme recomendações sanitárias e avaliação clínica",
                  "Não exercer função enquanto houver risco operacional ou transmissão relevante"
                ],
                [
                  "Febre alta, falta de ar ou prostração",
                  "Não embarcar; procurar avaliação médica",
                  "Não operar; verificar aptidão e risco de incapacitação"
                ],
                [
                  "Suspeita de doença sujeita a medidas sanitárias",
                  "Consultar serviço de saúde e exigências da rota",
                  "Aplicar protocolos sanitários e ocupacionais pertinentes"
                ]
              ]
            }
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Remédios e voo · infecções",
              colunas: [
                "Remédio ou classe",
                "Efeito que importa no voo",
                "Tripulante (FAA/ANAC)"
              ],
              linhas: [
                [
                  "Antibiótico prescrito",
                  "Indicação específica; atenção a reações adversas e alergias",
                  "Verificar infecção de base e efeitos do medicamento antes de trabalhar"
                ],
                [
                  "Antiviral",
                  "Dose, duração e interações dependem do agente",
                  "Não constitui liberação automática para operar"
                ],
                [
                  "Antitérmico",
                  "Pode aliviar sintomas, mas não elimina contagiosidade nem gravidade",
                  "Não usar para mascarar febre e seguir trabalhando"
                ]
              ]
            }
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · infecções",
              colunas: [
                "Momento ou situação",
                "O que fazer"
              ],
              linhas: [
                [
                  "Antes da viagem",
                  "Revisar sinais de transmissão e a orientação sanitária do agente"
                ],
                [
                  "Sintomas respiratórios",
                  "Se houver risco de transmissão, adiar; usar medidas de proteção em situações indicadas"
                ],
                [
                  "Piora clínica",
                  "Buscar atendimento, especialmente diante de dispneia ou desidratação"
                ],
                [
                  "Tripulação",
                  "Cumprir afastamento, comunicação e avaliação de retorno à atividade"
                ]
              ]
            }
          }
        ]
      }
    },
    {
      id: "11.5",
      titulo: "HIV, imunidade e planejamento do voo",
      pergunta: "O que importa para viajar com HIV de maneira segura e sem discriminação?",
      conteudo: {
        texto: [
          "O **HIV** compromete células do sistema imune ao longo do tempo quando não controlado, mas o tratamento antirretroviral permite que muitas pessoas mantenham vida ativa e saúde estável. O HIV **não é transmitido por respirar o ar da cabine, compartilhar assentos ou conversar**. Risco de infecção e aptidão clínica não devem ser confundidos com estigma. A avaliação de viagem considera supressão viral, condição imunológica, doenças associadas, medicações e acesso a cuidado no itinerário.",
          "Uma pessoa com **HIV bem controlado**, em tratamento e acompanhamento, geralmente pode viajar como passageira. O CDC alerta que imunossupressão avançada e carga viral não controlada aumentam risco de infecções oportunistas, sobretudo em destinos com maior exposição. A pressão de cabine não modifica por si só a via de transmissão do vírus. A presença de anemia, infecção pulmonar ou outra doença concomitante pode reduzir a tolerância ao oxigênio da cabine, devendo ser avaliada separadamente.",
          "**Para o passageiro**, a decisão deve ser individual e baseada na estabilidade clínica, não apenas na sorologia. Quem apresenta infecção oportunista ativa ou imunossupressão importante pode precisar adiar o deslocamento. **Para o tripulante**, é indispensável seguir as regras de certificação aplicáveis: a FAA exige avaliação central para histórico de HIV, sem decisão automática pelo examinador; no Brasil, o enquadramento depende da investigação clínica e das regras vigentes de aptidão, com proteção das informações médicas.",
          "Interromper a **terapia antirretroviral** pode favorecer perda de controle virológico e risco de resistência. Uma viagem sem acesso a medicamentos, com fuso horário mal planejado ou sem cuidado no destino pode dificultar a continuidade. Em quem apresenta imunodeficiência avançada, infecções comuns podem evoluir de modo mais grave; febre e sintomas respiratórios exigem atenção. A presença de HIV isoladamente não significa risco infeccioso para os demais passageiros durante o convívio cotidiano.",
          "**Antirretrovirais** devem ser mantidos conforme prescrição, com atenção a interações com antibióticos, profilaxias, medicamentos contra malária e outros produtos de viagem. Vacinas inativadas costumam ser utilizáveis, enquanto algumas vacinas vivas dependem do grau de imunossupressão e podem ser contraindicadas. Levar medicamentos em embalagem identificada e documentação apropriada facilita fiscalização sem exigir exposição pública desnecessária do diagnóstico. Restrições legais de entrada variam entre países e devem ser verificadas antes da reserva.",
          "**Como prevenir e amenizar.** Organize o horário das doses para atravessar fusos sem interrupções, leve reserva para atrasos e localize atendimento médico no destino. Revise vacinação e profilaxia com infectologista ou medicina de viagem. Se houver doença oportunista, febre importante ou descompensação, avalie o adiamento. Para o tripulante, atualize documentos e informe ao examinador de modo confidencial; a decisão deve se apoiar na capacidade funcional e nos critérios aeromédicos vigentes.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v11-5-infectologia.jpg'), legenda: "A consulta é confidencial: o HIV controlado não impede a viagem." } },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v11-5-medicamentos.jpg'), legenda: "Os remédios vão na bagagem de mão, em quantidade para atrasos." } },
          {
            paragrafo: 1,
            midia: "hiv-viagem"
          },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Liberação para voo · HIV",
              colunas: [
                "Situação",
                "Passageiro",
                "Tripulante"
              ],
              linhas: [
                [
                  "HIV controlado e sem intercorrências",
                  "Em geral pode viajar, com medicação e acompanhamento regulares",
                  "Aptidão exige avaliação da autoridade; na FAA, histórico de HIV é encaminhado para decisão"
                ],
                [
                  "Imunossupressão avançada ou infecção oportunista",
                  "CDC: preferir adiar até estabilizar e recuperar imunidade quando possível",
                  "Não exercer função se houver risco clínico, infeccioso ou de incapacitação"
                ],
                [
                  "Medicação sem fornecimento no destino",
                  "Replanejar antes da partida; interrupção deve ser evitada",
                  "Comprovar tratamento estável e ausência de efeitos incapacitantes"
                ]
              ]
            }
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Remédios e voo · HIV",
              colunas: [
                "Remédio ou classe",
                "Efeito que importa no voo",
                "Tripulante (FAA/ANAC)"
              ],
              linhas: [
                [
                  "Antirretrovirais",
                  "Manter esquema contínuo; verificar fuso e interações",
                  "Revisar estabilidade e efeitos sem expor diagnóstico desnecessariamente"
                ],
                [
                  "Profilaxias e tratamentos de infecções",
                  "Dependem da imunidade e do destino; interações são relevantes",
                  "Verificar capacidade funcional e eventuais efeitos adversos"
                ],
                [
                  "Vacinas vivas",
                  "Podem ser contraindicadas na imunossupressão avançada",
                  "Parecer especializado; não são critério único de aptidão"
                ]
              ]
            }
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · HIV",
              colunas: [
                "Momento ou situação",
                "O que fazer"
              ],
              linhas: [
                [
                  "Antes de viajar",
                  "Revisar carga viral, condição clínica, imunizações e medicamentos com a equipe assistente"
                ],
                [
                  "Medicamentos",
                  "Transportar na bagagem de mão com reserva e documentação preservando privacidade"
                ],
                [
                  "Destino",
                  "Verificar regras de entrada e possibilidade de atendimento/continuidade da terapia"
                ],
                [
                  "Tripulante",
                  "Solicitar avaliação aeromédica confidencial e seguir decisão da autoridade"
                ]
              ]
            }
          }
        ]
      }
    },
    {
      id: "11.6",
      titulo: "Vacinação e proteção do viajante",
      pergunta: "Como escolher vacinas considerando destino, imunidade e atividade aérea?",
      conteudo: {
        texto: [
          "A **vacinação** prepara a resposta imune contra agentes específicos e reduz a probabilidade de doença ou complicações. Ela é parte da proteção coletiva, mas não substitui cuidados com água, alimentos, vetores, ventilação e higiene. O esquema depende de idade, histórico vacinal, destino, tipo de viagem e condições clínicas. Vacinas de rotina, vacinas indicadas por risco e imunizações exigidas para entrada em determinados países cumprem papéis diferentes e não devem ser confundidas.",
          "O ambiente de cabine não torna uma vacina ineficaz por si só. O que muda a resposta é principalmente a condição imunológica: **quimioterapia, imunossupressores, transplante e HIV avançado** podem reduzir proteção ou contraindicar imunizantes vivos. Uma pessoa sem baço tem risco aumentado de infecções por bactérias encapsuladas porque perdeu parte essencial de sua defesa. O planejamento deve contemplar também o risco no destino, não apenas o voo, e pode requerer parecer especializado antes de imunizações (Veja M1V5).",
          "**Para o passageiro**, recomenda-se atualizar vacinas de rotina e avaliar exigências do destino com antecedência, especialmente quando houver imunossupressão. O CDC sugere administrar vacinas inativadas preferencialmente antes do início de imunossupressão quando possível; vacinas vivas requerem precauções e podem ser contraindicadas. **Para o tripulante**, a vacinação deve se integrar ao programa de saúde ocupacional; a reação à vacina, a condição de base e os efeitos de medicamentos precisam ser compatíveis com a segurança operacional.",
          "Viajar sem proteção necessária pode aumentar risco de **infecção evitável e transmissão no destino**, particularmente em pessoas vulneráveis. Por outro lado, administrar vacina viva durante imunossupressão grave pode causar evento adverso importante; deixar de verificar contraindicações é igualmente arriscado. Febre e mal-estar pós-vacinação podem reduzir capacidade operacional temporária, mas não indicam automaticamente infecção transmissível. Certificados internacionais, quando exigidos, precisam obedecer às regras sanitárias vigentes do país de entrada.",
          "**Imunizantes inativados e recombinantes** não contêm agentes capazes de se replicar e, em geral, são preferidos para imunossuprimidos, embora a resposta possa ser menor. **Vacinas vivas atenuadas** exigem avaliação cuidadosa do estado imune. Fármacos imunossupressores podem interferir na resposta e na segurança da vacinação; não se devem interromper tratamentos apenas para receber uma dose. Vacina de febre amarela, quando pertinente à rota, deve ser discutida com especialista em presença de contraindicação, inclusive possibilidades de ajuste de itinerário.",
          "**Como prevenir e amenizar.** Faça revisão da carteira de vacinação antes de comprar viagens complexas; confira recomendações do destino, restrições médicas e documentos exigidos. Discuta com infectologista, oncologista ou equipe assistente quando houver imunossupressão, HIV ou doença hematológica. Guarde comprovantes sem expor dados clínicos além do necessário. Em caso de reação sistêmica importante ou condição descompensada, adie a função aérea ou a viagem até avaliação. O objetivo é proteger o viajante sem criar falsas garantias.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v11-6-vacinacao.jpg'), legenda: "A vacina é planejada semanas antes da viagem." } },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v11-6-carteira.jpg'), legenda: "A carteira de vacinação confere o que o destino exige." } },
          {
            paragrafo: 1,
            midia: "vacinas-voo"
          },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Liberação para voo · vacinação",
              colunas: [
                "Situação",
                "Passageiro",
                "Tripulante"
              ],
              linhas: [
                [
                  "Esquema adequado e pessoa sem sintomas",
                  "Considerar viagem conforme recomendações de destino e condição clínica",
                  "Avaliação da reação e da condição de base quando necessário"
                ],
                [
                  "Vacina viva em imunossupressão importante",
                  "Avaliar contraindicação e alternativa de itinerário com especialista",
                  "Não exercer função com quadro clínico incapacitante; imunização requer parecer específico"
                ],
                [
                  "Febre importante após vacinação",
                  "Avaliar causa e estabilizar antes de embarcar",
                  "Não operar até recuperação e avaliação quando pertinente"
                ],
                [
                  "Vacina exigida pelo destino não disponível ou contraindicada",
                  "Verificar regras de entrada, documentos, possível isenção e alternativas",
                  "Seguir exigências sanitárias e ocupacionais; não omitir contraindicação"
                ]
              ]
            }
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Remédios e voo · vacinação",
              colunas: [
                "Remédio ou classe",
                "Efeito que importa no voo",
                "Tripulante (FAA/ANAC)"
              ],
              linhas: [
                [
                  "Vacinas inativadas/recombinantes",
                  "Geralmente podem ser utilizadas em imunossuprimidos, com resposta possivelmente menor",
                  "Avaliar sintomas, efeitos e atividade programada"
                ],
                [
                  "Vacinas vivas atenuadas",
                  "Podem ser contraindicadas em imunossupressão grave",
                  "Requer parecer especializado; evitar decisão genérica"
                ],
                [
                  "Imunossupressores",
                  "Podem alterar segurança e resposta às vacinas",
                  "Não suspender prescrição sem equipe assistente"
                ],
                [
                  "Medicamentos para eventos adversos",
                  "Tratam manifestações específicas e podem afetar atenção",
                  "Considerar efeito no desempenho e período de recuperação"
                ]
              ]
            }
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · vacinação",
              colunas: [
                "Momento ou situação",
                "O que fazer"
              ],
              linhas: [
                [
                  "Antes da compra",
                  "Verificar exigências do destino e histórico vacinal"
                ],
                [
                  "Imunossupressão",
                  "Solicitar plano individual e revisar contraindicações a vacinas vivas"
                ],
                [
                  "Certificados",
                  "Organizar documentação sanitária exigida sem exposição desnecessária de dados"
                ],
                [
                  "Tripulante",
                  "Registrar reações e não operar com sintomas incapacitantes"
                ]
              ]
            }
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: [
                "Sistema",
                "O que acontece",
                "Proteção e prevenção"
              ],
              linhas: [
                [
                  "Sistema circulatório",
                  "Hipóxia tecidual e fadiga: menos hemoglobina reduz transporte de oxigênio; imobilidade favorece estase venosa",
                  "Investigar anemia e trombose; planejar mobilidade e suporte"
                ],
                [
                  "Coagulação",
                  "Hemorragia ou trombose: plaquetas, fatores e anticoagulantes alteram equilíbrio entre sangrar e coagular",
                  "Controle da doença e dos remédios; evitar suspensão abrupta"
                ],
                [
                  "Medula óssea",
                  "Infecção ou sangramento: quimioterapia pode reduzir leucócitos e plaquetas",
                  "Monitorar tratamento e reconhecer febre como alerta"
                ],
                [
                  "Pulmões",
                  "Dispneia e hipóxia: anemia, infecção e embolia diminuem margem de oxigenação",
                  "Não viajar com dispneia não investigada; avaliação clínica"
                ],
                [
                  "Defesa imune",
                  "Maior gravidade infecciosa: imunossupressores, HIV avançado ou asplenia reduzem respostas específicas",
                  "Vacinação individualizada e prevenção de exposição"
                ],
                [
                  "Sistema nervoso",
                  "Tontura e incapacitação: hipóxia, febre ou efeitos de fármacos comprometem o funcionamento cerebral",
                  "Não operar com sintomas ou medicações incapacitantes"
                ]
              ]
            }
          }
        ]
      }
    }
  ],
  teste: [
    {
      pergunta: "Por que a anemia reduz a tolerância à altitude de cabine?",
      opcoes: [
        "Porque aumenta o oxigênio no ar",
        "Porque há menos hemoglobina capaz de transportar oxigênio",
        "Porque a pressão arterial sempre dobra",
        "Porque o fígado deixa de produzir bile"
      ],
      correta: 1,
      explicacao: "Menos hemoglobina reduz o conteúdo de oxigênio transportado pelo sangue.",
      topico: "11.1"
    },
    {
      pergunta: "Qual é o mecanismo de maior risco de trombose em voo prolongado?",
      opcoes: [
        "Estase venosa pela imobilidade associada a fatores individuais",
        "Aumento súbito da fração de oxigênio",
        "Aumento do tamanho das hemácias em todos os passageiros",
        "Ausência de gravidade dentro da cabine"
      ],
      correta: 0,
      explicacao: "Menor ação da musculatura das pernas reduz o retorno venoso e soma-se aos fatores clínicos.",
      topico: "11.1"
    },
    {
      pergunta: "O valor de hemoglobina de 8,5 g/dL no CDC é usado para quê?",
      opcoes: [
        "Certificação automática de pilotos",
        "Dispensar investigação de sangramento",
        "Orientar adiamento de viagem de passageiro, com exceções clínicas",
        "Exigir transfusão em todos os viajantes"
      ],
      correta: 2,
      explicacao: "O CDC recomenda adiar em geral abaixo desse valor, ressalvadas situações crônicas estáveis.",
      topico: "11.2"
    },
    {
      pergunta: "O que diz o RBAC 67 sobre anticoagulação oral cumarínica para as classes citadas?",
      opcoes: [
        "Liberação automática se o voo é curto",
        "Condição de inaptidão do candidato",
        "Não requer informação ao examinador",
        "Sempre substituível por aspirina"
      ],
      correta: 1,
      explicacao: "Os itens 67.87(c) e 67.127(c) tratam anticoagulação cumarínica como inaptidão.",
      topico: "11.2"
    },
    {
      pergunta: "Qual sintoma durante quimioterapia exige avaliação rápida?",
      opcoes: [
        "Fome eventual",
        "Febre",
        "Sono após viagem longa sem outras queixas",
        "Vontade de beber água"
      ],
      correta: 1,
      explicacao: "Febre durante imunossupressão pode sinalizar infecção grave mesmo sem outros sintomas.",
      topico: "11.3"
    },
    {
      pergunta: "Por que o câncer pode aumentar o risco de trombose?",
      opcoes: [
        "Porque toda neoplasia aumenta a pressão da cabine",
        "Porque a doença e alguns tratamentos alteram coagulação e inflamação",
        "Porque evita a contração das hemácias",
        "Porque torna a hemoglobina sempre alta"
      ],
      correta: 1,
      explicacao: "Doença ativa e terapias podem favorecer hipercoagulabilidade, somada à estase do voo.",
      topico: "11.3"
    },
    {
      pergunta: "A ventilação da cabine elimina todo risco de transmissão respiratória?",
      opcoes: [
        "Sim, independentemente da doença",
        "Sim, se a pessoa estiver febril",
        "Não; ajuda na diluição, mas não elimina exposição próxima",
        "Apenas em aeronaves grandes"
      ],
      correta: 2,
      explicacao: "A transmissão depende do agente, proximidade, sintomas e medidas de controle.",
      topico: "11.4"
    },
    {
      pergunta: "Qual conduta é mais apropriada para infecção transmissível com dispneia e febre?",
      opcoes: [
        "Embarcar após antitérmico para esconder sintomas",
        "Adiar e buscar avaliação clínica",
        "Operar se a cabine estiver fria",
        "Tomar antibiótico sem orientação"
      ],
      correta: 1,
      explicacao: "O quadro pode comprometer a saúde do viajante e trazer risco de transmissão.",
      topico: "11.4"
    },
    {
      pergunta: "O HIV é transmitido pelo ar compartilhado na cabine?",
      opcoes: [
        "Sim, sempre",
        "Apenas em voos longos",
        "Não; o HIV não se transmite por convivência cotidiana e ar compartilhado",
        "Somente durante a descida"
      ],
      correta: 2,
      explicacao: "O risco de viagem depende de saúde e tratamento, não de transmissão aérea do HIV.",
      topico: "11.5"
    },
    {
      pergunta: "O que fazer com os antirretrovirais ao mudar de fuso?",
      opcoes: [
        "Interromper por conta própria",
        "Planejar os horários para manter o esquema prescrito",
        "Tomar todas as doses antes do embarque",
        "Guardar apenas na mala despachada"
      ],
      correta: 1,
      explicacao: "Continuidade do tratamento evita perda do controle virológico.",
      topico: "11.5"
    },
    {
      pergunta: "Vacinas vivas são sempre indicadas em imunossupressão grave?",
      opcoes: [
        "Sim, sem avaliação",
        "Não; podem ser contraindicadas e exigem análise especializada",
        "Não existe vacina viva",
        "Somente para pilotos"
      ],
      correta: 1,
      explicacao: "O estado imune pode contraindicar vacinas replicantes; o risco do destino também importa.",
      topico: "11.6"
    },
    {
      pergunta: "Qual é o primeiro passo para uma viagem internacional com risco vacinal?",
      opcoes: [
        "Comprar qualquer vacina disponível",
        "Suspender imunossupressor sem consulta",
        "Revisar histórico, destino e contraindicações com equipe de saúde",
        "Ignorar documentos sanitários"
      ],
      correta: 2,
      explicacao: "O plano combina exigências do destino e condições clínicas individuais.",
      topico: "11.6"
    }
  ]
},
  liberacao: liberacaoSangue
};
