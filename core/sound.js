// ============================================================================
// Sound System
// ============================================================================

/**
 * Plays a sound with specified frequency, duration and type
 * @param {number} frequency - Sound frequency in Hz
 * @param {number} duration - Sound duration in seconds
 * @param {string} type - Oscillator type ('square', 'sine', etc.)
 */
function playSound(frequency, duration, type = 'square') {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(GAME_CONFIG.SOUND.GAIN, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
            GAME_CONFIG.SOUND.GAIN_END, 
            audioContext.currentTime + duration
        );
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        // Sound playback may require user interaction
        console.log("Sound playback failed:", error);
    }
}

/**
 * Plays the pong bounce sound with cooldown protection
 */
function playPongSound() {
    if (soundCooldown > 0) {
        return;
    }
    soundCooldown = GAME_CONFIG.SOUND.COOLDOWN;
    playSound(
        GAME_CONFIG.SOUND.PONG_FREQUENCY,
        GAME_CONFIG.SOUND.PONG_DURATION,
        GAME_CONFIG.SOUND.PONG_TYPE
    );
}

/**
 * Plays the countdown sound
 */
function playCountdownSound() {
    playSound(
        GAME_CONFIG.SOUND.COUNTDOWN_FREQUENCY,
        GAME_CONFIG.SOUND.COUNTDOWN_DURATION,
        GAME_CONFIG.SOUND.COUNTDOWN_TYPE
    );
}

// Export functions for testing
exportForTesting({
    playSound,
    playPongSound,
    playCountdownSound
});

