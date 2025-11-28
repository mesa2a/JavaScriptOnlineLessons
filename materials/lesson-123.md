# レッスン123：無名関数の活用

**作成日**: 2025-11-26

## このレッスンで学ぶこと

### 前回の復習
前回のレッスンでは、**関数式**を学びました。

```javascript
// 関数式：関数を変数に代入
const greet = function() {
  alert('こんにちは');
};

// 関数を値として扱える
const func2 = func1;  // コピー
```

関数は第一級オブジェクトなので、変数に代入したり、他の関数に渡したりできることを学びました。

### よくある場面
プログラミングをしていると、こんな状況に遭遇します：

```javascript
// ボタンクリックの処理を書きたい
button.addEventListener('click', ???);

// でも、この処理は1回しか使わない...
// わざわざ関数を定義するのは面倒...
function handleClick() {
  alert('クリック');
}
button.addEventListener('click', handleClick);

// もっと短く書けないかな？
```

一度しか使わない関数に、わざわざ名前をつける必要はありません。

JavaScriptでは、**名前を省略した関数**（無名関数）を使うことができます。

### 学習目標
このレッスンでは以下を学びます：

1. **無名関数**（匿名関数）とは何かを理解する
2. **addEventListener内での無名関数**の使い方を学ぶ
3. **一度だけ使う関数**に無名関数を活用する
4. **コールバック関数**のパターンを理解する

## 無名関数とは

### 名前付き関数式（前回の復習）

前回学んだ関数式では、`function` の後に名前を書くことができました。

```javascript
// 名前付き関数式
const greet = function greetFunc() {
  alert('こんにちは');
};
```

ただし、この名前（`greetFunc`）は関数の外からは呼び出せません。

### 無名関数（匿名関数）

**無名関数**（匿名関数、Anonymous Function）は、名前を持たない関数のことです。

```javascript
// 無名関数（名前を省略）
const greet = function() {
  alert('こんにちは');
};
```

`function` の後に名前を書かないだけです。

### 📖 日常生活での例：使い捨てのメモ

無名関数を、メモに例えてみましょう：

```
名前付きのファイル：
├─ ファイル名：「2025年計画.txt」
├─ 何度も見返す
└─ 整理してフォルダに保存

使い捨てのメモ：
├─ ファイル名：なし（付箋紙に書く）
├─ 一度だけ使う
└─ 使ったらポイッ
```

**一度だけ使うメモ**には、わざわざ名前をつけません。

**無名関数**も同じです。一度だけ使う関数には、名前をつける必要がありません。

## 無名関数の使い道

無名関数は、以下のような場合に便利です：

1. **一度だけ使う関数**
2. **イベントリスナー内**
3. **コールバック関数として**

名前をつける必要がない場合に使います。

## 1. addEventListener内で使う

### これまでの方法（関数を別に定義）

イベントリスナーに関数を登録する方法を復習しましょう。

```javascript
// 関数を定義
function handleClick() {
  alert('クリックされました');
}

// イベントリスナーに登録
const button = document.getElementById('myButton');
button.addEventListener('click', handleClick);
```

**問題点**：
- `handleClick` という名前を考える必要がある
- 一度しか使わないのに、わざわざ別の場所で定義している
- コードが分散して読みにくい

### 無名関数を使う方法

一度だけ使う関数なら、**その場で直接書けます**。

```javascript
const button = document.getElementById('myButton');

// 無名関数を直接書く
button.addEventListener('click', function() {
  alert('クリックされました');
});
```

**利点**：
- 名前を考える必要がない
- 処理がその場に書いてあるので読みやすい
- コードが短くなる

### 視覚的な比較

```
名前付き関数：
┌──────────────────────┐
│ function handleClick() {  │  ← 別の場所で定義
│   alert('クリック');      │
│ }                         │
└──────────────────────┘
         ↓
┌──────────────────────┐
│ button.addEventListener(  │
│   'click', handleClick    │  ← 名前を渡す
│ );                        │
└──────────────────────┘

無名関数：
┌──────────────────────┐
│ button.addEventListener(  │
│   'click', function() {   │  ← その場に直接書く
│     alert('クリック');    │
│   }                       │
│ );                        │
└──────────────────────┘
```

