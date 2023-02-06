const canvasWidth = 480;
const canvasHeight = 480;
const particles = []
const canvasColor = '#F5F5F5'
const color = '#69d9de'
const numOfParticles = 50

class Orbit{
  constructor(canvasWidth, canvasHeight, radius){
    this.centerX = canvasWidth / 2;
    this.centerY = canvasHeight / 2;
    this.radius = radius;
  }
}

class Particle{
  constructor(radius, radian, orbit){
    this.radius = radius;
    this.radian = radian;
    this.orbit = orbit;
  }
  position(){
    this.x = this.orbit.centerX + (this.orbit.radius * cos(this.radian))
    this.y = this.orbit.centerY + (this.orbit.radius * sin(this.radian))
  }
  draw(){
    this.position()
    noStroke()
    fill(color)
    circle(this.x, this.y, this.radius)
  }
}


function setupOrbit(){
  return new Orbit(canvasWidth, canvasHeight, 100)
}

function setupParticles(orbit){
  const baseAngle = 360 / numOfParticles;
  for(let i = 0; i < numOfParticles; i += 1){
    const radian = radians(baseAngle * i)
    particles.push(new Particle(10, radian, orbit))
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  setupParticles(setupOrbit());
}

function draw() {
  background(canvasColor);
  for(let index in particles){
    particles[index].draw()
  }
}