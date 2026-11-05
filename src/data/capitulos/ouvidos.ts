// Missão 2 (Sistemas) · Voo 3 — Ouvidos, seios da face e dentes (o número do voo é definido em secoes.ts).
// Escrito no modelo de Sistemas (docs/modelo-sistemas.md), já com o detalhamento prático do padrão do jet lag, em
// 03/11/2026, a pedido do autor ("Siga para o próximo voo, seguindo os padrões do app"). Os tópicos da lista antiga
// (barotrauma, audição, seios da face, barodontalgia, implantes dentários) foram reunidos em 6 tópicos.
//
// REGISTRO DE REVISÃO (03/11/2026) — fontes:
// - ICAO, Doc 8984, 3ª ed. (PDF enviado pelo autor), Part III, Cap. 12, Otorhinolaryngology: Anexo 1 6.3.2.24–6.3.2.27
//   (ouvido sem doença que afete a segurança; sem distúrbio vestibular; sem disfunção significativa da tuba auditiva;
//   sem perfuração não cicatrizada; perfuração única e seca não torna inapto; sem obstrução nasal; gagueira grave
//   inapta); 12.2 (ouvido externo: afastamento temporário); 12.3.5 (áreas atróficas do tímpano tratadas como
//   perfuração; perfuração súbita na descida pode causar vertigem alternobárica e incapacitação aguda; colesteatoma);
//   12.4.2 (aerotite média: plenitude, surdez, dor, zumbido e às vezes vertigem; a doença do ouvido mais comum entre
//   aeronavegantes; classificação de Teed, graus 0 a 5; sinais e sintomas incompatíveis com o voo ativo); 12.4.3–12.4.4
//   (tuba auditiva como válvula de uma via: abre sozinha na subida, fecha na descida; engolir, bocejar, Valsalva); 12.4.5
//   (dor, surdez e zumbido na descida; vertigem grave por barotrauma do ouvido interno, ruptura da janela redonda ou oval;
//   tímpano pode romper com 200–500 mmHg de diferença; ocorre até na cabine pressurizada; Tabela III-12-1: 760 mmHg no
//   nível do mar, 706 a 2.000 ft, 656 a 4.000 ft, 609 a 6.000 ft, 564 a 8.000 ft, 522 a 10.000 ft, 460 a 13.000 ft);
//   12.4.6 (85% ou mais secundários a doença das vias aéreas superiores; resfriado; otite média serosa); 12.4.7
//   (líquido por semanas ou meses pode deixar perda auditiva permanente); 12.5.1–12.5.7 (miringotomia e mastoidectomia
//   simples sem restrição; mastoidectomia radical avaliada com cuidado; estapedectomia: 1 a 3 meses sem voar, avaliação
//   especializada, depois voo com restrição a copiloto ou piloto de segurança por 2 anos; alerta sobre resfriados;
//   timpanoplastia sem restrição se audição normal e tímpano íntegro); 12.6.1 e Anexo 1 6.2.5 (audiometria tonal na
//   Classe 1 no primeiro exame, a cada 5 anos até os 40 e a cada 2 depois; Classe 3 a cada 4 anos até os 40; Classe 2
//   recomendada após os 50; voz em sala silenciosa < 35 dB(A)); 6.3.4.1 (até 35 dB em 500, 1.000 e 2.000 Hz e 50 dB
//   em 3.000 Hz, cada ouvido; quem passa pode ser apto em teste com ruído de cabine ou em voo); 6.4.4.1 (Classe 2: voz
//   de conversa a 2 m, de costas); 12.6.9 (perfuração simples reduz cerca de 10–15 dB); 12.7.1–12.7.2 (perda temporária
//   acima de 80 dB; mudança temporária de limiar de 50 dB recupera em cerca de 16 h; 60 dB, em dias, mais lenta em
//   4.000 Hz); 12.7.8–12.7.13 (protetor de inserção: verificar o canal de ventilação antes do voo; cera; abafador com
//   atenuação média de 35 dB; os dois juntos, no máximo cerca de 55 dB; redução ativa só até 1.200 Hz; inserção apertada
//   pode contribuir para barotrauma; protetores "redutores de pressão" ineficazes); 12.9.17 (discriminação abaixo de 80%
//   não aceita); 12.11.1 (perda súbita da audição em voo: risco desprezível); 12.11.3 (presbiacusia, a partir dos 30
//   anos); 12.12.6–12.12.7 (aparelho auditivo em geral não aceito em voo para profissionais; para os demais, só após
//   avaliação); 12.13.1 (nariz: olfato e ventilação dos seios e da tuba); 12.14.1–12.14.2 (resfriado: reavaliar em 7 a
//   10 dias; causa direta de aerotite, barotrauma do ouvido interno e aerossinusite; não voar resfriado ou com nariz
//   entupido); 12.14.3–12.14.5 (alergias; asma e sinusite); 12.14.6–12.14.9 (aerossinusite na descida; esfenoide dá dor
//   na nuca; concha bolhosa; vasoconstritor nasal suave alivia em minutos; antibiótico e anti-histamínico: não voar
//   durante o tratamento); 12.17.2 (vertigem por pressão, alternobárica ou fístula perilinfática; voar resfriado pode
//   causar incapacitação aguda e vertigem e perda auditiva irreversíveis); 12.17.3 (Ménière, neurite vestibular,
//   vertigem posicional). Part II, Cap. 1, 1.2.9 (barotrauma em altitudes baixas: descer de 2.000 m (6.500 ft) ao nível
//   do mar dá 150 mmHg de diferença) e 1.4.8 (barotite, barossinusite e barodontalgia).
// - ANAC, RBAC 67, Emenda 05 (PDF enviado pelo autor): 67.97(a)–(g) (ouvido; tímpano: perfuração simples e seca não
//   inapta se cumprir 67.101; obstrução permanente da tuba; transtorno vestibular permanente inapto e passageiro inapto
//   até se restabelecer; nariz livre; sem patologia grave dos seios; radiografia dos seios no exame inicial); 67.101(a)–(e)
//   (audiometria: até 35 dB em 500, 1.000 e 2.000 Hz e 50 dB em 3.000 Hz por ouvido; a cada 5 anos abaixo dos 40 e a
//   cada 2 a partir dos 40; alternativa de discriminação em ruído e voz de 85–95 dB a 2 m; revalidação com um ouvido;
//   restrição de rádio e de comissário quando nenhum ouvido atende); 67.103(a)–(d) (requisitos odontológicos: sem cárie
//   profunda, doença periodontal ou periapical, curativo dentário nem tratamento endodôntico em curso; odontograma a cada
//   5 anos; panorâmica no exame inicial). Classes 2, 4 e 5: registro em src/lib/cma.ts.
// - FAA, 14 CFR 67.105 (registro em src/lib/cma-internacional.ts): voz de conversa a 6 pés (1,8 m), de costas, com os
//   dois ouvidos; ou discriminação da fala ≥ 70%; ou audiometria: melhor ouvido 35/30/30/40 dB e pior ouvido 35/50/50/60
//   dB em 500/1.000/2.000/3.000 Hz. Guia do AME, Item 30 (atualizado em 23/06/2015): perfuração resolvida sem sintomas,
//   emitir; com patologia associada, decisão da FAA; cirurgia do ouvido decidida pela FAA com o relatório do cirurgião;
//   vertigem episódica exige avaliação, e processos transitórios (labirintite aguda, vertigem posicional benigna) podem
//   não desqualificar depois da recuperação completa.
// - FAA, AIM 8-1-2, b e c (faraim.org): bloqueio do ouvido por resfriado, dor de garganta ou alergia nasal; na descida,
//   abrir a tuba engolindo, bocejando, contraindo a garganta ou com a manobra de Valsalva; spray ou gotas
//   descongestionantes em geral não dão proteção adequada; descongestionante oral tem efeitos que podem prejudicar muito
//   o desempenho do piloto; prevenção: não voar com infecção das vias aéreas ou alergia nasal; bloqueio dos seios na
//   descida com dor intensa; seio maxilar bloqueado pode doer nos dentes de cima.
// - CDC, Yellow Book, Air Travel (23/04/2025, publicado em 21/07/2026): barotrauma mais comum no ouvido médio, com a tuba
//   bloqueada; em geral não grave, raramente tontura, perda auditiva, perfuração e zumbido permanente; quem tem infecção
//   de ouvido, nariz ou seios ou congestão forte pode adiar o voo; descongestionante oral ou nasal pode aliviar;
//   alérgico mantém o remédio de sempre. Travel and Breastfeeding (23/04/2025): amamentar protege a criança da dor por
//   colapso da tuba, sobretudo na subida e na descida.
// - Felkai PP, Nakdimon I, Felkai T, Levin L, Zadik Y. Dental tourism and the risk of barotrauma and barodontalgia. Br
//   Dent J 2023;234(2):115-7 (doi 10.1038/s41415-023-5449-x): barodontalgia em dente com doença prévia ou polpa
//   necrótica; perto de um terço após restauração recente; dor referida da barossinusite; 7% das tripulações de voos de
//   transporte militar; espera sem dor, inchaço nem sangramento: restauração 24 h (1 semana recomendada), extração
//   simples 24–48 h, implante sem complicação 72 h, extração cirúrgica 72 h, tratamento de canal 72 h, levantamento do
//   seio ou enxerto ósseo ao menos 2 semanas; selar bem o curativo provisório; analgésico se o voo for inevitável.
// - Topbaş C et al. PeerJ 2024;12:e17290: classificação de Ferjentsik e Aker (1982): classe I pulpite irreversível,
//   dor aguda e breve na subida; II pulpite reversível, dor surda latejante na subida; III polpa necrótica, dor surda
//   latejante na descida; IV lesão periapical, dor forte e persistente na subida e na descida; exame dentário a cada 6
//   meses para tripulantes; tratamento concluído antes de se expor à variação de pressão.
// Sem fonte: [confirmar na referência]. Prazos não estimados.

