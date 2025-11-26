---
title: "Lesson 081: ループとDOM"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン81：ループとDOM

## このレッスンで学ぶこと

このレッスンでは、**ループとDOM操作を組み合わせた動的なHTML生成**について学びます。

前回までのレッスンでは：
- レッスン77-80で、forループの基本から二重ループまで学びました
- レッスン56-66で、DOM操作でHTML要素を作成・操作する方法を学びました

今回は、これら2つの技術を組み合わせることで、**プログラムで自動的に複数のHTML要素を生成する方法**を習得します。

```javascript
// 前回までに学んだこと
// 【ループ】
for (let i = 1; i <= 5; i++) {
  console.log(i + "回目");  // コンソールに表示
}

// 【DOM操作】
const p = document.createElement("p");
p.textContent = "こんにちは";
document.body.appendChild(p);  // 1つの要素を追加

// 【今回学ぶこと：ループ + DOM】
for (let i = 1; i <= 5; i++) {
  const p = document.createElement("p");
  p.textContent = i + "番目のアイテム";
  document.body.appendChild(p);  // 5つの要素を自動生成！
}
```

**このレッスンで習得できること：**
- ループを使って複数のHTML要素を自動生成できる
- リストを動的に作成できる
- 各要素に番号や異なる内容を設定できる
- 実際のWebアプリケーションで使われる技術を理解できる

### 前回の復習

前回のレッスンでは、**二重ループ（ネストループ）**について学びました：

```javascript
// 二重ループで掛け算表を作成
for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    let answer = i * j;
    console.log(i + " × " + j + " = " + answer);
  }
}
```

**復習のポイント：**
- ✅ **forの中にfor**：ループの中にさらにループを書く
- ✅ **行と列の処理**：外側のループが「行」、内側のループが「列」
- ✅ **表の作成**：9×9=81回の計算で掛け算表を作成
- ✅ **成果物**：掛け算表の表示プログラム

### よくある場面

ループとDOM操作の組み合わせは、実際のWebサイトで非常によく使われています。

**例1：Twitterのタイムライン**
```
タイムラインには何十件、何百件ものツイートが表示されます。
これらを1つ1つ手作業でHTMLに書くのは不可能です。

プログラムがデータを受け取って、自動的にツイート要素を生成しています。
```

**例2：YouTubeの動画一覧**
```
検索結果には数百件、数千件の動画が表示されます。
各動画のサムネイル、タイトル、再生回数などの要素を
プログラムが自動生成しています。
```

**例3：Amazonの商品一覧**
```
数万点の商品を1つ1つHTMLで書くことは不可能です。
商品データベースから情報を取得して、
プログラムが自動的に商品カードを生成しています。
```

**例4：ToDoリストアプリ**
```
ユーザーがタスクを追加するたびに、
新しいリストアイテムが動的に生成されます。
```

**このレッスンで学ぶ技術は、これらすべてのWebサイトで使われている基本技術です。**

### 学習目標

今回のレッスンでは、以下の3つを習得します：

- ✅ **要素を繰り返し作成**：forループで同じ要素を複数回作成する
- ✅ **リストの自動生成**：プログラムで動的にリストを作る
- ✅ **番号付け**：ループ変数を使って各要素に番号を付ける
- ✅ **成果物**：1から20までの番号付きリストを作成する

## なぜループでHTML要素を作成するのか

### 手作業の限界

まず、手作業でHTMLを書く場合を考えてみましょう。

**5個のアイテムを手作業で書く場合：**
```html
<div>アイテム1</div>
<div>アイテム2</div>
<div>アイテム3</div>
<div>アイテム4</div>
<div>アイテム5</div>
```

5個ならまだ書けますが、**100個、1000個となったらどうでしょうか？**

**100個のアイテムを手作業で書く場合：**
```html
<div>アイテム1</div>
<div>アイテム2</div>
<div>アイテム3</div>
<!-- ...あと97個も書く必要がある... -->
<div>アイテム100</div>
```

**問題点：**
- ❌ 時間がかかる（100個書くのに何時間もかかる）
- ❌ ミスが起きやすい（番号を間違える、書き忘れる）
- ❌ 修正が大変（内容を変更するには100個すべて修正が必要）
- ❌ 数が変わると書き直し（101個にするには1個追加する必要がある）

