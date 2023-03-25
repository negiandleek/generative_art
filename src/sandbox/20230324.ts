let prevBpmEstimate: number = 0;
function calculateAverageBPM(bpmEstimates: Array<number>) {
  if (bpmEstimates.length < 4) {
    return prevBpmEstimate;
  }

  // BPM推定値をソートし、中央値を計算します。
  const sortedBpmEstimates = bpmEstimates
    .sort((a, b) => a - b);
  const medianBPM =
    sortedBpmEstimates.length % 2 === 0
      ? (sortedBpmEstimates[sortedBpmEstimates.length / 2 - 1] +
          sortedBpmEstimates[sortedBpmEstimates.length / 2]) /
        2
      : sortedBpmEstimates[Math.floor(sortedBpmEstimates.length / 2)];

  // 中央値からの差を計算し、閾値以内の推定値のみを使用します。
  const threshold = 5;
  const filteredBpmEstimates = bpmEstimates.filter(
    (estimate) => Math.abs(estimate - medianBPM) <= threshold
  );

  // 重み付けされた平均BPMを計算します。
  const sumOfWeights = filteredBpmEstimates.reduce((sum, estimate) => sum + estimate, 0);
  return Math.round(sumOfWeights / filteredBpmEstimates.length);
}


export const sketch = (p: p5) => {
  let bpmEstimate: number = 0
  let previousTimestamps: Array<number> = [];
  let bpmEstimates: Array<number> = [];
  let lastBeatTime = 0; 
  let ellipseWidth = 0
  let circleSize = 0;


  const MIN_BPM = 80;
  const MAX_BPM = 180;
  p.setup = () => {
    p.createCanvas(200, 200);
    p.textAlign(p.CENTER);
  };

  p.draw = () => {
  	p.background(220);
    const timestamp = p.millis() / 1000
    const beatInterval = 60 / bpmEstimate; 
    // console.log('bpm', bpmEstimate)
    if (timestamp - lastBeatTime >= beatInterval) {
      ellipseWidth = 50
      lastBeatTime = timestamp
    }else{
      ellipseWidth *= 0.95;
    }
    if(bpmEstimate){
      p.text(bpmEstimate, p.width/2, p.width/2 + 50);
    }
    p.ellipse(p.width/2, p.height/2, Math.max(10, ellipseWidth));

    if (circleSize > 0) {
      p.ellipse(p.mouseX, p.mouseY, circleSize);
      circleSize -= 1;
    }
  };

	p.mouseClicked = () => {
    const timestamp = p.millis()
    if(previousTimestamps.length > 0){
      const deltaTime = timestamp - previousTimestamps[previousTimestamps.length - 1];
      const bpm = Math.floor(60000 / deltaTime);
      if (bpm >= MIN_BPM && bpm <= MAX_BPM) {
        bpmEstimates.push(bpm);
      }else{
        bpmEstimates = []
        prevBpmEstimate = bpmEstimate
      }
      if (previousTimestamps.length > 10) {
        previousTimestamps.shift();
      }
    }
    previousTimestamps.push(timestamp)
    const averageBPM = calculateAverageBPM(bpmEstimates)
    if(!averageBPM){
      prevBpmEstimate = bpmEstimate
    }else{
      bpmEstimate = averageBPM
    }
    circleSize = 25
	}
};