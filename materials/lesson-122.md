# レッスン122：関数式の基本

**作成日**: 2025-11-26

## このレッスンで学ぶこと

### 前回の復習
前回のレッスンでは、**関数型電卓プロジェクト**を作成しました。

```javascript
// これまで学んだ関数宣言
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}
```

10レッスン分の知識を統合して、実践的なアプリケーションを作ることができました。

### よくある場面
プログラミングをしていると、こんな状況に遭遇します：

```javascript
// 関数を変数に入れたい...
const myFunction = ???

// 条件によって違う関数を使いたい...
let operation;
if (mode === 'add') {
  operation = 足し算関数;
} else {
  operation = 引き算関数;
}

// 関数を別の関数に渡したい...
doSomething(関数をここに渡したい);
```

これまで学んだ関数宣言では、これらができません。

JavaScriptでは、**関数を値として扱う**ことができます。この書き方を**関数式**と呼びます。

### 学習目標
このレッスンでは以下を学びます：

1. **関数式の書き方**を理解する
2. **変数に関数を代入**できることを学ぶ
3. **関数宣言と関数式の違い**を理解する
4. **関数が値である**ことを理解する（第一級オブジェクト）

## 関数宣言と関数式

### これまでの方法：関数宣言

これまで学んだ関数の書き方は**関数宣言**と呼ばれます。

```javascript
// 関数宣言（function declaration）
function greet() {
  alert('こんにちは');
}
```

**関数宣言の特徴**：
- `function` キーワードで始まる
- 関数名が必須
- そのまま呼び出せる

### 新しい方法：関数式

JavaScriptでは、**関数を値として扱う**ことができます。関数を変数に代入する書き方を**関数式**と呼びます。

```javascript
// 関数式（function expression）
const greet = function() {
  alert('こんにちは');
};
```

**関数式の特徴**：
- 変数に代入する
- `function` の後の関数名は省略可能（通常は省略）
- セミコロン `;` が必要

### 📖 日常生活での例：道具と道具箱

関数宣言と関数式の違いを、道具に例えてみましょう：

```
関数宣言：
├─ 道具に名前が付いていて、どこにあるか決まっている
├─ 例：「包丁は台所の引き出しにある」
└─ いつでもその場所から使える

関数式：
├─ 道具を道具箱に入れて持ち運べる
├─ 例：「道具箱に包丁を入れて、必要な場所に持っていく」
└─ 道具箱ごと移動できる、別の道具箱に移し替えられる
```

関数式を使うと、**関数を自由に扱える**ようになります。

## 関数式の基本構文

関数式は `function` キーワードの後に関数名を書かず、変数に代入します。

```javascript
const 変数名 = function() {
  // 処理
};
```

**ポイント**：
- `const` で宣言（関数を再代入することは稀）
- `=` の右側に `function() { }` を書く
- 最後にセミコロン `;` が必要

### 例1：引数なし

```javascript
const sayHello = function() {
  alert('Hello!');
};

// 呼び出し方は関数宣言と同じ
sayHello();  // 'Hello!' が表示される
```

**実行の流れ**：
```
1. const sayHello = function() { ... };
   └─ 変数 sayHello に関数を代入
↓
2. sayHello();
   └─ 変数 sayHello に入っている関数を呼び出す
↓
3. alert('Hello!'); が実行される
↓
'Hello!' が表示される
```

### 例2：引数あり

```javascript
const greet = function(name) {
  alert('こんにちは、' + name + 'さん');
};

greet('太郎');  // 'こんにちは、太郎さん'
```

**実行の流れ**：
```
greet('太郎') を呼び出し
↓
1. name に '太郎' が入る
2. 'こんにちは、' + '太郎' + 'さん' を計算
3. alert('こんにちは、太郎さん') を実行
↓
'こんにちは、太郎さん' が表示される
```

### 例3：戻り値あり

