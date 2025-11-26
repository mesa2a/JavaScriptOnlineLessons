---
title: "Lesson 064: イベントリスナー基礎"
author: "JavaScript学習教材"
date: "2025-11-26"
---

## 今回の学習

### 前回の復習

前回のレッスンでは、RPG風バトルゲームを作成しました。変数、条件分岐、関数、DOM操作、ランダム要素など、これまで学んだすべての知識を統合して、実践的なゲームを完成させました。状態管理、HP判定、ダメージ計算などを実装し、総合的なプログラミングスキルを体験しました。

これまでイベント処理には`onclick`属性を使ってきました。

```html
<button onclick="attack()">攻撃</button>
<button onclick="heal()">回復</button>
```

この方法はシンプルですが、より高度なイベント処理を行うには限界があります。

### 今回の目標

今回のレッスンでは、**イベントリスナー（addEventListener）**について学びます。これまで`onclick`属性を使ってボタンのクリックイベントを処理してきましたが、より柔軟で強力な方法として`addEventListener`があります。この方法を使うことで、より高度なイベント処理が可能になります。

今回のレッスンで習得する内容は以下の通りです。

- **element.addEventListener("click", function)の使い方**: JavaScriptでイベントを登録する標準的な方法を学びます
- **onclickとの違い**: 従来の方法との違いと、addEventListenerの利点を理解します
- **複数のリスナー**: 同じ要素に複数のイベント処理を登録する方法を学びます

### このレッスンの重要性

`addEventListener`は、モダンなJavaScript開発において標準的に使われる重要な機能です。Webアプリケーション、インタラクティブなUI、ゲーム開発など、あらゆる場面で使用されます。

この方法を理解することで、以下のことが可能になります。

- **HTMLとJavaScriptの分離**: コードの保守性と可読性が向上します
- **柔軟なイベント管理**: 動的にイベントを追加・削除できます
- **複雑なインタラクション**: 複数のイベントハンドラを組み合わせた高度な処理が可能になります

## 実世界での活用例

イベントリスナーは、実際のWebアプリケーションでどのように使われているのでしょうか。

### 例1: ECサイトのショッピングカート（Amazon）

Amazonなどのショッピングサイトでは、「カートに追加」ボタンに複数のイベントリスナーが登録されています。

```javascript
// ショッピングカートシステム
let cart = [];
let cartCount = 0;

function addToCart(productId, productName, price) {
  // カートに商品を追加
  let product = {
    id: productId,
    name: productName,
    price: price,
    quantity: 1
  };

  cart.push(product);
  cartCount = cartCount + 1;

  console.log(productName + "をカートに追加しました");
}

function updateCartDisplay() {
  // カートアイコンのバッジを更新
  let badge = document.getElementById("cartBadge");
  badge.textContent = cartCount;
  badge.style.display = cartCount > 0 ? "inline-block" : "none";
}

function showAddedNotification(productName) {
  // 追加完了の通知を表示
  let notification = document.getElementById("notification");
  notification.textContent = productName + "をカートに追加しました";
  notification.style.display = "block";

  // 3秒後に非表示
  setTimeout(function() {
    notification.style.display = "none";
  }, 3000);
}

function trackAnalytics(productId, action) {
  // Google Analyticsなどにデータ送信
  console.log("Analytics: " + action + " - Product ID: " + productId);
  // 実際にはサーバーにデータを送信
}

// 「カートに追加」ボタンにイベントリスナーを登録
let addButton = document.getElementById("addToCartButton");

addButton.addEventListener("click", function() {
  addToCart("PROD-001", "JavaScriptの本", 3000);
});

addButton.addEventListener("click", function() {
  updateCartDisplay();
});

addButton.addEventListener("click", function() {
  showAddedNotification("JavaScriptの本");
});

addButton.addEventListener("click", function() {
  trackAnalytics("PROD-001", "add_to_cart");
});
```

この例では、1つのボタンクリックで以下の4つの処理が実行されます。

1. **カートに商品を追加**: データ構造を更新
2. **カート表示を更新**: UIを更新
3. **通知を表示**: ユーザーにフィードバック
4. **アナリティクスを記録**: 行動データを収集

`onclick`属性では、これらすべてを1つの関数にまとめる必要がありますが、`addEventListener`を使うことで、各機能を独立したモジュールとして実装できます。

### 例2: ソーシャルメディアの「いいね」ボタン（Twitter/X）

Twitter（X）の「いいね」ボタンには、複数の処理が組み込まれています。

```javascript
// いいねシステム
let likedPosts = new Set(); // いいねした投稿IDを保存

function toggleLike(postId) {
  if (likedPosts.has(postId)) {
    // いいねを取り消し
    likedPosts.delete(postId);
    return false;
  } else {
    // いいねを追加
    likedPosts.add(postId);
    return true;
  }
}

function updateLikeButton(button, isLiked) {
  if (isLiked) {
    button.classList.add("liked");
    button.style.color = "red";
  } else {
    button.classList.remove("liked");
    button.style.color = "gray";
  }
}

function updateLikeCount(postId, increment) {
  let countElement = document.getElementById("likeCount-" + postId);
  let currentCount = Number(countElement.textContent) || 0;

  if (increment) {
    countElement.textContent = currentCount + 1;
  } else {
    countElement.textContent = currentCount - 1;
  }
}

function animateLikeButton(button) {
  // ハートアニメーション
  button.style.transform = "scale(1.2)";

  setTimeout(function() {
    button.style.transform = "scale(1)";
  }, 200);
}

function sendLikeToServer(postId, isLiked) {
  // サーバーに「いいね」情報を送信
  console.log("Server: " + (isLiked ? "Like" : "Unlike") + " post " + postId);

  // 実際にはfetchやaxiosでAPIにPOSTリクエスト
  // fetch('/api/posts/' + postId + '/like', { method: 'POST' })
}

function updateTimeline(postId, isLiked) {
  // タイムラインのアルゴリズムに影響
  console.log("Timeline updated based on like action");
}

// いいねボタンにイベントリスナーを登録
let likeButtons = document.getElementsByClassName("likeButton");

for (let i = 0; i < likeButtons.length; i++) {
  let button = likeButtons[i];
  let postId = button.getAttribute("data-post-id");

  // 1つのボタンに複数のリスナーを登録
  button.addEventListener("click", function() {
    let isLiked = toggleLike(postId);
    updateLikeButton(button, isLiked);
    updateLikeCount(postId, isLiked);
    animateLikeButton(button);
    sendLikeToServer(postId, isLiked);
    updateTimeline(postId, isLiked);
  });
}
```

この例では、「いいね」ボタンをクリックすると：

1. **状態を切り替え**: いいね/いいね解除
2. **ボタンの見た目を更新**: 色を変更
3. **カウントを更新**: いいね数を増減
4. **アニメーションを実行**: ハートが拡大・縮小
5. **サーバーに送信**: データベースを更新
6. **タイムラインを更新**: アルゴリズムに反映

複数の処理を個別のリスナーとして登録することで、各機能の追加・削除・修正が容易になります。

### 例3: フォームバリデーション（Google Forms）

Google Formsなどのフォームシステムでは、入力フィールドに複数のイベントリスナーを設定しています。

