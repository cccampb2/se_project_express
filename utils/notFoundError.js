const NOT_FOUND = 404;
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
module.exports = { NOT_FOUND, NotFoundError };
