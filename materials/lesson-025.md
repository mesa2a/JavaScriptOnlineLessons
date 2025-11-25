# Lesson 025: promptの基本

このレッスンでは、ユーザーから入力を受け取る方法を学びます。

## なぜ重要なのか

**身近な例**：
- **Google**：検索ワードを入力 → 検索結果を表示
- **Twitter**：ツイート内容を入力 → 投稿される
- **Amazon**：商品名を入力 → 商品が検索される
- **YouTube**：動画タイトルを入力 → 動画が検索される
- **Gmail**：メール本文を入力 → メールが送信される

これらすべてに共通するのは、**ユーザーからの入力を受け取って処理する**ということです。

**これまでとの違い**：
- **これまで**：ボタンをクリック → 決められた動作をする（一方通行）
- **今回から**：ユーザーが入力 → 入力内容に応じた動作をする（双方向の対話）

## promptとは

`prompt`は、ユーザーに**質問をして、答えを入力してもらう**ための機能です。

### 基本的な使い方

```javascript
let name = prompt("名前は？");
```

このコードを実行すると、**ブラウザに入力ボックスが表示**されます。

### promptの見た目

```
┌────────────────────────────────┐
│  名前は？                       │
│                                │
│  [          入力欄          ]  │
│                                │
│         [OK]    [キャンセル]    │
└────────────────────────────────┘
```

### promptの構文

```javascript
let 変数名 = prompt("質問文");
```

**各部分の意味**：
- `prompt` - 入力ダイアログを表示する関数
- `"質問文"` - ユーザーに表示する質問（文字列）
- `変数名` - 入力された答えを保存する変数

## promptの動作

### 動作の流れ（6ステップ）

```
ステップ1: prompt("名前は？") が実行される
         ↓
ステップ2: プログラムが一時停止する
         ↓
ステップ3: ブラウザに入力ボックスが表示される
         ↓
ステップ4: ユーザーが文字を入力してOKボタンを押す
         ↓
ステップ5: 入力された文字が変数に保存される
         ↓
ステップ6: プログラムの続きが実行される
```

**重要**：`prompt`が表示されている間、**プログラムは一時停止**します。

### 例：名前を聞く

```javascript
let name = prompt("あなたの名前は？");
console.log(name);
```

**実行の流れ**：

```
【1】prompt("あなたの名前は？") が実行される
     ↓
【2】入力ダイアログが表示される
     ↓
     ユーザーが「太郎」と入力
     ↓
     OKボタンをクリック
     ↓
【3】name = "太郎" になる
     ↓
【4】console.log(name) が実行される
     ↓
     コンソールに「太郎」と表示される
```

## promptの戻り値

`prompt`は、ユーザーが入力した**文字列を返します**。

### 戻り値の種類

| ユーザーの操作 | 戻り値 | 型 | 説明 |
|--------------|-------|---|------|
| 「太郎」と入力してOK | `"太郎"` | 文字列 | 入力した文字 |
| 何も入力せずOK | `""` | 空文字列 | 空の文字列 |
| キャンセルをクリック | `null` | null | 何もない |

### 重要なポイント

1. **promptは常に文字列を返す**
   ```javascript
   let name = prompt("名前は？");  // ユーザーが「太郎」と入力
   console.log(name);  // "太郎"（文字列）
   console.log(typeof name);  // "string"
   ```

2. **空文字列とnullは違う**
   ```javascript
   // 何も入力せずOKを押した場合
   let answer = "";  // 空文字列（文字列だが、中身が空）

   // キャンセルを押した場合
   let answer = null;  // null（入力をキャンセルした）
   ```

### nullとは

**null**：「何もない」ことを表す特別な値

```javascript
// 入力した場合
let answer = "こんにちは";  // 文字列

// キャンセルした場合
let answer = null;  // null（何もない）
```

## 文字列の連結

`+`を使って、**文字列をつなげる**ことができます。

### 基本的な連結

```javascript
let first = "こんにちは";
let second = "世界";
let result = first + second;
console.log(result);  // "こんにちは世界"
```

**何が起こっているか**：

```
first     = "こんにちは"
second    = "世界"
          ↓
first + second = "こんにちは" + "世界" = "こんにちは世界"
```

### 変数と文字列を組み合わせる

```javascript
let name = "太郎";
let greeting = "こんにちは、" + name + "さん";
console.log(greeting);  // "こんにちは、太郎さん"
```

**動作の流れ**：

