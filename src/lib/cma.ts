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

// Campos do formulário, separados por sistema.
export type Campo =
  | { id: string; tipo: 'num'; rotulo: string; placeholder: string; unidade?: string }
  | { id: string; tipo: 'sn'; rotulo: string };

export const SISTEMAS: { id: string; nome: string; ref: string; campos: Campo[] }[] = [
  {
    id: 'vitais',
    nome: 'Sinais vitais e medidas',
    ref: '67.79 · 67.85',
    campos: [
      { id: 'pas', tipo: 'num', rotulo: 'Pressão sistólica', placeholder: 'ex.: 120', unidade: 'mmHg' },
      { id: 'pad', tipo: 'num', rotulo: 'Pressão diastólica', placeholder: 'ex.: 80', unidade: 'mmHg' },
      { id: 'antiHas', tipo: 'sn', rotulo: 'Usa anti-hipertensivo' },
      { id: 'peso', tipo: 'num', rotulo: 'Peso', placeholder: 'ex.: 78', unidade: 'kg' },
      { id: 'altura', tipo: 'num', rotulo: 'Altura', placeholder: 'ex.: 175', unidade: 'cm' },
    ],
  },
  {
    id: 'metabolico',
    nome: 'Metabólico e endócrino',
    ref: '67.85',
    campos: [
      { id: 'glicemia', tipo: 'num', rotulo: 'Glicemia de jejum', placeholder: 'ex.: 92', unidade: 'mg/dl' },
      { id: 'glicConfirmada', tipo: 'sn', rotulo: 'Valor alterado confirmado em 2 dosagens, em dias diferentes' },
      { id: 'insulina', tipo: 'sn', rotulo: 'Diabetes em uso de insulina' },
      { id: 'adoOral', tipo: 'sn', rotulo: 'Usa antidiabético oral' },
      { id: 'adoDias', tipo: 'num', rotulo: 'Dias de observação com glicemia entre 70 e 139', placeholder: 'ex.: 60', unidade: 'dias' },
    ],
  },
  {
    id: 'cardio',
    nome: 'Cardiovascular',
    ref: '67.79',
    campos: [
      { id: 'angina', tipo: 'sn', rotulo: 'Angina' },
      { id: 'iam', tipo: 'sn', rotulo: 'Infarto prévio' },
      { id: 'iamMeses', tipo: 'num', rotulo: 'Tempo desde o infarto', placeholder: 'ex.: 14', unidade: 'meses' },
      { id: 'revasc', tipo: 'sn', rotulo: 'Revascularização miocárdica' },
      { id: 'revascDias', tipo: 'num', rotulo: 'Tempo desde a revascularização', placeholder: 'ex.: 200', unidade: 'dias' },
      { id: 'valvar', tipo: 'sn', rotulo: 'Troca valvar' },
      { id: 'marcapasso', tipo: 'sn', rotulo: 'Marcapasso' },
      { id: 'arritmia', tipo: 'sn', rotulo: 'Arritmia significativa' },
      { id: 'prolapsoSint', tipo: 'sn', rotulo: 'Prolapso mitral sintomático' },
      { id: 'preExc', tipo: 'sn', rotulo: 'Pré-excitação ventricular' },
      { id: 'ablacaoMeses', tipo: 'num', rotulo: 'Tempo desde a ablação', placeholder: 'ex.: 4', unidade: 'meses' },
    ],
  },
  {
    id: 'pneumo',
    nome: 'Respiratório',
    ref: '67.81',
    campos: [
      { id: 'asma', tipo: 'sn', rotulo: 'Asma' },
      { id: 'tb', tipo: 'sn', rotulo: 'Tuberculose ativa' },
      { id: 'hp', tipo: 'sn', rotulo: 'Hipertensão pulmonar' },
      { id: 'neoTorax', tipo: 'sn', rotulo: 'Neoplasia torácica' },
    ],
  },
  {
    id: 'hemato',
    nome: 'Hematológico',
    ref: '67.87',
    campos: [{ id: 'cumarinico', tipo: 'sn', rotulo: 'Anticoagulação com cumarínico' }],
  },
  {
    id: 'neuro',
    nome: 'Neurológico',
    ref: '67.77',
    campos: [
      { id: 'epilepsia', tipo: 'sn', rotulo: 'Epilepsia' },
      { id: 'eeg', tipo: 'sn', rotulo: 'EEG com elementos epileptiformes' },
      { id: 'perdaConsc', tipo: 'sn', rotulo: 'Perda de consciência única, sem causa definida' },
      { id: 'tce', tipo: 'sn', rotulo: 'Traumatismo craniano com sequela' },
    ],
  },
  {
    id: 'mental',
    nome: 'Mental e comportamental',
    ref: '67.75',
    campos: [
      { id: 'substancia', tipo: 'sn', rotulo: 'Transtorno por uso de substância' },
      { id: 'antidep', tipo: 'sn', rotulo: 'Usa antidepressivo' },
      { id: 'parecerPsiq', tipo: 'sn', rotulo: 'Parecer psiquiátrico favorável' },
    ],
  },
  {
    id: 'obst',
    nome: 'Obstétrico',
    ref: '67.93',
    campos: [{ id: 'gestacao', tipo: 'sn', rotulo: 'Gestação confirmada' }],
  },
  {
    id: 'visao',
    nome: 'Oftalmológico',
    ref: '67.99',
    campos: [
      { id: 'avOD', tipo: 'num', rotulo: 'Acuidade de longe, olho direito', placeholder: '20/__ (ex.: 25)', unidade: '20/x' },
      { id: 'avOE', tipo: 'num', rotulo: 'Acuidade de longe, olho esquerdo', placeholder: '20/__ (ex.: 25)', unidade: '20/x' },
      { id: 'avBin', tipo: 'num', rotulo: 'Acuidade binocular', placeholder: '20/__ (ex.: 20)', unidade: '20/x' },
      { id: 'correcao', tipo: 'sn', rotulo: 'Atinge os valores com correção óptica' },
      { id: 'perto', tipo: 'sn', rotulo: 'Lê J1 a 30–50 cm e J6 a 100 cm' },
      { id: 'cores', tipo: 'sn', rotulo: 'Reconhece as cores básicas da aviação' },
      { id: 'hiperforia', tipo: 'num', rotulo: 'Hiperforia', placeholder: 'ex.: 0,5', unidade: 'DP' },
      { id: 'exoforia', tipo: 'num', rotulo: 'Exoforia', placeholder: 'ex.: 2', unidade: 'DP' },
      { id: 'esoforia', tipo: 'num', rotulo: 'Esoforia', placeholder: 'ex.: 4', unidade: 'DP' },
      { id: 'heterotropia', tipo: 'sn', rotulo: 'Heterotropia' },
      { id: 'refrativaMeses', tipo: 'num', rotulo: 'Tempo desde a cirurgia refrativa (vazio se não fez)', placeholder: 'ex.: 9', unidade: 'meses' },
      { id: 'lenteMulti', tipo: 'sn', rotulo: 'Usa lente de contato multifocal' },
    ],
  },
  {
    id: 'audicao',
    nome: 'Auditivo',
    ref: '67.101',
    campos: [
      { id: 'od500', tipo: 'num', rotulo: 'Orelha direita 500 Hz', placeholder: 'ex.: 15', unidade: 'dB' },
      { id: 'od1000', tipo: 'num', rotulo: 'Orelha direita 1.000 Hz', placeholder: 'ex.: 15', unidade: 'dB' },
      { id: 'od2000', tipo: 'num', rotulo: 'Orelha direita 2.000 Hz', placeholder: 'ex.: 20', unidade: 'dB' },
      { id: 'od3000', tipo: 'num', rotulo: 'Orelha direita 3.000 Hz', placeholder: 'ex.: 25', unidade: 'dB' },
      { id: 'oe500', tipo: 'num', rotulo: 'Orelha esquerda 500 Hz', placeholder: 'ex.: 15', unidade: 'dB' },
      { id: 'oe1000', tipo: 'num', rotulo: 'Orelha esquerda 1.000 Hz', placeholder: 'ex.: 15', unidade: 'dB' },
      { id: 'oe2000', tipo: 'num', rotulo: 'Orelha esquerda 2.000 Hz', placeholder: 'ex.: 20', unidade: 'dB' },
      { id: 'oe3000', tipo: 'num', rotulo: 'Orelha esquerda 3.000 Hz', placeholder: 'ex.: 25', unidade: 'dB' },
      { id: 'fala', tipo: 'sn', rotulo: 'Aprovado no teste de discriminação da fala' },
    ],
  },
  {
    id: 'orl',
    nome: 'Otorrinolaringológico',
    ref: '67.97',
    campos: [
      { id: 'tuba', tipo: 'sn', rotulo: 'Obstrução permanente da tuba auditiva' },
      { id: 'vestibular', tipo: 'sn', rotulo: 'Distúrbio vestibular' },
    ],
  },
  {
    id: 'odonto',
    nome: 'Odontológico',
    ref: '67.103',
    campos: [{ id: 'dentes', tipo: 'sn', rotulo: 'Dentição insuficiente ou cárie profunda' }],
  },
];

