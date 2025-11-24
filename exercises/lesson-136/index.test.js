import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 136: プロパティ変更', () => {
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

  it('display要素が存在する', () => {
    const display = document.getElementById('display');
    expect(display).not.toBeNull();
  });

  it('updateNameボタンが存在する', () => {
    const updateName = document.getElementById('updateName');
    expect(updateName).not.toBeNull();
    expect(updateName.tagName).toBe('BUTTON');
  });

  it('addEmailボタンが存在する', () => {
    const addEmail = document.getElementById('addEmail');
    expect(addEmail).not.toBeNull();
    expect(addEmail.tagName).toBe('BUTTON');
  });

  it('deleteCityボタンが存在する', () => {
    const deleteCity = document.getElementById('deleteCity');
    expect(deleteCity).not.toBeNull();
    expect(deleteCity.tagName).toBe('BUTTON');
  });

  it('初期状態でstudentオブジェクトの情報が表示される', () => {
    const display = document.getElementById('display');
    expect(display.textContent).toContain('田中');
    expect(display.textContent).toContain('18');
    expect(display.textContent).toContain('大阪');
  });

  it('updateNameボタンをクリックすると名前が変更される', () => {
    const updateName = document.getElementById('updateName');
    const display = document.getElementById('display');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    updateName.dispatchEvent(clickEvent);

    expect(display.textContent).toContain('鈴木');
    expect(display.textContent).not.toContain('田中');
  });

  it('addEmailボタンをクリックするとemailプロパティが追加される', () => {
    const addEmail = document.getElementById('addEmail');
    const display = document.getElementById('display');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    addEmail.dispatchEvent(clickEvent);

    expect(display.textContent).toContain('suzuki@example.com');
  });

  it('deleteCityボタンをクリックするとcityプロパティが削除される', () => {
    const deleteCity = document.getElementById('deleteCity');
    const display = document.getElementById('display');

    // 初期状態で大阪が表示されていることを確認
    expect(display.textContent).toContain('大阪');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    deleteCity.dispatchEvent(clickEvent);

    // 削除後は大阪が表示されないことを確認
    expect(display.textContent).not.toContain('大阪');
  });

  it('複数のボタンを順番にクリックしても正しく動作する', () => {
    const updateName = document.getElementById('updateName');
    const addEmail = document.getElementById('addEmail');
    const deleteCity = document.getElementById('deleteCity');
    const display = document.getElementById('display');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    // 名前を変更
    updateName.dispatchEvent(clickEvent);
    expect(display.textContent).toContain('鈴木');

    // メールを追加
    addEmail.dispatchEvent(clickEvent);
    expect(display.textContent).toContain('suzuki@example.com');

    // 都市を削除
    deleteCity.dispatchEvent(clickEvent);
    expect(display.textContent).not.toContain('大阪');

    // 最終的に鈴木とメールアドレスは残っている
    expect(display.textContent).toContain('鈴木');
    expect(display.textContent).toContain('suzuki@example.com');
  });
});
