# Papos de Altitude

App-book de medicina aeroespacial em React Native (Expo), com a experiência de uma série com nomes de aviação: 4 missões, 50 voos, uma missão especial de história e um laboratório de simuladores. Feito para médicos e leigos.

<p>
  <img src="docs/tela-home.jpg" alt="Home" width="190">
  <img src="docs/tela-temporada.jpg" alt="Missão" width="190">
  <img src="docs/tela-capitulo.jpg" alt="Voo" width="190">
  <img src="docs/tela-laboratorio.jpg" alt="Laboratório" width="190">
</p>

## A experiência

Nomes de aviação: cada seção é uma **Missão**, cada capítulo um **Voo** e cada tópico uma **Fase**. O botão principal é **Decolar**.

- **Abertura de cinema** com o logotipo do Papos de Altitude (toque em "Pular" para ir direto).
- **Home em estilo série:** destaques rotativos no topo, "Continue de onde parou", sua evolução, uma fileira de voos por missão, a missão especial O Voo e a Medicina, o Laboratório, os modos quiz e prova e as curiosidades.
- **Missões** (as 4 seções do rodapé: Fisiologia, Clínica, Operação, Espaço) com arte própria, sinopse e lista de voos com capa, duração e selos "Disponível" e "Interativo".
- **Voos** (os capítulos) com capa de cinema, fases (tópicos) nos três níveis de leitura sempre visíveis, interativos dentro das fases, o botão **TESTE O CONHECIMENTO** no final e os próximos voos.
- **Capa própria para cada um dos 50 voos**, arte para cada missão e para a missão especial: imagens cinematográficas fotorrealistas geradas por IA, sem texto nem marcas.

## Interativos

| Interativo | Onde aparece |
| --- | --- |
| Curva do oxigênio e cascata do O₂ por altitude | Fisiologia › Ep 3, Hipóxia |
| Tipos de hipóxia (atividade com casos) | Fisiologia › Ep 3 |
| Tempo de consciência útil (gráfico, com descompressão rápida) | Fisiologia › Ep 3 |
| Visão sob hipóxia, com os estágios clássicos | Fisiologia › Ep 3 |
| Expansão dos gases com a altitude (Lei de Boyle) | Fisiologia › Ep 1 e Ep 5 |
| Forças G, com e sem proteção | Fisiologia › Ep 6 |
| Adaptação ao escuro | Fisiologia › Ep 9 |
| Ruído e tempo máximo de exposição (NR-15) | Fisiologia › Ep 10 e Operação › Ep 6 |
| Radiação cósmica por ano de voo | Fisiologia › Ep 12 |
| Regra do 1% | Clínica › Ep 1 |
| Perda óssea no espaço | Espaço › Ep 2 |

Todos ficam também no **Laboratório aeroespacial**. Os componentes estão em `src/components/midia/`; para pôr um interativo num voo, use o campo `laboratorio` do capítulo ou `midias` do tópico em `src/data/`.

## O que já tem texto

O voo de Hipóxia está completo e serve de modelo. Os outros 49 voos mostram capa, fases e interativos, com a marcação "Em produção" até receberem texto. A missão especial O Voo e a Medicina tem os 20 eventos e um teste por era.

## Rodar o projeto

```bash
npm install
npx expo start
```

Abra no Expo Go (Android ou iOS) lendo o QR code, ou pressione `w` para abrir no navegador.

```bash
npm run typecheck   # verificação de tipos
npm run export:web  # versão web estática em dist/
```

## Onde fica cada coisa

| Caminho | Conteúdo |
| --- | --- |
| `src/app/` | Telas e rotas (Expo Router) |
| `src/app/(tabs)/` | Home e as 4 missões do rodapé |
| `src/components/moldura-app.tsx` | Cabeçalho e rodapé fixos em todas as telas |
| `src/app/notificacoes.tsx` · `src/data/notificacoes.ts` | Notificações (novidades do app); aumente `VERSAO_NOTIFICACOES` ao incluir uma |
| `src/app/perfil.tsx` | Perfil: conta, nível, progresso e entrar ou sair |
| `src/app/capitulo/[secao]/[numero].tsx` | Tela do voo (capítulo) |
| `src/app/teste.tsx` | Testes de voo, de era, modo quiz e modo prova |
| `src/app/laboratorio.tsx` | Laboratório com todos os interativos |
| `src/components/streaming.tsx` | Fileiras, capas dos voos e destaques rotativos |
| `src/components/abertura.tsx` | Abertura animada |
| `src/components/midia/` | Simuladores, gráficos e atividades |
| `src/lib/fisiologia.ts` | Cálculos de fisiologia usados nos interativos |
| `src/data/secoes.ts` | Estrutura: 4 missões, 50 voos e tópicos |
| `src/data/capitulos/` | Voos já redigidos (um arquivo por voo) |
| `src/data/historia.ts` | Missão especial O Voo e a Medicina |
| `src/constants/capas.ts` | Índice das capas dos voos e artes das missões |
| `src/constants/theme.ts` | Cores, fonte e tamanhos |
| `assets/images/capas/` | Capas dos voos e artes das missões |
| `assets/images/logo-app.webp` | Logotipo usado dentro do app |
| `tools/cenas/` | Geradores das capas, do fundo estelar e das cenas |
| `tools/fonte/` | Correção do circunflexo da fonte |
| `docs/estrutura-completa.md` | Estrutura editorial completa e regras do projeto |

