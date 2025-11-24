# レッスン174: 苦手分野の復習（総合演習編）

## このレッスンの目標

これまでの復習レッスン（レッスン170〜173）で学んだ内容を統合し、実践的な問題を解決できるようになる。

## 学習内容

### 1. 総合演習の目的

これまで学んだ内容を組み合わせて、より実践的な問題を解決します：

- **配列操作**（レッスン170）
- **DOM操作**（レッスン171）
- **オブジェクトと関数**（レッスン172）
- **文字列と制御構文**（レッスン173）

### 2. 実践的なパターン

#### 2-1. データ処理とDOM更新

配列データを処理してHTMLに表示する基本パターン：

```javascript
// データの準備
var users = [
  { id: 1, name: '田中太郎', age: 25, role: '開発者' },
  { id: 2, name: '佐藤花子', age: 30, role: 'デザイナー' },
  { id: 3, name: '鈴木一郎', age: 28, role: '開発者' }
];

// データの処理と表示
function displayUsers(users) {
  // 開発者のみフィルタリング
  var developers = users.filter(function(user) {
    return user.role === '開発者';
  });

  // HTML生成
  var html = '';
  for (var i = 0; i < developers.length; i++) {
    html += '<div class="user">';
    html += '<h3>' + developers[i].name + '</h3>';
    html += '<p>年齢: ' + developers[i].age + '歳</p>';
    html += '</div>';
  }

  // DOM更新
  var container = document.getElementById('user-list');
  container.innerHTML = html;
}
```

#### 2-2. フォーム処理とバリデーション

ユーザー入力を検証して処理する：

```javascript
// フォーム送信処理
function handleSubmit() {
  // 入力取得
  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var ageInput = document.getElementById('age');

  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var age = parseInt(ageInput.value);

  // バリデーション
  var errors = [];

  if (name === '') {
    errors.push('名前を入力してください');
  }

  if (email === '' || email.indexOf('@') === -1) {
    errors.push('有効なメールアドレスを入力してください');
  }

  if (isNaN(age) || age < 0 || age > 150) {
    errors.push('有効な年齢を入力してください');
  }

  // エラー表示
  if (errors.length > 0) {
    var errorContainer = document.getElementById('errors');
    errorContainer.innerHTML = errors.join('<br>');
    errorContainer.style.display = 'block';
    return false;
  }

  // 成功時の処理
  var user = {
    name: name,
    email: email,
    age: age
  };

  addUser(user);
  return true;
}
```

#### 2-3. 検索とフィルタリング

複数条件での検索機能：

```javascript
// 検索機能
function searchUsers(users, criteria) {
  var results = users;

  // 名前で検索
  if (criteria.name) {
    results = results.filter(function(user) {
      return user.name.toLowerCase().indexOf(criteria.name.toLowerCase()) !== -1;
    });
  }

  // 年齢範囲で検索
  if (criteria.minAge) {
    results = results.filter(function(user) {
      return user.age >= criteria.minAge;
    });
  }

  if (criteria.maxAge) {
    results = results.filter(function(user) {
      return user.age <= criteria.maxAge;
    });
  }

  // 役職で検索
  if (criteria.role) {
    results = results.filter(function(user) {
      return user.role === criteria.role;
    });
  }

  return results;
}

// 使用例
var criteria = {
  name: '田中',
  minAge: 20,
  maxAge: 30,
  role: '開発者'
};

var results = searchUsers(users, criteria);
```

#### 2-4. ソートと並べ替え

複数の条件でソート：

```javascript
// 年齢でソート
function sortByAge(users, ascending) {
  var sorted = users.slice(); // コピーを作成

  sorted.sort(function(a, b) {
    if (ascending) {
      return a.age - b.age;
    } else {
      return b.age - a.age;
    }
  });

  return sorted;
}

// 名前でソート
function sortByName(users, ascending) {
  var sorted = users.slice();

  sorted.sort(function(a, b) {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();

    if (ascending) {
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    } else {
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    }
  });

  return sorted;
}
```

#### 2-5. 集計と統計

データの集計処理：

