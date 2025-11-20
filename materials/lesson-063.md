---
title: "Lesson 063: 週の総合プロジェクト - RPG風バトルゲーム"
author: "JavaScript学習教材"
date: "2025-11-20"
---

## 今回の学習

### 前回の復習

前回のレッスンでは、条件分岐のリファクタリングについて学びました。重複コードをDRY原則に従って削除し、条件を整理して、関数化によって再利用性を高める方法を習得しました。コードの可読性と保守性を向上させる重要な技術を学びました。

### 今回の目標

今回のレッスンは、**週の総合プロジェクト**です。これまで学んできた知識を統合して、RPG風のバトルゲームを作成します。変数、条件分岐、関数、DOM操作、ランダム要素など、さまざまな技術を組み合わせて、実践的なゲームを完成させましょう。

今回のレッスンで習得する内容は以下の通りです。

- RPG風バトルシステムの構築
- HP判定とゲームオーバー処理
- ダメージ計算とランダム要素の活用

## プロジェクトの概要

今回作成するのは、シンプルなRPG風バトルゲームです。プレイヤーと敵が戦い、どちらかのHPが0になるまで戦闘を続けます。

### ゲームの仕様

- **プレイヤー**: HP 100、攻撃力 15-25のランダムダメージ
- **敵**: HP 80、攻撃力 10-20のランダムダメージ
- **アクション**:
  - 攻撃: 敵にダメージを与え、その後敵が反撃する
  - 回復: 20-30のランダムな回復を得る（敵は反撃する）
- **勝敗判定**: どちらかのHPが0以下になったらゲーム終了

### ゲームの流れ

1. プレイヤーが「攻撃」または「回復」を選択
2. 選択したアクションを実行
3. 敵が反撃（プレイヤーのHPが0以下でない場合）
4. 両者のHPと戦闘ログを表示
5. どちらかのHPが0以下になったら勝敗を表示

## 必要な機能の整理

ゲームを作る前に、必要な機能を整理しましょう。

### 1. 状態管理

ゲームの状態を表す変数が必要です。

- プレイヤーのHP
- 敵のHP
- ゲーム終了フラグ

### 2. ダメージ計算

ランダムな範囲でダメージを計算する関数が必要です。

```javascript
function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

`Math.random()`は0以上1未満の小数を返します。これを利用して、指定範囲のランダムな整数を生成します。

### 3. HP判定

HPが0以下になったかをチェックする必要があります。

```javascript
function checkGameOver() {
  if (playerHP <= 0) {
    return "敵の勝利";
  }
  if (enemyHP <= 0) {
    return "プレイヤーの勝利";
  }
  return null; // ゲーム続行
}
```

### 4. 表示更新

HPや戦闘ログを画面に表示する関数が必要です。

```javascript
function updateDisplay() {
  document.getElementById("playerHP").textContent = "HP: " + playerHP;
  document.getElementById("enemyHP").textContent = "HP: " + enemyHP;
}
```

## ステップ1: 基本構造を作る

まず、ゲームの基本構造を作りましょう。

```javascript
// ゲームの状態
let playerHP = 100;
let enemyHP = 80;
let isGameOver = false;

// ダメージ計算
function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 表示を更新
function updateDisplay() {
  document.getElementById("playerHP").textContent = "HP: " + playerHP;
  document.getElementById("enemyHP").textContent = "HP: " + enemyHP;
}

