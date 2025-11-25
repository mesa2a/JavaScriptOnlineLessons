# レッスン51: 範囲判定

## なぜ重要なのか

範囲判定は、プログラミングで最も頻繁に使われるパターンの一つです。私たちの日常生活には「範囲」があふれており、それをプログラムで表現する必要があります。

### 実際のサービスでの使用例

1. **YouTube：動画の年齢制限**
   ```javascript
   // 13歳以上18歳未満：一部制限付きコンテンツ
   if (age >= 13 && age < 18) {
     contentRating = "teen";
   }
   ```

2. **Uber：配車料金の時間帯判定**
   ```javascript
   // 深夜料金: 22時から翌5時まで
   if ((hour >= 22 && hour <= 23) || (hour >= 0 && hour < 5)) {
     fareMultiplier = 1.25;  // 25%割増
   }
   ```

3. **Amazon：配送スピード**
   ```javascript
   // 営業時間内（9時〜18時）の注文は当日配送
   if (hour >= 9 && hour < 18) {
     deliveryType = "same-day";
   }
   ```

4. **Spotify：年齢別おすすめプレイリスト**
   ```javascript
   // 20代向けプレイリスト
   if (age >= 20 && age < 30) {
     playlist = "20s Hits";
   }
   ```

5. **楽天市場：ポイント倍率（購入金額別）**
   ```javascript
   // 10,000円以上20,000円未満：ポイント5倍
   if (amount >= 10000 && amount < 20000) {
     pointRate = 5;
   }
   ```

このように、**値が特定の範囲にあるかを判定する能力**は、実用的なアプリケーション開発の基礎です。

---

## このレッスンで学ぶこと

プログラミングでは、値が特定の範囲内にあるかをチェックすることがよくあります。今回は、範囲判定の書き方と、その実践的な使い方を学びます：

- **基本構文**：`最小値 <= 値 && 値 <= 最大値`
- **境界値の扱い**：含む/含まないの正確な表現
- **時間帯の判定**：営業時間、料金、挨拶メッセージ
- **複数の範囲**：成績判定、年齢層分類
- **範囲外のチェック**：ORとNOTの使い分け

---

## 範囲判定とは

範囲判定は、**値が最小値と最大値の間にあるかをチェック**する処理です。

### 基本構文

```javascript
最小値 <= 値 && 値 <= 最大値
```

これは「**値が最小値以上、かつ最大値以下**」という意味です。

### 日常生活の例

- 「18歳以上65歳未満」→ `age >= 18 && age < 65`
- 「9時から18時まで」→ `hour >= 9 && hour < 18`
- 「60点以上80点以下」→ `score >= 60 && score <= 80`

### なぜANDを使うのか

範囲判定では**必ずANDを使います**。なぜなら、「最小値以上」**かつ**「最大値以下」の**両方を満たす**必要があるからです。

```javascript
// ✅ 正しい: AND を使う
if (value >= 10 && value <= 20) {
  console.log("10以上20以下");
}

// ❌ 間違い: OR を使ってしまう
if (value >= 10 || value <= 20) {
  // これはすべての数値が該当してしまう！
  // -5: -5 <= 20 → true
  // 30: 30 >= 10 → true
}
```

---

## 基本的な範囲判定の例

### 例1: 年齢の範囲チェック

```javascript
let age = 25;

// 18歳以上30歳以下
if (age >= 18 && age <= 30) {
  console.log("範囲内です");
}

// 評価の流れ:
// 1. age >= 18 → 25 >= 18 → true
// 2. age <= 30 → 25 <= 30 → true
// 3. true && true → true
// 結果: "範囲内です" ✅
```

### 例2: 点数の範囲チェック

```javascript
let score = 75;

// 60点以上80点以下
if (score >= 60 && score <= 80) {
  console.log("B判定です");
}

// 評価の流れ:
// 1. score >= 60 → 75 >= 60 → true
// 2. score <= 80 → 75 <= 80 → true
// 3. true && true → true
// 結果: "B判定です" ✅
```

### 例3: 温度の範囲チェック

```javascript
let temperature = 23;

// 20度以上25度以下が快適
if (temperature >= 20 && temperature <= 25) {
  console.log("快適な温度です");
}

// 評価の流れ:
// 1. temperature >= 20 → 23 >= 20 → true
// 2. temperature <= 25 → 23 <= 25 → true
// 3. true && true → true
// 結果: "快適な温度です" ✅
```

---

## 境界値の扱い

範囲判定では、**境界値を含むか含まないか**を正確に表現する必要があります。これは非常に重要なポイントです。

### 4つのパターン

