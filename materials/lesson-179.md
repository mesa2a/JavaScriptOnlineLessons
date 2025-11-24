# レッスン179: メモアプリケーション

## このレッスンで学ぶこと
- メモの作成・編集・削除（CRUD操作）
- リアルタイム検索機能
- タグによる分類
- 文字数カウント
- 最終更新日時の管理
- localStorageを使ったデータ永続化
- お気に入り機能
- ソート機能（更新日時、作成日時、タイトル）

## メモアプリの仕様

### 基本機能
1. **メモの作成**: タイトルと本文を入力して新規メモを作成
2. **メモの編集**: 既存のメモを選択して編集
3. **メモの削除**: 不要なメモを削除（確認ダイアログ付き）
4. **自動保存**: 入力中に自動的に保存

### 追加機能
1. **検索機能**: タイトルと本文から検索
2. **タグ機能**: メモにタグを付けて分類
3. **お気に入り**: 重要なメモをお気に入りに追加
4. **ソート**: 更新日時、作成日時、タイトル順でソート
5. **文字数カウント**: 本文の文字数を表示
6. **日時表示**: 作成日時と最終更新日時を表示

## アプリの構造

### HTML構造
```html
<div class="app-container">
  <!-- サイドバー -->
  <div class="sidebar">
    <!-- 検索バー -->
    <div class="search-box">
      <input type="text" placeholder="検索...">
    </div>

    <!-- 新規メモボタン -->
    <button class="btn-new-note">+ 新規メモ</button>

    <!-- ソート選択 -->
    <select class="sort-select">
      <option value="updated">更新日時順</option>
      <option value="created">作成日時順</option>
      <option value="title">タイトル順</option>
    </select>

    <!-- メモリスト -->
    <div class="notes-list">
      <!-- メモアイテム -->
      <div class="note-item">
        <div class="note-header">
          <h3>メモタイトル</h3>
          <button class="btn-favorite">★</button>
        </div>
        <p class="note-preview">メモの内容...</p>
        <div class="note-meta">
          <span class="note-date">2024/01/15</span>
          <div class="note-tags">
            <span class="tag">タグ1</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- メインエリア -->
  <div class="main-area">
    <!-- エディタ -->
    <div class="editor">
      <input type="text" class="note-title" placeholder="タイトル">
      <textarea class="note-content" placeholder="メモを入力..."></textarea>
      <div class="editor-footer">
        <div class="char-count">0 文字</div>
        <input type="text" class="tag-input" placeholder="タグを追加（カンマ区切り）">
        <button class="btn-delete">削除</button>
      </div>
    </div>

    <!-- 選択なし状態 -->
    <div class="empty-state">
      <p>メモを選択するか、新規メモを作成してください</p>
    </div>
  </div>
</div>
```

### CSS設計
```css
.app-container {
  display: flex;
  height: 100vh;
  background: #f5f5f5;
}

.sidebar {
  width: 320px;
  background: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.notes-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.note-item {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.note-item:hover {
  background: #f8f9fa;
}

.note-item.active {
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.editor {
  padding: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.note-title {
  font-size: 32px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-bottom: 20px;
  padding: 10px 0;
}

.note-content {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  line-height: 1.6;
  resize: none;
  font-family: inherit;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 5px;
}
```

## JavaScript実装

### 1. データ構造

```javascript
var notesApp = {
  notes: [],
  currentNoteId: null,
  nextId: 1,

  state: {
    searchQuery: '',
    sortBy: 'updated'  // 'updated', 'created', 'title'
  }
};

// メモのデータ構造
var note = {
  id: 1,
  title: 'メモタイトル',
  content: 'メモの本文',
  tags: ['タグ1', 'タグ2'],
  isFavorite: false,
  createdAt: '2024-01-15T10:00:00',
  updatedAt: '2024-01-15T12:30:00'
};
```

### 2. 初期化処理

```javascript
init: function() {
  this.loadFromStorage();
  this.setupEventListeners();
  this.renderNotesList();

  // 最初のメモを選択（あれば）
  if (this.notes.length > 0) {
    this.selectNote(this.notes[0].id);
  }
}
```

### 3. 新規メモの作成

```javascript
createNewNote: function() {
  var newNote = {
    id: this.nextId++,
    title: '無題のメモ',
    content: '',
    tags: [],
    isFavorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  this.notes.unshift(newNote);  // 配列の先頭に追加
  this.saveToStorage();
  this.renderNotesList();
  this.selectNote(newNote.id);

  // タイトルにフォーカス
  document.querySelector('.note-title').focus();
  document.querySelector('.note-title').select();
}
```

### 4. メモの選択

```javascript
selectNote: function(noteId) {
  this.currentNoteId = noteId;

  // 選択中のメモを取得
  var note = this.getNoteById(noteId);
  if (!note) {
    return;
  }

  // エディタを表示
  this.showEditor();

  // エディタに内容を設定
  document.querySelector('.note-title').value = note.title;
  document.querySelector('.note-content').value = note.content;
  document.querySelector('.tag-input').value = note.tags.join(', ');

  // 文字数を更新
  this.updateCharCount();

  // リストの選択状態を更新
  this.updateNoteListSelection();
}
```

