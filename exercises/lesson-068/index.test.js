import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 068: eventオブジェクト', () => {
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

  it('button1要素が存在する', () => {
    const button1 = document.getElementById('button1');
    expect(button1).not.toBeNull();
    expect(button1.tagName).toBe('BUTTON');
  });

  it('button2要素が存在する', () => {
    const button2 = document.getElementById('button2');
    expect(button2).not.toBeNull();
    expect(button2.tagName).toBe('BUTTON');
  });

  it('button3要素が存在する', () => {
    const button3 = document.getElementById('button3');
    expect(button3).not.toBeNull();
    expect(button3.tagName).toBe('BUTTON');
  });

  it('eventType要素が存在する', () => {
    const eventType = document.getElementById('eventType');
    expect(eventType).not.toBeNull();
  });

  it('targetId要素が存在する', () => {
    const targetId = document.getElementById('targetId');
    expect(targetId).not.toBeNull();
  });

  it('buttonText要素が存在する', () => {
    const buttonText = document.getElementById('buttonText');
    expect(buttonText).not.toBeNull();
  });

  it('button1をクリックするとevent.typeが表示される', () => {
    const button1 = document.getElementById('button1');
    const eventType = document.getElementById('eventType');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    button1.dispatchEvent(clickEvent);

    expect(eventType.textContent).toBe('click');
  });

  it('button1をクリックするとevent.target.idが表示される', () => {
    const button1 = document.getElementById('button1');
    const targetId = document.getElementById('targetId');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    button1.dispatchEvent(clickEvent);

    expect(targetId.textContent).toBe('button1');
  });

  it('button1をクリックするとevent.target.textContentが表示される', () => {
    const button1 = document.getElementById('button1');
    const buttonText = document.getElementById('buttonText');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    button1.dispatchEvent(clickEvent);

    expect(buttonText.textContent).toBe('ボタン1');
  });

  it('button2をクリックするとevent.target.idが表示される', () => {
    const button2 = document.getElementById('button2');
    const targetId = document.getElementById('targetId');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    button2.dispatchEvent(clickEvent);

    expect(targetId.textContent).toBe('button2');
  });

  it('button2をクリックするとevent.target.textContentが表示される', () => {
    const button2 = document.getElementById('button2');
    const buttonText = document.getElementById('buttonText');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    button2.dispatchEvent(clickEvent);

    expect(buttonText.textContent).toBe('ボタン2');
  });

  it('button3をクリックするとevent.target.idが表示される', () => {
    const button3 = document.getElementById('button3');
    const targetId = document.getElementById('targetId');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    button3.dispatchEvent(clickEvent);

    expect(targetId.textContent).toBe('button3');
  });

  it('button3をクリックするとevent.target.textContentが表示される', () => {
    const button3 = document.getElementById('button3');
    const buttonText = document.getElementById('buttonText');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    button3.dispatchEvent(clickEvent);

    expect(buttonText.textContent).toBe('ボタン3');
  });
});