// Campos numéricos que precisam estar preenchidos para fechar o julgamento.
const OBRIGATORIOS = ['pas', 'pad', 'peso', 'altura', 'glicemia', 'avOD', 'avOE', 'avBin', 'od500', 'od1000', 'od2000', 'od3000', 'oe500', 'oe1000', 'oe2000', 'oe3000'];

export type Valores = Record<string, string | boolean | undefined>;
export type Nivel = 'inapto' | 'restricao' | 'julgamento' | 'confirmar' | 'ok';
export interface Achado { sistema: string; nivel: Nivel; texto: string; ref: string }
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

function num(v: Valores, id: string): number | undefined {
  const s = v[id];
  if (typeof s !== 'string' || !s.trim()) return undefined;
  const n = Number(s.replace(',', '.'));
  return Number.isFinite(n) ? n : undefined;
}

const sim = (v: Valores, id: string) => v[id] === true;
const nao = (v: Valores, id: string) => v[id] === false;

function rotuloCampo(id: string) {
  for (const s of SISTEMAS) for (const c of s.campos) if (c.id === id) return c.rotulo;
  return id;
}

function somarMeses(meses: number) {
  const d = new Date();
  d.setMonth(d.getMonth() + meses);
  return d.toLocaleDateString('pt-BR');
}

