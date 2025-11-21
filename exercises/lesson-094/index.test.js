import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Lesson 094: 配列の集計", () => {
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

  it("合計計算ボタンが存在する", () => {
    const button = document.getElementById("calcSum");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("平均計算ボタンが存在する", () => {
    const button = document.getElementById("calcAverage");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("最大値検索ボタンが存在する", () => {
    const button = document.getElementById("calcMax");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("最小値検索ボタンが存在する", () => {
    const button = document.getElementById("calcMin");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("すべて計算ボタンが存在する", () => {
    const button = document.getElementById("calcAll");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("結果表示エリアが存在する", () => {
    const result = document.getElementById("result");
    expect(result).toBeTruthy();
  });

  it("合計ボタンをクリックすると合計が表示される", () => {
    const button = document.getElementById("calcSum");
    const result = document.getElementById("result");

    button.click();

    expect(result.textContent).toBeTruthy();
    expect(result.textContent).toMatch(/合計/);
  });

  it("平均ボタンをクリックすると平均が表示される", () => {
    const button = document.getElementById("calcAverage");
    const result = document.getElementById("result");

    button.click();

    expect(result.textContent).toBeTruthy();
    expect(result.textContent).toMatch(/平均/);
  });

  it("最大値ボタンをクリックすると最大値が表示される", () => {
    const button = document.getElementById("calcMax");
    const result = document.getElementById("result");

    button.click();

    expect(result.textContent).toBeTruthy();
    expect(result.textContent).toMatch(/最大|最高/);
  });

  it("最小値ボタンをクリックすると最小値が表示される", () => {
    const button = document.getElementById("calcMin");
    const result = document.getElementById("result");

    button.click();

    expect(result.textContent).toBeTruthy();
    expect(result.textContent).toMatch(/最小|最低/);
  });
});
