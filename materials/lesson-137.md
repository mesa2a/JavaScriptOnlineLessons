# レッスン137：複雑なオブジェクト

## このレッスンで学ぶこと

このレッスンでは、より複雑なオブジェクトの構造について学びます。オブジェクトの中に別のオブジェクトや配列を含めることで、より詳細で構造化されたデータを扱うことができるようになります。

## ネストしたオブジェクト

オブジェクトの中に別のオブジェクトを含めることができます。これを「ネストしたオブジェクト」と呼びます。

### 基本的なネスト構造

```javascript
let person = {
  name: "山田太郎",
  age: 30,
  address: {
    prefecture: "東京都",
    city: "新宿区",
    street: "西新宿1-1-1"
  }
};
```

この例では、`address`プロパティの値が別のオブジェクトになっています。

### ネストしたプロパティへのアクセス

ドット記法を連続して使うことで、ネストしたプロパティにアクセスできます。

```javascript
let person = {
  name: "山田太郎",
  age: 30,
  address: {
    prefecture: "東京都",
    city: "新宿区",
    street: "西新宿1-1-1"
  }
};

console.log(person.address.prefecture); // "東京都"
console.log(person.address.city);       // "新宿区"
console.log(person.address.street);     // "西新宿1-1-1"
```

### より深いネスト

オブジェクトは何段階でもネストできます。

```javascript
let company = {
  name: "ABC株式会社",
  employee: {
    name: "田中",
    position: "エンジニア",
    contact: {
      email: "tanaka@abc.com",
      phone: "03-1234-5678"
    }
  }
};

console.log(company.employee.contact.email); // "tanaka@abc.com"
```

## 配列を含むオブジェクト

オブジェクトのプロパティの値として、配列を持つこともできます。

### 基本的な構造

```javascript
let student = {
  name: "佐藤花子",
  age: 20,
  hobbies: ["読書", "音楽", "旅行"]
};

console.log(student.hobbies[0]); // "読書"
console.log(student.hobbies[1]); // "音楽"
console.log(student.hobbies[2]); // "旅行"
```

### 配列要素の操作

配列のメソッドも通常通り使えます。

```javascript
let student = {
  name: "佐藤花子",
  age: 20,
  hobbies: ["読書", "音楽"]
};

// 要素を追加
student.hobbies.push("旅行");
console.log(student.hobbies); // ["読書", "音楽", "旅行"]

// 配列の長さ
console.log(student.hobbies.length); // 3
```

### 配列の要素がオブジェクト

配列の各要素をオブジェクトにすることもできます。

```javascript
let classroom = {
  name: "クラスA",
  students: [
    { name: "太郎", score: 85 },
    { name: "花子", score: 92 },
    { name: "次郎", score: 78 }
  ]
};

console.log(classroom.students[0].name);  // "太郎"
console.log(classroom.students[1].score); // 92
```

## ネストと配列の組み合わせ

ネストしたオブジェクトと配列を組み合わせることで、複雑なデータ構造を表現できます。

```javascript
let school = {
  name: "ABC高校",
  location: {
    prefecture: "東京都",
    city: "渋谷区"
  },
  classes: [
    {
      name: "1年A組",
      students: ["太郎", "花子", "次郎"]
    },
    {
      name: "1年B組",
      students: ["恵子", "健太", "美咲"]
    }
  ]
};

console.log(school.location.city);           // "渋谷区"
console.log(school.classes[0].name);        // "1年A組"
console.log(school.classes[0].students[1]); // "花子"
```

## 実践例：アドレス帳の作成

