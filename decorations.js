/* -----------------------------------------------------------------------
 * decorations.js - codes for the sun, moon and raindrop classes
 *
 * These are the classes that for decorations on the backgroud of each levels.
 * The sun and then moon are sole and move with the character, hence they are just declared as single objects and do not push() and pop() with other objects.
 * The sun will be appeared only on the last level, while hte moon will be appeared on the first level.
 *
 * In the third level, to simulate the rain effect, I have added a rain sound (in sketch.js)  and raindrop effect.
 * This is a bunch of rain droplets (1000 droplets in this project) that keeps dropping onto the game floor.
 * Those rain droplets will be assigned to another raindrops if it has arrived the floor.
 *
 * For the Sun and Moon classes:
 *
 * properties:
 *
 * x - the horizontal position
 * y - the vertical position
 * size - the size
 * color - color of the sun and moon main part
 * edge_color - color of the sun (outermost part) and moon (the part making cresent shape by covering part of full moon)
 * side_color (only for sun) - middle part of the sun
 * size_ratio (only for sun) - expand the main part size to the middle part
 * edge_ratio (only for sun) - expand the main part size to the edge part
 *
 * methods:
 *
 * constructor function
 * show() : for drawing the sun and moon out
 *
 * For the RainDrop class:
 *
 * properties:
 *
 * x - horizontal position
 * y - vertical position
 * color - rain droplet color
 * thickness - size of the rain droplets
 * length - lenght of the rain droplets
 * gravity - dropping acceleration of the rain droplets
 * speed - dropping speed of the rain droplets
 *
 * methods:
 *
 * constructor function
 * show() - show one rain droplet out
 * drop() - make the rain droplet drop
 *
----------------------------------------------------------------------- */

class Sun {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = color(253, 184, 19);
    this.side_color = color(241, 122, 34);
    this.edge_color = color(255, 153, 0);
    this.size = 100;
    this.size_ratio = 1.2;
    this.edge_ratio = 1.4;
  }

  show() {
    push();

    fill(this.edge_color);
    ellipse(
      this.x,
      this.y,
      this.edge_ratio * this.size,
      this.edge_ratio * this.size
    );
    fill(this.side_color);
    ellipse(
      this.x,
      this.y,
      this.size_ratio * this.size,
      this.size_ratio * this.size
    );
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);

    pop();
  }
}

class Moon extends Sun {
  constructor(x, y) {
    super(x, y);
    this.size = 100;
    this.color = color(240, 196, 32);
    this.edge_color = color(113, 89, 166);
  }

  show() {
    push();

    fill(this.color);
    ellipse(this.x + 20, this.y + 20, this.size, this.size);
    fill(this.edge_color);
    ellipse(this.x, this.y, this.size, this.size);

    pop();
  }
}

class RainDrop {
  constructor(x, y, length) {
    this.x = x;
    this.y = y;
    this.color = color(255, 255, 255);
    this.thickness = 3;
    this.length = length;
    this.gravity = 1;
    this.speed = random(0, 0.1);
  }

  show() {
    push();
    strokeWeight(this.thickness);
    stroke(this.color);
    line(this.x - this.length * 0.3, this.y, this.x, this.y - this.length);
    pop();
  }

  drop() {
    if (this.y < floor.y) {
      this.speed += this.gravity;
      this.y += this.speed;
    }
  }
}
