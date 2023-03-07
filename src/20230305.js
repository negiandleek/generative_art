const width = 800
const height = 800
const strokeWidth = 2

function setup() {
  createCanvas(width, height);
  background(240);
  strokeWeight(strokeWidth)
  const xStep = 20
  const yStep = 40
  const yMargin = 80
  let lastY = -999;
  let lastX = -999;
  stroke(0)
  for(let x=-xStep; x <= width; x+=xStep){
    let xnoise = random(10)
    let i = 0;
    for(let y=yMargin; y <= height - yMargin; y+=yStep){
      if(i !=0) break
      let xx = x + 10 + noise(xnoise) * 80
      if(lastY > -999){
        line(xx, y, lastX, lastY)
      }
      lastX = xx
      lastY = y
      xnoise += 0.1
    }
    i++
    lastX = -999
    lastY = -999
  }
}