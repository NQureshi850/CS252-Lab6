class User {
	constructor(username, gameName) {
		this.score = 0;
		this.username = username;
		this.getUserData = this.getUserData.bind(this);
		this.getUserData(gameName);
		console.log("Player Created");
		console.log(this);
	}

	getUserData(game) {
		fetch("http://localhost:5001/getUser", {
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
			if (this.username = data.username) {

				this.score = data.score;
				console.log(this.score);
			}
		}.bind(this));
	}

	updateScore(gameName, scoreChange) {
		fetch("http://localhost:5001/updateScore", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"	
			},
			body: JSON.stringify({
				username: this.username,	
				game: gameName,
				score: scoreChange
			})
		}).then(function(response) {
			if (response.ok) {
				return response.json();
			}
			throw new Error("Network response was not ok");
		});
	}
}
