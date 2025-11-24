# レッスン173: 苦手分野の復習（文字列と制御構文編）

## このレッスンで学ぶこと
- 文字列操作の基本と応用
- 条件分岐（if, else, switch）
- ループ（for, while）
- よくあるミスと対処法
- 実践的なパターン

---

## 1. 文字列操作の重要性

文字列はプログラミングで最も頻繁に扱うデータ型の一つです。ユーザー入力の処理、データの整形、テキストの検索など、あらゆる場面で使用します。

### 実際の使用例

```javascript
// ユーザー入力の検証
var username = '  田中太郎  ';
var cleanName = username.trim(); // 空白を削除
console.log(cleanName); // '田中太郎'

// メールアドレスの検証
var email = 'tanaka@example.com';
var isValid = email.includes('@') && email.includes('.');

// URLの生成
var baseUrl = 'https://example.com/api/';
var endpoint = 'users';
var id = 123;
var url = baseUrl + endpoint + '/' + id;
console.log(url); // 'https://example.com/api/users/123'

// テキストの整形
var price = 10000;
var formattedPrice = price.toLocaleString() + '円';
console.log(formattedPrice); // '10,000円'
```

---

## 2. 文字列の基本操作

### 2.1 文字列の作成

```javascript
// シングルクォート
var str1 = 'こんにちは';

// ダブルクォート
var str2 = "こんにちは";

// 文字列の連結
var firstName = '太郎';
var lastName = '山田';
var fullName = lastName + firstName;
console.log(fullName); // '山田太郎'

// 複数行の文字列（ES5）
var multiLine = 'これは\n' +
                '複数行の\n' +
                '文字列です';
console.log(multiLine);
```

### 2.2 文字列の長さ

```javascript
var text = 'こんにちは';
console.log(text.length); // 5

var empty = '';
console.log(empty.length); // 0

// 空白も文字数に含まれる
var withSpaces = 'hello world';
console.log(withSpaces.length); // 11
```

### 2.3 文字列へのアクセス

```javascript
var text = 'JavaScript';

// インデックスでアクセス
console.log(text[0]); // 'J'
console.log(text[4]); // 'S'
console.log(text[9]); // 't'

// charAt メソッド
console.log(text.charAt(0)); // 'J'
console.log(text.charAt(4)); // 'S'

// 存在しないインデックス
console.log(text[100]); // undefined
console.log(text.charAt(100)); // ''
```

### 2.4 大文字・小文字の変換

```javascript
var text = 'JavaScript';

// 大文字に変換
console.log(text.toUpperCase()); // 'JAVASCRIPT'

// 小文字に変換
console.log(text.toLowerCase()); // 'javascript'

// 元の文字列は変更されない
console.log(text); // 'JavaScript'

// 実用例：大文字小文字を区別しない比較
var input = 'HELLO';
var target = 'hello';
console.log(input.toLowerCase() === target.toLowerCase()); // true
```

### 2.5 文字列の検索

```javascript
var text = 'JavaScriptはプログラミング言語です';

// indexOf: 最初の出現位置
console.log(text.indexOf('Script')); // 4
console.log(text.indexOf('Python')); // -1 (見つからない)

// lastIndexOf: 最後の出現位置
var text2 = 'banana';
console.log(text2.indexOf('a'));     // 1 (最初のa)
console.log(text2.lastIndexOf('a')); // 5 (最後のa)

// includes: 含まれているか（ES6、ただし古いブラウザでは使えない）
// ES5で実装する場合
function includes(str, searchString) {
  return str.indexOf(searchString) !== -1;
}

console.log(includes(text, 'JavaScript')); // true
console.log(includes(text, 'Python'));     // false
```

### 2.6 文字列の抽出

```javascript
var text = 'JavaScript';

// substring: 部分文字列を取得
console.log(text.substring(0, 4)); // 'Java'
console.log(text.substring(4));    // 'Script'
console.log(text.substring(4, 10)); // 'Script'

// slice: substringと似ているが、負のインデックスが使える
console.log(text.slice(0, 4));  // 'Java'
console.log(text.slice(4));     // 'Script'
console.log(text.slice(-6));    // 'Script' (後ろから6文字)
console.log(text.slice(-6, -2)); // 'Scri'

// 実用例：ファイル拡張子の取得
var filename = 'document.pdf';
var dotIndex = filename.lastIndexOf('.');
var extension = filename.substring(dotIndex + 1);
console.log(extension); // 'pdf'
```

