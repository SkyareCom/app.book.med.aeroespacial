import { useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, View, type ScrollViewInstance } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { CartaoImagem, Painel } from '@/components/cartoes';
import { Opcoes } from '@/components/midia/opcoes';
import { Selo } from '@/components/selo';
import { rotaEpisodio } from '@/components/streaming';
import { RelacionadosEspecial } from '@/components/especiais';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { ArteLiberacao } from '@/constants/capas';
import { BordaCapa, Cores, Espaco, Raio } from '@/constants/theme';
import type { NivelLiberacao, PerfilPaciente } from '@/data/tipos';
import { avaliarLiberacao, blocosLiberacao, comentarioVeredito, NOME_NIVEL, type QuemResponde } from '@/lib/liberacao';

// Formulário de liberação para voo seguro, no fim da Missão Sistemas (docs/modelo-sistemas.md).
// Três perfis: passageiro e tripulante respondem sobre si; o médico especialista responde sobre o paciente e escolhe
// se ele é passageiro ou tripulante. As perguntas vêm de cada voo de Sistemas (campo `liberacao`).

const COR: Record<NivelLiberacao, string> = {
  liberado: Cores.acerto,
  cuidados: Cores.destaque,
  avaliar: Cores.dourado,
  'nao-voar': Cores.erro,
};

const ROMANO = 'I II III IV V VI VII VIII IX X XI XII'.split(' ');
const romano = (topico?: string) => ROMANO[Number(topico?.split('.')[1] ?? 0) - 1] ?? '';

