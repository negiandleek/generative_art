let audio: p5.SoundFile;
let fft: p5.FFT;
let counter = 0;
let pitch: number = 0;

function drawPitch(p: p5, pitch: number, translate: {x?: number, y?:number, rotate?: number}, reverse: boolean = false){
  const translateX = translate.x ?? 0;
  const translateY = translate.y ?? 0;
  const rotate = translate.rotate ?? 0
  const minVertex = 0
  const maxVertex = 16;
  let vertex = Math.floor(p.map(pitch, 0, 22050, minVertex, maxVertex));
  if(vertex % 2 == 0){
    vertex += 1;
  }
  p.push()
  p.translate(translateX, translateY)
  p.rotate(rotate)
  p.beginShape();
  p.noFill()
  p.strokeWeight(14)

  const startX = 50
  const oneX = (p.width - 50) / vertex;
  p.curveVertex(startX, 0);
  p.curveVertex(startX, 0);

  for(let i = 1; i < vertex; i+=1){
    let x = Math.floor(oneX * i);
    let y = reverse ? -1 * p.height / 8 : p.height / 8;
    if (i % 2 == 0) {
      y *= -1;
    }
    p.curveVertex(x, y);
  }
  
  p.curveVertex(p.width - startX * 2, 0);
  p.curveVertex(p.width - startX * 2, 0);
  p.endShape();
  p.pop()
}

function getPitch(spectrum: Array<any>) {
  let maxAmp = 0;
  let maxIndex = 0;
  for (let i = 0; i < spectrum.length; i++) {
    if (spectrum[i] > maxAmp) {
      maxAmp = spectrum[i];
      maxIndex = i;
    }
  }
  let freq = maxIndex * 22050 / spectrum.length;
  return Math.round(freq);
}

export const sketch = (p: p5) => {
  p.preload = () => {
    audio = p.loadSound('/sound.mp3')
  }
  p.setup = () => {
    p.createCanvas(1200, 800)
    p.background('#1A39C2')
    fft = new p5.FFT(0.935, 64);
    fft.smooth(0.8)
    fft.setInput(audio);
  };

  p.draw = () => {
  	p.background('#1A39C2');
    const spectrum = fft.waveform()
    if(counter % 4 == 0){
      pitch = getPitch(spectrum.slice(0, Math.floor(spectrum.length)))
    }
    // p.blendMode(p.DARKEST)
    {
      p.stroke(0,0,0, 180)
      drawPitch(p, pitch, {x: 20, y: 230})
      p.stroke('#FF6F00')
      drawPitch(p, pitch, {x: 0, y: 200})
    }
    {
      p.stroke(0,0,0, 180)
      drawPitch(p, pitch, {x: 20, y: 530}, true)
      p.stroke('#FF6F00')
      drawPitch(p, pitch, {x: 0, y: 500}, true)
    }
    // {
    //   p.stroke(0,0,0, 180)
    //   drawPitch(p, pitch, {x: 100, y: 670, rotate: -0.5}, true)
    //   p.stroke('#FF6F00')
    //   drawPitch(p, pitch, {x: 80, y: 640, rotate: -0.5}, true)
    // }
    // p.blendMode(p.DARKEST)

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