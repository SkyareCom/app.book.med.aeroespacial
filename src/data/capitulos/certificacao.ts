// Missão 3 · Voo 1 — Certificação e risco aeromédico. Ramo editorial voo/M3V1; fotos e vídeo entram depois da produção.
// Mesmo padrão dos voos de Sistemas (docs/modelo-sistemas.md): prosa progressiva, "Como prevenir e amenizar" com tabela,
// interativo por tópico, animação própria (src/components/midia/animacoes-aviacao.tsx), tabela final e teste.
// Missão Aviação não tem formulário de liberação; o leitor é o tripulante e o médico examinador.
// REGISTRO DE REVISÃO · 13/11/2026. Normas e fontes primárias conferidas:
// ICAO Anexo 1, 14ª ed., Emenda 179 (2022): 1.2.4.1 (Medical Assessment), 1.2.4.2 (gestão da segurança no processo de
//   avaliação médica, com análise das incapacitações em voo), 1.2.4.3 (promoção da saúde), 1.2.4.9 (medical assessor),
//   1.2.4.10 (accredited medical conclusion com limitações), 1.2.5.2 (validade: 60 meses privado, planador e balão; 12
//   meses comercial, MPL, linha aérea, navegador e mecânico; 48 meses controlador e piloto remoto; 1.2.5.2.2 e 1.2.5.2.3,
//   6 meses; 1.2.5.2.4, 24 meses depois dos 40), 1.2.6.1 (diminuição da aptidão), 6.1.1 (Classe 1, 2 e 3 por licença),
//   6.1.2 (declaração do histórico pessoal, familiar e hereditário).
// ANAC, RBAC 67, Emenda 05 (Resolução 636, de 28/09/2021; vigência 01/11/2021), texto integral conferido no PDF enviado pelo
//   autor em 13/11/2026: 67.11(c)-(d) (recurso; CMA vencido há mais de 5 anos exige exame inicial), 67.13 (classes 1ª a 5ª;
//   PP-IFR cumpre os requisitos oftalmológicos da 1ª classe; classe mais alta vale pela mais baixa; subir exige exame
//   inicial; 67.13(l) gravidez), 67.15(a)-(e) (validade; redução por indicação clínica; diminuição da aptidão: informar a
//   ANAC ou o examinador e deixar de voar; contagem: revalidação até 45 dias antes conta do vencimento anterior), 67.17
//   (suspensão, revogação e cassação; 180 dias depois de voar em condição proibida; 12 meses na fraude), Subpartes C
//   (67.71 a 67.105, 1ª classe), D (67.111 a 67.145, 2ª), F (67.191 a 67.225, 4ª) e G (67.231 a 67.265, 5ª): exames
//   mínimos, requisitos mentais, neurológicos (EEG), cardiológicos (140 x 90 mmHg; infarto 1 ano, não piloto da 2ª 6 meses,
//   revascularização 180 dias, apto com restrição e validade máxima de 6 meses; ECG e esteira por idade), pneumológicos,
//   digestivos, metabólicos (glicemia 50/69/115/139/140 mg/dL; oral após 60 dias; IMC 40), hematológicos, renais,
//   obstétricos (4ª: 12ª a 26ª semana; 5ª: até a 34ª), ósteo-articulares, otorrinolaringológicos, oftalmológicos (20/30 e
//   20/20; 20/40 e 20/30; J1 e J6), auditivos (35 e 50 dB; restrições de rádio) e odontológicos.
// ANAC, RBAC 67, Emenda 05: 67.13 (classes 1ª a 5ª), 67.15(a)-(b) (validade e redução por indicação clínica), 67.45(a)-(b)
//   (médico credenciado: 2ª, 4ª e 5ª; clínica credenciada, pelo diretor técnico médico: todas), médico cadastrado (4ª),
//   entidades conveniadas, 67.11(c) (recursos à ANAC). A 3ª classe (controlador) não é regulada pela ANAC.
// FAA: 14 CFR 61.23 (validade por classe e idade), 61.53 (proibição de operar com deficiência médica), 67.401 (emissão
//   especial e SODA), 14 CFR 183.21 (designação do AME); Guide for Aviation Medical Examiners (emitir, negar ou adiar;
//   AASI); BasicMed (14 CFR 68 e 61.113(i), com os limites de 12.500 lb, 7 ocupantes, 18.000 ft e 250 nós da FAA
//   Reauthorization Act de 2024; certificado após 14/07/2006; curso a cada 24 meses, exame a cada 48 meses; sem
//   remuneração; EUA, México e Bahamas). Formulário 8500-8: declaração falsa é crime federal (18 U.S.C. 1001).
// EASA Part-MED: MED.A.020 (diminuição da aptidão: cirurgia ou procedimento invasivo, remédio de uso contínuo, lesão ou
//   doença importante, gravidez, internação, primeira necessidade de lentes; via UK CAA, 13/11/2026), MED.A.030/040
//   (Classe 1, Classe 2 e LAPL; primeiro exame de Classe 1 em AeMC), MED.A.050 (encaminhamento à autoridade), limitação
//   OML (válido só como ou com copiloto qualificado). Regulamento (UE) 2018/1042 (apoio entre pares, avaliação
//   psicológica e testes de álcool), aplicável desde 14/02/2021 (EASA).
// Regra do 1%: A. Evans (ICAO), apresentação em Lima, 2009 (origem nos anos 1980, doença cardíaca; fase crítica 10%;
//   1 em 100 incapacitações vira acidente; Chapman 1984, simulador, 1 em 400; meta 1 em 10^9 h; 1 em 10^6 h ≈ 1%/ano).
//   CAA da Nova Zelândia, MIS 012 (o 1% "não é uma regra"; faixas abaixo de 1%, 1% a <2%, 2% a <4%, acima de 4% a 5%).
//   Flight Safety Foundation, AeroSafety World, jul/2012 (pilotos de 1ª classe do Reino Unido, 2004, n = 16.145: 0,25%
//   ao ano; 0,11%, 0,12%, 0,23%, 0,42% e 1,20% por década de 20 a 69 anos; causas psiquiátricas mais típicas que as
//   cardiovasculares nas incapacitações em voo; triagem baseada em Framingham deixou passar mais da metade dos eventos
//   num estudo da Nova Zelândia).
// Medicina de precisão: Gray G. et al., NATO HFM 251, "The challenge of asymptomatic coronary artery disease in aircrew;
//   detecting plaque before the accident", Heart 2019;105(Suppl 1):s17 (três fases; CACS 0, mortalidade <0,1%/ano;
//   CACS >100, eventos >1%/ano e afastamento até a investigação; CACS ≥400, considerar cateterismo; angiotomografia
//   >50%, limite para afastar e investigar; teste de esforço com sensibilidade de 60% a 70%, desaconselhado isolado;
//   cintilografia normal, <1%/ano por 3 anos; radiação 0,5 a 1 mSv e 2 a 4 mSv). Gray G. et al., "Coronary artery
//   disease detection and disposition in aircrew", Aerosp Med Hum Perform 2026;97(3):210-7.
// Evitação de atendimento: W. R. Hoffman et al. (mais de 3.500 pilotos dos EUA, 56%), Scientific American, 13/11/2026.
// Condutas sem número próprio são aplicação das fontes acima.
import type { Capitulo } from '../tipos';

