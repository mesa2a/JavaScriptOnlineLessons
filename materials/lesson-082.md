---
title: "Lesson 082: continue文"
author: "JavaScript学習教材"
date: "2025-01-21"
---

# レッスン82：continue文

## 今回の学習

### 前回の復習

前回のレッスンでは、ループとDOM操作について学びました。

- **動的なHTML生成**：forループを使って複数のHTML要素を効率的に作成する方法を学びました
- **ループの実用例**：リストの自動生成や番号付けなど、実際のWebアプリケーションで使われるパターンを理解しました
- **成果物**：番号付きリスト - ループを使って複数の要素を動的に生成するプログラムを実装しました

### 今回の目標

今回のレッスンでは、ループの一部をスキップする`continue`文について学びます。

- スキップ処理の仕組みを理解する
- 特定条件を除外する方法を学ぶ
- フィルタリングの基本を習得する

## continue文とは

前回学んだ`break`文は、ループを完全に終了させる命令でした。一方、**continue文**は、現在のループ処理だけをスキップして、次のループに進む命令です。

### break文とcontinue文の違い

```javascript
// break：ループを終了
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break;  // ループ終了
  }
  console.log(i);
}
// 結果：1, 2

// continue：現在の処理をスキップ
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;  // 3をスキップ
  }
  console.log(i);
}
// 結果：1, 2, 4, 5
```

### 日常生活での例え

continue文は、日常生活の中でもよく見られる考え方です。

例えば、「クラスの名簿を読み上げる」という場面を考えてみましょう。

```
for (各生徒) {
  if (欠席している) {
    continue;  // この生徒はスキップして次へ
  }
  名前を呼ぶ
}
```

欠席している生徒の名前は呼ばずに、次の生徒に進みます。これがcontinue文の役割です。

## continue文の基本構文

continue文は、if文と組み合わせて使います。

```javascript
for (let i = 1; i <= 10; i++) {
  if (条件) {
    continue;  // 条件が真なら、この後の処理をスキップ
  }

  // ここの処理は、条件が偽のときだけ実行される
  console.log(i);
}
```

### 実行の流れ

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log(i);
}
```

1. **i = 1のとき**：`i === 3`は偽、`console.log(1)`を実行
2. **i = 2のとき**：`i === 3`は偽、`console.log(2)`を実行
3. **i = 3のとき**：`i === 3`が真、`continue`でスキップ（console.logは実行されない）
4. **i = 4のとき**：`i === 3`は偽、`console.log(4)`を実行
5. **i = 5のとき**：`i === 3`は偽、`console.log(5)`を実行

実行結果：

```
1
2
4
5
```

## 偶数と奇数のフィルタリング

continue文は、特定の条件に合うものだけを処理したいときに便利です。

### 奇数だけを表示

```javascript
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;  // 偶数はスキップ
  }
  console.log(i);
}
```

実行結果：

```
1
3
5
7
9
```

### 偶数だけを表示

```javascript
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    continue;  // 奇数はスキップ
  }
  console.log(i);
}
```

実行結果：

```
2
4
6
8
10
```

### 3の倍数をスキップ

```javascript
for (let i = 1; i <= 15; i++) {
  if (i % 3 === 0) {
    continue;  // 3の倍数はスキップ
  }
  console.log(i);
}
```

実行結果：

```
1
2
4
5
7
8
10
11
13
14
```

## continue文とDOM操作

continue文を使って、条件に合う要素だけを表示することができます。

### 偶数の番号だけを表示

```javascript
let result = document.getElementById("result");

for (let i = 1; i <= 20; i++) {
  if (i % 2 !== 0) {
    continue;  // 奇数はスキップ
  }

  let p = document.createElement("p");
  p.textContent = i;
  result.appendChild(p);
}
```

このコードは、2、4、6、8...という偶数だけを表示します。

### 5の倍数だけを表示

```javascript
let result = document.getElementById("result");

for (let i = 1; i <= 50; i++) {
  if (i % 5 !== 0) {
    continue;  // 5の倍数以外はスキップ
  }

  let p = document.createElement("p");
  p.textContent = i + "は5の倍数です";
  result.appendChild(p);
}
```

実行結果：

```
5は5の倍数です
10は5の倍数です
15は5の倍数です
...
```

## continue文の実用例

continue文は、不要なデータを除外する際に非常に便利です。

### 空の入力をスキップ

```javascript
let items = ["りんご", "", "みかん", "", "ぶどう"];
let result = document.getElementById("result");

