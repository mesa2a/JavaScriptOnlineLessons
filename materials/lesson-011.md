---
title: "Lesson 011: letとconstの使い分け"
author: "JavaScript学習教材"
date: "2025-11-21"
---

# Lesson 011: letとconstの使い分け

## 今回の学習

### 前回の復習

前回のレッスンでは、**定数（const）**について学びました。`const` を使うと変わらない値を定義でき、一度値を設定したら後から変更できません。再代入しようとするとエラーが発生することを確認しました。また、エラーメッセージの読み方も学び、エラーが出たときにどこが問題なのかを理解できるようになりました。消費税計算のプログラムを作成して、`const` の実用的な使い方を体験しました。

### 今回の目標

今回のレッスンでは、`let` と `const` をどのように使い分けるかを学びます。具体的には以下の3つを目標とします。

1. カウンター変数を使って、値が変化する仕組みを理解する
2. `counter = counter + 1` という式の意味を深く理解する
3. `let` と `const` を適切に使い分けられるようになる

これまで学んできた `let` と `const` の知識を総合的に活用して、実用的なプログラムを作成できるようになります。

## カウンターとは何か

### 日常生活のカウンター

プログラミングを学ぶ前に、まず日常生活でカウンターがどのように使われているか考えてみましょう。

**スーパーのレジ**では、お客さんが何人来たかを数えています。1人目、2人目、3人目...と数が増えていきます。これもカウンターです。

**野球の試合**では、得点を数えます。1点入るたびにスコアボードの数字が増えていきます。0点から始まり、1点、2点、3点と増えていくこの仕組みもカウンターです。

**動画サイトのYouTube**では、動画の再生回数が表示されます。動画が再生されるたびに、この数字が1ずつ増えていきます。100回、101回、102回...という具合です。

このように、「何かの回数や数量を数える」という処理は、私たちの身の回りにたくさん存在します。プログラミングでも、これと同じことを行います。

### プログラミングのカウンター

プログラミングにおけるカウンターは、「数を数える変数」のことです。最初は0（または1）から始まり、何かが起きるたびに1ずつ増えていきます。

```javascript
let counter = 0;
console.log(counter);  // 0

counter = counter + 1;
console.log(counter);  // 1

counter = counter + 1;
console.log(counter);  // 2

counter = counter + 1;
console.log(counter);  // 3
```

このコードを実行すると、コンソールには以下のように表示されます。

```
0
1
2
3
```

`counter` という変数が、0から始まって、1、2、3と増えていく様子がわかります。

### カウンターが使われる場面

プログラミングでは、以下のような場面でカウンターが使われます。

**Webサイトのアクセス数**を数えるとき、訪問者が来るたびにカウンターを1増やします。

**ショッピングサイト**で、カートに商品を追加するたびに商品の個数を1増やします。

**SNSのいいねボタン**が押されるたびに、いいねの数を1増やします。

**ゲーム**で、敵を倒すたびにスコアを増やします。

このように、カウンターは実際のWebアプリケーションやゲームで非常によく使われる基本的な仕組みです。

## counter = counter + 1 の意味

### 最初は不思議に見える式

`counter = counter + 1` という式を初めて見ると、多くの人が混乱します。数学を勉強してきた私たちにとって、この式は奇妙に見えるからです。

数学では、「x = x + 1」という式は成り立ちません。両辺から x を引くと「0 = 1」となってしまい、これは明らかに間違いです。

しかし、プログラミングでは `counter = counter + 1` は完全に正しい式です。なぜでしょうか。

### プログラミングの = は「代入」を意味する

プログラミングにおける `=` 記号は、数学の「等しい」という意味ではありません。**「右辺の値を左辺に代入する」**という意味です。

```javascript
counter = counter + 1;
```

この式は、以下のように読みます。

1. **右辺を計算する** - `counter + 1` の値を計算します
2. **左辺に代入する** - 計算した結果を `counter` に保存します

つまり、「counterの現在の値に1を足した結果を、counterに保存し直す」という意味です。

### 具体的な動作を追ってみる

`counter` の値が `5` のときに `counter = counter + 1` を実行すると、以下のように動作します。

