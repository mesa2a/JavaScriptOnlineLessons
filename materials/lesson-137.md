# レッスン137：複雑なオブジェクト

**日付**: 2025-11-26

## このレッスンで学ぶこと

このレッスンでは、より複雑なオブジェクトの構造について学びます。オブジェクトの中に別のオブジェクトや配列を含めることで、より詳細で構造化されたデータを扱うことができるようになります。

## 日常生活での例え

複雑なオブジェクトは、**引き出し付きの机**のようなものです。

- **シンプルなオブジェクト**: 引き出しの中に直接物が入っている
- **ネストしたオブジェクト**: 引き出しの中に小さな仕切りボックスがあり、その中にさらに物が入っている
- **配列を含むオブジェクト**: 引き出しの中に複数の同じ種類の物（リストや名刺の束など）が入っている

実際の生活では、情報はこのように階層的に整理されています：
- **住所録**: 名前の中に「住所」という箱があり、その中に「都道府県」「市区町村」などが入っている
- **商品カタログ**: 商品の中に「仕様」という箱があり、その中に複数のスペック情報が入っている
- **学校のクラス**: クラスの中に「生徒リスト」という配列があり、各生徒が情報を持っている

## ネストしたオブジェクトとは

### 基本概念

**ネストしたオブジェクト**とは、オブジェクトの中に別のオブジェクトが含まれている構造のことです。

```javascript
const person = {
  name: "山田太郎",
  age: 30,
  address: {
    prefecture: "東京都",
    city: "新宿区",
    street: "西新宿1-1-1"
  }
};
```

### データ構造の視覚化

```
person オブジェクト
┌─────────────────────────────────┐
│ name: "山田太郎"                │
│ age: 30                         │
│ address: {                      │ ← ここがネストしたオブジェクト
│   ┌───────────────────────────┐ │
│   │ prefecture: "東京都"      │ │
│   │ city: "新宿区"            │ │
│   │ street: "西新宿1-1-1"     │ │
│   └───────────────────────────┘ │
│ }                               │
└─────────────────────────────────┘
```

### ネストしたプロパティへのアクセス

ドット記法を連続して使うことで、ネストしたプロパティにアクセスできます。

```javascript
const person = {
  name: "山田太郎",
  age: 30,
  address: {
    prefecture: "東京都",
    city: "新宿区",
    street: "西新宿1-1-1"
  }
};

console.log(person.address.prefecture);  // "東京都"
console.log(person.address.city);        // "新宿区"
console.log(person.address.street);      // "西新宿1-1-1"
```

### 実行の流れ

```
【ステップ1】person.address.prefecture の実行

1. person オブジェクトにアクセス
   person = { name: "山田太郎", age: 30, address: {...} }

2. person.address にアクセス
   address = { prefecture: "東京都", city: "新宿区", street: "西新宿1-1-1" }

3. address.prefecture にアクセス
   結果: "東京都"

完成した情報の取得経路:
person → address → prefecture → "東京都"
```

## より深いネスト

オブジェクトは何段階でもネストできます。

```javascript
const company = {
  name: "ABC株式会社",
  employee: {
    name: "田中",
    position: "エンジニア",
    contact: {
      email: "tanaka@abc.com",
      phone: "03-1234-5678"
    }
  }
};

console.log(company.employee.contact.email);  // "tanaka@abc.com"
```

### データ構造の視覚化（3階層）

```
company オブジェクト
┌─────────────────────────────────────────┐
│ name: "ABC株式会社"                     │
│ employee: {                             │
│   ┌───────────────────────────────────┐ │
│   │ name: "田中"                      │ │
│   │ position: "エンジニア"            │ │
│   │ contact: {                        │ │
│   │   ┌─────────────────────────────┐ │ │
│   │   │ email: "tanaka@abc.com"     │ │ │
│   │   │ phone: "03-1234-5678"       │ │ │
│   │   └─────────────────────────────┘ │ │
│   │ }                                 │ │
│   └───────────────────────────────────┘ │
│ }                                       │
└─────────────────────────────────────────┘

アクセス経路:
company.employee.contact.email
 ↓       ↓        ↓       ↓
第1層  第2層    第3層    最終値
```

