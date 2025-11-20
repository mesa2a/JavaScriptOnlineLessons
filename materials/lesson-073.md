# レッスン73：週のプロジェクト - 簡易ドラムキット

## このレッスンで学ぶこと

このレッスンは、これまで学んできたイベント処理の技術を総合的に活用する週のプロジェクトです。簡易ドラムキットを作成し、キーボードとマウスの両方で操作できるインタラクティブなWebアプリケーションを作ります。

## プロジェクト概要

### 作成するもの

キーボードまたはマウスで操作できる簡易ドラムキットです。以下の機能を実装します。

**基本機能**
1. キーボードで音を鳴らす（A、S、D、F、G、H、J、Kキーなど）
2. マウスクリックでも音を鳴らす
3. 音が鳴ったときの視覚的なフィードバック
4. 複数の異なるドラム音

**学習ポイント**
- 複合的なイベント処理（キーボード + マウス）
- 音声再生の基礎
- event.keyを使ったキーボード操作
- 動的なクラス操作によるアニメーション
- data属性を使った要素とデータの関連付け

## プロジェクトの準備

### 音声ファイルについて

このプロジェクトでは、実際の音声ファイルを使用する代わりに、Web Audio APIを使ってビープ音を生成します。これにより、外部ファイルなしでドラムキットを動作させることができます。

## ステップ1：HTML構造の作成

