// ========================================
// エラー処理関数の定義
// ========================================

// TODO: divide関数を実装してください
// 引数: a (被除数), b (除数)
// 戻り値: a ÷ b の結果、エラーの場合はnull
// 要件:
// - try-catchを使ってエラーを処理する
// - aとbが数値でない場合はエラーを投げる
// - bが0の場合はエラーを投げる
// - エラーが発生した場合はconsole.logでエラーメッセージを表示してnullを返す
const divide = function(a, b) {
  // ここにコードを書いてください
};

// TODO: checkAge関数を実装してください
// 引数: age (年齢)
// 戻り値: '成人です' または '未成年です'
// 要件:
// - ageが数値でない場合はエラーを投げる
// - ageが0未満の場合はエラーを投げる
// - ageが120を超える場合はエラーを投げる
// - ageが20未満の場合は '未成年です' を返す
// - それ以外の場合は '成人です' を返す
const checkAge = function(age) {
  // ここにコードを書いてください
};

// TODO: validateForm関数を実装してください
// 引数: data (フォームデータ { name, email, age })
// 戻り値: エラーメッセージの配列
// 要件:
// - nameが空または空白文字のみの場合、エラーメッセージを追加
// - nameが50文字を超える場合、エラーメッセージを追加
// - emailが空の場合、エラーメッセージを追加
// - emailに@が含まれない場合、エラーメッセージを追加
// - ageが空の場合、エラーメッセージを追加
// - ageが数値でない場合、エラーメッセージを追加
// - ageが0未満または120を超える場合、エラーメッセージを追加
const validateForm = function(data) {
  // ここにコードを書いてください
};

// TODO: safeParseJSON関数を実装してください
// 引数: jsonString (JSON文字列)
// 戻り値: { success: true, data: パース結果 } または { success: false, error: エラーメッセージ }
// 要件:
// - try-catchを使ってJSON.parse()のエラーを処理する
// - 成功した場合は { success: true, data: パース結果 } を返す
// - 失敗した場合は { success: false, error: エラーメッセージ } を返す
const safeParseJSON = function(jsonString) {
  // ここにコードを書いてください
};

// TODO: processUserData関数を実装してください
// 引数: jsonString (ユーザーデータのJSON文字列)
// 戻り値: { success: true/false, data: データ/null, errors: エラー配列 }
// 要件:
// - safeParseJSON()でJSONを解析する
// - 解析に失敗した場合、errorsに解析エラーを追加して返す
// - 解析に成功した場合、validateForm()でバリデーションを行う
// - バリデーションエラーがある場合、errorsに追加して返す
// - すべて成功した場合、successをtrue、dataにパース結果を設定して返す
const processUserData = function(jsonString) {
  // ここにコードを書いてください
};

// ========================================
// 1. エラーの種類のデモ
// ========================================
const testReferenceError = function() {
  try {
    console.log('ReferenceErrorのテスト');
    // TODO: 存在しない変数を参照してReferenceErrorを発生させてください
    // ヒント: 定義されていない変数名を使用します
  } catch (error) {
    const output = '【ReferenceError】\n';
    document.getElementById('errorOutput').textContent =
      output + 'エラー名: ' + error.name + '\nメッセージ: ' + error.message;
  }
};

const testTypeError = function() {
  try {
    console.log('TypeErrorのテスト');
    // TODO: 数値に文字列メソッドを使用してTypeErrorを発生させてください
    // ヒント: 数値.toUpperCase() のように型が合わない操作を行います
  } catch (error) {
    const output = '【TypeError】\n';
    document.getElementById('errorOutput').textContent =
      output + 'エラー名: ' + error.name + '\nメッセージ: ' + error.message;
  }
};

const testRangeError = function() {
  try {
    console.log('RangeErrorのテスト');
    // TODO: 不正な配列長でRangeErrorを発生させてください
    // ヒント: new Array(-1) のように負の値を使います
  } catch (error) {
    const output = '【RangeError】\n';
    document.getElementById('errorOutput').textContent =
      output + 'エラー名: ' + error.name + '\nメッセージ: ' + error.message;
  }
};

// ========================================
// 2. try-catchによるエラー処理のデモ
// ========================================
let tryCatchOutput = '=== try-catch の動作 ===\n\n';

// TODO: try-catchを使って以下の処理を実装してください
// 1. 正常な処理（10 ÷ 2の計算）をtryブロックで実行し、結果を出力
// 2. エラーが発生する処理（new Error()でエラーを投げる）をtryブロックで実行
// 3. catchブロックでエラーメッセージを出力
// 4. 最後に「プログラムは続行されます」と出力

document.getElementById('tryCatchOutput').textContent = tryCatchOutput;

// ========================================
// 3. 除算関数のエラー処理
// ========================================
const testDivide = function(a, b) {
  let output = `=== ${a} ÷ ${b} ===\n\n`;

  const result = divide(a, b);

  if (result === null) {
    output += '計算できませんでした';
  } else {
    output += `結果: ${result}`;
  }

  document.getElementById('divideOutput').textContent = output;
};

