/**
 * レッスン180: タイマー＆ストップウォッチアプリケーション
 * 演習用テンプレート
 */

var timerApp = {
  stopwatch: {
    startTime: 0,
    elapsedTime: 0,
    timerInterval: null,
    isRunning: false,
    laps: []
  },

  timer: {
    totalSeconds: 0,
    remainingSeconds: 0,
    timerInterval: null,
    isRunning: false
  },

  currentTab: 'stopwatch',

  /**
   * 初期化処理
   */
  init: function() {
    // ヒント:
    // 1. setupTabs()でタブ切り替えを設定
    // 2. setupStopwatch()でストップウォッチを設定
    // 3. setupTimer()でタイマーを設定
    // 4. setupPresets()でプリセットを設定

    // ここにコードを書いてください
  },

  /**
   * ストップウォッチのスタート/一時停止
   */
  startStopwatch: function() {
    // ヒント:
    // 1. isRunningがfalseならスタート
    //    - startTimeを設定（Date.now() - elapsedTime）
    //    - isRunningをtrueに
    //    - setInterval()で10ミリ秒ごとにupdateStopwatch()を呼び出す
    //    - updateStopwatchButtons()
    // 2. isRunningがtrueなら一時停止
    //    - pauseStopwatch()を呼び出す

    // ここにコードを書いてください
  },

  /**
   * ストップウォッチの一時停止
   */
  pauseStopwatch: function() {
    // ヒント:
    // 1. clearInterval()
    // 2. isRunningをfalseに
    // 3. elapsedTimeを更新（Date.now() - startTime）
    // 4. updateStopwatchButtons()

    // ここにコードを書いてください
  },

  /**
   * ストップウォッチの更新
   */
  updateStopwatch: function() {
    // ヒント:
    // 1. elapsedTimeを更新（Date.now() - startTime）
    // 2. displayStopwatch()

    // ここにコードを書いてください
  },

  /**
   * ストップウォッチのリセット
   */
  resetStopwatch: function() {
    // ヒント:
    // 1. clearInterval()
    // 2. 全ての状態を初期化
    // 3. displayStopwatch()
    // 4. displayLaps()
    // 5. updateStopwatchButtons()

    // ここにコードを書いてください
  },

  /**
   * ラップタイムの記録
   */
  recordLap: function() {
    // ヒント:
    // 1. 現在のelapsedTimeを取得
    // 2. 前のラップとの差分を計算
    // 3. laps配列に追加
    // 4. displayLaps()

    // ここにコードを書いてください
  },

  /**
   * タイマーのスタート/一時停止
   */
  startTimer: function() {
    // ヒント:
    // 1. isRunningがfalseなら
    //    - remainingSecondsが0なら入力から時間を取得
    //    - 時間が0ならアラート表示してreturn
    //    - isRunningをtrueに
    //    - setInterval()で1秒ごとにupdateTimer()を呼び出す
    //    - updateTimerButtons()
    //    - disableTimerInputs()
    // 2. isRunningがtrueなら
    //    - pauseTimer()を呼び出す

    // ここにコードを書いてください
  },

  /**
   * タイマーの一時停止
   */
  pauseTimer: function() {
    // ヒント:
    // 1. clearInterval()
    // 2. isRunningをfalseに
    // 3. updateTimerButtons()

    // ここにコードを書いてください
  },

  /**
   * タイマーの更新
   */
  updateTimer: function() {
    // ヒント:
    // 1. remainingSecondsを1減らす
    // 2. 0未満にならないようにチェック
    // 3. displayTimer()
    // 4. remainingSecondsが0ならtimerComplete()を呼び出す

    // ここにコードを書いてください
  },

  /**
   * タイマー完了
   */
  timerComplete: function() {
    // ヒント:
    // 1. clearInterval()
    // 2. isRunningをfalseに
    // 3. playSound()で音を鳴らす
    // 4. alert()で通知
    // 5. updateTimerButtons()
    // 6. enableTimerInputs()

    // ここにコードを書いてください
  },

  /**
   * 音を鳴らす
   */
  playSound: function() {
    // ヒント:
    // try-catchで囲む
    // AudioContextを使ってビープ音を生成
    // エラーならconsole.log()

    // ここにコードを書いてください
  },

  /**
   * タイマーのリセット
   */
  resetTimer: function() {
    // ヒント:
    // 1. clearInterval()
    // 2. isRunningをfalseに
    // 3. remainingSecondsをtotalSecondsに戻す
    // 4. displayTimer()
    // 5. updateTimerButtons()
    // 6. enableTimerInputs()

    // ここにコードを書いてください
  },

  /**
   * 時間のフォーマット（ストップウォッチ用）
   */
  formatTime: function(milliseconds) {
    // ヒント:
    // 1. ミリ秒から時・分・秒・ミリ秒を計算
    // 2. padZero()でゼロ埋め
    // 3. "HH:MM:SS.mm"形式の文字列を返す

    // ここにコードを書いてください
  },

  /**
   * 時間のフォーマット（タイマー用）
   */
  formatTimerTime: function(totalSeconds) {
    // ヒント:
    // 1. 秒から時・分・秒を計算
    // 2. padZero()でゼロ埋め
    // 3. "HH:MM:SS"形式の文字列を返す

    // ここにコードを書いてください
  },

  /**
   * ゼロ埋め
   */
  padZero: function(num, length) {
    // ヒント:
    // 1. 数値を文字列に変換
    // 2. 指定された長さになるまで先頭に'0'を追加
    // 3. 文字列を返す

    // ここにコードを書いてください
  },

  /**
   * ストップウォッチの表示
   */
  displayStopwatch: function() {
    // ヒント:
    // 1. formatTime()で時間をフォーマット
    // 2. stopwatch-timeに表示

    // ここにコードを書いてください
  },

  /**
   * タイマーの表示
   */
  displayTimer: function() {
    // ヒント:
    // 1. formatTimerTime()で時間をフォーマット
    // 2. timer-timeに表示

    // ここにコードを書いてください
  },

  /**
   * ラップタイムの表示
   */
  displayLaps: function() {
    // ヒント:
    // 1. laps-listを取得
    // 2. ラップがなければ「ラップタイムはありません」を表示
    // 3. ラップがあれば:
    //    - laps-listをクリア
    //    - 逆順でループ（最新が上）
    //    - 各ラップのlap-item要素を作成
    //    - laps-listに追加

    // ここにコードを書いてください
  },

  /**
   * プリセットから時間を設定
   */
  setTimerFromSeconds: function(totalSeconds) {
    // ヒント:
    // 1. 秒から時・分・秒を計算
    // 2. 入力フィールドに値を設定
    // 3. totalSecondsとremainingSecondsを設定
    // 4. displayTimer()

    // ここにコードを書いてください
  },

  /**
   * タイマー入力を無効化
   */
  disableTimerInputs: function() {
    // ヒント:
    // hours-input, minutes-input, seconds-inputのdisabledをtrueに

    // ここにコードを書いてください
  },

  /**
   * タイマー入力を有効化
   */
  enableTimerInputs: function() {
    // ヒント:
    // hours-input, minutes-input, seconds-inputのdisabledをfalseに

    // ここにコードを書いてください
  },

  /**
   * ストップウォッチボタンの状態更新
   */
  updateStopwatchButtons: function() {
    // ヒント:
    // 1. 各ボタンを取得
    // 2. isRunningによってボタンのテキストと有効/無効を切り替え
    //    - 実行中: スタート→「一時停止」、ラップ有効、リセット無効
    //    - 一時停止中: スタート→「再開」、ラップ無効、リセット有効
    //    - 初期状態: スタート→「スタート」、全て無効

    // ここにコードを書いてください
  },

  /**
   * タイマーボタンの状態更新
   */
  updateTimerButtons: function() {
    // ヒント:
    // 1. 各ボタンを取得
    // 2. isRunningによってボタンのテキストと有効/無効を切り替え

    // ここにコードを書いてください
  },

  /**
   * タブ切り替えの設定
   */
  setupTabs: function() {
    // ヒント:
    // 1. tab-btnのclickイベントを設定
    // 2. data-tab属性からタブ名を取得
    // 3. switchTab()を呼び出す

    // ここにコードを書いてください
  },

  /**
   * タブの切り替え
   */
  switchTab: function(tabName) {
    // ヒント:
    // 1. currentTabを更新
    // 2. 全てのtab-btnとtab-contentからactiveクラスを削除
    // 3. 選択されたタブにactiveクラスを追加

    // ここにコードを書いてください
  },

  /**
   * ストップウォッチの設定
   */
  setupStopwatch: function() {
    var self = this;

    // ヒント:
    // 1. stopwatch-startのclickイベントでstartStopwatch()
    // 2. stopwatch-lapのclickイベントでrecordLap()
    // 3. stopwatch-resetのclickイベントでresetStopwatch()

    // ここにコードを書いてください
  },

  /**
   * タイマーの設定
   */
  setupTimer: function() {
    var self = this;

    // ヒント:
    // 1. timer-startのclickイベントでstartTimer()
    // 2. timer-resetのclickイベントでresetTimer()
    // 3. 入力フィールドのchangeイベントで表示を更新

    // ここにコードを書いてください
  },

  /**
   * プリセットの設定
   */
  setupPresets: function() {
    var self = this;

    // ヒント:
    // 1. preset-btnのclickイベントを設定
    // 2. data-seconds属性から秒数を取得
    // 3. setTimerFromSeconds()を呼び出す

    // ここにコードを書いてください
  }
};

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', function() {
  timerApp.init();
});

// テスト用にエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = timerApp;
}
