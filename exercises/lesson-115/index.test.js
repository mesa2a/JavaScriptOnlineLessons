/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lesson 115 - デフォルト引数', () => {
  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    document.documentElement.innerHTML = html;

    const script = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
    eval(script);
  });

  test('showMessage関数が定義されている', () => {
    expect(typeof window.showMessage).toBe('function');
  });

  test('displayMessage関数が定義されている', () => {
    expect(typeof window.displayMessage).toBe('function');
  });

  test('showMessage()を引数なしで呼ぶと、デフォルトメッセージが表示される', () => {
    window.showMessage();
    const output = document.getElementById('output');
    expect(output.textContent).toContain('メッセージがありません');
  });

  test('showMessage("テスト")を呼ぶと、指定したメッセージが表示される', () => {
    window.showMessage('テスト');
    const output = document.getElementById('output');
    expect(output.textContent).toContain('テスト');
  });

  test('showMessage("成功", "success")を呼ぶと、成功メッセージが表示される', () => {
    window.showMessage('成功', 'success');
    const output = document.getElementById('output');
    expect(output.textContent).toContain('成功');
    expect(output.textContent).toContain('✅');
  });

  test('showMessage("エラー", "error")を呼ぶと、エラーメッセージが表示される', () => {
    window.showMessage('エラー', 'error');
    const output = document.getElementById('output');
    expect(output.textContent).toContain('エラー');
    expect(output.textContent).toContain('❌');
  });

  test('showMessage("情報", "info")を呼ぶと、情報メッセージが表示される', () => {
    window.showMessage('情報', 'info');
    const output = document.getElementById('output');
    expect(output.textContent).toContain('情報');
    expect(output.textContent).toContain('ℹ️');
  });

  test('displayMessage()を呼ぶと、入力値でshowMessageが呼ばれる', () => {
    document.getElementById('messageInput').value = 'テスト';
    document.getElementById('typeSelect').value = 'success';

    window.displayMessage();

    const output = document.getElementById('output');
    expect(output.textContent).toContain('テスト');
  });

  test('メッセージが空の場合、デフォルト値が使われる', () => {
    document.getElementById('messageInput').value = '';
    document.getElementById('typeSelect').value = 'info';

    window.displayMessage();

    const output = document.getElementById('output');
    expect(output.textContent).toContain('メッセージがありません');
  });

  test('HTMLにmessageInputが存在する', () => {
    expect(document.getElementById('messageInput')).not.toBeNull();
  });

  test('HTMLにtypeSelectが存在する', () => {
    expect(document.getElementById('typeSelect')).not.toBeNull();
  });

  test('HTMLにoutputが存在する', () => {
    expect(document.getElementById('output')).not.toBeNull();
  });
});
