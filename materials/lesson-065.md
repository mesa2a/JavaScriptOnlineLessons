---
title: "Lesson 065: マウスイベント"
author: "JavaScript学習教材"
date: "2025-11-26"
---

## 今回の学習

### 前回の復習

前回のレッスンでは、`addEventListener`の基礎について学びました。`onclick`属性よりも柔軟で強力な方法として、`addEventListener`を使うことで、HTMLとJavaScriptを分離し、複数のイベントリスナーを登録できるようになりました。

これまで学んだ主なイベント：

- **click**: クリックされた時
- **addEventListener**: イベントリスナーの登録
- **複数のリスナー**: 同じ要素に複数の処理を登録

### 今回の目標

今回のレッスンでは、**マウスイベント**について学びます。クリック以外にも、マウスの動きに反応するさまざまなイベントがあります。これらを使いこなすことで、より豊かなユーザーインタラクションを実現できます。

今回のレッスンで習得する内容は以下の通りです。

- **mouseover/mouseout**: マウスカーソルの出入りを検出し、ホバーエフェクトを実装します
- **mousedown/mouseup**: マウスボタンの押下と離上を個別に検出します
- **ホバーエフェクト**: 色、サイズ、影などのスタイルを動的に変更し、インタラクティブなUIを作ります

### このレッスンの重要性

マウスイベントは、モダンなWebアプリケーションにおいて欠かせない要素です。ユーザーがマウスを動かすだけで、視覚的なフィードバックを提供することで、直感的で使いやすいインターフェースを実現できます。

このレッスンで学ぶ技術は、以下のような場面で活用されます。

- **ボタンやリンク**: ホバーエフェクトでクリック可能であることを示す
- **画像ギャラリー**: サムネイルにマウスを乗せると拡大表示
- **ツールチップ**: ヘルプアイコンにマウスを乗せると説明を表示
- **ドラッグ＆ドロップ**: 要素を掴んで移動する操作の基礎
- **インタラクティブな図表**: データにマウスを乗せると詳細を表示

## 実世界での活用例

マウスイベントは、実際のWebアプリケーションでどのように使われているのでしょうか。

### 例1: Eコマースサイトの商品カード（Amazon）

Amazonなどのショッピングサイトでは、商品カードにマウスを乗せると、さまざまな情報が表示されます。

```javascript
// 商品カードのホバーエフェクト
let productCards = document.getElementsByClassName("product-card");

for (let i = 0; i < productCards.length; i++) {
  let card = productCards[i];
  let quickView = card.querySelector(".quick-view");
  let addToCart = card.querySelector(".add-to-cart-btn");
  let image = card.querySelector(".product-image");

  // マウスが乗った時
  card.addEventListener("mouseover", function() {
    // 影を追加して浮き上がった感じに
    card.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
    card.style.transform = "translateY(-5px)";

    // クイックビューボタンを表示
    quickView.style.display = "block";
    quickView.style.opacity = "1";

    // カートに追加ボタンを表示
    addToCart.style.display = "block";

    // 画像を少し拡大
    image.style.transform = "scale(1.05)";
  });

  // マウスが離れた時
  card.addEventListener("mouseout", function() {
    // 元の状態に戻す
    card.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
    card.style.transform = "translateY(0)";

    // ボタンを非表示
    quickView.style.display = "none";
    quickView.style.opacity = "0";
    addToCart.style.display = "none";

    // 画像を元のサイズに
    image.style.transform = "scale(1)";
  });

  // ボタンが押された時の視覚的フィードバック
  addToCart.addEventListener("mousedown", function() {
    addToCart.style.transform = "scale(0.95)";
    addToCart.style.backgroundColor = "#e67e22";
  });

  addToCart.addEventListener("mouseup", function() {
    addToCart.style.transform = "scale(1)";
    addToCart.style.backgroundColor = "#f39c12";
  });
}
```

この例では、商品カードにマウスを乗せると：

1. **カードが浮き上がる**: 影を濃くして、少し上に移動
2. **追加情報を表示**: クイックビューボタンやカート追加ボタンが出現
3. **画像が拡大**: 商品画像が少し大きくなる
4. **ボタンの反応**: ボタンを押すと色が変わる

これにより、ユーザーはどのカードにフォーカスしているかを明確に認識できます。

### 例2: SNSの投稿アクション（Twitter/X、Facebook）

SNSでは、投稿に対するアクションボタン（いいね、シェア、コメント）にホバーエフェクトが実装されています。

```javascript
// いいねボタンのホバーエフェクト
let likeButtons = document.getElementsByClassName("like-button");

for (let i = 0; i < likeButtons.length; i++) {
  let button = likeButtons[i];
  let icon = button.querySelector(".like-icon");
  let tooltip = button.querySelector(".tooltip");

  // マウスが乗った時
  button.addEventListener("mouseover", function() {
    // 背景色を変更
    button.style.backgroundColor = "rgba(244, 67, 54, 0.1)";

    // アイコンの色を変更
    icon.style.color = "#f44336";

    // アイコンを少し拡大
    icon.style.transform = "scale(1.2)";

    // ツールチップを表示
    if (tooltip) {
      tooltip.style.display = "block";
      tooltip.style.opacity = "1";
    }
  });

  // マウスが離れた時
  button.addEventListener("mouseout", function() {
    // 元の状態に戻す
    button.style.backgroundColor = "transparent";
    icon.style.color = "#65676b";
    icon.style.transform = "scale(1)";

    // ツールチップを非表示
    if (tooltip) {
      tooltip.style.display = "none";
      tooltip.style.opacity = "0";
    }
  });

  // ボタンを押した時
  button.addEventListener("mousedown", function() {
    icon.style.transform = "scale(1.1)";
  });

  // ボタンを離した時
  button.addEventListener("mouseup", function() {
    icon.style.transform = "scale(1.2)";

    // アニメーション効果
    icon.classList.add("pulse-animation");
    setTimeout(function() {
      icon.classList.remove("pulse-animation");
    }, 300);
  });
}
```

この例では、いいねボタンにマウスを乗せると：

1. **背景色が変化**: 薄い赤色に変わる
2. **アイコンが赤くなる**: グレーから赤に変化
3. **アイコンが拡大**: 少し大きくなって注目を集める
4. **ツールチップを表示**: 「いいね」などの説明を表示

### 例3: データ可視化のツールチップ（Tableau、Google Charts）

データ可視化ツールでは、グラフの要素にマウスを乗せると詳細情報が表示されます。

```javascript
// グラフのバーにホバーした時の詳細表示
let chartBars = document.getElementsByClassName("chart-bar");

for (let i = 0; i < chartBars.length; i++) {
  let bar = chartBars[i];
  let value = bar.getAttribute("data-value");
  let label = bar.getAttribute("data-label");
  let tooltip = document.getElementById("chart-tooltip");

  // マウスが乗った時
  bar.addEventListener("mouseover", function(event) {
    // バーをハイライト
    bar.style.fill = "#2196F3";
    bar.style.opacity = "1";

    // ツールチップに情報を設定
    tooltip.innerHTML =
      "<strong>" + label + "</strong><br>" +
      "値: " + value + "<br>" +
      "前月比: +12%";

    // ツールチップを表示
    tooltip.style.display = "block";
    tooltip.style.left = event.clientX + 10 + "px";
    tooltip.style.top = event.clientY + 10 + "px";
  });

  // マウスが動いた時（ツールチップを追従させる）
  bar.addEventListener("mousemove", function(event) {
    tooltip.style.left = event.clientX + 10 + "px";
    tooltip.style.top = event.clientY + 10 + "px";
  });

  // マウスが離れた時
  bar.addEventListener("mouseout", function() {
    // バーを元の色に戻す
    bar.style.fill = "#90CAF9";
    bar.style.opacity = "0.8";

    // ツールチップを非表示
    tooltip.style.display = "none";
  });
}
```

