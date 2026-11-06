import { useState } from 'react';
import { View } from 'react-native';

import { MolduraMidia, Leitura } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// M2V10 · Interativos clínicos. Mesmas fontes do registro de src/data/capitulos/digestivo.ts.
// Não são calculadoras de autorização: a aptidão depende do médico, do caso e da autoridade.
interface Cenario {
  nome: string;
  mecanismo: string;
  passageiro: string;
  tripulante: string;
}
function Explorar({ titulo, instrucao, cenarios }: { titulo: string; instrucao: string; cenarios: Cenario[] }) {
  const [indice, setIndice] = useState(0);
  const atual = cenarios[indice];
  return (
    <MolduraMidia tipo="Explorador" titulo={titulo} instrucao={instrucao}>
      <Opcoes itens={cenarios.map((c, i) => [i, c.nome] as [number, string])} valor={indice} onChange={setIndice} colunas={1} />
      <View style={{ gap: Espaco.sm }}>
        <Texto t="rotulo" cor={Cores.destaque}>O QUE ACONTECE NO CORPO</Texto>
        <Texto>{atual.mecanismo}</Texto>
        <Texto t="rotulo" cor={Cores.dourado}>PASSAGEIRO</Texto>
        <Texto>{atual.passageiro}</Texto>
        <Texto t="rotulo" cor={Cores.dourado}>TRIPULANTE</Texto>
        <Texto>{atual.tripulante}</Texto>
      </View>
    </MolduraMidia>
  );
}

export function DigestivoVoo() {
  return <Explorar titulo="O aparelho digestivo dentro da cabine" instrucao="Escolha um fator do voo para entender o mecanismo e a proteção." cenarios={[
    { nome: 'Gás que expande', mecanismo: 'A pressão cai durante a subida. Gás preso no intestino aumenta de volume e pode distender alças e suturas recentes.', passageiro: 'Se há obstrução ou cirurgia recente, não embarque sem avaliação. Distensão progressiva e dor forte exigem urgência.', tripulante: 'Não operar com dor ou obstrução; a ANAC avalia risco de incapacitação.' },
    { nome: 'Menos oxigênio', mecanismo: 'Menor pressão parcial de oxigênio na cabine soma-se à redução do transporte de oxigênio quando há sangramento ou anemia.', passageiro: 'Sangramento digestivo com tontura, desmaio ou palidez precisa de atendimento antes do voo.', tripulante: 'Aptidão depende da reserva clínica e da ausência de incapacidade funcional.' },
    { nome: 'Ar seco e diarreia', mecanismo: 'A diarreia elimina água e sais. Menor ingestão de líquidos durante o voo pode agravar a queda do volume circulante.', passageiro: 'Reidratar e adiar em caso de perdas importantes ou incapacidade para beber.', tripulante: 'Não assumir função desidratado ou com urgência fecal incapacitante.' },
    { nome: 'Imobilidade e fuso', mecanismo: 'A mudança das refeições e do movimento altera o hábito intestinal e a rotina de medicamentos.', passageiro: 'Seguir alimentação tolerada, beber líquidos conforme orientação e caminhar quando permitido.', tripulante: 'Preparar horários dos remédios e não trabalhar com efeitos adversos.' }
  ]} />;
}

export function RefluxoVoo() {
  return <Explorar titulo="Azia, úlcera ou sangramento?" instrucao="Compare três situações distintas: sintoma leve não equivale a complicação." cenarios={[
    { nome: 'Azia controlada', mecanismo: 'O ácido volta ao esôfago; causa queimação, mas não significa necessariamente úlcera.', passageiro: 'Viajar com cuidados quando os sintomas estão leves e controlados.', tripulante: 'Informar o quadro e o tratamento ao examinador, sem sintomas que reduzam a segurança.' },
    { nome: 'Úlcera ativa', mecanismo: 'Uma ferida na mucosa pode sangrar ou perfurar, especialmente se houver agravamento.', passageiro: 'Avaliação antes do voo; dor intensa impede embarque seguro.', tripulante: 'Afastar-se até recuperação e avaliação aeromédica.' },
    { nome: 'Sangramento', mecanismo: 'Perda de sangue reduz o volume circulante e pode causar queda de pressão e desmaio.', passageiro: 'Não embarcar; buscar urgência.', tripulante: 'Não operar; buscar urgência e comunicar o examinador.' }
  ]} />;
}

