const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");

const {
  validateId,
  validateUserInfo,
  validateUserLogin,
} = require("../middlewares/validation");

router.get("/crash-test", (req, res) => {
  setTimeout(() => {
    console.log("hello");
    throw new Error("Server will crash now");
  }, 0);
  res.send("Crash Test");
});

router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserInfo, createUser);
router.use("/items", clothingItemRouter);
router.use("/", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Resource not found" });
});

module.exports = router;