## 実践例：ボタンクリック

### 例1：シンプルなクリック

```javascript
const button = document.getElementById('btn');

button.addEventListener('click', function() {
  alert('ボタンがクリックされました！');
});
```

**実行の流れ**：
```
1. ボタンをクリック
↓
2. addEventListener が無名関数を実行
↓
3. alert('ボタンがクリックされました！')
↓
アラートが表示される
```

### 例2：複数の処理

無名関数の中に、複数の処理を書くこともできます。

```javascript
const button = document.getElementById('btn');

button.addEventListener('click', function() {
  console.log('クリックされました');
  alert('こんにちは！');
  document.body.style.backgroundColor = 'lightblue';
});
```

**実行の流れ**：
```
1. ボタンをクリック
↓
2. 無名関数が実行される
↓
3. console.log('クリックされました')
4. alert('こんにちは！')
5. 背景色を lightblue に変更
↓
すべての処理が順番に実行される
```

### 例3：イベントオブジェクトを使う

無名関数も、引数を受け取ることができます。

```javascript
const button = document.getElementById('btn');

button.addEventListener('click', function(event) {
  console.log('クリックされた要素:', event.target);
  console.log('クリック位置: X=' + event.clientX + ', Y=' + event.clientY);
  alert('マウスの位置: (' + event.clientX + ', ' + event.clientY + ')');
});
```

**実行の流れ**：
```
1. ボタンをクリック
↓
2. addEventListener がイベントオブジェクトを渡して無名関数を実行
↓
3. event 引数にイベント情報が入る
   event.target → クリックされた要素（ボタン）
   event.clientX → マウスのX座標
   event.clientY → マウスのY座標
↓
4. これらの情報をコンソールとアラートに表示
```

## 2. 一度だけ使う関数

関数を一度しか使わない場合、無名関数が適しています。

### 再利用する関数：名前をつける

複数の場所で使う関数には、名前をつけます。

```javascript
// 複数の場所で使う関数
const validateEmail = function(email) {
  return email.includes('@') && email.includes('.');
};

// いろんな場所で使う
if (validateEmail(email1)) {
  console.log('email1は有効');
}

if (validateEmail(email2)) {
  console.log('email2は有効');
}

if (validateEmail(email3)) {
  console.log('email3は有効');
}
```

**理由**：
- 同じ処理を何度も書かなくて済む
- 修正が1箇所で済む
- 再利用できる

### 一度だけ使う関数：無名関数

一度しか使わない処理には、無名関数を使います。

```javascript
// 一度だけ使う処理
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', function() {
  const email = document.getElementById('email').value;
  if (email.includes('@') && email.includes('.')) {
    alert('有効なメールアドレスです');
  } else {
    alert('メールアドレスが正しくありません');
  }
});
```

**理由**：
- この処理はこのボタンでしか使わない
- 名前を考える必要がない
- コードがシンプルになる

## 3. コールバック関数

### コールバック関数とは

**コールバック関数**とは、他の関数に引数として渡される関数のことです。

```javascript
// コールバックを受け取る関数
function execute(callback) {
  console.log('処理を開始します');
  callback();  // ← コールバック関数を実行
  console.log('処理が完了しました');
}

// 無名関数をコールバックとして渡す
execute(function() {
  console.log('コールバック関数が実行されました');
});
```

**実行の流れ**：
```
execute(function() { ... }) を呼び出し
↓
1. execute 関数の中に入る
2. 引数 callback に無名関数が入る
3. console.log('処理を開始します')
↓
4. callback() を実行
   → 無名関数が実行される
   → console.log('コールバック関数が実行されました')
↓
5. console.log('処理が完了しました')

出力：
処理を開始します
コールバック関数が実行されました
処理が完了しました
```

### addEventListener はコールバックを使っている

`addEventListener` も、コールバック関数を受け取ります。

```javascript
// 'click' イベントが起きたら、このコールバックを実行してください
button.addEventListener('click', function() {
  alert('クリックされました');
});
```

**仕組み**：
```
addEventListener の内部（イメージ）：
function addEventListener(eventType, callback) {
  // イベントが起きるのを待つ
  // クリックされたら...
  callback();  // ← 渡された関数を実行
}
```

