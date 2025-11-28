# Lesson 116: ローカル変数

**作成日: 2025-11-26**

---

## このレッスンで学ぶこと

### 前回の復習
前回のレッスンでは、**デフォルト引数**について学びました：

```javascript
// デフォルト引数の基本
function greet(name = 'ゲスト') {
  alert('こんにちは、' + name + 'さん');
}

greet();        // 「こんにちは、ゲストさん」
greet('太郎');  // 「こんにちは、太郎さん」
```

デフォルト引数を使うことで、引数が省略された場合のデフォルト値を設定できるようになりました。

### よくある場面
プログラミングをしていると、こんな疑問が出てきます：

- 「この変数、関数の外から使えるの？」
- 「同じ名前の変数を使ったら、ぶつかっちゃう？」
- 「関数の中の変数は、どこまで使えるの？」

例えば、こんなコードを書いたとき：

```javascript
function calculate() {
  const result = 100 + 200;
  console.log(result);  // 300
}

calculate();
console.log(result);  // これ、動く？エラー？
```

`result`は関数の外でも使えるのでしょうか？

### 学習目標
このレッスンでは：
- ✅ **ローカル変数**の概念を理解する
- ✅ 関数内で宣言した変数が**外から見えない**ことを理解する
- ✅ 名前の**衝突を回避**する方法を理解する
- ✅ 変数の**スコープ**（有効範囲）を理解する

---

## 1. ローカル変数とは？

### 日常生活のアナロジー：個室の机の引き出し

ローカル変数を理解するために、**個室の机の引き出し**をイメージしてみましょう：

```
個室A（関数A）
┌──────────────┐
│  机の引き出し │
│  ・メモ帳    │  ← Aさんだけが使える
│  ・ペン      │
│  ・電卓      │
└──────────────┘

個室B（関数B）
┌──────────────┐
│  机の引き出し │
│  ・メモ帳    │  ← Bさんだけが使える
│  ・ペン      │
│  ・電卓      │
└──────────────┘
```

- 各個室の中にある机の引き出しは、**その部屋にいる人だけ**が使えます
- Aさんの引き出しと、Bさんの引き出しは**別物**です
- 同じ名前の文房具（「メモ帳」など）があっても、**ぶつかりません**

関数の中で宣言した変数も、これと同じです。

### 基本的な定義

関数の**中**で宣言した変数は、**その関数の中でのみ**使えます。これを**ローカル変数**（局所変数、local variable）と言います。

```javascript
function test() {
  const message = 'こんにちは';  // ローカル変数
  console.log(message);  // OK：関数の中なので使える
}

test();  // 「こんにちは」と表示される
console.log(message);  // エラー！messageは関数の外では使えない
```

### 実行フロー図解

```
プログラムの実行フロー
═══════════════════════════════════════

1. test関数が呼ばれる
   ┌─────────────────────┐
   │ function test()     │
   │ {                   │
   │   const message =   │ ← messageが作られる
   │     'こんにちは';   │   （この関数の中だけで有効）
   │                     │
   │   console.log()     │ ← messageを使える
   │ }                   │
   └─────────────────────┘
   関数が終わると、messageは消える

2. test関数の外
   console.log(message);  ← messageはもう存在しない
                             エラー！
```

### なぜエラーになるのか？

関数の中で宣言した変数（ローカル変数）は、**その関数が実行されている間だけ**存在します：

1. 関数が呼ばれる → ローカル変数が**作られる**
2. 関数の処理が実行される → ローカル変数が**使える**
3. 関数が終了する → ローカル変数が**消える**

関数の外からは、その変数にアクセスできません。

---

## 2. なぜローカル変数が必要なのか？

### 理由1：名前の衝突を防ぐ

ローカル変数を使うと、**同じ名前の変数**を異なる関数で使っても、ぶつかりません：

```javascript
function greetMorning() {
  const message = 'おはよう';  // greetMorning関数のローカル変数
  console.log(message);
}

function greetEvening() {
  const message = 'こんばんは';  // greetEvening関数のローカル変数（別物）
  console.log(message);
}

greetMorning();  // 「おはよう」
greetEvening();  // 「こんばんは」
```

### 実行フロー図解：名前の衝突が起きない理由

