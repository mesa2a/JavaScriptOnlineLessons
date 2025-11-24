# レッスン142：JSONの基礎

## 学習目標
- JSON形式とは何かを理解する
- JSON.stringify()を使ってオブジェクトを文字列に変換する方法を学ぶ
- JSON.parse()を使って文字列をオブジェクトに変換する方法を学ぶ
- データの保存と読み込みの基本を習得する

## JSONとは

**JSON（JavaScript Object Notation）**は、データを保存したり送受信したりするための軽量なデータ形式です。JavaScriptのオブジェクト記法に似ていますが、より厳格なルールがあります。

### JSON形式の特徴

```json
{
  "name": "田中太郎",
  "age": 25,
  "city": "東京",
  "hobbies": ["読書", "映画", "旅行"]
}
```

JSONの重要なルール：
- プロパティ名は**必ず二重引用符**で囲む
- 文字列も**二重引用符**（シングルクォートは不可）
- 末尾にカンマを付けない
- 関数やundefinedは含められない

## JSON.stringify() - オブジェクトを文字列に変換

`JSON.stringify()` は、JavaScriptのオブジェクトをJSON形式の文字列に変換します。

### 基本的な使い方

```javascript
let person = {
  name: "佐藤",
  age: 30,
  city: "大阪"
};

let jsonString = JSON.stringify(person);
console.log(jsonString);
// '{"name":"佐藤","age":30,"city":"大阪"}'

console.log(typeof jsonString);
// "string"
```

オブジェクトが文字列になりました。この文字列は保存したり、ネットワーク経由で送信したりできます。

### 配列の変換

```javascript
let numbers = [1, 2, 3, 4, 5];
let jsonArray = JSON.stringify(numbers);
console.log(jsonArray);
// '[1,2,3,4,5]'
```

### ネストされたオブジェクト

```javascript
let user = {
  name: "山田",
  profile: {
    age: 28,
    city: "東京"
  },
  hobbies: ["読書", "音楽"]
};

let json = JSON.stringify(user);
console.log(json);
// '{"name":"山田","profile":{"age":28,"city":"東京"},"hobbies":["読書","音楽"]}'
```

## JSON.parse() - 文字列をオブジェクトに変換

`JSON.parse()` は、JSON形式の文字列をJavaScriptのオブジェクトに変換します。

### 基本的な使い方

```javascript
let jsonString = '{"name":"鈴木","age":35,"city":"名古屋"}';
let person = JSON.parse(jsonString);

console.log(person.name);  // "鈴木"
console.log(person.age);   // 35
console.log(typeof person);  // "object"
```

文字列がオブジェクトに変換され、通常のオブジェクトとして使えるようになりました。

### 配列の変換

```javascript
let jsonArray = '[10,20,30,40,50]';
let numbers = JSON.parse(jsonArray);

console.log(numbers[0]);  // 10
console.log(numbers.length);  // 5
```

## 変換の往復

JSONを使って、オブジェクトを文字列にして、また元のオブジェクトに戻すことができます：

```javascript
// オリジナルのオブジェクト
let original = {
  title: "JavaScript入門",
  price: 2800,
  available: true
};

// 文字列に変換
let jsonString = JSON.stringify(original);
console.log(jsonString);
// '{"title":"JavaScript入門","price":2800,"available":true}'

// オブジェクトに戻す
let restored = JSON.parse(jsonString);
console.log(restored.title);  // "JavaScript入門"
console.log(restored.price);  // 2800
```

## localStorageでのデータ保存

JSONは、ブラウザのlocalStorageにデータを保存するときによく使われます。

### データの保存

```javascript
let settings = {
  theme: "dark",
  fontSize: 16,
  language: "ja"
};

// オブジェクトを文字列に変換して保存
let jsonString = JSON.stringify(settings);
localStorage.setItem("userSettings", jsonString);
```

### データの読み込み

