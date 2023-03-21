import type p5 from "p5"

export class Palette {
  p5: p5
  color: string
  static colors = ['#F8C200', '#FB8500', '#FF5A30','#F12B63', '#FF2599', '#0EA5E6']
  // static colors = ['#AA00FF', '#FF1492', '#ED0BE7', '#5EFA13','#EEEE0D']
  constructor(p5: p5, colorIndex: number){
    this.p5 = p5
    const index = colorIndex ?? Math.floor(this.p5.random() * Palette.colors.length)
    this.color = Palette.colors[index]
  }
  uniqRand(){
    const filterdColors = Palette.colors.filter((it)=> it != this.color);
    this.color = filterdColors[Math.floor(this.p5.random() * filterdColors.length)];
    return this.color
  }
  rand(){
    this.color = Palette.colors[Math.floor(this.p5.random() * Palette.colors.length)];
    return this.color
  }
}