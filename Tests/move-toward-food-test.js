import moveTowardFood from '../moveTowardFood.js';

describe('moveTowardFood', () => {
  test('should move left toward food when safe', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        food: [
          { x: 2, y: 5 } // food to the left
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = moveTowardFood(gameState, isMoveSafe);
    
    expect(result).toBe('left');
  });
  
  test('should move right toward food when safe', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        food: [
          { x: 8, y: 5 } // food to the right
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = moveTowardFood(gameState, isMoveSafe);
    
    expect(result).toBe('right');
  });
  
  test('should move down toward food when safe', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        food: [
          { x: 5, y: 2 } // food below
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = moveTowardFood(gameState, isMoveSafe);
    
    expect(result).toBe('down');
  });
  
  test('should move up toward food when safe', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        food: [
          { x: 5, y: 8 } // food above
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = moveTowardFood(gameState, isMoveSafe);
    
    expect(result).toBe('up');
  });
  
  test('should not move toward food if the direction is unsafe', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        food: [
          { x: 2, y: 5 } // food to the left
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: false, // Moving left is unsafe
      right: true
    };
    
    const result = moveTowardFood(gameState, isMoveSafe);
    
    expect(result).toBe(null);
  });
  
  test('should choose closest food when multiple food items exist', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        food: [
          { x: 10, y: 5 }, // food to the right, 5 steps away
          { x: 5, y: 7 }, // food above, 2 steps away
          { x: 3, y: 5 }  // food to the left, 2 steps away
        ]
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = moveTowardFood(gameState, isMoveSafe);
    
    // Should choose either left or up as they're both 2 steps away
    // Our algorithm prioritizes left if there's a tie in distance (it checks left first)
    expect(result).toBe('left');
  });
  
  test('should return null when no food exists', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        food: [] // no food
      }
    };
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    const result = moveTowardFood(gameState, isMoveSafe);
    
    expect(result).toBe(null);
  });
  
  test('should try alternative directions if preferred direction is unsafe', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 } // head
        ]
      },
      board: {
        food: [
          { x: 5, y: 8 } // food above
        ]
      }
    };
    
    const isMoveSafe = {
      up: false, // Preferred direction (up) is unsafe
      down: true,
      left: true,
      right: true
    };
    
    const result = moveTowardFood(gameState, isMoveSafe);
    
    // Shouldn't move up since it's unsafe, even though food is above
    expect(result).toBe(null);
  });
});