| パターン | 書き方 | 意味 | 10と20を含む？ |
|---------|--------|------|----------------|
| 両方含む | `x >= 10 && x <= 20` | 10以上20以下 | ✅ 両方含む |
| 両方含まない | `x > 10 && x < 20` | 10より大きく20未満 | ❌ 両方含まない |
| 左だけ含む | `x >= 10 && x < 20` | 10以上20未満 | ✅ 10は含む、20は含まない |
| 右だけ含む | `x > 10 && x <= 20` | 10より大きく20以下 | ✅ 10は含まない、20は含む |

### パターン1: 両方含む（以上・以下）

```javascript
let x = 10;

// 10以上20以下 (10と20を含む)
if (x >= 10 && x <= 20) {
  console.log("OK");
}

// x = 10 → OK ✅
// x = 15 → OK ✅
// x = 20 → OK ✅
// x = 9  → NG ❌
// x = 21 → NG ❌
```

**使用場面**：点数の判定（60点以上100点以下）など、**境界値を含めたい**場合

### パターン2: 両方含まない（より大きい・未満）

```javascript
let x = 10;

// 10より大きく20未満 (10と20を含まない)
if (x > 10 && x < 20) {
  console.log("OK");
}

// x = 10 → NG ❌
// x = 11 → OK ✅
// x = 19 → OK ✅
// x = 20 → NG ❌
```

**使用場面**：あまり使われない（明確な理由がない限り、境界値を含む方が自然）

### パターン3: 左だけ含む（以上・未満）⭐ 最も一般的

```javascript
let hour = 9;

// 9時以上18時未満 (9時を含む、18時を含まない)
if (hour >= 9 && hour < 18) {
  console.log("営業時間中");
}

// hour = 9  → OK ✅ (9時台)
// hour = 17 → OK ✅ (17時台)
// hour = 18 → NG ❌ (18時は営業時間外)
```

**使用場面**：時間帯の判定で**最も一般的**。なぜなら：
- 9時 = 9:00〜9:59 を含む
- 18時 = 18:00以降は含まない（次の時間帯の開始）

### パターン4: 右だけ含む（より大きい・以下）

```javascript
let x = 20;

// 10より大きく20以下 (10を含まず、20を含む)
if (x > 10 && x <= 20) {
  console.log("OK");
}

// x = 10 → NG ❌
// x = 11 → OK ✅
// x = 20 → OK ✅
```

**使用場面**：特殊なケース（通常は使わない）

### 境界値の選び方のポイント

```javascript
// ❌ 間違い: 18時を含んでしまう
if (hour >= 9 && hour <= 18) {
  console.log("営業中");
  // 18:00 も営業中になってしまう
  // 実際には 18:00 は閉店時刻
}

// ✅ 正しい: 18時は含まない
if (hour >= 9 && hour < 18) {
  console.log("営業中");
  // 9:00〜17:59 が営業中
  // 18:00 は営業時間外
}
```

---

## 時間帯の判定

範囲判定は、**時間帯のチェック**によく使われます。

### 例1: 営業時間チェック

```javascript
function checkBusinessHours() {
  const hour = 14;  // 14時

  // 9時から18時まで（9時台〜17時台）
  if (hour >= 9 && hour < 18) {
    console.log("営業中です");
  } else {
    console.log("営業時間外です");
  }
}

// hour = 9  → "営業中です" ✅
// hour = 17 → "営業中です" ✅
// hour = 18 → "営業時間外です" ❌
```

#### なぜ `hour < 18` を使うのか

時刻は「時台」で考えます：
- 9時 = 9:00〜9:59
- 17時 = 17:00〜17:59
- **18時 = 18:00以降**（閉店時刻）

だから、`hour < 18` を使って「18時は含まない」とします。

### 例2: 時間帯による料金

```javascript
function getPrice() {
  const hour = 20;  // 20時
  let price = 1000;  // 通常料金

  // ランチタイム: 11時から14時（11時台〜13時台）
  if (hour >= 11 && hour < 14) {
    price = 800;
  }
  // ディナータイム: 18時から22時（18時台〜21時台）
  else if (hour >= 18 && hour < 22) {
    price = 1500;
  }

  console.log("料金: " + price + "円");
}

// hour = 11 → 800円（ランチ）
// hour = 13 → 800円（ランチ）
// hour = 14 → 1000円（通常）
// hour = 20 → 1500円（ディナー）
```

#### 時間帯の区切り方

```
00:00 ─── 11:00 ─── 14:00 ─── 18:00 ─── 22:00 ─── 24:00
        |  ランチ  |   通常   | ディナー |   通常   |
```

各時間帯は**左を含み、右を含まない**（`>=` と `<`）ように設定します。

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

// 時間帯の区切り:
// 5:00〜11:59 → おはよう
// 12:00〜17:59 → こんにちは
// 18:00〜4:59 → こんばんは
```

---

## 複数の範囲をチェック

複数の範囲を**else if** で繋げて、段階的にチェックすることができます。

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

// score = 95 → "A"
// score = 85 → "B"
// score = 75 → "C"
// score = 65 → "D"
// score = 55 → "F"
```

