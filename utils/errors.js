const INVALID_DATA = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const CONFLICT_ERROR = 409;
const FORBIDDEN = 403;
const UNAUTHORIZED = 401;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  INVALID_DATA,
  NOT_FOUND,
  SERVER_ERROR,
  CONFLICT_ERROR,
  FORBIDDEN,
  UNAUTHORIZED,
  ConflictError,
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
};
