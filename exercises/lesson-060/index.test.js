import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 060: 条件分岐のリファクタリング', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );
    const js = fs.readFileSync(
      path.resolve(__dirname, 'script.js'),
      'utf-8'
    );

    dom = new JSDOM(html, {
      runScripts: 'outside-only',
      resources: 'usable'
    });
    document = dom.window.document;
    window = dom.window;

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
  });

  it('nameInput要素が存在する', () => {
    const input = document.getElementById('nameInput');
    expect(input).not.toBeNull();
  });

  it('ageInput要素が存在する', () => {
    const input = document.getElementById('ageInput');
    expect(input).not.toBeNull();
  });

  it('emailInput要素が存在する', () => {
    const input = document.getElementById('emailInput');
    expect(input).not.toBeNull();
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('showError関数が存在する', () => {
    expect(typeof window.showError).toBe('function');
  });

  it('showSuccess関数が存在する', () => {
    expect(typeof window.showSuccess).toBe('function');
  });

  it('checkInput関数が存在する', () => {
    expect(typeof window.checkInput).toBe('function');
  });

  it('名前が空の場合、エラーメッセージが表示される', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '';
    ageInput.value = '20';
    emailInput.value = 'test@example.com';

    window.checkInput();

    expect(result.textContent).toBe('名前を入力してください');
    expect(result.style.color).toBe('red');
  });

  it('年齢が空の場合、エラーメッセージが表示される', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '太郎';
    ageInput.value = '';
    emailInput.value = 'test@example.com';

    window.checkInput();

    expect(result.textContent).toBe('年齢を入力してください');
    expect(result.style.color).toBe('red');
  });

  it('年齢が18未満の場合、エラーメッセージが表示される', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '太郎';
    ageInput.value = '15';
    emailInput.value = 'test@example.com';

    window.checkInput();

    expect(result.textContent).toBe('18歳以上である必要があります');
    expect(result.style.color).toBe('red');
  });

  it('メールアドレスが空の場合、エラーメッセージが表示される', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '太郎';
    ageInput.value = '20';
    emailInput.value = '';

    window.checkInput();

    expect(result.textContent).toBe('メールアドレスを入力してください');
    expect(result.style.color).toBe('red');
  });

  it('メールアドレスに@が含まれていない場合、エラーメッセージが表示される', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '太郎';
    ageInput.value = '20';
    emailInput.value = 'testexample.com';

    window.checkInput();

    expect(result.textContent).toBe('有効なメールアドレスを入力してください');
    expect(result.style.color).toBe('red');
  });

  it('すべての入力が正しい場合、成功メッセージが表示される', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '太郎';
    ageInput.value = '20';
    emailInput.value = 'test@example.com';

    window.checkInput();

    expect(result.textContent).toBe('登録成功！');
    expect(result.style.color).toBe('green');
  });

  it('showError関数が正しくエラーメッセージを表示する', () => {
    const result = document.getElementById('result');

    window.showError('テストエラー');

    expect(result.textContent).toBe('テストエラー');
    expect(result.style.color).toBe('red');
  });

  it('showSuccess関数が正しく成功メッセージを表示する', () => {
    const result = document.getElementById('result');

    window.showSuccess('テスト成功');

    expect(result.textContent).toBe('テスト成功');
    expect(result.style.color).toBe('green');
  });
});
