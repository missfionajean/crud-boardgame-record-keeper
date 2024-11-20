/* ----------------------------------------------------------- */
/* ------------------------ Packages ------------------------- */
/* ----------------------------------------------------------- */

// imports dotenv package and loads environment variable(s)
const dotenv = require("dotenv");
dotenv.config();

// imports express and nests in variable for easy use
const express = require("express");
const app = express();

// imports mongoose to interface with MongoDB
const mongoose = require("mongoose");

// imports method-override to allow UPDATE and DELETE HTTP reqs
const methodOverride = require("method-override");

// imports morgan for better HTTP request logging
const morgan = require("morgan");

// imports native path package to access static files
const path = require("path");

/* ----------------------------------------------------------- */
/* ----------------------- Express.use ----------------------- */
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

// imports data models to format info for MongoDB interaction
const Record = require("./models/record.js")
const Player = require("./models/player.js")


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
	res.render("index.ejs");
});
