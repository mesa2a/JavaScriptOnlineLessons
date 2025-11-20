# Lesson 030: 複数の入力

このレッスンでは、複数のinput要素から値を取得して組み合わせる方法を学びます。

## 複数のinput要素

これまでのレッスンでは、1つまたは2つのinput要素を使いました。実際のフォームでは、複数の入力欄を組み合わせて使うことが多くあります。

## 名前と年齢の入力

例として、名前と年齢を入力してプロフィールを作成してみましょう。

HTML:

```html
<input id="name" type="text" placeholder="名前">
<input id="age" type="text" placeholder="年齢">
<button onclick="showProfile()">表示</button>
<p id="profile"></p>
```

JavaScript:

```javascript
function showProfile() {
  const nameElem = document.getElementById("name");
  const ageElem = document.getElementById("age");

  const name = nameElem.value;
  const age = ageElem.value;

  const profile = document.getElementById("profile");
  profile.textContent = name + "さんは" + age + "歳です";
}
```

## データの組み合わせ

複数の入力を組み合わせることで、より複雑な情報を表示できます。

### 例1: 自己紹介文を作る

HTML:

```html
<input id="name" type="text" placeholder="名前">
<input id="age" type="text" placeholder="年齢">
<input id="hobby" type="text" placeholder="趣味">
<button onclick="introduce()">自己紹介</button>
<p id="introduction"></p>
```

JavaScript:

```javascript
function introduce() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const hobby = document.getElementById("hobby").value;

  const intro = document.getElementById("introduction");
  intro.textContent = "はじめまして、" + name + "です。" +
                      age + "歳で、趣味は" + hobby + "です。";
}
```

### 例2: 住所を組み合わせる

HTML:

```html
<input id="prefecture" type="text" placeholder="都道府県">
<input id="city" type="text" placeholder="市区町村">
<input id="address" type="text" placeholder="番地">
<button onclick="showAddress()">住所表示</button>
<p id="result"></p>
```

JavaScript:

```javascript
function showAddress() {
  const prefecture = document.getElementById("prefecture").value;
  const city = document.getElementById("city").value;
  const address = document.getElementById("address").value;

  const result = document.getElementById("result");
  result.textContent = prefecture + city + address;
}
```

## 複数要素の管理のコツ

### 1. わかりやすいID名をつける

```html
<input id="firstName" type="text">
<input id="lastName" type="text">
```

IDは何の入力欄なのかがわかるように命名します。

### 2. 変数名もわかりやすくする

```javascript
const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;
```

### 3. 順序を意識する

複数の値を組み合わせるときは、順序に気をつけます。

```javascript
// 姓→名の順
result.textContent = lastName + " " + firstName;

// 名→姓の順
result.textContent = firstName + " " + lastName;
```

## リアルタイムで組み合わせる

`oninput`イベントを使えば、入力するたびに結果を更新できます。

HTML:

```html
<input id="firstName" type="text" oninput="updateName()" placeholder="名">
<input id="lastName" type="text" oninput="updateName()" placeholder="姓">
<p id="fullName"></p>
```

JavaScript:

```javascript
function updateName() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;

  const fullName = document.getElementById("fullName");
  fullName.textContent = lastName + " " + firstName;
}
```

どちらのinput要素でも、入力するたびに`updateName`関数が実行され、フルネームが更新されます。

## 空の入力への対応

ユーザーがすべての入力欄に入力するとは限りません。空の値も考慮する必要があります。

```javascript
function showProfile() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  const profile = document.getElementById("profile");

  // 両方とも入力されている場合
  profile.textContent = name + "さんは" + age + "歳です";
}
```

注: 空の値の判定はif文を使いますが、まだ学習していないため、この段階では入力されていることを前提とします。

## 練習問題

次の要件を満たすページを作成してください。

1. id="firstName"のinput要素を用意する
2. id="lastName"のinput要素を用意する
3. id="age"のinput要素を用意する
4. id="city"のinput要素を用意する
5. id="result1"の要素を用意する
6. id="result2"の要素を用意する
7. showFullName関数を定義し、次の処理を行う
   - id="firstName"とid="lastName"の値を取得する
   - id="result1"の要素のtextContentに姓+スペース+名を設定する
8. showProfile関数を定義し、次の処理を行う
   - id="firstName"、id="lastName"、id="age"、id="city"の値を取得する
   - id="result2"の要素のtextContentに「姓 名さんは○○歳で、○○市に住んでいます」の形式で設定する
9. 2つのボタンを作成し、それぞれクリックすると対応する関数が実行されるようにする

## ポイント

- 複数のinput要素から値を取得できます
- 値を組み合わせて表示できます
- わかりやすいID名と変数名を使います
- `oninput`で複数の入力をリアルタイムに組み合わせられます
- 文字列の連結順序に気をつけます

## まとめ

このレッスンでは、複数の入力を組み合わせる方法を学びました。

- 複数のinput要素から値を取得します
- `document.getElementById().value`を複数回使います
- 値を組み合わせて新しい情報を作ります
- リアルタイムで組み合わせることもできます

これにより、より実用的なフォームを作ることができます。
