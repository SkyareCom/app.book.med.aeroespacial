import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do card especial "Adaptação à altitude". Fontes no registro de src/data/adaptacao.ts (CDC Yellow Book;
// OpenAnesthesia e referências citadas por ela).
const fmt = (n: number) => n.toLocaleString('pt-BR');

// ---------------------------------------------------------------- Linha do tempo da adaptação
type Etapa = 'min' | 'hora' | 'dias2' | 'dias5' | 'semanas';
const ETAPAS: [Etapa, string][] = [
  ['min', 'Minutos'],
  ['hora', 'Horas'],
  ['dias2', '2 dias'],
  ['dias5', '3 a 5 dias'],
  ['semanas', 'Semanas'],
];
const SISTEMAS: { nome: string; cor: string; fases: Record<Etapa, string> }[] = [
  {
    nome: 'Respiração',
    cor: Cores.destaque,
    fases: {
      min: 'Os corpos carotídeos mandam respirar mais.',
      hora: 'Respira mais, mas a alcalose freia a resposta.',
      dias2: 'Os rins começam a eliminar bicarbonato.',
      dias5: 'Aclimatação ventilatória: a respiração fica alta de forma sustentada.',
      semanas: 'A respiração alta se mantém; o sono costuma melhorar.',
    },
  },
  {
    nome: 'Coração',
    cor: Cores.erro,
    fases: {
      min: 'O simpático acelera o coração; o débito sobe.',
      hora: 'Frequência e débito acima do normal.',
      dias2: 'Frequência ainda alta.',
      dias5: 'Frequência ainda alta.',
      semanas: 'A frequência cai, mas fica acima do nível do mar; volume sistólico menor.',
    },
  },
  {
    nome: 'Circulação',
    cor: Cores.dourado,
    fases: {
      min: 'As artérias do pulmão se contraem; os vasos do cérebro se dilatam.',
      hora: 'O fluxo de sangue no cérebro aumenta.',
      dias2: 'Pressão pulmonar elevada.',
      dias5: 'Pressão pulmonar elevada.',
      semanas: 'Pressão pulmonar elevada.',
    },
  },
  {
    nome: 'Sangue',
    cor: Cores.acerto,
    fases: {
      min: 'A alcalose prende o oxigênio à hemoglobina.',
      hora: 'Os rins começam a liberar eritropoetina.',
      dias2: 'Eritropoetina em alta; o plasma diminui e concentra a hemoglobina.',
      dias5: 'Hemoglobina concentrada; o 2,3-DPG facilita a entrega.',
      semanas: 'Mais hemácias: a hemoglobina sobe por produção nova.',
    },
  },
];

export function LinhaAdaptacao() {
  const [etapa, setEtapa] = useState<Etapa>('min');
  return (
    <MolduraMidia tipo="Linha do tempo" titulo="O corpo se adaptando à altitude" instrucao="Escolha quanto tempo a pessoa está na altitude e veja o que cada sistema está fazendo.">
      <Opcoes itens={ETAPAS} valor={etapa} onChange={setEtapa} />
      <View style={styles.lista}>
        {SISTEMAS.map((s) => (
          <View key={s.nome} style={[styles.sistema, { borderLeftColor: s.cor }]}>
            <Texto t="rotulo" cor={s.cor}>{s.nome}</Texto>
            <Texto>{s.fases[etapa]}</Texto>
          </View>
        ))}
      </View>
      <Texto cor={Cores.textoApagado}>
        {etapa === 'min' || etapa === 'hora'
          ? 'Num voo, só esta primeira resposta acontece.'
          : 'A aclimatação dos primeiros dias termina em 3 a 5 dias; parte dela continua por semanas a meses.'}
      </Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Subida segura (regras do CDC)
// Estimativa: não ir de < 1.200 m direto para dormir a 2.750 m; 2 noites entre 2.450 e 2.750 m antes de subir mais
// (CDC: 2–3 noites); acima de 3.000 m, no máximo +500 m de altitude de dormir por noite e um dia extra a cada 1.000 m.
function plano(alvo: number) {
  if (alvo < 2750) return { noites: 1, descanso: 0 };
  const aclim = 2;
  const acima = Math.max(alvo - 3000, 0);
  const subidas = 1 + Math.ceil(acima / 500);
  const descanso = Math.floor(acima / 1000);
  return { noites: aclim + subidas + descanso, descanso };
}

export function SubidaSegura() {
  const [alvo, setAlvo] = useState(3500);
  const p = plano(alvo);
  const cor = alvo > 2450 ? Cores.dourado : Cores.acerto;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quantos dias para chegar com segurança" instrucao="Escolha a altitude em que a pessoa vai dormir, saindo de baixo de 1.200 m. A estimativa segue as regras do CDC.">
      <Deslizante min={2000} max={5500} passo={50} valor={alvo} onChange={setAlvo} rotulo="Altitude de dormir" formatar={(v) => `${fmt(v)} m`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Noites até o destino" valor={fmt(p.noites)} cor={cor} />
        <Leitura rotulo="Dias extras de descanso" valor={fmt(p.descanso)} />
      </View>
      <View style={[styles.sistema, { borderLeftColor: cor }]}>
        <Texto>
          {alvo <= 2450
            ? 'Abaixo de 2.450 m, o risco de mal agudo da montanha é pequeno: a pessoa pode dormir no destino já na primeira noite.'
            : alvo < 2750
              ? 'A partir de 2.450 m já há risco: nada de álcool e só exercício leve nas primeiras 48 horas.'
              : 'Não durma a 2.750 m ou mais no dia da chegada. Duas noites entre 2.450 e 2.750 m; acima de 3.000 m, no máximo 500 m a mais por noite e um dia extra a cada 1.000 m.'}
        </Texto>
      </View>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  lista: { gap: Espaco.sm },
  sistema: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.destaque },
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
});
