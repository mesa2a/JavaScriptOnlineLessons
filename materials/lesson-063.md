---
title: "Lesson 063: 週の総合プロジェクト - RPG風バトルゲーム"
author: "JavaScript学習教材"
date: "2025-11-26"
---

## 今回の学習

### 前回の復習

前回のレッスンでは、条件分岐のリファクタリングについて学びました。重複コードをDRY原則に従って削除し、条件を整理して、関数化によって再利用性を高める方法を習得しました。コードの可読性と保守性を向上させる重要な技術を学びました。

これまでに学んできた技術は以下の通りです。

- **変数とデータ型**: 数値、文字列、真偽値などのデータを管理する方法
- **条件分岐**: if文、else文を使った処理の分岐
- **関数**: 処理をまとめて再利用可能にする仕組み
- **DOM操作**: HTML要素の取得、内容の変更、スタイルの適用
- **イベント処理**: ボタンクリックなどのユーザーアクションへの対応
- **早期リターン**: 条件に応じて処理を中断する手法
- **DRY原則**: 重複を避け、コードを整理する考え方

これらの技術を組み合わせることで、実用的なアプリケーションを作ることができます。

### 今回の目標

今回のレッスンは、**週の総合プロジェクト**です。これまで学んできた知識を統合して、RPG風のバトルゲームを作成します。変数、条件分岐、関数、DOM操作、ランダム要素など、さまざまな技術を組み合わせて、実践的なゲームを完成させましょう。

今回のレッスンで習得する内容は以下の通りです。

- **RPG風バトルシステムの構築**: プレイヤーと敵のHP管理、攻撃・回復システム、ターン制の戦闘を実装します
- **HP判定とゲームオーバー処理**: HPが0以下になったかを判定し、勝敗を決定する仕組みを学びます
- **ダメージ計算とランダム要素の活用**: Math.random()を使って、予測不可能な戦闘を実現します

### このレッスンの重要性

ゲーム開発は、プログラミングの基礎を総合的に学ぶのに最適な題材です。状態管理、条件分岐、イベント処理、ユーザーインターフェースなど、さまざまな要素が絡み合います。

単純な計算やデータ表示だけでなく、ユーザーとのインタラクティブなやり取りを通じて、プログラミングの楽しさを実感できます。また、ゲームのロジックを考えることで、問題解決能力も向上します。

## 実世界での活用例

RPG風バトルゲームで学ぶ技術は、実際の開発現場でどのように使われているのでしょうか。

### 例1: オンラインゲーム企業のバトルシステム（株式会社Cygames）

Cygamesは、グランブルーファンタジーなどの人気ゲームを開発しています。

```javascript
// バトルシステムの基本構造
let player = {
  name: "主人公",
  hp: 1000,
  maxHP: 1000,
  attack: 150,
  defense: 80,
  isAlive: true
};

let enemy = {
  name: "ボス",
  hp: 3000,
  maxHP: 3000,
  attack: 120,
  defense: 60,
  isAlive: true
};

function calculateDamage(attacker, defender) {
  let baseDamage = attacker.attack - defender.defense;
  let randomFactor = Math.random() * 0.2 + 0.9; // 0.9-1.1倍
  let finalDamage = Math.floor(baseDamage * randomFactor);

  if (finalDamage < 1) {
    finalDamage = 1; // 最低1ダメージ
  }

  return finalDamage;
}

function executeAttack(attacker, defender) {
  if (!attacker.isAlive || !defender.isAlive) {
    return;
  }

  let damage = calculateDamage(attacker, defender);
  defender.hp = defender.hp - damage;

  console.log(attacker.name + "の攻撃！ " + damage + "ダメージ！");

  if (defender.hp <= 0) {
    defender.hp = 0;
    defender.isAlive = false;
    console.log(defender.name + "は倒れた！");
  }
}
```

この例では、攻撃力と防御力を考慮したダメージ計算を実装しています。ランダム要素を加えることで、同じ攻撃でも毎回異なるダメージになります。

実際のゲームでは、さらに以下のような要素が追加されます。

- **属性相性**: 火属性は木属性に強い、など
- **クリティカルヒット**: 低確率で大ダメージ
- **状態異常**: 毒、麻痺、睡眠など
- **スキル**: 通常攻撃以外の特殊技
- **バフ・デバフ**: 能力値の一時的な変化

### 例2: eラーニングプラットフォームのゲーミフィケーション（株式会社Progate）

Progateは、プログラミング学習サービスを提供しています。学習の進捗をゲーム的な要素で管理しています。

```javascript
// 学習進捗管理システム
let learningProgress = {
  currentLevel: 1,
  experience: 0,
  maxExperience: 100,
  totalExperience: 0,
  achievements: []
};

function completeLesson(lessonDifficulty) {
  let experienceGained = lessonDifficulty * 10;
  learningProgress.experience = learningProgress.experience + experienceGained;
  learningProgress.totalExperience = learningProgress.totalExperience + experienceGained;

  console.log(experienceGained + " EXPを獲得！");

  // レベルアップチェック
  while (learningProgress.experience >= learningProgress.maxExperience) {
    levelUp();
  }

  updateDisplay();
}

function levelUp() {
  learningProgress.experience = learningProgress.experience - learningProgress.maxExperience;
  learningProgress.currentLevel = learningProgress.currentLevel + 1;
  learningProgress.maxExperience = Math.floor(learningProgress.maxExperience * 1.5);

  console.log("レベルアップ！ レベル" + learningProgress.currentLevel + "になった！");

  // 称号チェック
  checkAchievements();
}

function checkAchievements() {
  if (learningProgress.currentLevel === 5 &&
      !learningProgress.achievements.includes("初心者卒業")) {
    learningProgress.achievements.push("初心者卒業");
    console.log("称号を獲得: 初心者卒業");
  }

  if (learningProgress.totalExperience >= 1000 &&
      !learningProgress.achievements.includes("継続は力なり")) {
    learningProgress.achievements.push("継続は力なり");
    console.log("称号を獲得: 継続は力なり");
  }
}

function updateDisplay() {
  document.getElementById("level").textContent = "レベル " + learningProgress.currentLevel;
  document.getElementById("exp").textContent = learningProgress.experience + " / " +
                                                learningProgress.maxExperience + " EXP";

  let progress = (learningProgress.experience / learningProgress.maxExperience) * 100;
  document.getElementById("expBar").style.width = progress + "%";
}
```

この例では、RPGの経験値システムを学習進捗の管理に応用しています。レッスンを完了するたびに経験値を獲得し、一定値に達するとレベルアップします。

ゲーミフィケーションの要素は、ユーザーのモチベーション維持に効果的です。

- **視覚的フィードバック**: プログレスバーで進捗を可視化
- **達成感**: レベルアップや称号獲得
- **目標設定**: 次のレベルまでの明確な指標

### 例3: ヘルスケアアプリの目標管理（FiNC Technologies）

FiNCは、健康管理アプリを提供しています。日々の活動をポイント化し、ゲーム感覚で健康習慣を促進します。

```javascript
// 健康管理システム
let healthStatus = {
  hp: 100,
  maxHP: 100,
  stamina: 50,
  maxStamina: 100,
  lastUpdate: new Date()
};

let dailyActivities = {
  steps: 0,
  targetSteps: 10000,
  waterIntake: 0,
  targetWater: 2000, // ml
  sleepHours: 0,
  targetSleep: 8
};

function recordSteps(steps) {
  dailyActivities.steps = dailyActivities.steps + steps;

  // 目標達成でHP回復
  if (dailyActivities.steps >= dailyActivities.targetSteps) {
    recoverHP(10);
    console.log("目標歩数達成！ HPが回復しました");
  }

  updateHealthDisplay();
}

function recordWaterIntake(amount) {
  dailyActivities.waterIntake = dailyActivities.waterIntake + amount;

  if (dailyActivities.waterIntake >= dailyActivities.targetWater) {
    recoverStamina(20);
    console.log("水分補給目標達成！ スタミナが回復しました");
  }

  updateHealthDisplay();
}

function recordSleep(hours) {
  dailyActivities.sleepHours = hours;

  if (hours >= dailyActivities.targetSleep) {
    recoverHP(20);
    recoverStamina(50);
    console.log("十分な睡眠で完全回復！");
  } else {
    let damage = (dailyActivities.targetSleep - hours) * 5;
    damageHP(damage);
    console.log("睡眠不足で" + damage + "ダメージ");
  }

  updateHealthDisplay();
}

function recoverHP(amount) {
  healthStatus.hp = healthStatus.hp + amount;
  if (healthStatus.hp > healthStatus.maxHP) {
    healthStatus.hp = healthStatus.maxHP;
  }
}

function recoverStamina(amount) {
  healthStatus.stamina = healthStatus.stamina + amount;
  if (healthStatus.stamina > healthStatus.maxStamina) {
    healthStatus.stamina = healthStatus.maxStamina;
  }
}

function damageHP(amount) {
  healthStatus.hp = healthStatus.hp - amount;
  if (healthStatus.hp < 0) {
    healthStatus.hp = 0;
    console.log("警告: 健康状態が悪化しています！");
  }
}

function updateHealthDisplay() {
  let hpPercent = (healthStatus.hp / healthStatus.maxHP) * 100;
  let staminaPercent = (healthStatus.stamina / healthStatus.maxStamina) * 100;

  document.getElementById("hpBar").style.width = hpPercent + "%";
  document.getElementById("staminaBar").style.width = staminaPercent + "%";

  document.getElementById("hpValue").textContent = healthStatus.hp + " / " + healthStatus.maxHP;
  document.getElementById("staminaValue").textContent = healthStatus.stamina + " / " + healthStatus.maxStamina;

  // 警告表示
  if (healthStatus.hp < 30) {
    document.getElementById("hpBar").style.backgroundColor = "red";
    document.getElementById("warning").textContent = "健康状態に注意してください！";
  } else {
    document.getElementById("hpBar").style.backgroundColor = "green";
    document.getElementById("warning").textContent = "";
  }
}
```

この例では、RPGのHP・スタミナシステムを健康管理に応用しています。運動や睡眠などの健康的な行動でHPが回復し、不健康な生活でダメージを受けます。

