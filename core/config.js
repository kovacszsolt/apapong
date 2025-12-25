// Game State Variables
let leftScore = 0;
let rightScore = 0;
let gameOver = false;
const initialBallSpeed = GAME_CONFIG.BALL.INITIAL_SPEED;
let ballSpeed = initialBallSpeed;
let paddleSpeed = GAME_CONFIG.PADDLE.SPEED;
let leftPlayerName = GAME_CONFIG.PLAYER.DEFAULT_LEFT_NAME;
let rightPlayerName = GAME_CONFIG.PLAYER.DEFAULT_RIGHT_NAME;

// Load ball color from localStorage if available
let ballColor;
if (typeof window !== 'undefined' && window.__savedBallColor) {
    ballColor = [...window.__savedBallColor];
    delete window.__savedBallColor;
} else {
    ballColor = loadFromLocalStorage('ballColor', GAME_CONFIG.COLORS.DEFAULT_BALL);
    if (Array.isArray(ballColor)) {
        ballColor = [...ballColor];
    }
}

// Load paddle colors from localStorage if available
let leftPaddleColor = loadFromLocalStorage('leftPaddleColor', GAME_CONFIG.COLORS.DEFAULT_LEFT_PADDLE);
let rightPaddleColor = loadFromLocalStorage('rightPaddleColor', GAME_CONFIG.COLORS.DEFAULT_RIGHT_PADDLE);

if (Array.isArray(leftPaddleColor)) {
    leftPaddleColor = [...leftPaddleColor];
}
if (Array.isArray(rightPaddleColor)) {
    rightPaddleColor = [...rightPaddleColor];
}

// Game Object References
let leftPaddle;
let rightPaddle;
let ball;
let scoreText;
let countdownText = null;
let countdownActive = false;
let countdownValue = GAME_CONFIG.COUNTDOWN.START_VALUE;
let countdownTimer = 0;
let soundCooldown = 0;

