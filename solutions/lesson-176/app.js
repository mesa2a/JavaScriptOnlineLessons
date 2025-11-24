/**
 * レッスン176: クイズアプリケーション
 * 完全な実装
 */

var quizApp = {
  data: quizData,
  state: {
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isQuizActive: false,
    timer: null,
    timeRemaining: 30,
    startTime: null,
    endTime: null
  },

  init: function() {
    this.setupEventListeners();
  },

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
  },

  displayQuestion: function() {
    var currentQuestion = this.data[this.state.currentQuestionIndex];

    // 問題番号と進捗を更新
    var questionNumber = this.state.currentQuestionIndex + 1;
    document.getElementById('question-number').textContent =
      '問題 ' + questionNumber + '/' + this.data.length;

    var progress = (questionNumber / this.data.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';

    // スコアを更新
    document.getElementById('score-display').textContent = 'スコア: ' + this.state.score;

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
  },

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
    this.showFeedback(isCorrect, currentQuestion, selectedIndex);

    // 選択肢のクリックを無効化
    this.state.isQuizActive = false;
  },

  showFeedback: function(isCorrect, question, selectedIndex) {
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
    this.highlightSelectedOption(question.correctAnswer, selectedIndex);
  },

  highlightSelectedOption: function(correctIndex, selectedIndex) {
    var optionButtons = document.querySelectorAll('.option-btn');

    for (var i = 0; i < optionButtons.length; i++) {
      var button = optionButtons[i];
      var index = parseInt(button.getAttribute('data-index'));

      // 正解の選択肢を緑色に
      if (index === correctIndex) {
        button.classList.add('correct');
      }

      // 選択された不正解の選択肢を赤色に
      if (index === selectedIndex && index !== correctIndex) {
        button.classList.add('incorrect');
      }

      // クリック無効化
      button.disabled = true;
    }
  },

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
  },

  startTimer: function() {
    var self = this;
    this.state.timeRemaining = 30;

    // 前のタイマーをクリア
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }

    // タイマー表示を更新
    var timeElement = document.getElementById('time-remaining');
    timeElement.textContent = this.state.timeRemaining;
    timeElement.classList.remove('warning');

    // 1秒ごとに更新
    this.state.timer = setInterval(function() {
      self.state.timeRemaining--;
      timeElement.textContent = self.state.timeRemaining;

      // 時間切れ
      if (self.state.timeRemaining <= 0) {
        self.stopTimer();
        self.handleTimeout();
      }

      // 残り時間が少ない場合は警告
      if (self.state.timeRemaining <= 5) {
        timeElement.classList.add('warning');
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
      selectedIndex: -1,
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

    // 正解の選択肢をハイライト
    this.highlightSelectedOption(currentQuestion.correctAnswer, -1);

    this.state.isQuizActive = false;
  },

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
  },

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
  },

  hideAllScreens: function() {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].style.display = 'none';
    }
  },

  reset: function() {
    this.stopTimer();
    this.hideAllScreens();
    document.getElementById('start-screen').style.display = 'block';
  },

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
};

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', function() {
  quizApp.init();
});

// テスト用にエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = quizApp;
}
