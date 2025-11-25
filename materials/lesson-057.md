---
title: "Lesson 057: 早期リターン"
author: "JavaScript学習教材"
date: "2025-11-20"
---

## なぜ重要なのか

早期リターン（ガード節）は、プロの開発者が必ず身につけている重要なコーディング技法です。実際の開発現場やよく使われるサービスで、この技法がどのように活用されているか、5つの例を見てみましょう。

### 1. GitHubのコードレビュー基準

**GitHub**や多くの企業のコードレビューでは、「ネストの深さは3階層まで」というルールが設けられています。早期リターンを使わないと、このルールを守ることが困難になります。

```javascript
// ❌ ネストが深い（レビューで指摘される）
function processFile(file) {
  if (file !== null) {
    if (file.size > 0) {
      if (file.type === "image") {
        if (file.size < 5000000) {
          // 処理...（4階層目）
        }
      }
    }
  }
}

// ✅ 早期リターンでフラット（レビュー通過）
function processFile(file) {
  if (file === null) return;
  if (file.size === 0) return;
  if (file.type !== "image") return;
  if (file.size >= 5000000) return;

  // 処理...（1階層目のまま）
}
```

### 2. Airbnbのスタイルガイド

世界中で使われている**Airbnbのスタイルガイド**では、早期リターンの使用が推奨されています。これは、コードの可読性と保守性を高めるためです。

```javascript
// Airbnb推奨パターン
function authenticateUser(username, password) {
  // ガード節で異常系を先に処理
  if (!username) return { error: "ユーザー名が必要です" };
  if (!password) return { error: "パスワードが必要です" };
  if (password.length < 8) return { error: "パスワードは8文字以上" };

  // 正常系の処理
  return { success: true, user: createUser(username, password) };
}
```

### 3. React.jsのコンポーネント設計

**React.js**などのフロントエンドフレームワークでは、早期リターンを使ってコンポーネントの描画を制御します。

```javascript
function UserProfile({ user }) {
  // ガード節：ユーザーがいない場合は早期リターン
  if (!user) {
    return <div>ログインしてください</div>;
  }

  if (!user.isVerified) {
    return <div>メール認証が必要です</div>;
  }

  // 正常系：プロフィール表示
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### 4. Node.jsのエラーハンドリング

**Node.js**のサーバーサイド開発では、早期リターンが標準的なエラーハンドリングパターンとして使われています。

```javascript
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  // ガード節で入力検証
  if (!email) return res.status(400).json({ error: "メールが必要" });
  if (!password) return res.status(400).json({ error: "パスワードが必要" });
  if (!isValidEmail(email)) return res.status(400).json({ error: "無効なメール" });

  // 正常系の処理
  const user = createUser(email, password);
  res.status(201).json({ user });
});
```

### 5. TypeScriptの型ガード

**TypeScript**では、早期リターンを使った型ガードが頻繁に使われます。これにより、型安全性を保ちながら、読みやすいコードを書けます。

```javascript
function processData(data: string | null | undefined) {
  // ガード節で型を絞り込む
  if (data === null) return "データがnullです";
  if (data === undefined) return "データが未定義です";
  if (data.length === 0) return "データが空です";

  // ここでは data は必ず string 型で、長さが1以上
  return data.toUpperCase();
}
```

このように、早期リターンは**業界標準のベストプラクティス**として、あらゆる場面で使われています。この技法を身につけることで、プロの開発者と同じレベルのコードが書けるようになります。

## このレッスンで学ぶこと

今回のレッスンでは、**早期リターン（ガード節）**というコーディング技法を学びます。これは、関数の中で条件を満たさない場合に早めに`return`することで、ネストを減らし、コードの可読性を大幅に向上させる方法です。

### 学習する内容

1. **ガード節の書き方**: 条件を満たさない場合に早期returnする方法を学びます
2. **ネストを減らすテクニック**: コードを平坦に保ち、読みやすくする技術を習得します
3. **可読性の高いコードの書き方**: プロの開発者が実践している、保守しやすいコードの書き方を学びます
4. **エラーチェックのパターン**: 入力検証やエラーハンドリングの実践的な方法を学びます
5. **返り値のある関数での早期リターン**: 適切な値を返しながら早期リターンを使う方法を学びます

### 前回の復習

前回のレッスンでは、switch文を学びました。`switch-case`構文を使うことで、1つの変数の値によって処理を分岐させる場合に、if-else ifよりも見やすく書けることを学びました。今回は、条件分岐そのものをよりシンプルに書く方法を学びます。

## ネストが深いコードの問題

プログラムを書いていると、条件分岐が重なって、コードがどんどん右側に深くなっていくことがあります。これを**ネスト（入れ子）が深い**と言います。

### 問題のあるコード例

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
            // やっと本来の処理（5階層目）
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

### このコードの問題点

#### 1. 読みにくい

if文が何重にも重なっていて、どこで何をチェックしているのか分かりにくいです。コードが右にどんどん移動していき、画面に収まりきらなくなります。

```javascript
if (条件1) {
  if (条件2) {
    if (条件3) {
      if (条件4) {
        if (条件5) {
          // ここまで来るのに5階層...
        }
      }
    }
  }
}
```

#### 2. 追いにくい

本来やりたい処理（「登録成功！」の表示）が深い階層にあり、見つけにくいです。関数を読む人は、最初から最後まで追わないと、何をする関数なのか分かりません。

#### 3. 修正しにくい

新しい条件を追加したり、エラーメッセージを変更したりする際に、どこを直せばよいか迷います。例えば「パスワードのチェック」を追加する場合、どこに挿入すればよいでしょうか？

#### 4. 括弧の対応が分かりにくい

閉じ括弧`}`がたくさん並んでいて、どれがどのifに対応するか分かりにくいです。

```javascript
        }
      }
    }
  }
}
```

この5つの`}`は、それぞれどのif文に対応するのでしょうか？数えないと分かりません。

#### 5. デバッグが困難

エラーが発生した時、どの階層でエラーが起きているのか特定するのが難しくなります。

### 認知的負荷の増大

このような深いネストは、**認知的負荷**（コードを理解するために必要な脳の労力）を増大させます。研究によると、人間が一度に頭の中で保持できる情報は5〜9個程度と言われています。ネストが深いと、「今どの条件の内側にいるのか」を常に覚えておく必要があり、脳に負担がかかります。

## 早期リターン（ガード節）とは

**早期リターン**は、条件を満たさない場合に、すぐに関数から抜け出す（return）する書き方です。これにより、ネストを減らし、コードを平坦に保つことができます。

### ガード節の概念

この技法は**ガード節**（Guard Clause）とも呼ばれます。

- **Guard（ガード）** = 見張り、門番
- **Clause（節）** = 文の一部、条項

つまり、「関数の入り口で見張りをして、不正な値が入ってきたらすぐに追い返す」というイメージです。まるで城の門番のように、怪しい者を中に入れないようにします。

### 改善されたコード

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

### 改善点の確認

このコードは、先ほどのネストが深いコードと**全く同じ動作**をしますが、以下の点が大幅に改善されています。

#### 1. コードが平坦（フラット）

すべてのコードが左寄せで書かれており、ネストが1階層のままです。

#### 2. 流れが明確

上から順番に読むだけで、「どんなチェックをして、最後に何をするのか」が分かります。

#### 3. 条件が独立

各チェックが独立しているため、1つの条件だけを見れば、そこで何をチェックしているのかすぐに分かります。

#### 4. 修正が簡単

新しいチェックを追加する場合、同じパターンで書き足すだけです。

```javascript
// パスワードチェックを追加する場合
if (password === "") {
  document.getElementById("result").textContent = "パスワードを入力してください";
  return;
}
```

#### 5. 正常系が最後に明確

すべてのエラーチェックが上部にまとまり、本来やりたい処理（正常系）が関数の最後に来ます。

## 早期リターンのメリット

早期リターンを使うことで、以下のようなメリットがあります。

### 1. コードが平坦になる

ネストが減り、コードが左寄りで平坦になります。画面やエディタで一度に見える範囲が広がり、全体の流れが把握しやすくなります。

```javascript
// ❌ ネストが深い（読みにくい）
function process() {
  if (条件A) {
    if (条件B) {
      if (条件C) {
        if (条件D) {
          // 処理（4階層目）
        }
      }
    }
  }
}

