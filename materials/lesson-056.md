---
title: "Lesson 056: switch文入門"
author: "JavaScript学習教材"
date: "2025-11-20"
---

## なぜ重要なのか

switch文は、プログラミングにおける重要な条件分岐の一つです。実際の開発現場やよく使われるサービスで、switch文がどのように活用されているか、5つの例を見てみましょう。

### 1. メールアプリの重要度フィルタ

Gmailのような**メールアプリ**では、メールの重要度（高・中・低）や種類（プロモーション・ソーシャル・メイン）に応じて、表示方法やアイコンの色を変えています。

```javascript
switch (priority) {
  case "high":
    icon = "⚠️";
    color = "red";
    break;
  case "medium":
    icon = "📧";
    color = "orange";
    break;
  case "low":
    icon = "📄";
    color = "gray";
    break;
}
```

このように、限られた選択肢から1つを選んで処理を実行する場面で、switch文は非常に見やすく、管理しやすいコードになります。

### 2. 動画配信サービスの再生状態管理

YouTubeやNetflixなどの**動画配信サービス**では、動画の再生状態（再生中・一時停止・停止・読み込み中）に応じて、表示するアイコンやボタンの状態を切り替えています。

```javascript
switch (playerState) {
  case "playing":
    button.textContent = "⏸️ 一時停止";
    break;
  case "paused":
    button.textContent = "▶️ 再生";
    break;
  case "stopped":
    button.textContent = "▶️ 最初から再生";
    break;
  case "loading":
    button.textContent = "読み込み中...";
    break;
}
```

状態が明確に分かれている場合、switch文を使うと「どの状態でどうなるか」が一目で分かります。

### 3. ECサイトの注文ステータス表示

Amazonや楽天市場などの**ECサイト**では、注文のステータス（注文受付・準備中・発送済み・配達完了）に応じて、異なるメッセージや次に取れるアクションを表示しています。

```javascript
switch (orderStatus) {
  case "received":
    message = "ご注文を受け付けました";
    nextAction = "キャンセル可能";
    break;
  case "preparing":
    message = "商品を準備中です";
    nextAction = "キャンセル可能";
    break;
  case "shipped":
    message = "発送しました";
    nextAction = "配送状況を確認";
    break;
  case "delivered":
    message = "配達完了";
    nextAction = "レビューを書く";
    break;
}
```

### 4. 天気アプリの天候表示

天気予報アプリでは、天候コード（晴れ・曇り・雨・雪）に応じて、適切なアイコンや背景色を選択しています。

```javascript
switch (weather) {
  case "sunny":
    icon = "☀️";
    background = "#FFD700";
    break;
  case "cloudy":
    icon = "☁️";
    background = "#B0C4DE";
    break;
  case "rainy":
    icon = "🌧️";
    background = "#4682B4";
    break;
  case "snowy":
    icon = "❄️";
    background = "#E0FFFF";
    break;
}
```

### 5. ゲームのキー操作分岐

オンラインゲームやブラウザゲームでは、ユーザーが押したキー（矢印キー、WASD、スペースなど）に応じて、キャラクターの動作を切り替えています。

```javascript
switch (keyPressed) {
  case "ArrowUp":
  case "w":
    player.moveUp();
    break;
  case "ArrowDown":
  case "s":
    player.moveDown();
    break;
  case "ArrowLeft":
  case "a":
    player.moveLeft();
    break;
  case "ArrowRight":
  case "d":
    player.moveRight();
    break;
  case " ":
    player.jump();
    break;
}
```

このように、switch文は「決まった値のどれか」によって処理を変える場合に、非常に効果的です。if-else文で書くよりも見やすく、保守しやすいコードになります。

## このレッスンで学ぶこと

今回のレッスンでは、新しい条件分岐の方法である**switch文**を学びます。これまで`if`文や`else if`を使って多分岐の処理を書いてきましたが、switch文は「ある値によって処理を分岐させる場合」により読みやすく書ける方法です。

### 学習する内容

1. **switch-case構文の書き方**: switch文の基本構文と各部分の意味を理解します
2. **break文の役割**: break文がなぜ必要なのか、忘れるとどうなるかを学びます
3. **default節の使い方**: どのcaseにも一致しなかった場合の処理を書く方法を学びます
4. **fall-throughの注意**: breakを忘れた時に起こる問題と、意図的に使う場面を理解します
5. **switch文とif文の使い分け**: どちらを使うべきかの判断基準を学びます

### 前回の復習

前回のレッスンでは、`Math.random()`を使ったおみくじアプリを作成しました。ランダムな数値を生成し、その値に応じて運勢を判定する処理を実装しました。今回は、その「値に応じて処理を分岐させる」部分を、より見やすく書く方法を学びます。

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

このコードは正しく動作しますが、以下のような問題があります。

1. **冗長性**: 同じ変数`day`を何度も書いている
2. **可読性**: 分岐が増えると、何を基準に分岐しているのか分かりにくくなる
3. **保守性**: 新しい選択肢を追加する時に、全体の構造を把握しにくい

switch文は、このような「1つの変数の値によって処理を分岐させる場合」に、より簡潔で見やすく書ける構文です。まるでレストランのメニューから1つを選ぶように、複数の選択肢の中から該当するものを選んで実行します。

### switch文の特徴

- **1つの式を複数の値と比較**: 1つの変数や式の結果を、複数の選択肢と比較します
- **厳密等価演算子（===）で比較**: switch文は内部で`===`を使って比較します
- **見やすい構造**: どの値でどんな処理をするかが一目で分かります
- **保守しやすい**: 新しい選択肢の追加や削除が簡単です

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

### 各部分の詳細

#### 1. switch (式)

評価する式や変数を指定します。この式の結果が、各`case`の値と比較されます。

