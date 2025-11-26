---
title: "Lesson 076: break文"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン76：break文

## このレッスンで学ぶこと

前回のレッスンでは、条件付きループについて学びました。ユーザーが正解するまで質問を繰り返したり、入力があるまでループを続けたりする方法を習得しました。

しかし、実際のプログラミングでは、「途中で条件を満たしたらすぐにループを抜けたい」という場面がよくあります。例えば：

**よくある場面：**
- リストの中から目的の項目を見つけたら、それ以上探す必要がない
- エラーが発生したら、即座に処理を中止したい
- ユーザーが「キャンセル」を選んだら、ループを終了したい
- ゲームで目標を達成したら、ゲームを終了したい

このような「ループの途中で抜ける」処理を実現するのが**break文**です。

### 学習目標

このレッスンでは、break文を使ってループを制御する方法を学びます：

- break文でループを途中で抜ける方法を理解する
- 条件に応じてbreakを使う仕組みを学ぶ
- 早期終了のパターンを習得する
- フラグ変数を使ってループの終了理由を判定する方法を学ぶ

---

## break文とは

### これまでのループの終了方法

これまで学んだループは、**条件式が偽（false）になるまで繰り返す**という仕組みでした。

**while文の例：**
```javascript
let i = 0;

while (i < 5) {  // 条件式がfalseになるまで繰り返す
  console.log(i);
  i++;
}
// i が 5 になって初めて条件式が false になり、ループを抜ける
```

この方法では、ループを抜けるタイミングは**条件式の評価のみ**で決まります。

### break文を使った新しい終了方法

**break文**を使うと、条件式とは関係なく、**いつでも好きなタイミングでループを抜けることができます。**

```javascript
let i = 0;

while (i < 10) {
  console.log(i);

  if (i === 3) {
    break;  // ここでループを抜ける！
  }

  i++;
}

console.log("ループ終了");
```

**実行結果：**
```
0
1
2
3
ループ終了
```

このコードでは、`i < 10`という条件は`true`のままですが、`i === 3`になった時点で`break`が実行され、ループを抜けています。

### 日常生活での例え

break文は、日常生活の中でもよく見られる考え方です。

**例1：宝探し**
```
while (まだ箱がある) {
  箱を開ける

  if (宝が見つかった) {
    break;  // 見つかったので探すのをやめる
  }

  次の箱に移動する
}
```
→ 宝を見つけたら、まだ箱が残っていても探すのをやめます。

**例2：忘れ物探し**
```
while (部屋がある) {
  部屋に入る

  if (鍵が見つかった) {
    break;  // 見つかったので探すのをやめる
  }

  次の部屋に移動する
}
```
→ 鍵を見つけたら、すべての部屋を探す前に終了します。

**例3：クイズゲーム**
```
while (問題がある) {
  問題を出す

  if (間違えた) {
    break;  // ゲームオーバー
  }

  次の問題に進む
}
```
→ 1問でも間違えたら、残りの問題を出さずに終了します。

**プログラミングのbreak文も、まったく同じ考え方です。**

## break文の基本的な使い方

break文の基本的な構文と動作を見ていきましょう。

### 基本構文

```javascript
while (条件式) {
  処理1;

  if (特定の条件) {
    break;  // ループを抜ける
  }

  処理2;
}

// breakで抜けたらここに来る
```

**ポイント：**
- `break`は通常、`if`文の中に書きます
- `break`が実行されると、その時点でループを抜けます
- ループの次の処理（ループの外）に進みます
- `break`の後の処理2は実行されません

### 基本例：特定の値で停止

```javascript
let i = 0;

while (i < 10) {
  console.log(i);

  if (i === 5) {
    break;  // iが5になったらループを抜ける
  }

  i++;
}

console.log("ループ終了");
```

**実行結果：**
```
0
1
2
3
4
5
ループ終了
```

### 動作を詳しく見る

このコードがどのように動作するのか、1ステップずつ見ていきましょう。

