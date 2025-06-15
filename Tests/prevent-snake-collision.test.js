import preventSnakeCollision from '../preventSnakeCollision.js';

describe('preventSnakeCollision', () => {
  test('should prevent moving left when opponent snake is to the left', () => {
    const gameState = {
      you: {
        id: 'my-snake-id',
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        snakes: [
          {
            id: 'my-snake-id',
            body: [
              { x: 5, y: 5 } // my snake head
            ]
          },
          {
            id: 'opponent-snake-id',
            body: [
              { x: 3, y: 5 }, // opponent head (not adjacent)
              { x: 4, y: 5 }, // opponent body (adjacent to my head on left)
              { x: 5, y: 5 }  // this shouldn't happen in a real game, but testing behavior
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
    
    const result = preventSnakeCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(false);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });
  
  test('should prevent moving right when opponent snake is to the right', () => {
    const gameState = {
      you: {
        id: 'my-snake-id',
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        snakes: [
          {
            id: 'my-snake-id',
            body: [
              { x: 5, y: 5 } // my snake head
            ]
          },
          {
            id: 'opponent-snake-id',
            body: [
              { x: 7, y: 5 }, // opponent head (not adjacent)
              { x: 6, y: 5 }  // opponent body (adjacent to my head on right)
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
    
    const result = preventSnakeCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(false);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });
  
  test('should prevent moving down when opponent snake is below', () => {
    const gameState = {
      you: {
        id: 'my-snake-id',
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        snakes: [
          {
            id: 'my-snake-id',
            body: [
              { x: 5, y: 5 } // my snake head
            ]
          },
          {
            id: 'opponent-snake-id',
            body: [
              { x: 5, y: 3 }, // opponent head (not adjacent)
              { x: 5, y: 4 }  // opponent body (adjacent to my head below)
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
    
    const result = preventSnakeCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(false);
  });
  
  test('should prevent moving up when opponent snake is above', () => {
    const gameState = {
      you: {
        id: 'my-snake-id',
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        snakes: [
          {
            id: 'my-snake-id',
            body: [
              { x: 5, y: 5 } // my snake head
            ]
          },
          {
            id: 'opponent-snake-id',
            body: [
              { x: 5, y: 7 }, // opponent head (not adjacent)
              { x: 5, y: 6 }  // opponent body (adjacent to my head above)
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
    
    const result = preventSnakeCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(false);
    expect(result.down).toBe(true);
  });
  
  test('should not modify isMoveSafe when no opponent snake collision detected', () => {
    const gameState = {
      you: {
        id: 'my-snake-id',
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        snakes: [
          {
            id: 'my-snake-id',
            body: [
              { x: 5, y: 5 } // my snake head
            ]
          },
          {
            id: 'opponent-snake-id',
            body: [
              { x: 8, y: 8 }, // opponent head (not adjacent)
              { x: 8, y: 7 }  // opponent body (not adjacent)
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
    
    const result = preventSnakeCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });
  
  test('should prevent multiple moves when opponents are in multiple directions', () => {
    const gameState = {
      you: {
        id: 'my-snake-id',
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        snakes: [
          {
            id: 'my-snake-id',
            body: [
              { x: 5, y: 5 } // my snake head
            ]
          },
          {
            id: 'opponent-1',
            body: [
              { x: 3, y: 5 }, // opponent head (not adjacent)
              { x: 4, y: 5 }  // opponent body (adjacent to my head on left)
            ]
          },
          {
            id: 'opponent-2',
            body: [
              { x: 5, y: 7 }, // opponent head (not adjacent)
              { x: 5, y: 6 }  // opponent body (adjacent to my head above)
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
    
    const result = preventSnakeCollision(gameState, isMoveSafe);
    
    expect(result.left).toBe(false);
    expect(result.right).toBe(true);
    expect(result.up).toBe(false);
    expect(result.down).toBe(true);
  });
  
  test('should ignore own snake segments', () => {
    const gameState = {
      you: {
        id: 'my-snake-id',
        body: [
          { x: 5, y: 5 }, // head
          { x: 6, y: 5 }, // neck
          { x: 6, y: 4 }  // tail
        ]
      },
      board: {
        snakes: [
          {
            id: 'my-snake-id',
            body: [
              { x: 5, y: 5 }, // head
              { x: 6, y: 5 }, // neck
              { x: 6, y: 4 }  // tail
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
    
    const result = preventSnakeCollision(gameState, isMoveSafe);
    
    // No changes since we skip our own snake
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });
});
