---
title: "Lesson 163: レポート機能"
author: "JavaScript学習教材"
date: "2025-11-23"
---

# Lesson 163: レポート機能

## 今回の学習

### 前回の復習

前回のレッスンでは、グラフ表示機能を実装しました。具体的には以下の内容を学習しました。

- **データ可視化**: 数値をグラフで視覚的に表現する方法
- **Canvas API**: Canvas APIを使って図形を描画する技術
- **グラフ機能完成**: 円グラフと棒グラフでデータを表示

前回作成したグラフ機能により、データが視覚的に分かりやすくなりました。

### 今回の目標

今回は、レポート機能を実装します。データを分析して、月別の推移やカテゴリ別の詳細を表示できるようにします。

今回の学習で達成する目標は以下の通りです。

- **月次レポート**: 月ごとの収支を集計する
- **カテゴリ別分析**: カテゴリごとの支出を詳しく分析する
- **推移表示**: 過去数ヶ月の推移を表示する

## データ分析とは

### なぜレポート機能が必要なのか

グラフは全体像を把握するのに便利ですが、詳しい分析には不十分です。例えば、以下のような疑問に答えるには、レポート機能が必要です。

- 「先月と今月で、どのカテゴリの支出が増えたか」
- 「この3ヶ月で、食費はどう推移しているか」
- 「毎月の収支の平均はいくらか」

レポート機能を使うと、これらの質問に答えられるようになります。

### データ分析の基本

データ分析は、以下の3つのステップで行います。

1. **データの収集**: 必要なデータを集める
2. **データの加工**: データを集計、計算、整理する
3. **データの表示**: 結果を分かりやすく表示する

予算管理アプリでは、transactions配列にデータが集まっています。これを加工して、月別やカテゴリ別に集計し、表として表示します。

## 月別データの集計

### 月ごとにデータを分ける

まず、データを月ごとに分類します。

```javascript
function getMonthKey(dateString) {
  // '2025-11-23' → '2025-11'
  return dateString.substring(0, 7);
}
```

この関数は、日付文字列から年月部分だけを取り出します。

### 月別の収支を計算する関数

```javascript
function calculateMonthlyData() {
  const monthlyData = {};

  transactions.forEach(function(t) {
    const monthKey = getMonthKey(t.date);

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        income: 0,
        expense: 0,
        balance: 0
      };
    }

    if (t.type === 'income') {
      monthlyData[monthKey].income += t.amount;
    } else if (t.type === 'expense') {
      monthlyData[monthKey].expense += t.amount;
    }

    monthlyData[monthKey].balance =
      monthlyData[monthKey].income - monthlyData[monthKey].expense;
  });

  return monthlyData;
}
```

**関数の説明**

1. 空のオブジェクト`monthlyData`を作成
2. すべてのトランザクションをループ
3. 各トランザクションの月を取得
4. その月のデータがなければ、初期化
5. 収入または支出を加算
6. 収支（balance）を計算
7. オブジェクトを返す

**結果の例**

```javascript
{
  '2025-10': { income: 250000, expense: 180000, balance: 70000 },
  '2025-11': { income: 250000, expense: 150000, balance: 100000 }
}
```

### 月のリストをソートする

月をソート（並び替え）して、古い順または新しい順に表示します。

```javascript
function getSortedMonths(monthlyData) {
  const months = Object.keys(monthlyData);
  months.sort(); // 文字列として昇順にソート
  return months;
}
```

YYYY-MM形式なら、文字列としてソートすると、自動的に古い順になります。

```
'2025-09'
'2025-10'
'2025-11'
```

逆順（新しい順）にしたい場合は、`reverse()`を使います。

```javascript
months.sort().reverse();
```

## 月次レポートの表示

### レポートテーブルのHTML

統計タブに、月次レポートのテーブルを追加します。

```html
<div class="report-section">
  <h2>月次レポート</h2>
  <table class="report-table">
    <thead>
      <tr>
        <th>年月</th>
        <th>収入</th>
        <th>支出</th>
        <th>収支</th>
      </tr>
    </thead>
    <tbody id="monthly-report-body">
      <tr>
        <td colspan="4">データがありません</td>
      </tr>
    </tbody>
  </table>
</div>
```