```javascript
// フォームバリデーションシステム
function validateEmail(email) {
  // メールアドレスの形式チェック
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function showError(input, message) {
  let errorElement = document.getElementById(input.id + "-error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    input.style.borderColor = "red";
  }
}

function clearError(input) {
  let errorElement = document.getElementById(input.id + "-error");
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.style.display = "none";
    input.style.borderColor = "#ccc";
  }
}

function saveToLocalStorage(fieldName, value) {
  // 入力内容を自動保存
  localStorage.setItem("form_" + fieldName, value);
  console.log("Saved: " + fieldName + " = " + value);
}

function updateCharacterCount(input, maxLength) {
  let countElement = document.getElementById(input.id + "-count");
  if (countElement) {
    let remaining = maxLength - input.value.length;
    countElement.textContent = remaining + " 文字残り";

    if (remaining < 10) {
      countElement.style.color = "red";
    } else {
      countElement.style.color = "gray";
    }
  }
}

function checkFormCompletion() {
  // すべての必須フィールドが入力されているかチェック
  let requiredFields = document.querySelectorAll("input[required]");
  let allFilled = true;

  for (let i = 0; i < requiredFields.length; i++) {
    if (!requiredFields[i].value) {
      allFilled = false;
      break;
    }
  }

  let submitButton = document.getElementById("submitButton");
  submitButton.disabled = !allFilled;
}

// メールアドレス入力フィールドに複数のイベントリスナーを登録
let emailInput = document.getElementById("emailInput");

// blur（フォーカスが外れた時）イベント
emailInput.addEventListener("blur", function() {
  if (emailInput.value && !validateEmail(emailInput.value)) {
    showError(emailInput, "正しいメールアドレスを入力してください");
  } else {
    clearError(emailInput);
  }
});

// input（入力中）イベント
emailInput.addEventListener("input", function() {
  saveToLocalStorage("email", emailInput.value);
});

emailInput.addEventListener("input", function() {
  checkFormCompletion();
});

// focus（フォーカスされた時）イベント
emailInput.addEventListener("focus", function() {
  clearError(emailInput);
});

// テキストエリアに文字数カウンター
let messageInput = document.getElementById("messageInput");
let maxLength = 500;

messageInput.addEventListener("input", function() {
  updateCharacterCount(messageInput, maxLength);
});

messageInput.addEventListener("input", function() {
  saveToLocalStorage("message", messageInput.value);
});
```

この例では、入力フィールドに対して：

1. **リアルタイムバリデーション**: 入力内容をチェック
2. **自動保存**: LocalStorageに保存
3. **文字数カウント**: 残り文字数を表示
4. **フォーム完成度チェック**: 送信ボタンの有効/無効を制御

各機能を独立したリスナーとして実装することで、機能の追加や削除が簡単になります。

### 例4: 動画プレイヤー（YouTube）

YouTubeなどの動画プレイヤーでは、再生ボタンに多数のイベントリスナーが登録されています。

```javascript
// 動画プレイヤーシステム
let isPlaying = false;
let currentTime = 0;
let totalWatchTime = 0;

function togglePlayPause(video) {
  if (isPlaying) {
    video.pause();
    isPlaying = false;
  } else {
    video.play();
    isPlaying = true;
  }
}

function updatePlayButton(button) {
  if (isPlaying) {
    button.textContent = "⏸ 一時停止";
    button.setAttribute("aria-label", "一時停止");
  } else {
    button.textContent = "▶ 再生";
    button.setAttribute("aria-label", "再生");
  }
}

function trackWatchTime() {
  if (isPlaying) {
    totalWatchTime = totalWatchTime + 1;
    console.log("Total watch time: " + totalWatchTime + " seconds");
  }
}

function sendAnalytics(action) {
  // 視聴データをサーバーに送信
  console.log("Analytics: " + action + " at " + currentTime + "s");
  // 実際にはAPIにデータを送信
}

function updateRecommendations(action) {
  // 視聴行動に基づいてレコメンドを更新
  console.log("Updating recommendations based on: " + action);
}

function showControlsTemporarily() {
  let controls = document.getElementById("videoControls");
  controls.style.opacity = "1";

  setTimeout(function() {
    if (isPlaying) {
      controls.style.opacity = "0";
    }
  }, 3000);
}

function saveWatchProgress(videoId, time) {
  // 視聴位置を保存（次回続きから再生）
  localStorage.setItem("watch_progress_" + videoId, time);
}

// 再生ボタンにイベントリスナーを登録
let playButton = document.getElementById("playButton");
let video = document.getElementById("videoPlayer");
let videoId = "VIDEO-123";

playButton.addEventListener("click", function() {
  togglePlayPause(video);
});

playButton.addEventListener("click", function() {
  updatePlayButton(playButton);
});

playButton.addEventListener("click", function() {
  let action = isPlaying ? "play" : "pause";
  sendAnalytics(action);
});

playButton.addEventListener("click", function() {
  let action = isPlaying ? "play" : "pause";
  updateRecommendations(action);
});

playButton.addEventListener("click", function() {
  showControlsTemporarily();
});

// 1秒ごとに視聴時間を記録
setInterval(function() {
  if (isPlaying) {
    currentTime = currentTime + 1;
    trackWatchTime();
    saveWatchProgress(videoId, currentTime);
  }
}, 1000);
```

動画プレイヤーでは：

1. **再生/一時停止の制御**: 動画の状態を変更
2. **ボタン表示の更新**: アイコンとラベルを変更
3. **視聴時間の追跡**: 統計データを収集
4. **分析データの送信**: 視聴行動を記録
5. **レコメンドの更新**: アルゴリズムを調整
6. **コントロールの表示/非表示**: UX向上
7. **視聴位置の保存**: 続きから再生機能

### 例5: リアルタイムチャット（Slack）

Slackなどのチャットアプリでは、メッセージ送信ボタンに複数の処理が組み込まれています。

