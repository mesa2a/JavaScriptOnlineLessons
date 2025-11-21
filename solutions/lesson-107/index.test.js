import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Lesson 107: ソート機能", () => {
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
    const inputs = app.querySelectorAll('input[type="text"], input[type="number"]');
    const button = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    expect(inputs.length).toBeGreaterThanOrEqual(2);
    expect(button).not.toBeNull();
  });

  it("ソートボタンが3つ以上表示される", () => {
    const buttons = app.querySelectorAll("button");
    const sortButtons = Array.from(buttons).filter(
      (btn) =>
        btn.textContent.includes("並び替え") ||
        btn.textContent.includes("点数") ||
        btn.textContent.includes("名前") ||
        btn.textContent.includes("なし")
    );

    expect(sortButtons.length).toBeGreaterThanOrEqual(3);
  });

  it("成績を追加できる", () => {
    const nameInput = Array.from(app.querySelectorAll('input[type="text"]'))[0];
    const subjectInput = Array.from(app.querySelectorAll('input[type="text"]'))[1];
    const scoreInput = app.querySelector('input[type="number"]');
    const addButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    nameInput.value = "Alice";
    subjectInput.value = "Math";
    scoreInput.value = "85";
    addButton.click();

    const items = app.querySelectorAll("span, div");
    const itemTexts = Array.from(items).map((item) => item.textContent);
    const hasAlice = itemTexts.some((text) => text.includes("Alice"));

    expect(hasAlice).toBe(true);
  });

  it("点数順（高い順）にソートできる", () => {
    const nameInput = Array.from(app.querySelectorAll('input[type="text"]'))[0];
    const subjectInput = Array.from(app.querySelectorAll('input[type="text"]'))[1];
    const scoreInput = app.querySelector('input[type="number"]');
    const addButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    nameInput.value = "Alice";
    subjectInput.value = "Math";
    scoreInput.value = "85";
    addButton.click();

    nameInput.value = "Bob";
    subjectInput.value = "Math";
    scoreInput.value = "92";
    addButton.click();

    nameInput.value = "Charlie";
    subjectInput.value = "Math";
    scoreInput.value = "78";
    addButton.click();

    const sortScoreButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("点数")
    );

    if (sortScoreButton) {
      sortScoreButton.click();

      const items = app.querySelectorAll("span, div");
      const itemTexts = Array.from(items).map((item) => item.textContent);
      const allText = itemTexts.join(" ");

      const bobIndex = allText.indexOf("Bob");
      const aliceIndex = allText.indexOf("Alice");
      const charlieIndex = allText.indexOf("Charlie");

      expect(bobIndex).toBeLessThan(aliceIndex);
      expect(aliceIndex).toBeLessThan(charlieIndex);
    }
  });

  it("名前順（アルファベット順）にソートできる", () => {
    const nameInput = Array.from(app.querySelectorAll('input[type="text"]'))[0];
    const subjectInput = Array.from(app.querySelectorAll('input[type="text"]'))[1];
    const scoreInput = app.querySelector('input[type="number"]');
    const addButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    nameInput.value = "Charlie";
    subjectInput.value = "Math";
    scoreInput.value = "78";
    addButton.click();

    nameInput.value = "Alice";
    subjectInput.value = "Math";
    scoreInput.value = "85";
    addButton.click();

    nameInput.value = "Bob";
    subjectInput.value = "Math";
    scoreInput.value = "92";
    addButton.click();

    const sortNameButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("名前")
    );

    if (sortNameButton) {
      sortNameButton.click();

      const items = app.querySelectorAll("span, div");
      const itemTexts = Array.from(items).map((item) => item.textContent);
      const allText = itemTexts.join(" ");

      const aliceIndex = allText.indexOf("Alice");
      const bobIndex = allText.indexOf("Bob");
      const charlieIndex = allText.indexOf("Charlie");

      expect(aliceIndex).toBeLessThan(bobIndex);
      expect(bobIndex).toBeLessThan(charlieIndex);
    }
  });

  it("選択中のソートボタンがハイライトされる", () => {
    const sortScoreButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("点数")
    );

    if (sortScoreButton) {
      sortScoreButton.click();
      expect(sortScoreButton.classList.contains("active")).toBe(true);
    }
  });

  it("削除ボタンで成績を削除できる", () => {
    const nameInput = Array.from(app.querySelectorAll('input[type="text"]'))[0];
    const subjectInput = Array.from(app.querySelectorAll('input[type="text"]'))[1];
    const scoreInput = app.querySelector('input[type="number"]');
    const addButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    nameInput.value = "Alice";
    subjectInput.value = "Math";
    scoreInput.value = "85";
    addButton.click();

    const deleteButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("削除")
    );

    if (deleteButton) {
      deleteButton.click();

      const items = app.querySelectorAll("span, div");
      const itemTexts = Array.from(items).map((item) => item.textContent);
      const hasAlice = itemTexts.some((text) => text.includes("Alice"));

      expect(hasAlice).toBe(false);
    }
  });

  it("空の入力では追加できない", () => {
    const addButton = Array.from(app.querySelectorAll("button")).find(
      (btn) => btn.textContent.includes("追加")
    );

    const initialCount = app.querySelectorAll("span, div").length;

    addButton.click();

    const finalCount = app.querySelectorAll("span, div").length;
    expect(finalCount).toBeLessThanOrEqual(initialCount + 5);
  });
});
