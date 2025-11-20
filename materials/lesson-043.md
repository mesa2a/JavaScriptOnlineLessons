# レッスン43: 週のまとめプロジェクト

これまでのレッスンで、条件分岐、エラー処理、バリデーションについて学んできました。このレッスンでは、これらを組み合わせて実用的な「プロフィール作成ツール」を作ります。

## これまで学んだこと

### レッスン33-36: 条件分岐の基礎
- if文の基本
- 比較演算子（===、!==、>、<、>=、<=）
- 文字列の比較
- 複数の判定の組み合わせ

### レッスン37-39: 高度な条件分岐
- else文（二択の判定）
- else if文（多分岐）
- ネスト（if文の中にif文）

### レッスン40: エラー処理
- NaNの判定（isNaN）
- 空文字列チェック
- 0で割るチェック
- returnで処理を終了

### レッスン41-42: 入力とバリデーション
- promptとinputの比較
- 空文字チェック
- lengthを使った文字数チェック
- フィードバック表示

## プロジェクト: プロフィール作成ツール

これまで学んだ内容を組み合わせて、プロフィール作成ツールを作ります。

### 必要な機能
1. 名前の入力（バリデーション付き）
2. 年齢の入力（数値チェック付き）
3. プロフィールの生成
4. エラーメッセージの表示

## 実装例

### HTML構造

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>プロフィール作成ツール</title>
  <script src="script.js"></script>
</head>
<body>
  <h1>プロフィール作成ツール</h1>

  <section>
    <h2>情報入力</h2>
    <div>
      <label>名前:</label>
      <input id="name" type="text" placeholder="名前を入力">
    </div>
    <div>
      <label>年齢:</label>
      <input id="age" type="text" placeholder="年齢を入力">
    </div>
    <button onclick="createProfile()">プロフィール作成</button>
  </section>

  <section>
    <h2>結果</h2>
    <p id="result"></p>
    <p id="error" style="color: red;"></p>
  </section>
</body>
</html>
```

### JavaScript実装

```javascript
function createProfile() {
  const name = document.getElementById("name").value;
  const ageValue = document.getElementById("age").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  // 結果とエラーをクリア
  result.textContent = "";
  error.textContent = "";

  // 名前のバリデーション
  if (name === "") {
    error.textContent = "名前を入力してください";
    return;
  }

  if (name.length < 2) {
    error.textContent = "名前は2文字以上入力してください";
    return;
  }

  // 年齢のバリデーション
  if (ageValue === "") {
    error.textContent = "年齢を入力してください";
    return;
  }

  const age = Number(ageValue);

  if (isNaN(age)) {
    error.textContent = "年齢は数値で入力してください";
    return;
  }

  if (age < 0 || age > 150) {
    error.textContent = "年齢は0〜150の範囲で入力してください";
    return;
  }

  // プロフィール作成
  let profile = "名前: " + name + "\n";
  profile = profile + "年齢: " + age + "歳\n";

  // 年齢グループの判定
  if (age < 18) {
    profile = profile + "グループ: 未成年";
  } else if (age < 65) {
    profile = profile + "グループ: 成人";
  } else {
    profile = profile + "グループ: シニア";
  }

  result.textContent = profile;
}
```

## 段階的な実装

### ステップ1: 基本的な入力と表示

まず、バリデーションなしで基本的な機能を実装します。

```javascript
function createProfile() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const result = document.getElementById("result");

  result.textContent = "名前: " + name + ", 年齢: " + age;
}
```

### ステップ2: 空文字チェックを追加

```javascript
function createProfile() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  error.textContent = "";
  result.textContent = "";

  if (name === "" || age === "") {
    error.textContent = "すべての項目を入力してください";
    return;
  }

  result.textContent = "名前: " + name + ", 年齢: " + age;
}
```

### ステップ3: 詳細なバリデーションを追加

```javascript
function createProfile() {
  // 前述の完全な実装
}
```

## 拡張機能

### 機能1: 住所の追加

```javascript
const address = document.getElementById("address").value;

if (address === "") {
  error.textContent = "住所を入力してください";
  return;
}

profile = profile + "\n住所: " + address;
```

### 機能2: 趣味の追加

```javascript
const hobby = document.getElementById("hobby").value;

if (hobby !== "") {
  profile = profile + "\n趣味: " + hobby;
}
```

### 機能3: リセット機能

```javascript
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("error").textContent = "";
}
```

## まとめ

このレッスンでは、以下のことを実践しました。

- これまで学んだ条件分岐を組み合わせる
- 複数のバリデーションを順番に実行する
- エラーメッセージと成功メッセージの使い分け
- returnで早期終了する
- 実用的なアプリケーションの構造

次の章では、より高度な条件分岐について学びます。

## 練習問題

### 問題1: 基本的なプロフィール作成

名前と年齢を入力して、プロフィールを作成するプログラムを作成してください。

- 名前が空の場合: エラーメッセージを表示
- 年齢が空の場合: エラーメッセージを表示
- 両方入力されている場合: プロフィールを表示

### 問題2: バリデーション追加

問題1に以下のバリデーションを追加してください。

- 名前は2文字以上
- 年齢は数値
- 年齢は0以上150以下

### 問題3: 拡張機能

問題2に以下の機能を追加してください。

- 年齢グループの判定（18歳未満、18歳以上65歳未満、65歳以上）
- リセットボタン

---

お疲れ様でした。次の章では、AND演算子やOR演算子を使った複雑な条件について学びます。
