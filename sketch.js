/* -----------------------------------------------------------------------

The Game Project for CM1005 ITP1

Student Name ; NGAI Chi Hung

Student Number : 220227964

Date : 16 SEP 2023 GMT+8

----------------------------------------------------------------------- */

/* -----------------------------------------------------------------------
 *
 * My Developing Environment
 * 
 * macOS 13.4.1 - Operating System
 *
 * iTerms Build 3.4.19 - macOS Terminal Replacement software
 *
 * nvim 0.8 - code editor
 *
 * PHP 8.2.7 - set up localhost internal web server, to compile the codes
 *
----------------------------------------------------------------------- */

/* -----------------------------------------------------------------------
 *
 * File Structure
 *
 * This folder
 * |
 * | --- sounds (sound folder: bgm.mp3, blink.mp3, jump.mp3, lost.mp3)
 * |
 * | --- fonts (font folder: Minecraft.ttf, wasted.ttf)
 * |
 * | --- data (data folder, all are JSON data files : canyon_data, cloud_data, collectable_data, level_data, mountain_data, platform_data, tree_data)
 * |
 * | --- index.html (sole html file that calls out the script files)
 * |
 * | --- canyon.js (code for canyon)
 * |
 * | --- character.js (code for character)
 * |
 * | --- cloud.js (code for the cloud)
 * |
 * | --- collectable.js (code for collectable)
 * |
 * | --- decorations.js (code for decorations like the Sun, Moon and RainDrop)
 * |
 * | --- enemy.js (code for enemy)
 * |
 * | --- flagpole.js (code for flag and flagpole)
 * | 
 * | --- floor.js (code for the floor)
 * | 
 * | --- mountain.js (code for the mountain)
 * | 
 * | --- p5.min.js (p5.js main library file)
 * | 
 * | --- p5.sound.js (p5.js sound library file)
 * | 
 * | --- sketch.js (this file - the setup() and draw() codes)
 * |
 * | --- text_display.js (score for the text classes)
 * | 
 * | --- tree.js (code for the tree class (there are three tree classes))
 *
----------------------------------------------------------------------- */

/* -----------------------------------------------------------------------
 *
 * What my work does
 *
 * * My code has been divided into several files, and each of them represents each of the game object respectively
 * * The main purpose of this is for the ease of managing my code and for the ease of follow-up
 * * To call each of the class code out, index.html has got several src tags ref to each of the .js files
 * * 
 * * The sketch js, as the flow of the game, will call out each of the "show()" methods of the classes and print the object onto the game frame
 * *
 * Game Project Part 1
 * 1.1 basic drawing of the game character - in character.js
 *
 * Game Project Part 2
 * 2.1 different state of the game character - in character.js
 * 2.2 drawing the tree - in tree.js
 * 2.3 drawing the canyon - in canyon.js
 * 2.4 drawing the collectable - in collectable.js
 * 2.5 drawing the mountain - in mountain.js
 * 2.6 drawing the cloud - in cloud.js
 *
 * Game Project Part 3
 * 3.1 Interaction of the character - in character.js
 * 3.2 Move the character left and right - in character.js
 * 3.3 Mpve the character jump with gravity - in character.js
 * 3.4 Interaction of the collectable - in collectable.js
 * 3.5 Interaction of the canyon - in canyon,.js
 * 
 * Game Project Part 4 and 5
 * My code is using arrrays of objects (Part 5) instead of just using one variable for many individual interactions (Part 4), so I mix the requirements of them together
 * 4.1 Array of the trees - in sketch.js
 * 4.2 Array of the clouds - in sketch.js
 * 4.3 Scrolling - in sketch.js
 * 4.4 Refactor the codes - done by creating classes and dividing into the different files
 * 4.5 Interaction and Array of the collectables - detection in collectable.js , array operations in sketch.js
 * 4.6 Array of the canyon - sketch.js
 *
 * Game Project Part 6
 * Below are the extra items of this MidTerm
 *  6.1 Score counting and show the score on screen
 *  6.2 Flagpole mechanism - done by new js file flagpole.js
 *  6.3 Lives mechanism - add one variable in sketch.js to count lives
 *  6.4 Game end (both win and lost) mechanisms - related to 6.3, if the lives less than zero, the game has to be refreshed
 *
 * Game Project Part 7
 * Below are the extensions of the game project
 * 7.1 Add the sounds - added sounds of the jump and get the collectables (more to go during the final project)
 * 7.2 Add platforms and its mechanism - done by platform.js
 * 7.3 Add enemies - donw by platform.js
 * Additional extension : four levels that the character can go through
 *
----------------------------------------------------------------------- */
/**************
 * global variables
 ****************/

