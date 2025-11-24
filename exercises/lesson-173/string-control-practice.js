/**
 * レッスン173: 苦手分野の復習（文字列と制御構文編）
 * 演習問題
 */

// ========================================
// 問題1: 文字列の基本操作
// ========================================

/**
 * 文字列を受け取り、以下の情報を含むオブジェクトを返す関数
 * - length: 文字列の長さ
 * - first: 最初の文字
 * - last: 最後の文字
 * - upper: 大文字に変換した文字列
 * - lower: 小文字に変換した文字列
 */
function analyzeString(str) {
  // ヒント:
  // - length プロパティで文字列の長さを取得
  // - charAt(0) で最初の文字
  // - charAt(str.length - 1) で最後の文字
  // - toUpperCase() と toLowerCase() を使用

  // ここにコードを書いてください
}

// テスト
// console.log(analyzeString('Hello'));
// 期待される出力:
// {
//   length: 5,
//   first: 'H',
//   last: 'o',
//   upper: 'HELLO',
//   lower: 'hello'
// }


// ========================================
// 問題2: 文字列の検索と抽出
// ========================================

/**
 * メールアドレスからユーザー名部分（@より前）を抽出する関数
 * 例: 'user@example.com' → 'user'
 */
function extractUsername(email) {
  // ヒント:
  // - indexOf('@') で @ の位置を見つける
  // - substring(0, index) で @ より前を抽出

  // ここにコードを書いてください
}

// テスト
// console.log(extractUsername('tanaka@example.com')); // 'tanaka'
// console.log(extractUsername('sato.hanako@company.co.jp')); // 'sato.hanako'


// ========================================
// 問題3: 文字列の分割と結合
// ========================================

/**
 * カンマ区切りの文字列を受け取り、各要素をトリムして配列にする関数
 * 例: 'apple, banana, orange' → ['apple', 'banana', 'orange']
 */
function parseCSV(str) {
  // ヒント:
  // - split(',') でカンマで分割
  // - 各要素に対して trim() を適用（ループを使う）

  // ここにコードを書いてください
}

// テスト
// console.log(parseCSV('apple, banana, orange'));
// 期待される出力: ['apple', 'banana', 'orange']


// ========================================
// 問題4: 条件分岐（if文）
// ========================================

/**
 * 点数を受け取り、成績を返す関数
 * - 90点以上: 'A'
 * - 80点以上: 'B'
 * - 70点以上: 'C'
 * - 60点以上: 'D'
 * - 60点未満: 'F'
 */
function getGrade(score) {
  // ヒント:
  // - if, else if, else を使用
  // - 大きい値から順に判定

  // ここにコードを書いてください
}

// テスト
// console.log(getGrade(95)); // 'A'
// console.log(getGrade(75)); // 'C'
// console.log(getGrade(55)); // 'F'


// ========================================
// 問題5: 条件分岐（switch文）
// ========================================

/**
 * 曜日番号（0-6）を受け取り、曜日名を返す関数
 * 0: 日曜日, 1: 月曜日, ..., 6: 土曜日
 */
function getDayName(dayNumber) {
  // ヒント:
  // - switch 文を使用
  // - 各 case で該当の曜日名を return
  // - default で 'Invalid day' を return

  // ここにコードを書いてください
}

// テスト
// console.log(getDayName(0)); // '日曜日'
// console.log(getDayName(3)); // '水曜日'
// console.log(getDayName(9)); // 'Invalid day'


// ========================================
// 問題6: ループ（for文）
// ========================================

/**
 * 1からnまでの数値の合計を返す関数
 */
function sum(n) {
  // ヒント:
  // - 合計を保持する変数を用意
  // - for ループで 1 から n まで繰り返す
  // - 各反復で合計に値を加算

  // ここにコードを書いてください
}

// テスト
// console.log(sum(5)); // 15 (1+2+3+4+5)
// console.log(sum(10)); // 55


// ========================================
// 問題7: ループ（while文）
// ========================================

/**
 * 配列から特定の値が最初に見つかったインデックスを返す関数
 * 見つからなければ -1 を返す
 */
function findIndex(arr, target) {
  // ヒント:
  // - index を 0 で初期化
  // - while (index < arr.length) でループ
  // - arr[index] === target なら index を return
  // - そうでなければ index をインクリメント
  // - ループが終わったら -1 を return

  // ここにコードを書いてください
}

// テスト
// console.log(findIndex([1, 2, 3, 4, 5], 3)); // 2
// console.log(findIndex([1, 2, 3, 4, 5], 6)); // -1


// ========================================
// 問題8: break と continue
// ========================================

/**
 * 配列から偶数だけを抽出し、合計が50を超えたら処理を中断する関数
 * 合計値を返す
 */
