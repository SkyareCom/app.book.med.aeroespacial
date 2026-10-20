import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { Cores, Fonte } from '@/constants/theme';
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
    <ProvedorProgresso>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Cores.fundo } }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ProvedorProgresso>
  );
}
