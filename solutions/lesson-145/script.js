// 連絡先データ（配列）
let contacts = [];

// ページ読み込み時の処理
window.onload = function() {
  loadContacts();
  displayAllContacts();
  updateStats();
};

// ========================================
// CRUD操作
// ========================================

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

// IDで連絡先を取得する関数
function getContactById(id) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      return contacts[i];
    }
  }
  return null; // 見つからない場合
}

// 連絡先を更新する関数
function updateContact(id, name, email, phone, address, category) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
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

// 連絡先を削除する関数
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
    return true; // 削除成功
  }

  return false; // 見つからなかった
}

// ========================================
// 検索・フィルタリング
// ========================================

// 名前で検索する関数
function searchByName(keyword) {
  let results = [];

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    if (contact.name.indexOf(keyword) !== -1) {
      results.push(contact);
    }
  }

  return results;
}

// カテゴリでフィルタリングする関数
function filterByCategory(category) {
  let results = [];

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].category === category) {
      results.push(contacts[i]);
    }
  }

  return results;
}

// 複合検索関数
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

// ========================================
// データの永続化
// ========================================

// localStorageに保存
function saveContacts() {
  let jsonString = JSON.stringify(contacts);
  localStorage.setItem("contacts", jsonString);
  console.log("連絡先を保存しました");
}

// localStorageから読み込み
function loadContacts() {
  let jsonString = localStorage.getItem("contacts");

  if (jsonString) {
    contacts = JSON.parse(jsonString);
    console.log("連絡先を読み込みました: " + contacts.length + "件");
  } else {
    console.log("保存されたデータはありません");
    // 初期データを追加
    addContact("山田太郎", "yamada@example.com", "090-1234-5678", "東京都渋谷区", "友人");
    addContact("佐藤花子", "sato@example.com", "080-9876-5432", "大阪府大阪市", "仕事");
    addContact("田中一郎", "tanaka@example.com", "070-1111-2222", "福岡県福岡市", "友人");
    addContact("鈴木美咲", "suzuki@example.com", "080-3333-4444", "北海道札幌市", "家族");
  }
}

// ========================================
// 表示関連
// ========================================

// 全ての連絡先を表示
function displayAllContacts() {
  let html = "";

  if (contacts.length === 0) {
    html = '<div class="empty-state">連絡先がありません。上のフォームから追加してください。</div>';
  } else {
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      html += '<div class="contact-card">';
      html += '<h3>' + contact.name + '</h3>';
      html += '<p><strong>Email:</strong> ' + contact.email + '</p>';
      html += '<p><strong>電話:</strong> ' + contact.phone + '</p>';
      html += '<p><strong>住所:</strong> ' + contact.address + '</p>';
      html += '<p><strong>カテゴリ:</strong> ' + contact.category + '</p>';
      html += '<div class="contact-actions">';
      html += '<button class="delete" onclick="handleDelete(' + contact.id + ')">削除</button>';
      html += '</div>';
      html += '</div>';
    }
  }

  document.getElementById("contactList").innerHTML = html;
}

// 検索結果を表示
function displaySearchResults(results) {
  let html = "";

  if (results.length === 0) {
    html = '<div class="empty-state">該当する連絡先が見つかりませんでした。</div>';
  } else {
    for (let i = 0; i < results.length; i++) {
      let contact = results[i];
      html += '<div class="contact-card">';
      html += '<h3>' + contact.name + '</h3>';
      html += '<p><strong>Email:</strong> ' + contact.email + '</p>';
      html += '<p><strong>電話:</strong> ' + contact.phone + '</p>';
      html += '<p><strong>住所:</strong> ' + contact.address + '</p>';
      html += '<p><strong>カテゴリ:</strong> ' + contact.category + '</p>';
      html += '<div class="contact-actions">';
      html += '<button class="delete" onclick="handleDelete(' + contact.id + ')">削除</button>';
      html += '</div>';
      html += '</div>';
    }
  }

  document.getElementById("contactList").innerHTML = html;
}

// 統計情報を更新
function updateStats() {
  let total = contacts.length;
  let friendCount = 0;
  let workCount = 0;
  let familyCount = 0;

  for (let i = 0; i < contacts.length; i++) {
    let category = contacts[i].category;
    if (category === "友人") {
      friendCount = friendCount + 1;
    } else if (category === "仕事") {
      workCount = workCount + 1;
    } else if (category === "家族") {
      familyCount = familyCount + 1;
    }
  }

  document.getElementById("totalCount").textContent = total;
  document.getElementById("friendCount").textContent = friendCount;
  document.getElementById("workCount").textContent = workCount;
  document.getElementById("familyCount").textContent = familyCount;
}

// ========================================
// イベントハンドラー
// ========================================

// 連絡先追加ボタンがクリックされた時
function handleAddContact() {
  // 入力値を取得
  let name = document.getElementById("nameInput").value;
  let email = document.getElementById("emailInput").value;
  let phone = document.getElementById("phoneInput").value;
  let address = document.getElementById("addressInput").value;
  let category = document.getElementById("categoryInput").value;

  // バリデーション
  if (name === "") {
    alert("名前を入力してください");
    return;
  }

  // 連絡先を追加
  addContact(name, email, phone, address, category);

  // 保存
  saveContacts();

  // 画面を更新
  displayAllContacts();
  updateStats();

  // 入力欄をクリア
  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("phoneInput").value = "";
  document.getElementById("addressInput").value = "";

  alert("連絡先を追加しました");
}

// 検索ボタンがクリックされた時
function handleSearch() {
  let keyword = document.getElementById("searchInput").value;
  let category = document.getElementById("filterCategory").value;

  let results = searchContacts(keyword, category);

  displaySearchResults(results);

  document.getElementById("resultCount").textContent = results.length + "件見つかりました";
}

// 全て表示ボタンがクリックされた時
function handleShowAll() {
  document.getElementById("searchInput").value = "";
  document.getElementById("filterCategory").value = "全て";
  displayAllContacts();
  document.getElementById("resultCount").textContent = "";
}

// 削除ボタンがクリックされた時
function handleDelete(id) {
  let contact = getContactById(id);

  if (!contact) {
    alert("連絡先が見つかりません");
    return;
  }

  let confirmed = confirm(contact.name + " を削除してもよろしいですか？");

  if (confirmed) {
    deleteContact(id);
    saveContacts();
    displayAllContacts();
    updateStats();
    alert("連絡先を削除しました");
  }
}

// エクスポートボタンがクリックされた時
function handleExport() {
  let jsonString = JSON.stringify(contacts, null, 2);
  console.log("=== エクスポートデータ ===");
  console.log(jsonString);
  alert("データをコンソールにエクスポートしました\n（F12キーを押してコンソールを確認してください）");
}
