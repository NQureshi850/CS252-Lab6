class AI {
	constructor() {
		this.username = "Steve";
	}

	// Picks a number from 0 to max - 1
	pickRandomOption(max) {
		return Math.floor(Math.random() * max);
	}

	// Picks an option using a list of probabilities for each option
	// Probablities in weights must be a multiple of 0.01
	pickWeightedRandomOption(options, weights) {
		var weightedList = [];

		// Loop over weights
		for (var i = 0; i < weights; i++) {
			var multiples = weights[i] * 100;

			// Loop over the list of options
			for (var j = 0; j < multiples; j++) {
				weightedList.push(options[i]);
			}
		}

		// Choose a random option from weightedList
		var random = Math.floor(Math.random() * weightedList.length);
		var choice = weightedList[random];
		return choice;
	}
}