### プログラムの利点

ループを使えば、数行のコードで何個でも要素を作成できます。

**100個のアイテムをプログラムで作る場合：**
```javascript
for (let i = 1; i <= 100; i++) {
  const div = document.createElement("div");
  div.textContent = "アイテム" + i;
  result.appendChild(div);
}
```

**たった5行のコードで100個の要素を作成できます！**

**プログラムの利点：**
- ✅ **速い**：一瞬で100個でも1000個でも作成できる
- ✅ **正確**：番号の間違いや書き忘れがない
- ✅ **修正が簡単**：内容を変更するには1箇所を直すだけ
- ✅ **柔軟**：条件を変えるだけで個数を自由に変更できる

**実際の比較：**
```
手作業：100個のアイテムを作るのに1時間
プログラム：100個のアイテムを作るのに0.001秒

手作業：1000個のアイテムを作るのに10時間
プログラム：1000個のアイテムを作るのに0.01秒
```

**この圧倒的な差が、プログラミングの価値です。**

## ループで要素を繰り返し作成する

### 最も基本的な例

まずは、最もシンプルな例から始めましょう。同じ要素を5回作成してみます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ループとDOM</title>
</head>
<body>
    <h1>ループとDOM</h1>
    <button id="createList">リストを作成</button>
    <div id="result"></div>

    <script>
        // ボタンとresult要素を取得
        const createList = document.getElementById("createList");
        const result = document.getElementById("result");

        // ボタンをクリックしたときの処理
        createList.addEventListener("click", function() {
            // 前回の結果をクリア
            result.innerHTML = "";

            // 5回繰り返す
            for (let i = 1; i <= 5; i++) {
                // p要素を作成
                const p = document.createElement("p");
                p.textContent = "アイテム";
                result.appendChild(p);
            }
        });
    </script>
</body>
</html>
```

**実行結果：**
```
アイテム
アイテム
アイテム
アイテム
アイテム
```

ボタンをクリックすると、「アイテム」という文字列を持つp要素が5個作成されます。

### コードの動作を詳しく見る

このコードがどのように動作するのか、1ステップずつ見ていきましょう。

**ボタンをクリックする前：**
```html
<div id="result"></div>
<!-- resultの中は空 -->
```

**ボタンをクリックした瞬間：**
```javascript
result.innerHTML = "";  // resultをクリア（今回は元々空）
```

**1回目のループ（i = 1）：**
```javascript
// 1. 新しいp要素を作成
const p = document.createElement("p");
// → メモリ上に <p></p> が作られる

// 2. テキストを設定
p.textContent = "アイテム";
// → <p>アイテム</p> になる

// 3. resultに追加
result.appendChild(p);
// → 画面に表示される
```

**画面の状態（1回目のループ後）：**
```html
<div id="result">
  <p>アイテム</p>
</div>
```

**2回目のループ（i = 2）：**
```javascript
// また新しいp要素を作成（1回目とは別の要素）
const p = document.createElement("p");
p.textContent = "アイテム";
result.appendChild(p);
```

**画面の状態（2回目のループ後）：**
```html
<div id="result">
  <p>アイテム</p>
  <p>アイテム</p>  ← 2個目が追加された
</div>
```

**3回目のループ（i = 3）：**
```javascript
const p = document.createElement("p");
p.textContent = "アイテム";
result.appendChild(p);
```

**画面の状態（3回目のループ後）：**
```html
<div id="result">
  <p>アイテム</p>
  <p>アイテム</p>
  <p>アイテム</p>  ← 3個目が追加された
</div>
```

**4回目のループ（i = 4）：**
```javascript
const p = document.createElement("p");
p.textContent = "アイテム";
result.appendChild(p);
```

**5回目のループ（i = 5）：**
```javascript
const p = document.createElement("p");
p.textContent = "アイテム";
result.appendChild(p);
```

**最終的な画面の状態：**
```html
<div id="result">
  <p>アイテム</p>
  <p>アイテム</p>
  <p>アイテム</p>
  <p>アイテム</p>
  <p>アイテム</p>