## 配列を含むオブジェクト

オブジェクトのプロパティの値として、配列を持つこともできます。

### 基本的な構造

```javascript
const student = {
  name: "佐藤花子",
  age: 20,
  hobbies: ["読書", "音楽", "旅行"]
};

console.log(student.hobbies[0]);  // "読書"
console.log(student.hobbies[1]);  // "音楽"
console.log(student.hobbies[2]);  // "旅行"
```

### データ構造の視覚化

```
student オブジェクト
┌─────────────────────────────────┐
│ name: "佐藤花子"                │
│ age: 20                         │
│ hobbies: [                      │ ← 配列プロパティ
│   ┌───────────────────────────┐ │
│   │ [0] "読書"                │ │
│   │ [1] "音楽"                │ │
│   │ [2] "旅行"                │ │
│   └───────────────────────────┘ │
│ ]                               │
└─────────────────────────────────┘

アクセス方法:
student.hobbies[0]  → "読書"
student.hobbies[1]  → "音楽"
student.hobbies[2]  → "旅行"
```

### 配列要素の操作

配列のメソッドも通常通り使えます。

```javascript
const student = {
  name: "佐藤花子",
  age: 20,
  hobbies: ["読書", "音楽"]
};

// 要素を追加
student.hobbies.push("旅行");
console.log(student.hobbies);  // ["読書", "音楽", "旅行"]

// 配列の長さ
console.log(student.hobbies.length);  // 3
```

### 実行の流れ

```
【初期状態】
student = {
  name: "佐藤花子",
  age: 20,
  hobbies: ["読書", "音楽"]
}

【ステップ1】student.hobbies.push("旅行") を実行

1. student.hobbies にアクセス
   hobbies = ["読書", "音楽"]

2. push("旅行") メソッドを実行
   hobbies = ["読書", "音楽", "旅行"]

【最終状態】
student = {
  name: "佐藤花子",
  age: 20,
  hobbies: ["読書", "音楽", "旅行"]  ← 要素が追加された
}
```

## 配列の要素がオブジェクト

配列の各要素をオブジェクトにすることもできます。

```javascript
const classroom = {
  name: "クラスA",
  students: [
    { name: "太郎", score: 85 },
    { name: "花子", score: 92 },
    { name: "次郎", score: 78 }
  ]
};

console.log(classroom.students[0].name);   // "太郎"
console.log(classroom.students[1].score);  // 92
```

### データ構造の視覚化

```
classroom オブジェクト
┌─────────────────────────────────────────────┐
│ name: "クラスA"                             │
│ students: [                                 │
│   ┌───────────────────────────────────────┐ │
│   │ [0] { name: "太郎", score: 85 }       │ │
│   │ [1] { name: "花子", score: 92 }       │ │
│   │ [2] { name: "次郎", score: 78 }       │ │
│   └───────────────────────────────────────┘ │
│ ]                                           │
└─────────────────────────────────────────────┘

アクセス経路の例:
classroom.students[1].score
    ↓        ↓      ↓    ↓
オブジェクト 配列  インデックス プロパティ
                    1番目      score
                   (花子)      → 92
```

## ネストと配列の組み合わせ

ネストしたオブジェクトと配列を組み合わせることで、複雑なデータ構造を表現できます。

```javascript
const school = {
  name: "ABC高校",
  location: {
    prefecture: "東京都",
    city: "渋谷区"
  },
  classes: [
    {
      name: "1年A組",
      students: ["太郎", "花子", "次郎"]
    },
    {
      name: "1年B組",
      students: ["恵子", "健太", "美咲"]
    }
  ]
};

console.log(school.location.city);            // "渋谷区"
console.log(school.classes[0].name);          // "1年A組"
console.log(school.classes[0].students[1]);   // "花子"
```

### データ構造の視覚化（複雑な構造）

