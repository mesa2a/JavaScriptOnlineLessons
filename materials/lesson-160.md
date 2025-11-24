---
title: "Lesson 160: 収入管理"
author: "JavaScript学習教材"
date: "2025-11-23"
---

# Lesson 160: 収入管理

## 今回の学習

### 前回の復習

前回のレッスンでは、予算管理アプリの基本構造を作成しました。具体的には以下の内容を学習しました。

- **構造とスタイル**: HTMLで構造を作り、CSSで見た目を整える方法
- **UI実装**: タブメニュー、入力フォーム、一覧表示、統計エリアの実装
- **UIフレーム完成**: 美しい見た目のアプリケーションの骨組み

前回作成したUIフレームにより、アプリの全体像が見えるようになりました。

### 今回の目標

今回は、収入管理機能を実装します。ユーザーが収入を入力すると、一覧に表示され、合計金額も計算されるようにします。

今回の学習で達成する目標は以下の通りです。

- **収入入力機能**: フォームから収入データを追加する
- **カテゴリ分類**: カテゴリごとに色分けして表示する
- **月別集計**: 収入の合計金額を計算して表示する

## データ入力の基本

### フォームからデータを取得する

これまで、TODOアプリでフォームからデータを取得する方法を学びました。予算管理アプリでも同じ方法を使います。

```javascript
// 入力欄の要素を取得
const dateInput = document.getElementById('income-date');
const amountInput = document.getElementById('income-amount');
const categoryInput = document.getElementById('income-category');
const memoInput = document.getElementById('income-memo');

// 入力された値を取得
const date = dateInput.value;
const amount = amountInput.value;
const category = categoryInput.value;
const memo = memoInput.value;
```

**ポイント**
- `getElementById()`: IDで要素を取得する
- `.value`: 入力欄の値を取得する
- 日付は`type="date"`なので、`2025-11-23`のような形式で取得できる
- 金額は`type="number"`なので、数値として取得できる

### データの検証（バリデーション）

ユーザーが不正なデータを入力しないように、チェックを行います。

```javascript
// 日付が入力されているか
if (date === '') {
  alert('日付を入力してください');
  return;
}

// 金額が入力されているか
if (amount === '' || amount === '0') {
  alert('金額を入力してください');
  return;
}

// カテゴリが選択されているか
if (category === '') {
  alert('カテゴリを選択してください');
  return;
}

// 金額が正の数か
if (Number(amount) <= 0) {
  alert('金額は1円以上で入力してください');
  return;
}
```

**バリデーションの重要性**

バリデーションがないと、以下のような問題が起こります。

- 日付なしのデータが登録される
- 金額が0円や-100円のデータが登録される
- カテゴリなしのデータが登録される

これらのデータは、後で集計するときに困ります。最初にしっかりチェックすることで、データの品質を保ちます。

## データ構造の設計

### 収入データのオブジェクト

1件の収入データは、オブジェクトとして管理します。

```javascript
const income = {
  id: 1,                           // 一意なID
  type: 'income',                  // 種類（収入）
  date: '2025-11-23',             // 日付
  amount: 250000,                  // 金額
  category: '給料',                // カテゴリ
  memo: '11月分の給料'             // メモ
};
```

**各プロパティの役割**

- **id**: データを識別するための番号です。削除や編集のときに、どのデータかを特定します
- **type**: 'income'（収入）または'expense'（支出）を入れます。後で収入だけをフィルターするときに使います
- **date**: 日付を文字列で保存します。YYYY-MM-DD形式なので、並び替えが簡単です
- **amount**: 金額を数値で保存します。後で合計を計算するときに使います
- **category**: カテゴリ名を保存します。カテゴリ別の集計に使います
- **memo**: 自由なメモを保存します。空でも構いません

### データを配列で管理する

複数の収入データを配列で管理します。

