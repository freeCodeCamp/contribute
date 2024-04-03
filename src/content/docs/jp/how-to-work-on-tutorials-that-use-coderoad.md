---
title: How to work on CodeRoad
---

このページでは、CodeRoad VS Code 拡張機能を使用して作成された freeCodeCamp チュートリアルやプロジェクトに貢献する方法を説明します。

## How the Tutorials Work

Each of the freeCodeCamp tutorials that use CodeRoad has its own repo under the freeCodeCamp GitHub organization. それらはすべて `learn-` から始まります。 例えば、`https://github.com/freeCodeCamp/learn-bash-by-building-a-boilerplate/` です。

各チュートリアルリポジトリには、`main` ブランチと「バージョン」ブランチがあります。例えば、 `v1.0.0` です。

`main` ブランチには、`TUTORIAL.md` と `coderoad.yaml` 2 つのメインファイルがあります。 `TUTORIAL.md` には、チュートリアルのすべての手順、ヒント、タイトルなどが含まれています。 `coderoad.yaml` には、どのコマンドを実行するか、どのファイルの変更を監視するか、どのブランチバージョンをステップに使用するかなど CodeRoad に対する指示が含まれています。

「バージョン」ブランチには、チュートリアルの各ステップにロードされるコミットが含まれています。 このブランチのコミットメッセージは特定のものでなければなりません。 最初のコミットには、メッセージに `INIT` が必要であり、初回レッスン前にロードするファイルがすべて含まれています。

後続のコミットメッセージは、`main` ブランチの `TUTORIAL.md` のステップ数と一致する必要があります。 例えば、ユーザーがステップ `10.1` に行くと、メッセージ `10.1` を含むコミットがロードされます。

バージョンブランチでコミットに変更を加えるには、変更したいコミットをリベースして編集する必要があります。 これにより Git の履歴が書き換えられるので、これらの種類のブランチには PR を受け入れられません。 バージョンブランチが freeCodeCamp リポジトリ上にある場合は、変更しないでください。

> [!WARNING]
>
> freeCodeCamp リポジトリにあるバージョンブランチに、変更を加えたりプッシュしたりしないでください。 常に新しいものを作成してください。

## How to Contribute

### 必要条件

