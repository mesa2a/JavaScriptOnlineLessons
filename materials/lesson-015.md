---
title: "Lesson 015: 複数の要素を操作する"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 015: 複数の要素を操作する

---

## 今回の学習

### 前回の復習

前回は、`textContent`プロパティを使って、HTML要素の文字を動的に変更する方法を学びました。`getElementById()`で要素を取得し、`textContent`に新しい文字列を代入することで、画面の表示をリアルタイムで変更できるようになりました。

### 今回の目標

1. 複数のHTML要素を作成できるようになる
2. それぞれの要素にユニークなidを付けられるようになる
3. 複数の要素の文字を個別に変更できるようになる

---

## id属性の一意性

### id属性とは

id属性は、HTML要素に付ける「名札」のようなものです。この名札によって、JavaScriptから特定の要素を見つけることができます。

```html
<p id="message">こんにちは</p>
```

上記の例では、`id="message"`という名札を付けています。

### 一意性の重要性

id属性には、非常に重要なルールがあります。それは、**1つのHTMLファイルの中で、同じidは1つしか使えない**ということです。

これは、学校のクラスで考えると分かりやすいです。クラスに同じ出席番号の生徒が2人いたら、先生が「出席番号5番」と呼んだとき、誰を呼んでいるのか分からなくなってしまいます。

同じように、HTMLでも同じidを複数の要素に付けると、JavaScriptがどの要素を取得すればいいのか分からなくなってしまいます。

**良い例（それぞれ違うid）:**

```html
<p id="message1">1つ目</p>
<p id="message2">2つ目</p>
<p id="message3">3つ目</p>
```

**悪い例（同じidが複数ある）:**

```html
<p id="message">1つ目</p>
<p id="message">2つ目</p>  <!-- ダメ！同じidは使えない -->
<p id="message">3つ目</p>  <!-- ダメ！同じidは使えない -->
```

### idの命名規則

idを付けるときは、以下のルールを守ります。

1. **分かりやすい名前を付ける**: `message1`、`title`、`result`など、内容が分かる名前
2. **英数字とハイフン、アンダースコアが使える**: `user-name`、`user_age`など
3. **数字から始めない**: `1message`ではなく`message1`
4. **大文字小文字を区別する**: `Message`と`message`は別のid

---

## 複数要素の管理

### 3つの要素を作成する

複数の要素を操作するには、まずHTMLに複数の要素を作成する必要があります。

```html
<p id="area1">エリア1</p>
<p id="area2">エリア2</p>
<p id="area3">エリア3</p>
```

この例では、3つの`<p>`要素を作成し、それぞれに異なるid（`area1`、`area2`、`area3`）を付けています。

### それぞれの要素を取得する

次に、JavaScriptでそれぞれの要素を取得します。

```javascript
// 1つ目の要素を取得
let elem1 = document.getElementById("area1");

// 2つ目の要素を取得
let elem2 = document.getElementById("area2");

// 3つ目の要素を取得
let elem3 = document.getElementById("area3");
```

3つの異なる変数（`elem1`、`elem2`、`elem3`）に、それぞれの要素を保存しています。

### それぞれの文字を変更する

取得した要素の文字を、個別に変更できます。

```javascript
// 1つ目の要素を取得
let elem1 = document.getElementById("area1");
let elem2 = document.getElementById("area2");
let elem3 = document.getElementById("area3");

// それぞれの文字を変更
elem1.textContent = "おはよう";
elem2.textContent = "こんにちは";
elem3.textContent = "こんばんは";
```

このコードを実行すると、画面の3つのエリアの文字が、それぞれ「おはよう」「こんにちは」「こんばんは」に変わります。

---

## 実践：3つの表示エリアを作る

### 完成イメージ

以下のような、3つの表示エリアを持つページを作ります。

```
タイトル
説明文
結果
```

そして、JavaScriptでそれぞれの文字を変更します。

### 手順1：HTMLで3つの要素を作る

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 015</title>
</head>
<body>
    <p id="title">タイトル</p>
    <p id="description">説明文</p>
    <p id="result">結果</p>

    <script src="script.js"></script>
</body>
</html>
```

3つの`<p>`要素を作り、それぞれに`title`、`description`、`result`というidを付けました。

### 手順2：JavaScriptで要素を取得する

```javascript
// 3つの要素を取得
let titleElem = document.getElementById("title");
let descElem = document.getElementById("description");
let resultElem = document.getElementById("result");
```

それぞれの要素を取得し、分かりやすい変数名で保存します。

### 手順3：文字を変更する

```javascript
// 3つの要素を取得
let titleElem = document.getElementById("title");
let descElem = document.getElementById("description");
let resultElem = document.getElementById("result");

// それぞれの文字を変更
titleElem.textContent = "自己紹介";
descElem.textContent = "私の名前は山田太郎です。";
resultElem.textContent = "よろしくお願いします。";
```

これで、3つのエリアの文字が、それぞれ新しい内容に変わります。

---

## 変数名の付け方

### 分かりやすい変数名

複数の要素を扱うときは、変数名を分かりやすくすることが大切です。

**良い例:**

```javascript
let titleElem = document.getElementById("title");
let descElem = document.getElementById("description");
let resultElem = document.getElementById("result");
```

変数名から、どの要素を表しているのかが分かります。

**悪い例:**

```javascript
let a = document.getElementById("title");
let b = document.getElementById("description");
let c = document.getElementById("result");
```

`a`、`b`、`c`では、何を表しているのか分かりません。

### 命名のコツ

1. **要素の役割を表す名前**: `titleElem`、`messageElem`など
2. **統一感を持たせる**: 全て`〜Elem`で終わらせるなど
3. **長すぎない**: `thisIsTheTitleElement`ではなく`titleElem`

---

## 時刻を表示する例

現在時刻を3つのエリアに分けて表示する例を見てみましょう。

### HTMLの準備

```html
<p id="hour">時</p>
<p id="minute">分</p>
<p id="second">秒</p>
```

### JavaScriptで時刻を表示

```javascript
// 3つの要素を取得
let hourElem = document.getElementById("hour");
let minuteElem = document.getElementById("minute");
let secondElem = document.getElementById("second");

