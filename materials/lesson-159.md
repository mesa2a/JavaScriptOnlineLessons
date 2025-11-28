---
title: "Lesson 159: 基本構造"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# Lesson 159: 基本構造

## 今回の学習内容

### 学習の目標

今回のレッスンでは、**予算管理アプリの基本構造**を作成します。前回の設計書で考えた画面を、実際のHTMLとCSSで形にしていきます。

今回学ぶ内容：

1. **HTML/CSS作成** - 基本的なHTML構造とCSSスタイルを作成する
2. **レイアウト構築** - タブメニュー、フォーム、一覧などの配置を決める
3. **スタイル適用** - 色、フォント、余白などを設定して見やすくする

### 前回の復習

前回のレッスンでは、予算管理アプリの設計を行いました。

- **機能一覧作成** - 必要な機能をリストアップし、優先順位を付けました
- **画面設計** - メイン画面のレイアウトを設計しました
- **データ構造設計** - トランザクションデータとカテゴリデータの形式を決めました

前回作成した設計書により、これから何を作るか、どう作るかが明確になりました。

## 日常生活の例

### 例1：家を建てる過程

家を建てることを想像してください。

**設計図ができた後：**
```
1. 設計図がある（前回のレッスン）
   - どこに部屋を作るか決まった
   - どんな間取りにするか決まった

2. 骨組みを作る（今回のレッスン）
   - 柱を立てる
   - 壁の枠を作る
   - 屋根の骨組みを作る

まだ内装はできていない：
- 電気は通っていない
- 水道も使えない
- でも、どんな家になるか分かる
```

今回のレッスンは、この「骨組みを作る」段階です。JavaScriptで動きを付けるのは、次のレッスン以降です。

### 例2：料理を作る過程

料理を作ることを考えてみましょう。

**レシピを確認した後：**
```
1. レシピを確認（前回のレッスン）
   - 材料を確認した
   - 手順を確認した

2. 材料を切って並べる（今回のレッスン）
   - 野菜を切る
   - 肉を切る
   - お皿に並べる

まだ調理していない：
- 火を通していない
- 味付けもしていない
- でも、どんな料理になるか分かる
```

今回のレッスンは、材料を準備して並べる段階です。実際に調理（機能の実装）するのは次のレッスンです。

### 例3：絵を描く過程

絵を描くことを考えてみましょう。

**下書きの段階：**
```
1. 構図を決める（前回のレッスン）
   - 何を描くか決めた
   - どこに何を配置するか決めた

2. 下書きを描く（今回のレッスン）
   - 鉛筆で輪郭を描く
   - 配置を確認する
   - バランスを整える

まだ色を塗っていない：
- 色鉛筆は使っていない
- 絵の具も使っていない
- でも、完成形がイメージできる
```

今回のレッスンは、下書きを描く段階です。色を塗る（JavaScriptで動きを付ける）のは次のレッスンです。

## HTMLとCSSによるUI実装

### UIフレームとは

UI（ユーザーインターフェース）フレームとは、アプリケーションの骨組みのことです。

**UIフレームの段階でできること：**
```
✓ 見た目を確認できる
✓ レイアウトを確認できる
✓ 色やフォントを確認できる
✓ 全体のイメージをつかめる
```

**UIフレームの段階でできないこと：**
```
✗ ボタンを押しても何も起こらない
✗ データを入力しても保存されない
✗ タブを切り替えられない
✗ 計算や処理ができない
```

これらの動きは、次のレッスン以降でJavaScriptを使って実装します。

### HTMLとCSSの役割

**HTML（構造）の役割：**
```
HTMLは「何があるか」を定義します。

例：
- ここにタイトルがあります
- ここに入力フォームがあります
- ここにボタンがあります
- ここに一覧表示があります

家で例えると：
「ここに部屋があります」
「ここにドアがあります」
「ここに窓があります」
```

**CSS（見た目）の役割：**
```
CSSは「どう見えるか」を定義します。

例：
- タイトルは大きく太字で
- ボタンは青色で角を丸く
- 入力欄は白い背景で

家で例えると：
壁の色、床の材質、照明の配置
```

**JavaScript（動き）の役割：**
```
JavaScriptは「どう動くか」を定義します。

例：
- ボタンを押したらデータを追加する
- タブをクリックしたら表示を切り替える
- 入力欄に文字を入力したら検証する

家で例えると：
電気、水道、エアコンなどの設備
```

