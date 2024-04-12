const express = require("express");
const userControllers = require("../../controllers/users/index");
const authenticate = require("../../middleware/authenticate");
const verifyRoleHierarchy = require("../../middleware/verifyRoleHierarchy");
const validateData = require("../../middleware/validateData");
const { emailSchema } = require("../../schemas/email");

const router = express.Router();

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список пользователей
 *       401:
 *         description: Неавторизован
 */
router.get("/", authenticate, userControllers.getAllUsers);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Данные пользователя
 *       404:
 *         description: Пользователь не найден
 */
router.get("/:userId", authenticate, userControllers.getUserById);

/**
 * @swagger
 * /api/users/{userId}/role:
 *   patch:
 *     summary: Изменить роль пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Роль изменена
 *       403:
 *         description: Недостаточно прав
 */
router.patch(
  "/:userId/role",
  authenticate,
  verifyRoleHierarchy,
  userControllers.changeRole
);

/**
 * @swagger
 * /api/users/{userId}/email:
 *   patch:
 *     summary: Изменить email пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       200:
 *         description: Email изменен
 *       403:
 *         description: Недостаточно прав
 */
router.patch(
  "/:userId/email",
  authenticate,
  verifyRoleHierarchy,
  validateData(emailSchema),
  userControllers.changeEmail
);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь удален
 *       403:
 *         description: Недостаточно прав
 */
router.delete(
  "/:userId",
  authenticate,
  verifyRoleHierarchy,
  userControllers.deleteUser
);

module.exports = router;
