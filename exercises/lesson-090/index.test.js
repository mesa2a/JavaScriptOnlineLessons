import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Lesson 090: 要素の削除", () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const html = readFileSync(join(__dirname, "index.html"), "utf-8");
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    document = dom.window.document;
    window = dom.window;

    const scriptContent = readFileSync(join(__dirname, "script.js"), "utf-8");
    const scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);
  });

  it("配列表示エリアが存在する", () => {
    const display = document.getElementById("display");
    expect(display).toBeTruthy();
  });

  it("要素数表示エリアが存在する", () => {
    const count = document.getElementById("count");
    expect(count).toBeTruthy();
  });

  it("末尾削除ボタンが存在する", () => {
    const button = document.getElementById("removeLast");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("先頭削除ボタンが存在する", () => {
    const button = document.getElementById("removeFirst");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("結果表示エリアが存在する", () => {
    const result = document.getElementById("result");
    expect(result).toBeTruthy();
  });

  it("初期状態で配列が表示される", () => {
    const display = document.getElementById("display");
    expect(display.textContent).toBeTruthy();
    expect(display.textContent.length).toBeGreaterThan(0);
  });

  it("末尾削除ボタンをクリックすると配列が変更される", () => {
    const button = document.getElementById("removeLast");
    const display = document.getElementById("display");
    const initialText = display.textContent;

    button.click();

    expect(display.textContent).not.toBe(initialText);
  });

  it("末尾削除ボタンをクリックすると削除メッセージが表示される", () => {
    const button = document.getElementById("removeLast");
    const result = document.getElementById("result");

    button.click();

    expect(result.textContent).toBeTruthy();
    expect(result.textContent).toMatch(/削除/);
  });

  it("先頭削除ボタンをクリックすると配列が変更される", () => {
    const button = document.getElementById("removeFirst");
    const display = document.getElementById("display");
    const initialText = display.textContent;

    button.click();

    expect(display.textContent).not.toBe(initialText);
  });
});
