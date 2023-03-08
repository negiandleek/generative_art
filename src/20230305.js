const width = 800
const height = 800
const strokeWidth = 2

function setup() {
  createCanvas(width, height);
  background(240);
  strokeWeight(strokeWidth)
  const xMargin = 100
  const xStep = 5
  const yMargin = 100
  const yStep = 5
  const weight = 10
  let lastY = -999;
  let lastX = -999;
  stroke(0)
  for(let x=xMargin/1.5; x <= width - xMargin; x+=xStep){
    let xnoise = random(10)
    let yrandom = random(10)
    const ynoise = noise(yrandom) * 100
    const baseY = (yMargin - ynoise / 2) + ynoise

    for(let y=baseY/2; y <= height - baseY/2; y+=yStep){
      let nextX = x + 10 + noise(xnoise) * weight
      if(lastY > -999){
        line(nextX, y, lastX, lastY)
      }
      lastX = nextX
      lastY = y
      xnoise += 0.1
    }
    lastX = -999
    lastY = -999
  }
  for(let y=yMargin/1.5; y <= height - yMargin; y+=yStep){
    let ynoise = random(10)
    let xrandom = random(10)
    const xnoise = noise(xrandom) * 100
    const baseX = (yMargin - xnoise / 2) + xnoise
    for(let x=baseX/2; x <= width - baseX/2; x+=xStep){
      let nextY = y + 10 + noise(ynoise) * weight
      if(lastX > -999){
        line(x, nextY, lastX, lastY)
      }
      lastY = nextY
      lastX = x
      ynoise += 0.1
    }
    lastX = -999
    lastY = -999
  }
}