const INVALID_DATA = 400;
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = { INVALID_DATA, BadRequestError };
