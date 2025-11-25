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
4. 時刻を表示する実用的なプログラムを作成できるようになる

**前回までの振り返り：**
- Lesson 013：要素を「取得する」方法を学んだ
- Lesson 014：1つの要素の文字を「変更する」方法を学んだ
- Lesson 015：複数の要素を「同時に操作する」方法を学ぶ ← **今回！**

---

## id属性の一意性

### id属性とは

id属性は、HTML要素に付ける「名札」のようなものです。この名札によって、JavaScriptから特定の要素を見つけることができます。

```html
<p id="message">こんにちは</p>
```

上記の例では、`id="message"`という名札を付けています。

**身近な例で理解する：**

図書館の本を考えてみましょう。
- 各本には「管理番号」（例：001、002、003）が付いている
- 司書さんは管理番号で特定の本を見つける
- もし同じ管理番号の本が2冊あったら、どちらを探せばいいか分からない

HTMLのid属性も、これと同じ役割を果たします。

### 一意性の重要性

id属性には、非常に重要なルールがあります。それは、**1つのHTMLファイルの中で、同じidは1つしか使えない**ということです。

**例え話1：学校のクラス**

クラスに同じ出席番号の生徒が2人いたら、先生が「出席番号5番」と呼んだとき、誰を呼んでいるのか分からなくなってしまいます。

**例え話2：マンションの部屋番号**

マンションに「101号室」が2つあったら、郵便配達の人が荷物をどちらに届ければいいか分からなくなります。

**HTMLでも同じ：**

HTMLでも同じidを複数の要素に付けると、JavaScriptがどの要素を取得すればいいのか分からなくなってしまいます。

**重要：** `document.getElementById("message")` は、最初に見つかった要素しか取得しません。2番目以降の同じidの要素は無視されます。

**✅ 良い例（それぞれ違うid）:**

```html
<p id="message1">1つ目</p>
<p id="message2">2つ目</p>
<p id="message3">3つ目</p>
```

それぞれに異なるid（`message1`、`message2`、`message3`）を付けているので、JavaScriptから個別に取得できます。

**❌ 悪い例（同じidが複数ある）:**

```html
<p id="message">1つ目</p>
<p id="message">2つ目</p>  <!-- ダメ！同じidは使えない -->
<p id="message">3つ目</p>  <!-- ダメ！同じidは使えない -->
```

この場合、`document.getElementById("message")` を実行すると、最初の要素（「1つ目」）しか取得できません。2番目と3番目の要素は操作できなくなります。

**デバッグのヒント：**

もし「要素が変更されない」というトラブルがあったら、同じidを使っていないか確認しましょう。ブラウザの開発者ツール（F12）でHTMLを見ると、重複しているidがあるかチェックできます。

### idの命名規則

idを付けるときは、以下のルールを守ります。

1. **分かりやすい名前を付ける**: `message1`、`title`、`result`など、内容が分かる名前
   ```html
   <p id="userAge">25歳</p>        <!-- ○ 何を表すか分かる -->
   <p id="a">25歳</p>              <!-- × 何を表すか分からない -->
   ```

2. **英数字とハイフン、アンダースコアが使える**: `user-name`、`user_age`など
   ```html
   <p id="user-name">山田太郎</p>   <!-- ○ ハイフン使用 -->
   <p id="user_age">25歳</p>        <!-- ○ アンダースコア使用 -->
   <p id="userName">山田太郎</p>    <!-- ○ キャメルケース -->
   <p id="user name">山田太郎</p>   <!-- × スペースは使えない -->
   ```

3. **数字から始めない**: `1message`ではなく`message1`
   ```html
   <p id="message1">こんにちは</p>  <!-- ○ 数字は途中や最後ならOK -->
   <p id="1message">こんにちは</p>  <!-- × 数字から始まっている -->
   ```

4. **大文字小文字を区別する**: `Message`と`message`は別のid
   ```html
   <p id="Message">こんにちは</p>
   <p id="message">こんばんは</p>
   ```
   この2つは違うidとして扱われますが、混乱を避けるため、できるだけ小文字で統一することをお勧めします。

