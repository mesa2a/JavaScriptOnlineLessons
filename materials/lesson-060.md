---
title: "Lesson 060: 条件分岐のリファクタリング"
author: "JavaScript学習教材"
date: "2025-11-20"
---

## 今回の学習

### 前回の復習

前回のレッスンでは、TruthyとFalsyについて学びました。JavaScriptで「偽」として扱われる6つの値（false, 0, "", null, undefined, NaN）と、それ以外のTruthy値について理解しました。暗黙的な真偽判定と明示的な判定の違いを学び、適切な場面で使い分ける方法を習得しました。

### 今回の目標

今回のレッスンでは、**条件分岐のリファクタリング**について学びます。リファクタリングとは、プログラムの動作を変えずに、コードの構造を改善することです。条件分岐は複雑になりがちなので、リファクタリングによってコードを読みやすく、保守しやすくする技術が重要です。

今回のレッスンで習得する内容は以下の通りです。

- 重複コードの削除方法
- 条件の整理とシンプル化
- 関数化による再利用

## リファクタリングとは

**リファクタリング**とは、プログラムの外部から見た動作を変えずに、内部のコード構造を改善することです。料理に例えると、料理の味を変えずに、調理手順を効率化したり、キッチンを整理したりするようなものです。

リファクタリングの目的は以下の通りです。

- **可読性の向上**: コードを読みやすくする
- **保守性の向上**: 修正や機能追加をしやすくする
- **バグの削減**: シンプルなコードはバグが入り込みにくい
- **再利用性の向上**: 同じコードを何度も書かずに済む

条件分岐は、プログラムが複雑になる主な原因の1つです。適切にリファクタリングすることで、理解しやすく、メンテナンスしやすいコードにできます。

## 重複の削除

プログラムを書いていると、同じようなコードが複数の場所に現れることがあります。これを**コードの重複**と呼びます。

以下のような成績判定のコードを見てください。

```javascript
function checkScore() {
  let score = Number(document.getElementById("scoreInput").value);

  if (score >= 90) {
    document.getElementById("result").textContent = "評価: A";
    document.getElementById("result").style.color = "blue";
    document.getElementById("result").style.fontWeight = "bold";
  } else if (score >= 80) {
    document.getElementById("result").textContent = "評価: B";
    document.getElementById("result").style.color = "blue";
    document.getElementById("result").style.fontWeight = "bold";
  } else if (score >= 70) {
    document.getElementById("result").textContent = "評価: C";
    document.getElementById("result").style.color = "blue";
    document.getElementById("result").style.fontWeight = "bold";
  } else if (score >= 60) {
    document.getElementById("result").textContent = "評価: D";
    document.getElementById("result").style.color = "blue";
    document.getElementById("result").style.fontWeight = "bold";
  } else {
    document.getElementById("result").textContent = "評価: F";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.fontWeight = "bold";
  }
}
```

このコードでは、`document.getElementById("result")`が何度も繰り返されています。また、`style.color`や`style.fontWeight`の設定も重複しています。

### DRY原則

プログラミングには**DRY原則**（Don't Repeat Yourself - 繰り返しを避けよ）という重要な考え方があります。同じコードを何度も書くのではなく、1か所にまとめることで、以下のメリットが得られます。

- **変更が簡単**: 修正箇所が1か所で済む
- **バグが減る**: 同じコードを複数書くと、修正漏れが起きやすい
- **コードが短くなる**: 読みやすくなる

先ほどのコードをリファクタリングしてみましょう。

```javascript
function checkScore() {
  let score = Number(document.getElementById("scoreInput").value);
  let result = document.getElementById("result");
  let grade;

  // 評価を決定
  if (score >= 90) {
    grade = "A";
  } else if (score >= 80) {
    grade = "B";
  } else if (score >= 70) {
    grade = "C";
  } else if (score >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }

  // 表示を更新（共通処理）
  result.textContent = "評価: " + grade;
  result.style.fontWeight = "bold";

  // 色の設定
  if (grade === "F") {
    result.style.color = "red";
  } else {
    result.style.color = "blue";
  }
}
```

改善点を見ていきましょう。

1. **要素の取得を1回に**: `document.getElementById("result")`を変数`result`に保存し、1回だけ取得するようにしました