// 初期表示
testDivide(10, 2);

// ========================================
// 4. 年齢チェック関数
// ========================================
const testAge = function(age) {
  let output = `=== 年齢チェック: ${age}歳 ===\n\n`;

  try {
    const result = checkAge(age);
    output += '✓ ' + result;
    document.getElementById('ageOutput').innerHTML =
      `<div class="success">${output}</div>`;
  } catch (error) {
    output += '✗ エラー: ' + error.message;
    document.getElementById('ageOutput').innerHTML =
      `<div class="error">${output}</div>`;
  }
};

// 初期表示
testAge(25);

// ========================================
// 5. フォームのバリデーション
// ========================================
document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    age: document.getElementById('age').value
  };

  const errors = validateForm(formData);
  const resultDiv = document.getElementById('formResult');

  if (errors.length === 0) {
    resultDiv.innerHTML = `
      <div class="success">
        <h3>✓ バリデーション成功</h3>
        <p>名前: ${formData.name}</p>
        <p>メール: ${formData.email}</p>
        <p>年齢: ${formData.age}歳</p>
      </div>
    `;
  } else {
    let errorHTML = '<div class="error"><h3>✗ バリデーションエラー</h3><ul class="validation-errors">';
    for (let i = 0; i < errors.length; i++) {
      errorHTML += '<li>' + errors[i] + '</li>';
    }
    errorHTML += '</ul></div>';
    resultDiv.innerHTML = errorHTML;
  }
});

// ========================================
// 6. JSON解析のエラー処理
// ========================================
const testJSON = function(type) {
  let output = '';
  let jsonString;

  if (type === '正常') {
    output = '=== 正常なJSON ===\n\n';
    jsonString = '{"name": "田中太郎", "age": 25, "email": "tanaka@example.com"}';
  } else {
    output = '=== 不正なJSON ===\n\n';
    jsonString = '{ name: 太郎, age: 25 }'; // クォートがない不正なJSON
  }

  output += 'JSON文字列:\n' + jsonString + '\n\n';

  const result = safeParseJSON(jsonString);

  if (result.success) {
    output += '✓ 解析成功\n';
    output += 'データ:\n';
    output += '  名前: ' + result.data.name + '\n';
    output += '  年齢: ' + result.data.age + '\n';
    output += '  メール: ' + result.data.email + '\n';
  } else {
    output += '✗ 解析失敗\n';
    output += 'エラー: ' + result.error;
  }

  document.getElementById('jsonOutput').textContent = output;
};

// 初期表示
testJSON('正常');

// ========================================
// 7. 総合例: データ処理
// ========================================
const testData = [
  {
    name: '正常なデータ',
    json: '{"name": "田中太郎", "email": "tanaka@example.com", "age": 25}'
  },
  {
    name: 'バリデーションエラー',
    json: '{"name": "", "email": "invalid-email", "age": -5}'
  },
  {
    name: 'JSON解析エラー',
    json: '{ invalid json }'
  }
];

let processingHTML = '<table>';
processingHTML += '<tr><th>テストケース</th><th>結果</th><th>詳細</th></tr>';

for (let i = 0; i < testData.length; i++) {
  const test = testData[i];
  const result = processUserData(test.json);

  let statusClass = result.success ? 'success' : 'error';
  let statusText = result.success ? '✓ 成功' : '✗ 失敗';
  let details = '';

  if (result.success) {
    details = `名前: ${result.data.name}<br>メール: ${result.data.email}<br>年齢: ${result.data.age}`;
  } else {
    details = result.errors.join('<br>');
  }

  processingHTML += '<tr>';
  processingHTML += '<td>' + test.name + '</td>';
  processingHTML += '<td class="' + statusClass + '">' + statusText + '</td>';
  processingHTML += '<td>' + details + '</td>';
  processingHTML += '</tr>';
}

processingHTML += '</table>';

document.getElementById('processingOutput').innerHTML = processingHTML;

// ========================================
// コンソールにデバッグ情報を出力
// ========================================
console.log('=== レッスン129: デバッグとエラー処理 ===');
console.log('');

console.log('1. 除算関数のテスト:');
console.log('  10 ÷ 2 =', divide(10, 2));
console.log('  10 ÷ 0 =', divide(10, 0));
console.log('');

console.log('2. 年齢チェックのテスト:');
try {
  console.log('  25歳:', checkAge(25));
} catch (error) {
  console.log('  エラー:', error.message);
}

try {
  console.log('  -5歳:', checkAge(-5));
} catch (error) {
  console.log('  エラー:', error.message);
}
console.log('');

console.log('3. バリデーションのテスト:');
const testFormData = { name: '', email: 'invalid', age: -5 };
console.log('  エラー:', validateForm(testFormData));
console.log('');

console.log('4. JSON解析のテスト:');
console.log('  正常:', safeParseJSON('{"name": "太郎"}'));
console.log('  不正:', safeParseJSON('{ invalid }'));
