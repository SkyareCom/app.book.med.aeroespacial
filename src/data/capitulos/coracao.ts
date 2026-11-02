// Missão 2 (Sistemas) · Voo 2 — Coração e vasos sanguíneos (o número do voo é definido em secoes.ts).
// Escrito no modelo de Sistemas (docs/modelo-sistemas.md) em 02/11/2026, a pedido do autor ("Siga com os outros voos").
// Os tópicos da lista antiga (débito cardíaco, coração na altitude, coração sob aceleração, exames cardiológicos)
// entraram no tópico I; cardiomiopatias e pericárdio formam o VI; valvopatias e congênitas, o V.
//
// REGISTRO DE REVISÃO (02/11/2026) — fontes:
// - ICAO, Doc 8984, Manual of Civil Aviation Medicine, 3ª ed. (PDF enviado pelo autor):
//   Part II, Cap. 1: cabine de passageiros a 1.500–2.450 m (5.000–8.000 ft); SpO2 em repouso ~93% a 2.450 m (Tabela
//   II-1-2); taquicardia entre os sinais objetivos de hipóxia e bradicardia como sinal perigoso (Tabela II-1-3).
//   Part III, Cap. 1: Anexo 1 6.3.2.5–6.3.2.8 (coração; ECG no primeiro exame, anual após os 50, recomendado a cada
//   2 anos dos 30 aos 50; pressão em limites normais; anti-hipertensivo só se compatível); 1.1.9 (incapacitação no
//   piloto único se aproxima da taxa de acidentes); 1.1.13 (regra do 1%); 1.1.16 (infarto, AVC, ruptura de aorta
//   incapacitam; arritmias sutis distraem); 1.3.2 (pressão < 140/90, tratada ou não; 130/80 com diabetes e
//   microalbuminúria; > 160/95 de forma consistente desqualifica todas as classes; permitidos BRA, IECA, bloqueador de
//   cálcio, betabloqueador, diurético); 1.3.3 (alfabloqueador e de ação central não permitidos; ao começar ou mudar a
//   dose, inapto temporário até controle estável sem efeitos como a hipotensão postural); 1.4.29 (Classe 1 com
//   restrição a tripulação múltipla não antes de 6 meses do evento; assintomático, sem antianginoso; FEVE > 50%;
//   esteira até o estágio IV de Bruce sem isquemia; cateterismo com < 50% de estenose, < 30% na descendente anterior
//   proximal ou tronco; cintilografia sem defeito reversível; seguimento anual); 1.5.10–1.5.15 (fibrilação atrial:
//   paroxística < 24 h, persistente > 7 dias, permanente > 12 meses; átrio esquerdo < 4,5 cm; 3 Holter em 2–3 meses;
//   restrição a tripulação múltipla, retirada após 2 anos sem eventos; anticoagulação desqualifica em muitos Estados;
//   permitidos digoxina, betabloqueador, sotalol sem efeito pró-arrítmico, verapamil); 1.5.21–1.5.22 (flutter ~300 bpm,
//   150 com bloqueio 2:1; após ablação, 3 meses sem recorrência, restrito; sem restrição após 12 meses); 1.6.7–1.6.8
//   (bloqueio AV total, Mobitz II e 2:1 incompatíveis; com marca-passo, Classe 2 limitada possível; dependência de
//   marca-passo desqualifica para a Classe 1); 1.9.1–1.9.2 (marca-passo: sem dependência, Classe 1 restrita ou
//   Classe 2; desfibrilador implantável impede); 1.11.12–1.11.13 (válvula mecânica impede; bioprótese aórtica ou
//   plastia mitral há 6 meses ou mais, ritmo sinusal, sem varfarina, septo e parede ≤ 1,3 cm, raiz da aorta ≤ 4,5 cm,
//   restrito, revisão anual); 1.12.3 (pericardite: 3 a 6 meses até a certificação restrita, com eco, Holter e esteira
//   normais e seguimento de 2 anos; recorrência impede); 1.13.1–1.13.2 (cardiomiopatias; hipertrófica em ~1 de 500
//   adultos); 1.14.2–1.14.4 (cardiopatias congênitas: só com prognóstico normal ou quase; CIA ~1/4 das congênitas,
//   fechamento antes dos 24 anos com expectativa normal); 1.17.1–1.17.6 (TVP: recorrência de 20% em 5 anos; varfarina
//   por 3–6 meses, certificação 1 semana após parar; TEP: 6 meses sem certificação, depois restrito; pressão pulmonar
//   normal exigida; hipertensão pulmonar impede); nota da NYHA (classes I a IV).
// - ANAC, RBAC 67, Emenda 05 (PDF enviado pelo autor): 67.15(c) (reportar diminuição da aptidão); 67.79(a)(1)–(13),
//   (b)(1)–(2), (c), (d)(3)(i) (ECG e esteira: inicial; revalidação a cada 12 meses a partir dos 50, até 2 anos dos 30
//   aos 49, a critério abaixo dos 30), (g); 67.119(b)(2) (2ª classe, infarto em não piloto: 6 meses); 67.87(c)
//   (hipercoagulabilidade e anticoagulante cumarínico: não apto).
// - FAA, Guide for Aviation Medical Examiners: Coronary Heart Disease summary (atualizado em 25/03/2026: ponte de
//   safena 6 meses; stent ou angioplastia 3 meses; infarto 3 meses, na 1ª e 2ª classes; 3ª classe sem prazo fixo,
//   liberação do médico assistente, Public Law 114-190; autorização especial; cintilografia de perfusão pós-evento;
//   antiagregante: stent farmacológico 1 ano, convencional ao menos 30 dias, de preferência 1 ano); Atrial Fibrillation
//   (25/03/2026: ablação 3 meses; cardioversão 1 mês; oclusão do apêndice atrial 3 meses; decisão da FAA com Holter
//   ≥ 24 h, TSH, polissonografia tipo I ou II, eco e teste de esforço); Pacemaker (29/05/2024: 2 meses após o implante
//   ou troca de eletrodo; 14 dias após troca de bateria; desfibrilador ativo desqualifica todas as classes); Item 36,
//   Valvular (28/01/2026: troca de válvula e demais valvopatias exigem decisão da FAA); Item 37, Vascular (26/08/2026:
//   TVP na 1ª e 2ª classes, decisão da FAA; 3ª classe, emitir se episódio único resolvido, sem anticoagulante e com
//   avaliação negativa); Special Issuance DVT/PE (27/03/2024: varfarina com INR ao menos mensal nos 6 meses anteriores;
//   anticoagulante direto com declaração do médico). Pressão e anti-hipertensivos: registro em
//   src/lib/cma-internacional.ts (155/95 mmHg no exame; aceitos alfa e betabloqueador, bloqueador de cálcio, IECA,
//   BRA, inibidor de renina, vasodilatador direto e diurético; não aceitos clonidina, guanabenzo, guanfacina, metildopa
//   e nitratos; 7 dias sem voar ao começar; o examinador emite com até 3 remédios). ECG da FAA: 1ª classe no primeiro
//   exame após os 35 e anual após os 40 (14 CFR 67.111). Medicamentos: 14 CFR 61.53.
// - FAA, McNeely et al., RITE-ACER-CoE-2011-1 (registro em src/data/adaptacao.ts): cabine a 7.000 ft, SpO2 média de
//   90%, frequência cardíaca +2,4 bpm.
// - UK CAA, Guidance for health professionals, Cardiovascular disease (caa.co.uk, consultado em 02/11/2026): angina
//   estável em geral sem problema; CCS III–IV indica oxigênio; instável contraindica; infarto sem complicação 7 a 10
//   dias (antes de 7, contraindica); com complicação, contraindica nas primeiras 4 a 6 semanas; teste de esforço ajuda,
//   não é obrigatório; ponte de safena e cirurgia torácica: ~10 a 14 dias pelo ar no tórax (antes de 10, contraindica);
//   angioplastia com stent sem complicação: 3 dias, avaliação individual; insuficiência cardíaca NYHA III–IV ou PaO2
//   < 70 mmHg: oxigênio; descompensada contraindica; arritmia não controlada contraindica; marca-passo e desfibrilador:
//   voar estável, interferência improvável na configuração bipolar; valvopatia sintomática: contraindicação relativa,
//   grave sintomática contraindica; cianótica e hipertensão pulmonar primária: oxigênio; hipertensão tratada e
//   controlada não contraindica, não controlada contraindica; remédios na bagagem de mão.
// - CDC, Yellow Book, Deep Vein Thrombosis and Pulmonary Embolism (publicado em 21/07/2026): > 4 h, 1 em 4.656 (outro
//   estudo, 1 em 6.000); 2 a 4 vezes, dados inconsistentes; relação com a duração e os fatores de risco; maioria em
//   1–2 semanas, risco basal em 8 semanas; fatores de risco (Box 7.3.1); caminhar e exercitar a panturrilha, corredor;
//   hidratação razoável sem evidência específica; alto risco: meia abaixo do joelho com 15–30 mmHg no tornozelo
//   (ACCP); HBPM sem dose formal, enoxaparina 40 mg ou 1 mg/kg SC ~4 h antes sugerida; anticoagulante direto sem
//   evidência; aspirina: ACCP contra, ASH só se meia ou HBPM inviáveis; IATA 2020 (TVP recente: voar assintomático e
//   estável no anticoagulante; TEP: ≥ 5 dias, anticoagulação estável e PaO2 normal em ar ambiente); BTS 2022 (2
//   semanas após o diagnóstico; registro em hipoxia.ts).
// Sem fonte: [confirmar na referência]. Prazos não estimados.
// Mídia do autor (02/11/2026): 14 fotos (topicos/m2v2-*.jpg, pessoas fictícias) no padrão de 1.600 × 893 px e o vídeo
//   videos/m2v2-coracao.mp4 (ecocardiograma recortado para tirar o logotipo e os textos da tela; 8 s em laço, sem som).