## Entrada no app

Depois da abertura, quem ainda não escolheu como entrar vê a tela de entrada (`src/components/entrar.tsx`): **Continuar com Google**, **Continuar com a Apple** (iPhone e web) e **Entrar com biometria** (Face ID, Touch ID ou digital, no app instalado), além de **Continuar sem conta**. A escolha fica salva no aparelho (`src/state/conta.tsx`); quem entrou sem conta tem o botão **Entrar na conta** no Perfil.

O login com Google e Apple ainda depende das credenciais das contas de desenvolvedor (Google Cloud e Apple Developer) e de um serviço de contas, como o Supabase. Os símbolos do Google e da Apple nos botões vêm do projeto Devicon (licença MIT), em `src/components/marcas.tsx`; as marcas pertencem às respectivas empresas e serão trocadas pelos botões oficiais quando o login real for ligado. Por enquanto, `ENTRADA_LIVRE` (em `src/components/entrar.tsx`) está ligado: qualquer opção libera a entrada direto, sem verificar a conta. Quem entra sem conta volta a ver as formas de login a cada abertura do app. A App Store exige o login com a Apple sempre que o app oferece login com Google.

## Regras de design

- Fonte única: **Acme** (Google Fonts), em uma versão corrigida. A Acme original desenha o acento circunflexo (â, ê, ô) de cabeça para baixo; `tools/fonte/corrigir_circunflexo.py` corrige o acento e gera `assets/fonts/AppBookDisplay-Regular.ttf`. Pela licença SIL OFL, o nome "Acme" é reservado, então a versão corrigida se chama "AppBook Display". A família só tem o peso 400.
- Tamanhos permitidos: 18, 14, 12, 10 e 9px. O 9px é usado **somente no rodapé e nos selos (Interativo, Disponível, tipo de mídia), sempre em maiúsculas**.
- Cabeçalho e rodapé sempre fixos na tela: logotipo à esquerda com PAPOS DE ALTITUDE e, abaixo, MEDICINA AEROESPACIAL; à direita, **Notificações** (sino, com ponto dourado quando há novidade) e **Perfil**; no rodapé, as 5 abas.
- Tema escuro sideral. O destaque padrão é o azul "holograma"; a variação vermelha "sabre" está pronta em `src/constants/theme.ts`.

## Como adicionar um voo

1. Crie `src/data/capitulos/<nome>.ts` seguindo o modelo de `hipoxia.ts`: cada tópico com `essencial`, `explicacao`, `clinico` e `pontosChave`, os `midias` que fizerem sentido, e o `teste` com uma questão por tópico, indicando o `topico` de origem.
2. Em `src/data/secoes.ts`, troque a linha `cap(...)` do capítulo pelo objeto importado.

O voo passa a aparecer como "Disponível", e o teste entra no Modo quiz e no Modo prova.

## Imagens

As capas, artes e cenas são imagens fotorrealistas de cinema geradas por IA, com pessoas fictícias e sem texto, logotipos ou marcas. Ficam em `assets/images/capas/` (voos `fis-01`…`esp-08`, `temporada-*` e `especial-voo`) e `assets/images/cenas/` (fundo, abertura, laboratório, quiz, prova e curiosidades), em JPG de até 1600 px de largura. Para trocar uma imagem, substitua o arquivo mantendo o mesmo nome. Os geradores antigos de `tools/cenas/` não são mais usados.

## Obras de referência

Ernsting's Aviation and Space Medicine (5ª ed.), Fundamentals of Aerospace Medicine (5ª ed.), Handbook of Aviation and Space Medicine, Fisiologia Aeroespacial (Russomano et al.) e A Gravidade, Esta Grande Escultora (Vernikos & Russomano), além das normas da ICAO, EASA, FAA e ANAC.
