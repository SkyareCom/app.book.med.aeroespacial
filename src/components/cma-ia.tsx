import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, View } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { Painel } from '@/components/cartoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';
import { SERVIDOR } from '@/constants/servidor';
import { SISTEMAS, type Valores } from '@/lib/cma';

// Exame CMA · análise de exames por IA.
// O arquivo (PDF ou imagem) vai à função analisar-exame do Supabase, que pede ao Claude a leitura do laudo.
// A IA só propõe valores, cada um com o trecho do exame; o examinador revisa e decide o que entra no formulário.
// Nada é gravado no servidor.

interface Lido { campo: string; valor: number | boolean; trecho: string }
interface Analise { nome: string; tipo_exame: string; data_exame?: string; legivel: boolean; valores: Lido[]; outros_achados: string[]; resumo: string }

const TIPOS = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
const ROTULO: Record<string, string> = Object.fromEntries(SISTEMAS.flatMap((s) => s.campos.map((c) => [c.id, c.rotulo.replace(/\?$/, '')])));
const UNIDADE: Record<string, string> = Object.fromEntries(SISTEMAS.flatMap((s) => s.campos.map((c) => [c.id, c.tipo === 'num' ? c.unidade ?? '' : ''])));

function paraBase64(blob: Blob): Promise<string> {
  return new Promise((ok, falha) => {
    const leitor = new FileReader();
    leitor.onload = () => ok(String(leitor.result).split(',')[1] ?? '');
    leitor.onerror = () => falha(leitor.error);
    leitor.readAsDataURL(blob);
  });
}

function tipoDe(nome: string, mime?: string) {
  if (mime && TIPOS.includes(mime)) return mime;
  const ext = nome.toLowerCase().split('.').pop();
  return ext === 'pdf' ? 'application/pdf' : ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : undefined;
}

const mostrar = (l: Lido) => (typeof l.valor === 'boolean' ? (l.valor ? 'Sim' : 'Não') : `${String(l.valor).replace('.', ',')}${UNIDADE[l.campo] ? ` ${UNIDADE[l.campo]}` : ''}`);