### 2.7 文字列の置換

```javascript
var text = 'Hello World';

// replace: 最初の一致を置換
console.log(text.replace('World', 'JavaScript')); // 'Hello JavaScript'

// すべて置換（正規表現を使用）
var text2 = 'banana';
console.log(text2.replace(/a/g, 'o')); // 'bonono'

// ES5でのすべて置換
function replaceAll(str, search, replacement) {
  return str.split(search).join(replacement);
}

console.log(replaceAll('banana', 'a', 'o')); // 'bonono'
```

### 2.8 文字列の分割と結合

```javascript
// split: 文字列を配列に分割
var csv = 'りんご,バナナ,オレンジ';
var fruits = csv.split(',');
console.log(fruits); // ['りんご', 'バナナ', 'オレンジ']

var sentence = 'これは文です';
var words = sentence.split('');
console.log(words); // ['こ', 'れ', 'は', '文', 'で', 'す']

// join: 配列を文字列に結合
var parts = ['2025', '01', '24'];
var date = parts.join('-');
console.log(date); // '2025-01-24'

// 実用例：URLパラメータの解析
var params = 'name=田中&age=25&city=東京';
var pairs = params.split('&');
console.log(pairs);
// ['name=田中', 'age=25', 'city=東京']
```

### 2.9 文字列のトリム

```javascript
var text = '  こんにちは  ';

// trim: 前後の空白を削除
console.log(text.trim()); // 'こんにちは'

// 元の文字列は変更されない
console.log(text); // '  こんにちは  '

// 実用例：ユーザー入力のクリーンアップ
var userInput = '  田中太郎  ';
var cleanInput = userInput.trim();
if (cleanInput === '') {
  console.log('名前を入力してください');
} else {
  console.log('ようこそ、' + cleanInput + 'さん');
}
```

---

## 3. 条件分岐

### 3.1 if文

```javascript
var age = 20;

if (age >= 20) {
  console.log('成人です');
}

// if-else
if (age >= 20) {
  console.log('成人です');
} else {
  console.log('未成年です');
}

// if-else if-else
var score = 85;

if (score >= 90) {
  console.log('A評価');
} else if (score >= 80) {
  console.log('B評価');
} else if (score >= 70) {
  console.log('C評価');
} else if (score >= 60) {
  console.log('D評価');
} else {
  console.log('F評価');
}
```

### 3.2 比較演算子

```javascript
var a = 5;
var b = '5';

// 等価演算子（型変換あり）
console.log(a == b);  // true（5 == '5'）

// 厳密等価演算子（型変換なし）
console.log(a === b); // false（5 !== '5'）

// 不等価
console.log(a != b);  // false
console.log(a !== b); // true

// 大小比較
console.log(10 > 5);  // true
console.log(10 < 5);  // false
console.log(10 >= 10); // true
console.log(10 <= 5);  // false

// ベストプラクティス：常に === と !== を使う
```

### 3.3 論理演算子

```javascript
var age = 25;
var hasLicense = true;

// AND (&&): 両方がtrueの場合にtrue
if (age >= 18 && hasLicense) {
  console.log('運転できます');
}

// OR (||): どちらかがtrueの場合にtrue
var isWeekend = true;
var isHoliday = false;

if (isWeekend || isHoliday) {
  console.log('休みです');
}

// NOT (!): 真偽値を反転
var isRaining = false;
if (!isRaining) {
  console.log('傘は不要です');
}

// 複数の条件
var score = 85;
var attendance = 90;

if (score >= 80 && attendance >= 80) {
  console.log('合格です');
} else if (score >= 60 || attendance >= 90) {
  console.log('条件付き合格です');
} else {
  console.log('不合格です');
}
```

### 3.4 三項演算子

