// ボタン要素とresult要素を取得
const showEvenNumbers = document.getElementById('showEvenNumbers');
const showMultiplesOf3 = document.getElementById('showMultiplesOf3');
const showMultiplicationTable = document.getElementById('showMultiplicationTable');
const result = document.getElementById('result');

// 偶数を表示するボタン
showEvenNumbers.addEventListener('click', function() {
    result.innerHTML = '';
    for (let i = 0; i <= 20; i += 2) {
        const div = document.createElement('div');
        div.textContent = i;
        result.appendChild(div);
    }
});

// 3の倍数を表示するボタン
showMultiplesOf3.addEventListener('click', function() {
    result.innerHTML = '';
    for (let i = 0; i <= 30; i += 3) {
        const div = document.createElement('div');
        div.textContent = i;
        result.appendChild(div);
    }
});

// 九九の3の段を表示するボタン
showMultiplicationTable.addEventListener('click', function() {
    result.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
        const div = document.createElement('div');
        div.textContent = '3 × ' + i + ' = ' + (3 * i);
        result.appendChild(div);
    }
});
