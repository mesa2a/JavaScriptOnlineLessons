# レッスン127：再帰入門

## 学習目標
- 再帰関数とは何かを理解する
- 終了条件（ベースケース）の重要性を学ぶ
- 再帰を使ったカウントダウンを実装できる

## 再帰関数とは

**再帰関数**は、自分自身を呼び出す関数のことです。

### 基本例：カウントダウン

```javascript
function countdown(n) {
  // 終了条件
  if (n <= 0) {
    console.log('完了！');
    return;
  }

  // 現在の数を表示
  console.log(n);

  // 自分自身を呼ぶ（再帰呼び出し）
  countdown(n - 1);
}

countdown(3);
```

出力:
```
3
2
1
完了！
```

## 再帰の仕組み

再帰は以下の2つの要素で構成されます：

### 1. ベースケース（終了条件）

再帰を止める条件です。これがないと無限ループになります。

```javascript
if (n <= 0) {
  return;  // ここで止まる
}
```

### 2. 再帰ケース

問題を小さくして、自分自身を呼び出します。

```javascript
countdown(n - 1);  // より小さい問題に
```

## 再帰の流れ

`countdown(3)` を呼んだ時の流れ：

```
countdown(3)
  console.log(3)
  countdown(2)
    console.log(2)
    countdown(1)
      console.log(1)
      countdown(0)
        console.log('完了！')
        return
      return
    return
  return
```

## 実践例：階乗の計算

階乗（factorial）は `n! = n × (n-1) × ... × 1` です。

```javascript
function factorial(n) {
  // ベースケース
  if (n <= 1) {
    return 1;
  }

  // 再帰ケース
  return n * factorial(n - 1);
}

console.log(factorial(5));  // 120 (5 × 4 × 3 × 2 × 1)
```

計算の流れ：
```
factorial(5)
= 5 × factorial(4)
= 5 × (4 × factorial(3))
= 5 × (4 × (3 × factorial(2)))
= 5 × (4 × (3 × (2 × factorial(1))))
= 5 × (4 × (3 × (2 × 1)))
= 5 × 4 × 3 × 2 × 1
= 120
```

## 実践例：累乗の計算

`power(2, 3)` = 2³ = 2 × 2 × 2 = 8

```javascript
function power(base, exponent) {
  // ベースケース
  if (exponent === 0) {
    return 1;
  }

  // 再帰ケース
  return base * power(base, exponent - 1);
}

console.log(power(2, 3));  // 8
console.log(power(5, 2));  // 25
```

## 実践例：合計の計算

配列の合計を再帰で計算します。

```javascript
function sum(array) {
  // ベースケース：配列が空
  if (array.length === 0) {
    return 0;
  }

  // 再帰ケース：最初の要素 + 残りの合計
  return array[0] + sum(array.slice(1));
}

console.log(sum([1, 2, 3, 4, 5]));  // 15
```

計算の流れ：
```
sum([1, 2, 3, 4, 5])
= 1 + sum([2, 3, 4, 5])
= 1 + (2 + sum([3, 4, 5]))
= 1 + (2 + (3 + sum([4, 5])))
= 1 + (2 + (3 + (4 + sum([5]))))
= 1 + (2 + (3 + (4 + (5 + sum([])))))
= 1 + (2 + (3 + (4 + (5 + 0))))
= 15
```

## 実践例：文字列の反転

```javascript
function reverse(str) {
  // ベースケース：空文字または1文字
  if (str.length <= 1) {
    return str;
  }

  // 再帰ケース：最後の文字 + 残りを反転
  return str[str.length - 1] + reverse(str.slice(0, -1));
}

console.log(reverse('hello'));  // 'olleh'
```

## 実践例：カウントアップ

```javascript
function countUp(start, end) {
  // ベースケース
  if (start > end) {
    return;
  }

  console.log(start);

  // 再帰ケース
  countUp(start + 1, end);
}

countUp(1, 5);
```

出力:
```
1
2
3
4
5
```

## 実践例：フィボナッチ数列

フィボナッチ数列は `0, 1, 1, 2, 3, 5, 8, 13, ...`

```javascript
function fibonacci(n) {
  // ベースケース
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  // 再帰ケース
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6));  // 8
```

## 再帰 vs ループ

同じ処理でも、ループでも書けます。

### ループ版

```javascript
function countdownLoop(n) {
  for (let i = n; i > 0; i--) {
    console.log(i);
  }
  console.log('完了！');
}
```

### 再帰版

```javascript
function countdownRecursive(n) {
  if (n <= 0) {
    console.log('完了！');
    return;
  }
  console.log(n);
  countdownRecursive(n - 1);
}
```

どちらも同じ結果ですが、問題によって向き不向きがあります。

## 再帰が向いている場合

- 木構造やネストしたデータ
- 分割統治法（問題を小さく分割）
- 数学的な定義（階乗、フィボナッチなど）

## 注意点

### 1. 無限再帰に注意

終了条件がないと無限ループになります。

```javascript
// 危険：終了条件がない
function infinite(n) {
  console.log(n);
  infinite(n - 1);  // 永遠に続く！
}
```

### 2. スタックオーバーフロー

再帰が深すぎるとエラーになります。

```javascript
// 深すぎる再帰
countdown(100000);  // エラー: Maximum call stack size exceeded
```

### 3. パフォーマンス

単純な再帰は遅い場合があります（特にフィボナッチ）。

## 実践例：配列の最大値

```javascript
function max(array) {
  // ベースケース：要素が1つ
  if (array.length === 1) {
    return array[0];
  }

  // 再帰ケース：最初の要素 vs 残りの最大値
  const restMax = max(array.slice(1));
  return array[0] > restMax ? array[0] : restMax;
}

console.log(max([3, 7, 2, 9, 1]));  // 9
```

## 実践例：配列の長さ

```javascript
function length(array) {
  // ベースケース：空配列
  if (array.length === 0) {
    return 0;
  }

  // 再帰ケース：1 + 残りの長さ
  return 1 + length(array.slice(1));
}

console.log(length([1, 2, 3, 4]));  // 4
```

## まとめ

1. **再帰関数**は自分自身を呼び出す
2. **ベースケース**（終了条件）が必須
3. **再帰ケース**で問題を小さくする
4. 構文: `if (終了条件) { return; } 自分を呼ぶ();`
5. カウントダウン、階乗、累乗などに使える

### 再帰の基本パターン

```javascript
function recursive(n) {
  // 1. ベースケース（終了条件）
  if (n <= 0) {
    return;  // または基本的な値を返す
  }

  // 2. 何か処理

  // 3. 再帰ケース（自分を呼ぶ）
  recursive(n - 1);  // 問題を小さくする
}
```

### チェックリスト

- ✅ ベースケースがある
- ✅ 再帰呼び出しで問題が小さくなる
- ✅ 必ず終了条件に到達する

再帰は強力な手法ですが、終了条件を忘れないように注意しましょう。

次回は、ユーティリティ関数について学びます。