function sumEvensUntil50(arr) {
  // ヒント:
  // - sum を 0 で初期化
  // - for ループで配列を反復
  // - 奇数なら continue でスキップ
  // - sum が 50 を超えたら break で中断
  // - sum を return

  // ここにコードを書いてください
}

// テスト
// console.log(sumEvensUntil50([1, 2, 3, 4, 5, 20, 30, 10])); // 56 (2+4+20+30)
// console.log(sumEvensUntil50([1, 3, 5, 7])); // 0


// ========================================
// チャレンジ1: バリデーション関数
// ========================================

/**
 * パスワードの強度をチェックする関数
 * 以下の条件をチェックし、結果オブジェクトを返す:
 * - 長さが8文字以上
 * - 英字を含む
 * - 数字を含む
 * - すべての条件を満たしていれば isValid: true
 *
 * 返り値: { isValid: boolean, errors: [] }
 */
function validatePassword(password) {
  // ヒント:
  // - errors 配列を用意
  // - length < 8 ならエラー追加
  // - 英字チェック: ループで各文字を charAt で取得し、
  //   (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') で判定
  // - 数字チェック: ループで各文字を charAt で取得し、
  //   char >= '0' && char <= '9' で判定
  // - errors.length === 0 なら isValid: true

  // ここにコードを書いてください
}

// テスト
// console.log(validatePassword('abc123def'));
// 期待される出力: { isValid: true, errors: [] }

// console.log(validatePassword('abc'));
// 期待される出力: { isValid: false, errors: ['パスワードは8文字以上である必要があります', 'パスワードには数字を含める必要があります'] }


// ========================================
// チャレンジ2: テキストフォーマット関数
// ========================================

/**
 * タイトルケースに変換する関数
 * 各単語の最初の文字を大文字に、残りを小文字にする
 * 例: 'hello world' → 'Hello World'
 */
function toTitleCase(str) {
  // ヒント:
  // 1. toLowerCase() で全体を小文字に
  // 2. split(' ') で単語ごとに分割
  // 3. 各単語に対して:
  //    - charAt(0).toUpperCase() で最初の文字を大文字に
  //    - substring(1) で残りの文字を取得
  //    - それらを結合
  // 4. join(' ') で単語を空白で結合

  // ここにコードを書いてください
}

// テスト
// console.log(toTitleCase('hello world')); // 'Hello World'
// console.log(toTitleCase('javaScript is FUN')); // 'Javascript Is Fun'


// ========================================
// チャレンジ3: 複雑な条件分岐
// ========================================

/**
 * 購入金額と会員ステータスに基づいて割引率を計算する関数
 *
 * ルール:
 * - プレミアム会員:
 *   - 10000円以上: 20%割引
 *   - 5000円以上: 15%割引
 *   - それ以外: 10%割引
 * - 通常会員:
 *   - 10000円以上: 10%割引
 *   - 5000円以上: 5%割引
 *   - それ以外: 割引なし
 * - 非会員: 割引なし
 *
 * 返り値: 割引後の金額
 */
function calculateDiscount(amount, memberType) {
  // ヒント:
  // - memberType で switch または if-else
  // - 各会員タイプ内で金額による条件分岐
  // - 割引率を計算: amount * (1 - discountRate)

  // ここにコードを書いてください
}

// テスト
// console.log(calculateDiscount(12000, 'premium')); // 9600 (20%割引)
// console.log(calculateDiscount(6000, 'regular')); // 5700 (5%割引)
// console.log(calculateDiscount(3000, 'guest')); // 3000 (割引なし)


// ========================================
// 高度な問題: FizzBuzz
// ========================================

/**
 * FizzBuzz問題
 * 1からnまでの数を配列で返す。ただし:
 * - 3で割り切れる数は 'Fizz'
 * - 5で割り切れる数は 'Buzz'
 * - 両方で割り切れる数は 'FizzBuzz'
 */
function fizzBuzz(n) {
  // ヒント:
  // - 結果を格納する配列を用意
  // - 1 から n まで for ループ
  // - 15で割り切れる（3と5両方）を最初にチェック
  // - 次に 3で割り切れるをチェック
  // - 次に 5で割り切れるをチェック
  // - どれでもなければ数値をそのまま

  // ここにコードを書いてください
}

// テスト
// console.log(fizzBuzz(15));
// 期待される出力:
// [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']


// エクスポート（テスト用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    analyzeString: analyzeString,
    extractUsername: extractUsername,
    parseCSV: parseCSV,
    getGrade: getGrade,
    getDayName: getDayName,
    sum: sum,
    findIndex: findIndex,
    sumEvensUntil50: sumEvensUntil50,
    validatePassword: validatePassword,
    toTitleCase: toTitleCase,
    calculateDiscount: calculateDiscount,
    fizzBuzz: fizzBuzz
  };
}
