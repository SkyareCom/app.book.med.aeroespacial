import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M2V15 · Envelhecimento e limites de idade. Fontes no registro de src/data/capitulos/envelhecimento.ts:
// ICAO Anexo 1, 2.1.10.1 e 1.2.5.2.3; FAA 14 CFR 61.23, 67.111, 121.383(d) e Summary of Medical Standards; ANAC RBAC 61
// (Emenda 04) e Resolução 280/2013; UK CAA Part-MED; EASA Pilots' Age Limits Study (2019); CDC Yellow Book; AGS.
// Os recursos orientam e não liberam voo.
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });

function Marca({ cor, children }: { cor: string; children: string }) {
  return (
    <View style={[styles.marca, { borderLeftColor: cor }]}>
      <Texto>{children}</Texto>
    </View>
  );
}

function Controle(p: Parameters<typeof Deslizante>[0]) {
  return (
    <View style={{ gap: 4 }}>
      <View style={styles.linha}>
        <Texto t="rotulo" cor={Cores.textoApagado}>{p.rotulo}</Texto>
        <Texto t="item" cor={Cores.destaque}>{p.formatar ? p.formatar(p.valor) : fmt(p.valor)}</Texto>
      </View>
      <Deslizante {...p} />
    </View>
  );
}

function Bloco({ rotulo, cor, texto }: { rotulo: string; cor: string; texto: string }) {
  return (
    <View style={{ gap: 4 }}>
      <Texto t="rotulo" cor={Cores.textoApagado}>{rotulo}</Texto>
      <Marca cor={cor}>{texto}</Marca>
    </View>
  );
}

