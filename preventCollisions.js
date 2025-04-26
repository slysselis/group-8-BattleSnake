  // Prevent self-collision
  myBody.forEach(segment => {
    if (segment.x === myHead.x - 1 && segment.y === myHead.y) isMoveSafe.left = false;
    if (segment.x === myHead.x + 1 && segment.y === myHead.y) isMoveSafe.right = false;
    if (segment.y === myHead.y - 1 && segment.x === myHead.x) isMoveSafe.down = false;
    if (segment.y === myHead.y + 1 && segment.x === myHead.x) isMoveSafe.up = false;
  });

  // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
  // opponents = gameState.board.snakes;

  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Choose a random move from the safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
