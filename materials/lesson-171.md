# レッスン171: 苦手分野の復習（DOM操作編）

## このレッスンで学ぶこと
- DOM操作の基本の復習
- 要素の取得方法
- 要素の作成と追加
- イベント処理
- よくあるミスと対処法
- 実践的なDOM操作パターン

---

## 1. DOM操作の重要性

DOM（Document Object Model）は、HTMLドキュメントをJavaScriptで操作するための仕組みです。Webアプリケーション開発において、DOMを理解していないと何も作れません。

### なぜDOM操作が重要か

```javascript
// 実際の開発でのDOM操作の使用例

// ユーザーがボタンをクリックしたときの処理
document.getElementById('submit-btn').addEventListener('click', function() {
  var input = document.getElementById('user-input').value;
  var result = document.getElementById('result');
  result.textContent = '入力された値: ' + input;
});

// フォームのバリデーション
var form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  var email = document.getElementById('email').value;
  if (!email.includes('@')) {
    alert('正しいメールアドレスを入力してください');
    return;
  }
  // フォーム送信処理
});

// 動的にリストを作成
var users = ['田中', '佐藤', '鈴木'];
var list = document.getElementById('user-list');
users.forEach(function(user) {
  var li = document.createElement('li');
  li.textContent = user;
  list.appendChild(li);
});
```

---

## 2. 要素の取得

### 2.1 getElementById()

IDで要素を取得します。最も基本的で高速な方法です。

```javascript
// HTML: <div id="content">Hello</div>

var element = document.getElementById('content');
console.log(element); // <div id="content">Hello</div>
console.log(element.textContent); // 'Hello'

// 存在しない要素
var notFound = document.getElementById('not-exist');
console.log(notFound); // null
```

### 2.2 querySelector()

CSSセレクターで要素を取得します。最初にマッチした要素を返します。

```javascript
// HTML:
// <div class="box">Box 1</div>
// <div class="box">Box 2</div>

// クラスで取得
var box = document.querySelector('.box');
console.log(box.textContent); // 'Box 1' （最初の要素）

// ID で取得
var content = document.querySelector('#content');

// タグ名で取得
var firstDiv = document.querySelector('div');

// 属性で取得
var input = document.querySelector('input[type="text"]');

// 複雑なセレクター
var nested = document.querySelector('.container .item:first-child');
```

### 2.3 querySelectorAll()

CSSセレクターで複数の要素を取得します。NodeListを返します。

```javascript
// HTML:
// <div class="box">Box 1</div>
// <div class="box">Box 2</div>
// <div class="box">Box 3</div>

var boxes = document.querySelectorAll('.box');
console.log(boxes.length); // 3

// NodeListは配列風だが、配列ではない
console.log(boxes); // NodeList(3) [div.box, div.box, div.box]

// forEachで処理（モダンブラウザのみ）
boxes.forEach(function(box, index) {
  console.log(index + ': ' + box.textContent);
});

// 通常のforループ（互換性が高い）
for (var i = 0; i < boxes.length; i++) {
  console.log(i + ': ' + boxes[i].textContent);
}
```

### 2.4 getElementsByClassName()

クラス名で要素を取得します。HTMLCollectionを返します。

```javascript
// HTML:
// <div class="item">Item 1</div>
// <div class="item">Item 2</div>

var items = document.getElementsByClassName('item');
console.log(items.length); // 2

// HTMLCollectionは配列ではない
// forEachは使えない
for (var i = 0; i < items.length; i++) {
  console.log(items[i].textContent);
}

// 配列に変換する方法
var itemsArray = Array.prototype.slice.call(items);
itemsArray.forEach(function(item) {
  console.log(item.textContent);
});
```

### 2.5 getElementsByTagName()

タグ名で要素を取得します。HTMLCollectionを返します。

```javascript
// すべてのdiv要素を取得
var divs = document.getElementsByTagName('div');

// すべてのli要素を取得
var listItems = document.getElementsByTagName('li');
```

---

## 3. 要素の内容の操作

### 3.1 textContent

要素のテキスト内容を取得・設定します。

```javascript
// HTML: <div id="message">Hello</div>

var message = document.getElementById('message');

// テキストを取得
console.log(message.textContent); // 'Hello'

// テキストを設定
message.textContent = 'こんにちは';
console.log(message.textContent); // 'こんにちは'

// HTMLタグは文字列として扱われる
message.textContent = '<strong>太字</strong>';
// 表示: <strong>太字</strong> （タグがそのまま表示される）
```

### 3.2 innerHTML

要素のHTML内容を取得・設定します。

