---
title: "Lesson 057: 早期リターン"
author: "JavaScript学習教材"
date: "2025-11-20"
---

## 今回の学習

### 前回の復習

前回のレッスンでは、switch文を学びました。`switch-case`構文を使うことで、1つの変数の値によって処理を分岐させる場合に、if-else ifよりも見やすく書けることを学びました。各caseの最後には必ず`break`を書くこと、そして`default`節で想定外の値に対応することが重要でした。

### 今回の目標

今回のレッスンでは、**早期リターン**というコーディング技法を学びます。これは、関数の中で条件を満たさない場合に早めに`return`することで、ネストを減らし、コードの可読性を大幅に向上させる方法です。

今回のレッスンで習得する内容は以下の通りです。

- ガード節の書き方と使い方
- ネストを減らすテクニック
- 可読性の高いコードの書き方

## ネストが深いコードの問題

プログラムを書いていると、条件分岐が重なって、コードがどんどん右側に深くなっていくことがあります。これを**ネスト（入れ子）が深い**と言います。

例えば、以下のような会員登録の検証を行う関数を見てください。

```javascript
function registerUser() {
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let email = document.getElementById("emailInput").value;

  if (name !== "") {
    if (age !== "") {
      let ageNumber = Number(age);
      if (ageNumber >= 18) {
        if (email !== "") {
          if (email.includes("@")) {
            // やっと本来の処理
            document.getElementById("result").textContent = "登録成功！";
            console.log("ユーザー登録: " + name);
          } else {
            document.getElementById("result").textContent = "メールアドレスが無効です";
          }
        } else {
          document.getElementById("result").textContent = "メールアドレスを入力してください";
        }
      } else {
        document.getElementById("result").textContent = "18歳以上である必要があります";
      }
    } else {
      document.getElementById("result").textContent = "年齢を入力してください";
    }
  } else {
    document.getElementById("result").textContent = "名前を入力してください";
  }
}
```

このコードには以下のような問題があります。

1. **読みにくい**: ifが何重にも重なっていて、どこで何をチェックしているのか分かりにくい
2. **追いにくい**: 本来やりたい処理（登録成功）が深い階層にあり、見つけにくい
3. **修正しにくい**: 新しい条件を追加したり、エラーメッセージを変更したりする際に、どこを直せばよいか迷う
4. **括弧の対応**: 閉じ括弧`}`がたくさん並んでいて、どれがどのifに対応するか分かりにくい

このように、ネストが深いコードは**可読性が低く**、バグの温床になりやすいのです。特に、実際のプロジェクトでは条件がさらに増えることが多く、ネストがどんどん深くなってしまいます。

## 早期リターン（ガード節）とは

**早期リターン**は、条件を満たさない場合に、すぐに関数から抜け出す（return）する書き方です。これにより、ネストを減らし、コードを平坦に保つことができます。

この技法は**ガード節**（Guard Clause）とも呼ばれます。「ガード（guard）」は「見張り」という意味で、関数の入り口で不正な値を見張り、問題があればすぐに追い返すイメージです。

先ほどの複雑なコードを、早期リターンを使って書き直してみましょう。

```javascript
function registerUser() {
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let email = document.getElementById("emailInput").value;

  // ガード節：名前のチェック
  if (name === "") {
    document.getElementById("result").textContent = "名前を入力してください";
    return;
  }

  // ガード節：年齢のチェック
  if (age === "") {
    document.getElementById("result").textContent = "年齢を入力してください";
    return;
  }

  let ageNumber = Number(age);
  if (ageNumber < 18) {
    document.getElementById("result").textContent = "18歳以上である必要があります";
    return;
  }

  // ガード節：メールアドレスのチェック
  if (email === "") {
    document.getElementById("result").textContent = "メールアドレスを入力してください";
    return;
  }

  if (!email.includes("@")) {
    document.getElementById("result").textContent = "メールアドレスが無効です";
    return;
  }

  // すべてのチェックを通過した場合の処理
  document.getElementById("result").textContent = "登録成功！";
  console.log("ユーザー登録: " + name);
}
```

このコードは、先ほどのネストが深いコードと全く同じ動作をしますが、読みやすさが格段に向上しています。