```javascript
const add = function(a, b) {
  return a + b;
};

const result = add(5, 3);  // 8
console.log(result);       // 8
```

**実行の流れ**：
```
add(5, 3) を呼び出し
↓
1. a に 5 が入る
2. b に 3 が入る
3. 5 + 3 = 8 を計算
4. 8 を返す
↓
result に 8 が入る
```

### 視覚的な構造

```
関数宣言：
┌──────────────────┐
│ function add(a, b) {  │
│   return a + b;       │
│ }                     │
└──────────────────┘
     ↓ 呼び出し
  add(5, 3)

関数式：
┌──────────────────┐
│ const add =          │  ← 変数に代入
│   function(a, b) {   │
│     return a + b;    │
│   };                 │  ← セミコロン
└──────────────────┘
     ↓ 呼び出し
  add(5, 3)
```

## 関数宣言 vs 関数式：詳細比較

### 書き方の違い

```javascript
// 関数宣言
function add(a, b) {
  return a + b;
}

// 関数式
const add = function(a, b) {
  return a + b;
};
```

### 比較表

| 項目 | 関数宣言 | 関数式 |
|------|---------|--------|
| **書き方** | `function name() {}` | `const name = function() {};` |
| **関数名** | 必須 | 省略可能 |
| **セミコロン** | 不要 | 必要 `;` |
| **巻き上げ** | される | されない |
| **代入** | できない | できる |
| **使い分け** | 一般的な関数 | 変数として扱いたい時 |

### セミコロンの違い

```javascript
// 関数宣言：セミコロン不要
function greet() {
  alert('こんにちは');
}  // セミコロンなし

// 関数式：セミコロン必要
const greet = function() {
  alert('こんにちは');
};  // セミコロン必須

// なぜなら、変数の代入文だから
const name = '太郎';  // 変数の代入にセミコロン
const greet = function() { };  // 関数の代入にもセミコロン
```

## 巻き上げ（ホイスティング）の違い

### 関数宣言：巻き上げされる

関数宣言は、**定義前に呼び出せます**。

```javascript
// 定義前に呼び出せる
greet();  // 'こんにちは' と表示される（エラーにならない）

function greet() {
  alert('こんにちは');
}
```

**なぜ動くのか**：

JavaScriptが自動的に関数を上に移動（巻き上げ）してくれるためです。

```
実際のコード：
  greet();           ← 先に呼び出し
  function greet() { ... }  ← 後で定義

JavaScriptの解釈（内部処理）：
  function greet() { ... }  ← 自動的に上に移動
  greet();           ← 呼び出し
```

### 関数式：巻き上げされない

関数式は、**定義前に呼び出せません**。

```javascript
// エラー！定義前に呼び出せない
greet();  // エラー: greet is not a function

const greet = function() {
  alert('こんにちは');
};
```

**なぜエラーになるのか**：

関数式は変数なので、`const` の宣言は巻き上げされますが、代入は巻き上げされません。

```
実際のコード：
  greet();                    ← この時点では undefined
  const greet = function() { ... };  ← ここで初めて関数が代入される

JavaScriptの解釈（内部処理）：
  let greet;                  ← 変数の宣言だけ上に移動
  greet();                    ← undefined() はエラー
  greet = function() { ... }; ← 代入はここ
```

### 正しい使い方

関数式は、**定義の後に呼び出します**。

```javascript
// ✅ 正しい：定義の後に呼び出す
const greet = function() {
  alert('こんにちは');
};

greet();  // OK
```

```javascript
// ❌ 間違い：定義前に呼び出す
greet();  // エラー

const greet = function() {
  alert('こんにちは');
};
```

## 関数は値である（第一級オブジェクト）

JavaScriptでは、関数は**第一級オブジェクト**（first-class object）です。

**第一級オブジェクト**とは：
- 変数に代入できる
- 他の変数に再代入できる
- 関数の引数として渡せる
- 関数の戻り値として返せる

