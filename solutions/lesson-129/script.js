// ========================================
// エラー処理関数の定義
// ========================================

// 除算関数（エラー処理付き）
const divide = function(a, b) {
  try {
    // 数値チェック
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('引数は数値である必要があります');
    }

    // ゼロ除算チェック
    if (b === 0) {
      throw new Error('0で割ることはできません');
    }

    return a / b;
  } catch (error) {
    console.log('エラー:', error.message);
    return null;
  }
};

// 年齢チェック関数
const checkAge = function(age) {
  if (typeof age !== 'number') {
    throw new Error('年齢は数値である必要があります');
  }

  if (age < 0) {
    throw new Error('年齢は0以上である必要があります');
  }

  if (age > 120) {
    throw new Error('年齢が現実的な範囲を超えています');
  }

  if (age < 20) {
    return '未成年です';
  }

  return '成人です';
};

// フォームのバリデーション
const validateForm = function(data) {
  const errors = [];

  // 名前のチェック
  if (!data.name || data.name.trim() === '') {
    errors.push('名前を入力してください');
  } else if (data.name.length > 50) {
    errors.push('名前は50文字以内で入力してください');
  }

  // メールアドレスのチェック
  if (!data.email || data.email.trim() === '') {
    errors.push('メールアドレスを入力してください');
  } else if (!data.email.includes('@')) {
    errors.push('有効なメールアドレスを入力してください');
  }

  // 年齢のチェック
  if (!data.age) {
    errors.push('年齢を入力してください');
  } else {
    const age = Number(data.age);
    if (isNaN(age)) {
      errors.push('年齢は数値で入力してください');
    } else if (age < 0 || age > 120) {
      errors.push('有効な年齢を入力してください（0-120）');
    }
  }

  return errors;
};

// 安全なJSON解析
const safeParseJSON = function(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// データ処理関数（複数のエラー処理を含む）
const processUserData = function(jsonString) {
  const result = {
    success: false,
    data: null,
    errors: []
  };

  // JSON解析
  const parseResult = safeParseJSON(jsonString);
  if (!parseResult.success) {
    result.errors.push('JSON解析エラー: ' + parseResult.error);
    return result;
  }

  const data = parseResult.data;

  // バリデーション
  const validationErrors = validateForm(data);
  if (validationErrors.length > 0) {
    result.errors = validationErrors;
    return result;
  }

  // 成功
  result.success = true;
  result.data = data;
  return result;
};

// ========================================
// 1. エラーの種類のデモ
// ========================================
const testReferenceError = function() {
  try {
    console.log('ReferenceErrorのテスト');
    // 存在しない変数を参照
    console.log(nonExistentVariable);
  } catch (error) {
    const output = '【ReferenceError】\n';
    document.getElementById('errorOutput').textContent =
      output + 'エラー名: ' + error.name + '\nメッセージ: ' + error.message;
  }
};

const testTypeError = function() {
  try {
    console.log('TypeErrorのテスト');
    // 数値に文字列メソッドを使用
    const num = 123;
    num.toUpperCase();
  } catch (error) {
    const output = '【TypeError】\n';
    document.getElementById('errorOutput').textContent =
      output + 'エラー名: ' + error.name + '\nメッセージ: ' + error.message;
  }
};

const testRangeError = function() {
  try {
    console.log('RangeErrorのテスト');
    // 不正な配列長
    const array = new Array(-1);
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

// 正常な処理
try {
  tryCatchOutput += '【正常な処理】\n';
  const result = 10 / 2;
  tryCatchOutput += '結果: ' + result + '\n\n';
} catch (error) {
  tryCatchOutput += 'エラー: ' + error.message + '\n\n';
}

// エラーが発生する処理
try {
  tryCatchOutput += '【エラーが発生する処理】\n';
  throw new Error('意図的に発生させたエラー');
  tryCatchOutput += 'この行は実行されません\n';
} catch (error) {
  tryCatchOutput += 'エラーをキャッチ: ' + error.message + '\n\n';
}

tryCatchOutput += 'プログラムは続行されます';

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