**ステップ1: 右辺を計算**
```
counter + 1
↓
5 + 1
↓
6
```

**ステップ2: 左辺に代入**
```
counter = 6
```

結果として、`counter` の値は `5` から `6` に変わります。

### もう一つの例

`counter` が `0` から始まる場合を、さらに詳しく見てみましょう。

```javascript
let counter = 0;
console.log(counter);  // 0

// 1回目の実行
counter = counter + 1;
// 右辺: 0 + 1 = 1
// 左辺: counter = 1
console.log(counter);  // 1

// 2回目の実行
counter = counter + 1;
// 右辺: 1 + 1 = 2
// 左辺: counter = 2
console.log(counter);  // 2

// 3回目の実行
counter = counter + 1;
// 右辺: 2 + 1 = 3
// 左辺: counter = 3
console.log(counter);  // 3
```

このように、`counter = counter + 1` を実行するたびに、`counter` の値が1ずつ増えていきます。

### 他の演算もできる

1を足すだけでなく、他の演算もできます。

**2ずつ増やす**
```javascript
counter = counter + 2;
```

**10ずつ増やす**
```javascript
counter = counter + 10;
```

**1ずつ減らす（カウントダウン）**
```javascript
counter = counter - 1;
```

**2倍にする**
```javascript
counter = counter * 2;
```

このように、`変数 = 変数 + 数値` というパターンは、プログラミングで非常によく使われる基本的な形です。

## なぜカウンターに let を使うのか

### 値が変わるから let

カウンターは値が変わっていく変数です。0から1に、1から2に、2から3に...というように、どんどん値が更新されていきます。

**値が変わる変数には `let` を使います。**

```javascript
let counter = 0;       // 最初は0
counter = counter + 1; // 1に変わる
counter = counter + 1; // 2に変わる
counter = counter + 1; // 3に変わる
```

`let` で宣言した変数は、何度でも値を変更できます。これがカウンターに必要な性質です。

### const を使うとどうなるか

もし間違って `const` を使うとどうなるでしょうか。実際に試してみましょう。

```javascript
const counter = 0;
counter = counter + 1;  // エラー！
```

このコードを実行すると、以下のようなエラーメッセージが表示されます。

```
Uncaught TypeError: Assignment to constant variable.
```

「定数の変数に代入しようとしました」というエラーです。`const` は再代入できないので、`counter = counter + 1` の部分でエラーが発生します。

カウンターのように値が変わる変数には、必ず `let` を使う必要があります。

### let の重要性

このように、`let` は「値が変わる可能性がある変数」を宣言するときに使います。

プログラムの中で、以下のような変数には `let` を使います。

- カウンター（回数を数える変数）
- 合計値（金額などを足していく変数）
- 状態を表す値（開いているか閉じているか、など）

逆に、「一度設定したら変わらない値」には `const` を使います。これにより、プログラムの意図が明確になり、読みやすいコードになります。

## 最大値には const を使う

### カウンターの上限を設定する

実際のプログラムでは、カウンターに上限を設けることがよくあります。

たとえば、「10回までカウントする」「最大100点まで」「在庫は50個まで」といった具合です。

この上限値は、プログラムの実行中に変わることはありません。最初から最後まで同じ値のままです。

**変わらない値には `const` を使います。**

```javascript
const maxCount = 10;
let counter = 0;

counter = counter + 1;
console.log(counter + " / " + maxCount);  // "1 / 10"

counter = counter + 1;
console.log(counter + " / " + maxCount);  // "2 / 10"

counter = counter + 1;
console.log(counter + " / " + maxCount);  // "3 / 10"
```

このコードでは、`maxCount` は固定の上限値（10）で、`counter` は変化する値です。

### なぜ上限値に const を使うのか

上限値を `const` で定義することには、いくつかの利点があります。

**1. 意図を明確にする**

`const maxCount = 10` と書くことで、「この値は固定の上限値であり、変わらない」という意図が明確に伝わります。コードを読む人（未来の自分も含めて）が、この値の性質をすぐに理解できます。

**2. 間違いを防ぐ**

