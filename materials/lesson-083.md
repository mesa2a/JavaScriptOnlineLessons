---
title: "Lesson 083: ループの選択"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# レッスン83：ループの選択

## このレッスンで学ぶこと

### 前回の復習

前回のレッスンでは、continue文について学びました。

```javascript
// 偶数だけ表示
for (let i = 1; i <= 20; i++) {
  if (i % 2 !== 0) {
    continue;  // 奇数はスキップ
  }
  const p = document.createElement("p");
  p.textContent = i + "は偶数です";
  result.appendChild(p);
}
```

- **continue文**：現在のループ処理だけをスキップして、次のループに進む命令です。breakと異なり、ループ全体は終了しません
- **ループの部分スキップ**：特定の条件に合う場合だけ処理をスキップすることで、不要なデータを除外できます
- **フィルタリング**：偶数・奇数のフィルタリングや空の値の除外など、さまざまな場面で活用できます
- **成果物**：偶数だけ表示 - continue文を使って偶数だけをフィルタリングするプログラムを実装しました

### よくある場面

プログラミングの現場では、こんな会話がよくあります。

**新人開発者**: 「while文とfor文、どっちを使えばいいんでしょうか？」
**先輩開発者**: 「良い質問だね。ループの回数が決まっているならfor、決まっていないならwhileを使うのが基本だよ」

**新人開発者**: 「どちらでも同じことができるなら、for文だけ使えば良いのでは？」
**先輩開発者**: 「確かに技術的には可能だけど、コードの可読性が大切なんだ。適切なループを選ぶことで、コードの意図が明確になるよ」

実際の開発では：
- **SNSアプリ**：投稿を20件表示 → for文（回数が決まっている）
- **チャットアプリ**：ユーザーが"終了"と入力するまで会話を続ける → while文（回数が不明）
- **ゲーム**：10ステージをクリアする → for文（回数が決まっている）
- **検索機能**：目的のデータが見つかるまで探す → while文（回数が不明）

このように、適切なループを選ぶことで、コードの意図が明確になり、読みやすく保守しやすいプログラムになります。

### 学習目標

今回のレッスンでは、while文とfor文の使い分けについて学びます。

1. **while文とfor文の違いを理解する**
2. **使い分けの基準を学ぶ**
3. **可読性を考慮したループの選択方法を習得する**

---

## while文とfor文の復習

これまでのレッスンで、2つの主要なループ文を学んできました。ここで改めて、それぞれの特徴を確認しましょう。

### while文の基本構造

```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

**while文の特徴**：

1. **条件だけを指定**：`while (条件)`という形式で、条件だけを指定します
2. **初期化は別**：カウンタ変数の初期化は、ループの前で行います
3. **更新も別**：カウンタの更新は、ループ本体の中に書きます
4. **柔軟性が高い**：条件さえ満たせば、どんな形式のループでも作れます

**メリット**：
- 複雑な条件を扱いやすい
- ループ回数が不明な場合に最適
- 無限ループを作りやすい

**デメリット**：
- 初期化、条件、更新が分散するため、全体像が見えにくい
- 更新処理を忘れると無限ループになるリスクがある

### for文の基本構造

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

**for文の特徴**：

1. **初期化、条件、更新を1行に**：`for (初期化; 条件; 更新)`という形式で、すべてをまとめて書きます
2. **カウンタに最適**：カウンタ変数を使った繰り返しに特化しています
3. **コンパクト**：1行でループの全体像がわかります
4. **スコープ制限**：カウンタ変数がループ内でのみ有効になります

**メリット**：
- 繰り返し回数が明確な場合に読みやすい
- 更新処理を忘れにくい
- カウンタ変数のスコープが限定される

**デメリット**：
- 複雑な条件を扱う場合は読みにくくなる
- ループ回数が不明な場合は不自然になる

---

## while文が適している場面

while文は、以下のような場面で適しています。

### 場面1：繰り返し回数が事前に決まっていない

ユーザーの入力や外部条件によって、ループの回数が変わる場合はwhile文が適しています。

```javascript
let password = "";

