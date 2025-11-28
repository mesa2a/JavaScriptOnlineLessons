---
title: "Lesson 160: 収入管理"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# Lesson 160: 収入管理

## 今回の学習内容

### 学習の目標

今回のレッスンでは、**収入管理機能**を実装します。前回作成したUIフレームに、実際に動く機能を追加していきます。

今回学ぶ内容：

1. **収入入力機能** - フォームから収入データを追加する
2. **カテゴリ分類** - カテゴリごとに色分けして表示する
3. **月別集計** - 収入の合計金額を計算して表示する

### 前回の復習

前回のレッスンでは、予算管理アプリの基本構造を作成しました。

- **HTML/CSS作成** - タブメニュー、入力フォーム、一覧表示、統計カードを作成
- **レイアウト構築** - FlexboxとGrid Layoutで美しくレイアウト
- **スタイル適用** - 色、フォント、ホバー効果、レスポンシブ対応

前回作成したUIフレームにより、アプリの全体像が見えるようになりました。今回は、このUIに実際の機能を追加します。

## 日常生活の例

### 例1：お小遣い帳をつける

お小遣い帳をつけることを想像してください。

**紙のお小遣い帳：**
```
1. お金をもらったら記録する
   - 日付を書く（11月26日）
   - 金額を書く（1000円）
   - もらった理由を書く（お手伝い）

2. 記録を見返す
   - ノートを開く
   - 今月いくらもらったか数える
   - 1000 + 500 + 300 = 1800円

3. 間違えたら消す
   - 消しゴムで消す
   - または線を引いて削除
```

**Webアプリのお小遣い帳：**
```
1. お金をもらったら記録する
   - フォームに入力
   - 追加ボタンをクリック
   - 自動で一覧に追加される

2. 記録を見返す
   - 一覧が表示される
   - 合計が自動で計算される
   - 1,800円と表示

3. 間違えたら削除
   - 削除ボタンをクリック
   - 確認して削除
   - 合計も自動で更新
```

今回のレッスンで、このWebアプリのお小遣い帳を作ります。

### 例2：レシートを整理する

レシートを整理することを考えてみましょう。

**紙でレシートを整理：**
```
1. レシートをもらう
   - お店でレシートをもらう
   - 財布に入れる

2. 家で整理する
   - レシートを取り出す
   - ノートに書き写す
   - 日付、金額、お店、カテゴリ

3. カテゴリ別に分ける
   - 食費のレシートを集める
   - 交通費のレシートを集める
   - それぞれ合計する
```

**アプリでレシートを整理：**
```
1. レシートをもらう
   - お店でレシートをもらう
   - アプリに入力

2. 自動で整理される
   - 日付順に並ぶ
   - カテゴリごとに色分け
   - 合計が自動計算

3. カテゴリ別に見る
   - 食費だけを表示
   - 交通費だけを表示
   - ワンクリックで切り替え
```

今回のレッスンで、このような便利な機能を実装します。

### 例3：貯金箱にお金を入れる

貯金箱にお金を入れることを想像してください。

**実際の貯金箱：**
```
1. お金をもらう
   - お年玉で1000円もらった
   - 貯金箱に入れる

2. いくら貯まったか確認
   - 貯金箱を開ける
   - お金を数える
   - 1000 + 500 + 300 = 1800円

3. 間違えて入れた
   - 貯金箱を開ける
   - お金を取り出す
   - もう一度数え直す
```

**アプリの貯金箱：**
```
1. お金をもらう
   - お年玉で1000円もらった
   - アプリに記録

2. いくら貯まったか確認
   - 画面を見る
   - 1,800円と表示
   - 自動で計算されている

3. 間違えて入れた
   - 削除ボタンをクリック
   - 合計が自動で更新される
   - 数え直し不要
```

アプリを使うと、簡単に正確に記録できます。

## データ入力の基本

### フォームからデータを取得する

HTMLの入力フォームから値を取得する方法を学びます。

