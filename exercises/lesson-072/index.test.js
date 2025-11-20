import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 072: 動的要素のイベント', () => {
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

  it('itemInput要素が存在する', () => {
    const itemInput = document.getElementById('itemInput');
    expect(itemInput).not.toBeNull();
  });

  it('addButton要素が存在する', () => {
    const addButton = document.getElementById('addButton');
    expect(addButton).not.toBeNull();
    expect(addButton.tagName).toBe('BUTTON');
  });

  it('itemList要素が存在する', () => {
    const itemList = document.getElementById('itemList');
    expect(itemList).not.toBeNull();
    expect(itemList.tagName).toBe('UL');
  });

  it('追加ボタンをクリックするとアイテムが追加される', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');

    itemInput.value = 'テストアイテム';

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    addButton.dispatchEvent(clickEvent);

    expect(itemList.children.length).toBe(1);
  });

  it('追加されたアイテムにはテキストが含まれる', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');

    itemInput.value = 'テストアイテム';

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    addButton.dispatchEvent(clickEvent);

    expect(itemList.children[0].textContent).toContain('テストアイテム');
  });

  it('追加されたアイテムには削除ボタンが含まれる', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');

    itemInput.value = 'テストアイテム';

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    addButton.dispatchEvent(clickEvent);

    const deleteButton = itemList.querySelector('.delete-button');
    expect(deleteButton).not.toBeNull();
  });

  it('削除ボタンをクリックするとアイテムが削除される', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');

    // アイテムを追加
    itemInput.value = 'テストアイテム';
    const addClickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    addButton.dispatchEvent(addClickEvent);

    expect(itemList.children.length).toBe(1);

    // 削除ボタンをクリック
    const deleteButton = itemList.querySelector('.delete-button');
    const deleteClickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    deleteButton.dispatchEvent(deleteClickEvent);

    expect(itemList.children.length).toBe(0);
  });

  it('複数のアイテムを追加できる', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    itemInput.value = 'アイテム1';
    addButton.dispatchEvent(clickEvent);

    itemInput.value = 'アイテム2';
    addButton.dispatchEvent(clickEvent);

    itemInput.value = 'アイテム3';
    addButton.dispatchEvent(clickEvent);

    expect(itemList.children.length).toBe(3);
  });

  it('特定のアイテムだけを削除できる', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');

    const addClickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    itemInput.value = 'アイテム1';
    addButton.dispatchEvent(addClickEvent);

    itemInput.value = 'アイテム2';
    addButton.dispatchEvent(addClickEvent);

    itemInput.value = 'アイテム3';
    addButton.dispatchEvent(addClickEvent);

    // 2番目のアイテムを削除
    const deleteButtons = itemList.querySelectorAll('.delete-button');
    const deleteClickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    deleteButtons[1].dispatchEvent(deleteClickEvent);

    expect(itemList.children.length).toBe(2);
    expect(itemList.children[0].textContent).toContain('アイテム1');
    expect(itemList.children[1].textContent).toContain('アイテム3');
  });
});
