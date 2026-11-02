// Missão 2 (Sistemas) · Voo 1 — Pulmões, oxigênio e hipóxia (o número do voo é definido em secoes.ts).
// 02/11/2026: título trocado de "Respiração e hipóxia" para "Pulmões, oxigênio e hipóxia", com autorização do autor
//   (padrão dos títulos da missão Sistemas); conteúdo intacto; hash refeito.
// Conteúdo reorganizado em narrativa técnica contínua, com conceitos encadeados e destaques.
// Valores de tempo de consciência útil: FAA Advisory Circular 61-107 (tabela de TUC).
// Padrão de mídias (27/10/2026): recursos posicionados por parágrafo; tabelas-resumo montadas a partir do próprio texto;
// animações esquemáticas (cascata do oxigênio, hiperventilação). Fotos e vídeo do autor (pessoas fictícias): topicos/m2v1-*.jpg; m2v1-5-oxigenio é quadro do vídeo enviado em 28/10/2026.
// REVISÃO 30/10/2026 (foco no organismo, pedido do autor): tabela "Sistemas do corpo mais atingidos" montada só com
//   dados já registrados neste voo.

// ADAPTAÇÃO AO MODELO DE SISTEMAS (02/11/2026, autorizada pelo autor; docs/modelo-sistemas.md): tabela "O que muda em
//   altitude" no tópico I; tópicos VI a IX escritos (asma e DPOC, apneia do sono, pneumotórax, simulação de altitude);
//   tabela de sistemas do corpo movida para o fim do voo; perguntas do formulário de liberação em
//   src/data/liberacao/respiratorio.ts. Fontes:
// - British Thoracic Society, Clinical Statement on air travel for passengers with respiratory disease (Coker RK et al.,
//   Thorax 2022;77(4):329-50; doi 10.1136/thoraxjnl-2021-218110): cabine até 2.438 m (8.000 ft), SaO2 > 90% no saudável;
//   gás em espaço fechado expande cerca de 38% a 2.438 m; teste de hipóxia com 15% de O2; PaO2 ≥ 6,6 kPa (50 mmHg) ou
//   SpO2 ≥ 85% sem O2, abaixo disso O2 recomendado, titulado para ≥ 85%; SpO2 em repouso > 95% em geral sem O2; DPOC
//   com SpO2 ≤ 95%, MRC ≥ 3 ou dessaturação < 84% na caminhada: considerar o teste; doença intersticial com SpO2 < 95% no
//   esforço; CVF < 1 L; fluxos de 2 L/min, + 2 L/min para quem usa O2 domiciliar; concentradores raramente > 3 L/min
//   contínuos; pneumonia com SpO2 < 94%: adiar 7 dias; TVP ou TEP recentes: 2 semanas; pneumotórax: 7 dias após
//   resolução completa no raio X; fechado e não tratado em geral impede; toracotomia com pleurodese sem restrição extra;
//   VATS com recorrência cerca de 4 vezes maior; cirurgia torácica: 4 semanas após retirar o dreno (2 se essencial);
//   biópsia percutânea, procedimento pleural e broncoscopia com biópsia: 1 semana (da resolução, se houve pneumotórax);
//   asma e DPOC: remédios e espaçador na bagagem de mão, alívio à mão, caneta de adrenalina acessível, asma grave com
//   corticoide oral de emergência combinado com o especialista; DPOC: prudente evitar voar 6 semanas após exacerbação
//   (poucos dados); só voar estável e com alívio no uso habitual; apneia: CPAP na bagagem de mão com carta, aprovação
//   da companhia, voos diurnos, CPAP a bordo em voo noturno, sem álcool e sedativos 12 h antes e durante, baterias para
//   1,5 vez a duração da viagem.
// - FAA, Guide for Aviation Medical Examiners: Pleura and Pleural Cavity (pneumotórax traumático: emitir 3 meses após a
//   resolução; espontâneo: decisão da FAA, resolução no raio X e sem bolhas; repetido: só após cirurgia, em geral 3 meses
//   depois); Asthma (CACI Asthma Worksheet: sintomas ≤ 2 dias/semana; ≤ 2 consultas por exacerbação e ≤ 2 cursos de
//   corticoide oral por ano; sem internação no último ano; VEF1 e CVF ≥ 80% antes do broncodilatador; aceitos LABA,
//   corticoide inalado, montelucaste e SABA; anticorpos monoclonais não aceitos no CACI); COPD (disposition table: sempre
//   adiar para a FAA; autorização especial com SpO2 ≥ 96% em repouso, VEF1 pós-BD ≥ 61%, caminhada de 6 min com queda de
//   1–3% e ≥ 400 m, até 3 remédios, sem corticoide oral diário); Obstructive Sleep Apnea (desqualificante até tratamento
//   eficaz; > 90% com IMC ≥ 40 têm AOS que exige tratamento; até 30% com AOS têm IMC < 30; fatores de risco; alto risco:
//   90 dias para responder; sintomas com risco imediato: adiar); 14 CFR 61.53 (proibição de atuar com deficiência médica).
// - ANAC, RBAC 67, 67.81(a)(1)–(7) (registro em src/lib/cma.ts): asma, doença crônica, doença ativa, pneumotórax não
//   resolvido, doença bolhosa; 67.85(a) corticoide; 67.15(c) diminuição da aptidão e 67.71(c) condição não prevista
//   (numeração conferida na Emenda 05 em 02/11/2026: mesma das alíneas citadas). Apneia do sono: o texto da Emenda 05
//   (Subparte C) não cita apneia nem sono; entra por 67.71(c). Exigências para a 2ª classe [confirmar na referência]:
//   o texto consultado da Subparte D termina em 67.117.
// Descongelado e recongelado em 02/11/2026 (pedido do autor, "Resolva tudo"): só a confirmação da apneia no RBAC 67.
// - CAA da Nova Zelândia, Medical Manual, Part 3, Spontaneous (Primary) Pneumothorax: sem cirurgia, relevante se < 5 anos
//   (Classe 1) ou < 3 anos (Classe 2); recorrência sem cirurgia dificilmente certificada.
// - FAA, Guia do AME, Pharmaceuticals/sleep aids (registro em src/lib/cma-internacional.ts): uso diário de indutor do
//   sono não permitido.
// - MEDIF: formulário médico das companhias aéreas (ex.: SWISS, lx_medif-form_en.pdf).
// 02/11/2026: 8 fotos dos tópicos VI a IX (topicos/m2v1-6..9-*.jpg, pessoas fictícias), no padrão do app (1.600 × 893 px);
//   borrados o número da poltrona e o rótulo do batom (bombinha), os painéis e a dragona (sonolência) e a marca do
//   monitor (teste). Voo congelado de novo.
// 02/11/2026: raio X do pneumotórax trocado com autorização do autor (imagem nova com linha pleural e faixa sem
//   desenho pulmonar); legenda passa a nomear o achado; hash refeito.