**HTML（入力フォーム）：**
```html
<input type="date" id="income-date">
<input type="number" id="income-amount">
<select id="income-category">
  <option value="給料">給料</option>
</select>
<input type="text" id="income-memo">
```

**JavaScript（値の取得）：**
```javascript
// 入力欄の要素を取得
const dateInput = document.getElementById('income-date');
const amountInput = document.getElementById('income-amount');
const categoryInput = document.getElementById('income-category');
const memoInput = document.getElementById('income-memo');

// 入力された値を取得
const date = dateInput.value;          // '2025-11-26'
const amount = amountInput.value;      // '250000'
const category = categoryInput.value;  // '給料'
const memo = memoInput.value;          // '11月分の給料'
```

**実行の流れ：**

```
ステップ1：要素を取得
document.getElementById('income-date')
  ↓
<input type="date" id="income-date">という要素を取得

ステップ2：値を取得
dateInput.value
  ↓
ユーザーが入力した値を取得
'2025-11-26'
```

### データの検証（バリデーション）

ユーザーが不正なデータを入力しないように、チェックを行います。

**バリデーションの例：**

```javascript
// 日付が入力されているかチェック
if (date === '') {
  alert('日付を入力してください');
  return;  // ここで処理を中断
}

// 金額が入力されているかチェック
if (amount === '' || amount === '0') {
  alert('金額を入力してください');
  return;
}

// 金額が正の数かチェック
if (Number(amount) <= 0) {
  alert('金額は1円以上で入力してください');
  return;
}

// カテゴリが選択されているかチェック
if (category === '') {
  alert('カテゴリを選択してください');
  return;
}

// すべてのチェックに合格
console.log('バリデーションOK！');
```

**実行の流れ（視覚的な変化）：**

```
入力値：date = '', amount = '1000', category = '給料'

チェック1：日付が空？
if (date === '')  // true
  ↓
alert('日付を入力してください')
  ↓
return（ここで処理終了）

以降の処理は実行されない
```

**バリデーションの重要性：**

```
バリデーションなし：
- 日付なしのデータが登録される
- 金額0円のデータが登録される
- カテゴリなしのデータが登録される
→ 後で集計するときに困る

バリデーションあり：
- 必ず日付が入力される
- 必ず金額が入力される
- 必ずカテゴリが選択される
→ データの品質が保たれる
```

## データ構造の設計

### 収入データのオブジェクト

1件の収入データは、オブジェクトとして管理します。

```javascript
const income = {
  id: 1,                           // 一意なID
  type: 'income',                  // 種類（収入）
  date: '2025-11-26',             // 日付
  amount: 250000,                  // 金額
  category: '給料',                // カテゴリ
  memo: '11月分の給料'             // メモ
};
```

**各プロパティの役割：**

```
id（アイディー）:
- データを識別するための番号
- 削除や編集のときに、どのデータかを特定する
- 例：1, 2, 3, 4...

type（タイプ）:
- 'income'（収入）または 'expense'（支出）
- 後で収入だけをフィルターするときに使う
- 例：type === 'income' で収入だけ取得

date（デート）:
- 日付を文字列で保存
- YYYY-MM-DD形式（2025-11-26）
- この形式だと並び替えが簡単

amount（アマウント）:
- 金額を数値で保存
- 文字列ではなく数値にすることで計算しやすい
- 例：250000（25万円）

category（カテゴリー）:
- カテゴリ名を保存
- 例：'給料', 'ボーナス', '副業'
- カテゴリ別の集計に使う

memo（メモ）:
- 自由なメモを保存
- 空でも構わない
- 例：'11月分の給料', 'ボーナス（冬）'
```

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
  },
  {
    id: 3,
    type: 'income',
    date: '2025-11-10',
    amount: 30000,
    category: '副業',
    memo: '副業収入'
  }
];
```

**配列を使うメリット：**

```
操作1：追加
transactions.push(newIncome);
  ↓
配列の最後に新しいデータを追加

操作2：削除
transactions.splice(index, 1);
  ↓
指定した位置のデータを削除

操作3：検索
transactions.find(t => t.id === 1);
  ↓
