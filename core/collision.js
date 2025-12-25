// ============================================================================
// Collision System
// ============================================================================

/**
 * Calculates the bounce angle based on where the ball hits the paddle
 * @param {Object} ball - Ball game object
 * @param {Object} paddle - Paddle game object
 * @returns {number} Bounce angle in radians
 */
function calculateBounceAngle(ball, paddle) {
    const ballCenterY = ball.pos.y + ball.height / 2;
    const paddleCenterY = paddle.pos.y + paddle.height / 2;
    const relativeIntersectY = ballCenterY - paddleCenterY;
    const normalizedIntersectY = relativeIntersectY / (paddle.height / 2);
    return normalizedIntersectY * GAME_CONFIG.BALL.BOUNCE_ANGLE_RANGE;
}

/**
 * Calculates the current ball speed
 * @param {Object} ball - Ball game object
 * @returns {number} Current ball speed
 */
function getCurrentBallSpeed(ball) {
    return Math.sqrt(ball.velocity.x * ball.velocity.x + ball.velocity.y * ball.velocity.y);
}

/**
 * Corrects ball position after collision to prevent sticking
 * @param {Object} ball - Ball game object
 * @param {Object} paddle - Paddle game object
 * @param {number} direction - Direction multiplier (1 for right, -1 for left)
 */
function correctBallPosition(ball, paddle, direction) {
    const offset = GAME_CONFIG.COLLISION.BALL_OFFSET;
    if (direction > 0) {
        ball.pos.x = paddle.pos.x + paddle.width + offset;
    } else {
        ball.pos.x = paddle.pos.x - ball.width - offset;
    }
}

/**
 * Handles paddle collision: calculates bounce angle, increases speed, and plays sound
 * @param {Object} ball - Ball game object
 * @param {Object} paddle - Paddle game object
 * @param {number} direction - Direction multiplier (1 for right, -1 for left)
 */
function handlePaddleCollision(ball, paddle, direction) {
    const bounceAngle = calculateBounceAngle(ball, paddle);
    const currentSpeed = getCurrentBallSpeed(ball);
    ballSpeed = currentSpeed + GAME_CONFIG.BALL.SPEED_INCREMENT;
    
    ball.velocity.x = Math.cos(bounceAngle) * direction * ballSpeed;
    ball.velocity.y = Math.sin(bounceAngle) * ballSpeed;
    
    correctBallPosition(ball, paddle, direction);
    playPongSound();
}

// Export functions for testing
exportForTesting({
    calculateBounceAngle,
    getCurrentBallSpeed,
    correctBallPosition,
    handlePaddleCollision
});

