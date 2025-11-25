# レッスン54: じゃんけんゲーム

## なぜ重要なのか

じゃんけんゲームは、複数の条件を組み合わせた実践的なゲームロジックを学ぶ最良の教材です。実際のWebサービスでも、複雑な条件判定は頻繁に使われます。

### 実世界での活用例

1. **ゲームアプリ（ポケモンGO、原神など）**
   - 属性の相性判定（炎→草→水→炎）
   - じゃんけんと同じ3すくみの関係
   - 勝敗判定と結果表示
   - スコアやランキング管理

2. **マッチングアプリ（Tinder、Pairsなど）**
   - ユーザー同士の相性判定
   - 複数の条件を組み合わせてマッチング
   - 結果を視覚的に表示
   - 統計情報の記録

3. **ECサイト（Amazon、楽天など）**
   - 商品の在庫と配送可否の判定
   - 複数の条件（在庫、地域、時間）を組み合わせる
   - 「購入可能」「予約」「在庫切れ」などの状態表示

4. **天気アプリ（Yahoo天気、ウェザーニュース）**
   - 気温、湿度、風速などから服装をアドバイス
   - 複数の条件を組み合わせて判定
   - 結果を分かりやすく表示

5. **交通系アプリ（Google Maps、乗換案内）**
   - 複数の経路から最適ルートを判定
   - 時間、料金、乗換回数などを比較
   - 「最速」「最安」「楽」などの結果表示

## このレッスンで学ぶこと

このレッスンでは、じゃんけんゲームを作りながら、複雑な条件分岐の扱い方を学びます。

- **3つの選択肢**: グー、チョキ、パーの実装
- **勝敗判定**: 複数の条件を組み合わせたゲームロジック
- **結果表示**: 勝ち、負け、あいこの表示
- **入力検証**: 正しい手かどうかのチェック
- **条件の整理**: 複雑な条件を読みやすく書く方法
- **状態管理**: 勝敗カウントの記録

## じゃんけんのルール

じゃんけんは、シンプルですが奥深いゲームです。まず、基本ルールを確認しましょう。

### 基本ルール

じゃんけんには、**3すくみ**の関係があります。

```
グー → チョキに勝つ（石がハサミを壊す）
チョキ → パーに勝つ（ハサミが紙を切る）
パー → グーに勝つ（紙が石を包む）
```

**すべてのパターン（9通り）**:

| あなた | 相手 | 結果 |
|--------|------|------|
| グー | グー | あいこ |
| グー | チョキ | **勝ち** |
| グー | パー | 負け |
| チョキ | グー | 負け |
| チョキ | チョキ | あいこ |
| チョキ | パー | **勝ち** |
| パー | グー | **勝ち** |
| パー | チョキ | 負け |
| パー | パー | あいこ |

**3つの結果**:
- **あいこ**: 同じ手（3パターン）
- **勝ち**: あなたが勝つ（3パターン）
- **負け**: 相手が勝つ（3パターン）

## シンプルなじゃんけん

まずは、最もシンプルなじゃんけんから始めましょう。

### ステップ1: 固定の手で判定

プレイヤーとコンピュータの手を固定して、勝敗を判定します。

```javascript
function judge() {
  const playerHand = "グー";
  const computerHand = "チョキ";
  const result = document.getElementById("result");

  // ステップ1: あいこをチェック（最も簡単）
  if (playerHand === computerHand) {
    result.textContent = "あいこです";
    return;  // ここで処理終了
  }

  // ステップ2: プレイヤーの勝ち条件をチェック
  if (playerHand === "グー" && computerHand === "チョキ") {
    result.textContent = "あなたの勝ちです！";
  } else if (playerHand === "チョキ" && computerHand === "パー") {
    result.textContent = "あなたの勝ちです！";
  } else if (playerHand === "パー" && computerHand === "グー") {
    result.textContent = "あなたの勝ちです！";
  } else {
    // ステップ3: それ以外は負け
    result.textContent = "コンピュータの勝ちです";
  }
}
```

**このコードの流れ**:
1. まずあいこをチェック（同じ手なら終了）
2. プレイヤーが勝つ3パターンをチェック
3. どれにも当てはまらなければ負け

**なぜあいこを先にチェックするのか**:
- 最も簡単な条件（`playerHand === computerHand`）
- 早期リターンで後続の処理を減らせる
- コードが読みやすくなる

## 勝敗判定のロジック

じゃんけんの勝敗判定には、いくつかのパターンがあります。

### パターン1: すべての勝ち条件を書く

最も分かりやすい方法です。

```javascript
function judge(playerHand, computerHand) {
  // ステップ1: あいこ
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // ステップ2: プレイヤーの勝ち（3パターン）
  if (playerHand === "グー" && computerHand === "チョキ") {
    return "勝ち";
  }
  if (playerHand === "チョキ" && computerHand === "パー") {
    return "勝ち";
  }
  if (playerHand === "パー" && computerHand === "グー") {
    return "勝ち";
  }

  // ステップ3: それ以外は負け
  return "負け";
}
```

**メリット**:
- 勝ち条件が明確
- 初心者にも理解しやすい
- デバッグしやすい

**デメリット**:
- 条件が多い（3つの if）

### パターン2: すべての負け条件を書く

勝ちと負けを逆にしたパターンです。