while (password !== "secret") {
  password = prompt("パスワードを入力してください");
}

console.log("ログイン成功");
```

**実行の流れ**：

```
開始
↓
password = ""（空文字で初期化）
↓
password !== "secret"? → はい（空文字 ≠ "secret"）
↓
パスワード入力を求める（例："abc"と入力）
↓
password !== "secret"? → はい（"abc" ≠ "secret"）
↓
パスワード入力を求める（例："secret"と入力）
↓
password !== "secret"? → いいえ（"secret" === "secret"）
↓
ループ終了
↓
"ログイン成功"を表示
```

**なぜwhile文が適しているのか**：
- 何回ループするかは事前にわかりません（ユーザーが何回間違えるかわからない）
- 「正しいパスワードが入力されるまで繰り返す」という意図が明確です
- for文で書くと不自然になります

**for文で書いた場合（読みにくい）**：
```javascript
for (let password = ""; password !== "secret"; ) {
  password = prompt("パスワードを入力してください");
}
```
→ 更新部分が空で、for文の構造を活かせていません

### 場面2：条件が複雑な場合

複数の条件を組み合わせる場合、while文の方が意図が明確になります。

```javascript
let health = 100;
let energy = 50;

while (health > 0 && energy > 0) {
  console.log("戦闘中...");
  health -= 10;
  energy -= 5;
}

console.log("戦闘終了");
```

**実行の流れ**：

```
開始
↓
health = 100, energy = 50
↓
health > 0 && energy > 0? → はい（100 > 0 かつ 50 > 0）
↓
"戦闘中..."を表示
health = 90, energy = 45
↓
health > 0 && energy > 0? → はい（90 > 0 かつ 45 > 0）
↓
"戦闘中..."を表示
health = 80, energy = 40
↓
...（繰り返し）
↓
health = 10, energy = 5
↓
health > 0 && energy > 0? → はい（10 > 0 かつ 5 > 0）
↓
"戦闘中..."を表示
health = 0, energy = 0
↓
health > 0 && energy > 0? → いいえ（0 > 0 は偽）
↓
ループ終了
↓
"戦闘終了"を表示
```

**なぜwhile文が適しているのか**：
- 2つの条件（healthとenergy）を組み合わせています
- カウンタ変数がありません
- 「健康とエネルギーがある限り戦闘を続ける」という意図が明確です

### 場面3：無限ループを意図的に作る

`while (true)`で無限ループを作り、`break`で終了するパターンは、while文でよく使われます。

```javascript
while (true) {
  let command = prompt("コマンドを入力（'exit'で終了）");

  if (command === "exit") {
    break;
  }

  console.log("コマンド: " + command);
}
```

**実行の流れ**：

```
開始
↓
while (true) → 常に真なので無限ループ
↓
コマンド入力を求める（例："help"と入力）
↓
command === "exit"? → いいえ
↓
"コマンド: help"を表示
↓
while (true) → 常に真
↓
コマンド入力を求める（例："status"と入力）
↓
command === "exit"? → いいえ
↓
"コマンド: status"を表示
↓
while (true) → 常に真
↓
コマンド入力を求める（例："exit"と入力）
↓
command === "exit"? → はい
↓
break実行
↓
ループ終了
```

**なぜwhile文が適しているのか**：
- 無限ループを`while (true)`で明示的に表現できます
- ループの終了条件が途中にあることが明確です
- コマンドライン・インターフェースなどでよく使われるパターンです

---

## for文が適している場面

for文は、以下のような場面で適しています。

### 場面1：決まった回数繰り返す

繰り返し回数が明確な場合、for文が最も読みやすくなります。

```javascript
// 10回繰り返す
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

**実行の流れ**：

```
開始
↓
let i = 0（初期化）
↓
i < 10? → はい（0 < 10）
↓
console.log(0)を実行
↓
i++（i = 1）
↓
i < 10? → はい（1 < 10）
↓
console.log(1)を実行
↓
i++（i = 2）
↓
...（繰り返し）
↓
i++（i = 10）
↓
i < 10? → いいえ（10 < 10 は偽）
↓
ループ終了
```

