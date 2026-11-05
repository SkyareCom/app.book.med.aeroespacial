// Missão Sistemas · M2V10 — Estômago, intestino e fígado. Ramo editorial em preparação, não publicado.
// REGISTRO DE REVISÃO (05/11/2026) — fontes primárias consultadas:
// - ANAC RBAC 67 Emenda 05, itens 67.83 (1ª classe) e 67.123 (2ª classe):
//   https://www.anac.gov.br/assuntos/legislacao/legislacao-1/rbha-e-rbac/rbac/rbac-67/@@display-file/arquivo_norma/RBAC67EMD05.pdf
// - ICAO Doc 8984, 3ª ed., Part III, Cap. 3 (Digestive System), sobretudo 3.1:
//   https://www.icao.int/sites/default/files/2024-12/8984_cons_en.pdf
// - FAA Guide for Aviation Medical Examiners, item 38 Abdomen and Viscera:
//   https://www.faa.gov/ame_guide/app_process/exam_tech/item38/amd
// - FAA AASI Colitis; Hepatitis dispositions:
//   https://www.faa.gov/ame_guide/special_iss/all_classes/colitis
//   https://www.faa.gov/ame_guide/app_process/exam_tech/item38/amd/conditions/hepatitis
// - UK CAA, guidance for air passengers after surgery and medical guidance for pilots:
//   https://www.caa.co.uk/air-passengers/about-your-trip/health-and-medical/guidance-for-health-professionals/surgical-conditions/
//   https://www.caa.co.uk/aeromedical/medical-standards/pilots/medical-conditions/gastrointestinal/abdominal-surgery/
//   https://www.caa.co.uk/aeromedical/medical-standards/pilots/medical-conditions/gastrointestinal/digestive-guidance-material-gm/
// - EASA, Part-MED MED.B.020 digestive system: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-aircrew-regulation-eu-no?page=54
// - CDC Yellow Book 2026, Travelers' Diarrhea: https://www.cdc.gov/yellow-book/hcp/preparing-international-travelers/travelers-diarrhea.html
// Revisão clínica: intervalo ao passageiro não é o mesmo que certificação de tripulante;
// ausência de prazo individual exige avaliação, sem extrapolação.
// FOTOS E VÍDEO: dependem dos arquivos finais do autor; não introduzir requires inexistentes.
import type { Capitulo } from '../tipos';
import { liberacaoDigestivo } from '../liberacao/digestivo';

