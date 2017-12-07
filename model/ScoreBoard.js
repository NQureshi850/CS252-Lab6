class ScoreBoard {
	constructor(gameName, callback) {
		this.game = gameName;

		//Map of {player : score}
		this.scores;
		this.getScores(callback);
	}

	getScores(callback) {
		fetch("http://data.cs.purdue.edu:5001/getScoresForGame", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"	
			},
			body: JSON.stringify({	
				game: this.game
			})
		}).then(function(response) {
			if (response.ok) {
				return response.json();
			}
			throw new Error("Network response was not ok");
		}).then(function(data) {
				this.scores = data.scores;
				console.log(this.game);
				console.log(this.scores);
				var score;
				for (var username in this.scores) {
					console.log(username + this.scores[username]);
				}
				callback(this.scores);
		}.bind(this));
	}
}
