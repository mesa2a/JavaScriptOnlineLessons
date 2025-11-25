---
title: "Lesson 060: 条件分岐のリファクタリング"
author: "JavaScript学習教材"
date: "2025-11-25"
---

## なぜ重要なのか

コードのリファクタリングは、プロフェッショナルな開発において欠かせないスキルです。実際の開発現場で、どのように活用されているか見てみましょう。

### 実例1：Airbnb（宿泊予約サービス）

Airbnbのスタイルガイドでは、条件分岐のリファクタリングに関する厳格なルールが定められています。

```javascript
// 悪い例：重複が多い
function checkBooking(booking) {
  if (!booking) {
    document.getElementById("error").textContent = "予約情報がありません";
    document.getElementById("error").style.color = "red";
    document.getElementById("error").style.display = "block";
    return;
  }

  if (!booking.dates) {
    document.getElementById("error").textContent = "日付が選択されていません";
    document.getElementById("error").style.color = "red";
    document.getElementById("error").style.display = "block";
    return;
  }

  if (!booking.guests) {
    document.getElementById("error").textContent = "宿泊人数が指定されていません";
    document.getElementById("error").style.color = "red";
    document.getElementById("error").style.display = "block";
    return;
  }
}

// 良い例：関数化で重複を削除
function showError(message) {
  let error = document.getElementById("error");
  error.textContent = message;
  error.style.color = "red";
  error.style.display = "block";
}

function checkBooking(booking) {
  if (!booking) {
    showError("予約情報がありません");
    return;
  }

  if (!booking.dates) {
    showError("日付が選択されていません");
    return;
  }

  if (!booking.guests) {
    showError("宿泊人数が指定されていません");
    return;
  }
}
```

関数化により、コードが1/3以下になり、保守性が大幅に向上しました。

### 実例2：Google（検索エンジン）

Googleのコードレビューガイドラインでは、条件の複雑さを減らすための具体的な指針が示されています。

```javascript
// 悪い例：複雑な条件式
function canShowAd(user, page, device, connection, time) {
  if (user.isPremium === false && page.adsEnabled === true &&
      device.screenSize > 768 && connection.speed > 1000 &&
      time.hour >= 9 && time.hour <= 21) {
    return true;
  }
  return false;
}

// 良い例：条件を変数に分ける
function canShowAd(user, page, device, connection, time) {
  let isFreeUser = !user.isPremium;
  let pageAllowsAds = page.adsEnabled;
  let hasLargeScreen = device.screenSize > 768;
  let hasFastConnection = connection.speed > 1000;
  let isBusinessHours = time.hour >= 9 && time.hour <= 21;

  return isFreeUser && pageAllowsAds && hasLargeScreen &&
         hasFastConnection && isBusinessHours;
}
```

変数名が条件の意味を説明しているため、コメント不要で理解できます。

### 実例3：Facebook/Meta（ソーシャルメディア）

Facebookの開発チームは、マジックナンバーの排除を徹底しています。

```javascript
// 悪い例：マジックナンバー
function getPostReachLevel(likes, shares, comments) {
  let score = likes * 1 + shares * 5 + comments * 3;

  if (score >= 1000) {
    return "バイラル";
  } else if (score >= 500) {
    return "人気";
  } else if (score >= 100) {
    return "普通";
  } else {
    return "低い";
  }
}

// 良い例：定数で意味を明確化
const ENGAGEMENT_WEIGHTS = {
  LIKE: 1,
  SHARE: 5,
  COMMENT: 3
};

const REACH_THRESHOLDS = {
  VIRAL: 1000,
  POPULAR: 500,
  NORMAL: 100
};

function getPostReachLevel(likes, shares, comments) {
  let score = likes * ENGAGEMENT_WEIGHTS.LIKE +
              shares * ENGAGEMENT_WEIGHTS.SHARE +
              comments * ENGAGEMENT_WEIGHTS.COMMENT;

  if (score >= REACH_THRESHOLDS.VIRAL) {
    return "バイラル";
  } else if (score >= REACH_THRESHOLDS.POPULAR) {
    return "人気";
  } else if (score >= REACH_THRESHOLDS.NORMAL) {
    return "普通";
  } else {
    return "低い";
  }
}
```

定数を使うことで、重み付けやしきい値の調整が簡単になります。

### 実例4：GitHub（バージョン管理サービス）

GitHubでは、条件分岐の順序を工夫することで、コードの意図を明確にしています。

```javascript
// 悪い例：順序がバラバラで意図が不明確
function getRepositoryBadge(repo) {
  if (repo.stars > 1000) {
    return "⭐ 人気";
  }

  if (repo.isArchived) {
    return "📦 アーカイブ済み";
  }

  if (repo.forks > 100) {
    return "🍴 活発";
  }

  if (repo.isPrivate) {
    return "🔒 プライベート";
  }

  return "📁 リポジトリ";
}

// 良い例：優先度順に整理（状態 → 人気度）
function getRepositoryBadge(repo) {
  // 状態による分類（最優先）
  if (repo.isArchived) {
    return "📦 アーカイブ済み";
  }

  if (repo.isPrivate) {
    return "🔒 プライベート";
  }

  // 人気度による分類
  if (repo.stars > 1000) {
    return "⭐ 人気";
  }

  if (repo.forks > 100) {
    return "🍴 活発";
  }

  return "📁 リポジトリ";
}
```

条件を優先度順に並べることで、判定の意図が明確になります。

### 実例5：Stripe（決済サービス）

Stripeでは、判定ロジックを関数化して再利用しています。

```javascript
// 悪い例：判定ロジックが重複
function processPayment(payment) {
  if (payment.amount > 0 && payment.currency &&
      payment.method && !payment.declined) {
    // 決済処理
    chargeCard(payment);
  }
}

function refundPayment(payment) {
  if (payment.amount > 0 && payment.currency &&
      payment.method && !payment.declined) {
    // 返金処理
    refundCard(payment);
  }
}

// 良い例：判定ロジックを関数化
function isValidPayment(payment) {
  return payment.amount > 0 &&
         payment.currency &&
         payment.method &&
         !payment.declined;
}

function processPayment(payment) {
  if (isValidPayment(payment)) {
    chargeCard(payment);
  }
}

function refundPayment(payment) {
  if (isValidPayment(payment)) {
    refundCard(payment);
  }
}
```

判定ロジックを`isValidPayment()`関数にまとめることで、再利用性と保守性が向上しました。

---

## このレッスンで学ぶこと

今回のレッスンでは、**条件分岐のリファクタリング**について学びます。

リファクタリングとは、プログラムの動作を変えずに、コードの構造を改善することです。条件分岐は複雑になりがちなので、リファクタリングによってコードを読みやすく、保守しやすくする技術が重要です。

**学習内容：**

1. **重複コードの削除**
   - DRY原則（Don't Repeat Yourself）
   - 共通処理の抽出
   - DOM要素の取得最適化
   - 表示処理の統一

2. **条件の整理**
   - 複雑な条件式の分解
   - 意味のある変数名の使用
   - 条件の順序の最適化
   - マジックナンバーの排除

3. **関数化による再利用**
   - 判定ロジックの関数化
   - 表示処理の関数化
   - ユーティリティ関数の作成
   - 関数の適切な分割

4. **リファクタリングの実践**
   - リファクタリング前後の比較
   - 段階的な改善手順
   - テストによる動作確認
   - コードレビューのポイント

**前提知識：**
- 条件分岐（if文、else if、else）（Lesson 010-011）
- 関数の定義と呼び出し（Lesson 019-020）
- 早期リターン（Lesson 057）
- DOMの基本操作（Lesson 044-048）

---

## リファクタリングとは

### 基本概念

**リファクタリング**とは、プログラムの外部から見た動作を変えずに、内部のコード構造を改善することです。

料理に例えると、料理の味を変えずに、調理手順を効率化したり、キッチンを整理したりするようなものです。

```javascript
// リファクタリング前：同じ処理を3回繰り返している
function showMessageA() {
  let result = document.getElementById("result");
  result.textContent = "メッセージA";
  result.style.color = "blue";
}

function showMessageB() {
  let result = document.getElementById("result");
  result.textContent = "メッセージB";
  result.style.color = "blue";
}

function showMessageC() {
  let result = document.getElementById("result");
  result.textContent = "メッセージC";
  result.style.color = "blue";
}

// リファクタリング後：共通処理を関数にまとめた
function showMessage(text) {
  let result = document.getElementById("result");
  result.textContent = text;
  result.style.color = "blue";
}

function showMessageA() {
  showMessage("メッセージA");
}

function showMessageB() {
  showMessage("メッセージB");
}

function showMessageC() {
  showMessage("メッセージC");
}
```

どちらのコードも同じように動作しますが、リファクタリング後のコードは、共通処理が1か所にまとまっているため、修正が簡単です。

### リファクタリングの目的

リファクタリングには、以下のような目的があります。

**1. 可読性の向上**

コードを読みやすくすることで、他の開発者（または未来の自分）が理解しやすくなります。

```javascript
// 読みにくい
if (a >= 18 && b && c > 2 && !d) {
  console.log("OK");
}

// 読みやすい
let isAdult = age >= 18;
let hasLicense = hasDriverLicense;
let hasExperience = experience > 2;
let hasNoPenalty = !hasPenalty;

if (isAdult && hasLicense && hasExperience && hasNoPenalty) {
  console.log("運転可能です");
}
```

**2. 保守性の向上**

修正や機能追加がしやすくなります。

