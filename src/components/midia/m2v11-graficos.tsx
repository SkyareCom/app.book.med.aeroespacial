import { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, G, Line, Rect } from 'react-native-svg';

import { MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { SvgText } from '@/components/svg-texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// M2V11 · Recursos exploratórios baseados em RBAC 67, FAA AME Guide e CDC Yellow Book.
// Os cenários não liberam voo nem simulam saturação, hemoglobina ou risco individual.
interface Cenario { nome: string; mecanismo: string; passageiro: string; tripulante: string }
function Explorar({ titulo, instrucao, cenarios }: { titulo: string; instrucao: string; cenarios: Cenario[] }) {
  const [indice, setIndice] = useState(0);
  const atual = cenarios[indice];
  return (
    <MolduraMidia tipo="Explorador" titulo={titulo} instrucao={instrucao}>
      <Opcoes itens={cenarios.map((c,i) => [i,c.nome] as [number,string])} valor={indice} onChange={setIndice} colunas={1} />
      <View style={{ gap: Espaco.sm, minWidth: 0 }}>
        <Texto t="rotulo" cor={Cores.destaque}>O QUE MUDA NO CORPO</Texto>
        <Texto>{atual.mecanismo}</Texto>
        <Texto t="rotulo" cor={Cores.dourado}>PASSAGEIRO</Texto>
        <Texto>{atual.passageiro}</Texto>
        <Texto t="rotulo" cor={Cores.dourado}>TRIPULANTE</Texto>
        <Texto>{atual.tripulante}</Texto>
      </View>
    </MolduraMidia>
  );
}
export function SangueCabine() {
  return <Explorar titulo="O sangue na cabine" instrucao="Compare o oxigênio disponível, a circulação e a defesa do organismo." cenarios={[
    { nome:'Oxigênio disponível', mecanismo:'A menor pressão parcial de O₂ na cabine reduz a margem de segurança em quem tem pouca hemoglobina; não diminui o número de hemácias automaticamente.', passageiro:'Avaliar anemia e sintomas antes de viajar.', tripulante:'Capacidade funcional e risco de incapacitação orientam a avaliação aeromédica.' },
    { nome:'Pernas imóveis', mecanismo:'A menor ação muscular reduz o retorno venoso. Em quem tem fatores de risco, a estase favorece trombose.', passageiro:'Movimentar pernas e planejar prevenção conforme risco.', tripulante:'Não operar durante trombose ativa ou condição incapacitante.' },
    { nome:'Defesa reduzida', mecanismo:'Quimioterapia ou imunossupressão podem enfraquecer a capacidade de reagir a agentes infecciosos.', passageiro:'Revisar calendário de vacinas, tratamento e acesso a cuidado.', tripulante:'Avaliar efeitos da doença e do tratamento antes da função.' }
  ]} />;
}
export function AnemiaVoo() {
  return <Explorar titulo="Anemia e coagulação: quando preocupar?" instrucao="Escolha uma condição; hemoglobina isolada não constitui autorização para piloto." cenarios={[
    { nome:'Anemia crônica estável', mecanismo:'A compensação clínica e a causa da anemia importam junto ao hemograma.', passageiro:'Pode ser avaliado para viagem conforme estabilidade e sintomas.', tripulante:'RBAC 67.87/67.127 exige avaliação hematológica individual.' },
    { nome:'Perda de sangue aguda', mecanismo:'A perda súbita reduz volume circulante e entrega de oxigênio, podendo levar a síncope.', passageiro:'Não embarcar até estabilização e avaliação.', tripulante:'Não operar; risco de incapacitação.' },
    { nome:'Anticoagulante cumarínico', mecanismo:'Reduz coagulação mas aumenta risco hemorrágico; suspensão pode gerar trombose.', passageiro:'Não interromper por conta própria; consultar médico.', tripulante:'RBAC 67.87(c)/67.127(c): candidato sob anticoagulação oral cumarínica é julgado não apto.' },
    { nome:'Doença falciforme', mecanismo:'A desoxigenação pode favorecer eventos vaso-oclusivos; traço falciforme não é a mesma condição.', passageiro:'Crise recente exige avaliação antes do voo.', tripulante:'Avaliação individual e da autoridade.' }
  ]} />;
}
export function CancerVoo() {
  return <Explorar titulo="Câncer: risco clínico antes da viagem" instrucao="O risco depende da doença ativa, do tratamento e da reserva funcional." cenarios={[
    { nome:'Seguimento estável', mecanismo:'Recuperação e ausência de complicações permitem planejamento individual.', passageiro:'Confirmar tratamento, documentos e assistência no destino.', tripulante:'Avaliar sequelas, tratamento e certificação pela autoridade.' },
    { nome:'Quimioterapia e neutropenia', mecanismo:'Menos neutrófilos enfraquecem a defesa; febre pode sinalizar infecção grave.', passageiro:'Avaliação urgente diante de febre; adiar conforme risco.', tripulante:'Não operar com instabilidade ou efeitos incapacitantes.' },
    { nome:'Trombose e sangramento', mecanismo:'Neoplasia e terapias alteram coagulação; plaquetas baixas aumentam sangramento.', passageiro:'Investigar sintomas antes de viajar.', tripulante:'Doença e medicamentos exigem análise aeromédica.' }
  ]} />;
}
export function InfeccaoVoo() {
  return <Explorar titulo="Transmissão e segurança do voo" instrucao="Nem toda infecção se transmite pelo ar: avalie agente e gravidade." cenarios={[
    { nome:'Infecção respiratória ativa', mecanismo:'Partículas respiratórias podem alcançar contatos; a ventilação reduz, mas não elimina exposição.', passageiro:'Seguir orientação sanitária; adiar enquanto houver risco relevante de transmissão.', tripulante:'Afastar durante infecção que afete função ou represente risco sanitário.' },
    { nome:'Febre com dispneia', mecanismo:'A infecção e a baixa reserva respiratória somam-se à menor pressão parcial de O₂.', passageiro:'Não embarcar sem avaliação.', tripulante:'Não exercer função.' },
    { nome:'Infecção resolvida', mecanismo:'O risco de contágio depende do agente e da fase da recuperação.', passageiro:'Conferir estabilidade e regras do destino.', tripulante:'Retornar após recuperação e critérios ocupacionais.' }
  ]} />;
}
export function HIVViagem() {
  return <Explorar titulo="HIV: controle, imunidade e voo" instrucao="Condição clínica não deve ser confundida com risco de transmissão aérea." cenarios={[
    { nome:'Tratamento controlado', mecanismo:'A supressão viral e o acompanhamento permitem saúde estável; HIV não se transmite pelo ar da cabine.', passageiro:'Em geral pode viajar mantendo esquema e medicação.', tripulante:'Seguir avaliação aeromédica da autoridade com confidencialidade.' },
    { nome:'Imunidade comprometida', mecanismo:'A defesa reduzida aumenta risco de infecções oportunistas e complicações em destinos de maior exposição.', passageiro:'Planejar com infectologista e considerar adiar até estabilizar.', tripulante:'Não operar enquanto houver risco clínico ou funcional relevante.' },
    { nome:'Mudança de fuso', mecanismo:'Horários irregulares podem levar a doses perdidas e prejudicar a continuidade da terapia.', passageiro:'Planejar tomadas e levar reserva na bagagem de mão.', tripulante:'Revisar regime e interações com examinador, sem automedicação.' }
  ]} />;
}
export function VacinasVoo() {
  return <Explorar titulo="Vacinas, imunidade e destino" instrucao="Compare o tipo de vacina, o estado imunológico e a finalidade da viagem." cenarios={[
    { nome:'Vacina inativada', mecanismo:'Não contém agente replicante; em imunossuprimidos pode ter resposta protetora menor.', passageiro:'Revisar esquema e intervalo com equipe assistente.', tripulante:'Avaliar sintomas e repercussões operacionais.' },
    { nome:'Vacina viva atenuada', mecanismo:'Em imunossupressão grave pode haver contraindicação e risco adicional.', passageiro:'Solicitar parecer especializado e rever rota se necessário.', tripulante:'Verificar restrição clínica e regras sanitárias da rota.' },
    { nome:'Certificado internacional', mecanismo:'A exigência depende do país e da rota, não da altitude do avião.', passageiro:'Conferir documentação oficial antes da viagem.', tripulante:'Planejar com saúde ocupacional e operador.' }
  ]} />;
}
export function AnimacaoHemoglobina() {
  const [fase,setFase]=useState(0);
  const [tocando,setTocando]=useState(true);
  const inicio=useRef<number|null>(null);
  useEffect(()=>{
    if (!tocando)return;
    let quadro=0;
    inicio.current=null;
    const passo=(ts:number)=>{
      if(inicio.current===null)inicio.current=ts;
      setFase(((ts-inicio.current)%8000)/8000);
      quadro=requestAnimationFrame(passo);
    };
    quadro=requestAnimationFrame(passo);
    return ()=>cancelAnimationFrame(quadro);
  },[tocando]);
  const largura=300,altura=174;
  const menorO2=fase>0.3&&fase<0.7;
  const yBolha=menorO2?67:49;
  return <MolduraMidia tipo="Animação" titulo="Hemácias e oxigênio disponível" instrucao="Esquema qualitativo: a pressão parcial do O₂ cai na altitude de cabine. A quantidade de hemácias não cai automaticamente.">
    <Pressable accessibilityRole="button" accessibilityLabel={tocando?'Pausar animação':'Retomar animação'} onPress={()=>setTocando(v=>!v)}>
      <View style={{ width:'100%',alignItems:'center' }}>
        <Svg width="100%" height={altura} viewBox={`0 0 ${largura} ${altura}`}>
          <Rect x="0" y="0" width={largura} height={altura} rx={10} fill="#0A1626" />
          <SvgText x={16} y={22} fontFamily={Fonte} fontSize={11} fill={Cores.dourado}>{menorO2?'CABINE PRESSURIZADA':'NÍVEL DO MAR'}</SvgText>
          <Rect x={16} y={34} width={268} height={115} rx={18} fill="#142538" stroke="#45708F" />
          <Line x1={25} y1={100} x2={277} y2={100} stroke="#345A7B" strokeWidth={1} />
          {Array.from({length:6},(_,i)=>{
            const cx=43+i*42;
            return <G key={i}>
              <Circle cx={cx} cy={103} r={15} fill="#C4475B" stroke="#F18C98" strokeWidth={2}/>
              <Circle cx={cx} cy={103} r={8} fill="#8D2844"/>
              <Circle cx={cx+7} cy={yBolha} r={4} fill="#AEE9FF" fillOpacity={menorO2?0.38:0.95}/>
            </G>;
          })}
          <SvgText x={150} y={166} textAnchor="middle" fill={Cores.textoSuave} fontSize={10} fontFamily={Fonte}>DESENHO DIDÁTICO, NÃO É OXIMETRIA</SvgText>
        </Svg>
      </View>
      <Texto t="rodape" cor={Cores.textoApagado}>{tocando?'TOQUE PARA PAUSAR':'PAUSADO · TOQUE PARA TOCAR'}</Texto>
    </Pressable>
  </MolduraMidia>;
}
