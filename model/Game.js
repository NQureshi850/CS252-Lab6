import User from "./User";
export class Game {
	constructor(gameName, player1, player2) {
		this.name = gameName;
		this.player1 = player1;
		this.player2 = player2;
		this.scorePenalty = 100;
		this.winner;
		this.loser;
	}

	end() {
		if (this.winner) {
			this.winner.updateScore(this.name, scorePenalty);
			this.loser.updateScore(this.name, -scorePenalty);
		}
	}



}	
