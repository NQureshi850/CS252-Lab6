class Game {
	constructor(gameName) {
		this.name = gameName;
		this.playerCount = 0;
		this.players = [];
	}

	addPlayer() {
		var name = prompt("Enter your username");
		var player = new User(name);
		this.players[this.playerCount] = player;	
		this.playerCount++;

		console.log("Added User:");
		console.log(player);

		// Return index of player in this.players
		return player;
	}

	addAI() {
		var ai = new AI();
		this.players[this.playerCount] = ai;
		this.playerCount++;

		console.log("Added AI:");
		console.log(ai);

		// Return index of ai in this.players
		return ai;
	}

	start() {
		// Placeholder for generic start code
		console.log("Start Game");
	}

	increasePlayerScore(player, scoreChange) {
		// Test to see if changes are duplicated in this.players
		player.score = player.score + scoreChange;
		console.log(player.username + "'s score increased by " + scoreChange + " to new score of " + player.score);  
		console.log(this.players)
	}

	decreasePlayerScore(player, scoreChange) {
		// Test to see if changes are duplicated in this.players
		player.score = player.score - scoreChange;
		console.log(player.username + "'s score decreased by " + scoreChange + " to new score of " + player.score);  
		console.log(this.players)
	}

	end(winner) {
		console.log("End Game");

		if (winner) {
			console.log("winner: " + winner.username);
			alert(winner.username + " Wins!");
		}

		// Send score updates to server for each player
		for (var i in this.players) {
			var player = this.players[i];
			console.log(player);
			if (player instanceof User) {
				player.updateScore(this.name, player.score);
			}
		}
	}
}	
