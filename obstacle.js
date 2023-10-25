class Obstacle {
    constructor(x, y, r) {
      this.position = createVector(x, y);
      this.radius = r;
    }
  
    display() {
      imageMode(CENTER);
      image(asteroid, this.position.x, this.position.y, this.radius * 0.1, this.radius * 0.1);
    }
  }