この例では、グラフのバーにマウスを乗せると：

1. **バーがハイライト**: 色が濃くなり、不透明度が上がる
2. **詳細情報を表示**: 値、ラベル、前月比などを表示
3. **ツールチップが追従**: マウスカーソルの近くに表示され、動きに追従

### 例4: 画像ギャラリーのプレビュー（Pinterest、Instagram）

画像ギャラリーでは、サムネイルにマウスを乗せると拡大表示や追加情報が表示されます。

```javascript
// 画像ギャラリーのホバーエフェクト
let galleryItems = document.getElementsByClassName("gallery-item");

for (let i = 0; i < galleryItems.length; i++) {
  let item = galleryItems[i];
  let image = item.querySelector(".gallery-image");
  let overlay = item.querySelector(".overlay");
  let info = item.querySelector(".image-info");

  // マウスが乗った時
  item.addEventListener("mouseover", function() {
    // 画像を拡大
    image.style.transform = "scale(1.1)";

    // オーバーレイを表示
    overlay.style.opacity = "1";

    // 画像情報を表示
    info.style.opacity = "1";
    info.style.transform = "translateY(0)";
  });

  // マウスが離れた時
  item.addEventListener("mouseout", function() {
    // 画像を元のサイズに戻す
    image.style.transform = "scale(1)";

    // オーバーレイを非表示
    overlay.style.opacity = "0";

    // 画像情報を非表示
    info.style.opacity = "0";
    info.style.transform = "translateY(20px)";
  });

  // クリックで詳細表示（mousedown/mouseupでフィードバック）
  item.addEventListener("mousedown", function() {
    item.style.transform = "scale(0.98)";
  });

  item.addEventListener("mouseup", function() {
    item.style.transform = "scale(1)";
  });
}
```

この例では、画像にマウスを乗せると：

1. **画像が拡大**: 1.1倍に拡大してプレビュー
2. **暗いオーバーレイを表示**: 画像に半透明の黒い層を重ねる
3. **タイトルや説明を表示**: 画像の情報が下からスライドイン
4. **クリック時の反応**: 押すと少し縮み、ボタンらしさを演出

### 例5: ドキュメントエディタのツールバー（Google Docs、Notion）

ドキュメントエディタでは、ツールバーのボタンにマウスを乗せると、機能説明が表示されます。

```javascript
// ツールバーボタンのホバーエフェクト
let toolbarButtons = document.getElementsByClassName("toolbar-button");

for (let i = 0; i < toolbarButtons.length; i++) {
  let button = toolbarButtons[i];
  let icon = button.querySelector(".icon");
  let label = button.getAttribute("data-label");
  let shortcut = button.getAttribute("data-shortcut");
  let tooltip = document.getElementById("toolbar-tooltip");

  // マウスが乗った時
  button.addEventListener("mouseover", function(event) {
    // ボタンの背景色を変更
    button.style.backgroundColor = "#f0f0f0";

    // アイコンの色を変更
    icon.style.color = "#1976D2";

    // ツールチップに情報を設定
    let tooltipContent = label;
    if (shortcut) {
      tooltipContent = tooltipContent + " (" + shortcut + ")";
    }
    tooltip.textContent = tooltipContent;

    // ツールチップを表示（ボタンの下に）
    tooltip.style.display = "block";
    tooltip.style.left = button.offsetLeft + "px";
    tooltip.style.top = (button.offsetTop + button.offsetHeight + 5) + "px";

    // 遅延表示（500ms後に表示）
    setTimeout(function() {
      tooltip.style.opacity = "1";
    }, 500);
  });

  // マウスが離れた時
  button.addEventListener("mouseout", function() {
    // ボタンを元の状態に戻す
    button.style.backgroundColor = "transparent";
    icon.style.color = "#666";

    // ツールチップを非表示
    tooltip.style.display = "none";
    tooltip.style.opacity = "0";
  });

  // ボタンを押した時
  button.addEventListener("mousedown", function() {
    button.style.backgroundColor = "#e0e0e0";
    button.style.transform = "scale(0.95)";
  });

  // ボタンを離した時
  button.addEventListener("mouseup", function() {
    button.style.backgroundColor = "#f0f0f0";
    button.style.transform = "scale(1)";
  });
}
```

この例では、ツールバーボタンにマウスを乗せると：

1. **背景色が変化**: グレーの背景が表示される
2. **アイコンの色が変化**: 青色に変わって強調される
3. **ツールチップを表示**: 機能名とショートカットキーを表示
4. **押下時の視覚的フィードバック**: 押すと色が濃くなり、少し縮む

これらの実例から、マウスイベントは以下のような場面で活用されていることが分かります。

- **Eコマース**: 商品カード、カートボタン
- **SNS**: いいね、シェア、コメントボタン
- **データ可視化**: グラフ、チャート、ダッシュボード
- **画像ギャラリー**: サムネイル、プレビュー
- **エディタ**: ツールバー、メニュー

マウスイベントを効果的に使うことで、ユーザーにとって直感的で使いやすいインターフェースを実現できます。

## マウスイベントの種類

JavaScriptには、マウスの動きに反応するさまざまなイベントがあります。主なマウスイベントは以下の通りです。

### 基本的なマウスイベント

**位置に関するイベント:**

- **mouseover**: マウスカーソルが要素の上に乗った時
- **mouseout**: マウスカーソルが要素から離れた時
- **mouseenter**: マウスカーソルが要素に入った時（子要素では発火しない）
- **mouseleave**: マウスカーソルが要素から出た時（子要素では発火しない）
- **mousemove**: マウスカーソルが要素上で移動した時

**クリックに関するイベント:**

- **click**: マウスをクリックした時（押して離す）
- **dblclick**: ダブルクリックした時
- **mousedown**: マウスボタンを押した時
- **mouseup**: マウスボタンを離した時

**その他:**

- **contextmenu**: 右クリックした時（コンテキストメニューを開く）
- **wheel**: マウスホイールをスクロールした時

今回は、特に`mouseover`、`mouseout`、`mousedown`、`mouseup`について詳しく学びます。

### mouseoverとmouseenterの違い

`mouseover`と`mouseenter`は似ていますが、重要な違いがあります。

```html
<div id="parent">
  親要素
  <div id="child">子要素</div>
</div>
```

```javascript
let parent = document.getElementById("parent");

// mouseoverは子要素でも発火する
parent.addEventListener("mouseover", function() {
  console.log("mouseover: 発火");
});

// mouseenterは親要素に入った時だけ発火
parent.addEventListener("mouseenter", function() {
  console.log("mouseenter: 発火");
});
```

