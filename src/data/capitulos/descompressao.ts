// Missão 1 (Conceitos) · Voo 3 — Descompressão.
// Prosa única e progressiva, com destaques; cada tema num só lugar (referências cruzadas "Veja M_V_").
//
// REGISTRO DE REVISÃO (não aparece no app)
// Fonte principal: FAA, AC 61-107B (Aeronautical Information Manual / Operations of Aircraft at Altitudes Above
// 25,000 Feet MSL and/or Mach Numbers Greater Than .75).
// M1V3 - I · Tipos de descompressão
// - Explosiva: mais rápida do que os pulmões conseguem esvaziar; em geral, menos de 0,5 s; rápida: os pulmões
//   esvaziam mais rápido que a cabine, menor risco pulmonar; lenta: pode passar despercebida: AC 61-107B, 2-11.a(3) (p. 36).
// - Descompressão lenta tão perigosa quanto a rápida; sinais: ruído, névoa (temperatura e umidade), poeira e
//   detritos, rajada de vento, cabine mais fria, expansão de gases nos ouvidos e no trato digestivo:
//   AC 61-107B, 2-7.e(2) (p. 22–23) e 2-11.a(1) (p. 35).
// - Hipóxia quase imediata; TCU cai cerca de 50% entre 25.000 e 43.000 ft; acima de 43.000 ft, cerca de 9 a 12 s:
//   AC 61-107B, 2-7.d(3)(a) (p. 24). Não voar por 24 h após descompressão rápida em voo: 2-7.d(7) (p. 29–30).
// M1V3 - II · Doença descompressiva
// - Formas (dor articular, parestesias, pele, sufocação/"chokes", sistema nervoso central), sintomas em altitude,
//   na descida ou horas depois: AC 61-107B, Tabela 2-7 (p. 27).
// - Maioria dos casos a 25.000 ft ou mais; 13% abaixo disso (estudo da USAF); risco em todo voo não pressurizado
//   acima de 18.000 ft: AC 61-107B, 2-7.d(4)(b) (p. 27) e 2-7.d(7)(a) (p. 29).
// - Fatores de risco (tempo em altitude como o mais forte, velocidade de subida, exposições repetidas acima de
//   18.000 ft, idade, lesão recente, frio, gordura corporal, esforço em altitude, álcool): 2-7.d(4)(c) (p. 27–28).
// - Conduta (máscara, oxigênio a 100%, descida de emergência, pouso, imobilizar a articulação; avaliar mesmo se
//   os sintomas sumirem; câmara hiperbárica se persistir; oxigênio em voo não previne sem pré-respiração antes da
//   decolagem): 2-7.d(4)(e)–(f) (p. 29–30).
// - Base física (lei de Henry): M1V1 - II.
// M1V3 - III · Mergulho e voo
// - Mergulho sem parada: 12 h antes de voar até 8.000 ft; com parada de descompressão: 24 h; acima de 8.000 ft:
//   24 h após qualquer mergulho; voar a 8.000 ft após mergulho equivale a um não mergulhador a 40.000 ft sem
//   pressurização: AC 61-107B, 2-7.d(4)(d) (p. 28–29).
// - 24 h após câmara hipobárica; evitar esforço por 24 h após voo não pressurizado acima de 18.000 ft: 2-7.d(7).
// M1V3 - IV · Câmaras de pressão
// - Treinamento em câmara hipobárica opcional e recomendado; curso de 1 dia do CAMI com demonstração de
//   descompressão rápida de 8.000 para 18.000 ft e de hipóxia a 25.000 ft: AC 61-107B, 2-8.a (p. 30–31).
// - Tabela 6 da Marinha dos EUA: 2,8 ATA (18 m) com oxigênio a 100%, a mais usada no tratamento inicial; gradiente
//   de nitrogênio entre bolha e tecido de 2.086 mmHg a 2,8 ATA com O₂ a 100%, contra 142 mmHg na superfície:
//   DAN Europe, Alert Diver, "Dispelling Misunderstandings". Nem todo centro trata doença descompressiva de altitude:
//   AC 61-107B, p. 30.
// - Bolha a 2,8 ATA com cerca de 0,36 do volume (lei de Boyle, cálculo); altitude equivalente da câmara pela
//   atmosfera padrão ICAO; 10 m de água do mar ≈ 1 atmosfera.
// - Ernsting's (5ª ed.) e Fundamentals (5ª ed.), capítulos de descompressão e doença descompressiva
//   [confirmar capítulo e página].
// Fotos premium geradas por IA pelo autor (pessoas fictícias): topicos/m1v3-*.jpg.

import type { Capitulo } from '../tipos';

