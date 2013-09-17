var backend = require('./errors/backend');
var resource = require('./errors/resource');

module.exports = {
  backend:backend,
  resource:resource,
  resourceFactory: function(error) {
    if (error instanceof backend.NotFoundError) {
      return new resource.NotFoundError(error.message);
    } else if (error instanceof backend.ValidationError) {
      return new resource.ValidationError(error.message);
    }

    return new resource.GeneralError();
  }
};