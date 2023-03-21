let audio;
let fft;
let amplitude;
let minAmplitudeForBeat = 0;
let framesSinceLastBeat = 0;

const beatHoldFrames = 30;
const beatThreshold = 0.25; 
const beatDecayRate = 0.98;

function preload() {
  audio = loadSound('./sound.mp3');
}

function setup() {
  createCanvas(800, 800);
  audio.loop();
  amplitude = new p5.Amplitude();
}

function draw() {
  background(0)
  rect(50,50, 50,50)
  const level = amplitude.getLevel();
  detectBeat(level);
}

function detectBeat(level){
  if (level  > minAmplitudeForBeat && level > beatThreshold){
    minAmplitudeForBeat = level * 1.4;
    fill(random(0, 255), random(0,255), random(0, 255))
    framesSinceLastBeat = 0;
  } else{
    if (framesSinceLastBeat <= beatHoldFrames){
      framesSinceLastBeat ++;
    }
    else{
      minAmplitudeForBeat *= beatDecayRate;
      minAmplitudeForBeat = Math.max(minAmplitudeForBeat, beatThreshold);
    }
  }
}

function mouseClicked() {
  if (audio.isPlaying()) {
    audio.pause();
  } else {
    audio.loop();
  }
}