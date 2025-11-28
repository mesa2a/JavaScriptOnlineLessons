# レッスン167：UI改善

## このレッスンで学ぶこと
このレッスンでは、予算管理アプリのユーザーインターフェース（UI）を改善します。アニメーション、レスポンシブデザイン、アクセシビリティの向上を通じて、使いやすく魅力的なアプリケーションに仕上げます。

## UI/UXの基本

### UIとUXの違い

**UI（User Interface）**: ユーザーが操作する画面や要素のデザイン
- ボタンの配置
- 色使い
- フォントサイズ
- アニメーション

**UX（User Experience）**: ユーザーがアプリを使う際の体験全体
- 使いやすさ
- 分かりやすさ
- 満足度
- 効率性

### 良いUIの原則

1. **一貫性**: 同じ機能は同じデザインで表現する
2. **フィードバック**: ユーザーの操作に反応を示す
3. **シンプル**: 複雑さを避け、必要な機能だけを提供する
4. **アクセシビリティ**: すべてのユーザーが使えるようにする

## CSSアニメーション

### transitionプロパティ

**transition**は、CSSプロパティの変化をスムーズにアニメーション化します。

```css
.button {
  background-color: #4CAF50;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #45a049;
}
```

**構文:**
```css
transition: property duration timing-function delay;
```

- **property**: アニメーション対象のプロパティ（all, background-color など）
- **duration**: アニメーションの長さ（0.3s, 300ms など）
- **timing-function**: アニメーションの速度曲線（ease, linear, ease-in-out など）
- **delay**: アニメーション開始までの遅延（0s など）

### よく使うtiming-function

```css
/* デフォルト: ゆっくり始まり、速くなり、ゆっくり終わる */
transition: all 0.3s ease;

/* 一定速度 */
transition: all 0.3s linear;

/* ゆっくり始まり、ゆっくり終わる */
transition: all 0.3s ease-in-out;

/* ゆっくり始まる */
transition: all 0.3s ease-in;

/* ゆっくり終わる */
transition: all 0.3s ease-out;
```

### フェードイン効果

```css
.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### スライドイン効果

```css
.slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

## レスポンシブデザイン

### メディアクエリの基本

**メディアクエリ**は、画面サイズに応じてCSSを切り替える機能です。

```css
/* スマートフォン（768px未満） */
@media (max-width: 767px) {
  .container {
    padding: 10px;
  }

  .stats-summary {
    grid-template-columns: 1fr;
  }
}

/* タブレット（768px以上、1024px未満） */
@media (min-width: 768px) and (max-width: 1023px) {
  .stats-summary {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* デスクトップ（1024px以上） */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}
```

### ブレークポイント

一般的なブレークポイント：
- **スマートフォン**: 〜767px
- **タブレット**: 768px〜1023px
- **デスクトップ**: 1024px〜

### viewportの設定

HTMLの`<head>`に必ず追加：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## アクセシビリティ

### ARIAラベル

**ARIA（Accessible Rich Internet Applications）**は、支援技術（スクリーンリーダーなど）にコンテンツの意味を伝えます。

```html
<!-- ボタンの役割を明示 -->
<button aria-label="収入を追加">
  <span class="icon">+</span>
</button>

<!-- 現在の状態を示す -->
<button aria-pressed="true">アクティブ</button>

<!-- 説明を追加 -->
<input
  type="number"
  id="amount"
  aria-describedby="amount-help">
<span id="amount-help">金額を円単位で入力してください</span>
```

### フォーカスの視覚化

キーボード操作時のフォーカスを分かりやすくします。

```css
/* デフォルトのフォーカス枠を削除しないこと */
button:focus {
  outline: 2px solid #2196F3;
  outline-offset: 2px;
}

/* カスタムフォーカススタイル */
.form-input:focus {
  border-color: #2196F3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}
```

### セマンティックHTML

意味のあるHTMLタグを使用します。

```html
<!-- 良い例 -->
<header>
  <h1>予算管理アプリ</h1>
</header>

<nav>
  <button>収入</button>
  <button>支出</button>
</nav>

<main>
  <section>
    <h2>収入一覧</h2>
    <!-- コンテンツ -->
  </section>
</main>

<!-- 悪い例 -->
<div class="header">
  <div class="title">予算管理アプリ</div>
</div>
```

## アニメーションの実装

### トランザクション追加時のアニメーション

```javascript
function renderIncomeList() {
  var listContainer = document.getElementById('income-items');
  var incomes = transactions.filter(function(t) {
    return t.type === 'income';
  });

  if (incomes.length === 0) {
    listContainer.innerHTML = '<div class="empty-message">データがありません</div>';
    return;
  }

  incomes.sort(function(a, b) {
    return b.date.localeCompare(a.date);
  });

  var html = '';
  incomes.forEach(function(income) {
    var categoryColor = getCategoryColor(income.category, 'income');

    html += '<div class="transaction-item slide-in">';
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

### ボタンホバー効果の改善

```css
.add-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.add-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.add-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* リップル効果 */
.add-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.add-button:active::after {
  width: 300px;
  height: 300px;
}
```

## ローディング表示

### スピナーの実装

```html
<div class="loading-spinner" id="loading-spinner" style="display: none;">
  <div class="spinner"></div>
  <p>読み込み中...</p>
