const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const { campgroundSchema } = require("../schemas.js");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const ExpressError = require("../utilities/expressError");
const { storage } = require("../cloudinary");
const multer = require("multer");
const upload = multer({ storage });

router
	.route("/")
	.get(catchAsync(campgrounds.index))
	.post(
		isLoggedIn,
		upload.array("image"),
		validateCampground,
		catchAsync(campgrounds.createCampground)
	);
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
	.route("/:id")
	.get(catchAsync(campgrounds.showCampground))
	.put(
		isLoggedIn,
		isAuthor,
		upload.array("image"),
		validateCampground,
		catchAsync(campgrounds.updateCampground)
	)
	.delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
	"/:id/edit",
	isAuthor,
	isLoggedIn,
	catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
