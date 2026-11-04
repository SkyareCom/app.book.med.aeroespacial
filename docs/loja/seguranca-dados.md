# Respostas para a Google Play (Play Console → Política do app)

Baseadas no que o app faz hoje (ver o cabeçalho de src/data/legal.ts). Atualize junto com a Política de Privacidade
quando ligar a conta com compra.

## Segurança dos dados

| Pergunta | Resposta |
|---|---|
| O app coleta ou compartilha algum dos tipos de dados exigidos? | **Sim** (só o arquivo de exame, quando a pessoa escolhe enviar) |
| Todos os dados são criptografados em trânsito? | **Sim** (HTTPS) |
| O usuário pode pedir a exclusão dos dados? | **Sim**: Perfil → Apagar meus dados; página pública /excluir-dados |
| Saúde e condicionamento físico → Informações de saúde | **Coletado**, não compartilhado; processamento temporário (não armazenado); opcional; finalidade: funcionalidade do app (leitura do exame no Exame CMA) |
| Localização, contatos, mensagens, fotos da galeria, áudio, identificadores, histórico de navegação, dados financeiros | **Não coletados** |
| Atividade no app, diagnósticos, IDs de publicidade | **Não coletados** (não há análise de uso nem anúncios) |

Observação: o arquivo do exame passa pelo servidor do app (Supabase) e pela API da Anthropic só para ser lido. Pela
definição da Google, dados processados de forma temporária, sem armazenamento, podem ser marcados como "processados
temporariamente". Quando a conta com compra entrar: **E-mail** (coletado, funcionalidade do app e gerenciamento de
conta) e **Histórico de compras** (coletado, funcionalidade do app).

## Apps de saúde

- Categoria: **Educação médica / referência** (não é dispositivo médico, não faz diagnóstico).
- O app mostra o Aviso médico na entrada e em /aviso-medico.

## Classificação de conteúdo

Questionário IARC: sem violência, sexo, linguagem imprópria, drogas recreativas, jogos de azar ou interação entre
usuários. Menciona remédios no contexto educativo de medicina. Resultado esperado: Livre / PEGI 3 [confirmar na referência].

## Público-alvo

18+ (o app não é dirigido a crianças).

## Anúncios

O app **não contém anúncios**.

## URLs exigidas

- Política de Privacidade: https://skyarecom.github.io/app.book.med.aeroespacial/privacidade
- Exclusão de dados: https://skyarecom.github.io/app.book.med.aeroespacial/excluir-dados
