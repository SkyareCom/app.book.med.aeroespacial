# MODELO PADRÃO — VOOS DA MISSÃO SISTEMAS (02/11/2026)

Vale para todos os voos da Missão 2 (M2V1 a M2V15). Soma-se às regras de `estrutura-completa.md` (texto progressivo,
negrito, "(Veja M_V_)", fontes só nos comentários e na página Referências, foco no organismo) e de `padrao-midias.md`
(2 fotos e 1 interativo por tópico, nunca mais de 1 parágrafo seguido sem mídia; animação, tabela e vídeo por voo).

O objetivo de cada voo é ajudar três leitores a decidir se voar é seguro: o **passageiro**, o **tripulante** (piloto,
comissário, mecânico de voo) e o **médico especialista** que libera o próprio paciente. Por isso todo número vem com o
efeito no corpo, e toda condição termina numa decisão.

## 1. Estrutura do voo

**Tópico de abertura — o sistema em altitude.** O que o órgão faz no solo e o que muda na cabine, sempre com o efeito no
corpo, nesta ordem quando se aplicar:
1. **Menos oxigênio** (altitude de cabine; Veja M1V1 e M1V2): reserva do órgão, quem descompensa primeiro.
2. **Gás que expande** (Boyle; Veja M1V1 - II): cavidades com ar preso, dor, ruptura.
3. **Ar seco** (Veja M1V1 - IV): mucosas, desidratação.
4. **Imobilidade, jornada e fuso** (Veja M2V8): circulação, trombose, horário de remédios.
5. **Forças G, vibração e ruído**, quando o sistema for sensível a eles (Veja M1V6, M1V7).

**Tópicos de condição — um por doença, tratamento ou procedimento.** Texto único e progressivo, nesta sequência, sem
cabeçalhos dentro do texto:
1. **O que é e o que muda em altitude** — mecanismo, com o número e o efeito.
2. **Como o voo agrava** — sinais e sintomas, em que altitude ou tempo, quem é mais vulnerável, o que pode acontecer a
   bordo.
3. **Quando pode voar** — prazos de repouso durante o tratamento e depois de procedimentos, separados para passageiro e
   para tripulante (ANAC, FAA, ICAO); tabela "Liberação para voo".
4. **Voar sem liberação** — consequências para o corpo (complicação a bordo, desvio, morte) e consequências legais e
   profissionais (tripulante: norma da autoridade, certificado, seguro e investigação; passageiro: recusa de embarque,
   cobertura do seguro).
5. **Como amenizar e remédios** — condutas antes e durante o voo, remédios permitidos e proibidos para tripulantes
   (FAA Do Not Issue / Do Not Fly; ANAC), horário das doses com fuso, bagagem de mão, oxigênio a bordo, MEDIF.
6. **Decidir** — sinais que impedem o voo hoje e o que o médico precisa conferir.

**Fecho do voo.** Tabela "Sistemas do corpo mais atingidos" (obrigatória) e o teste no botão TESTE O CONHECIMENTO.

## 2. Tabelas obrigatórias

| Tabela | Onde | Colunas |
|---|---|---|
| O que muda em altitude | Tópico de abertura | Fator do voo · O que acontece no órgão · Quem é mais vulnerável |
| Liberação para voo | Cada tópico de condição | Situação · Passageiro · Tripulante |
| Remédios e voo | Tópico com tratamento | Remédio ou classe · Efeito que importa no voo · Tripulante (FAA/ANAC) |
| Sistemas do corpo mais atingidos | Fim do voo | Sistema · O que acontece · Proteção e prevenção |

Prazos sem fonte primária ficam "[confirmar na referência]". Nunca estimar um prazo.

## 3. Fontes por leitor

- **Tripulante:** ANAC, RBAC 67 (Emenda vigente); FAA, 14 CFR Part 67, 14 CFR 61.53 e Guide for Aviation Medical
  Examiners; ICAO, Anexo 1, Cap. 6, e Doc 8984; quando houver, EASA Part-MED.
- **Passageiro:** IATA Medical Manual; Aerospace Medical Association (Medical Guidelines for Airline Travel);
  sociedades médicas com diretriz de voo (ex.: British Thoracic Society para pulmão); ANAC para transporte de
  passageiros que precisam de assistência; regras da companhia aérea (MEDIF).
- **Obras de referência** de `estrutura-completa.md`, para fisiologia e mecanismos.

Toda fonte vai no registro de revisão do arquivo do voo e na página Referências, nunca no texto.

## 4. Formulário de liberação para voo seguro (fim da missão)

Um só formulário, no fim da Missão Sistemas (`src/app/liberacao-voo.tsx`), alimentado pelas perguntas de cada voo
(`liberacao` no arquivo do voo). Cada voo novo acrescenta o seu bloco; o formulário cresce junto com a missão.

**Quem responde:**
- **Passageiro** e **tripulante**: respondem sobre si, em linguagem simples.
- **Médico especialista**: responde sobre o paciente e escolhe se ele é passageiro ou tripulante; recebe o veredito em
  linguagem técnica, com a norma, o prazo e o que registrar no atestado ou no MEDIF.

**Cada pergunta traz:** o texto, uma ajuda curta e, para cada resposta, o efeito para passageiro e para tripulante:
nível, comentário para o leigo, comentário para o médico, o tópico a revisar e a fonte (no comentário do código).

**Níveis do veredito (vale o pior):**
1. **Liberado** — nada nas respostas impede o voo.
2. **Liberado com cuidados** — pode voar com as condutas indicadas.
3. **Avaliação médica antes do voo** — passageiro: médico assistente e, se a companhia pedir, MEDIF; tripulante:
   médico examinador credenciado.
4. **Não voar agora** — há impedimento até o prazo ou a condição indicada.

**O resultado mostra:** o veredito, um comentário sobre a situação, a lista do que pesou (com o tópico para revisar) e o
aviso de que o formulário apoia a decisão e não substitui o médico, a autoridade aeronáutica nem a companhia aérea.

## 5. Checklist antes de congelar um voo de Sistemas

- [ ] Tópico de abertura com os fatores do voo e a tabela "O que muda em altitude".
- [ ] Cada condição com as seis partes, a tabela "Liberação para voo" e prazos com fonte.
- [ ] "Remédios e voo" onde houver tratamento.
- [ ] Bloco `liberacao` com as perguntas do sistema, efeitos para passageiro e tripulante e fontes.
- [ ] Padrão de mídias, tabela de sistemas do corpo, teste, traduções (0 pendências) e teste visual em 320–390 px.
