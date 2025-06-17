
function aStarToFood(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const food = gameState.board.food;
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  if (food.length === 0) {
    return null;
  }

  // Create board representation
  const board = createBoard(gameState, boardWidth, boardHeight);

  // Find closest reachable food using A*
  let bestPath = null;
  let shortestDistance = Infinity;

  for (const foodItem of food) {
    const path = aStar(board, myHead, foodItem, boardWidth, boardHeight);
    if (path && path.length < shortestDistance) {
      shortestDistance = path.length;
      bestPath = path;
    }
  }

  if (!bestPath || bestPath.length < 2) {
    return null;
  }

  // Get the first move from the path
  const nextPosition = bestPath[1]; // bestPath[0] is current head position
  const move = getDirectionFromPositions(myHead, nextPosition);

  // Only return the move if it's considered safe by our existing logic
  return isMoveSafe[move] ? move : null;
}

function createBoard(gameState, width, height) {
  // Create empty board
  const board = Array.from({ length: height }, () => Array(width).fill(0));

  // Mark snake bodies as obstacles (cost = Infinity)
  gameState.board.snakes.forEach(snake => {
    snake.body.forEach((segment, index) => {
      // Don't block the tail unless the snake just ate or is about to eat
      if (index === snake.body.length - 1) {
        // Check if snake just ate (tail and second-to-last in same position)
        const secondToLast = snake.body.length > 1 ? snake.body[snake.body.length - 2] : null;
        const justAte = secondToLast && 
                       segment.x === secondToLast.x && 
                       segment.y === secondToLast.y;
        
        // Check if snake is about to eat
        const snakeHead = snake.body[0];
        const aboutToEat = gameState.board.food.some(foodItem => 
          Math.abs(snakeHead.x - foodItem.x) + Math.abs(snakeHead.y - foodItem.y) === 1
        );

        // Only block tail if snake won't move it
        if (justAte || aboutToEat) {
          board[segment.y][segment.x] = Infinity;
        }
      } else {
        board[segment.y][segment.x] = Infinity;
      }
    });
  });

  return board;
}

function aStar(board, start, goal, width, height) {
  const openSet = [];
  const closedSet = new Set();
  const gScore = new Map();
  const fScore = new Map();
  const cameFrom = new Map();

  const startKey = `${start.x},${start.y}`;
  const goalKey = `${goal.x},${goal.y}`;

  openSet.push(start);
  gScore.set(startKey, 0);
  fScore.set(startKey, heuristic(start, goal));

  while (openSet.length > 0) {
    // Get node with lowest fScore
    const current = openSet.reduce((lowest, node) => {
      const currentKey = `${node.x},${node.y}`;
      const lowestKey = `${lowest.x},${lowest.y}`;
      return fScore.get(currentKey) < fScore.get(lowestKey) ? node : lowest;
    });

    const currentKey = `${current.x},${current.y}`;

    // Goal reached
    if (currentKey === goalKey) {
      return reconstructPath(cameFrom, current);
    }

    // Move current from open to closed
    openSet.splice(openSet.findIndex(node => 
      node.x === current.x && node.y === current.y), 1);
    closedSet.add(currentKey);

    // Check all neighbors
    const neighbors = getNeighbors(current, width, height);
    
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.x},${neighbor.y}`;

      // Skip if already evaluated or is obstacle
      if (closedSet.has(neighborKey) || board[neighbor.y][neighbor.x] === Infinity) {
        continue;
      }

      const tentativeGScore = gScore.get(currentKey) + 1; // Each step costs 1

      // Add to open set if not already there
      if (!openSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= (gScore.get(neighborKey) || Infinity)) {
        continue; // Not a better path
      }

      // This path is the best so far
      cameFrom.set(neighborKey, current);
      gScore.set(neighborKey, tentativeGScore);
      fScore.set(neighborKey, tentativeGScore + heuristic(neighbor, goal));
    }
  }

  return null; // No path found
}

function getNeighbors(position, width, height) {
  const neighbors = [];
  const directions = [
    { x: 0, y: 1 },  // up
    { x: 0, y: -1 }, // down
    { x: -1, y: 0 }, // left
    { x: 1, y: 0 }   // right
  ];

  for (const dir of directions) {
    const newX = position.x + dir.x;
    const newY = position.y + dir.y;

    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      neighbors.push({ x: newX, y: newY });
    }
  }

  return neighbors;
}

function heuristic(a, b) {
  // Manhattan distance
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function reconstructPath(cameFrom, current) {
  const path = [current];
  let currentKey = `${current.x},${current.y}`;

  while (cameFrom.has(currentKey)) {
    current = cameFrom.get(currentKey);
    path.unshift(current);
    currentKey = `${current.x},${current.y}`;
  }

  return path;
}

function getDirectionFromPositions(from, to) {
  if (to.x > from.x) return "right";
  if (to.x < from.x) return "left";
  if (to.y > from.y) return "up";
  if (to.y < from.y) return "down";
  return null;
}

export default aStarToFood;