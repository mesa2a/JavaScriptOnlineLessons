# Lesson 029: リアルタイム取得

このレッスンでは、ユーザーが入力するたびにリアルタイムで値を取得する方法を学びます。

## なぜ重要なのか

**身近な例**：
- **Twitter**：ツイートを入力 → 残り文字数がリアルタイムで表示される
- **Google**：検索ワードを入力 → 入力途中で検索候補が表示される
- **パスワード入力**：パスワードを入力 → 強度がリアルタイムで表示される
- **Gmail**：メールを入力 → 送信ボタンが有効/無効になる
- **フォーム**：名前を入力 → 入力チェックがリアルタイムで行われる

これらすべてに共通するのは、**ユーザーが入力している最中に、即座にフィードバックを提供する**ということです。

**前回との違い**：
- **前回（レッスン28）**：ボタンをクリック → 値を取得
- **今回（レッスン29）**：入力するたびに → 自動的に値を取得

## oninputイベント

前のレッスンでは、ボタンをクリックしたときにinput要素の値を取得しました。しかし、**`oninput`イベント**を使うと、ユーザーが入力するたびに処理を実行できます。

### 基本的な使い方

**HTML**：
```html
<input id="text" type="text" oninput="showValue()">
<p id="result"></p>
```

**JavaScript**：
```javascript
function showValue() {
  const input = document.getElementById("text");
  const value = input.value;

  const result = document.getElementById("result");
  result.textContent = "入力: " + value;
}
```

**動作の流れ（リアルタイム）**：

```
ユーザーが「あ」と入力
↓
showValue() が実行される
↓
value = "あ"
↓
画面に「入力: あ」と表示される
↓
ユーザーが「い」と追加入力
↓
showValue() が再び実行される
↓
value = "あい"
↓
画面に「入力: あい」と表示される
```

**重要**：**1文字入力するたびに関数が実行されます**。

### oninput属性の構文

```html
<input id="text" type="text" oninput="関数名()">
```

**各部分の意味**：
- `oninput` - 入力するたびに実行するイベント
- `"関数名()"` - 実行する関数（引用符で囲む、括弧を付ける）

## onclickとoninputの違い

### 比較表

| 項目 | onclick | oninput |
|------|---------|---------|
| 使う要素 | button要素など | input要素 |
| 実行タイミング | クリックしたとき | 入力するたびに |
| 実行回数 | 1回クリックで1回 | 1文字入力で1回 |
| 使用例 | ボタンで送信 | リアルタイム表示 |

### onclick（復習）

**ボタンをクリックしたときに実行**：

```html
<input id="name" type="text">
<button onclick="showValue()">表示</button>
<p id="result"></p>
```

**特徴**：
- ボタンをクリックしないと実行されない
- ユーザーが任意のタイミングで実行できる

### oninput（新しい）

**入力するたびに実行**：

```html
<input id="name" type="text" oninput="showValue()">
<p id="result"></p>
```

**特徴**：
- 1文字入力するたびに実行される
- ボタンが不要
- リアルタイムで反映される

### どちらを使うか

**onclick**：
- 送信ボタン
- 検索ボタン
- ユーザーが明示的に実行したい処理

**oninput**：
- 文字数カウント
- リアルタイム検索
- 入力チェック

## 文字数をカウントする

`oninput`を使って、入力された文字数をカウントできます。

### 基本的な例

**HTML**：
```html
<input id="text" type="text" oninput="countChars()">
<p id="count"></p>
```

**JavaScript**：
```javascript
function countChars() {
  const input = document.getElementById("text");
  const value = input.value;
  const length = value.length;

  const count = document.getElementById("count");
  count.textContent = "文字数: " + length;
}
```

**動作の流れ**：

```
何も入力していない
↓
length = 0
↓
画面に「文字数: 0」と表示される
↓
「こ」と入力
↓
length = 1
↓
画面に「文字数: 1」と表示される
↓
「こん」と入力
↓
length = 2
↓
画面に「文字数: 2」と表示される
```

## lengthプロパティ

文字列には**`length`プロパティ**があり、文字数を返します。

### 基本的な使い方

```javascript
let text = "こんにちは";
console.log(text.length);  // 5
```

### lengthの特徴

**文字数を返す**：

```javascript
let text1 = "あ";
console.log(text1.length);  // 1

let text2 = "あいう";
console.log(text2.length);  // 3

let text3 = "Hello";
console.log(text3.length);  // 5
```

**空文字列は0**：

```javascript
let empty = "";
console.log(empty.length);  // 0
```

