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
