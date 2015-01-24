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
    return [Math.random() * 2 - 1,
    Math.random() * 2 - 1];
  };

  Asteroids.Util.randomPos = function(dim_x, dim_y) {
    return [Math.floor(Math.random() * dim_x), Math.floor(Math.random() * dim_y)];
  }

})();
