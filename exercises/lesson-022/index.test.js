import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 022: DOM操作の復習', () => {
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

  it('HTMLにid="title"の要素が存在する', () => {
    const element = document.getElementById('title');
    expect(element).not.toBeNull();
  });

  it('HTMLにid="description"の要素が存在する', () => {
    const element = document.getElementById('description');
    expect(element).not.toBeNull();
  });

  it('HTMLにid="status"の要素が存在する', () => {
    const element = document.getElementById('status');
    expect(element).not.toBeNull();
  });

  it('id="title"の初期値が"DOM操作の練習"である', () => {
    const element = document.getElementById('title');
    expect(element.textContent).toBe('DOM操作の練習');
  });

  it('id="description"の初期値が"説明文"である', () => {
    const element = document.getElementById('description');
    expect(element.textContent).toBe('説明文');
  });

  it('id="status"の初期値が"待機中"である', () => {
    const element = document.getElementById('status');
    expect(element.textContent).toBe('待機中');
  });

  it('updateTitle関数が定義されている', () => {
    expect(typeof window.updateTitle).toBe('function');
  });

  it('updateDescription関数が定義されている', () => {
    expect(typeof window.updateDescription).toBe('function');
  });

  it('updateStatus関数が定義されている', () => {
    expect(typeof window.updateStatus).toBe('function');
  });

  it('3つのボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('1つ目のボタンのonclick属性にupdateTitleが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[0].getAttribute('onclick');
    expect(onclick).toContain('updateTitle');
  });

  it('2つ目のボタンのonclick属性にupdateDescriptionが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[1].getAttribute('onclick');
    expect(onclick).toContain('updateDescription');
  });

  it('3つ目のボタンのonclick属性にupdateStatusが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[2].getAttribute('onclick');
    expect(onclick).toContain('updateStatus');
  });

  it('updateTitle関数を実行するとtextContentが変更される', () => {
    window.updateTitle();
    const element = document.getElementById('title');
    expect(element.textContent).not.toBe('DOM操作の練習');
  });

  it('updateTitle関数を実行するとstyle.colorが設定される', () => {
    window.updateTitle();
    const element = document.getElementById('title');
    expect(element.style.color).toBe('blue');
  });

  it('updateTitle関数を実行するとstyle.fontSizeが24pxに設定される', () => {
    window.updateTitle();
    const element = document.getElementById('title');
    expect(element.style.fontSize).toBe('24px');
  });

  it('updateDescription関数を実行するとtextContentが変更される', () => {
    window.updateDescription();
    const element = document.getElementById('description');
    expect(element.textContent).not.toBe('説明文');
  });

  it('updateDescription関数を実行するとstyle.backgroundColorが設定される', () => {
    window.updateDescription();
    const element = document.getElementById('description');
    expect(element.style.backgroundColor).toBe('yellow');
  });

  it('updateStatus関数を実行するとtextContentが"実行中"になる', () => {
    window.updateStatus();
    const element = document.getElementById('status');
    expect(element.textContent).toBe('実行中');
  });

  it('updateStatus関数を実行するとstyle.colorが設定される', () => {
    window.updateStatus();
    const element = document.getElementById('status');
    expect(element.style.color).toBe('green');
  });
});
