// import database model for proper schema format
const Player = require("../models/player.js");

/* VIEW PROFILES */

// display all players page
const index = async (req, res) => {
	// grab all player profiles from database
	const allPlayers = await Player.find();
	// sorts alphabetically
	await allPlayers.sort((a, b) => {
		return a.playerName.localeCompare(b.playerName);
	});
	// renders index page that pulls in above data
	res.render("players/index.ejs", { players: allPlayers });
};

// display show page for single player profile
const show = async (req, res) => {
	// grabs clicked player info to populate show page
	const chosenPlayer = await Player.findById(req.params.playerId);
	// renders show page with local object variables
	res.render("players/show.ejs", chosenPlayer);
};

/* ADD NEW PROFILE */

// display add profile form
const add = (req, res) => {
	res.render("players/add.ejs");
};

// create new profile in database (back-end only)
const create = async (req, res) => {
	/* finish filling model for proper DB interaction */
	// storing passed value from form in variable
	const color = req.body.playerColor
	// assign an image to profile based on color
	req.body.playerAvatar = "/images/" + color + ".png"
	// update playerColor to hexcode format
	req.body.playerColor = "#" + color

	/* adding completed model to MongoDB */
	// await DB profile creation before redirect
	const newPlayer = await Player.create(req.body);
	// redirect to show page for new profile
	res.redirect(`/heroes/${newPlayer._id}`);
};

/* EDIT EXISTING PROFILE */

// display edit profile form (pre-filled)
const edit = async (req, res) => {
	// grabs clicked player info to populate edit page
	const chosenPlayer = await Player.findById(req.params.playerId);
	// renders edit page with local object variables
	res.render("players/edit.ejs", chosenPlayer);
};

// update profile in database (back-end only)
const update = async (req, res) => {
	/* finish filling model for proper DB interaction */
	// storing passed value from form in variable
	const color = req.body.playerColor
	// assign an image to profile based on color
	req.body.playerAvatar = "/images/" + color + ".png"
	// update playerColor to hexcode format
	req.body.playerColor = "#" + color

	/* updating completed model in MongoDB */
	// grab DB entry and updates properties on back end
	const chosenPlayer = await Player.findByIdAndUpdate(
		req.params.playerId,
		req.body
	);
	// redirect to show page for updated profile
	res.redirect(`/heroes/${chosenPlayer._id}`);
};

/* DELETE EXISTING PROFILE */

// displays delete confirm page (player summary + nav buttons)
const remove = async (req, res) => {
	// grabs player info to populate confirmation page
	const chosenPlayer = await Player.findById(req.params.playerId);
	// renders confirmation page with info + nav buttons
	res.render("players/remove.ejs", chosenPlayer);
};

// deletes player profile (back-end only)
const destroy = async (req, res) => {
	// grab DB entry and updates properties on back end
	await Player.findByIdAndDelete(req.params.playerId);
	// redirect to all profiles page after back-end delete
	res.redirect("/heroes");
};

/* TEST */
const test = (req, res) => {
	console.log(req.body)
}


/* EXPORT */

module.exports = {
	index,
	show,
	add,
	create,
	edit,
	update,
	remove,
	destroy,
	test
};