### 5. メモの更新

```javascript
updateCurrentNote: function() {
  if (!this.currentNoteId) {
    return;
  }

  var note = this.getNoteById(this.currentNoteId);
  if (!note) {
    return;
  }

  // タイトルと本文を更新
  note.title = document.querySelector('.note-title').value || '無題のメモ';
  note.content = document.querySelector('.note-content').value;

  // タグを更新
  var tagsInput = document.querySelector('.tag-input').value;
  note.tags = this.parseTags(tagsInput);

  // 更新日時を更新
  note.updatedAt = new Date().toISOString();

  // 保存して再描画
  this.saveToStorage();
  this.renderNotesList();
  this.updateNoteListSelection();
}
```

### 6. タグの解析

```javascript
parseTags: function(tagsString) {
  if (!tagsString || tagsString.trim() === '') {
    return [];
  }

  // カンマで分割してトリム
  var tags = tagsString.split(',').map(function(tag) {
    return tag.trim();
  }).filter(function(tag) {
    return tag !== '';
  });

  return tags;
}
```

### 7. メモの削除

```javascript
deleteCurrentNote: function() {
  if (!this.currentNoteId) {
    return;
  }

  // 確認ダイアログ
  if (!confirm('このメモを削除してもよろしいですか？')) {
    return;
  }

  // メモを削除
  var newNotes = [];
  for (var i = 0; i < this.notes.length; i++) {
    if (this.notes[i].id !== this.currentNoteId) {
      newNotes.push(this.notes[i]);
    }
  }
  this.notes = newNotes;

  // 保存して再描画
  this.saveToStorage();
  this.renderNotesList();

  // 次のメモを選択
  if (this.notes.length > 0) {
    this.selectNote(this.notes[0].id);
  } else {
    this.currentNoteId = null;
    this.showEmptyState();
  }
}
```

### 8. お気に入りの切り替え

```javascript
toggleFavorite: function(noteId) {
  var note = this.getNoteById(noteId);
  if (!note) {
    return;
  }

  note.isFavorite = !note.isFavorite;
  this.saveToStorage();
  this.renderNotesList();
}
```

### 9. 検索機能

```javascript
searchNotes: function(query) {
  this.state.searchQuery = query.toLowerCase();
  this.renderNotesList();
},

getFilteredNotes: function() {
  var self = this;
  var filtered = this.notes;

  // 検索フィルター
  if (this.state.searchQuery) {
    filtered = filtered.filter(function(note) {
      var titleMatch = note.title.toLowerCase().indexOf(self.state.searchQuery) !== -1;
      var contentMatch = note.content.toLowerCase().indexOf(self.state.searchQuery) !== -1;
      var tagsMatch = note.tags.some(function(tag) {
        return tag.toLowerCase().indexOf(self.state.searchQuery) !== -1;
      });

      return titleMatch || contentMatch || tagsMatch;
    });
  }

  return filtered;
}
```

### 10. ソート機能

```javascript
sortNotes: function(notes) {
  var sortBy = this.state.sortBy;

  var sorted = notes.slice();  // コピーを作成

  sorted.sort(function(a, b) {
    if (sortBy === 'updated') {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    } else if (sortBy === 'created') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // お気に入りを先頭に
  sorted.sort(function(a, b) {
    if (a.isFavorite && !b.isFavorite) {
      return -1;
    }
    if (!a.isFavorite && b.isFavorite) {
      return 1;
    }
    return 0;
  });

  return sorted;
}
```

### 11. メモリストの描画

```javascript
renderNotesList: function() {
  var notesList = document.querySelector('.notes-list');
  notesList.innerHTML = '';

  var filtered = this.getFilteredNotes();
  var sorted = this.sortNotes(filtered);

  if (sorted.length === 0) {
    notesList.innerHTML = '<p class="empty-message">メモがありません</p>';
    return;
  }

  for (var i = 0; i < sorted.length; i++) {
    var note = sorted[i];
    var noteItem = this.createNoteItem(note);
    notesList.appendChild(noteItem);
  }
}
```

### 12. メモアイテムの作成

```javascript
createNoteItem: function(note) {
  var self = this;

  var item = document.createElement('div');
  item.className = 'note-item';
  if (note.id === this.currentNoteId) {
    item.className += ' active';
  }

  // ヘッダー
  var header = document.createElement('div');
  header.className = 'note-header';

  var title = document.createElement('h3');
  title.textContent = note.title;
  header.appendChild(title);

  var favBtn = document.createElement('button');
  favBtn.className = 'btn-favorite';
  favBtn.textContent = note.isFavorite ? '★' : '☆';
  favBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    self.toggleFavorite(note.id);
  });
  header.appendChild(favBtn);

  item.appendChild(header);

  // プレビュー
  var preview = document.createElement('p');
  preview.className = 'note-preview';
  preview.textContent = note.content.substring(0, 100) +
    (note.content.length > 100 ? '...' : '');
  item.appendChild(preview);

  // メタ情報
  var meta = document.createElement('div');
  meta.className = 'note-meta';

  var date = document.createElement('span');
  date.className = 'note-date';
  date.textContent = this.formatDate(note.updatedAt);
  meta.appendChild(date);

  if (note.tags.length > 0) {
    var tagsDiv = document.createElement('div');
    tagsDiv.className = 'note-tags';

    for (var i = 0; i < note.tags.length; i++) {
      var tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = note.tags[i];
      tagsDiv.appendChild(tag);
    }

    meta.appendChild(tagsDiv);
  }

  item.appendChild(meta);

  // クリックで選択
  item.addEventListener('click', function() {
    self.selectNote(note.id);
  });

  return item;
}
```

