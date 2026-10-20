/* -----------------------------------------------------------------------
 * collectable.js - codes for the collectable class
 *
 * The collectables are being shaped as hearts and being colored in different themes in different levels.
 * I have set this as a class so that the sketch.js can call out the collectable as many time as it can.
 *
 * Every collectable is having its positions, sizes, and one more variable for determining whether it is being collected (gained) by the game character.
 * When the character successfualy get the collectable, the heart will disappear by setting the position as "undefined" and turn on the isFound to let sketch.js knows it can add score to the player..
 *
 * Also, the color and edge_colors of each collectable are determined by the level argument it is being assigned.
 * Here, a switch block is being used.
 *
 * Values of the positions, size and levels are being stored in collectable.json.
 * preload() the json connection in the start of the game app, then in setup() those related values are being stored into arrays of objects.
 * Next, I use another array to store those collectable objects that are in the respective level.
 * The draw() part shows only collectable objects in the correct level.
 *
 * properties:
 *
 * x - the collectable's x position
 * y - the collectable's y position
 * width - the width of the collectable
 * height - the height of the collectable
 * upperCurveHeight - As the heart is drawned by Bezier curve, this variable is used for setting up how the upper part is curved
 * isFound - signal on whether the collectable is being collected by character or not
 * color - the filling color of the collectable
 * edge_color - the border color of the collectable
 * 
 * methods:
 *
 * constructor function
 * show() : for drawing the heart out
 * checkIsFound() : for checking whether this collectable is being touched by the character;
 *    if the character distance with center of the collectable is larger than its radical size, this is considered as being collected
 *
----------------------------------------------------------------------- */

class Collectable {
  constructor(x, y, size, level) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = this.width + 5;
    this.upperCurveHeight = this.height * 0.3;
    this.isFound = false;

    switch (level) {
      case Level.Moon_Level:
        this.color = color(212, 205, 228);
        this.edge_color = color(57, 45, 83);
        break;
      case Level.Flower_Level:
        this.color = color(250, 234, 237);
        this.edge_color = color(204, 133, 0);
        break;
      case Level.Rain_Level:
        this.color = color(194, 210, 225);
        this.edge_color = color(43, 49, 75);
        break;
      case Level.Orange_Level:
        this.color = color(255, 213, 137);
        this.edge_color = color(137, 89, 0);
        break;
      default:
        break;
    }
  }

  show() {
    stroke(this.edge_color);
    fill(this.color);
    push();
    translate(-this.width, -this.height);
    // begin drawing the heart
    beginShape();
    vertex(this.x, this.y + this.upperCurveHeight);
    bezierVertex(
      this.x,
      this.y,
      this.x - this.width / 2,
      this.y,
      this.x - this.width / 2,
      this.y + this.upperCurveHeight
    );
    bezierVertex(
      this.x - this.width / 2,
      this.y + (this.height + this.upperCurveHeight) / 2,
      this.x,
      this.y + (this.height + this.upperCurveHeight) / 2,
      this.x,
      this.y + this.height
    );
    bezierVertex(
      this.x,
      this.y + (this.height + this.upperCurveHeight) / 2,
      this.x + this.width / 2,
      this.y + (this.height + this.upperCurveHeight) / 2,
      this.x + this.width / 2,
      this.y + this.upperCurveHeight
    );
    bezierVertex(
      this.x + this.width / 2,
      this.y,
      this.x,
      this.y,
      this.x,
      this.y + this.upperCurveHeight
    );
    endShape();
    pop();
    noStroke();
  }

  checkIsFound() {
    if (
      dist(
        bear_character.getX() + bear_character.width,
        bear_character.getY() + bear_character.height,
        this.x,
        this.y + this.height
      ) < Math.max(this.width, this.height)
    )
      this.isFound = true;
  }
}
