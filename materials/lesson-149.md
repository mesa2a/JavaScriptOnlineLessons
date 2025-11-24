# レッスン149：TODOアプリ（見た目編）

## このレッスンで学ぶこと
- CSSでスタイルを追加する
- カードデザインを実装する
- ボタンを装飾する
- 完了タスクのスタイルを変更する
- ホバーエフェクトを追加する

---

## 1. なぜ見た目が重要か

前回までは、機能を実装することに集中していました。

しかし、見た目が良くないと：
- **使いたくなくなる**
- **何ができるかわかりにくい**
- **プロフェッショナルに見えない**

CSSで見た目を整えることで、使いやすく魅力的なアプリになります。

---

## 2. 基本的なレイアウト

### コンテナを中央に配置

```css
body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
  margin: 0;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}
```

**ポイント:**
- `max-width`で幅を制限
- `margin: 0 auto`で中央に配置
- `border-radius`で角を丸くする
- `box-shadow`で影を付ける

---

## 3. ヘッダーのスタイル

```css
h1 {
  text-align: center;
  color: #333;
  margin: 0 0 30px 0;
  font-size: 32px;
  font-weight: 700;
}

h1::before {
  content: "✓ ";
  color: #667eea;
}
```

**ポイント:**
- `::before`で絵文字やアイコンを追加
- カラフルな色で目立たせる

---

## 4. 入力エリアのスタイル

```css
.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

#taskInput {
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s;
}

#taskInput:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

#taskInput::placeholder {
  color: #999;
}
```

**ポイント:**
- `flex: 1`で入力欄を伸ばす
- `transition`でアニメーション
- `:focus`でフォーカス時のスタイル
- `::placeholder`でプレースホルダーの色

---

## 5. ボタンのスタイル

```css
button {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-add:active {
  transform: translateY(0);
}

.btn-delete {
  background: #ff4757;
  color: white;
  padding: 6px 12px;
  font-size: 14px;
}

.btn-delete:hover {
  background: #ff3838;
  transform: scale(1.05);
}
```

**ポイント:**
- `linear-gradient`でグラデーション
- `transform`でアニメーション
- `:hover`でホバー時の変化
- `:active`でクリック時の変化

---

## 6. タスクアイテムのスタイル

```css
.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  margin-bottom: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  transition: all 0.3s;
}

.task-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.task-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-item span {
  flex: 1;
  font-size: 16px;
  color: #333;
}
```

**ポイント:**
- `border-left`で左側にアクセント
- `:hover`でホバー時に動く
- `gap`で要素間の間隔

---

## 7. 完了タスクのスタイル

```css
.task-item.done {
  opacity: 0.6;
  border-left-color: #2ed573;
}

.task-item.done span {
  text-decoration: line-through;
  color: #999;
}

.task-item.done:hover {
  opacity: 0.8;
}
```

**ポイント:**
- `opacity`で透明度を変更
- `text-decoration: line-through`で取り消し線
- `.done`クラスで完了状態を表現

---

## 8. 空のメッセージ

```css
.empty-message {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 18px;
}

.empty-message::before {
  content: "📝";
  display: block;
  font-size: 48px;
  margin-bottom: 16px;
}
```

**ポイント:**
- 絵文字で視覚的に表現
- `::before`で絵文字を追加

---

## 9. レスポンシブデザイン

```css
@media (max-width: 768px) {
  .container {
    padding: 20px;
    margin: 10px;
  }

  h1 {
    font-size: 24px;
  }

  .input-area {
    flex-direction: column;
  }

  button {
    width: 100%;
  }

  .task-item {
    flex-wrap: wrap;
  }

  .task-item button {
    width: 100%;
    margin-top: 8px;
  }
}
```

**ポイント:**
- `@media`で画面サイズに応じてスタイル変更
- スマートフォンでは縦並びに

---

## 10. 完全なHTML/CSS例

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TODOアプリ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>TODOリスト</h1>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="新しいタスクを入力...">
      <button class="btn-add" onclick="handleAdd()">追加</button>
    </div>

    <div id="taskList"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### CSS (style.css)

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

h1 {
  text-align: center;
  color: #333;
  margin: 0 0 30px 0;
  font-size: 32px;
  font-weight: 700;
}

h1::before {
  content: "✓ ";
  color: #667eea;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

#taskInput {
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s;
}

#taskInput:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

button {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-add:active {
  transform: translateY(0);
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  margin-bottom: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  transition: all 0.3s;
}

.task-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.task-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-item span {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.task-item.done {
  opacity: 0.6;
  border-left-color: #2ed573;
}

.task-item.done span {
  text-decoration: line-through;
  color: #999;
}

.btn-delete {
  background: #ff4757;
  color: white;
  padding: 6px 12px;
  font-size: 14px;
}

.btn-delete:hover {
  background: #ff3838;
  transform: scale(1.05);
}

.empty-message {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 18px;
}

.empty-message::before {
  content: "📝";
  display: block;
  font-size: 48px;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
    margin: 10px;
  }

  h1 {
    font-size: 24px;
  }

  .input-area {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
```

---

## 11. CSSのテクニック

### グラデーション

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### 影

```css
box-shadow: 0 10px 40px rgba(0,0,0,0.2);
```

### トランジション

```css
transition: all 0.3s;
```

### 変形

```css
transform: translateY(-2px);  /* 上に移動 */
transform: translateX(4px);   /* 右に移動 */
transform: scale(1.05);       /* 拡大 */
```

---

## 12. 練習問題

### 練習1：色を変える

ボタンやタスクアイテムの色を変更してみてください。

```css
.btn-add {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.task-item {
  border-left-color: #f5576c;
}
```

### 練習2：アニメーションを追加

タスクを追加したときにアニメーションを付けてみてください。

```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.task-item {
  animation: slideIn 0.3s ease-out;
}
```

### 練習3：ダークモード

ダークモードのスタイルを追加してみてください。

```css
body.dark-mode {
  background: #1a1a2e;
}

.dark-mode .container {
  background: #16213e;
  color: #eee;
}

.dark-mode .task-item {
  background: #0f3460;
  color: #eee;
}
```

---

## 13. まとめ

このレッスンで学んだこと:

1. **レイアウト**: Flexboxで整理
2. **装飾**: グラデーション、影、角丸
3. **アニメーション**: transition、transform
4. **完了状態**: 取り消し線、透明度
5. **レスポンシブ**: メディアクエリ

### 次のステップ

次のレッスンでは、**localStorage**を使ってデータを保存します。

ページを再読み込みしても、タスクが残るようになります！
