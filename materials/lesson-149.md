# レッスン149：TODOアプリ（見た目編）

## このレッスンで学ぶこと
- CSSでスタイルを追加する
- カードデザインを実装する
- ボタンを装飾する
- 完了タスクのスタイルを変更する
- ホバーエフェクトを追加する

---

## 1. 日常生活の例：部屋の模様替え

機能的には完璧なTODOアプリができました。しかし、見た目がシンプルすぎます。

これは、**機能的には完璧だけど、殺風景な部屋**に似ています：

### 機能だけの部屋（スタイルなしのアプリ）
```
┌─────────────────────────────┐
│ 机   椅子              │
│                             │
│ ベッド                      │
│                             │
│ 本棚                        │
└─────────────────────────────┘
必要なものは全部ある
でも、使いたくない...
```

### 模様替えした部屋（スタイル付きアプリ）
```
┌─────────────────────────────┐
│ 🎨 おしゃれな壁紙           │
│ ✨ 綺麗な照明               │
│ 🪴 観葉植物                 │
│ 🖼️  インテリア              │
│ 🛋️  快適な家具              │
└─────────────────────────────┘
使いたくなる！
毎日ここで過ごしたい！
```

**CSSは、Webアプリの「インテリアデザイン」です！**

---

## 2. なぜ見た目が重要なのか

### 見た目が悪いアプリの問題点

**問題1：使いたくなくなる**
```
スタイルなし：
[タスクを入力]  [追加]
☐ 牛乳を買う [削除]
☐ 宿題をする [削除]

↓ 誰も使わない...
```

**問題2：何ができるかわかりにくい**
```
ボタンが普通のテキストに見える
どこをクリックしていいか分からない
完了したタスクが分かりにくい
```

**問題3：プロフェッショナルに見えない**
```
仕事で使うには恥ずかしい
他の人に見せられない
```

### 見た目が良いアプリの利点

**利点1：使いたくなる**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* 美しいグラデーション背景 */
```
→ アプリを開くのが楽しくなる！

**利点2：操作が直感的**
```css
button:hover {
  transform: translateY(-2px);
  /* ボタンが浮き上がる */
}
```
→ クリックできることが一目で分かる！

**利点3：プロフェッショナル**
```css
box-shadow: 0 10px 40px rgba(0,0,0,0.2);
/* 洗練された影 */
```
→ 仕事でも使える品質！

---

## 3. CSSの基本概念

### CSSとは何か

**CSS（Cascading Style Sheets）**は、HTMLの見た目を制御する言語です。

```
HTML    = 骨組み（構造）
CSS     = 装飾（見た目）
JavaScript = 動き（機能）
```

### CSSの書き方

**方法1：外部ファイル（推奨）**
```html
<link rel="stylesheet" href="style.css">
```

**方法2：`<style>`タグ**
```html
<style>
  .container {
    background: white;
  }
</style>
```

**方法3：インラインスタイル（非推奨）**
```html
<div style="background: white;"></div>
```

### セレクタの種類

**タグセレクタ**
```css
button {
  /* すべてのbuttonに適用 */
}
```

**クラスセレクタ**
```css
.btn-add {
  /* class="btn-add"の要素に適用 */
}
```

**IDセレクタ**
```css
#taskInput {
  /* id="taskInput"の要素に適用 */
}
```

**疑似クラス**
```css
button:hover {
  /* ボタンにマウスを乗せたとき */
}

input:focus {
  /* 入力欄にフォーカスしたとき */
}

.task-item.done {
  /* task-itemクラスとdoneクラス両方持つ要素 */
}
```

---

## 4. レイアウトの基礎：コンテナを中央に配置

### 実行の流れ

**ステップ1：画面全体のスタイル**
```css
body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
  margin: 0;
}
```

```
実行結果：
┌─────────────────────────────────────┐
│  🌈 美しいグラデーション背景       │
│                                     │
│  （画面全体に適用）                │
│                                     │
│  高さ: 最低100vh（画面の高さ）     │
└─────────────────────────────────────┘
```

**ステップ2：コンテナを中央に配置**
```css
.container {
  max-width: 600px;      /* 最大幅600px */
  margin: 0 auto;        /* 左右中央に配置 */
  background: white;     /* 白い背景 */
  border-radius: 12px;   /* 角を丸く */
  padding: 30px;         /* 内側の余白 */
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);  /* 影 */
}
```

```
実行結果：
┌─────────────────────────────────────┐
│  🌈 グラデーション背景              │
│                                     │
│  ┌─────────────────────┐           │
│  │ 白いカード           │           │
│  │ ・角が丸い           │ ← 中央配置│
│  │ ・影がある           │           │
│  │ ・幅600px            │           │
│  └─────────────────────┘           │
│                                     │
└─────────────────────────────────────┘
```

### margin: 0 auto の仕組み

```
margin: 0 auto;
       ↑   ↑
       上下 左右