</div>
```

```css
.loading-spinner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #2196F3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner p {
  color: white;
  margin-top: 20px;
  font-size: 18px;
}
```

```javascript
function showLoading() {
  var spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.style.display = 'flex';
  }
}

function hideLoading() {
  var spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.style.display = 'none';
  }
}

// 使用例
function importJSON(file) {
  showLoading();

  var reader = new FileReader();

  reader.onload = function(event) {
    try {
      // データ処理...
      hideLoading();
    } catch (error) {
      hideLoading();
      alert('ファイルの読み込みに失敗しました');
    }
  };

  reader.readAsText(file);
}
```

## トースト通知

### トースト通知の実装

```html
<div class="toast" id="toast"></div>
```

```css
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: white;
  padding: 16px 24px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 1000;
  pointer-events: none;
}

.toast.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.toast.success {
  background-color: #4CAF50;
}

.toast.error {
  background-color: #F44336;
}

.toast.info {
  background-color: #2196F3;
}
```

```javascript
function showToast(message, type) {
  var toast = document.getElementById('toast');

  if (!toast) {
    return;
  }

  // 既存のクラスを削除
  toast.className = 'toast';

  // タイプに応じたクラスを追加
  if (type === 'success') {
    toast.classList.add('success');
  } else if (type === 'error') {
    toast.classList.add('error');
  } else if (type === 'info') {
    toast.classList.add('info');
  }

  // メッセージを設定
  toast.textContent = message;

  // 表示
  toast.classList.add('show');

  // 3秒後に非表示
  setTimeout(function() {
    toast.classList.remove('show');
  }, 3000);
}

// 使用例
function addIncome() {
  // データ追加処理...

  showToast('収入を追加しました', 'success');
}
```

## モーダルダイアログ

### モーダルの実装

```html
<div class="modal" id="confirm-modal">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <h2 class="modal-title">確認</h2>
    <p class="modal-message">この操作を実行しますか？</p>
    <div class="modal-actions">
      <button class="secondary-button" id="modal-cancel">キャンセル</button>
      <button class="danger-button" id="modal-confirm">実行</button>
    </div>
  </div>
</div>
```

```css
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal.show {
  display: flex;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease;
}

.modal-content {
  position: relative;
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
  z-index: 1;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-title {
  margin: 0 0 16px 0;
  font-size: 20px;
}

.modal-message {
  margin: 0 0 24px 0;
  color: #666;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
```

```javascript
function showModal(title, message, onConfirm) {
  var modal = document.getElementById('confirm-modal');
  var modalTitle = modal.querySelector('.modal-title');
  var modalMessage = modal.querySelector('.modal-message');
  var cancelButton = document.getElementById('modal-cancel');
  var confirmButton = document.getElementById('modal-confirm');

  modalTitle.textContent = title;
  modalMessage.textContent = message;

  modal.classList.add('show');

  // キャンセルボタン
  cancelButton.onclick = function() {
    modal.classList.remove('show');
  };

  // 確認ボタン
  confirmButton.onclick = function() {
    modal.classList.remove('show');
    if (onConfirm) {
      onConfirm();
    }
  };

  // オーバーレイクリックで閉じる
  modal.querySelector('.modal-overlay').onclick = function() {
    modal.classList.remove('show');
  };
}

// 使用例
function clearAllData() {
  showModal(
    'データ削除',
    'すべてのデータを削除してもよろしいですか？この操作は取り消せません。',
    function() {
      transactions = [];
      localStorage.removeItem('transactions');
      renderIncomeList();
      renderExpenseList();
      updateStats();
      showToast('すべてのデータを削除しました', 'info');
    }
  );
}
```

## ダークモード

### ダークモードの実装

```css
/* ライトモード（デフォルト） */
:root {
  --bg-color: #f0f2f5;
  --card-bg: #ffffff;
  --text-color: #333333;
  --border-color: #e0e0e0;
}

/* ダークモード */
body.dark-mode {
  --bg-color: #1a1a1a;
  --card-bg: #2d2d2d;
  --text-color: #e0e0e0;
  --border-color: #404040;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
}
```

```javascript
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  // 設定を保存
  var isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

// 初期化時に設定を読み込み
function loadDarkModePreference() {
  var darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
  }
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', function() {
  loadDarkModePreference();
  // その他の初期化...
});
```

## まとめ

このレッスンで学んだこと：

1. **CSSアニメーション**: transition と @keyframes の使い方
2. **レスポンシブデザイン**: メディアクエリで画面サイズに対応
3. **アクセシビリティ**: ARIA、フォーカス、セマンティックHTML
4. **ローディング表示**: スピナーでユーザーフィードバック
5. **トースト通知**: 操作結果の表示
6. **モーダルダイアログ**: 確認ダイアログの実装
7. **ダークモード**: ユーザー設定の保存と読み込み

これでアプリケーションのUIが洗練され、ユーザーエクスペリエンスが大幅に向上します！

## 演習問題

1. トランザクション追加時にスライドインアニメーションを追加してください
2. ボタンにホバー効果を追加してください
3. トースト通知を実装してください
4. レスポンシブデザインを改善してください（チャレンジ）
5. ダークモードを実装してください（チャレンジ）
6. モーダルダイアログでalertを置き換えてください（チャレンジ）
