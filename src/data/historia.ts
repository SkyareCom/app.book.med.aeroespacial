// Card especial "O Voo e a Medicina": 20 eventos em 5 eras.
// Só fatos históricos relevantes; valores incertos com "cerca de".

import type { Era } from './tipos';

export const eras: Era[] = [
  {
    id: 'baloes',
    titulo: 'Os balões',
    periodo: '1783–1902',
    eventos: [
      { id: 'h1.1', ano: '1783', titulo: 'Os primeiros voos de balão', essencial: 'Em setembro, um carneiro, um pato e um galo voam num balão dos irmãos Montgolfier e voltam vivos. Em novembro, Pilâtre de Rozier e o Marquês d’Arlandes fazem o primeiro voo tripulado livre, em Paris.' },
      { id: 'h1.2', ano: '1862', titulo: 'Glaisher e Coxwell descrevem a hipóxia', essencial: 'Os dois sobem de balão a cerca de 11.000 m. Glaisher perde a visão e a consciência; Coxwell, com as mãos paralisadas pelo frio, puxa a válvula com os dentes para descer.' },
      { id: 'h1.3', ano: '1875', titulo: 'A tragédia do balão Zénith', essencial: 'Três franceses sobem a cerca de 8.000 m levando oxigênio, mas a hipóxia lhes tira o julgamento antes de usá-lo. Dois morrem; só Tissandier sobrevive.' },
      { id: 'h1.4', ano: '1878', titulo: 'Paul Bert e a pressão do oxigênio', essencial: 'O fisiologista francês mostra, em câmaras de baixa pressão, que o mal da altitude vem da queda da pressão parcial de oxigênio e que respirar oxigênio o previne.' },
    ],
    teste: [
      { pergunta: 'Quem voou antes dos humanos no balão dos Montgolfier, em 1783?', opcoes: ['Cães', 'Um carneiro, um pato e um galo', 'Macacos', 'Pombos-correio'], correta: 1, explicacao: 'Em Versalhes, um carneiro, um pato e um galo foram os primeiros passageiros e voltaram vivos.', topico: 'h1.1' },
      { pergunta: 'Como Coxwell conseguiu descer o balão em 1862?', opcoes: ['Cortou a corda do lastro', 'Puxou a válvula com os dentes', 'Esperou o gás esfriar', 'Glaisher acordou e desceu o balão'], correta: 1, explicacao: 'Com as mãos paralisadas pelo frio, Coxwell puxou a corda da válvula com os dentes.', topico: 'h1.2' },
      { pergunta: 'Qual lição a tragédia do Zénith deixou?', opcoes: ['Balões não devem subir à noite', 'A hipóxia tira o julgamento antes dos sintomas', 'O oxigênio é tóxico em altitude', 'O frio é o maior perigo do voo'], correta: 1, explicacao: 'Eles levavam oxigênio, mas a hipóxia prejudicou o julgamento antes que o usassem.', topico: 'h1.3' },
      { pergunta: 'O que Paul Bert demonstrou em 1878?', opcoes: ['Que o ar fica sem oxigênio em altitude', 'Que o problema é a baixa pressão parcial de oxigênio', 'Que o frio causa o mal da altitude', 'Que o nitrogênio causa desmaios'], correta: 1, explicacao: 'Bert mostrou que o mal da altitude vem da queda da pressão parcial de oxigênio.', topico: 'h1.4' },
    ],
  },
  {
    id: 'aviao',
    titulo: 'O avião e a Primeira Guerra',
    periodo: '1903–1918',
    eventos: [
      { id: 'h2.1', ano: '1903/1906', titulo: 'O voo motorizado', essencial: 'Os irmãos Wright voam o Flyer em 1903, nos Estados Unidos. Em 1906, em Paris, Santos-Dumont decola com o 14-bis por meios próprios, diante de público e de uma comissão oficial.' },
      { id: 'h2.2', ano: '1908', titulo: 'A primeira morte em acidente de avião', essencial: 'O tenente Thomas Selfridge morre de trauma craniano num voo de demonstração com Orville Wright. Nasce a preocupação com a proteção da cabeça.' },
      { id: 'h2.3', ano: '1914–1918', titulo: 'A Primeira Guerra e o médico de voo', essencial: 'As grandes perdas de pilotos por falhas físicas levam aos primeiros exames médicos de seleção e ao surgimento do médico de voo.' },
    ],
    teste: [
      { pergunta: 'O que diferencia o voo do 14-bis em 1906?', opcoes: ['Foi o primeiro voo noturno', 'Decolou por meios próprios diante de público e comissão oficial', 'Levou dois passageiros', 'Cruzou o Atlântico'], correta: 1, explicacao: 'O 14-bis decolou por meios próprios, diante de público e da comissão do Aéro-Club de France.', topico: 'h2.1' },
      { pergunta: 'Qual foi a causa da morte de Thomas Selfridge em 1908?', opcoes: ['Hipóxia', 'Afogamento', 'Trauma craniano', 'Hipotermia'], correta: 2, explicacao: 'Selfridge morreu de trauma craniano, o que levou à recomendação do uso de capacete.', topico: 'h2.2' },
      { pergunta: 'O que a Primeira Guerra trouxe para a medicina de aviação?', opcoes: ['A cabine pressurizada', 'Os primeiros exames de seleção e o médico de voo', 'O traje anti-G', 'A Organização da Aviação Civil Internacional'], correta: 1, explicacao: 'As perdas de pilotos por falhas físicas levaram à seleção médica e à figura do médico de voo.', topico: 'h2.3' },
    ],
  },
  {
    id: 'altitude',
    titulo: 'Altitude e proteção',
    periodo: '1919–1945',
    eventos: [
      { id: 'h3.1', ano: '1929', titulo: 'A especialidade se organiza', essencial: 'Louis Bauer funda a Aero Medical Association, hoje Aerospace Medical Association, três anos depois de publicar o primeiro grande livro-texto da área.' },
      { id: 'h3.2', ano: 'Anos 1930', titulo: 'Traje pressurizado e linha de Armstrong', essencial: 'Wiley Post voa com um traje pressurizado em 1934. Harry Armstrong descreve a altitude, de cerca de 18 a 19 km, em que os líquidos do corpo fervem à temperatura corporal.' },
      { id: 'h3.3', ano: '1940', titulo: 'A cabine comercial pressurizada', essencial: 'O Boeing 307 Stratoliner entra em serviço como o primeiro avião comercial pressurizado.' },
      { id: 'h3.4', ano: '1939–1945', titulo: 'A Segunda Guerra e o limite humano', essencial: 'Máscaras de oxigênio, câmaras de altitude, traje anti-G e centrífuga humana entram em uso. Experimentos criminosos com prisioneiros levam, em 1947, ao Código de Nuremberg sobre pesquisa com seres humanos.' },
    ],
    teste: [
      { pergunta: 'Quem fundou a Aero Medical Association em 1929?', opcoes: ['Paul Bert', 'Louis Bauer', 'Harry Armstrong', 'John Paul Stapp'], correta: 1, explicacao: 'Louis Bauer fundou a associação, hoje Aerospace Medical Association.', topico: 'h3.1' },
      { pergunta: 'O que acontece acima da linha de Armstrong sem traje pressurizado?', opcoes: ['O sangue congela', 'Os líquidos do corpo fervem à temperatura corporal', 'O coração para imediatamente', 'A visão fica em preto e branco'], correta: 1, explicacao: 'A cerca de 18 a 19 km, a pressão é tão baixa que a água ferve a 37 °C.', topico: 'h3.2' },
      { pergunta: 'Qual foi o primeiro avião comercial pressurizado em serviço?', opcoes: ['Douglas DC-3', 'Boeing 307 Stratoliner', 'de Havilland Comet', 'Boeing 707'], correta: 1, explicacao: 'O Boeing 307 Stratoliner entrou em serviço em 1940.', topico: 'h3.3' },
      { pergunta: 'Qual documento nasceu dos crimes em experimentos durante a Segunda Guerra?', opcoes: ['Convenção de Chicago', 'Código de Nuremberg', 'Anexo 1 da ICAO', 'Declaração de Genebra'], correta: 1, explicacao: 'O Código de Nuremberg, de 1947, é a base da ética em pesquisa com seres humanos.', topico: 'h3.4' },
    ],
  },
  {
    id: 'jatos',
    titulo: 'Jatos e espaço',
    periodo: '1946–1975',
    eventos: [
      { id: 'h4.1', ano: '1947', titulo: 'Nasce a ICAO', essencial: 'A Organização da Aviação Civil Internacional começa a funcionar e cria padrões médicos internacionais para tripulantes.' },
      { id: 'h4.2', ano: '1954', titulo: 'Os limites do impacto e da descompressão', essencial: 'O médico John Paul Stapp suporta cerca de 46 G num trenó-foguete. No mesmo ano, acidentes do jato Comet revelam o risco da descompressão explosiva.' },
      { id: 'h4.3', ano: '1961', titulo: 'Gagarin em órbita', essencial: 'Yuri Gagarin completa uma órbita da Terra e mostra que o ser humano consegue viver e agir em microgravidade.' },
      { id: 'h4.4', ano: '1965', titulo: 'A primeira caminhada espacial', essencial: 'Alexei Leonov sai da nave; o traje infla no vácuo e ele precisa reduzir a pressão para conseguir voltar. Daí vem a pré-respiração de oxigênio.' },
      { id: 'h4.5', ano: '1967–1971', titulo: 'Tragédias e conquistas no espaço', essencial: 'O incêndio da Apollo 1 em teste no solo, a chegada da Apollo 11 à Lua e a despressurização da Soyuz 11, até hoje as únicas mortes ocorridas no espaço.' },
    ],
    teste: [
      { pergunta: 'Qual organização cria os padrões médicos internacionais para tripulantes desde 1947?', opcoes: ['NASA', 'ICAO', 'FAA', 'OMS'], correta: 1, explicacao: 'A ICAO estabelece os padrões internacionais, incluindo os requisitos médicos.', topico: 'h4.1' },
      { pergunta: 'O que os acidentes do Comet, em 1954, revelaram?', opcoes: ['O perigo das forças G', 'O risco da descompressão explosiva', 'A necessidade de cintos de segurança', 'O efeito da radiação cósmica'], correta: 1, explicacao: 'Falhas estruturais da fuselagem causaram descompressão explosiva.', topico: 'h4.2' },
      { pergunta: 'O que o voo de Gagarin provou?', opcoes: ['Que a Lua era alcançável', 'Que o ser humano consegue viver e agir em microgravidade', 'Que a radiação espacial é inofensiva', 'Que trajes não são necessários'], correta: 1, explicacao: 'Gagarin comeu, bebeu e se comunicou em órbita.', topico: 'h4.3' },
      { pergunta: 'Qual prática atual surgiu do problema de Leonov em 1965?', opcoes: ['Pré-respiração de oxigênio antes das caminhadas espaciais', 'Uso de capacete dourado', 'Treinamento em centrífuga', 'Quarentena pós-voo'], correta: 0, explicacao: 'Leonov reduziu a pressão do traje com risco de doença descompressiva; hoje se faz pré-respiração de oxigênio.', topico: 'h4.4' },
      { pergunta: 'Quais foram as únicas mortes ocorridas no espaço até hoje?', opcoes: ['Apollo 1', 'Apollo 13', 'Soyuz 11', 'Challenger'], correta: 2, explicacao: 'Os três tripulantes da Soyuz 11 morreram por despressurização na reentrada, em 1971.', topico: 'h4.5' },
    ],
  },
  {
    id: 'seguranca',
    titulo: 'Segurança e longa duração',
    periodo: '1976–hoje',
    eventos: [
      { id: 'h5.1', ano: '1977–1981', titulo: 'Tenerife e o CRM', essencial: 'A colisão de dois Boeing 747 em Tenerife mata 583 pessoas. A resposta é o treinamento de gestão de recursos da tripulação (CRM), adotado a partir de 1981.' },
      { id: 'h5.2', ano: '2000', titulo: 'A Estação Espacial Internacional', essencial: 'Começa a ocupação contínua da estação, que permite estudar por meses a perda óssea e muscular, a radiação e as alterações visuais no espaço.' },
      { id: 'h5.3', ano: '2005', titulo: 'Helios 522', essencial: 'A tripulação não reconhece uma falha de pressurização e fica incapacitada pela hipóxia; 121 pessoas morrem. O treinamento de reconhecimento da hipóxia é reforçado.' },
      { id: 'h5.4', ano: '2015', titulo: 'Germanwings 9525', essencial: 'O copiloto derruba deliberadamente o avião nos Alpes; 150 pessoas morrem. A saúde mental de pilotos passa ao centro da certificação e dos programas de apoio.' },
      { id: 'h5.5', ano: '2021', titulo: 'O turismo espacial', essencial: 'Civis sem seleção de astronauta vão ao espaço em voos suborbitais e orbitais, e a medicina precisa de novos critérios de aptidão.' },
    ],
    teste: [
      { pergunta: 'Qual treinamento surgiu como resposta a acidentes como o de Tenerife?', opcoes: ['Treinamento em câmara hipobárica', 'Gestão de recursos da tripulação (CRM)', 'Sobrevivência no mar', 'Treinamento em centrífuga'], correta: 1, explicacao: 'O CRM foca comunicação, liderança e tomada de decisão na cabine.', topico: 'h5.1' },
      { pergunta: 'O que a ocupação contínua da Estação Espacial Internacional permite estudar?', opcoes: ['Apenas o enjoo espacial', 'Os efeitos de meses no espaço sobre o corpo', 'Somente a radiação solar', 'A gravidade de Marte'], correta: 1, explicacao: 'Missões longas mostram perda óssea e muscular, efeitos da radiação e alterações visuais.', topico: 'h5.2' },
      { pergunta: 'Qual foi a causa do acidente do Helios 522?', opcoes: ['Falha de motor', 'Hipóxia por falha de pressurização não reconhecida', 'Colisão em voo', 'Pouso em condições de gelo'], correta: 1, explicacao: 'A tripulação não reconheceu a falha de pressurização e foi incapacitada pela hipóxia.', topico: 'h5.3' },
      { pergunta: 'Qual tema ganhou destaque na certificação após o caso Germanwings?', opcoes: ['Visão de cores', 'Saúde mental de pilotos', 'Limite de idade', 'Audição'], correta: 1, explicacao: 'A saúde mental passou ao centro da certificação e dos programas de apoio por pares.', topico: 'h5.4' },
      { pergunta: 'Qual novo desafio o turismo espacial trouxe para a medicina?', opcoes: ['Treinar pilotos de caça', 'Definir critérios de aptidão para civis', 'Construir estações espaciais', 'Fabricar trajes anti-G'], correta: 1, explicacao: 'Passageiros sem seleção de astronauta exigem novos critérios de aptidão.', topico: 'h5.5' },
    ],
  },
];
