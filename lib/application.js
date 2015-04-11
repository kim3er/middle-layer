var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _Progress = require('./progress');

var _Router = require('./router');

var Application = (function () {
	function Application(onDevice) {
		_classCallCheck(this, Application);

		var self = this;

		self.onDevice = onDevice;

		self.progress = new _Progress.Progress();
		self.router = new _Router.Router({ app: self, controllers: self.controllers() });

		self.ready().then(function () {
			return self.afterReady();
		});
	}

	_createClass(Application, [{
		key: 'controllers',

		// Config

		value: function controllers() {
			return [];
		}
	}, {
		key: 'ready',

		// Overrides

		value: function ready() {
			return new Promise(function (resolve, reject) {
				// On ready code goes here
				resolve();
			});
		}
	}, {
		key: 'afterReady',
		value: function afterReady() {
			// Disable splash screen
			if (typeof navigator !== 'undefined' && navigator.splashscreen) {
				navigator.splashscreen.hide();
			}
		}
	}, {
		key: 'switchTemplate',
		value: function switchTemplate(name, data) {}
	}], [{
		key: 'doAppReady',

		// Helpers

		value: function doAppReady() {
			var self = this;

			function appReady(onDevice) {
				return function () {
					window.app = new self(onDevice);
				};
			}

			if (typeof cordova !== 'undefined') {
				document.addEventListener('deviceready', appReady(true), false);
			} else {
				$(appReady(false));
			}
		}
	}]);

	return Application;
})();

exports.Application = Application;

// Declare controllers here