**スペースも1文字**：

```javascript
let text = "あ い う";
console.log(text.length);  // 5（スペースも含む）
```

### lengthの使い方

**パターン1：変数に分けて書く**
```javascript
const value = input.value;
const length = value.length;
console.log(length);
```

**パターン2：1行で書く**
```javascript
const length = input.value.length;
console.log(length);
```

どちらも同じ動作です。

## 残り文字数を表示

Twitterのような残り文字数表示を作れます。

### 例：20文字制限

**HTML**：
```html
<input id="message" type="text" oninput="showRemaining()" maxlength="20">
<p id="remaining"></p>
```

**JavaScript**：
```javascript
function showRemaining() {
  const input = document.getElementById("message");
  const length = input.value.length;
  const remaining = 20 - length;

  const result = document.getElementById("remaining");
  result.textContent = "残り: " + remaining + "文字";
}
```

**動作の流れ**：

```
何も入力していない
↓
length = 0, remaining = 20 - 0 = 20
↓
画面に「残り: 20文字」と表示される
↓
「こんにちは」と入力（5文字）
↓
length = 5, remaining = 20 - 5 = 15
↓
画面に「残り: 15文字」と表示される
```

**maxlength属性**：
- `maxlength="20"` で20文字までしか入力できなくなる
- ユーザーは21文字目を入力できない

## よくある間違いと解決方法

### ❌ 間違い1：oninputの関数に括弧を付け忘れる

```html
<input oninput="showValue">  <!-- ❌ 括弧がない -->
```

**何が問題か**：
- 関数が実行されない
- 何も起こらない

**解決方法**：
```html
<input oninput="showValue()">  <!-- ✅ 括弧を付ける -->
```

### ❌ 間違い2：oninputを引用符で囲み忘れる

```html
<input oninput=showValue()>  <!-- ❌ 引用符がない -->
```

**何が問題か**：
- HTMLの構文エラー
- 動作しない可能性がある

**解決方法**：
```html
<input oninput="showValue()">  <!-- ✅ 引用符で囲む -->
```

### ❌ 間違い3：lengthを()で呼び出そうとする

```javascript
const length = value.length();  // ❌ lengthは関数ではない
```

**エラーメッセージ**：`Uncaught TypeError: value.length is not a function`

**何が問題か**：
- `length`はプロパティであって、メソッド（関数）ではない
- 括弧`()`を付けてはいけない

**解決方法**：
```javascript
const length = value.length;  // ✅ 括弧なし
```

### ❌ 間違い4：onclickと混同する

```html
<!-- ❌ input要素にonclickを付けている -->
<input id="text" type="text" onclick="showValue()">
```

**何が問題か**：
- クリックしたときに実行される（入力時ではない）
- 期待した動作にならない

**解決方法**：
```html
<!-- ✅ input要素にはoninputを付ける -->
<input id="text" type="text" oninput="showValue()">
```

### ❌ 間違い5：lengthで文字列そのものを取得しようとする

```javascript
const value = input.value;
const text = value.length;  // ❌ これは文字数（数値）
console.log(text);  // 5（文字列ではない）
```

**何が問題か**：
- `length`は文字数を返す（文字列ではない）
- `value`が文字列そのもの

**正しい理解**：
```javascript
const value = input.value;     // "こんにちは"（文字列）
const length = value.length;   // 5（数値）
```

### ❌ 間違い6：残り文字数の計算を間違える

```javascript
const remaining = length - 20;  // ❌ 逆
```

**何が起こるのか**：
- 入力が増えるほど、残り文字数が増える（おかしい）

**解決方法**：
```javascript
const remaining = 20 - length;  // ✅ 正しい
```

## 実用例

### 例1：リアルタイム挨拶

**HTML**：
```html
<input id="name" type="text" oninput="showGreeting()" placeholder="名前を入力">
<p id="greeting"></p>
```

**JavaScript**：
```javascript
function showGreeting() {
  const input = document.getElementById("name");
  const name = input.value;

  const greeting = document.getElementById("greeting");
  greeting.textContent = "こんにちは、" + name + "さん";
}
```

**動作**：
1. 「太」と入力 → 「こんにちは、太さん」
2. 「太郎」と入力 → 「こんにちは、太郎さん」

### 例2：文字数カウンター

**HTML**：
```html
<textarea id="message" oninput="countChars()" rows="5" cols="30"></textarea>
<p id="count"></p>
```

**JavaScript**：
```javascript
function countChars() {
  const message = document.getElementById("message");
  const length = message.value.length;

  const count = document.getElementById("count");
  count.textContent = "文字数: " + length + "文字";
}
```

