var col = 25;
var row = 25;
var grid = new Array(col);

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];

function setup() {
  createCanvas(400, 400);
  w = width / col;
  h = height / row;

  for (let i = 0; i < row; i++) {
    grid[i] = new Array(row);
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      grid[i][j].addNeighbour(grid);
    }
  }

  start = grid[0][0];
  end = grid[col - 1][row - 1];
  openSet.push(start);
}

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbours = [];
  this.previous = undefined;

  this.show = function(color) {
    fill(color);
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  };
  this.addNeighbour = function(grid) {
    var i = this.i;
    var j = this.j;

    if (i < col - 1) {
      this.neighbours.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbours.push(grid[i - 1][j]);
    }
    if (j < row - 1) {
      this.neighbours.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbours.push(grid[i][j - 1]);
    }
  };
}

function removeFromSet(arr, elem) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elem) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

function draw() {
  if (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    if (current === end) {
      noLoop();
      console.log("Done");
    }
    closedSet.push(current);
    removeFromSet(openSet, current);

    var neighbours = current.neighbours;
    for (var i = 0; i < neighbours.length; i++) {
      var neigbour = neighbours[i];

      if (!closedSet.includes(neigbour)) {
        var tempG = current.g + 1;

        if (openSet.includes(neigbour)) {
          if (tempG < neigbour.g) {
            neigbour.g = tempG;
          }
        } else {
          neigbour.g = tempG;
          openSet.push(neigbour);
        }
        neigbour.h = heuristic(neigbour, end);
        neigbour.f = neigbour.g + neigbour.h;
        neigbour.previous = current;
      }
    }
  } else {
    console.log("no Path found");
    noLoop();
    return;
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      grid[i][j].show(color(200));
    }
  }
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(100, 0, 0));
  }
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  for (let i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255));
  }
}
