import { useState } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { Barra, Painel } from '@/components/cartoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';
import { catalogo, NOME_GRUPO, type GrupoQuestao } from '@/data/questoes';
import { nivelDominio, NIVEIS_DOMINIO, PATENTES, patentePorXp, PESO_PROVA, PONTOS } from '@/lib/xp';
import { useProgresso } from '@/state/progresso';

const GRUPOS: GrupoQuestao[] = ['conceitos', 'sistemas', 'aviacao', 'espaco', 'historia'];

// Domínio de cada missão: pontos das questões acertadas ÷ pontos de todas as questões já escritas nela.
function useDominio() {
  const { respostas } = useProgresso();
  return GRUPOS.map((g) => {
    const itens = catalogo.filter((i) => i.grupo === g);
    const possivel = itens.reduce((n, i) => n + i.pontos, 0);
    const certo = itens.reduce((n, i) => n + (respostas[i.id]?.certa ? i.pontos : 0), 0);
    const respondidas = itens.filter((i) => respostas[i.id]).length;
    const pct = possivel ? certo / possivel : 0;
    return { g, itens: itens.length, respondidas, pct, nivel: nivelDominio(pct) };
  });
}

// Cartão compacto para a Home.
export function ResumoRanking() {
  const { xp, rankingAtivo } = useProgresso();
  const pat = patentePorXp(xp);
  return (
    <View style={{ gap: 4 }}>
      <View style={styles.entre}>
        <Texto t="item" cor={Cores.dourado}>{pat.atual.nome}</Texto>
        <Texto t="item" cor={Cores.dourado}>{xp} XP</Texto>
      </View>
      <Barra valor={pat.progresso} />
      <Texto cor={Cores.textoApagado}>
        {!rankingAtivo ? 'Ranking desativado' : pat.proxima ? `Faltam ${pat.faltam} XP para ${pat.proxima.nome}` : 'Topo do ranking'}
      </Texto>
    </View>
  );
}

// Ranking completo do Perfil.
export function PainelRanking() {
  const { xp, respostas, rankingAtivo, zerarRanking, definirRankingAtivo } = useProgresso();
  const [confirmarZerar, setConfirmarZerar] = useState(false);
  const pat = patentePorXp(xp);
  const dominio = useDominio();
  const respondidas = Object.keys(respostas).length;
  const certas = Object.values(respostas).filter((r) => r.certa).length;
  // Próxima meta de missão: a de menor domínio entre as que já têm questões.
  const meta = dominio.filter((d) => d.itens > 0).sort((a, b) => a.pct - b.pct)[0];
  const proximoNivel = meta ? NIVEIS_DOMINIO.find((n) => n.min > meta.pct) : undefined;

  return (
    <>
      <Painel>
        <View style={styles.entre}>
          <Texto t="rotulo" cor={Cores.destaque}>Ranking de conhecimento</Texto>
          <Texto t="rotulo" cor={Cores.textoApagado}>Patente {pat.indice} de {pat.total}</Texto>
        </View>
        <View style={styles.entre}>
          <Texto t="titulo" cor={Cores.dourado}>{pat.atual.nome}</Texto>
          <Texto t="titulo" cor={Cores.dourado}>{xp} XP</Texto>
        </View>
        <Barra valor={pat.progresso} />
        <Texto cor={Cores.textoSuave}>
          {pat.proxima ? `Faltam ${pat.faltam} XP para ${pat.proxima.nome}.` : 'Você chegou ao topo do ranking.'}
        </Texto>
        <View style={styles.meta}>
          <Texto t="rotulo" cor={Cores.destaque}>Objetivo</Texto>
          <Texto>{pat.atual.objetivo}</Texto>
        </View>
        <Texto cor={Cores.textoApagado}>{respondidas} questões respondidas · {certas} certas</Texto>
      </Painel>

      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>Domínio por missão</Texto>
        {dominio.map((d) => (
          <View key={d.g} style={{ gap: 4 }}>
            <View style={styles.entre}>
              <Texto t="item">{NOME_GRUPO[d.g]}</Texto>
              <Texto t="rotulo" cor={d.itens ? Cores.dourado : Cores.textoApagado}>{d.itens ? d.nivel.nome : 'Em produção'}</Texto>
            </View>
            <Barra valor={d.pct} />
            <Texto cor={Cores.textoApagado}>{d.itens ? `${d.respondidas} de ${d.itens} questões · ${Math.round(d.pct * 100)}% de domínio` : 'Ainda sem questões'}</Texto>
          </View>
        ))}
        {meta && proximoNivel ? (
          <View style={styles.meta}>
            <Texto t="rotulo" cor={Cores.destaque}>Próxima meta</Texto>
            <Texto>Chegar a {proximoNivel.nome} em {NOME_GRUPO[meta.g]}.</Texto>
          </View>
        ) : null}
      </Painel>

      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>Como pontuar</Texto>
        <Texto cor={Cores.textoSuave}>
          Fácil {PONTOS.facil} XP · Média {PONTOS.media} XP · Difícil {PONTOS.dificil} XP. No Modo prova, cada acerto vale o dobro (peso {PESO_PROVA}). Cada questão só pontua uma vez.
        </Texto>
        <Texto cor={Cores.textoApagado}>
          Patentes: {PATENTES.map((p) => `${p.nome} (${p.xp})`).join(' · ')}.
        </Texto>
        <Texto cor={Cores.textoApagado}>Domínio: {NIVEIS_DOMINIO.map((n) => `${n.nome} (${Math.round(n.min * 100)}%)`).join(' · ')}.</Texto>
      </Painel>

      <Painel>
        <View style={styles.entre}>
          <View style={{ flex: 1, gap: 2 }}>
            <Texto t="item">Ranking ativo</Texto>
            <Texto cor={Cores.textoApagado}>Desativado, as questões podem ser refeitas à vontade, sem XP.</Texto>
          </View>
          <Switch value={rankingAtivo} onValueChange={definirRankingAtivo} trackColor={{ true: Cores.destaque, false: Cores.linha }} accessibilityLabel="Ranking ativo" />
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            if (!confirmarZerar) return setConfirmarZerar(true);
            zerarRanking();
            setConfirmarZerar(false);
          }}
          style={[styles.zerar, confirmarZerar && { borderColor: Cores.erro }]}>
          <Texto t="item" cor={confirmarZerar ? Cores.erro : Cores.texto}>
            {confirmarZerar ? 'Toque de novo para zerar todo o XP' : 'Zerar ranking'}
          </Texto>
        </Pressable>
        {confirmarZerar ? (
          <Pressable accessibilityRole="button" onPress={() => setConfirmarZerar(false)} style={{ alignSelf: 'center', padding: 6 }}>
            <Texto t="rotulo" cor={Cores.textoApagado}>Cancelar</Texto>
          </Pressable>
        ) : null}
      </Painel>
    </>
  );
}

const styles = StyleSheet.create({
  entre: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Espaco.sm },
  meta: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
  zerar: { minHeight: 46, borderRadius: 12, borderWidth: 1, borderColor: Cores.linha, alignItems: 'center', justifyContent: 'center' },
});
