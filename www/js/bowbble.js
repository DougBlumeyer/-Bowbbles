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
    this.merging = false;
    this.opacity = 0.8;
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
    if (this.merging && this.opacity > 0.2) {
      this.opacity -= 0.2;
      console.log(this.opacity);
    }
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = renderClr;
    ctx.shadowColor = renderClr;
    ctx.shadowBlur = 3;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, TWO_PI);
    ctx.fill();
  };

  Bowbble.prototype.move = function() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  };

  Bowbble.prototype.isCollidedWith = function(otherObject) {
    if (this.merging) return false;
    var dist = Bowbbles.Util.dist(this.pos, otherObject.pos);
    if (this.radius > otherObject.radius) {
      return dist < this.radius;
    } else {
      return dist < otherObject.radius;
    }
  };

  Bowbble.prototype.isCollidedWithPos = function(pos) {
    if (this.merging) return false;
    var dist = Bowbbles.Util.dist(this.pos, pos);
    return dist < this.radius;
  };

  Bowbble.prototype.updateSize = function() {
    if (this.targetRadius > this.radius) {
      this.radius += (this.targetRadius - this.radius)/10;
    } else if (this.targetRadius - 0.1 < this.radius * 2/3) {
      this.radius = this.radius * 2/3;
    } else if (this.targetRadius === 0) {
      this.radius = 0;
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
