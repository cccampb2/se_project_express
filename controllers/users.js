const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const JWT_SECRET = require("../utils/config");
const {
  NOT_FOUND,
  ConflictError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../utils/errors");

const createUser = (req, res, next) => {
  const { name, avatar, password, email } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(201).send(userResponse);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      }
      if (err.code === 11000) {
        next(
          new ConflictError(
            "Email is already in use. Please use a different email."
          )
        );
      }
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);

      if (err.statusCode === NOT_FOUND) {
        next(new NotFoundError("User ID not found"));
      }

      if (err.name === "CastError") {
        next(new BadRequestError("User ID not found"));
      }

      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    next(new BadRequestError("Email is required"));
  }

  if (!password) {
    next(new BadRequestError("Password is required"));
  }

  return User.findUserByCredentials(email, password)

    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      console.log(err);
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Incorrect email or password"));
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  if (!name && !avatar) {
    next(
      new BadRequestError(
        "At least one field (name or avatar) must be provided."
      )
    );
  }

  return User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      }
      if (err.statusCode === NOT_FOUND) {
        next(new NotFoundError("User not found."));
      }
      next(err);
    });
};

module.exports = { createUser, getCurrentUser, login, updateProfile };
