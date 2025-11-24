/**
 * レッスン175: ToDoリスト アプリケーション
 * 演習用テンプレート
 */

// ToDoアプリケーションオブジェクト
var todoApp = {
  tasks: [],           // タスクの配列
  nextId: 1,          // 次に使用するID
  currentFilter: 'all', // 現在のフィルター: 'all', 'active', 'completed'

  /**
   * 初期化処理
   */
  init: function() {
    // ヒント:
    // 1. ローカルストレージからデータを読み込む
    // 2. イベントリスナーを設定
    // 3. 初回描画

    // ここにコードを書いてください
  },

  /**
   * タスクを追加
   * @param {string} title - タスクのタイトル
   * @param {string} priority - 優先度 ('low', 'medium', 'high')
   * @param {string} dueDate - 期限（YYYY-MM-DD形式）
   * @returns {boolean} - 成功したらtrue
   */
  addTask: function(title, priority, dueDate) {
    // ヒント:
    // 1. バリデーション（タイトルが空でないか確認）
    // 2. 新しいタスクオブジェクトを作成
    //    - id: this.nextId++
    //    - title: title.trim()
    //    - completed: false
    //    - priority: priority || 'medium'
    //    - dueDate: dueDate || null
    //    - createdAt: new Date().toISOString()
    // 3. tasks配列に追加
    // 4. ストレージに保存
    // 5. 再描画

    // ここにコードを書いてください
  },

  /**
   * タスクを削除
   * @param {number} id - タスクのID
   * @returns {boolean} - 成功したらtrue
   */
  removeTask: function(id) {
    // ヒント:
    // 1. IDに一致するタスクを探す
    // 2. splice()で配列から削除
    // 3. ストレージに保存
    // 4. 再描画

    // ここにコードを書いてください
  },

  /**
   * タスクの完了状態を切り替え
   * @param {number} id - タスクのID
   * @returns {boolean} - 成功したらtrue
   */
  toggleTask: function(id) {
    // ヒント:
    // 1. IDに一致するタスクを探す
    // 2. completed プロパティを反転
    // 3. ストレージに保存
    // 4. 再描画

    // ここにコードを書いてください
  },

  /**
   * フィルタリングされたタスクを取得
   * @returns {Array} - フィルタリングされたタスク配列
   */
  getFilteredTasks: function() {
    // ヒント:
    // - currentFilter が 'all' なら全タスクを返す
    // - 'active' なら completed が false のタスクのみ
    // - 'completed' なら completed が true のタスクのみ

    // ここにコードを書いてください
  },

  /**
   * タスクリストを描画
   */
  render: function() {
    // ヒント:
    // 1. フィルタリングされたタスクを取得
    // 2. タスクリストのDOMを取得
    // 3. リストをクリア（innerHTML = ''）
    // 4. タスクがない場合は空の状態を表示
    // 5. 各タスクに対してcreateTaskElement()を呼び出して要素を作成
    // 6. 要素をリストに追加
    // 7. 統計情報を更新

    // ここにコードを書いてください
  },

  /**
   * タスク要素を作成
   * @param {Object} task - タスクオブジェクト
   * @returns {HTMLElement} - タスクのli要素
   */
  createTaskElement: function(task) {
    // ヒント:
    // 1. li要素を作成
    // 2. data-id属性にタスクIDを設定
    // 3. 完了状態と優先度に応じたクラスを追加
    // 4. チェックボックス、タイトル、期限、削除ボタンを作成
    // 5. すべての要素をli要素に追加して返す

    // ここにコードを書いてください
  },

  /**
   * イベントリスナーを設定
   */
  setupEventListeners: function() {
    var self = this;

    // タスク追加フォーム
    // ヒント:
    // 1. フォームのsubmitイベントをリッスン
    // 2. e.preventDefault()でデフォルトの動作を防ぐ
    // 3. 入力値を取得してaddTask()を呼び出す
    // 4. 成功したら入力フィールドをクリア

    // ここにコードを書いてください

    // タスクリストのイベント（イベント委譲）
    // ヒント:
    // 1. タスクリストのclickイベントをリッスン
    // 2. closest('.task-item')で親のli要素を取得
    // 3. チェックボックスがクリックされたらtoggleTask()
    // 4. 削除ボタンがクリックされたらremoveTask()

    // ここにコードを書いてください

    // フィルターボタン
    // ヒント:
    // 1. すべてのフィルターボタンにclickイベントを設定
    // 2. activeクラスを切り替え
    // 3. currentFilterを更新
    // 4. 再描画

    // ここにコードを書いてください
  },

  /**
   * 統計情報を更新
   */
  updateStats: function() {
    // ヒント:
    // 1. 全タスク数を計算
    // 2. 未完了タスク数を計算（filter使用）
    // 3. 完了タスク数を計算
    // 4. 各span要素のtextContentを更新

    // ここにコードを書いてください
  },

  /**
   * ローカルストレージに保存
   */
  saveToStorage: function() {
    // ヒント:
    // 1. tasks と nextId をオブジェクトにまとめる
    // 2. JSON.stringify()で文字列に変換
    // 3. localStorage.setItem()で保存
    // 4. エラーハンドリング（try-catch）

    // ここにコードを書いてください
  },

  /**
   * ローカルストレージから読み込み
   */
  loadFromStorage: function() {
    // ヒント:
    // 1. localStorage.getItem()でデータを取得
    // 2. JSON.parse()でオブジェクトに変換
    // 3. tasks と nextId を復元
    // 4. エラーハンドリング（try-catch）

    // ここにコードを書いてください
  }
};

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', function() {
  todoApp.init();
});
