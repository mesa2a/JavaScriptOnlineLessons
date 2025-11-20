import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 030: 複数の入力', () => {
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

    const dom = new JSDOM(html, {
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

  it('HTMLにid="firstName"のinput要素が存在する', () => {
    const element = document.getElementById('firstName');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('INPUT');
  });

  it('HTMLにid="lastName"のinput要素が存在する', () => {
    const element = document.getElementById('lastName');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('INPUT');
  });

  it('HTMLにid="age"のinput要素が存在する', () => {
    const element = document.getElementById('age');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('INPUT');
  });

  it('HTMLにid="city"のinput要素が存在する', () => {
    const element = document.getElementById('city');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('INPUT');
  });

  it('HTMLにid="result1"の要素が存在する', () => {
    const element = document.getElementById('result1');
    expect(element).not.toBeNull();
  });

  it('HTMLにid="result2"の要素が存在する', () => {
    const element = document.getElementById('result2');
    expect(element).not.toBeNull();
  });

  it('showFullName関数が定義されている', () => {
    expect(typeof window.showFullName).toBe('function');
  });

  it('showProfile関数が定義されている', () => {
    expect(typeof window.showProfile).toBe('function');
  });

  it('2つのボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('1つ目のボタンのonclick属性にshowFullNameが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[0].getAttribute('onclick');
    expect(onclick).toContain('showFullName');
  });

  it('2つ目のボタンのonclick属性にshowProfileが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[1].getAttribute('onclick');
    expect(onclick).toContain('showProfile');
  });

  it('showFullName関数を実行すると姓名が表示される', () => {
    document.getElementById('firstName').value = '太郎';
    document.getElementById('lastName').value = '山田';
    window.showFullName();
    const result = document.getElementById('result1');
    expect(result.textContent).toContain('山田');
    expect(result.textContent).toContain('太郎');
  });

  it('showFullName関数は姓+スペース+名の順で表示する', () => {
    document.getElementById('firstName').value = '花子';
    document.getElementById('lastName').value = '佐藤';
    window.showFullName();
    const result = document.getElementById('result1');
    expect(result.textContent).toMatch(/佐藤.*花子/);
  });

  it('showProfile関数を実行するとプロフィールが表示される', () => {
    document.getElementById('firstName').value = '太郎';
    document.getElementById('lastName').value = '山田';
    document.getElementById('age').value = '25';
    document.getElementById('city').value = '東京';
    window.showProfile();
    const result = document.getElementById('result2');
    expect(result.textContent).toContain('山田');
    expect(result.textContent).toContain('太郎');
    expect(result.textContent).toContain('25');
    expect(result.textContent).toContain('東京');
  });

  it('showProfile関数は指定された形式で表示する', () => {
    document.getElementById('firstName').value = '花子';
    document.getElementById('lastName').value = '佐藤';
    document.getElementById('age').value = '30';
    document.getElementById('city').value = '大阪';
    window.showProfile();
    const result = document.getElementById('result2');
    expect(result.textContent).toMatch(/佐藤.*花子.*30.*歳.*大阪/);
  });
});