IDが1のデータを探す

操作4：フィルター
transactions.filter(t => t.type === 'income');
  ↓
収入データだけを取得
```

### IDの自動生成

新しいデータを追加するときは、IDを自動で生成します。

```javascript
function generateId() {
  // データがない場合は1を返す
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

**実行の流れ：**

```
transactions = [
  { id: 1, ... },
  { id: 2, ... },
  { id: 3, ... }
]

ステップ1：各データのIDを取得
transactions.map(function(t) { return t.id; })
  ↓
[1, 2, 3]

ステップ2：最大値を探す
Math.max(...[1, 2, 3])
  ↓
3

ステップ3：1を足す
3 + 1
  ↓
4

新しいデータのIDは4
```

**IDが重複しない仕組み：**

```
現在のデータ：
id: 1, 2, 3

generateId()を呼ぶ
  ↓
最大ID：3
  ↓
3 + 1 = 4
  ↓
新しいID：4

次にgenerateId()を呼ぶ
  ↓
最大ID：4
  ↓
4 + 1 = 5
  ↓
新しいID：5

常に最大ID + 1なので、重複しない
```

## 収入の追加機能

### addIncome関数の実装

収入を追加する関数を作ります。

```javascript
function addIncome() {
  // ステップ1：入力値を取得
  const dateInput = document.getElementById('income-date');
  const amountInput = document.getElementById('income-amount');
  const categoryInput = document.getElementById('income-category');
  const memoInput = document.getElementById('income-memo');

  const date = dateInput.value;
  const amount = amountInput.value;
  const category = categoryInput.value;
  const memo = memoInput.value;

  // ステップ2：バリデーション
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

  // ステップ3：新しいデータオブジェクトを作成
  const newIncome = {
    id: generateId(),
    type: 'income',
    date: date,
    amount: Number(amount),  // 文字列を数値に変換
    category: category,
    memo: memo
  };

  // ステップ4：配列に追加
  transactions.push(newIncome);

  // ステップ5：localStorageに保存
  saveTransactions();

  // ステップ6：画面を更新
  renderIncomeList();
  updateIncomeTotal();

  // ステップ7：入力欄をクリア
  dateInput.value = '';
  amountInput.value = '';
  categoryInput.value = '';
  memoInput.value = '';

  alert('収入を追加しました');
}
```

**実行の流れ（視覚的な変化）：**

```
ユーザーがフォームに入力：
日付：2025-11-26
金額：250000
カテゴリ：給料
メモ：11月分

追加ボタンをクリック
  ↓
addIncome()が呼ばれる
  ↓
バリデーションチェック（すべてOK）
  ↓
newIncome = {
  id: 4,
  type: 'income',
  date: '2025-11-26',
  amount: 250000,
  category: '給料',
  memo: '11月分'
}
  ↓
transactions.push(newIncome)
  ↓
transactions = [
  { id: 1, ... },
  { id: 2, ... },
  { id: 3, ... },
  { id: 4, ... }  ← 追加された
]
  ↓
画面が更新される
  ↓
一覧に新しいデータが表示される
```

### ボタンにイベントを設定

追加ボタンをクリックしたときに、`addIncome`関数を呼び出します。

```javascript
// ボタンの要素を取得
const addIncomeButton = document.getElementById('add-income-button');

// クリックイベントを設定
addIncomeButton.addEventListener('click', addIncome);
```

**実行の流れ：**

```
ページ読み込み時：
addIncomeButton.addEventListener('click', addIncome);
  ↓
ボタンにクリックイベントが登録される

ユーザーがボタンをクリック：
  ↓
addIncome()が自動で呼ばれる
  ↓
収入が追加される
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

**カラーコードについて：**

```
#4CAF50（濃い緑）
  ↓
給料（メインの収入）

#8BC34A（明るい緑）
  ↓
ボーナス（臨時の収入）

#CDDC39（黄緑）
  ↓
副業（副収入）

#FFC107（オレンジ）
  ↓
お小遣い（少額の収入）

#9E9E9E（グレー）
  ↓
その他（分類不明）
```

### カテゴリの色を取得する関数

```javascript
function getCategoryColor(category, type) {
  if (type === 'income') {
    // incomeCategories オブジェクトからカテゴリの色を取得
    // カテゴリが見つからない場合は #9E9E9E（グレー）を返す
    return incomeCategories[category] || '#9E9E9E';
  }
  // 支出の場合は後のレッスンで実装
  return '#9E9E9E';
}
```

**実行の流れ：**

```
getCategoryColor('給料', 'income')
  ↓
type === 'income' は true
  ↓
incomeCategories['給料']
  ↓
'#4CAF50'

getCategoryColor('不明なカテゴリ', 'income')
  ↓
type === 'income' は true
  ↓
incomeCategories['不明なカテゴリ']
  ↓
undefined
  ↓
|| '#9E9E9E' により
  ↓
'#9E9E9E'（グレー）
```

**色分けの効果：**

```
一覧表示：
┌──────────────────────────────┐
│2025-11-20  給料（緑）  ¥250,000│
│2025-11-15  ボーナス（明緑）  ¥100,000│
│2025-11-10  副業（黄緑）  ¥30,000│
└──────────────────────────────┘

色を見ただけでカテゴリが分かる！
```

## 収入一覧の表示

### renderIncomeList関数の実装

収入データを画面に表示する関数を作ります。

```javascript
function renderIncomeList() {
  // ステップ1：表示先の要素を取得
  const listContainer = document.getElementById('income-items');

  // ステップ2：収入データだけをフィルター
  const incomes = transactions.filter(function(t) {
    return t.type === 'income';
  });

  // ステップ3：データがない場合の処理
  if (incomes.length === 0) {
    listContainer.innerHTML = '<div class="empty-message">データがありません</div>';
    return;
  }

  // ステップ4：日付順にソート（新しい順）
  incomes.sort(function(a, b) {
    return b.date.localeCompare(a.date);
  });

  // ステップ5：HTMLを生成
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

  // ステップ6：HTMLを画面に反映
  listContainer.innerHTML = html;
}
```

**実行の流れ：**

```
transactions = [
  { id: 1, type: 'income', date: '2025-11-20', amount: 250000, category: '給料', memo: '11月分' },
  { id: 2, type: 'expense', date: '2025-11-21', amount: 3000, category: '食費', memo: '昼食' },
  { id: 3, type: 'income', date: '2025-11-15', amount: 100000, category: 'ボーナス', memo: '冬' }
]

ステップ1：収入だけをフィルター
incomes = transactions.filter(t => t.type === 'income')
  ↓
incomes = [
  { id: 1, type: 'income', ... },
  { id: 3, type: 'income', ... }
]

ステップ2：日付順にソート（新しい順）
incomes.sort((a, b) => b.date.localeCompare(a.date))
  ↓
incomes = [
  { id: 1, date: '2025-11-20', ... },  ← 11月20日（新しい）
  { id: 3, date: '2025-11-15', ... }   ← 11月15日（古い）
]

ステップ3：HTMLを生成
forEach で各データをHTMLに変換
  ↓
html = '<div class="transaction-item">...</div><div class="transaction-item">...</div>'

ステップ4：画面に反映
listContainer.innerHTML = html
  ↓
画面に一覧が表示される
```

### 金額のフォーマット関数

金額をカンマ区切りで表示する関数を作ります。

```javascript
function formatCurrency(amount) {
  return amount.toLocaleString('ja-JP');
}
```

**実行の流れ：**

```
formatCurrency(250000)
  ↓
250000.toLocaleString('ja-JP')
  ↓
'250,000'

formatCurrency(3000)
  ↓
3000.toLocaleString('ja-JP')
  ↓
'3,000'

formatCurrency(500)
  ↓
500.toLocaleString('ja-JP')
  ↓
'500'
```

**表示の変化：**

```
カンマなし：
¥250000  ← 読みにくい

カンマあり：
¥250,000 ← 読みやすい！
```

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

**実行の流れ：**

```
transactions = [
  { id: 1, type: 'income', amount: 250000 },
  { id: 2, type: 'expense', amount: 3000 },
  { id: 3, type: 'income', amount: 100000 },
  { id: 4, type: 'income', amount: 30000 }
]

ループ開始：total = 0

1回目：t = { id: 1, type: 'income', amount: 250000 }
  ↓
t.type === 'income' は true
  ↓
total += 250000
  ↓
total = 250000

2回目：t = { id: 2, type: 'expense', amount: 3000 }
  ↓
t.type === 'income' は false
  ↓
何もしない
  ↓
total = 250000（変わらず）

3回目：t = { id: 3, type: 'income', amount: 100000 }
  ↓
t.type === 'income' は true
  ↓
total += 100000
  ↓
total = 350000

4回目：t = { id: 4, type: 'income', amount: 30000 }
  ↓
t.type === 'income' は true
  ↓
total += 30000
  ↓
total = 380000

ループ終了：return 380000
```

### 収入合計を表示する関数

```javascript
function updateIncomeTotal() {
  const total = calculateIncomeTotal();
  const totalElement = document.getElementById('income-total');
  totalElement.textContent = '¥' + formatCurrency(total);
}
```

**実行の流れ：**

```
updateIncomeTotal()を呼ぶ
  ↓
calculateIncomeTotal()を呼ぶ
  ↓
total = 380000
  ↓
formatCurrency(380000)
  ↓
'380,000'
  ↓
totalElement.textContent = '¥380,000'
  ↓
画面に「¥380,000」と表示される
```

**表示の変化：**

```
最初：
┌────────────┐
│今月の収入   │
│   ¥0       │
└────────────┘

収入を追加した後：
┌────────────┐
│今月の収入   │
│ ¥380,000   │← 自動で更新
└────────────┘
```

## 収入の削除機能

### deleteIncome関数の実装

収入データを削除する関数を作ります。

```javascript
function deleteIncome(id) {
  // ステップ1：確認ダイアログを表示
  if (!confirm('この収入を削除しますか？')) {
    return;  // キャンセルされた場合は何もしない
  }

  // ステップ2：IDが一致するデータのインデックスを探す
  const index = transactions.findIndex(function(t) {
    return t.id === id;
  });

  // ステップ3：データが見つかった場合
  if (index !== -1) {
    // 配列から削除
    transactions.splice(index, 1);

    // localStorageに保存
    saveTransactions();

    // 画面を更新
    renderIncomeList();
    updateIncomeTotal();

    alert('収入を削除しました');
  }
}
```

**実行の流れ：**

```
transactions = [
  { id: 1, ... },
  { id: 2, ... },
  { id: 3, ... }
]

deleteIncome(2)を呼ぶ
  ↓
confirm('この収入を削除しますか？')
  ↓
ユーザーが「OK」をクリック
  ↓
transactions.findIndex(t => t.id === 2)
  ↓
インデックス1が返される（配列の2番目）
  ↓
transactions.splice(1, 1)
  ↓
transactions = [
  { id: 1, ... },
  { id: 3, ... }  ← id: 2 が削除された
]
  ↓
画面が更新される
```

**削除の確認ダイアログ：**

```
confirm()を呼ぶと：
┌──────────────────────┐
│この収入を削除しますか？│
│  [OK]  [キャンセル]   │
└──────────────────────┘

OKをクリック：
  ↓
confirm() は true を返す
  ↓
削除処理が実行される

キャンセルをクリック：
  ↓
confirm() は false を返す
  ↓
return で処理が中断される
  ↓
削除されない
```

## データの永続化

### localStorageに保存する

```javascript
function saveTransactions() {
  // 配列をJSON文字列に変換
  const json = JSON.stringify(transactions);

  // localStorageに保存
  localStorage.setItem('transactions', json);
}
```

**実行の流れ：**

```
transactions = [
  { id: 1, type: 'income', amount: 250000 },
  { id: 2, type: 'income', amount: 100000 }
]

JSON.stringify(transactions)
  ↓
'[{"id":1,"type":"income","amount":250000},{"id":2,"type":"income","amount":100000}]'
  ↓
localStorage.setItem('transactions', json)
  ↓
ブラウザのlocalStorageに保存される
```

### localStorageから読み込む

```javascript
function loadTransactions() {
  // localStorageから取得
  const saved = localStorage.getItem('transactions');

  // データがある場合
  if (saved) {
    // JSON文字列を配列に変換
    transactions = JSON.parse(saved);
  }
}
```

**実行の流れ：**

```
localStorage.getItem('transactions')
  ↓
'[{"id":1,"type":"income","amount":250000}]'
  ↓
JSON.parse(saved)
  ↓
[
  { id: 1, type: 'income', amount: 250000 }
]
  ↓
transactions に代入される
```

**永続化の効果：**

```
セッション1：
1. 収入を追加
2. saveTransactions()
3. ブラウザを閉じる

セッション2：
1. ページを開く
2. loadTransactions()
3. 前回のデータが復元される！
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
});
```

**実行の流れ：**

```
ページが読み込まれる
  ↓