import { liberacaoOuvidos } from '../liberacao/ouvidos';
import type { Capitulo } from '../tipos';

const foto = (arquivo: number, legenda: string) => ({ imagem: arquivo, legenda });

export const ouvidos: Capitulo = {
  numero: 3,
  titulo: 'Ouvidos, seios da face e dentes',
  tempoLeituraMin: 40,
  topicos: [
    {
      id: '3.1',
      titulo: 'Ouvidos, seios e dentes em altitude',
      pergunta: 'Por que o ouvido dói na descida e não na subida?',
      conteudo: {
        texto: [
          "O ouvido médio, os **seios da face** e até um dente com problema guardam **ar preso** em cavidades fechadas. Quando a pressão de fora muda, esse ar se expande ou se contrai (Veja M1V1 - II). A cabine pressurizada fica entre **5.000 e 8.000 ft**: a **564 mmHg**, a 8.000 ft, a pressão já é cerca de um quarto menor que os **760 mmHg** do nível do mar.",
          "O ouvido médio se comunica com o nariz pela **tuba auditiva**, a trompa de Eustáquio, que funciona como uma **válvula de uma via**. Na **subida**, o ar de dentro se expande, força a válvula e sai sozinho, com um estalo. Na **descida**, a pressão de fora aumenta, a ponta da tuba no nariz fica fechada e o ar só entra quando a pessoa **engole**, **boceja**, **mastiga** ou faz a **manobra de Valsalva**. Por isso a dor vem quase sempre **na descida**.",
          "As diferenças grandes aparecem mesmo em altitudes baixas: descer de **6.500 ft** ao nível do mar já significa cerca de **150 mmHg** de diferença sobre o tímpano. Com **200 a 500 mmHg**, o tímpano pode **romper**. Os seios da face têm aberturas pequenas para o nariz e sofrem do mesmo jeito; um dente com cárie, restauração recente ou inflamação pode doer com a variação de pressão.",
          "Em **85% ou mais** dos casos, a falha em equalizar vem de uma doença do nariz e da garganta: o **resfriado**, a **alergia** e a **sinusite** incham a mucosa e fecham as aberturas. Por isso a regra mais importante deste voo é simples: **não voar resfriado ou com o nariz entupido**, sobretudo como tripulante.",
          "O ouvido também **ouve e equilibra**. A tripulação precisa entender o rádio e os colegas no ruído da cabine, e o labirinto informa a posição da cabeça; uma vertigem súbita na descida pode **incapacitar** o piloto (Veja M2V3 - III). Para o passageiro, a dor costuma passar sem sequela, mas pode trazer **tontura**, **perda auditiva**, **perfuração** e **zumbido**.",
          "**Como equalizar.** Na subida, em geral não é preciso fazer nada. Na descida, comece **cedo** e repita: engula, boceje, mastigue ou contraia a garganta; se não bastar, feche a boca, aperte o nariz e sopre com delicadeza contra as narinas fechadas, a **manobra de Valsalva**. Não durma durante a descida. Bebês sofrem mais: **amamentar** na subida e na descida protege a criança da dor. Se a orelha travar, continue tentando antes de a pressão de fora subir mais.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v3-1-descida.jpg'), 'Na descida, a pressão da cabine sobe e o ar precisa voltar a entrar no ouvido médio.') },
          { paragrafo: 2, midia: 'animacao-ouvido' },
          { paragrafo: 3, midia: 'pressao-descida' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'O que muda em altitude',
              colunas: ['Fator do voo', 'O que acontece', 'Quem é mais vulnerável'],
              linhas: [
                ['Subida', 'O ar do ouvido e dos seios se expande e sai sozinho', 'Quem tem a abertura dos seios bloqueada: o ar que expande não tem por onde sair, a pressão dentro do seio sobe e a parede dói'],
                ['Descida', 'A pressão de fora sobe e o ar só entra no ouvido com manobras', 'Resfriados, alérgicos e quem dorme na descida: a tuba auditiva só abre ao engolir ou bocejar; a mucosa inchada a mantém fechada, quem dorme não engole, e o vácuo no ouvido médio puxa o tímpano para dentro'],
                ['Resfriado e alergia', 'A mucosa incha e fecha a tuba e os seios', 'Mais de 85% dos casos de barotrauma: a inflamação incha a mucosa que forra a tuba e a saída dos seios, e o canal fica estreito demais para o ar passar'],
                ['Dente com problema', 'Dor com a variação de pressão', 'Cárie, restauração recente, canal ou lesão na raiz: gás preso no dente ou a polpa inflamada sentem a variação de pressão, e a pressão sobre o nervo dá dor'],
                ['Ruído da cabine', 'Mascara a fala e o rádio; pode lesar a audição', 'Quem já tem perda auditiva: tem menos células ciliadas funcionando; o ruído encobre mais a fala, e cada nova lesão tira de uma reserva já menor (Veja M1V6)'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v3-1-bebe.jpg'), 'Amamentar na subida e na descida ajuda o bebê a equalizar a pressão do ouvido.') },
          { paragrafo: 6, video: { fonte: require('@/assets/videos/m2v3-equalizar.mp4'), legenda: 'Na descida, engolir, bocejar ou a manobra de Valsalva abrem a tuba auditiva e igualam a pressão do ouvido.' } },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como equalizar o ouvido',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Subida', 'Em geral nada: o ar sai sozinho'],
                ['Início da descida', 'Começar cedo: engolir, bocejar, mastigar, contrair a garganta'],
                ['Se não abrir', 'Manobra de Valsalva: boca fechada, nariz apertado, sopro delicado'],
                ['Durante a descida', 'Ficar acordado e repetir as manobras'],
                ['Bebês', 'Amamentar na subida e na descida'],
                ['Resfriado ou nariz entupido', 'Tripulante não voa; passageiro pode adiar a viagem'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.2',
      titulo: 'Barotrauma do ouvido',
      pergunta: 'O que fazer quando o ouvido trava no voo?',
      conteudo: {
        texto: [
          "O **barotrauma do ouvido médio**, ou aerotite média, é a lesão causada pela diferença entre a pressão do ar e a do ouvido médio. É a **doença de ouvido mais comum** entre os aeronavegantes. Traz **sensação de ouvido cheio**, **surdez**, **dor**, **zumbido** e às vezes **vertigem**. O médico gradua o tímpano pela escala de **Teed**, do grau **0**, só com sintomas, ao grau **5**, com **perfuração**.",
          "Quando a pessoa não consegue equalizar na descida, a surdez, o zumbido e a dor chegam rápido. Se a tuba fica fechada, o ar do ouvido médio é absorvido e entra **líquido**: é a **otite média serosa**, com o tímpano cor de âmbar e às vezes uma linha de nível. Nos casos raros e graves, a pressão rompe a **janela redonda ou oval** do ouvido interno, com **vertigem forte** e perda auditiva: é o **barotrauma do ouvido interno**. Uma perfuração súbita do tímpano na descida também pode dar **vertigem alternobárica** e incapacitar o piloto.",
          "Para o **passageiro**, o barotrauma em geral não é grave. Quem tem **infecção de ouvido, nariz ou seios** ou **congestão forte** pode **adiar o voo** para evitar a dor e a lesão. Para o **tripulante**, os sinais e sintomas do barotrauma **não são compatíveis com o voo**: ele só volta depois de o processo agudo passar por completo e o exame do tímpano estar normal. O resfriado deve ser reavaliado em **7 a 10 dias**.",
          "Voar resfriado é o caminho mais comum para o barotrauma. O piloto que desconsidera o resfriado arrisca uma **incapacitação aguda** pela dor no ouvido ou nos seios e, em alguns casos, **vertigem e perda auditiva irreversíveis**, que podem afastá-lo do voo para sempre. O líquido que fica semanas no ouvido também pode deixar **perda auditiva permanente**.",
          "**Remédios.** O passageiro pode usar **descongestionante oral ou nasal** para aliviar os sintomas e mantém o **remédio de alergia** de sempre. Para o piloto, a FAA lembra que o **spray** ou as **gotas** em geral **não protegem o bastante** e que o **descongestionante oral** pode prejudicar muito o desempenho. **Antibiótico** e **anti-histamínico** em uso: a ICAO orienta **não voar durante o tratamento**.",
          "**Como prevenir e amenizar.** Antes do voo, confira o nariz: entupido ou com resfriado, o tripulante **não voa** e o passageiro pensa em adiar. Comece a equalizar **cedo** na descida e não durma nela. Se a orelha travar e doer, avise a tripulação e continue as manobras. Depois do voo, dor que não passa, **saída de líquido**, **perda auditiva** ou **vertigem** pedem avaliação médica. Quem usa **protetor de inserção** confere o canal de ventilação: inserção apertada favorece o barotrauma.",
          "**Não voe hoje** com resfriado, nariz entupido, dor de ouvido, ouvido cheio que não destrava ou vertigem. O médico olha o **tímpano** e o gradua pela escala de Teed, testa a **manobra de Valsalva**, pede **audiometria** se houver perda e examina o equilíbrio se houver vertigem.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v3-2-dor.jpg'), 'Dor e ouvido cheio na descida: o ar não consegue voltar ao ouvido médio.') },
          { paragrafo: 2, midia: 'escala-teed' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · barotrauma do ouvido',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Resfriado ou nariz entupido', 'Pode adiar; descongestionante pode aliviar', 'Não voar'],
                ['Ouvido cheio que destrava com manobras', 'Pode voar', 'Pode voar se o exame for normal'],
                ['Barotrauma com dor, surdez ou zumbido', 'Adiar até melhorar', 'Não voar até o processo agudo passar e o tímpano estar normal'],
                ['Perfuração do tímpano', 'Avaliar com o médico', 'Não voar até cicatrizar; perfuração única e seca pode ser aceita'],
                ['Vertigem depois do voo', 'Avaliação médica', 'Não voar; avaliação otorrinolaringológica'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v3-2-otoscopia.jpg'), 'O exame do tímpano mostra o grau do barotrauma, do vermelho à perfuração.') },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Remédios e voo · ouvido e nariz',
              colunas: ['Remédio', 'Efeito que importa', 'Tripulante'],
              linhas: [
                ['Descongestionante nasal (spray ou gotas)', 'Desincha o nariz por algum tempo', 'FAA: em geral não protege o bastante'],
                ['Descongestionante oral', 'Desincha o nariz', 'FAA: pode prejudicar muito o desempenho'],
                ['Anti-histamínico', 'Alivia a alergia; alguns dão sono', 'ICAO: não voar durante o tratamento'],
                ['Antibiótico', 'Trata a infecção', 'ICAO: não voar durante o tratamento'],
                ['Remédio de alergia de uso contínuo', 'Mantém o nariz livre', 'Passageiro mantém; tripulante confere com o examinador'],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · barotrauma do ouvido',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Antes do voo', 'Nariz entupido ou resfriado: tripulante não voa; passageiro pensa em adiar'],
                ['Descida', 'Equalizar cedo e repetir; não dormir'],
                ['Ouvido travado e doendo', 'Avisar a tripulação e continuar as manobras'],
                ['Protetor de inserção', 'Conferir o canal de ventilação; evitar inserção apertada'],
                ['Depois do voo', 'Dor que não passa, líquido, perda auditiva ou vertigem: avaliação médica'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.3',
      titulo: 'Tímpano, cirurgias do ouvido e vertigem',
      pergunta: 'Quem já operou o ouvido ou tem tontura pode voar?',
      conteudo: {
        texto: [
          "O **tímpano** pode se romper por infecção, trauma ou barotrauma. Em geral ele cicatriza, mas a área cicatrizada fica **mais fina**; as **áreas atróficas** podem romper com uma diferença de pressão pequena e por isso são tratadas como perfuração. Uma perfuração simples reduz a audição em cerca de **10 a 15 dB**. O **colesteatoma**, uma massa de pele no ouvido médio, pode causar vertigem e perda auditiva súbitas.",
          "As **cirurgias do ouvido** mudam a resposta à pressão. Na **estapedectomia**, para a otosclerose, o estribo é trocado por uma **prótese**; uma descompressão súbita pode deslocá-la e causar **vertigem incapacitante**. A **timpanoplastia** reconstrói o tímpano e o ouvido médio. A **miringotomia** e a **mastoidectomia simples** costumam não deixar limitação; a **mastoidectomia radical** deixa perda auditiva grande de um lado e risco de infecção e vertigem.",
          "A **vertigem** verdadeira é a sensação de girar. No voo, a **vertigem alternobárica** aparece na descida, quando um ouvido equaliza antes do outro; a **fístula perilinfática** é a lesão do ouvido interno pela pressão. Fora do voo, pesam a **doença de Ménière**, a **neurite vestibular**, a **labirintite** e a **vertigem posicional**. Na cabine, qualquer uma delas soma-se à desorientação espacial (Veja M2V5).",
          "Para o **tripulante**: a ICAO e a ANAC exigem que não haja **distúrbio vestibular**, **disfunção significativa da tuba** nem **perfuração não cicatrizada**; a **perfuração única e seca** não torna inapto, desde que a audição cumpra o requisito. Na ANAC, o transtorno vestibular **permanente** torna não apto, e o **transitório**, até a condição se restabelecer. Depois da **estapedectomia**, a ICAO pede **1 a 3 meses sem voar**, avaliação especializada e, depois, voo com restrição a **tripulação múltipla por 2 anos**. A **timpanoplastia** com tímpano íntegro e audição normal não deixa restrição. Na FAA, a perfuração **resolvida** sem sintomas permite emitir o certificado, e a cirurgia do ouvido é decidida pela própria FAA com o relatório do cirurgião; a vertigem **transitória**, como a labirintite aguda ou a vertigem posicional benigna, pode não desqualificar depois da recuperação completa.",
          "Voar com uma vertigem ativa ou cedo demais depois de uma cirurgia é arriscar **incapacitação** em plena descida. Quem operou o estribo precisa saber que **resfriados** e infecções do nariz ameaçam a ventilação do ouvido médio.",
          "**Como prevenir e amenizar.** Respeite o prazo do cirurgião e, para o tripulante, o da autoridade. Depois de uma cirurgia do ouvido, trate qualquer resfriado antes de voar e equalize com mais cuidado na descida. Quem teve vertigem repetida ou forte em voo é encaminhado a um **otorrinolaringologista** com experiência em aviação. O **passageiro** que operou o ouvido confirma com o cirurgião quando pode voar.",
          "**Não voe hoje** com vertigem, perfuração recente ou cirurgia do ouvido sem liberação. O médico examina o tímpano com o **otoscópio pneumático**, testa a **Valsalva**, pede **audiometria** e, se houver vertigem, os **testes do equilíbrio**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v3-3-cirurgia.jpg'), 'Microscópio cirúrgico em cirurgia do ouvido médio.') },
          { paragrafo: 2, midia: 'prazo-ouvido' },
          { paragrafo: 3, figura: foto(require('@/assets/images/topicos/m2v3-3-vertigem.jpg'), 'Vertigem verdadeira é a sensação de que tudo gira.') },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · tímpano, cirurgias e vertigem',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Perfuração única e seca', 'Avaliar com o médico', 'ICAO e ANAC: não torna inapto se a audição cumprir o requisito'],
                ['Perfuração resolvida, sem sintomas', 'Pode voar', 'FAA: emitir'],
                ['Estapedectomia', 'Confirmar com o cirurgião', 'ICAO: 1 a 3 meses sem voar; depois 2 anos com tripulação múltipla'],
                ['Timpanoplastia', 'Confirmar com o cirurgião', 'Sem restrição com tímpano íntegro e audição normal'],
                ['Vertigem transitória (labirintite, posicional)', 'Voar depois de recuperado', 'ANAC: não apto até se restabelecer; FAA: pode não desqualificar após a recuperação'],
                ['Vertigem permanente ou Ménière', 'Avaliar com o médico', 'ANAC: transtorno vestibular permanente, não apto'],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · ouvido operado e vertigem',
              colunas: ['Situação', 'O que fazer'],
              linhas: [
                ['Depois de cirurgia do ouvido', 'Respeitar o prazo do cirurgião e da autoridade'],
                ['Resfriado depois de cirurgia', 'Tratar antes de voar; equalizar com mais cuidado'],
                ['Vertigem repetida em voo', 'Otorrinolaringologista com experiência em aviação'],
                ['Área atrófica no tímpano', 'Tratada como perfuração'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.4',
      titulo: 'Audição',
      pergunta: 'Quanto um tripulante precisa ouvir?',
      conteudo: {
        texto: [
          "Para voar, é preciso **entender a fala e o rádio** no ruído da cabine, ouvir os **sinais de alerta** e os sons do próprio avião. A fala se concentra entre **500 e 3.000 Hz**, e é nessa faixa que as autoridades medem a audição. A perda pode ser **de condução**, no ouvido externo e médio, ou **neurossensorial**, no ouvido interno e no nervo; a **presbiacusia**, a perda da idade, pode começar já depois dos **30 anos** e atinge primeiro os sons agudos.",
          "O **ruído** da cabine mascara a fala e, com o tempo, lesa o ouvido (Veja M1V6 - II). Acima de **80 dB** pode haver perda **temporária**: uma queda de 50 dB depois de 2 horas de exposição se recupera em cerca de **16 horas**, mas uma de 60 dB leva dias. Quem faz o exame logo depois de voar pode ter um audiograma **pior do que o real**. A perda **súbita** da audição em voo é rara.",
          "Para o **tripulante**, a ANAC e a ICAO usam a **audiometria tonal**: até **35 dB** em 500, 1.000 e 2.000 Hz e até **50 dB** em 3.000 Hz, **em cada ouvido**. Na ANAC, o exame é feito a cada **5 anos** abaixo dos 40 e a cada **2 anos** a partir dos 40. A FAA aceita ouvir a **voz de conversa a 1,8 m**, de costas, ou uma tabela de melhor e pior ouvido. Quem passa do limite ainda pode ser apto se **entender a fala com o ruído da cabine**, num teste especial ou em voo. Na ANAC, quem não atende em nenhum ouvido recebe a restrição de **não usar rádio** nem atuar como **comissário**.",
          "Voar ouvindo mal é arriscar **perder uma instrução** do controle ou um **alarme**. Por isso a perda auditiva se acompanha com audiogramas repetidos. O **aparelho auditivo** em geral **não é aceito em voo** para o tripulante profissional, porque o fone e o interfone da aeronave já cumprem esse papel; para os demais, só depois de avaliação.",
          "**Como proteger a audição.** Use **protetor** sempre que o ruído for alto (Veja M1V6 - III). O **abafador** reduz em média **35 dB**; o protetor de **inserção** precisa estar bem ajustado e ter o canal de ventilação livre; os dois juntos chegam a cerca de **55 dB**, o máximo antes de o som chegar pelos ossos do crânio. O fone com **redução ativa de ruído** funciona só nos graves, até **1.200 Hz**, e pede proteção passiva junto. Mantenha o volume do fone o mais baixo que permita entender, limpe os protetores e não os use com o ouvido inflamado. Antes da audiometria, fique um tempo **longe do ruído**.",
          "**Não voe** como tripulante sem o audiograma em dia ou com perda nova não avaliada. O médico pede a **audiometria tonal** de cada ouvido, a **voz** em sala silenciosa e, se preciso, o teste de **fala no ruído**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v3-4-audiometria.jpg'), 'Audiometria tonal: cada ouvido é testado separadamente na cabine acústica.') },
          { paragrafo: 3, midia: 'audiometria-normas' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · audição',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Audição dentro do limite', 'Sem restrição', 'Apto quanto à audição'],
                ['Perda acima do limite num ouvido', 'Sem restrição', 'ANAC: na revalidação, um ouvido pode bastar; teste de fala no ruído'],
                ['Perda acima do limite nos dois ouvidos', 'Sem restrição', 'Teste de fala no ruído; ANAC: restrição de rádio e de comissário se falhar'],
                ['Aparelho auditivo', 'Pode usar', 'Em geral não aceito em voo para profissionais'],
                ['Perda súbita', 'Avaliação médica antes de voar', 'Não voar até a avaliação'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v3-4-fone.jpg'), 'Fone com abafador na cabine: proteção e comunicação ao mesmo tempo.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como proteger a audição',
              colunas: ['Situação', 'O que fazer'],
              linhas: [
                ['Ruído alto', 'Abafador (cerca de 35 dB) ou inserção bem ajustada; os dois juntos chegam a 55 dB'],
                ['Fone com redução ativa', 'Funciona até 1.200 Hz; usar com proteção passiva'],
                ['Volume do rádio', 'O mais baixo que permita entender'],
                ['Higiene', 'Protetores limpos; não usar com o ouvido inflamado'],
                ['Antes da audiometria', 'Ficar um tempo longe do ruído'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.5',
      titulo: 'Seios da face',
      pergunta: 'Por que a cabeça dói tanto na descida com sinusite?',
      conteudo: {
        texto: [
          "Os **seios da face** são cavidades de ar nos ossos do rosto: **frontais**, na testa; **maxilares**, nas bochechas; **etmoidais**, entre os olhos; e **esfenoidais**, no fundo do nariz. Eles se abrem no nariz por canais estreitos. O nariz também precisa funcionar bem para **ventilar** os seios e a tuba e para sentir o **cheiro** de fumaça, óleo ou combustível.",
          "Na **aerossinusite**, ou barotrauma dos seios, a abertura fica bloqueada pelo inchaço do **resfriado**, da **sinusite**, da **alergia** ou de **pólipos**, e a pressão não se iguala. Como no ouvido, ela aparece sobretudo **na descida**, com **dor forte** sobre o seio afetado; no **esfenoide**, a dor vai para a **nuca**, e o seio **maxilar** bloqueado pode doer nos **dentes de cima** (Veja M2V3 - VI). Uma **concha bolhosa**, bolsa de ar dentro do nariz, também pode causá-la.",
          "Para o **passageiro**, a regra é a mesma do ouvido: com infecção dos seios ou congestão forte, pode **adiar** o voo e usar descongestionante para aliviar. Para o **tripulante**, a ANAC exige **nariz livre** e **ausência de doença grave dos seios**, com **radiografia** dos seios no exame inicial; a ICAO pede que não haja obstrução nasal. O resfriado é reavaliado em **7 a 10 dias** e não se voa com ele.",
          "Voar com sinusite é arriscar uma dor que pode **incapacitar** o piloto na aproximação. A secreção parada no seio bloqueado favorece a **infecção**. A dor costuma aliviar em minutos com um **vasoconstritor nasal suave**, mas quem está tratando com **antibiótico** ou **anti-histamínico** não voa durante o tratamento.",
          "**Como prevenir e amenizar.** Trate a **alergia** com o remédio de sempre e cuide do nariz antes da viagem. Não voe resfriado. Na descida, mantenha as manobras do ouvido, que também ajudam o nariz. Quem tem **sinusite repetida**, pólipos ou concha bolhosa conversa com o otorrinolaringologista: muitas vezes o tratamento resolve o problema no voo. Dor nos dentes de cima que só aparece no voo pode vir do seio, e não do dente.",
          "**Não voe hoje** com sinusite, nariz entupido ou dor na face. O médico examina o nariz, palpa os seios, pergunta pelos **sprays** e **anti-histamínicos** em uso e, se preciso, pede **raio X** ou **tomografia**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, midia: 'mapa-seios' },
          { paragrafo: 2, figura: foto(require('@/assets/images/topicos/m2v3-5-dor-face.jpg'), 'Dor na face e na testa durante a descida: o ar ficou preso no seio.') },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · seios da face',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Resfriado ou sinusite aguda', 'Pode adiar; descongestionante pode aliviar', 'Não voar; reavaliar em 7 a 10 dias'],
                ['Alergia controlada', 'Pode voar com o remédio de sempre', 'Avaliar o remédio com o examinador'],
                ['Sinusite crônica ou pólipos', 'Avaliar antes de viagem longa', 'ANAC: sem doença grave dos seios; tratamento antes'],
                ['Em antibiótico ou anti-histamínico', 'Pode voar', 'ICAO: não voar durante o tratamento'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v3-5-spray.jpg'), 'O spray nasal alivia por pouco tempo e não substitui o tratamento.') },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Como prevenir e amenizar · seios da face',
              colunas: ['Situação', 'O que fazer'],
              linhas: [
                ['Alergia', 'Manter o remédio de sempre'],
                ['Resfriado', 'Não voar como tripulante; passageiro pensa em adiar'],
                ['Descida', 'Manobras de equalização; ficar acordado'],
                ['Sinusite repetida, pólipos ou concha bolhosa', 'Tratamento com o otorrinolaringologista'],
                ['Dor nos dentes de cima só no voo', 'Pensar no seio maxilar'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '3.6',
      titulo: 'Dentes e implantes',
      pergunta: 'Quanto tempo esperar para voar depois do dentista?',
      conteudo: {
        texto: [
          "A **barodontalgia** é a dor de dente provocada pela variação de pressão. Ela não é uma doença em si: aparece num dente que **já tinha um problema**, como **cárie**, **restauração com falha**, **inflamação da polpa**, **polpa morta** ou **lesão na raiz**. Perto de **um terço** dos casos vem de uma **restauração recente**. Entre tripulações de voos de transporte militar, **7%** relataram ao menos um episódio.",
          "O tipo de dor ajuda a achar a causa. Na classificação de **Ferjentsik e Aker**, a dor **aguda e breve na subida** sugere **pulpite irreversível**; a **dor surda e latejante na subida**, **pulpite reversível**; a **dor surda na descida**, **polpa necrótica**; e a dor **forte e persistente** na subida e na descida, **lesão na raiz**. A dor que vem do **seio maxilar** bloqueado imita dor de dente (Veja M2V3 - V). Um curativo mal selado pode deixar o ar entrar sob a pele.",
          "Os **prazos depois do dentista**, sem dor, inchaço nem sangramento, são: **restauração**, 24 horas, de preferência 1 semana; **extração simples**, 24 a 48 horas; **implante sem complicação**, **extração cirúrgica** e **tratamento de canal**, 72 horas; **levantamento do seio maxilar** ou **enxerto ósseo**, pelo menos **2 semanas**. Esses prazos vêm sobretudo da experiência com tripulações militares.",
          "Para o **tripulante**, a ANAC exige dentes suficientes para mastigar sem sintomas, **sem cárie profunda**, doença da gengiva ou da raiz, **sem curativo dentário** e **sem tratamento de canal em curso**, com odontograma a cada **5 anos** e radiografia panorâmica no exame inicial. Voar com uma barodontalgia é voar com uma dor que pode **distrair** ou **incapacitar** na descida.",
          "**Como prevenir e amenizar.** Termine o tratamento dentário **antes** de se expor à variação de pressão, e marque os procedimentos longe das viagens. Tripulantes fazem **exame dentário a cada 6 meses**. Quem faz tratamento em várias sessões pede um **curativo bem selado**. Depois de levantamento do seio, prefira voltar por terra ou mar; se o voo for inevitável, espere ao menos 2 semanas e confirme que o seio não dá sintomas. Leve o **analgésico** indicado pelo dentista se o voo não puder esperar.",
          "**Não voe hoje** com dor de dente que piora com a pressão, curativo provisório ou antes do prazo do procedimento. O dentista examina o dente, testa a **vitalidade da polpa** e pede **radiografia** para achar cárie, falha da restauração ou lesão na raiz.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v3-6-dentista.jpg'), 'Restauração recente é uma das causas mais comuns de dor de dente no voo.') },
          { paragrafo: 2, midia: 'classes-barodontalgia' },
          { paragrafo: 3, midia: 'prazo-dentista' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · dentes',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Restauração', '24 h; de preferência 1 semana', 'ANAC: sem curativo dentário'],
                ['Extração simples', '24 a 48 h', 'Sem dor, inchaço nem sangramento'],
                ['Implante, extração cirúrgica ou canal', '72 h', 'ANAC: sem tratamento de canal em curso'],
                ['Levantamento do seio ou enxerto ósseo', 'Pelo menos 2 semanas', 'Pelo menos 2 semanas, sem sintomas no seio'],
                ['Dor de dente que piora com a pressão', 'Tratar antes de voar', 'Não voar até tratar'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v3-6-radiografia.jpg'), 'A radiografia panorâmica mostra cáries, restaurações e lesões na raiz.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Ouvido médio', 'Dor, surdez, zumbido e perfuração na descida: com a tuba fechada o ar do ouvido médio não se renova, e a pressão de fora empurra o tímpano para dentro', 'Não voar resfriado; equalizar cedo'],
                ['Ouvido interno e equilíbrio', 'Vertigem alternobárica e fístula; vertigem incapacitante: pressão diferente nos dois ouvidos estimula um labirinto mais que o outro, e a fístula deixa a pressão chegar ao ouvido interno', 'Tratar o nariz; respeitar prazos depois de cirurgia'],
                ['Audição', 'Ruído mascara a fala e lesa o ouvido com o tempo: o excesso de energia sonora destrói células ciliadas, que não se regeneram', 'Protetor, volume baixo e audiometria em dia'],
                ['Nariz e seios da face', 'Aerossinusite com dor forte na descida: com a saída do seio fechada, o vácuo puxa a mucosa, que incha e pode sangrar', 'Tratar alergia e sinusite; não voar com o nariz entupido'],
                ['Dentes', 'Barodontalgia em dente doente ou recém-tratado: gás preso no dente ou a polpa inflamada sentem a variação de pressão', 'Tratamento concluído antes; prazos depois do dentista'],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      pergunta: 'Por que o ouvido dói mais na descida do que na subida?',
      opcoes: ['Porque o avião desce mais rápido', 'Porque a tuba auditiva abre sozinha na subida e fica fechada na descida', 'Por causa do ruído', 'Porque o ar fica mais seco'],
      correta: 1,
      explicacao: 'A tuba funciona como válvula de uma via: o ar sai sozinho na subida, mas na descida só entra com manobras como engolir ou a Valsalva.',
      topico: '3.1',
    },
    {
      pergunta: 'Qual é a causa da maioria das falhas em equalizar o ouvido?',
      opcoes: ['Doença do nariz e da garganta, como o resfriado', 'O excesso de oxigênio', 'A idade', 'O uso de fones'],
      correta: 0,
      explicacao: 'Em 85% ou mais dos casos, a falha vem de doença das vias aéreas superiores, como resfriado, alergia e sinusite.',
      topico: '3.1',
    },
    {
      pergunta: 'Com que diferença de pressão o tímpano pode romper?',
      opcoes: ['5 a 10 mmHg', '20 a 50 mmHg', '200 a 500 mmHg', '2.000 mmHg'],
      correta: 2,
      explicacao: 'Para a ICAO, o tímpano pode romper com 200 a 500 mmHg de diferença; descer de 6.500 ft ao nível do mar já dá cerca de 150 mmHg.',
      topico: '3.1',
    },
    {
      pergunta: 'O que significa o grau 5 da escala de Teed?',
      opcoes: ['Só sintomas', 'Tímpano vermelho', 'Sangue no ouvido médio', 'Perfuração do tímpano'],
      correta: 3,
      explicacao: 'A escala de Teed vai do grau 0, só com sintomas, ao grau 5, com perfuração do tímpano.',
      topico: '3.2',
    },
    {
      pergunta: 'O que a FAA diz sobre o spray descongestionante para o piloto?',
      opcoes: ['É obrigatório antes de todo voo', 'Em geral não dá proteção adequada contra o bloqueio do ouvido', 'Substitui as manobras', 'Pode ser usado sem limite'],
      correta: 1,
      explicacao: 'Para a FAA, spray e gotas em geral não protegem o bastante, e o descongestionante oral pode prejudicar muito o desempenho.',
      topico: '3.2',
    },
    {
      pergunta: 'Depois da estapedectomia, quanto tempo a ICAO recomenda sem voar?',
      opcoes: ['1 dia', '1 semana', '1 a 3 meses', '5 anos'],
      correta: 2,
      explicacao: 'A ICAO pede 1 a 3 meses sem voar, avaliação especializada e voo com tripulação múltipla por 2 anos.',
      topico: '3.3',
    },
    {
      pergunta: 'Qual é o limite de audiometria da ANAC e da ICAO em 500, 1.000 e 2.000 Hz?',
      opcoes: ['Até 15 dB', 'Até 35 dB em cada ouvido', 'Até 60 dB', 'Não há limite'],
      correta: 1,
      explicacao: 'Até 35 dB em 500, 1.000 e 2.000 Hz e até 50 dB em 3.000 Hz, em cada ouvido.',
      topico: '3.4',
    },
    {
      pergunta: 'Onde dói a aerossinusite do seio esfenoidal?',
      opcoes: ['Na testa', 'Nas bochechas', 'Na nuca', 'No queixo'],
      correta: 2,
      explicacao: 'O esfenoide fica no fundo do nariz, e sua aerossinusite dá dor na parte de trás da cabeça.',
      topico: '3.5',
    },
    {
      pergunta: 'Depois de um tratamento de canal, quanto tempo esperar para voar?',
      opcoes: ['Nenhum', '72 horas', '1 mês', '6 meses'],
      correta: 1,
      explicacao: 'Implante sem complicação, extração cirúrgica e tratamento de canal pedem 72 horas sem dor, inchaço nem sangramento.',
      topico: '3.6',
    },
    {
      pergunta: 'Que proporção das barodontalgias vem de restauração recente?',
      opcoes: ['Quase nenhuma', 'Perto de um terço', 'Todas', 'Metade das extrações'],
      correta: 1,
      explicacao: 'Perto de um terço dos casos de barodontalgia vem de restauração dentária recente.',
      topico: '3.6',
    },
  ],
  liberacao: liberacaoOuvidos,
};
