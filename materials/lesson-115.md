# Lesson 115: デフォルト引数

## 学習目標
- デフォルト引数を使えるようになる
- 引数が省略された場合の処理を理解する
- より柔軟な関数を作成できるようになる

## デフォルト引数とは？

引数を指定しない場合に、**自動的に使われる値**を設定できます。これを**デフォルト引数**と言います。

### デフォルト引数なしの場合（今まで）

```javascript
function greet(name) {
  alert('こんにちは、' + name + 'さん');
}

greet('太郎');  // こんにちは、太郎さん
greet();        // こんにちは、undefinedさん ← 引数がないとundefined
```

### デフォルト引数ありの場合（新しい方法）

```javascript
function greet(name = 'ゲスト') {  // デフォルト値を設定
  alert('こんにちは、' + name + 'さん');
}

greet('太郎');  // こんにちは、太郎さん
greet();        // こんにちは、ゲストさん ← デフォルト値が使われる
```

## デフォルト引数の基本構文

```javascript
function 関数名(引数名 = デフォルト値) {
  // 処理
}
```

## 複数のデフォルト引数

複数の引数に、それぞれデフォルト値を設定できます：

```javascript
function introduce(name = 'ゲスト', age = 20) {
  alert(name + 'さんは' + age + '歳です');
}

introduce('太郎', 25);  // 太郎さんは25歳です
introduce('花子');      // 花子さんは20歳です（ageはデフォルト値）
introduce();            // ゲストさんは20歳です（両方デフォルト値）
```

## 実践例1: あいさつ関数

```javascript
function greet(name = 'あなた', time = 'こんにちは') {
  alert(time + '、' + name + 'さん');
}

greet('太郎', 'おはよう');  // おはよう、太郎さん
greet('花子');              // こんにちは、花子さん
greet();                    // こんにちは、あなたさん
```

## 実践例2: メッセージ表示

```javascript
function showMessage(message = 'メッセージがありません', type = 'info') {
  let icon = '';

  if (type === 'success') {
    icon = '✅ ';
  } else if (type === 'error') {
    icon = '❌ ';
  } else {
    icon = 'ℹ️ ';
  }

  alert(icon + message);
}

showMessage('保存しました', 'success');  // ✅ 保存しました
showMessage('エラーが発生しました', 'error');  // ❌ エラーが発生しました
showMessage();  // ℹ️ メッセージがありません
```

## デフォルト引数の注意点

### 1. 順序が大切

デフォルト引数は、**後ろの引数から**設定するのが一般的です：

```javascript
// ✅ 良い例
function calc(a, b = 10) {
  return a + b;
}

calc(5);     // 15（bはデフォルト値10）
calc(5, 3);  // 8

// ❌ 良くない例
function calc2(a = 10, b) {
  return a + b;
}

calc2(5);  // NaN（bがundefined）
```

### 2. undefinedを渡すとデフォルト値が使われる

```javascript
function greet(name = 'ゲスト') {
  alert('こんにちは、' + name + 'さん');
}

greet(undefined);  // こんにちは、ゲストさん（デフォルト値が使われる）
greet(null);       // こんにちは、nullさん（nullは値として扱われる）
```

## 従来の方法との比較

### 従来の方法（デフォルト引数がない時代）

```javascript
function greet(name) {
  if (name === undefined) {
    name = 'ゲスト';
  }
  alert('こんにちは、' + name + 'さん');
}
```

### デフォルト引数を使う方法（現代）

```javascript
function greet(name = 'ゲスト') {
  alert('こんにちは、' + name + 'さん');
}
```

デフォルト引数を使う方がシンプルで読みやすいです。

## 練習問題

### 問題: カスタムメッセージ表示アプリを作ろう

以下の要件を満たすアプリを作成してください：

1. メッセージを入力するフォームがある
2. タイプ（成功/エラー/情報）を選ぶセレクトボックスがある
3. 「表示」ボタンを押すと、メッセージが表示される
4. `showMessage(message = 'メッセージなし', type = 'info')`関数を使う
5. メッセージが空の場合は、デフォルト値が使われる

### ヒント

```javascript
function showMessage(message = 'メッセージがありません', type = 'info') {
  let bgColor = '';
  let icon = '';

  if (type === 'success') {
    bgColor = '#d4edda';
    icon = '✅ ';
  } else if (type === 'error') {
    bgColor = '#f8d7da';
    icon = '❌ ';
  } else {
    bgColor = '#d1ecf1';
    icon = 'ℹ️ ';
  }

  const output = document.getElementById('output');
  output.style.backgroundColor = bgColor;
  output.textContent = icon + message;
}

function displayMessage() {
  const message = document.getElementById('messageInput').value;
  const type = document.getElementById('typeSelect').value;

  // メッセージが空の場合、引数を渡さない（デフォルト値が使われる）
  if (message === '') {
    showMessage(undefined, type);
  } else {
    showMessage(message, type);
  }
}
```

## まとめ

- **デフォルト引数**を使うと、引数が省略された場合の値を設定できる
- `function 関数名(引数 = デフォルト値)`のように書く
- 複数の引数にデフォルト値を設定できる
- デフォルト引数は、後ろの引数から設定するのが一般的
- undefinedを渡すとデフォルト値が使われる
- より柔軟で使いやすい関数を作成できる

次のレッスンでは、**ローカル変数**について学びます。

## 復習問題

1. デフォルト引数とは何ですか？
2. デフォルト引数はどのように書きますか？
3. デフォルト引数を使うメリットは何ですか？