### 例3：複数の情報を表示

**HTML**：
```html
<input id="text" type="text" oninput="showInfo()">
<p id="value"></p>
<p id="length"></p>
```

**JavaScript**：
```javascript
function showInfo() {
  const input = document.getElementById("text");
  const value = input.value;
  const length = value.length;

  const valueElem = document.getElementById("value");
  valueElem.textContent = "入力: " + value;

  const lengthElem = document.getElementById("length");
  lengthElem.textContent = "文字数: " + length;
}
```

### 例4：Twitter風の文字数制限

**HTML**：
```html
<textarea id="tweet" oninput="checkTweet()" maxlength="140" rows="3" cols="40"></textarea>
<p id="count"></p>
<p id="warning"></p>
```

**JavaScript**：
```javascript
function checkTweet() {
  const tweet = document.getElementById("tweet");
  const length = tweet.value.length;
  const remaining = 140 - length;

  const count = document.getElementById("count");
  count.textContent = "残り: " + remaining + "文字";

  const warning = document.getElementById("warning");
  if (remaining < 10) {
    warning.textContent = "もうすぐ上限です";
  } else {
    warning.textContent = "";
  }
}
```

**注意**：if文はまだ学んでいませんが、次のレッスンで学びます。

## リアルタイム処理の注意点

### パフォーマンス

`oninput`イベントは、**入力するたびに実行される**ため、処理が重いと動作が遅くなることがあります。

**問題ない処理**：
- 文字数のカウント
- 簡単な文字列の表示
- 値の取得

**重い処理（注意が必要）**：
- 大量のデータ処理
- 複雑な計算
- サーバーへの通信

しかし、**初心者のうちは気にする必要はありません**。文字数のカウントや簡単な表示程度であれば問題ありません。

### デバッグ

リアルタイム処理をデバッグする場合：

```javascript
function showValue() {
  console.log("showValue が実行されました");
  const value = document.getElementById("text").value;
  console.log("入力値:", value);
  console.log("文字数:", value.length);
}
```

入力するたびに、コンソールに情報が表示されます。

## 練習問題

次の要件を満たすページを作成してください。

### 要件

1. `id="input1"`のinput要素を用意し、`oninput`属性で`showInput1`関数を実行するようにする
2. `id="input2"`のinput要素を用意し、`oninput`属性で`countChars`関数を実行するようにする
3. `id="input3"`のinput要素を用意し、`oninput`属性で`showBoth`関数を実行するようにする
4. `id="result1"`の要素を用意する
5. `id="result2"`の要素を用意する
6. `id="result3"`の要素を用意する
7. `showInput1`関数を定義し、次の処理を行う：
   - `id="input1"`の要素の`value`を取得する
   - `id="result1"`の要素の`textContent`に「入力: 」+取得した値を設定する
8. `countChars`関数を定義し、次の処理を行う：
   - `id="input2"`の要素の`value`を取得する
   - 文字数を取得する（`value.length`）
   - `id="result2"`の要素の`textContent`に「文字数: 」+文字数を設定する
9. `showBoth`関数を定義し、次の処理を行う：
   - `id="input3"`の要素の`value`を取得する
   - 文字数を取得する
   - `id="result3"`の要素の`textContent`に「入力: 」+値+「 (」+文字数+「文字)」を設定する

### ヒント

<details>
<summary>ヒント1：HTMLの構造</summary>

```html
<input id="input1" type="text" oninput="showInput1()" placeholder="入力1">
<p id="result1"></p>

<input id="input2" type="text" oninput="countChars()" placeholder="入力2">
<p id="result2"></p>

<input id="input3" type="text" oninput="showBoth()" placeholder="入力3">
<p id="result3"></p>
```
</details>

<details>
<summary>ヒント2：showInput1関数の骨組み</summary>

```javascript
function showInput1() {
  // 1. input要素を取得
  const elem = document.getElementById(/* ここにIDを書く */);

  // 2. valueを取得
  const value = elem.value;

  // 3. 結果を表示
  const result = document.getElementById(/* ここに結果のIDを書く */);
  result.textContent = /* ここに表示する内容を書く */;
}
```
</details>

<details>
<summary>ヒント3：文字数の取得方法</summary>

```javascript
const value = input.value;     // "こんにちは"
const length = value.length;   // 5
```

- `.length`で文字数を取得
- 括弧`()`は付けない
</details>

<details>
<summary>ヒント4：完全な例（showInput1関数）</summary>

