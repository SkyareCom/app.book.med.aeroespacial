// Acesso ao conteúdo: o que é livre e o que só abre depois da compra.
//
// Modelo de venda (decidido em 4/11/2026):
// - Android: app na Google Play (compra pelo faturamento da Google) e venda por link;
// - iPhone: só por link; o app é o PWA (site instalado na tela de início pelo Safari);
// - uma conta (e-mail) e uma compra valem em todos os aparelhos.
//
// Enquanto COBRANCA_ATIVA for false, todo o conteúdo fica aberto e nada muda para quem usa o app hoje.
// Para ligar a cobrança: conectar o pagamento (ver docs/publicacao.md), aplicar supabase/migrations e trocar para true.
// Todo voo novo entra automaticamente como pago, a menos que esteja em VOOS_LIVRES.

import { PENDENTE } from '@/constants/editora';

export const COBRANCA_ATIVA = false;

// Voos de amostra, abertos para todos mesmo com a cobrança ligada. Proposta inicial: o primeiro voo de cada missão.
// [confirmar na referência] com o autor antes de ligar a cobrança.
export const VOOS_LIVRES: Record<string, number[]> = {
  conceitos: [1],
  sistemas: [1],
  aviacao: [1],
  espaco: [1],
};

// Produto vendido: acesso completo e permanente ao app, com as atualizações.
export const PRODUTO = {
  id: 'papos_acesso_completo',
  // Link de compra (Hotmart, Stripe, Mercado Pago...). Preencher quando a plataforma for escolhida.
  linkCompra: PENDENTE,
  // Id do produto na Google Play (Play Console → Monetização → Produtos no app).
  idGooglePlay: 'papos_acesso_completo',
};

export function vooLivre(secao: string, numero: number) {
  return (VOOS_LIVRES[secao] ?? []).includes(numero);
}

export function vooLiberado(secao: string, numero: number, temAcesso: boolean) {
  return !COBRANCA_ATIVA || temAcesso || vooLivre(secao, numero);
}
