import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 067: フォームイベント', () => {
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

  it('registerForm要素が存在する', () => {
    const registerForm = document.getElementById('registerForm');
    expect(registerForm).not.toBeNull();
    expect(registerForm.tagName).toBe('FORM');
  });

  it('emailInput要素が存在する', () => {
    const emailInput = document.getElementById('emailInput');
    expect(emailInput).not.toBeNull();
  });

  it('passwordInput要素が存在する', () => {
    const passwordInput = document.getElementById('passwordInput');
    expect(passwordInput).not.toBeNull();
  });

  it('submitButton要素が存在する', () => {
    const submitButton = document.getElementById('submitButton');
    expect(submitButton).not.toBeNull();
  });

  it('emailError要素が存在する', () => {
    const emailError = document.getElementById('emailError');
    expect(emailError).not.toBeNull();
  });

  it('passwordError要素が存在する', () => {
    const passwordError = document.getElementById('passwordError');
    expect(passwordError).not.toBeNull();
  });

  it('result要素が存在する', () => {
    const result = document.getElementById('result');
    expect(result).not.toBeNull();
  });

  it('メールアドレス入力欄がフォーカスを得たとき背景色がlightyellowになる', () => {
    const emailInput = document.getElementById('emailInput');

    const focusEvent = new window.FocusEvent('focus', {
      bubbles: true,
    });
    emailInput.dispatchEvent(focusEvent);

    expect(emailInput.style.backgroundColor).toBe('lightyellow');
  });

  it('メールアドレス入力欄がフォーカスを失ったとき背景色がwhiteになる', () => {
    const emailInput = document.getElementById('emailInput');

    // まずfocusイベントを発火
    const focusEvent = new window.FocusEvent('focus', {
      bubbles: true,
    });
    emailInput.dispatchEvent(focusEvent);

    // blurイベントを発火
    const blurEvent = new window.FocusEvent('blur', {
      bubbles: true,
    });
    emailInput.dispatchEvent(blurEvent);

    expect(emailInput.style.backgroundColor).toBe('white');
  });

  it('パスワードが6文字未満の場合エラーメッセージが表示される', () => {
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');

    passwordInput.value = 'abc';
    const inputEvent = new window.Event('input', {
      bubbles: true,
    });
    passwordInput.dispatchEvent(inputEvent);

    expect(passwordError.textContent).toContain('6文字以上');
  });

  it('パスワードが6文字以上の場合エラーメッセージが消える', () => {
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');

    // まず5文字でエラーを出す
    passwordInput.value = 'abcde';
    let inputEvent = new window.Event('input', {
      bubbles: true,
    });
    passwordInput.dispatchEvent(inputEvent);

    // 6文字にする
    passwordInput.value = 'abcdef';
    inputEvent = new window.Event('input', {
      bubbles: true,
    });
    passwordInput.dispatchEvent(inputEvent);

    expect(passwordError.textContent).toBe('');
  });

  it('メールアドレスに@が含まれていない場合送信が中止される', () => {
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const emailError = document.getElementById('emailError');
    const result = document.getElementById('result');

    emailInput.value = 'testexample.com';
    passwordInput.value = 'password123';

    const submitEvent = new window.Event('submit', {
      bubbles: true,
      cancelable: true,
    });
    registerForm.dispatchEvent(submitEvent);

    expect(emailError.textContent).toContain('正しいメールアドレス');
    expect(result.textContent).toBe('');
  });

  it('すべての条件を満たす場合登録が完了する', () => {
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const result = document.getElementById('result');

    emailInput.value = 'test@example.com';
    passwordInput.value = 'password123';

    const submitEvent = new window.Event('submit', {
      bubbles: true,
      cancelable: true,
    });
    registerForm.dispatchEvent(submitEvent);

    expect(result.textContent).toContain('登録が完了しました');
  });

  it('送信成功後フォームがリセットされる', () => {
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');

    emailInput.value = 'test@example.com';
    passwordInput.value = 'password123';

    const submitEvent = new window.Event('submit', {
      bubbles: true,
      cancelable: true,
    });
    registerForm.dispatchEvent(submitEvent);

    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });
});