これらすべてができる値を「第一級」と呼びます。

### 1. 変数に代入できる

```javascript
const myFunc = function() {
  return 'Hello';
};

console.log(myFunc());  // 'Hello'
```

**視覚化**：
```
myFunc という箱に、関数が入っている

┌──────────────┐
│  myFunc      │
│  ┌────────┐ │
│  │function│ │
│  │() {...}│ │
│  └────────┘ │
└──────────────┘
```

### 2. 他の変数に再代入できる

```javascript
const func1 = function() {
  return 'Hello';
};

const func2 = func1;  // 関数をコピー
console.log(func2());  // 'Hello'
```

**実行の流れ**：
```
1. func1 に関数を代入
   func1 → [関数]

2. func2 = func1;
   func1 → [関数]
   func2 → [同じ関数]

3. func2() を呼び出し
   → 'Hello' が返る
```

**視覚化**：
```
func1 と func2 が同じ関数を指している

     func1
       ↓
   ┌────────┐
   │function│  ← 同じ関数
   │() {...}│
   └────────┘
       ↑
     func2
```

### 3. 引数として渡せる（後のレッスンで詳しく学習）

関数を別の関数に渡すことができます。

```javascript
// 関数を引数として受け取る関数
function execute(func) {
  func();
}

// 実行したい関数を作る
const myFunc = function() {
  alert('実行されました');
};

// 関数を引数として渡す
execute(myFunc);  // '実行されました' が表示される
```

**実行の流れ**：
```
execute(myFunc) を呼び出し
↓
1. execute 関数の中に入る
2. 引数 func に myFunc（関数）が入る
3. func() を実行
   → myFunc() が実行される
   → alert('実行されました')
↓
'実行されました' が表示される
```

### 4. 戻り値として返せる（後のレッスンで詳しく学習）

関数から関数を返すことができます。

```javascript
// 関数を返す関数
function createGreeter() {
  return function() {
    return 'こんにちは';
  };
}

const greet = createGreeter();  // 関数が返ってくる
console.log(greet());           // 'こんにちは'
```

**実行の流れ**：
```
createGreeter() を呼び出し
↓
1. createGreeter 関数の中に入る
2. function() { return 'こんにちは'; } を返す
↓
greet に関数が入る
↓
greet() を呼び出し
↓
'こんにちは' が返る
```

## 実践例1：計算機

関数式を使った計算機です。

```javascript
// 足し算
const add = function(a, b) {
  return a + b;
};

// 引き算
const subtract = function(a, b) {
  return a - b;
};

// 掛け算
const multiply = function(a, b) {
  return a * b;
};

// 割り算
const divide = function(a, b) {
  if (b === 0) {
    return 0;
  }
  return a / b;
};

// 使用例
console.log(add(10, 5));       // 15
console.log(subtract(10, 5));  // 5
console.log(multiply(10, 5));  // 50
console.log(divide(10, 5));    // 2
```

**関数宣言との違い**：

```javascript
// 関数宣言の場合
function add(a, b) {
  return a + b;
}

// 関数式の場合
const add = function(a, b) {
  return a + b;
};

// 呼び出し方は同じ
add(10, 5);  // 15
```

## 実践例2：条件によって関数を切り替える

関数式を使うと、**条件によって異なる関数を使う**ことができます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>関数式の例</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    button {
      padding: 10px 20px;
      margin: 5px;
      font-size: 16px;
      cursor: pointer;
    }
    .formal {
      background: #007bff;
      color: white;
    }
    .casual {
      background: #28a745;
      color: white;
    }
  </style>
