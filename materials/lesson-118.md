# Lesson 118: 引数と戻り値の型

**作成日: 2025-11-26**

---

## このレッスンで学ぶこと

### 前回の復習
前回のレッスンでは、**グローバル変数**について学びました：

```javascript
// グローバル変数
const APP_NAME = 'マイアプリ';  // どこからでもアクセス可能
let count = 0;

function increment() {
  count = count + 1;  // グローバル変数を更新
}
```

グローバル変数は複数の関数で共有できますが、使いすぎには注意が必要でした。

### よくある場面
プログラミングをしていると、こんな問題に遭遇します：

```javascript
function add(a, b) {
  return a + b;
}

add(5, 3);      // 8 ← 期待通り
add('5', '3');  // '53' ← あれ？足し算じゃなくて文字列の連結になった！
```

- 「数値を渡したつもりが、文字列だった」
- 「計算結果がおかしい」
- 「関数が期待した型と違う値を返す」

こんな問題を防ぐために、**型を意識した関数の書き方**を学びましょう。

### 学習目標
このレッスンでは：
- ✅ 関数の引数と戻り値には**データ型**があることを理解する
- ✅ **数値を受け取る**関数の書き方を学ぶ
- ✅ **文字列を返す**関数の書き方を学ぶ
- ✅ **型の一貫性**を保つことの重要性を理解する

---

## 1. 引数と戻り値の型とは？

### 日常生活のアナロジー：自動販売機の入力と出力

関数の引数と戻り値を、**自動販売機**に例えてみましょう：

```
自動販売機
┌────────────────────────────┐
│                            │
│  入力（引数）              │
│  ・お金（硬貨・紙幣）      │ ← 「お金」という型
│    100円玉、500円玉など    │
│                            │
│  ↓ 処理                    │
│                            │
│  出力（戻り値）            │
│  ・飲み物（缶・ペットボトル）│ ← 「飲み物」という型
│    コーラ、お茶など        │
└────────────────────────────┘

もし入力が違ったら？
- ボタンを入れる → 動かない（型が違う）
- お菓子が出てくる → おかしい（戻り値の型が違う）
```

関数も同じです：
- **引数**：関数に渡す値には**期待される型**がある
- **戻り値**：関数が返す値にも**期待される型**がある

### 基本的な例

```javascript
function add(a, b) {  // 引数：数値を2つ受け取る（期待）
  return a + b;       // 戻り値：数値を返す（期待）
}

const result = add(5, 3);  // 8 ← 期待通り
```

この関数は：
- **引数**：数値を2つ受け取ることを期待している
- **戻り値**：数値を返すことを期待している

### 実行フロー図解

```
add(5, 3)の実行
═══════════════════════════════════════

引数として渡される値
┌─────────────┐  ┌─────────────┐
│ a: 5        │  │ b: 3        │
│ 型: number  │  │ 型: number  │
└─────────────┘  └─────────────┘
       ↓              ↓
   ───────────────────────
   │  a + b を計算      │
   │  5 + 3 = 8         │
   ───────────────────────
              ↓
   ┌─────────────────┐
   │ return 8        │
   │ 型: number      │
   └─────────────────┘
```

---

## 2. 型を意識する理由

### 問題：型を意識しないとどうなるか？

型を意識しないと、予期しない動作が発生します：

```javascript
function add(a, b) {
  return a + b;
}

add(5, 3);      // 8 ← 期待通り（数値 + 数値 = 数値）
add('5', '3');  // '53' ← 文字列の連結になってしまう！
```

### 実行フロー図解：型が違う場合

```
add('5', '3')の実行
═══════════════════════════════════════

引数として渡される値
┌─────────────┐  ┌─────────────┐
│ a: '5'      │  │ b: '3'      │
│ 型: string  │  │ 型: string  │
└─────────────┘  └─────────────┘
       ↓              ↓
   ───────────────────────────
   │  a + b を実行            │
   │  '5' + '3'               │
   │  ↓                       │
   │  文字列の連結！          │
   │  結果: '53'              │
   ───────────────────────────
              ↓
   ┌─────────────────┐
   │ return '53'     │ ← 数値8ではなく、文字列'53'！
   │ 型: string      │
   └─────────────────┘
```

### なぜこうなるのか？

JavaScriptの`+`演算子は、**2つの役割**を持っています：

1. **数値の足し算**：`5 + 3` → `8`
2. **文字列の連結**：`'5' + '3'` → `'53'`

引数の型によって、動作が変わってしまいます。

---

## 3. 数値を受け取る関数

### 基本的な例