**動作の違い:**

- **mouseover**: 親要素から子要素に移動した時も発火する（バブリング）
- **mouseenter**: 親要素に入った時だけ発火する（バブリングしない）

ほとんどの場合、`mouseenter`/`mouseleave`の方が直感的な動作をします。しかし、今回のレッスンでは基本的な`mouseover`/`mouseout`を使用します。

## mouseover/mouseoutイベント

`mouseover`と`mouseout`は、マウスカーソルが要素の上に乗った時と離れた時に発生するイベントです。これらを使うことで、ホバーエフェクトを実装できます。

### 基本的な使い方

```javascript
let box = document.getElementById("box");

box.addEventListener("mouseover", function() {
  console.log("マウスが乗りました");
});

box.addEventListener("mouseout", function() {
  console.log("マウスが離れました");
});
```

このコードでは、マウスカーソルが`box`要素の上に乗ると「マウスが乗りました」と表示され、離れると「マウスが離れました」と表示されます。

### 実践例：色が変わるボックス

マウスが乗ると色が変わるボックスを作ってみましょう。

```html
<div id="colorBox" style="width: 200px; height: 200px; background-color: lightblue;">
  マウスを乗せてね
</div>
```

```javascript
let colorBox = document.getElementById("colorBox");

colorBox.addEventListener("mouseover", function() {
  colorBox.style.backgroundColor = "lightcoral";
});

colorBox.addEventListener("mouseout", function() {
  colorBox.style.backgroundColor = "lightblue";
});
```

このコードでは、以下の動作をします。

1. マウスが乗ると、背景色が薄い青（lightblue）から薄い赤（lightcoral）に変わります
2. マウスが離れると、背景色が元の薄い青に戻ります

これは、Webサイトでよく見るホバーエフェクトの基本です。

### イベントオブジェクトの活用

マウスイベントのイベントオブジェクトには、マウスカーソルの位置などの情報が含まれています。

```javascript
let box = document.getElementById("box");

box.addEventListener("mouseover", function(event) {
  console.log("マウス位置 X:", event.clientX);
  console.log("マウス位置 Y:", event.clientY);
  console.log("要素:", event.target);
});
```

**主なプロパティ:**

- `event.clientX`: ブラウザウィンドウ左端からのX座標
- `event.clientY`: ブラウザウィンドウ上端からのY座標
- `event.pageX`: ページ全体の左端からのX座標（スクロール含む）
- `event.pageY`: ページ全体の上端からのY座標（スクロール含む）
- `event.target`: イベントが発生した要素
- `event.relatedTarget`: マウスが移動してきた元の要素（mouseoverの場合）

## ホバーエフェクトの応用

ホバーエフェクトは、色の変化だけでなく、さまざまな視覚効果に使えます。

### 例1: サイズの変更

```javascript
let box = document.getElementById("box");

box.addEventListener("mouseover", function() {
  box.style.transform = "scale(1.2)";
  box.style.transition = "transform 0.3s";
});

box.addEventListener("mouseout", function() {
  box.style.transform = "scale(1)";
});
```

マウスが乗ると要素が1.2倍に拡大され、離れると元のサイズに戻ります。

**ポイント:**

- `transform: scale(1.2)`: 要素を1.2倍に拡大
- `transition: transform 0.3s`: 変化を0.3秒かけてスムーズに

### 例2: テキストの表示

```javascript
let box = document.getElementById("box");
let message = document.getElementById("message");

box.addEventListener("mouseover", function() {
  message.textContent = "ようこそ！";
  message.style.color = "green";
});

box.addEventListener("mouseout", function() {
  message.textContent = "";
});
```

マウスが乗るとメッセージが表示され、離れると消えます。

### 例3: 複数のスタイル変更

```javascript
let card = document.getElementById("card");

card.addEventListener("mouseover", function() {
  card.style.backgroundColor = "lightyellow";
  card.style.borderColor = "orange";
  card.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
  card.style.transform = "translateY(-5px)";
});

card.addEventListener("mouseout", function() {
  card.style.backgroundColor = "white";
  card.style.borderColor = "gray";
  card.style.boxShadow = "none";
  card.style.transform = "translateY(0)";
});
```

マウスが乗ると、以下の変化が起こります。

1. **背景色**: 白から薄い黄色に変化
2. **枠線の色**: グレーからオレンジに変化
3. **影**: 影が追加される
4. **位置**: 上に5px移動（浮き上がった感じ）

これにより、カードが浮き上がったような効果を作れます。

### 例4: 画像の明るさ変更

```javascript
let image = document.getElementById("productImage");

image.addEventListener("mouseover", function() {
  image.style.filter = "brightness(1.2)";
  image.style.cursor = "pointer";
});

image.addEventListener("mouseout", function() {
  image.style.filter = "brightness(1)";
});
```

マウスが乗ると画像が20%明るくなり、クリック可能であることを示します。

### 例5: アニメーション付きテキスト

```javascript
let heading = document.getElementById("heading");

heading.addEventListener("mouseover", function() {
  heading.style.color = "#2196F3";
  heading.style.letterSpacing = "2px";
  heading.style.transition = "all 0.3s ease";
});

heading.addEventListener("mouseout", function() {
  heading.style.color = "#333";
  heading.style.letterSpacing = "normal";
});
```

マウスが乗ると、テキストの色が変わり、文字間隔が広がります。

## mousedown/mouseupイベント

`mousedown`と`mouseup`は、マウスボタンの押下と離上を検出するイベントです。`click`イベントとの違いは、`click`が「押して離す」までの一連の動作であるのに対し、`mousedown`と`mouseup`はそれぞれ独立したタイミングで発生します。

### clickとmousedown/mouseupの違い

```javascript
let button = document.getElementById("button");

// clickイベント（押して離した時）
button.addEventListener("click", function() {
  console.log("3. クリックされました");
});

// mousedownイベント（押した時）
button.addEventListener("mousedown", function() {
  console.log("1. マウスボタンが押されました");
});

// mouseupイベント（離した時）
button.addEventListener("mouseup", function() {
  console.log("2. マウスボタンが離されました");
});
```

実行順序は以下の通りです。

1. マウスボタンを押す → "1. マウスボタンが押されました"
2. マウスボタンを離す → "2. マウスボタンが離されました"
3. クリック完了 → "3. クリックされました"

### イベントオブジェクトの活用

`mousedown`/`mouseup`イベントでは、どのマウスボタンが押されたかを判別できます。

```javascript
button.addEventListener("mousedown", function(event) {
  if (event.button === 0) {
    console.log("左クリック");
  } else if (event.button === 1) {
    console.log("ホイールクリック");
  } else if (event.button === 2) {
    console.log("右クリック");
  }
});
```

**event.buttonの値:**

- `0`: 左ボタン
- `1`: ホイールボタン（中ボタン）
- `2`: 右ボタン

### 実践例：押している間だけ効果を適用

`mousedown`と`mouseup`を使うと、押している間だけ特定の効果を適用できます。

