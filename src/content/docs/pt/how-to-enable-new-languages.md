---
title: Implantar novos idiomas no `/learn`
---

Para habilitar um novo idioma em `/learn` (currículo), você precisa completar os seguintes passos:

- Traduzir e aprove por completo as três primeiras certificações no Crowdin. (Design responsivo para a web novo, Algoritmos e estruturas de dados em JavaScript e Bibliotecas de desenvolvimento de front-end)
- Complete a tradução e aprove todas as frases no projeto LearnUI (interface do usuário) no Crowdin.
- Atualize as configurações do Crowdin para adicionar um código de idioma personalizado para o novo idioma.
- Abra o primeiro PR para configurar o GitHub Actions. Você precisa atualizar 2 arquivos:
  - `crowdin-download.client-ui.yml`
  - `crowdin-download.curriculum.yml`
- Abra o 2nd PR para adicionar outras configurações. Você precisa atualizar/adicionar os seguintes arquivos:
  - Atualize `i18n.ts`
  - Atualize `superblocks.ts`
  - Atualize `algolia-locale-setup.ts`
  - Adicione `links.json`
  - Adicione `meta-tags.json`
  - Adicione `motivation.json`
- Peça à equipe da infraestrutura para colocar a VM para funcionar para o novo idioma.
- Quando a VM estiver pronta, abra o terceiro PR para mostrar o novo idioma no menu de navegação.

Explicaremos cada passo nas seções seguintes.

## Atualizar as configurações do Crowdin

Antes de lançar um novo idioma, você precisará permitir que os idiomas sejam baixados do Crowdin. Para configurar isso, você precisa adicionar um código de idioma personalizado para seu idioma.

Nos projetos `Curriculum` e `Learn UI` no Crowdin, você precisará selecionar `Settings` > `Languages`, na barra lateral. Em seguida, desça até `Language Mapping`, onde você verá uma opção para adicionar códigos de idioma personalizados. Adicione uma nova entrada para o idioma que você está liberando, selecionando `language` como o valor de `Placeholder` e digitando um URL amigável em letras minúsculas do nome do seu idioma para o `Custom code`. Se você não tem certeza do que usar, ou se você não tem uma função de administrador e não pode ver as configurações entre em contato pelo nosso chat de colaboradores e nós o ajudaremos.

## Atualizando os fluxos de trabalho para o GitHub Actions

Em seguida, você precisa configurar a sincronização entre Crowdin e GitHub.

Você precisará adicionar um passo para o [`crowdin-download.client-ui.yml`](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/.github/workflows/crowdin-download.client-ui.yml) e para o [`crowdin-download.curriculum.yml`](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/.github/workflows/crowdin-download.curriculum.yml). O passo para ambos será o mesmo. Por exemplo, se você quiser habilitar os downloads de Dothraki:

```yml
##### Download Dothraki #####
- name: Crowdin Download Dothraki Translations
  uses: crowdin/github-action@master
  # options: https://github.com/crowdin/github-action/blob/master/action.yml
  with:
    # uploads
    upload_sources: false
    upload_translations: false
    auto_approve_imported: false
    import_eq_suggestions: false

    # downloads
    download_translations: true
    download_language: mis
    skip_untranslated_files: false
    export_only_approved: true

    push_translations: false

    # pull-request
    create_pull_request: false

    # global options
    config: './crowdin-config.yml'
    base_url: ${{ secrets.CROWDIN_BASE_URL_FCC }}

    # Uncomment below to debug
    # dryrun_action: true
```

Observe que a chave `download_language` precisa ser definida como código do idioma exibido no Crowdin.

## Habilitar um idioma

> [!NOTE] A seção acima com a atualização dos fluxos de trabalho deve ser concluída antes de prosseguir - isso precisa ser feito em etapas separadas. Caso contrário, as compilações falharão.

Existem algumas etapas a serem seguidas para permitir que a base de código seja compilada no idioma desejado.

