// Formulário de liberação para voo seguro · bloco da saúde mental e do comportamento (M2V7).
// Fontes no registro de revisão de src/data/capitulos/mente.ts (ICAO Doc 8984 Part III Cap. 9 e Apêndice 2; RBAC 67.75 e
// RBAC 120; FAA 14 CFR 91.17, Antidepressant Protocol, HIMS, IMSAFE; UK CAA Psychiatric conditions; AsMA 2003).
// Sem fonte: [confirmar na referência].

import type { EfeitoLiberacao, PerguntaLiberacao } from '../tipos';

const ok = (topico?: string): EfeitoLiberacao => ({ nivel: 'liberado', leigo: '', medico: '', topico });
const e = (nivel: EfeitoLiberacao['nivel'], leigo: string, medico: string, topico: string): EfeitoLiberacao => ({ nivel, leigo, medico, topico });

export const liberacaoMente: PerguntaLiberacao[] = [
  {
    id: 'mente-humor',
    pergunta: 'Tem ou teve depressão ou ansiedade?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, estável, sem remédio',
        passageiro: ok('7.2'),
        tripulante: e('avaliar', 'Fale com o examinador. Pela ICAO, a ansiedade pede 6 meses sem sintomas e sem remédio.', 'ICAO 9.7.2: 6 meses assintomático sem psicotrópico; ICAO 9.5.5: recaída mais provável nos 2 primeiros anos; RBAC 67.75(b)(4)–(5).', '7.2'),
      },
      {
        rotulo: 'Sim, com antidepressivo em dose estável',
        passageiro: e('cuidados', 'Pode voar. Tome o remédio no horário, ajustado ao fuso.', 'UK CAA: condição estável e remédio tomado regularmente.', '7.2'),
        tripulante: e('avaliar', 'Fale com o examinador. Alguns antidepressivos são aceitos depois de um período estável e com acompanhamento.', 'RBAC 67.75(c): inapto salvo parecer do psiquiatra; ICAO Apêndice 2: ISRS estável há 4 semanas, em geral com copiloto; FAA: 8 antidepressivos, um só, 6 meses estável, autorização especial.', '7.2'),
      },
      {
        rotulo: 'Sim, a dose mudou ou estou parando o remédio',
        passageiro: e('cuidados', 'Pode voar. Viaje com o remédio e o relatório do médico.', 'AsMA: não iniciar remédio novo para o voo.', '7.2'),
        tripulante: e('nao-voar', 'Não voe até estabilizar. Ao parar o remédio, fique em solo durante a retirada e mais 2 semanas.', 'ICAO Apêndice 2: parar ao mudar a dose; na retirada, solo durante o período e mais 2 semanas.', '7.2'),
      },
      {
        rotulo: 'Sim, em crise agora ou com pensamentos de morte',
        passageiro: e('nao-voar', 'Procure ajuda agora. No Brasil, o CVV atende pelo 188, de graça, 24 horas.', 'Avaliação imediata; ICAO 9.5.1: risco de suicídio na depressão.', '7.2'),
        tripulante: e('nao-voar', 'Não voe. Procure ajuda agora: CVV 188, programa de apoio ou seu médico.', 'ICAO Apêndice 2: ideação suicida impede; RBAC 67.75(a).', '7.2'),
      },
    ],
  },
  {
    id: 'mente-medo',
    pergunta: 'Tem medo de voar?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim',
        passageiro: e('cuidados', 'Pode voar. Aprenda técnicas de respiração antes e avise a tripulação. A terapia cognitivo-comportamental ajuda muitas pessoas.', 'AsMA: ansiedade pode virar hiperventilação; ansiolítico só se já usado antes; terapia cognitivo-comportamental eficaz.', '7.2'),
        tripulante: e('avaliar', 'Fale com o examinador.', 'ICAO 9.7.1–9.7.2: transtorno com ansiedade.', '7.2'),
      },
    ],
  },
  {
    id: 'mente-grave',
    pergunta: 'Tem transtorno bipolar, psicose ou esquizofrenia?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, estável e em tratamento',
        passageiro: e('cuidados', 'Pode voar com o remédio no horário. Às vezes um acompanhante ajuda; avise a companhia se for sozinho.', 'UK CAA: psicose bem controlada pode precisar de acompanhante; AsMA: avisar a companhia se viajar só.', '7.3'),
        tripulante: e('nao-voar', 'Não pode voar como tripulante. Fale com o examinador.', 'ICAO 9.5.6–9.5.7 e 9.6.2: mania, hipomania e esquizofrenia impedem; RBAC 67.75(b)(3)–(4).', '7.3'),
      },
      {
        rotulo: 'Psicose breve, recuperada',
        passageiro: ok('7.3'),
        tripulante: e('avaliar', 'Fale com o examinador. Pode ser aceito depois de 1 ano estável sem antipsicótico.', 'ICAO 9.6.4: estável por 1 ano sem antipsicótico.', '7.3'),
      },
      {
        rotulo: 'Em crise, com agitação ou comportamento imprevisível',
        passageiro: e('nao-voar', 'Não voe agora. Procure o seu médico.', 'UK CAA: comportamento imprevisível, agressivo, desorganizado ou perturbador contraindica o voo.', '7.3'),
        tripulante: e('nao-voar', 'Não voe.', 'RBAC 67.75(a).', '7.3'),
      },
    ],
  },
  {
    id: 'mente-alcool',
    pergunta: 'Bebeu álcool nas últimas 8 horas?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim',
        passageiro: e('cuidados', 'Pode voar. Modere o álcool e beba água; não use o álcool para dormir.', 'AsMA: não usar álcool como hipnótico.', '7.4'),
        tripulante: e('nao-voar', 'Não voe. Espere pelo menos 8 horas e esteja sem nenhum efeito.', '14 CFR 91.17(a): 8 h, sob influência ou 0,04 g/dL; ICAO 9.12.7: tradição de 12 h ou mais; IMSAFE: 24 h.', '7.4'),
      },
    ],
  },
  {
    id: 'mente-dependencia',
    pergunta: 'Tem ou teve problema com álcool ou outra substância?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, em tratamento ou recuperado',
        passageiro: e('cuidados', 'Pode voar desintoxicado, com o tratamento em dia; um acompanhante pode ajudar.', 'AsMA: desintoxicar antes de viajar; considerar o risco de viajar só onde o álcool é fácil.', '7.4'),
        tripulante: e('avaliar', 'Fale com o examinador. A volta ao voo existe, com tratamento e acompanhamento.', 'RBAC 67.75(b)(2); ICAO 9.12.15–9.12.17: 3 anos de sobriedade tradicional ou programa com volta em 3 a 4 meses e acompanhamento de 2 anos; FAA: HIMS.', '7.4'),
      },
      {
        rotulo: 'Sim, uso atual',
        passageiro: e('avaliar', 'Procure ajuda antes de viajar, para não ter abstinência em voo.', 'AsMA: desintoxicação antes da viagem.', '7.4'),
        tripulante: e('nao-voar', 'Não voe. Procure o programa da empresa ou o programa de apoio.', 'RBAC 67.75(b)(2); RBAC 120: evento impeditivo e avaliação por especialista; ICAO 9.12.9.', '7.4'),
      },
    ],
  },
  {
    id: 'mente-sedativo',
    pergunta: 'Tomou remédio para dormir ou para ansiedade nas últimas 12 horas?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim',
        passageiro: e('cuidados', 'Pode voar, se já usou o remédio antes sem problema. Não dirija depois.', 'AsMA: nunca usar no voo remédio que não tenha sido testado antes.', '7.4'),
        tripulante: e('nao-voar', 'Não voe até passar o efeito: pelo menos 8 a 12 horas depois de um sedativo de curta ação.', 'ICAO 9.10.9: zolpidem, zopiclona, temazepam, 8 a 12 h; ICAO 9.10.6: uso regular de hipnóticos desqualifica.', '7.4'),
      },
    ],
  },
  {
    id: 'mente-tratamento',
    pergunta: 'Fez tratamento psiquiátrico invasivo, internação ou programa para dependência?',
    ajuda: 'Psicoterapia e remédios estão nas perguntas acima; aqui entram os tratamentos de casos graves.',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Eletroconvulsoterapia',
        passageiro: e('avaliar', 'Combine a data da viagem com o psiquiatra.', 'Tratamento sob anestesia; prazo de viagem: [confirmar na referência].', '7.2'),
        tripulante: e('nao-voar', 'Não voe; a volta depende do psiquiatra e da autoridade.', 'FAA, AME Guide (antidepressivos): história de eletroconvulsoterapia exclui a via do ISRS pelo examinador; RBAC 67.75(c).', '7.2'),
      },
      {
        rotulo: 'Internação psiquiátrica recente',
        passageiro: e('avaliar', 'Viaje só com alta e liberação do psiquiatra; um acompanhante ajuda.', 'UK CAA: condição estável; comportamento imprevisível contraindica; acompanhante se preciso.', '7.3'),
        tripulante: e('nao-voar', 'Não voe até o parecer do psiquiatra e a decisão da autoridade.', 'RBAC 67.75(g): parecer psiquiátrico; ICAO 9.5–9.6.', '7.3'),
      },
      {
        rotulo: 'Programa ou internação para álcool ou outra substância',
        passageiro: e('cuidados', 'Pode voar sem álcool; a desintoxicação vem antes da viagem.', 'AsMA: desintoxicar antes de viajar; abstinência causa emergências em voo (Joshi 2019).', '7.4'),
        tripulante: e('avaliar', 'A volta é pelo programa, com testes e acompanhamento.', 'HIMS: internação ≥ 28 dias, abstinência, monitoramento de 5 a 7 anos; ICAO 9.12.15–9.12.18: retorno em 3 a 4 meses, acompanhamento ≥ 2 anos; RBAC 120: 6 exames em 12 meses.', '7.4'),
      },
    ],
  },
];