</div>
```

**6回目のチェック（i = 6）：**
```javascript
// i = 6のとき、i <= 5 は false
// → ループ終了
```

### 重要なポイント

**ポイント1：ループのたびに新しい要素が作られる**

`document.createElement("p")`がループの**中**にあるため、ループが1回回るごとに新しいp要素が作成されます。

```javascript
// ✓ 正しい：ループの中でcreateElement
for (let i = 1; i <= 5; i++) {
  const p = document.createElement("p");  // 毎回新しい要素
  p.textContent = "アイテム";
  result.appendChild(p);
}
// → 5個の別々のp要素が作られる

// ✗ 間違い：ループの外でcreateElement
const p = document.createElement("p");  // 1個だけ作成
for (let i = 1; i <= 5; i++) {
  p.textContent = "アイテム";
  result.appendChild(p);  // 同じ要素を5回追加しようとする
}
// → 実際には1個しか表示されない（同じ要素は1回しか追加できない）
```

**ポイント2：appendChildは要素を追加する**

`appendChild()`は、指定した要素を親要素の**末尾に追加**します。

```javascript
result.appendChild(p);  // resultの最後にpを追加
```

ループが回るたびに`appendChild()`が実行されるため、要素が次々と追加されていきます。

**ポイント3：前回の結果をクリアする**

```javascript
result.innerHTML = "";
```

ボタンを何度クリックしても、前回の結果が残らないように、最初にresultの中身を空にします。

**クリアしない場合：**
```
1回目のクリック：
アイテム
アイテム
アイテム
アイテム
アイテム

2回目のクリック：
アイテム
アイテム
アイテム
アイテム
アイテム
アイテム  ← さらに5個追加されて、合計10個になってしまう
アイテム
アイテム
アイテム
アイテム
```

**クリアする場合：**
```
1回目のクリック：
アイテム
アイテム
アイテム
アイテム
アイテム

2回目のクリック：
アイテム  ← 前回の結果をクリアして、また5個作成
アイテム
アイテム
アイテム
アイテム
```

## 番号付きリストの作成

同じ「アイテム」という文字列を5回表示するだけでは、あまり実用的ではありません。

各要素に**番号を付ける**ことで、より実用的なリストになります。

### ループ変数を使った番号付け

ループ変数`i`の値を使うと、各要素に番号を付けることができます。

```javascript
// ボタンとresult要素を取得
const createNumberedList = document.getElementById("createNumberedList");
const result = document.getElementById("result");

// ボタンをクリックしたときの処理
createNumberedList.addEventListener("click", function() {
    // 前回の結果をクリア
    result.innerHTML = "";

    // 10回繰り返す
    for (let i = 1; i <= 10; i++) {
        // p要素を作成
        const p = document.createElement("p");
        p.textContent = i + "番目のアイテム";  // ← iを使う！
        result.appendChild(p);
    }
});
```

**実行結果：**
```
1番目のアイテム
2番目のアイテム
3番目のアイテム
4番目のアイテム
5番目のアイテム
6番目のアイテム
7番目のアイテム
8番目のアイテム
9番目のアイテム
10番目のアイテム
```

### ループ変数の値の変化

ループ変数`i`の値は、ループが回るたびに変化します。

**動作の流れ：**

**1回目のループ（i = 1）：**
```javascript
p.textContent = i + "番目のアイテム";
// i = 1 なので
p.textContent = 1 + "番目のアイテム";
// → "1番目のアイテム"
```

**2回目のループ（i = 2）：**
```javascript
p.textContent = i + "番目のアイテム";
// i = 2 なので
p.textContent = 2 + "番目のアイテム";
// → "2番目のアイテム"
```

**3回目のループ（i = 3）：**
```javascript
p.textContent = i + "番目のアイテム";
// i = 3 なので
p.textContent = 3 + "番目のアイテム";
// → "3番目のアイテム"
```

**このように、`i`の値が変わるため、毎回異なる番号が表示されます。**

### 文字列の連結

`i + "番目のアイテム"`という部分は、**数値と文字列を`+`で連結**しています。

```javascript
let i = 1;
let text = i + "番目のアイテム";
// → "1番目のアイテム"
```

**JavaScriptの自動変換：**
- 数値と文字列を`+`でつなぐと、数値が自動的に文字列に変換されます
- `1 + "番目"`は`"1" + "番目"`になり、`"1番目"`という文字列になります

**連結のパターン：**
```javascript
// パターン1：番号を前に
i + "番目のアイテム"  // "1番目のアイテム"

