# レッスン141：オブジェクトのコピー

**日付**: 2025-11-26

## 学習目標
このレッスンでは、JavaScriptのオブジェクトのコピーについて学びます。オブジェクトの参照の仕組みを理解し、正しくコピーする方法を習得します。

---

## オブジェクトのコピーとは？

### 日常生活の例：「書類のコピー」

オブジェクトのコピーを理解するために、書類のコピーを考えてみましょう：

```
通常のコピー（独立したコピー）：
┌─────────────┐    コピー    ┌─────────────┐
│  原本の書類  │  ========>  │ コピーの書類 │
│  名前：田中  │             │  名前：田中  │
└─────────────┘             └─────────────┘
                                    ↓ 書き換え
                            ┌─────────────┐
                            │ コピーの書類 │
                            │  名前：佐藤  │
                            └─────────────┘
原本は変わらない！


JavaScriptの「=」(参照のコピー)：
┌─────────────┐
│  書類の場所  │ ← person1もperson2も同じ場所を指す
│  名前：田中  │    (同じ書類を2人で共有している状態)
└─────────────┘
  ↑        ↑
person1  person2
```

**重要なポイント:**
- 通常のコピー：原本とコピーは別々の書類（独立している）
- JavaScriptの「=」：同じ書類の場所を2人で共有（独立していない）

---

## 1. 参照の問題を理解する

### 参照とは何か？

JavaScriptでは、オブジェクトは「参照型」です。これは、変数がオブジェクトの**場所(メモリアドレス)**を保存することを意味します。

```javascript
let person1 = {
  name: "田中",
  age: 25
};

let person2 = person1;  // ← これは「コピー」ではなく「参照のコピー」
```

**実行の流れ:**

```
ステップ1: person1を作成
┌─────────┐         ┌──────────────────┐
│ person1 │ ------> │ メモリアドレス123 │
└─────────┘         │ name: "田中"     │
                    │ age: 25          │
                    └──────────────────┘

ステップ2: person2 = person1
┌─────────┐  ┐
│ person1 │  │
└─────────┘  │      ┌──────────────────┐
             ├----> │ メモリアドレス123 │
┌─────────┐  │      │ name: "田中"     │
│ person2 │  │      │ age: 25          │
└─────────┘  ┘      └──────────────────┘

両方の変数が同じメモリアドレスを指している！
```

### 参照の問題を実際に確認

```javascript
let person1 = {
  name: "田中",
  age: 25
};

let person2 = person1;
person2.name = "佐藤";  // person2のnameを変更

console.log(person1.name);  // "佐藤" ← person1も変わってしまう！
console.log(person2.name);  // "佐藤"
```

**実行の流れ:**

```
実行前:
┌─────────┐  ┐
│ person1 │  │      ┌──────────────────┐
└─────────┘  │      │ メモリアドレス123 │
             ├----> │ name: "田中"     │
┌─────────┐  │      │ age: 25          │
│ person2 │  │      └──────────────────┘
└─────────┘  ┘

person2.name = "佐藤" を実行:
┌─────────┐  ┐
│ person1 │  │      ┌──────────────────┐
└─────────┘  │      │ メモリアドレス123 │
             ├----> │ name: "佐藤" ←変更！
┌─────────┐  │      │ age: 25          │
│ person2 │  │      └──────────────────┘
└─────────┘  ┘

person1.nameもperson2.nameも同じメモリを見ている！
```

### プリミティブ型との違い

プリミティブ型（数値、文字列など）は値そのものがコピーされます：

```javascript
// プリミティブ型（数値）
let a = 10;
let b = a;       // 値がコピーされる
b = 20;

console.log(a);  // 10 ← aは変わらない！
console.log(b);  // 20

// オブジェクト型
let obj1 = { value: 10 };
let obj2 = obj1;  // 参照がコピーされる
obj2.value = 20;

console.log(obj1.value);  // 20 ← obj1も変わってしまう！
console.log(obj2.value);  // 20
```

**図解:**

