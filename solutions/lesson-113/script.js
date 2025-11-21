// BMIを計算して判定する関数（複数の処理を順番に実行）
function calculateBMI(height, weight) {
  // 処理1: 入力チェック
  if (height <= 0 || weight <= 0) {
    document.getElementById('output').innerHTML = '<div class="bmi-judgment">正しい値を入力してください</div>';
    return;  // 早期リターン
  }

  // 処理2: BMIを計算
  const heightM = height / 100;  // cmをmに変換
  const bmi = weight / (heightM * heightM);

  // 処理3: 判定
  let judgment = '';
  if (bmi < 18.5) {
    judgment = 'やせ';
  } else if (bmi < 25) {
    judgment = '普通';
  } else {
    judgment = '肥満';
  }

  // 処理4: 結果を表示
  const html = `
    <div class="bmi-value">BMI: ${bmi.toFixed(1)}</div>
    <div class="bmi-judgment">判定: ${judgment}</div>
  `;
  document.getElementById('output').innerHTML = html;
}

// 計算ボタンがクリックされたときの処理
function calculate() {
  const height = Number(document.getElementById('height').value);
  const weight = Number(document.getElementById('weight').value);

  calculateBMI(height, weight);
}
