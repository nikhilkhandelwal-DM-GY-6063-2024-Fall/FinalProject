let playerX, playerY;
let playerWidth = 50, playerHeight = 20;
let fallingObjects = [];
let score = 0;
let highScore = 0;
let gameOver = false;
let fallSpeed = 3; // Initial falling speed
let difficultyIncrement = 0.05; // Speed increase per object

function setup() {
  createCanvas(windowWidth, windowHeight); // Responsive canvas

  // Initialize player position
  playerX = width / 2;
  playerY = height - 60;

  // Generate falling objects at intervals
  setInterval(() => {
    if (!gameOver) {
      fallingObjects.push(createRandomObject());
    }
  }, 1000);
}

function draw() {
  background(0);

  if (!gameOver) {
    // Draw player
    fill(0, 255, 0);
    rect(playerX, playerY, playerWidth, playerHeight);

    // Update and draw falling objects
    for (let i = fallingObjects.length - 1; i >= 0; i--) {
      let obj = fallingObjects[i];
      obj.y += fallSpeed;

      // Draw shapes
      fill(obj.color);
      if (obj.type === "square") {
        rect(obj.x, obj.y, obj.size, obj.size);
      } else if (obj.type === "ellipse") {
        ellipse(obj.x + obj.size / 2, obj.y + obj.size / 2, obj.size, obj.size);
      } else if (obj.type === "triangle") {
        triangle(obj.x, obj.y, obj.x + obj.size, obj.y, obj.x + obj.size / 2, obj.y - obj.size);
      }

      // Check collision
      if (
        obj.x < playerX + playerWidth &&
        obj.x + obj.size > playerX &&
        obj.y < playerY + playerHeight &&
        obj.y + obj.size > playerY
      ) {
        gameOver = true;
        if (score > highScore) highScore = score; // Update high score
      }

      // Remove objects that leave the screen
      if (obj.y > height) {
        fallingObjects.splice(i, 1);
        score += 10; // Increment score
        fallSpeed += difficultyIncrement; // Increase difficulty
      }
    }

    // Display score and high score
    fill(255);
    textSize(20);
    text(`Score: ${score}`, 10, 30);
    text(`High Score: ${highScore}`, 10, 60);
  } else {
    // Game Over screen
    fill(255, 0, 0);
    textSize(32);
    text("Game Over!", width / 2 - 100, height / 2);
    text(`Final Score: ${score}`, width / 2 - 100, height / 2 + 40);
    text(`High Score: ${highScore}`, width / 2 - 100, height / 2 + 80);
    text("Press 'R' to Restart", width / 2 - 120, height / 2 + 120);
  }
}

// Player movement with arrow keys
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    playerX -= 20;
    playerX = max(0, playerX); // Boundary check
  } else if (keyCode === RIGHT_ARROW) {
    playerX += 20;
    playerX = min(width - playerWidth, playerX); // Boundary check
  } else if (key === 'R' || key === 'r') {
    resetGame(); // Restart game
  }
}

function resetGame() {
  score = 0;
  fallSpeed = 3;
  fallingObjects = [];
  gameOver = false;
  playerX = width / 2;
}

function createRandomObject() {
  let shapeTypes = ["square", "ellipse", "triangle"];
  return {
    x: random(0, width - 40), // Random horizontal position
    y: 0, // Start from the top
    size: random(30, 50), // Random size
    type: random(shapeTypes), // Random shape
    color: color(random(100, 255), random(100, 255), random(100, 255)), // Random color
  };
}

/*

NOTES:
- Add sound effect
- Add visual effect background
- Collision effect

*/