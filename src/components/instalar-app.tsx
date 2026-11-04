import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { Painel } from '@/components/cartoes';
import { Texto } from '@/components/texto';
import { Cores } from '@/constants/theme';

const CHAVE = 'instalar:dispensado';

type Pedido = { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

// Convite para instalar o PWA, só no navegador e só fora do app já instalado.
// iPhone e iPad: o Safari não tem botão de instalar, então o cartão ensina Compartilhar → Adicionar à Tela de Início.
// Android e computador: usa o pedido de instalação do navegador (beforeinstallprompt) quando ele existe.
export function InstalarApp({ margem = 0 }: { margem?: number }) {
  const [mostrar, setMostrar] = useState(false);
  const [ios, setIos] = useState(false);
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const instalado = window.matchMedia?.('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone;
    if (instalado) return;
    const ua = navigator.userAgent;
    const eIos = /iPhone|iPad|iPod/.test(ua) || (ua.includes('Macintosh') && navigator.maxTouchPoints > 1);
    setIos(eIos);
    AsyncStorage.getItem(CHAVE)
      .then((v) => {
        if (!v && eIos) setMostrar(true);
      })
      .catch(() => {});
    const aoPedir = (e: Event) => {
      e.preventDefault();
      setPedido(e as unknown as Pedido);
      AsyncStorage.getItem(CHAVE).then((v) => !v && setMostrar(true)).catch(() => {});
    };
    window.addEventListener('beforeinstallprompt', aoPedir);
    return () => window.removeEventListener('beforeinstallprompt', aoPedir);
  }, []);

  if (!mostrar) return null;

  function dispensar() {
    setMostrar(false);
    AsyncStorage.setItem(CHAVE, '1').catch(() => {});
  }

  return (
    <View style={{ paddingHorizontal: margem }}>
    <Painel>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Texto t="rotulo" cor={Cores.destaque}>Instale o app</Texto>
        <Pressable accessibilityRole="button" accessibilityLabel="Fechar" onPress={dispensar} hitSlop={12}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Fechar</Texto>
        </Pressable>
      </View>
      {ios ? (
        <Texto cor={Cores.textoSuave}>No Safari, toque em Compartilhar e depois em Adicionar à Tela de Início. O Papos de Altitude abre em tela cheia, como um app, e funciona sem internet nos voos que você já abriu.</Texto>
      ) : (
        <>
          <Texto cor={Cores.textoSuave}>Instale o Papos de Altitude neste aparelho: ele abre em tela cheia, como um app, e funciona sem internet nos voos que você já abriu.</Texto>
          {pedido ? (
            <BotaoPrincipal
              rotulo="Instalar"
              onPress={async () => {
                await pedido.prompt();
                await pedido.userChoice.catch(() => null);
                dispensar();
              }}
            />
          ) : null}
        </>
      )}
    </Painel>
    </View>
  );
}
