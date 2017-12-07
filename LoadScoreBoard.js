

$( document ).ready( function() {
	var blackjackBoard = new ScoreBoard("BlackJack", function() {
		document.getElementById("score");

	});
	var mineBoard = new ScoreBoard("Mine");
	var numberBoard = new ScoreBoard("TestGameAI");

	document.getElementById("score");
});

