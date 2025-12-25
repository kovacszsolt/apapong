// ============================================================================
// Ball Collision Detection System
// ============================================================================

/**
 * Checks if ball collides with paddle (manual collision detection)
 * @param {Object} ball - Ball game object
 * @param {Object} paddle - Paddle game object
 * @param {number} velocityDirection - Expected velocity direction (< 0 for left, > 0 for right)
 * @returns {boolean} True if collision detected
 */
function checkPaddleCollision(ball, paddle, velocityDirection) {
    const ballLeft = ball.pos.x;
    const ballRight = ball.pos.x + ball.width;
    const ballTop = ball.pos.y;
    const ballBottom = ball.pos.y + ball.height;
    
    const paddleLeft = paddle.pos.x;
    const paddleRight = paddle.pos.x + paddle.width;
    const paddleTop = paddle.pos.y;
    const paddleBottom = paddle.pos.y + paddle.height;
    
    const horizontalOverlap = ballRight >= paddleLeft && ballLeft <= paddleRight;
    const verticalOverlap = ballBottom >= paddleTop && ballTop <= paddleBottom;
    const correctDirection = (velocityDirection < 0 && ball.velocity.x < 0) || 
                            (velocityDirection > 0 && ball.velocity.x > 0);
    
    return horizontalOverlap && verticalOverlap && correctDirection;
}

/**
 * Handles wall collision (top or bottom)
 * @param {Object} ball - Ball game object
 * @param {boolean} isTopWall - True for top wall, false for bottom wall
 */
function handleWallCollision(ball, isTopWall) {
    if (isTopWall) {
        ball.velocity.y = Math.abs(ball.velocity.y);
        if (ball.pos.y < 0) {
            ball.pos.y = 0;
        }
    } else {
        ball.velocity.y = -Math.abs(ball.velocity.y);
        if (ball.pos.y + ball.height > height()) {
            ball.pos.y = height() - ball.height;
        }
    }
    playPongSound();
}

/**
 * Handles score point (ball went out of bounds)
 * @param {boolean} isLeftSide - True if ball went out on left side
 */
function handleScorePoint(isLeftSide) {
    if (isLeftSide) {
        rightScore++;
    } else {
        leftScore++;
    }
    
    updateScore();
    checkGameOver();
    
    if (!gameOver) {
        ballSpeed = initialBallSpeed;
        resetBall();
    }
}

/**
 * Sets up all ball collision handlers
 */
function setupBallCollisions() {
    if (!ball) return;
    
    // Ball collisions
    ball.onCollide("leftPaddle", () => {
        handlePaddleCollision(ball, leftPaddle, 1);
    });

    ball.onCollide("rightPaddle", () => {
        handlePaddleCollision(ball, rightPaddle, -1);
    });
    
    // Manual collision detection (backup for high-speed collisions)
    let collisionCooldown = 0;
    ball.onUpdate(() => {
        if (collisionCooldown > 0) {
            collisionCooldown -= dt();
        }
        
        if (collisionCooldown <= 0) {
            if (checkPaddleCollision(ball, leftPaddle, -1)) {
                collisionCooldown = GAME_CONFIG.COLLISION.COOLDOWN;
                handlePaddleCollision(ball, leftPaddle, 1);
            }
            
            if (checkPaddleCollision(ball, rightPaddle, 1)) {
                collisionCooldown = GAME_CONFIG.COLLISION.COOLDOWN;
                handlePaddleCollision(ball, rightPaddle, -1);
            }
        }
    });

    // Wall collisions (top/bottom)
    ball.onCollide("topWall", () => {
        handleWallCollision(ball, true);
    });

    ball.onCollide("bottomWall", () => {
        handleWallCollision(ball, false);
    });

    // Backup wall collision detection and score checking
    ball.onUpdate(() => {
        // Wall position correction (backup)
        if (ball.pos.y < 0) {
            ball.pos.y = 0;
            ball.velocity.y = Math.abs(ball.velocity.y);
        }
        
        if (ball.pos.y + ball.height > height()) {
            ball.pos.y = height() - ball.height;
            ball.velocity.y = -Math.abs(ball.velocity.y);
        }

        // Score checking (ball went out of bounds)
        if (ball.pos.x < 0) {
            handleScorePoint(true);
        } else if (ball.pos.x > width()) {
            handleScorePoint(false);
        }
    });
}

// Export functions for testing
exportForTesting({
    checkPaddleCollision,
    handleWallCollision,
    handleScorePoint,
    setupBallCollisions
});

