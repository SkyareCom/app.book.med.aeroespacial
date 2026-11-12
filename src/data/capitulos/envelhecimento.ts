// Missão 2 · Voo 15 — Envelhecimento e limites de idade. Ramo editorial voo/M2V15; fotos e vídeo entram depois da produção.
// Gerado a partir de roteiro revisado (abertura + quatro tópicos de condição, no modelo de docs/modelo-sistemas.md).
// REGISTRO DE REVISÃO · 12/11/2026. Normas e fontes primárias conferidas:
// ICAO Anexo 1, 2.1.10.1 (via FAA, interpretação do Chief Counsel, e Federal Register 80 FR 33397, 12/06/2015): o titular
//   não atua como piloto em comando no transporte aéreo comercial internacional depois dos 60 anos em operação com um só
//   piloto; em operação com mais de um piloto, até os 65. A exigência de o outro piloto ter menos de 60 anos foi retirada
//   pela Emenda 172 (adotada em 03/03/2014, aplicável a partir de 13/11/2014). ICAO Anexo 1, 1.2.5.2.3: acima de 60 anos,
//   1ª classe em operação comercial a cada 6 meses (via CAA da Nova Zelândia, "Rules for 65+ pilots", 12/11/2026, que
//   registra a diferença neozelandesa ao 2.1.10 por causa da lei contra discriminação por idade).
// FAA: 49 U.S.C. 44729 (Fair Treatment for Experienced Pilots Act, 2007) e 14 CFR 121.383(d): limite de 65 anos na Parte
//   121; pareamento removido em 12/06/2015; a Parte 135 não tem limite doméstico (ops.group, 08/10/2025). 14 CFR 61.23(d):
//   1ª classe para comandante de linha aérea, 12 meses abaixo de 40 anos e 6 meses a partir dos 40; 2ª classe comercial,
//   12 meses; privado, 60 meses abaixo de 40 e 24 meses a partir dos 40. 14 CFR 67.111(b): ECG na 1ª classe na primeira
//   solicitação após os 35 anos e anualmente após os 40, de até 60 dias. FAA Summary of Medical Standards: visão de perto
//   20/40 a 16 polegadas em todas as classes; intermediária 20/40 a 32 polegadas a partir dos 50 anos na 1ª e na 2ª
//   classes; audição de voz de conversa a 6 pés ou audiometria (35/30/30/40 dB em 500/1.000/2.000/3.000 Hz).
// ANAC RBAC 61, Emenda 04 (19/09/2014): 61.105(d)-(e) e 61.145(c)-(d), comandante no transporte aéreo público
//   internacional até 60 anos, salvo segundo piloto com menos de 60, e nenhuma função nesse transporte após 65; 61.125(d),
//   piloto de tripulação múltipla como segundo piloto até 65. A emenda é anterior à Emenda 172 da ICAO: a exigência do
//   segundo piloto com menos de 60 anos fica [confirmar na referência] na emenda vigente. Validade do CMA (mesma emenda):
//   PLA, PC e PTM 12 meses, 6 meses na operação comercial com um só piloto levando passageiros a partir dos 40 e no
//   transporte comercial a partir dos 60; privado, 60 meses antes dos 40, 24 meses dos 40 aos 50 e 12 meses a partir dos 50.
// UK CAA, UK Part-MED requirements (12/11/2026): 1ª classe 12 meses; 6 meses a partir dos 40 em operação comercial com um
//   só piloto levando passageiros e acima dos 60; 2ª classe 60 meses abaixo de 40, 24 meses dos 40 aos 49, 12 meses a
//   partir dos 50.
// EASA, Pilots' Age Limits Study (J. Vegers, 90th AsMA, 07/05/2019): 82.435 pilotos de seis países, 2,1% temporariamente
//   inaptos; a parte cardiovascular da inaptidão sobe com a idade (8% de 20 a 40, 13% de 41 a 50, 21% de 51 a 60, 28% de
//   61 a 65 e 48% acima de 65); capacidades neuropsicológicas caem com a idade, exceto o raciocínio; risco maior acima de
//   60; recomendação de manter 65 com medidas adicionais.
// ANAC, Resolução 280/2013 (PNAE): pessoas com 60 anos ou mais; aviso de 48 h para assistência e de 72 h para acompanhante
//   ou documentos médicos (MEDIF), resposta em 48 h; embarque prioritário; acompanhante quando não entende as instruções
//   de segurança ou não usa o banheiro sozinho, com até 20% da tarifa.
// CDC Yellow Book, Travelers with Chronic Illnesses (12/11/2026): consulta 4 a 6 semanas antes; carta do médico com
//   remédios pelo nome genérico; remédios na bagagem de mão, com sobra; trombose a partir de 4 h de voo; meias de
//   compressão; oxigênio combinado com a companhia ao menos 72 h antes; FREMEC; seguro com evacuação.
// American Geriatrics Society, Health in Aging, "Safe Travel Tips for Older Adults" (jun/2019): horário dos remédios no
//   fuso combinado com o médico; lista escrita; risco de trombose maior no idoso; beber água mesmo sem sede.
//   AGS Beers Criteria 2023: evitar anti-histamínicos de primeira geração e benzodiazepínicos no idoso (confusão, quedas).
// Fisiologia do envelhecimento (Guyton & Hall; DeHart, Fundamentals of Aerospace Medicine): cristalino perde a acomodação
//   (presbiopia) a partir dos 40 e poucos anos; perda auditiva começa pelos agudos (presbiacusia); menor reserva
//   cardiopulmonar; sede menos sensível e rim que concentra menos; sono mais leve com a idade (Veja M2V8 - I).
// Condutas sem número próprio são aplicação das fontes acima.
import type { Capitulo } from '../tipos';
import { liberacaoEnvelhecimento } from '../liberacao/envelhecimento';

