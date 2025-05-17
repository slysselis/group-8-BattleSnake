import { jest } from '@jest/globals';

// Mock all the imported functions
jest.mock('../preventBackwardsMovement.js', () => jest.fn());
jest.mock('../preventBorderCollision.js', () => jest.fn());
jest.mock('../preventSelfCollision.js', () => jest.fn());
jest.mock('../preventSnakeCollision.js', () => jest.fn());
jest.mock('../headToHead.js', () => jest.fn());
jest.mock('../moveTowardFood.js', () => jest.fn());
jest.mock('../server.js', () => jest.fn());

// Import after mocking
import preventBackwardsMovement from '../preventBackwardsMovement.js';
import preventBorderCollision from '../preventBorderCollision.js';
import preventSelfCollision from '../preventSelfCollision.js';
import preventSnakeCollision from '../preventSnakeCollision.js';
import headToHead from '../headToHead.js';
import moveTowardFood from '../moveTowardFood.js';
import runServer from '../server.js';

// Import the function we're testing (needs to be imported with full path due to mocking)
import * as index from '../index.js';

describe('Index module functions', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset console.log to prevent test output pollution
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  
  describe('info function', () => {
    test('should return correct snake info', () => {
      const info = index.info();
      
      expect(info).toEqual({
        apiversion: "1",
        author: "Sokos",
        color: "#0f0e42",
        head: "cosmic-horror",
        tail: "hook",
      });
    });
  });
  
  describe('start function', () => {
    test('should log game start', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      index.start({});
      
      expect(consoleSpy).toHaveBeenCalledWith('GAME START');
    });
  });
  
  describe('end function', () => {
    test('should log game over', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      index.end({});
      
      expect(consoleSpy).toHaveBeenCalledWith('GAME OVER\n');
    });
  });
  
  describe('move function', () => {
    test('should call all safety check functions', () => {
      const gameState = {
        turn: 1,
        you: { body: [{ x: 5, y: 5 }] },
        board: { food: [] }
      };
      
      // Setup return values for mocked functions
      const safeMoves = { up: true, down: true, left: true, right: true };
      preventBackwardsMovement.mockReturnValue(safeMoves);
      preventBorderCollision.mockReturnValue(safeMoves);
      preventSelfCollision.mockReturnValue(safeMoves);
      preventSnakeCollision.mockReturnValue(safeMoves);
      headToHead.mockReturnValue(safeMoves);
      moveTowardFood.mockReturnValue(null); // No food move available
      
      // Mock Math.random to make the test deterministic
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.5; // Will select the 2nd safe move
      global.Math = mockMath;
      
      index.move(gameState);
      
      // Verify all safety functions were called
      expect(preventBackwardsMovement).toHaveBeenCalledWith(gameState, expect.any(Object));
      expect(preventBorderCollision).toHaveBeenCalledWith(gameState, expect.any(Object));
      expect(preventSelfCollision).toHaveBeenCalledWith(gameState, expect.any(Object));
      expect(preventSnakeCollision).toHaveBeenCalledWith(gameState, expect.any(Object));
      expect(headToHead).toHaveBeenCalledWith(gameState, expect.any(Object));
      expect(moveTowardFood).toHaveBeenCalledWith(gameState, expect.any(Object));
    });
    
    test('should move toward food when available', () => {
      const gameState = {
        turn: 1,
        you: { body: [{ x: 5, y: 5 }] },
        board: { food: [{ x: 5, y: 8 }] }
      };
      
      // Setup return values for mocked functions
      const safeMoves = { up: true, down: true, left: true, right: true };
      preventBackwardsMovement.mockReturnValue(safeMoves);
      preventBorderCollision.mockReturnValue(safeMoves);
      preventSelfCollision.mockReturnValue(safeMoves);
      preventSnakeCollision.mockReturnValue(safeMoves);
      headToHead.mockReturnValue(safeMoves);
      moveTowardFood.mockReturnValue('up'); // Food is above
      
      const result = index.move(gameState);
      
      expect(result).toEqual({ move: 'up' });
    });
    
    test('should choose random safe move when no food move is available', () => {
      const gameState = {
        turn: 1,
        you: { body: [{ x: 5, y: 5 }] },
        board: { food: [] }
      };
      
      // Setup return values for mocked functions
      const safeMoves = { up: true, down: true, left: false, right: false };
      preventBackwardsMovement.mockReturnValue(safeMoves);
      preventBorderCollision.mockReturnValue(safeMoves);
      preventSelfCollision.mockReturnValue(safeMoves);
      preventSnakeCollision.mockReturnValue(safeMoves);
      headToHead.mockReturnValue(safeMoves);
      moveTowardFood.mockReturnValue(null); // No food move available
      
      // Mock Math.random to make the test deterministic
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0; // Will select the 1st safe move (up)
      global.Math = mockMath;
      
      const result = index.move(gameState);
      
      expect(result).toEqual({ move: 'up' });
    });
    
    test('should default to move down when no safe moves available', () => {
      const gameState = {
        turn: 1,
        you: { body: [{ x: 5, y: 5 }] },
        board: { food: [] }
      };
      
      // Setup return values for mocked functions - no safe moves
      const noSafeMoves = { up: false, down: false, left: false, right: false };
      preventBackwardsMovement.mockReturnValue(noSafeMoves);
      preventBorderCollision.mockReturnValue(noSafeMoves);
      preventSelfCollision.mockReturnValue(noSafeMoves);
      preventSnakeCollision.mockReturnValue(noSafeMoves);
      headToHead.mockReturnValue(noSafeMoves);
      moveTowardFood.mockReturnValue(null); // No food move available
      
      const result = index.move(gameState);
      
      expect(result).toEqual({ move: 'down' });
    });
  });
});