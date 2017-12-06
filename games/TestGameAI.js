class TestGameAI extends Game {
	constructor() {
		super("TestGameAI");		
		this.scorePenalty = 100; 
		this.player1 = this.addPlayer();
		this.ai = this.addAI();
	}

	start() {
		super.start();
		this.runGame();
	}

	runGame() {
		var shouldContinue = true;
		while(shouldContinue) 
		{
			var playerAction = this.requestTurn(this.player1);
			var aiAction = this.requestTurn(this.ai);
			if ( ((playerAction + aiAction) % 3) == 0 ) 
			{
				console.log(this.player1.username + " wins");
				this.increasePlayerScore(this.player1, this.scorePenalty);
				this.end(this.player1);
				shouldContinue = false;
			}
			else if ( ((playerAction + aiAction ) % 3) == 1)
			{
				console.log(this.ai.username + " wins");
				this.decreasePlayerScore(this.player1, this.scorePenalty);
				this.end(this.ai);
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

var game = new TestGameAI();
game.start();