**なぜfor文が適しているのか**：
- 「0から9まで10回繰り返す」という意図が1行でわかります
- 初期化、条件、更新がまとまっているため、読みやすいです
- カウンタ変数iのスコープがループ内に限定されます

**while文で書いた場合（冗長）**：
```javascript
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}
```
→ 3行に分散していて、for文よりも読みにくいです

### 場面2：カウンタを使った処理

カウンタ変数を使って計算する場合、for文が適しています。

```javascript
// 1から100までの合計を計算
let sum = 0;

for (let i = 1; i <= 100; i++) {
  sum += i;
}

console.log("合計: " + sum);  // 5050
```

**実行の流れ**：

```
開始
↓
sum = 0
↓
let i = 1（初期化）
↓
i <= 100? → はい（1 <= 100）
↓
sum += 1（sum = 0 + 1 = 1）
↓
i++（i = 2）
↓
i <= 100? → はい（2 <= 100）
↓
sum += 2（sum = 1 + 2 = 3）
↓
i++（i = 3）
↓
...（繰り返し）
↓
i++（i = 101）
↓
i <= 100? → いいえ（101 <= 100 は偽）
↓
ループ終了
↓
"合計: 5050"を表示
```

**なぜfor文が適しているのか**：
- 1から100まで順番に加算する処理なので、カウンタが必要です
- 繰り返し回数が100回と明確です
- for文の構造（初期化、条件、更新）が計算の流れと一致します

### 場面3：DOM要素を繰り返し作成

決まった数のHTML要素を作成する場合、for文が適しています。

```javascript
// 10個のdiv要素を作成
const container = document.getElementById("container");

for (let i = 1; i <= 10; i++) {
  const div = document.createElement("div");
  div.textContent = "アイテム" + i;
  container.appendChild(div);
}
```

**実行の流れ**：

```
開始
↓
containerを取得
↓
let i = 1（初期化）
↓
i <= 10? → はい（1 <= 10）
↓
div要素を作成
div.textContent = "アイテム1"
containerに追加
↓
i++（i = 2）
↓
i <= 10? → はい（2 <= 10）
↓
div要素を作成
div.textContent = "アイテム2"
containerに追加
↓
...（繰り返し）
↓
i++（i = 11）
↓
i <= 10? → いいえ（11 <= 10 は偽）
↓
ループ終了
```

**なぜfor文が適しているのか**：
- 10個の要素を作成すると決まっています
- カウンタ変数iを使って番号付けができます
- レッスン81で学んだループとDOMの組み合わせです

---

## 同じ処理の比較

同じ処理を、while文とfor文で書き比べてみましょう。

### 例1：1から10まで表示

**while文バージョン**
```javascript
let i = 1;
while (i <= 10) {
  console.log(i);
  i++;
}
```

**for文バージョン**
```javascript
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
```

**比較表**：

| 項目 | while文 | for文 |
|------|---------|-------|
| 初期化 | ループの前で実行 | for文の中で実行 |
| 条件 | whileの中に書く | for文の中に書く |
| 更新 | ループ本体の最後に書く | for文の中に書く |
| 行数 | 4行 | 3行 |
| 読みやすさ | やや分散 | コンパクト |

**どちらを選ぶ？**
→ **for文の方が適しています**
  - 繰り返し回数が10回と明確
  - 初期化、条件、更新が1行にまとまっている
  - カウンタ変数のスコープがループ内に限定される

### 例2：ユーザーが"quit"と入力するまで繰り返す

**while文バージョン**
```javascript
let input = "";
while (input !== "quit") {
  input = prompt("コマンドを入力");
  console.log(input);
}
```

**for文バージョン**
```javascript
for (let input = ""; input !== "quit"; ) {
  input = prompt("コマンドを入力");
  console.log(input);
}
```

**比較表**：

| 項目 | while文 | for文 |
|------|---------|-------|
| 初期化 | 自然（ループの前） | やや不自然（更新なし） |
| 条件 | 明確 | 明確だが更新部分が空 |
| 更新 | ループ内で自然に実行 | for文の更新部分が空 |
| 読みやすさ | 自然で明確 | 不自然（for文の構造を活かせない） |