// ✅ 早期リターン（読みやすい）
function process() {
  if (!条件A) return;
  if (!条件B) return;
  if (!条件C) return;
  if (!条件D) return;

  // 処理（1階層目のまま）
}
```

### 2. エラーチェックが分かりやすい

各チェックが独立しているため、どんなエラーをチェックしているのかが一目で分かります。新しい条件を追加する際も、どこに書けばよいかが明確です。

```javascript
// 新しいチェックを追加する場合
if (password === "") {
  document.getElementById("result").textContent = "パスワードを入力してください";
  return;
}

if (password.length < 8) {
  document.getElementById("result").textContent = "パスワードは8文字以上";
  return;
}
```

このように、他のチェックと同じパターンで追加できます。

### 3. 正常な処理が見つけやすい

すべてのエラーチェックが関数の上部にまとまるため、本来やりたい処理（正常系）が関数の最後に来ます。これにより、「この関数が最終的に何をするのか」が見つけやすくなります。

```javascript
function processOrder() {
  // エラーチェック（ガード節）
  if (!商品がある) return "商品がありません";
  if (!在庫がある) return "在庫切れです";
  if (!支払い方法が有効) return "支払い方法が無効です";

  // ここから本来の処理（正常系）
  注文を確定する();
  在庫を減らす();
  メールを送信する();
  return "注文完了";
}
```

関数を読む人は、最後の数行を見れば「この関数が何をするのか」がすぐに分かります。

### 4. 修正やデバッグが簡単

各条件が独立しているため、特定の条件だけを修正したり、デバッグしたりするのが簡単です。

```javascript
// デバッグ時にログを追加する場合
if (age === "") {
  console.log("デバッグ: 年齢が空です");  // ログを1行追加するだけ
  document.getElementById("result").textContent = "年齢を入力してください";
  return;
}
```

ネストが深いコードでは、どの`}`がどの`if`に対応するのかを追う必要がありましたが、早期リターンではその心配がありません。

### 5. 認知的負荷が低い

読む人は「今どの条件の内側にいるのか」を覚えておく必要がなくなります。各チェックが独立しているため、1つずつ順番に理解すればよいのです。

### 6. テストが書きやすい

各条件が独立しているため、テストケースを書きやすくなります。

```javascript
// テストケース
test("名前が空の場合", () => {
  // 名前だけ空にして、他は正しい値
  // 期待結果: "名前を入力してください"
});

