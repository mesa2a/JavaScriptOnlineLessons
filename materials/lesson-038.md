# レッスン38: else if（多分岐）

## なぜ重要なのか

実際のウェブサイトでは、二択だけでなく、3つ以上の選択肢から適切なものを選ぶ処理が頻繁に必要です。else ifは、この多分岐を効率的に実装するための基本構文です。

| サービス | 使われている機能 | 具体例 |
|---------|----------------|--------|
| **Amazon** | 評価（星1〜5）、配送速度（当日/翌日/通常） | レビュー星5なら「最高」、星4なら「良い」、星3なら「普通」 |
| **YouTube** | 再生回数の表示（100万回以上/10万回以上/1万回以上） | 1000万回以上なら「バズった」、100万回以上なら「人気」 |
| **Twitter** | フォロワー数による分類（有名人/人気/一般） | 100万人以上なら「著名人」、1万人以上なら「人気」 |
| **楽天市場** | 会員ランク（ダイヤモンド/プラチナ/ゴールド/シルバー） | ポイント倍率をランクに応じて「10倍」「5倍」「3倍」「2倍」 |
| **天気アプリ** | 気温による分類（猛暑/暑い/快適/涼しい/寒い） | 35度以上なら「猛暑日」、30度以上なら「真夏日」 |

## 基本概念の説明

### else ifとは

**else if**は、3つ以上の条件を順番に判定し、最初に満たされた条件の処理を実行する構文です。

```
        条件1を判定
           ↓
    ┌──────┴──────┐
    ↓              ↓
  true           false
    ↓              ↓
 処理1        条件2を判定
               ↓
         ┌─────┴─────┐
         ↓             ↓
       true          false
         ↓             ↓
       処理2       条件3を判定
                     ↓
                ┌────┴────┐
                ↓         ↓
              true      false
                ↓         ↓
              処理3     else処理
```

**特徴**:
- 上から順に条件をチェック
- **最初に満たされた条件だけ実行**（それ以降はスキップ）
- 3つ以上の分岐が可能
- 条件の順序が重要

### 構文

```javascript
if (条件1) {
  // 条件1がtrueの場合の処理
} else if (条件2) {
  // 条件1がfalseで、条件2がtrueの場合の処理
} else if (条件3) {
  // 条件1も2もfalseで、条件3がtrueの場合の処理
} else {
  // すべての条件がfalseの場合の処理
}
```

**else if**は「そうでなくて、もし〜なら」という意味です。

## これまでの復習

### if-else文（二択）

```javascript
if (score >= 60) {
  elem.textContent = "合格です";
} else {
  elem.textContent = "不合格です";
}
```

**問題点**: 2つの選択肢しか扱えない

### else ifを使った多分岐

```javascript
if (score >= 80) {
  elem.textContent = "優秀です";
} else if (score >= 60) {
  elem.textContent = "合格です";
} else {
  elem.textContent = "不合格です";
}
```

**改善点**: 3つ以上の選択肢を扱える

## 動作の流れ

### else if文の実行フロー

```
【プログラム実行】
     ↓
1. 変数の値を取得（例: score = 85）
     ↓
2. 最初のif条件を評価（score >= 80）
     ↓
3. true → 処理を実行して終了
   false → 次のelse if条件へ
     ↓
4. 2つ目の条件を評価（score >= 60）
     ↓
5. true → 処理を実行して終了
   false → 次のelse if条件へ
     ↓
6. すべてfalse → else部分を実行
```

### 具体例: score = 85 の場合

```javascript
let score = 85;

if (score >= 80) {     // 85 >= 80 → true
  // ← この部分が実行される
  elem.textContent = "評価: A";
} else if (score >= 60) {  // ← チェックされない（前の条件がtrueだから）
  elem.textContent = "評価: B";
} else {                   // ← チェックされない
  elem.textContent = "評価: C";
}
```

**実行結果**: 「評価: A」のみ表示

**重要**: 最初の条件が満たされたら、それ以降の条件は**チェックされない**

## 条件の順序の重要性

### 正しい順序（大きい値から小さい値へ）

```javascript
let score = 85;

if (score >= 80) {      // ← 最も厳しい条件を先に
  elem.textContent = "A";
} else if (score >= 60) {  // ← 次に厳しい条件
  elem.textContent = "B";
} else {                   // ← 最後に残り全部
  elem.textContent = "C";
}
```

