import {channel} from '../lib/midi'

let audio;
let amplitude;
let minAmplitudeForBeat = 0;
let framesSinceLastBeat = 0;
let palette;

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

class Figure{
  constructor(x,y, lineLength){
    this.x = x;
    this.y = y;
    this.lineLength = lineLength;
    this.palette = new MyColor()
  }
  draw(isChangeColor){
    if(isChangeColor){
      this.palette.uniqRand()
    }
    strokeWeight(5)
    stroke(this.palette.color)
    fill(this.palette.color)
    line(this.x,this.y, this.x + this.lineLength, this.y + this.lineLength)
    // rect(this.x,this.y, 25, 25)
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

window.preload = () => {
  audio = loadSound('/sound.mp3');
}

window.setup = () => {
  createCanvas(1200, 800);
  audio.loop();
  amplitude = new p5.Amplitude();
  palette = new MyColor()
  noStroke()
  
  for(let i = 0; i < rects.length; i+=1){
    const lineLength = random(50, 150)
    rects[i] = new Figure(random(1200 - lineLength), random(800 - lineLength), lineLength)
  }
}

window.draw = () => {
  background(0)
  
  const level = amplitude.getLevel();
  const detectBeat = isDetectBeat(level);
  
  for(let i = 0; i < rects.length; i+=1){
    rects[i].draw(detectBeat)
  }
}

window.mouseClicked = () => {
  if (audio.isPlaying()) {
    audio.pause();
  } else {
    audio.loop();
  }
}
