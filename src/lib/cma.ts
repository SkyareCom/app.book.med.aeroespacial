// Exame CMA: dados das classes, campos do formulário por sistema e motor de regras.
// Apoio à decisão do médico examinador. O julgamento final é do médico ou clínica credenciada e da ANAC.
//
// Registro de revisão (27/10/2026) — fonte: ANAC, RBAC 67 Emenda 05 (Resolução 636/2021, em vigor desde 01/11/2021).
//  - 67.13 classes; 67.15(a) validade; 67.15(b) redução da validade por razão clínica; 67.71(g) recurso à ANAC.
//  - 1ª classe: 67.75 mental; 67.77 neurológico; 67.79 cardiológico (PA > 140×90; IAM ≥ 1 ano e revascularização
//    ≥ 180 dias → apto com restrição, validade máx. 6 meses); 67.81 pneumológico; 67.85 metabólico (IMC ≥ 40;
//    glicemia < 50 ou > 140 em 2 dosagens; 50–69 e 115–139 a critério; antidiabético oral após 60 dias com 70–139);
//    67.87 hematológico; 67.93 obstétrico; 67.97 ORL; 67.99 oftalmológico (20/30 cada olho, 20/20 binocular; J1 a
//    30–50 cm, J6 a 100 cm; cores; hiperforia ≤ 1, exoforia ≤ 5, esoforia ≤ 10 DP; cirurgia refrativa > 6 meses);
//    67.101 auditivo (≤ 35 dB em 500/1.000/2.000 Hz e ≤ 50 dB em 3.000 Hz, por orelha); 67.103 odontológico.
//  - Revisão 30/10/2026 (entrevista detalhada, pedido do autor): texto integral da Subparte C consultado em
//    anac.gov.br (RBAC67EMD05.pdf): 67.75(b)–(h); 67.77(a)(1)–(15), (b), (c); 67.79(a)(1)–(13), (b)(1) (infarto ≥ 1 ano,
//    exames, IMC < 30, cintura ≤ 102 cm H ou 88 cm M, parecer psiquiátrico), (b)(2), (c), (f), (g); 67.81(a)(1)–(7);
//    67.83(a)–(b); 67.85(a)–(g); 67.87(a)–(c); 67.89(a)–(d); 67.93(a)–(c); 67.95(a)–(b); 67.97(a)–(g);
//    67.99(a)–(k); 67.101(a)–(e) (na revalidação basta uma orelha); 67.103(a)(1)–(4) (texto lido até (a)(5)).
//    67.73 e 67.91 estão reservados.
//  - Limiares específicos da 2ª, 4ª e 5ª classes (subpartes D a F) não foram consultados no texto integral:
//    marcados como [confirmar na referência]. A 3ª classe (controle de tráfego aéreo) não é regida pela ANAC.

export type ClasseCMA = '1' | '2' | '4' | '5';

export const CLASSES: { id: ClasseCMA; nome: string; quem: string; funcoes: { id: string; nome: string }[] }[] = [
  {
    id: '1',
    nome: '1ª classe',
    quem: 'Piloto de linha aérea (PLA), piloto comercial (PC) e piloto de tripulação múltipla (PTM).',
    funcoes: [
      { id: 'pla-multi', nome: 'PLA, PC ou PTM' },
      { id: 'pla-unico', nome: 'Piloto único, transporte público de passageiros' },
    ],
  },
  {
    id: '2',
    nome: '2ª classe',
    quem: 'Piloto privado (PP e PP-IFR), comissário, mecânico de voo, piloto de balão livre e aluno-piloto.',
    funcoes: [
      { id: 'pp', nome: 'PP, PP-IFR, balão ou aluno' },
      { id: 'comissario', nome: 'Comissário de voo' },
      { id: 'mecanico', nome: 'Mecânico de voo' },
    ],
  },
  {
    id: '4',
    nome: '4ª classe',
    quem: 'Piloto de aeronave leve esportiva (CPA), piloto de planador (PPL) e aluno de planador.',
    funcoes: [{ id: 'leve', nome: 'CPA, PPL ou aluno de planador' }],
  },
  {
    id: '5',
    nome: '5ª classe',
    quem: 'Piloto remoto de aeronave não tripulada (RPA).',
    funcoes: [{ id: 'rpa', nome: 'Piloto remoto (RPA)' }],
  },
];

// Validade (67.15(a)), em meses.
export function validadeMeses(funcao: string, idade: number, publico: boolean): { meses: number; regra: string } {
  switch (funcao) {
    case 'pla-multi':
      if (publico && idade >= 60) return { meses: 6, regra: '1ª classe em transporte público a partir dos 60 anos: 6 meses.' };
      return { meses: 12, regra: '1ª classe: 12 meses.' };
    case 'pla-unico':
      if (idade >= 40) return { meses: 6, regra: 'Piloto único em transporte público de passageiros a partir dos 40 anos: 6 meses.' };
      return { meses: 12, regra: '1ª classe: 12 meses.' };
    case 'comissario':
      return idade >= 60 ? { meses: 24, regra: 'Comissário a partir dos 60 anos: 24 meses.' } : { meses: 60, regra: 'Comissário até 59 anos: 60 meses.' };
    case 'mecanico':
      return { meses: 12, regra: 'Mecânico de voo: 12 meses.' };
    case 'rpa':
      return { meses: 48, regra: 'Piloto remoto: 48 meses.' };
    default:
      if (idade >= 50) return { meses: 12, regra: 'A partir dos 50 anos: 12 meses.' };
      if (idade >= 40) return { meses: 24, regra: 'De 40 a 49 anos: 24 meses.' };
      return { meses: 60, regra: 'Até 39 anos: 60 meses.' };
  }
}

// Perguntas da entrevista, uma por vez, separadas por sistema (RBAC 67, Subparte C, 1ª classe).
// Cada pergunta traz a alínea e, quando a resposta basta para decidir, a regra: o que acontece com "Sim" ou com "Não".
// Perguntas condicionais só aparecem quando a anterior pede (campo `se`).
export type Valores = Record<string, string | boolean | undefined>;
export type Nivel = 'inapto' | 'restricao' | 'julgamento' | 'confirmar' | 'ok';
type Regra = [Nivel, string];

interface CampoBase { id: string; rotulo: string; ref: string; ajuda?: string; se?: (v: Valores, ctx: Contexto) => boolean }
export type Campo =
  | (CampoBase & { tipo: 'num'; placeholder: string; unidade?: string; faixa?: [number, number] })
  | (CampoBase & { tipo: 'sn'; sim?: Regra; nao?: Regra })
  | (CampoBase & { tipo: 'opcao'; opcoes: { id: string; nome: string }[] });

export interface Contexto { inicial: boolean }

const S = (v: Valores, id: string) => v[id] === true;

