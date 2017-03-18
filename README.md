# node-amqplibup

amqplibup is a wrapper for [amqplib](https://www.npmjs.com/package/amqplib), providing automatic reconnection/retries when your amqp server is unavailable.

## How to use

	const amqp = require('amqplibup');
	amqp('amqp://my-rabbitmq-server.example.org', conn => {
		// conn is a connected amqplib connection object!

		// Now, you can do your usual amqplib stuff.
		// Please, note, this will run on every successful reconnect!

		con.createChannel((err, ch) => {
			ch.assertQueue('my-queue');
			// ... and so on ...
		});

	});

* The callback will be called on every successful connect/reconnect.
* There is no error argument on the callback, since no errors will ever be
  sent to the callback!

