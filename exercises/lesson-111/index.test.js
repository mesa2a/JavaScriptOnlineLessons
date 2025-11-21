/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 111 - 引数を受け取る', () => {
  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    document.documentElement.innerHTML = html;

    const script = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
    eval(script);
  });

  test('greet関数が定義されている', () => {
    expect(typeof window.greet).toBe('function');
  });

  test('showGreeting関数が定義されている', () => {
    expect(typeof window.showGreeting).toBe('function');
  });

  test('greet("morning", "太郎")を呼ぶと、朝のあいさつが表示される', () => {
    window.greet('morning', '太郎');
    const output = document.getElementById('output');
    expect(output.textContent).toContain('太郎');
    expect(output.textContent.toLowerCase()).toContain('おはよう');
  });

  test('greet("afternoon", "花子")を呼ぶと、昼のあいさつが表示される', () => {
    window.greet('afternoon', '花子');
    const output = document.getElementById('output');
    expect(output.textContent).toContain('花子');
    expect(output.textContent).toContain('こんにちは');
  });

  test('greet("evening", "次郎")を呼ぶと、夜のあいさつが表示される', () => {
    window.greet('evening', '次郎');
    const output = document.getElementById('output');
    expect(output.textContent).toContain('次郎');
    expect(output.textContent).toContain('こんばんは');
  });

  test('showGreeting関数を呼ぶと、入力された名前と選択された時間帯でgreetが呼ばれる', () => {
    document.getElementById('nameInput').value = 'テスト';
    document.getElementById('timeSelect').value = 'morning';

    window.showGreeting();

    const output = document.getElementById('output');
    expect(output.textContent).toContain('テスト');
  });

  test('HTMLにnameInputが存在する', () => {
    const input = document.getElementById('nameInput');
    expect(input).not.toBeNull();
    expect(input.tagName.toLowerCase()).toBe('input');
  });

  test('HTMLにtimeSelectが存在する', () => {
    const select = document.getElementById('timeSelect');
    expect(select).not.toBeNull();
    expect(select.tagName.toLowerCase()).toBe('select');
  });

  test('HTMLにoutputが存在する', () => {
    const output = document.getElementById('output');
    expect(output).not.toBeNull();
  });
});