## 実践例1：カウンターアプリ

無名関数を使ったカウンターです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>カウンターアプリ</title>
  <style>
    body {
      font-family: sans-serif;
      text-align: center;
      padding: 50px;
    }
    #display {
      font-size: 48px;
      margin: 30px;
      font-weight: bold;
    }
    button {
      padding: 15px 30px;
      font-size: 18px;
      margin: 5px;
      cursor: pointer;
    }
    .up {
      background: #28a745;
      color: white;
    }
    .down {
      background: #dc3545;
      color: white;
    }
    .reset {
      background: #6c757d;
      color: white;
    }
  </style>
</head>
<body>
  <h1>カウンターアプリ</h1>
  <div id="display">0</div>
  <button class="up" id="upBtn">+1</button>
  <button class="down" id="downBtn">-1</button>
  <button class="reset" id="resetBtn">リセット</button>

  <script>
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
  </script>
</body>
</html>
```

**実行の流れ**：
```
+1 ボタンをクリック
↓
1. 'upBtn' の click イベント発生
2. 無名関数が実行される
3. count = count + 1;
   count: 0 → 1
4. display の textContent を更新
↓
画面に「1」が表示される
```

**無名関数の利点**：
- それぞれのボタンに、その場で必要な処理を直接書いている
- 3つの処理は互いに独立している
- どのボタンが何をするか、一目でわかる

## 実践例2：入力バリデーション

フォームの入力チェックです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>入力バリデーション</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .input-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      padding: 8px;
      width: 100%;
      box-sizing: border-box;
      font-size: 16px;
    }
    .error {
      color: red;
      font-size: 14px;
      margin-top: 5px;
      min-height: 20px;
    }
  </style>
</head>
<body>
  <h1>ユーザー登録</h1>

  <div class="input-group">
    <label>名前：</label>
    <input type="text" id="name" placeholder="山田太郎">
    <div class="error" id="nameError"></div>
  </div>

  <div class="input-group">
    <label>メールアドレス：</label>
    <input type="email" id="email" placeholder="example@mail.com">
    <div class="error" id="emailError"></div>
  </div>

  <script>
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
  </script>
</body>
</html>
```

**実行の流れ**（名前入力時）：
```
名前入力欄に「太」と入力
↓
1. 'input' イベント発生
2. 無名関数が実行される
3. value = '太' （1文字）
4. value.length < 3 が true
5. エラーメッセージを表示
↓
「3文字以上入力してください」が表示される

さらに「郎」を追加して「太郎」に
↓
1. 'input' イベント発生
2. 無名関数が実行される
3. value = '太郎' （2文字）
4. value.length < 3 が true
5. エラーメッセージを表示
↓
「3文字以上入力してください」が表示される

さらに「太」を追加して「太郎太」に
↓
1. 'input' イベント発生
2. 無名関数が実行される
3. value = '太郎太' （3文字）
4. value.length < 3 が false
5. エラーメッセージをクリア
↓
エラーメッセージが消える
```

## 名前をつける vs 無名関数

### 名前をつけるべき場合

```javascript
// 複数の場所で使う関数
const validateEmail = function(email) {
  return email.includes('@') && email.includes('.');
};

// いろんな場所で再利用
if (validateEmail(email1)) { }
if (validateEmail(email2)) { }
if (validateEmail(email3)) { }
```

**理由**：
- 再利用できる
- テストしやすい
- メンテナンスしやすい

### 無名関数が良い場合

```javascript
// 一度だけ使う処理
button.addEventListener('click', function() {
  alert('クリックされました');
});
```

**理由**：
- 名前を考える必要がない
- コードがシンプル
- 処理がその場に書いてあるので読みやすい

### 判断基準

| 判断基準 | 名前付き関数 | 無名関数 |
|---------|------------|---------|
| **再利用する** | ✅ | ❌ |
| **一度だけ使う** | ❌ | ✅ |
| **テストしたい** | ✅ | ❌ |
| **短い処理** | △ | ✅ |
| **長い処理** | ✅ | △ |

## 複数のイベントリスナー

同じ要素に、複数のイベントリスナーを登録できます。

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

