let audio;
let fft;
let amplitude;
let color;
let minAmplitudeForBeat = 0;
let framesSinceLastBeat = 0;

const beatHoldFrames = 40;
const beatThreshold = 0.20; 
const beatDecayRate = 0.98;

const rects = new Array(500);

class MyColor{
  static colors = ['#F8C200', '#FB8500', '#FF5A30','#F12B63', '#FF2599', '#0EA5E6']
  // static colors = ['#AA00FF', '#FF1492', '#ED0BE7', '#5EFA13','#EEEE0D']
  constructor(colorIndex){
    const index = colorIndex ?? Math.floor(random() * MyColor.colors.length)
    this.color = MyColor.colors[index]
  }
  uniqRand(){
    const filterdColors = MyColor.colors.filter((it)=> it != this.color);
    this.color = filterdColors[Math.floor(random() * filterdColors.length)];
    return this.color
  }
  rand(){
    this.color = MyColor.colors[Math.floor(random() * MyColor.colors.length)];
    return this.color
  }
}

class Rect{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.palette = new MyColor()
  }
  draw(isChangeColor){
    if(isChangeColor){
      this.palette.uniqRand()
    }
    strokeWeight(5)
    stroke(this.palette.color)
    fill(this.palette.color)
    line(this.x,this.y, this.x + 50, this.y + 50)
    // rect(this.x,this.y, 25, 25)
  }
}

function preload() {
  audio = loadSound('/sound.mp3');
}

function setup() {
  createCanvas(800, 800);
  audio.loop();
  amplitude = new p5.Amplitude();
  palette = new MyColor()
  noStroke()
  
  for(let i = 0; i < rects.length; i+=1){
    rects[i] = new Rect(random(500), random(500))
  }
}

function draw() {
  background(0)
  
  const level = amplitude.getLevel();
  const detectBeat = isDetectBeat(level);
  
  for(let i = 0; i < rects.length; i+=1){
    rects[i].draw(detectBeat)
  }
}

function isDetectBeat(level){
  if (level  > minAmplitudeForBeat && level > beatThreshold){
    minAmplitudeForBeat = level * 1.25;
    framesSinceLastBeat = 0;
    return true
  } else{
    if (framesSinceLastBeat <= beatHoldFrames){
      framesSinceLastBeat ++;
    }
    else{
      minAmplitudeForBeat *= beatDecayRate;
      minAmplitudeForBeat = Math.max(minAmplitudeForBeat, beatThreshold);
    }
    return false
  }
}

function mouseClicked() {
  if (audio.isPlaying()) {
    audio.pause();
  } else {
    audio.loop();
  }
}
