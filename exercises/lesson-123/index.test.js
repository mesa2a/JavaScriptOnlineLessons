/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 123: 無名関数の活用', () => {
  let html;
  let scriptContent;

  beforeAll(() => {
    html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
  });

  beforeEach(() => {
    document.documentElement.innerHTML = html;
    jest.useFakeTimers();
    eval(scriptContent);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('カウンターアプリ', () => {
    test('グローバル変数countが定義されている', () => {
      expect(typeof count).toBe('number');
      expect(count).toBe(0);
    });

    test('upBtnをクリックするとカウントが増える', () => {
      const upBtn = document.getElementById('upBtn');
      const display = document.getElementById('counterDisplay');

      upBtn.click();
      expect(display.textContent).toBe('1');

      upBtn.click();
      expect(display.textContent).toBe('2');
    });

    test('downBtnをクリックするとカウントが減る', () => {
      const downBtn = document.getElementById('downBtn');
      const display = document.getElementById('counterDisplay');

      downBtn.click();
      expect(display.textContent).toBe('-1');

      downBtn.click();
      expect(display.textContent).toBe('-2');
    });

    test('resetBtnをクリックするとカウントが0になる', () => {
      const upBtn = document.getElementById('upBtn');
      const resetBtn = document.getElementById('resetBtn');
      const display = document.getElementById('counterDisplay');

      upBtn.click();
      upBtn.click();
      expect(display.textContent).toBe('2');

      resetBtn.click();
      expect(display.textContent).toBe('0');
    });
  });

  describe('リアルタイム入力チェック', () => {
    test('名前が3文字未満の場合エラーメッセージを表示', () => {
      const nameInput = document.getElementById('nameInput');
      const nameError = document.getElementById('nameError');

      nameInput.value = 'ab';
      nameInput.dispatchEvent(new Event('input'));

      expect(nameError.textContent).toContain('3文字以上');
    });

    test('名前が3文字以上の場合エラーを消す', () => {
      const nameInput = document.getElementById('nameInput');
      const nameError = document.getElementById('nameError');

      nameInput.value = 'abc';
      nameInput.dispatchEvent(new Event('input'));

      expect(nameError.textContent).toBe('');
    });

    test('メールに@がない場合エラーメッセージを表示', () => {
      const emailInput = document.getElementById('emailInput');
      const emailError = document.getElementById('emailError');

      emailInput.value = 'test.com';
      emailInput.dispatchEvent(new Event('input'));

      expect(emailError.textContent).toContain('@');
    });

    test('メールに.がない場合エラーメッセージを表示', () => {
      const emailInput = document.getElementById('emailInput');
      const emailError = document.getElementById('emailError');

      emailInput.value = 'test@com';
      emailInput.dispatchEvent(new Event('input'));

      expect(emailError.textContent).toContain('.');
    });

    test('メールが正しい形式の場合エラーを消す', () => {
      const emailInput = document.getElementById('emailInput');
      const emailError = document.getElementById('emailError');

      emailInput.value = 'test@example.com';
      emailInput.dispatchEvent(new Event('input'));

      expect(emailError.textContent).toBe('');
    });

    test('空文字の場合はエラーを表示しない', () => {
      const nameInput = document.getElementById('nameInput');
      const nameError = document.getElementById('nameError');

      nameInput.value = '';
      nameInput.dispatchEvent(new Event('input'));

      expect(nameError.textContent).toBe('');
    });

    test('送信ボタンで正しい入力の場合成功メッセージを表示', () => {
      const nameInput = document.getElementById('nameInput');
      const emailInput = document.getElementById('emailInput');
      const submitBtn = document.getElementById('submitBtn');
      const successMessage = document.getElementById('successMessage');

      nameInput.value = 'testuser';
      emailInput.value = 'test@example.com';

      submitBtn.click();

      expect(successMessage.classList.contains('show')).toBe(true);
    });

    test('成功メッセージが3秒後に消える', () => {
      const nameInput = document.getElementById('nameInput');
      const emailInput = document.getElementById('emailInput');
      const submitBtn = document.getElementById('submitBtn');
      const successMessage = document.getElementById('successMessage');

      nameInput.value = 'testuser';
      emailInput.value = 'test@example.com';

      submitBtn.click();
      expect(successMessage.classList.contains('show')).toBe(true);

      jest.advanceTimersByTime(3000);
      expect(successMessage.classList.contains('show')).toBe(false);
    });
  });

  describe('マウスイベント', () => {
    test('マウスオーバーで背景色が変わる', () => {
      const hoverBtn = document.getElementById('hoverBtn');

      hoverBtn.dispatchEvent(new Event('mouseover'));

      expect(hoverBtn.style.backgroundColor).toBe('rgb(33, 150, 243)');
    });

    test('マウスオーバーでメッセージが表示される', () => {
      const hoverBtn = document.getElementById('hoverBtn');
      const hoverMessage = document.getElementById('hoverMessage');

      hoverBtn.dispatchEvent(new Event('mouseover'));

      expect(hoverMessage.textContent).toContain('マウスが乗っています');
      expect(hoverMessage.classList.contains('show')).toBe(true);
    });

    test('マウスアウトで背景色が戻る', () => {
      const hoverBtn = document.getElementById('hoverBtn');

      hoverBtn.dispatchEvent(new Event('mouseover'));
      hoverBtn.dispatchEvent(new Event('mouseout'));

      expect(hoverBtn.style.backgroundColor).toBe('');
    });

    test('マウスアウトでメッセージが変わる', () => {
      const hoverBtn = document.getElementById('hoverBtn');
      const hoverMessage = document.getElementById('hoverMessage');

      hoverBtn.dispatchEvent(new Event('mouseout'));

      expect(hoverMessage.textContent).toContain('マウスが離れました');
    });

    test('マウスアウトのメッセージが1秒後に消える', () => {
      const hoverBtn = document.getElementById('hoverBtn');
      const hoverMessage = document.getElementById('hoverMessage');

      hoverBtn.dispatchEvent(new Event('mouseout'));

      jest.advanceTimersByTime(1000);
      expect(hoverMessage.classList.contains('show')).toBe(false);
    });

    test('クリックでメッセージが表示される', () => {
      const hoverBtn = document.getElementById('hoverBtn');
      const hoverMessage = document.getElementById('hoverMessage');

      hoverBtn.click();

      expect(hoverMessage.textContent).toContain('クリックされました');
      expect(hoverMessage.classList.contains('show')).toBe(true);
    });
  });

  describe('無名関数の使用確認', () => {
    test('addEventListener内で無名関数を使用している', () => {
      // addEventListener の後に function() が続くパターン
      const pattern = /addEventListener\s*\(\s*['"][^'"]+['"]\s*,\s*function\s*\(/g;
      const matches = scriptContent.match(pattern);

      expect(matches).not.toBeNull();
      expect(matches.length).toBeGreaterThanOrEqual(8);
    });

    test('関数宣言や名前付き関数式を使っていない', () => {
      // function name() のパターンがないことを確認
      const declarationPattern = /^function\s+\w+\s*\(/m;
      expect(scriptContent).not.toMatch(declarationPattern);

      // const name = function name() のパターンがないことを確認
      const namedExpressionPattern = /const\s+\w+\s*=\s*function\s+\w+\s*\(/;
      expect(scriptContent).not.toMatch(namedExpressionPattern);
    });
  });

  describe('統合テスト', () => {
    test('すべての機能が連携して動作する', () => {
      // カウンター
      document.getElementById('upBtn').click();
      expect(document.getElementById('counterDisplay').textContent).toBe('1');

      // 入力チェック
      const nameInput = document.getElementById('nameInput');
      nameInput.value = 'te';
      nameInput.dispatchEvent(new Event('input'));
      expect(document.getElementById('nameError').textContent).toContain('3文字以上');

      // マウスイベント
      const hoverBtn = document.getElementById('hoverBtn');
      hoverBtn.dispatchEvent(new Event('mouseover'));
      expect(hoverBtn.style.backgroundColor).toBe('rgb(33, 150, 243)');
    });
  });
});