**動作**: 85は80以上なので「A」

### ❌ 間違った順序（小さい値から大きい値へ）

```javascript
let score = 85;

if (score >= 60) {      // ← 85は60以上なのでここでtrue
  elem.textContent = "B";  // ← 「B」になってしまう
} else if (score >= 80) {  // ← ここには到達しない！
  elem.textContent = "A";
}
```

**問題**: 85点でも「B」になってしまう（本来は「A」のはず）

### 順序による結果の違い

| score | 正しい順序 | 間違った順序 | 本来の期待 |
|-------|----------|------------|-----------|
| 95 | A | B ❌ | A |
| 85 | A | B ❌ | A |
| 75 | B | B ✅ | B |
| 55 | C | C ✅ | C |

**ルール**: **厳しい条件（大きい値）を先に**書く

## 実践例: 成績判定（A、B、C）

### 基本的な3段階評価

```javascript
function checkGrade() {
  let score = 85;

  if (score >= 80) {
    const elem = document.getElementById("result");
    elem.textContent = "評価: A";
  } else if (score >= 60) {
    const elem = document.getElementById("result");
    elem.textContent = "評価: B";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "評価: C";
  }
}
```

### 各条件の範囲

| score の範囲 | 判定される条件 | 表示される評価 |
|-------------|-------------|--------------|
| 80以上 | `score >= 80` | 「評価: A」 |
| 60以上80未満 | `score >= 60` | 「評価: B」 |
| 60未満 | else | 「評価: C」 |

**ポイント**:
- 1つ目の条件: 80以上
- 2つ目の条件: 60以上**かつ**80未満（1つ目がfalseだから）
- else: 60未満（すべてfalseだから）

### 動作の詳細

```
【score = 85 の場合】
  ↓
1. score >= 80 → true
  ↓
「評価: A」を表示して終了
（以降の条件はチェックしない）

【score = 70 の場合】
  ↓
1. score >= 80 → false
  ↓
2. score >= 60 → true
  ↓
「評価: B」を表示して終了

【score = 50 の場合】
  ↓
1. score >= 80 → false
  ↓
2. score >= 60 → false
  ↓
3. else部分を実行
  ↓
「評価: C」を表示
```

## 実践例: 詳細な成績判定（S、A、B、C、D）

### 5段階評価

```javascript
function checkDetailedGrade() {
  let score = 92;

  if (score >= 90) {
    const elem = document.getElementById("result");
    elem.textContent = "評価: S（優秀）";
  } else if (score >= 80) {
    const elem = document.getElementById("result");
    elem.textContent = "評価: A（良好）";
  } else if (score >= 70) {
    const elem = document.getElementById("result");
    elem.textContent = "評価: B（普通）";
  } else if (score >= 60) {
    const elem = document.getElementById("result");
    elem.textContent = "評価: C（合格）";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "評価: D（不合格）";
  }
}
```

### 評価の分布表

| score の範囲 | 評価 | 説明 |
|-------------|-----|------|
| 90以上 | S | 優秀 |
| 80以上90未満 | A | 良好 |
| 70以上80未満 | B | 普通 |
| 60以上70未満 | C | 合格 |
| 60未満 | D | 不合格 |

### テストケース

| score | チェックされる条件 | 結果 |
|-------|-----------------|------|
| 95 | 1つ目のif（>= 90）が即座にtrue | S |
| 85 | 1つ目false、2つ目（>= 80）がtrue | A |
| 75 | 1,2つ目false、3つ目（>= 70）がtrue | B |
| 65 | 1,2,3つ目false、4つ目（>= 60）がtrue | C |
| 50 | すべてfalse、elseが実行 | D |

## 実践例: 年齢による分類

### 4段階の年齢グループ分け

```javascript
function checkAgeGroup() {
  let age = 35;

  if (age >= 60) {
    const elem = document.getElementById("result");
    elem.textContent = "シニア";
  } else if (age >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "成人";
  } else if (age >= 13) {
    const elem = document.getElementById("result");
    elem.textContent = "ティーン";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "子供";
  }
}
```

### 年齢グループの範囲

| age の範囲 | グループ名 |
|-----------|----------|
| 60歳以上 | シニア |
| 20歳以上60歳未満 | 成人 |
| 13歳以上20歳未満 | ティーン |
| 13歳未満 | 子供 |

## 実践例: 温度による判定

### 4段階の温度分類

