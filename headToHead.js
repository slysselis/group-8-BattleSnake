// Prevents head-to-head collisions with equal or larger opponent snakes
function avoidHeadToHead(gameState, isMoveSafe) {
    const myHead = gameState.you.body[0]; // Current snake head position
    const myLength = gameState.you.length; // Current snake length
    const opponents = gameState.board.snakes.filter(snake => snake.id !== gameState.you.id); // All enemy snakes
  
    // Check each opponent snake for potential head-to-head collision
    opponents.forEach(snake => {
      const enemyHead = snake.body[0]; // Enemy snake head position
      const enemyLength = snake.length; // Enemy snake length
  
      // Predict where the enemy head might move next turn
      const enemyMoves = [
        { x: enemyHead.x + 1, y: enemyHead.y }, // Enemy moves right
        { x: enemyHead.x - 1, y: enemyHead.y }, // Enemy moves left
        { x: enemyHead.x, y: enemyHead.y + 1 }, // Enemy moves up
        { x: enemyHead.x, y: enemyHead.y - 1 }  // Enemy moves down
      ];
  
      // Avoid head-to-head collision with bigger or same-length snakes
      enemyMoves.forEach(move => {
        if (enemyLength >= myLength) { // Only avoid if enemy is bigger or equal in length
          // Check if enemy's predicted move collides with our possible moves
          if (move.x === myHead.x && move.y === myHead.y + 1) {
            isMoveSafe.up = false; // Don't move up if enemy might move there
          }
          if (move.x === myHead.x && move.y === myHead.y - 1) {
            isMoveSafe.down = false; // Don't move down if enemy might move there
          }
          if (move.x === myHead.x - 1 && move.y === myHead.y) {
            isMoveSafe.left = false; // Don't move left if enemy might move there
          }
          if (move.x === myHead.x + 1 && move.y === myHead.y) {
            isMoveSafe.right = false; // Don't move right if enemy might move there
          }
        }
      });
    });
  
    return isMoveSafe;
}

export default avoidHeadToHead;