**どちらを選ぶ？**
→ **while文の方が適しています**
  - 繰り返し回数が不明（ユーザーの入力次第）
  - 「"quit"が入力されるまで繰り返す」という意図が明確
  - for文の更新部分が空で、構造を活かせていない

---

## 使い分けの基準

while文とfor文を選ぶ際の基準をまとめます。

### for文を選ぶ場合

**✅ 以下の条件に当てはまる場合はfor文を選びましょう**

1. **繰り返し回数が事前に決まっている**
   ```javascript
   // 10回繰り返す
   for (let i = 0; i < 10; i++) {
     console.log(i);
   }
   ```

2. **カウンタ変数を使う**
   ```javascript
   // 1から100までの合計
   let sum = 0;
   for (let i = 1; i <= 100; i++) {
     sum += i;
   }
   ```

3. **0から始めてNまで、という単純な繰り返し**
   ```javascript
   // 20個のHTML要素を作成
   for (let i = 0; i < 20; i++) {
     const div = document.createElement("div");
     div.textContent = "アイテム" + (i + 1);
     container.appendChild(div);
   }
   ```

4. **配列の要素を順番に処理する（後のレッスンで学びます）**
   ```javascript
   // 配列の全要素を処理
   const fruits = ["りんご", "みかん", "ぶどう"];
   for (let i = 0; i < fruits.length; i++) {
     console.log(fruits[i]);
   }
   ```

**実際の使用例**：
- SNSタイムラインに投稿を20件表示
- 1から100までの数字を合計
- カレンダーに31日分の日付を表示
- ゲームの10ステージを順番に処理

### while文を選ぶ場合

**✅ 以下の条件に当てはまる場合はwhile文を選びましょう**

1. **繰り返し回数が事前にわからない**
   ```javascript
   // 正解するまで質問
   let answer = "";
   while (answer !== "東京") {
     answer = prompt("日本の首都は？");
   }
   ```

2. **条件が複雑**
   ```javascript
   // 複数の条件を組み合わせる
   let health = 100;
   let energy = 50;
   while (health > 0 && energy > 0) {
     console.log("戦闘中...");
     health -= 10;
     energy -= 5;
   }
   ```

3. **ユーザー入力に依存する**
   ```javascript
   // ユーザーが"quit"と入力するまで
   let command = "";
   while (command !== "quit") {
     command = prompt("コマンドを入力");
     console.log("入力: " + command);
   }
   ```

4. **無限ループ + break のパターン**
   ```javascript
   // 条件をループ内でチェック
   while (true) {
     let value = getData();
     if (value === null) break;
     console.log(value);
   }
   ```

**実際の使用例**：
- チャットアプリでユーザーが"終了"と入力するまで会話を続ける
- ログイン画面で正しいパスワードが入力されるまで繰り返す
- ゲームでプレイヤーのHPが0になるまで戦闘を続ける
- 検索機能で目的のデータが見つかるまで探索を続ける

### 判断フローチャート

```
繰り返し回数が決まっている？
├─ はい → カウンタ変数を使う？
│          ├─ はい → for文を使う
│          └─ いいえ → どちらでも可（通常はfor文）
│
└─ いいえ → ユーザー入力や条件に依存？
           ├─ はい → while文を使う
           └─ いいえ → 条件が複雑？
                      ├─ はい → while文を使う
                      └─ いいえ → どちらでも可
```

---

## 可読性の考慮

コードの読みやすさは非常に重要です。適切なループを選ぶことで、コードの意図が明確になります。

### 読みにくい例1：for文を無理に使った場合

```javascript
// ❌ 読みにくい：for文を無理に使っている
for (let password = ""; password !== "secret"; ) {
  password = prompt("パスワードを入力");
}
```

**なぜ読みにくいのか**：
- for文の更新部分が空で、構造を活かせていません
- 「繰り返し回数が不明」という状況に、for文の構造が合いません
- パッと見て何をしているのかわかりにくいです

**✅ 読みやすい改善版：while文を使う**