```
メモリ上のイメージ
═══════════════════════════════════════

greetMorning()が実行されている間
┌───────────────────────┐
│ greetMorning関数      │
│ ┌─────────────────┐  │
│ │ message:        │  │ ← この関数専用のmessage
│ │ 'おはよう'      │  │
│ └─────────────────┘  │
└───────────────────────┘

greetEvening()が実行されている間
┌───────────────────────┐
│ greetEvening関数      │
│ ┌─────────────────┐  │
│ │ message:        │  │ ← この関数専用のmessage
│ │ 'こんばんは'    │  │   （上のmessageとは別物）
│ └─────────────────┘  │
└───────────────────────┘
```

各関数の`message`は**別々のローカル変数**なので、同じ名前でも衝突しません。

### 理由2：一時的な計算に使える

関数の中で、**途中計算用の変数**を気軽に作れます：

```javascript
function calculateTotal(price, quantity) {
  // これらは全てローカル変数（この関数の中でのみ使える）
  const subtotal = price * quantity;    // 小計
  const tax = subtotal * 0.1;          // 消費税
  const total = subtotal + tax;        // 合計

  return total;
}

const result = calculateTotal(100, 5);
console.log(result);  // 550

// console.log(subtotal);  // エラー！subtotalは関数の外では使えない
// console.log(tax);       // エラー！taxは関数の外では使えない
```

### 実行フロー図解：一時変数の使用

```
calculateTotal(100, 5)の実行
═══════════════════════════════════════

1. 関数が呼ばれる
   price = 100
   quantity = 5

2. ローカル変数が順番に作られる
   ┌─────────────────────┐
   │ subtotal = 100 * 5  │
   │          = 500      │ ← 小計を計算
   └─────────────────────┘

   ┌─────────────────────┐
   │ tax = 500 * 0.1     │
   │     = 50            │ ← 消費税を計算
   └─────────────────────┘

   ┌─────────────────────┐
   │ total = 500 + 50    │
   │       = 550         │ ← 合計を計算
   └─────────────────────┘

3. totalをreturnする
   return 550;

4. 関数が終了する
   subtotal、tax、totalは全て消える
```

### 理由3：独立性と安全性

各関数が**独立して動作**するので、他の関数の影響を受けません：

```javascript
function calcA() {
  const value = 10;  // calcA専用のvalue
  return value * 2;
}

function calcB() {
  const value = 20;  // calcB専用のvalue（calcAのvalueとは別物）
  return value * 2;
}

console.log(calcA());  // 20
console.log(calcB());  // 40
```

どちらの関数も`value`という変数を使っていますが、それぞれ**別々のローカル変数**なので、お互いに影響しません。

---

## 3. 引数もローカル変数

関数の**引数**も、ローカル変数として扱われます：

```javascript
function greet(name) {  // nameはローカル変数
  console.log('こんにちは、' + name + 'さん');
}

greet('太郎');  // 「こんにちは、太郎さん」
// console.log(name);  // エラー！nameは関数の外では使えない
```

### 実行フロー図解：引数とローカル変数

```
greet('太郎')の実行
═══════════════════════════════════════

1. 関数が呼ばれる
   引数'太郎'が渡される

2. ローカル変数nameが作られる
   ┌─────────────────────┐
   │ function greet(name)│
   │ {                   │
   │   name = '太郎'     │ ← 引数として受け取った値が
   │                     │   ローカル変数nameに入る
   │   console.log(...)  │
   │ }                   │
   └─────────────────────┘

3. 関数が終了する
   nameは消える
```

引数`name`は、関数が呼ばれたときに**自動的に作られるローカル変数**です。

### 引数と通常のローカル変数の組み合わせ

```javascript
function add(a, b) {  // a, bはローカル変数
  const result = a + b;  // resultもローカル変数
  return result;
}

const answer = add(5, 3);
console.log(answer);  // 8

// console.log(a);      // エラー！
// console.log(b);      // エラー！
// console.log(result); // エラー！
```

関数の中では、**引数**も**const/letで宣言した変数**も、どちらもローカル変数です。

---

## 4. ブロックスコープ

`if`や`for`などの**ブロック**（`{}`で囲まれた範囲）の中で宣言した変数も、そのブロックの中でのみ使えます：

```javascript
function test() {
  if (true) {
    const message = 'ブロック内';  // ifブロックのローカル変数
    console.log(message);  // OK：ブロック内なので使える
  }

  // console.log(message);  // エラー！messageはブロックの外では使えない
}
```