```
ステップ1: "こんにちは、" + name + "さん"
         ↓
ステップ2: "こんにちは、" + "太郎" + "さん"
         ↓
ステップ3: "こんにちは、太郎" + "さん"
         ↓
ステップ4: "こんにちは、太郎さん"
```

**順番に左から結合**されていきます。

### promptと連結を組み合わせる

```javascript
let city = prompt("住んでいる都市は？");
alert(city + "に住んでいるんですね");
```

**実行例**：

```
ユーザーが「東京」と入力
↓
city = "東京"
↓
city + "に住んでいるんですね"
= "東京" + "に住んでいるんですね"
= "東京に住んでいるんですね"
↓
alert("東京に住んでいるんですね")
```

## promptとalertの組み合わせ

`prompt`で入力を受け取り、`alert`で結果を表示できます。

### 基本パターン

```javascript
let name = prompt("名前は？");
alert("こんにちは" + name);
```

**動作の流れ**：

```
【1】prompt("名前は？") が表示される
     ユーザーが「花子」と入力
     ↓
【2】name = "花子" になる
     ↓
【3】alert("こんにちは" + "花子") が実行される
     ↓
【4】「こんにちは花子」と表示される
```

### 注意：文字列の連結を忘れない

**❌ 間違った例**：
```javascript
let name = prompt("名前は？");
alert("こんにちは" name);  // エラー！+が必要
```

**エラーメッセージ**：`Uncaught SyntaxError: Unexpected identifier`

**✅ 正しい例**：
```javascript
let name = prompt("名前は？");
alert("こんにちは" + name);  // +で連結
```

## console.logとの組み合わせ

`prompt`で入力を受け取り、`console.log`でコンソールに表示できます。

### 基本的な例

```javascript
let name = prompt("名前は？");
console.log(name);
```

**実行例**：

```
ユーザーが「太郎」と入力
↓
name = "太郎"
↓
console.log(name)
↓
コンソールに「太郎」と表示される
```

### 複数の入力を確認

```javascript
let name = prompt("名前は？");
console.log("名前:", name);

let age = prompt("年齢は？");
console.log("年齢:", age);

let hobby = prompt("趣味は？");
console.log("趣味:", hobby);
```

**コンソールの表示例**：

```
名前: 太郎
年齢: 25
趣味: 読書
```

### デバッグに便利

```javascript
let name = prompt("名前は？");
console.log("入力された値:", name);  // デバッグ
console.log("型:", typeof name);  // "string"
```

これで、入力された値の**内容**と**型**を確認できます。

## 3つの質問をする

複数の`prompt`を使って、**複数の質問**をすることができます。

### 基本的な例

```javascript
let name = prompt("名前は？");
let age = prompt("年齢は？");
let hobby = prompt("趣味は？");

console.log(name);
console.log(age);
console.log(hobby);
```

**実行の流れ**：

```
【1】prompt("名前は？") が表示される
     ユーザーが「太郎」と入力
     ↓
【2】prompt("年齢は？") が表示される
     ユーザーが「25」と入力
     ↓
【3】prompt("趣味は？") が表示される
     ユーザーが「読書」と入力
     ↓
【4】コンソールに表示される
     太郎
     25
     読書
```

**重要**：promptは**1つずつ順番に**表示されます。

### alertと組み合わせる

```javascript
let name = prompt("名前は？");
let age = prompt("年齢は？");
let hobby = prompt("趣味は？");

alert(name + "さんは" + age + "歳です。趣味は" + hobby + "です。");
```

**実行例**：

```
ユーザーが「太郎」「25」「読書」と入力
↓
name = "太郎"
age = "25"
hobby = "読書"
↓
alert("太郎さんは25歳です。趣味は読書です。")
```

### 改行を使った見やすい表示

```javascript
let name = prompt("名前は？");
let age = prompt("年齢は？");
let hobby = prompt("趣味は？");

alert("入力内容\n\n" +
      "名前: " + name + "\n" +
      "年齢: " + age + "\n" +
      "趣味: " + hobby);
```

**`\n`の意味**：改行（新しい行に移る）

**表示例**：

```
入力内容

名前: 太郎
年齢: 25
趣味: 読書
```

## promptとDOM操作の組み合わせ

`prompt`で入力を受け取り、その内容を**画面に表示**できます。

### 基本的な例

**HTML**：
```html
<p id="message"></p>
<button onclick="askName()">名前を聞く</button>
```