```javascript
// HTML: <div id="container">Hello</div>

var container = document.getElementById('container');

// HTMLを取得
console.log(container.innerHTML); // 'Hello'

// HTMLを設定
container.innerHTML = '<strong>太字</strong>';
// 表示: 太字 （太字で表示される）

// 複数の要素を追加
container.innerHTML = '<p>段落1</p><p>段落2</p>';

// 注意: セキュリティリスク（XSS攻撃）
var userInput = '<script>alert("XSS")</script>';
// container.innerHTML = userInput; // 危険！
```

### 3.3 value（input要素）

input要素の値を取得・設定します。

```javascript
// HTML: <input type="text" id="username" value="初期値">

var input = document.getElementById('username');

// 値を取得
console.log(input.value); // '初期値'

// 値を設定
input.value = '新しい値';

// 入力欄をクリア
input.value = '';
```

---

## 4. 要素の属性の操作

### 4.1 getAttribute() / setAttribute()

```javascript
// HTML: <img id="photo" src="image1.jpg" alt="写真">

var img = document.getElementById('photo');

// 属性を取得
var src = img.getAttribute('src');
console.log(src); // 'image1.jpg'

// 属性を設定
img.setAttribute('src', 'image2.jpg');
img.setAttribute('alt', '新しい写真');

// data属性
// HTML: <div id="user" data-id="123" data-name="田中">
var user = document.getElementById('user');
var userId = user.getAttribute('data-id');
console.log(userId); // '123'
```

### 4.2 dataset（data属性）

```javascript
// HTML: <div id="product" data-id="456" data-price="1000">

var product = document.getElementById('product');

// datasetでアクセス
console.log(product.dataset.id);    // '456'
console.log(product.dataset.price); // '1000'

// 設定
product.dataset.stock = '10';
// HTML: <div id="product" data-id="456" data-price="1000" data-stock="10">
```

---

## 5. クラスの操作

### 5.1 classList

```javascript
// HTML: <div id="box" class="container">

var box = document.getElementById('box');

// クラスを追加
box.classList.add('active');
// HTML: <div id="box" class="container active">

// クラスを削除
box.classList.remove('container');
// HTML: <div id="box" class="active">

// クラスをトグル（あれば削除、なければ追加）
box.classList.toggle('active');
// HTML: <div id="box">
box.classList.toggle('active');
// HTML: <div id="box" class="active">

// クラスの存在確認
var hasActive = box.classList.contains('active');
console.log(hasActive); // true または false

// 複数のクラスを追加
box.classList.add('large', 'blue', 'rounded');
```

### 5.2 className

```javascript
var box = document.getElementById('box');

// クラス名を取得
console.log(box.className); // 'container active'

// クラス名を設定（既存のクラスを置き換える）
box.className = 'new-class';

// クラスを追加（既存のクラスを保持）
box.className += ' another-class';
```

---

## 6. 要素の作成と追加

### 6.1 createElement()

```javascript
// 新しい要素を作成
var div = document.createElement('div');
var p = document.createElement('p');
var button = document.createElement('button');

// 内容を設定
div.textContent = 'これは新しいdiv要素です';
p.innerHTML = '<strong>段落</strong>の内容';
button.textContent = 'クリック';

// クラスを追加
div.classList.add('new-box');

// 属性を設定
button.setAttribute('type', 'button');
button.id = 'my-button';
```

### 6.2 appendChild()

```javascript
// HTML: <div id="container"></div>

var container = document.getElementById('container');

// 要素を作成
var p = document.createElement('p');
p.textContent = '新しい段落';

// 末尾に追加
container.appendChild(p);
// HTML: <div id="container"><p>新しい段落</p></div>

// 複数の要素を追加
var p2 = document.createElement('p');
p2.textContent = '2番目の段落';
container.appendChild(p2);
// HTML:
// <div id="container">
//   <p>新しい段落</p>
//   <p>2番目の段落</p>
// </div>
```

### 6.3 removeChild()

```javascript
var container = document.getElementById('container');
var p = document.querySelector('#container p');

// 要素を削除
container.removeChild(p);

// 自分自身を削除
p.parentNode.removeChild(p);
```

### 6.4 insertBefore()

```javascript
// HTML:
// <div id="container">
//   <p id="existing">既存の段落</p>
// </div>

var container = document.getElementById('container');
var existing = document.getElementById('existing');

var newP = document.createElement('p');
newP.textContent = '新しい段落';

// existingの前に挿入
container.insertBefore(newP, existing);
// HTML:
// <div id="container">
//   <p>新しい段落</p>
//   <p id="existing">既存の段落</p>
// </div>
```

---

## 7. イベント処理

### 7.1 addEventListener()

```javascript
// HTML: <button id="btn">クリック</button>

var btn = document.getElementById('btn');

// イベントリスナーを追加
btn.addEventListener('click', function() {
  console.log('ボタンがクリックされました');
});

// 複数のイベントリスナーを追加可能
btn.addEventListener('click', function() {
  console.log('2つ目のリスナー');
});

// 関数を変数に入れることもできる
function handleClick() {
  console.log('クリックされました');
}
btn.addEventListener('click', handleClick);
```