export function avaliar(classe: ClasseCMA, funcao: string, idade: number | undefined, publico: boolean, v: Valores): Resultado {
  const a: Achado[] = [];
  const restricoes: string[] = [];
  let validadeMax: number | undefined;
  const add = (sistema: string, nivel: Nivel, texto: string, ref: string) => a.push({ sistema, nivel, texto, ref });

  // Sinais vitais
  const pas = num(v, 'pas');
  const pad = num(v, 'pad');
  if (pas !== undefined && pad !== undefined) {
    if (pas > 140 || pad > 90) add('Cardiovascular', 'inapto', `PA ${pas}×${pad} mmHg, acima de 140×90 (exige pressão sustentada: repita as medidas).`, '67.79(a)');
    else add('Cardiovascular', 'ok', `PA ${pas}×${pad} mmHg, dentro do limite de 140×90.`, '67.79(a)');
  }
  if (sim(v, 'antiHas')) add('Cardiovascular', 'julgamento', 'Anti-hipertensivo: permitido a critério do examinador, com PA controlada e sem efeitos que afetem o voo.', '67.79');

  const peso = num(v, 'peso');
  const alt = num(v, 'altura');
  if (peso && alt) {
    const imc = peso / (alt / 100) ** 2;
    const t = `IMC ${imc.toFixed(1).replace('.', ',')} kg/m²`;
    if (imc >= 40) add('Metabólico', 'inapto', `${t}: obesidade com IMC ≥ 40.`, '67.85(a)(2)');
    else add('Metabólico', 'ok', `${t}, abaixo de 40.`, '67.85(a)(2)');
  }

  // Metabólico
  const gli = num(v, 'glicemia');
  if (gli !== undefined) {
    if (gli < 50 || gli > 140) {
      if (sim(v, 'glicConfirmada')) add('Metabólico', 'inapto', `Glicemia ${gli} mg/dl, fora de 50–140, confirmada em 2 dosagens.`, '67.85(d)');
      else add('Metabólico', 'julgamento', `Glicemia ${gli} mg/dl, fora de 50–140: repetir em 2 dosagens, em dias diferentes, antes de concluir.`, '67.85(d)');
    } else if (gli < 70 || gli >= 115) add('Metabólico', 'julgamento', `Glicemia ${gli} mg/dl, na faixa 50–69 ou 115–139: aceitável a critério do examinador ou da ANAC.`, '67.85(e)');
    else add('Metabólico', 'ok', `Glicemia ${gli} mg/dl, normal.`, '67.85');
  }
  if (sim(v, 'insulina')) add('Metabólico', 'inapto', 'Diabetes em uso de insulina.', '67.85');
  if (sim(v, 'adoOral')) {
    const dias = num(v, 'adoDias');
    if (dias !== undefined && dias >= 60) {
      add('Metabólico', 'restricao', `Antidiabético oral com ${dias} dias de controle entre 70 e 139 mg/dl: apto, com validade de até 6 meses.`, '67.85(f)');
      validadeMax = Math.min(validadeMax ?? 99, 6);
    } else add('Metabólico', 'inapto', 'Antidiabético oral sem 60 dias de observação com glicemia entre 70 e 139 mg/dl.', '67.85(f)');
  }

  // Cardiovascular
  if (sim(v, 'angina')) add('Cardiovascular', 'inapto', 'Angina.', '67.79');
  if (sim(v, 'iam')) {
    const m = num(v, 'iamMeses');
    if (m !== undefined && m >= 12) {
      add('Cardiovascular', 'restricao', `Infarto há ${m} meses (≥ 1 ano), com exames complementares favoráveis: apto com restrição, validade de até 6 meses.`, '67.79(b)');
      validadeMax = Math.min(validadeMax ?? 99, 6);
    } else add('Cardiovascular', 'inapto', 'Infarto há menos de 1 ano (ou tempo não informado).', '67.79(b)');
  }
  if (sim(v, 'revasc')) {
    const d = num(v, 'revascDias');
    if (d !== undefined && d >= 180) {
      add('Cardiovascular', 'restricao', `Revascularização há ${d} dias (≥ 180), com exames favoráveis: apto com restrição, validade de até 6 meses.`, '67.79(b)');
      validadeMax = Math.min(validadeMax ?? 99, 6);
    } else add('Cardiovascular', 'inapto', 'Revascularização há menos de 180 dias (ou tempo não informado).', '67.79(b)');
  }
  if (sim(v, 'valvar')) add('Cardiovascular', 'inapto', 'Troca valvar.', '67.79');
  if (sim(v, 'marcapasso')) add('Cardiovascular', 'inapto', 'Marcapasso.', '67.79');
  if (sim(v, 'arritmia')) add('Cardiovascular', 'inapto', 'Arritmia significativa.', '67.79');
  if (sim(v, 'prolapsoSint')) add('Cardiovascular', 'inapto', 'Prolapso mitral sintomático (o assintomático é compatível).', '67.79');
  if (sim(v, 'preExc')) {
    const m = num(v, 'ablacaoMeses');
    if (m !== undefined && m >= 3) add('Cardiovascular', 'ok', `Pré-excitação tratada por ablação há ${m} meses (≥ 3).`, '67.79');
    else add('Cardiovascular', 'inapto', 'Pré-excitação sem ablação há pelo menos 3 meses.', '67.79');
  }

  // Respiratório, hematológico, neurológico, mental, obstétrico
  const simples: [string, string, string, string][] = [
    ['asma', 'Respiratório', 'Asma.', '67.81'],
    ['tb', 'Respiratório', 'Tuberculose ativa.', '67.81'],
    ['hp', 'Respiratório', 'Hipertensão pulmonar.', '67.81'],
    ['neoTorax', 'Respiratório', 'Neoplasia torácica.', '67.81'],
    ['cumarinico', 'Hematológico', 'Anticoagulação com cumarínico.', '67.87'],
    ['epilepsia', 'Neurológico', 'Epilepsia.', '67.77'],
    ['eeg', 'Neurológico', 'EEG com elementos epileptiformes.', '67.77'],
    ['tce', 'Neurológico', 'Traumatismo craniano com sequela.', '67.77'],
    ['substancia', 'Mental', 'Transtorno por uso de substância.', '67.75'],
    ['gestacao', 'Obstétrico', 'Gestação confirmada: não apta enquanto durar.', '67.93'],
    ['tuba', 'ORL', 'Obstrução permanente da tuba auditiva.', '67.97'],
    ['vestibular', 'ORL', 'Distúrbio vestibular.', '67.97'],
    ['dentes', 'Odontológico', 'Dentição insuficiente ou cárie profunda.', '67.103'],
    ['heterotropia', 'Oftalmológico', 'Heterotropia.', '67.99(c)(7)'],
    ['lenteMulti', 'Oftalmológico', 'Lente de contato multifocal: só é aceita a monofocal.', '67.99'],
  ];
  for (const [id, s, t, r] of simples) if (sim(v, id)) add(s, 'inapto', t, r);
  if (sim(v, 'perdaConsc')) add('Neurológico', 'julgamento', 'Perda de consciência única: julgamento conjunto com a ANAC.', '67.77');
  if (sim(v, 'antidep')) {
    if (sim(v, 'parecerPsiq')) add('Mental', 'julgamento', 'Antidepressivo com parecer psiquiátrico favorável: decisão do examinador.', '67.75');
    else add('Mental', 'inapto', 'Antidepressivo sem parecer psiquiátrico favorável.', '67.75');
  }

  // Oftalmológico
  const od = num(v, 'avOD');
  const oe = num(v, 'avOE');
  const bin = num(v, 'avBin');
  if (od !== undefined && oe !== undefined && bin !== undefined) {
    const falhas = [od > 30 && `OD 20/${od}`, oe > 30 && `OE 20/${oe}`, bin > 20 && `binocular 20/${bin}`].filter(Boolean);
    if (falhas.length) add('Oftalmológico', 'inapto', `Acuidade abaixo do exigido (${falhas.join(', ')}); mínimo 20/30 em cada olho e 20/20 binocular.`, '67.99(c)(1)');
    else add('Oftalmológico', 'ok', `Acuidade OD 20/${od}, OE 20/${oe}, binocular 20/${bin}.`, '67.99(c)(1)');
    if (!falhas.length && sim(v, 'correcao')) restricoes.push('Uso obrigatório de correção óptica em voo, com óculos reserva a bordo.');
  }
  if (nao(v, 'perto')) add('Oftalmológico', 'inapto', 'Não lê J1 a 30–50 cm e J6 a 100 cm.', '67.99(c)(2)');
  if (nao(v, 'cores')) add('Oftalmológico', 'inapto', 'Não reconhece as cores básicas da aviação. Possibilidade de restrição: [confirmar na referência].', '67.99(c)(5)');
  const hip = num(v, 'hiperforia');
  const exo = num(v, 'exoforia');
  const eso = num(v, 'esoforia');
  if ((hip ?? 0) > 1 || (exo ?? 0) > 5 || (eso ?? 0) > 10) add('Oftalmológico', 'inapto', 'Foria acima do limite (hiperforia ≤ 1, exoforia ≤ 5, esoforia ≤ 10 DP).', '67.99(c)(7)');
  else if (hip !== undefined || exo !== undefined || eso !== undefined) add('Oftalmológico', 'ok', 'Forias dentro dos limites.', '67.99(c)(7)');
  const ref = num(v, 'refrativaMeses');
  if (ref !== undefined) {
    if (ref <= 6) add('Oftalmológico', 'inapto', `Cirurgia refrativa há ${ref} meses: exige mais de 6. Reavaliar depois do prazo.`, '67.99');
    else add('Oftalmológico', 'ok', `Cirurgia refrativa há ${ref} meses (> 6).`, '67.99');
  }

  // Auditivo
  const orelha = (lado: 'od' | 'oe') => {
    const f = [num(v, `${lado}500`), num(v, `${lado}1000`), num(v, `${lado}2000`), num(v, `${lado}3000`)];
    if (f.some((x) => x === undefined)) return undefined;
    return f[0]! <= 35 && f[1]! <= 35 && f[2]! <= 35 && f[3]! <= 50;
  };
  const dir = orelha('od');
  const esq = orelha('oe');
  if (dir !== undefined && esq !== undefined) {
    if (dir && esq) add('Auditivo', 'ok', 'Audiometria dentro dos limites nas duas orelhas.', '67.101(a)');
    else if (sim(v, 'fala')) add('Auditivo', 'ok', 'Audiometria fora do limite, compensada por teste de discriminação da fala aprovado.', '67.101');
    else if (!dir && !esq) {
      add('Auditivo', 'restricao', 'Perda nas duas orelhas sem compensação no teste de fala.', '67.101');
      restricoes.push('Não pode voar onde o uso do rádio é obrigatório nas duas vias, nem atuar como comissário.');
    } else add('Auditivo', 'julgamento', `Perda só na orelha ${dir ? 'esquerda' : 'direita'}: fazer o teste de discriminação da fala. Conduta: [confirmar na referência].`, '67.101');
  }

  for (const x of a) if (x.nivel === 'restricao' && x.texto.includes('6 meses')) restricoes.push('Validade reduzida a até 6 meses por condição clínica em acompanhamento.');

  // Classes sem limiares consultados: os critérios da 1ª classe servem de referência, e o que não passar vira "confirmar".
  if (classe !== '1') for (const x of a) if (x.nivel === 'inapto' || x.nivel === 'restricao') x.nivel = 'confirmar';

  const pendentes = OBRIGATORIOS.filter((id) => num(v, id) === undefined).map(rotuloCampo);
  if (idade === undefined) pendentes.unshift('Idade');

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
  const lista = (n: Nivel) => a.filter((x) => x.nivel === n).map((x) => `${x.texto.replace(/\.$/, '')} (RBAC 67.${x.ref.replace('67.', '')})`);
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
    if (inaptos.length === 0 && conf.length === 0) p.push('Nenhum critério de inaptidão apareceu entre os itens já preenchidos.');
  } else if (ver === 'confirmar') {
    p.push(`Para a ${classe}ª classe, os limiares específicos não foram consultados no texto integral do RBAC 67. Os itens a seguir não atendem ao critério da 1ª classe, usado aqui como referência, e precisam ser conferidos na subparte da classe: ${conf.join('; ')}.`);
  } else if (ver === 'restricao') {
    p.push(`Candidato apto com restrição para a ${classe}ª classe. Todos os requisitos avaliados foram cumpridos${restr.length ? `, com condições que exigem acompanhamento: ${restr.join('; ')}` : ''}.`);
    if (restricoes.length) p.push(`Restrições a anotar no CMA: ${restricoes.join(' ')}`);
  } else {
    p.push(`Candidato apto para a ${classe}ª classe: ${oks ? 'todos os parâmetros avaliados estão' : 'os parâmetros avaliados estão'} dentro dos limites do RBAC 67 e nenhuma condição de inaptidão foi declarada.`);
  }
  if (julg.length && ver !== 'inapto') p.push(`Pontos que dependem do julgamento do examinador e podem mudar o resultado: ${julg.join('; ')}.`);
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
