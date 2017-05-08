var convict = require('convict');
var config = convict({
  log: {
    level: {
      doc: 'The winston log level',
      format: 'String',
      default: 'INFO',
      env: 'LOG_LEVEL'
    }
  },
  amqp: {
    url: {
      doc: '',
      format: 'String',
      default: 'amqp://rabbitmq',
      env: 'AMQP_URL'
    }
 }
});
config.validate({allowed: 'strict'})

var winston = require('winston');
var logger = new winston.Logger({
  level: config.get("log.level")
});


require('seneca')()
  .use('seneca-amqp-transport')
  .add('cmd:log,level:*', function(req, done) {
    console[req.level](req.message);
    return done(null, { ok: true, when: Date.now() });
  })
  .listen({
    type: 'amqp',
    pin: 'cmd:log,level:*',
    url: config.get("amqp.url")
  });
