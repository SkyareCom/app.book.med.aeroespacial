// Missão 3 · Voo 2 — Farmacologia aeroespacial. Ramo editorial voo/M3V2; fotos e vídeo entram depois da produção.
// Mesmo padrão do M3V1: prosa progressiva, "Como prevenir e amenizar" com tabela, interativo por tópico, animação em
// src/components/midia/animacoes-aviacao.tsx abaixo do marcador do M3V1, tabela final e teste. Leitores: passageiro,
// tripulante e médico examinador.
// REGISTRO DE REVISÃO · 16/11/2026. Fontes primárias conferidas:
// FAA, Aeronautical Information Manual 8-1-1 e 8-1-2 (remédios com e sem receita degradam o desempenho; depressores,
//   antialérgicos, tranquilizantes; 1 onça de destilado, 1 cerveja ou 4 onças de vinho prejudicam; ressaca; 8 horas;
//   12 a 24 horas recomendadas; álcool e doses baixas de remédios deixam o cérebro mais sensível à hipóxia e à
//   desorientação). FAA, página Pharmaceuticals (remédio inseguro para máquina perigosa é inseguro para voar). FAA,
//   OTC Medications for Pilots: 48 horas depois da primeira dose sem efeito; NO GO: 5 intervalos (4–6 h: 30 h; 8 h:
//   40 h; 12 h: 60 h); difenidramina e doxilamina 60 h; clorfeniramina e clemastina 5 dias; GO: fexofenadina,
//   loratadina, corticoides nasais, soro, guaifenesina, paracetamol, aspirina, ibuprofeno, naproxeno, antiácidos,
//   IBP, anti-H2, laxantes, colírios (não pomadas em voo); meclizina e dimenidrinato NO GO; produtos "PM", NyQuil
//   (doxilamina), Coricidin HBP (clorfeniramina); descongestionantes aceleram o coração, cuidado com café; melatonina
//   fora de hora piora o jet lag e dá sono diurno. FAA, Guide for AMEs: Sleep Aids (uso ocasional, nunca diário; 5×
//   meia-vida máxima; zolpidem 24 h, sublingual 36 h, Intermezzo 36 h, spray 48 h; zaleplon 12 h; eszopiclona 30 h;
//   ramelteona 24 h; temazepam 72 h); Erectile Dysfunction (sildenafila, vardenafila, avanafila 8 h; tadalafila 24 h;
//   2,5 ou 5 mg diária aceita sem efeito em 7 dias; bloqueador alfa com IPDE-5: confirmar ausência de hipotensão).
//   14 CFR 91.17 (8 h e 0,04 g/dL) e 14 CFR Part 120 (testes). Esperas DNF: 5 meias-vidas ou 5 intervalos (registro do M2V12).
// UK CAA, Guidance material for medication used by pilots, v2.0 (26/01/2026): teste no solo de alguns dias, avisar o
//   examinador e o prescritor; antialérgicos sedativos (difenidramina, prometazina) não aceitos; melatonina só receitada
//   e por pouco tempo para jet lag; antimaláricos aceitos atovaquona-proguanil, cloroquina, doxiciclina, mefloquina não;
//   IPDE-5 podem ser aceitos sem efeito adverso; codeína e opiáceos não; corticoide inalatório e beta-2 aceitos, oral e
//   teofilina não; reposição de nicotina aceita, vareniclina e bupropiona não; anestesia local 12 h, geral, raquidiana
//   ou peridural 48 h; canabidiol não compatível; cafeína com moderação, cápsulas e anfetaminas não; antibióticos em
//   geral indicam infecção que impede o voo.
// CASA (Austrália), Clinical Practice Guideline Ground trial for medication: avaliar remédio para dormir 12 h depois;
//   repetir o teste no solo depois dos 45 anos nos remédios usados raramente.
// IFALPA, Briefing Leaflet 19HUPBL05 "Medication and Flying" (11/12/2019): teste no solo de 24 a 48 h; 5 meias-vidas
//   (8 em alguns países); remédios para dormir interagem com álcool; mefloquina: insônia, humor, desorientação espacial,
//   coordenação fina; anti-hipertensivos compatíveis com afastamento inicial; alguns ISRS aceitos sob condições.
// NTSB, Safety Study SS-14/01 "Drug Use Trends in Aviation" (2014): 6.677 pilotos mortos de 1990 a 2012; remédios com
//   potencial de prejuízo de 11% para 23%; difenidramina o mais comum; nenhum piloto de grande acidente de linha aérea
//   com uso recente de droga ilícita (via OHS Online, 12/09/2014).
// ANAC, RBAC 91, Emenda 07: 91.17(a)(2)-(4) (proibido sob efeito de álcool ou substância psicoativa; nenhuma
//   concentração de álcool, com tolerância da margem de erro do aparelho), 91.17(d) (etilômetro até 2 h; outras
//   substâncias até 32 h), 91.19 (transporte de substâncias e remédios de controle especial só com autorização).
//   RBAC 120, Emenda 04: 120.335(a) substâncias; 120.339 tipos de teste e taxas aleatórias; 120.333 médico revisor;
//   120.9 e 120.351 afastamento, avaliação por especialista e teste de retorno. RBAC 67 (Emenda 05): antidepressivo,
//   antidiabético oral e anticoagulante cumarínico (Veja M3V1 - II).
// Farmacologia básica (Goodman & Gilman; Ernsting): meia-vida e eliminação (0,5^5 ≈ 3%), antialérgicos de 1ª geração
//   atravessam a barreira hematoencefálica, opioides deprimem o centro respiratório, descongestionantes são
//   simpaticomiméticos.
// Condutas sem número próprio são aplicação das fontes acima.
import type { Capitulo } from '../tipos';

