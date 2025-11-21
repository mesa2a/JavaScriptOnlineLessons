// 入力された名前を取得する関数
function getInputName() {
  const name = document.getElementById('nameInput').value;
  return name;
}

// 入力されたメッセージを取得する関数
function getInputMessage() {
  const message = document.getElementById('messageInput').value;
  return message;
}

// ヘッダーを作成する関数
function createHeader(name) {
  return '━━━━━━━━━━━━\n親愛なる ' + name + ' さんへ\n━━━━━━━━━━━━';
}

// フッターを作成する関数
function createFooter() {
  return '━━━━━━━━━━━━\nあなたより\n━━━━━━━━━━━━';
}

// カード全体を作成する関数（他の関数を呼び出す）
function createCard(name, message) {
  const header = createHeader(name);  // ヘッダーを作る
  const footer = createFooter();      // フッターを作る

  // 全体を組み立てる
  const card = header + '\n\n' + message + '\n\n' + footer;
  return card;
}

// カードを表示する関数（全ての関数を呼び出す）
function displayCard() {
  const name = getInputName();       // 名前を取得
  const message = getInputMessage(); // メッセージを取得

  // 入力チェック
  if (name === '' || message === '') {
    document.getElementById('output').textContent = '名前とメッセージを入力してください';
    return;
  }

  const card = createCard(name, message);  // カードを作成
  document.getElementById('output').textContent = card;  // 表示
}
