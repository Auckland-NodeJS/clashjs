var DIRECTIONS = ['north', 'east', 'south', 'west'];
var MOVEMENTS = ['north', 'east', 'south', 'west', 'shoot'];

var randomMove = () => {
  return Math.random() > 0.33 ? 'move' : MOVEMENTS[Math.floor(Math.random() * MOVEMENTS.length)];
};

var safeRandomMove = () => {
  return Math.random() > 0.33 ? 'move' : DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
};

var turn = (currentPosition = [], howMuchTurn) => {
  var currentPositionIndex = DIRECTIONS.indexOf(currentPosition);
  return DIRECTIONS[(currentPositionIndex + howMuchTurn) % 4];
};

var getDirection = (start = [], end = []) => {
  start = start || [];
  end = end || [];

  var diffVertical = Math.abs(start[0] - end[0]);
  var diffHorizontal = Math.abs(start[1] - end[1]);

  if (diffVertical > diffHorizontal) {
    return (start[0] - end[0] > 0) ? 'north' : 'south';
  }
  return (start[1] - end[1] > 0) ? 'west' : 'east';
};

var getDistance = (start = [], end = []) => {
  var diffVertical = Math.abs(start[0] - end[0]);
  var diffHorizontal = Math.abs(start[1] - end[1]);

  return diffHorizontal + diffVertical;
};

var fastGetDirection = (start = [], end = []) => {
  var diffVertical = Math.abs(start[0] - end[0]);
  // var diffHorizontal = Math.abs(start[1] - end[1]);

  if (diffVertical) {
    return (start[0] - end[0] > 0) ? 'north' : 'south';
  }
  return (start[1] - end[1] > 0) ? 'west' : 'east';
};

var isVisible = (originalPosition = [], finalPosition = [], direction = []) => {
  switch (direction) {
    case DIRECTIONS[0]:
      return originalPosition[1] === finalPosition[1] && originalPosition[0] > finalPosition[0];
    case DIRECTIONS[1]:
      return originalPosition[0] === finalPosition[0] && originalPosition[1] < finalPosition[1];
    case DIRECTIONS[2]:
      return originalPosition[1] === finalPosition[1] && originalPosition[0] < finalPosition[0];
    case DIRECTIONS[3]:
      return originalPosition[0] === finalPosition[0] && originalPosition[1] > finalPosition[1];
    default:
      break;
  }
};

var isInRange = (originalPosition = [], finalPosition = [], direction = []) => {
  var range = 5;
  switch (direction) {
    case DIRECTIONS[0]:
      return (originalPosition[0] - finalPosition[0]) < range;
    case DIRECTIONS[1]:
      return (finalPosition[1] - originalPosition[1]) < range;
    case DIRECTIONS[2]:
      return (finalPosition[0] - originalPosition[0]) < range;
    case DIRECTIONS[3]:
      return (originalPosition[1] - finalPosition[1]) < range;
    default:
      break;
  }
}

var canKill = (currentPlayerState = {}, enemiesStates = []) => {
  return enemiesStates.some((enemyObject) => {
    return (enemyObject.isAlive && isVisible(currentPlayerState.position, enemyObject.position, currentPlayerState.direction));
  });
};

module.exports = {
  DIRECTIONS,
  MOVEMENTS,
  isInRange,
  randomMove,
  getDirection,
  isVisible,
  canKill,
  safeRandomMove,
  fastGetDirection,
  turn,
  getDistance
};
