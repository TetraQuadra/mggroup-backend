const express = require("express");
const authControllers = require("../../controllers/auth/index");
const encryptPassword = require("../../middleware/encryptPassword");
const validateData = require("../../middleware/validateData");
const authenticate = require("../../middleware/authenticate");
const { emailSchema } = require("../../schemas/email");
const { userSchema } = require("../../schemas/user");

const router = express.Router();

/**
 * @swagger
 * /api/auth/:
 *   get:
 *     summary: Получить текущего пользователя
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Возвращает текущего пользователя
 *       401:
 *         description: Неавторизован
 */
router.get("/", authenticate, authControllers.getCurrentUser);

/**
 * @swagger
 * /api/auth/register/createRegisterToken:
 *   post:
 *     summary: Создать токен для регистрации
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Токен создан
 *       401:
 *         description: Неавторизован
 */
router.post(
  "/register/createRegisterToken",
  authenticate,
  authControllers.createRegisterToken
);

/**
 * @swagger
 * /api/auth/register/{registerToken}:
 *   post:
 *     summary: Регистрация пользователя
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: registerToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Токен для регистрации
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Пользователь зарегистрирован
 *       400:
 *         description: Неверные данные
 */
router.post(
  "/register/:registerToken",
  validateData(userSchema),
  encryptPassword,
  authControllers.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вход в систему
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверный логин или пароль
 */
router.post("/login", validateData(userSchema), authControllers.login);

/**
 * @swagger
 * /api/auth/verify/{verificationToken}:
 *   get:
 *     summary: Подтверждение email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: verificationToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Токен для подтверждения email
 *     responses:
 *       200:
 *         description: Email подтвержден
 *       404:
 *         description: Пользователь не найден
 */
router.get("/verify/:verificationToken", authControllers.verifyEmail);

/**
 * @swagger
 * /api/auth/verify/resend:
 *   post:
 *     summary: Повторная отправка письма для подтверждения email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       200:
 *         description: Письмо отправлено
 *       404:
 *         description: Пользователь не найден
 */
router.post(
  "/verify/resend",
  validateData(emailSchema),
  authControllers.resendVerifyEmail
);

/**
 * @swagger
 * /api/auth/password:
 *   patch:
 *     summary: Изменение пароля
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пароль изменен
 *       401:
 *         description: Неверный пароль
 */
router.patch("/password", authenticate, authControllers.changePass);

module.exports = router;
