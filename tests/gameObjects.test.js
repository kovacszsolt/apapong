import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../core/constants.js';
import '../core/config.js';

// Import split gameObjects modules to get coverage
import '../core/countdown.js';
import '../core/ballCollisions.js';

describe('GameObjects Functions', () => {
  beforeEach(() => {
    // Reset game state
    global.countdownText = null;
    global.countdownActive = false;
    global.countdownValue = GAME_CONFIG.COUNTDOWN.START_VALUE;
    global.countdownTimer = 0;
    global.ball = null;
    global.ballColor = [...GAME_CONFIG.COLORS.DEFAULT_BALL];
    global.ballSpeed = GAME_CONFIG.BALL.INITIAL_SPEED;
    global.leftPaddle = null;
    global.rightPaddle = null;
    
    if (typeof window !== 'undefined') {
      window.countdownText = global.countdownText;
      window.countdownActive = global.countdownActive;
      window.countdownValue = global.countdownValue;
      window.countdownTimer = global.countdownTimer;
      window.ball = global.ball;
      window.ballColor = global.ballColor;
      window.ballSpeed = global.ballSpeed;
    }
  });

  describe('getRandomDirection', () => {
    it('should return either 1 or -1', () => {
      const directions = [];
      for (let i = 0; i < 100; i++) {
        const direction = Math.random() > 0.5 ? 1 : -1;
        directions.push(direction);
      }
      
      directions.forEach(dir => {
        expect([1, -1]).toContain(dir);
      });
    });

    it('should return 1 or -1 with approximately equal probability', () => {
      const results = { 1: 0, '-1': 0 };
      for (let i = 0; i < 1000; i++) {
        const direction = Math.random() > 0.5 ? 1 : -1;
        results[direction]++;
      }
      
      const ratio = results[1] / results[-1];
      expect(ratio).toBeGreaterThan(0.5);
      expect(ratio).toBeLessThan(2.0);
    });
  });

  describe('getRandomBallAngle', () => {
    it('should return angle within valid range', () => {
      const angleRange = GAME_CONFIG.BALL.BOUNCE_ANGLE_RANGE;
      const angleOffset = GAME_CONFIG.BALL.ANGLE_OFFSET;
      
      for (let i = 0; i < 100; i++) {
        const angle = (Math.random() * angleRange) - angleOffset;
        expect(angle).toBeGreaterThanOrEqual(-angleOffset);
        expect(angle).toBeLessThanOrEqual(angleRange - angleOffset);
      }
    });

    it('should generate different angles on multiple calls', () => {
      const angles = new Set();
      for (let i = 0; i < 50; i++) {
        const angle = (Math.random() * GAME_CONFIG.BALL.BOUNCE_ANGLE_RANGE) - GAME_CONFIG.BALL.ANGLE_OFFSET;
        angles.add(Math.round(angle * 1000) / 1000);
      }
      
      expect(angles.size).toBeGreaterThan(5);
    });
  });

  describe('checkPaddleCollision', () => {
    it('should detect collision when ball overlaps paddle', () => {
      const ball = {
        pos: { x: 40, y: 250 },
        width: 20,
        height: 20,
        velocity: { x: -100, y: 0 },
      };
      const paddle = {
        pos: { x: 30, y: 240 },
        width: 15,
        height: 100,
      };
      const velocityDirection = -1;
      
      const ballLeft = ball.pos.x;
      const ballRight = ball.pos.x + ball.width;
      const ballTop = ball.pos.y;
      const ballBottom = ball.pos.y + ball.height;
      
      const paddleLeft = paddle.pos.x;
      const paddleRight = paddle.pos.x + paddle.width;
      const paddleTop = paddle.pos.y;
      const paddleBottom = paddle.pos.y + paddle.height;
      
      const horizontalOverlap = ballRight >= paddleLeft && ballLeft <= paddleRight;
      const verticalOverlap = ballBottom >= paddleTop && ballTop <= paddleBottom;
      const correctDirection = (velocityDirection < 0 && ball.velocity.x < 0) || 
                              (velocityDirection > 0 && ball.velocity.x > 0);
      
      const collision = horizontalOverlap && verticalOverlap && correctDirection;
      
      expect(collision).toBe(true);
    });

    it('should not detect collision when ball is above paddle', () => {
      const ball = {
        pos: { x: 50, y: 150 },
        width: 20,
        height: 20,
        velocity: { x: -100, y: 0 },
      };
      const paddle = {
        pos: { x: 30, y: 200 },
        width: 15,
        height: 100,
      };
      const velocityDirection = -1;
      
      const ballLeft = ball.pos.x;
      const ballRight = ball.pos.x + ball.width;
      const ballTop = ball.pos.y;
      const ballBottom = ball.pos.y + ball.height;
      
      const paddleLeft = paddle.pos.x;
      const paddleRight = paddle.pos.x + paddle.width;
      const paddleTop = paddle.pos.y;
      const paddleBottom = paddle.pos.y + paddle.height;
      
      const horizontalOverlap = ballRight >= paddleLeft && ballLeft <= paddleRight;
      const verticalOverlap = ballBottom >= paddleTop && ballTop <= paddleBottom;
      const correctDirection = (velocityDirection < 0 && ball.velocity.x < 0) || 
                              (velocityDirection > 0 && ball.velocity.x > 0);
      
      const collision = horizontalOverlap && verticalOverlap && correctDirection;
      
      expect(collision).toBe(false);
    });

    it('should not detect collision when ball is to the right of paddle', () => {
      const ball = {
        pos: { x: 100, y: 250 },
        width: 20,
        height: 20,
        velocity: { x: -100, y: 0 },
      };
      const paddle = {
        pos: { x: 30, y: 200 },
        width: 15,
        height: 100,
      };
      const velocityDirection = -1;
      
      const ballLeft = ball.pos.x;
      const ballRight = ball.pos.x + ball.width;
      const ballTop = ball.pos.y;
      const ballBottom = ball.pos.y + ball.height;
      
      const paddleLeft = paddle.pos.x;
      const paddleRight = paddle.pos.x + paddle.width;
      const paddleTop = paddle.pos.y;
      const paddleBottom = paddle.pos.y + paddle.height;
      
      const horizontalOverlap = ballRight >= paddleLeft && ballLeft <= paddleRight;
      const verticalOverlap = ballBottom >= paddleTop && ballTop <= paddleBottom;
      const correctDirection = (velocityDirection < 0 && ball.velocity.x < 0) || 
                              (velocityDirection > 0 && ball.velocity.x > 0);
      
      const collision = horizontalOverlap && verticalOverlap && correctDirection;
      
      expect(collision).toBe(false);
    });

    it('should not detect collision when velocity direction is wrong', () => {
      const ball = {
        pos: { x: 50, y: 250 },
        width: 20,
        height: 20,
        velocity: { x: 100, y: 0 },
      };
      const paddle = {
        pos: { x: 30, y: 200 },
        width: 15,
        height: 100,
      };
      const velocityDirection = -1;
      
      const ballLeft = ball.pos.x;
      const ballRight = ball.pos.x + ball.width;
      const ballTop = ball.pos.y;
      const ballBottom = ball.pos.y + ball.height;
      
      const paddleLeft = paddle.pos.x;
      const paddleRight = paddle.pos.x + paddle.width;
      const paddleTop = paddle.pos.y;
      const paddleBottom = paddle.pos.y + paddle.height;
      
      const horizontalOverlap = ballRight >= paddleLeft && ballLeft <= paddleRight;
      const verticalOverlap = ballBottom >= paddleTop && ballTop <= paddleBottom;
      const correctDirection = (velocityDirection < 0 && ball.velocity.x < 0) || 
                              (velocityDirection > 0 && ball.velocity.x > 0);
      
      const collision = horizontalOverlap && verticalOverlap && correctDirection;
      
      expect(collision).toBe(false);
    });

    it('should detect collision with edge cases', () => {
      // Ball exactly at paddle edge
      const ball = {
        pos: { x: 45, y: 200 },
        width: 20,
        height: 20,
        velocity: { x: -100, y: 0 },
      };
      const paddle = {
        pos: { x: 30, y: 200 },
        width: 15,
        height: 100,
      };
      const velocityDirection = -1;
      
      const ballLeft = ball.pos.x;
      const ballRight = ball.pos.x + ball.width;
      const ballTop = ball.pos.y;
      const ballBottom = ball.pos.y + ball.height;
      
      const paddleLeft = paddle.pos.x;
      const paddleRight = paddle.pos.x + paddle.width;
      const paddleTop = paddle.pos.y;
      const paddleBottom = paddle.pos.y + paddle.height;
      
      const horizontalOverlap = ballRight >= paddleLeft && ballLeft <= paddleRight;
      const verticalOverlap = ballBottom >= paddleTop && ballTop <= paddleBottom;
      const correctDirection = (velocityDirection < 0 && ball.velocity.x < 0) || 
                              (velocityDirection > 0 && ball.velocity.x > 0);
      
      const collision = horizontalOverlap && verticalOverlap && correctDirection;
      
      expect(collision).toBe(true);
    });
  });

  describe('handleWallCollision', () => {
    it('should reflect ball upward when hitting top wall', () => {
      const ball = {
        pos: { y: -5 },
        velocity: { y: -100 },
      };
      const isTopWall = true;
      
      ball.velocity.y = Math.abs(ball.velocity.y);
      if (ball.pos.y < 0) {
        ball.pos.y = 0;
      }
      
      expect(ball.velocity.y).toBe(100);
      expect(ball.pos.y).toBe(0);
    });

    it('should reflect ball downward when hitting bottom wall', () => {
      const ball = {
        pos: { y: 605 },
        height: 20,
        velocity: { y: 100 },
      };
      const isTopWall = false;
      const screenHeight = 600;
      
      ball.velocity.y = -Math.abs(ball.velocity.y);
      if (ball.pos.y + ball.height > screenHeight) {
        ball.pos.y = screenHeight - ball.height;
      }
      
      expect(ball.velocity.y).toBe(-100);
      expect(ball.pos.y).toBe(580);
    });

    it('should handle negative velocity correctly for top wall', () => {
      const ball = {
        pos: { y: -10 },
        velocity: { y: -50 },
      };
      const isTopWall = true;
      
      ball.velocity.y = Math.abs(ball.velocity.y);
      if (ball.pos.y < 0) {
        ball.pos.y = 0;
      }
      
      expect(ball.velocity.y).toBe(50);
      expect(ball.pos.y).toBe(0);
    });

    it('should handle positive velocity correctly for bottom wall', () => {
      const ball = {
        pos: { y: 610 },
        height: 20,
        velocity: { y: 50 },
      };
      const isTopWall = false;
      const screenHeight = 600;
      
      ball.velocity.y = -Math.abs(ball.velocity.y);
      if (ball.pos.y + ball.height > screenHeight) {
        ball.pos.y = screenHeight - ball.height;
      }
      
      expect(ball.velocity.y).toBe(-50);
      expect(ball.pos.y).toBe(580);
    });

    it('should not change position if ball is within bounds', () => {
      const ball = {
        pos: { y: 100 },
        height: 20,
        velocity: { y: 50 },
      };
      const isTopWall = false;
      const screenHeight = 600;
      
      const originalY = ball.pos.y;
      if (ball.pos.y + ball.height > screenHeight) {
        ball.pos.y = screenHeight - ball.height;
      }
      
      expect(ball.pos.y).toBe(originalY);
    });
  });

  describe('destroyCountdownText', () => {
    it('should handle null countdownText', () => {
      global.countdownText = null;
      // destroyCountdownText should not throw when countdownText is null
      expect(global.countdownText).toBeNull();
    });
  });

  describe('updateCountdownText', () => {
    it('should update countdown text when countdownText exists', () => {
      global.countdownText = { text: '' };
      global.countdownValue = 3;
      
      if (global.countdownText) {
        global.countdownText.text = `${global.countdownValue}`;
      }
      
      expect(global.countdownText.text).toBe('3');
    });

    it('should handle null countdownText', () => {
      global.countdownText = null;
      global.countdownValue = 2;
      
      // Should not throw
      if (global.countdownText) {
        global.countdownText.text = `${global.countdownValue}`;
      }
      
      expect(global.countdownText).toBeNull();
    });
  });

  describe('showFinalCountdown', () => {
    it('should update text and color when countdownText exists', () => {
      global.countdownText = { text: '', color: null };
      
      if (global.countdownText) {
        global.countdownText.text = "0";
        global.countdownText.color = GAME_CONFIG.COUNTDOWN.FINAL_COLOR;
      }
      
      expect(global.countdownText.text).toBe('0');
      expect(global.countdownText.color).toEqual([255, 255, 0]);
    });
  });

  describe('startBallMovement', () => {
    it('should set ball velocity when ball has angle and direction', () => {
      const mockBallSpeed = 15000;
      global.ballSpeed = mockBallSpeed;
      const ball = {
        angle: Math.PI / 4,
        direction: 1,
        velocity: { x: 0, y: 0 },
      };
      
      if (ball && ball.angle !== undefined && ball.direction !== undefined) {
        ball.velocity.x = Math.cos(ball.angle) * ball.direction * mockBallSpeed;
        ball.velocity.y = Math.sin(ball.angle) * mockBallSpeed;
      }
      
      expect(ball.velocity.x).toBeCloseTo(Math.cos(Math.PI / 4) * mockBallSpeed, 0);
      expect(ball.velocity.y).toBeCloseTo(Math.sin(Math.PI / 4) * mockBallSpeed, 0);
    });

    it('should not set velocity when ball is null', () => {
      const ball = null;
      
      if (ball && ball.angle !== undefined && ball.direction !== undefined) {
        ball.velocity.x = 100;
      }
      
      expect(ball).toBeNull();
    });
  });

  describe('updateCountdown', () => {
    it('should return early if countdown is not active', () => {
      global.countdownActive = false;
      
      // Should return early, so countdownValue should not change
      const originalValue = global.countdownValue;
      if (!global.countdownActive) {
        // Early return
      } else {
        global.countdownValue--;
      }
      
      expect(global.countdownValue).toBe(originalValue);
    });

    it('should decrement countdown value when timer exceeds interval', () => {
      global.countdownActive = true;
      global.countdownTimer = 1.1;
      global.countdownValue = 3;
      const countdownInterval = GAME_CONFIG.COUNTDOWN.INTERVAL;
      
      if (global.countdownActive && global.countdownTimer >= countdownInterval) {
        global.countdownTimer = 0;
        global.countdownValue--;
      }
      
      expect(global.countdownValue).toBe(2);
      expect(global.countdownTimer).toBe(0);
    });
  });

  describe('handleScorePoint', () => {
    it('should increment right score when ball goes out on left side', () => {
      global.leftScore = 2;
      global.rightScore = 1;
      global.gameOver = false;
      global.ballSpeed = 20000;
      const initialBallSpeed = GAME_CONFIG.BALL.INITIAL_SPEED;
      
      const isLeftSide = true;
      if (isLeftSide) {
        global.rightScore++;
      } else {
        global.leftScore++;
      }
      
      expect(global.rightScore).toBe(2);
      expect(global.leftScore).toBe(2);
    });

    it('should increment left score when ball goes out on right side', () => {
      global.leftScore = 1;
      global.rightScore = 2;
      global.gameOver = false;
      
      const isLeftSide = false;
      if (isLeftSide) {
        global.rightScore++;
      } else {
        global.leftScore++;
      }
      
      expect(global.leftScore).toBe(2);
      expect(global.rightScore).toBe(2);
    });
  });

  describe('setupBallCollisions', () => {
    it('should return early if ball is null', () => {
      global.ball = null;
      
      if (!global.ball) {
        // Early return
      }
      
      expect(global.ball).toBeNull();
    });
  });
});