/* floors, camera and platforms */
var floor;
var bear_character;
var jump_sound;
var cameraPosX;
var cameraMovingSpeed;

/* background and decorations */
var background_color;
var sun, moon;
var rain_drops = [];
var rain_sound;

/* clouds */
var clouds = [];
var cloud_data;
var clouds_in_level = [];

/* trees */
var trees = [];
var tree_data;
var trees_in_level = [];

/* mountains */
var mountains = [];
var mountain_data;
var mountains_in_level = [];

/* canyons */
var canyons = [];
var canyon_data;
var canyons_in_level = [];

/* platforms */
var platforms = [];
var platform_data;
var platforms_in_level = [];

/* text on the screen */
var text_display;
var score;
var score_current;
var score_font;
var wasted_font;
var lives;
var lost_sound;

// enemy
var fireballs = [];

/* data of each levels */
var levels = [];
var current_level;
var goal;

/* collectables */
var collectables = [];
var collectable_data;
var collectables_in_level = [];
var collectable_sound;

// enum for each level
const Level = {
  Moon_Level: 0,
  Flower_Level: 1,
  Rain_Level: 2,
  Orange_Level: 3,
};

function preload() {
  // sound settings
  jump_sound = loadSound("./sounds/jump.mp3");
  jump_sound.setVolume(0.2);
  jump_sound.rate(1.5);

  collectable_sound = loadSound("./sounds/blink.mp3");
  collectable_sound.setVolume(1);
  collectable_sound.rate(1.5);

  lost_sound = loadSound("./sounds/lost.mp3");
  lost_sound.setVolume(0.3);
  lost_sound.rate(1);

  background_sound = loadSound("./sounds/bgm.mp3");
  background_sound.setVolume(0.01);
  background_sound.rate(1);

  rain_sound = loadSound("./sounds/rain.mp3");
  rain_sound.setVolume(0.1);
  rain_sound.rate(1);

  // font settins
  score_font = loadFont("./fonts/Minecraft.ttf");
  wasted_font = loadFont("./fonts/wasted.ttf");

  // database (all JSON files)
  cloud_data = loadJSON("./data/cloud_data.json");
  tree_data = loadJSON("./data/tree_data.json");
  canyon_data = loadJSON("./data/canyon_data.json");
  mountain_data = loadJSON("./data/mountain_data.json");
  collectable_data = loadJSON("./data/collectable_data.json");
  level_data = loadJSON("./data/level_data.json");
  platform_data = loadJSON("./data/platform_data.json");
}

function setup() {
  score = 0;
  score_current = 0;
  max_star_pos = 0;
  lives = 3;
  current_level = Level.Moon_Level;
  cameraMovingSpeed = 7;

  createCanvas(1024, 576);

  // load all data from JSON files
  load_json_data();

  // build up (i.e. call) the components that shold be available on assigned level
  buildup_level();

  /* set up for text displays */
  text_display = new Text_Display(20, 20, `The score is ${score}.`, score_font);

  // setting up to background objects
  bear_character.show();
  cameraPosX = bear_character.getX() - 250;
  sun = new Sun(width - 100, 100);
  moon = new Moon(width - 100, 100);
  for (let i = 0; i < 1000; i++)
    rain_drops.push(
      new RainDrop(random() * width, -random() * floor.y, random() * 10)
    );
  if (current_level == Level.Rain_Level) rain_sound.loop();
  else rain_sound.stop();
  goal = new Flagpole(floor.width * 0.7, floor.y);

  // loop to bgm
  background_sound.loop();
}

