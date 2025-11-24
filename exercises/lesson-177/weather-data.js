/**
 * レッスン177: 天気情報アプリケーション
 * 天気データ（モックデータ）
 */

var weatherData = {
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
      },
      {
        date: '2024-01-16',
        dayOfWeek: '火',
        high: 23,
        low: 17,
        condition: 'cloudy',
        description: '曇り',
        precipitation: 10
      },
      {
        date: '2024-01-17',
        dayOfWeek: '水',
        high: 20,
        low: 15,
        condition: 'rainy',
        description: '雨',
        precipitation: 80
      },
      {
        date: '2024-01-18',
        dayOfWeek: '木',
        high: 19,
        low: 14,
        condition: 'rainy',
        description: '雨',
        precipitation: 70
      },
      {
        date: '2024-01-19',
        dayOfWeek: '金',
        high: 22,
        low: 16,
        condition: 'partly-cloudy',
        description: '晴れ時々曇り',
        precipitation: 20
      }
    ]
  },
  osaka: {
    cityName: '大阪',
    current: {
      temperature: 21,
      condition: 'partly-cloudy',
      humidity: 70,
      windSpeed: 10,
      pressure: 1012,
      description: '晴れ時々曇り'
    },
    forecast: [
      {
        date: '2024-01-15',
        dayOfWeek: '月',
        high: 23,
        low: 17,
        condition: 'partly-cloudy',
        description: '晴れ時々曇り',
        precipitation: 20
      },
      {
        date: '2024-01-16',
        dayOfWeek: '火',
        high: 22,
        low: 16,
        condition: 'cloudy',
        description: '曇り',
        precipitation: 30
      },
      {
        date: '2024-01-17',
        dayOfWeek: '水',
        high: 21,
        low: 15,
        condition: 'rainy',
        description: '雨',
        precipitation: 75
      },
      {
        date: '2024-01-18',
        dayOfWeek: '木',
        high: 20,
        low: 14,
        condition: 'rainy',
        description: '雨',
        precipitation: 65
      },
      {
        date: '2024-01-19',
        dayOfWeek: '金',
        high: 23,
        low: 17,
        condition: 'cloudy',
        description: '曇り',
        precipitation: 25
      }
    ]
  },
  kyoto: {
    cityName: '京都',
    current: {
      temperature: 20,
      condition: 'cloudy',
      humidity: 72,
      windSpeed: 8,
      pressure: 1011,
      description: '曇り'
    },
    forecast: [
      {
        date: '2024-01-15',
        dayOfWeek: '月',
        high: 22,
        low: 16,
        condition: 'cloudy',
        description: '曇り',
        precipitation: 30
      },
      {
        date: '2024-01-16',
        dayOfWeek: '火',
        high: 21,
        low: 15,
        condition: 'cloudy',
        description: '曇り',
        precipitation: 35
      },
      {
        date: '2024-01-17',
        dayOfWeek: '水',
        high: 19,
        low: 14,
        condition: 'rainy',
        description: '雨',
        precipitation: 85
      },
      {
        date: '2024-01-18',
        dayOfWeek: '木',
        high: 18,
        low: 13,
        condition: 'rainy',
        description: '雨',
        precipitation: 75
      },
      {
        date: '2024-01-19',
        dayOfWeek: '金',
        high: 21,
        low: 15,
        condition: 'partly-cloudy',
        description: '晴れ時々曇り',
        precipitation: 20
      }
    ]
  },
  sapporo: {
    cityName: '札幌',
    current: {
      temperature: 8,
      condition: 'snowy',
      humidity: 85,
      windSpeed: 15,
      pressure: 1010,
      description: '雪'
    },
    forecast: [
      {
        date: '2024-01-15',
        dayOfWeek: '月',
        high: 10,
        low: 2,
        condition: 'snowy',
        description: '雪',
        precipitation: 90
      },
      {
        date: '2024-01-16',
        dayOfWeek: '火',
        high: 9,
        low: 1,
        condition: 'snowy',
        description: '雪',
        precipitation: 85
      },
      {
        date: '2024-01-17',
        dayOfWeek: '水',
        high: 7,
        low: 0,
        condition: 'snowy',
        description: '雪',
        precipitation: 95
      },
      {
        date: '2024-01-18',
        dayOfWeek: '木',
        high: 8,
        low: -1,
        condition: 'snowy',
        description: '雪',
        precipitation: 80
      },
      {
        date: '2024-01-19',
        dayOfWeek: '金',
        high: 10,
        low: 2,
        condition: 'cloudy',
        description: '曇り',
        precipitation: 40
      }
    ]
  },
  fukuoka: {
    cityName: '福岡',
    current: {
      temperature: 23,
      condition: 'sunny',
      humidity: 68,
      windSpeed: 11,
      pressure: 1014,
      description: '晴れ'
    },
    forecast: [
      {
        date: '2024-01-15',
        dayOfWeek: '月',
        high: 25,
        low: 19,
        condition: 'sunny',
        description: '晴れ',
        precipitation: 0
      },
      {
        date: '2024-01-16',
        dayOfWeek: '火',
        high: 24,
        low: 18,
        condition: 'sunny',
        description: '晴れ',
        precipitation: 5
      },
      {
        date: '2024-01-17',
        dayOfWeek: '水',
        high: 23,
        low: 17,
        condition: 'partly-cloudy',
        description: '晴れ時々曇り',
        precipitation: 15
      },
      {
        date: '2024-01-18',
        dayOfWeek: '木',
        high: 22,
        low: 16,
        condition: 'cloudy',
        description: '曇り',
        precipitation: 30
      },
      {
        date: '2024-01-19',
        dayOfWeek: '金',
        high: 24,
        low: 18,
        condition: 'sunny',
        description: '晴れ',
        precipitation: 10
      }
    ]
  },
  nagoya: {
    cityName: '名古屋',
    current: {
      temperature: 21,
      condition: 'sunny',
      humidity: 67,
      windSpeed: 9,
      pressure: 1012,
      description: '晴れ'
    },
    forecast: [
      {
        date: '2024-01-15',
        dayOfWeek: '月',
        high: 23,
        low: 17,
        condition: 'sunny',
        description: '晴れ',
        precipitation: 5
      },
      {
        date: '2024-01-16',
        dayOfWeek: '火',
        high: 22,
        low: 16,
        condition: 'partly-cloudy',
        description: '晴れ時々曇り',
        precipitation: 15
      },
      {
        date: '2024-01-17',
        dayOfWeek: '水',
        high: 20,
        low: 14,
        condition: 'cloudy',
        description: '曇り',
        precipitation: 40
      },
      {
        date: '2024-01-18',
        dayOfWeek: '木',
        high: 19,
        low: 13,
        condition: 'rainy',
        description: '雨',
        precipitation: 70
      },
      {
        date: '2024-01-19',
        dayOfWeek: '金',
        high: 22,
        low: 16,
        condition: 'partly-cloudy',
        description: '晴れ時々曇り',
        precipitation: 20
      }
    ]
  },
  sendai: {
    cityName: '仙台',
    current: {
      temperature: 18,
      condition: 'partly-cloudy',
      humidity: 73,
      windSpeed: 13,
      pressure: 1011,
      description: '晴れ時々曇り'
    },
    forecast: [
      {
        date: '2024-01-15',
        dayOfWeek: '月',
        high: 20,
        low: 14,
        condition: 'partly-cloudy',
        description: '晴れ時々曇り',
        precipitation: 20
      },
      {
        date: '2024-01-16',
        dayOfWeek: '火',
        high: 19,
        low: 13,
        condition: 'cloudy',
        description: '曇り',
        precipitation: 35
      },
      {
        date: '2024-01-17',
        dayOfWeek: '水',
        high: 17,
        low: 11,
        condition: 'rainy',
        description: '雨',
        precipitation: 80
      },
      {
        date: '2024-01-18',
        dayOfWeek: '木',
        high: 16,
        low: 10,
        condition: 'rainy',
        description: '雨',
        precipitation: 75
      },
      {
        date: '2024-01-19',
        dayOfWeek: '金',
        high: 19,
        low: 13,
        condition: 'cloudy',
        description: '曇り',
        precipitation: 30
      }
    ]
  },
  hiroshima: {
    cityName: '広島',
    current: {
      temperature: 22,
      condition: 'sunny',
      humidity: 66,
      windSpeed: 10,
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
        precipitation: 5
      },
      {
        date: '2024-01-16',
        dayOfWeek: '火',
        high: 23,
        low: 17,
        condition: 'sunny',
        description: '晴れ',
        precipitation: 10
      },
      {
        date: '2024-01-17',
        dayOfWeek: '水',
        high: 22,
        low: 16,
        condition: 'partly-cloudy',
        description: '晴れ時々曇り',
        precipitation: 20
      },
      {
        date: '2024-01-18',
        dayOfWeek: '木',
        high: 21,
        low: 15,
        condition: 'cloudy',
        description: '曇り',
        precipitation: 35
      },
      {
        date: '2024-01-19',
        dayOfWeek: '金',
        high: 23,
        low: 17,
        condition: 'sunny',
        description: '晴れ',
        precipitation: 10
      }
    ]
  }
};
