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
  
  // Initialize safe moves
  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true
  };
  
  // Apply all collision prevention
  isMoveSafe = preventBackwardsMovement(gameState, isMoveSafe);
  isMoveSafe = preventBorderCollision(gameState, isMoveSafe);
  isMoveSafe = preventSelfCollision(gameState, isMoveSafe);
  isMoveSafe = preventSnakeCollision(gameState, isMoveSafe);
  
  // Check for head-to-head opportunities/dangers
  isMoveSafe = headToHead(gameState, isMoveSafe);
  
  // Try to move toward food
  const foodMove = moveTowardFood(gameState, isMoveSafe);
  if (foodMove) {
    console.log(`MOVE ${gameState.turn}: Moving ${foodMove} toward food`);
    return { move: foodMove };
  }
  
  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
  if (safeMoves.length === 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }
  
  // Choose a random move from the safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
  console.log(`MOVE ${gameState.turn}: Moving ${nextMove}`);
  return { move: nextMove };
}

runServer({
  info: info,
  start: start,
  move: move,
  end: end
});
