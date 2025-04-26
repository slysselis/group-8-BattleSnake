function avoidHeadToHead(gameState, isMoveSafe) {
    const myHead = gameState.you.body[0];
    const myLength = gameState.you.length;
    const opponents = gameState.board.snakes.filter(snake => snake.id !== gameState.you.id);
  
    // Check each opponent
    opponents.forEach(snake => {
      const enemyHead = snake.body[0];
      const enemyLength = snake.length;
  
      // Predict where the enemy head might move
      const enemyMoves = [
        { x: enemyHead.x + 1, y: enemyHead.y },
        { x: enemyHead.x - 1, y: enemyHead.y },
        { x: enemyHead.x, y: enemyHead.y + 1 },
        { x: enemyHead.x, y: enemyHead.y - 1 }
      ];
  
      // Avoid head-to-head collision with bigger or same-length snakes
      enemyMoves.forEach(move => {
        if (enemyLength >= myLength) { // Only avoid if enemy is bigger or equal in length
          if (move.x === myHead.x && move.y === myHead.y + 1) {
            isMoveSafe.up = false;
          }
          if (move.x === myHead.x && move.y === myHead.y - 1) {
            isMoveSafe.down = false;
          }
          if (move.x === myHead.x - 1 && move.y === myHead.y) {
            isMoveSafe.left = false;
          }
          if (move.x === myHead.x + 1 && move.y === myHead.y) {
            isMoveSafe.right = false;
          }
        }
      });
    });
  
    return isMoveSafe;
  }
  