const foodNum = 15
let foods = [];
const organismNum = 3
let organisms = [];
let time = 0;
let transition = []
const canvas = {
  width: 480,
  height: 480
}

class Food {
  constructor(isNewBorn=false) {
    this.x = random(width);
    this.y = random(height);
    if(isNewBorn){
      setTimeout(()=>{
        foods.push(this)
      }, 1000)
    }else{
      foods.push(this)
    }
  }

  draw() {
    fill(0,0,0,100);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
  }
}

class Organism {
  static baseLife = 50;
  static threshold = 100;
  static alphaValue = 255 / Organism.threshold
  static fledgeTime = 100;
  constructor(neonate = false) {
    this.x = random(width);
    this.y = random(height);
    this.size = 20;
    this.energy = Organism.baseLife;
    this.speed = 2;
    this.timer = 0;
    this.neonate = neonate
  }

  draw() {
    const alpha = Organism.alphaValue * this.energy
    const blueValue = map(this.energy, 0, Organism.threshold + Organism.baseLife, 0, 255)
      const redValue = map(this.energy, 0, Organism.threshold + Organism.baseLife, 255, 0)
      const greenValue = map(this.timer, 0, Organism.fledgeTime, 255, 0)
    const size = this.neonate ? (this.size / Organism.fledgeTime) * this.timer: this.size;
    
    fill(redValue, greenValue, blueValue, alpha);
    noStroke();
    ellipse(this.x, this.y, size);
  }

  shake() {
    let dx = random(-this.speed, this.speed);
    let dy = random(-this.speed, this.speed);
    this.x += dx;
    this.y += dy;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  findFood() {
    let closestFood = null;
    let closestDist = Infinity;
    for (let food of foods) {
      let d = dist(this.x, this.y, food.x, food.y);
      if (d < closestDist) {
        closestDist = d;
        closestFood = food;
      }
    }
    return closestFood;
  }

  eat() {
    let food = this.findFood();
    if (food) {
      let d = dist(this.x, this.y, food.x, food.y);
      if (d < this.size / 2 + 5) {
        this.energy += 20;
        foods.splice(foods.indexOf(food), 1);
        new Food()
      } else {
        this.moveTowards(food);
      }
    }
  }

  moveTowards(target) {
    let dx = target.x - this.x;
    let dy = target.y - this.y;
    let d = dist(this.x, this.y, target.x, target.y);
    dx /= d;
    dy /= d;
    this.x += dx * this.speed;
    this.y += dy * this.speed;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
  reproduce() {
    if (this.energy > Organism.threshold + Organism.baseLife) {
      this.energy -= Organism.threshold;
      let child = new Organism(true);
      child.x = this.x;
      child.y = this.y;
      organisms.push(child);
    }
  }
  fledge(){
    let isFledge = true
    if(this.neonate){
      if(this.timer <= Organism.fledgeTime){
        isFledge = false
      }else{
        this.neonate = false
        isFledge = true
      }
    }
    return isFledge
  }
  changeHungerLevel(){
    if (this.timer % 3 == 0 && !this.neonate) {
      this.energy--;
    }
    if (this.energy <= 0) {
      organisms.splice(organisms.indexOf(this), 1);
    }
  }
  update() {
    this.timer++;
    this.shake();
    const isFledge = this.fledge()
    if(!isFledge){
      return
    }
    this.changeHungerLevel()
    this.eat();
    this.reproduce();
  }
}

function drawaGraph(){
  let maxY = canvas.height - 20;
  let minY = 10;
  let maxX = canvas.width - 20;
  let minX = 10;
  let values = transition
  let intervalY = maxY / max(values)
  let intervalX = maxX / (values.length - 1)
  
  for(let i = 0; i < max(values); i+=5){
    fill(0,0,0,100);
    noStroke()
    text(i, minY, maxY - (i * intervalY) + minY);
  }


  for (let i = 0; i < values.length; i++) {
    let v = values[i];
    let px = minX + i * intervalX;
    let py = maxY + minY - (v * intervalY);
    point(px, py);

    if (i < values.length - 1) {
      let nextV = values[i + 1];
      let nextPx = minX + (i + 1) * intervalX;
      let nextPy = maxY + minY - (nextV * intervalY);
      stroke(0, 0, 0, 50);
      strokeWeight(2);
      line(px, py, nextPx, nextPy);
    }
    if(i == values.length-1){
      fill(0,0,0,100);
      noStroke()
      text(organisms.length, maxX, 10);
    }
  }
}

function setup() {
  createCanvas(canvas.width, canvas.height);
  for (let i = 0; i < foodNum; i++) {
    new Food();
  }
  for (let i = 0; i < organismNum; i++) {
    organisms.push(new Organism());
  }
}

function draw() {
  background(240);
  time++;
  for (let food of foods) {
    food.draw();
  }
  for (let organism of organisms) {
    organism.draw();
    organism.update();
  }
  if(time % 100 == 0){
    transition.push(organisms.length)
  }
  drawaGraph()
}