### 13. 日時のフォーマット

```javascript
formatDate: function(isoString) {
  var date = new Date(isoString);
  var now = new Date();

  // 今日なら時刻のみ
  if (date.toDateString() === now.toDateString()) {
    return date.getHours() + ':' +
      String(date.getMinutes()).padStart(2, '0');
  }

  // 昨日
  var yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return '昨日';
  }

  // それ以外は日付
  return (date.getMonth() + 1) + '/' + date.getDate();
}
```

### 14. 文字数カウント

```javascript
updateCharCount: function() {
  var content = document.querySelector('.note-content').value;
  var count = content.length;
  document.querySelector('.char-count').textContent = count + ' 文字';
}
```

### 15. localStorage連携

```javascript
saveToStorage: function() {
  localStorage.setItem('notesAppData', JSON.stringify({
    notes: this.notes,
    nextId: this.nextId
  }));
},

loadFromStorage: function() {
  var saved = localStorage.getItem('notesAppData');
  if (saved) {
    try {
      var data = JSON.parse(saved);
      this.notes = data.notes || [];
      this.nextId = data.nextId || 1;
    } catch (e) {
      this.notes = [];
      this.nextId = 1;
    }
  }
}
```

### 16. イベントリスナーの設定

```javascript
setupEventListeners: function() {
  var self = this;

  // 新規メモボタン
  document.querySelector('.btn-new-note').addEventListener('click', function() {
    self.createNewNote();
  });

  // 検索
  document.querySelector('.search-box input').addEventListener('input', function(e) {
    self.searchNotes(e.target.value);
  });

  // ソート選択
  document.querySelector('.sort-select').addEventListener('change', function(e) {
    self.state.sortBy = e.target.value;
    self.renderNotesList();
  });

  // タイトル変更（自動保存）
  document.querySelector('.note-title').addEventListener('input', function() {
    self.updateCurrentNote();
  });

  // 本文変更（自動保存）
  var contentTextarea = document.querySelector('.note-content');
  contentTextarea.addEventListener('input', function() {
    self.updateCurrentNote();
    self.updateCharCount();
  });

  // タグ変更
  document.querySelector('.tag-input').addEventListener('change', function() {
    self.updateCurrentNote();
  });

  // 削除ボタン
  document.querySelector('.btn-delete').addEventListener('click', function() {
    self.deleteCurrentNote();
  });

  // キーボードショートカット
  document.addEventListener('keydown', function(e) {
    // Ctrl+N または Cmd+N: 新規メモ
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      self.createNewNote();
    }

    // Ctrl+F または Cmd+F: 検索にフォーカス
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      e.preventDefault();
      document.querySelector('.search-box input').focus();
    }
  });
}
```

### 17. UI状態管理

```javascript
showEditor: function() {
  document.querySelector('.editor').style.display = 'flex';
  document.querySelector('.empty-state').style.display = 'none';
},

showEmptyState: function() {
  document.querySelector('.editor').style.display = 'none';
  document.querySelector('.empty-state').style.display = 'flex';
},

updateNoteListSelection: function() {
  var items = document.querySelectorAll('.note-item');
  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove('active');
  }

  // 現在のメモを探してactiveクラスを追加
  // renderNotesList()で再描画されるため、ここでは何もしない
}
```

## 実装のポイント

### 1. 自動保存の実装
入力イベントのたびに自動的に保存することで、ユーザーが保存ボタンを押す必要がなくなります。

### 2. リアルタイム検索
検索入力のたびにフィルタリングと再描画を行い、即座に結果を表示します。

### 3. 効率的なソート
お気に入りを最優先にし、その後選択されたソート順で並べ替えます。

### 4. 日時表示の工夫
今日なら時刻、昨日なら「昨日」、それ以外は日付を表示することで、直感的に理解しやすくなります。

## まとめ

このレッスンでは、実用的なメモアプリケーションを実装しました。

### 学んだこと
- CRUD操作の完全な実装
- 複数の条件によるフィルタリングとソート
- タグによる分類システム
- リアルタイム検索の実装
- 自動保存機能
- 日時のフォーマットと表示
- キーボードショートカット
- UI状態管理

### 次のステップ
- Markdown記法のサポート
- メモのエクスポート/インポート機能
- カテゴリ機能の追加
- メモの共有機能
- リッチテキストエディタの統合

このメモアプリは、実際に日常で使えるレベルの機能を持っています。データ管理、検索、ソート、タグ付けなど、多くの実践的なパターンを学ぶことができました。
