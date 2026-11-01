// Exame CMA · as mesmas respostas julgadas também pela FAA (14 CFR Part 67) e pela ICAO (Anexo 1, Capítulo 6).
// O formulário segue o RBAC 67 (ANAC); aqui entram só as regras que a FAA e a ICAO escrevem de forma diferente.
// Onde a norma estrangeira não tem regra específica, o achado da ANAC vira "julgamento" pelo critério geral dela.
//
// REGISTRO DE FONTES (não aparece no app)
// FAA
// - 14 CFR 67.103/.203 (1ª e 2ª classe): longe 20/20 em cada olho, com ou sem correção; perto 20/40 a 16 pol.; aos
//   50 anos ou mais, 20/40 a 32 pol.; cores; forias: hiperforia > 1 DP ou eso/exoforia > 6 DP pedem avaliação do
//   especialista. 67.303 (3ª classe): longe 20/40 em cada olho. Gleim FAR/AIM, Part 67 Subpart B; FAA, Synopsis of
//   Medical Standards (12/2022).
// - 67.105: voz de conversa a 6 pés (1,8 m), de costas, com os dois ouvidos; ou discriminação da fala ≥ 70%; ou
//   audiometria tonal sem aparelho: melhor ouvido 35/30/30/40 dB e pior ouvido 35/50/50/60 dB em 500/1.000/2.000/
//   3.000 Hz.
// - 67.107: psicose, transtorno bipolar, transtorno de personalidade grave com atos repetidos, dependência de
//   substância (salvo 2 anos de abstinência aceitos pela FAA), abuso de substância nos últimos 2 anos.
// - 67.109: epilepsia, distúrbio de consciência sem explicação, perda transitória de controle neurológico sem
//   explicação. 67.111: infarto, angina, doença coronariana tratada ou sintomática, troca de válvula, marcapasso
//   definitivo, transplante cardíaco; ECG na 1ª classe: no primeiro exame após os 35 anos e anualmente após os 40.
//   67.113: diabetes que exige insulina ou outro hipoglicemiante. Todos desqualificam, salvo emissão especial da FAA.
// - Pressão: a regra não fixa número; limite do Guia do AME: 155/95 mmHg no exame (FAA, Hypertension FAQs, 2015).
// - Validade (14 CFR 61.23(d)): 1ª classe (PLA) 12 meses abaixo dos 40 e 6 meses a partir dos 40; 2ª classe
//   (comercial) 12 meses; 3ª classe (privado) 60 meses abaixo dos 40 e 24 a partir dos 40 (FR 2008-07-24, E8-16911;
//   NBAA). Engenheiro de voo: 2ª classe (14 CFR 63.31).
// ICAO
// - Visão de longe, com ou sem correção: Classe 1 e 3, 6/9 (20/30) em cada olho e 6/6 (20/20) binocular; Classe 2,
//   6/12 (20/40) em cada olho e 6/9 (20/30) binocular (ICAO, Aviation Medicine FAQ; NZ CAA, 67.103/67.107).
// - Audição: Classe 1 e 3, audiometria sem perda acima de 35 dB em 500, 1.000 e 2.000 Hz nem de 50 dB em 3.000 Hz,
//   em cada ouvido; Classe 2, voz de conversa a 2 m, de costas (síntese do Anexo 1, LegalClarity; mesmos valores do
//   RBAC 67.101) [conferir no texto do Anexo 1].
// - Pressão arterial: o Anexo 1 não fixa número.
// - Validade (Anexo 1, 1.2.5.2, reproduzido pela CAA do Sri Lanka): Classe 1, 12 meses; 6 meses a partir dos 40 em
//   operação comercial de passageiros com um só piloto e a partir dos 60 no transporte aéreo comercial. Classe 2,
//   60 meses; 24 a partir dos 40 e 12 a partir dos 50. Classe 3 (controlador), 48 meses; 24 a partir dos 40 e 12 a
//   partir dos 50. Comissário não tem avaliação médica no Anexo 1.

import { num, SISTEMAS, type Achado, type Nivel, type Resultado, type Valores, type Veredito } from '@/lib/cma';

export type Autoridade = 'faa' | 'icao';

