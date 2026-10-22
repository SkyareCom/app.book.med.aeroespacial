import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';

import { Questionario, type Modo } from '@/components/questionario';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Cores } from '@/constants/theme';
import { eras } from '@/data/historia';
import { chaveCapitulo, obterCapitulo, obterSecao, secoes } from '@/data/secoes';
import type { Questao } from '@/data/tipos';
import { useProgresso } from '@/state/progresso';

// Teste no fim do capítulo, história completa e Modo quiz / Modo prova da Home.
// A origem era continua aceitando os links antigos.
export default function TelaTeste() {
  const p = useLocalSearchParams<{ origem?: string; secao?: string; numero?: string; era?: string; modo?: string }>();
  const router = useRouter();
  const { registrarTeste } = useProgresso();
  const [rodada, setRodada] = useState(0);
  const modo: Modo = p.modo === 'prova' ? 'prova' : 'quiz';

  const { questoes, titulo, rotulo, chave } = useMemo(() => {
    if (p.origem === 'capitulo' && p.secao && p.numero) {
      const c = obterCapitulo(p.secao, Number(p.numero));
      return { questoes: c?.teste ?? [], titulo: c?.titulo ?? '', rotulo: `Teste · ${obterSecao(p.secao)?.titulo ?? ''}`, chave: chaveCapitulo(p.secao, Number(p.numero)) };
    }
    if (p.origem === 'historia') {
      return { questoes: eras.flatMap((era) => era.teste), titulo: 'O Voo e a Medicina', rotulo: 'Teste · Missão especial', chave: undefined };
    }
    if (p.origem === 'era' && p.era) {
      const e = eras.find((x) => x.id === p.era);
      return { questoes: e?.teste ?? [], titulo: e?.titulo ?? '', rotulo: 'Teste · O Voo e a Medicina', chave: undefined };
    }
    const todas: Questao[] = [...secoes.flatMap((s) => s.capitulos.flatMap((c) => c.teste ?? [])), ...eras.flatMap((e) => e.teste)];
    const sorteadas = embaralhar(todas).slice(0, modo === 'prova' ? 10 : 8);
    return { questoes: sorteadas, titulo: modo === 'prova' ? 'Modo prova' : 'Modo quiz', rotulo: 'Questões de todo o app', chave: undefined };
    // rodada entra na dependência para sortear de novo ao refazer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.origem, p.secao, p.numero, p.era, modo, rodada]);

  if (!questoes.length) {
    return (
      <Tela titulo="Teste indisponível">
        <Texto cor={Cores.textoSuave}>Este teste ainda está em produção.</Texto>
      </Tela>
    );
  }

  return (
    <Tela titulo={titulo} rotulo={rotulo}>
      <Questionario
        key={rodada}
        questoes={questoes}
        modo={modo}
        onConcluir={(acertos, total) => chave && registrarTeste(chave, acertos, total)}
        onRefazer={() => setRodada((r) => r + 1)}
        onRevisar={
          p.origem === 'capitulo' && p.secao && p.numero
            ? (topico) => router.replace({ pathname: '/capitulo/[secao]/[numero]', params: { secao: p.secao!, numero: p.numero!, topico } })
            : p.origem === 'era' || p.origem === 'historia'
              ? () => router.back()
              : undefined
        }
      />
    </Tela>
  );
}

function embaralhar<T>(lista: T[]) {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
