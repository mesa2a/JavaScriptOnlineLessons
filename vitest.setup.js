import { expect, afterEach } from 'vitest';

// テスト後にDOMをクリーンアップ
afterEach(() => {
  if (typeof document !== 'undefined') {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  }
});

// カスタムマッチャーを追加する場合はここに記述
