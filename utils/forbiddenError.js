const FORBIDDEN = 403;
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = { FORBIDDEN, ForbiddenError };
