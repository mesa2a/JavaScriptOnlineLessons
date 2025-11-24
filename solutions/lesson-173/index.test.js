/**
 * レッスン173: 苦手分野の復習（文字列と制御構文編）
 * テスト
 */

import { describe, it, expect } from 'vitest';

// 解答をインポート（実際には各テストで関数を定義）
// このテストは学習者が関数を正しく実装できているかを確認します

describe('レッスン173: 文字列と制御構文の復習', () => {

  // ========================================
  // 問題1: 文字列の基本操作
  // ========================================
  describe('問題1: analyzeString', () => {
    it('文字列を正しく分析する', () => {
      function analyzeString(str) {
        return {
          length: str.length,
          first: str.charAt(0),
          last: str.charAt(str.length - 1),
          upper: str.toUpperCase(),
          lower: str.toLowerCase()
        };
      }

      const result = analyzeString('Hello');
      expect(result.length).toBe(5);
      expect(result.first).toBe('H');
      expect(result.last).toBe('o');
      expect(result.upper).toBe('HELLO');
      expect(result.lower).toBe('hello');
    });

    it('1文字の文字列を正しく処理する', () => {
      function analyzeString(str) {
        return {
          length: str.length,
          first: str.charAt(0),
          last: str.charAt(str.length - 1),
          upper: str.toUpperCase(),
          lower: str.toLowerCase()
        };
      }

      const result = analyzeString('A');
      expect(result.length).toBe(1);
      expect(result.first).toBe('A');
      expect(result.last).toBe('A');
    });

    it('日本語を正しく処理する', () => {
      function analyzeString(str) {
        return {
          length: str.length,
          first: str.charAt(0),
          last: str.charAt(str.length - 1),
          upper: str.toUpperCase(),
          lower: str.toLowerCase()
        };
      }

      const result = analyzeString('こんにちは');
      expect(result.length).toBe(5);
      expect(result.first).toBe('こ');
      expect(result.last).toBe('は');
    });
  });

  // ========================================
  // 問題2: 文字列の検索と抽出
  // ========================================
  describe('問題2: extractUsername', () => {
    it('メールアドレスからユーザー名を抽出する', () => {
      function extractUsername(email) {
        var atIndex = email.indexOf('@');
        return email.substring(0, atIndex);
      }

      expect(extractUsername('tanaka@example.com')).toBe('tanaka');
    });

    it('ドット付きのユーザー名を正しく抽出する', () => {
      function extractUsername(email) {
        var atIndex = email.indexOf('@');
        return email.substring(0, atIndex);
      }

      expect(extractUsername('sato.hanako@company.co.jp')).toBe('sato.hanako');
    });

    it('複雑なドメインでも正しく抽出する', () => {
      function extractUsername(email) {
        var atIndex = email.indexOf('@');
        return email.substring(0, atIndex);
      }

      expect(extractUsername('user@mail.example.com')).toBe('user');
    });
  });

  // ========================================
  // 問題3: 文字列の分割と結合
  // ========================================
  describe('問題3: parseCSV', () => {
    it('CSV文字列を正しく配列に変換する', () => {
      function parseCSV(str) {
        var parts = str.split(',');
        var result = [];
        for (var i = 0; i < parts.length; i++) {
          result.push(parts[i].trim());
        }
        return result;
      }

      const result = parseCSV('apple, banana, orange');
      expect(result).toEqual(['apple', 'banana', 'orange']);
    });

    it('空白の有無に関わらず正しく処理する', () => {
      function parseCSV(str) {
        var parts = str.split(',');
        var result = [];
        for (var i = 0; i < parts.length; i++) {
          result.push(parts[i].trim());
        }
        return result;
      }

      const result = parseCSV('apple,banana,orange');
      expect(result).toEqual(['apple', 'banana', 'orange']);
    });

    it('余分な空白を削除する', () => {
      function parseCSV(str) {
        var parts = str.split(',');
        var result = [];
        for (var i = 0; i < parts.length; i++) {
          result.push(parts[i].trim());
        }
        return result;
      }

      const result = parseCSV('  apple  ,  banana  ,  orange  ');
      expect(result).toEqual(['apple', 'banana', 'orange']);
    });
  });

  // ========================================
  // 問題4: 条件分岐（if文）
  // ========================================
  describe('問題4: getGrade', () => {
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

    it('90点以上でAを返す', () => {
      expect(getGrade(95)).toBe('A');
      expect(getGrade(90)).toBe('A');
    });

    it('80点以上でBを返す', () => {
      expect(getGrade(85)).toBe('B');
      expect(getGrade(80)).toBe('B');
    });

    it('70点以上でCを返す', () => {
      expect(getGrade(75)).toBe('C');
      expect(getGrade(70)).toBe('C');
    });

    it('60点以上でDを返す', () => {
      expect(getGrade(65)).toBe('D');
      expect(getGrade(60)).toBe('D');
    });

    it('60点未満でFを返す', () => {
      expect(getGrade(55)).toBe('F');
      expect(getGrade(0)).toBe('F');
    });
  });

  // ========================================
  // 問題5: 条件分岐（switch文）
  // ========================================
  describe('問題5: getDayName', () => {
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

    it('0-6の数値を正しい曜日名に変換する', () => {
      expect(getDayName(0)).toBe('日曜日');
      expect(getDayName(1)).toBe('月曜日');
      expect(getDayName(2)).toBe('火曜日');
      expect(getDayName(3)).toBe('水曜日');
      expect(getDayName(4)).toBe('木曜日');
      expect(getDayName(5)).toBe('金曜日');
      expect(getDayName(6)).toBe('土曜日');
    });

    it('範囲外の数値でInvalid dayを返す', () => {
      expect(getDayName(7)).toBe('Invalid day');
      expect(getDayName(-1)).toBe('Invalid day');
      expect(getDayName(100)).toBe('Invalid day');
    });
  });

  // ========================================
  // 問題6: ループ（for文）
  // ========================================
  describe('問題6: sum', () => {
    function sum(n) {
      var total = 0;
      for (var i = 1; i <= n; i++) {
        total += i;
      }
      return total;
    }

    it('1からnまでの合計を正しく計算する', () => {
      expect(sum(5)).toBe(15); // 1+2+3+4+5
      expect(sum(10)).toBe(55); // 1+2+...+10
    });

    it('1の場合は1を返す', () => {
      expect(sum(1)).toBe(1);
    });

    it('0の場合は0を返す', () => {
      expect(sum(0)).toBe(0);
    });

    it('大きな数でも正しく計算する', () => {
      expect(sum(100)).toBe(5050);
    });
  });

  // ========================================
  // 問題7: ループ（while文）
  // ========================================
  describe('問題7: findIndex', () => {
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

    it('要素が存在する場合、正しいインデックスを返す', () => {
      expect(findIndex([1, 2, 3, 4, 5], 3)).toBe(2);
      expect(findIndex([1, 2, 3, 4, 5], 1)).toBe(0);
      expect(findIndex([1, 2, 3, 4, 5], 5)).toBe(4);
    });

    it('要素が存在しない場合、-1を返す', () => {
      expect(findIndex([1, 2, 3, 4, 5], 6)).toBe(-1);
      expect(findIndex([1, 2, 3, 4, 5], 0)).toBe(-1);
    });

    it('空配列の場合、-1を返す', () => {
      expect(findIndex([], 1)).toBe(-1);
    });

    it('文字列も正しく検索する', () => {
      expect(findIndex(['a', 'b', 'c'], 'b')).toBe(1);
    });
  });

  // ========================================
  // 問題8: break と continue
  // ========================================
  describe('問題8: sumEvensUntil50', () => {
    function sumEvensUntil50(arr) {
      var sum = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] % 2 !== 0) {
          continue;
        }
        sum += arr[i];
        if (sum > 50) {
          break;
        }
      }
      return sum;
    }

    it('偶数の合計が50を超えたら停止する', () => {
      expect(sumEvensUntil50([1, 2, 3, 4, 5, 20, 30, 10])).toBe(56);
    });

    it('奇数のみの配列では0を返す', () => {
      expect(sumEvensUntil50([1, 3, 5, 7])).toBe(0);
    });

    it('50を超えない場合はすべての偶数の合計を返す', () => {
      expect(sumEvensUntil50([2, 4, 6, 8])).toBe(20);
    });

    it('最初の偶数で50を超える場合', () => {
      expect(sumEvensUntil50([100])).toBe(100);
    });
  });

  // ========================================
  // チャレンジ1: バリデーション関数
  // ========================================
  describe('チャレンジ1: validatePassword', () => {
    function validatePassword(password) {
      var errors = [];
      var hasLetter = false;
      var hasNumber = false;

      if (password.length < 8) {
        errors.push('パスワードは8文字以上である必要があります');
      }

      for (var i = 0; i < password.length; i++) {
        var char = password.charAt(i);
        if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
          hasLetter = true;
        }
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

    it('有効なパスワードでisValid: trueを返す', () => {
      const result = validatePassword('abc123def');
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('短すぎるパスワードでエラーを返す', () => {
      const result = validatePassword('abc123');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(err => err.includes('8文字以上'))).toBe(true);
    });

    it('数字がない場合エラーを返す', () => {
      const result = validatePassword('abcdefgh');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(err => err.includes('数字'))).toBe(true);
    });

    it('英字がない場合エラーを返す', () => {
      const result = validatePassword('12345678');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(err => err.includes('英字'))).toBe(true);
    });

    it('複数のエラーを正しく返す', () => {
      const result = validatePassword('abc');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(2);
    });
  });

  // ========================================
  // チャレンジ2: テキストフォーマット関数
  // ========================================
  describe('チャレンジ2: toTitleCase', () => {
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

    it('各単語の最初の文字を大文字にする', () => {
      expect(toTitleCase('hello world')).toBe('Hello World');
    });

    it('すでに大文字が含まれていても正しく変換する', () => {
      expect(toTitleCase('javaScript is FUN')).toBe('Javascript Is Fun');
    });

    it('1単語でも正しく変換する', () => {
      expect(toTitleCase('hello')).toBe('Hello');
    });

    it('すべて大文字でも正しく変換する', () => {
      expect(toTitleCase('HELLO WORLD')).toBe('Hello World');
    });

    it('複数の空白があっても処理する', () => {
      const result = toTitleCase('hello  world');
      expect(result.includes('Hello')).toBe(true);
      expect(result.includes('World')).toBe(true);
    });
  });

  // ========================================
  // チャレンジ3: 複雑な条件分岐
  // ========================================
  describe('チャレンジ3: calculateDiscount', () => {
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

    it('プレミアム会員の割引を正しく計算する', () => {
      expect(calculateDiscount(12000, 'premium')).toBe(9600); // 20%割引
      expect(calculateDiscount(6000, 'premium')).toBe(5100); // 15%割引
      expect(calculateDiscount(3000, 'premium')).toBe(2700); // 10%割引
    });

    it('通常会員の割引を正しく計算する', () => {
      expect(calculateDiscount(12000, 'regular')).toBe(10800); // 10%割引
      expect(calculateDiscount(6000, 'regular')).toBe(5700); // 5%割引
      expect(calculateDiscount(3000, 'regular')).toBe(3000); // 割引なし
    });

    it('非会員は割引なし', () => {
      expect(calculateDiscount(12000, 'guest')).toBe(12000);
      expect(calculateDiscount(3000, 'guest')).toBe(3000);
    });

    it('境界値を正しく処理する', () => {
      expect(calculateDiscount(10000, 'premium')).toBe(8000); // 20%割引
      expect(calculateDiscount(5000, 'premium')).toBe(4250); // 15%割引
      expect(calculateDiscount(10000, 'regular')).toBe(9000); // 10%割引
      expect(calculateDiscount(5000, 'regular')).toBe(4750); // 5%割引
    });
  });

  // ========================================
  // 高度な問題: FizzBuzz
  // ========================================
  describe('高度な問題: fizzBuzz', () => {
    function fizzBuzz(n) {
      var result = [];
      for (var i = 1; i <= n; i++) {
        if (i % 15 === 0) {
          result.push('FizzBuzz');
        } else if (i % 3 === 0) {
          result.push('Fizz');
        } else if (i % 5 === 0) {
          result.push('Buzz');
        } else {
          result.push(i);
        }
      }
      return result;
    }

    it('15までのFizzBuzzを正しく生成する', () => {
      const result = fizzBuzz(15);
      const expected = [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'];
      expect(result).toEqual(expected);
    });

    it('3の倍数でFizzを返す', () => {
      const result = fizzBuzz(9);
      expect(result[2]).toBe('Fizz'); // 3
      expect(result[5]).toBe('Fizz'); // 6
      expect(result[8]).toBe('Fizz'); // 9
    });

    it('5の倍数でBuzzを返す', () => {
      const result = fizzBuzz(10);
      expect(result[4]).toBe('Buzz'); // 5
      expect(result[9]).toBe('Buzz'); // 10
    });

    it('15の倍数でFizzBuzzを返す', () => {
      const result = fizzBuzz(30);
      expect(result[14]).toBe('FizzBuzz'); // 15
      expect(result[29]).toBe('FizzBuzz'); // 30
    });

    it('1の場合は[1]を返す', () => {
      const result = fizzBuzz(1);
      expect(result).toEqual([1]);
    });
  });
});
