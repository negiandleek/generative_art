const canvasWidth = 1200
const canvasHeight = 800

function setup() {
  createCanvas(canvasWidth, canvasHeight); // キャンバスサイズを指定
}

function draw() {
  let numCircles = 100; // 描画する円の数
  let centerX = canvasWidth / 2;
  let centerY = canvasHeight / 2;; // 中心点のy座標
  let radius = 100; // 円の半径

  noFill(); // 輪郭線のfillを透明に
  stroke(0); // 輪郭線の色を黒に

  for (let i = 0; i < numCircles; i++) {
    let angle = map(i, 0, numCircles, 0, TWO_PI); // 角度を計算
    let x = centerX + cos(angle) * radius; // x座標を計算
    let y = centerY + sin(angle) * radius; // y座標を計算
    ellipse(x, y, 100); // 円を描画
  }
}
