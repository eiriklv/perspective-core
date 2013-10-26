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

  var validation = require('./validation');
  var _ = require('underscore');

  var Model = function(attributes) {

    this.attr = attributes ? _.pick(attributes, _.keys(this.defaults)) : {};
    this.initialize.apply(this, arguments);

  };

  _.extend(Model.prototype, {
    defaults: {},
    initialize: function() {},
    validationRules: {},
    validate: function(validationRules) {
      if (validationRules) {
        return validation(this.attributes, validationRules);
      } else {
        return validation(this.attributes, this.validationRules);
      }
    },
    toJSON: function() {
      return _.clone(this.attr);
    }
  });

  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    _.extend(child, parent, staticProps);

    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    if (protoProps) _.extend(child.prototype, protoProps);

    child.__super__ = parent.prototype;

    return child;
  };

  Model.extend = extend;

  module.exports = Model;
}));