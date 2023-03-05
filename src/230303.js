const canvasWidth = 480;
const canvasHeight = 480;

const initialMoldNum = 5;
const molds = []

class Mold {
  static reproduceBaseCycle = 200
  static dispersalDistance = 50
  static maxLifeSpan = 300
  static randomPointAround(vector) {
    let angle = random(TWO_PI);
    let r = random(Mold.dispersalDistance);
    let dx = cos(angle) * r;
    let dy = sin(angle) * r;
    return createVector(vector.x + dx, vector.y + dy);
  }
  constructor(vector, isNewborn=false) {
    this.prevPosition = vector
    this.position = isNewborn ? Mold.randomPointAround(vector): vector;
    this.lifespan = Mold.maxLifeSpan
    this.time = 0
    this.reproduceCycle = round(randomGaussian(Mold.reproduceBaseCycle, 50))
    this.isNewborn = isNewborn
  }
  get isReproduce(){
    if(this.time <= this.lifespan * 0.6){
      return true
    }else{
      return false
    }
  }
  reproduce(){
    if(this.isReproduce){
      const maturityPeriod = round(this.time - this.lifespan * 0.2)
      if(maturityPeriod % this.reproduceCycle == 0){
        molds.push(new Mold(this.position, true))
      }
    }
  }
  update(){
    this.time++
    this.reproduce()
  }
  draw() {
    this.update();
    const alpha = map(this.time, 0, Mold.maxLifeSpan, 50, 255)
    fill(0,0,0,alpha);
    noStroke();
    ellipse(this.position.x, this.position.y, 1, 1);
    if(this.isNewborn){
      stroke(0, 0, 0,alpha);
      line(this.prevPosition.x, this.prevPosition.y, this.position.x, this.position.y);
    }
  }
}

function setupMold(){
  for(let i = 0; i < initialMoldNum; i+=1){
    molds.push(new Mold(createVector(random(width), random(height))))
  }
}

let time = 0

function setup() {
	createCanvas(canvasWidth, canvasHeight);
  setupMold()
}

function draw(){
  time++
  if(time % 100 == 0){
    console.log(time)
  }
  if(time >= 2200){
    return
  }
	background(240);
  for (let mold of molds) {
    mold.draw();
  }
}