```javascript
// ✅ 読みやすい：while文で意図が明確
let password = "";
while (password !== "secret") {
  password = prompt("パスワードを入力");
}
```

**なぜ読みやすいのか**：
- 「正しいパスワードが入力されるまで繰り返す」という意図が明確です
- while文の構造が、この処理の性質と一致しています
- 初心者が見ても、何をしているのか理解しやすいです

### 読みにくい例2：while文を無理に使った場合

```javascript
// ❌ 読みにくい：while文を無理に使っている
let i = 1;
while (i <= 10) {
  console.log(i);
  i++;
}
```

**なぜ読みにくいのか**：
- 初期化、条件、更新が分散していて、全体像がわかりにくいです
- 「10回繰り返す」という単純な処理に、3行も使っています
- 更新処理（`i++`）を忘れると無限ループになるリスクがあります

**✅ 読みやすい改善版：for文を使う**

```javascript
// ✅ 読みやすい：for文で全体像が明確
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
```

**なぜ読みやすいのか**：
- 初期化、条件、更新が1行にまとまっていて、全体像が一目でわかります
- 「1から10まで繰り返す」という意図が明確です
- カウンタ変数のスコープがループ内に限定されます

### 読みやすさの比較表

| 状況 | 適切なループ | 理由 |
|------|-------------|------|
| 1から10まで表示 | for文 | 繰り返し回数が明確 |
| 正しいパスワードまで入力 | while文 | 繰り返し回数が不明 |
| 配列の全要素を処理 | for文 | 要素数が明確 |
| ユーザーが"quit"と入力まで | while文 | 入力に依存 |
| 1から100の合計 | for文 | カウンタ使用 |
| HPが0になるまで戦闘 | while文 | 条件駆動 |

---

## 実践例：ループ比較プログラム

HTMLとJavaScriptを組み合わせて、while文とfor文の違いを実感できるプログラムを作ってみましょう。

### HTML（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ループ比較</title>
</head>
<body>
    <h1>ループの比較</h1>
    <h2>for文を使った場合</h2>
    <button id="useFor">1から10まで表示（for文）</button>
    <div id="forResult"></div>

    <h2>while文を使った場合</h2>
    <button id="useWhile">1から10まで表示（while文）</button>
    <div id="whileResult"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript（script.js）

```javascript
let useFor = document.getElementById("useFor");
let forResult = document.getElementById("forResult");
let useWhile = document.getElementById("useWhile");
let whileResult = document.getElementById("whileResult");

// for文を使った実装
useFor.addEventListener("click", function() {
  forResult.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    let p = document.createElement("p");
    p.textContent = i;
    forResult.appendChild(p);
  }
});

// while文を使った実装
useWhile.addEventListener("click", function() {
  whileResult.innerHTML = "";

  let i = 1;
  while (i <= 10) {
    let p = document.createElement("p");
    p.textContent = i;
    whileResult.appendChild(p);
    i++;
  }
});
```

### コードの詳しい説明

**for文バージョン**

```javascript
for (let i = 1; i <= 10; i++) {
  let p = document.createElement("p");
  p.textContent = i;
  forResult.appendChild(p);
}
```

**実行の流れ**：

```
開始
↓
let i = 1（初期化）
↓
i <= 10? → はい（1 <= 10）
↓
p要素を作成
p.textContent = 1
forResultに追加
↓
i++（i = 2）
↓
i <= 10? → はい（2 <= 10）
↓
p要素を作成
p.textContent = 2
forResultに追加
↓
...（繰り返し）
↓
i++（i = 11）
↓
i <= 10? → いいえ（11 <= 10 は偽）
↓
ループ終了
```

**特徴**：
- 初期化、条件、更新が1行にまとまっている
- ループ処理だけに集中できる
- コンパクトで読みやすい
- カウンタ変数iのスコープがループ内に限定される

**while文バージョン**

```javascript
let i = 1;
while (i <= 10) {
  let p = document.createElement("p");
  p.textContent = i;
  whileResult.appendChild(p);
  i++;
}
```

**実行の流れ**：