```javascript
function checkTemperature() {
  let temp = 25;

  if (temp >= 30) {
    const elem = document.getElementById("result");
    elem.textContent = "暑いです";
  } else if (temp >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "快適です";
  } else if (temp >= 10) {
    const elem = document.getElementById("result");
    elem.textContent = "涼しいです";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "寒いです";
  }
}
```

### 温度の分類表

| temp の範囲 | 表示メッセージ |
|-----------|--------------|
| 30度以上 | 「暑いです」 |
| 20度以上30度未満 | 「快適です」 |
| 10度以上20度未満 | 「涼しいです」 |
| 10度未満 | 「寒いです」 |

## 実践例: 文字列での分岐

### 色の選択判定

```javascript
function checkColor() {
  let color = "blue";

  if (color === "red") {
    const elem = document.getElementById("result");
    elem.textContent = "赤が選ばれました";
  } else if (color === "blue") {
    const elem = document.getElementById("result");
    elem.textContent = "青が選ばれました";
  } else if (color === "green") {
    const elem = document.getElementById("result");
    elem.textContent = "緑が選ばれました";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "不明な色です";
  }
}
```

**ポイント**: 数値だけでなく、文字列でも分岐できる

### 文字列比較のテスト

| color | 結果 |
|-------|------|
| "red" | 「赤が選ばれました」 |
| "blue" | 「青が選ばれました」 |
| "green" | 「緑が選ばれました」 |
| "yellow" | 「不明な色です」 |
| "Blue" | 「不明な色です」（大文字小文字を区別） |

## else ifの数

### いくつでも使える

```javascript
if (条件1) {
  // 処理1
} else if (条件2) {
  // 処理2
} else if (条件3) {
  // 処理3
} else if (条件4) {
  // 処理4
} else if (条件5) {
  // 処理5
} else if (条件6) {
  // 処理6
} else {
  // どれにも当てはまらない場合の処理
}
```

**推奨**: 5つ程度まで（あまり多いと読みにくくなる）

### 多すぎる場合の代替案

10個以上の分岐が必要な場合は、後のレッスンで学ぶ`switch`文の使用を検討

## 最後のelseは省略可能

### elseあり（推奨）

```javascript
if (score >= 80) {
  elem.textContent = "評価: A";
} else if (score >= 60) {
  elem.textContent = "評価: B";
} else {
  elem.textContent = "評価: C";  // ← すべてのケースをカバー
}
```

**メリット**: すべての場合を明示的に処理

### elseなし

```javascript
if (score >= 80) {
  elem.textContent = "評価: A";
} else if (score >= 60) {
  elem.textContent = "評価: B";
}
// scoreが60未満の場合、何も表示されない
```

**デメリット**: 想定外の入力に対処できない

**推奨**: **elseを書く**方が安全

## よくある間違いと解決方法

### ❌ 間違い1: 条件の順序が逆

```javascript
let score = 85;

if (score >= 60) {      // ← 85は60以上なのでここがtrue
  elem.textContent = "B";  // ← 「B」になる（本来は「A」のはず）
} else if (score >= 80) {  // ← ここには到達しない
  elem.textContent = "A";
}
```

**何が問題か**: 緩い条件を先に書くと、厳しい条件に到達しない

**✅ 正しい書き方**:

```javascript
let score = 85;

if (score >= 80) {      // ← 厳しい条件を先に
  elem.textContent = "A";
} else if (score >= 60) {  // ← 緩い条件を後に
  elem.textContent = "B";
}
```

### ❌ 間違い2: 範囲の重複

```javascript
if (score >= 80) {
  elem.textContent = "A";
} else if (score >= 60) {
  elem.textContent = "B";
} else if (score >= 70) {  // ← この条件には永遠に到達しない
  elem.textContent = "B+";
}
```

**何が問題か**: 70以上は既に60以上で処理されているため、3つ目の条件は無意味

**✅ 正しい書き方**:

```javascript
if (score >= 80) {
  elem.textContent = "A";
} else if (score >= 70) {  // ← 順序を正しく
  elem.textContent = "B+";
} else if (score >= 60) {
  elem.textContent = "B";
}
```

### ❌ 間違い3: else ifの代わりにifを使う

```javascript
if (score >= 80) {
  elem.textContent = "A";
}
if (score >= 60) {  // ← else ifではなくif
  elem.textContent = "B";  // ← 上書きされる
}
```

**何が問題か**: 独立したif文なので、両方実行され、後の方で上書きされる

