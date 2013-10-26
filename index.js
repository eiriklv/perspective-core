(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function(require) {
      factory(require, require('exports'), require('module'))
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require, exports, module);
  }
}(function (require, exports, module) {
	
	var validation = require('./lib/validation');
	var Model = require('./lib/model');

	module.exports = {
	  Model: Model,
	  validation: validation
	};

}));