```javascript
let button = document.getElementById("button");

button.addEventListener("mousedown", function() {
  button.style.backgroundColor = "darkblue";
  button.style.color = "white";
  button.style.transform = "scale(0.95)";
});

button.addEventListener("mouseup", function() {
  button.style.backgroundColor = "lightblue";
  button.style.color = "black";
  button.style.transform = "scale(1)";
});
```

このコードでは、マウスボタンを押している間だけボタンが暗い色になり、少し縮みます。離すと元に戻ります。

これは、ボタンが押されていることを視覚的にフィードバックする良い方法です。

### 実践例：押下時間の測定

`mousedown`と`mouseup`のタイミングを利用して、ボタンが押されていた時間を測定できます。

```javascript
let button = document.getElementById("button");
let startTime = 0;

button.addEventListener("mousedown", function() {
  startTime = Date.now();
  console.log("ボタンが押されました");
});

button.addEventListener("mouseup", function() {
  let endTime = Date.now();
  let duration = endTime - startTime;
  console.log("押下時間: " + duration + "ミリ秒");
});
```

### 実践例：ドラッグ可能な要素の基礎

`mousedown`と`mouseup`は、ドラッグ＆ドロップの実装にも使われます（完全な実装は後のレッスンで学びます）。

```javascript
let box = document.getElementById("box");
let isDragging = false;

box.addEventListener("mousedown", function() {
  isDragging = true;
  box.style.cursor = "grabbing";
  box.style.opacity = "0.7";
  console.log("ドラッグ開始");
});

document.addEventListener("mouseup", function() {
  if (isDragging) {
    isDragging = false;
    box.style.cursor = "grab";
    box.style.opacity = "1";
    console.log("ドラッグ終了");
  }
});

// mousemoveイベントで実際の移動を実装（次のレッスンで学びます）
```

このコードでは、マウスボタンを押すとドラッグ状態になり、カーソルの形と要素の不透明度が変わります。

## 複数のマウスイベントを組み合わせる

実際のアプリケーションでは、複数のマウスイベントを組み合わせて使うことが多いです。

### 例：インタラクティブなカード

```html
<div id="interactiveCard" style="width: 250px; height: 200px; background-color: white; border: 2px solid #ddd; padding: 20px; border-radius: 10px;">
  <h3>商品カード</h3>
  <p>マウスを動かしてみてください</p>
</div>
<p id="status" style="margin-top: 20px; font-weight: bold;"></p>
```

```javascript
let card = document.getElementById("interactiveCard");
let status = document.getElementById("status");

// マウスが乗った時
card.addEventListener("mouseover", function() {
  card.style.backgroundColor = "#e3f2fd";
  card.style.borderColor = "#2196F3";
  card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
  card.style.transform = "translateY(-3px)";
  card.style.transition = "all 0.3s ease";
  status.textContent = "カードの上にマウスがあります";
  status.style.color = "#2196F3";
});

// マウスが離れた時
card.addEventListener("mouseout", function() {
  card.style.backgroundColor = "white";
  card.style.borderColor = "#ddd";
  card.style.boxShadow = "none";
  card.style.transform = "translateY(0)";
  status.textContent = "";
});

// マウスボタンを押した時
card.addEventListener("mousedown", function() {
  card.style.transform = "translateY(-2px) scale(0.98)";
  card.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  status.textContent = "カードが押されています";
  status.style.color = "#1976D2";
});

// マウスボタンを離した時
card.addEventListener("mouseup", function() {
  card.style.transform = "translateY(-3px) scale(1)";
  card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
  status.textContent = "カードの上にマウスがあります";
  status.style.color = "#2196F3";
});

// クリックした時
card.addEventListener("click", function() {
  status.textContent = "カードがクリックされました！";
  status.style.color = "#4CAF50";

  // 2秒後に元に戻す
  setTimeout(function() {
    if (card.matches(":hover")) {
      status.textContent = "カードの上にマウスがあります";
      status.style.color = "#2196F3";
    } else {
      status.textContent = "";
    }
  }, 2000);
});
```

このコードでは、カードに対するさまざまなマウス操作に反応します。

1. **ホバー**: マウスが乗ると色が変わり、少し浮き上がる
2. **押下**: マウスボタンを押すと少し縮む
3. **離上**: マウスボタンを離すと元のサイズに戻る
4. **クリック**: クリックするとメッセージが表示される

これにより、ユーザーはカードが反応していることを明確に感じられます。

## イベントの発生順序

マウスでクリックする際、複数のイベントが順番に発生します。この順序を理解しておくと、複雑なインタラクションを実装する際に役立ちます。

### 基本的な発生順序

```javascript
let box = document.getElementById("box");

box.addEventListener("mouseover", function() {
  console.log("1. mouseover");
});

box.addEventListener("mouseenter", function() {
  console.log("2. mouseenter");
});

box.addEventListener("mousedown", function() {
  console.log("3. mousedown");
});

box.addEventListener("mouseup", function() {
  console.log("4. mouseup");
});

box.addEventListener("click", function() {
  console.log("5. click");
});

box.addEventListener("mouseout", function() {
  console.log("6. mouseout");
});

box.addEventListener("mouseleave", function() {
  console.log("7. mouseleave");
});
```

実際の動作順序は以下の通りです。

**マウスを要素の上に移動:**
1. `mouseover`
2. `mouseenter`

**マウスボタンを押す:**
3. `mousedown`

**マウスボタンを離す:**
4. `mouseup`
5. `click`

**マウスを要素から離す:**
6. `mouseout`
7. `mouseleave`

### イベントのキャンセル

`mousedown`イベントで`event.preventDefault()`を呼び出すと、テキストの選択を防ぐことができます。

```javascript
let box = document.getElementById("box");

box.addEventListener("mousedown", function(event) {
  event.preventDefault(); // テキスト選択を防ぐ
  console.log("マウスボタンが押されました");
});
```

これは、ドラッグ操作を実装する際に、意図しないテキスト選択を防ぐために使います。

## 実用的なパターン

### パターン1: ツールチップの表示

マウスを乗せると説明が表示されるツールチップを実装できます。

```html
<button id="helpButton" style="padding: 10px;">?</button>
<div id="tooltip" style="display: none; position: absolute; background: black; color: white; padding: 5px; border-radius: 3px;">
  ここにヘルプメッセージ
</div>
```

```javascript
let helpButton = document.getElementById("helpButton");
let tooltip = document.getElementById("tooltip");

helpButton.addEventListener("mouseover", function(event) {
  tooltip.style.display = "block";
  tooltip.style.left = (event.clientX + 10) + "px";
  tooltip.style.top = (event.clientY + 10) + "px";
});

helpButton.addEventListener("mouseout", function() {
  tooltip.style.display = "none";
});

// マウスの動きに追従
helpButton.addEventListener("mousemove", function(event) {
  tooltip.style.left = (event.clientX + 10) + "px";
  tooltip.style.top = (event.clientY + 10) + "px";
});
```

### パターン2: ボタンのフィードバック

ボタンが押されていることを視覚的にフィードバックします。