**1回目（i = 0）：**
1. 条件チェック：`i < 10` → `0 < 10` は `true` → ループ実行
2. `console.log(0)` → 「0」を表示
3. `i === 5` → `0 === 5` は `false` → breakされない
4. `i++` → i は 1 になる

**2回目（i = 1）：**
1. 条件チェック：`i < 10` → `1 < 10` は `true` → ループ実行
2. `console.log(1)` → 「1」を表示
3. `i === 5` → `1 === 5` は `false` → breakされない
4. `i++` → i は 2 になる

**3回目（i = 2）：**
1. 条件チェック：`i < 10` → `2 < 10` は `true` → ループ実行
2. `console.log(2)` → 「2」を表示
3. `i === 5` → `2 === 5` は `false` → breakされない
4. `i++` → i は 3 になる

**4回目（i = 3）：**
1. 条件チェック：`i < 10` → `3 < 10` は `true` → ループ実行
2. `console.log(3)` → 「3」を表示
3. `i === 5` → `3 === 5` は `false` → breakされない
4. `i++` → i は 4 になる

**5回目（i = 4）：**
1. 条件チェック：`i < 10` → `4 < 10` は `true` → ループ実行
2. `console.log(4)` → 「4」を表示
3. `i === 5` → `4 === 5` は `false` → breakされない
4. `i++` → i は 5 になる

**6回目（i = 5）：**
1. 条件チェック：`i < 10` → `5 < 10` は `true` → ループ実行
2. `console.log(5)` → 「5」を表示
3. `i === 5` → `5 === 5` は `true` → **breakが実行される！**
4. ループを抜けて、次の処理に進む
5. `i++` は実行されない（breakの後の処理はスキップされる）

**ループ終了後：**
- `console.log("ループ終了")` → 「ループ終了」を表示

**重要なポイント：**
- `break`が実行されると、その時点で即座にループを抜けます
- `break`の後の処理（この例では`i++`）は実行されません
- 条件式（`i < 10`）がまだ`true`でも、ループを抜けることができます

## パターン1：ループを抜ける

break文の最も基本的な使い方は、**特定の条件を満たしたらループを抜ける**ことです。

### 例1：目標値に到達したら終了

```javascript
let sum = 0;
let i = 1;

while (i <= 100) {
  sum += i;

  if (sum >= 50) {
    console.log(i + "まで足したら合計が50を超えました");
    console.log("合計: " + sum);
    break;
  }

  i++;
}
```

**実行結果：**
```
10まで足したら合計が50を超えました
合計: 55
```

**動作の流れ：**
```
i=1: sum = 0 + 1 = 1 (1 < 50なので続ける)
i=2: sum = 1 + 2 = 3 (3 < 50なので続ける)
i=3: sum = 3 + 3 = 6 (6 < 50なので続ける)
...
i=9: sum = 36 + 9 = 45 (45 < 50なので続ける)
i=10: sum = 45 + 10 = 55 (55 >= 50なのでbreak!)
ループ終了
```

**ポイント：**
- 初期化：`let sum = 0`, `let i = 1`
- 条件：`i <= 100`（最大100まで）
- 更新：`i++`
- **break条件**：`sum >= 50`（合計が50以上になったら終了）
- `i`が10のときに合計が55になり、breakが実行されます

### 例2：特定の文字が見つかったら終了

```javascript
let text = "こんにちは、世界！";
let i = 0;
let found = false;

while (i < text.length) {
  console.log(i + "文字目: " + text[i]);

  if (text[i] === "、") {
    console.log("句読点が見つかりました");
    found = true;
    break;
  }

  i++;
}

console.log("検索終了");
```

**実行結果：**
```
0文字目: こ
1文字目: ん
2文字目: に
3文字目: ち
4文字目: は
5文字目: 、
句読点が見つかりました
検索終了
```

**ポイント：**
- 文字列の中から「、」を探しています
- 見つかったら、それ以上探す必要がないので`break`
- `found`フラグで「見つかった」という状態を記録

## パターン2：条件でbreak

