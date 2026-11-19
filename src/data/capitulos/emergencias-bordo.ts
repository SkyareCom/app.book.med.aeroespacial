// Missão 3 · Voo 10 — Emergências médicas a bordo. Ramo editorial voo/M3V10.
// Os 6 itens previstos viraram 6 tópicos, no mesmo padrão do M3V8 e do M3V9.
// REGISTRO DE REVISÃO · 19/11/2026. Fontes conferidas:
// 10.1 Epidemiologia. Peterson et al., N Engl J Med 2013;368(22):2075-83: 11.920 emergências (jan. 2008 a out. 2010),
//   1 a cada 604 voos, 16 por milhão de passageiros, cerca de 10% do tráfego (7.198.118 voos); desmaio 37,4%,
//   respiratório 12,1%, náusea ou vômito 9,5%, cardíaco 7,7%, convulsão 5,8%; parada 0,3%, obstétrico 0,5%, ouvido 0,4%,
//   corte 0,3%; médico passageiro 48,1%; desvio 7,3%; 10.914 com seguimento, 25,8% ao hospital, 8,6% internados, 0,3%
//   mortos (36, 31 por parada); internação: possível AVC (OR 3,36) e respiratório (OR 2,13). Martin-Gill et al.,
//   JAMA 2018;320(24):2580-90: 24 a 130 por milhão; cabine a 5.000 a 8.000 pés. Cleveland Clin J Med 2017;84(6):457-62
//   e Nable et al., N Engl J Med 2015;373:939-45: sem notificação obrigatória, número subestimado.
// 10.2 Kits. 14 CFR 121.803 e Apêndice A (FAA): kits de primeiros socorros por assentos, conjunto médico com o conteúdo
//   de 12/04/2004, DEA na cabine; 121.801: sem obrigação de prestar assistência nem padrão de atendimento. FAA InFO 20001:
//   itens voluntários e seção 307 da lei de 2018 (crianças e gestantes). FAA, NPRM 26-12 (Docket FAA-2026-9178): exigência
//   baseada em desempenho. ICAO, Anexo 6, 6.2.2. ANAC, CP 05/2023 (AIR, justificativa e minuta): Conjunto de Primeiros
//   Socorros (1 a cada 100 passageiros), Precaução Universal, Conjunto Médico de Emergência (mais de 100 passageiros em
//   trechos de mais de 2 h), AMBU no CPS desde 2011; RBAC 121.333 (oxigênio para primeiros socorros).
// 10.3 Telemedicina. Cleveland Clin J Med 2017: serviços de solo e contato com o resgate. Advisory Board (2018) e Becker's:
//   MedAire e STAT-MD, apoio a pilotos e despachantes. Delta e STAT-MD: emergencistas. Air Canada 2004-2008 (Valani et al., Aviat Space
//   Environ Med 2010): 5.386 contatos, 2,4 desvios por 100 chamadas, desvios quase dobraram com menos contatos, triagem
//   prévia sem efeito. Duodecim (EBM Guidelines): a companhia pode exigir a consulta antes do kit.
// 10.4 Protocolos. WikEM: identificar-se, ajudar sem assumir o comando. Duodecim: sinais vitais, informar a tripulação,
//   consultar o solo. Current Psychiatry 2019;18(12): não se oferecer sob efeito de álcool ou remédio. Page et al.,
//   N Engl J Med 2000;343(17):1210-6: 200 usos do DEA, 40% de sobrevivência após choque na FV; queda de cerca de 10% por
//   minuto (comunicado da UT Southwestern). Conduta por quadro: aplicação do conteúdo do kit e de primeiros socorros.
// 10.5 Ética e lei. Código de Ética Médica (2019), princípio VII (via Cremesp). Código Penal, art. 135 e parágrafo único.
//   Lei de Assistência Médica na Aviação (EUA, 1998): proteção salvo negligência grave ou dolo; sem dever legal nos EUA
//   (Current Psychiatry 2019). Duodecim: responsabilidade varia com companhia, rota e local. CFM, Cartilha de Medicina
//   Aeroespacial (2018), recomendada pelo Cremesp. Nable et al., Cleve Clin J Med 2017: EUA, Canadá e Reino Unido sem
//   dever legal; GMC com dever ético; Austrália e alguns países da UE exigem; anafilaxia do adulto com difenidramina
//   50 mg e adrenalina 0,3 mg (1:1000) no músculo; agir dentro da própria formação.
// 10.6 Desvio. Peterson 2013: 7,3%; parada, obstétrico e AVC mais associados a desvio (Advisory Board). Cleveland Clin J
//   Med 2017: o médico recomenda, o comandante decide. Lei 7.565/1986 (CBA), art. 166. IATA (via Advisory Board): US$ 10 mil
//   a 200 mil por desvio. AP (2013): CDI com cinco choques sobre o Atlântico, recomendação de pouso na Terra Nova.
// Normas estrangeiras são citadas como tais e não viram regra brasileira. Condutas sem número próprio (deitar, elevar as
// pernas, oxigênio, açúcar pela boca, proteger a cabeça, registrar) são aplicação das fontes e do conteúdo do kit.
import type { Capitulo } from '../tipos';

