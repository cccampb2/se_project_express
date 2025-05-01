const router = require("express").Router();
const {
  validateClothingBody,
  validateId,
} = require("../middlewares/validation");

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

router.get("/", getItems);
router.post("/", auth, validateClothingBody, createItem);
router.delete("/:itemId", auth, validateId, deleteItem);
router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId/likes", auth, validateId, unlikeItem);

module.exports = router;
