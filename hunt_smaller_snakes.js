// Aggressive strategy to hunt and cut off smaller opponent snakes
function huntSmallerSnakes(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0]; // Current snake head position
  const myLength = gameState.you.length; // Current snake length
  const opponents = gameState.board.snakes.filter(snake => snake.id !== gameState.you.id); // All enemy snakes

  // Filter for snakes smaller than us (potential targets)
  const targets = opponents.filter(snake => snake.length < myLength);
  
  // Return null if no smaller snakes to hunt
  if (targets.length === 0) {
    return null; 
  }

  let closestTarget = null; // Closest smaller snake
  let shortestDistance = Infinity; // Distance to closest target

  // Find the closest smaller snake using Manhattan distance
  targets.forEach(snake => {
    const enemyHead = snake.body[0];
    const distance = Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
    
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestTarget = snake;
    }
  });

  // Don't hunt if target is too far away (more than 5 spaces)
  if (!closestTarget || shortestDistance > 5) {
    return null; 
  }

  const targetHead = closestTarget.body[0]; // Target snake head position
  
  const directions = []; // Potential moves with priorities
  
  // Direct pursuit moves (highest priority)
  if (targetHead.x < myHead.x && isMoveSafe.left) {
    directions.push({ direction: 'left', priority: 1 }); // Move toward target horizontally
  } else if (targetHead.x > myHead.x && isMoveSafe.right) {
    directions.push({ direction: 'right', priority: 1 }); // Move toward target horizontally
  }
  
  if (targetHead.y < myHead.y && isMoveSafe.down) {
    directions.push({ direction: 'down', priority: 1 }); // Move toward target vertically
  } else if (targetHead.y > myHead.y && isMoveSafe.up) {
    directions.push({ direction: 'up', priority: 1 }); // Move toward target vertically
  }

  // Calculate strategic cut-off moves (lower priority)
  const cutOffMoves = calculateCutOffMoves(gameState, closestTarget, isMoveSafe);
  if (cutOffMoves.length > 0) {
    directions.push(...cutOffMoves.map(move => ({ direction: move, priority: 2 })));
  }

  // Sort by priority (higher priority first)
  directions.sort((a, b) => b.priority - a.priority);
  
  return directions.length > 0 ? directions[0].direction : null;
}

// Calculates moves that would cut off the target snake's escape routes
function calculateCutOffMoves(gameState, target, isMoveSafe) {
  const myHead = gameState.you.body[0]; // Our snake head position
  const targetHead = target.body[0]; // Target snake head position
  const board = gameState.board; // Game board reference
  
  // Calculate all possible moves for the target snake
  const targetPossibleMoves = [
    { x: targetHead.x + 1, y: targetHead.y, direction: 'right' },
    { x: targetHead.x - 1, y: targetHead.y, direction: 'left' },
    { x: targetHead.x, y: targetHead.y + 1, direction: 'up' },
    { x: targetHead.x, y: targetHead.y - 1, direction: 'down' }
  ].filter(move => 
    move.x >= 0 && move.x < board.width && // Within board bounds
    move.y >= 0 && move.y < board.height &&
    !isPositionOccupied(move, gameState) // Not occupied by snake body
  );

  const cutOffMoves = []; // Moves that block target's options

  // For each possible target move, find positions we can take to block it
  targetPossibleMoves.forEach(targetMove => {
    const blockingPositions = [
      { x: targetMove.x + 1, y: targetMove.y, ourMove: 'right' },
      { x: targetMove.x - 1, y: targetMove.y, ourMove: 'left' },
      { x: targetMove.x, y: targetMove.y + 1, ourMove: 'up' },
      { x: targetMove.x, y: targetMove.y - 1, ourMove: 'down' }
    ];

    // Check if we can reach any blocking position with a safe move
    blockingPositions.forEach(blockPos => {
      if (blockPos.x === myHead.x + getDirectionOffset(blockPos.ourMove).x &&
          blockPos.y === myHead.y + getDirectionOffset(blockPos.ourMove).y &&
          isMoveSafe[blockPos.ourMove]) {
        cutOffMoves.push(blockPos.ourMove);
      }
    });
  });

  return [...new Set(cutOffMoves)]; // Remove duplicates
}

// Checks if a position is occupied by any snake body segment
function isPositionOccupied(position, gameState) {
  for (const snake of gameState.board.snakes) {
    for (const segment of snake.body) {
      if (segment.x === position.x && segment.y === position.y) {
        return true; // Position is occupied
      }
    }
  }
  return false; // Position is free
}

// Converts direction string to coordinate offset
function getDirectionOffset(direction) {
  const offsets = {
    'up': { x: 0, y: 1 },
    'down': { x: 0, y: -1 },
    'left': { x: -1, y: 0 },
    'right': { x: 1, y: 0 }
  };
  return offsets[direction] || { x: 0, y: 0 }; // Default to no movement
}

export default huntSmallerSnakes;