```
開始
↓
let i = 1（ループの前で初期化）
↓
i <= 10? → はい（1 <= 10）
↓
p要素を作成
p.textContent = 1
whileResultに追加
i++（i = 2）
↓
i <= 10? → はい（2 <= 10）
↓
p要素を作成
p.textContent = 2
whileResultに追加
i++（i = 3）
↓
...（繰り返し）
↓
i++（i = 11）
↓
i <= 10? → いいえ（11 <= 10 は偽）
↓
ループ終了
```

**特徴**：
- 初期化、条件、更新が分散している
- より柔軟な制御が可能
- この例では、for文の方が適している
- 更新処理（`i++`）を忘れると無限ループになる

**どちらを選ぶべきか**

この例では、「1から10まで表示する」という決まった回数のループなので、**for文の方が適しています**。

**for文のメリット**：
- コンパクトで読みやすい
- 初期化・条件・更新が1箇所にまとまっている
- カウンタ変数のスコープがループ内に限定される
- 更新処理を忘れる心配が少ない

**while文が適している場合**：
- ユーザー入力や複雑な条件によってループ回数が変わる
- 条件が複雑で、for文では表現しにくい
- 無限ループ + break のパターン

---

## チーム開発での考慮事項

実際の開発現場では、チーム全体でコードの一貫性を保つことが重要です。

### コーディング規約の例

多くのプロジェクトでは、以下のようなルールがあります。

#### 1. 決まった回数のループにはfor文を使う

```javascript
// ✅ 推奨：for文を使う
for (let i = 0; i < 10; i++) {
  console.log(i);
}

// ❌ 非推奨：while文を使う（冗長）
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}
```

**理由**：
- for文の方がコンパクトで読みやすい
- チームメンバーが慣れ親しんだ形式
- カウンタ変数のスコープが限定される

#### 2. 条件駆動のループにはwhile文を使う

```javascript
// ✅ 推奨：while文を使う
while (userInput !== "quit") {
  userInput = prompt("入力してください");
}

// ❌ 非推奨：for文を使う（不自然）
for (; userInput !== "quit"; ) {
  userInput = prompt("入力してください");
}
```

**理由**：
- while文の方が意図が明確
- for文の構造を活かせていない
- 条件駆動のループに適した形式

#### 3. 無限ループはwhile(true)を使う

```javascript
// ✅ 推奨：while(true)を使う
while (true) {
  if (condition) break;
  // 処理
}

// ❌ 非推奨：for文を使う
for (;;) {
  if (condition) break;
  // 処理
}
```

**理由**：
- `while (true)`の方が意図が明確
- チームメンバーが理解しやすい
- 無限ループのパターンとして一般的

### コードレビューでのチェックポイント

実際の開発現場では、コードレビューで以下の点をチェックします。

**✅ 良いコード**：

```javascript
// 繰り返し回数が明確な場合はfor文
for (let i = 0; i < items.length; i++) {
  processItem(items[i]);
}

// 条件駆動の場合はwhile文
while (hasMoreData()) {
  const data = fetchData();
  processData(data);
}
```

**❌ 改善が必要なコード**：

```javascript
// 繰り返し回数が明確なのにwhile文（冗長）
let i = 0;
while (i < items.length) {
  processItem(items[i]);
  i++;
}

// 条件駆動なのにfor文（不自然）
for (; hasMoreData(); ) {
  const data = fetchData();
  processData(data);
}
```

---

## よくある間違いとその対策

初心者がよくやる間違いと、その対策を見ていきましょう。

### 間違い1：while文で更新を忘れる

```javascript
// ❌ 間違い：更新を忘れて無限ループ
let i = 0;
while (i < 10) {
  console.log(i);
  // i++を忘れた！
}
```

**何が起こるか**：
- iが0のまま変わらない
- `i < 10`が常に真になる
- 無限ループになってブラウザがフリーズ

**✅ 対策**：

```javascript
// ✅ 正しい：更新を忘れない
let i = 0;
while (i < 10) {
  console.log(i);
  i++;  // 必ず更新する
}
```

**さらに良い方法**：

