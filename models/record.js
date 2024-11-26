// imports mongoose package
const mongoose = require("mongoose");

// sets format for game record database entry
const gameRecord = new mongoose.Schema({
	gameDate: String,
	gameName: String,
	gameWinners: [String],
	runnersUp: [String],
	memories: String,
});

// exports model for use in other files
module.exports = mongoose.model("Record", gameRecord);

/* REFERENCE:
gameDate = date for game using html date input "yyyy-mm-dd"
gameName = name of board game (will ref the hoard - but not now)
gameWinners = array of players that will help populate leaderboard
runnersUp = array of other players, for general record keeping
memories = textarea input to write down notable moments (to be read when going through all-games section of Hall of Champions)
*/
