# node-amqplibup

amqplibup is a wrapper for [amqplib](https://www.npmjs.com/package/amqplib), providing automatic reconnection/retries when your amqp server is unavailable.

## How to use

	const amqp = require('amqplibup');
	amqp('amqp://my-rabbitmq-server.example.org', conn => {
		// conn is a connected amqplib connection object!

		// Now, you can do your usual amqplib stuff.
		// Please, not, this will run on every successful reconnect!

		con.createChannel((err, ch) => {
			ch.assertQueue('my-queue');
			// ... and so on ...
		});

	});

* The callback will be called on every successful connect/reconnect.
* There is no error argument on the callback, since no errors will ever be
  sent to the callback!

## `amqplib-auto-recovery`

The [amqplib-auto-recovery](https://www.npmjs.com/package/amqplib-auto-recovery)
module is used for auto recovery when a connection is dropped. However, it does
not support the scenario when your RabbitMQ/AMQP server is down when you are
connecting the first time. That is why we wrapped both amqplib and
amqplib-auto-recovery in this module.

