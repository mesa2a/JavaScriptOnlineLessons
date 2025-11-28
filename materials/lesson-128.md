# レッスン128: ユーティリティ関数の作成

**作成日**: 2025-11-26

## このレッスンで学ぶこと

- 汎用的な処理を関数化する方法
- 日付フォーマット関数の作成
- 数値フォーマット関数の作成
- 文字列操作関数の作成
- 配列操作関数の作成
- ユーティリティ関数ライブラリの構築

---

## 日常生活での例：道具箱

ユーティリティ関数は、**よく使う便利な道具を集めた道具箱**のようなものです。

```
日常生活の道具箱：
┌─────────────────────────────┐
│  🔧 ドライバー（よく使う）    │  ← formatDate (日付整形)
│  🔨 ハンマー（よく使う）      │  ← formatNumber (数値整形)
│  📏 メジャー（よく使う）      │  ← truncate (文字列切り詰め)
│  ✂️  ハサミ（よく使う）       │  ← capitalize (先頭大文字化)
└─────────────────────────────┘
    ↑
何度も使う道具を、
すぐに取り出せるように整理しておく
```

**道具箱のメリット**：
- 毎回探さなくていい
- どこでも使える
- 整理されていて見つけやすい
- 同じ道具を何個も買わなくていい

**ユーティリティ関数のメリット**：
- 毎回書かなくていい
- どこでも再利用できる
- まとまっていて探しやすい
- 同じコードを何度も書かなくていい

---

## ユーティリティ関数とは

**ユーティリティ関数**（Utility Functions、ヘルパー関数とも呼ばれる）は、プログラムの様々な場所で繰り返し使われる汎用的な処理を関数としてまとめたものです。

### ユーティリティ関数の特徴

```javascript
// ❌ ユーティリティ関数ではない例（特定の処理に依存）
const updateUserProfile = function(userId, name) {
  // ユーザープロフィールの更新という特定の処理
  const user = findUser(userId);
  user.name = name;
  saveUser(user);
};

// ✅ ユーティリティ関数の例（汎用的）
const capitalize = function(str) {
  // どんな文字列にも使える汎用的な処理
  return str.charAt(0).toUpperCase() + str.slice(1);
};

console.log(capitalize('hello'));  // => 'Hello'
console.log(capitalize('world'));  // => 'World'
console.log(capitalize('apple'));  // => 'Apple'
```

**ユーティリティ関数の4つの特徴**：

1. **汎用的**（Generic）: 特定の処理に依存しない
2. **再利用可能**（Reusable）: プロジェクト全体で使える
3. **シンプル**（Simple）: 1つの明確な目的を持つ
4. **独立**（Independent）: 他の関数に依存しない

---

## 基本例1: 文字列操作関数

最もシンプルな文字列操作のユーティリティ関数を見てみましょう。

```javascript
// 先頭文字を大文字にする
const capitalize = function(str) {
  if (str.length === 0) return str;  // 空文字列チェック
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// 使用例
console.log(capitalize('hello'));     // => 'Hello'
console.log(capitalize('world'));     // => 'World'
console.log(capitalize(''));          // => ''
```

### 実行フローの詳細

```
capitalize('hello') の実行：

ステップ1: str = 'hello' を受け取る
         ↓
ステップ2: str.length === 0 ? → false（5文字ある）
         ↓
ステップ3: str.charAt(0) → 'h'
         ↓
ステップ4: 'h'.toUpperCase() → 'H'
         ↓
ステップ5: str.slice(1) → 'ello'
         ↓
ステップ6: 'H' + 'ello' → 'Hello'
         ↓
結果: 'Hello' を返す
```

---

## 基本例2: 日付フォーマット関数

日付を見やすい形式に変換する関数を作成してみましょう。

```javascript
// 日付を「YYYY年MM月DD日」形式にする
const formatDate = function(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}年${month}月${day}日`;
};

// 使用例
const today = new Date(2025, 10, 26);  // 2025年11月26日
console.log(formatDate(today));  // => '2025年11月26日'

