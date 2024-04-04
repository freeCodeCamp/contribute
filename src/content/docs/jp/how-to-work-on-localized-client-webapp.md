---
title: How to Work on Localized Client Webapp
---

The React-based client web app that powers our learning platform is built using Gatsby. [react-i18next](https://react.i18next.com/) と [i18next](https://www.i18next.com/) を使用して、様々な世界の言語に翻訳されています。

開発用クライアントアプリケーションのローカル設定については、こちらの [ローカル設定ガイド](how-to-setup-freecodecamp-locally)をご覧ください。 By default, the application is available only in English.

Once you have set up the project locally you should be able to follow this documentation to run the client in the language of your choice from the list of available languages.

これは、ローカライゼーションを含むものを対象にし、例えば別の言語でボタンラベルを検証する必要がある機能に関して作業している場合に役立ちます。

:::tip
You do not need to follow this document to translate freeCodeCamp's curriculum or contributing documentation. 代わりに、[このガイド](how-to-translate-files) をお読みください。
:::

i18n フレームワークとツールがどのように機能するかを理解しましょう。

## ファイル構成

Most of the files for translating the platform are located in the [`client/i18n`](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/client/i18n) folder. Each language has a directory that contains JSON files with the translations.

```bash
  config
  └── i18n.ts
  ...
  client/i18n
  ├── configForTests.js
  ├── config.js
  ├── locales
  │   ├── chinese
  │   │   ├── intro.json
  │   │   ├── links.json
  │   │   ├── meta-tags.json
  │   │   ├── motivation.json
  │   │   └── translations.json
  ... ...
  │   ├── dothraki
  │   │   ├── intro.json
  │   │   ├── links.json
  │   │   ├── meta-tags.json
  │   │   ├── motivation.json
  │   │   └── translations.json
  ... ...
  │   ├── english
  │   │   ├── intro.json
  │   │   ├── links.json
  │   │   ├── meta-tags.json
  │   │   ├── motivation.json
  │   │   └── translations.json
  │   └── espanol
  │       ├── intro.json
  │       ├── links.json
  │       ├── meta-tags.json
  │       ├── motivation.json
  │       └── translations.json
  ├── locales.test.js
  ├── schema-validation.js
  └── validate-keys.ts
```

Some of these files are translated on our translation platform (Crowdin) and some are translated or created via PRs on GitHub.

**翻訳プラットフォーム上で翻訳されたファイル:**

- `translations.json` ファイルは、ユーザーインターフェース要素に表示されるテキストの大部分を含んでいます。 キーは、設定されるすべての言語で正しいテキストが取得できるように、コードベースで使用されます。 This file needs to have the same keys in all languages.

- `intro.json` ファイルには、認定講座ページの紹介テキスト用に、キーと値のペアが含まれています。

  キーの翻訳を追加 / 更新したい場合は、[こちらのガイド](how-to-translate-files) をご覧ください。

**翻訳プラットフォーム上で翻訳されていないファイル:**

- `motivation.json` ファイルは、同じ引用符、賛辞、配列の長さを含む必要はありません。 JSON 構造だけは同じです。

- The `meta-tags.json` file contains the information for our website's meta tag information.

  Changes to these files are typically done by the staff team. If you see something out of the ordinary we recommend you reach us in the [contributors chat room](https://discord.gg/PRyKn3Vbay).

## Testing the Client App in a World Language

You can test the client app in any language available in the [list of `availableLangs` here](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/shared/config/i18n.ts).

```js
export const availableLangs = {
  client: [
    Languages.English,
    Languages.Espanol,
    Languages.Chinese,
    Languages.ChineseTraditional,
    Languages.Italian,
    Languages.Portuguese,
    Languages.Ukrainian,
    Languages.Japanese,
    Languages.German,
    Languages.Arabic
  ],
  ...
};
```

新しい言語をテストするには、言語名をタイトルとしたフォルダを他の言語の隣に作成し、JSON ファイルを別の言語から新しいフォルダにコピーします。

Add the new language to the `Languages` enum and the `client` array at the top of the [`shared/config/i18n.ts`](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/shared/config/i18n.ts) file.

次に、同じファイルのコメント指示に従って、必要に応じて残りの変数を追加 / 更新します。

Finally, set the `CLIENT_LOCALE` variable in your `.env` file to the string of the locale you want to build from the `Languages` enum in the above file.

## コンポーネントの構築方法

クライアント Web アプリの機能やバグの作業をしていて、例えば、設定ページに新しい UI アイテムを追加する場合は、以下のガイドラインに従ってください。 これらは、サポートされている世界言語へのローカライゼーションで、コンポーネントを準備するのに役立ちます。

### 関数コンポーネント

```js
import { useTranslation } from 'react-i18next';

// in the render method:
const { t } = useTranslation();

// call the "t" function with a key from the JSON file:
<p>{t('key')}</p>; // more details below
```

### クラスコンポーネント

```js
import { withTranslation } from 'react-i18next';

// withTranslation adds the "t" function to props:
const { t } = this.props;

// call the "t" function with a key from the JSON file:
<h1>{t('key')}</h1> // more details below

// export without redux:
export default withTranslation()(Component);

// or with redux:
export default connect(...)(withTranslation()(Component));
```

## 「t」関数を使って翻訳する

### 基本的な翻訳

```js
// in the component:
<p>{t('p1')}</p>

// in the JSON file:
{
  "p1": "My paragraph"
}

// output:
<p>My paragraph</p>
```

### 動的データの使用

```js
// in the component:
const username = 'moT';

<p>{t('welcome', { username: username })}</p>

// in the JSON file:
{
  "welcome": "Welcome {{username}}"
}

// output:
<p>Welcome moT</p>
```

上の例では、 `username` 変数を使用して `t` 関数にオブジェクトを渡します。 変数は、`{{username}}` の JSON 値で使用されます。

## `Trans` コンポーネントを使用した翻訳

一般的なルールは、「t」関数を使うことです。 しかし、それだけでは不十分な場合のための `Trans` コンポーネントがあります。通常、テキストに要素が埋め込まれている場合に使用されます。 どんな型の React コンポーネントでも `Trans` コンポーネントを使用できます。

### ネストされた基本要素

```js
// in the component:
import { Trans } from 'react-i18next'

<p>
  <Trans>fcc.greeting</Trans>
</p>

// in the JSON file:
{
  "fcc": {
    "greeting": "Welcome to <strong>freeCodeCamp</strong>"
  }
}

// output:
<p>Welcome to <strong>freeCodeCamp</strong></p>
```

You can place the key inside the component tags like in the above example if the text contains "simple" tags with no attributes. `br`、`strong`、`i`、および `p` がデフォルトですが、そのリストは、i18n config で拡張できます。

### ネストされた複雑な要素

別の要素内に特定のテキストを持たせたい場合、アンカータグが良い例です。

```js
// in the component:
<p>
  <Trans i18nKey='check-forum'>
    <a href='https://forum.freecodecamp.org/'>placeholder</a>
  </Trans>
</p>

// in the JSON file:
{
  "check-forum": "Check out <0>our forum</0>."
}

// output:
<p>Check out <a href='https://forum.freecodecamp.org/'>our forum</a></p>
```

上記の例では、キーは `Trans` コンポーネントの属性に設定されています。 JSON の `<0>` と `</0>` はコンポーネントの最初の子要素を表します。 この場合、アンカー要素です。 もっと多くの子要素がある場合、同じ構文を使ってそこから数えるだけです。 React 開発ツールで調べることにより、コンポーネントの子要素を見つけることができます。 `placeholder` は単にそこにあるだけです。なぜなら、リンターが空の `<a>` 要素について不平を言うからです。

### 変数の使用

```js
// in the component:
const email = 'team@freecodecamp.org';

<p>
  <Trans email={email} i18nKey='fcc.email'>
    <a href={`mailto:${email}`}>
      {{ email }}
    </a>
  </Trans>
</p>

// in the JSON file:
{
  "fcc": {
    "email": "Send us an email at: <0>{{email}}</0>"
  }
}

// output:
<p>Send us an email at: <a href='mailto:team@freecodecamp.org'>team@freecodecamp.org</a><p>
```

上記の例では、キーと変数は `Trans` コンポーネントの属性に設定されています。 `{{ email }}` は、`Trans` コンポーネントのどこかにある必要がありますが、どこであっても問題はありません。

## テキストの変更

クライアント側でテキストを変更するには、関連する `.json ` ファイルで、React コンポーネントで使用されているキーを見つけて、値を新しいテキストに変更します。 そのキーが他の場所で使用されていないことを確認するために、コードベースを検索する必要があります。 他の場所で使用されていた場合、そのすべての場所で変更が実行されます。

Run `pnpm run clean-and-develop` to apply the change.

## テキストの追加

クライアントに追加するテキストが、関連する `.json` ファイルに存在する場合は、既存のキーを使用します。 それ以外の場合は、新しいキーを作成します。

英語ファイルは、同じ名前を共有する `.json` ファイルすべてにとって、「真実を語る資料」です。 新しいキーを追加する必要がある場合は、そこに追加します。 そして、そのキーを **すべて** の `translations.json` ファイルに追加します。

> [!NOTE] ファイルが Crowdin で翻訳されている場合は、すべての言語に英語のテキストを使用してください。 そうしないと、テストは失敗します。

すべてのファイルで、キーを同じ順序に保つことをお勧めします。 Also, try to put all punctuation, spacing, quotes, etc. in the JSON files and not in the components or server files.

> [!NOTE] The underscore (`_`) is a reserved character for keys in the client-side files. 使用方法については、 [ドキュメント](https://www.i18next.com/translation-function/plurals) を参照してください。

Run `pnpm run clean-and-develop` to apply the change.

## Proposing a Pull Request (PR)

After you've committed your changes, check here for [how to open a Pull Request](how-to-open-a-pull-request).

## Helpful Documentation

- [react-i18next docs](https://react.i18next.com/latest/usetranslation-hook)
- [i18next docs](https://www.i18next.com/translation-function/essentials)
