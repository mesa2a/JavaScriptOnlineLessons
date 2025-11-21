# Lesson 114: 関数から関数を呼び出す

## 学習目標
- 関数の中から別の関数を呼び出せるようになる
- 処理を分割して整理できるようになる
- 関数の再利用性を理解する

## 関数から関数を呼び出す

これまでは、関数を**直接**呼び出していました。しかし、**関数の中から別の関数を呼び出す**こともできます。

### 基本的な例

```javascript
function sayHello() {
  alert('こんにちは');
}

function greet() {
  sayHello();  // 関数の中から別の関数を呼び出す
  alert('元気ですか？');
}

greet();
// 出力:
// こんにちは
// 元気ですか？
```

## なぜ関数から関数を呼び出すのか？

### 1. 処理を分割できる

```javascript
// ❌ 1つの関数に全部書く（読みにくい）
function showUserInfo() {
  alert('=== ユーザー情報 ===');
  alert('名前: 太郎');
  alert('年齢: 25歳');
  alert('==================');
}

// ✅ 処理を分割する（読みやすい）
function showHeader() {
  alert('=== ユーザー情報 ===');
}

function showData() {
  alert('名前: 太郎');
  alert('年齢: 25歳');
}

function showFooter() {
  alert('==================');
}

function showUserInfo() {
  showHeader();
  showData();
  showFooter();
}
```

### 2. 再利用できる

```javascript
function showLine() {
  console.log('--------------------');
}

function showTitle(title) {
  showLine();
  console.log(title);
  showLine();
}

showTitle('第1章');
showTitle('第2章');
showTitle('第3章');
```

## 計算を分割する

```javascript
// 消費税を計算する関数
function addTax(price) {
  return price * 1.1;
}

// 送料を計算する関数
function getShippingFee(price) {
  if (price >= 3000) {
    return 0;  // 3000円以上は送料無料
  } else {
    return 500;
  }
}

// 合計金額を計算する関数（他の関数を呼び出す）
function calculateTotal(price) {
  const priceWithTax = addTax(price);  // 消費税を含めた価格
  const shipping = getShippingFee(price);  // 送料
  const total = priceWithTax + shipping;
  return total;
}

// 使い方
const result = calculateTotal(2000);
alert('合計: ' + result);  // 合計: 2700（2000×1.1 + 500）
```

## 実践例: メッセージカード作成

HTMLで入力された名前とメッセージを使って、装飾されたメッセージカードを表示します。

```javascript
// ヘッダーを作る関数
function createHeader(name) {
  return '━━━━━━━━━━━━\n親愛なる ' + name + ' さんへ\n━━━━━━━━━━━━';
}

// フッターを作る関数
function createFooter() {
  return '━━━━━━━━━━━━\nあなたより\n━━━━━━━━━━━━';
}

// 完全なメッセージを作る関数（他の関数を呼び出す）
function createCard(name, message) {
  const header = createHeader(name);  // ヘッダーを作る
  const footer = createFooter();       // フッターを作る

  // 全体を組み立てる
  const card = header + '\n\n' + message + '\n\n' + footer;
  return card;
}

// 使い方
const result = createCard('太郎', 'いつもありがとう！');
alert(result);
```

## 練習問題

### 問題: メッセージカード作成アプリを作ろう

以下の要件を満たすアプリを作成してください：

1. 名前を入力するフォームがある
2. メッセージを入力するフォームがある
3. 「カードを作成」ボタンを押すと、装飾されたカードが表示される
4. 以下の関数を作成して、関数から関数を呼び出す：
   - `getInputName()`: 入力された名前を取得して返す
   - `getInputMessage()`: 入力されたメッセージを取得して返す
   - `createHeader(name)`: 名前からヘッダーを作成して返す
   - `createFooter()`: フッターを作成して返す
   - `createCard(name, message)`: 上記の関数を呼び出してカード全体を作成して返す
   - `displayCard()`: カードを画面に表示する（上記の全関数を呼び出す）

### ヒント

```javascript
function getInputName() {
  const name = document.getElementById('nameInput').value;
  return name;
}

function getInputMessage() {
  const message = document.getElementById('messageInput').value;
  return message;
}

function createHeader(name) {
  return '━━━━━━━━━━━━\n親愛なる ' + name + ' さんへ\n━━━━━━━━━━━━';
}

function createFooter() {
  return '━━━━━━━━━━━━\nあなたより\n━━━━━━━━━━━━';
}

function createCard(name, message) {
  const header = createHeader(name);
  const footer = createFooter();
  return header + '\n\n' + message + '\n\n' + footer;
}

function displayCard() {
  const name = getInputName();
  const message = getInputMessage();
  const card = createCard(name, message);
  document.getElementById('output').textContent = card;
}
```

## まとめ

- 関数の中から別の関数を呼び出せる
- 処理を分割すると、コードが読みやすくなる
- 小さな関数を組み合わせて、大きな機能を作る
- 各関数は1つの仕事だけをする（単一責任の原則）
- 関数を再利用できる

次のレッスンでは、**デフォルト引数**について学びます。

## 復習問題

1. 関数から関数を呼び出すメリットは何ですか？
2. 処理を分割すると、なぜコードが読みやすくなりますか？
3. 1つの関数には、いくつの仕事をさせるべきですか？
