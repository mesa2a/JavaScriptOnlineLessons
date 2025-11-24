/**
 * レッスン173: 苦手分野の復習（文字列と制御構文編）
 * 解答例
 */

// ========================================
// 問題1: 文字列の基本操作
// ========================================

function analyzeString(str) {
  return {
    length: str.length,
    first: str.charAt(0),
    last: str.charAt(str.length - 1),
    upper: str.toUpperCase(),
    lower: str.toLowerCase()
  };
}

// テスト
// console.log(analyzeString('Hello'));
// {
//   length: 5,
//   first: 'H',
//   last: 'o',
//   upper: 'HELLO',
//   lower: 'hello'
// }


// ========================================
// 問題2: 文字列の検索と抽出
// ========================================

function extractUsername(email) {
  var atIndex = email.indexOf('@');
  return email.substring(0, atIndex);
}

// 別解: slice を使用
function extractUsernameAlt(email) {
  var atIndex = email.indexOf('@');
  return email.slice(0, atIndex);
}

// テスト
// console.log(extractUsername('tanaka@example.com')); // 'tanaka'
// console.log(extractUsername('sato.hanako@company.co.jp')); // 'sato.hanako'


// ========================================
// 問題3: 文字列の分割と結合
// ========================================

function parseCSV(str) {
  var parts = str.split(',');
  var result = [];

  for (var i = 0; i < parts.length; i++) {
    result.push(parts[i].trim());
  }

  return result;
}

// 別解: map を使用（より簡潔）
function parseCSVAlt(str) {
  return str.split(',').map(function(item) {
    return item.trim();
  });
}

// テスト
// console.log(parseCSV('apple, banana, orange'));
// ['apple', 'banana', 'orange']


// ========================================
// 問題4: 条件分岐（if文）
// ========================================

function getGrade(score) {
  if (score >= 90) {
    return 'A';
  } else if (score >= 80) {
    return 'B';
  } else if (score >= 70) {
    return 'C';
  } else if (score >= 60) {
    return 'D';
  } else {
    return 'F';
  }
}

// 別解: 三項演算子をネスト（非推奨だが可能）
function getGradeAlt(score) {
  return score >= 90 ? 'A' :
         score >= 80 ? 'B' :
         score >= 70 ? 'C' :
         score >= 60 ? 'D' : 'F';
}

// テスト
// console.log(getGrade(95)); // 'A'
// console.log(getGrade(75)); // 'C'
// console.log(getGrade(55)); // 'F'


// ========================================
// 問題5: 条件分岐（switch文）
// ========================================

function getDayName(dayNumber) {
  switch (dayNumber) {
    case 0:
      return '日曜日';
    case 1:
      return '月曜日';
    case 2:
      return '火曜日';
    case 3:
      return '水曜日';
    case 4:
      return '木曜日';
    case 5:
      return '金曜日';
    case 6:
      return '土曜日';
    default:
      return 'Invalid day';
  }
}

// 別解: 配列を使用
function getDayNameAlt(dayNumber) {
  var days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];

  if (dayNumber >= 0 && dayNumber < days.length) {
    return days[dayNumber];
  }

  return 'Invalid day';
}

// テスト
// console.log(getDayName(0)); // '日曜日'
// console.log(getDayName(3)); // '水曜日'
// console.log(getDayName(9)); // 'Invalid day'


// ========================================
// 問題6: ループ（for文）
// ========================================

function sum(n) {
  var total = 0;

  for (var i = 1; i <= n; i++) {
    total += i;
  }

  return total;
}

// 別解: 数学の公式を使用 n * (n + 1) / 2
function sumAlt(n) {
  return n * (n + 1) / 2;
}

// テスト
// console.log(sum(5)); // 15 (1+2+3+4+5)
// console.log(sum(10)); // 55


// ========================================
// 問題7: ループ（while文）
// ========================================

function findIndex(arr, target) {
  var index = 0;

  while (index < arr.length) {
    if (arr[index] === target) {
      return index;
    }
    index++;
  }

  return -1;
}

// 別解: for ループを使用
function findIndexAlt(arr, target) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

// 注: 実際には Array.prototype.indexOf() を使うのが最適
function findIndexBest(arr, target) {
  return arr.indexOf(target);
}

// テスト
// console.log(findIndex([1, 2, 3, 4, 5], 3)); // 2
// console.log(findIndex([1, 2, 3, 4, 5], 6)); // -1


