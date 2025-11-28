# レッスン145: 週のプロジェクト - 住所録アプリ

**日付**: 2025-11-26
**トピック**: オブジェクトベースのアプリケーション開発、CRUD操作、検索機能

---

## 📋 このレッスンで学ぶこと

これまでに学んだオブジェクトに関する知識を総合的に活用して、実用的な住所録アプリケーションを作成します。

- 住所録アプリケーションの実装
- CRUD操作（作成・読取・更新・削除）の統合的な実装
- 検索・フィルタリング機能
- オブジェクトベースのデータ管理
- localStorageでのデータ永続化
- これまでの知識の総合的な活用

---

## 🌟 日常生活の例：紙の住所録から電子住所録へ

### 📖 紙の住所録の問題点

昔は友人や知人の連絡先を「紙の住所録」に書いていました。

```
┌─────────────────────────┐
│  📒 紙の住所録          │
├─────────────────────────┤
│ 山田太郎               │
│ 📞 090-1234-5678       │
│ 📧 yamada@example.com  │
│ 🏠 東京都渋谷区        │
│ [友人]                 │
├─────────────────────────┤
│ 佐藤花子               │
│ 📞 080-9876-5432       │
│ 📧 sato@example.com    │
│ 🏠 大阪府大阪市        │
│ [仕事]                 │
└─────────────────────────┘
```

**紙の住所録の問題点**：
- ❌ ページを使い切ると書けなくなる（追加が大変）
- ❌ 間違えたら消しゴムで消す必要がある（更新が面倒）
- ❌ 特定の人を探すのに全ページめくる必要がある（検索が遅い）
- ❌ 削除すると空きスペースができる（管理が煩雑）
- ❌ 紛失するとすべてのデータが失われる

### 💻 電子住所録の利点

JavaScriptで作る電子住所録なら：

```
┌─────────────────────────────────┐
│  💻 電子住所録アプリ            │
├─────────────────────────────────┤
│ [検索: 山田   ] [カテゴリ: 全て]│
│ → 瞬時に検索結果を表示          │
├─────────────────────────────────┤
│ ┌─────────────────┐             │
│ │ 山田太郎        │ [編集] [削除]│
│ │ 090-1234-5678   │             │
│ │ yamada@...      │             │
│ └─────────────────┘             │
├─────────────────────────────────┤
│ [新規追加] [エクスポート]       │
└─────────────────────────────────┘
```

**電子住所録の利点**：
- ✅ いくらでも追加できる（容量制限なし）
- ✅ 簡単に編集できる（ボタン1つで更新）
- ✅ 瞬時に検索できる（名前やカテゴリで絞り込み）
- ✅ 簡単に削除できる（データも整理される）
- ✅ 自動保存で安全（localStorageに保存）

このレッスンでは、このような実用的な住所録アプリを作ります。

---

## 🎯 住所録アプリとは

住所録アプリは、連絡先情報を管理するアプリケーションです。友人や知人の情報を保存・検索・編集・削除できます。

### データ構造

住所録アプリでは、**連絡先をオブジェクトとして表現**し、**それらをまとめて配列で管理**します。

```javascript
// 連絡先データは「オブジェクトの配列」として管理
let contacts = [
  {
    id: 1,                    // 一意の識別子（どの連絡先か区別するため）
    name: "山田太郎",         // 名前
    email: "yamada@example.com",  // メールアドレス
    phone: "090-1234-5678",   // 電話番号
    address: "東京都渋谷区",  // 住所
    category: "友人"          // カテゴリ（友人、仕事、家族など）
  },
  {
    id: 2,
    name: "佐藤花子",
    email: "sato@example.com",
    phone: "080-9876-5432",
    address: "大阪府大阪市",
    category: "仕事"
  }
];
```

**なぜオブジェクトを使うのか**：
- 1つの連絡先に複数の情報（名前、電話、メールなど）をまとめて管理できる
- プロパティ名で情報の意味が明確になる（`contact.name`で名前とわかる）
- 追加や削除が簡単にできる

**なぜ配列で管理するのか**：
- 複数の連絡先を順序付けて管理できる
- ループで全員の情報を表示できる
- 検索や絞り込みが簡単にできる

---

## 📚 CRUD操作の実装

CRUD（クラッド）とは、データ管理の基本的な4つの操作のことです。

```
┌──────────────────────────────┐
│  CRUD操作                    │
├──────────────────────────────┤
│ C - Create  (作成)           │
│ R - Read    (読取)           │
│ U - Update  (更新)           │
│ D - Delete  (削除)           │
└──────────────────────────────┘
```

### 1. Create（作成）- 新しい連絡先を追加

新しい連絡先を追加する機能です。

```javascript
// 連絡先を追加する関数
function addContact(name, email, phone, address, category) {
  // ステップ1: 新しいIDを生成（最大ID + 1）
  let newId = 1;  // デフォルトは1

  if (contacts.length > 0) {
    // 既存の連絡先がある場合、最大IDを探す
    let maxId = 0;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id > maxId) {
        maxId = contacts[i].id;
      }
    }
    newId = maxId + 1;
  }

  // ステップ2: 新しい連絡先オブジェクトを作成
  let newContact = {
    id: newId,
    name: name,
    email: email,
    phone: phone,
    address: address,
    category: category
  };

  // ステップ3: 配列に追加
  contacts.push(newContact);

  // ステップ4: 作成した連絡先を返す
  return newContact;
}

// 使用例
let result = addContact("田中一郎", "tanaka@example.com",
                       "070-1111-2222", "福岡県福岡市", "友人");
console.log("追加しました:", result);
```

**実行の流れ**：

```
初期状態: contacts = [
  { id: 1, name: "山田太郎", ... },
  { id: 2, name: "佐藤花子", ... }
]
最大ID = 2

↓ addContact("田中一郎", ...) を呼び出し

ステップ1: 最大IDを探す
  maxId = 0
  i=0: contacts[0].id (1) > 0 → maxId = 1
  i=1: contacts[1].id (2) > 1 → maxId = 2
  newId = 2 + 1 = 3

ステップ2: 新しいオブジェクトを作成
  newContact = {
    id: 3,
    name: "田中一郎",
    email: "tanaka@example.com",
    phone: "070-1111-2222",
    address: "福岡県福岡市",
    category: "友人"
  }

ステップ3: 配列に追加
  contacts.push(newContact)

結果: contacts = [
  { id: 1, name: "山田太郎", ... },
  { id: 2, name: "佐藤花子", ... },
  { id: 3, name: "田中一郎", ... }  ← 追加された！
]
```

