# Lesson 113: 複数の処理

> **レッスン日**: 2025-11-26

## このレッスンで学ぶこと

### 前回の復習
レッスン112では、**戻り値**を学びました。return文を使うことで、関数から値を返して、その結果を他の処理で使えるようになりました。

```javascript
function add(a, b) {
  return a + b;
}

const result = add(5, 3);  // 8
console.log(result);       // 8
```

### よくある場面
「複数の処理を順番に実行したい」「入力チェックをしてから計算したい」「計算結果に応じて異なる処理をしたい」という場面はよくあります。

たとえば、ユーザー登録の処理を考えてみましょう：
```javascript
// ❌ これでは処理が整理されていない
const name = prompt("名前を入力してください");
if (name === "") {
  alert("名前を入力してください");
}
const age = prompt("年齢を入力してください");
if (age < 0) {
  alert("正しい年齢を入力してください");
}
// ... 処理が散らかってしまう
```

関数内で複数の処理を整理すれば、もっと分かりやすくなります：
```javascript
// ✅ 関数で処理を整理
function registerUser() {
  // 処理1: 名前の入力と検証
  const name = prompt("名前を入力してください");
  if (name === "") {
    alert("名前を入力してください");
    return;
  }

  // 処理2: 年齢の入力と検証
  const age = Number(prompt("年齢を入力してください"));
  if (age < 0) {
    alert("正しい年齢を入力してください");
    return;
  }

  // 処理3: 登録完了メッセージ
  alert(name + "さん（" + age + "歳）の登録が完了しました");
}
```

### 学習目標
このレッスンでは、次のことができるようになります：
1. 関数内で**複数の処理を順番に実行**できるようになる
2. 関数内で**条件分岐**を使って、状況に応じた処理ができるようになる
3. 関数内で**ループ**を使って、繰り返し処理ができるようになる
4. **早期リターン**を使って、エラー時に処理を中断できるようになる

---

## 1. 関数内で複数の処理を実行する

### 日常生活のアナロジー: 料理のレシピ

複数の処理を実行する関数は、料理のレシピに似ています：

```
┌─────────────────────────────────┐
│  カレーを作る（関数）              │
│                                 │
│  1. 野菜を切る（処理1）            │
│  2. 肉を炒める（処理2）            │
│  3. 水を加える（処理3）            │
│  4. 煮込む（処理4）                │
│  5. ルーを溶かす（処理5）          │
│                                 │
│  ↓                              │
│  カレーが完成                     │
└─────────────────────────────────┘

重要なポイント:
- 順番が大切（水を入れる前に煮込めない）
- 各ステップは独立した処理
- すべてのステップを経て、最終的な結果が得られる
```

### 基本的な例

```javascript
function makeCurry() {
  // 処理1
  console.log("1. 野菜を切る");

  // 処理2
  console.log("2. 肉を炒める");

  // 処理3
  console.log("3. 水を加える");

  // 処理4
  console.log("4. 煮込む");

  // 処理5
  console.log("5. ルーを溶かす");

  // 処理6
  console.log("カレーが完成しました！");
}

makeCurry();
```

### 実行フロー
```
makeCurry() を呼び出す
  ↓
処理1: console.log("1. 野菜を切る")
  ↓
処理2: console.log("2. 肉を炒める")
  ↓
処理3: console.log("3. 水を加える")
  ↓
処理4: console.log("4. 煮込む")
  ↓
処理5: console.log("5. ルーを溶かす")
  ↓
処理6: console.log("カレーが完成しました！")
  ↓
関数終了
```

### より実用的な例

```javascript
function processUserData() {
  // 処理1: データを準備
  const name = '太郎';
  const age = 25;

  // 処理2: メッセージを作成
  const greeting = 'こんにちは、' + name + 'さん';
  const info = '年齢は' + age + '歳です';

  // 処理3: 結果を表示
  console.log(greeting);
  console.log(info);

  // 処理4: 完了メッセージ
  console.log('処理が完了しました');
}

processUserData();
```

### 実行フロー図解
```
processUserData() を呼び出す
  ↓
処理1: 変数の初期化
  ┌──────────────────┐
  │ name = '太郎'    │
  │ age = 25        │
  └──────────────────┘
  ↓
処理2: メッセージ作成
  ┌────────────────────────────────┐
  │ greeting = 'こんにちは、太郎さん' │
  │ info = '年齢は25歳です'          │
  └────────────────────────────────┘
  ↓
処理3: 結果を表示
  console.log("こんにちは、太郎さん")
  console.log("年齢は25歳です")
  ↓
処理4: 完了メッセージ
  console.log("処理が完了しました")
  ↓
関数終了
```

