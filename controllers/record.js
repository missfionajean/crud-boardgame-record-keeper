// import database models for proper schema format
const Record = require("../models/record.js");
const Player = require("../models/player.js");

/* LEADERBOARD */

// display all-time leaderboard as HoC splash page
const leader = async (req, res) => {
	// grab all records and players from database
	const allRecords = await Record.find();
	const allPlayers = await Player.find();

	// sets up a map to track lifetime wins
	const winMap = new Map()

	// iterates through players to set map keys (value 0)
	allPlayers.forEach((player) => {
		winMap.set(player._id.toHexString(), {val: 0})
	})

	// parses all records for win counts (filterable later)
	allRecords.forEach((record) => {
		record.gameWinners.forEach((winner) => {
			try{winMap.get(winner).val++;}
			catch{console.log("Skipping non-existent player.")}
		})
	})

	// sorts all players by lifetime wins
	allPlayers.sort((a, b) => {
		return winMap.get(b._id.toHexString()).val - winMap.get(a._id.toHexString()).val;
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
	res.render("records/show.ejs", {record: chosenRecord});
};

/* ADD NEW RECORD */

// display add record form
const add = async (req, res) => {
	/* creating default date to populate input */
	// creates new date (default formatting)
	const date = new Date();
	// formats date string for use in HTML form
	const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

	/* grabbing list of players for local object  */
	// finds all players in database and stores in var
	const allPlayers = await Player.find();

	// renders add new record form with date as local var
	res.render("records/add.ejs", { date: today, players: allPlayers });
};

// create new record in database (back-end only)
const create = async (req, res) => {
	// await DB record creation before moving on
	const newRecord = await Record.create(req.body);
	// redirect to show page for new record
	res.redirect(`/champions/records/${newRecord._id}`);
};

/* EDIT EXISTING PROFILE */

// display edit profile form (pre-filled)
const edit = async (req, res) => {
	// grabs clicked record info to populate edit page
	const chosenRecord = await Record.findById(req.params.recordId);
	// finds all players in database and stores in var
	const allPlayers = await Player.find();
	// renders edit page with local object variables
	res.render("records/edit.ejs", { record: chosenRecord, players: allPlayers });
};

// update profile in database (back-end only)
const update = async (req, res) => {
	// grab DB entry and updates properties on back end
	const updatedRecord = await Record.findByIdAndUpdate(
		req.params.recordId,
		req.body,
		{ new: true }
	);
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
	// grabs DB entry and deletes on the back-end
	await Record.findByIdAndDelete(req.params.recordId);
	// redirect to all records page after back-end delete
	res.redirect("/champions/records");
};

/* TEST */
const test = (req, res) => {
	console.log(req.body);
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
	test,
};