### ブロックスコープの実行フロー図解

```
test関数の実行
═══════════════════════════════════════

function test() {
  ┌───────────────────┐ ← test関数のスコープ
  │                   │
  │ if (true) {       │
  │   ┌───────────┐  │ ← ifブロックのスコープ
  │   │ message = │  │
  │   │ 'ブロック内'│  │
  │   │           │  │
  │   │ console.log │   messageが使える範囲
  │   └───────────┘  │
  │ }                 │
  │                   │ ← ここではmessageは使えない
  │ console.log()     │   （ifブロックの外だから）
  └───────────────────┘
}
```

### より複雑な例：forループ

```javascript
function countTo5() {
  for (let i = 1; i <= 5; i++) {  // iはforブロックのローカル変数
    console.log(i);
  }

  // console.log(i);  // エラー！iはforブロックの外では使えない
}

countTo5();
// 1
// 2
// 3
// 4
// 5
```

`for`ループの中で宣言した`i`は、そのループの中でのみ使えます。

---

## 5. 同じ名前の変数を使っても大丈夫

関数ごとに別々のローカル変数なので、**同じ名前**を使っても問題ありません：

```javascript
function add(a, b) {
  const result = a + b;  // add関数のresult
  return result;
}

function multiply(a, b) {
  const result = a * b;  // multiply関数のresult（別物）
  return result;
}

console.log(add(5, 3));       // 8
console.log(multiply(5, 3));  // 15
```

### 実行フロー図解：同じ名前の変数が共存できる理由

```
add(5, 3)の実行
═══════════════════════════════════════
┌─────────────────────┐
│ function add()      │
│ ┌─────────────────┐│
│ │ a = 5           ││
│ │ b = 3           ││
│ │ result = 8      ││ ← add関数専用のresult
│ └─────────────────┘│
└─────────────────────┘
return 8

multiply(5, 3)の実行
═══════════════════════════════════════
┌─────────────────────┐
│ function multiply() │
│ ┌─────────────────┐│
│ │ a = 5           ││
│ │ b = 3           ││
│ │ result = 15     ││ ← multiply関数専用のresult
│ └─────────────────┘│   （add関数のresultとは別物）
└─────────────────────┘
return 15
```

各関数の`result`は**別々のメモリ領域**に保存されるので、同じ名前でも衝突しません。

---

## 6. 実践例：温度変換アプリ

ローカル変数を使った実用的な例を見てみましょう。

### コード全体

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>温度変換アプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }

    .container {
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    h1 {
      color: #333;
      text-align: center;
    }

    .input-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: #555;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #4CAF50;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    button {
      flex: 1;
      padding: 12px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #45a049;
    }

    #output {
      margin-top: 20px;
      padding: 15px;
      background-color: #e8f5e9;
      border-left: 4px solid #4CAF50;
      border-radius: 5px;
      font-size: 18px;
      min-height: 24px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🌡️ 温度変換アプリ</h1>

    <div class="input-group">
      <label for="celsiusInput">摂氏温度 (°C)：</label>
      <input type="number" id="celsiusInput" placeholder="例: 25">
    </div>

    <div class="button-group">
      <button onclick="convertToFahrenheit()">華氏に変換 (°F)</button>
      <button onclick="convertToKelvin()">絶対温度に変換 (K)</button>
    </div>

    <div id="output"></div>
  </div>

  <script>
    // 摂氏→華氏変換関数
    function toFahrenheit(celsius) {
      // ローカル変数（この関数の中でのみ使える）
      const fahrenheit = celsius * 1.8 + 32;
      return fahrenheit;
    }

    // 摂氏→ケルビン変換関数
    function toKelvin(celsius) {
      // ローカル変数（別の関数なので、同じ変数名でもOK）
      const kelvin = celsius + 273.15;
      return kelvin;
    }

    // 華氏変換ボタンのクリック処理
    function convertToFahrenheit() {
      // ローカル変数
      const celsius = Number(document.getElementById('celsiusInput').value);

      // 入力チェック
      if (isNaN(celsius)) {
        document.getElementById('output').textContent = '数値を入力してください';
        return;
      }

      // 変換実行
      const result = toFahrenheit(celsius);

      // 結果表示
      document.getElementById('output').textContent =
        celsius + '°C = ' + result.toFixed(2) + '°F';
    }

    // ケルビン変換ボタンのクリック処理
    function convertToKelvin() {
      // ローカル変数
      const celsius = Number(document.getElementById('celsiusInput').value);

      // 入力チェック
      if (isNaN(celsius)) {
        document.getElementById('output').textContent = '数値を入力してください';
        return;
      }

      // 変換実行
      const result = toKelvin(celsius);

      // 結果表示
      document.getElementById('output').textContent =
        celsius + '°C = ' + result.toFixed(2) + 'K';
    }
  </script>