各チェックで問題があれば、すぐに`return`して関数から抜けるため、ネストが深くなりません。そして、すべてのチェックを通過したコードだけが最後に実行されます。

## 早期リターンのメリット

早期リターンを使うことで、以下のようなメリットがあります。

### 1. コードが平坦になる

ネストが減り、コードが左寄りで平坦になります。画面やエディタで一度に見える範囲が広がり、全体の流れが把握しやすくなります。

```javascript
// ネストが深い（読みにくい）
if (条件A) {
  if (条件B) {
    if (条件C) {
      // 処理
    }
  }
}

// 早期リターン（読みやすい）
if (!条件A) return;
if (!条件B) return;
if (!条件C) return;
// 処理
```

### 2. エラーチェックが分かりやすい

各チェックが独立しているため、どんなエラーをチェックしているのかが一目で分かります。新しい条件を追加する際も、どこに書けばよいかが明確です。

```javascript
// 新しいチェックを追加する場合
if (password === "") {
  document.getElementById("result").textContent = "パスワードを入力してください";
  return;
}
```

このように、他のチェックと同じパターンで追加できます。

### 3. 正常な処理が見つけやすい

すべてのエラーチェックが関数の上部にまとまるため、本来やりたい処理（正常系）が関数の最後に来ます。これにより、「この関数が最終的に何をするのか」が見つけやすくなります。

```javascript
function processOrder() {
  // エラーチェック（ガード節）
  if (!商品がある) return;
  if (!在庫がある) return;
  if (!支払い方法が有効) return;

  // ここから本来の処理
  注文を確定する();
  在庫を減らす();
  メールを送信する();
}
```

### 4. 修正やデバッグが簡単

各条件が独立しているため、特定の条件だけを修正したり、デバッグしたりするのが簡単です。ネストが深いコードでは、どの`}`がどの`if`に対応するのかを追う必要がありましたが、早期リターンではその心配がありません。

## ガード節のパターン

ガード節は、主に以下のような場面で使われます。

### パターン1: 入力検証

ユーザーからの入力値をチェックし、不正な値であれば早期に終了します。

```javascript
function calculateDiscount() {
  let price = document.getElementById("priceInput").value;
  let priceNumber = Number(price);

  // ガード節：入力値の検証
  if (price === "") {
    document.getElementById("result").textContent = "価格を入力してください";
    return;
  }

  if (isNaN(priceNumber)) {
    document.getElementById("result").textContent = "数値を入力してください";
    return;
  }

  if (priceNumber < 0) {
    document.getElementById("result").textContent = "0以上の値を入力してください";
    return;
  }

  // 正常な処理
  let discount = priceNumber * 0.1;
  document.getElementById("result").textContent = "割引額: " + discount + "円";
}
```

### パターン2: 条件を満たさない場合の除外

特定の条件を満たさない場合に、処理をスキップします。

```javascript
function checkAge() {
  let age = document.getElementById("ageInput").value;
  let ageNumber = Number(age);

  // ガード節：年齢チェック
  if (ageNumber < 20) {
    document.getElementById("result").textContent = "20歳未満は利用できません";
    return;
  }

  // 正常な処理
  document.getElementById("result").textContent = "ようこそ！";
}
```

### パターン3: 空や未定義のチェック

データが空や未定義の場合に、エラーを防ぐために早期終了します。

```javascript
function displayUserInfo() {
  let userName = document.getElementById("userInput").value;

  // ガード節：空文字チェック
  if (userName === "") {
    document.getElementById("result").textContent = "ユーザー名を入力してください";
    return;
  }

  // 正常な処理
  document.getElementById("result").textContent = "こんにちは、" + userName + "さん";
}
```

## ネストを減らすコツ

早期リターンを使う際のコツをいくつか紹介します。

### 1. 否定条件でチェックする

「〜でない場合」という否定形でチェックし、該当したらすぐにreturnします。

```javascript
// ネストが深い
if (name !== "") {
  // 長い処理
}

// 早期リターン
if (name === "") {
  return;
}
// 長い処理
```

### 2. エラーケースを先に書く

エラーや例外的なケースを関数の最初にまとめて書き、正常なケースを最後に書きます。

