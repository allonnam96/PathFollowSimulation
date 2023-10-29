

class Path {
  constructor() {
    this.originalRadius = 30;
    this.radius = this.originalRadius;
    this.points = [];
    this.obstacles = [];
    this.startColor = color(148, 0, 211); 
    this.endColor = color(255, 0, 0);
  }
  

  // Add a point to the path
  addPoint(x, y) {
    let point = createVector(x, y);
    this.points.push(point);
  }

  addObstacle(x, y, obstacleRadius) {
    let obstacle = createVector(x, y, obstacleRadius);
    this.obstacles.push(obstacle);
  }


  display() {
    strokeJoin(ROUND);

    noFill();
    
    // Loop through the path points and draw each segment with a gradient color
    for (let i = 0; i < this.points.length - 1; i++) {
        let col1 = colorFromRatio(i / this.points.length);
        let col2 = colorFromRatio((i + 1) / this.points.length);
        drawGradientLine(this.points[i], this.points[i + 1], col1, col2);
    }
    let col1 = colorFromRatio((this.points.length - 1) / this.points.length);
    let col2 = colorFromRatio(0); 
    drawGradientLine(this.points[this.points.length - 1], this.points[0], col1, col2);

    for (let obstacle of this.obstacles) {
      image(asteroid, obstacle.x - obstacle.z * 2, obstacle.y - obstacle.z * 1.7, obstacle.z * 4, obstacle.z * 4);

}
}
}

function colorFromRatio(ratio) {
let wavelength = lerp(380, 750, 1 - ratio);
return wavelengthToColor(wavelength);
}

function wavelengthToColor(wavelength) {
let gamma = 0.8;
let intensityMax = 255;
let factor, R, G, B;

if (wavelength >= 380 && wavelength < 440) {
    R = -(wavelength - 440) / (440 - 380);
    G = 0.0;
    B = 1.0;
} else if (wavelength < 490) {
    R = 0.0;
    G = (wavelength - 440) / (490 - 440);
    B = 1.0;
} else if (wavelength < 580) {
    R = (wavelength - 490) / (580 - 490);
    G = 1.0;
    B = -(wavelength - 580) / (580 - 490);
} else if (wavelength < 645) {
    R = 1.0;
    G = -(wavelength - 645) / (645 - 580);
    B = 0.0;
} else if (wavelength <= 750) {
    R = 1.0;
    G = 0.0;
    B = 0.0;
} else {
    R = 0.0;
    G = 0.0;
    B = 0.0;
}

// Adjust intensity
if (wavelength >= 380 && wavelength < 420) {
    factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
} else if (wavelength < 645) {
    factor = 1.0;
} else if (wavelength <= 750) {
    factor = 0.3 + 0.7 * (750 - wavelength) / (750 - 645);
} else {
    factor = 0.0;
}

let Rf = round(intensityMax * (R * factor)**gamma);
let Gf = round(intensityMax * (G * factor)**gamma);
let Bf = round(intensityMax * (B * factor)**gamma);

return color(Rf, Gf, Bf);
}

function drawGradientLine(v1, v2, col1, col2) {
let segments = 10;
strokeWeight(4);
for (let i = 0; i < segments; i++) {
    let x = lerp(v1.x, v2.x, i / segments);
    let y = lerp(v1.y, v2.y, i / segments);
    let x2 = lerp(v1.x, v2.x, (i + 1) / segments);
    let y2 = lerp(v1.y, v2.y, (i + 1) / segments);
    
    let interCol = lerpColor(col1, col2, i / segments);
    
    stroke(interCol);
    line(x, y, x2, y2);
}
}