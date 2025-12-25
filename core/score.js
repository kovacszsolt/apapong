// ============================================================================
// Score System
// ============================================================================

/**
 * Creates the score display string
 * @returns {string} Formatted score string
 */
function createScoreString() {
    return `${leftPlayerName}: ${leftScore} - ${rightScore} :${rightPlayerName}`;
}

/**
 * Calculates the text width for centering
 * @param {string} text - Text to measure
 * @returns {number} Estimated text width
 */
function calculateTextWidth(text) {
    return text.length * GAME_CONFIG.SCORE.CHAR_WIDTH;
}

/**
 * Updates the score display
 */
function updateScore() {
    const scoreString = createScoreString();
    scoreText.text = scoreString;
    const textWidth = calculateTextWidth(scoreString);
    scoreText.pos.x = width() / 2 - textWidth / 2;
}

/**
 * Formats the ball speed for display
 * @param {number} speed - Current ball speed
 * @returns {string} Formatted speed string
 */
function formatBallSpeed(speed) {
    // Convert speed to a more readable format (percentage of initial speed)
    const percentage = Math.round((speed / GAME_CONFIG.BALL.INITIAL_SPEED) * 100);
    return `Speed: ${percentage}%`;
}

/**
 * Creates the speed display
 */
function createSpeedDisplay() {
    if (speedText) {
        destroy(speedText);
    }
    
    const speedString = formatBallSpeed(ballSpeed);
    const speedY = 80;
    
    speedText = add([
        text(speedString, {
            size: 20,
        }),
        pos(width() / 2, speedY),
        color(...GAME_CONFIG.COLORS.WHITE),
        opacity(0.7),
    ]);
    
    // Center the text
    const textWidth = speedString.length * 10; // Approximate character width
    speedText.pos.x = width() / 2 - textWidth / 2;
}

/**
 * Updates the speed display
 */
function updateSpeedDisplay() {
    if (!speedText || !ball) return;
    
    // Get current actual speed from ball velocity if available, otherwise use ballSpeed variable
    let currentSpeed = ballSpeed;
    if (ball && ball.velocity && typeof getCurrentBallSpeed !== 'undefined') {
        try {
            const calculatedSpeed = getCurrentBallSpeed(ball);
            if (calculatedSpeed > 0) {
                currentSpeed = calculatedSpeed;
            }
        } catch (e) {
            // Fallback to ballSpeed variable
        }
    }
    
    const speedString = formatBallSpeed(currentSpeed);
    speedText.text = speedString;
    
    // Re-center the text
    const textWidth = speedString.length * 10;
    speedText.pos.x = width() / 2 - textWidth / 2;
}

// Export functions for testing
exportForTesting({
    createScoreString,
    calculateTextWidth,
    updateScore,
    formatBallSpeed,
    createSpeedDisplay,
    updateSpeedDisplay
});

