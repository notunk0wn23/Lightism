export class Light {
    constructor(shapeConfig, glowConfig) {
        this.shape = new Konva.Rect(shapeConfig);
        this.shape.filters([Konva.Filters.Brighten]);

        this.shape.shadowColor(brightColor);
        this.shape.shadowBlur(glowConfig.blurRadius);
        this.shape.shadowOffsetX(glowConfig.offsetX);
        this.shape.shadowOffsetY(glowConfig.offsetY);
        this.shape.shadowOpacity(glowConfig.opacity);
  
        this.group = new Konva.Group()
        this.group.add(this.shape)
    }
  
    getGroup() {
        return this.group
    }

    getShape() {
        return this.shape
    }
  
    setBrightness(b) {
      this.shape.opacity(b)
    }
}

