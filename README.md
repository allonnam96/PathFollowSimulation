This code creates a dynamic space-themed visual experience where vehicles can follow a path through the cosmos, avoiding obstacles in the form of Death Stars. The vehicles, or jets, will follow a circular path and avoid obstacles while also avoiding each other.



How to Run:
http://127.0.0.1:5500/index.html
The canvas should automatically adjust to your window size.
Click on the canvas to add vehicles at the desired location.
Press 'y' to toggle the debug mode.
![plot](./screenshot.png)

Features:
Dynamic Window Size: The canvas adjusts to the size of the window.
Vehicles: They follow a specified path while avoiding collisions with other vehicles and obstacles.
Path: It's formed with a series of connected points. The path adjusts dynamically based on screen size.
Obstacles: Represented by asteroids, placed on the outer points of the path.
Debug Mode: By pressing the key "y", the user can toggle the debug mode on/off.
Functions:
Main functions:
setup(): Initializes the canvas and creates a new path.
draw(): This function continuously updates the canvas, rendering the path and moving vehicles.
preload(): Loads external assets like images before the main setup function.
newPath(): Creates a new path by adding points in a circular pattern.
Utility functions:
mousePressed(): Adds a new vehicle at the mouse's location.
keyPressed(): Toggles the debug mode.
colorFromRatio(ratio): Returns a color based on the ratio provided.
wavelengthToColor(wavelength): Converts a wavelength into its corresponding RGB color.
drawGradientLine(v1, v2, col1, col2): Draws a gradient line between two points.
Classes:
Path: Represents the path that the vehicles will follow. It can add points and obstacles.
Vehicle: Represents a vehicle that follows the path, avoids other vehicles, and avoids obstacles.
Assets:
Images:

Landscape (cosmos11.png): A background image to set the theme.
Jet (jet2.png): Represents a vehicle in the simulation.
Asteroid (asteroid6.png): Represents an obstacle in the path.
Sounds:


Note:
The vehicles' behavior can be adjusted by tweaking parameters in their class methods, like the radius of avoidance or the strength of various forces.
The code is written using the p5.js library. Ensure you have this library imported to run the script successfully.