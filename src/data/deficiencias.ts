import type { Questao, Recurso } from './tipos';

// Missão especial "Deficiências e o voo" (pedido do autor, 10/11/2026: "Criar mais um voo especial = deficiências e o
// voo / liberação de CMA / distinguir passageiros e tripulantes"; "Missão especial em home").
//
// REGISTRO DE REVISÃO (10/11/2026) — fontes:
// - ANAC, Resolução 280/2013 (versão em inglês publicada pela ANAC): art. 3 (PNAE: pessoa com deficiência, 60 anos ou
//   mais, gestante, lactante, pessoa com criança de colo, mobilidade reduzida ou limitação de autonomia); art. 8
//   (assistência sem ônus); art. 9 §1 (72 h para acompanhante ou documentos médicos; 48 h para as demais
//   assistências); art. 10 (MEDIF facultativo; resposta em 48 h); art. 13 (o passageiro informa as ajudas de
//   comunicação de que precisa); art. 14 (assistência do check-in à saída, sanitários, cão-guia, conexões e
//   demonstração individual dos procedimentos de emergência, quando pedida); art. 17 (prioridade de embarque);
//   art. 20 (STCR, WCHS e WCHC: preferência por ponte de embarque; equipamento de ascenso e descenso ou rampa);
//   art. 23 (uma ajuda técnica de locomoção sem custo); art. 25 (ajuda técnica danificada: substituta equivalente na
//   chegada; sem devolução em 48 h, pagamento a preço de mercado em 14 dias); art. 27 (acompanhante exigido: maca ou
//   incubadora; impedimento mental ou intelectual que impeça entender as instruções de segurança; não conseguir usar o
//   sanitário sem ajuda; §1: o operador fornece sem custo ou cobra até 20% da tarifa do passageiro); art. 29 §1 (cão-
//   guia gratuito, no chão da cabine, com arreio, sem focinheira); art. 32 e 34 (assentos; não junto à saída de
//   emergência); art. 33 (WCHR, WCHS e WCHC em fileiras com espaço extra quando houver; WCHC com precedência no
//   corredor); Anexo I (STCR, WCHR, WCHS, WCHC). Revisão em curso (CP 02/2025), sem norma substituta publicada.
// - Lei 14.624/2023 (altera a Lei 13.146/2015): cordão de fita com desenhos de girassóis como símbolo nacional de
//   deficiências ocultas; uso opcional; a ausência não prejudica direitos; não dispensa documento se pedido.
// - ICAO, Anexo 1, 1.2.4.10 (conclusão médica acreditada; habilidade, experiência e condições operacionais
//   consideradas; limitação anotada quando a segurança depende dela); 6.3.2.23 e Nota (avaliação funcional de
//   sequelas). Doc 8984 (registro em src/data/capitulos/olhos.ts e ouvidos.ts): monocular só pela flexibilidade, depois
//   de ao menos 6 meses de adaptação e teste em voo; aparelho auditivo em geral não aceito em voo para profissionais.
// - ANAC, RBAC 67: 67.11(c) (no recurso, a ANAC pode exigir teste de proficiência em voo); 67.95/67.135 (sequelas
//   funcionais; registro em src/data/capitulos/ossos-musculos.ts); 67.99(c)(6) (monocular só na revalidação ou no
//   exame inicial depois de acidente ou incidente grave, com o olho bom normal); 67.101(b) e (d) (discriminação da
//   fala e voz sussurrada para quem não atinge os limiares; na revalidação, um ouvido pode bastar). Texto de 67.11 e
//   67.101 conferido na Emenda 00; 67.99 na Emenda 05 (olhos.ts).
// - FAA: SODA (static or nonprogressive; não expira; pode ser retirada se piorar); Item 42 (amputação: relatório de
//   força, amplitude e dor; SODA ou decisão da FAA; prova de voo médica especial); Item 43 (paralisia não progressiva
//   tratada como amputação; o AME adia e pode orientar a pedir a prova de voo); monocular (6 meses de adaptação;
//   qualquer classe pela emissão especial, 14 CFR 67.401); FAQ surdez: certificado e SODA com "Not valid for flying
//   where radio use is required".
// - UK CAA, Limitations table v11.1 (27/01/2025): OML (só como ou com copiloto qualificado, Classe 1), OSL (com piloto
//   de segurança e comandos duplos, Classe 2/LAPL), OPL (sem passageiros), APL (só com a prótese aprovada, após MFT),
//   AHL (só com comandos manuais aprovados, após MFT), HAL (só com aparelho auditivo), VCL (só de dia), SSL, SIC.
// - Decreto 5.904/2006, art. 3º (carteira e plaqueta; vacinação múltipla e antirrábica assinada por veterinário;
//   coleira, guia e arreio; §3º cão em treinamento com plaqueta própria, sem arreio) e Ofício Circular nº 28/2019/
//   GCON/SAS-ANAC (não exigir atestado de 10 dias em voos domésticos; único documento sanitário: carteira de vacinação;
//   voos internacionais: exigências do país de destino, art. 30 da Res. 280/2013).
// - Lei 12.764/2012, art. 1º §2º (autista é pessoa com deficiência para todos os efeitos legais) e art. 3º-A
//   (CIPTEA, incluído pela Lei 13.977/2020; validade de 5 anos, renovação com o mesmo número).
// - UK CAA, Neurodevelopmental conditions: TEA não desqualifica automaticamente; avaliação individual; relatórios de
//   neuropsicologia, psicologia ou psiquiatria; pode iniciar o treinamento com relatórios de progresso; remédios do TDAH
//   não aceitos. FAA, Item 47 (tabela): autismo e deficiência intelectual não listados (decisão caso a caso).
// - UK CAA, Medical certification of pilots with a disability: MFT provável na Classe 1 e com instrutor-chefe na Classe 2;
//   comandos manuais aprovados só para voo privado; abaixo do joelho em geral com a prótese (tornozelo fixo
//   preferido); acima do joelho muitas vezes sem a prótese; amputação bilateral de pernas em geral com comando manual;
//   prótese de braço na Classe 1 com pinça do polegar em cada mão; remédio para dor fantasma provavelmente
//   desqualificante; paraplegia: comando manual de leme e freio de mão; nenhum piloto de helicóptero paraplégico
//   certificado e sem comando manual aprovado para a guinada; relaxantes, opioides e alguns remédios de bexiga não
//   aceitos; suspender o antiespástico pode causar espasmo e clônus em voo; limitação aos tipos demonstrados.
// - Ottobock, Travelling with devices: a pressão mais baixa da cabine pode mudar o volume do coto; levar enchimento;
//   prótese carregada, carregador e bateria na bagagem de mão; scanners podem alterar o comportamento da prótese;
//   número de série dos componentes.
// Aplicação das fontes, sem número próprio: lesão de pele por pressão em quem não sente o assento; helicóptero exige
// as duas mãos e os dois pés nos comandos; voo não pressurizado sem oxigênio limita a altitude (Veja M1V2).
// Sem fonte primária para cadeira motorizada e bateria: o texto manda consultar a companhia, sem número.

// 10/11/2026 ("Aplique em tudo", pedido das doenças com tratamentos expectantes, não invasivos e invasivos, prognóstico,
//   prazos e tipo de voo): parágrafo de tratamentos e tabela "Tratamentos e voo" nas fases df-amp, df2, df-cego, df3,
//   df4, df-tea e df5. Prazos citados vêm dos voos de Sistemas (M2V3 - III: 10 dias após cirurgia do ouvido; M2V4 -
//   VIII: gás no olho; M2V7; ICAO 6 meses na visão monocular, registro acima). Linhas de tratamento (reabilitação,
//   terapia do espelho, revisão do coto, cateterismo, bomba implantada, implante coclear, terapias do autismo, diálise):
//   conhecimento médico geral, sem número próprio.
export interface FaseDeficiencia {
  id: string;
  periodo: string;
  titulo: string;
  pergunta: string;
  texto: string;
  recursos?: Recurso[];
}

