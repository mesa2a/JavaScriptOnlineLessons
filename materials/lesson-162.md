---
title: "Lesson 162: グラフ表示"
author: "JavaScript学習教材"
date: "2025-11-26"
---

# Lesson 162: グラフ表示

## 今回の学習

### 前回の復習

前回のレッスンでは、支出管理機能を実装しました。具体的には以下の内容を学習しました。

- **データ管理**: 収入と支出を同じ配列で管理する方法
- **日付処理**: 日付のソート、今日の日付の自動設定
- **支出機能完成**: 支出の追加、表示、削除、合計計算、収支計算

前回作成した支出管理機能により、予算管理アプリの基本機能が完成しました。

### 今回の目標

今回は、グラフ表示機能を実装します。データをビジュアルに表現することで、より分かりやすいアプリになります。

今回の学習で達成する目標は以下の通りです。

- **円グラフ作成**: カテゴリ別の支出を円グラフで表示する
- **棒グラフ作成**: 収入と支出を棒グラフで表示する
- **Canvas使用**: Canvas APIを使ってグラフを描画する

## Canvas APIとは

### Canvasの基本

Canvas（キャンバス）は、HTMLで図形を描画するための要素です。絵を描くキャンバスのように、自由に図形や線を描くことができます。

```html
<canvas id="myCanvas" width="400" height="400"></canvas>
```

このHTMLタグだけでは何も表示されません。JavaScriptを使って、このキャンバスに図形を描いていきます。

### なぜCanvasを使うのか

グラフを表示する方法は、いくつかあります。

- **HTMLとCSSだけ**: 簡単な棒グラフなら作れますが、円グラフは難しい
- **画像ファイル**: データが変わるたびに画像を作り直す必要がある
- **Canvas API**: プログラムで自由に図形を描ける

Canvas APIを使うと、データに応じて動的にグラフを描画できます。データが変わっても、JavaScriptでグラフを再描画するだけです。

### Canvasでできること

Canvasでは、以下のような図形を描けます。

- **線**: 直線、曲線
- **四角形**: 長方形、正方形
- **円**: 円、円弧、楕円
- **テキスト**: 文字を描画
- **画像**: 画像を読み込んで表示

グラフ以外にも、ゲーム、アニメーション、お絵かきアプリなど、さまざまな用途に使えます。

## Canvasの基本操作

### コンテキストの取得

