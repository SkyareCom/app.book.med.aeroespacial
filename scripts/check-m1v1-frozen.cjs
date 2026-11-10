'use strict';

// Congelamento editorial M1V1 I–IV — autorizado em 23/10/2026; revisão de texto autorizada pelo autor em 26/10/2026
// (remoção de repetições entre tópicos, cadência e destaques; recursos e teste inalterados).
// Protege os quatro tópicos, imagens, gráficos, tabelas e o teste final associado.
// Não atualize estas assinaturas sem autorização explícita do autor.
// A verificação compara o conteúdo exato (inclusive espaços e pontuação).
const fs = require('node:fs');
const path = require('node:path');

const fonte = fs.readFileSync(path.resolve(__dirname, '../src/data/capitulos/atmosfera.ts'), 'utf8');
const ASSINATURAS = Object.freeze({
  '1.1': '380ad402c604b256', // M1V1 - I: Camadas da atmosfera (27/10/2026: animação do balão, padrão de mídias pedido pelo autor)
  // 09/11/2026: autorizado pelo autor ("Revise, padronize, corrija os erros"): células das tabelas sem ponto final e tempo de leitura do M1V1; hash novo.
  '1.2': '3ba603e08894ff44', // M1V1 - II: Leis dos gases
  // 09/11/2026: autorizado pelo autor ("Revise, padronize, corrija os erros"): células das tabelas sem ponto final e tempo de leitura do M1V1; hash novo.
  '1.3': '83cc7e95ded04f49', // M1V1 - III: Atmosfera padrão (27/10/2026: fotos do autor; 30/10/2026: foco no organismo, autorizado pelo autor)
  // 05/11/2026: autorizado pelo autor ("Nas tabelas semelhantes, sempre explicar o motivo", junto com "Em todo app"): só a coluna "O que acontece" da tabela "Sistemas do corpo mais atingidos" ganhou o motivo fisiológico; hash novo.
  // 09/11/2026: autorizado pelo autor ("Revise, padronize, corrija os erros"): células das tabelas sem ponto final e tempo de leitura do M1V1; hash novo.
  '1.4': '0d9c2b139941c010', // M1V1 - IV: Temperatura e umidade (27/10/2026: simulador umidade-cabine; 30/10/2026: tabela de sistemas do corpo, autorizada pelo autor)
});
const ASSINATURA_TESTE = '47754a8bbeb02cb4';

// FNV-1a 64 bits por unidade UTF-16; detecta alterações acidentais byte a byte
// da representação JavaScript. Não é assinatura criptográfica/controle de acesso.
function assinatura(texto) {
  let valor = 0xcbf29ce484222325n;
  for (let i = 0; i < texto.length; i++) {
    valor ^= BigInt(texto.charCodeAt(i));
    valor = BigInt.asUintN(64, valor * 0x100000001b3n);
  }
  return valor.toString(16).padStart(16, '0');
}

function posicaoUnica(marcador) {
  const primeira = fonte.indexOf(marcador);
  if (primeira < 0 || fonte.indexOf(marcador, primeira + 1) !== -1) {
    throw Error('Marcador do tópico ausente ou duplicado: ' + marcador);
  }
  return primeira;
}

const ids = Object.keys(ASSINATURAS);
const inicios = ids.map((id) => posicaoUnica("    {\n      id: '" + id + "',"));
const fimTopicos = fonte.indexOf('\n  ],\n  teste:', inicios[inicios.length - 1]);
const fimTeste = fonte.lastIndexOf('\n  ],\n};');
if (fimTopicos < 0 || fimTeste < 0 || !inicios.every((v, i) => i === 0 || v > inicios[i - 1])) {
  throw Error('A estrutura de M1V1 foi alterada. Não é permitido modificar os tópicos congelados.');
}

let diferente = false;
for (let i = 0; i < ids.length; i++) {
  const trecho = fonte.slice(inicios[i], i + 1 < ids.length ? inicios[i + 1] : fimTopicos);
  const atual = assinatura(trecho);
  if (atual !== ASSINATURAS[ids[i]]) {
    console.error('CONGELAMENTO VIOLADO: M1V1 - ' + ['I', 'II', 'III', 'IV'][i] +
      ' (' + ids[i] + '). Esperado: ' + ASSINATURAS[ids[i]] + '; recebido: ' + atual);
    diferente = true;
  } else {
    console.log('CONGELADO / ÍNTEGRO: M1V1 - ' + ['I', 'II', 'III', 'IV'][i]);
  }
}