```javascript
// 文字列を取得してオブジェクトに変換
let jsonString = localStorage.getItem("userSettings");
let settings = JSON.parse(jsonString);

console.log(settings.theme);     // "dark"
console.log(settings.fontSize);  // 16
```

### データの削除

```javascript
localStorage.removeItem("userSettings");
```

## 実用例：ユーザー設定の保存

```javascript
// 設定を保存する関数
function saveSettings(settings) {
  let json = JSON.stringify(settings);
  localStorage.setItem("appSettings", json);
  console.log("設定を保存しました");
}

// 設定を読み込む関数
function loadSettings() {
  let json = localStorage.getItem("appSettings");
  if (json) {
    return JSON.parse(json);
  } else {
    // デフォルト設定を返す
    return {
      volume: 50,
      notifications: true,
      autoSave: true
    };
  }
}

// 使用例
let mySettings = {
  volume: 70,
  notifications: false,
  autoSave: true
};

saveSettings(mySettings);

// ページを再読み込みしても設定が残る
let loadedSettings = loadSettings();
console.log(loadedSettings.volume);  // 70
```

## ToDoリストの保存

```javascript
let todos = [
  { id: 1, text: "買い物", done: false },
  { id: 2, text: "掃除", done: true },
  { id: 3, text: "勉強", done: false }
];

// ToDoリストを保存
localStorage.setItem("todos", JSON.stringify(todos));

// ToDoリストを読み込み
let savedTodos = localStorage.getItem("todos");
if (savedTodos) {
  todos = JSON.parse(savedTodos);
  console.log(todos);
  // [{ id: 1, text: "買い物", done: false }, ...]
}
```

## JSON.stringify()のオプション

見やすい形式で出力することもできます：

```javascript
let data = {
  name: "田中",
  age: 25,
  hobbies: ["読書", "映画"]
};

// インデント付きで出力
let prettyJson = JSON.stringify(data, null, 2);
console.log(prettyJson);
/*
{
  "name": "田中",
  "age": 25,
  "hobbies": [
    "読書",
    "映画"
  ]
}
*/
```

第3引数にスペースの数を指定すると、読みやすくインデントされます。

## 注意点

### 変換できないもの

以下のものはJSONに変換できません：

```javascript
let obj = {
  name: "田中",
  greet: function() {  // 関数は変換されない
    console.log("こんにちは");
  },
  value: undefined,    // undefinedは変換されない
  date: new Date()     // Dateは文字列になる
};

let json = JSON.stringify(obj);
console.log(json);
// '{"name":"田中","date":"2024-01-01T00:00:00.000Z"}'
// greetとvalueは含まれない
```

### エラー処理

JSON.parse()で不正な文字列を解析するとエラーになります：

```javascript
try {
  let obj = JSON.parse("これは不正なJSON");
} catch (error) {
  console.log("JSONの解析に失敗しました");
}
```

## まとめ

JSONは、データの保存と送受信のための重要な技術です：

1. **JSON.stringify()**: オブジェクト → 文字列
2. **JSON.parse()**: 文字列 → オブジェクト
3. **localStorage**: ブラウザにデータを保存
4. **プロパティ名は二重引用符**: JSON形式のルール
5. **関数やundefinedは含めない**: 変換の制限

次のレッスンでは、オブジェクトのさらに高度な使い方を学びます。

## 練習問題

以下のユーザーデータを使って、JSONの操作を実装してください：

```javascript
let userData = {
  username: "user123",
  email: "user@example.com",
  preferences: {
    theme: "light",
    language: "ja"
  },
  loginCount: 10
};
```

以下の処理を実装してください：

1. userDataをJSON文字列に変換して表示
2. JSON文字列をオブジェクトに戻して、usernameを表示
3. userDataをlocalStorageに保存
4. localStorageからデータを読み込んでオブジェクトに変換
5. 読み込んだデータをHTMLに表示
