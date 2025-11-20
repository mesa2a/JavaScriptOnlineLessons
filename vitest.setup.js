import { expect, afterEach } from 'vitest';

// テスト後にDOMをクリーンアップ
afterEach(() => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});

// カスタムマッチャーを追加する場合はここに記述
