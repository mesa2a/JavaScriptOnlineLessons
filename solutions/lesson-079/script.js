// ボタン要素とresult要素を取得
const showEvenNumbers = document.getElementById('showEvenNumbers');
const showMultiplesOf3 = document.getElementById('showMultiplesOf3');
const showMultiplicationTable = document.getElementById('showMultiplicationTable');
const result = document.getElementById('result');

// 偶数を表示ボタンをクリックしたときの処理
showEvenNumbers.addEventListener('click', function() {
    result.innerHTML = '';

    // 0から20まで、2ずつ増やす
    for (let i = 0; i <= 20; i += 2) {
        const div = document.createElement('div');
        div.textContent = i;
        result.appendChild(div);
    }
});

// 3の倍数を表示ボタンをクリックしたときの処理
showMultiplesOf3.addEventListener('click', function() {
    result.innerHTML = '';

    // 0から30まで、3ずつ増やす
    for (let i = 0; i <= 30; i += 3) {
        const div = document.createElement('div');
        div.textContent = i;
        result.appendChild(div);
    }
});

// 九九の3の段を表示ボタンをクリックしたときの処理
showMultiplicationTable.addEventListener('click', function() {
    result.innerHTML = '';

    // 1から9まで繰り返す
    for (let i = 1; i <= 9; i++) {
        const div = document.createElement('div');
        div.textContent = '3 × ' + i + ' = ' + (3 * i);
        result.appendChild(div);
    }
});
