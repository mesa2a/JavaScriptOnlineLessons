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
