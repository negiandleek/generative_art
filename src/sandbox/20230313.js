// ‘SOUND OF DTM MEDAN VOLUME 1 (Fahrezi DTM)’ by DTM MEDAN is on 
// https://on.soundcloud.com/5nsFB 

let audioTrack, fft, amplitude;
let rotationSpeed = 0.125;
let maxHeight = 30;
let rotateClockwiseFlag = true
let rotateCounterClockwiseFlag = true
let toggleAutoRotateFlag = true
let autoRotate = false
let rotationAngle = 0
const fftBins = 32

function preload() {
  audioTrack = loadSound('./sound.mp3');
}

function setup() {
  createCanvas(1000, 800);
  audioTrack.loop();
  fft = new p5.FFT(0.8, fftBins);
  amplitude = new p5.Amplitude();
}

function draw() {
  background(0);
  fill('#fb8500');
  stroke('#fb8500');
  let spectrum = fft.analyze();
  let level = amplitude.getLevel();
  let canvasWidth = width;
  let canvasHeight = height;
  

  let radius = map(level, 0, 1, 100, 150);
  if(channel == 74){
    rotationSpeed = value ? map(value, 0, 127, 0, 0.5) : rotationSpeed
    autoRotate = true
  }
  if(channel == 75){
    maxHeight = value ? map(value, 0, 100, 100, 250) : maxHeight
  }
  
  if(channel == 36 && value != 0 && rotateClockwiseFlag){
    rotationAngle += radians(45)
    rotateClockwiseFlag = false
    autoRotate = false
  }
  if(channel == 36 && value == 0){
    rotateClockwiseFlag = true
  }
  
  if(channel == 37 && value != 0 && rotateCounterClockwiseFlag){
    rotationAngle -= radians(45)
    rotateCounterClockwiseFlag = false
    autoRotate = false
  }
  if(channel == 37 && value == 0){
    rotateCounterClockwiseFlag = true
  }
  
  if(channel == 38 && value != 0 && toggleAutoRotateFlag){
    if(autoRotate){
      autoRotate = false
    }else{
      autoRotate = true
    }
    toggleAutoRotateFlag = false
  }
  if(channel == 38 && value == 0){
    toggleAutoRotateFlag = true
  }
  if(autoRotate == true){
    rotationAngle += rotationSpeed
  }
  let inputHeight = channel === 75 ? map(value, 0, 100, 0, 400) : maxHeight
  
  for(let j = -1; j <= 1; j+=2 ){
    for (let i = 0; i < spectrum.length; i++) {
      let angle = map(i, 0, spectrum.length, 0, TWO_PI / 2);
      let x = radius * j * cos(angle + rotationAngle) + canvasWidth / 2;
      let y = radius * j * sin(angle + rotationAngle) + canvasHeight / 2;
      let rectHeight = max(0, map(spectrum[i], 180, 255, 0, inputHeight))

      push();
      translate(x, y);
      rotate(angle + rotationAngle + PI / 2);
      rect(0, 0, 2, -j * rectHeight);
      pop();
    } 
  }
}

function mouseClicked() {
  if (audioTrack.isPlaying()) {
    audioTrack.pause();
  } else {
    audioTrack.loop();
  }
}