(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  window.Asteroids.Util = {};

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function(length) {
    return [Math.random() * 4 - 2,
    Math.random() * 4 - 2];
  };

  Asteroids.Util.randomFastVec = function(length) {
    var diag = Math.random();
    if (diag > 0.75) { //down and to right
      return [Math.random() * 2 + 2, Math.random() * 2 + 2];
    } else if (diag > 0.5) { //down and to left
      return [Math.random() * 2 + 2, Math.random() * -2 - 2];
    } else if (diag > 0.25) { // up and to left
      return [Math.random() * -2 - 2, Math.random() * -2 - 2];
    } else { //up and to right
      return [Math.random() * -2 - 2, Math.random() * 2 + 2];
    }
  };

  Asteroids.Util.randomPos = function(dim_x, dim_y) {
    return [Math.floor(Math.random() * dim_x), Math.floor(Math.random() * dim_y)];
  }

})();