```javascript
// 統計情報を計算
function calculateStatistics(users) {
  // 合計
  var totalAge = users.reduce(function(sum, user) {
    return sum + user.age;
  }, 0);

  // 平均
  var averageAge = totalAge / users.length;

  // 最小・最大
  var minAge = users[0].age;
  var maxAge = users[0].age;

  for (var i = 1; i < users.length; i++) {
    if (users[i].age < minAge) {
      minAge = users[i].age;
    }
    if (users[i].age > maxAge) {
      maxAge = users[i].age;
    }
  }

  // 役職別の人数
  var roleCount = {};
  for (var i = 0; i < users.length; i++) {
    var role = users[i].role;
    if (roleCount[role]) {
      roleCount[role]++;
    } else {
      roleCount[role] = 1;
    }
  }

  return {
    total: users.length,
    averageAge: Math.round(averageAge * 10) / 10,
    minAge: minAge,
    maxAge: maxAge,
    roleCount: roleCount
  };
}
```

### 3. インタラクティブなUI構築

#### 3-1. ページネーション

大量のデータを分割表示：

```javascript
// ページネーション
function createPagination(items, itemsPerPage) {
  var currentPage = 1;
  var totalPages = Math.ceil(items.length / itemsPerPage);

  return {
    currentPage: currentPage,
    totalPages: totalPages,
    itemsPerPage: itemsPerPage,

    getCurrentItems: function() {
      var start = (this.currentPage - 1) * this.itemsPerPage;
      var end = start + this.itemsPerPage;
      return items.slice(start, end);
    },

    nextPage: function() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        return true;
      }
      return false;
    },

    prevPage: function() {
      if (this.currentPage > 1) {
        this.currentPage--;
        return true;
      }
      return false;
    },

    goToPage: function(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        return true;
      }
      return false;
    }
  };
}
```

#### 3-2. タブ切り替え

複数のビューを切り替える：

```javascript
// タブ機能
function initTabs() {
  var tabs = document.querySelectorAll('.tab');
  var contents = document.querySelectorAll('.tab-content');

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function() {
      // すべてのタブを非アクティブ化
      for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove('active');
        contents[j].style.display = 'none';
      }

      // クリックされたタブをアクティブ化
      this.classList.add('active');
      var contentId = this.getAttribute('data-content');
      document.getElementById(contentId).style.display = 'block';
    });
  }
}
```

#### 3-3. モーダルダイアログ

情報の詳細表示：

```javascript
// モーダル表示
function showModal(title, content) {
  var modal = document.getElementById('modal');
  var modalTitle = document.getElementById('modal-title');
  var modalContent = document.getElementById('modal-content');

  modalTitle.textContent = title;
  modalContent.innerHTML = content;
  modal.style.display = 'block';
}

function closeModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// 閉じるボタンとオーバーレイのクリックで閉じる
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', closeModal);
```

### 4. エラーハンドリング

#### 4-1. 入力検証

安全なデータ処理：

```javascript
// 安全な整数変換
function safeParseInt(value, defaultValue) {
  var num = parseInt(value);
  if (isNaN(num)) {
    return defaultValue || 0;
  }
  return num;
}

// 安全な配列アクセス
function safeArrayAccess(arr, index, defaultValue) {
  if (!arr || !Array.isArray(arr)) {
    return defaultValue;
  }
  if (index < 0 || index >= arr.length) {
    return defaultValue;
  }
  return arr[index];
}

// オブジェクトプロパティの安全なアクセス
function safeGetProperty(obj, property, defaultValue) {
  if (!obj || typeof obj !== 'object') {
    return defaultValue;
  }
  if (obj.hasOwnProperty(property)) {
    return obj[property];
  }
  return defaultValue;
}
```

### 5. パフォーマンスの考慮

#### 5-1. DOM操作の最適化

```javascript
// 悪い例：ループ内でDOM操作
function displayItemsBad(items) {
  var container = document.getElementById('list');
  container.innerHTML = ''; // クリア

  for (var i = 0; i < items.length; i++) {
    var div = document.createElement('div');
    div.textContent = items[i];
    container.appendChild(div); // 毎回DOM更新
  }
}

// 良い例：一度にまとめて更新
function displayItemsGood(items) {
  var html = '';

  for (var i = 0; i < items.length; i++) {
    html += '<div>' + items[i] + '</div>';
  }

  var container = document.getElementById('list');
  container.innerHTML = html; // 一度だけDOM更新
}
```

#### 5-2. イベントデリゲーション

