/**
 * レッスン171: DOM操作の復習
 * 演習問題
 */

document.addEventListener('DOMContentLoaded', function() {
  // ========================================
  // 問題1: テキスト表示の切り替え
  // ========================================

  // ヒント:
  // 1. getElementById で button と p 要素を取得
  // 2. button に click イベントリスナーを追加
  // 3. p 要素の style.display を 'block' と 'none' で切り替える

  // ここにコードを書いてください


  // ========================================
  // 問題2: カウンター
  // ========================================

  // ヒント:
  // 1. getElementById で count span と両方のボタンを取得
  // 2. 現在の count 値を保持する変数を用意
  // 3. + ボタンで count を増やし、span の textContent を更新
  // 4. - ボタンで count を減らし、span の textContent を更新

  // ここにコードを書いてください


  // ========================================
  // 問題3: タスクリスト
  // ========================================

  // ヒント:
  // 1. getElementById で input, button, ul を取得
  // 2. button に click イベントリスナーを追加
  // 3. input の value を取得
  // 4. createElement で li 要素を作成
  // 5. li の textContent に input の値を設定
  // 6. ul に appendChild で li を追加
  // 7. input の value をクリア

  // ここにコードを書いてください


  // ========================================
  // 問題4: 削除ボタン付きリスト
  // ========================================

  // ヒント:
  // 1. getElementById で ul を取得
  // 2. querySelectorAll で既存の li 要素をすべて取得
  // 3. 各 li に削除ボタンを createElement で作成して追加
  // 4. 削除ボタンに click イベントリスナーを追加
  // 5. クリックされたら、その li を removeChild で削除

  // ここにコードを書いてください


  // ========================================
  // 問題5: スタイルの切り替え
  // ========================================

  // ヒント:
  // 1. getElementById で button と div を取得
  // 2. button に click イベントリスナーを追加
  // 3. div の classList.toggle で 'green' クラスを切り替え

  // ここにコードを書いてください


  // ========================================
  // 問題6: フォームのバリデーション
  // ========================================

  // ヒント:
  // 1. getElementById で form, name input, email input, errors div を取得
  // 2. form に submit イベントリスナーを追加
  // 3. event.preventDefault() でデフォルトの送信を防ぐ
  // 4. name と email の値を取得
  // 5. バリデーション:
  //    - name が空でないか
  //    - email が空でないか
  //    - email に @ が含まれているか
  // 6. エラーがあれば errors div に表示
  // 7. エラーがなければ成功メッセージを表示

  // ここにコードを書いてください


  // ========================================
  // チャレンジ1: テーブルの動的生成
  // ========================================

  // ユーザーデータ
  var users = [
    { name: '田中太郎', age: 25, email: 'tanaka@example.com' },
    { name: '佐藤花子', age: 30, email: 'sato@example.com' },
    { name: '鈴木一郎', age: 28, email: 'suzuki@example.com' }
  ];

  // ヒント:
  // 1. getElementById で button と container を取得
  // 2. button に click イベントリスナーを追加
  // 3. createElement で table 要素を作成
  // 4. thead と tbody を作成
  // 5. thead に th 要素を追加（名前、年齢、メール）
  // 6. users 配列をループして、各ユーザーの tr, td を作成
  // 7. tbody に tr を appendChild
  // 8. table に thead と tbody を appendChild
  // 9. container に table を appendChild

  // ここにコードを書いてください


  // ========================================
  // チャレンジ2: アコーディオンメニュー
  // ========================================

  // ヒント:
  // 1. querySelectorAll で .accordion-header をすべて取得
  // 2. 各 header に click イベントリスナーを追加
  // 3. クリックされたら:
  //    - nextElementSibling で content を取得
  //    - すべての content の display を 'none' にする
  //    - すべての header から 'active' クラスを削除
  //    - クリックされた content の display を 'block' にする
  //    - クリックされた header に 'active' クラスを追加
  // 4. 同じ header を再度クリックしたら閉じる処理も追加

  // ここにコードを書いてください

});
