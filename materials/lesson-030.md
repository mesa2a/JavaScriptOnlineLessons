# Lesson 030: 複数の入力

このレッスンでは、複数のinput要素から値を取得して組み合わせる方法を学びます。

## なぜ重要なのか

複数の入力を組み合わせる技術は、実際のウェブサイトで頻繁に使われています。

| サービス | 具体例 | 使用される入力項目 |
|---------|--------|------------------|
| **Twitter** | アカウント作成 | 名前、メールアドレス、パスワード、生年月日 |
| **Amazon** | 配送先入力 | 郵便番号、都道府県、市区町村、番地、建物名 |
| **Google** | アカウント作成 | 姓、名、ユーザー名、パスワード、電話番号 |
| **メルカリ** | 商品出品 | 商品名、価格、説明、カテゴリー、状態 |
| **ホットペッパー** | 予約フォーム | 名前、電話番号、人数、日時、要望 |

これらはすべて複数の入力欄から値を取得し、組み合わせて処理しています。

## 基本概念の説明

### 複数input要素の処理とは

複数のinput要素からそれぞれ値を取得し、組み合わせて新しい情報を作成する仕組みです。

```
[入力欄1: 名] ────┐
                  │
[入力欄2: 姓] ────┼──→ JavaScript ──→ [組み合わせた結果]
                  │      処理               "山田 太郎"
[入力欄3: 年齢] ──┘
```

### 動作の流れ

```
1. ユーザーが名前を入力
   input[id="firstName"] ← "太郎"
            ↓
2. ユーザーが姓を入力
   input[id="lastName"] ← "山田"
            ↓
3. ボタンをクリック
   button[onclick="showName()"]
            ↓
4. 関数が実行される
   function showName() 開始
            ↓
5. それぞれの値を取得
   firstName = "太郎"
   lastName = "山田"
            ↓
6. 値を組み合わせる
   fullName = lastName + " " + firstName
   fullName = "山田 太郎"
            ↓
7. 結果を表示
   result.textContent = "山田 太郎"
            ↓
8. 画面に表示される
   「山田 太郎」
```

## 複数のinput要素の基本

### 2つの入力を組み合わせる

名前と年齢を組み合わせてプロフィールを作成します。

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

**処理の詳細:**

1. `nameElem`に名前のinput要素を格納
2. `ageElem`に年齢のinput要素を格納
3. `name`に名前の値を格納
4. `age`に年齢の値を格納
5. 2つの値を組み合わせて表示

### 3つ以上の入力を組み合わせる

自己紹介文を作成する例です。

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

**短縮記法:**

要素の取得と値の取得を1行で書くこともできます。

```javascript
// 2段階で取得
const nameElem = document.getElementById("name");
const name = nameElem.value;

// 1行で取得
const name = document.getElementById("name").value;
```

## 入力要素の管理方法

### わかりやすいID名をつける

| 良い例 ❌ | 悪い例 ❌ | 理由 |
|----------|----------|------|
| `id="firstName"` | `id="input1"` | 何の入力か明確 |
| `id="lastName"` | `id="a"` | 意味がわかる |
| `id="email"` | `id="x"` | 用途が明確 |
| `id="phoneNumber"` | `id="text2"` | 管理しやすい |

### 変数名も対応させる

```javascript
// ✅ 良い例：IDと変数名が対応
const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;

// ❌ 悪い例：IDと変数名が不一致
const a = document.getElementById("firstName").value;
const b = document.getElementById("lastName").value;
```

### 値の組み合わせ順序

組み合わせる順序によって結果が変わります。

```javascript
const firstName = "太郎";
const lastName = "山田";

// 姓→名の順
result.textContent = lastName + " " + firstName;
// → "山田 太郎"

// 名→姓の順
result.textContent = firstName + " " + lastName;
// → "太郎 山田"
```

## リアルタイムで組み合わせる

`oninput`イベントを使えば、入力するたびに結果が更新されます。

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

**動作:**

```
ユーザーが「姓」に「山」と入力
  ↓
updateName()が実行される
  ↓
結果: "山 "

ユーザーが「姓」に「田」を追加（「山田」）
  ↓
updateName()が実行される
  ↓
結果: "山田 "

ユーザーが「名」に「太郎」と入力
  ↓
updateName()が実行される（入力のたびに）
  ↓
結果: "山田 太郎"
```

どちらのinput要素でも、入力するたびに同じ関数が実行されます。

## よくある間違いと解決方法

### 間違い1: IDが重複している