```javascript
function judge(playerHand, computerHand) {
  // ステップ1: あいこ
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // ステップ2: プレイヤーの負け（3パターン）
  if (playerHand === "グー" && computerHand === "パー") {
    return "負け";
  }
  if (playerHand === "チョキ" && computerHand === "グー") {
    return "負け";
  }
  if (playerHand === "パー" && computerHand === "チョキ") {
    return "負け";
  }

  // ステップ3: それ以外は勝ち
  return "勝ち";
}
```

**いつ使うか**:
- 負け条件を強調したい場合
- 負け時に特別な処理をする場合

### パターン3: OR演算子でまとめる

3つの勝ち条件を1つにまとめます。

```javascript
function judge(playerHand, computerHand) {
  // あいこ
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // プレイヤーの勝ち（3つの条件をORでつなぐ）
  if (
    (playerHand === "グー" && computerHand === "チョキ") ||
    (playerHand === "チョキ" && computerHand === "パー") ||
    (playerHand === "パー" && computerHand === "グー")
  ) {
    return "勝ち";
  }

  // それ以外は負け
  return "負け";
}
```

**メリット**:
- コードが短い
- 1つの条件として扱える

**デメリット**:
- 複雑で読みにくくなる可能性

**どのパターンを選ぶべきか**:
- 初心者: パターン1（すべての勝ち条件を書く）
- 慣れてきたら: パターン3（ORでまとめる）

## 入力を受け取る

ユーザーから手を入力してもらいましょう。

### 入力欄を使う方法

```javascript
function play() {
  const playerHand = document.getElementById("playerHand").value;
  const computerHand = "グー";  // 今は固定
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 表示をクリア
  result.textContent = "";
  error.textContent = "";

  // ステップ1: 入力検証
  if (playerHand !== "グー" && playerHand !== "チョキ" && playerHand !== "パー") {
    error.textContent = "「グー」「チョキ」「パー」のいずれかを入力してください";
    return;
  }

  // ステップ2: 勝敗判定
  if (playerHand === computerHand) {
    result.textContent = "あいこです";
  } else if (
    (playerHand === "グー" && computerHand === "チョキ") ||
    (playerHand === "チョキ" && computerHand === "パー") ||
    (playerHand === "パー" && computerHand === "グー")
  ) {
    result.textContent = "あなたの勝ちです！";
  } else {
    result.textContent = "コンピュータの勝ちです";
  }
}
```

**入力検証が重要**:
- 「グー」「チョキ」「パー」以外を弾く
- エラーメッセージで何を入力すべきか伝える
- 不正な入力で勝敗判定が実行されない

### 入力検証の別の書き方

配列を使ってチェックすることもできます（※配列は後のレッスンで学びますが、参考として紹介）。

```javascript
// 有効な手をリストアップ
const validHands = ["グー", "チョキ", "パー"];

// includes()で含まれているかチェック
if (!validHands.includes(playerHand)) {
  error.textContent = "「グー」「チョキ」「パー」のいずれかを入力してください";
  return;
}
```

ただし、現時点では最初の方法（3つの条件をORでつなぐ）を使いましょう。

## 結果の詳細表示

どの手を出したかも表示すると、よりわかりやすくなります。

```javascript
function play() {
  const playerHand = document.getElementById("playerHand").value;
  const computerHand = "グー";
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  result.textContent = "";
  error.textContent = "";

  // 入力検証
  if (playerHand !== "グー" && playerHand !== "チョキ" && playerHand !== "パー") {
    error.textContent = "「グー」「チョキ」「パー」のいずれかを入力してください";
    return;
  }

  // 手を表示（文字列を結合）
  let message = "あなた: " + playerHand + "\n";
  message = message + "コンピュータ: " + computerHand + "\n\n";

  // 勝敗判定
  if (playerHand === computerHand) {
    message = message + "結果: あいこです";
  } else if (
    (playerHand === "グー" && computerHand === "チョキ") ||
    (playerHand === "チョキ" && computerHand === "パー") ||
    (playerHand === "パー" && computerHand === "グー")
  ) {
    message = message + "結果: あなたの勝ちです！";
  } else {
    message = message + "結果: コンピュータの勝ちです";
  }

  result.textContent = message;
}
```

**表示例**:
```
あなた: グー
コンピュータ: チョキ

結果: あなたの勝ちです！
```

**なぜ詳細表示が良いのか**:
- 何が起きたか一目で分かる
- デバッグしやすい
- ユーザーフレンドリー

## 条件の整理

複雑な条件は、変数に分けると読みやすくなります。

### 変数に分ける方法

```javascript
function play() {
  const playerHand = document.getElementById("playerHand").value;
  const computerHand = "グー";
  const result = document.getElementById("result");

  // ステップ1: 各条件を変数に格納
  const isDraw = playerHand === computerHand;

  const playerWinsWithRock = playerHand === "グー" && computerHand === "チョキ";
  const playerWinsWithScissors = playerHand === "チョキ" && computerHand === "パー";
  const playerWinsWithPaper = playerHand === "パー" && computerHand === "グー";
  const playerWins = playerWinsWithRock || playerWinsWithScissors || playerWinsWithPaper;

  // ステップ2: 分かりやすい条件で判定
  if (isDraw) {
    result.textContent = "あいこです";
  } else if (playerWins) {
    result.textContent = "あなたの勝ちです！";
  } else {
    result.textContent = "コンピュータの勝ちです";
  }
}
```

