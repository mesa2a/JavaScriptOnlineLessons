/**
 * レッスン180: タイマー＆ストップウォッチアプリケーションのテスト
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('レッスン180: タイマー＆ストップウォッチアプリケーション', () => {

  function createTimerApp() {
    return {
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

      formatTime: function(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);

        return this.padZero(hours, 2) + ':' +
               this.padZero(minutes, 2) + ':' +
               this.padZero(seconds, 2) + '.' +
               this.padZero(ms, 2);
      },

      formatTimerTime: function(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return this.padZero(hours, 2) + ':' +
               this.padZero(minutes, 2) + ':' +
               this.padZero(seconds, 2);
      },

      padZero: function(num, length) {
        let str = String(num);
        while (str.length < length) {
          str = '0' + str;
        }
        return str;
      },

      recordLap: function() {
        const lapTime = this.stopwatch.elapsedTime;

        let previousLapTime = 0;
        if (this.stopwatch.laps.length > 0) {
          previousLapTime = this.stopwatch.laps[this.stopwatch.laps.length - 1].totalTime;
        }
        const lapDiff = lapTime - previousLapTime;

        this.stopwatch.laps.push({
          number: this.stopwatch.laps.length + 1,
          totalTime: lapTime,
          lapTime: lapDiff
        });
      },

      setTimerFromSeconds: function(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        this.timer.totalSeconds = totalSeconds;
        this.timer.remainingSeconds = totalSeconds;

        return { hours, minutes, seconds };
      }
    };
  }

  describe('時間のフォーマット（ストップウォッチ）', () => {
    let app;
    beforeEach(() => {
      app = createTimerApp();
    });

    it('0ミリ秒は00:00:00.00', () => {
      const result = app.formatTime(0);
      expect(result).toBe('00:00:00.00');
    });

    it('1秒は00:00:01.00', () => {
      const result = app.formatTime(1000);
      expect(result).toBe('00:00:01.00');
    });

    it('1分は00:01:00.00', () => {
      const result = app.formatTime(60000);
      expect(result).toBe('00:01:00.00');
    });

    it('1時間は01:00:00.00', () => {
      const result = app.formatTime(3600000);
      expect(result).toBe('01:00:00.00');
    });

    it('1時間23分45秒67', () => {
      const ms = (1 * 3600 + 23 * 60 + 45) * 1000 + 670;
      const result = app.formatTime(ms);
      expect(result).toBe('01:23:45.67');
    });

    it('ミリ秒が正しく表示される', () => {
      const result = app.formatTime(1550);
      expect(result).toBe('00:00:01.55');
    });
  });

  describe('時間のフォーマット（タイマー）', () => {
    let app;
    beforeEach(() => {
      app = createTimerApp();
    });

    it('0秒は00:00:00', () => {
      const result = app.formatTimerTime(0);
      expect(result).toBe('00:00:00');
    });

    it('1秒は00:00:01', () => {
      const result = app.formatTimerTime(1);
      expect(result).toBe('00:00:01');
    });

    it('60秒は00:01:00', () => {
      const result = app.formatTimerTime(60);
      expect(result).toBe('00:01:00');
    });

    it('3600秒は01:00:00', () => {
      const result = app.formatTimerTime(3600);
      expect(result).toBe('01:00:00');
    });

    it('5025秒は01:23:45', () => {
      const result = app.formatTimerTime(5025);
      expect(result).toBe('01:23:45');
    });
  });

  describe('ゼロ埋め', () => {
    let app;
    beforeEach(() => {
      app = createTimerApp();
    });

    it('1桁の数字を2桁にゼロ埋め', () => {
      const result = app.padZero(5, 2);
      expect(result).toBe('05');
    });

    it('2桁の数字はそのまま', () => {
      const result = app.padZero(25, 2);
      expect(result).toBe('25');
    });

    it('3桁にゼロ埋め', () => {
      const result = app.padZero(5, 3);
      expect(result).toBe('005');
    });

    it('0もゼロ埋めされる', () => {
      const result = app.padZero(0, 2);
      expect(result).toBe('00');
    });
  });

  describe('ラップタイム機能', () => {
    let app;
    beforeEach(() => {
      app = createTimerApp();
    });

    it('最初のラップタイムを記録できる', () => {
      app.stopwatch.elapsedTime = 5000;
      app.recordLap();

      expect(app.stopwatch.laps.length).toBe(1);
      expect(app.stopwatch.laps[0].number).toBe(1);
      expect(app.stopwatch.laps[0].totalTime).toBe(5000);
      expect(app.stopwatch.laps[0].lapTime).toBe(5000);
    });

    it('2回目のラップタイムは差分を記録', () => {
      app.stopwatch.elapsedTime = 5000;
      app.recordLap();

      app.stopwatch.elapsedTime = 12000;
      app.recordLap();

      expect(app.stopwatch.laps.length).toBe(2);
      expect(app.stopwatch.laps[1].number).toBe(2);
      expect(app.stopwatch.laps[1].totalTime).toBe(12000);
      expect(app.stopwatch.laps[1].lapTime).toBe(7000);
    });

    it('複数のラップタイムを記録できる', () => {
      app.stopwatch.elapsedTime = 1000;
      app.recordLap();

      app.stopwatch.elapsedTime = 3000;
      app.recordLap();

      app.stopwatch.elapsedTime = 6000;
      app.recordLap();

      expect(app.stopwatch.laps.length).toBe(3);
      expect(app.stopwatch.laps[0].lapTime).toBe(1000);
      expect(app.stopwatch.laps[1].lapTime).toBe(2000);
      expect(app.stopwatch.laps[2].lapTime).toBe(3000);
    });
  });

  describe('タイマーのプリセット', () => {
    let app;
    beforeEach(() => {
      app = createTimerApp();
    });

    it('60秒をセットできる', () => {
      const result = app.setTimerFromSeconds(60);
      expect(result.hours).toBe(0);
      expect(result.minutes).toBe(1);
      expect(result.seconds).toBe(0);
      expect(app.timer.totalSeconds).toBe(60);
      expect(app.timer.remainingSeconds).toBe(60);
    });

    it('300秒（5分）をセットできる', () => {
      const result = app.setTimerFromSeconds(300);
      expect(result.hours).toBe(0);
      expect(result.minutes).toBe(5);
      expect(result.seconds).toBe(0);
    });

    it('3665秒（1時間1分5秒）をセットできる', () => {
      const result = app.setTimerFromSeconds(3665);
      expect(result.hours).toBe(1);
      expect(result.minutes).toBe(1);
      expect(result.seconds).toBe(5);
    });
  });

  describe('状態管理', () => {
    it('初期状態が正しい（ストップウォッチ）', () => {
      const app = createTimerApp();
      expect(app.stopwatch.startTime).toBe(0);
      expect(app.stopwatch.elapsedTime).toBe(0);
      expect(app.stopwatch.isRunning).toBe(false);
      expect(app.stopwatch.laps.length).toBe(0);
    });

    it('初期状態が正しい（タイマー）', () => {
      const app = createTimerApp();
      expect(app.timer.totalSeconds).toBe(0);
      expect(app.timer.remainingSeconds).toBe(0);
      expect(app.timer.isRunning).toBe(false);
    });

    it('初期タブはストップウォッチ', () => {
      const app = createTimerApp();
      expect(app.currentTab).toBe('stopwatch');
    });
  });

  describe('エッジケース', () => {
    let app;
    beforeEach(() => {
      app = createTimerApp();
    });

    it('0ミリ秒のフォーマット', () => {
      const result = app.formatTime(0);
      expect(result).toBe('00:00:00.00');
    });

    it('大きな数値のフォーマット', () => {
      const ms = 99 * 3600 * 1000 + 59 * 60 * 1000 + 59 * 1000 + 990;
      const result = app.formatTime(ms);
      expect(result).toBe('99:59:59.99');
    });

    it('タイマーの0秒フォーマット', () => {
      const result = app.formatTimerTime(0);
      expect(result).toBe('00:00:00');
    });

    it('タイマーの大きな数値', () => {
      const result = app.formatTimerTime(359999);
      expect(result).toBe('99:59:59');
    });
  });
});