Primeiro, visite o arquivo [`shared/config/i18n.ts`](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/shared/config/i18n.ts) para adicionar o idioma à lista de idiomas disponíveis e configurar os valores. Existem vários objetos aqui.

- `Languages`: adiciona o novo idioma no enum `Languages`, do mesmo modo que com os outros. O valor da string aqui será usado no arquivo `.env` para definir o idioma da build posteriormente.
- `availableLangs`: adiciona a nova propriedade do enum `Languages` aos dois arrays, `client` e `curriculum`.
- `i18nextCodes`: esses são os códigos ISO de cada linguagem. Você vai precisar do código ISO apropriado para o idioma que você está habilitando. Eles precisam ser únicos para cada idioma.
- `LangNames`: esses são os nomes dos idiomas que aparecerão para a seleção no menu de navegação.
- `LangCodes`: esses são os códigos de idiomas usados para formatar datas e números. Esses deverão ser códigos Unicode CLDR ao invés de códigos ISO.
- `hiddenLangs`: Esses idiomas não serão exibidos no menu de navegação. Isto é usado para idiomas que ainda não estão prontos para liberação. Inclua seu idioma nesse array no primeiro PR e peça à equipe para preparar a instância de VM para o seu idioma. Quando a VM estiver pronta, faça outro PR para removê-lo do array.
- `rtlLangs`: estes são os idiomas que leem da direita para a esquerda.

Como um exemplo, se você tivesse que habilitar o idioma Dothraki como seu idioma, os objetos `i18n.ts` devem ficar assim:

```js
export enum Languages {
  English = 'english',
  Espanol = 'espanol',
  Chinese = 'chinese',
  ChineseTraditional = 'chinese-traditional',
  Dothraki = 'dothraki'
}

export const availableLangs = {
  client: [
    Languages.English,
    Languages.Espanol,
    Languages.Chinese,
    Languages.ChineseTraditional,
    Languages.Dothraki
  ],
  curriculum: [
    Languages.English,
    Languages.Espanol,
    Languages.Chinese,
    Languages.ChineseTraditional,
    Languages.Dothraki
  ]
};

export const i18nextCodes = {
  [Languages.English]: 'en',
  [Languages.Espanol]: 'es',
  [Languages.Chinese]: 'zh',
  [Languages.ChineseTraditional]: 'zh-Hant',
  [Languages.Dothraki]: 'mis'
};

export enum LangNames = {
  [Languages.English]: 'English',
  [Languages.Espanol]: 'Español',
  [Languages.Chinese]: '中文（简体字）',
  [Languages.ChineseTraditional]: '中文（繁體字）',
  [Languages.Dothraki]: 'Dothraki'
};

export enum LangCodes = {
  [Languages.English]: 'en-US',
  [Languages.Espanol]: 'es-419',
  [Languages.Chinese]: 'zh',
  [Languages.ChineseTraditional]: 'zh-Hant',
  [Languages.Dothraki]: 'mis'
};

export const hiddenLangs = ['dothraki'];

export const rtlLangs = [''];
```

> [!NOTE] Quando um idioma for configurado no pipeline de implantação E tiver uma instância pública de `/learn` ativa, ele pode ser removido da matriz `hiddenLangs` e ser disponibilizado ao público.

### Configuração dos superblocos traduzidos

No arquivo [shared/config/superblocks.ts](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/shared/config/superblocks.ts), adicione o novo idioma ao objeto `notAuditedSuperBlocks`. Isso lista todos os superblocos que não estão totalmente traduzidos. Adicione um array de superblocos que não foram totalmente traduzidos a ele. Por exemplo:

```js
export const notAuditedSuperBlocks: NotAuditedSuperBlocks = {
  ...
  [Languages.Dothraki]: [
    SuperBlocks.DataVis,
    SuperBlocks.RelationalDb,
    SuperBlocks.BackEndDevApis,
    SuperBlocks.QualityAssurance,
    SuperBlocks.SciCompPy,
    SuperBlocks.DataAnalysisPy,
    SuperBlocks.InfoSec,
    SuperBlocks.MachineLearningPy,
    SuperBlocks.CollegeAlgebraPy,
    SuperBlocks.FoundationalCSharp,
    SuperBlocks.CodingInterviewPrep,
    SuperBlocks.ProjectEuler,
    SuperBlocks.JsAlgoDataStructNew,
    SuperBlocks.TheOdinProject
  ]
}
```