function draw() {
  if (lives > 0) {
    if (current_level <= Level.Orange_Level) {
      background(background_color);

      // show the decorations depending on the level the character is in
      switch (current_level) {
        case Level.Moon_Level:
          moon.show();
          break;
        case Level.Orange_Level:
          sun.show();
          break;
        case Level.Rain_Level:
          for (let i = 0; i < rain_drops.length; i++) {
            if (rain_drops[i].y + rain_drops[i].length > floor.y)
              rain_drops[i] = new RainDrop(
                random() * width,
                -random() * floor.y,
                random() * 10
              );
            else rain_drops[i].show();
          }
          break;
        default:
          break;
      }
      // camera movement
      // later use translate() to shift the whole gameplay scene
      scrollX();

      push();
      translate(-cameraPosX + width / 2, 0);

      for (let i = 0; i < clouds_in_level.length; i++)
        clouds_in_level[i].show();
      for (let i = 0; i < mountains_in_level.length; i++)
        mountains_in_level[i].show();
      for (let i = 0; i < trees_in_level.length; i++) trees_in_level[i].show();
      floor.show();
      for (let i = 0; i < canyons_in_level.length; i++)
        canyons_in_level[i].show();
      for (let i = 0; i < platforms_in_level.length; i++)
        platforms_in_level[i].show();
      for (let i = 0; i < collectables_in_level.length; i++)
        collectables_in_level[i].show();
      goal.show();
      for (let i = 0; i < fireballs.length; i++) fireballs[i].show();
      bear_character.show();

      pop();

      // for next frame
      for (let i = 0; i < rain_drops.length; i++) rain_drops[i].drop();

      for (let i = 0; i < fireballs.length; i++) fireballs[i].move();
      bear_character.moveX();
      bear_character.moveY();

      goal.checkFlagpole();
      goal.flag.flagMove();

      // if each round ends, the gameplay will be refreshed or the game will be ended with showing texts
      if (goal.isReached == true) {
        bear_character.xStatus = xStatus.Stable;
        if (goal.flag.y >= floor.y - goal.flag.size) {
          current_level += 1;
          score_current = score;
          buildup_level();
          bear_character.repost(100, floor.y - 100);
          bear_character.yStatus = yStatus.Falling;
          cameraPosX = bear_character.getX() - 250;
        }
      }
      text_display.show();
    } else {
      background_sound.stop();
      var winText = new Win_Loss_Display(
        width / 2,
        height / 2,
        "You Win",
        score_font
      );
      push();
      fill(color(0, 0, 0, 1));
      rect(0, 0, width, height);
      winText.show();
      pop();
    }
  } else {
    background_sound.stop();
    var lostText = new Win_Loss_Display(
      width / 2,
      height / 2,
      "You Lost",
      wasted_font
    );
    push();
    fill(color(0, 0, 0, 1));
    rect(0, 0, width, height);
    lostText.show();
    pop();
  }
  // if the character has touched one of the collectables, the collectable will disappear and the player will gain one more score
  for (let i = 0; i < collectables_in_level.length; i++) {
    collectables_in_level[i].checkIsFound();
    if (collectables_in_level[i].isFound) {
      score += 10;
      collectable_sound.play();
      collectables_in_level[i].x = undefined;
      collectables_in_level[i].y = undefined;
      collectables_in_level[i].isFound = false;
    }
  }

  // if the character gets touched with one of the enemies (fireballs), the level will be restarted to the beginning (and the score will go back to last level score) or ends
  for (let i = 0; i < fireballs.length; i++)
    if (fireballs[i].checkCollideWithCharacter()) {
      bear_character.yStatus = yStatus.Attacked;
      bear_character.yVelocity = -10;
    }

  // check whether the character has touched one of the canyons
  // if yes, set the isDropCanyon property to be true and then make the character drop into the canyon effective next frame
  for (let i = 0; i < canyons_in_level.length; i++)
    if (canyons_in_level[i].checkDropIntoCanyon()) {
      bear_character.yStatus = yStatus.Trapped;
      break;
    }
}

