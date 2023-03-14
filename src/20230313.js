let song, fft;

function preload() {
  song = loadSound('./sound.mp3');
}

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

  for (let i = 0; i < waveform.length; i+=50) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height, 0);
    curveVertex(x, y);
  }

  endShape();
  
  // text('Click to play/pause', 20, 20);
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}