export interface Equivalente {
  aplica: boolean;
  classe: string; // ex.: "1ª classe (14 CFR 67 Subparte B)"
  nota?: string;
  validade?: { meses: number; regra: string };
}

export interface ResultadoInt {
  autoridade: Autoridade;
  norma: string;
  eq: Equivalente;
  veredito: Veredito;
  achados: Achado[];
}

// ---------------------------------------------------------------- Classe equivalente e validade
export function equivalenteFAA(funcao: string, idade: number | undefined): Equivalente {
  const i = idade ?? 0;
  switch (funcao) {
    case 'pla-multi':
    case 'pla-unico':
      return {
        aplica: true,
        classe: '1ª classe',
        nota: 'Nos EUA, o piloto comercial pode voar com a 2ª classe; a 1ª é exigida do piloto de linha aérea.',
        validade: i >= 40 ? { meses: 6, regra: '1ª classe (PLA) a partir dos 40 anos: 6 meses (14 CFR 61.23).' } : { meses: 12, regra: '1ª classe (PLA) abaixo dos 40 anos: 12 meses (14 CFR 61.23).' },
      };
    case 'mecanico':
      return { aplica: true, classe: '2ª classe', nota: 'Engenheiro de voo: 2ª classe (14 CFR 63.31).', validade: { meses: 12, regra: '2ª classe: 12 meses (14 CFR 61.23).' } };
    case 'pp':
      return {
        aplica: true,
        classe: '3ª classe',
        nota: 'Vale para o piloto privado de avião. Para balão livre, a FAA não exige certificado médico.',
        validade: i >= 40 ? { meses: 24, regra: '3ª classe a partir dos 40 anos: 24 meses (14 CFR 61.23).' } : { meses: 60, regra: '3ª classe abaixo dos 40 anos: 60 meses (14 CFR 61.23).' },
      };
    case 'leve':
      return { aplica: false, classe: 'Sem equivalente direto', nota: 'Planador e aeronave leve esportiva têm regras próprias na FAA [confirmar na referência].' };
    case 'comissario':
      return { aplica: false, classe: 'Sem certificado médico', nota: 'A FAA não exige certificado médico de comissário de voo.' };
    default:
      return { aplica: false, classe: 'Sem equivalente direto', nota: 'Piloto remoto: [confirmar na referência].' };
  }
}

export function equivalenteICAO(funcao: string, idade: number | undefined, publico: boolean): Equivalente {
  const i = idade ?? 0;
  switch (funcao) {
    case 'pla-multi':
      return {
        aplica: true,
        classe: 'Classe 1',
        validade: publico && i >= 60 ? { meses: 6, regra: 'Classe 1 no transporte aéreo comercial a partir dos 60 anos: 6 meses (Anexo 1, 1.2.5.2).' } : { meses: 12, regra: 'Classe 1: 12 meses (Anexo 1, 1.2.5.2).' },
      };
    case 'pla-unico':
      return {
        aplica: true,
        classe: 'Classe 1',
        validade: i >= 40 ? { meses: 6, regra: 'Classe 1 com um só piloto em transporte comercial de passageiros a partir dos 40 anos: 6 meses (Anexo 1, 1.2.5.2).' } : { meses: 12, regra: 'Classe 1: 12 meses (Anexo 1, 1.2.5.2).' },
      };
    case 'pp':
    case 'mecanico':
    case 'leve':
      return {
        aplica: true,
        classe: 'Classe 2',
        validade: i >= 50 ? { meses: 12, regra: 'Classe 2 a partir dos 50 anos: 12 meses (Anexo 1, 1.2.5.2).' } : i >= 40 ? { meses: 24, regra: 'Classe 2 a partir dos 40 anos: 24 meses (Anexo 1, 1.2.5.2).' } : { meses: 60, regra: 'Classe 2: 60 meses (Anexo 1, 1.2.5.2).' },
      };
    case 'comissario':
      return { aplica: false, classe: 'Sem avaliação médica', nota: 'O Anexo 1 não prevê avaliação médica para comissário de voo.' };
    default:
      return { aplica: false, classe: 'Sem equivalente direto', nota: 'Piloto remoto: [confirmar na referência].' };
  }
}

