const canvasWidth = 480;
const canvasHeight = 480;
const particles = []
const canvasColor = '#F5F5F5'
const color = '#69d9de'
const numOfParticles = 50

class Orbit{
  constructor(centerX, centerY, radius){
    this.centerX = centerX;
    this.centerY = centerY;
    this.originRadius = radius;
    this.radius = radius;
    this.originRadius = radius
    this.radian = radians(90)
  }
  scale(){
    this.radian += 0.0002
    this.radius = this.originRadius * sin(this.radian)
  }
}

class Particle{
  constructor(radius, radian, orbit){
    this.radius = radius;
    this.baseRadian = radian;
    this.partRadian = 0;
    this.baseOrbit = orbit;
    this.partOrbit = new Orbit(orbit.centerX, orbit.centerY, 40)
  }
  position(){
    this.baseOrbit.scale();
    this.partRadian += random(0, 0.25)

    const baseX = this.baseOrbit.centerX + (this.baseOrbit.radius * cos(this.baseRadian))
    const baseY = this.baseOrbit.centerY + (this.baseOrbit.radius * sin(this.baseRadian))

    this.x = baseX + this.partOrbit.radius * cos(this.partRadian)
    this.y = baseY + this.partOrbit.radius * sin(this.partRadian)
  }
  draw(){
    this.position()
    noStroke()
    fill(color)
    circle(this.x, this.y, this.radius)
  }
}


function setupOrbit(){
  return new Orbit(canvasWidth / 2, canvasHeight / 2, 100)
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