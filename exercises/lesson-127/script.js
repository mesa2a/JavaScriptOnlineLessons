// ここに再帰関数を実装してください。
// すべての関数で「ベースケース」と「再帰ケース」を明確にしてください。

// ========================================
// 再帰関数の実装
// ========================================

// countdown(n)
// - ベースケース: n <= 0 の場合、'完了！' を返す
// - 再帰ケース: n + '\n' + countdown(n - 1) を返す
// - 例: countdown(3) → "3\n2\n1\n完了！"

// factorial(n)
// - ベースケース: n <= 1 の場合、1 を返す
// - 再帰ケース: n * factorial(n - 1) を返す
// - 例: factorial(5) → 120

// power(base, exponent)
// - ベースケース: exponent === 0 の場合、1 を返す
// - 再帰ケース: base * power(base, exponent - 1) を返す
// - 例: power(2, 3) → 8

// sum(array)
// - ベースケース: array.length === 0 の場合、0 を返す
// - 再帰ケース: array[0] + sum(array.slice(1)) を返す
// - 例: sum([1, 2, 3]) → 6

// ========================================
// UI関数
// ========================================

// testCountdown()
// - countdownInput の値を取得
// - countdown() を呼び出す
// - 結果を countdownResult に表示

// testFactorial()
// - factorialInput の値を取得
// - factorial() を呼び出す
// - 計算過程も表示（例: "5! = 5 × 4 × 3 × 2 × 1 = 120"）

// testPower()
// - baseInput と exponentInput の値を取得
// - power() を呼び出す
// - 計算過程も表示（例: "2^3 = 2 × 2 × 2 = 8"）

// testSum()
// - テスト用配列: [[1, 2, 3, 4, 5], [10, 20, 30], [100]]
// - 各配列に対して sum() を呼び出す
// - 結果を sumResult に表示