export const certificacao: Capitulo = {
  numero: 1,
  titulo: 'Certificação e risco aeromédico',
  tempoLeituraMin: 23,
  laboratorio: ['risco-aeromedico'],
  topicos: [
    {
      id: '1.1',
      titulo: "Classes de certificado",
      pergunta: "Por que existem classes de certificado médico, e o que cada uma protege no corpo de quem voa?",
      conteudo: {
        texto: [
          "O **Certificado Médico Aeronáutico**, o **CMA**, atesta que o corpo de quem trabalha no voo tem reserva para cumprir a função sem cair em **incapacitação**. Ela pode ser **súbita**, quando o coração dispara uma arritmia, o cérebro convulsiona ou o açúcar do sangue despenca, ou **sutil**, quando a atenção, a visão ou o raciocínio falham sem que a própria pessoa perceba. O exame procura no organismo justamente o que pode falhar na cabine, e a classe define com que rigor (Veja M2V2, M2V6 e M2V9).",
          "No Brasil, o **RBAC 67** da ANAC divide o certificado em cinco classes. A **1ª classe** vale para o piloto de linha aérea, o comercial e o de tripulação múltipla. A **2ª classe** vale para o piloto privado, o comissário, o mecânico de voo, o piloto de balão e o aluno-piloto, exceto o de planador. A **3ª classe** é do controlador de tráfego aéreo, com regras fora da ANAC. A **4ª classe** cobre o piloto de aerodesportivo e o de planador, e a **5ª classe**, o piloto remoto.",
          "A **ICAO**, no Anexo 1, usa três classes. A **Classe 1** vale para as licenças comerciais, de tripulação múltipla e de linha aérea; a **Classe 2**, para o piloto privado, de planador e de balão, o navegador e o mecânico de voo; a **Classe 3**, para o controlador de tráfego aéreo e o piloto remoto. O comissário não tem classe no Anexo 1: o Brasil o incluiu na 2ª classe. A lógica é a mesma nos dois sistemas: quanto mais pessoas dependem do corpo de quem voa, mais rigoroso o exame (Veja M3V1 - III).",
          "O rigor aparece sobretudo no **prazo**. Na ANAC, o certificado de 1ª classe vale **12 meses** e cai para **6 meses** a partir dos 40 anos no transporte com um só piloto levando passageiros e a partir dos 60 no transporte aéreo público. O do piloto privado vale **60 meses** antes dos 40, **24 meses** dos 40 aos 49 e **12 meses** a partir dos 50. O do comissário vale 60 meses antes dos 60 e 24 meses depois, e o do piloto remoto, 48 meses. O examinador ou a ANAC podem encurtar qualquer prazo quando o caso clínico pede (Veja M2V15 - III).",
          "O prazo encurta com a idade porque o risco do corpo muda. As artérias acumulam placa, o ritmo do coração fica mais sujeito a falhas, a pressão sobe e o açúcar do sangue sai do controle com mais frequência, e o coração é a causa de inaptidão que mais cresce depois dos 50 (Veja M2V15 - I). Em qualquer idade pesam também a **mente**, o **sono** e o uso de **remédios e álcool**, que não aparecem num exame de rotina e dependem da conversa franca com o examinador (Veja M2V7 e M2V8).",
          "O exame segue o organismo de cima a baixo: história, coração com **eletrocardiograma** nas idades previstas, pressão, pulmões, **visão** de longe, de perto e de cores, **audição**, sistema nervoso, mente, urina e, quando indicado, exames de sangue. Cada parte responde a uma pergunta prática: este corpo enxerga o painel, ouve o rádio, raciocina sob estresse e continua estável durante a jornada inteira? Quem precisa de lentes, por exemplo, recebe a **restrição** de voar com elas e com um par de reserva (Veja M2V4).",
          "**Como prevenir e amenizar.** Antes do exame, o tripulante marca a consulta com folga antes do vencimento, leva os laudos e a lista de remédios e declara tudo o que mudou desde o último exame. Entre um exame e outro, o RBAC 67 e o Anexo 1 mandam não voar quando se sabe de uma **diminuição da aptidão** e informar a ANAC ou o examinador, sobretudo depois de cirurgia, internação, remédio novo de uso contínuo ou gravidez (Veja M3V1 - II). O passageiro não precisa de certificado: a decisão de voar dele passa pelo médico assistente e, quando a companhia pede, pelo formulário médico (MEDIF).",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v1-1-exame.jpg'), legenda: "O exame procura no corpo o que pode falhar na cabine; a classe define com que rigor." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Classes de certificado · quem precisa de cada uma",
              colunas: ["Classe (ANAC)", "Quem precisa", "Classe na ICAO"],
              linhas: [
                ["1ª classe", "Piloto de linha aérea, comercial e de tripulação múltipla", "Classe 1"],
                ["2ª classe", "Piloto privado, comissário, mecânico de voo, piloto de balão e aluno-piloto, exceto de planador", "Classe 2, exceto o comissário, que não tem classe no Anexo 1"],
                ["3ª classe", "Controlador de tráfego aéreo, fora da regulação da ANAC", "Classe 3"],
                ["4ª classe", "Piloto de aerodesportivo, piloto de planador e aluno de planador", "Classe 2 para o planador"],
                ["5ª classe", "Piloto remoto", "Classe 3"],
              ],
            },
          },
          { paragrafo: 3, midia: 'classe-certificado' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Validade do certificado médico · ANAC",
              colunas: ["Licença ou função", "Validade", "Quando encurta"],
              linhas: [
                ["Piloto de linha aérea, comercial e de tripulação múltipla", "12 meses", "6 meses a partir dos 40 no transporte com um só piloto levando passageiros e a partir dos 60 no transporte aéreo público"],
                ["Mecânico de voo", "12 meses", "Quando o examinador ou a ANAC indicam pelo caso clínico"],
                ["Piloto privado, de balão, de planador, aerodesportivo e aluno-piloto", "60 meses antes dos 40", "24 meses dos 40 aos 49 e 12 meses a partir dos 50"],
                ["Comissário", "60 meses antes dos 60", "24 meses a partir dos 60"],
                ["Piloto remoto", "48 meses", "Quando o examinador ou a ANAC indicam pelo caso clínico"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v1-1-cabine.jpg'), legenda: "Quanto mais pessoas dependem do corpo de quem voa, mais curto o prazo e mais rigoroso o exame." } },
          {
            paragrafo: 6,
            tabela: {
              titulo: "O que o exame protege no corpo",
              colunas: ["Sistema", "O que pode falhar na cabine", "Por que o exame olha"],
              linhas: [
                ["Coração e vasos", "Arritmia, infarto e desmaio: incapacitação súbita", "O coração com pouco sangue nas coronárias perde o ritmo e deixa o cérebro sem fluxo em segundos (Veja M2V2)"],
                ["Cérebro e nervos", "Convulsão, AVC e perda de consciência", "O neurônio não guarda energia e para quando falta sangue ou glicose (Veja M2V6)"],
                ["Mente", "Atenção, julgamento e humor alterados: incapacitação sutil", "Depressão, ansiedade e uso de substâncias mudam a decisão sem sinal externo (Veja M2V7)"],
                ["Olhos", "Painel, tráfego e cores mal vistos", "A cabine exige foco de longe, de perto e cores corretas nas luzes e telas (Veja M2V4)"],
                ["Ouvidos", "Rádio e alarmes mal ouvidos", "O ruído da cabine esconde os agudos, onde estão as consoantes da fala (Veja M2V3)"],
                ["Metabolismo", "Hipoglicemia com confusão e desmaio", "O cérebro depende da glicose do sangue a cada minuto (Veja M2V9)"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · classes de certificado",
              colunas: ["Momento", "Tripulante", "Médico examinador"],
              linhas: [
                ["Antes do exame", "Marcar com folga e levar laudos e lista de remédios: o exame só avalia o que conhece", "Revisar a história e os laudos antes de examinar: boa parte do risco está na história"],
                ["Entre exames", "Não voar com diminuição da aptidão e procurar o examinador após cirurgia, internação, remédio contínuo novo ou gravidez", "Explicar o que obriga a nova avaliação: entre um exame e outro, quem decide é o tripulante"],
                ["Na renovação", "Conferir a classe e o prazo para a idade: o prazo encurta aos 40, aos 50 e aos 60", "Ajustar o prazo ou a restrição ao caso clínico: a norma permite encurtar a validade"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '1.2',
      titulo: "Requisitos por sistema",
      pergunta: "O que cada sistema do corpo precisa mostrar para receber o CMA em cada classe, e o que torna o candidato inapto ou apto com restrição?",
      conteudo: {
        texto: [
          "O **RBAC 67** organiza os requisitos por sistema do corpo, na mesma ordem em cada classe: mente, sistema nervoso, coração, pulmão, aparelho digestivo, metabolismo, sangue, rins, gestação, ossos, ouvido e nariz, olhos, audição e dentes. O examinador chega a uma de três decisões: **apto**, **apto com restrição**, com as condições escritas no campo de observações do CMA, ou **não apto**, com o direito de recorrer à ANAC. Ele leva em conta a função, o tratamento disponível e o prognóstico, e pode julgar inapto quem tem uma condição não listada que afete a segurança, desde que justifique em relatório (Veja M3V1 - I).",
          "A **validade** conta de dois jeitos. Na primeira concessão, ou quando o CMA está vencido ou suspenso, ela vale a partir da data do exame. Na revalidação de um CMA ainda válido feita até **45 dias** antes do vencimento, o novo prazo começa no vencimento anterior, e o tripulante não perde dias. Quem fica mais de **5 anos** com o CMA vencido volta a fazer o exame inicial. Um CMA de classe mais alta vale no lugar de um mais baixo, mas subir de classe exige exame inicial. Entre os exames, quem percebe uma **diminuição da aptidão** deve informar a ANAC ou o examinador e deixar de voar até um novo julgamento.",
          "Na **mente** e no **sistema nervoso**, a lista é quase a mesma em todas as classes. Tornam inapto o histórico de transtorno mental orgânico, uso de substâncias, esquizofrenia, transtornos do humor, de ansiedade e de personalidade, além de epilepsia, AVC, aneurisma, hemorragia e tumor cerebral. A **depressão** tratada com antidepressivo torna inapto, a menos que o psiquiatra, com os detalhes do caso, considere o voo seguro. A **perda de consciência** recorrente e sem explicação torna inapto; o episódio único é julgado pelo examinador junto com a ANAC. O **eletroencefalograma** entra no exame inicial da 1ª, da 2ª e da 5ª classes, e o EEG com lentificação ainda permite o CMA se a ressonância do crânio não mostrar lesão (Veja M2V6 e M2V7).",
          "No **coração**, tornam inapto na 1ª, na 2ª e na 5ª classes a angina, a doença das válvulas, o marca-passo, a prótese valvar, o anticoagulante e a pressão mantida acima de **140 x 90 mmHg**, embora o anti-hipertensivo possa ser aceito. Depois de **infarto**, o piloto só volta após **1 ano**, com Holter, cintilografia, ecocardiograma e colesterol normais e parecer psiquiátrico favorável; depois de **angioplastia ou ponte** sem infarto, após **180 dias**. Nos dois casos, a decisão é **apto com restrição**, com validade de no máximo **6 meses**. O eletrocardiograma com teste de esteira é feito no exame inicial e, na 1ª classe, todo ano a partir dos 50 e a cada 2 anos dos 30 aos 49 (Veja M2V2).",
          "No **metabolismo**, a diabetes tratada com **insulina** torna inapto na 1ª, na 2ª e na 5ª classes. A glicemia abaixo de **50** ou acima de **140 mg/dL**, confirmada duas vezes, também; entre 50 e 69 ou entre 115 e 139, decide o examinador. Com antidiabético oral, o candidato pode ser apto depois de **60 dias** de observação com a glicemia entre 70 e 139 mg/dL, e o CMA do piloto vale no máximo 6 meses. O **IMC** de 40 ou mais torna inapto na 1ª e na 2ª classes. No sangue, o anticoagulante cumarínico torna inapto, e o traço falciforme é aceito se não houver risco de crise em voo. A **asma** torna inapto na 1ª, na 2ª e na 5ª classes, e o rim transplantado pode ser aceito em consulta com a ANAC (Veja M2V9, M2V11 e M2V14).",
          "Nos **olhos**, a 1ª classe pede **20/30** em cada olho e **20/20** com os dois, além de leitura de perto e a 1 metro; a 2ª e a 5ª pedem 20/40 em cada olho e 20/30 com os dois, e o piloto privado com voo por instrumentos segue a 1ª. Lentes são aceitas, com óculos de reserva, e a cirurgia refrativa, depois de 6 meses. Na **audição**, a audiometria aceita perda de até **35 dB** em 500, 1.000 e 2.000 Hz e **50 dB** em 3.000 Hz; quem falha ainda pode receber o CMA com a restrição de não voar onde o rádio é necessário. Na **gestação**, a 1ª e a 2ª classes tornam inapta desde a confirmação; a 4ª aceita a gravidez de baixo risco entre a **12ª e a 26ª semana**, e a 5ª, até a **34ª semana** (Veja M2V3, M2V4 e M2V13).",
          "**Como prevenir e amenizar.** Antes do exame, o tripulante confere os requisitos da sua classe, faz os exames de laboratório e de imagem pedidos e leva os laudos dos especialistas que acompanham qualquer condição crônica. Marca a revalidação até 45 dias antes do vencimento, para não perder dias de validade. Cuida do que mais tira pilotos do voo: pressão, açúcar, peso, colesterol, sono e saúde mental, e trata cedo. Depois de cirurgia, internação, remédio novo ou gravidez, informa a ANAC ou o examinador antes de voltar a voar. O examinador registra no CMA cada restrição e o que o candidato precisa cumprir para atuar.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v1-2-esteira.jpg'), legenda: "O eletrocardiograma com teste de esteira entra no exame inicial e, na 1ª classe, a cada 1 ou 2 anos conforme a idade." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Validade do CMA · como se conta (RBAC 67)",
              colunas: ["Situação", "Regra"],
              linhas: [
                ["Primeira concessão, CMA vencido ou suspenso", "Data do exame mais o prazo da categoria"],
                ["Revalidação até 45 dias antes do vencimento", "Vencimento anterior mais o prazo da categoria"],
                ["Revalidação com mais de 45 dias de antecedência", "Data do exame mais o prazo da categoria"],
                ["CMA vencido há mais de 5 anos", "Novo exame inicial da classe"],
                ["Indicação clínica", "O examinador ou a ANAC podem reduzir o prazo, com a justificativa registrada"],
                ["Subir de classe", "Exige exame inicial; descer de classe pode ser feito na revalidação"],
                ["Diminuição da aptidão", "Informar a ANAC ou o examinador e deixar de voar até novo julgamento"],
              ],
            },
          },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Exames mínimos por classe · RBAC 67",
              colunas: ["Exame", "1ª classe", "2ª classe", "4ª classe", "5ª classe"],
              linhas: [
                ["Laboratório", "Glicemia, com hemoglobina glicada se limítrofe, colesterol e frações, triglicerídeos, creatinina, hemograma, urina tipo I, ácido úrico, beta-HCG nas mulheres e tipagem sanguínea no inicial", "Os mesmos da 1ª classe", "Os da 1ª classe sem colesterol, urina e ácido úrico", "Os mesmos da 1ª classe"],
                ["Avaliação psicológica", "Inicial, depois de acidente ou incidente grave e a cada 5 anos", "Igual à 1ª classe", "Inicial e depois de acidente ou incidente grave", "Inicial ou quando solicitada"],
                ["Eletroencefalograma", "Inicial; na revalidação, a critério do examinador", "Igual à 1ª classe", "Não exigido", "Igual à 1ª classe"],
                ["Eletrocardiograma e esteira", "Inicial; na revalidação, todo ano a partir dos 50 e a cada 2 anos dos 30 aos 49", "Inicial; na revalidação, a cada 2 anos a partir dos 50", "Só eletrocardiograma, a partir dos 40 anos", "Inicial; na revalidação, a cada 24 meses a partir dos 50"],
                ["Radiografia de tórax", "Inicial; na revalidação, se houver suspeita", "Igual à 1ª classe", "Inicial; na revalidação, a critério do examinador", "Só se houver suspeita"],
                ["Audição", "Audiometria no inicial; a cada 5 anos antes dos 40 e a cada 2 anos a partir dos 40", "Piloto privado como na 1ª classe; demais, voz normal a 2 metros", "Voz normal a 2 metros em pelo menos um ouvido", "Audiometria no inicial e pelo menos a cada 4 anos"],
                ["Dentes e seios da face", "Exame odontológico em todo exame, odontograma a cada 5 anos e radiografia dos seios da face no inicial", "Exame odontológico só para pilotos", "Não exigidos", "Não exigidos"],
              ],
            },
          },
          { paragrafo: 3, midia: 'requisitos-classe' },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Critérios · mente e sistema nervoso",
              colunas: ["Condição", "Não apto", "Apto com restrição ou após avaliação"],
              linhas: [
                ["Transtornos mentais da CID-10", "Histórico ou diagnóstico de transtorno orgânico, por substâncias, psicótico, do humor, de ansiedade ou de personalidade, em todas as classes", "Sem previsão de restrição no RBAC 67"],
                ["Depressão com antidepressivo", "Regra geral, em todas as classes", "Apto se o psiquiatra, com os detalhes do caso, considerar o exercício seguro"],
                ["Epilepsia", "Em todas as classes", "Sem previsão de aptidão"],
                ["Eletroencefalograma alterado", "Com grafoelementos epileptiformes, na 1ª, na 2ª e na 5ª classes", "Com lentificação: apto se a ressonância do crânio não mostrar lesão estrutural significativa"],
                ["Perda de consciência", "Recorrente e sem explicação médica satisfatória", "Episódio único: o examinador julga em conjunto com a ANAC"],
                ["AVC, aneurisma, hemorragia ou tumor cerebral", "Em todas as classes", "Sem previsão de aptidão"],
                ["Enxaqueca com sintomas focais", "Na 1ª, na 2ª e na 5ª classes", "Não listada na 4ª classe"],
                ["Hemiplegia, hemiparesia ou paraplegia", "Na 1ª, na 2ª e na 5ª classes", "4ª classe: apto se um instrutor de voo atestar proficiência suficiente"],
              ],
            },
          },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Critérios · coração",
              colunas: ["Condição", "Não apto", "Apto com restrição ou após avaliação"],
              linhas: [
                ["Angina, doença valvar, marca-passo, prótese valvar, transplante ou anticoagulante", "Na 1ª, na 2ª e na 5ª classes", "Sem previsão de aptidão"],
                ["Pressão arterial", "Mantida acima de 140 x 90 mmHg", "Apto com anti-hipertensivo, se não afetar a segurança"],
                ["Infarto em piloto", "Antes de 1 ano ou sem os exames exigidos", "Após 1 ano, com Holter, cintilografia, ecocardiograma e lipidograma normais ou cateterismo, sem IMC de 30 ou mais com cintura acima de 102 cm nos homens ou 88 cm nas mulheres, e parecer psiquiátrico favorável; apto com restrição, até 6 meses"],
                ["Infarto em não piloto da 2ª classe", "Antes de 6 meses", "Após 6 meses, sem insuficiência cardíaca, angina, arritmia grave ou coração muito aumentado, com lipidograma e cintilografia ou cateterismo normais; apto com restrição, até 6 meses"],
                ["Angioplastia ou ponte sem infarto", "Antes de 180 dias", "Após 180 dias, com Holter e cintilografia normais, ou prova de esforço no não piloto, e cateterismo com pontes abertas no piloto; apto com restrição, até 6 meses"],
                ["Pré-excitação no eletrocardiograma", "Enquanto a via anômala existir", "Após ablação: no mínimo 3 meses e reestudo eletrofisiológico sem a via"],
                ["Prolapso da valva mitral", "Com sintomas, arritmia ou doença cardíaca associada", "Apto se assintomático, com teste ergométrico máximo, Holter de 24 horas e ecocardiograma normais"],
                ["Arritmias e bloqueios", "Sem investigação adequada", "Investigados e sem probabilidade de afetar a segurança"],
                ["4ª classe", "Condição cardíaca que afete a segurança, a critério do examinador", "Anamnese, ausculta e eletrocardiograma a partir dos 40 anos"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v1-2-lampada.jpg'), legenda: "Visão de longe, de perto e de cores: os números mudam de classe para classe." } },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Critérios · metabolismo, sangue, rins, pulmão e digestivo",
              colunas: ["Condição", "Não apto", "Apto com restrição ou após avaliação"],
              linhas: [
                ["Diabetes com insulina", "Na 1ª, na 2ª e na 5ª classes", "4ª classe: só a diabetes descompensada torna inapto"],
                ["Glicemia", "Abaixo de 50 ou acima de 140 mg/dL, confirmada duas vezes em dias diferentes", "Entre 50 e 69 ou entre 115 e 139 mg/dL: a critério do examinador ou da ANAC"],
                ["Antidiabético oral", "Sem controle satisfatório", "Após 60 dias com a glicemia acima de 69 e abaixo de 140 mg/dL; validade máxima de 6 meses, na 2ª classe só para pilotos"],
                ["Hipoglicemia reativa ou de difícil controle", "Em todas as classes", "Sem previsão de aptidão"],
                ["Obesidade", "IMC de 40 ou mais, na 1ª e na 2ª classes", "Abaixo de 40, avaliação dos fatores de risco do coração"],
                ["Coagulação", "Anticoagulante cumarínico, trombofilia ou distúrbio hemorrágico, na 1ª, na 2ª e na 5ª classes", "Sem previsão de aptidão"],
                ["Anemia, doença da medula, esplenomegalia ou traço falciforme", "Sem investigação, ou com risco de crise hemolítica no traço falciforme", "Investigada e sem probabilidade de afetar a segurança, a critério da ANAC"],
                ["Rins e vias urinárias", "Doença ou sequela, inclusive cálculo, sem investigação; nefrectomia mal compensada", "Rim transplantado sem rejeição e com boa função: apto em consulta com a ANAC"],
                ["Pulmão", "Asma, tuberculose ativa, hipertensão pulmonar, pneumotórax não resolvido, doença bolhosa ou tumor de tórax, na 1ª, na 2ª e na 5ª classes", "Lesões inativas ou cicatrizadas; doença crônica investigada e sem risco; na 4ª classe, julgamento do examinador"],
                ["Aparelho digestivo", "Sequela que possa causar incapacitação em voo, como estenose ou compressão", "Cirurgia com remoção ou desvio: apto se a incapacitação em voo não for provável"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Requisitos · olhos e audição por classe",
              colunas: ["Requisito", "1ª classe", "2ª classe", "4ª classe", "5ª classe"],
              linhas: [
                ["Visão de longe", "20/30 em cada olho e 20/20 com os dois", "20/40 em cada olho e 20/30 com os dois; o piloto privado IFR segue a 1ª classe", "20/40 em cada olho", "20/40 em cada olho e 20/30 com os dois"],
                ["Visão de perto", "J1 entre 30 e 50 cm e J6 a 100 cm", "J1 entre 30 e 50 cm", "Não especificada", "J1 entre 30 e 50 cm"],
                ["Cores", "Tabelas de cores ou as cores básicas da aviação", "Igual à 1ª classe", "Não especificada", "Igual à 1ª classe; se falhar, restrição a operações em que a cor não é indispensável"],
                ["Visão monocular", "Só na revalidação ou no exame depois de acidente, com o olho bom dentro do padrão", "Piloto como na 1ª classe; não piloto, aceita", "Aceita com 20/30 e avaliação de proficiência por examinador credenciado", "Na revalidação, ou quando não precisa ver a aeronave diretamente"],
                ["Audição", "Audiometria: até 35 dB em 500, 1.000 e 2.000 Hz e 50 dB em 3.000 Hz, em cada ouvido", "Piloto privado como na 1ª classe; demais, voz normal a 2 metros com os dois ouvidos", "Voz normal a 2 metros em pelo menos um ouvido", "Audiometria como na 1ª classe; pode ser atendida com um só ouvido"],
                ["Se a audição falhar", "Discriminação da fala no ruído e voz a 2 metros; ou restrição sem rádio bilateral e sem atuar como comissário", "Restrição sem rádio bilateral e sem atuar como comissário", "Restrição sem rádio bilateral", "Discriminação da fala e voz a 2 metros; ou restrição sem rádio bilateral"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Critérios · olhos, ouvidos, gestação, ossos e dentes",
              colunas: ["Condição", "Não apto", "Apto com restrição ou após avaliação"],
              linhas: [
                ["Necessidade de lentes", "Proibido usar lente de contato e óculos ao mesmo tempo no mesmo olho", "Apto com restrição: usar a correção e levar óculos de reserva; lentes de contato monofocais e sem cor"],
                ["Cirurgia refrativa", "Antes de 6 meses", "Após 6 meses, com ofuscamento e sensibilidade ao contraste normais se pedidos"],
                ["Estrabismo e desvio dos olhos", "Heterotropia ou forias acima do limite na 1ª, na 2ª e na 5ª classes", "Estereopsia reduzida ou desvio com reserva fusional suficiente: apto"],
                ["Labirinto", "Distúrbio vestibular permanente", "Distúrbio passageiro: inapto só até se restabelecer"],
                ["Tímpano", "Doença do tímpano que afete a segurança; trompa de Eustáquio obstruída de forma permanente", "Perfuração simples e seca, se cumpre os requisitos de audição"],
                ["Fala", "Gagueira, disartria ou defeito da fala que dificulte a comunicação", "Sem previsão de aptidão"],
                ["Gravidez", "1ª e 2ª classes: desde a confirmação", "4ª classe: baixo risco entre a 12ª e a 26ª semana; 5ª classe: baixo risco até a 34ª semana; depois do parto, novo exame"],
                ["Ossos e articulações", "Doença ativa, hérnia de disco com sintomas neurológicos ou desvio da coluna sintomático", "Amputação, prótese ou órtese: investigação específica e decisão da ANAC; na 4ª classe, avaliação por examinador credenciado"],
                ["Dentes", "Cárie profunda, doença periodontal, curativo ou canal em tratamento, na 1ª classe e nos pilotos da 2ª", "Prótese que mantém a mastigação e a fala: aceita"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · requisitos por sistema",
              colunas: ["Momento", "Tripulante", "Médico examinador"],
              linhas: [
                ["Antes do exame", "Conferir os requisitos da classe e levar os exames e laudos pedidos: o que falta adia a decisão", "Pedir os exames da classe e da idade: o eletrocardiograma, a audiometria e a avaliação psicológica têm prazos próprios"],
                ["Na revalidação", "Marcar até 45 dias antes do vencimento: o novo prazo começa no vencimento anterior", "Registrar no CMA cada restrição e o que o candidato precisa cumprir para atuar"],
                ["Entre os exames", "Cuidar de pressão, açúcar, peso, colesterol, sono e saúde mental e informar a diminuição da aptidão antes de voar", "Reduzir a validade quando o caso pede e justificar no registro"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '1.3',
      titulo: "Regulação internacional",
      pergunta: "Se o corpo humano é o mesmo em todo lugar, por que cada país tem a sua regra, e o que todas têm em comum?",
      conteudo: {
        texto: [
          "A **ICAO**, agência da ONU criada pela Convenção de Chicago, publica no **Anexo 1** os padrões mínimos de licença e de exame médico. Cada Estado escreve a própria norma a partir deles: no Brasil, o **RBAC 67** da ANAC; nos Estados Unidos, o **14 CFR Part 67** da FAA; na Europa, a **Part-MED** da EASA. A fisiologia é a mesma, mas os países medem o risco de jeitos diferentes, e o tripulante que trabalha fora precisa conhecer a regra da autoridade que emitiu a sua licença.",
          "O Anexo 1 fixa a **validade** contada da data do exame: **12 meses** para as licenças comercial, de tripulação múltipla e de linha aérea, **60 meses** para o piloto privado, de planador e de balão e **48 meses** para o controlador e o piloto remoto. Com a idade, os prazos encurtam: **6 meses** a partir dos 40 para o piloto comercial que leva passageiros sozinho e a partir dos 60 no transporte comercial, e **24 meses** para o privado, o controlador e o piloto remoto depois dos 40. O Anexo 1 também pede que os Estados apliquem **gestão da segurança** ao exame médico, analisando os casos de incapacitação em voo, e promovam a saúde de quem voa.",
          "A **FAA** usa três classes: a **1ª** para o comandante de linha aérea, a **2ª** para o piloto comercial e a **3ª** para o privado e o aluno. A 1ª classe vale 12 meses antes dos 40 anos e 6 meses depois, para os privilégios de linha aérea; a 2ª, 12 meses; a 3ª, 60 meses antes dos 40 e 24 meses depois. Para o voo privado existe ainda o **BasicMed**: quem já teve certificado depois de julho de 2006 voa aviões de até 12.500 lb, cerca de 5.670 kg, com até 7 ocupantes, 18.000 ft e 250 nós, fazendo um curso a cada 24 meses e um exame com o próprio médico a cada 48 meses, sem remuneração e só nos Estados Unidos, no México e nas Bahamas.",
          "Na Europa, a **Classe 1** vale para as licenças comercial, de tripulação múltipla e de linha aérea, a **Classe 2** para o piloto privado e o **LAPL** para aeronaves leves. O primeiro exame de Classe 1 só pode ser feito num **centro aeromédico**, o AeMC. Depois do acidente de 2015 nos Alpes, em que o copiloto lançou o avião contra as montanhas, a Europa passou a exigir das empresas **apoio entre pares**, **avaliação psicológica** antes do início na linha e **testes de álcool**, regras em vigor desde fevereiro de 2021 (Veja M2V7).",
          "Quando o corpo não atende ao padrão, as regras não fecham a porta de uma vez. O Anexo 1 permite emitir o certificado se uma **conclusão médica credenciada** mostrar que a segurança não fica comprometida, com as limitações necessárias. A FAA tem a **emissão especial**, com relatórios periódicos do médico assistente, e a **SODA**, para defeitos que não mudam, como a perda de um olho, depois de o piloto demonstrar que voa bem. A Europa usa **limitações**, como voar só com outro piloto qualificado. No Brasil, a ANAC julga os recursos contra o parecer do examinador.",
          "Entre um exame e outro, a responsabilidade é de quem voa. O Anexo 1 proíbe exercer a licença quando o titular sabe de uma **diminuição da aptidão** que possa comprometer a segurança, e o RBAC 67 manda informar a ANAC ou o examinador e deixar de voar até um novo julgamento. A FAA proíbe voar sabendo de condição que impediria o certificado ou usando remédio que a cause. A Europa lista quando procurar o examinador **sem demora**: cirurgia ou procedimento invasivo, início de remédio de uso contínuo, lesão ou doença importante, gravidez, internação e a primeira necessidade de lentes. Voar escondendo a condição põe o corpo em risco a bordo e pode custar a licença, o seguro e a carreira.",
          "**Como prevenir e amenizar.** Antes de trabalhar ou voar sob outra autoridade, o tripulante confere qual certificado médico ela exige e com que validade, e guarda cópias dos laudos e dos certificados. Quem tem emissão especial ou limitação cumpre os relatórios e os exames de acompanhamento no prazo, porque o certificado depende deles. Depois de cirurgia, internação, remédio novo ou gravidez, procura o examinador antes de voltar a voar, e não depois. O examinador explica por escrito cada limitação e o que muda se a condição piorar.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v1-3-terminal.jpg'), legenda: "A mesma fisiologia, regras diferentes: quem voa sob outra autoridade confere o certificado que ela exige." } },
          { paragrafo: 2, midia: 'regulacao-comparar' },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Regulação internacional · classes e validade",
              colunas: ["Autoridade", "Classes e quem precisa", "Validade mais curta"],
              linhas: [
                ["ICAO (Anexo 1)", "Classe 1 comercial e linha aérea; Classe 2 privado, planador, balão, navegador e mecânico; Classe 3 controlador e piloto remoto", "6 meses para o piloto comercial a partir dos 40 com passageiros e um só piloto e a partir dos 60"],
                ["ANAC (RBAC 67)", "Cinco classes, com o comissário na 2ª e o piloto remoto na 5ª", "6 meses na 1ª classe, nas mesmas situações da ICAO"],
                ["FAA (14 CFR 67)", "1ª linha aérea, 2ª comercial, 3ª privado e aluno, além do BasicMed", "6 meses na 1ª classe a partir dos 40, para os privilégios de linha aérea"],
                ["EASA (Part-MED)", "Classe 1 comercial e linha aérea, Classe 2 privado e LAPL para aeronaves leves", "6 meses na Classe 1 a partir dos 40 com passageiros e um só piloto e a partir dos 60"],
              ],
            },
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Quando o corpo não atende ao padrão",
              colunas: ["Autoridade", "Caminho", "O que o corpo precisa mostrar"],
              linhas: [
                ["ICAO", "Conclusão médica credenciada, com limitações", "Que a condição não compromete a segurança na função"],
                ["FAA", "Emissão especial com relatórios ou SODA", "Estabilidade comprovada nos relatórios ou, no defeito que não muda, capacidade demonstrada em voo"],
                ["EASA", "Limitação no certificado, como voar só com outro piloto qualificado", "Risco aceito porque o segundo piloto assume se o primeiro falhar (Veja M3V1 - V)"],
                ["ANAC", "Recurso à ANAC contra o parecer do examinador", "Laudos que sustentem a aptidão para a função"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · regulação internacional",
              colunas: ["Momento", "Tripulante", "Médico examinador"],
              linhas: [
                ["Antes de voar sob outra autoridade", "Conferir o certificado exigido e a validade: cada autoridade tem os próprios prazos", "Informar as diferenças da regra local: o mesmo achado pode ter caminhos diferentes"],
                ["Com emissão especial ou limitação", "Cumprir relatórios e exames no prazo: o certificado depende deles", "Registrar por escrito a limitação e o que a faria cair"],
                ["Depois de cirurgia, internação ou remédio novo", "Procurar o examinador antes de voltar a voar: a diminuição da aptidão suspende o direito de voar", "Reavaliar antes do retorno e registrar a decisão"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '1.4',
      titulo: "Examinador",
      pergunta: "Quem pode examinar o tripulante, e o que o examinador procura no corpo além do que o tripulante conta?",
      conteudo: {
        texto: [
          "O **médico examinador** é o médico autorizado pela autoridade a fazer o exame e a emitir, negar ou adiar o certificado. No Brasil, o RBAC 67 prevê o **médico credenciado**, que examina a 2ª, a 4ª e a 5ª classes; o **médico cadastrado**, só para a 4ª; a **clínica credenciada**, que examina qualquer classe sob a responsabilidade do seu diretor técnico médico; e as **entidades conveniadas**. A **1ª classe**, portanto, só se faz em clínica credenciada, em entidade conveniada ou na própria ANAC, que também julga os recursos.",
          "Nos Estados Unidos, o **AME** é designado pela FAA e, diante de um achado, pode **emitir**, **negar** ou **adiar** o certificado, mandando o caso para a divisão médica da FAA. Para várias condições estáveis, depois da primeira autorização da FAA, o próprio AME pode renovar a emissão especial seguindo um protocolo, o **AASI**. Na Europa, o exame é feito pelo **AME** ou pelo **centro aeromédico**, e os casos de Classe 1 que não atendem ao padrão vão para a autoridade. Em todos, o examinador responde pela segurança, não pelo tratamento: esse continua com o médico assistente.",
          "O exame começa pela **história**: o tripulante assina uma declaração do próprio histórico pessoal, familiar e hereditário, exigida pelo Anexo 1. É ali que aparecem os mecanismos que nenhum aparelho mostra: o desmaio de meses atrás, a dor no peito ao subir a escada, o remédio para dormir, o uso de álcool, a tristeza que não passa. Nos Estados Unidos, a declaração falsa no formulário é crime federal. Em qualquer país, ela tira do examinador a chance de proteger o corpo de quem vai voar.",
          "Depois vem o corpo. O examinador mede pressão e pulso, ausculta coração e pulmões, examina a **visão** de longe, de perto e de cores, a **audição**, o equilíbrio e os reflexos, e pede o **eletrocardiograma** e os exames de sangue e urina conforme a classe e a idade (Veja M2V15 - III). Ele procura duas coisas: a doença que pode causar **incapacitação súbita**, como arritmia, infarto, convulsão ou hipoglicemia, e a que pode causar **incapacitação sutil**, como depressão, sono ruim, efeito de remédio ou declínio da atenção.",
          "O maior obstáculo não está no aparelho, e sim no **medo**. Numa pesquisa com mais de **3.500** pilotos dos Estados Unidos, **56%** contaram que já evitaram procurar atendimento médico por medo de perder o certificado. Quem esconde sintomas adia o diagnóstico de doenças tratáveis, como hipertensão, apneia do sono e depressão, que pioram sem cuidado e chegam à cabine num estágio mais grave. O examinador que acolhe, explica os caminhos e trata a declaração com sigilo protege mais do que o que só carimba (Veja M2V7).",
          "Erros dos dois lados custam caro. O tripulante que voa com condição escondida arrisca desmaio, arritmia ou decisão errada no comando, além de perder a cobertura do seguro e, num acidente, responder na investigação. No Brasil, quem voa em condição proibida pelo RBAC 67 tem o CMA cassado e só pode pedir outro depois de **180 dias**; a omissão de informação também leva à cassação, e a fraude, a pelo menos **12 meses** de espera e à comunicação ao Ministério Público. O examinador que deixa passar um achado ou emite fora das regras pode perder a credencial e responder perante a autoridade e o conselho de medicina. Por isso, na dúvida, o examinador **adia** e pede laudos, em vez de decidir sozinho.",
          "**Como prevenir e amenizar.** O tripulante escolhe o examinador com antecedência, leva os laudos do médico assistente com diagnóstico, tratamento, doses e tempo de estabilidade, e declara tudo, inclusive remédios sem receita. Pergunta o que significa cada restrição e o que a faria cair. O médico assistente escreve o laudo pensando na função de quem voa, e o examinador explica a decisão, registra as limitações e, na dúvida, adia o certificado e pede a informação que falta, em vez de negar ou emitir às pressas.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v1-4-consulta.jpg'), legenda: "O examinador responde pela segurança; o tratamento continua com o médico assistente." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Quem examina · Brasil, FAA e Europa",
              colunas: ["Onde", "Quem examina", "Qual classe"],
              linhas: [
                ["Brasil", "Médico credenciado", "2ª, 4ª e 5ª classes"],
                ["Brasil", "Médico cadastrado", "Só a 4ª classe"],
                ["Brasil", "Clínica credenciada, sob o diretor técnico médico, e entidades conveniadas", "Todas as classes, inclusive a 1ª"],
                ["Brasil", "ANAC", "Julga recursos e também pode examinar"],
                ["Estados Unidos", "AME designado pela FAA", "Emite, nega ou adia; o caso adiado vai à divisão médica da FAA"],
                ["Europa", "Centro aeromédico (AeMC)", "Primeiro exame de Classe 1 e as demais classes"],
                ["Europa", "AME", "Renovação da Classe 1, Classe 2 e LAPL"],
              ],
            },
          },
          { paragrafo: 3, midia: 'quem-examina' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "O que o examinador procura no corpo",
              colunas: ["Parte do exame", "O que procura", "Por que importa no voo"],
              linhas: [
                ["História e declaração", "Desmaio, dor no peito, remédios, álcool e humor", "É onde aparecem os mecanismos que nenhum aparelho mostra"],
                ["Pressão, pulso e ausculta", "Hipertensão, arritmia e sopro", "O coração doente pode falhar de repente e tirar o sangue do cérebro"],
                ["Eletrocardiograma", "Infarto silencioso e distúrbios do ritmo e da condução", "A placa e a arritmia podem não dar sintoma antes do evento"],
                ["Visão e cores", "Acuidade de longe e de perto, campo visual e cores", "O painel, as luzes e o tráfego exigem foco e cor corretos"],
                ["Audição", "Perda nos agudos", "O ruído da cabine esconde as consoantes do rádio"],
                ["Neurológico e mental", "Reflexos, equilíbrio, atenção e humor", "A incapacitação sutil muda a decisão sem sinal externo"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · examinador",
              colunas: ["Momento", "Tripulante", "Médico examinador"],
              linhas: [
                ["Antes da consulta", "Levar laudos com diagnóstico, tratamento, doses e estabilidade: o examinador decide pelo que vê e pelo que lê", "Pedir os laudos com antecedência: sem eles, o caso tende a ser adiado"],
                ["Na consulta", "Declarar tudo, inclusive remédios sem receita: a omissão tira a proteção do exame", "Acolher e explicar os caminhos: o medo de perder a licença leva a esconder sintomas"],
                ["Depois da decisão", "Entender a restrição e o que a faria cair", "Registrar a limitação e, na dúvida, adiar e pedir informação em vez de decidir às pressas"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '1.5',
      titulo: "Regra do 1%",
      pergunta: "Quanto risco de incapacitação súbita a aviação aceita num piloto, e de onde vem o número 1%?",
      conteudo: {
        texto: [
          "A **regra do 1%** nasceu no começo dos anos 1980, em reuniões de cardiologia aeronáutica, para decidir quais pilotos com doença do coração podiam voar. A ideia foi tratar o corpo do piloto como se trata qualquer sistema crítico da aeronave, que deve causar uma falha catastrófica menos de **1 vez a cada 1 bilhão de horas** de voo. A mesma meta passou a valer para os acidentes fatais de causa médica.",
          "A conta segue o voo. As fases críticas, **decolagem e pouso**, ocupam cerca de **10%** do tempo de voo. Se um piloto fica incapacitado numa delas, numa operação com **dois pilotos**, o outro assume, e só cerca de **1 em 100** dessas incapacitações termina em acidente; num estudo em simulador, foi 1 em 400. Somando, a fase crítica e o segundo piloto reduzem o risco mil vezes. Para chegar a 1 acidente em 1 bilhão de horas, cada piloto pode ter até **1 incapacitação em 1 milhão de horas**, o que, em 8.760 horas por ano, dá cerca de **1% ao ano**.",
          "No corpo, **incapacitação súbita** é qualquer falha que tira o piloto do comando de repente: arritmia, infarto, desmaio, convulsão, AVC, hipoglicemia ou cólica renal intensa. Num estudo com mais de **16 mil** pilotos de 1ª classe do Reino Unido, a taxa anual de incapacitação foi de **0,25%**, subindo de cerca de **0,1%** entre 20 e 39 anos para **0,42%** entre 50 e 59 e **1,2%** entre 60 e 69. Nas incapacitações em pleno voo, as causas **psiquiátricas** foram mais típicas que as do coração (Veja M2V7 e M2V14 - II).",
          "A regra vale para o voo com **dois pilotos**. No voo com um só piloto não há quem assuma, e o mesmo risco pesa muito mais; no voo privado, a pessoa expõe menos gente e a regra é mais flexível. A própria autoridade da Nova Zelândia lembra que o 1% **não é uma regra fixa**: na prática, com risco anual abaixo de 1% o certificado sai sem restrição; de 1% a menos de 2%, sai com restrição na 1ª classe e sem restrição na 2ª; de 2% a menos de 4%, só a 2ª classe é provável; acima de 4% a 5%, nenhum certificado é provável.",
          "A restrição mais usada para manter alguém no voo com risco um pouco acima do limite é a de voar **só com outro piloto qualificado**. Ela usa o mesmo raciocínio da conta: se o primeiro piloto falhar, o segundo assume, e o risco que chega ao passageiro cai cem vezes. Por isso o piloto com uma condição tratada, estável e acompanhada pode seguir voando, desde que nunca sozinho no comando, enquanto o tratamento e os exames de controle mostrarem que o risco não subiu (Veja M3V1 - III).",
          "O número tem limites. Ele depende de estimar o risco de cada pessoa, e as calculadoras de risco foram feitas para a população geral: na Nova Zelândia, a triagem baseada nelas deixou passar mais da metade dos pilotos que tiveram um evento. A conta também capta mal a **incapacitação sutil**, como a fadiga, o efeito de remédios e as doenças da mente, que não desligam o piloto de uma vez, mas pioram a decisão. É por isso que a medicina aeroespacial passou a buscar o risco de cada um (Veja M3V1 - VI).",
          "**Como prevenir e amenizar.** O piloto reduz o próprio risco controlando o que mais pesa no coração e no cérebro: pressão, colesterol, açúcar, peso, cigarro, álcool e sono, e não voa doente, cansado ou com remédio novo sem orientação. Faz os exames de controle no prazo, porque é a estabilidade comprovada que sustenta o certificado. O examinador estima o risco anual com dados publicados, registra o raciocínio e, quando o risco passa um pouco do limite, considera a restrição de voar com outro piloto antes de negar.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v1-5-aproximacao.jpg'), legenda: "Decolagem e pouso ocupam cerca de 10% do voo e concentram o risco de uma incapacitação virar acidente." } },
          { paragrafo: 2, midia: 'animacao-regra-1' },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Regra do 1% · a conta passo a passo",
              colunas: ["Passo", "Número", "O que significa"],
              linhas: [
                ["Meta da aviação", "1 acidente fatal de causa médica em 1 bilhão de horas", "O mesmo nível exigido dos sistemas críticos da aeronave"],
                ["Fase crítica", "10% do tempo de voo", "Decolagem e pouso, quando não há tempo para reagir"],
                ["Segundo piloto", "1 em 100 incapacitações vira acidente", "O outro piloto assume o comando"],
                ["Risco aceito por piloto", "1 em 1 milhão de horas", "1 bilhão dividido por 10 e por 100"],
                ["Em um ano", "Cerca de 1%", "1 em 1 milhão de horas vezes as 8.760 horas do ano"],
              ],
            },
          },
          { paragrafo: 3, midia: 'risco-aeromedico' },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Incapacitação por idade · pilotos de 1ª classe do Reino Unido",
              colunas: ["Idade", "Taxa anual de incapacitação"],
              linhas: [
                ["20 a 29 anos", "0,11%"],
                ["30 a 39 anos", "0,12%"],
                ["40 a 49 anos", "0,23%"],
                ["50 a 59 anos", "0,42%"],
                ["60 a 69 anos", "1,20%"],
                ["Todas as idades", "0,25%"],
              ],
            },
          },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Faixas de risco anual · Nova Zelândia",
              colunas: ["Risco anual de incapacitação", "Decisão provável"],
              linhas: [
                ["Abaixo de 1%", "Certificado sem restrição"],
                ["De 1% a menos de 2%", "1ª classe com restrição e 2ª classe sem restrição"],
                ["De 2% a menos de 4%", "2ª classe possível; 1ª classe improvável"],
                ["Acima de 4% a 5%", "Nenhum certificado provável"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v1-5-copiloto.jpg'), legenda: "Com dois pilotos, se um falha, o outro assume: é o segundo piloto que torna aceitável o risco de 1% ao ano." } },
          { paragrafo: 6, video: { fonte: require('@/assets/videos/m3v1-voo.mp4'), legenda: "O corpo do piloto também é um sistema crítico do voo." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · regra do 1%",
              colunas: ["Momento", "Tripulante", "Médico examinador"],
              linhas: [
                ["No dia a dia", "Controlar pressão, colesterol, açúcar, peso, cigarro, álcool e sono: são os motores do risco do coração e do cérebro", "Orientar a prevenção a cada exame: o risco cai com o controle dos fatores"],
                ["Com condição tratada", "Fazer os exames de controle no prazo: a estabilidade comprovada sustenta o certificado", "Estimar o risco anual com dados publicados e registrar o raciocínio"],
                ["Risco um pouco acima do limite", "Aceitar voar só com outro piloto qualificado: o segundo piloto absorve a falha", "Considerar a restrição antes de negar: ela devolve o risco à meta"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '1.6',
      titulo: "Medicina de precisão",
      pergunta: "Como sair de uma regra igual para todos e enxergar o risco do corpo de cada tripulante?",
      conteudo: {
        texto: [
          "A **medicina de precisão** troca a pergunta \"este piloto passa no padrão?\" por \"qual é o risco deste corpo, e o que o reduz?\". Ela usa a história, a família, os exames e a evolução de cada pessoa para decidir quem precisa investigar mais, quem pode voar com restrição e quem pode voar sem nenhuma. O próprio Anexo 1 pede que os Estados analisem os casos de incapacitação em voo, reavaliem as regras com esses dados e promovam a saúde de quem voa (Veja M3V1 - III).",
          "O alvo mais estudado é o **coração**. A doença das coronárias cresce em silêncio por anos, e o primeiro sinal pode ser um infarto ou uma morte súbita, sem dor prévia. A placa de gordura e cálcio estreita a artéria ou se rompe, forma um coágulo e corta o sangue do músculo cardíaco, que pode perder o ritmo em minutos. Um grupo da OTAN propôs triar tripulantes em **três fases**: calculadora de risco e eletrocardiograma em repouso para todos; exames de imagem para quem tem risco aumentado; e testes de isquemia e cateterismo para quem tem risco alto (Veja M2V2).",
          "O **escore de cálcio** é uma tomografia rápida que mede o cálcio nas coronárias. Zero significa risco muito baixo, com mortalidade abaixo de 0,1% ao ano, mas não exclui placa sem cálcio. Acima de **100**, os eventos passam de **1% ao ano**, e o grupo recomenda afastar o tripulante da função até terminar a investigação. A partir de **400**, considera-se o cateterismo. A **angiotomografia** mostra o canal da artéria, e um estreitamento acima de **50%** é um limite razoável para afastar e investigar. A radiação é baixa: cerca de 0,5 a 1 mSv no escore e 2 a 4 mSv na angiotomografia.",
          "Nem todo exame serve para isso. O **teste de esforço** sozinho tem sensibilidade de só 60% a 70% para a doença das coronárias e prevê mal os eventos, por isso não deve ser usado como único teste, embora continue útil para medir o condicionamento e a resposta da pressão. Os testes de **isquemia** entram depois da imagem, como segunda linha. Uma cintilografia de perfusão normal funciona como uma \"garantia\": o risco de evento importante fica abaixo de **1% ao ano** por cerca de **3 anos** (Veja M3V1 - V).",
          "A outra frente é a **mente**. Depois do acidente de 2015 nos Alpes, a Europa passou a exigir **apoio entre pares**, em que pilotos treinados acolhem com sigilo colegas em sofrimento, além de avaliação psicológica antes da linha e testes de álcool. A precisão aqui é encontrar cedo quem precisa de ajuda e tratar sem punir, porque o piloto que teme perder a licença esconde o sintoma, e é a doença sem tratamento que chega perigosa à cabine (Veja M2V7 e M3V1 - IV).",
          "Mais exame também tem preço para o corpo e para a carreira. A radiação se soma ao longo dos anos, os achados sem importância levam a novos exames, e o falso positivo pode tirar alguém do voo sem motivo. Por isso a triagem é guiada pelo risco, e não feita igual em todos. Os dados de saúde exigem sigilo, e o resultado serve primeiro à saúde do tripulante: a placa descoberta cedo é tratada com remédio, atividade física e controle dos fatores de risco, e o tratamento pode permitir o retorno ao voo.",
          "**Como prevenir e amenizar.** O tripulante conhece o próprio risco: pergunta ao examinador sobre pressão, colesterol, açúcar e história da família, e trata cedo o que aparecer. Procura o apoio entre pares ou o médico ao primeiro sinal de sofrimento, sem esperar a crise. O examinador usa a triagem em fases, escolhe o exame pela pergunta que quer responder, explica a radiação e o risco de achados sem importância e afasta só pelo tempo da investigação, com um plano de retorno.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v1-6-tomografia.jpg'), legenda: "Do padrão igual para todos ao risco de cada corpo: o exame certo para a pergunta certa." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Triagem do coração do tripulante · três fases",
              colunas: ["Fase", "Exames", "Para quem"],
              linhas: [
                ["1ª fase", "Calculadora de risco e eletrocardiograma em repouso", "Todos os tripulantes"],
                ["2ª fase", "Escore de cálcio, com ou sem angiotomografia; teste de esforço e ultrassom das artérias opcionais", "Quem tem risco aumentado"],
                ["3ª fase", "Teste de isquemia e, se preciso, cateterismo", "Quem tem risco alto"],
              ],
            },
          },
          { paragrafo: 3, midia: 'triagem-coronaria' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Escore de cálcio, angiotomografia e cintilografia · decisão",
              colunas: ["Resultado", "O que significa no coração", "Decisão aeromédica"],
              linhas: [
                ["Escore zero", "Sem cálcio nas coronárias, mas pode haver placa sem cálcio", "Risco muito baixo, com mortalidade abaixo de 0,1% ao ano"],
                ["Escore acima de 100", "Placa calcificada relevante, com eventos acima de 1% ao ano", "Afastar da função até terminar a investigação"],
                ["Escore de 400 ou mais", "Muito cálcio, e a angiotomografia pode não conseguir avaliar o canal", "Considerar cateterismo"],
                ["Estreitamento acima de 50% na angiotomografia", "Canal da artéria reduzido, com menos sangue para o músculo no esforço", "Limite razoável para afastar e investigar"],
                ["Cintilografia de perfusão normal", "Sem falta de sangue no músculo do coração no esforço", "Risco abaixo de 1% ao ano por cerca de 3 anos"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v1-6-pares.jpg'), legenda: "Apoio entre pares: encontrar cedo quem precisa de ajuda e tratar sem punir." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · medicina de precisão",
              colunas: ["Momento", "Tripulante", "Médico examinador"],
              linhas: [
                ["No exame periódico", "Perguntar pela pressão, colesterol, açúcar e história da família: conhecer o risco é o primeiro passo para baixá-lo", "Usar a triagem em fases: o exame de imagem vai para quem tem risco aumentado"],
                ["Ao primeiro sinal de sofrimento", "Procurar o apoio entre pares ou o médico sem esperar a crise: a doença tratada cedo não chega à cabine", "Acolher e tratar sem punir: o medo leva a esconder o sintoma"],
                ["Diante de um achado", "Tratar e cumprir o plano de retorno: o afastamento dura o tempo da investigação", "Explicar radiação e achados sem importância e afastar só pelo tempo necessário"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "O que acontece", "Proteção e prevenção"],
              linhas: [
                ["Coração e vasos", "Infarto, arritmia e morte súbita sem aviso; a placa rompida forma um coágulo e corta o sangue do músculo, que perde o ritmo", "Controle dos fatores de risco, triagem em fases e restrição de voar com outro piloto quando o risco passa do limite"],
                ["Cérebro e nervos", "Convulsão, AVC e desmaio; o neurônio não guarda energia e para em segundos sem sangue ou glicose", "História declarada, exame neurológico e afastamento até a estabilidade comprovada"],
                ["Mente", "Atenção, julgamento e humor alterados; depressão, ansiedade e substâncias mudam a decisão sem sinal externo", "Apoio entre pares, avaliação psicológica e tratamento sem punição"],
                ["Metabolismo", "Hipoglicemia com confusão e desmaio; o cérebro depende da glicose do sangue a cada minuto", "Controle do açúcar, remédios aceitos pela autoridade e monitorização prevista na norma (Veja M2V9)"],
                ["Olhos e ouvidos", "Painel, cores e rádio mal percebidos; o cristalino endurece com a idade e o ruído apaga os agudos", "Exame de visão e audição na validade da classe e lentes de reserva"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '1.1',
      pergunta: "No Brasil, qual classe de certificado médico precisa o piloto de linha aérea?",
      opcoes: [
        "2ª classe",
        "1ª classe",
        "4ª classe",
        "5ª classe",
      ],
      correta: 1,
      explicacao: "A 1ª classe vale para o piloto de linha aérea, o comercial e o de tripulação múltipla: são os que levam mais pessoas e têm o exame mais rigoroso.",
    },
    {
      topico: '1.1',
      pergunta: "Por que o exame médico procura tanto a incapacitação sutil quanto a súbita?",
      opcoes: [
        "Porque só a sutil causa acidentes",
        "Porque a sutil, como falhas de atenção, visão ou raciocínio, pode passar despercebida pela própria pessoa",
        "Porque a súbita não existe em pilotos jovens",
        "Porque a norma exige só exames de sangue",
      ],
      correta: 1,
      explicacao: "A incapacitação súbita tira o piloto do comando de repente; a sutil piora a decisão sem sinal externo, e por isso depende da história e da conversa franca.",
    },
    {
      topico: '1.2',
      pergunta: "No RBAC 67, quando o CMA revalidado continua contando do vencimento anterior, sem perder dias?",
      opcoes: [
        "Sempre",
        "Quando o exame é feito até 45 dias antes do vencimento",
        "Quando o exame é feito até 6 meses antes",
        "Só na 1ª classe",
      ],
      correta: 1,
      explicacao: "Feito até 45 dias antes, o novo prazo começa no vencimento anterior; fora disso, conta da data do exame. Vencido há mais de 5 anos, volta o exame inicial.",
    },
    {
      topico: '1.2',
      pergunta: "Depois de um infarto, quando o piloto pode voltar a ter o CMA no RBAC 67, e com que validade?",
      opcoes: [
        "Após 30 dias, sem restrição",
        "Nunca mais",
        "Após pelo menos 1 ano, com exames normais, como apto com restrição e validade de até 6 meses",
        "Após 180 dias, com validade de 12 meses",
      ],
      correta: 2,
      explicacao: "O piloto precisa de Holter, cintilografia, ecocardiograma e lipidograma normais, ou cateterismo, e parecer psiquiátrico; a decisão é apto com restrição, com validade máxima de 6 meses.",
    },
    {
      topico: '1.2',
      pergunta: "Uma piloto de planador, com CMA de 4ª classe, descobre uma gravidez de baixo risco. Quando ela pode ser julgada apta?",
      opcoes: [
        "Em nenhum momento da gravidez",
        "Entre a 12ª e a 26ª semana",
        "Até a 34ª semana",
        "Durante toda a gravidez",
      ],
      correta: 1,
      explicacao: "Na 4ª classe, a gravidez de baixo risco, com avaliação obstétrica e acompanhamento, é aceita entre a 12ª e a 26ª semana; na 5ª, até a 34ª; na 1ª e na 2ª, a tripulante fica inapta desde a confirmação.",
    },
    {
      topico: '1.3',
      pergunta: "O que o Anexo 1 da ICAO permite quando o candidato não atende a um requisito médico?",
      opcoes: [
        "Nada: o certificado é sempre negado",
        "Emitir sem nenhuma condição",
        "Emitir se uma conclusão médica credenciada mostrar que a segurança não fica comprometida, com as limitações necessárias",
        "Transferir a decisão para a companhia aérea",
      ],
      correta: 2,
      explicacao: "A conclusão médica credenciada permite manter no voo quem tem uma condição que não compromete a segurança, com limitações quando preciso.",
    },
    {
      topico: '1.3',
      pergunta: "Na Europa, quando o tripulante deve procurar o examinador sem demora?",
      opcoes: [
        "Só na data de renovação",
        "Depois de cirurgia, início de remédio contínuo, doença ou lesão importante, gravidez, internação ou primeira necessidade de lentes",
        "Só quando a companhia pedir",
        "Só depois de um acidente",
      ],
      correta: 1,
      explicacao: "Entre os exames, quem voa é responsável por não exercer a licença com diminuição da aptidão e por procurar o examinador nessas situações.",
    },
    {
      topico: '1.4',
      pergunta: "No Brasil, onde se faz o exame de 1ª classe?",
      opcoes: [
        "Com qualquer médico",
        "Só com médico cadastrado",
        "Em clínica credenciada, entidade conveniada ou na ANAC",
        "Na própria companhia aérea",
      ],
      correta: 2,
      explicacao: "O médico credenciado examina a 2ª, a 4ª e a 5ª classes; a 1ª fica com as clínicas credenciadas, as entidades conveniadas e a ANAC.",
    },
    {
      topico: '1.4',
      pergunta: "Numa pesquisa com mais de 3.500 pilotos dos EUA, quantos contaram ter evitado atendimento médico por medo de perder o certificado?",
      opcoes: [
        "5%",
        "17%",
        "56%",
        "90%",
      ],
      correta: 2,
      explicacao: "Mais da metade evitou atendimento: o medo adia o diagnóstico de doenças tratáveis, que chegam à cabine num estágio mais grave.",
    },
    {
      topico: '1.5',
      pergunta: "De onde vem o número 1% ao ano da regra do 1%?",
      opcoes: [
        "De 1 incapacitação em 1 milhão de horas vezes as 8.760 horas do ano",
        "Da média de faltas por doença dos pilotos",
        "Do número de pilotos com mais de 60 anos",
        "De uma escolha sem cálculo",
      ],
      correta: 0,
      explicacao: "A meta de 1 acidente em 1 bilhão de horas, dividida pelos 10% de fase crítica e pelo 1 em 100 que o segundo piloto não recupera, dá 1 em 1 milhão de horas por piloto, cerca de 1% ao ano.",
    },
    {
      topico: '1.5',
      pergunta: "Por que a restrição de voar só com outro piloto qualificado permite manter no voo quem tem risco um pouco acima do limite?",
      opcoes: [
        "Porque o outro piloto examina o primeiro antes do voo",
        "Porque, se o primeiro falhar, o segundo assume e o risco que chega ao passageiro cai cem vezes",
        "Porque o voo fica mais curto",
        "Porque a restrição dispensa o tratamento",
      ],
      correta: 1,
      explicacao: "É o mesmo raciocínio da conta do 1%: o segundo piloto é a barreira que transforma a incapacitação em evento sem acidente.",
    },
    {
      topico: '1.6',
      pergunta: "Segundo a proposta da OTAN, o que fazer com o tripulante com escore de cálcio acima de 100?",
      opcoes: [
        "Liberar sem restrição",
        "Afastar da função até terminar a investigação",
        "Cassar a licença definitivamente",
        "Repetir o escore em 10 anos",
      ],
      correta: 1,
      explicacao: "Acima de 100, os eventos passam de 1% ao ano: o tripulante é afastado só pelo tempo da investigação, com plano de retorno.",
    },
    {
      topico: '1.6',
      pergunta: "Por que o teste de esforço não deve ser o único exame para procurar doença das coronárias no tripulante?",
      opcoes: [
        "Porque usa radiação demais",
        "Porque sua sensibilidade é de só 60% a 70% e prevê mal os eventos",
        "Porque é proibido pela ICAO",
        "Porque só serve para passageiros",
      ],
      correta: 1,
      explicacao: "O teste de esforço continua útil para medir condicionamento e resposta da pressão, mas, sozinho, deixa passar doença e prevê mal os eventos.",
    },
    {
      topico: '1.6',
      pergunta: "Qual medida a Europa passou a exigir das empresas depois do acidente de 2015 nos Alpes?",
      opcoes: [
        "Proibir pilotos com menos de 30 anos",
        "Apoio entre pares, avaliação psicológica antes da linha e testes de álcool",
        "Exame médico mensal",
        "Três pilotos em todo voo",
      ],
      correta: 1,
      explicacao: "As regras, em vigor desde fevereiro de 2021, buscam encontrar cedo quem precisa de ajuda e tratar sem punir.",
    },
  ],
};