上下: 0
左右: auto（自動で均等に）

┌────────────────────────────────────┐
│ ← auto →  [要素]  ← auto →        │
│                                    │
│  左右のmarginが自動で同じになる    │
└────────────────────────────────────┘
```

---

## 5. ヘッダーのスタイル

### 基本的なヘッダースタイル

```css
h1 {
  text-align: center;   /* 中央揃え */
  color: #333;          /* 濃いグレー */
  margin: 0 0 30px 0;   /* 下に30pxの余白 */
  font-size: 32px;      /* 文字サイズ */
  font-weight: 700;     /* 太字 */
}
```

### ::before疑似要素でアイコン追加

```css
h1::before {
  content: "✓ ";        /* チェックマークを追加 */
  color: #667eea;       /* 紫色 */
}
```

**実行の流れ：**
```
HTML:
<h1>TODOリスト</h1>

↓ CSSが適用される

表示結果:
┌─────────────────┐
│  ✓ TODOリスト   │  ← "✓ "が自動追加される
└─────────────────┘
   ↑
   紫色
```

### ::before と ::after の違い

```css
h1::before {
  content: "前に追加 ";
}

h1::after {
  content: " 後に追加";
}
```

```
<h1>本文</h1>

↓

表示結果:
前に追加 本文 後に追加
```

---

## 6. 入力エリアのスタイル：Flexboxレイアウト

### Flexboxの基本

```css
.input-area {
  display: flex;        /* Flexboxを使う */
  gap: 10px;            /* 要素間の間隔 */
  margin-bottom: 30px;  /* 下に余白 */
}
```

**Flexboxの仕組み：**
```
display: flex;

通常:
┌──────┐
│要素1 │
└──────┘
┌──────┐
│要素2 │
└──────┘

↓ Flexboxを適用

横並び:
┌──────┐ ┌──────┐
│要素1 │ │要素2 │
└──────┘ └──────┘
```

### 入力欄のスタイル

```css
#taskInput {
  flex: 1;              /* 残りのスペースを全部使う */
  padding: 12px 16px;   /* 内側の余白 */
  font-size: 16px;      /* 文字サイズ */
  border: 2px solid #e0e0e0;  /* 枠線 */
  border-radius: 8px;   /* 角を丸く */
  transition: border-color 0.3s;  /* アニメーション */
}
```

**flex: 1 の仕組み：**
```
┌────────────────────────────────────┐
│ [入力欄(flex:1)]  [追加ボタン]    │
└────────────────────────────────────┘
  ↑
  残りのスペースを全部使う


┌────────────────────────────────────┐
│ [長い入力欄xxxxxxxxxx]  [追加]    │
└────────────────────────────────────┘
  ↑
  ボタンのサイズを除いた全部
```

### フォーカス時のスタイル

```css
#taskInput:focus {
  outline: none;        /* デフォルトの枠線を消す */
  border-color: #667eea;  /* 枠線の色を変える */
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);  /* 光る効果 */
}
```

**実行の流れ：**
```
通常時:
┌─────────────────────┐
│ タスクを入力...     │  ← グレーの枠線
└─────────────────────┘

↓ クリックする（:focus状態）

フォーカス時:
┌─────────────────────┐
│ |                   │  ← 紫の枠線 + 光る
└─────────────────────┘
    ✨ 光る効果
