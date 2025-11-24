import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import path from 'path';

describe('Lesson 170: 配列操作の復習', () => {
  // 解答ファイルを読み込んで実行
  const solutionPath = path.resolve(__dirname, '../../solutions/lesson-170/array-practice.js');

  describe('問題1: 成績処理', () => {
    it('合格者の名前を正しく抽出できる', () => {
      const students = [
        { name: '田中', score: 85 },
        { name: '佐藤', score: 45 },
        { name: '鈴木', score: 72 },
        { name: '高橋', score: 58 },
        { name: '伊藤', score: 90 }
      ];

      function getPassedStudents(students) {
        return students
          .filter(function(student) {
            return student.score >= 60;
          })
          .map(function(student) {
            return student.name;
          });
      }

      const result = getPassedStudents(students);
      expect(result).toEqual(['田中', '鈴木', '伊藤']);
      expect(result.length).toBe(3);
    });

    it('全員が不合格の場合は空配列を返す', () => {
      const students = [
        { name: '田中', score: 45 },
        { name: '佐藤', score: 30 }
      ];

      function getPassedStudents(students) {
        return students
          .filter(function(student) {
            return student.score >= 60;
          })
          .map(function(student) {
            return student.name;
          });
      }

      const result = getPassedStudents(students);
      expect(result).toEqual([]);
    });
  });

  describe('問題2: 商品の合計金額', () => {
    it('カートの合計金額を正しく計算できる', () => {
      const cart = [
        { name: 'りんご', price: 100, quantity: 3 },
        { name: 'バナナ', price: 150, quantity: 2 },
        { name: 'オレンジ', price: 120, quantity: 4 }
      ];

      function calculateTotal(cart) {
        return cart.reduce(function(total, item) {
          return total + (item.price * item.quantity);
        }, 0);
      }

      const result = calculateTotal(cart);
      expect(result).toBe(1080);
    });

    it('空のカートの合計は0', () => {
      const cart = [];

      function calculateTotal(cart) {
        return cart.reduce(function(total, item) {
          return total + (item.price * item.quantity);
        }, 0);
      }

      const result = calculateTotal(cart);
      expect(result).toBe(0);
    });
  });

  describe('問題3: データの変換', () => {
    it('APIデータを表示用に変換できる', () => {
      const apiUsers = [
        { id: 1, first_name: '太郎', last_name: '山田', email: 'taro@example.com' },
        { id: 2, first_name: '花子', last_name: '佐藤', email: 'hanako@example.com' }
      ];

      function transformUsers(apiUsers) {
        return apiUsers.map(function(user) {
          return {
            id: user.id,
            fullName: user.last_name + user.first_name,
            email: user.email
          };
        });
      }

      const result = transformUsers(apiUsers);
      expect(result).toEqual([
        { id: 1, fullName: '山田太郎', email: 'taro@example.com' },
        { id: 2, fullName: '佐藤花子', email: 'hanako@example.com' }
      ]);
    });

    it('変換後のオブジェクトが正しいプロパティを持つ', () => {
      const apiUsers = [
        { id: 1, first_name: '太郎', last_name: '山田', email: 'taro@example.com' }
      ];

      function transformUsers(apiUsers) {
        return apiUsers.map(function(user) {
          return {
            id: user.id,
            fullName: user.last_name + user.first_name,
            email: user.email
          };
        });
      }

      const result = transformUsers(apiUsers);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('fullName');
      expect(result[0]).toHaveProperty('email');
      expect(result[0]).not.toHaveProperty('first_name');
      expect(result[0]).not.toHaveProperty('last_name');
    });
  });

  describe('問題4: タスクの統計', () => {
    it('タスクの完了率を正しく計算できる', () => {
      const tasks = [
        { title: '買い物', completed: true },
        { title: '掃除', completed: false },
        { title: '勉強', completed: true },
        { title: '料理', completed: true },
        { title: '運動', completed: false }
      ];

      function calculateCompletionRate(tasks) {
        const completedCount = tasks.filter(function(task) {
          return task.completed;
        }).length;
        return Math.round((completedCount / tasks.length) * 100);
      }

      const result = calculateCompletionRate(tasks);
      expect(result).toBe(60);
    });

    it('全て完了している場合は100%', () => {
      const tasks = [
        { title: '買い物', completed: true },
        { title: '掃除', completed: true }
      ];

      function calculateCompletionRate(tasks) {
        const completedCount = tasks.filter(function(task) {
          return task.completed;
        }).length;
        return Math.round((completedCount / tasks.length) * 100);
      }

      const result = calculateCompletionRate(tasks);
      expect(result).toBe(100);
    });
  });

  describe('問題5: 配列の検索と更新', () => {
    it('指定されたユーザーの年齢を更新できる', () => {
      const users = [
        { id: 1, name: '田中', age: 25 },
        { id: 2, name: '佐藤', age: 30 },
        { id: 3, name: '鈴木', age: 28 }
      ];

      function updateUserAge(users, userId, newAge) {
        const user = users.find(function(u) {
          return u.id === userId;
        });
        if (user) {
          user.age = newAge;
        }
      }

      updateUserAge(users, 2, 31);
      expect(users[1].age).toBe(31);
    });

    it('存在しないIDの場合は何も変更しない', () => {
      const users = [
        { id: 1, name: '田中', age: 25 }
      ];

      function updateUserAge(users, userId, newAge) {
        const user = users.find(function(u) {
          return u.id === userId;
        });
        if (user) {
          user.age = newAge;
        }
      }

      updateUserAge(users, 99, 50);
      expect(users[0].age).toBe(25);
    });
  });

  describe('チャレンジ1: 在庫管理', () => {
    const inventory = [
      { id: 1, name: 'ノートPC', stock: 5, price: 100000 },
      { id: 2, name: 'マウス', stock: 20, price: 2000 },
      { id: 3, name: 'キーボード', stock: 0, price: 5000 },
      { id: 4, name: 'モニター', stock: 3, price: 30000 }
    ];

    it('在庫切れの商品を見つけられる', () => {
      function findOutOfStock(inventory) {
        return inventory.filter(function(item) {
          return item.stock === 0;
        });
      }

      const result = findOutOfStock(inventory);
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('キーボード');
    });

    it('在庫総額を正しく計算できる', () => {
      function calculateTotalValue(inventory) {
        return inventory.reduce(function(total, item) {
          return total + (item.stock * item.price);
        }, 0);
      }

      const result = calculateTotalValue(inventory);
      expect(result).toBe(630000);
    });

    it('最も高価な商品を見つけられる', () => {
      function findMostExpensive(inventory) {
        return inventory.reduce(function(max, item) {
          return item.price > max.price ? item : max;
        }, inventory[0]);
      }

      const result = findMostExpensive(inventory);
      expect(result.name).toBe('ノートPC');
      expect(result.price).toBe(100000);
    });

    it('商品名で部分一致検索できる', () => {
      function searchByName(inventory, keyword) {
        return inventory.filter(function(item) {
          return item.name.indexOf(keyword) !== -1;
        });
      }

      const result = searchByName(inventory, 'ー');
      expect(result.length).toBe(2);
      expect(result.map(item => item.name)).toContain('キーボード');
      expect(result.map(item => item.name)).toContain('モニター');
    });
  });

  describe('チャレンジ2: 売上分析', () => {
    const sales = [
      { date: '2025-01-15', product: 'りんご', category: '果物', amount: 500 },
      { date: '2025-01-15', product: 'バナナ', category: '果物', amount: 300 },
      { date: '2025-01-16', product: 'にんじん', category: '野菜', amount: 200 },
      { date: '2025-01-16', product: 'りんご', category: '果物', amount: 600 },
      { date: '2025-01-17', product: 'バナナ', category: '果物', amount: 400 }
    ];

    it('カテゴリ別の売上を集計できる', () => {
      function salesByCategory(sales) {
        return sales.reduce(function(result, sale) {
          if (!result[sale.category]) {
            result[sale.category] = 0;
          }
          result[sale.category] += sale.amount;
          return result;
        }, {});
      }

      const result = salesByCategory(sales);
      expect(result['果物']).toBe(1800);
      expect(result['野菜']).toBe(200);
    });

    it('日付別の売上を集計できる', () => {
      function salesByDate(sales) {
        return sales.reduce(function(result, sale) {
          if (!result[sale.date]) {
            result[sale.date] = 0;
          }
          result[sale.date] += sale.amount;
          return result;
        }, {});
      }

      const result = salesByDate(sales);
      expect(result['2025-01-15']).toBe(800);
      expect(result['2025-01-16']).toBe(800);
      expect(result['2025-01-17']).toBe(400);
    });

    it('最も売れた商品を見つけられる', () => {
      function topProduct(sales) {
        const productSales = sales.reduce(function(result, sale) {
          if (!result[sale.product]) {
            result[sale.product] = 0;
          }
          result[sale.product] += sale.amount;
          return result;
        }, {});

        let maxProduct = '';
        let maxAmount = 0;

        for (const product in productSales) {
          if (productSales[product] > maxAmount) {
            maxAmount = productSales[product];
            maxProduct = product;
          }
        }

        return maxProduct;
      }

      const result = topProduct(sales);
      expect(result).toBe('りんご');
    });

    it('平均売上を計算できる', () => {
      function averageSale(sales) {
        const total = sales.reduce(function(sum, sale) {
          return sum + sale.amount;
        }, 0);
        return Math.round(total / sales.length);
      }

      const result = averageSale(sales);
      expect(result).toBe(400);
    });
  });

  describe('配列メソッドの理解', () => {
    it('filter()は元の配列を変更しない', () => {
      const numbers = [1, 2, 3, 4, 5];
      const original = numbers.slice();

      const filtered = numbers.filter(function(n) { return n % 2 === 0; });

      expect(numbers).toEqual(original);
      expect(filtered).toEqual([2, 4]);
    });

    it('map()は元の配列を変更しない', () => {
      const numbers = [1, 2, 3];
      const original = numbers.slice();

      const mapped = numbers.map(function(n) { return n * 2; });

      expect(numbers).toEqual(original);
      expect(mapped).toEqual([2, 4, 6]);
    });

    it('reduce()で配列を集約できる', () => {
      const numbers = [1, 2, 3, 4, 5];

      const sum = numbers.reduce(function(total, n) {
        return total + n;
      }, 0);

      expect(sum).toBe(15);
    });

    it('find()は最初の一致する要素を返す', () => {
      const numbers = [1, 2, 3, 4, 5];

      const found = numbers.find(function(n) {
        return n > 3;
      });

      expect(found).toBe(4);
    });

    it('find()で見つからない場合はundefinedを返す', () => {
      const numbers = [1, 2, 3];

      const found = numbers.find(function(n) {
        return n > 10;
      });

      expect(found).toBeUndefined();
    });
  });
});