### 7.2 イベントオブジェクト

```javascript
btn.addEventListener('click', function(event) {
  console.log('イベントタイプ:', event.type); // 'click'
  console.log('ターゲット:', event.target); // ボタン要素
  console.log('マウスのX座標:', event.clientX);
  console.log('マウスのY座標:', event.clientY);
});

// フォームの送信を防ぐ
var form = document.getElementById('myForm');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // フォーム送信を防ぐ
  console.log('フォーム送信をキャンセルしました');
});
```

### 7.3 よく使うイベント

```javascript
// クリック
element.addEventListener('click', function() { /* ... */ });

// ダブルクリック
element.addEventListener('dblclick', function() { /* ... */ });

// マウスオーバー
element.addEventListener('mouseover', function() { /* ... */ });

// マウスアウト
element.addEventListener('mouseout', function() { /* ... */ });

// 入力
input.addEventListener('input', function() { /* ... */ });

// フォーカス
input.addEventListener('focus', function() { /* ... */ });

// ブラー（フォーカスが外れる）
input.addEventListener('blur', function() { /* ... */ });

// キー押下
input.addEventListener('keydown', function(e) {
  console.log('押されたキー:', e.key);
});

// フォーム送信
form.addEventListener('submit', function(e) { /* ... */ });

// ページ読み込み完了
document.addEventListener('DOMContentLoaded', function() { /* ... */ });
```

---

## 8. よくあるミスと対処法

### 8.1 要素が見つからない

```javascript
// ❌ 悪い例：DOMContentLoaded前に実行
var btn = document.getElementById('btn'); // null
btn.addEventListener('click', function() { /* ... */ }); // エラー！

// ✅ 良い例：DOMContentLoaded後に実行
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('btn'); // 要素を取得できる
  btn.addEventListener('click', function() { /* ... */ });
});
```

### 8.2 innerHTMLでイベントリスナーが消える

```javascript
// ❌ 悪い例
var container = document.getElementById('container');
var btn = document.createElement('button');
btn.textContent = 'クリック';
btn.addEventListener('click', function() {
  console.log('クリック');
});
container.appendChild(btn);

// innerHTMLで上書きするとイベントリスナーが消える
container.innerHTML = '<p>新しい内容</p>';
// ボタンとイベントリスナーが消える

// ✅ 良い例：appendChildを使う
var container = document.getElementById('container');
var p = document.createElement('p');
p.textContent = '新しい内容';
container.appendChild(p); // イベントリスナーは保持される
```

### 8.3 ループ内でのイベントリスナー

```javascript
// ❌ 悪い例：varを使うと期待通りに動かない
var buttons = document.querySelectorAll('.btn');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    console.log('ボタン' + i); // すべて同じ値（最後の値）
  });
}

// ✅ 良い例：クロージャを使う
var buttons = document.querySelectorAll('.btn');
for (var i = 0; i < buttons.length; i++) {
  (function(index) {
    buttons[index].addEventListener('click', function() {
      console.log('ボタン' + index); // 正しい値
    });
  })(i);
}

// ✅ より良い例：datasetを使う
var buttons = document.querySelectorAll('.btn');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].dataset.index = i;
  buttons[i].addEventListener('click', function() {
    console.log('ボタン' + this.dataset.index);
  });
}
```

### 8.4 textContentとinnerHTMLの混同

```javascript
var div = document.getElementById('message');

// textContent: HTMLタグは文字列として扱われる
div.textContent = '<strong>太字</strong>';
// 表示: <strong>太字</strong>

// innerHTML: HTMLタグが解釈される
div.innerHTML = '<strong>太字</strong>';
// 表示: 太字（太字で表示）

// ユーザー入力を表示する場合はtextContentを使う（XSS対策）
var userInput = prompt('名前を入力してください');
div.textContent = 'こんにちは、' + userInput + 'さん'; // 安全
// div.innerHTML = 'こんにちは、' + userInput + 'さん'; // 危険
```

---

## 9. 実践的なDOM操作パターン

### 9.1 リストの動的生成

```javascript
function createList(items, containerId) {
  var container = document.getElementById(containerId);
  var ul = document.createElement('ul');

  items.forEach(function(item) {
    var li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

// 使用例
var fruits = ['りんご', 'バナナ', 'オレンジ'];
createList(fruits, 'fruit-list');
```

### 9.2 テーブルの動的生成