ゲーム的な表現を使うことで、健康管理という抽象的な概念を分かりやすく視覚化しています。

### 例4: フィットネスアプリのトレーニングバトル（株式会社RIZAP）

RIZAPは、パーソナルトレーニングサービスを提供しています。トレーニングをバトルに見立てたモチベーション管理システムがあります。

```javascript
// トレーニングバトルシステム
let trainer = {
  name: "自分",
  level: 1,
  currentWeight: 75.0,
  targetWeight: 65.0,
  strength: 10,
  endurance: 10
};

let challenge = {
  name: "30日チャレンジ",
  difficulty: 5,
  daysCompleted: 0,
  totalDays: 30,
  isActive: true
};

function completeWorkout(workoutType, intensity) {
  if (!challenge.isActive) {
    console.log("チャレンジが終了しています");
    return;
  }

  let damageToChallenge = calculateWorkoutDamage(workoutType, intensity);
  challenge.daysCompleted = challenge.daysCompleted + 1;

  console.log(workoutType + "を完了！ " + damageToChallenge + "ポイント獲得！");

  // ステータス上昇
  if (workoutType === "筋トレ") {
    trainer.strength = trainer.strength + 1;
    console.log("筋力が" + trainer.strength + "に上昇！");
  } else if (workoutType === "有酸素運動") {
    trainer.endurance = trainer.endurance + 1;
    console.log("持久力が" + trainer.endurance + "に上昇！");
  }

  // 体重変化
  let weightLoss = intensity * 0.1;
  trainer.currentWeight = trainer.currentWeight - weightLoss;
  console.log("体重: " + trainer.currentWeight.toFixed(1) + "kg");

  // チャレンジ達成チェック
  if (challenge.daysCompleted >= challenge.totalDays) {
    completeChallengeVictory();
  }

  updateProgressDisplay();
}

function calculateWorkoutDamage(workoutType, intensity) {
  let baseDamage = intensity * 10;

  if (workoutType === "筋トレ") {
    baseDamage = baseDamage + trainer.strength * 2;
  } else if (workoutType === "有酸素運動") {
    baseDamage = baseDamage + trainer.endurance * 2;
  }

  return baseDamage;
}

function completeChallengeVictory() {
  challenge.isActive = false;
  console.log("========================================");
  console.log("チャレンジクリア！");
  console.log("開始時体重: 75.0kg");
  console.log("現在の体重: " + trainer.currentWeight.toFixed(1) + "kg");
  console.log("減量成功: " + (75.0 - trainer.currentWeight).toFixed(1) + "kg");
  console.log("========================================");

  document.getElementById("result").textContent = "チャレンジクリア！";
  document.getElementById("result").style.color = "gold";
  document.getElementById("result").style.fontSize = "32px";
}

function updateProgressDisplay() {
  let progress = (challenge.daysCompleted / challenge.totalDays) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("daysInfo").textContent = challenge.daysCompleted + " / " +
                                                     challenge.totalDays + " 日";

  document.getElementById("strengthValue").textContent = "筋力: " + trainer.strength;
  document.getElementById("enduranceValue").textContent = "持久力: " + trainer.endurance;
  document.getElementById("weightValue").textContent = "体重: " + trainer.currentWeight.toFixed(1) + "kg";
}
```

この例では、トレーニングを「チャレンジへの攻撃」として表現しています。トレーニングを続けることで、自分のステータスが上昇し、より効果的なダメージを与えられるようになります。

RPGの成長システムを応用することで、長期的なモチベーション維持を実現しています。

### 例5: 教育アプリのクイズバトル（株式会社スタディプラス）

Studyplusは、学習管理アプリを提供しています。友達とのクイズバトルでモチベーションを高める機能があります。

```javascript
// クイズバトルシステム
let player1 = {
  name: "太郎",
  hp: 100,
  correctAnswers: 0,
  wrongAnswers: 0
};

let player2 = {
  name: "花子",
  hp: 100,
  correctAnswers: 0,
  wrongAnswers: 0
};

let currentQuestion = {
  text: "",
  correctAnswer: "",
  difficulty: 1
};

let isGameOver = false;

function answerQuestion(playerName, answer) {
  if (isGameOver) {
    return;
  }

  let currentPlayer = (playerName === player1.name) ? player1 : player2;
  let opponent = (playerName === player1.name) ? player2 : player1;

  if (answer === currentQuestion.correctAnswer) {
    // 正解した場合
    currentPlayer.correctAnswers = currentPlayer.correctAnswers + 1;
    let damage = currentQuestion.difficulty * 10;
    opponent.hp = opponent.hp - damage;

    console.log(playerName + "が正解！ " + damage + "ダメージ！");

    if (opponent.hp <= 0) {
      opponent.hp = 0;
      isGameOver = true;
      console.log(playerName + "の勝利！");
      displayWinner(playerName);
    }
  } else {
    // 不正解の場合
    currentPlayer.wrongAnswers = currentPlayer.wrongAnswers + 1;
    let damage = 5;
    currentPlayer.hp = currentPlayer.hp - damage;

    console.log(playerName + "が不正解... " + damage + "ダメージを受けた");

    if (currentPlayer.hp <= 0) {
      currentPlayer.hp = 0;
      isGameOver = true;
      let winnerName = (playerName === player1.name) ? player2.name : player1.name;
      console.log(winnerName + "の勝利！");
      displayWinner(winnerName);
    }
  }

  updateBattleDisplay();
}

function loadNextQuestion(questionData) {
  currentQuestion.text = questionData.text;
  currentQuestion.correctAnswer = questionData.answer;
  currentQuestion.difficulty = questionData.difficulty;

  document.getElementById("questionText").textContent = currentQuestion.text;
}

function displayWinner(winnerName) {
  document.getElementById("result").textContent = winnerName + "の勝利！";
  document.getElementById("result").style.color = "gold";
  document.getElementById("result").style.fontSize = "36px";

  // ボタンを無効化
  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

function updateBattleDisplay() {
  document.getElementById("player1HP").textContent = player1.name + " HP: " + player1.hp;
  document.getElementById("player2HP").textContent = player2.name + " HP: " + player2.hp;

  let player1HPPercent = (player1.hp / 100) * 100;
  let player2HPPercent = (player2.hp / 100) * 100;

  document.getElementById("player1HPBar").style.width = player1HPPercent + "%";
  document.getElementById("player2HPBar").style.width = player2HPPercent + "%";

  document.getElementById("player1Stats").textContent =
    "正解: " + player1.correctAnswers + " / 不正解: " + player1.wrongAnswers;
  document.getElementById("player2Stats").textContent =
    "正解: " + player2.correctAnswers + " / 不正解: " + player2.wrongAnswers;
}
```

この例では、クイズを対戦バトルの形式にしています。正解すると相手にダメージを与え、不正解すると自分がダメージを受けます。

競争要素を加えることで、学習を楽しく継続できる仕組みになっています。

これらの実例から、RPG風のシステムは以下のような場面で活用されていることが分かります。

- **ゲーム開発**: 直接的なバトルシステム
- **教育・学習**: モチベーション管理、進捗の可視化
- **ヘルスケア**: 健康状態の管理、目標達成の促進
- **フィットネス**: トレーニングの継続支援
- **エンターテインメント**: ユーザーエンゲージメントの向上

HP、ダメージ、レベルといったRPGの概念は、さまざまな数値データを分かりやすく表現する手段として使われています。

## RPG風バトルゲームの基本概念

RPG風バトルゲームを作るために、まず基本的な概念を理解しましょう。

### ゲームの構成要素

RPGバトルゲームには、以下の要素が必要です。

1. **キャラクター**: プレイヤーと敵
2. **ステータス**: HP（ヒットポイント）、攻撃力など
3. **アクション**: 攻撃、回復、防御など
4. **戦闘ルール**: ターン制、ダメージ計算、勝敗判定
5. **ユーザーインターフェース**: ステータス表示、ボタン、ログ

### 状態管理の重要性

ゲームでは、常に変化する状態を正確に管理する必要があります。

```javascript
// 状態を表す変数
let playerHP = 100;
let enemyHP = 80;
let isGameOver = false;
```

これらの変数は、ゲーム全体で共有される「グローバル変数」として定義します。どの関数からでもアクセスでき、ゲームの現在の状態を保持します。

### ターン制バトルの流れ

ターン制バトルでは、以下のような流れで戦闘が進行します。

```
1. プレイヤーのターン
   ↓
2. プレイヤーがアクション選択（攻撃 or 回復）
   ↓
3. アクション実行
   ↓
4. 勝敗判定
   ↓
5. 敵のターン（プレイヤーが生きている場合）
   ↓
6. 敵の攻撃
   ↓
7. 勝敗判定
   ↓
8. 1に戻る
```

この流れを関数で実装していきます。

## HP判定の実装

HPが0以下になったかを判定する仕組みは、ゲームの勝敗を決める重要な要素です。

### 基本的なHP判定

最もシンプルなHP判定は、以下のようになります。

```javascript
function checkGameOver() {
  if (playerHP <= 0) {
    console.log("プレイヤーの敗北");
    return true;
  }

  if (enemyHP <= 0) {
    console.log("プレイヤーの勝利");
    return true;
  }

  return false; // ゲーム続行
}
```

この関数は、どちらかのHPが0以下になったら`true`を返し、両方とも生きていれば`false`を返します。

### HP判定のタイミング

HP判定は、以下のタイミングで行います。

1. **プレイヤーの攻撃後**: 敵のHPが0以下になったか確認
2. **敵の攻撃後**: プレイヤーのHPが0以下になったか確認
3. **回復後**: HPが上限を超えていないか確認

```javascript
function playerAttack() {
  let damage = getRandomDamage(15, 25);
  enemyHP = enemyHP - damage;

  console.log("プレイヤーの攻撃！ " + damage + "ダメージ！");

  // HP判定
  if (enemyHP <= 0) {
    enemyHP = 0; // マイナスにならないようにする
    isGameOver = true;
    console.log("勝利！敵を倒した！");
    return; // 処理を終了
  }

  // 敵の反撃
  enemyAttack();
}
```

### HPの下限と上限の管理

HPは、以下のような制限を設けます。

