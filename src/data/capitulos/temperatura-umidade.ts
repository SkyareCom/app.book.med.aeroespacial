import type { Questao, Topico } from '../tipos';

// M1V1 - IV. Fontes e registro: docs/editorial/M1V1-IV-Temperatura-e-umidade.md.
export const topicoTemperaturaUmidade: Topico = {
  "id": "1.4",
  "titulo": "Temperatura e umidade",
  "pergunta": "Por que a mesma temperatura pode produzir sensações e efeitos tão diferentes durante o voo?",
  "conteudo": {
    "essencial": "Temperatura caracteriza o estado térmico do ar e se relaciona à agitação molecular. Umidade é a quantidade de vapor d’água presente no ar. Ambas influenciam as trocas de calor do organismo e o conforto durante o voo.",
    "explicacao": "A temperatura do ar é medida com termômetro protegido do sol direto. Ela difere da temperatura corporal e da sensação térmica. A umidade relativa indica quanto o vapor presente se aproxima da saturação, na temperatura medida. Seu percentual não representa a proporção de água na composição do ar.\n\nO corpo perde calor quando o suor evapora; suor acumulado na pele não produz o mesmo resfriamento. Em calor úmido, essa evaporação encontra maior dificuldade. Roupas, ventilação, esforço e duração da exposição também modificam o efeito térmico. No frio, vento e roupas molhadas favorecem a perda de calor.\n\nDurante o cruzeiro, o ar admitido do exterior costuma conter pouco vapor d’água. Aquecê-lo sem acrescentar água, mantendo a pressão, reduz sua umidade relativa. A cabine pode estar termicamente confortável e, ainda assim, apresentar ar seco. Esse ambiente pode provocar desconforto ocular e ressecamento nasal ou da boca.",
    "clinico": "A umidade relativa é UR = 100 × e/eₛ. Nessa relação, e é a pressão de vapor e eₛ é a pressão de saturação na mesma temperatura; use unidades iguais. O ponto de orvalho ajuda a interpretar a quantidade de vapor presente. A temperatura de bulbo úmido reflete o resfriamento evaporativo, mas não resume o risco térmico individual.\n\nO organismo troca calor por radiação, convecção, condução e evaporação. No calor, aumentam a sudorese e o fluxo sanguíneo cutâneo; no frio, vasoconstrição e tremores ajudam a conservar ou produzir calor. Retenção excessiva de calor pode causar hipertermia; perda excessiva pode causar hipotermia. As trocas dependem também da ventilação, da radiação e do vestuário.\n\nNa avaliação aeroespacial, registre as condições da cabine, a duração da exposição, o esforço, o vestuário e os sintomas. Diferencie ressecamento de mucosas de desidratação, que exige avaliação clínica. Calor com sudorese prolongada pode causar perda de água e sais. Planeje hidratação, proteção térmica e ajustes ambientais conforme as necessidades clínicas e operacionais.",
    "alerta": "Confusão, desmaio ou alteração importante da consciência após exposição térmica exigem atendimento imediato. Em voo, comunique a tripulação.",
    "recursos": [
      {
        "apos": "essencial",
        "figura": {
          "imagem": require('@/assets/images/topicos/m1v1-4-cabine.jpg'),
          "legenda": "A temperatura e a umidade da cabine podem diferir das condições do ar externo."
        }
      },
      {
        "apos": "entenda",
        "paragrafo": 1,
        "tabela": {
          "titulo": "O que cada medida informa",
          "colunas": [
            "Medida",
            "O que significa",
            "Unidade habitual"
          ],
          "linhas": [
            [
              "Temperatura do ar",
              "Estado térmico do ambiente, medido com termômetro protegido da radiação direta.",
              "°C"
            ],
            [
              "Umidade absoluta",
              "Massa de vapor d’água por volume de ar.",
              "g/m³"
            ],
            [
              "Umidade relativa",
              "Relação entre o vapor presente e a saturação, na mesma temperatura.",
              "%"
            ],
            [
              "Ponto de orvalho",
              "Temperatura de saturação ao resfriar o ar, mantendo pressão e conteúdo de vapor.",
              "°C"
            ],
            [
              "Temperatura de bulbo úmido",
              "Temperatura indicada por um termômetro com bulbo umedecido e ventilado, afetada pela evaporação.",
              "°C"
            ]
          ]
        }
      },
      {
        "apos": "entenda",
        "paragrafo": 2,
        "figura": {
          "imagem": require('@/assets/images/topicos/m1v1-4-protecao.jpg'),
          "legenda": "A proteção térmica precisa acompanhar o ambiente, a atividade e o tempo de exposição."
        }
      },
      {
        "apos": "entenda",
        "paragrafo": 3,
        "midia": "aquecimento-umidade"
      },
      {
        "apos": "profissionais",
        "paragrafo": 3,
        "tabela": {
          "titulo": "Superfície, ar externo e cabine",
          "colunas": [
            "Ambiente",
            "Condições relevantes",
            "O que considerar"
          ],
          "linhas": [
            [
              "Superfície terrestre",
              "Temperatura, umidade, vento e exposição solar variam com o local e o momento.",
              "As condições do pátio podem produzir uma exposição diferente daquela encontrada dentro da aeronave."
            ],
            [
              "Ar externo no cruzeiro",
              "Costuma ser frio e conter pouco vapor d’água.",
              "A temperatura externa não informa, sozinha, as condições térmicas dos ocupantes."
            ],
            [
              "Cabine climatizada",
              "Temperatura controlada e umidade frequentemente baixa, com variação entre voos e fases da operação.",
              "Conforto térmico pode coexistir com ressecamento ocular ou de mucosas."
            ]
          ]
        }
      }
    ]
  }
};

export const questaoTemperaturaUmidade: Questao = {
  "topico": "1.4",
  "pergunta": "Em um ambiente quente, por que a umidade elevada pode dificultar o resfriamento do corpo?",
  "opcoes": [
    "Porque reduz obrigatoriamente a proporção de oxigênio do ar a um nível perigoso.",
    "Porque dificulta a evaporação do suor, reduzindo a perda de calor por essa via.",
    "Porque transforma o suor acumulado na pele em uma fonte de calor.",
    "Porque torna a temperatura corporal automaticamente igual à temperatura do ambiente."
  ],
  "correta": 1,
  "explicacao": "O resfriamento depende da evaporação do suor, não apenas de sua produção. Em ar mais úmido, essa evaporação encontra maior dificuldade, mantendo iguais as demais condições."
};
