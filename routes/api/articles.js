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

/**
 * @swagger
 * /api/articles/all:
 *   get:
 *     summary: Retrieve a list of all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: A list of articles
 */
router.get("/", articleControllers.getAllArticles);

/**
 * @swagger
 * /api/articles/{section}:
 *   get:
 *     summary: Retrieve an article by section
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: section
 *         required: true
 *         schema:
 *           type: string
 *         description: The section of the article
 *     responses:
 *       200:
 *         description: An article
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/LastWorksSchema'
 *                 - $ref: '#/components/schemas/HeroSchema'
 *                 - $ref: '#/components/schemas/AboutUsSchema'
 *                 - $ref: '#/components/schemas/ServicesSchema'
 *                 - $ref: '#/components/schemas/PrefsSchema'
 *       404:
 *         description: Article not found
 */
router.get("/:section", articleControllers.getArticle);

/**
 * @swagger
 * /api/articles/{section}:
 *   post:
 *     summary: Create or update an article in a section
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: section
 *         required: true
 *         schema:
 *           type: string
 *         description: The section of the article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/HeroSchema'
 *               - $ref: '#/components/schemas/AboutUsSchema'
 *               - $ref: '#/components/schemas/ServicesSchema'
 *               - $ref: '#/components/schemas/LastWorksSchema'
 *               - $ref: '#/components/schemas/PrefsSchema'
 *     responses:
 *       201:
 *         description: Article created/updated
 *       400:
 *         description: Invalid input
 */
router.post(
  "/:section",
  validateArticle((req) => {
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

/**
 * @swagger
 * /api/articles/{section}:
 *   delete:
 *     summary: Delete an article by section
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: section
 *         required: true
 *         schema:
 *           type: string
 *         description: The section of the article
 *     responses:
 *       200:
 *         description: Article deleted
 *       404:
 *         description: Article not found
 */
router.delete("/:section", articleControllers.deleteArticle);

module.exports = router;