プログラムを書いている途中で、うっかり `maxCount = 5` のように上限値を変更してしまうミスを防げます。`const` で宣言しておけば、変更しようとしたときにエラーが出るので、間違いに気づけます。

**3. 変更が簡単**

もし将来、上限を10から20に変更したくなったとき、`const maxCount = 10` の部分だけを `const maxCount = 20` に変えれば済みます。プログラムの中で `10` という数字を直接使っていると、すべての箇所を探して変更しなければなりませんが、定数を使っていれば1箇所変えるだけで済みます。

### 実際の例：YouTubeの「次の動画」機能

YouTubeで動画を見ているとき、自動的に次の動画が再生される機能があります。この機能では、おそらく以下のような処理が行われています。

```javascript
const maxAutoPlayCount = 10;  // 自動再生は10本まで
let autoPlayCount = 0;         // 現在の再生回数

// 動画を1本再生するたびに
autoPlayCount = autoPlayCount + 1;

// 上限に達したかチェック
if (autoPlayCount >= maxAutoPlayCount) {
    console.log("自動再生を停止します");
}
```

このコードでは、`maxAutoPlayCount` という上限値を `const` で定義しています。YouTubeのポリシーとして「10本まで自動再生する」と決まっているなら、この値は変わりません。一方、`autoPlayCount` は動画を見るたびに増えていくので、`let` で宣言します。

## 使い分けの基準を理解する

### let を使う場合

以下のような値には `let` を使います。共通しているのは、「プログラムの実行中に値が変わる」という点です。

**カウンター（回数を数える）**

```javascript
let counter = 0;
counter = counter + 1;
counter = counter + 1;
console.log(counter);  // 2
```

ボタンがクリックされた回数、ページが表示された回数、商品が購入された回数など、何かの回数を数えるときに使います。

**合計値（金額などを足していく）**

```javascript
let total = 0;
total = total + 100;
total = total + 200;
total = total + 50;
console.log(total);  // 350
```

ショッピングカートの合計金額、1ヶ月の支出合計、ゲームのスコアなど、値を足していくときに使います。

**状態を表す値（条件によって変わる）**

```javascript
let isOpen = false;
// 何かの処理の後
isOpen = true;
console.log(isOpen);  // true
```

ドアが開いているか閉じているか、ユーザーがログインしているかどうか、メニューが表示されているかどうかなど、状態が変わる値に使います。

**入力値や計算途中の値**

```javascript
let inputValue = "";
// ユーザーが入力するたびに
inputValue = "こんにちは";
console.log(inputValue);  // "こんにちは"
```

ユーザーが入力する値や、計算の途中で変わる値などに使います。

### const を使う場合

以下のような値には `const` を使います。共通しているのは、「一度設定したら変わらない」という点です。

**数学的な定数**

```javascript
const pi = 3.14;
const e = 2.718;
```

円周率や自然対数の底など、普遍的な定数に使います。

**設定値や固定パラメータ**

```javascript
const maxCount = 10;
const taxRate = 1.1;
const siteName = "My Website";
const backgroundColor = "#ffffff";
```

プログラムの設定値、消費税率、サイト名、背景色など、プログラムの実行中に変わらない値に使います。

**一度計算したら変わらない値**

```javascript
const price = 100;
const count = 3;
const total = price * count;  // 計算後は変わらない
console.log(total);  // 300
```

計算結果を保存して、その後は変更しない場合に使います。

**APIのURLやキー**

```javascript
const apiUrl = "https://api.example.com/users";
const apiKey = "abc123xyz";
```

外部サービスのURLやAPIキーなど、固定の値に使います。

### 判断基準のフローチャート

どちらを使うか迷ったときは、以下のように考えます。

1. **この値は後で変わる可能性があるか？**
   - はい → `let` を使う
   - いいえ → 次の質問へ

2. **この値は計算結果や設定値か？**
   - はい → `const` を使う
   - わからない → `const` を使って、後で変更が必要になったら `let` に変える

前回も説明しましたが、**迷ったら `const` を使う**のがおすすめです。最初は `const` で宣言しておき、後から「再代入が必要だった」とわかったら `let` に変更すればよいのです。

