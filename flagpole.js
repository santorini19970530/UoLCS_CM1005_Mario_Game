/* -----------------------------------------------------------------------
 * flagpole.js - codes for the flagpole class
 *
 * This class contains related information for the flagpole and the flag, these are the identificaition of the goal
 * When the character arrives the goal, the flag will goes down (flagpole is still the same)
 * All the vertices are calculated by coordinate of input + number ratio of mountain width or height
 *
 * The flag is a blck-white flag : every row has five or four black checks
 * First, set up the base of the flag (white), then use small black squares to consecutively stick onto the flag
 *
 * for the Flag class:
 *
 * properties:
 *
 * x - the flag's x position
 * y - the flag's y position
 * size - the size of the flag
 * velocity - velocity of drop of flag
 * gravity - acceleration of drop of flag
 * base_color
 * check_color - for making the goal flag
 * 
 * methods:
 *
 * constructor function
 * show() : drawing the flag out
 * flagMove() : when the character arrives the goal, the fla will drop down
 *
 * for the Flagploe class:
 *
 * properties:
 *
 * height - height of the flagpole
 * flag - a flagple contains the flag
 * relocateVector - move the coordinate to draw the flagpole
 * isReached - if the flagpole is being touched by the character, this is true, otherwise this is false (preset as false)
 *
 * methods:
 *
 * constructor function
 * show() - show the flag
 * checkFlagpole() - this is being called by the draw() for every scene, to check if the flag is being touched by the character
 *
----------------------------------------------------------------------- */

class Flag {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.velocity = 0;
    this.gravity = 0.25;
    this.base_color = color(0, 0, 0);
    this.check_color = color(255, 255, 255);
  }

  show() {
    var no_of_checks = 5;
    var checkSize = this.size / no_of_checks;

    stroke(100);
    fill(this.base_color);
    rect(this.x, this.y, this.size, this.size);
    stroke(0);
    fill(this.check_color);
    for (let i = 0; i < no_of_checks; i++)
      for (let j = 0; j < no_of_checks; j++)
        if ((i + j) % 2 == 1)
          rect(
            this.x + checkSize * i,
            this.y + checkSize * j,
            checkSize,
            checkSize
          );
    noStroke();
    noFill();
  }

  flagMove() {
    if (goal.isReached) {
      if (this.y < floor.y - this.size) {
        this.velocity += this.gravity;
        this.y =
          this.y + this.velocity < floor.y ? this.y + this.velocity : this.y;
      } else goal.isReached = false;
    }
  }
}

class Flagpole {
  constructor(x, y) {
    this.height = 200;
    this.flag = new Flag(x, y);
    this.relocateVector = createVector(x, y - this.height - this.flag.size);
    this.flag.y = this.relocateVector.y;
    this.isReached = false;
  }

  show() {
    // the pole
    stroke(100);
    fill(255, 255, 255);
    rect(
      this.relocateVector.x,
      this.relocateVector.y + this.flag.size,
      10,
      this.height
    );

    // the flag
    this.flag.show();
    noFill();
    noStroke();
  }

  checkFlagpole() {
    if (
      bear_character.getX() >= this.relocateVector.x &&
      bear_character.getX() <= this.relocateVector.x + this.flag.size
    )
      if (
        bear_character.getY() >= this.relocateVector.y &&
        bear_character.getY() <=
          this.relocateVector.y + this.height + this.flag.size
      )
        this.isReached = true;
  }
}