// ---------------------------------------------------------------- Regras de cada pergunta (mostradas no formulário)
// Só onde a FAA ou a ICAO dizem algo diferente do RBAC 67 ou com número próprio.
export const REGRAS_INT: Record<string, { faa?: string; icao?: string }> = {
  pas: { faa: 'Até 155×95 mmHg no exame (Guia do AME).', icao: 'O Anexo 1 não fixa número.' },
  pad: { faa: 'Até 155×95 mmHg no exame (Guia do AME).', icao: 'O Anexo 1 não fixa número.' },
  insulina: { faa: 'Diabetes com insulina desqualifica, salvo emissão especial (67.113).' },
  adoOral: { faa: 'Diabetes com hipoglicemiante oral desqualifica, salvo emissão especial (67.113).' },
  avOD: { faa: '1ª e 2ª classe: 20/20 em cada olho; 3ª classe: 20/40 (67.103).', icao: 'Classe 1: 20/30 em cada olho; Classe 2: 20/40.' },
  avOE: { faa: '1ª e 2ª classe: 20/20 em cada olho; 3ª classe: 20/40 (67.103).', icao: 'Classe 1: 20/30 em cada olho; Classe 2: 20/40.' },
  avBin: { faa: 'Não há exigência binocular separada.', icao: 'Classe 1: 20/20 binocular; Classe 2: 20/30.' },
  pertoJ1: { faa: 'Perto: 20/40 a 16 polegadas (cerca de 40 cm); a partir dos 50 anos, também a 32 polegadas (1ª e 2ª classe).' },
  hiperforia: { faa: 'Acima de 1 DP: avaliação do especialista, sem desqualificar por si (67.103).' },
  exoforia: { faa: 'Acima de 6 DP: avaliação do especialista, sem desqualificar por si (67.103).' },
  esoforia: { faa: 'Acima de 6 DP: avaliação do especialista, sem desqualificar por si (67.103).' },
  od500: { faa: 'Melhor ouvido 35/30/30/40 dB e pior ouvido 35/50/50/60 dB em 500/1.000/2.000/3.000 Hz (67.105).', icao: 'Classe 1: até 35 dB em 500, 1.000 e 2.000 Hz e 50 dB em 3.000 Hz, em cada ouvido. Classe 2: voz de conversa a 2 m.' },
  voz: { faa: 'Voz de conversa a 6 pés (1,8 m), de costas, com os dois ouvidos, substitui a audiometria (67.105).', icao: 'Classe 2: voz de conversa a 2 m, de costas.' },
  fala: { faa: 'Discriminação da fala de 70% ou mais num ouvido substitui a audiometria tonal (67.105).' },
  angina: { faa: 'Desqualifica, salvo emissão especial (67.111).' },
  iam: { faa: 'Infarto desqualifica, salvo emissão especial (67.111); não há o prazo de 1 ano do RBAC.' },
  revasc: { faa: 'Doença coronariana tratada desqualifica, salvo emissão especial (67.111).' },
  angioplastia: { faa: 'Doença coronariana tratada desqualifica, salvo emissão especial (67.111).' },
  trocaValvar: { faa: 'Desqualifica, salvo emissão especial (67.111).' },
  marcapasso: { faa: 'Marcapasso definitivo desqualifica, salvo emissão especial (67.111).' },
  transplanteCardiaco: { faa: 'Desqualifica, salvo emissão especial (67.111).' },
  epilepsia: { faa: 'Desqualifica (67.109).' },
  consciencia: { faa: 'Distúrbio de consciência sem explicação desqualifica (67.109).' },
  perdaConsc: { faa: 'Distúrbio de consciência sem explicação desqualifica (67.109).' },
  funcaoNeuro: { faa: 'Perda transitória de controle neurológico sem explicação desqualifica (67.109).' },
  psicose: { faa: 'Psicose desqualifica (67.107).' },
  humor: { faa: 'Transtorno bipolar desqualifica (67.107); depressão é julgada caso a caso.' },
  personalidade: { faa: 'Só o transtorno grave, com atos repetidos, desqualifica (67.107).' },
  alcool: { faa: 'Dependência desqualifica, salvo 2 anos de abstinência aceitos pela FAA; abuso nos últimos 2 anos desqualifica (67.107).' },
  substancia: { faa: 'Dependência desqualifica, salvo 2 anos de abstinência aceitos pela FAA; abuso nos últimos 2 anos desqualifica (67.107).' },
  antidep: { faa: 'Antidepressivo: julgado pela FAA caso a caso.' },
};

