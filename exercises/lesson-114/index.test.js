/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 114 - 関数から関数を呼び出す', () => {
  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    document.documentElement.innerHTML = html;

    const script = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
    eval(script);
  });

  test('getInputName関数が定義されている', () => {
    expect(typeof window.getInputName).toBe('function');
  });

  test('getInputMessage関数が定義されている', () => {
    expect(typeof window.getInputMessage).toBe('function');
  });

  test('createHeader関数が定義されている', () => {
    expect(typeof window.createHeader).toBe('function');
  });

  test('createFooter関数が定義されている', () => {
    expect(typeof window.createFooter).toBe('function');
  });

  test('createCard関数が定義されている', () => {
    expect(typeof window.createCard).toBe('function');
  });

  test('displayCard関数が定義されている', () => {
    expect(typeof window.displayCard).toBe('function');
  });

  test('createHeader("太郎")はヘッダー文字列を返す', () => {
    const header = window.createHeader('太郎');
    expect(header).toContain('太郎');
  });

  test('createFooter()はフッター文字列を返す', () => {
    const footer = window.createFooter();
    expect(typeof footer).toBe('string');
    expect(footer.length).toBeGreaterThan(0);
  });

  test('createCard("太郎", "ありがとう")はヘッダー、メッセージ、フッターを含む', () => {
    const card = window.createCard('太郎', 'ありがとう');
    expect(card).toContain('太郎');
    expect(card).toContain('ありがとう');
  });

  test('displayCard()を呼ぶと、カードが表示される', () => {
    document.getElementById('nameInput').value = '太郎';
    document.getElementById('messageInput').value = 'ありがとう';

    window.displayCard();

    const output = document.getElementById('output');
    expect(output.textContent).toContain('太郎');
    expect(output.textContent).toContain('ありがとう');
  });

  test('HTMLにnameInputが存在する', () => {
    expect(document.getElementById('nameInput')).not.toBeNull();
  });

  test('HTMLにmessageInputが存在する', () => {
    expect(document.getElementById('messageInput')).not.toBeNull();
  });

  test('HTMLにoutputが存在する', () => {
    expect(document.getElementById('output')).not.toBeNull();
  });
});