for (let i = 0; i < items.length; i++) {
  if (items[i] === "") {
    continue;  // 空の要素はスキップ
  }

  let p = document.createElement("p");
  p.textContent = items[i];
  result.appendChild(p);
}
```

このコードは、空でない要素だけを表示します。

### 特定の値を除外

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 4 || i === 7) {
    continue;  // 4と7はスキップ
  }
  console.log(i);
}
```

実行結果：

```
1
2
3
5
6
8
9
10
```

## continueを使わない書き方との比較

continue文を使わずに、同じことを実現することもできます。

### continue文を使う場合

```javascript
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    continue;
  }
  console.log(i);
}
```

### if文だけを使う場合

```javascript
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}
```

どちらも同じ結果になりますが、continue文を使うと「除外する条件」を明確に書くことができます。

### continue文が便利な場合

処理が複雑な場合、continue文を使った方が読みやすくなることがあります。

```javascript
// continue文を使う場合
for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0) {
    continue;  // 3の倍数は除外
  }

  // ここから複雑な処理
  let result = i * i;
  console.log(result);
  // さらに処理が続く...
}

// if文だけを使う場合
for (let i = 1; i <= 100; i++) {
  if (i % 3 !== 0) {
    // ここから複雑な処理
    let result = i * i;
    console.log(result);
    // さらに処理が続く...
  }  // ネストが深くなる
}
```

continue文を使うと、除外条件を先に書いて、メインの処理をネストせずに書くことができます。

## while文でのcontinue

continue文は、while文でも使うことができます。

```javascript
let i = 0;

while (i < 10) {
  i++;

  if (i % 2 === 0) {
    continue;  // 偶数はスキップ
  }

  console.log(i);
}
```

**注意**：while文でcontinue文を使う場合、カウンタの更新（`i++`）をcontinueの前に書く必要があります。そうしないと、無限ループになる可能性があります。

```javascript
// 危険：無限ループになる可能性
let i = 0;

while (i < 10) {
  if (i % 2 === 0) {
    continue;  // i++がスキップされる
  }

  console.log(i);
  i++;  // ここに到達しない場合がある
}
```

## 実践例：偶数だけ表示

HTMLとJavaScriptを組み合わせて、偶数だけを表示するプログラムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>偶数フィルター</title>
</head>
<body>
    <h1>偶数だけ表示</h1>
    <button id="showEven">1から20までの偶数を表示</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let showEven = document.getElementById("showEven");
let result = document.getElementById("result");

showEven.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // 1から20まで繰り返す
  for (let i = 1; i <= 20; i++) {
    // 奇数はスキップ
    if (i % 2 !== 0) {
      continue;
    }

    // 偶数だけ表示
    let p = document.createElement("p");
    p.textContent = i + "は偶数です";
    result.appendChild(p);
  }
});
```

### コードの詳しい説明

**ループの設定**
```javascript
for (let i = 1; i <= 20; i++)
```
1から20まで繰り返します。

**奇数のスキップ**
```javascript
if (i % 2 !== 0) {
  continue;
}
```
- `i % 2 !== 0`は、`i`が奇数のときに真になります
- `continue`で、奇数の場合は以降の処理をスキップします

**偶数の表示**
```javascript
let p = document.createElement("p");
p.textContent = i + "は偶数です";
result.appendChild(p);
```
continueでスキップされなかった場合（つまり偶数の場合）だけ、この処理が実行されます。

## continue文の注意点

### 1. ネストしたループでの動作

continue文は、最も内側のループにのみ影響します。

```javascript
for (let i = 1; i <= 3; i++) {
  console.log("外側: " + i);

  for (let j = 1; j <= 3; j++) {
    if (j === 2) {
      continue;  // 内側のループだけスキップ
    }
    console.log("  内側: " + j);
  }
}
```

実行結果：

```
外側: 1
  内側: 1
  内側: 3
外側: 2
  内側: 1
  内側: 3
外側: 3
  内側: 1
  内側: 3
```

### 2. continue後の処理は実行されない

```javascript
for (let i = 1; i <= 5; i++) {
  console.log("開始: " + i);

  if (i === 3) {
    continue;
  }

  console.log("終了: " + i);  // i=3のときは実行されない
}
```

### 3. 複雑な条件では可読性に注意

```javascript
// 読みにくい
for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0 && i % 3 !== 0 && i < 50) {
    continue;
  }
  console.log(i);
}