test("年齢が18未満の場合", () => {
  // 年齢だけ17にして、他は正しい値
  // 期待結果: "18歳以上である必要があります"
});
```

### 7. バグが入りにくい

ネストが深いコードでは、`else`の対応を間違えたり、括弧の位置を間違えたりしやすいですが、早期リターンではそのようなミスが起こりにくくなります。

## ガード節の基本パターン

ガード節は、主に以下のようなパターンで使われます。

### パターン1: 空文字チェック

ユーザー入力が空でないかチェックします。

```javascript
function processInput() {
  let input = document.getElementById("input").value;

  // ガード節：空文字チェック
  if (input === "") {
    document.getElementById("result").textContent = "入力してください";
    return;
  }

  // 正常な処理
  document.getElementById("result").textContent = "入力値: " + input;
}
```

### パターン2: 数値範囲チェック

数値が有効な範囲内かチェックします。

```javascript
function checkAge() {
  let age = document.getElementById("ageInput").value;
  let ageNumber = Number(age);

  // ガード節：範囲チェック
  if (ageNumber < 0) {
    document.getElementById("result").textContent = "0以上の値を入力してください";
    return;
  }

  if (ageNumber > 150) {
    document.getElementById("result").textContent = "正しい年齢を入力してください";
    return;
  }

  // 正常な処理
  document.getElementById("result").textContent = "年齢: " + ageNumber + "歳";
}
```

### パターン3: 型チェック

データの型が正しいかチェックします。

```javascript
function calculateDiscount() {
  let price = document.getElementById("priceInput").value;
  let priceNumber = Number(price);

  // ガード節：数値かチェック
  if (isNaN(priceNumber)) {
    document.getElementById("result").textContent = "数値を入力してください";
    return;
  }

  // 正常な処理
  let discount = priceNumber * 0.1;
  document.getElementById("result").textContent = "割引額: " + discount + "円";
}
```

### パターン4: 形式チェック

データが特定の形式に従っているかチェックします。

```javascript
function validateEmail() {
  let email = document.getElementById("emailInput").value;

  // ガード節：@が含まれているかチェック
  if (!email.includes("@")) {
    document.getElementById("result").textContent = "有効なメールアドレスを入力してください";
    return;
  }

  // ガード節：.が含まれているかチェック
  if (!email.includes(".")) {
    document.getElementById("result").textContent = "有効なメールアドレスを入力してください";
    return;
  }

  // 正常な処理
  document.getElementById("result").textContent = "メールアドレス: " + email;
}
```

### パターン5: nullやundefinedチェック

データが存在するかチェックします。

```javascript
function displayUserInfo(user) {
  // ガード節：userが存在するかチェック
  if (user === null) {
    console.log("ユーザーがnullです");
    return;
  }

  if (user === undefined) {
    console.log("ユーザーが未定義です");
    return;
  }

  // 正常な処理
  console.log("ユーザー名: " + user.name);
}
```

### パターン6: 権限チェック

ユーザーが操作を実行する権限があるかチェックします。

```javascript
function deletePost(user, post) {
  // ガード節：ログインしているかチェック
  if (!user) {
    alert("ログインしてください");
    return;
  }

  // ガード節：投稿の所有者かチェック
  if (user.id !== post.authorId) {
    alert("他人の投稿は削除できません");
    return;
  }

  // 正常な処理
  post.delete();
  alert("投稿を削除しました");
}
```

## ネストを減らすコツ

早期リターンを効果的に使うための実践的なコツを紹介します。

### コツ1: 否定条件でチェックする

「〜でない場合」という否定形でチェックし、該当したらすぐにreturnします。

```javascript
// ❌ ネストが深い
function process() {
  if (name !== "") {
    // 長い処理...
    // 長い処理...
    // 長い処理...
  }
}

// ✅ 早期リターン
function process() {
  if (name === "") {
    return;
  }

  // 長い処理...
  // 長い処理...
  // 長い処理...
}
```

肯定条件（`if (name !== "")`）で書くと、その中に処理を書く必要がありますが、否定条件（`if (name === "")`）で書くと、エラーケースを早期returnして、正常な処理を外に出せます。

### コツ2: エラーケースを先に書く

エラーや例外的なケースを関数の最初にまとめて書き、正常なケースを最後に書きます。

```javascript
function processData() {
  // エラーケースをすべて先に書く
  if (!data) return "データがありません";
  if (data.length === 0) return "データが空です";
  if (!data.isValid) return "データが無効です";

  // 正常な処理
  return data.process();
}
```

この構造により、「何がエラーか」と「正常時に何をするか」が明確に分離されます。

### コツ3: 1つのチェックに1つのif文

複雑な条件を1つのif文にまとめるのではなく、分割して書くと分かりやすくなります。

```javascript
// ❌ まとめて書く（分かりにくい）
function validate() {
  if (name === "" || age === "" || email === "") {
    document.getElementById("result").textContent = "すべて入力してください";
    return;
  }
  // ...
}

// ✅ 分けて書く（分かりやすい）
function validate() {
  if (name === "") {
    document.getElementById("result").textContent = "名前を入力してください";
    return;
  }

  if (age === "") {
    document.getElementById("result").textContent = "年齢を入力してください";
    return;
  }

  if (email === "") {
    document.getElementById("result").textContent = "メールアドレスを入力してください";
    return;
  }
  // ...
}
```

個別にエラーメッセージを表示する場合は、分けて書く方が親切です。

### コツ4: returnを1行で書く（シンプルな場合）

処理が単純な場合、returnを1行で書くこともできます。

```javascript
function validate() {
  if (name === "") return;
  if (age === "") return;
  if (email === "") return;

  // 正常な処理
}
```

ただし、エラーメッセージを表示する場合は、複数行の方が分かりやすいです。

### コツ5: コメントで意図を明示

ガード節にコメントをつけると、何をチェックしているのかがより明確になります。

```javascript
function registerUser() {
  // ガード節：必須項目のチェック
  if (name === "") return "名前が必要です";
  if (email === "") return "メールアドレスが必要です";

  // ガード節：形式のチェック
  if (!email.includes("@")) return "無効なメールアドレスです";

  // ガード節：重複チェック
  if (emailExists(email)) return "このメールアドレスは既に登録されています";

  // 正常な処理：ユーザー登録
  return createUser(name, email);
}
```

### コツ6: 関数を小さく保つ

早期リターンを使っても、関数が長すぎると読みにくくなります。1つの関数は20〜30行程度に収めることを目指しましょう。

```javascript
// 長い関数は分割する
function registerUser() {
  // 検証を別関数に分離
  let error = validateInput(name, age, email);
  if (error) {
    document.getElementById("result").textContent = error;
    return;
  }

  // 正常な処理
  createUser(name, age, email);
}

