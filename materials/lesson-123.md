# レッスン123：無名関数の活用

## 学習目標
- 無名関数（匿名関数）とは何かを理解する
- addEventListener内での無名関数の使い方を学ぶ
- コールバック関数のパターンを理解する

## 無名関数とは

**無名関数**（匿名関数）は、名前を持たない関数のことです。

```javascript
// 名前付き関数式
const greet = function greetFunc() {
  alert('こんにちは');
};

// 無名関数（名前を省略）
const greet = function() {
  alert('こんにちは');
};
```

前回学んだ関数式で、`function` の後の名前を省略したものが無名関数です。

## 無名関数の使い道

無名関数は、以下のような場合に便利です：

1. **一度だけ使う関数**
2. **イベントリスナー内**
3. **コールバック関数として**

名前をつける必要がない場合に使います。

## 1. addEventListener内で使う

### これまでの方法（関数を別に定義）

```javascript
// 関数を定義
function handleClick() {
  alert('クリックされました');
}

// イベントリスナーに登録
const button = document.getElementById('myButton');
button.addEventListener('click', handleClick);
```

### 無名関数を使う方法

一度だけ使う関数なら、直接書けます。

```javascript
const button = document.getElementById('myButton');

// 無名関数を直接書く
button.addEventListener('click', function() {
  alert('クリックされました');
});
```

この方が短く、シンプルです。

## 実践例：ボタンクリック

### 例1: シンプルなクリック

```javascript
const button = document.getElementById('btn');

button.addEventListener('click', function() {
  alert('ボタンがクリックされました！');
});
```

### 例2: 複数の処理

```javascript
const button = document.getElementById('btn');

button.addEventListener('click', function() {
  console.log('クリックされました');
  alert('こんにちは！');
  document.body.style.backgroundColor = 'lightblue';
});
```

### 例3: イベントオブジェクトを使う

```javascript
const button = document.getElementById('btn');

button.addEventListener('click', function(event) {
  console.log('クリックされた要素:', event.target);
  alert('クリック位置: ' + event.clientX + ', ' + event.clientY);
});
```

## 2. 一度だけ使う関数

関数を一度しか使わない場合、無名関数が適しています。

### 再利用する関数：名前をつける

```javascript
// 複数の場所で使う関数
const validateEmail = function(email) {
  return email.includes('@');
};

// いろんな場所で使う
if (validateEmail(email1)) { }
if (validateEmail(email2)) { }
```

### 一度だけ使う関数：無名関数

```javascript
// 一度だけ使う処理
button.addEventListener('click', function() {
  const email = document.getElementById('email').value;
  if (email.includes('@')) {
    alert('有効なメールアドレスです');
  }
});
```

## 3. コールバック関数

**コールバック関数**とは、他の関数に引数として渡される関数のことです。

### コールバックの基本

```javascript
// コールバックを受け取る関数
function execute(callback) {
  console.log('処理を開始します');
  callback();  // コールバック関数を実行
  console.log('処理が完了しました');
}

// 無名関数をコールバックとして渡す
execute(function() {
  console.log('コールバック関数が実行されました');
});
```

### addEventListener はコールバックを使っている

`addEventListener` も、コールバック関数を受け取ります。

```javascript
// 'click' イベントが起きたら、このコールバックを実行してください
button.addEventListener('click', function() {
  alert('クリックされました');
});
```

## 実践例：カウンターアプリ

無名関数を使ったカウンターです。

```javascript
let count = 0;

// カウントアップボタン
document.getElementById('upBtn').addEventListener('click', function() {
  count = count + 1;
  document.getElementById('display').textContent = count;
});

// カウントダウンボタン
document.getElementById('downBtn').addEventListener('click', function() {
  count = count - 1;
  document.getElementById('display').textContent = count;
});

// リセットボタン
document.getElementById('resetBtn').addEventListener('click', function() {
  count = 0;
  document.getElementById('display').textContent = count;
});
```