### レポートテーブルのCSS

テーブルを見やすくスタイリングします。

```css
.report-section {
  margin-bottom: 30px;
}

.report-section h2 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.report-table th {
  background-color: #f5f5f5;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #e0e0e0;
  font-weight: bold;
}

.report-table td {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.report-table tr:hover {
  background-color: #f9f9f9;
}

.income-value {
  color: #4CAF50;
  font-weight: bold;
}

.expense-value {
  color: #F44336;
  font-weight: bold;
}

.balance-value.positive {
  color: #4CAF50;
  font-weight: bold;
}

.balance-value.negative {
  color: #F44336;
  font-weight: bold;
}
```

### 月次レポートを描画する関数

```javascript
function renderMonthlyReport() {
  const monthlyData = calculateMonthlyData();
  const months = getSortedMonths(monthlyData).reverse(); // 新しい順
  const tbody = document.getElementById('monthly-report-body');

  if (months.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4">データがありません</td></tr>';
    return;
  }

  let html = '';
  months.forEach(function(month) {
    const data = monthlyData[month];
    const balanceClass = data.balance >= 0 ? 'positive' : 'negative';

    html += '<tr>';
    html += '  <td>' + month + '</td>';
    html += '  <td class="income-value">¥' + formatCurrency(data.income) + '</td>';
    html += '  <td class="expense-value">¥' + formatCurrency(data.expense) + '</td>';
    html += '  <td class="balance-value ' + balanceClass + '">¥' + formatCurrency(data.balance) + '</td>';
    html += '</tr>';
  });

  tbody.innerHTML = html;
}
```

## カテゴリ別分析

### カテゴリ別の詳細データを計算

各カテゴリについて、合計金額と平均金額を計算します。

```javascript
function analyzeCategoryData() {
  const categoryData = {};

  transactions.forEach(function(t) {
    if (t.type === 'expense') {
      if (!categoryData[t.category]) {
        categoryData[t.category] = {
          total: 0,
          count: 0,
          average: 0
        };
      }

      categoryData[t.category].total += t.amount;
      categoryData[t.category].count += 1;
    }
  });

  // 平均を計算
  for (let category in categoryData) {
    const data = categoryData[category];
    data.average = data.total / data.count;
  }

  return categoryData;
}
```

**結果の例**

```javascript
{
  '食費': { total: 90000, count: 30, average: 3000 },
  '交通費': { total: 15000, count: 10, average: 1500 }
}
```

### カテゴリ分析テーブルの描画

```javascript
function renderCategoryAnalysis() {
  const categoryData = analyzeCategoryData();
  const tbody = document.getElementById('category-analysis-body');

  if (Object.keys(categoryData).length === 0) {
    tbody.innerHTML = '<tr><td colspan="4">データがありません</td></tr>';
    return;
  }

  // 合計金額でソート（降順）
  const sortedCategories = Object.entries(categoryData).sort(function(a, b) {
    return b[1].total - a[1].total;
  });

  let html = '';
  sortedCategories.forEach(function(item) {
    const category = item[0];
    const data = item[1];
    const color = expenseCategories[category] || '#9E9E9E';

    html += '<tr>';
    html += '  <td><span class="category-badge" style="background-color: ' + color + '">' + category + '</span></td>';
    html += '  <td class="expense-value">¥' + formatCurrency(data.total) + '</td>';
    html += '  <td>' + data.count + '件</td>';
    html += '  <td>¥' + formatCurrency(Math.round(data.average)) + '</td>';
    html += '</tr>';
  });

  tbody.innerHTML = html;
}
```

### カテゴリバッジのCSS

カテゴリ名を色付きのバッジで表示します。

```css
.category-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}
```

## 推移表示

### 過去数ヶ月のカテゴリ別推移

特定のカテゴリについて、過去数ヶ月の推移を表示します。

```javascript
function calculateCategoryTrend(category, months) {
  const trend = [];

  transactions.forEach(function(t) {
    if (t.type === 'expense' && t.category === category) {
      const monthKey = getMonthKey(t.date);

      let monthData = trend.find(function(item) {
        return item.month === monthKey;
      });

      if (!monthData) {
        monthData = { month: monthKey, amount: 0 };
        trend.push(monthData);
      }

      monthData.amount += t.amount;
    }
  });

  // 月順にソート
  trend.sort(function(a, b) {
    return a.month.localeCompare(b.month);
  });

  // 最新のN ヶ月だけ返す
  return trend.slice(-months);
}
```