```javascript
function processData() {
  // エラーケースをすべて先に書く
  if (エラー1) return;
  if (エラー2) return;
  if (エラー3) return;

  // 正常な処理
}
```

### 3. 1つのチェックに1つのif文

複雑な条件を1つのif文にまとめるのではなく、分割して書くと分かりやすくなります。

```javascript
// まとめて書く（分かりにくい）
if (name === "" || age === "" || email === "") {
  return;
}

// 分けて書く（分かりやすい）
if (name === "") return;
if (age === "") return;
if (email === "") return;
```

ただし、エラーメッセージを個別に表示したい場合は、それぞれ別々に書く必要があります。

## 実践：入力検証アプリ

それでは、早期リターンを使った入力検証アプリを作ってみましょう。ユーザーが名前、年齢、メールアドレスを入力し、すべて正しく入力されている場合のみ「登録成功」と表示します。

**HTML部分:**

```html
<h1>会員登録</h1>
<input type="text" id="nameInput" placeholder="名前">
<input type="number" id="ageInput" placeholder="年齢">
<input type="email" id="emailInput" placeholder="メールアドレス">
<button onclick="validateForm()">登録</button>
<p id="result"></p>
```

**JavaScript部分:**

```javascript
function validateForm() {
  // 入力値を取得
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let email = document.getElementById("emailInput").value;

  // ガード節：名前のチェック
  if (name === "") {
    document.getElementById("result").textContent = "名前を入力してください";
    return;
  }

  // ガード節：年齢のチェック
  if (age === "") {
    document.getElementById("result").textContent = "年齢を入力してください";
    return;
  }

  let ageNumber = Number(age);
  if (ageNumber < 18) {
    document.getElementById("result").textContent = "18歳以上である必要があります";
    return;
  }

  // ガード節：メールアドレスのチェック
  if (email === "") {
    document.getElementById("result").textContent = "メールアドレスを入力してください";
    return;
  }

  if (!email.includes("@")) {
    document.getElementById("result").textContent = "有効なメールアドレスを入力してください";
    return;
  }

  // すべてのチェックを通過した場合
  document.getElementById("result").textContent = "登録成功！";
}
```

このコードは、以下のような流れで動作します。

1. **入力値の取得**: 3つの入力欄から値を取得します
2. **名前のチェック**: 空文字の場合、エラーメッセージを表示してreturn
3. **年齢のチェック**: 空文字、または18歳未満の場合、エラーメッセージを表示してreturn
4. **メールアドレスのチェック**: 空文字、または@が含まれていない場合、エラーメッセージを表示してreturn
5. **登録成功**: すべてのチェックを通過した場合のみ、この行に到達します

各チェックが独立しているため、どこでどんな検証をしているのかが一目で分かります。また、新しい検証ルールを追加する場合も、同じパターンで簡単に追加できます。

## 注意点

早期リターンは便利ですが、いくつか注意点があります。

### 1. returnは関数の中でのみ使える

`return`文は関数の中でのみ使用できます。関数の外で使うとエラーになります。

```javascript
// エラー：関数の外でreturnは使えない
if (条件) {
  return;
}

// 正しい：関数の中で使う
function check() {
  if (条件) {
    return;
  }
}
```

### 2. 複数のreturnポイント

早期リターンを使うと、関数の中に複数の`return`が存在することになります。これは一般的には問題ありませんが、関数が非常に長い場合、どこでreturnしているのか分かりにくくなることがあります。そのため、関数は短く保つことが推奨されます。

### 3. 返り値がある関数の場合

返り値がある関数で早期リターンを使う場合、すべてのreturnで適切な値を返すようにします。

```javascript
function getDiscount(price) {
  // ガード節
  if (price < 0) {
    return 0;
  }

  if (price < 1000) {
    return 0;
  }

  // 正常な処理
  return price * 0.1;
}
```

## 練習問題

### 課題

早期リターン（ガード節）を使った入力検証アプリを作成しましょう。名前、年齢、メールアドレスを入力し、すべて正しい場合のみ「登録成功」と表示します。エラーがある場合は、適切なエラーメッセージを表示します。

### 保存場所

