const Router = require("express");
const router = new Router();
const controller = require("../controllers/Auth.js");
const { check } = require("express-validator");
const isAuthenticated = require("../middleware/isAuthenticated.js");

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("username", "Слишком длинное имя пользователя").isLength({
      max: 255,
    }),
    check("password", "Пароль не может быть пустым").notEmpty(),
    check("password", "Пароль не может быть короче 8 символов").isLength({
      min: 8,
    }),
    check(
      "password",
      "Обязательна заглавная, строчная буквы, цифра и спецсимвол"
    ).matches(
      /(?=.*[0-9])(?=.*[!@#$%^&_*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/
    ),
    check("email", "Адрес электронная почты не может быть пустым").notEmpty(),
    check("email", "Введите корректный адрес электронной почты").isEmail(),
    check("email", "Слишком длинный адрес электронной почты").isLength({
      max: 255,
    }),
  ],
  controller.registration
);

router.post(
  "/login",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль не может быть пустым").notEmpty(),
  ],
  controller.login
);

router.put(
  "/add-phone",
  isAuthenticated,
  [check("phone", "Номер телефона должен быть корректным").isMobilePhone()],
  controller.addPhone
);

router.get("/get-user-info", isAuthenticated, controller.getUserInfo);

// router.get("/all_users", isAuthenticated, controller.getAllUsers);

router.get("/logout", controller.logout);

router.post("/refreshToken", controller.refreshAccessToken);

module.exports = router;
