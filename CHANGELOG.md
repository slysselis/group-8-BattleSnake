# Changelog

All notable changes to this project will be documented in this file.  
This project follows [Semantic Versioning](https://semver.org/).

---

## [2.0.0] - 2024-04-30
### Added
- `moveTowardFood.js`: Smart food-seeking logic triggered only when health < 50%.
- `headToHead.js`: Basic head-to-head collision avoidance against equal/bigger snakes.
- Modular file structure: Separated logic into reusable files (`prevent*`, `moveTowardFood.js`, etc.).
- GitHub Project Board: Full tracking of Iteration 2 tasks with status, type, priority, and iteration.
- Iteration 2 planning: Estimated tasks and assigned statuses (e.g. Ready, Backlog).

### Changed
- Refactored `move()` function in `index.js` to use modular helpers.
- Cleaned up console output for better debug readability.
- Updated `README.md` to reflect new project structure.

---

## [1.0.0] - 2024-04-20
### Added
- `preventSelfCollision.js`: Prevents crashing into own body.
- `preventBorderCollision.js`: Prevents moving out of board bounds.
- `preventSnakeCollision.js`: Prevents collisions with other snakes.
- `preventBackwardsMovement.js`: Prevents reversing into the snake's neck.
- `printBoard()` visualizer to show current board state in terminal.
- `server.js` for API response handling.
- GitHub setup: added `.prettierrc`, PR template, and board structure.

### Fixed
- Resolved move priority issues by ensuring safe moves are always filtered before randomness.
