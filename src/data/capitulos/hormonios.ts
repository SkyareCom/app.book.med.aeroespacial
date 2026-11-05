// Missão 2 (Sistemas) · Voo 9 — Hormônios e metabolismo (o número do voo é definido em secoes.ts).
// Escrito no modelo de Sistemas (docs/modelo-sistemas.md), com o detalhamento prático do padrão do jet lag, em
// 04/11/2026, a pedido do autor ("Siga para o próximo voo, M2V9 Hormônios e metabolismo"). A lista antiga (diabetes,
// tireoide, obesidade) ganhou o tópico de abertura e um tópico prático sobre insulina em viagem, e virou 5 tópicos.
// Apneia do sono e trombose já estão no M2V1 e no M2V2; aqui entram resumidas, com remissão.
//
// REGISTRO DE REVISÃO (04/11/2026) — fontes:
// - ICAO, Anexo 1, Cap. 6 (citado por IFALPA, 19POS05, Insulin treatment and flying): "Applicants with insulin-treated
//   diabetes mellitus shall be assessed as unfit" (6.3.2.16 na numeração citada); a maioria das autoridades não aceita o
//   piloto comercial que usa insulina. ICAO Doc 8984, Part III, Cap. 4 (metabolismo, nutrição e endocrinologia):
//   conteúdo não conferido nesta sessão [confirmar na referência].
// - ANAC, RBAC 67, Emenda 01 (Resolução 420, de 02/05/2017), 67.85 (1ª classe): (a) inapto com transtorno do
//   metabolismo, da nutrição ou endócrino que afete a segurança, inclusive (a)(2) obesidade com IMC 40 ou mais,
//   (a)(3) hiper e hipofunção endócrina significativa e (a)(4) efeito de hormônio de substituição; (b) não pode ter
//   diabetes insulino-dependente; (c) diabetes não tratado com insulina: apto se controlado só com dieta ou com dieta e
//   antidiabéticos; (f) hipoglicemiante oral: apto depois de 60 dias de observação com controle satisfatório, validade
//   máxima do CMA revalidado de 6 meses. 67.79(b)(1)(i)(F): IMC 30 ou mais, com cintura acima de 102 cm em homens, pesa
//   na revalidação depois de infarto. Texto da Emenda 05 (vigente) e da 2ª classe: [confirmar na referência]. Nota da
//   ANAC a umdiabetico.com.br (19/09/2023): não há estudos para flexibilizar as regras. O RBAC fala em "hipoglicemiantes
//   por via oral"; aqui o prazo de 60 dias foi aplicado aos antidiabéticos orais, inclusive a metformina [confirmar na
//   referência].
// - FAA, Guide for Aviation Medical Examiners: Diabetes Mellitus Type II — Medication Controlled (not insulin) (atualizado
//   em 28/01/2026): HbA1c até 9,0; adiar se hipoglicemia sintomática com 70 mg/dL ou menos, assintomática com 54 mg/dL
//   ou menos, hipoglicemia grave com ajuda de outra pessoa, insulina, pramlintida, doença do coração, dos nervos, dos
//   olhos ou dos rins, ou creatinina acima de 2,0. Acceptable Combinations of Diabetes Medications (09/2026): metformina
//   sozinha 14 dias; grupos C–G (glitazonas, GLP-1 e tirzepatida, gliptinas, acarbose, SGLT2, pramlintida) 30 dias;
//   sulfonilureias e glinidas 60 dias; acrescentar remédio dos grupos B–G 14 dias; ajuste de dose 48 h (B–G) ou 7 dias
//   (sulfonilureias e glinidas); insulina: 90 dias (3ª classe) e 180 dias com o protocolo de sensor contínuo (1ª e 2ª);
//   no máximo um remédio de cada grupo e até 3 remédios sem insulina; glinida não combina com GLP-1. ITDM Initial
//   Certificate Consideration Requirements: 6 meses de dados do sensor; tempo no alvo de 70 a 180 mg/dL de 70% ou mais;
//   abaixo de 54 mg/dL menos de 1%; abaixo de 70 mg/dL menos de 4%; acima de 250 mg/dL menos de 5%; GMI abaixo de 7%;
//   sensor usado 90% do tempo ou mais; teste de esforço a partir dos 40 anos. Federal Register, 07/11/2019 (84 FR 216):
//   protocolo com sensor contínuo abre a 1ª e a 2ª classe a quem usa insulina; 3ª classe pelo protocolo antigo ou pelo
//   novo. CACI Hypothyroidism (28/06/2023): estável, sem cansaço, alteração mental ou sintomas do pulmão, coração ou visão;
//   levotiroxina, liotironina, tireoide porcina ou liotrix; TSH abaixo de 10 no último ano. Weight Loss Medications:
//   orlistate 48 h; metformina, liraglutida, semaglutida ou tirzepatida para emagrecer: 1 semana no início e 48 h a cada
//   aumento ou troca; HbA1c até 6,4, sem diabetes e sem hipoglicemia que precisou de ajuda; não aceitos: fentermina
//   (sozinha ou com topiramato), benzfetamina, dietilpropiona, fendimetrazina, naltrexona com bupropiona, lorcasserina,
//   fenfluramina e Plenity; com sintoma que atrapalhe o voo, não voar (14 CFR 61.53). OSA: mais de 90% das pessoas com IMC
//   40 ou mais têm apneia que precisa de tratamento; até 30% das pessoas com apneia têm IMC abaixo de 30; o examinador
//   calcula o IMC e avalia o risco (sem corte único).
// - UK Civil Aviation Authority, Metabolic and endocrinology guidance material (pilotos; espelha EASA MED.B.025): diabetes
//   com insulina inapto pela regra, mas o protocolo permite certificar com limitação de voo com copiloto (OML) na 1ª
//   classe, só para quem já tem licença comercial; sensor contínuo aceito como monitoração principal no voo; sem insulina:
//   apto com controle estável, sem hipoglicemia, com remédio que não costuma causar hipoglicemia (1ª classe com OML).
//   Tireoide: inapto ao diagnóstico; apto com estado eutireoideo estável. Obesidade: IMC 35 ou mais só apto com avaliação
//   de risco, inclusive cardiovascular e triagem de apneia. GLP-1 e GIP/GLP-1 para obesidade (semaglutida, tirzepatida):
//   compatíveis com todas as classes; no início, inapto por ao menos 2 semanas e avaliação do examinador; ajuste de dose,
//   inapto por ao menos 72 h; produto comprado sem receita ou direto do fabricante desqualifica. Addison: cortisona levada
//   e disponível. Guidance on Thyroid Dysfunction (v1.2, 09/04/2024): hipo: troca de dose de levotiroxina de até 25 µg sem
//   sintomas não afasta; com sintomas, inapto até ficar sem sintomas; hiper: antitireoidiano sem efeito colateral não
//   desqualifica; 1ª classe: revisão oftalmológica dos movimentos dos olhos e da visão dupla; inapto até eutireoideo;
//   cirurgia e iodo radioativo: inapto até recuperação ou fim do tratamento e função estável; exame de sangue anual.
// - Garden et al., Universidade de Surrey (EASD, 24/09/2020; EurekAlert): 49 pilotos com insulina, 22.078 horas de voo,
//   38.621 medidas em 7,5 anos; medir antes do voo, a cada hora e 30 minutos antes do pouso; verde de 5 a 15 mmol/L,
//   âmbar de 4 a 4,9 ou de 15,1 a 20, vermelho abaixo de 4 ou acima de 20; no vermelho baixo, passar o comando ao
//   copiloto, comer 10 a 15 g de carboidrato rápido e medir de novo em 15 minutos; 97,69% das medidas no verde, 0,12% no
//   vermelho baixo; nenhuma incapacitação. IFALPA 19POS05: Reino Unido, Irlanda e Áustria com protocolo desde 2015
//   [confirmar na referência: a CAA britânica cita 2012]; Canadá aceita com copiloto.
// - CASA (Austrália), Type 2 Diabetes — high risk of hypoglycaemia: sulfonilureias, glitazonas e glinidas como risco alto;
//   CAA da Nova Zelândia, Diabetes type 2: metformina sozinha e dieta, bem controladas, sem significado aeromédico;
//   qualquer agente que cause hipoglicemia é significativo; hipoglicemia: prejuízo cognitivo até o coma; hiperglicemia
//   grave: sintomas visuais e cognitivos e cansaço.
// - King BR et al., Diabetes Care, 2011 (HealthManagement.org): bombas de insulina entregaram cerca de 1 a 1,4 unidade a
//   mais na subida e quase 1 unidade a menos na descida; desconectar antes da decolagem e tirar as bolhas, reconectar no
//   cruzeiro; depois do pouso, desconectar e preencher com 2 unidades; desconectar em descompressão; conversar com o
//   médico antes de mudar o uso.
// - Aerospace Medical Association, Medical Guidelines for Airline Travel, Diabetes (revisão de maio de 2003): insulina na
//   bagagem de mão, dividida em duas bolsas, em bolsa térmica; o porão pode congelar; não precisa de geladeira no voo;
//   cabine de 6.000 a 8.000 ft não afeta a maioria dos glicosímetros, mas frio, calor e altitude extremos podem; leste:
//   perder mais de 2 h pede menos insulina intermediária ou longa; oeste: ganhar mais de 2 h pode pedir dose extra de
//   rápida; medir antes das refeições a cada 4 a 6 h no voo; levar carboidrato extra para atraso; refeição "para
//   diabético" pode ter pouco carboidrato para o tipo 1; avisar a tripulação e levar identificação.
// - NHS, Type 1 diabetes and travel: carta do médico, identificação, levar algo que suba o açúcar rápido; hipoglicemia
//   abaixo de 4 mmol/L.
// - BMJ, agosto de 2006 (ScienceDaily): depois de iodo-131, alarmes de radiação podem disparar até 95 dias; o cartão do
//   hospital fala em até 12 semanas; levar o comprovante do tratamento.
// - CDC Yellow Book, Deep vein thrombosis and pulmonary embolism: obesidade (IMC 30 ou mais) é fator de risco; viagem de
//   mais de 4 horas; risco absoluto de 1 em 4.656 a 1 em 6.000 viagens; janela cerca de 2 vezes o risco, e 6 vezes com
//   IMC 30 ou mais; meias de 15 a 30 mmHg (ACCP) acima de 6 horas para quem tem risco.
// - NaTHNaC, TravelHealthPro, Supporting travellers with obesity (23/02/2024): faixas de IMC; síndrome de hipoventilação
//   da obesidade (IMC 30 ou mais, distúrbio respiratório do sono e PaCO2 de 45 mmHg ou mais), cerca de 90% com apneia,
//   risco de oxigênio baixo no voo; teste de hipóxia antes do voo; CPAP na bagagem de mão com carta; cirurgia bariátrica
//   no exterior: discutir antes com especialista. Ali M et al., Respirology, 2014 (EurekAlert): mesmo com oxigênio normal
//   de dia, pacientes com hipoventilação podem ter hipoxemia em voo.
// - ANAC, Resolução 280/2013, art. 3 e art. 9: passageiro com necessidade de assistência especial inclui mobilidade
//   reduzida; avisar 48 h antes, ou 72 h se precisar de acompanhante ou de documento médico.
// Condutas práticas sem número próprio (comer no horário, beber água, andar no corredor, levar lanche, ajustar o horário
// do remédio com o médico) são aplicações das fontes acima. Sem fonte: [confirmar na referência].

