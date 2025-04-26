
// move is called on every turn and returns your next move
// Valid moves are "up", "down", "left", or "right"
// See https://docs.battlesnake.com/api/example-move for available data
function move(gameState) {

  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true
  };

  // We've included code to prevent your Battlesnake from moving backwards
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
    isMoveSafe.left = false;

  } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
    isMoveSafe.right = false;

  } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
    isMoveSafe.down = false;

  } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
    isMoveSafe.up = false;
  }

  // Move towards the closest food if possible
  if (food.length > 0) {
    let closestFood = food.reduce((closest, current) => {
      let closestDist = Math.abs(closest.x - myHead.x) + Math.abs(closest.y - myHead.y);
      let currentDist = Math.abs(current.x - myHead.x) + Math.abs(current.y - myHead.y);
      return currentDist < closestDist ? current : closest;
    });

    if (closestFood.x < myHead.x && isMoveSafe.left) return { move: "left" };
    if (closestFood.x > myHead.x && isMoveSafe.right) return { move: "right" };
    if (closestFood.y < myHead.y && isMoveSafe.down) return { move: "down" };
    if (closestFood.y > myHead.y && isMoveSafe.up) return { move: "up" };
  }
