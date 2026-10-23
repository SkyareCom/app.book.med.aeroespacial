import { useSyncExternalStore } from 'react';
import { Dimensions } from 'react-native';

import { LarguraMaxima } from '@/constants/theme';

function assinarLargura(atualizar: () => void) {
  const assinatura = Dimensions.addEventListener('change', atualizar);
  return () => assinatura.remove();
}

function lerLargura() {
  const largura = Dimensions.get('window').width;
  return largura > 0 ? largura : LarguraMaxima;
}

function lerLarguraServidor() {
  return LarguraMaxima;
}

// O servidor e a primeira renderização da hidratação usam a mesma largura.
// Depois, a assinatura acompanha a largura real e as mudanças da janela.
export function useLarguraJanela() {
  return useSyncExternalStore(assinarLargura, lerLargura, lerLarguraServidor);
}