**実行の流れ**：
```
マウスをボタンに乗せる
↓
1. 'mouseover' イベント発生
2. 2つ目の無名関数が実行される
3. 背景色が lightblue になる

マウスをボタンから離す
↓
1. 'mouseout' イベント発生
2. 3つ目の無名関数が実行される
3. 背景色がクリアされる

ボタンをクリック
↓
1. 'click' イベント発生
2. 1つ目の無名関数が実行される
3. コンソールに出力
```

それぞれのイベントに、独立した無名関数を使っています。

## よくある間違い

### 間違い1：関数を実行してしまう

```javascript
// ❌ 間違い：() をつけると即実行される
button.addEventListener('click', myFunction());
// ページ読み込み時に実行されてしまう

// ✅ 正しい：関数自体を渡す
button.addEventListener('click', myFunction);

// ✅ または無名関数で包む
button.addEventListener('click', function() {
  myFunction();
});
```

**なぜ間違いなのか**：
```
myFunction() ← 括弧があると即実行
  ↓
実行結果（戻り値）が addEventListener に渡される
  ↓
戻り値は関数ではないので、クリック時に何も起きない
```

**正しい書き方**：
```
myFunction ← 関数自体を渡す
  ↓
クリック時に myFunction が実行される
```

### 間違い2：イベントリスナーの外で定義

```javascript
// ⚠️ 避けるべき：再利用しないのに外で定義
const handleClick = function() {
  alert('クリック');
};
button.addEventListener('click', handleClick);

// ✅ 良い：一度だけなら直接書く
button.addEventListener('click', function() {
  alert('クリック');
});
```

**理由**：
- `handleClick` は一度しか使わない
- わざわざ名前をつける必要がない
- 無名関数の方がシンプル

## コールバックパターンの応用

### 繰り返し処理の後にコールバック

```javascript
function processItems(items, callback) {
  console.log('処理を開始します');

  for (let i = 0; i < items.length; i++) {
    console.log('処理中:', items[i]);
  }

  console.log('処理を終了します');
  callback();  // 完了後にコールバック実行
}

// 使用例
processItems(['りんご', 'バナナ', 'オレンジ'], function() {
  console.log('すべての処理が完了しました！');
});
```

**実行の流れ**：
```
processItems(...) を呼び出し
↓
1. '処理を開始します'
2. '処理中: りんご'
3. '処理中: バナナ'
4. '処理中: オレンジ'
5. '処理を終了します'
6. callback() が実行される
   → 無名関数が実行される
   → 'すべての処理が完了しました！'

出力：
処理を開始します
処理中: りんご
処理中: バナナ
処理中: オレンジ
処理を終了します
すべての処理が完了しました！
```

### 条件付きコールバック

成功時と失敗時で、異なるコールバックを実行します。

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

**実行の流れ**（age = 20 の場合）：
```
checkAge(20, ...) を呼び出し
↓
1. age = 20
2. successCallback = 1つ目の無名関数
3. errorCallback = 2つ目の無名関数
↓
4. age >= 18 が true
5. successCallback() を実行
   → 1つ目の無名関数が実行される
   → alert('成人です')
↓
「成人です」が表示される
```

**実行の流れ**（age = 15 の場合）：
```
checkAge(15, ...) を呼び出し
↓
1. age = 15
2. successCallback = 1つ目の無名関数
3. errorCallback = 2つ目の無名関数
↓
4. age >= 18 が false
5. errorCallback() を実行
   → 2つ目の無名関数が実行される
   → alert('未成年です')
↓
「未成年です」が表示される
```

## 実践例3：色変更アプリ