DOMContentLoadedイベントが発生
  ↓
関数が呼ばれる
  ↓
loadTransactions()
  ↓
transactions にデータが読み込まれる
  ↓
renderIncomeList()
  ↓
一覧が表示される
  ↓
updateIncomeTotal()
  ↓
合計が表示される
  ↓
addEventListener()
  ↓
ボタンにイベントが登録される
```

## よくある問題と解決策

### 問題1：金額が文字列として扱われる

**状況：**
```javascript
const amount = amountInput.value;  // '250000'（文字列）

// 合計を計算
total += amount;  // 文字列の連結になってしまう
// total = '0250000' になる
```

**原因：**
input要素のvalueは常に文字列として返される

**解決策：**
```javascript
// Number()で数値に変換
const amount = Number(amountInput.value);  // 250000（数値）

// または
const amount = parseInt(amountInput.value, 10);

// 合計を計算
total += amount;  // 正しく加算される
// total = 250000 になる
```

### 問題2：削除後に合計が更新されない

**状況：**
```javascript
function deleteIncome(id) {
  const index = transactions.findIndex(t => t.id === id);
  transactions.splice(index, 1);
  // 画面の更新を忘れている
}

// 削除しても合計が変わらない
```

**原因：**
データは削除されているが、画面の更新を忘れている

**解決策：**
```javascript
function deleteIncome(id) {
  const index = transactions.findIndex(t => t.id === id);
  transactions.splice(index, 1);

  // 画面を更新する
  renderIncomeList();
  updateIncomeTotal();  // これを追加
}
```

### 問題3：ページをリロードするとデータが消える

**状況：**
```javascript
// 追加はできるが、リロードすると消える
```

**原因：**
localStorageに保存していない、または読み込んでいない

**解決策：**
```javascript
// データ追加時に保存
function addIncome() {
  // ... データを追加 ...
  transactions.push(newIncome);
  saveTransactions();  // これを追加
}

