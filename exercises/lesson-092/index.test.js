import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Lesson 092: forで配列処理", () => {
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

  it("シンプル表示ボタンが存在する", () => {
    const button = document.getElementById("showSimple");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("番号付き表示ボタンが存在する", () => {
    const button = document.getElementById("showNumbered");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("リスト表示ボタンが存在する", () => {
    const button = document.getElementById("showList");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("結果表示エリアが存在する", () => {
    const result = document.getElementById("result");
    expect(result).toBeTruthy();
  });

  it("シンプル表示ボタンをクリックすると要素が表示される", () => {
    const button = document.getElementById("showSimple");
    const result = document.getElementById("result");

    button.click();

    expect(result.children.length).toBeGreaterThan(0);
  });

  it("番号付き表示ボタンをクリックすると番号付きで表示される", () => {
    const button = document.getElementById("showNumbered");
    const result = document.getElementById("result");

    button.click();

    expect(result.children.length).toBeGreaterThan(0);
    // 番号が含まれているかチェック（1. や 2. など）
    expect(result.textContent).toMatch(/1\.|2\./);
  });

  it("リスト表示ボタンをクリックするとリストが表示される", () => {
    const button = document.getElementById("showList");
    const result = document.getElementById("result");

    button.click();

    // ul要素が含まれているかチェック
    const ul = result.querySelector("ul");
    expect(ul).toBeTruthy();
    expect(ul.children.length).toBeGreaterThan(0);
  });
});
