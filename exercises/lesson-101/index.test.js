import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Lesson 101: タスク追加", () => {
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

  it("タイトル入力欄が存在する", () => {
    const input = document.getElementById("titleInput");
    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
  });

  it("著者名入力欄が存在する", () => {
    const input = document.getElementById("authorInput");
    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
  });

  it("追加ボタンが存在する", () => {
    const button = document.getElementById("addButton");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("本の冊数表示エリアが存在する", () => {
    const element = document.getElementById("bookCount");
    expect(element).toBeTruthy();
  });

  it("本リスト表示エリアが存在する", () => {
    const element = document.getElementById("bookList");
    expect(element).toBeTruthy();
  });
});