**実行結果**: score = 85 の場合、「A」が表示された後、「B」で上書きされる

**✅ 正しい書き方**:

```javascript
if (score >= 80) {
  elem.textContent = "A";
} else if (score >= 60) {  // ← else ifを使う
  elem.textContent = "B";
}
```

### ❌ 間違い4: 条件の範囲ミス

```javascript
if (score >= 80) {
  elem.textContent = "A";
} else if (score >= 70) {
  elem.textContent = "B";
}
// 60〜69点の範囲が抜けている
```

**何が問題か**: 60〜69点の場合、何も表示されない

**✅ 正しい書き方**:

```javascript
if (score >= 80) {
  elem.textContent = "A";
} else if (score >= 70) {
  elem.textContent = "B";
} else if (score >= 60) {  // ← 抜けている範囲を追加
  elem.textContent = "C";
} else {
  elem.textContent = "D";
}
```

### ❌ 間違い5: 等号の位置ミス

```javascript
if (score > 80) {      // ← > を使っている
  elem.textContent = "A";
} else if (score > 60) {
  elem.textContent = "B";
}
```

**何が問題か**: 80点ちょうど、60点ちょうどが、どこにも該当しない

| score | 結果 |
|-------|------|
| 85 | 「A」 |
| 80 | 「B」（本来は「A」のはず） |
| 60 | なし（本来は「B」のはず） |

**✅ 正しい書き方**:

```javascript
if (score >= 80) {     // ← >= を使う
  elem.textContent = "A";
} else if (score >= 60) {
  elem.textContent = "B";
}
```

### ❌ 間違い6: else ifをelseと間違える

```javascript
if (score >= 80) {
  elem.textContent = "A";
} else (score >= 60) {  // ← elseに条件を書いている
  elem.textContent = "B";
}
```

**エラーメッセージ**: `SyntaxError: Unexpected token '('`

**何が問題か**: `else`には条件を書けない（条件が必要なら`else if`）

**✅ 正しい書き方**:

```javascript
if (score >= 80) {
  elem.textContent = "A";
} else if (score >= 60) {  // ← else if
  elem.textContent = "B";
}
```

## 実用例

