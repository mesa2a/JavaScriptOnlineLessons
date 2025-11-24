# レッスン176: 応用課題 - クイズアプリケーション

## このレッスンの目標

インタラクティブなクイズアプリケーションを作成し、状態管理、画面遷移、スコア計算などの実践的なスキルを身につける。

## 学習内容

### 1. プロジェクト概要

#### 1-1. 機能要件

基本的なクイズアプリケーションに以下の機能を実装します：

**必須機能:**
- クイズの表示（1問ずつ）
- 選択肢の表示と選択
- 回答の判定
- スコアの計算と表示
- 結果画面の表示

**追加機能:**
- 進捗バーの表示
- タイマー機能
- カテゴリ選択
- 正答率の表示
- リトライ機能

#### 1-2. データ構造

クイズデータの構造：

```javascript
var quizData = [
  {
    id: 1,
    category: 'JavaScript',
    question: 'JavaScriptで変数を宣言するキーワードはどれ？',
    options: ['var', 'int', 'string', 'const'],
    correctAnswer: 0, // optionsのインデックス
    explanation: 'JavaScriptではvar、let、constが使えます。'
  },
  {
    id: 2,
    category: 'JavaScript',
    question: '配列の長さを取得するプロパティは？',
    options: ['size', 'length', 'count', 'total'],
    correctAnswer: 1,
    explanation: '配列のlengthプロパティで要素数を取得できます。'
  }
  // ... more questions
];
```

アプリケーションの状態：

```javascript
var quizState = {
  currentQuestionIndex: 0,  // 現在の問題番号
  score: 0,                  // スコア
  answers: [],               // ユーザーの回答履歴
  startTime: null,           // 開始時刻
  endTime: null,             // 終了時刻
  timeLimit: 30              // 1問あたりの制限時間（秒）
};
```

### 2. 実装の設計

#### 2-1. アプリケーションの構造

```javascript
var quizApp = {
  data: quizData,           // クイズデータ
  state: {                  // アプリケーション状態
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isQuizActive: false,
    timer: null,
    timeRemaining: 30
  },

  // 初期化
  init: function() {
    this.showStartScreen();
    this.setupEventListeners();
  },

  // クイズ開始
  startQuiz: function() {
    // 実装
  },

  // 問題を表示
  displayQuestion: function() {
    // 実装
  },

  // 回答を処理
  handleAnswer: function(selectedIndex) {
    // 実装
  },

  // 次の問題へ
  nextQuestion: function() {
    // 実装
  },

  // 結果を表示
  showResults: function() {
    // 実装
  },

  // リセット
  reset: function() {
    // 実装
  }
};
```

#### 2-2. HTML構造

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>クイズアプリ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <!-- 開始画面 -->
    <div id="start-screen" class="screen">
      <h1>🎯 JavaScriptクイズ</h1>
      <p>全10問のクイズに挑戦しましょう！</p>
      <button id="start-btn" class="btn btn-primary">スタート</button>
    </div>

    <!-- クイズ画面 -->
    <div id="quiz-screen" class="screen" style="display: none;">
      <!-- ヘッダー -->
      <div class="quiz-header">
        <div class="progress-info">
          <span id="question-number">問題 1/10</span>
          <span id="score-display">スコア: 0</span>
        </div>
        <div class="progress-bar">
          <div id="progress-fill" class="progress-fill"></div>
        </div>
        <div class="timer">
          <span>残り時間: </span>
          <span id="time-remaining">30</span>
          <span>秒</span>
        </div>
      </div>

      <!-- 問題 -->
      <div class="question-container">
        <div class="category" id="category">JavaScript</div>
        <h2 id="question-text">問題文がここに表示されます</h2>
      </div>

      <!-- 選択肢 -->
      <div id="options-container" class="options-container">
        <!-- 選択肢がここに動的に生成される -->
      </div>

      <!-- フィードバック -->
      <div id="feedback" class="feedback" style="display: none;">
        <p id="feedback-text"></p>
        <p id="explanation"></p>
        <button id="next-btn" class="btn btn-primary">次の問題へ</button>
      </div>
    </div>

    <!-- 結果画面 -->
    <div id="result-screen" class="screen" style="display: none;">
      <h1>🎉 クイズ終了！</h1>
      <div class="result-summary">
        <div class="result-item">
          <span class="result-label">最終スコア</span>
          <span id="final-score" class="result-value">0</span>
        </div>
        <div class="result-item">
          <span class="result-label">正答率</span>
          <span id="accuracy" class="result-value">0%</span>
        </div>
        <div class="result-item">
          <span class="result-label">所要時間</span>
          <span id="total-time" class="result-value">0秒</span>
        </div>
      </div>

      <!-- 結果詳細 -->
      <div id="answer-review" class="answer-review">
        <!-- 回答の詳細がここに表示される -->
      </div>

      <button id="retry-btn" class="btn btn-primary">もう一度挑戦</button>
    </div>
  </div>

  <script src="quiz-data.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

