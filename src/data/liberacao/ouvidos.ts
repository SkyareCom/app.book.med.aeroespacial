// Formulário de liberação para voo seguro · bloco dos ouvidos, seios da face e dentes (M2V3).
// Cada resposta tem um efeito para o passageiro e outro para o tripulante, com texto leigo e texto para o médico.
// Fontes no registro de revisão de src/data/capitulos/ouvidos.ts (ICAO Doc 8984 Part III Cap. 12; RBAC 67.97, 67.101 e
// 67.103; FAA 14 CFR 67.105, Guia do AME Item 30 e AIM 8-1-2; CDC Yellow Book; Felkai et al., Br Dent J 2023;
// GPnotebook, ENT disorders and flying (CAA e IATA Medical Manual 11ª ed.): cirurgia do ouvido médio, até 9 dias não
// apto, 10 dias ou mais com atestado do otorrino; NHS Worcestershire, tubo de ventilação: voar é seguro). Sem
// fonte: [confirmar na referência].

import type { EfeitoLiberacao, PerguntaLiberacao } from '../tipos';

const ok = (topico?: string): EfeitoLiberacao => ({ nivel: 'liberado', leigo: '', medico: '', topico });
const e = (nivel: EfeitoLiberacao['nivel'], leigo: string, medico: string, topico: string): EfeitoLiberacao => ({ nivel, leigo, medico, topico });

