-- Papos de Altitude · compras e acesso ao conteúdo completo.
-- Uma linha por compra confirmada. Só o servidor grava (funções com a chave de serviço, que fica nos segredos do
-- Supabase e nunca no app). Cada pessoa logada lê apenas as próprias linhas.
-- Aplicar quando a cobrança for ligada (ver docs/publicacao.md).

create table if not exists public.acessos (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  produto text not null default 'papos_acesso_completo',
  origem text not null check (origem in ('google_play', 'link', 'cortesia')),
  referencia text,            -- id do pedido na Google Play ou na plataforma do link
  valido_ate timestamptz,     -- nulo = acesso permanente
  criado_em timestamptz not null default now(),
  unique (origem, referencia)
);

alter table public.acessos enable row level security;

create policy "cada pessoa lê os próprios acessos"
  on public.acessos for select
  to authenticated
  using (auth.uid() = user_id);