### 3. 主要な実装パターン

#### 3-1. クイズの開始

```javascript
startQuiz: function() {
  // 状態をリセット
  this.state.currentQuestionIndex = 0;
  this.state.score = 0;
  this.state.answers = [];
  this.state.isQuizActive = true;
  this.state.startTime = new Date();

  // 画面を切り替え
  this.hideAllScreens();
  document.getElementById('quiz-screen').style.display = 'block';

  // 最初の問題を表示
  this.displayQuestion();
}
```

#### 3-2. 問題の表示

```javascript
displayQuestion: function() {
  var currentQuestion = this.data[this.state.currentQuestionIndex];

  // 問題番号と進捗を更新
  var questionNumber = this.state.currentQuestionIndex + 1;
  document.getElementById('question-number').textContent =
    '問題 ' + questionNumber + '/' + this.data.length;

  var progress = (questionNumber / this.data.length) * 100;
  document.getElementById('progress-fill').style.width = progress + '%';

  // カテゴリと問題文を表示
  document.getElementById('category').textContent = currentQuestion.category;
  document.getElementById('question-text').textContent = currentQuestion.question;

  // 選択肢を生成
  var optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';

  for (var i = 0; i < currentQuestion.options.length; i++) {
    var button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = currentQuestion.options[i];
    button.setAttribute('data-index', i);
    optionsContainer.appendChild(button);
  }

  // フィードバックを非表示
  document.getElementById('feedback').style.display = 'none';

  // タイマーをリセットして開始
  this.startTimer();
}
```

#### 3-3. 回答の処理

```javascript
handleAnswer: function(selectedIndex) {
  // すでに回答済みなら無視
  if (!this.state.isQuizActive) {
    return;
  }

  // タイマーを停止
  this.stopTimer();

  var currentQuestion = this.data[this.state.currentQuestionIndex];
  var isCorrect = selectedIndex === currentQuestion.correctAnswer;

  // 回答を記録
  this.state.answers.push({
    questionId: currentQuestion.id,
    selectedIndex: selectedIndex,
    isCorrect: isCorrect,
    timeSpent: 30 - this.state.timeRemaining
  });

  // スコアを更新
  if (isCorrect) {
    this.state.score += 10;
    document.getElementById('score-display').textContent =
      'スコア: ' + this.state.score;
  }

  // フィードバックを表示
  this.showFeedback(isCorrect, currentQuestion);

  // 選択肢のクリックを無効化
  this.state.isQuizActive = false;
}
```

#### 3-4. フィードバックの表示

```javascript
showFeedback: function(isCorrect, question) {
  var feedback = document.getElementById('feedback');
  var feedbackText = document.getElementById('feedback-text');
  var explanation = document.getElementById('explanation');

  // 正解/不正解のメッセージ
  if (isCorrect) {
    feedbackText.textContent = '✓ 正解です！';
    feedbackText.className = 'feedback-correct';
  } else {
    feedbackText.textContent = '✗ 残念、不正解です。';
    feedbackText.className = 'feedback-incorrect';

    // 正解を表示
    var correctOption = question.options[question.correctAnswer];
    feedbackText.textContent += ' 正解は「' + correctOption + '」です。';
  }

  // 解説を表示
  explanation.textContent = question.explanation;

  // フィードバックを表示
  feedback.style.display = 'block';

  // 選択された選択肢をハイライト
  this.highlightSelectedOption(question.correctAnswer, isCorrect);
}
```

#### 3-5. 選択肢のハイライト