type Item = { nome: string; corpo: string; fazer: string };
function Explorador({ titulo, instrucao, itens, rotulo1, rotulo2 }: { titulo: string; instrucao: string; itens: Item[]; rotulo1: string; rotulo2: string }) {
  const [i, setI] = useState(0);
  const k = itens[i];
  return (
    <MolduraMidia tipo="Explorador" titulo={titulo} instrucao={instrucao}>
      <Opcoes itens={itens.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} colunas={2} />
      <Bloco rotulo={rotulo1} cor={Cores.destaque} texto={k.corpo} />
      <Bloco rotulo={rotulo2} cor={Cores.dourado} texto={k.fazer} />
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- O corpo que envelhece no voo (abertura)
const FATORES: Item[] = [
  { nome: 'Menos oxigênio', corpo: 'Pulmão e coração compensam com menos folga; quem já tem doença sente primeiro.', fazer: 'Consulta antes de viagens longas e, se o médico indicar, oxigênio combinado com 72 h.' },
  { nome: 'Ar seco', corpo: 'A sede fica menos sensível e o rim concentra menos: a desidratação chega sem aviso.', fazer: 'Beber água mesmo sem sede, em goles ao longo do voo.' },
  { nome: 'Horas sentado', corpo: 'Risco de trombose maior que a média e pressão que cai ao levantar.', fazer: 'Caminhar, mexer as panturrilhas e sentar um pouco antes de ficar de pé.' },
  { nome: 'Ruído e pouca luz', corpo: 'A presbiopia e a perda dos agudos escondem letras pequenas e avisos.', fazer: 'Óculos de perto à mão, luz de leitura e pedir para repetir.' },
  { nome: 'Fuso e sono', corpo: 'O sono mais leve se ajusta mais devagar, e o calmante soma confusão.', fazer: 'Um dia a mais para o fuso e nada novo para dormir.' },
  { nome: 'Vários remédios', corpo: 'Juntos, somam sono, tontura e queda de pressão.', fazer: 'Lista escrita na bagagem de mão e horário combinado com o médico.' },
];

export function IdadeVoo() {
  return <Explorador titulo="O corpo que envelhece no voo" instrucao="Escolha um fator do voo para ver o que muda com a idade e o que fazer." itens={FATORES} rotulo1="O que muda com a idade" rotulo2="O que fazer" />;
}

// ---------------------------------------------------------------- Visão e idade (FAA)
export function VisaoIdade() {
  const [idade, setIdade] = useState(48);
  const [classe, setClasse] = useState<'12' | '3'>('12');
  const intermediaria = idade >= 50 && classe === '12';
  return (
    <MolduraMidia tipo="Calculadora" titulo="Visão de perto e idade" instrucao="Mova a idade e escolha a classe para ver o que a FAA exige de visão de perto e do painel.">
      <Controle min={30} max={70} passo={1} valor={idade} onChange={setIdade} rotulo="Idade" formatar={(v) => `${fmt(v)} anos`} />
      <Opcoes itens={[['12', '1ª ou 2ª classe'], ['3', '3ª classe']] as ['12' | '3', string][]} valor={classe} onChange={setClasse} colunas={2} />
      <View style={styles.leituras}>
        <Leitura rotulo="Perto (40 cm)" valor="20/40" cor={Cores.destaque} />
        <Leitura rotulo="Painel (80 cm)" valor={intermediaria ? '20/40' : 'Não exigida'} cor={intermediaria ? Cores.dourado : Cores.textoApagado} />
      </View>
      <Marca cor={intermediaria ? Cores.dourado : Cores.acerto}>
        {intermediaria
          ? 'A partir dos 50 anos, a 1ª e a 2ª classes exigem também a visão intermediária, a distância do painel. Óculos multifocais ou de meia distância resolvem.'
          : idade >= 40
            ? 'A presbiopia costuma aparecer a partir dos 40 e poucos anos: quando a leitura falhar com pouca luz, revise o grau.'
            : 'Visão de perto 20/40 a 16 polegadas, com ou sem óculos, em todas as classes.'}
      </Marca>
      <Texto cor={Cores.textoApagado}>Com óculos, o tripulante leva sempre um par de reserva.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Validade do certificado médico por idade
type Aut = 'faa' | 'europa' | 'anac';
type Op = 'linha' | 'sozinho' | 'privado';
function validade(aut: Aut, op: Op, idade: number): number {
  if (op === 'privado') {
    if (aut === 'faa') return idade < 40 ? 60 : 24;
    return idade < 40 ? 60 : idade < 50 ? 24 : 12;
  }
  if (aut === 'faa') return op === 'linha' && idade >= 40 ? 6 : 12;
  if (idade >= 60) return 6;
  if (op === 'sozinho' && idade >= 40) return 6;
  return 12;
}

export function ValidadeCma() {
  const [aut, setAut] = useState<Aut>('anac');
  const [op, setOp] = useState<Op>('linha');
  const [idade, setIdade] = useState(45);
  const meses = validade(aut, op, idade);
  const ecg = aut === 'faa' && op === 'linha' ? (idade >= 40 ? 'ECG todo ano (1ª classe)' : idade >= 35 ? 'ECG na primeira solicitação após os 35' : 'ECG ainda não exigido por idade') : '';
  return (
    <MolduraMidia tipo="Calculadora" titulo="Validade do certificado médico" instrucao="Escolha a autoridade, o tipo de voo e a idade para ver quanto tempo vale o certificado.">
      <Opcoes itens={[['anac', 'ANAC'], ['faa', 'FAA'], ['europa', 'Europa']] as [Aut, string][]} valor={aut} onChange={setAut} colunas={3} />
      <Opcoes itens={[['linha', 'Linha aérea ou comercial'], ['sozinho', 'Comercial com um só piloto e passageiros'], ['privado', 'Privado']] as [Op, string][]} valor={op} onChange={setOp} colunas={1} />
      <Controle min={18} max={75} passo={1} valor={idade} onChange={setIdade} rotulo="Idade no exame" formatar={(v) => `${fmt(v)} anos`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Validade" valor={`${fmt(meses)} meses`} cor={meses <= 6 ? Cores.dourado : Cores.acerto} />
      </View>
      {ecg ? <Marca cor={Cores.destaque}>{ecg}</Marca> : null}
      <Texto cor={Cores.textoApagado}>Na FAA, a regra de 6 meses a partir dos 40 vale para o comandante de linha aérea; a 2ª classe comercial vale 12 meses.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Limite de idade no transporte comercial internacional (ICAO)
export function LimiteIdade() {
  const [idade, setIdade] = useState(62);
  const [pilotos, setPilotos] = useState<'um' | 'dois'>('dois');
  let situacao = 'Pode voar', cor = Cores.acerto, txt = 'Abaixo dos 60 anos, a idade não limita: vale o certificado médico.';
  if (idade >= 65) { situacao = 'Fora'; cor = Cores.erro; txt = 'Aos 65 anos termina o transporte comercial internacional. Voo privado, instrução e aviação geral seguem a regra de cada país.'; }
  else if (idade >= 60 && pilotos === 'um') { situacao = 'Não pode'; cor = Cores.erro; txt = 'Com um só piloto, o limite é de 60 anos: não há colega para assumir se o piloto passar mal.'; }
  else if (idade >= 60) { situacao = 'Pode voar'; cor = Cores.dourado; txt = 'Com mais de um piloto, até os 65 anos, com o certificado a cada 6 meses. Desde 2014, o colega não precisa ter menos de 60.'; }
  return (
    <MolduraMidia tipo="Classificador" titulo="Idade e transporte comercial internacional" instrucao="Mova a idade e escolha quantos pilotos há na cabine para ver a regra da ICAO.">
      <Controle min={40} max={75} passo={1} valor={idade} onChange={setIdade} rotulo="Idade do piloto" formatar={(v) => `${fmt(v)} anos`} />
      <Opcoes itens={[['um', 'Um só piloto'], ['dois', 'Mais de um piloto']] as ['um' | 'dois', string][]} valor={pilotos} onChange={setPilotos} colunas={2} />
      <View style={styles.leituras}>
        <Leitura rotulo="ICAO" valor={situacao} cor={cor} />
      </View>
      <Marca cor={cor}>{txt}</Marca>
      <Texto cor={Cores.textoApagado}>FAA: linha aérea até 65. ANAC: o RBAC 61 aplica os limites ao transporte aéreo público internacional. Nova Zelândia: decide pela aptidão.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- O passageiro idoso
const PASSOS: Item[] = [
  { nome: 'Na compra', corpo: 'Quem tem 60 anos ou mais tem direito a assistência especial no Brasil.', fazer: 'Pedir cadeira de rodas ou ajuda na compra ou 48 h antes; acompanhante e MEDIF com 72 h.' },
  { nome: '4 a 6 semanas antes', corpo: 'Doenças e remédios precisam estar estáveis para viagens longas.', fazer: 'Consulta e carta do médico com doenças, remédios pelo nome genérico, alergias e equipamentos.' },
  { nome: 'Na bagagem de mão', corpo: 'Se a mala atrasar, o remédio contínuo falta no destino.', fazer: 'Todos os remédios, embalagens originais, sobra para atrasos e lista escrita.' },
  { nome: 'A bordo', corpo: 'Trombose, queda e confusão são os três riscos do idoso no voo.', fazer: 'Água sem sede, caminhar, levantar devagar, cinto afivelado e nada novo para dormir.' },
  { nome: 'Esquecimento ou demência', corpo: 'Lugar desconhecido, sono interrompido e calmante pioram a confusão.', fazer: 'Viajar com acompanhante, com nome e endereço anotados.' },
  { nome: 'Depois do voo', corpo: 'O sono mais leve demora mais a se ajustar ao fuso.', fazer: 'Descansar e dar um dia a mais antes de compromissos.' },
];

export function PassageiroIdoso() {
  return <Explorador titulo="O passageiro idoso, passo a passo" instrucao="Escolha a etapa da viagem para ver o que importa e o que fazer." itens={PASSOS} rotulo1="Por que importa" rotulo2="O que fazer" />;
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
});