```javascript
// HPの下限: 0未満にならないようにする
if (playerHP < 0) {
  playerHP = 0;
}

// HPの上限: 最大HPを超えないようにする
let maxPlayerHP = 100;
if (playerHP > maxPlayerHP) {
  playerHP = maxPlayerHP;
}
```

HPがマイナスになると、表示が不自然になります。また、回復で最大HPを超えないようにすることで、ゲームバランスを保ちます。

### 複数の条件を組み合わせた判定

実際のゲームでは、HP以外の条件も判定することがあります。

```javascript
function checkGameOver() {
  // プレイヤーの敗北条件
  if (playerHP <= 0 || playerStamina <= 0) {
    isGameOver = true;
    document.getElementById("result").textContent = "敗北...";
    return true;
  }

  // 敵の敗北条件
  if (enemyHP <= 0) {
    isGameOver = true;
    document.getElementById("result").textContent = "勝利！";
    return true;
  }

  // ターン数制限
  if (currentTurn >= maxTurns) {
    isGameOver = true;
    if (playerHP > enemyHP) {
      document.getElementById("result").textContent = "時間切れ - プレイヤーの勝利";
    } else {
      document.getElementById("result").textContent = "時間切れ - 敵の勝利";
    }
    return true;
  }

  return false;
}
```

このように、複数の条件を組み合わせることで、より複雑なゲームルールを実装できます。

## ダメージ計算の実装

ダメージ計算は、ゲームの面白さを大きく左右する要素です。

### ランダムダメージの生成

`Math.random()`を使って、指定範囲のランダムな整数を生成します。

```javascript
function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

この関数の仕組みを詳しく見てみましょう。

```javascript
// 例: min = 15, max = 25 の場合

// Math.random() は 0以上1未満の小数を生成
// 例: 0.7234...

// (max - min + 1) を掛ける
// (25 - 15 + 1) = 11
// 0.7234... * 11 = 7.957...

// Math.floor() で小数点以下を切り捨て
// Math.floor(7.957...) = 7

// min を足す
// 7 + 15 = 22

// 結果: 15～25の範囲のランダムな整数が得られる
```

### ダメージ計算の種類

実際のゲームでは、さまざまなダメージ計算方法があります。

#### 1. 固定ダメージ

```javascript
function calculateFixedDamage() {
  return 20; // 常に20ダメージ
}
```

単純ですが、予測可能で戦略性に欠けます。

#### 2. 範囲ダメージ（今回使用する方法）

```javascript
function calculateRangeDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

毎回異なるダメージで、予測不可能性があります。

#### 3. 攻撃力と防御力を考慮したダメージ

```javascript
function calculateDamageWithStats(attackPower, defensePower) {
  let baseDamage = attackPower - defensePower;

  if (baseDamage < 1) {
    baseDamage = 1; // 最低1ダメージ
  }

  // ランダム要素を加える（0.9～1.1倍）
  let randomFactor = Math.random() * 0.2 + 0.9;
  let finalDamage = Math.floor(baseDamage * randomFactor);

  return finalDamage;
}

// 使用例
let playerAttackPower = 50;
let enemyDefensePower = 20;
let damage = calculateDamageWithStats(playerAttackPower, enemyDefensePower);
// 結果: (50 - 20) * (0.9～1.1) = 27～33ダメージ
```

#### 4. クリティカルヒット

```javascript
function calculateDamageWithCritical(baseDamage) {
  let criticalChance = 0.1; // 10%の確率
  let isCritical = Math.random() < criticalChance;

  if (isCritical) {
    let criticalDamage = baseDamage * 2;
    console.log("クリティカルヒット！");
    return criticalDamage;
  }

  return baseDamage;
}
```

#### 5. 属性相性

```javascript
function calculateDamageWithElement(baseDamage, attackerElement, defenderElement) {
  // 火 > 草 > 水 > 火
  let effectiveness = 1.0;

  if (attackerElement === "火" && defenderElement === "草") {
    effectiveness = 2.0; // 効果抜群
  } else if (attackerElement === "火" && defenderElement === "水") {
    effectiveness = 0.5; // 効果いまひとつ
  } else if (attackerElement === "草" && defenderElement === "水") {
    effectiveness = 2.0;
  } else if (attackerElement === "草" && defenderElement === "火") {
    effectiveness = 0.5;
  } else if (attackerElement === "水" && defenderElement === "火") {
    effectiveness = 2.0;
  } else if (attackerElement === "水" && defenderElement === "草") {
    effectiveness = 0.5;
  }

  let finalDamage = Math.floor(baseDamage * effectiveness);

  if (effectiveness > 1.0) {
    console.log("効果は抜群だ！");
  } else if (effectiveness < 1.0) {
    console.log("効果は今ひとつのようだ...");
  }

  return finalDamage;
}
```

今回のレッスンでは、最もシンプルな「範囲ダメージ」を使用しますが、これらの応用例を知っておくことで、より複雑なゲームも作れるようになります。

### ダメージ表示の工夫

ダメージを分かりやすく表示することも重要です。

```javascript
function displayDamage(damage, isCritical) {
  let damageText = damage + " ダメージ";

  if (isCritical) {
    damageText = "クリティカル！ " + damageText;
  }

  let damageElement = document.getElementById("damageDisplay");
  damageElement.textContent = damageText;
  damageElement.style.color = isCritical ? "red" : "black";
  damageElement.style.fontSize = isCritical ? "24px" : "16px";
}
```

視覚的なフィードバックがあると、ユーザー体験が向上します。

## ステップバイステップ実装ガイド

それでは、RPG風バトルゲームを段階的に作っていきましょう。

### ステップ1: 基本構造とHTML要素の準備

まず、必要なHTML要素を用意します。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>RPGバトルゲーム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }

    .character {
      border: 2px solid #333;
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
    }

    .player {
      background-color: #e3f2fd;
    }

    .enemy {
      background-color: #ffebee;
    }

    .hp-bar {
      width: 100%;
      height: 20px;
      background-color: #ddd;
      border-radius: 10px;
      overflow: hidden;
      margin: 5px 0;
    }

    .hp-fill {
      height: 100%;
      background-color: #4caf50;
      transition: width 0.3s;
    }

    button {
      padding: 10px 20px;
      margin: 5px;
      font-size: 16px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background-color: #2196f3;
      color: white;
    }

    button:hover {
      background-color: #1976d2;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    #battleLog {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px 0;
      height: 150px;
      overflow-y: auto;
      background-color: #f5f5f5;
      border-radius: 5px;
    }

    #result {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>RPGバトルゲーム</h1>

  <div class="character player">
    <h2>プレイヤー</h2>
    <p id="playerHP">HP: 100</p>
    <div class="hp-bar">
      <div id="playerHPBar" class="hp-fill" style="width: 100%"></div>
    </div>
  </div>

  <div class="character enemy">
    <h2>敵</h2>
    <p id="enemyHP">HP: 80</p>
    <div class="hp-bar">
      <div id="enemyHPBar" class="hp-fill" style="width: 100%"></div>
    </div>
  </div>

  <div>
    <button onclick="playerAttack()">攻撃</button>
    <button onclick="playerHeal()">回復</button>
    <button onclick="resetGame()">リセット</button>
  </div>

  <div>
    <h3>戦闘ログ</h3>
    <div id="battleLog"></div>
  </div>

  <div id="result"></div>

  <script src="script.js"></script>
</body>
</html>
```

このHTMLでは、以下の要素を用意しています。

- **プレイヤーと敵の情報表示**: HP数値とHPバー
- **アクションボタン**: 攻撃、回復、リセット
- **戦闘ログ**: 戦闘の経過を表示
- **結果表示**: 勝敗のメッセージ

### ステップ2: ゲームの状態変数を定義

JavaScriptで、ゲームの状態を管理する変数を定義します。

```javascript
// ゲームの状態
let playerHP = 100;
let maxPlayerHP = 100;
let enemyHP = 80;
let maxEnemyHP = 80;
let isGameOver = false;

// ダメージ・回復量の設定
let PLAYER_DAMAGE_MIN = 15;
let PLAYER_DAMAGE_MAX = 25;
let ENEMY_DAMAGE_MIN = 10;
let ENEMY_DAMAGE_MAX = 20;
let HEAL_MIN = 20;
let HEAL_MAX = 30;
```

定数を使うことで、ゲームバランスの調整が容易になります。

### ステップ3: ダメージ計算関数を実装

```javascript
function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

この関数は、攻撃と回復の両方で使用します。

### ステップ4: 表示更新関数を実装

```javascript
function updateDisplay() {
  // HP数値の更新
  document.getElementById("playerHP").textContent = "HP: " + playerHP + " / " + maxPlayerHP;
  document.getElementById("enemyHP").textContent = "HP: " + enemyHP + " / " + maxEnemyHP;

  // HPバーの更新
  let playerHPPercent = (playerHP / maxPlayerHP) * 100;
  let enemyHPPercent = (enemyHP / maxEnemyHP) * 100;

  document.getElementById("playerHPBar").style.width = playerHPPercent + "%";
  document.getElementById("enemyHPBar").style.width = enemyHPPercent + "%";

  // HPバーの色を変更（HPが少なくなったら赤に）
  if (playerHPPercent < 30) {
    document.getElementById("playerHPBar").style.backgroundColor = "red";
  } else {
    document.getElementById("playerHPBar").style.backgroundColor = "#4caf50";
  }

  if (enemyHPPercent < 30) {
    document.getElementById("enemyHPBar").style.backgroundColor = "red";
  } else {
    document.getElementById("enemyHPBar").style.backgroundColor = "#4caf50";
  }
}
```

視覚的なフィードバックを提供することで、ゲームの状況が分かりやすくなります。

### ステップ5: 戦闘ログ表示関数を実装

```javascript
function addBattleLog(message) {
  let log = document.getElementById("battleLog");
  let newMessage = document.createElement("div");
  newMessage.textContent = message;
  log.appendChild(newMessage);

  // 自動スクロール
  log.scrollTop = log.scrollHeight;
}
```

ログを追加形式で表示することで、戦闘の経過が追いやすくなります。

### ステップ6: プレイヤーの攻撃を実装

