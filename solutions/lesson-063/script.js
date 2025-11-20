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
