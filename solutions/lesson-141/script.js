let user = {
  username: "taro123",
  email: "taro@example.com",
  age: 28,
  premium: false
};

// 1. 参照コピーを作成
let userRef = user;
userRef.username = "modified_taro";

let referenceResult = document.getElementById("referenceResult");
let html1 = '<div class="warning">';
html1 = html1 + "<strong>警告:</strong> 参照コピーでは元のオブジェクトも変更されます<br>";
html1 = html1 + "元のユーザー名: " + user.username + "<br>";
html1 = html1 + "参照コピーのユーザー名: " + userRef.username;
html1 = html1 + "</div>";
referenceResult.innerHTML = html1;

// 元に戻す
user.username = "taro123";

// 2. Object.assign()を使って独立したコピーを作成
let userAssign = Object.assign({}, user);
userAssign.email = "changed@example.com";

let assignResult = document.getElementById("assignResult");
let html2 = '<div class="success">';
html2 = html2 + "<strong>成功:</strong> Object.assign()で独立したコピーが作成されました<br>";
html2 = html2 + "元のメール: " + user.email + "<br>";
html2 = html2 + "コピーのメール: " + userAssign.email;
html2 = html2 + "</div>";
assignResult.innerHTML = html2;

// 元に戻す
userAssign.email = "taro@example.com";

// 3. スプレッド構文を使ってコピーを作成
let userSpread = { ...user };
userSpread.age = 30;

let spreadResult = document.getElementById("spreadResult");
let html3 = '<div class="success">';
html3 = html3 + "<strong>成功:</strong> スプレッド構文で独立したコピーが作成されました<br>";
html3 = html3 + "元の年齢: " + user.age + "<br>";
html3 = html3 + "コピーの年齢: " + userSpread.age;
html3 = html3 + "</div>";
spreadResult.innerHTML = html3;

// 元に戻す
userSpread.age = 28;

// 4. スプレッド構文を使って、premiumをtrueにしたコピーを作成
let premiumUser = { ...user, premium: true };

let upgradeResult = document.getElementById("upgradeResult");
let html4 = '<div class="success">';
html4 = html4 + "<strong>成功:</strong> プロパティを上書きしたコピーが作成されました<br>";
html4 = html4 + "元のプレミアムステータス: " + user.premium + "<br>";
html4 = html4 + "アップグレード後: " + premiumUser.premium;
html4 = html4 + "</div>";
upgradeResult.innerHTML = html4;

// 5. すべてのユーザーをHTMLカードとして表示
function createUserCard(user, title) {
  let html = '<div class="user-card">';
  html = html + "<h3>" + title + "</h3>";
  html = html + '<div class="property"><strong>Username:</strong> ' + user.username + "</div>";
  html = html + '<div class="property"><strong>Email:</strong> ' + user.email + "</div>";
  html = html + '<div class="property"><strong>Age:</strong> ' + user.age + "</div>";
  html = html + '<div class="property"><strong>Premium:</strong> ' + user.premium;

  if (user.premium) {
    html = html + ' <span class="badge badge-premium">PREMIUM</span>';
  } else {
    html = html + ' <span class="badge badge-normal">NORMAL</span>';
  }

  html = html + "</div>";
  html = html + "</div>";
  return html;
}

let allUsers = document.getElementById("allUsers");
let html5 = "";
html5 = html5 + createUserCard(user, "1. 元のユーザー");
html5 = html5 + createUserCard(userRef, "2. 参照コピー（同じオブジェクト）");
html5 = html5 + createUserCard(userAssign, "3. Object.assign()コピー");
html5 = html5 + createUserCard(userSpread, "4. スプレッド構文コピー");
html5 = html5 + createUserCard(premiumUser, "5. プレミアムユーザー");
allUsers.innerHTML = html5;