```javascript
function playerAttack() {
  // ゲーム終了チェック
  if (isGameOver) {
    addBattleLog("ゲームは終了しています");
    return;
  }

  // ダメージ計算
  let damage = getRandomDamage(PLAYER_DAMAGE_MIN, PLAYER_DAMAGE_MAX);
  enemyHP = enemyHP - damage;

  // HPが0未満にならないようにする
  if (enemyHP < 0) {
    enemyHP = 0;
  }

  addBattleLog("プレイヤーの攻撃！ " + damage + "ダメージ！");

  // 表示を更新
  updateDisplay();

  // 勝敗判定
  if (enemyHP <= 0) {
    isGameOver = true;
    addBattleLog("========================================");
    addBattleLog("勝利！敵を倒しました！");
    addBattleLog("========================================");
    document.getElementById("result").textContent = "勝利！";
    document.getElementById("result").style.color = "gold";
    disableButtons();
    return;
  }

  // 敵の反撃
  enemyAttack();
}
```

### ステップ7: 敵の攻撃を実装

```javascript
function enemyAttack() {
  // ダメージ計算
  let damage = getRandomDamage(ENEMY_DAMAGE_MIN, ENEMY_DAMAGE_MAX);
  playerHP = playerHP - damage;

  // HPが0未満にならないようにする
  if (playerHP < 0) {
    playerHP = 0;
  }

  addBattleLog("敵の反撃！ " + damage + "ダメージを受けた！");

  // 表示を更新
  updateDisplay();

  // 勝敗判定
  if (playerHP <= 0) {
    isGameOver = true;
    addBattleLog("========================================");
    addBattleLog("敗北...やられてしまった");
    addBattleLog("========================================");
    document.getElementById("result").textContent = "敗北...";
    document.getElementById("result").style.color = "red";
    disableButtons();
  }
}
```

### ステップ8: 回復機能を実装

```javascript
function playerHeal() {
  // ゲーム終了チェック
  if (isGameOver) {
    addBattleLog("ゲームは終了しています");
    return;
  }

  // 回復量を計算
  let heal = getRandomDamage(HEAL_MIN, HEAL_MAX);
  playerHP = playerHP + heal;

  // HPの上限チェック
  if (playerHP > maxPlayerHP) {
    let actualHeal = heal - (playerHP - maxPlayerHP);
    playerHP = maxPlayerHP;
    addBattleLog("回復した！ " + actualHeal + "HP回復！（上限）");
  } else {
    addBattleLog("回復した！ " + heal + "HP回復！");
  }

  // 表示を更新
  updateDisplay();

  // 敵の反撃
  enemyAttack();
}
```

### ステップ9: ボタン無効化関数を実装

```javascript
function disableButtons() {
  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent !== "リセット") {
      buttons[i].disabled = true;
    }
  }
}

function enableButtons() {
  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}
```

ゲーム終了後、リセット以外のボタンを無効化します。

### ステップ10: リセット機能を実装

```javascript
function resetGame() {
  // 状態を初期化
  playerHP = maxPlayerHP;
  enemyHP = maxEnemyHP;
  isGameOver = false;

  // 表示をクリア
  document.getElementById("battleLog").innerHTML = "";
  document.getElementById("result").textContent = "";

  // ボタンを有効化
  enableButtons();

  // 表示を更新
  updateDisplay();

  addBattleLog("ゲームをリセットしました");
}
```

### ステップ11: 初期表示

```javascript
// ページ読み込み時に初期表示
updateDisplay();
addBattleLog("バトル開始！");
```

これで、基本的なRPG風バトルゲームが完成しました。

## 完成版のコード

すべてを組み合わせた完成版のコードです。

**script.js:**

```javascript
// ゲームの状態
let playerHP = 100;
let maxPlayerHP = 100;
let enemyHP = 80;
let maxEnemyHP = 80;
let isGameOver = false;

// ダメージ・回復量の設定
let PLAYER_DAMAGE_MIN = 15;
let PLAYER_DAMAGE_MAX = 25;
let ENEMY_DAMAGE_MIN = 10;
let ENEMY_DAMAGE_MAX = 20;
let HEAL_MIN = 20;
let HEAL_MAX = 30;

// ランダムダメージ計算
function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 表示を更新
function updateDisplay() {
  document.getElementById("playerHP").textContent = "HP: " + playerHP + " / " + maxPlayerHP;
  document.getElementById("enemyHP").textContent = "HP: " + enemyHP + " / " + maxEnemyHP;

  let playerHPPercent = (playerHP / maxPlayerHP) * 100;
  let enemyHPPercent = (enemyHP / maxEnemyHP) * 100;

  document.getElementById("playerHPBar").style.width = playerHPPercent + "%";
  document.getElementById("enemyHPBar").style.width = enemyHPPercent + "%";

  if (playerHPPercent < 30) {
    document.getElementById("playerHPBar").style.backgroundColor = "red";
  } else {
    document.getElementById("playerHPBar").style.backgroundColor = "#4caf50";
  }

  if (enemyHPPercent < 30) {
    document.getElementById("enemyHPBar").style.backgroundColor = "red";
  } else {
    document.getElementById("enemyHPBar").style.backgroundColor = "#4caf50";
  }
}

// 戦闘ログに追加
function addBattleLog(message) {
  let log = document.getElementById("battleLog");
  let newMessage = document.createElement("div");
  newMessage.textContent = message;
  log.appendChild(newMessage);
  log.scrollTop = log.scrollHeight;
}

// プレイヤーの攻撃
function playerAttack() {
  if (isGameOver) {
    addBattleLog("ゲームは終了しています");
    return;
  }

  let damage = getRandomDamage(PLAYER_DAMAGE_MIN, PLAYER_DAMAGE_MAX);
  enemyHP = enemyHP - damage;

  if (enemyHP < 0) {
    enemyHP = 0;
  }

  addBattleLog("プレイヤーの攻撃！ " + damage + "ダメージ！");
  updateDisplay();

  if (enemyHP <= 0) {
    isGameOver = true;
    addBattleLog("========================================");
    addBattleLog("勝利！敵を倒しました！");
    addBattleLog("========================================");
    document.getElementById("result").textContent = "勝利！";
    document.getElementById("result").style.color = "gold";
    disableButtons();
    return;
  }

  enemyAttack();
}

// 敵の攻撃
function enemyAttack() {
  let damage = getRandomDamage(ENEMY_DAMAGE_MIN, ENEMY_DAMAGE_MAX);
  playerHP = playerHP - damage;

  if (playerHP < 0) {
    playerHP = 0;
  }

  addBattleLog("敵の反撃！ " + damage + "ダメージを受けた！");
  updateDisplay();

  if (playerHP <= 0) {
    isGameOver = true;
    addBattleLog("========================================");
    addBattleLog("敗北...やられてしまった");
    addBattleLog("========================================");
    document.getElementById("result").textContent = "敗北...";
    document.getElementById("result").style.color = "red";
    disableButtons();
  }
}

// 回復
function playerHeal() {
  if (isGameOver) {
    addBattleLog("ゲームは終了しています");
    return;
  }

  let heal = getRandomDamage(HEAL_MIN, HEAL_MAX);
  playerHP = playerHP + heal;

  if (playerHP > maxPlayerHP) {
    let actualHeal = heal - (playerHP - maxPlayerHP);
    playerHP = maxPlayerHP;
    addBattleLog("回復した！ " + actualHeal + "HP回復！（上限）");
  } else {
    addBattleLog("回復した！ " + heal + "HP回復！");
  }

  updateDisplay();
  enemyAttack();
}

// ボタンを無効化
function disableButtons() {
  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent !== "リセット") {
      buttons[i].disabled = true;
    }
  }
}

// ボタンを有効化
function enableButtons() {
  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

// ゲームリセット
function resetGame() {
  playerHP = maxPlayerHP;
  enemyHP = maxEnemyHP;
  isGameOver = false;

  document.getElementById("battleLog").innerHTML = "";
  document.getElementById("result").textContent = "";

  enableButtons();
  updateDisplay();

  addBattleLog("ゲームをリセットしました");
}

// 初期表示
updateDisplay();
addBattleLog("バトル開始！");
```

## ゲームの動作確認

作成したゲームを実際にプレイしてみましょう。

### 攻撃ボタン

プレイヤーが15-25のランダムダメージで敵を攻撃します。その後、敵が10-20のランダムダメージで反撃してきます。

戦闘ログには、以下のように表示されます。

```
プレイヤーの攻撃！ 22ダメージ！
敵の反撃！ 15ダメージを受けた！
```

### 回復ボタン

プレイヤーのHPが20-30回復します。ただし、最大HP（100）を超えることはありません。回復後も敵は反撃してきます。

```
回復した！ 28HP回復！
敵の反撃！ 12ダメージを受けた！
```

### 戦略的なプレイ

このゲームには、簡単な戦略があります。

- **HPが少ない時**: 回復を優先する
- **HPが十分にある時**: 攻撃で敵を倒す
- **敵のHPが少ない時**: 攻撃で一気に倒す

運の要素もあるため、何度かプレイして勝利を目指しましょう。

## これまでの学習内容の活用

このゲームでは、これまで学んだ多くの技術を使っています。

### 1. 変数とデータ管理

プレイヤーと敵のHPを変数で管理しています。

```javascript
let playerHP = 100;
let enemyHP = 80;
let isGameOver = false;
```

ゲームの状態を表すフラグ変数（`isGameOver`）も使用しています。

### 2. 定数

ゲームバランスの設定値を定数として定義しています。

```javascript
let PLAYER_DAMAGE_MIN = 15;
let PLAYER_DAMAGE_MAX = 25;
```

これにより、後からバランス調整が容易になります。

### 3. 関数

各機能を関数にまとめることで、コードを整理し、再利用可能にしています。

- `getRandomDamage()`: ダメージ計算
- `updateDisplay()`: 表示更新
- `playerAttack()`: プレイヤーの攻撃
- `enemyAttack()`: 敵の反撃
- `playerHeal()`: 回復
- `resetGame()`: リセット

### 4. 条件分岐

HP判定、ゲーム終了チェック、回復の上限チェックなど、さまざまな場面で条件分岐を使用しています。

