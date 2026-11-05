// Missão 2 (Sistemas) · Voo 4 — Olhos e visão (o número do voo é definido em secoes.ts).
// Escrito no modelo de Sistemas (docs/modelo-sistemas.md), com o detalhamento prático do padrão do jet lag, em
// 04/11/2026, a pedido do autor ("Olhos e visão", seguindo os padrões do app). Os tópicos da lista antiga (acuidade,
// visão noturna, visão de cores, lasers, padrões visuais, doenças oculares, correção e cirurgia) viraram 8 tópicos, com
// um tópico de abertura. As ilusões visuais ficam no M2V5 (Labirinto e orientação espacial).
//
// REGISTRO DE REVISÃO (04/11/2026) — fontes:
// - ICAO, Doc 8984, 3ª ed. (PDF enviado pelo autor), Part III, Cap. 11, Ophthalmology: Anexo 1 6.2.3 (acuidade com
//   Landolt, iluminação de escritório); 6.2.4.1–6.2.4.4 (cores: placas pseudoisocromáticas à luz do dia ou iluminante
//   C/D65; quem falha é inapto, a não ser que distinga prontamente as cores da navegação aérea e identifique as luzes
//   coloridas; senão, só Classe 2 com a restrição "válido só de dia"); 6.2.4.4.1 (óculos de sol não polarizados e cinza
//   neutro); 6.3.3.1 (olhos e anexos normais, sem doença ativa nem sequela); 6.3.3.2 (Classe 1: 6/9 em cada olho e 6/6
//   binocular, sem limite para a acuidade sem correção; usar a correção e ter óculos de reserva); 6.3.3.2.1 (lente de
//   contato monofocal, sem cor, bem tolerada, mais óculos de reserva); 6.3.3.2.2 (erro grande: lente de contato ou
//   lente de alto índice); 6.3.3.2.3 (sem correção pior que 6/60: relatório oftalmológico no exame inicial e a cada
//   5 anos); 6.3.3.3 (cirurgia refrativa: inapto se houver sequela); 6.3.3.4 (N5 a 30–50 cm e N14 a 100 cm; um só par
//   de óculos para longe e perto; óculos de leitura de lente inteira não aceitos; Nota 3: informar as distâncias da
//   cabine ao óptico); 6.3.3.4.1 (segundo par para perto); 6.3.3.5–6.3.3.6.1 (campos e visão binocular normais;
//   estereopsia reduzida e desvio compensado podem ser aceitos); 6.4.3.2 (Classe 2: 6/12 em cada olho e 6/9 binocular);
//   11.1.2–11.1.11 (fatores do voo: velocidade, altitude, iluminação, ofuscamento, aceleração, vibração, ergonomia,
//   cabine; luz refletida das nuvens deixa o painel na sombra; céu mais escuro e contraste maior com a altitude;
//   hipóxia leve, mesmo pressurizada, pode piorar a adaptação ao escuro, reduzir campo e acuidade e subir um pouco a
//   pressão do olho; ar seco irrita olhos; miopia de campo vazio, noturna ou espacial de até várias dioptrias; pouca luz
//   piora a acuidade e a presbiopia; luz vermelha piora a leitura pela aberração cromática e, na aviação comercial, o
//   ganho de adaptação não compensa; G: visão cinza, preta ou vermelha; vibração de 22–64 Hz e de 2–10 Hz; cores do
//   EFIS; defeitos azul-amarelo adquiridos); 11.2.2 (olho vermelho, dor, visão borrada, luz incomodando e lacrimejamento
//   sugerem uveíte anterior: encaminhar com urgência); 11.3.1–11.3.3 (1 minuto de arco; 6/6 = 20/20 = 1,0; Snellen,
//   1862; muitos normais veem 6/5 a 6/3); 11.3.13 (luminâncias: fotópica > 10 cd/m², escotópica < 5 × 10⁻³ cd/m²);
//   11.3.20 (movimento angular acima de 10°/s borra; a 145 kt só 500 m² podem ser examinados); 11.3.23 (pupila
//   dilatada no escuro: aberração e miopia induzida); 11.4.6–11.4.18 (presbiopia: meia-lua, bifocal, trifocal,
//   progressiva; hipermetrope tem presbiopia mais cedo; painel superior; óculos de leitura assim que surgir a
//   presbiopia; reserva); 11.4.19–11.4.28 (lente de contato: risco de abrasão, alergia, úlcera e infecção; bifocal de
//   contato não aceita; monovisão não aceita; ar seco reduz o tempo de uso da lente gelatinosa; lágrima artificial sem
//   conservante); 11.4.29–11.4.36 (óculos de sol; UVB controlado pelo ozônio; janelas da cabine protegem muito bem do UV;
//   luz azul aumenta com a altitude e 50–60% atravessa o para-brisa de 3 cm; prudente usar óculos de sol voando para o
//   sol; até 85% de absorção da luz visível; polarizado não aceito por reflexos dos laminados; fotocromático clareia
//   devagar; lente escura só de dia); 11.4.37–11.4.45 (afacia; lente intraocular de câmara posterior; muitos enxergam bem
//   no dia seguinte, refração estável em 6–8 semanas; só lente intraocular monofocal é adequada à aviação; opacificação
//   da cápsula tratada com YAG em minutos); 11.4.46–11.4.65 (cirurgia refrativa: raramente há motivo para operar só
//   para cumprir o requisito; LASIK com retalho que pode deslocar meses depois, às vezes ao coçar; riscos de ofuscamento,
//   halos, perda de contraste e regressão; PRK e LASIK não deixam cicatriz visível; prazo desde a suspensão do colírio:
//   até 6 D, 3 meses; 6–10 D, LASIK 3 e PRK 6 meses; acima de 10 D, 6 meses; critérios e revisão 6 meses depois e
//   anualmente; risco de atraso ou de perda definitiva do certificado); 11.5.2–11.5.6 (6/30 a 10° da fóvea; campo de
//   95° temporal, 60° nasal, 60° acima e 75° abaixo; luz forte e laser deixam pós-imagem e escotoma; hipóxia estreita
//   o campo a partir de 1.000–1.500 m); 11.6.1–11.6.7 (um olho vê cerca de 140°; sem estereopsia mas com noção de
//   profundidade à distância; monocular só pela cláusula de flexibilidade, depois de ao menos 6 meses de adaptação e
//   teste em voo); 11.8.1–11.8.44 (cores na cabine; 8% dos homens e 0,8% das mulheres falham; mais de 99% vermelho-
//   verde; deuteranomalia 4,6%, protanomalia 1,0%, deuteranopia 1,4%, protanopia 1,2%; congênito, ligado ao X, não
//   progride; pior com pouca luz; confusão entre sinais vermelho, branco e verde; placas, D-15, lanternas,
//   anomaloscópio; sem lente "corretora"; adquiridos por retina, nervo, glaucoma e remédios — hidroxicloroquina,
//   digitálico, etambutol; sildenafil: tom azulado em 3–11% dos usuários por até 5 h ou mais; acidente do FedEx 1448,
//   Tallahassee, 2002, com o PAPI); 11.9.1–11.9.2 (condições que tornam inapto até avaliação especializada); 11.10.1–
//   11.10.14 (glaucoma: pressão ≥ 24 mmHg ou diferença ≥ 5 mmHg, encaminhar; mióticos em geral não permitidos;
//   betabloqueador e prostaglandina úteis; inibidor de anidrase carbônica em colírio; controle regular).
// - ANAC, RBAC 67, Emenda 05 (PDF enviado pelo autor): 67.99 (1ª classe) e 67.139 (2ª classe): (a) olhos normais;
//   (b) cirurgia refrativa há mais de 6 meses, com teste de ofuscamento e de sensibilidade ao contraste se pedido;
//   (c)(1) 20/30 em cada olho e 20/20 binocular (2ª: 20/40 e 20/30); (c)(2) J1 a 30–50 cm e J6 a 100 cm (2ª: só J1);
//   (c)(3) um único par para perto e longe; bifocal, multifocal e meia-taça aceitos; (c)(4) uso da correção e óculos de
//   reserva no CMA, mesmo com lente de contato; (c)(5) cores das tabelas ou, no mínimo, as cores básicas da aviação
//   (amarelo, azul, verde, vermelho, branco, preto e âmbar); (c)(6) monocular só na revalidação ou no exame inicial
//   depois de acidente ou incidente grave; (c)(7)–(8) equilíbrio muscular e sem heterotropia; (c)(9) campos, pressão,
//   fundo de olho e córneas normais; (d) apresentar a correção e a reserva quando pedido; (e) exames adicionais por
//   queda da acuidade, doença, lesão ou cirurgia do olho; (g) lente de contato monofocal, sem cor, bem tolerada, com
//   óculos de reserva; (h) erro grande: lente de contato ou óculos de alto índice; (i) não usar lente de contato e
//   óculos no mesmo olho; (j) sem correção pior que 20/200: relatório oftalmológico no inicial e a cada 5 anos;
//   (k) estereopsia reduzida e desvio compensado podem ser aptos.
// - FAA, Guia do AME: Visual Acuity Standards (29/05/2019): longe 20/20 em cada olho na 1ª e 2ª classes e 20/40 na 3ª;
//   perto 20/40 a 16 pol (40 cm); intermediária 20/40 a 32 pol (80 cm) a partir dos 50 anos na 1ª e 2ª. Item 31-34,
//   lentes de contato: monovisão não permitida; lente colorida não aceita; lente de contato só para longe nos dois olhos
//   aceita. Item 52 (cores): desde 01/01/2025, triagem única por computador; quem falha recebe 3ª classe com a limitação
//   104, "válido só para VFR diurno"; 1ª e 2ª por recurso ao Federal Air Surgeon; lentes X-Chrom não aceitas.
//   Refractive Surgery e Lens Implant Disposition Tables (LASIK, PRK, SMILE; lentes monofocais, tóricas, ajustáveis e
//   para presbiopia, multifocais e de foco estendido): 3 meses ou mais com recuperação completa, sem remédio e sem
//   ofuscamento, halos ou má visão noturna, em geral sem preocupação; menos de 3 meses, com o Status Summary do
//   oftalmologista ou optometrista todo "sim"; complicações, adiar para a FAA. Item 31: descolamento de retina
//   corrigido, glaucoma de ângulo aberto controlado e de ângulo fechado operado podem ser aceitos com avaliação; catarata
//   operada pode ser emitida pelo AME com relatório. CACI Glaucoma: pressão ≤ 23 mmHg nos dois olhos; sem defeito de
//   campo (Humphrey 24-2 ou 30-2, Octopus); aceitos prostaglandinas, inibidores de anidrase carbônica, betabloqueadores
//   e alfa-agonistas; não aceitos pilocarpina ou outros mióticos, cicloplégicos (atropina) e remédio oral; não aceitos
//   glaucoma de pressão normal, secundário e cirurgia filtrante; ângulo fechado só depois de iridotomia ou iridectomia.
//   Eye Medication: ciclopentolato 24 h sem voar; fenilefrina e tropicamida 8 h; atropina e pilocarpina inaceitáveis;
//   colírio anti-histamínico não pingar logo antes nem durante o voo. Pharm ED: sildenafil, vardenafil e avanafil 8 h;
//   tadalafil sob demanda 24 h. AC 70-2B (laser: distração, ofuscamento, pós-imagem e cegueira por clarão, raramente
//   lesão persistente; não olhar o feixe e proteger os olhos; evitar a área; avisar o controle com posição, altitude,
//   cor e direção; o controle trata como emergência em voo; questionário depois do pouso). FAA JO 7400.2, 29-1
//   (definições: ofuscamento, cegueira por clarão, pós-imagem que pode durar vários minutos; zona livre de laser até
//   2.000 ft AGL e 2 NM da pista, 50 nW/cm²; zona crítica até 10.000 ft AGL e 10 NM, 5 µW/cm²; zona sensível,
//   100 µW/cm² — o texto da página exibe "mW" por erro de símbolo). FAA, notícia de 2025: 12.840 relatos de laser em
//   2024; 328 lesões relatadas desde 2010; multa civil de até US$ 11.000 por violação e US$ 30.800 por vários casos;
//   crime federal com até 5 anos de prisão e US$ 250.000. Airplane Flying Handbook (FAA-H-8083-3C), Cap. 11:
//   adaptação máxima ao escuro em até 30 min; cones e bastonetes; ponto cego noturno nos 5–10° centrais; olhar de lado;
//   luz forte por 1 s ou mais prejudica; fechar um olho; luz vermelha não prejudica a adaptação mas distorce as cores
//   das cartas; hipóxia acima de 10.000 ft de dia e 5.000 ft à noite; fumantes mais suscetíveis. Pilot Vision (CAMI,
//   versão em espanhol) e AIM, Fitness for Flight (faraim.org): movimentos de até 10°, cada área por ao menos 1 s;
//   cerca de 4–5 s no painel para cada 16 s fora; sem alvo, o olho relaxa a 10–30 pés (3–9 m); refocar leva vários
//   segundos. Sunglasses for Pilots: filtrar 70–85% da luz visível, não mais de 85%; cinza neutro; 99–100% de UVA e UVB;
//   polarizado não recomendado (apaga instrumentos com filtro antirreflexo); fotocromático não recomendado; UV sobe cerca
//   de 5% a cada 1.000 ft.
// - CENIPA (FAB), Gerenciamento de risco, Raio laser: distração, ofuscamento e cegueira momentânea; risco de perda de
//   controle, sobretudo com um só piloto; ficha de notificação conforme o Doc 9815 da OACI; Código Penal, art. 261
//   (expor a perigo aeronave ou dificultar a navegação aérea): reclusão de 2 a 5 anos.
// - Houston S, Graf J, Sharkey J. Commercial air travel after intraocular gas injection. Aviat Space Environ Med
//   2012;83:809–10: risco de perda grave da visão com a pressão menor da cabine; não voar até o gás ser absorvido;
//   cerca de 2 semanas depois de SF6 e 6 semanas depois de C3F8.
// - IATA, Medical Manual, 11ª ed. (2018), citado por GPnotebook (Eye surgery and air travel): cirurgia de catarata e
//   laser de córnea, ≥ 24 h; cirurgia dentro do olho e ferimento penetrante, ≥ 7 dias; gás: SF6 mínimo 2 semanas; C2F6
//   e C3F8 mínimo 6 semanas.
// - UK CAA, Guidance following eye surgery (pilotos): catarata, inapto por ao menos 6 semanas; cirurgia de retina,
//   relatório com revisão em 3 meses; glaucoma: trabeculectomia 3 meses, stent 6 semanas, trabeculoplastia a laser
//   1 semana; LASIK e SMILE, relatório em 3–4 semanas; PRK, cerca de 8 semanas; YAG sem complicação, volta com relatório.
// Condutas práticas sem número próprio (olhar para longe a cada pouco, não coçar o olho operado, avisar o cirurgião de
// que voa, levar o colírio na bagagem de mão, deixar o outro piloto nos comandos quando um laser atinge a cabine) são
// aplicações das fontes acima. Sem fonte: [confirmar na referência]. Prazos não estimados.