### 2. Read（読取）- 連絡先の情報を取得

#### 全ての連絡先を表示

```javascript
// 全ての連絡先をHTML形式で表示
function displayAllContacts() {
  let html = "";

  // 全ての連絡先をループ
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];

    // カード形式のHTMLを作成
    html += '<div class="contact-card">';
    html += '<h3>' + contact.name + '</h3>';
    html += '<p>📧 Email: ' + contact.email + '</p>';
    html += '<p>📞 電話: ' + contact.phone + '</p>';
    html += '<p>🏠 住所: ' + contact.address + '</p>';
    html += '<p>🏷️ カテゴリ: ' + contact.category + '</p>';
    html += '<button onclick="editContact(' + contact.id + ')">編集</button>';
    html += '<button onclick="confirmDelete(' + contact.id + ')">削除</button>';
    html += '</div>';
  }

  // HTMLを画面に表示
  document.getElementById('contactList').innerHTML = html;
}
```

#### IDで特定の連絡先を取得

```javascript
// IDで特定の連絡先を取得
function getContactById(id) {
  // 全ての連絡先をループして探す
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      return contacts[i];  // 見つかったら返す
    }
  }
  return null;  // 見つからない場合はnullを返す
}

// 使用例
let contact = getContactById(1);
if (contact) {
  console.log("見つかりました:", contact.name);
} else {
  console.log("見つかりませんでした");
}
```

**実行の流れ**：

```
contacts = [
  { id: 1, name: "山田太郎", ... },
  { id: 2, name: "佐藤花子", ... },
  { id: 3, name: "田中一郎", ... }
]

↓ getContactById(2) を呼び出し

i=0: contacts[0].id (1) === 2 ? → false、次へ
i=1: contacts[1].id (2) === 2 ? → true、見つかった！
→ return contacts[1]

結果: { id: 2, name: "佐藤花子", ... }
```

### 3. Update（更新）- 既存の連絡先を編集

```javascript
// 連絡先を更新する関数
function updateContact(id, name, email, phone, address, category) {
  // IDで連絡先を探す
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      // 見つかったら情報を更新
      contacts[i].name = name;
      contacts[i].email = email;
      contacts[i].phone = phone;
      contacts[i].address = address;
      contacts[i].category = category;
      return true;  // 更新成功
    }
  }
  return false;  // 見つからなかった
}

// 使用例
let success = updateContact(1, "山田太郎", "newemail@example.com",
                           "090-0000-0000", "東京都新宿区", "友人");
if (success) {
  console.log("更新しました");
} else {
  console.log("更新失敗：連絡先が見つかりませんでした");
}
```

**実行の流れ**：

```
更新前: contacts[0] = {
  id: 1,
  name: "山田太郎",
  email: "yamada@example.com",
  phone: "090-1234-5678",
  address: "東京都渋谷区",
  category: "友人"
}

↓ updateContact(1, "山田太郎", "newemail@example.com", ...) を呼び出し

i=0: contacts[0].id (1) === 1 ? → true、見つかった！
  contacts[0].name = "山田太郎"  (変更なし)
  contacts[0].email = "newemail@example.com"  (変更！)
  contacts[0].phone = "090-0000-0000"  (変更！)
  contacts[0].address = "東京都新宿区"  (変更！)
  contacts[0].category = "友人"  (変更なし)
  return true

更新後: contacts[0] = {
  id: 1,
  name: "山田太郎",
  email: "newemail@example.com",  ← 変更された
  phone: "090-0000-0000",         ← 変更された
  address: "東京都新宿区",        ← 変更された
  category: "友人"
}
```

### 4. Delete（削除）- 連絡先を削除

```javascript
// 連絡先を削除する関数
function deleteContact(id) {
  // 削除する連絡先のインデックスを探す
  let indexToDelete = -1;  // -1は「見つかっていない」を意味

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      indexToDelete = i;  // 見つかった位置を記録
      break;  // 見つかったらループを抜ける
    }
  }

  // 見つかったら削除
  if (indexToDelete !== -1) {
    contacts.splice(indexToDelete, 1);  // 配列から削除
    return true;  // 削除成功
  }

  return false;  // 見つからなかった
}

// 使用例
let success = deleteContact(2);
if (success) {
  console.log("削除しました");
} else {
  console.log("削除失敗：連絡先が見つかりませんでした");
}
```

**実行の流れ**：

```
削除前: contacts = [
  { id: 1, name: "山田太郎", ... },
  { id: 2, name: "佐藤花子", ... },  ← これを削除したい
  { id: 3, name: "田中一郎", ... }
]

↓ deleteContact(2) を呼び出し

ステップ1: IDを探す
  indexToDelete = -1
  i=0: contacts[0].id (1) === 2 ? → false
  i=1: contacts[1].id (2) === 2 ? → true!
    indexToDelete = 1
    break

ステップ2: 削除実行
  indexToDelete (1) !== -1 ? → true
  contacts.splice(1, 1)  ← インデックス1の要素を1個削除

削除後: contacts = [
  { id: 1, name: "山田太郎", ... },
  { id: 3, name: "田中一郎", ... }  ← ID2が消えた
]
```

### CRUD操作の図解

```
初期データ: [A, B, C]

CREATE (追加)
  [A, B, C] + D → [A, B, C, D]

READ (読取)
  [A, B, C, D] → Bを読取 → B

UPDATE (更新)
  [A, B, C, D] → Bを更新 → [A, B', C, D]

DELETE (削除)
  [A, B', C, D] → Cを削除 → [A, B', D]
```

---

## 🔍 検索機能の実装

### 1. 名前で検索

```javascript
// 名前にキーワードを含む連絡先を検索
function searchByName(keyword) {
  let results = [];  // 検索結果を格納する配列

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];

    // 名前にキーワードが含まれているかチェック
    if (contact.name.indexOf(keyword) !== -1) {
      results.push(contact);  // 見つかったら結果に追加
    }
  }

  return results;
}

// 使用例
let found = searchByName("山田");
console.log("検索結果:", found);  // 名前に"山田"を含む連絡先
```

**実行の流れ**：

