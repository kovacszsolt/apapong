// ============================================================================
// Game Over System
// ============================================================================

/**
 * Creates the game over overlay
 */
function createGameOverOverlay() {
    add([
        rect(width(), height()),
        pos(0, 0),
        color(...GAME_CONFIG.COLORS.BLACK),
        opacity(GAME_CONFIG.COLORS.OVERLAY_OPACITY),
        z(GAME_CONFIG.Z_INDEX.OVERLAY),
    ]);
}

/**
 * Creates the winner announcement text
 * @param {string} winnerName - Name of the winning player
 */
function createWinnerText(winnerName) {
    add([
        text(`${winnerName} wins!`, {
            size: 48,
        }),
        pos(width() / 2 - 120, height() / 2 - 50),
        color(...GAME_CONFIG.COLORS.YELLOW),
        z(GAME_CONFIG.Z_INDEX.OVERLAY_TEXT),
    ]);
}

/**
 * Creates the restart instructions text
 */
function createRestartInstructions() {
    add([
        text("Press 'R' to restart or 'ESC' for menu", {
            size: 20,
        }),
        pos(width() / 2 - 200, height() / 2 + 50),
        color(...GAME_CONFIG.COLORS.WHITE),
        z(GAME_CONFIG.Z_INDEX.OVERLAY_TEXT),
    ]);
}

/**
 * Checks if game is over and displays winner screen
 */
function checkGameOver() {
    const winScore = GAME_CONFIG.SCORE.WIN_SCORE;
    if (leftScore >= winScore || rightScore >= winScore) {
        gameOver = true;
        const winner = leftScore >= winScore ? leftPlayerName : rightPlayerName;
        
        createGameOverOverlay();
        createWinnerText(winner);
        createRestartInstructions();
    }
}

// Export functions for testing
exportForTesting({
    checkGameOver
});

