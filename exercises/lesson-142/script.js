// ユーザーデータオブジェクト
let userData = {
  // ここにプロパティを追加してください
  // username: "user123",
  // email: "user@example.com",
  // preferences: {
  //   theme: "light",
  //   language: "ja"
  // },
  // loginCount: 10
};

// 1. オブジェクトをJSON文字列に変換
let stringifyResult = document.getElementById("stringifyResult");
// ヒント: JSON.stringify(userData) を使用
// 見やすくするために JSON.stringify(userData, null, 2) も試してみましょう


// 2. JSON文字列をオブジェクトに戻す
let parseResult = document.getElementById("parseResult");
// ヒント: まずJSON.stringify()で文字列を作成
// その後 JSON.parse() でオブジェクトに戻す
// オブジェクトのプロパティを表示


// 3. localStorageへの保存
let saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", function() {
  // ヒント: JSON.stringify()で文字列に変換してから
  // localStorage.setItem("userData", jsonString) で保存

  // 保存完了メッセージを表示
  let storageResult = document.getElementById("storageResult");
  storageResult.innerHTML = "データを保存しました！";
});

// 4. localStorageからの読み込み
let loadBtn = document.getElementById("loadBtn");
loadBtn.addEventListener("click", function() {
  // ヒント: localStorage.getItem("userData") で文字列を取得
  // JSON.parse() でオブジェクトに変換
  // オブジェクトの内容を表示

  let storageResult = document.getElementById("storageResult");
  // ここにデータを表示
});

// 5. データの削除
let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", function() {
  // ヒント: localStorage.removeItem("userData") でデータを削除

  let storageResult = document.getElementById("storageResult");
  storageResult.innerHTML = "データを削除しました";
});

// ページ読み込み時に保存されているデータを表示
let currentData = document.getElementById("currentData");
// ヒント: localStorage.getItem("userData") でデータを確認
// データがあればオブジェクトに変換して表示
// データがなければ "保存されているデータはありません" と表示