2. **評価の決定と表示を分離**: まず評価（A、B、C等）を決定し、その後で表示を更新するようにしました

3. **共通処理をまとめる**: `fontWeight`の設定など、すべての評価で共通する処理を1か所にまとめました

4. **条件を簡素化**: 色の設定は、Fかそれ以外かの2択なので、シンプルなif-else文にしました

これにより、コードが短くなり、修正も簡単になりました。例えば、表示形式を変更したい場合、1か所を修正すれば良くなります。

## 条件の整理

条件分岐が複雑になると、読みにくくなります。条件を整理することで、コードの意図が明確になります。

### 複雑な条件を変数に分ける

複雑な条件式を、意味のある名前の変数に分けることで、コードが読みやすくなります。

```javascript
// 複雑な条件（読みにくい）
if (age >= 18 && hasLicense && experience >= 2 && !hasPenalty) {
  console.log("運転できます");
}

// 条件を変数に分ける（読みやすい）
let isAdult = age >= 18;
let hasRequiredLicense = hasLicense;
let hasEnoughExperience = experience >= 2;
let hasNoViolation = !hasPenalty;

let canDrive = isAdult && hasRequiredLicense && hasEnoughExperience && hasNoViolation;

if (canDrive) {
  console.log("運転できます");
}
```

変数名を見ただけで、何をチェックしているのかが分かるようになりました。

### 条件の順序を整理する

条件の順序を工夫することで、コードが理解しやすくなります。

```javascript
// 整理前（頻度の低い条件が先）
function getDiscount(price, isMember, age) {
  if (age >= 65) {
    return price * 0.2; // シニア割引20%
  } else if (isMember) {
    return price * 0.1; // 会員割引10%
  } else {
    return 0;
  }
}

// 整理後（一般的な条件から）
function getDiscount(price, isMember, age) {
  // 通常価格
  if (!isMember && age < 65) {
    return 0;
  }

  // 会員割引
  if (isMember && age < 65) {
    return price * 0.1;
  }

  // シニア割引
  if (age >= 65) {
    return price * 0.2;
  }

  return 0;
}
```

実際には、早期リターンを使うとさらに読みやすくなります。

```javascript
function getDiscount(price, isMember, age) {
  // シニア割引（最優先）
  if (age >= 65) {
    return price * 0.2;
  }

  // 会員割引
  if (isMember) {
    return price * 0.1;
  }

  // 割引なし
  return 0;
}
```

### マジックナンバーの排除

コードの中に直接書かれた数値を**マジックナンバー**と呼びます。意味が分かりにくいので、定数にすると良いでしょう。

```javascript
// マジックナンバー（意味が分かりにくい）
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
}

// 定数を使う（意味が明確）
const GRADE_A_THRESHOLD = 90;
const GRADE_B_THRESHOLD = 80;

if (score >= GRADE_A_THRESHOLD) {
  grade = "A";
} else if (score >= GRADE_B_THRESHOLD) {
  grade = "B";
}
```

定数名を見れば、「90点がA評価の基準値」だと分かります。また、基準を変更する際も、定数の値を変えるだけで済みます。

## 関数化による再利用

同じような処理が複数の場所にある場合、関数にまとめることで再利用できます。

### 判定ロジックの関数化

以下のように、判定ロジックを関数にまとめることができます。

```javascript
// 関数化前（重複が多い）
function checkMorningGreeting() {
  let hour = new Date().getHours();
  if (hour >= 6 && hour < 12) {
    document.getElementById("result").textContent = "おはようございます";
  } else {
    document.getElementById("result").textContent = "こんにちは";
  }
}

function checkAfternoonGreeting() {
  let hour = new Date().getHours();
  if (hour >= 12 && hour < 18) {
    document.getElementById("result").textContent = "こんにちは";
  } else {
    document.getElementById("result").textContent = "こんばんは";
  }
}

// 関数化後（再利用可能）
function getGreeting() {
  let hour = new Date().getHours();

  if (hour >= 6 && hour < 12) {
    return "おはようございます";
  } else if (hour >= 12 && hour < 18) {
    return "こんにちは";
  } else {
    return "こんばんは";
  }
}

function showGreeting() {
  let greeting = getGreeting();
  document.getElementById("result").textContent = greeting;
}
```

