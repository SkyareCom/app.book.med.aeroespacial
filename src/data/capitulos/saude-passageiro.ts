// Missão 3 · Voo 9 — Saúde do passageiro. Ramo editorial voo/M3V9.
// Pedido do autor (19/11/2026): MEDIF e mobilidade reduzida já estão na Liberação para voo e no card Deficiências;
// os dois temas repetidos saíram e entraram Crianças e bebês e Evacuação, com remissão aos cards existentes.
// REGISTRO DE REVISÃO · 19/11/2026. Fontes conferidas:
// 9.1 Aptidão. CDC Yellow Book 2026, Air travel: cabine de até 2.440 m (FAA), em geral 1.830 a 2.440 m; umidade de 10% a
//   20%; anemia, doença cardiopulmonar e cerebrovascular; AsMA: avaliar doença cardiovascular, AVC, cirurgia recente,
//   TVP ou embolia prévias; cirurgia abdominal, cardiotorácica ou intraocular; gripe transmitida por 5 a 7 dias; sarampo
//   em aviões; tuberculose; adiar com infecção respiratória aguda; sem oxigênio próprio, só concentradores aprovados;
//   Aviation Medical Assistance Act (kit e treinamento em primeiros socorros, RCP e DEA). CDC Yellow Book 2026,
//   Travelers with chronic illnesses: carta médica. ANAC, Resolução 280/2013 (cópia do TJRJ): documento médico para
//   maca ou incubadora, oxigênio ou equipamento médico e condição de risco.
// 9.2 Crianças e bebês. CDC Yellow Book 2026, Traveling safely with infants and children: voo seguro para a maioria;
//   descida, deglutição, mamada; antialérgico contraindicado antes de 1 ano, FDA e AAP antes de 6 anos, descongestionante
//   antes de 4; sem evidência de piora da otite; CRS; doença cardíaca, pulmonar e falciforme; fuso. CDC, Travel and
//   breastfeeding: tuba auditiva. Idade mínima por companhia: Air India (7 dias) e Aegean (48 h a 7 dias com atestado e
//   sem prematuridade; abaixo de 48 h só em incubadora com médico). Mayo Clinic: evitar os primeiros 7 dias; cirurgia do
//   ouvido e otite. BTS 2022 (Coker et al., Thorax): prematuro antes da data prevista com oxigênio disponível; menor de
//   1 ano com doença respiratória crônica, pneumologista pediátrico e teste considerado. Thorax 2013;68(12):1163: até um
//   terço com SpO2 abaixo de 85%. FAA, Flying with children e folheto CRS: colo desaconselhado; 20 lb, 40 lb, CARES de 22 a
//   44 lb e até 40 pol. (convertidos para 9, 18, 10 a 20 kg e cerca de 1 m). NTSB, Safety Alert 015. GOL: bebê de colo até
//   2 anos incompletos. ANAC, consulta CS 05 SAR 2025 (IS 21-022A): definições de bebê e sistema de contenção. Correio
//   Braziliense (2025): inscrição de certificação para veículos e aeronaves. Kentucky Transportation Cabinet: cadeirinha
//   na janela, nunca no corredor nem na saída de emergência.
// 9.3 Turbulência. FAA (via AP e LAist): 146 feridos graves de 2009 a 2021, 30 passageiros e 116 tripulantes; definição
//   de lesão grave; lesões leves sem notificação. NTSB (2021, Suffern): passageiros feridos fora do assento ou sem cinto;
//   28% sem aviso. TSIB de Singapura, relatório preliminar do SQ321 (29/05/2024, via Reuters): +1,35 G a −1,5 G em
//   0,6 s; −1,5 G a +1,5 G em 4 s; 54 m em 4,6 s; morte de passageiro de 73 anos por provável infarto; 84 kg a 113 kg.
//   NTSB, Homendy: fraturas, coluna e pescoço. Prosser et al., Geophys Res Lett 2023: 55%, 37% e 17%, 17,7 a 27,4 h.
// 9.4 Evacuação. NTSB/SR-01/01 e atualização de 2020: 51.207 sobreviventes, 2.280 mortos, mais de 95%; 1.093, 30 e 42
//   acidentes (1983 a 2017). 14 CFR 25.803 e Apêndice J. JAL 516 (02/01/2024): 379 pessoas, sem bagagem de mão.
//   Aeroflot 1492 (05/05/2019): 41 de 78 mortos; bagagem em debate. FAA DOT/FAA/AM-15/17 (Taylor, DeWeese e
//   Moorcroft, 2015) e DeWeese (2019): posição antiga, encostos travados, rebatíveis e com absorção de energia; pés para
//   trás; AC 121-24D revista. FAA, AC sobre posição de proteção: cinto baixo e firme, criança na cadeirinha, bebê no colo,
//   gestante e pessoa com deficiência. FAA OAM 95/25 (saída tipo III): idade 43%, peso, cintura e sexo. National
//   Academies (2025): estudo da FAA sobre assentos sem menores de 18, maiores de 60 e limitação física. SKYbrary: mais
//   de 80% de lesões leves por escorregador, salto da porta ou da asa, causas. FAA, Amdt. 121-176 (1981): 169 feridos em
//   oito demonstrações; lesões de evacuações reais de 1970 a 1974.
// Normas estrangeiras são citadas como tais e não viram regra brasileira. Dicas sem número próprio (carta médica,
// remédios na mão, bebidas com tampa, contar fileiras, afastar-se do avião, sinais de alerta depois de pancada) são
// aplicação das fontes e dos voos citados.
import type { Capitulo } from '../tipos';

