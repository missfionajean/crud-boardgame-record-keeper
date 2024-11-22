// imports mongoose package
const mongoose = require("mongoose");

// sets format for game record database entry
const gameRecord = new mongoose.Schema({
    gameDate:String,
	gameName: String,
	gameWinners: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
	runnersUp: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
	memories: String,
});

// exports model for use in other files
module.exports = mongoose.model("greendragon", gameRecord);

/* REFERENCE:
gameDate = date for game, mm/dd/yy (reverse array when displaying)
gameName = name of board game (will ref the hoard - but not now)
gameWinners = array of user(s) who will receive 2 exp pts
runnersUp = array of user(s) who will receive 1 exp pt
memories = textarea input to write down notable moments (to be read when going through all-games section of Hall of Champions)
*/
