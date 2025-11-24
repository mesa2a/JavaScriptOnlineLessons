/**
 * レッスン176: クイズアプリケーション
 * テスト
 */

import { describe, it, expect, beforeEach } from 'vitest';

describe('レッスン176: クイズアプリケーション', () => {

  // テスト用のクイズアプリを作成
  function createQuizApp() {
    var testData = [
      {
        id: 1,
        category: 'テスト',
        question: '問題1',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: '解説1'
      },
      {
        id: 2,
        category: 'テスト',
        question: '問題2',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: '解説2'
      },
      {
        id: 3,
        category: 'テスト',
        question: '問題3',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: '解説3'
      }
    ];

    return {
      data: testData,
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

      startQuiz: function() {
        this.state.currentQuestionIndex = 0;
        this.state.score = 0;
        this.state.answers = [];
        this.state.isQuizActive = true;
        this.state.startTime = new Date();
      },

      handleAnswer: function(selectedIndex) {
        if (!this.state.isQuizActive) {
          return false;
        }

        var currentQuestion = this.data[this.state.currentQuestionIndex];
        var isCorrect = selectedIndex === currentQuestion.correctAnswer;

        this.state.answers.push({
          questionId: currentQuestion.id,
          selectedIndex: selectedIndex,
          isCorrect: isCorrect
        });

        if (isCorrect) {
          this.state.score += 10;
        }

        this.state.isQuizActive = false;
        return true;
      },

      nextQuestion: function() {
        this.state.currentQuestionIndex++;

        if (this.state.currentQuestionIndex < this.data.length) {
          this.state.isQuizActive = true;
          return true;
        } else {
          this.state.endTime = new Date();
          return false;
        }
      },

      calculateAccuracy: function() {
        if (this.state.answers.length === 0) {
          return 0;
        }

        var correctCount = this.state.answers.filter(function(answer) {
          return answer.isCorrect;
        }).length;

        return Math.round((correctCount / this.state.answers.length) * 100);
      }
    };
  }

  describe('クイズの開始', () => {
    it('クイズを開始すると状態が正しくリセットされる', () => {
      const app = createQuizApp();
      app.state.score = 50;
      app.state.currentQuestionIndex = 5;

      app.startQuiz();

      expect(app.state.currentQuestionIndex).toBe(0);
      expect(app.state.score).toBe(0);
      expect(app.state.answers.length).toBe(0);
      expect(app.state.isQuizActive).toBe(true);
      expect(app.state.startTime).toBeDefined();
    });
  });

  describe('回答の処理', () => {
    it('正解を選択するとスコアが加算される', () => {
      const app = createQuizApp();
      app.startQuiz();

      const correctAnswer = app.data[0].correctAnswer;
      app.handleAnswer(correctAnswer);

      expect(app.state.score).toBe(10);
      expect(app.state.answers.length).toBe(1);
      expect(app.state.answers[0].isCorrect).toBe(true);
    });

    it('不正解を選択してもスコアは加算されない', () => {
      const app = createQuizApp();
      app.startQuiz();

      const incorrectAnswer = (app.data[0].correctAnswer + 1) % 4;
      app.handleAnswer(incorrectAnswer);

      expect(app.state.score).toBe(0);
      expect(app.state.answers.length).toBe(1);
      expect(app.state.answers[0].isCorrect).toBe(false);
    });

    it('回答後はisQuizActiveがfalseになる', () => {
      const app = createQuizApp();
      app.startQuiz();

      app.handleAnswer(0);

      expect(app.state.isQuizActive).toBe(false);
    });

    it('すでに回答済みなら追加の回答を受け付けない', () => {
      const app = createQuizApp();
      app.startQuiz();

      app.handleAnswer(0);
      const firstAnswerCount = app.state.answers.length;

      app.handleAnswer(1);

      expect(app.state.answers.length).toBe(firstAnswerCount);
    });
  });

  describe('次の問題への移動', () => {
    it('次の問題に移動できる', () => {
      const app = createQuizApp();
      app.startQuiz();
      app.handleAnswer(0);

      const result = app.nextQuestion();

      expect(result).toBe(true);
      expect(app.state.currentQuestionIndex).toBe(1);
      expect(app.state.isQuizActive).toBe(true);
    });

    it('最後の問題の後は終了する', () => {
      const app = createQuizApp();
      app.startQuiz();

      // すべての問題に回答
      for (var i = 0; i < app.data.length; i++) {
        app.handleAnswer(0);
        app.nextQuestion();
      }

      expect(app.state.currentQuestionIndex).toBe(app.data.length);
      expect(app.state.endTime).toBeDefined();
    });
  });

  describe('スコアの計算', () => {
    it('複数の正解でスコアが累積される', () => {
      const app = createQuizApp();
      app.startQuiz();

      // 3問すべて正解
      for (var i = 0; i < 3; i++) {
        var correctAnswer = app.data[i].correctAnswer;
        app.handleAnswer(correctAnswer);
        if (i < 2) app.nextQuestion();
      }

      expect(app.state.score).toBe(30);
    });

    it('正解と不正解が混在する場合', () => {
      const app = createQuizApp();
      app.startQuiz();

      // 1問目: 正解
      app.handleAnswer(app.data[0].correctAnswer);
      app.nextQuestion();

      // 2問目: 不正解
      app.handleAnswer((app.data[1].correctAnswer + 1) % 4);
      app.nextQuestion();

      // 3問目: 正解
      app.handleAnswer(app.data[2].correctAnswer);

      expect(app.state.score).toBe(20);
    });
  });

  describe('正答率の計算', () => {
    it('全問正解で100%', () => {
      const app = createQuizApp();
      app.startQuiz();

      for (var i = 0; i < app.data.length; i++) {
        app.handleAnswer(app.data[i].correctAnswer);
        if (i < app.data.length - 1) app.nextQuestion();
      }

      expect(app.calculateAccuracy()).toBe(100);
    });

    it('全問不正解で0%', () => {
      const app = createQuizApp();
      app.startQuiz();

      for (var i = 0; i < app.data.length; i++) {
        var incorrectAnswer = (app.data[i].correctAnswer + 1) % 4;
        app.handleAnswer(incorrectAnswer);
        if (i < app.data.length - 1) app.nextQuestion();
      }

      expect(app.calculateAccuracy()).toBe(0);
    });

    it('2問正解、1問不正解で67%', () => {
      const app = createQuizApp();
      app.startQuiz();

      // 1問目: 正解
      app.handleAnswer(app.data[0].correctAnswer);
      app.nextQuestion();

      // 2問目: 正解
      app.handleAnswer(app.data[1].correctAnswer);
      app.nextQuestion();

      // 3問目: 不正解
      app.handleAnswer((app.data[2].correctAnswer + 1) % 4);

      expect(app.calculateAccuracy()).toBe(67);
    });

    it('回答がない場合は0%', () => {
      const app = createQuizApp();

      expect(app.calculateAccuracy()).toBe(0);
    });
  });

  describe('回答履歴', () => {
    it('回答が正しく記録される', () => {
      const app = createQuizApp();
      app.startQuiz();

      app.handleAnswer(0);
      app.nextQuestion();
      app.handleAnswer(1);
      app.nextQuestion();
      app.handleAnswer(2);

      expect(app.state.answers.length).toBe(3);
      expect(app.state.answers[0].questionId).toBe(1);
      expect(app.state.answers[1].questionId).toBe(2);
      expect(app.state.answers[2].questionId).toBe(3);
    });

    it('各回答に選択したインデックスが記録される', () => {
      const app = createQuizApp();
      app.startQuiz();

      app.handleAnswer(2);
      app.nextQuestion();
      app.handleAnswer(3);

      expect(app.state.answers[0].selectedIndex).toBe(2);
      expect(app.state.answers[1].selectedIndex).toBe(3);
    });

    it('各回答に正誤が記録される', () => {
      const app = createQuizApp();
      app.startQuiz();

      // 正解を選択
      app.handleAnswer(app.data[0].correctAnswer);
      app.nextQuestion();

      // 不正解を選択
      var incorrectAnswer = (app.data[1].correctAnswer + 1) % 4;
      app.handleAnswer(incorrectAnswer);

      expect(app.state.answers[0].isCorrect).toBe(true);
      expect(app.state.answers[1].isCorrect).toBe(false);
    });
  });

  describe('複雑なシナリオ', () => {
    it('完全なクイズフローが正しく動作する', () => {
      const app = createQuizApp();

      // クイズ開始
      app.startQuiz();
      expect(app.state.isQuizActive).toBe(true);
      expect(app.state.currentQuestionIndex).toBe(0);

      // 1問目: 正解
      app.handleAnswer(app.data[0].correctAnswer);
      expect(app.state.score).toBe(10);
      expect(app.state.isQuizActive).toBe(false);

      // 次の問題へ
      app.nextQuestion();
      expect(app.state.currentQuestionIndex).toBe(1);
      expect(app.state.isQuizActive).toBe(true);

      // 2問目: 不正解
      var incorrectAnswer = (app.data[1].correctAnswer + 1) % 4;
      app.handleAnswer(incorrectAnswer);
      expect(app.state.score).toBe(10); // スコア変わらず

      // 次の問題へ
      app.nextQuestion();
      expect(app.state.currentQuestionIndex).toBe(2);

      // 3問目（最後）: 正解
      app.handleAnswer(app.data[2].correctAnswer);
      expect(app.state.score).toBe(20);

      // クイズ終了
      var hasMore = app.nextQuestion();
      expect(hasMore).toBe(false);
      expect(app.state.endTime).toBeDefined();

      // 最終結果
      expect(app.state.answers.length).toBe(3);
      expect(app.calculateAccuracy()).toBe(67);
    });
  });
});
