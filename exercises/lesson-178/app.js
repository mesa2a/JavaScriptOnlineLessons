/**
 * レッスン178: 計算機アプリケーション
 * 演習用テンプレート
 */

var calculator = {
  state: {
    currentOperand: '0',
    previousOperand: '',
    operation: null,
    waitingForOperand: false,
    history: []
  },

  /**
   * 初期化処理
   */
  init: function() {
    // ヒント:
    // 1. イベントリスナーを設定
    // 2. 履歴を読み込み
    // 3. ディスプレイを更新

    // ここにコードを書いてください
  },

  /**
   * 数字入力の処理
   */
  inputDigit: function(digit) {
    // ヒント:
    // 1. waitingForOperandがtrueなら新しい数値を開始
    // 2. falseなら現在の数値に数字を追加
    // 3. 現在の数値が'0'なら上書き
    // 4. ディスプレイを更新

    // ここにコードを書いてください
  },

  /**
   * 小数点の処理
   */
  inputDecimal: function() {
    // ヒント:
    // 1. waitingForOperandがtrueなら'0.'を設定
    // 2. すでに小数点が含まれていないかチェック
    // 3. 含まれていなければ'.'を追加
    // 4. ディスプレイを更新

    // ここにコードを書いてください
  },

  /**
   * 演算子の処理
   */
  performOperation: function(nextOperation) {
    // ヒント:
    // 1. previousOperandが空なら現在の値をセット
    // 2. operationがあれば前の演算を実行
    // 3. 計算結果を履歴に追加
    // 4. waitingForOperandをtrueに設定
    // 5. 新しい演算子をセット
    // 6. ディスプレイを更新

    // ここにコードを書いてください
  },

  /**
   * 計算ロジック
   */
  calculate: function(firstOperand, secondOperand, operation) {
    // ヒント:
    // switch文で演算子ごとに処理
    // '+': 加算
    // '-': 減算
    // '×': 乗算
    // '÷': 除算（0での除算チェック）
    // エラーの場合は'エラー'を返す

    // ここにコードを書いてください
  },

  /**
   * イコールの処理
   */
  performEquals: function() {
    // ヒント:
    // 1. operationとpreviousOperandがあるかチェック
    // 2. calculate()で計算
    // 3. 計算結果を履歴に追加
    // 4. 状態をリセット（operation, previousOperandをクリア）
    // 5. waitingForOperandをtrueに設定
    // 6. ディスプレイを更新

    // ここにコードを書いてください
  },

  /**
   * AC（All Clear）: すべてクリア
   */
  clearAll: function() {
    // ヒント:
    // 1. currentOperandを'0'に
    // 2. previousOperandを''に
    // 3. operationをnullに
    // 4. waitingForOperandをfalseに
    // 5. ディスプレイを更新

    // ここにコードを書いてください
  },

  /**
   * C（Clear）: 現在の数値のみクリア
   */
  clearCurrent: function() {
    // ヒント:
    // 1. currentOperandを'0'に
    // 2. ディスプレイを更新

    // ここにコードを書いてください
  },

  /**
   * バックスペース機能
   */
  backspace: function() {
    // ヒント:
    // 1. currentOperandの長さが1より大きいなら最後の1文字を削除
    // 2. 長さが1なら'0'をセット
    // 3. ディスプレイを更新

    // ここにコードを書いてください
  },

  /**
   * 符号反転
   */
  toggleSign: function() {
    // ヒント:
    // 1. currentOperandをparseFloat()で数値に変換
    // 2. -1を掛ける
    // 3. 文字列に戻してcurrentOperandにセット
    // 4. ディスプレイを更新

    // ここにコードを書いてください
  },

  /**
   * パーセント計算
   */
  percentage: function() {
    // ヒント:
    // 1. currentOperandをparseFloat()で数値に変換
    // 2. 100で割る
    // 3. 文字列に戻してcurrentOperandにセット
    // 4. ディスプレイを更新

    // ここにコードを書いてください
  },

  /**
   * ディスプレイの更新
   */
  updateDisplay: function() {
    // ヒント:
    // 1. current-operandにformatNumber(currentOperand)を表示
    // 2. operationがあればprevious-operandに「数値 演算子」を表示
    // 3. operationがなければprevious-operandを空に

    // ここにコードを書いてください
  },

  /**
   * 数値のフォーマット（カンマ区切り）
   */
  formatNumber: function(num) {
    // ヒント:
    // 1. 'エラー'ならそのまま返す
    // 2. '.'で分割
    // 3. 整数部分に3桁ごとにカンマを挿入
    //    replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // 4. 小数部分と結合して返す

    // ここにコードを書いてください
  },

  /**
   * 計算履歴に追加
   */
  addToHistory: function(entry) {
    // ヒント:
    // 1. historyの先頭に追加（unshift）
    // 2. 履歴が10件を超えたら最後を削除（pop）
    // 3. saveHistory()で保存
    // 4. displayHistory()で表示

    // ここにコードを書いてください
  },

  /**
   * 計算履歴を表示
   */
  displayHistory: function() {
    // ヒント:
    // 1. history-listを取得
    // 2. 履歴が空なら「履歴がありません」を表示
    // 3. 履歴があれば:
    //    - history-listをクリア
    //    - 各履歴に対してhistory-item要素を作成
    //    - history-listに追加

    // ここにコードを書いてください
  },

  /**
   * 履歴をクリア
   */
  clearHistory: function() {
    // ヒント:
    // 1. historyを空配列に
    // 2. saveHistory()で保存
    // 3. displayHistory()で表示更新

    // ここにコードを書いてください
  },

  /**
   * 履歴をlocalStorageに保存
   */
  saveHistory: function() {
    // ヒント:
    // localStorage.setItem('calculatorHistory', JSON.stringify(this.state.history))

    // ここにコードを書いてください
  },

  /**
   * 履歴をlocalStorageから読み込み
   */
  loadHistory: function() {
    // ヒント:
    // 1. localStorage.getItem('calculatorHistory')で取得
    // 2. あればJSON.parseして配列に変換
    // 3. try-catchでエラーハンドリング
    // 4. displayHistory()で表示

    // ここにコードを書いてください
  },

  /**
   * キーボードイベントの設定
   */
  setupKeyboardEvents: function() {
    var self = this;

    document.addEventListener('keydown', function(e) {
      // ヒント:
      // 数字キー（0-9）: inputDigit()
      // 演算子キー（+, -, *, /）: performOperation()
      //   *は×に、/は÷に変換
      // 小数点（.）: inputDecimal()
      // Enter または =: performEquals()
      // Backspace: backspace()
      // Escape: clearAll()

      // ここにコードを書いてください
    });
  },

  /**
   * イベントリスナーの設定
   */
  setupEventListeners: function() {
    var self = this;

    // 数字ボタン
    // ヒント: querySelectorAll('.btn-number')でボタンを取得
    //        data-value属性から数字を取得してinputDigit()を呼び出す

    // ここにコードを書いてください

    // 演算子ボタン
    // ヒント: querySelectorAll('.btn-operator')でボタンを取得
    //        data-operation属性から演算子を取得してperformOperation()を呼び出す

    // ここにコードを書いてください

    // 小数点ボタン
    // ヒント: getElementById('btn-decimal')でボタンを取得
    //        clickイベントでinputDecimal()を呼び出す

    // ここにコードを書いてください

    // イコールボタン
    // ヒント: getElementById('btn-equals')でボタンを取得
    //        clickイベントでperformEquals()を呼び出す

    // ここにコードを書いてください

    // ACボタン
    // ここにコードを書いてください

    // Cボタン
    // ここにコードを書いてください

    // バックスペースボタン
    // ここにコードを書いてください

    // 符号反転ボタン
    // ここにコードを書いてください

    // パーセントボタン
    // ここにコードを書いてください

    // 履歴クリアボタン
    // ここにコードを書いてください

    // キーボードイベント
    this.setupKeyboardEvents();
  }
};

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', function() {
  calculator.init();
});

// テスト用にエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = calculator;
}