function keyPressed() {
  switch (keyCode) {
    case 65:
      if (
        bear_character.getYStatus() != yStatus.Trapped &&
        bear_character.getYStatus() != yStatus.Attacked
      )
        if (bear_character.getX() > -200) bear_character.xStatus = xStatus.Left;
      break;
    case 83:
      if (
        bear_character.getYStatus() != yStatus.Trapped &&
        bear_character.getYStatus() != yStatus.Attacked
      )
        bear_character.xStatus = xStatus.Right;
      break;
    case 32:
      if (
        bear_character.getYStatus() != yStatus.Falling &&
        bear_character.getYStatus() != yStatus.Jumping &&
        bear_character.getYStatus() != yStatus.Trapped &&
        bear_character.getYStatus() != yStatus.Attacked
      ) {
        bear_character.yStatus = yStatus.Jumping;
        jump_sound.play();
      }
      break;
    case SHIFT:
      if (
        bear_character.getYStatus() != yStatus.Falling &&
        bear_character.getYStatus() != yStatus.Jumping &&
        bear_character.getYStatus() != yStatus.Trapped &&
        bear_character.getYStatus() != yStatus.Attacked
      ) {
        bear_character.run();
        cameraMovingSpeed = 12;
      }
      break;
    default:
  }
}

function keyReleased() {
  switch (keyCode) {
    case 65:
    case 83:
      if (
        bear_character.getYStatus() != yStatus.Trapped ||
        bear_character.getYStatus() != yStatus.Attacked
      )
        bear_character.xStatus = xStatus.Stable;
      break;
    case 32:
      if (
        bear_character.getYStatus() != yStatus.Trapped &&
        bear_character.getYStatus() != yStatus.Attacked
      )
        bear_character.yStatus = yStatus.Falling;
      break;
    case SHIFT:
      if (
        bear_character.getYStatus() != yStatus.Trapped ||
        bear_character.getYStatus() != yStatus.Attacked
      ) {
        bear_character.walk();
        cameraMovingSpeed = 7;
      }
      break;
    default:
  }
}

// load all JSON data
function load_json_data() {
  /* load levels data */
  for (var key in level_data) {
    if (!levels) levels[level_data[key]];
    else levels.push(level_data[key]);
  }

  /* load clouds data*/
  for (var key in cloud_data) {
    if (!clouds) clouds[cloud_data[key]];
    else clouds.push(cloud_data[key]);
  }

  /* load mountains data */
  for (var key in mountain_data)
    if (!mountains) mountains[mountain_data[key]];
    else mountains.push(mountain_data[key]);

  /* load tree data */
  for (var key in tree_data) {
    if (!trees) trees[tree_data[key]];
    else trees.push(tree_data[key]);
  }

  /* load canyou data */
  for (var key in canyon_data) {
    if (!canyons) canyons[canyon_data[key]];
    else canyons.push(canyon_data[key]);
  }

  /* load collectables data */
  for (var key in collectable_data)
    if (!collectables) collectables[collectable_data[key]];
    else collectables.push(collectable_data[key]);

  /* load platforms data */
  for (var key in platform_data)
    if (!platforms) platforms[platform_data[key]];
    else platforms.push(platform_data[key]);
}

