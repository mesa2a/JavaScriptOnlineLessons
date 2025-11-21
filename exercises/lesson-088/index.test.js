import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Lesson 088: 要素の変更", () => {
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

  it("インデックス入力欄が存在する", () => {
    const index = document.getElementById("index");
    expect(index).toBeTruthy();
    expect(index.tagName).toBe("INPUT");
  });

  it("値入力欄が存在する", () => {
    const value = document.getElementById("value");
    expect(value).toBeTruthy();
    expect(value.tagName).toBe("INPUT");
  });

  it("変更ボタンが存在する", () => {
    const button = document.getElementById("change");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("すべて2倍ボタンが存在する", () => {
    const button = document.getElementById("doubleAll");
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

  it("すべて2倍ボタンをクリックすると配列が変更される", () => {
    const button = document.getElementById("doubleAll");
    const display = document.getElementById("display");
    const initialText = display.textContent;

    button.click();

    expect(display.textContent).not.toBe(initialText);
  });
});
