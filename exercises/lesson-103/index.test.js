import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Lesson 103: タスク削除", () => {
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

  it("URL入力欄が存在する", () => {
    const input = document.getElementById("urlInput");
    expect(input).toBeTruthy();
  });

  it("タイトル入力欄が存在する", () => {
    const input = document.getElementById("titleInput");
    expect(input).toBeTruthy();
  });

  it("すべて削除ボタンが存在する", () => {
    const button = document.getElementById("clearAll");
    expect(button).toBeTruthy();
  });

  it("ブックマークリスト表示エリアが存在する", () => {
    const element = document.getElementById("bookmarkList");
    expect(element).toBeTruthy();
  });
});