export const farmacologia: Capitulo = {
  numero: 2,
  titulo: 'Farmacologia aeroespacial',
  tempoLeituraMin: 14,
  topicos: [
    {
      id: '2.1',
      titulo: "O remédio no corpo que voa",
      pergunta: "Por que um remédio seguro no solo pode atrapalhar no voo, e quais efeitos importam na cabine?",
      conteudo: {
        texto: [
          "Todo remédio age no corpo por um mecanismo e deixa **efeitos colaterais**. No voo, quatro deles importam mais: o **sono**, a **tontura** com queda de pressão ao levantar, a **visão** borrada ou com cores alteradas e o **raciocínio** mais lento. O desempenho do piloto pode ser seriamente prejudicado por remédios com e sem receita, sobretudo os que deprimem o sistema nervoso, como calmantes, tranquilizantes e antialérgicos. A regra prática da FAA é simples: o remédio que não é seguro para operar uma máquina perigosa também não é seguro para voar.",
          "A cabine soma seus próprios fatores ao remédio. Com **menos oxigênio**, pequenas quantidades de álcool e doses baixas de certos remédios deixam o cérebro muito mais sensível à hipóxia, porque o calmante e a falta de oxigênio deprimem o mesmo neurônio (Veja M2V1). O **ar seco** e as horas sem beber água reduzem o volume de sangue, e o remédio de pressão ou o diurético soma a queda ao levantar (Veja M2V15 - I). O **fuso horário** tira a dose do horário em que o corpo está acostumado a recebê-la (Veja M2V8 - IV).",
          "Quem corre mais risco é quem está nos **primeiros dias** de um remédio novo, quando o efeito colateral ainda é desconhecido e pode aparecer de surpresa. Também quem usa **vários remédios** ao mesmo tempo, como muitos idosos, e quem compra um produto combinado sem saber o que há dentro: os analgésicos e antigripais vendidos como **\"noturnos\"** costumam trazer um antialérgico que dá sono. Para o tripulante, o corpo precisa ficar alerta durante toda a jornada, e não só na decolagem.",
          "Os números mostram o tamanho do problema. O NTSB, que investiga acidentes nos Estados Unidos, analisou o sangue de **6.677** pilotos mortos em acidentes entre 1990 e 2012: a parte com remédios capazes de prejudicar o voo subiu de **11%** para **23%**. O mais encontrado foi a **difenidramina**, antialérgico que dá sono, presente em remédios para gripe, alergia e insônia. Nos grandes acidentes de linha aérea, nenhum piloto tinha usado drogas ilícitas pouco antes, mas alguns tinham tomado remédios que podem prejudicar o desempenho.",
          "Antes de qualquer remédio, o tripulante faz três perguntas: estou apto a voar com a condição que me fez tomar o remédio, preciso mesmo dele, e já o tomei no solo sem efeito colateral? A FAA pede que não se voe depois da primeira dose até passarem **48 horas** sem efeitos; a autoridade britânica fala em **alguns dias** de teste no solo, com orientação do examinador. Também vale avisar o médico e o farmacêutico de que se é piloto, porque a escolha do remédio pode mudar (Veja M3V2 - III).",
          "Para o **passageiro**, quase todo remédio de uso contínuo continua no voo, no horário combinado com o médico e na **bagagem de mão**. O cuidado maior é com o remédio para **dormir** a bordo: ele soma confusão e quedas no idoso e deixa a pessoa imóvel por horas, o que favorece a trombose nas pernas (Veja M2V15 - V e M2V11). O antialérgico antigo usado contra enjoo também dá sono e deve ser testado em casa antes da viagem.",
          "**Como prevenir e amenizar.** Antes do voo, o passageiro leva a lista de remédios e as doses na bagagem de mão e combina com o médico o horário no novo fuso; o tripulante testa todo remédio novo no solo, lê a composição dos produtos combinados e procura o examinador quando o tratamento for contínuo. Durante o voo, ninguém toma remédio cujo efeito ainda não conhece, e o tripulante não toma nenhum que dê sono. Depois, quem sentir sono, tontura ou visão alterada não volta ao comando até o efeito passar e o prazo de espera terminar.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v2-1-comprimido.jpg'), legenda: "No voo, os efeitos que importam são o sono, a tontura, a visão e o raciocínio." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "O que muda em altitude · remédios no corpo",
              colunas: ["Fator do voo", "O que acontece no organismo", "Quem é mais vulnerável"],
              linhas: [
                ["Menos oxigênio", "O cérebro com menos oxigênio fica mais sensível a calmantes, antialérgicos antigos e álcool", "Quem usa remédio que deprime o sistema nervoso: o remédio e a hipóxia somam efeito sobre o mesmo neurônio (Veja M2V1)"],
                ["Ar seco e pouca água", "Menos volume de sangue e queda de pressão ao levantar", "Quem usa diurético ou remédio de pressão: o volume menor e o remédio somam a queda da pressão (Veja M2V15 - I)"],
                ["Horas sentado", "Sangue parado nas pernas", "Passageiro que toma remédio para dormir: fica imóvel por horas e soma o risco de trombose (Veja M2V11)"],
                ["Fuso horário", "Dose fora do horário a que o corpo está acostumado", "Quem toma remédio de horário fixo, como insulina e anticoagulante: o relógio muda e a dose atrasa ou se repete (Veja M2V8 - IV)"],
                ["Jornada longa e fadiga", "Atenção já reduzida pelo cansaço", "Quem começou um remédio novo: nos primeiros dias o efeito colateral ainda é desconhecido e soma com o cansaço"],
              ],
            },
          },
          { paragrafo: 3, midia: 'remedio-voo' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Remédios no sangue de pilotos mortos em acidentes · NTSB, 1990 a 2012",
              colunas: ["Achado", "Número"],
              linhas: [
                ["Pilotos analisados", "6.677"],
                ["Com remédio que pode prejudicar o voo, no início do período", "11%"],
                ["Com remédio que pode prejudicar o voo, no fim do período", "23%"],
                ["Remédio mais encontrado", "Difenidramina, antialérgico que dá sono"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v2-1-farmaceutica.jpg'), legenda: "Avisar o médico e o farmacêutico de que se é piloto pode mudar a escolha do remédio." } },
          { paragrafo: 6, video: { fonte: require('@/assets/videos/m3v2-voo.mp4'), legenda: "Remédio para dormir a bordo: no idoso, soma confusão, quedas e horas imóvel, o que favorece a trombose." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · o remédio no corpo que voa",
              colunas: ["Momento", "Passageiro", "Tripulante"],
              linhas: [
                ["Antes do voo", "Lista de remédios e doses na bagagem de mão e horário combinado com o médico: o fuso muda o relógio do corpo", "Remédio novo testado no solo por 48 horas, no mínimo: o efeito colateral costuma aparecer nos primeiros dias"],
                ["Durante o voo", "Nada novo para dormir e água ao longo do voo: o calmante e a desidratação somam queda de pressão e confusão", "Nenhum remédio que dê sono: a hipóxia da cabine aumenta o efeito sobre o cérebro"],
                ["Depois do voo", "Retomar o horário das doses no novo fuso, como combinado com o médico", "Com sono, tontura ou visão alterada, não voltar ao comando: o efeito e o prazo de espera precisam terminar"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '2.2',
      titulo: "Medicamentos permitidos",
      pergunta: "Quais remédios o tripulante pode usar, quais tiram do voo e por que o mecanismo de cada um decide?",
      conteudo: {
        texto: [
          "Não existe uma lista universal. A decisão junta três perguntas: a **doença** permite voar, o **remédio** não prejudica o desempenho e o tratamento está **estável**? A FAA separa os remédios **Do Not Issue**, que impedem o certificado enquanto forem usados, dos **Do Not Fly**, que só proíbem o voo por um tempo depois da dose. No Brasil, o RBAC 67 não traz lista de remédios: julga a condição e cita alguns tratamentos, como o antidepressivo só com parecer favorável do psiquiatra, o antidiabético oral depois de 60 dias de controle e o anticoagulante cumarínico, que torna inapto (Veja M3V1 - II).",
          "Entre os remédios sem receita, a FAA costuma aceitar os **antialérgicos que não dão sono**, como fexofenadina e loratadina, os **corticoides nasais**, o soro fisiológico no nariz, o xarope de **guaifenesina**, o **paracetamol**, a aspirina, o ibuprofeno e o naproxeno, desde que a doença de base permita voar, além de antiácidos, protetores do estômago, laxantes e colírios. A autoridade britânica aceita a **bombinha** de corticoide e de broncodilatador para asma, a reposição de **nicotina** e a cafeína com moderação.",
          "Entre os remédios de uso contínuo, os de **pressão** costumam ser compatíveis com o voo, com um período de afastamento no início do tratamento para ver se a pressão não cai demais. Contra a malária, a autoridade britânica aceita **atovaquona com proguanil**, **cloroquina** e **doxiciclina**, mas não a **mefloquina**, que pode causar desorientação espacial e mudança de humor. Os remédios para **disfunção erétil** podem ser aceitos se não houver efeito colateral e o prazo de espera for cumprido, e alguns antidepressivos são aceitos sob protocolos rígidos (Veja M2V7 - II e M3V2 - III).",
          "Tiram do voo os **antialérgicos que dão sono**, como difenidramina, doxilamina, clorfeniramina e prometazina, os remédios contra **enjoo** de mesma família, como meclizina e dimenidrinato, e os produtos \"noturnos\" que os contêm. Também os **opioides**, inclusive a codeína dos xaropes, os **relaxantes musculares**, os **corticoides por via oral** e a teofilina, a vareniclina e a bupropiona contra o cigarro, o **canabidiol**, as cápsulas de cafeína e as anfetaminas. Os **descongestionantes** de comprimido aceleram o coração e pedem cuidado, sobretudo com café a mais.",
          "O que decide é o **mecanismo**. O antialérgico antigo atravessa a barreira entre o sangue e o cérebro e bloqueia a histamina, que ajuda a manter o cérebro acordado: vem o sono. O novo quase não entra no cérebro, por isso não dá sono na maioria das pessoas. O **opioide** deprime o sistema nervoso e a respiração, o que soma com a hipóxia. A **mefloquina** age sobre o sistema nervoso e pode causar insônia, desorientação espacial e alterações do humor. O **descongestionante** estimula o sistema simpático: o coração acelera e a pressão sobe (Veja M2V2 e M2V6).",
          "Para o **passageiro**, a regra é mais flexível: ele não opera a aeronave e pode usar a maioria desses remédios, com dois cuidados. O primeiro é **testar em casa** o remédio que dá sono, como o antialérgico contra enjoo, porque o efeito aparece mais forte com o pouco oxigênio da cabine. O segundo é lembrar que, depois do pouso, muitas vezes é preciso **dirigir**: o sono do remédio continua em terra pelo mesmo tempo.",
          "**Como prevenir e amenizar.** Antes de comprar qualquer remédio, o tripulante lê a composição e confere se há antialérgico antigo, codeína ou descongestionante; prefere os antialérgicos que não dão sono, o corticoide nasal e o soro para o nariz; e, para viagens a áreas de malária, pede ao médico um remédio aceito pela autoridade. No uso contínuo, informa o examinador antes de começar e cumpre o período de observação. O passageiro testa em casa o remédio contra enjoo e evita dirigir enquanto o sono durar.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v2-2-composicao.jpg'), legenda: "A decisão junta a doença, o remédio e a estabilidade do tratamento." } },
          { paragrafo: 2, midia: 'semaforo-remedio' },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Remédios e voo · aceitos e não aceitos",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA, CAA e ANAC)"],
              linhas: [
                ["Antialérgico que não dá sono: fexofenadina, loratadina", "Quase não entra no cérebro", "Em geral aceito, depois de teste no solo"],
                ["Antialérgico que dá sono: difenidramina, doxilamina, clorfeniramina, prometazina", "Bloqueia a histamina no cérebro e dá sono", "Não voar até o fim do prazo de espera"],
                ["Corticoide nasal, soro, colírio", "Ação local, sem efeito no cérebro", "Em geral aceitos; pomada nos olhos não, durante o voo"],
                ["Paracetamol, aspirina, ibuprofeno, naproxeno", "Sem efeito sobre a atenção na dose habitual", "Aceitos se a doença de base permite voar"],
                ["Opioides e codeína, inclusive em xarope", "Deprimem o sistema nervoso e a respiração", "Não aceitos durante o uso"],
                ["Remédio de pressão", "Pode baixar demais a pressão no início", "Em geral compatível, com afastamento no início do tratamento"],
                ["Antimaláricos", "Mefloquina: desorientação espacial e mudança de humor", "Atovaquona com proguanil, cloroquina e doxiciclina aceitas; mefloquina não"],
                ["Asma", "Corticoide oral e teofilina têm efeito no corpo todo", "Bombinha de corticoide e broncodilatador aceitas; corticoide oral e teofilina não"],
                ["Contra o cigarro", "Vareniclina e bupropiona agem no cérebro", "Reposição de nicotina aceita; vareniclina e bupropiona não"],
                ["Antidepressivo", "Pode mudar atenção, sono e humor", "ANAC: só com parecer favorável do psiquiatra; FAA: protocolo próprio (Veja M2V7 - II)"],
                ["Canabidiol, cápsulas de cafeína e anfetaminas", "Agem no cérebro e no coração", "Não aceitos; café com moderação é aceito"],
              ],
            },
          },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Remédios e voo · por que tiram do voo",
              colunas: ["Remédio", "Mecanismo no corpo", "Risco no voo"],
              linhas: [
                ["Antialérgico antigo", "Atravessa para o cérebro e bloqueia a histamina, que mantém o cérebro acordado", "Sono, atenção lenta e visão borrada"],
                ["Opioide", "Deprime o sistema nervoso e o centro da respiração", "Sono e respiração mais fraca, que somam com a hipóxia"],
                ["Mefloquina", "Age sobre o sistema nervoso", "Desorientação espacial, insônia, mudança de humor e menos coordenação fina"],
                ["Descongestionante de comprimido", "Estimula o sistema simpático", "Coração acelerado e pressão alta, piores com café"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v2-2-inalador.jpg'), legenda: "A bombinha age no pulmão; o corticoide por via oral age no corpo todo." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · medicamentos permitidos",
              colunas: ["Momento", "Passageiro", "Tripulante"],
              linhas: [
                ["Antes de comprar", "Ler a composição e evitar os produtos \"noturnos\" se for dirigir depois do pouso", "Conferir se há antialérgico antigo, codeína ou descongestionante: são os que mais tiram do voo"],
                ["Antes da viagem", "Testar em casa o remédio contra enjoo: o sono fica mais forte na cabine", "Para área de malária, pedir remédio aceito pela autoridade: a mefloquina não é"],
                ["Uso contínuo", "Manter o horário combinado com o médico e as doses na bagagem de mão", "Informar o examinador antes de começar e cumprir o período de observação"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '2.3',
      titulo: "Afastamento",
      pergunta: "Quanto tempo esperar depois da última dose, e por que a meia-vida do remédio define o prazo?",
      conteudo: {
        texto: [
          "Depois da última dose, o corpo elimina o remédio aos poucos. A **meia-vida** é o tempo para a quantidade no sangue cair pela metade: depois de uma meia-vida resta 50%, depois de duas, 25%, e depois de **cinco**, cerca de **3%**. É por isso que a FAA pede esperar **5 vezes a meia-vida máxima** depois de um remédio Do Not Fly ou, sem esse dado, **5 vezes o maior intervalo entre as doses**. Alguns países pedem 8 meias-vidas. O fígado e os rins fazem essa limpeza, e quem tem a função deles reduzida elimina mais devagar (Veja M2V10 e M2V14).",
          "Na prática, para os remédios sem receita, a FAA traduz a regra em horas: dose a cada **4 a 6 horas**, espera de **30 horas**; a cada **8 horas**, **40 horas**; a cada **12 horas**, **60 horas**. Os antialérgicos que dão sono ficam mais tempo no corpo: **60 horas** para difenidramina e doxilamina e **5 dias** para clorfeniramina e clemastina. Remédio novo, mesmo aceito, pede **48 horas** sem efeito colateral depois da primeira dose antes de voar.",
          "Os **remédios para dormir** têm prazos próprios na FAA, que aceita o uso ocasional, nunca todas as noites: **24 horas** para o zolpidem comum, **36 horas** para o sublingual, **12 horas** para o zaleplon, **30 horas** para a eszopiclona, **24 horas** para a ramelteona e **72 horas** para o temazepam. A autoridade australiana pede que o teste de um remédio para dormir seja avaliado **12 horas** depois de tomado. O sono induzido não é igual ao natural, e a sonolência pode durar mais do que a pessoa percebe (Veja M2V8 - VII).",
          "Outros prazos seguem a mesma lógica. Para os remédios de **disfunção erétil**, a FAA pede **8 horas** depois de sildenafila, vardenafila e avanafila e **24 horas** depois da tadalafila ocasional; a tadalafila diária de 2,5 ou 5 mg é aceita se não houver efeito colateral em **7 dias**. A autoridade britânica pede **12 horas** depois de anestesia local e **48 horas** depois de anestesia geral, raquidiana ou peridural. Nos remédios usados raramente, a autoridade australiana recomenda repetir o teste no solo depois dos **45 anos**, porque a resposta do corpo muda.",
          "O **álcool** tem regra própria. A FAA proíbe atuar até **8 horas** depois de qualquer bebida, sob influência ou com **0,04 g/dL** ou mais, e o manual de informação aeronáutica recomenda deixar **12 a 24 horas** entre o copo e o voo, porque a ressaca prejudica por muitas horas depois de o álcool sair do sangue. No Brasil, o RBAC 91 não aceita **nenhuma concentração de álcool** no organismo, só a margem de erro do aparelho, e o etilômetro pode ser feito até **2 horas** depois de atuar; o exame de outras substâncias, até **32 horas** (Veja M3V2 - IV).",
          "O prazo do remédio não é o único: a **doença** também afasta. Quem precisa de antibiótico em geral está com uma infecção que já impede o voo, e a febre, a dor ou a falta de ar continuam a pesar depois que o remédio sai do corpo. Voltar antes do fim do prazo expõe o corpo a sono, tontura ou visão borrada no comando, e, para o tripulante, voar sob efeito de substância proibida pode levar à cassação do CMA e a punições administrativas (Veja M3V1 - IV).",
          "**Como prevenir e amenizar.** Antes de tomar, o tripulante calcula o prazo: cinco vezes a meia-vida ou cinco vezes o intervalo entre as doses, e confere se ele termina antes da próxima apresentação; se não terminar, escolhe outro remédio ou avisa a escala. Toma o remédio para dormir só de forma ocasional e no horário que deixa o prazo inteiro antes do voo. Não bebe nas horas anteriores à jornada, e no Brasil isso significa chegar sem nenhum álcool no sangue. O passageiro respeita o mesmo prazo antes de dirigir depois do pouso.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v2-3-relogio.jpg'), legenda: "O prazo depende de quanto tempo o corpo leva para eliminar o remédio." } },
          { paragrafo: 1, midia: 'animacao-meia-vida' },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Afastamento · quanto esperar depois da última dose (FAA)",
              colunas: ["Remédio ou situação", "Espera", "Por quê"],
              linhas: [
                ["Dose a cada 4 a 6 horas", "30 horas", "Cinco intervalos entre as doses"],
                ["Dose a cada 8 horas", "40 horas", "Cinco intervalos entre as doses"],
                ["Dose a cada 12 horas", "60 horas", "Cinco intervalos entre as doses"],
                ["Difenidramina e doxilamina", "60 horas", "Antialérgicos que dão sono e ficam mais tempo no corpo"],
                ["Clorfeniramina e clemastina", "5 dias", "Meia-vida longa"],
                ["Remédio novo", "48 horas sem efeito colateral", "O efeito colateral costuma aparecer nos primeiros dias"],
              ],
            },
          },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Remédios para dormir · espera depois da dose (FAA)",
              colunas: ["Remédio", "Espera"],
              linhas: [
                ["Zaleplon", "12 horas"],
                ["Zolpidem comum ou de liberação prolongada", "24 horas"],
                ["Ramelteona", "24 horas"],
                ["Eszopiclona", "30 horas"],
                ["Zolpidem sublingual", "36 horas"],
                ["Zolpidem em spray oral", "48 horas"],
                ["Temazepam", "72 horas"],
              ],
            },
          },
          { paragrafo: 4, midia: 'espera-remedio' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Outros prazos · disfunção erétil e anestesia",
              colunas: ["Situação", "Espera", "Autoridade"],
              linhas: [
                ["Sildenafila, vardenafila ou avanafila", "8 horas", "FAA"],
                ["Tadalafila ocasional", "24 horas", "FAA"],
                ["Tadalafila diária de 2,5 ou 5 mg", "Aceita se não houver efeito colateral em 7 dias", "FAA"],
                ["Anestesia local", "12 horas", "Autoridade britânica"],
                ["Anestesia geral, raquidiana ou peridural", "48 horas", "Autoridade britânica"],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v2-3-etilometro.jpg'), legenda: "No Brasil, o tripulante não pode ter nenhuma concentração de álcool no organismo." } },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Álcool e voo · FAA e ANAC",
              colunas: ["Regra", "FAA", "ANAC"],
              linhas: [
                ["Tempo depois de beber", "Proibido atuar até 8 horas depois de qualquer bebida; recomendação de 12 a 24 horas", "Proibido atuar sob efeito de álcool ou fazendo uso de bebida alcoólica"],
                ["Concentração no organismo", "Proibido com 0,04 g/dL ou mais", "Nenhuma concentração, só a margem de erro do aparelho"],
                ["Exame depois de atuar", "Programa de testes de álcool e drogas do 14 CFR Part 120", "Etilômetro até 2 horas; outras substâncias até 32 horas"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · afastamento",
              colunas: ["Momento", "Passageiro", "Tripulante"],
              linhas: [
                ["Antes de tomar", "Saber por quanto tempo o remédio dá sono, porque depois do pouso pode ser preciso dirigir", "Calcular cinco meias-vidas ou cinco intervalos e conferir se o prazo termina antes da apresentação"],
                ["Remédio para dormir", "Evitar a bordo, sobretudo no idoso: confusão, quedas e imobilidade", "Uso ocasional, nunca todas as noites, no horário que deixa o prazo inteiro antes do voo"],
                ["Álcool", "Pouco ou nenhum a bordo: o álcool desidrata e soma com o remédio que dá sono", "Nenhum nas horas anteriores à jornada; no Brasil, chegar sem nenhum álcool no sangue"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '2.4',
      titulo: "Interações",
      pergunta: "Como o remédio se soma a outro remédio, ao álcool, à hipóxia e ao fuso, e o que o exame toxicológico procura?",
      conteudo: {
        texto: [
          "Uma **interação** acontece quando dois efeitos chegam ao mesmo órgão e se somam. Ela pode vir de **outro remédio**, do **álcool**, do **ambiente** da cabine ou do **cansaço** e do fuso. Isoladamente, cada fator pode ser pequeno; juntos, produzem sono, queda de pressão ou confusão que nenhum deles causaria sozinho. Por isso o teste de um remédio no solo, descansado e ao nível do mar, não garante o mesmo efeito no voo (Veja M3V2 - I).",
          "Entre **remédios**, o exemplo clássico é o bloqueador alfa usado na próstata, como a tansulosina, junto com o remédio para disfunção erétil: os dois dilatam os vasos, e a FAA pede confirmar que não houve queda de pressão antes de voar (Veja M2V14 - IV). Outro é o produto **combinado**: analgésicos \"noturnos\" costumam conter difenidramina, alguns xaropes noturnos trazem doxilamina e certos antigripais para hipertensos trazem clorfeniramina. Quem toma dois produtos diferentes pode somar o mesmo antialérgico duas vezes sem perceber.",
          "Com o **álcool**, os remédios para dormir e os calmantes somam o efeito sobre o cérebro: mais sono, reflexo lento e respiração mais fraca. O álcool também deixa o piloto muito mais sujeito à **desorientação** e à **hipóxia**, e essa sensibilidade cresce com qualquer remédio que deprima o sistema nervoso. Uma dose pequena de bebida, que pareceria inofensiva no solo, pode pesar na cabine a 8.000 ft (Veja M2V1 e M2V5).",
          "Com o **ambiente**, o descongestionante de comprimido acelera o coração e sobe a pressão, e o **café** a mais soma o mesmo estímulo; quem tem doença do coração deve ter cuidado redobrado (Veja M2V2). A desidratação do ar seco soma com o diurético e o remédio de pressão. Com o **fuso**, a **melatonina** tomada na hora errada pode piorar o jet lag e dar sono durante o dia; por isso a autoridade britânica só a aceita receitada e por pouco tempo, para o jet lag (Veja M2V8 - IV).",
          "No Brasil, o **RBAC 120** obriga as empresas a testar quem exerce atividade de risco à segurança operacional para **álcool**, **opiáceos**, **canabinoides**, **cocaína** e **anfetaminas**, no exame prévio, de forma **aleatória**, depois de acidente e por suspeita justificada. Um resultado positivo passa pelo **médico revisor**, que verifica se há tratamento legítimo com receita; se houver, o resultado é considerado negativo. Quem tem resultado positivo confirmado ou recusa o teste é afastado e só volta depois de avaliação por especialista e de um novo teste negativo.",
          "A receita protege no exame, mas não torna o remédio compatível com o voo: a codeína com receita aparece como opiáceo e continua proibida para o tripulante. O **canabidiol**, mesmo receitado, não é compatível com a certificação para a autoridade britânica. E o transporte de remédios de **controle especial** numa aeronave civil dentro do Brasil exige autorização das autoridades competentes. Voar sob efeito de substância proibida pode levar à cassação do CMA e às penalidades do Código Brasileiro de Aeronáutica (Veja M3V1 - IV).",
          "**Como prevenir e amenizar.** Antes de juntar dois remédios, o tripulante lê a composição dos dois, procura o mesmo princípio ativo repetido e pergunta ao farmacêutico sobre interações; não bebe álcool com remédio que dá sono; reduz o café quando usa descongestionante; e combina com o médico o horário da melatonina no novo fuso. Guarda a receita dos remédios em uso, porque o médico revisor pode pedi-la depois de um exame toxicológico. O passageiro evita misturar calmante, remédio para dormir e bebida no mesmo voo.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v2-4-rotulo.jpg'), legenda: "Dois produtos diferentes podem trazer o mesmo antialérgico que dá sono." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Interações que importam no voo",
              colunas: ["Combinação", "O que acontece no corpo", "Conduta"],
              linhas: [
                ["Bloqueador alfa da próstata e remédio para disfunção erétil", "Os dois dilatam os vasos e a pressão pode cair ao levantar", "Confirmar no solo que não há queda de pressão antes de voar"],
                ["Dois produtos com o mesmo antialérgico", "Dose dobrada sem perceber e mais sono", "Ler a composição e evitar os produtos \"noturnos\""],
                ["Remédio para dormir ou calmante e álcool", "Os dois deprimem o cérebro e a respiração", "Nunca juntar; respeitar o prazo de cada um"],
                ["Remédio que dá sono e hipóxia da cabine", "O cérebro fica mais sensível à falta de oxigênio", "Tripulante: não voar no prazo de espera"],
                ["Descongestionante e café", "Os dois estimulam o coração e sobem a pressão", "Reduzir o café e preferir soro ou corticoide no nariz"],
                ["Melatonina e fuso", "Na hora errada, empurra o relógio para o lado errado e dá sono de dia", "Só com receita e horário combinado com o médico"],
              ],
            },
          },
          { paragrafo: 3, midia: 'combina-remedio' },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m3v2-4-coleta.jpg'), legenda: "O exame toxicológico procura álcool, opiáceos, canabinoides, cocaína e anfetaminas." } },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Exame toxicológico · RBAC 120",
              colunas: ["Item", "Regra"],
              linhas: [
                ["Substâncias", "Álcool, opiáceos, canabinoides, cocaína, anfetaminas, metanfetaminas, MDMA e MDA"],
                ["Quando", "Antes de começar, de forma aleatória, depois de acidente, por suspeita justificada, no retorno e no acompanhamento"],
                ["Teste aleatório mínimo por ano", "50% dos empregados em empresas com até 500 pessoas nessa atividade"],
                ["Receita médica", "O médico revisor considera negativo o resultado explicado por tratamento legítimo"],
                ["Resultado positivo ou recusa", "Afastamento, avaliação por especialista e novo teste negativo para voltar"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · receita não basta",
              colunas: ["Situação", "No exame", "No voo"],
              linhas: [
                ["Codeína com receita", "Aparece como opiáceo; o médico revisor confere a receita", "Continua proibida para o tripulante durante o uso e o prazo de espera"],
                ["Canabidiol receitado", "Pode exigir explicação ao médico revisor", "Não compatível com a certificação para a autoridade britânica"],
                ["Remédio de controle especial na bagagem", "Receita guardada para mostrar se pedida", "Transporte em aeronave civil no Brasil só com autorização das autoridades competentes"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · interações",
              colunas: ["Momento", "Passageiro", "Tripulante"],
              linhas: [
                ["Antes de juntar remédios", "Perguntar ao farmacêutico e ler a composição dos dois produtos", "Procurar o mesmo princípio ativo repetido: dose dobrada dá mais sono"],
                ["No voo e no pernoite", "Não misturar calmante, remédio para dormir e bebida", "Sem álcool com remédio que dá sono e menos café com descongestionante"],
                ["Sempre", "Receitas dos remédios de uso contínuo junto com eles", "Guardar a receita: o médico revisor pode pedi-la depois do exame toxicológico"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "O que acontece", "Proteção e prevenção"],
              linhas: [
                ["Cérebro e sistema nervoso", "Sono, reflexo lento e julgamento pior; antialérgicos antigos, opioides, calmantes e álcool deprimem os neurônios, que ficam ainda mais sensíveis com a hipóxia", "Remédios que não dão sono, prazo de espera de cinco meias-vidas e nenhum álcool antes da jornada"],
                ["Coração e vasos", "Queda de pressão ao levantar ou coração acelerado; vasodilatadores somam o efeito, e descongestionantes estimulam o sistema simpático", "Teste no solo, água ao longo do voo e cuidado com café e descongestionante"],
                ["Respiração", "Respiração mais fraca com opioides e calmantes; o centro da respiração no tronco cerebral responde menos à falta de oxigênio", "Opioides e calmantes fora do voo e bombinha no lugar de corticoide oral na asma"],
                ["Olhos e equilíbrio", "Visão borrada e desorientação; antialérgicos antigos e mefloquina agem sobre o sistema nervoso que controla o foco e o equilíbrio", "Antimalárico aceito pela autoridade e colírio no lugar de pomada nos olhos durante o voo"],
                ["Fígado e rins", "Eliminação mais lenta do remédio quando a função está reduzida; o efeito dura mais que o previsto", "Prazo de espera revisto pelo médico e teste repetido no solo depois dos 45 anos"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '2.1',
      pergunta: "Por que um remédio que dá sono pesa mais na cabine do que no solo?",
      opcoes: [
        "Porque a cabine é mais fria",
        "Porque o remédio e a falta de oxigênio deprimem o mesmo neurônio",
        "Porque o avião acelera a absorção",
        "Porque o remédio perde efeito em altitude",
      ],
      correta: 1,
      explicacao: "Pequenas doses de álcool e de certos remédios deixam o cérebro muito mais sensível à hipóxia: os dois efeitos se somam.",
    },
    {
      topico: '2.1',
      pergunta: "No estudo do NTSB com pilotos mortos em acidentes de 1990 a 2012, qual remédio foi o mais encontrado?",
      opcoes: [
        "Paracetamol",
        "Difenidramina",
        "Loratadina",
        "Ibuprofeno",
      ],
      correta: 1,
      explicacao: "A difenidramina, antialérgico que dá sono, está em remédios para gripe, alergia e insônia; a parte de pilotos com remédios capazes de prejudicar o voo subiu de 11% para 23%.",
    },
    {
      topico: '2.1',
      pergunta: "Pela FAA, quanto tempo o piloto espera depois da primeira dose de um remédio novo, mesmo aceito?",
      opcoes: [
        "Nenhum tempo",
        "6 horas",
        "48 horas sem efeito colateral",
        "30 dias",
      ],
      correta: 2,
      explicacao: "Os efeitos colaterais costumam aparecer nos primeiros dias; por isso o remédio novo é testado no solo antes do voo.",
    },
    {
      topico: '2.2',
      pergunta: "Qual destes antialérgicos costuma ser aceito para o tripulante?",
      opcoes: [
        "Difenidramina",
        "Prometazina",
        "Fexofenadina",
        "Clorfeniramina",
      ],
      correta: 2,
      explicacao: "A fexofenadina quase não entra no cérebro e não dá sono na maioria das pessoas; os outros atravessam para o cérebro e dão sono.",
    },
    {
      topico: '2.2',
      pergunta: "Qual antimalárico a autoridade britânica não aceita para pilotos?",
      opcoes: [
        "Doxiciclina",
        "Mefloquina",
        "Atovaquona com proguanil",
        "Cloroquina",
      ],
      correta: 1,
      explicacao: "A mefloquina age sobre o sistema nervoso e pode causar desorientação espacial e mudança de humor.",
    },
    {
      topico: '2.2',
      pergunta: "Por que o descongestionante de comprimido pede cuidado, sobretudo com café?",
      opcoes: [
        "Porque dá muito sono",
        "Porque estimula o sistema simpático: acelera o coração e sobe a pressão",
        "Porque baixa o açúcar do sangue",
        "Porque piora a visão de cores",
      ],
      correta: 1,
      explicacao: "O café soma o mesmo estímulo ao coração; quem tem doença cardíaca deve ter cuidado redobrado.",
    },
    {
      topico: '2.3',
      pergunta: "Depois de cinco meias-vidas, quanto do remédio ainda resta no sangue?",
      opcoes: [
        "Cerca de 50%",
        "Cerca de 25%",
        "Cerca de 3%",
        "Nada",
      ],
      correta: 2,
      explicacao: "A cada meia-vida a quantidade cai pela metade: 50%, 25%, 12,5%, 6,25% e cerca de 3% depois da quinta.",
    },
    {
      topico: '2.3',
      pergunta: "Um remédio sem receita tomado a cada 8 horas tira o piloto do voo por quanto tempo depois da última dose (FAA)?",
      opcoes: [
        "8 horas",
        "24 horas",
        "40 horas",
        "5 dias",
      ],
      correta: 2,
      explicacao: "Cinco intervalos de 8 horas somam 40 horas; para doses a cada 12 horas, a espera é de 60 horas.",
    },
    {
      topico: '2.3',
      pergunta: "No Brasil, quanto álcool o tripulante pode ter no organismo ao atuar (RBAC 91)?",
      opcoes: [
        "Até 0,04 g/dL",
        "Até 0,08 g/dL",
        "Nenhuma concentração, só a margem de erro do aparelho",
        "Qualquer quantidade, se passaram 8 horas",
      ],
      correta: 2,
      explicacao: "O RBAC 91 proíbe qualquer concentração de álcool; o limite de 0,04 g/dL e as 8 horas são regras da FAA.",
    },
    {
      topico: '2.4',
      pergunta: "Qual combinação pede confirmar no solo que a pressão não cai antes de voar?",
      opcoes: [
        "Paracetamol e soro nasal",
        "Bloqueador alfa da próstata e remédio para disfunção erétil",
        "Loratadina e colírio",
        "Antiácido e laxante",
      ],
      correta: 1,
      explicacao: "Os dois dilatam os vasos e somam a queda de pressão ao levantar.",
    },
    {
      topico: '2.4',
      pergunta: "O que o médico revisor faz com um exame toxicológico positivo no RBAC 120?",
      opcoes: [
        "Afasta o tripulante sem ouvir",
        "Verifica se há tratamento legítimo com receita e, se houver, considera o resultado negativo",
        "Repete o exame no dia seguinte",
        "Libera qualquer remédio para o voo",
      ],
      correta: 1,
      explicacao: "A receita protege no exame, mas não torna o remédio compatível com o voo: a codeína receitada continua proibida para o tripulante.",
    },
    {
      topico: '2.4',
      pergunta: "Por que a melatonina tomada na hora errada atrapalha o tripulante?",
      opcoes: [
        "Porque é proibida em todos os países",
        "Porque pode piorar o jet lag e dar sono durante o dia",
        "Porque sobe a pressão",
        "Porque aparece como opiáceo no exame",
      ],
      correta: 1,
      explicacao: "A melatonina empurra o relógio biológico; na hora errada, empurra para o lado errado. A autoridade britânica só a aceita receitada e por pouco tempo.",
    },
  ],
};
