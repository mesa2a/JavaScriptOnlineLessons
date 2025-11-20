# レッスン39: ネスト

これまでのレッスンでは、if文、else文、else if文を学んできました。このレッスンでは、ifの中にifを書く「ネスト」について学びます。ネストを使うことで、より複雑な条件判定ができるようになります。

## ネストとは

ネストとは、入れ子構造のことです。if文の中に別のif文を書くことができます。

```javascript
if (条件1) {
  if (条件2) {
    // 条件1と条件2の両方が満たされた場合の処理
  }
}
```

これは「条件1が満たされた場合、さらに条件2をチェックする」という意味です。

## 実践例: 年齢と身長のチェック

年齢が18歳以上で、かつ身長が150cm以上の場合にメッセージを表示するプログラムを作ってみましょう。

```javascript
function checkEligibility() {
  let age = 20;
  let height = 160;

  if (age >= 18) {
    if (height >= 150) {
      const elem = document.getElementById("result");
      elem.textContent = "条件を満たしています";
    }
  }
}
```

このプログラムでは:
1. まずageが18以上かをチェック
2. ageが18以上の場合、heightが150以上かをチェック
3. 両方満たしていれば、メッセージを表示

## ネストとelseの組み合わせ

ネストの中でもelseを使えます。

```javascript
function checkAge() {
  let age = 25;

  if (age >= 18) {
    if (age >= 65) {
      const elem = document.getElementById("result");
      elem.textContent = "シニアです";
    } else {
      const elem = document.getElementById("result");
      elem.textContent = "成人です";
    }
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "未成年です";
  }
}
```

このプログラムでは:
- ageが18未満: 「未成年です」
- ageが18以上65未満: 「成人です」
- ageが65以上: 「シニアです」

## 実践例: パスワードと年齢のチェック

パスワードが正しい場合のみ、年齢をチェックするプログラムを作ってみましょう。

```javascript
function checkAccess() {
  let password = "abc123";
  let age = 20;

  if (password === "abc123") {
    if (age >= 18) {
      const elem = document.getElementById("result");
      elem.textContent = "アクセス許可";
    } else {
      const elem = document.getElementById("result");
      elem.textContent = "年齢が足りません";
    }
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "パスワードが違います";
  }
}
```

## インデント（字下げ）の重要性

ネストを使うときは、インデント（字下げ）を正しく行うことが重要です。

```javascript
// 読みやすい
if (条件1) {
  if (条件2) {
    処理
  }
}

// 読みにくい
if (条件1) {
if (条件2) {
処理
}
}
```

インデントを正しく行うことで、どのif文がどのブロックに属しているかが分かりやすくなります。

## 実践例: 3つの条件をチェック

パスワード、年齢、会員ステータスの3つをチェックするプログラムを作ってみましょう。

```javascript
function checkMembership() {
  let password = "abc123";
  let age = 25;
  let isMember = "yes";

  if (password === "abc123") {
    if (age >= 20) {
      if (isMember === "yes") {
        const elem = document.getElementById("result");
        elem.textContent = "特別コンテンツにアクセスできます";
      } else {
        const elem = document.getElementById("result");
        elem.textContent = "会員登録が必要です";
      }
    } else {
      const elem = document.getElementById("result");
      elem.textContent = "20歳以上である必要があります";
    }
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "パスワードが違います";
  }
}
```

## ネストの深さ

ネストは何段階でも書けますが、深くなりすぎると読みにくくなります。

```javascript
// 深すぎるネスト（避けるべき）
if (条件1) {
  if (条件2) {
    if (条件3) {
      if (条件4) {
        if (条件5) {
          // 深すぎる
        }
      }
    }
  }
}
```

一般的には、2〜3段階までが読みやすいとされています。

## ネストを使わない書き方との比較

同じ処理を、ネストを使わずに書くこともできます。

ネストを使う場合:
```javascript
if (age >= 18) {
  if (height >= 150) {
    elem.textContent = "OK";
  }
}
```

ネストを使わない場合:
```javascript
if (age >= 18) {
  // 何も書かない
}

if (height >= 150) {
  // 何も書かない
}

if (age >= 18) {
  if (height >= 150) {
    elem.textContent = "OK";
  }
}
```

ネストを使う方が、条件の関係が明確になります。

## 実践例: 割引判定

年齢と購入金額に応じて割引を判定するプログラムを作ってみましょう。

```javascript
function checkDiscount() {
  let age = 70;
  let amount = 3000;

  if (age >= 65) {
    if (amount >= 1000) {
      const elem = document.getElementById("result");
      elem.textContent = "シニア割引が適用されます";
    } else {
      const elem = document.getElementById("result");
      elem.textContent = "1000円以上でシニア割引が適用されます";
    }
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "シニア割引は65歳以上が対象です";
  }
}
```

## まとめ

このレッスンでは、以下のことを学びました。

- ネストとはif文の中にif文を書くこと
- ネストを使うと複数の条件を段階的にチェックできる
- インデント（字下げ）を正しく行うことが重要
- ネストの中でもelseが使える
- ネストは2〜3段階までが読みやすい

次のレッスンでは、これまで学んだif文を使ってエラー処理を行う方法を学びます。

## 練習問題

### 問題1: 年齢と点数のチェック

ボタンをクリックしたときに、以下の条件をチェックするプログラムを作成してください。

1. 年齢が18歳以上の場合
2. その上で、点数が80点以上の場合に「合格です」と表示

ネストを使ってください。

### 問題2: パスワードと会員チェック

ボタンをクリックしたときに、以下の条件をチェックするプログラムを作成してください。

1. パスワードが"hello"と等しい場合
2. その上で、会員ステータスが"premium"と等しい場合に「プレミアム会員です」と表示
3. パスワードが正しくて会員ステータスが"premium"でない場合は「一般会員です」と表示
4. パスワードが違う場合は「認証失敗」と表示

### 問題3: 3段階チェック

ボタンをクリックしたときに、以下の3つの条件をチェックするプログラムを作成してください。

1. 年齢が20歳以上
2. 点数が60点以上
3. 出席率が80以上

すべて満たしている場合に「すべての条件をクリアしました」と表示してください。

---

次のレッスンでは、エラー処理について学びます。
