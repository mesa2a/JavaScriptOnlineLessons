---
title: "Lesson 012: 今週の復習"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 012: 今週の復習

---

## 今回の学習

### 前回の復習

前回は、`let` と `const` の使い分けを学びました。カウンターのように値が変わる変数には `let` を、消費税率のように変わらない値には `const` を使うことを確認しました。

### 今回の目標

1. 第1章で学んだ内容を振り返る
2. console.log、alert、変数の使い方を確認する
3. 学んだ知識を組み合わせて自己紹介ページを作る
4. 第1章の成果をまとめる

---

## 第1章で学んだこと

第1章では、JavaScriptの基礎を学びました。ここで学んだ内容を振り返りましょう。

### レッスン1-3：コンソールと基本操作

- **console.log()**：コンソールに文字や数値を表示する
- **文字列**：`"` で囲んだテキスト
- **四則演算**：`+`、`-`、`*`、`/` を使った計算
- **演算子の優先順位**：掛け算・割り算が先、括弧で順序を変更

### レッスン4-6：HTMLファイルとalert

- **HTMLファイル**：JavaScriptを保存して実行するためのファイル
- **scriptタグ**：HTMLの中でJavaScriptを書く場所
- **リロード**：ファイルを変更したらブラウザを再読み込み
- **alert()**：画面にポップアップを表示する
- **confirm()**：確認ダイアログを表示する

### レッスン7-9：変数と文字列操作

- **let**：変数を宣言するキーワード
- **変数**：データを保存する箱
- **命名規則**：英字で始める、キャメルケース
- **文字列の連結**：`+` で文字列をつなげる

### レッスン10-11：定数と使い分け

- **const**：変わらない値を宣言するキーワード
- **再代入**：`let` はできる、`const` はできない
- **使い分け**：変わる値は `let`、変わらない値は `const`
- **カウンター**：`counter = counter + 1` で値を増やす

---

## console.logの復習

### 基本の使い方

`console.log()` は、コンソールに値を出力します。

```javascript
console.log("Hello, World!");
console.log(100);
console.log(50 + 30);
```

### 変数の値を出力

変数に保存した値を出力できます。

```javascript
let name = "山田太郎";
console.log(name);
```

### 文字列と変数を連結して出力

```javascript
let age = 25;
console.log("年齢は" + age + "歳です");
```

### 確認問題

以下のコードの出力を予想してください。

```javascript
let a = 10;
let b = 20;
console.log(a + b);
console.log("a + b = " + (a + b));
```

**答え**

```
30
a + b = 30
```

1行目は数値の足し算で `30`、2行目は文字列連結で `"a + b = 30"` になります。

---

## alertの復習

### 基本の使い方

`alert()` は、画面にポップアップを表示します。

```javascript
alert("こんにちは");
alert(100);
```

### 変数の値を表示

```javascript
let message = "今日は良い天気です";
alert(message);
```

### console.logとの違い

| 項目 | console.log | alert |
|------|-------------|-------|
| 表示場所 | コンソール | 画面（ポップアップ） |
| 次の処理 | すぐに進む | OKを押すまで止まる |
| 用途 | デバッグ | ユーザーへの通知 |

### 確認問題

以下のコードを実行すると、何が起きますか。

```javascript
alert("1番目");
alert("2番目");
alert("3番目");
```

**答え**

3つのポップアップが順番に表示されます。1つ目の「OK」を押すと2つ目が表示され、2つ目の「OK」を押すと3つ目が表示されます。

---

## 変数の復習

### letとconst

```javascript
let counter = 0;      // 変わる値
const taxRate = 1.1;  // 変わらない値
```

### 変数を使った計算

```javascript
let price = 100;
let count = 3;
let total = price * count;
console.log(total);  // 300
```

### 文字列の連結

```javascript
let firstName = "山田";
let lastName = "太郎";
let fullName = firstName + lastName;
console.log(fullName);  // "山田太郎"
```

### カウンター

```javascript
let counter = 0;
counter = counter + 1;  // 1
counter = counter + 1;  // 2
counter = counter + 1;  // 3
```

### 確認問題

以下のコードで、`let` と `const` のどちらを使うべきか考えてください。

```javascript
??? pi = 3.14;
??? score = 0;
??? maxScore = 100;
```

**答え**

```javascript
const pi = 3.14;       // 円周率は変わらない
let score = 0;         // スコアは増える
const maxScore = 100;  // 最大値は変わらない
```

---

## 総合確認問題

### 問題1：税込価格の計算

消費税率10%で、以下の商品の税込価格を計算して表示してください。

- りんご：150円
- パン：200円
- 牛乳：180円

合計の税込価格も表示してください。

### 問題2：自己紹介文の作成

以下の情報を変数に保存し、自己紹介文を作成して表示してください。

- 名前
- 年齢
- 出身地
- 趣味

「○○は○○歳で、○○出身です。趣味は○○です。」の形式で表示してください。

### 問題3：カウントアップ

0から始めて5まで数え上げるプログラムを作成してください。各回の値を「カウント：○」の形式で表示してください。

---

## 自己紹介ページを作ろう

第1章で学んだすべての知識を使って、自己紹介ページを作成しましょう。

### 要件

