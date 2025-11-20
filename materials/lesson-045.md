# レッスン45: OR演算（||）

## このレッスンで学ぶこと

前回はAND演算子(&&)で「両方とも満たす」条件を学びました。今回は、OR演算子(||)を使って「どちらか一方を満たす」条件を表現する方法を学びます。

## OR演算子とは

OR演算子(||)は、2つ以上の条件の**どちらか一方でも**真の時、全体が真になります。

```javascript
if (条件A || 条件B) {
  // 条件Aまたは条件Bのどちらかが真の時に実行される
}
```

日常生活での例:
- 「土曜日**または**日曜日なら休み」
- 「雨が降っている**または**雪が降っているなら傘が必要」
- 「現金**または**クレジットカードで支払える」

## 基本的な使い方

### 例1: 休日判定

```javascript
let day = "土曜日";

if (day === "土曜日" || day === "日曜日") {
  console.log("休みです");
}
```

この条件は以下の場合に真になります:
- day が "土曜日"
- **または** day が "日曜日"

どちらか一方でも満たせば、全体が真になります。

### 例2: 複数の支払い方法

```javascript
let paymentMethod = "クレジットカード";

if (paymentMethod === "現金" || paymentMethod === "クレジットカード") {
  console.log("支払いできます");
}
```

現金またはクレジットカードのどちらかであれば支払いができます。

## 真偽値の表

OR演算子の動作を表で確認しましょう。

| 条件A | 条件B | A \|\| B |
|-------|-------|---------|
| true  | true  | true    |
| true  | false | true    |
| false | true  | true    |
| false | false | false   |

つまり、**どちらか一方でも true なら、結果が true** になります。両方とも false の時だけ、結果が false になります。

## 3つ以上の条件

OR演算子も3つ以上の条件で使えます。

```javascript
let day = "月曜日";

if (day === "土曜日" || day === "日曜日" || day === "祝日") {
  console.log("休みです");
}
```

この場合、**どれか1つでも**真であれば、全体が真になります。

## AND演算子との比較

### AND演算子(&&): すべて満たす必要がある

```javascript
let age = 20;
let hasLicense = true;

// 両方とも真の時だけ実行
if (age >= 18 && hasLicense) {
  console.log("運転できます");
}
```

### OR演算子(||): どれか1つ満たせばよい

```javascript
let day = "土曜日";

// どちらか1つでも真なら実行
if (day === "土曜日" || day === "日曜日") {
  console.log("休みです");
}
```

## 実用例

### 例1: エラーチェック

```javascript
function validateInput() {
  const name = document.getElementById("name").value;
  const error = document.getElementById("error");

  error.textContent = "";

  // 名前が空、または2文字未満の場合
  if (name === "" || name.length < 2) {
    error.textContent = "名前は2文字以上入力してください";
    return;
  }

  console.log("OK");
}
```

空文字、または2文字未満の**どちらか**に該当すればエラーになります。

### 例2: アクセス権限チェック

```javascript
function checkAccess() {
  const isAdmin = false;
  const isModerator = true;
  const result = document.getElementById("result");

  // 管理者またはモデレーターの場合
  if (isAdmin || isModerator) {
    result.textContent = "アクセス許可";
  } else {
    result.textContent = "アクセス拒否";
  }
}
```

管理者、またはモデレーターの**どちらか**であればアクセスできます。

### 例3: 割引判定

```javascript
function checkDiscount() {
  const age = 65;
  const isStudent = false;
  const result = document.getElementById("result");

  // 学生、または65歳以上の場合
  if (isStudent || age >= 65) {
    result.textContent = "割引対象です";
  } else {
    result.textContent = "通常料金です";
  }
}
```

## 実践問題

以下の要件を満たすプログラムを作成してください。

### 問題: 休日判定機

曜日を入力して、休日かどうかを判定するプログラムを作成してください。

**条件:**
- 土曜日、または日曜日の場合: "休みです"
- それ以外の場合: "平日です"

**HTMLの構成:**
- id="day" の input要素(曜日入力用)
- id="result" の要素(結果表示用)

**動作:**
1. 曜日を取得
2. "土曜日" または "日曜日" の場合: "休みです" を表示
3. それ以外の場合: "平日です" を表示

## AND演算子とOR演算子の組み合わせ

2つの演算子を組み合わせることもできます。

```javascript
let age = 25;
let isWeekend = true;
let hasTicket = true;

// 18歳以上で、かつ(週末またはチケットを持っている)
if (age >= 18 && (isWeekend || hasTicket)) {
  console.log("入場できます");
}
```

括弧を使って優先順位を明確にします。

## OR演算子を使う時のポイント

### 1. 短絡評価

AND演算子と同様に、OR演算子も**短絡評価**を行います。左側の条件が真の場合、右側の条件は評価されません。

```javascript
let age = 70;
let isStudent = false;

// age >= 65 が true なので、isStudent はチェックされない
if (age >= 65 || isStudent) {
  console.log("割引対象です");
}
```

### 2. デフォルト値の設定

OR演算子は、変数にデフォルト値を設定する時にも使えます。

```javascript
let name = "";
let displayName = name || "ゲスト";
console.log(displayName); // "ゲスト" が表示される
```

name が空文字(偽とみなされる)の場合、"ゲスト" が使われます。

### 3. 複数の条件を並べる時

条件が多くなる場合は、改行して読みやすくしましょう。

```javascript
if (
  day === "土曜日" ||
  day === "日曜日" ||
  day === "祝日"
) {
  console.log("休みです");
}
```

## elseとの組み合わせ

```javascript
function checkDay() {
  const day = document.getElementById("day").value;
  const result = document.getElementById("result");

  if (day === "土曜日" || day === "日曜日") {
    result.textContent = "休みです";
  } else {
    result.textContent = "平日です";
  }
}
```

OR演算子で複数の条件をまとめることで、コードがシンプルになります。

## まとめ

- OR演算子(||)は、複数の条件の**どちらか一方でも真**の時に真になります
- 両方とも偽の場合だけ、全体が偽になります
- 短絡評価により、左側が真の場合は右側が評価されません
- 3つ以上の条件でも使えます
- デフォルト値の設定にも利用できます
- AND演算子と組み合わせて、複雑な条件を表現できます

次のレッスンでは、条件を反転させるNOT演算子(!)を学びます。