```
contacts = [
  { id: 1, name: "山田太郎", ... },
  { id: 2, name: "佐藤花子", ... },
  { id: 3, name: "山田次郎", ... }
]

↓ searchByName("山田") を呼び出し

results = []

i=0: "山田太郎".indexOf("山田") → 0 (見つかった!)
  results.push(contacts[0])
  results = [{ id: 1, name: "山田太郎", ... }]

i=1: "佐藤花子".indexOf("山田") → -1 (見つからない)
  何もしない

i=2: "山田次郎".indexOf("山田") → 0 (見つかった!)
  results.push(contacts[2])
  results = [
    { id: 1, name: "山田太郎", ... },
    { id: 3, name: "山田次郎", ... }
  ]

結果: 2件見つかりました
```

### 2. カテゴリでフィルタリング

```javascript
// 特定のカテゴリの連絡先だけを抽出
function filterByCategory(category) {
  let results = [];

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].category === category) {
      results.push(contacts[i]);
    }
  }

  return results;
}

// 使用例
let friends = filterByCategory("友人");
console.log("友人:", friends);

let work = filterByCategory("仕事");
console.log("仕事:", work);
```

### 3. 複合検索（名前とカテゴリの両方）

```javascript
// 複数の条件で検索
function searchContacts(keyword, category) {
  let results = [];

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let matchesKeyword = true;   // キーワード条件を満たすか
    let matchesCategory = true;  // カテゴリ条件を満たすか

    // キーワードが指定されている場合
    if (keyword && keyword !== "") {
      // 名前またはメールにキーワードが含まれるかチェック
      matchesKeyword = contact.name.indexOf(keyword) !== -1 ||
                       contact.email.indexOf(keyword) !== -1;
    }

    // カテゴリが指定されている場合
    if (category && category !== "全て") {
      matchesCategory = contact.category === category;
    }

    // 両方の条件を満たす場合のみ追加
    if (matchesKeyword && matchesCategory) {
      results.push(contact);
    }
  }

  return results;
}

// 使用例
let results = searchContacts("山田", "友人");
// → 名前に"山田"を含み、かつカテゴリが"友人"の連絡先
```

**実行の流れ**：

```
contacts = [
  { id: 1, name: "山田太郎", email: "yamada@...", category: "友人" },
  { id: 2, name: "佐藤花子", email: "sato@...", category: "仕事" },
  { id: 3, name: "山田次郎", email: "jiro@...", category: "家族" }
]

↓ searchContacts("山田", "友人") を呼び出し

i=0: 山田太郎
  matchesKeyword: "山田太郎".indexOf("山田") !== -1 → true
  matchesCategory: "友人" === "友人" → true
  両方true → 追加！

i=1: 佐藤花子
  matchesKeyword: "佐藤花子".indexOf("山田") !== -1 → false
  → 追加しない

i=2: 山田次郎
  matchesKeyword: "山田次郎".indexOf("山田") !== -1 → true
  matchesCategory: "家族" === "友人" → false
  → 追加しない

結果: [{ id: 1, name: "山田太郎", ... }]
```

---

## 💾 データの永続化（localStorage）

### 保存と読み込み

```javascript
// データをlocalStorageに保存
function saveContacts() {
  // オブジェクトの配列をJSON文字列に変換
  let jsonString = JSON.stringify(contacts);

  // localStorageに保存
  localStorage.setItem("contacts", jsonString);

  console.log("連絡先を保存しました");
}

// データをlocalStorageから読み込み
function loadContacts() {
  // localStorageから取得
  let jsonString = localStorage.getItem("contacts");

  if (jsonString) {
    // JSON文字列をオブジェクトの配列に変換
    contacts = JSON.parse(jsonString);
    console.log("連絡先を読み込みました: " + contacts.length + "件");
  } else {
    console.log("保存されたデータはありません");
  }
}

// ページ読み込み時にデータを復元
window.onload = function() {
  loadContacts();           // データを読み込み
  displayAllContacts();     // 画面に表示
};
```

**データの流れ**：

```
保存時:
  JavaScriptオブジェクト → JSON文字列 → localStorage

  contacts = [            JSON.stringify()      localStorage
    { id: 1, ... },    ─────────────────→    '[{"id":1,...}]'
    { id: 2, ... }
  ]

読み込み時:
  localStorage → JSON文字列 → JavaScriptオブジェクト

  localStorage           JSON.parse()         contacts = [
    '[{"id":1,...}]'  ─────────────────→      { id: 1, ... },
                                                { id: 2, ... }
                                              ]
```

---

## 🎨 UIとの連携

### 入力フォームから追加

```javascript
function handleAddContact() {
  // ステップ1: 入力値を取得
  let name = document.getElementById("nameInput").value;
  let email = document.getElementById("emailInput").value;
  let phone = document.getElementById("phoneInput").value;
  let address = document.getElementById("addressInput").value;
  let category = document.getElementById("categoryInput").value;

  // ステップ2: 入力チェック
  if (name === "") {
    alert("名前を入力してください");
    return;  // 処理を中断
  }

  // ステップ3: 連絡先を追加
  addContact(name, email, phone, address, category);

  // ステップ4: localStorageに保存
  saveContacts();

  // ステップ5: 画面表示を更新
  displayAllContacts();

  // ステップ6: 入力欄をクリア
  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("phoneInput").value = "";
  document.getElementById("addressInput").value = "";

  alert("連絡先を追加しました");
}
```

### 検索機能との連携

```javascript
function handleSearch() {
  // ステップ1: 検索条件を取得
  let keyword = document.getElementById("searchInput").value;
  let category = document.getElementById("filterCategory").value;

  // ステップ2: 検索実行
  let results = searchContacts(keyword, category);

  // ステップ3: 検索結果を表示
  displaySearchResults(results);

  // ステップ4: 件数を表示
  document.getElementById("resultCount").textContent =
    results.length + "件見つかりました";
}

function displaySearchResults(results) {
  let html = "";

  if (results.length === 0) {
    html = '<p class="no-results">該当する連絡先が見つかりませんでした。</p>';
  } else {
    for (let i = 0; i < results.length; i++) {
      let contact = results[i];
      html += '<div class="contact-card">';
      html += '<h3>' + contact.name + '</h3>';
      html += '<p>📧 ' + contact.email + '</p>';
      html += '<p>📞 ' + contact.phone + '</p>';
      html += '<p>🏷️ ' + contact.category + '</p>';
      html += '<button onclick="editContact(' + contact.id + ')">編集</button>';
      html += '<button onclick="confirmDelete(' + contact.id + ')">削除</button>';
      html += '</div>';
    }
  }

  document.getElementById('contactList').innerHTML = html;
}
```

---

