let audio: p5.SoundFile;
let fft: p5.FFT;
let counter = 0;


let bassWaveform: Array<any>;
let midWaveform: Array<any>;
let highWaveform: Array<any>;

function drawWaveform(p: p5, waveform: Array<any>, translateY: number = 0){
  p.push()
  p.translate(0, ((translateY + 1) * 3) * p.height / 11)
  p.beginShape();
  p.noFill()
  p.strokeWeight(14)

  // const groupSize = waveform.length;
  // const step = Math.floor(waveform.length / groupSize);
  // p.curveVertex(-9p.width / 6 + p.width / 2, p.height / 2);
  // p.curveVertex(325, 0);
  // p.curveVertex(325, 0);

  for (let i = 0; i < waveform.length; i++) {
    // let sum = 0;
    // for (let j = 0; j < step; j++) {
    //   let index = i * step + j;
    //   sum += waveform[index];
    // }
    let x = Math.floor(p.map(i, 0, waveform.length, 0, p.width));
    let y = Math.floor(p.map(waveform[i], -1, 1, 0, p.height / 8));
    if (i % 2 == 0) {
      y *= -1;
    }
    p.curveVertex(x, y);
  }
  // p.curveVertex(800, 0);
  // p.curveVertex(800, 0);

  p.endShape();
  p.pop()
}

function mirrorSpectrum(p: p5, spectrum: Array<any>){
  const invertedSpectrum = spectrum.slice().reverse();
  const values = invertedSpectrum.concat(spectrum);
  return values;
}

export const sketch = (p: p5) => {
  p.preload = () => {
    audio = p.loadSound('/sound.mp3')
  }
  p.setup = () => {
    p.createCanvas(1200, 800)
    fft = new p5.FFT(0.935, 16);
    fft.smooth(0.8)
    fft.setInput(audio);
  };

  p.draw = () => {
  	p.background(220);
    const spectrum = fft.waveform()
    bassWaveform = mirrorSpectrum(p, spectrum.slice(0, Math.floor(spectrum.length * 0.3)))
    midWaveform = mirrorSpectrum(p, spectrum.slice(Math.floor(spectrum.length * 0.3), Math.floor(spectrum.length * 0.6)))
    highWaveform = mirrorSpectrum(p, spectrum.slice(Math.floor(spectrum.length * 0.6), spectrum.length));
    drawWaveform(p, bassWaveform, 0)
    drawWaveform(p, midWaveform, 1)
    drawWaveform(p, highWaveform, 2)
    // drawWaveform(p, mirrorSpectrum(p, spectrum.slice()))

    counter += 1;
  };

	p.mouseClicked = () => {
    if (audio.isPlaying()) {
      audio.pause();
    } else {
      audio.loop();
    }
  }
};