```javascript
// ❌ 間違い
<input id="name" type="text">
<input id="name" type="text">  // 同じIDを使っている
<button onclick="show()">表示</button>

function show() {
  const name = document.getElementById("name").value;
  // 最初の要素しか取得できない
}
```

**何が問題か:**
IDは1ページに1つしか使えません。同じIDを複数使うと、最初の要素しか取得できません。

**解決方法:**
```javascript
// ✅ 正しい
<input id="firstName" type="text">
<input id="lastName" type="text">  // 別のIDを使う

function show() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
}
```

### 間違い2: 要素の取得忘れ

```javascript
// ❌ 間違い
function showProfile() {
  const name = document.getElementById("name").value;
  // ageの取得を忘れている

  const profile = document.getElementById("profile");
  profile.textContent = name + "さんは" + age + "歳です";
}
```

**エラーメッセージ:**
```
Uncaught ReferenceError: age is not defined
```

**何が問題か:**
`age`を取得していないのに使おうとしています。

**解決方法:**
```javascript
// ✅ 正しい
function showProfile() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;  // 追加

  const profile = document.getElementById("profile");
  profile.textContent = name + "さんは" + age + "歳です";
}
```

### 間違い3: 間違ったIDで取得

```javascript
// ❌ 間違い
<input id="firstName" type="text">
<input id="lastName" type="text">

function show() {
  const first = document.getElementById("name").value;  // 存在しないID
  const last = document.getElementById("lastName").value;
}
```

**エラーメッセージ:**
```
Uncaught TypeError: Cannot read properties of null (reading 'value')
```

**何が問題か:**
IDが"firstName"なのに"name"で取得しようとしています。

**解決方法:**
```javascript
// ✅ 正しい
function show() {
  const first = document.getElementById("firstName").value;  // 正しいID
  const last = document.getElementById("lastName").value;
}
```

### 間違い4: 連結の順序ミス

```javascript
// ❌ 間違い
function showProfile() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  const profile = document.getElementById("profile");
  profile.textContent = age + "歳です" + name + "さんは";
  // → "20歳です太郎さんは" （不自然）
}
```

**何が問題か:**
連結の順序が不自然で読みにくい文になっています。

**解決方法:**
```javascript
// ✅ 正しい
function showProfile() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  const profile = document.getElementById("profile");
  profile.textContent = name + "さんは" + age + "歳です";
  // → "太郎さんは20歳です" （自然）
}
```

### 間違い5: .valueの付け忘れ

```javascript
// ❌ 間違い
function show() {
  const nameElem = document.getElementById("name");
  const ageElem = document.getElementById("age");

  const profile = document.getElementById("profile");
  profile.textContent = nameElem + "さんは" + ageElem + "歳です";
  // → "[object HTMLInputElement]さんは[object HTMLInputElement]歳です"
}
```

**何が問題か:**
`.value`を付けずに要素自体を連結しています。

**解決方法:**
```javascript
// ✅ 正しい
function show() {
  const name = document.getElementById("name").value;  // .value追加
  const age = document.getElementById("age").value;    // .value追加

  const profile = document.getElementById("profile");
  profile.textContent = name + "さんは" + age + "歳です";
}
```

### 間違い6: 同じ関数名で複数定義

```javascript
// ❌ 間違い
function showResult() {
  const name = document.getElementById("name").value;
  // ...
}

function showResult() {  // 同じ名前で再定義
  const age = document.getElementById("age").value;
  // ...
}
// 後の定義が優先され、最初の関数は使えなくなる
```

**何が問題か:**
同じ名前の関数を2つ定義すると、後の定義で上書きされます。

**解決方法:**
```javascript
// ✅ 正しい
function showName() {
  const name = document.getElementById("name").value;
  // ...
}

function showAge() {  // 別の名前を使う
  const age = document.getElementById("age").value;
  // ...
}
```

## 実用例

### 例1: プロフィール表示

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>プロフィール入力</title>
</head>
<body>
  <h1>プロフィール作成</h1>

  <input id="name" type="text" placeholder="名前">
  <input id="age" type="text" placeholder="年齢">
  <button onclick="showProfile()">表示</button>

  <p id="result"></p>

  <script>
    function showProfile() {
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;

      const result = document.getElementById("result");
      result.textContent = name + "さんは" + age + "歳です";
    }
  </script>
