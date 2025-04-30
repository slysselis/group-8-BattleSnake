function preventSnakeCollision(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const opponents = gameState.board.snakes;

  // Prevent collisions with other snakes
  opponents.forEach(snake => {
    // Skip checking our own snake
    if (snake.id === gameState.you.id) {
      return;
    }

    // Check each segment of opponent snakes
    snake.body.forEach(segment => {
      if (segment.x === myHead.x - 1 && segment.y === myHead.y) {
        isMoveSafe.left = false;
      }
      if (segment.x === myHead.x + 1 && segment.y === myHead.y) {
        isMoveSafe.right = false;
      }
      if (segment.y === myHead.y - 1 && segment.x === myHead.x) {
        isMoveSafe.down = false;
      }
      if (segment.y === myHead.y + 1 && segment.x === myHead.x) {
        isMoveSafe.up = false;
      }
    });
  });

  return isMoveSafe;
}

export default preventSnakeCollision;