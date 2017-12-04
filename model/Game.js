class Game {
	constructor(gameName, player1, player2) {
		this.name = gameName;
		this.player1 = player1;
		this.player2 = player2;
		this.scorePenalty = 0;
	}

	start() {
		// Placeholder for generic start code
		console.log("Start Game");
	}

	end(winner, loser) {
		console.log("End Game");
		console.log("winner: " + winner.username);
		console.log("loser: " + loser.username);
		if (winner && loser) 
		{
			if (winner instanceof User)
			{
				winner.updateScore(this.name, this.scorePenalty);
			}
			if (loser instanceof User)
			{
				loser.updateScore(this.name, -this.scorePenalty);
			}	
		}
	}



}	
