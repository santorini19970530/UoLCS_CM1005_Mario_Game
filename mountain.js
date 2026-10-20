/* -----------------------------------------------------------------------
 * mountian.js - code for the mountain class
 *
 * This class contains related information for the mountain, like positions and the size.
 * I have controlled the mountain size smaller than 100, to keep the feel of distance
 * All the vertices are calculated by coordinate of input + number ratio of mountain width or height
 *
 * Compared to the mid-term project, the mountains' values are moved to mountain_data.JSON.
 *
 * properties:
 *
 * x - the mountain's x position
 * y - the mountain's y position (i.e. floor's y position)
 * width - the width of the mountain
 * height - the height of the mountain
 * 
 * methods:
 *
 * constructor function
 * show_mountain() : for drawing the mountain out
 *
----------------------------------------------------------------------- */

class Mountain {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.width = Math.max(size, 100);
    this.height = (this.width * 2) / 3; // ratio between width and height
  }

  show() {
    fill(59, 100, 104);
    triangle(
      this.x,
      this.y,
      this.x + this.width,
      this.y,
      this.x + this.width / 2,
      this.y - this.height
    );

    fill(255, 255, 255);
    beginShape(TESS);
    vertex(this.x + this.width / 2, this.y - this.height);
    vertex(this.x + (this.width * 19) / 30, this.y - (this.height * 147) / 200);
    vertex(this.x + (this.width * 17) / 30, this.y - (this.height * 157) / 200);
    vertex(this.x + (this.width * 16) / 30, this.y - (this.height * 143) / 200);
    vertex(this.x + (this.width * 14) / 30, this.y - (this.height * 153) / 200);
    vertex(this.x + (this.width * 13) / 30, this.y - (this.height * 130) / 200);
    vertex(
      this.x + (this.width * 106) / 300,
      this.y - (this.height * 141) / 200
    );
    vertex();
    endShape();

    noStroke();
  }
}