Canvasに描画するには、まず「コンテキスト」を取得します。コンテキストは、描画ツールのようなものです。

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
```

**説明**
- `getElementById('myCanvas')`: Canvas要素を取得
- `getContext('2d')`: 2D描画用のコンテキストを取得
- `ctx`: コンテキストオブジェクト（これを使って描画する）

### 四角形を描く

最も基本的な図形である四角形を描いてみましょう。

```javascript
// 塗りつぶした四角形
ctx.fillStyle = '#4CAF50'; // 色を設定
ctx.fillRect(50, 50, 100, 100); // x, y, width, height
```

**説明**
- `fillStyle`: 塗りつぶしの色を設定
- `fillRect(x, y, width, height)`: 四角形を描画
  - `x`: 左上のX座標（50ピクセル）
  - `y`: 左上のY座標（50ピクセル）
  - `width`: 幅（100ピクセル）
  - `height`: 高さ（100ピクセル）

### 円を描く

円を描くには、`arc()`メソッドを使います。

```javascript
ctx.fillStyle = '#2196F3';
ctx.beginPath(); // パスの開始
ctx.arc(200, 200, 50, 0, Math.PI * 2); // 中心x, 中心y, 半径, 開始角度, 終了角度
ctx.fill(); // 塗りつぶし
```

**説明**
- `beginPath()`: 新しいパス（線や図形）を開始
- `arc(x, y, r, start, end)`: 円弧を描画
  - `x, y`: 円の中心座標
  - `r`: 半径
  - `start`: 開始角度（ラジアン）
  - `end`: 終了角度（ラジアン）
- `Math.PI * 2`: 360度（完全な円）
- `fill()`: パスを塗りつぶす

### テキストを描く

グラフにラベルを付けるために、テキストを描画します。

```javascript
ctx.fillStyle = '#333';
ctx.font = '16px Arial';
ctx.fillText('こんにちは', 100, 100);
```

**説明**
- `font`: フォントのサイズとファミリーを設定
- `fillText(text, x, y)`: テキストを描画

## 円グラフの作成

### 円グラフとは

円グラフは、全体に対する各カテゴリの割合を視覚的に表現するグラフです。予算管理アプリでは、支出のカテゴリ別割合を表示します。

例えば、以下のようなデータがあるとします。

```
食費: 30,000円（60%）
交通費: 10,000円（20%）
娯楽: 10,000円（20%）
合計: 50,000円
```

これを円グラフで表示すると、食費が円の60%を占めることが一目で分かります。

### 角度の計算

円グラフを描くには、各カテゴリの角度を計算します。

```javascript
function calculateAngles(data) {
  // データの合計を計算
  let total = 0;
  for (let key in data) {
    total += data[key];
  }

  // 各カテゴリの角度を計算
  const angles = {};
  for (let key in data) {
    angles[key] = (data[key] / total) * (Math.PI * 2);
  }

  return angles;
}
```

**計算方法**
- 合計金額を計算（50,000円）
- 各カテゴリの割合を計算（30,000 / 50,000 = 0.6）
- 割合に360度（2π）を掛けて角度を計算（0.6 × 2π = 1.2π）

### 円グラフの描画関数

```javascript
function drawPieChart(canvas, data, colors) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;

  // キャンバスをクリア
  ctx.clearRect(0, 0, width, height);

  // データがない場合
  if (Object.keys(data).length === 0) {
    ctx.fillStyle = '#999';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('データがありません', centerX, centerY);
    return;
  }

  // 合計を計算
  let total = 0;
  for (let key in data) {
    total += data[key];
  }

  // 各カテゴリを描画
  let startAngle = -Math.PI / 2; // 上から開始（12時の位置）

  for (let category in data) {
    const value = data[category];
    const angle = (value / total) * (Math.PI * 2);
    const endAngle = startAngle + angle;

    // 扇形を描画
    ctx.fillStyle = colors[category] || '#9E9E9E';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY); // 中心に移動
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();

    // パーセンテージを計算
    const percentage = ((value / total) * 100).toFixed(1);

    // ラベルを描画（割合が5%以上の場合のみ）
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
```

**描画の流れ**

1. キャンバスの中心座標と半径を計算
2. データがない場合はメッセージを表示
3. 合計金額を計算
4. 開始角度を-90度（上）に設定
5. 各カテゴリごとにループ
6. 角度を計算
7. 扇形を描画
8. パーセンテージが5%以上ならラベルを表示
9. 次のカテゴリのために開始角度を更新

### 凡例の描画

円グラフの横に、各カテゴリの色と名前、金額を表示します。

```javascript
function drawLegend(container, data, colors) {
  container.innerHTML = '';

  // 合計を計算
  let total = 0;
  for (let key in data) {
    total += data[key];
  }

  // 金額順にソート
  const sortedData = Object.entries(data).sort(function(a, b) {
    return b[1] - a[1];
  });

  // 各カテゴリの凡例を作成
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
```

## 棒グラフの作成

### 棒グラフとは

棒グラフは、複数の項目を比較するためのグラフです。予算管理アプリでは、収入と支出を並べて表示します。

```
収入: 250,000円 ████████████████████████
支出:  50,000円 ████
```

棒の長さで金額の大小が分かります。

### 棒グラフの描画関数

```javascript
function drawBarChart(canvas, income, expense) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padding = 40;
  const barWidth = 80;
  const maxValue = Math.max(income, expense) || 1;

  // キャンバスをクリア
  ctx.clearRect(0, 0, width, height);

  // データがない場合
  if (income === 0 && expense === 0) {
    ctx.fillStyle = '#999';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('データがありません', width / 2, height / 2);
    return;
  }

  // スケールを計算（最大値を棒グラフの高さに収める）
  const chartHeight = height - padding * 2;
  const scale = chartHeight / maxValue;

  // 収入の棒グラフ
  const incomeHeight = income * scale;
  const incomeX = width / 2 - barWidth - 20;
  const incomeY = height - padding - incomeHeight;

  ctx.fillStyle = '#4CAF50';
  ctx.fillRect(incomeX, incomeY, barWidth, incomeHeight);

  // 収入のラベル
  ctx.fillStyle = '#333';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('収入', incomeX + barWidth / 2, height - padding + 20);
  ctx.fillText('¥' + formatCurrency(income), incomeX + barWidth / 2, incomeY - 10);

  // 支出の棒グラフ
  const expenseHeight = expense * scale;
  const expenseX = width / 2 + 20;
  const expenseY = height - padding - expenseHeight;

  ctx.fillStyle = '#F44336';
  ctx.fillRect(expenseX, expenseY, barWidth, expenseHeight);

  // 支出のラベル
  ctx.fillStyle = '#333';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('支出', expenseX + barWidth / 2, height - padding + 20);
  ctx.fillText('¥' + formatCurrency(expense), expenseX + barWidth / 2, expenseY - 10);

  // 基準線
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();
}
```

**描画の流れ**

1. 収入と支出の最大値を計算
2. スケールを計算（最大値が棒グラフの高さに収まるように）
3. 収入の棒を描画（緑色）
4. 収入のラベルを描画
5. 支出の棒を描画（赤色）
6. 支出のラベルを描画
7. 基準線を描画

## HTMLへの組み込み

### Canvas要素の追加

統計タブにCanvas要素を追加します。

```html
<div id="stats-tab" class="tab-pane">
  <div class="stats-summary">
    <!-- 統計カード -->
  </div>

  <div class="chart-section">
    <h2>カテゴリ別支出（円グラフ）</h2>
    <div class="chart-container">
      <canvas id="pie-chart" width="300" height="300"></canvas>
      <div id="pie-legend" class="chart-legend"></div>
    </div>
  </div>

  <div class="chart-section">
    <h2>収入と支出（棒グラフ）</h2>
    <div class="chart-container">
      <canvas id="bar-chart" width="400" height="300"></canvas>
    </div>
  </div>
