const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  path: String,
  alt: String,
});

const ArrayItemSchema = new Schema({
  title: String,
  descr: String,
  img: String,
  alt: String,
});

const TabSchema = new Schema({
  title: String,
  name: String,
  imagesArr: [ImageSchema],
});

// Hero Section
const HeroSchema = new Schema({
  show: Boolean,
  title: String,
  descr: String,
  img: String,
  altText: String,
  btn: String,
});

const Hero = mongoose.model("Hero", HeroSchema);

// About Us Section
const AboutUsSchema = new Schema({
  show: Boolean,
  array: [ArrayItemSchema],
});

const AboutUs = mongoose.model("AboutUs", AboutUsSchema);

const ServicesSchema = new Schema({
  show: Boolean,
  title: String,
  array: [ArrayItemSchema],
});

const Services = mongoose.model("Services", ServicesSchema);

const LastWorksSchema = new Schema({
  show: Boolean,
  title: String,
  tabs: [TabSchema],
});

const LastWorks = mongoose.model("LastWorks", LastWorksSchema);

const PrefsSchema = new Schema({
  show: Boolean,
  title: String,
  array: [ArrayItemSchema],
});

const Prefs = mongoose.model("Prefs", PrefsSchema);

module.exports = {
  Hero,
  AboutUs,
  Services,
  LastWorks,
  Prefs,
};
