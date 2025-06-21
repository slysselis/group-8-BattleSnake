// Function to prevent the snake from colliding with board boundaries
function preventBorderCollision(gameState, isMoveSafe) {
  // Extract board dimensions from game state
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;
  // Get current head position
  const myHead = gameState.you.body[0];

  // Prevent collisions with the border
  // Check if at left edge (x = 0), prevent moving further left
  if (myHead.x === 0) {
    isMoveSafe.left = false;
  }
  // Check if at right edge (x = width-1), prevent moving further right
  if (myHead.x === boardWidth - 1) {
    isMoveSafe.right = false;
  }
  // Check if at bottom edge (y = 0), prevent moving further down
  if (myHead.y === 0) {
    isMoveSafe.down = false;
  }
  // Check if at top edge (y = height-1), prevent moving further up
  if (myHead.y === boardHeight - 1) {
    isMoveSafe.up = false;
  }

  // Return the updated move safety object
  return isMoveSafe;
}

// Export the function as the default export for use in other modules
export default preventBorderCollision;