今回は、HTMLとCSSだけを使ってUIフレームを作ります。

## タブメニューの実装

### タブメニューとは

タブメニューは、複数の画面を切り替えるためのUIです。

**日常生活の例：**
```
ノートの見出し：
┌────┬────┬────┬────┐
│収入 │支出 │統計 │設定 │
└────┴────┴────┴────┘

見出しをクリックすると、そのページが開く
```

**Webアプリでの例：**
```
ブラウザのタブ：
[ホーム] [設定] [ヘルプ]

タブをクリックすると、その画面に切り替わる
```

予算管理アプリでは、4つのタブを用意します：
- **収入タブ** - 収入の入力と一覧
- **支出タブ** - 支出の入力と一覧
- **統計タブ** - グラフと集計情報
- **設定タブ** - エクスポート・インポートなど

### タブメニューのHTML構造

```html
<div class="tab-menu">
  <button class="tab-button active" data-tab="income">収入</button>
  <button class="tab-button" data-tab="expense">支出</button>
  <button class="tab-button" data-tab="stats">統計</button>
  <button class="tab-button" data-tab="settings">設定</button>
</div>
```

**HTMLの要素の説明：**

```
<div class="tab-menu">
↑ タブメニュー全体を包むコンテナ

<button class="tab-button active">
↑ タブのボタン
  class="tab-button" → すべてのタブに共通のスタイル
  class="active" → 現在選択されているタブ（最初は収入タブ）

data-tab="income"
↑ どのタブかを識別するための属性
  後でJavaScriptで使用します
  income（収入）、expense（支出）、stats（統計）、settings（設定）
```

### タブメニューのCSSスタイル

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

**CSSプロパティの説明：**

```
display: flex;
→ タブを横並びにする
  通常は縦に並ぶが、flexを使うと横並びになる

flex: 1;
→ 各タブが均等な幅を持つ
  4つのタブがある場合、それぞれ25%の幅になる

cursor: pointer;
→ マウスを乗せたときに指のカーソルになる
  クリックできることをユーザーに伝える

transition: all 0.3s;
→ ホバー時に滑らかに変化する
  0.3秒かけて色が変わる

.active
→ 選択中のタブのスタイル
  - 白背景
  - 青い文字
  - 下に青い線
  - 太字
```

**実行の流れ（視覚的な変化）：**

```
最初の状態：
┌─────┬─────┬─────┬─────┐
│収入  │支出  │統計  │設定  │
│(白)  │(灰)  │(灰)  │(灰)  │
│ ━━ │     │     │     │
└─────┴─────┴─────┴─────┘
  ↑ activeクラスが付いている

マウスを乗せると：
┌─────┬─────┬─────┬─────┐
│収入  │支出  │統計  │設定  │
│(白)  │(濃灰)│(灰)  │(灰)  │← 濃い灰色になる
│ ━━ │     │     │     │
└─────┴─────┴─────┴─────┘
```

## 入力フォームの実装

### フォームの構造

収入と支出の入力フォームは、ほぼ同じ構造です。

**フォームで入力する項目：**
```
1. 日付 → カレンダーで選択
2. 金額 → 数値だけ入力可能
3. カテゴリ → ドロップダウンリストで選択
4. メモ → 自由に入力（任意）
```

### 入力フォームのHTML構造

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

**HTMLの要素の説明：**

```
<input type="date">
→ 日付入力欄
  クリックするとカレンダーが表示される
  形式：2025-11-26

<input type="number">
→ 数値入力欄
  数字だけ入力できる
  上下の矢印ボタンで増減できる

<select>
→ ドロップダウンリスト
  クリックすると選択肢が表示される
  <option>で選択肢を定義

<input type="text">
→ テキスト入力欄
  自由に文字を入力できる

placeholder="0"
→ 入力欄に表示されるヒント
  何も入力していないときに薄く表示される

<label for="date">
→ 入力欄のラベル
  for="date"は、id="date"の入力欄と関連付ける
  ラベルをクリックすると、入力欄にフォーカスが移る

class="form-group"
→ 各入力項目をグループ化
  ラベルと入力欄をまとめる
```

### 入力フォームのCSSスタイル

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

**CSSプロパティの説明：**

