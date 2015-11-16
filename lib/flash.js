Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MlFlash = (function () {
	function MlFlash() {
		_classCallCheck(this, MlFlash);
	}

	_createClass(MlFlash, null, [{
		key: 'message',
		value: function message(_message, type, callback) {

			if (typeof navigator !== 'undefined' && navigator.notification) {
				navigator.notification.alert(_message, // message
				callback || function () {}, // callback
				'Forget Me Not', // title
				'Okay' // buttonName
				);
			} else {
					alert(_message);

					if (callback) {
						callback();
					}
				}
		}
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

	return MlFlash;
})();

exports.MlFlash = MlFlash;