</body>
</html>
```

### 実行フロー図解：華氏変換の場合

ユーザーが「25」を入力して「華氏に変換」ボタンを押した場合：

```
実行フロー
═══════════════════════════════════════

1. convertToFahrenheit()が呼ばれる
   ┌──────────────────────────────┐
   │ function convertToFahrenheit │
   │ {                            │
   │   const celsius = 25         │ ← ローカル変数
   │                              │
   │   toFahrenheit(25)を呼び出す  │
   └──────────────────────────────┘
        ↓

2. toFahrenheit(25)が実行される
   ┌──────────────────────────────┐
   │ function toFahrenheit(celsius)│
   │ {                            │
   │   celsius = 25               │ ← 引数（ローカル変数）
   │                              │
   │   const fahrenheit =         │ ← ローカル変数
   │     25 * 1.8 + 32            │
   │   = 77                       │
   │                              │
   │   return 77                  │
   └──────────────────────────────┘
        ↓

3. convertToFahrenheit()に戻る
   ┌──────────────────────────────┐
   │   const result = 77          │ ← ローカル変数
   │                              │
   │   画面に表示:                │
   │   「25°C = 77.00°F」         │
   └──────────────────────────────┘

全ての関数が終了すると、
celsius, fahrenheit, resultは全て消える
```

### ローカル変数のメリットの実例

この温度変換アプリでは、以下のようにローカル変数が活用されています：

1. **名前の衝突が起きない**：
   - `toFahrenheit`関数と`toKelvin`関数の両方で、異なる計算結果を格納する変数が使われています
   - `convertToFahrenheit`関数と`convertToKelvin`関数の両方で、`celsius`や`result`という変数名が使われていますが、それぞれ別々のローカル変数なので衝突しません

2. **一時的な計算に便利**：
   - `fahrenheit`や`kelvin`などの変換結果を一時的に保存する変数が、関数の外に漏れることなく使えます

3. **独立性が高い**：
   - 各関数が独立して動作するので、一方の関数が他方に影響を与えません

---

## 7. ローカル変数のメリットまとめ

### メリット1：独立性

関数が独立して動作するので、他の関数の影響を受けません：

```javascript
function calcA() {
  const value = 10;
  return value * 2;
}

function calcB() {
  const value = 20;  // calcAのvalueとは別の変数
  return value * 2;
}

console.log(calcA());  // 20
console.log(calcB());  // 40
```

### メリット2：安全性

関数の外から変数を変更できないので、予期しない変更を防げます：

```javascript
function createMessage() {
  const secret = 'パスワード123';  // 外から見えない
  return '処理完了';
}

createMessage();
// console.log(secret);  // エラー！secretにはアクセスできない
```

### メリット3：名前の自由度

各関数で自由に変数名を選べます。他の関数のことを気にする必要がありません：

```javascript
function processOrder() {
  const data = '注文データ';
  // dataを使った処理
}

function processPayment() {
  const data = '支払いデータ';  // 同じ名前でOK
  // dataを使った処理
}
```

---

## 練習問題

### 問題1: 割引計算アプリ（基本）

以下の要件を満たすアプリを作成してください：

**要件**：
1. 価格と割引率を入力するフォームがある
2. 「計算」ボタンを押すと、割引後の価格が表示される
3. `calculateDiscount(price, rate)`関数を作成する
4. 関数内でローカル変数を使って計算する：
   - `discount`: 割引額
   - `finalPrice`: 割引後の価格

**ヒント**：
- 割引額 = 価格 × (割引率 ÷ 100)
- 割引後の価格 = 価格 - 割引額

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>割引計算アプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }

    .container {
      background-color: #f9f9f9;
      padding: 30px;
      border-radius: 10px;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .input-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      box-sizing: border-box;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #FF5722;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }

    button:hover {
      background-color: #E64A19;
    }

    #output {
      margin-top: 20px;
      padding: 15px;
      background-color: #fff3e0;
      border-left: 4px solid #FF5722;
      border-radius: 5px;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>💰 割引計算アプリ</h1>

    <div class="input-group">
      <label for="priceInput">価格（円）：</label>
      <input type="number" id="priceInput" placeholder="例: 10000">
    </div>

    <div class="input-group">
      <label for="rateInput">割引率（%）：</label>
      <input type="number" id="rateInput" placeholder="例: 20">
    </div>

    <button onclick="calculate()">計算</button>

    <div id="output"></div>
  </div>

  <script>
    // 割引計算関数
    function calculateDiscount(price, rate) {
      // ローカル変数（この関数の中でのみ使える）
      const discount = price * (rate / 100);    // 割引額
      const finalPrice = price - discount;      // 割引後の価格

      return finalPrice;
    }

    // 計算ボタンのクリック処理
    function calculate() {
      // ローカル変数
      const price = Number(document.getElementById('priceInput').value);
      const rate = Number(document.getElementById('rateInput').value);

      // 入力チェック
      if (isNaN(price) || isNaN(rate)) {
        document.getElementById('output').textContent =
          '数値を入力してください';
        return;
      }

      // 割引計算
      const result = calculateDiscount(price, rate);

      // 結果表示
      const discountAmount = price * (rate / 100);
      document.getElementById('output').innerHTML =
        '元の価格: ' + price + '円<br>' +
        '割引額: ' + discountAmount + '円（' + rate + '%オフ）<br>' +
        '<strong>割引後: ' + result + '円</strong>';
    }
  </script>
</body>
</html>
```

**実行フロー**：

```
ユーザーが「10000円」「20%」を入力して「計算」ボタンを押した場合
═══════════════════════════════════════════════════════════════

1. calculate()が呼ばれる
   ┌────────────────────────┐
   │ const price = 10000    │ ← ローカル変数
   │ const rate = 20        │ ← ローカル変数
   │                        │
   │ calculateDiscount()呼出 │
   └────────────────────────┘
        ↓

2. calculateDiscount(10000, 20)が実行される
   ┌────────────────────────┐
   │ price = 10000          │ ← 引数（ローカル変数）
   │ rate = 20              │ ← 引数（ローカル変数）
   │                        │
   │ const discount =       │ ← ローカル変数
   │   10000 * (20 / 100)   │
   │ = 2000                 │
   │                        │
   │ const finalPrice =     │ ← ローカル変数
   │   10000 - 2000         │
   │ = 8000                 │
   │                        │
   │ return 8000            │
   └────────────────────────┘
        ↓

3. calculate()に戻る
   ┌────────────────────────┐
   │ const result = 8000    │ ← ローカル変数
   │                        │
   │ 画面に表示:            │
   │ 元の価格: 10000円      │
   │ 割引額: 2000円(20%オフ)│
   │ 割引後: 8000円         │
   └────────────────────────┘

全ての関数が終了すると、
price, rate, discount, finalPrice, resultは全て消える
```

</details>

---

### 問題2: BMI計算アプリ（応用）

以下の要件を満たすアプリを作成してください：

**要件**：
1. 身長（cm）と体重（kg）を入力するフォームがある
2. 「計算」ボタンを押すと、BMIと判定結果が表示される
3. 以下の関数を作成する：
   - `calculateBMI(height, weight)`: BMIを計算する関数
   - `judgeBMI(bmi)`: BMI値から判定を返す関数
4. 各関数でローカル変数を使って計算する

**BMIの計算式**：
- BMI = 体重(kg) ÷ (身長(m) × 身長(m))
- 身長はcmで入力されるので、100で割ってmに変換する

**判定基準**：
- 18.5未満: やせ
- 18.5以上25未満: 標準
- 25以上: 肥満

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>BMI計算アプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background-color: #e3f2fd;
    }

    .container {
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    h1 {
      text-align: center;
      color: #1976d2;
    }

    .input-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      box-sizing: border-box;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }

    button:hover {
      background-color: #1565c0;
    }

    #output {
      margin-top: 20px;
      padding: 15px;
      background-color: #e1f5fe;
      border-left: 4px solid #1976d2;
      border-radius: 5px;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🏃 BMI計算アプリ</h1>

    <div class="input-group">
      <label for="heightInput">身長（cm）：</label>
      <input type="number" id="heightInput" placeholder="例: 170">
    </div>

    <div class="input-group">
      <label for="weightInput">体重（kg）：</label>
      <input type="number" id="weightInput" placeholder="例: 65">
    </div>

    <button onclick="calculate()">計算</button>

    <div id="output"></div>
  </div>

  <script>
    // BMI計算関数
    function calculateBMI(height, weight) {
      // ローカル変数（この関数の中でのみ使える）
      const heightInMeters = height / 100;  // cmをmに変換
      const bmi = weight / (heightInMeters * heightInMeters);

      return bmi;
    }

    // BMI判定関数
    function judgeBMI(bmi) {
      // ローカル変数（この関数の中でのみ使える）
      let judgment = '';

      if (bmi < 18.5) {
        judgment = 'やせ';
      } else if (bmi < 25) {
        judgment = '標準';
      } else {
        judgment = '肥満';
      }

      return judgment;
    }

    // 計算ボタンのクリック処理
    function calculate() {
      // ローカル変数
      const height = Number(document.getElementById('heightInput').value);
      const weight = Number(document.getElementById('weightInput').value);

      // 入力チェック
      if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById('output').textContent =
          '正しい数値を入力してください';
        return;
      }

      // BMI計算
      const bmi = calculateBMI(height, weight);

      // 判定
      const judgment = judgeBMI(bmi);

      // 結果表示
      document.getElementById('output').innerHTML =
        '身長: ' + height + 'cm<br>' +
        '体重: ' + weight + 'kg<br>' +
        '<strong>BMI: ' + bmi.toFixed(1) + '</strong><br>' +
        '判定: <strong>' + judgment + '</strong>';
    }
  </script>