</head>
<body>
  <h1>挨拶切り替え</h1>
  <p>挨拶のスタイルを選択してください：</p>
  <button class="formal" onclick="setFormalMode()">フォーマル</button>
  <button class="casual" onclick="setCasualMode()">カジュアル</button>
  <br><br>
  <button onclick="greet()">挨拶する</button>

  <script>
    // 挨拶関数を入れる変数
    let currentGreeting;

    // フォーマルな挨拶
    const formalGreeting = function() {
      alert('いつもお世話になっております。');
    };

    // カジュアルな挨拶
    const casualGreeting = function() {
      alert('やあ！元気？');
    };

    // フォーマルモードに切り替え
    function setFormalMode() {
      currentGreeting = formalGreeting;
      alert('フォーマルモードに設定しました');
    }

    // カジュアルモードに切り替え
    function setCasualMode() {
      currentGreeting = casualGreeting;
      alert('カジュアルモードに設定しました');
    }

    // 現在のモードで挨拶
    function greet() {
      if (currentGreeting) {
        currentGreeting();  // 現在設定されている関数を呼び出す
      } else {
        alert('先にモードを選択してください');
      }
    }
  </script>
</body>
</html>
```

**実行の流れ**：
```
1. setFormalMode() を呼び出し
   ↓
   currentGreeting = formalGreeting;
   currentGreeting → [フォーマルな挨拶関数]

2. greet() を呼び出し
   ↓
   currentGreeting();
   → formalGreeting() が実行される
   → 'いつもお世話になっております。' が表示される

3. setCasualMode() を呼び出し
   ↓
   currentGreeting = casualGreeting;
   currentGreeting → [カジュアルな挨拶関数]

4. greet() を呼び出し
   ↓
   currentGreeting();
   → casualGreeting() が実行される
   → 'やあ！元気？' が表示される
```

この例では、**変数に入れる関数を切り替える**ことで、動作を変えています。

## 実践例3：関数の配列

関数を配列に入れることもできます。

```javascript
// 関数の配列
const operations = [
  function(a, b) { return a + b; },  // 0: 足し算
  function(a, b) { return a - b; },  // 1: 引き算
  function(a, b) { return a * b; },  // 2: 掛け算
  function(a, b) { return a / b; }   // 3: 割り算
];

// 配列から関数を取り出して実行
console.log(operations[0](10, 5));  // 15（足し算）
console.log(operations[1](10, 5));  // 5（引き算）
console.log(operations[2](10, 5));  // 50（掛け算）
console.log(operations[3](10, 5));  // 2（割り算）
```

**実行の流れ**：
```
operations[0](10, 5) を呼び出し
↓
1. operations[0] から関数を取り出す
   → function(a, b) { return a + b; }
2. この関数を (10, 5) で呼び出す
3. 10 + 5 = 15 を計算
4. 15 を返す
```

## どちらを使うべきか

### 関数宣言を使う場合

```javascript
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

**使う場面**：
- トップレベルの一般的な関数
- 何度も再利用する関数
- 巻き上げが必要な場合（定義前に呼び出したい）
- シンプルで読みやすいコードを書きたい

### 関数式を使う場合

```javascript
const calculateTotal = function(price, quantity) {
  return price * quantity;
};
```

**使う場面**：
- 変数に関数を代入したい
- 後で別の関数に差し替える可能性がある
- 関数を引数として渡す（コールバック関数）
- 関数を戻り値として返す
- 条件によって異なる関数を使いたい

### 実際のプロジェクトでは

```javascript
// トップレベルの関数：関数宣言
function getUserData() {
  // ...
}

function processData(data) {
  // ...
}

// コールバック関数：関数式
button.addEventListener('click', function() {
  // クリック時の処理
});

// 条件で切り替える関数：関数式
let validator;
if (mode === 'strict') {
  validator = function(value) {
    // 厳格なチェック
  };
} else {
  validator = function(value) {
    // ゆるいチェック
  };
}
```

## よくある間違い

### 間違い1：セミコロンを忘れる

```javascript
// ❌ 間違い
const greet = function() {
  alert('こんにちは');
}  // セミコロンがない

// ✅ 正しい
const greet = function() {
  alert('こんにちは');
};  // セミコロンが必要
```

