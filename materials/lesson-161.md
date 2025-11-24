---
title: "Lesson 161: 支出管理"
author: "JavaScript学習教材"
date: "2025-11-23"
---

# Lesson 161: 支出管理

## 今回の学習

### 前回の復習

前回のレッスンでは、収入管理機能を実装しました。具体的には以下の内容を学習しました。

- **データ入力**: フォームからデータを取得し、バリデーションを行う
- **分類処理**: カテゴリごとに色分けして表示する
- **収入機能完成**: 収入の追加、表示、削除、合計計算ができる

前回作成した収入管理機能により、予算管理アプリの基礎ができました。

### 今回の目標

今回は、支出管理機能を実装します。収入管理機能とほぼ同じ構造ですが、カテゴリが異なり、金額の表示色も変わります。

今回の学習で達成する目標は以下の通りです。

- **支出入力機能**: フォームから支出データを追加する
- **カテゴリ別**: 支出のカテゴリごとに色分けして表示する
- **日付管理**: 日付順に並び替えて表示する

## 収入と支出の共通化

### コードの再利用

収入管理機能と支出管理機能は、ほとんど同じ処理を行います。違いは以下の点だけです。

- **type**: 'income'か'expense'か
- **カテゴリ**: 収入と支出で異なるカテゴリ
- **色**: 収入は緑色、支出は赤色

プログラミングでは、同じような処理を何度も書くのではなく、共通の関数を作って再利用します。これにより、コードが短くなり、メンテナンスしやすくなります。

### DRY原則

「Don't Repeat Yourself（同じことを繰り返さない）」という原則があります。同じコードを2回書くのではなく、1つの関数にまとめて、引数で違いを吸収します。

例えば、収入と支出で別々の関数を作るのではなく、typeを引数で受け取る共通の関数を作ります。

```javascript
// 悪い例：収入と支出で別々の関数
function addIncome() {
  // 収入を追加する処理
}

function addExpense() {
  // 支出を追加する処理（ほぼ同じ）
}

// 良い例：共通の関数
function addTransaction(type) {
  // typeに応じて処理を分ける
}
```

ただし、今回のレッスンでは学習のため、収入と支出で別々の関数を作ります。実際の開発では、共通化を検討しましょう。

## 支出カテゴリの設定

### 支出のカテゴリと色

支出のカテゴリは、収入よりも多くなります。生活にはさまざまな支出があるためです。

```javascript
const expenseCategories = {
  '食費': '#F44336',
  '交通費': '#E91E63',
  '娯楽': '#9C27B0',
  '光熱費': '#673AB7',
  '家賃': '#3F51B5',
  '通信費': '#2196F3',
  '医療費': '#03A9F4',
  '日用品': '#00BCD4',
  '被服費': '#009688',
  'その他': '#9E9E9E'
};
```

**色の選び方**

- 赤系の色を中心に選んでいます（支出のイメージ）
- 各カテゴリが区別しやすいように、異なる色相を使っています
- 'その他'はグレーにして、目立たないようにしています

### getCategoryColor関数の更新

収入と支出の両方に対応するように、関数を更新します。

```javascript
function getCategoryColor(category, type) {
  if (type === 'income') {
    return incomeCategories[category] || '#9E9E9E';
  } else if (type === 'expense') {
    return expenseCategories[category] || '#9E9E9E';
  }
  return '#9E9E9E';
}
```

**関数の説明**

- typeが'income'なら、収入カテゴリから色を取得
- typeが'expense'なら、支出カテゴリから色を取得
- カテゴリが見つからない場合は、グレーを返す

## 支出の追加機能

### addExpense関数の実装

支出を追加する関数を作ります。収入の追加とほぼ同じですが、IDが異なります。

```javascript
function addExpense() {
  // 入力値を取得
  const dateInput = document.getElementById('expense-date');
  const amountInput = document.getElementById('expense-amount');
  const categoryInput = document.getElementById('expense-category');
  const memoInput = document.getElementById('expense-memo');

  const date = dateInput.value;
  const amount = amountInput.value;
  const category = categoryInput.value;
  const memo = memoInput.value;

  // バリデーション
  if (date === '') {
    alert('日付を入力してください');
    return;
  }

  if (amount === '' || amount === '0') {
    alert('金額を入力してください');
    return;
  }

  if (Number(amount) <= 0) {
    alert('金額は1円以上で入力してください');
    return;
  }

  if (category === '') {
    alert('カテゴリを選択してください');
    return;
  }

  // 新しい支出データを作成
  const newExpense = {
    id: generateId(),
    type: 'expense',
    date: date,
    amount: Number(amount),
    category: category,
    memo: memo
  };

  // 配列に追加
  transactions.push(newExpense);

  // localStorageに保存
  saveTransactions();

  // 画面を更新
  renderExpenseList();
  updateExpenseTotal();
  updateStats();

  // 入力欄をクリア
  dateInput.value = '';
  amountInput.value = '';
  categoryInput.value = '';
  memoInput.value = '';

  alert('支出を追加しました');
}
```

