/**
 * レッスン180: タイマー＆ストップウォッチアプリケーション
 * 完全な実装
 */

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

  currentTab: 'stopwatch',

  init: function() {
    this.setupTabs();
    this.setupStopwatch();
    this.setupTimer();
    this.setupPresets();
    this.displayStopwatch();
    this.displayTimer();
  },

  startStopwatch: function() {
    if (!this.stopwatch.isRunning) {
      this.stopwatch.startTime = Date.now() - this.stopwatch.elapsedTime;
      this.stopwatch.isRunning = true;

      var self = this;
      this.stopwatch.timerInterval = setInterval(function() {
        self.updateStopwatch();
      }, 10);

      this.updateStopwatchButtons();
    } else {
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
  },

  resetStopwatch: function() {
    clearInterval(this.stopwatch.timerInterval);
    this.stopwatch.startTime = 0;
    this.stopwatch.elapsedTime = 0;
    this.stopwatch.isRunning = false;
    this.stopwatch.laps = [];

    this.displayStopwatch();
    this.displayLaps();
    this.updateStopwatchButtons();
  },

  recordLap: function() {
    var lapTime = this.stopwatch.elapsedTime;

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
  },

  startTimer: function() {
    if (!this.timer.isRunning) {
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

    if (this.timer.remainingSeconds === 0) {
      this.timerComplete();
    }
  },

  timerComplete: function() {
    clearInterval(this.timer.timerInterval);
    this.timer.isRunning = false;

    this.playSound();
    alert('タイマー終了\nタイマーが終了しました！');

    this.updateTimerButtons();
    this.enableTimerInputs();
  },

  playSound: function() {
    try {
      var audioContext = new (window.AudioContext || window.webkitAudioContext)();
      var oscillator = audioContext.createOscillator();
      var gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log('音声再生に失敗しました');
    }
  },

  resetTimer: function() {
    clearInterval(this.timer.timerInterval);
    this.timer.isRunning = false;
    this.timer.remainingSeconds = this.timer.totalSeconds;

    this.displayTimer();
    this.updateTimerButtons();
    this.enableTimerInputs();
  },

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
  },

  displayStopwatch: function() {
    var timeString = this.formatTime(this.stopwatch.elapsedTime);
    document.getElementById('stopwatch-time').textContent = timeString;
  },

  displayTimer: function() {
    var timeString = this.formatTimerTime(this.timer.remainingSeconds);
    document.getElementById('timer-time').textContent = timeString;
  },

  displayLaps: function() {
    var lapsList = document.getElementById('laps-list');

    if (this.stopwatch.laps.length === 0) {
      lapsList.innerHTML = '<p class="empty-message">ラップタイムはありません</p>';
      return;
    }

    lapsList.innerHTML = '';

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
  },

  disableTimerInputs: function() {
    document.getElementById('hours-input').disabled = true;
    document.getElementById('minutes-input').disabled = true;
    document.getElementById('seconds-input').disabled = true;
  },

  enableTimerInputs: function() {
    document.getElementById('hours-input').disabled = false;
    document.getElementById('minutes-input').disabled = false;
    document.getElementById('seconds-input').disabled = false;
  },

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
  },

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

    var tabButtons = document.querySelectorAll('.tab-btn');
    var tabContents = document.querySelectorAll('.tab-content');

    for (var i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove('active');
    }

    for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].classList.remove('active');
    }

    var selectedButton = document.querySelector('[data-tab="' + tabName + '"]');
    var selectedContent = document.getElementById(tabName + '-tab');

    if (selectedButton) {
      selectedButton.classList.add('active');
    }

    if (selectedContent) {
      selectedContent.classList.add('active');
    }
  },

  setupStopwatch: function() {
    var self = this;

    document.getElementById('stopwatch-start').addEventListener('click', function() {
      self.startStopwatch();
    });

    document.getElementById('stopwatch-lap').addEventListener('click', function() {
      self.recordLap();
    });

    document.getElementById('stopwatch-reset').addEventListener('click', function() {
      self.resetStopwatch();
    });
  },

  setupTimer: function() {
    var self = this;

    document.getElementById('timer-start').addEventListener('click', function() {
      self.startTimer();
    });

    document.getElementById('timer-reset').addEventListener('click', function() {
      self.resetTimer();
    });

    var updateDisplay = function() {
      var hours = parseInt(document.getElementById('hours-input').value) || 0;
      var minutes = parseInt(document.getElementById('minutes-input').value) || 0;
      var seconds = parseInt(document.getElementById('seconds-input').value) || 0;

      self.timer.totalSeconds = hours * 3600 + minutes * 60 + seconds;
      self.timer.remainingSeconds = self.timer.totalSeconds;
      self.displayTimer();
    };

    document.getElementById('hours-input').addEventListener('change', updateDisplay);
    document.getElementById('minutes-input').addEventListener('change', updateDisplay);
    document.getElementById('seconds-input').addEventListener('change', updateDisplay);
  },

  setupPresets: function() {
    var self = this;
    var presetButtons = document.querySelectorAll('.preset-btn');

    for (var i = 0; i < presetButtons.length; i++) {
      presetButtons[i].addEventListener('click', function() {
        var seconds = parseInt(this.getAttribute('data-seconds'));
        self.setTimerFromSeconds(seconds);
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  timerApp.init();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = timerApp;
}