[CodeRoad CLI ツール](https://www.npmjs.com/package/@coderoad/cli) を `npm install -g @coderoad/cli` でインストールします。

最新バージョンにはいくつかの問題があります。 `coderoad --version` がインストール後に動作しない場合は、`npm install -g @coderoad/cli@0.7.0` を使用して `0.7.0` にダウングレードしてください。

### `main` に貢献する

この一連の手順は、`main` で **既存のレッスン** に軽微な変更を加える PR のためのものです。 これは主に `TUTORIAL.md` ファイルのタイプミス、文法、ヒント、指示の変更または修正で構成されています。

レッスンの追加や削除を含むその他すべてについては、[バージョンブランチの手順](#working-on-version-branch) に従ってください。 このために新しいバージョンブランチを作成する必要はありません。以下の手順に従って PR を作成できます。

> [!NOTE]
>
> これらの変更には既存のバージョンブランチを使用します。 相当量のものであれば、自由に `CHANGELOG.md` に追加してください。 ほとんどの場合、良いコミットメッセージで動作するはずです。

`tutorial.json` ファイルを直接変更する必要はありません。 これは、CLI ツールで作成されます。

タイプミスや文法上のエラー修正等の軽微な変更の場合は、その変更をテストする必要はありません。

以下の手順に従って PR を作成します。この手順は、通常、周りのレッスンをコンテキストに使用していることを覚えておいてください。

- `git branch vX.X.X upstream/vX.X.X` を使用して、最新バージョンのブランチのコピーを作成します。このブランチをチェックする必要はありませんが、存在している必要があります。
- `main` の新しいブランチを作成してチェックアウトします。
- 変更を行い **コミット** します。 注意: `tutorial.json` ファイルを変更する必要はありません。 `TUTORIAL.md` に変更を加える必要があります。
- `coderoad build` を実行して、`tutorial.json` ファイルを再作成します。
- `update json` でメッセージとして変更をコミットします。
- PR を作成します。

### Testing Changes on `main`

上記手順の後、`main` の変更をテストしたい場合は、次の手順に従います。

- [rdb-alpha repo](https://github.com/freeCodeCamp/rdb-alpha) の手順に従ってコンテナを実行します。
- 新しいブランチの `tutorial.json` ファイルを使用してチュートリアルを開始します。

### Reviewing PRs to `main`

上述のように、指示もしくは文法問題に関わる `main` のみを変更する PR をレビューする場合、`TUTORIAL.md` の変更は、`tutorial.json` の変更と一致する必要があります。

`tutorial.json` ファイルには、コミットハッシュやステップ / レベル ID の変更を含めないでください。 起動コマンドや、レベルコマンド、ファイルウォッチャーも変更すべきではありません。 例外はありますが、ステップに問題があれば、注意深く処理する必要があります。

通常、周りのレッスンをコンテキストに使用していることを覚えておいてください。指示が理にかなっていることを確認してください。

### Working on Version Branch

> [!WARNING]
>
> 注: freeCodeCamp リポジトリにあるバージョンブランチに、変更を加えたりプッシュしたりしないでください。 常に新しいものを作成してください。

Git の履歴が書き換えられるため、バージョンブランチ間で何が変更されたかを簡単に確認する方法はありません。 新しいバージョンブランチの使用を承諾するには、慎重な検討とテストが必要です。

これらの手順は、テスト、テストテキスト、ファイルのリセット、ステップの追加や削除など、「バージョン」ブランチを変更するためのものです。

新しいバージョンを作成するには、次の手順に従います。

- **最新の** バージョンブランチを `git checkout -b vX.X.X upstream/vX.X.X` でチェックアウトします。
- `git checkout -b vX.X.Y` で、そこから新しいブランチを作成し、バージョンをインクリメントします。
- バージョンブランチを変更します。 チュートリアルの使い方については、[CodeRoad ドキュメント](https://coderoad.github.io/docs/edit-tutorial) を参照します。
- `git push -u origin vX.X.Y` で、新しいブランチをフォークにプッシュします。
- `main` ブランチをチェックアウトします。
- `main` から新しいブランチを作成します。 例: `feat/version-X.X.Y`
- `coderoad.yaml` の `uri` をリポジトリのフォークに変更します。 これにより、あなたとレビュアーが freeCodeCamp リポジトリにプッシュする前に、テストできるようになります。 バージョンを、そのファイルの 2 つのスポットにある新しいブランチに変更します。 新しいバージョンの変更を `CHANGELOG.md` に追加します。 その他必要な変更を行います。
- メッセージ `feat: release version X.X.Y - <optional description>` で、変更をコミットします。
- `coderoad build` を実行して、新しい `tutorial.json` ファイルを作成します。
- ファイルを追加してコミットします。
- フォークに変更をプッシュします。
- 以下の [テスト手順](#バージョンブランチの変更をテストする) に従って変更をテストします。 追加の変更を行い、先ほどと同様にコミットします。追加の変更がなければ、残りの手順に進みます。
- 新しい `feat/version-X.X.Y` ブランチを使用して `main` に PR を作成します。 `version X.X.Y ready for review` のタイトルを付けます。 これはマージされません。新しいバージョンが準備ができていることをレビューアーに知らせるためのものです。
- レビュアーのためにそこに残してください。

### Testing Changes to a Version Branch

- [rdb-alpha repo](https://github.com/freeCodeCamp/rdb-alpha) の手順に従ってコンテナを実行します。
- 変更があるフォークの `tutorial.json` ファイルを使用してチュートリアルを開始します。 `main` ブランチ ではなく、`feat: version-X.X.Y` ブランチのファイルを使用します。

### Pushing a New Version

新しいバージョンをプッシュする前に、ユーザーのフォークで新しい `feat/version-vX.X.Y` (`main` にマージされる) ブランチを表示してください。 新規変更を含む `CHANGELOG.md` ファイルに追加があり、`coderoad.yaml` の 2 つのスポットのバージョンが新しいバージョンブランチと一致していることを確認してください。

freeCodeCamp リポジトリへの書き込みアクセス権を有しており、`CHANGELOG` と `coderoad.yaml` ファイルが検証済で、上記手順を使用して変更もテスト済みであり、チュートリアルの新しいバージョンをブッシュしたい場合は、下記を実行してください。

> [!WARNING]
>
> 留意点: freeCodeCamp リポジトリにあるバージョンブランチに変更を加えたりプッシュしたりしないでください。 常に新しいものを作成してください。

- 新しい変更が存在する場所へのリモートがない場合、`git remote add <users_fork>` を使用してユーザーのフォークへのリモートを作成します。
- 新しいブランチと同じ **local** ブランチ名を削除します。 おそらく、 `vX.X.Y` または `feat/version-X.X.Y` いずれかの名前です。
- 新しいバージョンブランチを `git checkout -b vX.X.Y <remote>/vX.X.Y` でチェックアウトします。
- `git push -u upstream/vX.X.Y` で freeCodeCamp リポジトリに新しいバージョンのブランチをプッシュします。 新しい `tutorial.json` ファイルで `main` を更新する前に、新しいブランチをプッシュする必要があります。
- `git checkout -b feat/version-X.X.Y <remote>/feat/version-X.X.Y` で、`main` にマージされるユーザーブランチをチェックアウトします。
- `coderoad.yaml` の `uri` を freeCodeCamp リポジトリに戻します。
- 変更を追加してコミットします。
- `coderoad build` を実行して、新しい `tutorial.json` ファイルを作成します。
- ファイルを追加してコミットします。
- `git push -u origin/feat/version-X.X.Y` でフォークに変更をプッシュします。
- freeCodeCamp リポジトリで `main` にPRを作成します。
- 問題がない場合は、それをマージするか残して、レビューを依頼します。
- PR がマージされた後、[rdb-alpha repo](https://github.com/freeCodeCamp/rdb-alpha) の指示に従ってチュートリアルを開き、正しく読み込まれていることと、いくつかのステップが実行できることを確認します。
- Finally, if any PRs for this version exist, close them

### How to Revert to a Previous Version

- Create a new branch off of the latest `main` with `git checkout -b revert/to-version-X.X.X`
- このブランチにおいて、元に戻したいバージョン以降のコミットをすべて元に戻します。 例えば、次のようなコミットです。

```
fix: typo
release: version 1.0.1
fix: typo
release: version 1.0.0
```

v1.0.0 に戻したい場合は、 `release: version 1.0.1` 以降からすべてのコミットを元に戻します。

- PR を作成します。 `revert: to version X.X.X` のタイトルを付けます。