// everything of each levels will change
function buildup_level() {
  // clear objects of last level
  clouds_in_level = [];
  mountains_in_level = [];
  trees_in_level = [];
  canyons_in_level = [];
  collectables_in_level = [];
  platforms_in_level = [];
  goal = new Flagpole(floor.width * 0.7, floor.y);
  max_star_pos = 0;
  rain_drops = [];
  fireballs = [];
  var current_background_color, current_edge_color;

  // set again the background color, decorations, etc. for assigned level
  for (let i = 0; i < 1000; i++)
    rain_drops.push(
      new RainDrop(random() * width, -random() * floor.y, random() * 10)
    );
  if (current_level == Level.Rain_Level) rain_sound.loop();
  else rain_sound.stop();

  sun = new Sun(width - 100, 100);
  moon = new Moon(width - 100, 100);

  for (let i = 0; i < levels.length; i++)
    if (levels[i].level == current_level) {
      current_background_color = levels[i].canvas_color;
      current_edge_color = levels[i].floor_edge_color;
      background_color = levels[i].canvas_color;
      floor = new Floor(
        -width,
        432,
        levels[i].floor_color,
        levels[i].floor_edge_color
      );
    }

  // build up the floor in assigned level
  bear_character = new character(100, floor.y);
  cameraPosX = bear_character.getX() - 150;

  // build up the clouds in assigned level
  for (let i = 0; i < clouds.length; i++)
    if (clouds[i].level == current_level)
      clouds_in_level.push(
        new Cloud(clouds[i].x, clouds[i].y, clouds[i].size, current_level)
      );

  // build up the mountains in assigned level
  for (let i = 0; i < mountains.length; i++)
    if (mountains[i].level == current_level)
      mountains_in_level.push(
        new Mountain(mountains[i].x, mountains[i].y, mountains[i].size)
      );

  // build up the trees in assigned level
  for (let i = 0; i < trees.length; i++)
    if (trees[i].level == current_level)
      switch (current_level) {
        case Level.Moon_Level:
          trees_in_level.push(new Orchid_Tree(trees[i].x, trees[i].y));
          break;
        case Level.Flower_Level:
          trees_in_level.push(new Sakura_Tree(trees[i].x, trees[i].y));
          break;
        case Level.Rain_Level:
          trees_in_level.push(new Tree(trees[i].x, trees[i].y));
          break;
        case Level.Orange_Level:
          if (trees[i].ID % 3 == 0)
            trees_in_level.push(new Tree(trees[i].x, trees[i].y));
          else if (trees[i].ID % 3 == 1)
            trees_in_level.push(new Orchid_Tree(trees[i].x, trees[i].y));
          else trees_in_level.push(new Sakura_Tree(trees[i].x, trees[i].y));
          break;
        default:
          break;
      }

  // build up for canyon in assigned level
  for (let i = 0; i < canyons.length; i++)
    if (canyons[i].level == current_level)
      canyons_in_level.push(
        new Canyon(
          canyons[i].x,
          canyons[i].y,
          canyons[i].width,
          current_background_color,
          current_edge_color
        )
      );

  // build up collectables in assigned level
  for (let i = 0; i < collectables.length; i++)
    if (collectables[i].level == current_level)
      collectables_in_level.push(
        new Collectable(
          collectables[i].x,
          collectables[i].y,
          collectables[i].size,
          current_level
        )
      );

  // build up platform in assigned level
  for (let i = 0; i < platforms.length; i++)
    if (platforms[i].level == current_level)
      platforms_in_level.push(
        new Platform(
          platforms[i].x,
          platforms[i].y,
          platforms[i].width,
          platforms[i].height,
          current_background_color,
          current_edge_color
        )
      );

  fireballs.push(new FireBall(-200, 350, 30));
  fireballs.push(new FireBall(500, 200, 30));
}

function scrollX() {
  var centrePoint = bear_character.x + bear_character.width / 2;

  if (abs(centrePoint - cameraPosX) > 10) {
    if (centrePoint > cameraPosX) cameraPosX += cameraMovingSpeed;
    else cameraPosX -= cameraMovingSpeed;
  }
}