```javascript
// 保守しにくい：メッセージの色を変更する場合、3か所を修正する必要がある
if (score >= 80) {
  document.getElementById("result").style.color = "green";
  document.getElementById("result").textContent = "合格";
}

if (score >= 60) {
  document.getElementById("result").style.color = "green";
  document.getElementById("result").textContent = "再試験";
}

// 保守しやすい：関数を修正すれば、すべての呼び出し箇所に反映される
function showSuccess(message) {
  let result = document.getElementById("result");
  result.style.color = "green"; // ここを修正すれば全体に反映
  result.textContent = message;
}

if (score >= 80) {
  showSuccess("合格");
}

if (score >= 60) {
  showSuccess("再試験");
}
```

**3. バグの削減**

シンプルなコードはバグが入り込みにくくなります。

```javascript
// バグが入りやすい：似たようなコードを複数書くと、修正漏れが起きやすい
if (name === "") {
  document.getElementById("result").textContent = "名前を入力してください";
  document.getElementById("result").style.color = "red";
}

if (email === "") {
  document.getElementById("result").textContent = "メールを入力してください";
  // 色の設定を忘れてしまった！（バグ）
}

// バグが入りにくい：関数にまとめることで、設定漏れを防げる
function showError(message) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = "red";
}

if (name === "") {
  showError("名前を入力してください");
}

if (email === "") {
  showError("メールを入力してください");
}
```

**4. 再利用性の向上**

同じコードを何度も書かずに済みます。

```javascript
// 再利用できない
function checkNameInput() {
  let name = document.getElementById("name").value;
  if (name === "") {
    alert("名前を入力してください");
  }
}

function checkEmailInput() {
  let email = document.getElementById("email").value;
  if (email === "") {
    alert("メールを入力してください");
  }
}

// 再利用可能
function validateInput(elementId, fieldName) {
  let value = document.getElementById(elementId).value;
  if (value === "") {
    alert(fieldName + "を入力してください");
    return false;
  }
  return true;
}

// 複数の場所で再利用できる
validateInput("name", "名前");
validateInput("email", "メール");
validateInput("phone", "電話番号");
```

### リファクタリングのタイミング

リファクタリングは、以下のようなタイミングで行うと効果的です。

**1. 機能追加の前**

新しい機能を追加する前に、既存のコードをリファクタリングすることで、機能追加がしやすくなります。

**2. バグ修正の後**

バグを修正した後、同じようなバグが起きないように、コードを改善します。

**3. コードレビューの時**

他の開発者にコードをレビューしてもらう際、リファクタリングで改善点を見つけます。

**4. 同じコードを3回書いた時**

「3回ルール」：同じようなコードを3回書いたら、リファクタリングのサインです。

---

## 重複の削除

プログラムを書いていると、同じようなコードが複数の場所に現れることがあります。これを**コードの重複**と呼びます。

### 重複の問題点

以下のような成績判定のコードを見てください。

```javascript
function checkScore() {
  let score = Number(document.getElementById("scoreInput").value);

  if (score >= 90) {
    document.getElementById("result").textContent = "評価: A";
    document.getElementById("result").style.color = "blue";
    document.getElementById("result").style.fontWeight = "bold";
    document.getElementById("result").style.fontSize = "24px";
  } else if (score >= 80) {
    document.getElementById("result").textContent = "評価: B";
    document.getElementById("result").style.color = "blue";
    document.getElementById("result").style.fontWeight = "bold";
    document.getElementById("result").style.fontSize = "24px";
  } else if (score >= 70) {
    document.getElementById("result").textContent = "評価: C";
    document.getElementById("result").style.color = "blue";
    document.getElementById("result").style.fontWeight = "bold";
    document.getElementById("result").style.fontSize = "24px";
  } else if (score >= 60) {
    document.getElementById("result").textContent = "評価: D";
    document.getElementById("result").style.color = "blue";
    document.getElementById("result").style.fontWeight = "bold";
    document.getElementById("result").style.fontSize = "24px";
  } else {
    document.getElementById("result").textContent = "評価: F";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.fontWeight = "bold";
    document.getElementById("result").style.fontSize = "24px";
  }
}
```

このコードには以下の問題があります。

**1. 同じコードの繰り返し**

`document.getElementById("result")`が20回も繰り返されています。

**2. 修正が大変**

フォントサイズを変更する場合、5か所を修正する必要があります。

**3. 修正漏れのリスク**

5か所すべてを修正し忘れると、バグになります。

**4. コードが長い**

本質的な処理（評価の判定）よりも、DOM操作のコードの方が多くなっています。

### DRY原則

プログラミングには**DRY原則**（Don't Repeat Yourself - 繰り返しを避けよ）という重要な考え方があります。

同じコードを何度も書くのではなく、1か所にまとめることで、以下のメリットが得られます。

**1. 変更が簡単**

修正箇所が1か所で済みます。

**2. バグが減る**

同じコードを複数書くと、修正漏れが起きやすくなります。

**3. コードが短くなる**

本質的な処理に集中できます。

**4. 可読性が向上**

何をしているのかが明確になります。

### 重複を削除する方法1：変数化

まず、繰り返し取得している要素を変数に保存します。

```javascript
function checkScore() {
  let score = Number(document.getElementById("scoreInput").value);

  // 要素を1回だけ取得して変数に保存
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

  // 表示を更新（共通処理を1か所にまとめる）
  result.textContent = "評価: " + grade;
  result.style.fontWeight = "bold";
  result.style.fontSize = "24px";

  // 色の設定
  if (grade === "F") {
    result.style.color = "red";
  } else {
    result.style.color = "blue";
  }
}
```

**改善点：**

1. **要素の取得を1回に**：`document.getElementById("result")`を変数`result`に保存し、1回だけ取得するようにしました

2. **評価の決定と表示を分離**：まず評価（A、B、C等）を決定し、その後で表示を更新するようにしました

3. **共通処理をまとめる**：`fontWeight`や`fontSize`の設定など、すべての評価で共通する処理を1か所にまとめました

4. **条件を簡素化**：色の設定は、Fかそれ以外かの2択なので、シンプルなif-else文にしました

### 重複を削除する方法2：関数化

さらに、表示処理を関数にまとめることもできます。

```javascript
// 評価を表示する関数
function displayGrade(grade) {
  let result = document.getElementById("result");
  result.textContent = "評価: " + grade;
  result.style.fontWeight = "bold";
  result.style.fontSize = "24px";

  // 色の設定
  if (grade === "F") {
    result.style.color = "red";
  } else {
    result.style.color = "blue";
  }
}

function checkScore() {
  let score = Number(document.getElementById("scoreInput").value);
  let grade;

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

  // 関数を呼び出すだけ
  displayGrade(grade);
}
```

**メリット：**

1. **表示処理が独立**：評価の判定と表示が分離され、それぞれの役割が明確になりました

2. **再利用可能**：`displayGrade()`関数は、他の場所でも使えます

3. **テストしやすい**：表示処理だけを独立してテストできます

4. **修正が簡単**：表示形式を変更する場合、`displayGrade()`関数だけを修正すれば良くなります

### 重複を削除する方法3：パラメータ化

表示処理をさらに汎用的にすることもできます。

```javascript
// 汎用的なメッセージ表示関数
function displayMessage(message, color) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = color;
  result.style.fontWeight = "bold";
  result.style.fontSize = "24px";
}

function checkScore() {
  let score = Number(document.getElementById("scoreInput").value);
  let grade;
  let color;

  if (score >= 90) {
    grade = "A";
    color = "blue";
  } else if (score >= 80) {
    grade = "B";
    color = "blue";
  } else if (score >= 70) {
    grade = "C";
    color = "blue";
  } else if (score >= 60) {
    grade = "D";
    color = "blue";
  } else {
    grade = "F";
    color = "red";
  }

  displayMessage("評価: " + grade, color);
}
```

これにより、`displayMessage()`関数は、成績以外のメッセージ表示にも使えるようになりました。

### 実例：入力検証の重複削除

実際によくある入力検証のコードで、重複を削除してみましょう。

**リファクタリング前：**

```javascript
function validateForm() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;

  if (name === "") {
    document.getElementById("error").textContent = "名前を入力してください";
    document.getElementById("error").style.color = "red";
    document.getElementById("error").style.display = "block";
    return false;
  }

  if (email === "") {
    document.getElementById("error").textContent = "メールを入力してください";
    document.getElementById("error").style.color = "red";
    document.getElementById("error").style.display = "block";
    return false;
  }

  if (!email.includes("@")) {
    document.getElementById("error").textContent = "有効なメールアドレスを入力してください";
    document.getElementById("error").style.color = "red";
    document.getElementById("error").style.display = "block";
    return false;
  }

  if (phone === "") {
    document.getElementById("error").textContent = "電話番号を入力してください";
    document.getElementById("error").style.color = "red";
    document.getElementById("error").style.display = "block";
    return false;
  }

  document.getElementById("error").style.display = "none";
  return true;
}
```

**リファクタリング後：**

```javascript
// エラー表示関数
function showError(message) {
  let error = document.getElementById("error");
  error.textContent = message;
  error.style.color = "red";
  error.style.display = "block";
}

// エラー非表示関数
function hideError() {
  document.getElementById("error").style.display = "none";
}

function validateForm() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;

  if (name === "") {
    showError("名前を入力してください");
    return false;
  }

  if (email === "") {
    showError("メールを入力してください");
    return false;
  }

  if (!email.includes("@")) {
    showError("有効なメールアドレスを入力してください");
    return false;
  }

  if (phone === "") {
    showError("電話番号を入力してください");
    return false;
  }

  hideError();
  return true;
}
```

**改善点：**

1. エラー表示処理が`showError()`関数にまとまった
2. 各検証は1行で書けるようになった
3. エラー表示の形式を変更する場合、`showError()`関数だけを修正すれば良い
4. コードの行数が約半分になった

---

## 条件の整理

条件分岐が複雑になると、読みにくくなります。条件を整理することで、コードの意図が明確になります。

### 複雑な条件を変数に分ける

