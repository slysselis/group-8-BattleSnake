import preventSelfCollision from '../preventSelfCollision.js';

describe('preventSelfCollision', () => {
  test('should prevent moving left when body segment is to the left', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 }, // head
          { x: 6, y: 5 }, // neck
          { x: 6, y: 6 },
          { x: 5, y: 6 },
          { x: 4, y: 6 },
          { x: 4, y: 5 }  // body segment to the left of head
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventSelfCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(false);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });
  
  test('should prevent moving right when body segment is to the right', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 }, // head
          { x: 4, y: 5 }, // neck
          { x: 4, y: 4 },
          { x: 5, y: 4 },
          { x: 6, y: 4 },
          { x: 6, y: 5 }  // body segment to the right of head
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventSelfCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(false);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });
  
  test('should prevent moving down when body segment is below', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 }, // head
          { x: 5, y: 6 }, // neck
          { x: 6, y: 6 },
          { x: 6, y: 5 },
          { x: 6, y: 4 },
          { x: 5, y: 4 }  // body segment below head
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventSelfCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(false);
  });
  
  test('should prevent moving up when body segment is above', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 }, // head
          { x: 5, y: 4 }, // neck
          { x: 4, y: 4 },
          { x: 4, y: 5 },
          { x: 4, y: 6 },
          { x: 5, y: 6 }  // body segment above head
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventSelfCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(false);
    expect(result.down).toBe(true);
  });
  
  test('should not modify isMoveSafe when no self-collision detected', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 }, // head
          { x: 5, y: 4 }, // neck
          { x: 4, y: 4 },
          { x: 3, y: 4 }  // no body segments adjacent to head
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventSelfCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });
  
  test('should prevent multiple moves when body segments are in multiple directions', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 }, // head
          { x: 6, y: 5 }, // neck
          { x: 7, y: 5 },
          { x: 7, y: 4 },
          { x: 6, y: 4 },
          { x: 5, y: 4 }, // body segment below head
          { x: 4, y: 4 },
          { x: 4, y: 5 }  // body segment to the left of head
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = preventSelfCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(false);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(false);
  });
});
