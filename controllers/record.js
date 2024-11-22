// import database models for proper schema format
const Record = require("../models/record.js");
const Player = require("../models/player.js");

/* INCREMENT FUNCTIONS (FOR EXP & GAMES PLAYED) */

// playerExp = 2pts for win, 1pt for loss
// gamesPlayed = 1pt regardless (for weighting only)

const addWin = async (player) => {
	player.playerExp += 2;
	player.gamesPlayed += 1;
	await player.save();
};

const addLoss = async (player) => {
	player.playerExp += 1;
	player.gamesPlayed += 1;
	await player.save();
};

const subtractWin = async (player) => {
	player.playerExp -= 2;
	player.gamesPlayed -= 1;
	await player.save();
};

const subtractLoss = async (player) => {
	player.playerExp -= 1;
	player.gamesPlayed -= 1;
	await player.save();
};

/* LEADERBOARD */

// display all-time leaderboard as HoC splash page
const leader = async (req, res) => {
	// grab all player profiles from database
	const allPlayers = await Player.find();
	// sorts by most to least exp
	await allPlayers.sort((a, b) => {
		return b.playerExp.localeCompare(a.playerExp);
	});
	// renders show page with local object variables
	res.render("records/leader.ejs", { players: allPlayers });
};

// can add sub-controllers later for extra filtering

/* VIEW RECORDS */

// display all records page
const index = async (req, res) => {
	// grab all records from database
	const allRecords = await Record.find();
	// sorts by date played (not date entered), new -> old
	await allRecords.sort((a, b) => {
		return b.gameDate.localeCompare(a.gameDate);
	});
	// renders index page that pulls in above data
	res.render("records/index.ejs", { records: allRecords });
};

// display show page for single game record
const show = async (req, res) => {
	// grabs clicked record info to populate show page
	const chosenRecord = await Record.findById(req.params.recordId);
	// renders show page with local object variables
	res.render("records/show.ejs", chosenRecord);
};

/* ADD NEW RECORD */

// display add record form
const add = (req, res) => {
	res.render("records/add.ejs");
};

// create new record in database (back-end only)
const create = async (req, res) => {
	// await DB record creation before moving on
	const newRecord = await Record.create(req.body);
	// only IDs will be added to arrays, so we must populate
	await newRecord.populate();
	// loop to update player exp and games played (winners)
	await newRecord.gameWinners.forEach((player) => {
		addWin(player);
	});
	// same loop for losing array
	await newRecord.runnersUp.forEach((player) => {
		addLoss(player);
	});
	// redirect to show page for new record
	res.redirect(`/champions/records/${newRecord._id}`);
};

/* EDIT EXISTING PROFILE */

// display edit profile form (pre-filled)
const edit = async (req, res) => {
	// grabs clicked record info to populate edit page
	const chosenRecord = await Record.findById(req.params.recordId);
	// renders edit page with local object variables
	res.render("records/edit.ejs", chosenRecord);
};

// update profile in database (back-end only)
const update = async (req, res) => {
	/* removes previous exp given */
	// locate chosen record to remove associated exp pts
	const chosenRecord = await Record.findById(req.params.recordId);
	// only IDs will be added to arrays, so we must populate
	await chosenRecord.populate();
	// loop to update player exp and games played (winners)
	await chosenRecord.gameWinners.forEach((player) => {
		subtractWin(player);
	});
	// same loop for losing array
	await chosenRecord.runnersUp.forEach((player) => {
		subtractLoss(player);
	});

	/* updates the record */
	// grab DB entry and updates properties on back end
	const updatedRecord = await Record.findByIdAndUpdate(
		req.params.recordId,
		req.body,
		{ new: true }
	);

	/* adds exp back in based on new info */
	// only IDs will be added to arrays, so we must populate
	await updatedRecord.populate();
	// loop to update player exp and games played (winners)
	await updatedRecord.gameWinners.forEach((player) => {
		addWin(player);
	});
	// same loop for losing array
	await updatedRecord.runnersUp.forEach((player) => {
		addLoss(player);
	});

	// redirect to show page for updated profile
	res.redirect(`/champions/records/${updatedRecord._id}`);
};

/* DELETE EXISTING PROFILE */

// displays delete confirm page (player summary + nav buttons)
const remove = async (req, res) => {
	// grab record info to populate confirmation page
	const chosenRecord = await Record.findById(req.params.recordId);
	// render confirmation page with info + nav buttons
	res.render("records/remove.ejs", chosenRecord);
};

// deletes player profile (back-end only)
const destroy = async (req, res) => {
	// locate chosen record to remove associated exp pts
	const chosenRecord = await Record.findById(req.params.recordId);
	// only IDs will be added to arrays, so we must populate
	await chosenRecord.populate();
	// loop to update player exp and games played (winners)
	await chosenRecord.gameWinners.forEach((player) => {
		subtractWin(player);
	});
	// same loop for losing array
	await chosenRecord.runnersUp.forEach((player) => {
		subtractLoss(player);
	});
	// finally, grab DB entry and deletes on the back-end
	await Record.findByIdAndDelete(req.params.recordId);
	// redirect to all records page after back-end delete
	res.redirect("/champions/records");
};

/* EXPORT */

module.exports = {
	leader,
	index,
	show,
	add,
	create,
	edit,
	update,
	remove,
	destroy,
};
