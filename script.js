const dino = document.getElementById('dino');
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');

let score = 0;
let isJumping = false;
let gameInterval;

// Обработка нажатия клавиши пробела
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space' && !isJumping) {
    jump();
  }
});

// Функция прыжка динозавра
function jump() {
  isJumping = true;
  dino.classList.add('jump');

  setTimeout(() => {
    dino.classList.remove('jump');
    isJumping = false;
  }, 400);
}

// Функция создания препятствия
function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  game.appendChild(obstacle);

  const obstacleMoveInterval = setInterval(() => {
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    const obstacleLeft = obstacle.offsetLeft;

    // Проверка столкновения
    if (obstacleLeft < 90 && obstacleLeft > 40 && dinoTop < 40) {
      alert(`Игра окончена! Твой счёт: ${score}`);
      clearInterval(obstacleMoveInterval);
      clearInterval(gameInterval);
      location.reload();
    }

    // Удаление препятствия, если оно ушло за пределы
    if (obstacleLeft < -20) {
      clearInterval(obstacleMoveInterval);
      game.removeChild(obstacle);
      score++;
      scoreDisplay.textContent = `Счёт: ${score}`;
    }
  }, 20);
}

// Запуск игры: создание препятствий каждые 2 секунды
gameInterval = setInterval(createObstacle, 2000);
