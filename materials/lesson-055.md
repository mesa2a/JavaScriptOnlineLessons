# レッスン55: おみくじアプリ

## なぜ重要なのか

ランダム性は、ゲームやアプリに面白さと予測不可能性を与える重要な要素です。`Math.random()`を使うことで、毎回異なる結果を生成し、ユーザーを飽きさせないアプリを作ることができます。

### 実世界での活用例

1. **ゲームアプリ（モンスト、パズドラなど）**
   - ガチャシステム（キャラクターのランダム抽選）
   - アイテムドロップの確率制御
   - 敵の出現パターン
   - クリティカルヒットの判定

2. **音楽アプリ（Spotify、Apple Musicなど）**
   - シャッフル再生
   - ランダムプレイリスト生成
   - おすすめ曲のランダム選択

3. **SNS（Instagram、TikTokなど）**
   - フィード表示の多様性
   - ランダムなコンテンツ推薦
   - 「今日のおすすめ」機能

4. **ECサイト（Amazon、楽天など）**
   - 日替わりセール商品の選定
   - ランダムクーポンの配布
   - 「あなたへのおすすめ」のバリエーション

5. **教育アプリ（Duolingo、Quizletなど）**
   - 問題のランダム出題
   - 復習カードのシャッフル
   - ランダムな励ましメッセージ

## このレッスンで学ぶこと

このレッスンでは、乱数を生成して、ランダムな結果を表示するおみくじアプリを作成します。

- **Math.random()**: 0以上1未満のランダムな数を生成
- **ランダム数生成**: 指定した範囲の整数を生成する方法
- **運勢判定**: 乱数を使った条件分岐
- **確率的な処理**: 各結果が出る確率の制御
- **じゃんけんへの応用**: コンピュータの手をランダムにする

## Math.random()の基本

### Math.random()とは

`Math.random()`は、**0以上1未満**のランダムな数値を返す関数です。

```javascript
let random = Math.random();
console.log(random);  // 例: 0.3456789012345678
```

**重要なポイント**:
- 0は含まれる（0が出ることがある）
- 1は含まれない（1は絶対に出ない）
- 小数点以下の数値が返される
- 実行するたびに異なる値が返される

**毎回違う値が出る**:
```javascript
console.log(Math.random());  // 0.123...
console.log(Math.random());  // 0.789...
console.log(Math.random());  // 0.456...
```

### なぜ0以上1未満なのか

この範囲は、確率計算に便利だからです。

```javascript
const random = Math.random();

// 50%の確率で「当たり」
if (random < 0.5) {
  console.log("当たり");
} else {
  console.log("はずれ");
}

// 30%の確率で「大吉」
if (random < 0.3) {
  console.log("大吉");
}
```

0〜1の範囲なら、パーセンテージをそのまま使えます。

## 整数のランダム数を生成する

多くの場合、整数が必要です。整数に変換する方法を学びましょう。

### Math.floor()とは

`Math.floor()`は、**小数点以下を切り捨てる**関数です。

```javascript
Math.floor(3.9);  // 3
Math.floor(3.1);  // 3
Math.floor(3.0);  // 3
Math.floor(0.9);  // 0
```

**床（floor）に落とす**イメージです。

### 0から9までの整数を生成

```javascript
// ステップ1: 0以上1未満の小数を生成
let random = Math.random();  // 例: 0.6543

// ステップ2: 10倍して0以上10未満にする
let scaled = random * 10;    // 例: 6.543

// ステップ3: 小数点以下を切り捨てて0〜9にする
let result = Math.floor(scaled);  // 例: 6

console.log(result);  // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 のいずれか
```

**短く書くと**:
```javascript
let result = Math.floor(Math.random() * 10);
// 0〜9の整数
```

**なぜ10をかけるのか**:
- `Math.random()` は 0 ≤ x < 1
- 10倍すると 0 ≤ x < 10
- `Math.floor()` で 0, 1, 2, ..., 9

### 1から6までの整数（サイコロ）

```javascript
// ステップ1: 0以上1未満
let random = Math.random();  // 例: 0.7

// ステップ2: 6倍して0以上6未満
let scaled = random * 6;     // 例: 4.2

// ステップ3: 切り捨てて0〜5
let floored = Math.floor(scaled);  // 例: 4

// ステップ4: 1を足して1〜6
let result = floored + 1;    // 例: 5

console.log(result);  // 1, 2, 3, 4, 5, 6 のいずれか
```

**短く書くと**:
```javascript
let result = Math.floor(Math.random() * 6) + 1;
// 1〜6の整数
```

**公式**: n以上m以下の整数を生成
```javascript
Math.floor(Math.random() * (m - n + 1)) + n
```

**例**:
- 1〜6: `Math.floor(Math.random() * 6) + 1`
- 10〜20: `Math.floor(Math.random() * 11) + 10`
- 50〜100: `Math.floor(Math.random() * 51) + 50`

## 基本的なおみくじ

### パターン1: 3種類の運勢

