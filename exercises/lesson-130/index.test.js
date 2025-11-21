/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('レッスン130: 関数型プログラミング入門', () => {
  let add;
  let multiply;
  let addElement;
  let removeElement;
  let updateElement;
  let double;
  let addTen;
  let square;

  beforeAll(() => {
    const scriptPath = path.join(__dirname, 'script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

    // HTMLのモック
    document.body.innerHTML = `
      <div id="pureFunctionOutput"></div>
      <div id="immutabilityOutput"></div>
      <div id="spreadOutput"></div>
      <div id="arrayMethodsOutput"></div>
      <div id="chainOutput"></div>
      <div id="cartOutput"></div>
      <div id="compositionOutput"></div>
      <div id="pipelineOutput"></div>
    `;

    // console.logをモック
    global.console.log = jest.fn();

    eval(scriptContent);

    add = eval('add');
    multiply = eval('multiply');
    addElement = eval('addElement');
    removeElement = eval('removeElement');
    updateElement = eval('updateElement');
    double = eval('double');
    addTen = eval('addTen');
    square = eval('square');
  });

  describe('純粋関数', () => {
    test('add関数は2つの数値を加算する', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(10, 20)).toBe(30);
      expect(add(0, 0)).toBe(0);
    });

    test('add関数は純粋（同じ入力で同じ出力）', () => {
      expect(add(5, 7)).toBe(12);
      expect(add(5, 7)).toBe(12);
      expect(add(5, 7)).toBe(12);
    });

    test('multiply関数は2つの数値を乗算する', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(4, 5)).toBe(20);
      expect(multiply(0, 10)).toBe(0);
    });

    test('multiply関数は純粋（同じ入力で同じ出力）', () => {
      expect(multiply(3, 4)).toBe(12);
      expect(multiply(3, 4)).toBe(12);
      expect(multiply(3, 4)).toBe(12);
    });
  });

  describe('不変性を保つ配列操作', () => {
    test('addElement関数は元の配列を変更しない', () => {
      const original = [1, 2, 3];
      const result = addElement(original, 4);

      expect(original).toEqual([1, 2, 3]); // 元の配列は変更されていない
      expect(result).toEqual([1, 2, 3, 4]); // 新しい配列が返される
    });

    test('addElement関数は要素を末尾に追加する', () => {
      expect(addElement([1, 2], 3)).toEqual([1, 2, 3]);
      expect(addElement([], 1)).toEqual([1]);
      expect(addElement([10, 20, 30], 40)).toEqual([10, 20, 30, 40]);
    });

    test('removeElement関数は元の配列を変更しない', () => {
      const original = [1, 2, 3, 4, 5];
      const result = removeElement(original, 2);

      expect(original).toEqual([1, 2, 3, 4, 5]); // 元の配列は変更されていない
      expect(result).toEqual([1, 2, 4, 5]); // インデックス2の要素が削除されている
    });

    test('removeElement関数は指定インデックスの要素を削除する', () => {
      expect(removeElement([1, 2, 3, 4], 0)).toEqual([2, 3, 4]);
      expect(removeElement([1, 2, 3, 4], 3)).toEqual([1, 2, 3]);
      expect(removeElement([1, 2, 3], 1)).toEqual([1, 3]);
    });

    test('updateElement関数は元の配列を変更しない', () => {
      const original = [1, 2, 3, 4, 5];
      const result = updateElement(original, 2, 30);

      expect(original).toEqual([1, 2, 3, 4, 5]); // 元の配列は変更されていない
      expect(result).toEqual([1, 2, 30, 4, 5]); // インデックス2の要素が更新されている
    });

    test('updateElement関数は指定インデックスの要素を更新する', () => {
      expect(updateElement([1, 2, 3], 0, 10)).toEqual([10, 2, 3]);
      expect(updateElement([1, 2, 3], 2, 30)).toEqual([1, 2, 30]);
      expect(updateElement([5, 5, 5], 1, 100)).toEqual([5, 100, 5]);
    });
  });

  describe('関数の合成', () => {
    test('double関数は数値を2倍にする', () => {
      expect(double(5)).toBe(10);
      expect(double(10)).toBe(20);
      expect(double(0)).toBe(0);
    });

    test('addTen関数は数値に10を加える', () => {
      expect(addTen(5)).toBe(15);
      expect(addTen(0)).toBe(10);
      expect(addTen(100)).toBe(110);
    });

    test('square関数は数値を2乗する', () => {
      expect(square(5)).toBe(25);
      expect(square(10)).toBe(100);
      expect(square(3)).toBe(9);
    });

    test('関数を組み合わせて使用できる', () => {
      expect(square(addTen(double(5)))).toBe(400);
      // 5 -> double -> 10 -> addTen -> 20 -> square -> 400

      expect(addTen(double(3))).toBe(16);
      // 3 -> double -> 6 -> addTen -> 16

      expect(square(double(4))).toBe(64);
      // 4 -> double -> 8 -> square -> 64
    });
  });

  describe('map、filter、reduceの使用', () => {
    test('mapを使って配列の各要素を変換できる', () => {
      const numbers = [1, 2, 3, 4, 5];
      const doubled = numbers.map(n => n * 2);
      expect(doubled).toEqual([2, 4, 6, 8, 10]);
    });

    test('filterを使って条件に合う要素を抽出できる', () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const evens = numbers.filter(n => n % 2 === 0);
      expect(evens).toEqual([2, 4, 6, 8, 10]);
    });

    test('reduceを使って配列を集約できる', () => {
      const numbers = [1, 2, 3, 4, 5];
      const sum = numbers.reduce((acc, n) => acc + n, 0);
      expect(sum).toBe(15);

      const max = numbers.reduce((acc, n) => n > acc ? n : acc, numbers[0]);
      expect(max).toBe(5);
    });
  });

  describe('メソッドチェーン', () => {
    test('filterとmapを組み合わせてデータを処理できる', () => {
      const users = [
        { name: '太郎', active: true },
        { name: '花子', active: true },
        { name: '一郎', active: false }
      ];

      const activeNames = users
        .filter(user => user.active)
        .map(user => user.name);

      expect(activeNames).toEqual(['太郎', '花子']);
    });

    test('複数のメソッドを連鎖して複雑な処理ができる', () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      const result = numbers
        .filter(n => n % 2 === 0) // 偶数のみ
        .map(n => n * 2) // 2倍
        .reduce((sum, n) => sum + n, 0); // 合計

      // [2, 4, 6, 8, 10] -> [4, 8, 12, 16, 20] -> 60
      expect(result).toBe(60);
    });
  });

  describe('スプレッド構文', () => {
    test('配列をコピーできる', () => {
      const original = [1, 2, 3];
      const copy = [...original];

      copy.push(4);

      expect(original).toEqual([1, 2, 3]); // 元の配列は変更されていない
      expect(copy).toEqual([1, 2, 3, 4]);
    });

    test('配列を結合できる', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];
      const combined = [...arr1, ...arr2];

      expect(combined).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('オブジェクトをコピーして一部を更新できる', () => {
      const user = { name: '太郎', age: 25 };
      const updated = { ...user, age: 26 };

      expect(user).toEqual({ name: '太郎', age: 25 }); // 元は変更されていない
      expect(updated).toEqual({ name: '太郎', age: 26 });
    });
  });

  describe('実践例：ショッピングカート', () => {
    test('商品に小計を追加できる', () => {
      const cart = [
        { name: 'りんご', price: 100, quantity: 3 }
      ];

      const withSubtotal = cart.map(item => ({
        ...item,
        subtotal: item.price * item.quantity
      }));

      expect(withSubtotal[0].subtotal).toBe(300);
      expect(cart[0].subtotal).toBeUndefined(); // 元の配列は変更されていない
    });

    test('カート全体の合計を計算できる', () => {
      const cart = [
        { name: 'りんご', price: 100, quantity: 3, subtotal: 300 },
        { name: 'バナナ', price: 80, quantity: 5, subtotal: 400 }
      ];

      const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

      expect(total).toBe(700);
    });

    test('条件に合う商品の合計を計算できる', () => {
      const cart = [
        { name: 'りんご', price: 100, quantity: 3 },
        { name: 'バナナ', price: 80, quantity: 5 },
        { name: 'オレンジ', price: 120, quantity: 2 }
      ];

      const expensiveTotal = cart
        .filter(item => item.price >= 100)
        .map(item => item.price * item.quantity)
        .reduce((sum, subtotal) => sum + subtotal, 0);

      // りんご: 100 * 3 = 300, オレンジ: 120 * 2 = 240
      expect(expensiveTotal).toBe(540);
    });
  });

  describe('データ処理パイプライン', () => {
    test('複数の処理を組み合わせてデータを加工できる', () => {
      const students = [
        { name: '太郎', scores: [80, 90, 85], active: true },
        { name: '花子', scores: [90, 95, 92], active: true },
        { name: '一郎', scores: [70, 75, 72], active: false }
      ];

      const result = students
        .filter(s => s.active)
        .map(s => ({
          ...s,
          average: s.scores.reduce((sum, score) => sum + score, 0) / s.scores.length
        }))
        .sort((a, b) => b.average - a.average);

      expect(result.length).toBe(2);
      expect(result[0].name).toBe('花子'); // 平均点が高い
      expect(result[0].average).toBeCloseTo(92.33, 1);
      expect(result[1].name).toBe('太郎');
    });

    test('ネストした配列を平坦化できる', () => {
      const students = [
        { scores: [80, 90] },
        { scores: [85, 95] }
      ];

      const allScores = students
        .map(s => s.scores)
        .reduce((all, scores) => [...all, ...scores], []);

      expect(allScores).toEqual([80, 90, 85, 95]);
    });
  });

  describe('純粋性のテスト', () => {
    test('配列操作関数は元の配列を変更しない', () => {
      const original = [1, 2, 3, 4, 5];

      addElement(original, 6);
      removeElement(original, 2);
      updateElement(original, 1, 20);

      expect(original).toEqual([1, 2, 3, 4, 5]); // すべての操作後も変更されていない
    });

    test('関数の合成は純粋', () => {
      const input = 5;

      const result1 = square(addTen(double(input)));
      const result2 = square(addTen(double(input)));
      const result3 = square(addTen(double(input)));

      expect(result1).toBe(result2);
      expect(result2).toBe(result3);
      expect(result1).toBe(400);
    });
  });

  describe('エッジケースのテスト', () => {
    test('空配列の操作', () => {
      expect(addElement([], 1)).toEqual([1]);
      expect(removeElement([1], 0)).toEqual([]);
      expect(updateElement([1], 0, 10)).toEqual([10]);
    });

    test('単一要素の配列', () => {
      expect(addElement([1], 2)).toEqual([1, 2]);
      expect(removeElement([1], 0)).toEqual([]);
      expect(updateElement([1], 0, 10)).toEqual([10]);
    });

    test('0や負の数の処理', () => {
      expect(add(0, 0)).toBe(0);
      expect(add(-5, 5)).toBe(0);
      expect(multiply(-2, 3)).toBe(-6);
      expect(double(-5)).toBe(-10);
    });
  });
});
