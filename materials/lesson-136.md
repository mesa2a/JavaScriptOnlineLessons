# レッスン136: プロパティ変更

**日付**: 2025-11-26
**所要時間**: 30分

## このレッスンで学ぶこと

1. プロパティの値を変更する方法
2. 新しいプロパティを追加する方法
3. deleteでプロパティを削除する方法
4. 動的なプロパティ操作

---

## プロパティ変更とは？

### 日常生活での例え：ノートの編集

```
【ノートに書かれた情報】
名前: 太郎
年齢: 20歳
住所: 東京都

【編集できること】
✓ 年齢を21歳に変更（値の更新）
✓ メールアドレスを追加（新しいページを追加）
✓ 住所の項目を消す（ページを破る）
```

**プロパティ変更**とは、オブジェクトのデータを書き換えたり、新しいデータを追加したり、不要なデータを削除することです。

---

## 1. プロパティの値を変更 (person.age = 21)

### 基本的な変更方法

```javascript
const person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

console.log(person.age); // => 20

// プロパティの値を変更
person.age = 21;

console.log(person.age); // => 21
```

**構文**：
```
オブジェクト名.プロパティ名 = 新しい値;
```

### 実行の流れ

```javascript
const person = {
  name: "太郎",
  age: 20
};

person.age = 21;

// 実行の流れ:
// ステップ1: personオブジェクトにアクセス
// person = { name: "太郎", age: 20 }

// ステップ2: ageプロパティを探す
// person.age を検索

// ステップ3: 新しい値を代入
// age: 20 → age: 21

// ステップ4: オブジェクトが更新される
// person = { name: "太郎", age: 21 }
```

**図解：プロパティ値の変更**

```
変更前:
person オブジェクト
┌─────────────────┐
│  name: "太郎"   │
│  age: 20        │ ← person.age = 21
└─────────────────┘

変更後:
person オブジェクト
┌─────────────────┐
│  name: "太郎"   │
│  age: 21        │ ← 値が更新された
└─────────────────┘
```

### 複数のプロパティを変更

```javascript
const book = {
  title: "JavaScript入門",
  price: 3000,
  stock: 10
};

// 複数のプロパティを変更
book.price = 2800;
book.stock = 15;

console.log(book.price); // => 2800
console.log(book.stock); // => 15
```

### ブラケット記法での変更

```javascript
const person = {
  name: "太郎",
  age: 20
};

// ブラケット記法でも変更可能
person["age"] = 21;
console.log(person.age); // => 21

// 変数を使った変更
const prop = "name";
person[prop] = "次郎";
console.log(person.name); // => "次郎"
```

---

## 2. 新しいプロパティを追加

### 基本的な追加方法

存在しないプロパティに値を代入すると、**新しいプロパティが追加**されます。

```javascript
const person = {
  name: "太郎",
  age: 20
};

console.log(person); // => { name: "太郎", age: 20 }

// 新しいプロパティを追加
person.city = "東京";
person.job = "学生";

console.log(person);
// => { name: "太郎", age: 20, city: "東京", job: "学生" }
```

**構文**：
```
オブジェクト名.新しいプロパティ名 = 値;
```

### 実行の流れ

```javascript
const person = {
  name: "太郎",
  age: 20
};

person.city = "東京";

// 実行の流れ:
// ステップ1: personオブジェクトにアクセス
// person = { name: "太郎", age: 20 }

// ステップ2: cityプロパティを探す
// cityプロパティは存在しない

// ステップ3: 新しいプロパティを作成して値を設定
// city: "東京" を追加

// ステップ4: オブジェクトが更新される
// person = { name: "太郎", age: 20, city: "東京" }
```

**図解：プロパティの追加**

```
追加前:
person オブジェクト
┌─────────────────┐
│  name: "太郎"   │
│  age: 20        │
└─────────────────┘
         ↓
   person.city = "東京"
         ↓
追加後:
person オブジェクト
┌─────────────────┐
│  name: "太郎"   │
│  age: 20        │
│  city: "東京"   │ ← 新しいプロパティが追加された
└─────────────────┘
```

### ブラケット記法での追加