```javascript
let transactions = [
  {
    id: 1,
    type: 'income',
    date: '2025-11-20',
    amount: 250000,
    category: '給料',
    memo: '11月分の給料'
  },
  {
    id: 2,
    type: 'income',
    date: '2025-11-15',
    amount: 100000,
    category: 'ボーナス',
    memo: '冬のボーナス'
  }
];
```

配列を使うことで、以下のような操作ができます。

- **追加**: `transactions.push(newIncome)` で新しいデータを追加
- **削除**: `transactions.splice(index, 1)` で指定した位置のデータを削除
- **検索**: `transactions.find()` で条件に合うデータを探す
- **フィルター**: `transactions.filter()` で条件に合うデータだけを取得

### IDの自動生成

新しいデータを追加するときは、IDを自動で生成します。

```javascript
function generateId() {
  if (transactions.length === 0) {
    return 1;
  }

  // 配列の中で最大のIDを探して、1を足す
  const maxId = Math.max(...transactions.map(function(t) {
    return t.id;
  }));

  return maxId + 1;
}
```

**IDの生成方法**

- データがないときは1を返す
- データがあるときは、最大のIDに1を足した値を返す
- これにより、IDが重複することを防ぎます

## 収入の追加機能

### addIncome関数の実装

収入を追加する関数を作ります。

```javascript
function addIncome() {
  // 入力値を取得
  const dateInput = document.getElementById('income-date');
  const amountInput = document.getElementById('income-amount');
  const categoryInput = document.getElementById('income-category');
  const memoInput = document.getElementById('income-memo');

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

  // 新しい収入データを作成
  const newIncome = {
    id: generateId(),
    type: 'income',
    date: date,
    amount: Number(amount),
    category: category,
    memo: memo
  };

  // 配列に追加
  transactions.push(newIncome);

  // localStorageに保存
  saveTransactions();

  // 画面を更新
  renderIncomeList();
  updateIncomeTotal();

  // 入力欄をクリア
  dateInput.value = '';
  amountInput.value = '';
  categoryInput.value = '';
  memoInput.value = '';

  alert('収入を追加しました');
}
```

**関数の流れ**

1. 入力値を取得する
2. バリデーションを行う
3. 新しいデータオブジェクトを作成する
4. 配列に追加する
5. localStorageに保存する
6. 画面を更新する
7. 入力欄をクリアする

### ボタンにイベントを設定

追加ボタンをクリックしたときに、`addIncome`関数を呼び出します。

```javascript
const addIncomeButton = document.getElementById('add-income-button');
addIncomeButton.addEventListener('click', addIncome);
```

## カテゴリ分類の実装

### カテゴリの色設定

各カテゴリに色を割り当てます。

```javascript
const incomeCategories = {
  '給料': '#4CAF50',
  'ボーナス': '#8BC34A',
  '副業': '#CDDC39',
  'お小遣い': '#FFC107',
  'その他': '#9E9E9E'
};
```

### カテゴリの色を取得する関数

```javascript
function getCategoryColor(category, type) {
  if (type === 'income') {
    return incomeCategories[category] || '#9E9E9E';
  }
  // 支出の場合は後のレッスンで実装
  return '#9E9E9E';
}
```

**カラーコードについて**

- `#4CAF50`: 緑色（給料）
- `#8BC34A`: 明るい緑（ボーナス）
- `#CDDC39`: 黄緑色（副業）
- `#FFC107`: オレンジ（お小遣い）
- `#9E9E9E`: グレー（その他）

色で区別することで、一覧を見たときに直感的にカテゴリが分かります。

## 収入一覧の表示

### renderIncomeList関数の実装

収入データを画面に表示する関数を作ります。