// ページ読み込み時に読み込み
document.addEventListener('DOMContentLoaded', function() {
  loadTransactions();  // これを追加
  renderIncomeList();
});
```

### 問題4：カテゴリの色が表示されない

**状況：**
```javascript
// カテゴリの背景色が反映されない
html += '<span class="col-category">' + income.category + '</span>';
```

**原因：**
styleattributeで背景色を設定していない

**解決策：**
```javascript
// style属性で背景色を設定
const categoryColor = getCategoryColor(income.category, 'income');
html += '<span class="col-category" style="background-color: ' + categoryColor + '">' + income.category + '</span>';
```

### 問題5：IDが重複してしまう

**状況：**
```javascript
// 常にID 1 が生成されてしまう
function generateId() {
  return 1;  // 固定値を返している
}
```

**原因：**
IDを固定値で返しているため、すべてのデータが同じIDになる

**解決策：**
```javascript
function generateId() {
  if (transactions.length === 0) {
    return 1;
  }
  const maxId = Math.max(...transactions.map(t => t.id));
  return maxId + 1;  // 最大ID + 1 を返す
}
```

## 実践例：完成版のコード

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

  // 新しいデータを作成
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

  // 保存と画面更新
  saveTransactions();
  renderIncomeList();
  updateIncomeTotal();

  // 入力欄をクリア
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
  const totalElement = document.getElementById('total-income');
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

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
  loadTransactions();
  renderIncomeList();
  updateIncomeTotal();

  const addIncomeButton = document.querySelector('#income-tab .add-button');
  if (addIncomeButton) {
    addIncomeButton.addEventListener('click', addIncome);
  }
});
```

