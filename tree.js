/* -----------------------------------------------------------------------
 * tree.js - codes for the tree class
 *
 * Compared with the mid-term project, one more type of tree is added : Orchid_Tree.
 * The Sakura_Tree and Orchid_Tree which inheritance of tree class.
 * As they have the same x y positions and the same tree trunk shape, the code can be reused for two type of trees
 *
 * The show_leaves method in Tree class (green triangles) has been overided in Sakura_Tree (by three pink circles), to draw sakura flowers
 * Similary, the Orchid_Tree override also the show_leaves() method to show the orchid leaves (simplified by a circle in purple)
 *
 * The positional x and y, size and level values are stored in JSON file tree_data.JSON.
 * sketch.js will call the trees out, then "new" the respective class in accordnece to the "level" the tree is in.
 * If the tree is in level 1, the type of tree is Orchid_Tree;
 * if the tree is in level 2, the type is Sakura_Tree;
 * if the tree is in level 3, the type is simple Tree;
 * in the final round,, the three types of trees are "new" in accordance to the ID values, i.e. they are comping out in consecutive sequence
 *
 * properties:
 *
 * x - the tree's x position
 * y - the tree's y position (actually the vertical position of the floor)
 * branch_color - the color of the trunk
 * leaves_color - color of the leaves; this would be overrided in accordane to different levels
 *
 * methods:
 *
 * constructor function
 * show() : for drawing the tree out (one brown trunk)
 * show_leaves() : for drawing the leaves (two triangles) / sakura flowers (three pink circles) / orchid flowers (purple big circle)
 *
----------------------------------------------------------------------- */

class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.branch_color = color(120, 100, 40);
    this.leaves_color = color(0, 155, 0);
  }

  show() {
    fill(this.branch_color);

    // tree trunk
    rect(this.x, this.y, 60, -150);

    // tree leaves
    this.show_leaves();
    noFill();
  }

  show_leaves() {
    fill(this.leaves_color);

    // all y positions minus 150 for better position
    triangle(
      this.x - 50,
      this.y + 50 - 150,
      this.x + 30,
      this.y - 50 - 150,
      this.x + 110,
      this.y + 50 - 150
    );

    triangle(
      this.x - 50,
      this.y - 150,
      this.x + 30,
      this.y - 100 - 150,
      this.x + 110,
      this.y - 150
    );

    noStroke();
    noFill();
  }
}

class Sakura_Tree extends Tree {
  constructor(x, y) {
    super(x, y);
    this.leaves_color = color(255, 222, 236);
  }

  show_leaves() {
    fill(this.leaves_color);
    ellipse(this.x - 10, this.y - 150, 110, 100);
    ellipse(this.x + 60, this.y - 150, 110, 100);
    ellipse(this.x + 30, this.y - 60 - 150, 110, 100);
    noFill();
  }
}

class Orchid_Tree extends Tree {
  constructor(x, y) {
    super(x, y);
    this.leaves_color = color(165, 71, 148);
  }

  show_leaves() {
    fill(this.leaves_color);
    ellipse(this.x + 30, this.y - 150, 180, 180);
    noFill();
  }
}