数値を受け取ることを想定した関数の例です：

```javascript
function calculateTax(price) {
  return price * 0.1;  // 10%の税金を計算
}

calculateTax(1000);    // 100 ← 正しい
calculateTax('1000');  // 100 ← たまたま動くが、期待と違う
```

### 問題：文字列を渡した場合

```javascript
function calculateTax(price) {
  return price * 0.1;
}

calculateTax('abc');  // NaN ← Not a Number（計算できない）
```

### 実行フロー図解：文字列を渡した場合

```
calculateTax('abc')の実行
═══════════════════════════════════════

引数として渡される値
┌─────────────┐
│ price: 'abc'│ ← 文字列（数値を期待していた）
│ 型: string  │
└─────────────┘
       ↓
   ───────────────────────────
   │  price * 0.1 を実行      │
   │  'abc' * 0.1             │
   │  ↓                       │
   │  文字列は掛け算できない  │
   │  結果: NaN               │
   ───────────────────────────
              ↓
   ┌─────────────────┐
   │ return NaN      │ ← エラー値
   │ 型: number      │
   └─────────────────┘
```

### 解決策：型チェックを追加

引数の型をチェックすることで、安全な関数になります：

```javascript
function calculateTax(price) {
  // 型チェック：priceが数値でない場合
  if (typeof price !== 'number') {
    return 0;  // 安全な値（0）を返す
  }

  return price * 0.1;
}

calculateTax(1000);    // 100 ← 正しい
calculateTax('1000');  // 0 ← エラーを安全に処理できた
calculateTax('abc');   // 0 ← エラーを安全に処理できた
```

### 実行フロー図解：型チェックあり

```
calculateTax('abc')の実行（型チェックあり）
═══════════════════════════════════════

引数として渡される値
┌─────────────┐
│ price: 'abc'│
│ 型: string  │
└─────────────┘
       ↓
   ─────────────────────────────
   │ 型チェック                │
   │ typeof price !== 'number' │
   │ ↓                         │
   │ true（文字列なので）      │
   ─────────────────────────────
              ↓
   ┌─────────────────┐
   │ return 0        │ ← 安全な値を返す
   │ 型: number      │
   └─────────────────┘
```

---

## 4. 文字列を返す関数

### 基本的な例

文字列を返すことを想定した関数の例です：

```javascript
function greet(name) {
  return 'こんにちは、' + name + 'さん';
}

greet('太郎');  // 'こんにちは、太郎さん' ← 正しい
greet(123);     // 'こんにちは、123さん' ← 動くが、意図と違う
```

### 問題：数値を渡した場合

```javascript
greet(123);  // 'こんにちは、123さん'
```

動作はしますが、名前に数値を渡すのは意図と違います。

### 解決策：型チェックを追加

```javascript
function greet(name) {
  // 型チェック：nameが文字列でない場合
  if (typeof name !== 'string') {
    return 'こんにちは';  // 安全な文字列を返す
  }

  return 'こんにちは、' + name + 'さん';
}

greet('太郎');  // 'こんにちは、太郎さん' ← 正しい
greet(123);     // 'こんにちは' ← エラーを安全に処理できた
```

### 実行フロー図解

```
greet(123)の実行（型チェックあり）
═══════════════════════════════════════

引数として渡される値
┌─────────────┐
│ name: 123   │
│ 型: number  │
└─────────────┘
       ↓
   ─────────────────────────────
   │ 型チェック                │
   │ typeof name !== 'string'  │
   │ ↓                         │
   │ true（数値なので）        │
   ─────────────────────────────
              ↓
   ┌──────────────────────┐
   │ return 'こんにちは'  │ ← 安全な文字列を返す
   │ 型: string           │
   └──────────────────────┘
```

---

## 5. 型の一貫性

### 重要な原則：同じ関数から異なる型を返さない

同じ関数から**異なる型**の値を返すのは避けましょう。

### 悪い例：戻り値の型が一貫していない

```javascript
function divide(a, b) {
  if (b === 0) {
    return '0で割れません';  // ← 文字列を返す
  }
  return a / b;  // ← 数値を返す
}

const result1 = divide(10, 2);  // 5（数値）
const result2 = divide(10, 0);  // '0で割れません'（文字列）

// 問題が発生
const doubled = result1 * 2;  // 10（正しい）
const doubled2 = result2 * 2;  // NaN（文字列 × 2 は計算できない）
```

### 実行フロー図解：型が一貫していない場合