```
プリミティブ型:
┌───┐        ┌───┐
│ a │ = 10   │ b │ = 10  ← 独立した値
└───┘        └───┘

b = 20 を実行:
┌───┐        ┌───┐
│ a │ = 10   │ b │ = 20  ← aは変わらない
└───┘        └───┘


オブジェクト型:
┌──────┐  ┐
│ obj1 │  │   ┌────────────┐
└──────┘  ├─> │ value: 10  │ ← 同じオブジェクトを共有
┌──────┐  │   └────────────┘
│ obj2 │  │
└──────┘  ┘

obj2.value = 20 を実行:
┌──────┐  ┐
│ obj1 │  │   ┌────────────┐
└──────┘  ├─> │ value: 20  │ ← 両方に影響
┌──────┐  │   └────────────┘
│ obj2 │  │
└──────┘  ┘
```

---

## 2. Object.assign()で独立したコピーを作る

### Object.assign()とは？

`Object.assign()` は、オブジェクトのプロパティをコピーして、新しい独立したオブジェクトを作成します。

```javascript
let original = {
  name: "田中",
  age: 25
};

let copy = Object.assign({}, original);
copy.name = "佐藤";

console.log(original.name);  // "田中" ← originalは変わらない！
console.log(copy.name);      // "佐藤"
```

**実行の流れ:**

```
ステップ1: originalを作成
┌──────────┐         ┌──────────────────┐
│ original │ ------> │ メモリアドレス123 │
└──────────┘         │ name: "田中"     │
                     │ age: 25          │
                     └──────────────────┘

ステップ2: Object.assign({}, original)
空のオブジェクトを作成:
┌──┐                 ┌──────────────────┐
│{}│ ------------->  │ メモリアドレス456 │
└──┘                 │ (空)             │
                     └──────────────────┘

originalのプロパティをコピー:
┌──────┐             ┌──────────────────┐
│ copy │ ------->    │ メモリアドレス456 │
└──────┘             │ name: "田中"     │
                     │ age: 25          │
                     └──────────────────┘

別々のメモリアドレスを使用！

ステップ3: copy.name = "佐藤"
┌──────────┐         ┌──────────────────┐
│ original │ ------> │ メモリアドレス123 │
└──────────┘         │ name: "田中" ←変わらない
                     │ age: 25          │
                     └──────────────────┘

┌──────┐             ┌──────────────────┐
│ copy │ ------->    │ メモリアドレス456 │
└──────┘             │ name: "佐藤" ←ここだけ変わる
                     │ age: 25          │
                     └──────────────────┘
```

### Object.assign()の構文

```javascript
Object.assign(コピー先, コピー元)
```

- **第1引数**: コピー先のオブジェクト（通常は空のオブジェクト `{}`）
- **第2引数**: コピー元のオブジェクト
- **戻り値**: コピー先のオブジェクト

### 複数のオブジェクトをマージ

```javascript
let defaults = {
  theme: "light",
  fontSize: 14,
  language: "ja"
};

let userSettings = {
  theme: "dark",
  fontSize: 16
};

let settings = Object.assign({}, defaults, userSettings);
console.log(settings);
// { theme: "dark", fontSize: 16, language: "ja" }
```

**実行の流れ:**

```
ステップ1: 空のオブジェクトを作成
{}

ステップ2: defaultsのプロパティをコピー
{
  theme: "light",
  fontSize: 14,
  language: "ja"
}

ステップ3: userSettingsのプロパティをコピー（重複は上書き）
{
  theme: "dark",      ← "light"から上書き
  fontSize: 16,       ← 14から上書き
  language: "ja"      ← defaultsから継承
}
```

---

## 3. スプレッド構文で簡単にコピー

### スプレッド構文（...）とは？

ES6で導入されたスプレッド構文は、`Object.assign()` よりもシンプルで読みやすい方法です。

```javascript
let original = {
  name: "鈴木",
  age: 30
};

let copy = { ...original };
copy.name = "山田";

console.log(original.name);  // "鈴木" ← originalは変わらない！
console.log(copy.name);      // "山田"
```

**スプレッド構文の動作:**

```
{ ...original } の実行:

original:              展開:
┌─────────────┐       ┌─────────────┐
│ name: "鈴木" │ ====> │ name: "鈴木" │
│ age: 30     │       │ age: 30     │
└─────────────┘       └─────────────┘
                            ↓
                      新しいオブジェクトとして作成:
                      ┌─────────────┐
                      │ name: "鈴木" │
                      │ age: 30     │
                      └─────────────┘
```

### スプレッド構文とObject.assign()の比較

