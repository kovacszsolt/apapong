// Mock Kaplay.js globals
global.kaplay = () => {};
global.scene = () => {};
global.go = () => {};
global.add = () => ({});
global.destroy = () => {};
global.text = () => ({});
global.rect = () => ({});
global.pos = () => ({});
global.color = () => ({});
global.area = () => ({});
global.opacity = () => ({});
global.z = () => ({});
global.width = () => 800;
global.height = () => 600;
global.dt = () => 0.016;
global.vec2 = (x, y) => ({ x, y });
global.onKeyPress = () => {};
global.onUpdate = () => {};

// Make these available on window for imported modules
if (typeof window !== 'undefined') {
  window.kaplay = global.kaplay;
  window.scene = global.scene;
  window.go = global.go;
  window.add = global.add;
  window.destroy = global.destroy;
  window.text = global.text;
  window.rect = global.rect;
  window.pos = global.pos;
  window.color = global.color;
  window.area = global.area;
  window.opacity = global.opacity;
  window.z = global.z;
  window.width = global.width;
  window.height = global.height;
  window.dt = global.dt;
  window.vec2 = global.vec2;
  window.onKeyPress = global.onKeyPress;
  window.onUpdate = global.onUpdate;
}

// Load and expose constants
import '../core/constants.js';
// Load utils for testing
import '../core/utils.js';

// Enable test mode for function exports
if (typeof window !== 'undefined') {
  window.__TEST__ = true;
}

// Make GAME_CONFIG available globally for tests
if (typeof window !== 'undefined' && window.GAME_CONFIG) {
  global.GAME_CONFIG = window.GAME_CONFIG;
} else {
  // Fallback: define GAME_CONFIG directly if window is not available
  global.GAME_CONFIG = {
    CANVAS: {
      WIDTH: 800,
      HEIGHT: 600,
      BACKGROUND: [20, 20, 30],
    },
    BALL: {
      SIZE: 20,
      INITIAL_SPEED: 15000,
      SPEED_INCREMENT: 2000,
      BOUNCE_ANGLE_RANGE: Math.PI / 3,
      ANGLE_OFFSET: Math.PI / 6,
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
}

// Mock AudioContext
if (typeof window !== 'undefined') {
  window.AudioContext = class {
    createOscillator() {
      return {
        connect: () => {},
        frequency: { value: 0 },
        type: 'square',
        start: () => {},
        stop: () => {},
      };
    }
    createGain() {
      return {
        connect: () => {},
        gain: {
          setValueAtTime: () => {},
          exponentialRampToValueAtTime: () => {},
        },
      };
    }
    get destination() {
      return {};
    }
    get currentTime() {
      return 0;
    }
  };
  window.webkitAudioContext = window.AudioContext;
}