**JavaScript**：
```javascript
function askName() {
  let name = prompt("あなたの名前は？");
  const elem = document.getElementById("message");
  elem.textContent = "こんにちは、" + name + "さん";
}
```

**動作の流れ（8ステップ）**：

```
ステップ1: ボタンをクリック
         ↓
ステップ2: askName() 関数が実行される
         ↓
ステップ3: prompt("あなたの名前は？") が表示される
         ↓
ステップ4: ユーザーが「花子」と入力してOK
         ↓
ステップ5: name = "花子" になる
         ↓
ステップ6: id="message" の要素を取得
         ↓
ステップ7: textContent = "こんにちは、花子さん" に設定
         ↓
ステップ8: 画面に「こんにちは、花子さん」と表示される
```

### 3つの質問と画面表示

**HTML**：
```html
<p id="profile"></p>
<button onclick="introduce()">自己紹介</button>
```

**JavaScript**：
```javascript
function introduce() {
  let name = prompt("名前は？");
  let age = prompt("年齢は？");
  let hobby = prompt("趣味は？");

  const elem = document.getElementById("profile");
  elem.textContent = name + "さんは" + age + "歳です。趣味は" + hobby + "です。";
}
```

**実行例**：

```
ユーザーが「太郎」「25」「読書」と入力
↓
name = "太郎"
age = "25"
hobby = "読書"
↓
画面に「太郎さんは25歳です。趣味は読書です。」と表示される
```

## よくある間違いと解決方法

### ❌ 間違い1：promptの結果を保存し忘れる

```javascript
prompt("名前は？");
console.log(name);  // エラー！
```

**エラーメッセージ**：`Uncaught ReferenceError: name is not defined`

**何が問題か**：
- promptの結果を変数に保存していない
- 変数`name`が存在しない

**解決方法**：
```javascript
let name = prompt("名前は？");  // 変数に保存
console.log(name);
```

### ❌ 間違い2：promptに括弧()を付け忘れる

```javascript
let name = prompt;
console.log(name);
```

**何が起こるのか**：
- `name`にprompt関数そのものが入る
- コンソールに関数の内容が表示される

**解決方法**：
```javascript
let name = prompt("名前は？");  // 括弧を付ける
console.log(name);
```

### ❌ 間違い3：質問文を忘れる

```javascript
let name = prompt();  // 動作はするが不親切
```

**何が起こるのか**：
- 入力ダイアログは表示される
- しかし、何を入力すればいいか分からない

**解決方法**：
```javascript
let name = prompt("名前は？");  // 質問文を付ける
```

### ❌ 間違い4：文字列の連結で+を忘れる

```javascript
let name = "太郎";
let greeting = "こんにちは" name "さん";  // エラー！
```

**エラーメッセージ**：`Uncaught SyntaxError: Unexpected identifier`

**解決方法**：
```javascript
let name = "太郎";
let greeting = "こんにちは" + name + "さん";  // +で連結
```

### ❌ 間違い5：promptをHTMLに直接書いている

```html
<!-- ❌ 間違い -->
<button onclick="prompt('名前は？')">クリック</button>
```

**何が問題か**：
- promptは実行されるが、結果が保存されない
- 入力した内容を使えない

**解決方法**：
```html
<!-- ✅ 正しい -->
<button onclick="askName()">クリック</button>
```

```javascript
function askName() {
  let name = prompt("名前は？");
  // nameを使った処理...
}
```

### ❌ 間違い6：nullチェックを忘れる

```javascript
let name = prompt("名前は？");
const elem = document.getElementById("message");
elem.textContent = "こんにちは、" + name + "さん";
// キャンセルを押すと「こんにちは、nullさん」になる
```

**問題点**：
- ユーザーがキャンセルを押すと`name`が`null`になる
- 「こんにちは、nullさん」と表示されてしまう

**解決方法**：
```javascript
let name = prompt("名前は？");

if (name !== null) {
  const elem = document.getElementById("message");
  elem.textContent = "こんにちは、" + name + "さん";
} else {
  alert("入力がキャンセルされました");
}
```

### ❌ 間違い7：連結の順番を間違える

```javascript
let name = "太郎";
let message = name "さん、こんにちは";  // エラー！
```

**エラーメッセージ**：`Uncaught SyntaxError: Unexpected string`

**解決方法**：
```javascript
let name = "太郎";
let message = name + "さん、こんにちは";  // +を付ける
```

## 実用例

