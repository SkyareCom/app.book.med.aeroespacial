// Estrutura completa do app-book: 4 seções, 50 capítulos.
// Base: Ernsting's Aviation and Space Medicine (5ª ed.), Fundamentals of Aerospace Medicine (5ª ed.),
// Handbook of Aviation and Space Medicine, Russomano (Fisiologia Aeroespacial) e Vernikos & Russomano.
// Capítulos com conteúdo redigido importam seus tópicos e testes; os demais trazem só os títulos.

import { atmosfera } from './capitulos/atmosfera';
import { hipoxia } from './capitulos/hipoxia';
import type { Capitulo, Secao, SecaoId, TipoMidia } from './tipos';

function cap(numero: number, titulo: string, topicos: string[], laboratorio?: TipoMidia[]): Capitulo {
  return { numero, titulo, laboratorio, topicos: topicos.map((t, i) => ({ id: `${numero}.${i + 1}`, titulo: t })) };
}

export const secoes: Secao[] = [
  {
    id: 'fisiologia',
    numeral: 'I',
    titulo: 'Fisiologia',
    subtitulo: 'Como o corpo humano reage ao ambiente de voo',
    sinopse: 'Do ar rarefeito às forças G: o que acontece com o corpo humano quando ele sai do chão.',
    capitulos: [
      atmosfera,
      cap(2, 'Fisiologia cardiovascular em voo', ['Débito cardíaco', 'Coração na altitude', 'Coração sob aceleração', 'Imobilidade e circulação']),
      hipoxia,
      cap(4, 'Pressurização e oxigênio suplementar', ['Pressurização', 'Altitude de cabine', 'Oxigênio e máscaras', 'Pressão positiva']),
      cap(5, 'Descompressão e barotrauma', ['Tipos de descompressão', 'Barotrauma', 'Doença descompressiva', 'Mergulho e voo', 'Câmaras de pressão'], ['leis-gases']),
      cap(6, 'Aceleração prolongada e forças G', ['Eixos G', 'G-LOC e A-LOC', 'Manobra anti-G', 'Centrífuga'], ['forcas-g']),
      cap(7, 'Impacto, ejeção e proteção', ['Tolerância ao impacto', 'Retenção e assentos', 'Ejeção', 'Capacetes']),
      cap(8, 'Orientação espacial e desorientação', ['Sistemas de orientação', 'Ilusões', 'Tipos de desorientação', 'Prevenção', 'Cinetose']),
      cap(9, 'Visão em aviação', ['Acuidade visual', 'Visão noturna', 'Visão de cores', 'Lasers', 'Correção visual'], ['adaptacao-escuro']),
      cap(10, 'Audição, ruído e vibração', ['Perda auditiva', 'Proteção auditiva', 'Vibração'], ['regua-ruido']),
      cap(11, 'Estresse térmico e sobrevivência', ['Calor', 'Hipotermia', 'Sobrevivência']),
      cap(12, 'Radiação cósmica', ['Radiação ionizante', 'Doses por rota', 'Gestação', 'Limites de dose'], ['radiacao-voo']),
      cap(13, 'Sono e ritmos circadianos', ['Fisiologia do sono', 'Relógio biológico', 'Jet lag', 'Higiene do sono']),
    ],
  },
  {
    id: 'clinica',
    numeral: 'II',
    titulo: 'Clínica',
    subtitulo: 'Doenças, aptidão e certificação de quem voa',
    sinopse: 'Quem pode voar, com quais limites e por qual norma: a medicina de quem pilota e de quem viaja.',
    capitulos: [
      cap(1, 'Certificação médica e risco aeromédico', ['Classes de certificado', 'Regulação internacional', 'Examinador', 'Regra do 1%', 'Medicina de precisão'], ['risco-aeromedico']),
      cap(2, 'Medicina cardiovascular', ['Hipertensão', 'Doença coronariana', 'Arritmias', 'Valvopatias', 'Cardiomiopatias', 'Cardiopatias congênitas', 'Exames cardiológicos']),
      cap(3, 'Pneumologia', ['Asma e DPOC', 'Apneia do sono', 'Pneumotórax', 'Tromboembolismo', 'Simulação de altitude']),
      cap(4, 'Neurologia', ['Epilepsia', 'Síncope', 'Cefaleia', 'AVC', 'Trauma craniano', 'Doenças neurodegenerativas']),
      cap(5, 'Saúde mental e psiquiatria', ['Depressão e ansiedade', 'Humor e personalidade', 'Álcool e drogas', 'Avaliação psicológica', 'Apoio por pares']),
      cap(6, 'Oftalmologia', ['Padrões visuais', 'Doenças oculares', 'Cirurgias oculares']),
      cap(7, 'Otorrinolaringologia e odontologia', ['Audição', 'Vertigem', 'Seios da face', 'Barodontalgia', 'Implantes dentários']),
      cap(8, 'Endocrinologia e metabolismo', ['Diabetes', 'Tireoide', 'Obesidade']),
      cap(9, 'Gastroenterologia, hepatologia, nefrologia e urologia', ['Digestivo e fígado', 'Cálculo renal', 'Doença renal', 'Cirurgias abdominais']),
      cap(10, 'Hematologia, oncologia e infectologia', ['Anemias e anticoagulação', 'Câncer', 'Doenças transmissíveis', 'HIV', 'Vacinação']),
      cap(11, 'Sistema musculoesquelético e ortopedia', ['Dor cervical e lombar', 'Lesões ortopédicas', 'Condicionamento físico']),
      cap(12, 'Saúde da mulher, gestação e envelhecimento', ['Gestação', 'Ciclo menstrual e menopausa', 'Envelhecimento']),
      cap(13, 'Farmacologia aeroespacial', ['Medicamentos permitidos', 'Afastamento', 'Interações']),
    ],
  },
  {
    id: 'operacao',
    numeral: 'III',
    titulo: 'Operação',
    subtitulo: 'Segurança, saúde no trabalho, emergências e perícias',
    sinopse: 'A medicina dentro da operação real: cabine, pátio, emergências a bordo, acidentes e perícias.',
    capitulos: [
      cap(1, 'Fatores humanos e CRM', ['SHELL, Reason e HFACS', 'Consciência situacional', 'CRM e TEM', 'Automação']),
      cap(2, 'Segurança de voo e gestão do risco', ['SMS', 'Cultura justa', 'Dados de voo', 'CENIPA', 'Incapacitação em voo']),
      cap(3, 'Seleção e treinamento de tripulantes', ['Seleção', 'Treinamento fisiológico', 'Formação']),
      cap(4, 'Ergonomia, cabine de comando e equipamentos', ['Antropometria', 'Integração humano-sistema', 'Cabine de comando', 'Equipamentos de voo', 'Comunicação']),
      cap(5, 'Fadiga e gestão de jornada', ['Fisiologia da fadiga', 'FRMS', 'Limites de jornada', 'Voos de longa duração', 'Contramedidas']),
      cap(6, 'Medicina ocupacional em aviação', ['Riscos por função', 'PCMSO e PGR', 'Insalubridade e periculosidade', 'RBAC 120', 'Retorno ao voo'], ['regua-ruido']),
      cap(7, 'Toxicologia aeroespacial e higiene da aeronave', ['Monóxido de carbono', 'Fumaça na cabine', 'Ozônio', 'Combustíveis e fluidos', 'Desinsetização', 'Água e alimentos']),
      cap(8, 'Saúde e segurança do passageiro', ['Aptidão para voar', 'MEDIF', 'Mobilidade reduzida', 'Trombose venosa', 'Turbulência e evacuação']),
      cap(9, 'Emergências médicas a bordo', ['Epidemiologia', 'Kits médicos', 'Telemedicina', 'Protocolos', 'Ética e lei', 'Desvio']),
      cap(10, 'Transporte aeromédico e evacuação', ['Asa fixa e asa rotativa', 'UTI aérea', 'Planejamento', 'Transferências prolongadas', 'Evacuação militar']),
      cap(11, 'Medicina de aviação militar', ['Aviação de caça', 'Trajes de proteção', 'Sobrevivência', 'Operações especiais']),
      cap(12, 'Aeronaves e ambientes especiais', ['Helicópteros', 'Aviação geral', 'Offshore', 'Paraquedismo', 'Aerobática', 'Aviação agrícola', 'Balões e planadores']),
      cap(13, 'Saúde pública e medicina de aeroportos', ['Regulamento Sanitário', 'Pandemias', 'Vigilância', 'Saúde do viajante']),
      cap(14, 'Investigação de acidentes: o componente médico', ['Investigação', 'Fatores humanos', 'Biomecânica do impacto', 'Recomendações']),
      cap(15, 'Perícias em acidentes aéreos', ['Perícia judicial', 'Necropsia', 'Toxicologia forense', 'Identificação de vítimas', 'Sobreviventes', 'Nexo causal', 'Perícia trabalhista', 'Laudo']),
      cap(16, 'Drones, eVTOL e novos operadores', ['Pilotos remotos', 'eVTOL', 'Piloto único e IA']),
    ],
  },
  {
    id: 'espaco',
    numeral: 'IV',
    titulo: 'Espaço',
    subtitulo: 'O corpo humano além da atmosfera',
    sinopse: 'Microgravidade, radiação e isolamento: o corpo humano a caminho da Lua e de Marte.',
    capitulos: [
      cap(1, 'Fundamentos da medicina espacial', ['Ambiente espacial', 'Seleção de astronautas']),
      cap(2, 'Microgravidade e adaptação fisiológica', ['Deslocamento de fluidos', 'Perda óssea e muscular', 'Contramedidas', 'Gravidade escultora', 'Síndrome neuro-ocular', 'Adaptação espacial'], ['perda-ossea']),
      cap(3, 'Radiação espacial', ['Raios cósmicos', 'Blindagem', 'Câncer e sistema nervoso']),
      cap(4, 'Suporte de vida e atividade extraveicular', ['Atmosfera da nave', 'Trajes espaciais', 'Pré-respiração']),
      cap(5, 'Cuidado médico em missões espaciais', ['Kits e telemedicina', 'Cirurgia em microgravidade', 'Isolamento', 'Nutrição']),
      cap(6, 'Acidentes e incidentes no voo espacial', ['Grandes acidentes', 'Sistemas de escape']),
      cap(7, 'Voo espacial comercial e turismo espacial', ['Voos suborbitais e orbitais', 'Aptidão', 'Consentimento informado']),
      cap(8, 'Exploração de longa duração e futuro', ['Lua e Marte', 'Gravidade parcial', 'Autonomia médica', 'Análogos terrestres', 'Benefícios para a Terra']),
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
