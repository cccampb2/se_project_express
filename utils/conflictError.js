const CONFLICT_ERROR = 409;

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = { CONFLICT_ERROR, ConflictError };