最もシンプルなおみくじです。

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");

  // ステップ1: 0, 1, 2 のいずれかを生成
  const random = Math.floor(Math.random() * 3);

  // ステップ2: 数値に応じて運勢を表示
  if (random === 0) {
    result.textContent = "大吉";
  } else if (random === 1) {
    result.textContent = "中吉";
  } else {
    result.textContent = "凶";
  }
}
```

**このコードの動作**:
- `Math.random()` → 0以上1未満の小数
- `* 3` → 0以上3未満の小数
- `Math.floor()` → 0, 1, 2のいずれか
- 各運勢は約33.3%の確率

### パターン2: 5種類の運勢

より詳細なおみくじです。

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");

  // ステップ1: 0〜4 のいずれかを生成
  const random = Math.floor(Math.random() * 5);

  // ステップ2: 数値に応じて運勢を表示
  if (random === 0) {
    result.textContent = "大吉";
  } else if (random === 1) {
    result.textContent = "中吉";
  } else if (random === 2) {
    result.textContent = "小吉";
  } else if (random === 3) {
    result.textContent = "末吉";
  } else {
    result.textContent = "凶";
  }
}
```

**各運勢の確率**: 20%ずつ（均等）

### パターン3: 7種類の運勢（本格的）

実際の神社のおみくじに近い種類です。

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");

  // 0〜6 のいずれかを生成
  const random = Math.floor(Math.random() * 7);

  if (random === 0) {
    result.textContent = "大吉";
  } else if (random === 1) {
    result.textContent = "中吉";
  } else if (random === 2) {
    result.textContent = "小吉";
  } else if (random === 3) {
    result.textContent = "吉";
  } else if (random === 4) {
    result.textContent = "末吉";
  } else if (random === 5) {
    result.textContent = "凶";
  } else {
    result.textContent = "大凶";
  }
}
```

## 確率を調整する（範囲による判定）

整数ではなく、小数の範囲で判定すると、確率を自由に調整できます。

### 不均等な確率のおみくじ

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");

  // 0以上1未満の小数を生成
  const random = Math.random();

  // 範囲で判定（確率を調整）
  if (random < 0.1) {
    result.textContent = "大吉";  // 10%
  } else if (random < 0.3) {
    result.textContent = "中吉";  // 20% (0.1〜0.3)
  } else if (random < 0.6) {
    result.textContent = "小吉";  // 30% (0.3〜0.6)
  } else if (random < 0.9) {
    result.textContent = "末吉";  // 30% (0.6〜0.9)
  } else {
    result.textContent = "凶";    // 10% (0.9〜1.0)
  }
}
```

**確率の計算**:
- 大吉: 0 ≤ random < 0.1 → 10%
- 中吉: 0.1 ≤ random < 0.3 → 20%
- 小吉: 0.3 ≤ random < 0.6 → 30%
- 末吉: 0.6 ≤ random < 0.9 → 30%
- 凶: 0.9 ≤ random < 1.0 → 10%

**この方法のメリット**:
- 確率を細かく制御できる
- 大吉を出にくくする、凶を出やすくするなど調整が簡単

### より現実的な確率

神社のおみくじに近い確率配分です。

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");
  const random = Math.random();

  if (random < 0.17) {
    result.textContent = "大吉";   // 17%
  } else if (random < 0.40) {
    result.textContent = "中吉";   // 23%
  } else if (random < 0.60) {
    result.textContent = "小吉";   // 20%
  } else if (random < 0.75) {
    result.textContent = "吉";     // 15%
  } else if (random < 0.87) {
    result.textContent = "末吉";   // 12%
  } else if (random < 0.97) {
    result.textContent = "凶";     // 10%
  } else {
    result.textContent = "大凶";   // 3%
  }
}
```

## メッセージを追加する

運勢だけでなく、メッセージも表示すると楽しくなります。

### 運勢 + メッセージ

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");
  const random = Math.floor(Math.random() * 4);

  let fortune = "";
  let message = "";

  if (random === 0) {
    fortune = "大吉";
    message = "素晴らしい一日になるでしょう！";
  } else if (random === 1) {
    fortune = "中吉";
    message = "良いことがありそうです。";
  } else if (random === 2) {
    fortune = "小吉";
    message = "穏やかな一日になりそうです。";
  } else {
    fortune = "凶";
    message = "注意して過ごしましょう。";
  }

  // 運勢とメッセージを2行で表示
  result.textContent = fortune + "\n" + message;
}
```

**表示例**:
```
大吉
素晴らしい一日になるでしょう！
```