**メリット**:
- 条件が自然言語のように読める
- `if (isDraw)` は「もしあいこなら」と読める
- `if (playerWins)` は「もしプレイヤーが勝つなら」と読める
- バグを見つけやすい

**デメリット**:
- コードが長くなる
- 変数が増える

**いつ使うか**:
- 条件が複雑な場合
- チームで開発する場合
- 後で見返す可能性が高い場合

## ボタンで選択する

input要素の代わりに、ボタンで手を選択する方が使いやすいです。

### HTML部分

```html
<div class="button-group">
  <button onclick="play('グー')">グー ✊</button>
  <button onclick="play('チョキ')">チョキ ✌️</button>
  <button onclick="play('パー')">パー ✋</button>
</div>
<div id="result"></div>
```

### JavaScript部分

```javascript
function play(playerHand) {
  const computerHand = "グー";  // 固定
  const result = document.getElementById("result");

  // 手を表示
  let message = "あなた: " + playerHand + "\n";
  message = message + "コンピュータ: " + computerHand + "\n\n";

  // 勝敗判定
  if (playerHand === computerHand) {
    message = message + "結果: あいこです";
  } else if (
    (playerHand === "グー" && computerHand === "チョキ") ||
    (playerHand === "チョキ" && computerHand === "パー") ||
    (playerHand === "パー" && computerHand === "グー")
  ) {
    message = message + "結果: あなたの勝ちです！";
  } else {
    message = message + "結果: コンピュータの勝ちです";
  }

  result.textContent = message;
}
```

**ボタンを使うメリット**:
- 入力検証が不要（ボタンは必ず正しい値）
- タップ/クリックしやすい
- 絵文字で視覚的に分かりやすい
- モバイルフレンドリー

## よくある間違い

### 間違い1: あいこをチェックしない

```javascript
// ❌ 悪い例
function judge(playerHand, computerHand) {
  // あいこのチェックがない！
  if (playerHand === "グー" && computerHand === "チョキ") {
    return "勝ち";
  }
  // ...
  // グー vs グーの場合、どうなる？
}
```

```javascript
// ✅ 良い例
function judge(playerHand, computerHand) {
  // まずあいこをチェック
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // 勝敗判定
  if (playerHand === "グー" && computerHand === "チョキ") {
    return "勝ち";
  }
  // ...
}
```

**なぜ問題か**: あいこの場合の処理が抜けると、意図しない結果になります。

### 間違い2: 条件が不完全

```javascript
// ❌ 悪い例
function judge(playerHand, computerHand) {
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // グーの勝ちしか書いていない
  if (playerHand === "グー" && computerHand === "チョキ") {
    return "勝ち";
  }

  return "負け";  // チョキやパーで勝つ場合も「負け」になる！
}
```

```javascript
// ✅ 良い例
function judge(playerHand, computerHand) {
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // すべての勝ちパターンを書く
  if (playerHand === "グー" && computerHand === "チョキ") {
    return "勝ち";
  }
  if (playerHand === "チョキ" && computerHand === "パー") {
    return "勝ち";
  }
  if (playerHand === "パー" && computerHand === "グー") {
    return "勝ち";
  }

  return "負け";
}
```

**なぜ問題か**: 勝ちパターンが漏れると、勝てるはずなのに負けになります。

### 間違い3: 入力検証を忘れる

```javascript
// ❌ 悪い例
function play() {
  const playerHand = document.getElementById("playerHand").value;
  const computerHand = "グー";

  // 入力検証なし！
  // ユーザーが "ぐー" や "石" と入力したら？
  if (playerHand === computerHand) {
    result.textContent = "あいこ";
  } else if (playerHand === "グー" && computerHand === "チョキ") {
    result.textContent = "勝ち";
  } else {
    result.textContent = "負け";  // 不正な入力も「負け」になる！
  }
}
```

```javascript
// ✅ 良い例
function play() {
  const playerHand = document.getElementById("playerHand").value;
  const computerHand = "グー";

  // 入力検証を追加
  if (playerHand !== "グー" && playerHand !== "チョキ" && playerHand !== "パー") {
    error.textContent = "「グー」「チョキ」「パー」のいずれかを入力してください";
    return;
  }

  // 正しい入力のみ勝敗判定
  if (playerHand === computerHand) {
    result.textContent = "あいこ";
  }
  // ...
}
```

**なぜ問題か**: 不正な入力で勝敗が決まると、ユーザーが混乱します。

### 間違い4: 条件の論理が逆

```javascript
// ❌ 悪い例
function judge(playerHand, computerHand) {
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // 条件が逆！グーはチョキに勝つのに、パーになっている
  if (playerHand === "グー" && computerHand === "パー") {
    return "勝ち";  // これは負けパターン
  }
  // ...
}
```

```javascript
// ✅ 良い例
function judge(playerHand, computerHand) {
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // グーはチョキに勝つ
  if (playerHand === "グー" && computerHand === "チョキ") {
    return "勝ち";
  }
  // ...
}
```

**なぜ問題か**: ルールが逆だと、勝ち負けが反対になります。

### 間違い5: else if の順序ミス

```javascript
// ❌ 悪い例
function play(playerHand) {
  const computerHand = "グー";

  // あいこを最後にチェック
  if (playerHand === "グー" && computerHand === "チョキ") {
    result.textContent = "勝ち";
  } else if (playerHand === computerHand) {
    result.textContent = "あいこ";  // 前の条件で弾かれる可能性
  }
  // ...
}
```

