# レッスン38: else if

前回のレッスンでは、if-else文を使って二択の判定を行いました。このレッスンでは、else ifを使って3つ以上の分岐を行う方法を学びます。

## これまでの復習

if-else文では、2つの分岐ができました。

```javascript
if (score >= 60) {
  elem.textContent = "合格です";
} else {
  elem.textContent = "不合格です";
}
```

しかし、実際のプログラムでは、3つ以上の分岐が必要な場合があります。例えば、成績をA、B、Cで判定する場合などです。

## else ifとは

else ifを使うと、3つ以上の分岐を行うことができます。

```javascript
if (条件1) {
  // 条件1が満たされた場合の処理
} else if (条件2) {
  // 条件1が満たされず、条件2が満たされた場合の処理
} else {
  // どの条件も満たされなかった場合の処理
}
```

else ifは「そうでなくて、もし〜なら」という意味です。

## 実践例: 成績判定（A、B、C）

点数に応じて、A、B、Cの評価を行うプログラムを作ってみましょう。

```javascript
function checkGrade() {
  let score = 85;

  if (score >= 80) {
    const elem = document.getElementById("result");
    elem.textContent = "評価: A";
  } else if (score >= 60) {
    const elem = document.getElementById("result");
    elem.textContent = "評価: B";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "評価: C";
  }
}
```

このプログラムでは:
- scoreが80以上なら「評価: A」
- scoreが60以上80未満なら「評価: B」
- scoreが60未満なら「評価: C」

と判定されます。

## 条件の順序

else ifでは、条件の順序が重要です。

```javascript
let score = 85;

if (score >= 80) {
  // 85は80以上なので、ここが実行される
  elem.textContent = "評価: A";
} else if (score >= 60) {
  // 最初の条件が満たされたので、ここは実行されない
  elem.textContent = "評価: B";
}
```

最初の条件が満たされると、それ以降の条件はチェックされません。

## 実践例: より詳細な成績判定

もっと細かい評価を行うこともできます。

```javascript
function checkDetailedGrade() {
  let score = 92;

  if (score >= 90) {
    const elem = document.getElementById("result");
    elem.textContent = "評価: S（優秀）";
  } else if (score >= 80) {
    const elem = document.getElementById("result");
    elem.textContent = "評価: A（良好）";
  } else if (score >= 70) {
    const elem = document.getElementById("result");
    elem.textContent = "評価: B（普通）";
  } else if (score >= 60) {
    const elem = document.getElementById("result");
    elem.textContent = "評価: C（合格）";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "評価: D（不合格）";
  }
}
```

この例では、5つの評価（S、A、B、C、D）に分岐しています。

## 実践例: 年齢による分類

年齢によって、異なる分類をするプログラムを作ってみましょう。

```javascript
function checkAgeGroup() {
  let age = 35;

  if (age >= 60) {
    const elem = document.getElementById("result");
    elem.textContent = "シニア";
  } else if (age >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "成人";
  } else if (age >= 13) {
    const elem = document.getElementById("result");
    elem.textContent = "ティーン";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "子供";
  }
}
```

## 実践例: 温度による判定

温度によって、異なるメッセージを表示するプログラムを作ってみましょう。

```javascript
function checkTemperature() {
  let temp = 25;

  if (temp >= 30) {
    const elem = document.getElementById("result");
    elem.textContent = "暑いです";
  } else if (temp >= 20) {
    const elem = document.getElementById("result");
    elem.textContent = "快適です";
  } else if (temp >= 10) {
    const elem = document.getElementById("result");
    elem.textContent = "涼しいです";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "寒いです";
  }
}
```

## else ifの数

else ifは何個でも使えます。

```javascript
if (条件1) {
  // 処理1
} else if (条件2) {
  // 処理2
} else if (条件3) {
  // 処理3
} else if (条件4) {
  // 処理4
} else if (条件5) {
  // 処理5
} else {
  // どれにも当てはまらない場合の処理
}
```

ただし、あまり多くすると読みにくくなるので、5つ程度までが一般的です。

## 最後のelseは省略できる

最後のelseは省略することもできます。

```javascript
if (score >= 80) {
  elem.textContent = "評価: A";
} else if (score >= 60) {
  elem.textContent = "評価: B";
}
// scoreが60未満の場合、何も表示されない
```

ただし、すべてのケースをカバーする場合は、elseを書く方が安全です。

## 実践例: 文字列での分岐

数値だけでなく、文字列でも分岐できます。

```javascript
function checkColor() {
  let color = "blue";

  if (color === "red") {
    const elem = document.getElementById("result");
    elem.textContent = "赤が選ばれました";
  } else if (color === "blue") {
    const elem = document.getElementById("result");
    elem.textContent = "青が選ばれました";
  } else if (color === "green") {
    const elem = document.getElementById("result");
    elem.textContent = "緑が選ばれました";
  } else {
    const elem = document.getElementById("result");
    elem.textContent = "不明な色です";
  }
}
```

## 多分岐の考え方

多分岐を考えるときは、以下の順序で考えると良いです。

1. どんな場合分けが必要か考える
2. 条件を大きい順（または厳しい順）に並べる
3. 最後にelseで「それ以外」を処理する

## まとめ

このレッスンでは、以下のことを学びました。

- else ifを使うと3つ以上の分岐ができる
- 条件の順序が重要（最初に満たされた条件が実行される）
- else ifは何個でも使える
- 最後のelseで「それ以外」を処理できる
- 数値だけでなく文字列でも分岐できる

次のレッスンでは、ifの中にifを書く「ネスト」について学びます。

## 練習問題

### 問題1: 成績判定

ボタンをクリックしたときに、点数に応じて以下のように評価を表示するプログラムを作成してください。

- 90点以上: 「優秀です」
- 80点以上90点未満: 「良好です」
- 60点以上80点未満: 「合格です」
- 60点未満: 「不合格です」

### 問題2: 年齢グループ判定

ボタンをクリックしたときに、年齢に応じて以下のように分類を表示するプログラムを作成してください。

- 65歳以上: 「高齢者」
- 20歳以上65歳未満: 「成人」
- 20歳未満: 「未成年」

### 問題3: BMI判定

ボタンをクリックしたときに、BMIの値に応じて以下のように判定を表示するプログラムを作成してください。

- 25以上: 「肥満」
- 18.5以上25未満: 「標準」
- 18.5未満: 「やせ」

---

次のレッスンでは、ifの中にifを書く「ネスト」について学びます。