export const liberacaoOuvidos: PerguntaLiberacao[] = [
  {
    id: 'orl-nariz',
    pergunta: 'Está resfriado, com sinusite, alergia em crise ou nariz entupido?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim',
        passageiro: e('cuidados', 'Pode adiar o voo. Se voar, um descongestionante pode aliviar; comece a equalizar cedo na descida.', 'CDC: infecção de ouvido, nariz ou seios ou congestão forte, considerar adiar; descongestionante oral ou nasal pode aliviar.', '3.2'),
        tripulante: e('nao-voar', 'Não voe com o nariz entupido. Reavalie em 7 a 10 dias.', 'ICAO Doc 8984 12.14.1–12.14.2 e 12.17.2: não voar resfriado; risco de aerotite, aerossinusite e barotrauma do ouvido interno; AIM 8-1-2: spray não protege o bastante.', '3.2'),
      },
    ],
  },
  {
    id: 'orl-ouvido',
    pergunta: 'Tem dor de ouvido, ouvido cheio que não destrava, perfuração ou saída de líquido?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, desde um voo recente',
        passageiro: e('avaliar', 'Procure avaliação médica antes de voar de novo.', 'Barotrauma do ouvido médio: graduar pela escala de Teed; perfuração e líquido pedem acompanhamento.', '3.2'),
        tripulante: e('nao-voar', 'Não voe até o processo agudo passar e o tímpano estar normal.', 'ICAO 12.4.2: sinais e sintomas de aerotite incompatíveis com o voo ativo; RBAC 67.97(b); 67.15(c).', '3.2'),
      },
      {
        rotulo: 'Perfuração antiga, única e seca',
        passageiro: e('cuidados', 'Pode voar; converse com o médico se tiver dor ou secreção.', 'Perfuração seca sem sintomas: sem impedimento descrito para o passageiro.', '3.3'),
        tripulante: e('cuidados', 'Pode voar se a audição cumprir o requisito.', 'ICAO Anexo 1 6.3.2.25.1 e RBAC 67.97(b): perfuração única e seca não torna inapto se cumprir 67.101; FAA: resolvida e sem sintomas, emitir.', '3.3'),
      },
    ],
  },
  {
    id: 'orl-cirurgia',
    pergunta: 'Fez cirurgia no ouvido?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, no estribo (estapedectomia)',
        passageiro: e('avaliar', 'Espere ao menos 10 dias e a liberação do otorrino.', 'Cirurgia do ouvido médio: até o 9º dia, não voar; a partir do 10º, com atestado do otorrino (CAA e IATA, via GPnotebook). Prótese do estribo: risco de deslocamento e vertigem com variação súbita de pressão.', '3.3'),
        tripulante: e('nao-voar', 'Não voe nos primeiros 1 a 3 meses; depois, só com avaliação especializada.', 'ICAO 12.5.3–12.5.4: 1 a 3 meses sem voar; avaliação da tuba e sem vertigem na Valsalva; depois restrição a tripulação múltipla por 2 anos; FAA: decisão da FAA com relatório do cirurgião.', '3.3'),
      },
      {
        rotulo: 'Tubo de ventilação no tímpano',
        passageiro: e('cuidados', 'Pode voar: o tubo iguala a pressão sozinho.', 'Tubo de ventilação: voar é seguro com o tubo no lugar (NHS, Worcestershire).', '3.2'),
        tripulante: e('avaliar', 'Leve o relatório do otorrino ao examinador.', 'ICAO 12.5.1: miringotomia sem restrição; avaliar a doença de base e a tuba.', '3.2'),
      },
      {
        rotulo: 'Sim, outra cirurgia do ouvido',
        passageiro: e('avaliar', 'Espere ao menos 10 dias e a liberação do otorrino.', 'Cirurgia do ouvido médio: até o 9º dia, não voar; a partir do 10º, com atestado do otorrino (CAA e IATA, via GPnotebook).', '3.3'),
        tripulante: e('avaliar', 'Só volte a voar com a liberação do examinador.', 'ICAO 12.5.1 e 12.5.7: miringotomia e mastoidectomia simples e timpanoplastia sem restrição se sem vertigem e com audição normal; mastoidectomia radical, avaliação completa; FAA: decisão da FAA.', '3.3'),
      },
    ],
  },
  {
    id: 'orl-vertigem',
    pergunta: 'Tem tido vertigem, a sensação de que tudo gira?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, agora ou nos últimos dias',
        passageiro: e('avaliar', 'Procure avaliação antes de voar.', 'Vertigem ativa: investigar causa vestibular (Ménière, neurite, posicional, fístula).', '3.3'),
        tripulante: e('nao-voar', 'Não voe até ser avaliado e se recuperar.', 'RBAC 67.97(d): transtorno vestibular transitório, não apto até se restabelecer; ICAO Anexo 1 6.3.2.25(a); FAA: transitório pode não desqualificar após recuperação completa.', '3.3'),
      },
    ],
  },
  {
    id: 'orl-dente',
    pergunta: 'Fez tratamento dentário recente ou tem dor de dente?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Restauração ou extração simples nos últimos 2 dias',
        passageiro: e('cuidados', 'Espere 24 h depois da restauração (de preferência 1 semana) e 24 a 48 h depois da extração simples.', 'Felkai et al. 2023: restauração 24 h (1 semana recomendada); extração simples 24–48 h; sem dor, inchaço ou sangramento.', '3.6'),
        tripulante: e('cuidados', 'Espere o mesmo prazo e não voe com curativo dentário.', 'Mesmos prazos; RBAC 67.103(a)(6): sem curativo dentário.', '3.6'),
      },
      {
        rotulo: 'Canal, implante ou extração cirúrgica nos últimos 3 dias',
        passageiro: e('nao-voar', 'Espere 72 horas sem dor, inchaço nem sangramento.', 'Felkai et al. 2023: implante sem complicação, extração cirúrgica e tratamento de canal, 72 h.', '3.6'),
        tripulante: e('nao-voar', 'Não voe antes de 72 horas nem com tratamento de canal em curso.', 'Felkai et al. 2023: 72 h; RBAC 67.103(a)(7): sem tratamento endodôntico em curso.', '3.6'),
      },
      {
        rotulo: 'Levantamento do seio ou enxerto ósseo nas últimas 2 semanas',
        passageiro: e('nao-voar', 'Espere pelo menos 2 semanas e confirme que o seio não dá sintomas.', 'Felkai et al. 2023: ao menos 2 semanas após levantamento do seio; preferir retorno por terra ou mar.', '3.6'),
        tripulante: e('nao-voar', 'Não voe antes de 2 semanas e sem sintomas no seio.', 'Felkai et al. 2023: ao menos 2 semanas; RBAC 67.103.', '3.6'),
      },
      {
        rotulo: 'Dor de dente que piora no voo',
        passageiro: e('avaliar', 'Procure o dentista antes de voar.', 'Barodontalgia: dente com doença prévia (classes de Ferjentsik e Aker); descartar barossinusite maxilar.', '3.6'),
        tripulante: e('nao-voar', 'Não voe até tratar o dente.', 'Barodontalgia pode distrair ou incapacitar; RBAC 67.103(a): sem cárie profunda, doença periapical ou endodontia em curso.', '3.6'),
      },
    ],
  },
  {
    id: 'orl-audicao',
    pergunta: 'Perdeu a audição de repente, tem zumbido novo ou usa aparelho auditivo?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Perda súbita de audição ou zumbido novo',
        passageiro: e('avaliar', 'Procure o otorrino com urgência antes de voar.', 'Surdez súbita: avaliação e corticoide precoces; investigar barotrauma e fístula.', '3.4'),
        tripulante: e('nao-voar', 'Não voe até a avaliação do otorrino e uma nova audiometria.', 'ANAC: audiometria de 250 a 8.000 Hz; FAA: voz a 2 metros ou audiometria nos limites.', '3.4'),
      },
      {
        rotulo: 'Perda por ruído ou aparelho auditivo, estável',
        passageiro: ok('3.1'),
        tripulante: e('avaliar', 'Mostre a audiometria ao examinador e use proteção auditiva.', 'ANAC: audiometria sem aparelho; 2ª e 4ª classes aceitam voz a 2 metros. FAA: voz a 2 metros ou audiometria nos limites.', '3.4'),
      },
    ],
  },
];
