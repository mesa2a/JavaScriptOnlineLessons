---
title: "Lesson 081: ループとDOM"
author: "JavaScript学習教材"
date: "2025-11-21"
---

# Lesson 081: ループとDOM

## 今回の学習

### 前回の復習

前回のレッスンでは、**ネストループ**と**2次元的な処理**について学びました。forループの中にさらにforループを入れることで、行と列のような2次元的なデータを処理できるようになりました。掛け算表を作成することで、ネストループの実用的な使い方を体験しました。

### 今回の目標

今回のレッスンでは、ループを使ってDOM要素を繰り返し作成する方法を学びます。具体的には以下の3つを目標とします。

1. forループを使ってHTML要素を繰り返し作成できるようになる
2. リストを自動生成できるようになる
3. 要素に番号を付けて表示できるようになる

これまで学んできたループとDOM操作を組み合わせることで、より実用的なWebアプリケーションが作れるようになります。

## ループでHTML要素を作成する意味

これまでのレッスンでは、DOM操作を使ってボタンをクリックしたときに結果を表示する方法を学んできました。また、forループを使って繰り返し処理を行う方法も学びました。今回は、この2つの技術を組み合わせます。

なぜループでHTML要素を作成する必要があるのでしょうか。実際のWebサイトを考えてみましょう。

**Twitterのタイムライン**を思い出してください。タイムラインには何十件、何百件ものツイートが表示されます。これらを1つ1つ手作業でHTMLに書いていたら、とても大変です。また、ツイートの数は常に変化するため、手作業では対応できません。

**YouTubeの動画一覧**も同じです。検索結果には数百件、数千件の動画が表示されることがあります。これらの動画カードを1つ1つHTMLに書くのは現実的ではありません。

**Amazonの商品一覧**も同様です。数万点の商品を1つ1つHTMLで作成することは不可能です。

これらのサイトは、すべて**プログラムで自動的にHTML要素を生成**しています。その基本となるのが、今回学ぶ「ループとDOM操作の組み合わせ」です。

## ループで要素を繰り返し作成する

まずは最も基本的な例から始めましょう。forループを使って、同じ要素を複数回作成してみます。

```javascript
// ボタン要素とresult要素を取得
const createList = document.getElementById('createList');
const result = document.getElementById('result');

// ボタンをクリックしたときの処理
createList.addEventListener('click', function() {
    // resultの内容をクリア
    result.innerHTML = '';

    // 5回繰り返す
    for (let i = 1; i <= 5; i++) {
        // p要素を作成
        const p = document.createElement('p');
        p.textContent = 'アイテム';
        result.appendChild(p);
    }
});
```

このコードは、ボタンをクリックすると「アイテム」という文字列を持つp要素を5個作成します。

**コードの流れを詳しく見ていきましょう。**

1. `result.innerHTML = ''` で、前回の結果をクリアします
2. `for (let i = 1; i <= 5; i++)` で5回繰り返します
3. ループの中で `document.createElement('p')` を使って新しいp要素を作成します
4. `p.textContent = 'アイテム'` で要素に文字列を設定します
5. `result.appendChild(p)` で作成した要素をresultに追加します

**重要なポイント**は、ループが回るたびに**新しい要素が作成される**ということです。1回目のループで1個目のp要素が作られ、2回目のループで2個目のp要素が作られます。これを5回繰り返すことで、合計5個のp要素が作成されます。

## 番号付きリストの作成

同じ「アイテム」という文字列を5回表示するだけでは、あまり実用的ではありません。実際のアプリケーションでは、各アイテムに番号を付けたり、異なる内容を表示したりすることが多いです。

ループ変数`i`を使うと、各要素に番号を付けることができます。

```javascript
// ボタン要素とresult要素を取得
const createNumberedList = document.getElementById('createNumberedList');
const result = document.getElementById('result');

// ボタンをクリックしたときの処理
createNumberedList.addEventListener('click', function() {
    // resultの内容をクリア
    result.innerHTML = '';

    // 10回繰り返す
    for (let i = 1; i <= 10; i++) {
        // p要素を作成
        const p = document.createElement('p');
        p.textContent = i + '番目のアイテム';
        result.appendChild(p);
    }
});
```

このコードを実行すると、以下のような結果が表示されます。

```
1番目のアイテム
2番目のアイテム
3番目のアイテム
...
10番目のアイテム
```

