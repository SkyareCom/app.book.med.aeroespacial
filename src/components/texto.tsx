import { Children, isValidElement, type ReactNode } from 'react';
import { Text, type TextProps } from 'react-native';

import { Cores, Fonte, Tamanho, type TamanhoTexto } from '@/constants/theme';
import { useTr } from '@/state/idioma';

type Props = TextProps & {
  t?: TamanhoTexto;
  cor?: string;
  maiusculo?: boolean;
  espacado?: boolean;
  // Texto já traduzido (ou que não deve mudar de idioma).
  semTraducao?: boolean;
};

// Traduz os filhos de um texto: se forem todos texto ou número, traduz a frase inteira (com os números como
// variáveis); se houver trechos em destaque (outros Textos), traduz cada pedaço solto.
export function traduzirFilhos(children: ReactNode, tr: (s: string, estrito?: boolean) => string): ReactNode {
  if (typeof children === 'string') return tr(children);
  if (!Array.isArray(children)) return children;
  const lista = Children.toArray(children);
  const soTexto = lista.every((c) => typeof c === 'string' || typeof c === 'number');
  if (soTexto) {
    // A frase inteira primeiro, só na busca direta; depois pedaço a pedaço; por fim a frase com todas as regras.
    const frase = lista.join('');
    const direta = tr(frase, true);
    if (direta !== frase) return direta;
  }
  let mudou = false;
  const pedacos = children.map((c) => {
    if (typeof c !== 'string') return isValidElement(c) ? c : c;
    const t = tr(c);
    if (t !== c) mudou = true;
    return t;
  });
  if (soTexto && !mudou) return tr(lista.join(''));
  return pedacos;
}

// Texto padrão do app: sempre Acme, apenas nos tamanhos do tema, no idioma escolhido.
// Rótulos (10px) e rodapé (9px) usam maiúsculas com espaçamento entre letras.
export function Texto({ t = 'corpo', cor = Cores.texto, maiusculo, espacado, style, semTraducao, children, ...rest }: Props) {
  const tr = useTr();
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
      ]}>
      {semTraducao ? children : traduzirFilhos(children, tr)}
    </Text>
  );
}
