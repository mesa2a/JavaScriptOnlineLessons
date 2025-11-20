---
title: "Lesson 056: switch文入門"
author: "JavaScript学習教材"
date: "2025-11-20"
---

## 今回の学習

### 前回の復習

前回のレッスンでは、おみくじアプリを作成しました。`Math.random()`を使ってランダムな数値を生成し、その値に応じて運勢を判定するプログラムを実装しました。乱数生成と確率的な処理の基礎を学び、実行するたびに異なる結果が得られる動的なアプリケーションを作ることができました。

### 今回の目標

今回のレッスンでは、新しい条件分岐の方法である**switch文**を学びます。これまで`if`文や`else if`を使って多分岐の処理を書いてきましたが、switch文はある値によって処理を分岐させる場合により読みやすく書ける方法です。

今回のレッスンで習得する内容は以下の通りです。

- switch-case構文の書き方と使い方
- break文の役割と重要性
- default節の使い方

## switch文とは

これまで、複数の条件で処理を分岐させる場合、`else if`を使って以下のように書いてきました。

```javascript
let day = 1;

if (day === 0) {
  console.log("日曜日");
} else if (day === 1) {
  console.log("月曜日");
} else if (day === 2) {
  console.log("火曜日");
} else if (day === 3) {
  console.log("水曜日");
} else if (day === 4) {
  console.log("木曜日");
} else if (day === 5) {
  console.log("金曜日");
} else if (day === 6) {
  console.log("土曜日");
}
```

このコードは正しく動作しますが、同じ変数`day`を何度も比較していて、少し冗長に感じます。このように、**1つの変数の値によって処理を分岐させる場合**、switch文を使うとより簡潔に書くことができます。

switch文は、ある値を複数の選択肢と比較して、一致したものの処理を実行する構文です。まるでレストランのメニューから1つを選ぶように、複数の選択肢の中から該当するものを選んで実行します。

## switch文の基本構文

switch文の基本的な構文は以下の通りです。

```javascript
switch (式) {
  case 値1:
    // 式が値1と一致した時の処理
    break;
  case 値2:
    // 式が値2と一致した時の処理
    break;
  case 値3:
    // 式が値3と一致した時の処理
    break;
  default:
    // どの値にも一致しなかった時の処理
}
```

各部分の意味を詳しく見ていきましょう。

- **switch (式)**: 評価する式や変数を指定します
- **case 値**: 式の結果と比較する値を指定します
- **break**: その`case`の処理を終了し、switch文から抜けます
- **default**: どの`case`にも一致しなかった時に実行される処理です（省略可能）

先ほどの曜日判定をswitch文で書き直すと、以下のようになります。

```javascript
let day = 1;

switch (day) {
  case 0:
    console.log("日曜日");
    break;
  case 1:
    console.log("月曜日");
    break;
  case 2:
    console.log("火曜日");
    break;
  case 3:
    console.log("水曜日");
    break;
  case 4:
    console.log("木曜日");
    break;
  case 5:
    console.log("金曜日");
    break;
  case 6:
    console.log("土曜日");
    break;
}
```

このコードは`day`の値が1なので、`case 1`に一致し、「月曜日」と表示されます。

switch文を使うことで、同じ変数を何度も書く必要がなくなり、コードがすっきりと見やすくなりました。どの値で分岐しているのかも一目で分かります。

## break文の役割

switch文で最も重要なのが`break`文です。`break`文は、その`case`の処理が終わったことを示し、switch文全体から抜け出すための命令です。

もし`break`を書き忘れるとどうなるでしょうか。次の例を見てください。

```javascript
let fruit = "apple";

switch (fruit) {
  case "apple":
    console.log("りんごです");
    // breakを書き忘れた！
  case "banana":
    console.log("バナナです");
    break;
  case "orange":
    console.log("オレンジです");
    break;
}
```

このコードを実行すると、以下のように表示されます。

```
りんごです
バナナです
```

`fruit`は`"apple"`なので`case "apple"`に一致しますが、`break`がないため、次の`case "banana"`の処理も実行されてしまいます。これを**fall-through**（フォールスルー、落ちる）と言います。

このfall-throughは、ほとんどの場合、バグの原因となります。意図せず次の処理も実行されてしまい、予期しない結果になるからです。そのため、**各caseの最後には必ずbreakを書く**ことが重要です。

正しく修正したコードは以下の通りです。

```javascript
let fruit = "apple";

switch (fruit) {
  case "apple":
    console.log("りんごです");
    break; // これを忘れずに！
  case "banana":
    console.log("バナナです");
    break;
  case "orange":
    console.log("オレンジです");
    break;
}
```

これで「りんごです」だけが表示されます。

## default節

switch文には`default`という特別な節があります。これは、どの`case`にも一致しなかった場合に実行される処理を書く場所です。`if`文での最後の`else`に相当するものと考えることができます。