**収入との違い**

- IDは`expense-date`、`expense-amount`など（収入は`income-`）
- typeは`'expense'`を設定
- `renderExpenseList()`と`updateExpenseTotal()`を呼び出す

### ボタンにイベントを設定

```javascript
const addExpenseButton = document.getElementById('add-expense-button');
addExpenseButton.addEventListener('click', addExpense);
```

## 支出一覧の表示

### renderExpenseList関数の実装

支出データを画面に表示する関数を作ります。

```javascript
function renderExpenseList() {
  const listContainer = document.getElementById('expense-items');

  // 支出データだけをフィルター
  const expenses = transactions.filter(function(t) {
    return t.type === 'expense';
  });

  // データがない場合
  if (expenses.length === 0) {
    listContainer.innerHTML = '<div class="empty-message">データがありません</div>';
    return;
  }

  // 日付順にソート（新しい順）
  expenses.sort(function(a, b) {
    return b.date.localeCompare(a.date);
  });

  // HTMLを生成
  let html = '';
  expenses.forEach(function(expense) {
    const categoryColor = getCategoryColor(expense.category, 'expense');

    html += '<div class="transaction-item">';
    html += '  <span class="col-date">' + expense.date + '</span>';
    html += '  <span class="col-category" style="background-color: ' + categoryColor + '">' + expense.category + '</span>';
    html += '  <span class="col-amount expense">¥' + formatCurrency(expense.amount) + '</span>';
    html += '  <span class="col-memo">' + expense.memo + '</span>';
    html += '  <span class="col-actions">';
    html += '    <button class="delete-button" onclick="deleteExpense(' + expense.id + ')">削除</button>';
    html += '  </span>';
    html += '</div>';
  });

  listContainer.innerHTML = html;
}
```

**収入との違い**

- `type === 'expense'`でフィルター
- `expense-items`に表示
- `col-amount expense`クラスで赤色に表示
- `deleteExpense()`関数を呼び出す

### 日付のソート

日付順に並び替える処理について詳しく見てみましょう。

```javascript
expenses.sort(function(a, b) {
  return b.date.localeCompare(a.date);
});
```

**localeCompareメソッド**

- 文字列を比較するメソッドです
- `a.localeCompare(b)`は、aがbより小さい場合は負の数、大きい場合は正の数を返します
- 日付が`YYYY-MM-DD`形式なら、文字列として比較できます

**新しい順にソート**

- `b.date.localeCompare(a.date)`とすることで、降順（新しい順）になります
- `a.date.localeCompare(b.date)`なら、昇順（古い順）になります

例えば、以下のようにソートされます。

```
2025-11-23  ← 新しい
2025-11-20
2025-11-15  ← 古い
```

## 支出の削除機能

### deleteExpense関数の実装

```javascript
function deleteExpense(id) {
  // 確認ダイアログを表示
  if (!confirm('この支出を削除しますか？')) {
    return;
  }

  // IDが一致するデータのインデックスを探す
  const index = transactions.findIndex(function(t) {
    return t.id === id;
  });

  // データが見つかった場合
  if (index !== -1) {
    transactions.splice(index, 1);
    saveTransactions();
    renderExpenseList();
    updateExpenseTotal();
    updateStats();
    alert('支出を削除しました');
  }
}
```

収入の削除とほぼ同じですが、`renderExpenseList()`と`updateExpenseTotal()`を呼び出します。

## 支出の合計計算

### calculateExpenseTotal関数の実装

```javascript
function calculateExpenseTotal() {
  let total = 0;

  transactions.forEach(function(t) {
    if (t.type === 'expense') {
      total += t.amount;
    }
  });

  return total;
}
```

### updateExpenseTotal関数の実装

```javascript
function updateExpenseTotal() {
  const total = calculateExpenseTotal();
  const totalElement = document.getElementById('expense-total');
  totalElement.textContent = '¥' + formatCurrency(total);
}
```

## 統計タブの更新

