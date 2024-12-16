let mSerial; // Serial port object
let connectButton;

let playerX, playerY;
let playerWidth = 50, playerHeight = 20;
let fallingObjects = [];
let score = 0;
let highScore = 0;
let gameOver = false;
let fallSpeed = 3; // Initial falling speed
let difficultyIncrement = 0.05;
let readyToReceive = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize serial connection
  mSerial = createSerial();

  // Serial connect button
  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2 - 80, height / 2);
  connectButton.mousePressed(connectToSerial);

  // Initialize player position
  playerX = width / 2;
  playerY = height - 60;

  // Generate falling objects at intervals
  setInterval(() => {
    if (!gameOver) fallingObjects.push(createRandomObject());
  }, 1000);
}

function draw() {
  background(0);

  // Attempt serial communication if connected
  if (mSerial.opened() && readyToReceive) {
    mSerial.clear();
    mSerial.write(0xAB); // Request data
    readyToReceive = false;
  }

  if (mSerial.availableBytes() > 0) {
    receiveSerial();
  }

  // Main game logic
  if (!gameOver) {
    playGame();
  } else {
    gameOverScreen();
  }
}

function playGame() {
  // Draw player
  fill(0, 255, 0);
  rect(playerX, playerY, playerWidth, playerHeight);

  // Update and draw falling objects
  for (let i = fallingObjects.length - 1; i >= 0; i--) {
    let obj = fallingObjects[i];
    obj.y += fallSpeed;

    drawShape(obj);

    // Check collision
    if (
      obj.x < playerX + playerWidth &&
      obj.x + obj.size > playerX &&
      obj.y < playerY + playerHeight &&
      obj.y + obj.size > playerY
    ) {
      gameOver = true;
      if (score > highScore) highScore = score;
    }

    // Remove off-screen objects
    if (obj.y > height) {
      fallingObjects.splice(i, 1);
      score += 10; // Increase score
      fallSpeed += difficultyIncrement;
    }
  }

  displayScore();
}

function receiveSerial() {
  let mLine = mSerial.readUntil("\n");
  let command = mLine.trim();

  // Update player position or restart based on received serial data
  if (command === "LEFT") {
    playerX = max(0, playerX - 20);
  } else if (command === "RIGHT") {
    playerX = min(width - playerWidth, playerX + 20);
  } else if (command === "RESTART") {
    resetGame(); // Restart the game
  }

  readyToReceive = true;
}

function connectToSerial() {
  try {
    if (!mSerial.opened()) {
      mSerial.open(9600);
      connectButton.hide();
      readyToReceive = true;
      console.log("Serial Connected!");
    }
  } catch (err) {
    console.error("Failed to connect to serial port: ", err);
  }
}

function createRandomObject() {
  let shapes = ["square", "ellipse", "triangle"];
  return {
    x: random(0, width - 40),
    y: 0,
    size: random(30, 50),
    type: random(shapes),
    color: color(random(100, 255), random(100, 255), random(100, 255)),
  };
}

function drawShape(obj) {
  fill(obj.color);
  if (obj.type === "square") rect(obj.x, obj.y, obj.size, obj.size);
  if (obj.type === "ellipse") ellipse(obj.x, obj.y, obj.size, obj.size);
  if (obj.type === "triangle") triangle(obj.x, obj.y, obj.x + obj.size, obj.y, obj.x + obj.size / 2, obj.y - obj.size);
}

function displayScore() {
  fill(255);
  textSize(20);
  text(`Score: ${score}`, 10, 30);
  text(`High Score: ${highScore}`, 10, 60);
}

function gameOverScreen() {
  fill(255, 0, 0);
  textSize(32);
  text("Game Over!", width / 2 - 100, height / 2);
  text(`Final Score: ${score}`, width / 2 - 100, height / 2 + 40);
  text(`High Score: ${highScore}`, width / 2 - 100, height / 2 + 80);
  text("Press 'Restart Button' to Restart", width / 2 - 200, height / 2 + 120);
}

function resetGame() {
  score = 0;
  fallSpeed = 3;
  fallingObjects = [];
  gameOver = false;
  playerX = width / 2;
}