```javascript
let button = document.getElementById("button");

// ホバー時
button.addEventListener("mouseover", function() {
  button.style.backgroundColor = "#1976D2";
});

button.addEventListener("mouseout", function() {
  button.style.backgroundColor = "#2196F3";
});

// 押下時
button.addEventListener("mousedown", function() {
  button.style.transform = "translateY(2px)";
  button.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
});

button.addEventListener("mouseup", function() {
  button.style.transform = "translateY(0)";
  button.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
});
```

### パターン3: 画像のプレビュー

マウスを乗せると画像が拡大表示されます。

```javascript
let thumbnail = document.getElementById("thumbnail");
let container = thumbnail.parentElement;

thumbnail.addEventListener("mouseover", function() {
  thumbnail.style.transform = "scale(1.5)";
  thumbnail.style.zIndex = "100";
  thumbnail.style.transition = "transform 0.3s ease";

  // コンテナからはみ出さないようにする
  container.style.overflow = "visible";
});

thumbnail.addEventListener("mouseout", function() {
  thumbnail.style.transform = "scale(1)";
  thumbnail.style.zIndex = "1";

  container.style.overflow = "hidden";
});
```

### パターン4: アコーディオンメニュー

マウスを乗せるとメニューが開きます。

```javascript
let menuItem = document.getElementById("menuItem");
let submenu = document.getElementById("submenu");

menuItem.addEventListener("mouseover", function() {
  submenu.style.display = "block";
  submenu.style.opacity = "0";

  // アニメーション付きで表示
  setTimeout(function() {
    submenu.style.opacity = "1";
    submenu.style.transition = "opacity 0.3s ease";
  }, 10);
});

menuItem.addEventListener("mouseout", function() {
  submenu.style.opacity = "0";

  setTimeout(function() {
    submenu.style.display = "none";
  }, 300);
});
```

### パターン5: カラーピッカー

色サンプルにマウスを乗せると、プレビューが表示されます。

```javascript
let colorSamples = document.getElementsByClassName("color-sample");
let preview = document.getElementById("preview");

for (let i = 0; i < colorSamples.length; i++) {
  let sample = colorSamples[i];
  let color = sample.getAttribute("data-color");

  sample.addEventListener("mouseover", function() {
    preview.style.backgroundColor = color;
    preview.textContent = color;
  });

  sample.addEventListener("click", function() {
    // 選択された色を保存
    console.log("選択された色: " + color);
  });
}
```

## よくあるミスと解決方法

### ミス1: mouseoutが子要素でも発火する

**問題のコード:**

```javascript
let parent = document.getElementById("parent");

parent.addEventListener("mouseout", function() {
  parent.style.backgroundColor = "white";
});
```

**何が問題か:**

親要素から子要素にマウスを移動した時も`mouseout`が発火してしまいます。

**解決方法:**

`mouseleave`を使うか、`event.relatedTarget`をチェックします。

```javascript
// 方法1: mouseleaveを使う
parent.addEventListener("mouseleave", function() {
  parent.style.backgroundColor = "white";
});

// 方法2: relatedTargetをチェック
parent.addEventListener("mouseout", function(event) {
  if (!parent.contains(event.relatedTarget)) {
    parent.style.backgroundColor = "white";
  }
});
```

### ミス2: トランジションが設定されていない

**問題のコード:**

```javascript
box.addEventListener("mouseover", function() {
  box.style.transform = "scale(1.2)";
});
```

**何が問題か:**

変化が瞬時に起こり、滑らかな動きになりません。

**解決方法:**

CSSまたはJavaScriptで`transition`を設定します。

```javascript
// 方法1: CSSで設定（推奨）
// CSS: #box { transition: transform 0.3s ease; }

// 方法2: JavaScriptで設定
box.style.transition = "transform 0.3s ease";
box.addEventListener("mouseover", function() {
  box.style.transform = "scale(1.2)";
});
```

### ミス3: イベントリスナーの重複登録

**問題のコード:**

```javascript
function setupHover() {
  let box = document.getElementById("box");

  box.addEventListener("mouseover", function() {
    box.style.backgroundColor = "red";
  });
}

// 何度も呼ばれる
setupHover();
setupHover();
setupHover();
```

**何が問題か:**

同じイベントリスナーが複数回登録され、マウスを乗せるたびに複数回実行されます。

**解決方法:**

名前付き関数を使い、重複登録を防ぎます。

```javascript
let isSetup = false;

function setupHover() {
  if (isSetup) return;

  let box = document.getElementById("box");

  box.addEventListener("mouseover", changeColor);
  box.addEventListener("mouseout", resetColor);

  isSetup = true;
}

function changeColor() {
  this.style.backgroundColor = "red";
}

function resetColor() {
  this.style.backgroundColor = "lightblue";
}
```

### ミス4: mouseoutで元の状態に戻し忘れ

**問題のコード:**

```javascript
box.addEventListener("mouseover", function() {
  box.style.backgroundColor = "red";
  box.style.transform = "scale(1.2)";
});

box.addEventListener("mouseout", function() {
  box.style.backgroundColor = "lightblue";
  // transformを戻し忘れ
});
```

**何が問題か:**

`mouseout`で一部のスタイルを元に戻し忘れると、要素が変な状態のままになります。

**解決方法:**

すべての変更を元に戻します。

```javascript
box.addEventListener("mouseover", function() {
  box.style.backgroundColor = "red";
  box.style.transform = "scale(1.2)";
});

box.addEventListener("mouseout", function() {
  box.style.backgroundColor = "lightblue";
  box.style.transform = "scale(1)"; // 追加
});
```

### ミス5: イベントの発生順序を理解していない

**問題のコード:**

```javascript
button.addEventListener("click", function() {
  console.log("1. クリック");
});

button.addEventListener("mousedown", function() {
  console.log("2. 押下");
});
```

**何が問題か:**

実際の実行順序は「押下 → クリック」ですが、期待と異なる場合があります。

**解決方法:**

イベントの発生順序を理解し、適切なイベントを使います。

```javascript
// mousedownは押した瞬間に発火
button.addEventListener("mousedown", function() {
  console.log("1. 押下");
});

// mouseupは離した瞬間に発火
button.addEventListener("mouseup", function() {
  console.log("2. 離上");
});

// clickは離した後に発火
button.addEventListener("click", function() {
  console.log("3. クリック");
});
```

### ミス6: ホバー時のちらつき

**問題のコード:**

```javascript
box.addEventListener("mouseover", function() {
  box.style.padding = "30px"; // サイズが変わる
});

box.addEventListener("mouseout", function() {
  box.style.padding = "20px";
});
```

**何が問題か:**

要素のサイズが変わることで、マウスカーソルの下から要素が移動し、`mouseout`と`mouseover`が連続して発火してちらつきます。

**解決方法:**

`transform`を使ってサイズを変更するか、親要素でイベントを処理します。

```javascript
// 方法1: transformを使う
box.addEventListener("mouseover", function() {
  box.style.transform = "scale(1.2)";
});

box.addEventListener("mouseout", function() {
  box.style.transform = "scale(1)";
});

// 方法2: 親要素でイベントを処理
let container = document.getElementById("container");
let box = document.getElementById("box");

container.addEventListener("mouseover", function() {
  box.style.padding = "30px";
});

container.addEventListener("mouseout", function() {
  box.style.padding = "20px";
});
```

## 完全版アプリケーション例

### アプリケーション1: インタラクティブな商品カード

