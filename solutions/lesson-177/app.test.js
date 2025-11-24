/**
 * レッスン177: 天気情報アプリケーションのテスト
 */

import { describe, it, expect, beforeEach } from 'vitest';

describe('レッスン177: 天気情報アプリケーション', () => {

  // テスト用のアプリを作成
  function createWeatherApp() {
    const mockData = {
      tokyo: {
        cityName: '東京',
        current: {
          temperature: 22,
          condition: 'sunny',
          humidity: 65,
          windSpeed: 12,
          pressure: 1013,
          description: '晴れ'
        },
        forecast: [
          {
            date: '2024-01-15',
            dayOfWeek: '月',
            high: 24,
            low: 18,
            condition: 'sunny',
            description: '晴れ',
            precipitation: 0
          }
        ]
      },
      osaka: {
        cityName: '大阪',
        current: {
          temperature: 21,
          condition: 'cloudy',
          humidity: 70,
          windSpeed: 10,
          pressure: 1012,
          description: '曇り'
        },
        forecast: [
          {
            date: '2024-01-15',
            dayOfWeek: '月',
            high: 23,
            low: 17,
            condition: 'cloudy',
            description: '曇り',
            precipitation: 30
          }
        ]
      }
    };

    return {
      mockData: mockData,
      state: {
        currentCity: null,
        weatherData: null,
        unit: 'celsius',
        favorites: [],
        searchHistory: []
      },

      convertTemperature: function(celsius) {
        if (this.state.unit === 'celsius') {
          return celsius;
        } else {
          return (celsius * 9 / 5) + 32;
        }
      },

      toggleUnit: function() {
        if (this.state.unit === 'celsius') {
          this.state.unit = 'fahrenheit';
        } else {
          this.state.unit = 'celsius';
        }
      },

      getWeatherIcon: function(condition) {
        const icons = {
          'sunny': '☀️',
          'partly-cloudy': '⛅',
          'cloudy': '☁️',
          'rainy': '🌧️',
          'snowy': '❄️'
        };
        return icons[condition] || '🌤️';
      },

      formatDate: function(dateString) {
        const parts = dateString.split('-');
        return parts[1] + '/' + parts[2];
      },

      addToFavorites: function() {
        if (!this.state.currentCity) {
          return;
        }

        const cityKey = this.state.currentCity;
        let exists = false;
        for (let i = 0; i < this.state.favorites.length; i++) {
          if (this.state.favorites[i] === cityKey) {
            exists = true;
            break;
          }
        }

        if (!exists) {
          this.state.favorites.push(cityKey);
        }
      },

      removeFromFavorites: function(cityKey) {
        const newFavorites = [];
        for (let i = 0; i < this.state.favorites.length; i++) {
          if (this.state.favorites[i] !== cityKey) {
            newFavorites.push(this.state.favorites[i]);
          }
        }
        this.state.favorites = newFavorites;
      },

      addToHistory: function(cityName) {
        const newHistory = [];
        for (let i = 0; i < this.state.searchHistory.length; i++) {
          if (this.state.searchHistory[i] !== cityName) {
            newHistory.push(this.state.searchHistory[i]);
          }
        }

        newHistory.unshift(cityName);

        if (newHistory.length > 5) {
          newHistory.splice(5);
        }

        this.state.searchHistory = newHistory;
      }
    };
  }

  describe('温度変換', () => {
    it('摂氏のまま返す', () => {
      const app = createWeatherApp();
      app.state.unit = 'celsius';
      const result = app.convertTemperature(20);
      expect(result).toBe(20);
    });

    it('摂氏から華氏に変換', () => {
      const app = createWeatherApp();
      app.state.unit = 'fahrenheit';
      const result = app.convertTemperature(20);
      expect(result).toBe(68);
    });

    it('摂氏0度は華氏32度', () => {
      const app = createWeatherApp();
      app.state.unit = 'fahrenheit';
      const result = app.convertTemperature(0);
      expect(result).toBe(32);
    });

    it('摂氏100度は華氏212度', () => {
      const app = createWeatherApp();
      app.state.unit = 'fahrenheit';
      const result = app.convertTemperature(100);
      expect(result).toBe(212);
    });
  });

  describe('単位切り替え', () => {
    it('摂氏から華氏に切り替え', () => {
      const app = createWeatherApp();
      app.state.unit = 'celsius';
      app.toggleUnit();
      expect(app.state.unit).toBe('fahrenheit');
    });

    it('華氏から摂氏に切り替え', () => {
      const app = createWeatherApp();
      app.state.unit = 'fahrenheit';
      app.toggleUnit();
      expect(app.state.unit).toBe('celsius');
    });
  });

  describe('天気アイコン', () => {
    let app;
    beforeEach(() => {
      app = createWeatherApp();
    });

    it('晴れのアイコン', () => {
      const icon = app.getWeatherIcon('sunny');
      expect(icon).toBe('☀️');
    });

    it('曇りのアイコン', () => {
      const icon = app.getWeatherIcon('cloudy');
      expect(icon).toBe('☁️');
    });

    it('雨のアイコン', () => {
      const icon = app.getWeatherIcon('rainy');
      expect(icon).toBe('🌧️');
    });

    it('雪のアイコン', () => {
      const icon = app.getWeatherIcon('snowy');
      expect(icon).toBe('❄️');
    });

    it('晴れ時々曇りのアイコン', () => {
      const icon = app.getWeatherIcon('partly-cloudy');
      expect(icon).toBe('⛅');
    });

    it('不明な天気はデフォルトアイコン', () => {
      const icon = app.getWeatherIcon('unknown');
      expect(icon).toBe('🌤️');
    });
  });

  describe('日付フォーマット', () => {
    let app;
    beforeEach(() => {
      app = createWeatherApp();
    });

    it('YYYY-MM-DDをMM/DDに変換', () => {
      const formatted = app.formatDate('2024-01-15');
      expect(formatted).toBe('01/15');
    });

    it('別の日付', () => {
      const formatted = app.formatDate('2024-12-25');
      expect(formatted).toBe('12/25');
    });
  });

  describe('お気に入り管理', () => {
    let app;
    beforeEach(() => {
      app = createWeatherApp();
    });

    it('お気に入りに追加', () => {
      app.state.currentCity = 'tokyo';
      app.addToFavorites();
      expect(app.state.favorites.length).toBe(1);
      expect(app.state.favorites[0]).toBe('tokyo');
    });

    it('同じ都市は重複追加されない', () => {
      app.state.currentCity = 'tokyo';
      app.addToFavorites();
      app.addToFavorites();
      expect(app.state.favorites.length).toBe(1);
    });

    it('複数の都市を追加', () => {
      app.state.currentCity = 'tokyo';
      app.addToFavorites();
      app.state.currentCity = 'osaka';
      app.addToFavorites();
      expect(app.state.favorites.length).toBe(2);
    });

    it('お気に入りから削除', () => {
      app.state.favorites = ['tokyo', 'osaka'];
      app.removeFromFavorites('tokyo');
      expect(app.state.favorites.length).toBe(1);
      expect(app.state.favorites[0]).toBe('osaka');
    });

    it('存在しない都市を削除しても配列は変わらない', () => {
      app.state.favorites = ['tokyo', 'osaka'];
      app.removeFromFavorites('kyoto');
      expect(app.state.favorites.length).toBe(2);
    });
  });

  describe('検索履歴管理', () => {
    let app;
    beforeEach(() => {
      app = createWeatherApp();
    });

    it('検索履歴に追加', () => {
      app.addToHistory('東京');
      expect(app.state.searchHistory.length).toBe(1);
      expect(app.state.searchHistory[0]).toBe('東京');
    });

    it('同じ都市は最新に移動', () => {
      app.addToHistory('東京');
      app.addToHistory('大阪');
      app.addToHistory('東京');
      expect(app.state.searchHistory.length).toBe(2);
      expect(app.state.searchHistory[0]).toBe('東京');
      expect(app.state.searchHistory[1]).toBe('大阪');
    });

    it('履歴は5件まで', () => {
      app.addToHistory('東京');
      app.addToHistory('大阪');
      app.addToHistory('京都');
      app.addToHistory('札幌');
      app.addToHistory('福岡');
      app.addToHistory('名古屋');
      expect(app.state.searchHistory.length).toBe(5);
      expect(app.state.searchHistory[0]).toBe('名古屋');
    });

    it('最も古い履歴が削除される', () => {
      app.addToHistory('東京');
      app.addToHistory('大阪');
      app.addToHistory('京都');
      app.addToHistory('札幌');
      app.addToHistory('福岡');
      app.addToHistory('名古屋');
      expect(app.state.searchHistory.indexOf('東京')).toBe(-1);
    });
  });

  describe('状態管理', () => {
    it('初期状態', () => {
      const app = createWeatherApp();
      expect(app.state.currentCity).toBe(null);
      expect(app.state.weatherData).toBe(null);
      expect(app.state.unit).toBe('celsius');
      expect(app.state.favorites.length).toBe(0);
      expect(app.state.searchHistory.length).toBe(0);
    });

    it('天気データを設定', () => {
      const app = createWeatherApp();
      app.state.weatherData = app.mockData.tokyo;
      app.state.currentCity = 'tokyo';
      expect(app.state.weatherData.cityName).toBe('東京');
      expect(app.state.currentCity).toBe('tokyo');
    });
  });
});