function validateInput(name, age, email) {
  if (name === "") return "名前を入力してください";
  if (age === "") return "年齢を入力してください";
  if (email === "") return "メールアドレスを入力してください";
  return null;  // エラーなし
}
```

## よくある間違い

早期リターンを使う上で、初心者がよくやってしまう間違いを6つ紹介します。

### 1. returnを関数の外で使おうとする

**間違い:**

```javascript
let name = prompt("名前を入力してください");

if (name === "") {
  alert("名前を入力してください");
  return;  // ❌ エラー：関数の外でreturnは使えない
}

console.log("名前: " + name);
```

**エラーメッセージ:**
```
Uncaught SyntaxError: Illegal return statement
```

**正しい書き方:**

```javascript
function getName() {
  let name = prompt("名前を入力してください");

  if (name === "") {
    alert("名前を入力してください");
    return;  // ✅ 関数の中で使う
  }

  console.log("名前: " + name);
}

getName();
```

`return`は**必ず関数の中で**使います。

### 2. ネストを減らしきれていない

**間違い:**

```javascript
function validate() {
  if (name !== "") {
    // ここでreturnすべき
    if (age !== "") {
      // 処理...
    }
  }
}
```

**正しい書き方:**

```javascript
function validate() {
  if (name === "") return;
  if (age === "") return;

  // 処理...
}
```

否定条件（`=== ""`）でチェックしてreturnすることで、ネストを完全に排除できます。

### 3. returnし忘れる

**間違い:**

```javascript
function validate() {
  if (name === "") {
    document.getElementById("result").textContent = "名前を入力してください";
    // ❌ returnがないので、処理が続行される
  }

  // 正常な処理が実行されてしまう
  document.getElementById("result").textContent = "登録成功！";
}
```

**結果:**
名前が空でも「登録成功！」と表示されてしまいます（後の代入が上書きするため）。

**正しい書き方:**

```javascript
function validate() {
  if (name === "") {
    document.getElementById("result").textContent = "名前を入力してください";
    return;  // ✅ returnを忘れない
  }

  document.getElementById("result").textContent = "登録成功！";
}
```

### 4. 返り値のある関数で値を返さない

**間違い:**

```javascript
function getDiscount(price) {
  if (price < 0) {
    return;  // ❌ 値を返していない
  }

  return price * 0.1;
}

let discount = getDiscount(-100);
console.log(discount);  // undefined
```

**正しい書き方:**

```javascript
function getDiscount(price) {
  if (price < 0) {
    return 0;  // ✅ 適切な値を返す
  }

  return price * 0.1;
}

let discount = getDiscount(-100);
console.log(discount);  // 0
```

返り値がある関数では、すべてのreturnで適切な値を返します。

### 5. エラーメッセージが不親切

**間違い:**

```javascript
function validate() {
  if (name === "") return;
  if (age === "") return;
  if (email === "") return;

  alert("登録成功");
}
```

ユーザーは何が間違っているのか分かりません。

**正しい書き方:**

```javascript
function validate() {
  if (name === "") {
    alert("名前を入力してください");
    return;
  }

  if (age === "") {
    alert("年齢を入力してください");
    return;
  }

  if (email === "") {
    alert("メールアドレスを入力してください");
    return;
  }

  alert("登録成功");
}
```

### 6. 複雑な条件をそのまま書く

**間違い:**

```javascript
function validate() {
  if (!(name !== "" && age >= 18 && email.includes("@"))) {
    return;
  }

  // 処理...
}
```

否定の否定で分かりにくくなっています。

**正しい書き方:**

```javascript
function validate() {
  if (name === "") return;
  if (age < 18) return;
  if (!email.includes("@")) return;

  // 処理...
}
```

1つずつシンプルな条件に分割します。

## 実用例1: 入力検証アプリ

早期リターンを使った入力検証アプリを作ってみましょう。

### 完全なコード

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>会員登録フォーム</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    h1 {
      color: white;
      text-align: center;
      margin-bottom: 30px;
      font-size: 28px;
    }

    .form-group {
      background: white;
      padding: 20px;
      border-radius: 15px;
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
    }

    button {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
      margin-top: 10px;
    }

    button:hover {
      transform: scale(1.05);
    }

    button:active {
      transform: scale(0.95);
    }

    .result {
      background: white;
      padding: 20px;
      border-radius: 15px;
      margin-top: 20px;
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .result-text {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }

    .success {
      color: #10b981;
    }

    .error {
      color: #ef4444;
    }
  </style>
</head>
<body>
  <h1>📝 会員登録</h1>

  <div class="form-group">
    <label for="nameInput">名前</label>
    <input type="text" id="nameInput" placeholder="山田太郎">
  </div>

  <div class="form-group">
    <label for="ageInput">年齢</label>
    <input type="number" id="ageInput" placeholder="20">
  </div>

  <div class="form-group">
    <label for="emailInput">メールアドレス</label>
    <input type="email" id="emailInput" placeholder="example@example.com">
  </div>

  <button onclick="validateForm()">登録する</button>

  <div class="result">
    <div id="result" class="result-text">フォームを入力してください</div>
  </div>

  <script>
    function validateForm() {
      // 入力値を取得
      const name = document.getElementById("nameInput").value;
      const age = document.getElementById("ageInput").value;
      const email = document.getElementById("emailInput").value;
      const result = document.getElementById("result");

      // ガード節：名前のチェック
      if (name === "") {
        result.textContent = "名前を入力してください";
        result.className = "result-text error";
        return;
      }

      if (name.length < 2) {
        result.textContent = "名前は2文字以上で入力してください";
        result.className = "result-text error";
        return;
      }

      // ガード節：年齢のチェック
      if (age === "") {
        result.textContent = "年齢を入力してください";
        result.className = "result-text error";
        return;
      }

      const ageNumber = Number(age);
      if (ageNumber < 18) {
        result.textContent = "18歳以上である必要があります";
        result.className = "result-text error";
        return;
      }

      if (ageNumber > 150) {
        result.textContent = "正しい年齢を入力してください";
        result.className = "result-text error";
        return;
      }

      // ガード節：メールアドレスのチェック
      if (email === "") {
        result.textContent = "メールアドレスを入力してください";
        result.className = "result-text error";
        return;
      }

      if (!email.includes("@")) {
        result.textContent = "有効なメールアドレスを入力してください";
        result.className = "result-text error";
        return;
      }

      if (!email.includes(".")) {
        result.textContent = "有効なメールアドレスを入力してください";
        result.className = "result-text error";
        return;
      }

      // すべてのチェックを通過した場合
      result.textContent = "✅ 登録成功！ようこそ、" + name + "さん";
      result.className = "result-text success";
      console.log("ユーザー登録:", { name, age: ageNumber, email });
    }
  </script>
</body>
</html>
```

