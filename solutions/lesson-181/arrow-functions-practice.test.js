/**
 * レッスン181: アロー関数入門 - テスト
 */

import { describe, it, expect } from 'vitest';
import * as solutions from './arrow-functions-practice.js';

describe('レッスン181: アロー関数入門', () => {

  describe('問題1: 基本的なアロー関数', () => {
    it('2つの数を加算できる', () => {
      expect(solutions.add(2, 3)).toBe(5);
      expect(solutions.add(10, 20)).toBe(30);
    });
  });

  describe('問題2: パラメータが1つの関数', () => {
    it('数値の2乗を計算できる', () => {
      expect(solutions.square(5)).toBe(25);
      expect(solutions.square(10)).toBe(100);
    });
  });

  describe('問題3: パラメータがない関数', () => {
    it('0から1の間の乱数を返す', () => {
      const result = solutions.getRandomNumber();
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1);
    });
  });

  describe('問題4: オブジェクトを返す関数', () => {
    it('ユーザーオブジェクトを作成できる', () => {
      const user = solutions.createUser('Alice', 25);
      expect(user).toEqual({ name: 'Alice', age: 25 });
    });
  });

  describe('問題5: map を使った配列の変換', () => {
    it('各要素を2倍にできる', () => {
      expect(solutions.doubled).toEqual([2, 4, 6, 8, 10]);
    });
  });

  describe('問題6: filter を使った絞り込み', () => {
    it('18歳以上のみを抽出できる', () => {
      expect(solutions.adults).toEqual([22, 18, 30, 25]);
    });
  });

  describe('問題7: reduce を使った合計計算', () => {
    it('配列の合計を計算できる', () => {
      expect(solutions.total).toBe(750);
    });
  });

  describe('問題8: 複数行の処理がある関数', () => {
    it('挨拶メッセージを生成できる', () => {
      expect(solutions.greet('Alice')).toBe('Hello, Alice!');
      expect(solutions.greet('Bob')).toBe('Hello, Bob!');
    });
  });

  describe('問題9: オブジェクトの配列から特定のプロパティを抽出', () => {
    it('名前のみを抽出できる', () => {
      expect(solutions.names).toEqual(['Alice', 'Bob', 'Charlie']);
    });
  });

  describe('問題10: find を使った検索', () => {
    it('IDで商品を検索できる', () => {
      expect(solutions.product).toEqual({
        id: 2,
        name: 'Mouse',
        price: 20
      });
    });
  });

  describe('問題11: sort を使った並び替え', () => {
    it('昇順に並び替えできる', () => {
      expect(solutions.sortedScores).toEqual([78, 85, 88, 92, 95]);
    });
  });

  describe('問題12: 三項演算子との組み合わせ', () => {
    it('成人判定ができる', () => {
      expect(solutions.isAdult(20)).toBe('成人');
      expect(solutions.isAdult(15)).toBe('未成年');
    });
  });

  describe('問題13: メソッドチェーン', () => {
    it('偶数を抽出して2倍にして合計できる', () => {
      // [2,4,6,8,10] -> [4,8,12,16,20] -> 60
      expect(solutions.result).toBe(60);
    });
  });

  describe('問題15: every と some', () => {
    it('全員が60点以上かチェックできる', () => {
      expect(solutions.allPassed).toBe(true);
    });

    it('90点以上がいるかチェックできる', () => {
      expect(solutions.hasHighScore).toBe(true);
    });
  });

  describe('アロー関数の特徴', () => {
    it('関数として機能する', () => {
      expect(typeof solutions.add).toBe('function');
      expect(typeof solutions.square).toBe('function');
      expect(typeof solutions.greet).toBe('function');
    });

    it('返り値が正しい', () => {
      expect(solutions.add(1, 1)).toBe(2);
      expect(solutions.square(3)).toBe(9);
      expect(solutions.createUser('Test', 30)).toHaveProperty('name', 'Test');
    });
  });
});
