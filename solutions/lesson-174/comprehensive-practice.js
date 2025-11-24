/**
 * レッスン174: 苦手分野の復習（総合演習編）
 * 解答例
 */

// ========================================
// 問題1: ユーザー管理システム
// ========================================

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
      return users.slice(); // コピーを返す
    }
  };
}

// 別解: filter を使用
function createUserManagerAlt() {
  var users = [];
  var nextId = 1;

  return {
    addUser: function(user) {
      var newUser = Object.assign({ id: nextId++ }, user);
      users.push(newUser);
      return newUser;
    },

    removeUser: function(id) {
      var initialLength = users.length;
      users = users.filter(function(user) {
        return user.id !== id;
      });
      return users.length < initialLength;
    },

    findUserById: function(id) {
      var found = users.filter(function(user) {
        return user.id === id;
      });
      return found.length > 0 ? found[0] : null;
    },

    findUsersByRole: function(role) {
      return users.filter(function(user) {
        return user.role === role;
      });
    },

    getAllUsers: function() {
      return users.slice();
    }
  };
}


// ========================================
// 問題2: データのフィルタリングとソート
// ========================================

function filterAndSortProducts(products, filters, sortBy, sortOrder) {
  var result = products;

  // フィルタリング
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

  if (filters.inStock !== undefined) {
    result = result.filter(function(product) {
      if (filters.inStock) {
        return product.stock > 0;
      } else {
        return product.stock === 0;
      }
    });
  }

  // ソート
  result = result.slice(); // コピーを作成

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


// ========================================
// 問題3: フォームバリデーション
// ========================================

function validateRegistrationForm(formData) {
  var errors = [];

  // ユーザー名のバリデーション
  if (!formData.username || formData.username.length < 3) {
    errors.push('ユーザー名は3文字以上である必要があります');
  } else if (formData.username.length > 20) {
    errors.push('ユーザー名は20文字以下である必要があります');
  }

  // メールアドレスのバリデーション
  if (!formData.email) {
    errors.push('メールアドレスを入力してください');
  } else if (formData.email.indexOf('@') === -1 || formData.email.indexOf('.') === -1) {
    errors.push('有効なメールアドレスを入力してください');
  }

  // パスワードのバリデーション
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

  // 年齢のバリデーション
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


// ========================================
// 問題4: データの集計
// ========================================

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

  // 合計
  var total = sales.reduce(function(sum, sale) {
    return sum + sale.amount;
  }, 0);

  // 平均
  var average = total / sales.length;

  // 最大・最小
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

  // カテゴリ別集計
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

// 別解: reduce を活用
function calculateSalesStatisticsAlt(sales) {
  if (sales.length === 0) {
    return {
      total: 0,
      average: 0,
      max: 0,
      min: 0,
      byCategory: {}
    };
  }

  var stats = sales.reduce(function(acc, sale) {
    acc.total += sale.amount;

    if (sale.amount > acc.max) {
      acc.max = sale.amount;
    }
    if (sale.amount < acc.min) {
      acc.min = sale.amount;
    }

    if (acc.byCategory[sale.category]) {
      acc.byCategory[sale.category] += sale.amount;
    } else {
      acc.byCategory[sale.category] = sale.amount;
    }

    return acc;
  }, {
    total: 0,
    max: sales[0].amount,
    min: sales[0].amount,
    byCategory: {}
  });

  stats.average = Math.round((stats.total / sales.length) * 100) / 100;

  return stats;
}


// ========================================
// 問題5: 検索機能
// ========================================

function searchProducts(products, searchTerm, options) {
  var result = products;

  // キーワード検索
  if (searchTerm) {
    var term = searchTerm.toLowerCase();
    result = result.filter(function(product) {
      var name = product.name.toLowerCase();
      var description = product.description.toLowerCase();
      return name.indexOf(term) !== -1 || description.indexOf(term) !== -1;
    });
  }

  // オプションでフィルタリング
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


// ========================================
// チャレンジ1: ページネーション
// ========================================

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


// ========================================
// チャレンジ2: データの正規化
// ========================================

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

// 別解: reduce を使用
function normalizeUserDataAlt(user) {
  var totalAmount = user.orders.reduce(function(sum, order) {
    return sum + order.total;
  }, 0);

  return {
    id: user.id,
    name: user.name,
    city: user.address.city,
    zip: user.address.zip,
    orderCount: user.orders.length,
    totalAmount: totalAmount
  };
}


// ========================================
// チャレンジ3: カートシステム
// ========================================

function createShoppingCart() {
  var items = [];

  return {
    addItem: function(product, quantity) {
      // 既存のアイテムを検索
      var existingIndex = -1;
      for (var i = 0; i < items.length; i++) {
        if (items[i].product.id === product.id) {
          existingIndex = i;
          break;
        }
      }

      if (existingIndex !== -1) {
        // 既存アイテムの数量を更新
        items[existingIndex].quantity += quantity;
      } else {
        // 新しいアイテムを追加
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
      return items.slice(); // コピーを返す
    }
  };
}


// ========================================
// 高度な問題1: データマージ
// ========================================

function mergeUsers(users1, users2) {
  var userMap = {};

  // users1 をマップに追加
  for (var i = 0; i < users1.length; i++) {
    userMap[users1[i].id] = users1[i];
  }

  // users2 でマップを更新（上書き）
  for (var i = 0; i < users2.length; i++) {
    userMap[users2[i].id] = users2[i];
  }

  // マップを配列に変換
  var result = [];
  for (var id in userMap) {
    if (userMap.hasOwnProperty(id)) {
      result.push(userMap[id]);
    }
  }

  // IDでソート
  result.sort(function(a, b) {
    return a.id - b.id;
  });

  return result;
}

// 別解: Object.assign を使用
function mergeUsersAlt(users1, users2) {
  var userMap = {};

  // すべてのユーザーをマップに追加
  var allUsers = users1.concat(users2);
  for (var i = 0; i < allUsers.length; i++) {
    var user = allUsers[i];
    if (userMap[user.id]) {
      // 既存のユーザーを更新
      userMap[user.id] = Object.assign({}, userMap[user.id], user);
    } else {
      userMap[user.id] = user;
    }
  }

  // 配列に変換してソート
  return Object.keys(userMap)
    .map(function(id) {
      return userMap[id];
    })
    .sort(function(a, b) {
      return a.id - b.id;
    });
}


// ========================================
// 高度な問題2: クエリビルダー
// ========================================

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

      // WHERE句の適用
      if (query.whereClause) {
        result = result.filter(query.whereClause);
      }

      // ORDER BY句の適用
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

      // LIMIT句の適用
      if (query.limitCount) {
        result = result.slice(0, query.limitCount);
      }

      // SELECT句の適用
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


// エクスポート（テスト用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createUserManager: createUserManager,
    filterAndSortProducts: filterAndSortProducts,
    validateRegistrationForm: validateRegistrationForm,
    calculateSalesStatistics: calculateSalesStatistics,
    searchProducts: searchProducts,
    createPagination: createPagination,
    normalizeUserData: normalizeUserData,
    createShoppingCart: createShoppingCart,
    mergeUsers: mergeUsers,
    createQueryBuilder: createQueryBuilder
  };
}