</body>
</html>
```

**実行フロー**：

```
ユーザーが「170cm」「65kg」を入力して「計算」ボタンを押した場合
═══════════════════════════════════════════════════════════════

1. calculate()が呼ばれる
   ┌────────────────────────┐
   │ const height = 170     │ ← ローカル変数
   │ const weight = 65      │ ← ローカル変数
   │                        │
   │ calculateBMI()呼出     │
   └────────────────────────┘
        ↓

2. calculateBMI(170, 65)が実行される
   ┌────────────────────────┐
   │ height = 170           │ ← 引数（ローカル変数）
   │ weight = 65            │ ← 引数（ローカル変数）
   │                        │
   │ const heightInMeters = │ ← ローカル変数
   │   170 / 100            │
   │ = 1.7                  │
   │                        │
   │ const bmi =            │ ← ローカル変数
   │   65 / (1.7 * 1.7)     │
   │ = 22.49                │
   │                        │
   │ return 22.49           │
   └────────────────────────┘
        ↓

3. calculate()に戻る
   ┌────────────────────────┐
   │ const bmi = 22.49      │ ← ローカル変数
   │                        │
   │ judgeBMI()呼出         │
   └────────────────────────┘
        ↓

4. judgeBMI(22.49)が実行される
   ┌────────────────────────┐
   │ bmi = 22.49            │ ← 引数（ローカル変数）
   │                        │
   │ let judgment = ''      │ ← ローカル変数
   │                        │
   │ if (22.49 < 18.5)      │ → false
   │ else if (22.49 < 25)   │ → true
   │   judgment = '標準'    │
   │                        │
   │ return '標準'          │
   └────────────────────────┘
        ↓