```
border-radius: 8px;
→ 角を丸くする
  8pxの半径で角を丸める
  柔らかい印象になる

box-sizing: border-box;
→ paddingを含めた幅を100%にする
  通常：width + padding = 実際の幅
  box-sizing: border-box → width = 実際の幅（paddingを含む）

:focus
→ 入力欄をクリックしたときのスタイル
  outline: none → デフォルトの枠を消す
  border-color: #2196F3 → 青い枠を表示
  box-shadow → 薄い青い影を表示

:hover
→ マウスを乗せたときのスタイル
  background-color: #45a049 → 少し濃い緑色になる

:active
→ クリックしたときのスタイル
  transform: scale(0.98) → 2%小さくなる
  押した感じを表現

position: absolute;
→ 絶対配置
  .unit（円）を入力欄の右側に配置
  position: relative; の親要素（.form-group）からの相対位置
```

**実行の流れ（視覚的な変化）：**

```
通常の状態：
┌─────────────────┐
│日付             │
│[2025-11-26]     │
└─────────────────┘

フォーカスしたとき：
┌─────────────────┐
│日付             │
│[2025-11-26]     │← 青い枠と影が表示される
└─────────────────┘
  ↑ :focusが適用される

ボタンにマウスを乗せたとき：
┌─────────────────┐
│  追加する        │← 濃い緑色になる
└─────────────────┘
  ↑ :hoverが適用される

ボタンをクリックしたとき：
┌─────────────────┐
│  追加する        │← 少し小さくなる
└─────────────────┘
  ↑ :activeが適用される
```

## 一覧表示エリアの実装

### 一覧表示の構造

登録したデータを表形式で表示します。

**表示する列：**
```
日付 | カテゴリ | 金額 | メモ | 操作
```

### 一覧表示のHTML構造

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

**HTMLの要素の説明：**

```
.list-header
→ 列のタイトル（日付、カテゴリ、金額など）
  表の一番上に固定表示される

#transaction-items
→ データが表示されるエリア
  JavaScriptで動的にデータを追加する
  idを付けることで、JavaScriptから操作しやすくする

.empty-message
→ データがないときのメッセージ
  「データがありません」と表示される
  データがあるときは非表示になる（JavaScriptで制御）
```

### 一覧表示のCSSスタイル

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

**CSSプロパティの説明：**

```
display: grid;
→ グリッドレイアウトを使う
  列を均等に配置するために使用

grid-template-columns: 120px 100px 120px 1fr 100px;
→ 各列の幅を指定
  120px: 日付の列
  100px: カテゴリの列
  120px: 金額の列
  1fr: メモの列（残りのスペースをすべて使う）
  100px: 操作の列

overflow-y: auto;
→ 縦方向にスクロールバーを表示
  データが多いときに、上下にスクロールできる
  max-height: 400px; と組み合わせて使う

:last-child
→ 最後の要素
  .transaction-item:last-child → 最後のデータ
  border-bottom: none; → 最後のデータには下線を表示しない

.income
→ 収入の金額
  color: #4CAF50; → 緑色で表示

.expense
→ 支出の金額
  color: #F44336; → 赤色で表示
```

**実行の流れ（視覚的な変化）：**

```
データがないとき：
┌──────────────────────────────┐
│日付  カテゴリ  金額  メモ  操作│
├──────────────────────────────┤
│                              │
│    データがありません         │
│                              │
└──────────────────────────────┘

データがあるとき（JavaScriptで追加された後）：
┌──────────────────────────────┐
│日付  カテゴリ  金額  メモ  操作│
├──────────────────────────────┤
│2025-11-20  給料  ¥250,000  11月分  [編][削]│
│2025-11-15  ボーナス  ¥100,000  ボーナス  [編][削]│
│2025-11-10  副業  ¥30,000  副業収入  [編][削]│
└──────────────────────────────┘

マウスを乗せたとき：
┌──────────────────────────────┐
│日付  カテゴリ  金額  メモ  操作│
├──────────────────────────────┤
│2025-11-20  給料  ¥250,000  11月分  [編][削]│← 薄い灰色の背景
│2025-11-15  ボーナス  ¥100,000  ボーナス  [編][削]│
│2025-11-10  副業  ¥30,000  副業収入  [編][削]│
└──────────────────────────────┘
  ↑ :hoverが適用される
```

## 統計エリアの実装

### 統計情報の構造

収入、支出、収支の合計をカード形式で表示します。

**表示する情報：**
```
今月の収入 | 今月の支出 | 収支
```

### 統計エリアのHTML構造

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

**HTMLの要素の説明：**

