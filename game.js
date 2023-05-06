const canvas = document.getElementById("gameCanvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

let trackOffsetX = 0;
let trackOffsetY = 0;

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
    this.velocity = 0;
    this.acceleration = 0.05;
    this.friction = 0.98;
    this.angularVelocity = 0;
    this.angularAcceleration = 0.05;
    this.angularFriction = 0.95;

    this.maxVelocity = 9;
  }

  moveForward() {
    this.velocity += this.acceleration;

    if (this.velocity > this.maxVelocity) {
      this.velocity = this.maxVelocity;
    }
  }

  moveBackward() {
    this.velocity -= this.acceleration;
  }

  turnLeft() {
    this.angle += 0.05;
  }

  turnRight() {
    this.angle -= 0.05;
  }

  update() {
    this.angle += this.angularVelocity;
  }

  render() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(-10, 10);
    ctx.lineTo(10, 10);
    ctx.lineTo(0, -20);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

const kart = new Kart(400, 300, 0);

class Track {
  constructor() {
    this.gridSize = 50;
  }

  render(offsetX, offsetY, angle) {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;

    for (
      let i = -offsetX % this.gridSize;
      i < canvas.width;
      i += this.gridSize
    ) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    for (
      let j = -offsetY % this.gridSize;
      j < canvas.height;
      j += this.gridSize
    ) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    ctx.restore();
  }
}

const track = new Track();

const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function handleInput() {
  if (keys["ArrowUp"]) {
    kart.moveForward();
  } else if (keys["ArrowDown"]) {
    kart.moveBackward();
  } else {
    kart.velocity *= kart.friction;
  }

  if (keys["ArrowLeft"]) {
    kart.turnLeft();
  } else if (keys["ArrowRight"]) {
    kart.turnRight();
  } else {
    kart.angularVelocity *= kart.angularFriction;
  }
}

function update() {
  handleInput();
  const dx = Math.sin(kart.angle) * kart.velocity;
  const dy = Math.cos(kart.angle) * kart.velocity;

  // Move the terrain instead of the kart
  trackOffsetX -= dx;
  trackOffsetY -= dy;

  kart.update();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  track.render(trackOffsetX, trackOffsetY, kart.angle);
  kart.render();
}

gameLoop();