```javascript
var age = 20;

// 通常のif-else
var status;
if (age >= 20) {
  status = '成人';
} else {
  status = '未成年';
}

// 三項演算子（簡潔）
var status2 = age >= 20 ? '成人' : '未成年';
console.log(status2); // '成人'

// ネストした三項演算子（読みにくいので非推奨）
var score = 85;
var grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';

// if-elseの方が読みやすい
var grade2;
if (score >= 90) {
  grade2 = 'A';
} else if (score >= 80) {
  grade2 = 'B';
} else if (score >= 70) {
  grade2 = 'C';
} else {
  grade2 = 'D';
}
```

### 3.5 switch文

```javascript
var day = 3;
var dayName;

switch (day) {
  case 1:
    dayName = '月曜日';
    break;
  case 2:
    dayName = '火曜日';
    break;
  case 3:
    dayName = '水曜日';
    break;
  case 4:
    dayName = '木曜日';
    break;
  case 5:
    dayName = '金曜日';
    break;
  case 6:
    dayName = '土曜日';
    break;
  case 7:
    dayName = '日曜日';
    break;
  default:
    dayName = '不明';
}

console.log(dayName); // '水曜日'

// 複数のcaseで同じ処理
var month = 2;
var season;

switch (month) {
  case 12:
  case 1:
  case 2:
    season = '冬';
    break;
  case 3:
  case 4:
  case 5:
    season = '春';
    break;
  case 6:
  case 7:
  case 8:
    season = '夏';
    break;
  case 9:
  case 10:
  case 11:
    season = '秋';
    break;
  default:
    season = '不明';
}

console.log(season); // '冬'
```

---

## 4. ループ

### 4.1 for文

```javascript
// 基本的なforループ
for (var i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// 配列のループ
var fruits = ['りんご', 'バナナ', 'オレンジ'];
for (var i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// 逆順ループ
for (var i = fruits.length - 1; i >= 0; i--) {
  console.log(fruits[i]);
}

// 2ずつ増やす
for (var i = 0; i < 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8
}
```

### 4.2 while文

```javascript
// 基本的なwhileループ
var i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// 条件がtrueの間ループ
var count = 0;
while (count < 3) {
  console.log('カウント: ' + count);
  count++;
}

// 無限ループに注意
// while (true) {
//   console.log('無限ループ！');
//   // break が必要
// }
```

### 4.3 do-while文

```javascript
// 少なくとも1回は実行される
var i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);

// 条件が最初からfalseでも1回は実行される
var j = 10;
do {
  console.log(j); // 10 が出力される
  j++;
} while (j < 5);
```

### 4.4 break と continue

```javascript
// break: ループを抜ける
for (var i = 0; i < 10; i++) {
  if (i === 5) {
    break; // i が 5 になったらループを抜ける
  }
  console.log(i); // 0, 1, 2, 3, 4
}

// continue: 次のループへ
for (var i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // i が 2 の時はスキップ
  }
  console.log(i); // 0, 1, 3, 4
}

// 実用例：配列から特定の値を探す
var numbers = [1, 5, 3, 9, 2, 7];
var target = 9;
var found = false;

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] === target) {
    found = true;
    break;
  }
}

console.log(found ? '見つかりました' : '見つかりませんでした');
```

---

## 5. よくあるミスと対処法

### 5.1 文字列の不変性

```javascript
// ❌ 文字列は変更できない
var text = 'hello';
text[0] = 'H'; // 効果なし
console.log(text); // 'hello'

// ✅ 新しい文字列を作成
var text = 'hello';
var newText = 'H' + text.substring(1);
console.log(newText); // 'Hello'
```

### 5.2 比較演算子の間違い

```javascript
// ❌ == を使うと予期しない結果
console.log(0 == '');    // true
console.log(0 == '0');   // true
console.log(false == '0'); // true

// ✅ === を使う
console.log(0 === '');    // false
console.log(0 === '0');   // false
console.log(false === '0'); // false
```

### 5.3 無限ループ

```javascript
// ❌ 無限ループ
// var i = 0;
// while (i < 10) {
//   console.log(i);
//   // i++ を忘れている！
// }

// ✅ カウンターを更新
var i = 0;
while (i < 10) {
  console.log(i);
  i++; // 必ず更新する
}
```

### 5.4 switchでのbreakの忘れ

