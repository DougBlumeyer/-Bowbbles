(function() {
  if (typeof Bowbbles === "undefined") {
    window.Bowbbles = {};
  }

  TWO_PI = 2 * Math.PI;

  var Bowbble = Bowbbles.Bowbble = function(params) {
    this.pos = params.pos;
    this.vel = params.vel;
    this.radius = params.radius;
    this.targetRadius = params.targetRadius;
    this.game = params.game;
    this.clr = params.clr;
    this.targetClr = params.targetClr;
  };

  Bowbble.prototype.updateClr = function() {
    for (i = 0; i < 6; i++) {
      if (this.clr[i] < this.targetClr[i] ) {
        this.clr[i] += 1;
      } else if (this.clr[i] > this.targetClr[i]) {
        this.clr[i] -= 1;
      }
      if (this.clr[i] < 5) {
        this.clr[i] = 5;
      }
    }
  }

  // function drawPiece(x, y, r, ctx) {
  //   ctx.beginPath();
  //   ctx.arc(x, y, r, 0, TWO_PI);
  //   ctx.fill();
  // }

  Bowbble.prototype.calcRenderColor = function() {
    renderClr = "#";
    for (var i = 0; i < 6; i++) {
      if (this.clr[i] === 10) {
        renderClr = renderClr + "A";
      } else if (this.clr[i] === 11) {
        renderClr = renderClr + "B";
      } else if (this.clr[i] === 12) {
        renderClr = renderClr + "C";
      } else if (this.clr[i] === 13) {
        renderClr = renderClr + "D";
      } else if (this.clr[i] === 14) {
        renderClr = renderClr + "E";
      } else if (this.clr[i] >= 15) {
        renderClr = renderClr + "F";
      } else {
        renderClr = renderClr + this.clr[i];
      }
    }
    return renderClr;
  }

  Bowbble.prototype.draw = function(ctx) {
    var renderClr = this.calcRenderColor();

    ctx.globalAlpha = 0.75;
    ctx.fillStyle = renderClr;
    ctx.shadowColor = renderClr;
    ctx.shadowBlur = 3;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, TWO_PI);
    ctx.fill();

    // drawPiece(this.pos[0], this.pos[1], this.radius, ctx);

    //spilling off the left
    // if (this.pos[0] < this.radius) {
    //   //console.log("left");
    //   drawPiece(this.pos[0] + DIM_X, this.pos[1], this.radius, ctx);
    // }
    // //spilling off the right
    // if (this.pos[0] > DIM_X - this.radius) {
    //   //console.log("right");
    //   drawPiece(this.pos[0] - DIM_X, this.pos[1], this.radius, ctx);
    // }
    // //spilling off the top
    // if (this.pos[1] < this.radius) {
    //   //console.log("top");
    //   drawPiece(this.pos[0], this.pos[1] + DIM_Y, this.radius, ctx);
    // }
    // //spilling off the bottom
    // if (this.pos[1] > DIM_Y - this.radius) {
    //   //console.log("bottom");
    //   drawPiece(this.pos[0], this.pos[1] - DIM_Y, this.radius, ctx);
    // }
    // //spilling over bottom right corner
    // if (this.pos[1] > DIM_Y - this.radius && this.pos[0] > DIM_X - this.radius) {
    //   //console.log("bottom right");
    //   drawPiece(this.pos[0] - DIM_X, this.pos[1] - DIM_Y, this.radius, ctx);
    // }
    // //spilling over top left corner
    // if (this.pos[1] < this.radius && this.pos[0] < this.radius) {
    //   //console.log("top left");
    //   drawPiece(this.pos[0] + DIM_X, this.pos[1] + DIM_Y, this.radius, ctx);
    // }
    // //spilling over bottom left corner
    // if (this.pos[1] > DIM_Y - this.radius && this.pos[0] < this.radius) {
    //   //console.log("bottom left");
    //   drawPiece(this.pos[0] + DIM_X, this.pos[1] - DIM_Y, this.radius, ctx);
    // }
    // //spilling over top right corner
    // if (this.pos[1] < this.radius && this.pos[0] > DIM_X - this.radius) {
    //   //console.log("top right");
    //   drawPiece(this.pos[0] - DIM_X, this.pos[1] + DIM_Y, this.radius, ctx);
    // }
  };

  Bowbble.prototype.move = function() {
    // this.pos = this.game.wrap([
    //   this.pos[0] + this.vel[0],
    //   this.pos[1] + this.vel[1]
    // ]);
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  };

  Bowbble.prototype.isCollidedWith = function(otherObject) {
    var dist = Bowbbles.Util.dist(this.pos, otherObject.pos);
    if (this.radius > otherObject.radius) {
      return dist < this.radius;
    } else {
      return dist < otherObject.radius;
    }
  };

  Bowbble.prototype.isCollidedWithPos = function(pos) {
    var dist = Bowbbles.Util.dist(this.pos, pos);
    return dist < this.radius;
  };

  Bowbble.prototype.updateSize = function() {
    if (this.targetRadius > this.radius + 4) {
      this.radius += 4;
    } else if (this.targetRadius < this.radius - 16) {
      this.radius -= 16;
    }
  };

  Bowbble.prototype.isOffscreen = function() {
    if (this.pos[0] + this.radius < 0 ||
        this.pos[0] - this.radius > DIM_X ||
        this.pos[1] + this.radius < 0 ||
        this.pos[1] - this.radius > DIM_Y) {
      return true;
    }
    return false;
  };

})();
