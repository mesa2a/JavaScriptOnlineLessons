---
title: "Lesson 159: 基本構造"
author: "JavaScript学習教材"
date: "2025-11-23"
---

# Lesson 159: 基本構造

## 今回の学習

### 前回の復習

前回のレッスンでは、予算管理アプリの設計を行いました。具体的には以下の内容を学習しました。

- **プロジェクト管理**: コードを書く前に設計を行う重要性
- **設計手法**: 機能一覧、画面設計、データ構造の3ステップ
- **設計書完成**: 予算管理アプリの詳細な設計書を作成

前回作成した設計書により、これから何を作るか、どう作るかが明確になりました。

### 今回の目標

今回は、予算管理アプリの基本構造を作成します。設計書で考えた画面を、実際のHTMLとCSSで形にしていきます。

今回の学習で達成する目標は以下の通りです。

- **HTML/CSS作成**: 基本的なHTML構造とCSSスタイルを作成する
- **レイアウト構築**: タブメニュー、フォーム、一覧などの配置を決める
- **スタイル適用**: 色、フォント、余白などを設定して見やすくする

## HTMLとCSSによるUI実装

### UIフレームとは

UI（ユーザーインターフェース）フレームとは、アプリケーションの骨組みのことです。家を建てるときに、まず柱や壁の枠を作るように、アプリも最初に基本的な構造を作ります。

この段階では、まだJavaScriptで動きを付けません。ボタンを押しても何も起こりませんし、データも表示されません。しかし、「どこに何があるか」「どんな見た目か」を確認できる状態まで作ります。

料理で例えると、材料を切って並べた状態です。まだ火を通していないので食べられませんが、どんな料理になるかイメージできます。

### HTMLとCSSの役割

**HTML（構造）**
HTMLは、ページの構造を決めます。「ここにタイトルがあります」「ここに入力フォームがあります」「ここにボタンがあります」という情報を定義します。

家で例えると、「ここに部屋があります」「ここにドアがあります」「ここに窓があります」という設計図のようなものです。

**CSS（見た目）**
CSSは、見た目を決めます。「タイトルは大きく太字で」「ボタンは青色で角を丸く」「入力欄は白い背景で」といったスタイルを指定します。

家で例えると、壁の色、床の材質、照明の配置などを決める内装のようなものです。

**JavaScript（動き）**
JavaScriptは、動きを付けます。これは次のレッスン以降で実装します。「ボタンを押したらデータを追加する」「フィルターを変えたら表示を切り替える」といった動作を定義します。

家で例えると、電気、水道、エアコンなどの設備を動かす仕組みです。

## タブメニューの実装

### タブメニューとは

タブメニューは、複数の画面を切り替えるためのUIです。ブラウザのタブや、スマートフォンのアプリでよく見かけます。

予算管理アプリでは、以下の4つのタブを用意します。

- **収入タブ**: 収入の入力と一覧
- **支出タブ**: 支出の入力と一覧
- **統計タブ**: グラフと集計情報
- **設定タブ**: エクスポート・インポートなど

### タブメニューのHTML構造

タブメニューは、ボタンのリストとして作ります。

```html
<div class="tab-menu">
  <button class="tab-button active" data-tab="income">収入</button>
  <button class="tab-button" data-tab="expense">支出</button>
  <button class="tab-button" data-tab="stats">統計</button>
  <button class="tab-button" data-tab="settings">設定</button>
</div>
```

**ポイント**
- `class="tab-button"`: すべてのタブに共通のスタイルを適用するためのクラス
- `class="active"`: 現在選択されているタブを示すクラス（最初は収入タブ）
- `data-tab="income"`: どのタブかを識別するための属性（後でJavaScriptで使用）

### タブメニューのCSSスタイル

タブメニューを横並びにして、見やすくします。

```css
.tab-menu {
  display: flex;
  gap: 0;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 20px;
}

.tab-button {
  flex: 1;
  padding: 15px 20px;
  border: none;
  background-color: #f5f5f5;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 3px solid transparent;
}

.tab-button:hover {
  background-color: #e0e0e0;
}

.tab-button.active {
  background-color: #fff;
  color: #2196F3;
  border-bottom: 3px solid #2196F3;
  font-weight: bold;
}
```

