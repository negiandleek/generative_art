import type * as p5type from 'p5';
import {Palette} from '../lib/Palette'

// p5.soundをimportする
const Amplitude = (p5 as any).Amplitude as p5type.Amplitude;

let audio: p5type.SoundFile;
let amplitude: p5type.Amplitude;
let minAmplitudeForBeat = 0;
let framesSinceLastBeat = 0;

const beatHoldFrames = 40;
const beatThreshold = 0.20; 
const beatDecayRate = 0.98;

const rects = new Array(500);

function setup(p5js: p5type) {
  p5js.createCanvas(800, 800);
  // @ts-ignore
  amplitude = new Amplitude();
  p5js.noStroke()
  
  for(let i = 0; i < rects.length; i+=1){
    rects[i] = new Rect(p5js, p5js.random(500), p5js.random(500))
  }
}

function draw(p5js: p5type) {
  p5js.background(0)
  
  const level = amplitude.getLevel();
  const detectBeat = isDetectBeat(level);
  
  for(let i = 0; i < rects.length; i+=1){
    rects[i].draw(detectBeat)
  }
}

class Rect{
  p5js: p5type
  x: number
  y: number
  palette: Palette
  constructor(p5js: p5type, x: number, y: number){
    this.p5js = p5js
    this.x = x;
    this.y = y;
    this.palette = new Palette(p5js)
  }
  draw(isChangeColor: boolean){
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

function isDetectBeat(level: number){
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

export const sketch = (p5js: p5type) => {
  p5js.preload = () => {
    audio = p5js.loadSound('/sound.mp3')
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