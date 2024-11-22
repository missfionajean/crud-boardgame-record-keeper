// imports mongoose package
const mongoose = require("mongoose");

// sets format for game record database entry
const playerProfile = new mongoose.Schema({
	playerName: String,
	playerTitle: String,
	playerRank: String,
	playerAvatar: String,
	playerExp: { type: Number, default: 0 },
});

// exports model for use in other files
module.exports = mongoose.model("greendragon", playerProfile);

/* REFERENCE:
playerName = first name of user
playerTitle = adjective chosen by user
playerRank = guild rank (advances through a list - TBD)
playerAvatar = image src based on user color choise
playerExp = number increased after each game (1pt for playing, 1pt for winning - as of right now), determines guild rank
*/