export const emergenciasBordo: Capitulo = {
  numero: 10,
  titulo: 'Emergências médicas a bordo',
  tempoLeituraMin: 18,
  topicos: [
    {
      id: '10.1',
      titulo: "Epidemiologia",
      pergunta: "Com que frequência alguém passa mal em voo, o que acontece mais e quantos casos terminam no hospital?",
      conteudo: {
        texto: [
          "A **emergência médica a bordo** acontece num ambiente sem paralelo: cabine pressurizada a uma altitude equivalente de **1.500 a 2.400 m**, ar seco, pouco espaço e o hospital a horas de distância. O maior estudo sobre o tema analisou **11.920** chamadas de cinco companhias a um centro médico em terra, de **2008 a 2010**: houve **uma emergência a cada 604 voos**, cerca de **16 por milhão de passageiros**. Revisões posteriores estimam de **24 a 130 por milhão**.",
          "Esses números são um **piso**. Não existe notificação obrigatória dessas ocorrências, e muitos casos são resolvidos a bordo sem que ninguém ligue para o solo. O estudo cobriu cerca de **10%** do tráfego aéreo do período, em **7,2 milhões** de voos. Com bilhões de passageiros por ano, a emergência a bordo não é rara para quem viaja muito: é provável que um profissional de saúde que voa com frequência seja chamado um dia.",
          "O que mais acontece é simples. **Desmaio ou quase desmaio** responde por **37,4%** dos casos, seguido de **sintomas respiratórios** (**12,1%**), **náusea ou vômito** (**9,5%**), **sintomas cardíacos** (**7,7%**) e **convulsões** (**5,8%**). Os casos mais temidos são os mais raros: **parada cardíaca** (**0,3%**), problemas **obstétricos ou ginecológicos** (**0,5%**), dor de ouvido (**0,4%**) e cortes (**0,3%**). Raros, porém, não quer dizer leves: esses são os que mais levam a desvio e internação.",
          "O desfecho, na maioria das vezes, é bom. Dos **10.914** passageiros com seguimento, **25,8%** foram levados ao hospital por equipe de resgate, **8,6%** foram internados e **0,3%** morreram: **36 pessoas**, das quais **31 por parada cardíaca**. As queixas que mais levaram à internação foram o **possível AVC**, com chance **3,4 vezes** maior, e os **sintomas respiratórios**, com chance **2,1 vezes** maior. Por isso, fraqueza de um lado do corpo, fala enrolada ou falta de ar merecem atenção imediata.",
          "Quem atende? Em **48,1%** das emergências, um **médico passageiro** ajudou, e enfermeiros e outros profissionais de saúde responderam por boa parte dos demais casos. A primeira resposta, porém, é sempre da **tripulação**, treinada em primeiros socorros, e do **centro médico em terra** com que a companhia tem contrato (Veja M3V10 - III). A cabine, o jejum, o calor e o cansaço da viagem podem agravar uma condição que já existia (Veja M3V9 - I).",
          "**Como prevenir e amenizar.** Antes de viajar, mantenha a doença crônica controlada e leve os remédios na bagagem de mão. No voo, coma e beba água com regularidade, levante-se para caminhar quando permitido e avise a tripulação **logo no início** de um mal-estar. Se for profissional de saúde, saiba que a chance de ser chamado é real: conheça o kit de bordo e o caminho até o médico de solo antes que a emergência aconteça.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v10-1-chamado.jpg'), legenda: "Quando alguém passa mal, a tripulação pergunta se há um profissional de saúde a bordo." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Emergências a bordo em números",
              colunas: ["Indicador", "Valor", "Fonte"],
              linhas: [
                ["Frequência", "1 a cada 604 voos", "Peterson e colegas, 2013"],
                ["Por milhão de passageiros", "16 no estudo; 24 a 130 em revisões", "Peterson, 2013; Martin-Gill, 2018"],
                ["Médico passageiro ajudou", "48,1%", "Peterson e colegas, 2013"],
                ["Desvio do voo", "7,3%", "Peterson e colegas, 2013"],
                ["Levados ao hospital", "25,8%", "Peterson e colegas, 2013"],
                ["Mortes", "0,3%, quase todas por parada cardíaca", "Peterson e colegas, 2013"],
              ],
            },
          },
          { paragrafo: 3, midia: 'emergencias-frequentes' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v10-1-ambulancia.jpg'), legenda: "Cerca de um em cada quatro passageiros atendidos segue para o hospital depois do pouso." } },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · emergências a bordo",
              colunas: ["Quem", "O que fazer", "Por quê"],
              linhas: [
                ["Passageiro com doença crônica", "Controlar a doença e levar os remédios à mão", "A viagem pode agravar uma condição anterior"],
                ["Todo passageiro", "Comer, beber água e se mexer quando permitido", "Jejum, calor e imobilidade favorecem o desmaio"],
                ["Quem passa mal", "Avisar a tripulação no início", "A ajuda chega antes da piora"],
                ["Profissional de saúde", "Conhecer o kit e a consulta com o solo", "A chance de ser chamado é real"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '10.2',
      titulo: "Kits médicos",
      pergunta: "O que existe a bordo para tratar um passageiro e o que a regra exige no Brasil e nos Estados Unidos?",
      conteudo: {
        texto: [
          "O **Anexo 6 da ICAO** exige que o avião leve **suprimentos médicos acessíveis e adequados**, mas cada país define o conteúdo mínimo. Nos Estados Unidos, a regra da FAA (14 CFR 121.803 e Apêndice A) pede **conjuntos de primeiros socorros** conforme o número de assentos — de **1** até 50 assentos a **4** acima de 250 —, um **conjunto médico de emergência** nos aviões com comissário e, desde **abril de 2004**, um **desfibrilador externo automático (DEA)** na cabine.",
          "O conjunto médico americano traz equipamentos e remédios para os quadros mais comuns: **esfigmomanômetro e estetoscópio**, **cânulas orofaríngeas** de três tamanhos, **ressuscitador manual** com máscaras, máscaras de RCP, equipo de soro com **500 mL de soro fisiológico**, agulhas e seringas. Entre os remédios: **adrenalina** em duas diluições, **anti-histamínico** em comprimido e injetável, **broncodilatador inalatório**, **glicose a 50%**, **ácido acetilsalicílico 325 mg**, **nitroglicerina 0,4 mg**, **atropina**, **lidocaína** e analgésico não opioide, com instruções básicas de uso.",
          "O kit mínimo tem lacunas que o médico precisa conhecer. Não há **anticonvulsivante**, **sedativo**, **antiemético injetável** nem material de **parto**, e a lista quase não pensa em crianças e gestantes. Por isso, a lei americana de reautorização da FAA de **2018** mandou rever o conteúdo à luz das necessidades de **crianças e grávidas**, e a FAA permitiu que as empresas acrescentem itens por conta própria. Em **2026**, a agência propôs trocar a lista fixa por uma exigência baseada em **desempenho**.",
          "No Brasil, o **RBAC 121** organiza os kits em três conjuntos: o **Conjunto de Primeiros Socorros**, na razão de **um para cada 100 passageiros**; o **Conjunto de Precaução Universal**, para lidar com sangue e secreções; e o **Conjunto Médico de Emergência**, exigido nos aviões que levam **mais de 100 passageiros** em trechos de **mais de duas horas**. Desde **2011**, o **ressuscitador manual (AMBU)** fica no Conjunto de Primeiros Socorros, ao alcance da tripulação. O conteúdo de cada conjunto está no Apêndice A do regulamento.",
          "Ter o kit não obriga a tratar. Tanto a regra americana quanto a brasileira dizem que os requisitos **não pretendem obrigar** a empresa ou sua tripulação a prestar assistência médica nem criar um **padrão de atendimento**. Na prática, a companhia pode exigir a **consulta com o médico de solo** antes de abri-lo (Veja M3V10 - III). O médico voluntário deve se identificar, dizer o que precisa e usar o que conhece: um remédio sem indicação clara faz mais mal do que bem num lugar sem exames.",
          "**Como prevenir e amenizar.** Se você tem doença que pode precisar de remédio de urgência — **adrenalina autoinjetável**, **broncodilatador**, **glicose** ou anticonvulsivante prescrito —, leve o seu na bagagem de mão: o kit de bordo pode não ter. Profissional de saúde que voa com frequência deve conhecer a lista mínima e suas lacunas. Ao atender, peça o **DEA** junto com o kit sempre que houver perda de consciência.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v10-2-kit.jpg'), legenda: "O conjunto médico de emergência reúne remédios e equipamentos para uso por profissional de saúde." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Kit médico mínimo da FAA · principais itens",
              colunas: ["Grupo", "Itens", "Para quê"],
              linhas: [
                ["Avaliação", "Esfigmomanômetro e estetoscópio", "Pressão e ausculta"],
                ["Via aérea e ventilação", "Cânulas, ressuscitador manual e máscaras de RCP", "Abrir a via aérea e ventilar"],
                ["Acesso venoso", "Equipo, soro de 500 mL, agulhas e seringas", "Hidratar e injetar remédios"],
                ["Alergia grave e asma", "Adrenalina, anti-histamínico e broncodilatador", "Anafilaxia e crise de broncoespasmo"],
                ["Coração", "Ácido acetilsalicílico, nitroglicerina, atropina e lidocaína", "Dor no peito e arritmias"],
                ["Açúcar baixo", "Glicose a 50% injetável", "Hipoglicemia"],
                ["Parada cardíaca", "DEA na cabine", "Choque na fibrilação ventricular"],
              ],
            },
          },
          { paragrafo: 3, midia: 'kits-bordo' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v10-2-dea.jpg'), legenda: "O desfibrilador fica na cabine de passageiros, ao alcance da tripulação." } },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · kits médicos",
              colunas: ["Quem", "O que fazer", "Por quê"],
              linhas: [
                ["Passageiro com alergia grave", "Levar a própria adrenalina autoinjetável", "O kit pode demorar ou não estar acessível"],
                ["Passageiro com epilepsia", "Levar o remédio de resgate prescrito", "O kit mínimo não tem anticonvulsivante"],
                ["Passageiro com diabetes", "Levar glicose e insulina na mão", "Corrige a hipoglicemia na hora"],
                ["Profissional de saúde", "Conhecer a lista mínima e as lacunas", "Evita perder tempo procurando o que não existe"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '10.3',
      titulo: "Telemedicina",
      pergunta: "Quem é o médico que fala do solo com a tripulação e por que ele pesa tanto nas decisões a bordo?",
      conteudo: {
        texto: [
          "Nem todo voo tem um profissional de saúde a bordo, mas quase todas as grandes companhias têm contrato com um **serviço médico em terra**. São centros com médicos de plantão, em geral **emergencistas**, que falam por rádio, satélite ou telefone com a cabine de comando e com quem atende o passageiro. Nos Estados Unidos, dois dos maiores são o **MedAire**, ligado a um serviço de emergência de Phoenix, e o **STAT-MD**, da Universidade de Pittsburgh.",
          "O médico de solo **não vê o paciente**: depende do que a tripulação ou o voluntário descreve. Por isso, a qualidade da informação decide a qualidade do conselho. Ele ajuda a interpretar sinais, autoriza o uso de itens do kit, orienta remédios e, quando é preciso pousar, conversa com o comandante e o despachante sobre o **aeroporto com recurso médico** adequado e avisa a equipe de resgate que vai esperar o avião.",
          "A consulta com o solo muda decisões. Na **Air Canada**, de **2004 a 2008**, houve **5.386** contatos com o serviço médico de solo, que recomendou em média **2,4 desvios a cada 100 chamadas**. Quando os contatos caíram, os desvios **quase dobraram**, e a triagem prévia dos passageiros não reduziu os desvios. O dado sugere que o médico de solo evita pousos desnecessários tanto quanto indica os necessários (Veja M3V10 - VI).",
          "A ligação também serve ao **voluntário**. O profissional que atende a bordo pode discutir o caso com um colega experiente em medicina de voo, dividir decisões difíceis e deixar registrado o que foi feito. Algumas companhias pedem que essa conversa aconteça **antes de abrir o kit médico** ou de dar um remédio injetável. Os estudos sobre o tema vêm justamente dos registros desses centros, e por isso subestimam o total: muitos casos se resolvem sem nenhuma ligação.",
          "Para que a consulta funcione, a mensagem precisa ser curta e completa: **idade e sexo**, o que aconteceu e quando, **doenças e remédios** conhecidos, **sinais vitais** (pulso, pressão, frequência respiratória, saturação se houver oxímetro, glicemia se houver glicosímetro), o que já foi feito e como o passageiro respondeu. A ligação passa pela cabine de comando: a tripulação transmite, e o voluntário fala quando o sistema permitir.",
          "**Como prevenir e amenizar.** Ao atender a bordo, peça **cedo** que a tripulação acione o médico de solo, mesmo se o caso parecer simples. Anote horários, sinais vitais e remédios dados. Passe as informações na ordem da tabela, sem pressa e sem jargão. Se a companhia exigir a consulta antes de abrir o kit, siga a regra: ela também protege você.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v10-3-interfone.jpg'), legenda: "A tripulação passa os dados ao médico de solo, que orienta sem ver o paciente." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "O que o médico de solo faz",
              colunas: ["Tarefa", "Como", "Para quê"],
              linhas: [
                ["Ouvir o caso", "Pelo rádio, satélite ou telefone da cabine", "Entender o quadro sem ver o paciente"],
                ["Orientar o atendimento", "Autoriza itens do kit e sugere remédios", "Tratar com segurança a bordo"],
                ["Recomendar ou não o desvio", "Conversa com o comandante e o despachante", "Evitar pousos desnecessários e atrasos perigosos"],
                ["Preparar a chegada", "Avisa a equipe de resgate do aeroporto", "O passageiro é atendido ao abrir a porta"],
              ],
            },
          },
          { paragrafo: 3, midia: 'consulta-solo' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v10-3-solo.jpg'), legenda: "Em terra, o médico de solo ajuda a decidir entre seguir viagem e desviar." } },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · consulta com o solo",
              colunas: ["Informação", "Exemplo", "Por quê"],
              linhas: [
                ["Quem é o passageiro", "Idade, sexo, doenças e remédios", "Define o risco de base"],
                ["O que aconteceu", "Sintoma, início e evolução", "Diferencia o simples do grave"],
                ["Sinais vitais", "Pulso, pressão, respiração, saturação e glicemia", "Base para o conselho e para o desvio"],
                ["O que já foi feito", "Oxigênio, remédios e horários", "Evita repetir doses e mede a resposta"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '10.4',
      titulo: "Protocolos",
      pergunta: "Como agir quando a tripulação chama um profissional de saúde e o que fazer nos quadros mais comuns e nos mais graves?",
      conteudo: {
        texto: [
          "Ao ouvir o chamado, o profissional deve primeiro avaliar a **própria condição**: quem bebeu álcool ou tomou remédio que afete o julgamento não deve se oferecer. Depois, **identifique-se** à tripulação e diga sua formação. O papel do voluntário é **ajudar, não assumir o comando**: a responsabilidade pelo voo é da tripulação, que conhece os recursos de bordo e o caminho até o médico de solo (Veja M3V10 - III).",
          "A sequência é a de qualquer atendimento, adaptada ao espaço. **Converse com o passageiro** e com quem viaja com ele, pergunte por doenças, remédios e alergias. **Meça os sinais vitais** e examine o que for possível no assento ou na galley. **Informe a tripulação** sobre sua avaliação e o que recomenda, e peça que acione o **médico de solo**. Algumas companhias exigem essa consulta antes de usar o kit médico. Anote tudo com horário.",
          "Nos quadros mais comuns, a base resolve. No **desmaio**, deite o passageiro se houver espaço, eleve as pernas e ofereça **oxigênio** do cilindro de primeiros socorros. Na **hipoglicemia**, açúcar pela boca se estiver acordado, ou **glicose a 50%** na veia, se o kit tiver e houver quem saiba usar. Na **alergia grave** do adulto, **adrenalina 0,3 mg** (apresentação 1:1000) e **difenidramina 50 mg**, ambas no músculo. Na **dor no peito**, ácido acetilsalicílico e nitroglicerina do kit, se não houver contraindicação. Na **convulsão**, proteja a cabeça e vire de lado: o kit mínimo não tem anticonvulsivante.",
          "A **parada cardíaca** é rara a bordo, mas responde pela maioria das mortes. Nela, cada minuto pesa: a chance de sobreviver cai cerca de **10% a cada minuto** sem desfibrilação. Por isso o **DEA** está na cabine. Na primeira grande experiência com desfibriladores numa companhia aérea americana, em **200 usos**, a sobrevivência até a alta hospitalar depois do choque na **fibrilação ventricular** foi de **40%**. Comece a **massagem cardíaca** no chão do corredor ou da galley e use o DEA assim que chegar.",
          "Alguns sinais mudam a urgência e pedem que a tripulação saiba **na hora**: perda de consciência que não se resolve deitado, **fraqueza de um lado do corpo** ou fala enrolada, **falta de ar** progressiva, dor no peito que não passa, convulsão que se repete, sangramento importante e trabalho de parto. Esses são os quadros que mais levam ao hospital e ao desvio, e a decisão de pousar é do comandante, com o médico de solo (Veja M3V10 - VI).",
          "**Como prevenir e amenizar.** Antes de se oferecer, confirme que está em condições. Identifique-se, peça o **kit e o DEA** juntos quando houver perda de consciência e acione o médico de solo cedo. Trate o que conhece, com o que existe a bordo. Anote horários, sinais vitais e remédios, e entregue esse registro à equipe que receber o passageiro em terra.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v10-4-sinais.jpg'), legenda: "O voluntário se identifica e mede os sinais vitais antes de tratar." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Atendimento a bordo · passo a passo",
              colunas: ["Passo", "O que fazer", "Por quê"],
              linhas: [
                ["1. Avaliar-se", "Não se oferecer depois de álcool ou sedativo", "Julgamento prejudicado põe o paciente em risco"],
                ["2. Identificar-se", "Dizer à tripulação a formação", "A tripulação coordena os recursos"],
                ["3. Avaliar o passageiro", "História, remédios, alergias e sinais vitais", "Separa o simples do grave"],
                ["4. Informar e consultar", "Relatar à tripulação e ao médico de solo", "Decisões compartilhadas e registradas"],
                ["5. Tratar e reavaliar", "Usar o kit dentro da sua competência", "Medir a resposta antes de repetir"],
                ["6. Registrar e entregar", "Horários, sinais e remédios por escrito", "Continuidade do cuidado em terra"],
              ],
            },
          },
          { paragrafo: 3, midia: 'protocolo-bordo' },
          { paragrafo: 4, midia: 'animacao-dea' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v10-4-massagem.jpg'), legenda: "Na parada cardíaca, a massagem começa no chão e o DEA chega o quanto antes." } },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · protocolos",
              colunas: ["Quando", "O que fazer", "Por quê"],
              linhas: [
                ["Ao ouvir o chamado", "Checar a própria condição", "Ajudar exige julgamento preservado"],
                ["Perda de consciência", "Pedir kit e DEA juntos", "Na parada, cada minuto reduz a chance"],
                ["Logo no início", "Acionar o médico de solo", "Orientação e decisão de desvio"],
                ["Durante todo o caso", "Anotar horários e remédios", "Evita erro de dose e informa o hospital"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '10.5',
      titulo: "Ética e lei",
      pergunta: "O médico é obrigado a atender em voo, o que o protege e qual lei vale a 11 mil metros?",
      conteudo: {
        texto: [
          "No Brasil, o **Código de Ética Médica** garante autonomia ao médico, mas abre exceções no **princípio fundamental VII**: ele não é obrigado a prestar serviços contra a consciência, **salvo** na ausência de outro médico, em **urgência ou emergência**, ou quando a recusa possa trazer danos à saúde do paciente. A emergência a bordo, em que muitas vezes não há outro médico, se encaixa nessas exceções.",
          "Além da ética, há a lei penal. O **artigo 135 do Código Penal** pune a **omissão de socorro**: deixar de prestar assistência, quando possível fazê-lo **sem risco pessoal**, a pessoa ferida ou em grave e iminente perigo, ou não pedir socorro à autoridade. A pena é de **detenção de 1 a 6 meses ou multa**, aumentada em metade se resultar lesão grave e triplicada se resultar morte. O dever é de qualquer pessoa, mas pesa mais sobre quem tem a formação para ajudar.",
          "Nos **Estados Unidos**, ao contrário, o profissional de folga **não é obrigado por lei** a atender. Para encorajar a ajuda, a **Lei de Assistência Médica na Aviação**, de **1998**, protege quem atende a bordo de responsabilidade civil, **exceto** em caso de **negligência grave ou má conduta intencional**. Canadá e Reino Unido também não exigem por lei, embora o conselho médico britânico considere um **dever ético** responder; já a **Austrália** e alguns países europeus **exigem** que o profissional atenda. Em voos internacionais, entram em jogo regras do país da companhia, da rota e do local onde o avião está, e a responsabilidade do voluntário varia com esses fatores.",
          "A ética do atendimento a bordo segue a de terra. O voluntário atua **dentro da sua competência**: o oftalmologista ou o dermatologista ajudam muito ao organizar a avaliação e falar com o solo, sem precisar fazer o que não sabem. Pede **consentimento** ao passageiro acordado, preserva o **sigilo** num ambiente cheio de ouvidos e respeita a recusa de quem está lúcido. Quem não está em condições de julgar, por álcool, sono ou remédio, deve deixar a vez a outro.",
          "O **registro** protege o paciente e quem atende. Anote o que viu, o que fez, os horários e quem orientou do solo, e entregue uma cópia à tripulação e à equipe que receber o passageiro. Em **2018**, o Conselho Federal de Medicina lançou a **Cartilha de Medicina Aeroespacial**, com orientações básicas para emergências em voo, e os conselhos regionais recomendam sua leitura aos médicos que viajam.",
          "**Como prevenir e amenizar.** Se é médico e voa, leia a cartilha do CFM e conheça a regra do país da companhia que vai usar. Ao ser chamado, apresente-se se estiver em condições, atue dentro da sua competência, peça consentimento, fale baixo e anote tudo. Se não puder ajudar por estar sob efeito de álcool ou remédio, diga isso à tripulação: é uma decisão ética, não uma omissão.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v10-5-identificacao.jpg'), legenda: "Ao se oferecer, o profissional informa sua formação à tripulação." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "Dever de socorrer e proteção do voluntário",
              colunas: ["Onde", "Dever", "Proteção"],
              linhas: [
                ["Brasil · ética", "Código de Ética Médica, princípio VII", "Autonomia, salvo urgência, emergência ou falta de outro médico"],
                ["Brasil · lei penal", "Código Penal, art. 135", "Pune a omissão de socorro possível sem risco pessoal"],
                ["Estados Unidos", "Sem obrigação legal de atender", "Lei de 1998 protege, salvo negligência grave ou dolo"],
                ["Voos internacionais", "Depende da companhia, da rota e do local", "Regras do país e direito internacional"],
              ],
            },
          },
          { paragrafo: 3, midia: 'dever-socorro' },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v10-5-registro.jpg'), legenda: "Registrar o que foi feito protege o passageiro e quem atendeu." } },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · ética e lei",
              colunas: ["Quando", "O que fazer", "Por quê"],
              linhas: [
                ["Antes de viajar", "Ler a cartilha do CFM", "Orientações básicas para emergências em voo"],
                ["Ao ser chamado", "Apresentar-se se estiver em condições", "Ética e lei pedem ajuda possível"],
                ["Durante o atendimento", "Competência, consentimento e sigilo", "A ética de terra vale no ar"],
                ["Ao terminar", "Registrar e entregar uma cópia", "Protege o paciente e o voluntário"],
              ],
            },
          },
        ],
      },
    },
    {
      id: '10.6',
      titulo: "Desvio",
      pergunta: "Quando o avião pousa antes do destino por causa de um passageiro e quem decide?",
      conteudo: {
        texto: [
          "O **desvio** é o pouso não programado num aeroporto fora da rota para levar um passageiro ao hospital. No maior estudo sobre emergências a bordo, ele ocorreu em **7,3%** dos casos. Os quadros que mais levaram ao desvio e à internação foram os mais raros e graves: **parada cardíaca**, problemas **obstétricos** e **AVC**. A maioria das emergências, como o desmaio, se resolve sem desviar.",
          "Quem decide é o **comandante**. O médico voluntário pode **recomendar** o pouso, mas não decidir. No Brasil, o **Código Brasileiro de Aeronáutica** põe o comandante como responsável pela operação e pela segurança da aeronave. Ele decide ouvindo o médico de solo e o despachante da empresa, e pesa muitos fatores além do quadro clínico: a segurança do próprio voo, os aeroportos possíveis e o recurso médico de cada um.",
          "O desvio tem custo. A IATA estima que cada um custe de **US$ 10 mil a US$ 200 mil**. Por isso as companhias contam com o **médico de solo**, que ajuda a separar o caso que precisa pousar daquele que pode seguir (Veja M3V10 - III). O custo não deve vencer a vida, mas um pouso desnecessário também tem riscos e atrasa centenas de pessoas.",
          "O tempo até o solo também decide. Sobre o oceano, o aeroporto mais próximo pode estar a horas. Num caso relatado por um médico de solo, um passageiro com **desfibrilador implantado** recebeu **cinco choques** no meio do Atlântico, e a recomendação foi pousar no Canadá, na Terra Nova. Já perto do destino, seguir viagem pode levar o paciente ao hospital mais rápido do que um desvio, com pouso, taxiamento e espera pela ambulância.",
          "Quando o desvio é decidido, o trabalho continua. A tripulação prepara a cabine para o pouso, o médico de solo avisa a **equipe de resgate** do aeroporto e o voluntário mantém o passageiro monitorado e **preso ao assento** ou no chão, conforme a orientação da tripulação. Ao abrir a porta, entregue o **registro escrito** à equipe que vai assumir: ele economiza minutos no hospital.",
          "**Como prevenir e amenizar.** Ao atender, diga **cedo** à tripulação se o quadro pode exigir hospital: o desvio leva tempo para ser planejado. Dê ao médico de solo os dados que sustentam a recomendação. Respeite a decisão do comandante, que vê o que você não vê. Mantenha o passageiro monitorado até a chegada da equipe de terra e entregue o registro por escrito.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m3v10-6-cabine.jpg'), legenda: "O comandante decide o desvio, depois de ouvir o médico de solo e o despachante." } },
          {
            paragrafo: 2,
            tabela: {
              titulo: "O que pesa na decisão de desviar",
              colunas: ["Fator", "A favor de pousar", "A favor de seguir"],
              linhas: [
                ["Gravidade", "Parada, AVC, parto ou piora rápida", "Quadro estável e melhorando"],
                ["Tempo até o destino", "Muitas horas pela frente", "Destino próximo, com hospital"],
                ["Aeroporto alternativo", "Perto e com hospital adequado", "Distante ou sem recurso médico"],
                ["Recursos de bordo", "O kit não basta para o quadro", "O tratamento a bordo funciona"],
              ],
            },
          },
          { paragrafo: 3, midia: 'desvio-decisao' },
          { paragrafo: 4, video: { fonte: require('@/assets/videos/m3v10-voo.mp4'), legenda: "O desvio leva o passageiro ao aeroporto adequado mais próximo." } },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m3v10-6-resgate.jpg'), legenda: "No desvio, a equipe de resgate espera o avião no aeroporto." } },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · desvio",
              colunas: ["Quando", "O que fazer", "Por quê"],
              linhas: [
                ["No início do atendimento", "Avisar se o quadro pode exigir hospital", "O desvio leva tempo para planejar"],
                ["Na consulta com o solo", "Passar sinais vitais e evolução", "Sustenta a recomendação"],
                ["Depois da decisão", "Respeitar o comandante", "Ele pesa a segurança de todo o voo"],
                ["Na chegada", "Entregar o registro escrito", "Economiza minutos no hospital"],
              ],
            },
          },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Sistemas do corpo mais atingidos",
              colunas: ["Sistema", "Efeito", "Mecanismo"],
              linhas: [
                ["Sistema nervoso", "Desmaio, convulsão e AVC", "Queda do fluxo de sangue ao cérebro, descarga elétrica ou vaso entupido ou rompido"],
                ["Respiratório", "Falta de ar e queda da saturação", "Menos oxigênio na cabine somado a asma, DPOC ou infecção"],
                ["Digestivo", "Náusea e vômito", "Movimento do avião, alimentos e expansão de gases"],
                ["Cardiovascular", "Dor no peito, arritmia e parada cardíaca", "Coração doente com menos oxigênio e mais estresse"],
                ["Metabolismo", "Hipoglicemia", "Insulina ou remédio sem refeição na hora certa"],
                ["Imunidade", "Alergia grave", "Contato com alimento ou substância a que a pessoa é alérgica"],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '10.1',
      pergunta: "No maior estudo sobre o tema, com que frequência houve emergência médica a bordo?",
      opcoes: [
        "Uma a cada 604 voos",
        "Uma a cada 10 voos",
        "Uma a cada 100 mil voos",
        "Uma por dia em cada avião",
      ],
      correta: 0,
      explicacao: "Foram 11.920 emergências em cerca de 7,2 milhões de voos; o número é um piso, porque não há notificação obrigatória.",
    },
    {
      topico: '10.1',
      pergunta: "Qual foi o problema mais comum nas emergências a bordo?",
      opcoes: [
        "Parada cardíaca",
        "Desmaio ou quase desmaio",
        "Parto",
        "Dor de ouvido",
      ],
      correta: 1,
      explicacao: "O desmaio respondeu por 37,4% dos casos; a parada cardíaca foi rara, mas causou a maioria das mortes.",
    },
    {
      topico: '10.2',
      pergunta: "Desde quando a FAA exige desfibrilador externo automático na cabine dos aviões com comissário?",
      opcoes: [
        "1970",
        "2020",
        "Abril de 2004",
        "Nunca exigiu",
      ],
      correta: 2,
      explicacao: "A regra de 2004 ampliou o conjunto médico e incluiu o DEA, guardado na cabine de passageiros.",
    },
    {
      topico: '10.2',
      pergunta: "O que falta no conjunto médico mínimo da FAA?",
      opcoes: [
        "Adrenalina",
        "Glicose a 50%",
        "Estetoscópio",
        "Anticonvulsivante",
      ],
      correta: 3,
      explicacao: "O kit tem adrenalina, glicose e estetoscópio, mas não tem anticonvulsivante; quem tem epilepsia deve levar o próprio remédio de resgate.",
    },
    {
      topico: '10.3',
      pergunta: "O que aconteceu com os desvios da Air Canada quando os contatos com o médico de solo diminuíram?",
      opcoes: [
        "Quase dobraram",
        "Caíram pela metade",
        "Não mudaram",
        "Deixaram de existir",
      ],
      correta: 0,
      explicacao: "O médico de solo ajuda a separar quem precisa pousar de quem pode seguir; sem ele, os desvios aumentaram.",
    },
    {
      topico: '10.3',
      pergunta: "O que o médico de solo faz quando o desvio é decidido?",
      opcoes: [
        "Assume o comando do avião",
        "Avisa a equipe de resgate que vai receber o avião",
        "Proíbe o uso do kit",
        "Nada, porque o caso termina",
      ],
      correta: 1,
      explicacao: "Ele ajuda a escolher o aeroporto com recurso médico e prepara a chegada, para que o passageiro seja atendido ao abrir a porta.",
    },
    {
      topico: '10.4',
      pergunta: "Qual é o papel do profissional de saúde voluntário a bordo?",
      opcoes: [
        "Decidir o desvio",
        "Comandar a tripulação",
        "Ajudar, sem assumir o comando do voo",
        "Assinar a liberação do avião",
      ],
      correta: 2,
      explicacao: "A responsabilidade pelo voo é da tripulação; o voluntário se identifica, avalia, informa e trata dentro da sua competência.",
    },
    {
      topico: '10.4',
      pergunta: "Na primeira grande experiência com desfibriladores numa companhia americana, qual foi a sobrevivência depois do choque na fibrilação ventricular?",
      opcoes: [
        "4%",
        "90%",
        "Zero",
        "40%",
      ],
      correta: 3,
      explicacao: "Foram 200 usos do DEA; a sobrevivência até a alta hospitalar depois do choque foi de 40%, porque a desfibrilação veio cedo.",
    },
    {
      topico: '10.5',
      pergunta: "No Brasil, quando o Código de Ética Médica dispensa a autonomia do médico de recusar atendimento?",
      opcoes: [
        "Em urgência ou emergência, na falta de outro médico ou se a recusa causar dano",
        "Nunca",
        "Só em hospitais públicos",
        "Só com pedido por escrito",
      ],
      correta: 0,
      explicacao: "É o princípio fundamental VII; a emergência a bordo, muitas vezes sem outro médico, se encaixa nessas exceções.",
    },
    {
      topico: '10.5',
      pergunta: "O que a lei americana de 1998 sobre assistência médica na aviação faz pelo voluntário?",
      opcoes: [
        "Obriga todo médico a atender",
        "Protege de responsabilidade civil, salvo negligência grave ou dolo",
        "Paga honorários pelo atendimento",
        "Proíbe atender sem licença local",
      ],
      correta: 1,
      explicacao: "Nos Estados Unidos não há obrigação legal de atender; a lei existe para encorajar a ajuda.",
    },
    {
      topico: '10.6',
      pergunta: "Quem decide o desvio de um voo por emergência médica?",
      opcoes: [
        "O médico voluntário",
        "O passageiro doente",
        "O comandante",
        "O comissário mais antigo",
      ],
      correta: 2,
      explicacao: "O médico pode recomendar, mas o comandante decide, ouvindo o médico de solo e o despachante.",
    },
    {
      topico: '10.6',
      pergunta: "Em que proporção das emergências houve desvio no maior estudo sobre o tema?",
      opcoes: [
        "73%",
        "0,1%",
        "50%",
        "7,3%",
      ],
      correta: 3,
      explicacao: "A maioria das emergências se resolve a bordo; parada cardíaca, problemas obstétricos e AVC foram os que mais levaram ao desvio.",
    },
  ],
};