const inicioTeste = fimTopicos + '\n  ],\n  teste: ['.length;
const teste = fonte.slice(inicioTeste, fimTeste);
if (assinatura(teste) !== ASSINATURA_TESTE) {
  console.error('CONGELAMENTO VIOLADO: questões e respostas do teste final de M1V1.');
  diferente = true;
}
// Congelamento editorial M1V2 e M1V3 — autorizado pelo autor em 27/10/2026; padrão de mídias (animações e tabelas) incluído a pedido do autor no mesmo dia.
// Protege o texto, recursos e testes (arquivos de dados), os gráficos e simuladores e as fotos de cada voo.
const crypto = require('node:crypto');
const ARQUIVOS = Object.freeze({
  'assets/videos/m1v3-nevoa.mp4': 'fce798b38067d0c3',
  'assets/images/topicos/m1v2-cilindro-oxigenio.jpg': '268e904a3dcf25c6',
  'assets/videos/m1v2-mascaras.mp4': 'e7d116eebd6b1581',
  // 05/11/2026: autorizado pelo autor ("Nas tabelas semelhantes, sempre explicar o motivo", junto com "Em todo app"): só a coluna "O que acontece" da tabela "Sistemas do corpo mais atingidos" ganhou o motivo fisiológico; hash novo.
  'src/data/capitulos/pressurizacao.ts': '7856fab7bf421bbf',
  // 04/11/2026: a pedido do autor ("Corrigir textos escondidos pelos gráficos em todo app"), o rótulo ALTITUDE (PÉS)
  // do gráfico de sistemas de oxigênio deixou de ser cortado embaixo (+4 px de altura). Novo hash.
  'src/components/midia/m1v2-graficos.tsx': '54dd9a527058f414',
  // 05/11/2026: autorizado pelo autor ("Nas tabelas semelhantes, sempre explicar o motivo", junto com "Em todo app"): só a coluna "O que acontece" da tabela "Sistemas do corpo mais atingidos" ganhou o motivo fisiológico; hash novo.
  // 09/11/2026: autorizado pelo autor ("Revise, padronize, corrija os erros"): células das tabelas sem ponto final e tempo de leitura do M1V1; hash novo.
  'src/data/capitulos/descompressao.ts': '95491a162e0a548b',
  'src/components/midia/m1v3-graficos.tsx': '301331868cfd0c8d',
  'assets/images/topicos/m1v2-aviao-cruzeiro.jpg': '7a329df60b37dbe1',
  'assets/images/topicos/m1v2-aviao-quadrado.jpg': 'adae60478408d5c8',
  'assets/images/topicos/m1v2-mascaras-cabine.jpg': '11bd27cc724154e7',
  'assets/images/topicos/m1v2-painel-pressurizacao.jpg': '03524be1749bf625',
  'assets/images/topicos/m1v2-piloto-mascara.jpg': '3f24651c16114376',
  'assets/images/topicos/m1v2-regulador.jpg': 'b74e0c0c66f4fda7',
  'assets/images/topicos/m1v2-traje-pressurizado.jpg': '78843fde8429aa4d',
  'assets/images/topicos/m1v2-valvula-saida.jpg': '2d6d73b39f91d24c',
  'assets/images/topicos/m1v3-cabine-nevoa.jpg': 'adf405291a2ccd88',
  'assets/images/topicos/m1v3-camara-hiperbarica.jpg': 'd448ef242cd93e92',
  'assets/images/topicos/m1v3-camara-hipobarica.jpg': 'e07de879e933a453',
  'assets/images/topicos/m1v3-jato-executivo.jpg': '80255ce43de6f9d1',
  'assets/images/topicos/m1v3-mergulhador-aviao.jpg': '641e8ba93dcccb9c',
  'assets/images/topicos/m1v3-mergulhador-subida.jpg': 'aaffbc821671f604',
  'assets/images/topicos/m1v3-pele-marmorizada.jpg': '60195898c00ba7a9',
  // Congelamento M1V4 e M2V1 — autorizado pelo autor em 29/10/2026 ("Resolva todos os itens").
  // 05/11/2026: autorizado pelo autor ("Nas tabelas semelhantes, sempre explicar o motivo", junto com "Em todo app"): só a coluna "O que acontece" da tabela "Sistemas do corpo mais atingidos" ganhou o motivo fisiológico; hash novo.
  'src/data/capitulos/temperatura.ts': '96dce46d5fc0ca04',
  'src/components/midia/m1v4-graficos.tsx': '5673a269f5b6358b',
  'assets/videos/m1v4-frio.mp4': '9ff51913ab0e9c92',
  'assets/images/topicos/m1v4-agua-gelada.jpg': '4fb9590b788e704f',
  'assets/images/topicos/m1v4-cabine-sol.jpg': '996fde119fe58715',
  'assets/images/topicos/m1v4-hidratacao.jpg': '259d4dc8e730e935',
  'assets/images/topicos/m1v4-resgate-frio.jpg': '99def23e990d2d6b',
  'assets/images/topicos/m1v4-sinal-espelho.jpg': '6bf5f5eb96ab34e7',
  'assets/images/topicos/m1v4-sinal-solo.jpg': 'b25a9345e3caecb1',
  // 02/11/2026: título do M2V1 trocado para "Pulmões, oxigênio e hipóxia", autorizado pelo autor.
  // 02/11/2026: M2V1 adaptado ao modelo de Sistemas (docs/modelo-sistemas.md), com autorização do autor, e congelado de
  //   novo com as 8 fotos dos tópicos VI a IX (no padrão de 1.600 px, pedido do autor), o bloco do formulário de liberação e os interativos novos.
  // 02/11/2026 (pedido do autor, "Resolva tudo"): apneia confirmada fora do texto do RBAC 67 Emenda 05; marcadores
  //   [confirmar na referência] da apneia retirados e numeração das alíneas conferida.
  // 03/11/2026: descongelado com autorização do autor ("Detalhar todo tópico de todos os sistemas como foi feito em
  //   jet lag"); tópicos I a V com parágrafo e tabela práticos, VI a IX com checklists; recongelado com hash novo.
  // 05/11/2026: descongelado com autorização do autor ("Em todo app, em QUEM É MAIS VULNERÁVEL, sempre detalhar o motivo
  //   metabólico e fisiológico"); só a coluna da tabela "O que muda em altitude" do tópico I mudou; recongelado com hash novo.
  // 05/11/2026: autorizado pelo autor ("Nas tabelas semelhantes, sempre explicar o motivo", junto com "Em todo app"): só a coluna "O que acontece" da tabela "Sistemas do corpo mais atingidos" ganhou o motivo fisiológico; hash novo.
  // 10/11/2026: autorizado pelo autor ("Autorizo todos", sobre alterar os voos congelados para o pedido "As doenças
  //   devem aparecer no texto e nao em tabelas isoladas..."): parágrafo de tratamentos, prognóstico e tipo de voo nos
  //   tópicos II, VI, VII e VIII, comparador "tipo de voo", tabela de tratamentos da apneia, opção de apneia operada na
  //   liberação e remissão do sono corrigida (M3V2 → M2V8 - VII); hashes refeitos.
  'src/data/capitulos/hipoxia.ts': 'b452b38b751fe905',
  'src/data/liberacao/respiratorio.ts': '9a6f5727cd7f1613',
  'src/components/midia/m2v1-graficos.tsx': '62f392182d882e99',
  'assets/images/topicos/m2v1-6-bombinha.jpg': 'a92bf195fe28ee30',
  'assets/images/topicos/m2v1-6-espirometria.jpg': '6d40f50ca00797ad',
  'assets/images/topicos/m2v1-7-cpap-aviao.jpg': '9aec7eb88be3509e',
  'assets/images/topicos/m2v1-7-sonolencia.jpg': '6e19a0f6560ff36b',
  'assets/images/topicos/m2v1-8-consulta.jpg': 'ae06463e18e2f0f2',
  'assets/images/topicos/m2v1-8-raio-x.jpg': '87491515bb977f1e',
  'assets/images/topicos/m2v1-9-concentrador.jpg': '031d41bfedebcf01',
  'assets/images/topicos/m2v1-9-teste.jpg': '72c7bb7c7c74deb8',
  // 03/11/2026: simulador do oxigênio descongelado com autorização do autor ("Descongele e ajuste o simulador"): a
  //   PO₂ alveolar de src/lib/fisiologia.ts foi calibrada pela Tabela II-1-2 da ICAO (93% a 8.000 ft); o arquivo do
  //   componente não mudou e segue congelado.
  'src/components/midia/simulador-o2.tsx': 'af94937e7e23183d',
  'src/components/midia/grafico-tuc.tsx': 'ce3774a3c28f2956',
  'src/components/midia/atividade-classificar.tsx': '1d1928c030bb10fd',
  'assets/images/topicos/m2v1-1-alveolos.jpg': '3309a261ef43a193',
  'assets/images/topicos/m2v1-1-oximetro.jpg': '6a5bac6bcf360508',
  'assets/images/topicos/m2v1-2-escapamento.jpg': 'a9df8b7a25934b8e',
  'assets/images/topicos/m2v1-2-fumaca.jpg': '8da21d8160c1cdb6',
  'assets/images/topicos/m2v1-3-cronometro.jpg': 'e89bee755f338cd1',
  'assets/images/topicos/m2v1-3-descompressao-cabine.jpg': 'f14d2cad44145d3e',
  'assets/images/topicos/m2v1-3-mascara-primeiro.jpg': 'd2bbb68d79695784',
  'assets/images/topicos/m2v1-4-cianose.jpg': '0ba748d7b9e0d585',
  'assets/images/topicos/m2v1-4-euforia.jpg': '812f1407e3f90c48',
  'assets/images/topicos/m2v1-5-maos.jpg': '751d6a943a2173c1',
  'assets/images/topicos/m2v1-5-oxigenio.jpg': 'ddd5800b87eddbd3',
  'assets/images/topicos/m1v3-piloto-dor.jpg': 'ba581322737531f6',
  // Congelamento M1V5 — combinado com o autor ao receber as fotos e o vídeo (30/10/2026).
  // 05/11/2026: autorizado pelo autor ("Nas tabelas semelhantes, sempre explicar o motivo", junto com "Em todo app"): só a coluna "O que acontece" da tabela "Sistemas do corpo mais atingidos" ganhou o motivo fisiológico; hash novo.
  'src/data/capitulos/radiacao.ts': '248ef02d2d3525ef',
  'src/components/midia/m1v5-graficos.tsx': '8b8fa55d9c13a1bf',
  'assets/videos/m1v5-aurora.mp4': 'aea16e089624393c',
  'assets/images/topicos/m1v5-1-cruzeiro-noite.jpg': '7ec0d4b39b7a6198',
  'assets/images/topicos/m1v5-1-rota-polar.jpg': '7af72615acf337f7',
  'assets/images/topicos/m1v5-2-cabine-longo.jpg': '6874b0d601cbb790',
  'assets/images/topicos/m1v5-2-tripulacao.jpg': 'c9c3114e8fea1438',
  'assets/images/topicos/m1v5-3-consulta.jpg': '5726c780a76aa2c0',
  'assets/images/topicos/m1v5-3-para-brisa.jpg': '45898a0b2f62c790',
  'assets/images/topicos/m1v5-4-operacoes.jpg': '64268d5a879428c3',
  'assets/images/topicos/m1v5-4-planejamento.jpg': '0525bb6ba153e074',
  // 31/10/2026: app inteiro traduzível (PT BR, EN US, ES ES), pedido do autor: só o import do texto SVG mudou
  // (SvgText traduzido); textos em português intactos; hashes refeitos.
  // 31/10/2026: botões de opção padronizados no app inteiro (componente Opcoes), pedido do autor; hashes refeitos.
  // Revisão 30/10/2026 (foco no organismo e tabela de sistemas do corpo em todos os voos) — autorizada pelo autor; hashes refeitos.
  // Congelamento M1V6 — combinado com o autor ao receber as fotos e o vídeo (30/10/2026).
  // 05/11/2026: autorizado pelo autor ("Nas tabelas semelhantes, sempre explicar o motivo", junto com "Em todo app"): só a coluna "O que acontece" da tabela "Sistemas do corpo mais atingidos" ganhou o motivo fisiológico; hash novo.
  'src/data/capitulos/ruido.ts': '1cb1e3afece4a5e0',
  'src/components/midia/m1v6-graficos.tsx': 'baaa4f28582eceeb',
  'assets/videos/m1v6-rotor.mp4': '64a9bd58c322df4f',
  'assets/images/topicos/m1v6-1-fone-cabine.jpg': '455a68cd3c837465',
  'assets/images/topicos/m1v6-1-medicao-cabine.jpg': '77a359f5c3660705',
  'assets/images/topicos/m1v6-2-audiometria.jpg': 'e4334bf9ee698163',
  'assets/images/topicos/m1v6-2-turboelice.jpg': 'd339e5d42bfe2d10',
  'assets/images/topicos/m1v6-3-fones.jpg': '06cf2fcdafaf2fcf',
  'assets/images/topicos/m1v6-3-patio.jpg': '057fb846cae517fe',
  'assets/images/topicos/m1v6-4-offshore.jpg': '3255b4d92cf407d0',
  'assets/images/topicos/m1v6-4-painel.jpg': '07e5ceb8d4239077',
  // Congelamento da missão CONCEITOS (M1V1–M1V8) — pedido do autor em 02/11/2026: arquivo do M1V1 inteiro,
  // fotos, vídeo e interativo do M1V1 e as capas dos 8 voos e da missão.
  // 05/11/2026: autorizado pelo autor ("Nas tabelas semelhantes, sempre explicar o motivo", junto com "Em todo app"): só a coluna "O que acontece" da tabela "Sistemas do corpo mais atingidos" ganhou o motivo fisiológico; hash novo.
  // 09/11/2026: autorizado pelo autor ("Revise, padronize, corrija os erros"): células das tabelas sem ponto final e tempo de leitura do M1V1; hash novo.
  'src/data/capitulos/atmosfera.ts': 'c05a6f4ea2823c93',
  'src/components/midia/m1v1-umidade.tsx': '7699b9377a454c7d',
  'assets/videos/m1v1-curvatura.mp4': 'd0c6a7c850ab75f8',
  'assets/images/topicos/m1v1-1-balao.jpg': 'cda576be862919c5',
  'assets/images/topicos/m1v1-1-tropopausa.jpg': '430a6ec77df40b30',
  'assets/images/topicos/m1v1-2-alpinista.jpg': '6fb5606e52269d17',
  'assets/images/topicos/m1v1-2-cilindro.jpg': 'c913a54c58b7a645',
  'assets/images/topicos/m1v1-2-corpo.jpg': '00639f6c958ac15e',
  'assets/images/topicos/m1v1-2-garrafa.jpg': '842bb374abd7513b',
  'assets/images/topicos/m1v1-2-pacote.jpg': '5cb4f44f50f1ce66',
  'assets/images/topicos/m1v1-3-aeroporto-quente.jpg': '94177974a285c6d9',
  'assets/images/topicos/m1v1-3-altimetro.jpg': '1602def8d4d0a9f8',
  'assets/images/topicos/m1v1-4-calor-umido.jpg': 'c0d8a7d421fbd05d',
  'assets/images/topicos/m1v1-4-olhos-secos.jpg': 'b28ec41286f60ee7',
  'assets/images/capas/fis-01.jpg': '1a85d85309fbfa67',
  'assets/images/capas/fis-04.jpg': 'e1bc6bdaf3ef317c',
  'assets/images/capas/fis-05.jpg': '32f73e4c688d75dc',
  'assets/images/capas/fis-11.jpg': '3cf15ed560546e80',
  'assets/images/capas/fis-12.jpg': 'ff82c068d8abb7c6',
  'assets/images/capas/fis-10.jpg': 'f9d48d31b16b310a',
  'assets/images/capas/fis-06.jpg': '463bd93843c541ab',
  'assets/images/capas/fis-07.jpg': '7faee900054036be',
  'assets/images/capas/temporada-fisiologia.jpg': '82d71e88e8415748',
  // Congelamento M1V7 — combinado com o autor ao receber as fotos e o vídeo (01/11/2026).
  // 05/11/2026: autorizado pelo autor ("Nas tabelas semelhantes, sempre explicar o motivo", junto com "Em todo app"): só a coluna "O que acontece" da tabela "Sistemas do corpo mais atingidos" ganhou o motivo fisiológico; hash novo.
  'src/data/capitulos/forcasg.ts': 'ad94d921f734792e',
  'src/components/midia/m1v7-graficos.tsx': 'da9ba71eaa9f1b6a',
  'assets/videos/m1v7-centrifuga.mp4': '98b7204996818516',
  'assets/images/topicos/m1v7-1-caca-curva.jpg': '5caa935d0c757a67',
  'assets/images/topicos/m1v7-1-acrobatico.jpg': '41de9d8c860931a8',
  'assets/images/topicos/m1v7-2-tunel.jpg': 'ab8a1abc8bd18b1b',
  'assets/images/topicos/m1v7-2-piloto-g.jpg': 'bf8f1f44340f966e',
  'assets/images/topicos/m1v7-3-traje.jpg': '85c0eb592f5052ce',
  'assets/images/topicos/m1v7-3-academia.jpg': 'b2476a8941aabb95',
  'assets/images/topicos/m1v7-4-centrifuga.jpg': '4a1a4ce12b88a6cc',
  'assets/images/topicos/m1v7-4-check-six.jpg': '1431eebe08f2c046',
  // Congelamento M1V8 — combinado com o autor ao receber as fotos e o vídeo (31/10/2026).
  // 05/11/2026: autorizado pelo autor ("Nas tabelas semelhantes, sempre explicar o motivo", junto com "Em todo app"): só a coluna "O que acontece" da tabela "Sistemas do corpo mais atingidos" ganhou o motivo fisiológico; hash novo.
  'src/data/capitulos/impacto.ts': 'ef71b7dd9f84ece9',
  'src/components/midia/m1v8-graficos.tsx': '5c18b0e9709a77a1',
  'assets/videos/m1v8-ejecao.mp4': '303230e7bd2e71c4',
  'assets/images/topicos/m1v8-1-treno.jpg': '87a9ba3f77fcb9a3',
  'assets/images/topicos/m1v8-1-cintos.jpg': '1a6fca669bd66fa9',
  'assets/images/topicos/m1v8-2-cabine.jpg': '1b695b155599b579',
  'assets/images/topicos/m1v8-2-crianca.jpg': '27b8b81646dda2b4',
  'assets/images/topicos/m1v8-3-coluna.jpg': 'a86552a41bdcaec0',
  'assets/images/topicos/m1v8-3-paraquedas.jpg': '9d36cdfc05791983',
  'assets/images/topicos/m1v8-4-helicoptero.jpg': '3371a3fd52263750',
  'assets/images/topicos/m1v8-4-ajuste.jpg': '5a8bbbde10f77222',
});
for (const [arquivo, esperado] of Object.entries(ARQUIVOS)) {
  const caminho = path.resolve(__dirname, '..', arquivo);
  const atual = fs.existsSync(caminho) ? crypto.createHash('sha256').update(fs.readFileSync(caminho)).digest('hex').slice(0, 16) : 'ausente';
  if (atual !== esperado) {
    console.error('CONGELAMENTO VIOLADO: ' + arquivo + '. Esperado: ' + esperado + '; recebido: ' + atual);
    diferente = true;
  }
}

