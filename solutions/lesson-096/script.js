let appetizers = [];
let mains = [];
let desserts = [];

let appetizerInput = document.getElementById("appetizerInput");
let addAppetizerButton = document.getElementById("addAppetizer");
let appetizerListDiv = document.getElementById("appetizerList");

let mainInput = document.getElementById("mainInput");
let addMainButton = document.getElementById("addMain");
let mainListDiv = document.getElementById("mainList");

let dessertInput = document.getElementById("dessertInput");
let addDessertButton = document.getElementById("addDessert");
let dessertListDiv = document.getElementById("dessertList");

let showFullCourseButton = document.getElementById("showFullCourse");
let fullCourseDiv = document.getElementById("fullCourse");

addAppetizerButton.addEventListener("click", function() {
  let menu = appetizerInput.value;
  if (menu === "") return;

  appetizers.push(menu);
  appetizerInput.value = "";
  showAppetizerList();
});

addMainButton.addEventListener("click", function() {
  let menu = mainInput.value;
  if (menu === "") return;

  mains.push(menu);
  mainInput.value = "";
  showMainList();
});

addDessertButton.addEventListener("click", function() {
  let menu = dessertInput.value;
  if (menu === "") return;

  desserts.push(menu);
  dessertInput.value = "";
  showDessertList();
});

showFullCourseButton.addEventListener("click", function() {
  // 3つの配列を結合
  let fullCourse = appetizers.concat(mains).concat(desserts);
  showFullCourse(fullCourse);
});

function showAppetizerList() {
  appetizerListDiv.innerHTML = "<p>前菜: " + appetizers.length + "品</p>";
  if (appetizers.length === 0) return;

  let html = "<ul>";
  for (let menu of appetizers) {
    html += "<li>🥗 " + menu + "</li>";
  }
  html += "</ul>";
  appetizerListDiv.innerHTML += html;
}

function showMainList() {
  mainListDiv.innerHTML = "<p>メイン: " + mains.length + "品</p>";
  if (mains.length === 0) return;

  let html = "<ul>";
  for (let menu of mains) {
    html += "<li>🍖 " + menu + "</li>";
  }
  html += "</ul>";
  mainListDiv.innerHTML += html;
}

function showDessertList() {
  dessertListDiv.innerHTML = "<p>デザート: " + desserts.length + "品</p>";
  if (desserts.length === 0) return;

  let html = "<ul>";
  for (let menu of desserts) {
    html += "<li>🍰 " + menu + "</li>";
  }
  html += "</ul>";
  dessertListDiv.innerHTML += html;
}

function showFullCourse(fullCourse) {
  let total = fullCourse.length;
  fullCourseDiv.innerHTML = "<h3>全 " + total + " 品のコース</h3>";

  if (total === 0) {
    fullCourseDiv.innerHTML += "<p>（メニューなし）</p>";
    return;
  }

  fullCourseDiv.innerHTML += "<p>前菜: " + appetizers.length + "品 / ";
  fullCourseDiv.innerHTML += "メイン: " + mains.length + "品 / ";
  fullCourseDiv.innerHTML += "デザート: " + desserts.length + "品</p>";

  let html = "<ol>";

  // 前菜を表示
  for (let menu of appetizers) {
    html += "<li>🥗 " + menu + "</li>";
  }

  // メインを表示
  for (let menu of mains) {
    html += "<li>🍖 " + menu + "</li>";
  }

  // デザートを表示
  for (let menu of desserts) {
    html += "<li>🍰 " + menu + "</li>";
  }

  html += "</ol>";
  fullCourseDiv.innerHTML += html;
}

showAppetizerList();
showMainList();
showDessertList();