export const SISTEMAS: { id: string; nome: string; achado: string; ref: string; campos: Campo[] }[] = [
  {
    id: 'vitais',
    nome: 'Sinais vitais e medidas',
    achado: 'Cardiovascular',
    ref: '67.79 · 67.85',
    campos: [
      { id: 'sexo', tipo: 'opcao', rotulo: 'Qual é o sexo do candidato?', ref: '67.79(b)(1)', ajuda: 'Define o limite de cintura após infarto e as perguntas obstétricas.', opcoes: [{ id: 'm', nome: 'Masculino' }, { id: 'f', nome: 'Feminino' }] },
      { id: 'pas', tipo: 'num', faixa: [60, 260], rotulo: 'Qual é a pressão sistólica?', placeholder: 'ex.: 120', unidade: 'mmHg', ref: '67.79(a)(8)', ajuda: 'Pressão mantida acima de 140×90 mmHg torna não apto. Repita a medida se estiver alta.' },
      { id: 'pad', tipo: 'num', faixa: [30, 160], rotulo: 'Qual é a pressão diastólica?', placeholder: 'ex.: 80', unidade: 'mmHg', ref: '67.79(a)(8)' },
      { id: 'antiHas', tipo: 'sn', rotulo: 'Usa algum anti-hipertensivo?', ref: '67.79(a)(8)', sim: ['julgamento', 'Anti-hipertensivo: apto a critério do examinador, com a pressão controlada e sem efeito sobre o voo.'] },
      { id: 'peso', tipo: 'num', faixa: [35, 250], rotulo: 'Qual é o peso?', placeholder: 'ex.: 78', unidade: 'kg', ref: '67.85(a)' },
      { id: 'altura', tipo: 'num', faixa: [130, 220], rotulo: 'Qual é a altura?', placeholder: 'ex.: 175', unidade: 'cm', ref: '67.85(a)', ajuda: 'Com o peso, calcula o IMC. IMC de 40 ou mais torna não apto.' },
      { id: 'cintura', tipo: 'num', faixa: [50, 180], rotulo: 'Qual é a circunferência da cintura?', placeholder: 'ex.: 92', unidade: 'cm', ref: '67.79(b)(1)', ajuda: 'Exigida após infarto: até 102 cm nos homens e 88 cm nas mulheres.' },
      { id: 'tabaco', tipo: 'sn', rotulo: 'Fuma?', ref: '67.79(f)', sim: ['julgamento', 'Tabagismo: fator de risco a investigar; o examinador pode pedir exames ou reduzir a validade.'] },
      { id: 'sedentario', tipo: 'sn', rotulo: 'É sedentário?', ref: '67.79(f)', sim: ['julgamento', 'Sedentarismo: fator de risco a investigar; o examinador pode pedir exames ou reduzir a validade.'] },
    ],
  },
  {
    id: 'metabolico',
    nome: 'Metabólico e endócrino',
    achado: 'Metabólico',
    ref: '67.85',
    campos: [
      { id: 'glicemia', tipo: 'num', faixa: [20, 600], rotulo: 'Qual é a glicemia de jejum?', placeholder: 'ex.: 92', unidade: 'mg/dl', ref: '67.85(d)–(e)', ajuda: 'Abaixo de 50 ou acima de 140 mg/dl, confirmada em 2 dosagens, torna não apto.' },
      { id: 'glicConfirmada', tipo: 'sn', rotulo: 'O valor alterado foi confirmado em 2 dosagens, em dias diferentes?', ref: '67.85(d)', se: (v) => { const g = num(v, 'glicemia'); return g !== undefined && (g < 70 || g >= 115); } },
      { id: 'insulina', tipo: 'sn', rotulo: 'Tem diabetes em uso de insulina?', ref: '67.85(b)', sim: ['inapto', 'Diabetes insulinodependente.'] },
      { id: 'adoOral', tipo: 'sn', rotulo: 'Usa antidiabético oral?', ref: '67.85(f)' },
      { id: 'adoDias', tipo: 'num', faixa: [0, 3650], rotulo: 'Há quantos dias a glicemia se mantém entre 70 e 139 mg/dl com o remédio?', placeholder: 'ex.: 60', unidade: 'dias', ref: '67.85(f)', se: (v) => S(v, 'adoOral') },
      { id: 'diabetesDieta', tipo: 'sn', rotulo: 'Tem diabetes controlado só com dieta?', ref: '67.85(c)', se: (v) => !S(v, 'insulina') && !S(v, 'adoOral'), sim: ['julgamento', 'Diabetes controlado só com dieta: apto a critério do examinador.'] },
      { id: 'hipoReativa', tipo: 'sn', rotulo: 'Tem hipoglicemia reativa ou de difícil controle?', ref: '67.85(g)', sim: ['inapto', 'Hipoglicemia reativa ou de difícil controle.'] },
      { id: 'dislipidemia', tipo: 'sn', rotulo: 'Tem dislipidemia severa?', ref: '67.85(a)', sim: ['julgamento', 'Dislipidemia severa: não apto se, a critério do examinador, puder afetar o voo.'] },
      { id: 'endocrino', tipo: 'sn', rotulo: 'Tem hiper ou hipofunção endócrina significativa, ou alteração por hormônio de reposição?', ref: '67.85(a)', sim: ['julgamento', 'Alteração endócrina: não apto se, a critério do examinador, puder afetar o voo.'] },
    ],
  },
  {
    id: 'cardio',
    nome: 'Cardiovascular',
    achado: 'Cardiovascular',
    ref: '67.79',
    campos: [
      { id: 'angina', tipo: 'sn', rotulo: 'Tem ou já teve angina?', ref: '67.79(a)(1)', sim: ['inapto', 'Angina.'] },
      { id: 'iam', tipo: 'sn', rotulo: 'Já teve infarto do miocárdio?', ref: '67.79(a)(10)' },
      { id: 'iamMeses', tipo: 'num', faixa: [0, 600], rotulo: 'Há quantos meses foi o infarto?', placeholder: 'ex.: 14', unidade: 'meses', ref: '67.79(b)(1)', se: (v) => S(v, 'iam') },
      { id: 'iamExames', tipo: 'sn', rotulo: 'Holter, cintilografia, eco-Doppler, lipidograma, cineangiocoronariografia e parecer psiquiátrico foram satisfatórios?', ref: '67.79(b)(1)', se: (v) => S(v, 'iam') },
      { id: 'revasc', tipo: 'sn', rotulo: 'Fez revascularização ou angioplastia?', ref: '67.79(a)(3)' },
      { id: 'revascDias', tipo: 'num', faixa: [0, 20000], rotulo: 'Há quantos dias foi a revascularização ou a angioplastia?', placeholder: 'ex.: 200', unidade: 'dias', ref: '67.79(b)(2)', se: (v) => S(v, 'revasc') },
      { id: 'revascExames', tipo: 'sn', rotulo: 'Holter, cintilografia, lipidograma e cineangiocoronariografia foram satisfatórios?', ref: '67.79(b)(2)', se: (v) => S(v, 'revasc') },
      { id: 'cirurgiaArterial', tipo: 'sn', rotulo: 'Teve cirurgia cardíaca ou arterial, prótese ou outra condição que exigiu esse tratamento?', ref: '67.79(a)(3)', se: (v) => !S(v, 'revasc'), sim: ['inapto', 'Doença que exigiu cirurgia cardíaca ou arterial, ou prótese.'] },
      { id: 'marcapasso', tipo: 'sn', rotulo: 'Usa marcapasso?', ref: '67.79(a)(3)', sim: ['inapto', 'Marcapasso.'] },
      { id: 'congenita', tipo: 'sn', rotulo: 'Tem cardiopatia congênita?', ref: '67.79(a)(4)' },
      { id: 'congenitaCurada', tipo: 'sn', rotulo: 'A cardiopatia congênita teve cura cirúrgica indubitável?', ref: '67.79(a)(4)', se: (v) => S(v, 'congenita') },
      { id: 'valvar', tipo: 'sn', rotulo: 'Tem sopro significativo ou doença de válvula?', ref: '67.79(a)(5)', sim: ['inapto', 'Sopro cardíaco significativo ou doença valvar.'] },
      { id: 'trocaValvar', tipo: 'sn', rotulo: 'Fez troca de válvula ou transplante de coração?', ref: '67.79(a)(11)', sim: ['inapto', 'Troca de válvula ou transplante cardíaco.'] },
      { id: 'pericardite', tipo: 'sn', rotulo: 'Tem pericardite ou miocardiopatia?', ref: '67.79(a)(6)', sim: ['inapto', 'Pericardite ou miocardiopatia.'] },
      { id: 'arritmia', tipo: 'sn', rotulo: 'Tem arritmia ou bloqueio de condução significativo?', ref: '67.79(a)(7) e (g)' },
      { id: 'arritmiaInvestigada', tipo: 'sn', rotulo: 'A investigação mostrou baixa probabilidade de afetar o voo?', ref: '67.79(g)', se: (v) => S(v, 'arritmia') },
      { id: 'preExc', tipo: 'sn', rotulo: 'Tem pré-excitação ventricular no eletrocardiograma?', ref: '67.79(a)(12)' },
      { id: 'ablacaoMeses', tipo: 'num', faixa: [0, 600], rotulo: 'Há quantos meses fez a ablação do feixe anômalo? (vazio se não fez)', placeholder: 'ex.: 4', unidade: 'meses', ref: '67.79(a)(12)', se: (v) => S(v, 'preExc') },
      { id: 'reestudo', tipo: 'sn', rotulo: 'O reestudo depois da ablação não mostrou conexão anômala?', ref: '67.79(a)(12)', se: (v) => S(v, 'preExc') && num(v, 'ablacaoMeses') !== undefined },
      { id: 'prolapso', tipo: 'sn', rotulo: 'Tem prolapso da válvula mitral?', ref: '67.79(a)(13)' },
      { id: 'prolapsoOk', tipo: 'sn', rotulo: 'O prolapso é assintomático, sem arritmia nem doença associada, com ergometria, Holter e eco satisfatórios?', ref: '67.79(a)(13)', se: (v) => S(v, 'prolapso') },
      { id: 'vascular', tipo: 'sn', rotulo: 'Tem doença vascular obstrutiva, aneurisma ou cirurgia para essas condições?', ref: '67.79(a)(9)', sim: ['inapto', 'Doença vascular obstrutiva ou aneurisma.'] },
    ],
  },
  {
    id: 'pneumo',
    nome: 'Respiratório',
    achado: 'Respiratório',
    ref: '67.81',
    campos: [
      { id: 'asma', tipo: 'sn', rotulo: 'Tem asma?', ref: '67.81(a)(3)', sim: ['inapto', 'Asma.'] },
      { id: 'pulmaoAgudo', tipo: 'sn', rotulo: 'Tem doença aguda ou ativa de pulmão, mediastino ou pleura?', ref: '67.81(a)(1)', sim: ['inapto', 'Doença broncopulmonar aguda ou ativa: não apto enquanto durar, a critério do examinador.'] },
      { id: 'pulmaoCronico', tipo: 'sn', rotulo: 'Tem doença pulmonar crônica?', ref: '67.81(a)(2)', sim: ['julgamento', 'Doença pulmonar crônica: não apto, salvo investigação que mostre baixa probabilidade de afetar o voo.'] },
      { id: 'tb', tipo: 'sn', rotulo: 'Tem tuberculose ou infecção pulmonar ativa?', ref: '67.81(a)(4)', ajuda: 'Lesões inativas ou cicatrizadas permitem a aptidão.', sim: ['inapto', 'Tuberculose ou infecção pulmonar ativa.'] },
      { id: 'hp', tipo: 'sn', rotulo: 'Tem hipertensão pulmonar?', ref: '67.81(a)(5)', sim: ['inapto', 'Hipertensão pulmonar.'] },
      { id: 'pneumotorax', tipo: 'sn', rotulo: 'Tem pneumotórax não resolvido ou doença bolhosa do pulmão?', ref: '67.81(a)(6)', sim: ['inapto', 'Pneumotórax não resolvido ou doença bolhosa, a critério do examinador.'] },
      { id: 'neoTorax', tipo: 'sn', rotulo: 'Tem neoplasia no tórax?', ref: '67.81(a)(7)', sim: ['inapto', 'Neoplasia torácica.'] },
    ],
  },
  {
    id: 'digestivo',
    nome: 'Digestivo',
    achado: 'Digestivo',
    ref: '67.83',
    campos: [
      { id: 'giDeficiencia', tipo: 'sn', rotulo: 'Tem deficiência anatômica ou funcional significativa do trato digestivo ou dos anexos?', ref: '67.83(a)(1)', sim: ['inapto', 'Deficiência anatomofuncional significativa do trato digestivo.'] },
      { id: 'hernia', tipo: 'sn', rotulo: 'Tem hérnia com sintomas que possam afetar o voo?', ref: '67.83(a)(2)', sim: ['julgamento', 'Hérnia sintomática: não apto se, a critério do examinador, puder afetar o voo.'] },
      { id: 'giSequela', tipo: 'sn', rotulo: 'Tem sequela de doença ou cirurgia digestiva, como estenose ou compressão?', ref: '67.83(a)(3)', sim: ['inapto', 'Sequela digestiva que pode incapacitar, como estenose ou compressão.'] },
      { id: 'giCirurgia', tipo: 'sn', rotulo: 'Fez cirurgia importante nas vias biliares ou digestivas, com remoção ou desvio de fluxo?', ref: '67.83(b)', sim: ['julgamento', 'Cirurgia digestiva importante: não apto, salvo se, a critério, não houver probabilidade de incapacitação.'] },
    ],
  },
  {
    id: 'renal',
    nome: 'Urinário e renal',
    achado: 'Renal',
    ref: '67.89',
    campos: [
      { id: 'rimDoenca', tipo: 'sn', rotulo: 'Tem doença renal ou geniturinária?', ref: '67.89(a)', ajuda: 'A investigação inclui exame de urina.', sim: ['julgamento', 'Doença renal ou geniturinária: não apto, salvo investigação e juízo favorável da ANAC.'] },
      { id: 'rimCalculo', tipo: 'sn', rotulo: 'Tem cálculo, sequela ou cirurgia de rins e vias urinárias?', ref: '67.89(b)', sim: ['julgamento', 'Urolitíase, sequela ou cirurgia urinária: não apto, salvo investigação e juízo favorável da ANAC.'] },
      { id: 'nefrectomia', tipo: 'sn', rotulo: 'Retirou um rim?', ref: '67.89(c)' },
      { id: 'nefrectomiaOk', tipo: 'sn', rotulo: 'O rim que ficou compensa bem a função?', ref: '67.89(c)', se: (v) => S(v, 'nefrectomia') },
      { id: 'transplanteRim', tipo: 'sn', rotulo: 'Tem rim transplantado?', ref: '67.89(d)', sim: ['julgamento', 'Rim transplantado: apto em consulta com a ANAC, sem rejeição ou complicações e com boa função.'] },
    ],
  },
  {
    id: 'hemato',
    nome: 'Hematológico',
    achado: 'Hematológico',
    ref: '67.87',
    campos: [
      { id: 'cumarinico', tipo: 'sn', rotulo: 'Usa anticoagulante oral cumarínico?', ref: '67.87(c)', sim: ['inapto', 'Anticoagulação oral cumarínica.'] },
      { id: 'coagulacao', tipo: 'sn', rotulo: 'Tem trombofilia (hipercoagulabilidade) ou doença hemorrágica?', ref: '67.87(c)', sim: ['inapto', 'Hipercoagulabilidade ou transtorno hemorrágico.'] },
      { id: 'anemia', tipo: 'sn', rotulo: 'Tem anemia?', ref: '67.87(a)', sim: ['julgamento', 'Anemia: não apto, salvo investigação e juízo da ANAC de baixa probabilidade de afetar o voo.'] },
      { id: 'mieloLinfo', tipo: 'sn', rotulo: 'Tem doença mieloproliferativa, mielofibrose, linfoma ou aumento do baço?', ref: '67.87(a)', sim: ['julgamento', 'Doença mieloproliferativa, tumor linfático ou esplenomegalia: não apto, salvo investigação e juízo da ANAC.'] },
      { id: 'falciforme', tipo: 'sn', rotulo: 'Tem traço falciforme ou outro traço de hemoglobinopatia?', ref: '67.87(b)', sim: ['julgamento', 'Traço de hemoglobinopatia: apto a critério da ANAC, salvo risco de crise hemolítica em voo.'] },
    ],
  },
  {
    id: 'neuro',
    nome: 'Neurológico',
    achado: 'Neurológico',
    ref: '67.77',
    campos: [
      { id: 'epilepsia', tipo: 'sn', rotulo: 'Tem ou já teve epilepsia?', ref: '67.77(a)(4)', sim: ['inapto', 'Epilepsia.'] },
      { id: 'eeg', tipo: 'sn', rotulo: 'O eletroencefalograma tem grafoelementos epileptiformes?', ref: '67.77(a)(5)(i)', ajuda: 'O EEG é obrigatório no exame inicial.', sim: ['inapto', 'EEG com grafoelementos epileptiformes.'] },
      { id: 'eegLento', tipo: 'sn', rotulo: 'O eletroencefalograma tem lentificações focais ou generalizadas?', ref: '67.77(a)(5)(ii)' },
      { id: 'rmNormal', tipo: 'sn', rotulo: 'A ressonância do crânio não mostrou lesão estrutural significativa?', ref: '67.77(a)(5)(ii)', se: (v) => S(v, 'eegLento') },
      { id: 'consciencia', tipo: 'sn', rotulo: 'Teve perda de consciência ou de função neurológica que se repetiu, sem explicação?', ref: '67.77(a)(6) e (13)', sim: ['inapto', 'Perda recorrente de consciência ou de função neurológica sem explicação satisfatória.'] },
      { id: 'perdaConsc', tipo: 'sn', rotulo: 'Teve um episódio único de perda de consciência?', ref: '67.77(a)(13)', se: (v) => !S(v, 'consciencia'), sim: ['julgamento', 'Episódio único de perda de consciência: julgamento conjunto com a ANAC.'] },
      { id: 'avc', tipo: 'sn', rotulo: 'Teve AVC, insuficiência vascular cerebral, aneurisma ou hemorragia cerebral?', ref: '67.77(a)(7)–(10)', sim: ['inapto', 'Infarto cerebral, insuficiência vascular cerebral, aneurisma ou hemorragia.'] },
      { id: 'hemiparesia', tipo: 'sn', rotulo: 'Tem hemiplegia ou hemiparesia?', ref: '67.77(a)(1)', sim: ['inapto', 'Hemiplegia ou hemiparesia.'] },
      { id: 'enxaqueca', tipo: 'sn', rotulo: 'Tem enxaqueca com sintomas visuais ou neurológicos focais?', ref: '67.77(a)(11)', sim: ['inapto', 'Enxaqueca com fenômenos oculares e neurológicos focais.'] },
      { id: 'neuroDoenca', tipo: 'sn', rotulo: 'Tem doença do sistema nervoso, ou vasculite autoimune do sistema nervoso, que interfira na função a bordo?', ref: '67.77(a)(2)–(3)', sim: ['inapto', 'Doença do sistema nervoso que interfere na função a bordo.'] },
      { id: 'neoCerebral', tipo: 'sn', rotulo: 'Tem neoplasia cerebral?', ref: '67.77(a)(12)', sim: ['inapto', 'Neoplasia cerebral.'] },
      { id: 'coordenacao', tipo: 'sn', rotulo: 'Tem perda de equilíbrio, sensibilidade, força ou coordenação?', ref: '67.77(a)(14)', sim: ['inapto', 'Transtorno com perda de equilíbrio, sensibilidade, força ou coordenação.'] },
      { id: 'tce', tipo: 'sn', rotulo: 'Teve cirurgia cerebral ou traumatismo craniano com sequela?', ref: '67.77(a)(15)', sim: ['inapto', 'Cirurgia cerebral ou traumatismo craniano com sequela que afeta a função.'] },
    ],
  },
  {
    id: 'mental',
    nome: 'Mental e comportamental',
    achado: 'Mental',
    ref: '67.75',
    campos: [
      { id: 'transtorno', tipo: 'sn', rotulo: 'Tem história ou diagnóstico de transtorno mental: psicose, transtorno do humor, ansiedade, personalidade, alimentar ou do desenvolvimento?', ref: '67.75(b)', ajuda: 'A depressão em uso de antidepressivo tem regra própria na pergunta seguinte.', sim: ['inapto', 'Transtorno mental listado no RBAC 67.75(b).'] },
      { id: 'substancia', tipo: 'sn', rotulo: 'Tem transtorno por uso de álcool ou de outra substância psicoativa?', ref: '67.75(b)', sim: ['inapto', 'Transtorno por uso de substância psicoativa, inclusive álcool.'] },
      { id: 'antidep', tipo: 'sn', rotulo: 'Faz tratamento de depressão com antidepressivo?', ref: '67.75(c)' },
      { id: 'parecerPsiq', tipo: 'sn', rotulo: 'O parecer psiquiátrico, com acesso ao caso, foi favorável?', ref: '67.75(c)', se: (v) => S(v, 'antidep') },
      { id: 'avalPsico', tipo: 'sn', rotulo: 'A avaliação psicológica (personalidade, atenção, memória e raciocínio) foi satisfatória?', ref: '67.75(e)–(h)', ajuda: 'Exigida no exame inicial, após acidente ou incidente grave e a cada 5 anos.', nao: ['inapto', 'Avaliação psicológica insatisfatória.'] },
    ],
  },
  {
    id: 'obst',
    nome: 'Gineco-obstétrico',
    achado: 'Obstétrico',
    ref: '67.93',
    campos: [
      { id: 'gestacao', tipo: 'sn', rotulo: 'Há gravidez confirmada?', ref: '67.93(a)', se: (v) => v.sexo === 'f', ajuda: 'A gestante deve informar a gravidez e parar de voar até a suspensão do CMA.', sim: ['inapto', 'Gravidez confirmada: não apta enquanto durar.'] },
      { id: 'posParto', tipo: 'sn', rotulo: 'Está voltando de licença pós-parto ou do fim de uma gravidez?', ref: '67.93(c)', se: (v) => v.sexo === 'f' && !S(v, 'gestacao'), sim: ['julgamento', 'Pós-parto ou fim da gravidez: apta a critério, após novo exame de revalidação.'] },
    ],
  },
  {
    id: 'osteo',
    nome: 'Osteomuscular',
    achado: 'Osteomuscular',
    ref: '67.95',
    campos: [
      { id: 'osteoAtiva', tipo: 'sn', rotulo: 'Tem doença ativa de ossos, articulações, músculos ou tendões?', ref: '67.95(a)(1)', sim: ['inapto', 'Doença osteomuscular ativa.'] },
      { id: 'osteoSequela', tipo: 'sn', rotulo: 'Tem sequela funcional de doença congênita ou adquirida?', ref: '67.95(a)(2)', sim: ['inapto', 'Sequela funcional osteomuscular.'] },
      { id: 'coluna', tipo: 'sn', rotulo: 'Tem escoliose, cifose ou lordose com sintomas que possam afetar o voo?', ref: '67.95(a)(3)', sim: ['inapto', 'Desvio da coluna sintomático.'] },
      { id: 'discal', tipo: 'sn', rotulo: 'Tem hérnia de disco com sintomas neurológicos?', ref: '67.95(a)(4)', sim: ['inapto', 'Hérnia de disco com sintomas neurológicos.'] },
      { id: 'protese', tipo: 'sn', rotulo: 'Tem amputação, prótese, órtese ou anomalia com deficiência funcional?', ref: '67.95(b)', sim: ['julgamento', 'Amputação, prótese, órtese ou deficiência funcional: não apto, salvo investigação e juízo da ANAC.'] },
    ],
  },
  {
    id: 'visao',
    nome: 'Oftalmológico',
    achado: 'Oftalmológico',
    ref: '67.99',
    campos: [
      { id: 'avOD', tipo: 'num', faixa: [10, 400], rotulo: 'Qual é a acuidade de longe do olho direito?', placeholder: '20/__ (ex.: 25)', unidade: '20/x', ref: '67.99(c)(1)', ajuda: 'Mínimo 20/30 em cada olho, com ou sem correção.' },
      { id: 'avOE', tipo: 'num', faixa: [10, 400], rotulo: 'Qual é a acuidade de longe do olho esquerdo?', placeholder: '20/__ (ex.: 25)', unidade: '20/x', ref: '67.99(c)(1)' },
      { id: 'avBin', tipo: 'num', faixa: [10, 400], rotulo: 'Qual é a acuidade binocular?', placeholder: '20/__ (ex.: 20)', unidade: '20/x', ref: '67.99(c)(1)', ajuda: 'Mínimo 20/20 com os dois olhos.' },
      { id: 'correcao', tipo: 'sn', rotulo: 'Precisa de óculos ou lentes para atingir esses valores?', ref: '67.99(c)(4)' },
      { id: 'umPar', tipo: 'sn', rotulo: 'Um único par de óculos serve para perto e para longe?', ref: '67.99(c)(3)', se: (v) => S(v, 'correcao'), nao: ['inapto', 'Um único par de óculos precisa servir para perto e para longe.'] },
      { id: 'lenteMulti', tipo: 'sn', rotulo: 'Usa lente de contato multifocal ou colorida?', ref: '67.99(g)', se: (v) => S(v, 'correcao'), sim: ['inapto', 'Só são aceitas lentes de contato monofocais e sem cor.'] },
      { id: 'lenteOculos', tipo: 'sn', rotulo: 'Usa lente de contato e óculos ao mesmo tempo no mesmo olho?', ref: '67.99(i)', se: (v) => S(v, 'correcao'), sim: ['inapto', 'Não é permitido usar lente e óculos ao mesmo tempo no mesmo olho.'] },
      { id: 'semCorrecao200', tipo: 'sn', rotulo: 'Sem correção, algum olho fica abaixo de 20/200?', ref: '67.99(j)', se: (v) => S(v, 'correcao'), sim: ['julgamento', 'Acuidade sem correção abaixo de 20/200: relatório oftalmológico completo no inicial e a cada 5 anos.'] },
      { id: 'perto', tipo: 'sn', rotulo: 'Lê J1 a 30–50 cm e J6 a 100 cm?', ref: '67.99(c)(2)', nao: ['inapto', 'Não lê J1 a 30–50 cm e J6 a 100 cm.'] },
      { id: 'cores', tipo: 'sn', rotulo: 'Reconhece as cores nas tabelas ou as cores básicas da aviação?', ref: '67.99(c)(5)', nao: ['inapto', 'Não reconhece as cores exigidas.'] },
      { id: 'hiperforia', tipo: 'num', faixa: [0, 30], rotulo: 'Qual é a hiperforia?', placeholder: 'ex.: 0,5', unidade: 'DP', ref: '67.99(c)(7)', ajuda: 'Máximo 1 dioptria prismática.' },
      { id: 'exoforia', tipo: 'num', faixa: [0, 40], rotulo: 'Qual é a exoforia?', placeholder: 'ex.: 2', unidade: 'DP', ref: '67.99(c)(7)', ajuda: 'Máximo 5 dioptrias prismáticas.' },
      { id: 'esoforia', tipo: 'num', faixa: [0, 40], rotulo: 'Qual é a esoforia (endoforia)?', placeholder: 'ex.: 4', unidade: 'DP', ref: '67.99(c)(7)', ajuda: 'Máximo 10 dioptrias prismáticas.' },
      { id: 'heterotropia', tipo: 'sn', rotulo: 'Tem heterotropia (estrabismo manifesto)?', ref: '67.99(c)(8)', sim: ['inapto', 'Heterotropia.'] },
      { id: 'monocular', tipo: 'sn', rotulo: 'Tem visão monocular?', ref: '67.99(c)(6)' },
      { id: 'olhoNormal', tipo: 'sn', rotulo: 'Campo visual, pressão ocular, fundo de olho e córneas estão normais?', ref: '67.99(c)(9)', nao: ['inapto', 'Campo visual, pressão ocular, fundo de olho ou córneas alterados.'] },
      { id: 'refrativaMeses', tipo: 'num', faixa: [0, 600], rotulo: 'Há quantos meses fez cirurgia refrativa? (vazio se não fez)', placeholder: 'ex.: 9', unidade: 'meses', ref: '67.99(b)' },
    ],
  },
  {
    id: 'audicao',
    nome: 'Auditivo',
    achado: 'Auditivo',
    ref: '67.101',
    campos: [
      { id: 'od500', tipo: 'num', faixa: [-10, 120], rotulo: 'Orelha direita: qual é o limiar em 500 Hz?', placeholder: 'ex.: 15', unidade: 'dB', ref: '67.101(a)', ajuda: 'Até 35 dB em 500, 1.000 e 2.000 Hz e até 50 dB em 3.000 Hz, por orelha.' },
      { id: 'od1000', tipo: 'num', faixa: [-10, 120], rotulo: 'Orelha direita: qual é o limiar em 1.000 Hz?', placeholder: 'ex.: 15', unidade: 'dB', ref: '67.101(a)' },
      { id: 'od2000', tipo: 'num', faixa: [-10, 120], rotulo: 'Orelha direita: qual é o limiar em 2.000 Hz?', placeholder: 'ex.: 20', unidade: 'dB', ref: '67.101(a)' },
      { id: 'od3000', tipo: 'num', faixa: [-10, 120], rotulo: 'Orelha direita: qual é o limiar em 3.000 Hz?', placeholder: 'ex.: 25', unidade: 'dB', ref: '67.101(a)' },
      { id: 'oe500', tipo: 'num', faixa: [-10, 120], rotulo: 'Orelha esquerda: qual é o limiar em 500 Hz?', placeholder: 'ex.: 15', unidade: 'dB', ref: '67.101(a)' },
      { id: 'oe1000', tipo: 'num', faixa: [-10, 120], rotulo: 'Orelha esquerda: qual é o limiar em 1.000 Hz?', placeholder: 'ex.: 15', unidade: 'dB', ref: '67.101(a)' },
      { id: 'oe2000', tipo: 'num', faixa: [-10, 120], rotulo: 'Orelha esquerda: qual é o limiar em 2.000 Hz?', placeholder: 'ex.: 20', unidade: 'dB', ref: '67.101(a)' },
      { id: 'oe3000', tipo: 'num', faixa: [-10, 120], rotulo: 'Orelha esquerda: qual é o limiar em 3.000 Hz?', placeholder: 'ex.: 25', unidade: 'dB', ref: '67.101(a)' },
      { id: 'fala', tipo: 'sn', rotulo: 'Discrimina a fala em ruído que simula a cabine, ou ouve voz de 85 a 95 dB a 2 metros, de costas?', ref: '67.101(b)', ajuda: 'Só conta quando a audiometria fica fora do limite.', se: (v) => audiometriaFalha(v) },
    ],
  },
  {
    id: 'orl',
    nome: 'Otorrinolaringológico',
    achado: 'ORL',
    ref: '67.97',
    campos: [
      { id: 'tuba', tipo: 'sn', rotulo: 'Tem obstrução permanente da tuba auditiva?', ref: '67.97(c)', sim: ['inapto', 'Obstrução permanente da tuba auditiva.'] },
      { id: 'vestibular', tipo: 'sn', rotulo: 'Tem distúrbio vestibular permanente?', ref: '67.97(d)', sim: ['inapto', 'Transtorno permanente do aparelho vestibular.'] },
      { id: 'vestibularPassageiro', tipo: 'sn', rotulo: 'Tem distúrbio vestibular passageiro neste momento?', ref: '67.97(d)', se: (v) => !S(v, 'vestibular'), sim: ['inapto', 'Distúrbio vestibular passageiro: não apto até se restabelecer.'] },
      { id: 'timpano', tipo: 'sn', rotulo: 'Tem doença da membrana timpânica que afete o voo?', ref: '67.97(b)', ajuda: 'Perfuração simples e seca não impede, se a audição cumprir o 67.101.', sim: ['julgamento', 'Doença da membrana timpânica: julgamento a critério da ANAC.'] },
      { id: 'viasAereas', tipo: 'sn', rotulo: 'Tem doença grave da boca, das vias aéreas superiores ou dos seios da face?', ref: '67.97(e)', sim: ['inapto', 'Afecção grave da boca, das vias aéreas superiores ou dos seios da face.'] },
      { id: 'fonacao', tipo: 'sn', rotulo: 'Tem disartria, gagueira ou outro defeito que dificulte a comunicação oral?', ref: '67.97(e)', sim: ['inapto', 'Defeito que dificulta a comunicação oral.'] },
      { id: 'nariz', tipo: 'sn', rotulo: 'As duas passagens nasais estão livres?', ref: '67.97(e)', nao: ['inapto', 'As duas passagens nasais precisam estar livres.'] },
    ],
  },
  {
    id: 'odonto',
    nome: 'Odontológico',
    achado: 'Odontológico',
    ref: '67.103',
    campos: [
      { id: 'dentes', tipo: 'sn', rotulo: 'O número de dentes permite mastigar sem sintomas, e a prótese, se houver, não prejudica a fala?', ref: '67.103(a)(1)', nao: ['inapto', 'Dentição insuficiente para mastigar sem sintomas.'] },
      { id: 'carie', tipo: 'sn', rotulo: 'Tem cárie profunda?', ref: '67.103(a)(2)', sim: ['inapto', 'Cárie profunda.'] },
      { id: 'periodonto', tipo: 'sn', rotulo: 'Tem doença periodontal visível no exame ou na radiografia?', ref: '67.103(a)(3)', sim: ['inapto', 'Doença periodontal.'] },
      { id: 'periapical', tipo: 'sn', rotulo: 'Tem lesão periapical visível no exame ou na radiografia?', ref: '67.103(a)(4)', sim: ['inapto', 'Afecção periapical.'] },
    ],
  },
];