### より詳細なメッセージ

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");
  const random = Math.floor(Math.random() * 4);

  let fortune = "";
  let message = "";
  let advice = "";

  if (random === 0) {
    fortune = "大吉";
    message = "最高の運勢です！";
    advice = "何事も積極的に挑戦しましょう。";
  } else if (random === 1) {
    fortune = "中吉";
    message = "良い運勢です。";
    advice = "チャンスを逃さないようにしましょう。";
  } else if (random === 2) {
    fortune = "小吉";
    message = "穏やかな運勢です。";
    advice = "焦らず着実に進みましょう。";
  } else {
    fortune = "凶";
    message = "注意が必要です。";
    advice = "慎重に行動しましょう。";
  }

  result.textContent = fortune + "\n\n" + message + "\n" + advice;
}
```

## 色を変える

運勢によって表示色を変えると、視覚的に分かりやすくなります。

### 基本的な色分け

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");
  const random = Math.floor(Math.random() * 4);

  if (random === 0) {
    result.textContent = "大吉";
    result.style.color = "gold";
  } else if (random === 1) {
    result.textContent = "中吉";
    result.style.color = "orange";
  } else if (random === 2) {
    result.textContent = "小吉";
    result.style.color = "green";
  } else {
    result.textContent = "凶";
    result.style.color = "gray";
  }
}
```

**色の意味**:
- 大吉: 金色（ゴールド）
- 中吉: オレンジ色
- 小吉: 緑色
- 凶: 灰色

### 背景色も変える

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");
  const random = Math.floor(Math.random() * 4);

  if (random === 0) {
    result.textContent = "大吉";
    result.style.color = "white";
    result.style.backgroundColor = "gold";
  } else if (random === 1) {
    result.textContent = "中吉";
    result.style.color = "white";
    result.style.backgroundColor = "orange";
  } else if (random === 2) {
    result.textContent = "小吉";
    result.style.color = "white";
    result.style.backgroundColor = "green";
  } else {
    result.textContent = "凶";
    result.style.color = "white";
    result.style.backgroundColor = "gray";
  }
}
```

## よくある間違い

### 間違い1: Math.floor()を忘れる

```javascript
// ❌ 悪い例
const random = Math.random() * 3;  // 0.0〜2.9... の小数

if (random === 0) {  // 絶対に一致しない！
  result.textContent = "大吉";
}
```

**なぜ問題か**: 小数と整数を比較しても一致しません。

```javascript
// ✅ 良い例
const random = Math.floor(Math.random() * 3);  // 0, 1, 2

if (random === 0) {
  result.textContent = "大吉";
}
```

### 間違い2: 範囲が正しくない

```javascript
// ❌ 悪い例
const random = Math.floor(Math.random() * 3) + 1;  // 1, 2, 3

if (random === 0) {  // 0は出ないので、この条件は実行されない
  result.textContent = "大吉";
}
```

**なぜ問題か**: +1しているので、0は出ません。

```javascript
// ✅ 良い例（0から始める場合）
const random = Math.floor(Math.random() * 3);  // 0, 1, 2

// または

// ✅ 良い例（1から始める場合）
const random = Math.floor(Math.random() * 3) + 1;  // 1, 2, 3

if (random === 1) {  // 1から始まるので、1をチェック
  result.textContent = "大吉";
}
```

### 間違い3: 確率の範囲が重複

```javascript
// ❌ 悪い例
const random = Math.random();

if (random < 0.5) {
  result.textContent = "大吉";  // 50%
} else if (random < 0.3) {  // 絶対に実行されない！
  result.textContent = "中吉";
}
```

**なぜ問題か**: random >= 0.5の時に2番目の条件をチェックするので、random < 0.3は絶対に成立しません。

```javascript
// ✅ 良い例
const random = Math.random();

if (random < 0.3) {
  result.textContent = "大吉";  // 30%
} else if (random < 0.5) {
  result.textContent = "中吉";  // 20% (0.3〜0.5)
} else {
  result.textContent = "凶";    // 50% (0.5〜1.0)
}
```

**正しい順序**: 小さい値から順にチェック

### 間違い4: 合計が100%にならない

```javascript
// ❌ 悪い例
const random = Math.random();

if (random < 0.3) {
  result.textContent = "大吉";  // 30%
} else if (random < 0.5) {
  result.textContent = "中吉";  // 20%
}
// else がないので、50%の場合に何も表示されない！
```

**なぜ問題か**: 残りの50%で何も起きません。

```javascript
// ✅ 良い例
const random = Math.random();

if (random < 0.3) {
  result.textContent = "大吉";  // 30%
} else if (random < 0.5) {
  result.textContent = "中吉";  // 20%
} else {
  result.textContent = "凶";    // 50%（残り全部）
}
```

### 間違い5: 同じ乱数を使い回す

```javascript
// ❌ 悪い例
const random = Math.random();

// 運勢を決める
if (random < 0.5) {
  fortune = "大吉";
}

// 同じrandomを使ってラッキーナンバーも決めてしまう
luckyNumber = Math.floor(random * 100);  // 常に0〜49になる
```

**なぜ問題か**: 同じ乱数を使うと、結果が偏ります。

```javascript
// ✅ 良い例
// 運勢用の乱数
const random1 = Math.random();
if (random1 < 0.5) {
  fortune = "大吉";
}

