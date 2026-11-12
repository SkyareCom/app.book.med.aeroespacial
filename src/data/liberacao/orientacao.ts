// Formulário de liberação para voo seguro · bloco do labirinto e da orientação espacial (M2V5).
// A vertigem por doença do labirinto já está no bloco dos ouvidos (orl-vertigem); aqui entram desorientação e cinetose.
// Fontes no registro de revisão de src/data/capitulos/orientacao.ts (ICAO Doc 8984 Part II 1.7, Part III 12.16–12.17 e
// Part V Cap. 2; RBAC 67.97(d); FAA, AIM 8-1-5, CAMI AM-400-03/1, AC 60-4A, OTC Medications for Pilots; CDC Yellow
// Book 2026). Sem fonte: [confirmar na referência].

import type { EfeitoLiberacao, PerguntaLiberacao } from '../tipos';

const ok = (topico?: string): EfeitoLiberacao => ({ nivel: 'liberado', leigo: '', medico: '', topico });
const e = (nivel: EfeitoLiberacao['nivel'], leigo: string, medico: string, topico: string): EfeitoLiberacao => ({ nivel, leigo, medico, topico });

export const liberacaoOrientacao: PerguntaLiberacao[] = [
  {
    id: 'orient-desorientacao',
    pergunta: 'Teve desorientação em voo, a sensação de que o avião estava numa posição que não era a real?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, uma vez, em nuvem ou à noite',
        passageiro: ok('5.4'),
        tripulante: e('cuidados', 'Pode voar. Relate o episódio e mantenha o treino de instrumentos e de ilusões em dia.', 'Desorientação fisiológica em condição típica (ICAO 12.16.4; Part II 1.7.7); reforçar proficiência por instrumentos (FAA AM-400-03/1).', '5.4'),
      },
      {
        rotulo: 'Sim, mais de uma vez ou fora de nuvem e noite',
        passageiro: e('avaliar', 'Procure avaliação médica.', 'Padrão persistente sugere doença do labirinto (ICAO 12.17.3).', '5.4'),
        tripulante: e('avaliar', 'Faça avaliação com o examinador antes de voar.', 'ICAO 12.17.1–12.17.3: separar vertigem verdadeira de tontura; investigar Ménière, neurite e vertigem posicional; RBAC 67.97(d).', '5.4'),
      },
    ],
  },
  {
    id: 'orient-cinetose',
    pergunta: 'Costuma enjoar em voo (cinetose)?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim',
        passageiro: e('cuidados', 'Sente perto das asas e na janela, durma bem, coma leve, olhe para longe e não leia na turbulência.', 'CDC Yellow Book 2026: assento perto das asas, horizonte visual, evitar movimentos da cabeça e leitura; evitar álcool e privação de sono.', '5.6'),
        tripulante: e('cuidados', 'O enjoo do aluno costuma passar com o treino. Se persistir ou exigir remédio, fale com o examinador.', 'Adaptação com exposição; remédios sedativos incompatíveis com o voo (FAA OTC Medications for Pilots).', '5.6'),
      },
    ],
  },
  {
    id: 'orient-remedio',
    pergunta: 'Tomou remédio para enjoo de movimento?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, dimenidrinato, meclizina, prometazina ou difenidramina',
        passageiro: e('cuidados', 'Pode voar. O remédio dá sono: não dirija depois do voo.', 'Anti-histamínicos sedativos (CDC Yellow Book 2026; prometazina a mais sedativa).', '5.6'),
        tripulante: e('nao-voar', 'Não voe até passar o prazo: 5 intervalos de dose desde a última (difenidramina, 60 horas).', 'FAA OTC Medications for Pilots: anti-histamínicos sedativos, aguardar 5 intervalos de dose; difenidramina 60 h; ICAO Part V 2.14.', '5.6'),
      },
      {
        rotulo: 'Sim, escopolamina (comprimido ou adesivo)',
        passageiro: e('cuidados', 'Pode voar. Pode dar boca seca, visão borrada e sono; não use se tiver glaucoma.', 'CDC Yellow Book 2026: contraindicada em glaucoma e risco de retenção urinária; evitar em crianças.', '5.6'),
        tripulante: e('nao-voar', 'Não voe sob efeito do remédio. Fale com o examinador.', 'Efeitos anticolinérgicos (visão borrada, sono); sem prazo próprio na lista da FAA [confirmar na referência].', '5.6'),
      },
    ],
  },
  {
    id: 'ori-sem-horizonte',
    pergunta: "Vai pilotar sem horizonte visível, à noite, dentro de nuvem ou sobre a água?",
    ajuda: "Passageiro: responda Não.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '5.1' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '5.1' },
      },
      {
        rotulo: "Sim",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '5.1' },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Mantenha uma referência: o indicador de atitude quando o horizonte some, sem misturar os dois, e evite mover a cabeça em curva.",
          medico: "Sem horizonte, o sistema vestibular engana: referência única nos instrumentos; confirmar tempo e visibilidade antes.",
          topico: '5.1',
        },
      },
    ],
  },
  {
    id: 'ori-ilusoes-labirinto',
    pergunta: "Sente inclinação falsa, giro que continua depois da curva ou nariz alto na decolagem sem visibilidade?",
    ajuda: "São ilusões do labirinto: o corpo erra quando falta a visão de fora.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '5.2' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '5.2' },
      },
      {
        rotulo: "Às vezes, e sigo o indicador de atitude",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '5.2' },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Acredite no indicador de atitude e espere a sensação passar; em curva, não abaixe nem gire a cabeça.",
          medico: "Ilusões vestibulares esperadas em voo por instrumentos: manejo por treino e disciplina de instrumentos.",
          topico: '5.2',
        },
      },
      {
        rotulo: "Com frequência ou também em voo visual",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Converse com o médico: pode haver um problema do labirinto.",
          medico: "Sensações vestibulares fora do voo por instrumentos: investigar doença vestibular.",
          topico: '5.2',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Fale com o médico examinador antes do próximo voo.",
          medico: "Sensações vestibulares fora do voo por instrumentos: investigar doença vestibular antes de liberar.",
          topico: '5.2',
        },
      },
    ],
  },
  {
    id: 'ori-pouso-noturno',
    pergunta: "Vai pousar à noite ou num aeroporto que não conhece?",
    ajuda: "Pista inclinada, estreita ou sem luzes em volta engana a visão.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '5.3' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '5.3' },
      },
      {
        rotulo: "Sim",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '5.3' },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Estude o aeroporto antes, use a rampa eletrônica ou o PAPI e, com dúvida sobre a altura, arremeta.",
          medico: "Ilusões visuais de aproximação: briefing do aeroporto, referência de rampa e critério de arremetida.",
          topico: '5.3',
        },
      },
    ],
  },
  {
    id: 'ori-treino-ilusoes',
    pergunta: "Fez no último ano uma demonstração de ilusões em simulador ou com instrutor?",
    ajuda: "Pergunta para quem pilota.",
    opcoes: [
      {
        rotulo: "Sim, e o treino de instrumentos e noturno está em dia",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '5.5' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '5.5' },
      },
      {
        rotulo: "Não sou piloto",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '5.5' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '5.5' },
      },
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '5.5' },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Faça a demonstração uma vez por ano e mantenha o treino de instrumentos e de voo noturno em dia.",
          medico: "Prevenção da desorientação espacial: demonstração anual de ilusões e proficiência em instrumentos.",
          topico: '5.5',
        },
      },
    ],
  },
];
