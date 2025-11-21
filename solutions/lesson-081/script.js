// ボタン要素とresult要素を取得
const createNumberedList = document.getElementById('createNumberedList');
const result = document.getElementById('result');

// ボタンをクリックしたときの処理
createNumberedList.addEventListener('click', function() {
    // resultの内容をクリア
    result.innerHTML = '';

    // 1から20まで繰り返す
    for (let i = 1; i <= 20; i++) {
        // div要素を作成
        const div = document.createElement('div');
        div.textContent = 'アイテム' + i;
        result.appendChild(div);
    }
});
