# レッスン51: 範囲判定

## このレッスンで学ぶこと

プログラミングでは、値が特定の範囲内にあるかをチェックすることがよくあります。今回は、範囲判定の書き方と、その実践的な使い方を学びます。

## 範囲判定とは

範囲判定は、値が最小値と最大値の間にあるかをチェックする処理です。

### 基本構文

```javascript
最小値 <= 値 && 値 <= 最大値
```

これは「値が最小値以上、かつ最大値以下」という意味です。

### 例1: 年齢の範囲チェック

```javascript
let age = 25;

// 18歳以上30歳以下
if (age >= 18 && age <= 30) {
  console.log("範囲内です");
}
```

### 例2: 点数の範囲チェック

```javascript
let score = 75;

// 60点以上80点以下
if (score >= 60 && score <= 80) {
  console.log("B判定です");
}
```

## 境界値の扱い

範囲判定では、境界値を含むか含まないかを正確に表現する必要があります。

### 境界値を含む場合

```javascript
let x = 10;

// 10以上20以下 (10と20を含む)
if (x >= 10 && x <= 20) {
  console.log("OK");
}
```

### 境界値を含まない場合

```javascript
let x = 10;

// 10より大きく20未満 (10と20を含まない)
if (x > 10 && x < 20) {
  console.log("OK");
}
```

### 片方だけ含む場合

```javascript
let x = 10;

// 10より大きく20以下 (10を含まず、20を含む)
if (x > 10 && x <= 20) {
  console.log("OK");
}
```

## 時間帯の判定

範囲判定は、時間帯のチェックによく使われます。

### 例1: 営業時間チェック

```javascript
function checkBusinessHours() {
  const hour = 14;  // 14時

  // 9時から18時まで
  if (hour >= 9 && hour < 18) {
    console.log("営業中です");
  } else {
    console.log("営業時間外です");
  }
}
```

### 例2: 時間帯による料金

```javascript
function getPrice() {
  const hour = 20;  // 20時
  let price = 1000;

  // ランチタイム: 11時から14時
  if (hour >= 11 && hour < 14) {
    price = 800;
  }
  // ディナータイム: 18時から22時
  else if (hour >= 18 && hour < 22) {
    price = 1500;
  }

  console.log("料金: " + price + "円");
}
```

### 例3: 挨拶メッセージ

```javascript
function getGreeting() {
  const hour = 10;  // 10時

  if (hour >= 5 && hour < 12) {
    console.log("おはようございます");
  } else if (hour >= 12 && hour < 18) {
    console.log("こんにちは");
  } else {
    console.log("こんばんは");
  }
}
```

## 複数の範囲をチェック

複数の範囲を同時にチェックすることもできます。

### 例1: 成績判定

```javascript
function getGrade() {
  const score = 85;

  if (score >= 90 && score <= 100) {
    console.log("A");
  } else if (score >= 80 && score < 90) {
    console.log("B");
  } else if (score >= 70 && score < 80) {
    console.log("C");
  } else if (score >= 60 && score < 70) {
    console.log("D");
  } else {
    console.log("F");
  }
}
```

### 例2: 年齢層の分類

```javascript
function getAgeGroup() {
  const age = 35;

  if (age >= 0 && age < 18) {
    console.log("未成年");
  } else if (age >= 18 && age < 30) {
    console.log("若年層");
  } else if (age >= 30 && age < 60) {
    console.log("中年層");
  } else if (age >= 60) {
    console.log("高齢層");
  }
}
```

## 範囲外のチェック

範囲「外」をチェックする場合もあります。

### 方法1: ORを使う

```javascript
let value = 25;

// 10未満または20より大きい
if (value < 10 || value > 20) {
  console.log("範囲外です");
}
```

### 方法2: NOTを使う

```javascript
let value = 15;

// 10以上20以下でない
if (!(value >= 10 && value <= 20)) {
  console.log("範囲外です");
}
```

方法1の方が読みやすいです。

## 実践問題

以下の要件を満たすプログラムを作成してください。

### 問題: 営業時間チェッカー

お店の営業時間をチェックするプログラムを作成してください。

