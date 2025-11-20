import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 057: 早期リターン', () => {
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

  it('validateForm関数が存在する', () => {
    expect(typeof window.validateForm).toBe('function');
  });

  it('名前が空の場合、エラーメッセージが表示される', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '';
    ageInput.value = '20';
    emailInput.value = 'test@example.com';

    window.validateForm();

    expect(result.textContent).toBe('名前を入力してください');
  });

  it('年齢が空の場合、エラーメッセージが表示される', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '太郎';
    ageInput.value = '';
    emailInput.value = 'test@example.com';

    window.validateForm();

    expect(result.textContent).toBe('年齢を入力してください');
  });

  it('年齢が18未満の場合、エラーメッセージが表示される', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '太郎';
    ageInput.value = '15';
    emailInput.value = 'test@example.com';

    window.validateForm();

    expect(result.textContent).toBe('18歳以上である必要があります');
  });

  it('メールアドレスが空の場合、エラーメッセージが表示される', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '太郎';
    ageInput.value = '20';
    emailInput.value = '';

    window.validateForm();

    expect(result.textContent).toBe('メールアドレスを入力してください');
  });

  it('メールアドレスに@が含まれていない場合、エラーメッセージが表示される', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '太郎';
    ageInput.value = '20';
    emailInput.value = 'testexample.com';

    window.validateForm();

    expect(result.textContent).toBe('有効なメールアドレスを入力してください');
  });

  it('すべての入力が正しい場合、登録成功メッセージが表示される', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '太郎';
    ageInput.value = '20';
    emailInput.value = 'test@example.com';

    window.validateForm();

    expect(result.textContent).toBe('登録成功！');
  });

  it('年齢が18の場合（境界値）、登録成功する', () => {
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const emailInput = document.getElementById('emailInput');
    const result = document.getElementById('result');

    nameInput.value = '太郎';
    ageInput.value = '18';
    emailInput.value = 'test@example.com';

    window.validateForm();

    expect(result.textContent).toBe('登録成功！');
  });
});
