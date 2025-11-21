// ここに無名関数を使ったイベントリスナーを実装してください。
// すべて addEventListener 内で無名関数を使ってください。

// ========================================
// 1. カウンターアプリ
// ========================================

// グローバル変数
let count = 0;

// upBtn に click イベントを追加（無名関数）
// - count を 1 増やす
// - counterDisplay に count を表示

// downBtn に click イベントを追加（無名関数）
// - count を 1 減らす
// - counterDisplay に count を表示

// resetBtn に click イベントを追加（無名関数）
// - count を 0 にする
// - counterDisplay に count を表示

// ========================================
// 2. リアルタイム入力チェック
// ========================================

// nameInput に input イベントを追加（無名関数）
// - 入力値を取得
// - 空文字なら nameError を空にする
// - 3文字未満なら「3文字以上入力してください」を表示
// - 3文字以上なら nameError を空にする

// emailInput に input イベントを追加（無名関数）
// - 入力値を取得
// - 空文字なら emailError を空にする
// - @ が含まれていなければ「@を含めてください」を表示
// - . が含まれていなければ「.を含めてください」を表示
// - 両方あれば emailError を空にする

// submitBtn に click イベントを追加（無名関数）
// - name と email の値を取得
// - name が 3文字以上 かつ email に @ と . があれば
//   - successMessage に show クラスを追加
//   - setTimeout で 3秒後に show クラスを削除（この中も無名関数）

// ========================================
// 3. マウスイベント
// ========================================

// hoverBtn に mouseover イベントを追加（無名関数）
// - ボタンの背景色を '#2196F3' に変更
// - hoverMessage に「マウスが乗っています」を表示
// - hoverMessage に show クラスを追加

// hoverBtn に mouseout イベントを追加（無名関数）
// - ボタンの背景色を空文字に戻す
// - hoverMessage に「マウスが離れました」を表示
// - setTimeout で 1秒後に show クラスを削除（この中も無名関数）

// hoverBtn に click イベントを追加（無名関数）
// - hoverMessage に「クリックされました！」を表示
// - hoverMessage に show クラスを追加
