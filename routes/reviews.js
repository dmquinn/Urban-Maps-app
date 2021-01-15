const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/catchAsync");
const { reviewSchema } = require("../schemas.js");
const Campground = require("../models/campground");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const ExpressError = require("../utilities/expressError");
const Review = require("../models/review");
const reviews = require("../controllers/reviews");

router.post(
	"/",
	isLoggedIn,
	validateReview,

	catchAsync(reviews.createReview)
);
router.delete(
	"/:reviewId",
	isLoggedIn,
	isReviewAuthor,
	catchAsync(reviews.deleteReview)
);
module.exports = router;
