class TestGameAI extends Game {
	constructor(player1, player2) {
		super("TestGameAI", player1, player2);		
		this.scorePenalty = 100; 
	}

	start() {
		super.start();
		this.runGame();
	}

	runGame() {
		var shouldContinue = true;
		while(shouldContinue) 
		{
			var firstPlayerAction = this.requestTurn(this.player1);
			var secondPlayerAction = this.requestTurn(this.player2);
			if ( ((firstPlayerAction + secondPlayerAction) % 3) == 0 ) 
			{
				console.log(this.player1.username + " wins");
				this.end(this.player1, this.player2);
				shouldContinue = false;
			}
			else if ( ((firstPlayerAction + secondPlayerAction ) % 3) == 1)
			{
				console.log(this.player2.username + " wins");
				this.end(this.player2, this.player1);
				shouldContinue = false;
			}
		}
	}

	requestTurn(player) {
		if(player instanceof AI) 
		{
			// player is an AI
			return player.pickRandomOption(3);
		}
		else
		{
			// player is human
			var number = prompt(player.username);
			return number
		}
	}
}