```javascript
// チャットシステム
let messages = [];
let typingUsers = [];

function sendMessage(text, userId, userName) {
  if (!text.trim()) {
    return; // 空メッセージは送信しない
  }

  let message = {
    id: Date.now(),
    text: text,
    userId: userId,
    userName: userName,
    timestamp: new Date().toLocaleTimeString()
  };

  messages.push(message);
  return message;
}

function displayMessage(message) {
  let chatArea = document.getElementById("chatArea");
  let messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.innerHTML =
    "<strong>" + message.userName + "</strong> " +
    "<span class='time'>" + message.timestamp + "</span><br>" +
    message.text;

  chatArea.appendChild(messageElement);

  // 自動スクロール
  chatArea.scrollTop = chatArea.scrollHeight;
}

function clearInput(input) {
  input.value = "";
}

function stopTypingIndicator(userId) {
  // 「入力中...」表示を削除
  let index = typingUsers.indexOf(userId);
  if (index > -1) {
    typingUsers.splice(index, 1);
    updateTypingIndicator();
  }
}

function updateTypingIndicator() {
  let indicator = document.getElementById("typingIndicator");

  if (typingUsers.length === 0) {
    indicator.textContent = "";
    indicator.style.display = "none";
  } else if (typingUsers.length === 1) {
    indicator.textContent = typingUsers[0] + "が入力中...";
    indicator.style.display = "block";
  } else {
    indicator.textContent = typingUsers.length + "人が入力中...";
    indicator.style.display = "block";
  }
}

function sendToServer(message) {
  // WebSocketでサーバーに送信
  console.log("Sending to server:", message);
  // 実際にはWebSocket APIを使用
  // websocket.send(JSON.stringify(message));
}

function playNotificationSound() {
  // 送信音を再生
  console.log("Playing notification sound");
  // 実際には Audio APIを使用
  // let audio = new Audio('send.mp3');
  // audio.play();
}

function updateMessageCount(channelId) {
  // チャンネルのメッセージ数を更新
  let countElement = document.getElementById("messageCount-" + channelId);
  if (countElement) {
    let count = Number(countElement.textContent) || 0;
    countElement.textContent = count + 1;
  }
}

function checkMentions(text) {
  // @メンションをチェックして通知
  if (text.includes("@")) {
    console.log("Mention detected in message");
    // メンション通知を送信
  }
}

// メッセージ送信ボタンにイベントリスナーを登録
let sendButton = document.getElementById("sendButton");
let messageInput = document.getElementById("messageInput");
let currentUser = { id: "user-001", name: "太郎" };
let currentChannel = "channel-general";

sendButton.addEventListener("click", function() {
  let text = messageInput.value;
  let message = sendMessage(text, currentUser.id, currentUser.name);

  if (message) {
    displayMessage(message);
  }
});

sendButton.addEventListener("click", function() {
  clearInput(messageInput);
});

sendButton.addEventListener("click", function() {
  stopTypingIndicator(currentUser.name);
});

sendButton.addEventListener("click", function() {
  if (messages.length > 0) {
    let lastMessage = messages[messages.length - 1];
    sendToServer(lastMessage);
  }
});

sendButton.addEventListener("click", function() {
  playNotificationSound();
});

sendButton.addEventListener("click", function() {
  updateMessageCount(currentChannel);
});

sendButton.addEventListener("click", function() {
  let text = messageInput.value;
  checkMentions(text);
});

// Enter キーでも送信できるように
messageInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // 改行を防ぐ
    sendButton.click(); // 送信ボタンをクリック
  }
});

// 入力中の表示
let typingTimeout;
messageInput.addEventListener("input", function() {
  if (!typingUsers.includes(currentUser.name)) {
    typingUsers.push(currentUser.name);
    updateTypingIndicator();
  }

  // タイムアウトをリセット
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(function() {
    stopTypingIndicator(currentUser.name);
  }, 2000);
});
```

チャットアプリでは：

1. **メッセージ送信**: データ構造に追加
2. **メッセージ表示**: UIに反映
3. **入力欄クリア**: 次の入力に備える
4. **入力中表示を停止**: ステータス更新
5. **サーバーに送信**: WebSocketで配信
6. **通知音を再生**: フィードバック
7. **メッセージ数更新**: カウンター更新
8. **メンションチェック**: 通知を送信

これらの実例から、`addEventListener`は以下のような場面で活用されていることが分かります。

- **Eコマース**: カートシステム、商品レビュー
- **ソーシャルメディア**: いいね、シェア、コメント
- **フォーム**: バリデーション、自動保存
- **メディア**: 動画/音楽プレイヤー
- **コミュニケーション**: チャット、メッセージング

複数のイベントリスナーを組み合わせることで、複雑な機能を分かりやすく実装できます。

## これまでのイベント処理

これまで、ボタンのクリックイベントを処理する際、HTML側で`onclick`属性を使ってきました。

```html
<button onclick="showMessage()">クリック</button>
```

```javascript
function showMessage() {
  alert("ボタンがクリックされました");
}
```

この方法はシンプルで分かりやすいですが、いくつかの制約があります。

### onclick属性の制約

**1. 1つの要素に1つのイベントのみ**

同じ要素に複数のクリックイベントを登録できません。

```html
<!-- これは動作しません -->
<button onclick="doSomething1()" onclick="doSomething2()">クリック</button>

<!-- 後の方が優先されます -->
<button onclick="doSomething1(); doSomething2()">クリック</button>
```

複数の処理を実行するには、すべてを1つの関数にまとめるか、関数を連続して呼び出す必要があります。

**2. HTMLとJavaScriptの混在**

HTML側にJavaScript関数名が書かれるため、関心の分離が不十分です。

```html
<!-- HTML側にJavaScriptの関数名が含まれる -->
<button onclick="handleClick()">クリック</button>
```

HTMLは構造、CSSは見た目、JavaScriptは動作を担当するという原則から外れてしまいます。

**3. 削除や管理が難しい**

一度設定したイベントを後から削除したり、条件に応じて変更したりするのが困難です。

```javascript
// onclick属性で設定したイベントを削除するのは面倒
let button = document.getElementById("myButton");
button.onclick = null; // これで削除できるが...
```

**4. イベントオブジェクトへのアクセスが不自然**

イベントの詳細情報（どのキーが押されたか、マウスの位置など）にアクセスするのが不自然です。

```html
<button onclick="handleClick(event)">クリック</button>
```

これらの制約を解決するのが、`addEventListener`です。

## addEventListenerとは

`addEventListener`は、要素にイベントリスナーを登録するJavaScriptのメソッドです。これにより、HTML側に何も書かずに、JavaScript側だけでイベント処理を完結できます。

### 基本的な構文

```javascript
要素.addEventListener(イベント名, 関数);
```

具体的な例を見てみましょう。

```html
<button id="myButton">クリック</button>
```

```javascript
function showMessage() {
  alert("ボタンがクリックされました");
}

let button = document.getElementById("myButton");
button.addEventListener("click", showMessage);
```

このコードでは、以下の処理を行っています。

1. **要素の取得**: `getElementById`でボタン要素を取得
2. **イベントリスナーの登録**: `addEventListener`でクリックイベントを登録
3. **関数の指定**: イベント発生時に実行する関数を指定

### 重要な注意点：関数の指定方法

関数を指定する際は`showMessage()`ではなく`showMessage`と書きます。

```javascript
// ✅ 正しい：関数名のみ（カッコなし）
button.addEventListener("click", showMessage);

// ❌ 間違い：カッコを付けると即座に実行される
button.addEventListener("click", showMessage());
```

`showMessage()`と書くと、その場で関数が実行され、その戻り値（多くの場合`undefined`）が登録されてしまいます。

関数名だけを渡すことで、「この関数を後で実行してください」という指示になります。

## イベント名の種類

`addEventListener`では、さまざまなイベントを扱えます。代表的なイベント名は以下の通りです。

### マウスイベント

- **"click"**: クリックされた時
- **"dblclick"**: ダブルクリックされた時
- **"mousedown"**: マウスボタンが押された時
- **"mouseup"**: マウスボタンが離された時
- **"mouseover"**: マウスが要素の上に乗った時
- **"mouseout"**: マウスが要素から離れた時
- **"mousemove"**: マウスが要素上で動いた時

### キーボードイベント

- **"keydown"**: キーが押された時
- **"keyup"**: キーが離された時
- **"keypress"**: キーが押されて文字が入力された時

### フォームイベント

- **"input"**: 入力値が変更された時
- **"change"**: 入力値が確定された時
- **"focus"**: 要素がフォーカスされた時
- **"blur"**: 要素からフォーカスが外れた時
- **"submit"**: フォームが送信された時

### その他のイベント

- **"load"**: ページやリソースの読み込みが完了した時
- **"scroll"**: スクロールされた時
- **"resize"**: ウィンドウサイズが変更された時

今回のレッスンでは、基本的な`"click"`イベントから学んでいきます。

## onclick属性との違い

`onclick`属性と`addEventListener`の違いを詳しく比較してみましょう。

### onclick属性を使う場合

```html
<button onclick="showMessage()">クリック</button>
```

```javascript
function showMessage() {
  alert("メッセージ");
}
```

**特徴:**
- HTMLに直接JavaScriptコードを記述
- シンプルで初心者にも分かりやすい
- 1つのイベントのみ登録可能

