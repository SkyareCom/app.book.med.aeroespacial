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
];
