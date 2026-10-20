import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Deslizante } from '@/components/midia/deslizante';
import { MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { CapaEpisodio } from '@/constants/capas';
import { Cores, Espaco } from '@/constants/theme';
import { estagioHipoxia, pesParaMetros } from '@/lib/fisiologia';

const fmt = (n: number) => Math.round(n).toLocaleString('pt-BR');

// O painel da cabine "visto" por um piloto sem oxigênio: escurece, perde nitidez e fecha em túnel.
export function SimuladorVisao() {
  const [alt, setAlt] = useState(5000);
  const est = estagioHipoxia(alt);
  const t = Math.max(0, (alt - 5000) / 20000); // 0 a 1 entre 5.000 e 25.000 ft
  const blur = alt < 15000 ? 0 : ((alt - 15000) / 10000) * 6;
  const tunel = alt < 15000 ? 0 : Math.min(1, (alt - 15000) / 10000);

  return (
    <MolduraMidia tipo="Simulação" titulo="O que a hipóxia faz com a sua visão" instrucao="Respirando ar, sem máscara. Arraste para subir.">
      <View style={styles.tela}>
        <Image source={CapaEpisodio['operacao-4']} style={StyleSheet.absoluteFill} contentFit="cover" blurRadius={blur} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(0,0,0,${(t * 0.6).toFixed(2)})` }]} />
        <LinearGradient colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.lado, { left: 0, width: `${tunel * 45}%` }]} />
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.lado, { right: 0, width: `${tunel * 45}%` }]} />
        <LinearGradient colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']} style={[styles.topo, { top: 0, height: `${tunel * 40}%` }]} />
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={[styles.topo, { bottom: 0, height: `${tunel * 40}%` }]} />
      </View>
      <View>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Altitude</Texto>
          <Texto t="item" cor={Cores.destaque}>{fmt(alt)} ft · {fmt(pesParaMetros(alt))} m</Texto>
        </View>
        <Deslizante min={0} max={25000} passo={500} valor={alt} onChange={setAlt} rotulo="Altitude em pés" formatar={(v) => `${fmt(v)} pés`} />
      </View>
      <View style={{ gap: 4 }}>
        <Texto t="rotulo" cor={alt >= 20000 ? Cores.erro : alt >= 15000 ? Cores.dourado : Cores.destaque}>Estágio {est.nome} · {est.faixa}</Texto>
        {est.sinais.map((s) => (
          <Texto key={s} cor={Cores.textoSuave}>· {s}</Texto>
        ))}
      </View>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  tela: { height: 190, borderRadius: 12, overflow: 'hidden', backgroundColor: '#000' },
  lado: { position: 'absolute', top: 0, bottom: 0 },
  topo: { position: 'absolute', left: 0, right: 0 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Espaco.xs },
});