```javascript
// 悪い例：各要素にイベントリスナー
function attachListenersBad() {
  var items = document.querySelectorAll('.item');
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', handleClick);
  }
}

// 良い例：親要素にイベントリスナー
function attachListenersGood() {
  var container = document.getElementById('container');
  container.addEventListener('click', function(event) {
    if (event.target.classList.contains('item')) {
      handleClick(event);
    }
  });
}
```

## よくある間違い

### 1. データの直接変更

```javascript
// 悪い例：元の配列を変更
function processData(data) {
  data.sort(); // 元の配列が変更される
  return data;
}

// 良い例：コピーを作成
function processData(data) {
  var copy = data.slice();
  copy.sort();
  return copy;
}
```

### 2. 型の混在

```javascript
// 悪い例：型が混在
var age = '25'; // 文字列
var result = age + 5; // '255' になる

// 良い例：型を統一
var age = parseInt('25'); // 数値
var result = age + 5; // 30 になる
```

### 3. グローバル変数の乱用

```javascript
// 悪い例：すべてグローバル
var data = [];
var filtered = [];
var sorted = [];

// 良い例：オブジェクトにまとめる
var app = {
  data: [],
  filtered: [],
  sorted: [],

  init: function() {
    this.loadData();
  },

  loadData: function() {
    // データ読み込み
  }
};
```

## ベストプラクティス

### 1. 関数を小さく保つ

```javascript
// 悪い例：長い関数
function processUser(user) {
  // バリデーション
  if (!user.name) return false;
  if (!user.email) return false;

  // 正規化
  user.name = user.name.trim().toLowerCase();
  user.email = user.email.trim().toLowerCase();

  // 保存
  saveToDatabase(user);

  // 通知
  sendEmail(user.email);

  // ログ
  console.log('User processed:', user.name);

  return true;
}

// 良い例：機能ごとに分割
function validateUser(user) {
  return user.name && user.email;
}

function normalizeUser(user) {
  return {
    name: user.name.trim().toLowerCase(),
    email: user.email.trim().toLowerCase()
  };
}

function processUser(user) {
  if (!validateUser(user)) {
    return false;
  }

  var normalized = normalizeUser(user);
  saveToDatabase(normalized);
  sendEmail(normalized.email);
  logUserProcessing(normalized.name);

  return true;
}
```

### 2. 意味のある名前を使う

```javascript
// 悪い例：意味不明な名前
function f(x) {
  var y = [];
  for (var i = 0; i < x.length; i++) {
    if (x[i].a > 18) {
      y.push(x[i]);
    }
  }
  return y;
}

// 良い例：わかりやすい名前
function getAdultUsers(users) {
  var adults = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].age > 18) {
      adults.push(users[i]);
    }
  }
  return adults;
}
```

### 3. コメントを適切に書く

```javascript
// 悪い例：不要なコメント
// iをインクリメント
i++;

// 良い例：なぜそうするのかを説明
// タイムゾーンの違いを考慮して9時間加算
var japanTime = utcTime + (9 * 60 * 60 * 1000);
```

## 実践的なヒント

### 1. デバッグ技法

```javascript
// console.logでデバッグ
function processData(data) {
  console.log('Input:', data);

  var filtered = data.filter(function(item) {
    return item.active;
  });
  console.log('After filter:', filtered);

  var mapped = filtered.map(function(item) {
    return item.name;
  });
  console.log('After map:', mapped);

  return mapped;
}
```

### 2. コードの再利用

```javascript
// 汎用的なヘルパー関数
var utils = {
  isEmpty: function(value) {
    return value === null || value === undefined || value === '';
  },

  isEmail: function(email) {
    return email.indexOf('@') !== -1 && email.indexOf('.') !== -1;
  },

  formatDate: function(date) {
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }
};
```

## まとめ

このレッスンでは、これまでの復習内容を統合して実践的なパターンを学びました：

1. **データ処理とDOM更新**の組み合わせ
2. **フォーム処理とバリデーション**の実装
3. **検索、フィルタリング、ソート**の実践
4. **インタラクティブなUI**の構築
5. **エラーハンドリング**とパフォーマンス

次のレッスンでは、これらの知識を使って応用課題に取り組みます。

## 演習

演習ファイルで実践的な問題を解いて、総合的なスキルを身につけましょう。