</body>
</html>
```

**動作:**
- 名前と年齢を入力
- ボタンをクリック
- 「太郎さんは20歳です」のように表示

### 例2: 住所の組み合わせ

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>住所入力</title>
</head>
<body>
  <h1>住所入力フォーム</h1>

  <input id="prefecture" type="text" placeholder="都道府県">
  <input id="city" type="text" placeholder="市区町村">
  <input id="address" type="text" placeholder="番地">
  <button onclick="showAddress()">表示</button>

  <p id="result"></p>

  <script>
    function showAddress() {
      const prefecture = document.getElementById("prefecture").value;
      const city = document.getElementById("city").value;
      const address = document.getElementById("address").value;

      const result = document.getElementById("result");
      result.textContent = "住所: " + prefecture + city + address;
    }
  </script>
</body>
</html>
```

**動作:**
- 都道府県、市区町村、番地を入力
- ボタンをクリック
- 「住所: 東京都渋谷区神南1-2-3」のように表示

### 例3: リアルタイム自己紹介

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>自己紹介作成</title>
</head>
<body>
  <h1>自己紹介を作ろう</h1>

  <input id="name" type="text" oninput="updateIntro()" placeholder="名前">
  <input id="age" type="text" oninput="updateIntro()" placeholder="年齢">
  <input id="hobby" type="text" oninput="updateIntro()" placeholder="趣味">

  <h2>プレビュー:</h2>
  <p id="intro"></p>

  <script>
    function updateIntro() {
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const hobby = document.getElementById("hobby").value;

      const intro = document.getElementById("intro");
      intro.textContent = "はじめまして、" + name + "です。" +
                          age + "歳で、趣味は" + hobby + "です。";
    }
  </script>
</body>
</html>
```

**動作:**
- 入力するたびにリアルタイムで自己紹介文が更新される
- ボタン不要で即座に反映

### 例4: 氏名の入力（姓名分離）

HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>氏名入力</title>
</head>
<body>
  <h1>氏名を入力してください</h1>

  <label>姓: <input id="lastName" type="text" oninput="updateName()"></label>
  <label>名: <input id="firstName" type="text" oninput="updateName()"></label>

  <h2>確認:</h2>
  <p id="fullName"></p>

  <script>
    function updateName() {
      const lastName = document.getElementById("lastName").value;
      const firstName = document.getElementById("firstName").value;

      const fullName = document.getElementById("fullName");
      fullName.textContent = lastName + " " + firstName;
    }
  </script>
</body>
</html>
```

**動作:**
- 姓と名を別々に入力
- スペース区切りでフルネームが表示される
- リアルタイムで更新

## 空の入力への対応

ユーザーがすべての入力欄に入力するとは限りません。

```javascript
function showProfile() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  const profile = document.getElementById("profile");
  profile.textContent = name + "さんは" + age + "歳です";
}
```

**何も入力していない場合:**
- `name` → `""` (空文字列)
- `age` → `""` (空文字列)
- 結果: "さんは歳です" （不自然）

**注意:**

空の値の判定には`if`文を使いますが、まだ学習していないため、この段階では**すべての入力欄に値が入力されていることを前提**とします。

後のレッスンで条件分岐を学ぶと、次のような処理ができるようになります:

```javascript
// 今後学ぶ内容（参考）
if (name === "" || age === "") {
  result.textContent = "すべて入力してください";
} else {
  result.textContent = name + "さんは" + age + "歳です";
}
```

## 練習問題

次の要件を満たすページを作成してください。

**要件:**

1. id="firstName"のinput要素を用意する（placeholderは"名"）
2. id="lastName"のinput要素を用意する（placeholderは"姓"）
3. id="age"のinput要素を用意する（placeholderは"年齢"）
4. id="city"のinput要素を用意する（placeholderは"市区町村"）
5. id="result1"のp要素を用意する
6. id="result2"のp要素を用意する
7. showFullName関数を定義し、次の処理を行う:
   - id="firstName"とid="lastName"の値を取得する
   - id="result1"の要素のtextContentに「姓 名」の形式で設定する（例: "山田 太郎"）
8. showProfile関数を定義し、次の処理を行う:
   - id="firstName"、id="lastName"、id="age"、id="city"の値を取得する
   - id="result2"の要素のtextContentに「姓 名さんは○○歳で、○○市に住んでいます」の形式で設定する
9. 2つのボタンを作成する:
   - 1つ目: クリックするとshowFullName関数が実行される（テキスト: "氏名表示"）
   - 2つ目: クリックするとshowProfile関数が実行される（テキスト: "プロフィール表示"）

<details>
<summary>💡 ヒント1: HTML構造</summary>

4つのinput要素、2つのp要素、2つのbutton要素が必要です。

```html
<input id="firstName" type="text" placeholder="名">
<input id="lastName" type="text" placeholder="姓">
<!-- 他の要素も同様に -->
```
</details>

