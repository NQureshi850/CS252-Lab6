//the actual board of the game
var board = [];

//the size of the board (number of col and row)
//default 9
var size = 9;

//number of mines
//default 10
var mine = 10;

//Number of mine images loaded
var minesLoaded = mine;

//count how many spots have been open
var openCounter = 0;

//player
var player1;

//
var gameOver = false;

//score
var score = 0;


class Mine extends Game{

	constructor(player1, player2){
		super("Mine");
		$( document ).ready(function() {
			player1 = this.addPlayer();
			score = player1.score;
		}.bind(this));
	}

	//starting the game and preparing the board
	Start(){
		openCounter = 0;
		minesLoaded = 0;
		gameOver = false;
		this.FillBoard();
		this.CoverBoard();
		this.SetMine();
		this.SetBoard();
	  //Print();
	}

	//first filling the- board with -5
	FillBoard(){
	  board = [];
	  for(var c = 0; c < size; c++){
		var x = [];
		for(var co = 0; co < size; co++){
		  x.push(-5);
		}
		board.push(x);
	  }
	}

	//cover up the board
	CoverBoard(){
	  var x = document.body.querySelectorAll(".block");
	  for (var i = 0; i < x.length; i++) {
		x[i].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Button_Icon_Black.svg/300px-Button_Icon_Black.svg.png')";
	  }
	}

	//then set some spaces into mines: -1
	SetMine(){
	  for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			//console.log(board[i][j] == -5);
			var x = Math.floor(Math.random()*size);
			var y = Math.floor(Math.random()*size);
		
			console.log(board[x][y]);
		}
	  }
	  var i = 0;
	  while(i<mine){
		var x = Math.floor(Math.random()*size);
		var y = Math.floor(Math.random()*size);
		if(board[x][y] == -5){
		  board[x][y] = -1;
		  i++;
		}
	  }
	}

	SetBoard(){
	  for(var c = 0; c < size; c++){
		for(var co = 0; co < size; co++){
		  if(board[c][co] != -1){
			board[c][co] = this.NearMine(c, co);
		  }
		}
	  }
	  
	}

	Print(){
	  var tbp = "";
	  for(var c = 0; c < size; c++){
		for(var co = 0; co < size; co++){
		  tbp += board[c][co];
		  tbp += " ";
		}
		tbp += "\n";
	  }
	  alert(tbp);
	}

	//called when a spot has been clicked
	Open(x, y){
	  if(board[x][y]==-1){
		this.EndGameLose();
	  }
	  else{
		var z = document.body.querySelectorAll(".block");
		var i = x*size + y;
		switch(board[x][y]){
		  case 0:
			z[i].style.backgroundImage = "";
			board[x][y] = -5;
			this.OpenArea(x, y);
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
		this.EndGameWin();
	  }
	}

	//called when the spot opened is 0
	//opens up near areas
	OpenArea(x, y){
	  //need to combine with GUI
	  //open top left corner
	  if(x != 0 && y != 0){
		if(board[x-1][y-1]!=-5){
		  this.Open(x-1, y-1);
		}
	  }
	  //open top
	  if(x != 0){
		if(board[x-1][y]!=-5){
		  this.Open(x-1, y);
		}
	  }
	  //open top right
	  if(x != 0 && y != size-1){
		if(board[x-1][y+1]!=-5){
		  this.Open(x-1, y+1);
		}
	  }
	  //open left
	  if(y != 0){
		if(board[x][y-1]!=-5){
		  this.Open(x, y-1);
		}
	  }
	  //open right
	  if(y != size-1){
		if(board[x][y+1]!=-5){
		  this.Open(x, y+1);
		}
	  }
	  //open bottom left
	  if(x != size-1 && y != 0){
		if(board[x+1][y-1]!=-5){
		  this.Open(x+1, y-1);
		}
	  }
	  //open bottom
	  if(x != size-1){
		if(board[x+1][y]!=-5){
		  this.Open(x+1, y);
		}
	  }
	  //open bottom right
	  if(x != size-1 && y != size-1){
		if(board[x+1][y+1]!=-5){
		  this.Open(x+1, y+1);
		}
	  }
	}

	//return the number of mines near a location represented by (x, y)
	NearMine(x, y){
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
	GameOverWin(){
	  if(openCounter == size*size-mine){
		return true;
	  }
	  else{
		return false;
	  }
	}

	MineImageLoaded(finishedLoading){
		minesLoaded++;
		if (minesLoaded == mine) {
			finishedLoading();
		}
	}

	//end the game and tell the player he/she lost
	EndGameLose(){
	  //need to combine with GUI
	  gameOver = true;
	  score--;
	  this.decreasePlayerScore(player1, -1);
	  document.getElementById("score").innerHTML = score;
	  var z = document.body.querySelectorAll(".block");  
	  minesLoaded = 0;
	  for(var c = 0; c < size; c++){
		for(var co = 0; co < size; co++){
		  var i = c*size + co;
		  if(board[c][co] != -1){
			this.Open(c, co);
		  }
		  else{
			z[i].style.backgroundImage = "url('http://cdn8.staztic.com/app/i/4449/4449536/mine-rollr-hd-the-endless-minesweeper-1-l-124x124.png')";
			var image = new Image();
			image.onload = function() 
			{ 
				this.MineImageLoaded( function()
				{ 
					alert("You lost! Better luck next time."); 
				}) 
			}.bind(this);
			image.src = "http://cdn8.staztic.com/app/i/4449/4449536/mine-rollr-hd-the-endless-minesweeper-1-l-124x124.png";
		  }
		}
	  }
	  this.end();
	}

	//end the game and tell the player that he/she won
	EndGameWin(){
	  //need to combine with GUI
	  if(this.GameOverWin() && !gameOver){
		score++;
		this.increasePlayerScore(player1, 1);
		document.getElementById("score").innerHTML = score;
		var z = document.body.querySelectorAll(".block");  
		minesLoaded = 0;
		for(var c = 0; c < size; c++){
		  for(var co = 0; co < size; co++){
			var i = c*size + co;
			if(board[c][co] == -1){
			  z[i].style.backgroundImage = "url('http://cdn8.staztic.com/app/i/4449/4449536/mine-rollr-hd-the-endless-minesweeper-1-l-124x124.png')";
			  var image = new Image();
		  	  image.onload = function() 
			  { 
			    this.MineImageLoaded( function()
				  { 
					alert("You won. congratulations!"); 
				  }) 
			  }.bind(this);
			  image.src = "http://cdn8.staztic.com/app/i/4449/4449536/mine-rollr-hd-the-endless-minesweeper-1-l-124x124.png";
			}
		  }
		}
		this.end(player1);
	  }
	}
}