// より分かりやすい
for (let i = 1; i <= 100; i++) {
  let isEven = i % 2 === 0;
  let notDivisibleBy3 = i % 3 !== 0;
  let lessThan50 = i < 50;

  if (isEven && notDivisibleBy3 && lessThan50) {
    continue;
  }
  console.log(i);
}
```

## 練習問題

### 課題：偶数だけ表示

continue文を使って、1から20までの数字のうち、偶数だけを表示するプログラムを作成してください。

### 保存場所

`exercises/lesson-082/`フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は`index.html`のコメント部分に追加し、JavaScriptコードは`script.js`に記述してください。ブラウザで`index.html`を開いて動作を確認しましょう。

### 手順

1. スキップ処理を実装する
2. 特定条件を除外する仕組みを作る
3. フィルタリングを組み込む

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-082
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

continue文を実装する際のポイントを確認しましょう。

**continue文の配置**
- continue文はif文の中に書きます
- 条件が真のときに、以降の処理がスキップされます
- continueの後の処理は実行されません

**偶数の判定**
- `i % 2 === 0`で偶数を判定できます
- `i % 2 !== 0`で奇数を判定できます
- 奇数をスキップすれば、偶数だけが残ります

**for文との組み合わせ**
- for文の更新式（`i++`）は、continueの影響を受けません
- continueしても、次のループには必ず進みます

**結果の表示**
- continueでスキップされなかった場合だけ、要素を作成します
- `textContent`に数字を設定します
- `appendChild()`で結果に追加します

### 解答例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 082</title>
</head>
<body>
    <h1>偶数だけ表示</h1>
    <button id="showEven">1から20までの偶数を表示</button>
    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
```

```javascript
let showEven = document.getElementById("showEven");
let result = document.getElementById("result");

showEven.addEventListener("click", function() {
  // 結果をクリア
  result.innerHTML = "";

  // 1から20まで繰り返す
  for (let i = 1; i <= 20; i++) {
    // 奇数はスキップ
    if (i % 2 !== 0) {
      continue;
    }

    // 偶数だけ表示
    let p = document.createElement("p");
    p.textContent = i + "は偶数です";
    result.appendChild(p);
  }
});
```

### 解説

このコードでは、continue文を使って偶数だけを表示しています。

**ループの構造**
```javascript
for (let i = 1; i <= 20; i++)
```
1から20まで、すべての数字を順番に処理します。

**奇数のスキップ**
```javascript
if (i % 2 !== 0) {
  continue;
}
```
- `i % 2`は、`i`を2で割った余りです
- 余りが0でない（`!== 0`）ということは、奇数です
- 奇数の場合、`continue`で以降の処理をスキップします

**偶数の処理**
```javascript
let p = document.createElement("p");
p.textContent = i + "は偶数です";
result.appendChild(p);
```
- continueでスキップされなかった数字（つまり偶数）だけが、ここに到達します
- 新しい段落要素を作成し、「○は偶数です」というテキストを設定します
- `result`に追加して画面に表示します

**breakとの違い**
もしbreakを使った場合：
```javascript
for (let i = 1; i <= 20; i++) {
  if (i % 2 !== 0) {
    break;  // 最初の奇数（1）でループ終了
  }
  // 何も表示されない
}
```
breakはループ全体を終了させるため、最初の奇数（1）でループが終わってしまいます。continueは現在の処理だけをスキップして次に進むため、すべての偶数を処理できます。

## まとめ

お疲れ様でした。今回のレッスンでは、continue文について学びました。

**今回学んだキーポイント**

- **continue文**：現在のループ処理だけをスキップして、次のループに進む命令です。breakと異なり、ループ全体は終了しません
- **ループの部分スキップ**：特定の条件に合う場合だけ処理をスキップすることで、不要なデータを除外できます。フィルタリングに非常に便利です
- **実用的なパターン**：偶数・奇数のフィルタリング、空の値の除外、特定の値のスキップなど、さまざまな場面で活用できます
- **breakとの使い分け**：breakはループを終了、continueは現在の処理をスキップ。目的に応じて適切に使い分けることが重要です

continue文は、不要なデータを除外して必要なものだけを処理する際に非常に便利です。breakと組み合わせることで、より柔軟なループ制御が可能になります。

次のレッスンでは、ループの選択について学びます。while文とfor文の使い分けや、可読性を考慮したループの書き方を理解していきましょう。
