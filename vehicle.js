class Vehicle {

  constructor(x, y, ms, mf) {
    this.position = createVector(x, y);
    this.r = 14;
    this.maxspeed = ms;
    this.maxforce = mf;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(this.maxspeed, 0);
  }

  applyBehaviors(vehicles, path) {
    // Follow path force
    let f = this.follow(path);
    // Separate from other boids force
    let s = this.separate(vehicles);
    f.mult(2);
    s.mult(1);
    this.applyForce(f);
    this.applyForce(s);

    for (let obstacle of path.obstacles) {
      let avoidForce = this.avoid(obstacle);
      avoidForce.mult(30);
      this.applyForce(avoidForce);
    }
  }

  avoid(obstacle) {
    let desired = p5.Vector.sub(this.position, obstacle.position);
    let d = desired.mag();
    if (d < obstacle.radius + this.r) {
      desired.normalize();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  run() {
    this.update();
    this.render();
  }

  // Implementing Craig Reynolds' path following algorithm
  // http://www.red3d.com/cwr/steer/PathFollow.html
  follow(path) {

    let predict = this.velocity.copy();
    predict.normalize();
    predict.mult(100);
    let predictpos = p5.Vector.add(this.position, predict);


    let normal = null;
    let target = null;
    let worldRecord = 1000000;

    // Loop through all points of the path
    for (let i = 0; i < path.points.length; i++) {

      let a = path.points[i];
      let b = path.points[(i + 1) % path.points.length];
      let normalPoint = getNormalPoint(predictpos, a, b);

      let dir = p5.Vector.sub(b, a);

      if (
        normalPoint.x < min(a.x, b.x) ||
        normalPoint.x > max(a.x, b.x) ||
        normalPoint.y < min(a.y, b.y) ||
        normalPoint.y > max(a.y, b.y)
      ) {
        normalPoint = b.copy();
        a = path.points[(i + 1) % path.points.length];
        b = path.points[(i + 2) % path.points.length];
        dir = p5.Vector.sub(b, a);
      }

      let d = p5.Vector.dist(predictpos, normalPoint);

      if (d < worldRecord) {
        worldRecord = d;
        normal = normalPoint;

        dir.normalize();

        dir.mult(50);
        target = normal.copy();
        target.add(dir);
      }
    }

    // debugging velocity
    if (debug) {

      // Draw predicted future position
      stroke(255);
      fill(0);
      line(this.position.x, this.position.y, predictpos.x, predictpos.y);
      ellipse(predictpos.x, predictpos.y, 4, 4);

      // Draw normal position
      stroke(255);
      fill(0);
      ellipse(normal.x, normal.y, 4, 4);

      // Draw actual target (red if steering towards it)
      line(predictpos.x, predictpos.y, target.x, target.y);
      if (worldRecord > path.radius) fill(255, 0, 0);
      noStroke();
      ellipse(target.x, target.y, 8, 8);
    }

    if (worldRecord > path.radius) {
      return this.seek(target);
    } else {
      return createVector(0, 0);
    }
  }

  // Separation between vehicles
  separate(boids) {
    let desiredseparation = this.r * 2;
    let steer = createVector(0, 0, 0);
    let count = 0;

    for (let i = 0; i < boids.length; i++) {
      let other = boids[i];
      let d = p5.Vector.dist(this.position, other.position);

      if (d > 0 && d < desiredseparation) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.normalize();
        diff.div(d); 
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxspeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);

    return steer;
  }

  render() {

    push();
    translate(this.position.x, this.position.y);

    let angle = atan2(this.velocity.y, this.velocity.x) + HALF_PI;
    rotate(angle);

    imageMode(CENTER);
    image(jet, 0, 0, this.r * 2, this.r * 2);
    pop();
  }

}

function getNormalPoint(p, a, b) {
  let ap = p5.Vector.sub(p, a);
  let ab = p5.Vector.sub(b, a);
  ab.normalize(); 
  ab.mult(ap.dot(ab));

  let normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}
