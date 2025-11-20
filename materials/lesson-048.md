# レッスン48: 三項演算子

## このレッスンで学ぶこと

これまでif文とelse文を使って条件分岐を学んできました。今回は、条件式を1行で簡潔に書ける**三項演算子**を学びます。三項演算子は、単純な条件分岐を短く書きたい時に便利です。

## 三項演算子とは

三項演算子は、条件によって2つの値のどちらかを選択する演算子です。

### 基本構文

```javascript
条件 ? 真の場合の値 : 偽の場合の値
```

読み方: 「条件が真なら最初の値、偽なら2番目の値」

### if文との比較

```javascript
// if文を使った書き方
let age = 20;
let message;

if (age >= 18) {
  message = "成人です";
} else {
  message = "未成年です";
}

console.log(message);  // "成人です"
```

```javascript
// 三項演算子を使った書き方
let age = 20;
let message = age >= 18 ? "成人です" : "未成年です";

console.log(message);  // "成人です"
```

三項演算子を使うと、5行が1行になります。

## 基本的な使い方

### 例1: 年齢判定

```javascript
let age = 15;
let status = age >= 18 ? "成人" : "未成年";
console.log(status);  // "未成年"
```

### 例2: 合否判定

```javascript
let score = 85;
let result = score >= 60 ? "合格" : "不合格";
console.log(result);  // "合格"
```

### 例3: 偶数・奇数判定

```javascript
let number = 7;
let type = number % 2 === 0 ? "偶数" : "奇数";
console.log(type);  // "奇数"
```

## 変数代入以外での使い方

### 例1: 関数の引数として

```javascript
function greet(name) {
  console.log("こんにちは、" + name + "さん");
}

let userName = "";
greet(userName !== "" ? userName : "ゲスト");
// "こんにちは、ゲストさん"
```

### 例2: 直接表示

```javascript
let age = 20;

console.log(age >= 18 ? "成人です" : "未成年です");
// "成人です"
```

### 例3: テキスト埋め込み

```javascript
let count = 5;
let message = "リンゴが" + count + "個" + (count >= 10 ? "以上" : "未満") + "あります";
console.log(message);  // "リンゴが5個未満あります"
```

## 数値を返す場合

三項演算子は文字列だけでなく、数値も返せます。

### 例1: 割引計算

```javascript
let age = 70;
let price = 1000;
let discount = age >= 65 ? 0.2 : 0;
let finalPrice = price * (1 - discount);

console.log(finalPrice);  // 800
```

### 例2: 最小値

```javascript
let a = 10;
let b = 20;
let min = a < b ? a : b;

console.log(min);  // 10
```

### 例3: 絶対値

```javascript
let number = -5;
let absolute = number >= 0 ? number : -number;

console.log(absolute);  // 5
```

## ネストした三項演算子

三項演算子はネストできますが、読みにくくなるので注意が必要です。

### 例1: 3段階評価

```javascript
let score = 85;
let grade = score >= 90 ? "優" : score >= 60 ? "良" : "不可";

console.log(grade);  // "良"
```

これは以下のif文と同じです:

```javascript
let score = 85;
let grade;

if (score >= 90) {
  grade = "優";
} else if (score >= 60) {
  grade = "良";
} else {
  grade = "不可";
}
```

### 読みやすくする方法

ネストした三項演算子は改行すると読みやすくなります:

```javascript
let score = 85;
let grade = score >= 90 ? "優" :
            score >= 60 ? "良" :
            "不可";
```

## 実践問題

以下の要件を満たすプログラムを作成してください。

### 問題: 天気メッセージ

天気に応じたメッセージを表示するプログラムを作成してください。

**条件:**
- チェックボックスで「晴れている」かどうかを取得
- 晴れている場合: "外出日和です"
- 晴れていない場合: "傘を持っていきましょう"

**HTMLの構成:**
- id="isSunny" の input要素(type="checkbox"、晴れているか)
- id="result" の要素(結果表示用)

**動作:**
三項演算子を使ってメッセージを決定し、表示してください。

## 三項演算子を使う時のポイント

### 1. 単純な条件に使う

```javascript
// 良い例: 単純な条件
let status = isLoggedIn ? "ログイン済み" : "未ログイン";

// 悪い例: 複雑な条件
let status = (age >= 18 && hasTicket && !isBanned) || isVIP ? "OK" : "NG";
```

複雑な条件は、if文を使う方が読みやすいです。

### 2. 短い値に使う

```javascript
// 良い例: 短い値
let label = isActive ? "有効" : "無効";

// 悪い例: 長い値
let message = isError ?
  "エラーが発生しました。もう一度お試しください。問題が続く場合はサポートにお問い合わせください。" :
  "正常に処理されました。ご利用ありがとうございます。";
```

長い値の場合は、if文を使う方が読みやすいです。

### 3. 深いネストは避ける

```javascript
// 悪い例: 深いネスト
let result = a ? b ? c ? d : e : f : g;

// 良い例: if文を使う
let result;
if (a) {
  if (b) {
    result = c ? d : e;
  } else {
    result = f;
  }
} else {
  result = g;
}
```

## if文と三項演算子の使い分け

### 三項演算子が適している場合

- 単純な条件で値を選択する時
- 1行で書きたい時
- 変数への代入が目的の時

```javascript
let discount = isMember ? 0.1 : 0;
let label = count === 1 ? "個" : "個";
```

### if文が適している場合

- 複雑な条件の時
- 複数の処理を実行する時
- 読みやすさを優先する時

```javascript
if (age >= 18 && hasTicket && !isBanned) {
  console.log("入場できます");
  count = count + 1;
  logEntry(name);
} else {
  console.log("入場できません");
}
```

## 実用例

### 例1: ユーザー名表示

```javascript
function displayUserName() {
  const name = document.getElementById("name").value;
  const result = document.getElementById("result");

  // 名前が入力されていない場合は「ゲスト」
  const displayName = name !== "" ? name : "ゲスト";
  result.textContent = "ようこそ、" + displayName + "さん";
}
```

### 例2: ボタンラベル

```javascript
function toggleButton() {
  let isOn = false;
  const button = document.getElementById("toggleBtn");

  isOn = !isOn;
  button.textContent = isOn ? "オフにする" : "オンにする";
}
```

### 例3: カウント表示

```javascript
function showCount() {
  const count = 5;
  const result = document.getElementById("result");

  result.textContent = count + "件の" + (count === 1 ? "アイテム" : "アイテム");
}
```

## まとめ

- 三項演算子は `条件 ? 真の値 : 偽の値` の形式で書きます
- if-else文を1行で書ける便利な構文です
- 単純な条件に使うと読みやすいコードになります
- 複雑な条件やネストが深い場合は、if文を使う方が良いです
- 変数への代入や、値の選択に適しています
- 読みやすさを最優先に考えて使い分けましょう

次のレッスンでは、これまで学んだ条件分岐を組み合わせた週のプロジェクトに取り組みます。