---

## 2. 条件分岐を含む関数

関数の中で、if文を使った条件分岐を組み込むことができます。

### 基本的な例

```javascript
function checkAge(age) {
  // 処理1: 変数を準備
  let message = '';

  // 処理2: 年齢に応じて判定
  if (age >= 20) {
    message = '成人です';
  } else {
    message = '未成年です';
  }

  // 処理3: 結果を表示
  console.log(message);
}

checkAge(25);  // "成人です"
checkAge(15);  // "未成年です"
```

### 実行フロー（age = 25の場合）
```
checkAge(25) を呼び出す
  ↓
処理1: 変数の初期化
  message = ''
  ↓
処理2: 条件分岐
  if (25 >= 20) → true
    ↓
    message = '成人です'
  ↓
処理3: 結果を表示
  console.log("成人です")
  ↓
関数終了
```

### より複雑な条件分岐

```javascript
function judgeScore(score) {
  // 処理1: 変数を準備
  let grade = '';
  let comment = '';

  // 処理2: 点数に応じて評価を決定
  if (score >= 80) {
    grade = 'A';
    comment = '優秀です！';
  } else if (score >= 60) {
    grade = 'B';
    comment = '良好です';
  } else if (score >= 40) {
    grade = 'C';
    comment = 'もう少し頑張りましょう';
  } else {
    grade = 'D';
    comment = '再試験が必要です';
  }

  // 処理3: メッセージを作成
  const message = '点数: ' + score + '点\n評価: ' + grade + '\n' + comment;

  // 処理4: 結果を表示
  console.log(message);
}

judgeScore(85);  // A、優秀です！
judgeScore(70);  // B、良好です
judgeScore(50);  // C、もう少し頑張りましょう
judgeScore(30);  // D、再試験が必要です
```

### 実行フロー図解（score = 85の場合）
```
judgeScore(85) を呼び出す
  ↓
処理1: 変数の初期化
  ┌──────────────┐
  │ grade = ''   │
  │ comment = '' │
  └──────────────┘
  ↓
処理2: 条件分岐
  if (85 >= 80) → true
    ↓
    grade = 'A'
    comment = '優秀です！'
  ↓
処理3: メッセージ作成
  message = '点数: 85点\n評価: A\n優秀です！'
  ↓
処理4: 結果を表示
  console.log(message)
  ↓
関数終了
```

---

## 3. ループを含む関数

関数の中で、forループやwhileループを使った繰り返し処理もできます。

### 基本的なループ

```javascript
function showNumbers(max) {
  // 処理: 1からmaxまでの数字を表示
  for (let i = 1; i <= max; i++) {
    console.log(i);
  }

  console.log('完了しました');
}

showNumbers(5);
// 出力:
// 1
// 2
// 3
// 4
// 5
// 完了しました
```

### 実行フロー
```
showNumbers(5) を呼び出す
  ↓
forループ開始: i = 1
  ↓
i = 1: console.log(1)
  ↓
i = 2: console.log(2)
  ↓
i = 3: console.log(3)
  ↓
i = 4: console.log(4)
  ↓
i = 5: console.log(5)
  ↓
ループ終了（i = 6 > 5）
  ↓
console.log('完了しました')
  ↓
関数終了
```

### 配列を処理するループ

```javascript
function calculateSum(numbers) {
  // 処理1: 合計を計算
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  // 処理2: 結果を表示
  console.log('合計: ' + sum);

  // 処理3: 戻り値を返す
  return sum;
}

const scores = [80, 90, 70, 85];
const total = calculateSum(scores);  // "合計: 325"
console.log(total);                  // 325
```

### 実行フロー図解
```
calculateSum([80, 90, 70, 85]) を呼び出す
  ↓
処理1: 合計を計算
  sum = 0（初期化）
  ↓
  i = 0: sum = 0 + 80 = 80
  i = 1: sum = 80 + 90 = 170
  i = 2: sum = 170 + 70 = 240
  i = 3: sum = 240 + 85 = 325
  ↓
  ループ終了（i = 4 >= length）
  ↓
処理2: 結果を表示
  console.log("合計: 325")
  ↓
処理3: 戻り値を返す
  return 325
  ↓
total = 325
```

### より実用的な例: 合計と平均を計算

