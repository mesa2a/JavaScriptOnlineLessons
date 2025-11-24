# レッスン139：メソッド

## 学習目標
- オブジェクトの中に関数を定義する方法を学ぶ
- thisキーワードの基本的な使い方を理解する
- メソッドを使ってオブジェクトに動作を持たせる

## メソッドとは

これまで学んだオブジェクトは、データ（プロパティ）を保存するものでした。しかし、オブジェクトは関数も持つことができます。**オブジェクトの中にある関数のことを「メソッド」と呼びます**。

```javascript
let person = {
  name: "田中",
  age: 25,
  greet: function() {
    console.log("こんにちは！");
  }
};

person.greet();  // "こんにちは！"
```

`greet` がメソッドです。プロパティと同じようにドット記法でアクセスし、`()` を付けて実行します。

## 基本的な書き方

### メソッドの定義

```javascript
let calculator = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  }
};

let result1 = calculator.add(5, 3);
console.log(result1);  // 8

let result2 = calculator.subtract(10, 4);
console.log(result2);  // 6
```

メソッドは通常の関数と同じように、引数を受け取り、値を返すことができます。

### 省略記法

ES6以降では、メソッドをより簡潔に書くことができます：

```javascript
let calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};
```

`function` キーワードを省略できます。この書き方の方がよく使われます。

## thisキーワード

メソッドの中で、**そのオブジェクト自身のプロパティにアクセスする**には、`this` キーワードを使います。

```javascript
let person = {
  name: "佐藤",
  age: 30,
  introduce() {
    console.log("私の名前は" + this.name + "です");
    console.log("年齢は" + this.age + "歳です");
  }
};

person.introduce();
// "私の名前は佐藤です"
// "年齢は30歳です"
```

`this` は「このオブジェクト自身」を指します。`this.name` は `person.name` と同じ意味になります。

### thisを使わない場合

もし `this` を使わないと、オブジェクトのプロパティにアクセスできません：

```javascript
let person = {
  name: "佐藤",
  introduce() {
    console.log("私の名前は" + name + "です");  // エラー！
  }
};
```

メソッドの中で自分自身のプロパティを使う場合は、必ず `this` を付けます。

## プロパティを変更するメソッド

メソッドを使って、オブジェクトのプロパティを変更することもできます：

```javascript
let counter = {
  count: 0,
  increment() {
    this.count = this.count + 1;
  },
  decrement() {
    this.count = this.count - 1;
  },
  reset() {
    this.count = 0;
  }
};

counter.increment();
console.log(counter.count);  // 1

counter.increment();
console.log(counter.count);  // 2

counter.decrement();
console.log(counter.count);  // 1

counter.reset();
console.log(counter.count);  // 0
```

## 値を返すメソッド

メソッドは計算結果を返すこともできます：

```javascript
let rectangle = {
  width: 10,
  height: 5,
  getArea() {
    return this.width * this.height;
  },
  getPerimeter() {
    return (this.width + this.height) * 2;
  }
};

let area = rectangle.getArea();
console.log(area);  // 50

let perimeter = rectangle.getPerimeter();
console.log(perimeter);  // 30
```

## 実用例：銀行口座

メソッドを使った実用的な例を見てみましょう：

```javascript
let bankAccount = {
  owner: "山田太郎",
  balance: 10000,
  deposit(amount) {
    this.balance = this.balance + amount;
    console.log(amount + "円を預金しました");
  },
  withdraw(amount) {
    if (amount > this.balance) {
      console.log("残高不足です");
    } else {
      this.balance = this.balance - amount;
      console.log(amount + "円を引き出しました");
    }
  },
  getBalance() {
    return this.balance;
  }
};

bankAccount.deposit(5000);
// "5000円を預金しました"

console.log(bankAccount.getBalance());
// 15000

bankAccount.withdraw(3000);
// "3000円を引き出しました"

console.log(bankAccount.getBalance());
// 12000

bankAccount.withdraw(20000);
// "残高不足です"
```

## HTMLとの連携

メソッドを使ってWebページを更新することもできます：

```javascript
let user = {
  firstName: "太郎",
  lastName: "山田",
  email: "taro@example.com",
  displayInfo() {
    let output = document.getElementById("userInfo");
    let html = "";
    html = html + "<p>名前：" + this.lastName + this.firstName + "</p>";
    html = html + "<p>メール：" + this.email + "</p>";
    output.innerHTML = html;
  },
  updateEmail(newEmail) {
    this.email = newEmail;
    this.displayInfo();  // メソッドから別のメソッドを呼び出す
  }
};

user.displayInfo();
user.updateEmail("yamada@example.com");
```

メソッドの中から、同じオブジェクトの別のメソッドを `this.メソッド名()` で呼び出すこともできます。

## メソッドの利点

メソッドを使うことで、以下の利点があります：

1. **関連するデータと処理を一箇所にまとめられる**
2. **コードの整理がしやすくなる**
3. **再利用しやすくなる**
4. **データの整合性を保ちやすくなる**

```javascript
// メソッドなし
let studentName = "田中";
let studentScore = 75;
function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 60) return "B";
  return "C";
}

// メソッドあり
let student = {
  name: "田中",
  score: 75,
  getGrade() {
    if (this.score >= 80) return "A";
    if (this.score >= 60) return "B";
    return "C";
  }
};
```

メソッドを使う方が、データと処理がまとまっていて分かりやすいです。

## まとめ

メソッドはオブジェクトに動作を持たせる重要な機能です：

1. オブジェクトの中に関数を定義できる
2. `this` キーワードで自分自身のプロパティにアクセス
3. `object.method()` で呼び出す
4. プロパティの読み取りや変更ができる
5. 値を返すこともできる

次のレッスンでは、オブジェクトをさらに詳しく学びます。

## 練習問題

以下の仕様に従って、商品オブジェクトを作成してください：

```javascript
let product = {
  name: "ノートパソコン",
  price: 80000,
  stock: 5,
  taxRate: 0.1,

  // 1. 税込価格を計算して返すメソッド
  getPriceWithTax() {
    // ここに実装
  },

  // 2. 在庫を減らすメソッド（引数で数量を受け取る）
  sell(quantity) {
    // 在庫が足りない場合は "在庫不足" と表示
    // 在庫が足りる場合は在庫を減らして "販売完了" と表示
  },

  // 3. 在庫を増やすメソッド（引数で数量を受け取る）
  restock(quantity) {
    // ここに実装
  },

  // 4. 商品情報を表示するメソッド
  displayInfo() {
    // 名前、価格、在庫を表示
  }
};
```

各メソッドを実装して、動作を確認してください。
