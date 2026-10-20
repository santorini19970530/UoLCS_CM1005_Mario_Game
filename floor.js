/* -----------------------------------------------------------------------
 * floor.js - coding for the floor class
 *
 * This class contains codes of the game floor.
 * Compared with the mid-term project, the x position of floor has been moved to the class, and coloring properties are newly added.
 * The color values are shared with the platforms in the same level. These value are being stored into load_data.json.
 *
 * properties:
 *
 * x - the floor's starting x position
 * y - the floor's y position
 * width - the width of the floor, i.e. the length of the game
 * color - color of the floor; normally this is being set as the same as 
 * edge_color - color of the floor edges
 * 
 * methods:
 *
 * constructor function
 * show() : for drawing the floor object
 *
----------------------------------------------------------------------- */

class Floor {
  constructor(x, y, color, edge_color) {
    this.x = x;
    this.y = y;
    this.width = 5000;
    this.color = color;
    this.edge_color = edge_color;
  }

  show() {
    fill(this.color);

    push();
    stroke(this.edge_color);
    strokeWeight(10);

    rect(this.x, this.y, this.width, height - this.y);

    pop();
    noFill();
    noStroke();
  }
}