export const descompressao: Capitulo = {
  numero: 3,
  titulo: 'Descompressão',
  tempoLeituraMin: 18,
  topicos: [
    {
      id: '3.1',
      titulo: 'Tipos de descompressão',
      pergunta: 'O que acontece quando a cabine perde pressão de repente?',
      conteudo: {
        texto: [
          "A pressurização mantém o corpo numa altitude de cabine baixa (Veja M1V2 - II). A **descompressão** é a perda dessa proteção: a cabine passa a subir em direção à altitude real do avião. Pode vir de uma falha do sistema, de uma vedação com vazamento, de uma janela perdida ou de um dano na estrutura.",
          "A velocidade define o perigo. Na **descompressão explosiva**, a cabine perde pressão **em menos de meio segundo**, mais rápido do que os pulmões conseguem esvaziar: o ar preso no peito fica com pressão maior que a de fora, e o risco de lesão pulmonar é máximo. Na **rápida**, os pulmões esvaziam antes da cabine. Na **lenta**, a pressão cai aos poucos e **pode passar despercebida**, por isso é tão perigosa quanto a rápida.",
          "O corpo e a cabine dão sinais. Há **estrondo ou chiado**, **névoa** súbita causada pela queda de temperatura e de umidade, **poeira e objetos voando**, **rajada de vento** e **frio**. Ao mesmo tempo, os gases do corpo se expandem: **ouvidos estalam e o abdômen estufa** (Veja M1V1 - II).",
          "O inimigo principal é a **hipóxia**, que começa quase de imediato. Numa descompressão rápida, o tempo de consciência útil cai pela metade (Veja M2V1 - III); **acima de 43.000 ft, sobram cerca de 9 a 12 segundos**. A ordem é sempre a mesma: **máscara primeiro, depois a descida de emergência**. Quem passou por uma descompressão rápida em voo deve ficar **24 horas sem voar**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m1v3-cabine-nevoa.jpg'), legenda: 'Segundos depois da descompressão: névoa súbita, papéis e poeira no ar e as máscaras já caídas.' } },
          { paragrafo: 2, midia: 'tipos-descompressao' },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m1v3-jato-executivo.jpg'), legenda: 'Num jato executivo, a cabine pequena se enche de névoa quase de uma vez: o sinal mais visível da queda de pressão.' } },
        ],
      },
    },
    {
      id: '3.2',
      titulo: 'Doença descompressiva',
      pergunta: 'Por que bolhas de nitrogênio podem aparecer no corpo durante o voo?',
      conteudo: {
        texto: [
          "O nitrogênio do ar fica **dissolvido no sangue e nos tecidos**. Quando a pressão cai depressa, ele sai da solução e forma **bolhas**, como num refrigerante aberto (Veja M1V1 - II). Essas bolhas bloqueiam vasos, comprimem nervos e inflamam tecidos: é a **doença descompressiva**.",
          "No voo, o risco existe **sempre que se voa sem pressurização acima de 18.000 ft**. A maioria dos casos acontece **a 25.000 ft ou mais**, mas cerca de **13% surgem abaixo disso**. Os sintomas podem aparecer em altitude, na descida ou **horas depois do pouso**.",
          "A doença tem várias faces. A mais comum é a **dor profunda nas grandes articulações**, que piora com o movimento. A pele pode coçar e ficar **marmorizada**. Nos nervos, surgem **dormência, ardor e formigamento**. No peito, a **sufocação** traz dor em queimação, tosse seca e falta de ar, e **pode matar sem tratamento**. No **sistema nervoso central**, aparecem confusão, alterações da visão, convulsões, fraqueza e perda de consciência.",
          "O **tempo em altitude** é o fator de risco mais forte. Somam-se **subida rápida**, **exposições repetidas** acima de 18.000 ft em poucas horas, **esforço físico** em altitude, **lesão recente** numa articulação, **frio intenso**, **gordura corporal** (que guarda mais nitrogênio), **idade**, efeitos do **álcool** e um **mergulho recente** (Veja M1V3 - III).",
          "A conduta não espera: **máscara, oxigênio a 100%, descida de emergência e pouso** o quanto antes, com a articulação dolorida imóvel. **Mesmo que os sintomas sumam na descida, a pessoa precisa de avaliação médica**, respirando oxigênio. Se persistirem, o tratamento é na **câmara hiperbárica** (Veja M1V3 - IV). E um alerta: **oxigênio a 100% durante o voo não previne a doença** se não houve pré-respiração antes da decolagem.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, midia: 'animacao-bolhas' },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m1v3-piloto-dor.jpg'), legenda: 'Dor profunda no ombro em pleno voo sem pressurização: a forma mais comum da doença descompressiva.' } },
          {
            paragrafo: 3,
            figura: {
              imagem: require('@/assets/images/topicos/m1v1-2-corpo.jpg'),
              proporcao: 1100 / 1091,
              legenda: 'As faces da doença descompressiva. Toque em cada forma para ver onde ela age.',
              marcadores: [
                { x: 0.43, y: 0.15, raio: 0.08, rotulo: 'Sistema nervoso central: confusão, visão, convulsão' },
                { x: 0.4, y: 0.56, raio: 0.13, rotulo: 'Pulmões: sufocação, a forma mais grave' },
                { x: 0.235, y: 0.465, raio: 0.055, rotulo: 'Articulações: dor profunda (ombro)' },
                { x: 0.28, y: 0.8, raio: 0.05, rotulo: 'Articulações: dor profunda (cotovelo)' },
                { x: 0.82, y: 0.86, raio: 0.07, rotulo: 'Nervos e pele: formigamento, coceira e manchas' },
              ],
            },
          },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m1v3-pele-marmorizada.jpg'), legenda: 'Pele marmorizada: manchas arroxeadas que podem acompanhar a doença descompressiva e pedem avaliação.' } },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Doença descompressiva em voo: passo a passo',
              colunas: ['Passo', 'O que fazer'],
              linhas: [
                ['1', 'Máscara e oxigênio a 100% imediatamente.'],
                ['2', 'Descida de emergência e pouso o quanto antes.'],
                ['3', 'Manter imóvel a articulação dolorida.'],
                ['4', 'Avaliação médica mesmo que os sintomas sumam, respirando oxigênio.'],
                ['5', 'Se persistirem ou voltarem: câmara hiperbárica (Veja M1V3 - IV).'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.3',
      titulo: 'Mergulho e voo',
      pergunta: 'Quanto tempo esperar entre o mergulho e o avião?',
      conteudo: {
        texto: [
          "No fundo do mar, a pressão é maior e o corpo **absorve mais nitrogênio** (Veja M1V1 - II). Na volta à superfície, parte dele ainda está saindo dos tecidos. Se a pessoa sobe logo em seguida, a pressão cai de novo, e o nitrogênio que restava forma bolhas.",
          "O efeito é enorme. **Depois de mergulhar, voar a 8.000 ft equivale a um não mergulhador subir a 40.000 ft sem pressurização.** E 8.000 ft é justamente a altitude da cabine de um avião de linha em cruzeiro (Veja M1V2 - II): o passageiro mergulhador não está protegido.",
          "Por isso a FAA fixa esperas mínimas. Depois de **mergulho sem parada de descompressão**, **12 horas** antes de voar até 8.000 ft. Depois de **mergulho com parada de descompressão**, **24 horas**. Para voar **acima de 8.000 ft**, **24 horas após qualquer mergulho**. São mínimos: **esperar mais é mais seguro**.",
          "A mesma lógica vale para outras exposições à pressão. Depois de um treino em **câmara hipobárica**, também se esperam **24 horas** para voar. E depois de um voo sem pressurização acima de 18.000 ft, o ideal é **evitar esforço físico por 24 horas**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m1v3-mergulhador-subida.jpg'), legenda: 'A subida ao fim do mergulho começa a liberar o nitrogênio absorvido no fundo, mas parte dele continua nos tecidos por horas.' } },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m1v3-mergulhador-aviao.jpg'), legenda: 'Depois do mergulho, até a cabine de um avião de linha pode ser altitude demais para quem ainda carrega nitrogênio.' } },
          { paragrafo: 3, midia: 'mergulho-voo' },
        ],
      },
    },
    {
      id: '3.4',
      titulo: 'Câmaras de pressão',
      pergunta: 'Como uma câmara pode simular a altitude e também tratar as bolhas?',
      conteudo: {
        texto: [
          "Uma **câmara de pressão** é um compartimento fechado em que se controla a pressão do ar. Ela trabalha nos dois sentidos: a **câmara hipobárica** tira ar e simula a altitude; a **câmara hiperbárica** põe ar e simula a profundidade do mar.",
          "A câmara **hipobárica** ensina sem risco de voo. Num curso de um dia, o aluno vive uma **descompressão rápida de 8.000 para 18.000 ft** e, depois, a **hipóxia a 25.000 ft**, para reconhecer os próprios sintomas sob supervisão. O treinamento é recomendado a todos os pilotos (Veja M3V3).",
          "A câmara **hiperbárica** é o tratamento da doença descompressiva. A mais usada é a **Tabela 6 da Marinha dos EUA**: **2,8 atmosferas, o equivalente a 18 metros de mar, respirando oxigênio a 100%**. A pressão encolhe a bolha para cerca de **um terço do volume** (lei de Boyle), e o oxigênio puro tira o nitrogênio do caminho.",
          "O segredo está no gradiente. Com oxigênio puro a 2,8 atmosferas, a diferença de pressão de nitrogênio entre a bolha e o tecido chega a **2.086 mmHg, contra 142 mmHg na superfície**: o nitrogênio sai da bolha muito mais depressa. Nem todo centro hiperbárico trata a doença descompressiva de altitude, e **localizar o serviço certo faz parte da conduta**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m1v3-camara-hipobarica.jpg'), legenda: 'Na câmara hipobárica, os alunos sobem sem sair do chão e aprendem a reconhecer a própria hipóxia, sob o olhar do instrutor.' } },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m1v3-camara-hiperbarica.jpg'), legenda: 'Na câmara hiperbárica, o paciente respira oxigênio puro sob pressão enquanto o operador controla a profundidade e o tempo.' } },
          { paragrafo: 3, midia: 'camara-pressao' },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '3.1',
      dificuldade: 'media',
      pergunta: 'O que caracteriza uma descompressão explosiva?',
      opcoes: [
        'A cabine perde pressão em minutos, sem ruído.',
        'A cabine perde pressão mais rápido do que os pulmões conseguem esvaziar.',
        'Os pulmões esvaziam antes da cabine.',
        'A pressão da cabine sobe acima da externa.',
      ],
      correta: 1,
      explicacao: 'Na explosiva, em geral em menos de 0,5 segundo, o ar preso nos pulmões fica com pressão maior que a da cabine: é o maior risco de lesão pulmonar.',
    },
    {
      topico: '3.1',
      dificuldade: 'facil',
      pergunta: 'Por que a descompressão lenta é tão perigosa quanto a rápida?',
      opcoes: ['Porque causa lesão pulmonar grave.', 'Porque pode passar despercebida enquanto a hipóxia se instala.', 'Porque congela a cabine.', 'Porque sempre derruba as máscaras tarde demais.'],
      correta: 1,
      explicacao: 'Sem estrondo nem névoa, a queda gradual pode não ser notada, e a hipóxia tira o julgamento antes que alguém reaja.',
    },
    {
      topico: '3.2',
      dificuldade: 'dificil',
      pergunta: 'Na descida, os sintomas de doença descompressiva de um piloto desaparecem. Qual é a conduta?',
      opcoes: ['Seguir o voo normalmente.', 'Pousar e buscar avaliação médica, respirando oxigênio.', 'Subir de novo para testar.', 'Retirar a máscara para economizar oxigênio.'],
      correta: 1,
      explicacao: 'Mesmo com melhora, é preciso pousar e ser avaliado com oxigênio; se os sintomas voltarem ou persistirem, o tratamento é hiperbárico.',
    },
    {
      topico: '3.2',
      dificuldade: 'media',
      pergunta: 'Qual é o fator de risco mais forte para a doença descompressiva de altitude?',
      opcoes: ['Tempo em altitude', 'Cor dos olhos', 'Temperatura da cabine pressurizada', 'Altura da pessoa'],
      correta: 0,
      explicacao: 'O tempo de permanência em altitude é o preditor mais forte; somam-se subida rápida, exposições repetidas, esforço e mergulho recente.',
    },
    {
      topico: '3.3',
      dificuldade: 'media',
      pergunta: 'Depois de um mergulho sem parada de descompressão, quanto tempo esperar para voar num avião de linha (cabine até 8.000 ft)?',
      opcoes: ['2 horas', '6 horas', 'Pelo menos 12 horas', 'Não é preciso esperar'],
      correta: 2,
      explicacao: 'A FAA pede ao menos 12 horas; com parada de descompressão, ou para voar acima de 8.000 ft, 24 horas.',
    },
    {
      topico: '3.4',
      dificuldade: 'dificil',
      pergunta: 'Como funciona o tratamento na Tabela 6 da Marinha dos EUA?',
      opcoes: [
        'Simula 25.000 ft para acelerar a saída das bolhas.',
        'Pressão de 2,8 atmosferas com oxigênio a 100%: a bolha encolhe e o nitrogênio sai mais depressa.',
        'Ar comprimido ao nível do mar por 30 minutos.',
        'Hélio a 1 atmosfera.',
      ],
      correta: 1,
      explicacao: 'A 2,8 ATA (18 m de mar), a bolha encolhe pela lei de Boyle e o gradiente de nitrogênio sobe de 142 para 2.086 mmHg com oxigênio puro.',
    },
  ],
};
