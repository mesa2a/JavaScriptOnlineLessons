import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 058: 真偽値の活用', () => {
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

  it('status要素が存在する', () => {
    const status = document.getElementById('status');
    expect(status).not.toBeNull();
  });

  it('light要素が存在する', () => {
    const light = document.getElementById('light');
    expect(light).not.toBeNull();
  });

  it('toggleLight関数が存在する', () => {
    expect(typeof window.toggleLight).toBe('function');
  });

  it('isLightOn変数が存在する', () => {
    expect(typeof window.isLightOn).toBe('boolean');
  });

  it('初期状態でライトがOFFになっている', () => {
    const status = document.getElementById('status');
    const light = document.getElementById('light');

    expect(status.textContent).toBe('ライトOFF');
    expect(light.style.backgroundColor).toBe('gray');
  });

  it('toggleLight()を1回呼ぶとライトがONになる', () => {
    const status = document.getElementById('status');
    const light = document.getElementById('light');

    window.toggleLight();

    expect(window.isLightOn).toBe(true);
    expect(status.textContent).toBe('ライトON');
    expect(light.style.backgroundColor).toBe('yellow');
  });

  it('toggleLight()を2回呼ぶとライトがOFFになる', () => {
    const status = document.getElementById('status');
    const light = document.getElementById('light');

    window.toggleLight();
    window.toggleLight();

    expect(window.isLightOn).toBe(false);
    expect(status.textContent).toBe('ライトOFF');
    expect(light.style.backgroundColor).toBe('gray');
  });

  it('toggleLight()を3回呼ぶとライトがONになる', () => {
    const status = document.getElementById('status');
    const light = document.getElementById('light');

    window.toggleLight();
    window.toggleLight();
    window.toggleLight();

    expect(window.isLightOn).toBe(true);
    expect(status.textContent).toBe('ライトON');
    expect(light.style.backgroundColor).toBe('yellow');
  });

  it('toggleLight()を複数回呼んでもON/OFFが交互に切り替わる', () => {
    const status = document.getElementById('status');
    const light = document.getElementById('light');

    // 4回呼び出し
    window.toggleLight();
    window.toggleLight();
    window.toggleLight();
    window.toggleLight();

    // 4回目（偶数回）なのでOFFになる
    expect(window.isLightOn).toBe(false);
    expect(status.textContent).toBe('ライトOFF');
    expect(light.style.backgroundColor).toBe('gray');
  });
});
