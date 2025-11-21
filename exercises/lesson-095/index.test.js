import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Lesson 095: 配列のコピー", () => {
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

  it("+1ボタンが存在する", () => {
    const button = document.getElementById("incrementButton");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("保存ボタンが存在する", () => {
    const button = document.getElementById("saveButton");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("現在の値を表示する要素が存在する", () => {
    const element = document.getElementById("current");
    expect(element).toBeTruthy();
  });

  it("平均値を表示する要素が存在する", () => {
    const element = document.getElementById("average");
    expect(element).toBeTruthy();
  });

  it("履歴を表示する要素が存在する", () => {
    const element = document.getElementById("historyList");
    expect(element).toBeTruthy();
  });
});
