/**
 * レッスン176: クイズアプリケーション
 * 演習用テンプレート
 */

var quizApp = {
  data: quizData,  // quiz-data.jsから読み込まれたデータ
  state: {
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isQuizActive: false,
    timer: null,
    timeRemaining: 30,
    startTime: null,
    endTime: null
  },

  /**
   * 初期化処理
   */
  init: function() {
    // ヒント:
    // 1. 開始画面を表示
    // 2. イベントリスナーを設定

    // ここにコードを書いてください
  },

  /**
   * クイズを開始
   */
  startQuiz: function() {
    // ヒント:
    // 1. 状態をリセット（currentQuestionIndex, score, answers, startTime）
    // 2. isQuizActive を true に
    // 3. 画面を切り替え（開始画面を非表示、クイズ画面を表示）
    // 4. 最初の問題を表示

    // ここにコードを書いてください
  },

  /**
   * 問題を表示
   */
  displayQuestion: function() {
    // ヒント:
    // 1. 現在の問題を取得
    // 2. 問題番号と進捗バーを更新
    // 3. カテゴリと問題文を表示
    // 4. 選択肢ボタンを動的に生成
    // 5. フィードバックを非表示
    // 6. タイマーを開始

    // ここにコードを書いてください
  },

  /**
   * 回答を処理
   */
  handleAnswer: function(selectedIndex) {
    // ヒント:
    // 1. すでに回答済みなら無視（isQuizActiveをチェック）
    // 2. タイマーを停止
    // 3. 現在の問題を取得
    // 4. 正誤判定
    // 5. 回答を記録（answers配列に追加）
    // 6. 正解ならスコアを加算
    // 7. フィードバックを表示
    // 8. isQuizActive を false に

    // ここにコードを書いてください
  },

  /**
   * フィードバックを表示
   */
  showFeedback: function(isCorrect, question) {
    // ヒント:
    // 1. フィードバック要素を取得
    // 2. 正解/不正解のメッセージを設定
    // 3. 不正解なら正解の選択肢を表示
    // 4. 解説を表示
    // 5. フィードバックを表示
    // 6. 選択肢をハイライト

    // ここにコードを書いてください
  },

  /**
   * 選択肢をハイライト
   */
  highlightSelectedOption: function(correctIndex) {
    // ヒント:
    // 1. すべての選択肢ボタンを取得
    // 2. 正解の選択肢に'correct'クラスを追加
    // 3. 選択された不正解の選択肢に'incorrect'クラスを追加
    // 4. すべてのボタンを無効化（disabled = true）

    // ここにコードを書いてください
  },

  /**
   * 次の問題へ
   */
  nextQuestion: function() {
    // ヒント:
    // 1. currentQuestionIndex をインクリメント
    // 2. まだ問題があるか確認
    // 3. ある場合: isQuizActive を true にして displayQuestion()
    // 4. ない場合: endTime を記録して showResults()

    // ここにコードを書いてください
  },

  /**
   * タイマーを開始
   */
  startTimer: function() {
    var self = this;

    // ヒント:
    // 1. timeRemaining を 30 にリセット
    // 2. 前のタイマーがあればクリア
    // 3. タイマー表示を更新
    // 4. setInterval で1秒ごとに:
    //    - timeRemaining をデクリメント
    //    - 表示を更新
    //    - 0になったら handleTimeout()
    //    - 5以下なら警告クラスを追加

    // ここにコードを書いてください
  },

  /**
   * タイマーを停止
   */
  stopTimer: function() {
    // ヒント:
    // 1. clearInterval でタイマーをクリア
    // 2. timer を null に
    // 3. 警告クラスを削除

    // ここにコードを書いてください
  },

  /**
   * 時間切れ処理
   */
  handleTimeout: function() {
    // ヒント:
    // 1. 現在の問題を取得
    // 2. 不正解として記録（selectedIndex: -1）
    // 3. タイムアウトのフィードバックを表示
    // 4. isQuizActive を false に

    // ここにコードを書いてください
  },

  /**
   * 結果を表示
   */
  showResults: function() {
    // ヒント:
    // 1. 画面を切り替え（クイズ画面を非表示、結果画面を表示）
    // 2. 最終スコアを表示
    // 3. 正答率を計算して表示
    // 4. 所要時間を計算して表示
    // 5. 回答レビューを表示

    // ここにコードを書いてください
  },

  /**
   * 回答レビューを表示
   */
  displayAnswerReview: function() {
    // ヒント:
    // 1. reviewContainer を取得
    // 2. 見出しを追加
    // 3. 各回答に対して:
    //    - 問題番号と結果バッジを表示
    //    - 問題文を表示
    //    - ユーザーの回答を表示
    //    - 不正解なら正解を表示

    // ここにコードを書いてください
  },

  /**
   * すべての画面を非表示
   */
  hideAllScreens: function() {
    // ヒント:
    // 1. すべての.screen要素を取得
    // 2. 各要素のstyle.displayを'none'に設定

    // ここにコードを書いてください
  },

  /**
   * リセット（もう一度挑戦）
   */
  reset: function() {
    // ヒント:
    // 1. タイマーを停止
    // 2. 開始画面を表示
    // 3. 他の画面を非表示

    // ここにコードを書いてください
  },

  /**
   * イベントリスナーを設定
   */
  setupEventListeners: function() {
    var self = this;

    // スタートボタン
    // ヒント: click イベントで startQuiz() を呼び出す

    // ここにコードを書いてください

    // 選択肢のクリック（イベント委譲）
    // ヒント:
    // 1. options-container の click イベントをリッスン
    // 2. クリックされた要素が option-btn かチェック
    // 3. isQuizActive なら handleAnswer() を呼び出す

    // ここにコードを書いてください

    // 次の問題へボタン
    // ヒント: click イベントで nextQuestion() を呼び出す

    // ここにコードを書いてください

    // リトライボタン
    // ヒント: click イベントで reset() を呼び出す

    // ここにコードを書いてください
  }
};

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', function() {
  quizApp.init();
});
