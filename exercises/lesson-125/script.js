// ここに関数を返す関数を実装してください。

// ========================================
// 1. 挨拶ファクトリー
// ========================================

// createGreeting(greeting)
// - 引数: greeting (挨拶の文字列)
// - 戻り値: 関数
//   - その関数は name を引数に取る
//   - その関数は greeting + '、' + name + 'さん！' を返す

// sayHelloFunc を作成（createGreeting('こんにちは') を呼ぶ）
// sayGoodbyeFunc を作成（createGreeting('さようなら') を呼ぶ）

// UI関数:
// sayHello() - nameInput の値を取得して sayHelloFunc に渡し、結果を greetResult に表示
// sayGoodbye() - nameInput の値を取得して sayGoodbyeFunc に渡し、結果を greetResult に表示

// ========================================
// 2. 掛け算ファクトリー
// ========================================

// createMultiplier(multiplier)
// - 引数: multiplier (掛ける数)
// - 戻り値: 関数
//   - その関数は value を引数に取る
//   - その関数は value * multiplier を返す

// double を作成（createMultiplier(2) を呼ぶ）
// triple を作成（createMultiplier(3) を呼ぶ）

// UI関数:
// applyDouble() - multiplyInput の値を取得して double に渡し、結果を multiplyResult に表示
// applyTriple() - multiplyInput の値を取得して triple に渡し、結果を multiplyResult に表示

// ========================================
// 3. カウンターファクトリー
// ========================================

// createCounter(initialValue)
// - 引数: initialValue (初期値)
// - プライベート変数 count を initialValue で初期化
// - 戻り値: オブジェクト
//   - increment(): count を 1 増やして返す
//   - decrement(): count を 1 減らして返す
//   - getValue(): count を返す
//   - reset(): count を initialValue に戻して返す

// counter1 を作成（createCounter(0) を呼ぶ）
// counter2 を作成（createCounter(0) を呼ぶ）

// UI関数:
// incrementCounter1() - counter1.increment() を呼んで counter1Display を更新
// decrementCounter1() - counter1.decrement() を呼んで counter1Display を更新
// incrementCounter2() - counter2.increment() を呼んで counter2Display を更新
// decrementCounter2() - counter2.decrement() を呼んで counter2Display を更新
