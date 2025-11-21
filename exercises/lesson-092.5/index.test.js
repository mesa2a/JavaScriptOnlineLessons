import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Lesson 092.5: for...of文", () => {
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

  it("for...of表示ボタンが存在する", () => {
    const button = document.getElementById("forOfExample");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("通常のfor表示ボタンが存在する", () => {
    const button = document.getElementById("forExample");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("for...of合計ボタンが存在する", () => {
    const button = document.getElementById("sumForOf");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("通常のfor合計ボタンが存在する", () => {
    const button = document.getElementById("sumFor");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("for...of結果表示エリアが存在する", () => {
    const result = document.getElementById("forOfResult");
    expect(result).toBeTruthy();
  });

  it("通常のfor結果表示エリアが存在する", () => {
    const result = document.getElementById("forResult");
    expect(result).toBeTruthy();
  });

  it("合計結果表示エリアが存在する", () => {
    const result = document.getElementById("sumResult");
    expect(result).toBeTruthy();
  });

  it("for...of表示ボタンをクリックすると要素が表示される", () => {
    const button = document.getElementById("forOfExample");
    const result = document.getElementById("forOfResult");

    button.click();

    expect(result.children.length).toBeGreaterThan(0);
  });

  it("通常のfor表示ボタンをクリックすると番号付きで表示される", () => {
    const button = document.getElementById("forExample");
    const result = document.getElementById("forResult");

    button.click();

    expect(result.children.length).toBeGreaterThan(0);
    expect(result.textContent).toMatch(/1\.|2\./);
  });

  it("for...of合計ボタンをクリックすると合計が表示される", () => {
    const button = document.getElementById("sumForOf");
    const result = document.getElementById("sumResult");

    button.click();

    expect(result.textContent).toBeTruthy();
    expect(result.textContent).toMatch(/合計/);
  });
});