複数の条件を組み合わせて、どれか1つでも満たしたらbreakすることができます。

### 例1：複数の終了条件

```javascript
let count = 0;

while (count < 100) {
  count++;
  console.log("カウント: " + count);

  if (count === 10) {
    console.log("10に到達したので終了");
    break;
  }

  if (count % 7 === 0) {
    console.log("7の倍数（" + count + "）が見つかったので終了");
    break;
  }
}
```

**実行結果：**
```
カウント: 1
カウント: 2
カウント: 3
カウント: 4
カウント: 5
カウント: 6
カウント: 7
7の倍数（7）が見つかったので終了
```

**このコードの終了条件：**
1. **count === 10**：カウントが10に到達した
2. **count % 7 === 0**：7の倍数が見つかった
3. **count >= 100**：while条件（最大100まで）

→ **どれか1つでも満たしたら終了**

**動作の流れ：**
```
count=1: 10でもなく、7の倍数でもない → 続ける
count=2: 10でもなく、7の倍数でもない → 続ける
...
count=7: 7の倍数！ → break実行
ループ終了
```

### 例2：エラー検出で終了

```javascript
let i = 0;
let numbers = [5, 10, 15, -1, 20, 25];

while (i < numbers.length) {
  let num = numbers[i];

  if (num < 0) {
    console.log("エラー: 負の数（" + num + "）が見つかりました");
    break;
  }

  console.log(num + "を処理しました");
  i++;
}

console.log("処理終了");
```

**実行結果：**
```
5を処理しました
10を処理しました
15を処理しました
エラー: 負の数（-1）が見つかりました
処理終了
```

**ポイント：**
- 配列の中に負の数があったらエラーとして処理を中止
- `break`でループを抜けて、それ以降の処理を行わない

## パターン3：早期終了

ユーザーの操作や特定の状況で、ループを早めに終了させるパターンです。

### 例1：ユーザーがキャンセルしたら終了

```javascript
let count = 0;

while (count < 5) {
  let input = prompt((count + 1) + "回目の入力をしてください");

  if (input === null) {
    console.log("キャンセルされました");
    break;
  }

  console.log("入力: " + input);
  count++;
}

console.log("入力処理を終了しました");
```

**動作：**
- 最大5回まで入力を受け付けます
- ユーザーがキャンセルボタンを押したら`input`は`null`になります
- `null`の場合は即座にbreakでループを抜けます

### 例2：目標達成で早期終了

```javascript
let score = 0;
let attempts = 0;
let targetScore = 100;

while (attempts < 10) {
  // 10〜30のランダムなスコアを獲得
  let earned = Math.floor(Math.random() * 21) + 10;
  score += earned;
  attempts++;

  console.log(attempts + "回目: " + earned + "点獲得（合計: " + score + "点）");

  if (score >= targetScore) {
    console.log("目標達成！" + attempts + "回で" + targetScore + "点を超えました");
    break;
  }
}

if (score < targetScore) {
  console.log("残念！" + attempts + "回で" + score + "点でした");
}
```

**実行結果の例：**
```
1回目: 15点獲得（合計: 15点）
2回目: 23点獲得（合計: 38点）
3回目: 18点獲得（合計: 56点）
4回目: 29点獲得（合計: 85点）
5回目: 21点獲得（合計: 106点）
目標達成！5回で100点を超えました
```

**ポイント：**
- 最大10回まで試行できます
- でも、100点を超えたら早期終了します
- ループを抜けた理由を判定するために、`if (score < targetScore)`で確認しています

## while (true) と break の組み合わせ

`while (true)`で無限ループを作り、`break`で抜けるパターンもよく使われます。

### 無限ループ + break のパターン

```javascript
let sum = 0;
let i = 1;

while (true) {  // 無限ループ
  sum += i;
  console.log(i + "まで: " + sum);

  if (sum >= 100) {
    console.log("合計が100を超えました");
    break;  // ここで抜ける
  }

  i++;
}
```