## 🔧 その他の便利機能

### 統計情報の表示

```javascript
// カテゴリ別の統計情報を取得
function getStatistics() {
  let stats = {
    total: contacts.length,  // 総件数
    byCategory: {}           // カテゴリ別の件数
  };

  // カテゴリ別に集計
  for (let i = 0; i < contacts.length; i++) {
    let category = contacts[i].category;

    if (stats.byCategory[category]) {
      // 既にカウント済みの場合、+1
      stats.byCategory[category] = stats.byCategory[category] + 1;
    } else {
      // 初めて出現した場合、1を設定
      stats.byCategory[category] = 1;
    }
  }

  return stats;
}

// 使用例
let stats = getStatistics();
console.log("総連絡先数: " + stats.total);
console.log("カテゴリ別:");
for (let category in stats.byCategory) {
  console.log("  " + category + ": " + stats.byCategory[category] + "件");
}
```

**実行の流れ**：

```
contacts = [
  { category: "友人" },
  { category: "仕事" },
  { category: "友人" },
  { category: "家族" },
  { category: "友人" }
]

↓ getStatistics() を呼び出し

stats = { total: 5, byCategory: {} }

i=0: category = "友人"
  stats.byCategory["友人"] は未定義 → stats.byCategory["友人"] = 1

i=1: category = "仕事"
  stats.byCategory["仕事"] は未定義 → stats.byCategory["仕事"] = 1

i=2: category = "友人"
  stats.byCategory["友人"] は 1 → stats.byCategory["友人"] = 1 + 1 = 2

i=3: category = "家族"
  stats.byCategory["家族"] は未定義 → stats.byCategory["家族"] = 1

i=4: category = "友人"
  stats.byCategory["友人"] は 2 → stats.byCategory["友人"] = 2 + 1 = 3

結果: {
  total: 5,
  byCategory: {
    "友人": 3,
    "仕事": 1,
    "家族": 1
  }
}
```

---

## 💡 実践アプリケーション

### アプリケーション1: 基本的な住所録アプリ

CRUD操作の基本を実装した住所録アプリです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>住所録アプリ - 基本版</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }

    .header h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .add-section {
      padding: 30px;
      background: #f8f9fa;
      border-bottom: 2px solid #e9ecef;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-size: 14px;
      color: #495057;
      margin-bottom: 5px;
      font-weight: 500;
    }

    .form-group input,
    .form-group select {
      padding: 12px;
      border: 2px solid #dee2e6;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .add-btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .add-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .list-section {
      padding: 30px;
    }

    .contact-card {
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 15px;
      transition: all 0.3s;
    }

    .contact-card:hover {
      border-color: #667eea;
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
      transform: translateY(-2px);
    }

    .contact-card h3 {
      color: #667eea;
      margin-bottom: 10px;
      font-size: 20px;
    }

    .contact-card p {
      color: #6c757d;
      margin: 5px 0;
      font-size: 14px;
    }

    .contact-buttons {
      margin-top: 15px;
      display: flex;
      gap: 10px;
    }

    .edit-btn,
    .delete-btn {
      padding: 8px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 500;
    }

    .edit-btn {
      background: #28a745;
      color: white;
    }

    .edit-btn:hover {
      background: #218838;
    }

    .delete-btn {
      background: #dc3545;
      color: white;
    }

    .delete-btn:hover {
      background: #c82333;
    }

    .stats {
      background: #e7f3ff;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      text-align: center;
      color: #004085;
      font-weight: 500;
    }

    .no-contacts {
      text-align: center;
      padding: 40px;
      color: #6c757d;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📇 住所録アプリ</h1>
      <p>連絡先を簡単に管理</p>
    </div>

    <div class="add-section">
      <h2 style="margin-bottom: 20px; color: #495057;">➕ 新規連絡先を追加</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>名前 *</label>
          <input type="text" id="nameInput" placeholder="山田太郎">
        </div>
        <div class="form-group">
          <label>メールアドレス</label>
          <input type="email" id="emailInput" placeholder="yamada@example.com">
        </div>
        <div class="form-group">
          <label>電話番号</label>
          <input type="tel" id="phoneInput" placeholder="090-1234-5678">
        </div>
        <div class="form-group">
          <label>カテゴリ</label>
          <select id="categoryInput">
            <option value="友人">友人</option>
            <option value="仕事">仕事</option>
            <option value="家族">家族</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div class="form-group" style="grid-column: 1 / -1;">
          <label>住所</label>
          <input type="text" id="addressInput" placeholder="東京都渋谷区...">
        </div>
      </div>
      <button class="add-btn" onclick="handleAddContact()">連絡先を追加</button>
    </div>

    <div class="list-section">
      <div class="stats" id="stats">登録件数: 0件</div>
      <div id="contactList" class="no-contacts">連絡先がまだありません。上のフォームから追加してください。</div>
    </div>
  </div>

  <script>
    // グローバル変数: 連絡先データ
    let contacts = [];

    // 連絡先を追加
    function addContact(name, email, phone, address, category) {
      let newId = 1;
      if (contacts.length > 0) {
        let maxId = 0;
        for (let i = 0; i < contacts.length; i++) {
          if (contacts[i].id > maxId) {
            maxId = contacts[i].id;
          }
        }
        newId = maxId + 1;
      }

      let newContact = {
        id: newId,
        name: name,
        email: email,
        phone: phone,
        address: address,
        category: category
      };

      contacts.push(newContact);
      return newContact;
    }

    // 全ての連絡先を表示
    function displayAllContacts() {
      let html = "";

      if (contacts.length === 0) {
        html = '<div class="no-contacts">連絡先がまだありません。上のフォームから追加してください。</div>';
      } else {
        for (let i = 0; i < contacts.length; i++) {
          let contact = contacts[i];
          html += '<div class="contact-card">';
          html += '<h3>' + contact.name + '</h3>';
          html += '<p>📧 Email: ' + contact.email + '</p>';
          html += '<p>📞 電話: ' + contact.phone + '</p>';
          html += '<p>🏠 住所: ' + contact.address + '</p>';
          html += '<p>🏷️ カテゴリ: ' + contact.category + '</p>';
          html += '<div class="contact-buttons">';
          html += '<button class="edit-btn" onclick="editContact(' + contact.id + ')">編集</button>';
          html += '<button class="delete-btn" onclick="confirmDelete(' + contact.id + ')">削除</button>';
          html += '</div>';
          html += '</div>';
        }
      }

      document.getElementById('contactList').innerHTML = html;
      updateStats();
    }

    // 統計情報を更新
    function updateStats() {
      document.getElementById('stats').textContent = '登録件数: ' + contacts.length + '件';
    }

    // IDで連絡先を取得
    function getContactById(id) {
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
          return contacts[i];
        }
      }
      return null;
    }

    // 連絡先を更新
    function updateContact(id, name, email, phone, address, category) {
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
          contacts[i].name = name;
          contacts[i].email = email;
          contacts[i].phone = phone;
          contacts[i].address = address;
          contacts[i].category = category;
          return true;
        }
      }
      return false;
    }

    // 連絡先を削除
    function deleteContact(id) {
      let indexToDelete = -1;
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
          indexToDelete = i;
          break;
        }
      }

      if (indexToDelete !== -1) {
        contacts.splice(indexToDelete, 1);
        return true;
      }
      return false;
    }

    // localStorageに保存
    function saveContacts() {
      let jsonString = JSON.stringify(contacts);
      localStorage.setItem("contacts", jsonString);
    }

    // localStorageから読み込み
    function loadContacts() {
      let jsonString = localStorage.getItem("contacts");
      if (jsonString) {
        contacts = JSON.parse(jsonString);
      }
    }

    // 追加ボタンのハンドラ
    function handleAddContact() {
      let name = document.getElementById("nameInput").value;
      let email = document.getElementById("emailInput").value;
      let phone = document.getElementById("phoneInput").value;
      let address = document.getElementById("addressInput").value;
      let category = document.getElementById("categoryInput").value;

      if (name === "") {
        alert("❌ 名前を入力してください");
        return;
      }

      addContact(name, email, phone, address, category);
      saveContacts();
      displayAllContacts();

      document.getElementById("nameInput").value = "";
      document.getElementById("emailInput").value = "";
      document.getElementById("phoneInput").value = "";
      document.getElementById("addressInput").value = "";

      alert("✅ 連絡先を追加しました: " + name);
    }

    // 編集機能
    function editContact(id) {
      let contact = getContactById(id);
      if (!contact) return;

      let name = prompt("名前:", contact.name);
      if (name === null) return;

      let email = prompt("メールアドレス:", contact.email);
      if (email === null) return;

      let phone = prompt("電話番号:", contact.phone);
      if (phone === null) return;

      let address = prompt("住所:", contact.address);
      if (address === null) return;

      updateContact(id, name, email, phone, address, contact.category);
      saveContacts();
      displayAllContacts();
      alert("✅ 更新しました");
    }

    // 削除確認
    function confirmDelete(id) {
      let contact = getContactById(id);
      if (!contact) return;

      if (confirm("「" + contact.name + "」を削除しますか?")) {
        deleteContact(id);
        saveContacts();
        displayAllContacts();
        alert("✅ 削除しました");
      }
    }

    // ページ読み込み時
    window.onload = function() {
      loadContacts();
      displayAllContacts();
    };
  </script>
