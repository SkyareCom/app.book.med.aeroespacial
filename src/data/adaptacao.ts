// Card especial "Adaptação à altitude": como o corpo responde à falta de oxigênio, dos primeiros segundos aos meses,
// e quando a adaptação não chega a tempo. Fica na Home, ao lado de "O Voo e a Medicina" (pedido do autor, 02/11/2026).
//
// REGISTRO DE REVISÃO (02/11/2026) — fontes:
// - CDC, Yellow Book, High-Altitude Travel and Altitude Illness (cdc.gov/yellow-book): a 3.050 m a PO2 inspirada é 69%
//   da do nível do mar, SpO2 aguda de 88–91%; fase aguda da aclimatação nos primeiros 3–5 dias, parte continua por
//   semanas a meses; a doença pode surgir antes da aclimatação aguda completa, não depois; aumento da produção de
//   hemácias não participa da aclimatação aguda; queda do volume plasmático nos primeiros dias concentra a hemoglobina;
//   acetazolamida: diurese de bicarbonato e acidose metabólica que estimula a ventilação, encurta a aclimatação
//   ventilatória de 3–5 dias para 1; respiração periódica quase universal acima de ~2.700 m, o sono costuma melhorar com a
//   aclimatação; risco a partir de dormir a ≥ 2.450 m; MAM em ~25% dos visitantes que dormem acima de 2.450 m no
//   Colorado; chegada rápida de avião acima de 3.400 m, taxas próximas de 50%; MAM: cefaleia + anorexia, tontura,
//   fadiga, náusea ou vômito, início em 2–12 h, resolve em 1–3 dias sem nova subida; HACE: estado mental alterado,
//   ataxia, confusão, sonolência, coma em 24 h; HAPE: tosse, dispneia exagerada ao esforço, queda do rendimento,
//   progride em 1–2 dias, SpO2 de 50–70% comum; prevenção: não ir de < 1.200 m direto para dormir a 2.750 m; acima de
//   3.000 m, no máximo +500 m de altitude de dormir por noite e um dia extra a cada 1.000 m; sem álcool e exercício
//   leve nas primeiras 48 h; 2 noites acima de 2.750 m nos 14 dias antes da viagem ajudam.
// - OpenAnesthesia, Physiologic changes at high altitude (cita Brown e Grocott, Contin Educ Anaesth Crit Care Pain
//   2013;13(1):17-22; Ainslie e Donnelly, Open Textbook of Exercise Physiology; Luks et al., High Altitude Medicine and
//   Physiology, 6ª ed., 2021; Moulson et al., ACC 2021): quimiorreceptores periféricos e simpático elevam FC e débito;
//   hiperventilação, alcalose respiratória e excreção renal de bicarbonato sustentando a ventilação; vasoconstrição
//   pulmonar hipóxica; fluxo cerebral até 20–30% maior na subida; queda do plasma eleva o hematócrito; EPO com pico em
//   ~48 h (HIF-1α); curva desviada à esquerda na fase aguda (alcalose) e à direita com o 2,3-DPG na exposição crônica;
//   na exposição crônica a FC cai mas fica acima do nível do mar, débito acima do basal, volume sistólico menor por
//   menor enchimento; menos mitocôndrias musculares, metabolismo basal maior, perda de peso; mal crônico da montanha com
//   hemoglobina > 22 g/dL. [confirmar na referência: obras de referência do app para os números da fisiologia.]
// - FAA/CAMI, Aviation Physiology (Aeromedical Education Division; Intro_Aviation_Physiology.pdf): o corpo se ajusta à
//   redução aguda e crônica do oxigênio aumentando a frequência respiratória, com mudanças químicas no sangue e aumento
//   da produção de hemácias; cabines mantidas entre 6.500 e 8.000 ft.
// - FAA, McNeely E, Spengler J, Watson J. Health Effects of Aircraft Cabin Pressure in Older and Vulnerable Passengers.
//   RITE-ACER-CoE-2011-1 (nov. 2011): cabine a 7.000 ft, SpO2 média de 90%; FC +2,4 bpm (IC 0,7–4,1); quase 1% de queda
//   da SpO2 por década acima dos 50; quase metade dos mais velhos a 90% ou menos; sintomas pouco sensíveis.
// - 02/11/2026, pedido do autor (usar manuais da ICAO, ANAC e FAA): removidos os números que vinham só de fonte
//   secundária (fluxo cerebral de 20–30%, pico da eritropoetina em 48 h, hemoglobina acima de 22 g/dL).
// - ICAO, Doc 8984, 3ª ed. (PDF enviado pelo autor, 02/11/2026), Part II, Cap. 1: limiar fisiológico da hipóxia em
//   1.000 m (3.300 ft), sintomas a partir de ~1.500 m (5.000 ft), mais intensos acima de 3.000 m (10.000 ft); cabine
//   de passageiros a 1.500–2.450 m (5.000–8.000 ft); SpO2 em repouso ~93% a 2.450 m, ~89% a 3.050 m, ~87% a 3.650 m,
//   ~83% a 4.250 m, ~80% a 4.550 m, 65% a 6.100 m (Tabela II-1-2); hiperpneia ou hiperventilação e taquicardia entre os
//   sinais objetivos (Tabela II-1-3). O manual não descreve a aclimatação de dias a meses: essa parte do card segue o
//   CDC e a FAA/CAMI. Manuais de curso da ANAC: não enviados [confirmar na referência].
// - Acetazolamida no tripulante: o candidato informa os remédios ao examinador (RBAC 67.71(d)) e não pode ter efeito
//   ou efeito colateral de remédio que interfira na operação segura (Anexo 1, 6.2.2 d), no Doc 8984).
// - Saturação e altitude de cabine: ver também M2V1 (BTS 2022). 14 CFR 61.53: registro de M2V1.