**使用例**

```javascript
const foodTrend = calculateCategoryTrend('食費', 3);
// [
//   { month: '2025-09', amount: 25000 },
//   { month: '2025-10', amount: 30000 },
//   { month: '2025-11', amount: 35000 }
// ]
```

### 推移の簡易表示

推移データを文字列で表示します。

```javascript
function renderTrendSummary(category) {
  const trend = calculateCategoryTrend(category, 3);

  if (trend.length === 0) {
    return 'データなし';
  }

  const amounts = trend.map(function(item) {
    return '¥' + formatCurrency(item.amount);
  });

  return amounts.join(' → ');
}
```

**表示例**

```
¥25,000 → ¥30,000 → ¥35,000
```

矢印で推移を表現することで、増加傾向か減少傾向かが分かります。

## サマリー情報の表示

### 全期間のサマリーを計算

全期間の統計情報を計算します。

```javascript
function calculateSummary() {
  const totalIncome = calculateIncomeTotal();
  const totalExpense = calculateExpenseTotal();
  const balance = totalIncome - totalExpense;

  const expenseTransactions = transactions.filter(function(t) {
    return t.type === 'expense';
  });

  const averageExpense = expenseTransactions.length > 0
    ? totalExpense / expenseTransactions.length
    : 0;

  // 月の数を計算
  const monthlyData = calculateMonthlyData();
  const monthCount = Object.keys(monthlyData).length;

  const averageMonthlyExpense = monthCount > 0
    ? totalExpense / monthCount
    : 0;

  return {
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    balance: balance,
    averageExpense: averageExpense,
    averageMonthlyExpense: averageMonthlyExpense,
    transactionCount: transactions.length,
    monthCount: monthCount
  };
}
```

### サマリーの表示

```javascript
function renderSummary() {
  const summary = calculateSummary();
  const container = document.getElementById('summary-container');

  if (!container) return;

  let html = '<div class="summary-grid">';

  html += '<div class="summary-item">';
  html += '  <div class="summary-label">総収入</div>';
  html += '  <div class="summary-value income-value">¥' + formatCurrency(summary.totalIncome) + '</div>';
  html += '</div>';

  html += '<div class="summary-item">';
  html += '  <div class="summary-label">総支出</div>';
  html += '  <div class="summary-value expense-value">¥' + formatCurrency(summary.totalExpense) + '</div>';
  html += '</div>';

  html += '<div class="summary-item">';
  html += '  <div class="summary-label">総収支</div>';
  const balanceClass = summary.balance >= 0 ? 'positive' : 'negative';
  html += '  <div class="summary-value balance-value ' + balanceClass + '">¥' + formatCurrency(summary.balance) + '</div>';
  html += '</div>';

  html += '<div class="summary-item">';
  html += '  <div class="summary-label">1回あたりの平均支出</div>';
  html += '  <div class="summary-value">¥' + formatCurrency(Math.round(summary.averageExpense)) + '</div>';
  html += '</div>';

  html += '<div class="summary-item">';
  html += '  <div class="summary-label">月平均支出</div>';
  html += '  <div class="summary-value">¥' + formatCurrency(Math.round(summary.averageMonthlyExpense)) + '</div>';
  html += '</div>';

  html += '<div class="summary-item">';
  html += '  <div class="summary-label">記録期間</div>';
  html += '  <div class="summary-value">' + summary.monthCount + 'ヶ月</div>';
  html += '</div>';

  html += '</div>';

  container.innerHTML = html;
}
```

### サマリーのCSS

