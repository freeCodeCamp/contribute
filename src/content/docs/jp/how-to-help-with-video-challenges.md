---
title: How to Help with Video Challenges
---

ビデオチャレンジは、freeCodeCamp カリキュラムの新しいタイプのチャレンジです。

ビデオチャレンジは、特定のトピックに関するノーカットビデオコースの小さなセクションです。 ビデオチャレンジページには、YouTube 動画が埋め込まれています。 各チャレンジページには、動画に関連する多肢選択問題があります。 コース内で次のビデオチャレンジに進む前に、ユーザーは質問に正しく答える必要があります。

ビデオチャレンジのページは、freeCodeCamp チームのメンバーによって作成されます。 YouTube 動画も、freeCodeCamp チームのメンバーによってアップロードされます。 しかし、多くのビデオチャレンジは、まだ関連する質問がありません。

ビデオセクションに関連する多肢選択式の質問を作成し、ビデオチャレンジマークダウンファイルに質問を追加する作業を手伝うことができます。

## チャレンジテンプレート

以下はチャレンジマークダウンファイルのテンプレートです。

````md
---
id: Unique identifier (alphanumerical, MongoDB_id)
title: Challenge Title
challengeType: 11
videoId: 'YouTube videoId for video challenge'
forumTopicId: 12345
---

# --description--

チャレンジの説明 (マークダウンで記入)

```html
<div>example code</div>
```
````

# --question--

現在、このフィールドは多肢選択式 Python チャレンジが使用しています。

## --text--

質問のテキストをここに記述します。

## --answers--

回答 1

---

回答 2

---

他の回答

## --video-solution--

正解の番号をここに記述します。

```

## Creating Questions for Video Challenges

### Access the Video Challenge Markdown Files

You can find the markdown files for video challenges at the following locations in the curriculum:

- [Data Analysis with Python Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/08-data-analysis-with-python/data-analysis-with-python-course)
- [TensorFlow 2.0 Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/11-machine-learning-with-python/tensorflow)
- [Numpy Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/08-data-analysis-with-python/numpy)
- [How Neural Networks Work Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/11-machine-learning-with-python/how-neural-networks-work)

Pick a challenge markdown file from the options above.

### Skim through the video associated with the challenge and create a multiple-choice question

First, find the `videoId`.

For example, in the following code from the header of a video challenge markdown file, the `videoId` is "nVAaxZ34khk". GitHub では、情報はテーブル形式で表示されます。

```

---

id: 5e9a093a74c4063ca6f7c14d
title: Data Analysis Example A challengeType: 11
videoId: nVAaxZ34khk

---

````

次に、その `videoId` で YouTube の動画にアクセスします。 The URL for the video will be:
https://www.youtube.com/watch?v=[videoId] (replace `videoId` in the URL with the video's ID - without square brackets)

In the example above, the URL is https://www.youtube.com/watch?v=nVAaxZ34khk

Skim the YouTube video with that `videoId` and think of a multiple-choice question based on the content of the video.

### Add the Question to the Markdown File

You can add the question locally or using the GitHub interface. ローカルで質問を追加するには、[freeCodeCamp をローカルに設定する](how-to-setup-freecodecamp-locally) 必要があります。 GitHub でファイルを見つけて、編集ボタンをクリックして、ブラウザで質問を追加することもできます。

特定のビデオチャレンジに質問がまだ追加されていない場合は、次のデフォルトの質問があります。


```md
# --question--

## --text--

質問のテキスト

## --answers--

Answer 1

---

Answer 2
---

他の回答

## --video-solution--

1
````

下記項目の下に質問テキストを追加 / 更新してください。

```
# --question--

## --text--
```

`## --answers--` の下に回答を追加 / 更新してください (`Answer 1`、`Answer 2` など)。 `## -video-solution--` の下にある番号を正解の番号に更新してください。 同じ形式で、他の回答も追加できます。 The questions and answers can be surrounded with quotation marks.

### 質問の例

````md
# --question--

## --text--

この JavaScript コードは、コンソールに何を記録しますか？

```js
console.log('hello world');
```
````

## --answers--

hello _world_

---

**hello** world

---

hello world

---

## --video-solution--

3

`````

````md
# --question--

## --text--

以下のコードを実行すると何が出力されますか？

```py
width = 15
height = 12.0
print(height/3)
`````

## --answers--

39

---

4

---

4.0

---

5.0

---

5

## --video-solution--

3 ````

以下のビデオコースのマークダウンファイルで、その他の例も参照できます。 すべてのチャレンジには既に質問があります: [Python for Everybody コース](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/07-scientific-computing-with-python/python-for-everybody)

## Open a Pull Request

1 つ以上の質問を作成した後、新しいブランチに変更をコミットすると、[プルリクエストをオープンする](how-to-open-a-pull-request) ことができます。