// ========================================
// 問題8: break と continue
// ========================================

function sumEvensUntil50(arr) {
  var sum = 0;

  for (var i = 0; i < arr.length; i++) {
    // 奇数ならスキップ
    if (arr[i] % 2 !== 0) {
      continue;
    }

    // 偶数を加算
    sum += arr[i];

    // 50を超えたら中断
    if (sum > 50) {
      break;
    }
  }

  return sum;
}

// 別解: while ループを使用
function sumEvensUntil50Alt(arr) {
  var sum = 0;
  var i = 0;

  while (i < arr.length && sum <= 50) {
    if (arr[i] % 2 === 0) {
      sum += arr[i];
    }
    i++;
  }

  return sum;
}

// テスト
// console.log(sumEvensUntil50([1, 2, 3, 4, 5, 20, 30, 10])); // 56 (2+4+20+30)
// console.log(sumEvensUntil50([1, 3, 5, 7])); // 0


// ========================================
// チャレンジ1: バリデーション関数
// ========================================

function validatePassword(password) {
  var errors = [];
  var hasLetter = false;
  var hasNumber = false;

  // 長さチェック
  if (password.length < 8) {
    errors.push('パスワードは8文字以上である必要があります');
  }

  // 英字と数字のチェック
  for (var i = 0; i < password.length; i++) {
    var char = password.charAt(i);

    // 英字チェック
    if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
      hasLetter = true;
    }

    // 数字チェック
    if (char >= '0' && char <= '9') {
      hasNumber = true;
    }
  }

  if (!hasLetter) {
    errors.push('パスワードには英字を含める必要があります');
  }

  if (!hasNumber) {
    errors.push('パスワードには数字を含める必要があります');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// 別解: 正規表現を使用（より簡潔だが学習中は避けるべき）
function validatePasswordAlt(password) {
  var errors = [];

  if (password.length < 8) {
    errors.push('パスワードは8文字以上である必要があります');
  }

  if (!/[a-zA-Z]/.test(password)) {
    errors.push('パスワードには英字を含める必要があります');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('パスワードには数字を含める必要があります');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// テスト
// console.log(validatePassword('abc123def'));
// { isValid: true, errors: [] }

// console.log(validatePassword('abc'));
// { isValid: false, errors: ['パスワードは8文字以上である必要があります', 'パスワードには数字を含める必要があります'] }


// ========================================
// チャレンジ2: テキストフォーマット関数
// ========================================

function toTitleCase(str) {
  var words = str.toLowerCase().split(' ');
  var result = [];

  for (var i = 0; i < words.length; i++) {
    var word = words[i];

    if (word.length > 0) {
      var titleWord = word.charAt(0).toUpperCase() + word.substring(1);
      result.push(titleWord);
    }
  }

  return result.join(' ');
}

// 別解: map を使用
function toTitleCaseAlt(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    if (word.length === 0) return word;
    return word.charAt(0).toUpperCase() + word.substring(1);
  }).join(' ');
}

// 別解: slice を使用
function toTitleCaseAlt2(str) {
  var words = str.toLowerCase().split(' ');
  var result = [];

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    if (word.length > 0) {
      result.push(word.slice(0, 1).toUpperCase() + word.slice(1));
    }
  }

  return result.join(' ');
}

// テスト
// console.log(toTitleCase('hello world')); // 'Hello World'
// console.log(toTitleCase('javaScript is FUN')); // 'Javascript Is Fun'


// ========================================
// チャレンジ3: 複雑な条件分岐
// ========================================

function calculateDiscount(amount, memberType) {
  var discountRate = 0;

  if (memberType === 'premium') {
    if (amount >= 10000) {
      discountRate = 0.20;
    } else if (amount >= 5000) {
      discountRate = 0.15;
    } else {
      discountRate = 0.10;
    }
  } else if (memberType === 'regular') {
    if (amount >= 10000) {
      discountRate = 0.10;
    } else if (amount >= 5000) {
      discountRate = 0.05;
    } else {
      discountRate = 0;
    }
  } else {
    discountRate = 0;
  }

  return amount * (1 - discountRate);
}