```javascript
function showInput1() {
  const elem = document.getElementById("input1");
  const value = elem.value;
  const result = document.getElementById("result1");
  result.textContent = "入力: " + value;
}
```
</details>

<details>
<summary>ヒント5：完全な例（countChars関数）</summary>

```javascript
function countChars() {
  const elem = document.getElementById("input2");
  const value = elem.value;
  const length = value.length;
  const result = document.getElementById("result2");
  result.textContent = "文字数: " + length;
}
```
</details>

<details>
<summary>ヒント6：完全な例（showBoth関数）</summary>

```javascript
function showBoth() {
  const elem = document.getElementById("input3");
  const value = elem.value;
  const length = value.length;
  const result = document.getElementById("result3");
  result.textContent = "入力: " + value + " (" + length + "文字)";
}
```
</details>

<details>
<summary>ヒント7：動作確認の方法</summary>

1. ブラウザで`index.html`を開く
2. F12キーでコンソールを開く
3. 「入力1」に「あ」と入力
4. 「入力: あ」と表示されることを確認
5. 「い」と追加入力
6. 「入力: あい」と即座に更新されることを確認
</details>

### チェックリスト

完成したら、以下を確認してください：

- [ ] 3つの`<input>`要素にそれぞれ正しいIDが設定されている
- [ ] 3つの`<input>`要素に`oninput`属性が設定されている
- [ ] 3つの`<p>`要素にそれぞれ正しいIDが設定されている
- [ ] showInput1関数が動作し、入力がリアルタイムで表示される
- [ ] countChars関数が動作し、文字数がリアルタイムで表示される
- [ ] showBoth関数が動作し、入力と文字数が両方表示される
- [ ] 入力するたびに即座に更新される
- [ ] ボタンなしで動作する

### デバッグのヒント

うまく動かない場合：

1. **コンソールを開く**
   - F12キーを押す
   - エラーメッセージを確認

2. **console.logで確認**
   ```javascript
   function showInput1() {
     console.log("関数が実行されました");
     const value = document.getElementById("input1").value;
     console.log("取得した値:", value);
   }
   ```

3. **よくある問題**
   - `oninput`に括弧`()`がない → 関数が実行されない
   - `length()`と書いている → lengthは関数ではない
   - IDの綴りが間違っている → エラー
   - 引用符で囲み忘れている → HTMLエラー

## ポイント

- **`oninput`イベント**で入力するたびに処理を実行できます
- `oninput="関数名()"`のように書きます
- **`value.length`**で文字列の長さを取得できます
- `length`は**プロパティ**なので括弧`()`は付けません
- リアルタイムで**ユーザーに情報を提供**できます
- 入力するたびに**関数が実行**されます
- **ボタンが不要**です
- onclickは**クリック時**、oninputは**入力時**に実行されます

## できるようになったこと

このレッスンを終えると、以下のことができるようになります：

- [ ] oninputイベントを使える
- [ ] 入力するたびに処理を実行できる
- [ ] lengthプロパティで文字数を取得できる
- [ ] リアルタイムで値を表示できる
- [ ] 文字数カウンターを作れる
- [ ] 残り文字数を表示できる
- [ ] onclickとoninputの違いを理解できる
- [ ] リアルタイム処理の仕組みを理解できる

## まとめ

このレッスンでは、リアルタイムで入力を取得する方法を学びました。

**重要なポイント**：

1. **oninputイベントの基本**
   ```html
   <input id="text" type="text" oninput="showValue()">
   ```
   - 入力するたびに関数が実行される
   - 1文字入力で1回実行される

2. **onclickとの違い**
   - onclick：クリック時に実行
   - oninput：入力時に実行

3. **lengthプロパティ**
   ```javascript
   const length = value.length;
   ```
   - 文字数を取得できる
   - プロパティなので括弧`()`は不要

4. **文字数カウント**
   ```javascript
   const value = input.value;
   const length = value.length;
   count.textContent = "文字数: " + length;
   ```
   - リアルタイムで文字数を表示

5. **残り文字数**
   ```javascript
   const remaining = 20 - length;
   ```
   - 制限文字数から現在の文字数を引く

6. **リアルタイムのメリット**
   - ユーザーに即座にフィードバック
   - ボタンが不要
   - 使いやすいUI

7. **注意点**
   - 入力するたびに実行される
   - 重い処理は避ける（初心者は気にしなくてOK）

**次のステップ**：

次のレッスンでは、**複数の入力**を学びます。名前と年齢など、複数のinput要素を組み合わせて使う方法を学びましょう。