```css
.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.summary-item {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.summary-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.summary-value {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

@media (max-width: 768px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## レポート機能の統合

### updateReports関数の実装

すべてのレポートを更新する関数を作成します。

```javascript
function updateReports() {
  renderMonthlyReport();
  renderCategoryAnalysis();
  renderSummary();
}
```

### 統計タブでレポートを表示

統計タブを開いたときに、グラフとレポートの両方を更新します。

```javascript
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

      if (targetTab === 'stats') {
        updateCharts();
        updateReports();
      }
    });
  });
}
```

## データのフィルタリング

### 期間を指定してデータを抽出

特定の期間のデータだけを取り出す関数を作成します。

```javascript
function filterByDateRange(startDate, endDate) {
  return transactions.filter(function(t) {
    return t.date >= startDate && t.date <= endDate;
  });
}
```

**使用例**

```javascript
// 2025年11月のデータだけを取得
const novemberData = filterByDateRange('2025-11-01', '2025-11-30');
```

### 最近N日間のデータを取得

```javascript
function getRecentTransactions(days) {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - days);

  const pastDateString = pastDate.toISOString().split('T')[0];

  return transactions.filter(function(t) {
    return t.date >= pastDateString;
  });
}
```

**使用例**

```javascript
// 最近30日間のデータを取得
const recentData = getRecentTransactions(30);
```

## 練習問題

### 課題

レポート機能を実装してください。月次レポート、カテゴリ別分析、サマリー情報を表示します。

### 保存場所

`exercises/lesson-163/` フォルダに以下のファイルが用意されています。

- `index.html` - HTMLファイル（前回のレッスンから継続）
- `style.css` - CSSファイル（前回のレッスンから継続）
- `script.js` - JavaScriptコードを記述するファイル

JavaScriptコードを `script.js` に記述してください。前回のグラフ機能に、レポート機能を追加します。

### 手順

1. **月次レポート**
   - getMonthKey関数を実装する
   - calculateMonthlyData関数を実装する
   - renderMonthlyReport関数を実装する
   - HTMLにテーブルを追加する

2. **カテゴリ別分析**
   - analyzeCategoryData関数を実装する
   - renderCategoryAnalysis関数を実装する
   - 合計、件数、平均を表示する

3. **推移表示**
   - calculateSummary関数を実装する
   - renderSummary関数を実装する
   - 総収入、総支出、平均などを表示する

### ヒント

**月別集計のヒント**
- substring(0, 7)で年月部分を取り出しましょう
- オブジェクトをループするには for...in を使いましょう
- Object.keys()で月のリストを取得できます

**カテゴリ分析のヒント**
- 合計、件数を記録しましょう
- 平均 = 合計 / 件数
- Object.entries()でソートしやすくなります

**サマリーのヒント**
- 既存の計算関数（calculateIncomeTotal等）を活用しましょう
- Math.round()で小数点を丸めましょう
- グリッドレイアウトで見やすく配置しましょう

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-163
```

すべてのテストがパス（✓マーク）すれば完成です。

## まとめ

お疲れ様でした。今回のレッスンでは、レポート機能を実装しました。

**今回学んだキーポイント**

**データ分析**
データを集計、加工、表示する方法を学びました。単なる合計だけでなく、平均、件数、推移など、さまざまな角度からデータを分析できます。データ分析により、お金の使い方の傾向が見えてきます。

**レポート生成**
月次レポート、カテゴリ別分析、サマリー情報など、さまざまな形式でデータを表示する方法を学びました。テーブル形式で整理することで、数値を比較しやすくなります。色分けすることで、プラスとマイナスが一目で分かります。

**配列とオブジェクトの活用**
filter()、map()、forEach()などの配列メソッドを使って、データを効率的に処理しました。オブジェクトを使って、月別やカテゴリ別にデータをグループ化しました。これらの技術は、データ処理の基本です。

**日付の扱い**
日付文字列から月を抽出したり、期間でフィルタリングしたり、日付を扱う実践的な方法を学びました。YYYY-MM-DD形式を使うことで、文字列比較で日付の前後を判断できます。

**統計情報の計算**
平均、合計、件数など、基本的な統計情報を計算する方法を学びました。これらの情報は、家計の状況を把握するのに役立ちます。月平均支出を知ることで、予算を立てやすくなります。

レポート機能により、予算管理アプリがより実用的になりました。グラフで全体像を把握し、レポートで詳細を分析することで、お金の使い方を改善できます。

次のレッスンでは、データの保存機能を確実にします。localStorageの使い方を復習し、データのバックアップ方法を学びます。