複雑な条件式を、意味のある名前の変数に分けることで、コードが読みやすくなります。

**整理前：**

```javascript
function canDrive(age, hasLicense, experience, hasPenalty, hasInsurance) {
  if (age >= 18 && hasLicense && experience >= 2 && !hasPenalty && hasInsurance) {
    console.log("運転できます");
  } else {
    console.log("運転できません");
  }
}
```

この条件式は、5つの条件が`&&`で結合されており、一目で理解するのが難しいです。

**整理後：**

```javascript
function canDrive(age, hasLicense, experience, hasPenalty, hasInsurance) {
  // 各条件を意味のある変数名で定義
  let isAdult = age >= 18;
  let hasValidLicense = hasLicense;
  let hasEnoughExperience = experience >= 2;
  let hasNoViolation = !hasPenalty;
  let hasValidInsurance = hasInsurance;

  // 変数名が条件の意味を説明している
  let canDrive = isAdult && hasValidLicense && hasEnoughExperience &&
                 hasNoViolation && hasValidInsurance;

  if (canDrive) {
    console.log("運転できます");
  } else {
    console.log("運転できません");
  }
}
```

**メリット：**

1. **各条件の意味が明確**：変数名を見るだけで、何をチェックしているのか分かる
2. **デバッグしやすい**：各条件を個別にログ出力して確認できる
3. **修正しやすい**：条件を追加・削除・変更する際に、どこを修正すれば良いか明確

### 条件を関数にする

条件判定自体を関数にすることもできます。

```javascript
function isAdult(age) {
  return age >= 18;
}

function hasEnoughExperience(years) {
  return years >= 2;
}

function hasNoViolation(penalty) {
  return !penalty;
}

function canDrive(age, hasLicense, experience, penalty, insurance) {
  if (isAdult(age) && hasLicense && hasEnoughExperience(experience) &&
      hasNoViolation(penalty) && insurance) {
    console.log("運転できます");
  } else {
    console.log("運転できません");
  }
}
```

関数名がコメントの役割を果たしているため、コードが自己説明的になります。

### マジックナンバーの排除

コードの中に直接書かれた数値を**マジックナンバー**と呼びます。意味が分かりにくいので、定数にすると良いでしょう。

**マジックナンバーがある例：**

```javascript
function getGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}
```

このコードでは、90、80、70、60という数値が何を意味するのか、コードを読まないと分かりません。

**定数を使う例：**

```javascript
// 定数で意味を明確にする
const GRADE_A_THRESHOLD = 90;
const GRADE_B_THRESHOLD = 80;
const GRADE_C_THRESHOLD = 70;
const GRADE_D_THRESHOLD = 60;

function getGrade(score) {
  if (score >= GRADE_A_THRESHOLD) {
    return "A";
  } else if (score >= GRADE_B_THRESHOLD) {
    return "B";
  } else if (score >= GRADE_C_THRESHOLD) {
    return "C";
  } else if (score >= GRADE_D_THRESHOLD) {
    return "D";
  } else {
    return "F";
  }
}
```

**メリット：**

1. **意味が明確**：定数名を見れば、「90点がA評価の基準値」だと分かる
2. **変更が簡単**：基準を変更する際、定数の値を変えるだけで済む
3. **タイポを防げる**：同じ数値を複数の場所で書く必要がない

### オブジェクトで定数をグループ化

関連する定数は、オブジェクトにまとめるとさらに分かりやすくなります。

```javascript
// 成績の基準値をオブジェクトにまとめる
const GRADE_THRESHOLDS = {
  A: 90,
  B: 80,
  C: 70,
  D: 60
};

function getGrade(score) {
  if (score >= GRADE_THRESHOLDS.A) {
    return "A";
  } else if (score >= GRADE_THRESHOLDS.B) {
    return "B";
  } else if (score >= GRADE_THRESHOLDS.C) {
    return "C";
  } else if (score >= GRADE_THRESHOLDS.D) {
    return "D";
  } else {
    return "F";
  }
}
```

### 条件の順序を整理する

条件の順序を工夫することで、コードが理解しやすくなります。

**整理前：**

```javascript
function getTicketPrice(age, isStudent, isSenior, isMember) {
  let price = 1800; // 基本料金

  if (isMember) {
    price = 1500; // 会員割引
  }

  if (age < 12) {
    price = 900; // 子供料金
  }

  if (isSenior) {
    price = 1200; // シニア料金
  }

  if (isStudent) {
    price = 1300; // 学生料金
  }

  return price;
}
```

この順序だと、最後の条件が優先されてしまい、意図した動作になりません。

**整理後：**

```javascript
function getTicketPrice(age, isStudent, isSenior, isMember) {
  const PRICES = {
    CHILD: 900,
    SENIOR: 1200,
    STUDENT: 1300,
    MEMBER: 1500,
    ADULT: 1800
  };

  // 優先度順に判定（年齢による分類を最優先）
  if (age < 12) {
    return PRICES.CHILD;
  }

  if (isSenior) {
    return PRICES.SENIOR;
  }

  if (isStudent) {
    return PRICES.STUDENT;
  }

  if (isMember) {
    return PRICES.MEMBER;
  }

  return PRICES.ADULT;
}
```

**改善点：**

1. **早期リターンを使用**：条件に合致したら即座にreturn
2. **優先度順に整理**：年齢 → シニア → 学生 → 会員 → 一般の順
3. **定数でマジックナンバーを排除**：料金の意味が明確
4. **意図が明確**：どの条件が優先されるのかが一目瞭然

### ネストを減らす

条件のネストが深くなると、読みにくくなります。

**ネストが深い例：**

```javascript
function processOrder(order) {
  if (order) {
    if (order.items) {
      if (order.items.length > 0) {
        if (order.paymentMethod) {
          if (order.shippingAddress) {
            // 注文処理
            console.log("注文を処理します");
            return true;
          } else {
            console.log("配送先住所が必要です");
            return false;
          }
        } else {
          console.log("支払い方法が必要です");
          return false;
        }
      } else {
        console.log("商品が選択されていません");
        return false;
      }
    } else {
      console.log("注文に商品がありません");
      return false;
    }
  } else {
    console.log("注文情報がありません");
    return false;
  }
}
```

**早期リターンでネストを減らす：**

```javascript
function processOrder(order) {
  // エラーケースを先に処理（早期リターン）
  if (!order) {
    console.log("注文情報がありません");
    return false;
  }

  if (!order.items) {
    console.log("注文に商品がありません");
    return false;
  }

  if (order.items.length === 0) {
    console.log("商品が選択されていません");
    return false;
  }

  if (!order.paymentMethod) {
    console.log("支払い方法が必要です");
    return false;
  }

  if (!order.shippingAddress) {
    console.log("配送先住所が必要です");
    return false;
  }

  // 正常ケースは最後に1回だけ
  console.log("注文を処理します");
  return true;
}
```

**メリット：**

1. **ネストが浅い**：インデントが1段階で済む
2. **読みやすい**：上から順に条件を確認できる
3. **修正しやすい**：条件を追加・削除しやすい
4. **エラー処理が明確**：どの条件でエラーになるのかが分かりやすい

---

## 関数化による再利用

同じような処理が複数の場所にある場合、関数にまとめることで再利用できます。

### 判定ロジックの関数化

判定ロジックを関数にまとめると、同じ判定を複数の場所で使えます。

**関数化前：**

```javascript
function registerUser(user) {
  // メールアドレスの検証
  if (user.email && user.email.includes("@") && user.email.includes(".")) {
    console.log("有効なメールアドレスです");
  } else {
    console.log("無効なメールアドレスです");
    return;
  }

  // 登録処理
  saveUser(user);
}

function updateUserEmail(user, newEmail) {
  // メールアドレスの検証（同じ条件を再度書いている）
  if (newEmail && newEmail.includes("@") && newEmail.includes(".")) {
    user.email = newEmail;
    saveUser(user);
  } else {
    console.log("無効なメールアドレスです");
  }
}

function sendEmail(email, message) {
  // メールアドレスの検証（また同じ条件を書いている）
  if (email && email.includes("@") && email.includes(".")) {
    // メール送信処理
    console.log("メールを送信しました");
  } else {
    console.log("無効なメールアドレスです");
  }
}
```

**関数化後：**

```javascript
// メールアドレス検証を関数化
function isValidEmail(email) {
  return email && email.includes("@") && email.includes(".");
}

function registerUser(user) {
  if (!isValidEmail(user.email)) {
    console.log("無効なメールアドレスです");
    return;
  }

  console.log("有効なメールアドレスです");
  saveUser(user);
}

function updateUserEmail(user, newEmail) {
  if (!isValidEmail(newEmail)) {
    console.log("無効なメールアドレスです");
    return;
  }

  user.email = newEmail;
  saveUser(user);
}

function sendEmail(email, message) {
  if (!isValidEmail(email)) {
    console.log("無効なメールアドレスです");
    return;
  }

  console.log("メールを送信しました");
}
```

**メリット：**

1. **検証ロジックが1か所に集約**：修正する場合、`isValidEmail()`関数だけを修正すれば良い
2. **関数名が意図を表現**：`isValidEmail()`という名前で、何をチェックしているのかが明確
3. **テストしやすい**：検証ロジックを独立してテストできる
4. **再利用可能**：どこからでも呼び出せる

### 複数の判定ロジックを関数化

複数の関連する判定をまとめることもできます。

```javascript
// 年齢関連の判定
function isAdult(age) {
  return age >= 18;
}

function isChild(age) {
  return age < 12;
}

function isSenior(age) {
  return age >= 65;
}

function isTeenager(age) {
  return age >= 13 && age <= 19;
}

// 使用例
function getAgeCategory(age) {
  if (isChild(age)) {
    return "子供";
  } else if (isTeenager(age)) {
    return "ティーン";
  } else if (isSenior(age)) {
    return "シニア";
  } else if (isAdult(age)) {
    return "大人";
  } else {
    return "赤ちゃん";
  }
}
```

