// Formulário de liberação para voo seguro: junta as perguntas dos voos da Missão Sistemas e calcula o veredito.
// O veredito vale o pior nível entre as respostas. Regras e textos de cada resposta ficam no voo de origem
// (campo `liberacao`), com as fontes no registro de revisão do arquivo do voo. Modelo em docs/modelo-sistemas.md.

import { obterSecao } from '@/data/secoes';
import type { EfeitoLiberacao, NivelLiberacao, PerfilPaciente, PerguntaLiberacao } from '@/data/tipos';

export type QuemResponde = 'passageiro' | 'tripulante' | 'medico';

export interface TopicoLiberacao {
  id: string;
  titulo: string;
  perguntas: PerguntaLiberacao[];
}

export interface BlocoSistema {
  numero: number;
  titulo: string;
  perguntas: PerguntaLiberacao[];
  topicos: TopicoLiberacao[]; // cada tópico do voo com as suas perguntas, na ordem do voo
}

// Tópico de uma pergunta: o campo `topico` ou, sem ele, o primeiro `topico` citado nas respostas.
export function topicoDaPergunta(p: PerguntaLiberacao): string | undefined {
  if (p.topico) return p.topico;
  for (const o of p.opcoes) {
    const t = o.passageiro.topico || o.tripulante.topico;
    if (t) return t;
  }
  return undefined;
}

export function blocosLiberacao(): BlocoSistema[] {
  const secao = obterSecao('sistemas');
  if (!secao) return [];
  return secao.capitulos
    .filter((c) => c.liberacao?.length)
    .map((c) => {
      const perguntas = c.liberacao!;
      const topicos: TopicoLiberacao[] = c.topicos.map((t) => ({ id: t.id, titulo: t.titulo, perguntas: perguntas.filter((p) => topicoDaPergunta(p) === t.id) }));
      const soltas = perguntas.filter((p) => !topicos.some((t) => t.perguntas.includes(p)));
      if (soltas.length && topicos[0]) topicos[0].perguntas.unshift(...soltas);
      return { numero: c.numero, titulo: c.titulo, perguntas, topicos: topicos.filter((t) => t.perguntas.length) };
    });
}

export const ORDEM_NIVEL: NivelLiberacao[] = ['nao-voar', 'avaliar', 'cuidados', 'liberado'];

export interface ItemPeso {
  pergunta: string;
  resposta: string;
  efeito: EfeitoLiberacao;
  voo: number;
}

export interface Veredito {
  nivel: NivelLiberacao;
  respondidas: number;
  total: number;
  itens: ItemPeso[]; // o que pesou, do mais grave ao mais leve (só o que não é "liberado")
}

export function avaliarLiberacao(blocos: BlocoSistema[], respostas: Record<string, number>, perfil: PerfilPaciente): Veredito {
  const itens: ItemPeso[] = [];
  let total = 0;
  let respondidas = 0;
  for (const b of blocos) {
    for (const p of b.perguntas) {
      total++;
      const r = respostas[p.id];
      if (r === undefined) continue;
      respondidas++;
      const op = p.opcoes[r];
      const ef = op[perfil];
      if (ef.nivel !== 'liberado' || ef.leigo) itens.push({ pergunta: p.pergunta, resposta: op.rotulo, efeito: ef, voo: b.numero });
    }
  }
  itens.sort((a, b) => ORDEM_NIVEL.indexOf(a.efeito.nivel) - ORDEM_NIVEL.indexOf(b.efeito.nivel));
  const nivel = itens[0]?.efeito.nivel ?? 'liberado';
  return { nivel, respondidas, total, itens };
}

export const NOME_NIVEL: Record<NivelLiberacao, string> = {
  liberado: 'Liberado para voar',
  cuidados: 'Liberado com cuidados',
  avaliar: 'Avaliação médica antes do voo',
  'nao-voar': 'Não voar agora',
};

// Comentário sobre a situação, por quem responde e pelo perfil do paciente. Textos inteiros (sem interpolação), para a
// tradução encontrar cada frase no dicionário.
export function comentarioVeredito(v: Veredito, quem: QuemResponde, perfil: PerfilPaciente): { texto: string; aviso?: string } {
  const medico = quem === 'medico';
  const trip = perfil === 'tripulante';
  if (v.respondidas === 0) return { texto: medico ? 'Responda sobre o paciente para ver o veredito.' : 'Responda às perguntas para ver o veredito.' };
  const aviso = v.respondidas < v.total ? 'Há perguntas sem resposta: o veredito considera só as respondidas.' : undefined;
  const t: Record<NivelLiberacao, string> = medico
    ? trip
      ? {
          liberado: 'Nenhuma resposta impede o voo do paciente tripulante pelos critérios deste formulário. A aptidão continua sendo do médico examinador credenciado.',
          cuidados: 'Liberação possível, com as condutas listadas. Registre no atestado as orientações dadas.',
          avaliar: 'Não liberar como tripulante sem a decisão do médico examinador credenciado ou da autoridade (ANAC, FAA). Encaminhe com os documentos indicados.',
          'nao-voar': 'Não liberar agora. Há impedimento até o prazo ou a condição indicada; vale a proibição de atuar com deficiência médica (14 CFR 61.53) e a diminuição da aptidão (RBAC 67).',
        }
      : {
          liberado: 'Nenhuma resposta impede o voo do paciente passageiro pelos critérios deste formulário.',
          cuidados: 'Liberação possível, com as condutas listadas. Registre no atestado as orientações dadas.',
          avaliar: 'Decisão individual: avalie os itens abaixo e, se a companhia pedir, preencha o MEDIF com os dados que fundamentam a liberação.',
          'nao-voar': 'Não liberar agora. Há impedimento até o prazo ou a condição indicada.',
        }
    : trip
      ? {
          liberado: 'Pelas suas respostas, nada impede o voo.',
          cuidados: 'Você pode voar, seguindo os cuidados abaixo.',
          avaliar: 'Não voe como tripulante até o médico examinador decidir. Leve os documentos do seu tratamento.',
          'nao-voar': 'Não voe agora. Atuar como tripulante nessas condições contraria as regras da ANAC e da FAA.',
        }
      : {
          liberado: 'Pelas suas respostas, nada impede o voo.',
          cuidados: 'Você pode voar, seguindo os cuidados abaixo.',
          avaliar: 'Converse com seu médico antes de comprar a passagem. A companhia pode pedir o formulário médico (MEDIF).',
          'nao-voar': 'Não voe agora. Espere o prazo ou a melhora indicada abaixo.',
        };
  return { texto: t[v.nivel], aviso };
}
