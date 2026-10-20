/* -----------------------------------------------------------------------
 * character.js - codes for the character constructor function object
 *
 * This file contains one function object for the character, one const object for horizontal status and one const object for vertical status.
 *
 * The character is a simplified yellow bear, that is actually a compose of circles in different sizes.
 * Positions and the sizes of the body parts are being linked together during initialisation and the show() methods.
 * The purpose of this is to ensure that I can just two variables (x and y) to call out the character object.
 * (the parts are being combined by the set of parameters)
 * And I can just use the methods to control the properties of the character, either in this constructor function and the sketch.js.
 * Including the draw of the character body, head, ears, hands and the legs.
 *
 * During movement, the hands and the kegs will be reshaped for the movement.
 * Reshape means "horizontal ellipse when horizontal movement", "vertical ellipsse when vertical movement", and "become a bigger circle when movement in the air"
 * At the same time of movement, the character itself will also move according to the states.
 *
 * The mid-term used isLeft / ieRight / isFalling / isPlummeting etc. to identify status the character in.
 * For this submission, the xStatus and yStatus are being set up for more organised status. x and y are horizontal and vertical respectively.
 * Representation of xStatus and yStatus are actually const objects, and in fact they are enums (self-created variables).
 *
 * In addition, the character can run (instead of walk) when shift key is beind hold.
 * This is controlled by the maxmum speed limit (the acceleration is fixed).
 * If the character is running, the speed limit is being enlarged; otherwise the character is moving in normal speed.
 *
 * For example, when moving left or right, the character xStatus will become Left and Right respectively, which can then initiate the horizontal movement codes (moveX() method),
 * Furthermore, when jumping up, the character yStatus will become Jumping, that means movement in the air with a velocity, and certainly move back to the ground under Falling state.
 * Last but not least, when the character is moving in the air, the code will make this move with a smooth parabora drop.
 * One more Trapped mode is the indication of the character dropping into the canyon.
 *
 * For platform, there is a function checkCollide() returning boolean which checks if the character is above one of the platforms.
 * Using a for loop, to check if one of the platform is below character. There is isOnPlatform variable identifying if the character is on the platoform.
 *
 * Properties:
 *
 * x - the character's x position
 * y - the character's y position
 * xStatus - horizontal state of the character: this will control the facing direction of the character
 * yStatus - vertical state of the character
 * xVelocity - horizontal velofity (+ve means to the right)
 * xSpeedLowerLimit / xSpeedUpperLimit / xSpeedMax - these are the control run or walk of the character
 * - if the character is running (shift key is on hold), the maximum speed will be enlarged, hence the character can move faster, and vice versa
 * acceleration / deceleration - there are used for adding speed of horizontal direction
 * 
 * yVelocity : velocity of y
 * ySpeedMax / maxJumpHeight / platformJumpHeight : maximum vertical moving speed and distance respectively, to avoid character jumping too fase (when user press space button too long or on one of the platforms)
 * jumpAcceleration : acceleration when the charcter is being instructed to jump
 * gravity - free-falling acceleration
 * isOnCanyo - signal of whether the character is on the plaform or not
 *
 * height - height of the character
 * width - width of the character
 * headCenterY - center of the head
 * bodyCenterY - cebter of the body
 * hands - this is enum of the hands, which include x and y positions of the heads
 * legs - this is enum of the legs, which include x and y positions of the legs
 *
 * color - color of this bear, will change to red when being attacked by enemies
 * 
 * Methods:
 *
 * show() - draw the character out. this will be called for every gameplay frame
 * repost() - Relocate the bear in (x, y) location
 * moveX() / moveY() - for horizontal and vertical movements respectively of the character
 * run() / walk() - when the shift key is on hold, limitation of acceleration will be loosen, so that the character will move faster
 * freefall() - for free fall, under gravity
 * drop_into_canyon() - check whether the character is going to fall
 * checkCollide() - check whether the character is in touch with one of the platforms
 * getX() / getWidth() / getY() / getYStatus() - methods that return vlaues in constructor function
 *
----------------------------------------------------------------------- */

// enum for the character horizontal status
const xStatus = {
  Stable: "stable",
  Left: "left",
  Right: "right",
};

// enum for the character vertical status
const yStatus = {
  Stable: "stable",
  Falling: "fall",
  Jumping: "jump",
  Trapped: "trapped",
  Attacked: "attacked",
};

