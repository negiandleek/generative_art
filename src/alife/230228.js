const canvasWidth = 480;
const canvasHeight = 480;

const initialPlantNum = 10;
const plants = []

class Plant {
	maxEnergy = 10;
  minEnergy = 6;
  maxLifeSpan = 1000;
  minLifeSpan = 50;
  sickProb = 0.01;
  constructor(isGermination=false) {
    this.x = random(width);
    this.y = random(height);
		this.maxEnergy = isGermination ? 0 : max(round(randomGaussian(Plant.maxEnergy, 2)), Plant.minEnergy);
    this.energy = isGermination ? 0 : this.maxEnergy
    console.log(randomGaussian(Plant.maxLifeSpan, 1))
    this.lifespan = max(round(randomGaussian(Plant.maxLifeSpan, 50)), Plant.minLifeSpan);
    this.time = isGermination ? 0 : this.lifespan * 0.2
    this.status = isGermination ? 'SEEDLING' : 'MATURE'
  }
  updateStatus(){
    if(this.time < this.lifespan * 0.2){
      this.status = 'SEEDLING'
    }else if(this.time < this.lifespan * 0.8){
      this.status = 'MATURE'
    }else{
      this.status = 'SENESCENT'
    }
  }
  updateTime(){
    if(this.status == 'SEEDLING'){
      this.energy += this.maxEnergy / (this.lifespan * 0.2)
    }else if(this.status == 'SENESCENT'){
      this.energy -= this.maxEnergy / (this.lifespan * 0.8)
      if (this.energy <= 0) {
        foods.splice(foods.indexOf(this), 1);
      }
    }
  }
  update(){
    this.time++
    console.log(this.time, this.lifespan)
    this.updateStatus()
    this.updateTime()
  }
  draw() {
    this.update();
    fill(0,0,0,100);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
  }
}

function setupPlant(){
  for(let i = 0; i < initialPlantNum; i+=1){
    plants.push(new Plant())
  }
}


function setup() {
	createCanvas(canvasWidth, canvasHeight);
  setupPlant()
}

function draw(){
	background(240);
  for (let plant of plants) {
    plant.draw();
  }
}