### 表示処理の関数化

表示に関する処理も関数にまとめることができます。

**関数化前：**

```javascript
function showSuccessMessage() {
  let result = document.getElementById("result");
  result.textContent = "成功しました";
  result.style.color = "green";
  result.style.backgroundColor = "#d4edda";
  result.style.padding = "10px";
  result.style.border = "1px solid #c3e6cb";
  result.style.borderRadius = "4px";
  result.style.display = "block";
}

function showErrorMessage() {
  let result = document.getElementById("result");
  result.textContent = "エラーが発生しました";
  result.style.color = "red";
  result.style.backgroundColor = "#f8d7da";
  result.style.padding = "10px";
  result.style.border = "1px solid #f5c6cb";
  result.style.borderRadius = "4px";
  result.style.display = "block";
}

function showWarningMessage() {
  let result = document.getElementById("result");
  result.textContent = "警告";
  result.style.color = "orange";
  result.style.backgroundColor = "#fff3cd";
  result.style.padding = "10px";
  result.style.border = "1px solid #ffc107";
  result.style.borderRadius = "4px";
  result.style.display = "block";
}
```

**関数化後：**

```javascript
// 共通のスタイルを設定する関数
function setMessageStyle(element, color, bgColor, borderColor) {
  element.style.color = color;
  element.style.backgroundColor = bgColor;
  element.style.padding = "10px";
  element.style.border = "1px solid " + borderColor;
  element.style.borderRadius = "4px";
  element.style.display = "block";
}

// メッセージを表示する汎用関数
function showMessage(text, type) {
  let result = document.getElementById("result");
  result.textContent = text;

  if (type === "success") {
    setMessageStyle(result, "green", "#d4edda", "#c3e6cb");
  } else if (type === "error") {
    setMessageStyle(result, "red", "#f8d7da", "#f5c6cb");
  } else if (type === "warning") {
    setMessageStyle(result, "orange", "#fff3cd", "#ffc107");
  }
}

// 使用例
showMessage("成功しました", "success");
showMessage("エラーが発生しました", "error");
showMessage("警告", "warning");
```

さらに、設定をオブジェクトにまとめるとより柔軟になります。

```javascript
// メッセージタイプごとの設定
const MESSAGE_STYLES = {
  success: {
    color: "green",
    bgColor: "#d4edda",
    borderColor: "#c3e6cb"
  },
  error: {
    color: "red",
    bgColor: "#f8d7da",
    borderColor: "#f5c6cb"
  },
  warning: {
    color: "orange",
    bgColor: "#fff3cd",
    borderColor: "#ffc107"
  },
  info: {
    color: "blue",
    bgColor: "#d1ecf1",
    borderColor: "#bee5eb"
  }
};

function showMessage(text, type) {
  let result = document.getElementById("result");
  let style = MESSAGE_STYLES[type];

  result.textContent = text;
  result.style.color = style.color;
  result.style.backgroundColor = style.bgColor;
  result.style.padding = "10px";
  result.style.border = "1px solid " + style.borderColor;
  result.style.borderRadius = "4px";
  result.style.display = "block";
}

// 使用例
showMessage("登録が完了しました", "success");
showMessage("入力エラーがあります", "error");
showMessage("この操作は取り消せません", "warning");
showMessage("新しいバージョンがあります", "info");
```

### ユーティリティ関数の作成

よく使う処理をユーティリティ関数としてまとめておくと便利です。

```javascript
// DOM操作のユーティリティ関数
function getElement(id) {
  return document.getElementById(id);
}

function getValue(id) {
  return document.getElementById(id).value;
}

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

function setStyle(id, property, value) {
  document.getElementById(id).style[property] = value;
}

function show(id) {
  document.getElementById(id).style.display = "block";
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}

// 使用例
function checkInput() {
  let name = getValue("name");

  if (name === "") {
    setText("error", "名前を入力してください");
    setStyle("error", "color", "red");
    show("error");
    return;
  }

  hide("error");
  setText("result", "登録成功");
  setStyle("result", "color", "green");
  show("result");
}
```

これにより、DOM操作のコードが簡潔になります。

---

## 実践：リファクタリング前後の比較

それでは、実際にリファクタリング前後のコードを比較してみましょう。

### 例1：フォーム検証

**リファクタリング前：**

```javascript
function checkRegistration() {
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;

  // 名前のチェック
  if (name === "") {
    document.getElementById("result").textContent = "名前を入力してください";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
    return;
  }

  if (name.length < 2) {
    document.getElementById("result").textContent = "名前は2文字以上で入力してください";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
    return;
  }

  // 年齢のチェック
  if (age === "") {
    document.getElementById("result").textContent = "年齢を入力してください";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
    return;
  }

  if (Number(age) < 18) {
    document.getElementById("result").textContent = "18歳以上である必要があります";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
    return;
  }

  if (Number(age) > 120) {
    document.getElementById("result").textContent = "有効な年齢を入力してください";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
    return;
  }

  // メールのチェック
  if (email === "") {
    document.getElementById("result").textContent = "メールアドレスを入力してください";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
    return;
  }

  if (!email.includes("@")) {
    document.getElementById("result").textContent = "有効なメールアドレスを入力してください";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
    return;
  }

  // パスワードのチェック
  if (password === "") {
    document.getElementById("result").textContent = "パスワードを入力してください";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
    return;
  }

  if (password.length < 8) {
    document.getElementById("result").textContent = "パスワードは8文字以上で入力してください";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
    return;
  }

  // すべて正常
  document.getElementById("result").textContent = "登録成功！";
  document.getElementById("result").style.color = "green";
  document.getElementById("result").style.display = "block";
}
```

このコードの問題点：

1. `document.getElementById("result")`が33回も繰り返されている
2. エラーメッセージの表示処理が毎回同じコードを書いている
3. コードが非常に長い（約80行）
4. 修正が大変（例：メッセージの表示形式を変更する場合、11か所を修正する必要がある）

**リファクタリング後：**

```javascript
// 定数定義
const MIN_NAME_LENGTH = 2;
const MIN_AGE = 18;
const MAX_AGE = 120;
const MIN_PASSWORD_LENGTH = 8;

// エラーメッセージを表示する関数
function showError(message) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = "red";
  result.style.display = "block";
}

// 成功メッセージを表示する関数
function showSuccess(message) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = "green";
  result.style.display = "block";
}

// 名前の検証
function validateName(name) {
  if (name === "") {
    showError("名前を入力してください");
    return false;
  }

  if (name.length < MIN_NAME_LENGTH) {
    showError("名前は" + MIN_NAME_LENGTH + "文字以上で入力してください");
    return false;
  }

  return true;
}

// 年齢の検証
function validateAge(age) {
  if (age === "") {
    showError("年齢を入力してください");
    return false;
  }

  let ageNumber = Number(age);

  if (ageNumber < MIN_AGE) {
    showError(MIN_AGE + "歳以上である必要があります");
    return false;
  }

  if (ageNumber > MAX_AGE) {
    showError("有効な年齢を入力してください");
    return false;
  }

  return true;
}

// メールアドレスの検証
function validateEmail(email) {
  if (email === "") {
    showError("メールアドレスを入力してください");
    return false;
  }

  if (!email.includes("@")) {
    showError("有効なメールアドレスを入力してください");
    return false;
  }

  return true;
}

// パスワードの検証
function validatePassword(password) {
  if (password === "") {
    showError("パスワードを入力してください");
    return false;
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    showError("パスワードは" + MIN_PASSWORD_LENGTH + "文字以上で入力してください");
    return false;
  }

  return true;
}

// メインの検証関数
function checkRegistration() {
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;

  // 各項目を検証
  if (!validateName(name)) return;
  if (!validateAge(age)) return;
  if (!validateEmail(email)) return;
  if (!validatePassword(password)) return;

  // すべての検証を通過
  showSuccess("登録成功！");
}
```

**改善点：**

1. **関数化**：各検証ロジックを独立した関数に分割
2. **重複の削除**：エラー表示と成功表示を関数にまとめた
3. **定数化**：マジックナンバーを定数にした
4. **可読性向上**：メインの`checkRegistration()`関数が非常にシンプルになった
5. **保守性向上**：各検証ロジックを個別に修正・テストできる
6. **再利用可能**：`validateEmail()`などは他の場所でも使える

### 例2：割引計算

**リファクタリング前：**

```javascript
function calculatePrice() {
  let price = Number(document.getElementById("priceInput").value);
  let age = Number(document.getElementById("ageInput").value);
  let isMember = document.getElementById("memberCheck").checked;
  let day = new Date().getDay(); // 0=日曜, 6=土曜
  let finalPrice;

  if (age < 12) {
    finalPrice = price * 0.5;
    document.getElementById("result").textContent = "料金: " + finalPrice + "円（子供料金50%OFF）";
    document.getElementById("result").style.color = "blue";
  } else if (age >= 65) {
    finalPrice = price * 0.7;
    document.getElementById("result").textContent = "料金: " + finalPrice + "円（シニア料金30%OFF）";
    document.getElementById("result").style.color = "blue";
  } else if (isMember && (day === 0 || day === 6)) {
    finalPrice = price * 0.6;
    document.getElementById("result").textContent = "料金: " + finalPrice + "円（会員週末料金40%OFF）";
    document.getElementById("result").style.color = "blue";
  } else if (isMember) {
    finalPrice = price * 0.8;
    document.getElementById("result").textContent = "料金: " + finalPrice + "円（会員料金20%OFF）";
    document.getElementById("result").style.color = "blue";
  } else if (day === 0 || day === 6) {
    finalPrice = price * 0.9;
    document.getElementById("result").textContent = "料金: " + finalPrice + "円（週末料金10%OFF）";
    document.getElementById("result").style.color = "blue";
  } else {
    finalPrice = price;
    document.getElementById("result").textContent = "料金: " + finalPrice + "円（通常料金）";
    document.getElementById("result").style.color = "black";
  }
}
```

