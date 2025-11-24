/**
 * レッスン179: メモアプリケーション
 * 完全な実装
 */

var notesApp = {
  notes: [],
  currentNoteId: null,
  nextId: 1,

  state: {
    searchQuery: '',
    sortBy: 'updated'
  },

  init: function() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.renderNotesList();

    if (this.notes.length > 0) {
      this.selectNote(this.notes[0].id);
    }
  },

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

    this.notes.unshift(newNote);
    this.saveToStorage();
    this.renderNotesList();
    this.selectNote(newNote.id);

    var titleInput = document.querySelector('.note-title');
    titleInput.focus();
    titleInput.select();
  },

  selectNote: function(noteId) {
    this.currentNoteId = noteId;

    var note = this.getNoteById(noteId);
    if (!note) {
      return;
    }

    this.showEditor();

    document.querySelector('.note-title').value = note.title;
    document.querySelector('.note-content').value = note.content;
    document.querySelector('.tag-input').value = note.tags.join(', ');

    this.updateCharCount();
    this.renderNotesList();
  },

  getNoteById: function(noteId) {
    for (var i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id === noteId) {
        return this.notes[i];
      }
    }
    return null;
  },

  updateCurrentNote: function() {
    if (!this.currentNoteId) {
      return;
    }

    var note = this.getNoteById(this.currentNoteId);
    if (!note) {
      return;
    }

    note.title = document.querySelector('.note-title').value || '無題のメモ';
    note.content = document.querySelector('.note-content').value;

    var tagsInput = document.querySelector('.tag-input').value;
    note.tags = this.parseTags(tagsInput);

    note.updatedAt = new Date().toISOString();

    this.saveToStorage();
    this.renderNotesList();
  },

  parseTags: function(tagsString) {
    if (!tagsString || tagsString.trim() === '') {
      return [];
    }

    var tags = tagsString.split(',').map(function(tag) {
      return tag.trim();
    }).filter(function(tag) {
      return tag !== '';
    });

    return tags;
  },

  deleteCurrentNote: function() {
    if (!this.currentNoteId) {
      return;
    }

    if (!confirm('このメモを削除してもよろしいですか？')) {
      return;
    }

    var newNotes = [];
    for (var i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id !== this.currentNoteId) {
        newNotes.push(this.notes[i]);
      }
    }
    this.notes = newNotes;

    this.saveToStorage();
    this.renderNotesList();

    if (this.notes.length > 0) {
      this.selectNote(this.notes[0].id);
    } else {
      this.currentNoteId = null;
      this.showEmptyState();
    }
  },

  toggleFavorite: function(noteId) {
    var note = this.getNoteById(noteId);
    if (!note) {
      return;
    }

    note.isFavorite = !note.isFavorite;
    this.saveToStorage();
    this.renderNotesList();
  },

  searchNotes: function(query) {
    this.state.searchQuery = query.toLowerCase();
    this.renderNotesList();
  },

  getFilteredNotes: function() {
    var self = this;
    var filtered = this.notes;

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
  },

  sortNotes: function(notes) {
    var sortBy = this.state.sortBy;

    var sorted = notes.slice();

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
  },

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
  },

  createNoteItem: function(note) {
    var self = this;

    var item = document.createElement('div');
    item.className = 'note-item';
    if (note.id === this.currentNoteId) {
      item.className += ' active';
    }

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

    var preview = document.createElement('p');
    preview.className = 'note-preview';
    preview.textContent = note.content.substring(0, 100) +
      (note.content.length > 100 ? '...' : '');
    item.appendChild(preview);

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

    item.addEventListener('click', function() {
      self.selectNote(note.id);
    });

    return item;
  },

  formatDate: function(isoString) {
    var date = new Date(isoString);
    var now = new Date();

    if (date.toDateString() === now.toDateString()) {
      var hours = date.getHours();
      var minutes = String(date.getMinutes()).padStart(2, '0');
      return hours + ':' + minutes;
    }

    var yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return '昨日';
    }

    return (date.getMonth() + 1) + '/' + date.getDate();
  },

  updateCharCount: function() {
    var content = document.querySelector('.note-content').value;
    var count = content.length;
    document.querySelector('.char-count').textContent = count + ' 文字';
  },

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
  },

  showEditor: function() {
    document.querySelector('.editor').style.display = 'flex';
    document.querySelector('.empty-state').style.display = 'none';
  },

  showEmptyState: function() {
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.empty-state').style.display = 'flex';
  },

  setupEventListeners: function() {
    var self = this;

    document.querySelector('.btn-new-note').addEventListener('click', function() {
      self.createNewNote();
    });

    document.querySelector('#search-input').addEventListener('input', function(e) {
      self.searchNotes(e.target.value);
    });

    document.querySelector('.sort-select').addEventListener('change', function(e) {
      self.state.sortBy = e.target.value;
      self.renderNotesList();
    });

    document.querySelector('.note-title').addEventListener('input', function() {
      self.updateCurrentNote();
    });

    document.querySelector('.note-content').addEventListener('input', function() {
      self.updateCurrentNote();
      self.updateCharCount();
    });

    document.querySelector('.tag-input').addEventListener('change', function() {
      self.updateCurrentNote();
    });

    document.querySelector('.btn-delete').addEventListener('click', function() {
      self.deleteCurrentNote();
    });

    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        self.createNewNote();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.querySelector('#search-input').focus();
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', function() {
  notesApp.init();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = notesApp;
}
