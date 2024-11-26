let snake;
let food;
let direction;
let gameInterval;
let score;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
document.getElementById('high-score').innerText = highScore;

function startGame() {
    snake = [{ x: 10, y: 10 }];
    food = getRandomFoodPosition();
    direction = { x: 1, y: 0 }; // Start moving to the right
    score = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('game-area').innerHTML = '';
    document.getElementById('game-over').style.display = 'none';
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 300);
    document.addEventListener('keydown', changeDirection);
    // Add event listeners for on-screen controls
    document.getElementById('up').addEventListener('click', () => changeDirection({ key: 'ArrowUp' }));
    document.getElementById('down').addEventListener('click', () => changeDirection({ key: 'ArrowDown' }));
    document.getElementById('left').addEventListener('click', () => changeDirection({ key: 'ArrowLeft' }));
    document.getElementById('right').addEventListener('click', () => changeDirection({ key: 'ArrowRight' }));
    drawGame();
}

function getRandomFoodPosition() {
    return { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

function gameLoop() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check if snake hits the wall or itself
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameInterval);
        document.getElementById('game-over').style.display = 'block';
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            document.getElementById('high-score').innerText = highScore;
        }
        return;
    }

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        food = getRandomFoodPosition();
        score++;
        document.getElementById('score').innerText = score;
    } else {
        snake.pop();
    }

    snake.unshift(head);
    drawGame();
}

function drawGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';

    // Draw snake
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y + 1;
        snakeElement.style.gridColumnStart = segment.x + 1;
        snakeElement.classList.add('snake');
        gameArea.appendChild(snakeElement);
    });

    // Draw food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);
}