### addEventListenerを使う場合

```html
<button id="myButton">クリック</button>
```

```javascript
function showMessage() {
  alert("メッセージ");
}

let button = document.getElementById("myButton");
button.addEventListener("click", showMessage);
```

**特徴:**
- HTMLとJavaScriptが完全に分離
- 複数のイベントリスナーを登録可能
- イベントの削除が容易

### addEventListenerの利点

**1. HTMLとJavaScriptの分離**

HTML側にはJavaScriptのコードが一切含まれません。HTML構造とイベント処理が明確に分離されます。

```html
<!-- HTMLはシンプルで構造のみ -->
<button id="myButton">クリック</button>
<button id="submitButton">送信</button>
<button id="cancelButton">キャンセル</button>
```

```javascript
// JavaScript側でイベントを一括管理
let myButton = document.getElementById("myButton");
let submitButton = document.getElementById("submitButton");
let cancelButton = document.getElementById("cancelButton");

myButton.addEventListener("click", handleClick);
submitButton.addEventListener("click", handleSubmit);
cancelButton.addEventListener("click", handleCancel);
```

この分離により、以下のメリットがあります。

- **保守性向上**: イベント処理がJavaScriptファイルにまとまっているため、修正しやすい
- **可読性向上**: HTMLは構造のみ、JavaScriptは動作のみに集中できる
- **再利用性向上**: 同じJavaScriptを複数のHTMLページで使用できる

**2. 複数のリスナーを登録できる**

同じ要素に複数のイベントリスナーを登録できます。

```javascript
let button = document.getElementById("myButton");

button.addEventListener("click", function() {
  console.log("処理1");
});

button.addEventListener("click", function() {
  console.log("処理2");
});

button.addEventListener("click", function() {
  console.log("処理3");
});
```

ボタンをクリックすると、3つの関数がすべて実行されます。

```
処理1
処理2
処理3
```

これにより、機能を段階的に追加できます。例えば：

```javascript
// 基本機能
button.addEventListener("click", updateCounter);

// 後から追加する機能
button.addEventListener("click", logAnalytics);
button.addEventListener("click", showNotification);
```

**3. イベントの削除が可能**

後でイベントリスナーを削除できます（次のレッスンで詳しく学びます）。

```javascript
function handleClick() {
  console.log("クリックされました");
}

// 登録
button.addEventListener("click", handleClick);

// 削除
button.removeEventListener("click", handleClick);
```

**4. より多くのイベントに対応**

`onclick`、`onmouseover`などの属性では扱えないイベントも、`addEventListener`なら統一的に扱えます。

```javascript
// これらのイベントはonclick属性では扱えない
button.addEventListener("dblclick", handleDoubleClick);
button.addEventListener("mouseenter", handleMouseEnter);
button.addEventListener("transitionend", handleTransitionEnd);
```

**5. イベントオブジェクトへの自然なアクセス**

イベントリスナー関数は、自動的にイベントオブジェクトを受け取ります。

```javascript
button.addEventListener("click", function(event) {
  console.log("クリック位置:", event.clientX, event.clientY);
  console.log("クリックされた要素:", event.target);
  console.log("イベントタイプ:", event.type);
});
```

**6. 同じ関数を複数の要素で再利用**

1つの関数を複数の要素で共有できます。

```javascript
function handleButtonClick() {
  console.log("ボタンがクリックされました");
}

let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");

button1.addEventListener("click", handleButtonClick);
button2.addEventListener("click", handleButtonClick);
button3.addEventListener("click", handleButtonClick);
```

## 複数のリスナーを登録する

`addEventListener`の大きな利点の1つは、同じ要素に複数のイベントリスナーを登録できることです。

### 基本例

```javascript
let button = document.getElementById("myButton");

function changeColor() {
  button.style.backgroundColor = "blue";
}

function showMessage() {
  alert("クリックされました");
}

function updateCount() {
  let count = Number(button.textContent) || 0;
  button.textContent = count + 1;
}

// 3つのリスナーを登録
button.addEventListener("click", changeColor);
button.addEventListener("click", showMessage);
button.addEventListener("click", updateCount);
```

このコードでは、ボタンをクリックすると、以下の3つの処理がすべて実行されます。

1. ボタンの背景色が青に変わる
2. アラートが表示される
3. ボタンのテキストがカウントアップされる

### 実行順序

イベントリスナーは、**登録された順番に実行**されます。

```javascript
button.addEventListener("click", function() {
  console.log("1番目");
});

button.addEventListener("click", function() {
  console.log("2番目");
});

button.addEventListener("click", function() {
  console.log("3番目");
});

// クリックすると：
// 1番目
// 2番目
// 3番目
```

### 実用例：ログイン処理

複数のリスナーを使った実用的な例を見てみましょう。

```javascript
let loginButton = document.getElementById("loginButton");

// バリデーション
loginButton.addEventListener("click", function() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (!username || !password) {
    alert("ユーザー名とパスワードを入力してください");
    return;
  }
});

// ローディング表示
loginButton.addEventListener("click", function() {
  loginButton.textContent = "ログイン中...";
  loginButton.disabled = true;
});

// サーバーに送信（模擬）
loginButton.addEventListener("click", function() {
  setTimeout(function() {
    console.log("サーバーに送信しました");
    loginButton.textContent = "ログイン";
    loginButton.disabled = false;
  }, 2000);
});

// アナリティクス記録
loginButton.addEventListener("click", function() {
  console.log("Analytics: Login button clicked");
});
```

この例では、ログインボタンをクリックすると：

1. 入力値をバリデーション
2. ローディング状態を表示
3. サーバーに送信（模擬）
4. アナリティクスを記録

各処理を独立したリスナーとして実装することで、機能の追加や削除が容易になります。

### onclick属性では実現できないこと

`onclick`属性では、複数の処理を1つの関数にまとめる必要があります。

```html
<!-- onclick属性の場合 -->
<button onclick="handleLogin()">ログイン</button>
```

```javascript
function handleLogin() {
  // すべての処理を1つの関数にまとめる必要がある
  validateInput();
  showLoading();
  sendToServer();
  trackAnalytics();
}
```

この方法では、以下の問題があります。

- 機能の追加・削除が面倒
- 関数が肥大化しやすい
- 責任が1つの関数に集中する

`addEventListener`を使うことで、各処理を独立させられます。

## 関数を直接書く方法（無名関数）

関数を別に定義せず、`addEventListener`の中に直接書くこともできます。

```javascript
let button = document.getElementById("myButton");

button.addEventListener("click", function() {
  alert("クリックされました");
});
```

この書き方を**無名関数**（または匿名関数、関数リテラル）と呼びます。関数に名前を付けずに、その場で定義して使用します。

### 無名関数の利点

**1. コードが簡潔**

短い処理の場合、別に関数を定義するよりも読みやすくなります。

```javascript
// 無名関数を使う場合（簡潔）
button.addEventListener("click", function() {
  console.log("クリック");
});

// 名前付き関数を使う場合（冗長）
function handleClick() {
  console.log("クリック");
}
button.addEventListener("click", handleClick);
```

**2. スコープの明確化**

その場でしか使わない変数を、関数内に閉じ込められます。

```javascript
button.addEventListener("click", function() {
  let count = 0;
  count = count + 1;
  console.log(count);
});

// countはこのイベントリスナー内でのみ有効
```

### 無名関数の欠点

**1. 再利用できない**

同じ処理を複数の要素で使う場合、コードが重複します。