```
school オブジェクト
┌───────────────────────────────────────────────────────┐
│ name: "ABC高校"                                       │
│                                                       │
│ location: {                    ← ネストしたオブジェクト│
│   ┌─────────────────────────┐                        │
│   │ prefecture: "東京都"    │                        │
│   │ city: "渋谷区"          │                        │
│   └─────────────────────────┘                        │
│ }                                                     │
│                                                       │
│ classes: [                     ← オブジェクトの配列  │
│   ┌─────────────────────────────────────────────┐    │
│   │ [0] {                                       │    │
│   │   name: "1年A組",                           │    │
│   │   students: ["太郎", "花子", "次郎"]        │    │
│   │ }                                           │    │
│   │ [1] {                                       │    │
│   │   name: "1年B組",                           │    │
│   │   students: ["恵子", "健太", "美咲"]        │    │
│   │ }                                           │    │
│   └─────────────────────────────────────────────┘    │
│ ]                                                     │
└───────────────────────────────────────────────────────┘

複数のアクセス経路:
1. school.location.city           → "渋谷区"
2. school.classes[0].name         → "1年A組"
3. school.classes[0].students[1]  → "花子"
```

### 実行の流れ

```
【school.classes[0].students[1] の実行】

ステップ1: school にアクセス
  school = { name: "ABC高校", location: {...}, classes: [...] }

ステップ2: school.classes にアクセス
  classes = [
    { name: "1年A組", students: ["太郎", "花子", "次郎"] },
    { name: "1年B組", students: ["恵子", "健太", "美咲"] }
  ]

ステップ3: classes[0] にアクセス（配列の0番目）
  classes[0] = { name: "1年A組", students: ["太郎", "花子", "次郎"] }

ステップ4: classes[0].students にアクセス
  students = ["太郎", "花子", "次郎"]

ステップ5: students[1] にアクセス（配列の1番目）
  結果: "花子"

アクセス経路の図解:
school → classes → [0] → students → [1] → "花子"
 ↓        ↓        ↓       ↓         ↓
オブジェクト 配列   要素   プロパティ  要素
```

## 実践例1：ネスト構造の住所管理システム

ネストしたオブジェクトを使って、詳細な住所情報を管理するシステムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>住所管理システム</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        h1 {
            text-align: center;
            color: white;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .person-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            transition: transform 0.3s;
        }

        .person-card:hover {
            transform: translateY(-5px);
        }

        .person-name {
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 15px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }

        .info-section {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 15px;
            margin: 15px 0;
        }

        .section-title {
            font-weight: bold;
            color: #764ba2;
            margin-bottom: 10px;
            font-size: 16px;
        }

        .info-item {
            padding: 8px 0;
            color: #333;
            line-height: 1.6;
        }

        .label {
            display: inline-block;
            width: 100px;
            font-weight: bold;
            color: #666;
        }
    </style>