import { liberacaoHormonios } from '../liberacao/hormonios';
import type { Capitulo } from '../tipos';

const foto = (arquivo: number, legenda: string) => ({ imagem: arquivo, legenda });

export const hormonios: Capitulo = {
  numero: 9,
  titulo: 'Hormônios e metabolismo',
  tempoLeituraMin: 35,
  topicos: [
    {
      id: '9.1',
      titulo: 'Os hormônios no voo',
      pergunta: 'O que a cabine muda no açúcar, na tireoide e no peso?',
      conteudo: {
        texto: [
          "Os **hormônios** são mensageiros do sangue. A **insulina** tira o açúcar do sangue e o leva às células; a **tireoide** regula a velocidade do metabolismo; a gordura também produz sinais que mexem com o apetite e com a pressão. O voo raramente altera esses hormônios de forma direta: ele muda a **rotina** em volta deles, como a hora de comer, o horário do remédio, o sono e o movimento.",
          "A cabine fica pressurizada entre **6.000 e 8.000 ft**, com menos **oxigênio** (Veja M2V1 - I). A falta de açúcar e a falta de oxigênio dão sinais parecidos: confusão, tremor, suor, raciocínio lento (Veja M2V1 - IV). Quem tem obesidade com respiração fraca durante o sono parte de uma reserva menor e pode ter o oxigênio baixo no voo (Veja M2V1 - VII).",
          "O **gás que expande** na subida (Veja M1V1 - II) também chega à insulina. Na **bomba de insulina**, bolhas crescem no reservatório e empurram o líquido: num estudo, as bombas entregaram cerca de **1 a 1,4 unidade a mais** na subida e quase 1 unidade a menos na descida. Para quem usa doses pequenas, como crianças, a diferença pesa.",
          "O **ar seco** (Veja M1V1 - IV) e a **imobilidade** somam riscos. O açúcar alto faz urinar mais e desidrata. A **obesidade**, com IMC de **30** ou mais, é fator de risco para trombose em viagens de mais de **4 horas** (Veja M2V2 - VII). E a cabine apertada limita o movimento justamente de quem mais precisa andar.",
          "O **fuso horário** mexe nos remédios (Veja M2V8 - III). Indo para o **leste**, o dia encurta; para o **oeste**, alonga. Quando o dia perde ou ganha mais de **2 horas**, a dose de insulina pode precisar de ajuste. A insulina viaja na **bagagem de mão**: no porão, o frio pode congelá-la, e a mala pode se perder.",
          "**Como prevenir e amenizar.** Antes de voar, combine com o médico o horário dos remédios no fuso de destino. No voo, beba água, ande pelo corredor quando o aviso de cintos permitir e coma nos horários de sempre, levando um lanche para o caso de atraso. Quem usa insulina leva de sobra, dividida em duas bolsas na bagagem de mão, e avisa a tripulação.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v9-1-refeicao.jpg'), 'A bordo, a hora de comer muda; o açúcar do sangue sente.') },
          {
            paragrafo: 2,
            tabela: {
              titulo: 'O que muda em altitude',
              colunas: ['Fator do voo', 'O que acontece no metabolismo', 'Quem é mais vulnerável'],
              linhas: [
                ['Menos oxigênio', 'Sinais de hipóxia parecidos com os de açúcar baixo', 'Quem usa insulina ou remédio que baixa o açúcar: o cérebro depende da glicose e não a armazena; esses remédios podem baixar o açúcar além do necessário, e os sinais se confundem com os da hipóxia'],
                ['Gás que expande', 'Bolhas na bomba de insulina mudam a dose', 'Quem usa bomba, sobretudo com doses pequenas: a bolha do reservatório cresce na subida e empurra insulina extra; quem usa pouca insulina sente proporcionalmente mais a diferença'],
                ['Ar seco', 'Desidratação, pior com açúcar alto', 'Diabetes descontrolado: o açúcar acima do que o rim segura sai na urina e puxa água junto; somado ao ar seco, desidrata'],
                ['Imobilidade e assento apertado', 'Mais risco de trombose', 'Obesidade (IMC 30 ou mais): o abdome pesa sobre as veias da pelve, o sangue volta mais devagar das pernas, e a gordura em excesso deixa o sangue mais inflamado e propenso a coagular'],
                ['Fuso e refeições fora de hora', 'Dose e comida desencontradas', 'Quem usa insulina ou hormônio da tireoide: a insulina age por horas e precisa casar com a comida; a levotiroxina precisa de jejum para ser bem absorvida, e a refeição fora de hora atrapalha'],
              ],
            },
          },
          { paragrafo: 3, midia: 'hormonios-voo' },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v9-1-corredor.jpg'), 'Andar no corredor e beber água ajudam o sangue a circular.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · hormônios no voo',
              colunas: ['Momento', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Antes', 'Horário dos remédios combinado com o médico para o fuso', 'Só remédios aceitos pela autoridade, com o prazo cumprido'],
                ['Bagagem de mão', 'Insulina e remédios de sobra, em duas bolsas', 'Remédios, glicosímetro ou sensor e lanche'],
                ['Durante', 'Água, andar no corredor, comer no horário', 'Refeições no horário; medir o açúcar se usa remédio que o baixa'],
                ['Atraso', 'Lanche com carboidrato à mão', 'Lanche com carboidrato à mão'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '9.2',
      titulo: 'Diabetes e hipoglicemia',
      pergunta: 'O piloto com diabetes pode voar?',
      conteudo: {
        texto: [
          "No **diabetes**, o açúcar do sangue fica alto porque falta insulina (**tipo 1**) ou porque o corpo responde mal a ela (**tipo 2**). Para o voo, o perigo maior não é o açúcar alto, e sim o **açúcar baixo**, a **hipoglicemia**: tremor, suor, fome, confusão e, se nada for feito, desmaio e até coma. É uma **incapacitação súbita**. O açúcar muito alto também atrapalha: visão turva, cansaço e raciocínio lento.",
          "A hipoglicemia vem quase sempre do **tratamento**: insulina, **sulfonilureias** e **glinidas** são os remédios que mais baixam o açúcar; a **metformina** sozinha, bem controlada, raramente causa. O voo junta os gatilhos: refeição atrasada, fuso, esforço no solo, álcool no pernoite. A FAA considera hipoglicemia com sintomas quando o açúcar está em **70 mg/dL** ou menos.",
          "Para o tripulante, o Brasil e a ICAO seguem a regra antiga: quem usa **insulina** é **inapto**. Sem insulina, a ANAC aceita o diabetes controlado com dieta ou com remédio; com **hipoglicemiante oral**, depois de **60 dias** de observação com bom controle, e o certificado revalidado vale no máximo **6 meses**. A FAA pede um prazo sem voar a cada remédio novo: **14 dias** para a metformina, **30 dias** para a maioria dos outros e **60 dias** para sulfonilureias e glinidas, com hemoglobina glicada até **9**.",
          "Outras autoridades já certificam pilotos com insulina. A **FAA** abriu, em **2019**, a 1ª e a 2ª classe a quem usa **sensor contínuo**: **6 meses** de dados, açúcar entre 70 e 180 mg/dL em **70%** do tempo ou mais e menos de **1%** abaixo de 54 mg/dL. O **Reino Unido** certifica pilotos de linha com insulina desde que voem **com copiloto**: medem o açúcar antes do voo, a cada hora e **30 minutos** antes do pouso, num semáforo de verde, âmbar e vermelho.",
          "O protocolo britânico funciona: **49 pilotos** voaram **22.078 horas** em 7,5 anos, com **97,7%** das medidas no verde e **nenhuma incapacitação**. No vermelho baixo, abaixo de **4 mmol/L** (cerca de 72 mg/dL), o piloto passa o comando ao copiloto, come **10 a 15 g** de carboidrato rápido e mede de novo em **15 minutos**. Para o tripulante, voar sem declarar o diabetes ou o remédio é infração e pode invalidar o certificado e o seguro.",
          "Para o **passageiro**, o diabetes **não impede** o voo. O risco é a hipoglicemia longe do chão: o tratamento é o mesmo, açúcar rápido e medir de novo. Avise a tripulação que usa insulina, leve identificação e um lanche, e não dependa da refeição de bordo, que pode atrasar. Açúcar muito alto, vômitos ou sinais de cetoacidose pedem médico antes de embarcar.",
          "**Remédios e voo.** O que pesa é o risco de hipoglicemia e o tempo de adaptação ao remédio. Metformina, gliptinas, SGLT2 e GLP-1 baixam pouco o açúcar quando usados sozinhos; o SGLT2 faz urinar mais e pode desidratar na cabine seca. Sulfonilureias, glinidas e insulina exigem medir o açúcar e cumprir os prazos. Nunca mude a dose por conta própria antes de uma viagem.",
          "**Como prevenir e amenizar.** Meça o açúcar antes de embarcar e durante o voo, a cada 4 a 6 horas ou antes das refeições; quem usa sensor confere o alarme. Tenha sempre à mão **15 g de carboidrato rápido**, como suco ou sachê de glicose. Coma no horário e evite álcool. Tripulante: siga o protocolo da sua autoridade e, no vermelho, passe o comando.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v9-2-glicosimetro.jpg'), 'Medir antes de embarcar mostra se o açúcar está seguro para o voo.') },
          { paragrafo: 2, midia: 'prazo-diabetes' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · diabetes',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Só dieta, bem controlado', 'Pode voar', 'Apto (ANAC; FAA com avaliação)'],
                ['Metformina sozinha', 'Pode voar', 'FAA: 14 dias sem voar ao começar; ANAC: 60 dias de observação'],
                ['Sulfonilureia ou glinida', 'Pode voar; lanche à mão', 'FAA: 60 dias; ANAC: 60 dias e certificado de até 6 meses'],
                ['Insulina', 'Pode voar; avise a tripulação', 'ANAC e ICAO: inapto; FAA: protocolo com sensor (180 dias na 1ª e 2ª classe); Reino Unido: com copiloto'],
                ['Hipoglicemia grave no último ano', 'Avaliação médica antes', 'Afastado até avaliação (FAA)'],
                ['Açúcar muito alto, vômitos ou cetoacidose', 'Não voar agora', 'Não voar'],
              ],
            },
          },
          { paragrafo: 4, midia: 'semaforo-glicemia' },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v9-2-sensor.jpg'), 'Com o sensor contínuo, o piloto acompanha o açúcar durante o voo.') },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Remédios e voo · diabetes',
              colunas: ['Remédio ou classe', 'Efeito que importa no voo', 'Tripulante (FAA/ANAC)'],
              linhas: [
                ['Metformina', 'Raramente baixa demais o açúcar', 'FAA: 14 dias ao começar; ANAC: 60 dias de observação'],
                ['Gliptinas, GLP-1, SGLT2, glitazonas, acarbose', 'Pouca hipoglicemia sozinhos; SGLT2 desidrata', 'FAA: 30 dias ao começar; 14 dias se acrescentado'],
                ['Sulfonilureias e glinidas', 'Hipoglicemia', 'FAA: 60 dias; ajuste de dose, 7 dias'],
                ['Insulina', 'Hipoglicemia; dose muda com fuso e bomba', 'ANAC: inapto; FAA: 90 dias (3ª classe) ou 180 dias com sensor (1ª e 2ª)'],
                ['Combinação', 'Somam efeitos', 'FAA: um remédio por grupo, até 3 sem insulina; glinida não combina com GLP-1'],
              ],
            },
          },
          {
            paragrafo: 8,
            tabela: {
              titulo: 'Como prevenir e amenizar · diabetes',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Antes de embarcar', 'Medir o açúcar; comer no horário'],
                ['Durante o voo', 'Medir a cada 4 a 6 horas ou antes das refeições; conferir o alarme do sensor'],
                ['Sempre à mão', '15 g de carboidrato rápido (suco ou sachê de glicose)'],
                ['Açúcar baixo', 'Comer 10 a 15 g de carboidrato rápido e medir de novo em 15 minutos'],
                ['Tripulante no vermelho', 'Passar o comando ao copiloto'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '9.3',
      titulo: 'Insulina, bomba e fuso',
      pergunta: 'Como levar e ajustar a insulina numa viagem de avião?',
      conteudo: {
        texto: [
          "A **insulina** vai na **bagagem de mão**, nunca só na mala despachada: o porão pode ficar frio a ponto de **congelar** a insulina, e a mala pode se perder. Leve insulina **de sobra**, dividida em **duas bolsas**, de preferência uma com quem viaja junto, numa **bolsa térmica**. Durante o voo, não precisa de geladeira. Leve a carta do médico e uma identificação que diga que você usa insulina.",
          "A **bomba de insulina** sente a pressão. Na subida, a pressão da cabine cai, bolhas crescem no reservatório e a bomba entrega insulina a mais, cerca de **1 a 1,4 unidade**; na descida, puxa de volta e entrega quase 1 unidade a menos. Os autores sugerem desconectar a bomba antes da decolagem, tirar as bolhas e reconectar no **cruzeiro**; depois do pouso, desconectar de novo e preencher o cateter com **2 unidades**. Combine com o seu médico antes de mudar o uso.",
          "O **fuso** muda a conta. Indo para o **leste**, o dia encurta: se perde mais de **2 horas**, a dose de insulina intermediária ou longa pode precisar diminuir. Indo para o **oeste**, o dia alonga: se ganha mais de 2 horas, pode precisar de uma dose extra de insulina rápida com uma refeição. Quem usa remédio por boca raramente precisa de dose extra. Manter o relógio no horário da partida durante o voo ajuda a espaçar as refeições.",
          "A comida de bordo nem sempre ajuda. A refeição **\"para diabético\"** costuma ser pensada para o tipo 2 e pode ter pouco carboidrato para quem usa insulina. Leve **carboidrato extra** para atrasos e coma conforme o serviço de bordo, perguntando à tripulação o horário. Meça o açúcar antes das refeições, a cada **4 a 6 horas** de voo.",
          "O **glicosímetro** funciona na cabine: a pressão de 6.000 a 8.000 ft não afeta a maioria dos aparelhos, mas frio, calor ou altitude extremos podem atrapalhar o aparelho e as fitas, outro motivo para levá-los na bagagem de mão. O sensor contínuo e a bomba também viajam com você; peça à companhia, com antecedência, um assento perto do banheiro se quiser privacidade para aplicar.",
          "**Como prevenir e amenizar.** Semanas antes, peça ao médico um plano por escrito para o fuso e a carta para a segurança do aeroporto. No dia, insulina e insumos de sobra, em duas bolsas de mão, e lanche. No avião, avise a tripulação, siga o plano da bomba na subida e na descida e meça antes de comer. No destino, volte ao horário local aos poucos, como o médico combinou.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, video: { fonte: require('@/assets/videos/m2v9-insulina.mp4'), legenda: 'A insulina viaja na bolsa térmica, na bagagem de mão, sempre perto de quem usa.' } },
          { paragrafo: 2, midia: 'animacao-bomba-insulina' },
          { paragrafo: 3, midia: 'fuso-insulina' },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v9-3-lanche.jpg'), 'Um lanche com carboidrato à mão cobre atrasos e o açúcar baixo.') },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Liberação para voo · insulina em viagem',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Insulina estável, com plano para o fuso', 'Pode voar', 'Só pelo protocolo da autoridade (ANAC: inapto)'],
                ['Bomba de insulina', 'Pode voar; seguir o plano na subida e na descida', 'Troca de bomba ou de sensor: 7 dias (FAA)'],
                ['Mudou o tipo de insulina', 'Pode voar, com o médico', 'FAA: 7 dias sem voar'],
                ['Sem insulina reserva ou sem lanche', 'Resolver antes de embarcar', 'Resolver antes de embarcar'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v9-3-bolsa.jpg'), 'Duas bolsas de mão: se uma se perder, a outra garante a viagem.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · insulina em viagem',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Semanas antes', 'Plano do médico por escrito e carta'],
                ['Indo para o leste', 'Dia mais curto: insulina longa pode diminuir'],
                ['Indo para o oeste', 'Dia mais longo: pode haver dose extra de rápida'],
                ['Na bomba', 'Desconectar na decolagem e reconectar no cruzeiro, como combinado'],
                ['No voo', 'Medir antes das refeições, a cada 4 a 6 horas'],
                ['No destino', 'Voltar ao horário local como o médico combinou'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '9.4',
      titulo: 'Tireoide',
      pergunta: 'Tireoide lenta ou acelerada tira o piloto do voo?',
      conteudo: {
        texto: [
          "A **tireoide** é o acelerador do corpo. No **hipotireoidismo**, ela trabalha devagar: cansaço, sono, frio, ganho de peso, raciocínio lento. No **hipertireoidismo**, acelera: coração disparado, tremor, ansiedade, calor e perda de peso, às vezes com arritmia (Veja M2V2 - IV). Na **doença de Graves**, os olhos podem ficar saltados e a **visão dupla** aparecer (Veja M2V4 - VII).",
          "No voo, o hipotireoidismo sem tratamento deixa o tripulante mais lento e cansado, com menos atenção nas horas longas. O hipertireoidismo põe o coração para trabalhar perto do limite, com menos folga para a falta de oxigênio e para o estresse; e a visão dupla atrapalha a leitura dos instrumentos e a aproximação. Tratada e estável, a tireoide quase nunca impede o voo.",
          "Para o tripulante, a regra é **afastar ao diagnosticar** e voltar quando a função estiver **normal e estável**. No **hipotireoidismo**, a FAA libera no próprio exame quem está estável, sem sintomas, com **levotiroxina** ou outro hormônio aceito e **TSH abaixo de 10** no último ano. No Reino Unido, trocar a dose em até **25 µg**, sem sintomas, não afasta; com sintomas, o tripulante fica em solo até melhorar.",
          "No **hipertireoidismo**, o remédio antitireoidiano sem efeito colateral não desqualifica, mas o piloto fica inapto até a função se normalizar, e na 1ª classe o oftalmologista confere os **movimentos dos olhos** e a visão dupla. Depois de **cirurgia** ou de **iodo radioativo**, o afastamento vai até o fim do tratamento e a função estável, com exame de sangue todo ano. A ANAC avalia caso a caso a hiper ou hipofunção significativa e os efeitos do hormônio de reposição.",
          "Para o **passageiro**, a tireoide estável não impede o voo. Um cuidado prático: depois de tratamento com **iodo radioativo**, o corpo pode disparar os **alarmes de radiação** do aeroporto por até cerca de **95 dias**. Leve o comprovante do tratamento. Coração disparado, falta de ar ou febre com a tireoide descontrolada pedem médico antes de viajar.",
          "Voar com a tireoide descontrolada é somar cansaço ou taquicardia ao voo. Para o tripulante, esconder o diagnóstico ou a troca de remédio é infração e pode invalidar o certificado. O prazo de afastamento depois da cirurgia da tireoide é definido pela recuperação e pelo cirurgião [confirmar na referência].",
          "**Remédios e voo.** A **levotiroxina** é tomada em jejum, uma vez por dia; numa viagem com fuso, mantenha o intervalo de cerca de 24 horas e ajuste aos poucos ao horário local. Os antitireoidianos pedem exame de sangue de controle. Betabloqueadores, usados para o coração acelerado, seguem as regras de pressão alta para tripulantes (Veja M2V2 - II).",
          "**Como prevenir e amenizar.** Faça os exames de controle antes de viagens longas e não pule a dose no dia do voo. Leve o remédio na bagagem de mão. Tripulante: avise o examinador de qualquer troca de dose. Passageiro tratado com iodo radioativo: leve o comprovante e, se a equipe orientou distância de outras pessoas, siga o prazo antes de viajar.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v9-4-exame.jpg'), 'O exame do pescoço e um exame de sangue mostram como a tireoide trabalha.') },
          { paragrafo: 2, midia: 'tireoide-voo' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · tireoide',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Hipotireoidismo estável, com reposição', 'Pode voar', 'FAA: liberado no exame com TSH abaixo de 10; Reino Unido: apto estável'],
                ['Troca de dose de levotiroxina', 'Pode voar', 'Reino Unido: até 25 µg sem sintomas, sem afastar; com sintomas, inapto'],
                ['Hipertireoidismo em tratamento', 'Pode voar se estável', 'Inapto até a função normal; revisão dos olhos na 1ª classe (Reino Unido)'],
                ['Depois de iodo radioativo', 'Pode voar; levar comprovante (alarmes até cerca de 95 dias)', 'Inapto até o fim do tratamento e a função estável'],
                ['Depois de cirurgia da tireoide', 'Conforme o cirurgião [confirmar na referência]', 'Inapto até a recuperação e a função estável'],
                ['Visão dupla', 'Pode voar', 'Avaliação oftalmológica antes de voar'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v9-4-aeroporto.jpg'), 'Depois do iodo radioativo, leve o comprovante: o portal de radiação pode apitar.') },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Remédios e voo · tireoide',
              colunas: ['Remédio ou classe', 'Efeito que importa no voo', 'Tripulante (FAA/ANAC)'],
              linhas: [
                ['Levotiroxina e outros hormônios', 'Dose errada: cansaço ou coração acelerado', 'FAA: aceitos se estável e TSH abaixo de 10; ANAC: a critério do examinador'],
                ['Antitireoidianos', 'Efeitos colaterais a vigiar', 'Reino Unido: não desqualificam sem efeito colateral; FAA [confirmar na referência]'],
                ['Betabloqueador', 'Frequência baixa, cansaço no esforço', 'Regras de pressão alta (Veja M2V2 - II)'],
                ['Iodo radioativo', 'Radiação detectável por semanas', 'Inapto até completar o tratamento (Reino Unido)'],
              ],
            },
          },
          {
            paragrafo: 8,
            tabela: {
              titulo: 'Como prevenir e amenizar · tireoide',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Antes de viagens longas', 'Exames de controle em dia'],
                ['Fuso', 'Manter cerca de 24 horas entre as doses e ajustar aos poucos'],
                ['Bagagem de mão', 'Remédio e, depois de iodo radioativo, o comprovante'],
                ['Tripulante', 'Avisar o examinador de qualquer troca de dose'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '9.5',
      titulo: 'Obesidade e emagrecimento',
      pergunta: 'O peso muda o risco do voo?',
      conteudo: {
        texto: [
          "O **índice de massa corporal** (**IMC**) é o peso em quilos dividido pela altura ao quadrado. De **18,5 a 24,9** é o peso saudável; de **25 a 29,9**, sobrepeso; de **30** para cima, **obesidade**. O número não conta tudo, mas aponta quem tem mais chance de apneia, pressão alta, diabetes e trombose, problemas que o voo agrava.",
          "No voo, a obesidade pesa em três pontos. A **respiração**: na **síndrome de hipoventilação da obesidade**, cerca de **90%** têm apneia, e mesmo quem tem oxigênio normal de dia pode ter **oxigênio baixo** na cabine; por isso se recomenda um **teste de hipóxia** antes de voar (Veja M2V1 - VII). A **circulação**: IMC de 30 ou mais é fator de risco para **trombose**, e sentar na janela, nesse grupo, multiplicou o risco por cerca de **6** num estudo (Veja M2V2 - VII). E o **sono**: mais de **90%** das pessoas com IMC de 40 ou mais têm apneia que precisa de tratamento (Veja M2V8 - VII).",
          "Para o tripulante, a ANAC considera inapto, na 1ª classe, quem tem **IMC de 40 ou mais**. No Reino Unido e na Europa, com IMC de **35 ou mais**, o piloto só é apto depois de uma avaliação de risco, com coração e **triagem de apneia**. A FAA não usa um corte único: o examinador calcula o IMC e avalia o risco de apneia, que também aparece com peso menor.",
          "Os **remédios para emagrecer** mudaram o quadro. A **semaglutida**, a **liraglutida** e a **tirzepatida** são aceitas: a FAA pede **1 semana** sem voar no início e **48 horas** a cada aumento de dose; o Reino Unido pede **2 semanas** no início, com avaliação do examinador, e **72 horas** a cada ajuste. O **orlistate** pede 48 horas na FAA. Já a **fentermina**, sozinha ou com topiramato, e a combinação de **naltrexona com bupropiona** não são aceitas. Produto comprado sem receita, pela internet, desqualifica no Reino Unido.",
          "Para o **passageiro**, a obesidade não impede o voo, mas pede planejamento. Quem tem dificuldade para se mover pode pedir **assistência especial** à companhia, com pelo menos **48 horas** de antecedência, ou **72 horas** se precisar de acompanhante ou de documento médico. O **CPAP** vai na bagagem de mão, com a carta do médico. Quem faz **cirurgia bariátrica** no exterior deve planejar a volta com o especialista antes de viajar.",
          "Voar sem cuidar desses pontos tem preço: oxigênio baixo em quem tem hipoventilação, trombose depois de um voo longo, sonolência por apneia não tratada. Para o tripulante, usar remédio para emagrecer sem cumprir o prazo, ou comprado sem receita, é voar fora da norma. Náusea, vômito ou tontura do remédio também tiram do voo: com sintoma, não se voa.",
          "**Remédios e voo.** Os remédios do tipo **GLP-1** costumam dar náusea e tirar a fome; sozinhos, baixam pouco o açúcar, mas comer pouco e beber pouco no voo pode desidratar e dar tontura. Combinados com remédios do diabetes, o risco de açúcar baixo sobe. Os remédios estimulantes para emagrecer aceleram o coração e tiram o sono.",
          "**Como prevenir e amenizar.** Prefira o assento do **corredor** e levante-se para andar quando o aviso de cintos permitir; mexa as panturrilhas sentado. Em voos de mais de 6 horas, quem tem risco pode usar **meias de compressão** de 15 a 30 mmHg, com orientação médica. Beba água. Quem tem apneia ou hipoventilação faz o teste de hipóxia antes e combina o oxigênio ou o CPAP com a companhia. Tripulante: remédio para emagrecer só com receita e com o prazo cumprido.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, midia: 'imc-voo' },
          { paragrafo: 2, figura: foto(require('@/assets/images/topicos/m2v9-5-panturrilha.jpg'), 'Mexer as panturrilhas e andar no corredor protegem contra a trombose.') },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · obesidade',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['IMC de 30 ou mais', 'Pode voar; cuidados contra trombose', 'Apto; examinador avalia apneia (FAA)'],
                ['IMC de 35 ou mais', 'Pode voar; cuidados contra trombose', 'Reino Unido e Europa: avaliação de risco, coração e apneia'],
                ['IMC de 40 ou mais', 'Pode voar; avaliar apneia e oxigênio', 'ANAC: inapto na 1ª classe'],
                ['Hipoventilação da obesidade', 'Teste de hipóxia antes; oxigênio ou CPAP se preciso', 'Avaliação antes de voar'],
                ['Apneia tratada com CPAP', 'Pode voar; CPAP na bagagem de mão', 'Conforme o tratamento (Veja M2V8 - VII)'],
              ],
            },
          },
          { paragrafo: 4, midia: 'remedios-peso' },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v9-5-cpap.jpg'), 'O CPAP viaja na bagagem de mão, com a carta do médico.') },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Remédios e voo · obesidade',
              colunas: ['Remédio ou classe', 'Efeito que importa no voo', 'Tripulante (FAA/ANAC)'],
              linhas: [
                ['Semaglutida, liraglutida, tirzepatida', 'Náusea; desidratação se come e bebe pouco', 'FAA: 1 semana no início e 48 h a cada aumento; Reino Unido: 2 semanas e 72 h'],
                ['Orlistate', 'Desconforto intestinal', 'FAA: 48 h no início'],
                ['Metformina para emagrecer', 'Pouca hipoglicemia', 'FAA: 1 semana no início'],
                ['Fentermina, com ou sem topiramato', 'Estimulante: coração acelerado, insônia', 'FAA: não aceita'],
                ['Naltrexona com bupropiona', 'Efeitos no sistema nervoso', 'FAA: não aceita'],
                ['Comprado sem receita, pela internet', 'Conteúdo e dose incertos', 'Reino Unido: desqualifica'],
              ],
            },
          },
          {
            paragrafo: 8,
            tabela: {
              titulo: 'Como prevenir e amenizar · obesidade',
              colunas: ['Momento', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Ao reservar', 'Assento do corredor; assistência especial 48 h antes', 'Não se aplica'],
                ['Antes', 'Teste de hipóxia se tem hipoventilação; CPAP combinado', 'Remédio só com receita e prazo cumprido'],
                ['Voo longo', 'Andar, mexer as panturrilhas, água; meias com orientação', 'Andar e beber água no repouso'],
                ['Com sintoma do remédio', 'Comer leve e se hidratar', 'Não voar'],
              ],
            },
          },
          {
            paragrafo: 8,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Cérebro', 'Açúcar baixo: confusão, desmaio, incapacitação súbita; o cérebro depende da glicose do sangue e não a armazena', 'Medir o açúcar; 15 g de carboidrato rápido à mão'],
                ['Coração e vasos', 'Tireoide acelerada: taquicardia; obesidade: trombose; o hormônio em excesso acelera o coração, e o peso pressiona as veias e deixa o sangue mais propenso a coagular', 'Tireoide controlada; andar, água e corredor'],
                ['Pulmões', 'Hipoventilação e apneia: oxigênio baixo no voo; o peso do tórax e do abdome reduz a respiração, e a cabine tira ainda mais oxigênio', 'Teste de hipóxia; oxigênio ou CPAP'],
                ['Rins e hidratação', 'Açúcar alto e SGLT2: mais urina e desidratação; o açúcar que sai na urina puxa água junto', 'Água; açúcar controlado'],
                ['Olhos', 'Doença de Graves: visão dupla; açúcar alto: visão turva; na doença de Graves os músculos dos olhos incham, e o açúcar alto muda a água do cristalino e o foco', 'Avaliação oftalmológica; controle do açúcar'],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      pergunta: 'Por que a insulina deve viajar na bagagem de mão?',
      opcoes: ['Porque é proibido despachar', 'Porque o porão pode congelá-la e a mala pode se perder', 'Porque precisa de geladeira no voo', 'Não faz diferença'],
      correta: 1,
      explicacao: 'O frio do porão pode congelar a insulina, e a mala pode se perder. No voo, não precisa de geladeira.',
      topico: '9.1',
    },
    {
      pergunta: 'Para o voo, qual é o maior perigo do diabetes tratado?',
      opcoes: ['O açúcar alto', 'A hipoglicemia, o açúcar baixo', 'A sede', 'O peso'],
      correta: 1,
      explicacao: 'A hipoglicemia causa tremor, confusão e pode levar ao desmaio: é uma incapacitação súbita.',
      topico: '9.2',
    },
    {
      pergunta: 'Pelo RBAC 67, depois de quanto tempo de observação o tripulante com hipoglicemiante oral pode ser julgado apto?',
      opcoes: ['7 dias', '60 dias', '1 ano', 'Nunca'],
      correta: 1,
      explicacao: 'Com controle satisfatório por 60 dias, e o certificado revalidado vale no máximo 6 meses.',
      topico: '9.2',
    },
    {
      pergunta: 'Pela FAA, quantos dias sem voar pede o início de uma sulfonilureia?',
      opcoes: ['14 dias', '60 dias', '2 dias', '1 ano'],
      correta: 1,
      explicacao: 'Sulfonilureias e glinidas pedem 60 dias; a metformina sozinha, 14 dias; a maioria dos outros, 30 dias.',
      topico: '9.2',
    },
    {
      pergunta: 'No protocolo britânico, o que faz o piloto com açúcar abaixo de 4 mmol/L?',
      opcoes: ['Continua pilotando', 'Passa o comando ao copiloto, come 10 a 15 g de carboidrato rápido e mede de novo em 15 minutos', 'Aplica insulina', 'Espera o pouso'],
      correta: 1,
      explicacao: 'No vermelho baixo, o piloto passa o comando, come carboidrato rápido e mede de novo em 15 minutos.',
      topico: '9.2',
    },
    {
      pergunta: 'O que acontece com a bomba de insulina na subida do avião?',
      opcoes: ['Para de funcionar', 'Bolhas crescem e ela entrega um pouco de insulina a mais', 'Entrega menos insulina', 'Nada'],
      correta: 1,
      explicacao: 'Com a pressão caindo, as bolhas crescem e a bomba entregou cerca de 1 a 1,4 unidade a mais; na descida, quase 1 a menos.',
      topico: '9.3',
    },
    {
      pergunta: 'Numa viagem para o leste, com o dia mais curto, o que pode acontecer com a dose de insulina longa?',
      opcoes: ['Precisar diminuir', 'Precisar dobrar', 'Nada muda nunca', 'Ser suspensa'],
      correta: 0,
      explicacao: 'Para o leste, se o dia perde mais de 2 horas, a insulina intermediária ou longa pode precisar diminuir.',
      topico: '9.3',
    },
    {
      pergunta: 'Pela FAA, quando o examinador pode liberar no próprio exame o piloto com hipotireoidismo?',
      opcoes: ['Nunca', 'Estável, sem sintomas e com TSH abaixo de 10 no último ano', 'Só sem remédio', 'Só com cirurgia'],
      correta: 1,
      explicacao: 'Estável, sem sintomas, com hormônio aceito e TSH abaixo de 10 no último ano.',
      topico: '9.4',
    },
    {
      pergunta: 'Depois de tratamento com iodo radioativo, o que o passageiro deve levar?',
      opcoes: ['Nada', 'O comprovante do tratamento, porque os alarmes de radiação podem disparar', 'Um exame de sangue', 'Um atestado de saúde mental'],
      correta: 1,
      explicacao: 'Os alarmes podem disparar por até cerca de 95 dias; o comprovante evita atrasos na segurança.',
      topico: '9.4',
    },
    {
      pergunta: 'Pelo RBAC 67, a partir de que IMC o candidato à 1ª classe é inapto?',
      opcoes: ['25', '30', '40', 'Não há limite'],
      correta: 2,
      explicacao: 'A ANAC considera inapto na 1ª classe quem tem IMC de 40 ou mais.',
      topico: '9.5',
    },
    {
      pergunta: 'Pela FAA, quanto tempo sem voar no início da semaglutida para emagrecer?',
      opcoes: ['Nenhum', '1 semana, e 48 horas a cada aumento de dose', '6 meses', '1 ano'],
      correta: 1,
      explicacao: 'A FAA pede 1 semana no início e 48 horas a cada aumento; o Reino Unido, 2 semanas e 72 horas.',
      topico: '9.5',
    },
  ],
  liberacao: liberacaoHormonios,
};