```javascript
// 重複している
button1.addEventListener("click", function() {
  console.log("クリック");
});

button2.addEventListener("click", function() {
  console.log("クリック");
});
```

**2. イベントの削除が難しい**

無名関数は、後から削除できません。

```javascript
button.addEventListener("click", function() {
  console.log("クリック");
});

// この無名関数を削除する方法がない
```

### 使い分けのガイドライン

**無名関数を使うべき場合:**

- その要素でしか使わない処理
- 短い処理（1-3行程度）
- イベントを削除する必要がない場合

**名前付き関数を使うべき場合:**

- 複数の要素で同じ処理を使う場合
- 複雑な処理（4行以上）
- 後でイベントを削除する可能性がある場合
- コードの可読性を重視する場合

```javascript
// 短い処理 → 無名関数
button.addEventListener("click", function() {
  console.log("クリック");
});

// 複雑な処理 → 名前付き関数
function handleComplexClick() {
  let data = processData();
  validateData(data);
  sendToServer(data);
  updateUI();
}
button.addEventListener("click", handleComplexClick);
```

## イベントリスナーの基本パターン

イベントリスナーを使う基本的なパターンをまとめます。

### パターン1: 名前付き関数を使う

```javascript
function handleClick() {
  console.log("クリックされました");
}

let button = document.getElementById("myButton");
button.addEventListener("click", handleClick);
```

**適している場合:**

- 複数の要素で同じ処理を使う場合
- 複雑な処理を行う場合
- 後でイベントを削除する可能性がある場合
- チーム開発でコードの可読性が重要な場合

**例:**

```javascript
function showWelcomeMessage() {
  alert("ようこそ！");
}

// 複数のボタンで同じ関数を使用
let homeButton = document.getElementById("homeButton");
let aboutButton = document.getElementById("aboutButton");

homeButton.addEventListener("click", showWelcomeMessage);
aboutButton.addEventListener("click", showWelcomeMessage);
```

### パターン2: 無名関数を使う

```javascript
let button = document.getElementById("myButton");
button.addEventListener("click", function() {
  console.log("クリックされました");
});
```

**適している場合:**

- その要素でしか使わない処理
- シンプルな処理
- 一時的な処理
- プロトタイピング段階

**例:**

```javascript
let closeButton = document.getElementById("closeButton");

closeButton.addEventListener("click", function() {
  document.getElementById("modal").style.display = "none";
});
```

### パターン3: アロー関数を使う（ES6以降）

```javascript
let button = document.getElementById("myButton");
button.addEventListener("click", () => {
  console.log("クリックされました");
});
```

アロー関数は、より簡潔な書き方です（後のレッスンで詳しく学びます）。

### パターン4: イベントオブジェクトを使う

```javascript
let button = document.getElementById("myButton");
button.addEventListener("click", function(event) {
  console.log("クリック位置:", event.clientX, event.clientY);
  console.log("クリックされた要素:", event.target);
});
```

**イベントオブジェクトには以下の情報が含まれます:**

- `event.target`: イベントが発生した要素
- `event.type`: イベントのタイプ（"click"など）
- `event.clientX`, `event.clientY`: マウスの位置
- `event.key`: 押されたキー（キーボードイベント）
- `event.preventDefault()`: デフォルト動作を防ぐ

## 複数の要素にイベントを登録する

複数のボタンに同じイベントリスナーを登録する場合、関数を再利用できます。

### 基本例

```javascript
function handleClick() {
  alert("ボタンがクリックされました");
}

let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");

button1.addEventListener("click", handleClick);
button2.addEventListener("click", handleClick);
button3.addEventListener("click", handleClick);
```

この場合、3つのボタンすべてが同じ`handleClick`関数を実行します。

### ループを使った登録

複数の要素に一括でイベントリスナーを登録するには、ループを使います。

```javascript
function handleClick() {
  alert("クリックされました");
}

let buttons = document.getElementsByClassName("myButton");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", handleClick);
}
```

### イベントオブジェクトでどのボタンかを判別

イベントオブジェクトを使うと、どのボタンがクリックされたかを判別できます。

```javascript
function handleClick(event) {
  let buttonId = event.target.id;
  alert(buttonId + "がクリックされました");
}

let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");

button1.addEventListener("click", handleClick);
button2.addEventListener("click", handleClick);
button3.addEventListener("click", handleClick);
```

### data属性を使った情報の取得

HTML要素に`data-*`属性を設定すると、その情報をJavaScriptで取得できます。

```html
<button id="button1" data-message="こんにちは">ボタン1</button>
<button id="button2" data-message="ありがとう">ボタン2</button>
<button id="button3" data-message="さようなら">ボタン3</button>
```

```javascript
function handleClick(event) {
  let message = event.target.getAttribute("data-message");
  alert(message);
}

let buttons = document.getElementsByTagName("button");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", handleClick);
}
```

## よくあるミスと解決方法

イベントリスナーを使う際によくあるミスと、その解決方法を紹介します。

### ミス1: 関数にカッコを付けてしまう

**問題のコード:**

```javascript
button.addEventListener("click", handleClick());
```

**何が問題か:**

`handleClick()`と書くと、その場で関数が実行され、その戻り値が登録されます。

```javascript
function handleClick() {
  console.log("クリック");
  return "完了"; // この戻り値が登録される
}

button.addEventListener("click", handleClick()); // 即座に実行される
// "完了"という文字列が登録されてしまう
```

**解決方法:**

カッコを付けずに、関数名だけを渡します。

```javascript
button.addEventListener("click", handleClick);
```

### ミス2: イベント名を間違える

**問題のコード:**

```javascript
button.addEventListener("onClick", handleClick); // 間違い
```

**何が問題か:**

イベント名は小文字で指定します。`"onClick"`ではなく`"click"`です。

**解決方法:**

正しいイベント名を使います。

```javascript
button.addEventListener("click", handleClick); // 正しい
```

**主なイベント名:**

- `"click"` (○) / `"onClick"` (×)
- `"mouseover"` (○) / `"onMouseOver"` (×)
- `"keydown"` (○) / `"onKeyDown"` (×)

### ミス3: 要素が取得できていない

**問題のコード:**

```javascript
let button = document.getElementById("myButton");
button.addEventListener("click", handleClick);
```

**何が問題か:**

JavaScriptがHTMLより先に実行されると、要素が見つかりません。

```javascript
// HTMLの読み込み前に実行される
let button = document.getElementById("myButton"); // null
button.addEventListener("click", handleClick); // エラー
```

**解決方法1: スクリプトタグを</body>の直前に配置**

```html
<body>
  <button id="myButton">クリック</button>

  <!-- 要素の後にスクリプトを読み込む -->
  <script src="script.js"></script>
</body>
```

**解決方法2: DOMContentLoadedイベントを使う**

```javascript
document.addEventListener("DOMContentLoaded", function() {
  let button = document.getElementById("myButton");
  button.addEventListener("click", handleClick);
});
```

### ミス4: 無名関数を削除しようとする

**問題のコード:**

```javascript
button.addEventListener("click", function() {
  console.log("クリック");
});

// 削除しようとする
button.removeEventListener("click", function() {
  console.log("クリック");
});
```

**何が問題か:**

無名関数は参照を保持できないため、削除できません。2つの`function() {...}`は別の関数です。

**解決方法:**

名前付き関数を使います。

```javascript
function handleClick() {
  console.log("クリック");
}

button.addEventListener("click", handleClick);

// 削除できる
button.removeEventListener("click", handleClick);
```