**スタイルの説明**
- `display: flex`: タブを横並びにする
- `flex: 1`: 各タブが均等な幅を持つ
- `cursor: pointer`: マウスを乗せたときに指のカーソルになる
- `transition: all 0.3s`: ホバー時に滑らかに変化する
- `.active`: 選択中のタブは白背景で、下に青い線が表示される

## 入力フォームの実装

### フォームの構造

収入と支出の入力フォームは、ほぼ同じ構造です。日付、金額、カテゴリ、メモを入力できるようにします。

```html
<div class="input-form">
  <h2>新しい収入を追加</h2>

  <div class="form-group">
    <label for="date">日付</label>
    <input type="date" id="date" class="form-input">
  </div>

  <div class="form-group">
    <label for="amount">金額</label>
    <input type="number" id="amount" class="form-input" placeholder="0">
    <span class="unit">円</span>
  </div>

  <div class="form-group">
    <label for="category">カテゴリ</label>
    <select id="category" class="form-input">
      <option value="">選択してください</option>
      <option value="給料">給料</option>
      <option value="ボーナス">ボーナス</option>
      <option value="副業">副業</option>
      <option value="お小遣い">お小遣い</option>
      <option value="その他">その他</option>
    </select>
  </div>

  <div class="form-group">
    <label for="memo">メモ</label>
    <input type="text" id="memo" class="form-input" placeholder="メモを入力（任意）">
  </div>

  <button class="add-button">追加する</button>
</div>
```

**HTMLの説明**
- `<input type="date">`: 日付入力欄（カレンダーが表示される）
- `<input type="number">`: 数値入力欄（数字だけ入力できる）
- `<select>`: ドロップダウンリスト（カテゴリを選択）
- `<input type="text">`: テキスト入力欄（メモを入力）
- `placeholder`: 入力欄に表示されるヒント
- `class="form-group"`: 各入力項目をグループ化

### フォームのCSSスタイル

フォームを見やすく、使いやすくします。

```css
.input-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.input-form h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
}

.form-group {
  margin-bottom: 15px;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
  font-size: 14px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.unit {
  position: absolute;
  right: 15px;
  top: 35px;
  color: #999;
  font-size: 16px;
}

.add-button {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #45a049;
}

.add-button:active {
  transform: scale(0.98);
}
```

**スタイルの説明**
- `border-radius: 8px`: 角を丸くして柔らかい印象に
- `box-sizing: border-box`: paddingを含めた幅を100%にする
- `:focus`: 入力欄をクリックしたときに青い枠を表示
- `:hover`: マウスを乗せたときに色を濃くする
- `:active`: クリックしたときに少し小さくなる

## 一覧表示エリアの実装

### 一覧表示の構造

登録したデータを表形式で表示します。

```html
<div class="transaction-list">
  <h2>収入一覧</h2>

  <div class="list-header">
    <span class="col-date">日付</span>
    <span class="col-category">カテゴリ</span>
    <span class="col-amount">金額</span>
    <span class="col-memo">メモ</span>
    <span class="col-actions">操作</span>
  </div>

  <div id="transaction-items" class="list-items">
    <!-- ここにデータが表示される（JavaScriptで追加） -->
    <div class="empty-message">データがありません</div>
  </div>
</div>
```

**HTMLの説明**
- `.list-header`: 列のタイトル（日付、カテゴリ、金額など）
- `#transaction-items`: データが表示されるエリア（JavaScriptで動的に追加）
- `.empty-message`: データがないときのメッセージ

### 一覧表示のCSSスタイル

表形式で見やすくレイアウトします。

