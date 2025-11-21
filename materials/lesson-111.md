# Lesson 111: 引数を受け取る

## 学習目標
- 関数に引数を渡せるようになる
- 引数を使って柔軟な関数を作成できるようになる
- 複数の引数を持つ関数を作成できるようになる

## 引数とは？

前のレッスンでは、同じメッセージを表示する関数を作りました。しかし、**異なるメッセージを表示したい**場合はどうすればいいでしょうか？

### 引数なしの場合（前回）

```javascript
function sayHello() {
  alert('こんにちは');
}

sayHello();  // いつも「こんにちは」だけ
```

毎回同じメッセージしか表示できません。

### 引数ありの場合（新しい方法）

```javascript
function greet(name) {  // nameが引数
  alert('こんにちは、' + name + 'さん');
}

greet('太郎');  // こんにちは、太郎さん
greet('花子');  // こんにちは、花子さん
```

引数を使うと、**呼び出すたびに違う値**を渡せます！

## 引数の基本構文

```javascript
function 関数名(引数名) {
  // 引数を使った処理
}

// 呼び出し
関数名(値);
```

## 引数の動作イメージ

引数は、関数の中で使える**変数**のようなものです：

```javascript
function showMessage(message) {
  // messageには、呼び出すときに渡した値が入る
  alert(message);
}

showMessage('おはよう');
// この時、message = 'おはよう' になる
```

## 複数の引数

関数には、複数の引数を渡すこともできます：

```javascript
function introduce(name, age) {
  alert('私は' + name + 'で、' + age + '歳です');
}

introduce('太郎', 25);  // 私は太郎で、25歳です
introduce('花子', 30);  // 私は花子で、30歳です
```

複数の引数は、**カンマ`,`で区切って**書きます。

## 実践例: あいさつアプリ

```javascript
function greet(time, name) {
  let message = '';

  if (time === 'morning') {
    message = 'おはようございます、' + name + 'さん';
  } else if (time === 'afternoon') {
    message = 'こんにちは、' + name + 'さん';
  } else if (time === 'evening') {
    message = 'こんばんは、' + name + 'さん';
  }

  alert(message);
}

greet('morning', '太郎');    // おはようございます、太郎さん
greet('afternoon', '花子');  // こんにちは、花子さん
```

## 引数の順序

引数は**順番が大切**です：

```javascript
function introduce(name, age) {
  alert(name + 'は' + age + '歳です');
}

introduce('太郎', 25);  // 太郎は25歳です
introduce(25, '太郎');  // 25は太郎歳です ← 順序が逆！
```

## 引数を使った計算

```javascript
function add(a, b) {
  const result = a + b;
  alert(result);
}

add(5, 3);   // 8
add(10, 20); // 30
```

## 引数の命名規則

引数の名前は、わかりやすいものにしましょう：

```javascript
// ❌ 悪い例
function calc(x, y) {
  alert(x * y);
}

// ✅ 良い例
function multiply(num1, num2) {
  alert(num1 * num2);
}
```

## 引数がない場合

引数を渡さずに関数を呼ぶと、引数の値は`undefined`になります：

```javascript
function greet(name) {
  alert('こんにちは、' + name + 'さん');
}

greet();  // こんにちは、undefinedさん
```

## 練習問題

### 問題: あいさつメッセージ作成アプリを作ろう

以下の要件を満たすアプリを作成してください：

1. 名前を入力するフォームがある
2. 時間帯を選ぶセレクトボックスがある（朝、昼、夜）
3. 「あいさつ」ボタンを押すと、メッセージが表示される
4. `greet(time, name)`関数を使う

### ヒント

```javascript
function greet(time, name) {
  let message = '';

  if (time === 'morning') {
    message = 'おはようございます、' + name + 'さん';
  } else if (time === 'afternoon') {
    message = 'こんにちは、' + name + 'さん';
  } else {
    message = 'こんばんは、' + name + 'さん';
  }

  document.getElementById('output').textContent = message;
}

function showGreeting() {
  const name = document.getElementById('nameInput').value;
  const time = document.getElementById('timeSelect').value;
  greet(time, name);
}
```

## まとめ

- **引数**を使うと、関数に値を渡せる
- 引数は`function 関数名(引数名) { }`のように書く
- 複数の引数は、カンマで区切る
- 引数を使うと、1つの関数で様々な動作ができる
- 引数は関数の中で変数のように使える
- 引数の順序は重要

次のレッスンでは、関数から値を**返す**方法（戻り値）を学びます。

## 復習問題

1. 引数とは何ですか？
2. 引数を2つ持つ関数を書いてください
3. 引数なしで関数を呼ぶとどうなりますか？
