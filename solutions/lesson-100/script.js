// メモデータ
let memos = [];

// HTML要素の取得
let memoInput = document.getElementById("memoInput");
let addButton = document.getElementById("addButton");
let sortNewestButton = document.getElementById("sortNewest");
let sortOldestButton = document.getElementById("sortOldest");
let memoList = document.getElementById("memoList");

// メモを追加
addButton.addEventListener("click", function() {
  let text = memoInput.value.trim();

  if (text === "") {
    alert("メモを入力してください");
    return;
  }

  // メモオブジェクトを作成
  let memo = {
    text: text,
    date: new Date()
  };

  // 配列に追加
  memos.push(memo);

  // 入力欄をクリア
  memoInput.value = "";

  // 画面を更新
  showMemos();
});

// 新しい順にソート
sortNewestButton.addEventListener("click", function() {
  memos.sort((a, b) => b.date - a.date);
  showMemos();
});

// 古い順にソート
sortOldestButton.addEventListener("click", function() {
  memos.sort((a, b) => a.date - b.date);
  showMemos();
});

// メモを表示
function showMemos() {
  // リストをクリア
  memoList.replaceChildren();

  // メモが空の場合
  if (memos.length === 0) {
    let emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "まだメモがありません";
    memoList.appendChild(emptyMessage);
    return;
  }

  // 各メモを表示
  for (let i = 0; i < memos.length; i++) {
    let memo = memos[i];

    // メモアイテムを作成
    let item = document.createElement("div");
    item.className = "memo-item";

    // メモのテキスト
    let textElement = document.createElement("div");
    textElement.className = "memo-text";
    textElement.textContent = memo.text;

    // 日時を表示
    let dateElement = document.createElement("div");
    dateElement.className = "memo-date";
    dateElement.textContent = formatDate(memo.date);

    // 削除ボタン
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function() {
      // 配列から削除
      memos.splice(i, 1);
      // 画面を更新
      showMemos();
    });

    // 要素を組み立てる
    item.appendChild(textElement);
    item.appendChild(dateElement);
    item.appendChild(deleteButton);

    // リストに追加
    memoList.appendChild(item);
  }
}

// 日時を文字列に変換
function formatDate(date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  return year + "/" + month + "/" + day + " " + hours + ":" + minutes;
}

// 初期表示
showMemos();
