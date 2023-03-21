const canvasWidth = 1200
const canvasHeight = 800
let centerX = canvasWidth / 2;
let centerY = canvasHeight / 2; // 中心点のy座標
const numCircles = 12;
const circles = [...Array(numCircles)]
const colors = ['#072AC8', '#1360E2', '#FFD02C']
// const colors = ['#3a86ff', '#8338ec', '#ff006e']

class SecondCircle{
  constructor(x, y, angle, radius){
    this.angle = angle
    this.radius = radius
    this.x = x + cos(angle) * this.radius
    this.y = y + sin(angle) * this.radius
  }
  draw(){
    ellipse(this.x, this.y, this.radius)
  }
}

class Circle{
  constructor(x, y, color){
    this.centerX = x;
    this.centerY = y;
    this.randomX = random(10)
    this.randomY = random(10)
    this.numCircles = 200;
    this.circles = [...Array(this.numCircles)]
    this.radius = floor(map(random(), 0, 1, 100, 130))
    this.initCircles()
    this.color = color;
  }
  initCircles(){
    for(let i in this.circles){
      let angle = map(i, 0, this.numCircles, 0, TWO_PI); // 角度を計算
      this.circles[i] = (new SecondCircle(this.centerX, this.centerY, angle, this.radius))
    }
  }
  moveCenter(){
    this.randomX += 0.01
    this.randomY += 0.01
    this.centerX = this.centerX + floor(map(noise(this.randomX), 0, 1, -10, 10))
    this.centerY = this.centerY + floor(map(noise(this.randomY), 0, 1, -10, 10))
  }
  draw(){
    for(let i in this.circles){
      stroke(this.color)
      this.circles[i].draw()
    }
  }
}

function randomColor() {
  let percent = Math.random() * 100;

  if (percent < 45) {
    return 0;
  } else if (percent < 90) {
    return 1;
  } else {
    return 2;
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight); // キャンバスサイズを指定
  randomX = random(10)
  randomY = random(10)
  background(220)
  noFill();
  for(let i in circles){
    circles[i] = (new Circle(map(random(), 0, 1, 0, canvasWidth), map(random(), 0, 1, 0, canvasHeight), colors[randomColor()]))
    circles[i].draw()
  }
}

// function draw() {
//   background(240)
//   noFill(); // 輪郭線のfillを透明に
//   for(let i in circles){
//     circles[i].draw()
//   }
// }