```javascript
highlightSelectedOption: function(correctIndex, isCorrect) {
  var optionButtons = document.querySelectorAll('.option-btn');

  for (var i = 0; i < optionButtons.length; i++) {
    var button = optionButtons[i];
    var index = parseInt(button.getAttribute('data-index'));

    // 正解の選択肢を緑色に
    if (index === correctIndex) {
      button.classList.add('correct');
    }

    // 不正解の選択肢を赤色に（選択された場合のみ）
    if (!isCorrect && button.classList.contains('selected')) {
      button.classList.add('incorrect');
    }

    // クリック無効化
    button.disabled = true;
  }
}
```

#### 3-6. 次の問題へ

```javascript
nextQuestion: function() {
  this.state.currentQuestionIndex++;

  // まだ問題がある場合
  if (this.state.currentQuestionIndex < this.data.length) {
    this.state.isQuizActive = true;
    this.displayQuestion();
  } else {
    // クイズ終了
    this.state.endTime = new Date();
    this.showResults();
  }
}
```

#### 3-7. タイマー機能

```javascript
startTimer: function() {
  var self = this;
  this.state.timeRemaining = 30;

  // 前のタイマーをクリア
  if (this.state.timer) {
    clearInterval(this.state.timer);
  }

  // タイマー表示を更新
  document.getElementById('time-remaining').textContent =
    this.state.timeRemaining;

  // 1秒ごとに更新
  this.state.timer = setInterval(function() {
    self.state.timeRemaining--;
    document.getElementById('time-remaining').textContent =
      self.state.timeRemaining;

    // 時間切れ
    if (self.state.timeRemaining <= 0) {
      self.stopTimer();
      self.handleTimeout();
    }

    // 残り時間が少ない場合は警告
    if (self.state.timeRemaining <= 5) {
      document.getElementById('time-remaining').classList.add('warning');
    }
  }, 1000);
},

stopTimer: function() {
  if (this.state.timer) {
    clearInterval(this.state.timer);
    this.state.timer = null;
  }
  document.getElementById('time-remaining').classList.remove('warning');
},

handleTimeout: function() {
  // 時間切れの場合は不正解として処理
  var currentQuestion = this.data[this.state.currentQuestionIndex];

  this.state.answers.push({
    questionId: currentQuestion.id,
    selectedIndex: -1, // 未回答
    isCorrect: false,
    timeSpent: 30
  });

  // フィードバックを表示
  var feedback = document.getElementById('feedback');
  var feedbackText = document.getElementById('feedback-text');
  var explanation = document.getElementById('explanation');

  feedbackText.textContent = '⏰ 時間切れです！';
  feedbackText.className = 'feedback-timeout';

  var correctOption = currentQuestion.options[currentQuestion.correctAnswer];
  feedbackText.textContent += ' 正解は「' + correctOption + '」です。';

  explanation.textContent = currentQuestion.explanation;
  feedback.style.display = 'block';

  this.state.isQuizActive = false;
}
```

#### 3-8. 結果の表示

```javascript
showResults: function() {
  // 画面を切り替え
  this.hideAllScreens();
  document.getElementById('result-screen').style.display = 'block';

  // 最終スコアを表示
  document.getElementById('final-score').textContent =
    this.state.score + ' / ' + (this.data.length * 10);

  // 正答率を計算
  var correctCount = this.state.answers.filter(function(answer) {
    return answer.isCorrect;
  }).length;

  var accuracy = Math.round((correctCount / this.data.length) * 100);
  document.getElementById('accuracy').textContent = accuracy + '%';

  // 所要時間を計算
  var totalSeconds = Math.round(
    (this.state.endTime - this.state.startTime) / 1000
  );
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;
  document.getElementById('total-time').textContent =
    minutes + '分' + seconds + '秒';

  // 回答の詳細を表示
  this.displayAnswerReview();
}
```

#### 3-9. 回答レビューの表示