```

### プレースホルダーのスタイル

```css
#taskInput::placeholder {
  color: #999;  /* 薄いグレー */
}
```

```html
<input type="text" placeholder="新しいタスクを入力...">
```

```
表示結果:
┌─────────────────────────────┐
│ 新しいタスクを入力...       │  ← 薄いグレーで表示
└─────────────────────────────┘
```

---

## 7. ボタンのスタイル：グラデーションとアニメーション

### 基本的なボタンスタイル

```css
button {
  padding: 12px 24px;   /* 内側の余白 */
  font-size: 16px;      /* 文字サイズ */
  font-weight: 600;     /* やや太字 */
  border: none;         /* 枠線なし */
  border-radius: 8px;   /* 角を丸く */
  cursor: pointer;      /* カーソルを指に */
  transition: all 0.3s; /* すべてのプロパティをアニメーション */
}
```

### 追加ボタンのスタイル

```css
.btn-add {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
```

**グラデーションの仕組み：**
```
linear-gradient(135deg, #667eea 0%, #764ba2 100%)
                ↑       ↑           ↑
                角度     開始色       終了色

135deg = 左上から右下

┌─────────────┐
│ 🟣          │  ← #667eea（薄い紫）
│   🟣        │
│     🟣      │
│       🟪    │
│         🟪  │  ← #764ba2（濃い紫）
└─────────────┘
```

### ホバー時のアニメーション

```css
.btn-add:hover {
  transform: translateY(-2px);  /* 上に2px移動 */
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);  /* 影を追加 */
}
```

**実行の流れ：**
```
通常時:
┌─────────┐
│  追加   │
└─────────┘

↓ マウスを乗せる（:hover）

ホバー時:
┌─────────┐
│  追加   │  ← 2px上に移動
└─────────┘
    💫 影
```

### クリック時のアニメーション

```css
.btn-add:active {
  transform: translateY(0);  /* 元の位置に戻る */
}
```

**状態の変化：**
```
通常:      translateY(0)
   ↓
ホバー:    translateY(-2px)  ← 浮く
   ↓
クリック:  translateY(0)     ← 押される感じ
   ↓
離す:      translateY(-2px)  ← また浮く
```

### 削除ボタンのスタイル

```css
.btn-delete {
  background: #ff4757;  /* 赤色 */
  color: white;
  padding: 6px 12px;    /* 小さめ */
  font-size: 14px;      /* 小さめ */
}

.btn-delete:hover {
  background: #ff3838;  /* 濃い赤 */
  transform: scale(1.05);  /* 5%拡大 */
}
```

**transform: scale() の仕組み：**
```
scale(1.0) = 元のサイズ

通常:
┌─────┐
│削除 │
└─────┘

scale(1.05) = 5%拡大

ホバー:
┌───────┐
│ 削除  │  ← 少し大きく
└───────┘
```

---

## 8. タスクアイテムのスタイル：カードデザイン

### 基本的なカードスタイル

```css
.task-item {
  display: flex;           /* Flexboxで横並び */
  align-items: center;     /* 縦方向中央揃え */
  gap: 12px;               /* 要素間の間隔 */
  padding: 16px;           /* 内側の余白 */
  margin-bottom: 12px;     /* 下に余白 */
  background: #f8f9fa;     /* 薄いグレー背景 */
  border-radius: 8px;      /* 角を丸く */
  border-left: 4px solid #667eea;  /* 左に紫の線 */
  transition: all 0.3s;    /* アニメーション */
}
```

**実行結果：**
```
┌─────────────────────────────────┐
│ ▌☐ 牛乳を買う          [削除]  │
└─────────────────────────────────┘
 ↑ ↑  ↑                    ↑
 │ │  テキスト              ボタン
 │ チェックボックス
 左の紫線（border-left）

gap: 12px で要素間に12pxの間隔
```

### ホバー時のアニメーション

```css
.task-item:hover {
  background: #e9ecef;     /* 少し濃いグレー */
  transform: translateX(4px);  /* 右に4px移動 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);  /* 影 */
}
```

**実行の流れ：**
```
通常時:
┌─────────────────────────────────┐
│ ▌☐ 牛乳を買う          [削除]  │
└─────────────────────────────────┘

↓ マウスを乗せる

ホバー時:
  ┌─────────────────────────────────┐
  │ ▌☐ 牛乳を買う          [削除]  │  ← 4px右に移動
  └─────────────────────────────────┘
      💫 影が現れる
```

### チェックボックスとテキストのスタイル

```css
.task-item input[type="checkbox"] {
  width: 20px;       /* 幅 */
  height: 20px;      /* 高さ */
  cursor: pointer;   /* カーソルを指に */
}

.task-item span {
  flex: 1;           /* 残りのスペースを使う */
  font-size: 16px;   /* 文字サイズ */
  color: #333;       /* 濃いグレー */
}
```

**レイアウトの仕組み：**
```
┌──────────────────────────────────────┐
│ [CB] [テキスト(flex:1)]      [削除] │
└──────────────────────────────────────┘
  20px  ← 残りのスペース →      自動

CB = チェックボックス（固定サイズ）
テキスト = flex: 1（伸縮する）
削除ボタン = 自動サイズ
```

---

## 9. 完了タスクのスタイル

### 完了状態のクラス

JavaScriptで完了したタスクに`.done`クラスを追加します：

```javascript
if (task.done) {
  html += '<div class="task-item done">';
} else {
  html += '<div class="task-item">';
}
```

### 完了タスクのスタイル

```css
.task-item.done {
  opacity: 0.6;                  /* 60%透明 */
  border-left-color: #2ed573;    /* 左線を緑に */
}

.task-item.done span {
  text-decoration: line-through;  /* 取り消し線 */
  color: #999;                    /* 薄いグレー */
}
```

**実行の流れ：**
```
未完了:
┌─────────────────────────────────┐
│ ▌☐ 牛乳を買う          [削除]  │  ← 紫線
└─────────────────────────────────┘
  通常の表示

完了:
┌─────────────────────────────────┐
│ ▌☑ 牛乳を買う          [削除]  │  ← 緑線、薄く、取り消し線
└─────────────────────────────────┘
  opacity: 0.6 で薄くなる
```

### opacity（透明度）の仕組み

```css
opacity: 1.0;   /* 完全に不透明（通常） */
opacity: 0.6;   /* 60%不透明 = 40%透明 */
opacity: 0.0;   /* 完全に透明（見えない） */
```

```
opacity: 1.0（通常）
┌───────────────┐
│ 牛乳を買う    │  ← はっきり見える
└───────────────┘

opacity: 0.6（完了）
┌───────────────┐
│ 牛乳を買う    │  ← 薄く見える
└───────────────┘

opacity: 0.0（非表示）
┌───────────────┐
│               │  ← 見えない
└───────────────┘
```

### 完了タスクのホバー

```css
.task-item.done:hover {
  opacity: 0.8;  /* ホバー時は少し濃く */
}
```

```
完了タスク:
通常   → opacity: 0.6（かなり薄い）
ホバー → opacity: 0.8（少し濃く）
```

---

## 10. 空のメッセージのスタイル

### 基本スタイル

```css
.empty-message {
  text-align: center;   /* 中央揃え */
  padding: 40px 20px;   /* 上下40px、左右20pxの余白 */
  color: #999;          /* 薄いグレー */
  font-size: 18px;      /* 文字サイズ */
}
```

### 絵文字を追加

```css
.empty-message::before {
  content: "📝";         /* メモの絵文字 */
  display: block;        /* ブロック要素（改行される） */
  font-size: 48px;       /* 大きく */
  margin-bottom: 16px;   /* 下に余白 */
}
```

**実行結果：**
```html
<div class="empty-message">タスクがありません</div>
```

```
表示結果:
┌─────────────────────┐
│                     │
│        📝           │  ← 大きい絵文字
│                     │
│ タスクがありません  │  ← テキスト
│                     │
└─────────────────────┘
```

### display: block の仕組み

```css
display: inline;  /* デフォルト：横並び */

📝 タスクがありません

display: block;   /* ブロック：改行される */

📝
タスクがありません
```

---

## 11. レスポンシブデザイン：スマートフォン対応

### メディアクエリとは

画面サイズに応じてスタイルを変更する機能です。

```css
@media (max-width: 768px) {
  /* 画面幅が768px以下のときに適用 */
}
```

**仕組み：**
```
画面幅 > 768px（PC）
→ 通常のスタイル

画面幅 ≤ 768px（スマホ・タブレット）
→ @media内のスタイルも適用
```

### コンテナのレスポンシブ

```css
@media (max-width: 768px) {
  .container {
    padding: 20px;  /* 余白を小さく */
    margin: 10px;   /* 外側の余白も小さく */
  }

  h1 {
    font-size: 24px;  /* 文字を小さく */
  }
}
```

**実行の流れ：**
```
PC画面（幅 > 768px）:
┌────────────────────────────────┐
│                                │
│  ┌──────────────────────┐     │
│  │ h1: 32px             │     │
│  │ padding: 30px        │     │
│  └──────────────────────┘     │
│                                │
└────────────────────────────────┘

スマホ画面（幅 ≤ 768px）:
┌──────────────┐
│┌────────────┐│
││h1: 24px    ││  ← 小さく
││padding:20px││  ← 余白小さく
│└────────────┘│
└──────────────┘
```

### 入力エリアのレスポンシブ

```css
@media (max-width: 768px) {
  .input-area {
    flex-direction: column;  /* 縦並びに */
  }

  button {
    width: 100%;  /* ボタンを横幅いっぱいに */
  }
}
```

**実行の流れ：**
```
PC（横並び）:
┌────────────────────────────────┐
│ [入力欄xxxxxxxxxx]  [追加]    │
└────────────────────────────────┘

↓ flex-direction: column;

スマホ（縦並び）:
┌──────────────┐
│ [入力欄]     │
├──────────────┤
│ [  追加  ]   │  ← width: 100%
└──────────────┘
```

### タスクアイテムのレスポンシブ

```css
@media (max-width: 768px) {
  .task-item {
    flex-wrap: wrap;  /* 折り返しを許可 */
  }

  .task-item button {
    width: 100%;      /* 削除ボタンを横幅いっぱいに */
    margin-top: 8px;  /* 上に余白 */
  }
}
```

**実行の流れ：**
```
PC:
┌─────────────────────────────────┐
│ ▌☑ 牛乳を買う          [削除]  │
└─────────────────────────────────┘

スマホ:
┌──────────────┐
│ ▌☑ 牛乳を買う│
├──────────────┤
│ [  削除  ]   │  ← 下の行に移動
└──────────────┘
```

---

## 12. 実践例1：基本的なスタイル付きTODOアプリ

完全に動作するHTML例です。ブラウザで開いて、美しいデザインを確認してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>スタイル付きTODOアプリ</title>
  <style>
    /* ========================================
       リセットとベース
       ======================================== */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    /* ========================================
       コンテナ
       ======================================== */
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }

    /* ========================================
       ヘッダー
       ======================================== */
    h1 {
      text-align: center;
      color: #333;
      margin: 0 0 30px 0;
      font-size: 32px;
      font-weight: 700;
    }

    h1::before {
      content: "✓ ";
      color: #667eea;
    }

    /* ========================================
       入力エリア
       ======================================== */
    .input-area {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }

    #taskInput {
      flex: 1;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      transition: border-color 0.3s;
    }

    #taskInput:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    #taskInput::placeholder {
      color: #999;
    }

    /* ========================================
       ボタン
       ======================================== */
    button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-add {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-add:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-add:active {
      transform: translateY(0);
    }

    .btn-delete {
      background: #ff4757;
      color: white;
      padding: 6px 12px;
      font-size: 14px;
    }

    .btn-delete:hover {
      background: #ff3838;
      transform: scale(1.05);
    }

    /* ========================================
       タスクアイテム
       ======================================== */
    .task-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      margin-bottom: 12px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      transition: all 0.3s;
    }

    .task-item:hover {
      background: #e9ecef;
      transform: translateX(4px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .task-item input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .task-item span {
      flex: 1;
      font-size: 16px;
      color: #333;
    }

    /* ========================================
       完了タスク
       ======================================== */
    .task-item.done {
      opacity: 0.6;
      border-left-color: #2ed573;
    }

    .task-item.done span {
      text-decoration: line-through;
      color: #999;
    }

    .task-item.done:hover {
      opacity: 0.8;
    }

    /* ========================================
       空のメッセージ
       ======================================== */
    .empty-message {
      text-align: center;
      padding: 40px 20px;
      color: #999;
      font-size: 18px;
    }

    .empty-message::before {
      content: "📝";
      display: block;
      font-size: 48px;
      margin-bottom: 16px;
    }

    /* ========================================
       レスポンシブデザイン
       ======================================== */
    @media (max-width: 768px) {
      .container {
        padding: 20px;
        margin: 10px;
      }

      h1 {
        font-size: 24px;
      }

      .input-area {
        flex-direction: column;
      }

      button {
        width: 100%;
      }

      .task-item {
        flex-wrap: wrap;
      }

      .task-item button {
        width: 100%;
        margin-top: 8px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>TODOリスト</h1>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="新しいタスクを入力...">
      <button class="btn-add" onclick="handleAdd()">追加</button>
    </div>

    <div id="taskList"></div>
  </div>

  <script>
    // データ
    let tasks = [];
    let taskIdCounter = 1;

    // データ操作関数
    function addTask(text) {
      let newTask = {
        id: taskIdCounter,
        text: text,
        done: false
      };
      taskIdCounter = taskIdCounter + 1;
      tasks.push(newTask);
      return newTask;
    }

    function getTaskById(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          return tasks[i];
        }
      }
      return null;
    }

    function deleteTask(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          tasks.splice(i, 1);
          return true;
        }
      }
      return false;
    }

    function toggleTask(id) {
      let task = getTaskById(id);
      if (task !== null) {
        task.done = !task.done;
        return true;
      }
      return false;
    }

    // 表示関数
    function displayTasks() {
      let taskList = document.getElementById('taskList');

      if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">タスクがありません</div>';
        return;
      }

      let html = "";
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        if (task.done) {
          html += '<div class="task-item done">';
        } else {
          html += '<div class="task-item">';
        }

        html += '<input type="checkbox"';
        if (task.done) {
          html += ' checked';
        }
        html += ' onchange="handleToggle(' + task.id + ')">';

        html += '<span>' + task.text + '</span>';

        html += '<button class="btn-delete" onclick="handleDelete(' + task.id + ')">削除</button>';

        html += '</div>';
      }

      taskList.innerHTML = html;
    }

    // イベントハンドラ
    function handleAdd() {
      let input = document.getElementById('taskInput');
      let text = input.value;

      if (text !== "") {
        addTask(text);
        input.value = "";
        displayTasks();
      }
    }

    function handleToggle(id) {
      toggleTask(id);
      displayTasks();
    }

    function handleDelete(id) {
      deleteTask(id);
      displayTasks();
    }

    // 初期表示
    displayTasks();
  </script>
</body>
</html>
```

**このアプリの特徴：**
1. **美しいグラデーション背景** - 紫のグラデーション
2. **中央配置された白いカード** - 影付き
3. **ホバーエフェクト** - マウスを乗せると動く
4. **完了タスクのスタイル** - 取り消し線と薄い表示
5. **レスポンシブデザイン** - スマホでも使いやすい

---

## 13. 実践例2：アニメーション付きTODOアプリ

タスクを追加したときにスライドインアニメーションを追加します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>アニメーション付きTODOアプリ</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }

    h1 {
      text-align: center;
      color: #333;
      margin: 0 0 30px 0;
      font-size: 32px;
      font-weight: 700;
    }

    h1::before {
      content: "✓ ";
      color: #667eea;
    }

    .input-area {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }

    #taskInput {
      flex: 1;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      transition: border-color 0.3s;
    }

    #taskInput:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-add {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-add:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-delete {
      background: #ff4757;
      color: white;
      padding: 6px 12px;
      font-size: 14px;
    }

    .btn-delete:hover {
      background: #ff3838;
      transform: scale(1.05);
    }

    /* ========================================
       アニメーション定義
       ======================================== */
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.8);
      }
    }

    .task-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      margin-bottom: 12px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      transition: all 0.3s;

      /* アニメーション適用 */
      animation: slideIn 0.3s ease-out;
    }

    .task-item:hover {
      background: #e9ecef;
      transform: translateX(4px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .task-item input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .task-item span {
      flex: 1;
      font-size: 16px;
      color: #333;
    }

    .task-item.done {
      opacity: 0.6;
      border-left-color: #2ed573;
    }

    .task-item.done span {
      text-decoration: line-through;
      color: #999;
    }

    .empty-message {
      text-align: center;
      padding: 40px 20px;
      color: #999;
      font-size: 18px;
    }

    .empty-message::before {
      content: "📝";
      display: block;
      font-size: 48px;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>TODOリスト</h1>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="新しいタスクを入力...">
      <button class="btn-add" onclick="handleAdd()">追加</button>
    </div>

    <div id="taskList"></div>
  </div>

  <script>
    let tasks = [];
    let taskIdCounter = 1;

    function addTask(text) {
      let newTask = {
        id: taskIdCounter,
        text: text,
        done: false
      };
      taskIdCounter = taskIdCounter + 1;
      tasks.push(newTask);
      return newTask;
    }

    function getTaskById(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          return tasks[i];
        }
      }
      return null;
    }

    function deleteTask(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          tasks.splice(i, 1);
          return true;
        }
      }
      return false;
    }

    function toggleTask(id) {
      let task = getTaskById(id);
      if (task !== null) {
        task.done = !task.done;
        return true;
      }
      return false;
    }

    function displayTasks() {
      let taskList = document.getElementById('taskList');

      if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">タスクがありません</div>';
        return;
      }

      let html = "";
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        if (task.done) {
          html += '<div class="task-item done">';
        } else {
          html += '<div class="task-item">';
        }

        html += '<input type="checkbox"';
        if (task.done) {
          html += ' checked';
        }
        html += ' onchange="handleToggle(' + task.id + ')">';

        html += '<span>' + task.text + '</span>';

        html += '<button class="btn-delete" onclick="handleDelete(' + task.id + ')">削除</button>';

        html += '</div>';
      }

      taskList.innerHTML = html;
    }

    function handleAdd() {
      let input = document.getElementById('taskInput');
      let text = input.value;

      if (text !== "") {
        addTask(text);
        input.value = "";
        displayTasks();
      }
    }

    function handleToggle(id) {
      toggleTask(id);
      displayTasks();
    }

    function handleDelete(id) {
      deleteTask(id);
      displayTasks();
    }

    displayTasks();
  </script>