// ---------------------------------------------------------------- Julgamento
const NOMES_SISTEMA = Object.fromEntries(SISTEMAS.map((s) => [s.id, s.nome]));
const achado = (sistema: string, nivel: Nivel, texto: string, ref: string, campos: string[]): Achado => ({ sistema: NOMES_SISTEMA[sistema] ?? sistema, nivel, texto, ref, campos });
const sim = (v: Valores, id: string) => v[id] === true;

// Campos que a FAA ou a ICAO julgam por regra própria; os demais seguem o achado da ANAC pelo critério geral.
const PROPRIOS_FAA = new Set(['pas', 'pad', 'antiHas', 'insulina', 'adoOral', 'adoDias', 'glicemia', 'glicConfirmada', 'diabetesDieta', 'avOD', 'avOE', 'avBin', 'correcao', 'pertoJ1', 'distanciaJ6', 'cores', 'hiperforia', 'exoforia', 'esoforia', 'od500', 'od1000', 'od2000', 'od3000', 'oe500', 'oe1000', 'oe2000', 'oe3000', 'fala', 'voz', 'angina', 'iam', 'iamMeses', 'iamHolter', 'iamCintilo', 'iamEco', 'iamLipido', 'iamCate', 'iamPsiq', 'revasc', 'angioplastia', 'revascDias', 'revascHolter', 'revascCintilo', 'revascLipido', 'revascCate', 'trocaValvar', 'marcapasso', 'transplanteCardiaco', 'epilepsia', 'consciencia', 'perdaConsc', 'funcaoNeuro', 'psicose', 'humor', 'personalidade', 'alcool', 'substancia', 'antidep', 'parecerPsiq', 'cintura', 'peso', 'altura']);
const PROPRIOS_ICAO = new Set(['pas', 'pad', 'avOD', 'avOE', 'avBin', 'cores', 'od500', 'od1000', 'od2000', 'od3000', 'oe500', 'oe1000', 'oe2000', 'oe3000', 'fala', 'voz']);

function veredito(achados: Achado[], completo: boolean): Veredito {
  if (achados.some((a) => a.nivel === 'inapto')) return 'inapto';
  if (achados.some((a) => a.nivel === 'julgamento' || a.nivel === 'confirmar')) return 'confirmar';
  if (!completo) return 'incompleto';
  return 'apto';
}

// Achados da ANAC em sistemas sem regra própria da norma estrangeira: julgamento pelo critério geral.
function geraisDaAnac(anac: Resultado, proprios: Set<string>, ref: string, texto: string): Achado[] {
  return anac.achados
    .filter((a) => (a.nivel === 'inapto' || a.nivel === 'julgamento') && !a.campos.some((c) => proprios.has(c)))
    .map((a) => ({ ...a, nivel: 'julgamento' as Nivel, texto: `${a.texto} ${texto}`, ref }));
}