```javascript
function renderIncomeList() {
  const listContainer = document.getElementById('income-items');

  // 収入データだけをフィルター
  const incomes = transactions.filter(function(t) {
    return t.type === 'income';
  });

  // データがない場合
  if (incomes.length === 0) {
    listContainer.innerHTML = '<div class="empty-message">データがありません</div>';
    return;
  }

  // 日付順にソート（新しい順）
  incomes.sort(function(a, b) {
    return b.date.localeCompare(a.date);
  });

  // HTMLを生成
  let html = '';
  incomes.forEach(function(income) {
    const categoryColor = getCategoryColor(income.category, 'income');

    html += '<div class="transaction-item">';
    html += '  <span class="col-date">' + income.date + '</span>';
    html += '  <span class="col-category" style="background-color: ' + categoryColor + '">' + income.category + '</span>';
    html += '  <span class="col-amount income">¥' + formatCurrency(income.amount) + '</span>';
    html += '  <span class="col-memo">' + income.memo + '</span>';
    html += '  <span class="col-actions">';
    html += '    <button class="delete-button" onclick="deleteIncome(' + income.id + ')">削除</button>';
    html += '  </span>';
    html += '</div>';
  });

  listContainer.innerHTML = html;
}
```

**表示の流れ**

1. `filter()`で収入データだけを取得する
2. データがない場合は「データがありません」と表示する
3. `sort()`で日付順（新しい順）に並び替える
4. `forEach()`で各データをHTMLに変換する
5. カテゴリの色を設定する
6. 金額をフォーマットして表示する
7. HTMLを画面に反映する

### 金額のフォーマット関数

金額をカンマ区切りで表示する関数を作ります。

```javascript
function formatCurrency(amount) {
  return amount.toLocaleString('ja-JP');
}
```

**使用例**
- `250000` → `250,000`
- `3000` → `3,000`
- `500` → `500`

カンマがあると、金額が読みやすくなります。

## 月別集計の実装

### 収入合計を計算する関数

収入の合計金額を計算します。

```javascript
function calculateIncomeTotal() {
  let total = 0;

  transactions.forEach(function(t) {
    if (t.type === 'income') {
      total += t.amount;
    }
  });

  return total;
}
```

**計算の流れ**

1. 合計を0で初期化する
2. すべてのデータをループする
3. 収入データの場合、金額を合計に加算する
4. 合計を返す

### 収入合計を表示する関数

```javascript
function updateIncomeTotal() {
  const total = calculateIncomeTotal();
  const totalElement = document.getElementById('income-total');
  totalElement.textContent = '¥' + formatCurrency(total);
}
```

この関数を呼び出すと、画面の統計カードに合計金額が表示されます。

### 今月の収入を計算する（応用）

今月のデータだけを集計することもできます。

```javascript
function calculateMonthlyIncome(year, month) {
  let total = 0;

  transactions.forEach(function(t) {
    if (t.type === 'income') {
      const transactionDate = new Date(t.date);
      const transactionYear = transactionDate.getFullYear();
      const transactionMonth = transactionDate.getMonth() + 1;

      if (transactionYear === year && transactionMonth === month) {
        total += t.amount;
      }
    }
  });

  return total;
}
```

**月別集計の使い方**

```javascript
// 2025年11月の収入合計
const november2025 = calculateMonthlyIncome(2025, 11);
console.log('2025年11月の収入: ¥' + formatCurrency(november2025));
```

今回のレッスンでは全期間の合計を表示しますが、将来的に月別フィルターを追加するときにこの関数が役立ちます。

## 収入の削除機能

### deleteIncome関数の実装

収入データを削除する関数を作ります。

```javascript
function deleteIncome(id) {
  // 確認ダイアログを表示
  if (!confirm('この収入を削除しますか？')) {
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
    renderIncomeList();
    updateIncomeTotal();
    alert('収入を削除しました');
  }
}
```

**削除の流れ**

1. 確認ダイアログを表示する
2. キャンセルされた場合は何もしない
3. `findIndex()`でIDが一致するデータを探す
4. `splice()`で配列から削除する
5. localStorageに保存する
6. 画面を更新する

## データの永続化

### localStorageに保存する

```javascript
function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
```

### localStorageから読み込む

```javascript
function loadTransactions() {
  const saved = localStorage.getItem('transactions');
  if (saved) {
    transactions = JSON.parse(saved);
  }
}
```

