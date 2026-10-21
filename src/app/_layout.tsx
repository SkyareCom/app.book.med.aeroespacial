import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";

import { Abertura } from "@/components/abertura";
import { Entrar } from "@/components/entrar";
import { Cabecalho, Rodape } from "@/components/moldura-app";
import { Cores, Fonte } from "@/constants/theme";
import { ProvedorConta, useConta } from "@/state/conta";
import { ProvedorProgresso } from "@/state/progresso";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Acme com o acento circunflexo corrigido (ver tools/fonte/corrigir_circunflexo.py).
  const [fontesProntas] = useFonts({
    [Fonte]: require("@/assets/fonts/AppBookDisplay-Regular.ttf"),
  });

  useEffect(() => {
    if (fontesProntas) SplashScreen.hideAsync();
  }, [fontesProntas]);

  // No app nativo a abertura aparece a cada início. Na web, só uma vez por visita e só depois de a página
  // carregar: assim ela não cobre o site pré-renderizado nem engole os toques ao abrir um link.
  const [abertura, setAbertura] = useState(Platform.OS !== "web");
  useEffect(() => {
    if (Platform.OS !== "web") return;
    try {
      if (sessionStorage.getItem("abertura-vista")) return;
      sessionStorage.setItem("abertura-vista", "1");
    } catch {}
    setAbertura(true);
  }, []);

  if (!fontesProntas) return null;

  return (
    <ProvedorConta>
      <ProvedorProgresso>
        <StatusBar style="light" />
        <View style={{ flex: 1, backgroundColor: Cores.fundo }}>
          <Cabecalho />
          <View style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "fade",
                contentStyle: { backgroundColor: Cores.fundo },
              }}
            />
          </View>
          <Rodape />
          <TelaEntrada />
          {abertura ? <Abertura onFim={() => setAbertura(false)} /> : null}
        </View>
      </ProvedorProgresso>
    </ProvedorConta>
  );
}

// Tela de entrada (Google, Apple, biometria ou sem conta) enquanto a pessoa ainda não escolheu.
// Só aparece depois de ler a escolha salva, então nunca entra no site pré-renderizado.
function TelaEntrada() {
  const { carregado, modo } = useConta();
  return carregado && !modo ? <Entrar /> : null;
}
