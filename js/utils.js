(function() {
  if (typeof Bowbbles === "undefined") {
    window.Bowbbles = {};
  }

  window.Bowbbles.Util = {};

  Bowbbles.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Bowbbles.Util.randomVec = function(length) {
    return [Math.random() * 4 - 2,
    Math.random() * 4 - 2];
  };

  Bowbbles.Util.randomFastVec = function(length) {
    var diag = Math.random();
    if (diag > 0.75) {
      return [Math.random() * 2 + 2, Math.random() * 2 + 2]; //down and to right
    } else if (diag > 0.5) {
      return [Math.random() * 2 + 2, Math.random() * -2 - 2]; //down and to left
    } else if (diag > 0.25) {
      return [Math.random() * -2 - 2, Math.random() * -2 - 2]; // up and to left
    } else {
      return [Math.random() * -2 - 2, Math.random() * 2 + 2]; //up and to right
    }
  };

  Bowbbles.Util.randomPos = function() {
    do {
      var pos = [Math.floor(Math.random() * DIM_X),
                 Math.floor(Math.random() * DIM_Y)];
    } while (Bowbbles.Util.dist(pos, [DIM_X / 2, DIM_Y / 2]) > DIM_X / 2)
    return pos;
  }

  Bowbbles.Util.randomClr = function() {
    clr = [];
    for (var i = 0; i < 6; i++) {
      clr.push(Math.floor(Math.random() * 16));
    }

    return clr;
  }

  Bowbbles.Util.dist = function(posA, posB) {
    return Math.sqrt(Math.pow(posA[0] - posB[0], 2) + Math.pow(posA[1] - posB[1], 2));
  }

})();