### ページ読み込み時の初期化

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // データを読み込む
  loadTransactions();

  // 画面を更新
  renderIncomeList();
  updateIncomeTotal();

  // イベントリスナーを設定
  const addIncomeButton = document.getElementById('add-income-button');
  addIncomeButton.addEventListener('click', addIncome);

  // タブ切り替え機能（前回のレッスンで実装済み）
  setupTabs();
});
```

**初期化の流れ**

1. DOMContentLoadedイベントを待つ
2. localStorageからデータを読み込む
3. 収入一覧を表示する
4. 収入合計を表示する
5. ボタンにイベントリスナーを設定する

## 完成したコードの全体像

### JavaScript全体

```javascript
// グローバル変数
let transactions = [];

// カテゴリの色設定
const incomeCategories = {
  '給料': '#4CAF50',
  'ボーナス': '#8BC34A',
  '副業': '#CDDC39',
  'お小遣い': '#FFC107',
  'その他': '#9E9E9E'
};

// IDを生成する関数
function generateId() {
  if (transactions.length === 0) {
    return 1;
  }
  const maxId = Math.max(...transactions.map(function(t) {
    return t.id;
  }));
  return maxId + 1;
}

// 金額をフォーマットする関数
function formatCurrency(amount) {
  return amount.toLocaleString('ja-JP');
}

// カテゴリの色を取得する関数
function getCategoryColor(category, type) {
  if (type === 'income') {
    return incomeCategories[category] || '#9E9E9E';
  }
  return '#9E9E9E';
}

// 収入を追加する関数
function addIncome() {
  const dateInput = document.getElementById('income-date');
  const amountInput = document.getElementById('income-amount');
  const categoryInput = document.getElementById('income-category');
  const memoInput = document.getElementById('income-memo');

  const date = dateInput.value;
  const amount = amountInput.value;
  const category = categoryInput.value;
  const memo = memoInput.value;

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

  const newIncome = {
    id: generateId(),
    type: 'income',
    date: date,
    amount: Number(amount),
    category: category,
    memo: memo
  };

  transactions.push(newIncome);
  saveTransactions();
  renderIncomeList();
  updateIncomeTotal();

  dateInput.value = '';
  amountInput.value = '';
  categoryInput.value = '';
  memoInput.value = '';

  alert('収入を追加しました');
}

// 収入一覧を表示する関数
function renderIncomeList() {
  const listContainer = document.getElementById('income-items');

  const incomes = transactions.filter(function(t) {
    return t.type === 'income';
  });

  if (incomes.length === 0) {
    listContainer.innerHTML = '<div class="empty-message">データがありません</div>';
    return;
  }

  incomes.sort(function(a, b) {
    return b.date.localeCompare(a.date);
  });

  let html = '';
  incomes.forEach(function(income) {
    const categoryColor = getCategoryColor(income.category, 'income');

    html += '<div class="transaction-item">';
    html += '  <span class="col-date">' + income.date + '</span>';
    html += '  <span class="col-category" style="background-color: ' + categoryColor + '">' + income.category + '</span>';
    html += '  <span class="col-amount income">¥' + formatCurrency(income.amount) + '</span>';
    html += '  <span class="col-memo">' + income.memo + '</span>';
    html += '  <span class="col-actions">';
    html += '    <button class="delete-button" onclick="deleteIncome(' + income.id + ')">削除</button>';
    html += '  </span>';
    html += '</div>';
  });

  listContainer.innerHTML = html;
}

// 収入を削除する関数
function deleteIncome(id) {
  if (!confirm('この収入を削除しますか？')) {
    return;
  }

  const index = transactions.findIndex(function(t) {
    return t.id === id;
  });

  if (index !== -1) {
    transactions.splice(index, 1);
    saveTransactions();
    renderIncomeList();
    updateIncomeTotal();
    alert('収入を削除しました');
  }
}

// 収入合計を計算する関数
function calculateIncomeTotal() {
  let total = 0;
  transactions.forEach(function(t) {
    if (t.type === 'income') {
      total += t.amount;
    }
  });
  return total;
}

