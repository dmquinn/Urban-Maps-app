const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: "5ff840400bbbb7199c646712",
			location: `${cities[random1000].city},${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url:
						"https://res.cloudinary.com/danielmurphy/image/upload/v1610367039/YelpCamp/y6f52ooirt4itioggee8.jpg",
					filename: "YelpCamp/y6f52ooirt4itioggee8",
				},
				{
					url:
						"https://res.cloudinary.com/danielmurphy/image/upload/v1610367034/YelpCamp/lmxtjquhfxnt2t5ee6t0.jpg",
					filename: "YelpCamp/lmxtjquhfxnt2t5ee6t0",
				},
			],
			description:
				"A campsite or camping pitch is a place used for overnight stay in an outdoor area. ... In American English, the term campsite generally means an area where an individual, family, group, or military unit can pitch a tent or park a camper; a campground may contain many campsites.",
			price,
			geometry: {
				type: "Point",
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude,
				],
			},
		});
		await camp.save();
	}
};
seedDB().then(() => {
	mongoose.connection.close();
});
