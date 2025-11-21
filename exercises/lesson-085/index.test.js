import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Lesson 085: タイピングゲーム", () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const html = readFileSync(join(__dirname, "index.html"), "utf-8");
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    document = dom.window.document;
    window = dom.window;

    const scriptContent = readFileSync(join(__dirname, "script.js"), "utf-8");
    const scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);
  });

  it("スタートボタンが存在する", () => {
    const startButton = document.getElementById("start");
    expect(startButton).toBeTruthy();
    expect(startButton.tagName).toBe("BUTTON");
  });

  it("単語表示エリアが存在する", () => {
    const wordDisplay = document.getElementById("word");
    expect(wordDisplay).toBeTruthy();
  });

  it("入力欄が存在する", () => {
    const userInput = document.getElementById("userInput");
    expect(userInput).toBeTruthy();
    expect(userInput.tagName).toBe("INPUT");
  });

  it("残り時間の表示が存在する", () => {
    const timeDisplay = document.getElementById("time");
    expect(timeDisplay).toBeTruthy();
  });

  it("スコアの表示が存在する", () => {
    const scoreDisplay = document.getElementById("score");
    expect(scoreDisplay).toBeTruthy();
  });

  it("スタートボタンをクリックすると単語が表示される", () => {
    const startButton = document.getElementById("start");
    const wordDisplay = document.getElementById("word");

    startButton.click();

    expect(wordDisplay.textContent).toBeTruthy();
    expect(wordDisplay.textContent.length).toBeGreaterThan(0);
  });

  it("初期状態で入力欄が無効化されている", () => {
    const userInput = document.getElementById("userInput");
    expect(userInput.disabled).toBe(true);
  });

  it("ゲーム開始時に入力欄が有効化される", () => {
    const startButton = document.getElementById("start");
    const userInput = document.getElementById("userInput");

    startButton.click();

    expect(userInput.disabled).toBe(false);
  });
});
