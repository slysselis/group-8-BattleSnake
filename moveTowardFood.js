function moveTowardFood(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const food = gameState.board.food;

  // If there's food, try to move toward the closest piece
  if (food.length > 0) {
    // Find the closest food
    let closestFood = food.reduce((closest, current) => {
      let closestDist = Math.abs(closest.x - myHead.x) + Math.abs(closest.y - myHead.y);
      let currentDist = Math.abs(current.x - myHead.x) + Math.abs(current.y - myHead.y);
      return currentDist < closestDist ? current : closest;
    });

    // Try to move toward the closest food if it's safe
    if (closestFood.x < myHead.x && isMoveSafe.left) {
      return "left";
    }
    if (closestFood.x > myHead.x && isMoveSafe.right) {
      return "right";
    }
    if (closestFood.y < myHead.y && isMoveSafe.down) {
      return "down";
    }
    if (closestFood.y > myHead.y && isMoveSafe.up) {
      return "up";
    }
  }

  // If we couldn't move toward food, return null
  return null;
}

export default moveTowardFood;