### コードの解説

#### 1. 入力値の取得

```javascript
const name = document.getElementById("nameInput").value;
const age = document.getElementById("ageInput").value;
const email = document.getElementById("emailInput").value;
```

まず、3つの入力欄から値を取得します。

#### 2. 名前のチェック（ガード節）

```javascript
if (name === "") {
  result.textContent = "名前を入力してください";
  result.className = "result-text error";
  return;
}

if (name.length < 2) {
  result.textContent = "名前は2文字以上で入力してください";
  result.className = "result-text error";
  return;
}
```

名前が空、または2文字未満の場合、エラーメッセージを表示してreturnします。

#### 3. 年齢のチェック（ガード節）

```javascript
if (age === "") {
  result.textContent = "年齢を入力してください";
  result.className = "result-text error";
  return;
}

const ageNumber = Number(age);
if (ageNumber < 18) {
  result.textContent = "18歳以上である必要があります";
  result.className = "result-text error";
  return;
}

if (ageNumber > 150) {
  result.textContent = "正しい年齢を入力してください";
  result.className = "result-text error";
  return;
}
```

年齢が空、18未満、または150を超える場合、エラーメッセージを表示してreturnします。

#### 4. メールアドレスのチェック（ガード節）

```javascript
if (email === "") {
  result.textContent = "メールアドレスを入力してください";
  result.className = "result-text error";
  return;
}

if (!email.includes("@")) {
  result.textContent = "有効なメールアドレスを入力してください";
  result.className = "result-text error";
  return;
}

if (!email.includes(".")) {
  result.textContent = "有効なメールアドレスを入力してください";
  result.className = "result-text error";
  return;
}
```

メールアドレスが空、@が含まれていない、または.が含まれていない場合、エラーメッセージを表示してreturnします。

#### 5. 登録成功（正常系）

```javascript
result.textContent = "✅ 登録成功！ようこそ、" + name + "さん";
result.className = "result-text success";
console.log("ユーザー登録:", { name, age: ageNumber, email });
```

すべてのガード節を通過した場合のみ、この部分に到達し、登録成功のメッセージを表示します。

## 実用例2: ログインフォーム

もう1つの例として、ログインフォームを作ってみましょう。