```javascript
// ✅ より良い：for文を使えば更新忘れを防げる
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

### 間違い2：不適切なループの選択

```javascript
// ❌ 間違い：繰り返し回数が明確なのにwhile文
let count = 0;
while (count < 100) {
  console.log(count);
  count++;
}
```

**何が問題か**：
- 繰り返し回数が100回と明確なのに、while文を使っている
- 初期化、条件、更新が分散していて読みにくい
- for文を使う方が適切

**✅ 対策**：

```javascript
// ✅ 正しい：for文を使う
for (let count = 0; count < 100; count++) {
  console.log(count);
}
```

### 間違い3：条件式の書き間違い

```javascript
// ❌ 間違い：等号を忘れて1回少なくなる
for (let i = 1; i < 10; i++) {
  console.log(i);  // 1から9まで（10が含まれない）
}
```

**何が問題か**：
- `i < 10`だと、iが9のときまでしか実行されない
- 1から10まで表示したいなら、`i <= 10`とする必要がある

**✅ 対策**：

```javascript
// ✅ 正しい：<= を使う
for (let i = 1; i <= 10; i++) {
  console.log(i);  // 1から10まで
}
```

---

## 練習問題

### 課題：ループ比較

for文とwhile文の両方を使って、1から10までの数字を表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-083/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 要件

1. **for文ボタン**をクリックすると、for文を使って1から10までの数字を表示する
2. **while文ボタン**をクリックすると、while文を使って1から10までの数字を表示する
3. 両方とも同じ結果になることを確認する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-083
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

ループを選択する際のポイントを確認しましょう。

#### for文の実装

```javascript
// 初期化、条件、更新を1行にまとめる
for (let i = 1; i <= 10; i++) {
  // p要素を作成
  // テキストをセット
  // 結果に追加
}
```

**ポイント**：
- `let i = 1`で1から開始
- `i <= 10`で10以下の間ループ
- `i++`で1ずつ増加
- カウンタ変数がループ内でのみ有効

#### while文の実装

```javascript
// カウンタ変数をループの前で宣言
let i = 1;

// 条件式だけをwhileに書く
while (i <= 10) {
  // p要素を作成
  // テキストをセット
  // 結果に追加

  // ループ内で必ず更新処理を入れる
  i++;
}
```

**ポイント**：
- ループの前で`let i = 1`を実行
- `while (i <= 10)`で条件だけを指定
- ループの最後で必ず`i++`を実行（忘れると無限ループ）

#### 両者の比較

- 同じ結果（1から10まで表示）になることを確認
- どちらが読みやすいか考える
- この場合、for文の方が適していることを理解する

### 解答例

**HTML（index.html）**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 083</title>
</head>
<body>
    <h1>ループの比較</h1>
    <h2>for文を使った場合</h2>
    <button id="useFor">1から10まで表示（for文）</button>
    <div id="forResult"></div>

    <h2>while文を使った場合</h2>
    <button id="useWhile">1から10まで表示（while文）</button>
    <div id="whileResult"></div>

    <script src="script.js"></script>
</body>
</html>
```

**JavaScript（script.js）**

```javascript
let useFor = document.getElementById("useFor");
let forResult = document.getElementById("forResult");
let useWhile = document.getElementById("useWhile");
let whileResult = document.getElementById("whileResult");

// for文を使った実装
useFor.addEventListener("click", function() {
  // 結果をクリア
  forResult.innerHTML = "";

  // for文で1から10まで表示
  for (let i = 1; i <= 10; i++) {
    let p = document.createElement("p");
    p.textContent = i;
    forResult.appendChild(p);
  }
});

// while文を使った実装
useWhile.addEventListener("click", function() {
  // 結果をクリア
  whileResult.innerHTML = "";

  // while文で1から10まで表示
  let i = 1;
  while (i <= 10) {
    let p = document.createElement("p");
    p.textContent = i;
    whileResult.appendChild(p);
    i++;
  }
});
```

### 解説

このコードでは、同じ処理をfor文とwhile文の両方で実装しています。

#### for文バージョン

```javascript
for (let i = 1; i <= 10; i++) {
  let p = document.createElement("p");
  p.textContent = i;
  forResult.appendChild(p);
}
```

