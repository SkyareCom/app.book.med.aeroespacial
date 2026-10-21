import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

type Props = { cor: string; tamanho?: number };

function Base({ cor, tamanho = 20, children }: Props & { children: React.ReactNode }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </Svg>
  );
}

export const IconeHome = (p: Props) => <Base {...p}><Path d="M3 11l9-7 9 7v9H3z" /></Base>;
export const IconeFisiologia = (p: Props) => <Base {...p}><Path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></Base>;
export const IconeClinica = (p: Props) => <Base {...p}><Path d="M3 12h4l2-5 4 10 2-5h6" /></Base>;
export const IconeOperacao = (p: Props) => <Base {...p}><Path d="M2 16l20-8-6 12-3-5-5 3z" /></Base>;
export const IconeEspaco = (p: Props) => (
  <Base {...p}>
    <Circle cx={12} cy={12} r={5} />
    <Ellipse cx={12} cy={12} rx={10} ry={3.5} transform="rotate(-20 12 12)" />
  </Base>
);
export const IconeVoltar = (p: Props) => <Base {...p}><Path d="M15 5l-7 7 7 7" /></Base>;
export const IconeSeta = (p: Props) => <Base {...p}><Path d="M5 12h14M13 6l6 6-6 6" /></Base>;
export const IconeCadeado = (p: Props) => (
  <Base {...p}>
    <Path d="M6 11h12v9H6z" />
    <Path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3" />
  </Base>
);
export const IconeCheck = (p: Props) => <Base {...p}><Path d="M5 12l5 5 9-10" /></Base>;
export const IconeSino = (p: Props) => (
  <Base {...p}>
    <Path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
    <Path d="M10 20.5a2.2 2.2 0 0 0 4 0" />
  </Base>
);
export const IconePerfil = (p: Props) => (
  <Base {...p}>
    <Circle cx={12} cy={8.5} r={3.8} />
    <Path d="M4.5 20.5c1.2-3.8 4-5.8 7.5-5.8s6.3 2 7.5 5.8" />
  </Base>
);
