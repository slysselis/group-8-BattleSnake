// Welcome to
// __________         __    __  .__                               __
// \______   \_____ _/  |__/  |_|  |   ____   ______ ____ _____  |  | __ ____
//  |    |  _/\__  \\   __\   __\  | _/ __ \ /  ___//    \\__  \ |  |/ // __ \
//  |    |   \ / __ \|  |  |  | |  |_\  ___/ \___ \|   |  \/ __ \|    <\  ___/
//  |________/(______/__|  |__| |____/\_____>______>___|__(______/__|__\\_____>
//
// This file can be a nice home for your Battlesnake logic and helper functions.
//
// To get you started we've included code to prevent your Battlesnake from moving backwards.
// For more info see docs.battlesnake.com

import runServer from './server.js';
import chalk from 'chalk';
import preventBorderCollision from './preventBorderCollision.js';
import preventSelfCollision from './preventSelfCollision.js';
import preventSnakeCollision from './preventSnakeCollision.js';
import preventBackwardsMovement from './preventBackwardsMovement.js';
import moveTowardFood from './moveTowardFood.js';
import headToHead from './headToHead.js';
import allowTailMovement from './allowTailMovement.js';
import chooseMoveWithFloodFill from './chooseMoveWithFloodFill.js';
import headToHead from './hunt_smaller_snakes.js';
import aStarToFood from './aStarToFood.js';
// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
// TIP: If you open your Battlesnake URL in a browser you should see this data
function info() {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "Antonis",       // Battlesnake Username
    color: "f4260a", // snake color
    head: "dragon",  // snake head
    tail: "swirl",  // snake tail
  };
}

// start is called when your Battlesnake begins a game
function start(gameState) {
  console.log("GAME START");
}

// end is called when your Battlesnake finishes a game
function end(gameState) {
  console.log("GAME OVER\n");
}

// move is called on every turn and returns your next move
// Valid moves are "up", "down", "left", or "right"
// See https://docs.battlesnake.com/api/example-move for available data
function move(gameState) {
  console.log(`MOVE ${gameState.turn}: Beginning turn`);

  // Determine safe moves
  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true
  };

  // Apply all avoidance logic
  isMoveSafe = preventBackwardsMovement(gameState, isMoveSafe);
  isMoveSafe = preventBorderCollision(gameState, isMoveSafe);
  isMoveSafe = preventSelfCollision(gameState, isMoveSafe);
  isMoveSafe = preventSnakeCollision(gameState, isMoveSafe);
  isMoveSafe = headToHead(gameState, isMoveSafe);
  isMoveSafe = allowTailMovement(gameState, isMoveSafe); // if needed

  // Get flood fill scores for each safe move
  const floodScores = chooseMoveWithFloodFill(gameState, isMoveSafe);

  // Find the best move based on flood fill
  const bestFloodMove = Object.entries(floodScores)
    .sort((a, b) => b[1] - a[1]) // descending order
    .map(entry => entry[0])[0];

  let foodMove = null;
  if (gameState.you.health < 70) {
    console.log(`MOVE ${gameState.turn}: Low health (${gameState.you.health}), seeking food with A*`);
    foodMove = aStarToFood(gameState, isMoveSafe);

    // If A* didn't find a safe path, try simple food logic
    if (!foodMove) {
      foodMove = moveTowardFood(gameState, isMoveSafe);
    }
  }

  // Prefer food if low health or space is tight
  if (gameState.you.health < 70 || (bestFloodMove && floodScores[bestFloodMove] < 10)) {
    if (foodMove) {
      console.log(`MOVE ${gameState.turn}: Preferring food → ${foodMove}`);
      return { move: foodMove };
    }
  }

  // Otherwise use flood fill move
  if (bestFloodMove) {
    console.log(`MOVE ${gameState.turn}: Flood fill → ${bestFloodMove}`);
    return { move: bestFloodMove };
  }

  // Fallback: pick any remaining safe move
  const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
  if (safeMoves.length === 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves! Going down.`);
    return { move: "down" };
  }

  const randomMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
  console.log(`MOVE ${gameState.turn}: Random safe move → ${randomMove}`);
  return { move: randomMove };

}

runServer({
  info: info,
  start: start,
  move: move,
  end: end
});