</body>
</html>
```

### アプリケーション2: 検索機能付き住所録アプリ

名前とカテゴリで検索できる高機能版です。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>住所録アプリ - 検索機能付き</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }

    .header h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .search-section {
      padding: 30px;
      background: #fff3e0;
      border-bottom: 2px solid #ffe0b2;
    }

    .search-grid {
      display: grid;
      grid-template-columns: 2fr 1fr auto;
      gap: 15px;
      align-items: end;
    }

    .search-group {
      display: flex;
      flex-direction: column;
    }

    .search-group label {
      font-size: 14px;
      color: #495057;
      margin-bottom: 5px;
      font-weight: 500;
    }

    .search-group input,
    .search-group select {
      padding: 12px;
      border: 2px solid #ffe0b2;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s;
    }

    .search-group input:focus,
    .search-group select:focus {
      outline: none;
      border-color: #f5576c;
      box-shadow: 0 0 0 3px rgba(245, 87, 108, 0.1);
    }

    .search-btn {
      padding: 12px 30px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .search-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(245, 87, 108, 0.4);
    }

    .result-count {
      margin-top: 15px;
      padding: 10px;
      background: white;
      border-radius: 8px;
      text-align: center;
      font-weight: 500;
      color: #f5576c;
    }

    .add-section {
      padding: 30px;
      background: #f8f9fa;
      border-bottom: 2px solid #e9ecef;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-size: 14px;
      color: #495057;
      margin-bottom: 5px;
      font-weight: 500;
    }

    .form-group input,
    .form-group select {
      padding: 12px;
      border: 2px solid #dee2e6;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #f5576c;
      box-shadow: 0 0 0 3px rgba(245, 87, 108, 0.1);
    }

    .add-btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .add-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(245, 87, 108, 0.4);
    }

    .list-section {
      padding: 30px;
    }

    .contact-card {
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 15px;
      transition: all 0.3s;
    }

    .contact-card:hover {
      border-color: #f5576c;
      box-shadow: 0 5px 15px rgba(245, 87, 108, 0.1);
      transform: translateY(-2px);
    }

    .contact-card h3 {
      color: #f5576c;
      margin-bottom: 10px;
      font-size: 20px;
    }

    .contact-card p {
      color: #6c757d;
      margin: 5px 0;
      font-size: 14px;
    }

    .contact-buttons {
      margin-top: 15px;
      display: flex;
      gap: 10px;
    }

    .edit-btn,
    .delete-btn {
      padding: 8px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 500;
    }

    .edit-btn {
      background: #28a745;
      color: white;
    }

    .edit-btn:hover {
      background: #218838;
    }

    .delete-btn {
      background: #dc3545;
      color: white;
    }

    .delete-btn:hover {
      background: #c82333;
    }

    .no-results {
      text-align: center;
      padding: 40px;
      color: #6c757d;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔍 住所録アプリ（検索機能付き）</h1>
      <p>名前とカテゴリで簡単検索</p>
    </div>

    <div class="search-section">
      <h2 style="margin-bottom: 20px; color: #495057;">🔎 連絡先を検索</h2>
      <div class="search-grid">
        <div class="search-group">
          <label>キーワード（名前またはメール）</label>
          <input type="text" id="searchInput" placeholder="山田、yamada など">
        </div>
        <div class="search-group">
          <label>カテゴリで絞り込み</label>
          <select id="filterCategory">
            <option value="全て">全て</option>
            <option value="友人">友人</option>
            <option value="仕事">仕事</option>
            <option value="家族">家族</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <button class="search-btn" onclick="handleSearch()">検索</button>
      </div>
      <div class="result-count" id="resultCount">全ての連絡先を表示中</div>
    </div>

    <div class="add-section">
      <h2 style="margin-bottom: 20px; color: #495057;">➕ 新規連絡先を追加</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>名前 *</label>
          <input type="text" id="nameInput" placeholder="山田太郎">
        </div>
        <div class="form-group">
          <label>メールアドレス</label>
          <input type="email" id="emailInput" placeholder="yamada@example.com">
        </div>
        <div class="form-group">
          <label>電話番号</label>
          <input type="tel" id="phoneInput" placeholder="090-1234-5678">
        </div>
        <div class="form-group">
          <label>カテゴリ</label>
          <select id="categoryInput">
            <option value="友人">友人</option>
            <option value="仕事">仕事</option>
            <option value="家族">家族</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div class="form-group" style="grid-column: 1 / -1;">
          <label>住所</label>
          <input type="text" id="addressInput" placeholder="東京都渋谷区...">
        </div>
      </div>
      <button class="add-btn" onclick="handleAddContact()">連絡先を追加</button>
    </div>

    <div class="list-section">
      <div id="contactList"></div>
    </div>
  </div>

  <script>
    let contacts = [];

    function addContact(name, email, phone, address, category) {
      let newId = 1;
      if (contacts.length > 0) {
        let maxId = 0;
        for (let i = 0; i < contacts.length; i++) {
          if (contacts[i].id > maxId) {
            maxId = contacts[i].id;
          }
        }
        newId = maxId + 1;
      }

      let newContact = {
        id: newId,
        name: name,
        email: email,
        phone: phone,
        address: address,
        category: category
      };

      contacts.push(newContact);
      return newContact;
    }

    function getContactById(id) {
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
          return contacts[i];
        }
      }
      return null;
    }

    function updateContact(id, name, email, phone, address, category) {
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
          contacts[i].name = name;
          contacts[i].email = email;
          contacts[i].phone = phone;
          contacts[i].address = address;
          contacts[i].category = category;
          return true;
        }
      }
      return false;
    }

    function deleteContact(id) {
      let indexToDelete = -1;
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
          indexToDelete = i;
          break;
        }
      }

      if (indexToDelete !== -1) {
        contacts.splice(indexToDelete, 1);
        return true;
      }
      return false;
    }

    // 複合検索機能
    function searchContacts(keyword, category) {
      let results = [];

      for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let matchesKeyword = true;
        let matchesCategory = true;

        if (keyword && keyword !== "") {
          matchesKeyword = contact.name.indexOf(keyword) !== -1 ||
                           contact.email.indexOf(keyword) !== -1;
        }

        if (category && category !== "全て") {
          matchesCategory = contact.category === category;
        }

        if (matchesKeyword && matchesCategory) {
          results.push(contact);
        }
      }

      return results;
    }

    function displaySearchResults(results) {
      let html = "";

      if (results.length === 0) {
        html = '<div class="no-results">❌ 該当する連絡先が見つかりませんでした。</div>';
      } else {
        for (let i = 0; i < results.length; i++) {
          let contact = results[i];
          html += '<div class="contact-card">';
          html += '<h3>' + contact.name + '</h3>';
          html += '<p>📧 Email: ' + contact.email + '</p>';
          html += '<p>📞 電話: ' + contact.phone + '</p>';
          html += '<p>🏠 住所: ' + contact.address + '</p>';
          html += '<p>🏷️ カテゴリ: ' + contact.category + '</p>';
          html += '<div class="contact-buttons">';
          html += '<button class="edit-btn" onclick="editContact(' + contact.id + ')">編集</button>';
          html += '<button class="delete-btn" onclick="confirmDelete(' + contact.id + ')">削除</button>';
          html += '</div>';
          html += '</div>';
        }
      }

      document.getElementById('contactList').innerHTML = html;
    }

    function handleSearch() {
      let keyword = document.getElementById("searchInput").value;
      let category = document.getElementById("filterCategory").value;

      let results = searchContacts(keyword, category);
      displaySearchResults(results);

      if (keyword === "" && category === "全て") {
        document.getElementById("resultCount").textContent = "全ての連絡先を表示中";
      } else {
        document.getElementById("resultCount").textContent =
          "✅ " + results.length + "件見つかりました";
      }
    }

    function saveContacts() {
      let jsonString = JSON.stringify(contacts);
      localStorage.setItem("contacts_search", jsonString);
    }

    function loadContacts() {
      let jsonString = localStorage.getItem("contacts_search");
      if (jsonString) {
        contacts = JSON.parse(jsonString);
      }
    }

    function handleAddContact() {
      let name = document.getElementById("nameInput").value;
      let email = document.getElementById("emailInput").value;
      let phone = document.getElementById("phoneInput").value;
      let address = document.getElementById("addressInput").value;
      let category = document.getElementById("categoryInput").value;

      if (name === "") {
        alert("❌ 名前を入力してください");
        return;
      }

      addContact(name, email, phone, address, category);
      saveContacts();
      handleSearch();

      document.getElementById("nameInput").value = "";
      document.getElementById("emailInput").value = "";
      document.getElementById("phoneInput").value = "";
      document.getElementById("addressInput").value = "";
      document.getElementById("searchInput").value = "";
      document.getElementById("filterCategory").value = "全て";

      alert("✅ 連絡先を追加しました: " + name);
    }

    function editContact(id) {
      let contact = getContactById(id);
      if (!contact) return;

      let name = prompt("名前:", contact.name);
      if (name === null) return;

      let email = prompt("メールアドレス:", contact.email);
      if (email === null) return;

      let phone = prompt("電話番号:", contact.phone);
      if (phone === null) return;

      let address = prompt("住所:", contact.address);
      if (address === null) return;

      updateContact(id, name, email, phone, address, contact.category);
      saveContacts();
      handleSearch();
      alert("✅ 更新しました");
    }

    function confirmDelete(id) {
      let contact = getContactById(id);
      if (!contact) return;

      if (confirm("「" + contact.name + "」を削除しますか?")) {
        deleteContact(id);
        saveContacts();
        handleSearch();
        alert("✅ 削除しました");
      }
    }

    window.onload = function() {
      loadContacts();
      handleSearch();
    };
  </script>
</body>
</html>
```