この考え方は、実際のプロのプログラマーも使っています。`const` をデフォルトにすることで、意図しない変更を防ぎ、コードの品質を保つことができます。

## カウンターを作ろう

### 基本のカウンター

まずは、最もシンプルなカウンターを作ってみましょう。0から始めて、3回カウントアップします。

```html
<script>
let counter = 0;

console.log("カウント開始");
console.log("現在のカウント: " + counter);

counter = counter + 1;
console.log("現在のカウント: " + counter);

counter = counter + 1;
console.log("現在のカウント: " + counter);

counter = counter + 1;
console.log("現在のカウント: " + counter);

console.log("最終カウント: " + counter);
</script>
```

このコードを実行すると、以下のように表示されます。

```
カウント開始
現在のカウント: 0
現在のカウント: 1
現在のカウント: 2
現在のカウント: 3
最終カウント: 3
```

カウンターが0から3まで、1ずつ増えていく様子が確認できます。

### 上限付きカウンター

次に、上限を設定したカウンターを作ってみましょう。上限は `const` で定義します。

```html
<script>
const maxCount = 5;
let counter = 0;

console.log("目標: " + maxCount + "回");

counter = counter + 1;
console.log(counter + " / " + maxCount);

counter = counter + 1;
console.log(counter + " / " + maxCount);

counter = counter + 1;
console.log(counter + " / " + maxCount);

counter = counter + 1;
console.log(counter + " / " + maxCount);

counter = counter + 1;
console.log(counter + " / " + maxCount);

console.log("目標達成しました");
</script>
```

このコードを実行すると、以下のように表示されます。

```
目標: 5回
1 / 5
2 / 5
3 / 5
4 / 5
5 / 5
目標達成しました
```

「1 / 5」という表示は、「5回中の1回目」という意味です。進捗状況がわかりやすく表示されています。

### カウントダウンのカウンター

カウンターは増えるだけでなく、減らすこともできます。これを「カウントダウン」と呼びます。

```html
<script>
const initialCount = 10;
let counter = initialCount;

console.log("カウントダウン開始: " + counter);

counter = counter - 1;
console.log(counter);

counter = counter - 1;
console.log(counter);

counter = counter - 1;
console.log(counter);

console.log("残り: " + counter);
</script>
```

このコードを実行すると、以下のように表示されます。

```
カウントダウン開始: 10
9
8
7
残り: 7
```

ロケットの打ち上げ前のカウントダウンや、タイマーの残り時間表示などで使われる仕組みです。

## 実践的な使い分け例

### 例1: 買い物カート

実際のショッピングサイトのカート機能を想定したプログラムを作ってみましょう。

```html
<script>
// 設定値はconst（変わらない）
const taxRate = 1.1;        // 消費税率
const shippingFee = 500;    // 送料

// 変わる値はlet
let itemCount = 0;   // 商品の個数
let subtotal = 0;    // 小計

console.log("===== 買い物開始 =====");

// 商品を追加（300円の商品）
itemCount = itemCount + 1;
subtotal = subtotal + 300;
console.log("商品追加: 300円");
console.log("現在 " + itemCount + "点 / 小計 " + subtotal + "円");

// 商品を追加（500円の商品）
itemCount = itemCount + 1;
subtotal = subtotal + 500;
console.log("商品追加: 500円");
console.log("現在 " + itemCount + "点 / 小計 " + subtotal + "円");

// 商品を追加（200円の商品）
itemCount = itemCount + 1;
subtotal = subtotal + 200;
console.log("商品追加: 200円");
console.log("現在 " + itemCount + "点 / 小計 " + subtotal + "円");

// 最終計算（これ以降変わらないのでconst）
const totalWithTax = subtotal * taxRate;
const grandTotal = totalWithTax + shippingFee;

console.log("===== 会計 =====");
console.log("商品数: " + itemCount + "点");
console.log("小計: " + subtotal + "円");
console.log("税込: " + totalWithTax + "円");
console.log("送料: " + shippingFee + "円");
console.log("合計: " + grandTotal + "円");
</script>
```

このコードを実行すると、以下のように表示されます。

