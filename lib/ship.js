(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(game) {
    Asteroids.movingObject.call(this, {
      color: Ship.COLOR,
      radius: Ship.RADIUS,
      game: game
    });
    this.pos = [DIM_X / 2, DIM_Y / 2];
    this.vel = [0, 0];
  }

  Asteroids.Util.inherits(Ship, Asteroids.movingObject);

  Ship.COLOR = "#008000"
  Ship.RADIUS = 6

  Ship.prototype.power = function(impulse) {
    this.vel = [
      this.vel[0] + impulse[0]/5,
      this.vel[1] + impulse[1]/5
    ];

    var speed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));

    if (speed > 5) {
      this.vel = [
        this.vel[0] - impulse[0]/5,
        this.vel[1] - impulse[1]/5
      ];
    }
  };

})();