```css
.transaction-list {
  margin-bottom: 30px;
}

.transaction-list h2 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
}

.list-header {
  display: grid;
  grid-template-columns: 120px 100px 120px 1fr 100px;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-weight: bold;
  color: #666;
  font-size: 14px;
}

.list-items {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  min-height: 100px;
  max-height: 400px;
  overflow-y: auto;
}

.transaction-item {
  display: grid;
  grid-template-columns: 120px 100px 120px 1fr 100px;
  gap: 10px;
  padding: 15px 10px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.transaction-item:hover {
  background-color: #f9f9f9;
}

.transaction-item:last-child {
  border-bottom: none;
}

.col-date {
  color: #666;
}

.col-category {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.col-amount {
  font-weight: bold;
  font-size: 16px;
}

.col-amount.income {
  color: #4CAF50;
}

.col-amount.expense {
  color: #F44336;
}

.col-memo {
  color: #999;
  font-size: 14px;
}

.col-actions {
  display: flex;
  gap: 5px;
}

.edit-button, .delete-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.edit-button {
  background-color: #2196F3;
  color: white;
}

.delete-button {
  background-color: #F44336;
  color: white;
}

.edit-button:hover, .delete-button:hover {
  opacity: 0.8;
}

.empty-message {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 14px;
}
```

**スタイルの説明**
- `display: grid`: 列を均等に配置するためのレイアウト
- `grid-template-columns`: 各列の幅を指定（日付120px、カテゴリ100pxなど）
- `overflow-y: auto`: データが多いときにスクロールバーを表示
- `.income`: 収入は緑色で表示
- `.expense`: 支出は赤色で表示

## 統計エリアの実装

### 統計情報の構造

収入、支出、収支の合計を表示します。

```html
<div class="stats-summary">
  <div class="stat-card income-card">
    <div class="stat-label">今月の収入</div>
    <div class="stat-value" id="total-income">¥0</div>
  </div>

  <div class="stat-card expense-card">
    <div class="stat-label">今月の支出</div>
    <div class="stat-value" id="total-expense">¥0</div>
  </div>

  <div class="stat-card balance-card">
    <div class="stat-label">収支</div>
    <div class="stat-value" id="balance">¥0</div>
  </div>
</div>
```

**HTMLの説明**
- `.stat-card`: 統計情報を表示するカード
- `.stat-label`: ラベル（「今月の収入」など）
- `.stat-value`: 金額（後でJavaScriptで更新）

### 統計エリアのCSSスタイル

カード形式で見やすく表示します。

```css
.stats-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
}

.income-card .stat-value {
  color: #4CAF50;
}

.expense-card .stat-value {
  color: #F44336;
}

.balance-card .stat-value {
  color: #2196F3;
}

.balance-card .stat-value.positive {
  color: #4CAF50;
}

.balance-card .stat-value.negative {
  color: #F44336;
}
```

**スタイルの説明**
- `grid-template-columns: repeat(3, 1fr)`: 3列に均等に配置
- `box-shadow`: カードに影を付けて立体感を出す
- `.positive`: 収支がプラスのときは緑色
- `.negative`: 収支がマイナスのときは赤色

## 全体のレイアウト

### コンテナの構造

すべての要素をコンテナで包んで、中央に配置します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>予算管理アプリ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <header class="app-header">
      <h1>💰 予算管理アプリ</h1>
    </header>

    <div class="tab-menu">
      <!-- タブメニュー -->
    </div>

    <div class="tab-content">
      <div id="income-tab" class="tab-pane active">
        <!-- 収入タブの内容 -->
      </div>

      <div id="expense-tab" class="tab-pane">
        <!-- 支出タブの内容 -->
      </div>

      <div id="stats-tab" class="tab-pane">
        <!-- 統計タブの内容 -->
      </div>

      <div id="settings-tab" class="tab-pane">
        <!-- 設定タブの内容 -->
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### 全体のCSSスタイル

ページ全体のレイアウトとリセットスタイルを設定します。

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  background-color: #f0f2f5;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  font-size: 28px;
  color: #333;
}

.tab-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-pane {
  display: none;
}

