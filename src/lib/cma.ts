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

// Atalhos para escrever as perguntas: uma pergunta, uma condição.
type Extra = { sim?: Regra; nao?: Regra; se?: (v: Valores, ctx: Contexto) => boolean; ajuda?: string };
const sn = (id: string, rotulo: string, ref: string, x: Extra = {}): Campo => ({ id, tipo: 'sn', rotulo, ref, ...x });
const nm = (id: string, rotulo: string, ref: string, placeholder: string, unidade: string, faixa: [number, number], x: Omit<Extra, 'sim' | 'nao'> = {}): Campo => ({ id, tipo: 'num', rotulo, ref, placeholder, unidade, faixa, ...x });
const I = (t: string): Regra => ['inapto', t];
const J = (t: string): Regra => ['julgamento', t];
const algum = (v: Valores, ...ids: string[]) => ids.some((id) => v[id] === true);

export const SISTEMAS: { id: string; nome: string; achado: string; ref: string; campos: Campo[] }[] = [
  {
    id: 'vitais',
    nome: 'Sinais vitais e medidas',
    achado: 'Cardiovascular',
    ref: '67.79 · 67.85',
    campos: [
      { id: 'sexo', tipo: 'opcao', rotulo: 'Sexo', ref: '67.79(b)(1)', ajuda: 'Define o limite de cintura após infarto e as perguntas obstétricas.', opcoes: [{ id: 'm', nome: 'Masculino' }, { id: 'f', nome: 'Feminino' }] },
      nm('pas', 'Pressão sistólica', '67.79(a)(8)', 'ex.: 120', 'mmHg', [60, 260], { ajuda: 'Mantida acima de 140×90 mmHg: não apto.' }),
      nm('pad', 'Pressão diastólica', '67.79(a)(8)', 'ex.: 80', 'mmHg', [30, 160]),
      sn('antiHas', 'Usa anti-hipertensivo?', '67.79(a)(8)', { sim: J('Anti-hipertensivo: apto a critério do examinador, com a pressão controlada e sem efeito sobre o voo.') }),
      nm('peso', 'Peso', '67.85(a)', 'ex.: 78', 'kg', [35, 250]),
      nm('altura', 'Altura', '67.85(a)', 'ex.: 175', 'cm', [130, 220]),
      nm('cintura', 'Circunferência da cintura', '67.79(b)(1)', 'ex.: 92', 'cm', [50, 180], { ajuda: 'Após infarto: até 102 cm nos homens e 88 cm nas mulheres.' }),
      sn('tabaco', 'Fuma?', '67.79(f)', { sim: J('Tabagismo: fator de risco a investigar; o examinador pode pedir exames ou reduzir a validade.') }),
      sn('sedentario', 'É sedentário?', '67.79(f)', { sim: J('Sedentarismo: fator de risco a investigar; o examinador pode pedir exames ou reduzir a validade.') }),
    ],
  },
  {
    id: 'metabolico',
    nome: 'Metabólico e endócrino',
    achado: 'Metabólico',
    ref: '67.85',
    campos: [
      nm('glicemia', 'Glicemia de jejum', '67.85(d)–(e)', 'ex.: 92', 'mg/dl', [20, 600], { ajuda: 'Abaixo de 50 ou acima de 140 mg/dl, confirmada em 2 dosagens: não apto.' }),
      sn('glicConfirmada', 'O valor alterado se repetiu numa segunda dosagem, em outro dia?', '67.85(d)', { se: (v) => { const g = num(v, 'glicemia'); return g !== undefined && (g < 70 || g >= 115); } }),
      sn('insulina', 'Usa insulina?', '67.85(b)', { sim: I('Diabetes insulinodependente.') }),
      sn('adoOral', 'Usa antidiabético oral?', '67.85(f)'),
      nm('adoDias', 'Dias de glicemia entre 70 e 139 mg/dl com o antidiabético oral', '67.85(f)', 'ex.: 60', 'dias', [0, 3650], { se: (v) => algum(v, 'adoOral') }),
      sn('diabetesDieta', 'Tem diabetes controlado só com dieta?', '67.85(c)', { se: (v) => !algum(v, 'insulina', 'adoOral'), sim: J('Diabetes controlado só com dieta: apto a critério do examinador.') }),
      sn('hipoReativa', 'Tem hipoglicemia reativa?', '67.85(g)', { sim: I('Hipoglicemia reativa.') }),
      sn('hipoDificil', 'Tem hipoglicemia de difícil controle?', '67.85(g)', { sim: I('Hipoglicemia de difícil controle.') }),
      sn('dislipidemia', 'Tem dislipidemia severa?', '67.85(a)', { sim: J('Dislipidemia severa: não apto se, a critério do examinador, puder afetar o voo.') }),
      sn('hiperfuncao', 'Tem hiperfunção endócrina significativa?', '67.85(a)', { sim: J('Hiperfunção endócrina significativa: não apto se, a critério, puder afetar o voo.') }),
      sn('hipofuncao', 'Tem hipofunção endócrina significativa?', '67.85(a)', { sim: J('Hipofunção endócrina significativa: não apto se, a critério, puder afetar o voo.') }),
      sn('hormonio', 'Tem alteração causada por hormônio de reposição?', '67.85(a)', { sim: J('Alteração por hormônio de reposição: não apto se, a critério, puder afetar o voo.') }),
    ],
  },
  {
    id: 'cardio',
    nome: 'Cardiovascular',
    achado: 'Cardiovascular',
    ref: '67.79',
    campos: [
      sn('angina', 'Tem ou já teve angina?', '67.79(a)(1)', { sim: I('Angina.') }),
      sn('iam', 'Já teve infarto do miocárdio?', '67.79(a)(10)'),
      nm('iamMeses', 'Meses desde o infarto', '67.79(b)(1)', 'ex.: 14', 'meses', [0, 600], { se: (v) => algum(v, 'iam') }),
      sn('iamHolter', 'O Holter após o infarto foi satisfatório?', '67.79(b)(1)', { se: (v) => algum(v, 'iam') }),
      sn('iamCintilo', 'A cintilografia miocárdica após o infarto foi satisfatória?', '67.79(b)(1)', { se: (v) => algum(v, 'iam') }),
      sn('iamEco', 'O eco-Doppler após o infarto foi satisfatório?', '67.79(b)(1)', { se: (v) => algum(v, 'iam') }),
      sn('iamLipido', 'O lipidograma após o infarto foi satisfatório?', '67.79(b)(1)', { se: (v) => algum(v, 'iam') }),
      sn('iamCate', 'A cineangiocoronariografia após o infarto foi satisfatória?', '67.79(b)(1)', { se: (v) => algum(v, 'iam') }),
      sn('iamPsiq', 'O parecer psiquiátrico após o infarto foi favorável?', '67.79(b)(1)', { se: (v) => algum(v, 'iam') }),
      sn('iamIC', 'Tem insuficiência cardíaca?', '67.79(b)', { se: (v) => algum(v, 'iam', 'revasc', 'angioplastia'), sim: I('Insuficiência cardíaca após infarto ou revascularização.') }),
      sn('revasc', 'Fez revascularização miocárdica (ponte)?', '67.79(a)(3)'),
      sn('angioplastia', 'Fez angioplastia coronária?', '67.79(a)(3)'),
      nm('revascDias', 'Dias desde a revascularização ou a angioplastia', '67.79(b)(2)', 'ex.: 200', 'dias', [0, 20000], { se: (v) => algum(v, 'revasc', 'angioplastia') }),
      sn('revascHolter', 'O Holter após o procedimento foi satisfatório?', '67.79(b)(2)', { se: (v) => algum(v, 'revasc', 'angioplastia') }),
      sn('revascCintilo', 'A cintilografia após o procedimento foi satisfatória?', '67.79(b)(2)', { se: (v) => algum(v, 'revasc', 'angioplastia') }),
      sn('revascLipido', 'O lipidograma após o procedimento foi satisfatório?', '67.79(b)(2)', { se: (v) => algum(v, 'revasc', 'angioplastia') }),
      sn('revascCate', 'A cineangiocoronariografia após o procedimento foi satisfatória?', '67.79(b)(2)', { se: (v) => algum(v, 'revasc', 'angioplastia') }),
      sn('cirurgiaCardiaca', 'Fez outra cirurgia cardíaca?', '67.79(a)(3)', { sim: I('Doença que exigiu cirurgia cardíaca.') }),
      sn('cirurgiaArterial', 'Fez cirurgia arterial?', '67.79(a)(3)', { sim: I('Doença que exigiu cirurgia arterial.') }),
      sn('proteseVascular', 'Tem prótese cardíaca ou vascular?', '67.79(a)(3)', { sim: I('Doença que exigiu prótese.') }),
      sn('marcapasso', 'Usa marcapasso?', '67.79(a)(3)', { sim: I('Marcapasso.') }),
      sn('anticoag', 'Usa anticoagulante?', '67.79(a)(3)', { sim: I('Doença que exigiu anticoagulante.') }),
      sn('congenita', 'Tem cardiopatia congênita?', '67.79(a)(4)'),
      sn('congenitaCurada', 'A cardiopatia congênita teve cura cirúrgica indubitável?', '67.79(a)(4)', { se: (v) => algum(v, 'congenita') }),
      sn('sopro', 'Tem sopro cardíaco significativo?', '67.79(a)(5)', { sim: I('Sopro cardíaco significativo.') }),
      sn('valvopatia', 'Tem doença de válvula cardíaca?', '67.79(a)(5)', { sim: I('Doença valvar.') }),
      sn('trocaValvar', 'Fez troca de válvula cardíaca?', '67.79(a)(11)', { sim: I('Troca de válvula cardíaca.') }),
      sn('transplanteCardiaco', 'Fez transplante de coração?', '67.79(a)(11)', { sim: I('Transplante cardíaco.') }),
      sn('pericardite', 'Tem pericardite?', '67.79(a)(6)', { sim: I('Pericardite.') }),
      sn('miocardiopatia', 'Tem miocardiopatia?', '67.79(a)(6)', { sim: I('Miocardiopatia.') }),
      sn('arritmia', 'Tem arritmia significativa?', '67.79(a)(7) e (g)'),
      sn('bloqueio', 'Tem bloqueio de condução significativo?', '67.79(a)(7) e (g)'),
      sn('arritmiaInvestigada', 'A investigação mostrou baixa probabilidade de afetar o voo?', '67.79(g)', { se: (v) => algum(v, 'arritmia', 'bloqueio') }),
      sn('preExc', 'Tem pré-excitação ventricular no eletrocardiograma?', '67.79(a)(12)'),
      sn('ablacao', 'Fez ablação do feixe anômalo?', '67.79(a)(12)', { se: (v) => algum(v, 'preExc') }),
      nm('ablacaoMeses', 'Meses desde a ablação', '67.79(a)(12)', 'ex.: 4', 'meses', [0, 600], { se: (v) => algum(v, 'ablacao') }),
      sn('reestudo', 'O reestudo após a ablação ficou sem conexão anômala?', '67.79(a)(12)', { se: (v) => algum(v, 'ablacao') }),
      sn('prolapso', 'Tem prolapso da válvula mitral?', '67.79(a)(13)'),
      sn('prolapsoSintomas', 'O prolapso causa sintomas?', '67.79(a)(13)', { se: (v) => algum(v, 'prolapso'), sim: I('Prolapso mitral sintomático.') }),
      sn('prolapsoArritmia', 'O prolapso vem com arritmia?', '67.79(a)(13)', { se: (v) => algum(v, 'prolapso'), sim: I('Prolapso mitral com arritmia.') }),
      sn('prolapsoDoenca', 'O prolapso vem com outra doença associada?', '67.79(a)(13)', { se: (v) => algum(v, 'prolapso'), sim: I('Prolapso mitral com doença associada.') }),
      sn('prolapsoErgo', 'O teste ergométrico foi satisfatório?', '67.79(a)(13)', { se: (v) => algum(v, 'prolapso'), nao: I('Prolapso mitral com teste ergométrico insatisfatório.') }),
      sn('prolapsoHolter', 'O Holter foi satisfatório?', '67.79(a)(13)', { se: (v) => algum(v, 'prolapso'), nao: I('Prolapso mitral com Holter insatisfatório.') }),
      sn('prolapsoEco', 'O ecocardiograma foi satisfatório?', '67.79(a)(13)', { se: (v) => algum(v, 'prolapso'), nao: I('Prolapso mitral com ecocardiograma insatisfatório.') }),
      sn('vascularObstrutiva', 'Tem doença vascular obstrutiva?', '67.79(a)(9)', { sim: I('Doença vascular obstrutiva.') }),
      sn('aneurismaVascular', 'Tem aneurisma (fora do cérebro)?', '67.79(a)(9)', { sim: I('Aneurisma.') }),
    ],
  },
  {
    id: 'pneumo',
    nome: 'Respiratório',
    achado: 'Respiratório',
    ref: '67.81',
    campos: [
      sn('asma', 'Tem asma?', '67.81(a)(3)', { sim: I('Asma.') }),
      sn('pulmaoAgudo', 'Tem doença aguda ou ativa do pulmão?', '67.81(a)(1)', { sim: I('Doença pulmonar aguda ou ativa: não apto enquanto durar, a critério.') }),
      sn('mediastino', 'Tem doença ativa do mediastino?', '67.81(a)(1)', { sim: I('Doença ativa do mediastino, a critério.') }),
      sn('pleura', 'Tem doença ativa da pleura?', '67.81(a)(1)', { sim: I('Doença ativa da pleura, a critério.') }),
      sn('pulmaoCronico', 'Tem doença pulmonar crônica?', '67.81(a)(2)', { sim: J('Doença pulmonar crônica: não apto, salvo investigação que mostre baixa probabilidade de afetar o voo.') }),
      sn('tb', 'Tem tuberculose ativa?', '67.81(a)(4)', { ajuda: 'Lesões inativas ou cicatrizadas permitem a aptidão.', sim: I('Tuberculose ativa.') }),
      sn('infeccaoPulmonar', 'Tem outra infecção pulmonar ativa?', '67.81(a)(4)', { sim: I('Infecção pulmonar ativa.') }),
      sn('hp', 'Tem hipertensão pulmonar?', '67.81(a)(5)', { sim: I('Hipertensão pulmonar.') }),
      sn('pneumotorax', 'Tem pneumotórax não resolvido?', '67.81(a)(6)', { sim: I('Pneumotórax não resolvido.') }),
      sn('bolhosa', 'Tem doença bolhosa do pulmão?', '67.81(a)(6)', { sim: I('Doença bolhosa do pulmão, a critério.') }),
      sn('neoTorax', 'Tem neoplasia no tórax?', '67.81(a)(7)', { sim: I('Neoplasia torácica.') }),
    ],
  },
  {
    id: 'digestivo',
    nome: 'Digestivo',
    achado: 'Digestivo',
    ref: '67.83',
    campos: [
      sn('giDeficiencia', 'Tem deficiência significativa do trato digestivo ou dos seus anexos?', '67.83(a)(1)', { sim: I('Deficiência anatomofuncional significativa do trato digestivo.') }),
      sn('hernia', 'Tem hérnia com sintomas?', '67.83(a)(2)', { sim: J('Hérnia sintomática: não apto se, a critério, puder afetar o voo.') }),
      sn('estenose', 'Tem estenose ou compressão por doença ou cirurgia digestiva?', '67.83(a)(3)', { sim: I('Sequela digestiva com estenose ou compressão.') }),
      sn('giCirurgia', 'Fez cirurgia digestiva ou biliar com remoção ou desvio de fluxo?', '67.83(b)', { sim: J('Cirurgia digestiva importante: não apto, salvo se, a critério, não houver probabilidade de incapacitação.') }),
    ],
  },
  {
    id: 'renal',
    nome: 'Urinário e renal',
    achado: 'Renal',
    ref: '67.89',
    campos: [
      sn('rimDoenca', 'Tem doença renal?', '67.89(a)', { ajuda: 'A investigação inclui exame de urina.', sim: J('Doença renal: não apto, salvo investigação e juízo favorável da ANAC.') }),
      sn('geniturinaria', 'Tem doença geniturinária?', '67.89(a)', { sim: J('Doença geniturinária: não apto, salvo investigação e juízo favorável da ANAC.') }),
      sn('calculo', 'Tem cálculo urinário?', '67.89(b)', { sim: J('Urolitíase: não apto, salvo investigação e juízo favorável da ANAC.') }),
      sn('cirurgiaUrinaria', 'Fez cirurgia de rins ou vias urinárias?', '67.89(b)', { sim: J('Cirurgia urinária: não apto, salvo investigação e juízo favorável da ANAC.') }),
      sn('nefrectomia', 'Retirou um rim?', '67.89(c)'),
      sn('nefrectomiaOk', 'O rim que ficou compensa bem a função?', '67.89(c)', { se: (v) => algum(v, 'nefrectomia') }),
      sn('transplanteRim', 'Tem rim transplantado?', '67.89(d)', { sim: J('Rim transplantado: apto em consulta com a ANAC, sem rejeição ou complicações e com boa função.') }),
    ],
  },
  {
    id: 'hemato',
    nome: 'Hematológico',
    achado: 'Hematológico',
    ref: '67.87',
    campos: [
      sn('cumarinico', 'O anticoagulante é cumarínico (como a varfarina)?', '67.87(c)', { se: (v) => algum(v, 'anticoag'), sim: I('Anticoagulação oral cumarínica.') }),
      sn('trombofilia', 'Tem trombofilia (sangue que coagula demais)?', '67.87(c)', { sim: I('Hipercoagulabilidade.') }),
      sn('hemorragica', 'Tem doença hemorrágica?', '67.87(c)', { sim: I('Transtorno hemorrágico.') }),
      sn('anemia', 'Tem anemia?', '67.87(a)', { sim: J('Anemia: não apto, salvo investigação e juízo da ANAC de baixa probabilidade de afetar o voo.') }),
      sn('mieloproliferativa', 'Tem doença mieloproliferativa?', '67.87(a)', { sim: J('Doença mieloproliferativa: não apto, salvo investigação e juízo da ANAC.') }),
      sn('mielofibrose', 'Tem mielofibrose?', '67.87(a)', { sim: J('Mielofibrose: não apto, salvo investigação e juízo da ANAC.') }),
      sn('linfoma', 'Tem tumor linfático (linfoma)?', '67.87(a)', { sim: J('Tumor linfático: não apto, salvo investigação e juízo da ANAC.') }),
      sn('esplenomegalia', 'Tem aumento do baço?', '67.87(a)', { sim: J('Esplenomegalia: não apto, salvo investigação e juízo da ANAC.') }),
      sn('falciforme', 'Tem traço falciforme ou outro traço de hemoglobina?', '67.87(b)', { sim: J('Traço de hemoglobinopatia: apto a critério da ANAC, salvo risco de crise hemolítica em voo.') }),
    ],
  },
  {
    id: 'neuro',
    nome: 'Neurológico',
    achado: 'Neurológico',
    ref: '67.77',
    campos: [
      sn('epilepsia', 'Tem ou já teve epilepsia?', '67.77(a)(4)', { sim: I('Epilepsia.') }),
      sn('eeg', 'O eletroencefalograma tem grafoelementos epileptiformes?', '67.77(a)(5)(i)', { ajuda: 'O EEG é obrigatório no exame inicial.', sim: I('EEG com grafoelementos epileptiformes.') }),
      sn('eegLento', 'O eletroencefalograma tem lentificações?', '67.77(a)(5)(ii)'),
      sn('rmNormal', 'A ressonância do crânio ficou sem lesão estrutural significativa?', '67.77(a)(5)(ii)', { se: (v) => algum(v, 'eegLento') }),
      sn('consciencia', 'Teve perda de consciência repetida, sem explicação?', '67.77(a)(6) e (13)', { sim: I('Perda recorrente de consciência sem explicação satisfatória.') }),
      sn('funcaoNeuro', 'Teve perda repetida de função neurológica, sem explicação?', '67.77(a)(6) e (13)', { sim: I('Perda recorrente de função neurológica sem explicação satisfatória.') }),
      sn('perdaConsc', 'Teve um único episódio de perda de consciência?', '67.77(a)(13)', { se: (v) => !algum(v, 'consciencia'), sim: J('Episódio único de perda de consciência: julgamento conjunto com a ANAC.') }),
      sn('avc', 'Teve AVC?', '67.77(a)(7)', { sim: I('Infarto cerebral ou cerebelar.') }),
      sn('insufVascular', 'Tem insuficiência vascular cerebral?', '67.77(a)(8)', { sim: I('Insuficiência vascular cerebral.') }),
      sn('aneurismaCerebral', 'Tem aneurisma cerebral?', '67.77(a)(9)', { sim: I('Aneurisma cerebral.') }),
      sn('hemorragiaCerebral', 'Teve hemorragia cerebral ou meníngea?', '67.77(a)(10)', { sim: I('Hemorragia meníngea ou intracerebral.') }),
      sn('hemiparesia', 'Tem fraqueza ou paralisia de um lado do corpo (hemiparesia ou hemiplegia)?', '67.77(a)(1)', { sim: I('Hemiplegia ou hemiparesia.') }),
      sn('enxaqueca', 'Tem enxaqueca com sintomas visuais ou neurológicos focais?', '67.77(a)(11)', { sim: I('Enxaqueca com fenômenos oculares e neurológicos focais.') }),
      sn('vasculite', 'Tem doença vascular autoimune do sistema nervoso?', '67.77(a)(2)', { sim: I('Doença vascular autoimune com envolvimento do sistema nervoso central.') }),
      sn('neuroDoenca', 'Tem doença do sistema nervoso que interfira na função a bordo?', '67.77(a)(3)', { sim: I('Doença do sistema nervoso que interfere na função a bordo.') }),
      sn('neoCerebral', 'Tem neoplasia cerebral?', '67.77(a)(12)', { sim: I('Neoplasia cerebral.') }),
      sn('equilibrio', 'Tem perda de equilíbrio?', '67.77(a)(14)', { sim: I('Perda de equilíbrio.') }),
      sn('sensibilidade', 'Tem perda de sensibilidade?', '67.77(a)(14)', { sim: I('Perda de sensibilidade.') }),
      sn('forca', 'Tem perda de força?', '67.77(a)(14)', { sim: I('Perda de força.') }),
      sn('coordenacao', 'Tem perda de coordenação?', '67.77(a)(14)', { sim: I('Perda de coordenação.') }),
      sn('cirurgiaCerebral', 'Fez cirurgia cerebral com sequela?', '67.77(a)(15)', { sim: I('Cirurgia cerebral com sequela que afeta a função.') }),
      sn('tce', 'Teve traumatismo craniano com sequela?', '67.77(a)(15)', { sim: I('Traumatismo craniano com sequela que afeta a função.') }),
    ],
  },
  {
    id: 'mental',
    nome: 'Mental e comportamental',
    achado: 'Mental',
    ref: '67.75',
    campos: [
      sn('psicose', 'Tem história de esquizofrenia ou de outro transtorno psicótico?', '67.75(b)', { sim: I('Esquizofrenia, transtorno esquizotípico ou delirante.') }),
      sn('humor', 'Tem história de transtorno do humor (como depressão ou bipolaridade)?', '67.75(b)', { ajuda: 'A depressão tratada com antidepressivo tem regra própria logo abaixo.', se: (v) => !algum(v, 'antidep'), sim: I('Transtorno do humor.') }),
      sn('ansiedade', 'Tem história de transtorno de ansiedade, ligado ao estresse ou somatoforme?', '67.75(b)', { sim: I('Transtorno neurótico, relacionado ao estresse ou somatoforme.') }),
      sn('personalidade', 'Tem transtorno de personalidade?', '67.75(b)', { sim: I('Transtorno de personalidade.') }),
      sn('organico', 'Tem transtorno mental orgânico?', '67.75(b)', { sim: I('Transtorno mental orgânico.') }),
      sn('fisiologico', 'Tem transtorno comportamental com distúrbio fisiológico (como alimentar ou do sono)?', '67.75(b)', { sim: I('Síndrome comportamental associada a distúrbios fisiológicos.') }),
      sn('intelectual', 'Tem deficiência intelectual?', '67.75(b)', { sim: I('Retardo mental.') }),
      sn('desenvolvimento', 'Tem transtorno do desenvolvimento psicológico?', '67.75(b)', { sim: I('Transtorno do desenvolvimento psicológico.') }),
      sn('infancia', 'Tem transtorno emocional ou de comportamento iniciado na infância?', '67.75(b)', { sim: I('Transtorno do comportamento ou emocional com início na infância ou adolescência.') }),
      sn('alcool', 'Tem transtorno por uso de álcool?', '67.75(b)', { sim: I('Transtorno por uso de álcool.') }),
      sn('substancia', 'Tem transtorno por uso de outra substância psicoativa?', '67.75(b)', { sim: I('Transtorno por uso de substância psicoativa.') }),
      sn('antidep', 'Trata depressão com antidepressivo?', '67.75(c)'),
      sn('parecerPsiq', 'O parecer psiquiátrico foi favorável?', '67.75(c)', { se: (v) => algum(v, 'antidep') }),
      sn('avalPsico', 'A avaliação psicológica foi satisfatória?', '67.75(e)–(h)', { ajuda: 'Testes de personalidade, atenção, memória e raciocínio; no inicial, após acidente ou incidente grave e a cada 5 anos.', nao: I('Avaliação psicológica insatisfatória.') }),
    ],
  },
  {
    id: 'obst',
    nome: 'Gineco-obstétrico',
    achado: 'Obstétrico',
    ref: '67.93',
    campos: [
      sn('gestacao', 'Está grávida?', '67.93(a)', { se: (v) => v.sexo === 'f', ajuda: 'A gestante deve informar a gravidez e parar de voar até a suspensão do CMA.', sim: I('Gravidez constatada: não apta enquanto durar.') }),
      sn('posParto', 'Está voltando de licença pós-parto?', '67.93(c)', { se: (v) => v.sexo === 'f' && !algum(v, 'gestacao'), sim: J('Pós-parto: apta a critério, após novo exame de revalidação.') }),
    ],
  },
  {
    id: 'osteo',
    nome: 'Osteomuscular',
    achado: 'Osteomuscular',
    ref: '67.95',
    campos: [
      sn('osteoAtiva', 'Tem doença osteomuscular ativa?', '67.95(a)(1)', { ajuda: 'Ossos, articulações, músculos ou tendões.', sim: I('Doença osteomuscular ativa.') }),
      sn('osteoSequela', 'Tem sequela funcional de doença congênita ou adquirida?', '67.95(a)(2)', { sim: I('Sequela funcional osteomuscular.') }),
      sn('escoliose', 'Tem escoliose com sintomas?', '67.95(a)(3)', { sim: I('Escoliose sintomática.') }),
      sn('cifose', 'Tem cifose com sintomas?', '67.95(a)(3)', { sim: I('Cifose sintomática.') }),
      sn('lordose', 'Tem lordose com sintomas?', '67.95(a)(3)', { sim: I('Lordose sintomática.') }),
      sn('discal', 'Tem hérnia de disco com sintomas neurológicos?', '67.95(a)(4)', { sim: I('Hérnia de disco com sintomas neurológicos.') }),
      sn('amputacao', 'Tem amputação?', '67.95(b)', { sim: J('Amputação: não apto, salvo investigação e juízo da ANAC.') }),
      sn('proteseOrto', 'Usa prótese ortopédica?', '67.95(b)', { sim: J('Prótese ortopédica: não apto, salvo investigação e juízo da ANAC.') }),
      sn('ortese', 'Usa órtese?', '67.95(b)', { sim: J('Órtese: não apto, salvo investigação e juízo da ANAC.') }),
      sn('anomalia', 'Tem anomalia osteomuscular com deficiência funcional?', '67.95(b)', { sim: J('Anomalia com deficiência funcional: não apto, salvo investigação e juízo da ANAC.') }),
    ],
  },
  {
    id: 'visao',
    nome: 'Oftalmológico',
    achado: 'Oftalmológico',
    ref: '67.99',
    campos: [
      nm('avOD', 'Acuidade de longe, olho direito', '67.99(c)(1)', '20/__ (ex.: 25)', '20/x', [10, 400], { ajuda: 'Mínimo 20/30 em cada olho, com ou sem correção.' }),
      nm('avOE', 'Acuidade de longe, olho esquerdo', '67.99(c)(1)', '20/__ (ex.: 25)', '20/x', [10, 400]),
      nm('avBin', 'Acuidade binocular', '67.99(c)(1)', '20/__ (ex.: 20)', '20/x', [10, 400], { ajuda: 'Mínimo 20/20.' }),
      sn('correcao', 'Precisa de correção óptica para atingir esses valores?', '67.99(c)(4)'),
      sn('umPar', 'Um único par de óculos serve para perto e para longe?', '67.99(c)(3)', { se: (v) => algum(v, 'correcao'), nao: I('Um único par de óculos precisa servir para perto e para longe.') }),
      sn('lenteMulti', 'Usa lente de contato multifocal?', '67.99(g)', { se: (v) => algum(v, 'correcao'), sim: I('Só são aceitas lentes de contato monofocais.') }),
      sn('lenteColorida', 'Usa lente de contato colorida?', '67.99(g)', { se: (v) => algum(v, 'correcao'), sim: I('Lentes de contato não podem ter cor.') }),
      sn('lenteOculos', 'Usa lente de contato e óculos ao mesmo tempo no mesmo olho?', '67.99(i)', { se: (v) => algum(v, 'correcao'), sim: I('Não é permitido usar lente e óculos ao mesmo tempo no mesmo olho.') }),
      sn('semCorrecao200', 'Sem correção, algum olho fica abaixo de 20/200?', '67.99(j)', { se: (v) => algum(v, 'correcao'), sim: J('Acuidade sem correção abaixo de 20/200: relatório oftalmológico completo no inicial e a cada 5 anos.') }),
      sn('pertoJ1', 'Lê J1 a 30–50 cm?', '67.99(c)(2)', { nao: I('Não lê J1 a 30–50 cm.') }),
      sn('distanciaJ6', 'Lê J6 a 100 cm?', '67.99(c)(2)', { nao: I('Não lê J6 a 100 cm.') }),
      sn('cores', 'Reconhece as cores exigidas?', '67.99(c)(5)', { ajuda: 'Nas tabelas ou nas cores básicas da aviação.', nao: I('Não reconhece as cores exigidas.') }),
      nm('hiperforia', 'Hiperforia', '67.99(c)(7)', 'ex.: 0,5', 'DP', [0, 30], { ajuda: 'Máximo 1 dioptria prismática.' }),
      nm('exoforia', 'Exoforia', '67.99(c)(7)', 'ex.: 2', 'DP', [0, 40], { ajuda: 'Máximo 5 dioptrias prismáticas.' }),
      nm('esoforia', 'Esoforia (endoforia)', '67.99(c)(7)', 'ex.: 4', 'DP', [0, 40], { ajuda: 'Máximo 10 dioptrias prismáticas.' }),
      sn('heterotropia', 'Tem heterotropia (estrabismo manifesto)?', '67.99(c)(8)', { sim: I('Heterotropia.') }),
      sn('monocular', 'Tem visão monocular?', '67.99(c)(6)'),
      sn('campoVisual', 'O campo visual está normal?', '67.99(c)(9)', { nao: I('Campo visual alterado.') }),
      sn('pressaoOcular', 'A pressão ocular está normal?', '67.99(c)(9)', { nao: I('Pressão ocular alterada.') }),
      sn('fundoOlho', 'O fundo de olho está normal?', '67.99(c)(9)', { nao: I('Fundo de olho alterado.') }),
      sn('cornea', 'As córneas estão normais?', '67.99(c)(9)', { nao: I('Córnea alterada.') }),
      sn('refrativa', 'Fez cirurgia refrativa?', '67.99(b)'),
      nm('refrativaMeses', 'Meses desde a cirurgia refrativa', '67.99(b)', 'ex.: 9', 'meses', [0, 600], { se: (v) => algum(v, 'refrativa') }),
    ],
  },
  {
    id: 'audicao',
    nome: 'Auditivo',
    achado: 'Auditivo',
    ref: '67.101',
    campos: [
      nm('od500', 'Orelha direita, 500 Hz', '67.101(a)', 'ex.: 15', 'dB', [-10, 120], { ajuda: 'Até 35 dB em 500, 1.000 e 2.000 Hz e até 50 dB em 3.000 Hz, por orelha.' }),
      nm('od1000', 'Orelha direita, 1.000 Hz', '67.101(a)', 'ex.: 15', 'dB', [-10, 120]),
      nm('od2000', 'Orelha direita, 2.000 Hz', '67.101(a)', 'ex.: 20', 'dB', [-10, 120]),
      nm('od3000', 'Orelha direita, 3.000 Hz', '67.101(a)', 'ex.: 25', 'dB', [-10, 120]),
      nm('oe500', 'Orelha esquerda, 500 Hz', '67.101(a)', 'ex.: 15', 'dB', [-10, 120]),
      nm('oe1000', 'Orelha esquerda, 1.000 Hz', '67.101(a)', 'ex.: 15', 'dB', [-10, 120]),
      nm('oe2000', 'Orelha esquerda, 2.000 Hz', '67.101(a)', 'ex.: 20', 'dB', [-10, 120]),
      nm('oe3000', 'Orelha esquerda, 3.000 Hz', '67.101(a)', 'ex.: 25', 'dB', [-10, 120]),
      sn('fala', 'Discrimina a fala em ruído que simula a cabine?', '67.101(b)(1)', { se: (v) => audiometriaFalha(v), ajuda: 'Logoaudiometria com listas foneticamente equilibradas.' }),
      sn('voz', 'Ouve voz de 85 a 95 dB a 2 metros, de costas para o examinador?', '67.101(b)(2)', { se: (v) => audiometriaFalha(v) }),
    ],
  },
  {
    id: 'orl',
    nome: 'Otorrinolaringológico',
    achado: 'ORL',
    ref: '67.97',
    campos: [
      sn('tuba', 'Tem obstrução permanente da tuba auditiva?', '67.97(c)', { sim: I('Obstrução permanente da tuba auditiva.') }),
      sn('vestibular', 'Tem distúrbio vestibular permanente?', '67.97(d)', { sim: I('Transtorno permanente do aparelho vestibular.') }),
      sn('vestibularPassageiro', 'Tem distúrbio vestibular passageiro neste momento?', '67.97(d)', { se: (v) => !algum(v, 'vestibular'), sim: I('Distúrbio vestibular passageiro: não apto até se restabelecer.') }),
      sn('ouvido', 'Tem doença do ouvido que afete o voo?', '67.97(a)', { sim: J('Doença do ouvido: julgamento a critério da ANAC.') }),
      sn('timpano', 'Tem doença da membrana do tímpano que afete o voo?', '67.97(b)', { ajuda: 'Perfuração simples e seca não impede, se a audição cumprir o 67.101.', sim: J('Doença da membrana timpânica: julgamento a critério da ANAC.') }),
      sn('boca', 'Tem doença grave da boca?', '67.97(e)', { sim: I('Afecção grave da cavidade bucal.') }),
      sn('viasAereas', 'Tem doença grave das vias aéreas superiores?', '67.97(e)', { sim: I('Afecção grave das vias aéreas superiores.') }),
      sn('seios', 'Tem doença grave dos seios da face?', '67.97(e)', { sim: I('Patologia grave dos seios da face.') }),
      sn('maxilofacial', 'Tem disfunção maxilofacial?', '67.97(e)', { sim: I('Disfunção maxilofacial.') }),
      sn('disartria', 'Tem disartria?', '67.97(e)', { sim: I('Disartria.') }),
      sn('gagueira', 'Tem gagueira?', '67.97(e)', { sim: I('Gagueira que dificulta a comunicação oral.') }),
      sn('fonacao', 'Tem outro defeito que dificulte a comunicação oral?', '67.97(e)', { sim: I('Defeito que dificulta a comunicação oral.') }),
      sn('narizDireito', 'A passagem nasal direita está livre?', '67.97(e)', { nao: I('A passagem nasal direita precisa estar livre.') }),
      sn('narizEsquerdo', 'A passagem nasal esquerda está livre?', '67.97(e)', { nao: I('A passagem nasal esquerda precisa estar livre.') }),
    ],
  },
  {
    id: 'odonto',
    nome: 'Odontológico',
    achado: 'Odontológico',
    ref: '67.103',
    campos: [
      sn('dentes', 'O número de dentes permite mastigar sem sintomas?', '67.103(a)(1)', { nao: I('Dentição insuficiente para mastigar sem sintomas.') }),
      sn('proteseDentaria', 'Usa prótese dentária?', '67.103(a)(1)'),
      sn('proteseFala', 'A prótese prejudica a fala?', '67.103(a)(1)', { se: (v) => algum(v, 'proteseDentaria'), sim: I('Prótese dentária que prejudica a fonação.') }),
      sn('carie', 'Tem cárie profunda?', '67.103(a)(2)', { sim: I('Cárie profunda.') }),
      sn('periodonto', 'Tem doença periodontal?', '67.103(a)(3)', { sim: I('Doença periodontal.') }),
      sn('periapical', 'Tem lesão periapical?', '67.103(a)(4)', { sim: I('Afecção periapical.') }),
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
  const exames = (ids: [string, string][]) => {
    const ruins = ids.filter(([id]) => nao(id)).map(([, nome]) => nome);
    const faltam = ids.filter(([id]) => v[id] === undefined).map(([, nome]) => nome);
    return { ruins, faltam };
  };
  if (sim('iam')) {
    const m = num(v, 'iamMeses');
    const e = exames([['iamHolter', 'Holter'], ['iamCintilo', 'cintilografia'], ['iamEco', 'eco-Doppler'], ['iamLipido', 'lipidograma'], ['iamCate', 'cineangiocoronariografia'], ['iamPsiq', 'parecer psiquiátrico']]);
    const ids = ['iam', 'iamMeses', 'iamHolter', 'iamCintilo', 'iamEco', 'iamLipido', 'iamCate', 'iamPsiq'];
    if (m === undefined || m < 12) add('Cardiovascular', 'inapto', 'Infarto há menos de 1 ano (ou tempo não informado).', '67.79(b)(1)', ...ids);
    else if (e.ruins.length) add('Cardiovascular', 'inapto', `Infarto há ${m} meses com resultado insatisfatório: ${e.ruins.join(', ')}.`, '67.79(b)(1)', ...ids);
    else if (e.faltam.length) add('Cardiovascular', 'julgamento', `Infarto há ${m} meses: falta confirmar ${e.faltam.join(', ')}.`, '67.79(b)(1)', ...ids);
    else {
      const f = semFalhaCorpo();
      if (f.length) add('Cardiovascular', 'inapto', `Infarto há ${m} meses, mas ${f.join(' e ')}.`, '67.79(b)(1)', ...ids, 'cintura', 'peso');
      else {
        add('Cardiovascular', 'restricao', `Infarto há ${m} meses (≥ 1 ano), com exames satisfatórios: apto com restrição, em consulta com a ANAC, validade de até 6 meses.${cintura === undefined ? ' Confirme a cintura.' : ''}`, '67.79(b)(1) e (c)', ...ids);
        validadeMax = Math.min(validadeMax ?? 99, 6);
      }
    }
  }
  if (sim('revasc') || sim('angioplastia')) {
    const d = num(v, 'revascDias');
    const e = exames([['revascHolter', 'Holter'], ['revascCintilo', 'cintilografia'], ['revascLipido', 'lipidograma'], ['revascCate', 'cineangiocoronariografia']]);
    const ids = ['revasc', 'angioplastia', 'revascDias', 'revascHolter', 'revascCintilo', 'revascLipido', 'revascCate'];
    const nome = sim('revasc') ? 'Revascularização' : 'Angioplastia';
    if (d === undefined || d < 180) add('Cardiovascular', 'inapto', `${nome} há menos de 180 dias (ou tempo não informado).`, '67.79(b)(2)', ...ids);
    else if (e.ruins.length) add('Cardiovascular', 'inapto', `${nome} há ${d} dias com resultado insatisfatório: ${e.ruins.join(', ')}.`, '67.79(b)(2)', ...ids);
    else if (e.faltam.length) add('Cardiovascular', 'julgamento', `${nome} há ${d} dias: falta confirmar ${e.faltam.join(', ')}.`, '67.79(b)(2)', ...ids);
    else {
      add('Cardiovascular', 'restricao', `${nome} há ${d} dias (≥ 180), com exames satisfatórios: apto com restrição, em consulta com a ANAC, validade de até 6 meses.`, '67.79(b)(2) e (c)', ...ids);
      validadeMax = Math.min(validadeMax ?? 99, 6);
    }
  }
  if (sim('congenita')) {
    if (sim('congenitaCurada')) add('Cardiovascular', 'ok', 'Cardiopatia congênita com cura cirúrgica indubitável.', '67.79(a)(4)', 'congenita', 'congenitaCurada');
    else add('Cardiovascular', 'inapto', 'Cardiopatia congênita sem cura cirúrgica indubitável.', '67.79(a)(4)', 'congenita', 'congenitaCurada');
  }
  if (sim('arritmia') || sim('bloqueio')) {
    const nome = sim('arritmia') && sim('bloqueio') ? 'Arritmia e bloqueio' : sim('arritmia') ? 'Arritmia' : 'Bloqueio de condução';
    if (sim('arritmiaInvestigada')) add('Cardiovascular', 'julgamento', `${nome} com investigação favorável: apto a critério do examinador.`, '67.79(g)', 'arritmia', 'bloqueio', 'arritmiaInvestigada');
    else add('Cardiovascular', 'inapto', `${nome} sem investigação que mostre baixa probabilidade de afetar o voo.`, '67.79(a)(7) e (g)', 'arritmia', 'bloqueio', 'arritmiaInvestigada');
  }
  if (sim('preExc')) {
    const m = num(v, 'ablacaoMeses');
    if (sim('ablacao') && m !== undefined && m >= 3 && sim('reestudo')) add('Cardiovascular', 'ok', `Pré-excitação tratada por ablação há ${m} meses (≥ 3), sem conexão anômala no reestudo.`, '67.79(a)(12)', 'preExc', 'ablacao', 'ablacaoMeses', 'reestudo');
    else add('Cardiovascular', 'inapto', 'Pré-excitação sem ablação há pelo menos 3 meses com reestudo normal.', '67.79(a)(12)', 'preExc', 'ablacao', 'ablacaoMeses', 'reestudo');
  }
  if (sim('prolapso') && nao('prolapsoSintomas') && nao('prolapsoArritmia') && nao('prolapsoDoenca') && sim('prolapsoErgo') && sim('prolapsoHolter') && sim('prolapsoEco'))
    add('Cardiovascular', 'ok', 'Prolapso mitral assintomático, sem arritmia nem doença associada, com exames satisfatórios.', '67.79(a)(13)', 'prolapso');

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
  const ref = sim('refrativa') ? num(v, 'refrativaMeses') : undefined;
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
    else if (sim('fala') || sim('voz')) add('Auditivo', 'ok', `Audiometria fora do limite, compensada ${sim('fala') ? 'pela discriminação da fala em ruído' : 'pelo teste de voz a 2 metros'}.`, '67.101(b)', ...ouv, 'fala', 'voz');
    else if (!dir && !esq) {
      add('Auditivo', 'restricao', 'Perda nas duas orelhas sem compensação no teste de fala.', '67.101(e)', ...ouv, 'fala', 'voz');
      restricoes.push('Não válido para voos com comunicação bilateral por rádio, nem para atuar como comissário.');
    } else if (!ctx.inicial) add('Auditivo', 'ok', `Perda só na orelha ${dir ? 'esquerda' : 'direita'}: na revalidação, basta uma orelha dentro do limite.`, '67.101(d)', ...ouv);
    else add('Auditivo', 'julgamento', `Perda só na orelha ${dir ? 'esquerda' : 'direita'} no exame inicial: fazer o teste de discriminação da fala.`, '67.101(b)', ...ouv, 'fala', 'voz');
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
