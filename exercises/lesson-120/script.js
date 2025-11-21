// ここに以下の関数を実装してください。
// すべての関数は「動詞で始まる」「わかりやすい名前」を意識してください。

// ========================================
// カート機能
// ========================================

// getPrice()
// - priceInput から価格を取得して数値で返す

// getQuantity()
// - quantityInput から数量を取得して数値で返す

// calculateSubtotal(price, quantity)
// - price * quantity を計算して返す

// calculateTax(subtotal)
// - subtotal * 0.1 を計算して返す（税率10%）

// calculateTotal(subtotal, tax)
// - subtotal + tax を計算して返す

// showCartSummary(subtotal, tax, total)
// - cartResult 要素に以下の内容を表示:
//   小計: ¥XXX
//   税金: ¥XXX
//   合計: ¥XXX

// updateCart()
// - 上記の関数を組み合わせてカート情報を更新・表示

// ========================================
// ユーザー情報機能
// ========================================

// getUserName()
// - nameInput から名前を取得して返す

// getUserEmail()
// - emailInput からメールを取得して返す

// validateEmail(email)
// - email に '@' と '.' が含まれていれば true、そうでなければ false

// createUserData(name, email)
// - { name: name, email: email, createdAt: 現在日時 } を返す

// showUserResult(message)
// - userResult 要素に message を表示

// saveUserInfo()
// - 名前とメールを取得
// - 名前が空なら「名前を入力してください」を表示してreturn
// - メールが無効なら「正しいメールアドレスを入力してください」を表示してreturn
// - ユーザーデータを作成して成功メッセージを表示

// ========================================
// メッセージ表示機能
// ========================================

// showWelcomeMessage()
// - messageArea に「ようこそ!ショッピングカートへ」を表示

// hideMessage()
// - messageArea の内容を空にする
