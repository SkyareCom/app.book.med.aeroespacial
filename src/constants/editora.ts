// Dados de quem publica o app. Aparecem na Política de Privacidade, nos Termos de Uso, na página de exclusão de
// dados e na ficha da Google Play. Enquanto um campo tiver PENDENTE, scripts/check-publicacao.cjs avisa no CI e
// bloqueia o modo --loja (o envio para a Google Play).
export const PENDENTE = '[confirmar na referência]';

export const EDITORA = {
  nome: 'Papos de Altitude',
  // Razão social ou nome completo do responsável pelo app, como cadastrado na conta de desenvolvedor da Google Play.
  responsavel: PENDENTE,
  // CNPJ ou CPF do responsável (exigido pela Google Play para conta de organização; opcional para conta pessoal).
  documento: PENDENTE,
  // E-mail público de contato e de pedidos sobre dados pessoais (LGPD).
  email: PENDENTE,
  // Endereço do site publicado: as páginas legais ficam em <site>/privacidade, /termos, /aviso-medico e /excluir-dados.
  site: 'https://skyarecom.github.io/app.book.med.aeroespacial',
  pacoteAndroid: 'com.skyare.paposdealtitude',
  bundleIos: 'com.skyare.paposdealtitude',
  atualizadoEm: '4 de novembro de 2026',
};
