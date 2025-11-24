// 連絡先データ（配列）
let contacts = [];

// ページ読み込み時の処理
window.onload = function() {
  // TODO: localStorageからデータを読み込む
  // loadContacts();
  displayAllContacts();
  updateStats();
};

// ========================================
// CRUD操作
// ========================================

// 連絡先を追加する関数
function addContact(name, email, phone, address, category) {
  // TODO: 新しいIDを生成する
  // TODO: 新しい連絡先オブジェクトを作成
  // TODO: contacts配列に追加
  // TODO: 連絡先オブジェクトを返す
}

// IDで連絡先を取得する関数
function getContactById(id) {
  // TODO: IDで連絡先を検索して返す
  // 見つからない場合はnullを返す
}

// 連絡先を更新する関数
function updateContact(id, name, email, phone, address, category) {
  // TODO: IDで連絡先を探す
  // TODO: 情報を更新
  // TODO: 成功したらtrueを返す
}

// 連絡先を削除する関数
function deleteContact(id) {
  // TODO: IDで連絡先を検索
  // TODO: 配列から削除
  // TODO: 成功したらtrueを返す
}

// ========================================
// 検索・フィルタリング
// ========================================

// 名前で検索する関数
function searchByName(keyword) {
  // TODO: 名前にキーワードが含まれる連絡先を検索
  // TODO: 結果の配列を返す
}

// カテゴリでフィルタリングする関数
function filterByCategory(category) {
  // TODO: 指定されたカテゴリの連絡先を抽出
  // TODO: 結果の配列を返す
}

// 複合検索関数
function searchContacts(keyword, category) {
  // TODO: キーワードとカテゴリで検索
  // TODO: 両方の条件を満たす連絡先を返す
}

// ========================================
// データの永続化
// ========================================

// localStorageに保存
function saveContacts() {
  // TODO: contacts配列をJSON文字列に変換
  // TODO: localStorageに保存
}

// localStorageから読み込み
function loadContacts() {
  // TODO: localStorageからデータを取得
  // TODO: JSON文字列をオブジェクトに変換
  // TODO: contacts配列に代入
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
    // TODO: 各連絡先のカードを生成
  }

  document.getElementById("contactList").innerHTML = html;
}

// 検索結果を表示
function displaySearchResults(results) {
  let html = "";

  if (results.length === 0) {
    html = '<div class="empty-state">該当する連絡先が見つかりませんでした。</div>';
  } else {
    // TODO: 検索結果のカードを生成
  }

  document.getElementById("contactList").innerHTML = html;
}

// 統計情報を更新
function updateStats() {
  // TODO: 総連絡先数を表示
  // TODO: カテゴリ別の件数を表示
}

// ========================================
// イベントハンドラー
// ========================================

// 連絡先追加ボタンがクリックされた時
function handleAddContact() {
  // TODO: 入力値を取得
  // TODO: バリデーション（名前が空でないかチェック）
  // TODO: addContact関数を呼び出す
  // TODO: saveContactsで保存
  // TODO: 画面を更新（displayAllContacts, updateStats）
  // TODO: 入力欄をクリア
  // TODO: メッセージを表示
}

// 検索ボタンがクリックされた時
function handleSearch() {
  // TODO: 検索キーワードとカテゴリを取得
  // TODO: searchContacts関数で検索
  // TODO: displaySearchResults関数で結果を表示
  // TODO: 件数を表示
}

// 全て表示ボタンがクリックされた時
function handleShowAll() {
  // TODO: 検索欄をクリア
  // TODO: displayAllContacts関数を呼び出す
  // TODO: 件数表示をクリア
}

// 削除ボタンがクリックされた時
function handleDelete(id) {
  // TODO: 確認ダイアログを表示
  // TODO: OKの場合、deleteContact関数を呼び出す
  // TODO: saveContactsで保存
  // TODO: 画面を更新
}

// エクスポートボタンがクリックされた時
function handleExport() {
  // TODO: contacts配列をJSON文字列に変換
  // TODO: console.logで出力、またはalertで表示
}