import type { Questao, Recurso } from './tipos';

export interface FaseAdaptacao {
  id: string;
  periodo: string;
  titulo: string;
  pergunta: string;
  texto: string;
  recursos?: Recurso[];
}

export const fasesAdaptacao: FaseAdaptacao[] = [
  {
    id: 'ad1',
    periodo: 'Segundos a minutos',
    titulo: 'A primeira resposta',
    pergunta: 'O que o corpo faz assim que falta oxigênio?',
    texto: [
      "Quando a pressão do oxigênio cai (Veja M1V1 - II), o corpo responde em segundos. Os **corpos carotídeos**, pequenos sensores junto às artérias do pescoço, percebem o sangue mais pobre em oxigênio e mandam o cérebro **respirar mais**. O **sistema nervoso simpático** acelera o **coração**, e o **débito cardíaco** sobe para levar mais sangue, e mais oxigênio, aos tecidos. Pela FAA, o corpo enfrenta a falta de oxigênio de três formas: **respirando mais**, mudando a **química do sangue** e produzindo **mais hemácias**.",
      "Os vasos também mudam. No pulmão, as pequenas artérias se **contraem** onde o ar tem pouco oxigênio, a **vasoconstrição pulmonar hipóxica**, e a pressão na artéria pulmonar sobe. No cérebro, acontece o contrário: os vasos se **dilatam**, e o fluxo de sangue aumenta durante a subida.",
      "Essa primeira resposta tem um preço. Respirar mais elimina **gás carbônico**, e o sangue fica alcalino (Veja M2V1 - V). A alcalose deixa a hemoglobina mais **presa ao oxigênio**: ela capta melhor no pulmão, mas entrega pior nos tecidos. E a mesma alcalose freia a respiração, limitando o quanto o corpo consegue compensar sozinho.",
      "É essa a resposta que acontece num voo, numa cabine mantida entre **6.500 e 8.000 ft**. Num estudo da FAA com a cabine a 7.000 ft, a saturação média ficou em **90%**, a frequência cardíaca subiu em média **2,4 batimentos por minuto**, e a saturação caiu quase **1% a cada década de vida acima dos 50 anos**; quase metade dos passageiros mais velhos chegou a **90% ou menos**, sem sintomas que avisassem. O voo é curto demais para o resto da adaptação, que leva **dias**: quem tem pouca reserva depende só desta primeira resposta (Veja M2V1 - I).",
    ].join('\n\n'),
    recursos: [
      { paragrafo: 1, midia: 'linha-adaptacao' },
      { paragrafo: 3, midia: 'simulador-o2' },
    ],
  },
  {
    id: 'ad2',
    periodo: 'Horas a dias',
    titulo: 'A aclimatação dos primeiros dias',
    pergunta: 'Por que os primeiros dias numa cidade alta são os mais difíceis?',
    texto: [
      "Nos **3 a 5 primeiros dias**, os **rins** fazem a parte decisiva. Eles eliminam **bicarbonato** pela urina e corrigem a alcalose. Com o sangue de volta ao equilíbrio, o freio sai, e a respiração pode ficar alta de forma sustentada: é a **aclimatação ventilatória**.",
      "O volume de **plasma** cai nos primeiros dias, e a **hemoglobina fica mais concentrada**: cada litro de sangue carrega mais oxigênio sem que nenhuma hemácia nova tenha sido feita. Ao mesmo tempo, os rins sentem a falta de oxigênio e liberam **eritropoetina**, que manda a medula óssea produzir hemácias; o efeito, porém, só aparece semanas depois.",
      "Dentro das hemácias, sobe o **2,3-DPG**, que solta o oxigênio da hemoglobina e **facilita a entrega** aos tecidos, desfazendo o efeito da alcalose. À noite, acima de cerca de **2.700 m**, a **respiração periódica**, com pausas e retomadas, é quase universal e fragmenta o sono, que costuma melhorar com a aclimatação.",
      "A **acetazolamida** imita o trabalho dos rins: provoca a perda de bicarbonato, estimula a respiração e encurta a aclimatação ventilatória de 3 a 5 dias para **um dia**. É usada na prevenção do mal agudo da montanha por indicação médica. Para o tripulante, todo remédio passa pela avaliação do médico examinador, que julga o efeito e os efeitos colaterais sobre o voo.",
    ].join('\n\n'),
    recursos: [
      {
        paragrafo: 2,
        tabela: {
          titulo: 'O que muda nos primeiros dias',
          colunas: ['Mecanismo', 'O que faz', 'Quando'],
          linhas: [
            ['Rins eliminam bicarbonato', 'Corrigem a alcalose e sustentam a respiração alta', 'Primeiros 3 a 5 dias'],
            ['Plasma diminui', 'Concentra a hemoglobina', 'Primeiros dias'],
            ['Eritropoetina', 'Manda produzir hemácias', 'Liberada nos primeiros dias; o efeito leva semanas'],
            ['2,3-DPG sobe', 'Facilita a entrega do oxigênio aos tecidos', 'Com a exposição prolongada'],
          ],
        },
      },
      { paragrafo: 4, midia: 'linha-adaptacao' },
    ],
  },
  {
    id: 'ad3',
    periodo: 'Semanas a meses',
    titulo: 'A adaptação de longo prazo',
    pergunta: 'O que muda em quem passa semanas na altitude?',
    texto: [
      "Com as semanas, a eritropoetina dá resultado: a **massa de hemácias** cresce, e a hemoglobina sobe por produção nova, não só por concentração. A **frequência cardíaca** cai, mas fica acima da do nível do mar, e o **débito cardíaco** se mantém acima do basal. O **volume sistólico** diminui porque há menos plasma enchendo o coração, não porque o músculo enfraqueça.",
      "A adaptação tem limites. Os músculos perdem **mitocôndrias**, o metabolismo basal sobe, e a permanência longa pode trazer **perda de peso** e de massa muscular. Quando a hemoglobina sobe demais, o sangue fica espesso: é o **mal crônico da montanha**, com dor de cabeça, mal-estar, hipertensão pulmonar e lábios azulados.",
      "Parte da aclimatação continua por semanas a meses. Ter dormido acima de **2.750 m** por pelo menos **2 noites** nos **14 dias** antes de uma viagem à altitude já ajuda, e quanto mais perto da partida, melhor.",
    ].join('\n\n'),
    recursos: [
      {
        paragrafo: 2,
        tabela: {
          titulo: 'Adaptação por sistema',
          colunas: ['Sistema', 'Nos primeiros minutos', 'Em dias a semanas', 'Quando falha'],
          linhas: [
            ['Respiração', 'Respira mais, comandada pelos corpos carotídeos', 'Os rins eliminam bicarbonato e sustentam a respiração alta', 'Respiração periódica e sono picado'],
            ['Coração', 'Frequência e débito sobem', 'A frequência cai, mas fica acima do nível do mar; volume sistólico menor', 'Pouca reserva em quem já tem doença cardíaca (Veja M2V2)'],
            ['Circulação do pulmão', 'As pequenas artérias se contraem e a pressão pulmonar sobe', 'A pressão pulmonar continua elevada', 'Edema pulmonar de altitude'],
            ['Cérebro', 'O fluxo de sangue aumenta', 'O sono melhora com a aclimatação', 'Mal agudo da montanha e edema cerebral'],
            ['Sangue', 'Hemoglobina mais presa ao oxigênio pela alcalose', 'Plasma menor, eritropoetina, 2,3-DPG e, em semanas, mais hemácias', 'Mal crônico da montanha, com o sangue espesso demais'],
            ['Músculos e metabolismo', 'Metabolismo mais alto', 'Menos mitocôndrias e perda de peso', 'Perda de massa muscular'],
          ],
        },
      },
    ],
  },
  {
    id: 'ad4',
    periodo: 'Quando falha',
    titulo: 'Quando a adaptação não chega a tempo',
    pergunta: 'Quem corre risco de passar mal numa cidade alta, e como evitar?',
    texto: [
      "O mal da altitude aparece quando a subida é mais rápida que a adaptação. Qualquer pessoa não aclimatada que vai **dormir a 2.450 m ou mais** está em risco. No Colorado, cerca de **25%** dos visitantes que dormem acima dessa altitude têm o **mal agudo da montanha**; numa chegada rápida de avião acima de **3.400 m**, a taxa se aproxima de **50%**.",
      "No **mal agudo da montanha**, a dor de cabeça vem com pelo menos um destes sinais: falta de apetite, tontura, cansaço, náusea ou vômito. Começa em **2 a 12 horas**, muitas vezes na primeira noite, e passa em **1 a 3 dias** sem nova subida. O **edema cerebral de altitude** é a forma grave, com confusão, desequilíbrio e sonolência, e pode levar ao coma em **24 horas**. O **edema pulmonar de altitude** começa com tosse, falta de ar exagerada no esforço e queda do rendimento; sem tratamento, piora em **1 a 2 dias**, e a saturação de **50% a 70%** é comum.",
      "Subir devagar é a proteção. Não se deve sair de baixo de **1.200 m** e dormir a **2.750 m** no mesmo dia. Acima de **3.000 m**, a altitude de dormir deve subir no máximo **500 m por noite**, com um dia extra a cada **1.000 m** ganhos. Nas primeiras **48 horas**, nada de álcool e só exercício leve.",
      "Para quem voa, a regra vale no destino. O passageiro que desembarca numa cidade alta e o **tripulante** que pernoita nela chegam sem aclimatação, porque a cabine não prepara o corpo para dormir na altitude. O tripulante com sintomas não assume o voo seguinte: atuar com uma condição que impede de operar com segurança é proibido pela FAA, e a ANAC veda exercer a licença com a aptidão diminuída.",
    ].join('\n\n'),
    recursos: [
      {
        paragrafo: 2,
        tabela: {
          titulo: 'O mal da altitude',
          colunas: ['Forma', 'Sinais', 'Quando'],
          linhas: [
            ['Mal agudo da montanha', 'Dor de cabeça com falta de apetite, tontura, cansaço, náusea ou vômito', 'Começa em 2 a 12 horas; passa em 1 a 3 dias'],
            ['Edema cerebral de altitude', 'Confusão, desequilíbrio e sonolência', 'Pode levar ao coma em 24 horas'],
            ['Edema pulmonar de altitude', 'Tosse, falta de ar exagerada no esforço, queda do rendimento', 'Piora em 1 a 2 dias sem tratamento'],
          ],
        },
      },
      { paragrafo: 3, midia: 'subida-segura' },
    ],
  },
];