export const digestivo: Capitulo = {
  "numero": 10,
  "titulo": "Estômago, intestino e fígado",
  "tempoLeituraMin": 40,
  "topicos": [
    {
      "id": "10.1",
      "titulo": "O aparelho digestivo em altitude",
      "pergunta": "Por que o intestino incha dentro de um avião?",
      "conteudo": {
        "texto": "O **estômago** recebe e mistura o alimento; o **intestino** absorve água e nutrientes; o **fígado** processa substâncias, produz bile e participa da coagulação. O voo não interrompe essas funções, mas pode transformar um problema controlado em urgência quando há dor, vômitos, sangramento ou obstrução.\n\nNa subida, a **pressão da cabine diminui** e o ar retido no estômago e no intestino **se expande**. Isso pode causar distensão, cólicas e maior tensão sobre uma sutura abdominal recente (Veja M1V1 - II). O efeito é especialmente perigoso se já existe obstrução, porque o gás não consegue avançar.\n\nHá **menos oxigênio** do que ao nível do mar na cabine pressurizada. Uma pessoa com sangramento digestivo, anemia ou doença hepática avançada pode tolerar pior essa redução, porque o sangue transporta menos oxigênio ou o organismo tem menos reserva (Veja M2V1 - I). Não atribua a uma simples indisposição uma tontura acompanhada de sangue nas fezes.\n\nO **ar seco**, a **imobilidade**, a mudança das refeições e o **fuso horário** favorecem desconforto, constipação ou desidratação quando já há perda de líquidos por diarreia ou vômitos (Veja M1V1 - IV; Veja M2V8 - III). As forças G intensas não são um fator habitual na cabine de passageiros; na aviação acrobática, a dor súbita pode prejudicar a atuação do tripulante.\n\nPassageiro e tripulante precisam distinguir **desconforto leve** de **abdome agudo**. Dor progressiva intensa, barriga rígida, vômitos persistentes, sangue vomitado, fezes negras com mal-estar ou desmaio exigem avaliação urgente, não uma tentativa de tratar o sintoma já a bordo.\n\n**Como prevenir e amenizar.** Antes de viajar, trate sintomas ativos e discuta com o médico cirurgias recentes, doença hepática descompensada ou crises intestinais. Prefira alimentação já tolerada e leve os remédios na bagagem de mão. Durante o voo, hidrate-se conforme sua condição clínica e movimente-se quando permitido; o tripulante com sintomas incapacitantes deve suspender a atividade e buscar avaliação.",
        "recursos": [
          {
            "paragrafo": 2,
            "tabela": {
              "titulo": "O que muda em altitude",
              "colunas": [
                "Fator do voo",
                "O que acontece no aparelho digestivo",
                "Quem é mais vulnerável"
              ],
              "linhas": [
                [
                  "Menos oxigênio",
                  "Menor oferta de oxigênio pode agravar o mal-estar se o sangue já transporta pouco ou há doença sistêmica.",
                  "Sangramento digestivo ou anemia: a perda de hemoglobina reduz o transporte de oxigênio e a cabine diminui sua pressão parcial (Veja M2V1 - I)."
                ],
                [
                  "Gás que expande",
                  "Distensão e cólica: o ar ocupa maior volume sob menor pressão.",
                  "Obstrução intestinal ou sutura recente: o ar não progride ou traciona tecidos em cicatrização, aumentando dor e risco de lesão (Veja M1V1 - II)."
                ],
                [
                  "Ar seco e líquidos",
                  "A perda por diarreia ou vômitos pode reduzir o volume circulante.",
                  "Diarreia intensa: fezes líquidas eliminam água e sais; beber pouco durante o voo acentua a perda (Veja M1V1 - IV)."
                ],
                [
                  "Imobilidade, refeições e fuso",
                  "Alteração do hábito intestinal e de horários de tratamento.",
                  "Constipação crônica ou tratamento em horários fixos: permanecer sentado e mudar as refeições dificulta a evacuação e o uso regular dos remédios (Veja M2V8 - III)."
                ]
              ]
            }
          },
          {
            "paragrafo": 3,
            "midia": "digestivo-voo"
          },
          {
            "paragrafo": 4,
            "midia": "animacao-gas-intestinal"
          },
          {
            "paragrafo": 6,
            "tabela": {
              "titulo": "Como prevenir e amenizar · aparelho digestivo",
              "colunas": [
                "Momento ou situação",
                "O que fazer"
              ],
              "linhas": [
                [
                  "Antes da viagem",
                  "Confirmar estabilidade clínica; investigar dor intensa, sangramento e vômitos; alinhar dieta e remédios ao itinerário."
                ],
                [
                  "Na bagagem de mão",
                  "Levar os remédios habituais, informação do diagnóstico e plano de hidratação quando necessário."
                ],
                [
                  "Durante o voo",
                  "Beber líquidos conforme orientação médica; comer alimentos tolerados; mudar de posição e caminhar quando seguro."
                ],
                [
                  "Alerta imediato",
                  "Comunicar dor forte, sangue nas fezes ou vômitos, desmaio e distensão progressiva; não assumir função de voo sintomático."
                ]
              ]
            }
          }
        ]
      }
    },
    {
      "id": "10.2",
      "titulo": "Refluxo, gastrite e úlcera",
      "pergunta": "A azia e a úlcera impedem de voar?",
      "conteudo": {
        "texto": "No **refluxo gastroesofágico**, o conteúdo ácido do estômago volta ao esôfago e provoca queimação ou regurgitação. A **gastrite** inflama a mucosa do estômago; a **úlcera péptica** é uma ferida que pode sangrar ou perfurar. Refluxo e gastrite não são sinônimos de úlcera.\n\nRefeições fora de hora, permanecer sentado após comer e **gás que se expande** podem aumentar arroto e sensação de estômago cheio. A úlcera ativa merece atenção especial: dor súbita forte, vômito com sangue ou fezes pretas podem anunciar **perfuração** ou **hemorragia**, com queda de pressão e perda de consciência.\n\nO **passageiro** com azia leve, controlada e sem sinais de alerta costuma conseguir viajar com cuidados. Se há úlcera sangrante, perfuração, dor intensa ou vômitos repetidos, **não embarcar** antes da avaliação e estabilização. O **tripulante** precisa estar sem risco de incapacitação; a ANAC avalia o requisito digestivo e a FAA utiliza disposições próprias para refluxo e úlcera, sem uma liberação automática pelo simples uso de tratamento.\n\nVoar com doença ativa omitida pode transformar sangramento ou dor intensa em emergência onde não há endoscopia nem cirurgia disponíveis. Para o tripulante, a condição que prejudica a aptidão deve ser comunicada ao examinador; continuar operando sem condições pode afetar a certificação e a segurança da operação.\n\n**Inibidores da bomba de prótons** e outros redutores de acidez podem controlar sintomas, mas o remédio não demonstra que a úlcera cicatrizou. **Anti-inflamatórios**, álcool e automedicação podem agravar lesões e sangramentos; analgésicos sedativos prejudicam atenção e julgamento. O médico deve identificar a causa, tratar e confirmar recuperação quando indicado.\n\n**Como prevenir e amenizar.** Coma porções menores, evite alimentos que já provocam sintomas e não se deite logo após refeições. Leve a medicação prescrita e não inicie tratamento sedativo antes de uma escala. Passageiro com sangramento, dor intensa ou vômitos persistentes deve adiar o voo; tripulante precisa da avaliação aeromédica pertinente antes de reassumir.",
        "recursos": [
          {
            "paragrafo": 1,
            "midia": "refluxo-voo"
          },
          {
            "paragrafo": 3,
            "tabela": {
              "titulo": "Liberação para voo",
              "colunas": [
                "Situação",
                "Passageiro",
                "Tripulante"
              ],
              "linhas": [
                [
                  "Azia leve controlada, sem sinais de alerta",
                  "Em geral, pode viajar com cuidados e medicação habitual.",
                  "Avaliar sintomas, efeitos dos remédios e exigências da ANAC/FAA; sem incapacitação."
                ],
                [
                  "Úlcera ativa ou com sintomas importantes",
                  "Avaliar antes de voar; se houver sangramento ou dor intensa, não embarcar.",
                  "Não exercer atividade até recuperação, investigação e avaliação aeromédica."
                ],
                [
                  "Vômito com sangue, fezes negras com mal-estar ou dor súbita intensa",
                  "Não voar; atendimento de urgência.",
                  "Não voar; atendimento de urgência e comunicação ao examinador."
                ]
              ]
            }
          },
          {
            "paragrafo": 5,
            "tabela": {
              "titulo": "Remédios e voo",
              "colunas": [
                "Remédio ou classe",
                "Efeito que importa no voo",
                "Tripulante (FAA/ANAC)"
              ],
              "linhas": [
                [
                  "Omeprazol e outros inibidores de ácido",
                  "Controlam acidez; não excluem sangramento nem asseguram cicatrização da úlcera.",
                  "FAA/ANAC: considerar diagnóstico, estabilidade, efeitos adversos e decisão do examinador."
                ],
                [
                  "Anti-inflamatórios não esteroidais",
                  "Podem irritar mucosa e favorecer sangramento gastrointestinal.",
                  "Não mascarar doença ativa; revisar uso e risco com o examinador."
                ],
                [
                  "Analgésicos sedativos",
                  "Sonolência e menor atenção, além do risco ligado à doença de base.",
                  "Não exercer funções com prejuízo cognitivo; avaliação aeromédica."
                ]
              ]
            }
          },
          {
            "paragrafo": 6,
            "tabela": {
              "titulo": "Como prevenir e amenizar · refluxo e úlcera",
              "colunas": [
                "Momento ou situação",
                "O que fazer"
              ],
              "linhas": [
                [
                  "Antes",
                  "Revisar sinais de alerta, diagnóstico e tratamento; confirmar resolução de complicações."
                ],
                [
                  "Refeições",
                  "Comer porções menores; evitar alimento já conhecido por desencadear sintomas; não deitar após comer."
                ],
                [
                  "Sintoma grave",
                  "Não mascarar sangramento ou dor progressiva com remédio; procurar atendimento."
                ],
                [
                  "Retorno do tripulante",
                  "Reavaliar aptidão quando a doença estiver estável e sem risco de incapacitação."
                ]
              ]
            }
          }
        ]
      }
    },
    {
      "id": "10.3",
      "titulo": "Diarreia, intestino irritável e doença inflamatória",
      "pergunta": "Quando uma crise intestinal torna o voo inseguro?",
      "conteudo": {
        "texto": "A **diarreia** elimina água e sais pelas fezes; pode ser causada por infecção, medicamento ou inflamação. A **síndrome do intestino irritável** provoca dor e mudanças do hábito intestinal sem a inflamação destrutiva característica da **doença de Crohn** e da **retocolite ulcerativa**.\n\nNa cabine, urgência para evacuar e acesso limitado ao banheiro podem comprometer tarefas. **Diarreia intensa** causa desidratação: menor volume de sangue gera fraqueza, tontura e queda da pressão. **Sangue nas fezes**, febre e dor forte sugerem complicação que não deve ser tratada como mero desconforto de viagem.\n\nO **passageiro** com sintomas leves, toleráveis e sem febre ou desidratação importante pode viajar se conseguir manter líquidos; uma crise grave exige avaliação antes de embarcar. Para o **tripulante**, doença inflamatória estável pode ser compatível com aptidão após avaliação: a FAA prevê critérios para colite e o padrão europeu exige remissão estável na 1ª classe, sem corticoide sistêmico para controle.\n\nUma exacerbação com dor, sangramento ou diarreia incapacitante pode tirar o tripulante da função de forma repentina. Na FAA, o seguimento de autorização especial para colite exige reavaliação quando a doença piora, é operada ou demanda certos medicamentos; operar durante uma exacerbação contraria a exigência de aptidão.\n\n**Solução de reidratação oral** repõe água e eletrólitos em perdas importantes. **Loperamida** pode aliviar diarreia não sanguinolenta, mas não deve ser usada isoladamente se houver **febre ou sangue nas fezes**. Antibióticos não são prevenção rotineira; tratamento de infecções, corticoides e imunossupressores exige plano médico. Para tripulantes, os efeitos e a doença de base precisam de avaliação.\n\n**Como prevenir e amenizar.** Antes da viagem, tenha água segura, alimentação tolerada e remédios prescritos na bagagem de mão. Reponha as perdas e evite embarcar com desidratação, febre, sangue nas fezes ou crise incapacitante. O tripulante deve se afastar durante exacerbações e voltar após avaliação do controle clínico e do tratamento.",
        "recursos": [
          {
            "paragrafo": 1,
            "midia": "intestino-crise"
          },
          {
            "paragrafo": 3,
            "tabela": {
              "titulo": "Liberação para voo",
              "colunas": [
                "Situação",
                "Passageiro",
                "Tripulante"
              ],
              "linhas": [
                [
                  "Sintomas leves, sem febre, sangue ou desidratação importante",
                  "Pode viajar com hidratação e acesso ao banheiro se estiver funcionalmente bem.",
                  "Avaliação de estabilidade; sem urgência evacuatória incapacitante nem efeitos adversos."
                ],
                [
                  "Doença inflamatória em remissão estável",
                  "Viajar com plano de tratamento e acompanhamento.",
                  "FAA: seguir critérios da colite; EASA/UK CAA: avaliar remissão e tratamento; ANAC: avaliar risco de incapacitação."
                ],
                [
                  "Febre, sangue nas fezes, desidratação ou crise grave",
                  "Não voar agora; avaliação médica.",
                  "Não voar agora; afastar até recuperação e avaliação aeromédica."
                ]
              ]
            }
          },
          {
            "paragrafo": 5,
            "tabela": {
              "titulo": "Remédios e voo",
              "colunas": [
                "Remédio ou classe",
                "Efeito que importa no voo",
                "Tripulante (FAA/ANAC)"
              ],
              "linhas": [
                [
                  "Sais de reidratação oral",
                  "Recolocam água e sais perdidos nas fezes líquidas.",
                  "Não substituem avaliação se a crise torna o tripulante incapaz."
                ],
                [
                  "Loperamida",
                  "Reduz frequência das evacuações; não usar isoladamente com febre ou sangue nas fezes.",
                  "FAA: informar uso, efeitos e gravidade da colite; uso de antidiarreicos específicos pode exigir decisão."
                ],
                [
                  "Corticoides sistêmicos e imunossupressores",
                  "Controlam inflamação, mas podem causar efeitos sistêmicos e indicar doença ativa.",
                  "FAA: doses acima de 20 mg/dia de equivalente de prednisona podem exigir deferimento; EASA 1ª classe exige remissão sem esteroide sistêmico para controle."
                ]
              ]
            }
          },
          {
            "paragrafo": 6,
            "tabela": {
              "titulo": "Como prevenir e amenizar · doenças intestinais",
              "colunas": [
                "Momento ou situação",
                "O que fazer"
              ],
              "linhas": [
                [
                  "Antes",
                  "Preparar plano de hidratação e tratamento; evitar viajar durante crise importante."
                ],
                [
                  "No voo",
                  "Usar banheiro quando disponível; beber líquidos seguros; manter remédios acessíveis."
                ],
                [
                  "Febre ou sangue",
                  "Não usar loperamida isoladamente; procurar avaliação para infecção ou complicação."
                ],
                [
                  "Tripulante",
                  "Não assumir função com urgência fecal, dor incapacitante ou desidratação."
                ]
              ]
            }
          }
        ]
      }
    },
    {
      "id": "10.4",
      "titulo": "Hepatites, gordura no fígado e cirrose",
      "pergunta": "O que o fígado doente muda na segurança do voo?",
      "conteudo": {
        "texto": "O **fígado** produz proteínas da coagulação, transforma medicamentos e ajuda a eliminar substâncias. **Hepatite** é inflamação hepática; a **doença hepática associada à disfunção metabólica** pode evoluir para cicatrização; a **cirrose** é uma lesão avançada que compromete circulação e função do órgão.\n\nA cirrose pode provocar **ascite** (líquido no abdome), **varizes no esôfago** e **encefalopatia hepática**, quando substâncias que o fígado não consegue depurar prejudicam o cérebro. A distensão pelo gás da cabine soma desconforto à ascite; sangramento, confusão e fraqueza podem tornar-se emergências durante o voo.\n\nUma pessoa com alteração laboratorial isolada ou doença hepática estável não recebe automaticamente proibição de viajar: o médico precisa avaliar função, sintomas e complicações. **Hemorragia digestiva, confusão nova, icterícia importante com mal-estar ou ascite descompensada** exigem avaliação antes do embarque. A **FAA** permite decisão pelo examinador em hepatite resolvida sem sequelas e exige análise individual de doenças hepáticas ativas.\n\nPara **tripulantes**, a ANAC exige ausência de comprometimento digestivo que possa incapacitar; as normas europeias permitem avaliar função hepática após laudo gastroenterológico satisfatório, mas **varizes esofágicas** são consideradas incompatíveis com a aptidão nas diretrizes europeias citadas. Ocultar confusão, sangramento ou efeitos de remédios coloca em risco a operação.\n\n**Diuréticos** podem ajudar a controlar ascite, mas também reduzir volume e eletrólitos; **lactulose** pode aumentar evacuações; determinados sedativos pioram atenção e encefalopatia. A prescrição deve considerar metabolismo hepático e segurança da função; nenhum desses remédios, isoladamente, autoriza tripulante a voar.\n\n**Como prevenir e amenizar.** Antes da viagem, confirme estabilidade do fígado, ausência de sangramento e plano para remédios, alimentação e líquidos. Evite álcool e automedicação. Na cabine, siga o plano individual de hidratação, pois ascite e diuréticos podem exigir restrições distintas. Se houver sonolência anormal, confusão, sangue vomitado ou fezes negras, não embarque nem opere.",
        "recursos": [
          {
            "paragrafo": 1,
            "midia": "figado-risco"
          },
          {
            "paragrafo": 3,
            "tabela": {
              "titulo": "Liberação para voo",
              "colunas": [
                "Situação",
                "Passageiro",
                "Tripulante"
              ],
              "linhas": [
                [
                  "Doença estável sem descompensação",
                  "Avaliação clínica individual; pode viajar com cuidados conforme o quadro.",
                  "Relatório e avaliação aeromédica; FAA: protocolos por diagnóstico; ANAC: afastar risco de incapacitação."
                ],
                [
                  "Ascite importante, encefalopatia, sangramento ou piora aguda",
                  "Não voar agora; estabilizar e investigar.",
                  "Não voar; sem função operacional até avaliação e liberação."
                ],
                [
                  "Varizes esofágicas",
                  "Avaliar risco de hemorragia antes da viagem.",
                  "EASA/UK CAA: não apto; outras autoridades exigem avaliação específica."
                ]
              ]
            }
          },
          {
            "paragrafo": 5,
            "tabela": {
              "titulo": "Remédios e voo",
              "colunas": [
                "Remédio ou classe",
                "Efeito que importa no voo",
                "Tripulante (FAA/ANAC)"
              ],
              "linhas": [
                [
                  "Diuréticos para ascite",
                  "Perda de água e sais; tontura quando baixa a pressão.",
                  "Verificar estabilidade e efeitos; não assumir se houver tontura ou desidratação."
                ],
                [
                  "Lactulose",
                  "Aumenta evacuações e pode causar diarreia; ajuda a controlar encefalopatia.",
                  "A encefalopatia é risco de incapacitação; precisa de decisão aeromédica."
                ],
                [
                  "Sedativos e álcool",
                  "Podem agravar lentificação cerebral e comprometer a segurança.",
                  "Não operar com prejuízo da atenção; comunicar uso e doença ao examinador."
                ]
              ]
            }
          },
          {
            "paragrafo": 6,
            "tabela": {
              "titulo": "Como prevenir e amenizar · doenças do fígado",
              "colunas": [
                "Momento ou situação",
                "O que fazer"
              ],
              "linhas": [
                [
                  "Consulta prévia",
                  "Revisar função hepática, ascite, sangramento, consciência e efeitos dos medicamentos."
                ],
                [
                  "Antes do embarque",
                  "Não consumir álcool; verificar dieta, bagagem de mão e o plano individual de líquidos."
                ],
                [
                  "Alerta",
                  "Confusão, sangue vomitado, fezes pretas com mal-estar ou desmaio exigem urgência."
                ],
                [
                  "Tripulante",
                  "Reapresentar laudo e decidir aptidão de acordo com a autoridade responsável."
                ]
              ]
            }
          }
        ]
      }
    },
    {
      "id": "10.5",
      "titulo": "Vesícula, cálculos biliares e pancreatite",
      "pergunta": "Um cálculo sem dor tem o mesmo risco que uma crise?",
      "conteudo": {
        "texto": "A **vesícula biliar** guarda a bile produzida pelo fígado. **Cálculos biliares** podem permanecer silenciosos ou bloquear a saída da bile, produzindo cólica, inflamação e icterícia. O **pâncreas** libera enzimas digestivas; quando ele inflama, a **pancreatite** pode provocar dor intensa, vômitos e doença sistêmica.\n\nUma crise de cólica biliar ou pancreatite não é apenas uma dor de barriga. **Obstrução**, inflamação e vômitos podem evoluir sem assistência adequada durante a etapa aérea. A expansão de gás no intestino pode somar distensão, mas não é a causa do cálculo ou da pancreatite.\n\n**Passageiros** com cálculo assintomático e sem complicações podem receber orientação médica para viajar; dor persistente, febre, icterícia com mal-estar e vômitos importantes pedem avaliação antes. **Tripulantes** exigem decisão aeromédica individual: nas normas europeias, cálculos sintomáticos e pancreatite ativa impedem aptidão; cálculo assintomático pode ser considerado após avaliação conforme classe e contexto.\n\nUma crise súbita pode incapacitá-lo no comando ou no atendimento de cabine. A FAA possui disposições separadas para cálculos e pancreatite; a ANAC avalia o risco de incapacitação digestiva. Voltar após melhora da dor sem esclarecer a causa não é suficiente para afirmar aptidão.\n\nAnalgésicos e antiespasmódicos podem esconder o agravamento ou causar sonolência; após cirurgia da vesícula, aplicam-se também os critérios de recuperação de procedimento abdominal. **Antibióticos**, cirurgia ou outros tratamentos devem ser orientados pela causa, não por uma dose improvisada antes do voo.\n\n**Como prevenir e amenizar.** Diferencie a presença de cálculo sem sintomas de episódio recente de obstrução, febre, dor forte ou pancreatite. Leve o relatório e o plano terapêutico, evite alimentos que desencadeiem dor individualmente e não embarque com crise. O tripulante retorna somente quando a causa estiver controlada, sem efeitos incapacitantes e após avaliação aeromédica.",
        "recursos": [
          {
            "paragrafo": 1,
            "midia": "biliar-decidir"
          },
          {
            "paragrafo": 3,
            "tabela": {
              "titulo": "Liberação para voo",
              "colunas": [
                "Situação",
                "Passageiro",
                "Tripulante"
              ],
              "linhas": [
                [
                  "Cálculo sem sintomas nem sinais de complicação",
                  "Decisão clínica individual; em geral, pode viajar com orientação.",
                  "FAA: avaliar disposições para colelitíase; EASA/UK CAA: avaliação segundo tipo e número de cálculos."
                ],
                [
                  "Cólica biliar, febre, icterícia sintomática ou pancreatite ativa",
                  "Não voar agora; investigar e tratar.",
                  "Não voar; EASA/UK CAA: inapto até recuperação/avaliação."
                ],
                [
                  "Após cirurgia da vesícula",
                  "Aplicar os critérios de cirurgia abdominal e a liberação do cirurgião.",
                  "Aplicar os critérios de cirurgia e retorno aeromédico (Veja M2V10 - VI)."
                ]
              ]
            }
          },
          {
            "paragrafo": 5,
            "tabela": {
              "titulo": "Remédios e voo",
              "colunas": [
                "Remédio ou classe",
                "Efeito que importa no voo",
                "Tripulante (FAA/ANAC)"
              ],
              "linhas": [
                [
                  "Analgésicos não sedativos prescritos",
                  "Podem aliviar dor, mas não resolvem obstrução ou pancreatite.",
                  "Tratar a causa; avaliar a estabilidade e possíveis efeitos colaterais."
                ],
                [
                  "Opioides e antiespasmódicos sedativos",
                  "Sonolência e resposta mais lenta, com risco de incapacitação.",
                  "Não desempenhar funções sob efeito; reavaliar aptidão."
                ],
                [
                  "Antibióticos quando indicados",
                  "Podem causar náusea e diarreia; não substituem investigação.",
                  "Examinador considera infecção ativa e efeitos adversos."
                ]
              ]
            }
          },
          {
            "paragrafo": 6,
            "tabela": {
              "titulo": "Como prevenir e amenizar · vesícula e pâncreas",
              "colunas": [
                "Momento ou situação",
                "O que fazer"
              ],
              "linhas": [
                [
                  "Antes",
                  "Confirmar se há sintomas, inflamação ou obstrução e conhecer o plano de tratamento."
                ],
                [
                  "Com cólica ou vômitos",
                  "Adiar viagem e procurar avaliação, especialmente com febre ou icterícia."
                ],
                [
                  "Após tratamento",
                  "Conferir recuperação, alimentação tolerada e ausência de efeitos sedativos."
                ],
                [
                  "Tripulante",
                  "Apresentar investigação clínica ao examinador; não operar em crise."
                ]
              ]
            }
          }
        ]
      }
    },
    {
      "id": "10.6",
      "titulo": "Cirurgias abdominais e endoscopia",
      "pergunta": "Quanto esperar para voar depois de uma cirurgia?",
      "conteudo": {
        "texto": "Depois de **cirurgia abdominal**, o intestino pode ficar temporariamente mais lento e acumular ar. A diminuição da pressão da cabine faz o gás **aumentar de volume**, tracionando tecidos e, no pós-operatório, podendo ameaçar suturas e anastomoses. Isso pode levar a **dor, sangramento ou perfuração** (Veja M1V1 - II).\n\nPara o **passageiro**, a orientação publicada pela autoridade britânica é **evitar viagens aéreas nos 10 dias seguintes à cirurgia abdominal**. Após **colonoscopia com introdução de grande volume de gás**, recomenda-se **24 horas** sem voo. Após **laparoscopia**, a referência menciona cerca de **24 horas** pelo gás residual, mas esse intervalo **não equivale a liberação cirúrgica de uma operação maior**: o risco da ferida e da doença operada pode impor espera adicional.\n\nO **tripulante** é avaliado por capacidade física, integridade da reparação e risco de incapacitação, com intervalos distintos na orientação britânica: cerca de **1 semana** após laparoscopia apenas diagnóstica; **3 a 4 semanas** após procedimentos laparoscópicos maiores, como colecistectomia ou hérnia inguinal; **2 a 3 meses** após cirurgia abdominal maior, como colectomia. São intervalos de referência para consideração de aptidão, não liberação automática. Após endoscopia digestiva baixa com **biópsia ou polipectomia**, a orientação britânica ao piloto é **pelo menos 48 horas** e comunicação ao examinador.\n\nNa **ANAC**, o RBAC 67 exige que cirurgia digestiva importante, desvio de fluxo ou sequelas com possibilidade de incapacitação sejam avaliados pelo examinador ou pela autoridade. A **ICAO** e a **EASA** também exigem recuperação satisfatória e risco mínimo de complicação. Para ambos os perfis, dor progressiva, febre, distensão que piora, vômitos persistentes ou sangramento são motivos para **não voar**.\n\nVoar antes da cicatrização ou esconder uma complicação impede resposta rápida se houver perfuração ou hemorragia. Analgésicos com efeito sedativo diminuem vigilância e capacidade de evacuação; um remédio para a dor não substitui a revisão pós-operatória. A decisão final depende do tipo de intervenção, exame físico e orientação do cirurgião; para tripulantes, também do examinador aeromédico.\n\n**Como prevenir e amenizar.** Antes de embarcar, leve o resumo da cirurgia, confirme funcionamento intestinal, cicatrização, ausência de dor relevante e capacidade de caminhar e sentar-se com segurança. Não use o prazo mais curto de uma colonoscopia para justificar viagem após cirurgia. Tripulantes devem cumprir a reavaliação aeromédica e não retornar com dor, fraqueza ou medicamento sedativo.",
        "recursos": [
          {
            "paragrafo": 1,
            "midia": "prazo-cirurgia-digestiva"
          },
          {
            "paragrafo": 3,
            "tabela": {
              "titulo": "Liberação para voo",
              "colunas": [
                "Situação",
                "Passageiro",
                "Tripulante"
              ],
              "linhas": [
                [
                  "Cirurgia abdominal recente",
                  "Evitar voo nos primeiros 10 dias; após isso, avaliação da recuperação e da cirurgia realizada.",
                  "Inapto até recuperação e decisão do examinador; referências britânicas variam por procedimento."
                ],
                [
                  "Colonoscopia com insuflação de gás, sem complicação",
                  "Evitar voo por 24 horas.",
                  "Se houve biópsia/polipectomia em endoscopia baixa: pelo menos 48 horas e informar AME (UK CAA)."
                ],
                [
                  "Laparoscopia diagnóstica",
                  "Cerca de 24 horas pelo gás residual não dispensam avaliação da recuperação.",
                  "UK CAA: considerar retorno após 1 semana, se recuperado e sem riscos."
                ],
                [
                  "Laparoscopia maior (colecistectomia, hérnia)",
                  "A orientação geral de 10 dias não é autorização automática; dependerá de recuperação e cirurgião.",
                  "UK CAA: considerar após 3 a 4 semanas, recuperação completa e avaliação."
                ],
                [
                  "Cirurgia abdominal maior (colectomia)",
                  "Evitar voo por 10 dias, no mínimo, e obter avaliação individual do pós-operatório.",
                  "UK CAA: considerar após 2 a 3 meses com recuperação e acompanhamento satisfatórios."
                ],
                [
                  "Dor progressiva, febre, vômitos ou sangramento",
                  "Não voar agora; avaliação urgente.",
                  "Não voar; verificar complicação e reavaliar aptidão."
                ]
              ]
            }
          },
          {
            "paragrafo": 5,
            "tabela": {
              "titulo": "Remédios e voo",
              "colunas": [
                "Remédio ou classe",
                "Efeito que importa no voo",
                "Tripulante (FAA/ANAC)"
              ],
              "linhas": [
                [
                  "Analgésicos não sedativos",
                  "Podem aliviar dor, mas não confirmam cicatrização.",
                  "Confirmar ausência de dor incapacitante e efeitos adversos."
                ],
                [
                  "Opioides e outros sedativos",
                  "Sonolência, reação lenta e risco operacional.",
                  "Não exercer função com efeitos sedativos; avaliação aeromédica."
                ],
                [
                  "Anticoagulantes quando prescritos",
                  "Podem aumentar sangramento; a imobilidade também pesa no risco de trombose.",
                  "Revisão do motivo, da dose, de sangramento e do risco aeromédico (Veja M2V2 - VII)."
                ]
              ]
            }
          },
          {
            "paragrafo": 6,
            "tabela": {
              "titulo": "Como prevenir e amenizar · pós-operatório",
              "colunas": [
                "Momento ou situação",
                "O que fazer"
              ],
              "linhas": [
                [
                  "Antes de reservar",
                  "Confirmar procedimento, complicações e prazo apropriado para passageiro ou tripulante."
                ],
                [
                  "Antes do embarque",
                  "Conferir função intestinal, feridas, ausência de sangramento e capacidade de mover-se."
                ],
                [
                  "Durante",
                  "Manter remédios acessíveis, posição confortável e hidratação conforme o cirurgião."
                ],
                [
                  "Não embarcar",
                  "Dor intensa ou progressiva, barriga muito distendida, febre, vômitos ou hemorragia."
                ]
              ]
            }
          },
          {
            "paragrafo": 6,
            "tabela": {
              "titulo": "Sistemas do corpo mais atingidos",
              "colunas": [
                "Sistema",
                "O que acontece",
                "Proteção e prevenção"
              ],
              "linhas": [
                [
                  "Estômago e esôfago",
                  "Queimação e sangramento: o refluxo irrita a mucosa e uma úlcera pode lesar vasos sanguíneos.",
                  "Tratar a causa; reconhecer vômito com sangue e fezes negras."
                ],
                [
                  "Intestino",
                  "Distensão, cólicas e perfuração: o gás cresce quando a pressão da cabine cai e pode distender alças obstruídas ou reparadas.",
                  "Tratar obstrução; respeitar recuperação pós-operatória."
                ],
                [
                  "Circulação",
                  "Tontura e choque: diarreia retira água e sais; hemorragia reduz o volume de sangue circulante.",
                  "Reidratar quando indicado; não voar com perda importante ou sangramento."
                ],
                [
                  "Cérebro",
                  "Confusão e incapacitação: encefalopatia surge quando o fígado não depura substâncias neurotóxicas.",
                  "Controlar doença hepática; avaliação urgente de alteração de consciência."
                ],
                [
                  "Fígado e coagulação",
                  "Hemorragia pode ser mais grave: a cirrose reduz fatores de coagulação e aumenta a pressão no sistema porta.",
                  "Avaliar função hepática e varizes; reconhecer sangramento precoce."
                ],
                [
                  "Pâncreas e vias biliares",
                  "Dor e inflamação: cálculo pode obstruir o fluxo de bile ou desencadear pancreatite.",
                  "Investigar cólica sintomática e não voar durante crise."
                ]
              ]
            }
          }
        ]
      }
    }
  ],
  "teste": [
    {
      "pergunta": "Por que o intestino pode distender na subida?",
      "opcoes": [
        "A pressão aumenta",
        "O ar ocupa mais volume com a queda da pressão",
        "O fígado para de funcionar",
        "A umidade aumenta"
      ],
      "correta": 1,
      "explicacao": "O gás ocupa mais volume quando a pressão diminui.",
      "topico": "10.1"
    },
    {
      "pergunta": "Quem sofre mais risco com gás que expande?",
      "opcoes": [
        "Pessoa com obstrução intestinal ou sutura recente",
        "Pessoa sem sintomas",
        "Quem comeu pouco",
        "Quem usa óculos"
      ],
      "correta": 0,
      "explicacao": "Gás retido ou suturas recentes aumentam risco de dor e lesão.",
      "topico": "10.1"
    },
    {
      "pergunta": "O que sugere hemorragia digestiva importante?",
      "opcoes": [
        "Azia leve",
        "Arroto isolado",
        "Vômito com sangue ou fezes negras com mal-estar",
        "Fome"
      ],
      "correta": 2,
      "explicacao": "Esses sintomas exigem avaliação urgente antes do voo.",
      "topico": "10.2"
    },
    {
      "pergunta": "Qual conduta cabe ao tripulante com úlcera ativa e dor importante?",
      "opcoes": [
        "Continuar se usar antiácido",
        "Afastar-se e fazer avaliação aeromédica",
        "Aumentar café",
        "Ocultar os sintomas"
      ],
      "correta": 1,
      "explicacao": "A dor pode incapacitar e os remédios não demonstram cicatrização.",
      "topico": "10.2"
    },
    {
      "pergunta": "Quando a loperamida não deve ser usada isoladamente?",
      "opcoes": [
        "Diarreia sem sangue",
        "Com febre ou sangue nas fezes",
        "Após água limpa",
        "No começo de viagem longa"
      ],
      "correta": 1,
      "explicacao": "Febre ou sangue sugerem doença que precisa de avaliação.",
      "topico": "10.3"
    },
    {
      "pergunta": "Qual situação permite considerar aptidão em doença inflamatória intestinal pela regra europeia para 1ª classe?",
      "opcoes": [
        "Crise com sangramento",
        "Doença em remissão estável sem corticoide sistêmico para controle",
        "Dor diária incapacitante",
        "Desidratação"
      ],
      "correta": 1,
      "explicacao": "A remissão clínica e a estabilidade do tratamento são condições centrais.",
      "topico": "10.3"
    },
    {
      "pergunta": "Por que a cirrose pode afetar o raciocínio?",
      "opcoes": [
        "A bile aumenta o oxigênio",
        "O fígado deixa de depurar substâncias que afetam o cérebro",
        "Todo paciente tem hipoglicemia",
        "A pressão da cabine corrige a doença"
      ],
      "correta": 1,
      "explicacao": "Encefalopatia hepática pode provocar confusão e incapacitação.",
      "topico": "10.4"
    },
    {
      "pergunta": "Qual sinal de doença biliar impede embarque sem avaliação?",
      "opcoes": [
        "Cálculo assintomático isolado",
        "Azia controlada",
        "Febre, dor forte e icterícia com mal-estar",
        "Apetite normal"
      ],
      "correta": 2,
      "explicacao": "Esses sintomas podem indicar inflamação ou obstrução ativa.",
      "topico": "10.5"
    },
    {
      "pergunta": "O passageiro deve evitar voo durante quanto tempo após cirurgia abdominal segundo a UK CAA?",
      "opcoes": [
        "24 horas",
        "10 dias",
        "2 horas",
        "3 meses obrigatórios para todos"
      ],
      "correta": 1,
      "explicacao": "A recomendação aos passageiros é evitar os 10 primeiros dias; a recuperação pode exigir mais.",
      "topico": "10.6"
    },
    {
      "pergunta": "Qual é o prazo indicado ao passageiro após colonoscopia com grande volume de gás, sem complicação?",
      "opcoes": [
        "24 horas",
        "1 semana",
        "2 meses",
        "Nenhum"
      ],
      "correta": 0,
      "explicacao": "A referência para passageiros recomenda 24 horas; o procedimento e a evolução clínica precisam ser considerados.",
      "topico": "10.6"
    },
    {
      "pergunta": "Qual é a orientação britânica para o piloto após endoscopia digestiva baixa com biópsia ou polipectomia?",
      "opcoes": [
        "Voltar imediatamente",
        "Pelo menos 48 horas e avisar o examinador",
        "10 dias sempre",
        "3 meses sempre"
      ],
      "correta": 1,
      "explicacao": "Para o piloto, a orientação é de pelo menos 48 horas e comunicação ao AME.",
      "topico": "10.6"
    }
  ],
  "liberacao": liberacaoDigestivo
};
