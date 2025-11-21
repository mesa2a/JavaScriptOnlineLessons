# Lesson 113: 複数の処理

## 学習目標
- 関数内で複数の処理を順番に実行できるようになる
- 条件分岐やループを含む関数を作成できるようになる
- 処理の流れを理解する

## 関数内で複数の処理

これまでの関数は、シンプルな処理をしていました。しかし、実際のプログラミングでは、**複数の処理を順番に実行**することがよくあります。

### 基本的な例

```javascript
function processData() {
  // 処理1
  const name = '太郎';

  // 処理2
  const age = 25;

  // 処理3
  const message = name + 'さんは' + age + '歳です';

  // 処理4
  alert(message);
}

processData();
```

関数の中では、**上から順番に**処理が実行されます。

## 条件分岐を含む関数

関数の中で、if文を使った条件分岐もできます：

```javascript
function checkAge(age) {
  let message = '';

  if (age >= 20) {
    message = '成人です';
  } else {
    message = '未成年です';
  }

  alert(message);
}

checkAge(25);  // 成人です
checkAge(15);  // 未成年です
```

## ループを含む関数

関数の中で、forループを使うこともできます：

```javascript
function showNumbers(max) {
  for (let i = 1; i <= max; i++) {
    console.log(i);
  }
}

showNumbers(5);
// 出力:
// 1
// 2
// 3
// 4
// 5
```

## 実践例1: 成績判定

```javascript
function judgeScore(score) {
  // 処理1: 入力チェック
  if (score < 0 || score > 100) {
    alert('正しい点数を入力してください');
    return;  // ここで処理を終了
  }

  // 処理2: 評価を判定
  let grade = '';
  if (score >= 80) {
    grade = 'A';
  } else if (score >= 60) {
    grade = 'B';
  } else if (score >= 40) {
    grade = 'C';
  } else {
    grade = 'D';
  }

  // 処理3: メッセージを作成
  const message = '点数: ' + score + '点\n評価: ' + grade;

  // 処理4: 結果を表示
  alert(message);
}

judgeScore(85);  // 点数: 85点 評価: A
```

## 実践例2: 合計と平均を計算

```javascript
function calculateStats(numbers) {
  // 処理1: 合計を計算
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  // 処理2: 平均を計算
  const average = sum / numbers.length;

  // 処理3: 結果を表示
  alert('合計: ' + sum + '\n平均: ' + average);
}

const scores = [80, 90, 70];
calculateStats(scores);
// 合計: 240
// 平均: 80
```

## 早期リターン（Early Return）

条件が満たされない場合、早めに関数を終了させることができます：

```javascript
function divide(a, b) {
  // 処理1: ゼロ除算チェック
  if (b === 0) {
    alert('0で割ることはできません');
    return;  // ここで終了
  }

  // 処理2: 正常な計算
  const result = a / b;
  alert('結果: ' + result);
}

divide(10, 2);  // 結果: 5
divide(10, 0);  // 0で割ることはできません
```

## 変数のスコープ

関数の中で宣言した変数は、その関数の中でのみ使えます：

```javascript
function test() {
  const message = 'こんにちは';  // 関数内の変数
  console.log(message);  // OK
}

test();
console.log(message);  // エラー！messageは関数の外では使えない
```

## 練習問題

### 問題: BMI計算アプリを作ろう

以下の要件を満たすアプリを作成してください：

1. 身長（cm）と体重（kg）を入力するフォームがある
2. 「計算」ボタンを押すと、BMIと判定が表示される
3. `calculateBMI(height, weight)`関数を作成する
4. 関数内で以下の処理を順番に実行：
   - 入力チェック（0以下の値はエラー）
   - BMIを計算（体重 ÷ (身長/100)²）
   - BMIに応じた判定（18.5未満: やせ、25未満: 普通、25以上: 肥満）
   - 結果を表示

### ヒント

```javascript
function calculateBMI(height, weight) {
  // 処理1: 入力チェック
  if (height <= 0 || weight <= 0) {
    alert('正しい値を入力してください');
    return;
  }

  // 処理2: BMIを計算
  const heightM = height / 100;  // cmをmに変換
  const bmi = weight / (heightM * heightM);

  // 処理3: 判定
  let judgment = '';
  if (bmi < 18.5) {
    judgment = 'やせ';
  } else if (bmi < 25) {
    judgment = '普通';
  } else {
    judgment = '肥満';
  }

  // 処理4: 結果を表示
  const message = 'BMI: ' + bmi.toFixed(1) + '\n判定: ' + judgment;
  alert(message);
}
```

## まとめ

- 関数内で複数の処理を順番に実行できる
- 条件分岐（if文）を含む関数を作成できる
- ループ（for文）を含む関数を作成できる
- 早期リターンで、条件が満たされない場合に処理を終了できる
- 関数内の変数は、その関数の中でのみ使える

次のレッスンでは、**関数から関数を呼び出す**方法を学びます。

## 復習問題

1. 関数内で複数の処理を実行する場合、どの順番で実行されますか？
2. 早期リターン（Early Return）とは何ですか？
3. 関数内で宣言した変数は、関数の外から使えますか？
