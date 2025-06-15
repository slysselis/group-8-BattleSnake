import { floodFill } from './floodFill.js';

function chooseMoveWithFloodFill(gameState, isMoveSafe) {
  const directions = ["up", "down", "left", "right"];
  const myHead = gameState.you.body[0];
  const width = gameState.board.width;
  const height = gameState.board.height;

  const board = Array.from({ length: height }, () => Array(width).fill('.'));

  // Block snake bodies
  gameState.board.snakes.forEach(snake => {
    snake.body.forEach(segment => {
      board[segment.y][segment.x] = 'X';
    });
  });

  const scores = {};
  for (let dir of directions) {
    if (!isMoveSafe[dir]) continue;

    let newHead = { ...myHead };
    if (dir === "up") newHead.y += 1;
    if (dir === "down") newHead.y -= 1;
    if (dir === "left") newHead.x -= 1;
    if (dir === "right") newHead.x += 1;

    scores[dir] = floodFill(board, newHead);
  }

  return scores; // returns { up: 12, right: 3, ... }
}

export default chooseMoveWithFloodFill;
