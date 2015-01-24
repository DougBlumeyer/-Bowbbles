(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MergingAsteroid = Asteroids.MergingAsteroid = function(pos, vel, radius, target_radius, game, clr_arr) {
    Asteroids.movingObject.call(this, {
      //color: "#660000",
      game: game
    });
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.target_radius = target_radius;
    this.clr_arr = clr_arr;
  }

  Asteroids.Util.inherits(MergingAsteroid, Asteroids.movingObject);

})();
