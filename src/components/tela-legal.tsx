import { Link } from 'expo-router';
import { View } from 'react-native';

import { Painel } from '@/components/cartoes';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { EDITORA, PENDENTE } from '@/constants/editora';
import { Cores, Espaco } from '@/constants/theme';
import { PAGINAS_LEGAIS, type PaginaLegal } from '@/data/legal';
import { useTr } from '@/state/idioma';

// Página legal (privacidade, termos, aviso médico, exclusão de dados). Abre também direto pelo link do site,
// sem passar pela tela de entrada (ver ROTAS_LIVRES), porque a Google Play exige que estas páginas sejam públicas.
export function TelaLegal({ pagina, children }: { pagina: PaginaLegal; children?: React.ReactNode }) {
  const tr = useTr();
  const contato = EDITORA.email === PENDENTE ? tr('o e-mail de contato indicado na loja de aplicativos') : EDITORA.email;
  return (
    <Tela titulo={pagina.titulo} rotulo={pagina.rotulo}>
      <Texto t="rotulo" cor={Cores.textoApagado}>{tr('Atualizado em {0}').replace('{0}', tr(EDITORA.atualizadoEm))}</Texto>
      {pagina.secoes.map((s) => (
        <Painel key={s.titulo}>
          <Texto t="rotulo" cor={Cores.destaque}>{s.titulo}</Texto>
          {s.paragrafos.map((p) => (
            <Texto key={p} semTraducao>{tr(p).replace('{0}', contato)}</Texto>
          ))}
        </Painel>
      ))}
      {children}
      <View style={{ gap: Espaco.sm }}>
        <Texto t="rotulo" cor={Cores.textoApagado}>Outras páginas</Texto>
        {PAGINAS_LEGAIS.filter((p) => p.id !== pagina.id).map((p) => (
          <Link key={p.id} href={`/${p.id}`}>
            <Texto cor={Cores.destaque}>{p.titulo}</Texto>
          </Link>
        ))}
      </View>
    </Tela>
  );
}
