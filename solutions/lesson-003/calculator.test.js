/**
 * レッスン3：計算機として使う - テスト
 *
 * このテストでは、JavaScriptの四則演算、余り計算、
 * 計算の優先順位が正しく動作するかを確認します。
 */

import { describe, it, expect } from 'vitest';

describe('レッスン3：計算機として使う', () => {
    describe('演習1：足し算をマスターする', () => {
        it('5 + 8 は 13 になる', () => {
            expect(5 + 8).toBe(13);
        });

        it('123 + 456 は 579 になる', () => {
            expect(123 + 456).toBe(579);
        });

        it('誕生日の計算例：3 + 15 は 18 になる', () => {
            expect(3 + 15).toBe(18);
        });
    });

    describe('演習2：引き算を試す', () => {
        it('50 - 20 は 30 になる', () => {
            expect(50 - 20).toBe(30);
        });

        it('100 - 73 は 27 になる', () => {
            expect(100 - 73).toBe(27);
        });

        it('30 - 50 は -20 になる（負の数）', () => {
            expect(30 - 50).toBe(-20);
        });
    });

    describe('演習3：掛け算を練習する', () => {
        it('6 * 7 は 42 になる', () => {
            expect(6 * 7).toBe(42);
        });

        it('12 * 12 は 144 になる', () => {
            expect(12 * 12).toBe(144);
        });

        it('8 * 8 は 64 になる', () => {
            expect(8 * 8).toBe(64);
        });
    });

    describe('演習4：割り算をやってみる', () => {
        it('100 / 10 は 10 になる', () => {
            expect(100 / 10).toBe(10);
        });

        it('50 / 4 は 12.5 になる', () => {
            expect(50 / 4).toBe(12.5);
        });

        it('20 / 3 は約 6.67 になる', () => {
            expect(20 / 3).toBeCloseTo(6.666666666666667);
        });
    });

    describe('演習5：余りを求める', () => {
        it('17 % 5 は 2 になる（17を5で割った余り）', () => {
            expect(17 % 5).toBe(2);
        });

        it('20 % 6 は 2 になる', () => {
            expect(20 % 6).toBe(2);
        });

        it('15 % 2 は 1 になる（奇数）', () => {
            expect(15 % 2).toBe(1);
        });

        it('16 % 2 は 0 になる（偶数）', () => {
            expect(16 % 2).toBe(0);
        });

        it('奇数・偶数の判定：7 % 2 は 1', () => {
            expect(7 % 2).toBe(1);
        });

        it('奇数・偶数の判定：8 % 2 は 0', () => {
            expect(8 % 2).toBe(0);
        });
    });

    describe('演習6：計算の優先順位を確認する', () => {
        it('5 + 3 * 2 は 11 になる（掛け算が先）', () => {
            expect(5 + 3 * 2).toBe(11);
        });

        it('(5 + 3) * 2 は 16 になる（括弧が優先）', () => {
            expect((5 + 3) * 2).toBe(16);
        });

        it('10 - 4 / 2 は 8 になる（割り算が先）', () => {
            expect(10 - 4 / 2).toBe(8);
        });

        it('(10 - 4) / 2 は 3 になる（括弧が優先）', () => {
            expect((10 - 4) / 2).toBe(3);
        });

        it('2 + 3 * 4 は 14 になる', () => {
            expect(2 + 3 * 4).toBe(14);
        });

        it('(2 + 3) * 4 は 20 になる', () => {
            expect((2 + 3) * 4).toBe(20);
        });
    });

    describe('演習7：数字と文字列の違いを理解する', () => {
        it('数字の足し算：2 + 3 は 5 になる', () => {
            expect(2 + 3).toBe(5);
        });

        it('文字列の連結："2" + "3" は "23" になる', () => {
            expect("2" + "3").toBe("23");
        });

        it('数字と文字列は異なるデータ型', () => {
            expect(typeof (2 + 3)).toBe('number');
            expect(typeof ("2" + "3")).toBe('string');
        });

        it('1 + 1 は 2（数字）', () => {
            expect(1 + 1).toBe(2);
        });

        it('"1" + "1" は "11"（文字列）', () => {
            expect("1" + "1").toBe("11");
        });
    });

    describe('演習8：複雑な計算に挑戦', () => {
        it('(8 + 2) * (5 - 3) は 20 になる', () => {
            expect((8 + 2) * (5 - 3)).toBe(20);
        });

        it('100 / (2 + 3) + 10 は 30 になる', () => {
            expect(100 / (2 + 3) + 10).toBe(30);
        });

        it('3 * 4 + 5 * 6 は 42 になる', () => {
            expect(3 * 4 + 5 * 6).toBe(42);
        });

        it('(10 + 5) * (8 - 3) は 75 になる', () => {
            expect((10 + 5) * (8 - 3)).toBe(75);
        });
    });

    describe('演習9：年齢を秒数に変換する', () => {
        it('20歳は約630720000秒', () => {
            const age = 20;
            const secondsPerYear = 365 * 24 * 60 * 60;
            expect(age * secondsPerYear).toBe(630720000);
        });

        it('25歳は約788400000秒', () => {
            const age = 25;
            const secondsPerYear = 365 * 24 * 60 * 60;
            expect(age * secondsPerYear).toBe(788400000);
        });

        it('30歳は約946080000秒', () => {
            const age = 30;
            const secondsPerYear = 365 * 24 * 60 * 60;
            expect(age * secondsPerYear).toBe(946080000);
        });

        it('1年は31536000秒', () => {
            expect(365 * 24 * 60 * 60).toBe(31536000);
        });
    });

    describe('チャレンジ問題：実用的な計算', () => {
        it('身長170cmは約66.93インチ', () => {
            const heightCm = 170;
            const heightInch = heightCm / 2.54;
            expect(heightInch).toBeCloseTo(66.92913385826772, 10);
        });

        it('体重60kgは約132.3ポンド', () => {
            const weightKg = 60;
            const weightLbs = weightKg * 2.205;
            expect(weightLbs).toBe(132.3);
        });

        it('時速100km/hは秒速約27.78m/s', () => {
            const speedKmh = 100;
            const speedMs = (speedKmh * 1000) / 3600;
            expect(speedMs).toBeCloseTo(27.77777777777778, 10);
        });
    });

    describe('追加テスト：演算子の理解', () => {
        it('足し算の結合性：1 + 2 + 3 は 6', () => {
            expect(1 + 2 + 3).toBe(6);
        });

        it('掛け算の結合性：2 * 3 * 4 は 24', () => {
            expect(2 * 3 * 4).toBe(24);
        });

        it('混合演算：10 + 5 * 2 - 3 は 17', () => {
            expect(10 + 5 * 2 - 3).toBe(17);
        });

        it('括弧の入れ子：((2 + 3) * 4) / 5 は 4', () => {
            expect(((2 + 3) * 4) / 5).toBe(4);
        });

        it('余りの応用：100 % 7 は 2', () => {
            expect(100 % 7).toBe(2);
        });
    });

    describe('データ型の確認', () => {
        it('数字は number 型', () => {
            expect(typeof 42).toBe('number');
        });

        it('計算結果も number 型', () => {
            expect(typeof (10 + 20)).toBe('number');
        });

        it('文字列は string 型', () => {
            expect(typeof "42").toBe('string');
        });

        it('文字列連結の結果も string 型', () => {
            expect(typeof ("10" + "20")).toBe('string');
        });
    });

    describe('エッジケース', () => {
        it('0で割ると Infinity になる', () => {
            expect(10 / 0).toBe(Infinity);
        });

        it('0 * 任意の数は 0', () => {
            expect(0 * 100).toBe(0);
        });

        it('負の数同士の掛け算は正になる', () => {
            expect((-5) * (-3)).toBe(15);
        });

        it('負の数の余り：-10 % 3', () => {
            expect(-10 % 3).toBe(-1);
        });
    });
});