// 別解: switch 文を使用
function calculateDiscountAlt(amount, memberType) {
  var discountRate = 0;

  switch (memberType) {
    case 'premium':
      if (amount >= 10000) {
        discountRate = 0.20;
      } else if (amount >= 5000) {
        discountRate = 0.15;
      } else {
        discountRate = 0.10;
      }
      break;

    case 'regular':
      if (amount >= 10000) {
        discountRate = 0.10;
      } else if (amount >= 5000) {
        discountRate = 0.05;
      }
      break;

    default:
      discountRate = 0;
  }

  return amount * (1 - discountRate);
}

// 別解: 関数を分離（より保守性が高い）
function getDiscountRate(amount, memberType) {
  if (memberType === 'premium') {
    if (amount >= 10000) return 0.20;
    if (amount >= 5000) return 0.15;
    return 0.10;
  }

  if (memberType === 'regular') {
    if (amount >= 10000) return 0.10;
    if (amount >= 5000) return 0.05;
    return 0;
  }

  return 0;
}

function calculateDiscountAlt2(amount, memberType) {
  var discountRate = getDiscountRate(amount, memberType);
  return amount * (1 - discountRate);
}

// テスト
// console.log(calculateDiscount(12000, 'premium')); // 9600 (20%割引)
// console.log(calculateDiscount(6000, 'regular')); // 5700 (5%割引)
// console.log(calculateDiscount(3000, 'guest')); // 3000 (割引なし)


// ========================================
// 高度な問題: FizzBuzz
// ========================================

function fizzBuzz(n) {
  var result = [];

  for (var i = 1; i <= n; i++) {
    // 15で割り切れる（3と5の両方）
    if (i % 15 === 0) {
      result.push('FizzBuzz');
    }
    // 3で割り切れる
    else if (i % 3 === 0) {
      result.push('Fizz');
    }
    // 5で割り切れる
    else if (i % 5 === 0) {
      result.push('Buzz');
    }
    // どれでもない
    else {
      result.push(i);
    }
  }

  return result;
}

// 別解: 文字列連結を使用（より拡張性が高い）
function fizzBuzzAlt(n) {
  var result = [];

  for (var i = 1; i <= n; i++) {
    var output = '';

    if (i % 3 === 0) {
      output += 'Fizz';
    }

    if (i % 5 === 0) {
      output += 'Buzz';
    }

    // output が空文字列なら数値を追加
    if (output === '') {
      output = i;
    }

    result.push(output);
  }

  return result;
}

// 別解: switch 文を使用（可読性は低い）
function fizzBuzzAlt2(n) {
  var result = [];

  for (var i = 1; i <= n; i++) {
    switch (true) {
      case i % 15 === 0:
        result.push('FizzBuzz');
        break;
      case i % 3 === 0:
        result.push('Fizz');
        break;
      case i % 5 === 0:
        result.push('Buzz');
        break;
      default:
        result.push(i);
    }
  }

  return result;
}

// テスト
// console.log(fizzBuzz(15));
// [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']


// ========================================
// 実用例: 電話番号のフォーマット
// ========================================

/**
 * 電話番号をフォーマットする
 * 例: '09012345678' → '090-1234-5678'
 */
function formatPhoneNumber(phone) {
  // ハイフンを削除
  var cleaned = phone.replace(/-/g, '');

  // 長さをチェック
  if (cleaned.length !== 11 && cleaned.length !== 10) {
    return 'Invalid phone number';
  }

  // フォーマット
  if (cleaned.length === 11) {
    return cleaned.substring(0, 3) + '-' +
           cleaned.substring(3, 7) + '-' +
           cleaned.substring(7);
  } else {
    return cleaned.substring(0, 3) + '-' +
           cleaned.substring(3, 6) + '-' +
           cleaned.substring(6);
  }
}

// console.log(formatPhoneNumber('09012345678')); // '090-1234-5678'
// console.log(formatPhoneNumber('0312345678')); // '03-123-5678'


// エクスポート（テスト用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    analyzeString: analyzeString,
    extractUsername: extractUsername,
    parseCSV: parseCSV,
    getGrade: getGrade,
    getDayName: getDayName,
    sum: sum,
    findIndex: findIndex,
    sumEvensUntil50: sumEvensUntil50,
    validatePassword: validatePassword,
    toTitleCase: toTitleCase,
    calculateDiscount: calculateDiscount,
    fizzBuzz: fizzBuzz,
    formatPhoneNumber: formatPhoneNumber
  };
}
