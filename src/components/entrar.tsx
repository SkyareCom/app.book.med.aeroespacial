import * as LocalAuthentication from 'expo-local-authentication';
import { useState, type ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Texto } from '@/components/texto';
import { Cores, Espaco, Raio } from '@/constants/theme';
import type { ModoEntrada } from '@/state/conta';

// Formas de entrar no app, mostradas na própria tela de abertura.
// Google e Apple dependem das credenciais das contas de desenvolvedor; enquanto não existem,
// o botão explica isso e a pessoa segue sem conta. A biometria funciona no app instalado.
const LOGIN_SOCIAL_ATIVO = false;
// Provisório: enquanto o login real não existe, qualquer opção libera a entrada direto.
// Para voltar a exigir Google, Apple ou biometria de verdade, troque para false.
const ENTRADA_LIVRE = true;

const nomeBiometria = Platform.OS === 'ios' ? 'Face ID ou Touch ID' : Platform.OS === 'android' ? 'Digital ou reconhecimento facial' : 'Face ID, Touch ID ou digital';

export function OpcoesEntrada({ aoEscolher }: { aoEscolher: (modo: ModoEntrada) => void }) {
  const [aviso, setAviso] = useState<string | null>(null);
  const mostrarApple = Platform.OS !== 'android';

  function social(provedor: 'Google' | 'Apple') {
    if (ENTRADA_LIVRE) {
      aoEscolher(provedor === 'Google' ? 'google' : 'apple');
      return;
    }
    if (!LOGIN_SOCIAL_ATIVO) {
      setAviso(`O login com ${provedor} está sendo configurado e será liberado em breve. Por enquanto, continue sem conta: seu progresso fica salvo neste aparelho.`);
      return;
    }
    aoEscolher(provedor === 'Google' ? 'google' : 'apple');
  }

  async function biometria() {
    if (ENTRADA_LIVRE) {
      aoEscolher('biometria');
      return;
    }
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
        <BotaoEntrar rotulo="Entrar com biometria" detalhe={nomeBiometria} fundo="rgba(3,5,10,0.6)" cor={Cores.destaque} borda={Cores.destaque} onPress={biometria} icone={<IconeDigital cor={Cores.destaque} />} />
      </View>

      {aviso ? (
        <View style={styles.aviso} accessibilityLiveRegion="polite">
          <Texto maiusculo cor={Cores.textoSuave}>{aviso}</Texto>
        </View>
      ) : null}

      <Pressable accessibilityRole="button" onPress={() => aoEscolher('convidado')} style={styles.semConta}>
        <Texto t="item" maiusculo espacado cor={Cores.texto}>Continuar sem conta</Texto>
        <Texto t="rotulo" cor={Cores.textoApagado}>Seu progresso fica salvo neste aparelho</Texto>
      </Pressable>
    </View>
  );
}

function BotaoEntrar({ rotulo, detalhe, fundo, cor, borda, onPress, icone }: { rotulo: string; detalhe?: string; fundo: string; cor: string; borda?: string; onPress: () => void; icone?: ReactNode }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={detalhe ? `${rotulo}, ${detalhe}` : rotulo}
      onPress={onPress}
      style={({ pressed }) => [styles.botao, { backgroundColor: fundo, borderColor: borda ?? fundo }, pressed && { opacity: 0.85 }]}>
      {/* Espaço fixo de ícone em todos os botões: os textos começam na mesma linha (e os logos oficiais
          do Google e da Apple entram aqui quando o login real for ligado). */}
      <View style={styles.linhaBotao}>
        <View style={styles.slotIcone}>{icone}</View>
        <View style={{ gap: 2 }}>
          <Texto t="item" maiusculo espacado cor={cor}>{rotulo}</Texto>
          {detalhe ? <Texto t="rotulo" cor={cor}>{detalhe}</Texto> : null}
        </View>
      </View>
    </Pressable>
  );
}

// Ícone genérico de impressão digital (arcos concêntricos).
function IconeDigital({ cor }: { cor: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M6.5 5.5A8 8 0 0 1 20 11.5" stroke={cor} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M4 9.5a8 8 0 0 0-.2 2v1.5" stroke={cor} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M7 12a5 5 0 0 1 10 0v1.5c0 2.5-.6 4.8-1.8 6.8" stroke={cor} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M12 12v1.5c0 3.2-1 6-2.8 8" stroke={cor} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M9.5 12.5v1c0 2.4-.7 4.6-2 6.3" stroke={cor} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M14.5 12.5v1.5c0 2.9-.7 5.5-2 7.8" stroke={cor} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  linhaBotao: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  slotIcone: { width: 22, alignItems: 'center' },
  botao: { minHeight: 52, borderRadius: Raio, borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 8, gap: 2 },
  aviso: { borderRadius: Raio - 4, borderWidth: 1, borderColor: Cores.linha, backgroundColor: 'rgba(6,10,18,0.9)', padding: Espaco.md },
  semConta: { alignItems: 'center', gap: 2, minHeight: 48, justifyContent: 'center' },
});