```javascript
function calculateStats(numbers) {
  // 処理1: 配列が空かチェック
  if (numbers.length === 0) {
    console.log('データがありません');
    return;
  }

  // 処理2: 合計を計算
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  // 処理3: 平均を計算
  const average = sum / numbers.length;

  // 処理4: 小数点第1位まで丸める
  const roundedAverage = Math.round(average * 10) / 10;

  // 処理5: 結果を表示
  console.log('データ数: ' + numbers.length);
  console.log('合計: ' + sum);
  console.log('平均: ' + roundedAverage);

  // 処理6: オブジェクトとして返す
  return {
    count: numbers.length,
    sum: sum,
    average: roundedAverage
  };
}

const scores = [80, 90, 70, 85, 95];
const stats = calculateStats(scores);
// 出力:
// データ数: 5
// 合計: 420
// 平均: 84
```

---

## 4. 早期リターン（Early Return）

条件が満たされない場合、**早めに関数を終了**させることができます。これを「早期リターン」といいます。

### なぜ早期リターンが必要か？

早期リターンを使わない場合：
```javascript
// ❌ ネストが深くなる
function divide(a, b) {
  if (b !== 0) {
    const result = a / b;
    console.log('結果: ' + result);
    return result;
  } else {
    console.log('0で割ることはできません');
  }
}
```

早期リターンを使う場合：
```javascript
// ✅ 読みやすい
function divide(a, b) {
  // エラーケースを先にチェックして終了
  if (b === 0) {
    console.log('0で割ることはできません');
    return;  // ここで終了
  }

  // 正常な処理
  const result = a / b;
  console.log('結果: ' + result);
  return result;
}
```

### 実行フロー比較

```
divide(10, 0) の場合:
  ↓
  if (b === 0) → true
    ↓
    console.log('0で割ることはできません')
    ↓
    return（ここで関数終了）
  ↓
  以降の処理は実行されない
  ↓
関数終了

divide(10, 2) の場合:
  ↓
  if (b === 0) → false（スキップ）
  ↓
  result = 10 / 2 = 5
  ↓
  console.log('結果: 5')
  ↓
  return 5
  ↓
関数終了
```

### 複数の入力チェック

```javascript
function registerUser(name, age, email) {
  // 処理1: 名前のチェック
  if (!name || name.trim() === '') {
    console.log('エラー: 名前を入力してください');
    return false;  // 早期リターン
  }

  // 処理2: 年齢のチェック
  if (age < 0 || age > 150) {
    console.log('エラー: 正しい年齢を入力してください');
    return false;  // 早期リターン
  }

  // 処理3: メールアドレスのチェック
  if (!email || !email.includes('@')) {
    console.log('エラー: 正しいメールアドレスを入力してください');
    return false;  // 早期リターン
  }

  // 処理4: すべてのチェックが通った場合の処理
  console.log('登録完了: ' + name + 'さん');
  console.log('年齢: ' + age);
  console.log('メール: ' + email);
  return true;
}

// テスト
registerUser('太郎', 25, 'taro@example.com');  // 登録完了
registerUser('', 25, 'taro@example.com');      // エラー: 名前を入力してください
registerUser('太郎', -5, 'taro@example.com');  // エラー: 正しい年齢を入力してください
registerUser('太郎', 25, 'invalid');           // エラー: 正しいメールアドレスを入力してください
```

### 実行フロー図解（エラーケース）
```
registerUser('', 25, 'taro@example.com')
  ↓
処理1: 名前のチェック
  if (!'' || ''.trim() === '') → true
    ↓
    console.log('エラー: 名前を入力してください')
    ↓
    return false（早期リターン）
  ↓
以降の処理は実行されない
  ↓
関数終了
```

---

## 5. 変数のスコープ（変数の有効範囲）

関数内で宣言した変数は、**その関数の中でのみ使える**という重要なルールがあります。

### 基本的な例

```javascript
function test() {
  const message = 'こんにちは';  // 関数内の変数
  console.log(message);          // OK: 関数内で使える
}

test();  // "こんにちは"
console.log(message);  // エラー！messageは関数の外では使えない
```

### スコープの図解

```
┌─────────────────────────────────────┐
│ グローバルスコープ（プログラム全体）    │
│                                     │
│  const globalVar = 'グローバル';    │
│                                     │
│  ┌──────────────────────────────┐  │
│  │ 関数スコープ（関数内のみ）     │  │
│  │                              │  │
│  │ function test() {            │  │
│  │   const localVar = 'ローカル';│  │
│  │   console.log(globalVar); ✅ │  │
│  │   console.log(localVar);  ✅ │  │
│  │ }                            │  │
│  └──────────────────────────────┘  │
│                                     │
│  console.log(globalVar); ✅         │
│  console.log(localVar);  ❌ エラー   │
└─────────────────────────────────────┘
```

### 実用的な例