5. calculate()に戻る
   ┌────────────────────────┐
   │ const judgment = '標準'│ ← ローカル変数
   │                        │
   │ 画面に表示:            │
   │ 身長: 170cm            │
   │ 体重: 65kg             │
   │ BMI: 22.5              │
   │ 判定: 標準             │
   └────────────────────────┘

全ての関数が終了すると、
height, weight, heightInMeters, bmi, judgment等は全て消える
```

</details>

---

### 問題3: 複数の計算機アプリ（発展）

以下の要件を満たすアプリを作成してください：

**要件**：
1. 2つの数値を入力するフォームがある
2. 4つのボタン（足し算、引き算、掛け算、割り算）がある
3. 各計算用の関数を作成する：
   - `add(a, b)`: 足し算
   - `subtract(a, b)`: 引き算
   - `multiply(a, b)`: 掛け算
   - `divide(a, b)`: 割り算
4. 各関数で、ローカル変数`result`を使って計算結果を保存する
5. すべての関数で同じ変数名`result`を使っても問題ないことを確認する

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>計算機アプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background-color: #fce4ec;
    }

    .container {
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    h1 {
      text-align: center;
      color: #c2185b;
    }

    .input-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      box-sizing: border-box;
    }

    .button-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 15px;
    }

    button {
      padding: 12px;
      background-color: #c2185b;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background-color: #ad1457;
    }

    #output {
      margin-top: 20px;
      padding: 15px;
      background-color: #f8bbd0;
      border-left: 4px solid #c2185b;
      border-radius: 5px;
      font-size: 20px;
      text-align: center;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔢 計算機アプリ</h1>

    <div class="input-group">
      <label for="num1Input">数値1：</label>
      <input type="number" id="num1Input" placeholder="例: 10">
    </div>

    <div class="input-group">
      <label for="num2Input">数値2：</label>
      <input type="number" id="num2Input" placeholder="例: 5">
    </div>

    <div class="button-group">
      <button onclick="calculateAdd()">➕ 足し算</button>
      <button onclick="calculateSubtract()">➖ 引き算</button>
      <button onclick="calculateMultiply()">✖️ 掛け算</button>
      <button onclick="calculateDivide()">➗ 割り算</button>
    </div>

    <div id="output"></div>
  </div>

  <script>
    // 足し算関数
    function add(a, b) {
      const result = a + b;  // ローカル変数
      return result;
    }

    // 引き算関数
    function subtract(a, b) {
      const result = a - b;  // ローカル変数（add関数のresultとは別物）
      return result;
    }

    // 掛け算関数
    function multiply(a, b) {
      const result = a * b;  // ローカル変数（他の関数のresultとは別物）
      return result;
    }

    // 割り算関数
    function divide(a, b) {
      const result = a / b;  // ローカル変数（他の関数のresultとは別物）
      return result;
    }

    // 入力値を取得する共通関数
    function getInputValues() {
      const num1 = Number(document.getElementById('num1Input').value);
      const num2 = Number(document.getElementById('num2Input').value);
      return { num1, num2 };  // オブジェクトで返す
    }

    // 結果を表示する共通関数
    function showResult(operation, result) {
      document.getElementById('output').textContent =
        operation + ' の結果: ' + result;
    }

    // 足し算ボタンのクリック処理
    function calculateAdd() {
      const { num1, num2 } = getInputValues();

      if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('output').textContent = '数値を入力してください';
        return;
      }

      const result = add(num1, num2);  // ローカル変数
      showResult('足し算', result);
    }

    // 引き算ボタンのクリック処理
    function calculateSubtract() {
      const { num1, num2 } = getInputValues();

      if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('output').textContent = '数値を入力してください';
        return;
      }

      const result = subtract(num1, num2);  // ローカル変数
      showResult('引き算', result);
    }

    // 掛け算ボタンのクリック処理
    function calculateMultiply() {
      const { num1, num2 } = getInputValues();

      if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('output').textContent = '数値を入力してください';
        return;
      }

      const result = multiply(num1, num2);  // ローカル変数
      showResult('掛け算', result);
    }

    // 割り算ボタンのクリック処理
    function calculateDivide() {
      const { num1, num2 } = getInputValues();

      if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('output').textContent = '数値を入力してください';
        return;
      }

      if (num2 === 0) {
        document.getElementById('output').textContent = 'ゼロでは割れません';
        return;
      }

      const result = divide(num1, num2);  // ローカル変数
      showResult('割り算', result);
    }
  </script>
</body>
</html>
```