```javascript
switch (day) {
  // dayの値が各caseと比較される
}

switch (status.toUpperCase()) {
  // 式の結果が各caseと比較される
}
```

#### 2. case 値:

式の結果と比較する値を指定します。`===`（厳密等価演算子）で比較されます。

```javascript
case 0:        // day === 0 の場合
case "apple":  // fruit === "apple" の場合
case true:     // flag === true の場合
```

**重要**: コロン（`:`）を忘れないようにしましょう。

#### 3. break;

その`case`の処理を終了し、switch文全体から抜け出します。これがないと、次の`case`の処理も実行されてしまいます（後で詳しく説明します）。

```javascript
case 1:
  console.log("月曜日");
  break;  // ここでswitch文から抜ける
```

#### 4. default:

どの`case`にも一致しなかった場合に実行される処理です。`if`文での最後の`else`に相当します。省略することもできます。

```javascript
default:
  console.log("該当なし");
```

### 実際の例

先ほどの曜日判定を、switch文で書き直してみましょう。

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

このコードは`day`の値が1なので、`case 1:`に一致し、「月曜日」と表示されます。

if-else文と比べて、以下のような利点があります。

1. **変数名の重複がない**: `day`を1回書くだけで済む
2. **構造が明確**: どの値でどうなるかが一目で分かる
3. **保守しやすい**: 新しいcaseの追加が簡単

## break文の役割と重要性

switch文で**最も重要**なのが`break`文です。`break`文は、その`case`の処理が終わったことを示し、switch文全体から抜け出すための命令です。

### breakがないとどうなるか

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

`fruit`は`"apple"`なので`case "apple":`に一致しますが、`break`がないため、次の`case "banana":`の処理も実行されてしまいます。これを**fall-through**（フォールスルー、「落ちる」という意味）と言います。

### fall-throughの動作

fall-throughは、以下のように動作します。

1. `case "apple":`に一致する
2. `console.log("りんごです")`を実行
3. `break`がないので、次に進む
4. `case "banana":`の条件チェックをスキップして、処理を実行
5. `console.log("バナナです")`を実行
6. `break`があるので、switch文から抜ける

つまり、一度マッチした後は、次の`case`の条件をチェックせずに、処理だけが実行されていきます。

### fall-throughはバグの原因

このfall-throughは、**ほとんどの場合、バグの原因**となります。意図せず次の処理も実行されてしまい、予期しない結果になるからです。

```javascript
let status = "error";

switch (status) {
  case "error":
    console.log("エラーが発生しました");
    // breakを忘れた！
  case "warning":
    console.log("警告があります");
    // breakを忘れた！
  case "info":
    console.log("情報を表示します");
    break;
}
```

このコードは、`status`が`"error"`の場合、以下のすべてが表示されてしまいます。

```
エラーが発生しました
警告があります
情報を表示します
```

これは明らかにバグです。そのため、**各caseの最後には必ずbreakを書く**ことが重要です。

### 正しい書き方

```javascript
let fruit = "apple";

switch (fruit) {
  case "apple":
    console.log("りんごです");
    break;  // これを忘れずに！
  case "banana":
    console.log("バナナです");
    break;
  case "orange":
    console.log("オレンジです");
    break;
}
```

これで「りんごです」だけが表示されます。

### breakを書く習慣

switch文を書くときは、以下の手順で書くと、breakの書き忘れを防げます。

1. まずswitch文の骨組みを書く
2. 各caseとbreakをセットで書く
3. 処理を書く

```javascript
// ステップ1: 骨組み
switch (day) {
}

// ステップ2: caseとbreakをセット
switch (day) {
  case 0:
    break;
  case 1:
    break;
}

// ステップ3: 処理を追加
switch (day) {
  case 0:
    console.log("日曜日");
    break;
  case 1:
    console.log("月曜日");
    break;
}
```

## default節の使い方

switch文には`default`という特別な節があります。これは、どの`case`にも一致しなかった場合に実行される処理を書く場所です。

### defaultの基本

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

### defaultが役立つ場面

#### 1. エラーメッセージの表示

想定外の値が入力された時に、エラーメッセージを表示できます。

```javascript
switch (command) {
  case "start":
    console.log("開始します");
    break;
  case "stop":
    console.log("停止します");
    break;
  default:
    console.log("エラー: 不明なコマンドです");
}
```

#### 2. デフォルト処理

該当なしの場合の標準的な処理を設定できます。

```javascript
switch (userLevel) {
  case "admin":
    allowedPages = ["settings", "users", "home"];
    break;
  case "editor":
    allowedPages = ["edit", "home"];
    break;
  default:
    // 一般ユーザー
    allowedPages = ["home"];
}
```

#### 3. デバッグ時の確認

開発中に、予期しない値が来ていないか確認できます。

```javascript
switch (status) {
  case 200:
    console.log("成功");
    break;
  case 404:
    console.log("見つかりません");
    break;
  case 500:
    console.log("サーバーエラー");
    break;
  default:
    console.log("予期しないステータスコード:", status);
}
```

### defaultの位置

`default`は、switch文の最後に書くのが一般的です。最後に書く場合、`break`は省略できますが、明示的に書くこともあります。

```javascript
// 最後に書く（一般的）
switch (value) {
  case 1:
    console.log("1です");
    break;
  case 2:
    console.log("2です");
    break;
  default:
    console.log("その他");
    // breakは省略可能
}
```

技術的には、`default`は途中に書くこともできますが、可読性のため最後に書くのが推奨されます。

### defaultの省略

`default`は必須ではなく、省略することもできます。ただし、予期しない値が来た時の対応として書いておくと安全です。

