// imports mongoose package
const mongoose = require("mongoose");

// sets format for game record database entry
const playerProfile = new mongoose.Schema({
	playerName: String,
	playerTitle: String,
	playerColor: String,
	playerAvatar: String,
	playerStrengths: [String],
	playerFaves: String,
});

// exports model for use in other files
module.exports = mongoose.model("Player", playerProfile);
