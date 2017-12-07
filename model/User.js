class User {
	constructor(username, gameName) {
		this.score = 0;
		this.username = username;
		this.getUserData = this.getUserData.bind(this);
		this.updateScore = this.updateScore.bind(this);
		this.getUserData(gameName);
	}

	getUserData(game) {
		fetch("http://data.cs.purdue.edu:5001/getUser", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"	
			},
			body: JSON.stringify({
				username: this.username,	
				game: game
			})
		}).then(function(response) {
			if (response.ok) {
				return response.json();
			}
			throw new Error("Network response was not ok");
		}).then(function(data) {
				this.score = data.score;
		}.bind(this));
	}

	updateScore(gameName) {
		fetch("http://data.cs.purdue.edu:5001/updateScore", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"	
			},
			body: JSON.stringify({
				username: this.username,	
				game: gameName,
				score: this.score
			})
		}).then(function(response) {
			if (response.ok) {
				return response.json();
			}
			throw new Error("Network response was not ok");
		});
	}
}