```
型が一貫していない場合の問題
═══════════════════════════════════════

divide(10, 2)の場合
┌─────────────┐
│ return 5    │ ← 数値
│ 型: number  │
└─────────────┘
       ↓
   result1 = 5
       ↓
   result1 * 2 = 10 ✅ 正しく計算できる

divide(10, 0)の場合
┌──────────────────────┐
│ return '0で割れません'│ ← 文字列
│ 型: string           │
└──────────────────────┘
       ↓
   result2 = '0で割れません'
       ↓
   result2 * 2 = NaN ❌ 計算できない！
```

### 良い例：戻り値の型が一貫している

```javascript
function divide(a, b) {
  if (b === 0) {
    return 0;  // ← エラー時も数値を返す
  }
  return a / b;  // ← 数値を返す
}

const result1 = divide(10, 2);  // 5（数値）
const result2 = divide(10, 0);  // 0（数値）

// 常に正しく計算できる
const doubled1 = result1 * 2;  // 10 ✅
const doubled2 = result2 * 2;  // 0 ✅
```

### 実行フロー図解：型が一貫している場合

```
型が一貫している場合
═══════════════════════════════════════

divide(10, 2)の場合
┌─────────────┐
│ return 5    │ ← 数値
│ 型: number  │
└─────────────┘

divide(10, 0)の場合
┌─────────────┐
│ return 0    │ ← 数値（エラー時も同じ型）
│ 型: number  │
└─────────────┘

どちらの場合も型がnumberなので、
常に正しく計算できる ✅
```

---

## 6. 数値を返す関数の例

### 例：年齢計算関数

戻り値が**常に数値**であることを保証する関数です：

```javascript
function getAge(birthYear) {
  const currentYear = 2025;
  const age = currentYear - birthYear;

  // 値の妥当性チェック
  if (age < 0 || age > 150) {
    return 0;  // 不正な値の場合は0を返す
  }

  return age;  // 常に数値を返す
}

getAge(1990);   // 35（数値）
getAge(2030);   // 0（数値、未来の年なのでエラー値）
getAge(1800);   // 0（数値、150歳超えなのでエラー値）
```

この関数は：
- **引数**：数値（生まれ年）を期待
- **戻り値**：**常に数値**（年齢、またはエラー時は0）

### 実行フロー図解

```
getAge(1990)の実行
═══════════════════════════════════════

引数として渡される値
┌──────────────────┐
│ birthYear: 1990  │
│ 型: number       │
└──────────────────┘
       ↓
   ────────────────────────
   │ 計算                 │
   │ currentYear = 2025   │
   │ age = 2025 - 1990    │
   │     = 35             │
   ────────────────────────
       ↓
   ────────────────────────
   │ 妥当性チェック       │
   │ age < 0 || age > 150 │
   │ 35 < 0? false        │
   │ 35 > 150? false      │
   │ ↓                    │
   │ チェックOK           │
   ────────────────────────
       ↓
   ┌─────────────┐
   │ return 35   │ ← 常に数値を返す
   │ 型: number  │
   └─────────────┘
```

---

## 7. 文字列を返す関数の例

### 例：価格フォーマット関数

戻り値が**常に文字列**であることを保証する関数です：

```javascript
function formatPrice(price) {
  // 型チェック
  if (typeof price !== 'number') {
    return '価格不明';  // エラー時も文字列を返す
  }

  // 値の妥当性チェック
  if (price < 0) {
    return '価格不明';  // マイナスは不正
  }

  return price + '円';  // 常に文字列を返す
}

formatPrice(1000);    // '1000円'（文字列）
formatPrice('abc');   // '価格不明'（文字列）
formatPrice(-100);    // '価格不明'（文字列）
```

この関数は：
- **引数**：数値を期待
- **戻り値**：**常に文字列**

### 実行フロー図解

```
formatPrice(1000)の実行
═══════════════════════════════════════

引数として渡される値
┌─────────────┐
│ price: 1000 │
│ 型: number  │
└─────────────┘
       ↓
   ────────────────────────────
   │ 型チェック               │
   │ typeof price !== 'number'│
   │ ↓                        │
   │ false（数値なのでOK）    │
   ────────────────────────────
       ↓
   ────────────────────────────
   │ 妥当性チェック           │
   │ price < 0                │
   │ 1000 < 0? false          │
   │ ↓                        │
   │ チェックOK               │
   ────────────────────────────
       ↓
   ┌──────────────────┐
   │ return '1000円'  │ ← 常に文字列を返す
   │ 型: string       │
   └──────────────────┘
```

---

## 8. 複数の型を扱う場合

引数が**複数の型**を受け付ける場合は、明確に処理を分けます。