import type { Capitulo } from '../tipos';
import { liberacaoRespiratorio } from '../liberacao/respiratorio';

export const hipoxia: Capitulo = {
  numero: 3,
  titulo: 'Pulmões, oxigênio e hipóxia',
  tempoLeituraMin: 45,
  topicos: [
    {
      id: '3.1',
      titulo: 'Transporte de oxigênio',
      pergunta: 'O que acontece com o oxigênio do ar até chegar ao cérebro?',
      conteudo: {
        texto: [
          "Respirar é só o começo. Para chegar ao cérebro, o oxigênio percorre quatro etapas: **ar, alvéolo, sangue e tecido**. Em altitude, o ar continua com cerca de 21% de oxigênio, mas sua **pressão parcial** cai (Veja M1V1 - II), e o empurrão que leva o gás para dentro do corpo enfraquece.",
          "Nos **alvéolos**, pequenos sacos no fim das vias aéreas, o oxigênio atravessa a **membrana alvéolo-capilar** e entra no sangue. Ali, a **hemoglobina** das hemácias o carrega até os tecidos, e a circulação precisa levá-lo até onde ele é usado.",
          "Ao nível do mar, a **pressão alveolar de oxigênio** fica perto de **100 mmHg**. A 8.000 ft (2.400 m), cai para **65 a 70 mmHg**, e a saturação de pessoas saudáveis costuma ficar entre **90% e 93%**, conforme a resposta da respiração.",
          "A **curva de dissociação da oxi-hemoglobina** explica o perigo: no início, a saturação resiste; depois de certo ponto, cada nova queda de pressão derruba a saturação cada vez mais rápido. Altitude, tempo de exposição, respiração e doenças mudam essa resposta. Descobrir em qual das quatro etapas o oxigênio falhou é o primeiro passo para corrigir.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, midia: 'animacao-cascata' },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-1-alveolos.jpg'), legenda: 'Nos alvéolos, cachos de pequenos sacos envolvidos por capilares, o oxigênio passa do ar para o sangue.' } },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m2v1-1-oximetro.jpg'), legenda: 'O oxímetro de dedo mostra a saturação: em cruzeiro, um pouco abaixo da do solo em pessoas saudáveis.' } },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'O que muda em altitude',
              colunas: ['Fator do voo', 'O que acontece no pulmão', 'Quem é mais vulnerável'],
              linhas: [
                ['Menos oxigênio', 'A 8.000 ft, a pressão alveolar de oxigênio cai para 65 a 70 mmHg; o saudável satura de 90% a 93%', 'DPOC, doença intersticial e fraqueza dos músculos da respiração (Veja M2V1 - IX)'],
                ['Gás que expande', 'Ar preso numa cavidade fechada cresce cerca de 38% a 8.000 ft', 'Pneumotórax e bolhas no pulmão (Veja M2V1 - VIII)'],
                ['Sono a bordo', 'As pausas da apneia somam-se à saturação mais baixa da cabine', 'Apneia do sono (Veja M2V1 - VII)'],
                ['Doença aguda recente', 'Pneumonia, trombose e embolia deixam pouca reserva', 'Quem teve o episódio nas últimas semanas (Veja M2V1 - IX)'],
              ],
            },
          },
          { paragrafo: 4, midia: 'simulador-o2' },
        ],
      },
    },
    {
      id: '3.2',
      titulo: 'Tipos de hipóxia',
      pergunta: 'Falta de oxigênio é sempre por causa da altitude?',
      conteudo: {
        texto: [
          "**Hipóxia** é a falta de oxigênio nos tecidos, por oferta ou por uso insuficiente. A altitude é só uma das causas: a falha pode acontecer em qualquer etapa entre o ar e a célula. Por isso a medicina aeroespacial a divide em **quatro mecanismos**, que podem se somar.",
          "Na **hipóxia hipóxica**, falta pressão de oxigênio no pulmão: é a hipóxia clássica da altitude sem proteção. Na **hipóxia hipêmica**, o sangue perde a capacidade de carregar oxigênio, como na **anemia** ou na **intoxicação por monóxido de carbono**, que se liga fortemente à hemoglobina e ainda dificulta a entrega do oxigênio aos tecidos.",
          "Na **hipóxia estagnante**, o sangue não chega com o fluxo necessário, como nos distúrbios circulatórios ou nas acelerações que reduzem o sangue no cérebro (Veja M1V7). Na **hipóxia histotóxica**, o oxigênio chega, mas a célula não consegue usá-lo; o exemplo clássico é o **cianeto**.",
          "Os mecanismos se somam. Um piloto anêmico, ou exposto a monóxido de carbono, tem menos reserva para enfrentar a altitude. Em aviões a pistão, **vazamentos do escapamento** são um risco real, mesmo perto do solo.",
          "Reconhecer o mecanismo orienta a resposta. O oxigênio suplementar ajuda em muitas situações, mas **não substitui corrigir a causa**: pressurização falha, cabine contaminada, anemia, problema circulatório ou exposição tóxica.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-2-fumaca.jpg'), legenda: 'Fumaça na cabine: monóxido de carbono e outros tóxicos podem roubar o oxigênio do sangue e das células.' } },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Os quatro mecanismos da hipóxia',
              colunas: ['Tipo', 'Onde falha', 'Exemplos'],
              linhas: [
                ['Hipóxica', 'Pressão de oxigênio no pulmão', 'Altitude sem proteção'],
                ['Hipêmica', 'Transporte pelo sangue', 'Anemia, monóxido de carbono'],
                ['Estagnante', 'Fluxo de sangue', 'Distúrbios circulatórios, acelerações'],
                ['Histotóxica', 'Uso pela célula', 'Cianeto'],
              ],
            },
          },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v1-2-escapamento.jpg'), legenda: 'Inverno num monomotor: gás do escapamento entrando pela ventilação do aquecedor causa sonolência e dor de cabeça.' } },
          { paragrafo: 5, midia: 'classificar-hipoxia' },
        ],
      },
    },
    {
      id: '3.3',
      titulo: 'Tempo de consciência útil',
      pergunta: 'Quanto tempo uma pessoa continua lúcida sem oxigênio a 35.000 ft?',
      conteudo: {
        texto: [
          "O **tempo de consciência útil (TCU)** é o tempo que uma pessoa ainda tem, depois que o oxigênio cai, para perceber o problema e agir certo. **Não é o tempo até desmaiar**: o julgamento e a coordenação falham antes.",
          "Sem oxigênio, numa exposição súbita, o TCU encolhe com a altitude: cerca de **20 a 30 minutos a 18.000 ft**, **3 a 5 minutos a 25.000 ft**, **1 a 2 minutos a 30.000 ft**, **30 segundos a 1 minuto a 35.000 ft** e **15 a 20 segundos a 40.000 ft**. São estimativas, não prazos garantidos.",
          "Esforço físico, fadiga, doenças e diferenças individuais encurtam esse tempo. **Numa descompressão rápida, o TCU pode cair para cerca da metade.**",
          "Por isso a regra é imediata: diante de perda de pressurização, **coloque e ajuste a própria máscara de oxigênio antes de qualquer outra tarefa**, depois siga os procedimentos da aeronave. Cada segundo de dúvida consome o tempo disponível.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v1-3-cronometro.jpg'), legenda: 'Quando o alarme acende, o relógio passa a correr contra o piloto: o tempo útil é medido em segundos ou minutos.' } },
          { paragrafo: 2, midia: 'grafico-tuc' },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m2v1-3-descompressao-cabine.jpg'), legenda: 'Descompressão rápida na cabine de comando: névoa, papéis voando e alarmes. O tempo útil cai pela metade, e a máscara vem antes de tudo.' } },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v1-3-mascara-primeiro.jpg'), legenda: 'Alarme de cabine: a máscara de colocação rápida vem antes de qualquer outra tarefa.' } },
        ],
      },
    },
    {
      id: '3.4',
      titulo: 'Sinais e sintomas',
      pergunta: 'Como perceber que está faltando oxigênio?',
      conteudo: {
        texto: [
          "A hipóxia é traiçoeira: **começa sem dor e sem falta de ar clara**. O julgamento, a atenção e a coordenação pioram enquanto a pessoa ainda se sente bem. Essa distância entre o que se sente e o que se consegue fazer é o maior risco a bordo.",
          "Os sintomas variam: **euforia, tontura, calor, formigamento e alterações da visão**. Quem está ao lado pode notar confusão, lentidão, respiração alterada ou lábios azulados, mas **a ausência de cianose não exclui hipóxia**.",
          "A **visão noturna** é das mais sensíveis e pode piorar já em altitudes moderadas. Depois sofrem a memória recente, o raciocínio e os movimentos finos. No treinamento em câmara, cada pessoa aprende a reconhecer o próprio conjunto de sintomas: a **assinatura individual de hipóxia**.",
          "A conduta é a mesma do tempo de consciência útil (Veja M2V1 - III): **ao suspeitar de hipóxia, restabelecer o oxigênio na hora**, sem esperar sinais tardios.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v1-4-euforia.jpg'), legenda: 'Na câmara, sem máscara, o aluno sorri e acha que está tudo bem enquanto a escrita desanda: a armadilha da hipóxia.' } },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-4-cianose.jpg'), legenda: 'Lábios e unhas azulados denunciam pouco oxigênio no sangue, mas a ausência deles não exclui a hipóxia.' } },
          { paragrafo: 3, midia: 'simulador-visao' },
        ],
      },
    },
    {
      id: '3.5',
      titulo: 'Hiperventilação',
      pergunta: 'Respirar demais também pode fazer mal?',
      conteudo: {
        texto: [
          "**Hiperventilar** é respirar além do necessário e eliminar **gás carbônico** demais. Ansiedade, dor, estresse e a própria altitude podem provocá-lo. A tontura e o formigamento lembram a hipóxia, mas o mecanismo é outro.",
          "A queda do gás carbônico no sangue, a **hipocapnia**, contrai os vasos do cérebro e reduz o fluxo de sangue nele, além de causar **alcalose respiratória**. Nos casos intensos, o cálcio ionizado cai e surgem **formigamento em volta da boca e nas mãos, espasmos musculares** e mal-estar.",
          "No voo, **hipóxia e hiperventilação podem coexistir ou ser confundidas**. Tratar hipóxia como ansiedade atrasa uma intervenção vital. Por isso, sintoma inexplicado em altitude pede primeiro a checagem do oxigênio e da pressurização.",
          "A ordem é fixa: **oxigênio adequado primeiro, sistema verificado e altitude corrigida, se preciso**. Só depois de excluir a hipóxia vale orientar a respiração mais lenta. **Respirar em saco de papel não é seguro** diante dessa dúvida.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-5-maos.jpg'), legenda: 'Mãos tensas e dedos em leve espasmo: o formigamento da hiperventilação lembra o da hipóxia.' } },
          { paragrafo: 2, midia: 'animacao-hiperventilacao' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Hipóxia ou hiperventilação?',
              colunas: ['', 'Hipóxia', 'Hiperventilação'],
              linhas: [
                ['Causa', 'Falta de oxigênio nos tecidos', 'Gás carbônico eliminado demais'],
                ['Sintomas em comum', 'Tontura e formigamento', 'Tontura e formigamento'],
                ['Sinais próprios', 'Julgamento e visão pioram sem alarde', 'Formigamento em volta da boca, espasmos'],
                ['Primeira conduta', 'Oxigênio adequado e checar o sistema', 'Só depois de excluir a hipóxia: respirar mais devagar'],
              ],
            },
          },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v1-5-oxigenio.jpg'), legenda: 'Na dúvida entre ansiedade e hipóxia, primeiro o oxigênio; só depois se orienta a respiração mais lenta.' } },
        ],
      },
    },
    {
      id: '3.6',
      titulo: 'Asma e DPOC',
      pergunta: 'Quem tem asma ou DPOC pode voar com segurança?',
      conteudo: {
        texto: [
          "Na **asma**, os brônquios inflamam e se fecham em crises, que vão e voltam. Na **DPOC**, que reúne a **bronquite crônica** e o **enfisema**, a passagem do ar fica limitada de forma permanente e o pulmão perde reserva. A cabine é pressurizada até no máximo **8.000 ft (2.438 m)**, altitude em que a pessoa saudável mantém a saturação **acima de 90%**. Quem já sai do solo com a saturação baixa começa o voo mais perto do trecho da curva em que **cada queda de pressão derruba mais a saturação** (Veja M2V1 - I).",
          "Na DPOC, o alerta vem dos números do solo. **Saturação em repouso de 95% ou menos**, falta de ar nos esforços do dia a dia (**escala MRC 3 ou mais**) ou queda **abaixo de 84%** numa caminhada indicam que a pessoa pode precisar de **oxigênio a bordo** e deve fazer o teste de simulação de altitude (Veja M2V1 - IX). No enfisema, o ar preso em **bolhas** se expande cerca de **38%** a 8.000 ft (Veja M1V1 - II). Na asma, o risco é a **crise longe do atendimento**, sem poder descer na hora.",
          "Para o **passageiro**, a regra é a estabilidade: voar só com a doença **estável** e com o uso da bombinha de alívio **no nível de sempre**. Depois de uma **piora da DPOC**, a British Thoracic Society considera prudente esperar **6 semanas**, embora os dados sejam poucos. Para o **tripulante**, as regras são mais duras. No RBAC 67, a **asma** está entre as condições que tornam o candidato **não apto** na 1ª classe, e a **doença pulmonar crônica** também, salvo investigação que mostre baixa chance de afetar o voo. A FAA emite o certificado para a asma **controlada**: sintomas em até **2 dias por semana**, no máximo **2 consultas** por crise e **2 cursos de corticoide oral** por ano, **nenhuma internação** no último ano e **VEF1 e CVF de 80% ou mais** do previsto antes do broncodilatador. Na DPOC, a decisão é sempre da FAA.",
          "Voar sem liberação cobra do corpo e da licença. Uma **crise em voo** soma o fechamento dos brônquios ao ar mais pobre da cabine, longe de um pronto-socorro. O tripulante responde também à autoridade: pela FAA, **não pode atuar como tripulante** quem sabe, ou deveria saber, de uma condição ou de um tratamento que o impede de cumprir os requisitos do certificado; pela ANAC, quem percebe uma **diminuição da aptidão** não deve exercer as prerrogativas da licença.",
          "Toda a medicação, inclusive o **espaçador**, vai na **bagagem de mão**, com a bombinha de alívio **à mão** durante o voo. Quem usa caneta de **adrenalina** a mantém acessível, e quem tem asma grave combina com o especialista levar **corticoide oral** para uma emergência. Para o tripulante, a FAA aceita **corticoide inalado**, **broncodilatador de longa ação**, **montelucaste** e o **salbutamol** de alívio; os **anticorpos monoclonais** ficam fora do caminho simplificado. No RBAC 67, o **corticoide oral contínuo** passa pelo julgamento do examinador.",
          "**Não voe hoje** com crise em curso, com uso da bombinha acima do habitual ou, na DPOC, com piora nas últimas 6 semanas. **Converse com o médico antes de comprar a passagem** se a saturação em repouso for de 95% ou menos ou se a falta de ar aparecer em esforços pequenos. O médico confere a espirometria, a saturação, as crises do último ano e, se preciso, pede o teste de simulação de altitude.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-6-bombinha.jpg'), legenda: 'Bombinha com espaçador na bagagem de mão e ao alcance durante todo o voo.' } },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · asma e DPOC',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Asma controlada', 'Pode voar, com a bombinha na bagagem de mão', 'ANAC: não apto na 1ª classe; FAA: emite se cumprir os critérios de controle'],
                ['Asma em crise ou com alívio acima do habitual', 'Não voar até estabilizar', 'Não voar'],
                ['DPOC estável, saturação acima de 95%', 'Pode voar', 'FAA: decisão da FAA; ANAC: não apto, salvo investigação favorável'],
                ['DPOC com saturação de 95% ou menos', 'Teste de simulação de altitude e oxigênio, se indicado', 'FAA: autorização especial exige 96% ou mais em repouso'],
                ['Piora da DPOC há menos de 6 semanas', 'Evitar voar', 'Não voar'],
              ],
            },
          },
          { paragrafo: 3, midia: 'controle-asma' },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Remédios e voo · asma e DPOC',
              colunas: ['Remédio', 'Para que serve', 'Tripulante'],
              linhas: [
                ['Salbutamol', 'Alívio rápido da crise', 'FAA: aceito'],
                ['Corticoide inalado', 'Controle da inflamação dos brônquios', 'FAA: aceito'],
                ['Broncodilatador de longa ação', 'Mantém os brônquios abertos', 'FAA: aceito'],
                ['Montelucaste', 'Controle da asma', 'FAA: aceito'],
                ['Corticoide oral', 'Tratamento das crises', 'FAA: até 2 cursos por ano; ANAC: uso contínuo a critério'],
                ['Anticorpo monoclonal', 'Asma grave', 'FAA: fora do caminho simplificado'],
              ],
            },
          },
          { paragrafo: 6, figura: { imagem: require('@/assets/images/topicos/m2v1-6-espirometria.jpg'), legenda: 'A espirometria mede o VEF1 e a CVF: para a FAA, 80% ou mais do previsto antes do broncodilatador.' } },
        ],
      },
    },
    {
      id: '3.7',
      titulo: 'Apneia do sono',
      pergunta: 'Por que a apneia do sono preocupa na poltrona e na cabine de comando?',
      conteudo: {
        texto: [
          "Na **apneia obstrutiva do sono**, a garganta se fecha várias vezes durante o sono, a respiração para e o oxigênio do sangue cai a cada pausa. O sono fica picado, e o dia seguinte traz **sonolência**, desatenção e erros. O peso conta muito: pela FAA, mais de **90%** de quem tem **IMC de 40 ou mais** tem apneia que exige tratamento, mas até **30%** de quem tem apneia tem **IMC abaixo de 30**. Queixo recuado, língua ou amígdalas grandes, **pressão difícil de controlar** com mais de dois remédios, **diabetes** e **fibrilação atrial** também aumentam o risco.",
          "No avião, dois problemas se somam. Dormir a bordo junta as **pausas da apneia** à **saturação já mais baixa da cabine** (Veja M2V1 - I); por isso o CPAP deve ser usado nos voos noturnos. No tripulante, a apneia sem tratamento é um problema de **fadiga** (Veja M2V8): a sonolência acompanha o piloto até a cabine de comando.",
          "O **passageiro** com apneia pode voar, desde que leve o tratamento: o **CPAP** vai na bagagem de mão, com carta do médico e **aprovação prévia da companhia** para o aparelho e as baterias. Para o **tripulante**, a FAA considera a apneia **desqualificante** até que se demonstre **tratamento eficaz**; quem trata recebe uma autorização especial com acompanhamento, e quem o examinador classifica como **alto risco** tem **90 dias** para enviar a avaliação do sono. Sintomas que ameaçam a segurança na hora fazem o examinador **adiar** o certificado. O RBAC 67 não traz item próprio para a apneia; ela entra pela regra das condições que afetam a segurança do voo, a critério do examinador.",
          "Voar com apneia sem tratamento é voar com **sono acumulado**, que derruba a atenção e os reflexos. O tripulante que sabe da condição e voa sem tratá-la descumpre a regra que proíbe atuar com condição médica que o impeça de cumprir os requisitos do certificado (FAA) ou com a aptidão diminuída (ANAC).",
          "Prefira **voos diurnos** e evite dormir neles; nos voos noturnos, **use o CPAP a bordo**, sempre o seu próprio aparelho. Fique sem **álcool e calmantes** por **12 horas** antes e durante a viagem, e leve **baterias para 1,5 vez** a duração da viagem. Para o tripulante, remédio para dormir tem regra própria: a FAA não permite o uso diário de indutores do sono (Veja M3V2).",
          "**Não voe como tripulante** com apneia diagnosticada e sem tratamento, nem com sonolência que já atrapalha o dia. O **passageiro** que ronca alto, acorda cansado e cochila sem querer deve procurar avaliação antes de uma viagem longa. O médico confere o diagnóstico, o **uso do CPAP registrado pelo aparelho** e a sonolência durante o dia.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-7-cpap-aviao.jpg'), legenda: 'No voo noturno, o CPAP vai a bordo e é usado durante o sono, com baterias para toda a viagem.' } },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · apneia do sono',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Apneia tratada com CPAP', 'Pode voar, com o CPAP na bagagem de mão', 'FAA: autorização especial com acompanhamento; ANAC: a critério do examinador'],
                ['Apneia sem tratamento', 'Voos diurnos, sem álcool nem calmantes', 'FAA: desqualificante até tratamento eficaz'],
                ['Alto risco, sem diagnóstico', 'Procurar avaliação antes de viagem longa', 'FAA: 90 dias para enviar a avaliação'],
              ],
            },
          },
          { paragrafo: 5, midia: 'baterias-cpap' },
          { paragrafo: 6, figura: { imagem: require('@/assets/images/topicos/m2v1-7-sonolencia.jpg'), legenda: 'Na cabine de comando, a apneia sem tratamento vira sono acumulado, desatenção e erros.' } },
        ],
      },
    },
    {
      id: '3.8',
      titulo: 'Pneumotórax',
      pergunta: 'Quanto tempo esperar para voar depois de um pneumotórax?',
      conteudo: {
        texto: [
          "**Pneumotórax** é ar entre o pulmão e a parede do tórax. Esse ar não tem saída, e o pulmão murcha do lado afetado. Pode surgir **sozinho**, pela ruptura de pequenas **bolhas** na superfície do pulmão, depois de um **trauma** ou depois de procedimentos no tórax.",
          "Em altitude, o problema cresce. Pela **lei de Boyle** (Veja M1V1 - II), o gás preso numa cavidade fechada se expande cerca de **38%** a 8.000 ft, a altitude máxima de uma cabine. O ar do pneumotórax ocupa mais espaço, **comprime o pulmão** e pode piorar a **falta de ar** e a **dor** em pleno voo, longe de quem possa drenar o tórax.",
          "Para o **passageiro**, a British Thoracic Society é clara: **não voar até 7 dias depois da resolução completa no raio X**. Pneumotórax fechado e não tratado, em geral, impede o voo. Depois de **toracotomia com pleurodese cirúrgica**, a recorrência é tão baixa que não há restrição extra; na **videotoracoscopia**, a recorrência relatada é cerca de **4 vezes maior**. Depois de **cirurgia torácica**, a espera é de **4 semanas** após a retirada do dreno nas viagens não essenciais, ou **2 semanas** se a viagem for essencial. Depois de **biópsia de pulmão**, procedimento na pleura ou **broncoscopia com biópsia**, **1 semana**, contada da resolução se tiver havido pneumotórax.",
          "Para o **tripulante**, o prazo é mais longo. No RBAC 67, **pneumotórax não resolvido** torna o candidato **não apto**, e a doença bolhosa do pulmão fica a critério do examinador. Pela FAA, o pneumotórax **espontâneo** exige raio X com a resolução e a confirmação de que **não há bolhas** com risco de nova crise, e a decisão é da própria FAA; quem teve **mais de um episódio** só volta depois da cirurgia que corrige a causa, em geral **3 meses** depois dela. No **traumático**, a FAA emite o certificado **3 meses depois da resolução**. A autoridade da Nova Zelândia considera relevante, sem cirurgia, o episódio de menos de **5 anos** na Classe 1 e de menos de **3 anos** na Classe 2.",
          "Voar com pneumotórax não resolvido é levar para a cabine um **volume de ar que cresce** com a subida. Nenhum remédio impede essa expansão: a proteção é **cumprir o prazo** e ter o **raio X de controle** em mãos. Para o tripulante, voar nessas condições descumpre a proibição de atuar com condição que impede os requisitos do certificado.",
          "**Não voe** com dor no peito ou falta de ar súbita, com pneumotórax ainda visível no raio X ou antes do prazo depois de cirurgia, biópsia ou broncoscopia. O médico registra a **data da resolução no raio X**, o tipo de tratamento e se houve recorrência: é essa data que conta os dias.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v1-8-raio-x.jpg'), legenda: 'No raio X, a linha branca fina é a borda do pulmão colapsado; por fora dela, a faixa escura sem desenho do pulmão é o ar do pneumotórax.' } },
          { paragrafo: 2, midia: 'grafico-boyle' },
          { paragrafo: 3, midia: 'prazo-voo-pulmao' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · pneumotórax',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Resolvido no raio X', '7 dias depois da resolução', 'FAA: espontâneo, decisão da FAA sem bolhas; traumático, 3 meses'],
                ['Não resolvido', 'Não voar', 'Não apto (RBAC 67)'],
                ['Mais de um episódio', '7 dias depois de cada resolução', 'FAA: só depois da cirurgia, em geral 3 meses'],
                ['Cirurgia torácica', '4 semanas após retirar o dreno (2 se essencial)', 'A critério do examinador [confirmar na referência]'],
                ['Biópsia de pulmão ou broncoscopia com biópsia', '1 semana', '[confirmar na referência]'],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m2v1-8-consulta.jpg'), legenda: 'Com o raio X de controle normal e o prazo cumprido, o passageiro pode voltar a voar.' } },
        ],
      },
    },
    {
      id: '3.9',
      titulo: 'Simulação de altitude',
      pergunta: 'Como saber, no solo, se vou precisar de oxigênio no avião?',
      conteudo: {
        texto: [
          "O **teste de simulação de altitude**, ou teste de hipóxia, mostra no solo como o corpo vai reagir na cabine. A pessoa respira uma mistura com **15% de oxigênio**, que reproduz o ar inspirado a **8.000 ft (2.438 m)**, enquanto se medem a **saturação** e, às vezes, o oxigênio no sangue arterial.",
          "A maioria das pessoas não precisa dele: com saturação **acima de 95%** em repouso, em geral não há necessidade de oxigênio a bordo. O teste é pensado para quem tem **DPOC** com saturação em repouso de **95% ou menos**, falta de ar nos esforços do dia a dia ou queda **abaixo de 84%** na caminhada; para quem tem **doença intersticial** e satura **abaixo de 95%** no esforço; e para quem tem **fraqueza dos músculos da respiração** com **capacidade vital forçada abaixo de 1 litro**.",
          "O resultado decide o oxigênio. Com **PaO2 de 6,6 kPa (50 mmHg) ou mais**, ou **saturação de 85% ou mais**, o oxigênio a bordo **não é necessário**. Abaixo disso, ele é **recomendado**, ajustado para manter a saturação em pelo menos **85%** no adulto. Sem o teste, alguns casos já têm fluxo definido, em geral **2 litros por minuto**, e quem usa oxigênio em casa **soma 2 litros por minuto** ao fluxo de sempre. Concentradores portáteis raramente passam de **3 litros por minuto** contínuos.",
          "Algumas situações pedem só tempo. Com **pneumonia** e saturação no solo **abaixo de 94%**, a viagem não essencial espera **7 dias**. Depois de **trombose venosa profunda ou embolia pulmonar**, a espera é de **2 semanas**.",
          "Voar precisando de oxigênio sem tê-lo combinado é arriscar a **hipóxia** que a cabine provoca justamente em quem tem menos reserva (Veja M2V1 - IV). Oxigênio e aparelhos precisam de **aprovação prévia da companhia**, que costuma pedir o **formulário médico (MEDIF)** preenchido pelo médico. Para o tripulante, a lógica é outra: na DPOC, a FAA exige saturação em repouso de **96% ou mais** para a autorização especial.",
          "**Não embarque** sem o oxigênio combinado se o teste mostrou a necessidade. Na decisão, o médico usa a saturação em repouso, a resposta ao esforço, o resultado do teste e o **fluxo que manteve a saturação em 85%**; é esse número que vai para o MEDIF.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v1-9-teste.jpg'), legenda: 'No teste de hipóxia, a mistura com 15% de oxigênio reproduz a cabine a 8.000 ft enquanto o oxímetro mede a saturação.' } },
          { paragrafo: 3, midia: 'teste-hipoxia' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · oxigênio e doenças agudas',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Saturação em repouso acima de 95%', 'Em geral, sem oxigênio a bordo', 'Sem restrição por esse dado'],
                ['Teste com saturação de 85% ou mais', 'Sem oxigênio a bordo', 'DPOC: a FAA exige 96% ou mais em repouso'],
                ['Teste com saturação abaixo de 85%', 'Oxigênio a bordo, combinado com a companhia', 'Decisão da autoridade'],
                ['Pneumonia com saturação abaixo de 94%', 'Esperar 7 dias', 'Não apto enquanto ativa (RBAC 67)'],
                ['Trombose ou embolia recentes', 'Esperar 2 semanas', '[confirmar na referência]'],
              ],
            },
          },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m2v1-9-concentrador.jpg'), legenda: 'Com o concentrador portátil aprovado pela companhia, o oxigênio segue com o passageiro durante o voo.' } },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Sistema nervoso central', 'Julgamento, atenção e coordenação falham antes de a pessoa notar; depois, memória, raciocínio e movimentos finos', 'Máscara antes de qualquer tarefa; conhecer a própria assinatura de hipóxia'],
                ['Visão', 'A visão noturna piora já em altitudes moderadas', 'Oxigênio à noite acima de 5.000 ft em voo não pressurizado'],
                ['Sangue', 'Anemia e monóxido de carbono reduzem o oxigênio transportado', 'Corrigir a causa; atenção a vazamentos do escapamento'],
                ['Circulação', 'Fluxo insuficiente, como nas acelerações, causa hipóxia estagnante', 'Veja M1V7'],
                ['Respiratório', 'A hiperventilação baixa o gás carbônico e causa formigamento e espasmos', 'Oxigênio primeiro; só depois respirar mais devagar'],
                ['Pulmão e pleura', 'Ar preso no pneumotórax e nas bolhas cresce cerca de 38% a 8.000 ft', 'Cumprir o prazo depois da resolução no raio X'],
                ['Vias aéreas', 'Crise de asma ou piora da DPOC longe do atendimento', 'Voar com a doença estável e a bombinha na bagagem de mão'],
                ['Sono e atenção', 'A apneia sem tratamento traz sonolência e erros', 'CPAP; sem álcool nem calmantes 12 h antes do voo'],
                ['Pele e mucosas', 'Lábios azulados podem aparecer, mas sua falta não exclui hipóxia', 'Checar oxigênio e pressurização diante de qualquer sintoma'],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      pergunta: 'Por que há menos oxigênio disponível em altitude?',
      opcoes: [
        'A porcentagem de oxigênio no ar diminui',
        'A pressão parcial de oxigênio diminui',
        'O nitrogênio ocupa o lugar do oxigênio',
        'A temperatura baixa destrói o oxigênio',
      ],
      correta: 1,
      explicacao: 'O ar continua com cerca de 21% de oxigênio; o que cai é a pressão, e com ela a pressão parcial de oxigênio.',
      topico: '3.1',
    },
    {
      pergunta: 'Intoxicação por monóxido de carbono causa qual tipo de hipóxia?',
      opcoes: ['Hipóxica', 'Hipêmica', 'Estagnante', 'Histotóxica'],
      correta: 1,
      explicacao: 'O monóxido de carbono ocupa a hemoglobina, e o sangue passa a carregar menos oxigênio: hipóxia hipêmica.',
      topico: '3.2',
    },
    {
      pergunta: 'Qual é o tempo de consciência útil aproximado a 35.000 ft?',
      opcoes: ['De 5 a 10 minutos', 'De 3 a 5 minutos', 'De 30 segundos a 1 minuto', 'Menos de 5 segundos'],
      correta: 2,
      explicacao: 'A 35.000 ft, o tempo de consciência útil é de cerca de 30 segundos a 1 minuto.',
      topico: '3.3',
    },
    {
      pergunta: 'O que acontece com o tempo de consciência útil em uma descompressão rápida?',
      opcoes: ['Aumenta', 'Não muda', 'Pode cair para cerca da metade', 'Passa a depender só da temperatura'],
      correta: 2,
      explicacao: 'Na descompressão rápida, o tempo de consciência útil pode ser reduzido a cerca da metade.',
      topico: '3.3',
    },
    {
      pergunta: 'Qual é o principal perigo da hipóxia para quem está voando?',
      opcoes: [
        'Causar dor intensa imediata',
        'Tirar a capacidade de perceber o próprio problema',
        'Provocar sempre desmaio súbito',
        'Afetar apenas a visão',
      ],
      correta: 1,
      explicacao: 'A hipóxia altera o julgamento antes dos sinais visíveis, e a pessoa pode não perceber que está em perigo.',
      topico: '3.4',
    },
    {
      pergunta: 'Em voo, um tripulante sente tontura e formigamento. Qual é a primeira conduta?',
      opcoes: [
        'Respirar dentro de um saco de papel',
        'Esperar os sintomas passarem',
        'Oxigênio a 100% e checar o sistema',
        'Aumentar a altitude para economizar combustível',
      ],
      correta: 2,
      explicacao: 'Como hipóxia e hiperventilação se confundem, trata-se primeiro como hipóxia: oxigênio a 100%.',
      topico: '3.5',
    },
    {
      pergunta: 'Depois de uma piora da DPOC, quanto tempo a British Thoracic Society considera prudente esperar para voar?',
      opcoes: ['24 horas', '1 semana', '6 semanas', '6 meses'],
      correta: 2,
      explicacao: 'Depois de uma exacerbação da DPOC, parece prudente evitar voar por 6 semanas, embora os dados sejam poucos.',
      topico: '3.6',
    },
    {
      pergunta: 'Num voo noturno, o que a pessoa com apneia do sono deve fazer?',
      opcoes: ['Tomar um calmante para dormir bem', 'Usar o próprio CPAP a bordo', 'Ficar acordada a viagem toda', 'Despachar o CPAP na mala'],
      correta: 1,
      explicacao: 'O CPAP vai na bagagem de mão e deve ser usado nos voos noturnos; álcool e calmantes ficam de fora por 12 horas.',
      topico: '3.7',
    },
    {
      pergunta: 'Para o passageiro, quando é possível voar depois de um pneumotórax?',
      opcoes: ['Logo que a dor passar', '7 dias depois da resolução completa no raio X', '24 horas depois de retirar o dreno', 'Só depois de 1 ano'],
      correta: 1,
      explicacao: 'A British Thoracic Society recomenda não voar até 7 dias depois da resolução completa no raio X.',
      topico: '3.8',
    },
    {
      pergunta: 'No teste de simulação de altitude, a partir de que saturação o oxigênio a bordo não é necessário?',
      opcoes: ['75%', '80%', '85%', '99%'],
      correta: 2,
      explicacao: 'Com saturação de 85% ou mais (ou PaO2 de 6,6 kPa ou mais) no teste, o oxigênio a bordo não é necessário.',
      topico: '3.9',
    },
  ],
  liberacao: liberacaoRespiratorio,
};