export function avaliarFAA(funcao: string, idade: number | undefined, v: Valores, anac: Resultado): ResultadoInt {
  const eq = equivalenteFAA(funcao, idade);
  const norma = '14 CFR Part 67';
  if (!eq.aplica) return { autoridade: 'faa', norma, eq, veredito: 'confirmar', achados: [] };
  const a: Achado[] = [];
  const terceira = eq.classe.startsWith('3');
  const ref = (s: string) => (terceira ? s.replace('67.1', '67.3') : s);

  // Pressão arterial: limite do Guia do AME.
  const pas = num(v, 'pas'), pad = num(v, 'pad');
  if (pas !== undefined && pad !== undefined && (pas > 155 || pad > 95)) a.push(achado('vitais', 'julgamento', `PA ${pas}×${pad} mmHg, acima de 155×95: o AME repete as medidas ou encaminha; não emite com a pressão acima do limite.`, 'Guia do AME', ['pas', 'pad']));
  // Diabetes com medicação.
  if (sim(v, 'insulina') || sim(v, 'adoOral')) a.push(achado('metabolico', 'inapto', 'Diabetes que exige hipoglicemiante: desqualifica, salvo emissão especial da FAA.', '67.113(a)', ['insulina', 'adoOral']));
  // Visão de longe, em cada olho.
  const lim = terceira ? 40 : 20;
  for (const [id, olho] of [['avOD', 'direito'], ['avOE', 'esquerdo']] as const) {
    const x = num(v, id);
    if (x !== undefined && x > lim) a.push(achado('visao', 'inapto', `Olho ${olho} 20/${x}: a ${eq.classe} exige 20/${lim} ou melhor em cada olho.`, ref('67.103(a)'), [id]));
  }
  if (v.pertoJ1 === false) a.push(achado('visao', 'confirmar', 'Não lê J1 a 30–50 cm: confirmar a exigência da FAA, 20/40 a 16 polegadas.', ref('67.103(b)'), ['pertoJ1']));
  if (v.cores === false) a.push(achado('visao', 'inapto', 'Não percebe as cores necessárias às funções a bordo.', ref('67.103(c)'), ['cores']));
  if (!terceira) {
    const h = num(v, 'hiperforia'), x = num(v, 'exoforia'), e = num(v, 'esoforia');
    if ((h !== undefined && h > 1) || (x !== undefined && x > 6) || (e !== undefined && e > 6)) a.push(achado('visao', 'julgamento', 'Foria acima de 1 DP de hiperforia ou de 6 DP de eso ou exoforia: a FAA pede avaliação do especialista.', '67.103(e)', ['hiperforia', 'exoforia', 'esoforia']));
  }
  // Audição: tabela de melhor e pior ouvido.
  const od = ['500', '1000', '2000', '3000'].map((f) => num(v, `od${f}`));
  const oe = ['500', '1000', '2000', '3000'].map((f) => num(v, `oe${f}`));
  if (od.every((x) => x !== undefined) && oe.every((x) => x !== undefined)) {
    const somaOd = od.reduce((s, x) => s! + x!, 0)!, somaOe = oe.reduce((s, x) => s! + x!, 0)!;
    const [melhor, pior] = somaOd <= somaOe ? [od, oe] : [oe, od];
    const ok = melhor.every((x, i) => x! <= [35, 30, 30, 40][i]) && pior.every((x, i) => x! <= [35, 50, 50, 60][i]);
    if (!ok && v.fala !== true) a.push(achado('audicao', 'inapto', 'Audiometria acima da tabela da FAA (melhor ouvido 35/30/30/40 dB; pior 35/50/50/60 dB), sem voz a 6 pés nem discriminação da fala de 70%.', ref('67.105(a)'), ['od500', 'oe500']));
    if (!ok && v.fala === true) a.push(achado('audicao', 'confirmar', 'Audiometria acima da tabela da FAA; a discriminação da fala pode compensar se for de 70% ou mais.', ref('67.105(a)'), ['fala']));
  }
  // Coração.
  const cardio: [string, string][] = [['angina', 'Angina.'], ['iam', 'Infarto do miocárdio.'], ['revasc', 'Doença coronariana tratada (revascularização).'], ['angioplastia', 'Doença coronariana tratada (angioplastia).'], ['trocaValvar', 'Troca de válvula cardíaca.'], ['marcapasso', 'Marcapasso definitivo.'], ['transplanteCardiaco', 'Transplante cardíaco.']];
  for (const [id, t] of cardio) if (sim(v, id)) a.push(achado('cardio', 'inapto', `${t} Desqualifica, salvo emissão especial da FAA.`, ref('67.111(a)'), [id]));
  // Neurológico.
  if (sim(v, 'epilepsia')) a.push(achado('neuro', 'inapto', 'Epilepsia.', ref('67.109(a)'), ['epilepsia']));
  if (sim(v, 'consciencia') || sim(v, 'perdaConsc')) a.push(achado('neuro', 'inapto', 'Distúrbio de consciência sem explicação satisfatória.', ref('67.109(a)'), ['consciencia', 'perdaConsc']));
  if (sim(v, 'funcaoNeuro')) a.push(achado('neuro', 'inapto', 'Perda transitória de controle neurológico sem explicação.', ref('67.109(a)'), ['funcaoNeuro']));
  // Mental.
  if (sim(v, 'psicose')) a.push(achado('mental', 'inapto', 'Psicose.', ref('67.107(a)'), ['psicose']));
  if (sim(v, 'humor')) a.push(achado('mental', 'julgamento', 'Transtorno do humor: o bipolar desqualifica; a depressão é julgada pela FAA.', ref('67.107'), ['humor']));
  if (sim(v, 'personalidade')) a.push(achado('mental', 'julgamento', 'Transtorno de personalidade: desqualifica se grave e com atos repetidos.', ref('67.107(a)'), ['personalidade']));
  if (sim(v, 'alcool') || sim(v, 'substancia')) a.push(achado('mental', 'inapto', 'Dependência ou abuso de substância: desqualifica, salvo 2 anos de abstinência aceitos pela FAA (dependência).', ref('67.107(a)–(b)'), ['alcool', 'substancia']));
  if (sim(v, 'antidep')) a.push(achado('mental', 'julgamento', 'Antidepressivo: julgado pela FAA caso a caso.', ref('67.107(c)'), ['antidep']));

  a.push(...geraisDaAnac(anac, PROPRIOS_FAA, ref('67.113(b)'), 'Sem regra específica na FAA: vale o critério geral.'));
  const completo = anac.veredito !== 'incompleto';
  return { autoridade: 'faa', norma, eq, veredito: veredito(a, completo), achados: a };
}

