// Estrutura completa do app-book: 4 seções, 50 capítulos.
// Base: Ernsting's Aviation and Space Medicine (5ª ed.), Fundamentals of Aerospace Medicine (5ª ed.),
// Handbook of Aviation and Space Medicine, Russomano (Fisiologia Aeroespacial) e Vernikos & Russomano.
// Capítulos com conteúdo redigido importam seus tópicos e testes; os demais trazem só os títulos.

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
      cap(1, 'Atmosfera e ambiente de voo', ['Composição e camadas da atmosfera', 'Leis dos gases aplicadas ao corpo', 'Atmosfera padrão e tipos de altitude', 'Temperatura, umidade e radiação em altitude'], ['leis-gases']),
      cap(2, 'Fisiologia cardiovascular em voo', ['Débito cardíaco e controle da pressão', 'Resposta cardiovascular à altitude', 'Resposta cardiovascular à aceleração', 'Postura, imobilidade e circulação']),
      hipoxia,
      cap(4, 'Pressurização e oxigênio suplementar', ['Como funciona a pressurização', 'Altitude de cabine', 'Sistemas de oxigênio e máscaras', 'Pressão positiva e proteção em alta altitude']),
      cap(5, 'Descompressão e barotrauma', ['Descompressão lenta, rápida e explosiva', 'Barotrauma: ouvido, seios da face, dentes e intestino', 'Doença descompressiva de altitude', 'Mergulho e voo', 'Câmaras hipobárica e hiperbárica'], ['leis-gases']),
      cap(6, 'Aceleração prolongada e forças G', ['Tipos de aceleração e eixos G', 'G-LOC e A-LOC', 'Manobra anti-G e trajes', 'Centrífuga e treinamento'], ['forcas-g']),
      cap(7, 'Impacto, ejeção e proteção', ['Aceleração de curta duração e tolerância ao impacto', 'Sistemas de retenção e assentos', 'Ejeção e escape da aeronave', 'Capacetes e trauma craniano']),
      cap(8, 'Orientação espacial e desorientação', ['Labirinto, visão e propriocepção', 'Ilusões vestibulares e visuais', 'Desorientação tipos I, II e III', 'Prevenção e treinamento', 'Cinetose']),
      cap(9, 'Visão em aviação', ['Acuidade e campo visual', 'Visão noturna e óculos de visão noturna', 'Visão de cores', 'Lasers e ofuscamento', 'Óculos, lentes e cirurgia refrativa'], ['adaptacao-escuro']),
      cap(10, 'Audição, ruído e vibração', ['Ruído e perda auditiva', 'Proteção auditiva e comunicação em voo', 'Vibração de corpo inteiro'], ['regua-ruido']),
      cap(11, 'Estresse térmico e sobrevivência', ['Calor e desidratação', 'Frio e hipotermia', 'Sobrevivência em mar, selva, deserto e gelo']),
      cap(12, 'Radiação cósmica', ['Radiação ionizante em voo', 'Doses por rota e altitude', 'Gestação e tripulantes', 'Monitoramento e limites'], ['radiacao-voo']),
      cap(13, 'Sono e ritmos circadianos', ['Fisiologia do sono e da vigília', 'Relógio biológico', 'Jet lag e dessincronose', 'Higiene do sono para tripulantes']),
    ],
  },
  {
    id: 'clinica',
    numeral: 'II',
    titulo: 'Clínica',
    subtitulo: 'Doenças, aptidão e certificação de quem voa',
    sinopse: 'Quem pode voar, com quais limites e por qual norma: a medicina de quem pilota e de quem viaja.',
    capitulos: [
      cap(1, 'Certificação médica e risco aeromédico', ['Classes de certificado', 'Regulação internacional: ICAO, EASA, FAA e ANAC', 'O papel do examinador', 'Avaliação numérica do risco: a regra do 1%', 'Medicina de precisão e o futuro da certificação'], ['risco-aeromedico']),
      cap(2, 'Medicina cardiovascular', ['Hipertensão', 'Doença coronariana', 'Arritmias e marcapassos', 'Valvopatias', 'Cardiomiopatias', 'Cardiopatias congênitas', 'Exames cardiológicos em aviadores']),
      cap(3, 'Pneumologia', ['Asma e DPOC', 'Apneia do sono', 'Pneumotórax', 'Tromboembolismo', 'Teste de simulação de altitude']),
      cap(4, 'Neurologia', ['Epilepsia e convulsões', 'Síncope', 'Cefaleia', 'AVC', 'Trauma craniano', 'Doenças neurodegenerativas']),
      cap(5, 'Saúde mental e psiquiatria', ['Depressão e ansiedade', 'Transtornos de humor e personalidade', 'Álcool e outras substâncias', 'Avaliação psicológica', 'Programas de apoio por pares']),
      cap(6, 'Oftalmologia', ['Padrões visuais', 'Doenças oculares', 'Cirurgias oculares e retorno ao voo']),
      cap(7, 'Otorrinolaringologia e odontologia', ['Audição e zumbido', 'Vertigem', 'Seios da face', 'Dor de dente em altitude', 'Próteses e implantes dentários']),
      cap(8, 'Endocrinologia e metabolismo', ['Diabetes e protocolos com insulina', 'Tireoide', 'Obesidade']),
      cap(9, 'Gastroenterologia, hepatologia, nefrologia e urologia', ['Doenças digestivas e hepáticas', 'Cálculo renal', 'Doença renal', 'Cirurgias abdominais e retorno ao voo']),
      cap(10, 'Hematologia, oncologia e infectologia', ['Anemias e anticoagulação', 'Câncer e retorno ao voo', 'Doenças transmissíveis em voo', 'HIV', 'Vacinação de tripulantes']),
      cap(11, 'Sistema musculoesquelético e ortopedia', ['Dor cervical e lombar em pilotos de caça e helicóptero', 'Lesões e cirurgias ortopédicas', 'Condicionamento físico e desempenho']),
      cap(12, 'Saúde da mulher, gestação e envelhecimento', ['Gestação de tripulantes e passageiras', 'Ciclo menstrual e menopausa', 'O piloto que envelhece e os limites de idade']),
      cap(13, 'Farmacologia aeroespacial', ['Medicamentos permitidos e proibidos', 'Períodos de afastamento', 'Interações e efeitos sobre o desempenho']),
    ],
  },
  {
    id: 'operacao',
    numeral: 'III',
    titulo: 'Operação',
    subtitulo: 'Segurança, saúde no trabalho, emergências e perícias',
    sinopse: 'A medicina dentro da operação real: cabine, pátio, emergências a bordo, acidentes e perícias.',
    capitulos: [
      cap(1, 'Fatores humanos e CRM', ['Modelos SHELL, Reason e HFACS', 'Consciência situacional e carga de trabalho', 'CRM e gestão de ameaças e erros', 'Automação']),
      cap(2, 'Segurança de voo e gestão do risco', ['Sistema de gerenciamento da segurança (SMS)', 'Cultura justa e reporte voluntário', 'Monitoramento de dados de voo', 'CENIPA e prevenção de acidentes', 'Incapacitação em voo como risco operacional']),
      cap(3, 'Seleção e treinamento de tripulantes', ['Seleção médica e psicológica', 'Treinamento fisiológico em câmara e centrífuga', 'Formação civil e militar']),
      cap(4, 'Ergonomia, cabine de comando e equipamentos', ['Antropometria', 'Integração humano-sistema', 'Projeto da cabine de comando', 'Equipamentos de voo', 'Comunicação']),
      cap(5, 'Fadiga e gestão de jornada', ['Fisiologia da fadiga', 'Gerenciamento do risco de fadiga (FRMS)', 'Limites de jornada', 'Voos de longa duração e tripulação aumentada', 'Contramedidas']),
      cap(6, 'Medicina ocupacional em aviação', ['Riscos por função', 'PCMSO, PGR e exames ocupacionais', 'Insalubridade e periculosidade', 'Prevenção ao uso de substâncias (RBAC 120)', 'Afastamento, reabilitação e retorno ao voo'], ['regua-ruido']),
      cap(7, 'Toxicologia aeroespacial e higiene da aeronave', ['Monóxido de carbono e fumaça', 'Eventos de fumaça na cabine', 'Ozônio', 'Combustíveis e fluidos', 'Pesticidas e desinsetização', 'Água e alimentos a bordo']),
      cap(8, 'Saúde e segurança do passageiro', ['Aptidão para voar', 'Oxigênio a bordo e formulário MEDIF', 'Mobilidade reduzida, idosos e bebês', 'Trombose venosa', 'Turbulência, cintos e evacuação']),
      cap(9, 'Emergências médicas a bordo', ['Epidemiologia', 'Kits médicos e desfibrilador', 'Telemedicina em voo', 'Protocolos de atendimento', 'Aspectos éticos e legais', 'Desvio da aeronave']),
      cap(10, 'Transporte aeromédico e evacuação', ['Asa fixa e asa rotativa', 'UTI aérea e paciente crítico em altitude', 'Planejamento de evacuação', 'Transferências prolongadas', 'Evacuação militar e humanitária']),
      cap(11, 'Medicina de aviação militar', ['Aviação de caça', 'Trajes e sistemas de proteção', 'Sobrevivência em combate', 'Operações especiais']),
      cap(12, 'Aeronaves e ambientes especiais', ['Helicópteros', 'Aviação geral', 'Aviação embarcada e offshore', 'Paraquedismo', 'Aerobática', 'Aviação agrícola', 'Balões e planadores']),
      cap(13, 'Saúde pública e medicina de aeroportos', ['Regulamento Sanitário Internacional', 'Pandemias', 'Vigilância em aeroportos', 'Saúde do viajante']),
      cap(14, 'Investigação de acidentes: o componente médico', ['Estrutura da investigação', 'Fatores médicos e humanos', 'Biomecânica do impacto e sobrevivência', 'Recomendações de segurança']),
      cap(15, 'Perícias em acidentes aéreos', ['Investigação de segurança e perícia judicial', 'Necropsia e padrões de lesão', 'Toxicologia forense', 'Identificação de vítimas', 'Perícia em sobreviventes', 'Nexo causal e responsabilidade civil', 'Perícias trabalhista e previdenciária', 'Elaboração de laudo']),
      cap(16, 'Drones, eVTOL e novos operadores', ['Pilotos remotos', 'Táxis aéreos elétricos', 'Piloto único e cabine com inteligência artificial']),
    ],
  },
  {
    id: 'espaco',
    numeral: 'IV',
    titulo: 'Espaço',
    subtitulo: 'O corpo humano além da atmosfera',
    sinopse: 'Microgravidade, radiação e isolamento: o corpo humano a caminho da Lua e de Marte.',
    capitulos: [
      cap(1, 'Fundamentos da medicina espacial', ['O ambiente espacial', 'Seleção, certificação e treinamento de astronautas']),
      cap(2, 'Microgravidade e adaptação fisiológica', ['Deslocamento de fluidos e intolerância ortostática', 'Perda óssea e muscular', 'Contramedidas', 'A gravidade como escultora do corpo', 'Síndrome neuro-ocular do voo espacial', 'Síndrome de adaptação espacial'], ['perda-ossea']),
      cap(3, 'Radiação espacial', ['Raios cósmicos e eventos solares', 'Dosimetria e blindagem', 'Riscos de câncer e efeitos no sistema nervoso']),
      cap(4, 'Suporte de vida e atividade extraveicular', ['Atmosfera da nave', 'Trajes espaciais', 'Pré-respiração de oxigênio']),
      cap(5, 'Cuidado médico em missões espaciais', ['Kits médicos e telemedicina', 'Cirurgia e reanimação em microgravidade', 'Saúde comportamental e isolamento', 'Nutrição e habitabilidade']),
      cap(6, 'Acidentes e incidentes no voo espacial', ['Principais acidentes e lições médicas', 'Sistemas de escape da tripulação']),
      cap(7, 'Voo espacial comercial e turismo espacial', ['Passageiros suborbitais e orbitais', 'Critérios de aptidão', 'Regulamentação e consentimento informado']),
      cap(8, 'Exploração de longa duração e futuro', ['Lua e Marte', 'Gravidade parcial', 'Autonomia médica e inteligência artificial', 'Análogos terrestres', 'Benefícios da pesquisa espacial para a Terra']),
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
