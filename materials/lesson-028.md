# Lesson 028: inputから取得

このレッスンでは、テキストボックス（input要素）からユーザーの入力を取得する方法を学びます。

## なぜ重要なのか

**身近な例**：
- **Google**：検索ボックスに文字を入力 → 検索結果を表示
- **Twitter**：ツイート入力欄に文字を入力 → 投稿ボタンを押して投稿
- **Amazon**：商品検索ボックスに入力 → 検索ボタンで検索
- **Gmail**：メール本文を入力 → 送信ボタンで送信
- **Facebook**：投稿欄に入力 → シェアボタンで投稿

これらすべてに共通するのは、**ページ上のテキストボックスに入力して、ボタンを押すことで処理を実行する**ということです。

**promptとの違い**：
- **prompt**：ダイアログが表示される → 入力が終わるまで他の操作ができない
- **input要素**：ページ上に常に表示 → 他の操作もできる → 好きなタイミングで値を取得

## input要素とは

`input`要素は、ユーザーが**文字を入力できるテキストボックス**です。

### 基本的な使い方

**HTML**：
```html
<input id="name" type="text">
```

このコードで、**テキストボックスが表示**されます。

### input要素の見た目

```
┌─────────────────────────────┐
│ [________________]          │  ← テキストボックス
└─────────────────────────────┘
```

ユーザーはここに文字を入力できます。

### input要素の属性

```html
<input id="name" type="text">
```

**各部分の意味**：
- `id="name"` - 要素を識別するためのID（getElementByIdで取得）
- `type="text"` - テキストを入力するタイプ

## valueプロパティ

input要素に入力された値を取得するには、**`value`プロパティ**を使います。

### 基本的な構文

```javascript
const elem = document.getElementById("name");
const value = elem.value;
```

**何が起こっているか**：
1. `getElementById("name")`でinput要素を取得
2. `.value`でその要素の値（入力された文字列）を取得

### 1行で書く

```javascript
const value = document.getElementById("name").value;
```

この書き方もよく使われます。

### valueの特徴

**重要**：`value`プロパティは**常に文字列**を返します。

```javascript
const elem = document.getElementById("name");
const value = elem.value;
console.log(typeof value);  // "string"
```

ユーザーが「20」と入力しても、それは文字列の`"20"`です。

## 基本的な使い方

### 例：入力された値を表示する

**HTML**：
```html
<input id="name" type="text">
<button onclick="showValue()">表示</button>
<p id="result"></p>
```

**JavaScript**：
```javascript
function showValue() {
  const input = document.getElementById("name");
  const value = input.value;

  const result = document.getElementById("result");
  result.textContent = "入力された値: " + value;
}
```

**動作の流れ（8ステップ）**：

```
ステップ1: ユーザーがテキストボックスに「太郎」と入力
         ↓
ステップ2: ボタンをクリック
         ↓
ステップ3: showValue() 関数が実行される
         ↓
ステップ4: getElementById("name") でinput要素を取得
         ↓
ステップ5: .value で「太郎」を取得
         ↓
ステップ6: getElementById("result") で表示先を取得
         ↓
ステップ7: textContent に「入力された値: 太郎」を設定
         ↓
ステップ8: 画面に「入力された値: 太郎」と表示される
```

## promptとinput要素の違い

これまでに学んだ`prompt`とinput要素の違いを整理しましょう。

### 比較表

| 項目 | prompt | input要素 |
|------|--------|-----------|
| 表示場所 | ダイアログボックス | ページ上 |
| 他の操作 | できない（ブロックされる） | できる（自由に操作可能） |
| 入力後 | すぐに値が返る | ボタンを押すなどして取得 |
| 見た目 | ブラウザ標準のダイアログ | CSSでカスタマイズ可能 |
| 使用例 | 簡単な入力 | フォーム、検索ボックス |

### prompt

**ダイアログが表示される**：

```javascript
const name = prompt("名前は？");
```

**特徴**：
- 入力が完了するまで他の操作ができない
- 入力が終わったら値が返される
- 見た目の変更ができない

### input要素

**ページ上にテキストボックスが表示される**：

```html
<input id="name" type="text">
<button onclick="getValue()">取得</button>
```

```javascript
function getValue() {
  const elem = document.getElementById("name");
  const value = elem.value;
  console.log(value);
}
```

**特徴**：
- 他の操作もできる
- ボタンをクリックしたときなどに値を取得
- CSSで見た目を自由に変更できる

### どちらを使うか

**prompt**：
- 簡単な一時的な入力
- 開発中のデバッグ

**input要素**：
- 本格的なWebアプリケーション
- フォーム、検索ボックス
- ユーザーに見やすいUI

## 複数のinput要素

複数のinput要素を使うこともできます。

### 例：名字と名前を入力

