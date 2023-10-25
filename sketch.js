

// Using this variable to decide whether to draw all the stuff
let debug = false;

// A path object (series of connected points)
let path;

let landscape;

// Two vehicles
let vehicles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // Call a function to generate new Path object
  newPath();

  // We are now making random vehicles and storing them in an ArrayList
  // for (let i = 0; i < 120; i++) {
  //   newVehicle(random(width), random(height));
  // }

  for (let i = 0; i < path.points.length; i+=2) {
    let point = path.points[i];
    path.addObstacle(point.x, point.y, 30); // Assuming a radius of 30 for each obstacle
  }

}

function draw() {
  background(landscape);
  // Display the path
  path.display();

  for (let v of vehicles) {
    // Path following and separation are worked on in this function
    v.applyBehaviors(vehicles, path);
    // Call the generic run method (update, borders, display, etc.)
    v.run();
  }
}

function preload() {
  landscape = loadImage('cosmos11.png')
}

let obstacles = [];

function newPath() {
  path = new Path();

  let centerX = width / 2;
  let centerY = height / 2 + height * 0.03;
  let outerRadius = min(width, height) * 0.40;
  let innerRadius = outerRadius * 0.5;

  for (let i = 0; i < 10; i++) {
    let angleOffset = -HALF_PI;
    let angle = TWO_PI / 10 * i + angleOffset;
    let radius;
    if (i % 2 == 0) {
      radius = outerRadius + 30;  // Adjusted the outer points to account for obstacle radius
    } else {
      radius = innerRadius;
    }
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);
    path.addPoint(x, y);
  }
}


function mousePressed() {
  let maxspeed = random(2, 4);
  let maxforce = 0.3;
  vehicles.push(new Vehicle(mouseX, mouseY, maxspeed, maxforce));
}


function keyPressed() {
  if (key == "d") {
    debug = !debug;
  }
}

