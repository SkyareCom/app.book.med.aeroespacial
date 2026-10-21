import * as LocalAuthentication from 'expo-local-authentication';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Texto } from '@/components/texto';
import { Cores, Espaco, Raio } from '@/constants/theme';
import type { ModoEntrada } from '@/state/conta';

// Formas de entrar no app, mostradas na própria tela de abertura.
// Google e Apple dependem das credenciais das contas de desenvolvedor; enquanto não existem,
// o botão explica isso e a pessoa segue sem conta. A biometria funciona no app instalado.
const LOGIN_SOCIAL_ATIVO = false;

const nomeBiometria = Platform.OS === 'ios' ? 'Face ID ou Touch ID' : Platform.OS === 'android' ? 'Digital ou reconhecimento facial' : 'Face ID, Touch ID ou digital';

export function OpcoesEntrada({ aoEscolher }: { aoEscolher: (modo: ModoEntrada) => void }) {
  const [aviso, setAviso] = useState<string | null>(null);
  const mostrarApple = Platform.OS !== 'android';

  function social(provedor: 'Google' | 'Apple') {
    if (!LOGIN_SOCIAL_ATIVO) {
      setAviso(`O login com ${provedor} está sendo configurado e será liberado em breve. Por enquanto, continue sem conta: seu progresso fica salvo neste aparelho.`);
      return;
    }
    aoEscolher(provedor === 'Google' ? 'google' : 'apple');
  }

  async function biometria() {
    if (Platform.OS === 'web') {
      setAviso('A biometria funciona no app instalado no celular (Face ID, Touch ID ou digital). No navegador, continue sem conta por enquanto.');
      return;
    }
    try {
      const temSensor = await LocalAuthentication.hasHardwareAsync();
      const cadastrada = temSensor && (await LocalAuthentication.isEnrolledAsync());
      if (!cadastrada) {
        setAviso('Este aparelho não tem biometria cadastrada. Cadastre nos ajustes do celular ou continue sem conta.');
        return;
      }
      const r = await LocalAuthentication.authenticateAsync({ promptMessage: 'Entrar no Papos de Altitude', cancelLabel: 'Cancelar' });
      if (r.success) aoEscolher('biometria');
      else setAviso('Não foi possível confirmar a biometria. Tente de novo ou continue sem conta.');
    } catch {
      setAviso('Não foi possível usar a biometria agora. Tente de novo ou continue sem conta.');
    }
  }

  return (
    <View style={{ gap: Espaco.md, width: '100%' }}>
      <View style={{ gap: 10 }}>
        <BotaoEntrar rotulo="Continuar com Google" fundo={Cores.texto} cor={Cores.fundo} onPress={() => social('Google')} />
        {mostrarApple ? <BotaoEntrar rotulo="Continuar com a Apple" fundo="#000000" cor="#FFFFFF" borda="rgba(255,255,255,0.35)" onPress={() => social('Apple')} /> : null}
        <BotaoEntrar rotulo="Entrar com biometria" detalhe={nomeBiometria} fundo="rgba(3,5,10,0.6)" cor={Cores.destaque} borda={Cores.destaque} onPress={biometria} />
      </View>

      {aviso ? (
        <View style={styles.aviso} accessibilityLiveRegion="polite">
          <Texto cor={Cores.textoSuave}>{aviso}</Texto>
        </View>
      ) : null}

      <Pressable accessibilityRole="button" onPress={() => aoEscolher('convidado')} style={styles.semConta}>
        <Texto t="item" cor={Cores.texto}>Continuar sem conta</Texto>
        <Texto cor={Cores.textoApagado}>Seu progresso fica salvo neste aparelho.</Texto>
      </Pressable>
    </View>
  );
}

function BotaoEntrar({ rotulo, detalhe, fundo, cor, borda, onPress }: { rotulo: string; detalhe?: string; fundo: string; cor: string; borda?: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={detalhe ? `${rotulo}, ${detalhe}` : rotulo}
      onPress={onPress}
      style={({ pressed }) => [styles.botao, { backgroundColor: fundo, borderColor: borda ?? fundo }, pressed && { opacity: 0.85 }]}>
      <Texto t="item" cor={cor}>{rotulo}</Texto>
      {detalhe ? <Texto t="rotulo" cor={cor}>{detalhe}</Texto> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: { minHeight: 52, borderRadius: Raio, borderWidth: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 8, gap: 2 },
  aviso: { borderRadius: Raio - 4, borderWidth: 1, borderColor: Cores.linha, backgroundColor: 'rgba(6,10,18,0.9)', padding: Espaco.md },
  semConta: { alignItems: 'center', gap: 2, minHeight: 48, justifyContent: 'center' },
});