**HTML (index.html):**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>商品カードギャラリー</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin-top: 40px;
    }

    .product-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .product-image {
      width: 100%;
      height: 200px;
      background-color: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      transition: transform 0.3s ease;
    }

    .product-info {
      padding: 20px;
    }

    .product-name {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #333;
    }

    .product-price {
      font-size: 24px;
      color: #2196F3;
      margin-bottom: 15px;
    }

    .product-description {
      font-size: 14px;
      color: #666;
      margin-bottom: 15px;
      line-height: 1.5;
    }

    .add-to-cart {
      width: 100%;
      padding: 12px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      opacity: 0;
      transform: translateY(10px);
    }

    .product-card:hover .add-to-cart {
      opacity: 1;
      transform: translateY(0);
    }

    .badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #f44336;
      color: white;
      padding: 5px 10px;
      border-radius: 3px;
      font-size: 12px;
      font-weight: bold;
    }

    #notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #4CAF50;
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      display: none;
    }
  </style>
</head>
<body>
  <h1>🛍️ 商品カードギャラリー</h1>

  <div class="product-grid" id="productGrid">
    <!-- 商品カードがJavaScriptで生成されます -->
  </div>

  <div id="notification"></div>

  <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
// 商品データ
let products = [
  { id: 1, name: "ノートパソコン", price: "¥89,800", emoji: "💻", description: "高性能で持ち運びやすい" },
  { id: 2, name: "スマートフォン", price: "¥69,800", emoji: "📱", description: "最新モデル、5G対応" },
  { id: 3, name: "ワイヤレスイヤホン", price: "¥12,800", emoji: "🎧", description: "ノイズキャンセリング機能付き" },
  { id: 4, name: "スマートウォッチ", price: "¥34,800", emoji: "⌚", description: "健康管理に最適" },
  { id: 5, name: "タブレット", price: "¥49,800", emoji: "📱", description: "大画面で動画視聴に最適" },
  { id: 6, name: "キーボード", price: "¥8,800", emoji: "⌨️", description: "メカニカルキーボード" }
];

// 商品カードを生成
function createProductCards() {
  let grid = document.getElementById("productGrid");

  for (let i = 0; i < products.length; i++) {
    let product = products[i];

    // カード要素を作成
    let card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-product-id", product.id);

    card.innerHTML =
      '<div class="product-image">' + product.emoji + '</div>' +
      '<div class="product-info">' +
      '  <div class="product-name">' + product.name + '</div>' +
      '  <div class="product-price">' + product.price + '</div>' +
      '  <div class="product-description">' + product.description + '</div>' +
      '  <button class="add-to-cart">カートに追加</button>' +
      '</div>';

    // イベントリスナーを登録
    setupCardEvents(card, product);

    grid.appendChild(card);
  }
}

// カードのイベントを設定
function setupCardEvents(card, product) {
  let image = card.querySelector(".product-image");
  let addButton = card.querySelector(".add-to-cart");

  // マウスが乗った時
  card.addEventListener("mouseover", function() {
    card.style.transform = "translateY(-10px)";
    card.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
    image.style.transform = "scale(1.1)";
  });

  // マウスが離れた時
  card.addEventListener("mouseout", function() {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
    image.style.transform = "scale(1)";
  });

  // カートに追加ボタンのイベント
  addButton.addEventListener("mouseover", function(event) {
    event.stopPropagation(); // カードのイベントを止める
    addButton.style.backgroundColor = "#45a049";
  });

  addButton.addEventListener("mouseout", function(event) {
    event.stopPropagation();
    addButton.style.backgroundColor = "#4CAF50";
  });

  addButton.addEventListener("mousedown", function(event) {
    event.stopPropagation();
    addButton.style.transform = "scale(0.95)";
  });

  addButton.addEventListener("mouseup", function(event) {
    event.stopPropagation();
    addButton.style.transform = "scale(1)";
  });

  addButton.addEventListener("click", function(event) {
    event.stopPropagation();
    showNotification(product.name + "をカートに追加しました");
  });
}

// 通知を表示
function showNotification(message) {
  let notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";

  setTimeout(function() {
    notification.style.display = "none";
  }, 3000);
}

// ページ読み込み時に商品カードを生成
createProductCards();
```

### アプリケーション2: 画像ギャラリー

**HTML (index.html):**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>画像ギャラリー</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1000px;
      margin: 50px auto;
      padding: 20px;
      background-color: #222;
      color: white;
    }

    h1 {
      text-align: center;
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 40px;
    }

    .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      cursor: pointer;
    }

    .gallery-image {
      width: 100%;
      height: 200px;
      background-color: #444;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 64px;
      transition: transform 0.5s ease;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.7);
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .image-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .image-description {
      font-size: 14px;
      text-align: center;
      padding: 0 20px;
    }

    #lightbox {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.9);
      z-index: 1000;
      align-items: center;
      justify-content: center;
    }

    #lightbox-content {
      font-size: 128px;
      animation: zoomIn 0.3s ease;
    }

    @keyframes zoomIn {
      from {
        transform: scale(0.5);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    #close-lightbox {
      position: absolute;
      top: 20px;
      right: 40px;
      font-size: 40px;
      color: white;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>🖼️ 画像ギャラリー</h1>

  <div class="gallery" id="gallery"></div>

  <div id="lightbox">
    <div id="close-lightbox">×</div>
    <div id="lightbox-content"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
// 画像データ
let images = [
  { emoji: "🌄", title: "山の風景", description: "美しい山々の朝焼け" },
  { emoji: "🏖️", title: "ビーチ", description: "青い海と白い砂浜" },
  { emoji: "🌃", title: "夜景", description: "都市の輝く夜景" },
  { emoji: "🌲", title: "森", description: "深い緑の森林" },
  { emoji: "🌊", title: "波", description: "寄せては返す波" },
  { emoji: "🏔️", title: "雪山", description: "雪に覆われた山頂" },
  { emoji: "🌅", title: "日の出", description: "水平線から昇る太陽" },
  { emoji: "🌌", title: "星空", description: "満天の星々" }
];

// ギャラリーを生成
function createGallery() {
  let gallery = document.getElementById("gallery");

  for (let i = 0; i < images.length; i++) {
    let image = images[i];

    let item = document.createElement("div");
    item.className = "gallery-item";

    item.innerHTML =
      '<div class="gallery-image">' + image.emoji + '</div>' +
      '<div class="overlay">' +
      '  <div class="image-title">' + image.title + '</div>' +
      '  <div class="image-description">' + image.description + '</div>' +
      '</div>';

    setupGalleryItemEvents(item, image);
    gallery.appendChild(item);
  }
}

// ギャラリーアイテムのイベントを設定
function setupGalleryItemEvents(item, image) {
  let imageElement = item.querySelector(".gallery-image");
  let overlay = item.querySelector(".overlay");

  // マウスが乗った時
  item.addEventListener("mouseover", function() {
    imageElement.style.transform = "scale(1.2)";
    overlay.style.opacity = "1";
  });

  // マウスが離れた時
  item.addEventListener("mouseout", function() {
    imageElement.style.transform = "scale(1)";
    overlay.style.opacity = "0";
  });

  // クリックでライトボックスを開く
  item.addEventListener("click", function() {
    openLightbox(image.emoji);
  });

  // 押下時のフィードバック
  item.addEventListener("mousedown", function() {
    item.style.opacity = "0.8";
  });

  item.addEventListener("mouseup", function() {
    item.style.opacity = "1";
  });
}

// ライトボックスを開く
function openLightbox(emoji) {
  let lightbox = document.getElementById("lightbox");
  let content = document.getElementById("lightbox-content");

  content.textContent = emoji;
  lightbox.style.display = "flex";

  document.body.style.overflow = "hidden";
}

// ライトボックスを閉じる
function closeLightbox() {
  let lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";

  document.body.style.overflow = "auto";
}

// ライトボックスのクローズボタン
let closeButton = document.getElementById("close-lightbox");
closeButton.addEventListener("click", closeLightbox);

// ライトボックスの背景をクリックしても閉じる
let lightbox = document.getElementById("lightbox");
lightbox.addEventListener("click", function(event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// ページ読み込み時にギャラリーを生成
createGallery();
```

