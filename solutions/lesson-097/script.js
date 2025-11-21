// 単語データを管理する配列
let words = [];

// HTML要素の取得
let englishInput = document.getElementById("englishInput");
let japaneseInput = document.getElementById("japaneseInput");
let addButton = document.getElementById("addButton");

let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let searchResult = document.getElementById("searchResult");

let wordCount = document.getElementById("wordCount");
let wordList = document.getElementById("wordList");

// 追加ボタンのクリックイベント
addButton.addEventListener("click", function() {
  let english = englishInput.value.trim();
  let japanese = japaneseInput.value.trim();

  // 入力チェック
  if (english === "" || japanese === "") {
    alert("英単語と日本語訳を入力してください");
    return;
  }

  // 重複チェック
  if (isDuplicate(english)) {
    alert("この単語は既に登録されています");
    return;
  }

  // 単語オブジェクトを作成して配列に追加
  let word = {
    english: english,
    japanese: japanese
  };
  words.push(word);

  // 入力欄をクリア
  englishInput.value = "";
  japaneseInput.value = "";

  // リストを更新
  showWordList();

  // フォーカスを英単語入力欄に戻す
  englishInput.focus();
});

// 検索ボタンのクリックイベント
searchButton.addEventListener("click", function() {
  let searchText = searchInput.value.trim();

  if (searchText === "") {
    searchResult.innerHTML = '<p class="no-result">検索する英単語を入力してください</p>';
    return;
  }

  // 単語を検索
  let found = findWord(searchText);

  if (found) {
    searchResult.innerHTML = '<div class="search-result">';
    searchResult.innerHTML += '<strong>' + found.english + '</strong> → ' + found.japanese;
    searchResult.innerHTML += '</div>';
  } else {
    searchResult.innerHTML = '<p class="no-result">「' + searchText + '」は見つかりませんでした</p>';
  }
});

// Enterキーで追加
englishInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    japaneseInput.focus();
  }
});

japaneseInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// Enterキーで検索
searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

// 単語が重複しているかチェック
function isDuplicate(english) {
  for (let word of words) {
    if (word.english === english) {
      return true;
    }
  }
  return false;
}

// 単語を検索
function findWord(english) {
  for (let word of words) {
    if (word.english === english) {
      return word;
    }
  }
  return null;
}

// 単語を削除
function deleteWord(english) {
  for (let i = 0; i < words.length; i++) {
    if (words[i].english === english) {
      words.splice(i, 1);
      showWordList();
      return;
    }
  }
}

// 単語リストを表示
function showWordList() {
  // 単語数を更新
  wordCount.textContent = words.length;

  // リストが空の場合
  if (words.length === 0) {
    wordList.innerHTML = '<p class="empty-message">まだ単語が登録されていません</p>';
    return;
  }

  // 単語リストを作成
  let html = "";
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    html += '<div class="word-item">';
    html += '<div class="word-content">';
    html += '<span class="word-english">' + word.english + '</span>';
    html += '<span class="word-japanese">→ ' + word.japanese + '</span>';
    html += '</div>';
    html += '<button class="delete-button" onclick="deleteWord(\'' + word.english + '\')">削除</button>';
    html += '</div>';
  }

  wordList.innerHTML = html;
}

// 初期表示
showWordList();
searchResult.innerHTML = '<p class="no-result">単語を検索してみましょう</p>';