```
===== 買い物開始 =====
商品追加: 300円
現在 1点 / 小計 300円
商品追加: 500円
現在 2点 / 小計 800円
商品追加: 200円
現在 3点 / 小計 1000円
===== 会計 =====
商品数: 3点
小計: 1000円
税込: 1100円
送料: 500円
合計: 1600円
```

**このプログラムで使い分けを確認してみましょう**

- `taxRate`（消費税率）は `const` - プログラム実行中に変わりません
- `shippingFee`（送料）は `const` - 固定の料金です
- `itemCount`（商品個数）は `let` - 商品を追加するたびに増えます
- `subtotal`（小計）は `let` - 商品を追加するたびに金額が増えます
- `totalWithTax`（税込金額）は `const` - 計算後は変わりません
- `grandTotal`（合計金額）は `const` - 計算後は変わりません

このように、変わる値と変わらない値を明確に区別することで、プログラムの意図がわかりやすくなります。

### 例2: ゲームのスコアシステム

ゲームのスコアを管理するプログラムを作ってみましょう。

```html
<script>
// 設定値はconst
const maxScore = 100;       // 目標スコア
const bonusPoints = 10;     // ボーナスポイント
const penaltyPoints = 5;    // ペナルティポイント

// 変わる値はlet
let score = 0;

console.log("===== ゲーム開始 =====");
console.log("目標スコア: " + maxScore);
console.log("現在のスコア: " + score);

// ポイント獲得
score = score + 20;
console.log("20ポイント獲得 → 現在: " + score);

score = score + 15;
console.log("15ポイント獲得 → 現在: " + score);

// ボーナス獲得
score = score + bonusPoints;
console.log("ボーナス" + bonusPoints + "ポイント → 現在: " + score);

// ポイント獲得
score = score + 30;
console.log("30ポイント獲得 → 現在: " + score);

// ペナルティ
score = score - penaltyPoints;
console.log("ペナルティ-" + penaltyPoints + "ポイント → 現在: " + score);

console.log("===== ゲーム終了 =====");
console.log("最終スコア: " + score + " / " + maxScore);
</script>
```

このコードを実行すると、以下のように表示されます。

```
===== ゲーム開始 =====
目標スコア: 100
現在のスコア: 0
20ポイント獲得 → 現在: 20
15ポイント獲得 → 現在: 35
ボーナス10ポイント → 現在: 45
30ポイント獲得 → 現在: 75
ペナルティ-5ポイント → 現在: 70
===== ゲーム終了 =====
最終スコア: 70 / 100
```

このプログラムでは、`score` だけが `let` で、他はすべて `const` です。スコアだけが変化し、目標値やボーナス・ペナルティのポイント数は固定です。

### 例3: SNSのいいねカウンター

TwitterやInstagramのような「いいね」機能を想定したプログラムです。

```html
<script>
// 設定値
const userName = "山田太郎";
const postContent = "今日は良い天気ですね";

// 変わる値
let likeCount = 0;
let viewCount = 0;

console.log("投稿者: " + userName);
console.log("内容: " + postContent);
console.log("---");

// ユーザーAが閲覧
viewCount = viewCount + 1;
console.log("閲覧されました（閲覧数: " + viewCount + "）");

// ユーザーBが閲覧＆いいね
viewCount = viewCount + 1;
likeCount = likeCount + 1;
console.log("閲覧されました（閲覧数: " + viewCount + "）");
console.log("いいねされました（いいね: " + likeCount + "）");

// ユーザーCが閲覧
viewCount = viewCount + 1;
console.log("閲覧されました（閲覧数: " + viewCount + "）");

// ユーザーDが閲覧＆いいね
viewCount = viewCount + 1;
likeCount = likeCount + 1;
console.log("閲覧されました（閲覧数: " + viewCount + "）");
console.log("いいねされました（いいね: " + likeCount + "）");

console.log("---");
console.log("最終結果");
console.log("閲覧数: " + viewCount);
console.log("いいね: " + likeCount);
</script>
```

このコードを実行すると、以下のように表示されます。

