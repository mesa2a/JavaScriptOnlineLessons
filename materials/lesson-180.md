# レッスン180: タイマー＆ストップウォッチアプリケーション

## このレッスンで学ぶこと
- タイマーとストップウォッチの実装
- setIntervalとclearIntervalの活用
- ラップタイム機能
- 時間のフォーマット表示
- 音声通知機能
- プリセット機能
- localStorageでの設定保存
- タブ切り替えUI

## アプリの仕様

### 基本機能（ストップウォッチ）
1. **スタート/一時停止**: 計測の開始と一時停止
2. **リセット**: 時間を0に戻す
3. **ラップタイム**: 現在の時間を記録
4. **ラップタイム履歴**: 記録したラップタイムのリスト表示

### 基本機能（タイマー）
1. **時間設定**: 時・分・秒を設定
2. **スタート/一時停止**: カウントダウン開始と一時停止
3. **リセット**: 設定時間に戻す
4. **完了通知**: タイマー終了時に音と通知
5. **プリセット**: よく使う時間を保存

## アプリの構造

### HTML構造
```html
<div class="app-container">
  <div class="app-header">
    <h1>⏱️ タイマー＆ストップウォッチ</h1>
  </div>

  <!-- タブ切り替え -->
  <div class="tabs">
    <button class="tab-btn active" data-tab="stopwatch">ストップウォッチ</button>
    <button class="tab-btn" data-tab="timer">タイマー</button>
  </div>

  <!-- ストップウォッチセクション -->
  <div class="tab-content active" id="stopwatch-tab">
    <!-- 時間表示 -->
    <div class="time-display">
      <span id="stopwatch-time">00:00:00.00</span>
    </div>

    <!-- コントロールボタン -->
    <div class="controls">
      <button id="stopwatch-start" class="btn btn-primary">スタート</button>
      <button id="stopwatch-lap" class="btn btn-secondary" disabled>ラップ</button>
      <button id="stopwatch-reset" class="btn btn-danger" disabled>リセット</button>
    </div>

    <!-- ラップタイム一覧 -->
    <div class="laps-container">
      <h3>ラップタイム</h3>
      <div id="laps-list" class="laps-list">
        <!-- ラップタイムがここに表示される -->
      </div>
    </div>
  </div>

  <!-- タイマーセクション -->
  <div class="tab-content" id="timer-tab">
    <!-- 時間表示 -->
    <div class="time-display">
      <span id="timer-time">00:00:00</span>
    </div>

    <!-- 時間設定 -->
    <div class="time-input">
      <div class="input-group">
        <label>時</label>
        <input type="number" id="hours-input" min="0" max="23" value="0">
      </div>
      <div class="input-group">
        <label>分</label>
        <input type="number" id="minutes-input" min="0" max="59" value="0">
      </div>
      <div class="input-group">
        <label>秒</label>
        <input type="number" id="seconds-input" min="0" max="59" value="0">
      </div>
    </div>

    <!-- コントロールボタン -->
    <div class="controls">
      <button id="timer-start" class="btn btn-primary">スタート</button>
      <button id="timer-reset" class="btn btn-danger" disabled>リセット</button>
    </div>

    <!-- プリセット -->
    <div class="presets-container">
      <h3>プリセット</h3>
      <div class="presets-list">
        <button class="preset-btn" data-seconds="60">1分</button>
        <button class="preset-btn" data-seconds="180">3分</button>
        <button class="preset-btn" data-seconds="300">5分</button>
        <button class="preset-btn" data-seconds="600">10分</button>
        <button class="preset-btn" data-seconds="900">15分</button>
        <button class="preset-btn" data-seconds="1800">30分</button>
      </div>
    </div>
  </div>
</div>
```

