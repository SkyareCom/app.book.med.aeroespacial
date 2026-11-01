import type { ComponentProps } from 'react';
import { Text } from 'react-native-svg';

import { traduzirFilhos } from '@/components/texto';
import { useTr } from '@/state/idioma';

// Texto dos gráficos SVG no idioma escolhido (mesma regra do componente Texto).
export function SvgText({ children, ...rest }: ComponentProps<typeof Text>) {
  const tr = useTr();
  return <Text {...rest}>{traduzirFilhos(children, tr)}</Text>;
}
