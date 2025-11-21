// 並列配列でデータを管理
let contactIds = [];
let contactNames = [];
let contactPhones = [];
let nextId = 1;
let editingIndex = -1;  // -1は「編集中でない」

let nameInput = document.getElementById("nameInput");
let phoneInput = document.getElementById("phoneInput");
let addButton = document.getElementById("addButton");
let contactList = document.getElementById("contactList");

// 連絡先を追加
addButton.addEventListener("click", function() {
  addContact();
});

// Enterキーで追加
nameInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addContact();
  }
});

phoneInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addContact();
  }
});

// 連絡先を追加
function addContact() {
  let name = nameInput.value.trim();
  let phone = phoneInput.value.trim();

  if (name === "") {
    alert("名前を入力してください");
    return;
  }

  if (phone === "") {
    alert("電話番号を入力してください");
    return;
  }

  contactIds.push(nextId);
  contactNames.push(name);
  contactPhones.push(phone);

  nextId++;
  nameInput.value = "";
  phoneInput.value = "";
  nameInput.focus();
  showContacts();
}

// 連絡先を表示
function showContacts() {
  contactList.replaceChildren();

  if (contactNames.length === 0) {
    let message = document.createElement("div");
    message.className = "empty-message";
    message.textContent = "連絡先がありません";
    contactList.appendChild(message);
    return;
  }

  for (let i = 0; i < contactNames.length; i++) {
    let item = document.createElement("div");
    item.className = "contact-item";

    let index = i;

    // 編集中かどうかを判定
    if (editingIndex === i) {
      // 編集モード
      let editFields = document.createElement("div");
      editFields.className = "edit-fields";

      let nameEditInput = document.createElement("input");
      nameEditInput.type = "text";
      nameEditInput.value = contactNames[i];
      nameEditInput.className = "edit-input";
      nameEditInput.placeholder = "名前";

      let phoneEditInput = document.createElement("input");
      phoneEditInput.type = "tel";
      phoneEditInput.value = contactPhones[i];
      phoneEditInput.className = "edit-input";
      phoneEditInput.placeholder = "電話番号";

      // Enterキーで保存
      nameEditInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          saveContact(index, nameEditInput.value.trim(), phoneEditInput.value.trim());
        }
      });

      phoneEditInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          saveContact(index, nameEditInput.value.trim(), phoneEditInput.value.trim());
        }
      });

      editFields.appendChild(nameEditInput);
      editFields.appendChild(phoneEditInput);

      let saveButton = document.createElement("button");
      saveButton.textContent = "保存";
      saveButton.className = "save-button";

      saveButton.addEventListener("click", function() {
        saveContact(index, nameEditInput.value.trim(), phoneEditInput.value.trim());
      });

      let cancelButton = document.createElement("button");
      cancelButton.textContent = "キャンセル";
      cancelButton.className = "cancel-button";

      cancelButton.addEventListener("click", function() {
        editingIndex = -1;
        showContacts();
      });

      item.appendChild(editFields);
      item.appendChild(saveButton);
      item.appendChild(cancelButton);
      contactList.appendChild(item);

      // フォーカスを設定
      nameEditInput.focus();
      nameEditInput.select();

    } else {
      // 表示モード
      let info = document.createElement("div");
      info.className = "contact-info";

      let name = document.createElement("div");
      name.className = "contact-name";
      name.textContent = contactNames[i];

      let phone = document.createElement("div");
      phone.className = "contact-phone";
      phone.textContent = contactPhones[i];

      info.appendChild(name);
      info.appendChild(phone);

      let editButton = document.createElement("button");
      editButton.textContent = "編集";
      editButton.className = "edit-button";

      editButton.addEventListener("click", function() {
        editingIndex = index;
        showContacts();
      });

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";
      deleteButton.className = "delete-button";

      deleteButton.addEventListener("click", function() {
        if (confirm(contactNames[index] + "さんを削除しますか？")) {
          contactIds.splice(index, 1);
          contactNames.splice(index, 1);
          contactPhones.splice(index, 1);
          showContacts();
        }
      });

      item.appendChild(info);
      item.appendChild(editButton);
      item.appendChild(deleteButton);
      contactList.appendChild(item);
    }
  }
}

// 連絡先を保存
function saveContact(index, newName, newPhone) {
  if (newName === "") {
    alert("名前を入力してください");
    return;
  }

  if (newPhone === "") {
    alert("電話番号を入力してください");
    return;
  }

  contactNames[index] = newName;
  contactPhones[index] = newPhone;
  editingIndex = -1;
  showContacts();
}

// 初期表示
showContacts();
