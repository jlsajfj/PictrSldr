var context = document.getElementById('puzzle').getContext('2d');
var takePicture = document.querySelector("#take-picture");
var f=false;
var width = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;

var height = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;

takePicture.onchange = function (event) {
            // Get a reference to the taken picture or chosen file
            var files = event.target.files,
                file;
            if (files && files.length > 0) {
                file = files[0];
                
                    try {
                        // Fallback if createObjectURL is not supported
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showPicture.src = event.target.result;
                              canvas = document.getElementById("puzzle");
                             boardSize=Math.min(showPicture.height,showPicture.width);
                          var c=document.createElement("canvas");
                          c.width=c.height=1000;         
                          c.id="a";
                          var b=Math.min(width,height);//
                          document.getElementById("main").appendChild(c);
                          c.getContext("2d").drawImage(showPicture,(showPicture.width-boardSize)/2,(showPicture.height-boardSize)/2,boardSize,boardSize,0,0,b,b);
                          showPicture=c;
                            tileSize =b / tileCount;
                              canvas.width  = b;
         
                            canvas.height = b;
                          boardSize=b;
                          setBoard();  
                          drawTiles();
                          drawTiles();
                          drawTiles();
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        //
                        var error = document.querySelector("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    
                }
            }};
var showPicture = new Image();

var boardSize = document.getElementById('puzzle').width;
var tileCount = 4;

var tileSize = boardSize / tileCount;

var clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

var solved = false;

var boardParts;
setBoard();



document.getElementById('puzzle').onclick = function(e) {
  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
  if(f)clickLoc.x=tileCount-clickLoc.x;
  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
    slideTile(emptyLoc, clickLoc);
    drawTiles();
  }
  if (solved) {
    setTimeout(function() {alert("You solved it!");}, 500);
  }
};

function setBoard() {
  boardParts = new Array(tileCount);
  for (var i = 0; i < tileCount; ++i) {
    boardParts[i] = new Array(tileCount);
    for (var j = 0; j < tileCount; ++j) {
      boardParts[i][j] = new Object;
      boardParts[i][j].x = (tileCount - 1) - i;
      boardParts[i][j].y = (tileCount - 1) - j;
    }
  }
  emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
  emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
  solved = false;
}

function drawTiles() {
  context.clearRect ( 0 , 0 , boardSize , boardSize );
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      var x = boardParts[i][j].x;
      var y = boardParts[i][j].y;
      if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
        context.drawImage(showPicture, x * tileSize, y * tileSize, tileSize, tileSize,
            i * tileSize, j * tileSize, tileSize, tileSize);
      }
    }
  }
}

function distance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toLoc, fromLoc) {
  if (!solved) {
    boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
    boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
    boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
    boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
    toLoc.x = fromLoc.x;
    toLoc.y = fromLoc.y;
    checkSolved();
  }
}

function checkSolved() {
  var flag = true;
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
        flag = false;
      }
    }
  }
  solved = flag;
}
function t(){
  toggle_visibility("puzzle");
  toggle_visibility("a")
}
function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.transform == 'rotate(0deg)'){
          e.style.transform = 'rotate(90deg)';
          f=true;}
       else{
          e.style.transform = 'rotate(0deg)';
          f=false;}
    }
