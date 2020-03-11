var col = 5;
var row = 5;
var grid = new Array(col);

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;

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

  var neighbours = current.neighbours;
  for (var i = 0; i < neigbours.length; i++) {
    var neigbour = neigbours[i];
    if (!this.closedSet.inluces(neigbour)) {
      neigbour.g = current.neigbour.g + 1;
    }
  }
}

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbours = [];

  this.show = function(color) {
    fill(color);
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  };
  this.addNeighbour = function(grid) {
    var i = this.i;
    var j = this.j;

    if (this.i < col - 1) {
      this.neigbours.push(grid[i + 1][j]);
    }
    this.neigbours.push(grid[i - 1][j]);
  };
  if (this.j < row - 1) {
    this.neigbours.push(grid[i][j + 1]);
  }
  if (this.j > 0) {
    this.neigbours.push(grid[i][j - 1]);
  }
}

function removeFromSet(arr, elem) {
  for (i = arr.length - 1; i > 0; i--) {
    if (arr[i] === elem) {
      arr.splice(i, 1);
    }
  }
}

function draw() {
  background(0);
  var winner = 0;
  if (openSet.length > 0) {
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    if (current === end) {
      console.log("DONE");
    }
    closedSet.push(current);
    removeFromSet(openSet, current);
  } else {
    console.log("whatever");
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
}
