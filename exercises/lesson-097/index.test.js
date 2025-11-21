import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Lesson 097: 単語帳アプリ", () => {
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

  it("英単語入力欄が存在する", () => {
    const input = document.getElementById("englishInput");
    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
  });

  it("日本語訳入力欄が存在する", () => {
    const input = document.getElementById("japaneseInput");
    expect(input).toBeTruthy();
    expect(input.tagName).toBe("INPUT");
  });

  it("追加ボタンが存在する", () => {
    const button = document.getElementById("addButton");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
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

  it("検索結果表示エリアが存在する", () => {
    const element = document.getElementById("searchResult");
    expect(element).toBeTruthy();
  });

  it("単語数表示エリアが存在する", () => {
    const element = document.getElementById("wordCount");
    expect(element).toBeTruthy();
  });

  it("単語リスト表示エリアが存在する", () => {
    const element = document.getElementById("wordList");
    expect(element).toBeTruthy();
  });
});
