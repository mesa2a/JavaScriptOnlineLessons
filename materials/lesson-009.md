---
title: "Lesson 009: 文字の連結"
author: "JavaScript学習教材"
date: "2025-01-20"
---

# Lesson 009: 文字の連結

---

## 今回の学習

### 前回の復習

前回は、変数を使った計算を学びました。`price * count` のように変数を使って計算し、結果を別の変数に保存できることを確認しました。また、`"合計：" + total + "円"` のように、文字列と変数を連結して表示する方法も学びました。

### 今回の目標

1. 文字列同士を連結できるようになる
2. 変数を使って文章を組み立てられるようになる
3. +演算子の2つの役割を理解する
4. 名前合成マシンを作れるようになる

---

## 文字列の連結とは

### 文字列をつなげる

複数の文字列を1つにつなげることを「連結」と言います。JavaScriptでは、`+` 演算子を使って文字列を連結します。

```javascript
let greeting = "こんにちは" + "世界";
console.log(greeting);  // "こんにちは世界"
```

このコードでは、`"こんにちは"` と `"世界"` という2つの文字列を連結して、`"こんにちは世界"` という1つの文字列を作っています。

### 変数を使った連結

文字列を変数に保存して、それらを連結することもできます。

```javascript
let first = "山田";
let last = "太郎";
let full = first + last;
console.log(full);  // "山田太郎"
```

このコードは以下のように動作します。

1. `first` に `"山田"` を保存します
2. `last` に `"太郎"` を保存します
3. `first` と `last` を連結して、結果を `full` に保存します
4. `full` の値 `"山田太郎"` を表示します

### スペースを入れる

連結した文字列の間にスペースを入れたい場合は、スペースを含む文字列を間に挟みます。

```javascript
let first = "山田";
let last = "太郎";
let full = first + " " + last;
console.log(full);  // "山田 太郎"
```

`" "` はスペース1文字を含む文字列です。これを間に挟むことで、名字と名前の間にスペースが入ります。

---

## +演算子の2つの役割

### 数値の足し算

前回学んだように、`+` 演算子は数値の足し算に使えます。

```javascript
let a = 10;
let b = 20;
let sum = a + b;
console.log(sum);  // 30
```

### 文字列の連結

今回学んでいるように、`+` 演算子は文字列の連結にも使えます。

```javascript
let first = "山田";
let last = "太郎";
let full = first + last;
console.log(full);  // "山田太郎"
```

### どちらが実行されるか

`+` 演算子がどちらの役割を果たすかは、オペランド（演算の対象）の型によって決まります。

**両方が数値の場合**

足し算が行われます。

```javascript
console.log(10 + 20);  // 30
```

**少なくとも一方が文字列の場合**

連結が行われます。数値は自動的に文字列に変換されます。

```javascript
console.log("10" + "20");  // "1020"
console.log("数字は" + 10);  // "数字は10"
console.log(10 + "です");   // "10です"
```

### 注意が必要なケース

この仕組みにより、意図しない結果になることがあります。

```javascript
let a = "10";
let b = "20";
console.log(a + b);  // "1020"（足し算ではなく連結）
```

変数 `a` と `b` は文字列なので、`+` は連結として動作します。足し算をしたい場合は、数値として保存する必要があります。

```javascript
let a = 10;
let b = 20;
console.log(a + b);  // 30（足し算）
```

---

## 文章を組み立てる

### 複数の変数を使った文章

複数の変数を連結して、意味のある文章を組み立てることができます。

```javascript
let name = "山田太郎";
let age = 25;
let city = "東京";

let message = name + "さんは" + age + "歳で、" + city + "に住んでいます。";
console.log(message);
```

このコードを実行すると、「山田太郎さんは25歳で、東京に住んでいます。」と表示されます。

### 自己紹介文を作る

```javascript
let name = "山田太郎";
let hobby = "読書";
let food = "ラーメン";

let intro = "私の名前は" + name + "です。趣味は" + hobby + "で、好きな食べ物は" + food + "です。";
console.log(intro);
```

このコードを実行すると、「私の名前は山田太郎です。趣味は読書で、好きな食べ物はラーメンです。」と表示されます。

### 複数行に分けて組み立てる

長い文章は、複数行に分けて組み立てることもできます。

```javascript
let name = "山田太郎";
let age = 25;
let job = "エンジニア";

let line1 = "名前：" + name;
let line2 = "年齢：" + age + "歳";
let line3 = "職業：" + job;

console.log(line1);
console.log(line2);
console.log(line3);
```

このコードを実行すると、以下のように表示されます。

```
名前：山田太郎
年齢：25歳
職業：エンジニア
```

---

## 名前合成マシンを作ろう

変数と文字列連結を使って、名前合成マシンを作ってみましょう。

### 基本の名前合成

```html
<script>
let firstName = "山田";
let lastName = "太郎";
let fullName = firstName + lastName;

console.log("名字：" + firstName);
console.log("名前：" + lastName);
console.log("フルネーム：" + fullName);
</script>
```

このコードを実行すると、以下のように表示されます。

```
名字：山田
名前：太郎
フルネーム：山田太郎
```

### 敬称を付ける

名前に敬称を付けることもできます。

```html
<script>
let firstName = "山田";
let lastName = "太郎";
let fullName = firstName + lastName;

let formal = fullName + "様";
let casual = fullName + "さん";
let business = fullName + "殿";

console.log("フォーマル：" + formal);
console.log("カジュアル：" + casual);
console.log("ビジネス：" + business);
</script>
```

このコードを実行すると、以下のように表示されます。

```
フォーマル：山田太郎様
カジュアル：山田太郎さん
ビジネス：山田太郎殿
```

### 英語名の合成

