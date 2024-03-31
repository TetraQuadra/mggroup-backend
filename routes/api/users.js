const express = require("express");
const userControllers = require("../../controllers/users/index");
const authenticate = require("../../middleware/authenticate");

const router = express.Router();

router.get("/", authenticate, userControllers.getAllUsers);

router.get("/current", authenticate, userControllers.getCurrent);

router.get("/:userId", authenticate, userControllers.getUserById);

router.patch("/:userId/role", authenticate, userControllers.updateRole);

router.delete("/:userId", authenticate, userControllers.deleteUser);

module.exports = router;