```
投稿者: 山田太郎
内容: 今日は良い天気ですね
---
閲覧されました（閲覧数: 1）
閲覧されました（閲覧数: 2）
いいねされました（いいね: 1）
閲覧されました（閲覧数: 3）
閲覧されました（閲覧数: 4）
いいねされました（いいね: 2）
---
最終結果
閲覧数: 4
いいね: 2
```

このプログラムでは、投稿者名と投稿内容は変わらないので `const`、閲覧数といいね数は増えていくので `let` を使っています。

## コードの可読性とは

### 可読性の重要性

「可読性」という言葉を聞いたことがあるでしょうか。可読性とは、**コードの読みやすさ**のことです。

プログラミングでは、コードを書くことと同じくらい、コードを読むことが重要です。なぜなら、以下のような理由があるからです。

**自分のコードを後で読み返す**ことがあります。1ヶ月後、半年後に自分が書いたコードを見たとき、何をしているかすぐにわかるでしょうか。

**他の人がコードを読む**ことがあります。チームで開発する場合、他の人があなたのコードを読んで理解する必要があります。

**コードを修正する**ときに、まず既存のコードを読んで理解する必要があります。読みにくいコードは、修正も難しくなります。

可読性が高いコードは、これらすべての場面で役立ちます。

### let と const の使い分けが可読性を上げる

適切に `let` と `const` を使い分けることで、コードの可読性が大きく向上します。

**良い例（使い分けている）**

```javascript
const maxRetries = 3;   // これは設定値で変わらない
let retryCount = 0;     // これは変わる値だ
```

このコードを見ると、以下のことがすぐにわかります。

- `maxRetries` は固定の設定値（3回までリトライする）
- `retryCount` は処理の中で変わる値（現在何回リトライしたか）

**悪い例（すべて let）**

```javascript
let maxRetries = 3;
let retryCount = 0;
```

このコードでは、どちらが固定値でどちらが変わる値なのか、パッと見ではわかりません。プログラム全体を読んで、実際に値が変更されているかどうかを確認しなければなりません。

### 実際の例で比較

以下の2つのコードを比較してみましょう。

**悪い例（すべて let）**

```javascript
let pi = 3.14;
let radius = 5;
let area = pi * radius * radius;
```

**良い例（適切に使い分け）**

```javascript
const pi = 3.14;
const radius = 5;
const area = pi * radius * radius;
```

どちらも同じ結果になりますが、良い例の方が「これらの値はすべて変わらない」ということが明確です。

### 可読性を上げる他のポイント

`let` と `const` の使い分け以外にも、可読性を上げるポイントがあります。

**わかりやすい変数名を使う**

```javascript
// 悪い例
const x = 1.1;
let y = 0;

// 良い例
const taxRate = 1.1;
let totalPrice = 0;
```

**適切にコメントを付ける**

```javascript
// 消費税率（10%）
const taxRate = 1.1;

// 商品の合計金額
let totalPrice = 0;
```

これらのテクニックを組み合わせることで、非常に読みやすいコードになります。

## 練習問題

### 課題

カウンターを使ったプログラムを作成してください。カリキュラムの手順に従って、以下の3つのステップを実装します。

### 保存場所

`exercises/lesson-011/index.html` を使用してください。このファイルは既に用意されています。各課題のコードを `<script>` タグの中に入力し、ブラウザで開いて動作を確認しましょう。

### 手順

1. let counter = 0
2. counter = counter + 1
3. const maxCount = 10
4. 使い分けの練習

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-011
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

**ヒント1: カウンター変数の宣言**

まず、`let counter = 0;` でカウンター変数を宣言します。カウンターは値が変わるので `let` を使います。最初の値は0から始めましょう。

**ヒント2: カウンターを増やす**

`counter = counter + 1;` という式を使って、カウンターを1増やします。この式を何度か実行して、カウンターが増えていく様子を確認しましょう。各ステップで `console.log` を使って現在の値を表示すると、動きがよくわかります。

**ヒント3: 上限値の設定**

`const maxCount = 10;` で上限値を設定します。上限値は変わらないので `const` を使います。カウンターと上限値を一緒に表示すると、進捗状況がわかりやすくなります。たとえば `console.log(counter + " / " + maxCount);` のように書くと「3 / 10」のように表示されます。

