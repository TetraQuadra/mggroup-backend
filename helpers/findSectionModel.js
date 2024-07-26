const {
  Hero,
  AboutUs,
  Services,
  LastWorks,
  Prefs,
} = require("../models/article");

const findSectionModel = (section) => {
  switch (section) {
    case "hero":
      return Hero;
    case "about-us":
      return AboutUs;
    case "services":
      return Services;
    case "last-works":
      return LastWorks;
    case "prefs":
      return Prefs;
    default:
      return null;
  }
};

module.exports = findSectionModel;
