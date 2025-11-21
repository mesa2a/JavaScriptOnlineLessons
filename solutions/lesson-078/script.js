// ボタン要素とresult要素を取得
const startCountdown = document.getElementById('startCountdown');
const result = document.getElementById('result');

// ボタンをクリックしたときの処理
startCountdown.addEventListener('click', function() {
    // resultの内容をクリア
    result.innerHTML = '';

    // 10から0までカウントダウン
    for (let i = 10; i >= 0; i--) {
        const div = document.createElement('div');
        div.textContent = i;
        result.appendChild(div);
    }

    // カウントダウン終了のメッセージ
    const message = document.createElement('div');
    message.textContent = '発射！';
    result.appendChild(message);
});
