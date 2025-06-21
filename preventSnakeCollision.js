// Function to prevent collisions with other snakes on the board
function preventSnakeCollision(gameState, isMoveSafe) {
  // Get current head position
  const myHead = gameState.you.body[0];
  // Get array of all snakes on the board (including our own)
  const opponents = gameState.board.snakes;

  // Prevent collisions with other snakes
  opponents.forEach(snake => {
    // Skip checking our own snake (we handle self-collision elsewhere)
    if (snake.id === gameState.you.id) {
      return;
    }

    // Check each segment of opponent snakes
    snake.body.forEach(segment => {
      // Check if moving left would hit this opponent segment
      if (segment.x === myHead.x - 1 && segment.y === myHead.y) {
        isMoveSafe.left = false;
      }
      // Check if moving right would hit this opponent segment
      if (segment.x === myHead.x + 1 && segment.y === myHead.y) {
        isMoveSafe.right = false;
      }
      // Check if moving down would hit this opponent segment
      if (segment.y === myHead.y - 1 && segment.x === myHead.x) {
        isMoveSafe.down = false;
      }
      // Check if moving up would hit this opponent segment
      if (segment.y === myHead.y + 1 && segment.x === myHead.x) {
        isMoveSafe.up = false;
      }
    });
  });

  // Return the updated move safety object
  return isMoveSafe;
}

// Export the function as the default export for use in other modules
export default preventSnakeCollision;