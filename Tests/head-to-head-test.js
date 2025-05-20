import avoidHeadToHead from '../headToHead.js';

describe('avoidHeadToHead', () => {
  test('should avoid potential head-to-head with larger enemy snake moving up', () => {
    const gameState = {
      you: {
        id: 'my-snake-id',
        length: 5,
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        snakes: [
          {
            id: 'my-snake-id',
            length: 5,
            body: [
              { x: 5, y: 5 } // my snake head
            ]
          },
          {
            id: 'opponent-snake-id',
            length: 7, // larger snake
            body: [
              { x: 5, y: 7 }, // opponent head (can potentially move down to y:6)
              { x: 6, y: 7 },
              { x: 6, y: 6 }
            ]
          }
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = avoidHeadToHead(gameState, isMoveSafe);
    
    // Moving up would create head-to-head with larger snake
    expect(result.up).toBe(false);
    expect(result.down).toBe(true);
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
  });
  
  test('should avoid potential head-to-head with equal-sized enemy snake moving right', () => {
    const gameState = {
      you: {
        id: 'my-snake-id',
        length: 5,
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        snakes: [
          {
            id: 'my-snake-id',
            length: 5,
            body: [
              { x: 5, y: 5 } // my snake head
            ]
          },
          {
            id: 'opponent-snake-id',
            length: 5, // equal size
            body: [
              { x: 7, y: 5 }, // opponent head (can potentially move left to x:6)
              { x: 8, y: 5 },
              { x: 8, y: 4 }
            ]
          }
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = avoidHeadToHead(gameState, isMoveSafe);
    
    // Moving right would create head-to-head with equal-sized snake
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
    expect(result.left).toBe(true);
    expect(result.right).toBe(false);
  });
  
  test('should not avoid head-to-head with smaller enemy snake', () => {
    const gameState = {
      you: {
        id: 'my-snake-id',
        length: 7,
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        snakes: [
          {
            id: 'my-snake-id',
            length: 7,
            body: [
              { x: 5, y: 5 } // my snake head
            ]
          },
          {
            id: 'opponent-snake-id',
            length: 3, // smaller snake
            body: [
              { x: 3, y: 5 }, // opponent head (can potentially move right to x:4)
              { x: 2, y: 5 },
              { x: 1, y: 5 }
            ]
          }
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = avoidHeadToHead(gameState, isMoveSafe);
    
    // No need to avoid smaller snake
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
    expect(result.left).toBe(true); // Still safe to go left
    expect(result.right).toBe(true);
  });
  
  test('should handle multiple potential head-to-head scenarios', () => {
    const gameState = {
      you: {
        id: 'my-snake-id',
        length: 5,
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        snakes: [
          {
            id: 'my-snake-id',
            length: 5,
            body: [
              { x: 5, y: 5 } // my snake head
            ]
          },
          {
            id: 'opponent-1',
            length: 6, // larger snake
            body: [
              { x: 7, y: 5 }, // can move left
              { x: 8, y: 5 }
            ]
          },
          {
            id: 'opponent-2',
            length: 8, // larger snake
            body: [
              { x: 5, y: 3 }, // can move up
              { x: 5, y: 2 }
            ]
          }
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = avoidHeadToHead(gameState, isMoveSafe);
    
    // Avoid both potential head-to-head collisions
    expect(result.up).toBe(true);
    expect(result.down).toBe(false); // Moving down risks head-to-head with opponent-2
    expect(result.left).toBe(true);
    expect(result.right).toBe(false); // Moving right risks head-to-head with opponent-1
  });
  
  test('should not modify already unsafe moves', () => {
    const gameState = {
      you: {
        id: 'my-snake-id',
        length: 5,
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        snakes: [
          {
            id: 'my-snake-id',
            length: 5,
            body: [
              { x: 5, y: 5 } // my snake head
            ]
          },
          {
            id: 'opponent-snake-id',
            length: 7, // larger snake
            body: [
              { x: 7, y: 5 }, // opponent head (can potentially move left to x:6)
              { x: 8, y: 5 }
            ]
          }
        ]
      }
    };
    
    const isMoveSafe = {
      up: false, // Already unsafe for other reasons
      down: false, // Already unsafe for other reasons
      left: true,
      right: true
    };
    
    const result = avoidHeadToHead(gameState, isMoveSafe);
    
    expect(result.up).toBe(false); // Still unsafe
    expect(result.down).toBe(false); // Still unsafe
    expect(result.left).toBe(true);
    expect(result.right).toBe(false); // Now unsafe due to head-to-head
  });
});