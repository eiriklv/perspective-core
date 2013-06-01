var Logger = require('bunyan');

module.exports = function(name) {
  return new Logger({
    name: 'perspective' + name,
    streams: [
      {
        stream: process.stdout,
        level: 'debug'
      },
      {
        path: 'logs/trace-' + name + '.log',
        level: 'trace'
      }
    ],
    serializers:Logger.stdSerializers
  });
};