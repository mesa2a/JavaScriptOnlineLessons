import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Lesson 096: 配列の結合", () => {
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

  it("前菜入力欄が存在する", () => {
    const input = document.getElementById("appetizerInput");
    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
  });

  it("メイン入力欄が存在する", () => {
    const input = document.getElementById("mainInput");
    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
  });

  it("デザート入力欄が存在する", () => {
    const input = document.getElementById("dessertInput");
    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
  });

  it("フルコース表示ボタンが存在する", () => {
    const button = document.getElementById("showFullCourse");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("フルコース表示エリアが存在する", () => {
    const element = document.getElementById("fullCourse");
    expect(element).toBeTruthy();
  });
});