// 初期表示
updateDisplay();
```

このコードで、ゲームの基本的な状態管理とダメージ計算の準備ができました。

## ステップ2: 攻撃機能を実装する

次に、プレイヤーの攻撃機能を実装します。

```javascript
function playerAttack() {
  // ゲーム終了チェック
  if (isGameOver) {
    return;
  }

  // プレイヤーの攻撃
  let damage = getRandomDamage(15, 25);
  enemyHP = enemyHP - damage;

  let log = "プレイヤーの攻撃！ " + damage + "ダメージ！\n";
  document.getElementById("battleLog").textContent = log;

  // HP表示を更新
  updateDisplay();

  // ゲーム終了チェック
  if (enemyHP <= 0) {
    isGameOver = true;
    document.getElementById("result").textContent = "勝利！敵を倒しました！";
    return;
  }

  // 敵の反撃
  enemyAttack();
}
```

この関数では、以下の処理を行っています。

1. **ゲーム終了チェック**: すでにゲームが終了していたら、何もしない
2. **ダメージ計算**: 15-25のランダムダメージを計算
3. **敵のHPを減らす**: 計算したダメージ分、敵のHPを減少
4. **ログ表示**: 攻撃内容をログに表示
5. **HP更新**: 画面のHP表示を更新
6. **勝敗判定**: 敵のHPが0以下なら勝利メッセージを表示
7. **敵の反撃**: 敵がまだ生きていれば反撃

## ステップ3: 敵の反撃を実装する

敵の反撃機能を実装します。

```javascript
function enemyAttack() {
  // 敵の攻撃
  let damage = getRandomDamage(10, 20);
  playerHP = playerHP - damage;

  let log = document.getElementById("battleLog").textContent;
  log = log + "敵の反撃！ " + damage + "ダメージを受けた！\n";
  document.getElementById("battleLog").textContent = log;

  // HP表示を更新
  updateDisplay();

  // ゲーム終了チェック
  if (playerHP <= 0) {
    isGameOver = true;
    document.getElementById("result").textContent = "敗北...やられてしまった";
  }
}
```

敵の反撃は、プレイヤーの攻撃と同様の流れです。ダメージを与え、HPを減らし、ログを更新し、勝敗を判定します。

## ステップ4: 回復機能を実装する

プレイヤーの回復機能を追加します。

```javascript
function playerHeal() {
  // ゲーム終了チェック
  if (isGameOver) {
    return;
  }

  // 回復量を計算
  let heal = getRandomDamage(20, 30);
  playerHP = playerHP + heal;

  // HPの上限チェック（100を超えないように）
  if (playerHP > 100) {
    playerHP = 100;
  }

  let log = "回復した！ " + heal + "HP回復！\n";
  document.getElementById("battleLog").textContent = log;

  // HP表示を更新
  updateDisplay();

  // 敵の反撃
  enemyAttack();
}
```

回復機能では、20-30のランダムな回復量を得られます。ただし、HPは最大100までなので、超えないようにチェックしています。回復後も敵は反撃してきます。

## ステップ5: ゲームリセット機能

ゲームをやり直せるように、リセット機能を追加します。

```javascript
function resetGame() {
  // 状態を初期化
  playerHP = 100;
  enemyHP = 80;
  isGameOver = false;

  // 表示をクリア
  document.getElementById("battleLog").textContent = "";
  document.getElementById("result").textContent = "";

  // HP表示を更新
  updateDisplay();
}
```

この関数で、すべての状態を初期値に戻し、ログと結果をクリアします。

## 完成版のコード

すべてを組み合わせた完成版のコードです。

**HTML部分:**

```html
<h1>RPGバトル</h1>
<div>
  <h2>プレイヤー</h2>
  <p id="playerHP">HP: 100</p>
</div>
<div>
  <h2>敵</h2>
  <p id="enemyHP">HP: 80</p>
</div>
<div>
  <button onclick="playerAttack()">攻撃</button>
  <button onclick="playerHeal()">回復</button>
  <button onclick="resetGame()">リセット</button>
</div>
<div>
  <h3>戦闘ログ</h3>
  <p id="battleLog"></p>
</div>
<div>
  <h3 id="result"></h3>
</div>
```

**JavaScript部分:**

```javascript
// ゲームの状態
let playerHP = 100;
let enemyHP = 80;
let isGameOver = false;

// ダメージ計算
function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 表示を更新
function updateDisplay() {
  document.getElementById("playerHP").textContent = "HP: " + playerHP;
  document.getElementById("enemyHP").textContent = "HP: " + enemyHP;
}

// プレイヤーの攻撃
function playerAttack() {
  if (isGameOver) {
    return;
  }

  let damage = getRandomDamage(15, 25);
  enemyHP = enemyHP - damage;

  let log = "プレイヤーの攻撃！ " + damage + "ダメージ！\n";
  document.getElementById("battleLog").textContent = log;

  updateDisplay();

  if (enemyHP <= 0) {
    isGameOver = true;
    document.getElementById("result").textContent = "勝利！敵を倒しました！";
    return;
  }

  enemyAttack();
}

// 敵の反撃
function enemyAttack() {
  let damage = getRandomDamage(10, 20);
  playerHP = playerHP - damage;

  let log = document.getElementById("battleLog").textContent;
  log = log + "敵の反撃！ " + damage + "ダメージを受けた！\n";
  document.getElementById("battleLog").textContent = log;

  updateDisplay();

  if (playerHP <= 0) {
    isGameOver = true;
    document.getElementById("result").textContent = "敗北...やられてしまった";
  }
}

// 回復
function playerHeal() {
  if (isGameOver) {
    return;
  }

  let heal = getRandomDamage(20, 30);
  playerHP = playerHP + heal;

  if (playerHP > 100) {
    playerHP = 100;
  }

  let log = "回復した！ " + heal + "HP回復！\n";
  document.getElementById("battleLog").textContent = log;

  updateDisplay();

  enemyAttack();
}

// ゲームリセット
function resetGame() {
  playerHP = 100;
  enemyHP = 80;
  isGameOver = false;

  document.getElementById("battleLog").textContent = "";
  document.getElementById("result").textContent = "";

  updateDisplay();
}

