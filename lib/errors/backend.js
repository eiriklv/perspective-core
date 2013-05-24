var util = require('util');
var AbstractError = require('./abstract');

var DatabaseError = function (msg) {
  DatabaseError.super_.call(this, msg, this.constructor);
};

util.inherits(DatabaseError, AbstractError);
DatabaseError.prototype.name = 'DatabaseError';

var NotFoundError = function (msg) {
  NotFoundError.super_.call(this, msg, this.constructor);
};

util.inherits(NotFoundError, AbstractError);
NotFoundError.prototype.name = 'NotFoundError';

module.exports = {
  DatabaseError: DatabaseError
};