import { liberacaoOlhos } from '../liberacao/olhos';
import type { Capitulo } from '../tipos';

const foto = (arquivo: number, legenda: string) => ({ imagem: arquivo, legenda });

export const olhos: Capitulo = {
  numero: 4,
  titulo: 'Olhos e visão',
  tempoLeituraMin: 45,
  laboratorio: ['adaptacao-escuro'],
  topicos: [
    {
      id: '4.1',
      titulo: 'Olhos e visão em altitude',
      pergunta: 'O que a cabine faz com os olhos?',
      conteudo: {
        texto: [
          "No voo, **ver é o primeiro passo** de quase toda reação: o piloto percebe, decide e só então age. O olho tem dois tipos de célula que captam a luz. Os **cones** ficam no centro, na **fóvea**, e dão as **cores** e os **detalhes** com luz forte; os **bastonetes** ficam em volta e funcionam com **pouca luz**, sem cores. Só a fóvea vê nítido: a apenas **10°** dela, a acuidade já cai para **6/30**, cinco vezes pior que o normal.",
          "A cabine muda a visão de vários jeitos. Mesmo pressurizada, um **pouco de hipóxia** pode piorar a **adaptação ao escuro**, estreitar o **campo visual**, baixar a **acuidade** e subir um pouco a **pressão dentro do olho** (Veja M2V1 - IV). O campo pode encolher já entre **1.000 e 1.500 m** (cerca de **3.300 a 4.900 ft**); à noite, sem oxigênio, a visão pode piorar acima de **5.000 ft**, e o fumante sente antes.",
          "O **ar seco** da cabine resseca e irrita os olhos nos voos longos, e a **lente de contato gelatinosa** passa a incomodar mais cedo. O olho não tem ar preso como o ouvido, com uma exceção grave: o **gás** que o cirurgião injeta no olho depois de uma cirurgia de retina se **expande** com a altitude (Veja M1V1 - II e M2V4 - VIII).",
          "Acima das nuvens, a **luz vem de baixo**: as nuvens refletem o sol para cima e o painel fica na sombra, enquanto lá fora tudo brilha. O céu fica mais escuro e o **contraste** aumenta. O **ultravioleta** sobe cerca de **5% a cada 1.000 ft**, mas as **janelas da cabine** barram muito bem o UV; o que passa é a **luz azul**, que aumenta com a altitude e atravessa o para-brisa em 50% a 60%.",
          "A **velocidade** também cobra: um movimento acima de **10° por segundo** no campo de visão já borra a imagem. A **vibração** dos instrumentos entre **22 e 64 Hz**, comum no helicóptero, e a de **2 a 10 Hz** da turbulência atrapalham a leitura (Veja M1V6 - IV). Na acrobacia e no voo militar, a **força G** escurece a visão antes de apagar a consciência (Veja M1V7 - II).",
          "**Como proteger os olhos no voo.** Antes, durma bem, traga os **óculos** em dia e o **par de reserva**, e um **óculos de sol cinza neutro**. Durante, pisque mais, use **lágrima artificial sem conservante** se o olho secar, tire a lente de contato se incomodar e não esfregue os olhos. À noite, use oxigênio quando a regra pedir (Veja M2V4 - III). Depois de voos longos, o olho seco costuma melhorar em terra; dor, vermelhidão ou visão borrada que não passam pedem avaliação (Veja M2V4 - VII).",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v4-1-nuvens.jpg'), 'Acima das nuvens, a luz vem de baixo: o painel fica na sombra e lá fora tudo brilha.') },
          {
            paragrafo: 2,
            tabela: {
              titulo: 'O que muda em altitude',
              colunas: ['Fator do voo', 'O que acontece no olho', 'Quem é mais vulnerável'],
              linhas: [
                ['Menos oxigênio', 'Adaptação ao escuro, campo e acuidade pioram; a pressão do olho sobe um pouco', 'Voo noturno sem oxigênio, fumantes: a retina, sobretudo os bastonetes da visão noturna, consome muito oxigênio e sente a queda primeiro; no fumante, o monóxido de carbono ocupa parte da hemoglobina e soma hipóxia à da cabine'],
                ['Ar seco', 'Olho seco e irritado; a lente de contato incomoda', 'Voos longos, quem usa lente gelatinosa: o ar seco evapora a lágrima mais depressa; a lente absorve água e cobre a córnea, que recebe menos lágrima e menos oxigênio'],
                ['Gás que expande', 'O gás injetado no olho cresce e aumenta a pressão', 'Quem operou a retina com gás: a bolha fica presa dentro do olho fechado; ao crescer, sobe a pressão do olho e pode fechar a artéria da retina'],
                ['Luz acima das nuvens', 'Ofuscamento, painel na sombra, mais luz azul', 'Quem voa para o sol, sem óculos de sol: acima das nuvens a luz chega direta e refletida; sem filtro, a pupila fecha e o olho demora a se readaptar ao painel na sombra'],
                ['Velocidade e vibração', 'A imagem borra e os instrumentos tremem', 'Pouso, turbulência, helicóptero: o olho balança dentro da órbita, e o reflexo que estabiliza a imagem não acompanha a vibração rápida'],
                ['Força G', 'A visão fica cinza e depois preta', 'Acrobacia e voo militar: a pressão dentro do olho se opõe à do sangue; com G alto o sangue chega fraco à cabeça, e a retina perde o fluxo antes do cérebro'],
              ],
            },
          },
          { paragrafo: 3, figura: foto(require('@/assets/images/topicos/m2v4-1-colirio.jpg'), 'Lágrima artificial sem conservante alivia o olho ressecado pelo ar seco da cabine.') },
          { paragrafo: 4, midia: 'uv-altitude' },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como proteger os olhos no voo',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Antes', 'Óculos em dia, par de reserva e óculos de sol cinza neutro na bagagem de mão'],
                ['Antes, com lente de contato', 'Levar estojo, solução e os óculos para trocar'],
                ['Durante', 'Piscar mais, lágrima artificial sem conservante, não esfregar os olhos'],
                ['Acima das nuvens', 'Óculos de sol, sobretudo voando para o sol'],
                ['À noite', 'Preservar a adaptação ao escuro e usar oxigênio quando a regra pedir'],
                ['Depois', 'Dor, vermelhidão ou visão borrada que não passam: avaliação'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '4.2',
      titulo: 'Acuidade visual, óculos e lentes',
      pergunta: 'Quanto o piloto precisa enxergar, e com que óculos?',
      conteudo: {
        texto: [
          "A **acuidade visual** mede o menor detalhe que o olho separa. A unidade é **1 minuto de arco**, a abertura que o olho normal consegue distinguir; quem vê esse detalhe a 6 m tem acuidade **6/6**, o mesmo que **20/20** em pés ou **1,0** em decimal. A tabela de letras foi criada por **Snellen** em 1862. Muita gente com olho normal enxerga melhor que isso, entre **6/5 e 6/3**.",
          "Para o tripulante, cada norma tem o seu número. Na **ANAC**, a 1ª classe pede **20/30 em cada olho** e **20/20 com os dois**, e a 2ª, **20/40** e **20/30**. A **ICAO** pede o mesmo: **6/9** e **6/6** na Classe 1, e **6/12** e **6/9** na Classe 2. A **FAA** pede **20/20 em cada olho** na 1ª e na 2ª classes e **20/40** na 3ª. De perto, todas exigem ler letra pequena a uma distância de leitura; a ANAC e a ICAO pedem também a distância do painel, a 100 cm, e a FAA, a 80 cm, a partir dos 50 anos.",
          "Vale **com ou sem óculos**: a ICAO não tem limite para a visão sem correção. Quem enxerga **pior que 20/200** sem óculos em algum olho apresenta um **relatório oftalmológico** no primeiro exame e depois **a cada 5 anos**. Quem precisa de correção tem de **usá-la** no voo e levar **óculos de reserva**, mesmo quando usa lente de contato; isso vem escrito no certificado médico.",
          "A **presbiopia**, a vista cansada, chega devagar: primeiro a leitura falha **com pouca luz** ou cansaço, e o **hipermetrope** a sente mais cedo. O piloto deve ter um **único par** que sirva para longe e para perto, sem trocar nem tirar os óculos: **meia-lua**, **bifocal**, **trifocal** ou **multifocal**. Óculos de leitura de lente inteira **não servem**, porque borram a pista. Quando surge a presbiopia, o certo é pegar os óculos logo, sem esperar a letra pequena falhar de dia.",
          "A **lente de contato** é aceita se for **monofocal**, **sem cor** e **bem tolerada**, sempre com os óculos de reserva. Não se usa lente de contato e óculos **no mesmo olho**, nem a **monovisão**, um olho corrigido para longe e o outro para perto, porque o olho de perto enxerga mal a distância. Quem tem grau muito alto usa lente de contato ou óculos de **alto índice**, que deformam menos as bordas.",
          "**Como enxergar bem na cabine.** Leve ao oftalmologista as **distâncias** que você usa no avião: painel, painel de cima e cartas. Tenha o par de reserva **na cabine**, não na mala despachada. O passageiro não tem exigência de acuidade, mas leva os óculos e a receita na bagagem de mão. O tripulante que voa **sem a correção exigida** descumpre a restrição do certificado: a ANAC pode pedir para ver os óculos e a reserva, e o examinador pede novos exames se a visão cair ou houver doença, lesão ou cirurgia no olho.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v4-2-tabela.jpg'), 'No exame, cada olho é testado separado, com e sem a correção.') },
          { paragrafo: 2, midia: 'acuidade-normas' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · acuidade e correção',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Enxerga bem com óculos ou lentes', 'Pode voar; leve os óculos na bagagem de mão', 'Apto se cumprir a acuidade com a correção; usar e levar reserva'],
                ['Sem correção pior que 20/200', 'Pode voar', 'Relatório oftalmológico no inicial e a cada 5 anos'],
                ['Óculos de leitura de lente inteira', 'Pode voar', 'Não aceito: precisa de meia-lua, bifocal ou multifocal'],
                ['Monovisão com lente de contato', 'Pode voar', 'Não aceita (ANAC, ICAO e FAA)'],
                ['Lente de contato colorida', 'Pode voar', 'Não aceita'],
                ['Visão que caiu desde o último exame', 'Procure o oftalmologista', 'O examinador pede exames adicionais'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v4-2-meia-lua.jpg'), 'Com a meia-lua ou o bifocal, o piloto lê a carta e olha a pista sem trocar de óculos.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · acuidade e óculos',
              colunas: ['Situação', 'O que fazer'],
              linhas: [
                ['Consulta ao oftalmologista', 'Levar as distâncias do painel, do painel de cima e das cartas'],
                ['Antes de cada voo', 'Óculos limpos e par de reserva na cabine'],
                ['Presbiopia começando', 'Pegar os óculos de perto logo, sem esperar a leitura falhar de dia'],
                ['Lente de contato', 'Só monofocal e sem cor, com óculos de reserva; nunca monovisão'],
                ['Painel de cima difícil de ler', 'Pedir um segmento de perto na parte de cima da lente'],
                ['Passageiro', 'Óculos e receita na bagagem de mão'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '4.3',
      titulo: 'Visão noturna',
      pergunta: 'Por que se enxerga pior à noite em voo?',
      conteudo: {
        texto: [
          "À noite, quem trabalha são os **bastonetes**, que veem com pouquíssima luz, mas **sem cores** e **sem detalhes**. Eles não existem no centro do olho: nos **5° a 10° centrais** do campo, onde ficam só os cones, se forma um **ponto cego noturno**. Por isso uma luz fraca **some quando se olha direto** para ela e reaparece quando se olha **um pouco de lado**.",
          "A **adaptação ao escuro** leva **até 30 minutos**: os cones se ajustam em poucos minutos e os bastonetes continuam ganhando sensibilidade depois. Uma luz forte por **1 segundo ou mais** desfaz parte desse ganho; os flashes das luzes anticolisão, mais curtos, não. Fechar um olho diante de uma luz forte preserva a adaptação dele.",
          "A **luz vermelha** na cabine não atrapalha a adaptação, mas **distorce as cores** das cartas e piora a leitura de quem tem presbiopia. Na aviação comercial, quase tudo vem dos instrumentos, e a ICAO considera que o pequeno ganho da luz vermelha ou da luz branca fraca não compensa a perda de leitura. Na aviação geral, a adaptação ao escuro ainda importa em muitas situações.",
          "A visão noturna é das primeiras funções a sofrer com a **hipóxia** (Veja M2V1 - IV). Sem oxigênio, ela piora acima de **5.000 ft** à noite, e o **fumante**, com monóxido de carbono no sangue, sente em altitude ainda menor. No escuro, a **pupila dilata**, a imagem perde nitidez e o olho tende a focar perto, a **miopia noturna**, de até várias dioptrias.",
          "Enxerga pior à noite quem tem **presbiopia** sem correção, quem fez **cirurgia refrativa** e ficou com **halos** ou perda de contraste, quem usa **lente escura**, que é só para o dia, e quem tem **cegueira noturna**, a nictalopia, que torna o tripulante inapto até avaliação. Voar à noite assim, sem liberação, aumenta o risco de não ver outro avião, o terreno ou a pista.",
          "**Como preservar a visão noturna.** Chegue à aeronave com tempo para os olhos se adaptarem e evite luz branca forte antes da decolagem. Use a menor luz que permita ler os instrumentos e feche um olho diante de um farol. Para achar algo fraco, olhe **de lado**, a 5° a 10°, e mova o olhar devagar. Em voo não pressurizado, use **oxigênio** acima de 5.000 ft à noite e não fume antes de voar.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v4-3-noite.jpg'), 'À noite, quem enxerga são os bastonetes: sem cores e sem detalhes.') },
          { paragrafo: 1, midia: 'ponto-cego-noturno' },
          { paragrafo: 2, midia: 'adaptacao-escuro' },
          { paragrafo: 3, video: { fonte: require('@/assets/videos/m2v4-noite.mp4'), legenda: 'À noite, o piloto baixa a luz do painel para preservar a adaptação dos olhos ao escuro.' } },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v4-3-pista.jpg'), 'Na aproximação noturna, as luzes da pista são quase tudo o que o piloto vê.') },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Liberação para voo · visão noturna',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Dificuldade nova para ver à noite', 'Procure o oftalmologista', 'Avaliação antes de voar à noite'],
                ['Halos ou ofuscamento depois de cirurgia refrativa', 'Pode voar', 'Não apto até os sintomas passarem (Veja M2V4 - VIII)'],
                ['Cegueira noturna (nictalopia)', 'Pode voar', 'Inapto até avaliação especializada'],
                ['Óculos ou lente escura', 'Pode voar', 'Só de dia; nunca no crepúsculo ou à noite'],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · visão noturna',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Antes do voo', 'Chegar com tempo; evitar luz branca forte; não fumar'],
                ['Na cabine', 'A menor luz que permita ler; luz vermelha só se não precisar das cores das cartas'],
                ['Diante de um farol', 'Fechar um olho para preservar a adaptação dele'],
                ['Procurando algo fraco', 'Olhar de lado, a 5° a 10°, e mover o olhar devagar'],
                ['Voo não pressurizado', 'Oxigênio acima de 5.000 ft à noite'],
                ['Quem tem presbiopia', 'Óculos de perto à mão; a leitura piora com pouca luz'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '4.4',
      titulo: 'Padrões visuais: varredura e campo de visão',
      pergunta: 'Como olhar o céu para achar outro avião?',
      conteudo: {
        texto: [
          "O olho vê um **campo** largo, mas nítido só no centro. Com o olhar parado, um olho normal alcança cerca de **95°** para o lado de fora, **60°** para o lado do nariz, **60°** para cima e **75°** para baixo; um olho sozinho cobre uns **140°** na horizontal. A periferia percebe **movimento**, mas não detalhe: para identificar um avião, é preciso trazê-lo para a **fóvea**.",
          "Por isso o céu se examina em **varredura**: o olhar salta em movimentos de **até 10°** e para em cada trecho por **pelo menos 1 segundo**, tempo para o olho perceber um ponto. Um padrão regular, de um lado para o outro, evita deixar setores sem olhar. Para cada **16 segundos** olhando para fora, gaste uns **4 a 5 segundos** no painel.",
          "Sem nada para focar, como acima das nuvens, na névoa ou à noite, o olho **relaxa** e foca a uns **3 a 9 m**, a **miopia de campo vazio**: o piloto olha e não vê. Trocar o foco entre o painel e o horizonte também leva **vários segundos**. Na velocidade do pouso, a cerca de **145 kt**, só uma área de uns **500 m²** pode ser examinada sem a imagem borrar.",
          "A **visão de um olho só** tem campo menor e perde a **estereopsia**, a visão em 3D de perto, mas não perde a noção de profundidade a distância: além de uns **10 m**, ela vem de sombras, tamanho aparente, perspectiva e do deslocamento dos objetos quando a cabeça se move. A ANAC só aceita o tripulante **monocular** na revalidação ou no exame depois de acidente ou incidente grave, se o olho bom cumprir os requisitos; a ICAO, só por exceção, depois de **ao menos 6 meses** de adaptação e teste em voo. As **ilusões visuais** do voo ficam no M2V5.",
          "Atrapalham a varredura as **colunas do para-brisa**, a armação dos óculos e a linha do bifocal, o **sol** de frente e o **cansaço**. Uma **perda de campo** de um olho, por glaucoma, retina ou nervo, exige avaliação neuro-oftalmológica antes de voar (Veja M2V4 - VII). Para o passageiro, nada disso impede a viagem.",
          "**Como olhar para fora.** Divida o céu em setores de **10°** e pare **1 segundo** em cada um. A cada pouco, foque um ponto **distante**, uma nuvem, a ponta da asa, o horizonte, para tirar o olho do foco curto. Mova a **cabeça** para olhar atrás das colunas do para-brisa. Na subida, na descida e perto de aeroportos, aumente o tempo olhando para fora.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, midia: 'campo-visual' },
          { paragrafo: 2, midia: 'animacao-varredura' },
          { paragrafo: 3, figura: foto(require('@/assets/images/topicos/m2v4-4-ceu.jpg'), 'Acima das nuvens, sem nada para focar, o olho relaxa e foca perto: o piloto olha e não vê.') },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · campo visual e um olho só',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Campo visual normal', 'Pode voar', 'Apto'],
                ['Perda de campo nova', 'Procure o oftalmologista', 'Inapto até avaliação neuro-oftalmológica'],
                ['Visão de um olho só (monocular)', 'Pode voar', 'ANAC: só na revalidação ou depois de acidente, com o olho bom normal; ICAO: exceção após 6 meses e teste em voo'],
                ['Pequena falha de campo em um olho, com o campo dos dois olhos normal', 'Pode voar', 'Pode ser aceito após avaliação'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v4-4-varredura.jpg'), 'A cabeça se move para olhar atrás das colunas do para-brisa.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como fazer a varredura visual',
              colunas: ['Passo', 'O que fazer'],
              linhas: [
                ['Dividir o céu', 'Setores de até 10°, de um lado ao outro'],
                ['Parar em cada setor', 'Pelo menos 1 segundo'],
                ['Painel e fora', 'Cerca de 4 a 5 s no painel para cada 16 s fora'],
                ['Contra o campo vazio', 'Focar algo distante a cada pouco: nuvem, asa, horizonte'],
                ['Colunas do para-brisa', 'Mover a cabeça para ver atrás delas'],
                ['Subida, descida e perto do aeroporto', 'Mais tempo olhando para fora'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '4.5',
      titulo: 'Visão de cores',
      pergunta: 'Quem confunde cores pode pilotar?',
      conteudo: {
        texto: [
          "A retina tem **três tipos de cone**, mais sensíveis ao **vermelho**, ao **verde** e ao **azul**; a mistura dos três dá todas as cores. Quando um deles falta ou funciona menos, surge a **discromatopsia**, chamada sem precisão de daltonismo. Cerca de **8% dos homens** e **0,8% das mulheres** falham nos testes mais rigorosos, e **mais de 99%** desses têm defeito **vermelho-verde**. O defeito de nascença passa pelo cromossomo X e **não piora** com o tempo.",
          "A aviação fala em cores: **vermelho**, **verde**, **amarelo**, **âmbar**, **azul**, **ciano**, **magenta** e **branco** aparecem nas telas, nas luzes das aeronaves e nas pistas. O risco maior é confundir sinais **vermelhos, brancos e verdes**, e piora com **pouca luz** e cores fracas. Em 2002, num pouso noturno em **Tallahassee**, o defeito de cor do copiloto do **FedEx 1448** atrapalhou a leitura das luzes vermelhas e brancas do **PAPI**, o indicador de rampa.",
          "O exame começa com as **placas pseudoisocromáticas**, como as de **Ishihara**, vistas à luz do dia; quem falha pode passar por outros testes, como o arranjo de cores **D-15**, lanternas e o **anomaloscópio**. Lentes que \"corrigem\" a cor **não valem**. A **ANAC** aceita quem lê as tabelas ou, no mínimo, reconhece as cores básicas da aviação isoladas: **amarelo, azul, verde, vermelho, branco, preto e âmbar**. Na **ICAO**, quem falha e não distingue as cores e luzes da navegação só fica com a Classe 2 **válida de dia**. Na **FAA**, desde **2025** a triagem é feita **uma vez**, no computador; quem falha recebe a 3ª classe **só para voo visual de dia**.",
          "O defeito também pode ser **adquirido**, num olho mais que no outro e às vezes piorando: doenças da **retina**, do **nervo óptico**, **glaucoma** avançado e remédios como a **hidroxicloroquina**, o **etambutol** e o **digitálico**. O **sildenafil**, para disfunção erétil, deixa tudo **azulado** em **3% a 11%** dos usuários por até 5 horas ou mais; a FAA pede **8 horas** sem voar depois dele (Veja M2V4 - VII).",
          "Para o passageiro, a visão de cores **não muda nada**. O tripulante com defeito voa dentro da restrição do certificado; voar à noite ou fora dela, sem liberação, é voar contra a norma e contra o risco que o caso do FedEx mostrou. Quem nota que as cores **mudaram** deve procurar o oftalmologista, porque o defeito adquirido costuma ter uma causa a tratar.",
          "**Como lidar com a visão de cores.** Saiba seu resultado antes de escolher a carreira e faça o teste com calma e boa luz. Nas telas, confira também a **forma** e a **posição** dos símbolos, não só a cor. Tripulante que toma sildenafil respeita as 8 horas; quem usa hidroxicloroquina ou etambutol faz o controle de olhos que o médico pedir.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v4-5-teste.jpg'), 'As placas de pontos coloridos revelam o defeito vermelho-verde.') },
          { paragrafo: 2, midia: 'papi-cores' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · visão de cores',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Passa nas placas', 'Pode voar', 'Apto'],
                ['Falha nas placas, mas reconhece as cores da aviação', 'Pode voar', 'ANAC: apto com as cores básicas; ICAO: apto se distinguir as luzes; FAA: computador ou recurso'],
                ['Não reconhece as cores e luzes da aviação', 'Pode voar', 'ICAO: só Classe 2 de dia; FAA: 3ª classe só VFR de dia'],
                ['Cores que mudaram (defeito adquirido)', 'Procure o oftalmologista', 'Avaliação da causa antes de voar'],
                ['Sildenafil nas últimas 8 horas', 'Pode voar', 'FAA: não voar antes de 8 horas'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v4-5-papi.jpg'), 'No crepúsculo, as luzes vermelhas e brancas do PAPI indicam se o avião está na rampa certa.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · visão de cores',
              colunas: ['Situação', 'O que fazer'],
              linhas: [
                ['Antes de escolher a carreira', 'Fazer o teste de cores e saber o resultado'],
                ['No exame', 'Boa luz, sem pressa, sem lente colorida'],
                ['Nas telas', 'Conferir também a forma e a posição dos símbolos'],
                ['Sildenafil', 'Tripulante: 8 horas sem voar (FAA)'],
                ['Hidroxicloroquina ou etambutol', 'Controle de olhos pedido pelo médico'],
                ['Cores que mudaram', 'Oftalmologista: o defeito adquirido tem causa'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '4.6',
      titulo: 'Lasers e luz forte',
      pergunta: 'O que um laser apontado para o avião faz com o piloto?',
      conteudo: {
        texto: [
          "Um **laser** apontado do chão chega à cabine como um clarão. O efeito mais comum é a **distração**; depois vêm o **ofuscamento**, quando a luz forte esconde o que está perto dela, a **cegueira por clarão**, que continua depois que a luz apaga, e a **pós-imagem**, uma mancha que pode durar **vários minutos**. Lasers potentes podem deixar uma **lesão** que persiste ou é definitiva. O risco é maior no avião com **um só piloto**, que pode perder o controle.",
          "O problema é grande: nos EUA, os pilotos relataram **12.840** casos em **2024** e **328 lesões** desde 2010. No Brasil, expor a perigo uma aeronave ou dificultar a navegação aérea é **crime** (Código Penal, art. 261), com **reclusão de 2 a 5 anos**. Nos EUA, é crime federal, com até 5 anos de prisão, e a multa civil da FAA chega a **US$ 11.000** por violação.",
          "Em volta dos aeroportos, a norma cria **zonas** onde um laser autorizado, como o de shows, precisa ficar fraco. Na **zona livre de laser**, até **2.000 ft** de altura e **2 NM** da pista, a luz não pode nem distrair: até **50 nW/cm²**. Na **zona crítica**, até **10.000 ft** e **10 NM**, não pode causar efeitos passageiros como o clarão e a pós-imagem: até **5 µW/cm²**. Nas **zonas sensíveis**, o limite é **100 µW/cm²**.",
          "**Se um laser atingir a cabine:** não olhe para o feixe, **proteja os olhos** com a mão ou o quebra-sol, e, se houver dois pilotos, quem não foi atingido assume os comandos. Avise o **controle** com a posição, a altitude, a cor e a direção do feixe; o controle trata o caso como **emergência em voo**. Depois do pouso, notifique: no Brasil, pela **ficha de notificação** do CENIPA; nos EUA, pelo questionário da FAA.",
          "Quem continua com **mancha**, borrão ou dor depois do clarão precisa de **avaliação oftalmológica** antes de voar de novo; para o tripulante, a lesão no olho exige exames adicionais. O passageiro atingido pela janela, raro, segue a mesma conduta. Voar com uma mancha no centro da visão é voar sem ver direito a pista e os instrumentos.",
          "A luz forte do **sol** pede **óculos de sol** certos. Para o voo, a lente deve filtrar **70% a 85%** da luz, nunca mais; ser **cinza neutro**, que não muda as cores; e barrar **99% a 100%** do UV. Lente **polarizada** não serve, porque apaga telas com filtro antirreflexo e cria reflexos no para-brisa; a **fotocromática** clareia devagar ao entrar na sombra. Lente escura é **só de dia**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v4-6-laser.jpg'), 'Um feixe de laser verde atinge o para-brisa na aproximação noturna.') },
          { paragrafo: 2, midia: 'zonas-laser' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · laser e luz forte',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Clarão que passou sem sintomas', 'Pode voar', 'Pode voar; notificar o caso'],
                ['Mancha, borrão ou dor que continuam', 'Avaliação oftalmológica', 'Não voar até a avaliação'],
                ['Lesão do olho confirmada', 'Conforme o oftalmologista', 'Exames adicionais e liberação do examinador'],
                ['Óculos de sol polarizado ou fotocromático', 'Pode usar', 'Não recomendado no voo'],
              ],
            },
          },
          { paragrafo: 6, figura: foto(require('@/assets/images/topicos/m2v4-6-oculos-sol.jpg'), 'Lente cinza neutra, sem polarização, reduz o brilho sem mudar as cores.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · laser e luz forte',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Antes do voo', 'Consultar avisos de laser na área; evitar a área se possível'],
                ['Laser na cabine', 'Não olhar o feixe e proteger os olhos'],
                ['Com dois pilotos', 'Quem não foi atingido assume os comandos'],
                ['Na hora', 'Avisar o controle: posição, altitude, cor e direção'],
                ['Depois do pouso', 'Notificar (CENIPA ou FAA); avaliação se a visão não normalizar'],
                ['Sol forte', 'Óculos cinza neutro, 70% a 85% de filtro, 99% a 100% de UV, sem polarização'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '4.7',
      titulo: 'Doenças dos olhos',
      pergunta: 'Que doença do olho impede de voar?',
      conteudo: {
        texto: [
          "Para o tripulante, os olhos e as pálpebras precisam funcionar **normalmente**, sem doença ativa nem sequela que atrapalhe a visão; a ANAC exige ainda **campo visual**, **pressão do olho**, **fundo de olho** e **córneas** normais. A ICAO lista as condições que tornam **inapto até avaliação** especializada: ceratite que volta, **ceratocone**, **uveíte** repetida, **descolamento de retina**, inflamação do **nervo óptico**, **catarata** que atrapalha a visão, **glaucoma**, nistagmo e **cegueira noturna**. Muitas têm tratamento, e o tripulante volta depois.",
          "O **glaucoma** lesa o nervo óptico, em geral com a **pressão do olho** alta, e começa tirando pedaços do **campo visual** sem dar sintomas. A ICAO manda encaminhar quem tem pressão de **24 mmHg** ou mais, ou diferença de **5 mmHg** entre os olhos. Na FAA, o examinador pode liberar quem tem pressão de até **23 mmHg** nos dois olhos, **campo visual normal** e colírios aceitos; glaucoma de pressão normal, glaucoma secundário e cirurgia filtrante vão para a decisão da FAA.",
          "**Olho vermelho com dor**, visão borrada, **luz incomodando** e lacrimejamento sugerem **uveíte** e pedem oftalmologista **com urgência**. A **catarata**, a lente do olho ficando opaca, borra a visão e causa **ofuscamento**, sobretudo à noite; o tratamento é cirúrgico (Veja M2V4 - VIII). O **descolamento de retina** corrigido pode ser liberado depois de avaliação especializada.",
          "O **olho seco** piora no ar seco da cabine; a lágrima artificial **sem conservante** ajuda, e a com conservante irrita quem usa lente de contato. A **conjuntivite** e a **lesão da córnea** pedem tratamento antes de voar. Lente de contato é um **corpo estranho**: pode arranhar a córnea e causar alergia, úlcera e infecção, e por isso precisa de acompanhamento.",
          "Os **colírios** também contam. A **pilocarpina** e outros **mióticos** contraem a pupila, escurecem a visão à noite e borram o foco: não são aceitos para o tripulante. Os colírios que **dilatam** a pupila, como os do exame de fundo de olho, pedem **8 a 24 horas** sem voar. **Prostaglandinas**, **betabloqueadores** e **inibidores da anidrase carbônica** em colírio são aceitos; o betabloqueador pode baixar o pulso e piorar a asma.",
          "**Como cuidar dos olhos doentes antes de voar.** Faça o controle do glaucoma em dia, com **campo visual** e pressão. Leve os colírios na **bagagem de mão** e pingue no horário de casa, ajustando com o fuso (Veja M2V8). Não pingue colírio anti-histamínico logo antes nem durante o voo. Com olho vermelho, dor ou visão que caiu, o tripulante **não voa** e o passageiro procura avaliação antes de embarcar. Voar assim arrisca piorar o olho longe de ajuda e, para o tripulante, descumprir o certificado.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v4-7-lampada.jpg'), 'Na lâmpada de fenda, o oftalmologista examina a córnea, a lente e o fundo do olho.') },
          {
            paragrafo: 2,
            tabela: {
              titulo: 'Liberação para voo · doenças dos olhos',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Glaucoma controlado com colírio aceito', 'Pode voar; colírio na bagagem de mão', 'Apto com pressão controlada e campo normal (FAA: até 23 mmHg)'],
                ['Pressão do olho alta sem diagnóstico', 'Pode voar', 'ICAO: ≥ 24 mmHg ou diferença ≥ 5 mmHg, encaminhar'],
                ['Olho vermelho, dor e luz incomodando', 'Avaliação antes de voar', 'Não voar; oftalmologista com urgência'],
                ['Catarata que atrapalha a visão', 'Pode voar', 'Inapto até tratamento e avaliação'],
                ['Descolamento de retina', 'Conforme o cirurgião (Veja M2V4 - VIII)', 'Inapto até avaliação; pode voltar depois de corrigido'],
                ['Ceratocone ou ceratite que volta', 'Pode voar', 'Inapto até avaliação especializada'],
              ],
            },
          },
          { paragrafo: 3, figura: foto(require('@/assets/images/topicos/m2v4-7-tonometria.jpg'), 'A medida da pressão do olho faz parte do exame do tripulante.') },
          { paragrafo: 5, midia: 'colirios-voo' },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Remédios e voo · olhos',
              colunas: ['Remédio ou classe', 'Efeito que importa no voo', 'Tripulante (FAA/ANAC)'],
              linhas: [
                ['Pilocarpina e outros mióticos', 'Pupila pequena, visão escura à noite e foco borrado', 'FAA: não aceito; ANAC: a critério do examinador'],
                ['Atropina', 'Pupila dilatada e foco paralisado', 'FAA: não aceito'],
                ['Ciclopentolato', 'Dilata a pupila e paralisa o foco', 'FAA: 24 h sem voar'],
                ['Fenilefrina e tropicamida', 'Dilatam a pupila; luz incomoda', 'FAA: 8 h sem voar'],
                ['Prostaglandinas (latanoprosta)', 'Poucos efeitos', 'Aceitas (FAA e ICAO)'],
                ['Betabloqueador em colírio (timolol)', 'Pode baixar o pulso e piorar a asma', 'Aceito sem efeito no corpo'],
                ['Inibidor da anidrase carbônica', 'Colírio com pouco efeito; oral com mais efeitos', 'Colírio aceito; oral não aceito (FAA)'],
                ['Colírio anti-histamínico', 'Borra a visão logo depois de pingar', 'Não pingar logo antes nem durante o voo'],
                ['Sildenafil', 'Visão azulada e luz incomodando', 'FAA: 8 h sem voar; tadalafil sob demanda, 24 h'],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · doenças dos olhos',
              colunas: ['Situação', 'O que fazer'],
              linhas: [
                ['Glaucoma', 'Pressão e campo visual em dia; colírio no horário, com o fuso'],
                ['Olho seco', 'Lágrima artificial sem conservante; piscar mais'],
                ['Lente de contato', 'Acompanhamento regular; tirar se arder'],
                ['Exame com colírio de dilatar', 'Marcar longe da escala: 8 a 24 h sem voar'],
                ['Olho vermelho com dor', 'Não voar; oftalmologista com urgência'],
                ['Bagagem de mão', 'Colírios, receita e óculos de reserva'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '4.8',
      titulo: 'Cirurgia dos olhos',
      pergunta: 'Quanto esperar para voar depois de operar os olhos?',
      conteudo: {
        texto: [
          "A **cirurgia refrativa** tira o grau esculpindo a córnea com laser. No **PRK**, o laser age na superfície; no **LASIK**, o cirurgião levanta uma **aba** fina, aplica o laser e a recoloca; a FAA trata o **SMILE** do mesmo jeito. A ICAO lembra que raramente há motivo para operar **só para passar no exame**. Os riscos que importam no voo são **ofuscamento**, **halos**, perda de **contraste**, visão que varia ao longo do dia e **volta do grau**; a aba do LASIK pode **deslocar** meses depois, às vezes ao **coçar o olho**.",
          "O **passageiro** pode voar **24 horas** depois do laser na córnea, se o cirurgião liberar. O **tripulante** espera mais. A **ANAC** exige mais de **6 meses** de operado e, se pedido, testes de **ofuscamento** e de **sensibilidade ao contraste** normais. A **ICAO** sugere contar da suspensão do colírio: **3 meses** com grau de até 6 dioptrias; entre 6 e 10, **3 meses** no LASIK e **6** no PRK; acima de 10, **6 meses**. Na **FAA**, depois de **3 meses**, recuperado, sem remédio e sem sintomas, o caso em geral não preocupa; antes disso, só com o relatório do oftalmologista confirmando a recuperação.",
          "Na **catarata**, troca-se a lente opaca por uma **lente intraocular**. Muita gente enxerga bem já no dia seguinte, e o grau se estabiliza em **6 a 8 semanas**. O passageiro pode voar **24 horas** depois. Para o tripulante, a ICAO considera adequada só a lente **monofocal**; a FAA aceita também as lentes para presbiopia, se não houver ofuscamento nem halos, e aplica a mesma regra dos 3 meses. A autoridade britânica afasta por **ao menos 6 semanas**. Meses ou anos depois, a cápsula pode embaçar; o **laser YAG** resolve em minutos.",
          "A cirurgia de **retina** às vezes termina com uma **bolha de gás** dentro do olho. Com a pressão menor da cabine, o gás **se expande**, a pressão do olho sobe e a pessoa pode **perder a visão** de forma grave. Por isso **não se voa** até o gás ser absorvido: cerca de **2 semanas** com **SF6** e **6 semanas** com **C3F8** ou **C2F6**. Outra cirurgia dentro do olho ou um **ferimento que perfurou** o olho pedem ao menos **7 dias**. Para o tripulante, o descolamento de retina torna inapto até a avaliação; a autoridade britânica pede o relatório do cirurgião numa revisão de **3 meses**.",
          "Voar antes do prazo arrisca **dor**, aumento da pressão e **perda da visão**, longe de um oftalmologista. Para o tripulante, toda cirurgia do olho leva a exames adicionais: esconder um LASIK, que não deixa cicatriz visível, não esconde a perda de contraste à noite e coloca em risco o certificado. A ICAO avisa que a cirurgia pode **atrasar a volta** ao voo ou, se complicar, tirar o certificado **de vez**.",
          "**Como se preparar para a cirurgia dos olhos.** Antes, conte ao cirurgião que você **voa** e pergunte qual **gás** será usado, se houver. Planeje a cirurgia longe da escala e a volta para casa por terra se houver gás no olho. Depois, **não coce** o olho, pingue o colírio no horário e leve a receita na bagagem de mão. O tripulante só volta com os prazos da sua autoridade e, na ICAO, revisão **6 meses** depois e **a cada ano**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v4-8-laser.jpg'), 'Na cirurgia refrativa, o laser esculpe a córnea para tirar o grau.') },
          { paragrafo: 2, midia: 'prazo-cirurgia-olho' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · cirurgia dos olhos',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['LASIK, PRK ou SMILE', '24 horas', 'ANAC: mais de 6 meses; ICAO: 3 a 6 meses; FAA: 3 meses ou relatório antes'],
                ['Catarata com lente intraocular', '24 horas', 'ICAO: lente monofocal, grau estável; FAA: 3 meses ou relatório antes; CAA: 6 semanas'],
                ['Laser YAG na cápsula', 'Conforme o cirurgião', 'Volta rápida com relatório do cirurgião'],
                ['Retina com gás SF6', 'Pelo menos 2 semanas', 'Inapto até avaliação'],
                ['Retina com gás C3F8 ou C2F6', 'Pelo menos 6 semanas', 'Inapto até avaliação'],
                ['Outra cirurgia dentro do olho ou ferimento perfurante', 'Pelo menos 7 dias', 'Inapto até avaliação'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v4-8-protetor.jpg'), 'Depois da cirurgia, o protetor evita coçar e bater no olho operado.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · cirurgia dos olhos',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Antes', 'Contar ao cirurgião que voa; perguntar se haverá gás no olho'],
                ['Planejamento', 'Cirurgia longe da escala; volta por terra se houver gás'],
                ['Depois', 'Não coçar o olho; colírio no horário; receita na bagagem de mão'],
                ['Gás no olho', 'Não voar até o cirurgião liberar'],
                ['Tripulante', 'Voltar só no prazo da autoridade e com os testes pedidos'],
                ['Revisão', 'ICAO: 6 meses depois da volta e uma vez por ano'],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Retina e visão noturna', 'Adaptação ao escuro piora com hipóxia e luz forte: os bastonetes gastam muito oxigênio, e a luz forte desfaz o pigmento que eles levam minutos para refazer', 'Oxigênio à noite, pouca luz na cabine, olhar de lado'],
                ['Córnea e superfície do olho', 'Olho seco, irritação, lesão por lente de contato: o ar seco evapora a lágrima, e a lente ressecada cobre uma córnea que recebe menos oxigênio', 'Lágrima sem conservante, lente bem adaptada'],
                ['Foco e acuidade', 'Miopia de campo vazio, presbiopia, borrão com vibração: sem nada para focar o olho relaxa para perto, o cristalino endurece com a idade, e a vibração tira a imagem do lugar na retina', 'Varredura, óculos certos e reserva'],
                ['Visão de cores', 'Confusão entre vermelho, branco e verde: falta ou funciona mal um dos tipos de cone que separam as cores', 'Teste antes da carreira; restrição quando preciso'],
                ['Campo visual e nervo óptico', 'Glaucoma e doenças tiram partes do campo: a pressão alta ou a doença lesam as fibras do nervo óptico, que não se recuperam', 'Pressão e campo visual em dia'],
                ['Olho operado', 'Gás que expande, halos e ofuscamento: o gás injetado cresce na subida, e a córnea operada espalha a luz', 'Respeitar os prazos antes de voar'],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      pergunta: 'Onde fica o ponto cego noturno?',
      opcoes: ['Na periferia do campo', 'Nos 5° a 10° centrais, onde não há bastonetes', 'Só no olho esquerdo', 'Não existe à noite'],
      correta: 1,
      explicacao: 'O centro do olho só tem cones; à noite, quem enxerga são os bastonetes, e por isso é melhor olhar um pouco de lado.',
      topico: '4.3',
    },
    {
      pergunta: 'Quanto tempo leva a adaptação máxima ao escuro?',
      opcoes: ['10 segundos', '2 minutos', 'Até 30 minutos', '6 horas'],
      correta: 2,
      explicacao: 'Os cones se ajustam em minutos e os bastonetes continuam ganhando sensibilidade até cerca de 30 minutos.',
      topico: '4.3',
    },
    {
      pergunta: 'Qual é a acuidade mínima da ANAC na 1ª classe?',
      opcoes: ['20/20 em cada olho', '20/30 em cada olho e 20/20 com os dois', '20/200 sem óculos', '20/40 com os dois'],
      correta: 1,
      explicacao: 'A ANAC pede 20/30 em cada olho e 20/20 binocular na 1ª classe, com ou sem correção.',
      topico: '4.2',
    },
    {
      pergunta: 'Por que a monovisão com lente de contato não é aceita para o piloto?',
      opcoes: ['Porque a lente cai com a pressão', 'Porque o olho corrigido para perto enxerga mal de longe', 'Porque é proibida para todos', 'Porque escurece as cores'],
      correta: 1,
      explicacao: 'Na monovisão, um olho fica para perto e enxerga mal a distância; ANAC, ICAO e FAA não aceitam.',
      topico: '4.2',
    },
    {
      pergunta: 'Na varredura visual, como deve ser cada movimento do olhar?',
      opcoes: ['Contínuo, sem parar', 'Até 10°, parando pelo menos 1 segundo', '90° de cada vez', 'Só olhar para frente'],
      correta: 1,
      explicacao: 'Movimentos de até 10°, com ao menos 1 segundo em cada setor, dão tempo para o olho perceber um ponto.',
      topico: '4.4',
    },
    {
      pergunta: 'Qual defeito de cor é o mais comum?',
      opcoes: ['Azul-amarelo', 'Vermelho-verde', 'Ver tudo em preto e branco', 'Ver tudo azulado'],
      correta: 1,
      explicacao: 'Mais de 99% dos que falham nos testes têm defeito vermelho-verde, de nascença e ligado ao cromossomo X.',
      topico: '4.5',
    },
    {
      pergunta: 'O que fazer quando um laser atinge a cabine?',
      opcoes: ['Olhar para achar a origem', 'Não olhar o feixe, proteger os olhos e avisar o controle', 'Acender o farol na direção do feixe', 'Ignorar'],
      correta: 1,
      explicacao: 'Não olhe o feixe, proteja os olhos, passe os comandos se houver outro piloto e avise o controle com posição, altitude, cor e direção.',
      topico: '4.6',
    },
    {
      pergunta: 'Que óculos de sol são indicados para pilotar?',
      opcoes: ['Polarizados e bem escuros', 'Cinza neutro, filtrando 70% a 85% da luz, sem polarização', 'Fotocromáticos', 'Qualquer cor, inclusive à noite'],
      correta: 1,
      explicacao: 'Cinza neutro não muda as cores; a polarização apaga telas e a fotocromática clareia devagar.',
      topico: '4.6',
    },
    {
      pergunta: 'Qual colírio de glaucoma não é aceito para o tripulante?',
      opcoes: ['Latanoprosta', 'Timolol sem efeitos', 'Pilocarpina', 'Dorzolamida em colírio'],
      correta: 2,
      explicacao: 'A pilocarpina contrai a pupila e borra o foco; a FAA não aceita, e a ICAO em geral não permite mióticos.',
      topico: '4.7',
    },
    {
      pergunta: 'Depois de uma cirurgia de retina com gás C3F8, quanto esperar para voar?',
      opcoes: ['24 horas', '1 semana', 'Cerca de 6 semanas', 'Não há prazo'],
      correta: 2,
      explicacao: 'O gás se expande na cabine e pode causar perda grave da visão; espera-se cerca de 2 semanas com SF6 e 6 semanas com C3F8.',
      topico: '4.8',
    },
  ],
  liberacao: liberacaoOlhos,
};