**実行結果：**
```
1まで: 1
2まで: 3
3まで: 6
...
13まで: 91
14まで: 105
合計が100を超えました
```

**ポイント：**
- `while (true)`は条件が常に`true`なので、無限ループになります
- でも、`break`があるので必ず抜けることができます
- **注意**：`break`を忘れると本当に無限ループになります！

### 終了コマンド待ちのパターン

```javascript
while (true) {
  let command = prompt("コマンドを入力してください（'exit'で終了）");

  if (command === "exit") {
    console.log("プログラムを終了します");
    break;
  }

  if (command === null) {
    console.log("キャンセルされました");
    break;
  }

  console.log("実行: " + command);
}

console.log("終了しました");
```

**動作：**
- 無限ループで入力を待ち続けます
- `"exit"`と入力するか、キャンセルボタンを押すとbreakで抜けます
- それ以外の入力は処理して、また入力を待ちます

## フラグ変数でループの終了理由を判定

ループを抜けた後、**なぜ抜けたのか**を判定する必要がある場合、フラグ変数を使います。

### フラグ変数とは

**フラグ変数**とは、ある状態を`true`/`false`で記録する変数のことです。

```javascript
let found = false;  // 見つかったかどうかのフラグ
let success = false;  // 成功したかどうかのフラグ
let completed = false;  // 完了したかどうかのフラグ
```

### 例：検索が成功したかどうかを判定

```javascript
let targetNumber = 42;
let found = false;
let attempts = 0;
let maxAttempts = 5;

while (attempts < maxAttempts) {
  let guess = prompt("数字を当ててください（1-100）");
  attempts++;

  if (guess === null) {
    console.log("ゲームをキャンセルしました");
    break;
  }

  let number = parseInt(guess);

  if (number === targetNumber) {
    console.log("正解です！" + attempts + "回目で当たりました。");
    found = true;  // フラグを立てる
    break;
  } else if (number < targetNumber) {
    console.log("もっと大きい数です");
  } else {
    console.log("もっと小さい数です");
  }
}

// ループを抜けた後の処理
if (found) {
  console.log("おめでとうございます！");
} else if (attempts >= maxAttempts) {
  console.log("残念！正解は" + targetNumber + "でした。");
} else {
  console.log("ゲームを中断しました");
}
```

**フラグ変数の使い方：**
1. **初期化**：`let found = false`（最初は「見つかっていない」）
2. **成功時にフラグを立てる**：`found = true`
3. **ループ後に判定**：`if (found)`で成功したかチェック

**ループを抜ける3つの理由：**
1. **正解した**：`found`が`true`
2. **試行回数上限**：`attempts >= maxAttempts`
3. **キャンセル**：上記のどちらでもない

## break文の注意点

break文を使う際に注意すべきポイントを確認しましょう。

### 注意点1：breakは最も内側のループのみを抜ける

```javascript
let i = 0;

while (i < 3) {
  console.log("外側のループ: " + i);

  let j = 0;
  while (j < 3) {
    console.log("  内側のループ: " + j);

    if (j === 1) {
      break;  // 内側のループだけを抜ける
    }

    j++;
  }

  i++;
}
```

**実行結果：**
```
外側のループ: 0
  内側のループ: 0
  内側のループ: 1
外側のループ: 1
  内側のループ: 0
  内側のループ: 1
外側のループ: 2
  内側のループ: 0
  内側のループ: 1
```

**ポイント：**
- 内側のループで`break`を実行しても、外側のループは続きます
- 外側のループも抜けたい場合は、外側のループでも`break`が必要です

### 注意点2：breakの後の処理は実行されない

```javascript
let i = 0;

while (i < 10) {
  if (i === 5) {
    break;  // ここで抜ける
  }

  console.log(i);  // breakの前に書く
  i++;
}
```

**実行結果：**
```
0
1
2
3
4
```

**重要：**
- `break`が実行されると、その後の処理（`console.log`と`i++`）はスキップされます
- だから、`i === 5`のときは「5」が表示されません
- 表示したい場合は、`break`の前に`console.log`を書く必要があります

