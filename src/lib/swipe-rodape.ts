type Movimento = { dx: number; dy: number; toques: number; bloqueado: boolean };
type Gesto = { dx: number; dy: number; vx: number; largura: number };

export const ROTAS_RODAPE = ['/', '/conceitos', '/sistemas', '/aviacao', '/espaco'] as const;

export function indiceAbaRodape(caminho: string): number {
  return ROTAS_RODAPE.findIndex((rota) => rota === caminho);
}

export function podeIniciarSwipeRodape(caminho: string, { dx, dy, toques, bloqueado }: Movimento): boolean {
  return !bloqueado && toques === 1 && indiceAbaRodape(caminho) >= 0
    && Math.abs(dx) >= 14 && Math.abs(dx) > Math.abs(dy) * 1.4;
}

export function destinoSwipeRodape(caminho: string, { dx, dy, vx, largura }: Gesto): typeof ROTAS_RODAPE[number] | null {
  const indice = indiceAbaRodape(caminho);
  if (indice < 0 || Math.abs(dx) <= Math.abs(dy) * 1.4) return null;
  const distancia = Math.abs(dx) >= Math.max(56, Math.min(largura * 0.2, 100));
  const rapido = Math.abs(dx) >= 28 && Math.abs(vx) >= 0.5 && Math.sign(vx) === Math.sign(dx);
  if (!distancia && !rapido) return null;
  return ROTAS_RODAPE[indice + (dx < 0 ? 1 : -1)] ?? null;
}
