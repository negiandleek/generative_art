// ‘SOUND OF DTM MEDAN VOLUME 1 (Fahrezi DTM)’ by DTM MEDAN is on 
// https://on.soundcloud.com/5nsFB 

let song, fft;
const bin = 64

function preload() {
  song = loadSound('./sound.mp3');
}

const canvasWidth = 400;
const canvasHeight = 400;
function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT(0.9, bin);
}

function draw() {
  background(0);
  noFill();
  beginShape();
  stroke('#fb8500');
  let waveform = fft.analyze();

  for (let i = 0; i < waveform.length; i++) {
    let angle = map(i, 0, waveform.length, 0, TWO_PI);
    // let radius = map(waveform[i], 0, 255, 50, 200);
    let x = cos(angle);
    let y = sin(angle) + canvasHeight / 2
    // let x = map(i, 0, waveform.length, 0, canvasWidth - 15);
    let rectWidth = 10;
    let rectHeight = map(waveform[i], 0, 255, 0, 50);

    push();
    translate(200, y);
    rotate(angle + PI / 2);
    rect(x+10, 50, 2, rectHeight);
    pop();
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}