# レッスン177: 応用課題 - 天気情報アプリケーション

## このレッスンの目標

天気情報を表示するアプリケーションを作成し、データの取得、表示、検索機能などを実装して実践的なスキルを身につける。

## 学習内容

### 1. プロジェクト概要

#### 1-1. 機能要件

天気情報アプリケーションに以下の機能を実装します：

**必須機能:**
- 都市の検索
- 現在の天気情報の表示
- 5日間の天気予報の表示
- お気に入り都市の保存
- ローディング表示

**追加機能:**
- 天気アイコンの表示
- 温度の単位切り替え（℃/℉）
- 詳細情報の表示（湿度、風速など）
- 最近検索した都市の履歴

#### 1-2. データ構造

天気データの構造：

```javascript
var weatherData = {
  city: '東京',
  country: 'JP',
  current: {
    temp: 25.5,           // 気温（℃）
    feelsLike: 27.2,      // 体感温度
    humidity: 65,         // 湿度（%）
    pressure: 1013,       // 気圧（hPa）
    windSpeed: 3.5,       // 風速（m/s）
    description: '晴れ',   // 天気の説明
    icon: 'sunny'         // 天気アイコン
  },
  forecast: [            // 5日間の予報
    {
      date: '2024-12-26',
      temp: { max: 28, min: 20 },
      description: '晴れ',
      icon: 'sunny'
    }
    // ... more days
  ]
};
```

### 2. 実装の設計

#### 2-1. アプリケーションの構造