const birthday = new Date(2025, 0, 5);  // 2025年1月5日
console.log(formatDate(birthday));  // => '2025年01月05日'
```

### padStartメソッドの動作

`padStart`は文字列を指定した長さになるまで、先頭に文字を追加するメソッドです。

```javascript
// padStart(目標の長さ, 埋める文字)
String(5).padStart(2, '0');   // => '05'  (1桁→2桁)
String(12).padStart(2, '0');  // => '12'  (すでに2桁)
String(3).padStart(3, '0');   // => '003' (1桁→3桁)
String(100).padStart(2, '0'); // => '100' (すでに3桁なので変化なし)
```

### 実行フローの詳細

```
formatDate(new Date(2025, 0, 5)) の実行：

入力: date = 2025年1月5日

ステップ1: year = date.getFullYear()
         year = 2025

ステップ2: date.getMonth() + 1
         0 + 1 = 1 (1月)
         String(1) = '1'
         '1'.padStart(2, '0') = '01'
         month = '01'

ステップ3: date.getDate()
         5
         String(5) = '5'
         '5'.padStart(2, '0') = '05'
         day = '05'

ステップ4: テンプレートリテラルで組み立て
         `${2025}年${01}月${05}日`
         = '2025年01月05日'

結果: '2025年01月05日'
```

---

## 基本例3: 数値フォーマット関数

数値を見やすい形式に変換する関数を作成してみましょう。

```javascript
// 数値を3桁区切りのカンマ付きにする
const formatNumber = function(num) {
  return num.toLocaleString('ja-JP');
};

// 小数点以下の桁数を指定する
const formatDecimal = function(num, digits) {
  return num.toFixed(digits);
};

// 使用例
console.log(formatNumber(1234567));      // => '1,234,567'
console.log(formatNumber(1000));         // => '1,000'
console.log(formatNumber(123));          // => '123'

console.log(formatDecimal(3.14159, 2));  // => '3.14'
console.log(formatDecimal(10, 2));       // => '10.00'
console.log(formatDecimal(5.6789, 3));   // => '5.679'
```

### 数値フォーマットの動作

```
formatNumber(1234567) の動作：

入力: 1234567

toLocaleString('ja-JP') が実行される：
  数値を日本語のロケールでフォーマット
  3桁ごとにカンマを挿入

  1234567
  ↓
  1,234,567

結果: '1,234,567' (文字列)
```

---

## 実践例1: 価格表示システム

商品の価格をきれいに表示するユーティリティ関数を作成します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>価格表示システム</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .product {
      border: 2px solid #333;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .product h2 {
      margin-top: 0;
      color: #2c3e50;
    }
    .price {
      font-size: 24px;
      color: #e74c3c;
      font-weight: bold;
    }
    .discount {
      color: #27ae60;
      font-weight: bold;
    }
    .info {
      color: #7f8c8d;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h1>📦 商品価格表示</h1>

  <div id="products"></div>

  <script>
    // ユーティリティ関数群
    const formatPrice = function(price) {
      return '¥' + price.toLocaleString('ja-JP');
    };

    const calculateDiscount = function(price, discountRate) {
      const discountAmount = price * discountRate;
      const finalPrice = price - discountAmount;
      return {
        discountAmount: Math.floor(discountAmount),
        finalPrice: Math.floor(finalPrice)
      };
    };

    const formatDate = function(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
    };

    // 商品データ
    const products = [
      {
        name: 'ノートパソコン',
        price: 128000,
        discountRate: 0.15,  // 15%引き
        releaseDate: new Date(2025, 10, 1)
      },
      {
        name: 'ワイヤレスマウス',
        price: 3500,
        discountRate: 0.20,  // 20%引き
        releaseDate: new Date(2025, 9, 15)
      },
      {
        name: 'USBキーボード',
        price: 8900,
        discountRate: 0.10,  // 10%引き
        releaseDate: new Date(2025, 11, 1)
      }
    ];

    // 商品を表示
    const container = document.getElementById('products');

    products.forEach(function(product) {
      const discount = calculateDiscount(product.price, product.discountRate);

      const html = `
        <div class="product">
          <h2>${product.name}</h2>
          <div class="price">
            通常価格: ${formatPrice(product.price)}
          </div>
          <div class="discount">
            ${product.discountRate * 100}%オフ: -${formatPrice(discount.discountAmount)}
          </div>
          <div class="price">
            特別価格: ${formatPrice(discount.finalPrice)}
          </div>
          <div class="info">
            発売日: ${formatDate(product.releaseDate)}
          </div>
        </div>
      `;

      container.innerHTML += html;
    });

    console.log('=== 価格計算の詳細 ===');
    products.forEach(function(product) {
      console.log(`\n商品: ${product.name}`);
      console.log(`通常価格: ${formatPrice(product.price)}`);

      const discount = calculateDiscount(product.price, product.discountRate);
      console.log(`割引額: ${formatPrice(discount.discountAmount)}`);
      console.log(`特別価格: ${formatPrice(discount.finalPrice)}`);
    });
  </script>
</body>
</html>
```

