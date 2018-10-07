var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var board= [
  [false,false,false,false,false],
  [false,false,false,false,false],
  [false,false,false,false,false],
  [false,false,false,false,false],
  [false,false,false,false,false]
];
var easybutton = document.getElementById("easy");
var mediumbutton = document.getElementById("medium");
var hardbutton = document.getElementById("hard");

function easy(){
  randomBoard(3);
}
easybutton.onclick=easy;

mediumbutton.onclick=function (){
randomBoard(5);
};

hardbutton.onclick= () => randomBoard(12);

function drawLines() {
  for (var i=100; i<= 400; i=i+100){
    context.beginPath();
    context.moveTo (000,i);
    context.lineTo (500,i);
    context.stroke();
    context.beginPath();
    context.moveTo (i,500);
    context.lineTo (i,000);
    context.stroke();
    console.log(i);
  }
}
function drawGStuff(){
  context.clearRect(0,0,500,500);
  //draw board
  for (var r=0; r<5; r=r+1){
    for (var c=0; c<5; c=c+1){
      if (board [r][c]) {
        context.fillStyle = 'yellow';
      } else {
        context.fillStyle = 'black';
      }
      context.fillRect(c*100,r*100,100,100)
    }
    }
  drawLines();
}
drawGStuff();

function onClick(r,c){
  board [r][c] = ! board [r][c];
  if (r-1 >= 0){
    board [r-1][c] = ! board [r-1][c];
  }
  if (r+1 <= 4){
    board [r+1][c] = ! board [r+1][c];
  }
  if (c-1 >= 0){
  board [r][c-1] = ! board [r][c-1];
  }
  if (c+1 <= 4){
  board [r][c+1] = ! board [r][c+1];
  }
}

function onMouseClick(e){
  var c=Math.floor(e.clientX /100);
  var r=Math.floor(e.clientY /100);
  onClick(r,c);
  drawGStuff();
}

canvas.onclick = onMouseClick;

function randomBoard(level){
  for (var r=0; r<5; r=r+1){
    for (var c=0; c<5; c=c+1){
      board [r][c] = false;
    }
    }
  for (var i=0; i<level; i=i+1){
    var r= Math.floor (Math.random() *5);
    var c= Math.floor (Math.random() *5);
    onClick(r,c);
  }
  drawGStuff();
}