**推奨される命名スタイル：**
- `kebab-case`（ケバブケース）：`user-name`、`main-title`
- `camelCase`（キャメルケース）：`userName`、`mainTitle`
- `snake_case`（スネークケース）：`user_name`、`main_title`

プロジェクト内で統一したスタイルを使うことが重要です。

---

## 複数要素の管理

### なぜ複数の要素が必要なのか

実際のWebサイトでは、1つの要素だけを操作することは稀です。

**実例：**
- **ニュースサイト**: タイトル、日付、本文、著者名など複数の要素を表示
- **ECサイト**: 商品名、価格、在庫状況、カート内の合計金額など
- **SNS**: 投稿内容、いいね数、コメント数、ユーザー名など

これらはすべて、複数の要素を個別に操作することで実現されています。

### 3つの要素を作成する

複数の要素を操作するには、まずHTMLに複数の要素を作成する必要があります。

```html
<p id="area1">エリア1</p>
<p id="area2">エリア2</p>
<p id="area3">エリア3</p>
```

この例では、3つの`<p>`要素を作成し、それぞれに異なるid（`area1`、`area2`、`area3`）を付けています。

**ポイント：**
- 要素の数だけ、異なるidが必要
- idは連番（`area1`、`area2`...）にしても、意味のある名前（`title`、`description`...）にしてもOK
- 後から要素を追加する可能性を考えて、拡張しやすい命名にすると良い

### それぞれの要素を取得する

次に、JavaScriptでそれぞれの要素を取得します。

```javascript
// 1つ目の要素を取得
const elem1 = document.getElementById("area1");

// 2つ目の要素を取得
const elem2 = document.getElementById("area2");

// 3つ目の要素を取得
const elem3 = document.getElementById("area3");
```

3つの異なる変数（`elem1`、`elem2`、`elem3`）に、それぞれの要素を保存しています。

**動作の流れ：**

1. **1行目：** ブラウザがHTML全体から`id="area1"`の要素を探し、見つかったら`elem1`に保存
2. **2行目：** 同様に`id="area2"`の要素を探し、`elem2`に保存
3. **3行目：** 同様に`id="area3"`の要素を探し、`elem3`に保存

**イメージ：**

```
HTML（ページ全体）
  ├── <p id="area1"> → elem1 に保存
  ├── <p id="area2"> → elem2 に保存
  └── <p id="area3"> → elem3 に保存
```

**重要：** 3つの変数は、それぞれ**独立**しています。`elem1`を変更しても、`elem2`や`elem3`には影響しません。

### それぞれの文字を変更する

取得した要素の文字を、個別に変更できます。

```javascript
// 3つの要素を取得
const elem1 = document.getElementById("area1");
const elem2 = document.getElementById("area2");
const elem3 = document.getElementById("area3");

// それぞれの文字を変更
elem1.textContent = "おはよう";
elem2.textContent = "こんにちは";
elem3.textContent = "こんばんは";
```

このコードを実行すると、画面の3つのエリアの文字が、それぞれ「おはよう」「こんにちは」「こんばんは」に変わります。

**実行前後の変化：**

```html
<!-- 実行前 -->
<p id="area1">エリア1</p>
<p id="area2">エリア2</p>
<p id="area3">エリア3</p>

<!-- 実行後 -->
<p id="area1">おはよう</p>
<p id="area2">こんにちは</p>
<p id="area3">こんばんは</p>
```

**ポイント：**
- 各要素は**独立して**変更される
- `elem1.textContent = "おはよう"` は `elem1` だけに影響する
- `elem2` や `elem3` は影響を受けない
- すべての変更が**同時に**（ほぼ瞬時に）画面に反映される

**応用例：**

この技術を使えば、以下のようなことができます：
- ユーザー名、メールアドレス、プロフィール写真など、複数の情報を一度に更新
- 商品の価格、在庫数、配送状況など、複数の情報を動的に表示
- ニュース記事のタイトル、日付、カテゴリなど、複数の項目を一括更新

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

## 時刻を表示する実用例

現在時刻を3つのエリアに分けて表示する例を見てみましょう。これは、デジタル時計を作る基礎となります。

### HTMLの準備

```html
<p id="hour">時</p>
<p id="minute">分</p>
<p id="second">秒</p>
```

