# レッスン145: 週のプロジェクト - 住所録アプリ

## 📋 このレッスンで学ぶこと

- 住所録アプリケーションの実装
- CRUD操作の統合的な実装
- 検索・フィルタリング機能
- オブジェクトベースのデータ管理
- localStorageでのデータ永続化
- これまでの知識の総合的な活用

---

## 🎯 住所録アプリとは

住所録アプリは、連絡先情報を管理するアプリケーションです。友人や知人の情報を保存・検索・編集・削除できます。

### 基本機能

```javascript
// 連絡先のデータ構造
let contacts = [
  {
    id: 1,
    name: "山田太郎",
    email: "yamada@example.com",
    phone: "090-1234-5678",
    address: "東京都渋谷区",
    category: "友人"
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

---

## 📚 1. CRUD操作の実装

### Create（作成）

新しい連絡先を追加する機能です。

```javascript
// 連絡先を追加する関数
function addContact(name, email, phone, address, category) {
  // 新しいIDを生成（最大ID + 1）
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

  // 新しい連絡先オブジェクトを作成
  let newContact = {
    id: newId,
    name: name,
    email: email,
    phone: phone,
    address: address,
    category: category
  };

  // 配列に追加
  contacts.push(newContact);

  return newContact;
}

// 使用例
addContact("田中一郎", "tanaka@example.com", "070-1111-2222", "福岡県福岡市", "友人");
```

### Read（読取）

連絡先の情報を取得・表示する機能です。

```javascript
// 全ての連絡先を表示
function displayAllContacts() {
  let html = "";

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    html += '<div class="contact-card">';
    html += '<h3>' + contact.name + '</h3>';
    html += '<p>Email: ' + contact.email + '</p>';
    html += '<p>電話: ' + contact.phone + '</p>';
    html += '<p>住所: ' + contact.address + '</p>';
    html += '<p>カテゴリ: ' + contact.category + '</p>';
    html += '</div>';
  }

  document.getElementById('contactList').innerHTML = html;
}

// IDで特定の連絡先を取得
function getContactById(id) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      return contacts[i];
    }
  }
  return null; // 見つからない場合
}
```

### Update（更新）

既存の連絡先情報を編集する機能です。

```javascript
// 連絡先を更新する関数
function updateContact(id, name, email, phone, address, category) {
  // IDで連絡先を探す
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      // 情報を更新
      contacts[i].name = name;
      contacts[i].email = email;
      contacts[i].phone = phone;
      contacts[i].address = address;
      contacts[i].category = category;
      return true; // 更新成功
    }
  }
  return false; // 見つからなかった
}

// 使用例
updateContact(1, "山田太郎", "newemail@example.com", "090-0000-0000", "東京都新宿区", "友人");
```

### Delete（削除）

連絡先を削除する機能です。

```javascript
// 連絡先を削除する関数
function deleteContact(id) {
  // 削除する連絡先のインデックスを探す
  let indexToDelete = -1;

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      indexToDelete = i;
      break;
    }
  }

  // 見つかったら削除
  if (indexToDelete !== -1) {
    contacts.splice(indexToDelete, 1);
    return true; // 削除成功
  }

  return false; // 見つからなかった
}

// 使用例
deleteContact(1); // ID 1の連絡先を削除
```

---

## 🔍 2. 検索機能

### 名前で検索

```javascript
function searchByName(keyword) {
  let results = [];

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    // 名前にキーワードが含まれているかチェック
    if (contact.name.indexOf(keyword) !== -1) {
      results.push(contact);
    }
  }

  return results;
}

