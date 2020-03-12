function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbours = [];
  this.previous = undefined;
  this.wall = false;

  if (random(1) < 0.36) {
    this.wall = true;
  }

  this.show = function(color) {
    //fill(color);
    if (this.wall) {
      fill(0);
      noStroke();
      ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
    }
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
    if (i > 0 && j > 0) {
      this.neighbours.push(grid[i - 1][j - 1]);
    }
    if (i < col - 1 && j > 0) {
      this.neighbours.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < row - 1) {
      this.neighbours.push(grid[i - 1][j + 1]);
    }
    if (i < col - 1 && j < row - 1) {
      this.neighbours.push(grid[i + 1][j + 1]);
    }
  };
}