**理由**：関数式は変数への代入文なので、セミコロンが必要です。

```javascript
const name = '太郎';  // 変数の代入にセミコロン
const greet = function() { };  // 関数の代入にもセミコロン
```

### 間違い2：定義前に呼び出す

```javascript
// ❌ 間違い
greet();  // エラー: greet is not a function

const greet = function() {
  alert('こんにちは');
};

// ✅ 正しい
const greet = function() {
  alert('こんにちは');
};

greet();  // OK
```

**理由**：関数式は巻き上げされないため、定義前に呼び出せません。

### 間違い3：let や var で宣言

```javascript
// ⚠️ 避けるべき
let greet = function() {
  alert('こんにちは');
};

// 後で再代入できてしまう
greet = function() {
  alert('さようなら');  // 意図せず変更される可能性
};

// ✅ 推奨：const を使う
const greet = function() {
  alert('こんにちは');
};

// 再代入しようとするとエラー
greet = function() { };  // エラー
```

**理由**：関数を再代入することは稀なので、`const` を使うのが推奨されます。

## 名前付き関数式

関数式でも、関数に名前を付けることができます（オプション）。

```javascript
const greet = function greetFunc() {
  alert('こんにちは');
};
```

**ただし、この名前は関数の外からは呼び出せません**：

```javascript
const greet = function greetFunc() {
  alert('こんにちは');
};

greet();       // ✅ OK
greetFunc();   // ❌ エラー: greetFunc is not defined
```

**名前付き関数式を使う場面**：

再帰呼び出し（関数が自分自身を呼び出す）のとき：

```javascript
const countdown = function countdownFunc(n) {
  if (n <= 0) {
    console.log('終了！');
    return;
  }
  console.log(n);
  countdownFunc(n - 1);  // 自分自身を呼び出す
};

countdown(3);
// 出力:
// 3
// 2
// 1
// 終了！
```

**通常は名前を省略します**：

```javascript
// 一般的な書き方（名前なし）
const greet = function() {
  alert('こんにちは');
};
```

## まとめ

### 関数式の重要ポイント

1. **関数式**は、関数を変数に代入する書き方
   ```javascript
   const greet = function() { };
   ```

2. **セミコロン**が必要
   ```javascript
   const greet = function() { };  // ← セミコロン
   ```

3. **巻き上げされない**ので、定義の後に呼び出す
   ```javascript
   const greet = function() { };
   greet();  // 定義の後
   ```

4. 関数は**値**として扱える（第一級オブジェクト）
   ```javascript
   const func1 = function() { };
   const func2 = func1;  // コピーできる
   ```

5. 基本的に `const` で宣言する
   ```javascript
   const greet = function() { };  // const 推奨
   ```

### 関数宣言と関数式の比較

| 項目 | 関数宣言 | 関数式 |
|------|---------|--------|
| **書き方** | `function name() {}` | `const name = function() {};` |
| **関数名** | 必須 | 省略可能 |
| **セミコロン** | 不要 | 必要 `;` |
| **巻き上げ** | される | されない |
| **再代入** | できない | できる（let の場合） |
| **使い分け** | 一般的な関数 | 値として扱いたい時 |

### 使い分けガイド

```javascript
// ✅ 関数宣言：一般的な関数
function getUserData() {
  // ...
}

// ✅ 関数式：変数として扱う
const validator = function(value) {
  // ...
};

// ✅ 関数式：条件で切り替える
let operation;
if (mode === 'add') {
  operation = function(a, b) { return a + b; };
} else {
  operation = function(a, b) { return a - b; };
}
```

## 練習問題

### 練習問題1：関数式を書く（基本）

以下の関数宣言を、関数式に書き換えてください。

```javascript
// 1. 引数なし
function sayHello() {
  alert('Hello!');
}

// 2. 引数あり
function greet(name) {
  alert('こんにちは、' + name + 'さん');
}

// 3. 戻り値あり
function multiply(a, b) {
  return a * b;
}
```

