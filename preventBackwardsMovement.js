// Function to prevent the snake from moving backwards into its own neck
function preventBackwardsMovement(gameState, isMoveSafe) {
  // Get the current head position (first element of body array)
  const myHead = gameState.you.body[0];
  // Get the neck position (second element of body array)
  const myNeck = gameState.you.body[1];

  // Prevent the snake from moving backwards
  if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
    isMoveSafe.left = false;
  } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
    isMoveSafe.right = false;
  } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
    isMoveSafe.down = false;
  } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
    isMoveSafe.up = false;
  }

  // Return the updated move safety object
  return isMoveSafe;
}

// Export the function as the default export for use in other modules
export default preventBackwardsMovement;