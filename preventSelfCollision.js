// Function to prevent the snake from colliding with its own body
function preventSelfCollision(gameState, isMoveSafe) {
  // Get current head position
  const myHead = gameState.you.body[0];
  // Get the entire body array (includes head, neck, and all segments)
  const myBody = gameState.you.body;

  // Prevent self-collision by checking each body segment
  myBody.forEach(segment => {
    // Check if moving left would hit this body segment
    if (segment.x === myHead.x - 1 && segment.y === myHead.y) {
      isMoveSafe.left = false;
    }
    // Check if moving right would hit this body segment
    if (segment.x === myHead.x + 1 && segment.y === myHead.y) {
      isMoveSafe.right = false;
    }
    // Check if moving down would hit this body segment
    if (segment.y === myHead.y - 1 && segment.x === myHead.x) {
      isMoveSafe.down = false;
    }
    // Check if moving up would hit this body segment
    if (segment.y === myHead.y + 1 && segment.x === myHead.x) {
      isMoveSafe.up = false;
    }
  });

  // Return the updated move safety object
  return isMoveSafe;
}

// Export the function as the default export for use in other modules
export default preventSelfCollision;