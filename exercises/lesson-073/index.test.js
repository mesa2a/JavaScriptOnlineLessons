import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 073: 簡易ドラムキット', () => {
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

    // Web Audio APIのモック
    window.AudioContext = vi.fn().mockImplementation(() => ({
      createOscillator: vi.fn().mockReturnValue({
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        frequency: { value: 0 },
        type: 'sine'
      }),
      createGain: vi.fn().mockReturnValue({
        connect: vi.fn(),
        gain: {
          setValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn()
        }
      }),
      destination: {},
      currentTime: 0
    }));

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
  });

  it('drumKit要素が存在する', () => {
    const drumKit = document.getElementById('drumKit');
    expect(drumKit).not.toBeNull();
  });

  it('8つのドラムパッドが存在する', () => {
    const pads = document.querySelectorAll('.drum-pad');
    expect(pads.length).toBe(8);
  });

  it('各ドラムパッドにdata-key属性がある', () => {
    const pads = document.querySelectorAll('.drum-pad');
    pads.forEach((pad) => {
      expect(pad.dataset.key).toBeDefined();
    });
  });

  it('各ドラムパッドにdata-sound属性がある', () => {
    const pads = document.querySelectorAll('.drum-pad');
    pads.forEach((pad) => {
      expect(pad.dataset.sound).toBeDefined();
    });
  });

  it('ドラムパッドをクリックするとactiveクラスが追加される', (done) => {
    const pad = document.querySelector('.drum-pad');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    pad.dispatchEvent(clickEvent);

    // activeクラスが追加されるのを確認
    expect(pad.classList.contains('active')).toBe(true);

    // 少し待ってからactiveクラスが削除されることを確認
    setTimeout(() => {
      expect(pad.classList.contains('active')).toBe(false);
      done();
    }, 150);
  });

  it('キーボード入力（a）でドラムパッドがアクティブになる', (done) => {
    const pad = document.querySelector('.drum-pad[data-key="a"]');

    const keyEvent = new window.KeyboardEvent('keydown', {
      key: 'a',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keyEvent);

    expect(pad.classList.contains('active')).toBe(true);

    setTimeout(() => {
      expect(pad.classList.contains('active')).toBe(false);
      done();
    }, 150);
  });

  it('キーボード入力（A）大文字でも動作する', (done) => {
    const pad = document.querySelector('.drum-pad[data-key="a"]');

    const keyEvent = new window.KeyboardEvent('keydown', {
      key: 'A',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keyEvent);

    expect(pad.classList.contains('active')).toBe(true);

    setTimeout(() => {
      done();
    }, 150);
  });

  it('異なるキー（s）でも動作する', (done) => {
    const pad = document.querySelector('.drum-pad[data-key="s"]');

    const keyEvent = new window.KeyboardEvent('keydown', {
      key: 's',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keyEvent);

    expect(pad.classList.contains('active')).toBe(true);

    setTimeout(() => {
      done();
    }, 150);
  });

  it('存在しないキーを押しても何も起こらない', () => {
    const keyEvent = new window.KeyboardEvent('keydown', {
      key: 'z',
      bubbles: true,
      cancelable: true,
    });

    // エラーが発生しないことを確認
    expect(() => {
      document.dispatchEvent(keyEvent);
    }).not.toThrow();
  });

  it('イベント委譲が使用されている（子要素をクリックしても動作する）', (done) => {
    const key = document.querySelector('.drum-pad .key');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    key.dispatchEvent(clickEvent);

    const pad = key.closest('.drum-pad');
    expect(pad.classList.contains('active')).toBe(true);

    setTimeout(() => {
      done();
    }, 150);
  });
});
