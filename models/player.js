// imports mongoose package
const mongoose = require("mongoose");

// sets format for game record database entry
const playerProfile = new mongoose.Schema({
	playerName: String,
	playerTitle: String,
	playerRank: String,
	playerAvatar: String,
	playerExp: { type: Number, default: 0 },
	gamesPlayed: { type: Number, default: 0 },
});

// exports model for use in other files
module.exports = mongoose.model("Player", playerProfile);

/* REFERENCE:
playerName = first name of user
playerTitle = adjective chosen by user
playerRank = guild rank (advances through a list - TBD)
playerAvatar = image src based on user color choice
playerExp = number increased after each game (1pt for playing, 1pt for winning - as of right now), determines guild rank
gamesPlayed = all-time games played, to be used for weighting later

NOTE: You can add in more properties later and update the database
*/