```javascript
let color = "purple";

switch (color) {
  case "red":
    console.log("赤色です");
    break;
  case "blue":
    console.log("青色です");
    break;
  case "green":
    console.log("緑色です");
    break;
  default:
    console.log("その他の色です");
}
```

この例では、`color`は`"purple"`なので、どの`case`にも一致しません。そのため`default`の処理が実行され、「その他の色です」と表示されます。

`default`節は以下のような場面で役立ちます。

- 想定外の値が入力された時のエラーメッセージ表示
- 該当なしの場合の処理
- デバッグ時に予期しない値を確認する

`default`は省略することもできますが、予期しない値が来た時の対応として書いておくと安全です。また、`default`は通常、switch文の最後に書くため、`break`は省略しても問題ありませんが、明示的に書くこともあります。

## fall-throughの注意

先ほども触れましたが、`break`を忘れると次の`case`の処理も実行されてしまう**fall-through**が発生します。これは多くの場合、バグの原因となるため注意が必要です。

ただし、意図的にfall-throughを利用する場合もあります。複数の値で同じ処理を実行したい場合です。

```javascript
let day = "土曜日";

switch (day) {
  case "土曜日":
  case "日曜日":
    console.log("週末です");
    break;
  case "月曜日":
  case "火曜日":
  case "水曜日":
  case "木曜日":
  case "金曜日":
    console.log("平日です");
    break;
  default:
    console.log("不明な曜日です");
}
```

この例では、`case "土曜日"`に一致しますが、処理がなく`break`もないため、次の`case "日曜日"`を通過して、その下の`console.log("週末です")`が実行されます。これにより、土曜日と日曜日の両方で「週末です」と表示されます。

このように、複数の値で同じ処理をしたい場合は、意図的にfall-throughを利用できます。ただし、このような書き方をする場合は、コメントで意図を明確にしておくと良いでしょう。

```javascript
switch (day) {
  case "土曜日":
  case "日曜日":
    // 土曜日と日曜日は週末
    console.log("週末です");
    break;
  // ...
}
```

基本的には、**各caseの最後には必ずbreakを書く**ことを心がけ、fall-throughは特別な理由がある時だけ使うようにしましょう。

## 実践：曜日判定アプリ

それでは、switch文を使った曜日判定アプリを作ってみましょう。ユーザーが数字を入力すると、対応する曜日を表示するプログラムです。

以下のようなHTMLとJavaScriptを用意します。

**HTML部分:**

```html
<input type="number" id="dayInput" placeholder="0-6の数字を入力">
<button onclick="checkDay()">曜日を判定</button>
<p id="result"></p>
```

**JavaScript部分:**

```javascript
function checkDay() {
  // 入力値を取得して数値に変換
  let input = document.getElementById("dayInput").value;
  let day = Number(input);

  let result = "";

  // switch文で曜日を判定
  switch (day) {
    case 0:
      result = "日曜日";
      break;
    case 1:
      result = "月曜日";
      break;
    case 2:
      result = "火曜日";
      break;
    case 3:
      result = "水曜日";
      break;
    case 4:
      result = "木曜日";
      break;
    case 5:
      result = "金曜日";
      break;
    case 6:
      result = "土曜日";
      break;
    default:
      result = "0から6の数字を入力してください";
  }

  // 結果を表示
  document.getElementById("result").textContent = result;
}
```

このコードの動作を詳しく見ていきましょう。

1. **入力値の取得**: `document.getElementById("dayInput").value`で入力欄の値を取得します
2. **数値への変換**: `Number(input)`で文字列を数値に変換します
3. **switch文で判定**: `day`の値に応じて、対応する曜日を`result`変数に代入します
4. **default処理**: 0〜6以外の値が入力された場合、エラーメッセージを表示します
5. **結果の表示**: `textContent`を使って結果を画面に表示します

入力欄に「3」を入力してボタンを押すと、「水曜日」と表示されます。「10」のような範囲外の値を入力すると、「0から6の数字を入力してください」と表示されます。

このように、switch文を使うことで、複数の値による分岐処理を見やすく書くことができます。

## switch文とif文の使い分け

switch文とif文は、どちらも条件分岐を行いますが、使い分けのポイントがあります。

**switch文が向いている場合:**
- 1つの変数の値によって処理を分岐させる場合
- 分岐の選択肢が多い場合（3つ以上）
- 値の等価性（===）で判定する場合

**if文が向いている場合:**
- 複雑な条件式を使う場合（`age >= 20 && hasLicense`など）
- 範囲の判定をする場合（`score >= 80`など）
- 分岐が少ない場合（2つ程度）

例えば、以下のような範囲判定はif文の方が適しています。

```javascript
// これはif文が適している
if (score >= 80) {
  console.log("優");
} else if (score >= 60) {
  console.log("良");
} else {
  console.log("可");
}
```

