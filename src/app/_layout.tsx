import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Abertura } from '@/components/abertura';
import { ENTRADA_LIVRE } from '@/components/entrar';
import { Cabecalho, Rodape } from '@/components/moldura-app';
import { PaginasRodape } from '@/components/paginas-rodape';
import { Cores, Fonte } from '@/constants/theme';
import { indiceAbaRodape } from '@/lib/swipe-rodape';
import { ProvedorConta, useConta } from '@/state/conta';
import { ProvedorNotificacoes } from '@/state/notificacoes';
import { ProvedorProgresso } from '@/state/progresso';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const caminho = usePathname();
  // Acme com o acento circunflexo corrigido (ver tools/fonte/corrigir_circunflexo.py).
  const [fontesProntas] = useFonts({ [Fonte]: require('@/assets/fonts/AppBookDisplay-Regular.ttf') });

  useEffect(() => {
    if (fontesProntas) SplashScreen.hideAsync();
  }, [fontesProntas]);

  if (!fontesProntas) return null;

  return (
    <ProvedorConta>
      <ProvedorProgresso>
      <ProvedorNotificacoes>
        <StatusBar style="light" />
        <View style={{ flex: 1, backgroundColor: Cores.fundo }}>
          <Cabecalho />
          <PaginasRodape rodape={<Rodape />}>
            <Stack screenOptions={{ headerShown: false, animation: indiceAbaRodape(caminho) >= 0 ? 'none' : 'fade', contentStyle: { backgroundColor: Cores.fundo } }} />
          </PaginasRodape>
          <AberturaEEntrada />
        </View>
      </ProvedorNotificacoes>
      </ProvedorProgresso>
    </ProvedorConta>
  );
}

// Abertura e tela de entrada são a mesma tela.
// - Quem ainda não entrou (ou entrou sem conta): a abertura mostra as formas de login e espera a escolha.
// No site pré-renderizado vem só a capa preta; a abertura com os botões entra assim que a página carrega.
function AberturaEEntrada() {
  const { carregado, modo } = useConta();
  // A abertura (com a tela de login) aparece sempre que o app é aberto ou a página é recarregada.
  const [abertura, setAbertura] = useState(true);

  // Enquanto o login é provisório (ENTRADA_LIVRE), as opções de login aparecem a cada abertura,
  // seja qual for a escolha anterior. Com o login real, só para quem não entrou ou entrou sem conta.
  const entrada = carregado && (!modo || (abertura && (ENTRADA_LIVRE || modo === 'convidado')));
  // Enquanto lê a escolha salva, uma capa preta (igual ao primeiro quadro da abertura) cobre o app.
  // Ela já vem no site pré-renderizado, então o conteúdo interno nunca aparece antes da abertura.
  if (!carregado) return <View style={[StyleSheet.absoluteFill, { backgroundColor: '#000', zIndex: 100 }]} />;
  if (!abertura && !entrada) return null;
  return <Abertura entrada={entrada} onFim={() => setAbertura(false)} />;
}