```javascript
// ❌ breakを忘れる
var value = 1;
switch (value) {
  case 1:
    console.log('1です');
    // break がない！
  case 2:
    console.log('2です'); // これも実行される
    break;
}

// ✅ breakを書く
switch (value) {
  case 1:
    console.log('1です');
    break;
  case 2:
    console.log('2です');
    break;
}
```

---

## 6. 実践的なパターン

### 6.1 文字列の検証

```javascript
function validateEmail(email) {
  if (!email || email.trim() === '') {
    return '必須項目です';
  }

  if (email.indexOf('@') === -1) {
    return '@が含まれていません';
  }

  if (email.indexOf('.') === -1) {
    return 'ドメインが正しくありません';
  }

  var atIndex = email.indexOf('@');
  var dotIndex = email.lastIndexOf('.');

  if (atIndex > dotIndex) {
    return 'メールアドレスの形式が正しくありません';
  }

  return null; // エラーなし
}

// 使用例
console.log(validateEmail('test@example.com')); // null
console.log(validateEmail('invalid')); // '@が含まれていません'
```

### 6.2 テキストの整形

```javascript
function formatPhoneNumber(phone) {
  // ハイフンを削除
  var cleaned = phone.replace(/-/g, '');

  // 数字のみか確認
  if (!/^\d+$/.test(cleaned)) {
    return null;
  }

  // フォーマット
  if (cleaned.length === 10) {
    return cleaned.substring(0, 3) + '-' +
           cleaned.substring(3, 6) + '-' +
           cleaned.substring(6);
  } else if (cleaned.length === 11) {
    return cleaned.substring(0, 3) + '-' +
           cleaned.substring(3, 7) + '-' +
           cleaned.substring(7);
  }

  return null;
}

// 使用例
console.log(formatPhoneNumber('09012345678')); // '090-1234-5678'
console.log(formatPhoneNumber('0312345678'));  // '03-1234-5678'
```

### 6.3 配列の検索と条件分岐

```javascript
function findUser(users, id) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return users[i];
    }
  }
  return null;
}

function getUserStatus(user) {
  if (!user) {
    return 'ユーザーが見つかりません';
  }

  if (user.isActive) {
    return 'アクティブ';
  } else if (user.isSuspended) {
    return '停止中';
  } else {
    return '非アクティブ';
  }
}

// 使用例
var users = [
  { id: 1, name: '田中', isActive: true, isSuspended: false },
  { id: 2, name: '佐藤', isActive: false, isSuspended: true }
];

var user = findUser(users, 1);
console.log(getUserStatus(user)); // 'アクティブ'
```

### 6.4 ループを使った集計

```javascript
function calculateStats(numbers) {
  if (numbers.length === 0) {
    return null;
  }

  var sum = 0;
  var min = numbers[0];
  var max = numbers[0];

  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];

    if (numbers[i] < min) {
      min = numbers[i];
    }

    if (numbers[i] > max) {
      max = numbers[i];
    }
  }

  return {
    sum: sum,
    average: sum / numbers.length,
    min: min,
    max: max,
    count: numbers.length
  };
}

// 使用例
var numbers = [5, 2, 9, 1, 7, 3];
var stats = calculateStats(numbers);
console.log(stats);
// { sum: 27, average: 4.5, min: 1, max: 9, count: 6 }
```

---

## まとめ

このレッスンでは、文字列操作と制御構文について復習しました：

1. **文字列操作**
   - 文字列の作成と連結
   - length, charAt, indexOf
   - toUpperCase, toLowerCase
   - substring, slice
   - replace, split, join
   - trim

2. **条件分岐**
   - if, else if, else
   - 比較演算子（===, !==, >, <, >=, <=）
   - 論理演算子（&&, ||, !）
   - 三項演算子
   - switch文

3. **ループ**
   - for文
   - while文
   - do-while文
   - break と continue

4. **よくあるミス**
   - 文字列の不変性
   - == vs ===
   - 無限ループ
   - switchでのbreak忘れ

5. **実践パターン**
   - 文字列の検証
   - テキストの整形
   - 配列の検索と条件分岐
   - ループを使った集計

文字列操作と制御構文を理解することで、より複雑なロジックを実装できるようになります。しっかり復習して、実践で使えるようになりましょう！
