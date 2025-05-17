import preventBackwardsMovement from '../preventBackwardsMovement.js';

describe('preventBackwardsMovement', () => {
  test('should prevent moving left when neck is left of head', () => {
    const gameState = {
      you: {
        body: [
          { x: 1, y: 0 }, // head
          { x: 0, y: 0 }  // neck (left of head)
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventBackwardsMovement(gameState, isMoveSafe);
    
    expect(result.left).toBe(false);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });
  
  test('should prevent moving right when neck is right of head', () => {
    const gameState = {
      you: {
        body: [
          { x: 0, y: 0 }, // head
          { x: 1, y: 0 }  // neck (right of head)
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventBackwardsMovement(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(false);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });
  
  test('should prevent moving down when neck is below head', () => {
    const gameState = {
      you: {
        body: [
          { x: 0, y: 1 }, // head
          { x: 0, y: 0 }  // neck (below head)
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventBackwardsMovement(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(false);
  });
  
  test('should prevent moving up when neck is above head', () => {
    const gameState = {
      you: {
        body: [
          { x: 0, y: 0 }, // head
          { x: 0, y: 1 }  // neck (above head)
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventBackwardsMovement(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(false);
    expect(result.down).toBe(true);
  });
  
  test('should not modify isMoveSafe when movement is already unsafe', () => {
    const gameState = {
      you: {
        body: [
          { x: 1, y: 0 }, // head
          { x: 0, y: 0 }  // neck (left of head)
        ]
      }
    };
    
    const isMoveSafe = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    
    const result = preventBackwardsMovement(gameState, isMoveSafe);
    
    expect(result.left).toBe(false);
    expect(result.right).toBe(false);
    expect(result.up).toBe(false);
    expect(result.down).toBe(false);
  });
});