export default function LiberacaoVoo() {
  const router = useRouter();
  const rolagem = useRef<ScrollViewInstance | null>(null);
  const blocos = useMemo(() => blocosLiberacao(), []);
  const [quem, setQuem] = useState<QuemResponde>('passageiro');
  const [paciente, setPaciente] = useState<PerfilPaciente>('passageiro');
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const perfil: PerfilPaciente = quem === 'medico' ? paciente : quem;
  const medico = quem === 'medico';
  const v = avaliarLiberacao(blocos, respostas, perfil);
  const c = comentarioVeredito(v, quem, perfil);
  const cor = v.respondidas ? COR[v.nivel] : Cores.textoApagado;

  return (
    <Tela titulo="Liberação para voo" rotulo="Fim da Missão 2 · Sistemas" refRolagem={rolagem}>
      <CartaoImagem imagem={ArteLiberacao} altura={190} style={BordaCapa}>
        <Selo texto="Formulário" cor={Cores.dourado} />
        <Texto t="titulo">Voar é seguro?</Texto>
        <Texto cor={Cores.textoSuave}>Perguntas de cada sistema do corpo, com os prazos de repouso, o que muda para o tripulante e um veredito com comentário no final.</Texto>
      </CartaoImagem>

      <Painel style={styles.bloco}>
        <Texto t="rotulo" cor={Cores.destaque}>Quem responde</Texto>
        <Opcoes
          itens={[
            ['passageiro', 'Passageiro'],
            ['tripulante', 'Tripulante'],
            ['medico', 'Médico especialista'],
          ]}
          valor={quem}
          onChange={setQuem}
        />
        {medico ? (
          <>
            <Texto t="rotulo" cor={Cores.destaque}>O paciente é</Texto>
            <Opcoes
              itens={[
                ['passageiro', 'Passageiro'],
                ['tripulante', 'Tripulante'],
              ]}
              valor={paciente}
              onChange={setPaciente}
            />
          </>
        ) : null}
        <Texto cor={Cores.textoApagado}>
          {medico
            ? 'Responda sobre o seu paciente. O veredito traz a norma, o prazo e o que registrar no atestado ou no MEDIF.'
            : perfil === 'tripulante'
              ? 'Piloto, comissário ou mecânico de voo: responda sobre você. Para o tripulante, valem as regras da ANAC e da FAA.'
              : 'Responda sobre você. Para o passageiro, valem as diretrizes médicas de viagem aérea e as regras da companhia.'}
        </Texto>
      </Painel>

      {blocos.map((b) => (
        <View key={b.numero} style={styles.bloco}>
          <Pressable accessibilityRole="link" onPress={() => router.push(rotaEpisodio('sistemas', b.numero))} style={styles.voo}>
            <View style={{ flex: 1, gap: 2 }}>
              <Texto t="rotulo" cor={Cores.destaque}>Missão 2 · Voo {b.numero}</Texto>
              <Texto t="item">{b.titulo}</Texto>
            </View>
            <Texto t="rotulo" cor={Cores.dourado}>Ir ao voo</Texto>
          </Pressable>
          {b.perguntas.map((p) => (
            <Painel key={p.id} style={styles.pergunta}>
              <Texto t="item">{p.pergunta}</Texto>
              {p.ajuda ? <Texto cor={Cores.textoApagado}>{p.ajuda}</Texto> : null}
              <Opcoes
                itens={p.opcoes.map((o, i) => [i, o.rotulo] as [number, string])}
                valor={respostas[p.id]}
                onChange={(i) => setRespostas((r) => ({ ...r, [p.id]: i }))}
                colunas={1}
              />
            </Painel>
          ))}
        </View>
      ))}

      <View style={styles.bloco}>
        <Texto t="rotulo" cor={Cores.textoApagado}>Veredito</Texto>
        <View style={[styles.veredito, { borderColor: cor }]}>
          <Texto t="titulo" cor={cor}>{v.respondidas ? NOME_NIVEL[v.nivel] : 'Aguardando respostas'}</Texto>
          <Texto>{c.texto}</Texto>
          {c.aviso ? <Texto cor={Cores.textoApagado}>{c.aviso}</Texto> : null}
          <Texto t="rotulo" cor={Cores.textoApagado}>{`${v.respondidas} de ${v.total} perguntas respondidas`}</Texto>
        </View>

        {v.itens.map((it, i) => (
          <Painel key={i} style={{ ...styles.item, borderLeftColor: COR[it.efeito.nivel] }}>
            <Texto t="rotulo" cor={COR[it.efeito.nivel]}>{NOME_NIVEL[it.efeito.nivel]}</Texto>
            <Texto t="item">{it.resposta}</Texto>
            <Texto cor={Cores.textoApagado}>{it.pergunta}</Texto>
            <Texto>{medico ? it.efeito.medico : it.efeito.leigo}</Texto>
            {it.efeito.topico ? (
              <Pressable accessibilityRole="link" onPress={() => router.push(rotaEpisodio('sistemas', it.voo))}>
                <View style={styles.revisar}>
                  <Texto t="rotulo" cor={Cores.dourado}>Revisar</Texto>
                  <Texto t="rotulo" cor={Cores.dourado} semTraducao>{`M2V${it.voo} - ${romano(it.efeito.topico)}`}</Texto>
                </View>
              </Pressable>
            ) : null}
          </Painel>
        ))}

        <BotaoPrincipal rotulo="Recomeçar" secundario onPress={() => { setRespostas({}); rolagem.current?.scrollTo({ y: 0, animated: true }); }} />
      </View>

      <Painel>
        <Texto t="rotulo" cor={Cores.textoApagado}>Aviso</Texto>
        <Texto cor={Cores.textoApagado}>
          Ferramenta de apoio à decisão. Não substitui a consulta médica, o médico examinador credenciado, a autoridade aeronáutica (ANAC, FAA) nem as regras da companhia aérea. O formulário cresce a cada voo da Missão Sistemas. Prazos sem fonte consultada aparecem como [confirmar na referência].
        </Texto>
      </Painel>
      <RelacionadosEspecial id="liberacao-voo" />
    </Tela>
  );
}

const styles = StyleSheet.create({
  bloco: { gap: Espaco.md },
  pergunta: { gap: Espaco.sm },
  voo: { flexDirection: 'row', alignItems: 'center', gap: Espaco.md, padding: Espaco.md, borderRadius: Raio, borderWidth: 1, borderColor: Cores.linha, backgroundColor: 'rgba(6,10,18,0.6)' },
  veredito: { gap: Espaco.sm, padding: Espaco.lg, borderRadius: Raio, borderWidth: 1.5, backgroundColor: 'rgba(6,10,18,0.82)' },
  item: { gap: 4, borderLeftWidth: 3 },
  revisar: { flexDirection: 'row', gap: 6 },
});
