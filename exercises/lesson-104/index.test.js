import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Lesson 104: オブジェクト配列", () => {
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

  it("名前入力欄が存在する", () => {
    const input = document.getElementById("nameInput");
    expect(input).toBeTruthy();
  });

  it("電話番号入力欄が存在する", () => {
    const input = document.getElementById("phoneInput");
    expect(input).toBeTruthy();
  });

  it("メールアドレス入力欄が存在する", () => {
    const input = document.getElementById("emailInput");
    expect(input).toBeTruthy();
  });

  it("連絡先リスト表示エリアが存在する", () => {
    const element = document.getElementById("contactList");
    expect(element).toBeTruthy();
  });
});
