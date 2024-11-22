/* ----------------------------------------------------------- */
/* ------------------------ Packages ------------------------- */
/* ----------------------------------------------------------- */

// imports dotenv package and loads environment variable(s)
const dotenv = require("dotenv");
dotenv.config();

// imports express and nests in variable for easy use
const express = require("express");
const app = express();

/* NOTE: app essentially equals require("express")(), which would also work in place of any instance of the app variable, but this way makes the code more readable and maintainable */

// imports mongoose to interface with MongoDB
const mongoose = require("mongoose");

// imports method-override to allow UPDATE and DELETE HTTP reqs
const methodOverride = require("method-override");

// imports morgan for better HTTP request logging
const morgan = require("morgan");

// imports native path package to access static files
const path = require("path");

/* ----------------------------------------------------------- */
/* ------------------------ Controllers ---------------------- */
/* ----------------------------------------------------------- */

// imports controllers from ctrl dir (with models nested inside)
const playerCtrl = require("./controllers/player.js");
const recordCtrl = require("./controllers/record.js");

/* ----------------------------------------------------------- */
/* ----------------------- Middleware ------------------------ */
/* ----------------------------------------------------------- */

/* This middleware parses incoming HTTP request bodies, extracts data into a JavaScript object as "req.body" */
app.use(express.urlencoded({ extended: false }));

// directs express to use more installed middleware
app.use(methodOverride("_method"));
app.use(morgan("dev"));

// defines static path for CSS styling, image dir, etc
app.use(express.static(path.join(__dirname, "public")));

/* ----------------------------------------------------------- */
/* ------------------------ Database ------------------------- */
/* ----------------------------------------------------------- */

// connects to MongoDB using the connection string in .env file
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
	console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

/* ----------------------------------------------------------- */
/* -------------------------- Server ------------------------- */
/* ----------------------------------------------------------- */

// connects to MongoDB using the connection string in .env file
mongoose.connect(process.env.MONGODB_URI);

// easily modifiable server port
const PORT = 3002;

// connecting express to server port
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

/* ----------------------------------------------------------- */
/* --------------------------- HTTP -------------------------- */
/* ----------------------------------------------------------- */

/* CONTROLLER SHORTCUTS 

// player
playerCtrl.index
playerCtrl.show
playerCtrl.new
playerCtrl.create
playerCtrl.edit
playerCtrl.update
playerCtrl.remove
playerCtrl.destroy

// record
recordCtrl.leader
recordCtrl.index
recordCtrl.show
recordCtrl.new
recordCtrl.create
recordCtrl.edit
recordCtrl.update
recordCtrl.remove
recordCtrl.destroy

*/

/* --------- */
/* HOME PAGE */
/* --------- */

// GET req; homepage, "/"
app.get("/", (req, res) => {
	res.render("home.ejs");
});

/* -------------- */
/* DRAGON'S HOARD */
/* -------------- */

// to be imported (and given cross-functionality with record CRUD)

/* ------------- */
/* DEN OF HEROES */
/* ------------- */

// all players index page
app.get("/heroes", playerCtrl.index);

// new player profile form page
app.get("/heroes/new", playerCtrl.new);

// back-end profile creation
app.post("/heroes", playerCtrl.create);

// profile show pages
app.get("/heroes/:playerId", playerCtrl.show);

// delete profile confirmation page
app.get("/heroes/:playerId/delete", playerCtrl.remove);

// back-end profile deletion
app.delete("/heroes/:playerId", playerCtrl.destroy);

// edit profile form page
app.get("/heroes/:playerId/edit", playerCtrl.edit);

// back-end profile update
app.put("/heroes/:playerId", playerCtrl.update);

/* ----------------- */
/* HALL OF CHAMPIONS */
/* ----------------- */

// leaderboard splash page (links to user show pages)
app.get("/champions", recordCtrl.leader);

/* NOTE: might be smart to create diff controllers for records and leaderboards if you build out the functionality of the latter, but for now this is fine since it's just one page */

// all records index page
app.get("/champion/records", recordCtrl.index);

// new record form page
app.get("/champions/records/new", recordCtrl.new);

// back-end record creation
app.post("/champions/records", recordCtrl.create);

// record show pages
app.get("/champions/records/:recordId", recordCtrl.show);

// delete record confirmation page
app.get("/champions/records/:recordId/delete", recordCtrl.remove);

// back-end record deletion
app.delete("/champions/records/:recordId", recordCtrl.destroy);

// edit record form page
app.get("/champions/records/:recordId/edit", recordCtrl.edit);

// back-end record update
app.put("/champions/records/:recordId", recordCtrl.update);
