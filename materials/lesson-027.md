# Lesson 027: confirmで確認

このレッスンでは、ユーザーに確認を求める方法を学びます。

## なぜ重要なのか

**身近な例**：
- **Twitter**：ツイートを削除 → 「本当に削除しますか？」と確認
- **Amazon**：注文をキャンセル → 「キャンセルしてもよろしいですか？」と確認
- **Gmail**：添付ファイルなしでメール送信 → 「添付ファイルを忘れていませんか？」と確認
- **YouTube**：動画を削除 → 「この動画を削除しますか？」と確認
- **Google Drive**：ファイルを削除 → 「ゴミ箱に移動しますか？」と確認

これらすべてに共通するのは、**重要な操作の前にユーザーに確認を求める**ということです。

**なぜ確認が必要なのか**：
- 誤操作を防ぐ（間違ってボタンを押してしまった）
- 重要な決定を再確認する（本当にこれでいいのか）
- 取り消せない操作の前に警告する（削除したら戻せない）

## confirmとは

`confirm`は、ユーザーに**「はい」か「いいえ」を選んでもらう**ための機能です。

### 基本的な使い方

```javascript
let ok = confirm("準備OK？");
```

このコードを実行すると、**ブラウザに確認ダイアログが表示**されます。

### confirmの見た目

```
┌────────────────────────────────┐
│  準備OK？                       │
│                                │
│         [OK]    [キャンセル]    │
└────────────────────────────────┘
```

### confirmの構文

```javascript
let 変数名 = confirm("確認メッセージ");
```

**各部分の意味**：
- `confirm` - 確認ダイアログを表示する関数
- `"確認メッセージ"` - ユーザーに表示する質問（文字列）
- `変数名` - 結果（trueまたはfalse）を保存する変数

## confirmの動作

### 動作の流れ（6ステップ）

```
ステップ1: confirm("準備OK？") が実行される
         ↓
ステップ2: プログラムが一時停止する
         ↓
ステップ3: ブラウザに確認ダイアログが表示される
         ↓
ステップ4: ユーザーがOKまたはキャンセルを押す
         ↓
ステップ5: 結果（trueまたはfalse）が変数に保存される
         ↓
ステップ6: プログラムの続きが実行される
```

**重要**：`confirm`が表示されている間、**プログラムは一時停止**します。

### OKボタンを押した場合

ユーザーが「OK」ボタンを押すと、`confirm`は**`true`を返します**。

```javascript
let ok = confirm("準備OK？");
// ユーザーがOKを押すと、ok には true が入る
console.log(ok);  // true
```

### キャンセルボタンを押した場合

ユーザーが「キャンセル」ボタンを押すと、`confirm`は**`false`を返します**。

```javascript
let ok = confirm("準備OK？");
// ユーザーがキャンセルを押すと、ok には false が入る
console.log(ok);  // false
```

### 戻り値のまとめ

| ユーザーの操作 | 戻り値 | 意味 |
|--------------|-------|------|
| OKボタンを押す | `true` | はい、OK、続ける |
| キャンセルボタンを押す | `false` | いいえ、キャンセル、やめる |

## 真偽値（boolean）とは

`true`と`false`は、JavaScriptの**真偽値（boolean）**と呼ばれる値です。

### 真偽値の種類

- `true`：真（はい、正しい、OK）
- `false`：偽（いいえ、間違い、キャンセル）

### 真偽値は特別な型

真偽値は、**文字列や数値とは異なる型**の値です。

```javascript
let isReady = true;   // 真偽値（boolean）
let name = "太郎";    // 文字列（string）
let age = 20;         // 数値（number）
```

### 型を確認する

```javascript
let ok = confirm("準備OK？");
console.log(ok);         // true または false
console.log(typeof ok);  // "boolean"
```

### 真偽値と文字列の違い

**真偽値**：
```javascript
let ok = true;  // 引用符なし
console.log(typeof ok);  // "boolean"
```

**文字列**：
```javascript
let str = "true";  // 引用符あり
console.log(typeof str);  // "string"
```

**重要**：`true`と`"true"`は**まったく別物**です。

## console.logとの組み合わせ

`confirm`の結果を`console.log`で確認できます。

### 基本的な例

```javascript
let ok = confirm("準備OK？");
console.log(ok);  // true または false
```

