import { useEffect, useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

import { LarguraMaxima } from '@/constants/theme';

// Largura da janela segura para a versão web pré-renderizada.
// No site estático as páginas são geradas sem tela (largura 0) e o navegador
// não corrige estilos divergentes na hidratação. Por isso, na web, a primeira
// renderização usa a largura máxima do app e a largura real entra após montar.
export function useLarguraJanela() {
  const { width } = useWindowDimensions();
  const [montado, setMontado] = useState(Platform.OS !== 'web');
  useEffect(() => setMontado(true), []);
  return montado && width > 0 ? width : LarguraMaxima;
}