export const fasesDeficiencias: FaseDeficiencia[] = [
  {
    id: 'df1',
    periodo: 'Função, não diagnóstico',
    titulo: 'Deficiência, passageiro e tripulante',
    pergunta: 'Por que a mesma deficiência tem regras tão diferentes para quem viaja e para quem pilota?',
    texto: [
      'A **deficiência** pode ser **física**, **visual**, **auditiva**, **intelectual** ou **psicossocial**, e muitas são **ocultas**: não aparecem à primeira vista. No voo, a pergunta nunca é só o diagnóstico. É a **função**: o que a pessoa consegue fazer sozinha, com ajuda ou com uma adaptação, num ambiente estreito, barulhento e que pode exigir uma evacuação rápida.',
      '**Para o passageiro**, a regra é de **acesso**. No Brasil, a ANAC chama de **PNAE**, passageiro com necessidade de assistência especial, a pessoa com deficiência, com 60 anos ou mais, gestante, lactante, com criança de colo ou com mobilidade ou autonomia reduzida. A assistência vai do check-in à saída do aeroporto, **sem custo**, e o embarque é **prioritário**.',
      '**Para o tripulante**, a regra é de **segurança operacional**. A ICAO permite emitir o certificado a quem não atinge um requisito quando uma **conclusão médica acreditada** mostra que a segurança não fica em risco, levando em conta habilidade, experiência e condições de operação. Quando a segurança depende de uma condição, ela vira **limitação** anotada no certificado.',
      'O tipo de voo pesa. Na aeronave **pressurizada**, a cabine fica em altitude moderada e o que mais conta é o deslocamento, o assento e a evacuação. Na **não pressurizada**, sem oxigênio, a altitude máxima fica limitada (Veja M1V2), e a deficiência que já reduz a reserva de oxigênio pede mais cuidado. No **helicóptero**, as duas mãos e os dois pés trabalham ao mesmo tempo nos comandos, o que pesa mais na avaliação de quem pilota.',
      'Na prática, cada autoridade tem o seu caminho. A **ANAC** decide pelo examinador e, no recurso, pode exigir **teste de proficiência em voo**. A **FAA** usa a **SODA**, a declaração de capacidade demonstrada, para condições estáveis. A **Europa** e o **Reino Unido** usam códigos de limitação, como "só com copiloto" ou "só com a prótese aprovada".',
      '**Como se preparar.** O passageiro avisa a companhia com **48 horas** de antecedência, ou **72 horas** se precisar de acompanhante ou de enviar documento médico, e informa as ajudas de que precisa. Quando a companhia pede, o médico preenche o **MEDIF**; quem tem condição permanente e estável pode pedir o **FREMEC**, que dispensa o formulário a cada viagem; os dois estão explicados na página Liberação para voo. O tripulante leva ao examinador relatórios de função, não só de diagnóstico, e pergunta qual prova prática a autoridade pode exigir.',
    ].join('\n\n'),
    recursos: [
      { paragrafo: 1, midia: 'deficiencia-papel' },
      {
        paragrafo: 3,
        tabela: {
          titulo: 'Passageiro e tripulante · o que muda',
          colunas: ['Ponto', 'Passageiro', 'Tripulante'],
          linhas: [
            ["O que se avalia", "Acesso, conforto e segurança na evacuação, porque o passageiro só precisa viajar e sair do avião", "Capacidade de exercer a função com segurança, porque dela dependem os outros a bordo"],
            ["Quem decide", "A própria pessoa, com o médico e a companhia, porque o risco é sobretudo dela", "O examinador e a autoridade, porque a decisão protege a segurança de voo"],
            ["Documento", "MEDIF só se a companhia pedir, porque deficiência estável não é doença em curso", "Certificado médico, com limitação quando preciso, porque a limitação mantém o voo dentro do que foi comprovado"],
            ["Prova prática", "Não se aplica: o passageiro não opera a aeronave", "Pode ser exigida, em voo ou simulador, porque só a prática mostra se a adaptação funciona"],
            ["Custo da adaptação", "Assistência sem custo, porque é direito de acessibilidade", "Adaptação da aeronave paga pelo operador ou pelo piloto, porque precisa ser aprovada para aquele avião"],
          ],
        },
      },
      {
        paragrafo: 6,
        tabela: {
          titulo: 'Como se preparar · passageiro e tripulante',
          colunas: ['Momento ou situação', 'O que fazer'],
          linhas: [
            ['72 h antes', 'Avisar a companhia se precisar de acompanhante ou de enviar documento médico'],
            ['48 h antes', 'Pedir as demais assistências e informar as ajudas de comunicação'],
            ['No aeroporto', 'Usar a prioridade de embarque e confirmar o assento'],
            ['Tripulante', 'Levar relatórios de função ao examinador e perguntar sobre a prova prática'],
          ],
        },
      },
    ],
  },
  {
    id: 'df-amp',
    periodo: 'Amputações',
    titulo: 'Amputações e próteses',
    pergunta: 'Como viaja e como pilota quem tem uma amputação?',
    texto: [
      'A **amputação** pode ser de **membro inferior**, abaixo ou acima do joelho, de **membro superior** ou de mais de um membro. Muitas pessoas usam **prótese**: mecânica, com joelho ou pé articulado, ou com controle eletrônico e bateria. Outras usam muleta ou cadeira de rodas. Para o voo, contam a função com e sem a prótese, o estado do **coto** e a dor.',
      'Na cabine, a pressão mais baixa pode **mudar o volume do coto**, e horas sentado aumentam o inchaço: o encaixe da prótese aperta ou afrouxa. Leve meias de ajuste ou material de enchimento na bagagem de mão. A prótese eletrônica deve sair **carregada**, com carregador e bateria extra na bagagem de mão. Detectores e scanners do aeroporto podem alterar o comportamento de componentes eletrônicos: observe a prótese depois da inspeção.',
      '**O passageiro** com amputação é PNAE: tem assistência e prioridade de embarque, e a muleta, a cadeira ou a prótese de reserva entram como **ajuda técnica**, sem custo. A **dor fantasma**, sentida no membro que não existe mais, pode piorar com o cansaço da viagem; o remédio usado para ela costuma dar sono. Andar no corredor ajuda o coto e as veias das pernas (Veja M2V2 - VII).',
      '**O tripulante** com amputação passa por **avaliação funcional** e, em geral, por **prova de voo médica**. Na FAA, a amputação estável pode receber a **SODA**. No Reino Unido, quem tem amputação **abaixo do joelho** costuma voar com a prótese, de preferência com tornozelo fixo; **acima do joelho**, muitas vezes voa sem a prótese, com técnica própria nos pedais; com amputação das **duas pernas**, em geral precisa de **comando manual aprovado**. Na prótese de braço, a 1ª classe pede **pinça do polegar** firme em cada mão.',
      'O remédio para a **dor fantasma** tende a ser **desqualificante** para o piloto, porque costuma deprimir o sistema nervoso. A limitação vale para os **tipos de aeronave** demonstrados na prova. No **helicóptero**, os dois pés controlam os pedais o tempo todo, e cada membro faz uma tarefa diferente ao mesmo tempo; no avião leve, o comando manual adaptado só foi aprovado para voo privado. Na ANAC, a sequela funcional é julgada pelo examinador, e no recurso a agência pode exigir teste em voo.',
      "**Tratamentos, reabilitação e tipo de voo.** Depois da amputação, o caminho é **reabilitação**: fisioterapia, treino de marcha e adaptação da **prótese**, um tratamento **não invasivo** que dura meses. A **dor fantasma** vai do **expectante**, porque muitas vezes diminui com o tempo, ao **não invasivo**, com fisioterapia, terapia do espelho e remédios, alguns proibidos para o piloto; o tratamento **invasivo** é a **revisão cirúrgica do coto** quando há dor localizada, ferida ou osso irregular. O passageiro voa quando o coto cicatrizou, e o tripulante volta depois da adaptação e da prova prática. No jato **pressurizado**, as horas sentado incham o coto; no avião leve **não pressurizado**, a cabine apertada dificulta pôr e tirar a prótese; no **helicóptero**, os pedais exigem as duas pernas.",
      '**Como se preparar.** Passageiro: peça assistência com 48 horas, leve material para ajustar o encaixe, carregador e bateria na bagagem de mão e o número de série dos componentes. Piloto: leve ao examinador relatório de força, amplitude e dor, sem remédio que dê sono, e faça a prova na aeronave em que vai voar.',
    ].join('\n\n'),
    recursos: [
      {
        paragrafo: 6,
        tabela: {
          titulo: "Tratamentos e voo · amputações",
          colunas: ['Tratamento', 'Tipo', 'No voo'],
          linhas: [
            ["Reabilitação e prótese", "Não invasivo", "Voar com a prótese ou a ajuda técnica"],
            ["Remédio para dor fantasma", "Não invasivo", "Piloto: muitos tiram do voo"],
            ["Revisão cirúrgica do coto", "Invasivo", "Voar com o coto cicatrizado e a liberação do cirurgião"],
          ],
        },
      },
      { paragrafo: 1, midia: 'amputacao-voo' },
      {
        paragrafo: 4,
        tabela: {
          titulo: 'Liberação para voo · amputações',
          colunas: ['Situação', 'Passageiro', 'Tripulante'],
          linhas: [
            ["Abaixo do joelho, com prótese", "Pode voar; ajuste do encaixe na bagagem de mão: o coto pode inchar no voo longo", "Reino Unido: em geral voa com a prótese após prova de voo; FAA: SODA, porque a prova mostra força e controle no pedal"],
            ["Acima do joelho", "Pode voar; assistência se precisar: a dificuldade é de locomoção, não de saúde a bordo", "Reino Unido: muitas vezes voa sem a prótese, com técnica nos pedais, após prova de voo, porque o joelho artificial não sente o pedal"],
            ["Das duas pernas", "Pode voar; WCHS ou WCHC conforme a função: o pedido certo garante embarque e saída", "Em geral só com comando manual aprovado; no Reino Unido, só voo privado, porque não há pedal sem as pernas"],
            ["De membro superior", "Pode voar: membro superior não muda a segurança do passageiro", "Prótese com pinça firme; a 1ª classe pede pinça do polegar em cada mão, porque manche e manetes exigem preensão"],
            ["Dor fantasma tratada com remédio", "Pode voar; cuidado com o sono: o remédio pode sedar", "O remédio tende a desqualificar, porque os usados para dor fantasma dão sono"],
          ],
        },
      },
      {
        paragrafo: 7,
        tabela: {
          titulo: 'Como se preparar · amputações',
          colunas: ['Momento ou situação', 'O que fazer'],
          linhas: [
            ['Bagagem de mão', 'Meias de ajuste, enchimento, carregador e bateria extra'],
            ['Inspeção de segurança', 'Avisar que usa prótese e observar o funcionamento depois'],
            ['Voo longo', 'Andar no corredor e conferir o encaixe do coto'],
            ['Piloto', 'Relatório funcional, sem remédio sedativo, e prova na aeronave pretendida'],
          ],
        },
      },
    ],
  },
  {
    id: 'df2',
    periodo: 'Mobilidade',
    titulo: 'Paraplegia e cadeira de rodas',
    pergunta: 'Como viaja quem usa cadeira de rodas, e quando quem tem paraplegia pode pilotar?',
    texto: [
      'A **deficiência física** inclui paraplegia, tetraplegia, paralisia cerebral, doenças neuromusculares e malformações, além das amputações. Para a viagem, a companhia classifica a necessidade: **WCHR** anda até o assento e sobe escada, mas precisa de cadeira para distâncias; **WCHS** anda até o assento, mas não sobe escada; **WCHC** não se desloca sozinho e precisa ser levado até o assento; **STCR** viaja em maca.',
      'A ANAC prevê embarque **preferencialmente por ponte** para WCHS, WCHC e maca, ou por **equipamento de ascenso** ou rampa. A **ajuda técnica** de locomoção, como a cadeira, vai **sem custo**. Se ela chegar danificada, a companhia entrega uma **substituta equivalente** na chegada; se não devolver em 48 horas, paga o valor de mercado em até 14 dias. O assento não pode ser junto à **saída de emergência**.',
      'O voo traz riscos próprios. Quem não sente a pele das nádegas e das pernas pode ter **lesão por pressão** em horas sentado no assento do avião, mais duro que a almofada da cadeira. A perna parada favorece a **trombose** (Veja M2V2 - VII). Quem precisa de ajuda para usar o **sanitário** deve viajar com acompanhante: o operador fornece um sem custo ou cobra até **20%** da tarifa.',
      '**O tripulante** com paraplegia passa por **avaliação funcional** e **prova de voo médica**. Na FAA, a paralisia que não progride é tratada como amputação e pode receber a **SODA**. No avião, em geral precisa de **comando manual** para o leme e de **freio de mão**; no Reino Unido, esses comandos só são aprovados para **voo privado**. No **helicóptero**, não existe comando manual aprovado para os pedais, e a autoridade britânica ainda não certificou piloto de helicóptero com paraplegia.',
      'Os remédios pesam. A maioria dos **relaxantes musculares**, os **analgésicos opioides** e alguns remédios para a bexiga não são aceitos para o piloto. Mas parar o remédio da espasticidade de repente pode causar **espasmos** durante o voo, também perigosos. No avião **não pressurizado**, frio e altitude somam desconforto a um corpo com circulação e controle da temperatura reduzidos.',
      "**Tratamentos, prognóstico e tipo de voo.** A lesão da medula e as doenças neuromusculares não têm tratamento que devolva a função perdida na maioria dos casos: o foco é **reabilitação** e prevenção de complicações. O tratamento **não invasivo** inclui fisioterapia, a almofada certa, o remédio da **espasticidade** e o cuidado com a bexiga e o intestino; o **cateterismo** intermitente da bexiga é um procedimento simples que viaja junto. Os tratamentos **invasivos** são a **cirurgia** da lesão por pressão, a bomba de remédio implantada para espasticidade e as cirurgias de tendões e da coluna, cada um com prazo do cirurgião. Uma **lesão por pressão** aberta ou uma infecção urinária com febre adiam o voo. No jato **pressurizado**, o problema é o assento duro por horas; no avião leve **não pressurizado** e no **helicóptero**, o embarque exige transferência por pessoas treinadas.",
      '**Como se preparar.** Informe a categoria (WCHR, WCHS ou WCHC) ao comprar a passagem, leve a almofada da cadeira para o assento do avião e alivie a pressão mudando de posição. Confirme com a companhia as regras para cadeira motorizada e bateria. O piloto planeja o tratamento da espasticidade com o médico e o examinador e faz a prova na aeronave adaptada em que vai voar.',
    ].join('\n\n'),
    recursos: [
      {
        paragrafo: 6,
        tabela: {
          titulo: "Tratamentos e voo · paraplegia e cadeira de rodas",
          colunas: ['Tratamento', 'Tipo', 'No voo'],
          linhas: [
            ["Almofada e mudança de posição", "Não invasivo", "Aliviar a pressão durante o voo"],
            ["Cateterismo intermitente", "Procedimento simples", "Levar o material na bagagem de mão"],
            ["Cirurgia da lesão por pressão", "Invasivo", "Voar só com a ferida fechada e a liberação do cirurgião"],
          ],
        },
      },
      { paragrafo: 1, midia: 'categoria-cadeira' },
      {
        paragrafo: 4,
        tabela: {
          titulo: 'Liberação para voo · paraplegia e cadeira de rodas',
          colunas: ['Situação', 'Passageiro', 'Tripulante'],
          linhas: [
            ["Paraplegia estável", "Pode voar; WCHC e cuidado com a pele: sentado por horas sem sentir, a pele faz ferida", "FAA: tratada como amputação, SODA após prova de voo; avião com comando manual, porque as pernas não acionam pedais"],
            ["Paraplegia e helicóptero", "Pode voar: é passageiro como em qualquer aeronave", "Sem comando manual aprovado para os pedais; Reino Unido: nenhum piloto certificado, porque o helicóptero exige pedais o tempo todo"],
            ["Precisa de ajuda para o sanitário", "Viajar com acompanhante: a tripulação não presta cuidado pessoal", "Avaliação funcional, porque depende do que a função exige durante a jornada"],
            ["Doença neuromuscular que progride", "Pode voar conforme a função: o que decide é a respiração e a mobilidade do dia", "FAA: SODA não se aplica a condição que progride; decisão da autoridade, porque o que foi testado hoje pode mudar"],
          ],
        },
      },
      {
        paragrafo: 5,
        tabela: {
          titulo: 'Remédios e voo · paraplegia',
          colunas: ['Remédio ou classe', 'Efeito que importa no voo', 'Tripulante (FAA/ANAC)'],
          linhas: [
            ["Relaxante muscular para espasticidade", "Sono e reação lenta; parar de repente causa espasmos", "Em geral não aceito; planejar com o examinador, porque o relaxante seda e diminui a atenção"],
            ["Opioide para dor", "Sono e queda da atenção", "FAA: Do Not Fly; crônico, Do Not Issue, porque o opioide seda e atrasa a reação"],
            ["Remédio para a bexiga", "Alguns causam sono e boca seca", "Reino Unido: alguns não aceitos, porque podem turvar a visão e a atenção"],
          ],
        },
      },
      {
        paragrafo: 7,
        tabela: {
          titulo: 'Como se preparar · paraplegia e cadeira de rodas',
          colunas: ['Momento ou situação', 'O que fazer'],
          linhas: [
            ['Compra da passagem', 'Informar a categoria WCHR, WCHS ou WCHC e pedir assistência com 48 h'],
            ['No assento', 'Levar a almofada da cadeira e mudar de posição para aliviar a pressão'],
            ['Cadeira danificada', 'Pedir a substituta equivalente na chegada'],
            ['Piloto', 'Planejar o remédio da espasticidade e fazer a prova na aeronave adaptada'],
          ],
        },
      },
    ],
  },
  {
    id: 'df-cego',
    periodo: 'Cegueira',
    titulo: 'Cegueira, baixa visão e cão-guia',
    pergunta: 'O que a pessoa cega precisa saber para voar, com ou sem cão-guia?',
    texto: [
      'A **cegueira** e a **baixa visão** mudam a orientação no aeroporto, a leitura de painéis e avisos, a localização do assento e o caminho até a saída de emergência. A pessoa cega é **PNAE**: tem assistência do check-in à saída do aeroporto, nas conexões e no desembarque, e **prioridade de embarque**, sem custo.',
      'A bordo, peça a **demonstração individual** dos procedimentos de emergência. Tocar o cinto, o colete, a máscara de oxigênio e o encosto à frente e **contar as fileiras** até a saída mais próxima preparam para uma evacuação no escuro ou com fumaça, quando nem quem enxerga vê bem. Avise a tripulação sobre a deficiência visual ao embarcar.',
      'O **cão-guia** viaja **sem custo**, na cabine, no **chão junto ao passageiro**, com arreio e sem focinheira. No Brasil, a dupla leva a **carteira de identificação** com foto e a **plaqueta** no pescoço do cão, expedidas pelo centro de treinamento ou pelo instrutor, a **carteira de vacinação** atualizada, com vacina múltipla e antirrábica assinada por veterinário, e coleira, guia e arreio com alça.',
      'Nos voos domésticos, a ANAC orientou as companhias a **não exigir atestado de saúde** de 10 dias para o cão-guia: o documento sanitário é a carteira de vacinação. O cão **em treinamento** usa plaqueta com a inscrição "cão-guia em treinamento" e dispensa o arreio. Nos voos **internacionais**, valem também as exigências sanitárias do **país de destino**, que pedem preparo com antecedência.',
      'Em **voo longo**, planeje alimentação e água do cão e as necessidades fisiológicas antes do embarque e nas conexões. Na **aviação**, a cegueira e a baixa visão que não melhoram com óculos impedem a função de **piloto**, mas não outras funções em terra. Na viagem, a deficiência visual não muda nada no voo pressurizado ou não pressurizado: o que muda é o deslocamento.',
      "**Tratamentos, prognóstico e tipo de voo.** Algumas causas de baixa visão têm tratamento: a **catarata**, com cirurgia; o **glaucoma**, com colírio, laser ou cirurgia; a **retinopatia do diabetes** e a degeneração da mácula, com laser e injeção no olho (Veja M2V4 - VII e VIII). Quando a perda é definitiva, o tratamento é **não invasivo**: **reabilitação visual**, auxílios ópticos, leitor de tela, bengala e **cão-guia**. Depois de cirurgia do olho, valem os prazos do voo dos olhos; com **gás no olho**, voar é proibido até ele ser absorvido (Veja M2V4 - VIII). O prognóstico depende da causa: a catarata operada costuma recuperar a visão; a perda do nervo óptico, não. No jato **pressurizado**, a orientação a bordo e a assistência pesam mais que a altitude; no avião leve **não pressurizado** e no **helicóptero**, o passageiro cego precisa de instrução de segurança tátil e de alguém que o guie na saída.",
      '**Como se preparar.** Peça assistência com 48 horas e avise que viaja com cão-guia; confira os documentos do cão e, no exterior, as regras do destino com antecedência. Algumas companhias aceitam um cadastro permanente, o **FREMEC**, com laudo oftalmológico, para dispensar o MEDIF a cada viagem.',
    ].join('\n\n'),
    recursos: [
      {
        paragrafo: 6,
        tabela: {
          titulo: "Tratamentos e voo · cegueira e baixa visão",
          colunas: ['Tratamento', 'Tipo', 'No voo'],
          linhas: [
            ["Reabilitação visual e cão-guia", "Não invasivo", "Assistência e cão na cabine, sem custo"],
            ["Cirurgia de catarata ou glaucoma", "Invasivo", "Prazo do voo dos olhos (Veja M2V4 - VIII)"],
            ["Gás no olho após cirurgia de retina", "Invasivo", "Não voar até o gás ser absorvido"],
          ],
        },
      },
      { paragrafo: 1, midia: 'cao-guia-documentos' },
      {
        paragrafo: 3,
        tabela: {
          titulo: 'Cão-guia · documentos e regras',
          colunas: ['Item', 'O que vale'],
          linhas: [
            ['Identificação', 'Carteira com foto e plaqueta no pescoço do cão, do centro de treinamento ou instrutor'],
            ['Saúde', 'Carteira de vacinação atualizada: vacina múltipla e antirrábica, assinada por veterinário'],
            ['Equipamento', 'Coleira, guia e arreio com alça; sem focinheira'],
            ['Na cabine', 'Sem custo, no chão junto ao passageiro'],
            ['Em treinamento', 'Plaqueta "cão-guia em treinamento"; arreio dispensado'],
            ['Voo internacional', 'Também as exigências sanitárias do país de destino'],
          ],
        },
      },
      {
        paragrafo: 7,
        tabela: {
          titulo: 'Como se preparar · cegueira e cão-guia',
          colunas: ['Momento ou situação', 'O que fazer'],
          linhas: [
            ['48 h antes', 'Pedir assistência e avisar sobre o cão-guia'],
            ['Antes do voo internacional', 'Conferir as exigências sanitárias do destino com antecedência'],
            ['A bordo', 'Pedir a demonstração individual e contar as fileiras até a saída'],
            ['Viagens frequentes', 'Perguntar à companhia sobre o FREMEC'],
          ],
        },
      },
    ],
  },
  {
    id: 'df3',
    periodo: 'Visão monocular',
    titulo: 'Visão monocular',
    pergunta: 'Quem enxerga com um olho só pode voar e pilotar?',
    texto: [
      'A **visão monocular** é ter só um olho funcionando, por perda, doença ou baixa visão grave num deles. O campo visual fica menor do lado do olho que falta e perde-se a **visão em 3D de perto**, a estereopsia. Mas a **noção de profundidade a distância** se mantém: além de alguns metros, ela vem de sombras, tamanho aparente, perspectiva e movimento (Veja M2V4).',
      '**O passageiro** com visão monocular voa sem restrição. Vale atenção ao lado cego no corredor e no aeroporto e, se a outra visão também for baixa, as mesmas medidas de quem tem deficiência visual: assistência, demonstração individual e contagem das fileiras até a saída.',
      '**O tripulante** precisa de **adaptação**: aprender a usar as pistas de profundidade de um olho só e a girar mais a cabeça para cobrir o campo. A ICAO aceita a exceção depois de ao menos **6 meses** de adaptação e de **teste em voo**; a FAA também pede **6 meses** e libera por emissão especial em qualquer classe. A ANAC aceita a visão monocular na **revalidação** ou no exame inicial depois de acidente ou incidente grave, com o outro olho normal.',
      'O tipo de voo pesa. No **helicóptero** em voo baixo, a varredura lateral contra obstáculos e fios depende muito do campo visual. No pouso, a estimativa de altura e de distância já usa pistas monoculares, o que ajuda na adaptação. Num avião **não pressurizado**, a falta de oxigênio piora a visão noturna em altitudes moderadas (Veja M1V2), o que soma ao campo menor.',
      'O olho que sobra precisa ser protegido e acompanhado: uma lesão nele muda tudo. Óculos de proteção, óculos de reserva a bordo e consultas regulares com o oftalmologista são parte da rotina. Qualquer queda de visão no olho bom afasta do voo até nova avaliação.',
      "**Tratamentos, prognóstico e tipo de voo.** A visão monocular raramente se trata: a conduta é **expectante** e de **adaptação**, e o tratamento **não invasivo** é proteger o olho bom, corrigir o grau e treinar a varredura com a cabeça. Quando a causa tem tratamento, como uma catarata no olho fraco ou um descolamento de retina, entra a **cirurgia**, um tratamento **invasivo** com prazo próprio (Veja M2V4 - VIII). O prognóstico é bom depois da adaptação: muitos pilotos voam com um olho só. No jato **pressurizado** de dois pilotos, o outro piloto cobre o lado cego; no avião leve **não pressurizado**, de um só piloto, a varredura lateral pesa mais, sobretudo no tráfego; no **helicóptero**, o voo baixo perto de fios e obstáculos exige girar a cabeça o tempo todo.",
      '**Como se preparar.** O piloto cumpre os 6 meses de adaptação, treina a varredura com o instrutor, leva ao examinador o laudo do oftalmologista e se prepara para o teste em voo. O passageiro escolhe o assento que deixa o lado bom voltado para o corredor quando isso ajuda a se orientar.',
    ].join('\n\n'),
    recursos: [
      {
        paragrafo: 6,
        tabela: {
          titulo: "Tratamentos e voo · visão monocular",
          colunas: ['Tratamento', 'Tipo', 'No voo'],
          linhas: [
            ["Adaptação e treino de varredura", "Expectante e não invasivo", "ICAO: ao menos 6 meses e teste em voo"],
            ["Proteção do olho bom", "Não invasivo", "Óculos de proteção e de reserva"],
            ["Cirurgia no olho fraco", "Invasivo", "Prazo do voo dos olhos (Veja M2V4 - VIII)"],
          ],
        },
      },
      { paragrafo: 1, midia: 'visao-deficiencia' },
      {
        paragrafo: 3,
        tabela: {
          titulo: 'Liberação para voo · visão monocular',
          colunas: ['Situação', 'Passageiro', 'Tripulante'],
          linhas: [
            ["Visão monocular há menos de 6 meses", "Pode voar: o passageiro não precisa julgar distâncias", "Não voar como piloto no período de adaptação, porque o cérebro ainda não aprendeu a calcular distância com um olho"],
            ["Visão monocular adaptada", "Pode voar: não muda nada a bordo", "ICAO e FAA: após 6 meses e teste; ANAC: na revalidação ou após acidente, com o outro olho normal, porque a adaptação já foi comprovada"],
            ["Queda de visão no olho bom", "Procurar o oftalmologista antes: é o único olho e a causa precisa ser tratada", "Não voar até nova avaliação, porque não há olho de reserva"],
            ["Falha no teste de cores", "Pode voar: as cores não pesam para o passageiro", "Avaliação prática; no Reino Unido, pode ficar só de dia, porque luzes de pista e sinais à noite dependem da cor"],
          ],
        },
      },
      {
        paragrafo: 7,
        tabela: {
          titulo: 'Como se preparar · visão monocular',
          colunas: ['Momento ou situação', 'O que fazer'],
          linhas: [
            ['Primeiros 6 meses', 'Treinar varredura e pistas de profundidade; não pilotar'],
            ['Exame', 'Levar o laudo do oftalmologista e preparar o teste em voo'],
            ['Rotina', 'Óculos de proteção, óculos de reserva e consultas regulares'],
            ['Passageiro', 'Escolher o assento que facilita a orientação'],
          ],
        },
      },
    ],
  },
  {
    id: 'df4',
    periodo: 'Audição',
    titulo: 'Deficiência auditiva',
    pergunta: 'Como fica a comunicação para o passageiro surdo e para o piloto com perda auditiva?',
    texto: [
      'A **deficiência auditiva** vai da perda leve à **surdez**. Na cabine, os avisos chegam pelo **sistema de som** e pela tripulação, e na evacuação os comandos são falados. Para o piloto, a audição é a via do **rádio**, dos alarmes sonoros e da conversa com o outro piloto (Veja M2V3).',
      '**O passageiro** surdo ou com perda auditiva informa à companhia as **ajudas de comunicação** de que precisa e pode pedir a **demonstração individual** dos procedimentos de emergência. Avisar a tripulação no embarque permite que os avisos importantes cheguem por escrito ou por gestos. O **aparelho auditivo** e o implante podem ser usados a bordo.',
      '**O tripulante** precisa cumprir o teste de audição da classe. A ANAC aceita quem não atinge os limiares se passar na discriminação da fala e na voz sussurrada, e na revalidação um ouvido pode bastar. A ICAO considera que o **aparelho auditivo**, em geral, não é aceito em voo para profissionais. Na FAA, o piloto surdo pode voar com a limitação **"não válido onde o uso do rádio é exigido"**.',
      'O ruído agrava tudo. No **helicóptero** e no avião leve **não pressurizado**, o ruído é alto e a comunicação depende do fone e do capacete (Veja M1V6). Quem já ouve pouco perde mais nesse ambiente, e os alarmes precisam de reforço visual. Na aviação comercial, o rádio é obrigatório: a limitação da FAA restringe o voo a espaço aéreo e aeródromos sem exigência de rádio.',
      'O Reino Unido usa o código **"só com aparelho auditivo"** quando a pessoa cumpre o requisito com ele. Proteger a audição que resta é parte da prevenção: protetor de ouvido e fone com redução de ruído evitam piorar a perda (Veja M1V6 - III).',
      "**Tratamentos, prognóstico e tipo de voo.** A perda auditiva tem tratamento conforme a causa. A **cera** e a otite se resolvem com conduta simples; a perda por ruído e a da idade se tratam de forma **não invasiva**, com **aparelho auditivo**; a **surdez súbita** é urgência, com corticoide e, às vezes, injeção dentro do ouvido (Veja M1V6 - II). Os tratamentos **invasivos** são a cirurgia do ouvido médio, a prótese ancorada no osso e o **implante coclear**, que pode devolver a compreensão da fala a quem tem perda profunda; depois de cirurgia do ouvido, o passageiro espera ao menos **10 dias**, com liberação do otorrino (Veja M2V3 - III). O aparelho e o implante podem ficar ligados no voo. No jato **pressurizado**, os avisos também por escrito ajudam; no avião leve **não pressurizado** e no **helicóptero**, o ruído alto mascara a fala, e o fone com boa vedação é parte do tratamento.",
      '**Como se preparar.** O passageiro avisa a companhia sobre as ajudas de comunicação, se apresenta à tripulação e pede a demonstração individual. O piloto faz o audiograma com antecedência, leva os resultados ao examinador e confirma que limitação vai constar no certificado.',
    ].join('\n\n'),
    recursos: [
      {
        paragrafo: 6,
        tabela: {
          titulo: "Tratamentos e voo · deficiência auditiva",
          colunas: ['Tratamento', 'Tipo', 'No voo'],
          linhas: [
            ["Aparelho auditivo", "Não invasivo", "Pode ficar ligado no voo"],
            ["Implante coclear", "Invasivo", "Pode ficar ligado; avisar na inspeção"],
            ["Cirurgia do ouvido médio", "Invasivo", "Passageiro: ao menos 10 dias, com o otorrino"],
          ],
        },
      },
      { paragrafo: 1, midia: 'audicao-deficiencia' },
      {
        paragrafo: 3,
        tabela: {
          titulo: 'Liberação para voo · deficiência auditiva',
          colunas: ['Situação', 'Passageiro', 'Tripulante'],
          linhas: [
            ["Surdez", "Pode voar; avisar a tripulação e pedir a demonstração individual: os avisos sonoros não chegam", "FAA: \"não válido onde o uso do rádio é exigido\", porque sem ouvir não há comunicação com o controle"],
            ["Perda que só atinge o limiar com aparelho", "Pode voar e usar o aparelho: ele é seguro a bordo", "ICAO: em geral não aceito para profissionais; Reino Unido: só com aparelho, porque se o aparelho falhar o rádio se perde"],
            ["Falha no audiograma, boa compreensão da fala", "Pode voar: entende as instruções", "ANAC: pode ser apto pela fala e voz sussurrada, porque o que importa é entender a comunicação"],
            ["Perda num só ouvido", "Pode voar: o outro ouvido basta", "ANAC: na revalidação, um ouvido pode bastar, porque o fone leva o som ao ouvido bom"],
          ],
        },
      },
      {
        paragrafo: 7,
        tabela: {
          titulo: 'Como se preparar · deficiência auditiva',
          colunas: ['Momento ou situação', 'O que fazer'],
          linhas: [
            ['48 h antes', 'Informar as ajudas de comunicação'],
            ['No embarque', 'Avisar a tripulação para receber os avisos por escrito ou por gestos'],
            ['Piloto', 'Fazer o audiograma antes do exame e conferir a limitação'],
            ['Em ambiente ruidoso', 'Usar protetor e fone com redução de ruído'],
          ],
        },
      },
    ],
  },
  {
    id: 'df-tea',
    periodo: 'Autismo',
    titulo: 'Autismo',
    pergunta: 'Como planejar o voo da pessoa autista, e um autista pode pilotar?',
    texto: [
      'O **transtorno do espectro autista** (TEA) muda a forma de perceber, comunicar e lidar com mudanças, com intensidade muito diferente de uma pessoa para outra. No Brasil, a pessoa autista é **pessoa com deficiência para todos os efeitos legais**, e pode ter a **CIPTEA**, a carteira de identificação, válida por **5 anos**. O autismo é uma das **deficiências ocultas**, e o **cordão de girassóis** pode sinalizá-lo.',
      'No aeroporto, barulho, luzes, filas, toque na revista, anúncios e mudanças de portão podem causar **sobrecarga sensorial**, com crise, fuga ou bloqueio. No avião, somam-se o espaço apertado, o ruído dos motores, a pressão nos ouvidos e a turbulência. Antecipar cada etapa com fotos ou vídeos, ensaiar o roteiro e levar **fones com redução de ruído** e objetos que acalmam diminuem a imprevisibilidade.',
      '**O passageiro** autista é **PNAE** e tem assistência e embarque prioritário. Se não consegue entender as **instruções de segurança** ou usar o sanitário sem ajuda, a companhia exige **acompanhante**, fornecido sem custo ou pago pelo próprio acompanhante com até **20%** da tarifa. O cordão é **opcional** e não substitui documento quando pedido.',
      '**O tripulante** autista passa por avaliação **individual**. No Reino Unido, o autismo **não desqualifica automaticamente**: o examinador analisa relatórios de psicologia, neuropsicologia ou psiquiatria e pode pedir avaliação atualizada, e o candidato pode começar o treinamento com **relatórios de progresso**. A FAA não lista o autismo entre as condições da tabela psiquiátrica: a decisão é caso a caso. No Brasil, entra na avaliação mental e comportamental do RBAC 67 (Veja M2V7).',
      'Para o piloto, o que pesa é a **função**: comunicação com o outro piloto e com o controle, flexibilidade diante do imprevisto, atenção e julgamento sob estresse. **Remédios** associados, como os do TDAH, são avaliados à parte; no Reino Unido, os estimulantes não são aceitos para o certificado. No **helicóptero**, vibração e ruído são mais intensos (Veja M1V6).',
      "**Tratamentos, prognóstico e tipo de voo.** O autismo não é doença para curar: o tratamento é **apoio**, e quase todo **não invasivo**. Entram a **terapia comportamental**, a fonoaudiologia, a terapia ocupacional e a preparação para situações novas, como a **história social** da viagem e a visita ao aeroporto. Remédio entra só para condições associadas, como ansiedade, insônia, TDAH ou irritabilidade intensa, e o que dá sono muda a regra para o tripulante. Não há tratamento invasivo para o autismo. O prognóstico da viagem melhora muito com preparo e previsibilidade. No jato **pressurizado**, o voo longo, o ruído e a cabine cheia são o desafio, e o abafador de ruído ajuda; no avião leve **não pressurizado** e no **helicóptero**, o ruído e a vibração são intensos, e o voo deve ser explicado antes, passo a passo.",
      '**Como se preparar.** Avise a companhia com 48 horas, ou 72 horas se houver acompanhante, e descreva o que ajuda numa crise. Escolha voos mais curtos e horários calmos quando possível, leve a CIPTEA, fones e remédios na bagagem de mão. O candidato a piloto procura o examinador antes da formação e leva os relatórios do especialista.',
    ].join('\n\n'),
    recursos: [
      {
        paragrafo: 6,
        tabela: {
          titulo: "Tratamentos e voo · autismo",
          colunas: ['Tratamento', 'Tipo', 'No voo'],
          linhas: [
            ["Terapias de apoio e história social", "Não invasivo", "Preparar a viagem com antecedência"],
            ["Remédio para condição associada", "Não invasivo", "Tripulante: os que dão sono mudam a regra"],
            ["Abafador de ruído", "Não invasivo", "Usar no embarque e no voo"],
          ],
        },
      },
      { paragrafo: 1, midia: 'autismo-voo' },
      {
        paragrafo: 3,
        tabela: {
          titulo: 'Liberação para voo · autismo',
          colunas: ['Situação', 'Passageiro', 'Tripulante'],
          linhas: [
            ["Autismo com autonomia", "Pode voar; assistência se precisar: ruído e fila podem sobrecarregar", "Avaliação individual; Reino Unido: não desqualifica automaticamente, porque o que conta é o desempenho real"],
            ["Não entende as instruções de segurança", "Viajar com acompanhante: numa emergência, precisa de alguém que o guie", "Não se aplica: quem não entende instruções não exerce a função"],
            ["Uso de estimulante para TDAH associado", "Pode voar: o estimulante não traz risco ao passageiro", "Reino Unido: estimulantes não aceitos; avaliação à parte, porque o remédio e o TDAH mudam atenção e julgamento"],
            ["Crise de sobrecarga no dia", "Adiar ou pedir apoio: a crise a bordo é difícil de acalmar", "Não exercer a função, porque a sobrecarga tira atenção e decisão"],
          ],
        },
      },
      {
        paragrafo: 7,
        tabela: {
          titulo: 'Como se preparar · autismo',
          colunas: ['Momento ou situação', 'O que fazer'],
          linhas: [
            ['Semanas antes', 'Mostrar fotos e vídeos do aeroporto e do avião e ensaiar o roteiro'],
            ['72 h ou 48 h antes', 'Avisar sobre acompanhante e pedir assistência'],
            ['No aeroporto', 'CIPTEA, cordão de girassóis se quiser e fones com redução de ruído'],
            ['A bordo', 'Objetos que acalmam, remédios na bagagem de mão e plano para a crise'],
          ],
        },
      },
    ],
  },
  {
    id: 'df5',
    periodo: 'Deficiências mentais e ocultas',
    titulo: 'Deficiência intelectual, psicossocial e outras ocultas',
    pergunta: 'Como planejar o voo de quem tem uma deficiência mental ou que não aparece?',
    texto: [
      'A **deficiência intelectual** limita o raciocínio e a autonomia; a **deficiência psicossocial** decorre de transtornos mentais de longa duração, como esquizofrenia ou transtorno bipolar. Outras deficiências **ocultas** incluem epilepsia, dor crônica, doenças intestinais e perda auditiva leve. O **cordão de girassóis** é o símbolo nacional dessas deficiências.',
      'O cordão é **opcional**: não usá-lo não tira direito nenhum, e ele não substitui o documento se a companhia ou a autoridade pedir. A pessoa com limitação de autonomia é **PNAE** e tem direito a assistência e embarque prioritário. Antecipar o roteiro, visitar o aeroporto antes e levar objetos que acalmam ajudam a reduzir a ansiedade.',
      'A companhia **exige acompanhante** quando a deficiência mental ou intelectual impede de entender as **instruções de segurança**, quando a pessoa não consegue usar o sanitário sem ajuda ou quando viaja em maca. O acompanhante é fornecido pelo operador sem custo, ou o próprio acompanhante paga até **20%** da tarifa.',
      '**O tripulante** com transtorno psicossocial passa pela avaliação mental e comportamental, que é **individual** (Veja M2V7). O que pesa é a função: atenção, julgamento, comunicação e estabilidade sob estresse. Diagnóstico estável e tratado não equivale automaticamente a inaptidão, e o remédio usado também entra na avaliação. A deficiência intelectual que limita julgamento e aprendizado tende a impedir a função de piloto.',
      'No voo, o ambiente conta. Turbulência, ruído e cabine cheia são piores num **voo longo**; no **helicóptero**, vibração e barulho são intensos (Veja M1V6). Uma crise psiquiátrica a bordo pode levar a desvio do voo; por isso, quem está em crise aguda deve adiar a viagem e quem tem tratamento contínuo leva o remédio na bagagem de mão.',
      "**Tratamentos, prognóstico e tipo de voo.** Nas deficiências intelectual e psicossocial, o tratamento é **contínuo** e quase todo **não invasivo**: apoio, terapia, **remédios** no horário e plano para crises. A conduta **expectante** vale para quem está estável há tempo, sem mudar nada antes da viagem. O tratamento **invasivo** é raro: a **internação** e, em casos graves de humor, a eletroconvulsoterapia, com prazos e regras próprios (Veja M2V7). Nas outras deficiências ocultas, como a epilepsia, a doença dos rins em diálise e a dor crônica, o tratamento segue a doença, e a **diálise** é marcada em torno do voo. O prognóstico da viagem depende da estabilidade: crise recente adia. No jato **pressurizado**, a tripulação pode ajudar numa crise; no avião leve **não pressurizado** e no **helicóptero**, não há tripulação de cabine, e o acompanhante é ainda mais importante.",
      '**Como se preparar.** Avise a companhia com 48 horas, ou 72 horas se houver acompanhante, explique o que ajuda numa crise e leve o remédio na bagagem de mão. Use o cordão de girassóis se quiser e tenha o documento à mão. O tripulante leva ao examinador o relatório do especialista sobre a função e o tratamento.',
    ].join('\n\n'),
    recursos: [
      {
        paragrafo: 6,
        tabela: {
          titulo: "Tratamentos e voo · deficiências ocultas",
          colunas: ['Tratamento', 'Tipo', 'No voo'],
          linhas: [
            ["Remédios no horário e plano de crise", "Não invasivo", "Levar na bagagem de mão, com receita"],
            ["Internação recente", "Invasivo", "Voar só com alta e liberação do psiquiatra"],
            ["Diálise", "Invasivo", "Marcar as sessões em torno do voo"],
          ],
        },
      },
      { paragrafo: 1, midia: 'prazo-assistencia' },
      {
        paragrafo: 3,
        tabela: {
          titulo: 'Liberação para voo · deficiências mentais e ocultas',
          colunas: ['Situação', 'Passageiro', 'Tripulante'],
          linhas: [
            ["Deficiência intelectual com autonomia", "Pode voar; assistência se precisar: o apoio cobre as etapas da viagem", "Função de piloto limitada, porque julgamento e aprendizado decidem a segurança"],
            ["Não entende as instruções de segurança", "Viajar com acompanhante: numa emergência, precisa de alguém que o guie", "Não se aplica: quem não entende instruções não exerce a função"],
            ["Transtorno psicossocial estável e tratado", "Pode voar: estável e tratado, não traz risco a bordo", "Avaliação individual da função e do remédio, porque alguns remédios sedam (Veja M2V7)"],
            ["Crise aguda no dia", "Adiar e procurar ajuda: a crise piora com o estresse da viagem", "Não exercer a função, porque a crise tira julgamento e controle"],
          ],
        },
      },
      {
        paragrafo: 7,
        tabela: {
          titulo: 'Como se preparar · deficiências mentais e ocultas',
          colunas: ['Momento ou situação', 'O que fazer'],
          linhas: [
            ['Antes de comprar', 'Escolher voo mais curto e horário mais calmo quando possível'],
            ['72 h antes', 'Avisar sobre o acompanhante'],
            ['No aeroporto', 'Cordão de girassóis se quiser, documento à mão e fones'],
            ['A bordo', 'Remédio na bagagem de mão e um plano para a crise'],
          ],
        },
      },
    ],
  },
  {
    id: 'df6',
    periodo: 'Certificado médico',
    titulo: 'Liberação do CMA para quem tem deficiência',
    pergunta: 'Qual é o caminho até o certificado médico de quem tem uma deficiência?',
    texto: [
      'O **certificado médico aeronáutico** (CMA, no Brasil) não é negado só porque existe uma deficiência. O ponto de partida é a regra da ICAO: quem não atinge um requisito pode ser certificado se a **conclusão médica acreditada** mostrar que a segurança não fica em risco, consideradas a habilidade, a experiência e a operação, com as **limitações** necessárias.',
      'Na **ANAC**, o candidato faz o exame com o examinador credenciado. Se for julgado não apto, pode recorrer, e a ANAC pode, a seu critério, exigir um **teste de proficiência em voo** e ouvir outros examinadores. Sequelas funcionais que possam afetar a segurança, visão monocular no exame inicial e perda auditiva fora dos testes são os pontos mais comuns de discussão.',
      'Na **FAA**, a condição **estática**, como amputação, paralisia não progressiva ou surdez, pode receber a **SODA** depois de uma **prova de voo médica**. A SODA **não expira**, mas é retirada se a condição piorar. Condições progressivas seguem a **emissão especial**, com reavaliações periódicas.',
      'Na **Europa** e no **Reino Unido**, a deficiência costuma virar **código de limitação**: só como ou com copiloto qualificado, só com piloto de segurança e comandos duplos, sem passageiros, só com a prótese aprovada, só com comandos manuais aprovados, só com aparelho auditivo ou só de dia. A limitação acompanha o certificado em todo voo.',
      'A limitação depende da aeronave e da operação. Uma adaptação aprovada num avião leve não vale automaticamente para um **helicóptero** ou para uma aeronave de linha **pressurizada**, de dois pilotos. Mudar de categoria, de classe de certificado ou de aeronave pode pedir nova avaliação prática.',
      '**Como se preparar.** Reúna relatórios de função (força, amplitude, visão, audição, cognição), não só diagnósticos; procure o examinador antes de investir na formação; pergunte que prova prática pode ser exigida e em que aeronave. Guarde o certificado com a limitação e informe qualquer piora antes de voar.',
    ].join('\n\n'),
    recursos: [
      { paragrafo: 1, midia: 'caminho-cma' },
      {
        paragrafo: 4,
        tabela: {
          titulo: 'Liberação do CMA · por autoridade',
          colunas: ['Autoridade', 'Caminho', 'Limitação'],
          linhas: [
            ['ICAO', 'Conclusão médica acreditada, habilidade e experiência', 'Anotada quando a segurança depende dela'],
            ['ANAC', 'Examinador credenciado; recurso; teste de proficiência em voo a critério da ANAC', 'Conforme o julgamento'],
            ['FAA', 'SODA para condição estática, após prova de voo médica; emissão especial para as demais', 'Ex.: "não válido onde o uso do rádio é exigido"'],
            ['Europa e Reino Unido', 'Avaliação pelo examinador ou pela autoridade, com prova prática quando preciso', 'Códigos: só com copiloto, só com prótese, só de dia'],
          ],
        },
      },
      {
        paragrafo: 6,
        tabela: {
          titulo: 'Como se preparar · CMA',
          colunas: ['Momento ou situação', 'O que fazer'],
          linhas: [
            ['Antes da formação', 'Consultar o examinador sobre a condição'],
            ['Exame', 'Levar relatórios de função, não só diagnósticos'],
            ['Prova prática', 'Treinar na aeronave em que vai fazer a prova'],
            ['Depois do certificado', 'Respeitar a limitação e informar qualquer piora'],
          ],
        },
      },
      {
        paragrafo: 6,
        tabela: {
          titulo: 'Sistemas do corpo mais atingidos',
          colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
          linhas: [
            ['Pele', 'Lesão por pressão em quem não sente o assento; o peso fica horas no mesmo ponto e a circulação da pele cai', 'Almofada própria e mudança de posição'],
            ['Veias das pernas', 'Trombose com as pernas paradas; sem a contração da panturrilha o sangue estagna', 'Movimento possível, corredor e prevenção indicada pelo médico'],
            ['Visão', 'Menos campo e menos profundidade de perto; um olho só vê menos para o lado e não soma as duas imagens', 'Adaptação, varredura ativa e limitação quando preciso'],
            ['Audição', 'Perda de avisos e do rádio; o ruído da cabine mascara a fala', 'Ajudas de comunicação, fone e limitação de rádio'],
            ['Sistema nervoso', 'Sobrecarga sensorial e crise; ruído, filas e mudanças excedem a capacidade de adaptação', 'Roteiro antecipado, acompanhante e plano para a crise'],
          ],
        },
      },
    ],
  },
];

