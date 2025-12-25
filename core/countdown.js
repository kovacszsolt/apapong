// ============================================================================
// Countdown System
// ============================================================================

/**
 * Generates a random ball direction
 * @returns {number} Direction multiplier (1 or -1)
 */
function getRandomDirection() {
    return Math.random() > 0.5 ? 1 : -1;
}

/**
 * Generates a random ball angle within the allowed range
 * @returns {number} Angle in radians
 */
function getRandomBallAngle() {
    return (Math.random() * GAME_CONFIG.BALL.BOUNCE_ANGLE_RANGE) - GAME_CONFIG.BALL.ANGLE_OFFSET;
}

/**
 * Creates the countdown text display
 */
function createCountdownText() {
    countdownText = add([
        text(`${countdownValue}`, {
            size: GAME_CONFIG.COUNTDOWN.TEXT_SIZE,
        }),
        pos(width() / 2 - 60, height() / 2 - 60),
        color(...GAME_CONFIG.COLORS.WHITE),
        z(GAME_CONFIG.Z_INDEX.COUNTDOWN),
    ]);
}

/**
 * Destroys existing countdown text if it exists
 */
function destroyCountdownText() {
    if (countdownText) {
        destroy(countdownText);
        countdownText = null;
    }
}

/**
 * Creates a stationary ball at the center of the screen
 */
function createStationaryBall() {
    if (ball) {
        destroy(ball);
    }
    
    const direction = getRandomDirection();
    const angle = getRandomBallAngle();
    const ballSize = GAME_CONFIG.BALL.SIZE;
    const halfSize = ballSize / 2;
    
    ball = add([
        rect(ballSize, ballSize),
        pos(width() / 2 - halfSize, height() / 2 - halfSize),
        area(),
        color(...ballColor),
        {
            velocity: vec2(0, 0),
            direction: direction,
            angle: angle,
        },
    ]);
}

/**
 * Starts the countdown before a new round
 */
function startCountdown() {
    if (countdownActive) return;
    
    countdownActive = true;
    countdownValue = GAME_CONFIG.COUNTDOWN.START_VALUE;
    countdownTimer = 0;
    
    destroyCountdownText();
    createCountdownText();
    playCountdownSound();
    createStationaryBall();
}

/**
 * Updates countdown text display
 */
function updateCountdownText() {
    if (countdownText) {
        countdownText.text = `${countdownValue}`;
    }
}

/**
 * Shows final countdown (0) with special styling
 */
function showFinalCountdown() {
    if (countdownText) {
        countdownText.text = "0";
        countdownText.color = GAME_CONFIG.COUNTDOWN.FINAL_COLOR;
    }
    playSound(
        GAME_CONFIG.SOUND.FINAL_COUNTDOWN_FREQUENCY,
        GAME_CONFIG.SOUND.FINAL_COUNTDOWN_DURATION,
        GAME_CONFIG.SOUND.COUNTDOWN_TYPE
    );
}

/**
 * Starts the ball movement after countdown ends
 */
function startBallMovement() {
    if (ball && ball.angle !== undefined && ball.direction !== undefined) {
        ball.velocity.x = Math.cos(ball.angle) * ball.direction * ballSpeed;
        ball.velocity.y = Math.sin(ball.angle) * ballSpeed;
    }
}

/**
 * Ends the countdown and starts the ball
 */
function endCountdown() {
    destroyCountdownText();
    countdownActive = false;
    startBallMovement();
    setupBallCollisions();
}

/**
 * Updates the countdown timer (called from gameScene)
 */
function updateCountdown() {
    if (!countdownActive) return;
    
    countdownTimer += dt();
    const countdownInterval = GAME_CONFIG.COUNTDOWN.INTERVAL;
    
    if (countdownTimer >= countdownInterval) {
        countdownTimer = 0;
        countdownValue--;
        
        if (countdownValue > 0) {
            updateCountdownText();
            playCountdownSound();
        } else if (countdownValue === 0) {
            showFinalCountdown();
        } else {
            endCountdown();
        }
    }
}

/**
 * Resets the ball with countdown
 */
function resetBall() {
    startCountdown();
}

// Export functions for testing
exportForTesting({
    getRandomDirection,
    getRandomBallAngle,
    createCountdownText,
    destroyCountdownText,
    updateCountdownText,
    showFinalCountdown,
    startBallMovement,
    startCountdown,
    updateCountdown,
    resetBall,
    createStationaryBall,
    endCountdown
});

