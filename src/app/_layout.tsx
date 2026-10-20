import { Acme_400Regular, useFonts } from '@expo-google-fonts/acme';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { Cores } from '@/constants/theme';
import { ProvedorProgresso } from '@/state/progresso';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontesProntas] = useFonts({ Acme_400Regular });

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
