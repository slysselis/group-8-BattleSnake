import preventBorderCollision from '../preventBorderCollision.js';

describe('preventBorderCollision', () => {
  test('should prevent moving left when at left border', () => {
    const gameState = {
      board: {
        width: 11,
        height: 11
      },
      you: {
        body: [
          { x: 0, y: 5 } // head at left border
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventBorderCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(false);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });
  
  test('should prevent moving right when at right border', () => {
    const gameState = {
      board: {
        width: 11,
        height: 11
      },
      you: {
        body: [
          { x: 10, y: 5 } // head at right border (width - 1)
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventBorderCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(false);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });
  
  test('should prevent moving down when at bottom border', () => {
    const gameState = {
      board: {
        width: 11,
        height: 11
      },
      you: {
        body: [
          { x: 5, y: 0 } // head at bottom border
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventBorderCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(false);
  });
  
  test('should prevent moving up when at top border', () => {
    const gameState = {
      board: {
        width: 11,
        height: 11
      },
      you: {
        body: [
          { x: 5, y: 10 } // head at top border (height - 1)
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventBorderCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(false);
    expect(result.down).toBe(true);
  });
  
  test('should not modify isMoveSafe for non-border positions', () => {
    const gameState = {
      board: {
        width: 11,
        height: 11
      },
      you: {
        body: [
          { x: 5, y: 5 } // head in middle of board
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventBorderCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });
  
  test('should handle multiple border cases', () => {
    const gameState = {
      board: {
        width: 11,
        height: 11
      },
      you: {
        body: [
          { x: 0, y: 0 } // head at corner (left and bottom border)
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventBorderCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(false);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(false);
  });
});