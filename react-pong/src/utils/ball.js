const drawPlayer = require("../utils/player");

function animate(gd, whocall) {
  var loop;
  gd.ctx.fillStyle = "url('https://cdn.pixabay.com/photo/2020/11/07/01/40/abstract-5719535_960_720.jpg')";
  if (gd.ballx + gd.radius >= gd.width || gd.ballx - gd.radius <= 0) {gd.balldx *= -1; gd.direction *=-1;/*console.log('cabriselescouilles, leaving');gd.setScore();return;*/}
  gd.ctx.clearRect(0, 0, gd.width, gd.height);

  if (gd.bally + gd.radius >= gd.height || gd.bally - gd.radius <= 0) gd.balldy *= -1;
  gd.ballx += gd.balldx;
  gd.bally += gd.balldy;

  console.log("who call ?", whocall);
// left player
if(gd.gameStart === false && gd.ready.P1 === false && gd.isPlayer === true) {
  gd.ctx.beginPath();
  gd.ctx.fillStyle = "blue";
  gd.ctx.font = gd.height / 10 + "px Arial";
  gd.ctx.fillText("Press any key",gd.rackWidth*2,gd.height/2);
  gd.ctx.globalAlpha = 0.5;
  gd.ctx.fillRect(0,0,gd.width/2-1,gd.height);
  gd.ctx.closePath();
}

//right player
if(gd.gameStart === false  && gd.ready.P2 === false && gd.isPlayer === true) {
  console.log("here, isPlayer", gd.isPlayer);
  gd.ctx.beginPath();
  gd.ctx.fillStyle = "green";
  gd.ctx.font = gd.height / 10 + "px Arial";
  gd.ctx.fillText("Press any key",gd.rackWidth*2 + gd.width/2,gd.height/2);
  gd.ctx.globalAlpha = 0.5;
  gd.ctx.fillRect(gd.width/2+1,0,gd.width/2,gd.height);

  gd.ctx.closePath();
}

//draw net
gd.ctx.beginPath();
gd.ctx.fillRect(gd.width/2-2,0,3,gd.height);
gd.ctx.closePath();

if (gd.gameStart === false) {
  document.onkeydown = (e) => {
    gd.isPlayer && gd.socket.emit('playerReady');
    console.log("setting ready");
  }
  console.log(gd.ready);
  return;
}
drawPlayer.drawPlayer(gd);


// gd.ctx.globalAlpha = 1;
gd.ctx.beginPath();

var radgrad = gd.ctx.createRadialGradient(
  gd.ballx,
  gd.bally,
  gd.radius,
  gd.ballx - gd.radius / 2,
  gd.bally - gd.radius / 2,
  0
);
radgrad.addColorStop(0, "#D8D8D8");
radgrad.addColorStop(0, "#595656");
radgrad.addColorStop(1, "rgba(1, 159, 98, 0)");
gd.ctx.arc(gd.ballx, gd.bally, gd.radius, 0, Math.PI * 2, false);
gd.ctx.fillStyle = radgrad;
gd.ctx.fill();
gd.ctx.strokeStyle = "grey";
gd.ctx.stroke();
gd.ctx.closePath();


gd.socket.on("updateScore",() => {
  console.log("cancel due to score update");
  cancelAnimationFrame(loop);
})
gd.socket.on("winnerIs",() => {
  console.log("cancel due to winner");
  cancelAnimationFrame(loop);
})


loop = requestAnimationFrame(() => {
  animate(gd);
});
}
module.exports = { animate };
