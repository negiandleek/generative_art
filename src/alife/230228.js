const canvasWidth = 480;
const canvasHeight = 480;

const initialPlantNum = 5;
const plants = []

class Plant {
	static maxEnergy = 100;
  static minEnergy = 6;
  static maxLifeSpan = 750;
  static sickProb = 0.01;
  static reproduceBaseCycle = 200
  static dispersalDistance = 40
  static randomPointAround(vector) {
    let angle = random(TWO_PI);
    let r = random(Plant.dispersalDistance);
    let dx = cos(angle) * r;
    let dy = sin(angle) * r;
    return createVector(vector.x + dx, vector.y + dy);
  }
  constructor(vector, isGermination=false) {
    this.position = isGermination ? Plant.randomPointAround(vector): vector;
		this.primeEnergy = randomGaussian(Plant.maxEnergy, 10);
    this.energy = isGermination ? 0 : this.primeEnergy
    this.lifespan = randomGaussian(Plant.maxLifeSpan, 50)
    this.time = isGermination ? 0 : this.lifespan * 0.2
    this.status = isGermination ? 'SEEDLING' : 'MATURE'
    this.reproduceCycle = round(randomGaussian(Plant.reproduceBaseCycle, 50))
  }
  lifeStatus(){
    if(this.time < this.lifespan * 0.2){
      this.status = 'SEEDLING'
    }else if(this.time < this.lifespan * 0.8){
      this.status = 'MATURE'
    }else{
      this.status = 'SENESCENT'
    }
  }
  reproduce(){
    if(this.status == 'MATURE'){
      const maturityPeriod = round(this.time - this.lifespan * 0.2)
      if(maturityPeriod % this.reproduceCycle == 0){
        plants.push(new Plant(this.position, true))
      }
    }
  }
  lifeTime(){
    if(this.status == 'SEEDLING'){
      this.energy += this.primeEnergy / (this.lifespan * 0.2)
    }else if(this.status == 'SENESCENT'){
      this.energy -= this.primeEnergy / (this.lifespan * 0.8)
      if (this.energy <= 0) {
        plants.splice(plants.indexOf(this), 1);
      }
    }
  }
  update(){
    this.time++
    this.lifeStatus();
    this.reproduce()
    this.lifeTime()
  }
  draw() {
    this.update();
    const alpha = map(this.energy, 0, this.primeEnergy, 0, 255)
    fill(0,0,0, alpha);
    noStroke();
    ellipse(this.position.x, this.position.y, 10, 10);
  }
}

function setupPlant(){
  for(let i = 0; i < initialPlantNum; i+=1){
    plants.push(new Plant(createVector(random(width), random(height))))
  }
}

let time = 0

function setup() {
	createCanvas(canvasWidth, canvasHeight);
  setupPlant()
}

function draw(){
  time++
  if(time % 100 == 0){
    console.log(time)
  }
  if(time >= 2800){
    return
  }
	background(240);
  for (let plant of plants) {
    plant.draw();
  }
}