import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Lesson 019: クリックに反応する', () => {
  let document;

  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );

    const dom = new JSDOM(html);
    document = dom.window.document;
  });

  it('3つのボタンが存在する', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('1つ目のボタンにonclick属性が設定されている', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons[0].getAttribute('onclick')).toBeTruthy();
  });

  it('2つ目のボタンにonclick属性が設定されている', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons[1].getAttribute('onclick')).toBeTruthy();
  });

  it('3つ目のボタンにonclick属性が設定されている', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons[2].getAttribute('onclick')).toBeTruthy();
  });

  it('1つ目のボタンのonclick属性にalertが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[0].getAttribute('onclick');
    expect(onclick).toContain('alert');
  });

  it('2つ目のボタンのonclick属性にalertが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[1].getAttribute('onclick');
    expect(onclick).toContain('alert');
  });

  it('3つ目のボタンのonclick属性にalertが含まれている', () => {
    const buttons = document.querySelectorAll('button');
    const onclick = buttons[2].getAttribute('onclick');
    expect(onclick).toContain('alert');
  });
});