// character class
function character(x, y) {
  // properties for the horizontal digits

  this.x = x;
  this.width = 20;
  this.xVelocity = 0;
  this.xSpeedLowerLimit = 6;
  this.xSpeedUpperLimit = 10;
  this.acceleration = 1;
  this.deceleration = -1;
  this.xSpeedMax = this.xSpeedLowerLimit;

  // properties for the vertical digits

  this.y = y;
  this.height = 100;
  this.yVelocity = 0;
  this.ySpeedMax = 8;
  this.jumpAcceleration = 3.1;
  this.gravity = 1;
  this.maxJumpHeight = 200;
  this.platformJumpHeight = 0;
  this.isOnPlatform = false;

  // properties for the status

  this.xStatus = xStatus.Stable;
  this.yStatus = yStatus.Stable;

  this.groundHeight = floor.y;

  // initialisation of the body parts

  this.headCenterY = this.y - 43;
  this.bodyCenterY = this.y - 18;
  this.hands = {
    leftHandPosX: this.x - 15,
    leftHandPosY: this.y - 33,
    rightHandPosX: this.x + 15,
    rightHandPosY: this.y - 33,
  };
  this.legs = {
    leftLegPosX: this.x - 15,
    leftLegPosY: this.y - 3,
    rightLegPosX: this.x + 15,
    rightLegPosY: this.y - 3,
  };

  this.color = color(250, 213, 73);

  // methods

  this.show = function () {
    // head
    noStroke();
    fill(this.color);
    ellipse(this.x, this.headCenterY, 20, 20);
    // ears
    ellipse(this.x - 7, this.headCenterY - 7, 6, 6);
    ellipse(this.x + 7, this.headCenterY - 7, 6, 6);
    // face
    ellipse(this.x - 5, this.headCenterY + 3, 12, 12);
    ellipse(this.x + 5, this.headCenterY + 3, 12, 12);
    // eyes
    fill(0, 0, 0);
    ellipse(this.x - 4, this.headCenterY - 2, 2, 2);
    ellipse(this.x + 4, this.headCenterY - 2, 2, 2);
    // nose
    ellipse(this.x, this.headCenterY + 2, 4, 4);
    // body
    fill(this.color);
    ellipse(this.x, this.bodyCenterY, 35, 35);
    // hand
    stroke(239, 127, 1);

    // Reshapes of the hands and the legs during different kinds of movement
    var inAir =
      this.yStatus == yStatus.Jumping || this.yStatus == yStatus.Falling;
    if (this.xStatus == xStatus.Stable && this.yStatus == yStatus.Stable) {
      ellipse(this.hands.leftHandPosX, this.hands.leftHandPosY, 8, 8);
      ellipse(this.hands.rightHandPosX, this.hands.rightHandPosY, 8, 8);
      ellipse(this.legs.leftLegPosX, this.legs.leftLegPosY, 8, 8);
      ellipse(this.legs.rightLegPosX, this.legs.rightLegPosY, 8, 8);
      noStroke();
    } else if (this.xStatus == xStatus.Left && inAir) {
      ellipse(this.hands.leftHandPosX, this.hands.leftHandPosY - 3, 18, 20);
      ellipse(this.legs.leftLegPosX, this.legs.leftLegPosY - 3, 18, 20);
      ellipse(this.hands.rightHandPosX, this.hands.rightHandPosY, 8, 8);
      ellipse(this.legs.rightLegPosX, this.legs.rightLegPosY, 8, 8);
      noStroke();
    } else if (this.xStatus == xStatus.Right && inAir) {
      ellipse(this.hands.leftHandPosX, this.hands.leftHandPosY, 8, 8);
      ellipse(this.legs.leftLegPosX, this.legs.leftLegPosY, 8, 8);
      ellipse(this.hands.rightHandPosX, this.hands.rightHandPosY - 3, 18, 20);
      ellipse(this.legs.rightLegPosX, this.legs.rightLegPosY - 3, 18, 20);
      noStroke();
    } else if (
      inAir ||
      this.yStatus == yStatus.Trapped ||
      this.yStatus == yStatus.Attacked
    ) {
      ellipse(this.hands.leftHandPosX, this.hands.leftHandPosY + 4, 8, 15);
      ellipse(this.hands.rightHandPosX, this.hands.rightHandPosY + 4, 8, 15);
      ellipse(this.legs.leftLegPosX, this.legs.leftLegPosY, 8, 15);
      ellipse(this.legs.rightLegPosX, this.legs.rightLegPosY, 8, 15);
      noStroke();
    } else if (this.xStatus == xStatus.Left) {
      ellipse(this.hands.leftHandPosX, this.hands.leftHandPosY, 18, 8);
      ellipse(this.hands.rightHandPosX, this.hands.rightHandPosY, 8, 8);
      ellipse(this.legs.leftLegPosX, this.legs.leftLegPosY, 18, 8);
      ellipse(this.legs.rightLegPosX, this.legs.rightLegPosY, 8, 8);
      noStroke();
    } else if (this.xStatus == xStatus.Right) {
      ellipse(this.hands.leftHandPosX, this.hands.leftHandPosY, 8, 8);
      ellipse(this.hands.rightHandPosX, this.hands.rightHandPosY, 18, 8);
      ellipse(this.legs.leftLegPosX, this.legs.leftLegPosY, 8, 8);
      ellipse(this.legs.rightLegPosX, this.legs.rightLegPosY, 18, 8);
      noStroke();
    }
  };

  this.repost = function (x, y) {
    this.x = x;
    this.y = y;
    this.headCenterY = this.y - 43;
    this.bodyCenterY = this.y - 18;
    this.hands = {
      leftHandPosX: this.x - 15,
      leftHandPosY: this.y - 33,
      rightHandPosX: this.x + 15,
      rightHandPosY: this.y - 33,
    };
    this.legs = {
      leftLegPosX: this.x - 15,
      leftLegPosY: this.y - 3,
      rightLegPosX: this.x + 15,
      rightLegPosY: this.y - 3,
    };
  };

  this.moveX = function () {
    // update the horizontal velocity
    switch (this.xStatus) {
      case xStatus.Left:
        if (!(Math.abs(this.xVelocity) > this.xSpeedMax))
          this.xVelocity -= this.acceleration;
        break;
      case xStatus.Right:
        if (!(Math.abs(this.xVelocity) > this.xSpeedMax))
          this.xVelocity += this.acceleration;
        break;
      case xStatus.Stable:
        if (this.xVelocity < 0) this.xVelocity -= this.deceleration;
        if (this.xVelocity > 0) this.xVelocity += this.deceleration;
        break;
      default:
        break;
    }

    // update the horizontal position
    this.x += this.xVelocity;
    if (
      this.isOnPlatform &&
      this.yStatus != yStatus.Jumping &&
      this.platformUnderFeet() < 0
    ) {
      this.isOnPlatform = false;
      this.yStatus = yStatus.Falling;
    }
    this.repost(this.x, this.y);
  };

  this.platformUnderFeet = function () {
    for (let i = 0; i < platforms_in_level.length; i++) {
      var platform = platforms_in_level[i];
      var top = platform.y - platform.height;
      var overlapsX =
        this.x > platform.x && this.x < platform.x + platform.width;
      if (overlapsX && Math.abs(this.y - top) <= 8) return i;
    }
    return -1;
  };

  this.overCanyon = function () {
    for (let i = 0; i < canyons_in_level.length; i++) {
      var canyon = canyons_in_level[i];
      if (
        this.x > canyon.x &&
        this.x + this.width < canyon.x + canyon.width
      )
        return true;
    }
    return false;
  };

  // check if character collide with platforms
  this.checkCollide = function () {
    for (let i = 0; i < platforms_in_level.length; i++) {
      if (platforms_in_level[i].checkCollision()) {
        this.y = platforms_in_level[i].y - platforms_in_level[i].height - 1;
        this.isOnPlatform = true;
        return i;
      }
    }

    return false;
  };

  // holding the shift key can makes the character run
  // release the shift key will move slower
  this.run = function () {
    this.xSpeedMax = this.xSpeedUpperLimit;
  };
  this.walk = function () {
    this.xSpeedMax = this.xSpeedLowerLimit;
  };

  this.moveY = function () {
    switch (this.yStatus) {
      case yStatus.Jumping:
        if (this.isOnPlatform) this.platformJumpHeight = 200;
        else if (this.yVelocity == 0) this.platformJumpHeight = 0;
        this.isOnPlatform = false;
        if (
          this.y - this.height <
          this.groundHeight - this.y - this.platformJumpHeight
        )
          this.yStatus = yStatus.Falling;
        else if (abs(this.yVelocity) < this.ySpeedMax)
          this.yVelocity -= this.jumpAcceleration;
        else this.yVelocity = this.yVelocity;
        break;
      case yStatus.Falling:
        if (this.y + this.yVelocity >= floor.y && this.overCanyon()) {
          this.yVelocity += this.gravity;
          this.yStatus = yStatus.Trapped;
        } else if (this.y + this.yVelocity < floor.y) {
          this.yVelocity += this.gravity;
          this.checkCollide();
        } else {
          this.y = floor.y;
          this.yVelocity = 0;
          this.yStatus = yStatus.Stable;
        }
        break;
      case yStatus.Trapped:
        this.xStatus = xStatus.Stable;
        this.xVelocity = 0;
        this.acceleration = 0;
        this.yVelocity += this.gravity;
        this.y += this.yVelocity;
        if (this.y >= height + this.height) {
          if (!lost_sound.isPlaying()) lost_sound.play();
          buildup_level();
          lives -= 1;
          score = score_current;
          this.yStatus = yStatus.Falling;
        }
        break;
      case yStatus.Attacked:
        this.xStatus = xStatus.Stable;
        this.color = color(220, 20, 60);
        this.xVelocity = 0;
        this.acceleration = 0;
        this.yVelocity += this.gravity;
        if (this.y >= height + this.height) {
          if (!lost_sound.isPlaying()) lost_sound.play();
          lives -= 1;
          score = score_current;
          buildup_level();
        }
        break;
      default:
        break;
    }

    if (
      this.isOnPlatform &&
      this.yStatus != yStatus.Jumping &&
      this.yStatus != yStatus.Trapped &&
      this.yStatus != yStatus.Attacked
    ) {
      this.yVelocity = 0;
      this.yStatus = yStatus.Stable;
    }

    this.y += this.yVelocity;
    this.repost(this.x, this.y);
  };

  // return value of variables
  this.getX = function () {
    return this.x;
  };

  this.getWidth = function () {
    return this.width;
  };

  this.getY = function () {
    return this.y;
  };

  this.getYStatus = function () {
    return this.yStatus;
  };

  this.getPlatformStatus = function () {
    return this.isOnPlatform;
  };

  return this;
}
