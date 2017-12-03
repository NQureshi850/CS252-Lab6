
export class User {
	constructor(username) {
		this.score = 0;
		this.username = username;
		this.getUserData();


	}

	getUserData() {
		fetch("http://data.cs.purdue.edu/PLACEHOLDER") {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"	
			},
			body: JSON.stringify({
				username: this.username;	
			})
		}).then(function(response) {
			if (response.ok) {
				return response.json();
			}
			throw new Error("Network response was not ok");
		}).then(function(data) {
			for (let prop in data) {
				this.score = user["score"];
					
			}
		});
	}

	updateScore() {
		fetch("http://data.cs.purdue.edu/PLACEHOLDER") {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"	
			},
			body: JSON.stringify({
				username: this.username;	
				score: this.score;
			})
		}).then(function(response) {
			if (response.ok) {
				return response.json();
			}
			throw new Error("Network response was not ok");
		});
	}
}