// パターン2：番号を後ろに
"アイテム" + i  // "アイテム1"

// パターン3：複数の連結
"No." + i + ": " + "タスク"  // "No.1: タスク"
```

## より実用的なリストの作成

番号付きリストをさらに発展させて、実際のアプリケーションで使えそうな形式にしてみましょう。

### ToDoリスト風の表示

チェックボックス風の記号とタスク番号を持つリストを作成します。

```javascript
// ボタンとresult要素を取得
const createTodoList = document.getElementById("createTodoList");
const result = document.getElementById("result");

// ボタンをクリックしたときの処理
createTodoList.addEventListener("click", function() {
    // 前回の結果をクリア
    result.innerHTML = "";

    // 5つのタスクを表示
    for (let i = 1; i <= 5; i++) {
        // div要素を作成
        const div = document.createElement("div");
        div.textContent = "[ ] タスク" + i;
        result.appendChild(div);
    }
});
```

**実行結果：**
```
[ ] タスク1
[ ] タスク2
[ ] タスク3
[ ] タスク4
[ ] タスク5
```

**動作の流れ：**

**1回目のループ（i = 1）：**
```javascript
const div = document.createElement("div");
div.textContent = "[ ] タスク" + i;
// → "[ ] タスク1"
```

**2回目のループ（i = 2）：**
```javascript
const div = document.createElement("div");
div.textContent = "[ ] タスク" + i;
// → "[ ] タスク2"
```

**5回目まで繰り返すと、5つのタスクが表示されます。**

### p要素とdiv要素の違い

このコードでは、`p`要素の代わりに`div`要素を使っています。

**p要素とdiv要素の違い：**

| 要素 | 意味 | 用途 |
|-----|------|------|
| `<p>` | Paragraph（段落） | 文章の段落を表す |
| `<div>` | Division（区画） | 汎用的なコンテナ |

**使い分けの例：**
```html
<!-- p要素：文章の段落に使う -->
<p>これは1つの段落です。</p>
<p>これは別の段落です。</p>

<!-- div要素：リストアイテムなど汎用的に使う -->
<div>リストアイテム1</div>
<div>リストアイテム2</div>
```

**今回の例では、どちらを使っても問題ありません。**

実際のアプリケーション開発では、HTMLの意味（セマンティクス）を考えて適切な要素を選びます。

## ループの回数を変更する

ループの条件を変えることで、作成する要素の数を簡単に変更できます。

### 20個のアイテムを作成

```javascript
// 20回繰り返す
for (let i = 1; i <= 20; i++) {
    const p = document.createElement("p");
    p.textContent = i + "番目";
    result.appendChild(p);
}
```

**`i <= 20`という条件を変えるだけで、20個のアイテムを作成できます。**

**実行結果：**
```
1番目
2番目
3番目
...
18番目
19番目
20番目
```

### 100個のアイテムを作成

```javascript
// 100回繰り返す
for (let i = 1; i <= 100; i++) {
    const p = document.createElement("p");
    p.textContent = i + "番目";
    result.appendChild(p);
}
```

**`i <= 100`に変更するだけで、100個のアイテムを作成できます。**

**手作業で100個のHTML要素を書くのは大変ですが、プログラムなら条件を変えるだけで一瞬です！**

### 柔軟な個数設定

変数を使うと、さらに柔軟に個数を変更できます。

```javascript
// 個数を変数で管理
let count = 50;  // この数字を変えるだけで個数を変更できる