**HTML**：
```html
<input id="firstName" type="text" placeholder="名前">
<input id="lastName" type="text" placeholder="名字">
<button onclick="showFullName()">表示</button>
<p id="result"></p>
```

**JavaScript**：
```javascript
function showFullName() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;

  const result = document.getElementById("result");
  result.textContent = lastName + " " + firstName;
}
```

**動作の流れ**：

```
ユーザーが「太郎」「山田」と入力
↓
firstName = "太郎"
lastName = "山田"
↓
result.textContent = "山田" + " " + "太郎" = "山田 太郎"
↓
画面に「山田 太郎」と表示される
```

## valueの設定

`value`プロパティは、値を**取得するだけでなく、設定することもできます**。

### 初期値を設定

```javascript
const elem = document.getElementById("name");
elem.value = "初期値";
```

これにより、テキストボックスに「初期値」と表示されます。

### クリアする

```javascript
const elem = document.getElementById("name");
elem.value = "";
```

空文字列（`""`）を設定すると、テキストボックスが空になります。

### 実用例：クリアボタン

**HTML**：
```html
<input id="text" type="text">
<button onclick="clearText()">クリア</button>
```

**JavaScript**：
```javascript
function clearText() {
  const elem = document.getElementById("text");
  elem.value = "";
}
```

## placeholderとは

`placeholder`属性は、input要素に**薄く表示されるヒント**です。

### 基本的な使い方

```html
<input id="name" type="text" placeholder="名前を入力してください">
```

**見た目**：

```
入力前：
┌─────────────────────────────┐
│ 名前を入力してください       │  ← 薄い文字で表示
└─────────────────────────────┘

入力中：
┌─────────────────────────────┐
│ 太郎                        │  ← placeholderが消える
└─────────────────────────────┘
```

**特徴**：
- ユーザーが何も入力していないときに表示される
- 入力を始めると消える
- `value`には含まれない（あくまでヒント）

## 数値の計算

input要素の`value`は**常に文字列**なので、計算には`Number`関数で変換が必要です。

### 例：2つの数値を足す

**HTML**：
```html
<input id="num1" type="text" placeholder="1つ目の数値">
<input id="num2" type="text" placeholder="2つ目の数値">
<button onclick="calculate()">計算</button>
<p id="result"></p>
```

**JavaScript**：
```javascript
function calculate() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;

  const a = Number(num1);
  const b = Number(num2);
  const sum = a + b;

  const result = document.getElementById("result");
  result.textContent = "合計: " + sum;
}
```

**動作の流れ**：

```
ユーザーが「10」「5」と入力
↓
num1 = "10"（文字列）
num2 = "5"（文字列）
↓
a = Number("10") = 10（数値）
b = Number("5") = 5（数値）
↓
sum = 10 + 5 = 15
↓
画面に「合計: 15」と表示される
```

**注意**：Number関数を使わないと...

```javascript
const num1 = "10";
const num2 = "5";
const sum = num1 + num2;  // "105"（連結になる）
```

## よくある間違いと解決方法

### ❌ 間違い1：valueを忘れる

```javascript
const elem = document.getElementById("name");
const value = elem;  // ❌ これは要素そのもの
console.log(value);  // [object HTMLInputElement]
```

**何が問題か**：
- `.value`を付けていない
- 要素そのものが取得される（値ではない）

**解決方法**：
```javascript
const elem = document.getElementById("name");
const value = elem.value;  // ✅ .valueを付ける
console.log(value);  // "太郎"
```

### ❌ 間違い2：textContentで取得しようとする

```javascript
const elem = document.getElementById("name");
const value = elem.textContent;  // ❌ input要素にtextContentは使わない
```

**何が問題か**：
- input要素の値は`textContent`ではなく`value`
- `textContent`は空文字列になる

**解決方法**：
```javascript
const elem = document.getElementById("name");
const value = elem.value;  // ✅ input要素はvalue
```

### ❌ 間違い3：getElementById("name")のIDを間違える

```javascript
// HTML: <input id="username" type="text">
const value = document.getElementById("name").value;  // ❌ IDが違う
```

**エラーメッセージ**：`Uncaught TypeError: Cannot read properties of null (reading 'value')`

**何が問題か**：
- HTMLでは`id="username"`なのに、JavaScriptでは`"name"`を指定
- 要素が取得できず`null`になる

**解決方法**：
```javascript
const value = document.getElementById("username").value;  // ✅ IDを合わせる
```

### ❌ 間違い4：type属性を忘れる

```html
<input id="name">  <!-- type属性がない -->
```

**何が起こるのか**：
- デフォルトで`type="text"`になるので動作はする
- しかし明示的に書く方が良い

**解決方法**：
```html
<input id="name" type="text">  <!-- ✅ type属性を明示 -->
```

### ❌ 間違い5：数値の計算でNumber関数を忘れる