#### 範囲の区切り方

```
0 ──── 60 ──── 70 ──── 80 ──── 90 ──── 100
   F    |   D   |   C   |   B   |   A   |
```

各範囲が**重複しない**ように設定します。

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

// age = 15 → "未成年"
// age = 25 → "若年層"
// age = 35 → "中年層"
// age = 65 → "高齢層"
```

### 例3: BMI判定

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

// BMIの範囲:
// 〜18.5未満: 低体重
// 18.5〜25未満: 普通体重
// 25〜30未満: 肥満(1度)
// 30以上: 肥満(2度以上)
```

---

## 範囲外のチェック

範囲「外」をチェックする場合もあります。

### 方法1: ORを使う（推奨）

```javascript
let value = 25;

// 10未満または20より大きい
if (value < 10 || value > 20) {
  console.log("範囲外です");
}

// value = 5  → "範囲外です" ✅（10未満）
// value = 15 → 表示されない（範囲内）
// value = 25 → "範囲外です" ✅（20より大きい）
```

#### なぜORを使うのか

範囲外は**2つの領域**に分かれます：
- 最小値より小さい
- 最大値より大きい

**どちらか一つでも該当**すれば範囲外なので、ORを使います。

### 方法2: NOTを使う

```javascript
let value = 15;

// 10以上20以下でない
if (!(value >= 10 && value <= 20)) {
  console.log("範囲外です");
}

// value = 5  → "範囲外です" ✅
// value = 15 → 表示されない（範囲内）
// value = 25 → "範囲外です" ✅
```

### どちらを使うべきか

```javascript
// ✅ 推奨: ORを使う（読みやすい）
if (value < 10 || value > 20) {
  console.log("範囲外");
}

// ❌ 非推奨: NOTを使う（読みにくい）
if (!(value >= 10 && value <= 20)) {
  console.log("範囲外");
}
```

**方法1（OR）の方が直感的で読みやすい**ため、推奨されます。

---

## 範囲判定のよくある間違い

### 間違い1: ANDとORの混同

```javascript
let value = 15;

// ❌ 間違い: 10以上または20以下
if (value >= 10 || value <= 20) {
  console.log("範囲内");
}

// 問題: すべての数値が該当してしまう！
// value = -5 → -5 <= 20 → true ✅（なぜか該当）
// value = 30 → 30 >= 10 → true ✅（なぜか該当）

// ✅ 正しい: 10以上かつ20以下
if (value >= 10 && value <= 20) {
  console.log("範囲内");
}
```

#### なぜ間違えるのか

日本語で「10以上**または**20以下」と言いたくなりますが、正しくは「10以上**かつ**20以下」です。

### 間違い2: 不等号の連続使用

```javascript
let value = 15;

// ❌ 間違い: JavaScriptではこの書き方は使えない
if (10 <= value <= 20) {
  console.log("範囲内");
}

// 評価の流れ（意図しない動作）:
// 1. 10 <= value → true（または false）
// 2. true <= 20 → true（true は 1 に変換されるため）
// 3. 常に true になってしまう！

// ✅ 正しい: ANDで2つに分ける
if (value >= 10 && value <= 20) {
  console.log("範囲内");
}
```

### 間違い3: 境界値の見落とし

```javascript
let score = 60;

// ❌ 間違い: 60点が含まれない
if (score > 60) {
  console.log("合格");
}
// score = 60 → 表示されない ❌

// ✅ 正しい: 60点を含む
if (score >= 60) {
  console.log("合格");
}
// score = 60 → "合格" ✅
```

### 間違い4: 範囲の重複

```javascript
let score = 80;

// ❌ 間違い: 80点が2つの範囲に含まれる
if (score >= 70 && score <= 80) {
  console.log("C");
} else if (score >= 80 && score <= 90) {
  console.log("B");
}
// score = 80 → "C" が表示される（最初の条件に該当）

// ✅ 正しい: 境界値を調整して重複を避ける
if (score >= 70 && score < 80) {
  console.log("C");
} else if (score >= 80 && score < 90) {
  console.log("B");
}
// score = 80 → "B" が表示される ✅
```

### 間違い5: 条件の順序

```javascript
let score = 95;

// ❌ 間違い: 小さい範囲から大きい範囲へ
if (score >= 70) {
  console.log("C");  // 90点でもここに入ってしまう
} else if (score >= 80) {
  console.log("B");  // 到達しない
} else if (score >= 90) {
  console.log("A");  // 到達しない
}
// score = 95 → "C" と表示される ❌

// ✅ 正しい: 大きい範囲から小さい範囲へ
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
}
// score = 95 → "A" と表示される ✅
```

**または、範囲を明示的に区切る**

