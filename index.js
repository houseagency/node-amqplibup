const amqp = require('amqplib/callback_api');
const autoRecovery = require('amqplib-auto-recovery');

module.exports = (url, callback) => {
	let wait = 200;
	const maxWait = 5000;
	const waitIncrease = 400;

	function makeConn() {
		try {
			autoRecovery(amqp, {
				onError: err => { /* console.error('AMQP connection error:', err); */ },
				isErrorUnrecoverable: err => false
			}).connect(url, (err, conn) => {
				if (err) {
					// console.error('Failed to connect:', err.message);
					setTimeout(makeConn, wait);
					if (wait != maxWait) wait += waitIncrease;
					if (wait > maxWait) wait = maxWait;
					return
				}

				if (typeof callback === 'function') callback(conn);
			});
		} catch (err) {
			// console.error('Failed to connect:', err.message);
			setTimeout(makeConn, wait);
			if (wait != maxWait) wait += waitIncrease;
			if (wait > maxWait) wait = maxWait;
		}
	}
	makeConn();

};
