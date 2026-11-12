// Missão 2 · Voo 13 — Saúde da mulher. Ramo editorial voo/M2V13; fotos e vídeo entram depois da produção.
// Gerado a partir de roteiro revisado (abertura + quatro tópicos de condição, no modelo de docs/modelo-sistemas.md).
// REGISTRO DE REVISÃO · 11/11/2026. Normas e fontes primárias conferidas:
// ANAC RBAC 67, Emenda 05 (Resolução 636, de 28/09/2021, vigência 01/11/2021; PDF pergamum.anac.gov.br, 11/11/2026):
//   67.13(l) nenhuma pessoa do sexo feminino exerce função a bordo em voo a partir da constatação da gravidez, salvo
//   4ª classe nas condições de 67.213; 67.93 (1ª classe) e 67.133 (2ª classe): (a) não apta assim que constatada a
//   gravidez, (b) dever de informar o examinador ou a ANAC, com o CMA suspenso, (c) após a licença pós-parto ou a
//   cessação da gravidez, pode ser julgada apta a critério do examinador ou da ANAC, após novo exame de revalidação;
//   67.213 (4ª classe): gestação de baixo risco com avaliação obstétrica e supervisão contínua, apta só entre a 12ª e a
//   26ª semana; 67.253 (5ª classe, piloto remoto): até a 34ª semana; 67.85(a)(4) e 67.125(a)(4): alterações
//   fisiopatológicas por hormônios de substituição, a critério do examinador ou da ANAC.
// ICAO Anexo 1, 6.3.2.21 (gestante inapta salvo avaliação obstétrica e supervisão que indiquem gestação de baixo risco)
//   e 6.3.2.21.1 (Recomendação: apta do fim da 12ª ao fim da 26ª semana), conforme IFALPA 18HUPBL02.
// EASA MED.B.045 IR 2.1–2.3 e AMC1/AMC2 (via UK CAA Obstetrics and Gynaecology GM, 11/11/2026): até o fim da 26ª semana;
//   1ª classe com OML; retomada após recuperação. UK CAA GM: aborto ou interrupção, inapta até relatório de recuperação
//   completa e, na 1ª classe, avaliação psicológica pelo AME; menorragia em investigação especializada, inapta até
//   relatório e hemoglobina normal; endometriose, primeiro diagnóstico inapta, volta sem sintomas e com analgesia
//   mínima; cirurgia ginecológica: ≥ 1 semana após curetagem, 2 semanas após laparoscopia com gás, 6 semanas após
//   histerectomia laparoscópica, 8 após vaginal e 12 após abdominal; menopausa e TRH: consultar médico e AME,
//   afastamento temporário pode ser considerado. UK CAA Medication Guidance v20 (26/01/2026): contraceptivos e TRH
//   aceitáveis sem efeitos adversos que distraiam; AINE aceitável conforme a condição de base.
// FAA Guide for AMEs: Pregnancy (gravidez normal não desqualifica; aconselhar sobre o 3º trimestre e o cinto);
//   Contraceptives and Hormone Replacement Therapy (22/01/2025): uso não desqualifica sem efeitos adversos; Do Not Fly
//   para anti-histamínicos sedativos e opioides (5 meias-vidas); ISRS: SSRI Decision Path (Veja M2V7).
// CDC Yellow Book, Pregnant Travelers (11/11/2026): companhias até 36 semanas; complicações mais frequentes no 1º e 3º
//   trimestres; contraindicações absolutas (trabalho de parto, sangramento, descolamento, pré-eclâmpsia atual ou prévia);
//   trombose ao menos 5 vezes maior na gestante; hipóxia da cabine sem problema fetal na gravidez normal; cinto
//   diagonal com a faixa abdominal baixa; radiação de pouco risco; corredor, água, movimento e meias de compressão.
// gpnotebook (IATA Medical Manual, 11ª ed., 2018; NICE Antenatal care): gemelar até 32 semanas; atestado após 28
//   semanas em muitas companhias; aborto espontâneo, estável, sem sangramento e sem dor há ≥ 24 h; dor ou sangramento
//   no início da gravidez contraindicam o voo; seguro que cubra o recém-nascido.
// CDC Yellow Book, Deep Vein Thrombosis: risco cerca de duas vezes maior após viagens de ≥ 4 h; CHEST 2012 (AT9):
//   viajantes de risco (gravidez, estrogênio) com caminhada, panturrilha, corredor e meia 15–30 mmHg abaixo do joelho.
// FDA Drug Safety Communication (15/10/2020): evitar AINE a partir de 20 semanas (oligoidrâmnio).
// FSRH (pílula esquecida): combinada, atraso > 24 h; progestágeno tradicional, janela de 3 h; desogestrel, 12 h.
// NICE NG23 (menopausa): diagnóstico após 12 meses sem menstruar acima de 45 anos; em geral entre 45 e 55 anos; TRH
//   transdérmica sem aumento do risco de trombose acima do basal, oral com aumento.
// IFALPA 18HUPBL02: privação de sono do trabalho em turnos associada a mais abortos espontâneos; gestante mais
//   suscetível à hipóxia; feto até 1 mSv após a comunicação (Veja M1V5 - III).
// Puerpério de cerca de 6 semanas; trombose mais provável no pós-parto que na gestação, sobretudo após cesárea: RCOG
//   Green-top Guideline 37a (2015); prazos de cesárea sem número próprio
//   ficam com o obstetra (nenhum prazo inventado). Amamentar na subida e na descida: aplicação da fisiologia da tuba
//   auditiva (Veja M2V3 - II). Leite materno e regras de líquidos: orientação de conferir com o aeroporto, sem número.
import type { Capitulo } from '../tipos';
import { liberacaoMulher } from '../liberacao/mulher';