<details>
<summary>💡 ヒント2: showFullName関数</summary>

2つの値を取得して、スペースで連結します。

```javascript
function showFullName() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  // ...
}
```
</details>

<details>
<summary>💡 ヒント3: 値の連結順序</summary>

「姓 名」の順番で表示するには:

```javascript
const fullName = lastName + " " + firstName;
```
</details>

<details>
<summary>💡 ヒント4: showProfile関数</summary>

4つの値をすべて取得する必要があります。

```javascript
function showProfile() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  // ...
}
```
</details>

<details>
<summary>💡 ヒント5: プロフィール文の組み立て</summary>

複数の文字列を`+`で連結します。

```javascript
result.textContent = lastName + " " + firstName + "さんは" +
                     age + "歳で、" + city + "市に住んでいます";
```
</details>

<details>
<summary>💡 ヒント6: ボタンの設定</summary>

onclick属性で関数を指定します。

```html
<button onclick="showFullName()">氏名表示</button>
<button onclick="showProfile()">プロフィール表示</button>
```
</details>

<details>
<summary>💡 ヒント7: 完成例の構造</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>プロフィール入力</title>
</head>
<body>
  <h1>プロフィール入力フォーム</h1>

  <!-- 4つのinput要素 -->

  <!-- 2つのボタン -->

  <!-- 2つの結果表示用p要素 -->

  <script>
    function showFullName() {
      // 2つの値を取得して表示
    }

    function showProfile() {
      // 4つの値を取得して表示
    }
  </script>
</body>
</html>
```
</details>

### チェックリスト

実装後、次の項目を確認してください:

- [ ] 4つのinput要素がある
- [ ] それぞれのinput要素に正しいidが設定されている
- [ ] 2つの結果表示用p要素がある
- [ ] 2つのボタンがある
- [ ] showFullName関数が定義されている
- [ ] showProfile関数が定義されている
- [ ] 氏名表示ボタンをクリックすると「姓 名」が表示される
- [ ] プロフィール表示ボタンをクリックすると完全なプロフィールが表示される
- [ ] すべてのinput要素にplaceholderが設定されている

### デバッグのヒント

うまく動かない場合は、次を確認してください:

1. **console.logで値を確認:**
```javascript
function showFullName() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  console.log("firstName:", firstName);
  console.log("lastName:", lastName);
  // ...
}
```

2. **IDのスペルミスを確認:**
```javascript
// HTMLとJavaScriptでIDが一致しているか
<input id="firstName">  // HTML
document.getElementById("firstName")  // JavaScript
```

3. **textContentの設定を確認:**
```javascript
const result1 = document.getElementById("result1");
result1.textContent = lastName + " " + firstName;
console.log("表示内容:", result1.textContent);
```

## ポイント

- 複数のinput要素から値を取得できます
- `document.getElementById("id名").value`を繰り返し使います
- 値を`+`で連結して組み合わせます
- わかりやすいID名と変数名を使うことが重要です
- `oninput`で複数の入力をリアルタイムに組み合わせられます
- 文字列の連結順序に注意します
- 同じIDを複数使ってはいけません
- すべての入力要素から値を取得する必要があります

## できるようになったこと

このレッスンを終えると、次のことができるようになります:

- [ ] 複数のinput要素を作成できる
- [ ] それぞれの要素に適切なIDを設定できる
- [ ] 複数の要素から値を取得できる
- [ ] 取得した値を組み合わせて表示できる
- [ ] リアルタイムで複数の値を組み合わせられる
- [ ] わかりやすい変数名を使って管理できる
- [ ] 値の連結順序を考えて実装できる
- [ ] プロフィールや住所など実用的なフォームを作成できる

## まとめ

このレッスンでは、複数の入力を組み合わせる方法を学びました。

### 重要なポイント7つ:

1. **複数要素の取得**: `document.getElementById()`を繰り返し使う
2. **値の組み合わせ**: `+`演算子で文字列を連結する
3. **ID管理**: 各要素に一意で分かりやすいIDをつける
4. **変数名**: IDに対応した変数名を使う
5. **連結順序**: 自然な日本語になるように順序を考える
6. **リアルタイム処理**: `oninput`で入力のたびに更新できる
7. **実用性**: プロフィール、住所、自己紹介など様々な場面で使える

これにより、より実用的なフォームを作ることができます。

## 次のステップ

次のレッスンでは、**selectタグ**について学びます。

- ドロップダウンリストの作成
- option要素の定義
- 選択された値の取得
- 複数input要素とselectの組み合わせ

input要素とselectを組み合わせると、より高機能なフォームが作れるようになります。
