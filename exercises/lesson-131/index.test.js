/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('レッスン131: アロー関数の基本', () => {
  let add, subtract, multiply, divide;
  let double, square, greet;
  let getRandomNumber, getCurrentTime;
  let processNumber;
  let makePerson, makePoint;

  beforeAll(() => {
    const scriptPath = path.join(__dirname, 'script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

    // HTMLのモック
    document.body.innerHTML = `
      <div id="basicOutput"></div>
      <div id="syntaxOutput"></div>
      <div id="arrayMethodsOutput"></div>
      <div id="objectOutput"></div>
      <div id="chainOutput"></div>
      <div id="cartOutput"></div>
      <div id="dataOutput"></div>
      <div id="comparisonOutput"></div>
    `;

    // console.logをモック
    global.console.log = jest.fn();

    eval(scriptContent);

    add = eval('add');
    subtract = eval('subtract');
    multiply = eval('multiply');
    divide = eval('divide');
    double = eval('double');
    square = eval('square');
    greet = eval('greet');
    getRandomNumber = eval('getRandomNumber');
    getCurrentTime = eval('getCurrentTime');
    processNumber = eval('processNumber');
    makePerson = eval('makePerson');
    makePoint = eval('makePoint');
  });

  describe('基本的なアロー関数', () => {
    test('add関数は2つの数値を加算する', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(10, 20)).toBe(30);
      expect(add(0, 0)).toBe(0);
    });

    test('subtract関数は2つの数値を減算する', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(10, 4)).toBe(6);
      expect(subtract(0, 0)).toBe(0);
    });

    test('multiply関数は2つの数値を乗算する', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(4, 5)).toBe(20);
      expect(multiply(0, 10)).toBe(0);
    });

    test('divide関数は2つの数値を除算する', () => {
      expect(divide(6, 2)).toBe(3);
      expect(divide(10, 2)).toBe(5);
      expect(divide(15, 3)).toBe(5);
    });

    test('すべての関数はアロー関数として実装されている', () => {
      expect(add.toString()).toContain('=>');
      expect(subtract.toString()).toContain('=>');
      expect(multiply.toString()).toContain('=>');
      expect(divide.toString()).toContain('=>');
    });
  });

  describe('引数が1つのアロー関数', () => {
    test('double関数は数値を2倍にする', () => {
      expect(double(5)).toBe(10);
      expect(double(10)).toBe(20);
      expect(double(0)).toBe(0);
    });

    test('square関数は数値を2乗する', () => {
      expect(square(5)).toBe(25);
      expect(square(10)).toBe(100);
      expect(square(3)).toBe(9);
    });

    test('greet関数は挨拶文を返す', () => {
      expect(greet('太郎')).toBe('こんにちは、太郎さん');
      expect(greet('花子')).toBe('こんにちは、花子さん');
    });

    test('関数はアロー関数として実装されている', () => {
      expect(double.toString()).toContain('=>');
      expect(square.toString()).toContain('=>');
      expect(greet.toString()).toContain('=>');
    });
  });

  describe('引数がないアロー関数', () => {
    test('getRandomNumber関数は0以上1未満の数値を返す', () => {
      const result = getRandomNumber();
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1);
    });

    test('getCurrentTime関数は文字列を返す', () => {
      const result = getCurrentTime();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    test('関数はアロー関数として実装されている', () => {
      expect(getRandomNumber.toString()).toContain('=>');
      expect(getCurrentTime.toString()).toContain('=>');
    });
  });

  describe('複数行の処理を含むアロー関数', () => {
    test('processNumber関数は正しく計算する', () => {
      expect(processNumber(5)).toBe(400);
      // (5 * 2 + 10)^2 = (10 + 10)^2 = 20^2 = 400

      expect(processNumber(0)).toBe(100);
      // (0 * 2 + 10)^2 = 10^2 = 100

      expect(processNumber(10)).toBe(900);
      // (10 * 2 + 10)^2 = 30^2 = 900
    });

    test('関数はアロー関数として実装されている', () => {
      expect(processNumber.toString()).toContain('=>');
    });
  });

  describe('オブジェクトを返すアロー関数', () => {
    test('makePerson関数はオブジェクトを返す', () => {
      const person = makePerson('太郎', 25);
      expect(person).toEqual({ name: '太郎', age: 25 });

      const person2 = makePerson('花子', 30);
      expect(person2).toEqual({ name: '花子', age: 30 });
    });

    test('makePoint関数はオブジェクトを返す', () => {
      const point = makePoint(10, 20);
      expect(point).toEqual({ x: 10, y: 20 });

      const point2 = makePoint(0, 0);
      expect(point2).toEqual({ x: 0, y: 0 });
    });

    test('関数はアロー関数として実装されている', () => {
      expect(makePerson.toString()).toContain('=>');
      expect(makePoint.toString()).toContain('=>');
    });
  });

  describe('配列メソッドでのアロー関数の使用', () => {
    test('map()でアロー関数を使って配列を変換できる', () => {
      const numbers = [1, 2, 3, 4, 5];
      const doubled = numbers.map(n => n * 2);
      expect(doubled).toEqual([2, 4, 6, 8, 10]);
    });

    test('filter()でアロー関数を使って配列を絞り込める', () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const evens = numbers.filter(n => n % 2 === 0);
      expect(evens).toEqual([2, 4, 6, 8, 10]);
    });

    test('reduce()でアロー関数を使って配列を集約できる', () => {
      const numbers = [1, 2, 3, 4, 5];
      const sum = numbers.reduce((acc, n) => acc + n, 0);
      expect(sum).toBe(15);
    });
  });

  describe('メソッドチェーンでのアロー関数', () => {
    test('filter()とmap()を組み合わせてデータを処理できる', () => {
      const people = [
        { name: '太郎', active: true },
        { name: '花子', active: true },
        { name: '一郎', active: false }
      ];

      const activeNames = people
        .filter(person => person.active)
        .map(person => person.name);

      expect(activeNames).toEqual(['太郎', '花子']);
    });

    test('複数のメソッドを連鎖して複雑な処理ができる', () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      const result = numbers
        .filter(n => n % 2 === 0)
        .map(n => n * 2)
        .reduce((sum, n) => sum + n, 0);

      expect(result).toBe(60);
    });
  });

  describe('実践例：オブジェクト配列の作成', () => {
    test('文字列配列からオブジェクト配列を作成できる', () => {
      const names = ['太郎', '花子'];
      const users = names.map((name, index) => ({
        id: index + 1,
        name: name
      }));

      expect(users).toEqual([
        { id: 1, name: '太郎' },
        { id: 2, name: '花子' }
      ]);
    });
  });

  describe('実践例：ショッピングカート', () => {
    test('商品に小計を追加できる', () => {
      const products = [
        { name: 'りんご', price: 100, quantity: 3 }
      ];

      const withSubtotal = products.map(product => ({
        ...product,
        subtotal: product.price * product.quantity
      }));

      expect(withSubtotal[0].subtotal).toBe(300);
    });

    test('カート全体の合計を計算できる', () => {
      const products = [
        { price: 100, quantity: 3, subtotal: 300 },
        { price: 80, quantity: 5, subtotal: 400 }
      ];

      const total = products.reduce((sum, product) => sum + product.subtotal, 0);

      expect(total).toBe(700);
    });

    test('条件に合う商品の合計を計算できる', () => {
      const products = [
        { name: 'りんご', price: 100, quantity: 3 },
        { name: 'バナナ', price: 80, quantity: 5 },
        { name: 'オレンジ', price: 120, quantity: 2 }
      ];

      const expensiveTotal = products
        .filter(product => product.price >= 100)
        .reduce((sum, product) => sum + product.price * product.quantity, 0);

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
      expect(result[0].name).toBe('花子');
      expect(result[0].average).toBeCloseTo(92.33, 1);
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

  describe('アロー関数の構文チェック', () => {
    test('すべての関数がアロー関数として定義されている', () => {
      const functions = [
        add, subtract, multiply, divide,
        double, square, greet,
        getRandomNumber, getCurrentTime,
        processNumber, makePerson, makePoint
      ];

      functions.forEach(func => {
        expect(func.toString()).toContain('=>');
      });
    });
  });

  describe('エッジケースのテスト', () => {
    test('0や負の数の処理', () => {
      expect(add(0, 0)).toBe(0);
      expect(add(-5, 5)).toBe(0);
      expect(multiply(-2, 3)).toBe(-6);
      expect(double(-5)).toBe(-10);
    });

    test('空配列の処理', () => {
      const empty = [];
      const doubled = empty.map(n => n * 2);
      expect(doubled).toEqual([]);

      const filtered = empty.filter(n => n > 0);
      expect(filtered).toEqual([]);

      const sum = empty.reduce((acc, n) => acc + n, 0);
      expect(sum).toBe(0);
    });
  });
});
