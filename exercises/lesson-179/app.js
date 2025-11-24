/**
 * レッスン179: メモアプリケーション
 * 演習用テンプレート
 */

var notesApp = {
  notes: [],
  currentNoteId: null,
  nextId: 1,

  state: {
    searchQuery: '',
    sortBy: 'updated'
  },

  /**
   * 初期化処理
   */
  init: function() {
    // ヒント:
    // 1. loadFromStorage()でデータを読み込み
    // 2. setupEventListeners()でイベントリスナーを設定
    // 3. renderNotesList()でメモリストを表示
    // 4. メモがあれば最初のメモを選択

    // ここにコードを書いてください
  },

  /**
   * 新規メモの作成
   */
  createNewNote: function() {
    // ヒント:
    // 1. 新しいメモオブジェクトを作成
    //    - id: this.nextId++
    //    - title: '無題のメモ'
    //    - content: ''
    //    - tags: []
    //    - isFavorite: false
    //    - createdAt: new Date().toISOString()
    //    - updatedAt: new Date().toISOString()
    // 2. notesの先頭に追加（unshift）
    // 3. saveToStorage()で保存
    // 4. renderNotesList()で再描画
    // 5. selectNote()で新しいメモを選択
    // 6. タイトルにフォーカスして選択状態に

    // ここにコードを書いてください
  },

  /**
   * メモの選択
   */
  selectNote: function(noteId) {
    // ヒント:
    // 1. currentNoteIdを更新
    // 2. getNoteById()でメモを取得
    // 3. メモがなければreturn
    // 4. showEditor()でエディタを表示
    // 5. エディタにタイトル、本文、タグを設定
    // 6. updateCharCount()で文字数を更新
    // 7. renderNotesList()でリストを再描画

    // ここにコードを書いてください
  },

  /**
   * IDからメモを取得
   */
  getNoteById: function(noteId) {
    // ヒント:
    // notesからidが一致するメモを探して返す
    // 見つからなければnullを返す

    // ここにコードを書いてください
  },

  /**
   * 現在のメモを更新
   */
  updateCurrentNote: function() {
    // ヒント:
    // 1. currentNoteIdがなければreturn
    // 2. getNoteById()でメモを取得
    // 3. メモがなければreturn
    // 4. タイトル、本文を更新
    // 5. parseTags()でタグを解析して更新
    // 6. updatedAtを現在時刻に更新
    // 7. saveToStorage()で保存
    // 8. renderNotesList()で再描画

    // ここにコードを書いてください
  },

  /**
   * タグの解析
   */
  parseTags: function(tagsString) {
    // ヒント:
    // 1. 空文字列なら空配列を返す
    // 2. カンマで分割
    // 3. 各タグをtrim()
    // 4. 空文字列を除外
    // 5. 配列を返す

    // ここにコードを書いてください
  },

  /**
   * メモの削除
   */
  deleteCurrentNote: function() {
    // ヒント:
    // 1. currentNoteIdがなければreturn
    // 2. confirm()で確認ダイアログ
    // 3. キャンセルされたらreturn
    // 4. notesから該当メモを削除
    // 5. saveToStorage()で保存
    // 6. renderNotesList()で再描画
    // 7. メモがあれば最初のメモを選択、なければshowEmptyState()

    // ここにコードを書いてください
  },

  /**
   * お気に入りの切り替え
   */
  toggleFavorite: function(noteId) {
    // ヒント:
    // 1. getNoteById()でメモを取得
    // 2. メモがなければreturn
    // 3. isFavoriteを反転
    // 4. saveToStorage()で保存
    // 5. renderNotesList()で再描画

    // ここにコードを書いてください
  },

  /**
   * 検索
   */
  searchNotes: function(query) {
    // ヒント:
    // 1. state.searchQueryを小文字に変換して保存
    // 2. renderNotesList()で再描画

    // ここにコードを書いてください
  },

  /**
   * フィルタリング済みメモを取得
   */
  getFilteredNotes: function() {
    // ヒント:
    // 1. notesをコピー
    // 2. searchQueryがあればフィルタリング
    //    - タイトルに含まれる
    //    - 本文に含まれる
    //    - タグに含まれる
    // 3. フィルタリング済み配列を返す

    // ここにコードを書いてください
  },

  /**
   * ソート
   */
  sortNotes: function(notes) {
    // ヒント:
    // 1. notesをコピー（slice()）
    // 2. sortByに応じてソート
    //    - 'updated': updatedAtで降順
    //    - 'created': createdAtで降順
    //    - 'title': titleで昇順（localeCompare）
    // 3. お気に入りを先頭に移動
    // 4. ソート済み配列を返す

    // ここにコードを書いてください
  },

  /**
   * メモリストの描画
   */
  renderNotesList: function() {
    // ヒント:
    // 1. notes-listを取得
    // 2. innerHTMLをクリア
    // 3. getFilteredNotes()でフィルタリング
    // 4. sortNotes()でソート
    // 5. メモがなければ「メモがありません」を表示してreturn
    // 6. 各メモに対してcreateNoteItem()で要素を作成
    // 7. notes-listに追加

    // ここにコードを書いてください
  },

  /**
   * メモアイテムの作成
   */
  createNoteItem: function(note) {
    // ヒント:
    // 1. divを作成してクラス'note-item'を設定
    // 2. 現在選択中ならクラス'active'を追加
    // 3. ヘッダー部分を作成（タイトルとお気に入りボタン）
    // 4. プレビュー部分を作成（本文の最初100文字）
    // 5. メタ情報を作成（日時とタグ）
    // 6. クリックでselectNote()を呼び出すイベントリスナーを追加
    // 7. 作成した要素を返す

    // ここにコードを書いてください
  },

  /**
   * 日時のフォーマット
   */
  formatDate: function(isoString) {
    // ヒント:
    // 1. Date オブジェクトに変換
    // 2. 今日なら時刻のみ表示（HH:MM）
    // 3. 昨日なら「昨日」と表示
    // 4. それ以外は「M/D」形式で表示

    // ここにコードを書いてください
  },

  /**
   * 文字数カウント
   */
  updateCharCount: function() {
    // ヒント:
    // 1. note-contentの値を取得
    // 2. 文字数を取得
    // 3. char-countに「X 文字」を表示

    // ここにコードを書いてください
  },

  /**
   * localStorageに保存
   */
  saveToStorage: function() {
    // ヒント:
    // localStorage.setItem('notesAppData', JSON.stringify({
    //   notes: this.notes,
    //   nextId: this.nextId
    // }))

    // ここにコードを書いてください
  },

  /**
   * localStorageから読み込み
   */
  loadFromStorage: function() {
    // ヒント:
    // 1. localStorage.getItem('notesAppData')で取得
    // 2. あればJSON.parseして配列に変換
    // 3. try-catchでエラーハンドリング
    // 4. notes、nextIdを復元

    // ここにコードを書いてください
  },

  /**
   * エディタを表示
   */
  showEditor: function() {
    // ヒント:
    // 1. editorのdisplayを'flex'に
    // 2. empty-stateのdisplayを'none'に

    // ここにコードを書いてください
  },

  /**
   * 空の状態を表示
   */
  showEmptyState: function() {
    // ヒント:
    // 1. editorのdisplayを'none'に
    // 2. empty-stateのdisplayを'flex'に

    // ここにコードを書いてください
  },

  /**
   * イベントリスナーの設定
   */
  setupEventListeners: function() {
    var self = this;

    // 新規メモボタン
    // ヒント: btn-new-noteのclickイベントでcreateNewNote()を呼び出す

    // ここにコードを書いてください

    // 検索
    // ヒント: search-inputのinputイベントでsearchNotes()を呼び出す

    // ここにコードを書いてください

    // ソート選択
    // ヒント: sort-selectのchangeイベントでstate.sortByを更新してrenderNotesList()

    // ここにコードを書いてください

    // タイトル変更（自動保存）
    // ヒント: note-titleのinputイベントでupdateCurrentNote()を呼び出す

    // ここにコードを書いてください

    // 本文変更（自動保存）
    // ヒント: note-contentのinputイベントでupdateCurrentNote()とupdateCharCount()を呼び出す

    // ここにコードを書いてください

    // タグ変更
    // ヒント: tag-inputのchangeイベントでupdateCurrentNote()を呼び出す

    // ここにコードを書いてください

    // 削除ボタン
    // ヒント: btn-deleteのclickイベントでdeleteCurrentNote()を呼び出す

    // ここにコードを書いてください

    // キーボードショートカット
    document.addEventListener('keydown', function(e) {
      // ヒント:
      // Ctrl+N または Cmd+N: createNewNote()
      // Ctrl+F または Cmd+F: 検索にフォーカス

      // ここにコードを書いてください
    });
  }
};

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', function() {
  notesApp.init();
});

// テスト用にエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = notesApp;
}
