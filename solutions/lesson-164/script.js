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
  } else if (type === 'expense') {
    return expenseCategories[category] || '#9E9E9E';
  }
  return '#9E9E9E';
}

// データのバリデーション関数
function validateTransaction(transaction) {
  // トランザクションオブジェクトが存在するか
  if (!transaction || typeof transaction !== 'object') {
    return false;
  }

  // 必須プロパティが存在するか
  if (!transaction.id || !transaction.type || !transaction.date ||
      transaction.amount === undefined || !transaction.category) {
    return false;
  }

  // typeが正しい値か
  if (transaction.type !== 'income' && transaction.type !== 'expense') {
    return false;
  }

  // amountが数値か
  if (typeof transaction.amount !== 'number' || transaction.amount < 0) {
    return false;
  }

  // dateが正しい形式か（YYYY-MM-DD）
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(transaction.date)) {
    return false;
  }

  return true;
}

// データを保存する関数
function saveData() {
  try {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    console.log('データを保存しました:', transactions.length + '件');
  } catch (error) {
    console.error('データの保存に失敗しました:', error);

    if (error.name === 'QuotaExceededError') {
      alert('ストレージの容量が不足しています。古いデータを削除してください。');
    } else {
      alert('データの保存に失敗しました。');
    }
  }
}

// データを読み込む関数
function loadData() {
  try {
    const savedData = localStorage.getItem('transactions');

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // 配列であることを確認
      if (!Array.isArray(parsedData)) {
        console.error('データ形式が不正です');
        transactions = [];
        return;
      }

      // 各トランザクションをバリデーション
      transactions = parsedData.filter(function(t) {
        const isValid = validateTransaction(t);
        if (!isValid) {
          console.warn('不正なデータを除外しました:', t);
        }
        return isValid;
      });

      console.log('データを読み込みました:', transactions.length + '件');

      // 不正なデータがあった場合は保存し直す
      if (transactions.length < parsedData.length) {
        saveData();
      }
    } else {
      transactions = [];
      console.log('保存されたデータはありません');
    }
  } catch (error) {
    console.error('データの読み込みに失敗しました:', error);
    alert('データの読み込みに失敗しました。データが破損している可能性があります。');
    transactions = [];
  }
}

// すべてのデータを削除する関数
function clearAllData() {
  const confirmed = confirm('すべてのデータを削除してもよろしいですか？この操作は取り消せません。');

  if (confirmed) {
    const doubleConfirmed = confirm('本当に削除しますか？');

    if (doubleConfirmed) {
      transactions = [];
      localStorage.removeItem('transactions');

      renderIncomeList();
      renderExpenseList();
      updateIncomeTotal();
      updateExpenseTotal();
      updateStats();
      displayStorageInfo();

      alert('すべてのデータを削除しました');
    }
  }
}

// ストレージ情報を表示する関数
function displayStorageInfo() {
  const dataCountElement = document.getElementById('data-count');
  const storageSizeElement = document.getElementById('storage-size');

  if (dataCountElement) {
    dataCountElement.textContent = transactions.length;
  }

  if (storageSizeElement) {
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += key.length + localStorage.getItem(key).length;
      }
    }
    const sizeInKB = (totalSize * 2 / 1024).toFixed(2);
    storageSizeElement.textContent = sizeInKB;
  }
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
  saveData();
  renderIncomeList();
  updateIncomeTotal();
  updateStats();

  dateInput.value = '';
  amountInput.value = '';
  categoryInput.value = '';
  memoInput.value = '';

  alert('収入を追加しました');
}

// 支出を追加する関数
function addExpense() {
  const dateInput = document.getElementById('expense-date');
  const amountInput = document.getElementById('expense-amount');
  const categoryInput = document.getElementById('expense-category');
  const memoInput = document.getElementById('expense-memo');

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

  const newExpense = {
    id: generateId(),
    type: 'expense',
    date: date,
    amount: Number(amount),
    category: category,
    memo: memo
  };

  transactions.push(newExpense);
  saveData();
  renderExpenseList();
  updateExpenseTotal();
  updateStats();

  dateInput.value = '';
  amountInput.value = '';
  categoryInput.value = '';
  memoInput.value = '';

  alert('支出を追加しました');
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

// 支出一覧を表示する関数
function renderExpenseList() {
  const listContainer = document.getElementById('expense-items');

  const expenses = transactions.filter(function(t) {
    return t.type === 'expense';
  });

  if (expenses.length === 0) {
    listContainer.innerHTML = '<div class="empty-message">データがありません</div>';
    return;
  }

  expenses.sort(function(a, b) {
    return b.date.localeCompare(a.date);
  });

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
    saveData();
    renderIncomeList();
    updateIncomeTotal();
    updateStats();
    alert('収入を削除しました');
  }
}