</head>
<body>
    <h1>📍 住所管理システム</h1>
    <div id="personDisplay"></div>

    <script>
        // ネストしたオブジェクトを持つ人物データ
        const person = {
            name: "山田太郎",
            age: 30,
            address: {
                postalCode: "160-0023",
                prefecture: "東京都",
                city: "新宿区",
                street: "西新宿1-1-1",
                building: "ABCビル3階"
            },
            contact: {
                phone: "03-1234-5678",
                mobile: "090-1111-2222",
                email: "yamada@example.com"
            }
        };

        const display = document.getElementById("personDisplay");

        // 人物情報を表示する関数
        function displayPerson() {
            const card = document.createElement("div");
            card.className = "person-card";

            // 名前と年齢
            const nameDiv = document.createElement("div");
            nameDiv.className = "person-name";
            nameDiv.textContent = `${person.name} (${person.age}歳)`;
            card.appendChild(nameDiv);

            // 住所セクション
            const addressSection = document.createElement("div");
            addressSection.className = "info-section";
            addressSection.innerHTML = `
                <div class="section-title">🏠 住所情報</div>
                <div class="info-item">
                    <span class="label">郵便番号:</span>${person.address.postalCode}
                </div>
                <div class="info-item">
                    <span class="label">都道府県:</span>${person.address.prefecture}
                </div>
                <div class="info-item">
                    <span class="label">市区町村:</span>${person.address.city}
                </div>
                <div class="info-item">
                    <span class="label">番地:</span>${person.address.street}
                </div>
                <div class="info-item">
                    <span class="label">建物名:</span>${person.address.building}
                </div>
            `;
            card.appendChild(addressSection);

            // 連絡先セクション
            const contactSection = document.createElement("div");
            contactSection.className = "info-section";
            contactSection.innerHTML = `
                <div class="section-title">📞 連絡先情報</div>
                <div class="info-item">
                    <span class="label">固定電話:</span>${person.contact.phone}
                </div>
                <div class="info-item">
                    <span class="label">携帯電話:</span>${person.contact.mobile}
                </div>
                <div class="info-item">
                    <span class="label">メール:</span>${person.contact.email}
                </div>
            `;
            card.appendChild(contactSection);

            display.appendChild(card);
        }

        // 実行
        displayPerson();

        // コンソールに詳細な情報を出力
        console.log("=== 住所管理システム ===");
        console.log(`名前: ${person.name}`);
        console.log(`完全な住所: ${person.address.postalCode} ${person.address.prefecture}${person.address.city}${person.address.street} ${person.address.building}`);
        console.log(`連絡先: ${person.contact.mobile}`);
    </script>
</body>
</html>
```

### このアプリケーションのポイント

1. **ネストしたオブジェクト構造**
   - `address` オブジェクトに複数の住所要素
   - `contact` オブジェクトに複数の連絡先要素

2. **データへのアクセス**
   - `person.address.prefecture` で都道府県にアクセス
   - `person.contact.email` でメールアドレスにアクセス

3. **視覚的な整理**
   - セクションごとにグループ化して表示
   - カラフルなカードデザイン

## 実践例2：学生成績管理システム

配列を含むオブジェクトを使って、学生の成績データを管理するシステムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>学生成績管理システム</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 30px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            min-height: 100vh;
        }

        h1 {
            text-align: center;
            color: white;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .student-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .student-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 3px solid #f5576c;
        }

        .student-name {
            font-size: 24px;
            font-weight: bold;
            color: #f5576c;
        }

        .student-id {
            font-size: 14px;
            color: #666;
            background: #f8f9fa;
            padding: 5px 15px;
            border-radius: 20px;
        }

        .section {
            margin: 15px 0;
        }

        .section-title {
            font-weight: bold;
            color: #f093fb;
            margin-bottom: 10px;
            font-size: 16px;
        }

        .subject-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
        }

        .subject-item {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .subject-name {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .subject-score {
            font-size: 28px;
            font-weight: bold;
        }

        .hobby-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .hobby-tag {
            background: #f093fb;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 14px;
        }

        .average {
            background: #28a745;
            color: white;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <h1>📊 学生成績管理システム</h1>
    <div id="studentDisplay"></div>

    <script>
        // 配列を含むオブジェクト
        const student = {
            name: "佐藤花子",
            studentId: "S12345",
            grade: 2,
            subjects: [
                { name: "数学", score: 92 },
                { name: "英語", score: 88 },
                { name: "国語", score: 85 },
                { name: "理科", score: 90 }
            ],
            hobbies: ["読書", "音楽", "テニス", "絵画"]
        };

        const display = document.getElementById("studentDisplay");

        // 平均点を計算する関数
        function calculateAverage(subjects) {
            let total = 0;
            for (let i = 0; i < subjects.length; i++) {
                total += subjects[i].score;
            }
            return Math.round(total / subjects.length);
        }

        // 学生情報を表示する関数
        function displayStudent() {
            const card = document.createElement("div");
            card.className = "student-card";

            // ヘッダー（名前と学籍番号）
            const header = document.createElement("div");
            header.className = "student-header";
            header.innerHTML = `
                <div class="student-name">${student.name} (${student.grade}年生)</div>
                <div class="student-id">学籍番号: ${student.studentId}</div>
            `;
            card.appendChild(header);

            // 科目セクション
            const subjectsSection = document.createElement("div");
            subjectsSection.className = "section";
            subjectsSection.innerHTML = '<div class="section-title">📚 科目別成績</div>';

            const subjectList = document.createElement("div");
            subjectList.className = "subject-list";

            // 各科目の成績を表示
            for (let i = 0; i < student.subjects.length; i++) {
                const subject = student.subjects[i];
                const subjectItem = document.createElement("div");
                subjectItem.className = "subject-item";
                subjectItem.innerHTML = `
                    <div class="subject-name">${subject.name}</div>
                    <div class="subject-score">${subject.score}点</div>
                `;
                subjectList.appendChild(subjectItem);
            }

            subjectsSection.appendChild(subjectList);
            card.appendChild(subjectsSection);

            // 平均点を表示
            const average = calculateAverage(student.subjects);
            const averageDiv = document.createElement("div");
            averageDiv.className = "average";
            averageDiv.textContent = `平均点: ${average}点`;
            card.appendChild(averageDiv);

            // 趣味セクション
            const hobbiesSection = document.createElement("div");
            hobbiesSection.className = "section";
            hobbiesSection.innerHTML = '<div class="section-title">🎨 趣味</div>';

            const hobbyList = document.createElement("div");
            hobbyList.className = "hobby-list";

            // 各趣味を表示
            for (let i = 0; i < student.hobbies.length; i++) {
                const hobbyTag = document.createElement("span");
                hobbyTag.className = "hobby-tag";
                hobbyTag.textContent = student.hobbies[i];
                hobbyList.appendChild(hobbyTag);
            }

            hobbiesSection.appendChild(hobbyList);
            card.appendChild(hobbiesSection);

            display.appendChild(card);
        }

        // 実行
        displayStudent();

        // コンソールに詳細な情報を出力
        console.log("=== 学生成績管理システム ===");
        console.log(`学生名: ${student.name}`);
        console.log(`科目数: ${student.subjects.length}`);
        console.log("各科目の成績:");
        for (let i = 0; i < student.subjects.length; i++) {
            console.log(`  ${student.subjects[i].name}: ${student.subjects[i].score}点`);
        }
        console.log(`平均点: ${calculateAverage(student.subjects)}点`);
        console.log(`趣味: ${student.hobbies.join(", ")}`);
    </script>
</body>
</html>
```