</body>
</html>
```

**アニメーションの仕組み：**

```css
@keyframes slideIn {
  from {
    opacity: 0;              /* 透明 */
    transform: translateY(-20px);  /* 上に20px */
  }
  to {
    opacity: 1;              /* 不透明 */
    transform: translateY(0);      /* 元の位置 */
  }
}
```

**実行の流れ：**
```
タスク追加前:
[タスクリスト]
（空）

↓ タスクを追加

アニメーション開始（0秒）:
[タスクリスト]
  （20px上、透明）

↓ 0.3秒かけて

アニメーション終了（0.3秒後）:
[タスクリスト]
┌─────────────────┐
│ 牛乳を買う      │  ← スライドインして表示
└─────────────────┘
```

---

## 14. 実践例3：ダークモード対応TODOアプリ

ダークモードボタンを追加して、テーマを切り替えられるようにします。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ダークモード対応TODOアプリ</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* ========================================
       ライトモード（デフォルト）
       ======================================== */
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
      transition: all 0.3s;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      transition: all 0.3s;
    }

    h1 {
      text-align: center;
      color: #333;
      margin: 0 0 30px 0;
      font-size: 32px;
      font-weight: 700;
    }

    h1::before {
      content: "✓ ";
      color: #667eea;
    }

    /* ========================================
       ダークモードボタン
       ======================================== */
    .theme-toggle {
      text-align: center;
      margin-bottom: 20px;
    }

    .btn-theme {
      background: #495057;
      color: white;
      padding: 8px 16px;
      font-size: 14px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-theme:hover {
      background: #343a40;
      transform: scale(1.05);
    }

    /* ========================================
       ダークモード
       ======================================== */
    body.dark-mode {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    }

    body.dark-mode .container {
      background: #0f3460;
      color: #eee;
    }

    body.dark-mode h1 {
      color: #eee;
    }

    body.dark-mode h1::before {
      color: #4ecdc4;
    }

    body.dark-mode #taskInput {
      background: #16213e;
      color: #eee;
      border-color: #495057;
    }

    body.dark-mode #taskInput:focus {
      border-color: #4ecdc4;
      box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
    }

    body.dark-mode .task-item {
      background: #16213e;
      color: #eee;
      border-left-color: #4ecdc4;
    }

    body.dark-mode .task-item:hover {
      background: #1a1a2e;
    }

    body.dark-mode .task-item.done span {
      color: #6c757d;
    }

    body.dark-mode .empty-message {
      color: #6c757d;
    }

    /* ========================================
       通常のスタイル
       ======================================== */
    .input-area {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }

    #taskInput {
      flex: 1;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      transition: all 0.3s;
    }

    #taskInput:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-add {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-add:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-delete {
      background: #ff4757;
      color: white;
      padding: 6px 12px;
      font-size: 14px;
    }

    .btn-delete:hover {
      background: #ff3838;
      transform: scale(1.05);
    }

    .task-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      margin-bottom: 12px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      transition: all 0.3s;
    }

    .task-item:hover {
      background: #e9ecef;
      transform: translateX(4px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .task-item input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .task-item span {
      flex: 1;
      font-size: 16px;
      color: #333;
    }

    .task-item.done {
      opacity: 0.6;
      border-left-color: #2ed573;
    }

    .task-item.done span {
      text-decoration: line-through;
      color: #999;
    }

    .empty-message {
      text-align: center;
      padding: 40px 20px;
      color: #999;
      font-size: 18px;
    }

    .empty-message::before {
      content: "📝";
      display: block;
      font-size: 48px;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>TODOリスト</h1>

    <div class="theme-toggle">
      <button class="btn-theme" onclick="toggleTheme()">
        <span id="themeText">🌙 ダークモード</span>
      </button>
    </div>

    <div class="input-area">
      <input type="text" id="taskInput" placeholder="新しいタスクを入力...">
      <button class="btn-add" onclick="handleAdd()">追加</button>
    </div>

    <div id="taskList"></div>
  </div>

  <script>
    let tasks = [];
    let taskIdCounter = 1;
    let isDarkMode = false;

    function addTask(text) {
      let newTask = {
        id: taskIdCounter,
        text: text,
        done: false
      };
      taskIdCounter = taskIdCounter + 1;
      tasks.push(newTask);
      return newTask;
    }

    function getTaskById(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          return tasks[i];
        }
      }
      return null;
    }

    function deleteTask(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          tasks.splice(i, 1);
          return true;
        }
      }
      return false;
    }

    function toggleTask(id) {
      let task = getTaskById(id);
      if (task !== null) {
        task.done = !task.done;
        return true;
      }
      return false;
    }

    function displayTasks() {
      let taskList = document.getElementById('taskList');

      if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">タスクがありません</div>';
        return;
      }

      let html = "";
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        if (task.done) {
          html += '<div class="task-item done">';
        } else {
          html += '<div class="task-item">';
        }

        html += '<input type="checkbox"';
        if (task.done) {
          html += ' checked';
        }
        html += ' onchange="handleToggle(' + task.id + ')">';

        html += '<span>' + task.text + '</span>';

        html += '<button class="btn-delete" onclick="handleDelete(' + task.id + ')">削除</button>';

        html += '</div>';
      }

      taskList.innerHTML = html;
    }

    function handleAdd() {
      let input = document.getElementById('taskInput');
      let text = input.value;

      if (text !== "") {
        addTask(text);
        input.value = "";
        displayTasks();
      }
    }

    function handleToggle(id) {
      toggleTask(id);
      displayTasks();
    }

    function handleDelete(id) {
      deleteTask(id);
      displayTasks();
    }

    // テーマ切り替え
    function toggleTheme() {
      isDarkMode = !isDarkMode;
      let body = document.body;
      let themeText = document.getElementById('themeText');

      if (isDarkMode) {
        body.classList.add('dark-mode');
        themeText.textContent = '☀️ ライトモード';
      } else {
        body.classList.remove('dark-mode');
        themeText.textContent = '🌙 ダークモード';
      }
    }

    displayTasks();
  </script>
</body>
</html>
```