```javascript
if (enemyHP <= 0) {
  isGameOver = true;
  console.log("勝利！");
}
```

### 5. 早期リターン

ゲームが終了している場合、早期に関数から抜けることで、無駄な処理を避けています。

```javascript
if (isGameOver) {
  return;
}
```

これにより、コードの可読性も向上します。

### 6. DOM操作

`getElementById()`や`textContent`、`style`プロパティを使って、画面の表示を動的に更新しています。

```javascript
document.getElementById("playerHP").textContent = "HP: " + playerHP;
document.getElementById("playerHPBar").style.width = playerHPPercent + "%";
```

### 7. ランダム要素

`Math.random()`を使って、ダメージや回復量にランダム性を持たせています。

```javascript
function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

これにより、毎回異なる戦闘が楽しめます。

### 8. ループ処理

ボタンの無効化/有効化で、すべてのボタン要素を処理しています。

```javascript
let buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].disabled = true;
}
```

## よくあるミスと解決方法

RPG風バトルゲームを作る際によくあるミスと、その解決方法を紹介します。

### ミス1: HPがマイナスになる

**問題のコード:**

```javascript
function playerAttack() {
  let damage = getRandomDamage(15, 25);
  enemyHP = enemyHP - damage;

  if (enemyHP <= 0) {
    isGameOver = true;
  }
}
```

**何が問題か:**

敵のHPがマイナスになったまま表示されてしまいます。例えば、敵のHPが5で、20ダメージを与えた場合、HPが-15と表示されます。

**解決方法:**

HPが0未満になったら、0に設定します。

```javascript
function playerAttack() {
  let damage = getRandomDamage(15, 25);
  enemyHP = enemyHP - damage;

  if (enemyHP < 0) {
    enemyHP = 0; // 追加
  }

  if (enemyHP <= 0) {
    isGameOver = true;
  }
}
```

### ミス2: ゲーム終了後も操作できる

**問題のコード:**

```javascript
function playerAttack() {
  let damage = getRandomDamage(15, 25);
  enemyHP = enemyHP - damage;

  if (enemyHP <= 0) {
    isGameOver = true;
    console.log("勝利！");
  }

  enemyAttack(); // ゲーム終了後も実行される
}
```

**何が問題か:**

敵のHPが0になってゲームが終了しても、敵の反撃が実行されてしまいます。

**解決方法:**

ゲーム終了時に早期リターンを使います。

```javascript
function playerAttack() {
  let damage = getRandomDamage(15, 25);
  enemyHP = enemyHP - damage;

  if (enemyHP <= 0) {
    isGameOver = true;
    console.log("勝利！");
    return; // 追加：ここで処理を終了
  }

  enemyAttack();
}
```

また、関数の最初でもチェックします。

```javascript
function playerAttack() {
  if (isGameOver) {
    return; // すでにゲームが終了していたら何もしない
  }

  let damage = getRandomDamage(15, 25);
  enemyHP = enemyHP - damage;

  if (enemyHP <= 0) {
    isGameOver = true;
    console.log("勝利！");
    return;
  }

  enemyAttack();
}
```

### ミス3: 回復でHPが上限を超える

**問題のコード:**

```javascript
function playerHeal() {
  let heal = getRandomDamage(20, 30);
  playerHP = playerHP + heal;

  console.log(heal + "HP回復！");
}
```

**何が問題か:**

最大HPが100なのに、HPが150などになってしまいます。

**解決方法:**

回復後にHPの上限をチェックします。

```javascript
function playerHeal() {
  let heal = getRandomDamage(20, 30);
  playerHP = playerHP + heal;

  if (playerHP > maxPlayerHP) {
    playerHP = maxPlayerHP;
  }

  console.log(heal + "HP回復！");
}
```

より正確な回復量を表示したい場合：

```javascript
function playerHeal() {
  let heal = getRandomDamage(20, 30);
  let beforeHP = playerHP;
  playerHP = playerHP + heal;

  if (playerHP > maxPlayerHP) {
    playerHP = maxPlayerHP;
  }

  let actualHeal = playerHP - beforeHP;
  console.log(actualHeal + "HP回復！");
}
```

### ミス4: HPバーの幅が正しく更新されない

**問題のコード:**

```javascript
function updateDisplay() {
  document.getElementById("playerHP").textContent = "HP: " + playerHP;

  let playerHPPercent = playerHP / 100;
  document.getElementById("playerHPBar").style.width = playerHPPercent;
}
```

**何が問題か:**

`style.width`には単位（`%`または`px`）が必要ですが、数値のみを設定しています。

**解決方法:**

単位を含む文字列を設定します。

```javascript
function updateDisplay() {
  document.getElementById("playerHP").textContent = "HP: " + playerHP;

  let playerHPPercent = (playerHP / maxPlayerHP) * 100;
  document.getElementById("playerHPBar").style.width = playerHPPercent + "%"; // 修正
}
```

### ミス5: ランダム値の範囲が間違っている

**問題のコード:**

```javascript
function getRandomDamage(min, max) {
  return Math.floor(Math.random() * max) + min;
}

// 15-25の範囲を期待
let damage = getRandomDamage(15, 25);
```

**何が問題か:**

この計算では、15-39の範囲の値が返ってきます。

```
Math.random() * 25 = 0～24.999...
Math.floor(...) = 0～24
+ 15 = 15～39
```

**解決方法:**

正しい計算式を使います。

```javascript
function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // 修正
}
```

計算の流れ：

```
min = 15, max = 25

Math.random() = 0～0.999...
* (max - min + 1) = 0～10.999...
Math.floor(...) = 0～10
+ min = 15～25
```

### ミス6: ログが蓄積されすぎる

**問題のコード:**

```javascript
function addBattleLog(message) {
  let log = document.getElementById("battleLog");
  log.textContent = log.textContent + message + "\n";
}
```

**何が問題か:**

長時間プレイすると、ログが非常に長くなり、メモリを圧迫します。

**解決方法:**

最新の一定数のログのみを保持します。

```javascript
let battleLogMessages = [];
let MAX_LOG_MESSAGES = 50;

function addBattleLog(message) {
  battleLogMessages.push(message);

  // 最大数を超えたら古いものを削除
  if (battleLogMessages.length > MAX_LOG_MESSAGES) {
    battleLogMessages.shift();
  }

  // 表示を更新
  let log = document.getElementById("battleLog");
  log.innerHTML = "";

  for (let i = 0; i < battleLogMessages.length; i++) {
    let newMessage = document.createElement("div");
    newMessage.textContent = battleLogMessages[i];
    log.appendChild(newMessage);
  }

  log.scrollTop = log.scrollHeight;
}
```

または、DOM要素を直接操作する方法：

```javascript
function addBattleLog(message) {
  let log = document.getElementById("battleLog");
  let newMessage = document.createElement("div");
  newMessage.textContent = message;
  log.appendChild(newMessage);

  // 最大50個のメッセージを保持
  while (log.children.length > 50) {
    log.removeChild(log.children[0]);
  }

  log.scrollTop = log.scrollHeight;
}
```

## 応用例：ゲームの拡張

基本的なバトルゲームができたら、以下のような機能を追加してみましょう。

### 拡張1: ターン数の表示

```javascript
let turnNumber = 1;

function playerAttack() {
  if (isGameOver) return;

  addBattleLog("========== ターン " + turnNumber + " ==========");

  let damage = getRandomDamage(PLAYER_DAMAGE_MIN, PLAYER_DAMAGE_MAX);
  enemyHP = enemyHP - damage;

  if (enemyHP < 0) {
    enemyHP = 0;
  }

  addBattleLog("プレイヤーの攻撃！ " + damage + "ダメージ！");
  updateDisplay();

  if (enemyHP <= 0) {
    isGameOver = true;
    addBattleLog("勝利！ " + turnNumber + "ターンで勝利しました！");
    return;
  }

  enemyAttack();
  turnNumber = turnNumber + 1;
}

function resetGame() {
  playerHP = maxPlayerHP;
  enemyHP = maxEnemyHP;
  isGameOver = false;
  turnNumber = 1; // 追加

  document.getElementById("battleLog").innerHTML = "";
  document.getElementById("result").textContent = "";

  enableButtons();
  updateDisplay();
}
```

### 拡張2: クリティカルヒット

```javascript
function playerAttack() {
  if (isGameOver) return;

  let damage = getRandomDamage(PLAYER_DAMAGE_MIN, PLAYER_DAMAGE_MAX);

  // 10%の確率でクリティカルヒット
  let isCritical = Math.random() < 0.1;

  if (isCritical) {
    damage = damage * 2;
    addBattleLog("クリティカルヒット！");
  }

  enemyHP = enemyHP - damage;

  if (enemyHP < 0) {
    enemyHP = 0;
  }

  addBattleLog("プレイヤーの攻撃！ " + damage + "ダメージ！");
  updateDisplay();

  if (enemyHP <= 0) {
    isGameOver = true;
    addBattleLog("勝利！敵を倒しました！");
    return;
  }

  enemyAttack();
}
```

### 拡張3: 防御アクション

```javascript
let isPlayerDefending = false;

function playerDefend() {
  if (isGameOver) return;

  isPlayerDefending = true;
  addBattleLog("プレイヤーは防御の構えをとった！");

  enemyAttack();

  isPlayerDefending = false;
}

function enemyAttack() {
  let damage = getRandomDamage(ENEMY_DAMAGE_MIN, ENEMY_DAMAGE_MAX);

  // 防御中はダメージ半減
  if (isPlayerDefending) {
    damage = Math.floor(damage / 2);
    addBattleLog("防御成功！ ダメージ半減！");
  }

  playerHP = playerHP - damage;

  if (playerHP < 0) {
    playerHP = 0;
  }

  addBattleLog("敵の反撃！ " + damage + "ダメージを受けた！");
  updateDisplay();

  if (playerHP <= 0) {
    isGameOver = true;
    addBattleLog("敗北...やられてしまった");
  }
}
```

HTMLに防御ボタンを追加：

```html
<button onclick="playerDefend()">防御</button>
```

### 拡張4: スキルポイントシステム

```javascript
let skillPoints = 0;
let SKILL_POINT_COST = 3;

