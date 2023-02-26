const canvasWidth = 834;
const canvasHeight = 1112;
const rects = []
const canvasColor = '#F5F5F5'
const colors = ['#EF4444', '#F97316', '#F59E0B', '#EAB308','#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#EC4899', '#EC4899', '#F43F5E']

class Rect{
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if(random(3) >= 1){
      this.color = random(colors) 
      this.hasColor = true
    }else{
      this.hasColor = false
      this.color = canvasColor;
    }
    this.setColor();
    rect(x, y, width, height);
  }
  setColor(){
    // noStroke()
    if(this.hasColor){
      fill(this.color);
    }else{
      noFill();
    }
  }
  draw(){
    this.setColor();
    rect(this.x, this.y, this.width, this.height)
  }
}


function drawRects(){
  let x = 0;
  let y = 0;
  let widhtRange = [10, 50]
  let heightRange = [40, 110]
  while(y <= canvasHeight){
    let height = random(heightRange[0], heightRange[1]);
    while(x <= canvasWidth){
      let width = random(widhtRange[0], widhtRange[1])
      rects.push(new Rect(x, y, width, height));
      x += width;
    }
    y += height
    
    x = 0
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  drawRects();
}

function drawCanvas(){
  background(canvasColor);
}

function draw() {
  drawCanvas()
  for(let index in rects){
    rects[index].draw()
  }
}