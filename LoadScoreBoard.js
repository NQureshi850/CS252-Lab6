function updateScoreBoard() {
	var blackjackBoard = new ScoreBoard("BlackJack", function(serverscores) {
		console.log("scores: ");
		var usernames = [];
		var scores = [];
		
		var i = 0;
		for (var name in serverscores) {
			usernames[i] = name;
			scores[i] = serverscores[name];
			i++;	
		}
		var tempScore;
		var tempName;
		for (var x = 0; x < scores.length; x++) {
			for (var y = 0; y < scores.length; y++) {
				if ( scores[y] < scores[x]) {
					tempScore = scores[x];
					tempName = usernames[x];
					scores[x] = scores[y];
					usernames[x] = usernames[y];
					scores[y] = tempScore;
					usernames[y] = tempName;
				} 
			}
		}
		var BlackJackBoard = document.getElementById("BlackJack");
		for (var i = 0; i < 3; i++) {
			var row = BlackJackBoard.rows[i+1];
			row.cells[1].innerHTML = usernames[i];
			row.cells[2].innerHTML = scores[i];
		}
	});
	var mineBoard = new ScoreBoard("Mine", function(serverscores) {
		console.log("scores: ");
		var usernames = [];
		var scores = [];
		
		var i = 0;
		for (var name in serverscores) {
			usernames[i] = name;
			scores[i] = serverscores[name];
			i++;	
		}
		var tempScore;
		var tempName;
		for (var x = 0; x < scores.length; x++) {
			for (var y = 0; y < scores.length; y++) {
				if ( scores[y] < scores[x]) {
					tempScore = scores[x];
					tempName = usernames[x];
					scores[x] = scores[y];
					usernames[x] = usernames[y];
					scores[y] = tempScore;
					usernames[y] = tempName;
				} 
			}
		}
		var MineSweeperBoard = document.getElementById("Mine");
		for (var i = 0; i < 3; i++) {
			var row = MineSweeperBoard.rows[i+1];
			row.cells[1].innerHTML = usernames[i];
			row.cells[2].innerHTML = scores[i];
		}

	});
	var numberBoard = new ScoreBoard("TestGameAI", function(serverscores) {
		console.log("scores: ");
		var usernames = [];
		var scores = [];
		
		var i = 0;
		for (var name in serverscores) {
			usernames[i] = name;
			scores[i] = serverscores[name];
			i++;	
		}
		var tempScore;
		var tempName;
		for (var x = 0; x < scores.length; x++) {
			for (var y = 0; y < scores.length; y++) {
				if ( scores[y] < scores[x]) {
					tempScore = scores[x];
					tempName = usernames[x];
					scores[x] = scores[y];
					usernames[x] = usernames[y];
					scores[y] = tempScore;
					usernames[y] = tempName;
				} 
			}
		}
		var TestBoard = document.getElementById("TestGameAI");
		for (var i = 0; i < 3; i++) {
			var row = TestBoard.rows[i+1];
			row.cells[1].innerHTML = usernames[i];
			row.cells[2].innerHTML = scores[i];
		}
	});
}

$( document ).ready(function() {
	updateScoreBoard();
	setInterval(updateScoreBoard, 5000);
});
	