**ループ変数`i`の値は、ループが回るたびに変化します。** 1回目のループでは`i`は1、2回目では2、3回目では3...というように増えていきます。この`i`の値を文字列と組み合わせることで、各要素に異なる番号を付けることができます。

`i + '番目のアイテム'` という部分は、数値と文字列を`+`で連結しています。これまで学んだように、数値と文字列を`+`でつなぐと、数値が自動的に文字列に変換されて連結されます。

## より実用的なリストの作成

番号付きリストをさらに発展させて、より実用的な例を見てみましょう。たとえば、ToDoリストのような形式でアイテムを表示することができます。

```javascript
// ボタン要素とresult要素を取得
const createTodoList = document.getElementById('createTodoList');
const result = document.getElementById('result');

// ボタンをクリックしたときの処理
createTodoList.addEventListener('click', function() {
    // resultの内容をクリア
    result.innerHTML = '';

    // 5つのタスクを表示
    for (let i = 1; i <= 5; i++) {
        // div要素を作成
        const div = document.createElement('div');
        div.textContent = '[ ] タスク' + i;
        result.appendChild(div);
    }
});
```

このコードは、チェックボックス風の記号とタスク番号を持つリストを作成します。

```
[ ] タスク1
[ ] タスク2
[ ] タスク3
[ ] タスク4
[ ] タスク5
```

**p要素の代わりにdiv要素を使っている**ことに注目してください。p要素もdiv要素も、どちらもテキストを表示するための要素です。p要素は段落を表し、div要素はより汎用的なコンテナです。今回の例では、どちらを使っても問題ありません。実際のアプリケーション開発では、用途に応じて適切な要素を選びます。

## ループの回数を変更する

ループの終了条件を変えることで、作成する要素の数を簡単に変更できます。

```javascript
// 20個のアイテムを作成
for (let i = 1; i <= 20; i++) {
    const p = document.createElement('p');
    p.textContent = i + '番目';
    result.appendChild(p);
}
```

このように、`i <= 20`という条件を変えるだけで、20個のアイテムを作成できます。もし100個必要なら`i <= 100`に変更すればよいのです。

**手作業で100個のHTML要素を書くのは大変ですが、プログラムなら一瞬です。** これがプログラミングの大きな利点の1つです。

## ループとDOMの組み合わせの応用

ループとDOM操作を組み合わせることで、さまざまな表現が可能になります。たとえば、カウントダウン表示や、要素にスタイルを付けることもできます。

```javascript
// カウントダウン形式で表示
for (let i = 10; i >= 1; i--) {
    const div = document.createElement('div');
    div.textContent = i;
    result.appendChild(div);
}
```

このコードは、10から1までカウントダウンする要素を作成します。前回のレッスンで学んだ逆順ループを応用しています。

また、ループ変数を使って要素にスタイルを適用することもできます。

```javascript
// 番号が大きいほど文字を大きくする
for (let i = 1; i <= 5; i++) {
    const p = document.createElement('p');
    p.textContent = 'テキスト' + i;
    p.style.fontSize = (10 + i * 2) + 'px';
    result.appendChild(p);
}
```

このコードでは、`i`の値に応じて文字サイズを変えています。1番目は12px、2番目は14px、3番目は16px...というように、だんだん文字が大きくなります。

**数式`10 + i * 2`を使って文字サイズを計算している**点に注目してください。これまで学んだ算術演算を、スタイル設定にも応用できます。

## 練習問題

### 課題

番号付きリストを作成するプログラムを実装してください。ボタンをクリックすると、1から20までの番号が付いたリストが表示されるようにします。

### 保存場所

