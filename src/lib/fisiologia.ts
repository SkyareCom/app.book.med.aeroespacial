// Cálculos de fisiologia usados nas mídias interativas.

/** Pressão barométrica (mmHg) na atmosfera padrão ICAO, para altitudes em pés. */
export function pressaoBarometrica(altitudePes: number) {
  return 760 * Math.pow(1 - 6.8756e-6 * altitudePes, 5.2559);
}

/** Pressão parcial de O₂ inspirado (mmHg): FiO₂ × (PB − 47), descontando o vapor d'água a 37 °C. */
export function po2Inspirado(altitudePes: number) {
  return 0.2095 * (pressaoBarometrica(altitudePes) - 47);
}

// PO₂ alveolar aproximada respirando ar, em exposição aguda (inclui a hiperventilação reflexa); entre os pontos,
// interpolação linear.
// 03/11/2026 (autorizado pelo autor, "Descongele e ajuste o simulador"): de 8.000 a 25.000 ft, os pontos foram
//   calibrados para que a saturação da equação de Severinghaus reproduza a Tabela II-1-2 do Doc 8984 da ICAO (93% a
//   8.000 ft, 89% a 10.000, 87% a 12.000, 83% a 14.000, 80% a 15.000, 65% a 20.000 e abaixo de 60% a 25.000 ft), a
//   mesma usada no texto do M2V1. Antes, 69 mmHg a 8.000 ft davam 94% e 61 mmHg a 10.000 ft, 91%. Usado só pelo
//   simulador do oxigênio (simulador-o2.tsx).
const TABELA_PAO2: [number, number][] = [
  [0, 103],
  [5000, 81],
  [8000, 67],
  [10000, 57],
  [12000, 53],
  [14000, 48],
  [15000, 44.5],
  [18000, 38],
  [20000, 34],
  [25000, 30],
];

export function po2Alveolar(altitudePes: number) {
  const t = TABELA_PAO2;
  if (altitudePes <= t[0][0]) return t[0][1];
  for (let i = 1; i < t.length; i++) {
    const [a1, p1] = t[i - 1];
    const [a2, p2] = t[i];
    if (altitudePes <= a2) return p1 + ((altitudePes - a1) / (a2 - a1)) * (p2 - p1);
  }
  return t[t.length - 1][1];
}

/** Saturação da hemoglobina (%) pela equação de Severinghaus, para PO₂ em mmHg. */
export function saturacao(po2: number) {
  if (po2 <= 0) return 0;
  return 100 / (23400 / (po2 * po2 * po2 + 150 * po2) + 1);
}

export function pesParaMetros(pes: number) {
  return pes * 0.3048;
}

/** Estágios clássicos da hipóxia hipóxica respirando ar. */
export function estagioHipoxia(altitudePes: number) {
  if (altitudePes < 10000) return { nome: 'Indiferente', faixa: 'até 10.000 ft', sinais: ['A visão noturna já começa a cair a partir de cerca de 5.000 ft.', 'Sem outros sintomas perceptíveis na maioria das pessoas.'] };
  if (altitudePes < 15000) return { nome: 'Compensatório', faixa: '10.000 a 15.000 ft', sinais: ['Respiração e frequência cardíaca aumentam.', 'Sonolência, julgamento e memória recente pioram.'] };
  if (altitudePes < 20000) return { nome: 'Distúrbio', faixa: '15.000 a 20.000 ft', sinais: ['Euforia, cefaleia, formigamento e falta de coordenação.', 'Visão turva e em túnel; lábios e unhas arroxeados.'] };
  return { nome: 'Crítico', faixa: 'acima de 20.000 ft', sinais: ['Confusão grave e incapacidade de agir.', 'Perda de consciência em poucos minutos.'] };
}
