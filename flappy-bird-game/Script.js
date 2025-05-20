const bird = document.getElementById('bird');
const pipeTop = document.getElementById('pipe-top');
const pipeBottom = document.getElementById('pipe-bottom');
const scoreElement = document.getElementById('score');

let birdY = 250;
let birdVelocity = 0;
let gravity = 0.5;
let flapStrength = -10;
let pipeGap = 200;
let pipeWidth = 60;
let pipeX = 400;
let pipeHeight = Math.floor(Math.random() * (600 - pipeGap));
let score = 0;
let gameInterval;

function startGame() {
  birdY = 250;
  birdVelocity = 0;
  pipeX = 400;
  pipeHeight = Math.floor(Math.random() * (600 - pipeGap));
  score = 0;
  scoreElement.textContent = score;
  gameInterval = setInterval(gameLoop, 1000 / 60); // 60 frames per second
}

function gameLoop() {
  birdVelocity += gravity;
  birdY += birdVelocity;

  if (birdY > 600 - 40) {
    endGame();
  }

  if (birdY < 0) {
    birdY = 0;
  }

  pipeX -= 2;

  if (pipeX + pipeWidth < 0) {
    pipeX = 400;
    pipeHeight = Math.floor(Math.random() * (600 - pipeGap));
    score++;
    scoreElement.textContent = score;
  }

  if (
    pipeX < 50 + 40 &&
    (birdY < pipeHeight || birdY + 40 > pipeHeight + pipeGap)
  ) {
    endGame();
  }

  bird.style.top = birdY + 'px';
  pipeTop.style.height = pipeHeight + 'px';
  pipeBottom.style.height = 600 - pipeHeight - pipeGap + 'px';
  pipeTop.style.left = pipeX + 'px';
  pipeBottom.style.left = pipeX + 'px';
}

function endGame() {
  clearInterval(gameInterval);
  alert('Game Over! Final Score: ' + score);
}

document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    birdVelocity = flapStrength;
  }
});

startGame();
