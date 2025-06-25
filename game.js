const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game settings
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 80;
const PADDLE_MARGIN = 16;
const BALL_SIZE = 16;
const PADDLE_SPEED = 6; // AI paddle speed

// Paddle positions
let leftPaddleY = canvas.height / 2 - PADDLE_HEIGHT / 2;
let rightPaddleY = canvas.height / 2 - PADDLE_HEIGHT / 2;

// Ball properties
let ballX = canvas.width / 2 - BALL_SIZE / 2;
let ballY = canvas.height / 2 - BALL_SIZE / 2;
let ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
let ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);

// Mouse control for left paddle
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    leftPaddleY = mouseY - PADDLE_HEIGHT / 2;
    if (leftPaddleY < 0) leftPaddleY = 0;
    if (leftPaddleY + PADDLE_HEIGHT > canvas.height) leftPaddleY = canvas.height - PADDLE_HEIGHT;
});

// Draw paddles and ball
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}

// Draw net
function drawNet() {
    ctx.fillStyle = "#555";
    const netWidth = 4, netHeight = 24;
    for (let y = 0; y < canvas.height; y += netHeight * 2) {
        ctx.fillRect(canvas.width / 2 - netWidth / 2, y, netWidth, netHeight);
    }
}

// Collision detection
function collision(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

// Main game loop
function gameLoop() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top/bottom
    if (ballY <= 0) {
        ballY = 0;
        ballSpeedY *= -1;
    }
    if (ballY + BALL_SIZE >= canvas.height) {
        ballY = canvas.height - BALL_SIZE;
        ballSpeedY *= -1;
    }

    // Ball collision with left paddle
    if (collision(ballX, ballY, BALL_SIZE, BALL_SIZE,
                  PADDLE_MARGIN, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT)) {
        ballX = PADDLE_MARGIN + PADDLE_WIDTH;
        ballSpeedX *= -1;
        // Add "spin" based on where it hit
        let hitPos = (ballY + BALL_SIZE / 2) - (leftPaddleY + PADDLE_HEIGHT / 2);
        ballSpeedY = hitPos * 0.18;
    }

    // Ball collision with right paddle (AI)
    if (collision(ballX, ballY, BALL_SIZE, BALL_SIZE,
                  canvas.width - PADDLE_MARGIN - PADDLE_WIDTH, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT)) {
        ballX = canvas.width - PADDLE_MARGIN - PADDLE_WIDTH - BALL_SIZE;
        ballSpeedX *= -1;
        // Add "spin"
        let hitPos = (ballY + BALL_SIZE / 2) - (rightPaddleY + PADDLE_HEIGHT / 2);
        ballSpeedY = hitPos * 0.18;
    }

    // Ball out of bounds (reset)
    if (ballX < 0 || ballX + BALL_SIZE > canvas.width) {
        // Reset ball
        ballX = canvas.width / 2 - BALL_SIZE / 2;
        ballY = canvas.height / 2 - BALL_SIZE / 2;
        ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
        ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);
    }

    // AI paddle movement (tracks the ball, but limited speed)
    if (ballY + BALL_SIZE / 2 > rightPaddleY + PADDLE_HEIGHT / 2) {
        rightPaddleY += PADDLE_SPEED;
    } else if (ballY + BALL_SIZE / 2 < rightPaddleY + PADDLE_HEIGHT / 2) {
        rightPaddleY -= PADDLE_SPEED;
    }
    // Clamp AI paddle within canvas
    if (rightPaddleY < 0) rightPaddleY = 0;
    if (rightPaddleY + PADDLE_HEIGHT > canvas.height) rightPaddleY = canvas.height - PADDLE_HEIGHT;

    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNet();
    drawRect(PADDLE_MARGIN, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, "#0ff");
    drawRect(canvas.width - PADDLE_MARGIN - PADDLE_WIDTH, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, "#f0f");
    drawBall(ballX, ballY, BALL_SIZE, "#fff");

    requestAnimationFrame(gameLoop);
}

gameLoop();