関数`getGreeting()`を作ることで、挨拶の判定ロジックを再利用できるようになりました。

### 表示処理の関数化

表示に関する処理も関数にまとめることができます。

```javascript
// 表示処理を関数化
function displayMessage(message, color) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = color;
}

function checkScore() {
  let score = Number(document.getElementById("scoreInput").value);

  if (score >= 80) {
    displayMessage("合格です", "green");
  } else {
    displayMessage("不合格です", "red");
  }
}
```

`displayMessage()`関数を作ることで、表示に関する処理が1か所にまとまりました。表示形式を変更する際も、この関数だけを修正すれば良くなります。

## 実践：リファクタリング前後の比較

それでは、実際にリファクタリング前後のコードを比較してみましょう。

### リファクタリング前のコード

```javascript
function checkInput() {
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let email = document.getElementById("emailInput").value;

  if (name === "") {
    document.getElementById("result").textContent = "名前を入力してください";
    document.getElementById("result").style.color = "red";
  } else if (age === "") {
    document.getElementById("result").textContent = "年齢を入力してください";
    document.getElementById("result").style.color = "red";
  } else if (Number(age) < 18) {
    document.getElementById("result").textContent = "18歳以上である必要があります";
    document.getElementById("result").style.color = "red";
  } else if (email === "") {
    document.getElementById("result").textContent = "メールアドレスを入力してください";
    document.getElementById("result").style.color = "red";
  } else if (!email.includes("@")) {
    document.getElementById("result").textContent = "有効なメールアドレスを入力してください";
    document.getElementById("result").style.color = "red";
  } else {
    document.getElementById("result").textContent = "登録成功！";
    document.getElementById("result").style.color = "green";
  }
}
```

このコードの問題点は以下の通りです。

- `document.getElementById("result")`が何度も繰り返されている
- エラーメッセージの表示処理が重複している
- 早期リターンが使われていない

### リファクタリング後のコード

```javascript
// エラーメッセージを表示する関数
function showError(message) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = "red";
}

// 成功メッセージを表示する関数
function showSuccess(message) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = "green";
}

function checkInput() {
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let email = document.getElementById("emailInput").value;

  // 早期リターンで各検証を実行
  if (name === "") {
    showError("名前を入力してください");
    return;
  }

  if (age === "") {
    showError("年齢を入力してください");
    return;
  }

  if (Number(age) < 18) {
    showError("18歳以上である必要があります");
    return;
  }

  if (email === "") {
    showError("メールアドレスを入力してください");
    return;
  }

  if (!email.includes("@")) {
    showError("有効なメールアドレスを入力してください");
    return;
  }

  // すべての検証を通過
  showSuccess("登録成功！");
}
```

改善点を見ていきましょう。

1. **関数化**: エラー表示と成功表示を関数にまとめました。表示形式を変更する際、2つの関数だけを修正すれば良くなります

2. **早期リターン**: ガード節を使うことで、ネストを減らし、コードを平坦にしました

3. **重複の削除**: `document.getElementById("result")`の繰り返しを関数内に隠蔽しました

4. **可読性の向上**: 各検証が独立しているため、どの条件で何をチェックしているのかが明確になりました

## リファクタリングの手順

実際にリファクタリングを行う際は、以下の手順で進めると良いでしょう。

### 1. 動作を確認する

リファクタリングの前に、現在のコードが正しく動作することを確認します。テストがある場合は、すべてのテストが通ることを確認しましょう。

### 2. 小さく変更する

一度に大きく変更するのではなく、小さな変更を積み重ねます。1つ変更したら、動作を確認してから次の変更に進みます。

### 3. 重複を見つける

同じようなコードが複数の場所にないか探します。特に、以下のような重複に注目します。

- 同じ要素の取得
- 同じ処理の繰り返し
- 似たような条件分岐

### 4. 関数を抽出する

共通する処理を関数にまとめます。関数名は、その処理が何をするのかが分かる名前にします。

### 5. 条件を整理する

複雑な条件式を変数に分けたり、早期リターンを使ったりして、条件を整理します。

### 6. 動作を再確認する

リファクタリング後、コードが正しく動作することを確認します。

## 練習問題

### 課題

重複が多く、読みにくいコードをリファクタリングしましょう。関数化と早期リターンを使って、コードを整理します。

