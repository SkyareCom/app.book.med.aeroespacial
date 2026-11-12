// M2V12 · Formulário de liberação para passageiro, tripulante e médico.
// FONTES: ANAC RBAC 67, 67.95 e 67.135 (ósteo-articulares); ICAO Anexo 1, 6.3.2.23; FAA AME Guide Items 42 e 43, SODA e
// Do Not Issue / Do Not Fly; FAA OTC Medications for Pilots; UK CAA Surgical conditions (gesso 24/48 h, tala pneumática,
// lesão nos 7 dias); CDC Yellow Book 2026 (trombose); ANAC Resolução 280/2013 (assistência com 48 h).
// NÃO substitui decisão clínica, autorização de transporte ou CMA.
import type { PerguntaLiberacao } from '../tipos';

export const liberacaoOssos: PerguntaLiberacao[] = [
  {
    id: 'm2v12-coluna',
    pergunta: 'Como está a dor no pescoço ou nas costas hoje?',
    ajuda: 'Dormência ou fraqueza num braço ou numa perna contam como sinal neurológico.',
    opcoes: [
      {
        rotulo: 'Sem dor, ou dor leve que não limita o movimento',
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '12.2' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '12.2' },
      },
      {
        rotulo: 'Dor que limita o movimento, sem dormência nem fraqueza',
        passageiro: {
          nivel: 'cuidados',
          leigo: 'Pode voar: ajuste o assento, levante-se quando for seguro e prefira analgésico comum.',
          medico: 'Dor mecânica sem déficit: orientar postura, mobilidade e analgesia que não dê sono.',
          topico: '12.2',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: 'Não assuma a função enquanto a dor limitar o movimento ou tirar a atenção.',
          medico: 'RBAC 67.95(a)/67.135(a): deficiência funcional que pode afetar a segurança; reavaliar com a função recuperada.',
          topico: '12.2',
        },
      },
      {
        rotulo: 'Dor com dormência ou fraqueza num braço ou numa perna',
        passageiro: {
          nivel: 'avaliar',
          leigo: 'Procure o médico antes de viajar.',
          medico: 'Sinal de compressão radicular: investigar hérnia de disco e déficit antes do voo.',
          topico: '12.2',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: 'Não voe; procure o médico e informe o examinador.',
          medico: 'RBAC 67.95(b)(4)/67.135(b)(4): hérnia discal com sintomatologia neurológica, inapto; FAA Item 43: hérnia sintomática, decisão da FAA.',
          topico: '12.2',
        },
      },
      {
        rotulo: 'Cirurgia de disco no passado, recuperado, sem remédio e sem déficit',
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '12.2' },
        tripulante: {
          nivel: 'avaliar',
          leigo: 'Leve o relatório do cirurgião ao examinador.',
          medico: 'FAA Item 43, nota 14: cirurgia de disco não desqualifica; o AME emite se assintomático, recuperado, sem remédio e sem déficit. No Brasil, avaliação do examinador.',
          topico: '12.2',
        },
      },
    ],
  },
  {
    id: 'm2v12-gesso',
    pergunta: 'Há gesso, tala ou fratura recente?',
    ajuda: 'Gesso: 24 h para voo de menos de 2 h e 48 h para os mais longos (maioria das companhias, segundo a CAA britânica).',
    opcoes: [
      {
        rotulo: 'Não',
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '12.3' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '12.3' },
      },
      {
        rotulo: 'Gesso dentro do prazo cumprido, sem inchaço',
        passageiro: {
          nivel: 'cuidados',
          leigo: 'Pode voar: corredor, mexa o que estiver livre e peça assistência com 48 h.',
          medico: 'Perna imobilizada é fator de risco de trombose (CDC), sobretudo em voos de mais de 4 h: avaliar meia de compressão ou heparina caso a caso.',
          topico: '12.3',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: 'Não exerça função com membro engessado.',
          medico: 'Membro imobilizado limita comandos e evacuação: deficiência funcional (RBAC 67.95(a)/67.135(a)).',
          topico: '12.3',
        },
      },
      {
        rotulo: 'Gesso colocado antes do prazo (menos de 24 ou 48 h)',
        passageiro: {
          nivel: 'nao-voar',
          leigo: 'Espere o prazo; se a viagem for urgente, fale com o médico sobre abrir o gesso.',
          medico: 'UK CAA: inchaço com compressão circulatória; se urgente, gesso bivalvado. Tala pneumática: soltar parte do ar.',
          topico: '12.3',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: 'Não exerça função.',
          medico: 'Fratura recente imobilizada: inapto até consolidação e recuperação funcional.',
          topico: '12.3',
        },
      },
      {
        rotulo: 'Lesão por queda ou acidente nos últimos 7 dias',
        passageiro: {
          nivel: 'avaliar',
          leigo: 'Fale com a companhia aérea e com o seu médico antes de viajar.',
          medico: 'UK CAA: lesão traumática nos 7 dias antes da viagem pede contato com a companhia; atenção ao trauma de tórax.',
          topico: '12.3',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: 'Não exerça função até a avaliação.',
          medico: 'Avaliar lesão, dor, remédios e função antes do retorno.',
          topico: '12.3',
        },
      },
    ],
  },
  {
    id: 'm2v12-protese',
    pergunta: 'Usa prótese, tem amputação ou alguma articulação limitada?',
    opcoes: [
      {
        rotulo: 'Não',
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '12.4' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '12.4' },
      },
      {
        rotulo: 'Sim, estável e adaptado',
        passageiro: {
          nivel: 'cuidados',
          leigo: 'Pode voar: peça assistência com 48 h; a ajuda técnica de locomoção vai sem custo.',
          medico: 'ANAC Resolução 280/2013: assistência, ajuda técnica gratuita e assento fora da saída de emergência.',
          topico: '12.4',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: 'Leve ao examinador o relatório de força e movimento.',
          medico: 'ICAO 6.3.2.23: avaliação funcional; FAA Item 42: relatório funcional, SODA ou decisão da FAA, com possível prova de voo médica.',
          topico: '12.4',
        },
      },
      {
        rotulo: 'Prótese recente, artrite em atividade ou articulação que atrapalha o comando',
        passageiro: {
          nivel: 'avaliar',
          leigo: 'Confirme com o médico o prazo e a prevenção de trombose.',
          medico: 'Cirurgia recente: prazo do cirurgião e risco de trombose; artrite: dor e mobilidade para a viagem.',
          topico: '12.4',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: 'Não exerça função até a avaliação.',
          medico: 'RBAC 67.95(b)(1)-(2)/67.135(b)(1)-(2): doença ativa ou sequela funcional; FAA: decisão central.',
          topico: '12.4',
        },
      },
    ],
  },
  {
    id: 'm2v12-remedios',
    pergunta: 'Que remédio para dor ou músculo usou nas últimas 48 horas?',
    ajuda: 'Regra da FAA para Do Not Fly: esperar 5 meias-vidas ou, sem esse dado, 5 vezes o intervalo entre as doses.',
    opcoes: [
      {
        rotulo: 'Nenhum, ou só paracetamol, ibuprofeno ou naproxeno',
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '12.2' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '12.2' },
      },
      {
        rotulo: 'Versão "PM", relaxante muscular ou opioide',
        passageiro: {
          nivel: 'cuidados',
          leigo: 'Pode voar; cuidado com o sono, sobretudo se estiver com a perna imobilizada.',
          medico: 'Sedação somada à imobilidade: orientar mobilidade e evitar dose extra a bordo.',
          topico: '12.2',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: 'Não voe até cumprir o prazo de espera.',
          medico: 'FAA: relaxantes musculares, analgésicos narcóticos, tramadol e difenidramina ("PM") são Do Not Fly. Espera de 5 meias-vidas ou 5 vezes o intervalo.',
          topico: '12.2',
        },
      },
      {
        rotulo: 'Corticoide acima de 20 mg/dia de prednisona ou opioide de uso contínuo',
        passageiro: {
          nivel: 'cuidados',
          leigo: 'Mantenha o remédio como prescrito e leve na bagagem de mão.',
          medico: 'Não suspender corticoide por conta própria; avaliar a doença de base.',
          topico: '12.4',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: 'Não voe; o examinador precisa encaminhar.',
          medico: 'FAA: corticoide acima de 20 mg/dia e uso crônico de substância controlada são Do Not Issue.',
          topico: '12.4',
        },
      },
    ],
  },
  {
    id: 'm2v12-cirurgia',
    pergunta: 'Fez cirurgia de coluna, prótese de articulação ou cirurgia de fratura nos últimos meses?',
    ajuda: 'As fontes consultadas não dão prazo fixo ao passageiro: o prazo é do cirurgião.',
    opcoes: [
      { rotulo: 'Não', passageiro: { nivel: 'liberado', leigo: '', medico: '' }, tripulante: { nivel: 'liberado', leigo: '', medico: '' } },
      { rotulo: 'Cirurgia de disco ou de coluna', passageiro: { nivel: 'avaliar', leigo: 'Voe com a liberação do cirurgião; levante-se e ande no voo longo.', medico: 'Prazo do cirurgião; CDC: cirurgia recente é fator de risco de trombose em voo > 4 h.', topico: '12.2' }, tripulante: { nivel: 'avaliar', leigo: 'Volte sem sintomas, recuperado e sem remédio que dê sono; fale com o examinador.', medico: 'FAA Item 43, nota 14: cirurgia de disco não desqualifica; AME emite se assintomático, recuperado, sem medicação e sem déficit. RBAC 67.95(b)(4): hérnia com sintoma neurológico.', topico: '12.2' } },
      { rotulo: 'Prótese de quadril, joelho ou ombro', passageiro: { nivel: 'avaliar', leigo: 'Voe com a liberação do cirurgião e previna a trombose.', medico: 'Prazo do cirurgião (sem número nas fontes consultadas); meia de compressão 15 a 30 mmHg no risco alto (CDC).', topico: '12.4' }, tripulante: { nivel: 'avaliar', leigo: 'Volte sem dor e com a função recuperada; fale com o examinador.', medico: 'FAA Item 42: limitação que interfira, decisão da FAA; SODA possível na condição estável. RBAC 67.95(a).', topico: '12.4' } },
      { rotulo: 'Fixação de fratura com placa, parafuso ou haste', passageiro: { nivel: 'avaliar', leigo: 'Voe com a liberação do cirurgião; peça assento com espaço se a perna estiver imobilizada.', medico: 'Prazo do cirurgião; UK CAA: gesso 24/48 h; trombose (CDC).', topico: '12.3' }, tripulante: { nivel: 'nao-voar', leigo: 'Não voe até a consolidação e a força para operar os comandos e sair da aeronave.', medico: 'RBAC 67.95(b)(1)–(2); ICAO 6.3.2.23: avaliação funcional.', topico: '12.3' } },
    ],
  },
  {
    id: 'oss-movimento-hoje',
    pergunta: "Alguma dor ou rigidez limita o movimento hoje, como virar o pescoço ou sair rápido do assento?",
    ajuda: "Vale para qualquer osso, músculo ou articulação.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '12.1' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '12.1' },
      },
      {
        rotulo: "Sim, leve, sem limitar o movimento",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Prefira o corredor, levante-se e mexa as pernas quando for seguro e apoie as costas no encosto.",
          medico: "Dor leve sem limitação funcional: liberar com orientações de mobilidade.",
          topico: '12.1',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Pode assumir se não usar remédio que dá sono.",
          medico: "Dor leve sem limitação funcional e sem medicação sedativa.",
          topico: '12.1',
        },
      },
      {
        rotulo: "Sim, limita o movimento",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Confira se a lesão está estável, prefira o corredor e leve o remédio de uso diário na bagagem de mão.",
          medico: "Limitação funcional no passageiro: confirmar estabilidade da lesão; evitar sedativo em voo longo.",
          topico: '12.1',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não assuma a função com dor que limite o movimento.",
          medico: "Dor com limitação funcional: não apto para a função até a recuperação.",
          topico: '12.1',
        },
      },
    ],
  },
  {
    id: 'oss-retorno-voo',
    pergunta: "Está voltando a voar depois de uma lesão de osso, músculo ou articulação?",
    ajuda: "O retorno depende da função recuperada, não só do tempo.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '12.5' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '12.5' },
      },
      {
        rotulo: "Sim, com a função recuperada e o examinador de acordo",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '12.5' },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Mantenha no treino semanal exercícios para pescoço, tronco e pernas.",
          medico: "Retorno com função recuperada e concordância do examinador; manter condicionamento.",
          topico: '12.5',
        },
      },
      {
        rotulo: "Sim, ainda sem a função recuperada",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Confira com o seu médico se a lesão está estável para a viagem.",
          medico: "Lesão em recuperação: confirmar estabilidade para a viagem.",
          topico: '12.5',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Volte quando a função estiver recuperada e o examinador concordar.",
          medico: "Retorno ao voo só com função recuperada e concordância do examinador.",
          topico: '12.5',
        },
      },
    ],
  },
];