// 現在時刻を取得（仮の値）
let currentHour = 14;    // 14時
let currentMinute = 30;  // 30分
let currentSecond = 45;  // 45秒

// それぞれの要素に時刻を表示
hourElem.textContent = currentHour + "時";
minuteElem.textContent = currentMinute + "分";
secondElem.textContent = currentSecond + "秒";
```

この例では、時、分、秒をそれぞれ別の要素に表示しています。

---

## よくある間違いと注意点

### 間違い1：同じidを複数使う

```html
<!-- これは間違い -->
<p id="message">1つ目</p>
<p id="message">2つ目</p>
<p id="message">3つ目</p>
```

同じidを使うと、`getElementById()`は最初の要素しか取得できません。必ず違うidを付けてください。

### 間違い2：idの指定ミス

```javascript
// HTMLには id="title" があるのに、違うidで取得しようとする
let elem = document.getElementById("titel");  // スペルミス（elが間違い）
```

idの指定は大文字小文字も含めて完全に一致している必要があります。

### 間違い3：変数の使い間違い

```javascript
let elem1 = document.getElementById("area1");
let elem2 = document.getElementById("area2");

// elem1の文字を変えたいのに、elem2を使ってしまう
elem2.textContent = "変更";  // 間違い
```

どの変数がどの要素を表しているのか、しっかり確認しましょう。

---

## 練習問題

### 課題：3つの表示エリアを作成する

HTMLに3つの要素を作成し、それぞれの文字を異なる内容に変更してください。

### 保存場所

`exercises/lesson-015/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. `index.html` に3つの`<p>`要素を追加します
   - 1つ目：`id="area1"`
   - 2つ目：`id="area2"`
   - 3つ目：`id="area3"`
2. `script.js` で3つの要素を取得します
3. それぞれの要素の`textContent`を変更します
   - area1: 好きな食べ物
   - area2: 好きな色
   - area3: 好きな季節

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-015
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1：HTMLの書き方**

3つの`<p>`要素を作り、それぞれに異なるidを付けます。

```html
<p id="area1">初期値1</p>
<p id="area2">初期値2</p>
<p id="area3">初期値3</p>
```

**ヒント2：要素の取得**

3つの変数を用意して、それぞれの要素を取得します。

```javascript
let elem1 = document.getElementById("area1");
let elem2 = document.getElementById("area2");
let elem3 = document.getElementById("area3");
```

**ヒント3：文字の変更**

それぞれの変数の`textContent`を変更します。

```javascript
elem1.textContent = "ラーメン";
elem2.textContent = "青";
elem3.textContent = "春";
```

**ヒント4：確認方法**

ブラウザで`index.html`を開いて、3つのエリアに設定した文字が表示されているか確認してください。

---

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 015</title>
</head>
<body>
    <p id="area1">初期値1</p>
    <p id="area2">初期値2</p>
    <p id="area3">初期値3</p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// 3つの要素を取得
let elem1 = document.getElementById("area1");
let elem2 = document.getElementById("area2");
let elem3 = document.getElementById("area3");

// それぞれの文字を変更
elem1.textContent = "ラーメン";
elem2.textContent = "青";
elem3.textContent = "春";
```

### 解説

**HTMLファイル:**

9行目から11行目で、3つの`<p>`要素を作成しています。それぞれに`area1`、`area2`、`area3`という異なるidを付けています。

初期値として「初期値1」「初期値2」「初期値3」と書いていますが、JavaScriptで上書きされるため、最終的には表示されません。

**JavaScriptファイル:**

2行目から4行目で、3つの要素を取得しています。`getElementById()`を3回使って、それぞれの要素を異なる変数に保存しています。

7行目から9行目で、それぞれの要素の`textContent`を変更しています。

- `elem1`には「ラーメン」（好きな食べ物）
- `elem2`には「青」（好きな色）
- `elem3`には「春」（好きな季節）

を設定しています。

このコードを実行すると、画面には「ラーメン」「青」「春」の3つが表示されます。

---

## まとめ

### 今回学んだこと

**キーポイント1：id属性の一意性**

1つのHTMLファイルの中で、同じidは1つしか使えません。複数の要素にidを付けるときは、必ず異なるidを付ける必要があります。これは、JavaScriptが要素を正しく識別するために重要なルールです。

**キーポイント2：複数要素の管理**

複数の要素を操作するには、それぞれの要素に異なるidを付け、`getElementById()`で個別に取得します。取得した要素は、それぞれ別の変数に保存することで、個別に操作できます。

**キーポイント3：分かりやすい変数名**

複数の要素を扱うときは、変数名を分かりやすくすることが大切です。`elem1`、`elem2`よりも、`titleElem`、`descElem`のように、役割が分かる名前を付けると良いでしょう。

**キーポイント4：個別の操作**

取得した要素は、それぞれ独立して操作できます。`elem1.textContent`を変更しても、`elem2.textContent`には影響しません。これにより、ページの複数の部分を個別にコントロールできます。

---

### 次回の学習

次回は、要素の色を変える方法を学びます。`style.color`や`style.backgroundColor`を使って、ページをカラフルに装飾できるようになります。楽しみにしていてください。

お疲れ様でした。