```javascript
displayAnswerReview: function() {
  var reviewContainer = document.getElementById('answer-review');
  reviewContainer.innerHTML = '<h3>回答の詳細</h3>';

  for (var i = 0; i < this.state.answers.length; i++) {
    var answer = this.state.answers[i];
    var question = this.data[i];

    var reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';

    // 問題番号と結果
    var header = document.createElement('div');
    header.className = 'review-header';

    var questionNum = document.createElement('span');
    questionNum.textContent = '問題 ' + (i + 1);

    var resultBadge = document.createElement('span');
    resultBadge.className = 'result-badge';
    if (answer.isCorrect) {
      resultBadge.textContent = '正解';
      resultBadge.classList.add('correct');
    } else {
      resultBadge.textContent = '不正解';
      resultBadge.classList.add('incorrect');
    }

    header.appendChild(questionNum);
    header.appendChild(resultBadge);

    // 問題文
    var questionText = document.createElement('p');
    questionText.className = 'review-question';
    questionText.textContent = question.question;

    // あなたの回答
    var yourAnswer = document.createElement('p');
    if (answer.selectedIndex === -1) {
      yourAnswer.textContent = 'あなたの回答: （未回答）';
    } else {
      yourAnswer.textContent = 'あなたの回答: ' +
        question.options[answer.selectedIndex];
    }

    // 正解
    var correctAnswer = document.createElement('p');
    correctAnswer.textContent = '正解: ' +
      question.options[question.correctAnswer];
    correctAnswer.className = 'review-correct';

    reviewItem.appendChild(header);
    reviewItem.appendChild(questionText);
    reviewItem.appendChild(yourAnswer);
    if (!answer.isCorrect) {
      reviewItem.appendChild(correctAnswer);
    }

    reviewContainer.appendChild(reviewItem);
  }
}
```

#### 3-10. イベントリスナーの設定

```javascript
setupEventListeners: function() {
  var self = this;

  // スタートボタン
  document.getElementById('start-btn').addEventListener('click', function() {
    self.startQuiz();
  });

  // 選択肢のクリック（イベント委譲）
  document.getElementById('options-container').addEventListener('click', function(e) {
    if (e.target.classList.contains('option-btn') && self.state.isQuizActive) {
      var selectedIndex = parseInt(e.target.getAttribute('data-index'));
      e.target.classList.add('selected');
      self.handleAnswer(selectedIndex);
    }
  });

  // 次の問題へボタン
  document.getElementById('next-btn').addEventListener('click', function() {
    self.nextQuestion();
  });

  // リトライボタン
  document.getElementById('retry-btn').addEventListener('click', function() {
    self.reset();
  });
}
```

### 4. スタイリングのポイント

```css
/* 画面遷移のアニメーション */
.screen {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 選択肢のホバーエフェクト */
.option-btn {
  transition: all 0.3s ease;
}

.option-btn:hover:not(:disabled) {
  transform: translateX(5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 正解/不正解の色 */
.option-btn.correct {
  background: #2ecc71;
  color: white;
}

.option-btn.incorrect {
  background: #e74c3c;
  color: white;
}

/* タイマーの警告 */
.timer .warning {
  color: #e74c3c;
  font-weight: bold;
  animation: pulse 0.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

### 5. 拡張アイデア

#### 5-1. 難易度選択

```javascript
var difficulties = {
  easy: { timeLimit: 45, questionsCount: 5 },
  medium: { timeLimit: 30, questionsCount: 10 },
  hard: { timeLimit: 15, questionsCount: 15 }
};
```

#### 5-2. ハイスコアの保存

```javascript
saveHighScore: function() {
  var highScores = JSON.parse(localStorage.getItem('quizHighScores') || '[]');

  highScores.push({
    score: this.state.score,
    accuracy: this.calculateAccuracy(),
    date: new Date().toISOString()
  });

  // スコア順にソート
  highScores.sort(function(a, b) {
    return b.score - a.score;
  });

  // 上位10件のみ保存
  highScores = highScores.slice(0, 10);

  localStorage.setItem('quizHighScores', JSON.stringify(highScores));
}
```

## まとめ

このレッスンでは、インタラクティブなクイズアプリケーションを作成しました：

1. **画面遷移**: 開始画面、クイズ画面、結果画面の切り替え
2. **状態管理**: 現在の問題、スコア、回答履歴の管理
3. **タイマー機能**: setIntervalを使った時間制限
4. **動的なUI**: 問題と選択肢の動的生成
5. **フィードバック**: 即座の正誤判定とわかりやすい表示

次のレッスンでは、さらに高度な応用課題に取り組みます。

## 演習

演習ファイルで実際にクイズアプリケーションを実装してみましょう。
