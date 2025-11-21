/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('レッスン128: ユーティリティ関数の作成', () => {
  let formatDate;
  let formatDateSlash;
  let formatNumber;
  let formatDecimal;
  let formatPrice;
  let truncate;
  let capitalize;
  let repeat;
  let max;
  let min;
  let average;
  let sum;

  beforeAll(() => {
    const scriptPath = path.join(__dirname, 'script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    eval(scriptContent);

    formatDate = eval('formatDate');
    formatDateSlash = eval('formatDateSlash');
    formatNumber = eval('formatNumber');
    formatDecimal = eval('formatDecimal');
    formatPrice = eval('formatPrice');
    truncate = eval('truncate');
    capitalize = eval('capitalize');
    repeat = eval('repeat');
    max = eval('max');
    min = eval('min');
    average = eval('average');
    sum = eval('sum');
  });

  describe('日付フォーマット関数', () => {
    test('formatDateは日付を "YYYY年MM月DD日" 形式で返す', () => {
      const date = new Date(2024, 0, 15);
      expect(formatDate(date)).toBe('2024年01月15日');
    });

    test('formatDateは月と日が1桁の場合、0埋めする', () => {
      const date = new Date(2024, 4, 5); // 5月5日
      expect(formatDate(date)).toBe('2024年05月05日');
    });

    test('formatDateSlashは日付を "YYYY/MM/DD" 形式で返す', () => {
      const date = new Date(2024, 0, 15);
      expect(formatDateSlash(date)).toBe('2024/01/15');
    });
  });

  describe('数値フォーマット関数', () => {
    test('formatNumberは数値を3桁区切りのカンマ付きで返す', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(123)).toBe('123');
    });

    test('formatDecimalは指定した桁数で小数を丸める', () => {
      expect(formatDecimal(3.14159, 2)).toBe('3.14');
      expect(formatDecimal(10, 2)).toBe('10.00');
      expect(formatDecimal(5.6789, 3)).toBe('5.679');
    });

    test('formatPriceは価格を "¥1,234" 形式で返す', () => {
      expect(formatPrice(29800)).toBe('¥29,800');
      expect(formatPrice(1250)).toBe('¥1,250');
      expect(formatPrice(999999)).toBe('¥999,999');
    });
  });

  describe('文字列操作関数', () => {
    test('truncateは文字列が最大長以下の場合、そのまま返す', () => {
      expect(truncate('こんにちは', 5)).toBe('こんにちは');
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    test('truncateは文字列が最大長を超える場合、切り詰めて...を付ける', () => {
      expect(truncate('こんにちは世界', 5)).toBe('こんにちは...');
      expect(truncate('長い文字列です', 3)).toBe('長い文...');
    });

    test('capitalizeは最初の文字を大文字にする', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
      expect(capitalize('javascript')).toBe('Javascript');
    });

    test('repeatは文字列を指定回数繰り返す', () => {
      expect(repeat('★', 3)).toBe('★★★');
      expect(repeat('Hello', 2)).toBe('HelloHello');
      expect(repeat('-', 5)).toBe('-----');
    });

    test('repeatは0回の場合、空文字列を返す', () => {
      expect(repeat('test', 0)).toBe('');
    });
  });

  describe('配列操作関数', () => {
    test('maxは配列の最大値を返す', () => {
      expect(max([3, 1, 4, 1, 5, 9, 2, 6])).toBe(9);
      expect(max([80, 90, 70, 85, 95])).toBe(95);
      expect(max([5])).toBe(5);
    });

    test('maxは負の数の配列でも動作する', () => {
      expect(max([-1, -5, -3])).toBe(-1);
    });

    test('minは配列の最小値を返す', () => {
      expect(min([3, 1, 4, 1, 5, 9, 2, 6])).toBe(1);
      expect(min([80, 90, 70, 85, 95])).toBe(70);
      expect(min([5])).toBe(5);
    });

    test('minは負の数の配列でも動作する', () => {
      expect(min([-1, -5, -3])).toBe(-5);
    });

    test('sumは配列の合計を返す', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
      expect(sum([10, 20, 30])).toBe(60);
      expect(sum([5])).toBe(5);
    });

    test('sumは空配列の場合0を返す', () => {
      expect(sum([])).toBe(0);
    });

    test('averageは配列の平均値を返す', () => {
      expect(average([80, 90, 70, 85, 95])).toBe(84);
      expect(average([10, 20, 30])).toBe(20);
      expect(average([5])).toBe(5);
    });

    test('averageは小数の平均値を正しく計算する', () => {
      expect(average([85, 92, 78, 88, 90])).toBeCloseTo(86.6, 1);
    });
  });

  describe('関数の組み合わせ', () => {
    test('複数のユーティリティ関数を組み合わせて使用できる', () => {
      const testDate = new Date(2024, 0, 15);
      const testPrice = 29800;
      const testName = 'プログラミング学習コース 完全版';

      const formattedDate = formatDateSlash(testDate);
      const formattedPrice = formatPrice(testPrice);
      const truncatedName = truncate(testName, 15);

      expect(formattedDate).toBe('2024/01/15');
      expect(formattedPrice).toBe('¥29,800');
      expect(truncatedName).toBe('プログラミング学習コース...');
    });

    test('配列操作関数を組み合わせて統計情報を取得できる', () => {
      const scores = [85, 92, 78, 88, 90];

      const maxScore = max(scores);
      const minScore = min(scores);
      const avgScore = average(scores);
      const totalScore = sum(scores);

      expect(maxScore).toBe(92);
      expect(minScore).toBe(78);
      expect(avgScore).toBeCloseTo(86.6, 1);
      expect(totalScore).toBe(433);

      // フォーマット関数と組み合わせ
      const formattedAvg = formatDecimal(avgScore, 1);
      expect(formattedAvg).toBe('86.6');
    });
  });

  describe('実用例のテスト', () => {
    test('商品情報を整形して表示できる', () => {
      const product = {
        name: 'プログラミング学習コース 完全版',
        price: 29800,
        releaseDate: new Date(2024, 0, 15)
      };

      const displayName = truncate(product.name, 20);
      const displayPrice = formatPrice(product.price);
      const displayDate = formatDateSlash(product.releaseDate);

      expect(displayName).toBe('プログラミング学習コース 完全版');
      expect(displayPrice).toBe('¥29,800');
      expect(displayDate).toBe('2024/01/15');
    });

    test('学生のスコア統計を計算できる', () => {
      const student = {
        name: '田中太郎',
        scores: [85, 92, 78, 88, 90]
      };

      const maxScore = max(student.scores);
      const minScore = min(student.scores);
      const avgScore = average(student.scores);
      const totalScore = sum(student.scores);

      expect(maxScore).toBe(92);
      expect(minScore).toBe(78);
      expect(avgScore).toBeCloseTo(86.6, 1);
      expect(totalScore).toBe(433);
    });

    test('複数学生の全体統計を計算できる', () => {
      const students = [
        { name: '田中太郎', scores: [85, 92, 78, 88, 90] },
        { name: '佐藤花子', scores: [92, 88, 95, 90, 93] }
      ];

      const allScores = [];
      for (let i = 0; i < students.length; i++) {
        for (let j = 0; j < students[i].scores.length; j++) {
          allScores.push(students[i].scores[j]);
        }
      }

      expect(max(allScores)).toBe(95);
      expect(min(allScores)).toBe(78);
      expect(allScores.length).toBe(10);
      expect(average(allScores)).toBeCloseTo(88.1, 1);
    });
  });

  describe('エッジケースのテスト', () => {
    test('formatNumberは0を正しく処理する', () => {
      expect(formatNumber(0)).toBe('0');
    });

    test('truncateは空文字列を正しく処理する', () => {
      expect(truncate('', 5)).toBe('');
    });

    test('capitalizeは1文字の文字列を正しく処理する', () => {
      expect(capitalize('a')).toBe('A');
    });

    test('repeatは1回の繰り返しを正しく処理する', () => {
      expect(repeat('test', 1)).toBe('test');
    });

    test('配列関数は単一要素の配列を正しく処理する', () => {
      const singleArray = [42];
      expect(max(singleArray)).toBe(42);
      expect(min(singleArray)).toBe(42);
      expect(average(singleArray)).toBe(42);
      expect(sum(singleArray)).toBe(42);
    });
  });
});
