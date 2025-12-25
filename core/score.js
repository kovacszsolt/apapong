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

// Export functions for testing
exportForTesting({
    createScoreString,
    calculateTextWidth,
    updateScore
});

