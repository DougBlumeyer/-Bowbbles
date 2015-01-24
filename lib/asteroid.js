(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, target_radius, game, clr_arr, targetClrArr) {
    Asteroids.movingObject.call(this, {
      color: Asteroid.COLOR,
      game: game,
    });
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.target_radius = target_radius;
    this.clr_arr = clr_arr;
    this.targetClrArr = targetClrArr;
  }

  Asteroids.Util.inherits(Asteroid, Asteroids.movingObject);

  Asteroid.COLOR = "#666666"
  Asteroid.RADIUS = 15

  Asteroid.prototype.updateSize = function() {
    if (this.target_radius > this.radius + 4) {
      this.radius += 4;
    } else if (this.target_radius < this.radius - 16) {
      this.radius -= 16;
    }
  }

})();