// 支出を削除する関数
function deleteExpense(id) {
  if (!confirm('この支出を削除しますか？')) {
    return;
  }

  const index = transactions.findIndex(function(t) {
    return t.id === id;
  });

  if (index !== -1) {
    transactions.splice(index, 1);
    saveData();
    renderExpenseList();
    updateExpenseTotal();
    updateStats();
    alert('支出を削除しました');
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

// 支出合計を計算する関数
function calculateExpenseTotal() {
  let total = 0;
  transactions.forEach(function(t) {
    if (t.type === 'expense') {
      total += t.amount;
    }
  });
  return total;
}

// 収支を計算する関数
function calculateBalance() {
  const income = calculateIncomeTotal();
  const expense = calculateExpenseTotal();
  return income - expense;
}

// 収入合計を表示する関数
function updateIncomeTotal() {
  const total = calculateIncomeTotal();
  const totalElement = document.getElementById('income-total');
  totalElement.textContent = '¥' + formatCurrency(total);
}

// 支出合計を表示する関数
function updateExpenseTotal() {
  const total = calculateExpenseTotal();
  const totalElement = document.getElementById('expense-total');
  totalElement.textContent = '¥' + formatCurrency(total);
}

// 統計情報を更新する関数
function updateStats() {
  const income = calculateIncomeTotal();
  const expense = calculateExpenseTotal();
  const balance = calculateBalance();

  const statsIncomeElement = document.getElementById('stats-income');
  const statsExpenseElement = document.getElementById('stats-expense');
  const balanceElement = document.getElementById('balance');

  if (statsIncomeElement) {
    statsIncomeElement.textContent = '¥' + formatCurrency(income);
  }
  if (statsExpenseElement) {
    statsExpenseElement.textContent = '¥' + formatCurrency(expense);
  }
  if (balanceElement) {
    balanceElement.textContent = '¥' + formatCurrency(balance);

    // 収支がプラスかマイナスかで色を変える
    balanceElement.classList.remove('positive', 'negative');
    if (balance > 0) {
      balanceElement.classList.add('positive');
    } else if (balance < 0) {
      balanceElement.classList.add('negative');
    }
  }
}

// カテゴリ別の支出を計算する関数
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

// 今日の日付を設定する関数
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

// 円グラフを描画する関数
function drawPieChart(canvas, data, colors) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;

  ctx.clearRect(0, 0, width, height);

  if (Object.keys(data).length === 0) {
    ctx.fillStyle = '#999';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('データがありません', centerX, centerY);
    return;
  }

  let total = 0;
  for (let key in data) {
    total += data[key];
  }

  let startAngle = -Math.PI / 2;

  for (let category in data) {
    const value = data[category];
    const angle = (value / total) * (Math.PI * 2);
    const endAngle = startAngle + angle;

    ctx.fillStyle = colors[category] || '#9E9E9E';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();

    const percentage = ((value / total) * 100).toFixed(1);

    if (percentage >= 5) {
      const labelAngle = startAngle + angle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(percentage + '%', labelX, labelY);
    }

    startAngle = endAngle;
  }
}

// 凡例を描画する関数
function drawLegend(container, data, colors) {
  container.innerHTML = '';

  let total = 0;
  for (let key in data) {
    total += data[key];
  }

  const sortedData = Object.entries(data).sort(function(a, b) {
    return b[1] - a[1];
  });

  sortedData.forEach(function(item) {
    const category = item[0];
    const value = item[1];
    const percentage = ((value / total) * 100).toFixed(1);

    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';

    const colorBox = document.createElement('span');
    colorBox.className = 'legend-color';
    colorBox.style.backgroundColor = colors[category] || '#9E9E9E';

    const label = document.createElement('span');
    label.className = 'legend-label';
    label.textContent = category;

    const amount = document.createElement('span');
    amount.className = 'legend-amount';
    amount.textContent = '¥' + formatCurrency(value) + ' (' + percentage + '%)';

    legendItem.appendChild(colorBox);
    legendItem.appendChild(label);
    legendItem.appendChild(amount);
    container.appendChild(legendItem);
  });
}

// 棒グラフを描画する関数
function drawBarChart(canvas, income, expense) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padding = 40;
  const barWidth = 80;
  const maxValue = Math.max(income, expense) || 1;

  ctx.clearRect(0, 0, width, height);

  if (income === 0 && expense === 0) {
    ctx.fillStyle = '#999';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('データがありません', width / 2, height / 2);
    return;
  }

  const chartHeight = height - padding * 2;
  const scale = chartHeight / maxValue;

  const incomeHeight = income * scale;
  const incomeX = width / 2 - barWidth - 20;
  const incomeY = height - padding - incomeHeight;

  ctx.fillStyle = '#4CAF50';
  ctx.fillRect(incomeX, incomeY, barWidth, incomeHeight);

  ctx.fillStyle = '#333';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('収入', incomeX + barWidth / 2, height - padding + 20);
  ctx.fillText('¥' + formatCurrency(income), incomeX + barWidth / 2, incomeY - 10);

  const expenseHeight = expense * scale;
  const expenseX = width / 2 + 20;
  const expenseY = height - padding - expenseHeight;

  ctx.fillStyle = '#F44336';
  ctx.fillRect(expenseX, expenseY, barWidth, expenseHeight);

  ctx.fillStyle = '#333';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('支出', expenseX + barWidth / 2, height - padding + 20);
  ctx.fillText('¥' + formatCurrency(expense), expenseX + barWidth / 2, expenseY - 10);

  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();
}

