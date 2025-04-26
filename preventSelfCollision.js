function preventSelfCollision(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const myBody = gameState.you.body;

  // Prevent self-collision by checking each body segment
  myBody.forEach(segment => {
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

  return isMoveSafe;
}

export default preventSelfCollision;