この完成版コードには、収入管理に必要なすべての機能が含まれています。

## まとめ

お疲れ様でした。今回のレッスンでは、収入管理機能を実装しました。

### 今回学んだキーポイント

**1. データ入力の基本**

フォームからデータを取得し、バリデーションを行い、配列に追加する一連の流れを学びました：

- **値の取得** - `getElementById()`と`.value`で入力値を取得します
- **バリデーション** - 空文字列チェック、数値チェックでデータの品質を保ちます
- **データ作成** - オブジェクトを作成して配列に追加します

バリデーションは、データの品質を保つために非常に重要です。空のデータや不正なデータを防ぐことで、後の処理がスムーズになります。

**2. 分類処理の実装**

カテゴリごとに色を設定し、視覚的に区別する方法を学びました：

- **カテゴリ設定** - オブジェクトでカテゴリと色を紐付けます
- **色の取得** - `getCategoryColor()`関数で色を取得します
- **色の適用** - style属性で背景色を設定します

色分けすることで、ユーザーは一覧を見たときに直感的に情報を把握できます。

**3. データ構造の設計**

オブジェクトと配列を使って、複数のデータを効率的に管理する方法を学びました：

- **オブジェクト** - 1件のデータをid、type、date、amount、category、memoで表現
- **配列** - 複数のオブジェクトを配列で管理
- **ID生成** - `generateId()`で重複しないIDを自動生成

