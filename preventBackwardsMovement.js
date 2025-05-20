function preventBackwardsMovement(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
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

  return isMoveSafe;
}

export default preventBackwardsMovement;