export function IntestinoCrise() {
  return <Explorar titulo="Intestino: estabilidade ou crise?" instrucao="A decisão muda pelo estado clínico, não só pelo nome da doença." cenarios={[
    { nome: 'Estável', mecanismo: 'Intestino irritável ou doença inflamatória em remissão, sem perdas importantes e sem dor incapacitante.', passageiro: 'Planejar dieta e acesso ao banheiro; manter medicação.', tripulante: 'Na FAA e na EASA, avaliar estabilidade, recaídas e remédios antes de certificar.' },
    { nome: 'Diarreia intensa', mecanismo: 'Água e sais são eliminados nas fezes; desidratação pode provocar fraqueza, hipotensão e confusão.', passageiro: 'Adiar se não consegue manter hidratação ou apresenta tontura importante.', tripulante: 'Não exercer função com perdas importantes ou urgência evacuatória incapacitante.' },
    { nome: 'Febre ou sangue', mecanismo: 'Podem indicar infecção invasiva ou inflamação grave, com risco de agravamento.', passageiro: 'Procurar avaliação; não usar loperamida isoladamente.', tripulante: 'Não voar durante a crise; retomar somente após avaliação.' }
  ]} />;
}

export function FigadoRisco() {
  return <Explorar titulo="Fígado: doença estável ou descompensada?" instrucao="Veja o mecanismo que torna algumas complicações incapacitantes." cenarios={[
    { nome: 'Doença estável', mecanismo: 'Função preservada e ausência de sangramento ou alteração de consciência permitem avaliação individual.', passageiro: 'Viajar conforme orientação do especialista e o plano terapêutico.', tripulante: 'Apresentar relatório e avaliação aeromédica; aptidão não é automática.' },
    { nome: 'Ascite importante', mecanismo: 'Pressão na circulação porta e retenção de líquido distendem o abdome e podem comprometer conforto e respiração.', passageiro: 'Reavaliar antes do embarque, inclusive o plano de líquidos.', tripulante: 'Não operar com descompensação.' },
    { nome: 'Encefalopatia', mecanismo: 'Substâncias não depuradas pelo fígado afetam o cérebro: sonolência, desorientação e confusão.', passageiro: 'Não embarcar sem estabilização e avaliação.', tripulante: 'Não exercer função: risco de incapacitação.' },
    { nome: 'Sangramento por varizes', mecanismo: 'A pressão na circulação porta dilata veias do esôfago, que podem romper e causar hemorragia.', passageiro: 'Sangramento ativo é emergência. Varizes conhecidas exigem avaliação antes de viajar.', tripulante: 'EASA/UK CAA: varizes esofágicas são condição de inaptidão; avaliação da autoridade.' }
  ]} />;
}

export function BiliarDecidir() {
  return <Explorar titulo="Vesícula e pâncreas: quando não voar?" instrucao="A dor e a inflamação mudam completamente o risco." cenarios={[
    { nome: 'Cálculo sem sintomas', mecanismo: 'A pedra está presente, mas ainda não bloqueia o ducto nem provoca crise.', passageiro: 'Pode ser considerado apto para viagem depois de avaliação clínica.', tripulante: 'A FAA e a EASA avaliam o quadro e risco de incapacidade, conforme classe.' },
    { nome: 'Cólica ou obstrução', mecanismo: 'O bloqueio pode provocar dor intensa, inflamação da vesícula e icterícia.', passageiro: 'Não embarcar com crise; investigar.', tripulante: 'Não assumir função até tratamento e reavaliação.' },
    { nome: 'Pancreatite ativa', mecanismo: 'Enzimas digestivas desencadeiam inflamação do pâncreas e podem causar resposta sistêmica.', passageiro: 'Não voar durante doença ativa; atendimento médico.', tripulante: 'EASA/UK CAA: inapto enquanto não houver recuperação e avaliação.' }
  ]} />;
}

