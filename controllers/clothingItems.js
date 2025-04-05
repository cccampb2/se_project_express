const ClothingItems = require("../models/clothingItems");
const {
  NOT_FOUND,

  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");

/* eslint no-underscore-dangle: 0 */

const getItems = (req, res, next) => {
  ClothingItems.find({})
    .then((items) => res.status(200).send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItems.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      }

      next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItems.findById(itemId)
    .orFail(() => {
      const error = new Error("Item Id not found.");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        next(new ForbiddenError("You can only delete your own items"));
      }

      return ClothingItems.findByIdAndDelete(itemId).then((deletedItem) =>
        res.status(200).send(deletedItem)
      );
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        next(new BadRequestError(err.message));
      }
      if (err.statusCode === NOT_FOUND) {
        next(new NotFoundError(err.message));
      }
      next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);

      if (err.statusCode === NOT_FOUND) {
        next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

const unlikeItem = (req, res, next) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item Id not found.");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);

      if (err.statusCode === NOT_FOUND) {
        next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, unlikeItem };
