# Publicação do Papos de Altitude

Modelo decidido em 4/11/2026:

| Plataforma | Como o usuário instala | Como compra |
|---|---|---|
| Android | App nativo na **Google Play** | Faturamento da Google Play (dentro do app) |
| Android | PWA pelo Chrome (link) | Link de compra externo |
| iPhone / iPad | PWA pelo Safari (Compartilhar → Adicionar à Tela de Início) | Link de compra externo |
| Computador | Site / PWA | Link de compra externo |

Uma conta (e-mail, código sem senha) e uma compra valem em todos. O app iOS nativo está configurado
(`ios.bundleIdentifier`, perfis no `eas.json`) para o caso de, no futuro, entrar na App Store; lá a venda teria de
seguir as regras da Apple.

## O que já está pronto no código

- `app.json`: pacote `com.skyare.paposdealtitude` (permanente), versão 1.0.0, ícones, splash, permissões mínimas,
  manifesto de privacidade do iOS.
- `eas.json`: `preview` (APK para testar), `production` (AAB para a Play, versionCode automático no EAS).
- Páginas públicas: `/privacidade`, `/termos`, `/aviso-medico`, `/excluir-dados` (abrem sem a tela de entrada).
- Aceite dos termos na tela de entrada; links no Perfil; Perfil → Apagar meus dados.
- PWA: `public/manifest.webmanifest`, ícones, `public/sw.js` (uso sem internet), convite para instalar na Home.
- Acesso pago (`src/lib/acesso.ts`, `src/state/acesso.tsx`, `src/components/assinatura.tsx`): **desligado**
  (`COBRANCA_ATIVA = false`). Voos novos entram como pagos; os de amostra ficam em `VOOS_LIVRES`.
- Banco: `supabase/migrations/20261104000000_acessos.sql` (ainda não aplicada).
- Ficha da loja gerada do conteúdo: `npm run loja:ficha` → `docs/loja/ficha-*.md`; capturas:
  `python3 tools/loja/capturas.py`; ícone 512 e imagem de destaque 1024x500 em `docs/loja/`.
- `npm run check:publicacao`: confere tudo isso no CI a cada push.

## O que depende de você (contas e dados)

1. Preencher `src/constants/editora.ts`: responsável, CPF/CNPJ e e-mail de contato.
2. Conta Expo (expo.dev) e `npx eas-cli@latest login`; depois `npx eas-cli@latest init` grava o `projectId` no app.json.
3. Conta de desenvolvedor Google Play (taxa única de US$ 25, verificação de identidade). Conta pessoal nova exige
   teste fechado com testadores antes da produção (regra atual da Google [confirmar na referência]).
4. Escolher a plataforma do link (Hotmart, Stripe, Mercado Pago...) e o preço.

## Passo a passo para a primeira versão na Play

1. `npm run check:publicacao -- --loja` (precisa passar sem pendências).
2. `npm run build:android:teste` → instale o APK num celular e teste.
3. `npm run build:android` → gera o AAB.
4. Play Console: criar o app, colar a ficha de `docs/loja/ficha-pt-BR.md` (e EN/ES), subir ícone, destaque e
   capturas, preencher `docs/loja/seguranca-dados.md`, enviar o AAB para Teste interno → Teste fechado → Produção.
5. `npm run enviar:android` envia os próximos AABs direto pelo EAS (precisa da chave de serviço da Play nos
   segredos do EAS, nunca no repositório).

## Ligar a cobrança

1. Aplicar `supabase/migrations/20261104000000_acessos.sql` e ativar o login por e-mail (código OTP) no Supabase.
2. Link: criar o produto na plataforma escolhida; uma função do Supabase recebe o aviso de pagamento (webhook) e grava a
   linha em `acessos` com `origem = 'link'`; preencher `PRODUTO.linkCompra`.
3. Google Play: criar o produto `papos_acesso_completo` (compra única), adicionar a biblioteca de compras
   (`expo-iap` ou equivalente compatível com o SDK) e uma função que valida a compra na API da Google e grava
   `origem = 'google_play'`.
4. Confirmar `VOOS_LIVRES` e trocar `COBRANCA_ATIVA` para `true`.

## A cada voo novo

O check do CI exige que a ficha da loja esteja atualizada. Depois de publicar um voo:
`npm run loja:ficha` (e, se as telas mudaram, `python3 tools/loja/capturas.py`) e commit junto com o voo.
O voo entra pago automaticamente quando a cobrança estiver ligada.
