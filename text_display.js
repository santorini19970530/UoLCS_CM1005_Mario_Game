/* -----------------------------------------------------------------------
 * Text_Display.js - codes for the Text_Display class
 *
 * Logic flow of the texts those need to be shown on the canvas are coded here.
 * The Text_Display class is the setting of the top display (score, lives of the character and the level of the gameplay);
 * The Win_Loss_Display class, by overrideing the show() method, displays only the text of the win and loss texts.
 *
 * properties:
 *
 * x - the text block's x position
 * y - the text block's y position
 * text - the text to be displayed
 * font - font type of the text; since there are two different types of fonts, this need to be argument of class
 * font_size - the font size; this is preset as 20 in the Text_Display class, and 100 for the Win_Loss_Display class
 * 
 * methods:
 *
 * constructor function
 * show() : for show the text on the canvas
 * show() of Win_Loss_Display class : this overrides the mother class' show() method, by setting different text to be displayed and different text align property
 *
----------------------------------------------------------------------- */

class Text_Display {
  constructor(x, y, text, font, font_size = 20) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.display_font = font;
    this.font_size = font_size;
  }

  show() {
    fill(255, 255, 255);
    stroke(0, 0, 0);

    textSize(this.font_size);
    textFont(this.display_font);
    text("Score : " + score.toString().padStart(3, "0"), this.x, this.y);
    text("Lives : " + lives, (width * 4) / 9, this.y);
    text("Level : " + (current_level + 1).toString(), (width * 8) / 9, this.y);
    text(this.text);
    noFill();
    noStroke();
  }
}

class Win_Loss_Display extends Text_Display {
  constructor(x, y, text, font, font_size = 100) {
    super(x, y, text, font);
    this.font_size = font_size;
  }

  show() {
    fill(255, 255, 255);
    stroke(0, 0, 0);

    textSize(this.font_size);
    textFont(this.display_font);
    textAlign(CENTER);
    text(this.text, this.x, this.y);
    noFill();
    noStroke();
  }
}
