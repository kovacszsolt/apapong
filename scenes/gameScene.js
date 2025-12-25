// ============================================================================
// Game Scene
// ============================================================================

/**
 * Creates the center line divider
 */
function createCenterLine() {
    const segmentHeight = GAME_CONFIG.UI.CENTER_LINE_SEGMENT_HEIGHT;
    const lineWidth = GAME_CONFIG.UI.CENTER_LINE_WIDTH;
    const halfWidth = lineWidth / 2;
    
    for (let i = 0; i < height(); i += segmentHeight) {
        add([
            rect(lineWidth, segmentHeight / 2),
            pos(width() / 2 - halfWidth, i),
            color(...GAME_CONFIG.COLORS.WHITE),
            opacity(GAME_CONFIG.UI.CENTER_LINE_OPACITY),
        ]);
    }
}

/**
 * Creates invisible walls for collision detection
 */
function createWalls() {
    const wallThickness = GAME_CONFIG.UI.WALL_THICKNESS;
    
    // Top wall
    add([
        rect(width(), wallThickness),
        pos(0, 0),
        area(),
        body({ isStatic: true }),
        opacity(0),
        "topWall",
    ]);

    // Bottom wall
    add([
        rect(width(), wallThickness),
        pos(0, height() - wallThickness),
        area(),
        body({ isStatic: true }),
        opacity(0),
        "bottomWall",
    ]);
}

/**
 * Creates a paddle
 * @param {number} x - X position
 * @param {Array<number>} paddleColor - RGB color array
 * @param {string} tag - Paddle tag name
 * @returns {Object} Paddle game object
 */
function createPaddle(x, paddleColor, tag) {
    return add([
        rect(GAME_CONFIG.PADDLE.WIDTH, GAME_CONFIG.PADDLE.HEIGHT),
        pos(x, height() / 2 - GAME_CONFIG.PADDLE.HEIGHT / 2),
        area(),
        body({ isStatic: true }),
        color(...paddleColor),
        tag,
    ]);
}

/**
 * Creates the score display
 */
function createScoreDisplay() {
    const scoreString = createScoreString();
    const textWidth = calculateTextWidth(scoreString);
    const scoreY = 30;
    
    scoreText = add([
        text(scoreString, {
            size: GAME_CONFIG.SCORE.TEXT_SIZE,
        }),
        pos(width() / 2 - textWidth / 2, scoreY),
        color(...GAME_CONFIG.COLORS.WHITE),
    ]);
}

/**
 * Handles paddle movement with boundary checking
 * @param {Object} paddle - Paddle game object
 * @param {number} direction - Movement direction (-1 for up, 1 for down)
 */
function movePaddle(paddle, direction) {
    if (gameOver) return;
    
    const movement = direction * paddleSpeed * dt();
    paddle.move(0, movement);
    
    // Boundary checking
    if (paddle.pos.y < 0) {
        paddle.pos.y = 0;
    }
    if (paddle.pos.y + paddle.height > height()) {
        paddle.pos.y = height() - paddle.height;
    }
}

/**
 * Sets up keyboard controls
 */
function setupControls() {
    onKeyDown("w", () => movePaddle(leftPaddle, -1));
    onKeyDown("s", () => movePaddle(leftPaddle, 1));
    onKeyDown("up", () => movePaddle(rightPaddle, -1));
    onKeyDown("down", () => movePaddle(rightPaddle, 1));
    
    onKeyPress("r", () => {
        if (gameOver) {
            go("game");
        }
    });
    
    onKeyPress("escape", () => {
        window.location.href = 'index.html';
    });
}

scene("game", () => {
    // Reset game state
    leftScore = 0;
    rightScore = 0;
    gameOver = false;
    ballSpeed = initialBallSpeed;

    createCenterLine();
    createWalls();
    
    leftPaddle = createPaddle(
        GAME_CONFIG.PADDLE.LEFT_X,
        leftPaddleColor,
        "leftPaddle"
    );
    
    rightPaddle = createPaddle(
        width() - GAME_CONFIG.PADDLE.RIGHT_X_OFFSET,
        rightPaddleColor,
        "rightPaddle"
    );

    resetBall();
    createScoreDisplay();
    createSpeedDisplay();
    setupControls();

    // Main game loop
    onUpdate(() => {
        updateCountdown();
        
        // Update sound cooldown
        if (soundCooldown > 0) {
            soundCooldown -= dt();
        }

        // Move ball (only if countdown is not active)
        if (ball && !gameOver && ball.velocity && !countdownActive) {
            ball.move(ball.velocity.x * dt(), ball.velocity.y * dt());
            updateSpeedDisplay();
        }
    });

    setupBallCollisions();
});