### ミス5: イベントリスナー内でthisを誤解する

**問題のコード:**

```javascript
let obj = {
  count: 0,
  handleClick: function() {
    console.log(this.count); // 期待: objのcount
  }
};

button.addEventListener("click", obj.handleClick);
// thisはbuttonを指す
```

**何が問題か:**

イベントリスナー内の`this`は、イベントが発生した要素（この場合はbutton）を指します。

**解決方法:**

変数に保存するか、bind()を使います。

```javascript
let obj = {
  count: 0,
  handleClick: function() {
    console.log(this.count);
  }
};

// 方法1: 無名関数で包む
button.addEventListener("click", function() {
  obj.handleClick();
});

// 方法2: bind()を使う
button.addEventListener("click", obj.handleClick.bind(obj));
```

### ミス6: イベントリスナーを重複登録する

**問題のコード:**

```javascript
function init() {
  let button = document.getElementById("myButton");
  button.addEventListener("click", handleClick);
}

// 何度も呼ばれる
init();
init();
init();
```

**何が問題か:**

同じイベントリスナーが複数回登録されると、クリック1回で複数回実行されます。

**解決方法:**

登録前に削除するか、フラグで管理します。

```javascript
let isInitialized = false;

function init() {
  if (isInitialized) {
    return;
  }

  let button = document.getElementById("myButton");
  button.addEventListener("click", handleClick);

  isInitialized = true;
}
```

## 完全版アプリケーション例

### アプリケーション1: タスク管理アプリ

**HTML (index.html):**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>タスク管理アプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }

    h1 {
      color: #333;
      text-align: center;
    }

    .input-area {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    #taskInput {
      flex: 1;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
    }

    button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }

    button:hover {
      background-color: #45a049;
    }

    #clearButton {
      background-color: #f44336;
    }

    #clearButton:hover {
      background-color: #da190b;
    }

    #taskList {
      list-style: none;
      padding: 0;
    }

    .task-item {
      background-color: #f9f9f9;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .task-item.completed {
      background-color: #e8f5e9;
      text-decoration: line-through;
      color: #888;
    }

    .delete-btn {
      background-color: #ff5722;
      padding: 5px 15px;
      font-size: 14px;
    }

    .delete-btn:hover {
      background-color: #e64a19;
    }

    #stats {
      margin-top: 20px;
      padding: 15px;
      background-color: #e3f2fd;
      border-radius: 5px;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>📝 タスク管理アプリ</h1>

  <div class="input-area">
    <input type="text" id="taskInput" placeholder="新しいタスクを入力...">
    <button id="addButton">追加</button>
    <button id="clearButton">全削除</button>
  </div>

  <ul id="taskList"></ul>

  <div id="stats">
    <p>総タスク数: <span id="totalCount">0</span> | 完了: <span id="completedCount">0</span> | 未完了: <span id="pendingCount">0</span></p>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
// タスクのデータ
let tasks = [];
let taskIdCounter = 0;

// 要素を取得
let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let clearButton = document.getElementById("clearButton");
let taskList = document.getElementById("taskList");

// タスクを追加
function addTask() {
  let taskText = taskInput.value.trim();

  if (!taskText) {
    alert("タスクを入力してください");
    return;
  }

  let task = {
    id: taskIdCounter,
    text: taskText,
    completed: false
  };

  tasks.push(task);
  taskIdCounter = taskIdCounter + 1;

  taskInput.value = "";
  renderTasks();
  updateStats();
}

// タスクを削除
function deleteTask(taskId) {
  tasks = tasks.filter(function(task) {
    return task.id !== taskId;
  });

  renderTasks();
  updateStats();
}

// タスクの完了状態を切り替え
function toggleTask(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      tasks[i].completed = !tasks[i].completed;
      break;
    }
  }

  renderTasks();
  updateStats();
}

// 全タスクを削除
function clearAllTasks() {
  if (tasks.length === 0) {
    return;
  }

  if (confirm("全てのタスクを削除しますか？")) {
    tasks = [];
    renderTasks();
    updateStats();
  }
}

// タスクを画面に表示
function renderTasks() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let li = document.createElement("li");
    li.className = "task-item";

    if (task.completed) {
      li.className = li.className + " completed";
    }

    let taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.style.cursor = "pointer";

    // タスクテキストをクリックで完了/未完了を切り替え
    taskText.addEventListener("click", function() {
      toggleTask(task.id);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.className = "delete-btn";

    // 削除ボタンのイベント
    deleteBtn.addEventListener("click", function() {
      deleteTask(task.id);
    });

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
}

// 統計を更新
function updateStats() {
  let totalCount = tasks.length;
  let completedCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) {
      completedCount = completedCount + 1;
    }
  }

  let pendingCount = totalCount - completedCount;

  document.getElementById("totalCount").textContent = totalCount;
  document.getElementById("completedCount").textContent = completedCount;
  document.getElementById("pendingCount").textContent = pendingCount;
}

// LocalStorageに保存
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LocalStorageから読み込み
function loadTasks() {
  let savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
    updateStats();
  }
}

// イベントリスナーを登録

// 追加ボタン
addButton.addEventListener("click", addTask);

// 追加ボタン: 保存も実行
addButton.addEventListener("click", saveTasks);

// Enterキーで追加
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
    saveTasks();
  }
});

// 全削除ボタン
clearButton.addEventListener("click", clearAllTasks);

// 全削除ボタン: 保存も実行
clearButton.addEventListener("click", saveTasks);

