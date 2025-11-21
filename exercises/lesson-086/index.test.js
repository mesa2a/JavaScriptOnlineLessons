import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Lesson 086: 配列を作る", () => {
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

  it("ボタンが存在する", () => {
    const button = document.getElementById("showFruits");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("結果表示エリアが存在する", () => {
    const result = document.getElementById("result");
    expect(result).toBeTruthy();
  });

  it("ボタンをクリックすると配列が表示される", () => {
    const button = document.getElementById("showFruits");
    const result = document.getElementById("result");

    button.click();

    expect(result.textContent).toBeTruthy();
    expect(result.textContent.length).toBeGreaterThan(0);
  });

  it("配列の要素数が表示される", () => {
    const button = document.getElementById("showFruits");
    const result = document.getElementById("result");

    button.click();

    // 「個」または「件」という文字が含まれていることを確認
    expect(result.textContent).toMatch(/個|件/);
  });

  it("配列に少なくとも3つの要素がある", () => {
    const button = document.getElementById("showFruits");
    const result = document.getElementById("result");

    button.click();

    // カンマで区切られた要素が3つ以上あることを確認
    const commaCount = (result.textContent.match(/,/g) || []).length;
    expect(commaCount).toBeGreaterThanOrEqual(2); // 3要素なら2つのカンマ
  });
});
