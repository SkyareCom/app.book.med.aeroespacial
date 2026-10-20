import { Text, type TextProps } from 'react-native';

import { Cores, Fonte, Tamanho, type TamanhoTexto } from '@/constants/theme';

type Props = TextProps & {
  t?: TamanhoTexto;
  cor?: string;
  maiusculo?: boolean;
  espacado?: boolean;
};

// Texto padrão do app: sempre Acme, apenas nos tamanhos do tema.
// Rótulos (10px) e rodapé (9px) usam maiúsculas com espaçamento entre letras.
export function Texto({ t = 'corpo', cor = Cores.texto, maiusculo, espacado, style, ...rest }: Props) {
  const tamanho = Tamanho[t];
  const caixaAlta = maiusculo ?? (t === 'rotulo' || t === 'rodape');
  const espaco = espacado ?? caixaAlta;
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: Fonte,
          fontSize: tamanho,
          lineHeight: Math.round(tamanho * (t === 'corpo' ? 1.5 : 1.3)),
          color: cor,
          textTransform: caixaAlta ? 'uppercase' : 'none',
          letterSpacing: espaco ? tamanho * 0.18 : 0,
        },
        style,
      ]}
    />
  );
}
