// ここに以下の関数を実装してください：

// 1. calculateBMIValue(height, weight)
//    - 引数: height(数値), weight(数値)
//    - 戻り値: 数値（BMI、またはエラー時は0）
//    - 型チェック: typeof height !== 'number' または typeof weight !== 'number' の場合は0を返す
//    - 範囲チェック: height <= 0 または weight <= 0 または height > 300 または weight > 500 の場合は0を返す
//    - BMI計算: weight / (height/100)^2 を小数点以下1桁に丸める

// 2. createGreeting(name)
//    - 引数: name(文字列)
//    - 戻り値: 文字列（挨拶、またはエラー時は'こんにちは'）
//    - 型チェック: typeof name !== 'string' の場合は'こんにちは'を返す
//    - 空文字チェック: name.trim() === '' の場合は'こんにちは'を返す
//    - 挨拶生成: 'こんにちは、' + name + 'さん！' を返す

// 3. formatPriceWithTax(price)
//    - 引数: price(数値)
//    - 戻り値: 文字列（税込価格、またはエラー時は'価格不明'）
//    - 型チェック: typeof price !== 'number' の場合は'価格不明'を返す
//    - 範囲チェック: price < 0 の場合は'価格不明'を返す
//    - 価格計算: price + (price * 0.1) を計算し、'¥' + 金額 の形式で返す

// 4. convertToNumber(value)
//    - 引数: value(任意の型)
//    - 戻り値: 数値
//    - typeof value === 'number' の場合はそのまま返す
//    - typeof value === 'string' の場合は Number(value) で変換、NaNなら0を返す
//    - その他の型の場合は0を返す

// UI関数は完成しているので、上記4つの関数のみ実装してください

// UI関数: BMI計算
function calculateBMI() {
  const heightInput = document.getElementById('heightInput').value;
  const weightInput = document.getElementById('weightInput').value;
  const resultDiv = document.getElementById('bmiResult');

  const height = Number(heightInput);
  const weight = Number(weightInput);
  const bmi = calculateBMIValue(height, weight);

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

  const greeting = createGreeting(nameInput);

  resultDiv.innerHTML = '<div class="result">' + greeting + '</div>' +
    '<div class="type-info">入力型: ' + typeof nameInput + ' (string)<br>' +
    '期待する型: string<br>' +
    '戻り値の型: ' + typeof greeting + ' (string)</div>';
}

// UI関数: 税込価格計算
function calculateTotalPrice() {
  const priceInput = document.getElementById('priceInput').value;
  const resultDiv = document.getElementById('priceResult');

  const price = Number(priceInput);
  const formattedPrice = formatPriceWithTax(price);

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

  let actualValue = convertInput;
  if (convertInput === 'true') {
    actualValue = true;
  } else if (convertInput === 'false') {
    actualValue = false;
  } else if (!isNaN(Number(convertInput)) && convertInput !== '') {
    actualValue = Number(convertInput);
  }

  const converted = convertToNumber(actualValue);

  resultDiv.innerHTML = '<div class="result">変換結果: ' + converted + '</div>' +
    '<div class="type-info">元の値: ' + convertInput + '<br>' +
    '元の型: ' + typeof actualValue + '<br>' +
    '変換後の型: ' + typeof converted + ' (number)</div>';
}
