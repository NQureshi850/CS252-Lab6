class Game {
	constructor(gameName) {
		this.name = gameName;
		this.playerCount = 0;
		this.players = [];
	}

	addPlayer(callback) {
		var name = prompt("Enter your username");
		var player = new User(name, this.name, function() {
			this.players[this.playerCount] = player;	
			this.playerCount++;	
			// Return index of player in this.players
			callback(player);
		}.bind(this));

		console.log("Added User:");
		console.log(player);

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
		if (player) {
			// Test to see if changes are duplicated in this.players
			player.score = parseInt(player.score) + parseInt(scoreChange);
			console.log(player.username + "'s score increased by " + scoreChange + " to new score of " + player.score);  
		}
	}

	decreasePlayerScore(player, scoreChange) {
		if (player) {
			// Test to see if changes are duplicated in this.players
			player.score = player.score - parseInt(scoreChange);
			console.log(player.username + "'s score decreased by " + scoreChange + " to new score of " + player.score);  
		}
	}

	end() {
		// Send score updates to server for each player
		for (var i in this.players) {
			var player = this.players[i];
			if (player instanceof User) {
				player.updateScore(this.name);
			}
		}
	}
}	
