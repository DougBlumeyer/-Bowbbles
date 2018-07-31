(function() {
  if (typeof Bowbbles === "undefined") {
    window.Bowbbles = {};
  }

  DIM_X = $('#game-canvas').attr('height');
  DIM_Y = $('#game-canvas').attr('width');

  FRAME_RATE = 40;

  var gameView = Bowbbles.gameView = function(game, canvas) {
    this.game = game;
    this.canvas = canvas;

    this.mouseX = null;
    this.mouseY = null;
    $(this.canvas).on('click', this.popBowbbles.bind(this));
    $(this.canvas).on('mousemove', this.updateMousePos.bind(this));

    this.$popSounds = $('.popSounds');
    this.$popSounds.attr("volume", 0.33);

    this.song = $('#song')[0];
    this.song.play();
    this.songPlaying = true;
    $('#pauseButton').on('click', this.toggleSong.bind(this));
  };

  gameView.prototype.updateMousePos = function(event) {
    this.mouseX = -20 + event.pageX - this.canvas.offsetLeft;
    this.mouseY = -20 + event.pageY - this.canvas.offsetTop;
    this.pointerify();
  }

  gameView.prototype.toggleSong = function(event) {
    if (this.songPlaying) {
      $(event.currentTarget).attr("src", "../assets/images/Play_small.png");
      this.songPlaying = false;
      this.song.pause();
    } else {
      $(event.currentTarget).attr("src", "../assets/images/Pause_small.png");
      this.songPlaying = true;
      this.song.play();
    }
  }

  gameView.prototype.start = function(ctx) {
    window.setInterval((function () {
      if (this.songPlaying) {
        this.game.step(ctx);
      }
    }).bind(this), FRAME_RATE);
  };

  gameView.prototype.pointerify = function() {
    for (var i = 0; i < this.game.bowbbles.length - 1; i++) {
      if (this.game.bowbbles[i].isCollidedWithPos([this.mouseX, this.mouseY])) {
        $(this.canvas).css("cursor", "pointer");
        return;
      }
    };
    $(this.canvas).css("cursor", "default");
  };

  gameView.prototype.popBowbbles = function(event) {
    for (var i = 0; i < this.game.bowbbles.length - 1; i++) {
      if (this.game.bowbbles[i].isCollidedWithPos([this.mouseX, this.mouseY])) {

        var thisBowbble = this.game.bowbbles[i];

        var originalPos = thisBowbble.pos;
        var originalRadius = thisBowbble.radius;
        var originalArea = Math.PI * Math.pow(originalRadius, 2);

        var clrs = thisBowbble.targetClr;
        var totalClrSize = clrs[0]*16 + clrs[2]*16 + clrs[4]*16
                         + clrs[1] + clrs[3] + clrs[5];

        var redClrSize = clrs[0]*16 + clrs[1];
        var greenClrSize = clrs[2]*16 + clrs[3];
        var blueClrSize = clrs[4]*16 + clrs[5];

        var redClrPrprtn = redClrSize / totalClrSize;
        var greenClrPrprtn = greenClrSize / totalClrSize;
        var blueClrPrprtn = blueClrSize / totalClrSize;

        var greenAndBlueAvg = (greenClrSize + blueClrSize) / 2;
        var blueAndRedAvg = (blueClrSize + redClrSize) / 2;
        var redAndGreenAvg = (redClrSize + greenClrSize) / 2;

        var redAmt = redClrSize * (1 + redClrPrprtn * 2) / 2;
        var greenAmt = greenClrSize * (1 + greenClrPrprtn * 2) / 2;
        var blueAmt = blueClrSize * (1 + blueClrPrprtn * 2) / 2;

        var redArea = Math.PI * Math.pow(originalRadius, 2) * redClrPrprtn;
        var redRadius = Math.sqrt(redArea / Math.PI) / 2;
        var greenArea = Math.PI * Math.pow(originalRadius, 2) * greenClrPrprtn;
        var greenRadius = Math.sqrt(greenArea / Math.PI) / 2;
        var blueArea = Math.PI * Math.pow(originalRadius, 2) * blueClrPrprtn;
        var blueRadius = Math.sqrt(blueArea / Math.PI) / 2;

        this.game.asplodeSomeBowbbles(clrs,
          redRadius, greenRadius, blueRadius,
          originalRadius, originalPos,
          greenAndBlueAvg, blueAndRedAvg, redAndGreenAvg,
          redAmt, greenAmt, blueAmt);

        this.game.remove(i);

        this.playPopSound(originalRadius);
      }
    };
  }

  gameView.prototype.playPopSound = function(size) {
    this.$popSounds[Math.min(Math.floor(size / 7.666), 14)].play();
  }

})();