**実行フロー**（掛け算の例）：

```
ユーザーが「10」「5」を入力して「掛け算」ボタンを押した場合
═══════════════════════════════════════════════════════════════

1. calculateMultiply()が呼ばれる
   ┌────────────────────────┐
   │ getInputValues()呼出   │
   └────────────────────────┘
        ↓

2. getInputValues()が実行される
   ┌────────────────────────┐
   │ const num1 = 10        │ ← ローカル変数
   │ const num2 = 5         │ ← ローカル変数
   │                        │
   │ return {num1: 10,      │
   │         num2: 5}       │
   └────────────────────────┘
        ↓

3. calculateMultiply()に戻る
   ┌────────────────────────┐
   │ const num1 = 10        │ ← ローカル変数
   │ const num2 = 5         │ ← ローカル変数
   │                        │
   │ multiply()呼出         │
   └────────────────────────┘
        ↓

4. multiply(10, 5)が実行される
   ┌────────────────────────┐
   │ a = 10                 │ ← 引数（ローカル変数）
   │ b = 5                  │ ← 引数（ローカル変数）
   │                        │
   │ const result = 10 * 5  │ ← ローカル変数
   │              = 50      │
   │                        │
   │ return 50              │
   └────────────────────────┘
        ↓

5. calculateMultiply()に戻る
   ┌────────────────────────┐
   │ const result = 50      │ ← ローカル変数
   │                        │
   │ showResult()呼出       │
   └────────────────────────┘
        ↓

6. showResult('掛け算', 50)が実行される
   ┌────────────────────────┐
   │ operation = '掛け算'   │ ← 引数（ローカル変数）
   │ result = 50            │ ← 引数（ローカル変数）
   │                        │
   │ 画面に表示:            │
   │ 「掛け算の結果: 50」   │
   └────────────────────────┘

全ての関数が終了すると、
num1, num2, result, operation等は全て消える

重要なポイント：
- add(), subtract(), multiply(), divide()の全てで
  「result」という同じ名前の変数を使っている
- しかし、それぞれ別々のローカル変数なので衝突しない
- calculateAdd(), calculateSubtract()等でも「result」を使っているが、
  これらも別々のローカル変数
```

