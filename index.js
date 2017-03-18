const amqp = require('amqplib/callback_api');

module.exports = (url, callback) => {
	const startWait = 200;
	const maxWait = 5000;
	const waitIncrease = 400;
	let wait = startWait;

	function makeConn() {

		let retry = () => {

			retry = () => {}; // Only actually retry once.

			setTimeout(makeConn, wait);
			if (wait != maxWait) wait += waitIncrease;
			if (wait > maxWait) wait = maxWait;
		};

		try {
			amqp.connect(url, (err, conn) => {
				if (err) return retry();
				conn.on('error', retry);
				conn.on('close', retry);
				if (typeof callback === 'function') {
					wait = startWait;
					callback(conn);
				}
			});
		} catch (err) {
			retry();
		}
	}
	makeConn();

};
