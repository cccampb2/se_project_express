const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { NotFoundError } = require("../utils/notFoundError");

const {
  validateUserInfo,
  validateUserLogin,
} = require("../middlewares/validation");

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserInfo, createUser);
router.use("/items", clothingItemRouter);
router.use("/", userRouter);

router.use(() => {
  throw new NotFoundError("Resource not found");
});

module.exports = router;