```javascript
var weatherApp = {
  // モックデータ（実際のAPIの代わり）
  mockData: weatherMockData,

  // 状態管理
  state: {
    currentCity: null,
    weatherData: null,
    favorites: [],
    searchHistory: [],
    unit: 'celsius',  // celsius or fahrenheit
    isLoading: false
  },

  // 初期化
  init: function() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.displayFavorites();
  },

  // 天気データを取得（モック）
  fetchWeather: function(cityName) {
    // 実装
  },

  // 天気情報を表示
  displayWeather: function(data) {
    // 実装
  },

  // お気に入りに追加
  addToFavorites: function(city) {
    // 実装
  },

  // 検索履歴に追加
  addToHistory: function(city) {
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
  <title>天気情報アプリ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>🌤️ 天気情報</h1>
      <div class="header-actions">
        <button id="unit-toggle" class="btn btn-secondary">℉</button>
      </div>
    </header>

    <!-- 検索セクション -->
    <section class="search-section">
      <form id="search-form">
        <input
          type="text"
          id="city-input"
          placeholder="都市名を入力..."
          required
        >
        <button type="submit" class="btn btn-primary">検索</button>
      </form>

      <!-- 検索候補 -->
      <div id="search-suggestions" class="suggestions">
        <!-- 候補がここに表示される -->
      </div>
    </section>

    <!-- お気に入り都市 -->
    <section class="favorites-section">
      <h3>お気に入り</h3>
      <div id="favorites-list" class="favorites-list">
        <!-- お気に入りがここに表示される -->
      </div>
    </section>

    <!-- ローディング -->
    <div id="loading" class="loading" style="display: none;">
      <div class="spinner"></div>
      <p>読み込み中...</p>
    </div>

    <!-- 天気情報 -->
    <div id="weather-display" class="weather-display" style="display: none;">
      <!-- 現在の天気 -->
      <div class="current-weather">
        <div class="city-info">
          <h2 id="city-name">東京</h2>
          <button id="favorite-btn" class="favorite-btn">
            <span class="star">☆</span>
          </button>
        </div>

        <div class="weather-main">
          <div class="weather-icon" id="weather-icon">☀️</div>
          <div class="temperature">
            <span id="current-temp" class="temp-value">25</span>
            <span class="temp-unit">°C</span>
          </div>
        </div>

        <div class="weather-description" id="weather-description">
          晴れ
        </div>

        <div class="weather-details">
          <div class="detail-item">
            <span class="detail-label">体感温度</span>
            <span id="feels-like">27°C</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">湿度</span>
            <span id="humidity">65%</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">風速</span>
            <span id="wind-speed">3.5 m/s</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">気圧</span>
            <span id="pressure">1013 hPa</span>
          </div>
        </div>
      </div>

      <!-- 5日間の予報 -->
      <div class="forecast-section">
        <h3>5日間の予報</h3>
        <div id="forecast-list" class="forecast-list">
          <!-- 予報がここに表示される -->
        </div>
      </div>
    </div>

    <!-- エラーメッセージ -->
    <div id="error-message" class="error-message" style="display: none;">
      <p id="error-text"></p>
    </div>
  </div>

  <script src="weather-data.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

### 3. 主要な実装パターン

#### 3-1. モックデータの取得

```javascript
fetchWeather: function(cityName) {
  var self = this;

  // ローディング表示
  this.showLoading();

  // 非同期処理をシミュレート
  setTimeout(function() {
    // モックデータから都市を検索
    var cityData = self.mockData[cityName.toLowerCase()];

    if (cityData) {
      self.state.currentCity = cityName;
      self.state.weatherData = cityData;
      self.hideLoading();
      self.displayWeather(cityData);
      self.addToHistory(cityName);
      self.hideError();
    } else {
      self.hideLoading();
      self.showError('都市が見つかりませんでした。');
    }
  }, 1000); // 1秒の遅延でAPIをシミュレート
}
```

#### 3-2. 天気情報の表示

```javascript
displayWeather: function(data) {
  // 表示領域を表示
  document.getElementById('weather-display').style.display = 'block';

  // 都市名
  document.getElementById('city-name').textContent =
    data.city + ', ' + data.country;

  // 現在の天気
  var current = data.current;

  // 温度を変換（必要に応じて）
  var temp = this.convertTemperature(current.temp);
  var feelsLike = this.convertTemperature(current.feelsLike);

  document.getElementById('current-temp').textContent = Math.round(temp);
  document.getElementById('weather-description').textContent = current.description;
  document.getElementById('weather-icon').textContent = this.getWeatherIcon(current.icon);

  // 詳細情報
  document.getElementById('feels-like').textContent =
    Math.round(feelsLike) + '°' + (this.state.unit === 'celsius' ? 'C' : 'F');
  document.getElementById('humidity').textContent = current.humidity + '%';
  document.getElementById('wind-speed').textContent = current.windSpeed + ' m/s';
  document.getElementById('pressure').textContent = current.pressure + ' hPa';

  // お気に入りボタンの状態を更新
  this.updateFavoriteButton(data.city);

  // 5日間の予報を表示
  this.displayForecast(data.forecast);
}
```

#### 3-3. 5日間の予報の表示

```javascript
displayForecast: function(forecast) {
  var forecastList = document.getElementById('forecast-list');
  forecastList.innerHTML = '';

  for (var i = 0; i < forecast.length; i++) {
    var day = forecast[i];

    var forecastItem = document.createElement('div');
    forecastItem.className = 'forecast-item';

    // 日付
    var date = new Date(day.date);
    var dateStr = this.formatDate(date);

    var dateElement = document.createElement('div');
    dateElement.className = 'forecast-date';
    dateElement.textContent = dateStr;

    // アイコン
    var iconElement = document.createElement('div');
    iconElement.className = 'forecast-icon';
    iconElement.textContent = this.getWeatherIcon(day.icon);

    // 説明
    var descElement = document.createElement('div');
    descElement.className = 'forecast-description';
    descElement.textContent = day.description;

    // 温度
    var maxTemp = this.convertTemperature(day.temp.max);
    var minTemp = this.convertTemperature(day.temp.min);

    var tempElement = document.createElement('div');
    tempElement.className = 'forecast-temp';
    tempElement.textContent =
      Math.round(maxTemp) + '° / ' + Math.round(minTemp) + '°';

    forecastItem.appendChild(dateElement);
    forecastItem.appendChild(iconElement);
    forecastItem.appendChild(descElement);
    forecastItem.appendChild(tempElement);

    forecastList.appendChild(forecastItem);
  }
}
```

#### 3-4. 温度の単位変換

```javascript
convertTemperature: function(celsius) {
  if (this.state.unit === 'fahrenheit') {
    return (celsius * 9/5) + 32;
  }
  return celsius;
},