import { liberacaoCardiovascular } from '../liberacao/cardiovascular';
import type { Capitulo } from '../tipos';

const foto = (arquivo: number, legenda: string) => ({ imagem: arquivo, legenda });

export const coracao: Capitulo = {
  numero: 2,
  titulo: 'Coração e vasos sanguíneos',
  tempoLeituraMin: 40,
  topicos: [
    {
      id: '2.1',
      titulo: 'O coração em altitude',
      pergunta: 'O que o voo pede do coração?',
      conteudo: {
        texto: [
          "O coração é uma bomba: o **débito cardíaco**, o sangue que ele empurra por minuto, é o número de **batimentos** vezes o **volume de cada batida**. Na cabine pressurizada, que fica entre **5.000 e 8.000 ft (1.500 a 2.450 m)**, o ar tem menos pressão de oxigênio (Veja M1V2), e a **saturação** de quem está em repouso cai para perto de **93%** a 8.000 ft. Para entregar o mesmo oxigênio aos tecidos, o coração **acelera**: num estudo da FAA com a cabine a 7.000 ft, a frequência subiu em média **2,4 batimentos por minuto**, com a saturação média em **90%**.",
          "Para o coração saudável, é uma conta pequena. Quem tem **pouca reserva**, com uma coronária estreitada, o músculo fraco ou uma válvula apertada, é o primeiro a sentir: **dor no peito**, **falta de ar** ou uma **arritmia**. A **taquicardia** está entre os sinais da hipóxia, e a **bradicardia**, o coração lento demais, é um sinal perigoso (Veja M2V1 - IV).",
          "O **gás que expande** também conta. Depois de uma **cirurgia no tórax**, como a ponte de safena, sobra ar dentro do peito, e ele cresce com a subida (Veja M1V1 - II); por isso o passageiro espera de **10 a 14 dias** para o ar ser reabsorvido (Veja M2V2 - III).",
          "Horas **sentado**, no **ar seco** da cabine (Veja M1V1 - IV), deixam o sangue parado nas veias das pernas e favorecem a **trombose** (Veja M2V2 - VII). Os **fusos horários** bagunçam o horário dos remédios do coração (Veja M2V8), e as **acelerações** do voo de caça empurram o sangue para longe da cabeça (Veja M1V7).",
          "Para o tripulante, a pergunta é outra: o risco de **incapacitação**. Infarto, AVC e ruptura da aorta podem tirar o piloto de ação de uma vez; uma arritmia leve pode só **distrair**. Com **um só piloto**, a incapacitação tende a virar acidente, e por isso a medicina aeroespacial calcula o risco anual de cada condição (Veja M3V1). O **eletrocardiograma** periódico serve para **achar casos**, não basta sozinho para afastar ninguém.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, midia: 'animacao-coracao' },
          { paragrafo: 2, figura: foto(require('@/assets/images/topicos/m2v2-1-cabine.jpg'), 'Em cruzeiro, a saturação cai um pouco e o coração acelera para compensar: pouco para quem é saudável, muito para quem tem pouca reserva.') },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'O que muda em altitude',
              colunas: ['Fator do voo', 'O que acontece no coração e nos vasos', 'Quem é mais vulnerável'],
              linhas: [
                ['Menos oxigênio', 'A saturação cai para perto de 93% a 8.000 ft, e o coração acelera para compensar', 'Doença coronariana, insuficiência cardíaca e valvopatia grave (Veja M2V2 - III, V e VI)'],
                ['Gás que expande', 'O ar que sobra no tórax depois de uma cirurgia cresce com a subida', 'Quem operou o coração ou o tórax há poucos dias (Veja M2V2 - III)'],
                ['Imobilidade e ar seco', 'O sangue fica parado nas veias das pernas', 'Quem já teve trombose ou tem outros fatores de risco (Veja M2V2 - VII)'],
                ['Fuso horário', 'O intervalo entre as doses dos remédios muda', 'Quem usa anticoagulante ou remédio de pressão (Veja M2V8)'],
                ['Acelerações', 'O sangue é empurrado para longe da cabeça', 'Pilotos de caça e de acrobacia (Veja M1V7)'],
              ],
            },
          },
          { paragrafo: 4, video: { fonte: require('@/assets/videos/m2v2-coracao.mp4'), legenda: 'O coração em movimento no ecocardiograma: a cada batida, as válvulas se abrem e se fecham para empurrar o sangue num só sentido.' } },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v2-1-ecg.jpg'), 'O eletrocardiograma do exame aeromédico serve para achar casos; sozinho, não basta para afastar um piloto.') },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Eletrocardiograma do tripulante',
              colunas: ['Autoridade', 'Quando se faz', 'Observação'],
              linhas: [
                ['ANAC (1ª classe)', 'No exame inicial; na revalidação, a cada 12 meses a partir dos 50 anos e a cada 2 anos dos 30 aos 49', 'Com teste ergométrico na esteira'],
                ['FAA (1ª classe)', 'No primeiro exame depois dos 35 anos e todo ano depois dos 40', 'Só o eletrocardiograma de repouso'],
                ['ICAO (Classe 1)', 'No primeiro exame e todo ano depois dos 50; recomendado a cada 2 anos dos 30 aos 50', 'Serve para achar casos, não para afastar sozinho'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '2.2',
      titulo: 'Pressão alta',
      pergunta: 'Quem tem pressão alta pode voar e pilotar?',
      conteudo: {
        texto: [
          "A **pressão arterial** é a força do sangue contra a parede das artérias. Para a ICAO, ela deve ficar **abaixo de 140/90 mmHg**, com ou sem remédio, e abaixo de **130/80** em quem tem diabetes com perda de proteína na urina. No voo, a pressão alta pesa menos pela cabine e mais pelo que faz com o tempo: lesa o **coração**, o **cérebro** e os **rins**, e prepara o terreno para o **infarto** e o **AVC**, as causas de incapacitação súbita (Veja M2V2 - I).",
          "O voo também cobra dos **remédios**. Ao começar um remédio ou mudar a dose, o corpo ainda está se ajustando, e a **queda de pressão ao levantar**, a hipotensão postural, pode trazer **tontura** justamente numa fase do voo que pede atenção. Por isso a ICAO considera o piloto **temporariamente inapto** até o controle ficar estável e sem efeitos colaterais.",
          "Para o **passageiro**, a pressão **tratada e controlada não impede** o voo; a pressão **não controlada** é uma contraindicação. Para o **tripulante**, os limites mudam com a autoridade. No RBAC 67, pressão mantida **acima de 140 × 90 mmHg** torna o candidato **não apto**, e quem usa remédio pode ser apto a critério do examinador. A FAA aceita até **155/95 mmHg** no exame. Para a ICAO, pressão **consistentemente acima de 160/95** desqualifica em **todas as classes**.",
          "Voar com a pressão descontrolada é voar com mais chance de **AVC** e **infarto** longe do atendimento. O tripulante que sabe da piora e continua voando descumpre a regra: pelo RBAC 67, ele deve **informar a ANAC ou o examinador** e parar de exercer a licença até um novo julgamento, e a FAA proíbe atuar com condição que impeça cumprir os requisitos do certificado.",
          "A maioria dos remédios de pressão é compatível com o voo, mas as listas da FAA e da ICAO não são iguais: a FAA aceita o **alfabloqueador**, que a ICAO não aceita, e ambas recusam os de **ação central**, como a **clonidina** e a **metildopa**. Na FAA, quem começa o remédio fica **7 dias sem voar**, e o examinador pode emitir o certificado com **até 3 remédios**. O passageiro leva os comprimidos na **bagagem de mão** e mantém o intervalo entre as doses quando cruza fusos (Veja M2V8).",
          "**Não voe hoje** com a pressão sem controle, com dor de cabeça forte, alteração da visão ou dor no peito. Como tripulante, **não voe** nos primeiros dias de um remédio novo ou de uma dose nova. O médico registra as **medidas repetidas** em dias diferentes, os remédios e as doses, e confere sinais de lesão no coração, nos olhos e nos rins.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v2-2-pressao.jpg'), 'Medir a pressão em dias diferentes: o limite vale para a pressão mantida, não para uma medida isolada.') },
          { paragrafo: 2, midia: 'pressao-normas' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · pressão alta',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Pressão tratada e controlada', 'Pode voar, com os remédios na bagagem de mão', 'ANAC: apto a critério com remédio; FAA: até 155/95 no exame'],
                ['Pressão mantida acima de 140 × 90', 'Controlar antes de viajar', 'ANAC: não apto (67.79(a)(8))'],
                ['Pressão consistentemente acima de 160/95', 'Não controlada: não voar', 'ICAO: desqualifica em todas as classes'],
                ['Remédio novo ou dose nova', 'Pode voar, se estiver bem', 'FAA: 7 dias sem voar; ICAO: inapto até o controle ficar estável'],
              ],
            },
          },
          { paragrafo: 4, figura: foto(require('@/assets/images/topicos/m2v2-2-remedios.jpg'), 'Os remédios de pressão vão na bagagem de mão, separados por dia, com o horário ajustado ao fuso.') },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Remédios e voo · pressão alta',
              colunas: ['Remédio ou classe', 'Efeito que importa no voo', 'Tripulante'],
              linhas: [
                ['BRA (losartana) e IECA (enalapril)', 'Baixam a pressão; tontura no começo', 'FAA e ICAO: aceitos'],
                ['Bloqueador de cálcio (anlodipino)', 'Baixa a pressão; inchaço nas pernas', 'FAA e ICAO: aceito'],
                ['Betabloqueador (atenolol)', 'Diminui a frequência do coração', 'FAA e ICAO: aceito'],
                ['Diurético', 'Elimina água e sal; pede atenção à hidratação', 'FAA e ICAO: aceito'],
                ['Alfabloqueador (doxazosina)', 'Queda de pressão ao levantar', 'FAA: aceito; ICAO: não permitido'],
                ['Ação central (clonidina, metildopa)', 'Sonolência', 'FAA e ICAO: não aceitos'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '2.3',
      titulo: 'Angina, infarto, stent e ponte de safena',
      pergunta: 'Quanto tempo esperar para voar depois de um infarto ou de um stent?',
      conteudo: {
        texto: [
          "Na **doença coronariana**, placas de gordura estreitam as **coronárias**, as artérias que alimentam o próprio coração. A **angina** é a dor no peito quando o músculo pede mais sangue do que a artéria entrega; o **infarto** é a morte de parte do músculo quando a artéria fecha. O tratamento abre a artéria por dentro, com um **stent** na **angioplastia**, ou cria um desvio com a **ponte de safena**. Na cabine, o sangue chega com menos oxigênio (Veja M2V2 - I), e quem tem uma artéria estreita tem menos margem.",
          "A **angina estável**, que aparece sempre no mesmo esforço, em geral não dá problema em voo; quando aparece em esforços pequenos (classes **III e IV**), o passageiro precisa de **oxigênio** a bordo. A **angina instável**, nova, mais forte ou que surge em repouso, **impede o voo**. No tripulante, a dor da isquemia pode ser **incapacitante** por si só.",
          "Para o **passageiro**, os prazos são curtos. Depois de um **infarto sem complicação**, a viagem é possível em **7 a 10 dias**; antes de 7, é contraindicada. **Com complicação**, o voo fica contraindicado nas primeiras **4 a 6 semanas**. A **angioplastia com stent** sem complicação permite viajar em **3 dias**, com avaliação individual. A **ponte de safena** e as outras cirurgias do tórax pedem de **10 a 14 dias**, para o ar deixado no peito ser reabsorvido.",
          "Para o **tripulante**, os prazos são longos e as autoridades divergem. No RBAC 67, o infarto exige **pelo menos 1 ano**, e a revascularização ou a angioplastia sem infarto, **pelo menos 180 dias**, com Holter, cintilografia, eco e exames de sangue normais; o resultado favorável é **apto com restrição**, com validade de **até 6 meses**. Na 2ª classe, o comissário e o mecânico de voo podem voltar **6 meses** depois do infarto. Na FAA, a espera é de **3 meses** depois do infarto ou do stent e de **6 meses** depois da ponte, com **autorização especial**. A ICAO pede **6 meses**, coração com bombeamento normal e voo só **com outro piloto** na Classe 1.",
          "Voar antes do prazo é arriscar um **novo infarto** ou uma **arritmia** a bordo, longe do hospital, e o desvio do avião. O tripulante ainda responde pela licença. Depois do stent, o **antiagregante** não pode ser interrompido por conta própria: a FAA espera **1 ano** de uso com o stent **farmacológico** e pelo menos **30 dias** com o **convencional**. Parar de fumar, a **estatina** e o controle da pressão fazem parte do retorno.",
          "**Não voe hoje** com dor no peito nova, mais forte ou em repouso, nem antes do prazo depois do infarto, do stent ou da cirurgia. O médico confere a **data do evento**, se houve **complicação**, o **teste de esforço** e a **função do coração**, e anota os prazos no atestado ou no MEDIF.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v2-3-cateterismo.jpg'), 'No cateterismo, o contraste mostra o estreitamento da coronária; o stent é aberto ali para devolver o fluxo.') },
          { paragrafo: 2, figura: foto(require('@/assets/images/topicos/m2v2-3-esteira.jpg'), 'O teste de esforço na esteira mostra se o coração recebe sangue suficiente quando trabalha mais.') },
          { paragrafo: 3, midia: 'prazo-coracao' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · doença coronariana',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Angina estável', 'Pode voar; oxigênio nas classes III e IV', 'ANAC: angina é não apto (67.79(a)(1))'],
                ['Angina instável', 'Não voar', 'Não voar'],
                ['Infarto sem complicação', '7 a 10 dias', 'ANAC: 1 ano; FAA: 3 meses; ICAO: 6 meses'],
                ['Infarto com complicação', 'Contraindicado nas primeiras 4 a 6 semanas', 'Como acima, depois de estabilizar'],
                ['Angioplastia com stent', '3 dias, sem complicação', 'ANAC: 180 dias; FAA: 3 meses; ICAO: 6 meses'],
                ['Ponte de safena', '10 a 14 dias', 'ANAC: 180 dias; FAA: 6 meses; ICAO: 6 meses'],
              ],
            },
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Remédios e voo · doença coronariana',
              colunas: ['Remédio ou classe', 'Efeito que importa no voo', 'Tripulante'],
              linhas: [
                ['Antiagregante depois do stent (aspirina, clopidogrel)', 'Evita o coágulo no stent; não parar por conta própria', 'FAA: 1 ano com stent farmacológico; ao menos 30 dias com o convencional'],
                ['Estatina', 'Baixa o colesterol e estabiliza a placa', 'ICAO: indicada no retorno ao voo'],
                ['IECA, BRA ou bloqueador de cálcio', 'Controlam a pressão depois do evento', 'ICAO: preferidos no retorno ao voo'],
                ['Betabloqueador e diurético', 'Baixam a frequência e eliminam água', 'ICAO: melhor evitar no retorno ao voo'],
                ['Remédio para angina', 'Sinal de que a isquemia continua', 'ICAO: o retorno exige não precisar dele'],
                ['Nitrato', 'Dilata as artérias; pode baixar a pressão', 'FAA: não aceito'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '2.4',
      titulo: 'Arritmias, marca-passo e desfibrilador',
      pergunta: 'Quem tem arritmia ou marca-passo pode voar?',
      conteudo: {
        texto: [
          "**Arritmia** é o coração fora do ritmo: rápido, lento ou irregular. A mais comum no adulto é a **fibrilação atrial**, em que os átrios tremem em vez de contrair. Ela pode ser **paroxística**, com crises que param sozinhas em menos de 24 horas, **persistente**, que dura mais de 7 dias e só volta com tratamento, ou **permanente**, quando o ritmo normal não volta mais. No **flutter atrial**, o átrio bate perto de **300 vezes por minuto**, e o ventrículo, muitas vezes a **150**.",
          "No voo, a arritmia incomoda de dois jeitos. A **troca súbita de ritmo** traz palpitação, tontura ou falta de ar; e o sangue parado no átrio que treme pode formar um **coágulo** que vai ao cérebro, o que leva muitos pacientes a usar **anticoagulante**. Para o tripulante, mesmo uma arritmia leve pode **distrair** sem que ele perceba o quê.",
          "Para o **passageiro**, a arritmia **controlada** não impede o voo; a **não controlada** é uma contraindicação. Quem tem **marca-passo** ou **desfibrilador** pode voar quando estiver estável: a interferência com os sistemas do avião ou com o controle de segurança do aeroporto é **muito improvável** nos aparelhos comuns.",
          "Para o **tripulante**, o caminho é mais longo. No RBAC 67, distúrbio significativo do ritmo torna o candidato **não apto**, salvo investigação favorável, e o **marca-passo** também; depois da **ablação** de uma via anômala, o retorno é possível em **3 meses**, com estudo eletrofisiológico normal. Na FAA, a fibrilação atrial vai para a **decisão da FAA**, a espera é de **3 meses** depois da ablação e de **1 mês** depois da cardioversão, o marca-passo pede **2 meses** e o **desfibrilador ativo desqualifica** todas as classes. A ICAO aceita a fibrilação atrial com ritmo normal, **3 Holter** sem crise em 2 a 3 meses e voo só **com outro piloto**; o marca-passo, sem dependência dele, só com restrição; e o desfibrilador implantável **impede** o voo.",
          "Voar com a arritmia descontrolada é arriscar **desmaio**, **AVC** ou uma crise longe do atendimento. Entre os remédios de controle, a ICAO aceita a **digoxina**, o **betabloqueador**, o **sotalol** e o **verapamil**. A **anticoagulação** é o ponto sensível: o RBAC 67 torna **não apto** quem usa anticoagulante **cumarínico**, como a **varfarina**, e muitos países fazem o mesmo (Veja M2V11).",
          "**Não voe hoje** com palpitação nova, desmaio ou tontura que não passa, nem nas primeiras semanas depois de ablação, cardioversão ou implante de aparelho. O médico confere o **Holter**, o **ecocardiograma**, a função da **tireoide** e o anticoagulante, e registra o tipo e a data do aparelho implantado.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, midia: 'classificar-arritmia' },
          { paragrafo: 2, figura: foto(require('@/assets/images/topicos/m2v2-4-holter.jpg'), 'O Holter grava o ritmo do coração por 24 horas ou mais, inclusive durante as tarefas do dia a dia.') },
          { paragrafo: 3, figura: foto(require('@/assets/images/topicos/m2v2-4-seguranca.jpg'), 'Com marca-passo, o passageiro passa pelo controle de segurança: a interferência é muito improvável nos aparelhos comuns.') },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · arritmias e aparelhos',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Arritmia controlada', 'Pode voar', 'ANAC: não apto, salvo investigação favorável; FAA: decisão da FAA'],
                ['Arritmia não controlada', 'Não voar', 'Não voar'],
                ['Depois de ablação', 'Quando estiver estável', 'FAA: 3 meses; ANAC (via anômala): 3 meses, com reestudo normal'],
                ['Depois de cardioversão', 'Quando estiver estável', 'FAA: 1 mês'],
                ['Marca-passo', 'Pode voar quando estável', 'FAA: 2 meses; ANAC: não apto; ICAO: só com restrição'],
                ['Desfibrilador implantado', 'Pode voar quando estável', 'FAA e ICAO: impede'],
              ],
            },
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Remédios e voo · ritmo do coração',
              colunas: ['Remédio', 'Para que serve', 'Tripulante'],
              linhas: [
                ['Betabloqueador (atenolol, bisoprolol)', 'Mantém o ritmo e baixa a frequência', 'ICAO: permitido'],
                ['Sotalol', 'Mantém o ritmo', 'ICAO: permitido se não provocar arritmia'],
                ['Verapamil', 'Controla a frequência', 'ICAO: permitido'],
                ['Digoxina', 'Controla a frequência em repouso', 'ICAO: permitido'],
                ['Varfarina', 'Evita o coágulo no átrio', 'ANAC: não apto; FAA: 6 semanas de observação'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '2.5',
      titulo: 'Válvulas e cardiopatias congênitas',
      pergunta: 'Sopro, troca de válvula ou doença de nascença impedem de voar?',
      conteudo: {
        texto: [
          "As **válvulas** garantem que o sangue ande num só sentido. Doentes, elas podem **apertar** a passagem (**estenose**) ou **deixar o sangue voltar** (**insuficiência**); o **sopro** é o barulho dessa passagem anormal. O **prolapso da valva mitral**, em que a válvula se dobra para trás, é comum e muitas vezes não causa nada. Quando a válvula é trocada, entra uma prótese **mecânica**, que exige anticoagulante para sempre, ou **biológica**.",
          "As **cardiopatias congênitas** vêm de nascença. A **comunicação interatrial**, um furo entre os átrios, responde por cerca de **um quarto** delas; fechada antes dos **24 anos**, a expectativa de vida fica normal. Muitas pessoas operadas na infância chegam à vida adulta com uma vida comum, mas algumas formas continuam limitando o coração.",
          "Para o **passageiro**, a valvopatia **com sintomas** pede avaliação individual, e a **grave com sintomas** impede o voo. Quem tem cardiopatia **cianótica**, que deixa os lábios arroxeados, ou **hipertensão pulmonar** precisa de **oxigênio** a bordo, combinado com a companhia.",
          "Para o **tripulante**, o RBAC 67 torna **não apto** quem tem **sopro significativo** ou **doença valvar**, **troca de válvula** ou **transplante**, e cardiopatia congênita sem **cura cirúrgica indubitável**. O prolapso mitral é aceito se **não der sintomas**, não houver arritmia nem outra doença do coração, e a **esteira**, o **Holter** e o **ecocardiograma** forem satisfatórios. Na FAA, a troca de válvula e as demais valvopatias vão para a **decisão da FAA**. A ICAO aceita, depois de **6 meses**, a **prótese biológica** na aorta ou o **reparo da mitral**, com ritmo normal, sem varfarina e com voo só com outro piloto; a **válvula mecânica impede** o voo.",
          "Voar sem liberação com uma válvula apertada é arriscar **falta de ar**, **desmaio** ou **arritmia** na cabine. Com prótese mecânica, o **anticoagulante** é obrigatório, e o RBAC 67 torna não apto quem usa o do tipo **cumarínico** (Veja M2V2 - IV).",
          "**Não voe hoje** com falta de ar nova, desmaio ou dor no peito. O médico confere o **ecocardiograma**, o tipo de prótese, o ritmo e o anticoagulante, e informa à companhia se o paciente precisa de oxigênio.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v2-5-eco.jpg'), 'O ecocardiograma mostra as válvulas abrindo e fechando e mede o tamanho das cavidades do coração.') },
          { paragrafo: 2, figura: foto(require('@/assets/images/topicos/m2v2-5-ausculta.jpg'), 'O sopro aparece na ausculta e é investigado com o ecocardiograma.') },
          { paragrafo: 3, midia: 'prolapso-mitral' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · válvulas e congênitas',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Valvopatia sem sintomas', 'Pode voar', 'ANAC: não apto se significativa; FAA: decisão da FAA'],
                ['Valvopatia grave com sintomas', 'Não voar', 'Não voar'],
                ['Prolapso mitral sem sintomas', 'Pode voar', 'ANAC: apto com esteira, Holter e eco satisfatórios'],
                ['Prótese biológica ou reparo da mitral', 'Quando estiver estável', 'ICAO: após 6 meses, só com outro piloto; ANAC: não apto'],
                ['Prótese mecânica', 'Quando estiver estável', 'ICAO: impede; ANAC: não apto'],
                ['Cardiopatia cianótica ou hipertensão pulmonar', 'Oxigênio a bordo', 'Não apto'],
              ],
            },
          },
          { paragrafo: 6, midia: 'animacao-valvula' },
        ],
      },
    },
    {
      id: '2.6',
      titulo: 'Insuficiência cardíaca, miocárdio e pericárdio',
      pergunta: 'Quem tem o coração fraco precisa de oxigênio no avião?',
      conteudo: {
        texto: [
          "Na **insuficiência cardíaca**, o coração não bombeia o sangue de que o corpo precisa, e o líquido se acumula nos pulmões e nas pernas. A gravidade é medida pela **classe funcional da NYHA**: na **I**, não há limitação; na **II**, há sintomas leves nas atividades comuns; na **III**, sintomas em atividades menores que as comuns; na **IV**, sintomas até em repouso. Na cabine, com menos oxigênio no ar (Veja M2V2 - I), quem já está no limite sente **falta de ar** mais cedo.",
          "As **cardiomiopatias** são doenças do próprio músculo: **dilatada**, quando o ventrículo cresce e bombeia mal; **hipertrófica**, quando a parede engrossa sem motivo, presente em cerca de **1 em cada 500 adultos**; e **restritiva**, quando o músculo enrijece. A **pericardite** é a inflamação da membrana que envolve o coração e costuma doer muito.",
          "Para o **passageiro**, a insuficiência cardíaca **classe III ou IV**, ou com oxigênio do sangue abaixo de **70 mmHg** no solo, pede **oxigênio a bordo**; a insuficiência **descompensada**, com piora recente, **impede o voo**. O oxigênio precisa ser combinado com a companhia, que costuma pedir o **MEDIF**.",
          "Para o **tripulante**, o RBAC 67 torna **não apto** quem tem **pericardite** ou **miocardiopatia**. A ICAO admite a volta depois de uma pericardite em **3 a 6 meses**, só com restrição, com **eco**, **Holter** e **esteira** normais e acompanhamento por **2 anos**; a **recorrência** impede o voo, porque a dor pode incapacitar.",
          "Voar com a insuficiência descompensada é arriscar **edema de pulmão** a bordo, com falta de ar que piora com a altitude, e o desvio do avião. Os remédios ficam na **bagagem de mão**, e quem usa **diurético** planeja o acesso ao banheiro sem deixar de tomar a dose.",
          "**Não voe hoje** com falta de ar em repouso, inchaço que aumentou ou ganho de peso rápido. O médico confere a **classe da NYHA**, a **fração de ejeção** e o oxigênio do sangue, e registra no MEDIF o fluxo de oxigênio necessário.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, midia: 'nyha-oxigenio' },
          { paragrafo: 2, figura: foto(require('@/assets/images/topicos/m2v2-6-escada.jpg'), 'Na classe III da NYHA, poucos degraus já cansam: o voo pede oxigênio combinado com a companhia.') },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Liberação para voo · insuficiência cardíaca, miocárdio e pericárdio',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Insuficiência cardíaca classe I ou II', 'Pode voar, estável', 'ANAC: a critério do examinador (67.79(a)(2))'],
                ['Classe III ou IV, ou PaO2 abaixo de 70 mmHg', 'Oxigênio a bordo', 'Não apto'],
                ['Insuficiência descompensada', 'Não voar', 'Não voar'],
                ['Miocardiopatia', 'Conforme a classe funcional', 'ANAC: não apto'],
                ['Pericardite', 'Quando estiver sem dor', 'ANAC: não apto; ICAO: 3 a 6 meses, com restrição'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v2-6-oxigenio.jpg'), 'O concentrador portátil aprovado pela companhia leva o oxigênio combinado no MEDIF durante todo o voo.') },
        ],
      },
    },
    {
      id: '2.7',
      titulo: 'Trombose e embolia',
      pergunta: 'O voo longo causa trombose? Como se proteger?',
      conteudo: {
        texto: [
          "Na **trombose venosa profunda**, um coágulo se forma numa veia funda, quase sempre da **perna**. Se ele se solta e chega ao pulmão, vira **embolia pulmonar**, que pode matar. Horas **sentado**, com as pernas dobradas e pouco movimento, deixam o sangue parado nas veias da panturrilha (Veja M2V2 - I).",
          "O risco do voo existe, mas é pequeno: nos voos de **mais de 4 horas**, um estudo encontrou **1 caso em 4.656** viagens, e outro, **1 em 6.000**. A viagem longa pode **dobrar ou quadruplicar** o risco, e ele cresce com a **duração** e com os **fatores de risco**: câncer ativo, **hormônio** com estrogênio, cirurgia, internação ou trauma recentes, imobilidade, **obesidade**, idade acima de **40 anos**, **gestação** e pós-parto, **trombose anterior**, trombofilia e casos na família. A maior parte aparece **1 a 2 semanas** depois do voo, e o risco só volta ao normal em **8 semanas**.",
          "Para o **passageiro** que já teve trombose, a IATA admite o voo depois de uma **trombose na perna** quando não há sintomas e o **anticoagulante está estável**; depois de uma **embolia**, a partir de **5 dias**, com anticoagulação estável e oxigênio normal no sangue. A British Thoracic Society é mais cautelosa: **2 semanas** depois do diagnóstico (Veja M2V1 - IX).",
          "Para o **tripulante**, o RBAC 67 torna **não apto** quem tem **sangue que coagula demais** ou usa anticoagulante **cumarínico** (Veja M2V11). Na FAA, a trombose na 1ª e na 2ª classes vai para a **decisão da FAA**, e na 3ª o examinador pode emitir depois de **episódio único**, resolvido e **sem anticoagulante**; quem usa varfarina mostra o **INR ao menos mensal** nos 6 meses anteriores. Pela ICAO, a certificação volta **1 semana** depois de parar a varfarina; depois de uma embolia, espera-se **6 meses** de tratamento, e a pressão do pulmão precisa estar normal.",
          "Prevenir é simples para todos: **caminhar** pelo corredor, **exercitar a panturrilha** na poltrona e preferir o **assento do corredor**. Beber água é razoável, mas não há prova de que evite a trombose. Para quem tem **risco alto**, a **meia de compressão** abaixo do joelho, com **15 a 30 mmHg** no tornozelo, é recomendada; a **heparina** antes do voo é decisão do médico, e a **aspirina** não é a primeira escolha.",
          "**Não voe hoje** com dor e inchaço numa perna ou falta de ar súbita. Nas **2 semanas** depois de um voo longo, esses sinais pedem atendimento médico. O médico confere a data do diagnóstico, o anticoagulante, o oxigênio do sangue e os fatores de risco, e decide a prevenção da próxima viagem.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: foto(require('@/assets/images/topicos/m2v2-7-panturrilha.jpg'), 'Exercitar a panturrilha na poltrona: o músculo da perna empurra o sangue parado de volta ao coração.') },
          { paragrafo: 2, midia: 'risco-trombose' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Liberação para voo · trombose e embolia',
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ['Trombose na perna recente', 'Sem sintomas e com anticoagulante estável (IATA); 2 semanas (BTS)', 'FAA: decisão da FAA na 1ª e 2ª classes; ANAC: anticoagulante cumarínico, não apto'],
                ['Embolia pulmonar recente', 'A partir de 5 dias, estável (IATA); 2 semanas (BTS)', 'ICAO: 6 meses de tratamento, pressão do pulmão normal'],
                ['Episódio único, resolvido, sem anticoagulante', 'Pode voar, com prevenção', 'FAA (3ª classe): o examinador pode emitir'],
                ['Risco alto, sem trombose', 'Meia de 15 a 30 mmHg; heparina se o médico indicar', 'Sem restrição por esse dado'],
              ],
            },
          },
          { paragrafo: 5, figura: foto(require('@/assets/images/topicos/m2v2-7-meia.jpg'), 'A meia de compressão abaixo do joelho, com 15 a 30 mmHg no tornozelo, é indicada para quem tem risco alto.') },
          {
            paragrafo: 6,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Coração', 'Acelera para compensar o oxigênio mais baixo da cabine; quem tem pouca reserva sente dor, falta de ar ou arritmia', 'Voar com a doença estável e com os prazos cumpridos'],
                ['Coronárias', 'A placa estreita a artéria e deixa pouca margem', 'Respeitar os prazos depois do infarto, do stent e da ponte'],
                ['Ritmo do coração', 'A troca súbita de ritmo traz palpitação, tontura e coágulos', 'Arritmia controlada; anticoagulante conforme a autoridade'],
                ['Cérebro', 'Infarto, AVC e arritmia podem incapacitar de uma vez', 'Controlar a pressão; remédios compatíveis com o voo'],
                ['Pulmões', 'Insuficiência cardíaca e embolia trazem falta de ar na cabine', 'Oxigênio combinado com a companhia; prevenção da trombose'],
                ['Veias das pernas', 'O sangue parado forma coágulos nos voos longos', 'Caminhar, exercitar a panturrilha, meia de compressão no risco alto'],
                ['Tórax depois de cirurgia', 'O ar que sobra no peito cresce com a subida', 'Esperar 10 a 14 dias depois da ponte de safena'],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      pergunta: 'Por que o coração acelera na cabine em cruzeiro?',
      opcoes: ['Porque a cabine é fria', 'Para compensar o oxigênio mais baixo no sangue', 'Por causa do ruído dos motores', 'Porque a pressão arterial cai'],
      correta: 1,
      explicacao: 'Com a cabine entre 5.000 e 8.000 ft, a saturação cai um pouco, e o coração acelera para entregar o mesmo oxigênio aos tecidos.',
      topico: '2.1',
    },
    {
      pergunta: 'No RBAC 67, acima de que pressão mantida o candidato à 1ª classe é não apto?',
      opcoes: ['120 × 80 mmHg', '140 × 90 mmHg', '155 × 95 mmHg', '180 × 110 mmHg'],
      correta: 1,
      explicacao: 'Pelo 67.79(a)(8), pressão mantida acima de 140 × 90 mmHg torna o candidato não apto; com remédio, pode ser apto a critério.',
      topico: '2.2',
    },
    {
      pergunta: 'Qual remédio de pressão a FAA aceita e a ICAO não permite?',
      opcoes: ['Losartana', 'Anlodipino', 'Doxazosina (alfabloqueador)', 'Atenolol'],
      correta: 2,
      explicacao: 'A FAA aceita o alfabloqueador; a ICAO não o permite. As duas recusam os de ação central, como a clonidina.',
      topico: '2.2',
    },
    {
      pergunta: 'Depois de um infarto sem complicação, quando o passageiro pode viajar?',
      opcoes: ['No dia seguinte', 'Em 7 a 10 dias', 'Só depois de 6 meses', 'Só depois de 1 ano'],
      correta: 1,
      explicacao: 'Pela autoridade britânica, o infarto sem complicação permite viajar em 7 a 10 dias; antes de 7, o voo é contraindicado.',
      topico: '2.3',
    },
    {
      pergunta: 'Por que o passageiro espera de 10 a 14 dias depois de uma ponte de safena?',
      opcoes: ['Para o ar deixado no tórax ser reabsorvido', 'Para o antiagregante fazer efeito', 'Por causa da radiação', 'Para a pressão subir'],
      correta: 0,
      explicacao: 'A cirurgia deixa ar dentro do tórax, e ele cresce com a subida; o prazo permite a reabsorção.',
      topico: '2.3',
    },
    {
      pergunta: 'No RBAC 67, quanto tempo depois de um infarto o piloto pode revalidar o certificado?',
      opcoes: ['3 meses', '6 meses', '1 ano', 'Nunca'],
      correta: 2,
      explicacao: 'O 67.79(b)(1) exige pelo menos 1 ano, com exames satisfatórios; o resultado é apto com restrição, com validade de até 6 meses.',
      topico: '2.3',
    },
    {
      pergunta: 'O que a FAA diz sobre o desfibrilador implantável ativo?',
      opcoes: ['Basta esperar 2 meses', 'Desqualifica todas as classes', 'É aceito na 3ª classe', 'Só exige Holter anual'],
      correta: 1,
      explicacao: 'Para a FAA, o desfibrilador ativo desqualifica todas as classes; o marca-passo pede 2 meses e decisão da FAA.',
      topico: '2.4',
    },
    {
      pergunta: 'Para a ICAO, que tipo de prótese de válvula impede o voo profissional?',
      opcoes: ['Biológica na aorta', 'Reparo da mitral', 'Mecânica', 'Nenhuma'],
      correta: 2,
      explicacao: 'A válvula mecânica exige anticoagulante para sempre e impede a certificação; a biológica e o reparo da mitral podem ser aceitos após 6 meses, com restrição.',
      topico: '2.5',
    },
    {
      pergunta: 'Que passageiro com insuficiência cardíaca precisa de oxigênio a bordo?',
      opcoes: ['Classe I da NYHA', 'Classe II da NYHA', 'Classe III ou IV da NYHA', 'Nenhum'],
      correta: 2,
      explicacao: 'Classe III ou IV, ou PaO2 abaixo de 70 mmHg no solo, pede oxigênio a bordo; a insuficiência descompensada impede o voo.',
      topico: '2.6',
    },
    {
      pergunta: 'Qual medida de prevenção da trombose vale para todos os passageiros?',
      opcoes: ['Tomar aspirina', 'Caminhar e exercitar a panturrilha', 'Tomar heparina', 'Dormir a viagem toda'],
      correta: 1,
      explicacao: 'Caminhar, exercitar a panturrilha e preferir o corredor valem para todos; meia, heparina e outras medidas são para o risco alto.',
      topico: '2.7',
    },
  ],
  liberacao: liberacaoCardiovascular,
};