Certifique-se de adicionar apenas os superblocos que **não** estão totalmente traduzidos e aprovados. Os superblocos traduzidos serão calculados a partir desse objeto. Quando um novo superbloco estiver totalmente traduzido, remova-o do array para esse idioma.

Veja o enum `SuperBlocks` no início do mesmo arquivo para ver a lista completa de superblocos.

### Configurar a busca

Agora, abra o arquivo [`client/src/utils/algolia-locale-setup.ts`](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/client/src/utils/algolia-locale-setup.ts). Esse dado é usado para a barra de busca que carrega os artigos `/news`. Embora seja improvável que você venha a testar essa funcionalidade, não ter os dados para o seu idioma pode levar a erros quando tentar criar a base de código localmente.

Adicione um objeto para seu idioma no objeto `algoliaIndices`. Você deve usar os mesmos valores do objeto `english` para o teste local, substituindo a chave `english` pelo valor de `availableLangs` do seu idioma.

> [!NOTE] Se nós já implantamos uma instância do editorial em sua língua-alvo, você pode atualizar os valores para refletir a instância que já está implantada. Do contrário, use os valores em inglês.

Se você fosse adicionar Dothraki:

```js
const algoliaIndices = {
  english: {
    name: 'news',
    searchPage: 'https://www.freecodecamp.org/news/search/'
  },
  espanol: {
    name: 'news-es',
    searchPage: 'https://www.freecodecamp.org/espanol/news/search/'
  },
  chinese: {
    name: 'news-zh',
    searchPage: 'https://chinese.freecodecamp.org/news/search/'
  },
  'chinese-traditional': {
    name: 'news-zh',
    searchPage: 'https://chinese.freecodecamp.org/news/search'
  },
  dothraki: {
    name: 'news',
    searchPage: 'https://www.freecodecamp.org/news/search/'
  }

  // Se já tivermos /news no idioma de destino, é possível atualizar os valores assim:
  // dothraki: {
  //   name: 'news-mis',
  //   searchPage: 'https://www.freecodecamp.org/dothraki/news/search/'
  // }
};
```

### Interface do client

Você precisará dar um passo adicional para lidar com as traduções da interface do client.

Os fluxos de trabalho do Crowdin serão automaticamente puxados _algumas_ das traduções da UI, mas há alguns arquivos que precisam ser movidos manualmente.

Você vai querer copiar os seguintes arquivos de [`/client/i18n/locales/english`](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/client/i18n/locales/english) to `/client/i18n/locales/<your-language>` e aplicar as traduções conforme necessário:

- `links.json`
- `meta-tags.json`
- `motivation.json`

Você não precisa ter tudo nestes 3 arquivos traduzidos no começo. É possível traduzir somente as partes relevantes e fazer ajustes mais tarde.

#### `links.json`

Você pode substituir qualquer URL que tenha páginas correspondentes prontas no seu idioma.