**リファクタリング後：**

```javascript
// 定数定義
const DISCOUNT_RATES = {
  CHILD: 0.5,        // 50% OFF
  SENIOR: 0.3,       // 30% OFF
  MEMBER_WEEKEND: 0.4, // 40% OFF
  MEMBER: 0.2,       // 20% OFF
  WEEKEND: 0.1       // 10% OFF
};

const AGE_LIMITS = {
  CHILD: 12,
  SENIOR: 65
};

const DAY_OF_WEEK = {
  SUNDAY: 0,
  SATURDAY: 6
};

// 年齢判定関数
function isChild(age) {
  return age < AGE_LIMITS.CHILD;
}

function isSenior(age) {
  return age >= AGE_LIMITS.SENIOR;
}

// 週末判定関数
function isWeekend(day) {
  return day === DAY_OF_WEEK.SUNDAY || day === DAY_OF_WEEK.SATURDAY;
}

// 割引情報を取得する関数
function getDiscountInfo(age, isMember, day) {
  if (isChild(age)) {
    return {
      rate: DISCOUNT_RATES.CHILD,
      description: "子供料金50%OFF"
    };
  }

  if (isSenior(age)) {
    return {
      rate: DISCOUNT_RATES.SENIOR,
      description: "シニア料金30%OFF"
    };
  }

  if (isMember && isWeekend(day)) {
    return {
      rate: DISCOUNT_RATES.MEMBER_WEEKEND,
      description: "会員週末料金40%OFF"
    };
  }

  if (isMember) {
    return {
      rate: DISCOUNT_RATES.MEMBER,
      description: "会員料金20%OFF"
    };
  }

  if (isWeekend(day)) {
    return {
      rate: DISCOUNT_RATES.WEEKEND,
      description: "週末料金10%OFF"
    };
  }

  return {
    rate: 0,
    description: "通常料金"
  };
}

// 料金を表示する関数
function displayPrice(price, description) {
  let result = document.getElementById("result");
  result.textContent = "料金: " + price + "円（" + description + "）";
  result.style.color = price < Number(document.getElementById("priceInput").value) ? "blue" : "black";
}

// メイン関数
function calculatePrice() {
  let price = Number(document.getElementById("priceInput").value);
  let age = Number(document.getElementById("ageInput").value);
  let isMember = document.getElementById("memberCheck").checked;
  let day = new Date().getDay();

  // 割引情報を取得
  let discount = getDiscountInfo(age, isMember, day);

  // 最終料金を計算
  let finalPrice = price * (1 - discount.rate);

  // 表示
  displayPrice(finalPrice, discount.description);
}
```

**改善点：**

1. **定数をオブジェクトでグループ化**：関連する定数をまとめて管理
2. **判定ロジックを関数化**：`isChild()`, `isSenior()`, `isWeekend()`で意図が明確
3. **割引情報を構造化**：`getDiscountInfo()`が割引率と説明をオブジェクトで返す
4. **表示処理を分離**：`displayPrice()`関数で表示ロジックを独立化
5. **計算式の統一**：`price * (1 - discount.rate)`で一貫した計算方法

---

## リファクタリングの手順

実際にリファクタリングを行う際は、以下の手順で進めると良いでしょう。

### 1. 動作を確認する

リファクタリングの前に、現在のコードが正しく動作することを確認します。

```javascript
// リファクタリング前にテストケースを実行
console.log("テスト開始");
console.log(getGrade(95));  // "A"が返るはず
console.log(getGrade(85));  // "B"が返るはず
console.log(getGrade(75));  // "C"が返るはず
console.log(getGrade(65));  // "D"が返るはず
console.log(getGrade(55));  // "F"が返るはず
console.log("テスト完了");
```

### 2. 小さく変更する

一度に大きく変更するのではなく、小さな変更を積み重ねます。

**ステップ1：変数化**

```javascript
// 変更前
if (score >= 90) {
  document.getElementById("result").textContent = "A";
}

// 変更後
let result = document.getElementById("result");
if (score >= 90) {
  result.textContent = "A";
}

// 動作確認してから次のステップへ
```

**ステップ2：定数化**

```javascript
// 変更前
if (score >= 90) {
  result.textContent = "A";
}

// 変更後
const GRADE_A_THRESHOLD = 90;
if (score >= GRADE_A_THRESHOLD) {
  result.textContent = "A";
}

// 動作確認してから次のステップへ
```

**ステップ3：関数化**

```javascript
// 変更前
if (score >= GRADE_A_THRESHOLD) {
  result.textContent = "A";
}

// 変更後
function displayGrade(grade) {
  let result = document.getElementById("result");
  result.textContent = grade;
}

if (score >= GRADE_A_THRESHOLD) {
  displayGrade("A");
}

// 動作確認
```

### 3. 重複を見つける

同じようなコードが複数の場所にないか探します。

**重複を見つけるチェックリスト：**

- [ ] 同じ要素を複数回取得していないか
- [ ] 同じ処理を繰り返していないか
- [ ] 似たような条件分岐が複数ないか
- [ ] 同じ数値（マジックナンバー）が複数箇所にないか
- [ ] 同じ文字列が複数箇所にないか

### 4. 関数を抽出する

共通する処理を関数にまとめます。関数名は、その処理が何をするのかが分かる名前にします。

**良い関数名の例：**

```javascript
// 動詞で始まる（何をするのかが明確）
function validateEmail(email) { }
function calculateTotal(items) { }
function showError(message) { }

// is/has/canで始まる（真偽値を返す）
function isValid(value) { }
function hasPermission(user) { }
function canEdit(document) { }

// get/setで始まる（値を取得・設定）
function getGrade(score) { }
function setColor(element, color) { }
```

**悪い関数名の例：**

```javascript
// 曖昧で何をするのか分からない
function process() { }
function handle() { }
function do() { }
function data() { }
```

### 5. 条件を整理する

複雑な条件式を変数に分けたり、早期リターンを使ったりして、条件を整理します。

**整理前：**

```javascript
if (user && user.age >= 18 && user.hasLicense && !user.suspended && user.insurance) {
  allowDriving();
}
```

**整理後：**

```javascript
let isAdult = user && user.age >= 18;
let hasValidLicense = user && user.hasLicense && !user.suspended;
let hasInsurance = user && user.insurance;

if (isAdult && hasValidLicense && hasInsurance) {
  allowDriving();
}
```

### 6. 動作を再確認する

リファクタリング後、コードが正しく動作することを確認します。

```javascript
// リファクタリング後に再度テスト
console.log("リファクタリング後のテスト開始");
console.log(getGrade(95));  // "A"が返るはず
console.log(getGrade(85));  // "B"が返るはず
console.log(getGrade(75));  // "C"が返るはず
console.log(getGrade(65));  // "D"が返るはず
console.log(getGrade(55));  // "F"が返るはず
console.log("テスト完了");
```

### 7. コミット（保存）する

リファクタリングが完了したら、変更を保存します。Gitを使っている場合は、コミットメッセージに「リファクタリング」と明記すると良いでしょう。

```bash
git add .
git commit -m "リファクタリング: 成績判定ロジックを関数化"
```

---

## よくある間違いと解決方法

リファクタリングでよくある間違いと、その解決方法を見ていきましょう。

### 間違い1：一度に大きく変更しすぎる

**問題：**

```javascript
// リファクタリング前のコード全体を一度に書き換えようとする
// → どこで動作がおかしくなったのか分からなくなる
```

**解決方法：**

小さな変更を積み重ねます。1つ変更したら動作確認してから次に進みます。

```javascript
// ステップ1：変数化
// → 動作確認
// ステップ2：定数化
// → 動作確認
// ステップ3：関数化
// → 動作確認
```

### 間違い2：動作を変えてしまう

**問題：**

```javascript
// リファクタリング前
if (age >= 18) {
  console.log("成人です");
}

// 間違ったリファクタリング（動作が変わっている）
if (age > 18) {  // >= が > に変わっている！
  console.log("成人です");
}
```

**解決方法：**

リファクタリング前後で、同じ入力に対して同じ出力が返ることを確認します。

```javascript
// テストケースで動作を確認
console.log(checkAge(17));  // リファクタリング前後で同じ結果になるはず
console.log(checkAge(18));  // リファクタリング前後で同じ結果になるはず
console.log(checkAge(19));  // リファクタリング前後で同じ結果になるはず
```

### 間違い3：過度に抽象化する

**問題：**

```javascript
// 過度に汎用化しすぎて、かえって分かりにくくなる
function process(data, type, config, options, callback) {
  // 複雑すぎて何をするのか分からない
}
```

**解決方法：**

必要以上に汎用化せず、シンプルに保ちます。

```javascript
// シンプルで分かりやすい
function validateEmail(email) {
  return email.includes("@");
}

function validateAge(age) {
  return age >= 18;
}
```

### 間違い4：関数名が不明確

**問題：**

```javascript
// 何をする関数なのか分からない
function check(value) {
  return value > 0;
}

function process(data) {
  // ...
}
```

**解決方法：**

関数名で「何をするのか」が明確に分かるようにします。

```javascript
// 明確な関数名
function isPositive(value) {
  return value > 0;
}

function validateUserInput(data) {
  // ...
}
```

### 間違い5：テストせずにリファクタリング

**問題：**

```javascript
// リファクタリング後、動作確認をせずに次の作業に進む
// → バグに気づかず、後で大きな問題になる
```

