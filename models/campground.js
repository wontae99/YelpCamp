const mongoose = require("mongoose");
const Review = require('./review');
const Schema = mongoose.Schema;

// https://res.cloudinary.com/demo/image/upload/c_crop,g_face,h_250,w_400/r_max/c_scale,w_200/lady.jpg
const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual('thumbnail').get(function() {
  return this.url.replace('/upload', '/upload/h_200');
});

const opts = { toJSON: { virtuals: true }};

const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
],
properties: {
  
}
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
  return `<strong><a class="pop-up" href="/campgrounds/${this._id}">${this.title}</a><strong>`
});

CampgroundSchema.post('findOneAndDelete', async function(doc){
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