### このアプリケーションのポイント

1. **配列を含むオブジェクト**
   - `subjects` 配列にオブジェクトの配列
   - `hobbies` 配列に文字列の配列

2. **配列の処理**
   - for ループで全科目の成績を表示
   - 平均点を計算する関数

3. **データへのアクセス**
   - `student.subjects[i].score` で各科目の点数
   - `student.hobbies[i]` で各趣味

## 実践例3：クラス全体の管理システム

オブジェクトの配列と複数のネスト構造を組み合わせたシステムを作ってみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>クラス管理システム</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 30px;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            min-height: 100vh;
        }

        h1 {
            text-align: center;
            color: white;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .class-info {
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .class-header {
            font-size: 28px;
            font-weight: bold;
            color: #4facfe;
            margin-bottom: 15px;
            text-align: center;
            border-bottom: 3px solid #4facfe;
            padding-bottom: 15px;
        }

        .teacher-info {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .teacher-name {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .students-section {
            margin-top: 20px;
        }

        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #4facfe;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .student-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 15px;
        }

        .student-card {
            background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }

        .student-card:hover {
            transform: translateY(-5px);
        }

        .student-name {
            font-size: 18px;
            font-weight: bold;
            color: #00695c;
            margin-bottom: 10px;
        }

        .student-score {
            font-size: 32px;
            font-weight: bold;
            color: #00897b;
            text-align: center;
            margin: 10px 0;
        }

        .score-label {
            text-align: center;
            color: #666;
            font-size: 14px;
        }

        .stats {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
        }

        .stats-title {
            font-weight: bold;
            color: #856404;
            margin-bottom: 10px;
        }

        .stat-item {
            padding: 5px 0;
            color: #856404;
        }
    </style>
</head>
<body>
    <h1>🏫 クラス管理システム</h1>
    <div id="classDisplay"></div>

    <script>
        // 複雑なネスト構造を持つクラスデータ
        const classroom = {
            className: "3年A組",
            teacher: {
                name: "山田太郎",
                subject: "数学",
                experience: 15
            },
            students: [
                { name: "佐藤花子", score: 92 },
                { name: "田中次郎", score: 85 },
                { name: "鈴木美咲", score: 88 },
                { name: "高橋健太", score: 78 },
                { name: "伊藤愛", score: 95 },
                { name: "渡辺大輔", score: 82 }
            ],
            room: "301"
        };

        const display = document.getElementById("classDisplay");

        // クラスの平均点を計算
        function calculateClassAverage(students) {
            let total = 0;
            for (let i = 0; i < students.length; i++) {
                total += students[i].score;
            }
            return Math.round(total / students.length);
        }

        // 最高点を見つける
        function findTopScore(students) {
            let topScore = 0;
            for (let i = 0; i < students.length; i++) {
                if (students[i].score > topScore) {
                    topScore = students[i].score;
                }
            }
            return topScore;
        }

        // クラス情報を表示する関数
        function displayClassroom() {
            const container = document.createElement("div");
            container.className = "class-info";

            // クラスヘッダー
            const header = document.createElement("div");
            header.className = "class-header";
            header.textContent = `${classroom.className} (教室: ${classroom.room}号室)`;
            container.appendChild(header);

            // 担任教師情報
            const teacherInfo = document.createElement("div");
            teacherInfo.className = "teacher-info";
            teacherInfo.innerHTML = `
                <div class="teacher-name">👨‍🏫 担任: ${classroom.teacher.name}</div>
                <div>担当科目: ${classroom.teacher.subject}</div>
                <div>教職経験: ${classroom.teacher.experience}年</div>
            `;
            container.appendChild(teacherInfo);

            // 生徒セクション
            const studentsSection = document.createElement("div");
            studentsSection.className = "students-section";

            const sectionTitle = document.createElement("div");
            sectionTitle.className = "section-title";
            sectionTitle.innerHTML = `👥 生徒一覧 <span style="font-size: 16px; color: #666;">(全${classroom.students.length}名)</span>`;
            studentsSection.appendChild(sectionTitle);

            // 生徒グリッド
            const studentGrid = document.createElement("div");
            studentGrid.className = "student-grid";

            // 各生徒のカードを作成
            for (let i = 0; i < classroom.students.length; i++) {
                const student = classroom.students[i];
                const studentCard = document.createElement("div");
                studentCard.className = "student-card";
                studentCard.innerHTML = `
                    <div class="student-name">${student.name}</div>
                    <div class="student-score">${student.score}点</div>
                    <div class="score-label">${classroom.teacher.subject} テスト成績</div>
                `;
                studentGrid.appendChild(studentCard);
            }

            studentsSection.appendChild(studentGrid);
            container.appendChild(studentsSection);

            // 統計情報
            const stats = document.createElement("div");
            stats.className = "stats";
            const average = calculateClassAverage(classroom.students);
            const topScore = findTopScore(classroom.students);
            stats.innerHTML = `
                <div class="stats-title">📈 クラス統計</div>
                <div class="stat-item">• 生徒数: ${classroom.students.length}名</div>
                <div class="stat-item">• 平均点: ${average}点</div>
                <div class="stat-item">• 最高点: ${topScore}点</div>
                <div class="stat-item">• 担当: ${classroom.teacher.name}先生 (${classroom.teacher.subject})</div>
            `;
            container.appendChild(stats);

            display.appendChild(container);
        }

        // 実行
        displayClassroom();

        // コンソールに詳細な情報を出力
        console.log("=== クラス管理システム ===");
        console.log(`クラス名: ${classroom.className}`);
        console.log(`担任: ${classroom.teacher.name}先生 (${classroom.teacher.subject})`);
        console.log(`生徒数: ${classroom.students.length}名`);
        console.log("\n生徒別成績:");
        for (let i = 0; i < classroom.students.length; i++) {
            console.log(`  ${i + 1}. ${classroom.students[i].name}: ${classroom.students[i].score}点`);
        }
        console.log(`\nクラス平均: ${calculateClassAverage(classroom.students)}点`);
        console.log(`最高点: ${findTopScore(classroom.students)}点`);
    </script>
</body>
</html>
```

### このアプリケーションのポイント

1. **複数のネスト構造**
   - `teacher` オブジェクト（ネスト）
   - `students` 配列（オブジェクトの配列）

2. **複雑なデータアクセス**
   - `classroom.teacher.name` で担任名
   - `classroom.students[i].score` で各生徒の成績

3. **データ処理**
   - ループで全生徒の成績を表示
   - 平均点と最高点の計算

4. **実用的な機能**
   - クラス統計の計算
   - グリッドレイアウトで見やすい表示

## 複雑なデータ構造のナビゲート

### パスを辿る

複雑なオブジェクトから特定のデータを取得するには、パスを順に辿ります。

```javascript
const data = {
  company: {
    departments: [
      {
        name: "営業部",
        employees: [
          { name: "田中", age: 30 },
          { name: "佐藤", age: 28 }
        ]
      }
    ]
  }
};

// 営業部の最初の従業員の名前
console.log(data.company.departments[0].employees[0].name);  // "田中"
```

### アクセスパスの視覚化

```
data.company.departments[0].employees[0].name
 ↓     ↓          ↓        ↓     ↓       ↓
第1層 第2層      第3層    インデックス 第4層 プロパティ
                  配列      0番目   配列の  最終値
                           (営業部) 0番目
                                   (田中)

実行ステップ:
1. data にアクセス
2. data.company にアクセス
3. company.departments にアクセス（配列）
4. departments[0] にアクセス（0番目の部署）
5. departments[0].employees にアクセス（配列）
6. employees[0] にアクセス（0番目の従業員）
7. employees[0].name にアクセス
結果: "田中"
```

### ループでアクセス

配列内の全オブジェクトにアクセスするには、ループを使います。

```javascript
const company = {
  employees: [
    { name: "太郎", salary: 400000 },
    { name: "花子", salary: 450000 },
    { name: "次郎", salary: 380000 }
  ]
};

// すべての従業員の給与を表示
for (let i = 0; i < company.employees.length; i++) {
  console.log(company.employees[i].name + "の給与: " + company.employees[i].salary + "円");
}
```

### 実行の流れ

```
【初期状態】
company = {
  employees: [
    { name: "太郎", salary: 400000 },
    { name: "花子", salary: 450000 },
    { name: "次郎", salary: 380000 }
  ]
}

【ループ実行】

i = 0 の時:
  company.employees[0] = { name: "太郎", salary: 400000 }
  出力: "太郎の給与: 400000円"

i = 1 の時:
  company.employees[1] = { name: "花子", salary: 450000 }
  出力: "花子の給与: 450000円"

i = 2 の時:
  company.employees[2] = { name: "次郎", salary: 380000 }
  出力: "次郎の給与: 380000円"
```

## 注意点

### 1. 存在しないパスへのアクセス

ネストしたプロパティにアクセスする際、途中のプロパティが存在しない場合はエラーになります。

```javascript
const person = {
  name: "太郎"
};

// エラー: Cannot read property 'city' of undefined
// console.log(person.address.city);

// 安全なアクセス方法
if (person.address !== undefined) {
  console.log(person.address.city);
} else {
  console.log("住所が登録されていません");
}
```

### 2. 深いコピー vs 浅いコピー

オブジェクトをコピーする際、ネストしたオブジェクトは参照がコピーされます。

```javascript
const original = {
  name: "太郎",
  address: { city: "東京" }
};

const copy = original;
copy.address.city = "大阪";

console.log(original.address.city);  // "大阪" (元のオブジェクトも変更される)
```

## カリキュラムの仕様チェック

このレッスンで実装した内容が、カリキュラムの仕様を満たしているか確認します。

### カリキュラムの要件

curriculum.md の レッスン137 (行1080-1085):

```
レッスン137:複雑なオブジェクト(30分)
□ ネストしたオブジェクト
□ 配列を含むオブジェクト
□ アドレス帳作成
【知識】ネストした構造、複合データ型
✅ 成果物:詳細データ
```

### 仕様の確認

| 要件 | 実装内容 | 確認 |
|-----|---------|-----|
| ネストしたオブジェクト | `person.address.city` のような構造を解説、実践例1で住所管理システム実装 | ✅ |
| 配列を含むオブジェクト | `student.hobbies[0]` のような構造を解説、実践例2で学生成績管理システム実装 | ✅ |
| アドレス帳作成 | 実践例1で詳細な住所情報を含む住所管理システムを実装 | ✅ |
| ネストした構造 | 複数階層のネスト構造を視覚化し、アクセス方法を詳しく解説 | ✅ |
| 複合データ型 | オブジェクト内にオブジェクトや配列を含む複合的なデータ構造を解説 | ✅ |
| 詳細データ | 実践例3でクラス管理システム（teacher, students配列など）を実装 | ✅ |

### 詳細な確認

**✅ ネストしたオブジェクト**
- 基本的なネスト構造の解説
- `person.address.prefecture` のようなアクセス方法
- より深いネスト（3階層以上）の例
- 実践例1: 住所管理システムで address, contact オブジェクトを実装

**✅ 配列を含むオブジェクト**
- `hobbies: ["読書", "音楽"]` のような構造の解説
- 配列要素へのアクセス方法 (`student.hobbies[0]`)
- 配列メソッド（push）の使用
- 実践例2: 学生成績管理システムで subjects 配列、hobbies 配列を実装

**✅ アドレス帳作成**
- 実践例1で詳細な住所管理システムを実装
- 郵便番号、都道府県、市区町村、番地、建物名を含む
- 連絡先情報（電話、携帯、メール）も管理

**✅ ネストした構造**
- データ構造をASCII図で視覚化
- アクセスパスの詳細な説明
- 複数階層のネスト例を提供

**✅ 複合データ型**
- オブジェクト内のオブジェクト
- オブジェクト内の配列
- 配列内のオブジェクト
- これらの組み合わせ

**✅ 詳細データ（成果物）**
- 実践例1: 住所管理システム（ネストしたオブジェクト）
- 実践例2: 学生成績管理システム（配列を含むオブジェクト）
- 実践例3: クラス管理システム（複合的な構造）

すべての要件を満たしています。

## まとめ

このレッスンでは、以下のことを学びました。

### 学んだこと

1. **ネストしたオブジェクト**
   - オブジェクトの中にオブジェクトを含める方法
   - ドット記法を連続して使ったアクセス方法
   - 複数階層のネスト構造

2. **配列を含むオブジェクト**
   - オブジェクトのプロパティとして配列を使う方法
   - 配列要素へのアクセスと操作
   - オブジェクトの配列

3. **複雑なデータ構造**
   - ネストと配列の組み合わせ
   - 複雑なデータ構造のナビゲート
   - 実用的なデータ管理

4. **実践的なアプリケーション**
   - 住所管理システム
   - 学生成績管理システム
   - クラス管理システム

### 重要なポイント

- **データ構造の理解**: ネストした構造を図で視覚化することが重要
- **アクセスパス**: パスを順に辿ることでデータにアクセス
- **実用性**: 実際のデータは複雑な構造を持つことが多い
- **エラー回避**: 存在しないプロパティへのアクセスに注意

複雑なオブジェクトを扱えるようになることで、より現実的で実用的なデータを管理できるようになりました。次のレッスンでは、オブジェクトの配列について詳しく学んでいきます。