**実行の詳細**：

1. **初期化**：`let i = 1`でカウンタを1から開始
2. **条件チェック**：`i <= 10`で10以下の間ループ
3. **処理実行**：
   - p要素を作成
   - テキストをiの値にセット
   - forResultに追加
4. **更新**：`i++`で1ずつ増加
5. **2に戻る**

**特徴**：
- すべてが1行にまとまっていて、ループの全体像が一目でわかります
- カウンタ変数iのスコープがループ内に限定されます
- 更新処理を忘れる心配が少ないです
- コンパクトで読みやすいです

#### while文バージョン

```javascript
let i = 1;
while (i <= 10) {
  let p = document.createElement("p");
  p.textContent = i;
  whileResult.appendChild(p);
  i++;
}
```

**実行の詳細**：

1. **初期化**：ループの前で`let i = 1`を実行
2. **条件チェック**：`while (i <= 10)`で条件を確認
3. **処理実行**：
   - p要素を作成
   - テキストをiの値にセット
   - whileResultに追加
   - `i++`で更新（重要！）
4. **2に戻る**

**特徴**：
- 初期化、条件、更新が分散しています
- より柔軟な制御が可能です
- 更新処理（`i++`）を忘れると無限ループになります
- この例では、for文より冗長です

#### どちらを選ぶべきか

この例では、「1から10まで表示する」という決まった回数のループなので、**for文の方が適しています**。

**for文が適している理由**：
- 繰り返し回数が10回と明確
- 初期化・条件・更新が1箇所にまとまっている
- カウンタ変数のスコープがループ内に限定される
- 更新処理を忘れる心配が少ない
- コンパクトで読みやすい

**while文が適している場合**：
- ユーザー入力や外部条件によってループ回数が変わる
- 条件が複雑で、for文では表現しにくい
- 無限ループ + break のパターン

---

## まとめ

お疲れ様でした。今回のレッスンでは、ループの選択について学びました。

### 今回学んだキーポイント

1. **while文とfor文の違い**
   - **while文**：条件だけを指定。初期化と更新は別々に書く。柔軟性が高い
   - **for文**：初期化、条件、更新を1行にまとめて書く。カウンタ使用に最適

2. **ループの使い分け**
   - **for文を選ぶ場合**：繰り返し回数が決まっている、カウンタを使う、単純な繰り返し
   - **while文を選ぶ場合**：繰り返し回数が不明、条件が複雑、ユーザー入力に依存、無限ループ+break

3. **適切な選択の重要性**
   - 決まった回数ならfor文、ユーザー入力や複雑な条件ならwhile文を選びます
   - コードの意図を明確にすることができます
   - チーム開発では一貫性も重要です

4. **可読性の考慮**
   - 適切なループを選ぶことで、コードが読みやすくなり、保守しやすくなります
   - 不適切なループの選択は、コードの意図を不明確にします
   - チームメンバーが理解しやすいコードを書くことが大切です

5. **実践的な判断基準**
   - カウンタの有無
   - 繰り返し回数の明確さ
   - 条件の複雑さ
   - これらを考慮して、最適なループを選択します

ループの選択は、プログラミングの基本的なスキルです。適切なループを選ぶことで、より読みやすく保守しやすいコードを書くことができます。

### カリキュラム項目の確認

- ✅ **while vs for**：while文とfor文の違いを理解し、それぞれの特徴を学びました
- ✅ **使い分けの基準**：繰り返し回数、カウンタの有無、条件の複雑さなどの基準を習得しました
- ✅ **可読性の考慮**：適切なループを選ぶことで、コードの可読性が向上することを理解しました
- ✅ **知識**：ループの使い分け、適切な選択の判断基準を身につけました
- ✅ **成果物**：ループ比較 - for文とwhile文の両方を使った比較プログラムを実装しました

### 次のレッスンの予告

次のレッスンでは、**ループのパフォーマンス**について学びます。

- ループの効率
- 不要な処理を避ける
- 最適化の基礎

効率的なコードの書き方を理解していきましょう。
