class ScoreBoard {
	constructor(gameName) {
		this.game = gameName;

		//Map of {player : score}
		this.scores;
		this.getScores();
	}

	getScores() {
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
		}.bind(this));
	}
}
