(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var movingObject = Asteroids.movingObject = function(params) {
    this.pos = params.pos;
    this.vel = params.vel;
    this.radius = params.radius;
    //this.color = params.color;
    this.game = params.game;
    this.clr_arr = params.clr_arr;
    this.targetClrArr = params.targetClrArr;
  };

  movingObject.prototype.draw = function(ctx) {
     //debugger
    for (i = 0; i < 6; i++) {
      if (this.clr_arr[i] < this.targetClrArr[i] - 1 ) {
        this.clr_arr[i] += 2;
      } else if (this.clr_arr[i] > this.targetClrArr[i] + 1) {
        this.clr_arr[i] -= 2;
      }
      if (this.clr_arr[i] < 5) {
        this.clr_arr[i] = 5;
      }
    }
    //debugger




    var renderColor = "#";
    // if (this.clr_arr === "undefined") {
    //   alert("wtf");
    // }
    for (var i = 0; i < 6; i++) {
      if (this.clr_arr[i] === 10) {
        renderColor = renderColor + "A";
      } else if (this.clr_arr[i] === 11) {
        renderColor = renderColor + "B";
      } else if (this.clr_arr[i] === 12) {
        renderColor = renderColor + "C";
      } else if (this.clr_arr[i] === 13) {
        renderColor = renderColor + "D";
      } else if (this.clr_arr[i] === 14) {
        renderColor = renderColor + "E";
      } else if (this.clr_arr[i] >= 15) {
        renderColor = renderColor + "F";
      } else {
        renderColor = renderColor + this.clr_arr[i];
      }
    }
    //ctx.fillStyle = "#" + this.clr_arr.join("");
    ctx.globalAlpha = 0.75;
    ctx.fillStyle = renderColor;
    ctx.shadowColor = renderColor;
    ctx.shadowBlur = 3;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.fill();



    if (this.pos[0] < this.radius) { //spilling off the left
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = renderColor;
      ctx.beginPath();
      ctx.arc(this.pos[0] + DIM_X, this.pos[1], this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    if (this.pos[0] > DIM_X - this.radius) { //spilling off the right
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = renderColor;
      ctx.beginPath();
      ctx.arc(this.pos[0] - DIM_X, this.pos[1], this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    if (this.pos[1] < this.radius) { //spilling off the top
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = renderColor;
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1] + DIM_Y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    if (this.pos[1] > DIM_Y - this.radius) { //spilling off the bottom
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = renderColor;
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1] - DIM_Y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }

    // var dx = this.pos[0] - DIM_X;
    // var dy = this.pos[1] - DIM_Y;
    // var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    //if (dist < this.radius) { //spilling over bottom right corner
    if (this.pos[1] > DIM_Y - this.radius && this.pos[0] > DIM_X - this.radius) {
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = renderColor;
      ctx.beginPath();
      ctx.arc(this.pos[0] - DIM_X, this.pos[1] - DIM_Y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    // dx = this.pos[0];
    // dy = this.pos[1];
    // dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    // if (dist < this.radius) { //spilling over top left corner
    if (this.pos[1] < this.radius && this.pos[0] < this.radius) {
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = renderColor;
      ctx.beginPath();
      ctx.arc(this.pos[0] + DIM_X, this.pos[1] + DIM_Y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    // x = this.pos[0] - DIM_X;
    // dy = this.pos[1];
    // dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    // if (dist < this.radius) { //spilling over bottom left corner
    if (this.pos[1] > DIM_Y - this.radius && this.pos[0] < this.radius) {
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = renderColor;
      ctx.beginPath();
      ctx.arc(this.pos[0] + DIM_X, this.pos[1] - DIM_Y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    // x = this.pos[0];
    // dy = this.pos[1] - DIM_Y;
    // dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    // if (dist < this.radius) { //spilling over top right corner
    if (this.pos[1] < this.radius && this.pos[0] > DIM_X - this.radius) {
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = renderColor;
      ctx.beginPath();
      ctx.arc(this.pos[0] - DIM_X, this.pos[1] + DIM_Y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }



    // if (this.radius > DIM_X - this.pos[0] && this.radius > DIM_Y - this.pos[1]) {
    //   ctx.globalAlpha = 0.75;
    //   ctx.fillStyle = renderColor;
    //   ctx.beginPath();
    //   ctx.arc(this.pos[0] - DIM_X, this.pos[1] - DIM_Y, this.radius, 0, 2 * Math.PI);
    //   ctx.fill();
    // }
    // if (this.radius > DIM_X - this.pos[0] && this.pos[1] < this.radius) {
    //   ctx.globalAlpha = 0.75;
    //   ctx.fillStyle = renderColor;
    //   ctx.beginPath();
    //   ctx.arc(this.pos[0] - DIM_X, this.pos[1] + DIM_Y, this.radius, 0, 2 * Math.PI);
    //   ctx.fill();
    // }
  };

  movingObject.prototype.move = function() {
    this.pos = this.game.wrap([
      this.pos[0] + this.vel[0],
      this.pos[1] + this.vel[1]
    ]);
  };

  movingObject.prototype.isCollidedWith = function(otherObject) {
    var dx = this.pos[0] - otherObject.pos[0];
    var dy = this.pos[1] - otherObject.pos[1];
    var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (this.radius > otherObject.radius) {
      return dist < this.radius;// - otherObject.radius;
    } else {
      return dist < otherObject.radius;// - this.radius;
    }
    //return (dist < this.radius + otherObject.radius);
    //console.log(Math.abs(this.radius - otherObject.radius));
    //return (dist < Math.abs(this.radius - otherObject.radius) * 2);
  };

  movingObject.prototype.isCollidedWithPos = function(pos) {
    var dx = this.pos[0] - pos[0];
    var dy = this.pos[1] - pos[1];
    var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return dist < this.radius;
  };

})();
