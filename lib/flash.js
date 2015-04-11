var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
	value: true
});

var Flash = (function () {
	function Flash() {
		_classCallCheck(this, Flash);
	}

	_createClass(Flash, null, [{
		key: 'message',
		value: (function (_message) {
			function message(_x, _x2, _x3) {
				return _message.apply(this, arguments);
			}

			message.toString = function () {
				return _message.toString();
			};

			return message;
		})(function (message, type, callback) {
			console.log('[' + type + '] ' + message);

			if (typeof navigator !== 'undefined' && navigator.notification) {
				navigator.notification.alert(message, // message
				callback || function () {}, // callback
				'Forget Me Not', // title
				'Okay' // buttonName
				);
			} else {
				alert(message);

				if (callback) {
					callback();
				}
			}
		})
	}, {
		key: 'alert',
		value: function alert(message, callback) {
			var type = 'alert';

			this.message(message, type, callback);
		}
	}, {
		key: 'info',
		value: function info(message, callback) {
			this.message(message, 'info', callback);
		}
	}]);

	return Flash;
})();

exports.Flash = Flash;