それぞれのボタンに、その場で必要な処理を直接書いています。

## 実践例：入力バリデーション

フォームの入力チェックです。

```javascript
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

// 名前の入力チェック
nameInput.addEventListener('input', function() {
  const value = nameInput.value;
  if (value.length < 3) {
    document.getElementById('nameError').textContent = '3文字以上入力してください';
  } else {
    document.getElementById('nameError').textContent = '';
  }
});

// メールの入力チェック
emailInput.addEventListener('input', function() {
  const value = emailInput.value;
  if (!value.includes('@')) {
    document.getElementById('emailError').textContent = '@を含めてください';
  } else {
    document.getElementById('emailError').textContent = '';
  }
});
```

## 名前をつける vs 無名関数

### 名前をつけるべき場合

```javascript
// 複数の場所で使う
const validateEmail = function(email) {
  return email.includes('@') && email.includes('.');
};

// 再利用
if (validateEmail(email1)) { }
if (validateEmail(email2)) { }
```

### 無名関数が良い場合

```javascript
// 一度だけ使う
button.addEventListener('click', function() {
  alert('クリックされました');
});
```

### 判断基準

- **再利用する** → 名前をつける
- **一度だけ使う** → 無名関数
- **テストしたい** → 名前をつける
- **短い処理** → 無名関数

## 複数のイベントリスナー

それぞれに無名関数を使えます。

```javascript
const button = document.getElementById('btn');

// クリック時
button.addEventListener('click', function() {
  console.log('クリックされました');
});

// マウスオーバー時
button.addEventListener('mouseover', function() {
  button.style.backgroundColor = 'lightblue';
});

// マウスアウト時
button.addEventListener('mouseout', function() {
  button.style.backgroundColor = '';
});
```

## よくある間違い

### 間違い1: 関数を実行してしまう

```javascript
// 間違い：() をつけると即実行される
button.addEventListener('click', myFunction());

// 正しい：関数自体を渡す
button.addEventListener('click', myFunction);

// または無名関数
button.addEventListener('click', function() {
  myFunction();
});
```

### 間違い2: イベントリスナーの外で定義

```javascript
// 避けるべき：再利用しないのに外で定義
const handleClick = function() {
  alert('クリック');
};
button.addEventListener('click', handleClick);

// 良い：一度だけなら直接書く
button.addEventListener('click', function() {
  alert('クリック');
});
```

## コールバックパターンの応用

### 繰り返し処理の後にコールバック

```javascript
function processItems(items, callback) {
  for (let i = 0; i < items.length; i++) {
    console.log('処理中:', items[i]);
  }
  callback();  // 完了後にコールバック実行
}

// 使用例
processItems(['りんご', 'バナナ', 'オレンジ'], function() {
  console.log('すべての処理が完了しました');
});
```

### 条件付きコールバック

```javascript
function checkAge(age, successCallback, errorCallback) {
  if (age >= 18) {
    successCallback();
  } else {
    errorCallback();
  }
}

// 使用例
checkAge(20,
  function() {
    alert('成人です');
  },
  function() {
    alert('未成年です');
  }
);
```

## まとめ

1. **無名関数**は、名前を省略した関数
2. **一度だけ使う関数**に適している
3. **addEventListener**で頻繁に使う
4. **コールバック関数**として使える
5. 構文: `function() { }`

### 使い分け

```javascript
// 再利用する → 名前付き関数式
const validateEmail = function(email) {
  return email.includes('@');
};

// 一度だけ使う → 無名関数
button.addEventListener('click', function() {
  alert('クリック');
});
```

### addEventListener での典型的な使い方

```javascript
const button = document.getElementById('myButton');

button.addEventListener('click', function() {
  // ここに処理を書く
  console.log('クリックされました');
});
```

無名関数を使うことで、コードがシンプルになり、読みやすくなります。

次回は、即時実行関数（IIFE）について学びます。
