import { floodFill } from './floodFill.js';

// Uses flood fill algorithm to score each possible move based on accessible space
function chooseMoveWithFloodFill(gameState, isMoveSafe) {
  const directions = ["up", "down", "left", "right"]; // All possible movement directions
  const myHead = gameState.you.body[0]; // Current snake head position
  const width = gameState.board.width; // Board width
  const height = gameState.board.height; // Board height

  // Create board representation with empty spaces marked as '.'
  const board = Array.from({ length: height }, () => Array(width).fill('.'));

  // Block snake bodies by marking them as 'X' (obstacles)
  gameState.board.snakes.forEach(snake => {
    snake.body.forEach(segment => {
      board[segment.y][segment.x] = 'X'; // Mark snake body segments as blocked
    });
  });

  const scores = {}; // Store flood fill scores for each direction
  // Test each possible direction
  for (let dir of directions) {
    if (!isMoveSafe[dir]) continue; // Skip unsafe moves

    // Calculate new head position for this direction
    let newHead = { ...myHead };
    if (dir === "up") newHead.y += 1; // Move up
    if (dir === "down") newHead.y -= 1; // Move down
    if (dir === "left") newHead.x -= 1; // Move left
    if (dir === "right") newHead.x += 1; // Move right

    // Run flood fill from new position to count accessible spaces
    scores[dir] = floodFill(board, newHead);
  }

  return scores; // returns { up: 12, right: 3, ... }
}

export default chooseMoveWithFloodFill;