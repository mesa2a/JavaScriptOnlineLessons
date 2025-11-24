/**
 * レッスン179: メモアプリケーションのテスト
 */

import { describe, it, expect, beforeEach } from 'vitest';

describe('レッスン179: メモアプリケーション', () => {

  function createNotesApp() {
    return {
      notes: [],
      currentNoteId: null,
      nextId: 1,
      state: {
        searchQuery: '',
        sortBy: 'updated'
      },

      createNewNote: function() {
        const newNote = {
          id: this.nextId++,
          title: '無題のメモ',
          content: '',
          tags: [],
          isFavorite: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        this.notes.unshift(newNote);
        return newNote;
      },

      getNoteById: function(noteId) {
        for (let i = 0; i < this.notes.length; i++) {
          if (this.notes[i].id === noteId) {
            return this.notes[i];
          }
        }
        return null;
      },

      parseTags: function(tagsString) {
        if (!tagsString || tagsString.trim() === '') {
          return [];
        }
        return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      },

      toggleFavorite: function(noteId) {
        const note = this.getNoteById(noteId);
        if (note) {
          note.isFavorite = !note.isFavorite;
        }
      },

      deleteNote: function(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId);
      },

      getFilteredNotes: function() {
        if (!this.state.searchQuery) {
          return this.notes;
        }

        const query = this.state.searchQuery.toLowerCase();
        return this.notes.filter(note => {
          const titleMatch = note.title.toLowerCase().indexOf(query) !== -1;
          const contentMatch = note.content.toLowerCase().indexOf(query) !== -1;
          const tagsMatch = note.tags.some(tag => tag.toLowerCase().indexOf(query) !== -1);
          return titleMatch || contentMatch || tagsMatch;
        });
      },

      sortNotes: function(notes) {
        const sorted = notes.slice();

        sorted.sort((a, b) => {
          if (this.state.sortBy === 'updated') {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          } else if (this.state.sortBy === 'created') {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else if (this.state.sortBy === 'title') {
            return a.title.localeCompare(b.title);
          }
          return 0;
        });

        sorted.sort((a, b) => {
          if (a.isFavorite && !b.isFavorite) return -1;
          if (!a.isFavorite && b.isFavorite) return 1;
          return 0;
        });

        return sorted;
      },

      formatDate: function(isoString) {
        const date = new Date(isoString);
        const now = new Date();

        if (date.toDateString() === now.toDateString()) {
          return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
        }

        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
          return '昨日';
        }

        return (date.getMonth() + 1) + '/' + date.getDate();
      }
    };
  }

  describe('メモの作成', () => {
    let app;
    beforeEach(() => {
      app = createNotesApp();
    });

    it('新規メモを作成できる', () => {
      const note = app.createNewNote();
      expect(app.notes.length).toBe(1);
      expect(note.title).toBe('無題のメモ');
      expect(note.content).toBe('');
      expect(note.tags.length).toBe(0);
      expect(note.isFavorite).toBe(false);
    });

    it('メモは配列の先頭に追加される', () => {
      app.createNewNote();
      app.createNewNote();
      expect(app.notes[0].id).toBe(2);
      expect(app.notes[1].id).toBe(1);
    });

    it('IDが自動インクリメントされる', () => {
      const note1 = app.createNewNote();
      const note2 = app.createNewNote();
      expect(note1.id).toBe(1);
      expect(note2.id).toBe(2);
    });

    it('作成日時と更新日時が設定される', () => {
      const note = app.createNewNote();
      expect(note.createdAt).toBeDefined();
      expect(note.updatedAt).toBeDefined();
    });
  });

  describe('メモの取得', () => {
    let app;
    beforeEach(() => {
      app = createNotesApp();
      app.createNewNote();
      app.createNewNote();
    });

    it('IDでメモを取得できる', () => {
      const note = app.getNoteById(1);
      expect(note).toBeDefined();
      expect(note.id).toBe(1);
    });

    it('存在しないIDならnullを返す', () => {
      const note = app.getNoteById(999);
      expect(note).toBe(null);
    });
  });

  describe('タグの解析', () => {
    let app;
    beforeEach(() => {
      app = createNotesApp();
    });

    it('カンマ区切りでタグを解析できる', () => {
      const tags = app.parseTags('仕事, プライベート, 重要');
      expect(tags.length).toBe(3);
      expect(tags[0]).toBe('仕事');
      expect(tags[1]).toBe('プライベート');
      expect(tags[2]).toBe('重要');
    });

    it('空文字列なら空配列を返す', () => {
      const tags = app.parseTags('');
      expect(tags.length).toBe(0);
    });

    it('前後の空白はトリムされる', () => {
      const tags = app.parseTags('  タグ1  ,  タグ2  ');
      expect(tags[0]).toBe('タグ1');
      expect(tags[1]).toBe('タグ2');
    });

    it('空のタグは除外される', () => {
      const tags = app.parseTags('タグ1,,タグ2');
      expect(tags.length).toBe(2);
    });
  });

  describe('お気に入り機能', () => {
    let app;
    beforeEach(() => {
      app = createNotesApp();
      app.createNewNote();
    });

    it('お気に入りを切り替えできる', () => {
      const note = app.notes[0];
      expect(note.isFavorite).toBe(false);

      app.toggleFavorite(note.id);
      expect(note.isFavorite).toBe(true);

      app.toggleFavorite(note.id);
      expect(note.isFavorite).toBe(false);
    });
  });

  describe('メモの削除', () => {
    let app;
    beforeEach(() => {
      app = createNotesApp();
      app.createNewNote();
      app.createNewNote();
      app.createNewNote();
    });

    it('メモを削除できる', () => {
      app.deleteNote(2);
      expect(app.notes.length).toBe(2);
      expect(app.getNoteById(2)).toBe(null);
    });

    it('削除後も他のメモは残る', () => {
      app.deleteNote(2);
      expect(app.getNoteById(1)).toBeDefined();
      expect(app.getNoteById(3)).toBeDefined();
    });
  });

  describe('検索機能', () => {
    let app;
    beforeEach(() => {
      app = createNotesApp();

      const note1 = app.createNewNote();
      note1.title = '仕事のメモ';
      note1.content = '会議の議事録';
      note1.tags = ['重要'];

      const note2 = app.createNewNote();
      note2.title = 'プライベート';
      note2.content = '買い物リスト';

      const note3 = app.createNewNote();
      note3.title = '重要な締め切り';
      note3.content = '仕事の締め切り';
      note3.tags = ['仕事'];
    });

    it('タイトルで検索できる', () => {
      app.state.searchQuery = '仕事';
      const filtered = app.getFilteredNotes();
      expect(filtered.length).toBe(2);
    });

    it('本文で検索できる', () => {
      app.state.searchQuery = '買い物';
      const filtered = app.getFilteredNotes();
      expect(filtered.length).toBe(1);
      expect(filtered[0].title).toBe('プライベート');
    });

    it('タグで検索できる', () => {
      app.state.searchQuery = '重要';
      const filtered = app.getFilteredNotes();
      expect(filtered.length).toBe(2);
    });

    it('検索クエリがなければ全メモを返す', () => {
      app.state.searchQuery = '';
      const filtered = app.getFilteredNotes();
      expect(filtered.length).toBe(3);
    });

    it('検索は大文字小文字を区別しない', () => {
      app.state.searchQuery = 'プライベート';
      const filtered = app.getFilteredNotes();
      expect(filtered.length).toBe(1);
    });
  });

  describe('ソート機能', () => {
    let app;
    beforeEach(() => {
      app = createNotesApp();
    });

    it('更新日時順でソートできる', () => {
      const note1 = app.createNewNote();
      note1.updatedAt = '2024-01-10T10:00:00';

      const note2 = app.createNewNote();
      note2.updatedAt = '2024-01-15T10:00:00';

      const note3 = app.createNewNote();
      note3.updatedAt = '2024-01-12T10:00:00';

      app.state.sortBy = 'updated';
      const sorted = app.sortNotes(app.notes);

      expect(sorted[0].id).toBe(note2.id);
      expect(sorted[1].id).toBe(note3.id);
      expect(sorted[2].id).toBe(note1.id);
    });

    it('作成日時順でソートできる', () => {
      const note1 = app.createNewNote();
      note1.createdAt = '2024-01-10T10:00:00';

      const note2 = app.createNewNote();
      note2.createdAt = '2024-01-15T10:00:00';

      app.state.sortBy = 'created';
      const sorted = app.sortNotes(app.notes);

      expect(sorted[0].id).toBe(note2.id);
      expect(sorted[1].id).toBe(note1.id);
    });

    it('タイトル順でソートできる', () => {
      const note1 = app.createNewNote();
      note1.title = 'CCC';

      const note2 = app.createNewNote();
      note2.title = 'AAA';

      const note3 = app.createNewNote();
      note3.title = 'BBB';

      app.state.sortBy = 'title';
      const sorted = app.sortNotes(app.notes);

      expect(sorted[0].title).toBe('AAA');
      expect(sorted[1].title).toBe('BBB');
      expect(sorted[2].title).toBe('CCC');
    });

    it('お気に入りが最優先される', () => {
      const note1 = app.createNewNote();
      note1.title = 'AAA';
      note1.isFavorite = false;
      note1.updatedAt = '2024-01-15T10:00:00';

      const note2 = app.createNewNote();
      note2.title = 'BBB';
      note2.isFavorite = true;
      note2.updatedAt = '2024-01-10T10:00:00';

      app.state.sortBy = 'updated';
      const sorted = app.sortNotes(app.notes);

      expect(sorted[0].id).toBe(note2.id);
    });
  });

  describe('日時フォーマット', () => {
    let app;
    beforeEach(() => {
      app = createNotesApp();
    });

    it('今日の日付は時刻表示', () => {
      const now = new Date();
      const formatted = app.formatDate(now.toISOString());
      expect(formatted).toMatch(/\d{1,2}:\d{2}/);
    });

    it('昨日の日付は「昨日」表示', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const formatted = app.formatDate(yesterday.toISOString());
      expect(formatted).toBe('昨日');
    });

    it('それ以外はM/D形式', () => {
      const date = new Date('2024-03-15T10:00:00');
      const formatted = app.formatDate(date.toISOString());
      expect(formatted).toBe('3/15');
    });
  });

  describe('状態管理', () => {
    it('初期状態が正しい', () => {
      const app = createNotesApp();
      expect(app.notes.length).toBe(0);
      expect(app.currentNoteId).toBe(null);
      expect(app.nextId).toBe(1);
      expect(app.state.searchQuery).toBe('');
      expect(app.state.sortBy).toBe('updated');
    });
  });
});
