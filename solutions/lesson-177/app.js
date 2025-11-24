/**
 * レッスン177: 天気情報アプリケーション
 * 完全な実装
 */

var weatherApp = {
  mockData: weatherData,
  state: {
    currentCity: null,
    weatherData: null,
    unit: 'celsius',
    favorites: [],
    searchHistory: []
  },

  init: function() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.displayFavorites();
    this.displayHistory();
  },

  fetchWeather: function(cityName) {
    var self = this;
    this.showLoading();
    this.hideError();

    // API呼び出しをシミュレート（1秒後に結果を返す）
    setTimeout(function() {
      var cityKey = cityName.toLowerCase().trim();
      var cityData = self.mockData[cityKey];

      if (cityData) {
        self.state.weatherData = cityData;
        self.state.currentCity = cityKey;
        self.hideLoading();
        self.displayWeather(cityData);
        self.addToHistory(cityData.cityName);
      } else {
        self.hideLoading();
        self.showError('都市が見つかりませんでした。他の都市名で試してください。');
      }
    }, 1000);
  },

  displayWeather: function(data) {
    // 天気セクションを表示
    document.getElementById('weather-section').style.display = 'block';

    // 都市名を表示
    document.getElementById('city-name').textContent = data.cityName;

    // 現在の温度を表示
    var temp = this.convertTemperature(data.current.temperature);
    document.getElementById('temperature').textContent = Math.round(temp);
    document.getElementById('unit').textContent = this.state.unit === 'celsius' ? '°C' : '°F';

    // 天気アイコンと説明を表示
    document.getElementById('weather-icon').textContent = this.getWeatherIcon(data.current.condition);
    document.getElementById('weather-description').textContent = data.current.description;

    // 詳細情報を表示
    document.getElementById('humidity').textContent = data.current.humidity + '%';
    document.getElementById('wind-speed').textContent = data.current.windSpeed + ' m/s';
    document.getElementById('pressure').textContent = data.current.pressure + ' hPa';

    // 5日間の予報を表示
    this.displayForecast(data.forecast);

    // お気に入りボタンの状態を更新
    this.updateFavoriteButton();
  },

  displayForecast: function(forecast) {
    var forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = '';

    for (var i = 0; i < forecast.length; i++) {
      var day = forecast[i];

      var item = document.createElement('div');
      item.className = 'forecast-item';

      // 日付
      var dateSpan = document.createElement('div');
      dateSpan.className = 'forecast-date';
      dateSpan.textContent = this.formatDate(day.date);
      item.appendChild(dateSpan);

      // 曜日
      var daySpan = document.createElement('div');
      daySpan.className = 'forecast-day';
      daySpan.textContent = day.dayOfWeek + '曜日';
      item.appendChild(daySpan);

      // 天気アイコン
      var icon = document.createElement('div');
      icon.className = 'forecast-icon';
      icon.textContent = this.getWeatherIcon(day.condition);
      item.appendChild(icon);

      // 気温
      var temps = document.createElement('div');
      temps.className = 'forecast-temps';

      var high = document.createElement('span');
      high.className = 'forecast-high';
      high.textContent = Math.round(this.convertTemperature(day.high)) + '°';
      temps.appendChild(high);

      var low = document.createElement('span');
      low.className = 'forecast-low';
      low.textContent = Math.round(this.convertTemperature(day.low)) + '°';
      temps.appendChild(low);

      item.appendChild(temps);

      // 降水確率
      var precip = document.createElement('div');
      precip.className = 'forecast-precipitation';
      precip.textContent = '💧 ' + day.precipitation + '%';
      item.appendChild(precip);

      forecastList.appendChild(item);
    }
  },

  convertTemperature: function(celsius) {
    if (this.state.unit === 'celsius') {
      return celsius;
    } else {
      // 華氏に変換
      return (celsius * 9 / 5) + 32;
    }
  },

  toggleUnit: function() {
    // 単位を切り替え
    if (this.state.unit === 'celsius') {
      this.state.unit = 'fahrenheit';
      document.getElementById('unit-toggle-btn').textContent = '°C';
    } else {
      this.state.unit = 'celsius';
      document.getElementById('unit-toggle-btn').textContent = '°F';
    }

    // 天気データがあれば再表示
    if (this.state.weatherData) {
      this.displayWeather(this.state.weatherData);
    }

    // お気に入りも再表示
    this.displayFavorites();
  },

  getWeatherIcon: function(condition) {
    var icons = {
      'sunny': '☀️',
      'partly-cloudy': '⛅',
      'cloudy': '☁️',
      'rainy': '🌧️',
      'snowy': '❄️'
    };
    return icons[condition] || '🌤️';
  },

  formatDate: function(dateString) {
    // YYYY-MM-DD から MM/DD に変換
    var parts = dateString.split('-');
    return parts[1] + '/' + parts[2];
  },

  addToFavorites: function() {
    if (!this.state.currentCity) {
      return;
    }

    var cityKey = this.state.currentCity;

    // すでにお気に入りに含まれているかチェック
    var exists = false;
    for (var i = 0; i < this.state.favorites.length; i++) {
      if (this.state.favorites[i] === cityKey) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      this.state.favorites.push(cityKey);
      this.saveToStorage();
      this.displayFavorites();
      this.updateFavoriteButton();
    }
  },

  removeFromFavorites: function(cityKey) {
    // お気に入りから削除
    var newFavorites = [];
    for (var i = 0; i < this.state.favorites.length; i++) {
      if (this.state.favorites[i] !== cityKey) {
        newFavorites.push(this.state.favorites[i]);
      }
    }
    this.state.favorites = newFavorites;

    this.saveToStorage();
    this.displayFavorites();

    // 現在表示中の都市ならボタンを更新
    if (this.state.currentCity === cityKey) {
      this.updateFavoriteButton();
    }
  },

  updateFavoriteButton: function() {
    var button = document.getElementById('add-favorite-btn');
    var isFavorite = false;

    for (var i = 0; i < this.state.favorites.length; i++) {
      if (this.state.favorites[i] === this.state.currentCity) {
        isFavorite = true;
        break;
      }
    }

    if (isFavorite) {
      button.textContent = '⭐ お気に入り済み';
      button.classList.add('added');
    } else {
      button.textContent = '⭐ お気に入りに追加';
      button.classList.remove('added');
    }
  },

  displayFavorites: function() {
    var favoritesList = document.getElementById('favorites-list');

    if (this.state.favorites.length === 0) {
      favoritesList.innerHTML = '<p class="empty-message">お気に入りの都市がありません</p>';
      return;
    }

    favoritesList.innerHTML = '';

    for (var i = 0; i < this.state.favorites.length; i++) {
      var cityKey = this.state.favorites[i];
      var cityData = this.mockData[cityKey];

      if (!cityData) {
        continue;
      }

      var item = document.createElement('div');
      item.className = 'favorite-item';

      var cityDiv = document.createElement('div');
      cityDiv.className = 'city';
      cityDiv.textContent = cityData.cityName;
      item.appendChild(cityDiv);

      var tempDiv = document.createElement('div');
      tempDiv.className = 'temp';
      var temp = this.convertTemperature(cityData.current.temperature);
      tempDiv.textContent = Math.round(temp) + '°';
      item.appendChild(tempDiv);

      var icon = document.createElement('div');
      icon.textContent = this.getWeatherIcon(cityData.current.condition);
      item.appendChild(icon);

      // 削除ボタン
      var removeBtn = document.createElement('button');
      removeBtn.className = 'remove-btn';
      removeBtn.textContent = '×';
      removeBtn.setAttribute('data-city', cityKey);
      item.appendChild(removeBtn);

      // クリックで天気を表示
      (function(self, key) {
        item.addEventListener('click', function(e) {
          if (!e.target.classList.contains('remove-btn')) {
            self.fetchWeather(key);
          }
        });
      })(this, cityKey);

      favoritesList.appendChild(item);
    }
  },

  addToHistory: function(cityName) {
    // すでに履歴にあれば削除（重複を避ける）
    var newHistory = [];
    for (var i = 0; i < this.state.searchHistory.length; i++) {
      if (this.state.searchHistory[i] !== cityName) {
        newHistory.push(this.state.searchHistory[i]);
      }
    }

    // 配列の先頭に追加
    newHistory.unshift(cityName);

    // 5件を超えたら古いものを削除
    if (newHistory.length > 5) {
      newHistory = newHistory.slice(0, 5);
    }

    this.state.searchHistory = newHistory;
    this.saveToStorage();
    this.displayHistory();
  },

  displayHistory: function() {
    var historySection = document.getElementById('search-history');
    var historyList = document.getElementById('history-list');

    if (this.state.searchHistory.length === 0) {
      historySection.style.display = 'none';
      return;
    }

    historySection.style.display = 'block';
    historyList.innerHTML = '';

    for (var i = 0; i < this.state.searchHistory.length; i++) {
      var cityName = this.state.searchHistory[i];

      var item = document.createElement('span');
      item.className = 'history-item';
      item.textContent = cityName;

      (function(self, name) {
        item.addEventListener('click', function() {
          document.getElementById('search-input').value = name;
          self.fetchWeather(name);
        });
      })(this, cityName);

      historyList.appendChild(item);
    }
  },

  showSuggestions: function(query) {
    if (!query || query.trim() === '') {
      this.hideSuggestions();
      return;
    }

    var suggestions = document.getElementById('suggestions');
    var queryLower = query.toLowerCase();
    var matches = [];

    // mockDataのキーから候補を検索
    for (var key in this.mockData) {
      if (this.mockData.hasOwnProperty(key)) {
        var cityName = this.mockData[key].cityName;
        if (cityName.indexOf(query) !== -1 || key.indexOf(queryLower) !== -1) {
          matches.push({ key: key, name: cityName });
        }
      }
    }

    if (matches.length > 0) {
      suggestions.innerHTML = '';
      suggestions.style.display = 'block';

      for (var i = 0; i < matches.length; i++) {
        var match = matches[i];
        var item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = match.name;

        (function(self, name) {
          item.addEventListener('click', function() {
            document.getElementById('search-input').value = name;
            self.fetchWeather(name);
            self.hideSuggestions();
          });
        })(this, match.name);

        suggestions.appendChild(item);
      }
    } else {
      this.hideSuggestions();
    }
  },

  hideSuggestions: function() {
    document.getElementById('suggestions').style.display = 'none';
  },

  showLoading: function() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weather-section').style.display = 'none';
    document.getElementById('error').style.display = 'none';
  },

  hideLoading: function() {
    document.getElementById('loading').style.display = 'none';
  },

  showError: function(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error').style.display = 'block';
    document.getElementById('weather-section').style.display = 'none';
  },

  hideError: function() {
    document.getElementById('error').style.display = 'none';
  },

  loadFromStorage: function() {
    var favoritesJson = localStorage.getItem('weatherFavorites');
    if (favoritesJson) {
      try {
        this.state.favorites = JSON.parse(favoritesJson);
      } catch (e) {
        this.state.favorites = [];
      }
    }

    var historyJson = localStorage.getItem('weatherHistory');
    if (historyJson) {
      try {
        this.state.searchHistory = JSON.parse(historyJson);
      } catch (e) {
        this.state.searchHistory = [];
      }
    }
  },

  saveToStorage: function() {
    localStorage.setItem('weatherFavorites', JSON.stringify(this.state.favorites));
    localStorage.setItem('weatherHistory', JSON.stringify(this.state.searchHistory));
  },

  setupEventListeners: function() {
    var self = this;

    // 検索ボタン
    document.getElementById('search-btn').addEventListener('click', function() {
      var query = document.getElementById('search-input').value;
      if (query.trim()) {
        self.fetchWeather(query);
      }
    });

    // 検索フォームのEnterキー
    document.getElementById('search-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        var query = e.target.value;
        if (query.trim()) {
          self.fetchWeather(query);
        }
      }
    });

    // 検索入力の変化
    document.getElementById('search-input').addEventListener('input', function(e) {
      self.showSuggestions(e.target.value);
    });

    // 検索入力のフォーカスアウト
    document.getElementById('search-input').addEventListener('blur', function() {
      // 少し遅延させてクリックイベントが先に発火するように
      setTimeout(function() {
        self.hideSuggestions();
      }, 200);
    });

    // 単位切り替えボタン
    document.getElementById('unit-toggle-btn').addEventListener('click', function() {
      self.toggleUnit();
    });

    // お気に入りに追加ボタン
    document.getElementById('add-favorite-btn').addEventListener('click', function() {
      self.addToFavorites();
    });

    // お気に入りリストの削除ボタン（イベント委譲）
    document.getElementById('favorites-list').addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-btn')) {
        var cityKey = e.target.getAttribute('data-city');
        self.removeFromFavorites(cityKey);
        e.stopPropagation();
      }
    });
  }
};

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', function() {
  weatherApp.init();
});

// テスト用にエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = weatherApp;
}