function playerAttack() {
  if (isGameOver) return;

  let damage = getRandomDamage(PLAYER_DAMAGE_MIN, PLAYER_DAMAGE_MAX);
  enemyHP = enemyHP - damage;

  if (enemyHP < 0) {
    enemyHP = 0;
  }

  // スキルポイント獲得
  skillPoints = skillPoints + 1;

  addBattleLog("プレイヤーの攻撃！ " + damage + "ダメージ！");
  addBattleLog("スキルポイント +1 (現在: " + skillPoints + ")");
  updateDisplay();

  if (enemyHP <= 0) {
    isGameOver = true;
    addBattleLog("勝利！敵を倒しました！");
    return;
  }

  enemyAttack();
}

function useSpecialAttack() {
  if (isGameOver) return;

  if (skillPoints < SKILL_POINT_COST) {
    addBattleLog("スキルポイントが不足しています（必要: " + SKILL_POINT_COST + "）");
    return;
  }

  skillPoints = skillPoints - SKILL_POINT_COST;

  let damage = getRandomDamage(30, 40); // 通常より強力
  enemyHP = enemyHP - damage;

  if (enemyHP < 0) {
    enemyHP = 0;
  }

  addBattleLog("必殺技！ " + damage + "ダメージ！");
  addBattleLog("スキルポイント -" + SKILL_POINT_COST + " (残り: " + skillPoints + ")");
  updateDisplay();

  if (enemyHP <= 0) {
    isGameOver = true;
    addBattleLog("勝利！敵を倒しました！");
    return;
  }

  enemyAttack();
}
```

HTMLに必殺技ボタンを追加：

```html
<button onclick="useSpecialAttack()">必殺技（SP3）</button>
```

### 拡張5: 複数の敵

```javascript
let enemies = [
  { name: "スライム", hp: 50, maxHP: 50, damageMin: 5, damageMax: 10 },
  { name: "ゴブリン", hp: 80, maxHP: 80, damageMin: 10, damageMax: 15 },
  { name: "ドラゴン", hp: 150, maxHP: 150, damageMin: 20, damageMax: 30 }
];

let currentEnemyIndex = 0;

function getCurrentEnemy() {
  return enemies[currentEnemyIndex];
}

function playerAttack() {
  if (isGameOver) return;

  let enemy = getCurrentEnemy();
  let damage = getRandomDamage(PLAYER_DAMAGE_MIN, PLAYER_DAMAGE_MAX);
  enemy.hp = enemy.hp - damage;

  if (enemy.hp < 0) {
    enemy.hp = 0;
  }

  addBattleLog("プレイヤーの攻撃！ " + damage + "ダメージ！");
  updateDisplay();

  if (enemy.hp <= 0) {
    addBattleLog(enemy.name + "を倒した！");
    currentEnemyIndex = currentEnemyIndex + 1;

    if (currentEnemyIndex >= enemies.length) {
      isGameOver = true;
      addBattleLog("全ての敵を倒した！ 完全勝利！");
      return;
    }

    let nextEnemy = getCurrentEnemy();
    addBattleLog("次の敵が現れた: " + nextEnemy.name);
    updateDisplay();
    return;
  }

  enemyAttack();
}

function enemyAttack() {
  let enemy = getCurrentEnemy();
  let damage = getRandomDamage(enemy.damageMin, enemy.damageMax);
  playerHP = playerHP - damage;

  if (playerHP < 0) {
    playerHP = 0;
  }

  addBattleLog(enemy.name + "の攻撃！ " + damage + "ダメージを受けた！");
  updateDisplay();

  if (playerHP <= 0) {
    isGameOver = true;
    addBattleLog("敗北...やられてしまった");
  }
}

function updateDisplay() {
  let enemy = getCurrentEnemy();

  document.getElementById("playerHP").textContent = "HP: " + playerHP + " / " + maxPlayerHP;
  document.getElementById("enemyHP").textContent = enemy.name + " HP: " + enemy.hp + " / " + enemy.maxHP;

  let playerHPPercent = (playerHP / maxPlayerHP) * 100;
  let enemyHPPercent = (enemy.hp / enemy.maxHP) * 100;

  document.getElementById("playerHPBar").style.width = playerHPPercent + "%";
  document.getElementById("enemyHPBar").style.width = enemyHPPercent + "%";
}
```

## 完全版アプリケーション例

### アプリケーション1: 基本的なRPGバトル

上記の完成版コードを使用します。

### アプリケーション2: 拡張RPGバトル（クリティカル・防御・必殺技）

**HTML (index.html):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>拡張RPGバトルゲーム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f0f0f0;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .character {
      border: 3px solid #333;
      padding: 20px;
      margin: 15px 0;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .player {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .enemy {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }

    .hp-bar {
      width: 100%;
      height: 25px;
      background-color: rgba(255,255,255,0.3);
      border-radius: 12px;
      overflow: hidden;
      margin: 10px 0;
    }

    .hp-fill {
      height: 100%;
      background-color: #4caf50;
      transition: width 0.5s ease;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
    }

    .controls {
      text-align: center;
      margin: 20px 0;
    }

    button {
      padding: 12px 24px;
      margin: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      border: none;
      border-radius: 8px;
      background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
      color: white;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }

    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 8px rgba(0,0,0,0.3);
    }

    button:active:not(:disabled) {
      transform: translateY(0);
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
      box-shadow: none;
    }

    .special-button {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .heal-button {
      background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
    }

    .defend-button {
      background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
    }

    #battleLog {
      border: 2px solid #333;
      padding: 15px;
      margin: 20px 0;
      height: 200px;
      overflow-y: auto;
      background-color: white;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    }

    #result {
      font-size: 28px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .stats {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .stat-item {
      background-color: rgba(255,255,255,0.2);
      padding: 5px 10px;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <h1>⚔️ 拡張RPGバトルゲーム ⚔️</h1>

  <div class="character player">
    <h2>👤 プレイヤー</h2>
    <p id="playerHP">HP: 100 / 100</p>
    <div class="hp-bar">
      <div id="playerHPBar" class="hp-fill" style="width: 100%"></div>
    </div>
    <div class="stats">
      <div class="stat-item">
        <span id="turnDisplay">ターン: 1</span>
      </div>
      <div class="stat-item">
        <span id="spDisplay">SP: 0</span>
      </div>
    </div>
  </div>

  <div class="character enemy">
    <h2>👹 敵</h2>
    <p id="enemyHP">HP: 100 / 100</p>
    <div class="hp-bar">
      <div id="enemyHPBar" class="hp-fill" style="width: 100%"></div>
    </div>
  </div>

  <div class="controls">
    <button onclick="playerAttack()">⚔️ 攻撃</button>
    <button class="special-button" onclick="useSpecialAttack()">💥 必殺技 (SP3)</button>
    <button class="heal-button" onclick="playerHeal()">💚 回復</button>
    <button class="defend-button" onclick="playerDefend()">🛡️ 防御</button>
    <button onclick="resetGame()">🔄 リセット</button>
  </div>

  <div>
    <h3>📜 戦闘ログ</h3>
    <div id="battleLog"></div>
  </div>

  <div id="result"></div>

  <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
// ゲームの状態
let playerHP = 100;
let maxPlayerHP = 100;
let enemyHP = 100;
let maxEnemyHP = 100;
let isGameOver = false;
let turnNumber = 1;
let skillPoints = 0;
let isPlayerDefending = false;

// ダメージ・回復量の設定
let PLAYER_DAMAGE_MIN = 15;
let PLAYER_DAMAGE_MAX = 25;
let ENEMY_DAMAGE_MIN = 12;
let ENEMY_DAMAGE_MAX = 18;
let HEAL_MIN = 20;
let HEAL_MAX = 30;
let SPECIAL_DAMAGE_MIN = 35;
let SPECIAL_DAMAGE_MAX = 50;
let SKILL_POINT_COST = 3;
let CRITICAL_CHANCE = 0.15; // 15%

// ランダムダメージ計算
function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 表示を更新
function updateDisplay() {
  document.getElementById("playerHP").textContent = "HP: " + playerHP + " / " + maxPlayerHP;
  document.getElementById("enemyHP").textContent = "HP: " + enemyHP + " / " + maxEnemyHP;
  document.getElementById("turnDisplay").textContent = "ターン: " + turnNumber;
  document.getElementById("spDisplay").textContent = "SP: " + skillPoints;

  let playerHPPercent = (playerHP / maxPlayerHP) * 100;
  let enemyHPPercent = (enemyHP / maxEnemyHP) * 100;

  document.getElementById("playerHPBar").style.width = playerHPPercent + "%";
  document.getElementById("enemyHPBar").style.width = enemyHPPercent + "%";

  if (playerHPPercent < 30) {
    document.getElementById("playerHPBar").style.backgroundColor = "#f44336";
  } else if (playerHPPercent < 60) {
    document.getElementById("playerHPBar").style.backgroundColor = "#ff9800";
  } else {
    document.getElementById("playerHPBar").style.backgroundColor = "#4caf50";
  }

  if (enemyHPPercent < 30) {
    document.getElementById("enemyHPBar").style.backgroundColor = "#f44336";
  } else if (enemyHPPercent < 60) {
    document.getElementById("enemyHPBar").style.backgroundColor = "#ff9800";
  } else {
    document.getElementById("enemyHPBar").style.backgroundColor = "#4caf50";
  }
}

// 戦闘ログに追加
function addBattleLog(message) {
  let log = document.getElementById("battleLog");
  let newMessage = document.createElement("div");
  newMessage.textContent = message;
  newMessage.style.marginBottom = "5px";
  log.appendChild(newMessage);

  while (log.children.length > 30) {
    log.removeChild(log.children[0]);
  }

  log.scrollTop = log.scrollHeight;
}

// プレイヤーの攻撃
function playerAttack() {
  if (isGameOver) {
    addBattleLog("ゲームは終了しています");
    return;
  }

  addBattleLog("========== ターン " + turnNumber + " ==========");

  let damage = getRandomDamage(PLAYER_DAMAGE_MIN, PLAYER_DAMAGE_MAX);
  let isCritical = Math.random() < CRITICAL_CHANCE;

  if (isCritical) {
    damage = Math.floor(damage * 2);
    addBattleLog("💥 クリティカルヒット！");
  }

  enemyHP = enemyHP - damage;
  if (enemyHP < 0) {
    enemyHP = 0;
  }

  skillPoints = skillPoints + 1;

  addBattleLog("⚔️ プレイヤーの攻撃！ " + damage + "ダメージ！");
  addBattleLog("✨ スキルポイント +1 (現在: " + skillPoints + ")");
  updateDisplay();

  if (enemyHP <= 0) {
    isGameOver = true;
    addBattleLog("========================================");
    addBattleLog("🎉 勝利！ " + turnNumber + "ターンで敵を倒しました！");
    addBattleLog("========================================");
    document.getElementById("result").textContent = "🎉 VICTORY! 🎉";
    document.getElementById("result").style.color = "#ffd700";
    disableButtons();
    return;
  }

  enemyAttack();
  turnNumber = turnNumber + 1;
}

// 必殺技
function useSpecialAttack() {
  if (isGameOver) {
    addBattleLog("ゲームは終了しています");
    return;
  }

  if (skillPoints < SKILL_POINT_COST) {
    addBattleLog("❌ スキルポイントが不足しています（必要: " + SKILL_POINT_COST + "）");
    return;
  }

  addBattleLog("========== ターン " + turnNumber + " ==========");

  skillPoints = skillPoints - SKILL_POINT_COST;

  let damage = getRandomDamage(SPECIAL_DAMAGE_MIN, SPECIAL_DAMAGE_MAX);
  enemyHP = enemyHP - damage;

  if (enemyHP < 0) {
    enemyHP = 0;
  }

  addBattleLog("💥💥💥 必殺技発動！ " + damage + "ダメージ！ 💥💥💥");
  addBattleLog("✨ スキルポイント -" + SKILL_POINT_COST + " (残り: " + skillPoints + ")");
  updateDisplay();

  if (enemyHP <= 0) {
    isGameOver = true;
    addBattleLog("========================================");
    addBattleLog("🎉 勝利！ 必殺技で敵を倒しました！");
    addBattleLog("========================================");
    document.getElementById("result").textContent = "🎉 PERFECT VICTORY! 🎉";
    document.getElementById("result").style.color = "#ffd700";
    disableButtons();
    return;
  }

  enemyAttack();
  turnNumber = turnNumber + 1;
}

// 敵の攻撃
function enemyAttack() {
  let damage = getRandomDamage(ENEMY_DAMAGE_MIN, ENEMY_DAMAGE_MAX);

  if (isPlayerDefending) {
    damage = Math.floor(damage / 2);
    addBattleLog("🛡️ 防御成功！ ダメージ半減！");
  }

  playerHP = playerHP - damage;
  if (playerHP < 0) {
    playerHP = 0;
  }

  addBattleLog("👹 敵の攻撃！ " + damage + "ダメージを受けた！");
  updateDisplay();

  if (playerHP <= 0) {
    isGameOver = true;
    addBattleLog("========================================");
    addBattleLog("💀 敗北... " + turnNumber + "ターンで力尽きました");
    addBattleLog("========================================");
    document.getElementById("result").textContent = "💀 GAME OVER 💀";
    document.getElementById("result").style.color = "#f44336";
    disableButtons();
  }
}

// 回復
function playerHeal() {
  if (isGameOver) {
    addBattleLog("ゲームは終了しています");
    return;
  }

  addBattleLog("========== ターン " + turnNumber + " ==========");

  let heal = getRandomDamage(HEAL_MIN, HEAL_MAX);
  let beforeHP = playerHP;
  playerHP = playerHP + heal;

  if (playerHP > maxPlayerHP) {
    playerHP = maxPlayerHP;
  }

  let actualHeal = playerHP - beforeHP;

  if (actualHeal < heal) {
    addBattleLog("💚 回復した！ " + actualHeal + "HP回復！（上限到達）");
  } else {
    addBattleLog("💚 回復した！ " + actualHeal + "HP回復！");
  }

  updateDisplay();
  enemyAttack();
  turnNumber = turnNumber + 1;
}

// 防御
function playerDefend() {
  if (isGameOver) {
    addBattleLog("ゲームは終了しています");
    return;
  }

  addBattleLog("========== ターン " + turnNumber + " ==========");
  addBattleLog("🛡️ プレイヤーは防御の構えをとった！");

  isPlayerDefending = true;
  enemyAttack();
  isPlayerDefending = false;

  turnNumber = turnNumber + 1;
}

// ボタンを無効化
function disableButtons() {
  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent.indexOf("リセット") === -1) {
      buttons[i].disabled = true;
    }
  }
}

// ボタンを有効化
function enableButtons() {
  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

// ゲームリセット
function resetGame() {
  playerHP = maxPlayerHP;
  enemyHP = maxEnemyHP;
  isGameOver = false;
  turnNumber = 1;
  skillPoints = 0;
  isPlayerDefending = false;

  document.getElementById("battleLog").innerHTML = "";
  document.getElementById("result").textContent = "";

  enableButtons();
  updateDisplay();

  addBattleLog("🔄 ゲームをリセットしました");
  addBattleLog("⚔️ バトル開始！");
}

// 初期表示
updateDisplay();
addBattleLog("⚔️ バトル開始！");
addBattleLog("敵が現れた！ 戦闘開始！");
```

