const Hero = require("../../models/article").Hero;
const AboutUs = require("../../models/article").AboutUs;
const Services = require("../../models/article").Services;
const LastWorks = require("../../models/article").LastWorks;
const Prefs = require("../../models/article").Prefs;

const getAllArticles = async (req, res, next) => {
  try {
    const hero = await Hero.find();
    const aboutUs = await AboutUs.find();
    const services = await Services.find();
    const lastWorks = await LastWorks.find();
    const prefs = await Prefs.find();

    res.status(200).json({
      hero,
      aboutUs,
      services,
      lastWorks,
      prefs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllArticles;