</details>

---

## まとめ

このレッスンでは、**ローカル変数**について学びました。

### 重要なポイント

1. **ローカル変数とは**：
   - 関数の中で宣言した変数は、その関数の中でのみ使える
   - 関数の外からはアクセスできない
   - 関数が終了すると、ローカル変数は消える

2. **引数もローカル変数**：
   - 関数の引数は、その関数のローカル変数として扱われる
   - 関数の外からはアクセスできない

3. **ブロックスコープ**：
   - `if`や`for`などのブロック内で宣言した変数も、そのブロック内でのみ使える

4. **ローカル変数のメリット**：
   - **名前の衝突を防ぐ**：異なる関数で同じ変数名を使っても問題ない
   - **独立性**：各関数が独立して動作し、他の関数の影響を受けない
   - **安全性**：関数の外から変数を変更できないので、予期しない変更を防げる

### 基本パターン

```javascript
function 関数名(引数) {  // 引数はローカル変数
  const 変数名 = 値;   // ローカル変数
  // この関数の中でのみ使える
  return 結果;
}

// 関数の外からは、関数内の変数にアクセスできない
```

### よくある間違い

```javascript
// ❌ 間違い：関数の外から関数内の変数にアクセスしようとする
function test() {
  const message = 'こんにちは';
}
test();
console.log(message);  // エラー！

// ✅ 正しい：関数から値を返して、外で受け取る
function test() {
  const message = 'こんにちは';
  return message;
}
const result = test();
console.log(result);  // OK：「こんにちは」
```

ローカル変数を理解することで、関数がどのように独立して動作するかがわかるようになります。

---

## カリキュラム要件チェック

このレッスンで、以下のカリキュラム要件を満たしました：

- ✅ **関数内の変数**：関数の中で宣言した変数は、その関数のローカル変数になることを学びました
- ✅ **外から見えない**：ローカル変数は関数の外からアクセスできないことを学びました
- ✅ **名前の衝突回避**：異なる関数で同じ変数名を使っても衝突しないことを学びました
- ✅ **知識：スコープ、ローカル変数**：変数のスコープ（有効範囲）とローカル変数の概念を理解しました
- ✅ **成果物：スコープ理解**：温度変換アプリ、割引計算アプリなどを通じて、スコープを実践的に理解しました

---

## 次のレッスンの予告

次のレッスンでは、**グローバル変数**について学びます。

- グローバル変数とは？
- ローカル変数との違い
- グローバル変数の使い方と注意点
- スコープチェーン（変数の検索順序）

ローカル変数とグローバル変数の違いを理解することで、より効果的なプログラムを書けるようになります！