各データにIDを付けることで、後で編集や削除がしやすくなります。typeプロパティを使うことで、収入と支出を同じ配列で管理できます。

**4. 合計計算の実装**

配列をループして、条件に合うデータの金額を合計する方法を学びました：

- **forEach()** - すべてのデータを順番に処理
- **条件分岐** - typeで収入だけをフィルター
- **累積** - totalに金額を加算していく

`forEach()`を使うと、すべてのデータを順番に処理できます。typeで収入だけをフィルターすることで、正確な合計を計算できます。

**5. データの永続化**

localStorageを使って、ブラウザを閉じてもデータが残るようにしました：

- **保存** - `JSON.stringify()`で配列を文字列に変換して保存
- **読み込み** - `JSON.parse()`で文字列を配列に戻す
- **初期化** - DOMContentLoadedイベントでデータを読み込む

これにより、実用的なアプリケーションになります。JSON形式で保存することで、複雑なデータ構造も扱えます。

### カリキュラムの要件チェック

今回のレッスンで学んだ内容が、カリキュラムの要件を満たしているか確認しましょう。

**レッスン160の要件：**

✅ **収入入力機能** - フォームから収入データを追加し、バリデーションを実装しました

✅ **カテゴリ分類** - カテゴリごとに色を設定し、視覚的に区別できるようにしました

✅ **月別集計** - 収入の合計金額を計算して表示する機能を実装しました

すべての要件を満たしています！

### 次のレッスンの予告

次のレッスンでは、**支出管理機能**を実装します。

**次回学ぶ内容：**

- **支出入力機能** - フォームから支出データを追加する
- **支出カテゴリ** - 食費、交通費、娯楽などのカテゴリを設定する
- **支出合計の計算** - 支出の合計金額を計算する
- **収支の計算** - 収入 - 支出で収支を表示する

今回作った収入管理機能と同じ仕組みで、支出管理機能を実装します。収入と支出の両方を記録できるようになると、家計の全体像が見えるようになります。楽しみにしていてください！
