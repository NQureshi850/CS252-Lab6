//The javaScript Code
var player1 = new User("Person1");
//var player2 = new User("Person2");
//var player1 = new AI();
var player2 = new AI();
var currentGame = new TestGameAI(player1, player2);
currentGame.start();
