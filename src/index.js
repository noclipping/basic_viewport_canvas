// Initialize variables
let playerX = 100;
let playerY = 100;
let followerX = 200; // Initial position of the follower
let followerY = 200; // Initial position of the follower
let viewportX = 0;
let viewportY = 0;

function drawGame() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw a grid-like background
  ctx.beginPath();
  const gridSize = 50;
  ctx.strokeStyle = "gray";
  for (let x = 0; x < canvas.width + viewportX; x += gridSize) {
    ctx.moveTo(x - viewportX, 0);
    ctx.lineTo(x - viewportX, canvas.height);
    //         x - viewportX , whole vertical screen
  }
  for (let y = 0; y < canvas.height + viewportY; y += gridSize) {
    ctx.moveTo(0, y - viewportY);
    ctx.lineTo(canvas.width, y - viewportY);
  }
  ctx.stroke();

  // Draw some static obstacles
  ctx.fillStyle = "red";
  ctx.fillRect(200 - viewportX, 300 - viewportY, 50, 50);
  ctx.fillRect(300 - viewportX, 200 - viewportY, 50, 50);

  const followerDrawX = followerX - viewportX;
  const followerDrawY = followerY - viewportY;
  ctx.beginPath();
  ctx.arc(followerDrawX, followerDrawY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();

  // Draw the player as a simple circle
  const playerDrawX = playerX - viewportX;
  const playerDrawY = playerY - viewportY;
  ctx.beginPath();
  ctx.arc(playerDrawX, playerDrawY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();

  // Request animation frame for smooth rendering
  requestAnimationFrame(drawGame);
  let stats = document.body.querySelector("#stats");
  stats.innerText = `playerX ${playerX} | playerY ${playerY} | viewportX ${viewportX} |  viewportY ${viewportY}`;
}

function updateViewport() {
  const canvas = document.getElementById("gameCanvas");
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Set the viewport position to center on the player
  viewportX = playerX - canvasWidth / 2;
  viewportY = playerY - canvasHeight / 2;

  // Clamp the viewport position to the game world boundaries
  // For this example, let's assume the game world is 2000x2000
  // viewportX = Math.max(0, Math.min(viewportX, 2000 - canvasWidth));
  // viewportY = Math.max(0, Math.min(viewportY, 2000 - canvasHeight));
}

function handlePlayerMovement(event) {
  // Handle player movement here and update playerX and playerY
  // For this example, we'll use arrow keys for movement
  const speed = 5;
  if (event.key === "ArrowLeft") {
    playerX -= speed;
  } else if (event.key === "ArrowRight") {
    playerX += speed;
  } else if (event.key === "ArrowUp") {
    playerY -= speed;
  } else if (event.key === "ArrowDown") {
    playerY += speed;
  }
  const dx = playerX - followerX;
  const dy = playerY - followerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance > 50) {
    const ratio = 5 / distance; // Move follower 5 pixels towards the player
    followerX += dx * ratio;
    followerY += dy * ratio;
  }
  // Update the viewport position
  updateViewport();
}

// Add event listener for keyboard input to handle player movement
document.addEventListener("keydown", handlePlayerMovement);

// Start the game loop
drawGame();
