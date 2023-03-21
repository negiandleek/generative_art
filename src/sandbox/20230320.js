import {Palette} from '../lib/Palette'

let audio;
let amplitude;
let minAmplitudeForBeat = 0;
let framesSinceLastBeat = 0;

const beatHoldFrames = 40;
const beatThreshold = 0.20; 
const beatDecayRate = 0.98;

const rects = new Array(500);

function setup(p5js) {
  p5js.createCanvas(800, 800);
  amplitude = new p5.Amplitude();
  p5js.noStroke()
  
  for(let i = 0; i < rects.length; i+=1){
    rects[i] = new Rect(p5js, p5js.random(500), p5js.random(500))
  }
}

function draw(p5js) {
  p5js.background(0)
  
  const level = amplitude.getLevel();
  const detectBeat = isDetectBeat(level);
  
  for(let i = 0; i < rects.length; i+=1){
    rects[i].draw(detectBeat)
  }
}

class Rect{
  constructor(p5js, x,y){
    this.p5js = p5js
    this.x = x;
    this.y = y;
    this.palette = new Palette(p5js)
  }
  draw(isChangeColor){
    if(isChangeColor){
      this.palette.uniqRand()
    }
    this.p5js.strokeWeight(5)
    this.p5js.stroke(this.palette.color)
    this.p5js.fill(this.palette.color)
    this.p5js.line(this.x,this.y, this.x + 50, this.y + 50)
    // this.p5js.rect(this.x,this.y, 25, 25)
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

export const sketch = (p5js) => {
  p5js.preload = () => {
    audio = p5js.loadSound('/sound.mp3', (sound)=>{
      // sound.loop()
    });
  }
  p5js.setup = () => {
    setup(p5js)
  };
  p5js.draw = () => {
    draw(p5js)
  }
  p5js.mouseClicked = () => {
    mouseClicked()
  }
}