<details>
<summary>解答例</summary>

```javascript
// 1. 引数なし
const sayHello = function() {
  alert('Hello!');
};

// 2. 引数あり
const greet = function(name) {
  alert('こんにちは、' + name + 'さん');
};

// 3. 戻り値あり
const multiply = function(a, b) {
  return a * b;
};
```

**ポイント**：
- `const` を使う
- `function` の後に関数名を書かない
- 最後にセミコロン `;` をつける

</details>

---

### 練習問題2：関数を切り替える（応用）

ユーザーの年齢によって、異なる挨拶をする関数を作成してください。

**要件**：
- 18歳未満：「こんにちは！」
- 18歳以上：「お疲れ様です。」
- 関数式を使って実装する

<details>
<summary>ヒント</summary>

1. 子供向けの挨拶関数を作る
2. 大人向けの挨拶関数を作る
3. 年齢をチェックして、適切な関数を選ぶ
4. 選んだ関数を実行する

</details>

<details>
<summary>解答例</summary>

```javascript
// 子供向けの挨拶
const greetChild = function() {
  alert('こんにちは！');
};

// 大人向けの挨拶
const greetAdult = function() {
  alert('お疲れ様です。');
};

// 年齢に応じて挨拶する関数
function greetByAge(age) {
  let greetingFunc;

  if (age < 18) {
    greetingFunc = greetChild;
  } else {
    greetingFunc = greetAdult;
  }

  greetingFunc();  // 選んだ関数を実行
}

// テスト
greetByAge(15);  // 'こんにちは！'
greetByAge(20);  // 'お疲れ様です。'
```

**実行の流れ**（age = 15 の場合）：
```
greetByAge(15) を呼び出し
↓
1. age に 15 が入る
2. age < 18 が true
3. greetingFunc = greetChild;
   greetingFunc → [greetChild 関数]
4. greetingFunc();
   → greetChild() が実行される
   → alert('こんにちは！')
↓
'こんにちは！' が表示される
```

</details>

---

### 練習問題3：計算機アプリを作る（発展）

関数式を使って、計算機アプリを作成してください。

**要件**：
- 4つの演算（+, -, ×, ÷）を関数式で実装
- ボタンで演算を切り替えられる
- 現在の演算で計算を実行

<details>
<summary>ヒント</summary>

1. 4つの計算関数を関数式で作る
2. 現在の演算を保持する変数を作る
3. ボタンで演算を切り替える関数を作る
4. 計算を実行する関数を作る

</details>

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>関数式計算機</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .input-group {
      margin-bottom: 15px;
    }
    input {
      padding: 8px;
      width: 150px;
      font-size: 16px;
    }
    button {
      padding: 10px 20px;
      margin: 5px;
      font-size: 16px;
      cursor: pointer;
    }
    .operator-btn {
      background: #007bff;
      color: white;
    }
    .operator-btn.active {
      background: #0056b3;
      box-shadow: 0 0 10px rgba(0,123,255,0.5);
    }
    .calc-btn {
      background: #28a745;
      color: white;
      font-size: 18px;
    }
    .result {
      margin-top: 20px;
      padding: 15px;
      background: #f0f0f0;
      border-radius: 5px;
      font-size: 20px;
    }
  </style>
