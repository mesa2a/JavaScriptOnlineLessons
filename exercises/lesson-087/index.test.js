import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Lesson 087: 要素にアクセス", () => {
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

  it("最初の要素ボタンが存在する", () => {
    const button = document.getElementById("showFirst");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("最後の要素ボタンが存在する", () => {
    const button = document.getElementById("showLast");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("すべての要素ボタンが存在する", () => {
    const button = document.getElementById("showAll");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("結果表示エリアが存在する", () => {
    const result = document.getElementById("result");
    expect(result).toBeTruthy();
  });

  it("最初の要素ボタンをクリックすると最初の要素が表示される", () => {
    const button = document.getElementById("showFirst");
    const result = document.getElementById("result");

    button.click();

    expect(result.textContent).toBeTruthy();
    expect(result.textContent).toMatch(/最初/);
  });

  it("最後の要素ボタンをクリックすると最後の要素が表示される", () => {
    const button = document.getElementById("showLast");
    const result = document.getElementById("result");

    button.click();

    expect(result.textContent).toBeTruthy();
    expect(result.textContent).toMatch(/最後/);
  });

  it("すべての要素ボタンをクリックするとすべての要素が表示される", () => {
    const button = document.getElementById("showAll");
    const result = document.getElementById("result");

    button.click();

    expect(result.textContent).toBeTruthy();
    // インデックスという文字が含まれることを確認
    expect(result.textContent).toMatch(/インデックス|0|1|2/);
  });
});
