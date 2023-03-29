import { Palette } from "../lib/Palette";

let audio: p5.SoundFile;
let fft: p5.FFT;

export const sketch = (p: p5) => {
  p.preload = () => {
    audio = p.loadSound('/sound.mp3')
  }
  p.setup = () => {
    p.createCanvas(1200, 800)
    p.background('#000')
    fft = new p5.FFT(0.935, 64);
    fft.smooth(0.8)
    fft.setInput(audio);
  };

  p.draw = () => {
  	p.background('#000');
    fft.analyze();
    const palette = new Palette(0);
    const trebEnergy = fft.getEnergy("treble");
    const highEnergy = fft.getEnergy("highMid");
    const midEnergy= fft.getEnergy("mid");
    const lowEnergy = fft.getEnergy("lowMid");
    const bassEnergy = fft.getEnergy("bass");

    p.noFill();
    p.strokeWeight(4);

    const bass = p.map(bassEnergy, 0, 255, 10, 100);
    p.stroke(palette.color)
    p.ellipse(p.width / 2, p.height / 2, bass, bass);

    const low = p.map(lowEnergy, 0, 255, 100, 200);
    p.stroke(palette.next())
    p.ellipse(p.width / 2, p.height / 2, low, low);

    const mid = p.map(midEnergy, 0, 255, 200, 300);
    p.stroke(palette.next())
    p.ellipse(p.width / 2, p.height / 2, mid, mid);

    const high = p.map(highEnergy, 0, 255, 300, 400);
    p.stroke(palette.next())
    p.ellipse(p.width / 2, p.height / 2, high, high);

    const treb = p.map(trebEnergy, 0, 255, 400, 500);
    p.stroke(palette.next())
    p.ellipse(p.width / 2, p.height / 2, treb, treb);

  };

	p.mouseClicked = () => {
    if (audio.isPlaying()) {
      audio.pause();
    } else {
      audio.loop();
    }
  }
};