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
		console.log(winner);
		console.log(loser);
		if (winner) {
			console.log("in");
			winner.updateScore(this.name, this.scorePenalty);
			loser.updateScore(this.name, -this.scorePenalty);
		}
		console.log("out");
	}



}	
