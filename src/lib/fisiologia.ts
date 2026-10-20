// Cálculos de fisiologia usados nas mídias interativas.

/** Pressão barométrica (mmHg) na atmosfera padrão ICAO, para altitudes em pés. */
export function pressaoBarometrica(altitudePes: number) {
  return 760 * Math.pow(1 - 6.8756e-6 * altitudePes, 5.2559);
}

/** Pressão parcial de O₂ inspirado (mmHg): FiO₂ × (PB − 47), descontando o vapor d'água a 37 °C. */
export function po2Inspirado(altitudePes: number) {
  return 0.2095 * (pressaoBarometrica(altitudePes) - 47);
}

// PO₂ alveolar aproximada respirando ar, em exposição aguda (inclui a hiperventilação reflexa).
// Valores de referência usuais em tratados de fisiologia de aviação; entre os pontos, interpolação linear.
const TABELA_PAO2: [number, number][] = [
  [0, 103],
  [5000, 81],
  [8000, 69],
  [10000, 61],
  [15000, 45],
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
