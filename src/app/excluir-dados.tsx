import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { TelaLegal } from '@/components/tela-legal';
import { Texto } from '@/components/texto';
import { Cores } from '@/constants/theme';
import { excluirDados } from '@/data/legal';
import { useAcesso } from '@/state/acesso';
import { useConta } from '@/state/conta';
import { useIdioma } from '@/state/idioma';
import { useProgresso } from '@/state/progresso';

// Exclusão de dados: explica o que é apagado e apaga, com confirmação em dois toques.
export default function ExcluirDados() {
  const { sair } = useConta();
  const { apagarProgresso } = useProgresso();
  const { sairDaConta } = useAcesso();
  const { escolherIdioma } = useIdioma();
  const [confirmar, setConfirmar] = useState(false);

  async function apagar() {
    apagarProgresso();
    sairDaConta();
    escolherIdioma('pt-BR');
    await AsyncStorage.clear().catch(() => {});
    sair();
    router.replace('/');
  }

  return (
    <TelaLegal pagina={excluirDados}>
      <View style={{ gap: 8 }}>
        {confirmar ? <Texto cor={Cores.textoSuave}>Tem certeza? Isso não pode ser desfeito.</Texto> : null}
        <BotaoPrincipal rotulo={confirmar ? 'Sim, apagar tudo' : 'Apagar meus dados'} onPress={() => (confirmar ? apagar() : setConfirmar(true))} />
        {confirmar ? <BotaoPrincipal secundario rotulo="Cancelar" onPress={() => setConfirmar(false)} /> : null}
      </View>
    </TelaLegal>
  );
}
