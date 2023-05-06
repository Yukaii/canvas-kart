const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

class Kart {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  update() {
    // Update kart position, drifting, N2O, etc.
  }

  render() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(-10, -10);
    ctx.lineTo(-10, 10);
    ctx.lineTo(20, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

const kart = new Kart(400, 300, 0);


window.addEventListener('keydown', (e) => {
    // Handle keydown events for controlling the kart
});

window.addEventListener('keyup', (e) => {
    // Handle keyup events for controlling the kart
});


function update() {
  // Update kart position, drifting, N2O, etc.
  kart.update();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  kart.render();
}


gameLoop();