type Perfil = 'passageiro' | 'tripulante';
const PRAZOS: Record<Perfil, { nome: string; detalhe: string; conduta: string }[]> = {
  passageiro: [
    { nome: 'Cirurgia abdominal', detalhe: 'UK CAA: evitar voar nos primeiros 10 dias após cirurgia abdominal.', conduta: 'Depois, o cirurgião ainda deve verificar recuperação, suturas, intestino e complicações.' },
    { nome: 'Colonoscopia com gás', detalhe: 'UK CAA: evitar voar por 24 horas se foi introduzido grande volume de gás.', conduta: 'Esse intervalo não cobre complicações nem outras intervenções.' },
    { nome: 'Laparoscopia: gás residual', detalhe: 'UK CAA: cerca de 24 horas para o gás residual diminuir.', conduta: 'O intervalo NÃO libera automaticamente cirurgia laparoscópica maior: avaliar os 10 dias e o procedimento.' }
  ],
  tripulante: [
    { nome: 'Laparoscopia diagnóstica', detalhe: 'UK CAA pilotos: considerar após 1 semana.', conduta: 'Somente com recuperação, sem sintomas e avaliação aeromédica.' },
    { nome: 'Laparoscopia maior', detalhe: 'UK CAA pilotos: considerar após 3 a 4 semanas (ex.: colecistectomia ou hérnia).', conduta: 'Não é prazo de liberação automática; reavaliar cicatrização e atividade física.' },
    { nome: 'Cirurgia abdominal maior', detalhe: 'UK CAA pilotos: considerar após 2 a 3 meses (ex.: colectomia).', conduta: 'Depende de recuperação completa e acompanhamento pós-operatório.' },
    { nome: 'Endoscopia com biópsia', detalhe: 'UK CAA pilotos: pelo menos 48 horas após endoscopia digestiva baixa com biópsia ou polipectomia.', conduta: 'Informar o examinador; não retorna se houver dor ou sangramento.' }
  ]
};
export function PrazoCirurgiaDigestiva() {
  const [perfil, setPerfil] = useState<Perfil>('passageiro');
  const [procedimento, setProcedimento] = useState(0);
  const lista = PRAZOS[perfil];
  const atual = lista[Math.min(procedimento, lista.length - 1)];
  return (
    <MolduraMidia tipo="Explorador" titulo="Cirurgia e retorno ao voo" instrucao="Selecione o perfil e o procedimento. Os intervalos são referências de autoridades britânicas, não uma autorização individual.">
      <Opcoes<Perfil> itens={[[ 'passageiro', 'Passageiro' ], [ 'tripulante', 'Tripulante' ]]} valor={perfil} onChange={(v) => { setPerfil(v); setProcedimento(0); }} colunas={2} />
      <Opcoes itens={lista.map((c, i) => [i, c.nome] as [number, string])} valor={procedimento} onChange={setProcedimento} colunas={1} />
      {/* Leitura usa flexBasis percentual de largura; precisa de pai em linha para
          não converter o percentual em altura e deixar os textos escaparem no web mobile. */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', minWidth: 0 }}>
        <Leitura rotulo="Orientação publicada" valor={perfil === 'passageiro' ? 'Passageiro' : 'Piloto / tripulante'} cor={Cores.dourado} />
      </View>
      <Texto>{atual.detalhe}</Texto>
      <Texto>{atual.conduta}</Texto>
      <Texto t="rotulo" cor={Cores.textoApagado}>No Brasil, para tripulantes, a decisão é feita conforme o RBAC 67 e o examinador. Dor, sangramento ou sintomas incapacitantes impedem operar.</Texto>
    </MolduraMidia>
  );
}
