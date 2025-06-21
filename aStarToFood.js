// Main function to find the best move toward food using A* pathfinding algorithm
function aStarToFood(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0]; // Current position of snake's head
  const food = gameState.board.food; // Array of all food positions on board
  const boardWidth = gameState.board.width; // Width of game board
  const boardHeight = gameState.board.height; // Height of game board

  // Return null if no food exists on board
  if (food.length === 0) {
    return null;
  }

  // Create board representation with obstacles marked
  const board = createBoard(gameState, boardWidth, boardHeight);

  // Find closest reachable food using A* pathfinding
  let bestPath = null; // Stores the optimal path to food
  let shortestDistance = Infinity; // Tracks shortest path distance found

  // Test pathfinding to each food item to find closest one
  for (const foodItem of food) {
    const path = aStar(board, myHead, foodItem, boardWidth, boardHeight);
    if (path && path.length < shortestDistance) {
      shortestDistance = path.length;
      bestPath = path;
    }
  }

  // Return null if no valid path found or path is too short
  if (!bestPath || bestPath.length < 2) {
    return null;
  }

  // Get the first move from the path
  const nextPosition = bestPath[1]; // bestPath[0] is current head position
  const move = getDirectionFromPositions(myHead, nextPosition); // Convert positions to direction string

  // Only return the move if it's considered safe by our existing logic
  return isMoveSafe[move] ? move : null;
}

// Creates a 2D board representation with obstacles marked
function createBoard(gameState, width, height) {
  // Create empty board filled with zeros (passable spaces)
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
        
        // Check if snake is about to eat (head is adjacent to food)
        const snakeHead = snake.body[0];
        const aboutToEat = gameState.board.food.some(foodItem => 
          Math.abs(snakeHead.x - foodItem.x) + Math.abs(snakeHead.y - foodItem.y) === 1
        );

        // Only block tail if snake won't move it (if it ate or will eat)
        if (justAte || aboutToEat) {
          board[segment.y][segment.x] = Infinity;
        }
      } else {
        // Mark all non-tail segments as impassable
        board[segment.y][segment.x] = Infinity;
      }
    });
  });

  return board;
}

// A* pathfinding algorithm implementation
function aStar(board, start, goal, width, height) {
  const openSet = []; // Nodes to be evaluated
  const closedSet = new Set(); // Nodes already evaluated
  const gScore = new Map(); // Cost from start to each node
  const fScore = new Map(); // Estimated total cost from start to goal through each node
  const cameFrom = new Map(); // Parent node for path reconstruction

  const startKey = `${start.x},${start.y}`; // String key for start position
  const goalKey = `${goal.x},${goal.y}`; // String key for goal position

  // Initialize starting node
  openSet.push(start);
  gScore.set(startKey, 0);
  fScore.set(startKey, heuristic(start, goal));

  // Main A* loop
  while (openSet.length > 0) {
    // Get node with lowest fScore (most promising)
    const current = openSet.reduce((lowest, node) => {
      const currentKey = `${node.x},${node.y}`;
      const lowestKey = `${lowest.x},${lowest.y}`;
      return fScore.get(currentKey) < fScore.get(lowestKey) ? node : lowest;
    });

    const currentKey = `${current.x},${current.y}`;

    // Goal reached - reconstruct and return path
    if (currentKey === goalKey) {
      return reconstructPath(cameFrom, current);
    }

    // Move current from open to closed set
    openSet.splice(openSet.findIndex(node => 
      node.x === current.x && node.y === current.y), 1);
    closedSet.add(currentKey);

    // Check all neighbors of current node
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

      // This path is the best so far - record it
      cameFrom.set(neighborKey, current);
      gScore.set(neighborKey, tentativeGScore);
      fScore.set(neighborKey, tentativeGScore + heuristic(neighbor, goal));
    }
  }

  return null; // No path found
}

// Gets all valid neighboring positions within board bounds
function getNeighbors(position, width, height) {
  const neighbors = [];
  const directions = [
    { x: 0, y: 1 },  // up
    { x: 0, y: -1 }, // down
    { x: -1, y: 0 }, // left
    { x: 1, y: 0 }   // right
  ];

  // Check each direction and add valid neighbors
  for (const dir of directions) {
    const newX = position.x + dir.x;
    const newY = position.y + dir.y;

    // Only add if within board boundaries
    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      neighbors.push({ x: newX, y: newY });
    }
  }

  return neighbors;
}

// Calculates Manhattan distance heuristic for A*
function heuristic(a, b) {
  // Manhattan distance (sum of horizontal and vertical distances)
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Reconstructs the path from goal back to start using parent links
function reconstructPath(cameFrom, current) {
  const path = [current]; // Start with goal position
  let currentKey = `${current.x},${current.y}`;

  // Follow parent links back to start
  while (cameFrom.has(currentKey)) {
    current = cameFrom.get(currentKey);
    path.unshift(current); // Add to front of array
    currentKey = `${current.x},${current.y}`;
  }

  return path;
}

// Converts two positions into a direction string
function getDirectionFromPositions(from, to) {
  if (to.x > from.x) return "right"; // Moving right
  if (to.x < from.x) return "left"; // Moving left
  if (to.y > from.y) return "up"; // Moving up
  if (to.y < from.y) return "down"; // Moving down
  return null; // No valid direction
}

export default aStarToFood;