### アプリケーション3: ボスバトル（3段階変化）

**HTML (index.html):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ボスバトル</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 30px auto;
      padding: 20px;
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
    }

    h1 {
      text-align: center;
      font-size: 36px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .boss-phase {
      text-align: center;
      font-size: 24px;
      margin: 20px 0;
      padding: 10px;
      background-color: rgba(255,255,255,0.1);
      border-radius: 10px;
    }

    .character {
      border: 3px solid #fff;
      padding: 20px;
      margin: 15px 0;
      border-radius: 15px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    }

    .player {
      background-color: rgba(76, 175, 80, 0.3);
    }

    .boss {
      background-color: rgba(244, 67, 54, 0.3);
    }

    .boss.phase1 {
      background-color: rgba(255, 152, 0, 0.3);
    }

    .boss.phase2 {
      background-color: rgba(244, 67, 54, 0.3);
    }

    .boss.phase3 {
      background-color: rgba(156, 39, 176, 0.3);
    }

    .hp-bar {
      width: 100%;
      height: 30px;
      background-color: rgba(0,0,0,0.3);
      border-radius: 15px;
      overflow: hidden;
      margin: 10px 0;
      border: 2px solid white;
    }

    .hp-fill {
      height: 100%;
      background: linear-gradient(90deg, #4caf50 0%, #8bc34a 100%);
      transition: width 0.5s ease, background 0.5s ease;
    }

    button {
      padding: 15px 30px;
      margin: 10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      border: 2px solid white;
      border-radius: 10px;
      background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
      color: white;
      transition: all 0.3s;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }

    button:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.4);
    }

    button:disabled {
      background: #666;
      cursor: not-allowed;
      opacity: 0.5;
    }

    #battleLog {
      border: 2px solid white;
      padding: 15px;
      margin: 20px 0;
      height: 250px;
      overflow-y: auto;
      background-color: rgba(0,0,0,0.5);
      border-radius: 10px;
      font-family: 'Courier New', monospace;
    }

    #result {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
      text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
    }

    .controls {
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>🐉 ボスバトル 🐉</h1>

  <div id="bossPhase" class="boss-phase">第1形態</div>

  <div class="character player">
    <h2>👤 勇者</h2>
    <p id="playerHP">HP: 200 / 200</p>
    <div class="hp-bar">
      <div id="playerHPBar" class="hp-fill" style="width: 100%"></div>
    </div>
  </div>

  <div id="bossContainer" class="character boss phase1">
    <h2 id="bossName">🐉 ドラゴン</h2>
    <p id="bossHP">HP: 150 / 150</p>
    <div class="hp-bar">
      <div id="bossHPBar" class="hp-fill" style="width: 100%"></div>
    </div>
  </div>

  <div class="controls">
    <button onclick="playerAttack()">⚔️ 攻撃</button>
    <button onclick="playerHeal()">💚 回復</button>
    <button onclick="resetGame()">🔄 リセット</button>
  </div>

  <div>
    <h3>📜 戦闘ログ</h3>
    <div id="battleLog"></div>
  </div>

  <div id="result"></div>

  <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
// ゲームの状態
let playerHP = 200;
let maxPlayerHP = 200;
let bossHP = 150;
let maxBossHP = 150;
let isGameOver = false;
let bossPhase = 1;

// ダメージ・回復量の設定
let PLAYER_DAMAGE_MIN = 20;
let PLAYER_DAMAGE_MAX = 30;
let HEAL_MIN = 30;
let HEAL_MAX = 50;

// ボスの形態ごとの設定
let bossPhases = [
  { name: "ドラゴン", damageMin: 15, damageMax: 25, hpThreshold: 100, color: "phase1" },
  { name: "怒れるドラゴン", damageMin: 25, damageMax: 35, hpThreshold: 50, color: "phase2" },
  { name: "狂乱のドラゴン", damageMin: 35, damageMax: 50, hpThreshold: 0, color: "phase3" }
];

function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateDisplay() {
  document.getElementById("playerHP").textContent = "HP: " + playerHP + " / " + maxPlayerHP;
  document.getElementById("bossHP").textContent = "HP: " + bossHP + " / " + maxBossHP;

  let playerHPPercent = (playerHP / maxPlayerHP) * 100;
  let bossHPPercent = (bossHP / maxBossHP) * 100;

  document.getElementById("playerHPBar").style.width = playerHPPercent + "%";
  document.getElementById("bossHPBar").style.width = bossHPPercent + "%";

  if (playerHPPercent < 30) {
    document.getElementById("playerHPBar").style.background = "linear-gradient(90deg, #f44336 0%, #e91e63 100%)";
  } else if (playerHPPercent < 60) {
    document.getElementById("playerHPBar").style.background = "linear-gradient(90deg, #ff9800 0%, #ffc107 100%)";
  } else {
    document.getElementById("playerHPBar").style.background = "linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)";
  }

  if (bossHPPercent < 30) {
    document.getElementById("bossHPBar").style.background = "linear-gradient(90deg, #f44336 0%, #e91e63 100%)";
  } else if (bossHPPercent < 60) {
    document.getElementById("bossHPBar").style.background = "linear-gradient(90deg, #ff9800 0%, #ffc107 100%)";
  } else {
    document.getElementById("bossHPBar").style.background = "linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)";
  }
}

function addBattleLog(message) {
  let log = document.getElementById("battleLog");
  let newMessage = document.createElement("div");
  newMessage.textContent = message;
  newMessage.style.marginBottom = "5px";
  log.appendChild(newMessage);

  while (log.children.length > 40) {
    log.removeChild(log.children[0]);
  }

  log.scrollTop = log.scrollHeight;
}

function checkPhaseChange() {
  if (bossPhase === 1 && bossHP <= bossPhases[0].hpThreshold && bossHP > bossPhases[1].hpThreshold) {
    bossPhase = 2;
    addBattleLog("========================================");
    addBattleLog("💥💥💥 ボスが第2形態に変化した！ 💥💥💥");
    addBattleLog("攻撃力が大幅に上昇した！");
    addBattleLog("========================================");

    document.getElementById("bossName").textContent = "🔥 " + bossPhases[1].name;
    document.getElementById("bossPhase").textContent = "第2形態";

    let container = document.getElementById("bossContainer");
    container.className = "character boss phase2";
  } else if (bossPhase === 2 && bossHP <= bossPhases[1].hpThreshold && bossHP > 0) {
    bossPhase = 3;
    addBattleLog("========================================");
    addBattleLog("💀💀💀 ボスが最終形態に変化した！ 💀💀💀");
    addBattleLog("狂ったように暴れ回っている！");
    addBattleLog("========================================");

    document.getElementById("bossName").textContent = "💀 " + bossPhases[2].name;
    document.getElementById("bossPhase").textContent = "最終形態";

    let container = document.getElementById("bossContainer");
    container.className = "character boss phase3";
  }
}

function playerAttack() {
  if (isGameOver) {
    addBattleLog("ゲームは終了しています");
    return;
  }

  let damage = getRandomDamage(PLAYER_DAMAGE_MIN, PLAYER_DAMAGE_MAX);
  let isCritical = Math.random() < 0.2;

  if (isCritical) {
    damage = Math.floor(damage * 2);
    addBattleLog("💥 クリティカルヒット！");
  }

  bossHP = bossHP - damage;
  if (bossHP < 0) {
    bossHP = 0;
  }

  addBattleLog("⚔️ 勇者の攻撃！ " + damage + "ダメージ！");
  updateDisplay();

  checkPhaseChange();

  if (bossHP <= 0) {
    isGameOver = true;
    addBattleLog("========================================");
    addBattleLog("🎉🎉🎉 勝利！ ボスを討伐した！ 🎉🎉🎉");
    addBattleLog("世界に平和が訪れた...");
    addBattleLog("========================================");
    document.getElementById("result").textContent = "🎉 BOSS DEFEATED! 🎉";
    document.getElementById("result").style.color = "#ffd700";
    disableButtons();
    return;
  }

  bossAttack();
}

function bossAttack() {
  let currentPhaseData = bossPhases[bossPhase - 1];
  let damage = getRandomDamage(currentPhaseData.damageMin, currentPhaseData.damageMax);

  playerHP = playerHP - damage;
  if (playerHP < 0) {
    playerHP = 0;
  }

  addBattleLog("🐉 " + currentPhaseData.name + "の攻撃！ " + damage + "ダメージを受けた！");
  updateDisplay();

  if (playerHP <= 0) {
    isGameOver = true;
    addBattleLog("========================================");
    addBattleLog("💀 敗北... 力尽きてしまった");
    addBattleLog("========================================");
    document.getElementById("result").textContent = "💀 DEFEATED 💀";
    document.getElementById("result").style.color = "#f44336";
    disableButtons();
  }
}

function playerHeal() {
  if (isGameOver) {
    addBattleLog("ゲームは終了しています");
    return;
  }

  let heal = getRandomDamage(HEAL_MIN, HEAL_MAX);
  let beforeHP = playerHP;
  playerHP = playerHP + heal;

  if (playerHP > maxPlayerHP) {
    playerHP = maxPlayerHP;
  }

  let actualHeal = playerHP - beforeHP;

  if (actualHeal < heal) {
    addBattleLog("💚 回復した！ " + actualHeal + "HP回復！（上限到達）");
  } else {
    addBattleLog("💚 回復した！ " + actualHeal + "HP回復！");
  }

  updateDisplay();
  bossAttack();
}

function disableButtons() {
  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent.indexOf("リセット") === -1) {
      buttons[i].disabled = true;
    }
  }
}

