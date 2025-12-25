import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../core/constants.js';
import '../core/utils.js';

// Import config to get coverage
import '../core/config.js';

describe('Config', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  it('should have initial game state variables', () => {
    // Test that config.js initializes variables
    expect(GAME_CONFIG).toBeDefined();
    expect(GAME_CONFIG.BALL.INITIAL_SPEED).toBe(15000);
    expect(GAME_CONFIG.PADDLE.SPEED).toBe(16000);
    expect(GAME_CONFIG.SCORE.WIN_SCORE).toBe(5);
  });

  it('should have default player names', () => {
    expect(GAME_CONFIG.PLAYER.DEFAULT_LEFT_NAME).toBe('Left Player');
    expect(GAME_CONFIG.PLAYER.DEFAULT_RIGHT_NAME).toBe('Right Player');
  });

  it('should have default colors', () => {
    expect(GAME_CONFIG.COLORS.DEFAULT_BALL).toEqual([255, 255, 255]);
    expect(GAME_CONFIG.COLORS.DEFAULT_LEFT_PADDLE).toEqual([100, 200, 255]);
    expect(GAME_CONFIG.COLORS.DEFAULT_RIGHT_PADDLE).toEqual([255, 100, 100]);
  });

  it('should have countdown configuration', () => {
    expect(GAME_CONFIG.COUNTDOWN.START_VALUE).toBe(3);
    expect(GAME_CONFIG.COUNTDOWN.INTERVAL).toBe(1.0);
  });

  it('should load ball color from localStorage', () => {
    const loadFromLocalStorage = (typeof window !== 'undefined' && window.loadFromLocalStorage) || 
                                 (typeof global !== 'undefined' && global.loadFromLocalStorage);
    
    if (!loadFromLocalStorage || typeof localStorage === 'undefined') {
      return;
    }
    
    const testColor = [255, 100, 100];
    localStorage.setItem('ballColor', JSON.stringify(testColor));
    
    // Reload config to test localStorage loading
    // Note: In actual usage, config.js loads once, but we can verify the function works
    const loadedColor = loadFromLocalStorage('ballColor', GAME_CONFIG.COLORS.DEFAULT_BALL);
    
    expect(loadedColor).toEqual(testColor);
  });

  it('should use default ball color when localStorage is empty', () => {
    const loadFromLocalStorage = (typeof window !== 'undefined' && window.loadFromLocalStorage) || 
                                 (typeof global !== 'undefined' && global.loadFromLocalStorage);
    
    if (!loadFromLocalStorage || typeof localStorage === 'undefined') {
      return;
    }
    
    localStorage.clear();
    const defaultColor = loadFromLocalStorage('ballColor', GAME_CONFIG.COLORS.DEFAULT_BALL);
    
    expect(defaultColor).toEqual(GAME_CONFIG.COLORS.DEFAULT_BALL);
  });

  it('should load paddle colors from localStorage', () => {
    const loadFromLocalStorage = (typeof window !== 'undefined' && window.loadFromLocalStorage) || 
                                 (typeof global !== 'undefined' && global.loadFromLocalStorage);
    
    if (!loadFromLocalStorage || typeof localStorage === 'undefined') {
      return;
    }
    
    const leftColor = [100, 200, 255];
    const rightColor = [255, 100, 100];
    localStorage.setItem('leftPaddleColor', JSON.stringify(leftColor));
    localStorage.setItem('rightPaddleColor', JSON.stringify(rightColor));
    
    const loadedLeft = loadFromLocalStorage('leftPaddleColor', GAME_CONFIG.COLORS.DEFAULT_LEFT_PADDLE);
    const loadedRight = loadFromLocalStorage('rightPaddleColor', GAME_CONFIG.COLORS.DEFAULT_RIGHT_PADDLE);
    
    expect(loadedLeft).toEqual(leftColor);
    expect(loadedRight).toEqual(rightColor);
  });
});

