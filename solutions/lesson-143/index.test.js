import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 143: データモデリング (Solution)', () => {
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

  describe('オブジェクトの定義', () => {
    it('libraryオブジェクトが正しく定義されている', () => {
      const library = window.eval('library');
      expect(library).toBeDefined();
      expect(library.name).toBeDefined();
      expect(library.address).toBeDefined();
      expect(library.openingHours).toBeDefined();
      expect(library.totalBooks).toBeDefined();
      expect(library.totalMembers).toBeDefined();
    });

    it('books配列に本が含まれている', () => {
      const books = window.eval('books');
      expect(books).toBeDefined();
      expect(Array.isArray(books)).toBe(true);
      expect(books.length).toBeGreaterThan(0);
    });

    it('各本に必要なプロパティがある', () => {
      const books = window.eval('books');
      if (books.length > 0) {
        const book = books[0];
        expect(book.isbn).toBeDefined();
        expect(book.title).toBeDefined();
        expect(book.author).toBeDefined();
        expect(book.publisher).toBeDefined();
        expect(book.publishYear).toBeDefined();
        expect(book.isBorrowed).toBeDefined();
      }
    });

    it('memberオブジェクトが正しく定義されている', () => {
      const member = window.eval('member');
      expect(member).toBeDefined();
      expect(member.memberId).toBeDefined();
      expect(member.name).toBeDefined();
      expect(member.email).toBeDefined();
      expect(member.registrationDate).toBeDefined();
      expect(member.borrowedBooks).toBeDefined();
      expect(Array.isArray(member.borrowedBooks)).toBe(true);
    });
  });

  describe('メソッドの実装', () => {
    it('borrowBookメソッドが定義されている', () => {
      const member = window.eval('member');
      expect(typeof member.borrowBook).toBe('function');
    });

    it('returnBookメソッドが定義されている', () => {
      const member = window.eval('member');
      expect(typeof member.returnBook).toBe('function');
    });

    it('getBorrowedCountメソッドが定義されている', () => {
      const member = window.eval('member');
      expect(typeof member.getBorrowedCount).toBe('function');
    });

    it('getBorrowedCountメソッドが正しく動作する', () => {
      const member = window.eval('member');
      const count = member.getBorrowedCount();
      expect(count).toBe(member.borrowedBooks.length);
    });
  });

  describe('UI要素', () => {
    it('libraryInfo要素が存在する', () => {
      const libraryInfo = document.getElementById('libraryInfo');
      expect(libraryInfo).not.toBeNull();
    });

    it('booksList要素が存在する', () => {
      const booksList = document.getElementById('booksList');
      expect(booksList).not.toBeNull();
    });

    it('memberInfo要素が存在する', () => {
      const memberInfo = document.getElementById('memberInfo');
      expect(memberInfo).not.toBeNull();
    });
  });

  describe('図書館情報の表示', () => {
    it('libraryInfoに図書館名が表示されている', () => {
      const libraryInfo = document.getElementById('libraryInfo');
      const library = window.eval('library');
      expect(libraryInfo.innerHTML).toContain(library.name);
    });

    it('libraryInfoに住所が表示されている', () => {
      const libraryInfo = document.getElementById('libraryInfo');
      const library = window.eval('library');
      expect(libraryInfo.innerHTML).toContain(library.address);
    });

    it('libraryInfoに開館時間が表示されている', () => {
      const libraryInfo = document.getElementById('libraryInfo');
      const library = window.eval('library');
      expect(libraryInfo.innerHTML).toContain(library.openingHours);
    });
  });

  describe('蔵書リストの表示', () => {
    it('booksListに本のタイトルが表示されている', () => {
      const booksList = document.getElementById('booksList');
      const books = window.eval('books');
      if (books.length > 0) {
        expect(booksList.innerHTML).toContain(books[0].title);
      }
    });

    it('booksListに著者が表示されている', () => {
      const booksList = document.getElementById('booksList');
      const books = window.eval('books');
      if (books.length > 0) {
        expect(booksList.innerHTML).toContain(books[0].author);
      }
    });

    it('貸出状態が表示されている', () => {
      const booksList = document.getElementById('booksList');
      const content = booksList.innerHTML;
      const hasStatus = content.includes('貸出中') || content.includes('貸出可');
      expect(hasStatus).toBe(true);
    });
  });

  describe('会員情報の表示', () => {
    it('memberInfoに会員名が表示されている', () => {
      const memberInfo = document.getElementById('memberInfo');
      const member = window.eval('member');
      expect(memberInfo.innerHTML).toContain(member.name);
    });

    it('memberInfoに会員IDが表示されている', () => {
      const memberInfo = document.getElementById('memberInfo');
      const member = window.eval('member');
      expect(memberInfo.innerHTML).toContain(member.memberId);
    });

    it('memberInfoにメールアドレスが表示されている', () => {
      const memberInfo = document.getElementById('memberInfo');
      const member = window.eval('member');
      expect(memberInfo.innerHTML).toContain(member.email);
    });

    it('借りている本の数が表示されている', () => {
      const memberInfo = document.getElementById('memberInfo');
      const member = window.eval('member');
      const count = member.getBorrowedCount().toString();
      expect(memberInfo.innerHTML).toContain(count);
    });
  });

  describe('データの整合性', () => {
    it('会員が借りている本がbooks配列に存在する', () => {
      const member = window.eval('member');
      const books = window.eval('books');

      for (let i = 0; i < member.borrowedBooks.length; i++) {
        const isbn = member.borrowedBooks[i];
        const bookExists = books.some(book => book.isbn === isbn);
        expect(bookExists).toBe(true);
      }
    });

    it('貸出中の本はisBorrowedがtrueである', () => {
      const books = window.eval('books');
      const member = window.eval('member');

      for (let i = 0; i < books.length; i++) {
        if (member.borrowedBooks.includes(books[i].isbn)) {
          expect(books[i].isBorrowed).toBe(true);
        }
      }
    });
  });
});
