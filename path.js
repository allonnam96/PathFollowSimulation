

class Path {
  constructor() {
    this.originalRadius = 30;
    this.radius = this.originalRadius; // Store the current radius
    this.points = [];
    this.obstacles = []; // Store obstacles
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

  // Draw the path
  display() {
    strokeJoin(ROUND);
    

    // Draw thick line for radius
    // stroke(175);
    // strokeWeight(this.radius * 2);
    // noFill();
    // beginShape();
    // for (let v of this.points) {
    //   vertex(v.x, v.y);
    // }
    // endShape(CLOSE);
    // Draw thin line for center of path
    stroke(255, 215, 0)
    // stroke(0);
    strokeWeight(4);
    noFill();
    beginShape();
    for (let v of this.points) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);

    for (let obstacle of this.obstacles) {
      // fill(0, 0, 0); // black color for obstacles
      // noFill(); 
      fill(255);
      noStroke();
      ellipse(obstacle.x, obstacle.y, obstacle.z * 2); // Draw obstacles as circles
    }
  }
}