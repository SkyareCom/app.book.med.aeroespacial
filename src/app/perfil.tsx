import { StyleSheet, View } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { Barra, Painel } from '@/components/cartoes';
import { IconePerfil } from '@/components/icones';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';
import { totalCapitulos } from '@/data/secoes';
import { useConta, type ModoEntrada } from '@/state/conta';
import { nivelPorConcluidos, useProgresso } from '@/state/progresso';

const DESCRICAO: Record<ModoEntrada, { titulo: string; texto: string }> = {
  google: { titulo: 'Conta Google', texto: 'Você entrou com o Google.' },
  apple: { titulo: 'Conta Apple', texto: 'Você entrou com a Apple.' },
  biometria: { titulo: 'Biometria', texto: 'Você entrou com Face ID, Touch ID ou digital.' },
  convidado: { titulo: 'Sem conta', texto: 'Seu progresso fica salvo só neste aparelho.' },
};

// Perfil: como a pessoa entrou, nível e progresso nas missões, e a opção de entrar ou sair.
export default function Perfil() {
  const { modo, sair } = useConta();
  const { concluidos, melhoresNotas } = useProgresso();
  const conta = DESCRICAO[modo ?? 'convidado'];
  const pct = concluidos.length / totalCapitulos;

  return (
    <Tela titulo="Perfil" rotulo="Sua conta e seu progresso">
      <Painel>
        <View style={styles.linha}>
          <View style={styles.avatar}>
            <IconePerfil cor={Cores.destaque} tamanho={26} />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Texto t="rotulo" cor={Cores.destaque}>Conta</Texto>
            <Texto t="item">{conta.titulo}</Texto>
            <Texto cor={Cores.textoSuave}>{conta.texto}</Texto>
          </View>
        </View>
      </Painel>

      <Painel>
        <View style={styles.entre}>
          <Texto t="rotulo" cor={Cores.destaque}>Seu progresso</Texto>
          <Texto t="rotulo" cor={Cores.textoApagado}>Nível · {nivelPorConcluidos(concluidos.length)}</Texto>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: Espaco.md }}>
          <Texto t="titulo">{Math.round(pct * 100)}%</Texto>
          <Texto cor={Cores.textoApagado}>{concluidos.length} de {totalCapitulos} voos concluídos</Texto>
        </View>
        <Barra valor={pct} />
        <Texto cor={Cores.textoSuave}>{Object.keys(melhoresNotas).length} testes feitos</Texto>
      </Painel>

      {modo === 'convidado' || !modo ? (
        <BotaoPrincipal rotulo="Entrar na conta" onPress={sair} />
      ) : (
        <BotaoPrincipal rotulo="Sair da conta" secundario onPress={sair} />
      )}
    </Tela>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: Espaco.md },
  entre: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 1, borderColor: Cores.destaque, alignItems: 'center', justifyContent: 'center' },
});