toggleUnit: function() {
  // 単位を切り替え
  this.state.unit = this.state.unit === 'celsius' ? 'fahrenheit' : 'celsius';

  // ボタンのテキストを更新
  var btn = document.getElementById('unit-toggle');
  btn.textContent = this.state.unit === 'celsius' ? '℉' : '℃';

  // 天気情報を再表示
  if (this.state.weatherData) {
    this.displayWeather(this.state.weatherData);
  }

  // お気に入りも更新
  this.displayFavorites();
}
```

#### 3-5. お気に入り機能

```javascript
addToFavorites: function(city) {
  // すでにお気に入りに登録されているか確認
  var index = this.state.favorites.indexOf(city);

  if (index === -1) {
    // 追加
    this.state.favorites.push(city);
  } else {
    // 削除
    this.state.favorites.splice(index, 1);
  }

  // ストレージに保存
  this.saveToStorage();

  // 表示を更新
  this.displayFavorites();
  this.updateFavoriteButton(city);
},

displayFavorites: function() {
  var favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = '';

  if (this.state.favorites.length === 0) {
    favoritesList.innerHTML = '<p class="empty-message">お気に入りがありません</p>';
    return;
  }

  for (var i = 0; i < this.state.favorites.length; i++) {
    var city = this.state.favorites[i];
    var cityData = this.mockData[city.toLowerCase()];

    if (cityData) {
      var favoriteItem = document.createElement('div');
      favoriteItem.className = 'favorite-item';

      var cityName = document.createElement('span');
      cityName.className = 'favorite-city';
      cityName.textContent = city;

      // 温度を表示
      var temp = this.convertTemperature(cityData.current.temp);
      var tempSpan = document.createElement('span');
      tempSpan.className = 'favorite-temp';
      tempSpan.textContent = Math.round(temp) + '°';

      // 天気アイコン
      var icon = document.createElement('span');
      icon.className = 'favorite-icon';
      icon.textContent = this.getWeatherIcon(cityData.current.icon);

      favoriteItem.appendChild(cityName);
      favoriteItem.appendChild(icon);
      favoriteItem.appendChild(tempSpan);

      // クリックイベント
      favoriteItem.addEventListener('click', (function(cityName) {
        return function() {
          document.getElementById('city-input').value = cityName;
          weatherApp.fetchWeather(cityName);
        };
      })(city));

      favoritesList.appendChild(favoriteItem);
    }
  }
},