一方、以下のような値の判定はswitch文が適しています。

```javascript
// これはswitch文が適している
switch (status) {
  case "success":
    console.log("成功しました");
    break;
  case "error":
    console.log("エラーが発生しました");
    break;
  case "pending":
    console.log("処理中です");
    break;
}
```

状況に応じて適切な方法を選ぶことで、読みやすく保守しやすいコードを書くことができます。

## 練習問題

### 課題

switch文を使った曜日判定アプリを作成しましょう。数字（0-6）を入力すると、対応する曜日を表示し、さらに平日か週末かも判定して表示します。

### 保存場所

`exercises/lesson-056/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. switch-case構文を書く
2. break文を各caseに追加する
3. default節でエラー処理を書く

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-056
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント

- 入力値は`document.getElementById`で取得し、`Number()`で数値に変換します
- switch文の`case`には、0から6までの数字を指定します
- 各`case`の処理では、曜日名を変数に代入します
- 必ず各`case`の最後に`break`を書きましょう
- `default`節で、0〜6以外の値が入力された時のメッセージを設定します
- 週末判定は、土曜日（6）か日曜日（0）の場合に「週末」、それ以外は「平日」と表示します
- 結果は`textContent`を使って画面の要素に表示します

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 056</title>
</head>
<body>
    <h1>曜日判定アプリ</h1>
    <input type="number" id="dayInput" placeholder="0-6の数字を入力">
    <button onclick="checkDay()">判定する</button>
    <p id="dayResult"></p>
    <p id="weekendResult"></p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
function checkDay() {
  // 入力値を取得
  let input = document.getElementById("dayInput").value;
  let day = Number(input);

  let dayName = "";
  let weekendStatus = "";

  // 曜日を判定
  switch (day) {
    case 0:
      dayName = "日曜日";
      weekendStatus = "週末";
      break;
    case 1:
      dayName = "月曜日";
      weekendStatus = "平日";
      break;
    case 2:
      dayName = "火曜日";
      weekendStatus = "平日";
      break;
    case 3:
      dayName = "水曜日";
      weekendStatus = "平日";
      break;
    case 4:
      dayName = "木曜日";
      weekendStatus = "平日";
      break;
    case 5:
      dayName = "金曜日";
      weekendStatus = "平日";
      break;
    case 6:
      dayName = "土曜日";
      weekendStatus = "週末";
      break;
    default:
      dayName = "0から6の数字を入力してください";
      weekendStatus = "";
  }

  // 結果を表示
  document.getElementById("dayResult").textContent = dayName;
  document.getElementById("weekendResult").textContent = weekendStatus;
}
```

### 解説

このプログラムは、switch文を使って数字から曜日を判定します。

1. **入力の取得と変換**: `value`プロパティで入力値を取得し、`Number()`で数値に変換しています
2. **switch文による分岐**: `day`の値に応じて、0〜6の各`case`で曜日名を`dayName`変数に代入します
3. **週末判定**: 各`case`で、曜日と同時に「平日」か「週末」かも判定しています
4. **break文**: 各`case`の最後に`break`を書いて、処理が次に流れないようにしています
5. **default節**: 0〜6以外の値が入力された場合、エラーメッセージを表示します
6. **結果の表示**: 2つの`<p>`要素に、曜日名と週末判定の結果をそれぞれ表示します

switch文を使うことで、複数の値による分岐を見やすく整理できました。各`case`が独立しているため、どの値でどんな処理をするのかが一目で分かります。

## まとめ

お疲れ様でした。今回のレッスンでは、switch文について学びました。

**今回のキーポイント:**

- **switch-case構文**: 1つの変数の値によって処理を分岐させる構文です。`switch (式)`で評価する値を指定し、`case 値:`で各選択肢を定義します。複数の選択肢がある場合、if文よりも見やすく書けます

- **break文の重要性**: 各`case`の処理の最後には必ず`break`を書きます。これを忘れると、次の`case`の処理も実行されてしまう「fall-through」が発生し、バグの原因となります。意図的に複数の値で同じ処理をする場合を除き、必ず`break`を書きましょう

- **default節**: どの`case`にも一致しなかった場合に実行される処理を書く場所です。`if`文の最後の`else`に相当します。エラー処理や予期しない値への対応に使います

- **switch文とif文の使い分け**: 値の等価性で判定する場合はswitch文、範囲判定や複雑な条件式の場合はif文が適しています。状況に応じて使い分けることで、読みやすいコードが書けます

switch文は、メニューの選択、曜日の判定、ステータスの判定など、限られた選択肢から1つを選ぶ場面で活躍します。今回学んだswitch文を使いこなせるようになると、条件分岐の表現の幅が広がります。

次のレッスンでは、コードの可読性を高める「早期リターン」について学びます。条件分岐をよりシンプルに書く方法を習得していきましょう。
