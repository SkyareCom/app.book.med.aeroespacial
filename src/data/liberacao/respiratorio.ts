// Formulário de liberação para voo seguro · bloco do sistema respiratório (M2V1 · Pulmões, oxigênio e hipóxia).
// Cada resposta tem um efeito para o passageiro e outro para o tripulante, com texto leigo e texto para o médico.
// Fontes no registro de revisão de src/data/capitulos/hipoxia.ts (BTS 2022; FAA, Guia do AME e 14 CFR 61.53;
// ANAC, RBAC 67.81; CAA da Nova Zelândia). Sem fonte: [confirmar na referência].

import type { EfeitoLiberacao, PerguntaLiberacao } from '../tipos';

const ok = (topico?: string): EfeitoLiberacao => ({ nivel: 'liberado', leigo: '', medico: '', topico });
const e = (nivel: EfeitoLiberacao['nivel'], leigo: string, medico: string, topico: string): EfeitoLiberacao => ({ nivel, leigo, medico, topico });

export const liberacaoRespiratorio: PerguntaLiberacao[] = [
  {
    id: 'resp-asma',
    pergunta: 'Tem asma?',
    ajuda: 'Asma controlada: sintomas em até 2 dias por semana e nenhuma internação no último ano.',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, controlada',
        passageiro: e('cuidados', 'Leve todos os remédios e o espaçador na bagagem de mão, com a bombinha de alívio à mão.', 'Asma controlada: liberar com medicação e espaçador na bagagem de mão (BTS 2022).', '3.6'),
        tripulante: e('avaliar', 'Leve o caso ao médico examinador: a ANAC trata a asma de forma mais rígida que a FAA.', 'RBAC 67.81(a)(3): asma, não apto na 1ª classe. FAA (CACI Asma): emite com sintomas ≤ 2 dias/semana, ≤ 2 consultas e ≤ 2 cursos de corticoide oral por ano, sem internação, VEF1 e CVF ≥ 80% pré-BD e espirometria de até 90 dias.', '3.6'),
      },
      {
        rotulo: 'Sim, com crises frequentes ou internação no último ano',
        passageiro: e('avaliar', 'Converse com seu especialista antes da viagem e leve o plano para crise.', 'Asma grave ou instável: avaliação do especialista; considerar corticoide oral de emergência na bagagem (BTS 2022).', '3.6'),
        tripulante: e('avaliar', 'Não voe como tripulante até o médico examinador decidir.', 'Fora dos critérios do CACI da FAA (decisão da FAA); RBAC 67.81(a)(3), não apto na 1ª classe.', '3.6'),
      },
      {
        rotulo: 'Em crise agora ou usando a bombinha mais que o habitual',
        passageiro: e('nao-voar', 'Não voe até a crise passar e a bombinha voltar ao uso de sempre.', 'Não liberar até estabilidade e uso de alívio no nível basal (BTS 2022).', '3.6'),
        tripulante: e('nao-voar', 'Não voe: a crise impede cumprir os requisitos do certificado.', '14 CFR 61.53; RBAC 67.81(a)(1) (doença aguda ou ativa). Afastar até resolução e reavaliação.', '3.6'),
      },
    ],
  },
  {
    id: 'resp-dpoc',
    pergunta: 'Tem DPOC (bronquite crônica ou enfisema)?',
    ajuda: 'A saturação em repouso é medida no dedo, com o oxímetro, no solo.',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, estável e com saturação acima de 95%',
        passageiro: e('cuidados', 'Pode voar com a doença estável; leve os remédios na bagagem de mão.', 'DPOC com SpO2 ≥ 95% e MRC 1–2: sem oxigênio e sem teste de hipóxia (BTS 2022).', '3.6'),
        tripulante: e('avaliar', 'Não voe como tripulante até o médico examinador decidir.', 'FAA: DPOC sempre adiada para a FAA (autorização especial com SpO2 ≥ 96%, VEF1 pós-BD ≥ 61%, caminhada de 6 min ≥ 400 m e queda de 1–3%, até 3 remédios, sem corticoide oral diário). RBAC 67.81(a)(2): não apto, salvo investigação favorável.', '3.6'),
      },
      {
        rotulo: 'Sim, com saturação de 95% ou menos ou falta de ar em esforços pequenos',
        passageiro: e('avaliar', 'Antes de comprar a passagem, faça o teste de simulação de altitude: talvez precise de oxigênio a bordo.', 'SpO2 ≤ 95%, MRC ≥ 3 ou dessaturação < 84%: considerar o teste de hipóxia; O2 se SpO2 < 85% no teste (BTS 2022). Registrar o fluxo no MEDIF.', '3.9'),
        tripulante: e('avaliar', 'Não voe como tripulante até o médico examinador decidir.', 'FAA: SpO2 ≤ 95% em repouso cai na linha de decisão individual da FAA. RBAC 67.81(a)(2).', '3.6'),
      },
      {
        rotulo: 'Sim, e piorou nas últimas 6 semanas',
        passageiro: e('nao-voar', 'Evite voar até completar 6 semanas da piora.', 'Prudente evitar voar por 6 semanas após exacerbação; poucos dados (BTS 2022).', '3.6'),
        tripulante: e('nao-voar', 'Não voe como tripulante; volte ao médico examinador depois da piora.', 'Exacerbação: doença ativa (RBAC 67.81(a)(1)); 14 CFR 61.53.', '3.6'),
      },
    ],
  },
  {
    id: 'resp-saturacao',
    pergunta: 'Usa oxigênio em casa?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim',
        passageiro: e('avaliar', 'Combine o oxigênio com a companhia antes de comprar a passagem; ela costuma pedir o formulário médico (MEDIF).', 'Oxigênio domiciliar: somar 2 L/min ao fluxo habitual (sem hipercapnia); concentradores raramente > 3 L/min contínuos (BTS 2022). Preencher o MEDIF.', '3.9'),
        tripulante: e('nao-voar', 'Não voe como tripulante: depender de oxigênio é incompatível com o certificado sem decisão da autoridade.', 'Doença pulmonar crônica (RBAC 67.81(a)(2)); FAA exige SpO2 ≥ 96% em repouso para a autorização especial na DPOC.', '3.9'),
      },
    ],
  },
  {
    id: 'resp-pneumotorax',
    pergunta: 'Teve pneumotórax (pulmão colapsado)?',
    ajuda: 'O prazo conta a partir da resolução completa no raio X.',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, resolvido há mais de 7 dias, uma vez só',
        passageiro: e('liberado', 'Já passou o prazo de 7 dias depois da resolução.', 'Mais de 7 dias da resolução completa no raio X: liberar (BTS 2022).', '3.8'),
        tripulante: e('avaliar', 'Não volte a voar como tripulante sem o médico examinador.', 'FAA: espontâneo, decisão da FAA com raio X de resolução e sem bolhas; traumático, emitir 3 meses após a resolução. CAA-NZ: relevante se < 5 anos (Classe 1) ou < 3 anos (Classe 2), sem cirurgia.', '3.8'),
      },
      {
        rotulo: 'Sim, ainda não resolvido ou resolvido há menos de 7 dias',
        passageiro: e('nao-voar', 'Não voe: espere 7 dias depois do raio X mostrar o pulmão todo expandido.', 'Não liberar antes de 7 dias da resolução completa no raio X; pneumotórax fechado não tratado em geral contraindica (BTS 2022).', '3.8'),
        tripulante: e('nao-voar', 'Não voe como tripulante.', 'RBAC 67.81(a)(6): pneumotórax não resolvido, não apto; 14 CFR 61.53.', '3.8'),
      },
      {
        rotulo: 'Sim, mais de uma vez, sem cirurgia',
        passageiro: e('avaliar', 'Converse com seu médico: vale o prazo de 7 dias depois de cada resolução.', 'Recorrência: mesmo prazo de 7 dias após a resolução (BTS 2022); discutir a indicação cirúrgica.', '3.8'),
        tripulante: e('nao-voar', 'Não voe como tripulante antes da cirurgia que corrige a causa.', 'FAA: episódio repetido, em geral não elegível até a correção cirúrgica (retorno usual 3 meses após). CAA-NZ: recorrência sem cirurgia dificilmente certificada.', '3.8'),
      },
    ],
  },
  {
    id: 'resp-procedimento',
    pergunta: 'Fez cirurgia no tórax, biópsia de pulmão ou broncoscopia com biópsia recentemente?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Cirurgia no tórax, dreno retirado há menos de 4 semanas',
        passageiro: e('nao-voar', 'Espere 4 semanas depois da retirada do dreno (2 semanas, se a viagem for essencial).', 'Cirurgia torácica, incluindo VATS: 4 semanas após retirar o dreno para viagem não essencial; 2 semanas se essencial (BTS 2022).', '3.8'),
        tripulante: e('nao-voar', 'Não voe como tripulante até o médico examinador liberar.', 'Prazo de retorno do tripulante após cirurgia torácica: [confirmar na referência]; após cirurgia por pneumotórax, FAA em geral 3 meses.', '3.8'),
      },
      {
        rotulo: 'Biópsia de pulmão, procedimento na pleura ou broncoscopia há menos de 1 semana',
        passageiro: e('nao-voar', 'Espere 1 semana (contada da resolução, se tiver havido pneumotórax).', '1 semana sem pneumotórax no raio X; 1 semana após a resolução se houve pneumotórax (BTS 2022).', '3.8'),
        tripulante: e('nao-voar', 'Não voe como tripulante até o médico examinador liberar.', 'Prazo do tripulante: [confirmar na referência].', '3.8'),
      },
      {
        rotulo: 'Sim, mas já passou esse prazo',
        passageiro: e('cuidados', 'Leve o último raio X e o relatório do procedimento.', 'Prazo cumprido; documentar a data e o raio X de controle.', '3.8'),
        tripulante: e('avaliar', 'Leve o relatório ao médico examinador antes de voltar a voar.', 'Retorno a critério do examinador [confirmar na referência].', '3.8'),
      },
    ],
  },
  {
    id: 'resp-agudo',
    pergunta: 'Nas últimas 2 semanas, teve pneumonia, trombose ou embolia pulmonar?',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Pneumonia, com saturação no solo de 94% ou mais',
        passageiro: e('cuidados', 'Pode voar se estiver melhorando; leve os remédios na bagagem de mão.', 'Pneumonia com SpO2 ≥ 94%: sem adiamento obrigatório pela BTS 2022.', '3.9'),
        tripulante: e('nao-voar', 'Não voe como tripulante enquanto a infecção estiver ativa.', 'RBAC 67.81(a)(4): infecção pulmonar ativa, não apto; 14 CFR 61.53.', '3.9'),
      },
      {
        rotulo: 'Pneumonia, com saturação abaixo de 94% nos últimos 7 dias',
        passageiro: e('nao-voar', 'Adie a viagem não essencial por 7 dias.', 'SpO2 < 94% com pneumonia: adiar viagem não essencial por 7 dias (BTS 2022).', '3.9'),
        tripulante: e('nao-voar', 'Não voe como tripulante.', 'RBAC 67.81(a)(4); 14 CFR 61.53.', '3.9'),
      },
      {
        rotulo: 'Trombose ou embolia pulmonar',
        passageiro: e('nao-voar', 'Espere 2 semanas depois do diagnóstico para voar.', 'TVP ou TEP recentes: adiar o voo por 2 semanas (BTS 2022).', '3.9'),
        tripulante: e('nao-voar', 'Não voe como tripulante até o médico examinador liberar.', 'Retorno do tripulante após TEV: [confirmar na referência]; anticoagulação é avaliada no sistema do sangue (Veja M2V11).', '3.9'),
      },
    ],
  },
  {
    id: 'resp-apneia',
    pergunta: 'Tem apneia do sono?',
    ajuda: 'Sinais comuns: ronco alto, pausas na respiração durante o sono e sono durante o dia.',
    opcoes: [
      { rotulo: 'Não', passageiro: ok(), tripulante: ok() },
      {
        rotulo: 'Sim, tratada com CPAP usado todas as noites',
        passageiro: e('cuidados', 'Leve o CPAP na bagagem de mão, com carta do médico, e combine o aparelho e as baterias com a companhia.', 'CPAP na bagagem de mão com carta; aprovação da companhia; baterias para 1,5 vez a viagem; usar em voo noturno (BTS 2022).', '3.7'),
        tripulante: e('avaliar', 'Leve ao médico examinador o registro de uso do CPAP.', 'FAA: autorização especial (AASI) com acompanhamento do uso do CPAP. ANAC: o RBAC 67 não cita a apneia; vale o critério geral (67.71(c)).', '3.7'),
      },
      {
        rotulo: 'Sim, sem tratamento',
        passageiro: e('cuidados', 'Prefira voos diurnos e não durma neles; nada de álcool ou calmantes 12 horas antes e durante. Procure tratamento.', 'AOS não tratada: voos diurnos, evitar sono a bordo, sem álcool e sedativos 12 h antes e durante (BTS 2022).', '3.7'),
        tripulante: e('nao-voar', 'Não voe como tripulante até tratar e o médico examinador liberar.', 'FAA: apneia do sono desqualificante até tratamento eficaz; sintomas com risco imediato, adiar. 14 CFR 61.53.', '3.7'),
      },
      {
        rotulo: 'Sim, operado (vias aéreas, estimulador implantado ou cirurgia bariátrica)',
        passageiro: e('cuidados', 'Viaje com a liberação do cirurgião; leve o CPAP se ainda o usa.', 'Prazo após cirurgia das vias aéreas: conforme o cirurgião [confirmar na referência]; cirurgia bariátrica: cerca de 10 dias (UK CAA, Veja M2V10).', '3.7'),
        tripulante: e('avaliar', 'Volte a voar só quando o novo estudo do sono mostrar o tratamento eficaz.', 'FAA (OSA): certificação após tratamento eficaz comprovado; UK CAA: cirurgia bariátrica, inapto por até 3 meses.', '3.7'),
      },
      {
        rotulo: 'Não sei, mas ronco alto e tenho sono durante o dia',
        passageiro: e('cuidados', 'Procure avaliação do sono antes de uma viagem longa e evite álcool e calmantes no voo.', 'Suspeita de AOS: encaminhar para avaliação do sono; orientar como AOS não tratada (BTS 2022).', '3.7'),
        tripulante: e('avaliar', 'Conte ao médico examinador: talvez precise de uma avaliação do sono.', 'FAA: alto risco, Specification Sheet B e 90 dias para a avaliação; sintomas com risco imediato, adiar.', '3.7'),
      },
    ],
  },
];
