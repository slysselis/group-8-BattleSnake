// Flood fill algorithm to count accessible spaces from a starting position
export function floodFill(board, start) {
    const visited = new Set(); // Track visited positions to avoid infinite loops
    const queue = [start]; // Queue for breadth-first search
    const height = board.length; // Board height
    const width = board[0].length; // Board width
  
    // Four cardinal directions for movement
    const directions = [
      { x: 0, y: -1 }, // down
      { x: 0, y: 1 },  // up
      { x: -1, y: 0 }, // left
      { x: 1, y: 0 }   // right
    ];
  
    let space = 0; // Counter for accessible spaces
  
    // Process queue until empty
    while (queue.length > 0) {
      const { x, y } = queue.pop(); // Get next position to check
      const key = `${x},${y}`; // Create unique key for position
  
      // Skip if position is invalid, already visited, or blocked
      if (
        x < 0 || y < 0 || // Out of bounds (negative)
        x >= width || y >= height || // Out of bounds (too large)
        visited.has(key) || // Already visited
        board[y][x] === 'X' // Blocked by obstacle
      ) continue;
  
      visited.add(key); // Mark position as visited
      space++; // Increment accessible space counter
  
      // Add all neighboring positions to queue for exploration
      directions.forEach(dir => {
        queue.push({ x: x + dir.x, y: y + dir.y });
      });
    }
  
    return space; // Return total accessible spaces
}