export const envelhecimento: Capitulo = {
  numero: 15,
  titulo: 'Envelhecimento e limites de idade',
  tempoLeituraMin: 16,
  topicos: [
    {
      id: '15.1',
      titulo: "O corpo que envelhece no voo",
      pergunta: "O que muda com a idade quando o corpo encontra a cabine, e por que a reserva é a palavra-chave?",
      conteudo: {
        texto: [
          "Envelhecer não é doença, mas tira **reserva**: o coração, o pulmão, o rim e o cérebro continuam funcionando bem em repouso, porém sobra menos margem quando o ambiente aperta. A cabine aperta de vários jeitos ao mesmo tempo: menos oxigênio, ar seco, horas sentado, fuso horário e sono interrompido. Para a pessoa de 30 anos, cada fator é pequeno; para a de 70, eles se somam e aparecem como cansaço, tontura ou confusão.",
          "Com **menos oxigênio** a 8.000 ft, o pulmão e o coração mais velhos compensam com menos folga, sobretudo quando já existe doença do coração ou do pulmão (Veja M2V1 e M2V2). Com o **ar seco**, a sede fica menos sensível com a idade e o rim concentra menos a urina: a desidratação chega antes e sem aviso (Veja M2V14 - I). Com as **horas sentado**, o risco de trombose é maior que o da média, e a bexiga e a próstata pedem banheiro com mais frequência.",
          "Os **sentidos** mudam devagar. A partir dos 40 e poucos anos, o cristalino perde a capacidade de focar perto, a **presbiopia**, e a visão noturna fica mais lenta (Veja M2V4). A audição começa a perder os **agudos**, a **presbiacusia**, e o ruído da cabine esconde as consoantes das conversas e dos avisos (Veja M2V3 - IV). O **sono** fica mais leve, e o corpo se ajusta ao fuso com mais dificuldade (Veja M2V8). Os **ossos** e os músculos perdem massa, e uma queda na turbulência ou na escada do avião machuca mais.",
          "Com a idade também aumentam os **remédios**. Cada um pode ser seguro sozinho, mas juntos somam sono, tontura ao levantar e confusão, e o **antialérgico** antigo e o **calmante** usados para dormir no voo são os mais lembrados entre os que o idoso deve evitar. A combinação de remédios, desidratação e pouco oxigênio explica muitos desmaios e quedas a bordo. Por isso a lista de remédios vai sempre junto na bagagem de mão (Veja M2V15 - V).",
          "Para o **tripulante**, a idade muda o calendário dos exames e, no transporte comercial internacional, o limite para voar. Num estudo europeu com mais de **82 mil** pilotos, a parte da inaptidão causada pelo **coração** subiu de **8%** entre 20 e 40 anos para **28%** entre 61 e 65 e **48%** acima de 65. As capacidades de atenção e de velocidade caíram com a idade, mas o **raciocínio** se manteve, e a experiência compensa muito do resto (Veja M2V15 - III e IV).",
          "O que pode acontecer a bordo, quando a reserva acaba: **desmaio** ao levantar depois de horas sentado, **queda** no corredor, **confusão** à noite num lugar desconhecido, falta de ar em quem já tem doença do coração e **trombose** nas pernas depois de um voo longo. Quase tudo isso se previne com preparo, água, movimento e remédios certos, e é por isso que a idade, sozinha, não impede ninguém de voar como passageiro.",
          "**Como prevenir e amenizar.** Antes do voo, faça uma consulta **4 a 6 semanas** antes de viagens longas, leve a **lista de remédios** e a carta do médico e peça **assistência** à companhia se precisar. Durante, beba **água mesmo sem sede**, levante devagar, sentando um pouco antes de ficar de pé, caminhe e mexa as panturrilhas, use **óculos** de perto à mão e evite remédios para dormir que dão confusão. Depois, dê ao corpo um ou dois dias a mais para se ajustar ao fuso.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 2,
            tabela: {
              titulo: "O que muda em altitude · o corpo que envelhece",
              colunas: ["Fator do voo", "O que acontece no organismo", "Quem é mais vulnerável"],
              linhas: [
                ["Menos oxigênio (8.000 ft)", "Pulmão e coração compensam com menos folga", "Idoso com doença do coração ou do pulmão: a reserva já está gasta em repouso e a queda de oxigênio pesa logo (Veja M2V1 e M2V2)"],
                ["Ar seco", "Desidratação silenciosa", "Idoso: a sede fica menos sensível e o rim concentra menos a urina, e a água falta antes do aviso (Veja M2V14 - I)"],
                ["Horas sentado", "Sangue parado nas pernas e pressão que cai ao levantar", "Idoso com vários remédios de pressão: o reflexo que segura a pressão em pé fica lento, e vêm tontura e desmaio"],
                ["Ruído e pouca luz", "Avisos e letras pequenas difíceis de entender", "Quem tem presbiopia e presbiacusia: o cristalino não foca perto e os agudos somem no ruído (Veja M2V15 - II)"],
                ["Fuso e sono interrompido", "Sono mais leve, ajuste mais lento e confusão à noite", "Idoso com remédio para dormir: o sono já é leve e o calmante soma confusão e quedas (Veja M2V8)"],
              ],
            },
          },
          { paragrafo: 3, midia: 'idade-voo' },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Quem envelhece e voa · o que pode acontecer a bordo",
              colunas: ["Evento", "Por que acontece", "Como evitar"],
              linhas: [
                ["Desmaio ao levantar", "Sangue parado nas pernas e reflexo de pressão lento", "Sentar um pouco antes de ficar de pé e beber água"],
                ["Queda no corredor", "Músculo mais fraco, turbulência e remédio que dá sono", "Cinto afivelado sentado e apoio nos encostos ao andar"],
                ["Confusão à noite", "Sono interrompido, lugar desconhecido, calmante e desidratação", "Evitar calmante e antialérgico antigo; acompanhante se houver demência"],
                ["Trombose nas pernas", "Risco maior no idoso, a partir de 4 h de voo", "Caminhar, mexer as panturrilhas e meia de compressão se indicada"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · o corpo que envelhece",
              colunas: ["Momento", "Passageiro", "Tripulante"],
              linhas: [
                ["Antes do voo", "Consulta 4 a 6 semanas antes, lista de remédios e assistência pedida: o preparo repõe a reserva que falta", "Exames e certificado em dia para a idade: o calendário muda aos 40 e aos 60"],
                ["Durante o voo", "Água sem esperar a sede, levantar devagar, caminhar e óculos à mão", "Óculos de perto de reserva e água à vista: a presbiopia e a desidratação chegam sem aviso"],
                ["Depois do voo", "Um ou dois dias a mais para o fuso, sem calmante", "Proteger o sono no pernoite: o sono leve rende menos"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '15.2',
      titulo: "Visão, audição e atenção com a idade",
      pergunta: "Por que o piloto de 50 anos precisa ler o painel a outra distância, e o que a idade faz com a audição e a atenção?",
      conteudo: {
        texto: [
          "O **cristalino** é uma lente elástica que muda de forma para focar perto. Com os anos, ele endurece e perde essa **acomodação**: é a **presbiopia**, a vista cansada, que costuma aparecer a partir dos 40 e poucos anos. Primeiro a letra pequena falha com pouca luz; depois, também de dia. Na cabine de comando, a distância que mais importa não é só a do papel na mão, mas a do **painel**, cerca de um braço à frente.",
          "A idade traz outras mudanças lentas. O cristalino fica mais opaco, a **catarata**, e espalha a luz: os faróis à noite ofuscam mais e o contraste cai (Veja M2V4 - VII). A audição perde primeiro os **agudos**, a **presbiacusia**, justamente onde ficam as consoantes que separam uma palavra da outra no rádio (Veja M2V3 - IV). A **velocidade** de processamento e a atenção dividida caem um pouco, enquanto o **raciocínio** e a experiência se mantêm e muitas vezes compensam.",
          "O tratamento segue três caminhos. O **expectante** acompanha a visão e a audição nos exames periódicos, com o grau revisto quando muda. O **não invasivo** usa **óculos** de perto, multifocais ou lentes de contato, e o **aparelho auditivo**. O **invasivo** é a **cirurgia de catarata**, que troca o cristalino por uma lente artificial e tem prazo próprio para voltar a voar (Veja M2V4 - VIII). O prognóstico é muito bom: corrigida, a presbiopia não tira ninguém do voo.",
          "**Quando pode voar.** O **passageiro** com presbiopia ou perda auditiva voa sem restrição: leva os óculos e o aparelho, e pede à tripulação que repita os avisos, se precisar. Para o **tripulante**, a FAA exige visão de perto **20/40** a **16 polegadas**, cerca de 40 cm, em todas as classes e, a partir dos **50 anos**, também visão intermediária **20/40** a **32 polegadas**, cerca de 80 cm, a distância do painel, na 1ª e na 2ª classes, com ou sem óculos. A audição precisa entender uma **voz de conversa a 6 pés**, cerca de 2 m, ou passar na audiometria.",
          "**Voar sem liberação** ou sem os óculos certos cobra caro: ler errado um número no painel, perder um dígito da frequência no rádio ou não ver um tráfego no escuro são erros silenciosos, que não doem e por isso passam despercebidos. Quando o certificado exige lentes corretivas, voar sem elas é voar fora da condição do certificado, com risco para o **seguro** e na **investigação** de um incidente.",
          "**Remédios e voo.** Com a idade, os remédios que mais atrapalham a atenção são os **antialérgicos antigos**, os **calmantes** e os remédios para dormir, que no idoso aumentam a confusão e as quedas; para o tripulante, os que dão sono são **Do Not Fly** na FAA, com espera de **5 meias-vidas**. Os colírios de glaucoma e o aparelho auditivo são compatíveis com o voo quando estáveis (Veja M2V4 - VII). Remédio novo para memória ou atenção é avaliado pelo examinador antes de voar.",
          "**Como prevenir e amenizar.** Revise o grau dos óculos quando a leitura começar a falhar, sem esperar o exame. O tripulante leva sempre um **par de reserva** e testa a leitura do painel e das cartas com a luz da noite; o aparelho auditivo vai com pilhas extras. No voo, aumente a luz de leitura, peça para repetir o que não entendeu e confirme frequências e números com o colega. Durma bem antes de voar: a atenção cansada é a primeira a falhar com a idade.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, midia: 'animacao-cristalino' },
          {
            paragrafo: 3,
            tabela: {
              titulo: "Visão e audição com a idade · tratamento e prognóstico",
              colunas: ["Tratamento", "Quando se usa", "O que muda no voo"],
              linhas: [
                ["Expectante", "Mudança leve acompanhada nos exames periódicos", "Voo livre; grau revisto quando a leitura falha"],
                ["Não invasivo: óculos, lentes e aparelho auditivo", "Presbiopia e perda dos agudos", "Tripulante com par de reserva e pilhas extras; certificado pode exigir a correção"],
                ["Invasivo: cirurgia de catarata", "Cristalino opaco que ofusca e tira o contraste", "Volta com prazo próprio e avaliação (Veja M2V4 - VIII)"],
              ],
            },
          },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Liberação para voo · visão e audição com a idade",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Presbiopia corrigida com óculos", "Pode voar com os óculos à mão: avisos e cartões ficam legíveis", "FAA: perto 20/40 a 40 cm em todas as classes; a partir dos 50, também 20/40 a 80 cm na 1ª e 2ª classes"],
                ["Perda auditiva dos agudos", "Pode voar com o aparelho; pedir que repitam os avisos", "FAA: voz de conversa a 2 m ou audiometria; aparelho pode ser aceito com avaliação"],
                ["Catarata que ofusca à noite", "Pode voar; evitar dirigir à noite no destino", "Avaliação oftalmológica antes do voo noturno: o ofuscamento tira o contraste"],
                ["Esquecimento ou confusão novos", "Avaliar com o médico antes da viagem; acompanhante se houver demência", "Não voar até a avaliação: a atenção é a ferramenta do piloto (Veja M2V6 - VII)"],
              ],
            },
          },
          { paragrafo: 5, midia: 'visao-idade' },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · visão, audição e atenção",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Antialérgicos antigos (difenidramina, prometazina)", "Sono, confusão e boca seca; no idoso, quedas", "FAA Do Not Fly: 5 meias-vidas após a última dose"],
                ["Calmantes e remédios para dormir", "Atenção lenta no dia seguinte; no idoso, confusão e quedas", "FAA Do Not Fly; uso regular leva à avaliação (Veja M2V8 - VII)"],
                ["Colírios de glaucoma", "Controlam a pressão do olho; alguns escurecem a visão", "Aceitos com controle estável e avaliação (Veja M2V4 - VII)"],
                ["Remédios para memória ou atenção", "Indicam doença que pesa na atenção", "Avaliação do examinador antes de voar (Veja M2V6 - VII)"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · visão, audição e atenção",
              colunas: ["Momento", "Passageiro", "Tripulante"],
              linhas: [
                ["Antes do voo", "Óculos com o grau em dia e aparelho com pilhas: avisos e cartões precisam ser lidos e ouvidos", "Par de reserva e teste de leitura do painel com luz de noite: a presbiopia piora com pouca luz"],
                ["Durante o voo", "Luz de leitura acesa e pedir para repetir: o ruído esconde os agudos", "Confirmar números e frequências com o colega: o erro de leitura é silencioso"],
                ["Remédios", "Evitar antialérgico antigo e calmante para dormir no voo: somam confusão e quedas", "Nada que dê sono antes ou durante a jornada"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '15.3',
      titulo: "Coração, exames e validade do certificado",
      pergunta: "Por que o certificado médico do piloto vale menos tempo depois dos 40 e dos 60, e o que o eletrocardiograma procura?",
      conteudo: {
        texto: [
          "O risco que mais cresce com a idade é o do **coração**: placas nas artérias, pressão alta, arritmias e insuficiência cardíaca aparecem mais tarde na vida e podem causar **incapacitação súbita**, como um infarto ou um desmaio no comando (Veja M2V2). No estudo europeu de pilotos, o coração respondeu por **8%** das inaptidões entre 20 e 40 anos, **13%** entre 41 e 50, **21%** entre 51 e 60, **28%** entre 61 e 65 e **48%** acima de 65. É por isso que o calendário dos exames aperta com a idade.",
          "O **eletrocardiograma** registra a eletricidade do coração e procura sinais de **infarto antigo**, arritmia e sobrecarga das câmaras, muitas vezes antes de qualquer sintoma. Na FAA, o candidato à 1ª classe faz o ECG na **primeira solicitação depois dos 35 anos** e **todo ano depois dos 40**, com exame de até **60 dias**. Pressão, colesterol, açúcar, peso e cigarro completam o cálculo do risco, e um ECG alterado leva a exames como o teste de esforço (Veja M2V2 - III).",
          "A **validade do certificado** encurta com a idade. Na FAA, a 1ª classe do comandante de linha aérea vale **12 meses** abaixo de 40 anos e **6 meses** a partir dos 40; para voo privado, **60 meses** abaixo de 40 e **24 meses** a partir dos 40. Na Europa, a 1ª classe vale 12 meses e cai para **6 meses** acima dos **60** e, a partir dos 40, para quem voa sozinho levando passageiros; a 2ª classe vale 60 meses abaixo de 40, 24 meses dos 40 aos 49 e **12 meses** a partir dos 50. A ICAO também pede revalidação a cada 6 meses acima dos 60 no transporte comercial.",
          "No Brasil, o **CMA** do piloto de linha aérea, do comercial e do de tripulação múltipla vale **12 meses** e cai para **6 meses** a partir dos **40** em operação comercial com um só piloto levando passageiros e a partir dos **60** no transporte comercial. Para o piloto privado, vale **60 meses** antes dos 40, **24 meses** dos 40 aos 50 e **12 meses** a partir dos 50. O **passageiro** não tem exame obrigatório: quem tem doença do coração conversa com o cardiologista antes da viagem e, se precisar, usa o **MEDIF** (Veja M2V2).",
          "**Voar sem liberação**, com o certificado vencido ou escondendo um sintoma do coração, é voar sem certificado válido: o piloto responde à autoridade, perde a cobertura do **seguro** e, num acidente, a **investigação** encontra o exame atrasado. Para o corpo, o risco é o evento que o exame poderia ter achado antes: um infarto ou uma arritmia no comando, longe do hospital.",
          "**Remédios e voo.** Com a idade, entram os remédios de **pressão**, **colesterol** e prevenção do coração. A maioria é aceita para o tripulante, desde que sem efeitos colaterais e conforme as listas da autoridade: a FAA aceita boa parte dos anti-hipertensivos e das estatinas, com relato no exame (Veja M2V2 - II). O cuidado é com o remédio que dá **tontura ao levantar** ou queda de pressão, que começa fora da escala, e com a soma de vários remédios, revista pelo médico a cada exame.",
          "**Como prevenir e amenizar.** Cuide dos fatores que o exame mede: **pressão**, colesterol, açúcar, peso, cigarro e atividade física, com controle desde cedo. Anote a data de vencimento do certificado e marque o exame com folga, levando ECG, exames de sangue e relatórios dentro do prazo pedido. Dor no peito, falta de ar ao esforço, palpitação ou desmaio são motivo para **não voar** e procurar o médico antes do próximo voo, sem esperar o exame.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 2,
            tabela: {
              titulo: "Coração com a idade · tratamento e prognóstico",
              colunas: ["Tratamento", "Quando se usa", "O que muda no voo"],
              linhas: [
                ["Expectante: rastreio periódico", "Sem doença, com fatores de risco acompanhados", "Exames no calendário da idade; voo livre"],
                ["Não invasivo: remédios e hábitos", "Pressão alta, colesterol, açúcar e peso", "Remédio aceito, sem efeitos, começado fora da escala"],
                ["Invasivo: stent, cirurgia e marca-passo", "Doença das coronárias, das válvulas ou do ritmo", "Prazos e decisão da autoridade (Veja M2V2 - III e IV)"],
              ],
            },
          },
          { paragrafo: 3, midia: 'validade-cma' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Liberação para voo · validade do certificado por idade",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Menos de 40 anos", "Sem exame obrigatório: o risco do coração ainda é baixo", "FAA, Europa e ANAC: 1ª classe de 12 meses; privado, 60 meses"],
                ["De 40 a 59 anos", "Consulta antes de viagens longas se houver doença do coração", "FAA: comandante de linha aérea, 6 meses, e ECG anual; Europa e ANAC: 6 meses com um só piloto e passageiros; privado, 24 meses"],
                ["50 anos ou mais (privado)", "Sem exame obrigatório", "Europa: 2ª classe de 12 meses; ANAC: privado, 12 meses; FAA: visão intermediária exigida"],
                ["60 anos ou mais", "Pode voar; consulta 4 a 6 semanas antes de viagens longas", "ICAO, Europa e ANAC: 6 meses no transporte comercial; o risco do coração sobe"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · coração e idade",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Anti-hipertensivos", "Controlam a pressão; alguns dão tontura ao levantar", "Aceitos conforme a lista da autoridade, sem efeitos (Veja M2V2 - II)"],
                ["Estatinas", "Baixam o colesterol; dor muscular rara", "Aceitas com relato no exame"],
                ["Antiagregantes e anticoagulantes", "Previnem coágulo; sangramento se houver trauma", "Regras próprias (Veja M2V11 - II)"],
                ["Vários remédios ao mesmo tempo", "Somam tontura, sono e queda de pressão", "Lista completa revista pelo examinador a cada exame"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · coração e exames",
              colunas: ["Momento", "Passageiro", "Tripulante"],
              linhas: [
                ["Todo dia", "Pressão, colesterol, açúcar, peso e cigarro sob controle: o coração envelhece mais devagar", "Mesmos fatores, com atividade física regular: são os números que o examinador mede"],
                ["Antes do exame", "Não se aplica", "Data de vencimento anotada, ECG e exames no prazo pedido"],
                ["Sinal de alerta", "Dor no peito, falta de ar ou desmaio: procurar o médico antes da viagem", "Mesmos sinais: não voar e avisar o examinador"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '15.4',
      titulo: "Limites de idade do piloto",
      pergunta: "Até que idade o piloto pode voar no transporte comercial, e por que a regra muda com o número de pilotos na cabine?",
      conteudo: {
        texto: [
          "O limite de idade existe por um motivo: o risco de **incapacitação súbita** cresce com os anos, sobretudo pelo coração, e ninguém consegue prever exatamente quem vai passar mal. Com **dois pilotos**, se um passa mal, o outro assume; com **um só**, não há quem assuma. Por isso a ICAO separa as duas situações: no **transporte aéreo comercial internacional**, o piloto voa sozinho até os **60 anos** e, em tripulação com mais de um piloto, até os **65**.",
          "Até 2014, a ICAO exigia que o piloto de 60 a 65 anos voasse com um colega **abaixo dos 60**. A Emenda 172 do Anexo 1, aplicável desde **13 de novembro de 2014**, retirou essa exigência, e a FAA tirou a regra do **pareamento** em 2015. Nos Estados Unidos, o limite de **65 anos** vale para o piloto de linha aérea; na aviação executiva e de táxi aéreo doméstica, a FAA não fixa idade máxima. Alguns países, como a **Nova Zelândia**, registraram diferença à regra da ICAO e decidem pela aptidão, não pela idade.",
          "No **Brasil**, o RBAC 61 traz os limites para o **transporte aéreo público internacional**: o piloto em comando até os **60 anos**, salvo com segundo piloto mais jovem, e nenhuma função nesse transporte depois dos **65**. O texto que exige o segundo piloto abaixo dos 60 é anterior à mudança da ICAO e deve ser conferido na emenda em vigor [confirmar na referência]. Na Europa, as regras seguem a ICAO, e um estudo europeu de 2019 recomendou manter os 65 anos com **medidas adicionais** de saúde.",
          "**Quando pode voar.** Abaixo dos 60 anos, a idade não limita o voo comercial; o que vale é o certificado médico. Dos **60 aos 65**, o piloto segue no transporte comercial internacional **só em tripulação com mais de um piloto**, com o certificado renovado a cada **6 meses**. Depois dos **65**, ele deixa o transporte comercial internacional, mas pode seguir voando onde a regra do país permitir: aviação privada, instrução, aviação geral e, em alguns países, operações domésticas. O **passageiro** não tem limite de idade.",
          "**Voar fora do limite** é voar sem licença válida para aquela operação: o operador perde a autorização, o seguro não cobre e o país sobrevoado pode recusar o voo. Um piloto acima dos 65 só entra no espaço aéreo de outro país se esse país **aceitar**; a permissão não pode ser presumida. A idade não é culpa de ninguém, mas esconder um sintoma para continuar voando é: o certificado depende de informar ao examinador qualquer mudança de saúde.",
          "**Remédios e voo.** A idade não muda a lista dos remédios aceitos, mas aumenta o número deles: pressão, colesterol, próstata, sono e dor somam efeitos, e o que era seguro sozinho pode dar tontura em conjunto. Cada remédio novo começa **fora da escala**, com o prazo da autoridade (Veja M2V14 - IV e M2V8 - VII), e a lista completa vai a cada exame. Remédio que dá sono continua **Do Not Fly**, com espera de **5 meias-vidas**, em qualquer idade.",
          "**Como prevenir e amenizar.** Planeje a carreira com o calendário na mão: aos **60**, o certificado passa a 6 meses e o voo com um só piloto no transporte comercial termina; aos **65**, termina o transporte comercial internacional. Mantenha a saúde do coração, a visão e a audição em dia para chegar lá apto. Antes de voar para outro país depois dos 65, confira se ele aceita pilotos dessa idade. A experiência continua valendo na instrução, na segurança de voo e na aviação geral.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 2,
            tabela: {
              titulo: "Limites de idade · ICAO, FAA, Europa e Brasil",
              colunas: ["Autoridade", "Regra", "Por quê"],
              linhas: [
                ["ICAO (Anexo 1, 2.1.10)", "Transporte comercial internacional: até 60 com um só piloto e até 65 com mais de um", "Com dois pilotos, um assume se o outro passa mal"],
                ["FAA", "Linha aérea até 65; sem pareamento desde 2015; sem limite doméstico na aviação executiva e no táxi aéreo", "Lei de 2007 elevou o limite de 60 para 65 anos, seguindo a ICAO"],
                ["Europa", "Segue a ICAO; estudo de 2019 recomendou manter 65 com medidas de saúde", "O risco do coração sobe acima dos 60"],
                ["ANAC (RBAC 61)", "Transporte aéreo público internacional: comandante até 60, salvo segundo piloto mais jovem; nenhuma função após 65", "Texto anterior à Emenda 172 da ICAO: conferir a emenda vigente"],
                ["Nova Zelândia", "Diferença registrada: decide pela aptidão, não pela idade", "Lei contra discriminação por idade; outros países precisam aceitar o piloto acima de 65"],
              ],
            },
          },
          { paragrafo: 3, midia: 'limite-idade' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Liberação para voo · idade e tipo de operação",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Abaixo de 60 anos", "Sem limite de idade", "Voo comercial com certificado em dia: a idade ainda não limita"],
                ["60 a 64, um só piloto, transporte comercial internacional", "Sem limite de idade", "Não voar: sem colega para assumir se passar mal"],
                ["60 a 64, mais de um piloto", "Sem limite de idade", "Pode voar com certificado de 6 meses; no Brasil, conferir a emenda vigente"],
                ["65 anos ou mais", "Sem limite de idade; preparo e assistência se precisar", "Fora do transporte comercial internacional; voo privado e geral conforme o país"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · idade e muitos remédios",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Remédio novo de uso contínuo", "Efeitos aparecem nas primeiras semanas", "Começar fora da escala, com o prazo da autoridade"],
                ["Vários remédios juntos", "Somam tontura, sono e queda de pressão", "Lista completa a cada exame"],
                ["Remédio que dá sono", "Atenção lenta, que não melhora com a experiência", "FAA Do Not Fly: 5 meias-vidas, em qualquer idade"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · limites de idade",
              colunas: ["Momento", "O que fazer", "Por quê"],
              linhas: [
                ["Aos 40", "Cuidar da pressão, do colesterol e do peso", "O coração dos 60 começa a ser cuidado aos 40"],
                ["Aos 60", "Certificado a cada 6 meses e só tripulação com mais de um piloto no comercial internacional", "O risco de incapacitação sobe e o colega é a proteção"],
                ["Aos 65", "Deixar o transporte comercial internacional e conferir a regra de cada país", "Outro país só aceita o piloto acima de 65 se quiser"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '15.5',
      titulo: "O passageiro idoso",
      pergunta: "Que direitos e cuidados tem o passageiro de 60 anos ou mais, e como evitar a queda, a trombose e a confusão a bordo?",
      conteudo: {
        texto: [
          "Não existe idade máxima para ser **passageiro**: o que decide o voo é a saúde, não o ano de nascimento. No Brasil, a pessoa com **60 anos ou mais** é **passageiro com necessidade de assistência especial** (PNAE) e tem direito a **embarque prioritário**, ajuda no embarque e no desembarque, cadeira de rodas e acompanhamento pelo aeroporto. A assistência é pedida na compra da passagem ou com pelo menos **48 horas** de antecedência.",
          "Quando é preciso **acompanhante** ou **documento médico**, o aviso é de pelo menos **72 horas**. A companhia pode pedir o **MEDIF** de quem precisa de oxigênio, maca ou tem uma condição que pode exigir ajuda médica a bordo, e responde em 48 horas. O acompanhante é exigido de quem não consegue entender as instruções de segurança ou usar o banheiro sozinho; a companhia oferece um ou cobra até **20%** da tarifa pelo acompanhante escolhido pelo passageiro. O **oxigênio** a bordo é combinado com a companhia pelo menos **72 horas** antes.",
          "A bordo, os riscos do idoso são três. A **trombose**: o risco é maior que a média e cresce a partir de **4 horas** de voo (Veja M2V2 - VII). A **queda**: músculo mais fraco, pressão que cai ao levantar, turbulência e remédio que dá sono. A **confusão**: sono interrompido, lugar desconhecido, desidratação e calmante, sobretudo em quem já tem esquecimento ou demência (Veja M2V6 - VII). Os três se previnem com preparo, água, movimento e os remédios certos.",
          "**Quando pode voar.** O idoso com doenças estáveis voa normalmente, depois de uma consulta **4 a 6 semanas** antes de viagens longas e com uma **carta do médico** que liste as doenças, os remédios pelo nome genérico, as alergias e os equipamentos. Doença instável, como falta de ar em repouso, dor no peito recente ou confusão nova, pede avaliação antes de comprar a passagem. Quem voa com frequência e tem condição estável pode pedir o **FREMEC**, o cartão médico do passageiro frequente.",
          "**Voar sem preparo** cobra caro na idade: a queda no corredor pode quebrar o quadril, a trombose pode virar embolia dias depois e a confusão à noite pode virar um desvio. Viajar sem avisar a companhia sobre oxigênio ou acompanhante pode levar à **recusa de embarque**, e o seguro-viagem pode não cobrir doença já existente não declarada. Um **seguro** com assistência 24 horas e evacuação médica é o que mais protege quem viaja para longe.",
          "**Remédios e voo.** Todos os remédios vão na **bagagem de mão**, nas embalagens originais, com sobra para atrasos e uma **lista escrita**, com uma cópia também na mala. O horário no fuso é combinado com o médico (Veja M2V8 - IV). No idoso, os **antialérgicos antigos** e os **calmantes** usados para dormir no voo estão entre os remédios a evitar, porque aumentam a confusão e as quedas. A **meia de compressão** ajuda a prevenir a trombose em voos longos, com orientação do médico.",
          "**Como prevenir e amenizar.** Antes, peça a **assistência** na compra da passagem, prefira voos diretos e o lugar no **corredor**, perto do banheiro, e leve a carta do médico. Durante, beba **água mesmo sem sede**, caminhe e mexa as panturrilhas, levante devagar e segure nos encostos, mantenha o cinto afivelado sentado e não tome remédio para dormir que não seja o de costume. Depois, descanse e dê um dia a mais para o fuso. Quem tem esquecimento viaja com acompanhante e com o nome e o endereço anotados.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 2,
            tabela: {
              titulo: "Passageiro idoso · direitos no Brasil (ANAC, Resolução 280)",
              colunas: ["Situação", "Prazo", "O que a companhia faz"],
              linhas: [
                ["Assistência (cadeira de rodas, ajuda no embarque)", "Na compra ou 48 h antes", "Embarque prioritário e ajuda do check-in à poltrona"],
                ["Acompanhante", "72 h antes", "Oferece um ou cobra até 20% da tarifa pelo escolhido"],
                ["Documento médico (MEDIF)", "72 h antes; resposta em 48 h", "Avalia oxigênio, maca e risco de precisar de ajuda médica a bordo"],
                ["Oxigênio a bordo", "Pelo menos 72 h antes", "Confirma se oferece oxigênio e quais concentradores aceita"],
              ],
            },
          },
          { paragrafo: 3, midia: 'passageiro-idoso' },
          {
            paragrafo: 4,
            tabela: {
              titulo: "Liberação para voo · passageiro idoso",
              colunas: ["Situação", "Passageiro", "Tripulante"],
              linhas: [
                ["Doenças estáveis, viagem longa", "Pode voar com consulta 4 a 6 semanas antes e carta do médico", "Certificado e exames da idade em dia (Veja M2V15 - III)"],
                ["Precisa de cadeira de rodas ou ajuda", "Pode voar com a assistência pedida 48 h antes", "Avaliar a função: sair rápido do assento é exigência do voo"],
                ["Precisa de oxigênio", "Avaliar com o médico e o MEDIF 72 h antes", "Não voar: necessidade de oxigênio exige avaliação da autoridade"],
                ["Esquecimento, demência ou confusão nova", "Viajar com acompanhante; confusão nova pede avaliação antes", "Não voar até a avaliação (Veja M2V6 - VII)"],
                ["Falta de ar em repouso ou dor no peito recente", "Não voar antes da avaliação: a reserva já acabou no solo", "Não voar e avisar o examinador"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · passageiro idoso",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Remédios de uso contínuo", "Falta no destino se a mala atrasar", "Bagagem de mão, embalagem original e lista escrita"],
                ["Antialérgicos antigos e calmantes", "Confusão e quedas no idoso", "Evitar para dormir no voo; FAA Do Not Fly para o tripulante"],
                ["Remédios de pressão e diuréticos", "Tontura ao levantar e mais idas ao banheiro", "Horário no fuso combinado com o médico"],
                ["Meia de compressão", "Reduz o risco de trombose em voos longos", "Sem restrição"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · passageiro idoso",
              colunas: ["Momento", "O que fazer", "Por quê"],
              linhas: [
                ["Antes do voo", "Assistência pedida, voo direto, corredor perto do banheiro e carta do médico", "Menos trocas de avião e menos caminhada reduzem quedas e cansaço"],
                ["Durante o voo", "Água sem esperar a sede, caminhar, levantar devagar e cinto afivelado sentado", "A sede avisa tarde, e a pressão demora a se ajustar ao levantar"],
                ["Remédios", "Bagagem de mão, lista escrita e nada novo para dormir", "Calmante e antialérgico antigo somam confusão e quedas"],
                ["Depois do voo", "Descansar e dar um dia a mais para o fuso", "O sono mais leve demora mais a se ajustar"],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "O que acontece", "Proteção e prevenção"],
              linhas: [
                ["Coração e circulação", "Incapacitação súbita e trombose; as artérias endurecem e o risco cardiovascular sobe com a idade", "Pressão, colesterol e açúcar sob controle, ECG no calendário e movimento no voo"],
                ["Olhos e ouvidos", "Presbiopia, catarata e perda dos agudos; o cristalino endurece e as células do ouvido para sons agudos se perdem", "Óculos com par de reserva, aparelho auditivo e confirmar números com o colega"],
                ["Cérebro e sono", "Atenção mais lenta, sono leve e confusão; a velocidade de processamento cai e o relógio biológico se ajusta mais devagar", "Dormir bem, evitar calmantes e dar um dia a mais para o fuso"],
                ["Ossos e músculos", "Quedas e fraturas; o osso perde massa e o músculo perde força com a idade", "Exercício com carga, cinto afivelado e apoio ao andar no corredor"],
                ["Rins e água do corpo", "Desidratação silenciosa; a sede fica menos sensível e o rim concentra menos a urina", "Beber água mesmo sem sede (Veja M2V14 - I)"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '15.1',
      pergunta: "Por que o idoso se desidrata mais cedo no voo?",
      opcoes: [
        "Porque a cabine é mais quente para os idosos",
        "Porque a sede fica menos sensível e o rim concentra menos a urina",
        "Porque o idoso respira menos",
        "Porque a altitude aumenta a urina",
      ],
      correta: 1,
      explicacao: "Com a idade, o alarme da sede e a capacidade do rim de guardar água diminuem: a água falta antes do aviso, e por isso se bebe mesmo sem sede.",
    },
    {
      topico: '15.1',
      pergunta: "No estudo europeu de pilotos, como mudou com a idade a parte da inaptidão causada pelo coração?",
      opcoes: [
        "Caiu com a idade",
        "Ficou igual",
        "Subiu de 8% entre 20 e 40 anos para 48% acima de 65",
        "Só apareceu acima de 70",
      ],
      correta: 2,
      explicacao: "O coração é o risco que mais cresce com a idade, e é por isso que o ECG e a validade do certificado mudam aos 35, 40 e 60 anos.",
    },
    {
      topico: '15.2',
      pergunta: "O que é a presbiopia?",
      opcoes: [
        "Perda de visão de cores",
        "O cristalino endurece e perde a capacidade de focar perto",
        "Uma infecção da córnea",
        "O aumento da pressão do olho",
      ],
      correta: 1,
      explicacao: "A presbiopia costuma aparecer a partir dos 40 e poucos anos e se corrige com óculos de perto ou multifocais.",
    },
    {
      topico: '15.2',
      pergunta: "A partir de que idade a FAA passa a exigir visão intermediária, a cerca de 80 cm, na 1ª e na 2ª classes?",
      opcoes: [
        "40 anos",
        "50 anos",
        "60 anos",
        "65 anos",
      ],
      correta: 1,
      explicacao: "A partir dos 50 anos, a 1ª e a 2ª classes exigem 20/40 a 32 polegadas, a distância do painel; a visão de perto, a 16 polegadas, vale para todas as idades.",
    },
    {
      topico: '15.2',
      pergunta: "Por que a perda auditiva da idade atrapalha o rádio?",
      opcoes: [
        "Porque começa pelos agudos, onde ficam as consoantes",
        "Porque começa pelos graves",
        "Porque o rádio fica mais alto",
        "Porque afeta só um ouvido",
      ],
      correta: 0,
      explicacao: "A presbiacusia tira primeiro os sons agudos; sem as consoantes, palavras e números parecidos se confundem no ruído.",
    },
    {
      topico: '15.3',
      pergunta: "Na FAA, quando o candidato à 1ª classe faz o eletrocardiograma?",
      opcoes: [
        "Só quando tem sintomas",
        "A cada 5 anos desde os 20",
        "Na primeira solicitação depois dos 35 e todo ano depois dos 40",
        "Só depois dos 60",
      ],
      correta: 2,
      explicacao: "O ECG procura infarto antigo, arritmia e sobrecarga, muitas vezes antes de qualquer sintoma.",
    },
    {
      topico: '15.3',
      pergunta: "Na FAA, quanto vale a 1ª classe do comandante de linha aérea a partir dos 40 anos?",
      opcoes: [
        "6 meses",
        "12 meses",
        "24 meses",
        "60 meses",
      ],
      correta: 0,
      explicacao: "Abaixo dos 40 vale 12 meses; a partir dos 40, 6 meses, porque o risco do coração sobe.",
    },
    {
      topico: '15.3',
      pergunta: "Na Europa, quanto vale a 2ª classe a partir dos 50 anos?",
      opcoes: [
        "60 meses",
        "24 meses",
        "12 meses",
        "6 meses",
      ],
      correta: 2,
      explicacao: "A 2ª classe vale 60 meses abaixo de 40, 24 meses dos 40 aos 49 e 12 meses a partir dos 50.",
    },
    {
      topico: '15.4',
      pergunta: "Pela ICAO, até que idade o piloto pode voar no transporte comercial internacional em tripulação com mais de um piloto?",
      opcoes: [
        "60 anos",
        "65 anos",
        "70 anos",
        "Sem limite",
      ],
      correta: 1,
      explicacao: "Com mais de um piloto, até os 65; com um só, até os 60, porque não há colega para assumir se o piloto passar mal.",
    },
    {
      topico: '15.4',
      pergunta: "O que a Emenda 172 do Anexo 1, aplicável desde novembro de 2014, mudou?",
      opcoes: [
        "Elevou o limite para 70 anos",
        "Retirou a exigência de o outro piloto ter menos de 60 anos",
        "Proibiu pilotos acima de 60",
        "Criou limite para passageiros",
      ],
      correta: 1,
      explicacao: "Antes, o piloto de 60 a 65 anos voava com um colega abaixo dos 60; a FAA retirou o pareamento em 2015.",
    },
    {
      topico: '15.5',
      pergunta: "No Brasil, com que antecedência o passageiro de 60 anos ou mais pede a assistência especial?",
      opcoes: [
        "Na compra da passagem ou pelo menos 48 horas antes",
        "No portão de embarque",
        "Uma semana antes",
        "Não há direito a assistência",
      ],
      correta: 0,
      explicacao: "A Resolução 280 da ANAC inclui as pessoas com 60 anos ou mais; acompanhante e documento médico pedem 72 horas.",
    },
    {
      topico: '15.5',
      pergunta: "Por que o idoso deve evitar antialérgicos antigos e calmantes para dormir no voo?",
      opcoes: [
        "Porque aumentam a confusão e as quedas",
        "Porque são proibidos a bordo",
        "Porque perdem o efeito na altitude",
        "Porque causam pedra nos rins",
      ],
      correta: 0,
      explicacao: "No idoso, esses remédios somam sono, confusão e pressão baixa ao levantar, e a queda no corredor pode quebrar o quadril.",
    },
  ],
  liberacao: liberacaoEnvelhecimento,
};
