import type { Recurso } from './tipos';

// Formulários da companhia aérea na página "Liberação para voo" (pedido do autor, 10/11/2026: "Em liberação para voo
// (missão especial) inserir informações sobre formulários MEDIF e FREMEC").
//
// REGISTRO DE REVISÃO (10/11/2026) — fontes:
// - ANAC, Resolução 280/2013: art. 9 §1 (documentos médicos com 72 h de antecedência; demais assistências, 48 h); art. 10
//   (o operador pode exigir o MEDIF ou outro documento médico; resposta em 48 h; dispensa em condição permanente já
//   informada); art. 27 §1 (acompanhante: até 20% da tarifa).
// - LATAM, MEDIF em português (211118_MEDIF_PT.pdf): Parte 1 do passageiro (dados, itinerário, assistência, declaração);
//   Parte 2 do médico assistente (MEDA 01 a 19: diagnóstico, comorbidades, cirurgias, doenças contagiosas, condições
//   cardíacas, pulmonares, neurológicas e anemia com Hb/Ht; oxigênio, concentrador, fluxo em L/min, bateria e retenção
//   de CO2; maca; acompanhante; cadeira WCHR/WCHS/WCHC; remédios, anticoagulantes, alergias; autonomia para entender
//   instruções, comer e ir ao banheiro; risco; declaração de que pode voar); envio até 48 h antes.
// - Cathay Pacific, Passenger medical clearance form and medical card: formulário pedido para oxigênio a bordo,
//   equipamento médico, maca, doença, internação, lesão ou cirurgia recentes ou dúvida razoável; Parte 1 pelo
//   passageiro, Parte 2 pelo médico assistente; ao menos 48 h antes, 72 h com oxigênio; FREMEC para quem viaja com
//   frequência com condição estável, solicitado depois de um formulário médico completo; dispensa o formulário a cada
//   viagem enquanto a condição e a assistência não mudam.
// - Air India, Frequent Travellers Medical Card: deficiência permanente, estabelecida e sem tendência a progredir;
//   validade definida pelo serviço médico; vale enquanto a saúde não piorar; código de assistência (ex.: WCHC).
// - GOL, Cartão médico FREMEC: condição permanente e estável; não emitido para menores de 2 anos; laudo audiométrico
//   ou oftalmológico (CID-10 e acuidade com e sem correção); análise em até 48 h; avisar mudança imediatamente; sem
//   FREMEC, envia-se o MEDIF; acompanhante com 80% de desconto após aprovação; FREMEC de outra companhia aceito com
//   comprovante e formulário com 72 h.
// Os prazos e documentos variam entre companhias: o texto manda conferir a regra da companhia escolhida.

export const textoFormularios = [
  'O **MEDIF**, formulário de informações médicas, é o documento padrão que a companhia aérea pode pedir antes de aceitar um passageiro com doença ou deficiência. Tem duas partes: a **Parte 1**, preenchida pelo **passageiro**, com dados, itinerário e assistência pedida; e a **Parte 2**, preenchida pelo **médico assistente**, com diagnóstico, doenças associadas, oxigênio, maca, acompanhante, cadeira de rodas, remédios, autonomia e a declaração de que a pessoa pode voar.',
  'A companhia costuma pedir o MEDIF para quem precisa de **oxigênio a bordo**, de **maca** ou de **equipamento médico**, e para quem teve doença, internação, lesão ou cirurgia recente, ou quando há dúvida se a pessoa completa o voo com segurança. No Brasil, o MEDIF é **facultativo** para a companhia, que deve responder em **48 horas**; o documento médico vai com **72 horas** de antecedência, e a condição permanente já informada pode dispensá-lo.',
  'O **FREMEC**, cartão médico do passageiro frequente, serve a quem tem uma **condição permanente e estável**, como deficiência visual, auditiva ou física, e viaja com frequência. É emitido pelo serviço médico da companhia depois de um MEDIF ou laudo completo e **dispensa um novo MEDIF** a cada viagem enquanto a condição e a assistência não mudam. A validade é definida pela companhia, e qualquer piora precisa ser informada logo.',
  'As regras variam entre companhias. Algumas analisam o FREMEC em até 48 horas, não o emitem para crianças pequenas, pedem audiometria ou laudo oftalmológico com acuidade e aceitam o cartão de outra empresa com comprovante. Com o FREMEC aprovado, o acompanhante pode pagar só uma parte da tarifa. **MEDIF e FREMEC são do passageiro**: o tripulante segue o certificado médico aeronáutico.',
].join('\n\n');

export const recursosFormularios: Recurso[] = [
  { paragrafo: 1, midia: 'medif-fremec' },
  {
    paragrafo: 4,
    tabela: {
      titulo: 'MEDIF e FREMEC · comparação',
      colunas: ['Ponto', 'MEDIF', 'FREMEC'],
      linhas: [
        ['Para quem', 'Condição temporária ou que precisa de avaliação a cada viagem', 'Condição permanente e estável, em quem viaja com frequência'],
        ['Quem preenche', 'Parte 1: passageiro; Parte 2: médico assistente', 'Serviço médico da companhia, a partir de MEDIF ou laudo'],
        ['Quando', 'A cada viagem; documento médico com 72 h no Brasil', 'Uma vez, até vencer ou a condição mudar'],
        ['Exemplos', 'Oxigênio, maca, cirurgia ou internação recente', 'Cegueira, surdez, cadeira de rodas permanente'],
        ['Mudança na saúde', 'Novo formulário', 'Avisar a companhia; o cartão pode deixar de valer'],
      ],
    },
  },
];
