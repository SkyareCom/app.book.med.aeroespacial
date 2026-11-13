import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M3V1 · Certificação e risco aeromédico. Fontes no registro de src/data/capitulos/certificacao.ts:
// ICAO Anexo 1 (1.2.4, 1.2.5.2, 1.2.6.1 e 6.1.1); ANAC RBAC 67, Emenda 05 (67.11, 67.13, 67.15 e 67.45); FAA 14 CFR
// 61.23, 61.53, 67.401 e 183.21, Guia do AME e BasicMed; EASA Part-MED (MED.A.020 a 050) e Regulamento (UE) 2018/1042;
// NATO HFM 251 (Gray et al., Heart 2019). Os recursos orientam e não substituem o examinador nem a autoridade.

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

type Ficha = { nome: string; linhas: [string, string][] };
const CORES = [Cores.destaque, Cores.dourado, Cores.acerto, Cores.textoSuave];
function Fichas({ tipo, titulo, instrucao, itens, colunas }: { tipo: string; titulo: string; instrucao: string; itens: Ficha[]; colunas?: number }) {
  const [i, setI] = useState(0);
  const k = itens[i];
  return (
    <MolduraMidia tipo={tipo} titulo={titulo} instrucao={instrucao}>
      <Opcoes itens={itens.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} colunas={colunas} />
      {k.linhas.map(([rotulo, texto], j) => (
        <Bloco key={rotulo} rotulo={rotulo} cor={CORES[j % CORES.length]} texto={texto} />
      ))}
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Classes de certificado (abertura)
const FUNCOES: Ficha[] = [
  { nome: 'Piloto de linha aérea', linhas: [['Classe na ANAC', '1ª classe'], ['Classe na ICAO', 'Classe 1'], ['Validade na ANAC', '12 meses; 6 meses a partir dos 60 no transporte aéreo público'], ['O que mais pesa no corpo', 'Coração e cérebro: a incapacitação súbita no comando atinge todos a bordo']] },
  { nome: 'Piloto comercial', linhas: [['Classe na ANAC', '1ª classe'], ['Classe na ICAO', 'Classe 1'], ['Validade na ANAC', '12 meses; 6 meses a partir dos 40 voando sozinho com passageiros e a partir dos 60 no transporte aéreo público'], ['O que mais pesa no corpo', 'Sem outro piloto para assumir, qualquer falha súbita pesa mais']] },
  { nome: 'Piloto privado', linhas: [['Classe na ANAC', '2ª classe'], ['Classe na ICAO', 'Classe 2'], ['Validade na ANAC', '60 meses antes dos 40, 24 meses dos 40 aos 49 e 12 meses a partir dos 50'], ['O que mais pesa no corpo', 'Coração, visão e remédios: o piloto costuma voar sozinho']] },
  { nome: 'Comissário', linhas: [['Classe na ANAC', '2ª classe'], ['Classe na ICAO', 'Sem classe no Anexo 1'], ['Validade na ANAC', '60 meses antes dos 60 e 24 meses a partir dos 60'], ['O que mais pesa no corpo', 'Ouvidos e condicionamento: mudanças de pressão na cabine e a evacuação, que depende do corpo do comissário']] },
  { nome: 'Mecânico de voo', linhas: [['Classe na ANAC', '2ª classe'], ['Classe na ICAO', 'Classe 2'], ['Validade na ANAC', '12 meses'], ['O que mais pesa no corpo', 'Atenção, visão e audição no painel e nos alarmes']] },
  { nome: 'Piloto de planador', linhas: [['Classe na ANAC', '4ª classe'], ['Classe na ICAO', 'Classe 2'], ['Validade na ANAC', '60 meses antes dos 40, 24 meses dos 40 aos 49 e 12 meses a partir dos 50'], ['O que mais pesa no corpo', 'Voo sozinho, sem motor e às vezes alto: oxigênio, frio e atenção']] },
  { nome: 'Piloto remoto', linhas: [['Classe na ANAC', '5ª classe'], ['Classe na ICAO', 'Classe 3'], ['Validade na ANAC', '48 meses'], ['O que mais pesa no corpo', 'Visão, atenção e sono: a aeronave depende do controle em solo']] },
  { nome: 'Controlador de tráfego', linhas: [['Classe no Brasil', '3ª classe, fora da regulação da ANAC'], ['Classe na ICAO', 'Classe 3'], ['Validade na ICAO', '48 meses; 24 meses depois dos 40'], ['O que mais pesa no corpo', 'Audição, fala, atenção e sono em turnos']] },
];

export function ClasseCertificado() {
  return <Fichas tipo="Explorador" titulo="Classes de certificado" instrucao="Escolha a função para ver a classe no Brasil e na ICAO, a validade e o que mais pesa no corpo." itens={FUNCOES} />;
}

// ---------------------------------------------------------------- Regulação internacional
const AUTORIDADES: Ficha[] = [
  { nome: 'ICAO', linhas: [['Classes', 'Classe 1 comercial e linha aérea; Classe 2 privado, planador, balão, navegador e mecânico; Classe 3 controlador e piloto remoto'], ['Validade', '12, 60 ou 48 meses, encurtando com a idade'], ['Se o corpo não atende', 'Conclusão médica credenciada, com limitações'], ['Entre exames', 'Não exercer a licença com diminuição da aptidão']] },
  { nome: 'ANAC', linhas: [['Classes', 'Cinco classes: 1ª comercial e linha aérea; 2ª privado, comissário, mecânico e balão; 3ª controlador; 4ª aerodesportivo e planador; 5ª piloto remoto'], ['Validade', '1ª classe 12 meses, 6 meses nas idades previstas; privado 60, 24 ou 12 meses conforme a idade'], ['Se o corpo não atende', 'Recurso à ANAC contra o parecer do examinador'], ['Entre exames', 'O Anexo 1, de que o Brasil é signatário, proíbe exercer a licença com diminuição da aptidão']] },
  { nome: 'FAA', linhas: [['Classes', '1ª linha aérea, 2ª comercial e 3ª privado e aluno, além do BasicMed'], ['Validade', '1ª 12 meses, 6 meses a partir dos 40 para linha aérea; 3ª 60 meses antes dos 40 e 24 meses depois'], ['Se o corpo não atende', 'Emissão especial com relatórios ou SODA para defeito que não muda'], ['Entre exames', 'Não voar sabendo de condição ou remédio que impediria o certificado']] },
  { nome: 'EASA', linhas: [['Classes', 'Classe 1 comercial e linha aérea, Classe 2 privado e LAPL para aeronaves leves'], ['Validade', 'Classe 1 12 meses, 6 meses nas idades previstas; Classe 2 60, 24 ou 12 meses conforme a idade'], ['Se o corpo não atende', 'Limitação no certificado, como voar só com outro piloto qualificado'], ['Entre exames', 'Procurar o examinador sem demora após cirurgia, remédio contínuo novo, doença, gravidez ou internação']] },
];

export function RegulacaoComparar() {
  return <Fichas tipo="Comparador" titulo="Quatro regras, o mesmo corpo" instrucao="Escolha a autoridade para comparar as classes, a validade e o caminho quando o corpo não atende ao padrão." itens={AUTORIDADES} />;
}

// ---------------------------------------------------------------- Quem examina
type Lugar = 'br' | 'us' | 'eu';
type Cls = 'c1' | 'c2' | 'leve';
const EXAMINA: Record<Lugar, Record<Cls, [string, string]>> = {
  br: {
    c1: ['Clínica credenciada, sob o diretor técnico médico, entidade conveniada ou a ANAC', 'O médico credenciado sozinho não examina a 1ª classe'],
    c2: ['Médico credenciado, clínica credenciada ou entidade conveniada', 'Inclui piloto privado, comissário e mecânico de voo'],
    leve: ['Médico credenciado ou médico cadastrado, além das clínicas e entidades', 'O médico cadastrado examina só a 4ª classe'],
  },
  us: {
    c1: ['AME designado pela FAA', 'Diante de um achado, emite, nega ou adia para a divisão médica da FAA'],
    c2: ['AME designado pela FAA', 'Na emissão especial, o AME pode renovar pelo protocolo AASI depois da autorização da FAA'],
    leve: ['AME designado pela FAA, ou o próprio médico no BasicMed', 'BasicMed só para voo privado, sem remuneração'],
  },
  eu: {
    c1: ['Centro aeromédico (AeMC) no primeiro exame; AME na renovação', 'O caso que não atende ao padrão vai para a autoridade'],
    c2: ['Centro aeromédico ou AME', 'Classe do piloto privado'],
    leve: ['Centro aeromédico, AME ou o médico de família, se a lei do país permitir', 'Vale para o LAPL, de aeronaves leves'],
  },
};

export function QuemExamina() {
  const [lugar, setLugar] = useState<Lugar>('br');
  const [cls, setCls] = useState<Cls>('c1');
  const [quem, nota] = EXAMINA[lugar][cls];
  return (
    <MolduraMidia tipo="Explorador" titulo="Quem examina" instrucao="Escolha o país e a classe para ver quem pode fazer o exame.">
      <Opcoes itens={[['br', 'Brasil'], ['us', 'Estados Unidos'], ['eu', 'Europa']] as [Lugar, string][]} valor={lugar} onChange={setLugar} />
      <Opcoes itens={[['c1', 'Linha aérea e comercial'], ['c2', 'Privado'], ['leve', 'Aeronaves leves e planador']] as [Cls, string][]} valor={cls} onChange={setCls} colunas={1} />
      <Bloco rotulo="Quem pode examinar" cor={Cores.destaque} texto={quem} />
      <Bloco rotulo="Observação" cor={Cores.dourado} texto={nota} />
      <Texto cor={Cores.textoApagado}>Em todos os lugares, o examinador responde pela segurança; o tratamento continua com o médico assistente.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Triagem do coração do tripulante (NATO HFM 251)
type Risco = 'baixo' | 'aumentado' | 'alto';
type Achado = 'zero' | 'ate100' | 'acima100' | 'acima400' | 'estreito' | 'cintilo';
const FASE: Record<Risco, [string, string]> = {
  baixo: ['1ª fase', 'Calculadora de risco e eletrocardiograma em repouso; sem exame de imagem de rotina'],
  aumentado: ['2ª fase', 'Escore de cálcio, com ou sem angiotomografia; teste de esforço e ultrassom das artérias opcionais'],
  alto: ['3ª fase', 'Teste de isquemia e, se preciso, cateterismo'],
};
const ACHADO: Record<Achado, [string, string, string]> = {
  zero: ['Sem cálcio nas coronárias; ainda pode haver placa sem cálcio', 'Risco muito baixo, com mortalidade abaixo de 0,1% ao ano', Cores.acerto],
  ate100: ['Pouco cálcio: há placa, abaixo do limiar em que o risco sobe de forma moderada', 'Seguir com o controle dos fatores de risco e a avaliação do examinador', Cores.dourado],
  acima100: ['Placa calcificada relevante, com eventos acima de 1% ao ano', 'Afastar da função até terminar a investigação', Cores.erro],
  acima400: ['Muito cálcio; a angiotomografia pode não conseguir avaliar o canal', 'Considerar cateterismo', Cores.erro],
  estreito: ['Estreitamento acima de 50% na angiotomografia: menos sangue para o músculo no esforço', 'Limite razoável para afastar e investigar', Cores.erro],
  cintilo: ['Cintilografia de perfusão normal: sem falta de sangue no músculo no esforço', 'Risco abaixo de 1% ao ano por cerca de 3 anos', Cores.acerto],
};

export function TriagemCoronaria() {
  const [risco, setRisco] = useState<Risco>('aumentado');
  const [achado, setAchado] = useState<Achado>('acima100');
  const [fase, exames] = FASE[risco];
  const [significa, decisao, cor] = ACHADO[achado];
  return (
    <MolduraMidia tipo="Simulador" titulo="Triagem do coração do tripulante" instrucao="Escolha o risco calculado para ver a fase da triagem e, depois, um resultado para ver a decisão aeromédica.">
      <Opcoes itens={[['baixo', 'Risco baixo'], ['aumentado', 'Risco aumentado'], ['alto', 'Risco alto']] as [Risco, string][]} valor={risco} onChange={setRisco} />
      <Bloco rotulo={fase} cor={Cores.destaque} texto={exames} />
      <Opcoes
        itens={[['zero', 'Escore zero'], ['ate100', 'Escore de 1 a 99'], ['acima100', 'Escore acima de 100'], ['acima400', 'Escore de 400 ou mais'], ['estreito', 'Estreitamento acima de 50%'], ['cintilo', 'Cintilografia normal']] as [Achado, string][]}
        valor={achado}
        onChange={setAchado}
        colunas={2}
      />
      <Bloco rotulo="O que significa no coração" cor={Cores.textoSuave} texto={significa} />
      <Bloco rotulo="Decisão aeromédica" cor={cor} texto={decisao} />
      <Texto cor={Cores.textoApagado}>Proposta de um grupo da OTAN para tripulantes; cada autoridade define os próprios limites.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
});
