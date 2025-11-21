import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Lesson 089: 要素の追加", () => {
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

  it("入力欄が存在する", () => {
    const input = document.getElementById("newFruit");
    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
  });

  it("追加ボタンが存在する", () => {
    const button = document.getElementById("add");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("複数追加ボタンが存在する", () => {
    const button = document.getElementById("addMultiple");
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

  it("初期状態で要素数が表示される", () => {
    const count = document.getElementById("count");
    expect(count.textContent).toBeTruthy();
    expect(Number(count.textContent)).toBeGreaterThan(0);
  });

  it("複数追加ボタンをクリックすると配列が変更される", () => {
    const button = document.getElementById("addMultiple");
    const display = document.getElementById("display");
    const initialText = display.textContent;

    button.click();

    expect(display.textContent).not.toBe(initialText);
  });

  it("複数追加ボタンをクリックすると要素数が増える", () => {
    const button = document.getElementById("addMultiple");
    const count = document.getElementById("count");
    const initialCount = Number(count.textContent);

    button.click();

    expect(Number(count.textContent)).toBeGreaterThan(initialCount);
  });
});
