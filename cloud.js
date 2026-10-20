/* -----------------------------------------------------------------------
 * cloud.js - codes for the cloud class
 *
 * This class contains related information for the cloud, like positions and the size
 * I have controlled the cloud size between 30 and 60, otherwise this will be too big and too much fir visualisation
 *
 * Here, only the cloud procedures are being coded.
 * The figures of data like value of x, y, size and levels are all store into JSON data files.
 * To minimise data loading time and database normialisationi issue, the color data are just placed here instead.
 * So I just need to use switch block to assign the color values in accordance to the level the cloud in.
 * The values are being stored into cloud_data.JSON
 *
 * properties:
 *
 * x - the cloud's horizontal position
 * y - the cloud's vertical position
 * size - the width of the cloud
 * ratio - ratio of the size of the cloud circles
 * level - the level in which the cloud is
 *
 * methods:
 *
 * constructor function
 * show() : for drawing the cloud out
 *
----------------------------------------------------------------------- */

class Cloud {
  constructor(x, y, size, level) {
    // position properties
    this.x = x;
    this.y = y;

    // size properties
    this.size = Math.min(size, 50);
    this.ratio = this.size / 80;

    // color and theme properties
    switch (level) {
      case Level.Moon_Level:
        this.color = color(224, 219, 236);
        this.shadow_color = color(163, 147, 197);
        break;
      case Level.Flower_Level:
        this.color = color(255, 231, 235);
        this.shadow_color = color(255, 192, 203);
        break;
      case Level.Rain_Level:
        this.color = color(210, 248, 251);
        this.shadow_color = color(28, 220, 234);
        break;
      case Level.Orange_Level:
        this.color = color(255, 200, 98);
        this.shadow_color = color(255, 165, 0);
        break;
      default:
    }
  }

  show() {
    // draw the shadow first
    push();
    fill(this.shadow_color);

    noStroke();
    line(0, 0, 100, 100);
    ellipse(
      this.x + 10 * this.ratio,
      this.y + 10 * this.ratio,
      this.size,
      this.size
    );
    ellipse(
      this.x - 30 * this.ratio,
      this.y + 20 * this.ratio,
      this.size * 0.75,
      this.size * 0.75
    );
    ellipse(
      this.x + 50 * this.ratio,
      this.y + 10 * this.ratio,
      this.size * 0.75,
      this.size * 0.75
    );

    // then the cloud body
    noFill();

    fill(this.color);

    ellipse(this.x, this.y, this.size, this.size);
    ellipse(
      this.x - 40 * this.ratio,
      this.y + 10 * this.ratio,
      this.size * 0.75,
      this.size * 0.75
    );
    ellipse(
      this.x + 40 * this.ratio,
      this.y,
      this.size * 0.75,
      this.size * 0.75
    );

    noFill();
    pop();
  }
}