**実行例**：

```
ユーザーがOKを押した場合：
↓
ok = true
↓
console.log(ok)
↓
コンソールに true と表示される
```

```
ユーザーがキャンセルを押した場合：
↓
ok = false
↓
console.log(ok)
↓
コンソールに false と表示される
```

### 複数の確認

```javascript
let check1 = confirm("最初の確認");
console.log("1回目:", check1);

let check2 = confirm("2回目の確認");
console.log("2回目:", check2);

let check3 = confirm("3回目の確認");
console.log("3回目:", check3);
```

**コンソールの表示例**：

```
1回目: true
2回目: false
3回目: true
```

## 真偽値の表示

真偽値をそのまま表示すると、**"true"または"false"という文字列として表示**されます。

### 文字列との連結

```javascript
let ok = true;
console.log(ok);  // true
console.log("結果: " + ok);  // "結果: true"
```

**何が起こっているか**：

```
"結果: " + ok
↓
"結果: " + true
↓
"結果: true"（文字列に自動変換される）
```

### 自動的な型変換

真偽値を文字列と連結すると、**自動的に文字列に変換**されます。

```javascript
let ok = confirm("続けますか？");
console.log("確認結果: " + ok);
// OKを押すと → "確認結果: true"
// キャンセルを押すと → "確認結果: false"
```

## confirmとDOM操作の組み合わせ

`confirm`の結果を**画面に表示**できます。

### 基本的な例

**HTML**：
```html
<p id="result"></p>
<button onclick="askConfirm()">確認する</button>
```

**JavaScript**：
```javascript
function askConfirm() {
  let ok = confirm("準備はできていますか？");
  const elem = document.getElementById("result");
  elem.textContent = "結果: " + ok;
}
```

**動作の流れ（8ステップ）**：

```
ステップ1: ボタンをクリック
         ↓
ステップ2: askConfirm() 関数が実行される
         ↓
ステップ3: confirm("準備はできていますか？") が表示される
         ↓
ステップ4: ユーザーがOKまたはキャンセルを押す
         ↓
ステップ5: ok に true または false が代入される
         ↓
ステップ6: id="result" の要素を取得
         ↓
ステップ7: textContent = "結果: true" または "結果: false" に設定
         ↓
ステップ8: 画面に「結果: true」または「結果: false」と表示される
```

### 3つの確認を表示

**HTML**：
```html
<p id="results"></p>
<button onclick="multipleChecks()">3つ確認</button>
```

**JavaScript**：
```javascript
function multipleChecks() {
  let check1 = confirm("最初の確認");
  let check2 = confirm("2番目の確認");
  let check3 = confirm("3番目の確認");

  const elem = document.getElementById("results");
  elem.textContent = "1: " + check1 + ", 2: " + check2 + ", 3: " + check3;
}
```

**実行例**：

```
ユーザーが OK, キャンセル, OK を押した場合
↓
check1 = true
check2 = false
check3 = true
↓
画面に「1: true, 2: false, 3: true」と表示される
```

## YesとNoで違う動作（if文の準備）

**注意**：このレッスンではまだ**if文を学んでいない**ため、結果に応じて異なる処理を行うことはできません。

**現在できること**：
```javascript
let ok = confirm("続けますか？");
console.log(ok);  // 結果を表示
```

**次のレッスンで学ぶこと（if文）**：
```javascript
let ok = confirm("続けますか？");
if (ok) {
  console.log("続けます");  // OKを押した場合
} else {
  console.log("やめます");  // キャンセルを押した場合
}
```

**今回は**、confirmが`true`と`false`を返すことを理解し、次のレッスンでそれを使った分岐処理を学びます。

## promptとconfirmの違い

これまでに学んだ`prompt`と`confirm`の違いを整理しましょう。

### 比較表

| 機能 | prompt | confirm |
|------|--------|---------|
| 用途 | 文字を入力してもらう | はい/いいえを選んでもらう |
| 戻り値の型 | 文字列（string） | 真偽値（boolean） |
| 戻り値の例 | "太郎", "20", "" | true, false |
| キャンセル時 | null | false |
| 使用例 | 名前、年齢の入力 | 削除の確認、送信の確認 |

### prompt

**文字を入力してもらう**：

