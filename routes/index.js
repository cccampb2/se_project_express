const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);
router.use("/items", clothingItemRouter);
router.use("/", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Resource not found" });
});

module.exports = router;