```
.stat-card
→ 統計情報を表示するカード
  3つのカードを横並びに配置

.stat-label
→ ラベル（「今月の収入」など）
  何の金額かを示す

.stat-value
→ 金額（後でJavaScriptで更新）
  id を付けることで、JavaScriptから値を変更できる

.income-card
→ 収入のカード
  緑色で表示

.expense-card
→ 支出のカード
  赤色で表示

.balance-card
→ 収支のカード
  プラスなら緑色、マイナスなら赤色
```

### 統計エリアのCSSスタイル

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

**CSSプロパティの説明：**

```
grid-template-columns: repeat(3, 1fr);
→ 3列に均等に配置
  repeat(3, 1fr) = 1fr 1fr 1fr
  1fr = 利用可能なスペースの1分の1

box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
→ カードに影を付ける
  0: 横方向のずれ（0なので真下）
  2px: 縦方向のずれ（下に2px）
  4px: ぼかしの範囲（4pxぼかす）
  rgba(0, 0, 0, 0.1): 黒色で透明度10%

text-align: center;
→ テキストを中央揃え
  カード内の文字を中央に配置

.positive
→ 収支がプラスのとき
  color: #4CAF50; → 緑色で表示

.negative
→ 収支がマイナスのとき
  color: #F44336; → 赤色で表示
```

**実行の流れ（視覚的な変化）：**

```
最初の状態（データなし）：
┌────────────┬────────────┬────────────┐
│今月の収入   │今月の支出   │収支        │
│   ¥0       │   ¥0       │   ¥0       │
│  (緑色)    │  (赤色)    │  (青色)    │
└────────────┴────────────┴────────────┘

データがあるとき（JavaScriptで更新された後）：
┌────────────┬────────────┬────────────┐
│今月の収入   │今月の支出   │収支        │
│ ¥380,000   │ ¥150,000   │+¥230,000   │
│  (緑色)    │  (赤色)    │  (緑色)    │← プラスなので緑色
└────────────┴────────────┴────────────┘

収支がマイナスのとき：
┌────────────┬────────────┬────────────┐
│今月の収入   │今月の支出   │収支        │
│ ¥100,000   │ ¥150,000   │-¥50,000    │
│  (緑色)    │  (赤色)    │  (赤色)    │← マイナスなので赤色
└────────────┴────────────┴────────────┘
```

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

**HTMLの構造の説明：**

```
<!DOCTYPE html>
→ HTML5の文書であることを宣言
  必ず一番最初に書く

<html lang="ja">
→ 日本語のページであることを示す
  言語設定

<meta charset="UTF-8">
→ 文字エンコーディングを指定
  日本語を正しく表示するために必要

<meta name="viewport" content="width=device-width, initial-scale=1.0">
→ レスポンシブデザインのための設定
  スマートフォンでも正しく表示される

<link rel="stylesheet" href="style.css">
→ CSSファイルを読み込む
  style.cssのスタイルを適用

.container
→ すべての要素を包むコンテナ
  最大幅を制限して、中央に配置

.tab-pane
→ 各タブの内容
  最初は非表示（display: none;）
  activeクラスが付いているタブだけ表示

<script src="script.js">
→ JavaScriptファイルを読み込む
  </body>の直前に配置（DOMが読み込まれた後に実行される）
```

### 全体のCSSスタイル

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

**CSSプロパティの説明：**

```
* { box-sizing: border-box; }
→ すべての要素でpaddingとborderを幅に含める
  計算が簡単になる

font-family: -apple-system, BlinkMacSystemFont, ...
→ システムフォントを使用
  各OSの標準フォントを使うので、読みやすい

background-color: #f0f2f5;
→ 背景色を薄い灰色にする
  白いカードが目立つようにする

max-width: 1200px;
→ 最大幅を1200pxに制限
  大きな画面でも読みやすい幅に保つ

margin: 0 auto;
→ 左右のmarginを自動調整
  中央に配置される

line-height: 1.6;
→ 行の高さを1.6倍にする
  読みやすくなる

.tab-pane { display: none; }
→ 非アクティブなタブは非表示
  最初はすべて非表示

.tab-pane.active { display: block; }
→ アクティブなタブのみ表示
  activeクラスが付いているタブだけ表示される
```

**実行の流れ（視覚的な変化）：**

