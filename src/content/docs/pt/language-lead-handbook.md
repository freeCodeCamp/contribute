---
title: O manual oficial para os líderes de cada idioma do freeCodeCamp
---

Este manual o ajudará a configurar e utilizar as ferramentas para seus esforços de localização.

## Como convidar novos colaboradores para o Ghost

O Ghost permite que você defina colaboradores com diferentes níveis de autorização.

A maioria de seus convites será para o nível "Contributor" (Colaborador). Esse nível permite que o usuário crie rascunhos. Selecione esta função ao convidar um novo tradutor.

O nível "Author" (Autor) permite ao usuário criar rascunhos e publicá-los.

O nível "Editor" permite ao usuário acessar todos os rascunhos e publicá-los. Selecione esta função ao convidar um novo revisor.

O nível "Administrator" (Administrador) é reservado para funcionários e líderes de idiomas do freeCodeCamp.

### Como são feitos os artigos

Usamos uma abordagem baseada em [JAMStack](https://www.google.com/search?q=what+is+jamstack) para criar e implementar os artigos. Esta estratégia faz com que um site estático seja armazenado em cache e servido a partir de uma CDN rapidamente.

O [Ghost](https://ghost.org) atua como nossa plataforma de gerenciamento de conteúdo. O [11ty](https://11ty.dev) compila os artigos na forma de recursos estáticos – HTML, JavaScript e CSS. Apenas esses recursos estáticos são implantados em nossos servidores.

Esse processo é automatizado e executado periodicamente. Se você publicar algo agora, estará disponível no site de notícias dentro de algumas horas.

Você pode encontrar as agendas de compilação e o status atualizado aqui: https://github.com/freeCodeCamp/news#build

## Como mencionar o autor original de um artigo traduzido

O autor original e o artigo original são vinculados automaticamente, adicionando este código à seção de cabeçalho Code Injection -> em Draft Setiings (Configurações de rascunho) no Ghost.

```html
<script>
  const fccOriginalPost = 'link';
</script>
```

Sendo `link` o link do artigo original.

## Como atualizar os artigos em destaque

:::tip
Alterar os artigos no rodapé pelo menos uma vez por mês significa dar um impulso aos artigos vinculados nos resultados do Google.
:::

Para atualizar os artigos de tendência no rodapé, você precisa atualizar o [arquivo yaml no repositório CDN](https://github.com/freeCodeCamp/cdn/tree/main/build/universal/trending) para o seu idioma. Tanto o currículo como o editorial fazem referência a esse arquivo.

Por exemplo, aqui está o conteúdo do arquivo para os primeiros 6 artigos:

```yaml
article0
title:  'Nova aba em HTML'
article0link: 'https://www.freecodecamp.org/portuguese/news/como-usar-o-html-para-abrir-um-link-em-uma-nova-aba/'
article1
title: 'Máscaras de sub-rede'
article1link: 'https://www.freecodecamp.org/portuguese/news/ficha-informativa-de-sub-redes-mascara-de-sub-rede-24-30-26-27-29/'
article2
title:  '40 projetos em JavaScript'
article2link: 'https://www.freecodecamp.org/portuguese/news/40-projetos-em-javascript-para-iniciantes-ideias-simples-para-comecar-a-programar-em-js/'
article3
title:  'Tutorial de button onClick'
article3link: 'https://www.freecodecamp.org/portuguese/news/tutorial-sobre-button-onclick-em-html-e-evento-de-clique-em-javascript/'
article4
title:  'Bot do Discord'
article4link: 'https://www.freecodecamp.org/portuguese/news/tutorial-de-criacao-de-bot-para-o-discord-em-python/'
article5
title:  'Centralizar em CSS'
article5link: 'https://www.freecodecamp.org/portuguese/news/como-centralizar-tudo-com-css/'
```

Cada número representa um dos 30 artigos do rodapé. Veriifique se a correspondência entre o título e o link está correta.

Para cada artigo, você precisará criar um título menor para usar no rodapé. Cada título deve permanecer em uma única linha e não deve ir para uma nova linha.

Você vai querer [fazer a build do client traduzido localmente](how-to-enable-new-languages) para ver se os títulos têm o comprimento correto. Você pode visualizar as alterações editando o arquivo `trending.json` em seu ambiente local:

1. Atualize o arquivo `.env` para usar seu idioma em `CLIENT_LOCALE` e `CURRICULUM_LOCALE`.

2. Execute `pnpm run create:shared`. Isso gerará automaticamente o arquivo `trending.json` para o seu idioma no diretório `/client/i18n/locales/`.

3. Inicie o servidor executando `pnpm run develop:server` em uma janela do terminal.

4. Edite o arquivo `trending.json` para que contenha os títulos que você deseja visualizar. Você pode querer converter o seu arquivo `.yaml` em formato JSON com uma ferramenta automática.

5. Em outra janela do terminal, execute `pnpm run clean:client` e, em seguida, `pnpm run develop: client`

## Como traduzir os artigos dos links de rodapé

Existem alguns links listados no final do rodapé (Sobre, Rede de ex-alunos, Código aberto etc.) e alguns deles podem ser traduzidos para seu idioma do mesmo modo que os outros artigos.

Artigos que podem ser traduzidos:

- Sobre
- Suporte
- Honestidade acadêmica
- Código de conduta

Os seguintes artigos **não** devem ser traduzidos:

- Loja
- Patrocinadores
- Política de privacidade
- Termos de serviço
- Política de direitos autorais

Os links a seguir estão apontando para sites externos e não podem ser traduzidos:

- Rede de ex-alunos
- Código aberto

### Alterações nos links de rodapé do editorial

Depois de ter traduzido e publicado os artigos listados como "podem ser traduzidos" acima, você poderá atualizar os links no rodapé de `/news` editando o arquivo `news/config/i18n/locales/<your language>/links.json` no repositório [freeCodeCamp/news](https://github.com/freeCodeCamp/news).

> [!NOTE] As solicitações de pull request para este repositório estão atualmente limitadas apenas à equipe. Se quiser atualizar este arquivo, peça ajuda a alguém da equipe.

Atualize a seguinte parte do arquivo:

```json
{
  ...
  "footer": {
    "about": "https://www.freecodecamp.org/news/about/",
    "support": "https://www.freecodecamp.org/news/support/",
    "honesty": "https://www.freecodecamp.org/news/academic-honesty-policy/",
    "coc": "https://www.freecodecamp.org/news/code-of-conduct/"
  }
}
```

### Alterações nos links de rodapé do curr[iculo

Depois de ter traduzido e publicado os artigos listados como "podem ser traduzidos" acima e quando o curr[iculo em seu idioma estiver pronto para o lançamento, você poderá atualizar os links no rodapé de `/learn` editando o arquivo `news/config/i18n/locales/<your language>/links.json` no repositório [freeCodeCamp/freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp).

> [!WARNING] Apenas "Sobre", "Suporte", "Honestidade acadêmica" e "Código de conduta" podem ser traduzidos. Deixar os outros URLs inalterados.

Atualize a seguinte parte do arquivo:

```json
{
  ...
  "footer": {
    "about-url": "https://www.freecodecamp.org/news/about/",
    "shop-url": "https://www.freecodecamp.org/shop/",
    "support-url": "https://www.freecodecamp.org/news/support/",
    "sponsors-url": "https://www.freecodecamp.org/news/sponsors/",
    "honesty-url": "https://www.freecodecamp.org/news/academic-honesty-policy/",
    "coc-url": "https://www.freecodecamp.org/news/code-of-conduct/",
    "privacy-url": "https://www.freecodecamp.org/news/privacy-policy/",
    "tos-url": "https://www.freecodecamp.org/news/terms-of-service/",
    "copyright-url": "https://www.freecodecamp.org/news/copyright-policy/"
  },
  ...
}
```

## Como traduzir os cabeçalhos das caixas informativas na documentação

Você pode encontrar essas caixas por toda a documentação:

> [!NOTE] Eu sou uma caixa de notificação

:::tip
Eu sou uma caixa de dica
:::

> [!WARNING] Eu sou uma caixa de advertência

:::danger
Eu sou uma caixa de atenção
:::

Por padrão, os cabeçalhos deles aparecem em inglês, mesmo na documentação traduzida.

É possível traduzir os cabeçalhos para a documentação para o seu idioma alterando o arquivo `docs/index.html`, desta forma:

Dentro do elemento `script` existe um objeto. Nele, você encontra a propriedade `flexibleAlerts`, que tem esta forma:

```js
flexibleAlerts: {
  note: {
    label: {
      '/': 'Note'
    }
  },
  tip: {
    label: {
      '/': 'Tip'
    }
  },
  warning: {
    label: {
      '/': 'Warning'
    }
  },
  attention: {
    label: {
      '/': 'Attention'
    }
  }
}
```

Dentro do objeto da propriedade label, antes da propriedade `'/'`, você adiciona uma nova propriedade para o seu idioma, assim: `/i18n/<language>/`.

Por exemplo, ao adicionar as traduções para o português, você terá algo assim:

```js
flexibleAlerts: {
  note: {
    label: {
      '/i18n/portuguese/': 'Observação',
      '/': 'Note'
    }
  },
  tip: {
    label: {
      '/i18n/portuguese/': 'Dica',
      '/': 'Tip'
    }
  },
  warning: {
    label: {
      '/i18n/portuguese/': 'Aviso',
      '/': 'Warning'
    }
  },
  attention: {
    label: {
      '/i18n/portuguese/': 'Atenção',
      '/': 'Attention'
    }
  }
}
```

## Como traduzir as citações motivacionais

As citações motivacionais podem ser encontradas no [repositório de currículos](https://github.com/freeCodeCamp/freeCodeCamp/), no arquivo `/client/i18n/locales/<language>/motivation.json`.

Esse arquivo tem a seguinte estrutura geral:

```json
{
  "compliments": [],
  "motivationalQuotes": []
}
```

Os elogios são as frases curtas que aparecem na conclusão de um desafio.

Você não precisa traduzir diretamente as frases usadas em inglês. Você pode escrever um conjunto de frases curtas que sejam apropriadas para mostrar na conclusão de um desafio.

O array `compliments` é um array de strings. Então, por exemplo, você escreveria:

```json
{
  "compliments": ["Top de linha!", "Agora não para mais!"],
  "motivationalQuotes": []
}
```

:::tip
Você deve começar com pelo menos uma dúzia de elogios para ter alguma variedade quando os usuários completarem os desafios.
:::

As citações motivacionais são as citações que aparecem em https://freecodecamp.org/learn.

O array `motivationalQuotes` é um array de objetos. Esses objetos devem incluir uma propriedade `quote` e uma propriedade`author`. assim:

```json
{
  "compliments": [],
  "motivationalQuotes": [
    {
      "quote": "Seja lá o que você fizer, seja bom nisso.",
      "author": "Abraham Lincoln"
    },
    {
      "quote": "Uma mudança de perspectiva já faz subir 80 pontos de QI.",
      "author": "Alan Kay"
    }
  ]
}
```

:::tip
Você deve começar com pelo menos uma dúzia de citações para ter alguma variedade. Uma nova citação é mostrada toda vez que o usuário recarrega a página.
:::

## Como atualizar os links comuns

Mantemos um arquivo de links comuns usados por todo o nosso [site do currículo](https://github.com/freecodecamp/freecodecamp) no arquivo `/client/i18n/locales/<language>/links.json`.

Alguns desses links não mudarão - mas você deve atualizar os links dos artigos `/news` para que apontem para a versão traduzida do seu idioma quando ele é publicado.

Você também deve atualizar as categorias de `help` para que apontem para o sub-fórum do seu idioma (geralmente `language/category`, como, por exemplo, `portuguese/HTML-CSS`). Isto permitirá que os campers criem "posts de ajuda" no local correto do fórum.

## Como atualizar os metadados do site

Os metadados do site estão no arquivo `/client/i18n/locales/<language>/meta-tags.json`. Este arquivo tem cinco chaves: `title`, `description`, `social-description`, `keywords` e `youre-unsubscribed`.

O valor de `youre-unsubscribed` deve ser traduzido diretamente. Os outros valores precisarão ser traduzidos o mais próximo possível, considerando também termos e frases de busca comuns usados em seu idioma.

Se você precisar de ajuda com isso, entre em contato conosco no [chat dos colaboradores](https://discord.gg/PRyKn3Vbay)

## Fluxo de trabalho de pré-tradução no Crowdin

O fluxo de trabalho de pré-tradução pode ser usado para aplicar traduções da memória de tradução às frases.

:::tip
É bastante útil restaurar muitas traduções da memória de tradução ao mesmo tempo quando muitos arquivos foram atualizados.
:::

Você pode encontrar o fluxo de trabalho de pré-tradução no topo da página no console de um projeto. Se você ver "Go to console", no canto superior direito, clique lá primeiro.

![botão go to console](../images/crowdin/pre-translate2.png)

![fluxo de trabalho de pré-tradução](../images/crowdin/pre-translate1.png)

Você pode escolher "From Machine Translation" (da tradução de máquina) ou "From Translation Memory" (da memória de tradução). Selecione "Translation Memory" para recuperar as traduções da memória.

Depois, há três etapas a concluir:

1. Arquivos. Escolha quais arquivos traduzir. Você pode fazer todos os projetos ou pastas e arquivos específicos.
2. Idiomas. Defina o seu idioma aqui.
3. Traduções existentes. A melhor combinação aqui é "100% match" (100% correspondente) e "Apply to untranslated strings only" (aplicar apenas a frases não traduzidas). Não aprove automaticamente, já que é sempre melhor que um olho humano revise tudo.

![pré-traduzir as traduções existentes](../images/crowdin/pre-translate3.png)

Quando você tiver terminado de fazer essa configuração, pressione o botão Pre-Translate e aguarde. Ele alertará você quando terminar. O tempo que leva depende de quantas frases não traduzidas existem nos arquivos escolhidos.

## Como atualizar o glossário do Crowdin

:::tip
Um glossário atualizado ajuda a ter uma tradução dos termos técnicos mais homogênea.
:::

O glossário do Crowdin é mantido no repositório [crowdin-glossaries](https://github.com/freeCodeCamp/crowdin-glossaries).

Na pasta `glossaries` há vários arquivos `*.csv` (valores separados por vírgulas, um para cada um dos projetos no Crowdin que têm um glossário que pode ser atualizado a partir deste fluxo de trabalho.

O arquivo `client.csv` é para o projeto "Learn User Interface" (Interface de aprendizagem do usuário), `curriculum.csv` é para o projeto "Coding Curriculum" (Currículo de programação) e o arquivo `docs.csv` é para o projeto "Contributing Documentation" (Documentação colaborativa).

Para atualizar os glossários do Crowdin você precisa clonar este repositório localmente. Abra o arquivo `.csv` com um programa apropriado - por exemplo, o Microsoft Excel.

No arquivo `.csv`, que você verá que a língua inglesa ocupa as primeiras três colunas, `Term:English` é a coluna para o termo em inglês, `Description:English` é a coluna para a descrição em inglês e `Part:English` é para a classe gramatical (por exemplo, substantivo, verbo etc.) do termo.

Depois delas, cada idioma-alvo tem duas colunas. Se você traduzir para o Dothraki, estará interessado nas colunas `Term:Dothraki` e `Description:Dothraki`. A coluna `Term:Dothraki` é para a tradução do termo em Dothraki, enquanto a coluna `Description:Dothraki` é para uma descrição do termo em Dothraki.

:::tip
Em programas como o Microsoft Excel, você pode ocultar as colunas dos outros idiomas para liberar espaço em tela e ver as colunas em inglês e as colunas do idioma de destino ao lado umas das outras.
:::

Após ter feito as alterações e salvo o arquivo, você precisará fazer um PR com as alterações propostas. Depois de o PR ter sido aceito, você precisará executar o fluxo de trabalho do GitHub Action para atualizar o glossário do Crowdin. Suas alterações no glossário não terão efeitos imediatos, mas aparecerão em breve.

## Como promover um colaborador a revisor

Se você considerar que um colaborador pode se tornar um revisor de Crowdin, você pode dar a ele a função de revisor deste modo:

No Crowdin, você individualiza `User management` (gerenciamento do usuário) no menu do lado esquerdo.

Isto abrirá as ferramentas de gerenciamento de usuário, você será capaz de ver a lista de todos os usuários.

Procure pelo usuário que se tornará um revisor. Use o menu de três pontos na linha do usuário para abrir um menu e selecione "Add to team" (Adicionar à equipe). As equipes de revisão têm o nome padrão de `Proof Readers (<language>)`. Você pode pesquisar a equipe usando o nome do idioma. Depois de selecionar a equipe, use o botão "ADD" na parte inferior da página para finalizar.

O usuário agora é um revisor.

:::tip
O revisor recém-promovido pode se beneficiar de ler a documentação em [How to Proofread Files](how-to-proofread-files).
:::

## Como adicionar ou atualizar um idioma

Confira a documentação sobre [como ativar um novo idioma](how-to-enable-new-languages). Se você estiver atualizando um idioma, a seção sobre a [configuração dos superblocos traduzidos](how-to-enable-new-languages#set-translated-superblocks) deve ser útil.