### アプリケーション3: インタラクティブなボタンコレクション

**HTML (index.html):**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ボタンコレクション</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .button-section {
      margin: 40px 0;
      padding: 30px;
      background-color: #f9f9f9;
      border-radius: 10px;
    }

    .button-section h2 {
      margin-top: 0;
      color: #555;
    }

    .button-container {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    .btn {
      padding: 15px 30px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: bold;
    }

    .btn-primary {
      background-color: #2196F3;
      color: white;
    }

    .btn-success {
      background-color: #4CAF50;
      color: white;
    }

    .btn-danger {
      background-color: #f44336;
      color: white;
    }

    .btn-3d {
      background: linear-gradient(to bottom, #2196F3, #1976D2);
      box-shadow: 0 5px 0 #0D47A1;
      position: relative;
      top: 0;
    }

    .btn-glow {
      background-color: #9C27B0;
      color: white;
      box-shadow: 0 0 20px rgba(156, 39, 176, 0.5);
    }

    #status {
      margin-top: 30px;
      padding: 20px;
      background-color: #e3f2fd;
      border-left: 4px solid #2196F3;
      border-radius: 5px;
      min-height: 60px;
    }

    #status strong {
      color: #1976D2;
    }
  </style>
</head>
<body>
  <h1>🎨 インタラクティブなボタンコレクション</h1>

  <div class="button-section">
    <h2>基本的なホバーエフェクト</h2>
    <div class="button-container">
      <button class="btn btn-primary" id="btn1">通常ボタン</button>
      <button class="btn btn-success" id="btn2">成功ボタン</button>
      <button class="btn btn-danger" id="btn3">警告ボタン</button>
    </div>
  </div>

  <div class="button-section">
    <h2>高度なエフェクト</h2>
    <div class="button-container">
      <button class="btn btn-3d" id="btn4">3Dボタン</button>
      <button class="btn btn-glow" id="btn5">グローボタン</button>
    </div>
  </div>

  <div id="status">
    <strong>状態:</strong> <span id="statusText">ボタンにマウスを乗せてみてください</span>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
// 状態表示要素
let statusText = document.getElementById("statusText");

// ボタン1: 通常ボタン
let btn1 = document.getElementById("btn1");

btn1.addEventListener("mouseover", function() {
  btn1.style.backgroundColor = "#1976D2";
  btn1.style.transform = "scale(1.05)";
  statusText.textContent = "通常ボタンにマウスが乗っています";
});

btn1.addEventListener("mouseout", function() {
  btn1.style.backgroundColor = "#2196F3";
  btn1.style.transform = "scale(1)";
  statusText.textContent = "ボタンにマウスを乗せてみてください";
});

btn1.addEventListener("mousedown", function() {
  btn1.style.transform = "scale(0.95)";
  statusText.textContent = "通常ボタンが押されています";
});

btn1.addEventListener("mouseup", function() {
  btn1.style.transform = "scale(1.05)";
});

// ボタン2: 成功ボタン
let btn2 = document.getElementById("btn2");

btn2.addEventListener("mouseover", function() {
  btn2.style.backgroundColor = "#45a049";
  btn2.style.boxShadow = "0 4px 8px rgba(76, 175, 80, 0.4)";
  statusText.textContent = "成功ボタンにマウスが乗っています";
});

btn2.addEventListener("mouseout", function() {
  btn2.style.backgroundColor = "#4CAF50";
  btn2.style.boxShadow = "none";
  statusText.textContent = "ボタンにマウスを乗せてみてください";
});

btn2.addEventListener("mousedown", function() {
  btn2.style.transform = "translateY(2px)";
  statusText.textContent = "成功ボタンが押されています";
});

btn2.addEventListener("mouseup", function() {
  btn2.style.transform = "translateY(0)";
});

// ボタン3: 警告ボタン
let btn3 = document.getElementById("btn3");

btn3.addEventListener("mouseover", function() {
  btn3.style.backgroundColor = "#da190b";
  btn3.style.transform = "rotate(2deg)";
  statusText.textContent = "警告ボタンにマウスが乗っています";
});

btn3.addEventListener("mouseout", function() {
  btn3.style.backgroundColor = "#f44336";
  btn3.style.transform = "rotate(0deg)";
  statusText.textContent = "ボタンにマウスを乗せてみてください";
});

btn3.addEventListener("mousedown", function() {
  btn3.style.transform = "rotate(0deg) scale(0.9)";
  statusText.textContent = "警告ボタンが押されています";
});

btn3.addEventListener("mouseup", function() {
  btn3.style.transform = "rotate(2deg) scale(1)";
});

// ボタン4: 3Dボタン
let btn4 = document.getElementById("btn4");

btn4.addEventListener("mouseover", function() {
  btn4.style.background = "linear-gradient(to bottom, #42A5F5, #2196F3)";
  statusText.textContent = "3Dボタンにマウスが乗っています";
});

btn4.addEventListener("mouseout", function() {
  btn4.style.background = "linear-gradient(to bottom, #2196F3, #1976D2)";
  btn4.style.top = "0";
  btn4.style.boxShadow = "0 5px 0 #0D47A1";
  statusText.textContent = "ボタンにマウスを乗せてみてください";
});

btn4.addEventListener("mousedown", function() {
  btn4.style.top = "5px";
  btn4.style.boxShadow = "0 0 0 #0D47A1";
  statusText.textContent = "3Dボタンが押し込まれています";
});

btn4.addEventListener("mouseup", function() {
  btn4.style.top = "0";
  btn4.style.boxShadow = "0 5px 0 #0D47A1";
});

// ボタン5: グローボタン
let btn5 = document.getElementById("btn5");

btn5.addEventListener("mouseover", function() {
  btn5.style.boxShadow = "0 0 40px rgba(156, 39, 176, 0.8)";
  btn5.style.transform = "scale(1.1)";
  statusText.textContent = "グローボタンにマウスが乗っています";
});

btn5.addEventListener("mouseout", function() {
  btn5.style.boxShadow = "0 0 20px rgba(156, 39, 176, 0.5)";
  btn5.style.transform = "scale(1)";
  statusText.textContent = "ボタンにマウスを乗せてみてください";
});

