export function floodFill(board, start) {
    const visited = new Set();
    const queue = [start];
    const height = board.length;
    const width = board[0].length;
  
    const directions = [
      { x: 0, y: -1 }, { x: 0, y: 1 },
      { x: -1, y: 0 }, { x: 1, y: 0 }
    ];
  
    let space = 0;
  
    while (queue.length > 0) {
      const { x, y } = queue.pop();
      const key = `${x},${y}`;
  
      if (
        x < 0 || y < 0 ||
        x >= width || y >= height ||
        visited.has(key) ||
        board[y][x] === 'X'
      ) continue;
  
      visited.add(key);
      space++;
  
      directions.forEach(dir => {
        queue.push({ x: x + dir.x, y: y + dir.y });
      });
    }
  
    return space;
  }
  