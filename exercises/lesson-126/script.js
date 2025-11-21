// ここにコールバック関数を受け取る高階関数を実装してください。

// ========================================
// 高階関数の実装
// ========================================

// forEach(array, callback)
// - 配列の各要素に対してcallbackを実行
// - callback には (要素, インデックス) を渡す

// filter(array, callback)
// - callbackがtrueを返す要素だけを集めた新しい配列を返す
// - callback には要素を渡す

// map(array, callback)
// - 各要素をcallbackで変換した新しい配列を返す
// - callback には要素を渡す

// repeat(count, callback)
// - count回だけcallbackを実行
// - callback には現在のインデックス(0から)を渡す

// ========================================
// UI関数
// ========================================

// testForEach()
// - fruits = ['りんご', 'バナナ', 'オレンジ']
// - forEachを使って各要素を「インデックス: 要素」の形式でforEachResultに表示

// testFilter()
// - numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// - filterInputの値を取得
// - filterを使ってその値より大きい数だけを抽出
// - 元の配列と抽出結果をfilterResultに表示

// testMapDouble()
// - numbers = [1, 2, 3, 4, 5]
// - mapを使って各要素を2倍にする
// - 元の配列と変換結果をmapResultに表示

// testMapSquare()
// - numbers = [1, 2, 3, 4, 5]
// - mapを使って各要素を2乗にする
// - 元の配列と変換結果をmapResultに表示

// testRepeatStar()
// - repeatInputの値を取得
// - repeatを使って、i+1個の★を表示（★, ★★, ★★★, ...）
// - repeatResultに表示

// testRepeatNumber()
// - repeatInputの値を取得
// - repeatを使って「繰り返し X 回目」を表示
// - repeatResultに表示