英語名の場合は、名前と名字の順番が逆になります。

```html
<script>
let firstName = "John";
let lastName = "Smith";

// 日本式（名字 + 名前）
let japanese = lastName + " " + firstName;

// 英語式（名前 + 名字）
let english = firstName + " " + lastName;

console.log("日本式：" + japanese);
console.log("英語式：" + english);
</script>
```

このコードを実行すると、以下のように表示されます。

```
日本式：Smith John
英語式：John Smith
```

### 複数人の名前を合成

複数人の名前を合成することもできます。

```html
<script>
let person1First = "山田";
let person1Last = "太郎";
let person1Full = person1First + person1Last;

let person2First = "佐藤";
let person2Last = "花子";
let person2Full = person2First + person2Last;

let person3First = "鈴木";
let person3Last = "一郎";
let person3Full = person3First + person3Last;

console.log("参加者1：" + person1Full);
console.log("参加者2：" + person2Full);
console.log("参加者3：" + person3Full);

let allNames = person1Full + "、" + person2Full + "、" + person3Full;
console.log("全員：" + allNames);
</script>
```

このコードを実行すると、以下のように表示されます。

```
参加者1：山田太郎
参加者2：佐藤花子
参加者3：鈴木一郎
全員：山田太郎、佐藤花子、鈴木一郎
```

---

## 連結と計算を組み合わせる

文字列の連結と数値の計算を組み合わせると、より実用的なプログラムが作れます。

### 自己紹介に計算を加える

```html
<script>
let name = "山田太郎";
let birthYear = 1998;
let currentYear = 2025;
let age = currentYear - birthYear;

let message = name + "さんは" + birthYear + "年生まれで、今年" + age + "歳になります。";
console.log(message);
</script>
```

このコードを実行すると、「山田太郎さんは1998年生まれで、今年27歳になります。」と表示されます。

### 買い物の結果を文章で表示

```html
<script>
let item = "りんご";
let price = 150;
let count = 3;
let total = price * count;

let message = item + "を" + count + "個買いました。単価は" + price + "円で、合計は" + total + "円です。";
console.log(message);
</script>
```

このコードを実行すると、「りんごを3個買いました。単価は150円で、合計は450円です。」と表示されます。

---

## よくある間違い

### 数値と文字列の混同

数値を文字列として保存すると、計算ができません。

```javascript
let price = "100";  // 文字列
let count = "3";    // 文字列
let total = price * count;  // 300（掛け算は動く）
let sum = price + count;    // "1003"（連結になる）
```

`*` や `/` は数値の計算として動作しますが、`+` は文字列が含まれると連結として動作します。

計算をしたい場合は、数値として保存してください。

```javascript
let price = 100;  // 数値
let count = 3;    // 数値
let total = price + count;  // 103（足し算）
```

### スペースの入れ忘れ

文字列を連結するとき、スペースが必要な場所に入れ忘れることがあります。

```javascript
let first = "Hello";
let second = "World";
console.log(first + second);  // "HelloWorld"（スペースなし）
```

スペースを入れたい場合は、明示的に入れる必要があります。

```javascript
console.log(first + " " + second);  // "Hello World"
```

---

## 練習問題

### 保存場所

`exercises/lesson-009/index.html` を使用してください。このファイルは既に用意されています。各課題のコードを `<script>` タグの中に入力し、ブラウザで開いて動作を確認しましょう。

### 課題1：基本の名前合成

自分の名字と名前を変数に保存し、フルネームを作成して表示してください。

```
名字：○○
名前：○○
フルネーム：○○○○
```

### 課題2：挨拶文の作成

名前と時間帯を変数に保存し、挨拶文を作成してください。

例：「山田さん、おはようございます。」

### 課題3：プロフィール文の作成

以下の情報を変数に保存し、プロフィール文を作成してください。

- 名前
- 年齢
- 出身地
- 趣味

出力例：「○○は○○歳で、○○出身です。趣味は○○です。」

### 課題4：家族の名前合成

3人の家族の名字と名前を変数に保存し、それぞれのフルネームを表示してください。最後に全員の名前をカンマで区切って表示してください。

### 課題5：計算と連結の組み合わせ

生まれ年と現在の年を変数に保存し、年齢を計算して、以下のような文章を作成してください。

「私は○○年生まれで、今年○○歳になります。」

---

**解答例（課題1）**

```html
<script>
let firstName = "山田";
let lastName = "太郎";
let fullName = firstName + lastName;

console.log("名字：" + firstName);
console.log("名前：" + lastName);
console.log("フルネーム：" + fullName);
</script>
```

**解答例（課題3）**

```html
<script>
let name = "山田太郎";
let age = 25;
let hometown = "東京";
let hobby = "読書";

let profile = name + "は" + age + "歳で、" + hometown + "出身です。趣味は" + hobby + "です。";
console.log(profile);
</script>
```

**解答例（課題5）**

```html
<script>
let birthYear = 1998;
let currentYear = 2025;
let age = currentYear - birthYear;

let message = "私は" + birthYear + "年生まれで、今年" + age + "歳になります。";
console.log(message);
</script>
```

---

## まとめ

### 今回学んだこと

**キーポイント1：文字列の連結**

`+` 演算子を使って、複数の文字列を1つにつなげることができます。変数に保存された文字列も連結できます。

**キーポイント2：+演算子の2つの役割**

`+` は数値の足し算と文字列の連結の両方に使われます。オペランドに文字列が含まれる場合は連結になります。

**キーポイント3：文章の組み立て**

複数の変数と文字列を連結して、意味のある文章を組み立てることができます。

**キーポイント4：スペースの挿入**

連結する文字列の間にスペースを入れたい場合は、`" "` を間に挟みます。

---
