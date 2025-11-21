// 割引後の価格を計算する関数（ローカル変数を使用）
function calculateDiscount(price, rate) {
  // ローカル変数（この関数の中でのみ使える）
  const discount = price * (rate / 100);
  const finalPrice = price - discount;

  return finalPrice;
}

// 計算ボタンがクリックされたときの処理
function calculate() {
  const price = Number(document.getElementById('priceInput').value);
  const rate = Number(document.getElementById('rateInput').value);

  // 入力チェック
  if (price <= 0 || rate < 0 || rate > 100) {
    document.getElementById('output').textContent = '正しい値を入力してください';
    return;
  }

  const result = calculateDiscount(price, rate);

  document.getElementById('output').textContent = '割引後: ¥' + Math.floor(result);
}

// ローカル変数の説明：
// - calculateDiscount関数内のdiscountとfinalPriceは、この関数の中でのみ使える
// - calculate関数内のpriceとrateも、この関数の中でのみ使える
// - 各関数のローカル変数は、他の関数からアクセスできない
// - これにより、関数が独立して動作し、予期しない変更を防げる