export const mulher: Capitulo = {
  numero: 13,
  titulo: 'Saúde da mulher',
  tempoLeituraMin: 20,
  topicos: [
    {
      id: '13.1',
      titulo: "A mulher no voo",
      pergunta: "O que muda no corpo da mulher na cabine, da menstruação à gestação e à menopausa?",
      conteudo: {
        texto: [
          "Os **hormônios femininos**, sobretudo o **estrogênio** e a **progesterona**, não comandam só o útero e os ovários. Eles mexem nos **vasos**, na **coagulação**, na **respiração**, no **intestino** e na retenção de **líquidos**. Ao longo da vida, a mulher passa por fases bem diferentes: o **ciclo menstrual**, a **gestação**, o **pós-parto** e a **menopausa**. O voo não muda o ciclo por si, mas cada fase muda o jeito como o corpo responde à cabine.",
          "**Menos oxigênio.** Com a cabine a até 8.000 ft, a saturação de quem é saudável cai para cerca de 90% a 93% (Veja M2V1 - I). Na **gestação**, a progesterona estimula a respiração e o consumo de oxigênio sobe, mas o feto tem uma **hemoglobina própria**, que segura o oxigênio com mais força. Por isso, numa gravidez normal, essa queda não costuma causar problema ao bebê. Pesa quando a reserva já é curta: **anemia** importante, **doença falciforme**, **doença do coração** e feto com **crescimento restrito**.",
          "**Sangue que coagula mais.** O estrogênio da **pílula combinada** e da **terapia hormonal por via oral**, a **gravidez** e as primeiras semanas depois do **parto** aumentam os fatores de coagulação. Somados a horas sentada, com a panturrilha parada, eles favorecem a **trombose venosa** da perna, que pode subir para o pulmão (Veja M2V2 - VII). Na gestante, o risco de trombose é pelo menos **cinco vezes maior** que o de uma mulher não grávida, embora continue baixo em números absolutos.",
          "**Gás, nariz e ar seco.** Na gravidez, a progesterona deixa o intestino mais lento, e o **gás** preso se expande na subida e estufa a barriga (Veja M1V1 - II). A **rinite da gravidez** entope o nariz e dificulta abrir o ouvido na descida (Veja M2V3 - II). O **ar seco** da cabine, somado a **náuseas e vômitos** ou a uma **menstruação intensa**, desidrata e baixa a pressão; quem já tem **anemia** pelo sangramento sente mais a hipóxia (Veja M2V11 - II).",
          "**Jornada, fuso e radiação.** O **fuso horário** desloca o horário da **pílula** e dos hormônios, e uma dose atrasada além do limite deixa de proteger contra a gravidez. A **privação de sono** do trabalho em turnos foi associada a mais **abortos espontâneos**, além de pesar no desempenho (Veja M2V8 - V). E o **feto** é mais sensível à **radiação cósmica** que o adulto: depois de comunicada a gravidez, recomenda-se que ele receba no máximo **1 mSv** até o fim da gestação (Veja M1V5 - III).",
          "**Doenças, tratamentos e tipo de voo.** As condições deste voo são a **gestação** e suas complicações, o **parto**, a **perda gestacional** e a **gravidez ectópica**, a **cólica** e o **sangramento intenso**, a **endometriose**, a **contracepção hormonal** e a **menopausa**. A conduta vai do **expectante**, no ciclo normal e na gravidez sem complicação, ao **não invasivo**, com remédios, hormônios e meias de compressão, e ao **invasivo**: cesárea, curetagem e cirurgias ginecológicas, cada uma com o seu prazo. No jato **pressurizado**, pesam as horas sentada e a cabine a 8.000 ft; no avião leve **não pressurizado**, a altitude real e a falta de banheiro; no **helicóptero**, a vibração e os cintos sobre o abdome.",
          "**Como prevenir e amenizar.** Antes do voo, confira em que fase está e o que ela pede: a semana da gestação na ida e na volta, o horário da pílula no fuso de destino, a hemoglobina se o sangramento é intenso. Durante o voo longo, **beba água**, levante-se e mexa as panturrilhas, prefira o **corredor** e use o **cinto baixo**, sobre o quadril. A tripulante informa ao examinador a gravidez e qualquer remédio hormonal novo, porque ambos mudam a decisão sobre o certificado.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v13-1-nariz.jpg'), legenda: "Soro no nariz na descida: com a rinite da gravidez, a tuba auditiva custa a abrir, e o soro ajuda o ouvido a igualar a pressão." } },
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v13-1-cabine.jpg'), legenda: "Água aos poucos no voo longo: o ar seco da cabine resseca e desidrata, e beber ajuda a circulação." } },
          { paragrafo: 3, midia: 'animacao-panturrilha' },
          { paragrafo: 5, midia: 'mulher-voo' },
          {
            paragrafo: 2,
            tabela: {
              titulo: "O que muda em altitude",
              colunas: ["Fator do voo", "O que acontece no órgão", "Quem é mais vulnerável"],
              linhas: [
                ["Menos oxigênio", "A saturação da mãe cai para cerca de 90%; o feto compensa com hemoglobina própria, que segura mais oxigênio", "Anemia grave, doença falciforme ou do coração: a reserva de oxigênio já é curta e a cabine a esgota primeiro (Veja M2V11 - II)"],
                ["Horas sentada", "A panturrilha parada deixa o sangue lento nas veias da perna, e o coágulo se forma com mais facilidade", "Gestante, pós-parto ou estrogênio por via oral: os hormônios aumentam os fatores de coagulação (Veja M2V2 - VII)"],
                ["Gás que expande", "O gás do intestino cresce na subida e estufa a barriga", "Gestante: a progesterona deixa o intestino lento e o gás fica preso (Veja M1V1 - II)"],
                ["Ar seco", "O corpo perde água pela respiração e a pressão cai mais fácil ao levantar", "Náuseas e vômitos ou sangramento intenso: a perda de líquido já começou antes do voo"],
                ["Fuso e radiação", "O fuso desloca o horário da pílula; a radiação soma dose ao feto", "Pílula de progestágeno tradicional: a janela de atraso é de só 3 h; feto: é mais sensível à radiação que o adulto (Veja M1V5 - III)"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · a mulher no voo",
              colunas: ["Situação", "Passageira", "Tripulante"],
              linhas: [
                ["Voo longo com pílula combinada, gravidez ou pós-parto", "Pode voar caminhando, com água e meias de compressão: o sangue coagula mais e a perna parada favorece a trombose", "Mexer as pernas nas pausas e hidratar, porque a jornada longa soma imobilidade ao risco hormonal"],
                ["Viagem cruzando fusos", "Manter a pílula no horário de casa ou mudar aos poucos: o atraso além da janela tira a proteção", "Mesmo cuidado na escala, porque o horário muda a cada pernoite"],
                ["Gravidez confirmada", "Pode voar se a gestação está sem complicação e dentro do limite da companhia: o risco é a complicação longe de ajuda (Veja M2V13 - II)", "Informar o examinador; no Brasil, a 1ª e a 2ª classes ficam não aptas, porque a função a bordo soma radiação, jornada e risco obstétrico"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '13.2',
      titulo: "Gestação e voo",
      pergunta: "Até quando a gestante pode voar como passageira, e por que a tripulante grávida para antes?",
      conteudo: {
        texto: [
          "A **gestação** dura cerca de 40 semanas, divididas em três **trimestres**. O corpo se adapta em todos os sistemas: o **volume de sangue** aumenta, o **coração** bate mais rápido, a **respiração** se aprofunda, o sangue fica mais **coagulável** e, no começo, **náuseas** e sono são comuns. Na cabine, a gravidez normal tolera bem a pequena queda de oxigênio, porque o feto tem hemoglobina própria (Veja M2V13 - I). O que muda o risco não é a altitude, e sim a **distância de um hospital** se algo der errado.",
          "As complicações obstétricas são mais frequentes no **primeiro** e no **terceiro trimestres**. No começo, pesam o **sangramento**, a ameaça de **aborto** e a **gravidez ectópica**; no fim, o **trabalho de parto prematuro**, a **pré-eclâmpsia** e os problemas da **placenta**. A bordo, nada disso tem tratamento, e o avião pode precisar **desviar**. Somam-se a **trombose** das horas sentada, o **enjoo**, a barriga estufada pelo gás e o ouvido que não abre por causa do nariz entupido (Veja M2V3 - II). Correm mais risco a gestação **múltipla**, a placenta baixa e o feto com crescimento restrito.",
          "**Para a passageira**, a maioria das companhias aceita o voo até **36 semanas** na gestação única e até **32 semanas** na múltipla; muitas pedem, depois de **28 semanas**, um **atestado** com a data provável do parto e a confirmação de que a gravidez segue sem complicação. Conta a idade gestacional **na data da volta**, não só na ida. Não devem voar a gestante em **trabalho de parto**, com **sangramento**, descolamento da placenta, **pré-eclâmpsia** atual ou anterior, ou outras complicações que o obstetra contraindique.",
          "**Para a tripulante**, a regra muda de país para país. No **Brasil**, o RBAC 67 julga **não apta** a candidata de 1ª e 2ª classes assim que a gravidez é constatada: ela deve informar o examinador ou a ANAC, e o certificado fica suspenso até a reavaliação depois do parto. A exceção é a 4ª classe, em que a gestação de baixo risco, acompanhada, pode ser julgada apta **entre a 12ª e a 26ª semana**. A **ICAO** recomenda o mesmo intervalo, com avaliação obstétrica. Na **EASA**, a piloto pode voar até o fim da **26ª semana**, na 1ª classe só com outro piloto a bordo. Para a **FAA**, a gravidez normal **não desqualifica**, e o examinador orienta sobre o terceiro trimestre e o cinto.",
          "Voar sem condição cobra do corpo e da carreira. Um **sangramento**, uma **pré-eclâmpsia** ou um **parto prematuro** a bordo põem em risco a mãe e o bebê, longe de um centro obstétrico, e podem forçar um **desvio**. A passageira fora do limite pode ter o **embarque recusado**, e o **seguro de viagem** pode não cobrir o parto nem o recém-nascido. No Brasil, a tripulante que voa grávida sem informar o examinador descumpre o RBAC 67, e o voo fica sem certificado válido, com reflexo no seguro e numa investigação.",
          "Os remédios pedem cuidado dobrado. Para dor e febre, o **paracetamol** é a escolha; os **anti-inflamatórios**, como ibuprofeno, devem ser evitados a partir da **20ª semana**, porque podem reduzir o líquido em volta do bebê. O **enjoo** tem remédios seguros na gestação, mas alguns dão **sono**. Quem tem risco alto de trombose pode receber **heparina** do obstetra antes do voo longo; para as demais, bastam movimento, água e **meias de compressão**. O **ferro** continua no horário de sempre.",
          "**Doenças, tratamentos e tipo de voo.** As complicações que mais pesam são a **pré-eclâmpsia**, o **diabetes gestacional**, a **placenta prévia**, a **anemia** e a **ameaça de parto prematuro**. A gravidez sem complicação pede conduta **expectante**: pré-natal em dia e as regras da companhia. O tratamento **não invasivo** inclui remédio para a pressão, insulina ou dieta no diabetes, ferro e repouso; o **invasivo**, a cerclagem do colo e a **cesárea**, que encerram o voo até a liberação do obstetra. No jato **pressurizado**, o risco é a distância do hospital; no avião leve **não pressurizado**, a altitude real e a turbulência; no **helicóptero**, a vibração e os cintos sobre a barriga.",
          "**Não voe hoje** com sangramento, contrações ou dor na barriga, perda de líquido, dor de cabeça forte com visão turva ou inchaço súbito, febre, ou dor e inchaço numa perna. Antes de comprar a passagem, o obstetra confere a **idade gestacional na ida e na volta**, se a gestação é única ou múltipla, a placenta, a pressão, a hemoglobina e a história de parto prematuro, e emite o atestado que a companhia pedir.",
          "**Como prevenir e amenizar.** Escolha o **assento do corredor**, perto do banheiro, e use o **cinto abaixo da barriga**, sobre o quadril; se houver alça de ombro, ela passa entre os seios. **Caminhe** a cada uma ou duas horas, mexa as panturrilhas sentada, beba água e use **meias de compressão** no voo longo. Leve na bagagem de mão o cartão do pré-natal, o atestado e os remédios. Evite refrigerantes e alimentos que formam gás antes do voo, e engula ou boceje na descida para abrir o ouvido.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 9, video: { fonte: require('@/assets/videos/m2v13-voo.mp4'), legenda: "Pés para cima e para baixo e alguns passos no corredor: a panturrilha bombeia o sangue e afasta a trombose." } },
          { paragrafo: 3, midia: 'gestacao-semanas' },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Gestação e voo · trimestre a trimestre",
              colunas: ["Fase", "Passageira", "Tripulante"],
              linhas: [
                ["1º trimestre, até 12 semanas", "Pode voar sem complicação; sangramento ou dor impedem até o diagnóstico: é a fase de maior risco de perda e de gravidez ectópica", "Brasil, 1ª e 2ª classes: não apta desde a confirmação; ICAO e 4ª classe: só a partir do fim da 12ª semana, porque o risco de perda é maior no começo"],
                ["2º trimestre, de 13 a 27 semanas", "Melhor fase para viajar: o enjoo costuma passar e as complicações são menos frequentes que no 1º e no 3º trimestres", "EASA e ICAO: apta até o fim da 26ª semana com avaliação obstétrica; Brasil, 1ª e 2ª classes: não apta, porque o RBAC 67 suspende a função a bordo"],
                ["3º trimestre, de 28 a 36 semanas", "Pode voar com atestado se a companhia pedir; limite de 36 semanas, ou 32 em gêmeos, porque o parto prematuro fica mais provável", "Não voar, porque passou do limite de 26 semanas e o risco obstétrico cresce"],
                ["Depois de 36 semanas", "Não voar: o parto pode começar a bordo, longe de ajuda", "Não voar, porque o parto está próximo"],
              ],
            },
          },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Liberação para voo · gestação",
              colunas: ["Situação", "Passageira", "Tripulante"],
              linhas: [
                ["Gestação única sem complicação, até 28 semanas", "Pode voar: a gravidez normal tolera a cabine e o risco obstétrico ainda é baixo", "ANAC 1ª e 2ª classes: não apta desde a confirmação, porque o RBAC 67 suspende a função a bordo na gravidez; EASA e ICAO: até a 26ª semana com avaliação obstétrica"],
                ["Gestação única de 28 a 36 semanas", "Pode voar com atestado se a companhia pedir: o parto prematuro fica mais provável e precisa estar descartado", "Não voar, porque passou do limite de 26 semanas da EASA e da ICAO e o risco obstétrico cresce"],
                ["Depois de 36 semanas, ou de 32 na gestação múltipla", "Não voar: o parto pode começar a bordo, longe de ajuda", "Não voar, porque o parto está próximo e a função exige atenção plena"],
                ["Sangramento, contrações, pré-eclâmpsia ou placenta prévia", "Não embarcar: a complicação pode se agravar no ar, sem tratamento possível", "Não voar, porque a gestação deixou de ser de baixo risco"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · gestação",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Paracetamol", "Alivia dor e febre sem dar sono", "FAA: aceito se a condição permitir voar, porque não altera a atenção"],
                ["Anti-inflamatório (ibuprofeno, naproxeno)", "A partir de 20 semanas, pode reduzir o líquido em volta do bebê", "Evitar na gravidez, porque o risco é do feto, não do voo"],
                ["Remédio para enjoo com anti-histamínico (doxilamina)", "Seguro na gestação, mas dá sono", "FAA: Do Not Fly; esperar 5 meias-vidas, porque o sono atrasa a reação"],
                ["Heparina de baixo peso molecular", "Previne trombose em quem tem risco alto; aumenta o sangramento num trauma", "Avaliação do examinador, porque o sangramento num trauma é mais grave (Veja M2V11 - II)"],
                ["Ferro oral", "Repõe a hemoglobina; pode irritar o estômago", "Compatível, porque não dá sono"],
              ],
            },
          },
          {
            paragrafo: 9,
            tabela: {
              titulo: "Como prevenir e amenizar · gestação",
              colunas: ["Situação", "Passageira", "Tripulante"],
              linhas: [
                ["Cinto de segurança", "Abaixo da barriga, sobre o quadril: assim a pancada vai para o osso e não para o útero", "Mesma regra, com a alça de ombro entre os seios, porque a carga do impacto se distribui melhor"],
                ["Voo longo", "Caminhar a cada 1 ou 2 h, beber água e usar meias de compressão: o risco de trombose é pelo menos 5 vezes maior", "Onde puder voar, levantar nas pausas, porque a jornada soma imobilidade"],
                ["Data da volta", "Conferir a semana da gestação na volta: é ela que a companhia confere no embarque", "Não se aplica: a escala segue a regra da autoridade"],
                ["Ouvido na descida", "Engolir ou bocejar e usar soro no nariz: a rinite da gravidez dificulta abrir o ouvido", "Não se aplica: no Brasil, a tripulante grávida não exerce a função"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '13.3',
      titulo: "Parto, perda gestacional e amamentação",
      pergunta: "Quando voltar a voar depois do parto ou de uma perda, e o que muda na amamentação?",
      conteudo: {
        texto: [
          "Depois do parto, o corpo leva cerca de **seis semanas** para voltar ao estado de antes: é o **puerpério**. O útero encolhe, o sangramento do pós-parto diminui aos poucos, e o sangue continua **mais coagulável** nas primeiras semanas. Muitas mães chegam a essa fase com **anemia** e pouco sono. A **cesárea** soma uma cirurgia abdominal. A **perda gestacional**, espontânea ou não, e a **gravidez ectópica**, que se implanta fora do útero, também deixam sangramento, dor e cansaço, além do peso emocional.",
          "O voo agrava o que ainda não cicatrizou. Nas semanas depois do parto, a **trombose** é mais provável que em qualquer fase da gravidez, sobretudo depois da cesárea, e as horas sentada somam o risco (Veja M2V2 - VII). A **anemia** pesa mais na cabine (Veja M2V11 - II), e o gás preso no abdome operado se expande na subida (Veja M1V1 - II). Na suspeita de **gravidez ectópica**, uma ruptura causa **hemorragia interna** que mata se não houver cirurgia rápida, por isso qualquer dor ou sangramento no começo da gravidez impede o voo até o diagnóstico.",
          "**Para a passageira**, não há um prazo único depois do parto: no parto normal sem complicação, quem decide é o obstetra, conforme o sangramento, a pressão e a hemoglobina; depois da **cesárea**, o prazo segue o de uma cirurgia abdominal (Veja M2V10). Depois de um **aborto espontâneo**, ameaçado ou completo, o manual médico da IATA aceita o voo quando a mulher está **estável, sem sangramento e sem dor há pelo menos 24 horas**. **Para a tripulante**, no Brasil, o RBAC 67 exige **novo exame de revalidação** depois da licença pós-parto ou do fim da gravidez, e a volta fica a critério do examinador ou da ANAC. Na EASA, a volta vem **depois da recuperação**; a CAA britânica afasta depois de perda ou interrupção da gravidez até um relatório de recuperação completa e, na 1ª classe, pede também uma avaliação psicológica.",
          "Voltar cedo demais tem custo. A bordo, uma **hemorragia**, uma **embolia pulmonar** ou uma infecção da ferida não têm tratamento, e o avião pode precisar desviar. A tripulante que retoma a função **sem a reavaliação** pós-parto voa sem certificado válido no Brasil, com reflexo no seguro e numa investigação. E o cansaço do puerpério, somado à privação de sono do recém-nascido, derruba a atenção como qualquer fadiga (Veja M2V8 - V).",
          "Na **amamentação**, os analgésicos comuns, como **paracetamol** e **ibuprofeno**, são compatíveis. A **heparina** receitada depois do parto para prevenir trombose aumenta o sangramento num trauma, e a tripulante que a usa passa pelo examinador (Veja M2V11 - II). A **depressão pós-parto** é comum e tratável; tristeza intensa ou pensamentos de fazer mal a si ou ao bebê pedem ajuda médica imediata, e o antidepressivo da tripulante segue regras próprias (Veja M2V7 - II). Para a mãe que viaja, **amamentar ou oferecer mamadeira na subida e na descida** ajuda o bebê a abrir o ouvido.",
          "**Doenças, tratamentos e tipo de voo.** As condições que mais pesam são a **hemorragia pós-parto**, a **anemia**, a **trombose**, a **infecção** da ferida ou do útero, a **depressão pós-parto**, o **aborto espontâneo** e a **gravidez ectópica**. A conduta é **expectante** no puerpério sem complicação e no aborto completo sem sangramento; o tratamento **não invasivo** inclui ferro, antibiótico, remédio para completar o esvaziamento do útero e heparina; o **invasivo**, a **curetagem**, a cirurgia da gravidez ectópica e a cesárea. No jato **pressurizado**, pesam as horas sentada; no avião leve **não pressurizado** e no **helicóptero**, a falta de banheiro e a vibração sobre o abdome operado.",
          "**Não voe hoje** com sangramento que encharca um absorvente em uma hora, febre, dor forte na barriga, dor ou inchaço numa perna, falta de ar ou dor no peito; nem com dor ou sangramento no começo da gravidez sem diagnóstico. O médico confere o tipo de parto e a data, a **hemoglobina**, a pressão, a cicatrização e o humor; para a tripulante, registra a recuperação completa para o exame de revalidação.",
          "**Como prevenir e amenizar.** Nas primeiras semanas depois do parto, prefira **voos curtos**, o **corredor** e o movimento das pernas, com água e meias de compressão se o médico indicar. Leve na bagagem de mão absorventes, a receita dos remédios e, se amamenta, a bomba de leite; o **leite materno** costuma ter exceção nas regras de líquidos, mas confirme com o aeroporto. Ofereça o peito ou a mamadeira ao bebê na subida e na descida. A tripulante marca o exame de revalidação antes de entrar na escala.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v13-3-amamentacao.jpg'), legenda: "Mamar na subida e na descida: engolir abre a tuba auditiva e alivia o ouvido do bebê." } },
          { paragrafo: 2, midia: 'pos-parto-voo' },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Liberação para voo · parto e perda gestacional",
              colunas: ["Situação", "Passageira", "Tripulante"],
              linhas: [
                ["Parto normal sem complicação", "Pode voar com a liberação do obstetra: sangramento, pressão e hemoglobina precisam estar estáveis", "ANAC: novo exame de revalidação depois da licença, porque o RBAC 67 exige reavaliação antes de voltar"],
                ["Cesárea", "Prazo do obstetra, como numa cirurgia abdominal: o gás e a ferida precisam se resolver", "Revalidação com a recuperação completa, porque a dor e a ferida limitam a evacuação"],
                ["Aborto espontâneo, ameaçado ou completo", "IATA: pode voar estável, sem sangramento e sem dor há pelo menos 24 h: o risco de hemorragia caiu", "Afastar até o relatório de recuperação completa e, no Brasil, a revalidação, porque sangramento e luto pesam na atenção"],
                ["Dor ou sangramento no começo da gravidez sem diagnóstico", "Não embarcar: pode ser gravidez ectópica, e a ruptura sangra por dentro", "Não voar, porque a hemorragia interna incapacita em minutos"],
              ],
            },
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Remédios e voo · pós-parto e amamentação",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Paracetamol e ibuprofeno", "Aliviam a dor sem dar sono; compatíveis com a amamentação", "FAA: aceitos se a condição permitir voar, porque não alteram a atenção"],
                ["Heparina depois do parto", "Previne trombose; aumenta o sangramento num trauma", "Avaliação do examinador, porque o sangramento num trauma é grave (Veja M2V11 - II)"],
                ["Opioide depois da cesárea", "Dá sono e lentidão", "FAA: Do Not Fly; esperar 5 meias-vidas, porque atrasa a reação"],
                ["Antidepressivo para depressão pós-parto", "Trata a depressão em semanas; pode dar sono no começo", "FAA: só os ISRS do programa, estável há 6 meses, porque a doença e os efeitos precisam estar controlados (Veja M2V7 - II)"],
              ],
            },
          },
          {
            paragrafo: 8,
            tabela: {
              titulo: "Como prevenir e amenizar · pós-parto",
              colunas: ["Situação", "Passageira", "Tripulante"],
              linhas: [
                ["Primeiras semanas depois do parto", "Voos curtos, corredor e pernas em movimento: o sangue ainda coagula mais", "Não se aplica: a tripulante ainda está em licença e sem revalidação"],
                ["Bebê na subida e na descida", "Oferecer o peito ou a mamadeira: engolir abre o ouvido do bebê", "Não se aplica: é cuidado da passageira"],
                ["Volta ao trabalho com amamentação", "Não se aplica: a regra é da tripulante", "Planejar onde tirar o leite e conferir os remédios com o examinador, porque fadiga e remédio novo pesam na atenção"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '13.4',
      titulo: "Ciclo menstrual, contracepção e endometriose",
      pergunta: "Cólica, sangramento intenso, pílula e fuso: o que muda a decisão de voar?",
      conteudo: {
        texto: [
          "O **ciclo menstrual** dura, em geral, de 21 a 35 dias. O estrogênio prepara o útero, a ovulação acontece no meio do ciclo e, sem gravidez, a queda da progesterona provoca a **menstruação**, de três a sete dias. A **cólica**, a **dismenorreia**, vem de substâncias que contraem o útero. O **sangramento intenso** faz perder ferro todo mês e leva à **anemia** (Veja M2V11 - II). Na **endometriose**, tecido parecido com o do útero cresce fora dele e causa dor que pode ser forte. Os **contraceptivos hormonais** usam estrogênio e progestágeno, ou só progestágeno, para impedir a ovulação.",
          "No voo, o ciclo pesa de três jeitos. A **cólica forte** e a dor da endometriose distraem e, nos casos intensos, incapacitam. O **sangramento intenso** com anemia soma tontura e cansaço à cabine a 8.000 ft, e o avião leve e o helicóptero quase nunca têm banheiro. E o **estrogênio da pílula combinada** aumenta a coagulação: depois de voos de **mais de 4 horas**, o risco de trombose já dobra, e o hormônio soma risco (Veja M2V2 - VII). O **fuso horário**, por fim, desloca o horário da pílula, e a dose atrasada além do limite deixa de proteger.",
          "**Para a passageira**, nada disso impede o voo: com a pílula combinada e um voo longo, valem as medidas contra a trombose; com sangramento intenso e anemia, o médico confere a hemoglobina antes. **Para a tripulante**, a FAA diz que **contraceptivos e terapia hormonal não desqualificam** se não houver efeito colateral, e a CAA britânica os aceita sem efeitos que distraiam. A CAA britânica afasta quem está em **investigação especializada de sangramento intenso** até o relatório e a hemoglobina normal, e quem tem o **primeiro diagnóstico de endometriose**, até ficar sem sintomas, com o mínimo de analgésico. Depois de **cirurgia ginecológica**, os prazos mínimos vão de **1 semana** depois de uma curetagem a **12 semanas** depois de histerectomia aberta. No Brasil, cabe ao examinador avaliar.",
          "Voar sem condição tem custo. Uma **cólica que incapacita** na aproximação ou um **desmaio** pela anemia tiram a tripulante da função na fase mais crítica. Uma **trombose** que ninguém preveniu pode virar **embolia pulmonar** horas depois do pouso. E o remédio novo ou a condição não declarados ao examinador deixam o certificado em situação irregular, com reflexo no seguro e numa investigação.",
          "Os **anti-inflamatórios**, como ibuprofeno e naproxeno, tratam a cólica sem dar sono. A **pílula** e o **DIU** hormonal ou de cobre não impedem o voo. Na troca de fuso, o que importa é o **intervalo** entre as doses: na pílula combinada, a dose conta como esquecida quando passa de **24 horas** de atraso; na pílula só de progestágeno tradicional, a janela é de **3 horas**, e na de desogestrel, de **12 horas**. Por isso, mantenha o horário de casa ou mude aos poucos. Remédios para **adiar a menstruação** ou para **sangramento intenso** são conferidos com o examinador antes de voar.",
          "**Doenças, tratamentos e tipo de voo.** As condições que mais pesam são a **dismenorreia**, o **sangramento uterino intenso**, os **miomas**, a **síndrome dos ovários policísticos** e a **endometriose**. A conduta é **expectante** na cólica leve; o tratamento **não invasivo** inclui anti-inflamatório, pílula ou DIU hormonal, ferro e, na síndrome dos ovários policísticos, hormônios ou metformina; o **invasivo**, a **laparoscopia**, a retirada de miomas e a **histerectomia**, cada uma com o seu prazo sem voar. No jato **pressurizado**, pesam a trombose do voo longo e o fuso; no avião leve **não pressurizado** e no **helicóptero**, a falta de banheiro.",
          "**Não voe hoje** com sangramento que encharca um absorvente em uma hora, tontura ou desmaio, dor pélvica súbita e forte, ou, para quem usa pílula, dor e inchaço numa perna, falta de ar ou dor no peito. O médico confere a **hemoglobina**, o tipo de contraceptivo e os fatores de trombose; para a tripulante, registra o diagnóstico, o tratamento e os efeitos colaterais.",
          "**Como prevenir e amenizar.** Leve na bagagem de mão absorventes ou coletor, o anti-inflamatório que já usa e a cartela da pílula. No voo longo, com a pílula combinada, **caminhe**, mexa as panturrilhas, beba água e use **meias de compressão** se tiver outro fator de risco. Programe um alarme para tomar a pílula no **horário de casa**. Antes de voar num avião sem banheiro, use proteção para o fluxo esperado. A tripulante informa ao examinador o contraceptivo e qualquer remédio novo.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v13-4-pilula.jpg'), legenda: "Pílula no quarto de hotel: manter o horário de casa evita que o fuso tire a proteção." } },
          { paragrafo: 6, figura: { imagem: require('@/assets/images/topicos/m2v13-4-colica.jpg'), legenda: "Cólica a bordo: o anti-inflamatório de costume, tomado antes do voo, controla a dor sem dar sono." } },
          { paragrafo: 5, midia: 'pilula-fuso' },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Liberação para voo · ciclo, contracepção e endometriose",
              colunas: ["Situação", "Passageira", "Tripulante"],
              linhas: [
                ["Cólica leve, controlada com anti-inflamatório", "Pode voar: o remédio controla a dor sem dar sono", "Pode voar, porque a dor controlada não tira a atenção"],
                ["Sangramento intenso em investigação ou com anemia", "Conferir a hemoglobina antes: a anemia soma tontura à cabine (Veja M2V11 - II)", "CAA britânica: não apta até o relatório e a hemoglobina normal, porque tontura e desmaio incapacitam"],
                ["Endometriose, primeiro diagnóstico", "Pode voar com a dor controlada: o voo não piora a doença", "CAA britânica: não apta até ficar sem sintomas, com o mínimo de analgésico, porque a dor forte pode incapacitar"],
                ["Pílula combinada e voo de mais de 4 h", "Pode voar com movimento e água; meias se houver outro fator: o estrogênio soma risco de trombose", "FAA: não desqualifica sem efeito colateral; mexer as pernas nas pausas, porque a jornada soma imobilidade"],
                ["Depois de cirurgia ginecológica", "Prazo do cirurgião: o gás da laparoscopia e a ferida precisam se resolver", "CAA britânica: de 1 semana após curetagem a 12 semanas após histerectomia aberta, porque a recuperação precisa estar completa"],
              ],
            },
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Remédios e voo · ciclo e contracepção",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Anti-inflamatório (ibuprofeno, naproxeno)", "Trata a cólica sem dar sono", "Aceito se a condição permitir voar, porque não altera a atenção"],
                ["Pílula, adesivo, anel ou DIU hormonal", "Os que têm estrogênio aumentam a coagulação", "FAA: não desqualificam sem efeito colateral, porque não alteram a atenção"],
                ["Remédio para adiar a menstruação ou para sangramento intenso", "Alguns aumentam a coagulação", "Conferir com o examinador antes de voar, porque não constam das listas consultadas"],
                ["Ferro oral", "Repõe o ferro perdido no sangramento", "Compatível; a volta depende da hemoglobina, porque a anemia reduz a reserva"],
              ],
            },
          },
          {
            paragrafo: 8,
            tabela: {
              titulo: "Como prevenir e amenizar · ciclo e contracepção",
              colunas: ["Situação", "Passageira", "Tripulante"],
              linhas: [
                ["Pílula e troca de fuso", "Alarme no horário de casa: o atraso além da janela tira a proteção", "Mesmo alarme a cada pernoite, porque a escala muda o fuso todo dia"],
                ["Menstruação num voo sem banheiro", "Usar proteção para o fluxo esperado: não há onde trocar a bordo", "Planejar a troca antes da decolagem, porque a preocupação tira a atenção"],
                ["Cólica forte no dia do voo", "Tomar o anti-inflamatório de costume antes: a dor controlada não atrapalha", "Não assumir a função se a dor não ceder, porque a dor forte incapacita"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '13.5',
      titulo: "Menopausa e terapia hormonal",
      pergunta: "Ondas de calor, sono ruim e terapia hormonal: o que pesa no voo depois dos 45 anos?",
      conteudo: {
        texto: [
          "A **menopausa** é a última menstruação, confirmada depois de **12 meses** sem menstruar; costuma chegar entre os **45 e os 55 anos**. Antes dela vem a **perimenopausa**, anos de ciclos irregulares. Com a queda do estrogênio, aparecem **ondas de calor**, **suor noturno**, **sono ruim**, mudanças de **humor**, dificuldade de **concentração** e secura vaginal. Por dentro, o osso perde massa mais depressa e o risco de **doença do coração** sobe. A retirada cirúrgica dos ovários provoca uma **menopausa cirúrgica**, de início súbito.",
          "No voo, os sintomas somam-se ao ambiente. Uma **onda de calor** numa cabine de comando quente, com fone e uniforme, incomoda e distrai. O **sono ruim** soma-se às noites de jornada e ao fuso, e a fadiga derruba a atenção (Veja M2V8 - V). A **terapia hormonal por via oral** aumenta o risco de trombose, que o voo longo multiplica (Veja M2V2 - VII); pela pele, em adesivo ou gel, esse aumento não aparece. E a **osteoporose** torna mais fácil a fratura numa turbulência ou numa evacuação (Veja M2V12 - III).",
          "**Para a passageira**, a menopausa não impede o voo; com terapia hormonal oral e voo longo, valem as medidas contra a trombose. **Para a tripulante**, a FAA diz que a **terapia hormonal não desqualifica** se não houver efeito colateral. A CAA britânica pede que a tripulante converse com o médico e com o examinador sobre sintomas e efeitos dos remédios, e admite um **afastamento temporário** enquanto o tratamento se ajusta. No **Brasil**, o RBAC 67 lista como causa de inaptidão as alterações que, a critério do examinador ou da ANAC, sejam efeito de **hormônios de substituição**: a decisão é individual.",
          "Voar sem ajustar o tratamento tem custo. A **fadiga** acumulada pelo sono ruim aumenta os erros, e um remédio novo que dá sono, tomado sem avisar o examinador, deixa o certificado irregular, com reflexo no seguro e numa investigação. Uma **trombose** não prevenida pode virar embolia horas depois do pouso.",
          "A **terapia hormonal** é o tratamento mais eficaz para as ondas de calor; quem tem útero recebe estrogênio com progestágeno. A via **pela pele** é a que menos mexe na coagulação. As opções **sem hormônio**, como alguns **antidepressivos**, a **gabapentina** e remédios mais novos, ajudam quem não pode usar hormônio, mas vários dão **sono**, e o antidepressivo da tripulante segue regras próprias (Veja M2V7 - II). **Cálcio**, **vitamina D** e exercício com carga protegem o osso. Qualquer remédio novo é conferido com o examinador antes de voar.",
          "**Doenças, tratamentos e tipo de voo.** As condições que mais pesam são os **sintomas vasomotores**, a **insônia**, a **osteoporose**, a **doença do coração**, que fica mais frequente depois da menopausa, e o **sangramento depois da menopausa**, que sempre precisa ser investigado. A conduta é **expectante** nos sintomas leves, com roupa em camadas, ventilação e sono regular; o tratamento **não invasivo** inclui a terapia hormonal e as opções sem hormônio; o **invasivo** fica para a causa do sangramento, como a histeroscopia, e para a retirada do útero ou dos ovários. No jato **pressurizado**, pesam a trombose e o fuso; no avião leve **não pressurizado** e no **helicóptero**, o calor da cabine parada ao sol (Veja M1V4 - I).",
          "**Não assuma a função** com sono tão ruim que dá sonolência durante o dia, nas primeiras semanas de um remédio novo que dá sono ou com ondas de calor que atrapalham a tarefa. Sangramento depois da menopausa não impede o voo por si, mas precisa de investigação. O médico confere os sintomas, o sono, a via e a dose do hormônio, os fatores de trombose e de doença do coração, e a densidade dos ossos.",
          "**Como prevenir e amenizar.** Use **roupa em camadas** e de tecido leve, mantenha a ventilação da cabine aberta e leve água. Proteja o **sono** antes das jornadas noturnas e dos voos que cruzam fusos (Veja M2V8 - IV). Com terapia hormonal **oral** e voo longo, caminhe, mexa as panturrilhas e pergunte ao médico se a via pela pele serve para você. A tripulante informa ao examinador o início ou a troca da terapia hormonal e de qualquer remédio para os sintomas.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v13-5-calor.jpg'), legenda: "Onda de calor na cabine de comando: ajustar a ventilação antes da fase crítica evita que o calor distraia." } },
          { paragrafo: 6, figura: { imagem: require('@/assets/images/topicos/m2v13-5-exercicio.jpg'), legenda: "Exercício com carga nas folgas: o osso responde à força e perde menos massa depois da menopausa." } },
          { paragrafo: 2, midia: 'menopausa-voo' },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Liberação para voo · menopausa",
              colunas: ["Situação", "Passageira", "Tripulante"],
              linhas: [
                ["Sintomas leves, sem remédio", "Pode voar com roupa leve e água: o calor incomoda, mas não põe em risco", "Pode voar se o sono e a atenção estão preservados, porque a fadiga é o que pesa na função"],
                ["Terapia hormonal estável, sem efeito colateral", "Pode voar; com via oral e voo longo, prevenir trombose: o estrogênio oral aumenta a coagulação", "FAA: não desqualifica; ANAC: avaliação do examinador, porque o RBAC 67 julga os efeitos dos hormônios de substituição"],
                ["Início ou troca de tratamento", "Pode voar; observar efeitos nos primeiros dias: tontura e sono aparecem no começo", "CAA britânica: afastamento temporário pode ser considerado, porque o ajuste da dose pode trazer efeitos que distraem"],
                ["Insônia com sonolência durante o dia", "Pode voar; evitar dirigir cansada depois do voo: a sonolência continua no solo", "Não assumir a função até tratar, porque a fadiga aumenta os erros (Veja M2V8 - V)"],
              ],
            },
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Remédios e voo · menopausa",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Terapia hormonal oral", "Controla as ondas de calor; aumenta a coagulação", "FAA: não desqualifica sem efeito colateral, porque não altera a atenção"],
                ["Terapia hormonal pela pele (adesivo ou gel)", "Controla as ondas de calor sem aumentar a trombose", "FAA: não desqualifica sem efeito colateral, porque não altera a atenção"],
                ["Antidepressivo para ondas de calor", "Reduz as ondas; pode dar sono ou náusea no começo", "FAA: só os ISRS do programa, com avaliação, porque o remédio age no cérebro (Veja M2V7 - II)"],
                ["Gabapentina e remédios novos para ondas de calor", "A gabapentina dá sono e tontura", "Conferir com o examinador antes de voar, porque podem atrasar a reação"],
              ],
            },
          },
          {
            paragrafo: 8,
            tabela: {
              titulo: "Como prevenir e amenizar · menopausa",
              colunas: ["Situação", "Passageira", "Tripulante"],
              linhas: [
                ["Onda de calor a bordo", "Roupa em camadas, ventilação aberta e água: o calor passa em minutos", "Ajustar a ventilação da cabine de comando antes da fase crítica, porque o calor distrai"],
                ["Jornada noturna ou fuso", "Dormir antes e evitar álcool: o sono já é frágil", "Proteger o sono e usar o cochilo planejado, porque a fadiga soma ao sono ruim (Veja M2V8 - VII)"],
                ["Terapia hormonal oral e voo longo", "Caminhar e mexer as panturrilhas: o estrogênio oral soma risco de trombose", "Mexer as pernas nas pausas, porque a jornada soma imobilidade"],
              ],
            },
          },
          {
            paragrafo: 8,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "O que acontece", "Proteção e prevenção"],
              linhas: [
                ["Útero e placenta", "Sangramento, contrações e parto prematuro sem tratamento a bordo; o útero grávido não tolera trauma e a placenta pode se descolar", "Limite de semanas da companhia, atestado e cinto abaixo da barriga"],
                ["Veias das pernas", "Trombose que pode virar embolia; o estrogênio, a gravidez e o pós-parto aumentam os fatores de coagulação", "Caminhar, mexer as panturrilhas, água e meias de compressão"],
                ["Sangue", "Anemia que soma tontura à cabine; o sangramento menstrual ou do parto leva o ferro que forma a hemoglobina", "Ferro e hemoglobina conferida antes do voo"],
                ["Feto", "Maior sensibilidade à radiação cósmica; as células do feto se dividem depressa e o dano ao DNA pesa mais", "Comunicar a gravidez cedo e manter a dose abaixo de 1 mSv (Veja M1V5 - III)"],
                ["Cérebro e sono", "Ondas de calor e sono ruim que derrubam a atenção; a queda do estrogênio desregula o centro da temperatura e o sono", "Tratar os sintomas, proteger o sono e avisar o examinador"],
                ["Ossos", "Fratura mais fácil na turbulência e na evacuação; sem estrogênio, o osso perde massa mais depressa", "Cálcio, vitamina D, exercício com carga e cinto afivelado"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '13.1',
      pergunta: "Por que, numa gravidez normal, a queda de oxigênio da cabine não costuma causar problema ao feto?",
      opcoes: [
        "Porque a cabine fica ao nível do mar",
        "Porque o feto tem hemoglobina própria, que segura o oxigênio com mais força",
        "Porque a gestante respira menos",
        "Porque a placenta produz oxigênio",
      ],
      correta: 1,
      explicacao: "A hemoglobina fetal capta o oxigênio com mais força, e a progesterona aumenta a respiração da mãe; o risco aparece quando a reserva já é curta, como na anemia grave.",
    },
    {
      topico: '13.1',
      pergunta: "Quanto o risco de trombose da gestante é maior que o de uma mulher não grávida?",
      opcoes: [
        "Igual",
        "Cerca de 50% maior",
        "Pelo menos 5 vezes maior",
        "100 vezes maior",
      ],
      correta: 2,
      explicacao: "O risco é pelo menos cinco vezes maior, embora continue baixo em números absolutos; caminhar, beber água e usar meias de compressão ajudam no voo longo.",
    },
    {
      topico: '13.2',
      pergunta: "Até quantas semanas a maioria das companhias aceita uma passageira com gestação única sem complicação?",
      opcoes: [
        "26 semanas",
        "28 semanas",
        "32 semanas",
        "36 semanas",
      ],
      correta: 3,
      explicacao: "A maioria aceita até 36 semanas na gestação única e 32 na múltipla; depois de 28 semanas, muitas pedem atestado. Conta a semana na data da volta.",
    },
    {
      topico: '13.2',
      pergunta: "No Brasil, o que acontece com a tripulante de 1ª ou 2ª classe quando a gravidez é confirmada?",
      opcoes: [
        "Voa até a 26ª semana",
        "É julgada não apta e informa o examinador ou a ANAC",
        "Voa só com outro piloto",
        "Nada muda até o terceiro trimestre",
      ],
      correta: 1,
      explicacao: "O RBAC 67 julga não apta a candidata de 1ª e 2ª classes assim que a gravidez é constatada; o limite de 26 semanas é da EASA e da recomendação da ICAO, e no Brasil vale só para a 4ª classe, a partir da 12ª semana.",
    },
    {
      topico: '13.2',
      pergunta: "Como a gestante deve usar o cinto de segurança?",
      opcoes: [
        "Sobre a barriga, bem apertado",
        "Abaixo da barriga, sobre o quadril",
        "Solto, para não apertar",
        "Sem cinto, depois de 28 semanas",
      ],
      correta: 1,
      explicacao: "Abaixo da barriga, sobre o quadril, a força de uma freada ou de uma turbulência vai para o osso, e não para o útero.",
    },
    {
      topico: '13.2',
      pergunta: "A partir de que semana da gestação os anti-inflamatórios, como o ibuprofeno, devem ser evitados?",
      opcoes: [
        "4ª semana",
        "12ª semana",
        "20ª semana",
        "Não precisam ser evitados",
      ],
      correta: 2,
      explicacao: "A partir da 20ª semana, eles podem reduzir o líquido em volta do bebê; para dor e febre, a escolha é o paracetamol.",
    },
    {
      topico: '13.3',
      pergunta: "Depois de um aborto espontâneo, quando o manual médico da IATA aceita o voo?",
      opcoes: [
        "Imediatamente",
        "Estável, sem sangramento e sem dor há pelo menos 24 horas",
        "Só depois de 6 semanas",
        "Só depois de uma curetagem",
      ],
      correta: 1,
      explicacao: "A IATA aceita o voo quando a mulher está estável, sem sangramento e sem dor há pelo menos 24 horas; a tripulante segue a regra da autoridade.",
    },
    {
      topico: '13.3',
      pergunta: "Por que dor ou sangramento no começo da gravidez, sem diagnóstico, impedem o voo?",
      opcoes: [
        "Porque a cabine piora o enjoo",
        "Porque pode ser gravidez ectópica, cuja ruptura causa hemorragia interna",
        "Porque a radiação aumenta",
        "Porque o cinto aperta o útero",
      ],
      correta: 1,
      explicacao: "A gravidez ectópica implantada fora do útero pode romper e sangrar por dentro, o que exige cirurgia rápida, impossível a bordo.",
    },
    {
      topico: '13.3',
      pergunta: "O que ajuda o bebê a abrir o ouvido na subida e na descida?",
      opcoes: [
        "Mantê-lo acordado sem mamar",
        "Amamentar ou oferecer a mamadeira",
        "Cobrir as orelhas",
        "Deitá-lo de bruços",
      ],
      correta: 1,
      explicacao: "Engolir abre a tuba auditiva e iguala a pressão do ouvido; por isso, mamar na subida e na descida ajuda.",
    },
    {
      topico: '13.4',
      pergunta: "Na pílula só de progestágeno tradicional, qual é a janela de atraso antes de a dose contar como esquecida?",
      opcoes: [
        "3 horas",
        "12 horas",
        "24 horas",
        "48 horas",
      ],
      correta: 0,
      explicacao: "A janela é de 3 horas na pílula de progestágeno tradicional, 12 horas na de desogestrel e 24 horas de atraso na combinada; por isso, no fuso, vale manter o horário de casa.",
    },
    {
      topico: '13.4',
      pergunta: "Para a FAA, a tripulante que usa pílula anticoncepcional:",
      opcoes: [
        "Está desqualificada",
        "Precisa de autorização especial",
        "Não é desqualificada se não houver efeito colateral",
        "Só voa com outro piloto",
      ],
      correta: 2,
      explicacao: "Contraceptivos e terapia hormonal não desqualificam para a FAA quando não há efeito colateral; o estrogênio, porém, pede cuidado contra a trombose no voo longo.",
    },
    {
      topico: '13.5',
      pergunta: "Qual via da terapia hormonal da menopausa menos mexe na coagulação?",
      opcoes: [
        "Comprimido",
        "Adesivo ou gel na pele",
        "Injeção mensal",
        "Todas iguais",
      ],
      correta: 1,
      explicacao: "Pela pele, o estrogênio não passa primeiro pelo fígado e não aumenta o risco de trombose como o comprimido.",
    },
    {
      topico: '13.5',
      pergunta: "Por que a menopausa pesa na tarefa da tripulante?",
      opcoes: [
        "Porque reduz a visão de cores",
        "Porque ondas de calor e sono ruim derrubam a atenção",
        "Porque impede o uso do fone",
        "Porque proíbe voos noturnos",
      ],
      correta: 1,
      explicacao: "A queda do estrogênio desregula o centro da temperatura e o sono; somada às jornadas noturnas e ao fuso, a fadiga aumenta os erros.",
    },
  ],
  liberacao: liberacaoMulher,
};