// ページ読み込み時にタスクを復元
document.addEventListener("DOMContentLoaded", loadTasks);
```

### アプリケーション2: カウンターアプリ（複数リスナー）

**HTML (index.html):**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>カウンターアプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      text-align: center;
    }

    h1 {
      color: #333;
    }

    #counter {
      font-size: 72px;
      font-weight: bold;
      color: #2196F3;
      margin: 30px 0;
    }

    button {
      padding: 15px 30px;
      margin: 10px;
      font-size: 18px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      color: white;
      transition: transform 0.1s;
    }

    button:active {
      transform: scale(0.95);
    }

    #incrementBtn {
      background-color: #4CAF50;
    }

    #decrementBtn {
      background-color: #f44336;
    }

    #resetBtn {
      background-color: #9E9E9E;
    }

    #log {
      margin-top: 30px;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 5px;
      max-height: 200px;
      overflow-y: auto;
      text-align: left;
    }

    .log-entry {
      padding: 5px;
      border-bottom: 1px solid #ddd;
    }

    #stats {
      margin-top: 20px;
      padding: 15px;
      background-color: #e3f2fd;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <h1>🔢 カウンターアプリ</h1>

  <div id="counter">0</div>

  <div>
    <button id="incrementBtn">+1</button>
    <button id="decrementBtn">-1</button>
    <button id="resetBtn">リセット</button>
  </div>

  <div id="stats">
    <p>総クリック数: <span id="totalClicks">0</span></p>
    <p>最大値: <span id="maxValue">0</span> | 最小値: <span id="minValue">0</span></p>
  </div>

  <div id="log">
    <h3>操作ログ</h3>
    <div id="logEntries"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
// 状態管理
let count = 0;
let totalClicks = 0;
let maxValue = 0;
let minValue = 0;

// 要素を取得
let counterDisplay = document.getElementById("counter");
let incrementBtn = document.getElementById("incrementBtn");
let decrementBtn = document.getElementById("decrementBtn");
let resetBtn = document.getElementById("resetBtn");
let logEntries = document.getElementById("logEntries");

// カウンターを更新
function updateCounter(newValue) {
  count = newValue;
  counterDisplay.textContent = count;

  // 最大値・最小値を更新
  if (count > maxValue) {
    maxValue = count;
  }
  if (count < minValue) {
    minValue = count;
  }
}

// 統計を更新
function updateStats() {
  document.getElementById("totalClicks").textContent = totalClicks;
  document.getElementById("maxValue").textContent = maxValue;
  document.getElementById("minValue").textContent = minValue;
}

// ログを追加
function addLog(message) {
  let entry = document.createElement("div");
  entry.className = "log-entry";

  let time = new Date().toLocaleTimeString();
  entry.textContent = "[" + time + "] " + message;

  logEntries.insertBefore(entry, logEntries.firstChild);

  // 最大50件まで保持
  while (logEntries.children.length > 50) {
    logEntries.removeChild(logEntries.lastChild);
  }
}

// 効果音を再生（模擬）
function playSound(type) {
  console.log("Sound: " + type);
}

// アニメーション
function animateCounter() {
  counterDisplay.style.transform = "scale(1.2)";
  setTimeout(function() {
    counterDisplay.style.transform = "scale(1)";
  }, 100);
}

// +1ボタンに複数のイベントリスナーを登録

// 1. カウンターを増やす
incrementBtn.addEventListener("click", function() {
  updateCounter(count + 1);
});

// 2. クリック数を記録
incrementBtn.addEventListener("click", function() {
  totalClicks = totalClicks + 1;
  updateStats();
});

// 3. ログを追加
incrementBtn.addEventListener("click", function() {
  addLog("+1 (現在: " + count + ")");
});

// 4. 効果音を再生
incrementBtn.addEventListener("click", function() {
  playSound("increment");
});

// 5. アニメーション
incrementBtn.addEventListener("click", function() {
  animateCounter();
});

// -1ボタンに複数のイベントリスナーを登録

// 1. カウンターを減らす
decrementBtn.addEventListener("click", function() {
  updateCounter(count - 1);
});

// 2. クリック数を記録
decrementBtn.addEventListener("click", function() {
  totalClicks = totalClicks + 1;
  updateStats();
});

// 3. ログを追加
decrementBtn.addEventListener("click", function() {
  addLog("-1 (現在: " + count + ")");
});

// 4. 効果音を再生
decrementBtn.addEventListener("click", function() {
  playSound("decrement");
});

// 5. アニメーション
decrementBtn.addEventListener("click", function() {
  animateCounter();
});

// リセットボタンに複数のイベントリスナーを登録

// 1. カウンターをリセット
resetBtn.addEventListener("click", function() {
  updateCounter(0);
  maxValue = 0;
  minValue = 0;
});

// 2. 統計を更新
resetBtn.addEventListener("click", function() {
  updateStats();
});

// 3. ログを追加
resetBtn.addEventListener("click", function() {
  addLog("リセット");
});

// 4. 効果音を再生
resetBtn.addEventListener("click", function() {
  playSound("reset");
});
```

### アプリケーション3: クイズアプリ

**HTML (index.html):**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>クイズアプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 700px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f0f0f0;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    #quiz-container {
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    #question {
      font-size: 24px;
      margin-bottom: 30px;
      color: #2196F3;
    }

    .option {
      display: block;
      width: 100%;
      padding: 15px;
      margin: 10px 0;
      font-size: 18px;
      border: 2px solid #ddd;
      border-radius: 5px;
      background-color: white;
      cursor: pointer;
      transition: all 0.3s;
    }

    .option:hover {
      background-color: #e3f2fd;
      border-color: #2196F3;
    }

    .option.correct {
      background-color: #4CAF50;
      color: white;
      border-color: #4CAF50;
    }

    .option.incorrect {
      background-color: #f44336;
      color: white;
      border-color: #f44336;
    }

    #result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }

    #result.correct {
      background-color: #c8e6c9;
      color: #2e7d32;
    }

    #result.incorrect {
      background-color: #ffcdd2;
      color: #c62828;
    }

    #score {
      text-align: center;
      font-size: 20px;
      margin-top: 20px;
    }

    #nextButton {
      display: none;
      width: 100%;
      padding: 15px;
      margin-top: 20px;
      font-size: 18px;
      background-color: #2196F3;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    #nextButton:hover {
      background-color: #1976D2;
    }
  </style>
</head>
<body>
  <h1>🎯 クイズアプリ</h1>

  <div id="quiz-container">
    <div id="question"></div>
    <div id="options"></div>
    <div id="result"></div>
    <button id="nextButton">次の問題</button>
  </div>

  <div id="score">
    <p>スコア: <span id="correctCount">0</span> / <span id="totalCount">0</span></p>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**

```javascript
// クイズデータ
let quizData = [
  {
    question: "JavaScriptで変数を宣言するキーワードは？",
    options: ["let", "define", "variable", "make"],
    correct: 0
  },
  {
    question: "HTMLでボタンを作成するタグは？",
    options: ["<btn>", "<click>", "<button>", "<input>"],
    correct: 2
  },
  {
    question: "CSSで文字色を変更するプロパティは？",
    options: ["text-color", "font-color", "color", "text-style"],
    correct: 2
  },
  {
    question: "JavaScriptでコメントを書く記号は？",
    options: ["/* */", "<!-- -->", "# ", "' '"],
    correct: 0
  },
  {
    question: "DOMで要素を取得するメソッドは？",
    options: ["getElement", "getElementById", "findElement", "selectElement"],
    correct: 1
  }
];

// ゲームの状態
let currentQuestionIndex = 0;
let correctCount = 0;
let totalCount = 0;
let isAnswered = false;

// 要素を取得
let questionElement = document.getElementById("question");
let optionsElement = document.getElementById("options");
let resultElement = document.getElementById("result");
let nextButton = document.getElementById("nextButton");

// 問題を表示
function displayQuestion() {
  isAnswered = false;
  resultElement.textContent = "";
  resultElement.className = "";
  nextButton.style.display = "none";

  if (currentQuestionIndex >= quizData.length) {
    showFinalResult();
    return;
  }

  let currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = "問題 " + (currentQuestionIndex + 1) + ": " + currentQuestion.question;

  optionsElement.innerHTML = "";

  for (let i = 0; i < currentQuestion.options.length; i++) {
    let button = document.createElement("button");
    button.className = "option";
    button.textContent = currentQuestion.options[i];

    // 選択肢をクリック
    button.addEventListener("click", function() {
      checkAnswer(i, button);
    });

    optionsElement.appendChild(button);
  }
}

// 答えをチェック
function checkAnswer(selectedIndex, selectedButton) {
  if (isAnswered) {
    return;
  }

  isAnswered = true;
  totalCount = totalCount + 1;

  let currentQuestion = quizData[currentQuestionIndex];
  let isCorrect = selectedIndex === currentQuestion.correct;

  if (isCorrect) {
    correctCount = correctCount + 1;
    selectedButton.className = "option correct";
    resultElement.textContent = "✓ 正解！";
    resultElement.className = "correct";
  } else {
    selectedButton.className = "option incorrect";

    // 正解の選択肢を表示
    let options = optionsElement.getElementsByClassName("option");
    options[currentQuestion.correct].className = "option correct";

    resultElement.textContent = "✗ 不正解 正解は: " + currentQuestion.options[currentQuestion.correct];
    resultElement.className = "incorrect";
  }

  updateScore();
  nextButton.style.display = "block";
}

// スコアを更新
function updateScore() {
  document.getElementById("correctCount").textContent = correctCount;
  document.getElementById("totalCount").textContent = totalCount;
}

// 最終結果を表示
function showFinalResult() {
  questionElement.textContent = "クイズ終了！";
  optionsElement.innerHTML = "";

  let percentage = Math.round((correctCount / totalCount) * 100);

  resultElement.textContent = "最終スコア: " + correctCount + " / " + totalCount + " (" + percentage + "%)";
  resultElement.className = percentage >= 70 ? "correct" : "incorrect";
  resultElement.style.display = "block";

  nextButton.textContent = "もう一度";
  nextButton.style.display = "block";
}

// 次の問題へ
function nextQuestion() {
  if (currentQuestionIndex >= quizData.length) {
    // リセット
    currentQuestionIndex = 0;
    correctCount = 0;
    totalCount = 0;
    nextButton.textContent = "次の問題";
  } else {
    currentQuestionIndex = currentQuestionIndex + 1;
  }

  displayQuestion();
  updateScore();
}

// イベントリスナーを登録
nextButton.addEventListener("click", nextQuestion);

// 初期表示
displayQuestion();
```