export function avaliarICAO(funcao: string, idade: number | undefined, publico: boolean, v: Valores, anac: Resultado): ResultadoInt {
  const eq = equivalenteICAO(funcao, idade, publico);
  const norma = 'Anexo 1, Cap. 6';
  if (!eq.aplica) return { autoridade: 'icao', norma, eq, veredito: 'confirmar', achados: [] };
  const a: Achado[] = [];
  const c2 = eq.classe === 'Classe 2';
  const [cada, bino] = c2 ? [40, 30] : [30, 20];
  for (const [id, olho] of [['avOD', 'direito'], ['avOE', 'esquerdo']] as const) {
    const x = num(v, id);
    if (x !== undefined && x > cada) a.push(achado('visao', 'inapto', `Olho ${olho} 20/${x}: a ${eq.classe} exige 20/${cada} ou melhor em cada olho.`, 'Anexo 1, Cap. 6', [id]));
  }
  const b = num(v, 'avBin');
  if (b !== undefined && b > bino) a.push(achado('visao', 'inapto', `Binocular 20/${b}: a ${eq.classe} exige 20/${bino} ou melhor.`, 'Anexo 1, Cap. 6', ['avBin']));
  if (v.cores === false) a.push(achado('visao', 'inapto', 'Não reconhece as cores exigidas.', 'Anexo 1, Cap. 6', ['cores']));
  if (c2) {
    if (v.voz === false) a.push(achado('audicao', 'inapto', 'A Classe 2 exige ouvir a voz de conversa a 2 m, de costas.', 'Anexo 1, Cap. 6', ['voz']));
  } else {
    const falha = (lado: 'od' | 'oe') => {
      const f = ['500', '1000', '2000', '3000'].map((x) => num(v, `${lado}${x}`));
      if (f.some((x) => x === undefined)) return undefined;
      return !(f[0]! <= 35 && f[1]! <= 35 && f[2]! <= 35 && f[3]! <= 50);
    };
    if (falha('od') || falha('oe')) a.push(achado('audicao', 'inapto', 'Audiometria acima de 35 dB em 500, 1.000 ou 2.000 Hz, ou de 50 dB em 3.000 Hz, num dos ouvidos.', 'Anexo 1, Cap. 6', ['od500', 'oe500']));
  }
  const pas = num(v, 'pas'), pad = num(v, 'pad');
  if (pas !== undefined && pad !== undefined && (pas > 140 || pad > 90)) a.push(achado('vitais', 'julgamento', `PA ${pas}×${pad} mmHg: o Anexo 1 não fixa número; o examinador julga.`, 'Anexo 1, Cap. 6', ['pas', 'pad']));

  a.push(...geraisDaAnac(anac, PROPRIOS_ICAO, 'Anexo 1, Cap. 6', 'O Anexo 1 não tem regra numérica para isso: vale o critério geral de aptidão.'));
  const completo = anac.veredito !== 'incompleto';
  return { autoridade: 'icao', norma, eq, veredito: veredito(a, completo), achados: a };
}
