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
];