```javascript
// ✅ さらに明確: 範囲を明示的に区切る
if (score >= 90 && score <= 100) {
  console.log("A");
} else if (score >= 80 && score < 90) {
  console.log("B");
} else if (score >= 70 && score < 80) {
  console.log("C");
}
```

### 間違い6: 時刻の境界値

```javascript
let hour = 18;

// ❌ 間違い: 18時を営業時間に含めてしまう
if (hour >= 9 && hour <= 18) {
  console.log("営業中");
}
// hour = 18 → "営業中" ✅（でも18時は閉店時刻）

// ✅ 正しい: 18時は営業時間外
if (hour >= 9 && hour < 18) {
  console.log("営業中");
}
// hour = 18 → 表示されない ✅（営業時間外）
```

---

## 実用例

### 実用例1: 温度管理システム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>温度管理システム</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h2 {
      color: #667eea;
      text-align: center;
      margin-bottom: 30px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }
    input[type="number"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 20px;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    .result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 8px;
      display: none;
      text-align: center;
    }
    .result.show {
      display: block;
    }
    .freezing {
      background: #e3f2fd;
      color: #0d47a1;
      border: 2px solid #2196F3;
    }
    .cold {
      background: #e1f5fe;
      color: #01579b;
      border: 2px solid #03a9f4;
    }
    .cool {
      background: #e8f5e9;
      color: #1b5e20;
      border: 2px solid #4caf50;
    }
    .comfortable {
      background: #fff3e0;
      color: #e65100;
      border: 2px solid #ff9800;
    }
    .hot {
      background: #ffebee;
      color: #b71c1c;
      border: 2px solid #f44336;
    }
    .temp-icon {
      font-size: 48px;
      margin-bottom: 10px;
    }
    .temp-label {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🌡️ 温度管理システム</h2>

    <div class="form-group">
      <label for="temperature">現在の温度（℃）</label>
      <input type="number" id="temperature" placeholder="温度を入力" value="23">
    </div>

    <button onclick="checkTemperature()">温度を判定</button>

    <div id="result" class="result"></div>
  </div>

  <script>
    function checkTemperature() {
      const temp = parseFloat(document.getElementById("temperature").value);
      const resultEl = document.getElementById("result");

      let icon = "";
      let label = "";
      let message = "";
      let className = "result show ";

      // 範囲判定で温度を分類
      if (temp < 0) {
        icon = "🥶";
        label = "氷点下";
        message = "水が凍る温度です。外出時は厳重な防寒対策を。";
        className += "freezing";
      } else if (temp >= 0 && temp < 10) {
        icon = "❄️";
        label = "寒い";
        message = "かなり寒いです。暖かい服装を心がけましょう。";
        className += "cold";
      } else if (temp >= 10 && temp < 20) {
        icon = "🍃";
        label = "涼しい";
        message = "涼しく過ごしやすい気温です。軽い上着があると良いでしょう。";
        className += "cool";
      } else if (temp >= 20 && temp < 30) {
        icon = "😊";
        label = "快適";
        message = "快適な温度です。活動に最適な気温です。";
        className += "comfortable";
      } else {
        icon = "🥵";
        label = "暑い";
        message = "暑いです。水分補給を忘れずに。熱中症に注意しましょう。";
        className += "hot";
      }

      resultEl.className = className;
      resultEl.innerHTML = `
        <div class="temp-icon">${icon}</div>
        <div class="temp-label">${label}</div>
        <p>${temp}℃</p>
        <p>${message}</p>
      `;
    }
  </script>
</body>
</html>
```

#### このコードのポイント

1. **5つの温度範囲**を判定
2. **範囲ごとに異なる表示**（アイコン、色、メッセージ）
3. **境界値を明確に**設定（`>=` と `<` を使用）

### 実用例2: 営業時間チェッカー

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>営業時間チェッカー</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      min-height: 100vh;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h2 {
      color: #f5576c;
      text-align: center;
      margin-bottom: 30px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }
    input[type="number"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 10px 0;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 5px;
    }
    button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 20px;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(245, 87, 108, 0.4);
    }
    .result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 8px;
      display: none;
      text-align: center;
    }
    .result.show {
      display: block;
    }
    .open {
      background: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }
    .closed {
      background: #f8d7da;
      color: #721c24;
      border: 2px solid #f5c6cb;
    }
    .info-box {
      background: #e7f3ff;
      border-left: 4px solid #2196F3;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .info-box h3 {
      margin-top: 0;
      color: #2196F3;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🏪 営業時間チェッカー</h2>

    <div class="info-box">
      <h3>営業時間</h3>
      <p><strong>平日:</strong> 9:00〜18:00</p>
      <p><strong>土日:</strong> 10:00〜20:00</p>
    </div>

    <div class="form-group">
      <label for="hour">現在の時刻（時）</label>
      <input type="number" id="hour" placeholder="0〜23" value="14" min="0" max="23">
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="isWeekend">
      <label for="isWeekend">土日祝日</label>
    </div>

    <button onclick="checkBusinessHours()">営業状況をチェック</button>

    <div id="result" class="result"></div>
  </div>

  <script>
    function checkBusinessHours() {
      const hour = parseInt(document.getElementById("hour").value);
      const isWeekend = document.getElementById("isWeekend").checked;
      const resultEl = document.getElementById("result");

      // 入力検証
      if (isNaN(hour) || hour < 0 || hour > 23) {
        resultEl.className = "result closed show";
        resultEl.innerHTML = `
          <h3>❌ エラー</h3>
          <p>0〜23の数値を入力してください</p>
        `;
        return;
      }

      let isOpen = false;
      let timeRange = "";

      // 範囲判定で営業時間をチェック
      if (isWeekend) {
        // 土日: 10時から20時
        if (hour >= 10 && hour < 20) {
          isOpen = true;
          timeRange = "10:00〜20:00";
        } else {
          timeRange = "10:00〜20:00";
        }
      } else {
        // 平日: 9時から18時
        if (hour >= 9 && hour < 18) {
          isOpen = true;
          timeRange = "9:00〜18:00";
        } else {
          timeRange = "9:00〜18:00";
        }
      }

      if (isOpen) {
        resultEl.className = "result open show";
        resultEl.innerHTML = `
          <h3>✅ 営業中です</h3>
          <p><strong>現在時刻:</strong> ${hour}:00</p>
          <p><strong>営業時間:</strong> ${timeRange}</p>
          <p>${isWeekend ? '土日祝日' : '平日'}</p>
        `;
      } else {
        resultEl.className = "result closed show";
        resultEl.innerHTML = `
          <h3>❌ 営業時間外です</h3>
          <p><strong>現在時刻:</strong> ${hour}:00</p>
          <p><strong>営業時間:</strong> ${timeRange}</p>
          <p>${isWeekend ? '土日祝日' : '平日'}</p>
        `;
      }
    }
  </script>
</body>
</html>
```

#### このコードのポイント

1. **平日と土日で異なる営業時間**を判定
2. **範囲判定**（`>=` と `<`）で時間帯をチェック
3. **入力検証**を実装

### 実用例3: 成績判定システム

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>成績判定システム</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      min-height: 100vh;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h2 {
      color: #4facfe;
      text-align: center;
      margin-bottom: 30px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }
    input[type="number"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 20px;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
    }
    .result {
      margin-top: 20px;
      padding: 30px;
      border-radius: 8px;
      display: none;
      text-align: center;
    }
    .result.show {
      display: block;
    }
    .grade-icon {
      font-size: 72px;
      margin-bottom: 15px;
    }
    .grade-label {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .grade-A {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }
    .grade-B {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
    }
    .grade-C {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      color: white;
    }
    .grade-D {
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      color: white;
    }
    .grade-F {
      background: #757575;
      color: white;
    }
    .grade-table {
      margin-top: 20px;
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
    }
    .grade-table h3 {
      margin-top: 0;
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    th, td {
      padding: 10px;
      text-align: center;
      border: 1px solid #dee2e6;
    }
    th {
      background: #4facfe;
      color: white;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>📊 成績判定システム</h2>

    <div class="form-group">
      <label for="score">点数（0〜100点）</label>
      <input type="number" id="score" placeholder="点数を入力" value="85" min="0" max="100">
    </div>

    <button onclick="evaluateGrade()">成績を判定</button>

    <div id="result" class="result"></div>

    <div class="grade-table">
      <h3>📋 成績基準表</h3>
      <table>
        <tr>
          <th>評価</th>
          <th>点数範囲</th>
          <th>判定</th>
        </tr>
        <tr>
          <td><strong>A</strong></td>
          <td>90〜100点</td>
          <td>優秀</td>
        </tr>
        <tr>
          <td><strong>B</strong></td>
          <td>80〜89点</td>
          <td>良好</td>
        </tr>
        <tr>
          <td><strong>C</strong></td>
          <td>70〜79点</td>
          <td>普通</td>
        </tr>
        <tr>
          <td><strong>D</strong></td>
          <td>60〜69点</td>
          <td>要努力</td>
        </tr>
        <tr>
          <td><strong>F</strong></td>
          <td>0〜59点</td>
          <td>不合格</td>
        </tr>
      </table>
    </div>
  </div>

  <script>
    function evaluateGrade() {
      const score = parseInt(document.getElementById("score").value);
      const resultEl = document.getElementById("result");

      // 入力検証
      if (isNaN(score) || score < 0 || score > 100) {
        resultEl.className = "result grade-F show";
        resultEl.innerHTML = `
          <div class="grade-icon">❌</div>
          <div class="grade-label">エラー</div>
          <p>0〜100の数値を入力してください</p>
        `;
        return;
      }

      let grade = "";
      let icon = "";
      let message = "";
      let className = "result show ";

      // 複数の範囲をチェック
      if (score >= 90 && score <= 100) {
        grade = "A";
        icon = "🎉";
        message = "優秀です！素晴らしい成績です。";
        className += "grade-A";
      } else if (score >= 80 && score < 90) {
        grade = "B";
        icon = "😊";
        message = "良好です！よく頑張りました。";
        className += "grade-B";
      } else if (score >= 70 && score < 80) {
        grade = "C";
        icon = "👍";
        message = "普通です。もう少し頑張りましょう。";
        className += "grade-C";
      } else if (score >= 60 && score < 70) {
        grade = "D";
        icon = "😐";
        message = "要努力です。復習が必要です。";
        className += "grade-D";
      } else {
        grade = "F";
        icon = "😢";
        message = "不合格です。しっかり復習しましょう。";
        className += "grade-F";
      }

      resultEl.className = className;
      resultEl.innerHTML = `
        <div class="grade-icon">${icon}</div>
        <div class="grade-label">${grade}</div>
        <p><strong>あなたの点数:</strong> ${score}点</p>
        <p>${message}</p>
      `;
    }
  </script>
</body>
</html>
```

#### このコードのポイント

1. **5段階の成績評価**を範囲判定で実装
2. **範囲が重複しない**ように境界値を設定
3. **視覚的なフィードバック**（色、アイコン）
4. **成績基準表**を表示

---

## 練習問題

### 問題1: 割引率判定

購入金額に応じて割引率を判定するプログラムを作成してください。

**割引基準:**
- 10,000円以上: 20%割引
- 5,000円以上10,000円未満: 10%割引
- 3,000円以上5,000円未満: 5%割引
- 3,000円未満: 割引なし

<details>
<summary>💡 ヒント1: 基本構造</summary>

```javascript
function getDiscount() {
  const amount = parseInt(document.getElementById("amount").value);
  let discount = 0;

  // ここに範囲判定を書く
}
```
</details>

<details>
<summary>💡 ヒント2: 範囲判定の順序</summary>

```javascript
// 大きい金額から順に判定する
if (amount >= 10000) {
  discount = 0.2;
} else if (amount >= 5000) {
  discount = 0.1;
} else if (amount >= 3000) {
  discount = 0.05;
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>割引率判定</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    .form-group {
      margin: 15px 0;
    }
    input {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }
    .result {
      margin-top: 20px;
      padding: 15px;
      background: #e7f3ff;
      border-radius: 5px;
      display: none;
    }
    .result.show {
      display: block;
    }
  </style>
</head>
<body>
  <h2>割引率判定</h2>

  <div class="form-group">
    <label>購入金額（円）</label>
    <input type="number" id="amount" value="8000" step="100">
  </div>

  <button onclick="calculateDiscount()">割引を計算</button>

  <div id="result" class="result"></div>

  <script>
    function calculateDiscount() {
      const amount = parseInt(document.getElementById("amount").value);
      const resultEl = document.getElementById("result");

      let discountRate = 0;

      // 範囲判定
      if (amount >= 10000) {
        discountRate = 0.2;  // 20%
      } else if (amount >= 5000) {
        discountRate = 0.1;  // 10%
      } else if (amount >= 3000) {
        discountRate = 0.05; // 5%
      }

      const discountAmount = Math.floor(amount * discountRate);
      const finalAmount = amount - discountAmount;

      resultEl.className = "result show";
      resultEl.innerHTML = `
        <p><strong>元の金額:</strong> ¥${amount.toLocaleString()}</p>
        <p><strong>割引率:</strong> ${discountRate * 100}%</p>
        <p><strong>割引額:</strong> -¥${discountAmount.toLocaleString()}</p>
        <p><strong>お支払い額:</strong> ¥${finalAmount.toLocaleString()}</p>
      `;
    }
  </script>
</body>
</html>
```
</details>

### 問題2: 年齢層判定

年齢を入力すると年齢層を判定するプログラムを作成してください。

**年齢層の分類:**
- 0〜17歳: 未成年
- 18〜29歳: 若年層
- 30〜59歳: 中年層
- 60歳以上: 高齢層

<details>
<summary>💡 ヒント1: 境界値の設定</summary>

```javascript
// 左を含み、右を含まない（>=と<）
if (age >= 0 && age < 18) {
  // 未成年
} else if (age >= 18 && age < 30) {
  // 若年層
}
```
</details>

<details>
<summary>💡 ヒント2: 最後の範囲</summary>

```javascript
// 最後の範囲は下限のみ
else if (age >= 60) {
  // 高齢層
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>年齢層判定</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    .form-group {
      margin: 15px 0;
    }
    input {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #2196F3;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }
    .result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 5px;
      display: none;
      text-align: center;
    }
    .result.show {
      display: block;
    }
    .minor {
      background: #fff3e0;
      color: #e65100;
    }
    .young {
      background: #e8f5e9;
      color: #1b5e20;
    }
    .middle {
      background: #e3f2fd;
      color: #0d47a1;
    }
    .senior {
      background: #f3e5f5;
      color: #4a148c;
    }
  </style>
</head>
<body>
  <h2>年齢層判定</h2>

  <div class="form-group">
    <label>年齢</label>
    <input type="number" id="age" value="25" min="0">
  </div>

  <button onclick="classifyAge()">年齢層を判定</button>

  <div id="result" class="result"></div>

  <script>
    function classifyAge() {
      const age = parseInt(document.getElementById("age").value);
      const resultEl = document.getElementById("result");

      let ageGroup = "";
      let icon = "";
      let className = "result show ";

      // 範囲判定
      if (age >= 0 && age < 18) {
        ageGroup = "未成年";
        icon = "👶";
        className += "minor";
      } else if (age >= 18 && age < 30) {
        ageGroup = "若年層";
        icon = "🧑";
        className += "young";
      } else if (age >= 30 && age < 60) {
        ageGroup = "中年層";
        icon = "👨";
        className += "middle";
      } else if (age >= 60) {
        ageGroup = "高齢層";
        icon = "👴";
        className += "senior";
      }

      resultEl.className = className;
      resultEl.innerHTML = `
        <div style="font-size: 48px;">${icon}</div>
        <h3>${ageGroup}</h3>
        <p>あなたの年齢: ${age}歳</p>
      `;
    }
  </script>
</body>
</html>
```
</details>

### 問題3: 時間帯挨拶

時刻に応じて適切な挨拶を表示するプログラムを作成してください。

**挨拶の時間帯:**
- 5〜11時台: おはようございます
- 12〜17時台: こんにちは
- 18〜4時台: こんばんは

<details>
<summary>💡 ヒント1: 時刻の範囲</summary>

```javascript
if (hour >= 5 && hour < 12) {
  greeting = "おはようございます";
}
```
</details>

<details>
<summary>💡 ヒント2: 深夜の扱い</summary>

```javascript
// 18時以降、または4時以前
if (hour >= 18 || hour < 5) {
  greeting = "こんばんは";
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>時間帯挨拶</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    h2 {
      text-align: center;
      color: #667eea;
    }
    .form-group {
      margin: 15px 0;
    }
    input {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: 2px solid #e0e0e0;
      border-radius: 5px;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
      font-weight: bold;
    }
    .result {
      margin-top: 20px;
      padding: 30px;
      border-radius: 10px;
      display: none;
      text-align: center;
    }
    .result.show {
      display: block;
    }
    .morning {
      background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
    }
    .afternoon {
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
    }
    .evening {
      background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);
      color: white;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>時間帯挨拶</h2>

    <div class="form-group">
      <label>現在の時刻（時）</label>
      <input type="number" id="hour" value="10" min="0" max="23">
    </div>

    <button onclick="getGreeting()">挨拶を表示</button>

    <div id="result" class="result"></div>
  </div>

  <script>
    function getGreeting() {
      const hour = parseInt(document.getElementById("hour").value);
      const resultEl = document.getElementById("result");

      let greeting = "";
      let icon = "";
      let className = "result show ";

      // 範囲判定
      if (hour >= 5 && hour < 12) {
        greeting = "おはようございます";
        icon = "🌅";
        className += "morning";
      } else if (hour >= 12 && hour < 18) {
        greeting = "こんにちは";
        icon = "☀️";
        className += "afternoon";
      } else {
        greeting = "こんばんは";
        icon = "🌙";
        className += "evening";
      }

      resultEl.className = className;
      resultEl.innerHTML = `
        <div style="font-size: 64px; margin-bottom: 15px;">${icon}</div>
        <h2 style="margin: 0;">${greeting}</h2>
        <p>現在時刻: ${hour}:00</p>
      `;
    }
  </script>
</body>
</html>
```
</details>

---

## デバッグのヒント

範囲判定がうまく動かない場合は、以下を試しましょう。

### 1. 境界値をテストする

```javascript
console.log("value = 10:", value >= 10 && value <= 20);
console.log("value = 15:", value >= 10 && value <= 20);
console.log("value = 20:", value >= 10 && value <= 20);
console.log("value = 9:", value >= 10 && value <= 20);
console.log("value = 21:", value >= 10 && value <= 20);
```

### 2. 各条件を個別に確認

```javascript
console.log("value >= 10:", value >= 10);
console.log("value <= 20:", value <= 20);
console.log("両方:", value >= 10 && value <= 20);
```

### 3. 範囲の重複をチェック

```javascript
// 各範囲が重複していないか確認
// 70-79, 80-89 のように境界値が被っていないか
```

### 4. 順序を確認

```javascript
// 大きい値から小さい値の順に判定しているか？
// else if の順序が正しいか？
```

### 5. ANDとORの確認

```javascript
// 範囲内: AND を使う
if (value >= 10 && value <= 20) { }

// 範囲外: OR を使う
if (value < 10 || value > 20) { }
```

---

## チェックリスト

このレッスンの内容を理解できたか、以下でチェックしましょう。

- [ ] 範囲判定の基本構文（`最小値 <= 値 && 値 <= 最大値`）を理解している
- [ ] ANDを使う理由を説明できる
- [ ] 境界値を含む/含まないの4パターンを使い分けられる
- [ ] `>=` と `<` の組み合わせが最も一般的であることを知っている
- [ ] 時間帯の判定ができる
- [ ] 複数の範囲を else if で繋げて判定できる
- [ ] 範囲の重複を避ける方法を知っている
- [ ] 条件の順序が重要であることを理解している
- [ ] 範囲外のチェックに OR を使うことを知っている
- [ ] ANDとORの混同を避けられる

---

## ポイント

### 1. 基本構文

```javascript
最小値 <= 値 && 値 <= 最大値
```

### 2. ANDを使う

範囲判定は**必ずAND**を使います。

```javascript
// ✅ 正しい
if (value >= 10 && value <= 20) { }

// ❌ 間違い
if (value >= 10 || value <= 20) { }
```

### 3. 境界値の扱い

最も一般的なパターン：**左を含み、右を含まない**

```javascript
if (hour >= 9 && hour < 18) { }
```

### 4. 時間帯の判定

時刻は「時台」で考える：
- 9時 = 9:00〜9:59
- 18時 = 18:00以降（次の時間帯）

### 5. 複数の範囲

```javascript
if (score >= 90) {
  // A
} else if (score >= 80) {
  // B
} else if (score >= 70) {
  // C
}
```

### 6. 範囲の重複を避ける

```javascript
// ✅ 正しい
if (score >= 70 && score < 80) { }
else if (score >= 80 && score < 90) { }
```

### 7. 範囲外のチェック

```javascript
// ✅ 推奨: ORを使う
if (value < 10 || value > 20) { }
```

### 8. 条件の順序

大きい範囲から小さい範囲へ判定する

```javascript
if (score >= 90) { }
else if (score >= 80) { }
else if (score >= 70) { }
```

---

## できるようになったこと

このレッスンを終えて、以下ができるようになりました：

1. **範囲判定の基本構文**を理解し、正しく書ける
2. **境界値の扱い**（含む/含まない）を正確に表現できる
3. **時間帯の判定**ができる（営業時間、料金、挨拶など）
4. **複数の範囲**を else if で繋げて判定できる
5. **範囲外のチェック**に OR を使える
6. **よくある間違い**を避けられる（ANDとORの混同、範囲の重複など）
7. **実用的なアプリケーション**（温度管理、営業時間、成績判定）を実装できる
8. **デバッグ技術**を使って範囲判定の問題を特定できる

---

## まとめ

### 基本構文

```javascript
最小値 <= 値 && 値 <= 最大値
```

### 境界値の4パターン

| パターン | 書き方 | 意味 |
|---------|--------|------|
| 両方含む | `x >= 10 && x <= 20` | 10以上20以下 |
| 両方含まない | `x > 10 && x < 20` | 10より大きく20未満 |
| **左だけ含む** ⭐ | `x >= 10 && x < 20` | **10以上20未満**（最も一般的） |
| 右だけ含む | `x > 10 && x <= 20` | 10より大きく20以下 |

### 重要ポイント

1. **ANDを使う**（ORではない）
2. **境界値を明確に**する
3. **範囲の重複を避ける**
4. **条件の順序**に注意（大きい値から小さい値へ）
5. **時間帯は「時台」**で考える

### 実践での使い方

範囲判定は、実際のアプリケーション開発で**非常に頻繁に使われる**パターンです：

- 年齢制限
- 営業時間
- 成績判定
- 温度管理
- 割引率の計算
- 料金の時間帯判定

これらを**正確に実装**できることは、プロフェッショナルなエンジニアの基礎スキルです。

---

## 次のステップ

次のレッスンでは、**入力検証**について学びます。

```javascript
// 空文字チェック
if (name === "") {
  console.log("名前を入力してください");
}

// 数値チェック
if (isNaN(age)) {
  console.log("数値を入力してください");
}
```

入力検証は、ユーザーからの入力が正しいかをチェックする重要な処理です。範囲判定と組み合わせて使うことで、より堅牢なアプリケーションを作ることができます。

[レッスン52: 入力検証](lesson-052.md) に進みましょう！