for (let i = 1; i <= count; i++) {
    const p = document.createElement("p");
    p.textContent = i + "番目";
    result.appendChild(p);
}
```

**`count`の値を変えるだけで、作成する要素の数を変更できます。**

```javascript
let count = 10;   // 10個作成
let count = 50;   // 50個作成
let count = 1000; // 1000個作成
```

## ループとDOMの組み合わせの応用

ループとDOM操作を組み合わせることで、さまざまな表現が可能になります。

### カウントダウン表示

数を減らしていくループを使うと、カウントダウン表示ができます。

```javascript
// 10から1までカウントダウン
for (let i = 10; i >= 1; i--) {
    const div = document.createElement("div");
    div.textContent = i;
    result.appendChild(div);
}
```

**実行結果：**
```
10
9
8
7
6
5
4
3
2
1
```

**ロケット発射のカウントダウン風：**
```javascript
for (let i = 10; i >= 1; i--) {
    const div = document.createElement("div");
    div.textContent = i;
    result.appendChild(div);
}

// ループが終わったら「発射！」を追加
const launch = document.createElement("div");
launch.textContent = "🚀 発射！";
result.appendChild(launch);
```

**実行結果：**
```
10
9
8
7
6
5
4
3
2
1
🚀 発射！
```

### ループ変数を使ったスタイル設定

ループ変数`i`を使って、要素にスタイルを適用することもできます。

**例1：番号が大きいほど文字を大きくする**
```javascript
for (let i = 1; i <= 5; i++) {
    const p = document.createElement("p");
    p.textContent = "テキスト" + i;
    p.style.fontSize = (10 + i * 2) + "px";
    result.appendChild(p);
}
```

**計算の流れ：**
```
i = 1: fontSize = 10 + 1 * 2 = 12px
i = 2: fontSize = 10 + 2 * 2 = 14px
i = 3: fontSize = 10 + 3 * 2 = 16px
i = 4: fontSize = 10 + 4 * 2 = 18px
i = 5: fontSize = 10 + 5 * 2 = 20px
```

**実行結果のイメージ：**
```
テキスト1  （12px）
テキスト2  （14px）
テキスト3   （16px）
テキスト4    （18px）
テキスト5     （20px）
```

文字がだんだん大きくなります！

**例2：偶数と奇数で色を変える**
```javascript
for (let i = 1; i <= 10; i++) {
    const p = document.createElement("p");
    p.textContent = i + "番目";

    // 偶数なら青、奇数なら赤
    if (i % 2 === 0) {
        p.style.color = "blue";
    } else {
        p.style.color = "red";
    }

    result.appendChild(p);
}
```

**実行結果のイメージ：**
```
1番目  （赤）
2番目  （青）
3番目  （赤）
4番目  （青）
5番目  （赤）
...
```

**数式`10 + i * 2`のような計算式を使って、動的にスタイルを変更できます。**

### 実用例：優先度付きタスクリスト

ループ変数を使って、各タスクに優先度を表示することもできます。

```javascript
for (let i = 1; i <= 5; i++) {
    const div = document.createElement("div");

    // 優先度を設定（1が最高優先度）
    let priority = "優先度：";
    if (i === 1) {
        priority += "★★★（最優先）";
    } else if (i <= 3) {
        priority += "★★（高）";
    } else {
        priority += "★（通常）";
    }

    div.textContent = priority + " タスク" + i;
    result.appendChild(div);
}
```

**実行結果：**
```
優先度：★★★（最優先） タスク1
優先度：★★（高） タスク2
優先度：★★（高） タスク3
優先度：★（通常） タスク4
優先度：★（通常） タスク5
```

## 練習問題

### 課題

番号付きリストを作成するプログラムを実装してください。

**要件：**
- ボタンをクリックすると、1から20までの番号が付いたリストが表示される
- 各アイテムは「アイテム1」「アイテム2」...「アイテム20」と表示される
- ボタンを何度クリックしても、前回の結果がクリアされて新しいリストが表示される

### 保存場所

`exercises/lesson-081/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

この課題では、以下の3つの技術を使います：

1. **要素を繰り返し作成**：`createElement()`をループの中で使う
2. **リストの自動生成**：ループで20個の要素を作る
3. **番号付け**：ループ変数`i`を使って各要素に番号を付ける

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-081
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：HTML要素の準備**

まず、HTMLファイルに必要な要素を追加します。