function enableButtons() {
  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

function resetGame() {
  playerHP = maxPlayerHP;
  bossHP = maxBossHP;
  isGameOver = false;
  bossPhase = 1;

  document.getElementById("battleLog").innerHTML = "";
  document.getElementById("result").textContent = "";
  document.getElementById("bossName").textContent = "🐉 " + bossPhases[0].name;
  document.getElementById("bossPhase").textContent = "第1形態";

  let container = document.getElementById("bossContainer");
  container.className = "character boss phase1";

  enableButtons();
  updateDisplay();

  addBattleLog("🔄 ゲームをリセットしました");
  addBattleLog("🐉 ボス戦開始！");
  addBattleLog("強大なドラゴンが立ちはだかる！");
}

// 初期表示
updateDisplay();
addBattleLog("🐉 ボス戦開始！");
addBattleLog("強大なドラゴンが立ちはだかる！");
addBattleLog("勝利を掴め！");
```

## 練習問題

### 課題

RPG風のバトルゲームを作成しましょう。プレイヤーと敵が戦い、攻撃、回復、リセットの機能を実装します。

### 保存場所

`exercises/lesson-063/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. **RPG風バトルシステムを構築する**: プレイヤーと敵のHP管理、攻撃・回復システムを実装します
2. **HP判定とゲームオーバー処理を実装する**: HPが0以下になったかを判定し、勝敗を決定します
3. **ダメージ計算とランダム要素を活用する**: `Math.random()`を使って、ランダムなダメージを生成します

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-063
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント1: 基本構造

<details>
<summary>ヒント1を表示</summary>

グローバル変数でゲームの状態を管理します。

```javascript
let playerHP = 100;
let maxPlayerHP = 100;
let enemyHP = 80;
let maxEnemyHP = 80;
let isGameOver = false;
```

ランダムダメージを計算する関数を作ります。

```javascript
function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

</details>

### ヒント2: プレイヤーの攻撃

<details>
<summary>ヒント2を表示</summary>

プレイヤーの攻撃では、以下の処理を行います。

1. ゲーム終了チェック
2. ダメージ計算（15-25のランダム）
3. 敵のHPを減らす
4. HPを0未満にしない
5. ログに追加
6. 表示を更新
7. 敵のHPが0以下なら勝利
8. そうでなければ敵の反撃

```javascript
function playerAttack() {
  if (isGameOver) {
    return;
  }

  let damage = getRandomDamage(15, 25);
  enemyHP = enemyHP - damage;

  if (enemyHP < 0) {
    enemyHP = 0;
  }

  // ログ表示...
  // 表示更新...

  if (enemyHP <= 0) {
    isGameOver = true;
    // 勝利メッセージ...
    return;
  }

  enemyAttack();
}
```

</details>

### ヒント3: 完全な実装

<details>
<summary>ヒント3を表示</summary>

完全な実装は、このレッスンの「完成版のコード」セクションを参照してください。

重要なポイント：

- HPが0未満にならないようにする
- ゲーム終了後は操作できないようにする
- 回復でHPが上限を超えないようにする
- HPバーの幅は`%`単位で指定する
- 早期リターンを活用する

</details>

## まとめ

お疲れ様でした。今回のレッスンでは、RPG風バトルゲームを作成しました。

**今回のキーポイント:**

- **RPG風バトルシステム**: プレイヤーと敵のHP管理、攻撃と回復の実装、ターン制の戦闘システムを構築しました。ゲームの状態を変数で管理し、各アクションを関数にまとめることで、整理されたコードを実現しました。実世界では、ゲーム開発だけでなく、学習管理システム、ヘルスケアアプリ、フィットネスアプリなど、さまざまな分野でRPGの概念が活用されています

- **HP判定**: 条件分岐を使って、HPが0以下になったかをチェックし、勝敗を判定しました。`isGameOver`フラグを使うことで、ゲーム終了後の不要な処理を防ぎました。早期リターンを活用することで、コードの可読性も向上しました。HPの下限（0）と上限（最大HP）を管理することで、表示の不具合を防ぎ、ゲームバランスを保ちました

- **ダメージ計算**: `Math.random()`を使って、指定範囲のランダムなダメージを生成しました。これにより、毎回異なる戦闘が楽しめるゲームになりました。ランダム要素は、ゲームに予測不可能性と面白さをもたらします。応用として、クリティカルヒット、攻撃力・防御力の考慮、属性相性など、さまざまなダメージ計算方法があることも学びました

このプロジェクトでは、変数、条件分岐、関数、DOM操作、ランダム要素など、これまで学んだすべての知識を統合して使いました。小さな機能を組み合わせることで、本格的なゲームを作ることができることを体験しました。

また、以下のような拡張機能も実装できることを学びました。

- ターン数の表示
- クリティカルヒット
- 防御アクション
- スキルポイントシステム
- 複数の敵
- ボスの形態変化

これらの応用例は、基本的な仕組みを理解していれば、比較的簡単に実装できます。プログラミングの楽しさは、こうして少しずつ機能を追加していくことで、より面白いものを作っていけることです。

次の章では、より高度なイベント処理について学びます。ボタンクリック以外のさまざまなイベントを扱えるようになり、より豊かなユーザーインタラクションを実現していきましょう。

**次のレッスンへの準備:**

次のレッスンでは、第6章「イベント処理の応用」に入ります。キーボード入力、マウス操作、フォーカスイベントなど、さまざまなユーザーインタラクションを扱う方法を学びます。今回学んだゲーム開発の知識は、イベント処理と組み合わせることで、さらに洗練されたアプリケーションを作ることができるようになります。
