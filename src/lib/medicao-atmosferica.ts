// Somente leitura de entradas do usuário. Nenhum valor é tratado como dado da atmosfera padrão.
export function lerNumeroBrasileiro(texto: string): number | null {
  const limpo = texto.trim();
  if (!/^[+-]?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(limpo)) return null;
  const numero = Number(limpo.replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(numero) ? numero : null;
}