```javascript
const num1 = document.getElementById("num1").value;  // "10"
const num2 = document.getElementById("num2").value;  // "5"
const sum = num1 + num2;  // "105"（連結になる）
```

**解決方法**：
```javascript
const num1 = Number(document.getElementById("num1").value);  // 10
const num2 = Number(document.getElementById("num2").value);  // 5
const sum = num1 + num2;  // 15（正しい計算）
```

### ❌ 間違い6：valueの設定を間違える

```javascript
const elem = document.getElementById("name");
elem = "太郎";  // ❌ 要素そのものに代入しようとしている
```

**エラーメッセージ**：`Uncaught TypeError: Assignment to constant variable.`

**解決方法**：
```javascript
const elem = document.getElementById("name");
elem.value = "太郎";  // ✅ .valueに代入
```

## 実用例

### 例1：挨拶メッセージを作る

**HTML**：
```html
<input id="name" type="text" placeholder="名前を入力">
<button onclick="greet()">挨拶</button>
<p id="message"></p>
```

**JavaScript**：
```javascript
function greet() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message");
  message.textContent = "こんにちは、" + name + "さん";
}
```

**動作**：
1. テキストボックスに「太郎」と入力
2. ボタンをクリック
3. 「こんにちは、太郎さん」と表示される

### 例2：入力をクリアする

**HTML**：
```html
<input id="text" type="text" placeholder="何か入力">
<button onclick="showText()">表示</button>
<button onclick="clearText()">クリア</button>
<p id="result"></p>
```

**JavaScript**：
```javascript
function showText() {
  const value = document.getElementById("text").value;
  const result = document.getElementById("result");
  result.textContent = "入力: " + value;
}

function clearText() {
  const elem = document.getElementById("text");
  elem.value = "";
  const result = document.getElementById("result");
  result.textContent = "";
}
```

### 例3：年齢計算機

**HTML**：
```html
<input id="birthYear" type="text" placeholder="生まれた年">
<button onclick="calculateAge()">年齢計算</button>
<p id="result"></p>
```

**JavaScript**：
```javascript
function calculateAge() {
  const birthYear = document.getElementById("birthYear").value;
  const year = Number(birthYear);
  const age = 2024 - year;

  const result = document.getElementById("result");
  result.textContent = "あなたは" + age + "歳です";
}
```

### 例4：3つの入力を結合

**HTML**：
```html
<input id="input1" type="text" placeholder="1つ目">
<input id="input2" type="text" placeholder="2つ目">
<input id="input3" type="text" placeholder="3つ目">
<button onclick="combine()">結合</button>
<p id="result"></p>
```

**JavaScript**：
```javascript
function combine() {
  const val1 = document.getElementById("input1").value;
  const val2 = document.getElementById("input2").value;
  const val3 = document.getElementById("input3").value;

  const result = document.getElementById("result");
  result.textContent = val1 + " " + val2 + " " + val3;
}
```

## 練習問題

次の要件を満たすページを作成してください。

### 要件

1. `id="input1"`のinput要素を用意する
2. `id="input2"`のinput要素を用意する
3. `id="input3"`のinput要素を用意する
4. `id="result1"`の要素を用意する
5. `id="result2"`の要素を用意する
6. `id="result3"`の要素を用意する
7. `showInput1`関数を定義し、次の処理を行う：
   - `id="input1"`の要素の`value`を取得する
   - `id="result1"`の要素の`textContent`に「入力1: 」+取得した値を設定する
8. `showInput2`関数を定義し、次の処理を行う：
   - `id="input2"`の要素の`value`を取得する
   - `id="result2"`の要素の`textContent`に「入力2: 」+取得した値を設定する
9. `combineInputs`関数を定義し、次の処理を行う：
   - `id="input1"`の要素の`value`を取得する
   - `id="input2"`の要素の`value`を取得する
   - 2つの値を連結する（間にスペースを入れる）
   - `id="result3"`の要素の`textContent`に「結合: 」+連結した値を設定する
10. 3つのボタンを作成し、それぞれクリックすると対応する関数が実行されるようにする

### ヒント

<details>
<summary>ヒント1：HTMLの構造</summary>

```html
<input id="input1" type="text" placeholder="1つ目の入力">
<input id="input2" type="text" placeholder="2つ目の入力">
<input id="input3" type="text" placeholder="3つ目の入力">

<button onclick="showInput1()">入力1を表示</button>
<button onclick="showInput2()">入力2を表示</button>
<button onclick="combineInputs()">結合</button>

<p id="result1"></p>
<p id="result2"></p>
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
<summary>ヒント3：valueの取得方法</summary>

```javascript
// 方法1：分けて書く
const elem = document.getElementById("input1");
const value = elem.value;

