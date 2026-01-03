// Game class
class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.gameObjects = [];
    this.lastFrameTime = 0;
    this.deltaTime = 0;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.mouseDown = false;
    this.dragging = null;

    this.setupMouse();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth - 50;
    this.canvas.height = window.innerHeight - 50;
  }

  setupMouse() {
    this.canvas.addEventListener("mousedown", e => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // check click
      for (const obj of this.gameObjects) {
        if (mx > obj.x && mx < obj.x + obj.w &&
            my > obj.y && my < obj.y + obj.h) {
          this.dragging = obj;
          break;
        }
      }
      this.mouseDown = true;
    });

    this.canvas.addEventListener("mousemove", e => {
      if (!this.mouseDown || !this.dragging) return;
      const rect = this.canvas.getBoundingClientRect();
      this.dragging.x = e.clientX - rect.left - this.dragging.w / 2;
      this.dragging.y = e.clientY - rect.top - this.dragging.h / 2;
    });

    this.canvas.addEventListener("mouseup", () => {
      this.mouseDown = false;
      this.dragging = null;
    });
  }

  addGameObject(obj) {
    this.gameObjects.push(obj);
  }

  start() {
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  gameLoop(currentTime) {
    this.deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;

    this.update();
    this.draw();

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  update() {
    for (const obj of this.gameObjects) {
      if (obj.update) obj.update(this.deltaTime);
    }
  }

  draw() {
    // background
    this.ctx.fillStyle = "#eee";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw all the objects
    for (const obj of this.gameObjects) {
      obj.draw(this.ctx);
    }
  }
}

// basic object
class Box {
  constructor(x, y, w, h, color="pink") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update(dt) {
    
  }
}

// --- Start ---
const game = new Game('gameCanvas');

// add kitten
const kitten = new Box(100, 100, 80, 80, "pink");
game.addGameObject(kitten);

// add furniture
const table = new Box(150, 350, 250, 120, "#8d6e63");
const bed = new Box(450, 320, 300, 150, "#90caf9");
game.addGameObject(table);
game.addGameObject(bed);

game.start();