```html
<!-- 必要な要素 -->
<button id="createNumberedList">リストを作成</button>
<div id="result"></div>
```

- ボタン要素には `id="createNumberedList"` を付ける
- 結果を表示する領域には `id="result"` を付ける

**ヒント2：JavaScriptの基本構造**

JavaScriptファイルには、以下の構造でコードを書きます。

```javascript
// 1. 要素を取得
const createNumberedList = document.getElementById("createNumberedList");
const result = document.getElementById("result");

// 2. イベントリスナーを設定
createNumberedList.addEventListener("click", function() {
    // 3. 前回の結果をクリア
    result.innerHTML = "";

    // 4. ループで要素を作成
    for (let i = 1; i <= 20; i++) {
        // ここに要素を作成するコードを書く
    }
});
```

**ヒント3：要素の作成**

ループの中で、以下の3つのステップを実行します。

```javascript
// ステップ1：要素を作成
const div = document.createElement("div");

// ステップ2：内容を設定（iを使う！）
div.textContent = "アイテム" + i;

// ステップ3：resultに追加
result.appendChild(div);
```

**ヒント4：文字列の連結**

ループ変数`i`と文字列を連結します。

```javascript
// 方法1：+演算子で連結
div.textContent = "アイテム" + i;

// 方法2：テンプレートリテラル（どちらでもOK）
div.textContent = `アイテム${i}`;
```

**ヒント5：よくあるミス**

**ミス1：createElementをループの外に書く**
```javascript
// ✗ 間違い
const div = document.createElement("div");  // ループの外
for (let i = 1; i <= 20; i++) {
    div.textContent = "アイテム" + i;
    result.appendChild(div);
}
// → 1個しか表示されない

// ✓ 正しい
for (let i = 1; i <= 20; i++) {
    const div = document.createElement("div");  // ループの中
    div.textContent = "アイテム" + i;
    result.appendChild(div);
}
// → 20個表示される
```

**ミス2：appendChildを忘れる**
```javascript
// ✗ 間違い
for (let i = 1; i <= 20; i++) {
    const div = document.createElement("div");
    div.textContent = "アイテム" + i;
    // appendChild を忘れている！
}
// → 何も表示されない

// ✓ 正しい
for (let i = 1; i <= 20; i++) {
    const div = document.createElement("div");
    div.textContent = "アイテム" + i;
    result.appendChild(div);  // 追加を忘れない！
}
```

**ミス3：iを使わない**
```javascript
// ✗ 間違い
for (let i = 1; i <= 20; i++) {
    const div = document.createElement("div");
    div.textContent = "アイテム";  // iを使っていない
    result.appendChild(div);
}
// → すべて「アイテム」と表示される（番号がない）

// ✓ 正しい
for (let i = 1; i <= 20; i++) {
    const div = document.createElement("div");
    div.textContent = "アイテム" + i;  // iを使う
    result.appendChild(div);
}
// → 「アイテム1」「アイテム2」...と表示される
```

**ヒント6：確認方法**

ブラウザで `index.html` を開いて、以下を確認してください：

1. ボタンをクリックすると、「アイテム1」から「アイテム20」まで表示される
2. ボタンを再度クリックすると、前回の結果がクリアされて新しいリストが表示される
3. 20個のアイテムがすべて表示される

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
const createNumberedList = document.getElementById("createNumberedList");
const result = document.getElementById("result");

