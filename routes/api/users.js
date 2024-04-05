const express = require("express");
const userControllers = require("../../controllers/users/index");
const authenticate = require("../../middleware/authenticate");
const verifyRoleHierarchy = require("../../middleware/verifyRoleHierarchy");

const router = express.Router();

router.get("/", authenticate, userControllers.getAllUsers);

router.get("/:userId", authenticate, userControllers.getUserById);

router.patch("/:userId/role", authenticate, verifyRoleHierarchy, userControllers.updateRole);

router.delete("/:userId", authenticate, verifyRoleHierarchy, userControllers.deleteUser);

module.exports = router;
