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
recordCtrl.index
recordCtrl.show
recordCtrl.new
recordCtrl.create
recordCtrl.edit
recordCtrl.update
recordCtrl.remove
recordCtrl.destroy

*/

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

/* MAIN INDEX */

// GET req; homepage, "/"
app.get("/", (req, res) => {
	res.render("home.ejs");
});
