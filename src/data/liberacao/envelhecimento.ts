// M2V15 · Formulário de liberação para passageiro, tripulante e médico · envelhecimento e limites de idade.
// FONTES: ICAO Anexo 1, 2.1.10.1 e 1.2.5.2.3 (Emenda 172); FAA 14 CFR 61.23, 67.111, 121.383(d) e Summary of Medical
// Standards; ANAC RBAC 61 (Emenda 04) e Resolução 280/2013; UK CAA Part-MED; EASA Pilots' Age Limits Study (2019);
// CDC Yellow Book; AGS (Health in Aging; Beers 2023). Fontes no registro de capitulos/envelhecimento.ts.
// NÃO substitui decisão clínica, autorização de transporte ou CMA.
import type { PerguntaLiberacao } from '../tipos';

export const liberacaoEnvelhecimento: PerguntaLiberacao[] = [
  {
    id: 'm2v15-reserva',
    pergunta: "Tem 60 anos ou mais e sente mais cansaço, tontura ou falta de ar nos voos do que antes?",
    ajuda: "A idade tira reserva: os fatores da cabine se somam.",
    opcoes: [
      {
        rotulo: "Tenho menos de 60 anos",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '15.1' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '15.1' },
      },
      {
        rotulo: "Tenho 60 ou mais, sem sintomas novos",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar: beba água mesmo sem sede, levante devagar e caminhe no corredor.",
          medico: "Idoso sem doença instável: orientar hidratação, mobilidade e revisão dos remédios; consulta 4 a 6 semanas antes de viagens longas.",
          topico: '15.1',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Pode voar com o certificado e os exames da idade em dia.",
          medico: "Acima de 60: ICAO, EASA e ANAC com revalidação de 6 meses no transporte comercial.",
          topico: '15.1',
        },
      },
      {
        rotulo: "Tenho 60 ou mais e sinto mais cansaço, tontura ou falta de ar",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Converse com o médico antes da viagem: a reserva pode estar curta.",
          medico: "Sintomas novos em altitude no idoso: avaliar coração, pulmão, anemia e remédios; considerar MEDIF.",
          topico: '15.1',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe até o examinador avaliar.",
          medico: "Sintoma novo: informar ao examinador antes do próximo voo (risco cardiovascular sobe com a idade).",
          topico: '15.1',
        },
      },
    ],
  },
  {
    id: 'm2v15-visao',
    pergunta: "Precisa de óculos para perto ou tem dificuldade para entender conversas no ruído?",
    ajuda: "Presbiopia e perda dos agudos chegam com a idade.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '15.2' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '15.2' },
      },
      {
        rotulo: "Sim, e uso óculos ou aparelho auditivo",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar com os óculos e o aparelho à mão.",
          medico: "Presbiopia ou presbiacusia corrigidas.",
          topico: '15.2',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Leve um par de óculos de reserva e pilhas extras.",
          medico: "FAA: perto 20/40 a 16 pol.; a partir dos 50, intermediária 20/40 a 32 pol. (1ª e 2ª classes); audição por voz de conversa a 6 pés ou audiometria.",
          topico: '15.2',
        },
      },
      {
        rotulo: "Sim, e ainda não corrigi",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Pode voar; procure o oftalmologista ou o otorrino depois da viagem.",
          medico: "Déficit sensorial não corrigido: orientar correção; sem restrição ao passageiro.",
          topico: '15.2',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Faça a correção antes de voar e leve ao examinador.",
          medico: "Visão de perto ou intermediária abaixo do padrão ou audição alterada: correção e avaliação antes do voo.",
          topico: '15.2',
        },
      },
    ],
  },
  {
    id: 'm2v15-certificado',
    pergunta: "Seu certificado médico e o eletrocardiograma estão em dia para a sua idade?",
    ajuda: "Pergunta para o tripulante.",
    opcoes: [
      {
        rotulo: "Sim",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '15.3' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '15.3' },
      },
      {
        rotulo: "Não sou tripulante",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '15.3' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '15.3' },
      },
      {
        rotulo: "Não, está vencido ou falta o ECG",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '15.3' },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe até renovar o certificado.",
          medico: "Certificado vencido: FAA 61.23 (1ª classe 6 meses a partir dos 40 para comandante de linha aérea); 67.111 ECG após 35 e anual após 40; RBAC 61 validade por idade.",
          topico: '15.3',
        },
      },
    ],
  },
  {
    id: 'm2v15-limite',
    pergunta: "Qual é a sua idade e o tipo de operação?",
    ajuda: "Vale para o transporte aéreo comercial internacional.",
    opcoes: [
      {
        rotulo: "Sou passageiro ou tenho menos de 60 anos",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '15.4' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '15.4' },
      },
      {
        rotulo: "60 a 64 anos, tripulação com mais de um piloto",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '15.4' },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Pode voar com o certificado renovado a cada 6 meses.",
          medico: "ICAO Anexo 1, 2.1.10.1: até 65 em operação com mais de um piloto; pareamento retirado pela Emenda 172 (13/11/2014); RBAC 61: conferir a emenda vigente.",
          topico: '15.4',
        },
      },
      {
        rotulo: "60 a 64 anos, voo com um só piloto",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '15.4' },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe como comandante sozinho no transporte comercial internacional.",
          medico: "ICAO Anexo 1, 2.1.10.1: limite de 60 anos na operação com um só piloto.",
          topico: '15.4',
        },
      },
      {
        rotulo: "65 anos ou mais",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '15.4' },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe no transporte comercial internacional; o voo privado e geral segue a regra do país.",
          medico: "ICAO 2.1.10; FAA 121.383(d) 65 anos; RBAC 61.145(d): nenhuma função no transporte aéreo público internacional após 65.",
          topico: '15.4',
        },
      },
    ],
  },
  {
    id: 'm2v15-assistencia',
    pergunta: "Vai precisar de cadeira de rodas, oxigênio ou acompanhante?",
    ajuda: "No Brasil, quem tem 60 anos ou mais tem direito a assistência especial.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '15.5' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '15.5' },
      },
      {
        rotulo: "Cadeira de rodas ou ajuda no embarque",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Peça a assistência na compra ou pelo menos 48 horas antes.",
          medico: "PNAE (Resolução ANAC 280/2013): aviso de 48 h e embarque prioritário.",
          topico: '15.5',
        },
        tripulante: {
          nivel: 'avaliar',
          leigo: "Avalie com o examinador se consegue sair rápido do assento.",
          medico: "Limitação de mobilidade no tripulante: avaliar a função para evacuação.",
          topico: '15.5',
        },
      },
      {
        rotulo: "Oxigênio ou acompanhante",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Avise a companhia com 72 horas e leve o MEDIF preenchido pelo médico.",
          medico: "Resolução 280: acompanhante e MEDIF com 72 h, resposta em 48 h; oxigênio confirmado com a companhia ao menos 72 h antes (CDC).",
          topico: '15.5',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe como tripulante sem a avaliação da autoridade.",
          medico: "Necessidade de oxigênio ou de acompanhamento: inaptidão até avaliação.",
          topico: '15.5',
        },
      },
    ],
  },
  {
    id: 'm2v15-remedios',
    pergunta: "Usa vários remédios ou pretende tomar algo para dormir no voo?",
    ajuda: "Juntos, os remédios somam sono, tontura e confusão.",
    opcoes: [
      {
        rotulo: "Não",
        passageiro: { nivel: 'liberado', leigo: '', medico: '', topico: '15.5' },
        tripulante: { nivel: 'liberado', leigo: '', medico: '', topico: '15.5' },
      },
      {
        rotulo: "Uso vários remédios de uso contínuo",
        passageiro: {
          nivel: 'cuidados',
          leigo: "Leve todos na bagagem de mão, com lista escrita e horário combinado com o médico.",
          medico: "Polifarmácia no idoso: revisão de interações e do horário no fuso (CDC; AGS).",
          topico: '15.5',
        },
        tripulante: {
          nivel: 'cuidados',
          leigo: "Leve a lista completa ao examinador.",
          medico: "Lista completa revista a cada exame; remédio novo começa fora da escala.",
          topico: '15.5',
        },
      },
      {
        rotulo: "Pretendo tomar antialérgico ou calmante para dormir",
        passageiro: {
          nivel: 'avaliar',
          leigo: "Evite, sobretudo se tiver mais de 65 anos: aumentam a confusão e as quedas.",
          medico: "AGS Beers 2023: evitar anti-histamínicos de primeira geração e benzodiazepínicos no idoso.",
          topico: '15.5',
        },
        tripulante: {
          nivel: 'nao-voar',
          leigo: "Não voe até passar o efeito.",
          medico: "FAA Do Not Fly: espera de 5 meias-vidas máximas.",
          topico: '15.5',
        },
      },
    ],
  },
];