3つの表示エリアを用意します。初期値として「時」「分」「秒」と表示しておきます（JavaScriptで上書きされます）。

### JavaScriptで時刻を表示

```javascript
// 3つの要素を取得
const hourElem = document.getElementById("hour");
const minuteElem = document.getElementById("minute");
const secondElem = document.getElementById("second");

// 現在時刻を取得（仮の値）
const currentHour = 14;    // 14時
const currentMinute = 30;  // 30分
const currentSecond = 45;  // 45秒

// それぞれの要素に時刻を表示
hourElem.textContent = currentHour + "時";
minuteElem.textContent = currentMinute + "分";
secondElem.textContent = currentSecond + "秒";
```

**実行結果：**

画面には以下のように表示されます：

```
14時
30分
45秒
```

**コードの解説：**

1. **1〜3行目：** 3つの要素を取得して、それぞれ専用の変数に保存
2. **6〜8行目：** 時刻のデータを変数に保存（ここでは仮の値を使用）
3. **11〜13行目：** 文字列連結（`+`）を使って、数値に「時」「分」「秒」を付けて表示

**文字列連結の復習：**

```javascript
currentHour + "時"
// ↓
14 + "時"
// ↓
"14時"
```

数値と文字列を`+`でつなぐと、自動的に文字列として結合されます。

**発展：実際の現在時刻を表示する**

実際の現在時刻を取得するには、JavaScriptの`Date`オブジェクトを使います（後のレッスンで学びます）：

```javascript
const now = new Date();
const currentHour = now.getHours();    // 現在の時
const currentMinute = now.getMinutes(); // 現在の分
const currentSecond = now.getSeconds(); // 現在の秒
```

この例では、時、分、秒をそれぞれ別の要素に表示しています。複数の要素を使うことで、情報を整理して表示できます。

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

**目標：** 複数の要素を個別に操作する技術を身につける

HTMLに3つの要素を作成し、それぞれの文字を異なる内容に変更してください。

### 保存場所

`exercises/lesson-015/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

**期待される結果：** ブラウザで開いたとき、3つの要素にそれぞれ異なる内容（好きな食べ物、好きな色、好きな季節）が表示されます。

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

---

## 解答例

### 解答例の全体像

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
const elem1 = document.getElementById("area1");
const elem2 = document.getElementById("area2");
const elem3 = document.getElementById("area3");

// それぞれの文字を変更
elem1.textContent = "ラーメン";
elem2.textContent = "青";
elem3.textContent = "春";
```

### 詳しい解説

**HTMLファイルの解説：**

9〜11行目で、3つの`<p>`要素を作成しています。

```html
<p id="area1">初期値1</p>  <!-- 1つ目の表示エリア -->
<p id="area2">初期値2</p>  <!-- 2つ目の表示エリア -->
<p id="area3">初期値3</p>  <!-- 3つ目の表示エリア -->
```

**ポイント：**
- それぞれに異なるid（`area1`、`area2`、`area3`）を付けている
- 初期値として「初期値1」「初期値2」「初期値3」と書いているが、JavaScriptで上書きされるため、最終的にはこれらは表示されない
- idは一意（ユニーク）でなければならない

**JavaScriptファイルの解説：**

**1. 要素の取得（2〜4行目）:**

```javascript
const elem1 = document.getElementById("area1");
const elem2 = document.getElementById("area2");
const elem3 = document.getElementById("area3");
```

- `getElementById()`を3回使って、それぞれの要素を異なる変数に保存
- `const`を使用（要素への参照は変更しないため）
- 変数名は`elem1`、`elem2`、`elem3`と連番にしている

**2. 文字の変更（7〜9行目）:**

```javascript
elem1.textContent = "ラーメン";  // area1 に「ラーメン」を表示
elem2.textContent = "青";        // area2 に「青」を表示
elem3.textContent = "春";        // area3 に「春」を表示
```

- それぞれの要素の`textContent`プロパティに新しい値を代入
- `elem1`には「ラーメン」（好きな食べ物）
- `elem2`には「青」（好きな色）
- `elem3`には「春」（好きな季節）

**実行の流れ：**