export const saudePassageiro: Capitulo = {
  numero: 9,
  titulo: 'Saúde do passageiro',
  tempoLeituraMin: 14,
  topicos: [
    {
      id: '9.1',
      titulo: "Aptidão para voar",
      pergunta: "Quem pode embarcar, quem deve adiar a viagem e quem decide quando a saúde está em dúvida?",
      conteudo: {
        texto: [
          "Voar com **aptidão** é ter reserva suficiente para o ambiente da cabine. A FAA exige pressão equivalente a no máximo **2.440 m (cerca de 8.000 pés)**, e as cabines costumam ficar entre **1.830 e 2.440 m**; o ar é seco, com **10% a 20%** de umidade. O corpo saudável compensa sem perceber. Quem tem **anemia**, inclusive a falciforme, **doença do coração e dos pulmões** ou **doença cerebrovascular** sente mais a queda do oxigênio (Veja M1V2 - II). Além disso, o gás preso no corpo se expande (Veja M1V1 - II) e as horas sentado favorecem a trombose (Veja M2V2 - VII).",
          "Por isso, a **Aerospace Medical Association** recomenda avaliar antes da viagem quem tem **doença cardiovascular**, teve **AVC**, passou por **cirurgia recente** ou já teve **trombose ou embolia**. Depois de cirurgia no **abdome**, no **tórax** ou no **olho**, a orientação é falar com o médico antes de comprar a passagem: ar ou gás residual se expande com a subida. A doença crônica **instável** deve ser controlada antes da viagem. Os prazos de cada condição estão nos voos da Missão Sistemas e no formulário **Liberação para voo**.",
          "A aptidão também protege **quem está ao lado**. A cabine é um espaço compartilhado: um adulto saudável pode transmitir o vírus da **gripe** por **5 a 7 dias** depois do início dos sintomas, e há casos documentados de **sarampo** transmitido dentro de aviões. A **tuberculose** contagiosa se espalha por partículas que ficam muito tempo no ar. O CDC orienta que quem tem **infecção respiratória aguda**, confirmada ou suspeita, **adie o voo** até deixar de transmitir.",
          "Quem decide? No Brasil, a **Resolução 280/2013 da ANAC** permite que a companhia peça um **documento médico** quando o passageiro precisa viajar em **maca ou incubadora**, usa **oxigênio ou outro equipamento médico**, ou tem condição que possa trazer **risco para si ou para os outros** ou exigir atenção médica extraordinária no voo. Esse documento costuma ser o **MEDIF**, analisado pelo serviço médico da empresa (Veja Liberação para voo). O passageiro **não leva o próprio cilindro de oxigênio**: o oxigênio é combinado com a companhia, que pode aceitar só **concentradores portáteis aprovados**.",
          "Voar sem condições muda o cenário de uma piora: no ar, a ajuda se limita ao **kit médico de bordo**, à tripulação treinada em **primeiros socorros, reanimação e desfibrilador**, e a profissionais de saúde que estejam entre os passageiros. O objetivo a bordo é **estabilizar** até chegar ao atendimento em terra. Uma condição que já estava instável no solo perde, no ar, o tempo e os recursos de um hospital.",
          "A decisão depende da **doença e da fase** em que ela está, não do diagnóstico isolado. A mesma pessoa pode estar apta hoje e não estar depois de uma piora. Por isso, quem vive com uma doença crônica deve levar uma **carta do médico** com o diagnóstico, os tratamentos e a avaliação de aptidão para a viagem, e manter os remédios na **bagagem de mão**. Sinais de piora recente, como falta de ar, dor no peito, febre ou sangramento, são motivo para **adiar e reavaliar**.",
          "**Como prevenir e amenizar.** Converse com o médico **antes de comprar a passagem** se tiver doença crônica, cirurgia recente ou necessidade de oxigênio. Peça a **carta médica** e, se a companhia exigir, envie o **MEDIF** com antecedência. Com sintomas de **infecção respiratória**, adie a viagem. Leve os remédios na bagagem de mão, com folga para atrasos, e informe a tripulação se passar mal a bordo.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v9-1-consulta.jpg'), legenda: "Antes de comprar a passagem, a conversa com o médico define se a reserva do corpo basta para a cabine." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Quando falar com o médico antes de voar",
              colunas: ["Situação", "Por que pesa no voo", "O que fazer"],
              linhas: [
                ["Anemia, coração, pulmão ou AVC", "Menos oxigênio chega aos tecidos", "Avaliação antes de comprar a passagem"],
                ["Cirurgia recente no abdome, tórax ou olho", "Ar ou gás residual se expande na subida", "Prazo definido pelo cirurgião"],
                ["Trombose ou embolia anteriores", "Horas sentado favorecem novo coágulo", "Plano de prevenção com o médico"],
                ["Infecção respiratória aguda", "Contágio no espaço fechado da cabine", "Adiar até deixar de transmitir"],
                ["Uso de oxigênio ou equipamento médico", "Não se leva cilindro próprio", "Combinar com a companhia e enviar o MEDIF"],
              ],
            },
          },
          { paragrafo: 3, midia: 'aptidao-situacoes' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v9-1-bordo.jpg'), legenda: "A bordo, a ajuda se limita ao kit médico e ao treinamento da tripulação." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · aptidão para voar",
              colunas: ["Quando", "O que fazer", "Por quê"],
              linhas: [
                ["Antes de comprar a passagem", "Conversar com o médico", "A fase da doença define a aptidão"],
                ["Dias antes do voo", "Carta médica e MEDIF, se exigido", "A companhia decide com o serviço médico"],
                ["Com febre ou infecção respiratória", "Adiar a viagem", "Evita contágio na cabine"],
                ["No embarque", "Remédios na bagagem de mão", "Atrasos e bagagem extraviada não interrompem o tratamento"],
                ["A bordo", "Avisar a tripulação ao passar mal", "A ajuda chega antes da piora"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '9.2',
      titulo: "Crianças e bebês",
      pergunta: "A partir de quando o bebê pode voar, como proteger os ouvidos dele e por que o colo não é o lugar mais seguro?",
      conteudo: {
        texto: [
          "Para o CDC, o voo é **seguro para a maioria dos recém-nascidos, bebês e crianças**. A idade mínima não vem de uma norma médica única: é a **companhia aérea** que define. Muitas só aceitam bebês a partir de **7 dias** de vida. Outras aceitam de **48 horas a 7 dias** com atestado de que o bebê está apto e não nasceu prematuro, e abaixo de **48 horas** só em **incubadora**, com médico. Especialistas desaconselham voar nos **primeiros 7 dias** quando não há necessidade.",
          "O **prematuro** é o caso que mais pede cuidado. Entre bebês nascidos antes do tempo que voam perto da data prevista do parto, até **um terço** tem saturação de oxigênio abaixo de **85%** durante o voo. A **Sociedade Torácica Britânica** orienta que o prematuro (menos de **37 semanas**) que ainda não chegou à **data prevista do parto** viaje com **oxigênio disponível** a bordo, porque o teste de hipóxia pode não prever bem a necessidade. O bebê com menos de **1 ano** e doença respiratória crônica deve ser avaliado por um **pneumologista pediátrico**, que pode indicar o teste. Crianças com doença do coração, do pulmão ou anemia falciforme também correm risco de hipóxia.",
          "Os **ouvidos** doem mais na **descida**, quando a pressão da cabine sobe e a tuba auditiva precisa se abrir para equilibrar o ouvido médio (Veja M2V3 - II). Engolir e mastigar ajudam: o bebê pode **mamar no peito ou na mamadeira**, e a criança maior pode mascar chiclete. A amamentação ajuda a tuba a se ajustar aos poucos. **Antialérgicos e descongestionantes não mostraram benefício** para essa dor: o antialérgico é contraindicado antes de **1 ano**, a FDA e a Academia Americana de Pediatria desaconselham seu uso antes dos **6 anos**, salvo para alergia, e o descongestionante não deve ser usado antes dos **4 anos**. Não há evidência de que voar piore a otite média.",
          "No Brasil e nos Estados Unidos, a criança com menos de **2 anos** pode viajar **no colo** de um adulto. Mas a FAA afirma que o lugar mais seguro para ela é um **sistema de retenção aprovado**, em assento próprio, durante todo o voo, e **desaconselha o colo**. O motivo é físico: numa **turbulência forte** ou num acidente com sobreviventes, o adulto pode **não conseguir segurar** a criança. O NTSB registra mortes e lesões evitáveis de crianças com menos de 2 anos que estavam soltas.",
          "A escolha do dispositivo segue o **peso**. A FAA recomenda **cadeirinha voltada para trás** abaixo de **9 kg**, **voltada para a frente** de **9 a 18 kg** e o **cinto do avião** acima de **18 kg**; há também um **cinto-colete** aprovado só para aviões, para crianças de **10 a 20 kg** e até cerca de **1 metro**. A cadeirinha precisa trazer a indicação de que é certificada para **veículos e aeronaves**, e a companhia define em que assentos ela pode ser instalada: em geral, **na janela**, nunca no corredor nem na fileira da saída de emergência.",
          "As outras regras do adulto valem também para a criança. **Infecção respiratória aguda** é motivo para adiar o voo, pelo contágio e pela dor de ouvido. Quem teve **cirurgia do ouvido** ou **otite** recente deve perguntar ao médico quando pode voar. As mudanças de **fuso horário** desorganizam o sono das crianças como o dos adultos (Veja M2V8 - III). A criança com doença crônica precisa da mesma avaliação prévia descrita para o adulto (Veja M3V9 - I).",
          "**Como prevenir e amenizar.** Confira a **idade mínima** exigida pela companhia e, para prematuros ou bebês com doença do pulmão ou do coração, fale antes com o **pediatra**. Compre **assento próprio** e leve uma cadeirinha certificada para aeronaves, adequada ao peso. Ofereça **peito, mamadeira ou chupeta** na subida e, principalmente, na descida, e deixe a criança acordada nessa fase. Não use antialérgico ou descongestionante para a dor de ouvido. Com febre ou infecção respiratória, adie a viagem.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v9-2-bebe.jpg'), legenda: "A idade mínima para o bebê voar é definida por cada companhia aérea." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Bebês prematuros e oxigênio no voo",
              colunas: ["Situação", "Orientação da BTS", "Motivo"],
              linhas: [
                ["Prematuro antes da data prevista do parto", "Viajar com oxigênio disponível", "O teste de hipóxia pode não prever a necessidade"],
                ["Menor de 1 ano com doença respiratória crônica", "Avaliação com pneumologista pediátrico e teste considerado", "Reserva pulmonar menor"],
                ["Criança com doença do coração, do pulmão ou falciforme", "Avaliação antes da viagem", "Risco de hipóxia em voo"],
              ],
            },
          },
          { paragrafo: 3, midia: 'bebe-idade-voo' },
          {
            paragrafo: 5,
            tabela: {
              titulo: "Retenção da criança no avião (FAA)",
              colunas: ["Peso da criança", "Dispositivo", "Onde instalar"],
              linhas: [
                ["Menos de 9 kg", "Cadeirinha voltada para trás", "Assento próprio, na janela"],
                ["De 9 a 18 kg", "Cadeirinha voltada para a frente", "Assento próprio, na janela"],
                ["De 10 a 20 kg, até cerca de 1 m", "Cinto-colete aprovado só para aviões", "Preso ao próprio assento"],
                ["Mais de 18 kg", "Cinto do avião", "Assento próprio"],
              ],
            },
          },
          { paragrafo: 6, figura: { imagem: require('@/assets/images/topicos/m3v9-2-mamada.jpg'), legenda: "Mamar na descida ajuda a abrir a tuba auditiva e alivia a dor de ouvido." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · crianças e bebês",
              colunas: ["Quando", "O que fazer", "Por quê"],
              linhas: [
                ["Ao planejar", "Conferir a idade mínima da companhia", "A regra muda entre empresas"],
                ["Prematuro ou doença do pulmão ou do coração", "Consultar o pediatra antes", "Pode precisar de oxigênio a bordo"],
                ["Na compra", "Assento próprio e cadeirinha certificada", "O colo não segura a criança na turbulência"],
                ["Na descida", "Peito, mamadeira ou chupeta", "Engolir abre a tuba auditiva"],
                ["Com febre ou infecção respiratória", "Adiar a viagem", "Contágio e dor de ouvido"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '9.3',
      titulo: "Turbulência",
      pergunta: "Por que a turbulência machuca quem está sem cinto e o que acontece com o corpo nesses poucos segundos?",
      conteudo: {
        texto: [
          "A **turbulência** é ar instável que sacode o avião sem aviso preciso. Quase sempre é só desconforto, mas é uma das principais causas de **lesão sem morte** a bordo. Nos Estados Unidos, a FAA contou **146 feridos graves** por turbulência de **2009 a 2021**: **30 passageiros** e **116 tripulantes**. Ferido grave, para essa contagem, é quem fica internado mais de **48 horas**, fratura um osso, lesiona músculo, tendão ou órgão interno, ou sofre queimadura de segundo ou terceiro grau. Lesões leves nem precisam ser informadas, então o total real é maior.",
          "O padrão se repete nos relatórios: segundo o NTSB, a maioria dos passageiros com lesão grave estava **fora do assento** ou **sentada sem o cinto**. O caso do voo **SQ321**, em **maio de 2024**, mostra o mecanismo. Num Boeing 777 em cruzeiro, a aceleração vertical passou de **+1,35 G para −1,5 G em 0,6 segundo**: quem estava sem cinto foi **lançado para o alto**. Em seguida, foi de **−1,5 G a +1,5 G em 4 segundos**, e essas pessoas **caíram de volta**. Em **4,6 segundos**, o avião perdeu **54 metros**. Houve dezenas de feridos, e um passageiro de **73 anos** morreu de provável **infarto**.",
          "No corpo, a sequência explica as lesões. Com **G negativo**, nada prende o corpo ao assento: ele sobe, e a **cabeça bate no teto**, nos bagageiros ou nos painéis. Na volta, com **G positivo**, o corpo cai com peso multiplicado: no SQ321, uma pessoa de **84 kg** chegou a pesar o equivalente a **113 kg**. Por isso as lesões típicas são **ferimentos na cabeça**, **traumatismo craniano** e **lesões da coluna e do pescoço**, além de fraturas e cortes (Veja M2V6 - VI e M2V12 - III). Objetos soltos e bebidas quentes viram projéteis e causam queimaduras.",
          "O tipo mais traiçoeiro é a **turbulência de céu claro**, sem sinal visível no céu à frente, comum perto das **correntes de jato**. Em **28%** dos acidentes por turbulência estudados pelo NTSB, a tripulação **não teve aviso**. E o fenômeno está aumentando: num ponto típico do **Atlântico Norte**, a duração anual da turbulência de céu claro **severa** cresceu **55%** de **1979 a 2020**, de **17,7 para 27,4 horas**; a moderada subiu **37%** e a leve, **17%**. Os autores associam o aumento ao **aquecimento do clima**, que reforça o cisalhamento do vento nas correntes de jato.",
          "Alguns passageiros pagam mais caro. O **bebê de colo** pode escapar dos braços do adulto (Veja M3V9 - II). Quem está **de pé**, no corredor ou no banheiro, não tem onde se segurar. Quem tem **osteoporose**, usa **anticoagulante** ou tem doença do coração sofre mais com a mesma pancada ou com o susto: a fratura vem com menos força, o sangramento é maior e o estresse sobrecarrega o coração. O medo também pesa: a respiração acelerada pode virar **hiperventilação**, com formigamento e tontura (Veja M2V1 - V).",
          "A proteção é simples e quase completa: **cinto afivelado sempre que estiver sentado**, mesmo com o aviso apagado, ajustado **baixo e firme** sobre o quadril. Ele transforma o salto do corpo em um aperto no colo. Bagagem bem guardada e bebidas quentes com tampa reduzem projéteis e queimaduras. Depois de uma turbulência forte, **dor de cabeça que piora, vômitos, sonolência, confusão**, dor no pescoço ou nas costas e **formigamento ou fraqueza** nos braços e pernas pedem avaliação médica, mesmo sem ferida aparente.",
          "**Como prevenir e amenizar.** Mantenha o **cinto afivelado** durante todo o tempo sentado, baixo e firme. Volte ao assento assim que o aviso acender e evite ficar de pé sem necessidade. Prenda a criança em **cadeirinha aprovada** no assento próprio. Guarde objetos pesados no bagageiro ou sob o assento e use tampa nas bebidas quentes. Depois de um tranco forte, observe sinais de **lesão na cabeça ou na coluna** e procure atendimento ao pousar.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v9-3-cinto.jpg'), legenda: "Cinto baixo e firme sempre que estiver sentado, mesmo com o aviso apagado." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Segundos de turbulência severa (SQ321)",
              colunas: ["Momento", "O que o avião fez", "O que aconteceu com o corpo"],
              linhas: [
                ["Primeiro 0,6 segundo", "De +1,35 G para −1,5 G", "Quem estava sem cinto foi lançado para o alto"],
                ["Até 4 segundos depois", "De −1,5 G para +1,5 G", "Quem estava no ar caiu de volta"],
                ["Em 4,6 segundos", "Perda de 54 m de altitude", "Cabeças contra o teto, lesões de cabeça e coluna"],
              ],
            },
          },
          { paragrafo: 3, midia: 'turbulencia-onde-estou' },
          { paragrafo: 4, midia: 'animacao-cinto' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v9-3-corredor.jpg'), legenda: "De pé no corredor, não há onde se segurar quando o avião sacode." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · turbulência",
              colunas: ["Quando", "O que fazer", "Por quê"],
              linhas: [
                ["Sempre que estiver sentado", "Cinto afivelado, baixo e firme", "A turbulência de céu claro chega sem aviso"],
                ["Quando o aviso acende", "Voltar ao assento", "De pé, não há onde se segurar"],
                ["Com criança pequena", "Cadeirinha aprovada no assento próprio", "O colo não segura o bebê"],
                ["Durante o serviço", "Tampa na bebida quente e objetos guardados", "Reduz queimaduras e projéteis"],
                ["Depois de um tranco forte", "Observar cabeça, pescoço e coluna", "Lesões podem aparecer sem ferida visível"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '9.4',
      titulo: "Evacuação",
      pergunta: "O que decide quem sai bem de uma evacuação e o que o próprio passageiro pode fazer pelo corpo?",
      conteudo: {
        texto: [
          "A maioria dos acidentes com aviões comerciais tem **sobreviventes**. O NTSB estudou os acidentes das empresas aéreas americanas de **1983 a 2000**: entre mais de 53 mil ocupantes, **51.207 sobreviveram** e **2.280 morreram**, mais de **95%** de sobrevivência. Na atualização até **2017**, **1.093** acidentes terminaram com todos vivos, **30** com sobreviventes e mortos e **42** sem sobreviventes. Por isso, o que o passageiro faz **depois que o avião para** importa.",
          "Para ser certificado, um avião com mais de 44 assentos precisa mostrar que **todos saem em 90 segundos**, no escuro, com **metade das saídas** bloqueada e bagagem espalhada pelo corredor (Veja M3V15 - II). Na vida real, o que mais atrasa é o próprio passageiro. Em **janeiro de 2024**, em Tóquio, um Airbus A350 da **Japan Airlines** pegou fogo depois de colidir na pista: as **379 pessoas** saíram, e os passageiros **deixaram a bagagem de mão** para trás. Em **2019**, em Moscou, **41 das 78 pessoas** morreram no incêndio de um Superjet; vídeos mostraram passageiros saindo **com malas**, e o peso disso nas mortes segue em debate.",
          "Antes do impacto, a **posição de proteção** reduz o choque da cabeça e das pernas. A pesquisa da FAA mostrou que a orientação antiga, de apoiar **cabeça e mãos no encosto da frente**, só reduzia o risco de lesão na cabeça quando o encosto era **travado**; com encostos que **dobram para a frente** ou **absorvem energia**, ela **aumentava** a gravidade do impacto. Colocar os **pés o mais para trás possível** reduziu o risco de lesão nas pernas. A orientação da FAA foi revista com base nesse estudo, e por isso a posição certa é a do **cartão de segurança** daquele avião.",
          "O corpo de cada um também muda o tempo de saída. Em testes da FAA com saídas sobre a asa, a **idade** foi o fator que mais explicou a demora individual (**43%** da variação), seguida do **peso** e da **circunferência da cintura**; o sexo também influiu. Um estudo posterior da FAA sobre o espaço entre assentos deixou de fora menores de 18 anos, maiores de 60 e pessoas com limitação física, e revisores das Academias Nacionais dos Estados Unidos apontaram essa lacuna. Para quem é mais velho, maior ou tem limitação, a margem é planejar antes: saber onde fica a saída e quem vai ajudar.",
          "O **escorregador** também machuca. Mais de **80%** das lesões em evacuações por escorregador são **leves**; as mais graves vêm de **pular da porta ou da asa**. As causas principais são o **atrito** com a superfície, o **impacto** com o chão no fim da descida, a **queda para a frente** no pavimento e o esforço de ajudar outras pessoas. Em uma amostra de oito demonstrações de certificação, a FAA registrou **169 feridos** entre voluntários; nas evacuações reais dos anos 1970, as lesões iam de escoriações a **queimaduras de atrito**, cortes e fraturas. Fumaça e fogo trazem outro risco, o dos gases tóxicos (Veja M3V8 - II).",
          "Para quem precisa de ajuda, a FAA orienta: o **cinto bem apertado e baixo** no quadril; a criança na **cadeirinha** fica na posição do fabricante e a criança no assento faz a mesma posição do adulto; o adulto com **bebê no colo** apoia a cabeça, o pescoço e o corpo do bebê e se inclina sobre ele. **Gestantes** e pessoas com **deficiência** podem precisar da ajuda de outra pessoa para tomar a posição e sair. Combinar isso antes, com a tripulação e o acompanhante, ganha segundos (Veja Deficiências).",
          "**Como prevenir e amenizar.** Ouça a demonstração e leia o **cartão de segurança**, que traz a posição de proteção daquele avião. **Conte as fileiras** até as duas saídas mais próximas, na frente e atrás. Mantenha o cinto baixo e firme na decolagem e no pouso. Na evacuação, **deixe tudo para trás**, siga a tripulação, não pule da porta nem da asa e afaste-se do avião ao chegar ao chão. Se precisar de ajuda para sair, avise a tripulação **antes da decolagem**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v9-4-cartao.jpg'), legenda: "O cartão de segurança traz a posição de proteção daquele avião." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "O que atrasa e o que acelera a saída",
              colunas: ["Fator", "Efeito", "O que fazer"],
              linhas: [
                ["Pegar a bagagem de mão", "Bloqueia o corredor e a porta", "Deixar tudo para trás"],
                ["Não saber onde fica a saída", "Hesitação no escuro e na fumaça", "Contar as fileiras antes da decolagem"],
                ["Idade, peso e cintura", "Saída individual mais lenta", "Planejar a saída e a ajuda"],
                ["Pular da porta ou da asa", "Lesões mais graves", "Usar o escorregador como a tripulação indicar"],
              ],
            },
          },
          { paragrafo: 3, midia: 'evacuacao-posicao' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v9-4-escorregador.jpg'), legenda: "No escorregador, a tripulação orienta a descida; pular da porta ou da asa causa as lesões mais graves." } },
          { paragrafo: 6, video: { fonte: require('@/assets/videos/m3v9-voo.mp4'), legenda: "Na evacuação, a bagagem fica para trás e a saída é pelo escorregador." } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · evacuação",
              colunas: ["Quando", "O que fazer", "Por quê"],
              linhas: [
                ["Ao sentar", "Ler o cartão de segurança", "A posição de proteção depende do assento"],
                ["Antes da decolagem", "Contar as fileiras até duas saídas", "Ajuda a achar a porta no escuro"],
                ["Decolagem e pouso", "Cinto baixo e firme", "Menos movimento do corpo no impacto"],
                ["Na evacuação", "Deixar a bagagem e seguir a tripulação", "Cada segundo no corredor conta"],
                ["No chão", "Afastar-se do avião", "Fogo e fumaça avançam rápido"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "Efeito", "Mecanismo"],
              linhas: [
                ["Respiratório e sangue", "Hipóxia em quem tem pouca reserva", "Cabine equivalente a até 2.440 m reduz o oxigênio do sangue"],
                ["Ouvidos", "Dor e barotrauma, sobretudo no bebê", "Na descida, a tuba auditiva precisa se abrir para igualar a pressão"],
                ["Sistema nervoso", "Traumatismo craniano", "A cabeça bate no teto com G negativo ou no assento da frente no impacto"],
                ["Coluna e pescoço", "Fraturas e lesões", "O corpo cai de volta com peso multiplicado depois de ser lançado"],
                ["Membros e pele", "Fraturas, cortes e queimaduras de atrito", "Saltos, quedas no fim do escorregador e atrito com a superfície"],
                ["Coração", "Piora de doença instável e infarto", "Menos oxigênio, susto e esforço sobrecarregam um coração doente"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '9.1',
      pergunta: "Até que altitude equivalente a FAA permite que fique a pressão da cabine em voo normal?",
      opcoes: [
        "Cerca de 2.440 m (8.000 pés)",
        "Nível do mar",
        "Cerca de 4.000 m",
        "Cerca de 6.000 m",
      ],
      correta: 0,
      explicacao: "O limite é de cerca de 2.440 m; o corpo saudável compensa, mas quem tem pouca reserva de oxigênio sente a diferença.",
    },
    {
      topico: '9.1',
      pergunta: "Um adulto com gripe deve voar quando?",
      opcoes: [
        "No dia seguinte aos sintomas",
        "Quando deixar de transmitir",
        "A qualquer momento, com máscara",
        "Só depois de 30 dias",
      ],
      correta: 1,
      explicacao: "Um adulto saudável pode transmitir a gripe por 5 a 7 dias depois do início dos sintomas; o CDC orienta adiar até deixar de transmitir.",
    },
    {
      topico: '9.1',
      pergunta: "Pela Resolução 280/2013 da ANAC, quando a companhia pode pedir documento médico?",
      opcoes: [
        "Para todo passageiro acima de 60 anos",
        "Só em voos internacionais",
        "Para quem viaja em maca ou incubadora, usa oxigênio ou equipamento médico, ou tem condição de risco",
        "Nunca, por ser dado sigiloso",
      ],
      correta: 2,
      explicacao: "A norma permite o pedido nesses casos; o documento costuma ser o MEDIF, analisado pelo serviço médico da empresa.",
    },
    {
      topico: '9.2',
      pergunta: "Para a FAA, qual é o lugar mais seguro para uma criança com menos de 2 anos no avião?",
      opcoes: [
        "Colo do adulto com o cinto extensor",
        "Moisés no chão",
        "Canguru preso ao corpo do adulto",
        "Sistema de retenção aprovado no assento próprio",
      ],
      correta: 3,
      explicacao: "Na turbulência forte ou num acidente, o adulto pode não conseguir segurar a criança; por isso a FAA desaconselha o colo.",
    },
    {
      topico: '9.2',
      pergunta: "O que ajuda o bebê com dor de ouvido na descida?",
      opcoes: [
        "Mamar no peito ou na mamadeira",
        "Dar antialérgico antes do voo",
        "Dar descongestionante nasal",
        "Deixar o bebê dormir na descida",
      ],
      correta: 0,
      explicacao: "Engolir abre a tuba auditiva e iguala a pressão; antialérgicos e descongestionantes não mostraram benefício e têm limites de idade.",
    },
    {
      topico: '9.2',
      pergunta: "O que a Sociedade Torácica Britânica orienta para o prematuro que ainda não chegou à data prevista do parto?",
      opcoes: [
        "Viajar sem restrição",
        "Viajar com oxigênio disponível",
        "Usar só a cadeirinha voltada para a frente",
        "Voar apenas à noite",
      ],
      correta: 1,
      explicacao: "Até um terço dos prematuros que voam perto da data prevista tem saturação abaixo de 85%, e o teste de hipóxia pode não prever a necessidade.",
    },
    {
      topico: '9.3',
      pergunta: "No voo SQ321, o que aconteceu com quem estava sem cinto quando a aceleração caiu para −1,5 G?",
      opcoes: [
        "Ficou preso ao assento",
        "Desmaiou por falta de oxigênio",
        "Foi lançado para o alto",
        "Não sentiu nada",
      ],
      correta: 2,
      explicacao: "Com G negativo, nada prende o corpo ao assento; segundos depois, com G positivo, a pessoa cai de volta com peso multiplicado.",
    },
    {
      topico: '9.3',
      pergunta: "Segundo o NTSB, onde estava a maioria dos passageiros com lesão grave por turbulência?",
      opcoes: [
        "Sentada com o cinto afivelado",
        "Na cabine de comando",
        "No porão",
        "Fora do assento ou sentada sem cinto",
      ],
      correta: 3,
      explicacao: "O cinto afivelado sempre que se está sentado transforma o salto do corpo em um aperto no colo.",
    },
    {
      topico: '9.3',
      pergunta: "Quanto cresceu a duração da turbulência de céu claro severa num ponto típico do Atlântico Norte de 1979 a 2020?",
      opcoes: [
        "55%",
        "5%",
        "Não mudou",
        "Caiu pela metade",
      ],
      correta: 0,
      explicacao: "Passou de 17,7 para 27,4 horas por ano; os autores associam o aumento ao aquecimento do clima.",
    },
    {
      topico: '9.4',
      pergunta: "Nos acidentes de empresas aéreas americanas de 1983 a 2000, que parte dos ocupantes sobreviveu?",
      opcoes: [
        "Menos de 10%",
        "Mais de 95%",
        "Cerca de metade",
        "Nenhum",
      ],
      correta: 1,
      explicacao: "Foram 51.207 sobreviventes e 2.280 mortos; por isso, o que se faz depois que o avião para importa.",
    },
    {
      topico: '9.4',
      pergunta: "O que a pesquisa da FAA mostrou sobre apoiar cabeça e mãos no encosto da frente?",
      opcoes: [
        "Protegia em qualquer tipo de assento",
        "Evitava todas as lesões das pernas",
        "Só protegia a cabeça com encosto travado e piorava o impacto com encostos que dobram ou absorvem energia",
        "Era indiferente",
      ],
      correta: 2,
      explicacao: "Por isso a orientação da FAA foi revista, e a posição correta é a do cartão de segurança de cada avião; pés o mais para trás possível reduziram lesões nas pernas.",
    },
    {
      topico: '9.4',
      pergunta: "De onde vêm as lesões mais graves numa evacuação por escorregador?",
      opcoes: [
        "Do cinto de segurança",
        "Da máscara de oxigênio",
        "Do cartão de segurança",
        "De pular da porta ou da asa",
      ],
      correta: 3,
      explicacao: "Mais de 80% das lesões por escorregador são leves; atrito, impacto no fim da descida e quedas explicam a maioria delas.",
    },
  ],
};
