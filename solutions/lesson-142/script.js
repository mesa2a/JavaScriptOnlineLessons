let userData = {
  username: "user123",
  email: "user@example.com",
  preferences: {
    theme: "light",
    language: "ja"
  },
  loginCount: 10
};

// 1. オブジェクトをJSON文字列に変換
let stringifyResult = document.getElementById("stringifyResult");
let jsonString = JSON.stringify(userData, null, 2);
stringifyResult.textContent = jsonString;

// 2. JSON文字列をオブジェクトに戻す
let parseResult = document.getElementById("parseResult");
let parsedObject = JSON.parse(jsonString);
let html2 = "";
html2 = html2 + '<div class="property"><strong>Username:</strong> ' + parsedObject.username + "</div>";
html2 = html2 + '<div class="property"><strong>Email:</strong> ' + parsedObject.email + "</div>";
html2 = html2 + '<div class="property"><strong>Theme:</strong> ' + parsedObject.preferences.theme + "</div>";
html2 = html2 + '<div class="property"><strong>Language:</strong> ' + parsedObject.preferences.language + "</div>";
html2 = html2 + '<div class="property"><strong>Login Count:</strong> ' + parsedObject.loginCount + "</div>";
parseResult.innerHTML = html2;

// 3. localStorageへの保存
let saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", function() {
  let jsonString = JSON.stringify(userData);
  localStorage.setItem("userData", jsonString);

  let storageResult = document.getElementById("storageResult");
  storageResult.innerHTML = '<div style="color: green; font-weight: bold;">✓ データを保存しました！</div>';

  // 保存されているデータを更新
  displayCurrentData();
});

// 4. localStorageからの読み込み
let loadBtn = document.getElementById("loadBtn");
loadBtn.addEventListener("click", function() {
  let jsonString = localStorage.getItem("userData");

  let storageResult = document.getElementById("storageResult");

  if (jsonString) {
    let loadedData = JSON.parse(jsonString);
    let html = '<div style="color: green; font-weight: bold;">✓ データを読み込みました！</div>';
    html = html + '<div class="property"><strong>Username:</strong> ' + loadedData.username + "</div>";
    html = html + '<div class="property"><strong>Email:</strong> ' + loadedData.email + "</div>";
    html = html + '<div class="property"><strong>Theme:</strong> ' + loadedData.preferences.theme + "</div>";
    html = html + '<div class="property"><strong>Language:</strong> ' + loadedData.preferences.language + "</div>";
    html = html + '<div class="property"><strong>Login Count:</strong> ' + loadedData.loginCount + "</div>";
    storageResult.innerHTML = html;
  } else {
    storageResult.innerHTML = '<div style="color: red;">保存されているデータがありません</div>';
  }
});

// 5. データの削除
let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", function() {
  localStorage.removeItem("userData");

  let storageResult = document.getElementById("storageResult");
  storageResult.innerHTML = '<div style="color: orange; font-weight: bold;">✓ データを削除しました</div>';

  // 保存されているデータを更新
  displayCurrentData();
});

// 保存されているデータを表示する関数
function displayCurrentData() {
  let currentData = document.getElementById("currentData");
  let jsonString = localStorage.getItem("userData");

  if (jsonString) {
    let data = JSON.parse(jsonString);
    let html = '<h3>現在保存されているデータ：</h3>';
    html = html + '<div class="property"><strong>Username:</strong> ' + data.username + "</div>";
    html = html + '<div class="property"><strong>Email:</strong> ' + data.email + "</div>";
    html = html + '<div class="property"><strong>Theme:</strong> ' + data.preferences.theme + "</div>";
    html = html + '<div class="property"><strong>Language:</strong> ' + data.preferences.language + "</div>";
    html = html + '<div class="property"><strong>Login Count:</strong> ' + data.loginCount + "</div>";
    currentData.innerHTML = html;
  } else {
    currentData.innerHTML = '<p style="color: #999;">保存されているデータはありません</p>';
  }
}

// ページ読み込み時に保存されているデータを表示
displayCurrentData();
