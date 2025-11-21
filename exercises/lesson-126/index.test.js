/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 126: 関数を引数に', () => {
  let html;
  let scriptContent;

  beforeAll(() => {
    html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
  });

  beforeEach(() => {
    document.documentElement.innerHTML = html;
    eval(scriptContent);
  });

  describe('forEach関数', () => {
    test('forEach関数が定義されている', () => {
      expect(typeof forEach).toBe('function');
    });

    test('forEachが各要素にコールバックを適用する', () => {
      const results = [];
      forEach([1, 2, 3], function(item) {
        results.push(item * 2);
      });
      expect(results).toEqual([2, 4, 6]);
    });

    test('forEachがインデックスも渡す', () => {
      const results = [];
      forEach(['a', 'b', 'c'], function(item, index) {
        results.push(index);
      });
      expect(results).toEqual([0, 1, 2]);
    });
  });

  describe('filter関数', () => {
    test('filter関数が定義されている', () => {
      expect(typeof filter).toBe('function');
    });

    test('filterが条件に合う要素だけを返す', () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      const evens = filter(numbers, function(num) {
        return num % 2 === 0;
      });
      expect(evens).toEqual([2, 4, 6]);
    });

    test('filterが新しい配列を返す', () => {
      const original = [1, 2, 3];
      const filtered = filter(original, function(num) {
        return num > 1;
      });
      expect(filtered).not.toBe(original);
      expect(original).toEqual([1, 2, 3]);
    });

    test('filterで条件に合う要素がない場合は空配列', () => {
      const result = filter([1, 2, 3], function(num) {
        return num > 10;
      });
      expect(result).toEqual([]);
    });
  });

  describe('map関数', () => {
    test('map関数が定義されている', () => {
      expect(typeof map).toBe('function');
    });

    test('mapが各要素を変換する', () => {
      const numbers = [1, 2, 3];
      const doubled = map(numbers, function(num) {
        return num * 2;
      });
      expect(doubled).toEqual([2, 4, 6]);
    });

    test('mapが新しい配列を返す', () => {
      const original = [1, 2, 3];
      const mapped = map(original, function(num) {
        return num * 2;
      });
      expect(mapped).not.toBe(original);
      expect(original).toEqual([1, 2, 3]);
    });

    test('mapで文字列に変換できる', () => {
      const numbers = [1, 2, 3];
      const strings = map(numbers, function(num) {
        return 'Number: ' + num;
      });
      expect(strings).toEqual(['Number: 1', 'Number: 2', 'Number: 3']);
    });
  });

  describe('repeat関数', () => {
    test('repeat関数が定義されている', () => {
      expect(typeof repeat).toBe('function');
    });

    test('repeatが指定回数だけコールバックを実行', () => {
      let count = 0;
      repeat(5, function() {
        count = count + 1;
      });
      expect(count).toBe(5);
    });

    test('repeatがインデックスを渡す', () => {
      const indices = [];
      repeat(3, function(i) {
        indices.push(i);
      });
      expect(indices).toEqual([0, 1, 2]);
    });
  });

  describe('UI関数', () => {
    test('testForEach関数が定義されている', () => {
      expect(typeof testForEach).toBe('function');
    });

    test('testForEachが正しく動作する', () => {
      testForEach();
      const result = document.getElementById('forEachResult').innerHTML;
      expect(result).toContain('りんご');
      expect(result).toContain('バナナ');
      expect(result).toContain('オレンジ');
    });

    test('testFilter関数が定義されている', () => {
      expect(typeof testFilter).toBe('function');
    });

    test('testFilterが正しく動作する', () => {
      document.getElementById('filterInput').value = '5';
      testFilter();
      const result = document.getElementById('filterResult').innerHTML;
      expect(result).toContain('6');
      expect(result).toContain('7');
      expect(result).not.toContain('[1');
    });

    test('testMapDouble関数が定義されている', () => {
      expect(typeof testMapDouble).toBe('function');
    });

    test('testMapDoubleが正しく動作する', () => {
      testMapDouble();
      const result = document.getElementById('mapResult').innerHTML;
      expect(result).toContain('2, 4, 6, 8, 10');
    });

    test('testMapSquare関数が定義されている', () => {
      expect(typeof testMapSquare).toBe('function');
    });

    test('testMapSquareが正しく動作する', () => {
      testMapSquare();
      const result = document.getElementById('mapResult').innerHTML;
      expect(result).toContain('1, 4, 9, 16, 25');
    });

    test('testRepeatStar関数が定義されている', () => {
      expect(typeof testRepeatStar).toBe('function');
    });

    test('testRepeatStarが正しく動作する', () => {
      document.getElementById('repeatInput').value = '3';
      testRepeatStar();
      const result = document.getElementById('repeatResult').innerHTML;
      expect(result).toContain('★');
      expect(result).toContain('★★');
    });

    test('testRepeatNumber関数が定義されている', () => {
      expect(typeof testRepeatNumber).toBe('function');
    });

    test('testRepeatNumberが正しく動作する', () => {
      document.getElementById('repeatInput').value = '3';
      testRepeatNumber();
      const result = document.getElementById('repeatResult').innerHTML;
      expect(result).toContain('繰り返し 1 回目');
      expect(result).toContain('繰り返し 2 回目');
      expect(result).toContain('繰り返し 3 回目');
    });
  });

  describe('コールバックパターンの確認', () => {
    test('異なるコールバックで異なる結果', () => {
      const numbers = [1, 2, 3];

      const doubled = map(numbers, function(n) { return n * 2; });
      const tripled = map(numbers, function(n) { return n * 3; });

      expect(doubled).toEqual([2, 4, 6]);
      expect(tripled).toEqual([3, 6, 9]);
    });

    test('filterで異なる条件を適用できる', () => {
      const numbers = [1, 2, 3, 4, 5, 6];

      const evens = filter(numbers, function(n) { return n % 2 === 0; });
      const largeNumbers = filter(numbers, function(n) { return n > 3; });

      expect(evens).toEqual([2, 4, 6]);
      expect(largeNumbers).toEqual([4, 5, 6]);
    });
  });

  describe('統合テスト', () => {
    test('複数の高階関数を組み合わせて使える', () => {
      const numbers = [1, 2, 3, 4, 5, 6];

      // 偶数だけを抽出
      const evens = filter(numbers, function(n) {
        return n % 2 === 0;
      });

      // 2倍にする
      const doubled = map(evens, function(n) {
        return n * 2;
      });

      expect(doubled).toEqual([4, 8, 12]);
    });

    test('すべての機能が連携して動作する', () => {
      // forEach
      let sum = 0;
      forEach([1, 2, 3], function(n) {
        sum = sum + n;
      });
      expect(sum).toBe(6);

      // filter + map
      const result = map(
        filter([1, 2, 3, 4, 5], function(n) { return n > 2; }),
        function(n) { return n * 2; }
      );
      expect(result).toEqual([6, 8, 10]);

      // repeat
      let count = 0;
      repeat(3, function() {
        count = count + 1;
      });
      expect(count).toBe(3);
    });
  });
});