// Campos numéricos que precisam estar preenchidos para fechar o julgamento.
const OBRIGATORIOS = ['pas', 'pad', 'peso', 'altura', 'glicemia', 'avOD', 'avOE', 'avBin', 'od500', 'od1000', 'od2000', 'od3000', 'oe500', 'oe1000', 'oe2000', 'oe3000'];

export interface Achado { sistema: string; nivel: Nivel; texto: string; ref: string; campos: string[] }
export type Veredito = 'apto' | 'restricao' | 'inapto' | 'incompleto' | 'confirmar';

export const NOME_VEREDITO: Record<Veredito, string> = {
  apto: 'Apto',
  restricao: 'Apto com restrição',
  inapto: 'Não apto',
  incompleto: 'Avaliação incompleta',
  confirmar: 'Confirmar na referência',
};

export interface Resultado {
  veredito: Veredito;
  achados: Achado[];
  restricoes: string[];
  pendentes: string[];
  validade?: { meses: number; regra: string; data: string };
  comentario: string;
}

export function num(v: Valores, id: string): number | undefined {
  const s = v[id];
  if (typeof s !== 'string' || !s.trim()) return undefined;
  const n = Number(s.replace(',', '.'));
  return Number.isFinite(n) ? n : undefined;
}

function orelhaOk(v: Valores, lado: 'od' | 'oe'): boolean | undefined {
  const f = [num(v, `${lado}500`), num(v, `${lado}1000`), num(v, `${lado}2000`), num(v, `${lado}3000`)];
  if (f.some((x) => x === undefined)) return undefined;
  return f[0]! <= 35 && f[1]! <= 35 && f[2]! <= 35 && f[3]! <= 50;
}