### 実行フローの詳細

```
ノートパソコンの価格計算：

初期データ:
  name: 'ノートパソコン'
  price: 128000
  discountRate: 0.15

ステップ1: calculateDiscount(128000, 0.15) を呼び出し
         ↓
ステップ2: discountAmount を計算
         128000 * 0.15 = 19200
         Math.floor(19200) = 19200
         ↓
ステップ3: finalPrice を計算
         128000 - 19200 = 108800
         Math.floor(108800) = 108800
         ↓
ステップ4: オブジェクトを返す
         {
           discountAmount: 19200,
           finalPrice: 108800
         }
         ↓
ステップ5: formatPrice で表示用にフォーマット
         formatPrice(128000) → '¥128,000'
         formatPrice(19200)  → '¥19,200'
         formatPrice(108800) → '¥108,800'

表示結果:
  通常価格: ¥128,000
  15%オフ: -¥19,200
  特別価格: ¥108,800
```

---

## 実践例2: 文字列操作ツールキット

様々な文字列操作を行うユーティリティ関数のコレクションです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>文字列操作ツールキット</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
    }
    .tool {
      border: 1px solid #ddd;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    input, button {
      padding: 8px 12px;
      margin: 5px;
      font-size: 14px;
    }
    .result {
      background-color: #fff;
      border: 1px solid #27ae60;
      padding: 10px;
      margin-top: 10px;
      border-radius: 4px;
      min-height: 20px;
    }
  </style>
