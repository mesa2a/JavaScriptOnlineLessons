/**
 * クイズデータ
 */

var quizData = [
  {
    id: 1,
    category: 'JavaScript基礎',
    question: 'JavaScriptで変数を宣言するキーワードはどれですか？',
    options: ['var', 'int', 'string', 'char'],
    correctAnswer: 0,
    explanation: 'JavaScriptではvar、let、constを使って変数を宣言します。'
  },
  {
    id: 2,
    category: 'JavaScript基礎',
    question: '配列の長さを取得するプロパティはどれですか？',
    options: ['size', 'length', 'count', 'total'],
    correctAnswer: 1,
    explanation: '配列のlengthプロパティで要素数を取得できます。'
  },
  {
    id: 3,
    category: 'データ型',
    question: 'JavaScriptで文字列を表すデータ型はどれですか？',
    options: ['string', 'text', 'char', 'varchar'],
    correctAnswer: 0,
    explanation: 'JavaScriptの文字列型はstringです。'
  },
  {
    id: 4,
    category: 'データ型',
    question: '数値かどうかを判定する関数はどれですか？',
    options: ['isNumber()', 'isNaN()', 'checkNumber()', 'validateNumber()'],
    correctAnswer: 1,
    explanation: 'isNaN()は「Not a Number」かどうかを判定します。'
  },
  {
    id: 5,
    category: '配列メソッド',
    question: '配列の末尾に要素を追加するメソッドはどれですか？',
    options: ['add()', 'append()', 'push()', 'insert()'],
    correctAnswer: 2,
    explanation: 'push()メソッドで配列の末尾に要素を追加できます。'
  },
  {
    id: 6,
    category: '配列メソッド',
    question: '配列の要素をフィルタリングするメソッドはどれですか？',
    options: ['select()', 'filter()', 'find()', 'search()'],
    correctAnswer: 1,
    explanation: 'filter()メソッドで条件に合う要素だけを抽出できます。'
  },
  {
    id: 7,
    category: 'DOM操作',
    question: 'IDで要素を取得するメソッドはどれですか？',
    options: ['getElement()', 'getElementById()', 'findById()', 'selectById()'],
    correctAnswer: 1,
    explanation: 'getElementById()でID属性から要素を取得できます。'
  },
  {
    id: 8,
    category: 'DOM操作',
    question: '要素のテキスト内容を設定するプロパティはどれですか？',
    options: ['text', 'textContent', 'innerText', 'content'],
    correctAnswer: 1,
    explanation: 'textContentプロパティでテキストを設定/取得できます。'
  },
  {
    id: 9,
    category: 'イベント',
    question: 'クリックイベントを設定するメソッドはどれですか？',
    options: ['onClick()', 'addListener()', 'addEventListener()', 'setEvent()'],
    correctAnswer: 2,
    explanation: 'addEventListener()でイベントリスナーを登録します。'
  },
  {
    id: 10,
    category: 'イベント',
    question: 'フォーム送信のデフォルト動作を防ぐメソッドはどれですか？',
    options: ['stopSubmit()', 'preventDefault()', 'cancel()', 'stop()'],
    correctAnswer: 1,
    explanation: 'preventDefault()でブラウザのデフォルト動作を防げます。'
  }
];