複雑なオブジェクトを使って、実用的なアドレス帳を作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>アドレス帳</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        .contact-card {
            border: 2px solid #4CAF50;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            background-color: #f1f8f4;
        }
        .contact-name {
            font-size: 24px;
            font-weight: bold;
            color: #2E7D32;
            margin-bottom: 15px;
        }
        .section {
            margin: 15px 0;
            padding: 10px;
            background-color: white;
            border-radius: 5px;
        }
        .section-title {
            font-weight: bold;
            color: #555;
            margin-bottom: 5px;
        }
        .hobby-list {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .hobby-tag {
            background-color: #2196F3;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1>アドレス帳</h1>
    <div id="contactList"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let addressBook = {
  contacts: [
    {
      name: "山田太郎",
      age: 30,
      address: {
        prefecture: "東京都",
        city: "新宿区",
        street: "西新宿1-1-1"
      },
      phones: ["03-1234-5678", "090-1111-2222"],
      hobbies: ["ゴルフ", "読書", "料理"]
    },
    {
      name: "佐藤花子",
      age: 28,
      address: {
        prefecture: "神奈川県",
        city: "横浜市",
        street: "みなとみらい2-2-2"
      },
      phones: ["045-9876-5432"],
      hobbies: ["音楽", "旅行"]
    },
    {
      name: "田中次郎",
      age: 35,
      address: {
        prefecture: "大阪府",
        city: "大阪市",
        street: "梅田3-3-3"
      },
      phones: ["06-5555-6666", "080-3333-4444"],
      hobbies: ["スポーツ", "映画鑑賞", "カラオケ"]
    }
  ]
};

let contactList = document.getElementById("contactList");

// 連絡先を表示する関数
function displayContacts() {
  addressBook.contacts.forEach(function(contact) {
    let card = document.createElement("div");
    card.className = "contact-card";

    // 名前
    let nameDiv = document.createElement("div");
    nameDiv.className = "contact-name";
    nameDiv.textContent = contact.name + " (" + contact.age + "歳)";
    card.appendChild(nameDiv);

    // 住所
    let addressSection = document.createElement("div");
    addressSection.className = "section";
    addressSection.innerHTML =
      '<div class="section-title">住所</div>' +
      contact.address.prefecture + ' ' +
      contact.address.city + ' ' +
      contact.address.street;
    card.appendChild(addressSection);

    // 電話番号
    let phoneSection = document.createElement("div");
    phoneSection.className = "section";
    phoneSection.innerHTML = '<div class="section-title">電話番号</div>';
    contact.phones.forEach(function(phone) {
      let phoneDiv = document.createElement("div");
      phoneDiv.textContent = phone;
      phoneSection.appendChild(phoneDiv);
    });
    card.appendChild(phoneSection);

    // 趣味
    let hobbySection = document.createElement("div");
    hobbySection.className = "section";
    hobbySection.innerHTML = '<div class="section-title">趣味</div>';
    let hobbyList = document.createElement("div");
    hobbyList.className = "hobby-list";
    contact.hobbies.forEach(function(hobby) {
      let hobbyTag = document.createElement("span");
      hobbyTag.className = "hobby-tag";
      hobbyTag.textContent = hobby;
      hobbyList.appendChild(hobbyTag);
    });
    hobbySection.appendChild(hobbyList);
    card.appendChild(hobbySection);

    contactList.appendChild(card);
  });
}

displayContacts();
```

このアドレス帳では、各連絡先がネストしたオブジェクト（address）と配列（phones、hobbies）を含む複雑な構造になっています。

## 複雑なオブジェクトの操作

### ネストしたプロパティの変更

```javascript
let person = {
  name: "太郎",
  address: {
    city: "東京",
    country: "日本"
  }
};

// ネストしたプロパティを変更
person.address.city = "大阪";
console.log(person.address.city); // "大阪"
```

### 配列要素の追加・削除

```javascript
let person = {
  name: "花子",
  skills: ["JavaScript", "HTML"]
};

// 配列に要素を追加
person.skills.push("CSS");
console.log(person.skills); // ["JavaScript", "HTML", "CSS"]
```

### ネストしたオブジェクトの追加

```javascript
let product = {
  name: "ノートPC",
  price: 120000
};

// 新しいネストしたオブジェクトを追加
product.specs = {
  cpu: "Intel Core i7",
  memory: "16GB",
  storage: "512GB SSD"
};

console.log(product.specs.cpu); // "Intel Core i7"
```

## 実践例：詳細な商品データ

商品の詳細情報を管理するシステムを作ってみましょう。

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>商品詳細データ</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 900px;
            margin: 50px auto;
            padding: 20px;
        }
        .product-detail {
            border: 2px solid #333;
            border-radius: 10px;
            padding: 25px;
            background-color: #fff;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .product-title {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
        }
        .info-section {
            margin: 20px 0;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 5px;
        }
        .section-header {
            font-size: 18px;
            font-weight: bold;
            color: #2196F3;
            margin-bottom: 10px;
        }
        .spec-item {
            padding: 8px 0;
            border-bottom: 1px solid #e0e0e0;
        }
        .tag {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 5px 12px;
            border-radius: 12px;
            margin: 5px;
            font-size: 14px;
        }
        .review {
            background-color: white;
            padding: 10px;
            margin: 10px 0;
            border-left: 3px solid #FF9800;
            border-radius: 3px;
        }
        .reviewer {
            font-weight: bold;
            color: #FF9800;
        }
        .rating {
            color: #FFD700;
        }
    </style>
</head>
<body>
    <h1>商品詳細管理システム</h1>
    <div id="productDisplay"></div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

```javascript
let product = {
  id: 101,
  name: "プレミアムワイヤレスヘッドホン",
  price: 25000,
  category: "オーディオ機器",
  manufacturer: {
    name: "AudioTech株式会社",
    country: "日本",
    contact: {
      email: "info@audiotech.jp",
      phone: "03-9999-8888"
    }
  },
  specifications: {
    type: "オーバーイヤー",
    connectivity: "Bluetooth 5.0",
    batteryLife: "30時間",
    weight: "250g"
  },
  features: ["ノイズキャンセリング", "ハイレゾ対応", "折りたたみ式", "マルチポイント接続"],
  reviews: [
    {
      user: "山田太郎",
      rating: 5,
      comment: "音質が素晴らしい。ノイズキャンセリングも完璧です。"
    },
    {
      user: "佐藤花子",
      rating: 4,
      comment: "装着感が良く、長時間使用しても疲れません。"
    },
    {
      user: "田中次郎",
      rating: 5,
      comment: "価格以上の価値があります。買って良かった。"
    }
  ],
  inStock: true
};

let productDisplay = document.getElementById("productDisplay");

function displayProduct() {
  let container = document.createElement("div");
  container.className = "product-detail";

  // タイトル
  let title = document.createElement("div");
  title.className = "product-title";
  title.textContent = product.name + " - ¥" + product.price.toLocaleString();
  container.appendChild(title);

  // メーカー情報
  let manufacturerSection = document.createElement("div");
  manufacturerSection.className = "info-section";
  manufacturerSection.innerHTML =
    '<div class="section-header">メーカー情報</div>' +
    '<div>会社名: ' + product.manufacturer.name + '</div>' +
    '<div>国: ' + product.manufacturer.country + '</div>' +
    '<div>連絡先: ' + product.manufacturer.contact.email + '</div>';
  container.appendChild(manufacturerSection);

  // 仕様
  let specsSection = document.createElement("div");
  specsSection.className = "info-section";
  specsSection.innerHTML = '<div class="section-header">製品仕様</div>';
  for (let key in product.specifications) {
    let specItem = document.createElement("div");
    specItem.className = "spec-item";
    specItem.textContent = key + ": " + product.specifications[key];
    specsSection.appendChild(specItem);
  }
  container.appendChild(specsSection);

  // 特徴
  let featuresSection = document.createElement("div");
  featuresSection.className = "info-section";
  featuresSection.innerHTML = '<div class="section-header">特徴</div>';
  product.features.forEach(function(feature) {
    let tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = feature;
    featuresSection.appendChild(tag);
  });
  container.appendChild(featuresSection);

  // レビュー
  let reviewsSection = document.createElement("div");
  reviewsSection.className = "info-section";
  reviewsSection.innerHTML = '<div class="section-header">カスタマーレビュー</div>';
  product.reviews.forEach(function(review) {
    let reviewDiv = document.createElement("div");
    reviewDiv.className = "review";
    reviewDiv.innerHTML =
      '<div class="reviewer">' + review.user + '</div>' +
      '<div class="rating">' + "★".repeat(review.rating) + '</div>' +
      '<div>' + review.comment + '</div>';
    reviewsSection.appendChild(reviewDiv);
  });
  container.appendChild(reviewsSection);

  productDisplay.appendChild(container);
}

displayProduct();
```

このシステムでは、製品情報がネストしたオブジェクト（manufacturer.contact）、配列（features）、オブジェクトの配列（reviews）を含む複雑な構造になっています。

## 複雑なデータ構造のナビゲート

複雑なオブジェクトから特定のデータを取得する方法を理解することが重要です。

### パスを辿る

```javascript
let data = {
  company: {
    departments: [
      {
        name: "営業部",
        employees: [
          { name: "田中", age: 30 },
          { name: "佐藤", age: 28 }
        ]
      }
    ]
  }
};

// 営業部の最初の従業員の名前
console.log(data.company.departments[0].employees[0].name); // "田中"
```

### ループでアクセス

```javascript
let company = {
  employees: [
    { name: "太郎", salary: 400000 },
    { name: "花子", salary: 450000 },
    { name: "次郎", salary: 380000 }
  ]
};

// すべての従業員の給与を表示
company.employees.forEach(function(employee) {
  console.log(employee.name + "の給与: " + employee.salary + "円");
});
```

## よくあるパターン

### パターン1：階層的なデータ

```javascript
let organization = {
  name: "本社",
  children: [
    {
      name: "東京支社",
      children: [
        { name: "営業部", employees: 20 },
        { name: "開発部", employees: 30 }
      ]
    },
    {
      name: "大阪支社",
      children: [
        { name: "営業部", employees: 15 }
      ]
    }
  ]
};
```

### パターン2：設定オブジェクト

```javascript
let appConfig = {
  ui: {
    theme: "dark",
    language: "ja",
    fontSize: 14
  },
  features: {
    notifications: true,
    autoSave: true,
    experimental: ["feature1", "feature2"]
  },
  user: {
    preferences: {
      privacy: "high",
      newsletter: false
    }
  }
};
```

### パターン3：データと関連情報

```javascript
let article = {
  title: "JavaScriptの基礎",
  content: "...",
  author: {
    name: "山田太郎",
    bio: "Web開発者",
    socialMedia: {
      twitter: "@yamada",
      github: "yamada-dev"
    }
  },
  tags: ["JavaScript", "プログラミング", "Web開発"],
  comments: [
    { user: "佐藤", text: "とても参考になりました" },
    { user: "田中", text: "わかりやすい説明です" }
  ]
};
```

## 注意点

### 1. 存在しないパスへのアクセス

ネストしたプロパティにアクセスする際、途中のプロパティが存在しない場合はエラーになります。

```javascript
let person = {
  name: "太郎"
};

// エラー: Cannot read property 'city' of undefined
// console.log(person.address.city);

// 安全なアクセス
if (person.address !== undefined) {
  console.log(person.address.city);
}
```

### 2. 深いコピー vs 浅いコピー

オブジェクトをコピーする際、ネストしたオブジェクトは参照がコピーされることに注意が必要です。

```javascript
let original = {
  name: "太郎",
  address: { city: "東京" }
};

let copy = original;
copy.address.city = "大阪";

console.log(original.address.city); // "大阪" (元のオブジェクトも変更される)
```

## 練習問題

次の仕様を満たすプログラムを作成してください。

### 仕様

1. HTMLに以下の要素を作成する
   - `id="display"`のdiv要素

2. JavaScriptで以下を実装する
   - `library`という名前のオブジェクトを作成する
     - name: "市立図書館"
     - location: オブジェクト
       - city: "東京"
       - address: "新宿1-1-1"
     - books: 配列（以下の3冊）
       - { title: "JavaScript入門", author: "山田太郎", available: true }
       - { title: "Web デザイン", author: "佐藤花子", available: false }
       - { title: "データベース基礎", author: "田中次郎", available: true }
   - 図書館名、場所、各書籍の情報を`display`要素に表示する

### ヒント

- ネストしたオブジェクトには`object.property.subproperty`でアクセスします
- 配列の要素には`array[index]`でアクセスします
- forEachループで配列の全要素を処理できます

## まとめ

このレッスンでは、以下のことを学びました。

1. ネストしたオブジェクトの作成とアクセス方法
2. オブジェクトの中に配列を含める方法
3. 配列の要素としてオブジェクトを使う方法
4. ネストと配列を組み合わせた複雑なデータ構造
5. 実践的なアドレス帳と商品詳細データの管理
6. 複雑なデータ構造のナビゲート方法

複雑なオブジェクトを扱えるようになることで、より現実的で実用的なデータを管理できるようになりました。次のレッスンでは、オブジェクトのさらに高度な機能について学んでいきます。
