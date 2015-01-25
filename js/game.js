(function() {
  if (typeof Bowbbles === "undefined") {
    window.Bowbbles = {};
  }

  var Game = Bowbbles.Game = function(canvas) {
    this.bowbbles = [];
    this.dummyBowbbles = [];
  };

  Game.prototype.step = function(ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.moveObjects(ctx);
    this.checkCollisions();
    this.graduateDummies();
    this.repopulate();
    this.cleanupLostBowbbles();
  };

  Game.prototype.avgBowbbleRadius = function() {
    var result = 0;
    for (var i = 0; i < this.bowbbles.length; i++) {
      result += this.bowbbles[i].radius;
    };
    return result / this.bowbbles.length;
  }

  Game.prototype.moveObjects = function(ctx) {
    for (var i = 0; i < this.bowbbles.length; i++) {
      this.bowbbles[i].move();
      this.bowbbles[i].updateSize();
      this.bowbbles[i].updateClr();
      this.bowbbles[i].draw(ctx);
    };
    for (var i = 0; i < this.dummyBowbbles.length; i++) {
      this.dummyBowbbles[i].move();
      this.dummyBowbbles[i].updateSize();
      this.dummyBowbbles[i].updateClr();
      this.dummyBowbbles[i].draw(ctx);
    };
  };

  Game.prototype.wrap = function(pos) {
    if (pos[0] < 0) {
      pos[0] += DIM_X;
    } else if (pos[0] > DIM_X) {
      pos[0] -= DIM_X;
    }
    if (pos[1] > DIM_Y) {
      pos[1] -= DIM_Y;
    } else if (pos[1] < 0) {
      pos[1] += DIM_Y;
    }
    return pos;
  };

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.bowbbles.length - 1; i++) {
      for (var j = i + 1; j < this.bowbbles.length; j++) {
        if (this.bowbbles[i].isCollidedWith(this.bowbbles[j])) {
          this.collision(this.bowbbles[i], this.bowbbles[j], i, j);
        }
      };
    };
  };

  Game.prototype.collision = function(bowbbleI, bowbbleJ, i, j) {
    var iArea = Math.PI * Math.pow(bowbbleI.targetRadius, 2);
    var jArea = Math.PI * Math.pow(bowbbleJ.targetRadius, 2);

    var iProportion = 2 * iArea / (iArea + jArea);
    var jProportion = 2 - iProportion;

    var proportionalAvgVel = [
      (bowbbleI.vel[0] * iProportion +
       bowbbleJ.vel[0] * jProportion) / 2,
      (bowbbleI.vel[1] * iProportion +
       bowbbleJ.vel[1] * jProportion) / 2
    ];

    var combinedRadius = Math.sqrt((
      (Math.PI * Math.pow(bowbbleI.targetRadius, 2)) +
      (Math.PI * Math.pow(bowbbleJ.targetRadius, 2))
    )/Math.PI);

    var combinedColor = [
      Math.ceil(
        (bowbbleI.targetClr[0] * iProportion +
          bowbbleJ.targetClr[0] * jProportion) / 2
      ),
      Math.ceil(
        (bowbbleI.targetClr[1] * iProportion +
          bowbbleJ.targetClr[1] * jProportion) / 2
      ),
      Math.ceil(
        (bowbbleI.targetClr[2] * iProportion +
          bowbbleJ.targetClr[2] * jProportion) / 2
      ),
      Math.ceil(
        (bowbbleI.targetClr[3] * iProportion +
          bowbbleJ.targetClr[3] * jProportion) / 2
      ),
      Math.ceil(
        (bowbbleI.targetClr[4] * iProportion +
          bowbbleJ.targetClr[4] * jProportion) / 2
      ),
      Math.ceil(
        (bowbbleI.targetClr[5] * iProportion +
          bowbbleJ.targetClr[5] * jProportion) / 2
      )
    ];

    if (iArea > jArea) {
      bowbbleI.vel = proportionalAvgVel;
      bowbbleI.targetRadius = combinedRadius;
      bowbbleI.targetClr = combinedColor;
      bowbbleJ.merging = true;
      bowbbleJ.targetRadius = 0;
    } else {
      bowbbleJ.vel = proportionalAvgVel;
      bowbbleJ.targetRadius = combinedRadius;
      bowbbleJ.targetClr = combinedColor;
      bowbbleI.merging = true;
      bowbbleI.targetRadius = 0;
    }
  };

  Game.prototype.asplodeSomeBowbbles = function(clrs, redRadius, greenRadius, blueRadius, originalRadius, originalPos, greenAndBlueAvg, blueAndRedAvg, redAndGreenAvg, redAmt, greenAmt, blueAmt) {
    if (redRadius > 3 ) {
      this.dummyBowbbles.push(
        new Bowbbles.Bowbble({
          pos: originalPos,
          vel: Bowbbles.Util.randomFastVec(),
          radius: originalRadius,
          targetRadius: redRadius,
          game: this,
          clr: clrs.slice(),
          targetClr: [Math.floor(Math.floor(redAmt / 16)*1.5),
            Math.floor(Math.floor(redAmt % 16)*1.5),
            Math.floor(Math.floor(greenAndBlueAvg / 16)),
            Math.floor(Math.floor(greenAndBlueAvg % 16)),
            Math.floor(Math.floor(greenAndBlueAvg / 16)),
            Math.floor(Math.floor(greenAndBlueAvg % 16))
          ]
        })
      );
    }
    if (greenRadius > 3) {
      this.dummyBowbbles.push(
        new Bowbbles.Bowbble({
          pos: originalPos,
          vel: Bowbbles.Util.randomFastVec(),
          radius: originalRadius,
          targetRadius: greenRadius,
          game: this,
          clr: clrs.slice(),
          targetClr: [Math.floor(Math.floor(blueAndRedAvg / 16)),
            Math.floor(Math.floor(blueAndRedAvg % 16)),
            Math.floor(Math.floor(greenAmt / 16)*1.5),
            Math.floor(Math.floor(greenAmt % 16)*1.5),
            Math.floor(Math.floor(blueAndRedAvg / 16)),
            Math.floor(Math.floor(blueAndRedAvg % 16))
          ]
        })
      );
    }
    if (blueRadius > 3) {
      this.dummyBowbbles.push(
        new Bowbbles.Bowbble({
          pos: originalPos,
          vel: Bowbbles.Util.randomFastVec(),
          radius: originalRadius,
          targetRadius: blueRadius,
          game: this,
          clr: clrs.slice(),
          targetClr: [Math.floor(Math.floor(redAndGreenAvg / 16)),
            Math.floor(Math.floor(redAndGreenAvg % 16)),
            Math.floor(Math.floor(redAndGreenAvg / 16)),
            Math.floor(Math.floor(redAndGreenAvg % 16)),
            Math.floor(Math.floor(blueAmt / 16)*1.5),
            Math.floor(Math.floor(blueAmt % 16)*1.5)
          ]
        })
      );
    }
  };

  Game.prototype.graduateDummies = function () {
    var dummiesToGraduate = [];
    for (var i = 0; i < this.dummyBowbbles.length; i++) {
      var stayDummy = false;
      for (var j = 0; j < this.dummyBowbbles.length; j++) {
        if (i !== j && this.dummyBowbbles[i].isCollidedWith(this.dummyBowbbles[j])) {
          stayDummy = true;
          break;
        }
      };
      if (stayDummy === false) {
        this.bowbbles.push(
          new Bowbbles.Bowbble({
            pos: this.dummyBowbbles[i].pos,
            vel: this.dummyBowbbles[i].vel,
            radius: this.dummyBowbbles[i].radius,
            targetRadius: this.dummyBowbbles[i].targetRadius,
            game: this,
            clr: this.dummyBowbbles[i].clr,
            targetClr: this.dummyBowbbles[i].targetClr
          })
        );
        dummiesToGraduate.unshift(i);
      }
    };
    for (var i = 0; i < dummiesToGraduate.length; i++) {
      this.removeDummy(dummiesToGraduate[i]);
    }
  };

  Game.prototype.repopulate = function() {
    if (this.bowbbles.length < 400) {
      this.bowbbles.push(
        new Bowbbles.Bowbble({
          pos: Bowbbles.Util.randomPos(),
          vel: Bowbbles.Util.randomVec(),
          radius: 1,
          targetRadius: Math.random() * 15 + 15,
          game: this,
          clr: [15, 15, 15, 15, 15, 15],
          targetClr: Bowbbles.Util.randomClr()
        })
      );
    }
  }

  Game.prototype.cleanupLostBowbbles = function() {
    var bowbblesToCleanup = [];
    for (var i = 0; i < this.bowbbles.length; i++ ) {
      if (this.bowbbles[i].isOffscreen() || this.bowbbles[i].radius < 1) {
        bowbblesToCleanup.unshift(i);
      }
    };
    for (var i = 0; i < bowbblesToCleanup.length; i++ ) {
      this.remove(bowbblesToCleanup[i]);
    };
  }

  Game.prototype.remove = function(idx) {
    this.bowbbles.splice(idx, 1);
  };

  Game.prototype.removeDummy = function(idx) {
    this.dummyBowbbles.splice(idx, 1);
  };

})();