### CSS設計
```css
.app-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.tab-btn {
  flex: 1;
  padding: 15px;
  border: none;
  background: #f0f0f0;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

.time-display {
  text-align: center;
  margin: 40px 0;
  font-size: 72px;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  color: #333;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.btn {
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-secondary {
  background: #2196F3;
  color: white;
}

.btn-danger {
  background: #f44336;
  color: white;
}

.laps-list {
  max-height: 300px;
  overflow-y: auto;
}

.lap-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}
```

## JavaScript実装

### 1. データ構造

```javascript
var timerApp = {
  stopwatch: {
    startTime: 0,
    elapsedTime: 0,
    timerInterval: null,
    isRunning: false,
    laps: []
  },

  timer: {
    totalSeconds: 0,
    remainingSeconds: 0,
    timerInterval: null,
    isRunning: false
  },

  currentTab: 'stopwatch'
};
```

### 2. ストップウォッチの実装

#### スタート/一時停止
```javascript
startStopwatch: function() {
  if (!this.stopwatch.isRunning) {
    // スタート
    this.stopwatch.startTime = Date.now() - this.stopwatch.elapsedTime;
    this.stopwatch.isRunning = true;

    var self = this;
    this.stopwatch.timerInterval = setInterval(function() {
      self.updateStopwatch();
    }, 10);  // 10ミリ秒ごとに更新

    this.updateStopwatchButtons();
  } else {
    // 一時停止
    this.pauseStopwatch();
  }
},

pauseStopwatch: function() {
  clearInterval(this.stopwatch.timerInterval);
  this.stopwatch.isRunning = false;
  this.stopwatch.elapsedTime = Date.now() - this.stopwatch.startTime;
  this.updateStopwatchButtons();
},

updateStopwatch: function() {
  this.stopwatch.elapsedTime = Date.now() - this.stopwatch.startTime;
  this.displayStopwatch();
}
```

#### リセット
```javascript
resetStopwatch: function() {
  clearInterval(this.stopwatch.timerInterval);
  this.stopwatch.startTime = 0;
  this.stopwatch.elapsedTime = 0;
  this.stopwatch.isRunning = false;
  this.stopwatch.laps = [];

  this.displayStopwatch();
  this.displayLaps();
  this.updateStopwatchButtons();
}
```

#### ラップタイム
```javascript
recordLap: function() {
  var lapTime = this.stopwatch.elapsedTime;

  // 前のラップとの差分を計算
  var previousLapTime = 0;
  if (this.stopwatch.laps.length > 0) {
    previousLapTime = this.stopwatch.laps[this.stopwatch.laps.length - 1].totalTime;
  }
  var lapDiff = lapTime - previousLapTime;

  this.stopwatch.laps.push({
    number: this.stopwatch.laps.length + 1,
    totalTime: lapTime,
    lapTime: lapDiff
  });

  this.displayLaps();
}
```

### 3. 時間のフォーマット

```javascript
formatTime: function(milliseconds) {
  var totalSeconds = Math.floor(milliseconds / 1000);
  var hours = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var seconds = totalSeconds % 60;
  var ms = Math.floor((milliseconds % 1000) / 10);

  return this.padZero(hours, 2) + ':' +
         this.padZero(minutes, 2) + ':' +
         this.padZero(seconds, 2) + '.' +
         this.padZero(ms, 2);
},

formatTimerTime: function(totalSeconds) {
  var hours = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var seconds = totalSeconds % 60;

  return this.padZero(hours, 2) + ':' +
         this.padZero(minutes, 2) + ':' +
         this.padZero(seconds, 2);
},

padZero: function(num, length) {
  var str = String(num);
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}
```

### 4. ストップウォッチの表示

