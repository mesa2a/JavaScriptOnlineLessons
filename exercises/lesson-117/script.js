// ここに以下の内容を実装してください：

// 1. グローバル変数を宣言
//    - score (数値、初期値0)
//    - history (配列、初期値空配列)

// 2. addScore(points) 関数
//    - グローバル変数 score に points を加算
//    - addHistory('+' + points + '点') を呼び出し
//    - updateDisplay() を呼び出し

// 3. subtractScore(points) 関数
//    - グローバル変数 score から points を減算
//    - addHistory('-' + points + '点') を呼び出し
//    - updateDisplay() を呼び出し

// 4. resetScore() 関数
//    - グローバル変数 score を 0 にリセット
//    - グローバル変数 history を空配列にリセット
//    - addHistory('リセット') を呼び出し
//    - updateDisplay() を呼び出し

// 5. addHistory(action) 関数
//    - 現在時刻を取得
//    - グローバル変数 history に以下のオブジェクトを追加:
//      { time: 時刻, action: action, score: 現在のスコア }

// 6. updateDisplay() 関数
//    - scoreDisplay 要素に score の値を表示
//    - historyList 要素に history の内容を表示（最新が上）

// 7. 最後に updateDisplay() を呼び出して初期表示
