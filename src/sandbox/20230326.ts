let audio: p5.SoundFile;
const m = 50;
const n = 50;
let fft: p5.FFT;

export const sketch = (p: p5) => {
  p.preload = () => {
    audio = p.loadSound('/sound.mp3')
  }
  p.setup = () => {
    p.createCanvas(1200, 800)
    fft = new p5.FFT();
    fft.setInput(audio);
  };

  p.draw = () => {
  	p.background(220);
    fft.analyze()
    let trebEnergy = fft.getEnergy("treble");
    let midEnergy= fft.getEnergy("mid");
    let bassEnergy = fft.getEnergy("bass");

    p.ellipse(120,120,trebEnergy)
    p.ellipse(360,120,midEnergy)
    p.ellipse(600,120,bassEnergy)
  };

	p.mouseClicked = () => {
    if (audio.isPlaying()) {
      audio.pause();
    } else {
      audio.loop();
    }
  }
};