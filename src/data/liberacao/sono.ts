// Formulário de liberação para voo seguro · bloco do sono, relógio biológico e fadiga (M2V8).
// Cada resposta tem um efeito para o passageiro e outro para o tripulante, com texto leigo e texto para o médico.
// Fontes no registro de revisão de src/data/capitulos/sono.ts (ICAO Doc 8984 Part III Cap. 17 e Doc 9966; FAA AC
// 120-100, Guia do AME e 14 CFR 117; CDC Yellow Book; Lei 13.475/2017; RBAC 67). Sem fonte: [confirmar na referência].

import type { EfeitoLiberacao, PerguntaLiberacao } from '../tipos';

const ok = (topico?: string): EfeitoLiberacao => ({ nivel: 'liberado', leigo: '', medico: '', topico });
const e = (nivel: EfeitoLiberacao['nivel'], leigo: string, medico: string, topico: string): EfeitoLiberacao => ({ nivel, leigo, medico, topico });

export const liberacaoSono: PerguntaLiberacao[] = [
  {
    id: 'sono-noite',
    pergunta: 'Quanto dormiu nas últimas 24 horas, em relação ao seu habitual?',
    ajuda: 'A maioria dos adultos precisa de 7 a 9 horas.',
    opcoes: [
      { rotulo: 'O habitual', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Cerca de 2 horas a menos',
        passageiro: e('cuidados', 'Pode voar. Evite dirigir na chegada se estiver sonolento.', 'Perda de 2 h já reduz a vigilância no dia seguinte (FAA AC 120-100).', '8.5'),
        tripulante: e('cuidados', 'Avalie se está em condições e avise a escala se estiver cansado.', 'FAA AC 120-100: perda de 2 h/dia prejudica; Anexo 6 e Doc 8984 17.2.2: fadiga como capacidade reduzida; 14 CFR 117.5 e 61.53.', '8.5'),
      },
      {
        rotulo: 'Bem menos, ou noites curtas há vários dias',
        passageiro: e('cuidados', 'Pode voar. Não dirija na chegada; durma assim que puder.', 'Dívida de sono cumulativa: 4 noites de 5 h ≈ 40 h sem dormir (FAA AC 120-100).', '8.5'),
        tripulante: e('nao-voar', 'Não aceite o serviço sem descansar. Avise a escala ou o comandante.', 'Fadiga cumulativa (Doc 8984 17.2.3); recuperação exige ≥ 2 noites sem restrição (Doc 9966); 14 CFR 117.5(c): não se apresentar fatigado; 67.15(c).', '8.5'),
      },
    ],
  },
  {
    id: 'sono-vigilia',
    pergunta: 'Na hora prevista do pouso, quantas horas estará acordado?',
    opcoes: [
      { rotulo: 'Até 16 horas', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Mais de 16 horas',
        passageiro: e('cuidados', 'Evite dirigir na chegada; use transporte ou descanse antes.', 'Desempenho deteriora após 16 h acordado e claramente após 18–20 h (FAA AC 120-100).', '8.5'),
        tripulante: e('avaliar', 'Risco alto de fadiga: descanse ou cochile antes e fale com a escala.', 'FAA AC 120-100: desempenho estável até 16 h, queda após 18–20 h; cochilo prévio de 25–30 min; FRMS da empresa.', '8.5'),
      },
    ],
  },
  {
    id: 'sono-fusos',
    pergunta: 'Este voo ou os últimos dias cruzaram fusos horários?',
    ajuda: 'O jet lag começa a contar a partir de 2 fusos.',
    opcoes: [
      { rotulo: 'Não, ou só 1 fuso', passageiro: ok(), tripulante: ok() },
      {
        rotulo: '2 ou mais fusos para o oeste',
        passageiro: e('cuidados', 'Pegue luz no fim da tarde no destino e fique acordado até a hora local de dormir.', 'Atraso de fase; adaptação ~1,5 h/dia; luz vespertina; melatonina matinal de baixa dose (CDC Yellow Book).', '8.4'),
        tripulante: e('cuidados', 'Em pernoite curto, fique no horário de casa. Com 3 ou mais fusos, a lei prevê repouso maior na base.', 'Doc 8984 17.3.3: < 3 dias, horário de casa; Lei 13.475, art. 49: +2 h de repouso por fuso (≥ 3 fusos); 14 CFR 117.25.', '8.4'),
      },
      {
        rotulo: '2 ou mais fusos para o leste',
        passageiro: e('cuidados', 'Pegue luz pela manhã no destino, evite luz forte à noite e prepare o sono antes de viajar.', 'Avanço de fase; adaptação ~1 h/dia; luz matinal; melatonina 0,5–1 mg ~90 min antes de deitar (CDC Yellow Book).', '8.4'),
        tripulante: e('cuidados', 'Em pernoite curto, fique no horário de casa. Com 3 ou mais fusos, a lei prevê repouso maior na base.', 'Doc 8984 17.3.3–17.3.4; Lei 13.475, art. 49; ICAO: melatonina em geral não recomendada para tripulantes (17.5).', '8.4'),
      },
    ],
  },
  {
    id: 'sono-remedio',
    pergunta: 'Usou remédio para dormir?',
    ajuda: 'Inclui zolpidem, zaleplona, eszopiclona, temazepam e anti-histamínicos que dão sono.',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, de forma ocasional',
        passageiro: e('cuidados', 'Pode voar. Não misture com álcool e evite os de ação longa a bordo.', 'Hipnóticos de curta ação aceitáveis por poucas noites; evitar anti-histamínicos e benzodiazepínicos de ação longa (CDC Yellow Book).', '8.7'),
        tripulante: e('avaliar', 'Respeite o tempo de espera do remédio antes de voar e use só o que já testou em solo.', 'FAA: 5 meias-vidas (zaleplona 12 h; zolpidem 24 h; eszopiclona 30 h; temazepam 72 h). ICAO 17.4: ≤ 3–4 doses/semana, teste em solo; zolpidem com ≥ 12 h até a apresentação (AsMA).', '8.7'),
      },
      {
        rotulo: 'Sim, quase todas as noites',
        passageiro: e('cuidados', 'Pode voar; converse com o médico sobre o uso contínuo.', 'Uso contínuo de hipnótico: avaliar insônia crônica e efeitos residuais.', '8.7'),
        tripulante: e('nao-voar', 'Não voe até a avaliação do médico examinador.', 'FAA: uso diário não permitido; condição crônica do sono desqualifica (14 CFR 67.113(c)). ANAC: a critério (RBAC 67.71(c)); 67.15(c).', '8.7'),
      },
    ],
  },
  {
    id: 'sono-sonolencia',
    pergunta: 'Ronca alto ou cochila sem querer durante o dia?',
    ajuda: 'Inclui pausas na respiração percebidas por quem dorme junto.',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, e já tenho apneia tratada com CPAP',
        passageiro: e('cuidados', 'Pode voar com o CPAP; combine o uso a bordo com a companhia.', 'Apneia tratada: levar o CPAP; uso a bordo conforme a companhia (Veja M2V1).', '8.7'),
        tripulante: e('cuidados', 'Pode voar com o tratamento eficaz e em uso.', 'Doc 8984 17.6: apto com tratamento eficaz e aderência comprovada.', '8.7'),
      },
      {
        rotulo: 'Sim, sem diagnóstico',
        passageiro: e('cuidados', 'Pode voar, mas não dirija sonolento e procure avaliação.', 'Sonolência diurna excessiva: investigar apneia, narcolepsia, hipersonia idiopática, movimentos periódicos das pernas.', '8.7'),
        tripulante: e('nao-voar', 'Não voe até avaliar o sono com o médico.', 'Doc 8984 17.6: Epworth ≥ 10 ou história sugestiva, inapto temporário até polissonografia; pescoço > 43 cm ou IMC > 30 com ronco; FAA: condição crônica do sono desqualifica até tratada.', '8.7'),
      },
    ],
  },
  {
    id: 'sono-tratamento',
    pergunta: 'Tem diagnóstico ou tratamento de algum destes distúrbios do sono?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Insônia crônica em terapia, sem remédio diário',
        passageiro: ok('8.7'),
        tripulante: e('cuidados', 'Pode voar; conte ao examinador e mantenha a higiene do sono.', 'AASM (2026): terapia cognitivo-comportamental para insônia como primeira escolha; FAA: uso diário de hipnótico não permitido.', '8.7'),
      },
      {
        rotulo: 'Cirurgia para apneia do sono',
        passageiro: e('avaliar', 'Viaje com a liberação do cirurgião; leve o CPAP se ainda o usa.', 'Prazo pós-operatório: conforme o cirurgião [confirmar na referência].', '8.7'),
        tripulante: e('avaliar', 'Volte a voar quando o tratamento se mostrar eficaz.', 'FAA (OSA): certificação após tratamento eficaz comprovado; Doc 8984 17.6.', '8.7'),
      },
      {
        rotulo: 'Narcolepsia ou hipersonia',
        passageiro: e('cuidados', 'Pode voar com o remédio no horário, ajustado ao fuso.', 'Manter o tratamento; ajuste de horário com o médico.', '8.7'),
        tripulante: e('nao-voar', 'Não pode voar como tripulante; fale com o examinador.', 'FAA, Narcolepsy/Hypersomnia: "incompatible with aviation safety", tratada ou não; decisão da FAA.', '8.7'),
      },
      {
        rotulo: 'Pernas inquietas em tratamento',
        passageiro: e('cuidados', 'Pode voar; levante e caminhe no voo longo.', 'Movimento das pernas no voo longo também previne trombose (Veja M2V2 - VII).', '8.7'),
        tripulante: e('avaliar', 'Fale com o examinador; alguns remédios dão sono.', 'FAA, Restless Leg: adiar a emissão; remédio, dose e efeitos, hemograma e ferritina de até 90 dias; possível autorização especial.', '8.7'),
      },
    ],
  },
  {
    id: 'sono-madrugada',
    pergunta: "O voo cai entre 1 e 5 horas do seu relógio biológico?",
    ajuda: "É a faixa de pior desempenho do dia.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '8.1' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '8.1' },
      },
      {
        rotulo: "Sim",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Planeje o sono e não dirija sonolento ao chegar.",
          medico: "Janela circadiana de baixo desempenho (1 a 5 horas): orientar sono e cautela ao dirigir.",
          topico: '8.1',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Planeje o sono antes e deixe as tarefas difíceis fora dessa faixa quando puder.",
          medico: "Janela circadiana de baixo desempenho (1 a 5 horas): planejar sono e carga de trabalho.",
          topico: '8.1',
        },
      },
    ],
  },
  {
    id: 'sono-refeicao-noite',
    pergunta: "Trabalha ou viaja de madrugada e faz a refeição principal nesse horário?",
    ajuda: "De madrugada, o corpo tolera menos a glicose.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '8.2' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '8.2' },
      },
      {
        rotulo: "Sim",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Prefira refeições leves de madrugada e a refeição principal no horário de dia.",
          medico: "Tolerância à glicose menor de madrugada; grelina alta e leptina baixa após noites curtas.",
          topico: '8.2',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Prefira refeições leves de madrugada e a refeição principal no horário de dia.",
          medico: "Tolerância à glicose menor de madrugada; grelina alta e leptina baixa após noites curtas.",
          topico: '8.2',
        },
      },
    ],
  },
  {
    id: 'sono-direcao',
    pergunta: "Para que lado vai cruzar os fusos?",
    ajuda: "Leste: por exemplo, do Brasil para a Europa. Oeste: do Brasil para o Pacífico.",
    opcoes: [
      {
        rotulo: "Não vou cruzar fusos",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '8.3' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '8.3' },
      },
      {
        rotulo: "Leste",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Adiante o sono e procure luz pela manhã; não dirija sonolento no primeiro dia.",
          medico: "Voo para leste: avanço de fase, mais difícil; luz matinal.",
          topico: '8.3',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Adiante o sono e procure luz pela manhã.",
          medico: "Voo para leste: avanço de fase, mais difícil; luz matinal.",
          topico: '8.3',
        },
      },
      {
        rotulo: "Oeste",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Atrase o sono e aproveite a luz do fim do dia; não dirija sonolento no primeiro dia.",
          medico: "Voo para oeste: atraso de fase; luz no fim do dia.",
          topico: '8.3',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Atrase o sono e aproveite a luz do fim do dia.",
          medico: "Voo para oeste: atraso de fase; luz no fim do dia.",
          topico: '8.3',
        },
      },
      {
        rotulo: "Fico menos de 2 dias no destino",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Fique no horário de casa.",
          medico: "Estadia curta (menos de 2 dias): manter o horário de origem.",
          topico: '8.3',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Fique no horário de casa.",
          medico: "Estadia curta (menos de 2 dias): manter o horário de origem.",
          topico: '8.3',
        },
      },
    ],
  },
  {
    id: 'sono-repouso-jornada',
    pergunta: "No repouso antes desta jornada, teve a oportunidade de sono prevista?",
    ajuda: "Pergunta para o tripulante.",
    opcoes: [
      {
        rotulo: "Sim",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '8.6' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '8.6' },
      },
      {
        rotulo: "Saio de uma sequência de madrugadas ou de jornadas longas",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '8.6' },
        tripulante: {
          nivel: 'cuidados',
          leigo: "A recuperação pede 2 noites seguidas de sono livre.",
          medico: "Recuperação após madrugadas ou jornadas longas: 2 noites consecutivas de sono livre.",
          topico: '8.6',
        },
      },
      {
        rotulo: "Não tive 8 horas seguidas de oportunidade de sono",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '8.6' },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Avise a empresa antes de assumir.",
          medico: "14 CFR 117: sem as 8 horas de oportunidade de sono ininterrupto, o tripulante notifica a empresa.",
          topico: '8.6',
        },
      },
    ],
  },
];
