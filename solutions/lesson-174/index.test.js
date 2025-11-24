/**
 * レッスン174: 苦手分野の復習（総合演習編）
 * テスト
 */

import { describe, it, expect, beforeEach } from 'vitest';

describe('レッスン174: 総合演習', () => {

  // ========================================
  // 問題1: ユーザー管理システム
  // ========================================
  describe('問題1: createUserManager', () => {
    function createUserManager() {
      var users = [];
      var nextId = 1;

      return {
        addUser: function(user) {
          var newUser = {
            id: nextId++,
            name: user.name,
            age: user.age,
            role: user.role
          };
          users.push(newUser);
          return newUser;
        },

        removeUser: function(id) {
          for (var i = 0; i < users.length; i++) {
            if (users[i].id === id) {
              users.splice(i, 1);
              return true;
            }
          }
          return false;
        },

        findUserById: function(id) {
          for (var i = 0; i < users.length; i++) {
            if (users[i].id === id) {
              return users[i];
            }
          }
          return null;
        },

        findUsersByRole: function(role) {
          var result = [];
          for (var i = 0; i < users.length; i++) {
            if (users[i].role === role) {
              result.push(users[i]);
            }
          }
          return result;
        },

        getAllUsers: function() {
          return users.slice();
        }
      };
    }

    it('ユーザーを追加できる', () => {
      const manager = createUserManager();
      const user = manager.addUser({ name: '田中', age: 25, role: '開発者' });

      expect(user.id).toBe(1);
      expect(user.name).toBe('田中');
      expect(manager.getAllUsers().length).toBe(1);
    });

    it('IDは自動採番される', () => {
      const manager = createUserManager();
      const user1 = manager.addUser({ name: '田中', age: 25, role: '開発者' });
      const user2 = manager.addUser({ name: '佐藤', age: 30, role: 'デザイナー' });

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
    });

    it('ユーザーを削除できる', () => {
      const manager = createUserManager();
      manager.addUser({ name: '田中', age: 25, role: '開発者' });
      const result = manager.removeUser(1);

      expect(result).toBe(true);
      expect(manager.getAllUsers().length).toBe(0);
    });

    it('IDでユーザーを検索できる', () => {
      const manager = createUserManager();
      manager.addUser({ name: '田中', age: 25, role: '開発者' });
      const user = manager.findUserById(1);

      expect(user).not.toBeNull();
      expect(user.name).toBe('田中');
    });

    it('役職でユーザーを検索できる', () => {
      const manager = createUserManager();
      manager.addUser({ name: '田中', age: 25, role: '開発者' });
      manager.addUser({ name: '佐藤', age: 30, role: 'デザイナー' });
      manager.addUser({ name: '鈴木', age: 28, role: '開発者' });

      const developers = manager.findUsersByRole('開発者');
      expect(developers.length).toBe(2);
    });
  });

  // ========================================
  // 問題2: データのフィルタリングとソート
  // ========================================
  describe('問題2: filterAndSortProducts', () => {
    function filterAndSortProducts(products, filters, sortBy, sortOrder) {
      var result = products;

      if (filters.category) {
        result = result.filter(function(product) {
          return product.category === filters.category;
        });
      }

      if (filters.minPrice !== undefined) {
        result = result.filter(function(product) {
          return product.price >= filters.minPrice;
        });
      }

      if (filters.maxPrice !== undefined) {
        result = result.filter(function(product) {
          return product.price <= filters.maxPrice;
        });
      }

      result = result.slice();

      result.sort(function(a, b) {
        var aValue, bValue;

        if (sortBy === 'price') {
          aValue = a.price;
          bValue = b.price;
        } else if (sortBy === 'name') {
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
        } else if (sortBy === 'stock') {
          aValue = a.stock;
          bValue = b.stock;
        } else {
          return 0;
        }

        if (sortOrder === 'asc') {
          if (aValue < bValue) return -1;
          if (aValue > bValue) return 1;
          return 0;
        } else {
          if (aValue > bValue) return -1;
          if (aValue < bValue) return 1;
          return 0;
        }
      });

      return result;
    }

    const products = [
      { id: 1, name: 'ノートPC', category: '電子機器', price: 80000, stock: 5 },
      { id: 2, name: 'マウス', category: '電子機器', price: 2000, stock: 0 },
      { id: 3, name: 'デスク', category: '家具', price: 30000, stock: 3 }
    ];

    it('カテゴリでフィルタリングできる', () => {
      const result = filterAndSortProducts(products, { category: '電子機器' }, 'price', 'asc');
      expect(result.length).toBe(2);
      expect(result[0].name).toBe('マウス');
    });

    it('価格範囲でフィルタリングできる', () => {
      const result = filterAndSortProducts(products, { minPrice: 10000 }, 'price', 'asc');
      expect(result.length).toBe(2);
    });

    it('価格でソートできる', () => {
      const result = filterAndSortProducts(products, {}, 'price', 'asc');
      expect(result[0].price).toBe(2000);
      expect(result[2].price).toBe(80000);
    });
  });

  // ========================================
  // 問題3: フォームバリデーション
  // ========================================
  describe('問題3: validateRegistrationForm', () => {
    function validateRegistrationForm(formData) {
      var errors = [];

      if (!formData.username || formData.username.length < 3) {
        errors.push('ユーザー名は3文字以上である必要があります');
      } else if (formData.username.length > 20) {
        errors.push('ユーザー名は20文字以下である必要があります');
      }

      if (!formData.email) {
        errors.push('メールアドレスを入力してください');
      } else if (formData.email.indexOf('@') === -1 || formData.email.indexOf('.') === -1) {
        errors.push('有効なメールアドレスを入力してください');
      }

      if (!formData.password || formData.password.length < 8) {
        errors.push('パスワードは8文字以上である必要があります');
      } else {
        var hasLetter = false;
        var hasNumber = false;

        for (var i = 0; i < formData.password.length; i++) {
          var char = formData.password.charAt(i);
          if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            hasLetter = true;
          }
          if (char >= '0' && char <= '9') {
            hasNumber = true;
          }
        }

        if (!hasLetter) {
          errors.push('パスワードには英字を含める必要があります');
        }
        if (!hasNumber) {
          errors.push('パスワードには数字を含める必要があります');
        }
      }

      var age = parseInt(formData.age);
      if (isNaN(age)) {
        errors.push('有効な年齢を入力してください');
      } else if (age < 0 || age > 150) {
        errors.push('年齢は0から150の範囲で入力してください');
      }

      return {
        isValid: errors.length === 0,
        errors: errors
      };
    }

    it('有効なデータでバリデーションが通る', () => {
      const result = validateRegistrationForm({
        username: 'tanaka',
        email: 'test@example.com',
        password: 'password123',
        age: '25'
      });

      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('短いユーザー名でエラーが返る', () => {
      const result = validateRegistrationForm({
        username: 'ab',
        email: 'test@example.com',
        password: 'password123',
        age: '25'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('ユーザー名'))).toBe(true);
    });

    it('無効なメールでエラーが返る', () => {
      const result = validateRegistrationForm({
        username: 'tanaka',
        email: 'invalid-email',
        password: 'password123',
        age: '25'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('メールアドレス'))).toBe(true);
    });

    it('弱いパスワードでエラーが返る', () => {
      const result = validateRegistrationForm({
        username: 'tanaka',
        email: 'test@example.com',
        password: 'short',
        age: '25'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('パスワード'))).toBe(true);
    });
  });

  // ========================================
  // 問題4: データの集計
  // ========================================
  describe('問題4: calculateSalesStatistics', () => {
    function calculateSalesStatistics(sales) {
      if (sales.length === 0) {
        return {
          total: 0,
          average: 0,
          max: 0,
          min: 0,
          byCategory: {}
        };
      }

      var total = sales.reduce(function(sum, sale) {
        return sum + sale.amount;
      }, 0);

      var average = total / sales.length;

      var max = sales[0].amount;
      var min = sales[0].amount;

      for (var i = 1; i < sales.length; i++) {
        if (sales[i].amount > max) {
          max = sales[i].amount;
        }
        if (sales[i].amount < min) {
          min = sales[i].amount;
        }
      }

      var byCategory = {};
      for (var i = 0; i < sales.length; i++) {
        var category = sales[i].category;
        if (byCategory[category]) {
          byCategory[category] += sales[i].amount;
        } else {
          byCategory[category] = sales[i].amount;
        }
      }

      return {
        total: total,
        average: Math.round(average * 100) / 100,
        max: max,
        min: min,
        byCategory: byCategory
      };
    }

    const sales = [
      { date: '2024-01-01', amount: 10000, category: '食品' },
      { date: '2024-01-02', amount: 15000, category: '衣料' },
      { date: '2024-01-03', amount: 8000, category: '食品' }
    ];

    it('総売上を計算できる', () => {
      const stats = calculateSalesStatistics(sales);
      expect(stats.total).toBe(33000);
    });

    it('平均売上を計算できる', () => {
      const stats = calculateSalesStatistics(sales);
      expect(stats.average).toBe(11000);
    });

    it('最大・最小を見つけられる', () => {
      const stats = calculateSalesStatistics(sales);
      expect(stats.max).toBe(15000);
      expect(stats.min).toBe(8000);
    });

    it('カテゴリ別に集計できる', () => {
      const stats = calculateSalesStatistics(sales);
      expect(stats.byCategory['食品']).toBe(18000);
      expect(stats.byCategory['衣料']).toBe(15000);
    });
  });

  // ========================================
  // 問題5: 検索機能
  // ========================================
  describe('問題5: searchProducts', () => {
    function searchProducts(products, searchTerm, options) {
      var result = products;

      if (searchTerm) {
        var term = searchTerm.toLowerCase();
        result = result.filter(function(product) {
          var name = product.name.toLowerCase();
          var description = product.description.toLowerCase();
          return name.indexOf(term) !== -1 || description.indexOf(term) !== -1;
        });
      }

      if (options.category) {
        result = result.filter(function(product) {
          return product.category === options.category;
        });
      }

      if (options.minPrice !== undefined) {
        result = result.filter(function(product) {
          return product.price >= options.minPrice;
        });
      }

      if (options.maxPrice !== undefined) {
        result = result.filter(function(product) {
          return product.price <= options.maxPrice;
        });
      }

      return result;
    }

    const products = [
      { id: 1, name: 'ノートパソコン', description: '高性能PC', category: '電子機器', price: 80000 },
      { id: 2, name: 'デスクトップPC', description: 'デスク用PC', category: '電子機器', price: 120000 },
      { id: 3, name: '木製デスク', description: 'シンプルなデスク', category: '家具', price: 30000 }
    ];

    it('キーワードで検索できる', () => {
      const result = searchProducts(products, 'デスク', {});
      expect(result.length).toBe(2);
    });

    it('価格範囲で絞り込める', () => {
      const result = searchProducts(products, 'デスク', { maxPrice: 50000 });
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('木製デスク');
    });

    it('カテゴリで絞り込める', () => {
      const result = searchProducts(products, '', { category: '電子機器' });
      expect(result.length).toBe(2);
    });
  });

  // ========================================
  // チャレンジ1: ページネーション
  // ========================================
  describe('チャレンジ1: createPagination', () => {
    function createPagination(items, itemsPerPage) {
      var currentPage = 1;
      var totalPages = Math.ceil(items.length / itemsPerPage);

      return {
        getCurrentPage: function() {
          return currentPage;
        },

        getTotalPages: function() {
          return totalPages;
        },

        getPageItems: function() {
          var start = (currentPage - 1) * itemsPerPage;
          var end = start + itemsPerPage;
          return items.slice(start, end);
        },

        nextPage: function() {
          if (currentPage < totalPages) {
            currentPage++;
            return true;
          }
          return false;
        },

        prevPage: function() {
          if (currentPage > 1) {
            currentPage--;
            return true;
          }
          return false;
        },

        goToPage: function(page) {
          if (page >= 1 && page <= totalPages) {
            currentPage = page;
            return true;
          }
          return false;
        }
      };
    }

    it('正しいページのアイテムを返す', () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const pager = createPagination(items, 3);

      expect(pager.getPageItems()).toEqual([1, 2, 3]);
    });

    it('次のページに移動できる', () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const pager = createPagination(items, 3);

      pager.nextPage();
      expect(pager.getCurrentPage()).toBe(2);
      expect(pager.getPageItems()).toEqual([4, 5, 6]);
    });

    it('前のページに戻れる', () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const pager = createPagination(items, 3);

      pager.nextPage();
      pager.prevPage();
      expect(pager.getCurrentPage()).toBe(1);
    });

    it('指定ページに移動できる', () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const pager = createPagination(items, 3);

      pager.goToPage(3);
      expect(pager.getCurrentPage()).toBe(3);
      expect(pager.getPageItems()).toEqual([7, 8, 9]);
    });

    it('総ページ数を正しく計算する', () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const pager = createPagination(items, 3);

      expect(pager.getTotalPages()).toBe(4);
    });
  });

  // ========================================
  // チャレンジ2: データの正規化
  // ========================================
  describe('チャレンジ2: normalizeUserData', () => {
    function normalizeUserData(user) {
      var totalAmount = 0;
      for (var i = 0; i < user.orders.length; i++) {
        totalAmount += user.orders[i].total;
      }

      return {
        id: user.id,
        name: user.name,
        city: user.address.city,
        zip: user.address.zip,
        orderCount: user.orders.length,
        totalAmount: totalAmount
      };
    }

    it('ネストされたデータを平坦化する', () => {
      const user = {
        id: 1,
        name: '田中太郎',
        address: { city: '東京', zip: '100-0001' },
        orders: [
          { id: 1, total: 5000 },
          { id: 2, total: 3000 }
        ]
      };

      const normalized = normalizeUserData(user);

      expect(normalized.id).toBe(1);
      expect(normalized.city).toBe('東京');
      expect(normalized.zip).toBe('100-0001');
      expect(normalized.orderCount).toBe(2);
      expect(normalized.totalAmount).toBe(8000);
    });
  });

  // ========================================
  // チャレンジ3: カートシステム
  // ========================================
  describe('チャレンジ3: createShoppingCart', () => {
    function createShoppingCart() {
      var items = [];

      return {
        addItem: function(product, quantity) {
          var existingIndex = -1;
          for (var i = 0; i < items.length; i++) {
            if (items[i].product.id === product.id) {
              existingIndex = i;
              break;
            }
          }

          if (existingIndex !== -1) {
            items[existingIndex].quantity += quantity;
          } else {
            items.push({
              product: product,
              quantity: quantity
            });
          }
        },

        removeItem: function(productId) {
          for (var i = 0; i < items.length; i++) {
            if (items[i].product.id === productId) {
              items.splice(i, 1);
              return true;
            }
          }
          return false;
        },

        updateQuantity: function(productId, quantity) {
          for (var i = 0; i < items.length; i++) {
            if (items[i].product.id === productId) {
              if (quantity <= 0) {
                items.splice(i, 1);
              } else {
                items[i].quantity = quantity;
              }
              return true;
            }
          }
          return false;
        },

        getTotal: function() {
          var total = 0;
          for (var i = 0; i < items.length; i++) {
            total += items[i].product.price * items[i].quantity;
          }
          return total;
        },

        getItemCount: function() {
          var count = 0;
          for (var i = 0; i < items.length; i++) {
            count += items[i].quantity;
          }
          return count;
        },

        clear: function() {
          items = [];
        },

        getItems: function() {
          return items.slice();
        }
      };
    }

    it('商品を追加できる', () => {
      const cart = createShoppingCart();
      cart.addItem({ id: 1, name: 'リンゴ', price: 100 }, 3);

      expect(cart.getItems().length).toBe(1);
      expect(cart.getItemCount()).toBe(3);
    });

    it('合計金額を計算できる', () => {
      const cart = createShoppingCart();
      cart.addItem({ id: 1, name: 'リンゴ', price: 100 }, 3);
      cart.addItem({ id: 2, name: 'バナナ', price: 150 }, 2);

      expect(cart.getTotal()).toBe(600);
    });

    it('同じ商品は数量が加算される', () => {
      const cart = createShoppingCart();
      cart.addItem({ id: 1, name: 'リンゴ', price: 100 }, 3);
      cart.addItem({ id: 1, name: 'リンゴ', price: 100 }, 2);

      expect(cart.getItems().length).toBe(1);
      expect(cart.getItemCount()).toBe(5);
    });

    it('商品を削除できる', () => {
      const cart = createShoppingCart();
      cart.addItem({ id: 1, name: 'リンゴ', price: 100 }, 3);
      cart.removeItem(1);

      expect(cart.getItems().length).toBe(0);
    });

    it('カートをクリアできる', () => {
      const cart = createShoppingCart();
      cart.addItem({ id: 1, name: 'リンゴ', price: 100 }, 3);
      cart.clear();

      expect(cart.getItems().length).toBe(0);
    });
  });

  // ========================================
  // 高度な問題1: データマージ
  // ========================================
  describe('高度な問題1: mergeUsers', () => {
    function mergeUsers(users1, users2) {
      var userMap = {};

      for (var i = 0; i < users1.length; i++) {
        userMap[users1[i].id] = users1[i];
      }

      for (var i = 0; i < users2.length; i++) {
        userMap[users2[i].id] = users2[i];
      }

      var result = [];
      for (var id in userMap) {
        if (userMap.hasOwnProperty(id)) {
          result.push(userMap[id]);
        }
      }

      result.sort(function(a, b) {
        return a.id - b.id;
      });

      return result;
    }

    it('2つの配列をマージする', () => {
      const users1 = [
        { id: 1, name: '田中', age: 25 },
        { id: 2, name: '佐藤', age: 30 }
      ];
      const users2 = [
        { id: 2, name: '佐藤花子', age: 31 },
        { id: 3, name: '鈴木', age: 28 }
      ];

      const merged = mergeUsers(users1, users2);

      expect(merged.length).toBe(3);
      expect(merged[1].name).toBe('佐藤花子'); // users2で上書き
    });

    it('IDでソートされる', () => {
      const users1 = [{ id: 3, name: 'C' }];
      const users2 = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];

      const merged = mergeUsers(users1, users2);

      expect(merged[0].id).toBe(1);
      expect(merged[1].id).toBe(2);
      expect(merged[2].id).toBe(3);
    });
  });

  // ========================================
  // 高度な問題2: クエリビルダー
  // ========================================
  describe('高度な問題2: createQueryBuilder', () => {
    function createQueryBuilder(data) {
      var query = {
        data: data,
        selectedFields: null,
        whereClause: null,
        orderByField: null,
        orderByOrder: 'asc',
        limitCount: null
      };

      return {
        select: function() {
          query.selectedFields = Array.prototype.slice.call(arguments);
          return this;
        },

        where: function(predicate) {
          query.whereClause = predicate;
          return this;
        },

        orderBy: function(field, order) {
          query.orderByField = field;
          query.orderByOrder = order || 'asc';
          return this;
        },

        limit: function(count) {
          query.limitCount = count;
          return this;
        },

        execute: function() {
          var result = query.data.slice();

          if (query.whereClause) {
            result = result.filter(query.whereClause);
          }

          if (query.orderByField) {
            result.sort(function(a, b) {
              var aValue = a[query.orderByField];
              var bValue = b[query.orderByField];

              if (query.orderByOrder === 'asc') {
                if (aValue < bValue) return -1;
                if (aValue > bValue) return 1;
                return 0;
              } else {
                if (aValue > bValue) return -1;
                if (aValue < bValue) return 1;
                return 0;
              }
            });
          }

          if (query.limitCount) {
            result = result.slice(0, query.limitCount);
          }

          if (query.selectedFields) {
            result = result.map(function(item) {
              var selected = {};
              for (var i = 0; i < query.selectedFields.length; i++) {
                var field = query.selectedFields[i];
                selected[field] = item[field];
              }
              return selected;
            });
          }

          return result;
        }
      };
    }

    const data = [
      { id: 1, name: '田中', age: 25, role: '開発者' },
      { id: 2, name: '佐藤', age: 30, role: 'デザイナー' },
      { id: 3, name: '鈴木', age: 28, role: '開発者' }
    ];

    it('フィールドを選択できる', () => {
      const query = createQueryBuilder(data);
      const result = query.select('name', 'age').execute();

      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('age');
      expect(result[0]).not.toHaveProperty('role');
    });

    it('条件でフィルタリングできる', () => {
      const query = createQueryBuilder(data);
      const result = query.where(function(item) {
        return item.role === '開発者';
      }).execute();

      expect(result.length).toBe(2);
    });

    it('ソートできる', () => {
      const query = createQueryBuilder(data);
      const result = query.orderBy('age', 'desc').execute();

      expect(result[0].age).toBe(30);
    });

    it('件数を制限できる', () => {
      const query = createQueryBuilder(data);
      const result = query.limit(2).execute();

      expect(result.length).toBe(2);
    });

    it('メソッドチェーンで組み合わせられる', () => {
      const query = createQueryBuilder(data);
      const result = query
        .select('name', 'age')
        .where(function(item) { return item.age >= 25; })
        .orderBy('age', 'asc')
        .limit(2)
        .execute();

      expect(result.length).toBe(2);
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).not.toHaveProperty('role');
    });
  });
});