1. 変数を使って個人情報を保存する
2. 定数を使って固定値を保存する
3. 文字列連結で文章を作成する
4. console.logとalertの両方で出力する
5. 計算を含める

### 完成例

```html
<script>
// 定数（変わらない値）
const currentYear = 2025;

// 変数（個人情報）
let name = "山田太郎";
let birthYear = 1998;
let city = "東京";
let hobby = "プログラミング";
let favoriteFood = "ラーメン";

// 年齢を計算
let age = currentYear - birthYear;

// 自己紹介文を作成
let intro1 = "私の名前は" + name + "です。";
let intro2 = birthYear + "年生まれの" + age + "歳です。";
let intro3 = city + "に住んでいます。";
let intro4 = "趣味は" + hobby + "で、好きな食べ物は" + favoriteFood + "です。";

// コンソールに出力
console.log("=== 自己紹介 ===");
console.log(intro1);
console.log(intro2);
console.log(intro3);
console.log(intro4);

// alertでも表示
alert(intro1);
alert(intro2);
alert(intro3);
alert(intro4);
alert("以上です。よろしくお願いします！");
</script>
```

### 出力結果（コンソール）

```
=== 自己紹介 ===
私の名前は山田太郎です。
1998年生まれの27歳です。
東京に住んでいます。
趣味はプログラミングで、好きな食べ物はラーメンです。
```

### カスタマイズのアイデア

自分だけの自己紹介ページにするために、以下を追加してみてください。

- 血液型
- 好きな色
- 将来の夢
- 今年の目標
- 学校や職業

---

## 第1章の成果まとめ

### できるようになったこと

第1章を終えて、以下のことができるようになりました。

**1. JavaScriptの実行環境を整える**

- ブラウザの開発者ツールを開ける
- HTMLファイルを作成してJavaScriptを書ける
- ファイルを保存してブラウザで実行できる

**2. 出力と通知**

- console.logでコンソールに出力できる
- alertで画面にポップアップを表示できる
- 用途に応じて使い分けられる

**3. データの操作**

- 変数（let）と定数（const）を使い分けられる
- 文字列と数値を扱える
- 四則演算ができる
- 文字列を連結できる

**4. 実用的なプログラム**

- 買い物計算ができる
- 消費税計算ができる
- カウンターが作れる
- 自己紹介ページが作れる

### 次の章に向けて

第2章では、「ブラウザを操作する」ことを学びます。

- HTMLの要素を取得する
- 要素の内容を変更する
- ボタンをクリックしたときに処理を実行する

第1章ではコンソールやalertで結果を表示していましたが、第2章ではWebページの中に直接結果を表示できるようになります。

---

## 練習問題

### 保存場所

`exercises/lesson-012/index.html` を使用してください。このファイルは既に用意されています。各課題のコードを `<script>` タグの中に入力し、ブラウザで開いて動作を確認しましょう。

### 課題1：総合確認問題の解答

上記の総合確認問題（問題1、2、3）を解いてください。

### 課題2：オリジナル自己紹介ページ

完成例を参考に、自分だけのオリジナル自己紹介ページを作成してください。以下の要素を含めてください。

- 最低5つの変数
- 最低1つの定数
- 最低1つの計算
- console.logとalertの両方での出力

### 課題3：買い物レシート

以下の買い物リストのレシートを作成してください。

- ノート：150円 × 2冊
- ペン：100円 × 3本
- 消しゴム：80円 × 1個
- 消費税率：10%

各商品の小計、合計（税抜）、税込合計を表示してください。

---

**解答例（総合確認問題 問題1）**

```html
<script>
const taxRate = 1.1;

let applePrice = 150;
let breadPrice = 200;
let milkPrice = 180;

let appleWithTax = applePrice * taxRate;
let breadWithTax = breadPrice * taxRate;
let milkWithTax = milkPrice * taxRate;

let total = applePrice + breadPrice + milkPrice;
let totalWithTax = total * taxRate;

console.log("りんご（税込）：" + appleWithTax + "円");
console.log("パン（税込）：" + breadWithTax + "円");
console.log("牛乳（税込）：" + milkWithTax + "円");
console.log("合計（税込）：" + totalWithTax + "円");
</script>
```

**解答例（総合確認問題 問題3）**

```html
<script>
let counter = 0;

counter = counter + 1;
console.log("カウント：" + counter);

counter = counter + 1;
console.log("カウント：" + counter);

counter = counter + 1;
console.log("カウント：" + counter);

counter = counter + 1;
console.log("カウント：" + counter);

counter = counter + 1;
console.log("カウント：" + counter);
</script>
```

---

## まとめ

### 今回学んだこと

**キーポイント1：第1章の総復習**

console.log、alert、変数（let/const）、文字列連結、計算など、第1章で学んだすべての内容を復習しました。

**キーポイント2：知識の組み合わせ**

個々の知識を組み合わせることで、自己紹介ページのような実用的なプログラムが作れることを確認しました。

**キーポイント3：第1章の成果**

JavaScriptの実行環境を整え、データを扱い、計算し、出力できるようになりました。

**キーポイント4：次の章への準備**

第2章では、ブラウザを操作してWebページに直接結果を表示する方法を学びます。

---
