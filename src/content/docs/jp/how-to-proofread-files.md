---
title: 翻訳校正の手順
---

校正チームは、翻訳文が原文を正確に反映するようにする責任があります。 私たちは、非常に高い品質の翻訳文を提供してくれる校正者を信頼しています。

翻訳はすべて実際の人間が作業しています。 Proofreading ensures that there is a consistent tone across all our translated resources like the curriculum.

校正を始めるには、[翻訳プラットフォーム](https://translate.freecodecamp.org) にアクセスしてログインします。 上部ナビゲーションバーで「コンソールに移動」を選択し、パブリックビューからワークスペースビューに切り替えます。

## ファイルの選択

アクセスが許可されたプロジェクトの一覧が表示されます。 校正を行うプロジェクトを選択し、言語を選択します。

![画像 - 校正ファイルツリー](https://contribute.freecodecamp.org/images/crowdin/proof-file-tree.png)

利用可能なファイルのリストが表示されます。 ファイルを選ぶには、ファイルの右側にある `Proofread` ボタンを押し、表示されるドロップダウンメニューから `Proofread` を選択します。

> [!NOTE] このワークスペースビューで、校正ではなく [ファイルの翻訳](how-to-translate-files)を行いたい場合は、ドロップダウンメニューから `Crowdsourcing` を選択します。

## 翻訳文の校正

![画像 - 校正ビュー](https://contribute.freecodecamp.org/images/crowdin/proofread.png)

<!--Add proofread/crowdsource button to the image-->

ここでは、選択したファイル内の文字列のリストと関連する翻訳文が表示されます。 ここで表示される翻訳は、翻訳コミュニティから (賛成票と反対票の間で) 最高得点を得た翻訳です。

指定された文字列の _すべての_ 翻訳候補を見ることができます。承認する翻訳文を選択する際に、(賛成票と反対票によって決定される) コミュニティのスコアを考慮します。 コミュニティは翻訳候補をレビューし、最も正確で明確な翻訳を推奨します。

1. 原文の文字列 (英語) を確認します。
2. 翻訳された文字列を確認します。 賛成票と反対票に基づいて、最も人気のある翻訳案がここに表示されます。
3. このチェックマークボタンをクリックすると、その翻訳が承認されます。
4. Crowdin は各文字列のステータスを表示します。 `Done` は翻訳が承認されたことを意味し、次の Crowdin プルにダウンロードされます。 `Todo` は文字列が校正されていないことを意味します。 `Hidden` は文字列がロックされており、_翻訳すべきではない_ ことを意味します。 `Comment` は、その文字列に関連するコメントがあることを意味します。
5. 翻訳文をチェックボックスで選択し、一括して承認することもできます。
6. コミュニティが提案した翻訳、その人気度のスコア、Crowdin が提案した翻訳をここで参照できます。
7. このボタンで、右側の表示ペインの表示 / 非表示を切り替えます。ここでは、翻訳、コメント、翻訳メモリ、および用語集を見ることができます。
8. 品質保証チェックにエラーがあった際に、ここにメッセージが表示されます。 つまり、翻訳文が正しくないと思われる場合に、Crowdin から通知があります。 これらの翻訳は慎重に承認します。

ファイルが校正されると、追加のアクションは必要ありません。

> [!NOTE] 校正ビューで文字列を承認すると完成とマークされ、Crowdin から GitHub への次のプルでダウンロードされます。

## Becoming a Proofreader

質問がある場合、または校正者になることに興味がある場合は、[コントリビューターチャットルーム](https://discord.gg/PRyKn3Vbay) でお気軽にお問い合わせください。 一定期間 freeCodeCamp に貢献している場合は、通常、校正へのアクセスを許可します。

スタッフチームとコミュニティモデレータチームは、世界中で高品質の翻訳を利用できるようにするための親切なボランティアを常に探しています。

> [!NOTE] Crowdin では、自身の翻訳を承認することを許可します。 一般的には、エラーがないことを確認するための安全策として、他の校正者が翻訳案を見直すことをお勧めしています。

## Creating a Channel on Chat for a World Language

For the most part, we encourage you to use the [contributors chat](https://discord.gg/PRyKn3Vbay) room for all correspondence. However if the team of volunteer translators grows for a certain language, we can consider creating an additional break-out channel for the language.

既に校正者であり、特定の言語のためのチャットサーバーに専用チャンネルを持つことに興味がある場合、[このフォーム](https://forms.gle/XU5CyutrYCgDYaVZA) に記入します。
