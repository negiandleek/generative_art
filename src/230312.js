const canvasWidth = 1200
const canvasHeight = 800
const numCircles = 100; // 描画する円の数
let centerX = canvasWidth / 2;
let centerY = canvasHeight / 2; // 中心点のy座標
const radius = 100; // 円の半径
let randomX = 0
let randomY = 0

function moveCenter(x, y){
  randomX += 0.01
  randomY += 0.01
  const nextX = x + map(noise(randomX), 0, 1, -10, 10)
  const nextY = y + map(noise(randomY), 0, 1, -10, 10)
  return {
    x: nextX,
    y: nextY
  }
}

function mirror(value, maxValue) {
  if (value < 0) {
    return maxValue + value % maxValue
  }
  
  if (value > maxValue) {
    return value % maxValue;
  }
  
  return value;
}


function setup() {
  createCanvas(canvasWidth, canvasHeight); // キャンバスサイズを指定
  randomX = random(10)
  randomY = random(10)
  background(240)
}

function draw() {
  background(240, 100)
  noFill(); // 輪郭線のfillを透明に
  stroke(0); // 輪郭線の色を黒に

  for (let i = 0; i < numCircles; i++) {
    let angle = map(i, 0, numCircles, 0, TWO_PI); // 角度を計算
    let x = mirror(centerX + cos(angle) * radius, canvasWidth); // x座標を計算
    let y = mirror(centerY + sin(angle) * radius, canvasHeight); // y座標を計算
    ellipse(x, y, 100); // 円を描画
  }

  const nextPosition = moveCenter(centerX, centerY)
  centerX = nextPosition.x
  centerY = nextPosition.y
}
