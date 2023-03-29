type colors = keyof typeof Palette.colors

export class Palette{
  static colors = {
    lollipop: ['#F8C200', '#FB8500', '#FF5A30','#F12B63', '#FF2599' /*,'#0EA5E6'*/, '#1A39C2'],
    neon: ['#AA00FF', '#FF1492', '#ED0BE7', '#5EFA13','#EEEE0D']
  }
  paletteType: colors
  color: string
  constructor(colorIndex?: number, paletteType?: colors){
    this.paletteType = paletteType ?? 'lollipop'
    const index = colorIndex ?? Math.floor(Math.random() * Palette.colors[this.paletteType].length)
    this.color = Palette.colors[this.paletteType][index]
  }
  uniqRand(){
    const filterdColors = Palette.colors[this.paletteType].filter((it)=> it !== this.color);
    this.color = filterdColors[Math.floor(Math.random() * filterdColors.length)];
    return this.color
  }
  rand(){
    const index = Math.floor(Math.random() * Palette.colors[this.paletteType].length);
    this.color = Palette.colors[this.paletteType][index]
    return this.color
  }
  next(){
    const index = (Palette.colors[this.paletteType].indexOf(this.color) + 1) % Palette.colors[this.paletteType].length
    this.color = Palette.colors[this.paletteType][index]
    return this.color
  }
}