// Missão 2 (Sistemas) · Voo 5 — Labirinto e orientação espacial (o número do voo é definido em secoes.ts).
// Escrito no modelo de Sistemas (docs/modelo-sistemas.md), com o detalhamento prático do padrão do jet lag, em
// 04/11/2026, a pedido do autor ("Continue para o próximo voo"). Os tópicos da lista antiga (sistemas de orientação,
// ilusões, tipos de desorientação, prevenção, cinetose, vertigem) viraram 6 tópicos. As doenças do labirinto e a
// vertigem por pressão já estão no M2V3 - III; aqui entram resumidas, com remissão, para não repetir prazos.
//
// REGISTRO DE REVISÃO (04/11/2026) — fontes:
// - ICAO, Doc 8984, 3ª ed. (PDF enviado pelo autor): Part II, Cap. 1, 1.7.1–1.7.8 (orientação pelos olhos, ouvidos
//   internos e proprioceptores; o olho é confiável com bons pontos de referência; fatores das ilusões visuais: para-brisa,
//   chuva, névoa e poeira, ângulo da rampa, largura e comprimento da pista, luzes, inclinação da pista e do terreno, pouso
//   à noite sobre água ou terreno escuro, ilusão autocinética, white-out; canais semicirculares sentem rotação nos três
//   planos; otólitos informam a posição; curva lenta abaixo do limiar parece voo reto; inclinação introduzida devagar
//   passa despercebida; espiral da morte após curva coordenada prolongada, mais de 20 s; ilusão somatogravica: na
//   decolagem sem visibilidade, a aceleração parece nariz alto e o piloto empurra o manche). Part III, Cap. 12,
//   12.16.1–12.17.3 (para o piloto, vertigem é desorientação; sem referência visual, o labirinto pode enganar;
//   desorientação espacial pode ser fatal; muitos pilotos já tiveram episódios; o relato depende de reconhecer, avaliar o
//   risco, pressões sociais e econômicas e confiança no examinador; vertigem verdadeira é a sensação de girar; vertigem
//   alternobárica e fístula perilinfática; Ménière, neurite vestibular e vertigem posicional). Part I, Cap. 3, 3.1.16 e
//   Tabela I-3-1 (questionários de mais de 3.000 pilotos de linha, 1968 e 1988; incapacitações em voo relatadas: gastrointestinais 75%, ouvido 8%, desmaio 7%, cefaleia 6%, vertigem e
//   desorientação 4%). Part V, Cap. 2, itens 13–19 (automedicação: anti-histamínicos achados em necropsias de acidentes
//   fatais; demonstrar manobras com instrutor; desorientação à noite e com horizonte encoberto; vertigem por cintilação
//   com luz piscando de 4 a 20 vezes por segundo, hélice contra o sol e luz anticolisão nas nuvens: não olhar através da
//   hélice, variar a rotação e desligar a luz anticolisão nas nuvens avisando o controle).
// - ANAC, RBAC 67, Emenda 05: 67.97(d), 67.137(d) e 67.177(b) (sem transtornos permanentes dos aparelhos vestibulares;
//   transitório: não apto até se restabelecer). Detalhe no registro do M2V3.
// - FAA, AIM 8-1-5 (via angleofattack.com): prevenção só por referência visual a pontos fixos no solo ou instrumentos;
//   leans, Coriolis (a mais forte; evitar movimentos bruscos da cabeça), parafuso da morte, espiral da morte,
//   somatogravica, inversão, elevador; falso horizonte, autocinese; ilusões de pouso: pista estreita parece mais alto
//   (aproximação baixa), larga parece mais baixo (arredondamento alto); aclive parece mais alto (baixa), declive o
//   contrário; terreno sem detalhes, água e neve parecem mais alto (baixa); chuva no para-brisa parece mais alto, névoa
//   parece mais longe (baixa); entrar no nevoeiro parece cabrar (rampa mais íngreme); luzes de estrada confundidas com a
//   pista; luzes de aproximação fortes parecem mais perto (alta); inspecionar o aeroporto, usar rampa eletrônica ou VASI.
//   FAA, Airman Education, Spatial Disorientation: até 90% da orientação vem da visão; depois de 10 a 20 s de rotação
//   constante a sensação pode ser falsa; limiar de cerca de 2° por segundo; confiar nos instrumentos, esperar as
//   sensações passarem, passar os comandos e avisar o controle. CAMI, AM-400-03/1 (Spatial Disorientation: Why You
//   Shouldn't Fly By the Seat of Your Pants) e Spatial Disorientation: Visual Illusions: 5 a 10% dos acidentes da
//   aviação geral, 90% fatais; curva constante por mais de 20 s; demonstradores (cadeira de Bárány, GYRO); treinar e
//   manter proficiência por instrumentos antes de voar com menos de 3 milhas de visibilidade; à noite e com pouca
//   visibilidade, usar os instrumentos; conhecer a geografia; não tentar VFR com tempo piorando; passar os comandos ao
//   outro piloto, que raramente tem a mesma ilusão; instrumento de atitude de reserva. AC 60-4A: relatos de pilotos
//   (45% inclinaram para o lado oposto ao nivelar; 39% sentiram voo reto e nivelado na curva; 34% se confundiram
//   misturando referências externas e instrumentos; 29% sentiram girar para o lado oposto ao sair de curva subindo);
//   desorientação fatal em mais de 90% dos casos; checar o tempo antes e durante o voo. OTC Medications for Pilots:
//   meclizina e dimenidrinato entre os anti-histamínicos sedativos; esperar ao menos 5 intervalos de dose depois da
//   última; difenidramina 60 h; loratadina e fexofenadina liberadas.
// - AOPA, "Which way is up" (2002): estudo da Universidade de Illinois (1954), 20 pilotos sem treino de instrumentos em
//   tempo simulado: todos perderam o controle, entre 20 e 480 s, média de 178 s; 19 em espiral; rolagens abaixo de
//   cerca de 2° por segundo deixam formar 20° a 30° de inclinação sem perceber; o líquido dos canais assenta em cerca de
//   15 s.
// - CDC, Yellow Book 2026, Motion Sickness (J. F. Golding, 23/04/2025): crianças menores de 2 anos em geral não enjoam;
//   pico entre 7 e 12 anos; mulheres um pouco mais suscetíveis; enxaqueca, vertigem e doenças vestibulares aumentam o
//   risco; no avião, sentar perto das asas; horizonte visível, evitar movimentos da cabeça e evitar ler protegem; privação
//   de sono piora; evitar álcool e fumo; ser o piloto protege (controle); remédio antes da exposição; escopolamina oral
//   dura cerca de 4 h, adesivo 72 h, um pouco menos sedativa, não usar com glaucoma ou risco de retenção urinária;
//   prometazina a mais sedativa; cetirizina, fexofenadina e loratadina não funcionam; ondansetrona não funciona; cuidado
//   em crianças; escopolamina perigosa em crianças.
// Ilusão somatogravica no interativo: inclinação aparente = arctg(aceleração para a frente ÷ gravidade), soma vetorial da
// gravidade com a aceleração (física, sem dado novo). Condutas práticas sem número próprio (olhar o horizonte, sentar
// perto das asas, avisar a tripulação, levar saco de enjoo) são aplicações das fontes acima. Sem fonte: [confirmar na
// referência].

