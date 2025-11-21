import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Lesson 100: リストの更新", () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "index.html"),
      "utf-8"
    );
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    document = dom.window.document;
    window = dom.window;
  });

  it("メモ入力欄が存在する", () => {
    const input = document.getElementById("memoInput");
    expect(input).toBeTruthy();
    expect(input.tagName).toBe("TEXTAREA");
  });

  it("追加ボタンが存在する", () => {
    const button = document.getElementById("addButton");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("新しい順ボタンが存在する", () => {
    const button = document.getElementById("sortNewest");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("古い順ボタンが存在する", () => {
    const button = document.getElementById("sortOldest");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("メモリスト表示エリアが存在する", () => {
    const container = document.getElementById("memoList");
    expect(container).toBeTruthy();
  });
});
