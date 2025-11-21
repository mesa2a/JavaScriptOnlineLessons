import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Lesson 106: フィルタリング", () => {
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
    const button = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    expect(input).not.toBeNull();
    expect(button).not.toBeNull();
  });

  it("フィルタボタンが3つ表示される", () => {
    const buttons = app.querySelectorAll("button");
    const filterButtons = Array.from(buttons).filter(
      (btn) =>
        btn.textContent.includes("全て") ||
        btn.textContent.includes("未購入") ||
        btn.textContent.includes("購入済み")
    );

    expect(filterButtons.length).toBeGreaterThanOrEqual(3);
  });

  it("商品を追加できる", () => {
    const input = app.querySelector('input[type="text"]');
    const addButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    input.value = "りんご";
    addButton.click();

    const items = app.querySelectorAll("span");
    const itemTexts = Array.from(items).map((item) => item.textContent);

    expect(itemTexts).toContain("りんご");
  });

  it("「全て」ボタンで全商品が表示される", () => {
    const input = app.querySelector('input[type="text"]');
    const addButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    input.value = "りんご";
    addButton.click();

    input.value = "バナナ";
    addButton.click();

    const allButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("全て")
    );
    allButton.click();

    const items = app.querySelectorAll("span");
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  it("「購入済み」ボタンで購入済み商品のみ表示される", () => {
    const input = app.querySelector('input[type="text"]');
    const addButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    input.value = "りんご";
    addButton.click();

    input.value = "バナナ";
    addButton.click();

    // 最初の商品を購入済みにする
    const checkboxes = app.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].click();

    const completedButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("購入済み")
    );
    completedButton.click();

    const items = app.querySelectorAll("span");
    const itemTexts = Array.from(items).map((item) => item.textContent);

    expect(itemTexts).toContain("りんご");
    expect(itemTexts).not.toContain("バナナ");
  });

  it("「未購入」ボタンで未購入商品のみ表示される", () => {
    const input = app.querySelector('input[type="text"]');
    const addButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    input.value = "りんご";
    addButton.click();

    input.value = "バナナ";
    addButton.click();

    // 最初の商品を購入済みにする
    const checkboxes = app.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].click();

    const activeButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("未購入")
    );
    activeButton.click();

    const items = app.querySelectorAll("span");
    const itemTexts = Array.from(items).map((item) => item.textContent);

    expect(itemTexts).not.toContain("りんご");
    expect(itemTexts).toContain("バナナ");
  });

  it("選択中のフィルタボタンがハイライトされる", () => {
    const completedButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("購入済み")
    );

    completedButton.click();

    expect(completedButton.classList.contains("active")).toBe(true);
  });

  it("フィルタを切り替えると前のボタンのハイライトが消える", () => {
    const allButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("全て")
    );
    const completedButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("購入済み")
    );

    allButton.click();
    expect(allButton.classList.contains("active")).toBe(true);

    completedButton.click();
    expect(allButton.classList.contains("active")).toBe(false);
    expect(completedButton.classList.contains("active")).toBe(true);
  });

  it("削除ボタンで商品を削除できる", () => {
    const input = app.querySelector('input[type="text"]');
    const addButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    input.value = "りんご";
    addButton.click();

    const deleteButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("削除")
    );

    deleteButton.click();

    const items = app.querySelectorAll("span");
    const itemTexts = Array.from(items).map((item) => item.textContent);
    expect(itemTexts).not.toContain("りんご");
  });

  it("空の入力では追加できない", () => {
    const input = app.querySelector('input[type="text"]');
    const button = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    const initialCount = app.querySelectorAll("span").length;

    input.value = "";
    button.click();

    const finalCount = app.querySelectorAll("span").length;
    expect(finalCount).toBe(initialCount);
  });
});