```javascript
// Object.assign()
let copy1 = Object.assign({}, original);

// スプレッド構文（推奨）
let copy2 = { ...original };
```

**スプレッド構文の利点:**
1. より短く、読みやすい
2. より直感的
3. 現代のJavaScriptでは標準的

### プロパティの追加

スプレッド構文を使うと、コピーと同時に新しいプロパティを追加できます：

```javascript
let person = {
  name: "田中",
  age: 25
};

let employee = {
  ...person,
  company: "ABC株式会社",
  position: "エンジニア"
};

console.log(employee);
// {
//   name: "田中",
//   age: 25,
//   company: "ABC株式会社",
//   position: "エンジニア"
// }
```

**実行の流れ:**

```
ステップ1: personのプロパティを展開
name: "田中"
age: 25

ステップ2: 新しいプロパティを追加
name: "田中"
age: 25
company: "ABC株式会社"
position: "エンジニア"

ステップ3: 新しいオブジェクトとして作成
employee = {
  name: "田中",
  age: 25,
  company: "ABC株式会社",
  position: "エンジニア"
}
```

### プロパティの上書き

```javascript
let product = {
  name: "ノート",
  price: 200,
  stock: 50
};

let discountProduct = {
  ...product,
  price: 150  // priceを上書き
};

console.log(product.price);         // 200 ← 元は変わらない
console.log(discountProduct.price); // 150
```

**実行の流れ:**

```
ステップ1: productのプロパティを展開
name: "ノート"
price: 200
stock: 50

ステップ2: priceを上書き
name: "ノート"
price: 150  ← 200から上書き
stock: 50

結果:
product = {           discountProduct = {
  name: "ノート",       name: "ノート",
  price: 200,          price: 150,  ← 上書きされた
  stock: 50            stock: 50
}                     }
```

---

## 4. シャローコピーとディープコピー

### シャローコピー（浅いコピー）の制限

`Object.assign()` やスプレッド構文は**シャローコピー（浅いコピー）**を行います。これは、ネストされたオブジェクトは参照がコピーされることを意味します。

```javascript
let person = {
  name: "田中",
  address: {
    city: "東京",
    postal: "100-0001"
  }
};

let copy = { ...person };
copy.address.city = "大阪";

console.log(person.address.city);  // "大阪" ← 元も変わってしまう！
console.log(copy.address.city);    // "大阪"
```

**シャローコピーの動作:**

```
元のオブジェクト:
person ───> {
              name: "田中",
              address: ───> {
                              city: "東京",
                              postal: "100-0001"
                            }
            }

シャローコピー実行:
person ───> {                          copy ───> {
              name: "田中",                        name: "田中",
              address: ───┐                        address: ───┐
            }             │                      }             │
                          │                                    │
                          └──────> {                           │
                                     city: "東京",  <──────────┘
                                     postal: "100-0001"
                                   }

nameはコピーされるが、addressは同じオブジェクトを指す！

copy.address.city = "大阪" を実行:
person ───> {                          copy ───> {
              name: "田中",                        name: "田中",
              address: ───┐                        address: ───┐
            }             │                      }             │
                          │                                    │
                          └──────> {                           │
                                     city: "大阪",  ←──────────┘
                                     postal: "100-0001"
                                   }
                                   ↑
                                両方に影響する！
```

### ディープコピー（深いコピー）

完全に独立したコピーを作るには、ネストされたオブジェクトもコピーする必要があります。

```javascript
// 方法1: JSON を使う（簡易的）
let original = {
  name: "田中",
  address: {
    city: "東京",
    postal: "100-0001"
  }
};

let deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "大阪";

console.log(original.address.city);  // "東京" ← 元は変わらない！
console.log(deepCopy.address.city);  // "大阪"
```

**ディープコピーの動作:**

```
JSON.stringify(original):
"{\"name\":\"田中\",\"address\":{\"city\":\"東京\",\"postal\":\"100-0001\"}}"
            ↓
JSON.parse(...):
完全に新しいオブジェクトとして再構築

person ───> {                     deepCopy ───> {
              name: "田中",                        name: "田中",
              address: ───> {                      address: ───> {
                              city: "東京",                        city: "東京",
                              postal: "..."                        postal: "..."
                            }                                    }
            }                                   }

すべてが独立したオブジェクト！
```

