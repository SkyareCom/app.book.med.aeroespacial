// Tipos de conteúdo do app-book.
// Cada tópico apresenta um texto único, em parágrafos progressivos com destaques editoriais.
// O teste fica no final do capítulo, no botão "TESTE O CONHECIMENTO".

export type SecaoId = 'conceitos' | 'sistemas' | 'aviacao' | 'espaco';
export type NivelLeitura = 'essencial' | 'explicacao' | 'clinico';

// Mídias interativas disponíveis (componentes em src/components/midia).
export type TipoMidia =
  | 'simulador-o2'
  | 'simulador-visao'
  | 'grafico-tuc'
  | 'classificar-hipoxia'
  | 'leis-gases'
  | 'forcas-g'
  | 'adaptacao-escuro'
  | 'regua-ruido'
  | 'radiacao-voo'
  | 'risco-aeromedico'
  | 'perda-ossea'
  | 'composicao-ar'
  | 'camadas-atmosfera'
  | 'gases-corpo'
  | 'grafico-boyle'
  | 'grafico-dalton'
  | 'grafico-henry'
  | 'grafico-charles'
  | 'atmosfera-padrao'
  | 'altitude-densidade'
  | 'pressao-diferencial'
  | 'perfil-cabine'
  | 'sistemas-oxigenio'
  | 'oxigenio-100'
  | 'tipos-descompressao'
  | 'mergulho-voo'
  | 'camara-pressao'
  | 'termometro-corpo'
  | 'desidratacao'
  | 'agua-fria'
  | 'regra-tres'
  | 'umidade-cabine'
  | 'animacao-balao'
  | 'animacao-pressao-positiva'
  | 'animacao-bolhas'
  | 'animacao-afterdrop'
  | 'animacao-cascata'
  | 'animacao-hiperventilacao'
  | 'animacao-chuveiro'
  | 'dose-rota'
  | 'risco-carreira'
  | 'gestacao-radiacao'
  | 'regua-decibeis'
  | 'faixas-audicao'
  | 'animacao-vibracao'
  | 'vibracao-a8'
  | 'curva-carga'
  | 'linha-gloc'
  | 'pilha-tolerancia'
  | 'animacao-coluna-sangue'
  | 'centrifuga'
  | 'limites-impacto'
  | 'teste-assento'
  | 'posicao-impacto'
  | 'animacao-ejecao'
  | 'envelope-ejecao'
  | 'risco-capacete'
  | 'controle-asma'
  | 'baterias-cpap'
  | 'prazo-voo-pulmao'
  | 'teste-hipoxia'
  | 'linha-adaptacao'
  | 'subida-segura';

export interface ConteudoTopico {
  // Prosa contínua; dois saltos de linha separam parágrafos.
  // **Termos ou conclusões importantes** recebem destaque inline, sem cabeçalhos.
  texto: string;
  recursos?: Recurso[];
}

export interface Recurso {
  // Um recurso com paragrafo aparece imediatamente após o parágrafo correspondente.
  // Sem paragrafo, aparece ao final do texto; a contagem começa em 1.
  paragrafo?: number;
  midia?: TipoMidia;
  // Figura fotográfica. `proporcao` = largura/altura (padrão 16:9). `marcadores`: estruturas que só se destacam quando
  // o leitor toca na legenda (x, y e raio em fração da imagem).
  figura?: { imagem: number; legenda: string; proporcao?: number; marcadores?: { x: number; y: number; rotulo: string; raio?: number }[] };
  // Vídeo curto em laço, sem som (assets/videos, MP4).
  video?: { fonte: number; legenda: string; proporcao?: number };
  // Tabela: no celular cada linha vira um cartão (1ª coluna como título, as outras como rótulo e valor).
  tabela?: { titulo: string; colunas: string[]; linhas: string[][] };
}

export interface Topico {
  id: string;
  titulo: string;
  pergunta?: string;
  conteudo?: ConteudoTopico;
  midias?: TipoMidia[];
}

export type Dificuldade = 'facil' | 'media' | 'dificil';

export interface Questao {
  dificuldade?: Dificuldade; // vale XP: fácil 10, média 20, difícil 30 (peso 2 no Modo prova)
  pergunta: string;
  opcoes: [string, string, string, string];
  correta: 0 | 1 | 2 | 3;
  explicacao: string;
  topico: string; // id do tópico (ou evento) de origem, para revisão
}

// Formulário de liberação para voo seguro (fim da Missão Sistemas; docs/modelo-sistemas.md).
// Cada voo de Sistemas traz as perguntas do seu sistema; o formulário junta todas e o veredito vale o pior nível.
export type NivelLiberacao = 'liberado' | 'cuidados' | 'avaliar' | 'nao-voar';
export type PerfilPaciente = 'passageiro' | 'tripulante';
export interface EfeitoLiberacao {
  nivel: NivelLiberacao;
  leigo: string; // para o passageiro ou o tripulante que responde sobre si
  medico: string; // para o médico especialista: norma, prazo e o que registrar
  topico?: string; // id do tópico para revisar
}
export interface PerguntaLiberacao {
  id: string;
  pergunta: string;
  ajuda?: string;
  opcoes: { rotulo: string; passageiro: EfeitoLiberacao; tripulante: EfeitoLiberacao }[];
}

export interface Capitulo {
  numero: number;
  titulo: string;
  tempoLeituraMin?: number;
  topicos: Topico[];
  teste?: Questao[];
  // Mídias do episódio inteiro, mostradas mesmo antes de o texto ficar pronto.
  laboratorio?: TipoMidia[];
  // Perguntas deste sistema no formulário de liberação para voo seguro (só voos da Missão Sistemas).
  liberacao?: PerguntaLiberacao[];
}

export interface Secao {
  id: SecaoId;
  numeral: string;
  titulo: string;
  subtitulo: string;
  sinopse: string;
  capitulos: Capitulo[];
}

export interface EventoHistorico {
  id: string;
  ano: string;
  titulo: string;
  essencial: string;
}

export interface Era {
  id: string;
  titulo: string;
  periodo: string;
  eventos: EventoHistorico[];
  teste: Questao[];
}
