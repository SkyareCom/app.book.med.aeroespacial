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
        tripulante: e('avaliar', 'Risco alto de fadiga: planeje um cochilo antes ou fale com a escala.', 'FAA AC 120-100: desempenho estável até 16 h, queda após 18–20 h; cochilo prévio de 25–30 min; FRMS da empresa.', '8.5'),
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
];