updateFavoriteButton: function(city) {
  var btn = document.getElementById('favorite-btn');
  var star = btn.querySelector('.star');

  var isFavorite = this.state.favorites.indexOf(city) !== -1;
  star.textContent = isFavorite ? '★' : '☆';
}
```

#### 3-6. 検索履歴

```javascript
addToHistory: function(city) {
  // 既存の履歴から削除（重複を避ける）
  var index = this.state.searchHistory.indexOf(city);
  if (index !== -1) {
    this.state.searchHistory.splice(index, 1);
  }

  // 先頭に追加
  this.state.searchHistory.unshift(city);

  // 最大5件まで保持
  if (this.state.searchHistory.length > 5) {
    this.state.searchHistory.pop();
  }

  this.saveToStorage();
}
```

#### 3-7. 検索候補の表示

```javascript
showSuggestions: function(input) {
  var suggestions = document.getElementById('search-suggestions');

  if (input.length === 0) {
    suggestions.style.display = 'none';
    return;
  }

  // モックデータから候補を検索
  var matches = [];
  for (var city in this.mockData) {
    if (city.indexOf(input.toLowerCase()) === 0) {
      matches.push(this.mockData[city].city);
    }
  }

  if (matches.length === 0) {
    suggestions.style.display = 'none';
    return;
  }

  // 候補を表示
  suggestions.innerHTML = '';
  suggestions.style.display = 'block';

  for (var i = 0; i < Math.min(matches.length, 5); i++) {
    var item = document.createElement('div');
    item.className = 'suggestion-item';
    item.textContent = matches[i];

    item.addEventListener('click', (function(city) {
      return function() {
        document.getElementById('city-input').value = city;
        weatherApp.fetchWeather(city);
        suggestions.style.display = 'none';
      };
    })(matches[i]));

    suggestions.appendChild(item);
  }
}
```

#### 3-8. 天気アイコンの取得

```javascript
getWeatherIcon: function(iconCode) {
  var icons = {
    'sunny': '☀️',
    'cloudy': '☁️',
    'partly-cloudy': '⛅',
    'rainy': '🌧️',
    'stormy': '⛈️',
    'snowy': '❄️',
    'foggy': '🌫️',
    'windy': '💨'
  };

  return icons[iconCode] || '🌤️';
}
```

#### 3-9. 日付のフォーマット

```javascript
formatDate: function(date) {
  var days = ['日', '月', '火', '水', '木', '金', '土'];
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var dayOfWeek = days[date.getDay()];

  return month + '/' + day + ' (' + dayOfWeek + ')';
}
```

#### 3-10. ローディング表示

```javascript
showLoading: function() {
  this.state.isLoading = true;
  document.getElementById('loading').style.display = 'block';
  document.getElementById('weather-display').style.display = 'none';
  document.getElementById('error-message').style.display = 'none';
},

hideLoading: function() {
  this.state.isLoading = false;
  document.getElementById('loading').style.display = 'none';
}
```

#### 3-11. エラー表示

```javascript
showError: function(message) {
  var errorDiv = document.getElementById('error-message');
  var errorText = document.getElementById('error-text');

  errorText.textContent = message;
  errorDiv.style.display = 'block';
  document.getElementById('weather-display').style.display = 'none';
},

hideError: function() {
  document.getElementById('error-message').style.display = 'none';
}
```

#### 3-12. ローカルストレージ

```javascript
saveToStorage: function() {
  try {
    var data = {
      favorites: this.state.favorites,
      searchHistory: this.state.searchHistory,
      unit: this.state.unit
    };
    localStorage.setItem('weatherApp', JSON.stringify(data));
  } catch (e) {
    console.error('保存に失敗しました:', e);
  }
},

loadFromStorage: function() {
  try {
    var data = localStorage.getItem('weatherApp');
    if (data) {
      var parsed = JSON.parse(data);
      this.state.favorites = parsed.favorites || [];
      this.state.searchHistory = parsed.searchHistory || [];
      this.state.unit = parsed.unit || 'celsius';
    }
  } catch (e) {
    console.error('読み込みに失敗しました:', e);
  }
}
```

### 4. スタイリングのポイント

```css
/* ローディングスピナー */
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 天気アイコンのアニメーション */
.weather-icon {
  font-size: 80px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* お気に入りボタンのホバーエフェクト */
.favorite-btn:hover .star {
  transform: scale(1.2);
  color: #ffd700;
}
```

## まとめ

このレッスンでは、天気情報アプリケーションを作成しました：

1. **モックデータ**: APIの代わりにモックデータを使用
2. **非同期処理**: setTimeoutで非同期処理をシミュレート
3. **データの表示**: 現在の天気と5日間の予報
4. **検索機能**: 都市の検索と候補表示
5. **お気に入り**: 都市の保存と管理
6. **単位変換**: 摂氏と華氏の切り替え
7. **ローディング**: 非同期処理中の表示

次のレッスンでは、さらに複雑な応用課題に取り組みます。

## 演習

演習ファイルで実際に天気情報アプリケーションを実装してみましょう。