```javascript
// defaultなし（省略可能）
switch (day) {
  case 0:
    console.log("日曜日");
    break;
  case 1:
    console.log("月曜日");
    break;
  // 他のcaseも続く...
}
```

## fall-throughの意図的な活用

先ほど「fall-throughはバグの原因」と説明しましたが、**意図的にfall-throughを利用する場合**もあります。複数の値で同じ処理を実行したい場合です。

### 複数の値で同じ処理

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

この例では、`case "土曜日":`に一致しますが、処理がなく`break`もないため、次の`case "日曜日":`を通過して、その下の`console.log("週末です")`が実行されます。これにより、土曜日と日曜日の両方で「週末です」と表示されます。

### 動作の流れ

1. `day`は`"土曜日"`
2. `case "土曜日":`に一致
3. 処理がないので次に進む
4. `case "日曜日":`をスキップして処理に進む
5. `console.log("週末です")`を実行
6. `break`でswitch文から抜ける

### コメントで意図を明確に

このような書き方をする場合は、コメントで意図を明確にしておくと良いでしょう。

```javascript
switch (day) {
  case "土曜日":
  case "日曜日":
    // 土曜日と日曜日は週末として扱う
    console.log("週末です");
    break;
  case "月曜日":
  case "火曜日":
  case "水曜日":
  case "木曜日":
  case "金曜日":
    // 月〜金曜日は平日として扱う
    console.log("平日です");
    break;
  default:
    console.log("不明な曜日です");
}
```

### 別の書き方

同じ処理をしたい場合、OR演算子（`||`）を使ったif文でも書けます。

```javascript
if (day === "土曜日" || day === "日曜日") {
  console.log("週末です");
} else if (
  day === "月曜日" ||
  day === "火曜日" ||
  day === "水曜日" ||
  day === "木曜日" ||
  day === "金曜日"
) {
  console.log("平日です");
}
```

どちらを使うかは好みですが、switch文の方がすっきりして見やすい場合が多いです。

### fall-throughの原則

基本的には、**各caseの最後には必ずbreakを書く**ことを心がけ、fall-throughは以下の場合のみ使うようにしましょう。

1. 複数の値で同じ処理をする場合
2. 意図が明確で、コメントで説明されている場合

それ以外の場合は、breakを忘れたことによるバグの可能性が高いです。

## よくある間違い

switch文を使う上で、初心者がよくやってしまう間違いを6つ紹介します。

### 1. breakを忘れる

**間違い:**

```javascript
let status = "success";

switch (status) {
  case "success":
    console.log("成功しました");
    // breakを忘れた！
  case "error":
    console.log("エラーが発生しました");
    break;
}
```

**結果:**

```
成功しました
エラーが発生しました
```

**正しい書き方:**

```javascript
switch (status) {
  case "success":
    console.log("成功しました");
    break;  // 忘れずに！
  case "error":
    console.log("エラーが発生しました");
    break;
}
```

### 2. caseの後にコロン（:）ではなくセミコロン（;）を書く

**間違い:**

```javascript
switch (day) {
  case 0;  // セミコロンは間違い！
    console.log("日曜日");
    break;
}
```

**正しい書き方:**

```javascript
switch (day) {
  case 0:  // コロンが正しい
    console.log("日曜日");
    break;
}
```

### 3. 厳密等価（===）を理解していない

switch文は内部で`===`を使って比較するため、型が違うと一致しません。

**間違い:**

```javascript
let input = "1";  // 文字列の"1"

switch (input) {
  case 1:  // 数値の1と比較
    console.log("1です");
    break;
}
// 何も表示されない！
```

**正しい書き方:**

```javascript
let input = "1";
let number = Number(input);  // 数値に変換

switch (number) {
  case 1:  // 数値同士で比較
    console.log("1です");
    break;
}
```

または、文字列のまま比較する場合:

```javascript
let input = "1";

switch (input) {
  case "1":  // 文字列同士で比較
    console.log("1です");
    break;
}
```

### 4. defaultにbreakを書き忘れて次のcaseを追加した時にバグる

**間違い:**

```javascript
// 最初のコード
switch (value) {
  case 1:
    console.log("1です");
    break;
  default:
    console.log("その他");
    // breakがない
}

// 後から新しいcaseを追加
switch (value) {
  case 1:
    console.log("1です");
    break;
  default:
    console.log("その他");
    // breakがない！
  case 2:  // 新しく追加
    console.log("2です");
    break;
}
```

`value`が1でも2でもない場合、「その他」と「2です」の両方が表示されてしまいます。

**正しい書き方:**

```javascript
switch (value) {
  case 1:
    console.log("1です");
    break;
  case 2:
    console.log("2です");
    break;
  default:
    console.log("その他");
    break;  // 明示的に書く
}
```

### 5. caseで式や範囲を指定しようとする

switch文は値の等価性（===）しか判定できません。範囲判定はできません。

**間違い:**

```javascript
let score = 85;

switch (score) {
  case score >= 80:  // これは動かない
    console.log("優");
    break;
  case score >= 60:
    console.log("良");
    break;
}
```

**正しい書き方（if文を使う）:**

```javascript
let score = 85;

if (score >= 80) {
  console.log("優");
} else if (score >= 60) {
  console.log("良");
} else {
  console.log("可");
}
```

範囲判定が必要な場合は、switch文ではなくif文を使いましょう。

### 6. 複数の条件を同時に満たすことを期待する

switch文は1つの値を複数の選択肢と比較するもので、複数の条件を同時に評価することはできません。

**間違い:**

```javascript
let age = 20;
let hasLicense = true;

switch (age >= 18 && hasLicense) {  // これは正しく動かない
  case true:
    console.log("運転できます");
    break;
}
```

この場合は動作しますが、意図が不明確です。

**正しい書き方（if文を使う）:**