```javascript
displayStopwatch: function() {
  var timeString = this.formatTime(this.stopwatch.elapsedTime);
  document.getElementById('stopwatch-time').textContent = timeString;
},

displayLaps: function() {
  var lapsList = document.getElementById('laps-list');

  if (this.stopwatch.laps.length === 0) {
    lapsList.innerHTML = '<p class="empty-message">ラップタイムはありません</p>';
    return;
  }

  lapsList.innerHTML = '';

  // 逆順で表示（最新が上）
  for (var i = this.stopwatch.laps.length - 1; i >= 0; i--) {
    var lap = this.stopwatch.laps[i];

    var lapItem = document.createElement('div');
    lapItem.className = 'lap-item';

    var lapNumber = document.createElement('span');
    lapNumber.className = 'lap-number';
    lapNumber.textContent = 'ラップ ' + lap.number;

    var lapTimeSpan = document.createElement('span');
    lapTimeSpan.className = 'lap-time';
    lapTimeSpan.textContent = this.formatTime(lap.lapTime);

    lapItem.appendChild(lapNumber);
    lapItem.appendChild(lapTimeSpan);
    lapsList.appendChild(lapItem);
  }
}
```

### 5. タイマーの実装

#### スタート/一時停止
```javascript
startTimer: function() {
  if (!this.timer.isRunning) {
    // 初回スタート時
    if (this.timer.remainingSeconds === 0) {
      var hours = parseInt(document.getElementById('hours-input').value) || 0;
      var minutes = parseInt(document.getElementById('minutes-input').value) || 0;
      var seconds = parseInt(document.getElementById('seconds-input').value) || 0;

      this.timer.totalSeconds = hours * 3600 + minutes * 60 + seconds;
      this.timer.remainingSeconds = this.timer.totalSeconds;

      if (this.timer.totalSeconds === 0) {
        alert('時間を設定してください');
        return;
      }
    }

    this.timer.isRunning = true;

    var self = this;
    this.timer.timerInterval = setInterval(function() {
      self.updateTimer();
    }, 1000);

    this.updateTimerButtons();
    this.disableTimerInputs();
  } else {
    // 一時停止
    this.pauseTimer();
  }
},

pauseTimer: function() {
  clearInterval(this.timer.timerInterval);
  this.timer.isRunning = false;
  this.updateTimerButtons();
},

updateTimer: function() {
  this.timer.remainingSeconds--;

  if (this.timer.remainingSeconds < 0) {
    this.timer.remainingSeconds = 0;
  }

  this.displayTimer();

  // タイマー終了
  if (this.timer.remainingSeconds === 0) {
    this.timerComplete();
  }
}
```

#### タイマー完了
```javascript
timerComplete: function() {
  clearInterval(this.timer.timerInterval);
  this.timer.isRunning = false;

  // 音を鳴らす（Web Audio API使用）
  this.playSound();

  // 通知を表示
  this.showNotification('タイマー終了', 'タイマーが終了しました！');

  this.updateTimerButtons();
  this.enableTimerInputs();
},

playSound: function() {
  // AudioContextを使って簡単なビープ音を生成
  try {
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioContext.createOscillator();
    var gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;  // 周波数
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (e) {
    console.log('音声再生に失敗しました');
  }
},

showNotification: function(title, message) {
  // 通知APIをサポートしているかチェック
  if (!('Notification' in window)) {
    alert(title + '\n' + message);
    return;
  }

  // 通知の許可を取得
  if (Notification.permission === 'granted') {
    new Notification(title, { body: message });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        new Notification(title, { body: message });
      }
    });
  } else {
    alert(title + '\n' + message);
  }
}
```

#### リセット
```javascript
resetTimer: function() {
  clearInterval(this.timer.timerInterval);
  this.timer.isRunning = false;
  this.timer.remainingSeconds = this.timer.totalSeconds;

  this.displayTimer();
  this.updateTimerButtons();
  this.enableTimerInputs();
}
```

### 6. プリセット機能

