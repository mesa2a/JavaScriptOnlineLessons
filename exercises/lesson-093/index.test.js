import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Lesson 093: 配列の検索", () => {
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

  it("検索入力欄が存在する", () => {
    const input = document.getElementById("searchInput");
    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
  });

  it("検索ボタンが存在する", () => {
    const button = document.getElementById("searchButton");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("結果表示エリアが存在する", () => {
    const result = document.getElementById("result");
    expect(result).toBeTruthy();
  });

  it("検索ボタンをクリックすると結果が表示される", () => {
    const input = document.getElementById("searchInput");
    const button = document.getElementById("searchButton");
    const result = document.getElementById("result");

    input.value = "りんご";
    button.click();

    expect(result.textContent).toBeTruthy();
    expect(result.textContent.length).toBeGreaterThan(0);
  });

  it("見つかった場合はインデックスが表示される", () => {
    const input = document.getElementById("searchInput");
    const button = document.getElementById("searchButton");
    const result = document.getElementById("result");

    input.value = "りんご";
    button.click();

    expect(result.textContent).toMatch(/インデックス|見つかりました/);
  });

  it("見つからなかった場合はメッセージが表示される", () => {
    const input = document.getElementById("searchInput");
    const button = document.getElementById("searchButton");
    const result = document.getElementById("result");

    input.value = "存在しないフルーツ";
    button.click();

    expect(result.textContent).toMatch(/見つかりませんでした|ありません/);
  });
});
