const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');

const GRID_SIZE = 20;
const TILE_COUNT = 20;
const GAME_SPEED = 150;

let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let highScore = 0;
let gameLoop = null;
let isPaused = false;
let gameStarted = false;

function init() {
    loadHighScore();
    setupEventListeners();
    drawGame();
}

function loadHighScore() {
    const saved = localStorage.getItem('snakeHighScore');
    highScore = saved ? parseInt(saved) : 0;
    highScoreElement.textContent = highScore;
}

function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
}

function setupEventListeners() {
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(e) {
    if (!gameStarted || isPaused) return;

    switch(e.key) {
        case 'ArrowUp':
            if (direction.y === 0) nextDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) nextDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) nextDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) nextDirection = { x: 1, y: 0 };
            break;
    }
}

function startGame() {
    snake = [
        { x: 3, y: 10 },
        { x: 2, y: 10 },
        { x: 1, y: 10 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    isPaused = false;
    gameStarted = true;
    scoreElement.textContent = score;
    
    generateFood();
    
    startBtn.textContent = '重新開始';
    pauseBtn.disabled = false;
    pauseBtn.textContent = '暫停';
    
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, GAME_SPEED);
}

function togglePause() {
    if (!gameStarted) return;
    
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? '繼續' : '暫停';
    
    if (isPaused) {
        clearInterval(gameLoop);
    } else {
        gameLoop = setInterval(update, GAME_SPEED);
    }
}

function update() {
    direction = nextDirection;
    
    const head = { 
        x: snake[0].x + direction.x, 
        y: snake[0].y + direction.y 
    };
    
    if (checkCollision(head)) {
        gameOver();
        return;
    }
    
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
    
    drawGame();
}

function checkCollision(head) {
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        return true;
    }
    
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    food = newFood;
}

function drawGame() {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    for (let i = 0; i <= TILE_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(canvas.width, i * GRID_SIZE);
        ctx.stroke();
    }
    
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#2d3748' : '#4a5568';
        ctx.fillRect(
            segment.x * GRID_SIZE + 1,
            segment.y * GRID_SIZE + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2
        );
    });
    
    ctx.fillStyle = '#e53e3e';
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2,
        food.y * GRID_SIZE + GRID_SIZE / 2,
        GRID_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function gameOver() {
    clearInterval(gameLoop);
    gameStarted = false;
    pauseBtn.disabled = true;
    
    saveHighScore();
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('遊戲結束', canvas.width / 2, canvas.height / 2 - 20);
    
    ctx.font = '24px Arial';
    ctx.fillText(`分數：${score}`, canvas.width / 2, canvas.height / 2 + 30);
}

init();