### 例：数値変換関数

```javascript
function convertToNumber(value) {
  // すでに数値の場合
  if (typeof value === 'number') {
    return value;  // そのまま返す
  }

  // 文字列の場合
  if (typeof value === 'string') {
    const num = Number(value);
    if (isNaN(num)) {
      return 0;  // 変換失敗時は0
    }
    return num;
  }

  // その他の型
  return 0;
}

convertToNumber(123);      // 123（数値をそのまま返す）
convertToNumber('456');    // 456（文字列を数値に変換）
convertToNumber('abc');    // 0（変換失敗）
convertToNumber(true);     // 0（真偽値は0を返す）
```

この関数は：
- **引数**：任意の型を受け付ける
- **戻り値**：**常に数値**

### 実行フロー図解

```
convertToNumber('456')の実行
═══════════════════════════════════════

引数として渡される値
┌─────────────┐
│ value: '456'│
│ 型: string  │
└─────────────┘
       ↓
   ────────────────────────────
   │ typeof value === 'number' │
   │ ↓                         │
   │ false（文字列なので）     │
   ────────────────────────────
       ↓
   ────────────────────────────
   │ typeof value === 'string' │
   │ ↓                         │
   │ true（文字列だ！）        │
   ────────────────────────────
       ↓
   ────────────────────────────
   │ 文字列を数値に変換       │
   │ const num = Number('456')│
   │ num = 456                │
   │                          │
   │ isNaN(num)?              │
   │ ↓                        │
   │ false（変換成功）        │
   ────────────────────────────
       ↓
   ┌─────────────┐
   │ return 456  │ ← 常に数値を返す
   │ 型: number  │
   └─────────────┘
```

---

## 9. 実践例：BMI計算アプリ

型を意識した実用的なアプリを作ってみましょう。

