/* -----------------------------------------------------------------------
 * canyon.js - codes for the canyon class
 *
 * The canyons in this game is trapping the game character, making the character falls, and then the character loses.
 * Two rectangles are in this object (making this like hole), plus a machanism to check whether the character fulfill the conditions of fall or not.
 * Similar to the other classes, due to the large amount of the canyons to be generated, making use of the canyon_data.json file to store the position, width and level data.
 * The code of the sketch,js will call out this Canyon class with arguments from JSON file to generate game canyon object into the game
 *
 * properties:
 *
 * x - the canyon's horizontal position
 * y - the canyou's vertical position (i.e. floor's y position)
 * width - the width of the canyon
 * color - the color of the canyon
 * edge_color - edge of the canyon
 * (the color tons of canyons in different levels are the same as the background of each level, so I use the same variable to share the same value with backgrond and floor value)
 * 
 * methods:
 *
 * constructor function
 * show() : for drawing the canyon out
 * checkDropIntoCanyon() : return true if the character falls into the canyon, otherwise return false
 *
----------------------------------------------------------------------- */

class Canyon {
  constructor(x, y, width, color, edge_color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.color = color;
    this.edge_color = edge_color;
  }

  show() {
    push();
    fill(this.color);
    stroke(this.edge_color);
    strokeWeight(10);
    rect(this.x, this.y, this.width, this.y);
    strokeWeight(0);
    rect(this.x + 5, this.y + 5, this.width - 10, -10);
    noStroke();
    pop();
  }

  checkDropIntoCanyon() {
    if (
      bear_character.getY() >= floor.y &&
      bear_character.getX() > this.x &&
      bear_character.getX() + bear_character.getWidth() < this.x + this.width
    )
      return true;

    return false;
  }
}