```javascript
// ✅ 良い例
function play(playerHand) {
  const computerHand = "グー";

  // あいこを最初にチェック
  if (playerHand === computerHand) {
    result.textContent = "あいこ";
    return;  // 早期リターン
  }

  // 勝敗判定
  if (playerHand === "グー" && computerHand === "チョキ") {
    result.textContent = "勝ち";
  }
  // ...
}
```

**なぜ問題か**: 簡単な条件（あいこ）を先にチェックすると、コードが分かりやすくなります。

### 間違い6: 結果をクリアしない

```javascript
// ❌ 悪い例
function play(playerHand) {
  const computerHand = "グー";
  const result = document.getElementById("result");

  // 前回の結果が残ったまま
  if (playerHand === computerHand) {
    result.textContent = "あいこ";
  }
  // elseがないと、結果が更新されない場合がある
}
```

```javascript
// ✅ 良い例
function play(playerHand) {
  const computerHand = "グー";
  const result = document.getElementById("result");

  // まず結果をクリア
  result.textContent = "";

  if (playerHand === computerHand) {
    result.textContent = "あいこ";
  } else if (/* ... */) {
    result.textContent = "勝ち";
  } else {
    result.textContent = "負け";
  }
}
```

**なぜ問題か**: 前回の結果が残ると、今回の結果が分かりにくくなります。

## 実用例

### 実用例1: 基本的なじゃんけんゲーム（完全版）

ボタンで手を選択する、シンプルなじゃんけんゲームです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>じゃんけんゲーム</title>
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
    }

    h1 {
      color: #667eea;
      margin-bottom: 10px;
      font-size: 28px;
      text-align: center;
    }

    .instruction {
      text-align: center;
      color: #666;
      margin-bottom: 30px;
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
      position: relative;
    }

    .hand-button:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
      display: flex;
      flex-direction: column;
      justify-content: center;
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
    <h1>✊✌️✋ じゃんけんゲーム</h1>
    <p class="instruction">手を選んでください</p>

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
      // コンピュータの手（固定）
      const computerHand = "グー";

      // 要素を取得
      const handsDiv = document.getElementById("hands");
      const resultDiv = document.getElementById("result");

      // 手を表示
      handsDiv.innerHTML =
        "あなた: " + playerHand + "<br>" +
        "コンピュータ: " + computerHand;

      // 結果の表示をクリア
      resultDiv.className = "result";
      resultDiv.textContent = "";

      // ステップ1: あいこチェック
      if (playerHand === computerHand) {
        resultDiv.textContent = "あいこです";
        resultDiv.className = "result draw";
        return;
      }

      // ステップ2: 勝ち条件チェック
      if (
        (playerHand === "グー" && computerHand === "チョキ") ||
        (playerHand === "チョキ" && computerHand === "パー") ||
        (playerHand === "パー" && computerHand === "グー")
      ) {
        resultDiv.textContent = "あなたの勝ち！";
        resultDiv.className = "result win";
      } else {
        // ステップ3: それ以外は負け
        resultDiv.textContent = "コンピュータの勝ち";
        resultDiv.className = "result lose";
      }
    }
  </script>
</body>
</html>
```

**このアプリの特徴**:
1. **ボタンUI**: タップしやすい大きなボタン
2. **絵文字**: 視覚的に分かりやすい
3. **色分け**: 勝ち（緑）、負け（赤）、あいこ（黄色）
4. **アニメーション**: ホバー時に浮き上がる
5. **固定の手**: コンピュータは常に「グー」

### 実用例2: 勝敗カウント付きじゃんけん（完全版）

勝敗を記録して統計を表示するバージョンです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>じゃんけんゲーム（統計付き）</title>
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

    .stats {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 12px;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      font-size: 32px;
      font-weight: bold;
      color: #f5576c;
    }

    .stat-label {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
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
      box-shadow: 0 10px 20px rgba(245, 87, 108, 0.3);
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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

    .reset-btn {
      width: 100%;
      padding: 15px;
      border: none;
      border-radius: 12px;
      background: #6c757d;
      color: white;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
    }

    .reset-btn:hover {
      background: #5a6268;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✊✌️✋ じゃんけんゲーム</h1>

    <div class="stats">
      <div class="stat">
        <div class="stat-number" id="wins">0</div>
        <div class="stat-label">勝ち</div>
      </div>
      <div class="stat">
        <div class="stat-number" id="losses">0</div>
        <div class="stat-label">負け</div>
      </div>
      <div class="stat">
        <div class="stat-number" id="draws">0</div>
        <div class="stat-label">あいこ</div>
      </div>
    </div>

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

    <button class="reset-btn" onclick="reset()">リセット</button>
  </div>

  <script>
    // グローバル変数で統計を管理
    let wins = 0;
    let losses = 0;
    let draws = 0;

    function play(playerHand) {
      // コンピュータの手（固定）
      const computerHand = "グー";

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

      // ステップ1: あいこチェック
      if (playerHand === computerHand) {
        draws = draws + 1;
        resultDiv.textContent = "あいこです";
        resultDiv.className = "result draw";
      }
      // ステップ2: 勝ちチェック
      else if (
        (playerHand === "グー" && computerHand === "チョキ") ||
        (playerHand === "チョキ" && computerHand === "パー") ||
        (playerHand === "パー" && computerHand === "グー")
      ) {
        wins = wins + 1;
        resultDiv.textContent = "あなたの勝ち！";
        resultDiv.className = "result win";
      }
      // ステップ3: 負け
      else {
        losses = losses + 1;
        resultDiv.textContent = "コンピュータの勝ち";
        resultDiv.className = "result lose";
      }

      // 統計を更新
      updateStats();
    }

    function updateStats() {
      document.getElementById("wins").textContent = wins;
      document.getElementById("losses").textContent = losses;
      document.getElementById("draws").textContent = draws;
    }

    function reset() {
      // 統計をリセット
      wins = 0;
      losses = 0;
      draws = 0;

      // 表示をクリア
      document.getElementById("hands").textContent = "手を選んでください";
      document.getElementById("result").textContent = "";
      document.getElementById("result").className = "result";

      // 統計を更新
      updateStats();
    }
  </script>
</body>
</html>
```

