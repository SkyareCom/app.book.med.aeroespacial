import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { Abertura } from '@/components/abertura';
import { Cabecalho, Rodape } from '@/components/moldura-app';
import { Cores, Fonte } from '@/constants/theme';
import { ProvedorConta, useConta } from '@/state/conta';
import { ProvedorNotificacoes } from '@/state/notificacoes';
import { ProvedorProgresso } from '@/state/progresso';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
          <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false, animation: 'fade', contentStyle: { backgroundColor: Cores.fundo } }} />
          </View>
          <Rodape />
          <AberturaEEntrada />
        </View>
      </ProvedorNotificacoes>
      </ProvedorProgresso>
    </ProvedorConta>
  );
}

// Abertura e tela de entrada são a mesma tela.
// - Quem ainda não entrou (ou entrou sem conta): a abertura mostra as formas de login e espera a escolha.
// - Quem já entrou: no app nativo a abertura passa a cada início; na web, uma vez por visita.
// No site pré-renderizado vem só a capa preta; a abertura com os botões entra assim que a página carrega.
function AberturaEEntrada() {
  const { carregado, modo } = useConta();
  const [abertura, setAbertura] = useState(Platform.OS !== 'web');
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    try {
      if (sessionStorage.getItem('abertura-vista')) return;
      sessionStorage.setItem('abertura-vista', '1');
    } catch {}
    setAbertura(true);
  }, []);

  // Quem entrou sem conta volta a ver as formas de login a cada abertura do app (uma vez por visita na web).
  const entrada = carregado && (!modo || (modo === 'convidado' && abertura));
  // Enquanto lê a escolha salva, uma capa preta (igual ao primeiro quadro da abertura) cobre o app.
  // Ela já vem no site pré-renderizado, então o conteúdo interno nunca aparece antes da abertura.
  if (!carregado) return <View style={[StyleSheet.absoluteFill, { backgroundColor: '#000', zIndex: 100 }]} />;
  if (!abertura && !entrada) return null;
  return <Abertura entrada={entrada} onFim={() => setAbertura(false)} />;
}
