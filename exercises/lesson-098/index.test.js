import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Lesson 098: 配列から表示", () => {
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

  it("すべて表示ボタンが存在する", () => {
    const button = document.getElementById("showAll");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("合格者のみ表示ボタンが存在する", () => {
    const button = document.getElementById("showPassed");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("学生リスト表示エリアが存在する", () => {
    const element = document.getElementById("studentList");
    expect(element).toBeTruthy();
  });
});