### 収支の計算

収入と支出の両方がある場合、収支（バランス）を計算します。

```javascript
function calculateBalance() {
  const income = calculateIncomeTotal();
  const expense = calculateExpenseTotal();
  return income - expense;
}
```

**収支の意味**

- **プラス（正の数）**: 収入が支出より多い（貯金ができている）
- **ゼロ**: 収入と支出が同じ（収支トントン）
- **マイナス（負の数）**: 支出が収入より多い（赤字）

### updateStats関数の実装

統計タブの情報を更新する関数を作ります。

```javascript
function updateStats() {
  const income = calculateIncomeTotal();
  const expense = calculateExpenseTotal();
  const balance = calculateBalance();

  // 統計タブの値を更新
  const statsIncomeElement = document.getElementById('stats-income');
  const statsExpenseElement = document.getElementById('stats-expense');
  const balanceElement = document.getElementById('balance');

  statsIncomeElement.textContent = '¥' + formatCurrency(income);
  statsExpenseElement.textContent = '¥' + formatCurrency(expense);
  balanceElement.textContent = '¥' + formatCurrency(balance);

  // 収支がプラスかマイナスかで色を変える
  balanceElement.classList.remove('positive', 'negative');
  if (balance > 0) {
    balanceElement.classList.add('positive');
  } else if (balance < 0) {
    balanceElement.classList.add('negative');
  }
}
```

**色の切り替え**

- `classList.remove('positive', 'negative')`: 既存のクラスを削除
- 収支がプラスなら`positive`クラスを追加（緑色）
- 収支がマイナスなら`negative`クラスを追加（赤色）

CSSでは以下のように定義されています。

```css
.balance-card .stat-value.positive {
  color: #4CAF50; /* 緑色 */
}

.balance-card .stat-value.negative {
  color: #F44336; /* 赤色 */
}
```

## カテゴリ別集計

### カテゴリごとの合計を計算

各カテゴリの支出合計を計算する関数を作ります。

```javascript
function calculateExpenseByCategory() {
  const result = {};

  transactions.forEach(function(t) {
    if (t.type === 'expense') {
      if (result[t.category]) {
        result[t.category] += t.amount;
      } else {
        result[t.category] = t.amount;
      }
    }
  });

  return result;
}
```

**使用例**

```javascript
const categoryTotals = calculateExpenseByCategory();
console.log(categoryTotals);
// { '食費': 15000, '交通費': 3000, '娯楽': 5000 }
```

**計算の流れ**

1. 空のオブジェクト`result`を作成
2. すべてのトランザクションをループ
3. 支出データの場合、カテゴリごとに金額を加算
4. カテゴリが初めて出てきた場合は、新しいプロパティを作成
5. オブジェクトを返す

このデータは、次のレッスンでグラフ表示に使用します。

## 日付の扱い

### 日付の入力

HTMLの`<input type="date">`を使うと、ブラウザが日付ピッカーを表示してくれます。

```html
<input type="date" id="expense-date" class="form-input">
```

ユーザーはカレンダーから日付を選べるので、入力が簡単になります。

### 今日の日付を自動設定

ページを開いたときに、今日の日付を自動で設定すると便利です。

```javascript
function setTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateString = year + '-' + month + '-' + day;

  const incomeDateInput = document.getElementById('income-date');
  const expenseDateInput = document.getElementById('expense-date');

  if (incomeDateInput) {
    incomeDateInput.value = dateString;
  }
  if (expenseDateInput) {
    expenseDateInput.value = dateString;
  }
}
```

**日付の作成**

- `new Date()`: 現在の日時を取得
- `getFullYear()`: 年を取得（2025）
- `getMonth()`: 月を取得（0-11なので、+1する）
- `getDate()`: 日を取得（1-31）
- `padStart(2, '0')`: 1桁の場合は0を付ける（5 → 05）
- `YYYY-MM-DD`形式の文字列を作成

### 初期化時に日付を設定

```javascript
document.addEventListener('DOMContentLoaded', function() {
  loadTransactions();
  setTodayDate();
  renderIncomeList();
  renderExpenseList();
  updateIncomeTotal();
  updateExpenseTotal();
  updateStats();

  // イベントリスナーを設定
  const addIncomeButton = document.getElementById('add-income-button');
  const addExpenseButton = document.getElementById('add-expense-button');

  addIncomeButton.addEventListener('click', addIncome);
  addExpenseButton.addEventListener('click', addExpense);

  setupTabs();
});
```

## 完成したコードの全体像