### 例1：簡単な挨拶プログラム

**HTML**：
```html
<p id="greeting"></p>
<button onclick="greet()">挨拶する</button>
```

**JavaScript**：
```javascript
function greet() {
  let name = prompt("お名前を教えてください");
  const elem = document.getElementById("greeting");
  elem.textContent = "こんにちは、" + name + "さん！";
}
```

**動作**：
1. ボタンをクリック
2. 名前を入力
3. 「こんにちは、○○さん！」と表示される

### 例2：自己紹介プログラム

**HTML**：
```html
<p id="profile"></p>
<button onclick="introduce()">自己紹介する</button>
```

**JavaScript**：
```javascript
function introduce() {
  let name = prompt("名前は？");
  let age = prompt("年齢は？");
  let hobby = prompt("趣味は？");

  const elem = document.getElementById("profile");
  elem.textContent = name + "さんは" + age + "歳です。趣味は" + hobby + "です。";
}
```

**動作**：
1. ボタンをクリック
2. 3つの質問に答える
3. 自己紹介文が表示される

### 例3：お問い合わせフォーム

**JavaScript**：
```javascript
function submitForm() {
  let name = prompt("お名前を入力してください");
  let email = prompt("メールアドレスを入力してください");
  let message = prompt("お問い合わせ内容を入力してください");

  alert("送信しました！\n\n" +
        "名前: " + name + "\n" +
        "メール: " + email + "\n" +
        "内容: " + message);
}
```

**動作**：
1. 名前、メール、内容を入力
2. 確認メッセージが表示される

### 例4：好きなものを聞く

**JavaScript**：
```javascript
function askFavorites() {
  let food = prompt("好きな食べ物は？");
  let color = prompt("好きな色は？");
  let animal = prompt("好きな動物は？");

  alert("あなたの好きなもの\n\n" +
        "食べ物: " + food + "\n" +
        "色: " + color + "\n" +
        "動物: " + animal);
}
```

## 練習問題

次の要件を満たすページを作成してください。

### 要件

1. `id="result1"`の要素を用意する
2. `id="result2"`の要素を用意する
3. `id="result3"`の要素を用意する
4. `askQuestion1`関数を定義し、次の処理を行う：
   - `prompt`で「好きな食べ物は？」と質問する
   - 入力された答えを変数に保存する
   - `id="result1"`の要素の`textContent`に「好きな食べ物: 」+答えを設定する
5. `askQuestion2`関数を定義し、次の処理を行う：
   - `prompt`で「好きな色は？」と質問する
   - 入力された答えを変数に保存する
   - `id="result2"`の要素の`textContent`に「好きな色: 」+答えを設定する
6. `askQuestion3`関数を定義し、次の処理を行う：
   - `prompt`で「好きな動物は？」と質問する
   - 入力された答えを変数に保存する
   - `id="result3"`の要素の`textContent`に「好きな動物: 」+答えを設定する
7. 3つのボタンを作成し、それぞれクリックすると対応する関数が実行されるようにする

### ヒント

<details>
<summary>ヒント1：HTMLの構造</summary>

```html
<p id="result1"></p>
<p id="result2"></p>
<p id="result3"></p>
<button onclick="askQuestion1()">質問1</button>
<button onclick="askQuestion2()">質問2</button>
<button onclick="askQuestion3()">質問3</button>
```
</details>

<details>
<summary>ヒント2：askQuestion1関数の骨組み</summary>

```javascript
function askQuestion1() {
  // 1. promptで質問する
  let answer = prompt(/* ここに質問を書く */);

  // 2. 画面に表示する
  const elem = document.getElementById(/* ここにIDを書く */);
  elem.textContent = /* ここに表示する内容を書く */;
}
```
</details>

<details>
<summary>ヒント3：promptの使い方</summary>

```javascript
let answer = prompt("質問文");
```

- promptは文字列を返す
- 入力された内容が変数`answer`に保存される
</details>

<details>
<summary>ヒント4：文字列の連結</summary>

```javascript
let food = "カレー";
let result = "好きな食べ物: " + food;
// "好きな食べ物: カレー"
```

- `+`で文字列をつなげる
- 変数と文字列を組み合わせられる
</details>

<details>
<summary>ヒント5：完全な例（askQuestion1関数）</summary>

```javascript
function askQuestion1() {
  let answer = prompt("好きな食べ物は？");
  const elem = document.getElementById("result1");
  elem.textContent = "好きな食べ物: " + answer;
}
```
</details>

