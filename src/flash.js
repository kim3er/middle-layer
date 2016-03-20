export class MlFlash {

	static message(message, type, callback) {
		console.log(`[${type}] ${message}`);

		if (typeof navigator !== 'undefined' && navigator.notification) {
			navigator.notification.alert(
				message,					// message
				callback || function() {},	// callback
				'Forget Me Not',			// title
				'Okay'						// buttonName
			);
		}
		else {
			alert(message);

			if (callback) {
				callback();
			}
		}
	}

	static alert(message, callback) {
		var type = 'alert';

		this.message(message, type, callback);
	}

	static info(message, callback) {
		this.message(message, 'info', callback);
	}
}
