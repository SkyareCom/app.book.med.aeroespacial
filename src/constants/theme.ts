// Tokens visuais do app. Tema sideral, fonte única: Acme com o circunflexo corrigido,
// renomeada para "AppBook Display" como pede a licença SIL OFL (o nome "Acme" é reservado).
// Regra de tipografia: apenas os tamanhos abaixo. O 9px é exclusivo do rodapé, sempre em maiúsculas.

export const Fonte = 'AppBookDisplay';

export const Tamanho = {
  titulo: 18,
  item: 14,
  corpo: 12,
  rotulo: 10,
  rodape: 9,
} as const;

export type TamanhoTexto = keyof typeof Tamanho;

// Duas variações de destaque: "holograma" (azul) e "sabre" (vermelho).
const destaques = {
  holograma: { destaque: '#6FD3FF', linha: 'rgba(111,211,255,0.24)' },
  sabre: { destaque: '#FF5A4E', linha: 'rgba(255,90,78,0.28)' },
};

const destaqueAtivo = destaques.holograma;

export const Cores = {
  fundo: '#03050A',
  painel: 'rgba(6,10,18,0.82)',
  texto: '#EEF3F8',
  textoSuave: '#C9D4E0',
  textoApagado: '#9FB0C2',
  dourado: '#E8C46A',
  trilha: 'rgba(255,255,255,0.12)',
  acerto: '#5BD69B',
  erro: '#FF7A6E',
  ...destaqueAtivo,
};

export const Espaco = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;
export const Raio = 16;
export const LarguraMaxima = 480;