</div>
```

### CSSスタイル

グラフを見やすく表示するためのCSSを追加します。

```css
.chart-section {
  margin-bottom: 30px;
}

.chart-section h2 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
}

.chart-container {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  justify-content: center;
}

.chart-legend {
  flex: 1;
  max-width: 300px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.legend-item:last-child {
  border-bottom: none;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  flex-shrink: 0;
}

.legend-label {
  flex: 1;
  font-weight: bold;
}

.legend-amount {
  color: #666;
  font-size: 14px;
}
```

## グラフの更新

### 統計タブを開いたときにグラフを描画

タブを切り替えたときに、グラフを更新します。

```javascript
function updateCharts() {
  // カテゴリ別支出を計算
  const expenseByCategory = calculateExpenseByCategory();

  // 円グラフを描画
  const pieCanvas = document.getElementById('pie-chart');
  const pieLegend = document.getElementById('pie-legend');
  if (pieCanvas && pieLegend) {
    drawPieChart(pieCanvas, expenseByCategory, expenseCategories);
    drawLegend(pieLegend, expenseByCategory, expenseCategories);
  }

  // 棒グラフを描画
  const barCanvas = document.getElementById('bar-chart');
  if (barCanvas) {
    const income = calculateIncomeTotal();
    const expense = calculateExpenseTotal();
    drawBarChart(barCanvas, income, expense);
  }
}
```

### タブ切り替え時にグラフを更新

統計タブを開いたときに、グラフを描画します。

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

      // 統計タブを開いたときにグラフを更新
      if (targetTab === 'stats') {
        updateCharts();
      }
    });
  });
}
```

## ラジアンと度数

### 角度の単位

Canvasでは、角度を「ラジアン」で指定します。日常的に使う「度数」とは異なります。

- **度数**: 0度～360度（円を360等分）
- **ラジアン**: 0～2π（円周の長さで表現）

### 変換方法

度数をラジアンに変換する公式は以下の通りです。

```
ラジアン = 度数 × (π / 180)
```

例えば、90度をラジアンに変換すると以下のようになります。

```javascript
const radians = 90 * (Math.PI / 180);
// radians = π / 2 = 1.5708...
```

逆に、ラジアンを度数に変換する公式は以下の通りです。

```
度数 = ラジアン × (180 / π)
```

### よく使う角度

```javascript
0度 = 0ラジアン
90度 = Math.PI / 2
180度 = Math.PI
270度 = Math.PI * 1.5
360度 = Math.PI * 2
```

## 練習問題

### 課題

グラフ表示機能を実装してください。カテゴリ別の支出を円グラフで、収入と支出を棒グラフで表示します。

### 保存場所

`exercises/lesson-162/` フォルダに以下のファイルが用意されています。

- `index.html` - HTMLファイル（前回のレッスンから継続）
- `style.css` - CSSファイル（前回のレッスンから継続）
- `script.js` - JavaScriptコードを記述するファイル

JavaScriptコードを `script.js` に記述してください。前回の支出管理機能に、グラフ表示機能を追加します。

### 手順

1. **円グラフ作成**
   - drawPieChart関数を実装する
   - カテゴリ別の支出データを円グラフで表示する
   - パーセンテージをラベルとして表示する
   - 凡例を作成する

2. **棒グラフ作成**
   - drawBarChart関数を実装する
   - 収入と支出を棒グラフで表示する
   - 金額をラベルとして表示する

3. **Canvas使用**
   - Canvas要素をHTMLに追加する
   - getContext('2d')でコンテキストを取得する
   - arc()で円を描画する
   - fillRect()で四角形を描画する
   - fillText()でテキストを描画する

### ヒント

**円グラフのヒント**
- 開始角度を-Math.PI / 2（上）に設定しましょう
- 各カテゴリの角度 = (金額 / 合計) × (Math.PI × 2)
- arc()の第4引数が開始角度、第5引数が終了角度です
- moveTo()で中心に移動してから、arc()で円弧を描きます

**棒グラフのヒント**
- 最大値を計算してスケールを決めましょう
- 棒の高さ = 金額 × スケール
- fillRect(x, y, width, height)で四角形を描きます
- Y座標は下から上に向かって計算します

**Canvasのヒント**
- clearRect()でキャンバスをクリアしましょう
- beginPath()で新しいパスを開始しましょう
- fill()で塗りつぶし、stroke()で線を描きます
- textAlign と textBaseline でテキストの位置を調整できます

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-162
```

すべてのテストがパス（✓マーク）すれば完成です。

## まとめ

お疲れ様でした。今回のレッスンでは、グラフ表示機能を実装しました。

**今回学んだキーポイント**

**データ可視化**
数値だけでは分かりにくいデータも、グラフで表示すると一目で理解できます。円グラフで支出の内訳が分かり、棒グラフで収入と支出のバランスが分かります。データを視覚的に表現することは、ユーザーエクスペリエンスを大きく向上させます。

**Canvas API**
Canvas APIを使って、プログラムで図形を描画する方法を学びました。HTMLとCSSだけでは実現できない、複雑なグラフを描けます。Canvasは、ゲーム、アニメーション、データ可視化など、幅広い用途に使える強力な技術です。

**円グラフの描画**
扇形を組み合わせて円グラフを作る方法を学びました。角度の計算、arc()メソッドの使い方、ラベルの配置など、複数の要素を組み合わせて完成させます。ラジアンという普段使わない単位に慣れる必要がありますが、一度理解すれば応用が効きます。

**棒グラフの描画**
四角形を使って棒グラフを作る方法を学びました。スケールの計算、座標の計算、ラベルの配置など、基本的な描画技術を習得しました。棒グラフは円グラフより簡単ですが、データの比較には非常に有効です。

**動的な更新**
データが変わったときに、グラフを自動で更新する仕組みを学びました。収入や支出を追加・削除すると、グラフも自動で再描画されます。これにより、常に最新のデータが反映されたグラフを表示できます。

Canvas APIは、初めて触れる方には難しく感じるかもしれません。しかし、基本的な描画方法を理解すれば、さまざまなグラフやビジュアルを作れるようになります。今回のレッスンで学んだ技術は、他のプロジェクトでも活用できます。

次のレッスンでは、レポート機能を実装します。月別の集計や、カテゴリ別の分析など、より詳しいデータ分析ができるようにします。
