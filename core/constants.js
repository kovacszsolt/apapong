// Game Constants
const GAME_CONFIG = {
    CANVAS: {
        WIDTH: 800,
        HEIGHT: 600,
        BACKGROUND: [20, 20, 30],
    },
    BALL: {
        SIZE: 20,
        INITIAL_SPEED: 15000,
        SPEED_INCREMENT: 2000,
        BOUNCE_ANGLE_RANGE: Math.PI / 3, // 60 degrees
        ANGLE_OFFSET: Math.PI / 6, // 30 degrees
    },
    PADDLE: {
        WIDTH: 15,
        HEIGHT: 100,
        SPEED: 16000,
        LEFT_X: 30,
        RIGHT_X_OFFSET: 45,
    },
    SCORE: {
        WIN_SCORE: 5,
        TEXT_SIZE: 36,
        CHAR_WIDTH: 18,
    },
    GAME_MODE: {
        FIXED_SCORE: 'fixed_score',
        LEAD_BY_THREE: 'lead_by_three',
        DEFAULT: 'fixed_score',
        LEAD_THRESHOLD: 3,
    },
    COUNTDOWN: {
        START_VALUE: 3,
        INTERVAL: 1.0,
        TEXT_SIZE: 120,
        FINAL_COLOR: [255, 255, 0],
    },
    SOUND: {
        PONG_FREQUENCY: 800,
        PONG_DURATION: 0.1,
        PONG_TYPE: 'square',
        COUNTDOWN_FREQUENCY: 600,
        COUNTDOWN_DURATION: 0.15,
        COUNTDOWN_TYPE: 'sine',
        FINAL_COUNTDOWN_FREQUENCY: 800,
        FINAL_COUNTDOWN_DURATION: 0.2,
        COOLDOWN: 0.1,
        GAIN: 0.3,
        GAIN_END: 0.01,
    },
    COLLISION: {
        COOLDOWN: 0.05,
        BALL_OFFSET: 1,
    },
    UI: {
        CENTER_LINE_SEGMENT_HEIGHT: 20,
        CENTER_LINE_WIDTH: 4,
        CENTER_LINE_OPACITY: 0.3,
        WALL_THICKNESS: 1,
    },
    COLORS: {
        DEFAULT_BALL: [255, 255, 255],
        DEFAULT_LEFT_PADDLE: [100, 200, 255],
        DEFAULT_RIGHT_PADDLE: [255, 100, 100],
        WHITE: [255, 255, 255],
        YELLOW: [255, 255, 0],
        BLACK: [0, 0, 0],
        OVERLAY_OPACITY: 0.7,
    },
    PLAYER: {
        DEFAULT_LEFT_NAME: "Left Player",
        DEFAULT_RIGHT_NAME: "Right Player",
        MIN_NAME_LENGTH: 1,
        MAX_NAME_LENGTH: 8,
    },
    Z_INDEX: {
        OVERLAY: 100,
        OVERLAY_TEXT: 101,
        COUNTDOWN: 200,
    },
};

// Make constants globally available
window.GAME_CONFIG = GAME_CONFIG;

