/**
 * レッスン177: 天気情報アプリケーション
 * 演習用テンプレート
 */

var weatherApp = {
  mockData: weatherData,  // weather-data.jsから読み込まれたデータ
  state: {
    currentCity: null,
    weatherData: null,
    unit: 'celsius',  // 'celsius' or 'fahrenheit'
    favorites: [],
    searchHistory: []
  },

  /**
   * 初期化処理
   */
  init: function() {
    // ヒント:
    // 1. localStorageからお気に入りと検索履歴を読み込む
    // 2. イベントリスナーを設定
    // 3. お気に入りリストを表示

    // ここにコードを書いてください
  },

  /**
   * 天気データを取得（モック）
   */
  fetchWeather: function(cityName) {
    // ヒント:
    // 1. ローディングを表示
    // 2. setTimeoutで1秒後に実行（API呼び出しをシミュレート）
    // 3. mockDataから都市のデータを取得
    // 4. データがあれば:
    //    - state.weatherDataに保存
    //    - state.currentCityに保存
    //    - ローディングを非表示
    //    - displayWeather()を呼び出す
    //    - 検索履歴に追加
    // 5. データがなければエラーを表示

    // ここにコードを書いてください
  },

  /**
   * 現在の天気を表示
   */
  displayWeather: function(data) {
    // ヒント:
    // 1. weather-sectionを表示
    // 2. 都市名を表示
    // 3. 現在の温度を表示（単位に応じて変換）
    // 4. 天気アイコンと説明を表示
    // 5. 湿度、風速、気圧を表示
    // 6. displayForecast()を呼び出す
    // 7. お気に入りボタンの状態を更新

    // ここにコードを書いてください
  },

  /**
   * 5日間の予報を表示
   */
  displayForecast: function(forecast) {
    // ヒント:
    // 1. forecast-listを取得
    // 2. forecast-listをクリア
    // 3. 各予報データに対して:
    //    - forecast-item要素を作成
    //    - 日付と曜日を表示
    //    - 天気アイコンを表示
    //    - 最高気温と最低気温を表示（単位に応じて変換）
    //    - 降水確率を表示
    //    - forecast-listに追加

    // ここにコードを書いてください
  },

  /**
   * 温度を変換
   */
  convertTemperature: function(celsius) {
    // ヒント:
    // 1. state.unitが'celsius'なら celsius を返す
    // 2. state.unitが'fahrenheit'なら華氏に変換して返す
    //    華氏 = (摂氏 × 9/5) + 32
    // 3. 小数点第1位まで表示

    // ここにコードを書いてください
  },

  /**
   * 単位を切り替え
   */
  toggleUnit: function() {
    // ヒント:
    // 1. state.unitを切り替え（celsius ⟷ fahrenheit）
    // 2. ボタンのテキストを更新
    // 3. 天気データがあれば再表示

    // ここにコードを書いてください
  },

  /**
   * 天気アイコンを取得
   */
  getWeatherIcon: function(condition) {
    // ヒント:
    // conditionに応じてアイコンを返す
    // sunny: ☀️
    // partly-cloudy: ⛅
    // cloudy: ☁️
    // rainy: 🌧️
    // snowy: ❄️
    // デフォルト: 🌤️

    // ここにコードを書いてください
  },

  /**
   * お気に入りに追加
   */
  addToFavorites: function() {
    // ヒント:
    // 1. currentCityがnullならリターン
    // 2. すでにお気に入りに含まれているかチェック
    // 3. 含まれていなければ追加
    // 4. localStorageに保存
    // 5. お気に入りリストを更新
    // 6. ボタンの状態を更新

    // ここにコードを書いてください
  },

  /**
   * お気に入りから削除
   */
  removeFromFavorites: function(cityKey) {
    // ヒント:
    // 1. favoritesから該当する都市を削除
    // 2. localStorageに保存
    // 3. お気に入りリストを更新
    // 4. 現在表示中の都市ならボタンの状態を更新

    // ここにコードを書いてください
  },

  /**
   * お気に入りリストを表示
   */
  displayFavorites: function() {
    // ヒント:
    // 1. favorites-listを取得
    // 2. お気に入りが空なら「お気に入りがありません」を表示
    // 3. お気に入りがあれば:
    //    - favorites-listをクリア
    //    - 各お気に入りに対して:
    //      - favorite-item要素を作成
    //      - 都市名と現在の温度を表示
    //      - 削除ボタンを追加
    //      - クリックで天気を表示
    //      - favorites-listに追加

    // ここにコードを書いてください
  },

  /**
   * 検索履歴に追加
   */
  addToHistory: function(cityName) {
    // ヒント:
    // 1. すでに履歴にあれば削除（重複を避ける）
    // 2. 配列の先頭に追加
    // 3. 5件を超えたら古いものを削除
    // 4. localStorageに保存
    // 5. 履歴を表示

    // ここにコードを書いてください
  },

  /**
   * 検索履歴を表示
   */
  displayHistory: function() {
    // ヒント:
    // 1. search-historyを取得
    // 2. 履歴が空なら非表示
    // 3. 履歴があれば:
    //    - search-historyを表示
    //    - history-listをクリア
    //    - 各履歴に対して:
    //      - history-item要素を作成
    //      - クリックで検索を実行
    //      - history-listに追加

    // ここにコードを書いてください
  },

  /**
   * 検索候補を表示
   */
  showSuggestions: function(query) {
    // ヒント:
    // 1. queryが空なら候補を非表示にしてリターン
    // 2. mockDataのキーから、queryを含む都市を検索
    // 3. 候補が見つかれば:
    //    - suggestionsを表示
    //    - suggestionsをクリア
    //    - 各候補に対して:
    //      - suggestion-item要素を作成
    //      - クリックで検索を実行
    //      - suggestionsに追加
    // 4. 候補がなければ非表示

    // ここにコードを書いてください
  },

  /**
   * 検索候補を非表示
   */
  hideSuggestions: function() {
    // ヒント:
    // suggestionsのstyle.displayを'none'に設定

    // ここにコードを書いてください
  },

  /**
   * ローディングを表示
   */
  showLoading: function() {
    // ヒント:
    // 1. loadingを表示
    // 2. weather-sectionとerrorを非表示

    // ここにコードを書いてください
  },

  /**
   * ローディングを非表示
   */
  hideLoading: function() {
    // ヒント:
    // loadingを非表示

    // ここにコードを書いてください
  },

  /**
   * エラーを表示
   */
  showError: function(message) {
    // ヒント:
    // 1. error-messageにメッセージを設定
    // 2. errorを表示
    // 3. weather-sectionを非表示

    // ここにコードを書いてください
  },

  /**
   * エラーを非表示
   */
  hideError: function() {
    // ヒント:
    // errorを非表示

    // ここにコードを書いてください
  },

  /**
   * localStorageから読み込み
   */
  loadFromStorage: function() {
    // ヒント:
    // 1. localStorage.getItem('weatherFavorites')を取得
    // 2. あればJSON.parseしてstate.favoritesに保存
    // 3. localStorage.getItem('weatherHistory')を取得
    // 4. あればJSON.parseしてstate.searchHistoryに保存

    // ここにコードを書いてください
  },

  /**
   * localStorageに保存
   */
  saveToStorage: function() {
    // ヒント:
    // 1. state.favoritesをJSON.stringifyしてlocalStorageに保存
    // 2. state.searchHistoryをJSON.stringifyしてlocalStorageに保存

    // ここにコードを書いてください
  },

  /**
   * イベントリスナーを設定
   */
  setupEventListeners: function() {
    var self = this;

    // 検索ボタン
    // ヒント: click イベントで fetchWeather() を呼び出す

    // ここにコードを書いてください

    // 検索フォームのEnterキー
    // ヒント: keypress イベントで Enter が押されたら検索

    // ここにコードを書いてください

    // 検索入力の変化
    // ヒント: input イベントで showSuggestions() を呼び出す

    // ここにコードを書いてください

    // 検索入力のフォーカスアウト
    // ヒント: blur イベントで少し遅延させて hideSuggestions() を呼び出す
    //         （クリックイベントが先に発火するように）

    // ここにコードを書いてください

    // 単位切り替えボタン
    // ヒント: click イベントで toggleUnit() を呼び出す

    // ここにコードを書いてください

    // お気に入りに追加ボタン
    // ヒント: click イベントで addToFavorites() を呼び出す

    // ここにコードを書いてください
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