`exercises/lesson-057/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. ガード節を使って各入力値をチェックする
2. ネストを深くせず、平坦なコードを書く
3. すべてのチェックを通過した場合のみ「登録成功」を表示する

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-057
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

- 各入力値は`document.getElementById`で取得します
- 最初に名前が空文字かチェックし、空なら早期returnします
- 次に年齢が空文字かチェックし、空なら早期returnします
- 年齢を数値に変換し、18未満なら早期returnします
- メールアドレスが空文字かチェックし、空なら早期returnします
- メールアドレスに@が含まれているかチェックし、含まれていなければ早期returnします
- すべてのチェックを通過した場合、関数の最後に到達し、「登録成功！」を表示します
- 各`return`の前に、適切なエラーメッセージを`textContent`で表示します

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 057</title>
</head>
<body>
    <h1>会員登録</h1>
    <input type="text" id="nameInput" placeholder="名前">
    <input type="number" id="ageInput" placeholder="年齢">
    <input type="email" id="emailInput" placeholder="メールアドレス">
    <button onclick="validateForm()">登録</button>
    <p id="result"></p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
function validateForm() {
  // 入力値を取得
  let name = document.getElementById("nameInput").value;
  let age = document.getElementById("ageInput").value;
  let email = document.getElementById("emailInput").value;

  // ガード節：名前のチェック
  if (name === "") {
    document.getElementById("result").textContent = "名前を入力してください";
    return;
  }

  // ガード節：年齢のチェック
  if (age === "") {
    document.getElementById("result").textContent = "年齢を入力してください";
    return;
  }

  let ageNumber = Number(age);
  if (ageNumber < 18) {
    document.getElementById("result").textContent = "18歳以上である必要があります";
    return;
  }

  // ガード節：メールアドレスのチェック
  if (email === "") {
    document.getElementById("result").textContent = "メールアドレスを入力してください";
    return;
  }

  if (!email.includes("@")) {
    document.getElementById("result").textContent = "有効なメールアドレスを入力してください";
    return;
  }

  // すべてのチェックを通過した場合
  document.getElementById("result").textContent = "登録成功！";
}
```

### 解説

このプログラムは、早期リターン（ガード節）を使って入力検証を行います。

1. **入力値の取得**: 名前、年齢、メールアドレスの3つの入力値を取得します

2. **名前のチェック**: 名前が空文字の場合、エラーメッセージを表示して関数から早期returnします。これにより、以降の処理は実行されません

3. **年齢のチェック**: 年齢が空文字の場合、エラーメッセージを表示して早期returnします。次に、年齢を数値に変換し、18未満の場合も早期returnします

4. **メールアドレスのチェック**: メールアドレスが空文字の場合、または@が含まれていない場合、エラーメッセージを表示して早期returnします

5. **登録成功**: すべてのガード節を通過した場合のみ、この最後の行に到達し、「登録成功！」が表示されます

このように、早期リターンを使うことで、ネストが深くならず、各チェックが独立して見やすいコードになりました。新しい検証ルールを追加する場合も、同じパターンで簡単に追加できます。

## まとめ

お疲れ様でした。今回のレッスンでは、早期リターンについて学びました。

**今回のキーポイント:**

- **ガード節**: 関数の入り口で条件をチェックし、満たさない場合はすぐにreturnする書き方です。「guard（見張り）」のように、不正な値を関数の入り口で追い返すイメージです。これにより、ネストを減らし、コードを平坦に保つことができます

- **ネストを減らす**: 条件分岐が重なると、コードが右側に深くなり、読みにくくなります。早期リターンを使うことで、ネストを減らし、コードを左寄りで平坦に保つことができます。これにより、全体の流れが把握しやすくなります

- **可読性の向上**: エラーチェックを関数の上部にまとめることで、本来の処理が関数の最後に明確に配置されます。各チェックが独立しているため、どこで何をチェックしているのかが一目で分かり、修正やデバッグも簡単になります。新しい条件を追加する際も、同じパターンで追加できるため、保守性が高まります

早期リターンは、プロの開発者も頻繁に使う重要なテクニックです。特に、入力検証やエラーチェックが多い関数では、早期リターンを使うことで、コードの品質が大きく向上します。

次のレッスンでは、真偽値の活用について学びます。フラグ変数や状態管理など、ブーリアン値を使った実践的なテクニックを習得していきましょう。