```javascript
function createTable(data, containerId) {
  var container = document.getElementById(containerId);
  var table = document.createElement('table');

  // ヘッダー行
  var thead = document.createElement('thead');
  var headerRow = document.createElement('tr');
  var headers = ['名前', '年齢', 'メール'];

  headers.forEach(function(header) {
    var th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // データ行
  var tbody = document.createElement('tbody');
  data.forEach(function(row) {
    var tr = document.createElement('tr');

    var td1 = document.createElement('td');
    td1.textContent = row.name;
    tr.appendChild(td1);

    var td2 = document.createElement('td');
    td2.textContent = row.age;
    tr.appendChild(td2);

    var td3 = document.createElement('td');
    td3.textContent = row.email;
    tr.appendChild(td3);

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  container.appendChild(table);
}

// 使用例
var users = [
  { name: '田中', age: 25, email: 'tanaka@example.com' },
  { name: '佐藤', age: 30, email: 'sato@example.com' }
];
createTable(users, 'user-table');
```

### 9.3 削除ボタン付きリスト

```javascript
function createDeletableList(items, containerId) {
  var container = document.getElementById(containerId);
  container.innerHTML = ''; // クリア

  var ul = document.createElement('ul');

  items.forEach(function(item, index) {
    var li = document.createElement('li');
    li.textContent = item + ' ';

    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.dataset.index = index;
    deleteBtn.addEventListener('click', function() {
      items.splice(parseInt(this.dataset.index), 1);
      createDeletableList(items, containerId); // 再描画
    });

    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

// 使用例
var tasks = ['買い物', '掃除', '勉強'];
createDeletableList(tasks, 'task-list');
```

### 9.4 フォームのバリデーション

```javascript
function setupFormValidation(formId) {
  var form = document.getElementById(formId);

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var errors = [];

    // 名前のバリデーション
    var name = document.getElementById('name').value.trim();
    if (name === '') {
      errors.push('名前を入力してください');
    }

    // メールのバリデーション
    var email = document.getElementById('email').value.trim();
    if (email === '') {
      errors.push('メールアドレスを入力してください');
    } else if (!email.includes('@')) {
      errors.push('正しいメールアドレスを入力してください');
    }

    // エラー表示
    var errorDiv = document.getElementById('errors');
    if (errors.length > 0) {
      errorDiv.innerHTML = errors.map(function(error) {
        return '<p style="color: red;">' + error + '</p>';
      }).join('');
    } else {
      errorDiv.innerHTML = '<p style="color: green;">送信成功！</p>';
      form.reset(); // フォームをクリア
    }
  });
}

// 使用例
setupFormValidation('contact-form');
```

### 9.5 アコーディオンメニュー

```javascript
function setupAccordion() {
  var headers = document.querySelectorAll('.accordion-header');

  for (var i = 0; i < headers.length; i++) {
    headers[i].addEventListener('click', function() {
      var content = this.nextElementSibling;

      // 現在の状態をトグル
      if (content.style.display === 'block') {
        content.style.display = 'none';
        this.classList.remove('active');
      } else {
        // 他のアコーディオンを閉じる
        var allContents = document.querySelectorAll('.accordion-content');
        for (var j = 0; j < allContents.length; j++) {
          allContents[j].style.display = 'none';
        }
        var allHeaders = document.querySelectorAll('.accordion-header');
        for (var k = 0; k < allHeaders.length; k++) {
          allHeaders[k].classList.remove('active');
        }

        // 選択されたアコーディオンを開く
        content.style.display = 'block';
        this.classList.add('active');
      }
    });
  }
}

// 使用例
document.addEventListener('DOMContentLoaded', setupAccordion);
```

---

## まとめ

このレッスンでは、DOM操作について復習しました：

1. **要素の取得**
   - getElementById: IDで取得
   - querySelector: CSSセレクターで取得（最初の要素）
   - querySelectorAll: CSSセレクターで取得（すべて）
   - getElementsByClassName: クラス名で取得
   - getElementsByTagName: タグ名で取得

2. **要素の操作**
   - textContent: テキスト内容
   - innerHTML: HTML内容
   - value: input要素の値
   - getAttribute/setAttribute: 属性の取得・設定
   - classList: クラスの操作

3. **要素の作成と追加**
   - createElement: 要素の作成
   - appendChild: 末尾に追加
   - removeChild: 削除
   - insertBefore: 指定位置に挿入

4. **イベント処理**
   - addEventListener: イベントリスナーの追加
   - イベントオブジェクト: event.target, event.preventDefault()
   - よく使うイベント: click, input, submit, DOMContentLoaded

5. **よくあるミス**
   - 要素が見つからない
   - innerHTMLでイベントが消える
   - ループ内でのイベントリスナー
   - textContentとinnerHTMLの混同

6. **実践パターン**
   - リストの動的生成
   - テーブルの動的生成
   - 削除ボタン付きリスト
   - フォームバリデーション
   - アコーディオンメニュー

DOM操作は実際のWebアプリケーション開発で必須のスキルです。しっかり復習して、自信を持って使えるようになりましょう！
