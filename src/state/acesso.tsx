// Conta por e-mail e situação da compra.
// O login é por código enviado ao e-mail (Supabase Auth, sem senha), porque funciona igual no Android nativo,
// no navegador e no PWA do iPhone. A compra fica na tabela "acessos" do Supabase (supabase/migrations), gravada
// pelo servidor quando a Google Play ou a plataforma do link confirmam o pagamento; o app só lê.
// A sessão fica no aparelho. Nenhuma chave nova: usa a chave pública já em src/constants/servidor.ts.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { SERVIDOR } from '@/constants/servidor';
import { COBRANCA_ATIVA, PRODUTO } from '@/lib/acesso';

const CHAVE = 'acesso:v1';

interface Sessao {
  email: string;
  token: string;
  renovar: string;
  expira: number; // ms
}

interface ContextoAcesso {
  email: string | null;
  temAcesso: boolean;
  pedirCodigo: (email: string) => Promise<string | null>;
  confirmarCodigo: (email: string, codigo: string) => Promise<string | null>;
  conferir: () => Promise<void>;
  sairDaConta: () => void;
}

const Ctx = createContext<ContextoAcesso>({
  email: null,
  temAcesso: false,
  pedirCodigo: async () => null,
  confirmarCodigo: async () => null,
  conferir: async () => {},
  sairDaConta: () => {},
});

const cabecalhos = (token?: string) => ({
  'Content-Type': 'application/json',
  apikey: SERVIDOR.chavePublica,
  Authorization: `Bearer ${token ?? SERVIDOR.chavePublica}`,
});

export function ProvedorAcesso({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [temAcesso, setTemAcesso] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(CHAVE)
      .then((t) => {
        if (!t) return;
        const v = JSON.parse(t) as { sessao: Sessao | null; temAcesso: boolean };
        setSessao(v.sessao);
        setTemAcesso(v.temAcesso);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (COBRANCA_ATIVA && sessao) conferir();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessao?.token]);

  function guardar(s: Sessao | null, acesso: boolean) {
    setSessao(s);
    setTemAcesso(acesso);
    AsyncStorage.setItem(CHAVE, JSON.stringify({ sessao: s, temAcesso: acesso })).catch(() => {});
  }

  async function pedirCodigo(email: string) {
    try {
      const r = await fetch(`${SERVIDOR.url}/auth/v1/otp`, { method: 'POST', headers: cabecalhos(), body: JSON.stringify({ email, create_user: true }) });
      return r.ok ? null : 'Não foi possível enviar o código. Confira o e-mail e tente de novo.';
    } catch {
      return 'Sem conexão. Tente de novo quando estiver online.';
    }
  }

  async function confirmarCodigo(email: string, codigo: string) {
    try {
      const r = await fetch(`${SERVIDOR.url}/auth/v1/verify`, { method: 'POST', headers: cabecalhos(), body: JSON.stringify({ type: 'email', email, token: codigo }) });
      if (!r.ok) return 'Código inválido ou vencido. Peça um novo código.';
      const j = (await r.json()) as { access_token: string; refresh_token: string; expires_in: number };
      guardar({ email, token: j.access_token, renovar: j.refresh_token, expira: Date.now() + j.expires_in * 1000 }, temAcesso);
      return null;
    } catch {
      return 'Sem conexão. Tente de novo quando estiver online.';
    }
  }

  async function tokenValido(): Promise<Sessao | null> {
    if (!sessao) return null;
    if (Date.now() < sessao.expira - 60_000) return sessao;
    try {
      const r = await fetch(`${SERVIDOR.url}/auth/v1/token?grant_type=refresh_token`, { method: 'POST', headers: cabecalhos(), body: JSON.stringify({ refresh_token: sessao.renovar }) });
      if (!r.ok) return null;
      const j = (await r.json()) as { access_token: string; refresh_token: string; expires_in: number };
      const nova = { ...sessao, token: j.access_token, renovar: j.refresh_token, expira: Date.now() + j.expires_in * 1000 };
      guardar(nova, temAcesso);
      return nova;
    } catch {
      return null;
    }
  }

  // Lê a compra no servidor. Sem conexão, vale a última situação conhecida (o app funciona offline).
  async function conferir() {
    const atual = await tokenValido();
    if (!atual) return;
    try {
      const r = await fetch(`${SERVIDOR.url}/rest/v1/acessos?select=produto,valido_ate&produto=eq.${PRODUTO.id}`, { headers: cabecalhos(atual.token) });
      if (!r.ok) return;
      const linhas = (await r.json()) as { produto: string; valido_ate: string | null }[];
      const ok = linhas.some((l) => !l.valido_ate || new Date(l.valido_ate).getTime() > Date.now());
      guardar(atual, ok);
    } catch {}
  }

  function sairDaConta() {
    guardar(null, false);
  }

  return (
    <Ctx.Provider value={{ email: sessao?.email ?? null, temAcesso, pedirCodigo, confirmarCodigo, conferir, sairDaConta }}>{children}</Ctx.Provider>
  );
}

export const useAcesso = () => useContext(Ctx);
