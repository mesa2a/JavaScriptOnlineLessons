// 元のユーザーオブジェクト
let user = {
  // ここにプロパティを追加してください
  // username: "taro123",
  // email: "taro@example.com",
  // age: 28,
  // premium: false
};

// 1. 参照コピーを作成
// ヒント: let userRef = user;
// userRef.username を変更して、元の user.username も変わることを確認


// 結果を表示
let referenceResult = document.getElementById("referenceResult");
// 元のuserと参照コピーのusernameを表示
// "元のユーザー名: ..." と "参照コピーのユーザー名: ..." を表示


// 2. Object.assign()を使って独立したコピーを作成
// ヒント: let userAssign = Object.assign({}, user);
// userAssign.email を変更しても、元の user.email は変わらないことを確認


// 結果を表示
let assignResult = document.getElementById("assignResult");
// 元のuserとObject.assign()コピーのemailを表示


// 3. スプレッド構文を使ってコピーを作成
// ヒント: let userSpread = { ...user };
// userSpread.age を変更しても、元の user.age は変わらないことを確認


// 結果を表示
let spreadResult = document.getElementById("spreadResult");
// 元のuserとスプレッドコピーのageを表示


// 4. スプレッド構文を使って、premiumをtrueにしたコピーを作成
// ヒント: let premiumUser = { ...user, premium: true };


// 結果を表示
let upgradeResult = document.getElementById("upgradeResult");
// 元のuserとpremiumUserのpremiumステータスを表示


// 5. すべてのユーザーをHTMLカードとして表示
// ヒント: user, userRef, userAssign, userSpread, premiumUser を配列に入れて
// forループで表示


// ユーザーカードを作成する関数（ヒント用）
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
// ここに5つのユーザーカードを表示