// 初期表示
updateDisplay();
```

## ゲームの動作確認

作成したゲームを実際にプレイしてみましょう。

1. **攻撃ボタン**: プレイヤーが攻撃し、敵が反撃します。両者のHPが減少します
2. **回復ボタン**: プレイヤーのHPが回復しますが、敵は反撃してきます
3. **リセットボタン**: ゲームを最初からやり直します

戦略的に攻撃と回復を使い分けて、敵を倒しましょう。

## これまでの学習内容の活用

このゲームでは、これまで学んだ多くの技術を使っています。

### 1. 変数とデータ管理

プレイヤーと敵のHPを変数で管理しています。ゲームの状態を表すフラグ変数（`isGameOver`）も使用しています。

### 2. 関数

各機能を関数にまとめることで、コードを整理し、再利用可能にしています。

- `getRandomDamage()`: ダメージ計算
- `updateDisplay()`: 表示更新
- `playerAttack()`: プレイヤーの攻撃
- `enemyAttack()`: 敵の反撃
- `playerHeal()`: 回復
- `resetGame()`: リセット

### 3. 条件分岐

HP判定、ゲーム終了チェック、回復の上限チェックなど、さまざまな場面で条件分岐を使用しています。

### 4. 早期リターン

ゲームが終了している場合、早期に関数から抜けることで、無駄な処理を避けています。

```javascript
if (isGameOver) {
  return;
}
```

### 5. DOM操作

`getElementById()`や`textContent`を使って、画面の表示を動的に更新しています。

### 6. ランダム要素

`Math.random()`を使って、ダメージや回復量にランダム性を持たせています。これにより、毎回異なる戦闘が楽しめます。

## 練習問題

### 課題

RPG風のバトルゲームを作成しましょう。プレイヤーと敵が戦い、攻撃、回復、リセットの機能を実装します。

### 保存場所

`exercises/lesson-063/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. RPG風バトルシステムを構築する
2. HP判定とゲームオーバー処理を実装する
3. ダメージ計算とランダム要素を活用する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-063
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

- グローバル変数で`playerHP`、`enemyHP`、`isGameOver`を管理します
- `getRandomDamage(min, max)`関数で、指定範囲のランダムダメージを計算します
- `updateDisplay()`関数で、HPの表示を更新します
- `playerAttack()`関数で、プレイヤーの攻撃を実装します（敵のHPを減らし、敵が反撃）
- `enemyAttack()`関数で、敵の反撃を実装します（プレイヤーのHPを減らす）
- `playerHeal()`関数で、回復を実装します（HPを回復し、敵が反撃）
- `resetGame()`関数で、ゲームを初期状態に戻します
- 各アクションの後、HPが0以下になっていないかチェックします

### 解答例

解答例は、教材に記載した完成版のコードを参照してください。

### 解説

このゲームは、これまで学んだ知識を総合的に活用しています。

1. **状態管理**: グローバル変数でゲームの状態（HP、ゲーム終了フラグ）を管理しています

2. **関数化**: 各機能を関数にまとめることで、コードが整理され、保守しやすくなっています

3. **条件分岐**: HP判定、ゲーム終了チェック、回復上限チェックなど、さまざまな条件分岐を使用しています

4. **早期リターン**: ゲーム終了時に処理を中断することで、不要な処理を避けています

5. **ランダム要素**: `Math.random()`を使うことで、毎回異なる戦闘を実現しています

6. **ユーザー体験**: 戦闘ログを表示することで、何が起こったのかを分かりやすくしています

このゲームを基に、さらに機能を追加することもできます。例えば、以下のような拡張が考えられます。

- 複数の敵キャラクター
- 特殊攻撃の追加
- アイテムシステム
- 経験値とレベルアップ
- 複数のステージ

プログラミングの楽しさは、こうして少しずつ機能を追加していくことで、より面白いものを作っていけることです。

## まとめ

お疲れ様でした。今回のレッスンでは、RPG風バトルゲームを作成しました。

**今回のキーポイント:**

- **RPG風バトルシステム**: プレイヤーと敵のHP管理、攻撃と回復の実装、ターン制の戦闘システムを構築しました。ゲームの状態を変数で管理し、各アクションを関数にまとめることで、整理されたコードを実現しました

- **HP判定**: 条件分岐を使って、HPが0以下になったかをチェックし、勝敗を判定しました。`isGameOver`フラグを使うことで、ゲーム終了後の不要な処理を防ぎました。早期リターンを活用することで、コードの可読性も向上しました

- **ダメージ計算**: `Math.random()`を使って、指定範囲のランダムなダメージを生成しました。これにより、毎回異なる戦闘が楽しめるゲームになりました。ランダム要素は、ゲームに予測不可能性と面白さをもたらします

このプロジェクトでは、変数、条件分岐、関数、DOM操作、ランダム要素など、これまで学んだすべての知識を統合して使いました。小さな機能を組み合わせることで、本格的なゲームを作ることができることを体験しました。

次の章では、より高度なイベント処理について学びます。ボタンクリック以外のさまざまなイベントを扱えるようになり、より豊かなユーザーインタラクションを実現していきましょう。