// 収入合計を表示する関数
function updateIncomeTotal() {
  const total = calculateIncomeTotal();
  const totalElement = document.getElementById('income-total');
  totalElement.textContent = '¥' + formatCurrency(total);
}

// localStorageに保存する関数
function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// localStorageから読み込む関数
function loadTransactions() {
  const saved = localStorage.getItem('transactions');
  if (saved) {
    transactions = JSON.parse(saved);
  }
}

// タブ切り替え機能
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');

      tabButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      tabPanes.forEach(function(pane) {
        pane.classList.remove('active');
      });

      this.classList.add('active');
      document.getElementById(targetTab + '-tab').classList.add('active');
    });
  });
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
  loadTransactions();
  renderIncomeList();
  updateIncomeTotal();

  const addIncomeButton = document.getElementById('add-income-button');
  addIncomeButton.addEventListener('click', addIncome);

  setupTabs();
});
```

## 練習問題

### 課題

収入管理機能を実装してください。収入の追加、表示、削除、合計計算ができるようにします。

### 保存場所

`exercises/lesson-160/` フォルダに以下のファイルが用意されています。

- `index.html` - HTMLファイル（前回のレッスンから継続）
- `style.css` - CSSファイル（前回のレッスンから継続）
- `script.js` - JavaScriptコードを記述するファイル

JavaScriptコードを `script.js` に記述してください。

### 手順

1. **収入入力機能**
   - フォームから入力値を取得する
   - バリデーションを実装する
   - 新しいデータオブジェクトを作成する
   - 配列に追加する

2. **カテゴリ分類**
   - カテゴリの色を設定する
   - カテゴリごとに色分けして表示する

3. **月別集計**
   - 収入の合計金額を計算する
   - 画面に合計を表示する

### ヒント

**データ構造のヒント**
- グローバル変数 `transactions` で全データを管理しましょう
- 各データには id, type, date, amount, category, memo を含めましょう
- typeは'income'を設定しましょう

**バリデーションのヒント**
- 空文字列のチェックには `value === ''` を使いましょう
- 数値のチェックには `Number(value) <= 0` を使いましょう
- エラー時は `alert()` でメッセージを表示しましょう

**表示のヒント**
- `filter()` で収入データだけを取得しましょう
- `sort()` で日付順に並び替えましょう
- `forEach()` でHTMLを生成しましょう
- カテゴリの色は `style="background-color: 色"` で設定しましょう

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-160
```

すべてのテストがパス（✓マーク）すれば完成です。

## まとめ

お疲れ様でした。今回のレッスンでは、収入管理機能を実装しました。

**今回学んだキーポイント**

**データ入力**
フォームからデータを取得し、バリデーションを行い、配列に追加する一連の流れを学びました。バリデーションは、データの品質を保つために非常に重要です。空のデータや不正なデータを防ぐことで、後の処理がスムーズになります。

**分類処理**
カテゴリごとに色を設定し、視覚的に区別する方法を学びました。オブジェクトを使ってカテゴリと色を紐付けることで、コードが整理されます。色分けすることで、ユーザーは一覧を見たときに直感的に情報を把握できます。

**データ構造の設計**
オブジェクトと配列を使って、複数のデータを効率的に管理する方法を学びました。各データにIDを付けることで、後で編集や削除がしやすくなります。typeプロパティを使うことで、収入と支出を同じ配列で管理できます。

**合計計算**
配列をループして、条件に合うデータの金額を合計する方法を学びました。`forEach()`を使うと、すべてのデータを順番に処理できます。typeで収入だけをフィルターすることで、正確な合計を計算できます。

**データの永続化**
localStorageを使って、ブラウザを閉じてもデータが残るようにしました。これにより、実用的なアプリケーションになります。JSON形式で保存することで、複雑なデータ構造も扱えます。

今回実装した収入管理機能は、予算管理アプリの核となる機能です。次のレッスンでは、支出管理機能を実装します。収入と支出の両方を記録できるようになると、家計の全体像が見えるようになります。
