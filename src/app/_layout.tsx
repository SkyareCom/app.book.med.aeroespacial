import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Abertura } from '@/components/abertura';
import { Cores, Fonte } from '@/constants/theme';
import { ProvedorProgresso } from '@/state/progresso';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Acme com o acento circunflexo corrigido (ver tools/fonte/corrigir_circunflexo.py).
  const [fontesProntas] = useFonts({ [Fonte]: require('@/assets/fonts/AppBookDisplay-Regular.ttf') });

  useEffect(() => {
    if (fontesProntas) SplashScreen.hideAsync();
  }, [fontesProntas]);

  const [abertura, setAbertura] = useState(true);

  if (!fontesProntas) return null;

  return (
    <ProvedorProgresso>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: Cores.fundo }}>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Cores.fundo } }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        {abertura ? <Abertura onFim={() => setAbertura(false)} /> : null}
      </View>
    </ProvedorProgresso>
  );
}