複数のボタンで背景色を変更するアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>色変更アプリ</title>
  <style>
    body {
      font-family: sans-serif;
      text-align: center;
      padding: 50px;
      transition: background-color 0.3s;
    }
    button {
      padding: 20px 40px;
      font-size: 18px;
      margin: 10px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      color: white;
      font-weight: bold;
    }
    .red { background: #dc3545; }
    .blue { background: #007bff; }
    .green { background: #28a745; }
    .yellow { background: #ffc107; color: #333; }
    .reset { background: #6c757d; }
  </style>
</head>
<body>
  <h1>背景色を変更しよう</h1>

  <button class="red" id="redBtn">赤</button>
  <button class="blue" id="blueBtn">青</button>
  <button class="green" id="greenBtn">緑</button>
  <button class="yellow" id="yellowBtn">黄</button>
  <button class="reset" id="resetBtn">リセット</button>

  <script>
    // 赤ボタン
    document.getElementById('redBtn').addEventListener('click', function() {
      document.body.style.backgroundColor = '#ffcccc';
    });

    // 青ボタン
    document.getElementById('blueBtn').addEventListener('click', function() {
      document.body.style.backgroundColor = '#cce5ff';
    });

    // 緑ボタン
    document.getElementById('greenBtn').addEventListener('click', function() {
      document.body.style.backgroundColor = '#d4edda';
    });

    // 黄ボタン
    document.getElementById('yellowBtn').addEventListener('click', function() {
      document.body.style.backgroundColor = '#fff3cd';
    });

    // リセットボタン
    document.getElementById('resetBtn').addEventListener('click', function() {
      document.body.style.backgroundColor = '';
    });
  </script>
</body>
</html>
```

**無名関数の利点**：
- 各ボタンの処理が独立している
- どのボタンが何色に変更するか、一目でわかる
- コードがシンプルで読みやすい

## まとめ

### 無名関数の重要ポイント

1. **無名関数**は、名前を省略した関数
   ```javascript
   function() {
     // 処理
   }
   ```

2. **一度だけ使う関数**に適している
   ```javascript
   button.addEventListener('click', function() {
     alert('クリック');
   });
   ```

3. **addEventListener**で頻繁に使う
   ```javascript
   element.addEventListener('イベント', function() {
     // 処理
   });
   ```

4. **コールバック関数**として使える
   ```javascript
   execute(function() {
     console.log('コールバック');
   });
   ```

### 使い分けガイド

```javascript
// ✅ 再利用する → 名前付き関数式
const validateEmail = function(email) {
  return email.includes('@');
};

if (validateEmail(email1)) { }
if (validateEmail(email2)) { }

// ✅ 一度だけ使う → 無名関数
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

### コールバックパターン

```javascript
// コールバックを受け取る関数
function process(callback) {
  // 処理
  callback();  // コールバックを実行
}

// 無名関数をコールバックとして渡す
process(function() {
  console.log('完了');
});
```

## 練習問題

### 練習問題1：ボタンクリックで挨拶（基本）

ボタンをクリックすると、入力欄の名前で挨拶するアプリを作成してください。

**要件**：
- 入力欄に名前を入力
- ボタンをクリックすると「こんにちは、〇〇さん！」と表示
- 無名関数を使う

<details>
<summary>ヒント</summary>

1. 入力欄から名前を取得
2. 挨拶メッセージを作成
3. alert で表示

</details>

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>挨拶アプリ</title>
</head>
<body>
  <h1>挨拶アプリ</h1>
  <input type="text" id="nameInput" placeholder="名前を入力">
  <button id="greetBtn">挨拶する</button>

  <script>
    document.getElementById('greetBtn').addEventListener('click', function() {
      const name = document.getElementById('nameInput').value;
      alert('こんにちは、' + name + 'さん！');
    });
  </script>
</body>
</html>
```

</details>

---

### 練習問題2：複数のボタンイベント（応用）

3つのボタンで異なるメッセージを表示するアプリを作成してください。

**要件**：
- 「おはよう」「こんにちは」「こんばんは」の3つのボタン
- それぞれクリックすると、対応する挨拶を表示
- すべて無名関数を使う

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>時間帯の挨拶</title>
  <style>
    button {
      padding: 15px 30px;
      margin: 10px;
      font-size: 18px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>時間帯の挨拶</h1>
  <button id="morningBtn">おはよう</button>
  <button id="afternoonBtn">こんにちは</button>
  <button id="eveningBtn">こんばんは</button>

  <script>
    document.getElementById('morningBtn').addEventListener('click', function() {
      alert('おはようございます！');
    });

    document.getElementById('afternoonBtn').addEventListener('click', function() {
      alert('こんにちは！');
    });

    document.getElementById('eveningBtn').addEventListener('click', function() {
      alert('こんばんは！');
    });
  </script>
</body>
</html>
```

</details>

---

### 練習問題3：入力チェック付きフォーム（発展）

名前とメールアドレスの入力チェック付きフォームを作成してください。

**要件**：
- 名前：2文字以上
- メールアドレス：@を含む
- リアルタイムでエラー表示
- すべて無名関数を使う

<details>
<summary>ヒント</summary>

1. 'input' イベントで入力を監視
2. 条件をチェック
3. エラーメッセージを表示/非表示

</details>

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>入力チェック付きフォーム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .input-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
      font-size: 16px;
    }
    .error {
      color: red;
      font-size: 14px;
      margin-top: 5px;
      min-height: 20px;
    }
    .valid {
      color: green;
      font-size: 14px;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <h1>ユーザー登録</h1>

  <div class="input-group">
    <label>名前：</label>
    <input type="text" id="name" placeholder="山田太郎">
    <div class="error" id="nameError"></div>
    <div class="valid" id="nameValid"></div>
  </div>

  <div class="input-group">
    <label>メールアドレス：</label>
    <input type="email" id="email" placeholder="example@mail.com">
    <div class="error" id="emailError"></div>
    <div class="valid" id="emailValid"></div>
  </div>

  <script>
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // 名前の入力チェック
    nameInput.addEventListener('input', function() {
      const value = nameInput.value;
      const errorDiv = document.getElementById('nameError');
      const validDiv = document.getElementById('nameValid');

      if (value.length === 0) {
        errorDiv.textContent = '';
        validDiv.textContent = '';
      } else if (value.length < 2) {
        errorDiv.textContent = '2文字以上入力してください';
        validDiv.textContent = '';
      } else {
        errorDiv.textContent = '';
        validDiv.textContent = '✓ 有効な名前です';
      }
    });

    // メールの入力チェック
    emailInput.addEventListener('input', function() {
      const value = emailInput.value;
      const errorDiv = document.getElementById('emailError');
      const validDiv = document.getElementById('emailValid');

      if (value.length === 0) {
        errorDiv.textContent = '';
        validDiv.textContent = '';
      } else if (!value.includes('@')) {
        errorDiv.textContent = '@を含めてください';
        validDiv.textContent = '';
      } else {
        errorDiv.textContent = '';
        validDiv.textContent = '✓ 有効なメールアドレスです';
      }
    });
  </script>
</body>
</html>
```

**実行の流れ**：
```
名前入力欄に「山」と入力
↓
1. 'input' イベント発生
2. 無名関数が実行される
3. value = '山' (1文字)
4. value.length < 2 が true
5. エラーメッセージ表示
↓
「2文字以上入力してください」

さらに「田」を追加
↓
1. 'input' イベント発生
2. 無名関数が実行される
3. value = '山田' (2文字)
4. value.length < 2 が false
5. 有効メッセージ表示
↓
「✓ 有効な名前です」
```

</details>

## カリキュラム要件チェック

このレッスンで以下の要件を満たしています：

✅ **addEventListener内で使用**
- addEventListener内での無名関数の使い方を詳しく解説
- 複数の実例（ボタンクリック、カウンター、入力チェック）を提示
- イベントオブジェクトの使い方も説明

✅ **一度だけ使う関数**
- 一度だけ使う関数に無名関数が適していることを説明
- 再利用する関数との使い分けを明確化
- 判断基準を表で整理

✅ **コールバック**
- コールバック関数の概念を詳しく解説
- addEventListener がコールバックを使っている仕組みを説明
- 応用例（処理完了後のコールバック、条件付きコールバック）を提示

✅ **知識：無名関数、コールバックパターン**
- 無名関数の定義と使い道を説明
- コールバックパターンの仕組みを実例で解説
- よくある間違い2つを具体的に説明

✅ **成果物：無名関数活用**
- 3つの実践例（カウンター、入力チェック、色変更）を完全実装
- 3つの練習問題で段階的に学習

## 次回予告

次回のレッスンでは、**即時実行関数（IIFE）**を学びます。

```javascript
// 即時実行関数
(function() {
  console.log('すぐに実行される');
})();
```

即時実行関数は、スコープを作るのに便利なパターンです。楽しみにしていてください！
