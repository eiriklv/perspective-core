var util = require('util');
var AbstractError = require('./abstract');

var NotFoundError = function (msg) {
  this.statusCode = 404;
  NotFoundError.super_.call(this, msg, this.constructor);
};

util.inherits(NotFoundError, AbstractError);
NotFoundError.prototype.name = 'NotFoundError';

var GeneralError = function() {
  this.statusCode = 500;
  GeneralError.super_.call(this, 'Something went wrong, could not fulfil the request', this.constructor);
};

util.inherits(GeneralError, AbstractError);
GeneralError.prototype.name = 'GeneralError';

var ValidationError = function(body) {
  this.statusCode = 400;
  ValidationError.super_.call(this, body, this.constructor);
};

util.inherits(ValidationError, AbstractError);
ValidationError.prototype.name = 'ValidationError';

module.exports = {
  GeneralError: GeneralError,
  NotFoundError: NotFoundError,
  ValidationError: ValidationError
};