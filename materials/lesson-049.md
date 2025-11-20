# レッスン49: 週のプロジェクト - 性格診断アプリ

## このレッスンで学ぶこと

これまでに学んだ条件分岐の知識を総動員して、実践的な性格診断アプリを作成します。複数の質問に答えて、結果を判定するプログラムです。

## 学習内容の復習

このプロジェクトでは、レッスン44-48で学んだ以下の内容を使います:

- **AND演算子(&&)**: 複数の条件をすべて満たすかチェック
- **OR演算子(||)**: 複数の条件のどれかを満たすかチェック
- **NOT演算子(!)**: 条件を反転させる
- **複雑な条件**: 括弧を使った優先順位の制御
- **三項演算子**: 簡潔な条件式

## プロジェクト概要

### 作成するもの

性格診断アプリを作成します。3つの質問に答えて、性格タイプを判定します。

### 質問内容

1. 外出が好きですか? (isOutgoing)
2. 計画的ですか? (isPlanner)
3. 新しいことに挑戦しますか? (isAdventurous)

### 判定ロジック

以下のロジックで性格タイプを判定します:

```javascript
// 判定ロジック
if (isOutgoing && isPlanner && isAdventurous) {
  // 3つすべて: リーダータイプ
} else if (isOutgoing && isAdventurous) {
  // 外向的で冒険好き: 冒険家タイプ
} else if (isPlanner && !isOutgoing) {
  // 計画的で内向的: 思索家タイプ
} else if (isOutgoing) {
  // 外向的: 社交家タイプ
} else {
  // その他: 平和主義者タイプ
}
```

## 実装手順

### ステップ1: HTMLを作成

必要な要素:
- id="isOutgoing" のチェックボックス(外出が好き)
- id="isPlanner" のチェックボックス(計画的)
- id="isAdventurous" のチェックボックス(冒険好き)
- id="result" の結果表示エリア
- 診断ボタン

### ステップ2: 関数を作成

`diagnose()` 関数を作成します:

1. 3つのチェックボックスの状態を取得
2. 条件分岐で性格タイプを判定
3. 結果を表示

### ステップ3: 結果を表示

各タイプの特徴も表示すると良いです:

```javascript
result.textContent = "あなたは【リーダータイプ】です\n" +
                     "特徴: 行動力があり、計画的に物事を進められます。";
```

## 完成例

以下は実装の参考例です:

```javascript
function diagnose() {
  const isOutgoing = document.getElementById("isOutgoing").checked;
  const isPlanner = document.getElementById("isPlanner").checked;
  const isAdventurous = document.getElementById("isAdventurous").checked;
  const result = document.getElementById("result");

  let type = "";
  let description = "";

  if (isOutgoing && isPlanner && isAdventurous) {
    type = "リーダータイプ";
    description = "行動力があり、計画的に物事を進められます。";
  } else if (isOutgoing && isAdventurous) {
    type = "冒険家タイプ";
    description = "新しいことに挑戦する勇気があります。";
  } else if (isPlanner && !isOutgoing) {
    type = "思索家タイプ";
    description = "じっくり考えて行動する慎重派です。";
  } else if (isOutgoing) {
    type = "社交家タイプ";
    description = "人と関わることが得意です。";
  } else {
    type = "平和主義者タイプ";
    description = "穏やかで調和を大切にします。";
  }

  result.textContent = "あなたは【" + type + "】です\n" + description;
}
```

## 発展課題

基本実装ができたら、以下の機能を追加してみましょう:

### 1. 質問を増やす

4つ目、5つ目の質問を追加して、より詳細な診断にします。

例:
- 感情表現が豊かですか?
- ルールを重視しますか?

### 2. ポイント制にする

各質問にポイントを付けて、合計点で判定します。

```javascript
let score = 0;
if (isOutgoing) score = score + 2;
if (isPlanner) score = score + 2;
if (isAdventurous) score = score + 2;

if (score >= 5) {
  type = "アクティブタイプ";
} else if (score >= 3) {
  type = "バランスタイプ";
} else {
  type = "落ち着きタイプ";
}
```

### 3. リセット機能

診断結果をクリアして、もう一度診断できるようにします。

```javascript
function reset() {
  document.getElementById("isOutgoing").checked = false;
  document.getElementById("isPlanner").checked = false;
  document.getElementById("isAdventurous").checked = false;
  document.getElementById("result").textContent = "";
}
```

### 4. 三項演算子を使う

一部の判定を三項演算子で簡潔に書いてみましょう。

```javascript
let energyLevel = isOutgoing ? "高い" : "低い";
let style = isPlanner ? "計画的" : "自由奔放";
```

### 5. 結果の色分け

タイプによって表示色を変えます。

```javascript
if (type === "リーダータイプ") {
  result.style.color = "gold";
} else if (type === "冒険家タイプ") {
  result.style.color = "orange";
} else {
  result.style.color = "blue";
}
```

## 論理演算子の活用ポイント

### AND演算子(&&)の使用例

```javascript
// 3つすべてを満たす
if (isOutgoing && isPlanner && isAdventurous) {
  // リーダータイプ
}

// 2つを満たす
if (isOutgoing && isAdventurous) {
  // 冒険家タイプ
}
```

### NOT演算子(!)の使用例

```javascript
// 計画的だが外向的でない
if (isPlanner && !isOutgoing) {
  // 思索家タイプ
}
```

### 複雑な条件の使用例

```javascript
// (外向的 または 冒険好き) かつ 計画的
if ((isOutgoing || isAdventurous) && isPlanner) {
  // バランスタイプ
}
```

## デバッグのヒント

診断がうまく動かない場合は、以下を確認しましょう:

### 1. チェックボックスのIDを確認

```javascript
// IDが正しいか確認
console.log(document.getElementById("isOutgoing"));
```

### 2. 取得した値を確認

```javascript
// 値が正しく取得できているか確認
console.log("isOutgoing:", isOutgoing);
console.log("isPlanner:", isPlanner);
console.log("isAdventurous:", isAdventurous);
```

### 3. 条件分岐を確認

```javascript
// どの条件に入ったか確認
if (isOutgoing && isPlanner && isAdventurous) {
  console.log("リーダータイプに判定");
  type = "リーダータイプ";
}
```

## 実践問題

以下の要件を満たす性格診断アプリを作成してください。

**必須要件:**
- 3つの質問(チェックボックス)
- 診断ボタン
- 5つの性格タイプに分類
- 結果表示エリア

**HTMLの構成:**
- id="isOutgoing" のチェックボックス
- id="isPlanner" のチェックボックス
- id="isAdventurous" のチェックボックス
- id="result" の結果表示エリア
- onclick="diagnose()" のボタン

**動作:**
1. 3つのチェックボックスの状態を取得
2. 複数の条件分岐で性格タイプを判定
3. タイプ名と特徴を表示

## まとめ

このプロジェクトで学んだこと:

- 複数の入力値を組み合わせた判定
- AND、OR、NOT演算子の実践的な使い方
- 複雑な条件分岐の実装
- ユーザー体験を考えたアプリ設計
- 段階的な条件チェックの方法

これまで学んだ条件分岐の知識を活用して、実用的なアプリケーションを作成できました。次のレッスンからは、繰り返し処理について学んでいきます。
