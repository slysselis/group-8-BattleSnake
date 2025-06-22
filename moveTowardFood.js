// Function to determine the best move toward the closest food
function moveTowardFood(gameState, isMoveSafe) {
  // Get current head position
  const myHead = gameState.you.body[0];
  // Get array of all food items on the board
  const food = gameState.board.food;

  // If there's food, try to move toward the closest piece
  if (food.length > 0) {
    // Find the closest food using Manhattan distance (|x1-x2| + |y1-y2|)
    let closestFood = food.reduce((closest, current) => {
      // Calculate Manhattan distance to the current closest food
      let closestDist = Math.abs(closest.x - myHead.x) + Math.abs(closest.y - myHead.y);
      // Calculate Manhattan distance to the current food being evaluated
      let currentDist = Math.abs(current.x - myHead.x) + Math.abs(current.y - myHead.y);
      // Return whichever food is closer
      return currentDist < closestDist ? current : closest;
    });

    // Try to move toward the closest food if it's safe
    // Check if food is to the left and left move is safe
    if (closestFood.x < myHead.x && isMoveSafe.left) {
      return "left";
    }
    // Check if food is to the right and right move is safe
    if (closestFood.x > myHead.x && isMoveSafe.right) {
      return "right";
    }
    // Check if food is below and down move is safe
    if (closestFood.y < myHead.y && isMoveSafe.down) {
      return "down";
    }
    // Check if food is above and up move is safe
    if (closestFood.y > myHead.y && isMoveSafe.up) {
      return "up";
    }
  }

  // If we couldn't move toward food, return null
  return null;
}

// Export the function as the default export for use in other modules
export default moveTowardFood;