```javascript
let name = prompt("名前は？");
console.log(name);  // "太郎"（文字列）
console.log(typeof name);  // "string"
```

**戻り値**：
- 入力した文字列（例："太郎"）
- 空文字列（何も入力せずOK）
- null（キャンセル）

### confirm

**はい/いいえを選んでもらう**：

```javascript
let ok = confirm("準備OK？");
console.log(ok);  // true または false（真偽値）
console.log(typeof ok);  // "boolean"
```

**戻り値**：
- true（OKボタン）
- false（キャンセルボタン）

### どちらを使うか

**prompt**：
- 名前を入力してもらう
- 年齢を入力してもらう
- 好きな色を入力してもらう

**confirm**：
- 削除の確認
- 送信の確認
- 続行の確認

## よくある間違いと解決方法

### ❌ 間違い1：confirmの結果を保存し忘れる

```javascript
confirm("準備OK？");
console.log(ok);  // エラー！
```

**エラーメッセージ**：`Uncaught ReferenceError: ok is not defined`

**何が問題か**：
- confirmの結果を変数に保存していない
- 変数`ok`が存在しない

**解決方法**：
```javascript
let ok = confirm("準備OK？");  // 変数に保存
console.log(ok);
```

### ❌ 間違い2：confirmに括弧()を付け忘れる

```javascript
let ok = confirm;
console.log(ok);
```

**何が起こるのか**：
- `ok`にconfirm関数そのものが入る
- コンソールに関数の内容が表示される

**解決方法**：
```javascript
let ok = confirm("準備OK？");  // 括弧を付ける
console.log(ok);
```

### ❌ 間違い3：真偽値を引用符で囲む

```javascript
let ok = "true";  // これは文字列
console.log(typeof ok);  // "string"
```

**何が問題か**：
- `"true"`は文字列であって、真偽値ではない
- confirmは引用符なしの`true`を返す

**正しい理解**：
```javascript
let ok = confirm("準備OK？");  // true（真偽値）
let str = "true";               // "true"（文字列）

console.log(ok === true);    // true（比較できる）
console.log(str === true);   // false（型が違う）
```

### ❌ 間違い4：promptとconfirmを混同する

```javascript
// ❌ 間違い：confirmで文字列を取得しようとする
let name = confirm("名前は？");
// → true または false になる（文字列ではない）

// ❌ 間違い：promptで真偽値を取得しようとする
let ok = prompt("準備OK？");
// → "はい" などの文字列になる（true/falseではない）
```

**解決方法**：
```javascript
// ✅ 正しい：promptで文字列を取得
let name = prompt("名前は？");

// ✅ 正しい：confirmで真偽値を取得
let ok = confirm("準備OK？");
```

### ❌ 間違い5：confirmをHTMLに直接書いている

```html
<!-- ❌ 間違い -->
<button onclick="confirm('準備OK？')">クリック</button>
```

**何が問題か**：
- confirmは実行されるが、結果が保存されない
- 結果を使えない

**解決方法**：
```html
<!-- ✅ 正しい -->
<button onclick="askConfirm()">クリック</button>
```

```javascript
function askConfirm() {
  let ok = confirm("準備OK？");
  // okを使った処理...
}
```

### ❌ 間違い6：trueとfalseの大文字・小文字を間違える

```javascript
let ok = True;   // ❌ エラー！
let ng = FALSE;  // ❌ エラー！
```

**エラーメッセージ**：`Uncaught ReferenceError: True is not defined`

**解決方法**：
```javascript
let ok = true;   // ✅ 小文字
let ng = false;  // ✅ 小文字
```

**重要**：JavaScriptでは`true`と`false`は**すべて小文字**で書きます。

## 実用例

### 例1：削除確認

**HTML**：
```html
<p id="message"></p>
<button onclick="checkDelete()">削除確認</button>
```

**JavaScript**：
```javascript
function checkDelete() {
  let ok = confirm("本当に削除しますか？");
  const elem = document.getElementById("message");
  elem.textContent = "確認結果: " + ok;
}
```

**動作**：
1. ボタンをクリック
2. 「本当に削除しますか？」と確認
3. OK → 「確認結果: true」と表示
4. キャンセル → 「確認結果: false」と表示

### 例2：送信確認