```javascript
if (age >= 18 && hasLicense) {
  console.log("運転できます");
} else {
  console.log("運転できません");
}
```

複雑な条件式が必要な場合は、if文を使う方が適切です。

## 実用例1：シンプルな曜日判定アプリ

switch文の基本を理解するため、まずはシンプルな曜日判定アプリを作ってみましょう。

### 完全なコード

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>曜日判定アプリ</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    h1 {
      color: white;
      text-align: center;
      margin-bottom: 30px;
      font-size: 28px;
    }

    .input-group {
      background: white;
      padding: 25px;
      border-radius: 15px;
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 10px;
      font-weight: bold;
      color: #333;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
    }

    button {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
    }

    button:hover {
      transform: scale(1.05);
    }

    button:active {
      transform: scale(0.95);
    }

    .result {
      background: white;
      padding: 20px;
      border-radius: 15px;
      margin-top: 20px;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .result-text {
      font-size: 24px;
      font-weight: bold;
      color: #667eea;
      text-align: center;
    }

    .error {
      color: #f5576c;
    }

    .hint {
      background: rgba(255, 255, 255, 0.9);
      padding: 15px;
      border-radius: 10px;
      margin-top: 20px;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <h1>📅 曜日判定アプリ</h1>

  <div class="input-group">
    <label for="dayInput">数字を入力してください（0-6）</label>
    <input type="number" id="dayInput" placeholder="例: 0=日曜日, 1=月曜日..." min="0" max="6">
  </div>

  <button onclick="checkDay()">判定する</button>

  <div class="result">
    <div id="result" class="result-text">ここに結果が表示されます</div>
  </div>

  <div class="hint">
    💡 ヒント: 0=日曜日, 1=月曜日, 2=火曜日, 3=水曜日, 4=木曜日, 5=金曜日, 6=土曜日
  </div>

  <script>
    function checkDay() {
      // 入力値を取得
      const input = document.getElementById("dayInput").value;
      const result = document.getElementById("result");

      // 空欄チェック
      if (input === "") {
        result.textContent = "数字を入力してください";
        result.className = "result-text error";
        return;
      }

      // 数値に変換
      const day = Number(input);

      let dayName = "";

      // switch文で曜日を判定
      switch (day) {
        case 0:
          dayName = "日曜日";
          break;
        case 1:
          dayName = "月曜日";
          break;
        case 2:
          dayName = "火曜日";
          break;
        case 3:
          dayName = "水曜日";
          break;
        case 4:
          dayName = "木曜日";
          break;
        case 5:
          dayName = "金曜日";
          break;
        case 6:
          dayName = "土曜日";
          break;
        default:
          dayName = "0から6の数字を入力してください";
          result.className = "result-text error";
          result.textContent = dayName;
          return;
      }

      // 結果を表示
      result.className = "result-text";
      result.textContent = dayName;
    }
  </script>
</body>
</html>
```

### コードの解説

#### 1. 入力値の取得と検証

```javascript
const input = document.getElementById("dayInput").value;

if (input === "") {
  result.textContent = "数字を入力してください";
  result.className = "result-text error";
  return;
}
```

まず、入力欄が空でないかチェックします。空の場合はエラーメッセージを表示して処理を終了します。

#### 2. 数値への変換

```javascript
const day = Number(input);
```

入力値は文字列なので、`Number()`で数値に変換します。これにより、switch文で数値として比較できます。

#### 3. switch文による判定

```javascript
switch (day) {
  case 0:
    dayName = "日曜日";
    break;
  case 1:
    dayName = "月曜日";
    break;
  // ... 他のcase
  default:
    dayName = "0から6の数字を入力してください";
}
```

`day`の値に応じて、対応する曜日名を`dayName`変数に代入します。0〜6以外の値が入力された場合は、`default`節でエラーメッセージを設定します。

#### 4. 結果の表示

```javascript
result.className = "result-text";
result.textContent = dayName;
```

判定結果を画面に表示します。正常な場合は通常のスタイル、エラーの場合は赤色のスタイルで表示します。

## 実用例2：週末判定付き曜日アプリ

次に、曜日だけでなく「平日か週末か」も判定するアプリを作ってみましょう。

### 完全なコード

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>曜日・週末判定アプリ</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 30px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    h1 {
      color: white;
      text-align: center;
      margin-bottom: 30px;
      font-size: 28px;
    }

    .input-group {
      background: white;
      padding: 25px;
      border-radius: 15px;
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 10px;
      font-weight: bold;
      color: #333;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
    }

    button {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
    }

    button:hover {
      transform: scale(1.05);
    }

    .results {
      background: white;
      padding: 25px;
      border-radius: 15px;
      margin-top: 20px;
    }

    .result-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 10px;
      background: #f8f9fa;
    }

    .result-label {
      font-weight: bold;
      color: #666;
    }

    .result-value {
      font-size: 20px;
      font-weight: bold;
      color: #4facfe;
    }

    .weekend {
      color: #fa709a;
      font-size: 24px;
    }

    .weekday {
      color: #4facfe;
      font-size: 24px;
    }

    .error {
      color: #dc3545;
    }
  </style>
</head>
<body>
  <h1>📅 曜日・週末判定アプリ</h1>

  <div class="input-group">
    <label for="dayInput">数字を入力してください（0-6）</label>
    <input type="number" id="dayInput" placeholder="0=日曜, 1=月曜..." min="0" max="6">
  </div>

  <button onclick="checkDay()">判定する</button>

  <div class="results">
    <div class="result-row">
      <span class="result-label">曜日:</span>
      <span id="dayResult" class="result-value">-</span>
    </div>
    <div class="result-row">
      <span class="result-label">種類:</span>
      <span id="weekendResult" class="result-value">-</span>
    </div>
  </div>

  <script>
    function checkDay() {
      const input = document.getElementById("dayInput").value;
      const dayResult = document.getElementById("dayResult");
      const weekendResult = document.getElementById("weekendResult");

      // 空欄チェック
      if (input === "") {
        dayResult.textContent = "入力してください";
        dayResult.className = "result-value error";
        weekendResult.textContent = "-";
        return;
      }

      const day = Number(input);
      let dayName = "";
      let weekendStatus = "";
      let weekendClass = "";

      // 曜日と週末判定をswitch文で実施
      switch (day) {
        case 0:
          dayName = "日曜日";
          weekendStatus = "週末 🎉";
          weekendClass = "weekend";
          break;
        case 1:
          dayName = "月曜日";
          weekendStatus = "平日 💼";
          weekendClass = "weekday";
          break;
        case 2:
          dayName = "火曜日";
          weekendStatus = "平日 💼";
          weekendClass = "weekday";
          break;
        case 3:
          dayName = "水曜日";
          weekendStatus = "平日 💼";
          weekendClass = "weekday";
          break;
        case 4:
          dayName = "木曜日";
          weekendStatus = "平日 💼";
          weekendClass = "weekday";
          break;
        case 5:
          dayName = "金曜日";
          weekendStatus = "平日 💼";
          weekendClass = "weekday";
          break;
        case 6:
          dayName = "土曜日";
          weekendStatus = "週末 🎉";
          weekendClass = "weekend";
          break;
        default:
          dayName = "0-6の数字を入力してください";
          weekendStatus = "-";
          dayResult.className = "result-value error";
          dayResult.textContent = dayName;
          weekendResult.textContent = weekendStatus;
          return;
      }

      // 結果を表示
      dayResult.className = "result-value";
      dayResult.textContent = dayName;
      weekendResult.className = "result-value " + weekendClass;
      weekendResult.textContent = weekendStatus;
    }
  </script>
</body>
</html>
```

### コードの解説

このアプリでは、各caseで曜日名と週末判定の両方を設定しています。

```javascript
case 0:
  dayName = "日曜日";
  weekendStatus = "週末 🎉";
  weekendClass = "weekend";
  break;
```

日曜日（0）と土曜日（6）は週末、それ以外は平日として判定し、それぞれ異なる色とアイコンで表示します。

## 実用例3：メニュー選択アプリ（fall-throughの活用）

fall-throughを意図的に活用した例として、レストランのメニュー選択アプリを作ってみましょう。

### 完全なコード

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>メニュー選択アプリ</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 30px;
      background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    h1 {
      color: #d35400;
      text-align: center;
      margin-bottom: 30px;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-bottom: 20px;
    }

    .menu-button {
      padding: 20px;
      background: white;
      border: 3px solid #ddd;
      border-radius: 15px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
    }

    .menu-button:hover {
      background: #fff3e0;
      border-color: #d35400;
      transform: translateY(-2px);
    }

    .result-box {
      background: white;
      padding: 25px;
      border-radius: 15px;
      margin-top: 20px;
    }

    .result-item {
      padding: 10px;
      margin-bottom: 10px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #d35400;
    }

    .result-label {
      font-weight: bold;
      color: #666;
      margin-right: 10px;
    }

    .result-value {
      color: #d35400;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>🍽️ レストランメニュー選択</h1>

  <div class="menu-grid">
    <button class="menu-button" onclick="selectMenu('curry')">🍛 カレー</button>
    <button class="menu-button" onclick="selectMenu('ramen')">🍜 ラーメン</button>
    <button class="menu-button" onclick="selectMenu('pasta')">🍝 パスタ</button>
    <button class="menu-button" onclick="selectMenu('pizza')">🍕 ピザ</button>
    <button class="menu-button" onclick="selectMenu('sushi')">🍣 寿司</button>
    <button class="menu-button" onclick="selectMenu('steak')">🥩 ステーキ</button>
  </div>

  <div class="result-box">
    <div class="result-item">
      <span class="result-label">選択メニュー:</span>
      <span id="menuName" class="result-value">-</span>
    </div>
    <div class="result-item">
      <span class="result-label">料理ジャンル:</span>
      <span id="category" class="result-value">-</span>
    </div>
    <div class="result-item">
      <span class="result-label">調理時間:</span>
      <span id="cookTime" class="result-value">-</span>
    </div>
    <div class="result-item">
      <span class="result-label">価格帯:</span>
      <span id="price" class="result-value">-</span>
    </div>
  </div>

  <script>
    function selectMenu(menu) {
      const menuName = document.getElementById("menuName");
      const category = document.getElementById("category");
      const cookTime = document.getElementById("cookTime");
      const price = document.getElementById("price");

      let name = "";
      let cat = "";
      let time = "";
      let priceRange = "";

      switch (menu) {
        case "curry":
        case "ramen":
          // カレーとラーメンは同じカテゴリと調理時間
          cat = "和食・アジア料理";
          time = "15分";
          // それぞれ個別の設定
          if (menu === "curry") {
            name = "カレーライス";
            priceRange = "800円";
          } else {
            name = "ラーメン";
            priceRange = "900円";
          }
          break;

        case "pasta":
        case "pizza":
          // パスタとピザは同じカテゴリ
          cat = "イタリア料理";
          if (menu === "pasta") {
            name = "パスタ";
            time = "20分";
            priceRange = "1,200円";
          } else {
            name = "ピザ";
            time = "25分";
            priceRange = "1,500円";
          }
          break;

        case "sushi":
          name = "寿司";
          cat = "和食";
          time = "30分";
          priceRange = "2,000円";
          break;

        case "steak":
          name = "ステーキ";
          cat = "洋食";
          time = "35分";
          priceRange = "3,000円";
          break;

        default:
          name = "不明なメニュー";
          cat = "-";
          time = "-";
          priceRange = "-";
      }

      // 結果を表示
      menuName.textContent = name;
      category.textContent = cat;
      cookTime.textContent = time;
      price.textContent = priceRange;
    }
  </script>
</body>
</html>
```

### コードの解説

このアプリでは、fall-throughを活用して、同じカテゴリのメニューをグループ化しています。

```javascript
case "curry":
case "ramen":
  // カレーとラーメンは同じカテゴリと調理時間
  cat = "和食・アジア料理";
  time = "15分";
  // それぞれ個別の設定
  if (menu === "curry") {
    name = "カレーライス";
    priceRange = "800円";
  } else {
    name = "ラーメン";
    priceRange = "900円";
  }
  break;
```

この構造により、共通の処理（カテゴリと調理時間）と個別の処理（名前と価格）を明確に分けることができます。

## switch文とif文の使い分け

switch文とif文は、どちらも条件分岐を行いますが、使い分けのポイントがあります。

### switch文が向いている場合

#### 1. 1つの変数の値によって処理を分岐させる場合

```javascript
// switch文が適している
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

#### 2. 分岐の選択肢が多い場合（3つ以上）

```javascript
// switch文が見やすい
switch (month) {
  case 1:
    console.log("1月");
    break;
  case 2:
    console.log("2月");
    break;
  // ... 12個のcase
}
```

#### 3. 値の等価性（===）で判定する場合

```javascript
// 厳密等価で比較する場合
switch (userRole) {
  case "admin":
    showAdminPanel();
    break;
  case "editor":
    showEditorPanel();
    break;
  case "viewer":
    showViewerPanel();
    break;
}
```

### if文が向いている場合

#### 1. 複雑な条件式を使う場合

```javascript
// if文が適している
if (age >= 20 && hasLicense && !isDrunk) {
  console.log("運転できます");
} else {
  console.log("運転できません");
}
```

#### 2. 範囲の判定をする場合

```javascript
// if文が適している
if (score >= 80) {
  console.log("優");
} else if (score >= 60) {
  console.log("良");
} else if (score >= 40) {
  console.log("可");
} else {
  console.log("不可");
}
```

#### 3. 分岐が少ない場合（2つ程度）

```javascript
// シンプルな分岐ならif文
if (isLoggedIn) {
  showDashboard();
} else {
  showLoginForm();
}
```

#### 4. 比較演算子（<, >, <=, >=）を使う場合

```javascript
// 比較演算子はif文
if (temperature > 30) {
  console.log("暑い");
} else if (temperature < 10) {
  console.log("寒い");
} else {
  console.log("ちょうど良い");
}
```

### 比較表

| 条件 | switch文 | if文 |
|------|----------|------|
| 1つの変数の値で分岐 | ◎ 最適 | △ 冗長 |
| 複数の条件の組み合わせ | × 不可 | ◎ 最適 |
| 範囲判定（>=, <= など） | × 不可 | ◎ 最適 |
| 分岐が多い（5個以上） | ◎ 見やすい | △ 長くなる |
| 分岐が少ない（2個） | △ やや冗長 | ◎ シンプル |
| 値の等価性（===） | ◎ 最適 | ○ 可能 |

### 実例での比較

同じ処理を、switch文とif文で書き比べてみましょう。

#### 例1: 曜日判定（switch文が適している）

```javascript
// switch文: 見やすい
switch (day) {
  case 0:
    return "日曜日";
  case 1:
    return "月曜日";
  case 2:
    return "火曜日";
  // ...
}

// if文: 冗長
if (day === 0) {
  return "日曜日";
} else if (day === 1) {
  return "月曜日";
} else if (day === 2) {
  return "火曜日";
}
// ...
```

#### 例2: 成績判定（if文が適している）

```javascript
// if文: 適切
if (score >= 80) {
  return "優";
} else if (score >= 60) {
  return "良";
} else {
  return "可";
}

// switch文: 不可能（範囲判定はできない）
```

状況に応じて適切な方法を選ぶことで、読みやすく保守しやすいコードを書くことができます。

## 練習問題

### 問題1: 季節判定アプリ

月の数字（1-12）を入力すると、その月がどの季節か判定するアプリを作成しましょう。

**要件:**
- 12, 1, 2月 → 冬
- 3, 4, 5月 → 春
- 6, 7, 8月 → 夏
- 9, 10, 11月 → 秋
- それ以外 → エラーメッセージ

<details>
<summary>ヒント1: switch文の構造</summary>

```javascript
switch (month) {
  case 12:
  case 1:
  case 2:
    season = "冬";
    break;
  // 他の季節も同様に...
}
```

fall-throughを使って、複数の月を同じ季節にまとめます。
</details>

<details>
<summary>ヒント2: 入力値の検証</summary>

```javascript
const month = Number(input);

if (input === "" || month < 1 || month > 12) {
  // エラー処理
}
```

空欄チェックと範囲チェックを行います。
</details>

<details>
<summary>解答例</summary>

```javascript
function checkSeason() {
  const input = document.getElementById("monthInput").value;
  const result = document.getElementById("result");

  if (input === "") {
    result.textContent = "月を入力してください";
    return;
  }

  const month = Number(input);
  let season = "";

  switch (month) {
    case 12:
    case 1:
    case 2:
      season = "冬 ❄️";
      break;
    case 3:
    case 4:
    case 5:
      season = "春 🌸";
      break;
    case 6:
    case 7:
    case 8:
      season = "夏 ☀️";
      break;
    case 9:
    case 10:
    case 11:
      season = "秋 🍂";
      break;
    default:
      season = "1から12の数字を入力してください";
  }

  result.textContent = season;
}
```
</details>

### 問題2: 信号機シミュレーター

信号の色（red, yellow, green）を入力すると、対応する動作を表示するアプリを作成しましょう。

**要件:**
- red → 止まれ
- yellow → 注意
- green → 進め
- それ以外 → エラーメッセージ

<details>
<summary>ヒント1: 文字列の比較</summary>

```javascript
switch (signal) {
  case "red":
    action = "止まれ";
    break;
  // ...
}
```

文字列でも比較できます。
</details>

<details>
<summary>ヒント2: 入力を小文字に変換</summary>

```javascript
const signal = input.toLowerCase();
```

大文字小文字を統一すると、ユーザーの入力を柔軟に受け付けられます。
</details>

<details>
<summary>解答例</summary>

```javascript
function checkSignal() {
  const input = document.getElementById("signalInput").value;
  const result = document.getElementById("result");

  if (input === "") {
    result.textContent = "信号の色を入力してください";
    return;
  }

  const signal = input.toLowerCase().trim();
  let action = "";
  let icon = "";

  switch (signal) {
    case "red":
      action = "止まれ";
      icon = "🔴";
      break;
    case "yellow":
      action = "注意";
      icon = "🟡";
      break;
    case "green":
      action = "進め";
      icon = "🟢";
      break;
    default:
      action = "red, yellow, green のいずれかを入力してください";
      icon = "❌";
  }

  result.textContent = `${icon} ${action}`;
}
```
</details>

### 問題3: 成績評価アプリ（応用）

数値の成績（0-100）を入力すると、評価（A, B, C, D, F）を表示するアプリを作成しましょう。ただし、switch文とif文を組み合わせて使います。

**要件:**
- 90-100 → A
- 80-89 → B
- 70-79 → C
- 60-69 → D
- 0-59 → F
- それ以外 → エラーメッセージ

<details>
<summary>ヒント1: 範囲判定にはif文を使う</summary>

switch文は範囲判定ができないので、if文で評価を決めてから、switch文で詳細メッセージを表示します。

```javascript
let grade = "";

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
}
// ...

switch (grade) {
  case "A":
    message = "優秀です！";
    break;
  // ...
}
```
</details>

<details>
<summary>ヒント2: 10で割った値を使う方法</summary>

別の方法として、点数を10で割った値でswitch文を使うこともできます。

```javascript
const range = Math.floor(score / 10);

switch (range) {
  case 10:
  case 9:
    grade = "A";
    break;
  case 8:
    grade = "B";
    break;
  // ...
}
```
</details>

<details>
<summary>解答例</summary>

```javascript
function checkGrade() {
  const input = document.getElementById("scoreInput").value;
  const result = document.getElementById("result");

  if (input === "") {
    result.textContent = "点数を入力してください";
    return;
  }

  const score = Number(input);

  if (score < 0 || score > 100) {
    result.textContent = "0から100の数字を入力してください";
    return;
  }

  // まずif文で評価を決定
  let grade = "";

  if (score >= 90) {
    grade = "A";
  } else if (score >= 80) {
    grade = "B";
  } else if (score >= 70) {
    grade = "C";
  } else if (score >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }

  // switch文で詳細メッセージを表示
  let message = "";

  switch (grade) {
    case "A":
      message = `${grade} 評価: 優秀です！`;
      break;
    case "B":
      message = `${grade} 評価: 良好です`;
      break;
    case "C":
      message = `${grade} 評価: 普通です`;
      break;
    case "D":
      message = `${grade} 評価: もう少し頑張りましょう`;
      break;
    case "F":
      message = `${grade} 評価: 再試験が必要です`;
      break;
  }

  result.textContent = message;
}
```
</details>

## デバッグのヒント

switch文を使ったプログラムでバグが発生した時の確認ポイントを紹介します。

### 1. breakの書き忘れを確認する

最も多い原因は、`break`の書き忘れです。意図しない結果が出る場合は、各`case`の最後に`break`があるか確認しましょう。

```javascript
// 確認方法
switch (value) {
  case 1:
    console.log("1です");
    break;  // ✓ あるか確認
  case 2:
    console.log("2です");
    break;  // ✓ あるか確認
}
```

### 2. 型の不一致を確認する

switch文は`===`（厳密等価）で比較するため、型が違うと一致しません。

```javascript
// デバッグ用のログを追加
const value = input.value;  // 文字列
console.log("value:", value, "型:", typeof value);

switch (value) {
  case 1:  // 数値の1
    // マッチしない！
}
```

解決策:

```javascript
const value = Number(input.value);  // 数値に変換
console.log("value:", value, "型:", typeof value);
```

### 3. default節を追加してデバッグする

どの`case`にもマッチしない場合を検出するため、`default`節を追加します。

```javascript
switch (value) {
  case "a":
    console.log("aです");
    break;
  case "b":
    console.log("bです");
    break;
  default:
    console.log("予期しない値:", value, "型:", typeof value);
}
```

### 4. caseの条件を確認する

意図した値と実際の値が一致しているか確認します。

```javascript
// 各caseの前にログを追加
switch (day) {
  case 0:
    console.log("case 0にマッチ");
    result = "日曜日";
    break;
  case 1:
    console.log("case 1にマッチ");
    result = "月曜日";
    break;
}
```

### 5. fall-throughが意図的か確認する

`break`がないcaseは、意図的なfall-throughかバグかコメントで明示しましょう。

```javascript
switch (day) {
  case "土曜日":
  case "日曜日":
    // 意図的なfall-through: 土日は週末として扱う
    result = "週末";
    break;
}
```

## チェックリスト

switch文を書く時に確認すべき10項目のチェックリストです。

- [ ] 1. switch文で評価する式や変数を正しく指定している
- [ ] 2. 各`case`の後にコロン（`:`）を書いている（セミコロン`;`ではない）
- [ ] 3. 各`case`の最後に`break`を書いている
- [ ] 4. 型が一致している（文字列と数値など、型の違いに注意）
- [ ] 5. `default`節でエラー処理や予期しない値への対応をしている
- [ ] 6. fall-throughを使う場合は、コメントで意図を明示している
- [ ] 7. 入力値を適切に変換している（`Number()`など）
- [ ] 8. 空欄チェックや範囲チェックを行っている
- [ ] 9. デバッグ用のログやdefault節を活用している
- [ ] 10. switch文とif文のどちらが適切か判断している

## ポイント

今回のレッスンの重要なポイントを8つにまとめます。

### 1. switch文は値による分岐に最適

1つの変数や式の値によって処理を分岐させる場合、switch文を使うとif-else文よりも見やすく書けます。どの値でどんな処理をするかが一目で分かります。

### 2. breakは各caseに必須

各`case`の最後には必ず`break`を書きます。これを忘れると、次の`case`の処理も実行されてしまう「fall-through」が発生し、バグの原因となります。

### 3. switch文は厳密等価（===）で比較

switch文は内部で`===`を使って比較するため、値だけでなく型も一致する必要があります。入力値は適切に変換しましょう。

### 4. default節で予期しない値に対応

`default`節を使うと、どの`case`にも一致しなかった場合の処理を書けます。エラーメッセージやデバッグに役立ちます。

### 5. fall-throughは意図的に使える

意図的にfall-throughを使うと、複数の値で同じ処理を実行できます。ただし、コメントで意図を明示しましょう。

### 6. switch文とif文を使い分ける

値の等価性で判定する場合はswitch文、範囲判定や複雑な条件式の場合はif文が適しています。状況に応じて使い分けましょう。

### 7. コロン（:）とセミコロン（;）を間違えない

`case`の後はコロン（`:`）です。セミコロン（`;`）ではないので注意しましょう。

### 8. 読みやすさと保守性が向上

switch文を使うと、分岐の構造が明確になり、新しい選択肢の追加や削除が簡単になります。コードの保守性が向上します。

## できるようになったこと

このレッスンを終えて、あなたができるようになったことを8つ確認しましょう。

### 1. switch-case構文を書ける

switch文の基本構文を理解し、`switch (式) { case 値: ... break; }`の形で条件分岐を書けるようになりました。

### 2. breakの役割を理解している

`break`がswitch文から抜け出すための命令であることを理解し、各`case`の最後に必ず書けるようになりました。

### 3. default節を使える

どの`case`にも一致しなかった場合の処理を`default`節で書けるようになりました。エラー処理やデフォルト処理を実装できます。

### 4. fall-throughの仕組みを理解している

`break`がないとfall-throughが発生することを理解し、意図的に使う場合と避けるべき場合を区別できるようになりました。

### 5. switch文とif文を使い分けられる

値の等価性判定はswitch文、範囲判定や複雑な条件式はif文と、状況に応じて適切な方法を選べるようになりました。

### 6. 型の違いに注意できる

switch文が厳密等価（===）で比較することを理解し、入力値を適切に変換してから比較できるようになりました。

### 7. 実用的なアプリを作れる

曜日判定、メニュー選択、季節判定など、switch文を使った実用的なアプリケーションを作れるようになりました。

### 8. コードの可読性を考慮できる

同じ変数を繰り返し書かない、分岐の構造を明確にするなど、読みやすいコードを書くことを意識できるようになりました。

## まとめ

お疲れ様でした。今回のレッスンでは、switch文について学びました。

### 学んだこと

1. **switch文の基本構文**: `switch (式) { case 値: 処理; break; }`の形で、1つの値を複数の選択肢と比較して処理を分岐させる
2. **breakの重要性**: 各`case`の最後に`break`を書かないと、次の`case`の処理も実行されてしまう
3. **default節**: どの`case`にも一致しなかった場合の処理を書く場所で、エラー処理に便利
4. **fall-through**: `break`がないと次に進む仕組みで、意図的に使う場合もある
5. **使い分け**: 値の等価性判定はswitch文、範囲判定や複雑な条件はif文が適している

### switch文の利点

- **見やすさ**: どの値でどうなるかが一目で分かる
- **保守性**: 新しい選択肢の追加や削除が簡単
- **明確性**: 1つの変数に注目していることが明確

### 注意点

- **breakを忘れない**: 最も多いバグの原因
- **型の一致**: 厳密等価（===）で比較されるため、型の違いに注意
- **適切な使い分け**: 範囲判定などswitch文が向かない場合もある

switch文は、限られた選択肢から1つを選ぶ場面で非常に効果的です。メニュー選択、ステータス判定、曜日判定など、実際の開発でもよく使われます。

次のレッスンでは、条件分岐をよりシンプルに書く「早期リターン」について学びます。ネストを減らし、読みやすいコードを書く技術を習得していきましょう。

## 次のステップ

### 復習するとよいレッスン

- **Lesson 014: if文の基礎** - 基本的な条件分岐を復習しましょう
- **Lesson 015: else if文** - 多分岐の別の方法と比較しましょう
- **Lesson 055: おみくじアプリ** - ランダムな値とswitch文を組み合わせましょう

### 次に学ぶこと

- **Lesson 057: 早期リターン** - 条件分岐をシンプルに書く技術を学びます
- **Lesson 058: 三項演算子** - 簡潔な条件分岐の書き方を学びます

### さらに学びたい人へ

- **複数のswitch文の組み合わせ**: ネストしたswitch文の使い方を調べてみましょう
- **switch文の代替パターン**: オブジェクトを使った分岐の方法を調べてみましょう
- **実際のコードでの使用例**: GitHubなどでswitch文の実例を探してみましょう
