import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';

import { Abertura } from '@/components/abertura';
import { Cabecalho, Rodape } from '@/components/moldura-app';
import { Cores, Fonte } from '@/constants/theme';
import { ProvedorProgresso } from '@/state/progresso';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Acme com o acento circunflexo corrigido (ver tools/fonte/corrigir_circunflexo.py).
  const [fontesProntas] = useFonts({ [Fonte]: require('@/assets/fonts/AppBookDisplay-Regular.ttf') });

  useEffect(() => {
    if (fontesProntas) SplashScreen.hideAsync();
  }, [fontesProntas]);

  // No app nativo a abertura aparece a cada início. Na web, só uma vez por visita e só depois de a página
  // carregar: assim ela não cobre o site pré-renderizado nem engole os toques ao abrir um link.
  const [abertura, setAbertura] = useState(Platform.OS !== 'web');
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    try {
      if (sessionStorage.getItem('abertura-vista')) return;
      sessionStorage.setItem('abertura-vista', '1');
    } catch {}
    setAbertura(true);
  }, []);

  if (!fontesProntas) return null;

  return (
    <ProvedorProgresso>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: Cores.fundo }}>
        <Cabecalho />
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false, animation: 'fade', contentStyle: { backgroundColor: Cores.fundo } }} />
        </View>
        <Rodape />
        {abertura ? <Abertura onFim={() => setAbertura(false)} /> : null}
      </View>
    </ProvedorProgresso>
  );
}