</head>
<body>
  <h1>関数式計算機</h1>

  <div class="input-group">
    <label>数値1：</label>
    <input type="number" id="num1" value="10">
  </div>

  <div class="input-group">
    <label>数値2：</label>
    <input type="number" id="num2" value="5">
  </div>

  <div>
    <p>演算を選択：</p>
    <button class="operator-btn" onclick="setOperation('add')">+</button>
    <button class="operator-btn" onclick="setOperation('subtract')">-</button>
    <button class="operator-btn" onclick="setOperation('multiply')">×</button>
    <button class="operator-btn" onclick="setOperation('divide')">÷</button>
  </div>

  <button class="calc-btn" onclick="calculate()">計算する</button>

  <div class="result" id="result">演算を選択してください</div>

  <script>
    // 計算関数を関数式で定義
    const add = function(a, b) {
      return a + b;
    };

    const subtract = function(a, b) {
      return a - b;
    };

    const multiply = function(a, b) {
      return a * b;
    };

    const divide = function(a, b) {
      if (b === 0) {
        return 0;
      }
      return a / b;
    };

    // 現在の演算を保持する変数
    let currentOperation = null;
    let operationSymbol = '';

    // 演算を設定する関数
    function setOperation(type) {
      // すべてのボタンから active クラスを削除
      document.querySelectorAll('.operator-btn').forEach(btn => {
        btn.classList.remove('active');
      });

      // クリックされたボタンに active クラスを追加
      event.target.classList.add('active');

      // 演算を設定
      if (type === 'add') {
        currentOperation = add;
        operationSymbol = '+';
      } else if (type === 'subtract') {
        currentOperation = subtract;
        operationSymbol = '-';
      } else if (type === 'multiply') {
        currentOperation = multiply;
        operationSymbol = '×';
      } else if (type === 'divide') {
        currentOperation = divide;
        operationSymbol = '÷';
      }

      document.getElementById('result').textContent =
        '演算: ' + operationSymbol + ' が選択されました';
    }

    // 計算を実行する関数
    function calculate() {
      if (!currentOperation) {
        document.getElementById('result').textContent =
          '先に演算を選択してください';
        return;
      }

      const num1 = Number(document.getElementById('num1').value);
      const num2 = Number(document.getElementById('num2').value);

      // 現在設定されている関数を実行
      const result = currentOperation(num1, num2);

      document.getElementById('result').textContent =
        num1 + ' ' + operationSymbol + ' ' + num2 + ' = ' + result;
    }
  </script>
</body>
</html>
```

**実行の流れ**：
```
1. setOperation('add') を呼び出し
   ↓
   currentOperation = add;
   operationSymbol = '+';
   → 足し算関数が設定される

2. calculate() を呼び出し
   ↓
   num1 = 10, num2 = 5 を取得
   ↓
   result = currentOperation(10, 5);
   → add(10, 5) が実行される
   → 15 が返る
   ↓
   「10 + 5 = 15」を表示
```

**関数式の利点**：
- `currentOperation` 変数に関数を代入できる
- ボタンで関数を切り替えられる
- 同じ `calculate()` 関数で異なる演算ができる

</details>

## カリキュラム要件チェック

このレッスンで以下の要件を満たしています：

✅ **const func = function() {}**
- 関数式の基本構文を詳しく解説
- const での宣言方法を説明
- セミコロンの必要性を強調

✅ **変数に関数を代入**
- 関数を値として扱えることを説明
- 変数への代入、再代入、コピーを実例で示した
- 条件による関数の切り替え例を提示

✅ **関数宣言との違い**
- 構文の違いを比較表で整理
- 巻き上げ（ホイスティング）の違いを詳しく解説
- セミコロンの有無を説明
- 使い分けガイドを提示

✅ **知識：関数式、第一級オブジェクト**
- 第一級オブジェクトの概念を説明
- 4つの特性（代入、再代入、引数、戻り値）を解説
- 実践的な例（計算機、挨拶切り替え、関数の配列）を提示

✅ **成果物：関数式理解**
- 3つの練習問題で段階的に理解を深める
- 完全な計算機アプリで実践的な応用を学習

## 次回予告

次回のレッスンでは、関数式をさらに短く書ける**アロー関数**を学びます。

```javascript
// 関数式
const add = function(a, b) {
  return a + b;
};

// アロー関数（次回学習）
const add = (a, b) => a + b;
```

アロー関数は、モダンなJavaScriptで非常によく使われる書き方です。楽しみにしていてください！