```javascript
// グローバル変数
const TAX_RATE = 0.1;  // 10%の消費税率

function calculatePrice(price) {
  // ローカル変数（この関数内でのみ使える）
  const tax = price * TAX_RATE;
  const total = price + tax;

  console.log('税込価格: ' + total);
  return total;
}

calculatePrice(1000);  // "税込価格: 1100"

// これはエラー
console.log(tax);    // エラー！taxは関数の外では使えない
console.log(total);  // エラー！totalは関数の外では使えない

// これはOK
console.log(TAX_RATE);  // 0.1（グローバル変数なので使える）
```

---

## 6. 完全なアプリ例: 成績管理アプリ

複数の処理を組み合わせた実用的なアプリを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>成績管理アプリ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }

    .container {
      background: #f5f5f5;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .input-section {
      background: white;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
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
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }

    button {
      width: 100%;
      padding: 15px;
      font-size: 18px;
      font-weight: bold;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }

    button:hover {
      background: #45a049;
    }

    .result {
      background: white;
      padding: 20px;
      border-radius: 5px;
      margin-top: 20px;
      display: none;
    }

    .result.show {
      display: block;
    }

    .result-item {
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
    }

    .grade-A { background: #E8F5E9; color: #2E7D32; }
    .grade-B { background: #E3F2FD; color: #1565C0; }
    .grade-C { background: #FFF3E0; color: #E65100; }
    .grade-D { background: #FFEBEE; color: #C62828; }

    .stats {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      padding: 15px;
      background: #f9f9f9;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 成績管理アプリ</h1>

    <div class="input-section">
      <h2>点数を入力</h2>

      <div class="input-group">
        <label>国語:</label>
        <input type="number" id="japanese" value="0" min="0" max="100">
      </div>

      <div class="input-group">
        <label>数学:</label>
        <input type="number" id="math" value="0" min="0" max="100">
      </div>

      <div class="input-group">
        <label>英語:</label>
        <input type="number" id="english" value="0" min="0" max="100">
      </div>

      <button onclick="calculateGrades()">成績を計算</button>
    </div>

    <div id="result" class="result">
      <h2>結果</h2>
      <div id="stats" class="stats"></div>
      <div id="grades"></div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
// 点数から評価を判定する関数
function getGrade(score) {
  // 処理1: 入力チェック
  if (score < 0 || score > 100) {
    return 'エラー';
  }

  // 処理2: 評価を決定
  if (score >= 80) {
    return 'A';
  } else if (score >= 60) {
    return 'B';
  } else if (score >= 40) {
    return 'C';
  } else {
    return 'D';
  }
}

// 評価に応じたコメントを返す関数
function getComment(grade) {
  // 処理: 評価に応じたコメントを返す
  if (grade === 'A') {
    return '素晴らしい！';
  } else if (grade === 'B') {
    return '良好です';
  } else if (grade === 'C') {
    return 'もう少し頑張りましょう';
  } else if (grade === 'D') {
    return '再試験が必要です';
  } else {
    return '';
  }
}

// 成績を計算して表示する関数
function calculateGrades() {
  // 処理1: 入力値を取得
  const japanese = Number(document.getElementById('japanese').value);
  const math = Number(document.getElementById('math').value);
  const english = Number(document.getElementById('english').value);

  // 処理2: 入力チェック
  if (japanese < 0 || japanese > 100 ||
      math < 0 || math > 100 ||
      english < 0 || english > 100) {
    alert('0〜100の範囲で入力してください');
    return;  // 早期リターン
  }

  // 処理3: 点数を配列にまとめる
  const scores = [
    { subject: '国語', score: japanese },
    { subject: '数学', score: math },
    { subject: '英語', score: english }
  ];

  // 処理4: 合計を計算
  let totalScore = 0;
  for (let i = 0; i < scores.length; i++) {
    totalScore += scores[i].score;
  }

  // 処理5: 平均を計算
  const average = totalScore / scores.length;
  const roundedAverage = Math.round(average * 10) / 10;

  // 処理6: 統計情報を表示
  const statsHTML =
    '合計点: ' + totalScore + '点<br>' +
    '平均点: ' + roundedAverage + '点<br>' +
    '総合評価: ' + getGrade(roundedAverage);
  document.getElementById('stats').innerHTML = statsHTML;

  // 処理7: 各科目の評価を作成
  let gradesHTML = '';
  for (let i = 0; i < scores.length; i++) {
    const subject = scores[i].subject;
    const score = scores[i].score;
    const grade = getGrade(score);
    const comment = getComment(grade);

    gradesHTML += '<div class="result-item grade-' + grade + '">';
    gradesHTML += '<strong>' + subject + '</strong>: ';
    gradesHTML += score + '点 - 評価 ' + grade + ' (' + comment + ')';
    gradesHTML += '</div>';
  }

  // 処理8: 結果を表示
  document.getElementById('grades').innerHTML = gradesHTML;
  document.getElementById('result').classList.add('show');
}
```

### 実行フロー（国語80、数学90、英語70の場合）
```
calculateGrades() を呼び出す
  ↓
処理1: 入力値を取得
  japanese = 80
  math = 90
  english = 70
  ↓
処理2: 入力チェック
  if (80 < 0 || 80 > 100 || ...) → false（チェックOK）
  ↓
処理3: 配列を作成
  scores = [
    { subject: '国語', score: 80 },
    { subject: '数学', score: 90 },
    { subject: '英語', score: 70 }
  ]
  ↓
処理4: 合計を計算（ループ）
  totalScore = 0
  i = 0: totalScore = 0 + 80 = 80
  i = 1: totalScore = 80 + 90 = 170
  i = 2: totalScore = 170 + 70 = 240
  ↓
処理5: 平均を計算
  average = 240 / 3 = 80
  roundedAverage = 80
  ↓
処理6: 統計情報を表示
  statsHTML = "合計点: 240点<br>平均点: 80点<br>総合評価: A"
  ↓
処理7: 各科目の評価を作成（ループ）
  i = 0: 国語 80点 → 評価A → "素晴らしい！"
  i = 1: 数学 90点 → 評価A → "素晴らしい！"
  i = 2: 英語 70点 → 評価B → "良好です"
  ↓
処理8: 結果を画面に表示
  結果エリアを表示
  ↓
関数終了
```

---

## 7. 練習問題

### 問題1: パスワード強度チェック関数

パスワードの強度をチェックする関数`checkPasswordStrength(password)`を作成してください。

**要件**:
1. パスワードが8文字未満の場合: "弱い"
2. パスワードが8文字以上12文字未満の場合: "普通"
3. パスワードが12文字以上の場合: "強い"
4. 空文字列の場合: "パスワードを入力してください"（早期リターン）

**ヒント**:
```javascript
function checkPasswordStrength(password) {
  // ここにコードを書く
}

console.log(checkPasswordStrength(""));           // "パスワードを入力してください"
console.log(checkPasswordStrength("abc123"));     // "弱い"
console.log(checkPasswordStrength("password1"));  // "普通"
console.log(checkPasswordStrength("verysecurepassword123"));  // "強い"
```

<details>
<summary>解答例</summary>

```javascript
function checkPasswordStrength(password) {
  // 処理1: 空文字チェック（早期リターン）
  if (password === '') {
    return 'パスワードを入力してください';
  }

  // 処理2: 文字数を取得
  const length = password.length;

  // 処理3: 強度を判定
  let strength = '';
  if (length < 8) {
    strength = '弱い';
  } else if (length < 12) {
    strength = '普通';
  } else {
    strength = '強い';
  }

  // 処理4: 結果を返す
  return strength;
}

// テスト
console.log(checkPasswordStrength(""));                      // "パスワードを入力してください"
console.log(checkPasswordStrength("abc123"));                // "弱い"
console.log(checkPasswordStrength("password1"));             // "普通"
console.log(checkPasswordStrength("verysecurepassword123")); // "強い"
```

**実行フロー（password = "password1"の場合）**:
```
checkPasswordStrength("password1")
  ↓
処理1: 空文字チェック
  if ("password1" === '') → false（スキップ）
  ↓
処理2: 文字数を取得
  length = 9
  ↓
処理3: 強度を判定
  if (9 < 8) → false
  else if (9 < 12) → true
    strength = '普通'
  ↓
処理4: 結果を返す
  return '普通'
```
</details>

---

### 問題2: 買い物リスト合計計算アプリ

配列で渡された商品の合計金額を計算し、割引を適用するアプリを作成してください。

**要件**:
1. 商品の配列を受け取る（各商品は名前と価格を持つオブジェクト）
2. 合計金額が10000円以上の場合、10%割引を適用
3. 合計金額、割引額、最終金額を表示

**HTML骨格**:
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>買い物リスト</title>
</head>
<body>
  <h1>買い物リスト</h1>
  <div id="output"></div>

  <script>
    // ここに関数を書く

    const items = [
      { name: 'ノートパソコン', price: 80000 },
      { name: 'マウス', price: 2000 },
      { name: 'キーボード', price: 5000 }
    ];

    calculateTotal(items);
  </script>
</body>
</html>
```

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>買い物リスト</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }

    .container {
      background: #f5f5f5;
      padding: 30px;
      border-radius: 10px;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .items {
      background: white;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
    }

    .item {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
    }

    .item:last-child {
      border-bottom: none;
    }

    .summary {
      background: white;
      padding: 20px;
      border-radius: 5px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      font-size: 18px;
    }

    .total {
      font-weight: bold;
      font-size: 24px;
      color: #4CAF50;
      border-top: 2px solid #4CAF50;
      padding-top: 15px;
      margin-top: 10px;
    }

    .discount {
      color: #f44336;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🛒 買い物リスト</h1>

    <div class="items" id="items"></div>
    <div class="summary" id="summary"></div>
  </div>

  <script>
    // 合計を計算する関数
    function calculateTotal(items) {
      // 処理1: 配列が空かチェック（早期リターン）
      if (!items || items.length === 0) {
        document.getElementById('output').textContent = '商品がありません';
        return;
      }

      // 処理2: 商品リストを表示
      let itemsHTML = '<h2>商品一覧</h2>';
      for (let i = 0; i < items.length; i++) {
        itemsHTML += '<div class="item">';
        itemsHTML += '<span>' + items[i].name + '</span>';
        itemsHTML += '<span>¥' + items[i].price.toLocaleString() + '</span>';
        itemsHTML += '</div>';
      }
      document.getElementById('items').innerHTML = itemsHTML;

      // 処理3: 合計金額を計算
      let totalPrice = 0;
      for (let i = 0; i < items.length; i++) {
        totalPrice += items[i].price;
      }

      // 処理4: 割引を計算
      let discount = 0;
      if (totalPrice >= 10000) {
        discount = totalPrice * 0.1;  // 10%割引
      }

      // 処理5: 最終金額を計算
      const finalPrice = totalPrice - discount;

      // 処理6: サマリーを表示
      let summaryHTML = '<h2>お会計</h2>';
      summaryHTML += '<div class="summary-row">';
      summaryHTML += '<span>小計:</span>';
      summaryHTML += '<span>¥' + totalPrice.toLocaleString() + '</span>';
      summaryHTML += '</div>';

      if (discount > 0) {
        summaryHTML += '<div class="summary-row discount">';
        summaryHTML += '<span>割引（10%）:</span>';
        summaryHTML += '<span>-¥' + discount.toLocaleString() + '</span>';
        summaryHTML += '</div>';
      }

      summaryHTML += '<div class="summary-row total">';
      summaryHTML += '<span>合計:</span>';
      summaryHTML += '<span>¥' + finalPrice.toLocaleString() + '</span>';
      summaryHTML += '</div>';

      document.getElementById('summary').innerHTML = summaryHTML;

      // 処理7: コンソールにも出力
      console.log('=== 買い物リスト ===');
      console.log('商品数: ' + items.length);
      console.log('小計: ¥' + totalPrice.toLocaleString());
      if (discount > 0) {
        console.log('割引: -¥' + discount.toLocaleString());
      }
      console.log('合計: ¥' + finalPrice.toLocaleString());
    }

    // テストデータ
    const items = [
      { name: 'ノートパソコン', price: 80000 },
      { name: 'マウス', price: 2000 },
      { name: 'キーボード', price: 5000 }
    ];

    calculateTotal(items);
  </script>
</body>
</html>
```

**実行フロー**:
```
calculateTotal(items) を呼び出す
  ↓
処理1: 配列チェック
  if (!items || items.length === 0) → false（スキップ）
  ↓
処理2: 商品リストを表示（ループ）
  i = 0: "ノートパソコン ¥80,000"
  i = 1: "マウス ¥2,000"
  i = 2: "キーボード ¥5,000"
  ↓
処理3: 合計金額を計算（ループ）
  totalPrice = 0
  i = 0: totalPrice = 0 + 80000 = 80000
  i = 1: totalPrice = 80000 + 2000 = 82000
  i = 2: totalPrice = 82000 + 5000 = 87000
  ↓
処理4: 割引を計算
  if (87000 >= 10000) → true
    discount = 87000 * 0.1 = 8700
  ↓
処理5: 最終金額を計算
  finalPrice = 87000 - 8700 = 78300
  ↓
処理6: サマリーを表示
  小計: ¥87,000
  割引（10%）: -¥8,700
  合計: ¥78,300
  ↓
処理7: コンソールに出力
  ↓
関数終了
```
</details>

---

### 問題3: クイズアプリ（応用）

複数の問題を表示し、正解数を集計するクイズアプリを作成してください。

**要件**:
1. 問題の配列を用意する（各問題は質問、選択肢、正解を持つ）
2. 全問題に答えた後、正解数と正解率を表示
3. 各問題の正誤判定を行う関数を作成

<details>
<summary>解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>クイズアプリ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
      background: #f0f0f0;
    }

    .container {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    .question {
      margin-bottom: 30px;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 5px;
      border-left: 4px solid #4CAF50;
    }

    .question-text {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #333;
    }

    .options {
      margin-left: 20px;
    }

    .option {
      margin-bottom: 10px;
    }

    .option input {
      margin-right: 10px;
    }

    .option label {
      cursor: pointer;
      font-size: 16px;
    }

    .submit-btn {
      width: 100%;
      padding: 15px;
      font-size: 18px;
      font-weight: bold;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 20px;
    }

    .submit-btn:hover {
      background: #45a049;
    }

    .result {
      margin-top: 30px;
      padding: 30px;
      background: #E8F5E9;
      border-radius: 5px;
      display: none;
    }

    .result.show {
      display: block;
    }

    .score {
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      color: #2E7D32;
      margin-bottom: 20px;
    }

    .percentage {
      font-size: 24px;
      text-align: center;
      color: #555;
    }

    .feedback {
      margin-top: 20px;
      padding: 20px;
      background: white;
      border-radius: 5px;
    }

    .feedback-item {
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
    }

    .correct {
      background: #E8F5E9;
      color: #2E7D32;
    }

    .incorrect {
      background: #FFEBEE;
      color: #C62828;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎯 JavaScriptクイズ</h1>

    <form id="quiz-form">
      <div id="questions"></div>
      <button type="button" class="submit-btn" onclick="submitQuiz()">答え合わせ</button>
    </form>

    <div id="result" class="result"></div>
  </div>

  <script>
    // クイズデータ
    const quizData = [
      {
        question: 'JavaScriptで変数を宣言するキーワードはどれ？',
        options: ['var', 'const', 'let', 'すべて正しい'],
        answer: 3
      },
      {
        question: '配列の要素数を取得するプロパティは？',
        options: ['size', 'count', 'length', 'total'],
        answer: 2
      },
      {
        question: 'console.log(5 + "5")の結果は？',
        options: ['10', '"55"', '55', 'エラー'],
        answer: 2
      }
    ];

    // クイズを表示する関数
    function displayQuiz() {
      // 処理1: questionsエリアを取得
      const questionsContainer = document.getElementById('questions');
      let html = '';

      // 処理2: 各問題を作成（ループ）
      for (let i = 0; i < quizData.length; i++) {
        const q = quizData[i];

        html += '<div class="question">';
        html += '<div class="question-text">問題' + (i + 1) + ': ' + q.question + '</div>';
        html += '<div class="options">';

        // 処理3: 各選択肢を作成（ループ）
        for (let j = 0; j < q.options.length; j++) {
          html += '<div class="option">';
          html += '<input type="radio" name="q' + i + '" value="' + j + '" id="q' + i + 'o' + j + '">';
          html += '<label for="q' + i + 'o' + j + '">' + q.options[j] + '</label>';
          html += '</div>';
        }

        html += '</div>';
        html += '</div>';
      }

      // 処理4: HTMLを設定
      questionsContainer.innerHTML = html;
    }

    // クイズを採点する関数
    function submitQuiz() {
      // 処理1: 正解数をカウント
      let correctCount = 0;
      const feedback = [];

      // 処理2: 各問題をチェック（ループ）
      for (let i = 0; i < quizData.length; i++) {
        const selected = document.querySelector('input[name="q' + i + '"]:checked');

        // 処理3: 未選択チェック
        if (!selected) {
          alert('すべての問題に回答してください');
          return;  // 早期リターン
        }

        // 処理4: 正誤判定
        const userAnswer = Number(selected.value);
        const correctAnswer = quizData[i].answer;
        const isCorrect = userAnswer === correctAnswer;

        if (isCorrect) {
          correctCount++;
        }

        // 処理5: フィードバックを記録
        feedback.push({
          questionNumber: i + 1,
          isCorrect: isCorrect,
          userAnswer: quizData[i].options[userAnswer],
          correctAnswer: quizData[i].options[correctAnswer]
        });
      }

      // 処理6: 正解率を計算
      const totalQuestions = quizData.length;
      const percentage = Math.round((correctCount / totalQuestions) * 100);

      // 処理7: 結果を表示
      displayResult(correctCount, totalQuestions, percentage, feedback);
    }

    // 結果を表示する関数
    function displayResult(correct, total, percentage, feedback) {
      // 処理1: 結果HTMLを作成
      let html = '<div class="score">' + correct + ' / ' + total + ' 問正解</div>';
      html += '<div class="percentage">正解率: ' + percentage + '%</div>';

      // 処理2: 評価コメント
      let comment = '';
      if (percentage === 100) {
        comment = '完璧です！素晴らしい！';
      } else if (percentage >= 70) {
        comment = 'よくできました！';
      } else if (percentage >= 50) {
        comment = 'もう少し頑張りましょう';
      } else {
        comment = '復習が必要です';
      }
      html += '<div class="percentage">' + comment + '</div>';

      // 処理3: フィードバックを作成（ループ）
      html += '<div class="feedback">';
      html += '<h3>詳細結果</h3>';
      for (let i = 0; i < feedback.length; i++) {
        const item = feedback[i];
        const cssClass = item.isCorrect ? 'correct' : 'incorrect';
        const mark = item.isCorrect ? '✓' : '✗';

        html += '<div class="feedback-item ' + cssClass + '">';
        html += '<strong>問題' + item.questionNumber + '</strong> ' + mark + '<br>';
        html += 'あなたの回答: ' + item.userAnswer + '<br>';
        if (!item.isCorrect) {
          html += '正解: ' + item.correctAnswer;
        }
        html += '</div>';
      }
      html += '</div>';

      // 処理4: 結果を表示
      const resultContainer = document.getElementById('result');
      resultContainer.innerHTML = html;
      resultContainer.classList.add('show');
    }

    // ページ読み込み時にクイズを表示
    displayQuiz();
  </script>
</body>
</html>
```

**実行フロー（submitQuiz関数）**:
```
submitQuiz() を呼び出す
  ↓
処理1: 変数の初期化
  correctCount = 0
  feedback = []
  ↓
処理2: 各問題をチェック（ループ）
  i = 0: 問題1をチェック
    selected = 選択された要素
    if (!selected) → falseの場合（スキップ）
    userAnswer = 選択された値
    correctAnswer = 正解の値
    isCorrect = 正誤判定
    if (isCorrect) → correctCount++
    feedback.push(...)
  i = 1: 問題2をチェック（同様）
  i = 2: 問題3をチェック（同様）
  ↓
処理6: 正解率を計算
  percentage = (correctCount / 3) * 100
  ↓
処理7: 結果を表示
  displayResult(correctCount, 3, percentage, feedback)
  ↓
関数終了
```
</details>

---

## まとめ

### 重要なポイント

1. **複数の処理を順番に実行**
   - 関数内では、上から順番に処理が実行される
   - 各処理をコメントで明確に区切ると分かりやすい

2. **条件分岐を含む関数**
   - if文を使って、状況に応じた処理ができる
   - 複数の条件を組み合わせることも可能

3. **ループを含む関数**
   - forループで配列を処理できる
   - ループで合計や平均などの集計処理ができる

4. **早期リターン**
   - エラーや不正な入力は早めにチェックして終了
   - ネストが深くなるのを防ぎ、コードが読みやすくなる

5. **変数のスコープ**
   - 関数内の変数は、その関数内でのみ使える
   - グローバル変数は慎重に使う

### よく使うパターン

```javascript
function processData(data) {
  // パターン1: 入力チェック（早期リターン）
  if (!data || data.length === 0) {
    console.log('エラー: データがありません');
    return;
  }

  // パターン2: ループで集計
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i];
  }

  // パターン3: 計算
  const average = total / data.length;

  // パターン4: 条件分岐
  let grade = '';
  if (average >= 80) {
    grade = 'A';
  } else if (average >= 60) {
    grade = 'B';
  } else {
    grade = 'C';
  }

  // パターン5: 結果を返す
  return {
    total: total,
    average: average,
    grade: grade
  };
}
```

### カリキュラム要件チェック

このレッスンで学んだ内容を確認しましょう：

✅ **関数内で複数の処理**: 順番に複数の処理を実行する方法を学びました
✅ **順番に実行**: 上から順番に処理が実行されることを理解しました
✅ **条件分岐も含む**: if文を使った条件分岐を関数内で使えるようになりました
✅ **【知識】関数の構造化、処理の流れ**: 処理を整理して関数にまとめる方法を理解しました
✅ **成果物：複合処理関数**: 成績管理アプリなど、複数の処理を組み合わせた関数を作成しました

---

## 次のレッスンの予告

次回のレッスン114では、**関数から関数を呼び出す**方法を学びます。

これまでは1つの関数内で処理を完結させていましたが、次回は：
- 関数の中から別の関数を呼び出す
- 処理を小さな関数に分割する
- 関数の組み合わせでより複雑な処理を実現する

といった、実践的な関数の設計方法を学びます。

---

**🎯 今日の達成目標**
- [x] 関数内で複数の処理を順番に実行できる
- [x] 条件分岐を含む関数を作成できる
- [x] ループを含む関数を作成できる
- [x] 早期リターンでエラーハンドリングができる
- [x] 変数のスコープを理解する

お疲れさまでした！次のレッスンも頑張りましょう！