export const testeAdaptacao: Questao[] = [
  { dificuldade: 'facil', pergunta: 'Quem percebe primeiro a falta de oxigênio no sangue?', opcoes: ['O fígado', 'Os corpos carotídeos', 'A medula óssea', 'Os rins'], correta: 1, explicacao: 'Os corpos carotídeos, junto às artérias do pescoço, percebem a queda do oxigênio e mandam respirar mais.', topico: 'ad1' },
  { dificuldade: 'media', pergunta: 'O que acontece com as pequenas artérias do pulmão em altitude?', opcoes: ['Dilatam', 'Contraem, e a pressão pulmonar sobe', 'Não mudam', 'Fecham por completo'], correta: 1, explicacao: 'É a vasoconstrição pulmonar hipóxica: as pequenas artérias se contraem e a pressão na artéria pulmonar sobe.', topico: 'ad1' },
  { dificuldade: 'media', pergunta: 'Qual órgão corrige a alcalose nos primeiros dias de altitude?', opcoes: ['O coração', 'Os rins', 'O baço', 'O estômago'], correta: 1, explicacao: 'Os rins eliminam bicarbonato e corrigem a alcalose, o que permite manter a respiração alta.', topico: 'ad2' },
  { dificuldade: 'dificil', pergunta: 'Por que a hemoglobina sobe nos primeiros dias de altitude?', opcoes: ['Porque a medula produz hemácias em horas', 'Porque o plasma diminui e a hemoglobina se concentra', 'Porque o baço libera ferro', 'Porque o 2,3-DPG cria hemoglobina'], correta: 1, explicacao: 'Nos primeiros dias, a queda do plasma concentra a hemoglobina; hemácias novas só aparecem semanas depois.', topico: 'ad2' },
  { dificuldade: 'media', pergunta: 'Acima de 3.000 m, quanto a altitude de dormir pode subir por noite?', opcoes: ['No máximo 500 m', 'No máximo 1.500 m', 'Não há limite', 'No máximo 100 m'], correta: 0, explicacao: 'Acima de 3.000 m, a altitude de dormir deve subir no máximo 500 m por noite, com um dia extra a cada 1.000 m.', topico: 'ad4' },
  { dificuldade: 'facil', pergunta: 'Por que a cabine do avião não aclimata o passageiro?', opcoes: ['Porque é pressurizada ao nível do mar', 'Porque o voo é curto demais para a adaptação, que leva dias', 'Porque o ar da cabine não tem oxigênio', 'Porque a cabine é fria'], correta: 1, explicacao: 'No voo só acontece a primeira resposta; a aclimatação leva dias.', topico: 'ad1' },
];