```
ページ全体のレイアウト：

   ← 画面の端

┌────────────────────────────┐
│                            │← 背景（薄い灰色）
│  ┌──────────────────────┐ │
│  │  💰 予算管理アプリ    │ │← ヘッダー（白いカード）
│  └──────────────────────┘ │
│                            │
│  ┌──────────────────────┐ │
│  │[収入][支出][統計][設定]│ │← タブメニュー
│  ├──────────────────────┤ │
│  │                      │ │← タブコンテンツ（白いカード）
│  │  収入タブの内容       │ │
│  │                      │ │
│  └──────────────────────┘ │
│                            │
└────────────────────────────┘

   ← 最大幅1200px、中央に配置
```

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

**レスポンシブの説明：**

```
@media (max-width: 768px)
→ 画面幅が768px以下のときに適用
  768px = タブレットとスマートフォンの境界

.stats-summary { grid-template-columns: 1fr; }
→ 統計カードを1列に変更
  横に3つ → 縦に3つ

.list-header, .transaction-item {
  grid-template-columns: 80px 80px 100px 1fr 80px;
  font-size: 12px;
}
→ 列の幅を狭く調整
  120px → 80px など
  文字サイズも小さく（16px → 12px）

.tab-button { font-size: 14px; padding: 12px 10px; }
→ タブのサイズを調整
  文字サイズを小さく（16px → 14px）
  余白を減らす（15px 20px → 12px 10px）

.container { padding: 10px; }
→ コンテナの余白を減らす
  20px → 10px
  画面を広く使う

.tab-content { padding: 15px; }
→ タブコンテンツの余白を減らす
  30px → 15px
```

**実行の流れ（視覚的な変化）：**

```
PC（幅が768pxより広い）：
┌────────────┬────────────┬────────────┐
│今月の収入   │今月の支出   │収支        │
│ ¥380,000   │ ¥150,000   │+¥230,000   │
└────────────┴────────────┴────────────┘
  ↑ 横に3つ並ぶ

スマートフォン（幅が768px以下）：
┌────────────┐
│今月の収入   │
│ ¥380,000   │
├────────────┤
│今月の支出   │
│ ¥150,000   │
├────────────┤
│収支        │
│+¥230,000   │
└────────────┘
  ↑ 縦に3つ並ぶ
```

## よくある問題と解決策

### 問題1：タブが横並びにならない

**状況：**
```css
/* 期待：横並び */
/* 実際：縦並び */

.tab-menu {
  /* display: flex; を忘れている */
}
```

**原因：**
`display: flex;` を指定していない

**解決策：**
```css
.tab-menu {
  display: flex;  /* これを追加 */
  gap: 0;
  border-bottom: 2px solid #e0e0e0;
}
```

### 問題2：入力欄の幅が100%にならない

**状況：**
```css
.form-input {
  width: 100%;
  padding: 10px;
  /* 実際の幅が100%を超えてしまう */
}
```

**原因：**
`box-sizing: border-box;` を指定していない

**解決策：**
```css
.form-input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;  /* これを追加 */
}
```

**説明：**
```
box-sizing: border-box; なし：
width: 100% + padding: 10px × 2 = 100% + 20px
→ はみ出る

box-sizing: border-box; あり：
width: 100%（paddingを含む）
→ ピッタリ収まる
```

### 問題3：統計カードが3列に並ばない

**状況：**
```css
.stats-summary {
  display: grid;
  /* grid-template-columns を忘れている */
}
```

**原因：**
`grid-template-columns` を指定していない

**解決策：**
```css
.stats-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* これを追加 */
  gap: 20px;
}
```

### 問題4：タブの内容が重なって表示される

**状況：**
```html
<!-- すべてのタブが同時に表示されてしまう -->
<div id="income-tab" class="tab-pane active">収入タブ</div>
<div id="expense-tab" class="tab-pane active">支出タブ</div>
```

**原因：**
複数のタブに `active` クラスが付いている

**解決策：**
```html
<!-- 最初は1つだけにactiveクラスを付ける -->
<div id="income-tab" class="tab-pane active">収入タブ</div>
<div id="expense-tab" class="tab-pane">支出タブ</div>
<div id="stats-tab" class="tab-pane">統計タブ</div>
```

**CSS：**
```css
.tab-pane {
  display: none;  /* デフォルトは非表示 */
}

.tab-pane.active {
  display: block;  /* activeクラスが付いている場合のみ表示 */
}
```

### 問題5：スマートフォンで文字が小さすぎる

