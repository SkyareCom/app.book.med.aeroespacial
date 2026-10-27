// Estrutura completa do app-book: 4 missões (Conceitos, Sistemas, Aviação, Espaço), 44 voos.
// Base: Ernsting's Aviation and Space Medicine (5ª ed.), Fundamentals of Aerospace Medicine (5ª ed.),
// Handbook of Aviation and Space Medicine, Russomano (Fisiologia Aeroespacial) e Vernikos & Russomano.
// Capítulos com conteúdo redigido importam seus tópicos e testes; os demais trazem só os títulos.

import { atmosfera } from './capitulos/atmosfera';
import { descompressao } from './capitulos/descompressao';
import { hipoxia } from './capitulos/hipoxia';
import { pressurizacao } from './capitulos/pressurizacao';
import type { Capitulo, Secao, SecaoId, TipoMidia } from './tipos';

function cap(numero: number, titulo: string, topicos: string[], laboratorio?: TipoMidia[]): Capitulo {
  return { numero, titulo, laboratorio, topicos: topicos.map((t, i) => ({ id: `${numero}.${i + 1}`, titulo: t })) };
}

// Tópicos extras anexados a um capítulo já redigido, com ids que continuam a numeração dele.
function mais(base: Capitulo, titulos: string[]): Capitulo {
  const prefixo = base.topicos[0]?.id.split('.')[0] ?? String(base.numero);
  const n = base.topicos.length;
  return { ...base, topicos: [...base.topicos, ...titulos.map((t, i) => ({ id: `${prefixo}.${n + i + 1}`, titulo: t }))] };
}