**このアプリの特徴**:
1. **統計機能**: 勝ち、負け、あいこの回数を記録
2. **状態管理**: グローバル変数 `wins`, `losses`, `draws` で管理
3. **リセット機能**: すべての統計と表示をクリア
4. **視覚的フィードバック**: 勝敗ごとに色が変わる

### 実用例3: 条件を整理したバージョン（完全版）

複雑な条件を変数に分けた、読みやすいコードです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>じゃんけんゲーム（条件整理版）</title>
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
      max-width: 600px;
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
      font-size: 14px;
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
      min-height: 200px;
    }

    .hands {
      font-size: 18px;
      color: #333;
      margin-bottom: 15px;
      line-height: 1.8;
    }

    .judgment {
      font-size: 14px;
      color: #666;
      margin: 15px 0;
      padding: 10px;
      background: white;
      border-radius: 8px;
      line-height: 1.6;
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
    <h1>✊✌️✋ じゃんけんゲーム</h1>
    <p class="description">条件を変数に分けた読みやすいコード</p>

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
      <div id="judgment" class="judgment"></div>
      <div id="result" class="result"></div>
    </div>
  </div>

  <script>
    function play(playerHand) {
      // コンピュータの手（固定）
      const computerHand = "グー";

      // 要素を取得
      const handsDiv = document.getElementById("hands");
      const judgmentDiv = document.getElementById("judgment");
      const resultDiv = document.getElementById("result");

      // 手を表示
      handsDiv.innerHTML =
        "あなた: " + playerHand + "<br>" +
        "コンピュータ: " + computerHand;

      // =======================================
      // 条件を変数に分ける（読みやすさ重視）
      // =======================================

      // あいこかどうか
      const isDraw = playerHand === computerHand;

      // プレイヤーの勝ちパターン（3つ）
      const playerWinsWithRock = playerHand === "グー" && computerHand === "チョキ";
      const playerWinsWithScissors = playerHand === "チョキ" && computerHand === "パー";
      const playerWinsWithPaper = playerHand === "パー" && computerHand === "グー";

      // 勝ちパターンのいずれか
      const playerWins = playerWinsWithRock || playerWinsWithScissors || playerWinsWithPaper;

      // =======================================
      // 判定結果を表示（条件が自然言語のように読める）
      // =======================================

      resultDiv.className = "result";
      resultDiv.textContent = "";
      judgmentDiv.textContent = "";

      if (isDraw) {
        judgmentDiv.textContent = "判定: 同じ手なので、あいこです。";
        resultDiv.textContent = "あいこ";
        resultDiv.className = "result draw";
      } else if (playerWins) {
        // 勝ち理由を表示
        if (playerWinsWithRock) {
          judgmentDiv.textContent = "判定: グーはチョキに勝ちます！";
        } else if (playerWinsWithScissors) {
          judgmentDiv.textContent = "判定: チョキはパーに勝ちます！";
        } else if (playerWinsWithPaper) {
          judgmentDiv.textContent = "判定: パーはグーに勝ちます！";
        }
        resultDiv.textContent = "あなたの勝ち！";
        resultDiv.className = "result win";
      } else {
        // 負け理由を表示
        if (playerHand === "グー") {
          judgmentDiv.textContent = "判定: グーはパーに負けます。";
        } else if (playerHand === "チョキ") {
          judgmentDiv.textContent = "判定: チョキはグーに負けます。";
        } else if (playerHand === "パー") {
          judgmentDiv.textContent = "判定: パーはチョキに負けます。";
        }
        resultDiv.textContent = "コンピュータの勝ち";
        resultDiv.className = "result lose";
      }
    }
  </script>
</body>
</html>
```

**このアプリの特徴**:
1. **条件を変数に分ける**: `isDraw`, `playerWins` など自然言語のように読める
2. **判定理由を表示**: なぜ勝ったか/負けたかを説明
3. **コメントが豊富**: コードの意図が明確
4. **教育的**: 初心者がロジックを理解しやすい

## 練習問題

### 練習問題1: 基本的なじゃんけん判定

以下の要件を満たすじゃんけん判定関数を作成してください。

**要件**:
- 関数名: `judge(playerHand, computerHand)`
- 引数: プレイヤーの手、コンピュータの手
- 戻り値: "勝ち"、"負け"、"あいこ"のいずれか
- あいこを先にチェック
- すべての勝ちパターンを実装

<details>
<summary>💡 ヒント1: 基本構造</summary>

```javascript
function judge(playerHand, computerHand) {
  // ステップ1: あいこ
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // ステップ2: 勝ちパターン
  // ...

  // ステップ3: それ以外は負け
  return "負け";
}
```

まずあいこをチェックして、早期リターンします。

</details>

<details>
<summary>💡 ヒント2: 勝ちパターン</summary>

```javascript
// 勝ちパターンは3つ
if (playerHand === "グー" && computerHand === "チョキ") {
  return "勝ち";
}
if (playerHand === "チョキ" && computerHand === "パー") {
  return "勝ち";
}
if (playerHand === "パー" && computerHand === "グー") {
  return "勝ち";
}
```

3つの勝ちパターンをすべて書きます。

</details>

<details>
<summary>✅ 解答例</summary>

```javascript
function judge(playerHand, computerHand) {
  // ステップ1: あいこチェック
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // ステップ2: 勝ちパターン（3つ）
  if (playerHand === "グー" && computerHand === "チョキ") {
    return "勝ち";
  }
  if (playerHand === "チョキ" && computerHand === "パー") {
    return "勝ち";
  }
  if (playerHand === "パー" && computerHand === "グー") {
    return "勝ち";
  }

  // ステップ3: それ以外は負け
  return "負け";
}

// テスト
console.log(judge("グー", "チョキ"));  // "勝ち"
console.log(judge("グー", "パー"));    // "負け"
console.log(judge("グー", "グー"));    // "あいこ"
```

</details>

### 練習問題2: 入力検証付きじゃんけん

以下の要件を満たすじゃんけんゲームを作成してください。

**要件**:
- input要素から手を入力
- 「グー」「チョキ」「パー」以外はエラー
- コンピュータの手は「グー」で固定
- 結果を表示

**HTML構成**:
```html
<input type="text" id="playerHand" placeholder="グー、チョキ、パー">
<button onclick="play()">じゃんけん！</button>
<div id="error"></div>
<div id="result"></div>
```

<details>
<summary>💡 ヒント: 入力検証</summary>

```javascript
function play() {
  const playerHand = document.getElementById("playerHand").value;

  // 入力検証（3つの条件をORでつなぐ）
  if (playerHand !== "グー" && playerHand !== "チョキ" && playerHand !== "パー") {
    error.textContent = "「グー」「チョキ」「パー」のいずれかを入力してください";
    return;  // ここで処理終了
  }

  // 勝敗判定
  // ...
}
```

</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>じゃんけん練習</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
    }

    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      font-size: 16px;
    }

    button {
      width: 100%;
      padding: 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }

    .error {
      color: #d32f2f;
      margin: 10px 0;
      padding: 10px;
      background: #ffebee;
      border-radius: 5px;
    }

    .result {
      padding: 15px;
      margin: 10px 0;
      border-radius: 5px;
      font-weight: bold;
    }

    .win {
      background: #c8e6c9;
      color: #2e7d32;
    }

    .lose {
      background: #ffcdd2;
      color: #c62828;
    }

    .draw {
      background: #fff9c4;
      color: #f57f17;
    }
  </style>
</head>
<body>
  <h1>じゃんけんゲーム</h1>
  <p>「グー」「チョキ」「パー」のいずれかを入力してください</p>
  <input type="text" id="playerHand" placeholder="例: グー">
  <button onclick="play()">じゃんけん！</button>
  <div id="error"></div>
  <div id="result"></div>

  <script>
    function play() {
      const playerHand = document.getElementById("playerHand").value;
      const computerHand = "グー";
      const errorDiv = document.getElementById("error");
      const resultDiv = document.getElementById("result");

      // 表示をクリア
      errorDiv.textContent = "";
      errorDiv.className = "";
      resultDiv.textContent = "";
      resultDiv.className = "result";

      // 入力検証
      if (playerHand !== "グー" && playerHand !== "チョキ" && playerHand !== "パー") {
        errorDiv.textContent = "「グー」「チョキ」「パー」のいずれかを入力してください";
        errorDiv.className = "error";
        return;
      }

      // 手を表示
      let message = "あなた: " + playerHand + " / コンピュータ: " + computerHand + "\n\n";

      // 勝敗判定
      if (playerHand === computerHand) {
        message = message + "あいこです";
        resultDiv.className = "result draw";
      } else if (
        (playerHand === "グー" && computerHand === "チョキ") ||
        (playerHand === "チョキ" && computerHand === "パー") ||
        (playerHand === "パー" && computerHand === "グー")
      ) {
        message = message + "あなたの勝ちです！";
        resultDiv.className = "result win";
      } else {
        message = message + "コンピュータの勝ちです";
        resultDiv.className = "result lose";
      }

      resultDiv.textContent = message;
    }
  </script>
</body>
</html>
```

</details>

### 練習問題3: 勝敗カウント機能（発展）

以下の要件を満たすじゃんけんゲームを作成してください。

**要件**:
- ボタンで手を選択（グー、チョキ、パー）
- 勝ち、負け、あいこの回数を記録
- 統計を表示
- リセットボタン

<details>
<summary>💡 ヒント: グローバル変数</summary>

```javascript
// グローバル変数で統計を管理
let wins = 0;
let losses = 0;
let draws = 0;

function play(playerHand) {
  // 勝敗判定
  if (playerHand === computerHand) {
    draws = draws + 1;  // あいこカウント増加
  } else if (/* 勝ち条件 */) {
    wins = wins + 1;    // 勝ちカウント増加
  } else {
    losses = losses + 1;  // 負けカウント増加
  }

  // 統計を更新
  updateStats();
}

function updateStats() {
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
  document.getElementById("draws").textContent = draws;
}
```

</details>

<details>
<summary>✅ 解答例</summary>

実用例2（勝敗カウント付きじゃんけん）を参照してください。

</details>

## デバッグのヒント

### 1. 勝敗が逆になる

**原因**: 条件の論理が逆

```javascript
// ❌ 問題のあるコード
if (playerHand === "グー" && computerHand === "パー") {
  return "勝ち";  // 逆！グーはパーに負ける
}
```

**解決方法**: じゃんけんのルールを再確認

```javascript
// ✅ 修正版
// グー → チョキに勝つ
// チョキ → パーに勝つ
// パー → グーに勝つ

if (playerHand === "グー" && computerHand === "チョキ") {
  return "勝ち";
}
```

### 2. あいこが判定されない

**原因**: あいこのチェックを忘れている

```javascript
// ❌ 問題のあるコード
function judge(playerHand, computerHand) {
  // あいこのチェックがない
  if (playerHand === "グー" && computerHand === "チョキ") {
    return "勝ち";
  }
  // ...
}
```

**解決方法**: 最初にあいこをチェック

```javascript
// ✅ 修正版
function judge(playerHand, computerHand) {
  // まずあいこをチェック
  if (playerHand === computerHand) {
    return "あいこ";
  }

  // 勝敗判定
  // ...
}
```

### 3. 一部のパターンで判定が間違う

**原因**: 勝ちパターンが不完全

```javascript
// ❌ 問題のあるコード（グーの勝ちしかない）
if (playerHand === "グー" && computerHand === "チョキ") {
  return "勝ち";
}
return "負け";  // チョキやパーで勝つ場合も「負け」になる
```

**解決方法**: すべての勝ちパターンを書く

```javascript
// ✅ 修正版（3つの勝ちパターン）
if (playerHand === "グー" && computerHand === "チョキ") {
  return "勝ち";
}
if (playerHand === "チョキ" && computerHand === "パー") {
  return "勝ち";
}
if (playerHand === "パー" && computerHand === "グー") {
  return "勝ち";
}
return "負け";
```

### 4. コンソールでテストする

```javascript
function judge(playerHand, computerHand) {
  // デバッグ用にコンソール出力
  console.log("プレイヤー:", playerHand);
  console.log("コンピュータ:", computerHand);

  if (playerHand === computerHand) {
    console.log("判定: あいこ");
    return "あいこ";
  }

  if (playerHand === "グー" && computerHand === "チョキ") {
    console.log("判定: プレイヤーの勝ち（グー > チョキ）");
    return "勝ち";
  }
  // ...
}

// すべてのパターンをテスト
console.log("=== テスト開始 ===");
console.log(judge("グー", "グー"));    // あいこ
console.log(judge("グー", "チョキ"));  // 勝ち
console.log(judge("グー", "パー"));    // 負け
// ... 9パターンすべてテスト
```

### 5. 表が正しいか確認

9パターンすべてをテストして、結果が正しいか確認しましょう。

| あなた | 相手 | 期待結果 | 実際の結果 | OK? |
|--------|------|----------|------------|-----|
| グー | グー | あいこ | あいこ | ✓ |
| グー | チョキ | 勝ち | 勝ち | ✓ |
| グー | パー | 負け | 負け | ✓ |
| チョキ | グー | 負け | 負け | ✓ |
| チョキ | チョキ | あいこ | あいこ | ✓ |
| チョキ | パー | 勝ち | 勝ち | ✓ |
| パー | グー | 勝ち | 勝ち | ✓ |
| パー | チョキ | 負け | 負け | ✓ |
| パー | パー | あいこ | あいこ | ✓ |

## チェックリスト

じゃんけんゲームを作成する際の確認項目です。

- [ ] **あいこをチェックしている**
  - 同じ手の場合の処理がある

- [ ] **すべての勝ちパターンを実装している**
  - グー → チョキ
  - チョキ → パー
  - パー → グー

- [ ] **負けの場合も正しく判定**
  - 勝ちとあいこ以外は負け

- [ ] **入力検証を実装（input使用時）**
  - 「グー」「チョキ」「パー」以外を弾く
  - エラーメッセージを表示

- [ ] **結果を分かりやすく表示**
  - どの手を出したか表示
  - 勝敗が明確

- [ ] **9パターンすべてテスト済み**
  - すべての組み合わせで正しく動作

- [ ] **結果をクリアしている**
  - 新しくプレイする前に前回の結果を消す

- [ ] **コードが読みやすい**
  - 適切なコメント
  - 条件が複雑なら変数に分ける

- [ ] **統計機能（オプション）**
  - 勝ち、負け、あいこの回数を記録

- [ ] **リセット機能（オプション）**
  - 統計と表示をすべてクリア

## ポイント

### 1. じゃんけんは3すくみのゲーム

```
グー → チョキに勝つ
チョキ → パーに勝つ
パー → グーに勝つ
```

この関係を正しく実装することが重要です。

### 2. あいこを先にチェック

```javascript
// あいこは最も簡単な条件
if (playerHand === computerHand) {
  return "あいこ";
}
```

早期リターンで処理を終了し、後続の条件を簡潔にします。

### 3. すべてのパターンを考える

じゃんけんには9通りのパターンがあります:
- あいこ: 3パターン
- 勝ち: 3パターン
- 負け: 3パターン

すべてのパターンで正しく動作するかテストしましょう。

### 4. 入力検証は必須（input使用時）

```javascript
if (playerHand !== "グー" && playerHand !== "チョキ" && playerHand !== "パー") {
  error.textContent = "正しい手を入力してください";
  return;
}
```

不正な入力で勝敗判定が実行されないようにします。

### 5. ボタンUIがおすすめ

```html
<button onclick="play('グー')">グー ✊</button>
<button onclick="play('チョキ')">チョキ ✌️</button>
<button onclick="play('パー')">パー ✋</button>
```

- 入力検証が不要
- タップしやすい
- 絵文字で視覚的に分かりやすい

### 6. 条件を変数に分ける

```javascript
const isDraw = playerHand === computerHand;
const playerWins =
  (playerHand === "グー" && computerHand === "チョキ") ||
  (playerHand === "チョキ" && computerHand === "パー") ||
  (playerHand === "パー" && computerHand === "グー");

if (isDraw) {
  // ...
} else if (playerWins) {
  // ...
}
```

複雑な条件も読みやすくなります。

### 7. 統計機能で状態管理を学ぶ

```javascript
let wins = 0;
let losses = 0;
let draws = 0;

function play(playerHand) {
  // 勝敗判定
  if (/* あいこ */) {
    draws = draws + 1;
  } else if (/* 勝ち */) {
    wins = wins + 1;
  } else {
    losses = losses + 1;
  }

  updateStats();
}
```

グローバル変数で状態を管理します。

### 8. 視覚的フィードバック

```javascript
if (playerWins) {
  resultDiv.textContent = "あなたの勝ち！";
  resultDiv.className = "result win";  // 緑色
} else {
  resultDiv.textContent = "コンピュータの勝ち";
  resultDiv.className = "result lose";  // 赤色
}
```

色や記号で結果を分かりやすく表示します。

## できるようになったこと

このレッスンを完了すると、以下のことができるようになります。

1. **3つの選択肢を扱う**
   - グー、チョキ、パーの実装
   - 複数の選択肢の管理

2. **勝敗判定ロジックを作る**
   - あいこのチェック
   - 3つの勝ちパターンの実装
   - 負けの判定

3. **複雑な条件を組み合わせる**
   - AND演算子（`&&`）の活用
   - OR演算子（`||`）の活用
   - 条件を変数に分ける

4. **入力検証を実装する**
   - 正しい手かどうかのチェック
   - エラーメッセージの表示

5. **結果を分かりやすく表示する**
   - 手と勝敗の表示
   - 色分けによる視覚的フィードバック

6. **状態管理を実装する**
   - グローバル変数での統計管理
   - 勝ち、負け、あいこの回数記録

7. **ボタンUIを作る**
   - 引数付き関数の呼び出し
   - ユーザーフレンドリーなUI

8. **ゲームロジックを理解する**
   - 3すくみの関係
   - すべてのパターンの網羅

## まとめ

### じゃんけんゲームの基本構造

じゃんけんゲームは3つのステップで構成されます:
1. **あいこをチェック**: 同じ手なら終了
2. **勝ちをチェック**: 3つの勝ちパターン
3. **負けを判定**: それ以外は負け

### 実装のパターン

**パターン1: すべての勝ち条件を書く（推奨）**
```javascript
if (playerHand === computerHand) return "あいこ";
if (playerHand === "グー" && computerHand === "チョキ") return "勝ち";
if (playerHand === "チョキ" && computerHand === "パー") return "勝ち";
if (playerHand === "パー" && computerHand === "グー") return "勝ち";
return "負け";
```

**パターン2: OR演算子でまとめる**
```javascript
if (playerHand === computerHand) return "あいこ";
if (
  (playerHand === "グー" && computerHand === "チョキ") ||
  (playerHand === "チョキ" && computerHand === "パー") ||
  (playerHand === "パー" && computerHand === "グー")
) return "勝ち";
return "負け";
```

**パターン3: 条件を変数に分ける（読みやすさ重視）**
```javascript
const isDraw = playerHand === computerHand;
const playerWins = /* 勝ち条件 */;
if (isDraw) return "あいこ";
if (playerWins) return "勝ち";
return "負け";
```

### 重要なポイント

- **9パターンすべてをカバー**: 3×3=9通りの組み合わせ
- **あいこを先にチェック**: 最も簡単な条件から
- **入力検証**: 不正な入力を弾く
- **視覚的フィードバック**: 色や記号で結果を明確に
- **ボタンUI**: 入力ミスを防ぐ
- **統計機能**: 状態管理の練習

### このレッスンで学んだこと

- じゃんけんの3すくみの関係
- 複数の条件を組み合わせた勝敗判定
- あいこ、勝ち、負けの3つの結果
- 入力検証とエラー処理
- 条件を変数に分ける読みやすいコード
- グローバル変数による状態管理
- ボタンUIの実装

じゃんけんゲームは、複雑な条件分岐を学ぶ最良の教材です。9つのパターンすべてで正しく動作することを確認しましょう！

## 次のステップ

次のレッスンでは、**おみくじアプリ**を作成します。

おみくじアプリでは:
- `Math.random()` でランダムな数を生成
- コンピュータの手をランダムにする
- より実践的なじゃんけんゲーム

じゃんけんゲームの知識を活かして、ランダム性のあるアプリを作りましょう！
