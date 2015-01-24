(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DummyAsteroid = Asteroids.DummyAsteroid = function(pos, vel, radius, target_radius, game, clr_arr) {
    Asteroids.movingObject.call(this, {
      color: "#660000",
      game: game
    });
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.target_radius = target_radius;
    this.clr_arr = clr_arr;
  }

  Asteroids.Util.inherits(DummyAsteroid, Asteroids.movingObject);

  DummyAsteroid.prototype.updateSize = function() {
    if (this.target_radius > this.radius) {
      this.radius += 2;
    } else {
      this.radius -= 0.2;
    }
  }

  DummyAsteroid.prototype.markForRemoval = function() {
    //setTimeout()

  }

  DummyAsteroid.prototype.isCollidedWith = function(otherObject) {
    var dx = this.pos[0] - otherObject.pos[0];
    var dy = this.pos[1] - otherObject.pos[1];
    var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (dist < 2) {
      alert("dummies collided!")
    }
    return (dist < 2);
  };

})();