Por exemplo, se você tiver uma publicação no seu idioma, você pode substituir o URL para `"news"`. Se quiser traduzir artigos listados nos links de rodapé, consulte [Como traduzir artigos nos links de rodapé](language-lead-handbook#how-to-translate-articles-in-the-footer-links).

#### `meta-tags.json`

Este arquivo contém metadados para a página da web de `/learn` no seu idioma. Você pode traduzir os valores para `"title"`, `"description"` e `"social-description"`. O valor de `"youre-unsubscribed"` é usado quando alguém cancela sua inscrição no e-mail semanal do Quincy.

Além disso, você pode traduzir ou adicionar palavras-chave relevantes em seu idioma para o array `"keywords"`.

#### `motivation.json`

Este arquivo contém os elogios que serão exibidos para os campers quando completarem um desafio, bem como as citações motivacionais que são exibidas na parte superior da página do `/learn`.

Você pode traduzi-los, ou até mesmo substituí-los por elogios/citações relevantes de sua escolha no seu idioma.

### Ativar os vídeos localizados

Esta seção só se aplica se você tiver vídeos localizados nos desafios. Caso contrário, você pode pular esta seção.

Para os desafios em vídeo, você precisa fazer algumas alterações. Primeiro, adicione o novo idioma (locale) à consulta do GraphQL no arquivo [`client/src/templates/Challenges/video/Show.tsx`](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/client/src/templates/Challenges/video/show.tsx). Por exemplo, para adicionar Dothraki à consulta:

```tsx
  query VideoChallenge($slug: String!) {
    challengeNode(fields: { slug: { eq: $slug } }) {
      videoId
      videoLocaleIds {
        espanol
        italian
        portuguese
        dothraki
      }
      ...
```

Em seguida, adicione um id para o novo idioma para qualquer desafio em vídeo em um bloco auditado. Por exemplo, se `auditedCerts` em `i18n.ts` inclui `scientific-computing-with-python` para `dothraki`, você deve adicionar uma entrada em `dothraki` em `videoLocaleIds`. O frontmatter dever ter essa aparência:

```yml
videoLocaleIds:
  espanol: 3muQV-Im3Z0
  italian: hiRTRAqNlpE
  portuguese: AelGAcoMXbI
  dothraki: new-id-here
nomeComTracos: introducao-por-que-programa
---
```

Atualize a interface de `VideoLocaleIds` em `client/src/redux/prop-types` para que ela inclua o novo idioma.

```ts
export interface VideoLocaleIds {
  espanol?: string;
  italian?: string;
  portuguese?: string;
  dothraki?: string;
}
```

Por fim, atualize o schema de desafios em `curriculum/schema/challengeSchema.js`.

```js
videoLocaleIds: Joi.when('challengeType', {
  is: challengeTypes.video,
  then: Joi.object().keys({
    espanol: Joi.string(),
    italian: Joi.string(),
    portuguese: Joi.string(),
    dothraki: Joi.string()
  })
}),
```

## Testar traduções localmente

Se quiser testar as traduções localmente, antes de adicioná-las ao nosso repositório principal - pule as alterações de fluxo de trabalho do Crowdin. Siga as etapas para habilitar um idioma e, em seguida, baixe as traduções do Crowdin e as carregue em seu código local.

Como o idioma ainda não foi aprovado para produção, nossos scripts ainda não estão baixando automaticamente as traduções. Somente membros da equipe têm acesso para baixar as traduções diretamente – entre em contato conosco quando quiser em nossa [sala de chat dos contribuidores](https://discord.gg/PRyKn3Vbay) ou traduza os arquivos de markdown em inglês localmente para fins de teste.

Quando tiver os arquivos em mãos, você precisará colocá-los no diretório correto. Para os desafios do currículo, você deve colocar as pastas de certificação (por exemplo, `01-responsive-web-design`) no diretório `curriculum/challenges/{lang}`. Para nossas traduções em Dothraki, esse diretório seria `curriculum/challenges/dothraki`. Os arquivos `.json` de tradução do client vão no diretório `client/i18n/locales/{lang}`.

Atualize seu arquivo `.env` para usar seu novo idioma para `CLIENT_LOCALE` e `CURRICULUM_LOCALE`.

Quando estes arquivos estiverem no local certo, você deve poder usar `pnpm run develop` para ver sua versão traduzida do freeCodeCamp.

:::tip
Se você fizer a build do client em um idioma e quiser fazer a build em um idioma diferente, precisará usar o comando `pnpm run clean-and-develop` depois de alterar o arquivo `.env`, pois o Gatsby armazenará em cache o primeiro idioma.
:::

:::danger
Embora você possa realizar as traduções localmente para fins de teste, lembramos a todos que as traduções _não_ devem ser enviadas pelo GitHub e devem ser feitas somente pelo Crowdin. Certifique-se de reiniciar sua base de código local após realizar os testes.
:::

## Mostrar o idioma no menu de navegação

Quando seu PR anterior for mesclado e sua VM para seu idioma estiver pronta, faça outro PR para mostrar seu idioma no menu de navegação.

No arquivo [`shared/config/i18n.ts`](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/shared/config/i18n.ts), você incluiu seu idioma no array `hiddenLangs` no PR anterior. Retire-o do array agora.

```js
export const hiddenLangs = []; // Remove seu idioma do array
```

Quando esse PR é mesclado e implantado, o currículo em seu idioma estará disponível na página.

# Implantar novos idiomas em `/news`

Para implantar novos idiomas em News, você precisa criar dois PRs. Um PR será para o [repositório do CDN](https://github.com/freeCodeCamp/cdn), enquanto o outro será para o [repositório News](https://github.com/freeCodeCamp/news).

## Preparar o repositório do CDN para o novo idioma

News busca os links de tendências e títulos de artigos do nosso CDN durante a build e adiciona-os ao rodapé. News também busca os arquivos Day.js do CDN durante a build para fazer a localização das datas e horários para cada idioma.

### Adicionar um arquivo YAML para os artigos populares

Faça a clonagem do repositório [CDN](https://github.com/freeCodeCamp/cdn) e crie um branch.

No diretório [`build/universal/trending`](https://github.com/freeCodeCamp/cdn/tree/main/build/universal/trending), crie um arquivo e dê a ele o nome de `language.yaml` (onde "language" é o idioma que você deseja inserir). Por exemplo, se você estiver lançando News em dothraki, nomeie o arquivo `dothraki.yaml`.

Em seguida, copie o conteúdo do arquivo trending de [`english.yaml`](https://github.com/freeCodeCamp/cdn/blob/main/build/universal/trending/english.yaml) e cole-o no novo arquivo YAML que você acaba de criar.

O conteúdo será parecido com isto:

```yaml
article0
title:  "Learn JavaScript"
article0link: "https://www.freecodecamp.org/news/learn-javascript-free-js-courses-for-beginners/"
article1
title:  "Linux ln Example"
article1link: "https://www.freecodecamp.org/news/linux-ln-how-to-create-a-symbolic-link-in-linux-example-bash-command"
article2
title:  "JS document.ready()"
article2link: "https://www.freecodecamp.org/news/javascript-document-ready-jquery-example/"
article3
title:  ...
article3link: ...
  ...
```

### Adicionar um arquivo de localização Day.js para o novo idioma

Por padrão, Day.js só inclui inglês como local. Para habilitá-lo para funcionar com outros idiomas, você precisa adicionar um novo arquivo de locale Day.js ao CDN.

No diretório [`build/news-assets/dayjs/<version>/locale`](https://github.com/freeCodeCamp/cdn/tree/main/build/news-assets/dayjs/1.10.4/locale), crie um arquivo e dê a ele o nome de `isocode.min.js` (onde "isocode" é o c[odigo iso do idioma que você deseja inserir). Por exemplo, se você estiver lançando News em dothraki, nomeie o arquivo `mis.min.js`.

> [!NOTE] O número da versão mudará já que as dependências são atualizadas.

Em seguida, visite [esta página no cdnjs](https://cdnjs.com/libraries/dayjs/1.10.4) com todos os arquivos Day.js disponíveis para a versão que estamos usando, encontre o link de `https://cdnjs.cloudflare.com/ajax/libs/dayjs/<version>/locale/isocode.min.js` para o novo idioma, e abra-o em uma nova aba.

> [!NOTE] Você só precisa adicionar o arquivo de locale .../dayjs/\<version\>/_locale_/isocode.min.js. Você não precisa adicionar mais nenhum arquivo Day.js.

Copie o código de local de Day.js da nova aba para o novo arquivo que você criou. Por exemplo, aqui está uma versão não minificada do código de localidade do inglês para Day.js:

```js
!(function (e, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
      ? define(n)
      : (e.dayjs_locale_en = n());
})(this, function () {
  'use strict';
  return {
    name: 'en',
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
      '_'
    ),
    months:
      'January_February_March_April_May_June_July_August_September_October_November_December'.split(
        '_'
      )
  };
});
```

Em seguida, abra um PR para o repositório do CDN para adicionar os arquivos YAML e Day.js para revisão.

## Preparar o repositório do editorial para o novo idioma

O [repositório de News](https://github.com/freeCodeCamp/news) puxa dados de uma instância do Ghost, os arquivos que você adicionou ao CDN, faz a build de News e o implementa.

> [!WARN] Pull requests para o repositório News _precisam_ vir do mesmo repositório. Você não deve trabalhar a partir de um fork nesse passo.

### Modificar o arquivo de configuração principal

Clonar o repositório News e criar uma branch.

Abra o arquivo `config/index.js` para adicionar o novo idioma e configurar os valores necessários. Há alguns objetos e arrays que precisam ser modificados:

- `locales`: esse array contém os idiomas de News ativos e futuros. Esses são os valores usados no arquivo `.env` para escolher a instância e a interface do usuário do Ghost a serem usados em cada build. Adicione o nome textual do novo idioma em minúsculas a esse array.
- `localeCodes`: esse objeto é um mapa de códigos ISO para cada idioma. Ele é usado para configurar o i18next antes da build da interface de usuário. Para adicionar um novo idioma, use o nome do idioma em minúsculas como _key_ (chave) e o código do idioma ISO 639-1 como o _value_ (valor).
- `algoliaIndices`: esse objeto é um mapa dos índices do Algolia para cada idioma. Para adicionar um novo idioma, use o nome do idioma em minúsculas como _key_ (chave) e `news-`, seguido do código do idioma ISO 639-1 como o _value_ (valor).

> [!NOTE] Se você não tem certeza sobre a string a ser usada durante a configuração de `algoliaIndices`, envie uma mensagem para o Kris (@scissorsneedfoodtoo) ou para outra pessoa com acesso ao Algolia, pedindo para que confira para você.

Por exemplo, se você estiver lançando News em dothraki, aqui está o modo como os objetos/arrays acima devem parecer:

```js
const locales = ['arabic', 'bengali', 'chinese', 'english', 'dothraki'];

const localeCodes = {
  arabic: 'ar',
  bengali: 'bn',
  chinese: 'zh',
  english: 'en',
  dothraki: 'mis'
};

const algoliaIndices = {
  arabic: 'news-ar',
  bengali: 'news-bn',
  chinese: 'news-zh',
  english: 'news',
  dothraki: 'news-mis'
};
```

### Adicionar os arquivos em JSON do i18next para o novo idioma

Em seguida, vá para o diretório `shared/config/i18n/locales`, crie uma pasta e informe o nome do novo idioma que você está adicionando. Por exemplo, se você estiver lançando News em dothraki, crie uma pasta chamada `dothraki`.

Em seguida, copie os arquivos JSON do diretório `english` para a sua nova pasta.

Na sua nova pasta, abra o arquivo `redirects.json` e substitua seu conteúdo por um array vazio:

```json
[]
```

Em seguida, faça o commit e o push de sua branch diretamente para o repositório News.

> [!NOTE] Você precisa estar em uma das equipes com acesso ao repositório de News para enviar branches diretamente para esse repositório. Atualmente, apenas as equipes de desenvolvimento, i18n e staff podem fazer isso.

Por fim, abra um PR para análise.

Uma vez que os PRs para o repositório do CDN e de News tenham sido aprovados, eles podem ser mesclados.

> [!NOTE] A implantação será realizada posteriormente pelos membros da equipe. Aqui temos uma amostra de PR: [freeCodeCamp/news#485](https://github.com/freeCodeCamp/news/pull/485). Nela, vemos como a equipe faz isso. Mais detalhes estão disponíveis na [Wiki da equipe](https://staff-wiki.freecodecamp.org/docs/flight-manuals/news-instances#jamstack---news--assets).
