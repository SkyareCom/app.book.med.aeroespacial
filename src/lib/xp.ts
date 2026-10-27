import type { Dificuldade, Questao } from '@/data/tipos';

// Sistema de XP e ranking individual de conhecimento.
// Cada questão vale XP pela dificuldade; no Modo prova o peso é 2.
// Uma questão só pontua uma vez: depois de respondida, fica travada até o ranking ser zerado ou desativado.

export const PONTOS: Record<Dificuldade, number> = { facil: 10, media: 20, dificil: 30 };
export const PESO_PROVA = 2;
export const NOME_DIFICULDADE: Record<Dificuldade, string> = { facil: 'Fácil', media: 'Média', dificil: 'Difícil' };

// Dificuldade das questões já escritas (as novas podem trazer `dificuldade` no próprio arquivo).
const MAPA: Record<string, Dificuldade> = {
  // Missão 1 · Conceitos
  'Um avião sobe do nível do mar para 18.000 ft. O que acontece com o ar fora da cabine?': 'facil',
  'Num dia de 35 °C, um avião decola de um aeroporto a 5.000 ft. O que acontece?': 'media',
  'Um passageiro resfriado sente forte dor de ouvido. Em que fase do voo isso é mais provável, e por quê?': 'facil',
  'Em cruzeiro, a cabine está confortável, mas os olhos e a garganta ficam ressecados. Qual é a explicação mais provável?': 'facil',
  'Um avião voa a 38.000 ft com a cabine pressurizada. Por que ainda há oxigênio suplementar a bordo?': 'facil',
  'Qual é o limite de altitude de cabine em operação normal para aviões de transporte?': 'media',
  'Um piloto de barba usa máscara de demanda diluidora a 38.000 ft. Qual é o risco?': 'media',
  'Por que acima de 40.000 ft é preciso pressão positiva, mesmo com oxigênio a 100%?': 'dificil',
  // Missão 2 · Sistemas
  'Por que há menos oxigênio disponível em altitude?': 'facil',
  'Intoxicação por monóxido de carbono causa qual tipo de hipóxia?': 'media',
  'Qual é o tempo de consciência útil aproximado a 35.000 ft?': 'media',
  'O que acontece com o tempo de consciência útil em uma descompressão rápida?': 'dificil',
  'Qual é o principal perigo da hipóxia para quem está voando?': 'facil',
  'Em voo, um tripulante sente tontura e formigamento. Qual é a primeira conduta?': 'media',
  // Missão especial · O Voo e a Medicina
  'Quem voou antes dos humanos no balão dos Montgolfier, em 1783?': 'facil',
  'Como Coxwell conseguiu descer o balão em 1862?': 'media',
  'Qual lição a tragédia do Zénith deixou?': 'media',
  'O que Paul Bert demonstrou em 1878?': 'dificil',
  'O que diferencia o voo do 14-bis em 1906?': 'facil',
  'Qual foi a causa da morte de Thomas Selfridge em 1908?': 'media',
  'O que a Primeira Guerra trouxe para a medicina de aviação?': 'media',
  'Quem fundou a Aero Medical Association em 1929?': 'dificil',
  'O que acontece acima da linha de Armstrong sem traje pressurizado?': 'media',
  'Qual foi o primeiro avião comercial pressurizado em serviço?': 'dificil',
  'Qual documento nasceu dos crimes em experimentos durante a Segunda Guerra?': 'media',
  'Qual organização cria os padrões médicos internacionais para tripulantes desde 1947?': 'facil',
  'O que os acidentes do Comet, em 1954, revelaram?': 'media',
  'O que o voo de Gagarin provou?': 'facil',
  'Qual prática atual surgiu do problema de Leonov em 1965?': 'dificil',
  'Quais foram as únicas mortes ocorridas no espaço até hoje?': 'dificil',
  'Qual treinamento surgiu como resposta a acidentes como o de Tenerife?': 'media',
  'O que a ocupação contínua da Estação Espacial Internacional permite estudar?': 'facil',
  'Qual foi a causa do acidente do Helios 522?': 'media',
  'Qual tema ganhou destaque na certificação após o caso Germanwings?': 'facil',
  'Qual novo desafio o turismo espacial trouxe para a medicina?': 'facil',
};

export function dificuldadeDe(q: Questao): Dificuldade {
  return q.dificuldade ?? MAPA[q.pergunta] ?? 'media';
}

// Identidade estável de uma questão (tópico + enunciado).
export function idQuestao(q: Questao) {
  return `${q.topico}|${q.pergunta}`;
}

export function xpDaQuestao(q: Questao, modo: 'quiz' | 'prova') {
  return PONTOS[dificuldadeDe(q)] * (modo === 'prova' ? PESO_PROVA : 1);
}

// Patentes: escala progressiva de XP, cada uma com o objetivo que leva à seguinte.
export const PATENTES = [
  { nome: 'Passageiro', xp: 0, objetivo: 'Responda às suas primeiras questões e conheça o ambiente de voo.' },
  { nome: 'Aluno-piloto', xp: 100, objetivo: 'Domine os conceitos: atmosfera, gases e pressurização.' },
  { nome: 'Piloto privado', xp: 300, objetivo: 'Entenda como cada sistema do corpo reage ao voo.' },
  { nome: 'Piloto comercial', xp: 600, objetivo: 'Encare o Modo prova: cada acerto vale o dobro.' },
  { nome: 'Piloto de linha aérea', xp: 1000, objetivo: 'Leve o conhecimento para a operação: aptidão, segurança e emergências.' },
  { nome: 'Comandante', xp: 1600, objetivo: 'Chegue a Avançado em todas as missões.' },
  { nome: 'Médico de voo', xp: 2400, objetivo: 'Explore o espaço: microgravidade, suporte de vida e missões longas.' },
  { nome: 'Astronauta', xp: 3500, objetivo: 'Topo do ranking. Mantenha-se Especialista em cada missão.' },
] as const;

export function patentePorXp(xp: number) {
  let i = 0;
  while (i + 1 < PATENTES.length && xp >= PATENTES[i + 1].xp) i++;
  const atual = PATENTES[i];
  const proxima = PATENTES[i + 1];
  const progresso = proxima ? (xp - atual.xp) / (proxima.xp - atual.xp) : 1;
  return { indice: i + 1, total: PATENTES.length, atual, proxima, progresso, faltam: proxima ? proxima.xp - xp : 0 };
}

// Escala de domínio de uma missão: XP das questões acertadas ÷ XP possível (sem o peso da prova).
export const NIVEIS_DOMINIO = [
  { nome: 'Iniciante', min: 0 },
  { nome: 'Básico', min: 0.25 },
  { nome: 'Intermediário', min: 0.5 },
  { nome: 'Avançado', min: 0.75 },
  { nome: 'Especialista', min: 0.9 },
] as const;

export function nivelDominio(pct: number) {
  let n: (typeof NIVEIS_DOMINIO)[number] = NIVEIS_DOMINIO[0];
  for (const x of NIVEIS_DOMINIO) if (pct >= x.min) n = x;
  return n;
}