## 練習問題

### 課題

`addEventListener`を使って、複数のボタンにイベントリスナーを登録しましょう。各ボタンをクリックすると、対応するメッセージが表示されます。

### 保存場所

`exercises/lesson-064/` フォルダに以下のファイルが用意されています。

- `index.html` - HTML要素を追加するファイル
- `script.js` - JavaScriptコードを書くファイル

HTML要素は `index.html` のコメント部分に追加し、JavaScriptコードは `script.js` に記述してください。ブラウザで `index.html` を開いて動作を確認しましょう。

### 手順

1. **`addEventListener`を使ってイベントリスナーを登録する**: `element.addEventListener("click", function)`の形式で登録します
2. **複数のリスナーを同じ要素に登録する**: 1つの要素に複数の処理を追加します
3. **各ボタンに適切な処理を設定する**: ボタンごとに異なるメッセージを表示します

### テストで確認する

以下のコマンドを実行すると、課題が正しく実装できているか確認できます。

```bash
npm test exercises/lesson-064
```

すべてのテストがパス（✓マーク）すれば完成です。

### ヒント1: 基本構造

<details>
<summary>ヒント1を表示</summary>

3つのボタン要素を作成します（id: button1, button2, button3）。

```html
<button id="button1">ボタン1</button>
<button id="button2">ボタン2</button>
<button id="button3">ボタン3</button>
<p id="result"></p>
```

結果を表示する要素（id: result）も作成します。

</details>

### ヒント2: イベントリスナーの登録

<details>
<summary>ヒント2を表示</summary>

`getElementById`で各ボタン要素を取得します。

```javascript
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let result = document.getElementById("result");
```

各ボタンに対して`addEventListener`を使ってクリックイベントを登録します。

```javascript
button1.addEventListener("click", handleButton1);
button2.addEventListener("click", handleButton2);
button3.addEventListener("click", handleButton3);
```

</details>

### ヒント3: 完全な実装

<details>
<summary>ヒント3を表示</summary>

クリック時に実行する関数を作成します。

```javascript
function handleButton1() {
  result.textContent = "ボタン1がクリックされました";
}

function handleButton2() {
  result.textContent = "ボタン2がクリックされました";
}

function handleButton3() {
  result.textContent = "ボタン3がクリックされました";
}
```

`result`要素の`textContent`を更新してメッセージを表示します。

</details>

### 解答例

**index.html:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 064</title>
</head>
<body>
    <h1>イベントリスナー練習</h1>
    <button id="button1">ボタン1</button>
    <button id="button2">ボタン2</button>
    <button id="button3">ボタン3</button>
    <p id="result"></p>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**

```javascript
// 要素を取得
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let result = document.getElementById("result");

// ボタン1の処理
function handleButton1() {
  result.textContent = "ボタン1がクリックされました";
}

// ボタン2の処理
function handleButton2() {
  result.textContent = "ボタン2がクリックされました";
}

// ボタン3の処理
function handleButton3() {
  result.textContent = "ボタン3がクリックされました";
}

// イベントリスナーを登録
button1.addEventListener("click", handleButton1);
button2.addEventListener("click", handleButton2);
button3.addEventListener("click", handleButton3);
```

### 解説

このプログラムは、`addEventListener`を使ってイベント処理を実装しています。

**1. 要素の取得**

`getElementById`で各ボタンと結果表示用の要素を取得しています。

```javascript
let button1 = document.getElementById("button1");
```

**2. 関数の定義**

各ボタンがクリックされた時に実行する関数を定義しています。それぞれ異なるメッセージを表示します。

```javascript
function handleButton1() {
  result.textContent = "ボタン1がクリックされました";
}
```

**3. イベントリスナーの登録**

`addEventListener`を使って、各ボタンに対応する関数を登録しています。`"click"`イベントを指定し、実行する関数を渡しています。

```javascript
button1.addEventListener("click", handleButton1);
```

**4. HTMLとの分離**

HTML側には`onclick`属性がなく、すべてのイベント処理がJavaScript側で完結しています。

この方法の利点は、以下の通りです。

- **保守性**: イベント処理がすべてJavaScript側にまとまっているため、修正や追加が簡単です
- **拡張性**: 後から新しいイベントリスナーを追加することも容易です
- **テスト性**: JavaScript側でイベント処理が完結しているため、テストが書きやすくなります

もし、同じ要素に複数の処理を追加したい場合は、以下のように書けます。

```javascript
button1.addEventListener("click", handleButton1);
button1.addEventListener("click", function() {
  console.log("ボタン1がクリックされました");
});
```

この場合、ボタン1をクリックすると、2つの処理が両方実行されます。

## まとめ

お疲れ様でした。今回のレッスンでは、イベントリスナーの基礎について学びました。

**今回のキーポイント:**

- **element.addEventListener("click", function)**: 要素にイベントリスナーを登録するメソッドです。`要素.addEventListener(イベント名, 関数)`という構文で使用します。HTMLとJavaScriptを分離でき、より柔軟なイベント処理が可能になります。関数を指定する際は、`function()`ではなく`function`とカッコを付けずに渡します

- **onclickとの違い**: `onclick`属性は1つの要素に1つのイベントしか登録できませんが、`addEventListener`は同じ要素に複数のイベントリスナーを登録できます。また、HTMLとJavaScriptが分離され、コードの保守性が向上します。イベントの削除も`removeEventListener`で容易に行えます

- **複数のリスナー**: 同じ要素に対して`addEventListener`を複数回呼び出すことで、複数の処理を登録できます。すべてのリスナーが登録された順番に実行されるため、複雑な処理を段階的に実装できます。ショッピングカートの「カートに追加」ボタンのように、1つのアクションで複数の処理を実行する場合に非常に便利です

`addEventListener`は、モダンなJavaScript開発で標準的に使われる重要な機能です。`onclick`属性よりも柔軟で強力なため、今後はこちらを積極的に使っていくことをお勧めします。

実世界のアプリケーション（Amazon、Twitter、Google Forms、YouTube、Slack）で見たように、複数のイベントリスナーを組み合わせることで、複雑な機能を分かりやすく実装できます。各機能を独立したモジュールとして管理できるため、コードの保守性と拡張性が大幅に向上します。

次のレッスンでは、イベントの削除（`removeEventListener`）について学びます。動的にイベントを追加・削除することで、より高度なインタラクションを実現していきましょう。