.tab-pane.active {
  display: block;
}
```

**スタイルの説明**
- `* { box-sizing: border-box; }`: すべての要素でpaddingとborderを幅に含める
- `.container { max-width: 1200px; }`: 最大幅を1200pxに制限して中央に配置
- `.tab-pane { display: none; }`: 非アクティブなタブは非表示
- `.tab-pane.active { display: block; }`: アクティブなタブのみ表示

## レスポンシブデザインの基礎

### スマートフォン対応

画面幅が狭いときに、レイアウトを調整します。

```css
@media (max-width: 768px) {
  .stats-summary {
    grid-template-columns: 1fr;
  }

  .list-header, .transaction-item {
    grid-template-columns: 80px 80px 100px 1fr 80px;
    font-size: 12px;
  }

  .tab-button {
    font-size: 14px;
    padding: 12px 10px;
  }

  .container {
    padding: 10px;
  }

  .tab-content {
    padding: 15px;
  }
}
```

**レスポンシブの説明**
- `@media (max-width: 768px)`: 画面幅が768px以下のときに適用
- 統計カードを1列に変更
- 文字サイズを小さく調整
- 余白を減らす

## 練習問題

### 課題

予算管理アプリの基本構造を作成してください。HTML、CSS、JavaScriptの3つのファイルを作成し、設計書で考えた画面を実装します。

### 保存場所

`exercises/lesson-159/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML構造を記述するファイル
- `style.css` - CSSスタイルを記述するファイル
- `script.js` - JavaScriptコードを記述するファイル（今回は空のまま）

HTML、CSS、JavaScriptコードをそれぞれのファイルに記述してください。

### 手順

1. **HTML/CSS作成**
   - 基本的なHTML構造を作成する
   - タブメニューを実装する
   - 入力フォームを作成する
   - 一覧表示エリアを作成する
   - 統計エリアを作成する

2. **レイアウト構築**
   - コンテナで中央に配置する
   - タブを横並びにする
   - フォームを見やすく配置する
   - 一覧を表形式で表示する

3. **スタイル適用**
   - 色を設定する（収入は緑、支出は赤）
   - フォント、余白を調整する
   - ホバー効果を追加する
   - レスポンシブ対応を実装する

### ヒント

**HTML作成のヒント**
- `<!DOCTYPE html>`から始めましょう
- `<head>`に文字コード、タイトル、CSSリンクを記述しましょう
- セマンティックなタグ（header、main、section）を使いましょう
- idとclassを適切に使い分けましょう

**CSS作成のヒント**
- リセットスタイル（*）から始めましょう
- Flexbox、Gridを活用してレイアウトしましょう
- 色は設計書で決めた色を使いましょう
- transition を使って滑らかな動きを付けましょう

**レイアウトのヒント**
- まず大きな枠（コンテナ、ヘッダー、タブ）を作りましょう
- 次に中身（フォーム、一覧、統計）を作りましょう
- 最後に細かい調整（余白、色、フォント）をしましょう

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-159
```

すべてのテストがパス（✓マーク）すれば完成です。

### 解答例

完成したコードは `solutions/lesson-159/` フォルダにあります。

自分で実装した後、解答例と比較してみてください。解答例と違っても、同じように動作すれば問題ありません。

## まとめ

お疲れ様でした。今回のレッスンでは、予算管理アプリの基本構造を作成しました。

**今回学んだキーポイント**

**構造とスタイル**
HTMLで構造を作り、CSSで見た目を整える方法を学びました。HTMLは「何があるか」を定義し、CSSは「どう見えるか」を定義します。この2つを分離することで、メンテナンスしやすいコードになります。

**UI実装**
タブメニュー、入力フォーム、一覧表示、統計カードなど、実用的なUIコンポーネントの実装方法を学びました。これらのコンポーネントは、他のアプリでも使える汎用的なパターンです。

**レイアウト技術**
FlexboxとGrid Layoutを使って、柔軟なレイアウトを実装しました。Flexboxは横並びや縦並びに適しており、Gridは格子状のレイアウトに適しています。適切に使い分けることで、美しいレイアウトが実現できます。

**レスポンシブデザイン**
メディアクエリを使って、画面サイズに応じてレイアウトを変更する方法を学びました。スマートフォンでも見やすいデザインにすることで、より多くのユーザーに使ってもらえます。

**色とデザイン**
収入は緑、支出は赤というように、色で意味を伝える方法を学びました。また、ホバー効果やトランジションを使って、ユーザーにフィードバックを与えることの重要性も理解しました。

今回作成したUIフレームは、まだ動きません。しかし、「どこに何があるか」「どんな見た目か」が確認できる状態になりました。このフレームに、次のレッスンからJavaScriptで機能を追加していきます。

次のレッスンでは、収入管理機能を実装します。入力フォームからデータを追加し、一覧に表示する機能を作ります。今回作った美しいUIに、実際の機能を付けていきましょう。