function audiometriaFalha(v: Valores) {
  return orelhaOk(v, 'od') === false || orelhaOk(v, 'oe') === false;
}

// Pergunta visível no momento (as condicionais dependem das respostas anteriores).
export function visivel(c: Campo, v: Valores, ctx: Contexto) {
  return !c.se || c.se(v, ctx);
}

function rotuloCampo(id: string) {
  for (const s of SISTEMAS) for (const c of s.campos) if (c.id === id) return c.rotulo.replace(/^Qual é (a|o) /, '').replace(/\?$/, '');
  return id;
}

function somarMeses(meses: number) {
  const d = new Date();
  d.setMonth(d.getMonth() + meses);
  return d.toLocaleDateString('pt-BR');
}

export function avaliar(classe: ClasseCMA, funcao: string, idade: number | undefined, publico: boolean, v: Valores, ctx: Contexto = { inicial: false }): Resultado {
  const a: Achado[] = [];
  const restricoes: string[] = [];
  let validadeMax: number | undefined;
  const add = (sistema: string, nivel: Nivel, texto: string, ref: string, ...campos: string[]) => a.push({ sistema, nivel, texto, ref, campos });
  const sim = (id: string) => v[id] === true;
  const nao = (id: string) => v[id] === false;

  // Regras simples: a própria pergunta define o resultado do "Sim" ou do "Não".
  for (const s of SISTEMAS)
    for (const c of s.campos) {
      if (c.tipo !== 'sn' || !visivel(c, v, ctx)) continue;
      if (c.sim && sim(c.id)) add(s.achado, c.sim[0], c.sim[1], c.ref, c.id);
      if (c.nao && nao(c.id)) add(s.achado, c.nao[0], c.nao[1], c.ref, c.id);
    }

  // Pressão arterial
  const pas = num(v, 'pas');
  const pad = num(v, 'pad');
  if (pas !== undefined && pad !== undefined) {
    if (pas > 140 || pad > 90) add('Cardiovascular', 'inapto', `PA ${pas}×${pad} mmHg, acima de 140×90 (exige pressão mantida: repita as medidas).`, '67.79(a)(8)', 'pas', 'pad');
    else add('Cardiovascular', 'ok', `PA ${pas}×${pad} mmHg, dentro do limite de 140×90.`, '67.79(a)(8)', 'pas', 'pad');
  }

  // IMC e cintura
  const peso = num(v, 'peso');
  const alt = num(v, 'altura');
  const imc = peso && alt ? peso / (alt / 100) ** 2 : undefined;
  if (imc !== undefined) {
    const t = `IMC ${imc.toFixed(1).replace('.', ',')} kg/m²`;
    if (imc >= 40) add('Metabólico', 'inapto', `${t}: obesidade com IMC de 40 ou mais.`, '67.85(a)', 'peso', 'altura');
    else add('Metabólico', 'ok', `${t}, abaixo de 40.`, '67.85(a)', 'peso', 'altura');
  }
  const cintura = num(v, 'cintura');
  const limCintura = v.sexo === 'f' ? 88 : 102;

  // Glicemia e diabetes
  const gli = num(v, 'glicemia');
  if (gli !== undefined) {
    if (gli < 50 || gli > 140) {
      if (sim('glicConfirmada')) add('Metabólico', 'inapto', `Glicemia ${gli} mg/dl, fora de 50–140, confirmada em 2 dosagens.`, '67.85(d)', 'glicemia', 'glicConfirmada');
      else add('Metabólico', 'julgamento', `Glicemia ${gli} mg/dl, fora de 50–140: repetir em 2 dosagens, em dias diferentes, antes de concluir.`, '67.85(d)', 'glicemia', 'glicConfirmada');
    } else if (gli < 70 || gli >= 115) add('Metabólico', 'julgamento', `Glicemia ${gli} mg/dl, na faixa 50–69 ou 115–139: aceitável a critério do examinador, confirmada em 2 dosagens.`, '67.85(e)', 'glicemia', 'glicConfirmada');
    else add('Metabólico', 'ok', `Glicemia ${gli} mg/dl, normal.`, '67.85', 'glicemia');
  }
  if (sim('adoOral')) {
    const dias = num(v, 'adoDias');
    if (dias !== undefined && dias >= 60) {
      add('Metabólico', 'restricao', `Antidiabético oral com ${dias} dias de glicemia entre 70 e 139 mg/dl: apto a critério, com validade de até 6 meses.`, '67.85(f)', 'adoOral', 'adoDias');
      validadeMax = Math.min(validadeMax ?? 99, 6);
    } else add('Metabólico', 'inapto', 'Antidiabético oral sem 60 dias de observação com glicemia entre 70 e 139 mg/dl.', '67.85(f)', 'adoOral', 'adoDias');
  }

  // Infarto e revascularização
  const semFalhaCorpo = () => {
    const falhas: string[] = [];
    if (imc !== undefined && imc >= 30) falhas.push(`IMC de ${imc.toFixed(1).replace('.', ',')}, exige menos de 30`);
    if (cintura !== undefined && cintura > limCintura) falhas.push(`cintura de ${cintura} cm, exige até ${limCintura}`);
    return falhas;
  };
  if (sim('iam')) {
    const m = num(v, 'iamMeses');
    if (m === undefined || m < 12) add('Cardiovascular', 'inapto', 'Infarto há menos de 1 ano (ou tempo não informado).', '67.79(b)(1)', 'iam', 'iamMeses');
    else if (!sim('iamExames')) add('Cardiovascular', 'julgamento', `Infarto há ${m} meses: falta confirmar Holter, cintilografia, eco-Doppler, lipidograma, cineangiocoronariografia e parecer psiquiátrico.`, '67.79(b)(1)', 'iam', 'iamMeses', 'iamExames');
    else {
      const f = semFalhaCorpo();
      if (f.length) add('Cardiovascular', 'inapto', `Infarto há ${m} meses, mas ${f.join(' e ')}.`, '67.79(b)(1)', 'iam', 'iamExames', 'cintura', 'peso');
      else {
        add('Cardiovascular', 'restricao', `Infarto há ${m} meses (≥ 1 ano), com exames satisfatórios: apto com restrição, em consulta com a ANAC, validade de até 6 meses.${cintura === undefined ? ' Confirme a cintura.' : ''}`, '67.79(b)(1) e (c)', 'iam', 'iamMeses', 'iamExames');
        validadeMax = Math.min(validadeMax ?? 99, 6);
      }
    }
  }
  if (sim('revasc')) {
    const d = num(v, 'revascDias');
    if (d === undefined || d < 180) add('Cardiovascular', 'inapto', 'Revascularização ou angioplastia há menos de 180 dias (ou tempo não informado).', '67.79(b)(2)', 'revasc', 'revascDias');
    else if (!sim('revascExames')) add('Cardiovascular', 'julgamento', `Revascularização há ${d} dias: falta confirmar Holter, cintilografia, lipidograma e cineangiocoronariografia.`, '67.79(b)(2)', 'revasc', 'revascDias', 'revascExames');
    else {
      add('Cardiovascular', 'restricao', `Revascularização há ${d} dias (≥ 180), com exames satisfatórios: apto com restrição, em consulta com a ANAC, validade de até 6 meses.`, '67.79(b)(2) e (c)', 'revasc', 'revascDias', 'revascExames');
      validadeMax = Math.min(validadeMax ?? 99, 6);
    }
  }
  if (sim('congenita')) {
    if (sim('congenitaCurada')) add('Cardiovascular', 'ok', 'Cardiopatia congênita com cura cirúrgica indubitável.', '67.79(a)(4)', 'congenita', 'congenitaCurada');
    else add('Cardiovascular', 'inapto', 'Cardiopatia congênita sem cura cirúrgica indubitável.', '67.79(a)(4)', 'congenita', 'congenitaCurada');
  }
  if (sim('arritmia')) {
    if (sim('arritmiaInvestigada')) add('Cardiovascular', 'julgamento', 'Arritmia ou bloqueio com investigação favorável: apto a critério do examinador.', '67.79(g)', 'arritmia', 'arritmiaInvestigada');
    else add('Cardiovascular', 'inapto', 'Arritmia ou bloqueio sem investigação que mostre baixa probabilidade de afetar o voo.', '67.79(a)(7) e (g)', 'arritmia', 'arritmiaInvestigada');
  }
  if (sim('preExc')) {
    const m = num(v, 'ablacaoMeses');
    if (m !== undefined && m >= 3 && sim('reestudo')) add('Cardiovascular', 'ok', `Pré-excitação tratada por ablação há ${m} meses (≥ 3), sem conexão anômala no reestudo.`, '67.79(a)(12)', 'preExc', 'ablacaoMeses', 'reestudo');
    else add('Cardiovascular', 'inapto', 'Pré-excitação sem ablação há pelo menos 3 meses com reestudo normal.', '67.79(a)(12)', 'preExc', 'ablacaoMeses', 'reestudo');
  }
  if (sim('prolapso')) {
    if (sim('prolapsoOk')) add('Cardiovascular', 'ok', 'Prolapso mitral assintomático, sem arritmia, com exames satisfatórios.', '67.79(a)(13)', 'prolapso', 'prolapsoOk');
    else add('Cardiovascular', 'inapto', 'Prolapso mitral sem as condições de aceitação.', '67.79(a)(13)', 'prolapso', 'prolapsoOk');
  }

  // Renal, neurológico e mental com resposta condicional
  if (sim('nefrectomia')) {
    if (sim('nefrectomiaOk')) add('Renal', 'julgamento', 'Nefrectomia bem compensada pelo rim remanescente: apto a critério.', '67.89(c)', 'nefrectomia', 'nefrectomiaOk');
    else add('Renal', 'inapto', 'Nefrectomia sem compensação comprovada do rim remanescente.', '67.89(c)', 'nefrectomia', 'nefrectomiaOk');
  }
  if (sim('eegLento')) {
    if (sim('rmNormal')) add('Neurológico', 'julgamento', 'EEG com lentificações e ressonância sem lesão estrutural significativa: CMA pode ser emitido.', '67.77(a)(5)(ii)', 'eegLento', 'rmNormal');
    else add('Neurológico', 'inapto', 'EEG com lentificações sem ressonância normal do crânio.', '67.77(a)(5)(ii)', 'eegLento', 'rmNormal');
  }
  if (sim('antidep')) {
    if (sim('parecerPsiq')) add('Mental', 'julgamento', 'Antidepressivo com parecer psiquiátrico favorável: decisão do examinador.', '67.75(c)', 'antidep', 'parecerPsiq');
    else add('Mental', 'inapto', 'Antidepressivo sem parecer psiquiátrico favorável.', '67.75(c)', 'antidep', 'parecerPsiq');
  }

  // Oftalmológico
  const od = num(v, 'avOD');
  const oe = num(v, 'avOE');
  const bin = num(v, 'avBin');
  if (od !== undefined && oe !== undefined && bin !== undefined) {
    const falhas = [od > 30 && `OD 20/${od}`, oe > 30 && `OE 20/${oe}`, bin > 20 && `binocular 20/${bin}`].filter(Boolean);
    if (falhas.length) add('Oftalmológico', 'inapto', `Acuidade abaixo do exigido (${falhas.join(', ')}); mínimo 20/30 em cada olho e 20/20 binocular.`, '67.99(c)(1)', 'avOD', 'avOE', 'avBin');
    else add('Oftalmológico', 'ok', `Acuidade OD 20/${od}, OE 20/${oe}, binocular 20/${bin}.`, '67.99(c)(1)', 'avOD', 'avOE', 'avBin');
    if (!falhas.length && sim('correcao')) {
      restricoes.push('Uso obrigatório de correção óptica em voo, com óculos reserva a bordo.');
      add('Oftalmológico', 'restricao', 'Correção óptica obrigatória, anotada no CMA, com óculos reserva.', '67.99(c)(4)', 'correcao');
    }
  }
  const hip = num(v, 'hiperforia');
  const exo = num(v, 'exoforia');
  const eso = num(v, 'esoforia');
  if ((hip ?? 0) > 1 || (exo ?? 0) > 5 || (eso ?? 0) > 10) add('Oftalmológico', 'inapto', 'Foria acima do limite (hiperforia ≤ 1, exoforia ≤ 5, esoforia ≤ 10 DP).', '67.99(c)(7)', 'hiperforia', 'exoforia', 'esoforia');
  else if (hip !== undefined || exo !== undefined || eso !== undefined) add('Oftalmológico', 'ok', 'Forias dentro dos limites.', '67.99(c)(7)', 'hiperforia', 'exoforia', 'esoforia');
  if (sim('monocular')) {
    if (ctx.inicial) add('Oftalmológico', 'inapto', 'Visão monocular no exame inicial: exige visão de profundidade normal.', '67.99(c)(6)', 'monocular');
    else add('Oftalmológico', 'julgamento', 'Visão monocular em revalidação: aceita se o olho bom cumprir todos os requisitos.', '67.99(c)(6)', 'monocular');
  }
  const ref = num(v, 'refrativaMeses');
  if (ref !== undefined) {
    if (ref <= 6) add('Oftalmológico', 'inapto', `Cirurgia refrativa há ${ref} meses: exige mais de 6. Reavaliar depois do prazo.`, '67.99(b)', 'refrativaMeses');
    else add('Oftalmológico', 'ok', `Cirurgia refrativa há ${ref} meses (> 6); ofuscamento e sensibilidade ao contraste normais, se pedidos.`, '67.99(b)', 'refrativaMeses');
  }

  // Auditivo
  const dir = orelhaOk(v, 'od');
  const esq = orelhaOk(v, 'oe');
  const ouv = ['od500', 'od1000', 'od2000', 'od3000', 'oe500', 'oe1000', 'oe2000', 'oe3000'];
  if (dir !== undefined && esq !== undefined) {
    if (dir && esq) add('Auditivo', 'ok', 'Audiometria dentro dos limites nas duas orelhas.', '67.101(a)', ...ouv);
    else if (sim('fala')) add('Auditivo', 'ok', 'Audiometria fora do limite, compensada pela discriminação da fala ou pelo teste de voz.', '67.101(b)', ...ouv, 'fala');
    else if (!dir && !esq) {
      add('Auditivo', 'restricao', 'Perda nas duas orelhas sem compensação no teste de fala.', '67.101(e)', ...ouv, 'fala');
      restricoes.push('Não válido para voos com comunicação bilateral por rádio, nem para atuar como comissário.');
    } else if (!ctx.inicial) add('Auditivo', 'ok', `Perda só na orelha ${dir ? 'esquerda' : 'direita'}: na revalidação, basta uma orelha dentro do limite.`, '67.101(d)', ...ouv);
    else add('Auditivo', 'julgamento', `Perda só na orelha ${dir ? 'esquerda' : 'direita'} no exame inicial: fazer o teste de discriminação da fala.`, '67.101(b)', ...ouv, 'fala');
  }

  for (const x of a) if (x.nivel === 'restricao' && x.texto.includes('6 meses')) restricoes.push('Validade reduzida a até 6 meses por condição clínica em acompanhamento.');

  // Classes sem limiares consultados: os critérios da 1ª classe servem de referência, e o que não passar vira "confirmar".
  if (classe !== '1') for (const x of a) if (x.nivel === 'inapto' || x.nivel === 'restricao') x.nivel = 'confirmar';

  const pendentes = OBRIGATORIOS.filter((id) => num(v, id) === undefined).map(rotuloCampo);
  if (idade === undefined) pendentes.unshift('idade');

  const tem = (n: Nivel) => a.some((x) => x.nivel === n);
  const veredito: Veredito = tem('inapto')
    ? 'inapto'
    : pendentes.length
      ? 'incompleto'
      : tem('confirmar')
        ? 'confirmar'
        : tem('restricao') || restricoes.length
          ? 'restricao'
          : 'apto';

  let validade: Resultado['validade'];
  if (idade !== undefined && (veredito === 'apto' || veredito === 'restricao')) {
    const base = validadeMeses(funcao, idade, publico);
    const meses = validadeMax ? Math.min(base.meses, validadeMax) : base.meses;
    const regra = meses < base.meses ? `${base.regra} Reduzida a ${meses} meses pela condição clínica (67.15(b)).` : base.regra;
    validade = { meses, regra, data: somarMeses(meses) };
  }

  return { veredito, achados: a, restricoes: [...new Set(restricoes)], pendentes, validade, comentario: comentar(classe, veredito, a, restricoes, pendentes, validade) };
}