```javascript
setupPresets: function() {
  var self = this;
  var presetButtons = document.querySelectorAll('.preset-btn');

  for (var i = 0; i < presetButtons.length; i++) {
    presetButtons[i].addEventListener('click', function() {
      var seconds = parseInt(this.getAttribute('data-seconds'));
      self.setTimerFromSeconds(seconds);
    });
  }
},

setTimerFromSeconds: function(totalSeconds) {
  var hours = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var seconds = totalSeconds % 60;

  document.getElementById('hours-input').value = hours;
  document.getElementById('minutes-input').value = minutes;
  document.getElementById('seconds-input').value = seconds;

  this.timer.totalSeconds = totalSeconds;
  this.timer.remainingSeconds = totalSeconds;
  this.displayTimer();
}
```

### 7. タブ切り替え

```javascript
setupTabs: function() {
  var self = this;
  var tabButtons = document.querySelectorAll('.tab-btn');

  for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', function() {
      var tabName = this.getAttribute('data-tab');
      self.switchTab(tabName);
    });
  }
},

switchTab: function(tabName) {
  this.currentTab = tabName;

  // すべてのタブボタンとコンテンツからactiveクラスを削除
  var tabButtons = document.querySelectorAll('.tab-btn');
  var tabContents = document.querySelectorAll('.tab-content');

  for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
  }

  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove('active');
  }

  // 選択されたタブにactiveクラスを追加
  var selectedButton = document.querySelector('[data-tab="' + tabName + '"]');
  var selectedContent = document.getElementById(tabName + '-tab');

  if (selectedButton) {
    selectedButton.classList.add('active');
  }

  if (selectedContent) {
    selectedContent.classList.add('active');
  }
}
```

### 8. ボタン状態の管理

```javascript
updateStopwatchButtons: function() {
  var startBtn = document.getElementById('stopwatch-start');
  var lapBtn = document.getElementById('stopwatch-lap');
  var resetBtn = document.getElementById('stopwatch-reset');

  if (this.stopwatch.isRunning) {
    startBtn.textContent = '一時停止';
    lapBtn.disabled = false;
    resetBtn.disabled = true;
  } else {
    if (this.stopwatch.elapsedTime > 0) {
      startBtn.textContent = '再開';
      lapBtn.disabled = true;
      resetBtn.disabled = false;
    } else {
      startBtn.textContent = 'スタート';
      lapBtn.disabled = true;
      resetBtn.disabled = true;
    }
  }
},

updateTimerButtons: function() {
  var startBtn = document.getElementById('timer-start');
  var resetBtn = document.getElementById('timer-reset');

  if (this.timer.isRunning) {
    startBtn.textContent = '一時停止';
    resetBtn.disabled = true;
  } else {
    if (this.timer.remainingSeconds > 0 && this.timer.remainingSeconds < this.timer.totalSeconds) {
      startBtn.textContent = '再開';
      resetBtn.disabled = false;
    } else {
      startBtn.textContent = 'スタート';
      resetBtn.disabled = this.timer.remainingSeconds === 0;
    }
  }
}
```

## 実装のポイント

### 1. 高精度な時間計測
ストップウォッチでは10ミリ秒ごとに更新することで、滑らかな表示を実現します。

### 2. 時間の正確性
`Date.now()`を使うことで、setIntervalの遅延による誤差を最小限に抑えます。

### 3. メモリリークの防止
タブ切り替え時やリセット時に必ず`clearInterval()`を呼び出します。

### 4. ユーザー体験
- ボタンの有効/無効状態を適切に管理
- プリセット機能で素早く設定可能
- 音と通知でタイマー終了を知らせる

## まとめ

このレッスンでは、タイマーとストップウォッチを実装しました。

### 学んだこと
- setInterval/clearIntervalの活用
- 高精度な時間計測
- 時間のフォーマット表示
- ラップタイム機能の実装
- タブUIの実装
- Web Audio APIによる音声再生
- Notification APIによる通知
- プリセット機能

### 次のステップ
- ポモドーロタイマー機能の追加
- タイマー履歴の保存
- カスタムプリセットの作成
- テーマのカスタマイズ

これでレッスン175-180の応用課題シリーズが完了しました。5つのアプリを通じて、実践的なJavaScriptプログラミングの技術を習得できました！
