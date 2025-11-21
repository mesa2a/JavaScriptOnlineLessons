/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 117: グローバル変数', () => {
  let html;
  let scriptContent;

  beforeAll(() => {
    // HTMLファイルを読み込む
    html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    // スクリプトファイルを読み込む
    scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
  });

  beforeEach(() => {
    // DOMをセットアップ
    document.documentElement.innerHTML = html;

    // グローバル変数をリセット
    global.score = undefined;
    global.history = undefined;

    // スクリプトを実行
    eval(scriptContent);
  });

  describe('グローバル変数の宣言', () => {
    test('scoreがグローバル変数として宣言されている', () => {
      expect(typeof score).toBe('number');
    });

    test('scoreの初期値が0である', () => {
      expect(score).toBe(0);
    });

    test('historyがグローバル変数として宣言されている', () => {
      expect(Array.isArray(history)).toBe(true);
    });

    test('historyの初期値が空配列である', () => {
      expect(history.length).toBe(0);
    });
  });

  describe('addScore関数', () => {
    test('addScore関数が定義されている', () => {
      expect(typeof addScore).toBe('function');
    });

    test('addScore(10)を呼ぶとscoreが10増える', () => {
      addScore(10);
      expect(score).toBe(10);
    });

    test('addScore(50)を呼ぶとscoreが50増える', () => {
      addScore(50);
      expect(score).toBe(50);
    });

    test('addScoreを複数回呼ぶとscoreが累積する', () => {
      addScore(10);
      addScore(20);
      addScore(30);
      expect(score).toBe(60);
    });

    test('addScoreを呼ぶとhistoryに記録が追加される', () => {
      addScore(10);
      expect(history.length).toBe(1);
      expect(history[0].action).toBe('+10点');
    });
  });

  describe('subtractScore関数', () => {
    test('subtractScore関数が定義されている', () => {
      expect(typeof subtractScore).toBe('function');
    });

    test('subtractScore(10)を呼ぶとscoreが10減る', () => {
      addScore(50);
      subtractScore(10);
      expect(score).toBe(40);
    });

    test('subtractScore(50)を呼ぶとscoreが50減る', () => {
      addScore(100);
      subtractScore(50);
      expect(score).toBe(50);
    });

    test('subtractScoreを呼ぶとhistoryに記録が追加される', () => {
      subtractScore(10);
      expect(history.length).toBe(1);
      expect(history[0].action).toBe('-10点');
    });
  });

  describe('resetScore関数', () => {
    test('resetScore関数が定義されている', () => {
      expect(typeof resetScore).toBe('function');
    });

    test('resetScoreを呼ぶとscoreが0になる', () => {
      addScore(100);
      resetScore();
      expect(score).toBe(0);
    });

    test('resetScoreを呼ぶとhistoryが空配列になる', () => {
      addScore(10);
      addScore(20);
      resetScore();
      // リセット後、addHistoryが呼ばれるので1件は残る
      expect(history.length).toBe(1);
      expect(history[0].action).toBe('リセット');
    });
  });

  describe('addHistory関数', () => {
    test('addHistory関数が定義されている', () => {
      expect(typeof addHistory).toBe('function');
    });

    test('addHistoryを呼ぶとhistoryに項目が追加される', () => {
      addHistory('テスト');
      expect(history.length).toBe(1);
    });

    test('追加された項目にtimeプロパティがある', () => {
      addHistory('テスト');
      expect(history[0]).toHaveProperty('time');
    });

    test('追加された項目にactionプロパティがある', () => {
      addHistory('テスト');
      expect(history[0].action).toBe('テスト');
    });

    test('追加された項目にscoreプロパティがある', () => {
      score = 100;
      addHistory('テスト');
      expect(history[0].score).toBe(100);
    });
  });

  describe('updateDisplay関数', () => {
    test('updateDisplay関数が定義されている', () => {
      expect(typeof updateDisplay).toBe('function');
    });

    test('updateDisplayを呼ぶとscoreDisplayが更新される', () => {
      score = 123;
      updateDisplay();
      const scoreDisplay = document.getElementById('scoreDisplay');
      expect(scoreDisplay.textContent).toBe('123');
    });

    test('updateDisplayを呼ぶとhistoryListが更新される', () => {
      history = [
        { time: '12:00:00', action: '+10点', score: 10 }
      ];
      updateDisplay();
      const historyList = document.getElementById('historyList');
      expect(historyList.children.length).toBe(1);
    });
  });

  describe('統合テスト', () => {
    test('一連の操作が正しく動作する', () => {
      addScore(10);
      expect(score).toBe(10);

      addScore(50);
      expect(score).toBe(60);

      subtractScore(20);
      expect(score).toBe(40);

      expect(history.length).toBe(3);

      resetScore();
      expect(score).toBe(0);
      expect(history.length).toBe(1);
      expect(history[0].action).toBe('リセット');
    });
  });
});
