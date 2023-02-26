
const canvasWidth = 480;
const canvasHeight = 480;
const canvasColor = '#F5F5F5'

// パーティカル
const particlaColor = '#32b7f0'
const minNumOfParticals = 10
const minRadiusOfParticals = 10
const incrementNumOfPartical = 0

// 軌跡
const numOfOrbit = 5
const incrementRadiusOfOrbit = 30;
const minRadiusOfOrbit = 15

const particles = [];
const orbits = [];

function easeInOutQuad(x) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}


class Orbit{
  constructor(centerX, centerY, radius, minRadiusOfOrbit){
    this.centerX = centerX;
    this.centerY = centerY;
    this.originRadius = radius;
    this.radius = radius;
    this.radian = radians(90) 
    this.minRaidus = minRadiusOfOrbit
  }
  scale(){
    this.radian += 0.0005
    this.radius = this.originRadius * easeInOutQuad(Math.abs(sin(this.radian))) + this.minRaidus
  }
}

class Particle{
  constructor(radius, radian, orbit){
    this.radius = radius;
    this.radian = radian;
    this.orbit = orbit;
  }
  rotate(){
    this.radian += radians(0.25)
  }
  position(){
    this.x = this.orbit.centerX + (this.orbit.radius * cos(this.radian))
    this.y = this.orbit.centerY + (this.orbit.radius * sin(this.radian))
  }
  draw(){
    this.rotate()
    this.orbit.scale()
    this.position()
    noStroke()
    fill(particlaColor)
    circle(this.x, this.y, this.radius)
  }
}

function setupOrbits(){
  let radius = 0;
  let centerX = canvasWidth / 2
  let centerY = canvasHeight / 2
  for(let i = 0; i < numOfOrbit; i += 1){
    const minRadius = minRadiusOfOrbit
    orbits.push(new Orbit(centerX, centerY, radius, minRadius))
    radius += incrementRadiusOfOrbit
  }
}

function setupParticles(orbits){
  let numOfParticals = minNumOfParticals;
  let radianShift = 0
  for(let i = 0; i < orbits.length; i += 1){
    const baseAngle = 360 / numOfParticals;
    if(i===0){
      continue;
    }
    for(let j = 0; j < numOfParticals; j += 1){
      particles.push(new Particle(minRadiusOfParticals*(i+1)/1.8, radians(baseAngle * j) + radianShift, orbits[i]))
    }
    numOfParticals += incrementNumOfPartical
    radianShift+=radians(15)
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  setupOrbits()
  setupParticles(orbits);
}

function draw() {
  background(canvasColor);
  for(let index in particles){
    particles[index].draw()
  }
}