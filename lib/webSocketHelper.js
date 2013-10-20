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

  var _ = require('underscore');
  var validation = require('./validation');

  var ValidateMessage = function(message) {
    try {
      message = JSON.parse(message);
    } catch (e) {
      return {errors: {json: "Could not parse json"}};
    }

    var errors = validation(message, {
      event: {
        required: true
      },
      channel: {
        required: true
      }
    });

    if (errors) {
      return errors;
    }

    return message;
  };

  var eventListeners = {};


  var getCallbacksForEvent = function(channel, event, createStructure) {
    var eventListenersForChannel = eventListeners[channel];

    if (!eventListenersForChannel) {
      if (!createStructure) {
        return null;
      }

      eventListenersForChannel = eventListeners[channel] = {}
    }

    var eventListenersForChannelAndEvent = eventListenersForChannel[event];
    if (!eventListenersForChannelAndEvent) {
      if (!createStructure) {
        return null;
      }

      eventListenersForChannelAndEvent = eventListenersForChannel[event] = [];
    }

    return eventListenersForChannelAndEvent;
  };

  var standardEvents = {
    error: "error"
  };

  module.exports = {
    addDataBeforeSend: function(channel, event, object) {
      var contextData = {channel: channel, event: event};
      object = _.extend(object, contextData);

      return object;
    },
    standardEvents: standardEvents,
    onMessage: function(message, send) {
      var message = new ValidateMessage(message);
      if (message.errors) {
        send(standardEvents.error, message.errors);
      }

      var callbacks = getCallbacksForEvent(message.channel, message.event);

      if (!callbacks)  {
        send(standardEvents.error, {errors: {
          noListeners: "There where no listeners for event '" + message.event + "' on channel '" + message.channel + "'"}
        });
      }

      callbacks.forEach(function(callback) {
        callback(message);
      });
    },
    on: function(channel, event, callback) {
      var callbacks = getCallbacksForEvent(channel, event, true);
      callbacks.push(callback);
    }
  }

}));