### 保存場所

`exercises/lesson-060/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. 重複しているコードを見つける
2. 共通処理を関数にまとめる
3. 早期リターンで条件を整理する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-060
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

- `showError(message)`と`showSuccess(message)`という2つの関数を作成します
- 各関数は、メッセージを受け取り、適切な色で表示します
- メイン処理では、早期リターンを使って各検証を実行します
- 各検証でエラーがあれば、`showError()`を呼び出してreturnします
- すべての検証を通過した場合、`showSuccess()`を呼び出します

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 060</title>
</head>
<body>
    <h1>会員登録</h1>
    <input type="text" id="nameInput" placeholder="名前">
    <input type="number" id="ageInput" placeholder="年齢">
    <input type="email" id="emailInput" placeholder="メールアドレス">
    <button onclick="checkInput()">登録</button>
    <p id="result"></p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// エラーメッセージを表示する関数
function showError(message) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = "red";
}

// 成功メッセージを表示する関数
function showSuccess(message) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = "green";
}

function checkInput() {
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let email = document.getElementById("emailInput").value;

  // 早期リターンで各検証を実行
  if (name === "") {
    showError("名前を入力してください");
    return;
  }

  if (age === "") {
    showError("年齢を入力してください");
    return;
  }

  if (Number(age) < 18) {
    showError("18歳以上である必要があります");
    return;
  }

  if (email === "") {
    showError("メールアドレスを入力してください");
    return;
  }

  if (!email.includes("@")) {
    showError("有効なメールアドレスを入力してください");
    return;
  }

  // すべての検証を通過
  showSuccess("登録成功！");
}
```

### 解説

このプログラムは、リファクタリングの基本的な技法を使って、コードを整理しています。

1. **関数化による重複の削除**:
   - `showError()`関数: エラーメッセージを赤色で表示する共通処理
   - `showSuccess()`関数: 成功メッセージを緑色で表示する共通処理
   - これらの関数により、`document.getElementById("result")`の繰り返しを削減し、表示処理を1か所にまとめました

2. **早期リターンによる条件の整理**:
   - 各検証を独立させ、エラーがあればすぐに`return`することで、ネストを減らしました
   - 条件分岐が平坦になり、どこで何をチェックしているのかが明確になりました

3. **DRY原則の適用**:
   - 同じ処理を繰り返さず、関数にまとめることで、変更が簡単になりました
   - 例えば、エラーメッセージのフォントサイズを変更したい場合、`showError()`関数だけを修正すれば良くなります

4. **可読性の向上**:
   - 関数名が処理内容を表しているため、コードを読むだけで動作が理解できます
   - `showError("名前を入力してください")`という1行で、何をしているのかが明確です

このようなリファクタリングを行うことで、コードは短く、読みやすく、保守しやすくなります。

## まとめ

お疲れ様でした。今回のレッスンでは、条件分岐のリファクタリングについて学びました。

**今回のキーポイント:**

- **重複の削除**: 同じコードを何度も書くのではなく、変数や関数にまとめることで、コードを簡潔にします。DRY原則（Don't Repeat Yourself）に従うことで、変更が簡単になり、バグが減り、可読性が向上します。特に、DOM要素の取得や表示処理など、共通する部分は積極的にまとめましょう

- **条件の整理**: 複雑な条件式を意味のある名前の変数に分けることで、コードの意図が明確になります。早期リターンを使うことでネストを減らし、条件の順序を整理することで、コードの流れが理解しやすくなります。マジックナンバーを定数にすることで、値の意味が明確になります

- **関数化**: 共通する処理を関数にまとめることで、再利用性が向上します。判定ロジックや表示処理を関数にすることで、修正箇所が1か所になり、保守が簡単になります。関数名は、その処理が何をするのかが分かる名前にすることが重要です

リファクタリングは、プログラムの動作を変えずにコード構造を改善する重要な技術です。最初から完璧なコードを書くことは難しいので、動作するコードを書いてから、少しずつ改善していくのが良いアプローチです。

次のレッスンでは、これまで学んだ知識を総合して、RPG風バトルゲームを作成します。条件分岐、変数、関数など、さまざまな技術を組み合わせて、より実践的なプログラムを作っていきましょう。
