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
    let isGameOver = false;
    let winner = null;
    
    // Ensure gameMode is defined, fallback to default
    const currentGameMode = typeof gameMode !== 'undefined' ? gameMode : GAME_CONFIG.GAME_MODE.DEFAULT;
    
    if (currentGameMode === GAME_CONFIG.GAME_MODE.LEAD_BY_THREE) {
        // Lead by three mode: win if leading by 3 points
        const scoreDiff = Math.abs(leftScore - rightScore);
        if (scoreDiff >= GAME_CONFIG.GAME_MODE.LEAD_THRESHOLD) {
            // Also need to ensure at least one player has scored
            if (leftScore > 0 || rightScore > 0) {
                isGameOver = true;
                winner = leftScore > rightScore ? leftPlayerName : rightPlayerName;
            }
        }
    } else {
        // Fixed score mode: win if reaching WIN_SCORE
        const winScore = GAME_CONFIG.SCORE.WIN_SCORE;
        if (leftScore >= winScore || rightScore >= winScore) {
            isGameOver = true;
            winner = leftScore >= winScore ? leftPlayerName : rightPlayerName;
        }
    }
    
    if (isGameOver) {
        gameOver = true;
        createGameOverOverlay();
        createWinnerText(winner);
        createRestartInstructions();
    }
}

// Export functions for testing
exportForTesting({
    checkGameOver
});