btn5.addEventListener("mousedown", function() {
  btn5.style.boxShadow = "0 0 10px rgba(156, 39, 176, 0.3)";
  btn5.style.transform = "scale(1.05)";
  statusText.textContent = "グローボタンが押されています";
});

btn5.addEventListener("mouseup", function() {
  btn5.style.boxShadow = "0 0 40px rgba(156, 39, 176, 0.8)";
  btn5.style.transform = "scale(1.1)";
});

// すべてのボタンにクリックイベントを追加
let allButtons = document.getElementsByClassName("btn");

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function() {
    statusText.textContent = "ボタンがクリックされました！";
    statusText.style.color = "#4CAF50";
    statusText.style.fontWeight = "bold";

    setTimeout(function() {
      statusText.textContent = "ボタンにマウスを乗せてみてください";
      statusText.style.color = "#1976D2";
      statusText.style.fontWeight = "normal";
    }, 2000);
  });
}
```

## 練習問題

### 課題

マウスイベントを使って、インタラクティブなボックスを作成しましょう。マウスの動きに応じて、ボックスの色やサイズが変化します。

### 保存場所

`exercises/lesson-065/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. **mouseover/mouseoutイベントでホバーエフェクトを実装する**: 背景色と状態メッセージを変更します
2. **mousedown/mouseupイベントで押下効果を実装する**: ボックスのサイズを変更します
3. **状態メッセージを表示する**: 各イベントに応じたメッセージを表示します

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-065
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント1: 基本構造

<details>
<summary>ヒント1を表示</summary>

`box`という id の要素を作成します（200x200pxのボックス）。

```html
<div id="box" style="width: 200px; height: 200px; background-color: lightblue;">
  マウスを動かしてね
</div>
<p id="status"></p>
```

`status`という id の要素も作成します（状態表示用）。

</details>

### ヒント2: イベントリスナーの登録

<details>
<summary>ヒント2を表示</summary>

各イベントで背景色と状態メッセージを変更します。

```javascript
let box = document.getElementById("box");
let status = document.getElementById("status");

box.addEventListener("mouseover", function() {
  box.style.backgroundColor = "lightcoral";
  status.textContent = "マウスがボックスの上にあります";
});

box.addEventListener("mouseout", function() {
  box.style.backgroundColor = "lightblue";
  status.textContent = "";
});
```

</details>

### ヒント3: 完全な実装

<details>
<summary>ヒント3を表示</summary>

`mousedown`と`mouseup`でサイズを変更します。

```javascript
box.addEventListener("mousedown", function() {
  box.style.transform = "scale(0.9)";
  status.textContent = "ボックスが押されています";
});

box.addEventListener("mouseup", function() {
  box.style.transform = "scale(1)";
  status.textContent = "マウスがボックスの上にあります";
});
```

CSSで`transition`を設定すると、滑らかな動きになります。

</details>

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 065</title>
    <style>
        #box {
            width: 200px;
            height: 200px;
            background-color: lightblue;
            border: 2px solid blue;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 16px;
            text-align: center;
            padding: 10px;
        }
    </style>
</head>
<body>
    <h1>マウスイベント練習</h1>
    <div id="box">マウスを動かしてね</div>
    <p id="status"></p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
let box = document.getElementById("box");
let status = document.getElementById("status");

// マウスが乗った時
box.addEventListener("mouseover", function() {
  box.style.backgroundColor = "lightcoral";
  status.textContent = "マウスがボックスの上にあります";
});

// マウスが離れた時
box.addEventListener("mouseout", function() {
  box.style.backgroundColor = "lightblue";
  status.textContent = "";
});

// マウスボタンを押した時
box.addEventListener("mousedown", function() {
  box.style.transform = "scale(0.9)";
  status.textContent = "ボックスが押されています";
});

// マウスボタンを離した時
box.addEventListener("mouseup", function() {
  box.style.transform = "scale(1)";
  status.textContent = "マウスがボックスの上にあります";
});
```

### 解説

このプログラムは、マウスイベントを使ってインタラクティブなボックスを実装しています。

**1. mouseover（マウスが乗った時）:**

マウスカーソルがボックスの上に乗ると、背景色が薄い青から薄い赤に変わり、状態メッセージが表示されます。

```javascript
box.style.backgroundColor = "lightcoral";
status.textContent = "マウスがボックスの上にあります";
```

**2. mouseout（マウスが離れた時）:**

マウスカーソルがボックスから離れると、背景色が元の薄い青に戻り、状態メッセージがクリアされます。

```javascript
box.style.backgroundColor = "lightblue";
status.textContent = "";
```

**3. mousedown（マウスボタンを押した時）:**

マウスボタンを押すと、ボックスが90%のサイズに縮小され、押されている感覚を表現します。

```javascript
box.style.transform = "scale(0.9)";
```

**4. mouseup（マウスボタンを離した時）:**

マウスボタンを離すと、ボックスが元のサイズに戻ります。

```javascript
box.style.transform = "scale(1)";
```

CSSの`transition: all 0.3s ease;`により、色やサイズの変化がスムーズになります。

このようなマウスイベントを組み合わせることで、ユーザーにとって直感的で分かりやすいインターフェースを作ることができます。

## まとめ

お疲れ様でした。今回のレッスンでは、マウスイベントについて学びました。

**今回のキーポイント:**

- **mouseover/mouseout**: マウスカーソルが要素の上に乗った時と離れた時に発生するイベントです。ホバーエフェクトの実装に使われ、色やサイズの変更、ツールチップの表示など、さまざまな視覚効果を実現できます。Webサイトのインタラクティブな要素を作る基本的な技術です。`mouseenter`/`mouseleave`との違いは、子要素でのイベント発火の有無です

- **mousedown/mouseup**: マウスボタンを押した時と離した時に発生するイベントです。`click`イベントとは異なり、押下と離上を個別に検出できます。ボタンの押下フィードバックやドラッグ操作の開始/終了の検出に使われます。イベントオブジェクトの`event.button`プロパティで、どのマウスボタンが押されたかを判別できます

- **ホバーエフェクト**: マウスイベントを組み合わせることで、ユーザーにとって直感的なインターフェースを作れます。色の変化、サイズの変更、影の追加、画像の拡大など、複数のスタイル変更を組み合わせることで、要素がクリック可能であることや、現在の状態を視覚的に伝えられます。トランジションを使うことで、滑らかなアニメーションを実現できます

マウスイベントは、ユーザーとアプリケーションの間のコミュニケーションを豊かにする重要な要素です。適切に使うことで、ユーザー体験が大きく向上します。

実世界のアプリケーション（Amazon、Twitter、Tableau、Pinterest、Google Docs）で見たように、マウスイベントは以下のような場面で広く活用されています。

- **商品カード**: ホバーで追加情報を表示
- **ソーシャルメディア**: いいねボタンのアニメーション
- **データ可視化**: ツールチップで詳細表示
- **画像ギャラリー**: プレビュー表示
- **ツールバー**: 機能説明の表示

次のレッスンでは、キーボードイベントについて学びます。キーボード入力に反応する処理を実装し、さらに多様なインタラクションを実現していきましょう。