**営業時間:**
- 平日: 9時から18時
- 土日: 10時から20時

**HTMLの構成:**
- id="hour" のinput要素(時刻入力)
- id="isWeekend" のチェックボックス(土日か)
- id="result" の結果表示エリア
- id="error" のエラー表示エリア

**動作:**
1. 時刻が数値かチェック
2. 平日の場合: 9 <= hour < 18 で「営業中」
3. 土日の場合: 10 <= hour < 20 で「営業中」
4. それ以外: 「営業時間外」

## 範囲判定のポイント

### 1. 境界値に注意

```javascript
// 間違い: 18時を含んでしまう
if (hour >= 9 && hour <= 18) {
  // 18:00 も営業中になってしまう
}

// 正しい: 18時は含まない
if (hour >= 9 && hour < 18) {
  // 9:00〜17:59 が営業中
}
```

### 2. 範囲の重複に注意

```javascript
// 間違い: 80点が2つの範囲に含まれる
if (score >= 70 && score <= 80) {
  console.log("C");
} else if (score >= 80 && score <= 90) {
  console.log("B");
}

// 正しい: 境界値を調整
if (score >= 70 && score < 80) {
  console.log("C");
} else if (score >= 80 && score < 90) {
  console.log("B");
}
```

### 3. 条件の順序

範囲チェックの順序は重要です。

```javascript
// 正しい: 大きい範囲から小さい範囲へ
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
}

// 間違い: 小さい範囲から大きい範囲へ
if (score >= 70) {
  console.log("C");  // 90点でもここに入ってしまう
} else if (score >= 80) {
  console.log("B");  // 到達しない
}
```

## 実用例

### 例1: 温度の判定

```javascript
function checkTemperature() {
  const temp = 25;

  if (temp < 0) {
    console.log("氷点下");
  } else if (temp >= 0 && temp < 10) {
    console.log("寒い");
  } else if (temp >= 10 && temp < 20) {
    console.log("涼しい");
  } else if (temp >= 20 && temp < 30) {
    console.log("快適");
  } else {
    console.log("暑い");
  }
}
```

### 例2: BMI判定

```javascript
function checkBMI() {
  const bmi = 22.5;

  if (bmi < 18.5) {
    console.log("低体重");
  } else if (bmi >= 18.5 && bmi < 25) {
    console.log("普通体重");
  } else if (bmi >= 25 && bmi < 30) {
    console.log("肥満(1度)");
  } else {
    console.log("肥満(2度以上)");
  }
}
```

### 例3: 割引率の判定

```javascript
function getDiscount() {
  const amount = 8000;
  let discount = 0;

  if (amount >= 10000) {
    discount = 0.2;  // 20%割引
  } else if (amount >= 5000) {
    discount = 0.1;  // 10%割引
  } else if (amount >= 3000) {
    discount = 0.05;  // 5%割引
  }

  console.log("割引率: " + (discount * 100) + "%");
}
```

## よくある間違い

### 間違い1: ANDとORの混同

```javascript
// 間違い: 10以上または20以下 (すべての数値が該当)
if (value >= 10 || value <= 20) {
  console.log("範囲内");
}

// 正しい: 10以上かつ20以下
if (value >= 10 && value <= 20) {
  console.log("範囲内");
}
```

### 間違い2: 不等号の向き

```javascript
// 間違い
if (10 <= value <= 20) {  // これは動作しない
  console.log("範囲内");
}

// 正しい
if (value >= 10 && value <= 20) {
  console.log("範囲内");
}
```

### 間違い3: 境界値の見落とし

```javascript
let score = 60;

// 間違い: 60点が含まれない
if (score > 60) {
  console.log("合格");
}

// 正しい: 60点を含む
if (score >= 60) {
  console.log("合格");
}
```

## まとめ

- 範囲判定は `最小値 <= 値 && 値 <= 最大値` の形式で書きます
- 境界値を含むか含まないかに注意しましょう
- 時間帯や点数の判定によく使われます
- 範囲の重複や順序に気をつけましょう
- 範囲外のチェックは OR を使うと読みやすいです

次のレッスンでは、入力検証について学びます。