function comentar(classe: ClasseCMA, ver: Veredito, a: Achado[], restricoes: string[], pendentes: string[], validade: Resultado['validade']) {
  const lista = (n: Nivel) => a.filter((x) => x.nivel === n).map((x) => `${x.texto.replace(/\.$/, '')} (RBAC ${x.ref})`);
  const p: string[] = [];
  const inaptos = lista('inapto');
  const restr = lista('restricao');
  const julg = lista('julgamento');
  const conf = lista('confirmar');
  const oks = a.filter((x) => x.nivel === 'ok').length;

  if (ver === 'inapto') {
    p.push(`Candidato julgado não apto para a ${classe}ª classe porque ${inaptos.length > 1 ? 'não cumpre os seguintes requisitos' : 'não cumpre o requisito'}: ${inaptos.join('; ')}.`);
    p.push('Pelo RBAC 67.71(g), o examinador não emite o CMA e informa ao candidato o direito de recorrer à ANAC. Condições temporárias, como gestação, prazo após infarto, revascularização ou cirurgia refrativa, permitem novo exame quando resolvidas.');
  } else if (ver === 'incompleto') {
    p.push(`Ainda não é possível fechar o julgamento: falta${pendentes.length > 1 ? 'm' : ''} ${pendentes.length} parâmetro${pendentes.length > 1 ? 's' : ''} obrigatório${pendentes.length > 1 ? 's' : ''} (${pendentes.join('; ')}).`);
    if (inaptos.length === 0 && conf.length === 0) p.push('Nenhum critério de inaptidão apareceu entre os itens já respondidos.');
  } else if (ver === 'confirmar') {
    p.push(`Para a ${classe}ª classe, os limiares específicos não foram consultados no texto integral do RBAC 67. Os itens a seguir não atendem ao critério da 1ª classe, usado aqui como referência, e precisam ser conferidos na subparte da classe: ${conf.join('; ')}.`);
  } else if (ver === 'restricao') {
    p.push(`Candidato apto com restrição para a ${classe}ª classe. Todos os requisitos avaliados foram cumpridos${restr.length ? `, com condições que exigem acompanhamento: ${restr.join('; ')}` : ''}.`);
    if (restricoes.length) p.push(`Restrições a anotar no CMA: ${restricoes.join(' ')}`);
  } else {
    p.push(`Candidato apto para a ${classe}ª classe: ${oks ? 'todos os parâmetros avaliados estão' : 'os parâmetros avaliados estão'} dentro dos limites do RBAC 67 e nenhuma condição de inaptidão foi declarada.`);
  }
  if (julg.length && ver !== 'inapto') p.push(`Pontos que dependem do julgamento do examinador ou da ANAC e podem mudar o resultado: ${julg.join('; ')}.`);
  if (validade) p.push(`Validade: ${validade.meses} meses, até ${validade.data}. ${validade.regra}`);
  if (classe !== '1' && ver !== 'confirmar') p.push('Limiares específicos desta classe: [confirmar na referência]. A análise usou os critérios da 1ª classe como referência.');
  return p.join('\n\n');
}

// Exames exigidos na 1ª classe (67.105 a 67.111).
export const EXAMES_1A = [
  { exame: 'Laboratório', quando: 'Inicial e revalidação: glicemia de jejum (± HbA1c), colesterol e frações, triglicerídeos, creatinina, hemograma, EAS, ácido úrico, β-HCG. Tipagem ABO/Rh no inicial.' },
  { exame: 'ECG e teste ergométrico', quando: 'No inicial. Na revalidação: a cada 12 meses a partir dos 50 anos; a cada 2 anos dos 30 aos 49.' },
  { exame: 'Radiografia de tórax, EEG e radiografia de seios da face', quando: 'No exame inicial.' },
  { exame: 'Audiometria', quando: 'No inicial. Na revalidação: a cada 5 anos antes dos 40; a cada 2 anos a partir dos 40.' },
  { exame: 'Parecer psiquiátrico e avaliação psicológica', quando: 'No inicial e após acidente ou incidente grave. Avaliação psicológica a cada 5 anos.' },
];
