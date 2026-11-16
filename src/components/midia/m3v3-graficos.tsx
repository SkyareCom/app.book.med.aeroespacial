import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M3V3 · Seleção e treinamento. Fontes no registro de src/data/capitulos/selecao.ts:
// ICAO Anexo 1 (2022, Emenda 179), Doc 10011 (2014) e Doc 9995 (2013); ANAC RBAC 61 (Emenda 16) e RBAC 67 (Emenda 05);
// Regulamento (UE) 2018/1042 e UK CAA CAP 1938; FAA AC 61-107B e 78 FR 42324; folheto de desorientação espacial da FAA;
// AFRL (centrífuga da USAFSAM); OPITO (BOSIET e FOET). Os recursos orientam e não substituem a norma nem o examinador.

function Marca({ cor, children }: { cor: string; children: string }) {
  return (
    <View style={[styles.marca, { borderLeftColor: cor }]}>
      <Texto>{children}</Texto>
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

// ---------------------------------------------------------------- O caminho da seleção (abertura)
type Etapa = { nome: string; avalia: string; quando: string; impede: string };
const ETAPAS: Etapa[] = [
  { nome: 'Exame médico inicial', avalia: 'Coração, cérebro, olhos, ouvidos, pulmões, metabolismo e remédios; na 1ª classe, com eletroencefalograma, eletrocardiograma e teste de esforço.', quando: 'Antes do voo solo, a 2ª classe; antes da licença comercial, a 1ª classe.', impede: 'Condição com risco de incapacitação súbita. Muitas vezes há caminho com restrição ou avaliação especial.' },
  { nome: 'Avaliação psicológica', avalia: 'Personalidade, atenção, memória e raciocínio, com parecer do psiquiatra no exame inicial.', quando: 'No exame inicial, depois de acidente ou incidente grave e a cada 5 anos (ANAC, 1ª classe).', impede: 'Os transtornos que o RBAC 67 lista como inaptidão; antidepressivo só com parecer favorável do psiquiatra.' },
  { nome: 'Testes de aptidão', avalia: 'Capacidades cognitivas e traços de personalidade, por testes padronizados.', quando: 'Na seleção da escola ou da empresa, a critério dela.', impede: 'Resultado abaixo do perfil da função. Não é diagnóstico de doença.' },
  { nome: 'Entrevista e simulador', avalia: 'Competências operacionais e sociais: comunicação, trabalho em equipe e decisão.', quando: 'Na seleção da empresa; na Europa, a entrevista estruturada é o mínimo.', impede: 'Um sinal de sofrimento mental não se decide na entrevista: segue para o médico examinador.' },
  { nome: 'Avaliação antes da linha', avalia: 'Atributos psicológicos e adequação ao ambiente de trabalho (Europa).', quando: 'Antes do primeiro voo de linha na empresa, feita até 24 meses antes.', impede: 'Inadequação ao ambiente de trabalho. O programa de apoio fica disponível a todos os pilotos.' },
];

export function CaminhoSelecao() {
  const [i, setI] = useState(0);
  const k = ETAPAS[i];
  return (
    <MolduraMidia tipo="Explorador" titulo="O caminho da seleção" instrucao="Escolha uma etapa para ver o que ela avalia, quando acontece e o que pode impedir ou adiar.">
      <Opcoes itens={ETAPAS.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} />
      <Bloco rotulo="O que avalia" cor={Cores.destaque} texto={k.avalia} />
      <Bloco rotulo="Quando" cor={Cores.dourado} texto={k.quando} />
      <Bloco rotulo="O que pode impedir ou adiar" cor={Cores.erro} texto={k.impede} />
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Tempo de consciência útil (FAA, AC 61-107B)
type Alt = { ft: string; normal: string; rapida: string; alta: boolean };
const ALTS: Alt[] = [
  { ft: '18.000 ft', normal: '20 a 30 min', rapida: '10 a 15 min', alta: false },
  { ft: '22.000 ft', normal: '10 min', rapida: '5 a 6 min', alta: false },
  { ft: '25.000 ft', normal: '3 a 5 min', rapida: '1,5 a 2,5 min', alta: true },
  { ft: '28.000 ft', normal: '2,5 a 3 min', rapida: '1 a 1,5 min', alta: true },
  { ft: '30.000 ft', normal: '1 a 2 min', rapida: '30 s a 1 min', alta: true },
  { ft: '35.000 ft', normal: '30 s a 1 min', rapida: '15 a 30 s', alta: true },
  { ft: '40.000 ft', normal: '15 a 20 s', rapida: 'Quase nenhum', alta: true },
];

export function ConscienciaUtil() {
  const [i, setI] = useState(2);
  const k = ALTS[i];
  return (
    <MolduraMidia tipo="Explorador" titulo="Quanto tempo para agir" instrucao="Escolha a altitude para ver o tempo de consciência útil sem oxigênio, antes e depois de uma descompressão rápida.">
      <Opcoes itens={ALTS.map((x, j) => [j, x.ft] as [number, string])} valor={i} onChange={setI} />
      <View style={styles.leituras}>
        <Leitura rotulo="Exposição gradual" valor={k.normal} cor={Cores.dourado} />
        <Leitura rotulo="Depois de descompressão rápida" valor={k.rapida} cor={Cores.erro} />
      </View>
      <Marca cor={k.alta ? Cores.erro : Cores.dourado}>{k.alta ? 'Máscara primeiro: o tempo é curto demais para entender o problema antes.' : 'Mesmo com minutos de folga, o julgamento falha antes do desmaio: ao primeiro sinal, máscara.'}</Marca>
      <Texto cor={Cores.textoApagado}>Médias da FAA. O tempo varia muito entre as pessoas, e vale sempre o menor valor.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- O que cada treino cobra do corpo
type Treino = { nome: string; reproduz: string; cobra: string; cuidado: string };
const TREINOS: Treino[] = [
  { nome: 'Câmara hipobárica', reproduz: 'Baixa pressão, descompressão rápida e hipóxia.', cobra: 'Ar preso que se expande no ouvido, nos seios da face e nos dentes; raramente, doença descompressiva.', cuidado: 'Adiar com resfriado ou sinusite e respeitar o intervalo depois de mergulhar.' },
  { nome: 'Mistura com menos oxigênio', reproduz: 'Hipóxia sem mudar a pressão, até dentro do simulador.', cobra: 'Os sintomas da hipóxia, sem a expansão dos gases.', cuidado: 'Supervisão e oxigênio pronto para voltar.' },
  { nome: 'Desorientação espacial', reproduz: 'Ilusões do labirinto, na cadeira giratória ou no simulador.', cobra: 'Enjoo, suor frio e tontura passageira.', cuidado: 'Combinar um sinal com o instrutor e não treinar com crise de labirinto.' },
  { nome: 'UPRT', reproduz: 'Atitudes anormais e susto, no simulador e em avião leve.', cobra: 'Susto, coração disparado e G maior que o do voo de linha.', cuidado: 'Dormir bem e não estar com remédio que dá sono.' },
  { nome: 'Centrífuga humana', reproduz: 'G sustentado até 9 G.', cobra: 'Petéquias, dor no pescoço e risco de G-LOC.', cuidado: 'Exames em dia e pescoço fortalecido.' },
  { nome: 'Escape na água', reproduz: 'Cabine de helicóptero que afunda e vira, com respiração de emergência.', cobra: 'Água fria, pressão nos ouvidos e falta de ar.', cuidado: 'Tratar o resfriado e conferir ouvidos e seios da face.' },
];

export function TreinoCorpo() {
  const [i, setI] = useState(0);
  const k = TREINOS[i];
  return (
    <MolduraMidia tipo="Explorador" titulo="O que cada treino cobra do corpo" instrucao="Escolha um treino para ver o que ele reproduz, o que cobra do corpo e o cuidado antes.">
      <Opcoes itens={TREINOS.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} />
      <Bloco rotulo="O que reproduz" cor={Cores.destaque} texto={k.reproduz} />
      <Bloco rotulo="O que cobra do corpo" cor={Cores.erro} texto={k.cobra} />
      <Bloco rotulo="Cuidado antes" cor={Cores.acerto} texto={k.cuidado} />
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Licenças de piloto (ICAO e ANAC)
type Lic = { nome: string; idade: string; cma: string; horas: string; mais: string };
const LICS: Lic[] = [
  { nome: 'Piloto privado', idade: 'ICAO: 17 anos. ANAC: 18 anos e ensino médio.', cma: '2ª classe. Na ANAC, vale 60 meses antes dos 40, 24 meses dos 40 aos 49 e 12 meses a partir dos 50.', horas: '40 horas, ou 35 em curso aprovado.', mais: 'Conhecimento de desempenho humano e gestão de ameaças e erros.' },
  { nome: 'Piloto comercial', idade: '18 anos. Na ANAC, também ensino médio e licença de piloto privado.', cma: '1ª classe. Vale 12 meses; 6 meses a partir dos 40 voando sozinho com passageiros e a partir dos 60 no transporte aéreo público.', horas: '200 horas, ou 150 em curso aprovado.', mais: 'UPRT em voo recomendado pela ICAO.' },
  { nome: 'Tripulação múltipla (MPL)', idade: '18 anos. Na ANAC, também ensino médio.', cma: '1ª classe. Vale 12 meses pela ICAO.', horas: '240 horas de voo real e simulado em curso aprovado.', mais: 'UPRT em voo exigido pela ICAO; forma o copiloto para a cabine de dois pilotos.' },
  { nome: 'Piloto de linha aérea', idade: '21 anos. Na ANAC, também ensino médio e licença de piloto comercial.', cma: '1ª classe. Vale 12 meses; 6 meses a partir dos 60 no transporte aéreo público.', horas: '1.500 horas. Na ANAC, com pelo menos 100 noturnas e 75 por instrumentos.', mais: 'Nos Estados Unidos, exigida também do copiloto de empresa aérea desde 2013.' },
];

export function LicencaPiloto() {
  const [i, setI] = useState(0);
  const k = LICS[i];
  return (
    <MolduraMidia tipo="Explorador" titulo="Do piloto privado à linha aérea" instrucao="Escolha a licença para ver a idade, o CMA, as horas e o que mais ela exige.">
      <Opcoes itens={LICS.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} />
      <Bloco rotulo="Idade" cor={Cores.destaque} texto={k.idade} />
      <Bloco rotulo="CMA e validade" cor={Cores.erro} texto={k.cma} />
      <Bloco rotulo="Horas de voo" cor={Cores.dourado} texto={k.horas} />
      <Bloco rotulo="Também exige" cor={Cores.acerto} texto={k.mais} />
      <Texto cor={Cores.textoApagado}>Resumo do Anexo 1 da ICAO e do RBAC 61. Os requisitos completos estão na norma de cada país.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
});