### アプリケーション3: 統計機能付き住所録アプリ

カテゴリ別の統計情報も表示する完全版です。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>住所録アプリ - 統計機能付き</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      color: #2c3e50;
      padding: 30px;
      text-align: center;
    }

    .header h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .stats-section {
      padding: 30px;
      background: #e8f5e9;
      border-bottom: 2px solid #c8e6c9;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      border: 2px solid #a5d6a7;
      transition: all 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
    }

    .stat-number {
      font-size: 36px;
      font-weight: bold;
      color: #4caf50;
      margin-bottom: 5px;
    }

    .stat-label {
      font-size: 14px;
      color: #6c757d;
    }

    .add-section {
      padding: 30px;
      background: #f8f9fa;
      border-bottom: 2px solid #e9ecef;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-size: 14px;
      color: #495057;
      margin-bottom: 5px;
      font-weight: 500;
    }

    .form-group input,
    .form-group select {
      padding: 12px;
      border: 2px solid #dee2e6;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #4caf50;
      box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }

    .add-btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #66bb6a 0%, #43a047 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .add-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
    }

    .search-section {
      padding: 20px 30px;
      background: #fff3e0;
      border-bottom: 2px solid #ffe0b2;
    }

    .search-grid {
      display: grid;
      grid-template-columns: 2fr 1fr auto;
      gap: 15px;
      align-items: end;
    }

    .search-group input,
    .search-group select {
      padding: 12px;
      border: 2px solid #ffe0b2;
      border-radius: 8px;
      font-size: 14px;
      width: 100%;
    }

    .search-btn {
      padding: 12px 30px;
      background: #ff9800;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }

    .list-section {
      padding: 30px;
    }

    .contact-card {
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 15px;
      transition: all 0.3s;
    }

    .contact-card:hover {
      border-color: #4caf50;
      box-shadow: 0 5px 15px rgba(76, 175, 80, 0.1);
      transform: translateY(-2px);
    }

    .contact-card h3 {
      color: #4caf50;
      margin-bottom: 10px;
      font-size: 20px;
    }

    .contact-card p {
      color: #6c757d;
      margin: 5px 0;
      font-size: 14px;
    }

    .contact-buttons {
      margin-top: 15px;
      display: flex;
      gap: 10px;
    }

    .edit-btn,
    .delete-btn {
      padding: 8px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 500;
    }

    .edit-btn {
      background: #2196f3;
      color: white;
    }

    .edit-btn:hover {
      background: #1976d2;
    }

    .delete-btn {
      background: #f44336;
      color: white;
    }

    .delete-btn:hover {
      background: #d32f2f;
    }

    .no-contacts {
      text-align: center;
      padding: 40px;
      color: #6c757d;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 住所録アプリ（統計機能付き）</h1>
      <p>カテゴリ別の統計情報も確認できます</p>
    </div>

    <div class="stats-section">
      <h2 style="margin-bottom: 20px; color: #495057; text-align: center;">📈 統計情報</h2>
      <div class="stats-grid" id="statsGrid"></div>
    </div>

    <div class="add-section">
      <h2 style="margin-bottom: 20px; color: #495057;">➕ 新規連絡先を追加</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>名前 *</label>
          <input type="text" id="nameInput" placeholder="山田太郎">
        </div>
        <div class="form-group">
          <label>メールアドレス</label>
          <input type="email" id="emailInput" placeholder="yamada@example.com">
        </div>
        <div class="form-group">
          <label>電話番号</label>
          <input type="tel" id="phoneInput" placeholder="090-1234-5678">
        </div>
        <div class="form-group">
          <label>カテゴリ</label>
          <select id="categoryInput">
            <option value="友人">友人</option>
            <option value="仕事">仕事</option>
            <option value="家族">家族</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div class="form-group" style="grid-column: 1 / -1;">
          <label>住所</label>
          <input type="text" id="addressInput" placeholder="東京都渋谷区...">
        </div>
      </div>
      <button class="add-btn" onclick="handleAddContact()">連絡先を追加</button>
    </div>

    <div class="search-section">
      <div class="search-grid">
        <div class="search-group">
          <input type="text" id="searchInput" placeholder="🔍 名前またはメールで検索...">
        </div>
        <div class="search-group">
          <select id="filterCategory">
            <option value="全て">全カテゴリ</option>
            <option value="友人">友人</option>
            <option value="仕事">仕事</option>
            <option value="家族">家族</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <button class="search-btn" onclick="handleSearch()">検索</button>
      </div>
    </div>

    <div class="list-section">
      <div id="contactList"></div>
    </div>
  </div>

  <script>
    let contacts = [];

    function addContact(name, email, phone, address, category) {
      let newId = 1;
      if (contacts.length > 0) {
        let maxId = 0;
        for (let i = 0; i < contacts.length; i++) {
          if (contacts[i].id > maxId) {
            maxId = contacts[i].id;
          }
        }
        newId = maxId + 1;
      }

      let newContact = {
        id: newId,
        name: name,
        email: email,
        phone: phone,
        address: address,
        category: category
      };

      contacts.push(newContact);
      return newContact;
    }

    function getContactById(id) {
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
          return contacts[i];
        }
      }
      return null;
    }

    function updateContact(id, name, email, phone, address, category) {
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
          contacts[i].name = name;
          contacts[i].email = email;
          contacts[i].phone = phone;
          contacts[i].address = address;
          contacts[i].category = category;
          return true;
        }
      }
      return false;
    }

    function deleteContact(id) {
      let indexToDelete = -1;
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
          indexToDelete = i;
          break;
        }
      }

      if (indexToDelete !== -1) {
        contacts.splice(indexToDelete, 1);
        return true;
      }
      return false;
    }

    function searchContacts(keyword, category) {
      let results = [];

      for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let matchesKeyword = true;
        let matchesCategory = true;

        if (keyword && keyword !== "") {
          matchesKeyword = contact.name.indexOf(keyword) !== -1 ||
                           contact.email.indexOf(keyword) !== -1;
        }

        if (category && category !== "全て") {
          matchesCategory = contact.category === category;
        }

        if (matchesKeyword && matchesCategory) {
          results.push(contact);
        }
      }

      return results;
    }

    // 統計情報を取得
    function getStatistics() {
      let stats = {
        total: contacts.length,
        byCategory: {}
      };

      for (let i = 0; i < contacts.length; i++) {
        let category = contacts[i].category;

        if (stats.byCategory[category]) {
          stats.byCategory[category] = stats.byCategory[category] + 1;
        } else {
          stats.byCategory[category] = 1;
        }
      }

      return stats;
    }

    // 統計情報を表示
    function displayStats() {
      let stats = getStatistics();
      let html = "";

      // 総件数カード
      html += '<div class="stat-card">';
      html += '<div class="stat-number">' + stats.total + '</div>';
      html += '<div class="stat-label">総連絡先数</div>';
      html += '</div>';

      // カテゴリ別カード
      let categories = ["友人", "仕事", "家族", "その他"];
      for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let count = stats.byCategory[category] || 0;

        html += '<div class="stat-card">';
        html += '<div class="stat-number">' + count + '</div>';
        html += '<div class="stat-label">' + category + '</div>';
        html += '</div>';
      }

      document.getElementById('statsGrid').innerHTML = html;
    }

    function displaySearchResults(results) {
      let html = "";

      if (results.length === 0) {
        html = '<div class="no-contacts">❌ 該当する連絡先が見つかりませんでした。</div>';
      } else {
        for (let i = 0; i < results.length; i++) {
          let contact = results[i];
          html += '<div class="contact-card">';
          html += '<h3>' + contact.name + '</h3>';
          html += '<p>📧 Email: ' + contact.email + '</p>';
          html += '<p>📞 電話: ' + contact.phone + '</p>';
          html += '<p>🏠 住所: ' + contact.address + '</p>';
          html += '<p>🏷️ カテゴリ: ' + contact.category + '</p>';
          html += '<div class="contact-buttons">';
          html += '<button class="edit-btn" onclick="editContact(' + contact.id + ')">編集</button>';
          html += '<button class="delete-btn" onclick="confirmDelete(' + contact.id + ')">削除</button>';
          html += '</div>';
          html += '</div>';
        }
      }

      document.getElementById('contactList').innerHTML = html;
    }

    function handleSearch() {
      let keyword = document.getElementById("searchInput").value;
      let category = document.getElementById("filterCategory").value;

      let results = searchContacts(keyword, category);
      displaySearchResults(results);
      displayStats();
    }

    function saveContacts() {
      let jsonString = JSON.stringify(contacts);
      localStorage.setItem("contacts_stats", jsonString);
    }

    function loadContacts() {
      let jsonString = localStorage.getItem("contacts_stats");
      if (jsonString) {
        contacts = JSON.parse(jsonString);
      }
    }

    function handleAddContact() {
      let name = document.getElementById("nameInput").value;
      let email = document.getElementById("emailInput").value;
      let phone = document.getElementById("phoneInput").value;
      let address = document.getElementById("addressInput").value;
      let category = document.getElementById("categoryInput").value;

      if (name === "") {
        alert("❌ 名前を入力してください");
        return;
      }

      addContact(name, email, phone, address, category);
      saveContacts();
      handleSearch();

      document.getElementById("nameInput").value = "";
      document.getElementById("emailInput").value = "";
      document.getElementById("phoneInput").value = "";
      document.getElementById("addressInput").value = "";

      alert("✅ 連絡先を追加しました: " + name);
    }

    function editContact(id) {
      let contact = getContactById(id);
      if (!contact) return;

      let name = prompt("名前:", contact.name);
      if (name === null) return;

      let email = prompt("メールアドレス:", contact.email);
      if (email === null) return;

      let phone = prompt("電話番号:", contact.phone);
      if (phone === null) return;

      let address = prompt("住所:", contact.address);
      if (address === null) return;

      updateContact(id, name, email, phone, address, contact.category);
      saveContacts();
      handleSearch();
      alert("✅ 更新しました");
    }

    function confirmDelete(id) {
      let contact = getContactById(id);
      if (!contact) return;

      if (confirm("「" + contact.name + "」を削除しますか?")) {
        deleteContact(id);
        saveContacts();
        handleSearch();
        alert("✅ 削除しました");
      }
    }

    window.onload = function() {
      loadContacts();
      handleSearch();
    };
  </script>
