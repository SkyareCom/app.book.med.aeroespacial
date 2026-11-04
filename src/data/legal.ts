// Páginas legais do app: Política de Privacidade, Termos de Uso, Aviso médico e Exclusão de dados.
// Ficam também no site publicado (exigência da Google Play: URL pública da política e da exclusão de dados).
// O texto descreve só o que o app faz hoje (verificado no código em 4/11/2026):
// - progresso, idioma, forma de entrada e avisos lidos ficam no aparelho (AsyncStorage);
// - a biometria é verificada pelo sistema do aparelho (expo-local-authentication); o app só recebe "confirmado" ou não;
// - no Exame CMA, o arquivo escolhido vai para a função analisar-exame (Supabase, São Paulo), que pede a leitura à
//   API da Anthropic e não grava o arquivo (supabase/functions/analisar-exame/index.ts);
// - a tradução automática envia só textos do próprio app para a função traduzir;
// - não há anúncios, rastreamento nem ferramentas de análise de uso (package.json).
// Ao ligar login real, pagamento ou qualquer coleta nova, atualize este arquivo e EDITORA.atualizadoEm.
// Base legal citada: Lei 13.709/2018 (LGPD), art. 18 (direitos do titular); Lei 8.078/1990 (CDC), art. 49 (direito
// de arrependimento em compras fora do estabelecimento). Revisão jurídica: [confirmar na referência].

export interface SecaoLegal {
  titulo: string;
  paragrafos: string[];
}

export interface PaginaLegal {
  id: 'privacidade' | 'termos' | 'aviso-medico' | 'excluir-dados';
  titulo: string;
  rotulo: string;
  secoes: SecaoLegal[];
}

export const privacidade: PaginaLegal = {
  id: 'privacidade',
  titulo: 'Política de Privacidade',
  rotulo: 'Como o app trata os seus dados',
  secoes: [
    {
      titulo: 'Resumo',
      paragrafos: [
        'O Papos de Altitude é um app-book educativo de medicina aeroespacial. Ele não mostra anúncios, não rastreia você entre apps e sites e não vende dados.',
        'Quase tudo o que o app guarda fica no seu próprio aparelho. O único dado pessoal que sai do aparelho é o arquivo de exame que você escolher enviar para leitura no Exame CMA.',
      ],
    },
    {
      titulo: 'O que fica no seu aparelho',
      paragrafos: [
        'Seu progresso nos voos, notas dos testes, pontos de conhecimento, idioma escolhido, a forma como você entrou no app e os avisos já lidos ficam salvos só no aparelho ou no navegador que você usa.',
        'Esses dados não são enviados para nenhum servidor. Se você apagar os dados do app, desinstalar o app ou limpar os dados do navegador, eles somem.',
      ],
    },
    {
      titulo: 'Biometria',
      paragrafos: [
        'Quando você entra com Face ID, Touch ID ou digital, a verificação é feita pelo sistema do próprio aparelho. O app recebe apenas a resposta de que a identidade foi confirmada ou não, nunca a sua digital ou o seu rosto.',
      ],
    },
    {
      titulo: 'Exames enviados no Exame CMA',
      paragrafos: [
        'Se você escolher enviar um PDF ou uma foto de exame para o app ler, o arquivo vai pela internet, com criptografia, para o servidor do app (Supabase, região de São Paulo), que pede a leitura ao serviço de inteligência artificial da Anthropic.',
        'O app não grava o arquivo: ele existe só durante a leitura, e os valores encontrados voltam para o seu aparelho. O tratamento pela Anthropic segue a política de privacidade dela.',
        'Exames são dados de saúde, considerados dados sensíveis pela LGPD. Por isso, o envio só acontece quando você mesmo escolhe o arquivo e confirma. Você pode usar o Exame CMA digitando os valores à mão, sem enviar nada.',
      ],
    },
    {
      titulo: 'Tradução do conteúdo',
      paragrafos: [
        'Quando um texto do app ainda não tem tradução pronta para inglês ou espanhol, ele pode ser traduzido pelo servidor do app. Só textos do próprio app são enviados, nunca dados seus.',
      ],
    },
    {
      titulo: 'Hospedagem do site',
      paragrafos: [
        'A versão para navegador é hospedada no GitHub Pages. Como qualquer site, o provedor de hospedagem pode registrar dados técnicos de acesso, como o endereço IP, conforme a política de privacidade dele.',
      ],
    },
    {
      titulo: 'Compras e conta',
      paragrafos: [
        'Quando a compra do conteúdo completo for ligada, o pagamento será feito pela Google Play no Android ou pela plataforma de pagamento indicada no link de compra. O app não recebe nem guarda dados do seu cartão.',
        'Para liberar a compra em mais de um aparelho, o app vai guardar o e-mail da sua conta e a situação do seu acesso. Esta política será atualizada antes disso.',
      ],
    },
    {
      titulo: 'Seus direitos',
      paragrafos: [
        'Pela LGPD, você pode pedir a confirmação e o acesso aos seus dados, a correção, a eliminação e informações sobre com quem eles são compartilhados. Como os dados do app ficam no seu aparelho, você mesmo pode apagá-los em Perfil → Apagar meus dados.',
        'Para qualquer pedido ou dúvida sobre privacidade, escreva para {0}.',
      ],
    },
    {
      titulo: 'Crianças',
      paragrafos: ['O app é destinado a adultos interessados em medicina aeroespacial e não é dirigido a crianças.'],
    },
    {
      titulo: 'Mudanças nesta política',
      paragrafos: ['Quando esta política mudar, a data de atualização no topo da página muda junto, e o app avisa nas notificações.'],
    },
  ],
};

