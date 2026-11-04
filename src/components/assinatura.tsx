import { useState } from 'react';
import { Linking, Platform, TextInput, View } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { Painel } from '@/components/cartoes';
import { Texto } from '@/components/texto';
import { PENDENTE } from '@/constants/editora';
import { Cores, Espaco, Fonte, Raio } from '@/constants/theme';
import { PRODUTO } from '@/lib/acesso';
import { useAcesso } from '@/state/acesso';
import { useTr } from '@/state/idioma';

// Tela que aparece no lugar de um voo pago para quem ainda não tem o acesso completo (só com COBRANCA_ATIVA).
// Android nativo: compra pela Google Play. Navegador e iPhone (PWA): compra pelo link.
// Nos dois casos, quem já comprou entra com o e-mail da compra e o acesso é liberado.
export function Assinatura({ titulo }: { titulo: string }) {
  const tr = useTr();
  const { email, pedirCodigo, confirmarCodigo, conferir } = useAcesso();
  const [campoEmail, setCampoEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const nativoAndroid = Platform.OS === 'android';

  async function comprar() {
    if (nativoAndroid) {
      // A compra pela Google Play entra quando o produto for criado no Play Console (docs/publicacao.md).
      setAviso('A compra pela Google Play será liberada em breve.');
      return;
    }
    if (PRODUTO.linkCompra === PENDENTE) {
      setAviso('O link de compra será liberado em breve.');
      return;
    }
    Linking.openURL(PRODUTO.linkCompra).catch(() => {});
  }

  return (
    <Painel>
      <Texto t="rotulo" cor={Cores.destaque}>Conteúdo completo</Texto>
      <Texto t="titulo">{titulo}</Texto>
      <Texto cor={Cores.textoSuave}>Este voo faz parte do acesso completo. Uma compra libera todos os voos, nos aparelhos em que você entrar com o mesmo e-mail, e as atualizações que vierem.</Texto>
      <BotaoPrincipal rotulo={nativoAndroid ? 'Comprar pela Google Play' : 'Comprar o acesso completo'} onPress={comprar} />

      <View style={{ gap: Espaco.sm, marginTop: Espaco.md }}>
        {email ? (
          <>
            <Texto cor={Cores.textoSuave}>{tr('Conta: {0}').replace('{0}', email)}</Texto>
            <BotaoPrincipal secundario rotulo="Já comprei: conferir de novo" onPress={() => conferir()} />
          </>
        ) : (
          <>
            <Texto t="rotulo" cor={Cores.textoApagado}>Já comprei</Texto>
            <TextInput
              value={campoEmail}
              onChangeText={setCampoEmail}
              placeholder={tr('Seu e-mail da compra')}
              placeholderTextColor={Cores.textoApagado}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              style={estiloCampo}
            />
            {enviado ? (
              <TextInput
                value={codigo}
                onChangeText={setCodigo}
                placeholder={tr('Código recebido no e-mail')}
                placeholderTextColor={Cores.textoApagado}
                keyboardType="number-pad"
                autoComplete="one-time-code"
                style={estiloCampo}
              />
            ) : null}
            <BotaoPrincipal
              secundario
              rotulo={enviado ? 'Entrar' : 'Receber código por e-mail'}
              onPress={async () => {
                const e = campoEmail.trim().toLowerCase();
                const erro = enviado ? await confirmarCodigo(e, codigo.trim()) : await pedirCodigo(e);
                setAviso(erro);
                if (!erro && !enviado) setEnviado(true);
              }}
            />
          </>
        )}
        {aviso ? <Texto cor={Cores.textoSuave}>{aviso}</Texto> : null}
      </View>
    </Painel>
  );
}

const estiloCampo = {
  fontFamily: Fonte,
  fontSize: 15,
  color: Cores.texto,
  borderWidth: 1,
  borderColor: Cores.linha,
  borderRadius: Raio - 4,
  paddingHorizontal: 14,
  minHeight: 48,
} as const;
