// 1. BMI計算関数（数値を受け取り、数値を返す）
function calculateBMIValue(height, weight) {
  // 引数の型チェック
  if (typeof height !== 'number' || typeof weight !== 'number') {
    return 0;  // エラー時は0を返す（型の一貫性）
  }

  // 値の範囲チェック
  if (height <= 0 || weight <= 0 || height > 300 || weight > 500) {
    return 0;
  }

  // BMI計算
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  // 小数点以下1桁に丸める
  return Math.round(bmi * 10) / 10;  // 常に数値を返す
}

// 2. 挨拶生成関数（文字列を受け取り、文字列を返す）
function createGreeting(name) {
  // 引数の型チェック
  if (typeof name !== 'string') {
    return 'こんにちは';  // エラー時も文字列を返す（型の一貫性）
  }

  // 空文字チェック
  if (name.trim() === '') {
    return 'こんにちは';
  }

  return 'こんにちは、' + name + 'さん！';  // 常に文字列を返す
}

// 3. 税込価格計算関数（数値を受け取り、文字列を返す）
function formatPriceWithTax(price) {
  // 引数の型チェック
  if (typeof price !== 'number') {
    return '価格不明';  // エラー時も文字列を返す（型の一貫性）
  }

  // 値の範囲チェック
  if (price < 0) {
    return '価格不明';
  }

  // 税込価格を計算
  const taxRate = 0.1;
  const totalPrice = price + (price * taxRate);

  return '¥' + totalPrice.toLocaleString();  // 常に文字列を返す
}

// 4. 数値変換関数（任意の型を受け取り、数値を返す）
function convertToNumber(value) {
  // すでに数値の場合
  if (typeof value === 'number') {
    return value;
  }

  // 文字列の場合
  if (typeof value === 'string') {
    const num = Number(value);
    if (isNaN(num)) {
      return 0;  // 変換失敗時は0
    }
    return num;
  }

  // その他の型は0
  return 0;  // 常に数値を返す（型の一貫性）
}

// UI関数: BMI計算
function calculateBMI() {
  const heightInput = document.getElementById('heightInput').value;
  const weightInput = document.getElementById('weightInput').value;
  const resultDiv = document.getElementById('bmiResult');

  // 入力値を数値に変換
  const height = Number(heightInput);
  const weight = Number(weightInput);

  // BMIを計算
  const bmi = calculateBMIValue(height, weight);

  // 結果を表示
  if (bmi === 0) {
    resultDiv.innerHTML = '<div class="result error">エラー: 正しい数値を入力してください</div>' +
      '<div class="type-info">入力型: ' + typeof heightInput + ', ' + typeof weightInput + '<br>' +
      '期待する型: number, number<br>' +
      '戻り値の型: number</div>';
  } else {
    resultDiv.innerHTML = '<div class="result">BMI: ' + bmi + '</div>' +
      '<div class="type-info">入力型: number, number<br>' +
      '戻り値の型: ' + typeof bmi + ' (number)</div>';
  }
}

// UI関数: 挨拶生成
function generateGreeting() {
  const nameInput = document.getElementById('nameInput').value;
  const resultDiv = document.getElementById('greetingResult');

  // 挨拶を生成
  const greeting = createGreeting(nameInput);

  // 結果を表示
  resultDiv.innerHTML = '<div class="result">' + greeting + '</div>' +
    '<div class="type-info">入力型: ' + typeof nameInput + ' (string)<br>' +
    '期待する型: string<br>' +
    '戻り値の型: ' + typeof greeting + ' (string)</div>';
}

// UI関数: 税込価格計算
function calculateTotalPrice() {
  const priceInput = document.getElementById('priceInput').value;
  const resultDiv = document.getElementById('priceResult');

  // 入力値を数値に変換
  const price = Number(priceInput);

  // 税込価格を計算
  const formattedPrice = formatPriceWithTax(price);

  // 結果を表示
  if (formattedPrice === '価格不明') {
    resultDiv.innerHTML = '<div class="result error">' + formattedPrice + '</div>' +
      '<div class="type-info">入力型: ' + typeof priceInput + '<br>' +
      '期待する型: number<br>' +
      '戻り値の型: string</div>';
  } else {
    resultDiv.innerHTML = '<div class="result">税込価格: ' + formattedPrice + '</div>' +
      '<div class="type-info">入力型: number<br>' +
      '戻り値の型: ' + typeof formattedPrice + ' (string)</div>';
  }
}

// UI関数: 数値変換
function convertValue() {
  const convertInput = document.getElementById('convertInput').value;
  const resultDiv = document.getElementById('convertResult');

  // 文字列を評価して実際の値を取得
  let actualValue = convertInput;
  if (convertInput === 'true') {
    actualValue = true;
  } else if (convertInput === 'false') {
    actualValue = false;
  } else if (!isNaN(Number(convertInput)) && convertInput !== '') {
    actualValue = Number(convertInput);
  }

  // 数値に変換
  const converted = convertToNumber(actualValue);

  // 結果を表示
  resultDiv.innerHTML = '<div class="result">変換結果: ' + converted + '</div>' +
    '<div class="type-info">元の値: ' + convertInput + '<br>' +
    '元の型: ' + typeof actualValue + '<br>' +
    '変換後の型: ' + typeof converted + ' (number)</div>';
}
