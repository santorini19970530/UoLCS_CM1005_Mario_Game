/* -----------------------------------------------------------------------
 * enemy.js - coding for the fireball class
 *
 * This class contains codes of the game fireball. This is actually the enemies.
 * The ball will move donw from the top right hand corneer of the screen, then move slopely down to the left, until the 50 pixels above game floor. In case the fireball gets touch with the character, the character will get red and fall to die.
 *
 * properties:
 *
 * x - the fireball's horizontal position
 * y - the fireball's vertical position
 * size - the size of the fireball
 * xVelocity - the horizontal velocity of the object
 * yVelocity - the vertical velocit of the object
 * yLowersHeight - the lowest position tha the fireball that can fall
 * 
 * methods:
 *
 * constructor function
 * show() : for drawing the enemy object
 * move() : move the fireball in dedicated direction and speed
 * checkCollideWithCharacter() : for checking whether one of the fireballs collide with the character, return true is yes, otherwise false
 *
----------------------------------------------------------------------- */

class FireBall {
  constructor(x, y, size, patrol) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.patrol = !!patrol;
    this.xVelocity = this.patrol ? 3 : -5;
    this.yVelocity = this.patrol ? 0 : 10;
    this.yLowestHeight = 50;
    this.left = x - 120;
    this.right = x + 120;
  }

  show() {
    push();

    stroke(0, 0, 0);
    strokeWeight(5);
    fill(this.patrol ? 255 : 255, this.patrol ? 140 : 0, 0);
    ellipse(this.x, this.y, this.size, this.size);

    pop();
  }

  checkCollideWithCharacter() {
    let distance = dist(
      this.x,
      this.y,
      bear_character.getX(),
      bear_character.getY()
    );
    if (distance < 45) return true;
    return false;
  }

  move() {
    if (this.patrol) {
      this.y = floor.y - this.size / 2;
      this.x += this.xVelocity;
      if (this.x < this.left || this.x > this.right) this.xVelocity *= -1;
      return;
    }
    this.x += this.xVelocity;
    if (this.y < floor.y - this.yLowestHeight) this.y += this.yVelocity;
  }
}