// Missão CONCEITOS (02/11/2026): bloco da missão no índice (título, sinopse e ordem dos 8 voos) e capas ligadas a ela.
{
  const sha = (t) => crypto.createHash('sha256').update(t).digest('hex').slice(0, 16);
  const indice = fs.readFileSync(path.resolve(__dirname, '../src/data/secoes.ts'), 'utf8');
  const a = indice.indexOf("    id: 'conceitos',"), b = indice.indexOf("    id: 'sistemas',");
  const blocoMissao = a >= 0 && b > a ? sha(indice.slice(a, b)) : 'ausente';
  if (blocoMissao !== 'c9f3024e2453b03b') {
    console.error('CONGELAMENTO VIOLADO: bloco da missão Conceitos em src/data/secoes.ts.');
    diferente = true;
  }
  const capasTs = fs.readFileSync(path.resolve(__dirname, '../src/constants/capas.ts'), 'utf8');
  const linhasCapas = capasTs.split('\n').filter((l) => /^\s*'conceitos-\d+'|^\s*conceitos:/.test(l)).join('\n');
  if (sha(linhasCapas) !== '7459b4820baed9c5') {
    console.error('CONGELAMENTO VIOLADO: capas da missão Conceitos em src/constants/capas.ts.');
    diferente = true;
  }
}

if (diferente) {
  console.error('Solicite autorização do autor antes de descongelar ou alterar a missão Conceitos (M1V1–M1V8) ou o M2V1.');
  process.exitCode = 1;
} else {
  console.log('Missão Conceitos (M1V1–M1V8) e M2V1 preservados (textos, recursos, gráficos, fotos e testes). Nenhum conteúdo congelado mudou.');
}
