//the sum of the values of the player's hand
var playerValue = 0;

//player value no ace
var PVNA = 0;

//player value ace
var PVA = 0;

//the sum of the values of the dealer's hand
var dealerValue = 0;

//the amount of cards the player has -1
var playerCardNum = -1;

//the amount of cards the dealer has -1
var dealerCardNum = -1;

var player1;

//the money the player has
//not used for now
var money = 0;

//the amount of money bet
var bet = 0;

//variable for the first card the dealer has
//used to show the card once the player stops
var dealerFirstX = 0;
var dealerFirstY = 0;

// number of aces the player has
var numOfAce = 0;

class BlackJackJS extends Game{

  constructor (player1, player2){
	super("BlackJack");
	$( document ).ready(function() {
		player1 = this.addPlayer();
		money = player1.score;
	});
  }

  //to start the game
  Start(){
	playerValue = 0;
	PVA = 0;
	PVNA = 0;
	dealerValue = 0;
	playerCardNum = -1;
	dealerCardNum = -1;
	dealerFirstX = 0;
	dealerFirstY = 0;
	numOfAce = 0;
	Bet();
	document.getElementById("dealerCA").innerHTML = 0;
	document.getElementById("money").innerHTML = money;
	var x = document.body.querySelectorAll(".dealer");
	var y = document.body.querySelectorAll(".player");
	for(var i = 0; i<5; i++){
	  x[i].style.backgroundImage = "";
	  y[i].style.backgroundImage = "";
	}
	Deal();
  }

  //to deal out the intial cards
  Deal(){
	var x = GetCardValue();
	var y = GetCardSuit();
	if(x==1){
	  numOfAce++;
	}
	else{
	  if(x>10){
		PVNA += 10;
		playerValue += 10;
	  }
	  else{
		PVNA += x;
		playerValue += x;
	  }
	}
	playerCardNum++;
	ShowCard(x, y, "player");
	x = GetCardValue();
	y = GetCardSuit();
	if(x==1){
	  numOfAce++;
	}
	else{
	  if(x>10){
		PVNA += 10;
		playerValue += 10;
	  }
	  else{
		PVNA += x;
		playerValue += x;
	  }
	}
	playerCardNum++;
	ShowCard(x, y, "player");
	x = GetCardValue();
	y = GetCardSuit();
	if(x>10){
	  dealerValue += 10;
	}
	else{
	  dealerValue += x;
	}
	dealerCardNum++;
	ShowCard(x, y, "dealer");
	x = GetCardValue();
	y = GetCardSuit();
	if(x>10){
	  dealerValue += 10;
	}
	else{
	  dealerValue += x;
	}
	dealerCardNum++;
	ShowCard(x, y, "dealer");
	Ace();
	document.getElementById("playerCA").innerHTML = playerValue;
  }

  //for hit
  Hit(){
	var x = GetCardValue();
	var y = GetCardSuit();
	if(x==1){
	  numOfAce++;
	}
	else{
	  if(x>10){
		PVNA += 10;
		playerValue += 10;
	  }
	  else{
		PVNA += x;
		playerValue += x;
	  }
	}
	playerCardNum++;
	ShowCard(x, y, "player");
	Ace();
	document.getElementById("playerCA").innerHTML = playerValue;
	if(playerValue > 21){
	  PlayerLose();
	}
  }

  //for stop
  Stop(){
	DealerTurn();
  }

  //for dealder's turn
  DealerTurn(){
	ShowDealerHidden();
	document.getElementById("dealerCA").innerHTML = dealerValue;
	while(dealerValue < 17){
	  DealerHit();
	}
	Compare();
  }

  //for Dealer Hit
  DealerHit(){
	var x = GetCardValue();
	var y = GetCardSuit();
	if(x>10){
	  dealerValue += 10;
	}
	else{
	  dealerValue += x;
	}
	dealerCardNum++;
	ShowCard(x, y, "dealer");
	document.getElementById("dealerCA").innerHTML = dealerValue;
  }

  //to compare
  Compare(){
	if(dealerValue > 21){
	  PlayerWin();
	}
	else if(playerValue == dealerValue){
	  Tie();
	}
	else if(playerValue > dealerValue){
	  PlayerWin();
	}
	else{
	  PlayerLose();
	}
  }

  //for when player wins
  //will combine with money later
  PlayerWin(){
	alert("You Win!");
	for(var i = 0; i < bet; i++){
	  money++;
	}
	
	player1.updateScore("BlackJack", bet);

	document.getElementById("money").innerHTML = money;
  }