// ラッキーナンバー用の乱数（別の乱数を生成）
const random2 = Math.random();
luckyNumber = Math.floor(random2 * 100);
```

### 間違い6: 結果をクリアしない

```javascript
// ❌ 悪い例
function drawOmikuji() {
  const result = document.getElementById("result");
  const random = Math.floor(Math.random() * 3);

  // 前回の結果が残ったまま
  if (random === 0) {
    result.textContent = "大吉";
  } else if (random === 1) {
    result.textContent = "中吉";
  }
  // random === 2 の場合、何も変わらない
}
```

**なぜ問題か**: elseがないと、前回の結果が残る可能性があります。

```javascript
// ✅ 良い例
function drawOmikuji() {
  const result = document.getElementById("result");
  const random = Math.floor(Math.random() * 3);

  // すべてのパターンで結果を設定
  if (random === 0) {
    result.textContent = "大吉";
  } else if (random === 1) {
    result.textContent = "中吉";
  } else {
    result.textContent = "凶";
  }
}
```

## 実用例

### 実用例1: 基本的なおみくじアプリ（完全版）

シンプルで使いやすいおみくじアプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>おみくじアプリ</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 40px;
      max-width: 500px;
      width: 100%;
      text-align: center;
    }

    h1 {
      color: #667eea;
      margin-bottom: 10px;
      font-size: 28px;
    }

    .description {
      color: #666;
      margin-bottom: 30px;
    }

    .draw-button {
      width: 100%;
      padding: 20px;
      border: none;
      border-radius: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      margin: 20px 0;
    }

    .draw-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    }

    .result-box {
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 30px;
      border-radius: 15px;
      margin: 20px 0;
      background: #f8f9fa;
    }

    .fortune {
      font-size: 60px;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .message {
      font-size: 18px;
      line-height: 1.6;
      color: #333;
    }

    .fortune.daikichi {
      color: #ffd700;
      text-shadow: 2px 2px 4px rgba(255, 215, 0, 0.3);
    }

    .fortune.chukichi {
      color: #ff8c00;
      text-shadow: 2px 2px 4px rgba(255, 140, 0, 0.3);
    }

    .fortune.shokichi {
      color: #32cd32;
      text-shadow: 2px 2px 4px rgba(50, 205, 50, 0.3);
    }

    .fortune.kyo {
      color: #808080;
      text-shadow: 2px 2px 4px rgba(128, 128, 128, 0.3);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎋 今日の運勢</h1>
    <p class="description">おみくじを引いてみましょう</p>

    <button class="draw-button" onclick="drawOmikuji()">おみくじを引く</button>

    <div class="result-box">
      <div id="fortune" class="fortune"></div>
      <div id="message" class="message"></div>
    </div>
  </div>

  <script>
    function drawOmikuji() {
      const fortuneDiv = document.getElementById("fortune");
      const messageDiv = document.getElementById("message");

      // 0〜3の整数をランダムに生成
      const random = Math.floor(Math.random() * 4);

      // 運勢とメッセージを変数に格納
      let fortune = "";
      let message = "";
      let className = "";

      if (random === 0) {
        fortune = "大吉";
        message = "素晴らしい一日になるでしょう！\n何事も積極的に挑戦しましょう。";
        className = "daikichi";
      } else if (random === 1) {
        fortune = "中吉";
        message = "良いことがありそうです。\nチャンスを逃さないようにしましょう。";
        className = "chukichi";
      } else if (random === 2) {
        fortune = "小吉";
        message = "穏やかな一日になりそうです。\n焦らず着実に進みましょう。";
        className = "shokichi";
      } else {
        fortune = "凶";
        message = "注意が必要な一日です。\n慎重に行動しましょう。";
        className = "kyo";
      }

      // 結果を表示
      fortuneDiv.textContent = fortune;
      fortuneDiv.className = "fortune " + className;
      messageDiv.textContent = message;
    }
  </script>
</body>
</html>
```

**このアプリの特徴**:
1. **4種類の運勢**: 大吉、中吉、小吉、凶
2. **均等な確率**: 各25%
3. **色分け**: 運勢ごとに色が変わる
4. **メッセージ**: アドバイスも表示
5. **美しいデザイン**: グラデーション、影、アニメーション

### 実用例2: 詳細な運勢アプリ（完全版）

