class MineJS extends Game{

constructor(player1, player2){
super("Mine", player1, null);

//the actual board of the game
this.board = [];
//the size of the board (number of col and row)
//default 9
this.size = 9;
//number of mines
//default 10
this.mine = 10;
//count how many spots have been open
this.openCounter = 0;
//
this.gameOver = false;

//score
this.score = player1.score;

}

//starting the game and preparing the board
function Start(){
  openCounter = 0;
  gameOver = false;
  FillBoard();
  CoverBoard();
  SetMine();
  SetBoard();
  //Print();
}

//first filling the- board with -5
function FillBoard(){
  board = [];
  for(c = 0; c < size; c++){
    var x = [];
    for(co = 0; co < size; co++){
      x.push(-5);
    }
    board.push(x);
  }
}

//cover up the board
function CoverBoard(){
  var x = document.body.querySelectorAll(".block");
  for (i = 0; i < x.length; i++) {
    x[i].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Button_Icon_Black.svg/300px-Button_Icon_Black.svg.png')";
  }
}

//then set some spaces into mines: -1
function SetMine(){
  var i = 0;
  while(i<mine){
    var x = Math.round(Math.random()*size-1);
    var y = Math.round(Math.random()*size-1);
    if(board[x][y] == -5){
      board[x][y] = -1;
      i++;
    }
  }
}

function SetBoard(){
  for(c = 0; c < size; c++){
    for(co = 0; co < size; co++){
      if(board[c][co] != -1){
        board[c][co] = NearMine(c, co);
      }
    }
  }
  
}

function Print(){
  var tbp = "";
  for(c = 0; c < size; c++){
    for(co = 0; co < size; co++){
      tbp += board[c][co];
      tbp += " ";
    }
    tbp += "\n";
  }
  alert(tbp);
}

//called when a spot has been clicked
function Open(x, y){
  if(board[x][y]==-1){
    EndGameLose();
  }
  else{
    var z = document.body.querySelectorAll(".block");
    var i = x*size + y;
    switch(board[x][y]){
      case 0:
        z[i].style.backgroundImage = "";
        board[x][y] = -5;
        OpenArea(x, y);
        break;
      case 1:
        z[i].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Minesweeper_1.svg/2000px-Minesweeper_1.svg.png')";
        board[x][y] = -5;
        break;
      case 2:
        z[i].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Minesweeper_2.svg/2000px-Minesweeper_2.svg.png')";
        board[x][y] = -5;
        break;
      case 3:
        z[i].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Minesweeper_3.svg/1000px-Minesweeper_3.svg.png')";
        board[x][y] = -5;
        break;
      case 4:
        z[i].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Minesweeper_4.svg/1024px-Minesweeper_4.svg.png')";
        board[x][y] = -5;
        break;
      case 5:
        z[i].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Minesweeper_5.svg/2000px-Minesweeper_5.svg.png')";
        board[x][y] = -5;
        break;
      case 6:
        z[i].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Minesweeper_6.svg/120px-Minesweeper_6.svg.png')";
        board[x][y] = -5;
        break;
      case 7:
        z[i].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Minesweeper_7.svg/2000px-Minesweeper_7.svg.png')";
        board[x][y] = -5;
        break;
      case 8:
        z[i].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Minesweeper_8.svg/2000px-Minesweeper_8.svg.png')";
        board[x][y] = -5;
        break;
      case -5:
        openCounter--;
        break;
      default:
        break;
    }
    openCounter++;
    EndGameWin();
  }
}

//called when the spot opened is 0
//opens up near areas
function OpenArea(x, y){
  //need to combine with GUI
  //open top left corner
  if(x != 0 && y != 0){
    if(board[x-1][y-1]!=-5){
      Open(x-1, y-1);
    }
  }
  //open top
  if(x != 0){
    if(board[x-1][y]!=-5){
      Open(x-1, y);
    }
  }
  //open top right
  if(x != 0 && y != size-1){
    if(board[x-1][y+1]!=-5){
      Open(x-1, y+1);
    }
  }
  //open left
  if(y != 0){
    if(board[x][y-1]!=-5){
      Open(x, y-1);
    }
  }
  //open right
  if(y != size-1){
    if(board[x][y+1]!=-5){
      Open(x, y+1);
    }
  }
  //open bottom left
  if(x != size-1 && y != 0){
    if(board[x+1][y-1]!=-5){
      Open(x+1, y-1);
    }
  }
  //open bottom
  if(x != size-1){
    if(board[x+1][y]!=-5){
      Open(x+1, y);
    }
  }
  //open bottom right
  if(x != size-1 && y != size-1){
    if(board[x+1][y+1]!=-5){
      Open(x+1, y+1);
    }
  }
}

//return the number of mines near a location represented by (x, y)
function NearMine(x, y){
  var tbr = 0;
  //check top left corner
  if(x != 0 && y != 0){
    if(board[x-1][y-1]==-1){
      tbr++;
    }
  }
  //check top
  if(x != 0){
    if(board[x-1][y]==-1){
      tbr++;
    }
  }
  //check top right
  if(x != 0 && y != size-1){
    if(board[x-1][y+1]==-1){
      tbr++;
    }
  }
  //check left
  if(y != 0){
    if(board[x][y-1]==-1){
      tbr++;
    }
  }
  //check right
  if(y != size-1){
    if(board[x][y+1]==-1){
      tbr++;
    }
  }
  //check bottom left
  if(x != size-1 && y != 0){
    if(board[x+1][y-1]==-1){
      tbr++;
    }
  }
  //check bottom
  if(x != size-1){
    if(board[x+1][y]==-1){
      tbr++;
    }
  }
  //check bottom right
  if(x != size-1 && y != size-1){
    if(board[x+1][y+1]==-1){
      tbr++;
    }
  }
  return tbr;
}

//check to see if the game is over and the player wins
function GameOverWin(){
  if(openCounter == size*size-mine){
    return true;
  }
  else{
    return false;
  }
}

//end the game and tell the player he/she lost
function EndGameLose(){
  //need to combine with GUI
  gameOver = true;
  score--;
  player1.updateScore("Mine", -1);
  alert("You lost! Better luck next time.");
  document.getElementByID("score").innerHTML = score;
  var z = document.body.querySelectorAll(".block");  
  for(c = 0; c < size; c++){
    for(co = 0; co < size; co++){
      var i = c*size + co;
      if(board[c][co] != -1){
        Open(c, co);
      }
      else{
        z[i].style.backgroundImage = "url('http://cdn8.staztic.com/app/i/4449/4449536/mine-rollr-hd-the-endless-minesweeper-1-l-124x124.png')";
      }
    }
  }
}

//end the game and tell the player that he/she won
function EndGameWin(){
  //need to combine with GUI
  if(GameOverWin()&&!gameOver){
    score++;
    player1.updateScore("Mine", 1);
    alert("You won. congratulations!");
    document.getElementByID("score").innerHTML = score;
    var z = document.body.querySelectorAll(".block");  
    for(c = 0; c < size; c++){
      for(co = 0; co < size; co++){
        var i = c*size + co;
        if(board[c][co] == -1){
          z[i].style.backgroundImage = "url('http://cdn8.staztic.com/app/i/4449/4449536/mine-rollr-hd-the-endless-minesweeper-1-l-124x124.png')";
        }
      }
    }
  }
}

}
