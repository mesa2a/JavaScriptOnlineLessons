const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

describe('Lesson 108: 編集機能', () => {
  let dom, document, window;

  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
    window = dom.window;

    const scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf-8');
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptContent;
    document.body.appendChild(scriptEl);
  });

  test('連絡先を追加できる', () => {
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const addButton = document.getElementById('addButton');
    const contactList = document.getElementById('contactList');

    nameInput.value = '太郎';
    phoneInput.value = '090-1234-5678';
    addButton.click();

    expect(contactList.children.length).toBeGreaterThan(0);
    expect(contactList.textContent).toContain('太郎');
  });

  test('編集ボタンがある', () => {
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const addButton = document.getElementById('addButton');

    nameInput.value = '花子';
    phoneInput.value = '080-9876-5432';
    addButton.click();

    const editButtons = document.querySelectorAll('button');
    const hasEditButton = Array.from(editButtons).some(btn =>
      btn.textContent.includes('編集')
    );
    expect(hasEditButton).toBe(true);
  });

  test('削除ボタンがある', () => {
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const addButton = document.getElementById('addButton');

    nameInput.value = '次郎';
    phoneInput.value = '070-1111-2222';
    addButton.click();

    const deleteButtons = document.querySelectorAll('button');
    const hasDeleteButton = Array.from(deleteButtons).some(btn =>
      btn.textContent.includes('削除')
    );
    expect(hasDeleteButton).toBe(true);
  });
});