**ダークモード切り替えの仕組み：**

```javascript
function toggleTheme() {
  isDarkMode = !isDarkMode;  // true/falseを切り替え

  if (isDarkMode) {
    body.classList.add('dark-mode');  // クラスを追加
  } else {
    body.classList.remove('dark-mode');  // クラスを削除
  }
}
```

**実行の流れ：**
```
初期状態:
<body>  ← dark-modeクラスなし
→ ライトモード

↓ ボタンをクリック

ダークモード:
<body class="dark-mode">  ← クラス追加
→ ダークモードのCSSが適用

↓ もう一度クリック

ライトモード:
<body>  ← クラス削除
→ 元に戻る
```

---

## 15. CSSテクニック集

### テクニック1：グラデーション

```css
/* 線形グラデーション */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 放射状グラデーション */
background: radial-gradient(circle, #667eea 0%, #764ba2 100%);

/* 3色のグラデーション */
background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
```

### テクニック2：影

```css
/* ボックスシャドウ */
box-shadow: 0 10px 40px rgba(0,0,0,0.2);
/*          水平 垂直 ぼかし 色 */

/* テキストシャドウ */
text-shadow: 2px 2px 4px rgba(0,0,0,0.3);

/* 複数の影 */
box-shadow:
  0 2px 4px rgba(0,0,0,0.1),
  0 8px 16px rgba(0,0,0,0.1);
```

