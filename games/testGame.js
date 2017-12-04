class TestGame extends Game {
	constructor(player1, player2) {
		super("TestGame", player1, player2);		
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
			if (firstPlayerAction > secondPlayerAction) 
			{
				this.end(this.player1, this.player2);
				shouldContinue = false;
			}
			else if (firstPlayerAction < secondPlayerAction)
			{
				this.end(this.player2, this.player1);
				shouldContinue = false;
			}
		}
	}

	requestTurn(player) {
		var number = prompt(player.username);
		return number
	}
}