</body>
</html>
```

---

## ✅ カリキュラム仕様の確認

このレッスンは、curriculum.mdの以下の項目を満たしています：

### レッスン145：週のプロジェクト（30分）
- ✅ **住所録アプリ**: 連絡先の管理アプリを実装しました
- ✅ **CRUD操作**: Create（追加）、Read（読取）、Update（更新）、Delete（削除）の全操作を実装しました
- ✅ **検索機能**: 名前とカテゴリによる検索・フィルタリング機能を実装しました
- ✅ **オブジェクトベースのアプリ**: オブジェクトの配列でデータを管理し、実用的なアプリケーションを構築しました
- ✅ **成果物：住所録**: 3つの完全動作する住所録アプリを作成しました

---

## 📝 まとめ

このレッスンでは、これまでに学んだオブジェクトに関する知識を総合的に活用して、実用的な住所録アプリケーションを作成しました。

### 学んだこと

1. **CRUD操作の実装**
   - Create: `push()`で配列に追加
   - Read: ループで取得・表示
   - Update: IDで検索して更新
   - Delete: `splice()`で削除

2. **検索・フィルタリング機能**
   - 名前検索: `indexOf()`で部分一致を判定
   - カテゴリ検索: 完全一致で絞り込み
   - 複合検索: 複数の条件を組み合わせる

3. **データの永続化**
   - `JSON.stringify()`でオブジェクトをJSON文字列に変換
   - `localStorage.setItem()`で保存
   - `localStorage.getItem()`で読み込み
   - `JSON.parse()`でJSON文字列をオブジェクトに変換

4. **統計情報の取得**
   - カテゴリ別の集計
   - オブジェクトを使ったカウント

5. **実用的なアプリケーション開発**
   - データモデリング（どんな情報が必要か設計）
   - 関数の分割（機能ごとに関数を作成）
   - UIとデータの連携（画面とデータを同期）

### 重要なポイント

- オブジェクトの配列でデータを管理すると、複雑な情報も扱いやすい
- IDを使うことで、特定のデータを確実に識別できる
- CRUD操作は、ほとんどのアプリケーションで必要な基本機能
- localStorageを使えば、ブラウザを閉じてもデータが保存される
- 検索機能は、データが増えても目的の情報を素早く見つけられる

---

## 🚀 次のレッスンでは

次のレッスンでは、**第13章：配列とループの応用**に進みます。

配列の高度な操作や、複雑なループパターンについて学びます。

---

**作成日**: 2025-11-26
**トピック**: 週のプロジェクト - 住所録アプリ、CRUD操作、検索機能、オブジェクトベースのアプリ開発