1. HTMLファイルが読み込まれる
2. 3つの`<p>`要素が作られる（初期値が表示される）
3. JavaScriptが実行される
4. 3つの要素が取得される
5. それぞれの`textContent`が変更される
6. 画面が更新され、新しい値が表示される

**最終的な表示：**

画面には以下のように表示されます：

```
ラーメン
青
春
```

**変数名の別解：**

より分かりやすい変数名を使うこともできます：

```javascript
const foodElem = document.getElementById("area1");
const colorElem = document.getElementById("area2");
const seasonElem = document.getElementById("area3");

foodElem.textContent = "ラーメン";
colorElem.textContent = "青";
seasonElem.textContent = "春";
```

このように、要素の役割を表す変数名にすると、コードがさらに読みやすくなります。

---

## まとめ

### 今回学んだこと

**キーポイント1：id属性の一意性**

1つのHTMLファイルの中で、同じidは1つしか使えません。これは非常に重要なルールです。

```html
<!-- ○ 正しい例：それぞれ異なるid -->
<p id="message1">1つ目</p>
<p id="message2">2つ目</p>
<p id="message3">3つ目</p>

<!-- × 間違った例：同じidが重複 -->
<p id="message">1つ目</p>
<p id="message">2つ目</p>  <!-- ダメ！ -->
```

複数の要素にidを付けるときは、必ず異なるidを付ける必要があります。これは、JavaScriptが要素を正しく識別するために重要なルールです。

**キーポイント2：複数要素の管理**

複数の要素を操作するには、以下の3ステップを踏みます：

```javascript
// ステップ1：それぞれの要素に異なるidを付ける（HTML側）
// <p id="area1">...</p>
// <p id="area2">...</p>
// <p id="area3">...</p>

// ステップ2：getElementById()で個別に取得
const elem1 = document.getElementById("area1");
const elem2 = document.getElementById("area2");
const elem3 = document.getElementById("area3");

// ステップ3：それぞれ別の変数に保存して個別に操作
elem1.textContent = "内容1";
elem2.textContent = "内容2";
elem3.textContent = "内容3";
```

**キーポイント3：分かりやすい変数名**

複数の要素を扱うときは、変数名を分かりやすくすることが大切です。

```javascript
// △ 悪くはないが、やや不明確
const elem1 = document.getElementById("title");
const elem2 = document.getElementById("description");

// ○ より分かりやすい
const titleElem = document.getElementById("title");
const descElem = document.getElementById("description");

// ◎ さらに分かりやすい
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
```

`elem1`、`elem2`よりも、`titleElem`、`descElem`のように、役割が分かる名前を付けると良いでしょう。

**キーポイント4：個別の操作**

取得した要素は、それぞれ独立して操作できます。

```javascript
elem1.textContent = "変更1";  // elem1 だけが変わる
elem2.textContent = "変更2";  // elem2 だけが変わる
elem3.textContent = "変更3";  // elem3 だけが変わる
```

`elem1.textContent`を変更しても、`elem2.textContent`や`elem3.textContent`には影響しません。これにより、ページの複数の部分を個別にコントロールできます。

---

### 今回の達成事項 ✅

- 複数のHTML要素を作成できるようになった
- それぞれの要素にユニークなidを付けられるようになった
- 複数の要素を個別に取得・操作できるようになった
- 時刻表示のような実用的なプログラムの基礎を理解した

### 次回予告

次回（Lesson 016）は、**要素の色を変える**方法を学びます！

- `style.color`で文字の色を変更
- `style.backgroundColor`で背景色を変更
- 虹色（7色）に変える実践的な演習
- お気に入りの配色でページをカラフルに装飾

複数の要素を操作できるようになった今、次は見た目をカラフルに変える方法を学びます。楽しみにしていてください！

**復習のポイント：**

今回学んだ「複数要素の管理」パターンは、今後すべてのレッスンで使います。

```javascript
// この3ステップのパターンが基本！
const elem1 = document.getElementById("id1");  // 取得1
const elem2 = document.getElementById("id2");  // 取得2
const elem3 = document.getElementById("id3");  // 取得3

elem1.textContent = "内容1";  // 変更1
elem2.textContent = "内容2";  // 変更2
elem3.textContent = "内容3";  // 変更3
```

お疲れ様でした。

---
