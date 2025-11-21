import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Lesson 102: タスク表示", () => {
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

  it("科目名入力欄が存在する", () => {
    const input = document.getElementById("subjectInput");
    expect(input).toBeTruthy();
  });

  it("学習時間入力欄が存在する", () => {
    const input = document.getElementById("minutesInput");
    expect(input).toBeTruthy();
  });

  it("記録リスト表示エリアが存在する", () => {
    const element = document.getElementById("recordList");
    expect(element).toBeTruthy();
  });

  it("合計時間表示エリアが存在する", () => {
    const element = document.getElementById("totalMinutes");
    expect(element).toBeTruthy();
  });
});
