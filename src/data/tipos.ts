// Tipos de conteúdo do app-book.
// Cada tópico tem três níveis de leitura, sempre visíveis e em sequência.
// O teste fica no final do capítulo, no botão "TESTE O CONHECIMENTO".

export type SecaoId = 'fisiologia' | 'clinica' | 'operacao' | 'espaco';
export type NivelLeitura = 'essencial' | 'explicacao' | 'clinico';

export interface ConteudoTopico {
  essencial: string;
  explicacao: string;
  clinico: string;
  pontosChave?: string[];
  alerta?: string;
}

export interface Topico {
  id: string;
  titulo: string;
  pergunta?: string;
  conteudo?: ConteudoTopico;
}

export interface Questao {
  pergunta: string;
  opcoes: [string, string, string, string];
  correta: 0 | 1 | 2 | 3;
  explicacao: string;
  topico: string; // id do tópico (ou evento) de origem, para revisão
}

export interface Capitulo {
  numero: number;
  titulo: string;
  resumo?: string;
  tempoLeituraMin?: number;
  objetivos?: string[];
  topicos: Topico[];
  teste?: Questao[];
}

export interface Secao {
  id: SecaoId;
  numeral: string;
  titulo: string;
  subtitulo: string;
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