export const testeDeficiencias: Questao[] = [
  {
    pergunta: 'No voo, o que se avalia na pessoa com deficiência?',
    opcoes: ['Só o diagnóstico', 'A função: o que consegue fazer, com ou sem ajuda', 'A idade', 'O tipo de passagem'],
    correta: 1,
    explicacao: 'Passageiro e tripulante são avaliados pela função, não pelo nome da deficiência.',
    topico: 'df1',
  },
  {
    pergunta: 'Com quanta antecedência o passageiro pede a assistência comum à companhia, segundo a ANAC?',
    opcoes: ['12 h', '24 h', '48 h', '7 dias'],
    correta: 2,
    explicacao: 'São 48 horas; para acompanhante ou documento médico, 72 horas.',
    topico: 'df1',
  },
  {
    pergunta: 'O que a ICAO exige para certificar quem não atinge um requisito médico?',
    opcoes: ['Nada', 'Conclusão médica acreditada, habilidade e experiência consideradas e limitação quando preciso', 'Só um atestado do médico assistente', 'Pagamento de taxa extra'],
    correta: 1,
    explicacao: 'É a cláusula de flexibilidade do Anexo 1 (1.2.4.10).',
    topico: 'df1',
  },
  {
    pergunta: 'Qual categoria descreve quem anda até o assento, mas não sobe escada?',
    opcoes: ['WCHR', 'WCHS', 'WCHC', 'STCR'],
    correta: 1,
    explicacao: 'WCHS: precisa de equipamento de embarque, mas anda até o assento.',
    topico: 'df2',
  },
  {
    pergunta: 'A cadeira de rodas chegou danificada. O que a companhia deve fazer?',
    opcoes: ['Nada', 'Entregar uma substituta equivalente na chegada', 'Cobrar o conserto', 'Devolver só no próximo voo'],
    correta: 1,
    explicacao: 'Sem devolução em 48 horas, a companhia paga o valor de mercado em até 14 dias.',
    topico: 'df2',
  },
  {
    pergunta: 'Na FAA, como o piloto com amputação estável pode ser liberado?',
    opcoes: ['Não pode', 'Com a SODA, depois de uma prova de voo médica', 'Só com atestado', 'Só como passageiro'],
    correta: 1,
    explicacao: 'A SODA vale para condição estática e não expira enquanto a condição não piorar.',
    topico: 'df-amp',
  },
  {
    pergunta: 'Como viaja o cão-guia, pela regra da ANAC?',
    opcoes: ['No porão, pago', 'Na cabine, no chão, sem custo, com arreio e sem focinheira', 'Só com focinheira', 'Não pode viajar'],
    correta: 1,
    explicacao: 'O cão-guia acompanha o passageiro na cabine, sem custo.',
    topico: 'df-cego',
  },
  {
    pergunta: 'Quanto tempo de adaptação a ICAO e a FAA pedem ao piloto com visão monocular?',
    opcoes: ['1 semana', '1 mês', 'Ao menos 6 meses', '5 anos'],
    correta: 2,
    explicacao: 'O tempo serve para aprender a usar as pistas de profundidade de um olho só.',
    topico: 'df3',
  },
  {
    pergunta: 'Que limitação a FAA põe no certificado do piloto surdo?',
    opcoes: ['Só de dia', 'Não válido onde o uso do rádio é exigido', 'Só com copiloto', 'Nenhuma'],
    correta: 1,
    explicacao: 'O piloto surdo pode voar onde o rádio não é obrigatório.',
    topico: 'df4',
  },
  {
    pergunta: 'O cordão de girassóis é obrigatório para ter assistência?',
    opcoes: ['Sim', 'Não; é opcional e não substitui documento se pedido', 'Só no exterior', 'Só para crianças'],
    correta: 1,
    explicacao: 'A Lei 14.624/2023 diz que a ausência do cordão não prejudica direitos.',
    topico: 'df5',
  },
  {
    pergunta: 'Quando a companhia exige acompanhante?',
    opcoes: ['Sempre que há deficiência', 'Maca, incapacidade de entender as instruções de segurança ou de usar o sanitário sem ajuda', 'Só em voo internacional', 'Nunca'],
    correta: 1,
    explicacao: 'São os três casos do art. 27 da Resolução 280/2013.',
    topico: 'df5',
  },
  {
    pergunta: 'No recurso contra um "não apto", o que a ANAC pode exigir?',
    opcoes: ['Nada', 'Teste de proficiência em voo', 'Nova formação completa', 'Mudança de nacionalidade'],
    correta: 1,
    explicacao: 'A ANAC pode, a seu critério, exigir o teste e ouvir outros examinadores.',
    topico: 'df6',
  },
  {
    pergunta: 'Por que o encaixe da prótese pode apertar ou afrouxar durante o voo?',
    opcoes: ['Porque a prótese esfria', 'Porque a pressão mais baixa e as horas sentado mudam o volume do coto', 'Porque o avião vibra', 'Não muda'],
    correta: 1,
    explicacao: 'Leve meias de ajuste ou enchimento na bagagem de mão.',
    topico: 'df-amp',
  },
  {
    pergunta: 'Qual documento sanitário do cão-guia vale nos voos domésticos, segundo a ANAC?',
    opcoes: ['Atestado de saúde de 10 dias', 'Carteira de vacinação atualizada, com vacina múltipla e antirrábica', 'Exame de sangue', 'Nenhum'],
    correta: 1,
    explicacao: 'A ANAC orientou as companhias a não exigir atestado de 10 dias nos voos domésticos.',
    topico: 'df-cego',
  },
  {
    pergunta: 'Por que é tão difícil certificar piloto de helicóptero com paraplegia?',
    opcoes: ['Porque o helicóptero é pressurizado', 'Porque não há comando manual aprovado para os pedais', 'Porque o assento é estreito', 'Não é difícil'],
    correta: 1,
    explicacao: 'Os pedais controlam o helicóptero o tempo todo; a autoridade britânica ainda não certificou nenhum.',
    topico: 'df2',
  },
  {
    pergunta: 'Para a autoridade britânica, o autismo desqualifica o piloto?',
    opcoes: ['Sim, sempre', 'Não automaticamente: a avaliação é individual, com relatórios do especialista', 'Só na 2ª classe', 'Só depois dos 40 anos'],
    correta: 1,
    explicacao: 'O candidato pode até começar o treinamento com relatórios de progresso.',
    topico: 'df-tea',
  },
  {
    pergunta: 'Qual é a validade da CIPTEA, a carteira da pessoa autista?',
    opcoes: ['1 ano', '5 anos', '10 anos', 'Não vence'],
    correta: 1,
    explicacao: 'A Lei 13.977/2020 fixou 5 anos, com renovação mantendo o mesmo número.',
    topico: 'df-tea',
  },
];