export function AnaliseIA({ aplicar }: { aplicar: (v: Valores) => void }) {
  const [autorizado, setAutorizado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [analises, setAnalises] = useState<Analise[]>([]);
  const [marcados, setMarcados] = useState<Record<string, boolean>>({});
  const [aplicados, setAplicados] = useState(0);

  async function escolher() {
    setErro('');
    const r = await DocumentPicker.getDocumentAsync({ type: TIPOS, multiple: false, copyToCacheDirectory: true });
    if (r.canceled || !r.assets?.length) return;
    const a = r.assets[0];
    const tipo = tipoDe(a.name, a.mimeType);
    if (!tipo) return setErro('Envie um PDF ou uma imagem PNG, JPG ou WEBP.');
    if (a.size && a.size > 10 * 1024 * 1024) return setErro('Arquivo grande demais: o limite é de cerca de 10 MB.');
    setEnviando(true);
    try {
      const blob = Platform.OS === 'web' && a.file ? a.file : await (await fetch(a.uri)).blob();
      const arquivo = await paraBase64(blob);
      const resp = await fetch(`${SERVIDOR.url}/functions/v1/analisar-exame`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SERVIDOR.chavePublica, Authorization: `Bearer ${SERVIDOR.chavePublica}` },
        body: JSON.stringify({ arquivo, tipo, nome: a.name }),
      });
      const dados = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(dados.erro ?? 'Não foi possível analisar o arquivo.');
      const nova: Analise = { nome: a.name, ...dados };
      setAnalises((x) => [nova, ...x]);
      // Por padrão, tudo o que a IA leu vem marcado para revisão.
      setMarcados((m) => ({ ...m, ...Object.fromEntries(nova.valores.map((l) => [`${a.name}:${l.campo}`, true])) }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      setErro(e instanceof TypeError || /fetch|network/i.test(msg) ? 'Sem conexão com o servidor de análise. Verifique a internet e tente de novo.' : msg || 'Não foi possível analisar o arquivo.');
    } finally {
      setEnviando(false);
    }
  }

  function aplicarMarcados() {
    const v: Valores = {};
    for (const an of [...analises].reverse())
      for (const l of an.valores) if (marcados[`${an.nome}:${l.campo}`]) v[l.campo] = typeof l.valor === 'boolean' ? l.valor : String(l.valor).replace('.', ',');
    aplicar(v);
    setAplicados(Object.keys(v).length);
  }

  const totalMarcados = analises.reduce((k, an) => k + an.valores.filter((l) => marcados[`${an.nome}:${l.campo}`]).length, 0);

  return (
    <Painel>
      <Texto t="rotulo" cor={Cores.destaque}>Análise de exames por IA</Texto>
      <Texto cor={Cores.textoSuave}>
        Envie o laudo em PDF ou uma foto (PNG ou JPG). A IA lê os valores, mostra o trecho de onde tirou cada um, e você escolhe o que entra no formulário. Ela não dá veredito.
      </Texto>
      <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: autorizado }} onPress={() => setAutorizado(!autorizado)} style={styles.consentimento}>
        <View style={[styles.caixa, autorizado && styles.caixaAtiva]}>{autorizado ? <Texto t="rotulo" cor={Cores.fundo}>✓</Texto> : null}</View>
        <Texto style={{ flex: 1 }}>Tenho autorização do candidato para enviar os exames dele à análise.</Texto>
      </Pressable>
      <Texto cor={Cores.textoApagado}>O arquivo é usado só durante a análise e não fica guardado. Dados de saúde são sensíveis (LGPD): envie apenas o necessário.</Texto>
      <BotaoPrincipal rotulo={enviando ? 'Analisando...' : 'Enviar PDF ou foto do exame'} onPress={() => (autorizado && !enviando ? escolher() : setErro(autorizado ? '' : 'Marque a autorização do candidato antes de enviar.'))} />
      {enviando ? <ActivityIndicator color={Cores.destaque} /> : null}
      {erro ? <Texto cor={Cores.erro}>{erro}</Texto> : null}

      {analises.map((an) => (
        <View key={an.nome + an.resumo} style={styles.analise}>
          <Texto t="item" cor={Cores.dourado}>{an.tipo_exame || 'Exame'}{an.data_exame ? ` · ${an.data_exame}` : ''}</Texto>
          <Texto t="rodape" cor={Cores.textoApagado}>{an.nome}</Texto>
          {!an.legivel ? <Texto cor={Cores.erro}>A IA indicou que o documento não pôde ser lido com segurança. Confira à mão.</Texto> : null}
          <Texto cor={Cores.textoSuave}>{an.resumo}</Texto>
          {an.valores.length ? (
            an.valores.map((l) => {
              const id = `${an.nome}:${l.campo}`;
              const on = !!marcados[id];
              return (
                <Pressable key={id} accessibilityRole="checkbox" accessibilityState={{ checked: on }} onPress={() => setMarcados((m) => ({ ...m, [id]: !on }))} style={styles.lido}>
                  <View style={[styles.caixa, on && styles.caixaAtiva]}>{on ? <Texto t="rotulo" cor={Cores.fundo}>✓</Texto> : null}</View>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Texto>{ROTULO[l.campo] ?? l.campo}: <Texto cor={Cores.destaque}>{mostrar(l)}</Texto></Texto>
                    <Texto cor={Cores.textoApagado}>"{l.trecho}"</Texto>
                  </View>
                </Pressable>
              );
            })
          ) : (
            <Texto cor={Cores.textoApagado}>Nenhum valor do formulário foi encontrado neste exame.</Texto>
          )}
          {an.outros_achados?.length ? (
            <View style={{ gap: 2 }}>
              <Texto t="rotulo" cor={Cores.textoApagado}>Outros achados</Texto>
              {an.outros_achados.map((o) => (
                <Texto key={o} cor={Cores.textoSuave}>· {o}</Texto>
              ))}
            </View>
          ) : null}
        </View>
      ))}
      {analises.length ? (
        <>
          <BotaoPrincipal rotulo={`Aplicar ${totalMarcados} ${totalMarcados === 1 ? 'valor' : 'valores'} ao formulário`} secundario onPress={aplicarMarcados} />
          {aplicados ? <Texto cor={Cores.acerto}>{aplicados} {aplicados === 1 ? 'valor aplicado' : 'valores aplicados'}. Confira nas gavetas de cada sistema.</Texto> : null}
        </>
      ) : null}
    </Painel>
  );
}

const styles = StyleSheet.create({
  consentimento: { flexDirection: 'row', alignItems: 'center', gap: Espaco.sm, minHeight: 40 },
  caixa: { width: 24, height: 24, borderRadius: 6, borderWidth: 1.5, borderColor: Cores.linha, alignItems: 'center', justifyContent: 'center' },
  caixaAtiva: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  analise: { gap: 6, paddingTop: Espaco.sm, borderTopWidth: 1, borderTopColor: Cores.trilha },
  lido: { flexDirection: 'row', gap: Espaco.sm, alignItems: 'flex-start', paddingVertical: 4 },
});