まず、ドラムパッドのHTML構造を作成します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>簡易ドラムキット</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        h1 {
            color: white;
            font-size: 48px;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .instructions {
            color: white;
            margin-bottom: 40px;
            font-size: 18px;
        }

        .drum-kit {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding: 20px;
        }

        .drum-pad {
            width: 150px;
            height: 150px;
            background-color: rgba(255, 255, 255, 0.1);
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.1s;
            backdrop-filter: blur(10px);
        }

        .drum-pad:hover {
            background-color: rgba(255, 255, 255, 0.2);
            transform: scale(1.05);
        }

        .drum-pad.active {
            background-color: rgba(255, 255, 255, 0.4);
            border-color: white;
            transform: scale(0.95);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        .key {
            font-size: 36px;
            font-weight: bold;
            color: white;
            margin-bottom: 10px;
        }

        .sound-name {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <h1>🥁 ドラムキット</h1>
    <p class="instructions">キーボード（A-H）またはマウスでパッドをクリックしてください</p>

    <div class="drum-kit" id="drumKit">
        <div class="drum-pad" data-key="a" data-sound="kick">
            <div class="key">A</div>
            <div class="sound-name">Kick</div>
        </div>
        <div class="drum-pad" data-key="s" data-sound="snare">
            <div class="key">S</div>
            <div class="sound-name">Snare</div>
        </div>
        <div class="drum-pad" data-key="d" data-sound="hihat">
            <div class="key">D</div>
            <div class="sound-name">Hi-Hat</div>
        </div>
        <div class="drum-pad" data-key="f" data-sound="tom1">
            <div class="key">F</div>
            <div class="sound-name">Tom 1</div>
        </div>
        <div class="drum-pad" data-key="g" data-sound="tom2">
            <div class="key">G</div>
            <div class="sound-name">Tom 2</div>
        </div>
        <div class="drum-pad" data-key="h" data-sound="crash">
            <div class="key">H</div>
            <div class="sound-name">Crash</div>
        </div>
        <div class="drum-pad" data-key="j" data-sound="ride">
            <div class="key">J</div>
            <div class="sound-name">Ride</div>
        </div>
        <div class="drum-pad" data-key="k" data-sound="clap">
            <div class="key">K</div>
            <div class="sound-name">Clap</div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

## ステップ2：音声生成の仕組み

Web Audio APIを使って、異なる周波数のビープ音を生成します。

```javascript
// Web Audio APIで音を生成する関数
function playSound(soundType) {
  let audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator = audioContext.createOscillator();
  let gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // 音のタイプに応じて周波数を設定
  let frequency;
  let duration;

  switch (soundType) {
    case "kick":
      frequency = 60;
      duration = 0.3;
      break;
    case "snare":
      frequency = 200;
      duration = 0.2;
      break;
    case "hihat":
      frequency = 800;
      duration = 0.1;
      break;
    case "tom1":
      frequency = 150;
      duration = 0.25;
      break;
    case "tom2":
      frequency = 100;
      duration = 0.25;
      break;
    case "crash":
      frequency = 1000;
      duration = 0.5;
      break;
    case "ride":
      frequency = 600;
      duration = 0.3;
      break;
    case "clap":
      frequency = 400;
      duration = 0.15;
      break;
    default:
      frequency = 440;
      duration = 0.2;
  }

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  // 音量のエンベロープ（徐々に小さくする）
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}
```

## ステップ3：マウスでの操作

マウスクリックでドラムパッドを操作できるようにします。

```javascript
let drumKit = document.getElementById("drumKit");

// マウスクリックのイベントリスナー（イベント委譲）
drumKit.addEventListener("click", function(event) {
  let pad = event.target.closest(".drum-pad");
  if (pad) {
    playDrumPad(pad);
  }
});

// ドラムパッドを演奏する関数
function playDrumPad(pad) {
  let soundType = pad.dataset.sound;

  // 音を鳴らす
  playSound(soundType);

  // 視覚的なフィードバック
  pad.classList.add("active");

  // 100ミリ秒後にactiveクラスを削除
  setTimeout(function() {
    pad.classList.remove("active");
  }, 100);
}
```

## ステップ4：キーボードでの操作

キーボードでも操作できるようにします。

```javascript
// キーボードのイベントリスナー
document.addEventListener("keydown", function(event) {
  let key = event.key.toLowerCase();

  // 対応するドラムパッドを探す
  let pad = document.querySelector('.drum-pad[data-key="' + key + '"]');

  if (pad) {
    playDrumPad(pad);
  }
});
```

## 完成版のコード

### HTML（index.html）

上記のHTMLコードをそのまま使用します。

### JavaScript（script.js）

```javascript
let drumKit = document.getElementById("drumKit");

// Web Audio APIで音を生成する関数
function playSound(soundType) {
  let audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator = audioContext.createOscillator();
  let gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // 音のタイプに応じて周波数を設定
  let frequency;
  let duration;

  switch (soundType) {
    case "kick":
      frequency = 60;
      duration = 0.3;
      break;
    case "snare":
      frequency = 200;
      duration = 0.2;
      break;
    case "hihat":
      frequency = 800;
      duration = 0.1;
      break;
    case "tom1":
      frequency = 150;
      duration = 0.25;
      break;
    case "tom2":
      frequency = 100;
      duration = 0.25;
      break;
    case "crash":
      frequency = 1000;
      duration = 0.5;
      break;
    case "ride":
      frequency = 600;
      duration = 0.3;
      break;
    case "clap":
      frequency = 400;
      duration = 0.15;
      break;
    default:
      frequency = 440;
      duration = 0.2;
  }

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  // 音量のエンベロープ
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

// ドラムパッドを演奏する関数
function playDrumPad(pad) {
  let soundType = pad.dataset.sound;

  // 音を鳴らす
  playSound(soundType);

  // 視覚的なフィードバック
  pad.classList.add("active");

  // 100ミリ秒後にactiveクラスを削除
  setTimeout(function() {
    pad.classList.remove("active");
  }, 100);
}

// マウスクリックのイベントリスナー（イベント委譲）
drumKit.addEventListener("click", function(event) {
  let pad = event.target.closest(".drum-pad");
  if (pad) {
    playDrumPad(pad);
  }
});

// キーボードのイベントリスナー
document.addEventListener("keydown", function(event) {
  let key = event.key.toLowerCase();

  // 対応するドラムパッドを探す
  let pad = document.querySelector('.drum-pad[data-key="' + key + '"]');

  if (pad) {
    playDrumPad(pad);
  }
});
```

## 学習ポイントの解説

### 1. 複合的なイベント処理

このプロジェクトでは、2種類のイベントを組み合わせています。

**マウスイベント**
- `click`イベントでドラムパッドをクリック検知
- イベント委譲で効率的に処理

**キーボードイベント**
- `keydown`イベントでキー入力を検知
- `event.key`で押されたキーを判別
- data属性と照合して対応するパッドを探す

### 2. 音声再生の基礎

Web Audio APIを使った音声生成のポイント：

**AudioContext**
- 音声処理のコンテキストを作成

**Oscillator（オシレーター）**
- 音波を生成するノード
- `frequency`で音の高さを設定
- `type`で波形を設定（sine、square、triangleなど）

**GainNode**
- 音量を制御するノード
- エンベロープで音の減衰を表現

### 3. data属性の活用

```html
<div class="drum-pad" data-key="a" data-sound="kick">
```

- `data-key`: キーボードのキーと関連付け
- `data-sound`: 音のタイプを指定
- JavaScriptから`dataset.key`、`dataset.sound`でアクセス

### 4. 視覚的なフィードバック

```javascript
pad.classList.add("active");
setTimeout(function() {
  pad.classList.remove("active");
}, 100);
```

- クラスの追加で即座に視覚的変化
- `setTimeout`で一定時間後にクラスを削除
- CSSのtransitionでスムーズなアニメーション

## 拡張アイデア

プロジェクトをさらに発展させるためのアイデアです。

### 1. 録音・再生機能

```javascript
let recording = [];
let isRecording = false;

function startRecording() {
  recording = [];
  isRecording = true;
}

function stopRecording() {
  isRecording = false;
}

function playRecording() {
  recording.forEach(function(item, index) {
    setTimeout(function() {
      let pad = document.querySelector('.drum-pad[data-sound="' + item.sound + '"]');
      playDrumPad(pad);
    }, item.time);
  });
}

// playDrumPad内に追加
if (isRecording) {
  recording.push({
    sound: soundType,
    time: Date.now()
  });
}
```

### 2. ボリュームコントロール

```javascript
let volume = 0.3;

function setVolume(value) {
  volume = value;
}

// playSound関数内で使用
gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
```

### 3. 異なる音色

```javascript
// oscillator.typeを変更
oscillator.type = "square"; // または "triangle", "sawtooth"
```

### 4. ビジュアルエフェクト

```javascript
function addVisualEffect(pad) {
  let ripple = document.createElement("div");
  ripple.className = "ripple";
  pad.appendChild(ripple);

  setTimeout(function() {
    pad.removeChild(ripple);
  }, 600);
}
```

## トラブルシューティング

### 音が鳴らない場合

1. ブラウザがWeb Audio APIに対応しているか確認
2. 音量がミュートになっていないか確認
3. コンソールでエラーが出ていないか確認

### キーボードが反応しない場合

1. ページにフォーカスがあるか確認（ページをクリック）
2. CapsLockがオンになっていないか確認
3. `event.key.toLowerCase()`で小文字に変換しているか確認

## まとめ

このプロジェクトでは、以下のことを学びました。

1. **複合的なイベント処理**
   - マウスとキーボードの両方に対応
   - イベント委譲の実践的な活用

2. **音声再生**
   - Web Audio APIの基礎
   - オシレーターを使った音生成
   - エンベロープによる音の加工

3. **インタラクティブなUI**
   - 視覚的なフィードバック
   - クラスの動的な追加・削除
   - CSSアニメーションとの連携

4. **data属性**
   - HTMLとJavaScriptのデータ連携
   - 要素の検索と特定

5. **コード構成**
   - 機能ごとの関数分割
   - 再利用可能なコード設計

このプロジェクトは、これまで学んできたイベント処理の技術を総合的に活用した実践的な例です。さらに機能を追加して、オリジナルのドラムキットを作ってみましょう。