// 方法2：1行で書く
const value = document.getElementById("input1").value;
```
</details>

<details>
<summary>ヒント4：文字列の連結</summary>

```javascript
const val1 = "太郎";
const val2 = "山田";
const result = val1 + " " + val2;  // "太郎 山田"
```

- 間にスペース（`" "`）を入れる
- `+`で連結する
</details>

<details>
<summary>ヒント5：完全な例（showInput1関数）</summary>

```javascript
function showInput1() {
  const elem = document.getElementById("input1");
  const value = elem.value;
  const result = document.getElementById("result1");
  result.textContent = "入力1: " + value;
}
```
</details>

<details>
<summary>ヒント6：combineInputs関数の例</summary>

```javascript
function combineInputs() {
  const val1 = document.getElementById("input1").value;
  const val2 = document.getElementById("input2").value;
  const combined = val1 + " " + val2;
  const result = document.getElementById("result3");
  result.textContent = "結合: " + combined;
}
```
</details>

<details>
<summary>ヒント7：動作確認の方法</summary>

1. ブラウザで`index.html`を開く
2. 「1つ目の入力」に「太郎」と入力
3. 「入力1を表示」ボタンをクリック
4. 「入力1: 太郎」と表示されることを確認
5. F12キーでコンソールを開いてエラーがないか確認
</details>

### チェックリスト

完成したら、以下を確認してください：

- [ ] 3つの`<input>`要素にそれぞれ正しいIDが設定されている
- [ ] 3つの`<p>`要素にそれぞれ正しいIDが設定されている
- [ ] 3つのボタンがあり、それぞれ正しい関数を呼び出している
- [ ] showInput1関数が動作し、入力1の値が表示される
- [ ] showInput2関数が動作し、入力2の値が表示される
- [ ] combineInputs関数が動作し、2つの値が結合される
- [ ] テキストボックスに入力できる
- [ ] ボタンをクリックすると結果が表示される
- [ ] placeholderが表示される（オプション）

### デバッグのヒント

うまく動かない場合：

1. **コンソールを開く**
   - F12キーを押す
   - エラーメッセージを確認

2. **console.logで確認**
   ```javascript
   function showInput1() {
     const value = document.getElementById("input1").value;
     console.log("取得した値:", value);
     console.log("型:", typeof value);
   }
   ```

3. **よくある問題**
   - `.value`を忘れている → 要素そのものが取得される
   - IDの綴りが間違っている → エラー
   - `textContent`と`value`を混同 → input要素は`value`
   - 関数名の綴りが間違っている → ボタンを押してもエラー

## ポイント

- input要素は**テキストボックス**を表示します
- `<input id="name" type="text">`でHTMLに書きます
- **`value`プロパティ**で入力された値を取得できます
- `value`プロパティで値を**設定することもできます**
- input要素の値は**常に文字列**です
- 計算に使う場合は**`Number`で変換が必要**です
- **`placeholder`属性**でヒントを表示できます
- promptと違い、**ページ上に表示され続けます**

## できるようになったこと

このレッスンを終えると、以下のことができるようになります：

- [ ] input要素をHTMLに書ける
- [ ] valueプロパティで値を取得できる
- [ ] valueプロパティで値を設定できる
- [ ] promptとinput要素の違いを理解できる
- [ ] 複数のinput要素を扱える
- [ ] placeholderを使える
- [ ] input要素の値は文字列であることを理解できる
- [ ] 数値の計算にNumber関数が必要なことを理解できる

## まとめ

このレッスンでは、input要素から値を取得する方法を学びました。

**重要なポイント**：

1. **input要素の基本**
   ```html
   <input id="name" type="text">
   ```
   - ページ上にテキストボックスを表示
   - ユーザーが文字を入力できる

2. **valueプロパティで取得**
   ```javascript
   const value = document.getElementById("name").value;
   ```
   - `.value`で入力された値を取得
   - 常に文字列が返る

3. **valueプロパティで設定**
   ```javascript
   const elem = document.getElementById("name");
   elem.value = "初期値";
   ```
   - 値を設定することもできる
   - クリアするには空文字列（`""`）を設定

4. **promptとの違い**
   - prompt：ダイアログ、ブロックする
   - input要素：ページ上、ブロックしない

5. **複数の入力**
   ```javascript
   const val1 = document.getElementById("input1").value;
   const val2 = document.getElementById("input2").value;
   ```
   - 複数のinput要素を組み合わせられる

6. **placeholderでヒント**
   ```html
   <input id="name" type="text" placeholder="名前を入力">
   ```
   - 入力前にヒントを表示

7. **数値の計算**
   ```javascript
   const num = Number(document.getElementById("num").value);
   ```
   - valueは文字列なので、Number関数で変換

**次のステップ**：

次のレッスンでは、**リアルタイム取得**を学びます。ユーザーが入力するたびに値を取得して、文字数をカウントしたり、即座に反映させる方法を学びましょう。