// グラフを更新する関数
function updateCharts() {
  const expenseByCategory = calculateExpenseByCategory();

  const pieCanvas = document.getElementById('pie-chart');
  const pieLegend = document.getElementById('pie-legend');
  if (pieCanvas && pieLegend) {
    drawPieChart(pieCanvas, expenseByCategory, expenseCategories);
    drawLegend(pieLegend, expenseByCategory, expenseCategories);
  }

  const barCanvas = document.getElementById('bar-chart');
  if (barCanvas) {
    const income = calculateIncomeTotal();
    const expense = calculateExpenseTotal();
    drawBarChart(barCanvas, income, expense);
  }
}

// 日付から年月を抽出する関数
function getMonthKey(dateString) {
  return dateString.substring(0, 7);
}

// 月別データを計算する関数
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

// ソート済みの月リストを取得する関数
function getSortedMonths(monthlyData) {
  const months = Object.keys(monthlyData);
  months.sort();
  return months;
}

// 月次レポートを描画する関数
function renderMonthlyReport() {
  const monthlyData = calculateMonthlyData();
  const months = getSortedMonths(monthlyData).reverse();
  const tbody = document.getElementById('monthly-report-body');

  if (!tbody) return;

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

// カテゴリ別データを分析する関数
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

  for (let category in categoryData) {
    const data = categoryData[category];
    data.average = data.total / data.count;
  }

  return categoryData;
}

// カテゴリ分析を描画する関数
function renderCategoryAnalysis() {
  const categoryData = analyzeCategoryData();
  const tbody = document.getElementById('category-analysis-body');

  if (!tbody) return;

  if (Object.keys(categoryData).length === 0) {
    tbody.innerHTML = '<tr><td colspan="4">データがありません</td></tr>';
    return;
  }

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

// サマリーを計算する関数
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

// サマリーを描画する関数
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

// レポートを更新する関数
function updateReports() {
  renderMonthlyReport();
  renderCategoryAnalysis();
  renderSummary();
}

// イベントリスナーを設定する関数
function setupEventListeners() {
  const addIncomeButton = document.getElementById('add-income-button');
  const addExpenseButton = document.getElementById('add-expense-button');
  const clearButton = document.getElementById('clear-all-button');

  if (addIncomeButton) {
    addIncomeButton.addEventListener('click', addIncome);
  }

  if (addExpenseButton) {
    addExpenseButton.addEventListener('click', addExpense);
  }

  if (clearButton) {
    clearButton.addEventListener('click', clearAllData);
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

      if (targetTab === 'stats') {
        updateCharts();
        updateReports();
      }

      if (targetTab === 'settings') {
        displayStorageInfo();
      }
    });
  });
}

// 初期化関数
function init() {
  loadData();
  setTodayDate();
  renderIncomeList();
  renderExpenseList();
  updateIncomeTotal();
  updateExpenseTotal();
  updateStats();
  setupEventListeners();
  setupTabs();
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', init);

// テスト用にwindowオブジェクトに関数を公開
if (typeof window !== 'undefined') {
  window.transactions = transactions;
  window.saveData = saveData;
  window.loadData = loadData;
  window.validateTransaction = validateTransaction;
  window.clearAllData = clearAllData;
  window.displayStorageInfo = displayStorageInfo;
  window.init = init;
  window.addIncome = addIncome;
  window.addExpense = addExpense;
  window.deleteIncome = deleteIncome;
  window.deleteExpense = deleteExpense;
  window.renderIncomeList = renderIncomeList;
  window.renderExpenseList = renderExpenseList;
  window.updateIncomeTotal = updateIncomeTotal;
  window.updateExpenseTotal = updateExpenseTotal;
  window.updateStats = updateStats;
  window.drawPieChart = drawPieChart;
  window.drawLegend = drawLegend;
  window.drawBarChart = drawBarChart;
  window.updateCharts = updateCharts;
  window.getMonthKey = getMonthKey;
  window.calculateMonthlyData = calculateMonthlyData;
  window.getSortedMonths = getSortedMonths;
  window.renderMonthlyReport = renderMonthlyReport;
  window.analyzeCategoryData = analyzeCategoryData;
  window.renderCategoryAnalysis = renderCategoryAnalysis;
  window.calculateSummary = calculateSummary;
  window.renderSummary = renderSummary;
  window.updateReports = updateReports;
}
