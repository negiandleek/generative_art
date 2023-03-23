import type * as p5type from 'p5'

// global p5からAmplitudeを取得
const PeakDetect = p5.PeakDetect
const FFT = p5.FFT

let soundFile: p5type.SoundFile;
let fft: p5type.FFT;
let beat: p5type.PeakDetect & {isDetected?: boolean};

let ellipseWidth: number;

export const sketch = (p: p5) => {
  p.preload = () => {
    soundFile = p.loadSound('./sound.mp3');
  };

  p.setup = () => {
    p.createCanvas(400, 400);
    fft = new FFT();
    beat = new PeakDetect(20, 20000, 0.2, 20);
  };

  p.draw = () => {
  	p.background(220);
    fft.analyze();
    beat.update(fft);
    if(beat.isDetected) {
			ellipseWidth = 50;
    } else {
    	ellipseWidth *= 0.95;
    }
    
      p.ellipse(p.width/2, p.height/2, ellipseWidth, ellipseWidth);
  };

	p.mouseClicked = () => {
		if (soundFile.isPlaying()) {
			soundFile.pause();
		} else {
			soundFile.loop();
		}
	}
};