```javascript
const person = {
  name: "太郎",
  age: 20
};

// ブラケット記法で追加
person["email"] = "taro@example.com";
person["phone"] = "090-1234-5678";

console.log(person.email); // => "taro@example.com"
console.log(person.phone); // => "090-1234-5678"

// 変数を使った追加
const newProp = "hobby";
person[newProp] = "プログラミング";
console.log(person.hobby); // => "プログラミング"
```

---

## 3. deleteでプロパティを削除

### 基本的な削除方法

`delete`演算子を使うと、プロパティを削除できます。

```javascript
const person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

console.log(person); // => { name: "太郎", age: 20, city: "東京" }

// プロパティを削除
delete person.city;

console.log(person); // => { name: "太郎", age: 20 }
console.log(person.city); // => undefined
```

**構文**：
```
delete オブジェクト名.プロパティ名;
```

### 実行の流れ

```javascript
const person = {
  name: "太郎",
  age: 20,
  city: "東京"
};

delete person.city;

// 実行の流れ:
// ステップ1: personオブジェクトにアクセス
// person = { name: "太郎", age: 20, city: "東京" }

// ステップ2: cityプロパティを探す
// cityプロパティが見つかる

// ステップ3: プロパティを削除
// cityプロパティが削除される

// ステップ4: オブジェクトが更新される
// person = { name: "太郎", age: 20 }
```

**図解：プロパティの削除**

```
削除前:
person オブジェクト
┌─────────────────┐
│  name: "太郎"   │
│  age: 20        │
│  city: "東京"   │ ← delete person.city
└─────────────────┘
         ↓
削除後:
person オブジェクト
┌─────────────────┐
│  name: "太郎"   │
│  age: 20        │
└─────────────────┘
```

### ブラケット記法での削除

```javascript
const person = {
  name: "太郎",
  age: 20,
  email: "taro@example.com"
};

// ブラケット記法で削除
delete person["email"];
console.log(person.email); // => undefined

// 変数を使った削除
const propToDelete = "age";
delete person[propToDelete];
console.log(person.age); // => undefined
```

### deleteとundefined代入の違い

```javascript
const obj = {
  name: "太郎",
  age: 20
};

// undefinedを代入（プロパティは残る）
obj.name = undefined;
console.log("name" in obj); // => true
console.log(obj.name); // => undefined

// deleteで削除（プロパティがなくなる）
delete obj.age;
console.log("age" in obj); // => false
console.log(obj.age); // => undefined
```

---

## 実践例1：ユーザープロフィール編集