// 使用例
let found = searchByName("山田");
console.log(found); // 名前に"山田"を含む連絡先
```

### カテゴリでフィルタリング

```javascript
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
let work = filterByCategory("仕事");
```

### 複合検索

```javascript
function searchContacts(keyword, category) {
  let results = [];

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let matchesKeyword = true;
    let matchesCategory = true;

    // キーワードが指定されている場合
    if (keyword && keyword !== "") {
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
```

---

## 💾 3. データの永続化

### localStorageへの保存

```javascript
// データを保存
function saveContacts() {
  let jsonString = JSON.stringify(contacts);
  localStorage.setItem("contacts", jsonString);
  console.log("連絡先を保存しました");
}

// データを読み込み
function loadContacts() {
  let jsonString = localStorage.getItem("contacts");

  if (jsonString) {
    contacts = JSON.parse(jsonString);
    console.log("連絡先を読み込みました: " + contacts.length + "件");
  } else {
    console.log("保存されたデータはありません");
  }
}

// ページ読み込み時にデータを復元
window.onload = function() {
  loadContacts();
  displayAllContacts();
};
```

---

## 🎨 4. UIとの連携

### 入力フォームから追加

```javascript
function handleAddContact() {
  // 入力値を取得
  let name = document.getElementById("nameInput").value;
  let email = document.getElementById("emailInput").value;
  let phone = document.getElementById("phoneInput").value;
  let address = document.getElementById("addressInput").value;
  let category = document.getElementById("categoryInput").value;

  // 入力チェック
  if (name === "") {
    alert("名前を入力してください");
    return;
  }

  // 連絡先を追加
  addContact(name, email, phone, address, category);

  // 保存
  saveContacts();

  // 表示を更新
  displayAllContacts();

  // 入力欄をクリア
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
  let keyword = document.getElementById("searchInput").value;
  let category = document.getElementById("filterCategory").value;

  let results = searchContacts(keyword, category);

  // 検索結果を表示
  displaySearchResults(results);

  // 件数を表示
  document.getElementById("resultCount").textContent =
    results.length + "件見つかりました";
}

function displaySearchResults(results) {
  let html = "";

  if (results.length === 0) {
    html = '<p>該当する連絡先が見つかりませんでした。</p>';
  } else {
    for (let i = 0; i < results.length; i++) {
      let contact = results[i];
      html += '<div class="contact-card">';
      html += '<h3>' + contact.name + '</h3>';
      html += '<p>Email: ' + contact.email + '</p>';
      html += '<p>電話: ' + contact.phone + '</p>';
      html += '<p>カテゴリ: ' + contact.category + '</p>';
      html += '<button onclick="editContact(' + contact.id + ')">編集</button>';
      html += '<button onclick="confirmDelete(' + contact.id + ')">削除</button>';
      html += '</div>';
    }
  }

  document.getElementById('contactList').innerHTML = html;
}
```

---

## 🔧 5. その他の便利機能

### 統計情報の表示

```javascript
function getStatistics() {
  let stats = {
    total: contacts.length,
    byCategory: {}
  };

  // カテゴリ別に集計
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

// 使用例
let stats = getStatistics();
console.log("総連絡先数: " + stats.total);
console.log("カテゴリ別:");
for (let category in stats.byCategory) {
  console.log("  " + category + ": " + stats.byCategory[category] + "件");
}
```

### データのエクスポート

```javascript
function exportContacts() {
  let jsonString = JSON.stringify(contacts, null, 2);

  // テキストエリアに表示
  document.getElementById("exportArea").value = jsonString;

  console.log("データをエクスポートしました");
}
```

---

## 📝 演習問題

完全な住所録アプリを実装してください：

### 必須機能

1. **追加機能**: 新しい連絡先を追加できる
2. **一覧表示**: 全ての連絡先を見やすく表示
3. **検索機能**: 名前やカテゴリで検索できる
4. **編集機能**: 既存の連絡先情報を編集できる
5. **削除機能**: 連絡先を削除できる（確認ダイアログ付き）
6. **保存機能**: localStorageにデータを保存
7. **読み込み機能**: ページ再読み込み時にデータを復元

### 追加機能（チャレンジ）

1. **バリデーション**: メールアドレスや電話番号の形式チェック
2. **ソート機能**: 名前順、カテゴリ順に並び替え
3. **統計表示**: カテゴリ別の件数を表示
4. **お気に入り機能**: 重要な連絡先にマークを付ける

---

## ✅ 確認ポイント

- [ ] オブジェクトの配列でデータを管理できている
- [ ] CRUD操作が全て実装されている
- [ ] 検索・フィルタリング機能が動作する
- [ ] localStorageでデータが永続化されている
- [ ] UIが使いやすく、フィードバックがある
- [ ] エラーハンドリングが適切に行われている
- [ ] コードが整理され、関数が適切に分割されている

---

## 🎓 学習のポイント

### 1. データモデリング

連絡先をオブジェクトで表現し、必要な情報を整理します。

```javascript
{
  id: 1,           // 一意の識別子
  name: "名前",    // 必須情報
  email: "...",    // 連絡手段
  phone: "...",    // 連絡手段
  address: "...",  // 所在地
  category: "..." // 分類
}
```

### 2. CRUD操作のパターン

- **Create**: `push()`で配列に追加
- **Read**: ループで取得・表示
- **Update**: IDで検索して更新
- **Delete**: `splice()`で削除

### 3. 検索アルゴリズム

```javascript
// 線形探索の基本パターン
function search(keyword) {
  let results = [];
  for (let i = 0; i < data.length; i++) {
    if (条件に一致) {
      results.push(data[i]);
    }
  }
  return results;
}
```

### 4. データの永続化

```javascript
// 保存
localStorage.setItem(key, JSON.stringify(data));

// 読み込み
let data = JSON.parse(localStorage.getItem(key));
```

---

## 💡 発展学習

このプロジェクトを完成させたら、次のような機能を追加してみましょう：

1. **複数のカテゴリタグ**: 1つの連絡先に複数のタグを付ける
2. **メモ機能**: 各連絡先にメモを追加できる
3. **誕生日管理**: 誕生日を登録し、近い順に表示
4. **CSVエクスポート**: データをCSV形式で出力
5. **写真の追加**: プロフィール写真を登録できる
6. **グループ管理**: 連絡先をグループ分けする
7. **履歴機能**: 編集・削除の履歴を記録

---

## 🎯 このレッスンのゴール

第12章で学んだオブジェクトに関する知識を総合的に活用し、実用的なアプリケーションを構築できるようになることが目標です。

- ✅ オブジェクトの配列を管理できる
- ✅ CRUD操作を実装できる
- ✅ 検索・フィルタリング機能を作れる
- ✅ データの永続化ができる
- ✅ UIとデータを連携させられる
- ✅ 実用的なアプリケーションを設計・実装できる