// ボタンをクリックしたときの処理
createNumberedList.addEventListener("click", function() {
    // resultの内容をクリア
    result.innerHTML = "";

    // 1から20まで繰り返す
    for (let i = 1; i <= 20; i++) {
        // div要素を作成
        const div = document.createElement("div");
        div.textContent = "アイテム" + i;
        result.appendChild(div);
    }
});
```

### 解説

このプログラムは、ループとDOM操作を組み合わせた基本的なパターンです。

**HTMLの構造：**

```html
<button id="createNumberedList">リストを作成</button>
<div id="result"></div>
```

- `button`要素：リスト作成のトリガー
- `div`要素（id="result"）：結果の表示領域

**JavaScriptの処理の流れ：**

**1. 要素の取得**
```javascript
const createNumberedList = document.getElementById("createNumberedList");
const result = document.getElementById("result");
```

`getElementById()`で必要な要素を取得します。

**2. イベント設定**
```javascript
createNumberedList.addEventListener("click", function() {
    // クリック時の処理
});
```

ボタンがクリックされたときの処理を登録します。

**3. クリア処理**
```javascript
result.innerHTML = "";
```

前回の結果を削除して、画面をきれいにします。

**4. ループ処理**
```javascript
for (let i = 1; i <= 20; i++) {
    // 20回繰り返す
}
```

1から20まで繰り返します。

**5. 要素作成**
```javascript
const div = document.createElement("div");
```

ループの中で毎回新しい`div`要素を作成します。

**6. 内容設定**
```javascript
div.textContent = "アイテム" + i;
```

ループ変数`i`を使って、各要素に異なる番号を付けます。

**7. 追加処理**
```javascript
result.appendChild(div);
```

作成した要素をresultに追加します。

**全体の実行の流れ：**

```
ボタンクリック
  ↓
resultをクリア
  ↓
ループ開始（i = 1）
  ↓
div要素を作成
  ↓
textContentに"アイテム1"を設定
  ↓
resultに追加
  ↓
（i = 2に進む）
  ↓
div要素を作成
  ↓
textContentに"アイテム2"を設定
  ↓
resultに追加
  ↓
... （20回繰り返す）
  ↓
ループ終了
```

**ポイント：**

**ポイント1：ループのたびに新しい要素が作られる**

`createElement`がループの**中**にあるため、ループが1回回るごとに新しいdiv要素が作成されます。

```javascript
// ループの中でcreateElement
for (let i = 1; i <= 20; i++) {
    const div = document.createElement("div");  // 毎回新しい要素
    // ...
}
// → 20個の別々のdiv要素が作られる
```

**ポイント2：ループ変数を活用**

`i`の値を使うことで、各要素に異なる番号を付けることができます。

```javascript
div.textContent = "アイテム" + i;
// i = 1 → "アイテム1"
// i = 2 → "アイテム2"
// ...
// i = 20 → "アイテム20"
```

**ポイント3：効率的な生成**

20個の要素を手作業で書く必要がなく、数行のコードで実現できます。

```javascript
// たった7行で20個の要素を作成
for (let i = 1; i <= 20; i++) {
    const div = document.createElement("div");
    div.textContent = "アイテム" + i;
    result.appendChild(div);
}
```

**応用：個数を変更する**

条件を変えるだけで、簡単に個数を変更できます。

```javascript
// 50個作成
for (let i = 1; i <= 50; i++) {
    const div = document.createElement("div");
    div.textContent = "アイテム" + i;
    result.appendChild(div);
}

// 100個作成
for (let i = 1; i <= 100; i++) {
    const div = document.createElement("div");
    div.textContent = "アイテム" + i;
    result.appendChild(div);
}
```

**このパターンは、実際のWebアプリケーション開発でも頻繁に使われます。**

たとえば、サーバーから取得したデータの件数分だけ要素を作成する、といった処理に応用できます。

## まとめ

お疲れ様でした。今回のレッスンでは、ループとDOM操作を組み合わせた動的なHTML生成について学びました。

### 学んだこと

**1. ループでHTML要素を作成する意味**

**手作業の限界：**
- 100個、1000個の要素を手作業で書くのは不可能
- 時間がかかり、ミスが起きやすく、修正が大変

**プログラムの利点：**
- 数行のコードで何個でも要素を作成できる
- 一瞬で正確に、柔軟に個数を変更できる

**2. 基本的な要素の繰り返し作成**

```javascript
for (let i = 1; i <= 5; i++) {
    const p = document.createElement("p");
    p.textContent = "アイテム";
    result.appendChild(p);
}
```

- ✅ カリキュラム要件：要素を繰り返し作成
- `createElement`をループの中で使う
- ループのたびに新しい要素が作られる
- `appendChild`で要素を追加する

**3. 番号付きリストの作成**

```javascript
for (let i = 1; i <= 10; i++) {
    const p = document.createElement("p");
    p.textContent = i + "番目のアイテム";
    result.appendChild(p);
}
```

- ✅ カリキュラム要件：リストの自動生成
- ✅ カリキュラム要件：番号付け
- ループ変数`i`を使って各要素に番号を付ける
- 数値と文字列を`+`で連結する
- 各要素に異なる内容を設定できる

**4. ループの回数を変更**

```javascript
// 20個作成
for (let i = 1; i <= 20; i++) { ... }