恋愛運、金運、健康運も表示する本格的なおみくじです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>詳細運勢おみくじ</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 40px;
      max-width: 600px;
      width: 100%;
    }

    h1 {
      color: #f5576c;
      margin-bottom: 10px;
      font-size: 28px;
      text-align: center;
    }

    .draw-button {
      width: 100%;
      padding: 20px;
      border: none;
      border-radius: 12px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      margin: 20px 0;
    }

    .draw-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(245, 87, 108, 0.4);
    }

    .result-box {
      display: none;
    }

    .result-box.show {
      display: block;
    }

    .main-fortune {
      text-align: center;
      padding: 30px;
      border-radius: 15px;
      margin: 20px 0;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }

    .main-fortune .fortune {
      font-size: 50px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .main-fortune .lucky-number {
      font-size: 18px;
      margin-top: 10px;
    }

    .details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 20px 0;
    }

    .detail-item {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 12px;
      border-left: 4px solid #f5576c;
    }

    .detail-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }

    .detail-value {
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }

    .advice {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }

    .advice-title {
      font-weight: bold;
      margin-bottom: 8px;
      color: #856404;
    }

    .advice-text {
      color: #856404;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🌸 今日の詳細運勢</h1>

    <button class="draw-button" onclick="drawOmikuji()">おみくじを引く</button>

    <div id="resultBox" class="result-box">
      <div class="main-fortune">
        <div id="fortune" class="fortune"></div>
        <div id="luckyNumber" class="lucky-number"></div>
      </div>

      <div class="details">
        <div class="detail-item">
          <div class="detail-label">💕 恋愛運</div>
          <div id="love" class="detail-value"></div>
        </div>
        <div class="detail-item">
          <div class="detail-label">💰 金運</div>
          <div id="money" class="detail-value"></div>
        </div>
        <div class="detail-item">
          <div class="detail-label">🏃 健康運</div>
          <div id="health" class="detail-value"></div>
        </div>
        <div class="detail-item">
          <div class="detail-label">📚 勉強運</div>
          <div id="study" class="detail-value"></div>
        </div>
      </div>

      <div class="advice">
        <div class="advice-title">📌 今日のアドバイス</div>
        <div id="advice" class="advice-text"></div>
      </div>
    </div>
  </div>

  <script>
    function drawOmikuji() {
      // 要素を取得
      const resultBox = document.getElementById("resultBox");
      const fortuneDiv = document.getElementById("fortune");
      const luckyNumberDiv = document.getElementById("luckyNumber");
      const loveDiv = document.getElementById("love");
      const moneyDiv = document.getElementById("money");
      const healthDiv = document.getElementById("health");
      const studyDiv = document.getElementById("study");
      const adviceDiv = document.getElementById("advice");

      // 運勢用の乱数（0〜3）
      const fortuneRandom = Math.floor(Math.random() * 4);

      // ラッキーナンバー用の乱数（1〜100）
      const luckyNumber = Math.floor(Math.random() * 100) + 1;

      // 運勢と各運の値を決定
      let fortune = "";
      let love = "";
      let money = "";
      let health = "";
      let study = "";
      let advice = "";

      if (fortuneRandom === 0) {
        fortune = "大吉";
        love = "★★★★★";
        money = "★★★★☆";
        health = "★★★★★";
        study = "★★★★☆";
        advice = "何事も積極的に挑戦しましょう！素晴らしいチャンスが訪れる日です。";
      } else if (fortuneRandom === 1) {
        fortune = "中吉";
        love = "★★★★☆";
        money = "★★★☆☆";
        health = "★★★★☆";
        study = "★★★★☆";
        advice = "チャンスを逃さないように注意深く過ごしましょう。良い出会いがあるかもしれません。";
      } else if (fortuneRandom === 2) {
        fortune = "小吉";
        love = "★★★☆☆";
        money = "★★★☆☆";
        health = "★★★☆☆";
        study = "★★★☆☆";
        advice = "焦らず着実に進みましょう。小さな幸せを見つける日になりそうです。";
      } else {
        fortune = "凶";
        love = "★★☆☆☆";
        money = "★★☆☆☆";
        health = "★★☆☆☆";
        study = "★★★☆☆";
        advice = "慎重に行動しましょう。無理をせず、休息を大切にする日です。";
      }

      // 結果を表示
      fortuneDiv.textContent = fortune;
      luckyNumberDiv.textContent = "ラッキーナンバー: " + luckyNumber;
      loveDiv.textContent = love;
      moneyDiv.textContent = money;
      healthDiv.textContent = health;
      studyDiv.textContent = study;
      adviceDiv.textContent = advice;

      // 結果ボックスを表示
      resultBox.className = "result-box show";
    }
  </script>
</body>
</html>
```

**このアプリの特徴**:
1. **詳細な運勢**: 恋愛運、金運、健康運、勉強運
2. **ラッキーナンバー**: 別の乱数で1〜100を生成
3. **星評価**: ★で視覚的に表示
4. **アドバイス**: 具体的なアドバイスを提供
5. **グリッドレイアウト**: 見やすい配置

### 実用例3: ランダムじゃんけん（完全版）

レッスン54のじゃんけんに乱数を追加したバージョンです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ランダムじゃんけん</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 40px;
      max-width: 500px;
      width: 100%;
    }

    h1 {
      color: #38f9d7;
      margin-bottom: 10px;
      font-size: 28px;
      text-align: center;
    }

    .description {
      text-align: center;
      color: #666;
      margin-bottom: 20px;
    }

    .button-group {
      display: flex;
      gap: 15px;
      margin: 20px 0;
    }

    .hand-button {
      flex: 1;
      padding: 20px;
      border: none;
      border-radius: 12px;
      font-size: 40px;
      background: #f5f5f5;
      cursor: pointer;
      transition: all 0.3s;
    }

    .hand-button:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(56, 249, 215, 0.3);
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    }

    .hand-button .label {
      display: block;
      font-size: 14px;
      margin-top: 5px;
    }

    .result-box {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 30px;
      margin: 20px 0;
      text-align: center;
      min-height: 150px;
    }

    .hands {
      font-size: 18px;
      color: #333;
      margin-bottom: 15px;
      line-height: 1.8;
    }

    .result {
      font-size: 24px;
      font-weight: bold;
      margin-top: 10px;
    }

    .result.win {
      color: #28a745;
    }

    .result.lose {
      color: #dc3545;
    }

    .result.draw {
      color: #ffc107;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✊✌️✋ ランダムじゃんけん</h1>
    <p class="description">コンピュータの手はランダムです！</p>

    <div class="button-group">
      <button class="hand-button" onclick="play('グー')">
        ✊
        <span class="label">グー</span>
      </button>
      <button class="hand-button" onclick="play('チョキ')">
        ✌️
        <span class="label">チョキ</span>
      </button>
      <button class="hand-button" onclick="play('パー')">
        ✋
        <span class="label">パー</span>
      </button>
    </div>

    <div class="result-box">
      <div id="hands" class="hands">手を選んでください</div>
      <div id="result" class="result"></div>
    </div>
  </div>

  <script>
    function play(playerHand) {
      // コンピュータの手をランダムに決定
      const random = Math.floor(Math.random() * 3);
      let computerHand = "";

      if (random === 0) {
        computerHand = "グー";
      } else if (random === 1) {
        computerHand = "チョキ";
      } else {
        computerHand = "パー";
      }

      // 要素を取得
      const handsDiv = document.getElementById("hands");
      const resultDiv = document.getElementById("result");

      // 手を表示
      handsDiv.innerHTML =
        "あなた: " + playerHand + "<br>" +
        "コンピュータ: " + computerHand;

      // 結果をクリア
      resultDiv.className = "result";
      resultDiv.textContent = "";

      // 勝敗判定
      if (playerHand === computerHand) {
        resultDiv.textContent = "あいこです";
        resultDiv.className = "result draw";
      } else if (
        (playerHand === "グー" && computerHand === "チョキ") ||
        (playerHand === "チョキ" && computerHand === "パー") ||
        (playerHand === "パー" && computerHand === "グー")
      ) {
        resultDiv.textContent = "あなたの勝ち！";
        resultDiv.className = "result win";
      } else {
        resultDiv.textContent = "コンピュータの勝ち";
        resultDiv.className = "result lose";
      }
    }
  </script>
</body>
</html>
```

**このアプリの特徴**:
1. **ランダムな手**: コンピュータが0〜2の乱数で手を決定
2. **3つの手**: グー、チョキ、パーから選択
3. **勝敗判定**: レッスン54のロジックを使用
4. **公平なゲーム**: 各手は33.3%の確率

## 練習問題

### 練習問題1: 基本的なおみくじ

以下の要件を満たすおみくじアプリを作成してください。

**要件**:
- 4種類の運勢（大吉、中吉、小吉、凶）
- 均等な確率（各25%）
- ボタンをクリックすると運勢を表示

<details>
<summary>💡 ヒント1: 整数の生成</summary>

```javascript
// 0〜3の整数を生成
const random = Math.floor(Math.random() * 4);

// 0, 1, 2, 3 のいずれか
```

4種類なので、`* 4`を使います。

</details>

<details>
<summary>💡 ヒント2: 条件分岐</summary>

```javascript
if (random === 0) {
  result.textContent = "大吉";
} else if (random === 1) {
  result.textContent = "中吉";
} else if (random === 2) {
  result.textContent = "小吉";
} else {
  result.textContent = "凶";
}
```

4つの条件を書きます。

</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>おみくじ</title>
  <style>
    body {
      font-family: sans-serif;
      text-align: center;
      padding: 50px;
    }

    button {
      padding: 15px 30px;
      font-size: 18px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    #result {
      margin-top: 30px;
      font-size: 40px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>おみくじ</h1>
  <button onclick="drawOmikuji()">おみくじを引く</button>
  <div id="result"></div>

  <script>
    function drawOmikuji() {
      const result = document.getElementById("result");

      // 0〜3の整数をランダムに生成
      const random = Math.floor(Math.random() * 4);

      // 運勢を判定
      if (random === 0) {
        result.textContent = "大吉";
      } else if (random === 1) {
        result.textContent = "中吉";
      } else if (random === 2) {
        result.textContent = "小吉";
      } else {
        result.textContent = "凶";
      }
    }
  </script>
</body>
</html>
```

</details>

### 練習問題2: 確率を調整したおみくじ

以下の要件を満たすおみくじアプリを作成してください。

**要件**:
- 大吉: 10%
- 中吉: 30%
- 小吉: 40%
- 凶: 20%

<details>
<summary>💡 ヒント: 範囲による判定</summary>

```javascript
const random = Math.random();  // 0以上1未満

if (random < 0.1) {
  // 0〜0.1 → 10%
  result.textContent = "大吉";
} else if (random < 0.4) {
  // 0.1〜0.4 → 30%
  result.textContent = "中吉";
} else if (random < 0.8) {
  // 0.4〜0.8 → 40%
  result.textContent = "小吉";
} else {
  // 0.8〜1.0 → 20%
  result.textContent = "凶";
}
```

小数の範囲で判定します。

</details>

<details>
<summary>✅ 解答例</summary>

```javascript
function drawOmikuji() {
  const result = document.getElementById("result");
  const random = Math.random();

  if (random < 0.1) {
    result.textContent = "大吉（10%）";
  } else if (random < 0.4) {
    result.textContent = "中吉（30%）";
  } else if (random < 0.8) {
    result.textContent = "小吉（40%）";
  } else {
    result.textContent = "凶（20%）";
  }
}
```

</details>

### 練習問題3: サイコロアプリ（発展）

以下の要件を満たすサイコロアプリを作成してください。

**要件**:
- 1〜6の目をランダムに表示
- ボタンをクリックするとサイコロを振る
- 大きな数字で目を表示

<details>
<summary>💡 ヒント: 1〜6の整数</summary>

```javascript
// 1〜6の整数を生成
const dice = Math.floor(Math.random() * 6) + 1;

// 0〜5 → +1 → 1〜6
```

6種類の目があるので、`* 6`を使い、+1します。

</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>サイコロ</title>
  <style>
    body {
      font-family: sans-serif;
      text-align: center;
      padding: 50px;
    }

    button {
      padding: 15px 30px;
      font-size: 18px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    #result {
      margin-top: 30px;
      font-size: 100px;
      font-weight: bold;
      width: 150px;
      height: 150px;
      line-height: 150px;
      margin: 30px auto;
      border: 3px solid #333;
      border-radius: 15px;
      background: white;
    }
  </style>
</head>
<body>
  <h1>🎲 サイコロ</h1>
  <button onclick="rollDice()">サイコロを振る</button>
  <div id="result">?</div>

  <script>
    function rollDice() {
      const result = document.getElementById("result");

      // 1〜6の整数をランダムに生成
      const dice = Math.floor(Math.random() * 6) + 1;

      // 目を表示
      result.textContent = dice;
    }
  </script>
</body>
</html>
```

</details>

## デバッグのヒント

### 1. 乱数が整数にならない

**原因**: `Math.floor()`を忘れている

```javascript
// ❌ 問題のあるコード
const random = Math.random() * 3;  // 0.0〜2.9... の小数

console.log(random);  // 1.234... のような小数
```

**解決方法**: `Math.floor()`で切り捨て

```javascript
// ✅ 修正版
const random = Math.floor(Math.random() * 3);  // 0, 1, 2

console.log(random);  // 0, 1, 2 のいずれか
```

### 2. コンソールで乱数をテスト

```javascript
// 10回生成してみる
for (let i = 0; i < 10; i = i + 1) {
  const random = Math.floor(Math.random() * 4);
  console.log(random);
}

// 出力例:
// 2
// 0
// 3
// 1
// 2
// ...
```

期待した範囲の整数が出ているか確認します。

### 3. 確率をテストする

```javascript
// 1000回生成して確率を確認
let count0 = 0;
let count1 = 0;
let count2 = 0;
let count3 = 0;

for (let i = 0; i < 1000; i = i + 1) {
  const random = Math.floor(Math.random() * 4);
  if (random === 0) count0 = count0 + 1;
  if (random === 1) count1 = count1 + 1;
  if (random === 2) count2 = count2 + 1;
  if (random === 3) count3 = count3 + 1;
}

console.log("0:", count0 / 1000 * 100 + "%");
console.log("1:", count1 / 1000 * 100 + "%");
console.log("2:", count2 / 1000 * 100 + "%");
console.log("3:", count3 / 1000 * 100 + "%");

// 出力例（約25%ずつになるはず）:
// 0: 24.8%
// 1: 25.3%
// 2: 24.6%
// 3: 25.3%
```

## チェックリスト

おみくじアプリを作成する際の確認項目です。

- [ ] **Math.random()を使っている**
  - 0以上1未満の小数を生成

- [ ] **Math.floor()で整数に変換**
  - 小数点以下を切り捨て

- [ ] **範囲が正しい**
  - n種類なら `* n`
  - 0から始めるか1から始めるか確認

- [ ] **すべてのパターンを網羅**
  - elseを忘れない
  - 合計100%になっている

- [ ] **条件分岐が正しい**
  - 整数なら `===` で比較
  - 範囲なら `<` で比較

- [ ] **結果を表示している**
  - `textContent` で設定

- [ ] **毎回違う結果が出る**
  - `Math.random()`を呼ぶたびに違う値

- [ ] **確率が意図通り**
  - 均等なら整数で判定
  - 不均等なら小数で判定

- [ ] **見た目が分かりやすい**
  - 色分け、フォントサイズなど

- [ ] **複数回テスト済み**
  - 何度か実行して動作確認

## ポイント

### 1. Math.random()は0以上1未満

```javascript
const random = Math.random();
// 0 <= random < 1
// 0は含む、1は含まない
```

確率計算に便利な範囲です。

### 2. Math.floor()で整数に

```javascript
const random = Math.random();    // 0.7654...
const floored = Math.floor(random * 10);  // 7
```

小数点以下を切り捨てて整数にします。

### 3. 範囲の指定

```javascript
// n種類の整数（0〜n-1）
Math.floor(Math.random() * n)

// m〜nの整数
Math.floor(Math.random() * (n - m + 1)) + m
```

**例**:
- 0〜9: `Math.floor(Math.random() * 10)`
- 1〜6: `Math.floor(Math.random() * 6) + 1`
- 10〜20: `Math.floor(Math.random() * 11) + 10`

### 4. 確率の調整

**均等な確率**: 整数で判定
```javascript
const random = Math.floor(Math.random() * 4);
// 各25%
```

**不均等な確率**: 小数で判定
```javascript
const random = Math.random();
if (random < 0.1) { /* 10% */ }
else if (random < 0.4) { /* 30% */ }
```

### 5. 複数の乱数が必要なら別々に生成

```javascript
// 運勢用
const fortuneRandom = Math.random();

// ラッキーナンバー用（別の乱数）
const luckyNumber = Math.floor(Math.random() * 100) + 1;
```

同じ乱数を使い回さない。

### 6. じゃんけんへの応用

```javascript
const random = Math.floor(Math.random() * 3);
let computerHand = "";

if (random === 0) computerHand = "グー";
else if (random === 1) computerHand = "チョキ";
else computerHand = "パー";
```

コンピュータの手をランダムに決定できます。

### 7. デバッグはコンソールで

```javascript
// 何回か実行してみる
for (let i = 0; i < 10; i = i + 1) {
  console.log(Math.floor(Math.random() * 4));
}
```

期待した範囲の値が出ているか確認します。

### 8. 確率は完璧ではない

乱数は確率的なので、10回中exactly 5回「大吉」が出るとは限りません。大数の法則により、回数を増やすほど理論値に近づきます。

## できるようになったこと

このレッスンを完了すると、以下のことができるようになります。

1. **Math.random()を使う**
   - 0以上1未満のランダムな数を生成

2. **整数のランダム数を生成する**
   - `Math.floor()`で小数を整数に変換
   - 指定した範囲の整数を生成

3. **おみくじアプリを作る**
   - ランダムに運勢を表示
   - 毎回異なる結果

4. **確率を制御する**
   - 均等な確率（整数で判定）
   - 不均等な確率（小数で判定）

5. **ランダム性をゲームに応用する**
   - じゃんけんのコンピュータの手
   - サイコロ
   - ガチャシステム

6. **複数の乱数を組み合わせる**
   - 運勢とラッキーナンバー
   - 異なる要素を独立に決定

7. **視覚的なフィードバック**
   - 運勢ごとに色を変える
   - メッセージを追加

8. **乱数のデバッグ**
   - コンソールでテスト
   - 確率の検証

## まとめ

### Math.random()の基本

```javascript
const random = Math.random();
// 0 <= random < 1
```

0以上1未満のランダムな小数を返します。

### 整数への変換

```javascript
// 0〜n-1の整数
Math.floor(Math.random() * n)

// m〜nの整数
Math.floor(Math.random() * (n - m + 1)) + m
```

`Math.floor()`で小数点以下を切り捨てます。

### 確率の制御

**均等**:
```javascript
const random = Math.floor(Math.random() * 4);
if (random === 0) { /* 25% */ }
else if (random === 1) { /* 25% */ }
// ...
```

**不均等**:
```javascript
const random = Math.random();
if (random < 0.2) { /* 20% */ }
else if (random < 0.5) { /* 30% */ }
// ...
```

### 実用例

- **おみくじ**: ランダムに運勢を表示
- **じゃんけん**: コンピュータの手をランダムに決定
- **サイコロ**: 1〜6の目をランダムに表示
- **ガチャ**: アイテムをランダムに抽選

### このレッスンで学んだこと

- `Math.random()`の使い方
- `Math.floor()`による整数化
- 指定範囲の乱数生成
- 確率的な処理の実装
- ゲームへの応用

ランダム性は、アプリに予測不可能性と楽しさをもたらします。しっかりと理解して、様々なアプリに活用しましょう！

## 次のステップ

次のレッスンでは、**switch文**について学びます。

switch文では:
- `switch-case`構文
- より読みやすい条件分岐
- `break`文の役割
- `default`節

おみくじのような複数の条件分岐を、より見やすく書く方法を学びましょう！
