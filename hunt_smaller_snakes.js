function huntSmallerSnakes(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const myLength = gameState.you.length;
  const opponents = gameState.board.snakes.filter(snake => snake.id !== gameState.you.id);

  const targets = opponents.filter(snake => snake.length < myLength);
  
  if (targets.length === 0) {
    return null; 
  }

  let closestTarget = null;
  let shortestDistance = Infinity;

  targets.forEach(snake => {
    const enemyHead = snake.body[0];
    const distance = Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
    
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestTarget = snake;
    }
  });

  if (!closestTarget || shortestDistance > 5) {
    return null; 
  }

  const targetHead = closestTarget.body[0];
  
  const directions = [];
  
  if (targetHead.x < myHead.x && isMoveSafe.left) {
    directions.push({ direction: 'left', priority: 1 });
  } else if (targetHead.x > myHead.x && isMoveSafe.right) {
    directions.push({ direction: 'right', priority: 1 });
  }
  
  if (targetHead.y < myHead.y && isMoveSafe.down) {
    directions.push({ direction: 'down', priority: 1 });
  } else if (targetHead.y > myHead.y && isMoveSafe.up) {
    directions.push({ direction: 'up', priority: 1 });
  }

  const cutOffMoves = calculateCutOffMoves(gameState, closestTarget, isMoveSafe);
  if (cutOffMoves.length > 0) {
    directions.push(...cutOffMoves.map(move => ({ direction: move, priority: 2 })));
  }

  directions.sort((a, b) => b.priority - a.priority);
  
  return directions.length > 0 ? directions[0].direction : null;
}

function calculateCutOffMoves(gameState, target, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const targetHead = target.body[0];
  const board = gameState.board;
  
  const targetPossibleMoves = [
    { x: targetHead.x + 1, y: targetHead.y, direction: 'right' },
    { x: targetHead.x - 1, y: targetHead.y, direction: 'left' },
    { x: targetHead.x, y: targetHead.y + 1, direction: 'up' },
    { x: targetHead.x, y: targetHead.y - 1, direction: 'down' }
  ].filter(move => 
    move.x >= 0 && move.x < board.width && 
    move.y >= 0 && move.y < board.height &&
    !isPositionOccupied(move, gameState)
  );

  const cutOffMoves = [];

  targetPossibleMoves.forEach(targetMove => {
    const blockingPositions = [
      { x: targetMove.x + 1, y: targetMove.y, ourMove: 'right' },
      { x: targetMove.x - 1, y: targetMove.y, ourMove: 'left' },
      { x: targetMove.x, y: targetMove.y + 1, ourMove: 'up' },
      { x: targetMove.x, y: targetMove.y - 1, ourMove: 'down' }
    ];

    blockingPositions.forEach(blockPos => {
      if (blockPos.x === myHead.x + getDirectionOffset(blockPos.ourMove).x &&
          blockPos.y === myHead.y + getDirectionOffset(blockPos.ourMove).y &&
          isMoveSafe[blockPos.ourMove]) {
        cutOffMoves.push(blockPos.ourMove);
      }
    });
  });

  return [...new Set(cutOffMoves)]; 
}

function isPositionOccupied(position, gameState) {
  for (const snake of gameState.board.snakes) {
    for (const segment of snake.body) {
      if (segment.x === position.x && segment.y === position.y) {
        return true;
      }
    }
  }
  return false;
}

function getDirectionOffset(direction) {
  const offsets = {
    'up': { x: 0, y: 1 },
    'down': { x: 0, y: -1 },
    'left': { x: -1, y: 0 },
    'right': { x: 1, y: 0 }
  };
  return offsets[direction] || { x: 0, y: 0 };
}

export default huntSmallerSnakes;