export const termos: PaginaLegal = {
  id: 'termos',
  titulo: 'Termos de Uso',
  rotulo: 'Regras para usar o app',
  secoes: [
    {
      titulo: 'O que é o app',
      paragrafos: [
        'O Papos de Altitude é um app-book educativo sobre como o corpo humano reage à altitude, à aviação e ao espaço. Ao usar o app, você concorda com estes termos, com a Política de Privacidade e com o Aviso médico.',
      ],
    },
    {
      titulo: 'Uso educativo',
      paragrafos: [
        'Todo o conteúdo, os simuladores, as calculadoras, o Exame CMA e a Liberação para voo servem para estudo e orientação geral. Eles não são diagnóstico, prescrição, laudo nem certificado médico aeronáutico (veja o Aviso médico).',
      ],
    },
    {
      titulo: 'Direitos sobre o conteúdo',
      paragrafos: [
        'Textos, gráficos, animações, fotos, vídeos e testes do app são protegidos por direitos autorais. O acesso é pessoal e intransferível: não é permitido copiar, revender, redistribuir ou publicar o conteúdo sem autorização.',
        'As obras e normas citadas pertencem aos seus autores e órgãos e estão listadas na página Referências.',
      ],
    },
    {
      titulo: 'Compras',
      paragrafos: [
        'Parte do conteúdo pode ser liberada só depois da compra. No Android, a compra dentro do app é feita pela Google Play e segue as regras de pagamento e reembolso da Google. Pelo link de compra, ela segue as regras da plataforma de pagamento indicada e o Código de Defesa do Consumidor, inclusive o direito de arrependimento.',
        'O acesso comprado vale para a conta usada na compra, nos aparelhos em que você entrar com ela.',
      ],
    },
    {
      titulo: 'Atualizações',
      paragrafos: [
        'O conteúdo é revisado e ampliado com frequência. Voos novos, correções e mudanças de normas podem alterar textos, tabelas e testes.',
      ],
    },
    {
      titulo: 'Limites de responsabilidade',
      paragrafos: [
        'O app é oferecido como material de estudo. Decisões sobre voar, tratar uma doença ou tomar um remédio devem ser tomadas com o seu médico e, no caso de tripulantes, com o médico examinador credenciado pela autoridade de aviação.',
      ],
    },
    {
      titulo: 'Contato',
      paragrafos: ['Dúvidas sobre estes termos: {0}.'],
    },
  ],
};

export const avisoMedico: PaginaLegal = {
  id: 'aviso-medico',
  titulo: 'Aviso médico',
  rotulo: 'Leia antes de usar',
  secoes: [
    {
      titulo: 'O app não substitui o médico',
      paragrafos: [
        'O Papos de Altitude é educativo. Ele não diagnostica, não trata, não prescreve e não emite certificado médico aeronáutico.',
        'A Liberação para voo e o Exame CMA mostram o que as normas e as obras de referência dizem, para você chegar mais preparado à consulta. A decisão final é sempre do seu médico e, para tripulantes, do médico examinador credenciado pela autoridade de aviação (ANAC, FAA ou a do seu país).',
      ],
    },
    {
      titulo: 'Em caso de sintoma',
      paragrafos: [
        'Se você sentir falta de ar, dor no peito, confusão, desmaio, dor forte ou qualquer sintoma grave, em voo ou em terra, procure atendimento médico imediatamente. Em voo, avise a tripulação.',
      ],
    },
    {
      titulo: 'Remédios',
      paragrafos: [
        'Não comece, pare nem mude a dose de um remédio por causa do app. Os prazos e cuidados citados são gerais e podem não valer para o seu caso.',
      ],
    },
    {
      titulo: 'Normas',
      paragrafos: [
        'As normas de aviação mudam. O app indica a fonte de cada regra na página Referências, e a versão oficial em vigor sempre prevalece.',
      ],
    },
  ],
};

export const excluirDados: PaginaLegal = {
  id: 'excluir-dados',
  titulo: 'Excluir meus dados',
  rotulo: 'Como apagar tudo o que o app guarda',
  secoes: [
    {
      titulo: 'No app',
      paragrafos: [
        'Abra Perfil e toque em Apagar meus dados. O app apaga do aparelho o progresso, as notas, os pontos, o idioma, a forma de entrada e os avisos lidos, e volta para a tela inicial.',
        'Desinstalar o app ou limpar os dados do navegador também apaga tudo.',
      ],
    },
    {
      titulo: 'No servidor',
      paragrafos: [
        'Hoje o app não guarda dados seus em servidor: os exames enviados para leitura não são gravados.',
        'Quando a conta com compra for ligada, a exclusão da conta e do e-mail poderá ser feita no próprio app ou pedida para {0}, com resposta em até 15 dias. O registro da compra pode ser mantido pelo prazo exigido pela lei fiscal.',
      ],
    },
  ],
};

export const PAGINAS_LEGAIS = [privacidade, termos, avisoMedico, excluirDados];