**JSON方式の注意点:**
- 関数はコピーされない（消える）
- `undefined` はコピーされない（消える）
- `Date` オブジェクトは文字列に変換される
- シンプルなデータ構造にのみ使用できる

---

## 実践アプリケーション

### アプリ1: オブジェクトコピー比較システム

参照のコピー、Object.assign()、スプレッド構文の違いを実際に確認します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>オブジェクトコピー比較</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 900px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
    .test-section {
      background: #f8f9fa;
      padding: 20px;
      margin: 20px 0;
      border-radius: 10px;
      border-left: 5px solid #667eea;
    }
    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin: 10px 5px;
      transition: transform 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    .result {
      margin-top: 15px;
      padding: 15px;
      background: white;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      white-space: pre-wrap;
    }
    .original {
      color: #e74c3c;
      font-weight: bold;
    }
    .copy {
      color: #3498db;
      font-weight: bold;
    }
    h3 {
      color: #667eea;
      margin-top: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔄 オブジェクトコピー比較システム</h1>

    <div class="test-section">
      <h3>1. 参照のコピー（=演算子）</h3>
      <p>説明: 同じオブジェクトを参照するため、一方を変更すると他方も変わります</p>
      <button onclick="testReference()">参照コピーをテスト</button>
      <div id="referenceResult" class="result"></div>
    </div>

    <div class="test-section">
      <h3>2. Object.assign()によるコピー</h3>
      <p>説明: 新しいオブジェクトを作成し、独立したコピーを作ります</p>
      <button onclick="testObjectAssign()">Object.assign()をテスト</button>
      <div id="assignResult" class="result"></div>
    </div>

    <div class="test-section">
      <h3>3. スプレッド構文によるコピー</h3>
      <p>説明: より簡潔な記法で独立したコピーを作ります（推奨）</p>
      <button onclick="testSpread()">スプレッド構文をテスト</button>
      <div id="spreadResult" class="result"></div>
    </div>

    <div class="test-section">
      <h3>4. シャローコピーの制限</h3>
      <p>説明: ネストされたオブジェクトは参照がコピーされます</p>
      <button onclick="testShallow()">シャローコピーをテスト</button>
      <div id="shallowResult" class="result"></div>
    </div>
  </div>

  <script>
    // 1. 参照のコピーのテスト
    function testReference() {
      let original = {
        name: "田中",
        age: 25,
        city: "東京"
      };

      let copy = original;  // 参照のコピー

      let output = "📌 元のオブジェクト:\n";
      output += JSON.stringify(original, null, 2) + "\n\n";

      output += "🔗 copy = original を実行\n\n";

      copy.name = "佐藤";
      copy.age = 30;

      output += "✏️ copyのnameを「佐藤」、ageを30に変更\n\n";

      output += "📌 元のオブジェクト:\n";
      output += JSON.stringify(original, null, 2) + "\n\n";

      output += "📋 コピー:\n";
      output += JSON.stringify(copy, null, 2) + "\n\n";

      output += "⚠️ 結果: 両方とも変わってしまった！\n";
      output += "理由: 同じオブジェクトを参照しているため";

      document.getElementById('referenceResult').textContent = output;
    }

    // 2. Object.assign()のテスト
    function testObjectAssign() {
      let original = {
        name: "田中",
        age: 25,
        city: "東京"
      };

      let copy = Object.assign({}, original);

      let output = "📌 元のオブジェクト:\n";
      output += JSON.stringify(original, null, 2) + "\n\n";

      output += "🔗 copy = Object.assign({}, original) を実行\n\n";

      copy.name = "佐藤";
      copy.age = 30;

      output += "✏️ copyのnameを「佐藤」、ageを30に変更\n\n";

      output += "📌 元のオブジェクト:\n";
      output += JSON.stringify(original, null, 2) + "\n\n";

      output += "📋 コピー:\n";
      output += JSON.stringify(copy, null, 2) + "\n\n";

      output += "✅ 結果: 元のオブジェクトは変わらない！\n";
      output += "理由: 新しい独立したオブジェクトが作成された";

      document.getElementById('assignResult').textContent = output;
    }

    // 3. スプレッド構文のテスト
    function testSpread() {
      let original = {
        name: "田中",
        age: 25,
        city: "東京"
      };

      let copy = { ...original };

      let output = "📌 元のオブジェクト:\n";
      output += JSON.stringify(original, null, 2) + "\n\n";

      output += "🔗 copy = { ...original } を実行\n\n";

      copy.name = "佐藤";
      copy.age = 30;

      output += "✏️ copyのnameを「佐藤」、ageを30に変更\n\n";

      output += "📌 元のオブジェクト:\n";
      output += JSON.stringify(original, null, 2) + "\n\n";

      output += "📋 コピー:\n";
      output += JSON.stringify(copy, null, 2) + "\n\n";

      output += "✅ 結果: 元のオブジェクトは変わらない！\n";
      output += "理由: 新しい独立したオブジェクトが作成された\n";
      output += "💡 Object.assign()と同じ結果だが、記法がより簡潔";

      document.getElementById('spreadResult').textContent = output;
    }

    // 4. シャローコピーのテスト
    function testShallow() {
      let original = {
        name: "田中",
        address: {
          city: "東京",
          postal: "100-0001"
        }
      };

      let copy = { ...original };

      let output = "📌 元のオブジェクト（ネストあり）:\n";
      output += JSON.stringify(original, null, 2) + "\n\n";

      output += "🔗 copy = { ...original } を実行\n\n";

      copy.name = "佐藤";
      copy.address.city = "大阪";

      output += "✏️ copyのnameを「佐藤」に変更\n";
      output += "✏️ copyのaddress.cityを「大阪」に変更\n\n";

      output += "📌 元のオブジェクト:\n";
      output += JSON.stringify(original, null, 2) + "\n\n";

      output += "📋 コピー:\n";
      output += JSON.stringify(copy, null, 2) + "\n\n";

      output += "⚠️ 結果: nameは変わらないが、address.cityは変わった！\n";
      output += "理由: シャローコピーはネストされたオブジェクトの参照をコピーする\n\n";

      output += "💡 解決策: ディープコピーを使用する\n";
      let deepCopy = JSON.parse(JSON.stringify(original));
      deepCopy.address.city = "福岡";
      output += "let deepCopy = JSON.parse(JSON.stringify(original));\n";
      output += "deepCopy.address.city = '福岡';\n\n";
      output += "元のオブジェクトのcity: " + original.address.city + "\n";
      output += "ディープコピーのcity: " + deepCopy.address.city;

      document.getElementById('shallowResult').textContent = output;
    }
  </script>
</body>
</html>
```

---

### アプリ2: 設定管理システム

デフォルト設定とユーザー設定をマージするシステムです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>設定管理システム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
    .settings-panel {
      background: #f8f9fa;
      padding: 20px;
      margin: 20px 0;
      border-radius: 10px;
    }
    .setting-item {
      margin: 15px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    label {
      font-weight: bold;
      color: #555;
    }
    input[type="range"] {
      width: 200px;
    }
    select, input[type="text"] {
      padding: 8px 15px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
    }
    button {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin: 10px 5px;
      transition: transform 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);
    }
    .config-display {
      background: white;
      padding: 20px;
      border-radius: 8px;
      border: 2px solid #f093fb;
      margin-top: 20px;
    }
    pre {
      background: #2d3436;
      color: #dfe6e9;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
      font-size: 14px;
    }
    .default-tag {
      display: inline-block;
      background: #74b9ff;
      color: white;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 12px;
      margin-left: 10px;
    }
    h3 {
      color: #f5576c;
      border-bottom: 2px solid #f093fb;
      padding-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>⚙️ 設定管理システム</h1>

    <div class="settings-panel">
      <h3>ユーザー設定</h3>

      <div class="setting-item">
        <label>テーマ:</label>
        <select id="theme">
          <option value="">デフォルトを使用</option>
          <option value="light">ライト</option>
          <option value="dark">ダーク</option>
          <option value="auto">自動</option>
        </select>
        <span class="default-tag">デフォルト: light</span>
      </div>

      <div class="setting-item">
        <label>フォントサイズ:</label>
        <input type="range" id="fontSize" min="10" max="24" value="14">
        <span id="fontSizeValue">14</span>px
        <span class="default-tag">デフォルト: 14px</span>
      </div>

      <div class="setting-item">
        <label>言語:</label>
        <select id="language">
          <option value="">デフォルトを使用</option>
          <option value="ja">日本語</option>
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
        <span class="default-tag">デフォルト: ja</span>
      </div>

      <div class="setting-item">
        <label>通知:</label>
        <select id="notifications">
          <option value="">デフォルトを使用</option>
          <option value="true">有効</option>
          <option value="false">無効</option>
        </select>
        <span class="default-tag">デフォルト: true</span>
      </div>

      <div class="setting-item">
        <label>ユーザー名:</label>
        <input type="text" id="username" placeholder="名前を入力">
        <span class="default-tag">デフォルト: ゲスト</span>
      </div>

      <button onclick="applySettings()">設定を適用</button>
      <button onclick="resetSettings()">デフォルトに戻す</button>
    </div>

    <div class="config-display">
      <h3>📋 現在の設定</h3>
      <pre id="currentConfig"></pre>

      <h3>🔧 設定の作成過程</h3>
      <pre id="processExplanation"></pre>
    </div>
  </div>

  <script>
    // デフォルト設定（変更しない）
    const defaultConfig = {
      theme: "light",
      fontSize: 14,
      language: "ja",
      notifications: true,
      username: "ゲスト"
    };

    // フォントサイズスライダーの値を表示
    document.getElementById('fontSize').addEventListener('input', function() {
      document.getElementById('fontSizeValue').textContent = this.value;
    });

    // 設定を適用
    function applySettings() {
      // ユーザー入力を取得
      let userConfig = {};

      let theme = document.getElementById('theme').value;
      if (theme) userConfig.theme = theme;

      let fontSize = parseInt(document.getElementById('fontSize').value);
      if (fontSize !== 14) userConfig.fontSize = fontSize;

      let language = document.getElementById('language').value;
      if (language) userConfig.language = language;

      let notifications = document.getElementById('notifications').value;
      if (notifications) userConfig.notifications = notifications === "true";

      let username = document.getElementById('username').value;
      if (username) userConfig.username = username;

      // スプレッド構文でマージ
      let finalConfig = {
        ...defaultConfig,
        ...userConfig
      };

      // 結果を表示
      displayConfig(finalConfig, userConfig);
    }

    // 設定を表示
    function displayConfig(finalConfig, userConfig) {
      document.getElementById('currentConfig').textContent =
        JSON.stringify(finalConfig, null, 2);

      // 処理の説明
      let explanation = "// デフォルト設定\n";
      explanation += "const defaultConfig = " + JSON.stringify(defaultConfig, null, 2) + ";\n\n";

      explanation += "// ユーザー設定\n";
      explanation += "const userConfig = " + JSON.stringify(userConfig, null, 2) + ";\n\n";

      explanation += "// スプレッド構文でマージ\n";
      explanation += "const finalConfig = {\n";
      explanation += "  ...defaultConfig,  // まずデフォルト設定を展開\n";
      explanation += "  ...userConfig      // ユーザー設定で上書き\n";
      explanation += "};\n\n";

      explanation += "// 結果\n";
      explanation += "// - デフォルト設定は保持される\n";
      explanation += "// - ユーザーが変更した項目だけが上書きされる\n";
      explanation += "// - 元のdefaultConfigオブジェクトは変更されない";

      document.getElementById('processExplanation').textContent = explanation;
    }

    // リセット
    function resetSettings() {
      document.getElementById('theme').value = "";
      document.getElementById('fontSize').value = "14";
      document.getElementById('fontSizeValue').textContent = "14";
      document.getElementById('language').value = "";
      document.getElementById('notifications').value = "";
      document.getElementById('username').value = "";

      displayConfig(defaultConfig, {});
    }

    // 初期表示
    displayConfig(defaultConfig, {});
  </script>
</body>
</html>
```

---

### アプリ3: 商品テンプレート作成システム

スプレッド構文を使って、テンプレートから商品を作成します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>商品テンプレート作成システム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1000px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
    .template-section {
      background: #f8f9fa;
      padding: 20px;
      margin: 20px 0;
      border-radius: 10px;
      border: 2px solid #4facfe;
    }
    .template-item {
      background: white;
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      border: 2px solid transparent;
    }
    .template-item:hover {
      border-color: #4facfe;
      transform: translateX(5px);
    }
    .template-item h4 {
      margin: 0 0 10px 0;
      color: #4facfe;
    }
    .form-section {
      background: #fff3cd;
      padding: 20px;
      margin: 20px 0;
      border-radius: 10px;
      border-left: 5px solid #ffc107;
    }
    .form-group {
      margin: 15px 0;
    }
    label {
      display: block;
      font-weight: bold;
      color: #555;
      margin-bottom: 5px;
    }
    input, select {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
      box-sizing: border-box;
    }
    button {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin: 10px 5px;
      transition: transform 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
    }
    .products-list {
      margin-top: 30px;
    }
    .product-card {
      background: white;
      padding: 20px;
      margin: 15px 0;
      border-radius: 10px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .product-info h3 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .product-info p {
      margin: 5px 0;
      color: #666;
    }
    .product-price {
      font-size: 24px;
      font-weight: bold;
      color: #4facfe;
    }
    .code-display {
      background: #2d3436;
      color: #dfe6e9;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      overflow-x: auto;
    }
    .highlight {
      color: #ffeaa7;
      font-weight: bold;
    }
    h3 {
      color: #4facfe;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📦 商品テンプレート作成システム</h1>

    <div class="template-section">
      <h3>📋 テンプレートを選択</h3>
      <div class="template-item" onclick="selectTemplate('book')">
        <h4>📚 書籍テンプレート</h4>
        <p>カテゴリ: 書籍 | 税率: 10% | 在庫: 100</p>
      </div>
      <div class="template-item" onclick="selectTemplate('electronics')">
        <h4>💻 電子機器テンプレート</h4>
        <p>カテゴリ: 電子機器 | 税率: 10% | 保証: 1年</p>
      </div>
      <div class="template-item" onclick="selectTemplate('food')">
        <h4>🍎 食品テンプレート</h4>
        <p>カテゴリ: 食品 | 税率: 8% | 要冷蔵: いいえ</p>
      </div>
    </div>

    <div class="form-section" id="productForm" style="display: none;">
      <h3>✏️ 商品情報を入力</h3>
      <div class="form-group">
        <label>商品名:</label>
        <input type="text" id="productName" placeholder="例: JavaScriptの本">
      </div>
      <div class="form-group">
        <label>価格（円）:</label>
        <input type="number" id="productPrice" placeholder="例: 2980">
      </div>
      <div class="form-group">
        <label>説明:</label>
        <input type="text" id="productDescription" placeholder="例: 初心者向けの入門書">
      </div>
      <button onclick="createProduct()">商品を作成</button>

      <div class="code-display" id="codeDisplay"></div>
    </div>

    <div class="products-list">
      <h3>🛍️ 作成された商品一覧</h3>
      <div id="productsList"></div>
    </div>
  </div>

  <script>
    // テンプレート定義
    const templates = {
      book: {
        category: "書籍",
        taxRate: 0.10,
        stock: 100,
        publisher: "未設定",
        isbn: "未設定"
      },
      electronics: {
        category: "電子機器",
        taxRate: 0.10,
        warranty: "1年",
        manufacturer: "未設定"
      },
      food: {
        category: "食品",
        taxRate: 0.08,
        refrigerated: false,
        expirationDays: 30
      }
    };

    let selectedTemplate = null;
    let products = [];

    // テンプレート選択
    function selectTemplate(templateType) {
      selectedTemplate = templateType;
      document.getElementById('productForm').style.display = 'block';

      // 選択されたテンプレートを表示
      let template = templates[templateType];
      let code = "// 選択されたテンプレート\n";
      code += "const template = " + JSON.stringify(template, null, 2) + ";";

      document.getElementById('codeDisplay').innerHTML =
        code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // 商品を作成
    function createProduct() {
      if (!selectedTemplate) {
        alert('テンプレートを選択してください');
        return;
      }

      let name = document.getElementById('productName').value;
      let price = parseFloat(document.getElementById('productPrice').value);
      let description = document.getElementById('productDescription').value;

      if (!name || !price) {
        alert('商品名と価格を入力してください');
        return;
      }

      // スプレッド構文でテンプレートと新しいデータをマージ
      let newProduct = {
        id: products.length + 1,
        ...templates[selectedTemplate],  // テンプレートを展開
        name: name,
        price: price,
        description: description,
        createdAt: new Date().toLocaleString('ja-JP')
      };

      products.push(newProduct);

      // コード表示を更新
      displayCode(newProduct);

      // 商品リストを更新
      displayProducts();

      // フォームをクリア
      document.getElementById('productName').value = '';
      document.getElementById('productPrice').value = '';
      document.getElementById('productDescription').value = '';
    }

    // コード表示
    function displayCode(product) {
      let code = "// テンプレート\n";
      code += "const template = " + JSON.stringify(templates[selectedTemplate], null, 2) + ";\n\n";

      code += "// ユーザー入力\n";
      code += "const userInput = {\n";
      code += "  name: \"" + product.name + "\",\n";
      code += "  price: " + product.price + ",\n";
      code += "  description: \"" + product.description + "\"\n";
      code += "};\n\n";

      code += "// <span class='highlight'>スプレッド構文で新商品を作成</span>\n";
      code += "const newProduct = {\n";
      code += "  id: " + product.id + ",\n";
      code += "  <span class='highlight'>...template</span>,      // テンプレートを展開\n";
      code += "  <span class='highlight'>...userInput</span>,     // ユーザー入力を追加\n";
      code += "  createdAt: \"" + product.createdAt + "\"\n";
      code += "};\n\n";

      code += "// 結果\n";
      code += "console.log(newProduct);\n";
      code += "// " + JSON.stringify(product, null, 2).replace(/\n/g, '\n// ');

      document.getElementById('codeDisplay').innerHTML = code;
    }

    // 商品リストを表示
    function displayProducts() {
      let html = '';

      if (products.length === 0) {
        html = '<p style="text-align: center; color: #999;">まだ商品が作成されていません</p>';
      } else {
        products.forEach(product => {
          html += `
            <div class="product-card">
              <div class="product-info">
                <h3>${product.name}</h3>
                <p>📂 カテゴリ: ${product.category}</p>
                <p>📝 ${product.description}</p>
                <p>🕒 作成日時: ${product.createdAt}</p>
                <p style="font-size: 12px; color: #999;">
                  税率: ${product.taxRate * 100}%
                  ${product.warranty ? ' | 保証: ' + product.warranty : ''}
                  ${product.refrigerated !== undefined ? ' | 要冷蔵: ' + (product.refrigerated ? 'はい' : 'いいえ') : ''}
                </p>
              </div>
              <div class="product-price">
                ¥${product.price.toLocaleString()}
              </div>
            </div>
          `;
        });
      }

      document.getElementById('productsList').innerHTML = html;
    }

    // 初期表示
    displayProducts();
  </script>
</body>
</html>
```

---

## カリキュラムの要件チェック

curriculum.md（行1108-1113）の要件を確認します：

### ✅ 参照の問題
- 参照のコピーの仕組みを詳しく解説
- `=` 演算子による参照のコピーの問題点を実例で説明
- プリミティブ型との違いを図解

### ✅ Object.assign()
- `Object.assign()` の構文と使い方を説明
- 独立したコピーを作成する方法を実例で解説
- 複数のオブジェクトをマージする方法を紹介

### ✅ スプレッド構文
- スプレッド構文（`...`）の使い方を詳しく解説
- プロパティの追加と上書きの方法を説明
- `Object.assign()` との比較を提示

### ✅ 【知識】シャローコピー、参照型の特性
- シャローコピーの制限を詳しく解説
- ネストされたオブジェクトの扱いを説明
- ディープコピーの方法を紹介（JSON方式）
- 参照型の特性を図解で説明

### ✅ 成果物：オブジェクトコピー
- **アプリ1**: オブジェクトコピー比較システム（参照、Object.assign()、スプレッド構文、シャローコピーの比較）
- **アプリ2**: 設定管理システム（デフォルト設定とユーザー設定のマージ）
- **アプリ3**: 商品テンプレート作成システム（テンプレートからの商品作成）

すべての要件を満たしています！

---

## まとめ

このレッスンで学んだこと：

1. **参照の問題**: `obj2 = obj1` は参照のコピーで、同じオブジェクトを共有する
2. **Object.assign()**: `Object.assign({}, original)` で独立したコピーを作成
3. **スプレッド構文**: `{ ...original }` でより簡潔にコピー（推奨）
4. **シャローコピー**: ネストされたオブジェクトは参照がコピーされる
5. **ディープコピー**: `JSON.parse(JSON.stringify(obj))` で完全に独立したコピーを作成

次のレッスンでは、JSONの基礎を学びます。
