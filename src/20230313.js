// ‘SOUND OF DTM MEDAN VOLUME 1 (Fahrezi DTM)’ by DTM MEDAN is on 
// https://on.soundcloud.com/5nsFB 

let song, fft;
const bin = 64

function preload() {
  song = loadSound('./sound.mp3');
}

function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT(0.8, bin);
}

function draw() {
  background(0);
  noFill();
  beginShape();
  stroke('#fb8500');
  let waveform = fft.analyze();
  let canvasWidth = width;
  let canvasHeight = height;

  let radius = 50;
  for (let i = 0; i < waveform.length; i++) {
    let angle = map(i, 0, waveform.length, 0, TWO_PI);
    let x = radius * cos(angle) + canvasWidth / 2;
    let y = radius * sin(angle) + canvasHeight / 2;
    let rectHeight = map(waveform[i], 0, 255, 0, 100);

    push();
    translate(x, y);
    rotate(angle + PI / 2);
    rect(0, 0, 2, -rectHeight);
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