// Organização didática (out/2026): cada tema mora num só lugar e o aprendizado é progressivo:
// 1 Conceitos (o ambiente e seus agentes) → 2 Sistemas (cada sistema do corpo, do normal à doença)
// → 3 Aviação (aptidão, segurança e operação) → 4 Espaço.
export const secoes: Secao[] = [
  {
    id: 'conceitos',
    numeral: '1',
    titulo: 'Conceitos',
    subtitulo: 'O ambiente de voo e o que ele faz com quem está a bordo',
    sinopse: 'Ar, pressão, frio, radiação, ruído e forças G: o ambiente de voo e o que ele faz com quem está a bordo.',
    capitulos: [
      atmosfera,
      pressurizacao,
      descompressao,
      cap(4, 'Temperatura e sobrevivência', ['Calor', 'Hipotermia', 'Sobrevivência']),
      cap(5, 'Radiação cósmica', ['Radiação ionizante', 'Doses por rota', 'Gestação', 'Limites de dose', 'Raios cósmicos', 'Blindagem', 'Câncer e sistema nervoso'], ['radiacao-voo']),
      cap(6, 'Ruído e vibração', ['Perda auditiva', 'Proteção auditiva', 'Vibração'], ['regua-ruido']),
      cap(7, 'Forças G', ['Eixos G', 'G-LOC e A-LOC', 'Manobra anti-G', 'Centrífuga'], ['forcas-g']),
      cap(8, 'Impacto e ejeção', ['Tolerância ao impacto', 'Retenção e assentos', 'Ejeção', 'Capacetes']),
    ],
  },
  {
    id: 'sistemas',
    numeral: '2',
    titulo: 'Sistemas',
    subtitulo: 'Cada sistema do corpo, do funcionamento normal à doença',
    sinopse: 'Pulmões, coração, ouvidos, olhos, cérebro e mente: como cada sistema reage ao voo e quando a doença impede de voar.',
    capitulos: [
      mais({ ...hipoxia, numero: 1 }, ['Asma e DPOC', 'Apneia do sono', 'Pneumotórax', 'Simulação de altitude']),
      cap(2, 'Coração e circulação', ['Débito cardíaco', 'Coração na altitude', 'Coração sob aceleração', 'Hipertensão', 'Doença coronariana', 'Arritmias', 'Valvopatias', 'Cardiomiopatias', 'Cardiopatias congênitas', 'Exames cardiológicos', 'Trombose e embolia']),
      cap(3, 'Ouvidos, seios e dentes', ['Barotrauma', 'Audição', 'Seios da face', 'Barodontalgia', 'Implantes dentários']),
      cap(4, 'Visão', ['Acuidade visual', 'Visão noturna', 'Visão de cores', 'Lasers', 'Padrões visuais', 'Doenças oculares', 'Correção e cirurgia ocular'], ['adaptacao-escuro']),
      cap(5, 'Equilíbrio e orientação', ['Sistemas de orientação', 'Ilusões', 'Tipos de desorientação', 'Prevenção', 'Cinetose', 'Vertigem']),
      cap(6, 'Cérebro e nervos', ['Epilepsia', 'Síncope', 'Cefaleia', 'AVC', 'Trauma craniano', 'Doenças neurodegenerativas']),
      cap(7, 'Mente e comportamento', ['Depressão e ansiedade', 'Humor e personalidade', 'Álcool e drogas', 'Avaliação psicológica', 'Apoio por pares']),
      cap(8, 'Sono, ritmo e fadiga', ['Fisiologia do sono', 'Relógio biológico', 'Jet lag', 'Higiene do sono', 'Fisiologia da fadiga', 'FRMS', 'Limites de jornada', 'Voos de longa duração', 'Contramedidas']),
      cap(9, 'Metabolismo', ['Diabetes', 'Tireoide', 'Obesidade']),
      cap(10, 'Digestivo e rins', ['Digestivo e fígado', 'Cálculo renal', 'Doença renal', 'Cirurgias abdominais']),
      cap(11, 'Sangue, imunidade e infecções', ['Anemias e anticoagulação', 'Câncer', 'Doenças transmissíveis', 'HIV', 'Vacinação']),
      cap(12, 'Ossos e músculos', ['Dor cervical e lombar', 'Lesões ortopédicas', 'Condicionamento físico']),
      cap(13, 'Mulher, gestação e envelhecimento', ['Gestação', 'Ciclo menstrual e menopausa', 'Envelhecimento']),
    ],
  },
  {
    id: 'aviacao',
    numeral: '3',
    titulo: 'Aviação',
    subtitulo: 'Aptidão, segurança e medicina na operação aérea',
    sinopse: 'Quem pode voar e como voar com segurança: certificação, fatores humanos, emergências a bordo, acidentes e perícias.',
    capitulos: [
      cap(1, 'Certificação e risco aeromédico', ['Classes de certificado', 'Regulação internacional', 'Examinador', 'Regra do 1%', 'Medicina de precisão'], ['risco-aeromedico']),
      cap(2, 'Farmacologia aeroespacial', ['Medicamentos permitidos', 'Afastamento', 'Interações']),
      cap(3, 'Seleção e treinamento', ['Seleção', 'Treinamento fisiológico', 'Formação']),
      cap(4, 'Fatores humanos e CRM', ['SHELL, Reason e HFACS', 'Consciência situacional', 'CRM e TEM', 'Automação']),
      cap(5, 'Segurança de voo', ['SMS', 'Cultura justa', 'Dados de voo', 'CENIPA', 'Incapacitação em voo']),
      cap(6, 'Ergonomia e cabine de comando', ['Antropometria', 'Integração humano-sistema', 'Cabine de comando', 'Equipamentos de voo', 'Comunicação']),
      cap(7, 'Medicina ocupacional', ['Riscos por função', 'PCMSO e PGR', 'Insalubridade e periculosidade', 'RBAC 120', 'Retorno ao voo']),
      cap(8, 'Toxicologia e higiene da aeronave', ['Monóxido de carbono', 'Fumaça na cabine', 'Ozônio', 'Combustíveis e fluidos', 'Desinsetização', 'Água e alimentos']),
      cap(9, 'Saúde do passageiro', ['Aptidão para voar', 'MEDIF', 'Mobilidade reduzida', 'Turbulência e evacuação']),
      cap(10, 'Emergências médicas a bordo', ['Epidemiologia', 'Kits médicos', 'Telemedicina', 'Protocolos', 'Ética e lei', 'Desvio']),
      cap(11, 'Transporte aeromédico', ['Asa fixa e asa rotativa', 'UTI aérea', 'Planejamento', 'Transferências prolongadas', 'Evacuação militar']),
      cap(12, 'Aviação militar', ['Aviação de caça', 'Trajes de proteção', 'Sobrevivência', 'Operações especiais']),
      cap(13, 'Aeronaves e ambientes especiais', ['Helicópteros', 'Aviação geral', 'Offshore', 'Paraquedismo', 'Acrobacia aérea', 'Aviação agrícola', 'Balões e planadores']),
      cap(14, 'Saúde pública e aeroportos', ['Regulamento Sanitário', 'Pandemias', 'Vigilância', 'Saúde do viajante']),
      cap(15, 'Investigação e perícia', ['Investigação', 'Fatores humanos', 'Biomecânica do impacto', 'Recomendações', 'Perícia judicial', 'Necropsia', 'Toxicologia forense', 'Identificação de vítimas', 'Sobreviventes', 'Nexo causal', 'Perícia trabalhista', 'Laudo']),
      cap(16, 'Drones e eVTOL', ['Pilotos remotos', 'eVTOL', 'Piloto único e IA']),
    ],
  },
  {
    id: 'espaco',
    numeral: '4',
    titulo: 'Espaço',
    subtitulo: 'O corpo humano além da atmosfera',
    sinopse: 'Microgravidade, suporte de vida e isolamento: o corpo humano a caminho da Lua e de Marte.',
    capitulos: [
      cap(1, 'Fundamentos da medicina espacial', ['Ambiente espacial', 'Seleção de astronautas']),
      cap(2, 'Microgravidade e adaptação fisiológica', ['Deslocamento de fluidos', 'Perda óssea e muscular', 'Contramedidas', 'Gravidade escultora', 'Síndrome neuro-ocular', 'Adaptação espacial'], ['perda-ossea']),
      cap(3, 'Suporte de vida e atividade extraveicular', ['Atmosfera da nave', 'Trajes espaciais', 'Pré-respiração']),
      cap(4, 'Cuidado médico em missões espaciais', ['Kits e telemedicina', 'Cirurgia em microgravidade', 'Isolamento', 'Nutrição']),
      cap(5, 'Acidentes e incidentes no voo espacial', ['Grandes acidentes', 'Sistemas de escape']),
      cap(6, 'Voo espacial comercial e turismo espacial', ['Voos suborbitais e orbitais', 'Aptidão', 'Consentimento informado']),
      cap(7, 'Exploração de longa duração e futuro', ['Lua e Marte', 'Gravidade parcial', 'Autonomia médica', 'Análogos terrestres', 'Benefícios para a Terra']),
    ],
  },
];

export const totalCapitulos = secoes.reduce((n, s) => n + s.capitulos.length, 0);

export function obterSecao(id: string): Secao | undefined {
  return secoes.find((s) => s.id === id);
}

export function obterCapitulo(secaoId: string, numero: number): Capitulo | undefined {
  return obterSecao(secaoId)?.capitulos.find((c) => c.numero === numero);
}

export function chaveCapitulo(secaoId: SecaoId | string, numero: number) {
  return `${secaoId}-${numero}`;
}
