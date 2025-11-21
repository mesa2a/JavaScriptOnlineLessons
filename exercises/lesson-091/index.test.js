import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Lesson 091: 配列の長さ", () => {
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

  it("状態表示エリアが存在する", () => {
    const status = document.getElementById("status");
    expect(status).toBeTruthy();
  });

  it("追加ボタンが存在する", () => {
    const button = document.getElementById("add");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("削除ボタンが存在する", () => {
    const button = document.getElementById("remove");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("全削除ボタンが存在する", () => {
    const button = document.getElementById("clear");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("入力欄が存在する", () => {
    const input = document.getElementById("newItem");
    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
  });

  it("初期状態で要素数が表示される", () => {
    const count = document.getElementById("count");
    expect(count.textContent).toBeTruthy();
    expect(Number(count.textContent)).toBeGreaterThanOrEqual(0);
  });

  it("初期状態で状態が表示される", () => {
    const status = document.getElementById("status");
    expect(status.textContent).toBeTruthy();
  });

  it("全削除ボタンをクリックすると配列が空になる", () => {
    const button = document.getElementById("clear");
    const count = document.getElementById("count");

    button.click();

    expect(count.textContent).toBe("0");
  });
});
