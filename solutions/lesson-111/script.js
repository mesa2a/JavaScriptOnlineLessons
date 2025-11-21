// あいさつメッセージを作成して表示する関数（引数を2つ受け取る）
function greet(time, name) {
  let message = '';

  if (time === 'morning') {
    message = 'おはようございます、' + name + 'さん！';
  } else if (time === 'afternoon') {
    message = 'こんにちは、' + name + 'さん！';
  } else if (time === 'evening') {
    message = 'こんばんは、' + name + 'さん！';
  }

  document.getElementById('output').textContent = message;
}

// ボタンがクリックされたときの処理
function showGreeting() {
  // 入力された名前を取得
  const name = document.getElementById('nameInput').value;

  // 選択された時間帯を取得
  const time = document.getElementById('timeSelect').value;

  // 入力チェック
  if (name === '') {
    document.getElementById('output').textContent = '名前を入力してください';
    return;
  }

  // greet関数を呼び出す（引数を2つ渡す）
  greet(time, name);
}
