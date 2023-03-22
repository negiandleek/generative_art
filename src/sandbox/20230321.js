import { Palette } from "../lib/Palette";

function setup(p){
  p.createCanvas(700, 410);
  const palette = new Palette(p)
  p.background(palette.color)
};

function draw(p){
  p.background(0)
  p.fill(255)
  p.rect(100, 100, 50, 50)
}

export const sketch = (p) => {
  p.setup = () => {
    setup(p)
  };
  p.draw = () => {
    draw(p)
  }
}