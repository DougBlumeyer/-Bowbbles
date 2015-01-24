(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var gameView = Asteroids.gameView = function(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    //canvas.globalAlpha = 0.75;
    //this.canvasX = null;
    //this.canvasY = null;
    //this.song = new Audio('../assets/Yosi Horikawa - Bubbles.mp3');
    //this.song.play();
    this.song = document.getElementById('song');
    this.song.play();
    this.songPlaying = true;
    $('#pauseButton').on('click', this.toggleSong.bind(this));
  };

  gameView.prototype.toggleSong = function() {
    if (this.songPlaying) {
      this.songPlaying = false;
      this.song.pause();
    } else {
      this.songPlaying = true;
      this.song.play();
    }
  }

  gameView.prototype.start = function(ctx) {
    window.setInterval((function () {
      this.bindKeyHandlers();
      this.game.step();
      this.game.draw(ctx);
    }).bind(this), 20);
  };

  gameView.prototype.bindKeyHandlers = function() {
    pushed_keys = key.getPressedKeyCodes();

    for (i = 0; i < pushed_keys.length; i++) {
      if (pushed_keys[i] === 87)  { // w
        this.game.ship.power([0, -1]);
      } else if (pushed_keys[i] === 83) { // s
        this.game.ship.power([0, 1]);
      } else if (pushed_keys[i] === 65) { // a
        this.game.ship.power([-1, 0]);
      } else if (pushed_keys[i] === 68) { // d
        this.game.ship.power([1, 0]);
      }
    };
  };

  // gameView.prototype.getMouse = function () {}
  //   var coords = this.canvas.relMouseCoords(event);
  //   canvasX = coords.x;
  //   canvasY = coords.y;


})();
