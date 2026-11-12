// Formulário de liberação para voo seguro · bloco dos hormônios e do metabolismo (M2V9).
// Fontes no registro de revisão de src/data/capitulos/hormonios.ts (RBAC 67.85; ICAO Anexo 1, Cap. 6; FAA AME Guide:
// Diabetes Medication Controlled, Acceptable Combinations, ITDM, CACI Hypothyroidism, Weight Loss Medications, OSA; UK CAA
// Metabolic and endocrinology GM e Thyroid Dysfunction; Garden et al. 2020; AsMA 2003; King et al. 2011; BMJ 2006; CDC
// Yellow Book; TravelHealthPro). Sem fonte: [confirmar na referência].

import type { EfeitoLiberacao, PerguntaLiberacao } from '../tipos';

const ok = (topico?: string): EfeitoLiberacao => ({ nivel: 'liberado', leigo: '', medico: '', topico });
const e = (nivel: EfeitoLiberacao['nivel'], leigo: string, medico: string, topico: string): EfeitoLiberacao => ({ nivel, leigo, medico, topico });

export const liberacaoHormonios: PerguntaLiberacao[] = [
  {
    id: 'hormonios-diabetes',
    pergunta: 'Tem diabetes? Como trata?',
    ajuda: 'Escolha o tratamento atual. Se usa mais de um, escolha o de maior risco de açúcar baixo.',
    opcoes: [
      { rotulo: 'Não tenho diabetes', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Só com dieta',
        passageiro: ok('9.2'),
        tripulante: e('cuidados', 'Pode voar. Mantenha o controle e informe o examinador.', 'RBAC 67.85(c): apto se controlado só com dieta; FAA: Diabetes Mellitus – Diet Controlled Protocol.', '9.2'),
      },
      {
        rotulo: 'Com metformina ou outro remédio que baixa pouco o açúcar',
        passageiro: e('cuidados', 'Pode voar. Tome o remédio no horário e beba água; o remédio do tipo SGLT2 pode desidratar.', 'Hipoglicemia rara em monoterapia; SGLT2: diurese.', '9.2'),
        tripulante: e('avaliar', 'Fale com o examinador. Há um prazo sem voar ao começar o remédio.', 'RBAC 67.85(f): 60 dias de observação e CMA de até 6 meses; FAA: metformina 14 dias, grupos C–G 30 dias, acréscimo 14 dias, ajuste 48 h; HbA1c até 9,0.', '9.2'),
      },
      {
        rotulo: 'Com sulfonilureia ou glinida',
        passageiro: e('cuidados', 'Pode voar. Leve um lanche com carboidrato e meça o açúcar no voo.', 'Risco de hipoglicemia (CASA; CAA da Nova Zelândia).', '9.2'),
        tripulante: e('avaliar', 'Fale com o examinador. Esse remédio pode baixar demais o açúcar e tem prazo maior sem voar.', 'FAA: 60 dias ao começar, 7 dias no ajuste; RBAC 67.85(f): 60 dias e CMA de até 6 meses; UK CAA: aceito o remédio que não costuma causar hipoglicemia.', '9.2'),
      },
      {
        rotulo: 'Com insulina',
        passageiro: e('cuidados', 'Pode voar. Insulina de sobra em duas bolsas de mão, lanche, plano para o fuso e aviso à tripulação.', 'AsMA 2003: bagagem de mão, ajuste de dose acima de 2 h de fuso, medir a cada 4 a 6 h.', '9.3'),
        tripulante: e('nao-voar', 'No Brasil, quem usa insulina não pode voar como tripulante. Algumas autoridades estrangeiras têm protocolos próprios.', 'RBAC 67.85(b); ICAO Anexo 1, Cap. 6: inapto. FAA: protocolo com sensor contínuo (180 dias, 1ª e 2ª classe); UK CAA: protocolo com OML.', '9.2'),
      },
    ],
  },
  {
    id: 'hormonios-hipoglicemia',
    pergunta: 'Teve açúcar baixo com sintomas ou precisou de ajuda de outra pessoa no último ano?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, com sintomas, resolvi sozinho',
        passageiro: e('cuidados', 'Pode voar. Meça o açúcar antes de embarcar e tenha 15 g de carboidrato rápido à mão.', 'Revisar o esquema com o médico assistente antes de viagem longa.', '9.2'),
        tripulante: e('avaliar', 'Fale com o examinador antes de voar.', 'FAA: adiar se hipoglicemia sintomática com 70 mg/dL ou menos, ou assintomática com 54 mg/dL ou menos.', '9.2'),
      },
      {
        rotulo: 'Sim, precisei de ajuda',
        passageiro: e('avaliar', 'Converse com o seu médico antes de voar e viaje acompanhado.', 'Hipoglicemia grave recente: rever o tratamento antes do voo.', '9.2'),
        tripulante: e('nao-voar', 'Não voe até a avaliação do examinador.', 'FAA: hipoglicemia grave que precisou de ajuda de outra pessoa exige adiar a decisão.', '9.2'),
      },
    ],
  },
  {
    id: 'hormonios-glicemia-hoje',
    pergunta: 'Como está o açúcar hoje?',
    ajuda: 'Para quem mede o açúcar. Em mg/dL; em mmol/L, divida por 18.',
    opcoes: [
      { rotulo: 'Não meço ou não tenho diabetes', passageiro: ok(), tripulante: ok() },
      { rotulo: 'Entre 90 e 270 mg/dL', passageiro: ok('9.2'), tripulante: ok('9.2') },
      {
        rotulo: 'Entre 72 e 89 ou entre 271 e 360 mg/dL',
        passageiro: e('cuidados', 'Pode voar. Corrija com lanche ou com o esquema do médico e meça de novo antes de embarcar.', 'UK CAA: faixa âmbar, 4 a 4,9 ou 15,1 a 20 mmol/L.', '9.2'),
        tripulante: e('cuidados', 'Corrija e meça de novo antes de assumir o voo, como manda o protocolo da sua autoridade.', 'Protocolo britânico: âmbar pede correção e nova medida.', '9.2'),
      },
      {
        rotulo: 'Abaixo de 72 mg/dL',
        passageiro: e('cuidados', 'Coma 10 a 15 g de carboidrato rápido, meça de novo em 15 minutos e só embarque com o açúcar seguro.', 'UK CAA: vermelho baixo abaixo de 4 mmol/L; carboidrato e nova medida em 15 min.', '9.2'),
        tripulante: e('nao-voar', 'Não assuma o voo agora. Coma carboidrato rápido e meça de novo em 15 minutos.', 'Protocolo britânico: abaixo de 4 mmol/L, passar o comando e tratar.', '9.2'),
      },
      {
        rotulo: 'Acima de 360 mg/dL',
        passageiro: e('avaliar', 'Fale com o seu médico antes de voar; com sede forte, vômitos ou mal-estar, não embarque.', 'Hiperglicemia grave: excluir cetoacidose antes do voo.', '9.2'),
        tripulante: e('nao-voar', 'Não voe. Procure o médico.', 'Protocolo britânico: vermelho alto acima de 20 mmol/L.', '9.2'),
      },
    ],
  },
  {
    id: 'hormonios-bomba',
    pergunta: 'Usa bomba de insulina?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim',
        passageiro: e('cuidados', 'Pode voar. Combine com o médico o plano para a subida e a descida: as bolhas mudam a dose.', 'King et al., Diabetes Care 2011: cerca de 1 a 1,4 U a mais na subida; desconectar na decolagem, tirar bolhas, reconectar no cruzeiro; após o pouso, preencher com 2 U.', '9.3'),
        tripulante: e('avaliar', 'Fale com o examinador.', 'Uso de insulina: ver a pergunta do tratamento; FAA: troca de bomba ou sensor, 7 dias.', '9.3'),
      },
    ],
  },
  {
    id: 'hormonios-tireoide',
    pergunta: 'Tem doença da tireoide?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Hipotireoidismo estável, com reposição',
        passageiro: ok('9.4'),
        tripulante: e('cuidados', 'Pode voar se estiver sem sintomas. Avise o examinador de qualquer troca de dose.', 'FAA CACI: estável, sem sintomas, hormônio aceito, TSH abaixo de 10 no último ano; UK CAA: troca de até 25 µg sem sintomas não afasta.', '9.4'),
      },
      {
        rotulo: 'Descompensada ou com sintomas agora',
        passageiro: e('avaliar', 'Coração disparado, cansaço forte ou falta de ar: fale com o médico antes de voar.', 'Avaliar arritmia e reserva cardíaca antes do voo.', '9.4'),
        tripulante: e('nao-voar', 'Não voe até a função da tireoide voltar ao normal.', 'UK CAA: inapto até eutireoideo e com relatório satisfatório; RBAC 67.85(a)(3).', '9.4'),
      },
      {
        rotulo: 'Hipertireoidismo tratado, estável',
        passageiro: ok('9.4'),
        tripulante: e('avaliar', 'Fale com o examinador; pode ser preciso conferir os olhos.', 'UK CAA: antitireoidiano sem efeito colateral não desqualifica; 1ª classe: revisão dos movimentos oculares e diplopia; relatório anual.', '9.4'),
      },
      {
        rotulo: 'Fiz iodo radioativo nos últimos 3 meses',
        passageiro: e('cuidados', 'Pode voar. Leve o comprovante do tratamento: o alarme de radiação do aeroporto pode disparar.', 'BMJ 2006: alarmes até 95 dias depois do iodo-131.', '9.4'),
        tripulante: e('nao-voar', 'Não voe até o fim do tratamento e a função estável.', 'UK CAA Thyroid Dysfunction: inapto até completar o tratamento e eutireoideo.', '9.4'),
      },
    ],
  },
  {
    id: 'hormonios-imc',
    pergunta: 'Qual é o seu IMC (peso em kg dividido pela altura em metros ao quadrado)?',
    opcoes: [
      { rotulo: 'Abaixo de 30', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'De 30 a 34,9',
        passageiro: e('cuidados', 'Pode voar. Em voo longo, prefira o corredor, ande, mexa as panturrilhas e beba água.', 'CDC Yellow Book: IMC de 30 ou mais é fator de risco de trombose em viagem de mais de 4 h.', '9.5'),
        tripulante: e('cuidados', 'Pode voar. O examinador avalia o risco de apneia.', 'FAA: cálculo do IMC e avaliação do risco de apneia.', '9.5'),
      },
      {
        rotulo: 'De 35 a 39,9',
        passageiro: e('cuidados', 'Pode voar, com os cuidados contra trombose. Se ronca ou cochila de dia, investigue apneia.', 'CDC; TravelHealthPro.', '9.5'),
        tripulante: e('avaliar', 'Fale com o examinador: pode ser preciso avaliar coração e apneia.', 'UK CAA/EASA AMC MED.B.025(b): IMC 35 ou mais, apto com avaliação de risco, inclusive cardiovascular e triagem de apneia.', '9.5'),
      },
      {
        rotulo: '40 ou mais',
        passageiro: e('cuidados', 'Pode voar. Investigue apneia, ande no voo e, se precisar, peça assistência especial 48 h antes.', 'FAA: mais de 90% com IMC 40 ou mais têm apneia; ANAC Res. 280, art. 9.', '9.5'),
        tripulante: e('nao-voar', 'No Brasil, a 1ª classe considera inapto com IMC de 40 ou mais.', 'RBAC 67.85(a)(2).', '9.5'),
      },
    ],
  },
  {
    id: 'hormonios-hipoventilacao',
    pergunta: 'Tem síndrome de hipoventilação da obesidade ou usa CPAP?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim',
        passageiro: e('avaliar', 'Faça o teste de hipóxia antes de voar e combine o oxigênio ou o CPAP com a companhia.', 'TravelHealthPro; Ali et al., Respirology 2014: teste de hipóxia antes do voo para todos com hipoventilação.', '9.5'),
        tripulante: e('avaliar', 'Fale com o examinador.', 'Avaliação de apneia e oxigenação (Veja M2V1 - VII).', '9.5'),
      },
    ],
  },
  {
    id: 'hormonios-peso',
    pergunta: 'Usa remédio para emagrecer?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Semaglutida, liraglutida ou tirzepatida, dose estável',
        passageiro: e('cuidados', 'Pode voar. Coma leve e beba água; náusea e pouca comida podem dar tontura.', 'GLP-1: náusea; desidratação se a ingestão cai.', '9.5'),
        tripulante: e('cuidados', 'Pode voar com receita, sem sintomas e com o prazo cumprido.', 'FAA Weight Loss Medications: 1 semana no início, 48 h a cada aumento, HbA1c até 6,4; UK CAA: 2 semanas e 72 h.', '9.5'),
      },
      {
        rotulo: 'Comecei ou aumentei a dose nesta semana',
        passageiro: e('cuidados', 'Pode voar, mas o começo costuma dar mais náusea. Leve água e comida leve.', 'Efeitos gastrintestinais maiores no início e no aumento de dose.', '9.5'),
        tripulante: e('nao-voar', 'Não voe até cumprir o prazo: 1 semana no início e 48 horas a cada aumento (FAA).', 'FAA: 1 semana e 48 h; UK CAA: 2 semanas e 72 h.', '9.5'),
      },
      {
        rotulo: 'Fentermina ou remédio comprado sem receita',
        passageiro: e('cuidados', 'Pode voar. Esses remédios aceleram o coração e tiram o sono; fale com o médico.', 'Simpatomiméticos.', '9.5'),
        tripulante: e('nao-voar', 'Não voe com esse remédio. Fale com o examinador.', 'FAA: simpatomiméticos não aceitos; UK CAA: produto sem receita ou direto ao consumidor desqualifica.', '9.5'),
      },
    ],
  },
  {
    id: 'hormonios-cirurgia',
    pergunta: 'Fez cirurgia da tireoide ou cirurgia para emagrecer nos últimos 3 meses?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Cirurgia da tireoide',
        passageiro: e('avaliar', 'Viaje com a liberação do cirurgião.', 'Prazo do passageiro: conforme a recuperação e o cirurgião [confirmar na referência].', '9.4'),
        tripulante: e('nao-voar', 'Não voe até a recuperação e a função da tireoide estável.', 'UK CAA Thyroid Dysfunction: cirurgia, inapto até a recuperação e eutireoideo; exame anual.', '9.4'),
      },
      {
        rotulo: 'Cirurgia bariátrica aberta ou por vídeo',
        passageiro: e('avaliar', 'Espere cerca de 10 dias e a liberação do cirurgião.', 'UK CAA: evitar voo nos 10 dias seguintes à cirurgia abdominal (Veja M2V10).', '9.5'),
        tripulante: e('nao-voar', 'Não voe; a volta exige relatórios e avaliação do examinador.', 'UK CAA Obesity information sheet (v31, 29/07/2026): inapto por até 3 meses, conforme o procedimento e a recuperação; relatórios de recuperação completa sem efeitos incapacitantes; avaliação final do AME.', '9.5'),
      },
      {
        rotulo: 'Procedimento endoscópico para emagrecer',
        passageiro: e('cuidados', 'Confirme o prazo com o médico que fez o procedimento.', 'Prazo conforme o procedimento [confirmar na referência].', '9.5'),
        tripulante: e('avaliar', 'Fale com o examinador; o prazo costuma ser bem menor.', 'UK CAA Obesity information sheet: procedimentos endoscópicos reduzem bastante o período de inaptidão.', '9.5'),
      },
    ],
  },
  {
    id: 'hor-horario-remedio',
    pergunta: "Toma remédio em horário fixo e vai cruzar fusos?",
    ajuda: "Hormônios, insulina, anticoncepcional e outros remédios de horário.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '9.1' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '9.1' },
      },
      {
        rotulo: "Sim",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Combine com o médico o horário no fuso de destino e leve os remédios e um lanche na bagagem de mão.",
          medico: "Ajuste do horário da medicação ao fuso de destino; medicação na bagagem de mão.",
          topico: '9.1',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Combine com o médico o horário no fuso de destino e leve os remédios na bagagem de mão.",
          medico: "Ajuste do horário da medicação ao fuso de destino; medicação na bagagem de mão.",
          topico: '9.1',
        },
      },
    ],
  },
];
