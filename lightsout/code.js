var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var board = [
  [false, false, false, false, false],
  [false, true, false, true, false],
  [false, false, false, false, false],
  [true, false, false, false, true],
  [false, true, true, true, false]
];
var easybutton = document.getElementById("easy");
var mediumbutton = document.getElementById("medium");
var hardbutton = document.getElementById("hard");
var gobutton = document.getElementById("go");
var lighton = null;
var lightoff = null;
var isLevelSet = false;

function easy() {
  randomBoard(3);
  drawGStuff();
}
easybutton.onclick = easy;

mediumbutton.onclick = function () {
  randomBoard(5);
  drawGStuff();
};

hardbutton.onclick = () => {
  randomBoard(12)
  drawGStuff
} ;

gobutton.onclick = function () {
  console.log("make a go thing work now");
  $("#title").slideUp(1000);
  $("#maingame").slideDown(1000);
};

document.getElementById("easy-radio").onclick = function () {
  easy();
  isLevelSet = true;
  checkAll();

};

document.getElementById("medium-radio").onclick = function () {
  randomBoard(5); // Note: This is calling the random board and choosing the parameters here. But be warned... it means you gotta change both parameters if you want medium to be consistant (unlike easy)
  isLevelSet = true;
  checkAll();
};

document.getElementById("hard-radio").onclick = function () {
  randomBoard(12); // Note: see  medium-radio above
  isLevelSet = true;
  checkAll();
};

function checkAll(){
  if (lighton != null && isLevelSet)  {
    gobutton.disabled = false;
    drawGStuff();
  }
  
}

document.getElementById("color-classic").onclick = function () {
  lighton = "red";
  lightoff = "blue";
  checkAll();
};

document.getElementById("color-yellowblack").onclick = function () {
  lighton = "yellow";
  lightoff = "blue";
  checkAll();
};

function drawLines() {
  for (var i = 100; i <= 400; i = i + 100) {
    context.beginPath();
    context.moveTo(000, i);
    context.lineTo(500, i);
    context.stroke();
    context.beginPath();
    context.moveTo(i, 500);
    context.lineTo(i, 000);
    context.stroke();
    console.log(i);
  }
}
function drawGStuff() {
  context.clearRect(0, 0, 500, 500);
  //draw board
  for (var r = 0; r < 5; r = r + 1) {
    for (var c = 0; c < 5; c = c + 1) {
      if (board[r][c]) {
        context.fillStyle = lighton;
      } else {
        context.fillStyle = lightoff;
      }
      context.fillRect(c * 100, r * 100, 100, 100)
    }
  }
  drawLines();
}

function onClick(r, c) {
  board[r][c] = !board[r][c];
  if (r - 1 >= 0) {
    board[r - 1][c] = !board[r - 1][c];
  }
  if (r + 1 <= 4) {
    board[r + 1][c] = !board[r + 1][c];
  }
  if (c - 1 >= 0) {
    board[r][c - 1] = !board[r][c - 1];
  }
  if (c + 1 <= 4) {
    board[r][c + 1] = !board[r][c + 1];
  }
}

function onMouseClick(e) {
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  var c = Math.floor(x / 100);
  var r = Math.floor(y / 100);
  onClick(r, c);
  drawGStuff();
}

canvas.onclick = onMouseClick;

function randomBoard(level) {
  for (var r = 0; r < 5; r = r + 1) {
    for (var c = 0; c < 5; c = c + 1) {
      board[r][c] = false;
    }
  }
  for (var i = 0; i < level; i = i + 1) {
    var r = Math.floor(Math.random() * 5);
    var c = Math.floor(Math.random() * 5);
    onClick(r, c);
  }

}