### コード全体

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>BMI計算アプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #e3f2fd;
    }

    .container {
      background-color: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    h1 {
      text-align: center;
      color: #1976d2;
      margin-bottom: 30px;
    }

    .input-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #1976d2;
    }

    button {
      width: 100%;
      padding: 15px;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 18px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #1565c0;
    }

    #output {
      margin-top: 25px;
      padding: 20px;
      background-color: #e1f5fe;
      border-left: 4px solid #1976d2;
      border-radius: 5px;
      font-size: 18px;
      min-height: 50px;
    }

    .error {
      background-color: #ffebee;
      border-left-color: #f44336;
      color: #c62828;
    }

    .success {
      background-color: #e8f5e9;
      border-left-color: #4caf50;
      color: #2e7d32;
    }

    .type-info {
      margin-top: 20px;
      padding: 15px;
      background-color: #fff3e0;
      border-radius: 5px;
      font-size: 14px;
      color: #e65100;
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

    <div class="type-info">
      💡 このアプリは型を意識して作られています。<br>
      数値以外を入力するとエラーメッセージが表示されます。
    </div>
  </div>

  <script>
    // BMI計算関数（型を意識した設計）
    function calculateBMI(height, weight) {
      // 引数の型チェック
      if (typeof height !== 'number' || typeof weight !== 'number') {
        return 0;  // エラー時は0を返す（常に数値を返す）
      }

      // 値の範囲チェック
      if (height <= 0 || weight <= 0) {
        return 0;  // 不正な値の場合は0を返す
      }

      if (height > 300 || weight > 500) {
        return 0;  // 現実的でない値の場合は0を返す
      }

      // BMI計算
      const heightM = height / 100;  // cmをmに変換
      const bmi = weight / (heightM * heightM);

      // 小数点以下1桁に丸める
      return Math.round(bmi * 10) / 10;  // 常に数値を返す
    }

    // BMI判定関数（型を意識した設計）
    function judgeBMI(bmi) {
      // 引数の型チェック
      if (typeof bmi !== 'number') {
        return 'エラー';  // エラー時も文字列を返す（常に文字列を返す）
      }

      // BMIが0の場合（エラー値）
      if (bmi === 0) {
        return 'エラー';  // 常に文字列を返す
      }

      // BMI判定
      if (bmi < 18.5) {
        return 'やせ';
      } else if (bmi < 25) {
        return '標準';
      } else if (bmi < 30) {
        return '肥満（1度）';
      } else {
        return '肥満（2度以上）';
      }
    }

    // エラーメッセージを返す関数（型を意識した設計）
    function getErrorMessage(height, weight) {
      // 引数の型チェック
      if (typeof height !== 'number' || typeof weight !== 'number') {
        return '数値を入力してください';  // 常に文字列を返す
      }

      // 値の範囲チェック
      if (height <= 0 || weight <= 0) {
        return '正しい数値を入力してください（正の数）';
      }

      if (height > 300) {
        return '身長が現実的ではありません（300cm以下を入力）';
      }

      if (weight > 500) {
        return '体重が現実的ではありません（500kg以下を入力）';
      }

      return '';  // エラーがない場合は空文字列
    }

    // 計算ボタンのクリック処理
    function calculate() {
      // 入力値を取得（Number関数で数値に変換）
      const height = Number(document.getElementById('heightInput').value);
      const weight = Number(document.getElementById('weightInput').value);

      // 出力要素を取得
      const outputElement = document.getElementById('output');

      // エラーメッセージをチェック
      const errorMessage = getErrorMessage(height, weight);

      if (errorMessage !== '') {
        // エラーがある場合
        outputElement.textContent = '❌ ' + errorMessage;
        outputElement.className = 'error';
        return;
      }

      // BMI計算
      const bmi = calculateBMI(height, weight);

      // エラーチェック（bmiが0の場合）
      if (bmi === 0) {
        outputElement.textContent = '❌ 計算エラーが発生しました';
        outputElement.className = 'error';
        return;
      }

      // BMI判定
      const judgment = judgeBMI(bmi);

      // 結果表示
      outputElement.innerHTML =
        '✅ BMI: <strong>' + bmi + '</strong><br>' +
        '判定: <strong>' + judgment + '</strong><br>' +
        '<small>（身長: ' + height + 'cm、体重: ' + weight + 'kg）</small>';
      outputElement.className = 'success';
    }
  </script>
</body>
</html>
```

### 型を意識したポイント

このアプリでは、以下のように型を意識して設計されています：

1. **calculateBMI関数**：
   - 引数：2つの数値を期待
   - 戻り値：**常に数値**（正常時はBMI、エラー時は0）

2. **judgeBMI関数**：
   - 引数：数値を期待
   - 戻り値：**常に文字列**

3. **getErrorMessage関数**：
   - 引数：2つの数値を期待
   - 戻り値：**常に文字列**（エラーメッセージ、またはエラーがない場合は空文字列）

### 実行フロー図解

```
calculate()が呼ばれた場合
═══════════════════════════════════════

1. 入力値を取得
   height = Number(入力値) → 170（数値）
   weight = Number(入力値) → 65（数値）

2. getErrorMessage(170, 65)を呼び出し
   ↓
   型チェック: OK（どちらも数値）
   範囲チェック: OK（正の数）
   現実性チェック: OK（現実的な値）
   ↓
   return ''（エラーなし）

3. エラーがないので、BMI計算へ
   ↓
   calculateBMI(170, 65)を呼び出し
   ↓
   型チェック: OK（どちらも数値）
   範囲チェック: OK（正の数）
   現実性チェック: OK（現実的な値）
   ↓
   heightM = 170 / 100 = 1.7
   bmi = 65 / (1.7 * 1.7) = 22.49...
   ↓
   return 22.5（小数点以下1桁に丸めた数値）

4. bmiが0でないので、判定へ
   ↓
   judgeBMI(22.5)を呼び出し
   ↓
   型チェック: OK（数値）
   値チェック: OK（0でない）
   ↓
   22.5 < 18.5? false
   22.5 < 25? true
   ↓
   return '標準'（文字列）

5. 結果を画面に表示
   「BMI: 22.5」
   「判定: 標準」
```

---

## 10. 型チェックの基本パターン

型をチェックする基本的なパターンをまとめました：

### 数値チェック

```javascript
if (typeof value !== 'number') {
  // valueが数値でない場合の処理
  return 0;  // またはエラー値を返す
}
```

### 文字列チェック

```javascript
if (typeof value !== 'string') {
  // valueが文字列でない場合の処理
  return '';  // またはエラー値を返す
}
```

### 真偽値チェック

```javascript
if (typeof value !== 'boolean') {
  // valueが真偽値でない場合の処理
  return false;  // またはエラー値を返す
}
```

### 配列チェック

```javascript
if (!Array.isArray(value)) {
  // valueが配列でない場合の処理
  return [];  // またはエラー値を返す
}
```

### NaNチェック（数値計算後）

```javascript
const result = Number(value);
if (isNaN(result)) {
  // 数値に変換できなかった場合の処理
  return 0;  // またはエラー値を返す
}
```

---

## 練習問題

### 問題1: 型チェックを追加する（基本）

以下の関数に型チェックを追加してください：

```javascript
function multiply(a, b) {
  return a * b;
}
```

**要件**：
- `a`と`b`が数値でない場合は、`0`を返す
- 正常時は、掛け算の結果を返す

<details>
<summary>解答例</summary>

```javascript
function multiply(a, b) {
  // 型チェック
  if (typeof a !== 'number' || typeof b !== 'number') {
    return 0;  // 数値でない場合は0を返す
  }

  return a * b;  // 常に数値を返す
}

// テスト
console.log(multiply(5, 3));      // 15 ← 正しい
console.log(multiply('5', 3));    // 0 ← エラーを安全に処理
console.log(multiply(5, 'abc'));  // 0 ← エラーを安全に処理
```

**実行フロー**：

```
multiply('5', 3)の実行
═══════════════════════════════════════

引数として渡される値
┌─────────────┐  ┌─────────────┐
│ a: '5'      │  │ b: 3        │
│ 型: string  │  │ 型: number  │
└─────────────┘  └─────────────┘
       ↓
   ─────────────────────────────────
   │ 型チェック                    │
   │ typeof a !== 'number' ||      │
   │ typeof b !== 'number'         │
   │ ↓                             │
   │ 'string' !== 'number' → true  │
   │ ↓                             │
   │ 条件が真なので、エラー処理    │
   ─────────────────────────────────
              ↓
   ┌─────────────┐
   │ return 0    │ ← 安全な値を返す
   │ 型: number  │
   └─────────────┘
```

</details>

---

### 問題2: 型の一貫性を保つ（応用）

以下の関数は、型の一貫性が保たれていません。修正してください：

```javascript
function getDiscount(price) {
  if (price >= 10000) {
    return 1000;  // 1000円引き
  }
  if (price >= 5000) {
    return 500;  // 500円引き
  }
  return 'なし';  // 割引なし ← 問題：文字列を返している
}
```

**要件**：
- 戻り値を**常に数値**にする
- 割引がない場合は`0`を返す
- 型チェックも追加する

<details>
<summary>解答例</summary>

```javascript
function getDiscount(price) {
  // 型チェック
  if (typeof price !== 'number') {
    return 0;  // エラー時も数値を返す
  }

  // 値の範囲チェック
  if (price < 0) {
    return 0;  // マイナスの価格は不正
  }

  // 割引計算
  if (price >= 10000) {
    return 1000;  // 1000円引き（数値）
  }
  if (price >= 5000) {
    return 500;  // 500円引き（数値）
  }
  return 0;  // 割引なし（数値） ← 修正：常に数値を返す
}

// テスト
console.log(getDiscount(12000));   // 1000
console.log(getDiscount(7000));    // 500
console.log(getDiscount(3000));    // 0 ← 修正：数値を返す
console.log(getDiscount('abc'));   // 0 ← 型エラーを安全に処理
console.log(getDiscount(-100));    // 0 ← 範囲エラーを安全に処理

// 戻り値が常に数値なので、計算も安全
const finalPrice1 = 12000 - getDiscount(12000);  // 11000 ✅
const finalPrice2 = 3000 - getDiscount(3000);    // 3000 ✅
```

**実行フロー**：

```
getDiscount(3000)の実行
═══════════════════════════════════════

引数として渡される値
┌─────────────┐
│ price: 3000 │
│ 型: number  │
└─────────────┘
       ↓
   ────────────────────────────
   │ 型チェック               │
   │ typeof price !== 'number'│
   │ ↓                        │
   │ false（数値なのでOK）    │
   ────────────────────────────
       ↓
   ────────────────────────────
   │ 範囲チェック             │
   │ price < 0                │
   │ ↓                        │
   │ false（正の数なのでOK）  │
   ────────────────────────────
       ↓
   ────────────────────────────
   │ 割引計算                 │
   │ price >= 10000? false    │
   │ price >= 5000? false     │
   │ ↓                        │
   │ どの条件にも当てはまらない│
   ────────────────────────────
       ↓
   ┌─────────────┐
   │ return 0    │ ← 割引なしの場合も数値を返す
   │ 型: number  │
   └─────────────┘
```

</details>

---

### 問題3: 複合型チェックアプリ（発展）

以下の要件を満たす「入力検証アプリ」を作成してください：

**要件**：
1. 名前（文字列）、年齢（数値）、メールアドレス（文字列）を入力するフォーム
2. 「検証」ボタンを押すと、以下をチェックする：
   - 名前：文字列で、1文字以上
   - 年齢：数値で、0〜150の範囲
   - メールアドレス：文字列で、「@」を含む
3. 検証結果を画面に表示する
4. 以下の関数を作成する：
   - `validateName(name)`: 名前を検証（戻り値：常に文字列、エラーメッセージまたは空文字列）
   - `validateAge(age)`: 年齢を検証（戻り値：常に文字列、エラーメッセージまたは空文字列）
   - `validateEmail(email)`: メールアドレスを検証（戻り値：常に文字列、エラーメッセージまたは空文字列）

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>入力検証アプリ</title>
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
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    h1 {
      text-align: center;
      color: #5e35b1;
      margin-bottom: 30px;
    }

    .input-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #5e35b1;
    }

    button {
      width: 100%;
      padding: 15px;
      background-color: #5e35b1;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 18px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #4527a0;
    }

    #output {
      margin-top: 25px;
      padding: 20px;
      border-radius: 5px;
      font-size: 16px;
      min-height: 50px;
    }

    .error {
      background-color: #ffebee;
      border-left: 4px solid #f44336;
      color: #c62828;
    }

    .success {
      background-color: #e8f5e9;
      border-left: 4px solid #4caf50;
      color: #2e7d32;
    }

    .error-item {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📝 入力検証アプリ</h1>

    <div class="input-group">
      <label for="nameInput">名前：</label>
      <input type="text" id="nameInput" placeholder="例: 山田太郎">
    </div>

    <div class="input-group">
      <label for="ageInput">年齢：</label>
      <input type="number" id="ageInput" placeholder="例: 25">
    </div>

    <div class="input-group">
      <label for="emailInput">メールアドレス：</label>
      <input type="text" id="emailInput" placeholder="例: example@mail.com">
    </div>

    <button onclick="validate()">検証</button>

    <div id="output"></div>
  </div>

  <script>
    // 名前を検証する関数（型を意識した設計）
    function validateName(name) {
      // 型チェック
      if (typeof name !== 'string') {
        return '名前は文字列で入力してください';  // 常に文字列を返す
      }

      // 空文字チェック
      if (name.trim() === '') {
        return '名前を入力してください';
      }

      // 長さチェック
      if (name.trim().length < 1) {
        return '名前は1文字以上入力してください';
      }

      return '';  // エラーがない場合は空文字列
    }

    // 年齢を検証する関数（型を意識した設計）
    function validateAge(age) {
      // 型チェック
      if (typeof age !== 'number') {
        return '年齢は数値で入力してください';  // 常に文字列を返す
      }

      // NaNチェック
      if (isNaN(age)) {
        return '年齢は有効な数値で入力してください';
      }

      // 範囲チェック
      if (age < 0) {
        return '年齢は0以上の数値で入力してください';
      }

      if (age > 150) {
        return '年齢は150以下の数値で入力してください';
      }

      return '';  // エラーがない場合は空文字列
    }

    // メールアドレスを検証する関数（型を意識した設計）
    function validateEmail(email) {
      // 型チェック
      if (typeof email !== 'string') {
        return 'メールアドレスは文字列で入力してください';  // 常に文字列を返す
      }

      // 空文字チェック
      if (email.trim() === '') {
        return 'メールアドレスを入力してください';
      }

      // @の有無チェック
      if (email.indexOf('@') === -1) {
        return 'メールアドレスに@を含めてください';
      }

      // @の位置チェック
      if (email.indexOf('@') === 0) {
        return 'メールアドレスの@の前に文字を入力してください';
      }

      if (email.indexOf('@') === email.length - 1) {
        return 'メールアドレスの@の後に文字を入力してください';
      }

      return '';  // エラーがない場合は空文字列
    }

    // 検証ボタンのクリック処理
    function validate() {
      // 入力値を取得
      const name = document.getElementById('nameInput').value;
      const age = Number(document.getElementById('ageInput').value);
      const email = document.getElementById('emailInput').value;

      // 各項目を検証
      const nameError = validateName(name);
      const ageError = validateAge(age);
      const emailError = validateEmail(email);

      // 出力要素を取得
      const outputElement = document.getElementById('output');

      // エラーメッセージを集める
      const errors = [];
      if (nameError !== '') {
        errors.push(nameError);
      }
      if (ageError !== '') {
        errors.push(ageError);
      }
      if (emailError !== '') {
        errors.push(emailError);
      }

      // エラーがある場合
      if (errors.length > 0) {
        let errorHtml = '❌ 以下のエラーがあります：<br><br>';
        for (let i = 0; i < errors.length; i++) {
          errorHtml += '<div class="error-item">• ' + errors[i] + '</div>';
        }
        outputElement.innerHTML = errorHtml;
        outputElement.className = 'error';
        return;
      }

      // エラーがない場合
      outputElement.innerHTML =
        '✅ すべての入力が正しく検証されました！<br><br>' +
        '<strong>入力内容：</strong><br>' +
        '名前: ' + name + '<br>' +
        '年齢: ' + age + '歳<br>' +
        'メールアドレス: ' + email;
      outputElement.className = 'success';
    }
  </script>
</body>
</html>
```

**実行フロー**（正しい入力の場合）：

```
validate()が呼ばれた場合
（名前: '山田太郎', 年齢: 25, メール: 'test@mail.com'）
═══════════════════════════════════════

1. 入力値を取得
   name = '山田太郎'（文字列）
   age = 25（数値）
   email = 'test@mail.com'（文字列）

2. validateName('山田太郎')を呼び出し
   ↓
   型チェック: OK（文字列）
   空文字チェック: OK（空ではない）
   長さチェック: OK（4文字）
   ↓
   return ''（エラーなし）

3. validateAge(25)を呼び出し
   ↓
   型チェック: OK（数値）
   NaNチェック: OK（有効な数値）
   範囲チェック: OK（0〜150の範囲内）
   ↓
   return ''（エラーなし）

4. validateEmail('test@mail.com')を呼び出し
   ↓
   型チェック: OK（文字列）
   空文字チェック: OK（空ではない）
   @の有無チェック: OK（@を含む）
   @の位置チェック: OK（先頭でも末尾でもない）
   ↓
   return ''（エラーなし）

5. エラーメッセージを集める
   nameError = ''
   ageError = ''
   emailError = ''
   ↓
   errors = []（空配列）

6. エラーがないので、成功メッセージを表示
   「すべての入力が正しく検証されました！」
```

**型を意識したポイント**：
- すべての検証関数が**常に文字列を返す**（エラーメッセージまたは空文字列）
- 型チェックを最初に行い、安全性を確保
- 戻り値の型が一貫しているので、呼び出し側で扱いやすい

</details>

---

## まとめ

このレッスンでは、**引数と戻り値の型**について学びました。

### 重要なポイント

1. **引数と戻り値には型がある**：
   - 引数：関数に渡す値の型を意識する
   - 戻り値：関数が返す値の型を意識する

2. **型チェックで安全な関数を作る**：
   - `typeof`演算子で型をチェック
   - エラー時は安全な値を返す

3. **型の一貫性を保つ**：
   - 同じ関数から異なる型を返さない
   - エラー時も同じ型を返す

4. **複数の型を扱う場合**：
   - 明確に処理を分ける
   - 最終的には一貫した型を返す

### 型チェックの基本パターン

```javascript
// 数値を受け取る関数
function calculateTax(price) {
  if (typeof price !== 'number') {
    return 0;  // エラー時も数値を返す
  }
  return price * 0.1;  // 常に数値を返す
}

// 文字列を返す関数
function formatPrice(price) {
  if (typeof price !== 'number') {
    return '価格不明';  // エラー時も文字列を返す
  }
  return price + '円';  // 常に文字列を返す
}
```

### よくある間違い

```javascript
// ❌ 悪い例：異なる型を返す
function divide(a, b) {
  if (b === 0) {
    return 'エラー';  // 文字列
  }
  return a / b;  // 数値
}

// ✅ 良い例：常に同じ型を返す
function divide(a, b) {
  if (b === 0) {
    return 0;  // 数値
  }
  return a / b;  // 数値
}
```

型を意識することで、バグを減らし、予測可能な関数を作ることができます！

---

## カリキュラム要件チェック

このレッスンで、以下のカリキュラム要件を満たしました：

- ✅ **数値を受け取る**：数値を受け取る関数の書き方と型チェックを学びました
- ✅ **文字列を返す**：文字列を返す関数の書き方と型の一貫性を学びました
- ✅ **型の一貫性**：同じ関数から異なる型を返さないことの重要性を理解しました
- ✅ **知識：データ型の整合性、型変換**：データ型の整合性を保つ方法と、型変換の扱い方を学びました
- ✅ **成果物：型を意識した関数**：BMI計算アプリ、入力検証アプリを通じて、型を意識した関数の書き方を実践的に理解しました

---

## 次のレッスンの予告

次のレッスンでは、**単一責任**について学びます。

- 1つの関数 = 1つの仕事
- 関数を小さく保つことの重要性
- 処理を分割する方法
- わかりやすいコードの書き方

関数の責任を明確にすることで、より保守しやすく、理解しやすいコードを書けるようになります！
