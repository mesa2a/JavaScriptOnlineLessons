/**
 * レッスン171: DOM操作の復習
 * 解答
 */

document.addEventListener('DOMContentLoaded', function() {
  // ========================================
  // 問題1: テキスト表示の切り替え
  // ========================================

  var toggleBtn = document.getElementById('toggle-btn');
  var toggleText = document.getElementById('toggle-text');

  toggleBtn.addEventListener('click', function() {
    if (toggleText.style.display === 'none') {
      toggleText.style.display = 'block';
    } else {
      toggleText.style.display = 'none';
    }
  });

  // ========================================
  // 問題2: カウンター
  // ========================================

  var count = 0;
  var countSpan = document.getElementById('count');
  var incrementBtn = document.getElementById('increment-btn');
  var decrementBtn = document.getElementById('decrement-btn');

  incrementBtn.addEventListener('click', function() {
    count++;
    countSpan.textContent = count;
  });

  decrementBtn.addEventListener('click', function() {
    count--;
    countSpan.textContent = count;
  });

  // ========================================
  // 問題3: タスクリスト
  // ========================================

  var taskInput = document.getElementById('task-input');
  var addTaskBtn = document.getElementById('add-task-btn');
  var taskList = document.getElementById('task-list');

  addTaskBtn.addEventListener('click', function() {
    var taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('タスクを入力してください');
      return;
    }

    var li = document.createElement('li');
    li.textContent = taskText;
    taskList.appendChild(li);

    taskInput.value = '';
  });

  // Enterキーでも追加できるようにする
  taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addTaskBtn.click();
    }
  });

  // ========================================
  // 問題4: 削除ボタン付きリスト
  // ========================================

  var deletableList = document.getElementById('deletable-list');
  var items = deletableList.querySelectorAll('li');

  // 既存の項目に削除ボタンを追加
  for (var i = 0; i < items.length; i++) {
    addDeleteButton(items[i]);
  }

  function addDeleteButton(li) {
    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.addEventListener('click', function() {
      li.parentNode.removeChild(li);
    });
    li.appendChild(deleteBtn);
  }

  // ========================================
  // 問題5: スタイルの切り替え
  // ========================================

  var styleBtn = document.getElementById('style-btn');
  var styleBox = document.getElementById('style-box');

  styleBtn.addEventListener('click', function() {
    styleBox.classList.toggle('green');
  });

  // ========================================
  // 問題6: フォームのバリデーション
  // ========================================

  var contactForm = document.getElementById('contact-form');
  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var formErrors = document.getElementById('form-errors');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var errors = [];
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();

    // バリデーション
    if (name === '') {
      errors.push('名前を入力してください');
    }

    if (email === '') {
      errors.push('メールアドレスを入力してください');
    } else if (email.indexOf('@') === -1) {
      errors.push('正しいメールアドレスを入力してください');
    }

    // エラー表示
    formErrors.innerHTML = '';

    if (errors.length > 0) {
      errors.forEach(function(error) {
        var p = document.createElement('p');
        p.textContent = error;
        p.style.color = 'red';
        p.style.backgroundColor = '#ffe0e0';
        p.style.padding = '10px';
        p.style.borderRadius = '4px';
        formErrors.appendChild(p);
      });
    } else {
      var successP = document.createElement('p');
      successP.textContent = '送信成功！ 名前: ' + name + ', メール: ' + email;
      successP.style.color = 'green';
      successP.style.backgroundColor = '#e0ffe0';
      successP.style.padding = '10px';
      successP.style.borderRadius = '4px';
      formErrors.appendChild(successP);

      // フォームをクリア
      contactForm.reset();
    }
  });

  // ========================================
  // チャレンジ1: テーブルの動的生成
  // ========================================

  var users = [
    { name: '田中太郎', age: 25, email: 'tanaka@example.com' },
    { name: '佐藤花子', age: 30, email: 'sato@example.com' },
    { name: '鈴木一郎', age: 28, email: 'suzuki@example.com' }
  ];

  var createTableBtn = document.getElementById('create-table-btn');
  var tableContainer = document.getElementById('table-container');

  createTableBtn.addEventListener('click', function() {
    // 既存のテーブルをクリア
    tableContainer.innerHTML = '';

    // テーブルを作成
    var table = document.createElement('table');

    // ヘッダーを作成
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');

    var headers = ['名前', '年齢', 'メール'];
    headers.forEach(function(headerText) {
      var th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // ボディを作成
    var tbody = document.createElement('tbody');

    users.forEach(function(user) {
      var row = document.createElement('tr');

      var nameCell = document.createElement('td');
      nameCell.textContent = user.name;
      row.appendChild(nameCell);

      var ageCell = document.createElement('td');
      ageCell.textContent = user.age;
      row.appendChild(ageCell);

      var emailCell = document.createElement('td');
      emailCell.textContent = user.email;
      row.appendChild(emailCell);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);

    // ボタンを無効化
    createTableBtn.disabled = true;
    createTableBtn.textContent = 'テーブル作成済み';
  });

  // ========================================
  // チャレンジ2: アコーディオンメニュー
  // ========================================

  var accordionHeaders = document.querySelectorAll('.accordion-header');

  for (var i = 0; i < accordionHeaders.length; i++) {
    accordionHeaders[i].addEventListener('click', function() {
      var content = this.nextElementSibling;
      var isActive = this.classList.contains('active');

      // すべてのアコーディオンを閉じる
      var allContents = document.querySelectorAll('.accordion-content');
      for (var j = 0; j < allContents.length; j++) {
        allContents[j].style.display = 'none';
      }

      var allHeaders = document.querySelectorAll('.accordion-header');
      for (var k = 0; k < allHeaders.length; k++) {
        allHeaders[k].classList.remove('active');
      }

      // クリックされたアコーディオンをトグル
      if (!isActive) {
        content.style.display = 'block';
        this.classList.add('active');
      }
    });
  }

  // ========================================
  // 補足: より良い実装パターン
  // ========================================

  // 問題3の別解: より汎用的な実装
  function createTaskItem(text) {
    var li = document.createElement('li');
    li.textContent = text;

    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.padding = '5px 10px';
    deleteBtn.addEventListener('click', function() {
      li.parentNode.removeChild(li);
    });

    li.appendChild(deleteBtn);
    return li;
  }

  // 問題6の別解: より詳細なバリデーション
  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateName(name) {
    return name.length >= 2;
  }

  // テーブル生成の別解: より柔軟な実装
  function createTableFromData(data, headers) {
    var table = document.createElement('table');

    // ヘッダー
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    headers.forEach(function(header) {
      var th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // ボディ
    var tbody = document.createElement('tbody');
    data.forEach(function(rowData) {
      var row = document.createElement('tr');
      Object.values(rowData).forEach(function(cellData) {
        var td = document.createElement('td');
        td.textContent = cellData;
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table;
  }

  console.log('すべてのDOM操作が初期化されました');
});