// 10/11/2026, pedido do autor (doenças no texto, tratamentos expectantes, não invasivos e invasivos, prognóstico,
// prazos e tipo de voo): parágrafo de tratamentos em 5.1, 5.4 e 5.6, tabela de remédios em 5.4, comparador por tipo de
// aeronave e títulos de prevenção padronizados; vídeo cortado para 8 s. Os tópicos 5.2, 5.3 e 5.5 tratam de ilusões e
// treino, não de doença, e seguem sem tabela de liberação e de remédios. Números reaproveitados do registro abaixo
// (5 intervalos de dose; 14 CFR 91.17, 8 h) e de pressurizacao.ts (10.000 ft). Tratamentos: aplicação clínica geral.
import { liberacaoOrientacao } from '../liberacao/orientacao';
import type { Capitulo } from '../tipos';

const foto = (arquivo: number, legenda: string) => ({ imagem: arquivo, legenda });

export const orientacao: Capitulo = {
  numero: 5,
  titulo: 'Labirinto e orientação espacial',
  tempoLeituraMin: 40,
  topicos: [
    {
      id: '5.1',
      titulo: 'Como o corpo sabe onde está',
      pergunta: 'Por que o corpo se perde dentro de uma nuvem?',
      conteudo: {
        texto: [
          "Três sistemas dizem ao cérebro onde fica o **chão**: os **olhos**, o **labirinto** do ouvido interno e os **proprioceptores**, sensores de pressão na pele, nos músculos e nas articulações. O cérebro junta as três mensagens. Até **90%** da orientação vem da **visão**: com um horizonte à vista, os outros dois quase não importam.",
          "O labirinto tem duas peças. Os **canais semicirculares**, três anéis cheios de líquido, sentem a **rotação** nos três eixos: rolar, arfar e guinar. Os **otólitos** sentem a **gravidade** e a **aceleração** em linha reta. Os dois funcionam bem no chão, onde os movimentos são curtos e a gravidade aponta sempre para baixo.",
          "No voo, o labirinto tem **limites**. Uma rotação mais lenta que cerca de **2° por segundo** passa despercebida: o avião pode inclinar **20° a 30°** sem o piloto sentir. Numa curva constante, depois de **10 a 20 segundos** o líquido do canal acompanha o giro e a sensação de girar **some**; ao nivelar, o líquido continua e o corpo sente uma curva para o **lado oposto**.",
          "Os otólitos não separam **gravidade** de **aceleração**. Acelerar para a frente puxa o corpo para trás, como se o nariz tivesse subido. Numa curva coordenada, a força resultante continua apontando para o assento, e o corpo sente o avião **nivelado**. Sem horizonte, na nuvem, à noite ou na névoa, o cérebro passa a acreditar nesses sinais errados: é a **desorientação espacial**.",
          "Outros fatores pioram tudo: **hipóxia** (Veja M2V1 - IV), **fadiga** (Veja M2V8 - V), **álcool** e remédios que dão sono, e o **resfriado**, que pode trazer vertigem na descida (Veja M2V3 - III). Para o passageiro, o resultado costuma ser **enjoo**; para o piloto, pode ser a **perda de controle** do avião.",
          "**Doenças, tratamentos e tipo de voo.** Algumas doenças tiram uma das três fontes de orientação: as do **labirinto**, como a **vertigem posicional**, a **neurite vestibular** e a **doença de Ménière** (Veja M2V3 - III); as dos **olhos**, como a perda de campo e a visão de um olho só (Veja M2V4 - IV); e as que reduzem a sensação dos pés e das pernas, como a **neuropatia do diabetes** (Veja M2V9). O tratamento vai do **expectante**, porque a neurite e a vertigem posicional costumam passar, ao **não invasivo**, com manobras de reposicionamento, **reabilitação vestibular** e remédio na crise, e raramente ao **invasivo**, como a cirurgia na Ménière rebelde. Remédios que dão sono e álcool pioram qualquer uma delas. No avião **não pressurizado**, a hipóxia acima de 10.000 ft soma confusão à ilusão; no **helicóptero**, o voo baixo, o pairado na poeira ou na neve e a vibração tornam a desorientação mais frequente.",
          "**Como prevenir e amenizar.** Antes do voo, confira o tempo e a visibilidade no caminho e no destino, e durma bem. Durante, mantenha uma referência: o **horizonte** lá fora ou o **indicador de atitude** no painel, e não misture os dois quando o horizonte some. Evite movimentos bruscos da **cabeça** em curva. O passageiro que enjoa olha para longe, pela janela, em vez de ler.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 6, midia: 'tipo-voo-orientacao' },
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v5-1-horizonte.jpg'), 'Com o horizonte à vista, os olhos fazem quase todo o trabalho de orientação.') },
          { paragrafo: 2, midia: 'animacao-labirinto' },
          { paragrafo: 3, midia: 'limiar-inclinacao' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'O que muda em altitude',
              colunas: ['Fator do voo', 'O que acontece no labirinto', 'Quem é mais vulnerável'],
              linhas: [
                ['Sem horizonte (nuvem, noite, névoa)', 'O cérebro passa a confiar só no labirinto, que engana', 'Piloto sem treino de instrumentos: o labirinto sente mudanças de movimento, não a posição mantida; sem o hábito de confiar nos instrumentos, o cérebro segue a sensação errada'],
                ['Rotação lenta', 'Abaixo de cerca de 2°/s, a inclinação não é sentida', 'Voo manual sem olhar a atitude: os canais semicirculares não registram a aceleração de giro abaixo do limiar, e a inclinação lenta passa sem aviso'],
                ['Curva longa', 'Depois de 10 a 20 s, a sensação de girar some', 'Espera em órbita, curvas em nuvem: o líquido dos canais semicirculares alcança a velocidade da curva, a cúpula volta ao centro, e o labirinto passa a informar que não há giro'],
                ['Aceleração e desaceleração', 'Os otólitos confundem aceleração com nariz alto ou baixo', 'Decolagem e arremetida sem visibilidade: os otólitos sentem a gravidade e a aceleração juntas; a aceleração para a frente inclina a força que percebem como se o nariz subisse'],
                ['Movimento da cabeça em curva', 'Sensação forte de giro em outro eixo', 'Quem olha para baixo ou para trás em curva: mexer a cabeça num plano enquanto o corpo gira em outro estimula vários canais semicirculares de uma vez (efeito de Coriolis)'],
                ['Hipóxia, fadiga, álcool, resfriado', 'Reação mais lenta e vertigem', 'Voo noturno longo, tripulante resfriado: hipóxia e cansaço deixam o cérebro lento para conferir o labirinto com os olhos; o álcool muda a densidade da cúpula, e o resfriado desequilibra a pressão dos dois ouvidos'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v5-1-nuvem.jpg'), 'Dentro da nuvem, o horizonte some e o labirinto passa a mandar sinais errados.') },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Como prevenir e amenizar · orientação',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Antes', 'Conferir o tempo e a visibilidade no caminho e no destino; dormir bem'],
                ['Sem horizonte', 'Voar pelos instrumentos e não misturar com referências de fora'],
                ['Em curva', 'Evitar movimentos bruscos da cabeça'],
                ['Saindo da nuvem', 'Voltar ao voo visual só com o horizonte firme'],
                ['Passageiro', 'Olhar para longe pela janela; evitar ler na turbulência'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '5.2',
      titulo: 'Ilusões do labirinto',
      pergunta: 'Que mentiras o ouvido interno conta ao piloto?',
      conteudo: {
        texto: [
          "As **ilusões vestibulares** nascem dos limites do labirinto. A mais comum é a **inclinação falsa**, os *leans*: o avião inclina devagar, abaixo do limiar, o piloto vê a atitude e corrige de uma vez; o corpo sente agora uma inclinação para o **outro lado** e tende a voltar à inclinação inicial. Num levantamento de pilotos da FAA, **45%** inclinaram para o lado oposto ao nivelar e **39%** se sentiram em voo reto durante uma curva.",
          "Na **espiral da morte**, a curva coordenada dura mais de **20 segundos**, o labirinto deixa de sentir o giro e o avião desce. O piloto vê a altitude caindo, puxa o manche e aumenta a potência, mas sem desfazer a inclinação isso **aperta a curva**. No **parafuso da morte**, a recuperação correta de um parafuso dá a sensação de girar para o lado contrário, e o piloto volta ao parafuso.",
          "A **ilusão de Coriolis** é a mais forte. Numa curva longa, um movimento brusco da **cabeça**, para pegar uma carta no chão ou olhar para trás, faz o corpo sentir um giro em outro eixo, quase impossível de ignorar. Por isso, em curva e na nuvem, a cabeça fica **parada**.",
          "Os **otólitos** criam ilusões de arfagem. Na **ilusão somatogravica**, a aceleração da decolagem ou da arremetida sem visibilidade parece **nariz alto**; o piloto empurra o manche e pode levar o avião ao chão. Reduzir a potência de repente faz o contrário. Na **inversão**, nivelar de uma subida dá a sensação de cair para trás; no **elevador**, uma corrente para cima parece uma subida, e o piloto também empurra o nariz para baixo.",
          "A **vertigem por cintilação** não vem do labirinto, mas confunde do mesmo jeito: uma luz piscando de **4 a 20 vezes por segundo**, como o sol cortado pela hélice ou a luz anticolisão refletindo na nuvem, pode dar enjoo, tontura e, em pessoas sensíveis, perda de consciência. Para o passageiro, essas ilusões não oferecem risco; para o piloto, são causa conhecida de acidente.",
          "**Como prevenir e amenizar.** Acredite no **indicador de atitude**, não no corpo, e espere as sensações passarem. Na decolagem e na arremetida sem visibilidade, siga a atitude e a velocidade vertical, não a sensação de nariz alto. Em curva, não abaixe nem gire a cabeça; se precisar pegar algo, nivele antes. Contra a cintilação, não olhe através da hélice, varie a rotação e, dentro da nuvem, desligue a luz anticolisão avisando o controle.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v5-2-atitude.jpg'), 'O indicador de atitude mostra a inclinação real quando o corpo sente outra.') },
          { paragrafo: 2, midia: 'ilusoes-labirinto' },
          { paragrafo: 4, midia: 'ilusao-somatogravica' },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v5-2-helice.jpg'), 'O sol cortado pela hélice pode piscar na faixa que causa vertigem por cintilação.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · ilusões do labirinto',
              colunas: ['Ilusão', 'O que o corpo sente', 'O que fazer'],
              linhas: [
                ['Inclinação falsa', 'Inclinação para o lado oposto depois de nivelar', 'Manter as asas niveladas pelo indicador de atitude'],
                ['Espiral da morte', 'Voo nivelado enquanto o avião desce em curva', 'Nivelar as asas primeiro, depois corrigir a altitude'],
                ['Coriolis', 'Giro súbito em outro eixo', 'Cabeça parada em curva; nivelar antes de olhar para baixo'],
                ['Somatográvica', 'Nariz alto ao acelerar', 'Seguir atitude e velocidade vertical na decolagem e na arremetida'],
                ['Inversão e elevador', 'Queda para trás ou subida', 'Não empurrar o nariz sem confirmar nos instrumentos'],
                ['Cintilação', 'Enjoo e tontura com luz piscando', 'Não olhar pela hélice; variar a rotação; luz anticolisão desligada na nuvem'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '5.3',
      titulo: 'Ilusões visuais',
      pergunta: 'Por que a pista engana na aproximação?',
      conteudo: {
        texto: [
          "Os olhos são a melhor referência, mas também enganam quando faltam pontos de comparação. No **falso horizonte**, uma camada de nuvens inclinada ou as luzes do chão confundidas com estrelas fazem o piloto nivelar o avião com uma linha que não é o horizonte. Na **autocinese**, uma luz parada, olhada fixamente no escuro por muitos segundos, parece se mover; o piloto que tenta segui-la pode perder o controle.",
          "Perto do pouso, o cérebro julga a altura pela forma da pista. Uma pista mais **estreita** que o costume dá a impressão de estar **alto**, e o piloto faz uma aproximação **baixa**; uma pista **larga** dá a impressão de estar baixo, com arredondamento alto ou pouso duro. Pista ou terreno em **aclive** também parecem mais altos e levam a uma aproximação baixa; em **declive**, o contrário.",
          "O ambiente soma ilusões. **Água**, **neve** e terreno **sem detalhes** parecem mais altos e puxam a aproximação para baixo. **Chuva** no para-brisa dá a mesma impressão, e a **névoa** faz a pista parecer mais longe. Entrar no **nevoeiro** dá a sensação de cabrar, e o piloto pode inclinar a rampa de repente. **Luzes de aproximação** muito fortes fazem a pista parecer mais perto, levando a uma aproximação alta.",
          "No **buraco negro**, a aproximação noturna é feita sobre água ou terreno escuro, com só as luzes da pista à vista. A pista parece fora do lugar, e o piloto tende a pousar **curto**. Luzes de estradas e de trens também podem ser confundidas com as da pista (Veja M2V4 - III).",
          "Essas ilusões levam a aproximações **baixas**, que acabam antes da pista, e **altas**, que acabam longas ou com pouso duro. Para o passageiro, não há conduta; para o tripulante, o que protege é a **rampa eletrônica** ou o indicador visual de rampa, como o **PAPI** (Veja M2V4 - V), e a disposição de **arremeter** na dúvida.",
          "**Como prevenir e amenizar.** Estude o aeroporto antes: largura e inclinação da pista, terreno em volta, luzes. Na chegada a um aeroporto desconhecido, observe-o do alto antes de pousar. Use sempre a rampa eletrônica ou o PAPI, e confira altitude e distância. Não fixe o olhar numa luz isolada no escuro. Com dúvida sobre a posição ou a altura, **arremeta**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v5-3-falso-horizonte.jpg'), 'Uma camada de nuvens inclinada pode passar por horizonte e levar o piloto a inclinar o avião.') },
          { paragrafo: 2, midia: 'ilusao-pista' },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v5-3-buraco-negro.jpg'), 'No buraco negro, só as luzes da pista aparecem no escuro, e o piloto tende a pousar curto.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · ilusões visuais',
              colunas: ['Situação', 'O que parece', 'O que fazer'],
              linhas: [
                ['Pista estreita ou em aclive', 'Avião mais alto: aproximação baixa', 'Seguir a rampa eletrônica ou o PAPI'],
                ['Pista larga ou em declive', 'Avião mais baixo: aproximação alta', 'Conferir altitude e distância'],
                ['Água, neve ou terreno sem detalhes', 'Avião mais alto', 'Rampa eletrônica; não descer antes da hora'],
                ['Chuva ou névoa', 'Mais alto ou pista mais longe', 'Rampa eletrônica e velocidade vertical'],
                ['Buraco negro à noite', 'Pista fora do lugar; pouso curto', 'Rampa eletrônica ou PAPI; arremeter na dúvida'],
                ['Luz isolada no escuro', 'A luz parece se mover', 'Não fixar o olhar; varrer o campo de visão'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '5.4',
      titulo: 'Desorientação espacial',
      pergunta: 'Quanto tempo um piloto sem treino aguenta dentro de uma nuvem?',
      conteudo: {
        texto: [
          "A **desorientação espacial** é a ideia errada que o piloto faz da posição, da atitude e do movimento do avião. É comum: muitos pilotos já passaram por ela, e entre **5% e 10%** dos acidentes da aviação geral são atribuídos a ela, com **90%** desses acidentes **fatais**. Em questionários com mais de 3.000 pilotos de linha, vertigem e desorientação foram **4%** das incapacitações em voo relatadas.",
          "Em 1954, um estudo da Universidade de Illinois pôs **20 pilotos** sem treino de instrumentos em tempo simulado. **Todos** perderam o controle, entre **20 e 480 segundos**; a média foi de **178 segundos**, menos de 3 minutos, e 19 entraram em espiral. É o retrato do voo visual que entra em nuvem: o labirinto assume e o avião sai da atitude sem o piloto perceber.",
          "Os sinais de que a desorientação começou: o corpo diz uma coisa e o painel diz outra; a vontade de corrigir uma inclinação que os instrumentos não mostram; altitude ou velocidade mudando sem motivo; confusão ao misturar a vista de fora com o painel, como relataram **34%** dos pilotos no levantamento da FAA. O piloto que reconhece o conflito ainda pode vencê-lo pelos instrumentos; o que não reconhece segue a sensação.",
          "Muitos pilotos **não relatam** os episódios: não perceberam que estavam desorientados, acharam normal, temem perder a escala ou o certificado, ou não confiam no examinador. Para o médico, a pergunta certa separa a **vertigem verdadeira**, a sensação de girar, da tontura e do mal-estar, que têm outras causas. Desorientação que se repete, fora das situações típicas do voo, pede investigação do labirinto (Veja M2V3 - III).",
          "Voar visual para dentro do mau tempo é a situação clássica. O piloto sem habilitação de instrumentos que entra em nuvem tem, em média, menos de **3 minutos**. Para o tripulante, desorientação recorrente ou com vertigem exige avaliação antes de voltar; a ANAC e a ICAO não aceitam distúrbio vestibular permanente.",
          "**Tratamento, prognóstico e tipo de voo.** A desorientação em si não é doença: o tratamento é **treino** e conduta. Mas episódios repetidos pedem procurar uma causa: doença do **labirinto**, **enxaqueca vestibular**, remédios, álcool, fadiga ou apneia do sono. A conduta é **expectante** quando o episódio foi único e explicado pela situação, e **não invasiva** quando há causa: reabilitação vestibular, troca do remédio, tratamento do sono. O prognóstico é bom quando a causa é tratada e o piloto treina instrumentos. O tripulante com desorientação **recorrente** ou com vertigem fica afastado até a avaliação. No **helicóptero**, o risco é maior, com voo baixo, pairado na poeira ou na neve e muitas operações com um só piloto; no avião leve **não pressurizado**, a falta de oxigênio acima de 10.000 ft sem máscara piora o julgamento.",
          "**Como prevenir e amenizar.** Reconheça o conflito e diga em voz alta. Olhe o **indicador de atitude** e **nivele as asas** primeiro, depois corrija arfagem e potência. Se houver outro piloto, **passe os comandos**: raramente os dois têm a mesma ilusão. Avise o controle. Depois do voo, relate o episódio; um relato honesto ajuda a evitar o próximo.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Remédios e voo · desorientação",
              colunas: ["Remédio ou classe", "Efeito que importa no voo", "Tripulante (FAA/ANAC)"],
              linhas: [
                ["Anti-histamínico sedativo (meclizina, dimenidrinato)", "Sono e reflexos lentos; piora a orientação", "FAA: esperar 5 intervalos de dose"],
                ["Remédio da crise de vertigem", "Alivia, mas dá sono", "Não voar durante o uso; a vertigem já impede"],
                ["Álcool", "Piora o equilíbrio e a orientação", "FAA: 8 horas entre beber e voar, e nunca sob efeito"],
              ],
            },
          },
          { paragrafo: 1, video: { fonte: require('@/assets/videos/m2v5-nuvem.mp4'), legenda: 'Ao entrar na nuvem, o horizonte some em segundos e só o painel continua mostrando a atitude.' } },
          { paragrafo: 2, midia: 'tempo-nuvem' },
          { paragrafo: 3, figura: foto(require('@/assets/images/topicos/m2v5-4-painel.jpg'), 'Quando o corpo e o painel discordam, o painel tem razão.') },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Liberação para voo · desorientação e vertigem',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Desorientação em voo sem nuvem nem noite, isolada', 'Pode voar', 'Relatar; treino de instrumentos e de ilusões'],
                ['Desorientação que se repete ou com vertigem', 'Procure avaliação', 'Avaliação otorrinolaringológica antes de voar'],
                ['Vertigem agora ou nos últimos dias', 'Avaliação antes de voar', 'Não voar até se recuperar (Veja M2V3 - III)'],
                ['Distúrbio vestibular permanente', 'Conforme o médico', 'Inapto (ANAC e ICAO)'],
              ],
            },
          },
          { paragrafo: 7, figura: foto(require('@/assets/images/topicos/m2v5-4-dois-pilotos.jpg'), 'Com dois pilotos, quem não está desorientado assume os comandos.') },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Como prevenir e amenizar · desorientação',
              colunas: ['Passo', 'O que fazer'],
              linhas: [
                ['1. Reconhecer', 'Corpo e painel discordam: dizer em voz alta'],
                ['2. Atitude', 'Olhar o indicador de atitude e nivelar as asas'],
                ['3. Arfagem e potência', 'Depois das asas, corrigir nariz e potência'],
                ['4. Dois pilotos', 'Passar os comandos a quem não está desorientado'],
                ['5. Controle', 'Avisar o controle e pedir ajuda se preciso'],
                ['6. Depois', 'Relatar o episódio e treinar'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '5.5',
      titulo: 'Prevenção e treinamento',
      pergunta: 'Como se treina para não cair na ilusão?',
      conteudo: {
        texto: [
          "A primeira defesa é **conhecer a ilusão**. Sentir no chão como o labirinto engana, numa **cadeira de Bárány** ou num **simulador de desorientação**, ensina a reconhecer o conflito quando ele aparecer no voo. A ICAO recomenda que o piloto veja o instrutor demonstrar as manobras que provocam desorientação.",
          "A segunda é o **treino por instrumentos**. A FAA recomenda treinar e manter a proficiência no controle do avião pelos instrumentos **antes** de voar com menos de **3 milhas** de visibilidade. À noite e com pouca visibilidade, os instrumentos são a referência, junto com o que se vê lá fora, e precisam ser testados antes da decolagem.",
          "A terceira é **planejar**: conferir o tempo antes da partida, no caminho e no destino; conhecer a geografia da região; não tentar voo visual quando o tempo pode fechar; manter a prática de voo noturno. Quem voa monomotor por instrumentos com frequência pode ter um **indicador de atitude de reserva**, para não perder a referência numa pane.",
          "No avião com dois pilotos, a regra é **dividir**: um voa pelos instrumentos e o outro confere. Como raramente os dois têm a mesma ilusão, quem se sentir desorientado passa os comandos. Nas fases críticas, decolagem, arremetida e aproximação sem visibilidade, o monitoramento cruzado das atitudes protege contra a ilusão somatogravica.",
          "Para o **passageiro**, a prevenção é contra o **enjoo** (Veja M2V5 - VI). Para o **tripulante**, nenhum treino substitui a aptidão: labirinto doente, remédio que dá sono, álcool, fadiga e hipóxia tiram a capacidade de vencer a ilusão (Veja M2V7 e M2V8 - V).",
          "**Como prevenir e amenizar.** Uma vez por ano, faça uma demonstração de ilusões em simulador ou com instrutor. Mantenha o treino de instrumentos e de voo noturno em dia. Antes de cada voo, avalie o tempo e tenha um plano de saída, inclusive dar a volta, se o tempo fechar. Em voo, mantenha a cabeça parada nas curvas e o olhar no painel quando o horizonte sumir.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v5-5-cadeira.jpg'), 'Na cadeira giratória, o piloto sente no chão como o labirinto engana.') },
          { paragrafo: 2, midia: 'conduta-desorientacao' },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v5-5-simulador.jpg'), 'No simulador, a tripulação treina as fases sem visibilidade com monitoramento cruzado.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Como prevenir e amenizar · desorientação espacial',
              colunas: ['Frente', 'O que fazer'],
              linhas: [
                ['Conhecer', 'Demonstração de ilusões em simulador, cadeira giratória ou com instrutor'],
                ['Treinar', 'Proficiência por instrumentos antes de voar com menos de 3 milhas de visibilidade'],
                ['Planejar', 'Tempo na partida, no caminho e no destino; plano para dar a volta'],
                ['Equipar', 'Instrumentos testados antes da decolagem; atitude de reserva'],
                ['Dividir', 'Com dois pilotos, um voa e o outro confere'],
                ['Estar apto', 'Sem remédio que dá sono, álcool, fadiga nem resfriado'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '5.6',
      titulo: 'Cinetose e vertigem',
      pergunta: 'Como evitar o enjoo no avião, e quando ele impede de voar?',
      conteudo: {
        texto: [
          "A **cinetose**, o enjoo de movimento, surge quando os olhos, o labirinto e o corpo mandam mensagens que não combinam: o labirinto sente a turbulência, os olhos veem uma cabine parada. Vem com bocejos, palidez, suor frio, náusea e vômito. Crianças com menos de **2 anos** quase não enjoam; o pico fica entre os **7 e os 12 anos**. Mulheres são um pouco mais suscetíveis, e quem tem **enxaqueca**, vertigem ou doença do labirinto enjoa mais.",
          "No avião, o movimento é menor perto do centro: sentar **perto das asas** ajuda. Olhar o **horizonte** pela janela, evitar mexer a cabeça e **não ler** na turbulência reduzem o enjoo. Dormir mal piora; álcool e cigarro também. Quem pilota enjoa menos, porque antecipa o movimento: a sensação de controle protege.",
          "Os remédios funcionam melhor **antes** do voo. A **escopolamina** dura cerca de **4 horas** por via oral e **72 horas** em adesivo, e dá um pouco menos de sono; não serve para quem tem **glaucoma** ou risco de retenção urinária. **Dimenidrinato** e **meclizina** dão sono; a **prometazina** é a que mais dá. Os anti-histamínicos que não dão sono, como **loratadina**, **fexofenadina** e **cetirizina**, e a **ondansetrona** **não funcionam** contra o enjoo de movimento. Em crianças, todo remédio pede cuidado, e a escopolamina deve ser evitada.",
          "Para o **tripulante**, o remédio é o problema. A FAA põe **meclizina** e **dimenidrinato** entre os anti-histamínicos que dão sono: só se voa depois de **5 intervalos de dose** desde a última; a **difenidramina** pede **60 horas**. A ICAO lembra que anti-histamínicos já foram encontrados em pilotos mortos em acidentes. O aluno que enjoa costuma se adaptar com o treino; o enjoo que persiste e exige remédio é assunto para o examinador.",
          "A **vertigem** verdadeira, a sensação de girar, é outra coisa: vem de doença do labirinto, como **Ménière**, **neurite vestibular** e **vertigem posicional**, ou da pressão, como a **vertigem alternobárica** na descida. Para o tripulante, a ANAC e a ICAO não aceitam distúrbio vestibular permanente; o transitório afasta até a recuperação. Os prazos e cirurgias estão no M2V3 (Veja M2V3 - III).",
          "**Tratamentos, prognóstico e tipo de voo.** A cinetose leve tem conduta **expectante** e de hábito: assento, horizonte, refeição leve; ela costuma melhorar com a **habituação**, a exposição repetida ao voo. O tratamento **não invasivo** é o remédio tomado antes e, para o aluno piloto que enjoa muito, um programa de **adaptação** gradual com o instrutor. Não há tratamento invasivo para a cinetose; a vertigem por doença segue a causa (Veja M2V3 - III). O prognóstico é bom: o enjoo costuma diminuir com as horas de voo. No **helicóptero** e no avião leve **não pressurizado**, que voam mais baixo e sentem mais a turbulência, o enjoo é mais comum que no jato de linha, que cruza acima de boa parte do mau tempo.",
          "**Como prevenir e amenizar.** Escolha um assento perto das asas e na janela; durma bem antes; coma leve e evite álcool. No voo, olhe para longe, apoie a cabeça e não leia na turbulência; avise a tripulação se enjoar. O passageiro que usa remédio toma antes do embarque e não dirige depois. O tripulante não usa remédio que dá sono e conversa com o examinador se o enjoo persistir.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v5-6-enjoo.jpg'), 'Na turbulência, o labirinto sente o movimento que os olhos não veem dentro da cabine.') },
          { paragrafo: 2, midia: 'assento-enjoo' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Remédios e voo · enjoo de movimento',
              colunas: ['Remédio ou classe', 'Efeito que importa no voo', 'Tripulante (FAA/ANAC)'],
              linhas: [
                ['Escopolamina', 'Previne bem; boca seca, visão borrada e sono', 'Não usar em voo sem o examinador [confirmar na referência]'],
                ['Dimenidrinato e meclizina', 'Previnem; dão sono', 'FAA: esperar 5 intervalos de dose'],
                ['Prometazina', 'A que mais dá sono', 'Não voar sob efeito; decisão do examinador'],
                ['Difenidramina', 'Dá sono', 'FAA: 60 horas'],
                ['Loratadina, fexofenadina, cetirizina', 'Não previnem o enjoo de movimento', 'Loratadina e fexofenadina liberadas (FAA)'],
                ['Ondansetrona', 'Não previne o enjoo de movimento', 'Decisão do examinador'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v5-6-janela.jpg'), 'Olhar o horizonte pela janela, sentado perto das asas, reduz o enjoo.') },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Liberação para voo · cinetose',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Enjoa em voo, sem remédio', 'Pode voar; medidas sem remédio', 'Pode voar; o enjoo do aluno costuma passar com o treino'],
                ['Tomou remédio que dá sono', 'Pode voar; não dirigir depois', 'Não voar até passar o prazo (FAA: 5 intervalos de dose)'],
                ['Enjoo que persiste e exige remédio', 'Pode voar', 'Avaliação do examinador'],
                ['Vertigem verdadeira', 'Avaliação antes de voar', 'Não voar até se recuperar (Veja M2V3 - III)'],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Como prevenir e amenizar · cinetose',
              colunas: ['Momento', 'O que fazer'],
              linhas: [
                ['Na compra', 'Assento perto das asas e na janela'],
                ['Antes', 'Dormir bem, comer leve, evitar álcool e cigarro'],
                ['Remédio (passageiro)', 'Tomar antes do embarque; não dirigir depois'],
                ['Durante', 'Olhar para longe, cabeça apoiada, não ler na turbulência'],
                ['Se enjoar', 'Avisar a tripulação; saco de enjoo à mão'],
                ['Tripulante', 'Sem remédio que dá sono; enjoo que persiste vai ao examinador'],
              ],
            },
          },
          {
            paragrafo: 7,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Labirinto: canais semicirculares', 'Não sentem rotação lenta nem curva longa: só respondem ao giro acima de um limiar, e na curva mantida o líquido alcança o canal e a cúpula volta ao centro', 'Indicador de atitude; cabeça parada em curva'],
                ['Labirinto: otólitos', 'Confundem aceleração com nariz alto: os cristais pesam sobre as células sensoriais e sentem gravidade e aceleração somadas, sem separar uma da outra', 'Atitude e velocidade vertical na decolagem e na arremetida'],
                ['Visão', 'Falso horizonte, autocinese, ilusões de pista: sem referência confiável, o cérebro completa a cena com o que espera; uma luz fixa no escuro parece andar porque o olho se mexe sem nada em volta', 'Rampa eletrônica, PAPI e arremeter na dúvida'],
                ['Cérebro', 'Desorientação e perda de controle: quando olhos, labirinto e corpo discordam, o cérebro tende a seguir a sensação mais forte, que pode estar errada', 'Treino por instrumentos e demonstração de ilusões'],
                ['Estômago e sistema nervoso', 'Cinetose: náusea, vômito, sono pelo remédio; o conflito entre o que o labirinto sente e o que os olhos veem ativa os centros do vômito, e os anti-histamínicos sedam', 'Assento nas asas, horizonte; tripulante sem remédio sedativo'],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      pergunta: 'De onde vem a maior parte da orientação do piloto?',
      opcoes: ['Do labirinto', 'Da visão', 'Dos músculos', 'Do olfato'],
      correta: 1,
      explicacao: 'Até 90% da orientação vem da visão; sem horizonte, o labirinto assume e pode enganar.',
      topico: '5.1',
    },
    {
      pergunta: 'Abaixo de que velocidade de rotação o labirinto não percebe a inclinação?',
      opcoes: ['Cerca de 2° por segundo', '20° por segundo', '90° por segundo', 'Ele percebe qualquer rotação'],
      correta: 0,
      explicacao: 'Rotações mais lentas que cerca de 2° por segundo passam despercebidas e deixam o avião inclinar 20° a 30° sem o piloto sentir.',
      topico: '5.1',
    },
    {
      pergunta: 'Na espiral da morte, por que puxar o manche piora?',
      opcoes: ['Porque desliga o motor', 'Porque, sem nivelar as asas, aperta a curva', 'Porque sobe demais', 'Porque trava o leme'],
      correta: 1,
      explicacao: 'Com o avião inclinado, puxar o manche aperta a curva e acelera a descida; primeiro se nivelam as asas.',
      topico: '5.2',
    },
    {
      pergunta: 'O que causa a ilusão somatogravica na decolagem sem visibilidade?',
      opcoes: ['O ruído', 'A aceleração, que os otólitos confundem com nariz alto', 'A hipóxia', 'A luz da pista'],
      correta: 1,
      explicacao: 'Os otólitos não separam gravidade de aceleração; o piloto sente nariz alto e pode empurrar o manche em direção ao chão.',
      topico: '5.2',
    },
    {
      pergunta: 'Qual é a ilusão mais forte, provocada por mover a cabeça numa curva longa?',
      opcoes: ['Autocinese', 'Coriolis', 'Falso horizonte', 'Elevador'],
      correta: 1,
      explicacao: 'O movimento brusco da cabeça numa curva prolongada dá a sensação de giro em outro eixo, a ilusão de Coriolis.',
      topico: '5.2',
    },
    {
      pergunta: 'Uma pista mais estreita que o costume leva a que erro?',
      opcoes: ['Aproximação alta', 'Aproximação baixa', 'Pouso longo', 'Nenhum'],
      correta: 1,
      explicacao: 'A pista estreita dá a impressão de que o avião está mais alto, e o piloto desce demais.',
      topico: '5.3',
    },
    {
      pergunta: 'No estudo de 1954, quanto tempo, em média, pilotos sem treino de instrumentos levaram para perder o controle na nuvem?',
      opcoes: ['10 segundos', '178 segundos', '30 minutos', 'Nenhum perdeu'],
      correta: 1,
      explicacao: 'Os 20 pilotos perderam o controle entre 20 e 480 segundos, com média de 178 segundos.',
      topico: '5.4',
    },
    {
      pergunta: 'Com dois pilotos, o que fazer quando um se sente desorientado?',
      opcoes: ['Continuar sozinho', 'Passar os comandos ao outro', 'Fechar os olhos', 'Desligar o piloto automático e mexer a cabeça'],
      correta: 1,
      explicacao: 'Raramente os dois pilotos têm a mesma ilusão; quem está desorientado passa os comandos.',
      topico: '5.4',
    },
    {
      pergunta: 'Onde sentar no avião para enjoar menos?',
      opcoes: ['No fundo da cabine', 'Perto das asas', 'Na primeira fila', 'Tanto faz'],
      correta: 1,
      explicacao: 'O movimento é menor perto das asas; olhar o horizonte e evitar ler também ajudam.',
      topico: '5.6',
    },
    {
      pergunta: 'Qual destes remédios não previne o enjoo de movimento?',
      opcoes: ['Escopolamina', 'Dimenidrinato', 'Loratadina', 'Meclizina'],
      correta: 2,
      explicacao: 'Os anti-histamínicos que não dão sono, como a loratadina, e a ondansetrona não funcionam contra o enjoo de movimento.',
      topico: '5.6',
    },
  ],
  liberacao: liberacaoOrientacao,
};