**HTML**：
```html
<p id="status"></p>
<button onclick="checkSubmit()">送信確認</button>
```

**JavaScript**：
```javascript
function checkSubmit() {
  let ok = confirm("この内容で送信しますか？");
  const elem = document.getElementById("status");
  elem.textContent = "送信確認: " + ok;
}
```

### 例3：複数の確認

**HTML**：
```html
<p id="results"></p>
<button onclick="multipleChecks()">複数確認</button>
```

**JavaScript**：
```javascript
function multipleChecks() {
  let check1 = confirm("最初の確認");
  let check2 = confirm("2番目の確認");
  let check3 = confirm("3番目の確認");

  const elem = document.getElementById("results");
  elem.textContent = "1: " + check1 + ", 2: " + check2 + ", 3: " + check3;
}
```

### 例4：確認とconsole.logの組み合わせ

**JavaScript**：
```javascript
function debugConfirm() {
  let ok = confirm("続けますか？");
  console.log("確認結果:", ok);
  console.log("型:", typeof ok);

  const elem = document.getElementById("debug");
  elem.textContent = "結果: " + ok + " (型: " + typeof ok + ")";
}
```

**コンソールの表示例**：
```
確認結果: true
型: boolean
```

## 練習問題

次の要件を満たすページを作成してください。

### 要件

1. `id="result1"`の要素を用意する
2. `id="result2"`の要素を用意する
3. `id="result3"`の要素を用意する
4. `checkReady`関数を定義し、次の処理を行う：
   - `confirm`で「準備はできていますか？」と確認する
   - 結果を変数に保存する
   - `console.log`で結果を表示する
   - `id="result1"`の要素の`textContent`に「準備: 」+結果を設定する
5. `checkContinue`関数を定義し、次の処理を行う：
   - `confirm`で「続けますか？」と確認する
   - 結果を変数に保存する
   - `console.log`で結果を表示する
   - `id="result2"`の要素の`textContent`に「続行: 」+結果を設定する
6. `checkAgree`関数を定義し、次の処理を行う：
   - `confirm`で「同意しますか？」と確認する
   - 結果を変数に保存する
   - `console.log`で結果を表示する
   - `id="result3"`の要素の`textContent`に「同意: 」+結果を設定する
7. 3つのボタンを作成し、それぞれクリックすると対応する関数が実行されるようにする

### ヒント

<details>
<summary>ヒント1：HTMLの構造</summary>

```html
<p id="result1"></p>
<p id="result2"></p>
<p id="result3"></p>
<button onclick="checkReady()">準備確認</button>
<button onclick="checkContinue()">続行確認</button>
<button onclick="checkAgree()">同意確認</button>
```
</details>

<details>
<summary>ヒント2：checkReady関数の骨組み</summary>

```javascript
function checkReady() {
  // 1. confirmで確認する
  let ok = confirm(/* ここに質問を書く */);

  // 2. console.logで表示する
  console.log(/* ここに表示する内容を書く */);

  // 3. 画面に表示する
  const elem = document.getElementById(/* ここにIDを書く */);
  elem.textContent = /* ここに表示する内容を書く */;
}
```
</details>

<details>
<summary>ヒント3：confirmの使い方</summary>

```javascript
let ok = confirm("質問文");
```

- confirmは真偽値を返す
- OKを押すと`true`、キャンセルを押すと`false`
</details>

<details>
<summary>ヒント4：文字列との連結</summary>

```javascript
let ok = true;
let result = "準備: " + ok;
// "準備: true"
```

- `+`で文字列と真偽値をつなげる
- 真偽値は自動的に文字列に変換される
</details>

<details>
<summary>ヒント5：完全な例（checkReady関数）</summary>

```javascript
function checkReady() {
  let ok = confirm("準備はできていますか？");
  console.log(ok);
  const elem = document.getElementById("result1");
  elem.textContent = "準備: " + ok;
}
```
</details>

<details>
<summary>ヒント6：動作確認の方法</summary>

1. ブラウザで`index.html`を開く
2. F12キーでコンソールを開く
3. 「準備確認」ボタンをクリック
4. OKを押す → コンソールに`true`、画面に「準備: true」
5. キャンセルを押す → コンソールに`false`、画面に「準備: false」
</details>

<details>
<summary>ヒント7：デバッグ方法</summary>