### 完全なコード

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ログインフォーム</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 450px;
      margin: 100px auto;
      padding: 40px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    h1 {
      color: white;
      text-align: center;
      margin-bottom: 30px;
      font-size: 32px;
    }

    .form-group {
      background: white;
      padding: 20px;
      border-radius: 15px;
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #4facfe;
    }

    button {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
      margin-top: 10px;
    }

    button:hover {
      transform: scale(1.05);
    }

    .result {
      background: white;
      padding: 20px;
      border-radius: 15px;
      margin-top: 20px;
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .result-text {
      font-size: 16px;
      font-weight: bold;
      text-align: center;
    }

    .success {
      color: #10b981;
    }

    .error {
      color: #ef4444;
    }

    .info {
      color: #6b7280;
    }
  </style>
</head>
<body>
  <h1>🔐 ログイン</h1>

  <div class="form-group">
    <label for="usernameInput">ユーザー名</label>
    <input type="text" id="usernameInput" placeholder="user123">
  </div>

  <div class="form-group">
    <label for="passwordInput">パスワード</label>
    <input type="password" id="passwordInput" placeholder="8文字以上">
  </div>

  <button onclick="login()">ログイン</button>

  <div class="result">
    <div id="result" class="result-text info">情報を入力してください</div>
  </div>

  <script>
    // デモ用の認証情報
    const validUsers = {
      "user123": "password123",
      "test": "testpass"
    };

    function login() {
      // 入力値を取得
      const username = document.getElementById("usernameInput").value;
      const password = document.getElementById("passwordInput").value;
      const result = document.getElementById("result");

      // ガード節：ユーザー名のチェック
      if (username === "") {
        result.textContent = "ユーザー名を入力してください";
        result.className = "result-text error";
        return;
      }

      if (username.length < 3) {
        result.textContent = "ユーザー名は3文字以上である必要があります";
        result.className = "result-text error";
        return;
      }

      // ガード節：パスワードのチェック
      if (password === "") {
        result.textContent = "パスワードを入力してください";
        result.className = "result-text error";
        return;
      }

      if (password.length < 8) {
        result.textContent = "パスワードは8文字以上である必要があります";
        result.className = "result-text error";
        return;
      }

      // ガード節：ユーザーの存在チェック
      if (!validUsers[username]) {
        result.textContent = "ユーザー名またはパスワードが間違っています";
        result.className = "result-text error";
        return;
      }

      // ガード節：パスワードの一致チェック
      if (validUsers[username] !== password) {
        result.textContent = "ユーザー名またはパスワードが間違っています";
        result.className = "result-text error";
        return;
      }

      // すべてのチェックを通過した場合（ログイン成功）
      result.textContent = "✅ ログイン成功！ようこそ、" + username + "さん";
      result.className = "result-text success";
      console.log("ログイン成功:", username);
    }
  </script>
</body>
</html>
```

### コードの解説

このログインフォームでは、以下のチェックを順番に行っています。

1. **ユーザー名が空でないか**
2. **ユーザー名が3文字以上か**
3. **パスワードが空でないか**
4. **パスワードが8文字以上か**
5. **ユーザーが存在するか**
6. **パスワードが正しいか**

すべてのチェックを通過した場合のみ、ログイン成功のメッセージが表示されます。

## 返り値のある関数での早期リターン

これまでは返り値のない関数（単に`return;`で終了）の例を見てきましたが、返り値のある関数でも早期リターンは非常に有効です。

### パターン1: エラー時に特定の値を返す

```javascript
function getDiscount(price) {
  // ガード節：無効な価格
  if (price < 0) {
    return 0;
  }

  if (price === 0) {
    return 0;
  }

  // ガード節：割引対象外
  if (price < 1000) {
    return 0;
  }

  // 正常な処理：10%割引
  return price * 0.1;
}

console.log(getDiscount(-100));  // 0
console.log(getDiscount(500));   // 0
console.log(getDiscount(2000));  // 200
```

### パターン2: エラーメッセージを返す

```javascript
function validatePassword(password) {
  // ガード節：各種チェック
  if (password === "") {
    return "パスワードを入力してください";
  }

  if (password.length < 8) {
    return "パスワードは8文字以上である必要があります";
  }

  if (!password.match(/[0-9]/)) {
    return "パスワードには数字を含める必要があります";
  }

  if (!password.match(/[a-zA-Z]/)) {
    return "パスワードには英字を含める必要があります";
  }

  // すべてのチェックを通過
  return null;  // エラーなし
}

let error = validatePassword("abc");
if (error) {
  console.log(error);  // "パスワードは8文字以上である必要があります"
} else {
  console.log("パスワードは有効です");
}
```

### パターン3: 段階的な値の返却

```javascript
function getShippingFee(prefecture, price) {
  // ガード節：送料無料の条件
  if (price >= 5000) {
    return 0;
  }

  // ガード節：特別エリア
  if (prefecture === "沖縄" || prefecture === "北海道") {
    return 1500;
  }

  // 通常エリア
  return 500;
}

console.log(getShippingFee("東京", 3000));   // 500
console.log(getShippingFee("沖縄", 3000));   // 1500
console.log(getShippingFee("東京", 6000));   // 0
```

### パターン4: オブジェクトを返す

```javascript
function calculateOrder(quantity, price) {
  // ガード節：無効な入力
  if (quantity <= 0) {
    return { error: "数量は1以上である必要があります" };
  }

  if (price <= 0) {
    return { error: "価格は0より大きい必要があります" };
  }

  // ガード節：在庫チェック
  if (quantity > 100) {
    return { error: "在庫が不足しています" };
  }

  // 正常な処理
  const total = quantity * price;
  const discount = total >= 10000 ? total * 0.1 : 0;

  return {
    quantity: quantity,
    unitPrice: price,
    subtotal: total,
    discount: discount,
    total: total - discount
  };
}

let result = calculateOrder(5, 2000);
if (result.error) {
  console.log("エラー:", result.error);
} else {
  console.log("合計:", result.total, "円");
}
```

## 練習問題

### 問題1: 割引計算アプリ

商品価格を入力すると、割引額を計算するアプリを作成しましょう。早期リターンを使って、入力検証を行います。

**要件:**
- 価格が空の場合、エラーメッセージを表示
- 価格が0以下の場合、エラーメッセージを表示
- 価格が1000円未満の場合、「割引対象外」と表示
- 価格が1000円以上の場合、10%の割引額を表示

<details>
<summary>ヒント1: ガード節の構造</summary>

```javascript
function calculateDiscount() {
  const price = document.getElementById("priceInput").value;

  // ガード節1
  if (price === "") {
    // エラーメッセージ
    return;
  }

  const priceNumber = Number(price);

  // ガード節2
  if (priceNumber <= 0) {
    // エラーメッセージ
    return;
  }

  // ガード節3
  if (priceNumber < 1000) {
    // 割引対象外メッセージ
    return;
  }

  // 正常な処理
  const discount = priceNumber * 0.1;
  // 結果を表示
}
```
</details>

<details>
<summary>ヒント2: 結果の表示</summary>

```javascript
document.getElementById("result").textContent = "割引額: " + discount + "円";
```
</details>

<details>
<summary>解答例</summary>

```javascript
function calculateDiscount() {
  const price = document.getElementById("priceInput").value;
  const result = document.getElementById("result");

  // ガード節：空文字チェック
  if (price === "") {
    result.textContent = "価格を入力してください";
    return;
  }

  const priceNumber = Number(price);

  // ガード節：0以下チェック
  if (priceNumber <= 0) {
    result.textContent = "0より大きい値を入力してください";
    return;
  }

  // ガード節：割引対象チェック
  if (priceNumber < 1000) {
    result.textContent = "割引対象外（1000円以上で10%割引）";
    return;
  }

  // 正常な処理
  const discount = priceNumber * 0.1;
  result.textContent = "割引額: " + discount + "円（10%割引）";
}
```
</details>

### 問題2: パスワード検証アプリ

パスワードを入力すると、強度をチェックするアプリを作成しましょう。

**要件:**
- パスワードが空の場合、エラーメッセージを表示
- パスワードが8文字未満の場合、エラーメッセージを表示
- パスワードに数字が含まれていない場合、エラーメッセージを表示
- すべてのチェックを通過した場合、「パスワードは有効です」と表示

<details>
<summary>ヒント1: 数字が含まれているかチェック</summary>

```javascript
// 0-9の数字が含まれているかチェック
if (!password.match(/[0-9]/)) {
  // エラー
}
```

`match(/[0-9]/)`は、文字列に数字が含まれている場合にtrueを返します。
</details>

<details>
<summary>ヒント2: ガード節の順番</summary>

1. 空文字チェック
2. 長さチェック
3. 数字の有無チェック
4. すべて通過したら成功メッセージ
</details>

<details>
<summary>解答例</summary>

```javascript
function validatePassword() {
  const password = document.getElementById("passwordInput").value;
  const result = document.getElementById("result");

  // ガード節：空文字チェック
  if (password === "") {
    result.textContent = "パスワードを入力してください";
    return;
  }

  // ガード節：長さチェック
  if (password.length < 8) {
    result.textContent = "パスワードは8文字以上である必要があります";
    return;
  }

  // ガード節：数字の有無チェック
  if (!password.match(/[0-9]/)) {
    result.textContent = "パスワードには数字を含める必要があります";
    return;
  }

  // すべてのチェックを通過
  result.textContent = "✅ パスワードは有効です";
}
```
</details>

### 問題3: BMI計算アプリ（応用）

身長と体重を入力すると、BMIを計算するアプリを作成しましょう。早期リターンを使って、複数の入力値を検証します。

**要件:**
- 身長が空の場合、エラーメッセージを表示
- 体重が空の場合、エラーメッセージを表示
- 身長が0以下または300以上の場合、エラーメッセージを表示
- 体重が0以下または500以上の場合、エラーメッセージを表示
- すべてのチェックを通過した場合、BMIを計算して表示

BMIの計算式: `体重(kg) / (身長(m) * 身長(m))`

<details>
<summary>ヒント1: 身長をメートルに変換</summary>

```javascript
const heightNumber = Number(height);
const weightNumber = Number(weight);

// 身長をcmからmに変換
const heightInMeters = heightNumber / 100;

// BMI計算
const bmi = weightNumber / (heightInMeters * heightInMeters);
```
</details>

<details>
<summary>ヒント2: 小数点以下を丸める</summary>

```javascript
const bmi = weightNumber / (heightInMeters * heightInMeters);
const bmiRounded = Math.round(bmi * 10) / 10;  // 小数点第1位まで
```
</details>

<details>
<summary>解答例</summary>

```javascript
function calculateBMI() {
  const height = document.getElementById("heightInput").value;
  const weight = document.getElementById("weightInput").value;
  const result = document.getElementById("result");

  // ガード節：身長が空
  if (height === "") {
    result.textContent = "身長を入力してください";
    return;
  }

  // ガード節：体重が空
  if (weight === "") {
    result.textContent = "体重を入力してください";
    return;
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  // ガード節：身長の範囲チェック
  if (heightNumber <= 0 || heightNumber >= 300) {
    result.textContent = "身長は0〜300の範囲で入力してください";
    return;
  }

  // ガード節：体重の範囲チェック
  if (weightNumber <= 0 || weightNumber >= 500) {
    result.textContent = "体重は0〜500の範囲で入力してください";
    return;
  }

  // 正常な処理：BMI計算
  const heightInMeters = heightNumber / 100;
  const bmi = weightNumber / (heightInMeters * heightInMeters);
  const bmiRounded = Math.round(bmi * 10) / 10;

  result.textContent = "BMI: " + bmiRounded;
}
```
</details>

## デバッグのヒント

早期リターンを使ったプログラムでバグが発生した時の確認ポイントを紹介します。

### 1. returnを書き忘れていないか確認

最も多い原因は、`return`の書き忘れです。

```javascript
// デバッグ方法
function validate() {
  if (name === "") {
    console.log("ここでreturnすべき");  // ログを追加
    document.getElementById("result").textContent = "エラー";
    return;  // これがあるか確認
  }
}
```

### 2. 条件の順番を確認

条件の順番によって、正しく動作しないことがあります。

```javascript
// ❌ 間違った順番
if (price < 1000) {
  return "割引対象外";
}

if (price <= 0) {  // これは実行されない（-100は < 1000 に引っかかるため）
  return "エラー";
}

// ✅ 正しい順番
if (price <= 0) {
  return "エラー";
}

if (price < 1000) {
  return "割引対象外";
}
```

より厳しい条件（エラーチェック）を先に書きます。

### 3. console.logで動作確認

各ガード節でログを出力して、どこを通っているか確認します。

```javascript
function validate() {
  console.log("検証開始");

  if (name === "") {
    console.log("名前が空です");
    return;
  }
  console.log("名前のチェックを通過");

  if (age === "") {
    console.log("年齢が空です");
    return;
  }
  console.log("年齢のチェックを通過");

  console.log("すべてのチェックを通過");
}
```

### 4. 返り値がある関数で値を返しているか確認

```javascript
function getDiscount(price) {
  if (price < 0) {
    return 0;  // ✅ 値を返している
  }

  if (price < 1000) {
    return;  // ❌ 値を返していない（undefinedになる）
  }

  return price * 0.1;
}
```

### 5. 関数の外でreturnを使っていないか確認

```javascript
// ❌ エラー
if (name === "") {
  return;  // 関数の外では使えない
}

// ✅ 正しい
function validate() {
  if (name === "") {
    return;  // 関数の中で使う
  }
}
```

## チェックリスト

早期リターンを書く時に確認すべき10項目のチェックリストです。

- [ ] 1. `return`は関数の中で使っている
- [ ] 2. 各ガード節で`return`を書き忘れていない
- [ ] 3. エラーチェックを正常な処理よりも先に書いている
- [ ] 4. 否定条件（`=== ""`など）でチェックしている
- [ ] 5. 条件の順番が適切（より厳しい条件を先に）
- [ ] 6. ネストが深くならないようにしている
- [ ] 7. 各チェックが独立していて分かりやすい
- [ ] 8. エラーメッセージが親切で分かりやすい
- [ ] 9. 返り値がある関数で、すべてのreturnで値を返している
- [ ] 10. 正常な処理が関数の最後に来ている

## ポイント

今回のレッスンの重要なポイントを8つにまとめます。

### 1. ガード節で入り口を守る

関数の入り口で条件をチェックし、満たさない場合はすぐにreturnします。まるで門番のように、不正な値を関数の中に入れないようにします。

### 2. ネストを減らして平坦に

早期リターンを使うことで、ネストを減らし、コードを左寄りで平坦に保つことができます。これにより、全体の流れが把握しやすくなります。

### 3. 否定条件でチェック

「〜でない場合」という否定形でチェックし、該当したらすぐにreturnします。肯定条件だとネストが深くなってしまいます。

### 4. エラーケースを先に書く

エラーや例外的なケースを関数の最初にまとめて書き、正常なケースを最後に書きます。これにより、「何がエラーか」と「正常時に何をするか」が明確に分離されます。

### 5. 正常系は最後に

すべてのエラーチェックが上部にまとまり、本来やりたい処理（正常系）が関数の最後に来ます。関数を読む人は、最後の数行を見れば「この関数が何をするのか」がすぐに分かります。

### 6. 1つのチェックに1つのif文

複雑な条件を1つのif文にまとめるのではなく、分割して書くと分かりやすくなります。特に、個別のエラーメッセージを表示する場合は分けて書きます。

### 7. 返り値のある関数では値を返す

返り値がある関数で早期リターンを使う場合、すべてのreturnで適切な値を返します。エラー時は0やnullなど、適切なデフォルト値を返します。

### 8. 業界標準のベストプラクティス

早期リターンは、GitHubやAirbnbなどのコーディング規約で推奨されている、業界標準のベストプラクティスです。プロの開発者も頻繁に使う重要なテクニックです。

## できるようになったこと

このレッスンを終えて、あなたができるようになったことを8つ確認しましょう。

### 1. ガード節を書ける

関数の入り口で条件をチェックし、満たさない場合はすぐにreturnするガード節を書けるようになりました。

### 2. ネストを減らせる

深いネストを避け、コードを平坦に保つことができるようになりました。これにより、コードの可読性が大幅に向上します。

### 3. エラーチェックを整理できる

エラーチェックを関数の上部にまとめ、正常な処理を最後に配置できるようになりました。コードの構造が明確になります。

### 4. 入力検証ができる

ユーザーからの入力値を適切に検証し、エラーメッセージを表示できるようになりました。実用的なフォーム検証を実装できます。

### 5. 返り値のある関数で早期リターンを使える

返り値がある関数でも、適切な値を返しながら早期リターンを使えるようになりました。

### 6. 可読性の高いコードが書ける

プロの開発者が実践している、読みやすく保守しやすいコードの書き方を身につけました。

### 7. デバッグが効率的にできる

各チェックが独立しているため、どこでエラーが起きているのかを素早く特定できるようになりました。

### 8. ベストプラクティスを実践できる

業界標準のコーディング規約に従った、プロフェッショナルなコードが書けるようになりました。

## まとめ

お疲れ様でした。今回のレッスンでは、早期リターン（ガード節）について学びました。

### 学んだこと

1. **ガード節の書き方**: 条件を満たさない場合に早期returnし、ネストを減らす方法
2. **ネストを減らすテクニック**: 否定条件でチェックし、エラーケースを先に書くことで、コードを平坦に保つ
3. **可読性の向上**: エラーチェックと正常な処理を明確に分離し、読みやすいコードを書く
4. **実践的なパターン**: 入力検証、範囲チェック、形式チェックなど、様々な場面で使えるパターン
5. **返り値のある関数**: 適切な値を返しながら早期リターンを使う方法

### 早期リターンの利点

- **読みやすさ**: コードが平坦で、全体の流れが把握しやすい
- **保守性**: 各チェックが独立しているため、修正や追加が簡単
- **デバッグ**: エラーの原因を素早く特定できる
- **認知的負荷の軽減**: 複雑なネストを覚えておく必要がない

### 注意点

- **returnは関数の中でのみ使える**: 関数の外では使えない
- **returnを忘れない**: エラーメッセージを表示した後、必ずreturnする
- **条件の順番**: より厳しい条件（エラーチェック）を先に書く
- **返り値**: 返り値がある関数では、すべてのreturnで適切な値を返す

早期リターンは、**プロの開発者が必ず身につけている重要なテクニック**です。GitHubやAirbnbなどのコーディング規約でも推奨されており、業界標準のベストプラクティスとして広く使われています。

この技法を身につけることで、あなたのコードは格段に読みやすく、保守しやすくなります。特に、フォームの入力検証やエラーハンドリングなど、実際の開発で頻繁に使う場面で威力を発揮します。

次のレッスンでは、真偽値の活用について学びます。フラグ変数や状態管理など、ブーリアン値を使った実践的なテクニックを習得していきましょう。

## 次のステップ

### 復習するとよいレッスン

- **Lesson 014: if文の基礎** - 条件分岐の基本を復習しましょう
- **Lesson 015: else if文** - 多分岐の基本を復習しましょう
- **Lesson 056: switch文** - 別の条件分岐の方法と比較しましょう

### 次に学ぶこと

- **Lesson 058: 真偽値の活用** - フラグ変数や状態管理を学びます
- **Lesson 059: 論理演算子の応用** - より複雑な条件式を学びます

### さらに学びたい人へ

- **リファクタリング**: 既存のネストが深いコードを、早期リターンで書き直してみましょう
- **他のベストプラクティス**: Airbnbスタイルガイドなどを調べてみましょう
- **実際のコード**: GitHubのオープンソースプロジェクトで、早期リターンがどう使われているか見てみましょう