**解決方法：**

各ステップで必ず動作確認をします。

```javascript
// ステップごとに動作確認
console.log("テスト: validateEmail");
console.log(validateEmail("test@example.com"));  // true
console.log(validateEmail("invalid"));           // false
console.log("テスト完了");
```

### 間違い6：コメントで説明しようとする

**問題：**

```javascript
// 複雑な条件式にコメントを追加して説明しようとする
// 18歳以上で、免許を持っていて、違反歴がなく、保険に加入している場合
if (age >= 18 && hasLicense && !violation && hasInsurance) {
  // ...
}
```

**解決方法：**

コメントではなく、コード自体を分かりやすくします。

```javascript
// コードで説明する（コメント不要）
let isAdult = age >= 18;
let hasValidLicense = hasLicense && !violation;
let hasValidInsurance = hasInsurance;

if (isAdult && hasValidLicense && hasValidInsurance) {
  // ...
}
```

---

## 実用例：完全なアプリケーション

それでは、リファクタリングを適用した完全なアプリケーションを3つ作ってみましょう。

### 例1：ユーザー登録フォーム

**HTML部分：**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ユーザー登録フォーム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }

    .container {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h1 {
      color: #333;
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 20px;
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
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #007bff;
    }

    button {
      width: 100%;
      background-color: #007bff;
      color: white;
      padding: 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }

    button:hover {
      background-color: #0056b3;
    }

    #result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
      display: none;
      font-weight: bold;
    }

    .error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>ユーザー登録</h1>

    <div class="form-group">
      <label for="nameInput">名前:</label>
      <input type="text" id="nameInput" placeholder="山田太郎">
    </div>

    <div class="form-group">
      <label for="ageInput">年齢:</label>
      <input type="number" id="ageInput" placeholder="20">
    </div>

    <div class="form-group">
      <label for="emailInput">メールアドレス:</label>
      <input type="email" id="emailInput" placeholder="example@email.com">
    </div>

    <div class="form-group">
      <label for="passwordInput">パスワード:</label>
      <input type="password" id="passwordInput" placeholder="8文字以上">
    </div>

    <button onclick="register()">登録</button>

    <div id="result"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

**JavaScript部分（script.js）：**

```javascript
// 定数定義
const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  AGE_MIN: 18,
  AGE_MAX: 120,
  PASSWORD_MIN_LENGTH: 8
};

const MESSAGE_TYPES = {
  ERROR: "error",
  SUCCESS: "success"
};

// メッセージ表示関数
function showMessage(text, type) {
  let result = document.getElementById("result");
  result.textContent = text;
  result.className = type;
  result.style.display = "block";
}

function showError(message) {
  showMessage(message, MESSAGE_TYPES.ERROR);
}

function showSuccess(message) {
  showMessage(message, MESSAGE_TYPES.SUCCESS);
}

// 入力値取得関数
function getInputValue(id) {
  return document.getElementById(id).value.trim();
}

// 名前の検証
function validateName(name) {
  if (!name) {
    showError("名前を入力してください");
    return false;
  }

  if (name.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    showError("名前は" + VALIDATION_RULES.NAME_MIN_LENGTH + "文字以上で入力してください");
    return false;
  }

  if (name.length > VALIDATION_RULES.NAME_MAX_LENGTH) {
    showError("名前は" + VALIDATION_RULES.NAME_MAX_LENGTH + "文字以内で入力してください");
    return false;
  }

  return true;
}

// 年齢の検証
function validateAge(age) {
  if (!age) {
    showError("年齢を入力してください");
    return false;
  }

  let ageNumber = Number(age);

  if (isNaN(ageNumber)) {
    showError("年齢は数値で入力してください");
    return false;
  }

  if (ageNumber < VALIDATION_RULES.AGE_MIN) {
    showError(VALIDATION_RULES.AGE_MIN + "歳以上である必要があります");
    return false;
  }

  if (ageNumber > VALIDATION_RULES.AGE_MAX) {
    showError("有効な年齢を入力してください");
    return false;
  }

  return true;
}

// メールアドレスの検証
function isValidEmailFormat(email) {
  return email.includes("@") && email.includes(".");
}

function validateEmail(email) {
  if (!email) {
    showError("メールアドレスを入力してください");
    return false;
  }

  if (!isValidEmailFormat(email)) {
    showError("有効なメールアドレスを入力してください");
    return false;
  }

  return true;
}

// パスワードの検証
function validatePassword(password) {
  if (!password) {
    showError("パスワードを入力してください");
    return false;
  }

  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    showError("パスワードは" + VALIDATION_RULES.PASSWORD_MIN_LENGTH + "文字以上で入力してください");
    return false;
  }

  return true;
}

// 登録処理
function register() {
  // 入力値を取得
  let name = getInputValue("nameInput");
  let age = getInputValue("ageInput");
  let email = getInputValue("emailInput");
  let password = getInputValue("passwordInput");

  // 各項目を検証（早期リターン）
  if (!validateName(name)) return;
  if (!validateAge(age)) return;
  if (!validateEmail(email)) return;
  if (!validatePassword(password)) return;

  // すべての検証を通過
  showSuccess("登録成功！ようこそ、" + name + "さん");
}
```

**このアプリケーションの特徴：**

1. **定数をオブジェクトで管理**：検証ルールが一箇所に集約
2. **メッセージ表示を関数化**：`showError()`と`showSuccess()`で重複を削除
3. **検証ロジックを分離**：各項目の検証が独立した関数
4. **早期リターン**：エラー時は即座に処理を終了
5. **再利用可能**：各検証関数は他の場所でも使える

### 例2：商品価格計算システム