`exercises/lesson-081/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. 要素を繰り返し作成
2. リストの自動生成
3. 番号付け

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-081
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

1. **HTML要素の準備**
   - ボタン要素には `id="createNumberedList"` を付けます
   - 結果を表示する領域には `id="result"` を付けます
   - この2つの要素をHTMLファイルに追加してください

2. **JavaScriptの実装**
   - まず `getElementById` を使ってボタンとresult要素を取得します
   - ボタンに `addEventListener` でクリックイベントを設定します
   - クリックされたら、まず `result.innerHTML = ''` で前回の結果をクリアします
   - その後、forループを使って1から20まで繰り返します

3. **要素の作成**
   - ループの中で `document.createElement('div')` を使って新しいdiv要素を作成します
   - `textContent` プロパティに、ループ変数`i`を使って「アイテム1」「アイテム2」のような文字列を設定します
   - 文字列の連結には `+` 演算子を使います（例：`'アイテム' + i`）
   - 作成した要素を `appendChild` でresultに追加します

4. **よくあるミス**
   - `createElement` を忘れて、要素を作成せずに `textContent` を設定しようとするエラー
   - ループの外で要素を作成してしまい、同じ要素が何度も上書きされてしまうミス
   - `appendChild` を忘れて、要素を作成しても画面に表示されないミス

5. **確認方法**
   - ブラウザで `index.html` を開き、ボタンをクリックしてみましょう
   - 画面に「アイテム1」から「アイテム20」まで表示されれば成功です
   - ボタンを何度クリックしても、前回の結果がクリアされて新しいリストが表示されることを確認してください

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 081</title>
</head>
<body>
    <h1>番号付きリスト</h1>
    <button id="createNumberedList">リストを作成</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// ボタン要素とresult要素を取得
const createNumberedList = document.getElementById('createNumberedList');
const result = document.getElementById('result');

// ボタンをクリックしたときの処理
createNumberedList.addEventListener('click', function() {
    // resultの内容をクリア
    result.innerHTML = '';

    // 1から20まで繰り返す
    for (let i = 1; i <= 20; i++) {
        // div要素を作成
        const div = document.createElement('div');
        div.textContent = 'アイテム' + i;
        result.appendChild(div);
    }
});
```

### 解説

このプログラムは、ループとDOM操作を組み合わせた基本的なパターンです。

**HTMLの構造:**
- `button` 要素でリスト作成のトリガーを作ります
- `div` 要素（id="result"）で結果の表示領域を用意します

**JavaScriptの処理の流れ:**

1. **要素の取得**: `getElementById` で必要な要素を取得します
2. **イベント設定**: `addEventListener` でボタンクリック時の処理を登録します
3. **クリア処理**: `innerHTML = ''` で前回の結果を削除します
4. **ループ処理**: `for`ループで1から20まで繰り返します
5. **要素作成**: ループの中で毎回新しい`div`要素を作成します
6. **内容設定**: `textContent` でループ変数`i`を使った文字列を設定します
7. **追加処理**: `appendChild` で作成した要素をresultに追加します

**ポイント:**

- **ループが回るたびに新しい要素が作られる**: `createElement`がループの中にあるため、ループが1回回るごとに新しいdiv要素が作成されます
- **ループ変数を活用**: `i`の値を使うことで、各要素に異なる番号を付けることができます
- **効率的な生成**: 20個の要素を手作業で書く必要がなく、数行のコードで実現できます

このパターンは、実際のWebアプリケーション開発でも頻繁に使われます。たとえば、サーバーから取得したデータの件数分だけ要素を作成する、といった処理に応用できます。

## まとめ

お疲れ様でした。今回のレッスンでは、ループとDOM操作を組み合わせた動的なHTML生成について学びました。

### 今回のキーポイント

1. **動的なHTML生成**
   - プログラムを使ってHTML要素を自動的に作成できます
   - `createElement`と`appendChild`をループの中で使うことで、複数の要素を効率的に生成できます
   - 手作業では大変な数の要素も、プログラムなら簡単に作成できます

2. **ループの実用例**
   - forループは単なる繰り返し処理だけでなく、実用的なアプリケーション開発に不可欠な技術です
   - TwitterのタイムラインやYouTubeの動画一覧など、実際のWebサイトでも同じ技術が使われています
   - ループ変数`i`を活用することで、各要素に異なる内容や番号を設定できます

3. **番号付け**
   - ループ変数を文字列と連結することで、各要素に番号を付けることができます
   - `i + '番目のアイテム'`のように、数値と文字列を`+`でつなぐと自動的に文字列として連結されます
   - 番号の開始位置や終了位置は、ループの初期値と条件を変更することで自由に設定できます

これまで学んできたループとDOM操作を組み合わせることで、より実用的で動的なWebアプリケーションが作れるようになりました。次回のレッスンでは、continue文を使ってループの処理をより細かく制御する方法を学びます。特定の条件のときだけ処理をスキップするテクニックを身に付けましょう。