<details>
<summary>ヒント6：動作確認の方法</summary>

1. ブラウザで`index.html`を開く
2. 「質問1」ボタンをクリック
3. 入力ダイアログが表示される
4. 「カレー」と入力してOK
5. 「好きな食べ物: カレー」と表示される
</details>

<details>
<summary>ヒント7：デバッグ方法</summary>

```javascript
function askQuestion1() {
  let answer = prompt("好きな食べ物は？");
  console.log("入力された値:", answer);  // デバッグ

  const elem = document.getElementById("result1");
  elem.textContent = "好きな食べ物: " + answer;
}
```

- `console.log`で値を確認
- F12キーでコンソールを開く
</details>

### チェックリスト

完成したら、以下を確認してください：

- [ ] 3つの`<p>`要素にそれぞれ正しいIDが設定されている
- [ ] 3つのボタンがあり、それぞれ正しい関数を呼び出している
- [ ] askQuestion1関数が動作し、好きな食べ物が表示される
- [ ] askQuestion2関数が動作し、好きな色が表示される
- [ ] askQuestion3関数が動作し、好きな動物が表示される
- [ ] promptで入力された値が変数に保存されている
- [ ] 文字列の連結が正しく行われている
- [ ] console.logで値を確認できる

### デバッグのヒント

うまく動かない場合：

1. **コンソールを開く**
   - F12キーを押す
   - エラーメッセージを確認

2. **console.logで確認**
   ```javascript
   let answer = prompt("質問");
   console.log("answer:", answer);
   ```

3. **よくある問題**
   - promptの結果を変数に保存していない → エラー
   - `+`を忘れている → エラー
   - IDの綴りが間違っている → 何も表示されない
   - 関数名の綴りが間違っている → ボタンを押してもエラー

## ポイント

- `prompt("質問文")`で**ユーザーから入力を受け取る**ことができます
- promptは**常に文字列**を返します
- 入力された内容は**変数に保存**して使います
- `+`を使って**文字列を連結**できます
- **複数の質問**をするには、promptを複数回実行します
- promptとDOM操作を組み合わせて、**画面に表示**できます
- **console.log**でデバッグできます

## できるようになったこと

このレッスンを終えると、以下のことができるようになります：

- [ ] promptを使ってユーザーから入力を受け取れる
- [ ] 入力された内容を変数に保存できる
- [ ] promptの戻り値の種類を理解できる
- [ ] 文字列を連結できる
- [ ] promptとalertを組み合わせて対話できる
- [ ] promptとconsole.logを組み合わせてデバッグできる
- [ ] 3つの質問を順番にできる
- [ ] promptとDOM操作を組み合わせて画面に表示できる

## まとめ

このレッスンでは、ユーザーから入力を受け取る方法を学びました。

**重要なポイント**：

1. **promptの基本**
   ```javascript
   let name = prompt("名前は？");
   ```
   - promptでユーザーに質問できる
   - 入力された内容は変数に保存される

2. **promptの戻り値**
   - 文字を入力してOK → 入力した文字列
   - 何も入力せずOK → 空文字列（`""`）
   - キャンセル → `null`

3. **文字列の連結**
   ```javascript
   let greeting = "こんにちは" + name + "さん";
   ```
   - `+`で文字列をつなげる
   - 変数と文字列を組み合わせられる

4. **console.logとの組み合わせ**
   ```javascript
   let name = prompt("名前は？");
   console.log(name);
   ```
   - 入力内容を確認できる
   - デバッグに便利

5. **alertとの組み合わせ**
   ```javascript
   let name = prompt("名前は？");
   alert("こんにちは" + name);
   ```
   - 入力内容を使ってメッセージを表示できる

6. **3つの質問をする**
   ```javascript
   let name = prompt("名前は？");
   let age = prompt("年齢は？");
   let hobby = prompt("趣味は？");
   ```
   - 複数のpromptを順番に実行できる
   - 1つずつ順番に表示される

7. **promptとDOM操作の組み合わせ**
   ```javascript
   let name = prompt("名前は？");
   const elem = document.getElementById("message");
   elem.textContent = "こんにちは、" + name + "さん";
   ```
   - 入力内容を画面に表示できる

**次のステップ**：

次のレッスンでは、**数値の入力**を学びます。promptは常に文字列を返すため、計算をするには数値に変換する必要があります。`Number()`関数を使った変換方法を学びましょう。
