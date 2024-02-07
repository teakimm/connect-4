"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
// (board[5][0] would be the bottom-left spot on the board)

/** makeBoard: fill in global `board`:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for(let i = 0; i < HEIGHT; i++) {
    board.push(new Array(WIDTH).fill(null));
  }
  console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById("board");

  // Creates the top element and sets the id to be the top
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  /* Create each cell with an id of the column it's on
     adds an event listener to each cell and appends it to the board */
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    headCell.addEventListener("click", handleClick);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // Create a table row element and assign to a "row" variable
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // Create a table cell element and assign to a "cell" variable
      const cell = document.createElement("td");


      // add an id, c-y-x, to the above table cell element
      // (for example, for the cell at y=2, x=3, the ID should be "c-2-3")
      cell.setAttribute("id", `c-${y}-${x}`);

      // append the table cell to the table row
      row.append(cell);

    }
    // append the row to the html board
    htmlBoard.append(row);

  }
}

/** findSpotForCol: given column x, return y coordinate of furthest-down spot
 *    (return null if filled) */

function findSpotForCol(x) {
  // Start at lowest y value and see if null, if it is, return the y value
  for(let y = HEIGHT - 1; y >= 0; y--) {
    if(board[y][x] === null) return y;
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const currentCell = document.querySelector(`#c-${y}-${x}`);
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  currentCell.append(piece);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // Check four cells to see if they're all legal & all color of current
    // player

    for (let i = 0; i < 4; i++) {
      const y = cells[i][0];
      const x = cells[i][1];
      if (currPlayer !== board[y][x]) return false;
    }

    return true;
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x],[y + 1, x],[y + 2, x],[y + 3, x]];
      let diagDL = [[y, x],[y + 1, x - 1],[y + 2, x - 2],[y + 3, x - 3]];
      let diagDR = [[y, x],[y + 1, x + 1],[y + 2, x + 2],[y + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
  return false;
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update global `board` variable with new piece
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie: if top row is filled, board is filled
  // TODO: check if all cells in board are filled; if so, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** Start game. */

function start() {
  makeBoard();
  makeHtmlBoard();
}

start();