### 主要な関数のまとめ

**データ管理**
- `transactions`: すべてのデータを管理する配列
- `generateId()`: 新しいIDを生成
- `saveTransactions()`: localStorageに保存
- `loadTransactions()`: localStorageから読み込み

**収入管理**
- `addIncome()`: 収入を追加
- `renderIncomeList()`: 収入一覧を表示
- `deleteIncome(id)`: 収入を削除
- `calculateIncomeTotal()`: 収入合計を計算
- `updateIncomeTotal()`: 収入合計を表示

**支出管理**
- `addExpense()`: 支出を追加
- `renderExpenseList()`: 支出一覧を表示
- `deleteExpense(id)`: 支出を削除
- `calculateExpenseTotal()`: 支出合計を計算
- `updateExpenseTotal()`: 支出合計を表示

**統計**
- `calculateBalance()`: 収支を計算
- `updateStats()`: 統計タブを更新
- `calculateExpenseByCategory()`: カテゴリ別集計

**ユーティリティ**
- `formatCurrency(amount)`: 金額をフォーマット
- `getCategoryColor(category, type)`: カテゴリの色を取得
- `setTodayDate()`: 今日の日付を設定

## 練習問題

### 課題

支出管理機能を実装してください。支出の追加、表示、削除、合計計算ができるようにします。また、統計タブで収支を計算して表示します。

### 保存場所

`exercises/lesson-161/` フォルダに以下のファイルが用意されています。

- `index.html` - HTMLファイル（前回のレッスンから継続）
- `style.css` - CSSファイル（前回のレッスンから継続）
- `script.js` - JavaScriptコードを記述するファイル

JavaScriptコードを `script.js` に記述してください。前回の収入管理機能に、支出管理機能を追加します。

### 手順

1. **支出入力機能**
   - 支出カテゴリの色を定義する
   - getCategoryColor関数を更新する
   - addExpense関数を実装する
   - ボタンにイベントを設定する

2. **カテゴリ別**
   - 支出一覧を表示する関数を実装する
   - カテゴリごとに色分けして表示する
   - 支出を削除する関数を実装する

3. **日付管理**
   - 日付順にソートする
   - 今日の日付を自動設定する
   - 支出合計を計算して表示する
   - 統計タブで収支を計算する

### ヒント

**支出カテゴリのヒント**
- 収入カテゴリと同じように、オブジェクトで定義しましょう
- 赤系の色を使いましょう
- カテゴリ名とカラーコードをペアにしましょう

**支出追加のヒント**
- addIncome関数を参考にしましょう
- IDの取得は`expense-date`などに変更しましょう
- typeは`'expense'`を設定しましょう

**統計のヒント**
- 収入合計と支出合計の差を計算しましょう
- 収支がプラスなら`positive`、マイナスなら`negative`クラスを追加しましょう
- `classList.add()`と`classList.remove()`を使いましょう

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-161
```

すべてのテストがパス（✓マーク）すれば完成です。

## まとめ

お疲れ様でした。今回のレッスンでは、支出管理機能を実装しました。

**今回学んだキーポイント**

**データ管理**
収入と支出を同じ配列で管理する方法を学びました。typeプロパティで区別することで、1つの配列ですべてのデータを扱えます。これにより、コードがシンプルになり、データの管理がしやすくなります。

**日付処理**
日付のソート、今日の日付の自動設定など、日付を扱う方法を学びました。YYYY-MM-DD形式にすることで、文字列として比較できます。`localeCompare()`を使うと、日付順に並び替えられます。

**カテゴリ別表示**
支出のカテゴリごとに色分けして表示する方法を学びました。getCategoryColor関数を更新することで、収入と支出の両方に対応できます。色で区別することで、視覚的に情報を把握しやすくなります。

**収支の計算**
収入と支出の差を計算して、収支を表示する方法を学びました。収支がプラスかマイナスかで色を変えることで、家計の状況が一目で分かります。これは、ユーザーエクスペリエンスを向上させる重要な機能です。

**コードの再利用**
収入と支出の管理は、ほとんど同じ処理です。今回は別々の関数を作りましたが、実際の開発では共通化を検討します。DRY原則（Don't Repeat Yourself）を意識することで、メンテナンスしやすいコードになります。

今回で、予算管理アプリの基本機能が完成しました。収入と支出を記録して、合計や収支を確認できるようになりました。次のレッスンでは、グラフ表示機能を実装します。データをビジュアルに表現することで、さらに分かりやすいアプリになります。
