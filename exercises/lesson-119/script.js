// ここに以下の関数を実装してください。
// 各関数は1つの仕事だけをするように設計してください。

// 1. getFormData()
//    - フォームの3つの入力値を取得
//    - オブジェクト { username, email, password } を返す

// 2. isValidUsername(username)
//    - username が3文字以上ならtrue、そうでなければfalseを返す

// 3. isValidEmail(email)
//    - email に '@' と '.' が含まれていればtrue、そうでなければfalseを返す

// 4. isValidPassword(password)
//    - password が8文字以上ならtrue、そうでなければfalseを返す

// 5. validateForm(data)
//    - isValidUsername(), isValidEmail(), isValidPassword() を使って検証
//    - 各検証が失敗したら { valid: false, message: エラーメッセージ } を返す
//    - すべて成功したら { valid: true, message: '' } を返す

// 6. showError(message)
//    - message を id="message" の要素に表示
//    - className を 'message error' に設定

// 7. showSuccess(username)
//    - username + 'さん、登録が完了しました！' を id="message" の要素に表示
//    - className を 'message success' に設定

// 8. clearForm()
//    - 3つの入力フィールドの値を空文字にする

// 9. register()
//    - getFormData() でデータ取得
//    - validateForm() で検証
//    - 検証失敗なら showError() を呼んでreturn
//    - 検証成功なら showSuccess() と clearForm() を呼ぶ
