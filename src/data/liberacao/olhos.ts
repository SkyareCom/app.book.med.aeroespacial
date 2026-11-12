// Formulário de liberação para voo seguro · bloco dos olhos e da visão (M2V4).
// Cada resposta tem um efeito para o passageiro e outro para o tripulante, com texto leigo e texto para o médico.
// Fontes no registro de revisão de src/data/capitulos/olhos.ts (ICAO Doc 8984 Part III Cap. 11; RBAC 67.99 e 67.139;
// FAA, Guia do AME, tabelas de cirurgia refrativa e de lente intraocular, CACI Glaucoma, Eye Medication e Pharm ED;
// FAA AC 70-2B; Houston et al. 2012; IATA Medical Manual citado por GPnotebook; UK CAA). Sem fonte: [confirmar na
// referência].

import type { EfeitoLiberacao, PerguntaLiberacao } from '../tipos';

const ok = (topico?: string): EfeitoLiberacao => ({ nivel: 'liberado', leigo: '', medico: '', topico });
const e = (nivel: EfeitoLiberacao['nivel'], leigo: string, medico: string, topico: string): EfeitoLiberacao => ({ nivel, leigo, medico, topico });

export const liberacaoOlhos: PerguntaLiberacao[] = [
  {
    id: 'olho-correcao',
    pergunta: 'Usa óculos ou lente de contato para enxergar?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, óculos ou lentes nos dois olhos',
        passageiro: e('cuidados', 'Leve os óculos e a receita na bagagem de mão.', 'Sem exigência de acuidade para o passageiro.', '4.2'),
        tripulante: e('cuidados', 'Use a correção no voo e leve óculos de reserva, mesmo com lente de contato.', 'RBAC 67.99(c)(4) e (g); ICAO Anexo 1 6.3.3.2 e 6.3.3.2.1: correção obrigatória e reserva; um único par para longe e perto (6.3.3.4).', '4.2'),
      },
      {
        rotulo: 'Lente de contato num olho para perto (monovisão)',
        passageiro: e('cuidados', 'Pode voar; leve os óculos na bagagem de mão.', 'Sem exigência de acuidade para o passageiro.', '4.2'),
        tripulante: e('nao-voar', 'A monovisão não é aceita para voar. Use correção para longe nos dois olhos e óculos de perto.', 'ICAO 11.4.25 e FAA Item 31-34: monovisão não aceita; o olho de perto tem acuidade reduzida a distância.', '4.2'),
      },
    ],
  },
  {
    id: 'olho-cirurgia',
    pergunta: 'Operou os olhos ou feriu um olho recentemente?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Laser para tirar o grau ou catarata há menos de 24 horas',
        passageiro: e('nao-voar', 'Espere ao menos 24 horas e a liberação do cirurgião.', 'IATA Medical Manual: catarata e laser de córnea, ≥ 24 h.', '4.8'),
        tripulante: e('nao-voar', 'Não voe. Volte só no prazo da sua autoridade.', 'ANAC 67.99(b): cirurgia refrativa > 6 meses; ICAO 11.4.63: 3–6 meses; FAA: 3 meses ou Status Summary antes; catarata: CAA ≥ 6 semanas.', '4.8'),
      },
      {
        rotulo: 'Laser para tirar o grau nos últimos 6 meses',
        passageiro: e('cuidados', 'Pode voar se o cirurgião liberou; pingue o colírio no horário e não coce o olho.', 'Passado o prazo de 24 h (IATA), sem restrição se sem complicação.', '4.8'),
        tripulante: e('avaliar', 'Só volte com a liberação do examinador e os testes pedidos.', 'ANAC 67.99(b): mais de 6 meses, com teste de ofuscamento e contraste se pedido; ICAO 11.4.63–11.4.64: 3 a 6 meses conforme o grau e a técnica, sem halos nem ofuscamento; FAA: < 3 meses só com o Refractive Surgery Status Summary.', '4.8'),
      },
      {
        rotulo: 'Catarata nos últimos 3 meses',
        passageiro: e('cuidados', 'Pode voar se o cirurgião liberou; leve o colírio na bagagem de mão.', 'IATA: ≥ 24 h após cirurgia de catarata.', '4.8'),
        tripulante: e('avaliar', 'Só volte com a liberação do examinador.', 'ICAO 11.4.42–11.4.43: lente monofocal, refração estável em 6–8 semanas; FAA: < 3 meses só com o Lens Implant Status Summary; UK CAA: inapto ≥ 6 semanas; RBAC 67.99(e)(4): exames adicionais.', '4.8'),
      },
      {
        rotulo: 'Cirurgia de retina com gás no olho',
        passageiro: e('nao-voar', 'Não voe até o gás ser absorvido: cerca de 2 semanas com SF6 e 6 semanas com C3F8 ou C2F6. Confirme com o cirurgião.', 'Houston et al. 2012; IATA: SF6 mínimo 2 semanas; C2F6 e C3F8 mínimo 6 semanas; risco de perda grave da visão pela expansão do gás.', '4.8'),
        tripulante: e('nao-voar', 'Não voe até a avaliação especializada.', 'ICAO 11.9.2: descolamento de retina inapto até avaliação; UK CAA: relatório com revisão em 3 meses; FAA Item 31: pode ser aceito após correção, com avaliação.', '4.8'),
      },
      {
        rotulo: 'Outra cirurgia dentro do olho ou ferimento que perfurou o olho na última semana',
        passageiro: e('nao-voar', 'Espere ao menos 7 dias e a liberação do oftalmologista.', 'IATA: cirurgia intraocular e ferimento penetrante, ≥ 7 dias; gás reabsorvido.', '4.8'),
        tripulante: e('nao-voar', 'Não voe até a avaliação especializada.', 'ICAO 11.9.2 e RBAC 67.99(e)(3)–(4): lesão ou cirurgia do olho exige exames adicionais.', '4.8'),
      },
    ],
  },
  {
    id: 'olho-doenca',
    pergunta: 'Tem alguma doença ou sintoma nos olhos agora?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Glaucoma controlado com colírio',
        passageiro: e('cuidados', 'Pode voar; leve o colírio na bagagem de mão e pingue no horário.', 'Sem restrição de voo para o passageiro com glaucoma controlado.', '4.7'),
        tripulante: e('avaliar', 'Voe com a liberação do examinador e o controle em dia.', 'ICAO 11.10.13: apto se pressão controlada com remédio sem efeitos sérios e acuidade e campo bons; FAA CACI: ≤ 23 mmHg nos dois olhos, campo normal, sem mióticos.', '4.7'),
      },
      {
        rotulo: 'Olho vermelho com dor, luz incomodando ou visão borrada',
        passageiro: e('avaliar', 'Procure o oftalmologista antes de embarcar.', 'ICAO 11.2.2: congestão, dor, visão borrada, fotofobia e lacrimejamento sugerem uveíte anterior; encaminhar com urgência.', '4.7'),
        tripulante: e('nao-voar', 'Não voe. Procure o oftalmologista com urgência.', 'Anexo 1 6.3.3.1 e RBAC 67.99(a): sem doença ativa do olho; ICAO 11.2.2.', '4.7'),
      },
      {
        rotulo: 'Visão que caiu de repente, mancha ou perda de parte da visão',
        passageiro: e('avaliar', 'Procure o oftalmologista antes de voar.', 'Perda de acuidade ou de campo exige investigação (retina, nervo óptico, glaucoma).', '4.7'),
        tripulante: e('nao-voar', 'Não voe até a avaliação.', 'ICAO 11.5.20: defeito de campo exige avaliação neuro-oftalmológica; RBAC 67.99(e)(1)–(2).', '4.4'),
      },
      {
        rotulo: 'Dificuldade nova para ver à noite',
        passageiro: e('cuidados', 'Pode voar; procure o oftalmologista.', 'Investigar catarata, erro refrativo, retina e nictalopia.', '4.3'),
        tripulante: e('avaliar', 'Faça avaliação antes de voar à noite.', 'ICAO 11.9.2: nictalopia torna inapto até avaliação; halos e perda de contraste após cirurgia refrativa (11.4.59).', '4.3'),
      },
    ],
  },
  {
    id: 'olho-cores',
    pergunta: 'Já falhou num teste de visão de cores?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim',
        passageiro: ok('4.5'),
        tripulante: e('avaliar', 'Faça os testes que a sua autoridade aceita; pode haver restrição para voar de dia.', 'RBAC 67.99(c)(5): cores das tabelas ou, no mínimo, as cores básicas da aviação; ICAO 6.2.4.4: inapto salvo se distinguir as cores e luzes, senão Classe 2 só de dia; FAA Item 52: 3ª classe com limitação 104 (VFR diurno).', '4.5'),
      },
    ],
  },
  {
    id: 'olho-laser',
    pergunta: 'Foi atingido por laser ou luz forte e ainda vê mancha ou borrão?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim',
        passageiro: e('avaliar', 'Procure o oftalmologista antes de voar.', 'Pós-imagem e escotoma por luz intensa; lasers potentes podem deixar escotoma permanente (ICAO 11.5.6).', '4.6'),
        tripulante: e('nao-voar', 'Não voe até a avaliação oftalmológica.', 'FAA AC 70-2B: efeito persistente ou permanente; RBAC 67.99(e)(3): lesão no olho exige exames adicionais.', '4.6'),
      },
    ],
  },
  {
    id: 'olho-colirio',
    pergunta: 'Usou colírio ou remédio que mexe na visão?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Colírio para dilatar a pupila nas últimas 24 horas',
        passageiro: e('cuidados', 'Pode voar; a luz pode incomodar e a leitura borrar por algumas horas. Use óculos de sol.', 'Midriáticos: fotofobia e borramento transitórios.', '4.7'),
        tripulante: e('nao-voar', 'Não voe antes de 8 a 24 horas, conforme o colírio.', 'FAA Eye Medication: ciclopentolato 24 h; fenilefrina e tropicamida 8 h; atropina não aceita.', '4.7'),
      },
      {
        rotulo: 'Pilocarpina ou outro colírio que contrai a pupila',
        passageiro: e('cuidados', 'Pode voar; à noite a visão fica mais escura.', 'Mióticos: miose e borramento acomodativo.', '4.7'),
        tripulante: e('nao-voar', 'Esse colírio não é aceito para voar. Fale com o oftalmologista sobre outra opção.', 'FAA: pilocarpina e mióticos não aceitos; ICAO 11.10.11: mióticos em geral não permitidos.', '4.7'),
      },
      {
        rotulo: 'Remédio para ereção nas últimas 8 horas (24 horas se tadalafil)',
        passageiro: ok('4.5'),
        tripulante: e('nao-voar', 'Não voe antes de 8 horas (sildenafil, vardenafil, avanafil) ou 24 horas (tadalafil sob demanda).', 'FAA Pharm ED; ICAO 11.8.42: tom azulado e fotossensibilidade em 3–11% dos usuários, até 5 h ou mais.', '4.5'),
      },
    ],
  },
  {
    id: 'olh-olho-seco',
    pergunta: "Os olhos secam, ardem ou incomodam em voos longos?",
    ajuda: "O ar da cabine é seco.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '4.1' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '4.1' },
      },
      {
        rotulo: "Sim, e melhora em terra",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pisque mais, use lágrima artificial sem conservante, tire a lente se incomodar e não esfregue os olhos.",
          medico: "Olho seco de cabine: lágrima artificial sem conservante; reavaliar se não melhorar em terra.",
          topico: '4.1',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Leve lágrima artificial sem conservante, os óculos em dia e um par de reserva.",
          medico: "Olho seco de cabine: lágrima artificial sem conservante; óculos de reserva a bordo.",
          topico: '4.1',
        },
      },
      {
        rotulo: "Sim, com dor, vermelhidão ou visão borrada que não passam",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Procure o oftalmologista antes do próximo voo.",
          medico: "Dor, olho vermelho ou visão borrada persistentes: avaliação oftalmológica.",
          topico: '4.1',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Não voe como tripulante até a avaliação do oftalmologista.",
          medico: "Sintoma visual persistente: avaliação oftalmológica antes de retornar à função.",
          topico: '4.1',
        },
      },
    ],
  },
  {
    id: 'olho-varredura',
    pergunta: "Ao pilotar em voo visual, faz a varredura do céu por setores?",
    ajuda: "Pergunta para quem pilota.",
    opcoes: [
      {
        rotulo: "Sim",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '4.4' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '4.4' },
      },
      {
        rotulo: "Não sou piloto",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '4.4' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '4.4' },
      },
      {
        rotulo: "Não ou só às vezes",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '4.4' },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Divida o céu em setores de 10° e pare 1 segundo em cada um; mova a cabeça atrás das colunas e olhe mais para fora na subida, na descida e perto de aeroportos.",
          medico: "Varredura visual por setores de 10° com pausa de 1 s; foco distante periódico contra a miopia de campo vazio.",
          topico: '4.4',
        },
      },
    ],
  },
  {
    id: 'olho-noite',
    pergunta: "Vai pilotar à noite?",
    ajuda: "Os olhos levam tempo para se adaptar ao escuro.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '4.3' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '4.3' },
      },
      {
        rotulo: "Sim",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '4.3' },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Chegue com tempo para os olhos se adaptarem, evite luz branca forte e não fume antes; para achar algo fraco, olhe de lado.",
          medico: "Adaptação ao escuro, iluminação mínima da cabine, visão excêntrica a 5° a 10°; oxigênio acima de 5.000 ft à noite em voo não pressurizado.",
          topico: '4.3',
        },
      },
    ],
  },
];
