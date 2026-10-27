import { usePathname, useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AccessibilityInfo, Animated, Easing, PanResponder, Platform, StyleSheet, View } from 'react-native';

import { useLarguraJanela } from '@/hooks/use-largura-janela';
import { destinoSwipeRodape, indiceAbaRodape, podeIniciarSwipeRodape, ROTAS_RODAPE } from '@/lib/swipe-rodape';

const GestoInterno = createContext<(bloqueado: boolean) => void>(() => {});
const driverNativo = Platform.OS !== 'web';

// Carrosséis continuam consumindo o seu próprio gesto, inclusive nas extremidades.
export function useSwipeInterno() {
  const bloquear = useContext(GestoInterno);
  return {
    onTouchStart: () => bloquear(true),
    onTouchEnd: () => bloquear(false),
    onTouchCancel: () => bloquear(false),
  };
}

// Move somente o conteúdo: cabeçalho e rodapé mantêm tamanho e posição.
export function PaginasRodape({ children, rodape }: { children: ReactNode; rodape: ReactNode }) {
  const caminho = usePathname();
  const router = useRouter();
  const largura = useLarguraJanela();
  const [deslocamento] = useState(() => new Animated.Value(0));
  const estado = useRef({ caminho, largura, bloqueado: false, multiplos: false, ocupado: false, reduzir: false });
  const anterior = useRef(caminho);
  const pendente = useRef<{ caminho: string; sentido: number } | null>(null);
  const espera = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let ativo = true;
    AccessibilityInfo.isReduceMotionEnabled().then((reduzir) => {
      if (ativo) estado.current.reduzir = reduzir;
    });
    const evento = AccessibilityInfo.addEventListener('reduceMotionChanged', (reduzir) => {
      estado.current.reduzir = reduzir;
    });
    return () => { ativo = false; evento.remove(); };
  }, []);

  useLayoutEffect(() => {
    const origem = indiceAbaRodape(anterior.current);
    const destino = indiceAbaRodape(caminho);
    const troca = anterior.current !== caminho;
    const sentido = pendente.current?.caminho === caminho
      ? pendente.current.sentido : Math.sign(destino - origem);
    anterior.current = caminho;
    estado.current.caminho = caminho;
    estado.current.bloqueado = false;
    pendente.current = null;
    if (espera.current) clearTimeout(espera.current);
    deslocamento.stopAnimation();
    if (troca && origem >= 0 && destino >= 0 && !estado.current.reduzir) {
      estado.current.ocupado = true;
      deslocamento.setValue(sentido * estado.current.largura);
      Animated.timing(deslocamento, {
        toValue: 0, duration: 210, easing: Easing.out(Easing.cubic), useNativeDriver: driverNativo,
      }).start(() => { estado.current.ocupado = false; });
    } else {
      deslocamento.setValue(0);
      estado.current.ocupado = false;
    }
  }, [caminho, deslocamento]);

  useEffect(() => {
    estado.current.largura = largura;
    deslocamento.stopAnimation();
    deslocamento.setValue(0);
    estado.current.ocupado = false;
  }, [largura, deslocamento]);

  useEffect(() => () => {
    deslocamento.stopAnimation();
    if (espera.current) clearTimeout(espera.current);
  }, [deslocamento]);

  const gestos = useMemo(() => {
    function restaurar() {
      estado.current.ocupado = true;
      Animated.timing(deslocamento, {
        toValue: 0, duration: estado.current.reduzir ? 0 : 160,
        easing: Easing.out(Easing.cubic), useNativeDriver: driverNativo,
      }).start(() => { estado.current.ocupado = false; });
    }

    // O factory armazena os callbacks; as refs só são lidas durante os eventos.
    // eslint-disable-next-line react-hooks/refs
    return PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gesto) => podeIniciarSwipeRodape(estado.current.caminho, {
        dx: gesto.dx, dy: gesto.dy, toques: gesto.numberActiveTouches,
        bloqueado: estado.current.bloqueado || estado.current.ocupado || estado.current.multiplos,
      }),
      onPanResponderGrant: () => { deslocamento.stopAnimation(); },
      onPanResponderMove: (_, gesto) => {
        if (gesto.numberActiveTouches > 1) estado.current.multiplos = true;
        if (estado.current.multiplos) { deslocamento.setValue(0); return; }
        const indice = indiceAbaRodape(estado.current.caminho);
        const extremo = (indice === 0 && gesto.dx > 0) || (indice === ROTAS_RODAPE.length - 1 && gesto.dx < 0);
        const dx = gesto.dx * (extremo ? 0.15 : 1);
        deslocamento.setValue(Math.max(-estado.current.largura, Math.min(estado.current.largura, dx)));
      },
      onPanResponderRelease: (_, gesto) => {
        const destino = estado.current.multiplos ? null : destinoSwipeRodape(estado.current.caminho, {
          dx: gesto.dx, dy: gesto.dy, vx: gesto.vx, largura: estado.current.largura,
        });
        if (!destino) { restaurar(); return; }
        const origem = estado.current.caminho;
        const sentido = gesto.dx < 0 ? 1 : -1;
        estado.current.ocupado = true;
        const navegar = () => {
          pendente.current = { caminho: destino, sentido };
          // Não deixar a tela fora do quadro se uma navegação for interrompida.
          espera.current = setTimeout(() => {
            pendente.current = null;
            restaurar();
          }, 1800);
          router.replace(destino);
        };
        if (estado.current.reduzir) { navegar(); return; }
        Animated.timing(deslocamento, {
          toValue: -sentido * estado.current.largura, duration: 130,
          easing: Easing.out(Easing.cubic), useNativeDriver: driverNativo,
        }).start(({ finished }) => {
          if (finished && estado.current.caminho === origem) navegar();
        });
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderTerminate: restaurar,
    });
  }, [deslocamento, router]);

  const bloquear = useMemo(() => (valor: boolean) => { estado.current.bloqueado = valor; }, []);
  const toque = (quantidade: number) => { estado.current.multiplos = quantidade > 1; };

  return (
    <GestoInterno.Provider value={bloquear}>
      <View style={styles.raiz}>
        <View
          testID="paginas-rodape"
          style={styles.conteudo}
          onLayout={(e) => { estado.current.largura = e.nativeEvent.layout.width; }}
          onTouchStart={(e) => toque(e.nativeEvent.touches.length)}
          {...gestos.panHandlers}>
          <Animated.View testID="transicao-rodape" style={[styles.raiz, { transform: [{ translateX: deslocamento }] }]}>
            {children}
          </Animated.View>
        </View>
        <View testID="gesto-rodape" onTouchStart={(e) => toque(e.nativeEvent.touches.length)} {...gestos.panHandlers}>
          {rodape}
        </View>
      </View>
    </GestoInterno.Provider>
  );
}

const styles = StyleSheet.create({
  raiz: { flex: 1 },
  conteudo: { flex: 1, overflow: 'hidden' },
});
