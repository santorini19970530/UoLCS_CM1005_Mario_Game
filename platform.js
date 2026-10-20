/* -----------------------------------------------------------------------
 * platform.js - codes for the platform class
 *
 * The platforms in this game are just rectangles that hold the position of the game character. When the character jumps onto platform, the platform will stops the fall of character.
 * Similar to the other classes, due to the large amount of the canyons to be generated, making use of the canyon_data.json file to store the position, width and level data.
 * The code of the sketch,js will call out this Canyon class with arguments from JSON file to generate game canyon object into the game
 *
 * properties:
 *
 * x - the platform's x position
 * y - the platform's y position
 * width - the width of the platform
 * height - the height of the platform
 * color - the color of the platform
 * edge_color - edge of the platform
 * (the color tons of platform in different levels are the same as the background of each level, so I use the same variable to share the same value with backgrond and floor value)
 * 
 * methods:
 *
 * constructor function
 * show() : for drawing the platform out
 * checkCollision() : return true if the character is on the platform, otherwise return false
 *
----------------------------------------------------------------------- */

class Platform {
  constructor(x, y, width, height, color, edge_color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.edge_color = edge_color;
  }

  show() {
    push();
    stroke(this.edge_color);
    strokeWeight(5);
    fill(this.color);
    rect(this.x, this.y, this.width, -this.height);
    noStroke();
    noFill();
    pop();
  }

  checkCollision() {
    var left = this.x;
    var right = this.x + this.width;
    var top = this.y - this.height;

    // if the character is falling and character's vertical position is above the platform
    // plus if the character is within the horizontal range of the platform
    // the character is on the platfom
    if (bear_character.yStatus == yStatus.Falling && bear_character.y >= top)
      if (bear_character.x > left && bear_character.x < right) return true;
    return false;
  }
}