ユーザー情報を編集できるアプリを作りましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>プロフィール編集</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .profile-card {
      background-color: white;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .profile-card h2 {
      margin-top: 0;
      color: #667eea;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }

    .property {
      padding: 12px;
      margin: 8px 0;
      background-color: #f8f9fa;
      border-radius: 5px;
      border-left: 4px solid #667eea;
    }

    .property strong {
      color: #555;
    }

    .edit-section {
      background-color: white;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }

    .edit-section h3 {
      margin-top: 0;
      color: #555;
    }

    input {
      padding: 10px;
      margin: 5px;
      font-size: 14px;
      border: 2px solid #ddd;
      border-radius: 5px;
      width: 200px;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
    }

    button {
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      font-weight: bold;
      transition: all 0.3s;
    }

    .btn-update {
      background-color: #667eea;
      color: white;
    }

    .btn-update:hover {
      background-color: #5568d3;
    }

    .btn-add {
      background-color: #28a745;
      color: white;
    }

    .btn-add:hover {
      background-color: #218838;
    }

    .btn-delete {
      background-color: #dc3545;
      color: white;
    }

    .btn-delete:hover {
      background-color: #c82333;
    }
  </style>
</head>
<body>
  <h1>👤 プロフィール編集システム</h1>

  <div class="profile-card">
    <h2>現在のプロフィール</h2>
    <div id="profileDisplay"></div>
  </div>

  <div class="edit-section">
    <h3>年齢を変更</h3>
    <input type="number" id="newAge" placeholder="新しい年齢">
    <button class="btn-update" onclick="updateAge()">年齢を更新</button>
  </div>

  <div class="edit-section">
    <h3>メールアドレスを追加</h3>
    <input type="email" id="newEmail" placeholder="example@email.com">
    <button class="btn-add" onclick="addEmail()">メールを追加</button>
  </div>

  <div class="edit-section">
    <h3>都市情報を削除</h3>
    <button class="btn-delete" onclick="deleteCity()">都市を削除</button>
  </div>

  <script>
    // ユーザープロフィール
    const user = {
      name: "山田太郎",
      age: 28,
      city: "東京都",
      job: "Webデザイナー"
    };

    // プロフィールを表示する関数
    const displayProfile = function() {
      const display = document.getElementById('profileDisplay');
      display.innerHTML = '';

      // すべてのプロパティを表示
      for (const key in user) {
        const div = document.createElement('div');
        div.className = 'property';
        div.innerHTML = `<strong>${key}:</strong> ${user[key]}`;
        display.appendChild(div);
      }
    };

    // 年齢を更新
    const updateAge = function() {
      const newAge = parseInt(document.getElementById('newAge').value);

      if (isNaN(newAge) || newAge < 0) {
        alert('正しい年齢を入力してください');
        return;
      }

      // 値を変更
      user.age = newAge;
      displayProfile();

      // 入力欄をクリア
      document.getElementById('newAge').value = '';
      alert('年齢を更新しました！');
    };

    // メールアドレスを追加
    const addEmail = function() {
      const email = document.getElementById('newEmail').value;

      if (email === '') {
        alert('メールアドレスを入力してください');
        return;
      }

      // 新しいプロパティを追加
      user.email = email;
      displayProfile();

      // 入力欄をクリア
      document.getElementById('newEmail').value = '';
      alert('メールアドレスを追加しました！');
    };

    // 都市を削除
    const deleteCity = function() {
      if (!user.city) {
        alert('都市情報は既に削除されています');
        return;
      }

      // プロパティを削除
      delete user.city;
      displayProfile();
      alert('都市情報を削除しました！');
    };

    // 初期表示
    displayProfile();
  </script>
</body>
</html>
```

**このアプリの特徴**：
- ✅ プロパティの変更（年齢の更新）
- ✅ プロパティの追加（メールアドレスの追加）
- ✅ プロパティの削除（都市情報の削除）
- ✅ リアルタイムで変更内容を表示

---

## 実践例2：商品在庫管理システム

商品データを管理するシステムを作りましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>在庫管理システム</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 900px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .container {
      background-color: white;
      border-radius: 15px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }

    h1 {
      text-align: center;
      color: #667eea;
      margin-top: 0;
    }

    .product-display {
      background-color: #f8f9fa;
      border-radius: 10px;
      padding: 25px;
      margin: 30px 0;
    }

    .product-display h2 {
      margin-top: 0;
      color: #333;
    }

    .property-item {
      padding: 15px;
      margin: 10px 0;
      background-color: white;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .property-key {
      font-weight: bold;
      color: #555;
    }

    .property-value {
      color: #333;
      font-size: 18px;
    }

    .controls {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }

    .control-group {
      background-color: #f8f9fa;
      border-radius: 10px;
      padding: 20px;
    }

    .control-group h3 {
      margin-top: 0;
      color: #555;
      font-size: 16px;
    }

    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      font-size: 14px;
      border: 2px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
    }

    button {
      width: 100%;
      padding: 12px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      font-weight: bold;
      transition: all 0.3s;
    }

    .btn-primary {
      background-color: #667eea;
      color: white;
    }

    .btn-primary:hover {
      background-color: #5568d3;
    }

    .btn-success {
      background-color: #28a745;
      color: white;
    }

    .btn-success:hover {
      background-color: #218838;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background-color: #c82333;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📦 商品在庫管理システム</h1>

    <div class="product-display">
      <h2>商品情報</h2>
      <div id="productDisplay"></div>
    </div>

    <div class="controls">
      <div class="control-group">
        <h3>価格を変更</h3>
        <input type="number" id="newPrice" placeholder="新しい価格">
        <button class="btn-primary" onclick="updatePrice()">価格を更新</button>
      </div>

      <div class="control-group">
        <h3>在庫を変更</h3>
        <input type="number" id="newStock" placeholder="新しい在庫数">
        <button class="btn-primary" onclick="updateStock()">在庫を更新</button>
      </div>

      <div class="control-group">
        <h3>カテゴリを追加</h3>
        <input type="text" id="category" placeholder="カテゴリ名">
        <button class="btn-success" onclick="addCategory()">カテゴリを追加</button>
      </div>

      <div class="control-group">
        <h3>セール情報</h3>
        <input type="number" id="discount" placeholder="割引率（%）">
        <button class="btn-success" onclick="addDiscount()">セールを開始</button>
        <button class="btn-danger" onclick="removeDiscount()" style="margin-top: 10px;">セールを終了</button>
      </div>
    </div>
  </div>

  <script>
    // 商品データ
    const product = {
      name: "ワイヤレスマウス",
      price: 2800,
      stock: 45,
      brand: "TechMouse"
    };

    // 商品情報を表示する関数
    const displayProduct = function() {
      const display = document.getElementById('productDisplay');
      display.innerHTML = '';

      // すべてのプロパティを表示
      for (const key in product) {
        const div = document.createElement('div');
        div.className = 'property-item';

        const keySpan = document.createElement('span');
        keySpan.className = 'property-key';
        keySpan.textContent = key;

        const valueSpan = document.createElement('span');
        valueSpan.className = 'property-value';
        valueSpan.textContent = product[key];

        div.appendChild(keySpan);
        div.appendChild(valueSpan);
        display.appendChild(div);
      }
    };

    // 価格を更新
    const updatePrice = function() {
      const newPrice = parseInt(document.getElementById('newPrice').value);

      if (isNaN(newPrice) || newPrice < 0) {
        alert('正しい価格を入力してください');
        return;
      }

      // プロパティの値を変更
      product.price = newPrice;
      displayProduct();

      document.getElementById('newPrice').value = '';
      alert(`価格を ${newPrice.toLocaleString()}円 に更新しました`);
    };

    // 在庫を更新
    const updateStock = function() {
      const newStock = parseInt(document.getElementById('newStock').value);

      if (isNaN(newStock) || newStock < 0) {
        alert('正しい在庫数を入力してください');
        return;
      }

      // プロパティの値を変更
      product.stock = newStock;
      displayProduct();

      document.getElementById('newStock').value = '';
      alert(`在庫を ${newStock}個 に更新しました`);
    };

    // カテゴリを追加
    const addCategory = function() {
      const category = document.getElementById('category').value;

      if (category === '') {
        alert('カテゴリ名を入力してください');
        return;
      }

      // 新しいプロパティを追加
      product.category = category;
      displayProduct();

      document.getElementById('category').value = '';
      alert(`カテゴリ「${category}」を追加しました`);
    };

    // セール（割引）を追加
    const addDiscount = function() {
      const discount = parseInt(document.getElementById('discount').value);

      if (isNaN(discount) || discount < 0 || discount > 100) {
        alert('0〜100の割引率を入力してください');
        return;
      }

      // 新しいプロパティを追加
      product.discount = discount + '%';
      displayProduct();

      document.getElementById('discount').value = '';
      alert(`${discount}%オフのセールを開始しました`);
    };

    // セール（割引）を削除
    const removeDiscount = function() {
      if (!product.discount) {
        alert('現在セールは開催されていません');
        return;
      }

      // プロパティを削除
      delete product.discount;
      displayProduct();
      alert('セールを終了しました');
    };

    // 初期表示
    displayProduct();
  </script>
</body>
</html>
```

**このアプリの特徴**：
- ✅ 複数のプロパティを変更（価格、在庫）
- ✅ 新しいプロパティを追加（カテゴリ、割引）
- ✅ プロパティを削除（割引の削除）
- ✅ グリッドレイアウトで操作しやすいUI

---

## 実践例3：タスク管理アプリ

タスクの状態を管理するアプリを作りましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>タスク管理</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f0f2f5;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .task-card {
      background-color: white;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin: 20px 0;
    }

    .task-card h2 {
      margin-top: 0;
      color: #667eea;
    }

    .property {
      padding: 12px;
      margin: 8px 0;
      background-color: #f8f9fa;
      border-radius: 5px;
    }

    .property strong {
      color: #555;
    }

    .buttons {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-start {
      background-color: #28a745;
      color: white;
    }

    .btn-start:hover {
      background-color: #218838;
    }

    .btn-complete {
      background-color: #667eea;
      color: white;
    }

    .btn-complete:hover {
      background-color: #5568d3;
    }

    .btn-reset {
      background-color: #ffc107;
      color: #333;
    }

    .btn-reset:hover {
      background-color: #e0a800;
    }

    .status {
      padding: 8px 16px;
      border-radius: 20px;
      display: inline-block;
      font-weight: bold;
      margin-left: 10px;
    }

    .status-pending {
      background-color: #e9ecef;
      color: #6c757d;
    }

    .status-progress {
      background-color: #fff3cd;
      color: #856404;
    }

    .status-completed {
      background-color: #d4edda;
      color: #155724;
    }
  </style>
</head>
<body>
  <h1>✅ タスク管理アプリ</h1>

  <div class="task-card">
    <h2 id="taskTitle"></h2>
    <div id="taskDisplay"></div>
  </div>

  <div class="buttons">
    <button class="btn-start" onclick="startTask()">タスク開始</button>
    <button class="btn-complete" onclick="completeTask()">タスク完了</button>
    <button class="btn-reset" onclick="resetTask()">リセット</button>
  </div>

  <script>
    // タスクオブジェクト
    const task = {
      title: "JavaScript学習",
      status: "未着手",
      priority: "高"
    };

    // タスクを表示する関数
    const displayTask = function() {
      document.getElementById('taskTitle').textContent = task.title;

      const display = document.getElementById('taskDisplay');
      display.innerHTML = '';

      for (const key in task) {
        if (key === 'title') continue; // タイトルは見出しに表示済み

        const div = document.createElement('div');
        div.className = 'property';

        let value = task[key];

        // ステータスに応じてスタイルを適用
        if (key === 'status') {
          const statusClass =
            value === '未着手' ? 'status-pending' :
            value === '進行中' ? 'status-progress' :
            'status-completed';

          value = `<span class="status ${statusClass}">${value}</span>`;
        }

        div.innerHTML = `<strong>${key}:</strong> ${value}`;
        display.appendChild(div);
      }
    };

    // タスクを開始
    const startTask = function() {
      // ステータスを変更
      task.status = "進行中";

      // 開始時刻を追加
      const now = new Date();
      task.startTime = now.toLocaleString('ja-JP');

      displayTask();
      alert('タスクを開始しました！');
    };

    // タスクを完了
    const completeTask = function() {
      // ステータスを変更
      task.status = "完了";

      // 完了時刻を追加
      const now = new Date();
      task.completedTime = now.toLocaleString('ja-JP');

      // 優先度を削除（完了したので不要）
      delete task.priority;

      displayTask();
      alert('タスクを完了しました！');
    };

    // タスクをリセット
    const resetTask = function() {
      // ステータスをリセット
      task.status = "未着手";

      // 優先度を再設定
      task.priority = "高";

      // 時刻情報を削除
      delete task.startTime;
      delete task.completedTime;

      displayTask();
      alert('タスクをリセットしました');
    };

    // 初期表示
    displayTask();
  </script>
</body>
</html>
```

**このアプリの特徴**：
- ✅ プロパティの変更（ステータスの更新）
- ✅ プロパティの追加（開始時刻、完了時刻）
- ✅ プロパティの削除（優先度、時刻情報）
- ✅ 実用的なタスク管理機能

---

## まとめ

このレッスンで学んだこと：

### 1. **プロパティの値を変更**
```javascript
person.age = 21;
person["name"] = "次郎";
```
- 既存のプロパティに新しい値を代入

### 2. **新しいプロパティを追加**
```javascript
person.city = "東京";
person["email"] = "example@email.com";
```
- 存在しないプロパティに値を代入すると追加される

### 3. **deleteでプロパティを削除**
```javascript
delete person.city;
delete person["email"];
```
- delete演算子でプロパティを削除
- undefinedを代入するのとは異なる

### 4. **動的なプロパティ操作**
```javascript
const prop = "age";
person[prop] = 21;
delete person[prop];
```
- 変数を使ってプロパティを操作できる

---

## カリキュラムの要件チェック

### レッスン136：プロパティ変更
- ✅ **person.age = 21**: プロパティ値の変更を詳細に解説
- ✅ **新しいプロパティ追加**: 存在しないプロパティへの代入で追加
- ✅ **delete で削除**: delete演算子の使い方とundefinedとの違い
- ✅ **成果物：データ編集**: 3つの実践的な編集システムを実装

---

## 次のレッスンの予告

次のレッスンでは、**複雑なオブジェクト**について学びます。

オブジェクトの中にオブジェクトや配列を含む、より複雑なデータ構造を扱う方法を学んでいきましょう！