// 100個作成
for (let i = 1; i <= 100; i++) { ... }
```

- 条件を変えるだけで個数を変更できる
- 変数を使うとさらに柔軟に管理できる

**5. 応用：カウントダウンやスタイル設定**

```javascript
// カウントダウン
for (let i = 10; i >= 1; i--) {
    const div = document.createElement("div");
    div.textContent = i;
    result.appendChild(div);
}

// スタイル設定
for (let i = 1; i <= 5; i++) {
    const p = document.createElement("p");
    p.textContent = "テキスト" + i;
    p.style.fontSize = (10 + i * 2) + "px";
    result.appendChild(p);
}
```

- ループ変数を使ってスタイルを動的に変更できる
- 計算式を使って値を生成できる

**6. 成果物：番号付きリスト**

```javascript
// 1から20までの番号付きリスト
for (let i = 1; i <= 20; i++) {
    const div = document.createElement("div");
    div.textContent = "アイテム" + i;
    result.appendChild(div);
}
```

- ✅ カリキュラム要件：成果物：番号付きリスト
- 練習問題で実装完了

### カリキュラム要件の達成

- ✅ **要素を繰り返し作成**：`createElement()`をループで使う
- ✅ **リストの自動生成**：forループで複数の要素を生成
- ✅ **番号付け**：ループ変数`i`で各要素に番号を付ける
- ✅ **知識：動的なHTML生成**：プログラムで自動的に要素を作成
- ✅ **知識：ループの実用例**：実際のWebサイトでの活用方法を理解
- ✅ **成果物：番号付きリスト**：1から20までのリストを作成

### 重要なポイント

**ポイント1：createElementはループの中に**

```javascript
// ✓ 正しい
for (let i = 1; i <= 5; i++) {
    const p = document.createElement("p");  // ループの中
    // ...
}

// ✗ 間違い
const p = document.createElement("p");  // ループの外
for (let i = 1; i <= 5; i++) {
    // ...
}
```

**ポイント2：ループ変数を活用**

```javascript
// iの値を使って各要素を区別する
p.textContent = "アイテム" + i;
```

**ポイント3：前回の結果をクリア**

```javascript
// ボタンを何度クリックしても大丈夫なように
result.innerHTML = "";
```

**ポイント4：appendChildを忘れない**

```javascript
// 要素を作っても、追加しないと表示されない
result.appendChild(div);
```

### ループとDOM操作のパターン

**基本パターン：**
```javascript
// 1. 前回の結果をクリア
result.innerHTML = "";

// 2. ループで繰り返す
for (let i = 1; i <= count; i++) {
    // 3. 要素を作成
    const element = document.createElement("タグ名");

    // 4. 内容を設定
    element.textContent = "内容" + i;

    // 5. 追加
    result.appendChild(element);
}
```

**このパターンは、実際のWebアプリケーション開発で非常によく使います。**

### 実際のWebサイトでの活用

今回学んだ技術は、以下のような実際のWebサイトで使われています：

- **Twitter**：タイムラインのツイートを自動生成
- **YouTube**：動画一覧を自動生成
- **Amazon**：商品一覧を自動生成
- **ToDoアプリ**：タスクリストを自動生成

**プログラムがデータを受け取って、自動的にHTML要素を生成しています。**

### 次のステップ

次のレッスンでは、**continue文**について学びます。ループの処理をより細かく制御する方法を理解していきましょう。

特定の条件のときだけ処理をスキップする技術を身に付けることで、より柔軟なプログラムが書けるようになります。

ループとDOM操作の組み合わせは、実際のWebアプリケーション開発で不可欠な技術です。今回学んだパターンは、今後のプログラミングで何度も使うことになります。

**練習問題を解いて、しっかりマスターしましょう！**