</head>
<body>
  <h1>🔧 文字列操作ツールキット</h1>

  <div class="tool">
    <h3>文字列の切り詰め (Truncate)</h3>
    <input type="text" id="truncateInput" placeholder="文字列を入力" value="これは長い文字列の例です">
    <input type="number" id="truncateLength" placeholder="最大長" value="10">
    <button onclick="doTruncate()">切り詰め</button>
    <div class="result" id="truncateResult"></div>
  </div>

  <div class="tool">
    <h3>文字列の反復 (Repeat)</h3>
    <input type="text" id="repeatInput" placeholder="文字列を入力" value="★">
    <input type="number" id="repeatCount" placeholder="回数" value="5">
    <button onclick="doRepeat()">反復</button>
    <div class="result" id="repeatResult"></div>
  </div>

  <div class="tool">
    <h3>先頭を大文字に (Capitalize)</h3>
    <input type="text" id="capitalizeInput" placeholder="文字列を入力" value="hello world">
    <button onclick="doCapitalize()">変換</button>
    <div class="result" id="capitalizeResult"></div>
  </div>

  <script>
    // ========================================
    // ユーティリティ関数群
    // ========================================

    // 文字列を指定した長さで切り詰める
    const truncate = function(str, maxLength) {
      if (str.length <= maxLength) {
        return str;
      }
      return str.slice(0, maxLength) + '...';
    };

    // 文字列を指定回数繰り返す
    const repeat = function(str, count) {
      let result = '';
      for (let i = 0; i < count; i++) {
        result += str;
      }
      return result;
    };

    // 先頭文字を大文字にする
    const capitalize = function(str) {
      if (str.length === 0) return str;
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // 各単語の先頭を大文字にする
    const capitalizeWords = function(str) {
      const words = str.split(' ');
      const capitalizedWords = [];

      for (let i = 0; i < words.length; i++) {
        capitalizedWords.push(capitalize(words[i]));
      }

      return capitalizedWords.join(' ');
    };

    // ========================================
    // UI操作関数
    // ========================================

    function doTruncate() {
      const input = document.getElementById('truncateInput').value;
      const length = parseInt(document.getElementById('truncateLength').value);
      const result = truncate(input, length);

      document.getElementById('truncateResult').textContent = result;

      console.log('=== Truncate ===');
      console.log('入力:', input);
      console.log('最大長:', length);
      console.log('結果:', result);
    }

    function doRepeat() {
      const input = document.getElementById('repeatInput').value;
      const count = parseInt(document.getElementById('repeatCount').value);
      const result = repeat(input, count);

      document.getElementById('repeatResult').textContent = result;

      console.log('=== Repeat ===');
      console.log('入力:', input);
      console.log('回数:', count);
      console.log('結果:', result);
    }

    function doCapitalize() {
      const input = document.getElementById('capitalizeInput').value;
      const result = capitalizeWords(input);

      document.getElementById('capitalizeResult').textContent = result;

      console.log('=== Capitalize ===');
      console.log('入力:', input);
      console.log('結果:', result);
    }
  </script>
</body>
</html>
```

### truncate関数の動作詳細

```
truncate('これは長い文字列の例です', 10) の実行：

ステップ1: str.length を確認
         'これは長い文字列の例です'.length = 13

ステップ2: 13 <= 10 ? → false（長すぎる）

ステップ3: str.slice(0, 10) を実行
         'これは長い文字列の例です'.slice(0, 10)
         = 'これは長い文字列の'

ステップ4: '...' を追加
         'これは長い文字列の' + '...'
         = 'これは長い文字列の...'

結果: 'これは長い文字列の...'
```

---

## 実践例3: 配列操作ツール

配列を扱う便利なユーティリティ関数を作成します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>配列操作ツール</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
    }
    .tool {
      border: 1px solid #ddd;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    button {
      padding: 10px 20px;
      margin: 5px;
      font-size: 14px;
      cursor: pointer;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background-color: #2980b9;
    }
    .result {
      background-color: #fff;
      border: 1px solid #27ae60;
      padding: 15px;
      margin-top: 10px;
      border-radius: 4px;
      font-family: monospace;
    }
    .array {
      background-color: #ecf0f1;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <h1>📊 配列操作ツール</h1>

  <div class="array">
    <strong>対象配列:</strong> [85, 92, 78, 95, 88, 73, 90]
  </div>

  <div class="tool">
    <h3>配列の統計情報</h3>
    <button onclick="showMax()">最大値</button>
    <button onclick="showMin()">最小値</button>
    <button onclick="showAverage()">平均値</button>
    <button onclick="showSum()">合計値</button>
    <button onclick="showAll()">すべて表示</button>
    <div class="result" id="statsResult"></div>
  </div>

  <script>
    // ========================================
    // ユーティリティ関数群
    // ========================================

    // 配列の最大値を求める
    const max = function(array) {
      let maxValue = array[0];
      for (let i = 1; i < array.length; i++) {
        if (array[i] > maxValue) {
          maxValue = array[i];
        }
      }
      return maxValue;
    };

    // 配列の最小値を求める
    const min = function(array) {
      let minValue = array[0];
      for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
          minValue = array[i];
        }
      }
      return minValue;
    };

    // 配列の合計を求める
    const sum = function(array) {
      let total = 0;
      for (let i = 0; i < array.length; i++) {
        total += array[i];
      }
      return total;
    };

    // 配列の平均値を求める
    const average = function(array) {
      return sum(array) / array.length;
    };

    // 配列の統計情報をすべて取得
    const getStats = function(array) {
      return {
        max: max(array),
        min: min(array),
        sum: sum(array),
        average: average(array),
        count: array.length
      };
    };

    // ========================================
    // テストデータ
    // ========================================

    const scores = [85, 92, 78, 95, 88, 73, 90];

    // ========================================
    // UI操作関数
    // ========================================

    function showMax() {
      const result = max(scores);
      document.getElementById('statsResult').innerHTML =
        `<strong>最大値:</strong> ${result}点`;

      console.log('最大値:', result);
    }

    function showMin() {
      const result = min(scores);
      document.getElementById('statsResult').innerHTML =
        `<strong>最小値:</strong> ${result}点`;

      console.log('最小値:', result);
    }

    function showAverage() {
      const result = average(scores);
      document.getElementById('statsResult').innerHTML =
        `<strong>平均値:</strong> ${result.toFixed(2)}点`;

      console.log('平均値:', result.toFixed(2));
    }

    function showSum() {
      const result = sum(scores);
      document.getElementById('statsResult').innerHTML =
        `<strong>合計値:</strong> ${result}点`;

      console.log('合計値:', result);
    }

    function showAll() {
      const stats = getStats(scores);

      document.getElementById('statsResult').innerHTML = `
        <strong>統計情報:</strong><br>
        件数: ${stats.count}件<br>
        最大値: ${stats.max}点<br>
        最小値: ${stats.min}点<br>
        合計値: ${stats.sum}点<br>
        平均値: ${stats.average.toFixed(2)}点
      `;

      console.log('=== 統計情報 ===');
      console.log('配列:', scores);
      console.log('件数:', stats.count);
      console.log('最大値:', stats.max);
      console.log('最小値:', stats.min);
      console.log('合計値:', stats.sum);
      console.log('平均値:', stats.average.toFixed(2));
    }

    // ページ読み込み時に全情報を表示
    showAll();
  </script>
</body>
</html>
```

### 配列処理の実行フロー

```
scores = [85, 92, 78, 95, 88, 73, 90] の統計計算：

=== max(scores) の実行 ===

初期状態: maxValue = 85 (array[0])

ループ1回目 (i=1):
  array[1] = 92
  92 > 85 ? → true
  maxValue = 92

ループ2回目 (i=2):
  array[2] = 78
  78 > 92 ? → false
  maxValue = 92 (変更なし)

ループ3回目 (i=3):
  array[3] = 95
  95 > 92 ? → true
  maxValue = 95

ループ4回目 (i=4):
  array[4] = 88
  88 > 95 ? → false
  maxValue = 95 (変更なし)

ループ5回目 (i=5):
  array[5] = 73
  73 > 95 ? → false
  maxValue = 95 (変更なし)

ループ6回目 (i=6):
  array[6] = 90
  90 > 95 ? → false
  maxValue = 95 (変更なし)

結果: 95

=== sum(scores) の実行 ===

初期状態: total = 0

i=0: total = 0 + 85 = 85
i=1: total = 85 + 92 = 177
i=2: total = 177 + 78 = 255
i=3: total = 255 + 95 = 350
i=4: total = 350 + 88 = 438
i=5: total = 438 + 73 = 511
i=6: total = 511 + 90 = 601

結果: 601

=== average(scores) の実行 ===

sum(scores) = 601
scores.length = 7
601 / 7 = 85.857...

結果: 85.86 (小数第2位まで)
```

---

## 練習問題

### 練習問題1: パスワード強度チェッカー（基本）

パスワードの強度をチェックするユーティリティ関数を作成してください。

**要件**：
- 8文字以上で「強い」
- 6文字以上8文字未満で「普通」
- 6文字未満で「弱い」

```javascript
// 関数を作成してください
const checkPasswordStrength = function(password) {
  // ここにコードを書く
};

// テスト
console.log(checkPasswordStrength('abc'));          // => '弱い'
console.log(checkPasswordStrength('abcdef'));       // => '普通'
console.log(checkPasswordStrength('abcdefgh'));     // => '強い'
console.log(checkPasswordStrength('verylongpass')); // => '強い'
```

<details>
<summary>💡 ヒント</summary>

文字列の長さは `password.length` で取得できます。

```javascript
if (password.length >= 8) {
  // 8文字以上
} else if (password.length >= 6) {
  // 6文字以上8文字未満
} else {
  // 6文字未満
}
```
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
const checkPasswordStrength = function(password) {
  if (password.length >= 8) {
    return '強い';
  } else if (password.length >= 6) {
    return '普通';
  } else {
    return '弱い';
  }
};

// テスト
console.log(checkPasswordStrength('abc'));          // => '弱い'
console.log(checkPasswordStrength('abcdef'));       // => '普通'
console.log(checkPasswordStrength('abcdefgh'));     // => '強い'
console.log(checkPasswordStrength('verylongpass')); // => '強い'

// 実行フロー例: checkPasswordStrength('abcdef')
//
// ステップ1: password = 'abcdef'
//          password.length = 6
//
// ステップ2: 6 >= 8 ? → false
//
// ステップ3: 6 >= 6 ? → true
//          return '普通'
```
</details>

---

### 練習問題2: 時間フォーマッター（応用）

秒数を「X時間Y分Z秒」の形式に変換するユーティリティ関数を作成してください。

**要件**：
- 3661秒 → '1時間1分1秒'
- 125秒 → '2分5秒'
- 45秒 → '45秒'

```javascript
// 関数を作成してください
const formatTime = function(seconds) {
  // ここにコードを書く
};

// テスト
console.log(formatTime(3661));  // => '1時間1分1秒'
console.log(formatTime(125));   // => '2分5秒'
console.log(formatTime(45));    // => '45秒'
console.log(formatTime(7265));  // => '2時間1分5秒'
```

<details>
<summary>💡 ヒント</summary>

時間、分、秒の計算方法：

```javascript
const hours = Math.floor(seconds / 3600);    // 1時間 = 3600秒
const minutes = Math.floor((seconds % 3600) / 60);  // 1分 = 60秒
const secs = seconds % 60;
```

0の部分は表示しないようにします。
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
const formatTime = function(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let result = '';

  if (hours > 0) {
    result += hours + '時間';
  }

  if (minutes > 0) {
    result += minutes + '分';
  }

  if (secs > 0 || result === '') {  // 秒が0でも、他が全部0なら表示
    result += secs + '秒';
  }

  return result;
};

// テスト
console.log(formatTime(3661));  // => '1時間1分1秒'
console.log(formatTime(125));   // => '2分5秒'
console.log(formatTime(45));    // => '45秒'
console.log(formatTime(7265));  // => '2時間1分5秒'
console.log(formatTime(0));     // => '0秒'

// 実行フロー例: formatTime(3661)
//
// ステップ1: 時間を計算
//          hours = Math.floor(3661 / 3600) = Math.floor(1.016...) = 1
//
// ステップ2: 分を計算
//          3661 % 3600 = 61 (残り)
//          minutes = Math.floor(61 / 60) = Math.floor(1.016...) = 1
//
// ステップ3: 秒を計算
//          secs = 3661 % 60 = 1
//
// ステップ4: 文字列を組み立て
//          result = ''
//          hours > 0 → result = '1時間'
//          minutes > 0 → result = '1時間1分'
//          secs > 0 → result = '1時間1分1秒'
//
// 結果: '1時間1分1秒'
```
</details>

---

### 練習問題3: データ変換ライブラリ（発展）

完全なユーティリティ関数ライブラリとして、配列のデータを様々な形式に変換する関数群を作成してください。

**要件**：
1. `toCSV(array)`: 配列をCSV形式の文字列に変換
2. `fromCSV(csvString)`: CSV文字列を配列に変換
3. `toTable(array)`: 配列をHTMLテーブル形式に変換

```javascript
// 関数を作成してください
const toCSV = function(array) {
  // ここにコードを書く
};

const fromCSV = function(csvString) {
  // ここにコードを書く
};

const toTable = function(array) {
  // ここにコードを書く
};

// テスト
const data = ['りんご', 'バナナ', 'オレンジ'];
console.log(toCSV(data));
// => 'りんご,バナナ,オレンジ'

const csv = 'りんご,バナナ,オレンジ';
console.log(fromCSV(csv));
// => ['りんご', 'バナナ', 'オレンジ']

console.log(toTable(['りんご', 'バナナ']));
// => '<table><tr><td>りんご</td></tr><tr><td>バナナ</td></tr></table>'
```

<details>
<summary>💡 ヒント</summary>

**toCSV**: `join`メソッドを使います
```javascript
array.join(',')
```

**fromCSV**: `split`メソッドを使います
```javascript
csvString.split(',')
```

**toTable**: ループで各要素を`<tr><td>...</td></tr>`で囲みます
</details>

<details>
<summary>✅ 解答例</summary>

```javascript
// 配列をCSV形式に変換
const toCSV = function(array) {
  return array.join(',');
};

// CSV文字列を配列に変換
const fromCSV = function(csvString) {
  return csvString.split(',');
};

// 配列をHTMLテーブルに変換
const toTable = function(array) {
  let html = '<table>';

  for (let i = 0; i < array.length; i++) {
    html += '<tr><td>' + array[i] + '</td></tr>';
  }

  html += '</table>';
  return html;
};

// テスト
const data = ['りんご', 'バナナ', 'オレンジ'];

console.log('=== toCSV ===');
const csv = toCSV(data);
console.log(csv);  // => 'りんご,バナナ,オレンジ'

console.log('\n=== fromCSV ===');
const csvString = 'りんご,バナナ,オレンジ';
const array = fromCSV(csvString);
console.log(array);  // => ['りんご', 'バナナ', 'オレンジ']

console.log('\n=== toTable ===');
const table = toTable(['りんご', 'バナナ']);
console.log(table);
// => '<table><tr><td>りんご</td></tr><tr><td>バナナ</td></tr></table>'

// ボーナス: HTMLに表示できる完全な例
const fruits = ['りんご', 'バナナ', 'オレンジ', 'ぶどう'];
const tableHTML = toTable(fruits);
document.body.innerHTML = tableHTML;
```

**完全なHTMLアプリケーション例**：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>データ変換ライブラリ</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    .section {
      border: 1px solid #ddd;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 10px 0;
    }
    td, th {
      border: 1px solid #333;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #3498db;
      color: white;
    }
    input {
      width: 100%;
      padding: 8px;
      margin: 5px 0;
      box-sizing: border-box;
    }
    button {
      padding: 10px 20px;
      margin: 5px;
      background-color: #27ae60;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .output {
      background-color: #ecf0f1;
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
      min-height: 30px;
    }
  </style>
</head>
<body>
  <h1>📚 データ変換ライブラリ</h1>

  <div class="section">
    <h3>配列 → CSV</h3>
    <input type="text" id="arrayInput" placeholder="カンマ区切りで入力: りんご,バナナ,オレンジ" value="りんご,バナナ,オレンジ">
    <button onclick="convertToCSV()">CSV形式に変換</button>
    <div class="output" id="csvOutput"></div>
  </div>

  <div class="section">
    <h3>CSV → 配列</h3>
    <input type="text" id="csvInput" placeholder="CSV文字列を入力" value="りんご,バナナ,オレンジ">
    <button onclick="convertFromCSV()">配列に変換</button>
    <div class="output" id="arrayOutput"></div>
  </div>

  <div class="section">
    <h3>配列 → HTMLテーブル</h3>
    <input type="text" id="tableInput" placeholder="カンマ区切りで入力" value="りんご,バナナ,オレンジ,ぶどう">
    <button onclick="convertToTable()">テーブルに変換</button>
    <div class="output" id="tableOutput"></div>
  </div>

  <script>
    // ユーティリティ関数ライブラリ
    const toCSV = function(array) {
      return array.join(',');
    };

    const fromCSV = function(csvString) {
      return csvString.split(',');
    };

    const toTable = function(array) {
      let html = '<table><tr><th>項目</th></tr>';

      for (let i = 0; i < array.length; i++) {
        html += '<tr><td>' + array[i] + '</td></tr>';
      }

      html += '</table>';
      return html;
    };

    // UI操作関数
    function convertToCSV() {
      const input = document.getElementById('arrayInput').value;
      const array = input.split(',');
      const csv = toCSV(array);

      document.getElementById('csvOutput').textContent =
        'CSV: ' + csv;

      console.log('配列:', array);
      console.log('CSV:', csv);
    }

    function convertFromCSV() {
      const csv = document.getElementById('csvInput').value;
      const array = fromCSV(csv);

      document.getElementById('arrayOutput').textContent =
        '配列: [' + array.map(item => '"' + item + '"').join(', ') + ']';

      console.log('CSV:', csv);
      console.log('配列:', array);
    }

    function convertToTable() {
      const input = document.getElementById('tableInput').value;
      const array = input.split(',');
      const table = toTable(array);

      document.getElementById('tableOutput').innerHTML = table;

      console.log('配列:', array);
      console.log('テーブルHTML:', table);
    }
  </script>
</body>
</html>
```

**実行フロー例**：

```
toTable(['りんご', 'バナナ', 'オレンジ']) の実行：

初期状態:
  array = ['りんご', 'バナナ', 'オレンジ']
  html = '<table><tr><th>項目</th></tr>'

ループ1回目 (i=0):
  array[0] = 'りんご'
  html += '<tr><td>りんご</td></tr>'
  html = '<table><tr><th>項目</th></tr><tr><td>りんご</td></tr>'

ループ2回目 (i=1):
  array[1] = 'バナナ'
  html += '<tr><td>バナナ</td></tr>'
  html = '<table><tr><th>項目</th></tr><tr><td>りんご</td></tr><tr><td>バナナ</td></tr>'

ループ3回目 (i=2):
  array[2] = 'オレンジ'
  html += '<tr><td>オレンジ</td></tr>'
  html = '<table><tr><th>項目</th></tr><tr><td>りんご</td></tr><tr><td>バナナ</td></tr><tr><td>オレンジ</td></tr>'

ループ終了:
  html += '</table>'
  html = '<table><tr><th>項目</th></tr><tr><td>りんご</td></tr><tr><td>バナナ</td></tr><tr><td>オレンジ</td></tr></table>'

結果: 完全なHTMLテーブル文字列
```
</details>

---

## まとめ

このレッスンで学んだこと：

### 1. ユーティリティ関数の概念
- 汎用的な処理を関数にまとめる
- 再利用可能な「道具箱」を作る
- コードの重複を減らす

### 2. 文字列操作のユーティリティ
- `capitalize`: 先頭を大文字に
- `truncate`: 文字列の切り詰め
- `repeat`: 文字列の反復
- `padStart`: ゼロ埋め

### 3. 日付フォーマット
- `formatDate`: 日付を見やすい形式に
- `getFullYear()`, `getMonth()`, `getDate()`の使い方
- `padStart`で月日を2桁表示

### 4. 数値フォーマット
- `formatNumber`: 3桁区切りカンマ
- `formatDecimal`: 小数点以下の桁数指定
- `toLocaleString()`, `toFixed()`の活用

### 5. 配列操作のユーティリティ
- `max`: 最大値を求める
- `min`: 最小値を求める
- `sum`: 合計を求める
- `average`: 平均値を求める

### 6. データ変換
- `toCSV`: 配列→CSV文字列
- `fromCSV`: CSV文字列→配列
- `toTable`: 配列→HTMLテーブル

**ユーティリティ関数の利点**：
```
道具箱の整理
  ↓
必要な時にすぐ取り出せる
  ↓
作業効率が上がる
  ↓
品質の高い製品が作れる
```

---

## カリキュラム要求事項の確認

レッスン128の要求事項：

- ✅ **汎用的な処理**: ユーティリティ関数の概念、特徴（汎用的・再利用可能・シンプル・独立）
- ✅ **日付フォーマット**: `formatDate`関数、padStartメソッド、日付の整形
- ✅ **数値フォーマット**: `formatNumber`、`formatDecimal`、toLocaleString、toFixed
- ✅ **知識**: ヘルパー関数、共通処理、ユーティリティ関数ライブラリ
- ✅ **成果物**: ユーティリティ集（文字列、日付、数値、配列の操作関数群）

すべての要求事項を満たしています！

---

## 次のステップ

次のレッスンでは、**バリデーション関数**（入力チェック）について学びます。

**予告**：
- 入力値が正しいかチェックする関数
- `true`/`false`を返す述語関数
- エラーメッセージの生成
- フォームのバリデーション実装

**なぜ重要か**：
ユーティリティ関数でデータを整形できるようになったら、次はデータが正しいかチェックする技術が必要です。バリデーション関数は、安全で信頼性の高いアプリケーションを作るための必須スキルです！