### 実用例1: 完全な成績判定システム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>成績判定システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      text-align: center;
    }
    .grade-display {
      font-size: 72px;
      font-weight: bold;
      margin: 30px 0;
      padding: 30px;
      border-radius: 10px;
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .grade-S { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
    .grade-A { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; }
    .grade-B { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; }
    .grade-C { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; }
    .grade-D { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; }
    button {
      padding: 15px 30px;
      font-size: 18px;
      cursor: pointer;
      background-color: #667eea;
      color: white;
      border: none;
      border-radius: 5px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>成績判定システム</h1>
  <p>あなたの点数: <span id="score-display">85</span>点</p>
  <button onclick="checkGrade()">判定する</button>
  <div id="result" class="grade-display"></div>

  <script>
    function checkGrade() {
      let score = 85;

      const elem = document.getElementById("result");

      if (score >= 90) {
        elem.textContent = "S";
        elem.className = "grade-display grade-S";
      } else if (score >= 80) {
        elem.textContent = "A";
        elem.className = "grade-display grade-A";
      } else if (score >= 70) {
        elem.textContent = "B";
        elem.className = "grade-display grade-B";
      } else if (score >= 60) {
        elem.textContent = "C";
        elem.className = "grade-display grade-C";
      } else {
        elem.textContent = "D";
        elem.className = "grade-display grade-D";
      }
    }
  </script>
</body>
</html>
```

### 実用例2: 年齢グループ分類システム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>年齢グループ分類</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      text-align: center;
    }
    .age-group {
      font-size: 48px;
      font-weight: bold;
      margin: 30px 0;
      padding: 40px;
      border-radius: 10px;
    }
    .senior { background-color: #e8f5e9; color: #2e7d32; }
    .adult { background-color: #e3f2fd; color: #1565c0; }
    .teen { background-color: #fff3e0; color: #e65100; }
    .child { background-color: #fce4ec; color: #c2185b; }
    button {
      padding: 15px 30px;
      font-size: 18px;
      cursor: pointer;
      background-color: #2196F3;
      color: white;
      border: none;
      border-radius: 5px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>年齢グループ分類システム</h1>
  <p>年齢: <span id="age-display">35</span>歳</p>
  <button onclick="checkAgeGroup()">分類する</button>
  <div id="result"></div>

  <script>
    function checkAgeGroup() {
      let age = 35;

      const elem = document.getElementById("result");

      if (age >= 60) {
        elem.textContent = "シニア";
        elem.className = "age-group senior";
      } else if (age >= 20) {
        elem.textContent = "成人";
        elem.className = "age-group adult";
      } else if (age >= 13) {
        elem.textContent = "ティーン";
        elem.className = "age-group teen";
      } else {
        elem.textContent = "子供";
        elem.className = "age-group child";
      }
    }
  </script>
</body>
</html>
```

### 実用例3: 温度計システム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>温度計システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      text-align: center;
    }
    .temperature-display {
      font-size: 96px;
      font-weight: bold;
      margin: 20px 0;
    }
    .temp-message {
      font-size: 36px;
      font-weight: bold;
      margin: 30px 0;
      padding: 30px;
      border-radius: 10px;
    }
    .hot { background-color: #ffebee; color: #c62828; }
    .comfortable { background-color: #e8f5e9; color: #2e7d32; }
    .cool { background-color: #e3f2fd; color: #1565c0; }
    .cold { background-color: #e1f5fe; color: #01579b; }
    button {
      padding: 15px 30px;
      font-size: 18px;
      cursor: pointer;
      background-color: #ff5722;
      color: white;
      border: none;
      border-radius: 5px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>温度計システム</h1>
  <div class="temperature-display">25°C</div>
  <button onclick="checkTemperature()">判定する</button>
  <div id="result"></div>

  <script>
    function checkTemperature() {
      let temp = 25;

      const elem = document.getElementById("result");

      if (temp >= 30) {
        elem.textContent = "🌡️ 暑いです";
        elem.className = "temp-message hot";
      } else if (temp >= 20) {
        elem.textContent = "😊 快適です";
        elem.className = "temp-message comfortable";
      } else if (temp >= 10) {
        elem.textContent = "🍃 涼しいです";
        elem.className = "temp-message cool";
      } else {
        elem.textContent = "❄️ 寒いです";
        elem.className = "temp-message cold";
      }
    }
  </script>
</body>
</html>
```

### 実用例4: 色選択システム

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>色選択システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      text-align: center;
    }
    .color-box {
      width: 200px;
      height: 200px;
      margin: 30px auto;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      color: white;
    }
    button {
      padding: 15px 30px;
      font-size: 18px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      margin: 10px;
      color: white;
    }
    .btn-red { background-color: #f44336; }
    .btn-blue { background-color: #2196F3; }
    .btn-green { background-color: #4CAF50; }
    .btn-yellow { background-color: #FFC107; color: #333; }
  </style>
</head>
<body>
  <h1>色選択システム</h1>
  <div>
    <button class="btn-red" onclick="checkColor('red')">赤</button>
    <button class="btn-blue" onclick="checkColor('blue')">青</button>
    <button class="btn-green" onclick="checkColor('green')">緑</button>
    <button class="btn-yellow" onclick="checkColor('yellow')">黄</button>
  </div>
  <div id="result" class="color-box"></div>

  <script>
    function checkColor(color) {
      const elem = document.getElementById("result");

      if (color === "red") {
        elem.textContent = "赤が選ばれました";
        elem.style.backgroundColor = "#f44336";
      } else if (color === "blue") {
        elem.textContent = "青が選ばれました";
        elem.style.backgroundColor = "#2196F3";
      } else if (color === "green") {
        elem.textContent = "緑が選ばれました";
        elem.style.backgroundColor = "#4CAF50";
      } else if (color === "yellow") {
        elem.textContent = "黄が選ばれました";
        elem.style.backgroundColor = "#FFC107";
        elem.style.color = "#333";
      } else {
        elem.textContent = "不明な色です";
        elem.style.backgroundColor = "#9e9e9e";
      }
    }
  </script>
</body>
</html>
```

## 多分岐の考え方

### 設計の手順

1. **場合分けを洗い出す**
   - どんなケースがあるか列挙
   - 例: 成績（S, A, B, C, D）

2. **条件を決める**
   - 各ケースを分ける境界値を決定
   - 例: 90, 80, 70, 60

3. **条件を並べる**
   - **厳しい順（大きい値から）**に並べる
   - 例: >= 90, >= 80, >= 70, >= 60

4. **elseで残りをカバー**
   - すべての条件に該当しない場合を処理
   - 例: 60未満

### 設計例: BMI判定

```javascript
// 1. 場合分け: やせ、標準、肥満

// 2. 条件: BMI 18.5, 25

// 3. 条件を並べる（大きい順）
if (bmi >= 25) {
  elem.textContent = "肥満";
} else if (bmi >= 18.5) {
  elem.textContent = "標準";
} else {
  elem.textContent = "やせ";
}
```

## 練習問題

### 問題1: 成績判定

ボタンをクリックしたときに、点数に応じて以下のように評価を表示するプログラムを作成してください。

- 90点以上: 「優秀です」
- 80点以上90点未満: 「良好です」
- 60点以上80点未満: 「合格です」
- 60点未満: 「不合格です」

**ヒント**:
<details>
<summary>ヒント1: 条件の順序</summary>

厳しい条件（大きい値）から順に書きます。
```javascript
if (score >= 90) {
  // ...
} else if (score >= 80) {
  // ...
}
```
</details>

<details>
<summary>ヒント2: 完全な構造</summary>

```javascript
function checkScore() {
  let score = 85;

  if (score >= 90) {
    // 「優秀です」
  } else if (score >= 80) {
    // 「良好です」
  } else if (score >= 60) {
    // 「合格です」
  } else {
    // 「不合格です」
  }
}
```
</details>

<details>
<summary>ヒント3: 要素の更新</summary>

```javascript
const elem = document.getElementById("result");
elem.textContent = "優秀です";
```
</details>

<details>
<summary>ヒント4: テストケース</summary>

- `let score = 95;` → 「優秀です」
- `let score = 85;` → 「良好です」
- `let score = 70;` → 「合格です」
- `let score = 50;` → 「不合格です」
</details>

<details>
<summary>ヒント5: 完全な解答</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>成績判定</title>
</head>
<body>
  <h1>成績判定</h1>
  <button onclick="checkScore()">判定する</button>
  <p id="result"></p>

  <script>
    function checkScore() {
      let score = 85;

      const elem = document.getElementById("result");

      if (score >= 90) {
        elem.textContent = "優秀です";
      } else if (score >= 80) {
        elem.textContent = "良好です";
      } else if (score >= 60) {
        elem.textContent = "合格です";
      } else {
        elem.textContent = "不合格です";
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題2: 年齢グループ判定

ボタンをクリックしたときに、年齢に応じて以下のように分類を表示するプログラムを作成してください。

- 65歳以上: 「高齢者」
- 20歳以上65歳未満: 「成人」
- 20歳未満: 「未成年」

**ヒント**:
<details>
<summary>ヒント1: 条件の設定</summary>

```javascript
if (age >= 65) {
  // ...
} else if (age >= 20) {
  // ...
}
```
</details>

<details>
<summary>ヒント2: 完全な解答</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>年齢グループ判定</title>
</head>
<body>
  <h1>年齢グループ判定</h1>
  <button onclick="checkAgeGroup()">判定する</button>
  <p id="result"></p>

  <script>
    function checkAgeGroup() {
      let age = 35;

      const elem = document.getElementById("result");

      if (age >= 65) {
        elem.textContent = "高齢者";
      } else if (age >= 20) {
        elem.textContent = "成人";
      } else {
        elem.textContent = "未成年";
      }
    }
  </script>
</body>
</html>
```
</details>

### 問題3: BMI判定

ボタンをクリックしたときに、BMIの値に応じて以下のように判定を表示するプログラムを作成してください。

- 25以上: 「肥満」
- 18.5以上25未満: 「標準」
- 18.5未満: 「やせ」

**ヒント**:
<details>
<summary>ヒント1: 変数名</summary>

BMIの値を格納する変数名は`bmi`が適切です。
```javascript
let bmi = 22;
```
</details>

<details>
<summary>ヒント2: 条件の順序</summary>

```javascript
if (bmi >= 25) {
  // 肥満
} else if (bmi >= 18.5) {
  // 標準
} else {
  // やせ
}
```
</details>

<details>
<summary>ヒント3: 完全な解答</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>BMI判定</title>
</head>
<body>
  <h1>BMI判定</h1>
  <button onclick="checkBMI()">判定する</button>
  <p id="result"></p>

  <script>
    function checkBMI() {
      let bmi = 22;

      const elem = document.getElementById("result");

      if (bmi >= 25) {
        elem.textContent = "肥満";
      } else if (bmi >= 18.5) {
        elem.textContent = "標準";
      } else {
        elem.textContent = "やせ";
      }
    }
  </script>
</body>
</html>
```
</details>

## チェックリスト

このレッスンを終える前に、以下の項目を確認してください。

- [ ] else ifの構文を理解している
- [ ] 条件は上から順にチェックされることを理解している
- [ ] 最初に満たされた条件だけ実行されることを分かる
- [ ] 条件は厳しい順（大きい値から）に並べることを覚えた
- [ ] else ifは何個でも使えることを知っている
- [ ] 最後のelseですべてのケースをカバーできることを理解している
- [ ] 3段階の成績判定ができる
- [ ] 5段階の詳細判定ができる
- [ ] 文字列でも分岐できることを理解している
- [ ] 条件の順序が結果に影響することを理解している

## デバッグのヒント

プログラムが期待通りに動かない場合は、以下を確認してください。

1. **条件の順序を確認**
   ```javascript
   // ✅ 正しい（大きい値から）
   if (score >= 80) { }
   else if (score >= 60) { }

   // ❌ 間違い（小さい値から）
   if (score >= 60) { }
   else if (score >= 80) { }  // 到達しない
   ```

2. **else ifとifの違い**
   ```javascript
   // ✅ else if（1つだけ実行）
   if (score >= 80) { }
   else if (score >= 60) { }

   // ❌ if（両方実行される）
   if (score >= 80) { }
   if (score >= 60) { }  // 上書きされる
   ```

3. **>=と>の違い**
   ```javascript
   if (score >= 80) { }  // 80を含む
   if (score > 80) { }   // 80を含まない
   ```

4. **範囲の抜けを確認**
   ```javascript
   console.log("score:", score);
   if (score >= 80) {
     console.log("A");
   } else if (score >= 60) {
     console.log("B");
   } else {
     console.log("C");  // ← すべてカバー
   }
   ```

5. **どの条件が実行されたか確認**
   ```javascript
   if (score >= 80) {
     console.log("条件1が実行された");
     elem.textContent = "A";
   } else if (score >= 60) {
     console.log("条件2が実行された");
     elem.textContent = "B";
   }
   ```

## ポイント

1. **else ifで多分岐**: 3つ以上の選択肢を扱える
2. **条件は順番にチェック**: 上から下へ順番に評価
3. **最初のtrueだけ実行**: それ以降の条件はスキップ
4. **厳しい条件を先に**: 大きい値から小さい値の順に並べる
5. **elseですべてカバー**: 想定外の入力にも対応
6. **何個でも使える**: 必要な数だけelse ifを追加可能
7. **文字列も使える**: 数値だけでなく文字列でも分岐可能

## できるようになったこと

このレッスンを終えると、以下のことができるようになります。

- [ ] else ifを使って3つ以上の分岐ができる
- [ ] 成績判定（A、B、C）ができる
- [ ] 詳細な成績判定（S、A、B、C、D）ができる
- [ ] 年齢による分類（シニア、成人、ティーン、子供）ができる
- [ ] 温度による判定（暑い、快適、涼しい、寒い）ができる
- [ ] 文字列での分岐（色の選択など）ができる
- [ ] 条件の順序の重要性を理解している
- [ ] 多分岐のプログラムを設計できる

## まとめ

このレッスンでは、else ifを使った多分岐を学びました。

最も重要なポイントは以下の7つです。

1. **else ifの構文**: `if (条件1) { } else if (条件2) { } else { }` という形
2. **順次評価**: 条件は上から順番にチェックされる
3. **最初のtrueのみ**: 最初に満たされた条件だけが実行される
4. **条件の順序**: 厳しい条件（大きい値）を先に書く
5. **いくつでも追加可能**: 必要な数だけelse ifを使える
6. **elseで全カバー**: 最後のelseですべてのケースに対応
7. **多様な判定**: 数値、文字列、様々な条件で分岐できる

## 次のステップ

次のレッスンでは、**ネスト（入れ子）**を使った複雑な条件分岐について学びます。

```javascript
// 次のレッスンで学ぶこと
if (age >= 20) {
  if (score >= 60) {
    console.log("成人で合格");
  } else {
    console.log("成人で不合格");
  }
} else {
  console.log("未成年");
}
```

ネストを使うと、「AかつB」のような複雑な条件を扱えるようになります。

お疲れ様でした！
