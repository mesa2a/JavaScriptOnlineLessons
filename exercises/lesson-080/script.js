// ボタン要素とresult要素を取得
const showMultiplicationTable = document.getElementById('showMultiplicationTable');
const result = document.getElementById('result');

// ボタンをクリックしたときの処理
showMultiplicationTable.addEventListener('click', function() {
    result.innerHTML = '';

    // 九九の全表（1の段から9の段まで）
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            const div = document.createElement('div');
            div.textContent = i + ' × ' + j + ' = ' + (i * j);
            result.appendChild(div);
        }
    }
});
