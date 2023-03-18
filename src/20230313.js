// ‘SOUND OF DTM MEDAN VOLUME 1 (Fahrezi DTM)’ by DTM MEDAN is on 
// https://on.soundcloud.com/5nsFB 

let song, fft;
let input74 = 0.125;
let input75 = 30;
let input36Flag = true
let input37Flag = true
let input38Flag = true
let autoRotate = false
let inputAngle = 0
const bin = 32

function preload() {
  song = loadSound('./sound.mp3');
}

function setup() {
  createCanvas(800, 800);
  song.loop();
  fft = new p5.FFT(0.8, bin);
}

function draw() {
  background(0);
  fill('#fb8500');
  stroke('#fb8500');
  let waveform = fft.analyze();
  let canvasWidth = width;
  let canvasHeight = height;

  let radius = 100;
  if(channel == 74){
    input74 = value ? map(value, 0, 127, 0, 0.5) : input74
    autoRotate = true
  }
  if(channel == 75){
    input75 = value ? map(value, 0, 100, 0, 250) : input75
  }
  
  if(channel == 36 && value != 0 && input36Flag){
    inputAngle += radians(60)
    input36Flag = false
    autoRotate = false
  }
  if(channel == 36 && value == 0){
    input36Flag = true
  }
  
  if(channel == 37 && value != 0 && input37Flag){
    inputAngle -= radians(60)
    input37Flag = false
    autoRotate = false
  }
  if(channel == 37 && value == 0){
    input37Flag = true
  }
  
  if(channel == 38 && value != 0 && input38Flag){
    if(autoRotate){
      autoRotate = false
    }else{
      autoRotate = true
    }
    input38Flag = false
  }
  if(channel == 38 && value == 0){
    input38Flag = true
  }
  if(autoRotate == true){
    inputAngle += input74
  }
  let inputHeight = channel === 75 ? map(value, 0, 100, 0, 400) : input75
  
  for(let j = -1; j <= 1; j+=2 ){
    for (let i = 0; i < waveform.length; i++) {
      let angle = map(i, 0, waveform.length, 0, TWO_PI / 2);
      let x = radius * j * cos(angle + inputAngle) + canvasWidth / 2;
      let y = radius * j * sin(angle + inputAngle) + canvasHeight / 2;
      let rectHeight = max(0, map(waveform[i], 180, 255, 0, inputHeight))

      push();
      translate(x, y);
      rotate(angle + inputAngle + PI / 2);
      rect(0, 0, 2, -j * rectHeight);
      pop();
    } 
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}