**ヒント4: 使い分けの確認**

自分が書いたコードを見直して、以下を確認しましょう。

- 値が変わる変数には `let` を使っているか
- 値が変わらない変数には `const` を使っているか

もし迷ったら、「この変数は後で値が変わるか」を考えてみましょう。変わるなら `let`、変わらないなら `const` です。

**ヒント5: よくあるミス**

- `counter = counter + 1` を `counter = 1` と書いてしまうミス（これだと常に1になってしまいます）
- カウンターを `const` で宣言してしまうミス（エラーが出ます）
- 上限値を `let` で宣言してしまう（動きますが、意図が伝わりにくくなります）

### 解答例

```html
<script>
// カウンター変数を宣言（値が変わるのでlet）
let counter = 0;

// 上限値を設定（変わらないのでconst）
const maxCount = 10;

console.log("カウント開始");
console.log("目標: " + maxCount);

// カウンターを増やす
counter = counter + 1;
console.log(counter + " / " + maxCount);

counter = counter + 1;
console.log(counter + " / " + maxCount);

counter = counter + 1;
console.log(counter + " / " + maxCount);

console.log("現在のカウント: " + counter);
</script>
```

### 解説

このプログラムでは、`let` と `const` を適切に使い分けています。

**変数の宣言**

`let counter = 0;` でカウンター変数を宣言しています。カウンターは値が変わる変数なので `let` を使います。

`const maxCount = 10;` で上限値を宣言しています。上限値は固定の設定値なので `const` を使います。

**カウンターの増加**

`counter = counter + 1;` という式で、カウンターを1ずつ増やしています。この式は以下のように動作します。

1. 右辺の `counter + 1` を計算（現在の値に1を足す）
2. その結果を `counter` に代入（新しい値で上書き）

たとえば `counter` が2のとき、`counter = counter + 1` を実行すると、`2 + 1 = 3` が計算され、`counter` は3になります。

**進捗の表示**

`console.log(counter + " / " + maxCount);` で、「3 / 10」のような形式で進捗を表示しています。これにより、現在どこまで進んでいるかが一目でわかります。

**使い分けのポイント**

このプログラムでは、変わる値（`counter`）には `let`、変わらない値（`maxCount`）には `const` を使っています。この使い分けにより、コードを読む人が各変数の性質をすぐに理解できます。

## まとめ

お疲れ様でした。今回のレッスンでは、`let` と `const` の使い分けについて深く学びました。

### 今回のキーポイント

**1. カウンターの仕組み**

`counter = counter + 1` という式は、現在の値に1を足した結果を同じ変数に保存します。これにより、値を1ずつ増やすことができます。プログラミングの `=` は数学の「等しい」ではなく「代入」を意味します。右辺を計算してから左辺に代入するという流れを理解することが重要です。

カウンターは、Webサイトのアクセス数、SNSのいいね数、ゲームのスコアなど、実際のアプリケーションで非常によく使われる基本的な仕組みです。この仕組みを理解することで、より実用的なプログラムが作れるようになります。

**2. 使い分けの基準**

変わる値（カウンター、合計値、状態など）には `let` を使い、変わらない値（設定値、定数、計算結果など）には `const` を使います。

判断に迷ったときは、「この値は後で変わるか」を考えましょう。変わるなら `let`、変わらないなら `const` です。さらに迷ったら、まず `const` を使って、後で変更が必要になったら `let` に変えるのがおすすめです。

この使い分けは、プログラミングの基本中の基本です。しっかりと身に付けましょう。

**3. 可読性の向上**

適切に `let` と `const` を使い分けることで、コードを読む人が値の性質をすぐに理解できます。`const` で宣言された変数を見れば「これは変わらない値だ」とわかり、`let` で宣言された変数を見れば「これは変わる値だ」とわかります。

可読性の高いコードは、自分自身が後で読み返すときも、他の人が読むときも、理解しやすくなります。これは、プロのプログラマーにとって非常に重要なスキルです。

次回のレッスンでは、これまで学んできた内容を総復習します。`console.log`、`alert`、変数（`let` と `const`）などを組み合わせて、簡単な自己紹介ページを作成しましょう。