  //for when player loses
  //will combine with money later
  PlayerLose(){
	alert("You Lose");
	
	var change = 0;
	change -= bet;
	player1.updateScore("BlackJack", change);
	
	money -= bet;
	document.getElementById("money").innerHTML = money;
  }

  //for when tie
  Tie(){
	alert("It's a tie");
  }

  //to get the value of the card
  GetCardValue(){
	var tbr = Math.floor(Math.random()*13+1);
	return tbr;
  }

  //to get the suit of the card
  GetCardSuit(){
	var tbr = Math.floor(Math.random()*4+1);
	return tbr;
  }

  //to show the card onto the board
  ShowCard(x, y, name){
	if(name == "dealer"){
	  var z = document.body.querySelectorAll(".dealer");
	  if(dealerCardNum == 0){
		z[dealerCardNum].style.backgroundImage = "url('https://lh5.googleusercontent.com/-f9qMsnwIn9M/VPB8SmbW5nI/AAAAAAAAANI/X_Kd6UYGDRA/w800-h800/BackOfCardEdit.jpg')";
		dealerFirstX = x;
		dealerFirstY = y;
	  }
	  else{
		switch(x){
		  case 1:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/36/Playing_card_club_A.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/d/d3/Playing_card_diamond_A.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/57/Playing_card_heart_A.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/25/Playing_card_spade_A.svg')";
				break;
			  default:
				break;
			}
			break;
		  case 2:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f5/Playing_card_club_2.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/59/Playing_card_diamond_2.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/d/d5/Playing_card_heart_2.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f2/Playing_card_spade_2.svg')";
				break;
			  default:
				break;
			}
			break;
		  case 3:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/6/6b/Playing_card_club_3.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/82/Playing_card_diamond_3.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/b/b6/Playing_card_heart_3.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f2/Playing_card_spade_2.svg')";
				break;
			  default:
				break;
			}
			break;
		  case 4:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/3d/Playing_card_club_4.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/20/Playing_card_diamond_4.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/a/a2/Playing_card_heart_4.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/2c/Playing_card_spade_4.svg')";
				break;
			  default:
				break;
			}
			break;
		  case 5:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/50/Playing_card_club_5.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/fd/Playing_card_diamond_5.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/52/Playing_card_heart_5.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('url('https://upload.wikimedia.org/wikipedia/commons/9/94/Playing_card_spade_5.svg')";
				break;
			  default:
				break;
			}
			break;
		  case 6:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/a/a0/Playing_card_club_6.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/80/Playing_card_diamond_6.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/c/cd/Playing_card_heart_6.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/d/d2/Playing_card_spade_6.svg')";
				break;
			  default:
				break;
			}
			break;
		  case 7:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/4/4b/Playing_card_club_7.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/e/e6/Playing_card_diamond_7.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/94/Playing_card_heart_7.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/6/66/Playing_card_spade_7.svg')";
				break;
			  default:
				break;
			}
			break;
		  case 8:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/e/eb/Playing_card_club_8.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/7/78/Playing_card_diamond_8.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/50/Playing_card_heart_8.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/21/Playing_card_spade_8.svg')";
				break;
			  default:
				break;
			}
			break;
		  case 9:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/27/Playing_card_club_9.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/9e/Playing_card_diamond_9.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/50/Playing_card_heart_9.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/e/e0/Playing_card_spade_9.svg')";
				break;
			  default:
				break;
			}
			break;
		  case 10:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/3e/Playing_card_club_10.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/34/Playing_card_diamond_10.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/98/Playing_card_heart_10.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/87/Playing_card_spade_10.svg')";
				break;
			  default:
				break;
			}
			break;
		  case 11:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/b/b7/Playing_card_club_J.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/a/af/Playing_card_diamond_J.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/4/46/Playing_card_heart_J.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/b/bd/Playing_card_spade_J.svg')";
				break;
			  default:
				break;
			}
			break;
		  case 12:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f2/Playing_card_club_Q.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/0/0b/Playing_card_diamond_Q.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/7/72/Playing_card_heart_Q.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/51/Playing_card_spade_Q.svg')";
				break;
			  default:
				break;
			}
			break;
		  case 13:
			switch(y){
			  case 1:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/22/Playing_card_club_K.svg')";
				break;
			  case 2:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/7/78/Playing_card_diamond_K.svg')";
				break;
			  case 3:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/d/dc/Playing_card_heart_K.svg')";
				break;
			  case 4:
				z[dealerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/9f/Playing_card_spade_K.svg')";
				break;
			  default:
				break;
			}
			break;
		}
	  }
	}
	else{
	  var z = document.body.querySelectorAll(".player");
	  switch(x){
		case 1:
		  switch(y){
			case 1:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/36/Playing_card_club_A.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/d/d3/Playing_card_diamond_A.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/57/Playing_card_heart_A.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/25/Playing_card_spade_A.svg')";
			  break;
			default:
			  break;
		  }
		  break;
		case 2:
		  switch(y){
			case 1:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f5/Playing_card_club_2.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/59/Playing_card_diamond_2.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/d/d5/Playing_card_heart_2.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f2/Playing_card_spade_2.svg')";
			  break;
			default:
			  break;
		  }
		  break;
		case 3:
		  switch(y){
			case 1:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/6/6b/Playing_card_club_3.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/82/Playing_card_diamond_3.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/b/b6/Playing_card_heart_3.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f2/Playing_card_spade_2.svg')";
			  break;
			default:
			  break;
		  }
		  break;
		case 4:
		  switch(y){
			case 1:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/3d/Playing_card_club_4.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/20/Playing_card_diamond_4.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/a/a2/Playing_card_heart_4.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/2c/Playing_card_spade_4.svg')";
			  break;
			default:
			  break;
		  }
		  break;
		case 5:
		  switch(y){
			case 1:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/50/Playing_card_club_5.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/fd/Playing_card_diamond_5.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/52/Playing_card_heart_5.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/94/Playing_card_spade_5.svg')";
			  break;
			default:
			  break;
		  }
		  break;
		case 6:
		  switch(y){
			case 1:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/a/a0/Playing_card_club_6.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/80/Playing_card_diamond_6.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/c/cd/Playing_card_heart_6.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/d/d2/Playing_card_spade_6.svg')";
			  break;
			default:
			  break;
		  }
		  break;
		case 7:
		  switch(y){
			case 1:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/4/4b/Playing_card_club_7.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/e/e6/Playing_card_diamond_7.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/94/Playing_card_heart_7.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/6/66/Playing_card_spade_7.svg')";
			  break;
			default:
			  break;
		  }
		  break;
		case 8:
		  switch(y){
			case 1:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/e/eb/Playing_card_club_8.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/7/78/Playing_card_diamond_8.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/50/Playing_card_heart_8.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/21/Playing_card_spade_8.svg')";
			  break;
			default:
			  break;
		  }
		  break;
		case 9:
		  switch(y){
			case 1:bet = prompt("Enter the amount of money you would like to bet\nThe default bet is 10.", 10);
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/27/Playing_card_club_9.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/9e/Playing_card_diamond_9.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/50/Playing_card_heart_9.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/e/e0/Playing_card_spade_9.svg')";
			  break;
			default:
			  break;
		  }
		  break;
		case 10:
		  switch(y){
			case 1:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/3e/Playing_card_club_10.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/34/Playing_card_diamond_10.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/98/Playing_card_heart_10.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/87/Playing_card_spade_10.svg')";
			  break;
			default:
			  break;
		  }
		  break;
		case 11:
		  switch(y){
			case 1:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/b/b7/Playing_card_club_J.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/a/af/Playing_card_diamond_J.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/4/46/Playing_card_heart_J.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/b/bd/Playing_card_spade_J.svg')";
			  break;
			default:
			  break;
		  }
		  break;
		case 12:
		  switch(y){
			case 1:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f2/Playing_card_club_Q.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/0/0b/Playing_card_diamond_Q.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/7/72/Playing_card_heart_Q.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/51/Playing_card_spade_Q.svg')";
			  break;
			default:
			  break;
		  }
		  break;
		case 13:
		  switch(y){
			case 1:bet = prompt("Enter the amount of money you would like to bet\nThe default bet is 10.", 10);
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/22/Playing_card_club_K.svg')";
			  break;
			case 2:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/7/78/Playing_card_diamond_K.svg')";
			  break;
			case 3:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/d/dc/Playing_card_heart_K.svg')";
			  break;
			case 4:
			  z[playerCardNum].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/9f/Playing_card_spade_K.svg')";
			  break;
			default:
			  break;
		  }
	  }
	}
  }

  //show the hidden card of the dealer
  ShowDealerHidden(){
	var z = document.body.querySelectorAll(".dealer");
	switch(dealerFirstX){
	  case 1:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/36/Playing_card_club_A.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/d/d3/Playing_card_diamond_A.svg')";
			break;
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/57/Playing_card_heart_A.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/25/Playing_card_spade_A.svg')";
			break;
		  default:
			break;
		}
		break;
	  case 2:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f5/Playing_card_club_2.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/59/Playing_card_diamond_2.svg')";
			break;
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/d/d5/Playing_card_heart_2.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f2/Playing_card_spade_2.svg')";
			break;
		  default:
			break;
		}
		break;
	  case 3:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/6/6b/Playing_card_club_3.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/82/Playing_card_diamond_3.svg')";
			break;
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/b/b6/Playing_card_heart_3.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f2/Playing_card_spade_2.svg')";
			break;
		  default:
			break;
		}
		break;
	  case 4:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/3d/Playing_card_club_4.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/20/Playing_card_diamond_4.svg')";
			break;
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/a/a2/Playing_card_heart_4.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/2c/Playing_card_spade_4.svg')";
			break;
		  default:
			break;
		}
		break;
	  case 5:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/50/Playing_card_club_5.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/fd/Playing_card_diamond_5.svg')";
			break;
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/52/Playing_card_heart_5.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('url('https://upload.wikimedia.org/wikipedia/commons/9/94/Playing_card_spade_5.svg')";
			break;
		  default:
			break;
		}
		break;
	  case 6:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/a/a0/Playing_card_club_6.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/80/Playing_card_diamond_6.svg')";
			break;
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/c/cd/Playing_card_heart_6.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/d/d2/Playing_card_spade_6.svg')";
			break;bet = prompt("Enter the amount of money you would like to bet\nThe default bet is 10.", 10);
		  default:
			break;
		}
		break;
	  case 7:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/4/4b/Playing_card_club_7.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/e/e6/Playing_card_diamond_7.svg')";
			break;
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/94/Playing_card_heart_7.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/6/66/Playing_card_spade_7.svg')";
			break;
		  default:
			break;
		}
		break;
	  case 8:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/e/eb/Playing_card_club_8.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/7/78/Playing_card_diamond_8.svg')";
			break;
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/50/Playing_card_heart_8.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/21/Playing_card_spade_8.svg')";
			break;
		  default:
			break;
		}
		break;
	  case 9:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/27/Playing_card_club_9.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/9e/Playing_card_diamond_9.svg')";
			break;
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/50/Playing_card_heart_9.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/e/e0/Playing_card_spade_9.svg')";
			break;
		  default:
			break;
		}
		break;
	  case 10:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/3e/Playing_card_club_10.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/34/Playing_card_diamond_10.svg')";
			break;bet = prompt("Enter the amount of money you would like to bet\nThe default bet is 10.", 10);
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/98/Playing_card_heart_10.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/87/Playing_card_spade_10.svg')";
			break;
		  default:
			break;
		}
		break;
	  case 11:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/b/b7/Playing_card_club_J.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/a/af/Playing_card_diamond_J.svg')";
			break;
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/4/46/Playing_card_heart_J.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/b/bd/Playing_card_spade_J.svg')";
			break;
		  default:
			break;
		}
		break;
	  case 12:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/f/f2/Playing_card_club_Q.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/0/0b/Playing_card_diamond_Q.svg')";
			break;
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/7/72/Playing_card_heart_Q.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/51/Playing_card_spade_Q.svg')";
			break;
		  default:
			break;
		}
		break;
	  case 13:
		switch(dealerFirstY){
		  case 1:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/2/22/Playing_card_club_K.svg')";
			break;
		  case 2:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/7/78/Playing_card_diamond_K.svg')";
			break;
		  case 3:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/d/dc/Playing_card_heart_K.svg')";
			break;
		  case 4:
			z[0].style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/9/9f/Playing_card_spade_K.svg')";
			break;
		  default:
			break;
		}
		break;
	}
  }

  //dealing with the question with the ace
  Ace(){
	PVA = 0;
	for(var i = 0; i < numOfAce; i++){
	  var x = confirm("Your card value without the Ace is: " +(PVNA+PVA) + "\nPress \"Ok\" to make the Ace count as 11, and have a value of: " + (PVNA+PVA+11) + "\nPress \"Cancel\" to make the Ace count as 1, and have a value of: " + (PVNA+PVA+1));
	  if(x == true){
		PVA += 11;
	  }
	  else{
		PVA += 1;
	  }bet = prompt("Enter the amount of money you would like to bet\nThe default bet is 10.", 10);
	}
	playerValue = PVA + PVNA;
  }

  //places the bet
  Bet(){
	if(money <= 0){
	  GameEnd();
	}
	bet = 0;
	bet = prompt("Enter the amount of money you would like to bet\nThe default bet is 10.", 10);
	if(bet == null){
	  bet = 10;
	}
	if(bet > money){
	  alert("You don't have this amount of money");
	  Bet();
	}
  }

  //called when the player loses all money
  GameEnd(){
	alert("You've lost all your money.\nStarting new game.");
	money = 100;
	player1.updateScore("BlackJack", 100);

  }

}
