// ‘SOUND OF DTM MEDAN VOLUME 1 (Fahrezi DTM)’ by DTM MEDAN is on 
// https://on.soundcloud.com/5nsFB 

let song, fft;


function preload() {
  song = loadSound('./sound.mp3');
}

const canvasWidth = 400;
const canvasHeight = 400;
function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT();
  song.play();
}

function draw() {
  background(0);

  let waveform = fft.waveform();
  
  noFill();
  beginShape();
  stroke('#fb8500');

  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let angle = map(i, 0, waveform.length, 0, TWO_PI)
    let radius = map(waveform[i], -1, 1, 0, height / 2);
    let x = (canvasWidth / 2) + radius * cos(angle);
    let y = (canvasHeight / 2) + radius * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  
  
  // text('Click to play/pause', 20, 20);
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}