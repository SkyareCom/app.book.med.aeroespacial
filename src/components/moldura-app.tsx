import { Image } from 'expo-image';
import { Link, usePathname, type Href } from 'expo-router';
import type { ComponentType } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconeClinica, IconeEspaco, IconeFisiologia, IconeHome, IconeOperacao, IconeSino } from '@/components/icones';
import { Texto } from '@/components/texto';
import { Imagens } from '@/constants/imagens';
import { Cores, Espaco, LarguraMaxima } from '@/constants/theme';
import { useLarguraJanela } from '@/hooks/use-largura-janela';
import { useNotificacoes } from '@/state/notificacoes';

// Cabeçalho e rodapé fixos, presentes em todas as telas do app.

export function Cabecalho() {
  const insets = useSafeAreaInsets();
  const largura = useLarguraJanela();
  const lateral = Math.max(Espaco.lg, (largura - LarguraMaxima) / 2 + Espaco.lg);
  const { naoLidas } = useNotificacoes();
  return (
    <View style={[styles.cabecalho, { paddingTop: insets.top + 8, paddingLeft: lateral, paddingRight: lateral }]}>
      <Link href="/" replace asChild>
        <Pressable accessibilityLabel="Papos de Altitude, ir para a Home" style={styles.marca}>
          <Image source={Imagens.logo} style={styles.logo} contentFit="contain" />
          <View>
            <Texto t="item" maiusculo espacado>Papos de Altitude</Texto>
            <Texto t="rotulo" cor={Cores.destaque}>Medicina aeroespacial</Texto>
          </View>
        </Pressable>
      </Link>
      <View style={styles.acoes}>
        <Link href="/notificacoes" asChild>
          <Pressable accessibilityRole="link" accessibilityLabel={naoLidas ? 'Notificações, há novidades' : 'Notificações'} style={styles.acao}>
            <IconeSino cor={Cores.texto} tamanho={22} />
            {naoLidas ? <View style={styles.ponto} /> : null}
          </Pressable>
        </Link>
        <Link href="/perfil" asChild>
          <Pressable accessibilityRole="link" accessibilityLabel="Perfil" style={styles.acao}>
            <Image source={Imagens.perfil} style={styles.avatar} contentFit="cover" />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

// Rodapé: HOME · FISIOLOGIA · CLÍNICA · OPERAÇÃO · ESPAÇO (9px, maiúsculas).
const abas: { secao: string; href: Href; rotulo: string; Icone: ComponentType<{ cor: string }> }[] = [
  { secao: '', href: '/', rotulo: 'Home', Icone: IconeHome },
  { secao: 'fisiologia', href: '/fisiologia', rotulo: 'Fisiologia', Icone: IconeFisiologia },
  { secao: 'clinica', href: '/clinica', rotulo: 'Clínica', Icone: IconeClinica },
  { secao: 'operacao', href: '/operacao', rotulo: 'Operação', Icone: IconeOperacao },
  { secao: 'espaco', href: '/espaco', rotulo: 'Espaço', Icone: IconeEspaco },
];

// A aba fica acesa na temporada e também dentro dos episódios dela.
function abaAtiva(caminho: string) {
  const partes = caminho.split('/').filter(Boolean);
  if (partes.length === 0) return '';
  if (partes[0] === 'capitulo') return partes[1] ?? null;
  return abas.some((a) => a.secao === partes[0]) ? partes[0] : null;
}

export function Rodape() {
  const insets = useSafeAreaInsets();
  const largura = useLarguraJanela();
  const ativa = abaAtiva(usePathname());
  return (
    <View
      accessibilityRole="tablist"
      style={[styles.rodape, { paddingBottom: Math.max(insets.bottom, 12), paddingHorizontal: Math.max(0, (largura - LarguraMaxima) / 2) }]}>
      {abas.map(({ secao, href, rotulo, Icone }) => {
        const foco = ativa === secao;
        const cor = foco ? Cores.destaque : Cores.textoApagado;
        return (
          // Link de verdade: abre mesmo antes de o app terminar de carregar no navegador.
          <Link key={rotulo} href={href} replace asChild>
            <Pressable accessibilityRole="tab" accessibilityLabel={rotulo} accessibilityState={{ selected: foco }} style={styles.aba}>
              <Icone cor={cor} />
              <Texto t="rodape" cor={cor}>{rotulo}</Texto>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(3,5,10,0.96)', borderBottomWidth: 1, borderBottomColor: Cores.linha, paddingBottom: 8, zIndex: 10 },
  acoes: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  acao: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: Cores.destaque },
  ponto: { position: 'absolute', top: 9, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: Cores.dourado, borderWidth: 1, borderColor: Cores.fundo },
  marca: { flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'flex-start' },
  logo: { width: 40, height: 40 },
  rodape: { flexDirection: 'row', backgroundColor: 'rgba(3,5,10,0.96)', borderTopWidth: 1, borderTopColor: Cores.linha, paddingTop: 8, zIndex: 10 },
  aba: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5, minHeight: 48 },
});
