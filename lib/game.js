(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  DIM_X = 600;
  DIM_Y = 600;
  NUM_ASTEROIDS = 500;

  var Game = Asteroids.Game = function(canvas) {
    this.asteroids = [];
    this.addAsteroids();
    this.dummyAsteroids = [];
    this.ship = new Asteroids.Ship(this);
    this.canvas = canvas;

    $( this.canvas ).on('click', (function(event) {

      for (var i = 0; i < this.asteroids.length - 1; i++) {
        if (this.asteroids[i].isCollidedWithPos([event.pageX, event.pageY])) {
          //console.log(this.asteroids[i].clr_arr);
          var clrs = this.asteroids[i].clr_arr;
          var totalClrSize = clrs[0]*16 + clrs[2]*16 + clrs[4]*16 + clrs[1] + clrs[3] + clrs[5]
          var redClrProportion = (clrs[0]*16 + clrs[1])/totalClrSize;
          var greenClrProportion = (clrs[2]*16 + clrs[3])/totalClrSize;
          var blueClrProportion = (clrs[4]*16 + clrs[5])/totalClrSize;

          var originalPos = this.asteroids[i].pos;
          var originalRadius = this.asteroids[i].radius;
          var originalArea = Math.PI * Math.pow(this.asteroids[i].radius, 2);
          var redArea = Math.PI * Math.pow(this.asteroids[i].radius, 2) * redClrProportion;
          var redRadius = Math.sqrt(redArea / Math.PI);
          var greenArea = Math.PI * Math.pow(this.asteroids[i].radius, 2) * greenClrProportion;
          var greenRadius = Math.sqrt(greenArea / Math.PI);
          var blueArea = Math.PI * Math.pow(this.asteroids[i].radius, 2) * blueClrProportion;
          var blueRadius = Math.sqrt(blueArea / Math.PI);

          // var redRadius = this.asteroids[i].radius * redClrProportion;
          // var greenRadius = this.asteroids[i].radius * greenClrProportion;
          // var blueRadius = this.asteroids[i].radius * blueClrProportion;
          this.remove(i);
          this.asplodeSomeAsteroids(clrs, redRadius, greenRadius, blueRadius, originalRadius, originalPos);
        }
      };
    }).bind(this));
  };

  Game.prototype.asplodeSomeAsteroids = function(clrs, redRadius, greenRadius, blueRadius, originalRadius, originalPos) {
    //console.log([event.pageX, event.pageY]) ;
    if (redRadius > 0 ) {
      this.dummyAsteroids.push(
        new Asteroids.Asteroid(
          originalPos,
          Asteroids.Util.randomVec(),
          originalRadius,
          redRadius,
          this,
          [clrs[0], clrs[1], 0,0,0,0] //amount of red needs to be multiplied by something like 2 - redProportion
        )
      );
    }
    if (greenRadius > 0) {
      this.dummyAsteroids.push(
        new Asteroids.Asteroid(
          originalPos,
          Asteroids.Util.randomVec(),
          originalRadius,
          greenRadius,
          this,
          [0,0, clrs[2], clrs[3], 0,0]
        )
      );
    }
    if (blueRadius > 0) {
      this.dummyAsteroids.push(
        new Asteroids.Asteroid(
          originalPos,
          Asteroids.Util.randomVec(),
          originalRadius,
          blueRadius,
          this,
          [0,0,0,0, clrs[4], clrs[5]]
        )
      );
    }
  };

  Game.prototype.addAsteroids = function() {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      this.asteroids.push(
        new Asteroids.Asteroid(
          Asteroids.Util.randomPos(DIM_X, DIM_Y),
          Asteroids.Util.randomVec(),
          1,
          Math.random() * 15,
          this,
          [  Math.floor(Math.random() * 16),
          Math.floor(Math.random() * 16),
          Math.floor(Math.random() * 16),
          Math.floor(Math.random() * 16),
          Math.floor(Math.random() * 16),
          Math.floor(Math.random() * 16)
          ])
      );
    };
  };

  Game.prototype.moveObjects = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
      this.asteroids[i].updateSize();
    };
    for (var i = 0; i < this.dummyAsteroids.length; i++) {
      this.dummyAsteroids[i].move();
      this.dummyAsteroids[i].updateSize();
    };
    //this.ship.move();
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.asteroids.forEach(function (obj) {
      obj.draw(ctx);
    });
    this.dummyAsteroids.forEach(function (obj) {
      obj.draw(ctx);
    });
    // this.ship.draw(ctx);
  };

  Game.prototype.wrap = function(pos) {
    if (pos[0] < 0) {
      pos[0] += DIM_X;
    }
    if (pos[1] < 0) {
      pos[1] += DIM_Y;
    }
    if (pos[0] > DIM_X) {
      pos[0] -= DIM_X;
    }
    if (pos[1] > DIM_Y) {
      pos[1] -= DIM_Y;
    }
    return pos;
  };

  Game.prototype.checkCollisions = function() {
    // for (var i = 0; i < this.dummyAsteroids.length - 1; i++) {
    //   for (var j = i + 1; j < this.dummyAsteroids.length; j++) {
    //     if (this.dummyAsteroids[i].isCollidedWith(this.dummyAsteroids[j])) {
    //       this.removeDummies(j);
    //       this.removeDummies(i);
    //     }
    //   }
    // }

    //oh we could make this all much simpler if we just wait to blurb them until one is INSIDE
    //the other... then we don't have to do any sort of crazy animation

    for (var i = 0; i < this.asteroids.length - 1; i++) {
      for (var j = i + 1; j < this.asteroids.length; j++) {
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          //debugger;
          //alert("collllllll");
          var iArea = Math.PI * Math.pow(this.asteroids[i].target_radius, 2);
          var jArea = Math.PI * Math.pow(this.asteroids[j].target_radius, 2);

          var iProportion = 2 * iArea / (iArea + jArea);
          var jProportion = 2 - iProportion;

          // var proportionalAvgPos = [
          //   (this.asteroids[i].pos[0]*iProportion +
          //    this.asteroids[j].pos[0]*jProportion) / 2,
          //   (this.asteroids[i].pos[1]*iProportion +
          //    this.asteroids[j].pos[1]*jProportion) / 2
          // ];

          var proportionalAvgVel = [
            (this.asteroids[i].vel[0]*iProportion +
             this.asteroids[j].vel[0]*jProportion) / 2,
            (this.asteroids[i].vel[1]*iProportion +
             this.asteroids[j].vel[1]*jProportion) / 2
          ];

          var combinedRadius = Math.sqrt((
            (Math.PI * Math.pow(this.asteroids[i].target_radius, 2)) +
            (Math.PI * Math.pow(this.asteroids[j].target_radius, 2))
          )/Math.PI);

          var combinedColor = [
            Math.ceil(
              (this.asteroids[i].clr_arr[0]*iProportion +
               this.asteroids[j].clr_arr[0]*jProportion) / 2
            ),
            Math.ceil(
              (this.asteroids[i].clr_arr[1]*iProportion +
                this.asteroids[j].clr_arr[1]*jProportion) / 2
              ),
            Math.ceil(
              (this.asteroids[i].clr_arr[2]*iProportion +
                this.asteroids[j].clr_arr[2]*jProportion) / 2
            ),
            Math.ceil(
              (this.asteroids[i].clr_arr[3]*iProportion +
                this.asteroids[j].clr_arr[3]*jProportion) / 2
            ),
            Math.ceil(
              (this.asteroids[i].clr_arr[4]*iProportion +
                this.asteroids[j].clr_arr[4]*jProportion) / 2
            ),
            Math.ceil(
              (this.asteroids[i].clr_arr[5]*iProportion +
                this.asteroids[j].clr_arr[5]*jProportion) / 2
            )
          ];

          //debugger
          if (iArea > jArea) {

            this.asteroids[i].vel = proportionalAvgVel;
            this.asteroids[i].target_radius = combinedRadius;
            this.asteroids[i].clr_arr = combinedColor;
            this.remove(j);
          } else {

            this.asteroids[j].vel = proportionalAvgVel;
            this.asteroids[j].target_radius = combinedRadius;
            this.asteroids[j].clr_arr = combinedColor;
            this.remove(i);
          }

          // this.asteroids.push(
          //   new Asteroids.Asteroid(
          //     proportionalAvgPos,
          //     proportionalAvgVel,
          //     0,
          //     combinedRadius,
          //     this
          //   )
          // );

          // this.dummyAsteroids.push(
          //   new Asteroids.DummyAsteroid(
          //     this.asteroids[i].pos,
          //     this.asteroids[i].vel, //actually it should shoot right for their proportional midpoint
          //      //which would be the difference between the pos and the proportionalAvgPos, divided by however many frames you want to take for it to get there
          //     this.asteroids[i].radius,
          //     this.asteroids[i].target_radius,
          //     this
          //   )
          // );
          // this.dummyAsteroids.push(
          //   new Asteroids.DummyAsteroid(
          //     this.asteroids[j].pos,
          //     this.asteroids[j].vel, //actually it should shoot right for their proportional midpoint
          //     this.asteroids[j].radius,
          //     this.asteroids[j].target_radius,
          //     this
          //   )
          // );

          // this.remove(j);
          // this.remove(i);

          //this.asteroids[i].markForRemoval();
          //this.asteroids[j].markForRemoval();
        }
      };
    };
  };

  Game.prototype.step = function () {
    //this.updateSizes();
    this.moveObjects();
    this.checkCollisions();
    this.unDummify();
    // console.log(this.mouseAttacks());
  };

  // Game.prototype.unDummify = function () {
  //   //console.log("helo");
  //   this.removeDummies(Math.floor(Math.random() * this.dummyAsteroids.length));
  // }

  Game.prototype.unDummify = function () {
    for (var i = 0; i < this.dummyAsteroids.length; i++) {
      var stayDummy = false;
      for (var j = 0; j < this.dummyAsteroids.length; j++) {
        if (i !== j && this.dummyAsteroids[i].isCollidedWith(this.dummyAsteroids[j])) {
          stayDummy = true;
        }
      };
      if (stayDummy === false) {
        this.asteroids.push(
          new Asteroids.Asteroid(
            this.dummyAsteroids[i].pos,
            this.dummyAsteroids[i].vel,
            this.dummyAsteroids[i].radius,
            this.dummyAsteroids[i].target_radius,
            this,
            this.dummyAsteroids[i].clr_arr
          )
        );
        this.removeDummies(i);
      }
    };
  };

  Game.prototype.mouseAttacks = function (event) {
  //debugger
    //if (event) {
    //console.log(this.canvas);
      // var x, y;
      // canoffset = $(this.canvas).offset();
      // x = event.ClientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
      // y = event.ClientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;
      // console.log([x,y]);
      // return [x,y];
    //}
  };

  Game.prototype.remove = function(idx) {
    this.asteroids.splice(idx, 1);
  };

  Game.prototype.removeDummies = function(idx) {
    console.log(idx);
    this.dummyAsteroids.splice(idx, 1);
  };

  //whoa what if for dummies we check UNCOLLISSIONS???

})();
