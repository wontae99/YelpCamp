const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

async function main() {
  await mongoose
    .connect("mongodb://localhost:27017/yelp-camp")
    .then(console.log("MONGO CONNECTION OPEN!"));
}
main().catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "632d275b85d7d492c5dd8f6c",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
          type: "Point",
          coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude,
          ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dajbfvkaj/image/upload/v1664058053/YelpCamp/qmcsitocf84aq5xelpdx.jpg",
          filename: "YelpCamp/qmcsitocf84aq5xelpdx",
        },
        {
          url: "https://res.cloudinary.com/dajbfvkaj/image/upload/v1664058054/YelpCamp/csnw4irzglypbs5l0shg.jpg",
          filename: "YelpCamp/csnw4irzglypbs5l0shg",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus voluptatem quo amet ducimus dolor expedita iste necessitatibus sequi, asperiores nisi cumque reprehenderit consequuntur iure animi laboriosam harum consectetur? Tenetur, officia.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