```javascript
function checkReady() {
  let ok = confirm("準備はできていますか？");
  console.log("結果:", ok);           // デバッグ1
  console.log("型:", typeof ok);      // デバッグ2

  const elem = document.getElementById("result1");
  elem.textContent = "準備: " + ok;
}
```

- `console.log`で値と型を確認
- `typeof`で真偽値であることを確認
</details>

### チェックリスト

完成したら、以下を確認してください：

- [ ] 3つの`<p>`要素にそれぞれ正しいIDが設定されている
- [ ] 3つのボタンがあり、それぞれ正しい関数を呼び出している
- [ ] checkReady関数が動作し、確認結果が表示される
- [ ] checkContinue関数が動作し、確認結果が表示される
- [ ] checkAgree関数が動作し、確認結果が表示される
- [ ] confirmで確認ダイアログが表示される
- [ ] OKを押すと`true`が表示される
- [ ] キャンセルを押すと`false`が表示される
- [ ] console.logで値を確認できる

### デバッグのヒント

うまく動かない場合：

1. **コンソールを開く**
   - F12キーを押す
   - エラーメッセージを確認

2. **console.logで確認**
   ```javascript
   let ok = confirm("確認");
   console.log("ok:", ok);
   console.log("型:", typeof ok);
   ```

3. **よくある問題**
   - confirmの結果を変数に保存していない → エラー
   - `true`を`"true"`（文字列）と書いている → 型が違う
   - IDの綴りが間違っている → 何も表示されない
   - 関数名の綴りが間違っている → ボタンを押してもエラー

## ポイント

- `confirm("質問文")`で**ユーザーに確認を求める**ことができます
- confirmは**真偽値（boolean）**を返します
- OKを押すと**`true`**、キャンセルを押すと**`false`**
- `true`と`false`は**文字列や数値とは異なる型**です
- 真偽値を文字列と連結すると、**自動的に文字列に変換**されます
- **console.log**で結果を確認できます
- promptは**文字列**を返し、confirmは**真偽値**を返します

## できるようになったこと

このレッスンを終えると、以下のことができるようになります：

- [ ] confirmを使ってユーザーに確認を求められる
- [ ] confirmの戻り値（true/false）を理解できる
- [ ] 真偽値（boolean）とは何かを理解できる
- [ ] 真偽値と文字列の違いを理解できる
- [ ] confirmとconsole.logを組み合わせてデバッグできる
- [ ] confirmとDOM操作を組み合わせて画面に表示できる
- [ ] promptとconfirmの違いを理解できる
- [ ] 複数の確認を順番にできる

## まとめ

このレッスンでは、ユーザーに確認を求める方法を学びました。

**重要なポイント**：

1. **confirmの基本**
   ```javascript
   let ok = confirm("準備OK？");
   ```
   - confirmでユーザーに確認できる
   - OKまたはキャンセルを選んでもらう

2. **confirmの戻り値**
   - OKボタン → `true`
   - キャンセルボタン → `false`

3. **真偽値（boolean）**
   - `true`と`false`は真偽値
   - 文字列や数値とは異なる型
   - `typeof ok` → `"boolean"`

4. **console.logとの組み合わせ**
   ```javascript
   let ok = confirm("準備OK？");
   console.log(ok);  // true または false
   ```
   - 確認結果を表示できる
   - デバッグに便利

5. **promptとconfirmの違い**
   ```javascript
   let name = prompt("名前は？");  // 文字列を返す
   let ok = confirm("準備OK？");   // 真偽値を返す
   ```
   - promptは入力用、confirmは確認用
   - 戻り値の型が違う

6. **真偽値の表示**
   ```javascript
   let ok = true;
   console.log("結果: " + ok);  // "結果: true"
   ```
   - 文字列と連結すると自動変換される

7. **DOM操作との組み合わせ**
   ```javascript
   let ok = confirm("準備OK？");
   const elem = document.getElementById("result");
   elem.textContent = "結果: " + ok;
   ```
   - 確認結果を画面に表示できる

**次のステップ**：

次のレッスンでは、**if文**を学びます。confirmで取得した真偽値を使って、「OKの場合はこの処理、キャンセルの場合は別の処理」というように、**処理を分岐**させる方法を学びましょう。