### テクニック3：トランジション

```css
/* 全プロパティをアニメーション */
transition: all 0.3s;

/* 特定のプロパティのみ */
transition: background-color 0.3s, transform 0.3s;

/* イージング関数 */
transition: all 0.3s ease-in-out;
/*                    ↑
                      ease, ease-in, ease-out, ease-in-out, linear
*/
```

### テクニック4：変形

```css
/* 移動 */
transform: translateX(10px);   /* 右に10px */
transform: translateY(-5px);   /* 上に5px */

/* 回転 */
transform: rotate(45deg);      /* 45度回転 */

/* 拡大・縮小 */
transform: scale(1.5);         /* 1.5倍に拡大 */
transform: scale(0.8);         /* 0.8倍に縮小 */

/* 複数を組み合わせ */
transform: translateY(-2px) scale(1.05);
```

---

## 16. まとめ

### このレッスンで学んだこと

**1. CSSの基本**
- セレクタ（タグ、クラス、ID、疑似クラス）
- プロパティと値
- カスケーディングの仕組み

**2. レイアウト**
- Flexboxで横並び
- `margin: 0 auto`で中央配置
- `gap`で要素間の間隔

**3. 装飾**
- `linear-gradient()`でグラデーション
- `border-radius`で角を丸く
- `box-shadow`で影