**HTML部分：**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>商品価格計算</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f8f9fa;
    }

    .container {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    h1 {
      color: #333;
      margin-bottom: 30px;
      text-align: center;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    input[type="number"] {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      box-sizing: border-box;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    button {
      width: 100%;
      background-color: #28a745;
      color: white;
      padding: 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      margin-top: 10px;
    }

    button:hover {
      background-color: #218838;
    }

    #result {
      margin-top: 30px;
      padding: 20px;
      background-color: #e9ecef;
      border-radius: 4px;
      display: none;
    }

    .price-detail {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 8px;
      background-color: white;
      border-radius: 4px;
    }

    .final-price {
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 2px solid #ddd;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🛒 商品価格計算</h1>

    <div class="form-group">
      <label for="priceInput">商品価格（円）:</label>
      <input type="number" id="priceInput" placeholder="1000" value="1000">
    </div>

    <div class="form-group">
      <label for="quantityInput">購入数量:</label>
      <input type="number" id="quantityInput" placeholder="1" value="1">
    </div>

    <div class="form-group">
      <label for="ageInput">年齢:</label>
      <input type="number" id="ageInput" placeholder="20" value="20">
    </div>

    <div class="form-group checkbox-group">
      <input type="checkbox" id="memberCheck">
      <label for="memberCheck" style="margin-bottom: 0;">会員ですか？</label>
    </div>

    <button onclick="calculatePrice()">料金を計算</button>

    <div id="result"></div>
  </div>

  <script>
    // 定数定義
    const PRICE_CONFIG = {
      BASE_PRICE: 1000,
      TAX_RATE: 0.1
    };

    const DISCOUNT_RATES = {
      CHILD: 0.5,           // 50% OFF
      SENIOR: 0.3,          // 30% OFF
      MEMBER_BULK: 0.25,    // 25% OFF (会員+まとめ買い)
      MEMBER: 0.15,         // 15% OFF
      BULK: 0.1             // 10% OFF (5個以上)
    };

    const AGE_CATEGORIES = {
      CHILD_MAX: 12,
      SENIOR_MIN: 65
    };

    const BULK_QUANTITY_THRESHOLD = 5;

    // 年齢カテゴリ判定
    function isChild(age) {
      return age < AGE_CATEGORIES.CHILD_MAX;
    }

    function isSenior(age) {
      return age >= AGE_CATEGORIES.SENIOR_MIN;
    }

    // まとめ買い判定
    function isBulkPurchase(quantity) {
      return quantity >= BULK_QUANTITY_THRESHOLD;
    }

    // 割引情報を取得
    function getDiscountInfo(age, isMember, quantity) {
      // 年齢による割引が最優先
      if (isChild(age)) {
        return {
          rate: DISCOUNT_RATES.CHILD,
          description: "子供割引（50% OFF）"
        };
      }

      if (isSenior(age)) {
        return {
          rate: DISCOUNT_RATES.SENIOR,
          description: "シニア割引（30% OFF）"
        };
      }

      // 会員かつまとめ買い
      if (isMember && isBulkPurchase(quantity)) {
        return {
          rate: DISCOUNT_RATES.MEMBER_BULK,
          description: "会員まとめ買い割引（25% OFF）"
        };
      }

      // 会員のみ
      if (isMember) {
        return {
          rate: DISCOUNT_RATES.MEMBER,
          description: "会員割引（15% OFF）"
        };
      }

      // まとめ買いのみ
      if (isBulkPurchase(quantity)) {
        return {
          rate: DISCOUNT_RATES.BULK,
          description: "まとめ買い割引（10% OFF）"
        };
      }

      // 割引なし
      return {
        rate: 0,
        description: "割引なし"
      };
    }

    // 価格詳細を表示
    function displayPriceDetail(label, value) {
      return '<div class="price-detail"><span>' + label + '</span><span>' + value + '円</span></div>';
    }

    // 結果を表示
    function displayResult(basePrice, quantity, discount, subtotal, tax, total) {
      let html = "";

      html += displayPriceDetail("単価", basePrice.toLocaleString());
      html += displayPriceDetail("数量", quantity);
      html += displayPriceDetail("小計", (basePrice * quantity).toLocaleString());

      if (discount.rate > 0) {
        let discountAmount = basePrice * quantity * discount.rate;
        html += displayPriceDetail("割引 (" + discount.description + ")", "-" + discountAmount.toLocaleString());
      }

      html += displayPriceDetail("割引後", subtotal.toLocaleString());
      html += displayPriceDetail("消費税 (10%)", tax.toLocaleString());
      html += '<div class="final-price">合計金額: ' + total.toLocaleString() + '円</div>';

      let result = document.getElementById("result");
      result.innerHTML = html;
      result.style.display = "block";
    }

    // メイン計算関数
    function calculatePrice() {
      // 入力値を取得
      let basePrice = Number(document.getElementById("priceInput").value);
      let quantity = Number(document.getElementById("quantityInput").value);
      let age = Number(document.getElementById("ageInput").value);
      let isMember = document.getElementById("memberCheck").checked;

      // 割引情報を取得
      let discount = getDiscountInfo(age, isMember, quantity);

      // 価格計算
      let subtotalBeforeDiscount = basePrice * quantity;
      let discountAmount = subtotalBeforeDiscount * discount.rate;
      let subtotal = subtotalBeforeDiscount - discountAmount;
      let tax = Math.floor(subtotal * PRICE_CONFIG.TAX_RATE);
      let total = subtotal + tax;

      // 結果を表示
      displayResult(basePrice, quantity, discount, subtotal, tax, total);
    }

    // ページ読み込み時に初期計算
    window.onload = function() {
      calculatePrice();
    };
  </script>
</body>
</html>
```

**このアプリケーションの特徴：**

1. **定数で設定を管理**：割引率や年齢基準が一箇所に集約
2. **判定ロジックの関数化**：`isChild()`, `isSenior()`, `isBulkPurchase()`で条件が明確
3. **割引ロジックの分離**：`getDiscountInfo()`で割引の優先順位を管理
4. **表示処理の分離**：価格詳細の表示ロジックが独立
5. **計算ロジックの明確化**：メイン関数は計算の流れが一目で分かる

### 例3：条件分岐リファクタリング練習ツール

**完全なHTMLファイル：**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>リファクタリング練習ツール</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 900px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .container {
      background-color: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }

    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 10px;
    }

    .subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 40px;
    }

    .code-section {
      margin-bottom: 30px;
    }

    .code-header {
      background-color: #2d3748;
      color: white;
      padding: 12px 20px;
      border-radius: 8px 8px 0 0;
      font-weight: bold;
    }

    .code-header.before {
      background-color: #e53e3e;
    }

    .code-header.after {
      background-color: #38a169;
    }

    pre {
      background-color: #f7fafc;
      padding: 20px;
      border-radius: 0 0 8px 8px;
      overflow-x: auto;
      margin: 0;
      border: 1px solid #e2e8f0;
    }

    code {
      font-family: 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.6;
    }

    .improvement-list {
      background-color: #edf2f7;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
    }

    .improvement-list h3 {
      color: #2d3748;
      margin-top: 0;
    }

    .improvement-list ul {
      margin: 10px 0;
      padding-left: 25px;
    }

    .improvement-list li {
      margin: 8px 0;
      color: #4a5568;
    }

    .demo-section {
      background-color: #f7fafc;
      padding: 30px;
      border-radius: 8px;
      margin-top: 40px;
    }

    .demo-section h2 {
      color: #2d3748;
      margin-top: 0;
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #4a5568;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 2px solid #cbd5e0;
      border-radius: 4px;
      font-size: 16px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
    }

    button {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 14px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      margin-top: 10px;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    #result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
      display: none;
      font-weight: bold;
    }

    .highlight {
      background-color: #fef5e7;
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔧 条件分岐リファクタリング練習ツール</h1>
    <p class="subtitle">リファクタリング前後のコードを比較して、改善点を学びましょう</p>

    <!-- リファクタリング前のコード -->
    <div class="code-section">
      <div class="code-header before">❌ リファクタリング前（悪い例）</div>
      <pre><code>function checkInput() {
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let email = document.getElementById("emailInput").value;

  if (name === "") {
    document.getElementById("result").textContent = "名前を入力してください";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
  } else if (age === "") {
    document.getElementById("result").textContent = "年齢を入力してください";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
  } else if (Number(age) < 18) {
    document.getElementById("result").textContent = "18歳以上である必要があります";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
  } else if (email === "") {
    document.getElementById("result").textContent = "メールを入力してください";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
  } else if (!email.includes("@")) {
    document.getElementById("result").textContent = "有効なメールアドレスを入力してください";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").style.display = "block";
  } else {
    document.getElementById("result").textContent = "登録成功！";
    document.getElementById("result").style.color = "green";
    document.getElementById("result").style.display = "block";
  }
}</code></pre>
    </div>

    <!-- リファクタリング後のコード -->
    <div class="code-section">
      <div class="code-header after">✅ リファクタリング後（良い例）</div>
      <pre><code>// 定数定義
const MIN_AGE = 18;

// エラーメッセージを表示する関数
function showError(message) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = "red";
  result.style.display = "block";
}

// 成功メッセージを表示する関数
function showSuccess(message) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = "green";
  result.style.display = "block";
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

  if (Number(age) < MIN_AGE) {
    showError(MIN_AGE + "歳以上である必要があります");
    return;
  }

  if (email === "") {
    showError("メールを入力してください");
    return;
  }

  if (!email.includes("@")) {
    showError("有効なメールアドレスを入力してください");
    return;
  }

  // すべての検証を通過
  showSuccess("登録成功！");
}</code></pre>
    </div>

    <!-- 改善点 -->
    <div class="improvement-list">
      <h3>📝 改善点：</h3>
      <ul>
        <li><span class="highlight">重複の削除</span>: <code>document.getElementById("result")</code>の繰り返しを関数化で解消</li>
        <li><span class="highlight">関数化</span>: <code>showError()</code>と<code>showSuccess()</code>で表示処理を共通化</li>
        <li><span class="highlight">早期リターン</span>: ネストを減らし、コードを平坦化</li>
        <li><span class="highlight">定数化</span>: マジックナンバー18を<code>MIN_AGE</code>定数に変更</li>
        <li><span class="highlight">可読性向上</span>: 各検証が独立しており、理解しやすい構造</li>
        <li><span class="highlight">保守性向上</span>: メッセージの表示形式を変更する場合、2つの関数だけを修正すれば良い</li>
      </ul>
    </div>

    <!-- デモセクション -->
    <div class="demo-section">
      <h2>🎮 実際に試してみよう</h2>
      <p>リファクタリング後のコードを実際に動かして、動作を確認できます。</p>

      <div class="form-group">
        <label for="nameInput">名前:</label>
        <input type="text" id="nameInput" placeholder="山田太郎">
      </div>

      <div class="form-group">
        <label for="ageInput">年齢:</label>
        <input type="number" id="ageInput" placeholder="20">
      </div>

      <div class="form-group">
        <label for="emailInput">メールアドレス:</label>
        <input type="email" id="emailInput" placeholder="example@email.com">
      </div>

      <button onclick="checkInput()">登録</button>

      <div id="result"></div>
    </div>
  </div>

  <script>
    // 定数定義
    const MIN_AGE = 18;

    // エラーメッセージを表示する関数
    function showError(message) {
      let result = document.getElementById("result");
      result.textContent = message;
      result.style.color = "red";
      result.style.backgroundColor = "#f8d7da";
      result.style.border = "1px solid #f5c6cb";
      result.style.padding = "15px";
      result.style.borderRadius = "4px";
      result.style.display = "block";
    }

    // 成功メッセージを表示する関数
    function showSuccess(message) {
      let result = document.getElementById("result");
      result.textContent = message;
      result.style.color = "green";
      result.style.backgroundColor = "#d4edda";
      result.style.border = "1px solid #c3e6cb";
      result.style.padding = "15px";
      result.style.borderRadius = "4px";
      result.style.display = "block";
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

      if (Number(age) < MIN_AGE) {
        showError(MIN_AGE + "歳以上である必要があります");
        return;
      }

      if (email === "") {
        showError("メールを入力してください");
        return;
      }

      if (!email.includes("@")) {
        showError("有効なメールアドレスを入力してください");
        return;
      }

      // すべての検証を通過
      showSuccess("登録成功！");
    }
  </script>
</body>
</html>
```

**このアプリケーションの特徴：**

1. **教育的な構成**：リファクタリング前後のコードを並べて比較できる
2. **改善点の明示**：具体的な改善ポイントをリスト表示
3. **インタラクティブ**：実際に動作を試せるデモ機能
4. **視覚的な理解**：色分けやハイライトで重要な箇所を強調
5. **実践的な学習**：理論と実践を組み合わせた学習体験

---

## 練習問題

### 問題1：基本的なリファクタリング

以下のコードをリファクタリングしてください。

**リファクタリング前：**

```javascript
function showGrade() {
  let score = Number(document.getElementById("score").value);

  if (score >= 90) {
    document.getElementById("result").textContent = "評価: A";
    document.getElementById("result").style.color = "blue";
  } else if (score >= 80) {
    document.getElementById("result").textContent = "評価: B";
    document.getElementById("result").style.color = "blue";
  } else if (score >= 70) {
    document.getElementById("result").textContent = "評価: C";
    document.getElementById("result").style.color = "blue";
  } else if (score >= 60) {
    document.getElementById("result").textContent = "評価: D";
    document.getElementById("result").style.color = "orange";
  } else {
    document.getElementById("result").textContent = "評価: F";
    document.getElementById("result").style.color = "red";
  }
}
```

**課題：**

1. `document.getElementById("result")`の重複を削除してください
2. 90、80、70、60という数値を定数にしてください
3. 評価の表示を関数にまとめてください

<details>
<summary>ヒント1: 要素の取得</summary>

```javascript
let result = document.getElementById("result");
```

要素を変数に保存して、何度も取得しないようにしましょう。

</details>

<details>
<summary>ヒント2: 定数の定義</summary>

```javascript
const GRADE_A_THRESHOLD = 90;
const GRADE_B_THRESHOLD = 80;
const GRADE_C_THRESHOLD = 70;
const GRADE_D_THRESHOLD = 60;
```

または、オブジェクトでまとめることもできます。

```javascript
const GRADE_THRESHOLDS = {
  A: 90,
  B: 80,
  C: 70,
  D: 60
};
```

</details>

<details>
<summary>ヒント3: 表示関数</summary>

```javascript
function displayGrade(grade, color) {
  let result = document.getElementById("result");
  result.textContent = "評価: " + grade;
  result.style.color = color;
}
```

</details>

### 問題2：条件の整理

以下のコードの複雑な条件を整理してください。

```javascript
function canAccessContent(user) {
  if (user.age >= 18 && user.hasAccount && !user.isSuspended && user.subscription === "premium" && user.country === "JP") {
    console.log("アクセス許可");
  } else {
    console.log("アクセス拒否");
  }
}
```

**課題：**

1. 条件を意味のある変数に分けてください
2. 定数を使ってマジックな文字列や数値を排除してください

<details>
<summary>ヒント1: 条件を変数に分ける</summary>

```javascript
let isAdult = user.age >= 18;
let hasValidAccount = user.hasAccount && !user.isSuspended;
let isPremiumUser = user.subscription === "premium";
let isJapanUser = user.country === "JP";
```

</details>

<details>
<summary>ヒント2: 定数の定義</summary>

```javascript
const MIN_AGE = 18;
const SUBSCRIPTION_TYPE = {
  PREMIUM: "premium",
  STANDARD: "standard"
};
const COUNTRY = {
  JAPAN: "JP",
  USA: "US"
};
```

</details>

### 問題3：関数化による再利用

以下のコードで重複している検証ロジックを関数化してください。

```javascript
function registerUser() {
  let email = document.getElementById("email").value;

  if (email && email.includes("@") && email.includes(".")) {
    // 登録処理
  } else {
    alert("無効なメールアドレスです");
  }
}

function updateEmail() {
  let newEmail = document.getElementById("newEmail").value;

  if (newEmail && newEmail.includes("@") && newEmail.includes(".")) {
    // 更新処理
  } else {
    alert("無効なメールアドレスです");
  }
}

function sendInvitation() {
  let inviteEmail = document.getElementById("inviteEmail").value;

  if (inviteEmail && inviteEmail.includes("@") && inviteEmail.includes(".")) {
    // 招待処理
  } else {
    alert("無効なメールアドレスです");
  }
}
```

**課題：**

1. メールアドレスの検証ロジックを関数にまとめてください
2. 各関数から共通の検証関数を呼び出すようにしてください

<details>
<summary>ヒント1: 検証関数の作成</summary>

```javascript
function isValidEmail(email) {
  return email && email.includes("@") && email.includes(".");
}
```

</details>

<details>
<summary>ヒント2: 関数の使用</summary>

```javascript
function registerUser() {
  let email = document.getElementById("email").value;

  if (!isValidEmail(email)) {
    alert("無効なメールアドレスです");
    return;
  }

  // 登録処理
}
```

</details>

---

## チェックリスト

このレッスンの内容を理解できたか、以下のチェックリストで確認しましょう。

- [ ] リファクタリングの目的を説明できる
- [ ] DRY原則の意味を理解している
- [ ] コードの重複を見つけられる
- [ ] 重複を削除する方法（変数化、関数化）を理解している
- [ ] マジックナンバーを定数にできる
- [ ] 複雑な条件式を変数に分けられる
- [ ] 条件を整理する方法を理解している
- [ ] 早期リターンを使ってネストを減らせる
- [ ] 判定ロジックを関数化できる
- [ ] 表示処理を関数化できる
- [ ] リファクタリングの手順を説明できる
- [ ] リファクタリング前後で動作が変わらないことを確認できる

---

## ポイント

今回のレッスンの重要なポイントをまとめます。

### 1. リファクタリングの本質

リファクタリングは、**動作を変えずにコードの構造を改善すること**です。

- 機能は変わらない
- 読みやすくなる
- 保守しやすくなる
- バグが減る

### 2. DRY原則

**Don't Repeat Yourself（繰り返しを避けよ）**

- 同じコードを複数書かない
- 変更箇所を最小限にする
- 関数や変数でまとめる

### 3. 重複の削除方法

**変数化:**
```javascript
let element = document.getElementById("result");
```

**関数化:**
```javascript
function showError(message) {
  // 共通処理
}
```

**定数化:**
```javascript
const MIN_AGE = 18;
```

### 4. 条件の整理

**意味のある変数名:**
```javascript
let isAdult = age >= 18;
let hasLicense = user.hasLicense;
```

**早期リターン:**
```javascript
if (!isValid) {
  return;
}
// 正常処理
```

**条件の順序:**
- 優先度の高い条件から
- エラーケースを先に処理
- 正常ケースは最後に

### 5. 関数化のメリット

- **再利用可能**：同じロジックを複数の場所で使える
- **テストしやすい**：関数単位でテストできる
- **修正が簡単**：1か所を修正すれば全体に反映
- **意図が明確**：関数名で処理内容が分かる

### 6. マジックナンバーの排除

数値や文字列を直接書かず、定数にします。

```javascript
// 悪い例
if (age >= 18) { }

// 良い例
const MIN_AGE = 18;
if (age >= MIN_AGE) { }
```

### 7. リファクタリングの手順

1. 動作を確認
2. 小さく変更
3. 動作を再確認
4. 次の変更へ

### 8. よくある改善パターン

- 要素の取得を1回にまとめる
- 表示処理を関数化
- 検証ロジックを関数化
- 定数でマジックナンバーを排除
- 条件を変数に分ける
- 早期リターンでネストを減らす

---

## できるようになったこと

このレッスンを終えて、以下のことができるようになりました。

1. **リファクタリングの目的を理解した**
   - コードの品質を向上させる重要性
   - 動作を変えずに改善する方法
   - 読みやすいコードの価値

2. **重複を見つけて削除できる**
   - DOM要素の取得を最適化
   - 共通処理を関数にまとめる
   - 変数や定数で重複を削減

3. **条件分岐を整理できる**
   - 複雑な条件を変数に分ける
   - 意味のある変数名を使う
   - 早期リターンでネストを減らす
   - 条件の順序を最適化

4. **関数化で再利用性を高められる**
   - 判定ロジックを関数化
   - 表示処理を関数化
   - ユーティリティ関数を作成

5. **マジックナンバーを排除できる**
   - 定数で意味を明確化
   - オブジェクトで関連する定数をグループ化
   - 設定を一箇所で管理

6. **実践的なリファクタリングができる**
   - 段階的に改善する手順
   - 動作確認を忘れない
   - 小さな変更を積み重ねる

7. **コードの品質を評価できる**
   - 良いコードと悪いコードの違い
   - 改善すべきポイントの発見
   - リファクタリングの優先順位

8. **保守性の高いコードを書ける**
   - 修正しやすい構造
   - テストしやすい設計
   - 拡張しやすい実装

---

## まとめ

お疲れ様でした。今回のレッスンでは、条件分岐のリファクタリングについて学びました。

### リファクタリングとは

プログラムの動作を変えずに、コードの構造を改善することです。

**目的：**
- 可読性の向上
- 保守性の向上
- バグの削減
- 再利用性の向上

### 重複の削除

**DRY原則（Don't Repeat Yourself）**に従い、同じコードを繰り返さないようにします。

```javascript
// 悪い例：重複が多い
document.getElementById("result").textContent = "エラー";
document.getElementById("result").style.color = "red";

// 良い例：関数化
function showError(message) {
  let result = document.getElementById("result");
  result.textContent = message;
  result.style.color = "red";
}
```

### 条件の整理

複雑な条件式を、意味のある変数名で分けます。

```javascript
// 悪い例：複雑
if (age >= 18 && hasLicense && !suspended) { }

// 良い例：明確
let isAdult = age >= 18;
let hasValidLicense = hasLicense && !suspended;
if (isAdult && hasValidLicense) { }
```

### 関数化

共通する処理を関数にまとめて、再利用可能にします。

```javascript
// 判定ロジックの関数化
function isValidEmail(email) {
  return email && email.includes("@");
}

// 表示処理の関数化
function displayMessage(text, color) {
  let result = document.getElementById("result");
  result.textContent = text;
  result.style.color = color;
}
```

### リファクタリングの手順

1. **動作を確認**：現在のコードが正しく動作することを確認
2. **小さく変更**：一度に大きく変更せず、段階的に改善
3. **動作を再確認**：変更後も正しく動作することを確認
4. **次の改善へ**：さらなる改善点を見つける

### 実践のポイント

- **最初から完璧を目指さない**：まず動くコードを書き、後でリファクタリング
- **テストを活用**：動作確認を忘れずに
- **チーム内で共有**：良いコードの基準をチームで統一
- **継続的な改善**：定期的にリファクタリングの時間を取る

### 次のステップ

リファクタリングの技術を身につけることで、プロフェッショナルな開発者に一歩近づきました。次のレッスンでは、これまで学んだ知識を総合して、RPG風バトルゲームを作成します。条件分岐、変数、関数、リファクタリングなど、さまざまな技術を組み合わせて、より実践的なプログラムを作っていきましょう。

**重要なポイント:**
- リファクタリングは動作を変えずにコードを改善すること
- DRY原則に従い、重複を削除する
- 条件を整理し、意図を明確にする
- 関数化で再利用性を高める
- 小さな変更を積み重ねる

次のレッスンでお会いしましょう。