### 注意点3：while条件とbreakの関係

```javascript
let i = 0;

while (i < 10) {  // 条件は i < 10
  if (i === 3) {
    break;  // i が 3 のときに抜ける
  }
  i++;
}

console.log("最終的なiの値: " + i);  // 3
```

**実行結果：**
```
最終的なiの値: 3
```

**ポイント：**
- `break`で抜けた場合、while条件（`i < 10`）の評価は行われません
- `i`が3のときにループを抜けるので、最終的な`i`の値は3です
- while条件では`i < 10`（iが10未満）ですが、実際には3で終了しています

## 実践例：脱出ゲーム

break文を使って、脱出ゲームを作ってみましょう。

### ゲームの仕様

- 5つのアイテムの中から、正しいアイテムを選ぶ
- 最大5回まで選択できる
- 正解したら脱出成功（break）
- キャンセルしたらゲーム終了（break）
- 5回使い切ったら失敗

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>脱出ゲーム</title>
</head>
<body>
    <h1>部屋からの脱出</h1>
    <p>正しいアイテムを選んで部屋から脱出しましょう</p>
    <button id="startGame">ゲーム開始</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let startGame = document.getElementById("startGame");
let result = document.getElementById("result");

startGame.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // ゲームの設定
  let items = ["鍵", "本", "リンゴ", "懐中電灯", "地図"];
  let correctItem = "鍵";
  let attempts = 0;
  let maxAttempts = 5;
  let escaped = false;  // 脱出成功フラグ

  // アイテムリストを表示
  result.innerHTML = "<p>アイテム: " + items.join(", ") + "</p>";

  // ゲームループ
  while (attempts < maxAttempts) {
    let choice = prompt("どのアイテムを使いますか？");
    attempts++;

    // キャンセルされた場合
    if (choice === null) {
      result.innerHTML += "<p>ゲームをキャンセルしました。</p>";
      break;  // ループを抜ける
    }

    // 正解の場合
    if (choice === correctItem) {
      result.innerHTML += "<p>正解！「" + choice + "」で扉が開きました。脱出成功！</p>";
      escaped = true;  // フラグを立てる
      break;  // ループを抜ける
    }

    // 不正解の場合
    let remaining = maxAttempts - attempts;
    if (remaining > 0) {
      result.innerHTML += "<p>「" + choice + "」では扉が開きません。残り" + remaining + "回</p>";
    }
  }

  // 試行回数を使い切った場合
  if (!escaped && attempts >= maxAttempts) {
    result.innerHTML += "<p>残念！チャンスを使い切りました。正解は「" + correctItem + "」でした。</p>";
  }
});
```

### コードの詳しい説明

**1. ゲームの設定**
```javascript
let items = ["鍵", "本", "リンゴ", "懐中電灯", "地図"];
let correctItem = "鍵";
let attempts = 0;
let maxAttempts = 5;
let escaped = false;
```
- `items`：選べるアイテムのリスト
- `correctItem`：正解のアイテム
- `attempts`：試行回数（何回選んだか）
- `maxAttempts`：最大試行回数（5回まで）
- `escaped`：脱出成功フラグ（最初は`false`）

**2. ゲームループ**
```javascript
while (attempts < maxAttempts) {
  // ゲーム処理
}
```
- 最大5回まで繰り返します
- でも、正解したりキャンセルしたら`break`で抜けます

**3. キャンセル時の処理**
```javascript
if (choice === null) {
  result.innerHTML += "<p>ゲームをキャンセルしました。</p>";
  break;
}
```
- `prompt()`がキャンセルされると`null`が返されます
- キャンセルされたら、メッセージを表示して`break`でループを抜けます

**4. 正解時の処理**
```javascript
if (choice === correctItem) {
  result.innerHTML += "<p>正解！「" + choice + "」で扉が開きました。脱出成功！</p>";
  escaped = true;
  break;
}
```
- 正解の場合、成功メッセージを表示します
- `escaped`フラグを`true`にします（脱出成功！）
- `break`でループを抜けます

**5. 不正解時の処理**
```javascript
let remaining = maxAttempts - attempts;
if (remaining > 0) {
  result.innerHTML += "<p>「" + choice + "」では扉が開きません。残り" + remaining + "回</p>";
}
```
- 残り回数を計算します
- まだチャンスがある場合は、残り回数を表示します

**6. ループ後の処理**
```javascript
if (!escaped && attempts >= maxAttempts) {
  result.innerHTML += "<p>残念！チャンスを使い切りました。正解は「" + correctItem + "」でした。</p>";
}
```
- `escaped`が`false`（脱出できなかった）かつ
- `attempts >= maxAttempts`（試行回数を使い切った）
- → 失敗メッセージを表示

**ループを抜ける3つの理由：**
1. **正解した**：`escaped`が`true`
2. **キャンセルした**：キャンセル時のbreakが実行された
3. **試行回数を使い切った**：while条件が`false`になった

## まとめ

お疲れ様でした。今回のレッスンでは、break文について学びました。

### 学んだこと

**1. break文の役割**
- **ループを抜ける**：`break`文は、ループを即座に終了させる命令です
- **条件と無関係**：while条件が`true`でも、`break`でループを抜けることができます
- **次の処理に進む**：`break`が実行されると、ループの次の処理（ループの外）に進みます

**2. ループの制御**
- **if文と組み合わせ**：特定の条件が満たされたときだけbreakを実行します
- **複数の終了条件**：複数の`if`文で、それぞれ異なる条件でbreakできます
- **while条件との違い**：while条件はループの最初にチェック、breakはループの途中で実行

**3. 早期終了のパターン**
- **目標達成**：目的を達成したら、それ以上続ける必要がない
- **エラー検出**：エラーが発生したら、即座に処理を中止
- **ユーザーのキャンセル**：ユーザーが中断を選んだら、ループを終了
- **検索成功**：目的の項目を見つけたら、それ以上探さない

**4. フラグ変数の活用**
- **状態の記録**：`true`/`false`で状態を記録します
- **終了理由の判定**：ループを抜けた後、なぜ抜けたのかを判定できます
- **複数の終了理由**：正解、キャンセル、上限到達などを区別できます

**5. break文の注意点**
- **内側のループのみ**：breakは最も内側のループだけを抜けます
- **後の処理はスキップ**：breakの後の処理は実行されません
- **配置に注意**：表示したい内容はbreakの前に書きます

### カリキュラム要件の達成

- ✅ **ループを抜ける**：break文でループを途中で終了する方法を理解
- ✅ **条件でbreak**：if文と組み合わせて、条件に応じてbreakを使う仕組みを習得
- ✅ **早期終了**：目標達成、エラー検出、キャンセルなどで早期終了するパターンを学習
- ✅ **知識：break文の役割**：ループを即座に終了させる命令であることを理解
- ✅ **知識：ループの制御**：フラグ変数を使った終了理由の判定方法を習得
- ✅ **成果物：脱出ゲーム**：break文を使った実践的なゲームを実装

### 重要なポイント

**break文を使う場面：**
- 目的の項目を見つけたとき
- エラーが発生したとき
- ユーザーがキャンセルしたとき
- 目標を達成したとき

**フラグ変数の使い方：**
1. ループの前に`false`で初期化
2. 成功時に`true`に変更
3. ループ後に`if (フラグ)`で判定

**安全な使い方：**
- `while (true)`を使う場合は、必ずbreakを入れる
- 複数の終了条件を用意する（上限回数など）
- フラグ変数で終了理由を記録する

### 次のステップ

次のレッスンでは、**for文**について学びます。while文とは異なる、より簡潔なループの書き方を理解していきましょう。

break文は、ループ制御の重要な手段です。適切に使うことで、より読みやすく効率的なコードを書くことができます。

**今回学んだbreak文は、実際のWebアプリケーション開発でも頻繁に使用されます。練習問題を解いて、しっかりマスターしましょう！**