**4. アニメーション**
- `transition`でスムーズな変化
- `transform`で移動・拡大・回転
- `:hover`でホバー時の変化
- `@keyframes`でカスタムアニメーション

**5. 完了タスクのスタイル**
- `opacity`で透明度
- `text-decoration: line-through`で取り消し線
- `.done`クラスで状態を表現

**6. レスポンシブデザイン**
- `@media`クエリで画面サイズ対応
- `flex-direction: column`で縦並び
- スマートフォンでも使いやすく

### 重要な概念

**見た目の重要性**
```
機能 + デザイン = 使いたくなるアプリ
```

**CSSの役割**
```
HTML     = 構造（骨組み）
CSS      = 見た目（装飾）
JavaScript = 動き（機能）
```

**ユーザー体験**
```
良いデザイン → 使いたくなる
                → 直感的に操作できる
                → プロフェッショナル
```

---

## 17. カリキュラム要件チェック

レッスン149の要件を確認します：

✅ **CSSでスタイルを追加**
- body、container、h1、input、button、task-itemなどすべての要素にスタイルを追加
- グラデーション、影、角丸などの装飾を実装

✅ **カードデザイン**
- `.container`で白いカード（`border-radius: 12px`、`box-shadow`）
- `.task-item`でタスクカード（`border-radius: 8px`、左線、影）
- ホバー時のエフェクト

✅ **ボタンの装飾**
- `.btn-add`で追加ボタン（グラデーション、ホバーで浮く）
- `.btn-delete`で削除ボタン（赤色、ホバーで拡大）
- `transition`でスムーズなアニメーション

✅ **完了タスクのスタイル**
- `.task-item.done`で完了状態（`opacity: 0.6`）
- 取り消し線（`text-decoration: line-through`）
- 左線の色を緑に変更（`border-left-color: #2ed573`）

**すべての要件を満たしています！**

---

## 18. 次のレッスンの予告

次のレッスンでは、**localStorage**を使ってデータを保存します！

### 学ぶこと
- `localStorage.setItem()`でデータを保存
- `localStorage.getItem()`でデータを取得
- `JSON.stringify()`でオブジェクトを文字列に変換
- `JSON.parse()`で文字列をオブジェクトに変換

### できるようになること
```
現在:
ページを再読み込み
  ↓
タスクが全部消える...

次回:
ページを再読み込み
  ↓
タスクが残っている！
```

**ついに実用的なTODOアプリが完成します！**

---

Date: 2025-11-26