**状況：**
```html
<!-- viewport の設定を忘れている -->
<head>
  <meta charset="UTF-8">
  <title>予算管理アプリ</title>
</head>
```

**原因：**
`viewport` の設定がないため、スマートフォンでPC表示になる

**解決策：**
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>予算管理アプリ</title>
</head>
```

**説明：**
```
viewport なし：
スマートフォンでもPC表示（980px幅と仮定）
→ すべてが小さく表示される

viewport あり：
スマートフォンの実際の幅（例：375px）で表示
→ 適切なサイズで表示される
```

## 実践例：完成版のHTMLとCSS

### 完成版HTML

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
    <!-- ヘッダー -->
    <header class="app-header">
      <h1>💰 予算管理アプリ</h1>
    </header>

    <!-- タブメニュー -->
    <div class="tab-menu">
      <button class="tab-button active" data-tab="income">収入</button>
      <button class="tab-button" data-tab="expense">支出</button>
      <button class="tab-button" data-tab="stats">統計</button>
      <button class="tab-button" data-tab="settings">設定</button>
    </div>

    <!-- タブコンテンツ -->
    <div class="tab-content">
      <!-- 収入タブ -->
      <div id="income-tab" class="tab-pane active">
        <!-- 入力フォーム -->
        <div class="input-form">
          <h2>新しい収入を追加</h2>
          <div class="form-group">
            <label for="income-date">日付</label>
            <input type="date" id="income-date" class="form-input">
          </div>
          <div class="form-group">
            <label for="income-amount">金額</label>
            <input type="number" id="income-amount" class="form-input" placeholder="0">
            <span class="unit">円</span>
          </div>
          <div class="form-group">
            <label for="income-category">カテゴリ</label>
            <select id="income-category" class="form-input">
              <option value="">選択してください</option>
              <option value="給料">給料</option>
              <option value="ボーナス">ボーナス</option>
              <option value="副業">副業</option>
              <option value="お小遣い">お小遣い</option>
              <option value="その他">その他</option>
            </select>
          </div>
          <div class="form-group">
            <label for="income-memo">メモ</label>
            <input type="text" id="income-memo" class="form-input" placeholder="メモを入力（任意）">
          </div>
          <button class="add-button">追加する</button>
        </div>

        <!-- 一覧表示 -->
        <div class="transaction-list">
          <h2>収入一覧</h2>
          <div class="list-header">
            <span class="col-date">日付</span>
            <span class="col-category">カテゴリ</span>
            <span class="col-amount">金額</span>
            <span class="col-memo">メモ</span>
            <span class="col-actions">操作</span>
          </div>
          <div id="income-items" class="list-items">
            <div class="empty-message">データがありません</div>
          </div>
        </div>
      </div>

      <!-- 支出タブ -->
      <div id="expense-tab" class="tab-pane">
        <!-- 入力フォーム -->
        <div class="input-form">
          <h2>新しい支出を追加</h2>
          <div class="form-group">
            <label for="expense-date">日付</label>
            <input type="date" id="expense-date" class="form-input">
          </div>
          <div class="form-group">
            <label for="expense-amount">金額</label>
            <input type="number" id="expense-amount" class="form-input" placeholder="0">
            <span class="unit">円</span>
          </div>
          <div class="form-group">
            <label for="expense-category">カテゴリ</label>
            <select id="expense-category" class="form-input">
              <option value="">選択してください</option>
              <option value="食費">食費</option>
              <option value="交通費">交通費</option>
              <option value="娯楽">娯楽</option>
              <option value="光熱費">光熱費</option>
              <option value="家賃">家賃</option>
              <option value="通信費">通信費</option>
              <option value="医療費">医療費</option>
              <option value="日用品">日用品</option>
              <option value="被服費">被服費</option>
              <option value="その他">その他</option>
            </select>
          </div>
          <div class="form-group">
            <label for="expense-memo">メモ</label>
            <input type="text" id="expense-memo" class="form-input" placeholder="メモを入力（任意）">
          </div>
          <button class="add-button">追加する</button>
        </div>

        <!-- 一覧表示 -->
        <div class="transaction-list">
          <h2>支出一覧</h2>
          <div class="list-header">
            <span class="col-date">日付</span>
            <span class="col-category">カテゴリ</span>
            <span class="col-amount">金額</span>
            <span class="col-memo">メモ</span>
            <span class="col-actions">操作</span>
          </div>
          <div id="expense-items" class="list-items">
            <div class="empty-message">データがありません</div>
          </div>
        </div>
      </div>

      <!-- 統計タブ -->
      <div id="stats-tab" class="tab-pane">
        <h2>統計情報</h2>

        <!-- 統計サマリー -->
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

        <!-- グラフエリア（次回以降実装） -->
        <div class="chart-area">
          <p style="text-align: center; color: #999; padding: 40px;">
            グラフは次回のレッスンで実装します
          </p>
        </div>
      </div>

      <!-- 設定タブ -->
      <div id="settings-tab" class="tab-pane">
        <h2>設定</h2>
        <div class="settings-section">
          <p style="color: #999; padding: 20px;">
            設定機能は次回以降のレッスンで実装します
          </p>
        </div>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

この完成版HTMLには、前回の設計書で考えたすべての要素が含まれています。

## まとめ

お疲れ様でした。今回のレッスンでは、予算管理アプリの基本構造を作成しました。

### 今回学んだキーポイント

**1. 構造とスタイルの分離**

HTMLで構造を作り、CSSで見た目を整える方法を学びました：

- **HTMLの役割** - 「何があるか」を定義します。タブメニュー、入力フォーム、一覧表示など、ページの構造を作ります
- **CSSの役割** - 「どう見えるか」を定義します。色、フォント、レイアウト、余白などを設定します

この2つを分離することで、メンテナンスしやすいコードになります。HTMLを変えずにCSSだけ変えれば、見た目を変更できます。

**2. UI実装の基本**

タブメニュー、入力フォーム、一覧表示、統計カードなど、実用的なUIコンポーネントの実装方法を学びました：

- **タブメニュー** - Flexboxで横並びにし、activeクラスで選択状態を表現
- **入力フォーム** - type属性（date、number、text）で適切な入力欄を作成
- **一覧表示** - Grid Layoutで表形式のレイアウトを実現
- **統計カード** - Grid Layoutで均等に配置し、色で意味を伝える

これらのコンポーネントは、他のアプリでも使える汎用的なパターンです。

**3. レイアウト技術**

FlexboxとGrid Layoutを使って、柔軟なレイアウトを実装しました：

- **Flexbox** - 横並びや縦並びに適している。タブメニューや操作ボタンの配置に使用
- **Grid Layout** - 格子状のレイアウトに適している。一覧表示や統計カードの配置に使用

適切に使い分けることで、美しいレイアウトが実現できます。

**4. レスポンシブデザイン**

メディアクエリを使って、画面サイズに応じてレイアウトを変更する方法を学びました：

- `@media (max-width: 768px)` - 画面幅が768px以下のときに適用
- 統計カードを3列から1列に変更
- 文字サイズを小さく調整
- 余白を減らして画面を広く使う

スマートフォンでも見やすいデザインにすることで、より多くのユーザーに使ってもらえます。

**5. 色とデザインの活用**

収入は緑、支出は赤というように、色で意味を伝える方法を学びました：

- **色で意味を伝える** - 緑はプラス（収入、黒字）、赤はマイナス（支出、赤字）
- **ホバー効果** - マウスを乗せたときに色を変えて、クリックできることを伝える
- **トランジション** - 滑らかに変化させて、ユーザーに快適な体験を提供

また、box-shadowで立体感を出したり、border-radiusで角を丸くしたりして、見た目を整えました。

### カリキュラムの要件チェック

今回のレッスンで学んだ内容が、カリキュラムの要件を満たしているか確認しましょう。

**レッスン159の要件：**

✅ **HTML/CSS作成** - 基本的なHTML構造とCSSスタイルを作成しました

✅ **レイアウト構築** - タブメニュー、入力フォーム、一覧表示、統計カードを配置しました

✅ **スタイル適用** - 色、フォント、余白、ホバー効果、レスポンシブ対応を実装しました

すべての要件を満たしています！

### 次のレッスンの予告

次のレッスンでは、**収入管理機能**を実装します。

**次回学ぶ内容：**

- **データの追加** - 入力フォームからデータを追加する
- **データの表示** - 一覧にデータを表示する
- **データの削除** - 削除ボタンでデータを削除する
- **localStorageへの保存** - ブラウザを閉じてもデータが残るようにする

今回作った美しいUIに、実際の機能を付けていきます。ボタンを押したら本当にデータが追加されるようになります。楽しみにしていてください！
