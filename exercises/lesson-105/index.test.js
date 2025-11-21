import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Lesson 105: 状態管理", () => {
  let dom;
  let document;
  let window;
  let app;

  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "index.html"),
      "utf-8"
    );

    dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: "usable",
    });

    document = dom.window.document;
    window = dom.window;

    const scriptContent = fs.readFileSync(
      path.resolve(__dirname, "script.js"),
      "utf-8"
    );

    const scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);

    app = document.getElementById("app");
  });

  it("入力欄と追加ボタンが表示される", () => {
    const input = app.querySelector('input[type="text"]');
    const button = app.querySelector("button");

    expect(input).not.toBeNull();
    expect(button).not.toBeNull();
    expect(button.textContent).toContain("追加");
  });

  it("本を追加できる", () => {
    const input = app.querySelector('input[type="text"]');
    const button = app.querySelector("button");

    input.value = "ハリー・ポッター";
    button.click();

    const items = app.querySelectorAll("span");
    const bookTexts = Array.from(items).map((item) => item.textContent);

    expect(bookTexts).toContain("ハリー・ポッター");
  });

  it("追加した本にチェックボックスが表示される", () => {
    const input = app.querySelector('input[type="text"]');
    const button = app.querySelector("button");

    input.value = "ハリー・ポッター";
    button.click();

    const checkbox = app.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeNull();
    expect(checkbox.checked).toBe(false);
  });

  it("チェックボックスをクリックすると状態が切り替わる", () => {
    const input = app.querySelector('input[type="text"]');
    const button = app.querySelector("button");

    input.value = "ハリー・ポッター";
    button.click();

    let checkbox = app.querySelector('input[type="checkbox"]');
    expect(checkbox.checked).toBe(false);

    checkbox.click();

    checkbox = app.querySelector('input[type="checkbox"]');
    expect(checkbox.checked).toBe(true);
  });

  it("読了済みの本は取り消し線が表示される", () => {
    const input = app.querySelector('input[type="text"]');
    const button = app.querySelector("button");

    input.value = "ハリー・ポッター";
    button.click();

    const checkbox = app.querySelector('input[type="checkbox"]');
    checkbox.click();

    const span = app.querySelector("span");
    expect(span.classList.contains("completed")).toBe(true);
  });

  it("複数の本を追加できる", () => {
    const input = app.querySelector('input[type="text"]');
    const button = app.querySelector("button");

    input.value = "ハリー・ポッター";
    button.click();

    input.value = "指輪物語";
    button.click();

    input.value = "ナルニア国物語";
    button.click();

    const items = app.querySelectorAll("span");
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  it("各本の読了状態を独立して管理できる", () => {
    const input = app.querySelector('input[type="text"]');
    const button = app.querySelector("button");

    input.value = "本A";
    button.click();

    input.value = "本B";
    button.click();

    const checkboxes = app.querySelectorAll('input[type="checkbox"]');

    checkboxes[0].click();

    const updatedCheckboxes = app.querySelectorAll('input[type="checkbox"]');
    expect(updatedCheckboxes[0].checked).toBe(true);
    expect(updatedCheckboxes[1].checked).toBe(false);
  });

  it("削除ボタンで本を削除できる", () => {
    const input = app.querySelector('input[type="text"]');
    const addButton = app.querySelector("button");

    input.value = "ハリー・ポッター";
    addButton.click();

    const deleteButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("削除")
    );

    expect(deleteButton).not.toBeNull();

    deleteButton.click();

    const items = app.querySelectorAll("span");
    const bookTexts = Array.from(items).map((item) => item.textContent);
    expect(bookTexts).not.toContain("ハリー・ポッター");
  });

  it("空の入力では追加できない", () => {
    const input = app.querySelector('input[type="text"]');
    const button = app.querySelector("button");

    const initialCount = app.querySelectorAll("span").length;

    input.value = "";
    button.click();

    const finalCount = app.querySelectorAll("span").length;
    expect(finalCount).toBe(initialCount);
  });
});
