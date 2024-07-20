const express = require("express");
const articleControllers = require("../../controllers/article/index");
const validateArticle = require("../../middleware/validateArticle");
const router = express.Router();
const {
  HeroSchema,
  AboutUsSchema,
  ServicesSchema,
  LastWorksSchema,
  PrefsSchema,
} = require("../../schemas/article");

router.get("/all", articleControllers.getAllArticles);

router.get("/:section", articleControllers.getArticle);

router.post(
  "/:section",
  validateArticle((req) => {
    console.log(req.params.section);
    switch (req.params.section) {
      case "hero":
        return HeroSchema;
      case "about-us":
        return AboutUsSchema;
      case "services":
        return ServicesSchema;
      case "last-works":
        return LastWorksSchema;
      case "prefs":
        return PrefsSchema;
      default:
        return "not found";
    }
  }),
  articleControllers.postArticle
);

router.delete("/:section", articleControllers.deleteArticle);

module.exports = router;
