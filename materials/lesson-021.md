# Lesson 021: カウンターを作る

このレッスンでは、クリックするたびに数が増えていくカウンターアプリケーションを作成します。

## 状態を保持する

これまでのレッスンでは、ボタンをクリックしたときに文字を変えたり、色を変えたりしました。しかし、そうした変化は一度きりでした。

カウンターを作るには、「今何回クリックされたか」という情報を覚えておく必要があります。このような情報のことを「状態」と呼びます。

JavaScriptで状態を保持するには、変数を使います。

## 変数の種類

JavaScriptには変数を宣言する方法が主に2つあります。

```javascript
let count = 0;
const name = "太郎";
```

`let`は値を変更できる変数、`const`は値を変更できない変数です。

カウンターでは数を増やしていく必要があるため、`let`を使います。

## カウンターの作り方

カウンターは次のような流れで作ります。

1. 数を保持する変数を用意する
2. ボタンがクリックされたら数を1増やす
3. 増やした数を画面に表示する

### 1. 数を保持する変数を用意する

まず、カウントする数を保持する変数を用意します。

```javascript
let count = 0;
```

最初は0から始めます。

### 2. ボタンがクリックされたら数を1増やす

ボタンがクリックされたときに実行される関数の中で、変数の値を1増やします。

```javascript
function addCount() {
  count = count + 1;
}
```

`count = count + 1`は、「countに、今のcountの値に1を足したものを代入する」という意味です。

例えば、countが3のとき、`count = count + 1`を実行すると、countは4になります。

この書き方は頻繁に使われるため、短く書く方法もあります。

```javascript
function addCount() {
  count++;
}
```

`count++`は`count = count + 1`と同じ意味です。

### 3. 増やした数を画面に表示する

数を増やしたら、それを画面に表示します。

```javascript
function addCount() {
  count++;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

`elem.textContent = count`で、変数countの値をテキストとして表示できます。

## 完成したコード例

HTML:

```html
<p id="counter">0</p>
<button onclick="addCount()">+1</button>
```

JavaScript:

```javascript
let count = 0;

function addCount() {
  count++;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

このコードでは、ボタンをクリックするたびに画面の数字が1ずつ増えていきます。

## グローバル変数

`let count = 0`のように、関数の外で宣言された変数を「グローバル変数」と呼びます。

グローバル変数は、どの関数からでもアクセスできます。そのため、`addCount`関数の中でcountの値を変更できます。

例:

```javascript
let count = 0;  // グローバル変数

function addCount() {
  count++;  // グローバル変数countにアクセス
}

function showCount() {
  alert(count);  // 同じグローバル変数countにアクセス
}
```

両方の関数が同じcountという変数を使っています。

## リセットボタンを追加する

カウンターを0に戻すリセットボタンも作ってみましょう。

HTML:

```html
<p id="counter">0</p>
<button onclick="addCount()">+1</button>
<button onclick="resetCount()">リセット</button>
```

JavaScript:

```javascript
let count = 0;

function addCount() {
  count++;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}

function resetCount() {
  count = 0;
  const elem = document.getElementById("counter");
  elem.textContent = count;
}
```

`resetCount`関数では、countを0に戻してから、画面の表示も0に更新します。

## 練習問題

次の要件を満たすカウンターアプリケーションを作成してください。

1. id="counter"の要素を用意し、初期値として「0」を表示する
2. let count = 0という変数を定義する
3. addCount関数を定義し、次の処理を行う
   - countを1増やす
   - id="counter"の要素のtextContentをcountの値に更新する
4. resetCount関数を定義し、次の処理を行う
   - countを0に戻す
   - id="counter"の要素のtextContentを0に更新する
5. 「+1」というテキストのボタンを作り、クリックするとaddCount関数が実行されるようにする
6. 「リセット」というテキストのボタンを作り、クリックするとresetCount関数が実行されるようにする

## ポイント

- `let`は値を変更できる変数を宣言するときに使います
- `count++`は`count = count + 1`と同じ意味です
- グローバル変数は関数の外で宣言され、どの関数からでもアクセスできます
- 変数の値を`textContent`で表示できます
- 複数のボタンで同じ変数を操作できます

## まとめ

このレッスンでは、変数を使って状態を保持する方法を学びました。

- `let`で変更可能な変数を宣言する
- グローバル変数はどの関数からでもアクセスできる
- `count++`で変数の値を1増やせる
- 変数の値を画面に表示できる

これにより、ユーザーの操作に応じて値が変化していくアプリケーションを作れるようになりました。
